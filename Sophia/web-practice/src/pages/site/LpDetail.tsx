import { useParams } from 'react-router-dom';
import useGetLpDetail from '../../hooks/queries/useGetLpDetail';
import useGetCommentList from '../../hooks/queries/useGetLpCommentList';
import { PAGINATION_ORDER } from '../../enums/common';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LpCommentSkeletonList from '../../components/Site/LpCommentSkeletonList';
import { Heart, Pencil, Trash2, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import useGetMyInfo from '../../hooks/queries/useGetMyInfo';
import usePostLike from '../../hooks/mutations/usePostLike';
import useDeleteLike from '../../hooks/mutations/useDeleteLike';
import LPImg from '../../assets/LPImg.png';
import useDeleteLp from '../../hooks/mutations/useDeleteLp';
import useCreateComment from '../../hooks/mutations/useCreateComment';
import useDeleteComment from '../../hooks/mutations/useDeleteComment';
import useUpdateComment from '../../hooks/mutations/useUpdateComment';
import useUpdateLpDetail from '../../hooks/mutations/useUpdateLpDetail';

export default function LpDetail() {
  const { lpId } = useParams();
  const [order, setorder] = useState(PAGINATION_ORDER.desc);
  const [comment, setComment] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [isEditingContent, setIsEditingContent] = useState(false);
  const [editingComment, seteditingComment] = useState('');
  const [editingTitle, setEditingTitle] = useState('');
  const [editingThumbnail, setEditingThumbnail] = useState('');
  const [editingContent, setEditingContent] = useState('');
  const [editingTag, setEditingTag] = useState('');
  const [editingTags, setEditingTags] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: lpDetail, isPending: isPendingLpDetail, isError: isErrorLpDetail } = useGetLpDetail(Number(lpId));
  const { data: lpCommentList, isPending: isPendingLpComment, isError: isErrorLpCommnet, isFetching, hasNextPage, fetchNextPage } = useGetCommentList({ limit: 5, order }, lpId);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);

  const isLiked = lpDetail?.likes.some((like) => like.userId === me?.id);
  // mutate: 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리
  // mutateAsync: Promise를 반환해서 await 사용 가능
  const { mutate: likeMutate } = usePostLike();
  const { mutate: disLikeMutate } = useDeleteLike();

  const handleLikeLp = () => {
    likeMutate(Number(lpId));
  };

  const handleDislikeLp = () => {
    disLikeMutate(Number(lpId));
  };

  const { mutate: deleteLpMutate } = useDeleteLp();

  const handleDeleteLp = () => {
    if (me?.id === lpDetail?.author.id) {
      deleteLpMutate(Number(lpId));
    } else {
      alert('삭제 권한이 없습니다.');
    }
  };

  const { mutate: createCommentMutate } = useCreateComment();

  const handleComment = () => {
    createCommentMutate({ lpId: Number(lpId), content: comment });
    setComment('');
  };

  const { mutate: deleteCommentMutate } = useDeleteComment();

  const handleDeleteComment = (id: number) => {
    deleteCommentMutate({ lpId: Number(lpId), commentId: id });
  };

  const handleEditComment = (id: number, content: string) => {
    setEditingCommentId(id);
    seteditingComment(content);
  };

  const { mutate: updateCommentMutate } = useUpdateComment();

  const handleUpdateComment = (id: number) => {
    if (!editingComment.trim()) return;
    updateCommentMutate({ lpId: Number(lpId), commentId: id, content: editingComment });
    setEditingCommentId(null);
  };

  const handleEditContent = (title: string, thumbnail: string, content: string, tags: { id: number; name: string }[]) => {
    setIsEditingContent(true);
    setEditingTitle(title);
    setEditingThumbnail(thumbnail);
    setEditingContent(content);
    setEditingTags(tags.map((t) => t.name));
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setEditingThumbnail(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleClickAddTag = () => {
    if (!editingTag.trim()) return;
    if (editingTags.includes(editingTag.trim())) return;

    setEditingTags((prev) => [...prev, editingTag]);
    setEditingTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setEditingTags((prev) => prev.filter((t) => t !== tag));
  };

  const { mutate: updateLpDetail } = useUpdateLpDetail();

  const handleUpdatContent = () => {
    updateLpDetail({
      lpId: Number(lpId),
      title: editingTitle,
      content: editingContent,
      // thumbnail: editingThumbnail,
      tags: editingTags,
      published: true,
    });
  };

  if (isPendingLpDetail || isPendingLpComment) {
    return <div className='text-white'>Loading...</div>;
  }

  if (isErrorLpDetail || isErrorLpCommnet) {
    return <div className='text-white'>Error!</div>;
  }

  return (
    <div className='bg-[#434141] w-2/3 h-screen overflow-y-auto rounded-xl m-4'>
      {!isPendingLpDetail && !isPendingLpComment && (
        <div className='text-white'>
          <div className='flex justify-between m-2 items-center'>
            <div className='flex items-center gap-2'>
              {lpDetail.author.avatar ? <img src={lpDetail.author.avatar} alt={lpDetail.author.name} className='w-8 h-8 rounded-4xl' /> : <div className='bg-white rounded-4xl w-8 border-2 border-white h-8'></div>}
              <span>{lpDetail.author.name}</span>
            </div>
            <span>{lpDetail.author.updatedAt.toString().split('T')[0]}</span>
          </div>

          <div className='flex justify-between m-2'>
            {isEditingContent ? <input type='text' className='border-2 border-white rounded-md px-2 text-lg w-[80%]' value={editingTitle} onChange={(e) => setEditingTitle(e.target.value)} /> : <span className='text-lg'>{lpDetail.title}</span>}
            {isEditingContent ? (
              <div className='flex gap-2'>
                <button type='button' className='cursor-pointer' onClick={() => setIsEditingContent(false)}>
                  취소
                </button>
                <button type='button' className='cursor-pointer' onClick={handleUpdatContent}>
                  완료
                </button>
              </div>
            ) : (
              <div className='flex gap-2'>
                <button type='button' onClick={() => handleEditContent(lpDetail.title, lpDetail.thumbnail, lpDetail.content, lpDetail.tags)}>
                  <Pencil />
                </button>
                <button type='button' onClick={handleDeleteLp}>
                  <Trash2 />
                </button>
              </div>
            )}
          </div>

          <div className='flex justify-center mt-10'>
            <div className='w-[60%] h-[60%] shadow-black shadow-lg flex justify-center object-cover relative'>
              {isEditingContent ? (
                <div className='flex justify-center items-center'>
                  <input type='file' name='LPImage' id='LPImage' className='hidden' accept='image/jpeg, image/png, image/webp, image/jpg, image/svg+xml' ref={fileInputRef} onChange={handleImgChange} />
                  <button type='button' className='my-10 cursor-pointer flex justify-center items-center' onClick={handleImageClick}>
                    {editingThumbnail ? <img src={editingThumbnail} alt='LP 표지' className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin border-2 border-black' style={{ animationDuration: '10s' }} /> : <img src={LPImg} alt='LP 기본이미지' className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin' style={{ animationDuration: '10s' }} />}
                  </button>
                </div>
              ) : lpDetail.thumbnail ? (
                <img src={lpDetail.thumbnail} className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin border-2 border-black' style={{ animationDuration: '10s' }} />
              ) : (
                <img src={LPImg} alt='LP 기본이미지' className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin' style={{ animationDuration: '10s' }} />
              )}
              <div className='rounded-full bg-amber-50 md:w-15 md:h-15 absolute top-1/2 -translate-y-[50%] w-10 h-10'></div>
            </div>
          </div>

          {isEditingContent ? <textarea className='border-2 border-white rounded-md px-2 m-3 mt-6 w-[95%] flex justify-center' value={editingContent} onChange={(e) => setEditingContent(e.target.value)} /> : <p className='m-2 mt-6'>{lpDetail.content}</p>}
          {isEditingContent ? (
            <div className='flex gap-2 px-3'>
              <input type='text' placeholder='LP Tag' className='border-white border-2 rounded-md p-1 w-full' value={editingTag} onChange={(e) => setEditingTag(e.target.value)} />
              <button type='button' className='bg-pink-500 disabled:bg-gray-400 px-2 rounded-md' disabled={!editingTag.trim()} onClick={handleClickAddTag}>
                Add
              </button>
            </div>
          ) : (
            ''
          )}
          <div className='flex flex-wrap gap-3 px-3 justify-center mt-10'>
            {isEditingContent
              ? editingTags.map((tag) => (
                  <div key={tag} className='rounded-full bg-gray-400 p-2 flex items-center gap-2'>
                    <span>#{tag}</span>
                    <button type='button' onClick={() => handleRemoveTag(tag)}>
                      <X size={15} />
                    </button>
                  </div>
                ))
              : lpDetail.tags.map((tag) => (
                  <span key={tag.id} className='rounded-full bg-gray-400 p-2'>
                    #{tag.name}
                  </span>
                ))}
          </div>

          <button className='flex justify-center mt-5 mb-10 text-lg items-center gap-1 justify-self-center' onClick={isLiked ? handleDislikeLp : handleLikeLp}>
            <Heart color={isLiked ? 'red' : 'black'} fill={isLiked ? 'red' : 'transparent'} /> {lpDetail.likes.length}
          </button>

          <div className='flex justify-between m-2'>
            <p>댓글</p>
            <div className='inline-flex border-2 rounded-md border-white'>
              <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-transparent text-white' : 'bg-white text-black'}`} onClick={() => setorder(PAGINATION_ORDER.desc)}>
                오래된순
              </button>
              <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-transparent text-white'}`} onClick={() => setorder(PAGINATION_ORDER.asc)}>
                최신순
              </button>
            </div>
          </div>

          <div className='flex justify-between m-2'>
            <input type='text' placeholder='댓글을 입력해주세요.' className='border-2 border-white w-[calc(100%-4rem)] rounded-md px-2' value={comment} onChange={(e) => setComment(e.target.value)} />
            <button type='button' className='bg-pink-500 disabled:bg-gray-500 p-2 rounded-md w-12' disabled={!comment.trim()} onClick={handleComment}>
              작성
            </button>
          </div>

          <div>
            {isPendingLpComment && <LpCommentSkeletonList count={5} />}

            {lpCommentList.pages
              .map((page) => page.data.data)
              .flat()
              .map((c) => (
                <div key={c.id}>
                  <div className='flex justify-between items-center px-4'>
                    <div className='flex gap-2 mt-2 items-center'>
                      {c.author.avatar ? <img src={c.author.avatar} alt={c.author.name} className='w-8 h-8 rounded-full' /> : <div className='text-white rounded-full w-8 h-8 border-2 border-white bg-white'></div>}
                      <span>{c.author.name}</span>
                    </div>
                    {editingCommentId === c.id ? (
                      <div className='flex gap-2' hidden={me?.id !== c.authorId}>
                        <button type='button' className='text-white text-md cursor-pointer' onClick={() => setEditingCommentId(null)}>
                          취소
                        </button>
                        <button type='button' className='text-white text-md cursor-pointer' onClick={() => handleUpdateComment(c.id)}>
                          완료
                        </button>
                      </div>
                    ) : (
                      <div className='flex gap-2' hidden={me?.id !== c.authorId}>
                        <button type='button' onClick={() => handleEditComment(c.id, c.content)}>
                          <Pencil size={15} />
                        </button>
                        <button type='button' onClick={() => handleDeleteComment(c.id)}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                  {editingCommentId === c.id ? <input type='text' className='ml-15 border-2 border-white rounded-md px-2' value={editingComment} onChange={(e) => seteditingComment(e.target.value)} /> : <p className='ml-15'>{c.content}</p>}
                </div>
              ))}

            {isFetching && <LpCommentSkeletonList count={5} />}
          </div>
        </div>
      )}
      <div ref={ref} className='h-2'></div>
    </div>
  );
}
