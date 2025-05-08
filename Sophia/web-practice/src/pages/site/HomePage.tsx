import { useState } from 'react';
import useGetLpList from '../../hooks/queries/useGetLpList';
import LpCard from '../../components/Site/LpCard';

export default function HomePage() {
  const [isNew, setIsNew] = useState(false);

  const { data, isPending, isError } = useGetLpList({
    limit: 50,
  });

  const sortedData = (data ? [...data] : []).sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime(); //ms로 변환
    const dateB = new Date(b.createdAt).getTime();

    return isNew ? dateB - dateA : dateA - dateB;
  });

  if (isPending) {
    return <div className='text-white'>Loading...</div>;
  }

  if (isError) {
    return <div className='text-white'>Error!</div>;
  }

  return (
    <div>
      <div className='flex justify-end'>
        <div className='inline-flex border-2 rounded-md border-white m-2'>
          <button type='button' className={`${isNew ? 'bg-transparent text-white' : 'bg-white text-black'} p-2`} onClick={() => setIsNew(false)}>
            오래된순
          </button>
          <button type='button' className={`${isNew ? 'bg-white text-black' : 'bg-transparent text-white'} p-2`} onClick={() => setIsNew(true)}>
            최신순
          </button>
        </div>
      </div>

      {!isPending && (
        <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {sortedData.map((lp) => (
            <LpCard key={lp.id} data={lp} />
          ))}
        </div>
      )}
    </div>
  );
}
