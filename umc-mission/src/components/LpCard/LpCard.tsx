import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useAuth } from "../../context/AuthContext";

interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
}

interface LpCardProps{
    lp:Lp
}

const LpCard=({lp}:LpCardProps)=>{

    const navigate = useNavigate();
    const { accessToken } = useAuth();

    const handleClick = () => {
        if (!accessToken) {
          const confirmed = window.confirm("로그인 후 이용 가능합니다. ");
          if (confirmed) {
            navigate("/login");
          }
        } else {
          navigate(`/lp/${lp.id}`);
        }
      };
      console.log(lp);

    return (
        <div 
        onClick={handleClick}
        className="relative rounded-lg overflow-hidden shadow-lg  hover:opacity-100 hover:shadow-2xl transition-shadow duration-300 hover:scale-105">

        <img src={lp.thumbnail} alt={lp.title} className="object-cover w-full h-48 "/>
        <div className="absolute inset-0 hover:bg-opacity-60 transition duration-300 flex items-end ">
        <div className="text-white p-4 bg-black opacity-0 hover:opacity-100 transition-opacity duration-300 w-full">
          <h3 className="text-sm font-semibold mb-1">{lp.title}</h3>
          <p className="text-sm">{new Date(lp.updatedAt).toLocaleDateString("ko-KR")}</p>
          <p className="text-sm">❤️ {lp.likes.length}개</p>
        </div>
      </div>
        
    </div>
    );
};

export default LpCard;