import type { Movie } from "../types/movie";

interface MovieCardProps {
    movie:Movie
    onClick: () => void;
}

const MovieCard=({movie,onClick}:MovieCardProps)=>{
    const imageBaseUrl="https://image.tmdb.org/t/p/w500"
    const fallbackImage="https://via.placeholder.com/640x480"
    return (
        <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg" onClick={onClick}>
            <div className="overflow-hidden relative h-80">
                <img src={movie.poster_path?`${imageBaseUrl}${movie.poster_path}`
                : fallbackImage
                }
                className="h-full w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"/>
            <div className="bg-black-500 absolute right-2 top-2 rounded-md px-2 py-1 text-sm font-bold text-white">
                {movie.vote_average.toFixed(1)}
            </div>
            </div>
        <div className="p-4 text-center">
            <h3 className="mb-2 text-lg font-bold text-gray-800">{movie.title}</h3>
            <p className="text-sm text-gray-699">
                {movie.release_date} | {movie.original_language.toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-gray-700">
                {movie.overview.length>100?`${movie.overview.slice(0,100)}...`:movie.overview}
            </p>

        </div>


        </div>
    )
}

export default MovieCard;