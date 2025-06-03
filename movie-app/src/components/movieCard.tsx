import { Movie } from "../types/movie";
import { Link } from "react-router-dom";
import { memo } from "react";

type Props = {
    movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
    return (
        <Link
            to={`/movies/${movie.id}`}
            className="block"
        >
            <div className="relative group rounded overflow-hidden shadow-md aspect-[2/3]">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/src/assets/icon/defaultImage.png" }
                    alt={movie.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 text-white flex flex-col justify-center items-center p-4 text-center">
                    <h2 className="text-xs font-semibold mb-1">{movie.title}</h2>
                    <p className="text-[10px] line-clamp-3">{movie.overview || "줄거리 없음"}</p>
                </div>
            </div>
        </Link>
    );
};

export default memo(MovieCard);