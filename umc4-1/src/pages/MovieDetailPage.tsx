import { useParams } from "react-router-dom";
import useCustomFetch from "../hooks/useCustomFetch";
import { MovieDetailResponse, CreditResponse, Crew } from "../types/movie";

const MovieDetailPage = () => {
  const { movieId } = useParams();

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&`;
  const creditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR&`;

  const {
    data: movie,
    isPending: isMovieLoading,
    isError: isMovieError,
  } = useCustomFetch<MovieDetailResponse>(movieUrl);

  const {
    data: credit,
    isPending: isCreditLoading,
    isError: isCreditError,
  } = useCustomFetch<CreditResponse>(creditUrl);

  const isPending = isMovieLoading || isCreditLoading;
  const isError = isMovieError || isCreditError;

  const cast = credit?.cast.slice(0, 6) ?? [];
  const director: Crew | undefined = credit?.crew.find(
    (c) => c.job === "Director"
  );

  if (isPending) {
    return <div className="text-center text-white p-4">로딩 중...</div>;
  }

  if (isError || !movie) {
    return (
      <div className="text-center text-red-500 text-xl p-4">
        ❌ 에러가 발생했습니다. ❌
      </div>
    );
  }

  return (
    <div className="bg-[#111] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="w-50 h-75 rounded-lg shadow-md"
        />
        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="text-gray-300">{movie.overview}</p>
          <p>
            <span className="text-gray-400">개봉일:</span> {movie.release_date}
          </p>
          <p>
            <span className="text-gray-400">상영시간:</span> {movie.runtime}분
          </p>
          <p>
            <span className="text-gray-400">평점:</span> ⭐ {movie.vote_average}
          </p>

          {director && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">감독</h2>
              <div className="flex items-center gap-4">
                <img
                  src={
                    director.profile_path
                      ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
                      : "https://via.placeholder.com/100x150?text=No+Image"
                  }
                  alt={director.name}
                  className="w-24 h-auto rounded shadow-md"
                />
                <span className="text-lg">{director.name}</span>
              </div>
            </div>
          )}

          {cast.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">출연</h2>
              <div className="flex gap-4 flex-wrap">
                {cast.map((actor) => (
                  <div
                    key={actor.id}
                    className="flex flex-col items-center w-24"
                  >
                    <img
                      src={
                        actor.profile_path
                          ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                          : "https://via.placeholder.com/100x150?text=No+Image"
                      }
                      alt={actor.name}
                      className="w-full h-auto rounded shadow-md"
                    />
                    <span className="text-sm text-center mt-1">
                      {actor.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
