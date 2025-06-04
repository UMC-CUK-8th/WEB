import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import { MovieFilters, MovieResponse } from "../types/movie";

function HomePage() {
    const [filters, setFilters] = useState<MovieFilters>({
        query: "어벤져스",
        include_adult: false,
        language: "ko-KR",
    });

    const axiosRequestConfig = useMemo(() => ({
        params: filters,
    }), [filters]);

    const { data, error, isLoading } = useFetch<MovieResponse>("/search/movie", axiosRequestConfig);

    const handleMovieFilters = useCallback(
        (filters: MovieFilters) => {
            setFilters(filters);
        }, [setFilters]
    );

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container">
            <MovieFilter onChange={handleMovieFilters} />
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <MovieList movies={data?.results || []} />
            )}
        </div>
    );
}

export default HomePage;