import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

const MoviePage = () => {
    const [movies, setMovies] = useState<Movie[]>([]);

    console.log(movies);
  
    useEffect(() => {
      const fetchMovies = async () => {
        const { data } = await axios.get<MovieResponse>(
          `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1`,
          {
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
            },
          }
        );
  
        setMovies(data.results);
      };
  
      fetchMovies();
    }, []);
  
    return (
      <ul>
        {/* 옵셔널 체인 활용 */}
        {movies?.map((movie) => (
          <li key={movie.id}>
            <h1>{movie.title}</h1>
          </li>
        ))}
      </ul>
    );

};

export default MoviePage;