import { useCallback, useMemo, useState } from 'react';
import MovieFilter from '../../components/MovieOptimization/MovieFilter';
import MovieList from '../../components/MovieOptimization/MovieList';
import useFetch from '../../hooks/useFetch';
import { MovieFilters, MovieResponse } from '../../types/movie';

export default function HomePage() {
  const [filters, setFilters] = useState<MovieFilters>({
    query: '어벤져스',
    include_adult: false,
    language: 'ko-KR',
  });

  // filters가 객체이기 때문에 useMemo를 사용하여 캐싱
  // filters의 값이 변하지 않으면 리렌더링을 방지
  const axiosRequestConfig = useMemo(
    () => ({
      params: filters,
    }),
    [filters]
  );

  const { data, error, isLoading } = useFetch<MovieResponse>('/search/movie', axiosRequestConfig);

  // useCallback을 통해 함수를 캐싱하여 불필요한 리렌더링 방지
  // setFilters가 변경될 때만 MovieFilter 컴포넌트를 리렌더링
  const handleMovieFilters = useCallback(
    (filters: MovieFilters) => {
      setFilters(filters);
    },
    [setFilters]
  );

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className='container'>
      <MovieFilter onChange={handleMovieFilters} />
      {isLoading ? <div>로딩중..</div> : <MovieList movies={data?.results || []} />}
    </div>
  );
}

// 검색 필터링
// 영화 리스트
