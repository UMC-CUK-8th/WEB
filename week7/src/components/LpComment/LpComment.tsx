import { Comment } from "../../types/lp";

interface CommentProps {
    comment: Comment;
}

const LpComment = ({ comment }: CommentProps) => {

    return (
        <div className="flex items-start">
        <img
          src={comment.author.avatar}
          alt={comment.author.name}
          className="w-15 h-15 rounded-full border-1 border-gray-300 mr-3"
        />
        <div>
          <h2 className="font-semibold text-gray-800 mt-[5px] mb-[5px]">
            {comment.author.name}
          </h2>
          <p className="text-sm text-gray-700">{comment.content}</p>
        </div>
      </div>
    );
};

export default LpComment;