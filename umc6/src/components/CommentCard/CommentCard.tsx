import { Comment } from "../../types/lp";

interface commentCardProps {
  comment: Comment;
}

export default function CommentCard({ comment }: commentCardProps) {
  return (
    <div className="flex w-full items-center pt-2">
      <img
        src={`comment.author.avatar`}
        alt={`[${comment.author.avatar}] lp의 이미지`}
        className="rounded-full w-8 h-8"
      />
      <div className="pl-3">
        <p>{comment.author.name}</p>
        <p>{comment.content}</p>
      </div>
    </div>
  );
}
