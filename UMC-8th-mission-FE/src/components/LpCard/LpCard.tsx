import { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom"; 

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const { accessToken } = useAuth(); 
  const navigate = useNavigate(); 

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsLiked(!isLiked);
  };

  const timeAgo = formatDistanceToNow(new Date(lp.createdAt), { addSuffix: true });

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!accessToken) {
      setShowAlert(true);
    } else {
      navigate(`/lp/${lp.id}`);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false); 
    navigate("/login");
  };

  return (
    <div className="relative rounded-lg overflow-hidden shadow-lg group hover:scale-105 transition-transform duration-300 bg-[#434343]">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="w-full h-64 object-cover transition-opacity duration-300 opacity-100 group-hover:opacity-50"
      />

      <div className="absolute top-0 left-0 right-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-between">
        <div>
          <h3
            className="text-white text-sm font-semibold cursor-pointer inline-block max-w-full truncate"
            onClick={handleTitleClick}
          >
            {lp.title}
          </h3>
          <div className="text-white text-xs mt-1">{timeAgo}</div>
        </div>

        <div
          onClick={handleLikeClick}
          className="absolute top-2 right-2 cursor-pointer"
        >
          <span className="text-2xl">{isLiked ? "❤️" : "🤍"}</span>
          <span className="ml-1 text-sm">{isLiked ? "1" : "0"}</span>
        </div>
      </div>

      {showAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-30">
          <div className="bg-white p-6 rounded-lg text-center max-w-sm">
            <h3 className="text-lg font-semibold">로그인 후 사용 가능합니다!</h3>
            <button
              onClick={handleAlertClose}
              className="mt-4 bg-pink-500 text-white px-4 py-2 rounded"
            >
              확인
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LpCard;
