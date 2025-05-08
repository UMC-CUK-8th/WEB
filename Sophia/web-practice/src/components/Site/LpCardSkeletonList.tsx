import LpCardSkeleton from './LpCardSkeleton';

interface LpCardSkeletonListProps {
  count: number;
}

export default function LpCardSkeletonList({ count }: LpCardSkeletonListProps) {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
}
