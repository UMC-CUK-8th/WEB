import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { MovieDetailWithCredits } from "../types/detail";
import MovieHero from "../components/MovieHero.tsx";
import MovieCredits from "../components/MovieCredits.tsx";

const MovieDetailPage = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<MovieDetailWithCredits | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      setIsPending(true);
      try {
        const { data } = await axios.get<MovieDetailWithCredits>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR&append_to_response=credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch {
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) {
      fetchMovieDetail();
    }
  }, [movieId]);

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
