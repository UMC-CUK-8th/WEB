import CommentSkeleton from "./CommentSkeleton";

const CommentSkeletonList = ({ count = 10 }: { count?: number }) => {
  return (
    <div>
      {Array.from({ length: count }).map((_, i) => (
        <CommentSkeleton key={i} />
      ))}
    </div>
  );
};

export default CommentSkeletonList;
