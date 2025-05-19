import { Heart, MessageCircle } from "lucide-react"; // 말풍선 아이콘

interface LpLikeButtonProps {
  isLiked?: boolean;
  onClick: () => void;
  onDeleteClick: () => void;
  onToggleComments: () => void;
}

const LpLikeButton = ({
  isLiked,
  onClick,
  onDeleteClick,
  onToggleComments,
}: LpLikeButtonProps) => (
  <div className="flex justify-center items-center space-x-4 text-lg">
    <button onClick={isLiked ? onDeleteClick:onClick}>
      <Heart color={isLiked ? "red": "#fdfdfd"} fill={isLiked ? "red": "transparent"}/>
    </button>

    <div
      className="flex items-center text-white space-x-1 cursor-pointer"
      onClick={onToggleComments}
    >
      <MessageCircle className="w-6 h-6" />
    </div>
  </div>
);

export default LpLikeButton;
