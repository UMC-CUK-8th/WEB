import { MovieCast } from "../types/movie";
import defaultImage from "../assets/defaultImg.png";

interface MovieCreditsProps {
    movieCast: MovieCast;
}

function MovieCredits({movieCast} : MovieCreditsProps) {
    const onErrorImg = (e) => {
        e.target.src = defaultImage;
        e.target.alt = "defaultImage";
    };

    console.log(movieCast);
    return (
        <>
        <div>
            <img 
            src={`https://image.tmdb.org/t/p/w200${movieCast.profile_path}`}
            onError={onErrorImg}
            alt={`${movieCast.name} 사진`}
            className="w-30 h-30 object-cover object-top rounded-full"
            />
            <p className="text-sm text-center mt-10"> {movieCast.name}</p>
            <p className="text-xs text-center text-black/50"> {movieCast.original_name}</p>
        </div>
        </>
    )
}

export default MovieCredits;
