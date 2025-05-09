import { MessageCircle } from "lucide-react"; // 말풍선 아이콘

interface LpLikeButtonProps {
  isLiked: boolean;
  likesCount: number;
  onClick: () => void;
  onToggleComments: () => void;
}

const LpLikeButton = ({
  isLiked,
  likesCount,
  onClick,
  onToggleComments,
}: LpLikeButtonProps) => (
  <div className="flex justify-center items-center space-x-4 text-lg">
    <div
      className="flex items-center text-pink-500 space-x-1 cursor-pointer"
      onClick={onClick}
    >
      <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
      <span>{likesCount}</span>
    </div>

    <div
      className="flex items-center text-white space-x-1 cursor-pointer"
      onClick={onToggleComments}
    >
      <MessageCircle className="w-6 h-6" />
    </div>
  </div>
);

export default LpLikeButton;
