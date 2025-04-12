import { useEffect, useState } from "react";
import axios from "axios";
import { Movie } from "../types/movie";

export type Cast = {
    id: number;
    name: string;
    profile_path: string | null;
    character?: string;
    job?: string;
};

export const useMovieDetail = (movieId: string | undefined) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [cast, setCast] = useState<Cast[]>([]);
    const [videoKey, setVideoKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const API_URL = import.meta.env.VITE_TMDB_MOVIE_API_URL;
    const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

    useEffect(() => {
        const fetchData = async () => {
        if (!movieId) return;

        setLoading(true);
        setError(false);

        try {
            const movieRes = await axios.get<Movie>(
            `${API_URL}/movie/${movieId}?language=ko-KR`,
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
            );

            const creditRes = await axios.get<{ cast: Cast[]; crew: Cast[] }>(
            `${API_URL}/movie/${movieId}/credits?language=ko-KR`,
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
            );

            const videoRes = await axios.get<{ results: any[] }>(
            `${API_URL}/movie/${movieId}/videos?language=ko-KR`,
            { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
            );

            const trailer = videoRes.data.results.find(
            (v) => v.type === "Trailer" && v.site === "YouTube"
            );

            const directors = creditRes.data.crew.filter((person) => person.job === "Director");
            const actors = creditRes.data.cast.slice(0, 10);

            setMovie(movieRes.data);
            setCast([...directors, ...actors]);
            setVideoKey(trailer?.key || null);
        } catch (e) {
            setError(true);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, [movieId]);

    return { movie, cast, videoKey, loading, error };
};
