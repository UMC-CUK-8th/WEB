import { useState } from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import LoadingSpinner from "../components/loading";
import Pagination from "../components/pagination";
import MovieCard from "../components/movieCard";

const NowPlayingMoviesPage = () => {
    const [page, setPage] = useState(1);
    const { movies, loading, error } = useFetchMovies("/movie/now_playing", page);

    if (loading) {
        return (
          <div className="h-screen w-full flex items-center justify-center">
            <LoadingSpinner />
          </div>
        );
    }

    if (error) {
        return (
          <div className="h-screen w-full flex items-center justify-center">
            <p className="text-red-500 text-lg font-semibold">에러가 발생했습니다. 😢</p>
          </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-start bg-gray-50 pt-8 pb-12">
            <h1 className="text-2xl font-bold mb-6">상영 중인 영화</h1>
            <div className="grid grid-cols-5 gap-3 w-[90%] max-w-[1200px]">
                {movies?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
            <Pagination page={page} onPageChange={setPage} />
        </div>
    );
};

export default NowPlayingMoviesPage;