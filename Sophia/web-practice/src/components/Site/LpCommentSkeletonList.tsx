import LpCommentSkeleton from './LpCommentSkeleton';

interface LpCommnetSkeletonListProps {
  count: number;
}

export default function LpCommentSkeletonList({ count }: LpCommnetSkeletonListProps) {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCommentSkeleton key={idx} />
      ))}
    </>
  );
}
