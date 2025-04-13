import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetailWithCredits } from "../types/detail";
import MovieHero from "../components/MovieHero.tsx";
import MovieCredits from "../components/MovieCredits.tsx";
import useCustomFetch from "../hooks/useCustomFetch.ts";

const MovieDetailPage = () => {
  const params = useParams();
  const url = `https://api.themoviedb.org/3/movie/${params.movieId}?append_to_response=credits`;
  
  const { isPending, isError, data: movie } = useCustomFetch<MovieDetailWithCredits>(url, 'ko-KR');

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-dvh">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="text-red-500 text-2xl text-center mt-10">
        영화 정보를 불러오는 데 실패했습니다.
      </div>
    );
  }

  return (
    <>
      <MovieHero movie={movie} />
      <MovieCredits cast={movie.credits.cast} />
    </>
  );
};

export default MovieDetailPage;
