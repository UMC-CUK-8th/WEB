import { useParams } from "react-router-dom";
import { MovieDetail, Credits } from "../types/movie";
import { LoadingSpinner } from "../components/LoadingSpinner";
import useCustomFetch from "../hooks/useCustomFetch";

export default function MovieDetailPage() {
  const { movieId } = useParams<{ movieId: string }>();

  const movieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const creditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`;

  const {
    data: movie,
    isPending: isMoviePending,
    isError: isMovieError,
  } = useCustomFetch<MovieDetail>(movieUrl);

  const {
    data: credits,
    isPending: isCreditsPending,
    isError: isCreditsError,
  } = useCustomFetch<Credits>(creditsUrl);

  if (isMovieError || isCreditsError) {
    return <div className="text-red-500 text-2xl">에러 발생!</div>;
  }

  if (isMoviePending || isCreditsPending || !movie || !credits) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const director = credits.crew.find((person) => person.job === "Director");
  const topCast = credits.cast.slice(0, 5);

  return (
    <div className="p-10 max-w-4xl mx-auto space-y-6 text-gray-800">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-md"
        />
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{movie.title}</h1>
          <p className="text-sm text-gray-500">{movie.release_date}</p>
          <p>{movie.overview}</p>
          <p className="font-semibold mt-2">감독: {director?.name || "정보 없음"}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">출연진</h2>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {topCast.map((actor) => (
            <li key={actor.cast_id} className="text-center">
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className="rounded-lg mx-auto shadow"
              />
              <p className="mt-1 text-sm font-medium">{actor.name}</p>
              <p className="text-xs text-gray-500">{actor.character}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
