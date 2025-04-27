
import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movieDetailtypes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Credits } from "../types/credits";
import PeopleCard from "../components/PeopleCard";
import useCustomFetch from "../hooks/useCustomFetch";


// home.tsx
const MovieDetailPage = () => {
    const {moviepage}=useParams();

    const url=`https://api.themoviedb.org/3/movie/${moviepage}?language=en-US`;
    const {data:movieDetail,isPending:detailPending,isError:detailError}=useCustomFetch<MovieDetail>(url,"ko-KR");
   
    const url2=`https://api.themoviedb.org/3/movie/${moviepage}/credits?language=en-US`;
    const {data:people,isPending:peoplePending,isError:peopleError}=useCustomFetch<Credits>(url2,"ko-KR");
    
    if (detailError || peopleError){
      return <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span></div>
    }
  
    return (
    <>
    {(peoplePending||detailPending) && (
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
      </div>
    )}
    {!(peoplePending||detailPending) &&(
      <div className="bg-black text-white p-10">
        <div className="h-90 rounded-xl p-5  "
        style={{
          backgroundImage: ` linear-gradient(to right, rgba(0,0,0,1) 15%, rgba(0,0,0,0)), url(https://image.tmdb.org/t/p/original${movieDetail?.backdrop_path})`,
        }}>
          <h1 className="text-4xl font-bold mb-3">{movieDetail?.title}</h1>
          <h6>평균 {movieDetail?.vote_average}</h6>
          <h6>{movieDetail?.release_date.slice(0,4)}</h6>
          <h6>{movieDetail?.runtime}분</h6>
          <h1 className="text-2xl italic">{movieDetail?.tagline}</h1>
          <h3 className="w-150 mt-5">{movieDetail?.overview}</h3>
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-5 pt-8">감독/출연</h1>
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