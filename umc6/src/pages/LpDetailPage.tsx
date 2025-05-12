import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getLpDetail } from "../apis/lp";
import { FaHeart, FaEdit, FaTrash } from "react-icons/fa";

// LP 상세 정보를 가져오는 함수 (API 연동 필요)
const fetchLpDetail = async (lpId: string) => {
  const { data } = await getLpDetail(lpId);
  return data;
};

const LpDetailPage = () => {
  const { lpId } = useParams<{ lpId: string }>();

  const {
    data: lp,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["lpDetail", lpId],
    queryFn: () => fetchLpDetail(lpId!),
    enabled: !!lpId,
  });

  if (isPending)
    return <div className="text-white mt-20 text-center">Loading...</div>;
  if (isError || !lp)
    return (
      <div className="text-white mt-20 text-center">
        Error loading LP detail.
      </div>
    );

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 py-12">
      {/* 제목 */}
      <h1 className="text-3xl font-bold mb-6">{lp.title}</h1>

      {/* LP 이미지 */}
      <div className="relative w-64 h-64 rounded-full border-4 border-gray-300 shadow-lg overflow-hidden animate-spin-slow">
        <img
          src={lp.thumbnail}
          alt={lp.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 날짜 및 설명 */}
      <p className="text-gray-400 mt-4">{lp.date}</p>
      <p className="text-center mt-4 max-w-2xl">{lp.description}</p>

      {/* 버튼들 */}
      <div className="flex gap-4 mt-6">
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2">
          <FaHeart className="text-red-500" /> 좋아요
        </button>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2">
          <FaEdit /> 수정
        </button>
        <button className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200 flex items-center gap-2">
          <FaTrash /> 삭제
        </button>
      </div>
    </div>
  );
};

export default LpDetailPage;
