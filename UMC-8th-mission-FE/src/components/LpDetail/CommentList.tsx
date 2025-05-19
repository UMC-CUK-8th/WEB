import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteLpComments from "../../hooks/queries/useInfiniteComment";
import CommentSkeletonList from "./CommentSkeletonList";
import CommentInput from "./CommentInput";
import { MoreVertical, Pencil } from "lucide-react";
import CommentEditSection from "./CommentChange/CommentEditSection";
import CommentDeleteButton from "./CommentChange/CommentDeleteButton";

const CommentList = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [editModeId, setEditModeId] = useState<number | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteLpComments(lpId, order, 10);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleEditClick = (commentId: number) => {
    setEditModeId(commentId);
    setOpenMenuId(null); 
  };

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg max-h-[500px] overflow-y-auto flex flex-col justify-between no-scrollbar">
      <CommentInput lpId={lpId} />
      <div className="flex justify-end mb-2 mt-4">
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value as PAGINATION_ORDER)}
          className="bg-[#2a2a2a] text-white px-2 py-1 rounded"
        >
          <option value="desc">최신순</option>
          <option value="asc">오래된순</option>
        </select>
      </div>
      <div>
        {isLoading ? (
          <CommentSkeletonList count={10} />
        ) : (
          data?.pages
            .flatMap((page) => page.data.data)
            .map((comment) => (
              <div key={comment.id} className="mb-4 border-b border-gray-700 pb-2 relative">
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={comment.author.avatar || "/images/jokeBear.png"}
                    className="w-6 h-6 rounded-full"
                    alt="작성자"
                  />
                  <span className="text-sm font-bold">{comment.author.name}</span>

                  {/* 점 세 개 메뉴 */}
                  <div className="ml-auto relative">
                    <button onClick={() => setOpenMenuId(openMenuId === comment.id ? null : comment.id)}>
                      <MoreVertical className="w-4 h-4 text-gray-400" />
                    </button>
                    {openMenuId === comment.id && (
                      <div className="absolute right-0 mt-2 w-10 bg-gray-800 text-sm rounded shadow-lg z-10">
                        <button
                          className="w-full px-3 py-1 hover:bg-gray-700 text-center"
                          onClick={() => handleEditClick(comment.id)}
                        >
                          <Pencil className="w-3 h-3" />
                        </button>

                        <CommentDeleteButton
                          lpId={lpId}
                          commentId={comment.id}
                          order={order}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {editModeId === comment.id ? (
                  <CommentEditSection
                    lpId={lpId}
                    commentId={comment.id}
                    initialContent={comment.content}
                    onCancel={() => setEditModeId(null)}
                  />
                ) : (
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                )}

              </div>
            ))
        )}
        {isFetchingNextPage && (
          <p className="text-gray-500 text-center">로딩 중...</p>
        )}
        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default CommentList;
