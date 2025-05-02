import { MovieTrailer } from "../types/movie";

interface MovieTrailersProps {
    movieTrailer: MovieTrailer;
    modal: boolean;
    handleClose: () => void;
}

function MovieTrailers({movieTrailer, modal, handleClose} : MovieTrailersProps) {

    console.log(movieTrailer);
    return (
        <>
        {modal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
                <div className="bg-white p-5 rounded-lg shadow-lg">
                    <button className="absolute top-5 right-5 text-white" onClick={handleClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <iframe
                        width="1120"
                        height="630"
                        src={`https://www.youtube.com/embed/${movieTrailer.results[0].key}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        )}        
        </>
    )
}

export default MovieTrailers;
