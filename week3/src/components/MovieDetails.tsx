import { MovieDetail } from "../types/movie";

interface MovieDetailsProps {
    movie: MovieDetail;
}

function MovieDetails({movie} : MovieDetailsProps) {

    console.log(movie);
    return (
        <>
        <div className="relative flex items-center w-screen">
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 영화 포스터`}
            className="w-full h-180 object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-black/75 to-black/75"></div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white w-1/2">
            <h1 className="text-3xl font-bold text-white bg-black/50 p-2 mb-5">{movie.title}</h1>
            <div className="flex items-center gap-2 text-sm text-white mb-5">
            <span>평균 {movie.vote_average}</span>
            <span>개봉일 {movie.release_date}</span>
            <span>상영시간 {movie.runtime}분</span>
            </div>
            <p className="mt-10 italic font-bold text-lg">{movie.tagline}</p>
            <p className="mt-3 text-left">{movie.overview}</p>
            </div>
        </div>
        </>
    )
}

export default MovieDetails;
