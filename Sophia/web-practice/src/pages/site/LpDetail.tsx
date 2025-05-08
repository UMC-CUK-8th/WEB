import { useParams } from 'react-router-dom';
import useGetLpDetail from '../../hooks/queries/useGetLpDetail';

export default function LpDetail() {
  const { lpId } = useParams();

  const { data, isPending, isError } = useGetLpDetail(lpId);

  if (isPending) {
    return <div className='text-white'>Loading...</div>;
  }

  if (isError) {
    return <div className='text-white'>Error!</div>;
  }

  console.log(data.tags);

  return (
    <div className='bg-[#434141] w-2/3 h-dvh rounded-xl m-4'>
      {!isPending && (
        <div className='text-white'>
          <div className='flex justify-between m-2 items-center'>
            <div className='flex items-center gap-2'>
              {data.author.avatar ? <img src={data.author.avatar} alt={data.author.name} className='w-10 rounded-4xl' /> : <div className='bg-white rounded-4xl w-10'></div>}
              <span>{data.author.name}</span>
            </div>
            <span>{data.author.createdAt.toString().split('T')[0]}</span>
          </div>

          <div className='flex justify-between m-2'>
            <span className='text-lg'>{data.title}</span>
            <div className='flex gap-2'>
              <button type='button'>수정</button>
              <button type='button'>삭제</button>
            </div>
          </div>

          <div className='flex justify-center mt-10'>
            <div className='w-[60%] h-[60%] shadow-black shadow-lg flex justify-center object-cover relative'>
              <img src={data.thumbnail} className='rounded-full w-[80%] aspect-square flex justify-center items-center animate-spin border-2 border-black' style={{ animationDuration: '10s' }} />
              <div className='rounded-full bg-amber-50 md:w-15 md:h-15 absolute top-1/2 -translate-y-[50%] w-10 h-10'></div>
            </div>
          </div>

          <p className='m-2'>{data.content}</p>
          <div className='flex flex-wrap gap-3 px-3'>
            {data.tags.length > 0
              ? data.tags.map((tag) => (
                  <span key={tag.id} className='rounded-full bg-gray-400 p-2'>
                    #{tag.name}
                  </span>
                ))
              : ''}
          </div>

          <span className='flex justify-center mt-10'>좋아요수 {data.likes.length}</span>
        </div>
      )}
    </div>
  );
}
