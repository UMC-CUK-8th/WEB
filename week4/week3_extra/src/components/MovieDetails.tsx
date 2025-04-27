import { MovieDetail } from "../types/movie";

interface MovieDetailsProps {
    movie: MovieDetail;
    handleOpen: () => void;
}

function MovieDetails({movie, handleOpen} : MovieDetailsProps) {
    const voteStar = () => {
        return movie.vote_average * 10;
    }

    console.log(movie);
    return (
        <>
        <div className="relative flex items-center w-full">
            <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} 영화 포스터`}
            className="w-full h-180 object-cover object-bottom"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-black/75 to-black/75"></div>
            
            <div className="absolute inset-0 flex flex-col justify-center items-start p-6 text-white w-2/5">
                <h1 className="text-3xl font-bold text-white bg-black/50 p-2 mb-5">{movie.title}</h1>
                <div className="flex items-center gap-2 text-sm text-white mb-5">
                    <span>평균 {movie.vote_average.toFixed(2)}</span>
                    <span>개봉일 {movie.release_date}</span>
                    <span>상영시간 {movie.runtime}분</span>
                </div>
                <div className="vote-stars">
                    <div className="vote-stars-fill text-2xl" style={{width: `${voteStar()}%`}}>
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <div className="vote-stars-base text-2xl">
                        <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                </div>
                <p className="mt-10 italic font-bold text-lg">{movie.tagline}</p>
                <p className="mt-3 text-left">{movie.overview}</p>
                <button className="mt-10 bg-white/75 text-black px-6 py-3 rounded-lg shadow-md
                hover:bg-white transition-all duration-200 cursor-pointer"
                onClick={handleOpen}>
                    예고편 보기
                </button>
            </div>
        </div>
        </>
    )
}

export default MovieDetails;
