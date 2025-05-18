import { Heart } from "lucide-react";

interface LpDetailProps {
    title: string;
    thumbnail: string;
    content: string;
    isLiked: boolean;
    onLike: () => void;
    onDislike: () => void;
}

const LpDetail = ({ title, thumbnail, content, isLiked, onLike, onDislike }: LpDetailProps) => {

    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">{title}</h1>
        <img
          src={thumbnail}
          alt={title}
          className="m-5 rounded-full border-2 border-gray-300 shadow-lg"
          style={{
            animation: "spin 10s linear infinite",
            width: "500px",
            height: "500px",
          }}
        />
        <p className="m-3">{content}</p>
        <button className="m-5 cursor-pointer" onClick={isLiked ? onDislike : onLike}>
          <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"} />
        </button>
      </div>
    );
  };

export default LpDetail;