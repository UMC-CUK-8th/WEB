import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { PAGINATION_ORDER } from "../../enums/common";
import useGetInfiniteLpComments from "../../hooks/queries/useInfiniteComment";
import CommentSkeletonList from "./CommentSkeletonList";

const CommentInput = ({ onSubmit }: { onSubmit: (content: string) => void }) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    onSubmit(content.trim());
    setContent("");
  };

  return (
    <div className="flex items-center space-x-2 mt-4 border-t border-gray-600 pt-3">
      <img
        src="/images/profile.png"
        alt="내 프로필"
        className="w-8 h-8 rounded-full"
      />
      <input
        type="text"
        placeholder="댓글을 입력하세요..."
        className="flex-1 bg-[#2a2a2a] text-white rounded-full px-4 py-2 text-sm outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="text-sm text-pink-400 font-semibold hover:underline"
      >
        작성
      </button>
    </div>
  );
};

const CommentList = ({ lpId }: { lpId: number }) => {
  const [order, setOrder] = useState<PAGINATION_ORDER>(PAGINATION_ORDER.desc);
  const { ref, inView } = useInView();
  const [localComments, setLocalComments] = useState<any[]>([]);

  const handleAddComment = (content: string) => {
    const newComment = {
      id: Date.now(),
      content,
      author: {
        name: "곰구",
        avatar: "/images/profile.png",
      },
    };
    setLocalComments(prev => [newComment, ...prev]);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useGetInfiniteLpComments(lpId, order);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <div className="bg-[#1e1e1e] p-4 rounded-lg max-h-[500px] overflow-y-auto flex flex-col justify-between no-scrollbar">
      <CommentInput onSubmit={handleAddComment} />
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
          <>
            {localComments.map((comment) => (
              <div key={comment.id} className="mb-4 border-b border-gray-700 pb-2">
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={comment.author.avatar}
                    className="w-6 h-6 rounded-full"
                    alt="작성자"
                  />
                  <span className="text-sm font-bold">{comment.author.name}</span>
                </div>
                <p className="text-gray-300 text-sm">{comment.content}</p>
              </div>
            ))}
            {data?.pages
              .flatMap((page) => page.data.data)
              .map((comment) => (
                <div key={comment.id} className="mb-4 border-b border-gray-700 pb-2">
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={comment.author.avatar || "/images/profile.png"}
                      className="w-6 h-6 rounded-full"
                      alt="작성자"
                    />
                    <span className="text-sm font-bold">{comment.author.name}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{comment.content}</p>
                </div>
              ))}
          </>
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
