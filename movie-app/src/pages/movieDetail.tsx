import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Movie } from "../types/movie";
import LoadingSpinner from "../components/loading";

type Cast = {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
    job?: string;
};

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState<Movie | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [cast, setCast] = useState<Cast[]>([]);

    const API_URL = import.meta.env.VITE_TMDB_MOVIE_API_URL;
    const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    useEffect(() => {
        const fetchData = async () => {
        try {
            setLoading(true);
            setError(false);

            const movieRes = await axios.get<Movie>(
                `${API_URL}/movie/${movieId}?language=ko-KR`,
                {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                }
            );
    
            const creditRes = await axios.get<{ cast: Cast[]; crew: Cast[] }>(
                `${API_URL}/movie/${movieId}/credits?language=ko-KR`,
                {
                headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
                }
            );
    
            const directors = creditRes.data.crew.filter((person) => person.job === "Director");
            const actors = creditRes.data.cast.slice(0, 10); // 상위 10명만
    
            setMovie(movieRes.data);
            setCast([...directors, ...actors]);
            } catch (e) {
            setError(true);
            } finally {
            setLoading(false);
            }
        };
    
        fetchData();
    }, [movieId]);

    if (loading) {
        return (
        <div className="h-screen flex items-center justify-center">
            <LoadingSpinner />
        </div>
        );
    }

    if (error || !movie) {
        return (
        <div className="h-screen flex items-center justify-center">
            <p className="text-red-500">영화 정보를 불러오지 못했습니다</p>
        </div>
        );
    }

    return (
        <div className="min-h-screen p-8 bg-white">
            <div className="flex flex-col md:flex-row gap-8 mb-12 max-w-5xl mx-auto">
                <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full md:w-64 rounded shadow"
                />
                <div className="flex flex-col justify-between">
                    <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-sm text-gray-700 mb-1">⭐ 평점: {movie.vote_average}</p>
                    <p className="text-sm text-gray-700 mb-1">📅 개봉일: {movie.release_date}</p>
                    <p className="text-sm text-gray-700 mb-1">
                    🎬 장르:{" "}
                    {movie.genres?.map((genre) => genre.name).join(", ") || "정보 없음"}
                    </p>
                    <p className="text-sm text-gray-700 mb-1">
                    🌍 제작 국가:{" "}
                    {movie.production_countries?.map((c) => c.name).join(", ") || "정보 없음"}
                    </p>
                    <p className="text-sm text-gray-700 mb-4">
                    ⏱️ 런타임: {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                    </p>
                    <p className="mt-2 text-sm text-gray-800 leading-relaxed">{movie.overview}</p>
                </div>
            </div>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">🎭 감독 & 출연</h2>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {cast.map((person) => (
                        <div key={person.id} className="p-2 flex flex-col items-center text-center w-[75px]">
                        <img
                            src={
                            person.profile_path
                                ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                : "https://via.placeholder.com/185x278?text=No+Image"
                            }
                            alt={person.name}
                            className="w-full h-auto rounded mb-2 object-cover"
                        />
                        <p className="text-xs text-black-600 font-semibold mb-1">{person.character || person.job}</p>
                        <p className="text-sm text-gray-800">{person.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetailPage;
