import { useState } from "react";
import { usePatchCommentMutation } from "../../../hooks/mutations/usePatchCommentMutation";

type Props = {
  lpId: number;
  commentId: number;
  initialContent: string;
  onCancel: () => void;
};

const CommentEditSection = ({ lpId, commentId, initialContent, onCancel }: Props) => {
  const [content, setContent] = useState(initialContent);
  const { mutate: updateComment } = usePatchCommentMutation();

  const handleSave = () => {
    updateComment({ lpId, commentId, content });
    onCancel();
  };

  return (
    <div className="mt-2">
      <textarea
        className="w-full bg-gray-900 text-white p-2 rounded text-sm"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-600 text-white text-sm px-3 py-1 rounded"
          onClick={handleSave}
        >
          저장
        </button>
        <button
          className="bg-gray-600 text-white text-sm px-3 py-1 rounded"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </div>
  );
};

export default CommentEditSection;
