import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch"
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: "ko-KR",
  });

  const axiosRequestConfig = useMemo(
    () : { params: MovieFilters } => ({
      params: filters,
    }), 
    [filters],
  );

  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    }, 
    [setFilters],
  ); // setFilters 값이 변경이 되지 않는 한 같은 함수로 유지가 됨. 

  const { data, error, isLoading } = 
  useFetch<MovieResponse>(
    "/search/movie", 
    axiosRequestConfig,
  );

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="container">
        <MovieFilter onChange={handleMovieFilters} />
        {isLoading ? (
            <div>로딩 중입니다...</div>
        ) : (
            <MovieList movies={data?.results || []} />
        )}
    </div>
  )
}

// 검색 필터
// 영화 무비