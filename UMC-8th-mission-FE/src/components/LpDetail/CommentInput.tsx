import { useState } from "react";

interface Props {
  onSubmit: (content: string) => void;
}

const CommentInput = ({ onSubmit }: Props) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content.trim());
      setContent("");
    }
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

export default CommentInput;
