import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { useState } from "react";

interface LpCardProps {
    lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const formatDate = (date: Date): string => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

    return (
        <div 
        onClick={() => navigate(`/lps/${lp.id}`)}
        className="relative rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-120 cursor-pointer z-10"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ zIndex: isHovered ? 10 : 0 }}>
            
            <img 
            src={lp.thumbnail} 
            alt={lp.title} 
            className="object-cover w-full h-full" 
            />

            {isHovered && (
            <div 
                className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent backdrop-blur-xs 
                flex flex-col justify-end items-center p-4"
            >
                <h2 className="text-lg text-gray-100 font-bold leading-snug">
                    {lp.title}
                </h2>
                <p className="text-sm text-white mt-2">
                    {formatDate(lp.createdAt)}
                </p>
            </div>
            )}
        </div>
    );
};

export default LpCard;