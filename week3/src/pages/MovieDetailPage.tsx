import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner  from "../components/LoadingSpinner";
import { Cast, CreditsResponse } from "../types/credits";
import { Movie } from "../types/movie";
import CreditCard from "../components/CreditCard";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movieDetail, setMovieDetail] = useState<Movie>();
  const [isPending, setIsPending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [crew, setCrew] = useState<Cast[]>([]);

  useEffect(() => {
    console.log("현재 movieId:", movieId); 
    const fetchMoviepage = async () => {
      setIsPending(true);
      try {
        const { data: movieData } = await axios.get<Movie>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovieDetail(movieData);

        const { data: creditData } = await axios.get<CreditsResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setCrew(creditData.cast);
      } catch (error) {
        console.error("에러 발생:", error);
        setIsError(true);
      } finally {
        setIsPending(false);
      }
    };

    if (movieId) {
      fetchMoviepage();
    }
  }, [movieId]);

  if (isError) {
    return (
      <div className="text-center mt-20">
        <span className="text-red-500 text-2xl">🥵에러가 발생했습니다🤬</span>
      </div>
    );
  }

  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center h-dvh">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="bg-black text-white p-10">
          <div
            className="h-100 rounded-xl p-5 bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(0,0,0,1) 15%, rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path})`,
            }}
          >
            <h1 className="text-4xl font-bold mb-3">{movieDetail?.title}</h1>
            <h6>평균 {movieDetail?.vote_average}</h6>
            <h6>{movieDetail?.release_date}</h6>
            <h6>{movieDetail?.runtime}분</h6>
            <h1 className="text-2xl italic mt-3">{movieDetail?.tagline}</h1>
            <p className="w-150 mt-5">{movieDetail?.overview}</p>
          </div>
          <h1 className="text-4xl font-bold mb-4 pt-7">감독/출연</h1>
          <div className="flex flex-wrap gap-4 py-4 justify-start">
          {crew?.map((crewPeople) => (
                <CreditCard key={crewPeople.id} Credit={crewPeople} />
              ))}
          </div>
          
        </div>
      )}
    </>
  );
};

export default MovieDetailPage;
