import { useState, useCallback, useMemo } from "react";
import axios from "axios";
import MovieCardModal from "../components/MovieCardModal";
import { Movie } from "../types/movie";
import MovieModal from "../components/movieModal"; // 모달용 상세 페이지 컴포넌트로 변경

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [language, setLanguage] = useState("ko-KR");
    const [includeAdult, setIncludeAdult] = useState(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

    const fetchMovies = useCallback(async () => {
        const res = await axios.get("https://api.themoviedb.org/3/search/movie", {
        params: {
            api_key: import.meta.env.VITE_TMDB_API_KEY,
            query,
            language,
            include_adult: includeAdult,
        },
        });
        setMovies(res.data.results);
    }, [query, language, includeAdult]);

    const renderedMovies = useMemo(
        () =>
        movies.map((movie) => (
            <div key={movie.id} onClick={() => setSelectedMovieId(String(movie.id))}>
            <MovieCardModal key={movie.id} movie={movie} onClick={() => setSelectedMovieId(String(movie.id))} />
            </div>
        )),
        [movies]
    );

    return (
        <div className="p-6 max-w-screen-lg mx-auto pt-20">
        <div className="bg-white p-4 rounded shadow mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <input
                className="border px-3 py-2 rounded w-full sm:w-auto"
                placeholder="영화 제목을 입력하세요"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <label className="flex items-center gap-2">
                <input
                type="checkbox"
                checked={includeAdult}
                onChange={(e) => setIncludeAdult(e.target.checked)}
                />
                성인 콘텐츠 포함
            </label>
            <select
                className="border rounded px-2 py-2"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="ko-KR">한국어</option>
                <option value="en-US">영어</option>
            </select>
            </div>
            <button
            className="mt-4 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={fetchMovies}
            >
            🔍 검색하기
            </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">{renderedMovies}</div>

        {selectedMovieId && (
            <MovieModal
            movieId={selectedMovieId}
            onClose={() => setSelectedMovieId(null)}
            />
        )}
        </div>
    );
};

export default SearchPage;
