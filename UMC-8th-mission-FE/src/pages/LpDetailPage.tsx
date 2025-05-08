import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import { formatDistanceToNow } from "date-fns";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);

  const { data, isLoading, isError } = useGetLpDetail(lpId);

  const [isLiked, setIsLiked] = useState(false);  
  const [likesCount, setLikesCount] = useState(0); 
  const [isRotating, setIsRotating] = useState(false);  // 회전 상태 추가

  useEffect(() => {
    if (data) {
      const userHasLiked = data.data.likes.some(like => like.userId === 3); 
      setIsLiked(userHasLiked);
      setLikesCount(data.data.likes.length);
    }
  }, [data]);

  const handleLikeClick = () => {
    setIsLiked(prev => !prev); 
    setLikesCount(prev => (isLiked ? prev - 1 : prev + 1)); 
  };

  const handleRotateClick = () => {
    setIsRotating(prev => !prev);  // 클릭 시 회전 상태 토글
  };

  if (isLoading) return <div className="text-white text-center mt-20">로딩~...</div>;
  if (isError || !data) return <div className="text-white text-center mt-20">데이터를 불러올 수 없습니다...</div>;

  const lp = data.data;

  return (
    <div className="flex justify-center mt-10 text-white">
      <div className="bg-[#282A30] p-8 rounded-xl shadow-lg max-w-2xl w-full relative">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-2">
              <img
                src={lp.author.avatar || "/images/profile.png"}
                alt="작성자"
                className="w-6 h-6 rounded-full"
              />
              <span className="text-sm font-medium">{lp.author.name}</span>
            </div>
            <h2 className="text-xl font-bold mt-2">{lp.title}</h2>
          </div>

          <div className="flex flex-col items-end space-y-1">
            <div className="top-4 right-4 flex space-x-2 text-gray-400 cursor-pointer">
              <img src="/images/editIcon.svg" alt="수정" className="w-4 h-4" />
              <img src="/images/trashIcon.svg" alt="삭제" className="w-4 h-4" />
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {formatDistanceToNow(new Date(lp.createdAt), {
                addSuffix: true,
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-center my-6 relative" onClick={handleRotateClick}>
  <div className="w-100 h-100 bg-[#282A30] border-1 border-[#434343] rounded-sm relative flex justify-center items-center cursor-pointer shadow-2xl shadow-[rgba(0,0,0,0.6)_0px_4px_12px,_rgba(0,0,0,0.3)_0px_10px_30px]">
    <div
      className={`w-92 h-92 bg-[#333] rounded-full flex justify-center items-center relative ${isRotating ? "animate-spin" : ""}`}
    >
      <div className="w-full h-full bg-black border-4 border-[#222] rounded-full relative overflow-hidden">
        <img
          src={lp.thumbnail || "/images/lp_sample.png"}
          alt="LP"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#434343] border-4 border-[#fdfdfd] rounded-full z-20"></div>
      </div>
    </div>
  </div>
</div>


        <p className="text-sm text-gray-300 text-center mb-4">{lp.content}</p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {lp.tags.map(tag => (
            <span
              key={tag.id}
              className="px-3 py-1 text-sm bg-gray-700 rounded-full text-white"
            >
              #{tag.name}
            </span>
          ))}
        </div>

        <div 
          className="flex justify-center items-center text-pink-500 space-x-1 text-lg cursor-pointer"
          onClick={handleLikeClick}
        >
          <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
          <span>{likesCount}</span>
        </div>
      </div>
    </div>
  );
};

export default LpDetailPage;
