import { useParams } from 'react-router-dom';
import useGetLpDetail from '../hooks/queries/useGetLpDetail';
import useGetCommentList from '../hooks/queries/useGetLpCommentList';
import { PAGINATION_ORDER } from '../enums/common';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaRegHeart } from 'react-icons/fa';
import { BsThreeDotsVertical } from 'react-icons/bs';
import defaultProfile from '../assets/defaultProfile.svg';
import useAddComment from '../hooks/mutations/useAddComment';
import useDeleteComment from '../hooks/mutations/useDeleteComment';
import useUpdateComment from '../hooks/mutations/useUpdateComment';
import useUpdateLpDetail from '../hooks/mutations/useUpdateLpDetail';
import useDeleteLp from '../hooks/mutations/useDeleteLp';
import usePostLike from '../hooks/mutations/usePostLike';
import useDeleteLike from '../hooks/mutations/useDeleteLike';
import { useAuth } from '../context/AuthContext';

import LpCommentSkeletonList from '../components/LpCommentSkeletonList';
import useGetMyInfo from '../hooks/queries/useGetMyInfo';

const LpDetail = () => {
  const { lpId } = useParams();
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);
  const [newComment, setNewComment] = useState('');
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editComment, setEditComment] = useState('');
  const [menuOpenId, setMenuOpenId] = useState<number | null>(null);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  const { accessToken } = useAuth();
    const { data: me } = useGetMyInfo(accessToken);

  const { ref, inView } = useInView({ threshold: 0 });

  const { data: lpDetail, isPending: isPendingLpDetail, isError: isErrorLpDetail } = useGetLpDetail(lpId);
  const {
    data: lpCommentList,
    isPending: isPendingLpComment,
    isError: isErrorLpComment,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useGetCommentList({ limit: 5, order }, lpId);

  const { mutate: addCommentMutate } = useAddComment();
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: updateCommentMutate } = useUpdateComment();

  const { mutate: updateLpDetailMutate } = useUpdateLpDetail();
  const { mutate: deleteLpMutate } = useDeleteLp();

  const { mutate: postLikeMutate } = usePostLike();
  const { mutate: deleteLikeMutate } = useDeleteLike();

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPendingLpDetail || isPendingLpComment) return <div className='text-white'>Loading...</div>;
  if (isErrorLpDetail || isErrorLpComment) return <div className='text-white'>Error!</div>;

  return (
    <div className='bg-[#1e1e1c] w-2/3 h-screen overflow-y-auto rounded-xl m-4 text-white'>
      <div className='flex justify-between m-2 items-center'>
        <div className='flex items-center gap-2'>
          {lpDetail.author.avatar ? (
            <img src={lpDetail.author.avatar} alt={lpDetail.author.name} className='w-10 rounded-full' />
          ) : (
            <div className='bg-white rounded-full w-10 h-10'></div>
          )}
          <span>{lpDetail.author.name}</span>
        </div>
        <span>{lpDetail.author.createdAt.split('T')[0]}</span>
      </div>

      <div className='flex justify-between m-2'>
        <span className='text-lg'>{lpDetail.title}</span>
        <div className='flex gap-2'>
          <button type='button'>수정</button>
        <button type='button' onClick={() => deleteLpMutate(Number(lpId))}>삭제</button> 
        </div>
        
      </div>

      <div className='flex justify-center mt-10'>
        <div className='w-[70%] shadow-black shadow-md flex justify-center mb-5 relative'>
          <img src={lpDetail.thumbnail} className='rounded-full w-[80%] aspect-square animate-spin border-2 border-black' style={{ animationDuration: '10s' }} />
          <div className='rounded-full bg-amber-50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10'></div>
        </div>
      </div>

      <p className='m-2'>{lpDetail.content}</p>
      <div className='flex flex-wrap gap-3 px-3'>
        {lpDetail.tags.map(tag => (
          <span key={tag.id} className='rounded-full bg-gray-400 p-2'>#{tag.name}</span>
        ))}
      </div>

      <span className='flex justify-center mt-10 items-center gap-4'>
        <FaRegHeart size={20} /> {lpDetail.likes.length}
      </span>

      <div className='flex justify-between m-2 p-2'>
        <p>댓글</p>
        <div className='inline-flex border-2 rounded-md border-white'>
              <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-transparent text-white' : 'bg-white text-black'}`} onClick={() => setOrder(PAGINATION_ORDER.desc)}>
                오래된순
              </button>
              <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-transparent text-white'}`} onClick={() => setOrder(PAGINATION_ORDER.asc)}>
                최신순
              </button>
            </div>
          </div>

      <div className='flex justify-between m-2 p-2'>
        <input type='text' placeholder='댓글을 입력해주세요.' className='border-2 border-white w-[calc(100%-4rem)] rounded-md px-2' value={newComment} onChange={(e) => setNewComment(e.target.value)} />
        <button type='button' className='bg-[#D0c1ff] p-2 rounded-md w-12' onClick={() => addCommentMutate({ lpId: Number(lpId), content: newComment })}>작성</button>
      </div>

      <div className='flex flex-col m-2 p-2'>
        {lpCommentList.pages.flatMap((page) => page.data.data).map((comment) => (
          <div key={comment.id} className='relative mb-4'>
            <div className='flex items-center gap-2'>
              {comment.author.avatar ? (
                <img src={comment.author.avatar} alt={comment.author.name} className='w-10 h-10 rounded-full' />
              ) : (
                <img src={defaultProfile} className=' w-10 h-10'></img>
              )}
              <span>{comment.author.name}</span>

              {comment.author.id === me?.id && (
                <button className='ml-auto' onClick={() => setMenuOpenId(menuOpenId === comment.id ? null : comment.id)}>
                  <BsThreeDotsVertical />
                </button>
              )}

              {menuOpenId === comment.id && (
                <div className='absolute right-2 top-10 bg-gray-700 rounded shadow p-2 z-10'>
                  <button className='block px-4 py-1 w-full text-left' onClick={() => {
                    setEditCommentId(comment.id);
                    setEditComment(comment.content);
                    setMenuOpenId(null);
                  }}>수정</button>
                  <button className='block px-4 py-1 hover:text-red-600 w-full text-left' onClick={() => deleteCommentMutate({ lpId: Number(lpId), commentId: comment.id })}>삭제</button>
                </div>
              )}
            </div>

            {editCommentId === comment.id ? (
              <div className='ml-12 mt-2'>
                <input
                  type='text'
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className='border rounded w-3/4 p-1 text-white'
                />
                <button
                  className='ml-2 text-white bg-[#D0C1FF] px-2 py-1 rounded'
                  onClick={() => {
                    updateCommentMutate({ lpId: Number(lpId), commentId: comment.id, content: editComment });
                    setEditCommentId(null);
                    setEditComment('');
                  }}
                >
                  저장
                </button>
              </div>
            ) : (
              <p className='ml-12'>{comment.content}</p>
            )}
          </div>
        ))}

        {isFetching && <LpCommentSkeletonList count={5} />}
      </div>

      <div ref={ref} className='h-2'></div>
    </div>
  );
};

export default LpDetail;
