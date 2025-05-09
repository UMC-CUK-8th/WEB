import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import LpHeader from "../components/LpDetail/LpHeader";
import LpImagePlayer from "../components/LpDetail/LpImagePlayer";
import LpTags from "../components/LpDetail/LpTags";
import LpLikeButton from "../components/LpDetail/LpLikeButton";
import FloatingAddButton from "../components/Button/FloatingAddButton";
import CommentList from "../components/LpDetail/CommentList";

const LpDetailPage = () => {
  const { id } = useParams();
  const lpId = Number(id);
  const { data, isLoading, isError } = useGetLpDetail(lpId);

  const [isLiked, setIsLiked] = useState(false);  
  const [likesCount, setLikesCount] = useState(0); 
  const [isRotating, setIsRotating] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

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
    setIsRotating(prev => !prev);
  };

  if (isLoading) return <div className="text-white text-center mt-20">로딩~...</div>;
  if (isError || !data) return <div className="text-white text-center mt-20">데이터를 불러올 수 없습니다...</div>;

  const lp = data.data;

  return (
    <div className="flex justify-center mt-10 text-white">
      <div className="bg-[#282A30] p-8 rounded-xl shadow-lg max-w-2xl w-full relative">
        <LpHeader lp={lp} />
        <LpImagePlayer thumbnail={lp.thumbnail} isRotating={isRotating} onRotate={handleRotateClick} />
        <p className="text-sm text-gray-300 text-center mb-4">{lp.content}</p>
        <LpTags tags={lp.tags} />
        <LpLikeButton
          isLiked={isLiked}
          likesCount={likesCount}
          onClick={handleLikeClick}
          onToggleComments={handleToggleComments}
        />

        <div className="mt-8">
          {showComments && <CommentList lpId={lp.id} />}
        </div>

        <FloatingAddButton />
      </div>
    </div>
  );
};

export default LpDetailPage;
