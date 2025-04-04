import { useEffect, useState } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviesPage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);

    const API_URL = import.meta.env.VITE_TMDB_MOVIE_API_URL;
    const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    useEffect(() => {
        const fetchMovies = async () => {
            const { data } = await axios.get<MovieResponse>(
                `${API_URL}/movie/popular?language=ko-KR&page=1`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                }
            );

            setMovies(data.results);
        };

        fetchMovies();
    }, []);

    return (
        <div className="w-full h-screen justify-center items-center">
            <h1 className="text-xl font-bold mb-4">인기 영화 TOP 20</h1>
            <div className="grid grid-cols-5 gap-3 w-[90%] max-w-[1200px]">
                {movies?.map((movie) => (
                    <div
                    key={movie.id}
                    className="relative group rounded overflow-hidden shadow-md aspect-[2/3]"
                    >
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
                ))}
            </div>
        </div>
    );
};

export default MoviesPage;