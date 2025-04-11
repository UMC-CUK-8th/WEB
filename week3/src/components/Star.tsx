import { FaStar } from 'react-icons/fa6';
import { useState } from 'react';

interface IStarProps {
  w: string;
  h: string;
  readonly: boolean;
  rate?: number;
}

export default function Star({ w, h, readonly, rate }: IStarProps) {
  const [rating, setRating] = useState(rate || 0);

  const calculateRate = (rate: number, index: number) => {
    if (rate >= index) return '100%';
    if (Math.floor(index - rate) > 0) return '0%';
    return `${((rate % 1) * 100).toFixed()}%`;
  };

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={`relative ${w} ${h}`}>
          {/* 빈 별 */}
          <FaStar className={`text-gray-400 ${w} ${h}`} />

          {/* 채워진 별 */}
          {readonly && (
            <div
              className={`absolute top-0 left-0 overflow-hidden ${h}`}
              style={{ width: calculateRate(rating, index + 1) }}
            >
              <FaStar className={`text-yellow-400 ${w} ${h}`} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

//  https://chaeyoung2.tistory.com/144 참고..