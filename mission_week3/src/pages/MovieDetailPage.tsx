import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface MovieDetail {
  title: string;
  release_date: string;
  runtime: number;
  overview: string;
  tagline: string;
  poster_path: string;
  vote_average: number;
  homepage: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string }[];
  belongs_to_collection?: { name: string };
}

const MovieDetailPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [director, setDirector] = useState<string | null>(null);
  const [cast, setCast] = useState<string[]>([]);

  useEffect(() => {
    const fetchMovie = async () => {
      if (!movieId) return;
      setIsLoading(true);
      setIsError(false);
      try {
        const { data } = await axios.get<MovieDetail>(
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
        const directorData = data.crew.find((person: any) => person.job === "Director");
        setDirector(directorData?.name || null);
        setCast(data.cast.slice(0, 5).map((actor: any) => actor.name));
      } catch (error) {
        console.error("크레딧 정보를 가져오지 못했어요", error);
      }
    };

    fetchMovie();
    fetchCredits();
  }, [movieId]);

  if (isLoading) return <div className="text-black font-bold text-center mt-30">로딩 중...</div>;
  if (isError || !movie) return <div className="text-red-500 text-center mt-10">영화 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="bg-[#111] text-white min-h-screen p-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="rounded-lg shadow-md"
        />
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          {movie.tagline && <p className="text-lg italic text-gray-400">"{movie.tagline}"</p>}
          <p className="text-gray-300">{movie.overview}</p>

          <p><span className="text-gray-400">개봉일:</span> {movie.release_date}</p>
          <p><span className="text-gray-400">상영시간:</span> {movie.runtime}분</p>
          <p><span className="text-gray-400">평점:</span> ⭐ {movie.vote_average}</p>

          <div>
            <span className="text-gray-400">장르:</span>{" "}
            {movie.genres.map(g => (
              <span key={g.id} className="bg-gray-700 px-2 py-1 rounded-full text-sm mr-2">{g.name}</span>
            ))}
          </div>

          <div>
            <span className="text-gray-400">제작사:</span>{" "}
            {movie.production_companies.map(c => (
              <span key={c.id} className="text-sm mr-2">{c.name}</span>
            ))}
          </div>

          {movie.belongs_to_collection && (
            <p><span className="text-gray-400">시리즈:</span> {movie.belongs_to_collection.name}</p>
          )}

          {director && (
            <p><span className="text-gray-400">감독:</span> {director}</p>
          )}

          {cast.length > 0 && (
            <p><span className="text-gray-400">출연:</span> {cast.join(", ")}</p>
          )}

          {movie.homepage && (
            <a
              href={movie.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white text-sm"
            >
              공식 홈페이지 바로가기
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;