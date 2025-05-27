import { useState } from "react";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps {
    movie: Movie;
}

export default function MovieCard({movie}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div 
        // onClick={() => (window.location.href = `/movies/now_playing/${movie.id}`)}
        onClick={() => navigate(`/movies-detail/${movie.id}`)}
        className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer
        w-44 transition-transform duration-500 hover:scale-105' // absolute는 나를 따라와. transition으로 영화 목록 눌렀을 때 살짝 커지는 효과 적용.
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        <img
            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
            alt={`${movie.title} UMC 영화의 이미지`}
            className=''
            />

        {isHovered && (
            <div className='absolute inset-0 bg-gradient-to-t from-black/50
                to-transparent backdrop-blur-md flex flex-col justfy-center
                items-center text-white' // 상하좌우 다 0으로 가야 한다면, inset-0를 해줘야 한다.
            >
                <h2 className='text-lg font-bold text-center leading-snug'>
                    {movie.title}
                </h2>
                <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-5'>
                    {movie.overview}
                </p>
            </div>
        )}
    </div>
  )
}