import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetail } from "../hooks/useMovieDetail";
import LoadingSpinner from "../components/loading";
import defaultImage from "../assets/icon/defaultImage.png";
import StarRating from "../components/starRating";
import Trailer from "../components/trailer";

const MovieDetailPage = () => {
    const { movieId } = useParams();
    const { movie, cast, videoKey, loading, error } = useMovieDetail(movieId);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openTrailer = () => {
        if (videoKey) {
            setIsModalOpen(true);
        }
    };

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
                    <h1 className="text-3xl font-bold mb-4">
                        {movie.title}
                        {videoKey && (
                            <button
                                onClick={openTrailer}
                                className="text-3xl"
                            >
                                ▶️
                            </button>
                        )}
                    </h1>
                    <div className="text-sm text-gray-700 mb-1 flex items-center gap-2">
                        <span className="font-semibold">평점 |</span>
                        <StarRating rating={movie.vote_average} />
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">개봉일 |</span> {movie.release_date}
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">장르 |</span>{" "}
                        {movie.genres?.map((genre) => genre.name).join(", ") || "정보 없음"}
                    </div>
                    <div className="text-sm text-gray-700 mb-1">
                        <span className="font-semibold">제작 국가 |</span>{" "}
                        {movie.production_countries?.map((c) => c.name).join(", ") || "정보 없음"}
                    </div>
                    <div className="text-sm text-gray-700 mb-4">
                        <span className="font-semibold">런타임 |</span>{" "}
                        {movie.runtime ? `${movie.runtime}분` : "정보 없음"}
                    </div>
                    <div className="mt-2 text-sm text-gray-800 leading-relaxed">{movie.overview}</div>
                </div>
            </div>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-xl font-semibold mb-4">🎭 감독 & 출연</h2>
                <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                    {cast.map((person) => (
                        <div key={person.id} className="p-2 flex flex-col items-center text-center w-[75px]">
                            <div className="w-full aspect-[185/278] overflow-hidden rounded mb-2 bg-gray-200 flex justify-center">
                                <img
                                    src={
                                    person.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                        : defaultImage
                                    }
                                    alt={person.name}
                                    className="w-full h-full rounded mb-2 object-cover"
                                />
                            </div>
                            <p className="text-xs text-black-600 font-semibold mb-1">{person.character || person.job}</p>
                            <p className="text-sm text-gray-800">{person.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            {isModalOpen && videoKey && (
                <Trailer videoKey={videoKey} onClose={() => setIsModalOpen(false)} />
            )}
        </div>
    );
};

export default MovieDetailPage;
