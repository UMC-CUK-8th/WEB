import { useState } from "react"
import { MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MoviePage() {
  const [page, setPage] = useState(1);
  const {category} = useParams<{
    category: string;
  }>();

  const url = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`;

  const { data: movies, isPending, isError } = useCustomFetch<MovieResponse>(url, 'ko-KR');

  console.log(movies);

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  return (
    <>
      {isPending && 
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      }

      {!isPending && (
        <div className='p-10 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6'> 
          {/* 실제 화면에 따라 달라지도록 세팅. 반응형 확인 가능. 패딩 10, gap 2*/}
            {movies?.results.map((movie) => 
              <MovieCard key={movie.id} movie={movie}/>
            )}
        </div>
      )}

      {/* {isPending ? (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      ): (
        <div className='p-10 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6'> 
          실제 화면에 따라 달라지도록 세팅. 반응형 확인 가능. 패딩 10, gap 2
            {movies && movies.map((movie) => 
              <MovieCard key={movie.id} movie={movie}/>
            )}
        </div>
      )} */}

      <div className='flex items-center justify-center gap-6 p-10'>
        <button
          className='bg-violet-600 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-violet-500 transition-all duration-200 disabled:bg-gray-600
          cursor-pointer disabled:cursor-not-allowed'// 페이지가 1일 때 눌리지 않도록 disabled로 따로 스타일 적용해줌. 
          disabled={page === 1} 
          onClick={() => setPage((prev) => prev - 1)}
          > {`<`} </button>
        <span className="text-white text-lg font-semibold">{page} 페이지</span>
        <button
          className='bg-violet-600 text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-violet-500 transition-all duration-200 cursor-pointer' // 여기서는 cursor-pointer 효과를 줌.
          onClick={() => setPage((prev) => prev + 1)}> 
          {`>`} 
        </button>
      </div>
    </>
  )
}
