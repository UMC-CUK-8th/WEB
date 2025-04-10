import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { useParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/LoadingSpinner';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const params = useParams();

  //1.로딩 상태
  const [isPending,setIsPending]=useState(false);
  //2. 에러 상태
  const [isError,setIsError]=useState(false);
  //3. 페이지
  const [page,setPage]=useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsPending(true);

      try{
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${params.movieId}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      setMovies(data.results);
    
    } catch{
      setIsError(true);
      
    }finally{ //try와 catch 모두 마지막에 넣을 공통 코드를 이렇게 따로 뺄 수 있음 
      setIsPending(false);
    }
    };

    fetchMovies();
  }, [page,params.movieId]);
 

  if (isError){
    return <div>
      <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span></div>
  }
  return ( 
    <>
      <div className='flex items-center justify-center gap-6 mt-5'>
        <button
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 disabled:bg-gray-300
        cursor-pointer disabled:cursor-not-allowed'
        disabled={page===1}
        onClick={()=>setPage((prev)=>prev-1)}>{`<`}</button>
        <span>{page}페이지</span>
        <button 
        className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md
        hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer'
        onClick={()=>setPage((prev)=>prev+1)}>{`>`}</button>
        
      </div>

      {isPending && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner/>
        </div>
      )}
      {!isPending &&(
      <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
        {movies?.map((movie) => (<MovieCard key={movie.id} movie={movie}/>
        ))}
      </div>
      )}
    </>
  );
};

export default MoviesPage;