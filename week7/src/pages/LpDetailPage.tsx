import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import LpDetail from "../components/LpDetail";
import LpCommentSection from "../components/LpComment/LpCommentSection";

const LpDetailPage = () => {
    const { lpId } = useParams();
    const { accessToken } = useAuth();
    const { data: lp, isPending, isError } = useGetLpDetail({lpId: Number(lpId)});
    const { data: me } = useGetMyInfo(accessToken);

    // mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업 처리
    // mutateAsync -> 비동기 요청을 실행하고, Promise를 반환해서 await 사용 가능
    const { mutate: likeMutate } = usePostLike();
    const { mutate: dislikeMutate } = useDeleteLike();

    // const isLiked = lp?.data.likes
    //   .map((like) => like.userId)
    //   .includes(me?.data.id as number);

    const isLiked = lp?.data.likes.some((like) => like.userId === me?.data.id);
    
    const handleLikeLp = () => {
      likeMutate({ lpId: Number(lpId) });
    };

    const handleDislikeLp =  () => {
      dislikeMutate({ lpId: Number(lpId) });
    };

    if (isPending && isError) {
      return <></>;
    }

    return (
      <>
        <div className="mt-12 flex flex-col items-center">
          <LpDetail
            title={lp?.data.title ?? ""}
            thumbnail={lp?.data.thumbnail ?? ""}
            content={lp?.data.content ?? ""}
            isLiked={isLiked ?? false}
            onLike={handleLikeLp}
            onDislike={handleDislikeLp}
          />

          <LpCommentSection lpId={Number(lpId)} />
        </div>
      </>
    )
  };
  
  export default LpDetailPage;