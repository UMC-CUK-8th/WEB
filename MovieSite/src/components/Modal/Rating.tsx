import React from "react";

type RatingProps = {
  score: number;
  count: number;
};

const Rating: React.FC<RatingProps> = ({ score, count }) => {
  return (
    <div className="flex items-center gap-2">
      <span className="text-2xl font-bold text-blue-500">{score.toFixed(1)}</span>
      <span className="text-sm text-gray-400">({count}명)</span>
    </div>
  );
};

export default Rating;
