import { useRef, useEffect, useState } from "react";
import useGetInfiniteLpList from "../hooks/queries/useGetInfiniteLpList";
import LpCard from "../components/LpCard";
import LpCardSkeleton from "../components/LpCard/LpCardSkeleton";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const limit = 20;

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetInfiniteLpList(limit, search, order);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current || !hasNextPage) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        fetchNextPage();
      }
    });
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  if (isPending) {
    return (
      <div className="mt-20 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <LpCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div
      style={{ backgroundColor: "black", minHeight: "100vh", padding: "2rem" }}
    >
      {/* 정렬 버튼 */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => setOrder("desc")}
          className={`px-3 py-1 rounded ${
            order === "desc" ? "bg-[#ac0576] text-white" : "bg-white text-black"
          }`}
        >
          최신순
        </button>
        <button
          onClick={() => setOrder("asc")}
          className={`px-3 py-1 rounded ${
            order === "asc" ? "bg-[#ac0576] text-white" : "bg-white text-black"
          }`}
        >
          오래된순
        </button>
      </div>

      {/* LP 카드 목록 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {data?.pages.map((page) =>
          page.data.data.map((lp: any) => (
            <LpCard
              key={lp.id}
              thumbnail={lp.thumbnail}
              title={lp.title}
              date={lp.createdAt.slice(0, 10)}
              likes={lp.likes.length}
              lpId={lp.id.toString()}
            />
          ))
        )}
        {isFetchingNextPage &&
          Array.from({ length: 3 }).map((_, i) => (
            <LpCardSkeleton key={`skeleton-${i}`} />
          ))}
      </div>

      {/* 무한스크롤 트리거 */}
      <div ref={observerRef} className="h-10" />
    </div>
  );
};

export default HomePage;

// import { useState } from "react";
// import useGetLpList from "../hooks/queries/useGetLpList";
// import LpCard from "../components/LpCard"; // LpCard 컴포넌트 임포트

// const HomePage = () => {
//   const [search, setSearch] = useState("");
//   const [order, setOrder] = useState<"asc" | "desc">("desc");

//   const { data, isPending, isError } = useGetLpList({
//     search,
//     cursor: 0,
//     order,
//     limit: 20,
//   });

//   if (isPending) return <div className="mt-20">Loading...</div>;
//   if (isError) return <div className="mt-20">Error...</div>;

//   return (
//     <div
//       style={{
//         backgroundColor: "black",
//         minHeight: "100vh",
//         padding: "2rem",
//       }}
//     >
//       {/* 정렬 버튼 영역 */}
//       <div className="flex justify-end gap-2 mb-4">
//         <button
//           onClick={() => setOrder("desc")}
//           className={`px-3 py-1 rounded ${
//             order === "desc" ? "bg-[#ac0576] text-white" : "bg-white text-black"
//           }`}
//         >
//           최신순
//         </button>
//         <button
//           onClick={() => setOrder("asc")}
//           className={`px-3 py-1 rounded ${
//             order === "asc" ? "bg-[#ac0576] text-white" : "bg-white text-black"
//           }`}
//         >
//           오래된순
//         </button>
//       </div>

//       {/* LP 카드 이미지 목록 */}
//       <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
//         {data?.data.data.map((lp) => (
//           <LpCard
//             key={lp.id}
//             thumbnail={lp.thumbnail}
//             title={lp.title}
//             date={lp.createdAt.toString().slice(0, 10)}
//             likes={lp.likes.length}
//             lpId={lp.id.toString()} // LP ID 전달
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
