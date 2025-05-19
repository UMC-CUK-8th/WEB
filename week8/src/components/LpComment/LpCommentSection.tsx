import { useState } from "react";
import useGetInfiniteCommentList from "../../hooks/queries/useGetInfiniteCommentList";
import { PAGINATION_ORDER } from "../../enums/common";
import LpComment from "./LpComment";
import LpCommentSkeletonList from "./LpCommentSkeletonList";
import LpCommentOrder from "./LpCommentOrder";
import LpCommentPost from "./LpCommentPost";
import usePostComment from "../../hooks/mutations/usePostComment";
import { postComment } from "../../apis/lp";

interface LpCommentSectionProps {
  lpId: number;
}

const LpCommentSection = ({ lpId }: LpCommentSectionProps) => {
    const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
    const {
        data: comments,
        isFetching,
        hasNextPage,
        fetchNextPage,
        isPending,
    } = useGetInfiniteCommentList(lpId, 10, order);

    const { mutate: commentMutate } = usePostComment(lpId);

    const handleCommentSubmit = (content: string) => {
        commentMutate(content);
    };

  return (
    <div className="flex flex-col items-center mt-10 w-full max-w-2xl">
      <div className="w-full bg-gray-100 rounded-2xl p-5">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">댓글</h2>
            <LpCommentOrder order={order} setOrder={setOrder} />
        </div>

        <LpCommentPost lpId={lpId} onSubmit={handleCommentSubmit} />

        <div className="space-y-4">
          {isPending && <LpCommentSkeletonList count={10} />}
          {comments?.pages
            ?.flatMap((page) => page.data.data)
            ?.map((comment) => <LpComment comment={comment} key={comment.id} />)}
          {isFetching && <LpCommentSkeletonList count={10} />}
        </div>
      </div>
    </div>
  );
};

export default LpCommentSection;
