import { useState } from "react";
import usePostComment from "../../hooks/mutations/usePostComment";
import { PAGINATION_ORDER } from "../../enums/common";

interface Props {
  lpId: number;
  avatar?: string | null;  
}

const CommentInput = ({ lpId, avatar }: Props) => {
  const [content, setContent] = useState("");
  const postCommentMutation = usePostComment();

  const handleSubmit = () => {
    const trimmedContent = content.trim();
    if (!trimmedContent) return;

    postCommentMutation.mutate(
      { lpId, content: trimmedContent, order: PAGINATION_ORDER.asc },
      {
        onSuccess: () => {
          setContent("");
        },
        onError: () => {
          alert("댓글 작성에 실패했습니다.");
        },
      }
    );
  };

  return (
    <div className="flex items-center space-x-2 mt-4 border-t border-gray-600 pt-3">
      {avatar ? (
        <img
          src={avatar}
          alt="내 프로필"
          className="w-9 h-9 rounded-full object-cover"
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-gray-300" aria-label="프로필 이미지 없음" />
      )}
      <input
        type="text"
        placeholder="댓글을 입력하세요..."
        className="flex-1 bg-[#2a2a2a] text-white rounded-full px-4 py-2 text-sm outline-none"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <button
        onClick={handleSubmit}
        disabled={postCommentMutation.isPending}
        className="text-sm text-pink-400 font-semibold hover:underline disabled:opacity-50"
      >
        {postCommentMutation.isPending ? "작성 중..." : "작성"}
      </button>
    </div>
  );
};

export default CommentInput;
