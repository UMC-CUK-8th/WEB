import { useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import {useInView} from "react-intersection-observer"; 
import LpCard from "../components/LpCard";
import LpCardSkeletonList from "../components/LpCardSkeletonList";
import {FaSearch} from "react-icons/fa";

export default function HomePage() {
  const [order, setorder] = useState(PAGINATION_ORDER.desc);
  const [search, setSearch] = useState('');

  // const { data, isPending, isError } = useGetLpList({
  //   limit: 50,
  // });

  const { data: lps, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetInfiniteLpList(5, search, order);

  // ref: 특정한 HTML 요소를 감시
  // inView: 그 요소가 화면에 보이면 true 아니면 false
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    // fetch하는 중이 아니고 다음 페이지가 존재하면 다음 페이지 패칭 -> 무한 스크롤 생성
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [isFetching, hasNextPage, fetchNextPage, inView]);

  if (isError) {
    return <div className='text-white'>Error!</div>;
  }

  return (
    <div>
      <div className='flex justify-between m-2'>
        <div className='flex items-center gap-2'>
          <FaSearch className="text-white" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className='border-white border-2 rounded-md h-8 text-white' />
        </div>
        <div className='flex justify-end'>
          <div className='inline-flex border-2 rounded-md border-white'>
            <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-transparent text-white' : 'bg-white text-black'} p-2`} onClick={() => setorder(PAGINATION_ORDER.desc)}>
              오래된순
            </button>
            <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-transparent text-white'} p-2`} onClick={() => setorder(PAGINATION_ORDER.asc)}>
              최신순
            </button>
          </div>
        </div>
      </div>

      <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center'>
        {isPending && <LpCardSkeletonList count={20} />}

        {lps?.pages
          .map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} data={lp} />
          ))}

        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className='h-2'></div>
    </div>
  );
}
