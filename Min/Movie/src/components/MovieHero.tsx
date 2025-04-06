import { MovieDetail } from "../types/detail";

type Props = {
  movie: MovieDetail;
};

const MovieHero = ({ movie }: Props) => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden text-white">
      {/* 백그라운드 이미지 */}
      <img
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/default-backdrop.jpg"
        }
        alt={`${movie.title} 배경`}
        className="w-full h-full object-cover"
      />

      {/* 어두운 필터 + 텍스트 */}
      <div className="absolute inset-0 bg-black/60 flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg italic mt-2 text-violet-300">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>
          <div className="mt-4 space-x-4 text-sm text-gray-300">
            <span>평점: {movie.vote_average}</span>
            <span>개봉: {movie.release_date}</span>
            <span>상영시간: {movie.runtime}분</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-violet-600 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>
          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-400 underline mt-4 block"
            >
              공식 홈페이지 바로가기
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
