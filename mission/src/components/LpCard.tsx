import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lp } from "../types/lp";
import { FaHeart } from "react-icons/fa";
import LpImg from '../assets/lp.png';

interface LpCardProps {
  data: Lp;
}

export default function LpCard({ data }: LpCardProps){
  const [isHovered,setIsHovered]=useState(false);
  const navigate=useNavigate();
  return(
    <div className='relative shadow-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105' 
    onMouseEnter={()=>setIsHovered(true)} onMouseLeave={()=>setIsHovered(false)} onClick={() => navigate(`/${data.id}`)}>
      {data.thumbnail ? <img src={data.thumbnail} alt={data.title} className='w-44 h-44 object-cover' /> : <img src={LpImg} alt='LP 기본이미지' className='w-44 h-44 object-cover bg-gray-500'></img>}
      {isHovered && (
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent backdrop-blur-md text-white p-4 flex justify-between items-end'>
          <div>
                    <p className='text-xs font-bold leading-snug'>{data.title}</p>
                    <p className='text-xs  leading-snug'>{data.createdAt.slice(0,10)}</p>
                </div>
                <div className="flex gap-x-1">
                    <FaHeart/> 
                    <p className='text-xs  leading-snug'>{data.likes.length}</p>
                </div>
            </div>
      )}
    </div>
  );
}