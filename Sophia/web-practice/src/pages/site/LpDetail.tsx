import { useParams } from 'react-router-dom';
import useGetLpDetail from '../../hooks/queries/useGetLpDetail';
import useGetCommentList from '../../hooks/queries/useGetLpCommentList';
import { PAGINATION_ORDER } from '../../enums/common';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import LpCommentSkeletonList from '../../components/Site/LpCommentSkeletonList';

export default function LpDetail() {
  const { lpId } = useParams();
  const [order, setorder] = useState(PAGINATION_ORDER.desc);

  const { data: lpDetail, isPending: isPendingLpDetail, isError: isErrorLpDetail } = useGetLpDetail(lpId);
  const { data: lpCommentList, isPending: isPendingLpComment, isError: isErrorLpCommnet, isFetching, hasNextPage, fetchNextPage } = useGetCommentList({ limit: 5, order }, lpId);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

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
              {lpDetail.author.avatar ? <img src={lpDetail.author.avatar} alt={lpDetail.author.name} className='w-10 rounded-4xl' /> : <div className='bg-white rounded-4xl w-10'></div>}
              <span>{lpDetail.author.name}</span>
            </div>
            <span>{lpDetail.author.createdAt.toString().split('T')[0]}</span>
          </div>

          <div className='flex justify-between m-2'>
            <span className='text-lg'>{lpDetail.title}</span>
            <div className='flex gap-2'>
              <button type='button'>수정</button>
              <button type='button'>삭제</button>
            </div>
          </div>

          <div className='flex justify-center mt-10'>
            <div className='w-[60%] h-[60%] shadow-black shadow-lg flex justify-center object-cover relative'>
              <img src={lpDetail.thumbnail} className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin border-2 border-black' style={{ animationDuration: '10s' }} />
              <div className='rounded-full bg-amber-50 md:w-15 md:h-15 absolute top-1/2 -translate-y-[50%] w-10 h-10'></div>
            </div>
          </div>

          <p className='m-2'>{lpDetail.content}</p>
          <div className='flex flex-wrap gap-3 px-3'>
            {lpDetail.tags.length > 0
              ? lpDetail.tags.map((tag) => (
                  <span key={tag.id} className='rounded-full bg-gray-400 p-2'>
                    #{tag.name}
                  </span>
                ))
              : ''}
          </div>

          <span className='flex justify-center mt-10'>좋아요수 {lpDetail.likes.length}</span>

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
            <input type='text' placeholder='댓글을 입력해주세요.' className='border-2 border-white w-[calc(100%-4rem)] rounded-md px-2' />
            <button type='button' className='bg-gray-500 p-2 rounded-md w-12'>
              작성
            </button>
          </div>

          <div>
            {isPendingLpComment && <LpCommentSkeletonList count={5} />}

            {lpCommentList.pages
              .map((page) => page.data.data)
              .flat()
              .map((comment) => (
                <div>
                  <div className='flex gap-2 mt-2 items-center'>
                    {comment.author.avatar ? <img src={comment.author.avatar} alt={comment.author.name} className='w-10 h-10 rounded-full' /> : <div className='text-white rounded-full w-10 h-10'></div>}
                    <span>{comment.author.name}</span>
                  </div>
                  <p className='ml-12'>{comment.content}</p>
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
