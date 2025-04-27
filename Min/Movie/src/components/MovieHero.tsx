import { useState } from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { MovieDetail } from "../types/detail";

type MovieVideo = {
  key: string;
  name: string;
  site: string;
  type: string;
};

type ExtendedMovieDetail = MovieDetail & {
  videos?: {
    results: MovieVideo[];
  };
};

type Props = {
  movie: ExtendedMovieDetail;
};

const MovieHero = ({ movie }: Props) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const score = movie.vote_average / 2;

  return (
    <div className="relative w-full h-[600px] overflow-hidden text-white">
      <img
        src={
          movie.backdrop_path
            ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
            : "/default-backdrop.jpg"
        }
        alt={`${movie.title} 배경`}
        className="w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-black/60 flex items-center">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold">{movie.title}</h1>
          <p className="text-lg italic mt-2 text-violet-300">{movie.tagline}</p>
          <p className="mt-4">{movie.overview}</p>

          <div className="mt-4 space-x-4 text-sm text-gray-300">
            <span className="flex items-center gap-1">
              평점: {movie.vote_average}
              {[...Array(5)].map((_, i) => {
                if (score >= i + 1) return <FaStar key={i} size={16} color="#facc15" />;
                if (score >= i + 0.5) return <FaStarHalfAlt key={i} size={16} color="#facc15" />;
                return <FaRegStar key={i} size={16} color="#facc15" />;
              })}
            </span>
            <span>개봉: {movie.release_date}</span>
            <span>상영시간: {movie.runtime}분</span>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-pink-700 px-3 py-1 rounded-full text-sm"
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

          {movie.videos?.results?.[0]?.key && (
            <button
              onClick={() => setShowTrailer(true)}
              className="mt-6 px-4 py-2 bg-black hover:bg-violet-600 rounded text-white font-semibold"
            >
              🎬 예고편 보기
            </button>
          )}

          {showTrailer && (
            <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
              <div className="relative w-[90%] max-w-3xl aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${movie.videos?.results?.[0]?.key}`}
                  title="예고편"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                <button
                  className="absolute top-2 right-2 text-white text-xl bg-black/50 p-2 rounded-full hover:bg-black"
                  onClick={() => setShowTrailer(false)}
                >
                  ✖
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieHero;
