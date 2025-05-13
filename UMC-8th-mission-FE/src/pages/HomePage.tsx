import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import { PAGINATION_ORDER } from "../enums/common";
import LpCard from "../components/LpCard/LpCard";
import LpCardSkeletonList from "../components/LpCard/LpCardSkeletonList";

const HomePage = () => {
  const [search, setSearch ] = useState("");
  const [sortOrder, setSortOrder] = useState(PAGINATION_ORDER.desc);
  // const { data } = useGetLpList({
  //   search,
  //   limit:50,
  // });
  
  const { 
    data:lps, 
    isFetching, 
    hasNextPage, 
    isPending, 
    fetchNextPage, 
    isError 
  } = useGetInfiniteLpList(1, search, sortOrder);

  // ref, inView
  // ref -> 특정한 HTML 요소를 감시할 수 있다.
  // inView -> 그 요소가 화면에 보이면 true.
  const { ref, inView } = useInView({
    threshold: 0,
  })

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div className={"mt-20"}>Loading...</div>;
  }

  if (isError) {
    return <div className={"mt-20"}>Error...</div>;
  }

  console.log(lps?.pages.map((page) => page.data.data));
  // [[1, 2], [3, 4]].flat() => [1, 2, 3, 4]

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === PAGINATION_ORDER.desc ? PAGINATION_ORDER.asc : PAGINATION_ORDER.desc);
  };

  return (
    <div className="w-full overflow-x-hidden px-2">
      <div className="flex justify-end mt-6">
        <button
          onClick={toggleSortOrder}
          className="bg-pink-500 text-white px-4 py-2 rounded-lg"
        >
          {sortOrder === PAGINATION_ORDER.desc ? "최신순" : "오래된순"}
        </button>
      </div>
      <div className={"mt-4"}>
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
        {/*{lps?.pages?.map((page) => console.log(page.data.data))}*/}
      </div>

      <div className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        }
      >
        {isPending && <LpCardSkeletonList count={20}  />}
        {lps?.pages
          ?.map((page) => page.data.data)
          ?.flat()
          ?.map((lp) => (
            <LpCard key={lp.id} lp={lp} />
          ))
        }
        {isFetching && <LpCardSkeletonList count={20} />}
      </div>
      <div ref={ref} className="h-2"></div>
    </div>
  );
};

export default HomePage;  