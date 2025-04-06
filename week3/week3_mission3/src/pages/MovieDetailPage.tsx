import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieDetail } from "../types/movieDetailtypes";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Cast, Credits } from "../types/credits";
import PeopleCard from "../components/peopleCard";

// home.tsx
const MovieDetailPage = () => {
    const {moviepage}=useParams();
    const [movieDetail, setMovieDetail] = useState<MovieDetail>();
    const [isPending,setIsPending]=useState(false);
    const [isError,setIsError]=useState(false);
    const [people,setPeople]=useState<Cast[]>([])

    useEffect(() => {
        const fetchMoviepage = async () => {
          setIsPending(true);
          
          try{
          const { data:MovieData } = await axios.get<MovieDetail>(
            `https://api.themoviedb.org/3/movie/${moviepage}?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          );
    
          setMovieDetail(MovieData);

          const { data:creditData } = await axios.get<Credits>(
            `https://api.themoviedb.org/3/movie/${moviepage}/credits?language=en-US`,
            {
              headers: {
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
              },
            }
          );
          setPeople(creditData.cast);
          
        }catch{
          setIsError(true);
          
        }finally{ 
          setIsPending(false);
        }
      };
        fetchMoviepage();
      }, []);
    console.log(movieDetail);

    if (isError){
      return <div>
        <span className='text-red-500 text-2xl'>에러가 발생했습니다.</span></div>
    }
    
    return (
    <>
    {isPending && (
      <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
      </div>
    )}
    {!isPending &&(
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

            {people?.map((people) => (<PeopleCard key={people.id} people={people}/>
                    ))}
          </div>
        </div>
      </div>
          )}
    </>
   
   );
};

export default MovieDetailPage;