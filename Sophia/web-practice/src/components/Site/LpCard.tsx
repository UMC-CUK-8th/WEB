import { useState } from 'react';
import { Lp } from '../../types/lp';
import { useNavigate } from 'react-router-dom';
import LPImg from '../../assets/LPImg.png';

interface LpCardProps {
  data: Lp;
}

export default function LpCard({ data }: LpCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='relative shadow-lg overflow-hidden cursor-pointer transition-transform duration-500 hover:scale-105' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => navigate(`/${data.id}`)}>
      {data.thumbnail ? <img src={data.thumbnail} alt={data.title} className='w-44 h-44 object-cover' /> : <img src={LPImg} alt='LP 기본이미지' className='w-44 h-44 object-cover bg-gray-500'></img>}

      {isHovered && (
        <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent text-white flex flex-col justify-center p-4'>
          <h2 className='text-md font-bold leading-snug'>{data.title}</h2>
          <div className='flex justify-between'>
            <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{data.createdAt.toString().split('T')[0]}</p>
            <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>{data.likes.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
