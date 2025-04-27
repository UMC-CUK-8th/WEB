import { useState } from 'react';
import { MovieResponse } from '../../types/movie';
import MovieCard from '../../components/Movie/MovieCard';
import LoadingSpinner from '../../components/Movie/LoadingSpinner';
import Pagination from '../../components/Movie/Pagination';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';

export default function MoviePage() {
  const [page, setPage] = useState(1);

  const { category } = useParams<{
    category: string;
  }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  const { data: movies, isPending, isError } = useFetch<MovieResponse>(url);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl flex items-center justify-center h-dvh'>에러가 발생했습니다..😢</span>
      </div>
    );
  }

  return (
    <>
      <Pagination onPrev={() => setPage((prev) => prev - 1)} onNext={() => setPage((next) => next + 1)} page={page} isDisabled={page === 1} />

      {isPending && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        /* 화면 크기에 따른 grid 배치 */
        <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {movies?.results.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </>
  );
}
