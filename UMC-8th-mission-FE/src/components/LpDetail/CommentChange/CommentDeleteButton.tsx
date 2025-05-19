import { Trash2 } from "lucide-react";
import { useDeleteCommentMutation } from "../../../hooks/mutations/useDeleteCommentMutation";

type Props = {
  lpId: number;
  commentId: number;
  order: string;
};

const CommentDeleteButton = ({ lpId, commentId, order }: Props) => {
  const { mutate: deleteComment } = useDeleteCommentMutation();

  const handleClick = () => {
    deleteComment({ lpId, commentId, order });
  };

  return (
    <button
      className="w-full px-3 py-1 hover:bg-gray-700 text-center"
      onClick={handleClick}
    >
      <Trash2 className="w-3 h-3" />
    </button>
  );
};

export default CommentDeleteButton;
