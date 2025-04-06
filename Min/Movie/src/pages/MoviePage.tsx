import { useEffect, useState } from "react"
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";
import MovieCard from "../components/MovieCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useParams } from "react-router-dom";

export default function MoviePage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  
  // 1. 로딩 상태
  const [isPending, setIsPending] = useState(false);
  // 2. 에러 상태
  const [isError, setIsError] = useState(false);
  // 3. 페이지 
  const [page, setPage] = useState(1);

  const {category} = useParams<{
    category: string;
  }>();

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try {
        const {data} = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            }
          }
        );

        setMovies(data.results);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };
    
    fetchMovies();
  }, [page, category]);

  // if (!isPending) {
  //   return <LoadingSpinner />;
  // }

  if (isError) {
    return (
      <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
          className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
          cursor-pointer disabled:cursor-not-allowed' // 페이지가 1일 때 눌리지 않도록 disabled로 따로 스타일 적용해줌. 
          disabled={page === 1} 
          onClick={() => setPage((prev) => prev - 1)}
          > {`<`} </button>
        <span>{page} 페이지</span>
        <button
          className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
          hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer' // 여기서는 cursor-pointer 효과를 줌.
          onClick={() => setPage((prev) => prev + 1)}> 
          {`>`} 
        </button>
      </div>

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
      
      {isPending && 
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      }

      {!isPending && (
        <div className='p-10 grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4
          lg:grid-cols-5 xl:grid-cols-6'> 
          {/* 실제 화면에 따라 달라지도록 세팅. 반응형 확인 가능. 패딩 10, gap 2*/}
            {movies && movies.map((movie) => 
              <MovieCard key={movie.id} movie={movie}/>
            )}
        </div>
      )}
    </>
  )
}
