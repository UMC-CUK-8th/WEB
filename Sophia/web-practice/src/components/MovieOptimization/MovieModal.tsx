import { useRef } from 'react';
import { Movie } from '../../types/movie';
import { X } from 'lucide-react';

interface MovieModalProps {
  movie: Movie;
  setIsOpen: (isOpen: boolean) => void;
}

export default function MovieModal({ movie, setIsOpen }: MovieModalProps) {
  const modalBg = useRef<HTMLDivElement | null>(null);
  const imageBaseURL = 'https://image.tmdb.org/t/p/w500';
  const fallbackImage = '';

  return (
    <div className='fixed inset-0 z-100 flex items-center justify-center bg-black/80'>
      <div ref={modalBg} className='max-w-[90%] w-[720px]'>
        <div className='w-full h-[650px] rounded-lg bg-white'>
          <div className='w-full h-1/3 relative'>
            <img src={movie.backdrop_path ? `${imageBaseURL}${movie.backdrop_path}` : `${fallbackImage}`} className='rounded-t-lg w-full h-[300px] object-cover' />
            <button className='absolute top-0 right-0 p-2 text-white cursor-pointer' onClick={() => setIsOpen(false)}>
              <X size={30} />
            </button>
            <div className='text-white absolute top-[100%] p-2'>
              <h3 className='font-bold text-xl'>{movie.title}</h3>
              <h4 className='font-bold'>{movie.original_title}</h4>
            </div>
          </div>

          <div className='flex mt-30'>
            <img src={movie.poster_path ? `${imageBaseURL}${movie.poster_path}` : `${fallbackImage}`} alt={movie.title} className='rounded-lg w-[180px] mx-4 ' />
            <div className='flex flex-col'>
              <div>
                <p className='font-bold text-blue-600 text-lg'>
                  {movie.vote_average}
                  <span className='text-gray-500 font-medium text-sm pl-2'>({movie.vote_count} 평가)</span>
                </p>
                <div className='flex flex-col items-center'>
                  <dt className='font-bold'>개봉일</dt>
                  <dl className='pb-2'>{movie.release_date}</dl>
                  <dt className='font-bold'>인기도</dt>
                  <dl className='pb-2'>{movie.popularity}</dl>
                  <dt className='font-bold'>줄거리</dt>
                  <dl className='pb-2'>{movie.overview.length > 100 ? `${movie.overview.slice(0, 100)}...` : movie.overview}</dl>
                </div>
              </div>

              <div className='flex gap-4'>
                <a href={`https://www.imdb.com/find?q=${encodeURIComponent(movie.title)}`} target='_blank' rel='noopener noreferrer' className='bg-blue-500 p-2 rounded-lg text-white inline-block'>
                  IMDB에서 검색
                </a>

                <button className='rounded-lg border-2 border-blue-500 px-4' onClick={() => setIsOpen(false)}>
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
