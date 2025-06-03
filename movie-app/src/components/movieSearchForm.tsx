import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type MovieSearchFormProps = {
  initialQuery: string;
  initialLanguage: string;
  initialGenre: string;
  initialSortBy: string;
  onSearch: (params: { query: string; language: string; genre: string; sortBy: string }) => void;
};

const languageOptions = [
    { value: "en-US", label: "English (US)" },
    { value: "ko-KR", label: "Korean" },
    { value: "ja-JP", label: "Japanese" },
    { value: "fr-FR", label: "French" },
    { value: "de-DE", label: "German" },
    { value: "es-ES", label: "Spanish" },
    { value: "zh-CN", label: "Chinese" },
    { value: "it-IT", label: "Italian" },
    { value: "ru-RU", label: "Russian" },
    { value: "pt-PT", label: "Portuguese" },
];

const sortOptions = [
    { value: "vote_average.desc", label: "평점 높은 순" },
    { value: "release_date.desc", label: "최신 등록 순" },
];

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY as string;

const MovieSearchForm: React.FC<MovieSearchFormProps> = ({
    initialQuery,
    initialLanguage,
    initialGenre,
    initialSortBy,
    onSearch,
}) => {
    const [query, setQuery] = useState(initialQuery);
    const [language, setLanguage] = useState(initialLanguage);
    const [genre, setGenre] = useState(initialGenre);
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
    const navigate = useNavigate();

    // 장르 리스트 fetch
    useEffect(() => {
        axios
        .get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDB_API_KEY}&language=${language}`)
        .then(res => setGenres(res.data.genres))
        .catch(() => setGenres([]));
    }, [language]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const params = {
            query,
            language,
            genre,
            sortBy,
        };
        onSearch(params);
        const queryStr = new URLSearchParams({
            query,
            language,
            genre,
            sort_by: sortBy,
        });
        navigate(`/movies/search/result?${queryStr}`);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 items-center p-4 bg-white rounded shadow mb-6">
        <input
            type="text"
            placeholder="영화 제목"
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="px-3 py-2 border rounded w-full md:w-60"
        />
        <select value={language} onChange={e => setLanguage(e.target.value)} className="px-2 py-2 border rounded">
            {languageOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <select value={genre} onChange={e => setGenre(e.target.value)} className="px-2 py-2 border rounded">
            <option value="">장르 선택</option>
            {genres.map(g => (
            <option key={g.id} value={g.id}>{g.name}</option>
            ))}
        </select>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="px-2 py-2 border rounded">
            {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            검색
        </button>
        </form>
    );
};

export default MovieSearchForm;
