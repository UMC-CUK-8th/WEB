import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Cast, Credit, MovieDetailResponse } from '../../types/movie';
import LoadingSpinner from '../../components/Movie/LoadingSpinner';
import CreditCard from '../../components/Movie/CreditCard';

export default function MovieDetail() {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState<MovieDetailResponse>();
  const [credits, setCredits] = useState<Cast[]>([]);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetailResponse>(`https://api.themoviedb.org/3/movie/${movieId}?language=en-US`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        setMovieDetail(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    const fetchMovieCredit = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<Credit>(`https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`, {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        });

        setCredits(data.cast);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    fetchMovieDetail();
    fetchMovieCredit();
  }, [movieId]);

  if (isError) {
    <div className='text-red-500 text-2xl flex items-center justify-center h-dvh'>에러가 발생했습니다..😢</div>;
  }

  return (
    <>
      {isPending && (
        <div className='felx items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isPending && (
        <div className='bg-black'>
          <section className='relative overflow-hidden p-4'>
            <img src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`} alt={movieDetail?.title} className='w-full h-80 object-cover rounded-xl' />
            <div className='absolute w-1/3 min-w-[365px] inset-0 p-6 text-white bg-gradient-to-r from-black from-30% to-transparent'>
              <h1 className='font-semibold text-xl'>{movieDetail?.title}</h1>
              <p>평점 {movieDetail?.vote_average}</p>
              <time>{movieDetail?.release_date}</time>
              <p>{movieDetail?.runtime}분</p>
              <p className='pt-2 w-full h-2/3'>{movieDetail?.overview}</p>
            </div>
          </section>

          <section>
            <h2 className='font-semibold text-xl text-white p-4'>감독/출연</h2>
            <div className='grid gap-4 grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 justify-items-center'>
              {credits.map((credit) => (
                <CreditCard image={credit.profile_path} character={credit.character} name={credit.name} key={credit.credit_id} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
