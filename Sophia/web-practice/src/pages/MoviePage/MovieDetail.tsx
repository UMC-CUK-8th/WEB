import { useParams } from 'react-router-dom';
import { Credit, MovieDetailResponse, MovieVideoResponse } from '../../types/movie';
import LoadingSpinner from '../../components/Movie/LoadingSpinner';
import CreditCard from '../../components/Movie/CreditCard';
import useFetch from '../../hooks/useFetch';
import Star from '../../assets/star.svg';
import HalfStar from '../../assets/halfStar.svg';
import FilledStar from '../../assets/filledStar.svg';
import Play from '../../assets/play.svg';
import { useEffect, useRef, useState } from 'react';

export default function MovieDetail() {
  const { movieId } = useParams();
  // 모달창 열기/닫기
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 모달창 바깥 영역 참조 (DOM 요소에 직접 접근)
  const modalBackground = useRef<HTMLDivElement | null>(null);

  const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}`;
  const movieCreditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits`;
  const movieTrailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`;

  const { data: movieDetail, isPending: isDetailPending, isError: isDetailError } = useFetch<MovieDetailResponse>(movieDetailUrl, 'ko-KR');
  const { data: credits, isPending: isCreditPending, isError: isCreditError } = useFetch<Credit>(movieCreditUrl, 'ko-KR');
  const { data: movieVideos, isPending: isTrailerPending, isError: isTrailerError } = useFetch<MovieVideoResponse>(movieTrailerUrl);

  const trailer = movieVideos?.results.find((video) => video.name === 'Official Trailer');

  if (isDetailError || isCreditError || isTrailerError) {
    <div className='text-red-500 text-2xl flex items-center justify-center h-dvh'>에러가 발생했습니다..😢</div>;
  }

  // 평점별 별점 렌더링 함수
  const returnAverage = (avg: number | undefined) => {
    const star = [];
    const filledStar = avg ? Math.floor(avg / 2) : 0;
    const halfStar = avg ? (avg % 2 >= 1 ? 1 : 0) : 0;
    const blackStar = 5 - (filledStar + halfStar);

    // 배열에 JSX 요소를 넣어 반환할 때 각 요소를 순차적으로 렌더링
    if (filledStar) {
      for (let i = 0; i < filledStar; i++) {
        star.push(<img src={FilledStar} key={`filled-${i}`} />);
      }
    }

    if (halfStar) {
      star.push(<img src={HalfStar} key={`half`} />);
    }

    if (blackStar) {
      for (let i = 0; i < blackStar; i++) {
        star.push(<img src={Star} key={`black-${i}`} />);
      }
    }

    return star;
  };

  // 모달창 바깥 영역 클릭 시 모달창 닫기
  useEffect(() => {
    const handleClickModalBackground = (e: MouseEvent) => {
      // 모달이 열려 있고, useRef로 만든 ref 객체의 현재 DOM 요소가 존재하고, 이벤트가 발생한 부분이 모달 내부(모달 내용 부분)이 아니라면
      if (isModalOpen && modalBackground.current && !modalBackground.current.contains(e.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickModalBackground);

    // 클린업 함수
    return () => {
      document.removeEventListener('mousedown', handleClickModalBackground);
    };
  }, [isModalOpen]);

  return (
    <>
      {(isDetailPending || isCreditPending || isTrailerPending) && (
        <div className='flex items-center justify-center h-dvh'>
          <LoadingSpinner />
        </div>
      )}

      {!isDetailPending && !isCreditPending && (
        <div className='bg-black'>
          <section className='relative overflow-hidden p-4'>
            <img src={`https://image.tmdb.org/t/p/original/${movieDetail?.backdrop_path}`} alt={movieDetail?.title} className='w-full h-100 object-cover rounded-xl' />
            <div className='absolute w-1/3 min-w-[365px] inset-0 p-6 text-white bg-gradient-to-r from-black from-30% to-transparent'>
              <div className='flex gap-5'>
                <h1 className='font-semibold text-xl'>{movieDetail?.title}</h1>
                <button type='button' className='border-white border-2 px-2 rounded-sm cursor-pointer' onClick={() => setIsModalOpen(true)}>
                  <img src={Play} alt='예고편 보기' />
                </button>
              </div>
              <p>평점 {movieDetail?.vote_average}</p>
              <p className='flex'>{returnAverage(movieDetail?.vote_average || 0)}</p>
              <time>{movieDetail?.release_date}</time>
              <p>{movieDetail?.runtime}분</p>
              <p className='pt-1 w-full h-2/3 overflow-scroll' style={{ scrollbarWidth: 'none' }}>
                {movieDetail?.overview}
              </p>
            </div>
          </section>

          {/* 모달창 */}
          <section>
            {isModalOpen && trailer && (
              <div className='fixed inset-0 bg-black/80 flex items-center justify-center z-50'>
                <div ref={modalBackground} className='p-4 max-w-[90%] w-[720px]'>
                  <div className='aspect-video w-full'>
                    {/* 자동재생 & 음소거 */}
                    <iframe className='w-full h-full rounded-lg' src={`https://www.youtube.com/embed/${trailer?.key}?autoplay=1&mute=1`} title='movie trailer' allow='autoplay; encrypted-media' allowFullScreen />
                  </div>
                </div>
              </div>
            )}
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
