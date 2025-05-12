import { useState } from "react";

import CommentSkeletonList from "./CommentSkeletonList";
import { useGetInfiniteCommentList } from "../../hooks/queries/useGetInfiniteCommentList";
import { Comment } from "../../types/lp";
const CommentSection = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<"asc" | "desc">("desc");
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteCommentList(lpId, order);

  const comments: Comment[] = data?.pages.flatMap((page) => page.data.data) ?? [];


  return (
    <div className="mt-8">
      <h2 className="text-lg font-bold mb-4">댓글</h2>

      {/* 댓글 입력창 */}
      <div className="mb-4">
        <textarea
          className="w-full p-2 border rounded resize-none"
          placeholder="댓글을 입력하세요"
          disabled
        />
        <button className="mt-2 bg-gray-400 text-white px-4 py-1 rounded" disabled>
          등록
        </button>
      </div>

      {/* 정렬 버튼 */}
      <div className="mb-4 space-x-2">
        <button
          className={`px-3 py-1 border rounded ${order === "desc" ? "bg-black text-white" : ""}`}
          onClick={() => setOrder("desc")}
          disabled={order === "desc"}
        >
          최신순
        </button>
        <button
          className={`px-3 py-1 border rounded ${order === "asc" ? "bg-black text-white" : ""}`}
          onClick={() => setOrder("asc")}
          disabled={order === "asc"}
        >
          오래된순
        </button>
      </div>

      {/* 댓글 리스트 */}
      {isLoading ? (
        <CommentSkeletonList count={3} />
      ) : (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="border-b pb-2">
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleString()}
              </p>
              <textarea
                className="w-full p-1 mt-2 border rounded resize-none"
                placeholder="댓글 수정"
                disabled
              />
              <button className="mt-1 bg-gray-400 text-white px-3 py-1 rounded" disabled>
                수정
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* 더 보기 버튼 */}
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
        </button>
      )}
    </div>
  );
};

export default CommentSection;
