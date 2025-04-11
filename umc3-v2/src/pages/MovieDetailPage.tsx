import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetailResponse } from "../types/movie";
import axios from "axios";

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetailResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [director, setDirector] = useState<{
    name: string;
    profile_path: string | null;
  } | null>(null);
  const [cast, setCast] = useState<
    { name: string; profile_path: string | null }[]
  >([]);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [showTrailer, setShowTrailer] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get<MovieDetailResponse>(
          `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        setMovie(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchCredits = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
        const directorData = data.crew.find(
          (person: any) => person.job === "Director"
        );
        if (directorData) {
          setDirector({
            name: directorData.name,
            profile_path: directorData.profile_path,
          });
        } else {
          setDirector(null);
        }

        setCast(
          data.cast.slice(0, 5).map((actor: any) => ({
            name: actor.name,
            profile_path: actor.profile_path,
          }))
        );
      } catch (error) {
        console.error("크레딧 정보를 가져오지 못했어요", error);
      }
    };

    const fetchTrailer = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );

        const trailer = data.results.find(
          (video: any) => video.type === "Trailer" && video.site === "YouTube"
        );

        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null); // 예고편이 없으면 null로 설정
        }
      } catch (error) {
        console.error("에러", error);
      }
    };

    fetchMovie();
    fetchCredits();
    fetchTrailer();
  }, [movieId]);

  if (isLoading)
    return (
      <div className="text-black font-bold text-center mt-30">로딩 중...</div>
    );
  if (isError || !movie)
    return (
      <div className="text-red-500 text-center mt-10">
        영화 정보를 불러올 수 없습니다.
      </div>
    );

  return (
    <div className="bg-[#111] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="w-50 h-100 rounded-lg shadow-md"
        />
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold">{movie.title}</h1>
            {trailerKey && (
              <button
                className="bg-gray-600 px-1 py-1 rounded cursor-pointer transition text-base"
                onClick={() => setShowTrailer(true)}
              >
                🎬 예고편 재생
              </button>
            )}
          </div>

          {movie.tagline && (
            <p className="text-lg italic text-gray-400">"{movie.tagline}"</p>
          )}
          <p className="text-gray-300">{movie.overview}</p>
          <p>
            <span className="text-gray-400">개봉일:</span> {movie.release_date}
          </p>
          <p>
            <span className="text-gray-400">상영시간:</span> {movie.runtime}분
          </p>
          <div>
            <span className="text-gray-400">평점:</span>
            <div>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index}>
                  {index < Math.round(movie.vote_average / 2) ? "⭐" : " "}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-400">장르:</span>{" "}
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="bg-gray-700 px-2 py-1 rounded-full text-sm mr-2"
              >
                {g.name}
              </span>
            ))}
          </div>
          <div>
            <span className="text-gray-400">제작사:</span>{" "}
            {movie.production_companies.map((c) => (
              <span key={c.id} className="text-sm mr-2">
                {c.name}
              </span>
            ))}
          </div>
          {movie.belongs_to_collection && (
            <p>
              <span className="text-gray-400">시리즈:</span>{" "}
              {movie.belongs_to_collection.name}
            </p>
          )}
          {director && (
            <div className="mt-4">
              <span className="text-gray-400 block mb-1">감독:</span>
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
            <div>
              <span className="text-gray-400 block mb-1">출연:</span>
              <div className="flex gap-4 flex-wrap">
                {cast.map((actor, index) => (
                  <div key={index} className="flex flex-col items-center w-24">
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
          {showTrailer && trailerKey && (
            <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
              <div className="relative w-full max-w-3xl aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <button
                  className="absolute top-2 right-2 text-white"
                  onClick={() => setShowTrailer(false)}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
