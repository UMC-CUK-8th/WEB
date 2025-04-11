
import { useParams } from "react-router-dom";
import { linkResponse, MovieDetail } from "../types/movieDetailtypes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Credits } from "../types/credits";
import PeopleCard from "../components/PeopleCard";
import useCustomFetch from "../hooks/useCustomFetch";
import { useState } from "react";


// home.tsx
const MovieDetailPage = () => {
    const {moviepage}=useParams();
    const [modal,setModal]=useState(false);
    const url=`https://api.themoviedb.org/3/movie/${moviepage}?language=en-US`;
    const {data:movieDetail,isPending:detailPending,isError:detailError}=useCustomFetch<MovieDetail>(url,"ko-KR");
   
    const url2=`https://api.themoviedb.org/3/movie/${moviepage}/credits?language=en-US`;
    const {data:people,isPending:peoplePending,isError:peopleError}=useCustomFetch<Credits>(url2,"ko-KR");
  
    const url3=`https://api.themoviedb.org/3/movie/${moviepage}/videos?language=ko-KR`;
    const {data:modalLink}=useCustomFetch<linkResponse>(url3,"ko-KR");

    if (detailError || peopleError){
      return <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span></div>
    }
    
    const star=(movieDetail?.vote_average??0)/10*5;
    let stars='';
    if (star<0.5) stars="☆☆☆☆☆";
    else if (star<1.5) stars="★☆☆☆☆";
    else if (star<2.5) stars="★★☆☆☆";
    else if (star<3.5) stars="★★★☆☆";
    else if (star<4.5) stars="★★★★☆";
    else stars="★★★★★";

    return (
    <>
    {(peoplePending||detailPending) && (
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
      </div>
    )}
    {!(peoplePending||detailPending) &&(
      <div className="bg-black text-white p-10">
        <div className="h-100 rounded-xl p-5  "
        style={{
          backgroundImage: ` linear-gradient(to right, rgba(0,0,0,1) 15%, rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path})`,
        }}>
          <p className="text-4xl font-bold mb-3">{movieDetail?.title}</p>
          <p className="text-lg">평균 {movieDetail?.vote_average} {stars} </p>
          <p>{movieDetail?.release_date.slice(0,4)}</p>
          <p>{movieDetail?.runtime}분</p>
          <p className="text-2xl italic">{movieDetail?.tagline}</p>
          <p className="w-150 mt-5">{movieDetail?.overview}</p>
        </div>
        <div>
        <div className="flex items-center justify-between pt-10 pb-10">
          <p className="text-4xl font-bold ">감독/출연</p> 
          <button
            className="w-50 text-xl  w-20 h-10 border border-white rounded-md cursor-pointer"
            onClick={()=>setModal(true)}>
              예고편 보러가기
          </button>
          {modal&&<div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white/80">
            <div className="bg-white w-200 h-100 text-black p-5 pt-3 flex flex-col items-center justify-center gap-3 rounded-lg">
              <button className="ml-auto w-10 rounded-sm border cursor-pointer" onClick={()=>setModal(false)}>X</button>
              {modalLink?.results[0]?(
                <iframe 
                className="w-full h-300"
                src={`https://www.youtube.com/embed/${modalLink?.results[0].key}`}></iframe>
              ):(<div className="w-full h-300"> 예고편이 없습니다. </div>)}
              
            </div>
            </div>}
          
          </div>
          <div className=' grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'>

            {people?.cast.map((people) => (<PeopleCard key={people.id} people={people}/>
                    ))}
          </div>
        </div>
      </div>
          )}
    </>
   
   );
};

export default MovieDetailPage;