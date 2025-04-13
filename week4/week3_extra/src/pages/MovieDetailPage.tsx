import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieCast, MovieCredit, MovieDetail, MovieTrailer } from "../types/movie";
import axios from "axios";
import { LoadingSpinner } from "../components/LoadingSpinner";
import MovieDetails from "../components/MovieDetails";
import MovieCredits from "../components/MovieCredits";
import MovieTrailers from "../components/MovieTrailers";

// const MovieDetailPage = () => {
//     const params = useParams();

//     console.log(params);
//     return <div>MovieDetailPage{params.movieId}</div>
// }

function MovieDetailPage() {
    const [movieDetail, setMovieDetail] = useState<MovieDetail>();
    const [credits, setCredits] = useState<MovieCast[]>([]);
    const [trailer, setTrailer] = useState<MovieTrailer>();

    const [modal, setModal] = useState(false);
    const handleOpen = () => {
        setModal(true);
        // 모달이 열릴 때 body 스크롤 방지
        document.body.style.overflow = 'hidden';
    };
    const handleClose = () => {
        setModal(false);
        document.body.style.overflow = 'auto';
    };

    // 1. 로딩 상태
    const [isPending, setIsPending] = useState(false);

    // 2. 에러 상태
    const [isError, setIsError] = useState(false);

    const { movieId } = useParams();
    
    useEffect(() : void => {
        const fetchMovieDetail = async () : Promise<void> => {

            setIsPending(true);
            try {
                const movieData = await axios.get<MovieDetail> (
                    `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            "Content-Type": 'application/json;charset=utf-8',
                        },
                    }
                );

                const { data } = await axios.get<MovieCredit> (
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            "Content-Type": 'application/json;charset=utf-8',
                        },
                    }
                );

                const trailer = await axios.get<MovieTrailer> (
                    `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
                    {
                        headers: {
                            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
                            "Content-Type": 'application/json;charset=utf-8',
                        },
                    }
                );
    
                console.log(movieData);
                setMovieDetail(movieData.data);

                console.log(data);
                setCredits(data.cast);

                console.log(trailer);
                setTrailer(trailer.data);
            } catch {
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchMovieDetail();
    }, [movieId]);

    if (isError) {
        return (
            <div>
                <span className="text-red-500 text-2xl">에러가 발생했습니다.</span>
            </div>
        );
    }

    return (
        <>
            <div className="flex items-center justify-center gap-6 mt-5">
            </div>
            {isPending && (
                <div className="flex items-center justify-center h-dvh">
                    <LoadingSpinner/>
                </div>
            )}

            {!isPending && (
                <div>
                    {movieDetail && credits && (
                        <>
                            <MovieDetails movie={movieDetail} handleOpen={handleOpen} />
                            {trailer && <MovieTrailers movieTrailer={trailer} modal={modal} handleClose={handleClose} />}
                            <h2 className="text-2xl font-bold text-left text-white bg-black/75 p-2 mt-10 mb-10">감독/ 출연</h2>
                            <div className='p-10 grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10'>
                                {credits.map((credit) => (
                                    <MovieCredits movieCast={credit}/>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default MovieDetailPage;