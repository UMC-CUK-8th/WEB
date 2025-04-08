import { useParams } from 'react-router-dom';
import { Credit, MovieDetailResponse } from '../../types/movie';
import LoadingSpinner from '../../components/Movie/LoadingSpinner';
import CreditCard from '../../components/Movie/CreditCard';
import useFetch from '../../hooks/useFetch';

export default function MovieDetail() {
  const { movieId } = useParams();

  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const movieCreditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;

  const { data: movieDetail, isPending: isDetailPending, isError: isDetailError } = useFetch<MovieDetailResponse>(movieDetailUrl, 'ko-KR');
  const { data: credits, isPending: isCreditPending, isError: isCreditError } = useFetch<Credit>(movieCreditUrl, 'ko-KR');

  if (isDetailError || isCreditError) {
    <div className='text-red-500 text-2xl flex items-center justify-center h-dvh'>에러가 발생했습니다..😢</div>;
  }

  return (
    <>
      {(isDetailPending || isCreditPending) && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isDetailPending && !isCreditPending && (
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
              {credits?.cast.map((credit) => (
                <CreditCard image={credit.profile_path} character={credit.character} name={credit.name} key={credit.credit_id} />
              ))}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
