import { useState } from "react";
import type {Movie} from "../types/movie";
import Modal from "./Modal";
import MovieCard from "./MovieCard";

interface MovieListProps{
    movies: Movie[];
}

const MovieList=({movies}:MovieListProps)=>{
    const [open,setOpen]=useState<boolean>(false);
    const [movieInfo,setMovieInfo]=useState<Movie|null>(null);

    const openModal=(movie:Movie)=>{
        setOpen(true);
        setMovieInfo(movie);
    }

    const closeModal=()=>{
        setOpen(false);
    }

    if (movies.length===0){
        return (<div className="flex h-60 items-center justify-center">
            <p className="font-bold text-gray-500">검색 결과가 없습니다.</p>
        </div>)
    }
    return (
    <>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {movies.map((movie)=>(
                <MovieCard key={movie.id} movie={movie} onClick={()=>openModal(movie)}/>
            )
            )}
        </div>
        {open&&<Modal movieInfo={movieInfo} closeModal={closeModal}/>}
    </>
    
);
}

export default MovieList;