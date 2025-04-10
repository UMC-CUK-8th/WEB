import { useState } from "react";
import { Movie } from "../types/movie";
import { useNavigate } from "react-router-dom";

interface MovieCardProps{
    movie: Movie;
}


export default function MovieCard({movie}:MovieCardProps){
    const [isHovered,setIsHovered]=useState(false);
    const navigate=useNavigate();
    return(
    <div 
    onClick={()=>navigate(`/movie/${movie.id}`)}
    className='relative rounded-xl shadow-lg overflow-hidden cursor-pointer w-44 transition-transform duration-500 hover:scale-105' 
    onMouseEnter={()=>setIsHovered(true)}
    onMouseLeave={()=>setIsHovered(false)}
    >
    <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
        alt={`[${movie.title}] 영화의 이미지`}/>
        {isHovered && (
            <div className="absolute inset-0 bg-gradient-to t from-black/50 to-transparent backdrop-blur-md text-white flex flex-col justify-center items-center p-4">
                <h2 className='text-lg font-bold text-center leading-snug'>{movie.title}</h2>
                <p className='text-sm text-gray-300 leading-relaxed mt-2 line-clamp-6'>{movie.overview}</p>
            </div>)}
    </div>);
}