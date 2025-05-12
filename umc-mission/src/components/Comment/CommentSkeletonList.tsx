import CommentSkeleton from "./CommentSkeleton";

const CommentSkeletonList = ({ count = 3 }: { count: number }) => {
  return (
    <>
      {Array.from({ length: count }, (_, idx) => (
        <CommentSkeleton key={idx} />
      ))}
    </>
  );
};

export default CommentSkeletonList;
