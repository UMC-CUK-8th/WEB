import { Movie } from "../types/movie";

type Props = {
    movie: Movie;
};

const MovieCard = ({ movie }: Props) => {
    return (
        <div className="relative group rounded overflow-hidden shadow-md aspect-[2/3]">
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover transition duration-300 group-hover:blur-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition duration-300 text-white flex flex-col justify-center items-center p-4 text-center">
                <h2 className="text-xs font-semibold mb-1">{movie.title}</h2>
                <p className="text-[10px] line-clamp-3">{movie.overview}</p>
            </div>
        </div>
    );
};

export default MovieCard;