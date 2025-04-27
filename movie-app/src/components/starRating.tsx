import { FC } from "react";

interface StarRatingProps {
  rating: number; // 0 ~ 10
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  const fiveStar = rating / 2 ; // 별 5개로
  const fullStars = Math.floor(fiveStar); // 정수 
  const fractional = fiveStar - fullStars; // 소수 
  const formattedScore = fiveStar.toFixed(2);

  return (
    <div className="flex items-center gap-1">
      {/* 별 아이콘 */}
      <div className="flex gap-[2px]">
        {Array.from({ length: 5 }).map((_, i) => {
          if (i < fullStars) {
            // 꽉 찬 별
            return (
              <span key={i} className="text-yellow-400 text-[16px] leading-[16px] align-middle">★</span>
            );
          } else if (i === fullStars && fractional > 0) {
            // 부분 별
            return (
              <span key={i} className="relative inline-block w-[16px] h-[16px] text-[16px] leading-[16px] align-middle">
                {/* 빈 별 (배경) */}
                <span className="absolute inset-0 text-gray-300">★</span>
                {/* 채워진 부분 */}
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${fractional * 100}%` }}
                >
                  <span className="text-yellow-400">★</span>
                </span>
              </span>
            );
          } else {
            // 빈 별
            return (
              <span key={i} className="text-gray-300 text-[16px] leading-[16px] align-middle">★</span>
            );
          }
        })}
      </div>

      {/* 별 오른쪽 점수 */}
      <span className="text-[10px] leading-[10px] text-gray-500">{formattedScore} / 5</span>
    </div>
  );
};

export default StarRating;
