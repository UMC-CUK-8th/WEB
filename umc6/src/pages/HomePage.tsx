import { useState } from "react";
import useGetLpList from "../hooks/queries/useGetLpList";
import LpCard from "../components/LpCard"; // LpCard 컴포넌트 임포트

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const { data, isPending, isError } = useGetLpList({
    search,
    cursor: 0,
    order,
    limit: 20,
  });

  if (isPending) return <div className="mt-20">Loading...</div>;
  if (isError) return <div className="mt-20">Error...</div>;

  return (
    <div
      style={{
        backgroundColor: "black",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* 정렬 버튼 영역 */}
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

      {/* LP 카드 이미지 목록 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {data?.data.data.map((lp) => (
          <LpCard
            key={lp.id}
            thumbnail={lp.thumbnail}
            title={lp.title}
            date={lp.createdAt.toString().slice(0, 10)}
            likes={lp.likes.length}
            lpId={lp.id.toString()} // LP ID 전달
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
