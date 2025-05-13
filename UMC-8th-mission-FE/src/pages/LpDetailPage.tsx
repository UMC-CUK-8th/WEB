import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetLpDetail } from "../hooks/queries/useGetLpDetail";
import LpHeader from "../components/LpDetail/LpHeader";
import LpImagePlayer from "../components/LpDetail/LpImagePlayer";
import LpTags from "../components/LpDetail/LpTags";
import LpLikeButton from "../components/LpDetail/LpLikeButton";
import FloatingAddButton from "../components/Button/FloatingAddButton";
import CommentList from "../components/LpDetail/CommentList";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";

const LpDetailPage = () => {
  const { lpId } = useParams();
  const { accessToken } = useAuth();
  const { 
    data:lp,
    isLoading,
    isError, 
  } = useGetLpDetail({ lpId: Number(lpId) });

  const { data: me } = useGetMyInfo(accessToken);
  // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리함.
  // mutateAsync -> Promise를 반환해서 await 사용 가능. 
  const { mutate:likeMutate } = usePostLike();
  const { mutate:disLikeMutate } = useDeleteLike();

  // const isLiked = lp?.data.likes
  //   .map((like) => like.userId)
  //   .includes(me?.data.id as number);
  const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);

  const handleLikeLp = () => {
    me?.data.id && likeMutate({ lpId: Number(lpId) });
  }

  const handleDeleteLikeLp = () => {
    me?.data.id && disLikeMutate({ lpId: Number(lpId) });
  }

  // const handleLikeLp = () => {
  //   likeMutate({ lpId: Number(lpId) });
  // }

  // const handleDeleteLikeLp = () => {
  //   disLikeMutate({ lpId: Number(lpId) });
  // }

  const [isRotating, setIsRotating] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleToggleComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleRotateClick = () => {
    setIsRotating(prev => !prev);
  };

  if (isLoading) return <div className="text-white text-center mt-20">로딩~...</div>;
  if (isError || !lp) return <div className="text-white text-center mt-20">데이터를 불러올 수 없습니다...</div>;

  return (
    <div className="flex justify-center mt-10 text-white">
      <div className="bg-[#282A30] p-8 rounded-xl shadow-lg max-w-2xl w-full relative">
        <LpHeader lp={lp.data} />
        <LpImagePlayer thumbnail={lp.data.thumbnail} isRotating={isRotating} onRotate={handleRotateClick} />
        <p className="text-sm text-gray-300 text-center mb-4">{lp.data.content}</p>
        <LpTags tags={lp.data.tags} />
        <LpLikeButton
          isLiked={isLiked}
          onClick={handleLikeLp}
          onDeleteClick={handleDeleteLikeLp}
          onToggleComments={handleToggleComments}
        />

        <div className="mt-8">
          {showComments && <CommentList lpId={lp.data.id} />}
        </div>

        <FloatingAddButton />
      </div>
    </div>
  );
};

export default LpDetailPage;
