import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import { FaHeart } from "react-icons/fa";

interface lpCardProps {
    lp: Lp;
} 

export default function LpCard({lp}:lpCardProps){
    const [isHovered,setIsHovered]=useState(false);
    const navigate=useNavigate();
    return(
    <div 
    onClick={()=>navigate(`/lp/${lp.id}`)}
    className='relative w-36 h-36 overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105' 
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    >
    <img src={lp.thumbnail} 
        alt={`[${lp.id}] lp의 이미지`}
        className="absolute inset-0 h-full w-full object-cover"/>
        {isHovered && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md text-white p-4 flex justify-between items-end">
                <div>
                    <p className='text-xs font-bold leading-snug'>{lp.title}</p>
                    <p className='text-xs  leading-snug'>{lp.createdAt.slice(0,10)}</p>
                </div>
                <div className="flex gap-x-1">
                    <FaHeart/> 
                    <p className='text-xs  leading-snug'>{lp.likes.length}</p>
                </div>
            </div>)}
    </div>);
}