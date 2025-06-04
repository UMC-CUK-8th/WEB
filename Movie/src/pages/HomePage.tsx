import { useCallback, useMemo, useState } from "react";
import MovieFilter from "../components/MovieFilter";
import MovieList from "../components/MovieList";
import useFetch from "../hooks/useFetch";
import type { MovieFilters, MovieResponse } from "../types/movie";

export default function HomePage(){
    const [filters,setFilters]=useState<MovieFilters>({
        query:'어벤져스',
        include_adult:false,
        language:"ko-KR"
    })

    const axiosRequestConfig=useMemo(()=>({
        params:filters,

    }),[filters])
    const {data,error,isLoading}=useFetch<MovieResponse>("/search/movie",axiosRequestConfig);

    console.log(data);

    const handleMovieFilters=useCallback((filters:MovieFilters)=>{
        setFilters(filters);
    },[setFilters]
    )
    if (error){
        return<div>error</div>
    }

    return (
    <div className="container min-h-screen overflow-visible p-8">
        <MovieFilter onChange={handleMovieFilters} />
        <div className="m-8"></div>
        {isLoading?(<div> 로딩중 입니다...</div>):(<MovieList movies={data?.results||[]}/>)}
    </div>

    )
}

//검색 필터
//영화 무비
