import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; // AuthContext에서 로그인 상태 가져오기

interface LpCardProps {
  thumbnail: string;
  title: string;
  date: string;
  likes: number;
  lpId: string;
}

const LpCard = ({ thumbnail, title, date, likes, lpId }: LpCardProps) => {
  const { accessToken } = useAuth(); // 로그인 상태 확인
  const navigate = useNavigate();

  const handleCardClick = () => {
    if (accessToken) {
      // 로그인된 경우 해당 LP 페이지로 이동
      navigate(`/lp/${lpId}`);
    } else {
      // 로그인되지 않은 경우 로그인 페이지로 리디렉션
      alert("로그인이 필요합니다. 확인 후 로그인 페이지로 이동합니다.");
      navigate("/login");
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-lg group cursor-pointer"
      onClick={handleCardClick}
    >
      <img
        src={thumbnail}
        alt="LP Thumbnail"
        className="w-full aspect-square object-cover transform transition-transform duration-300 group-hover:scale-105"
      />
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white text-center px-2">
        <p
          className="font-semibold text-sm line-clamp-2 w-full px-2"
          title={title}
        >
          {title}
        </p>
        <p className="text-xs">{date}</p>
        <p className="flex items-center gap-1 text-xs mt-1">
          <FaHeart className="text-red-500" /> {likes}
        </p>
      </div>
    </div>
  );
};

export default LpCard;
