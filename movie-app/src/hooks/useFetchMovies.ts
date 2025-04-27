import { useEffect, useState } from "react";
import axios from "axios";
import { Movie, MovieResponse } from "../types/movie";

const API_URL = import.meta.env.VITE_TMDB_MOVIE_API_URL;
const ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

export const useFetchMovies = (endpoint: string, page: number) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            setError(false);
            try {
                const { data } = await axios.get<MovieResponse>(
                `${API_URL}${endpoint}?language=ko-KR&page=${page}`,
                {
                    headers: {
                    Authorization: `Bearer ${ACCESS_TOKEN}`,
                    },
                }
                );
                setTimeout(() => {
                setMovies(data.results);
                setLoading(false);
                }, 300);
            } catch (e) {
                setError(true);
                setLoading(false);
            }
        };
    
        fetch();
    }, [endpoint, page]);
    
    return { movies, loading, error };
}