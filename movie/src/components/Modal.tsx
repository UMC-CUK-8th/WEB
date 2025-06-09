import type{ Movie } from "../types/movie";

interface ModalProps {
    movie: Movie;
    onClose: () => void;
}

const Modal = ({ movie, onClose }: ModalProps) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/w500";
    const fallbackImage = "http://via.placeholder.com/640x480";

    return (
        <div className="fixed inset-0 backdrop-blur-md shadow-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">{movie.title}</h2>
                    <p className="text-gray-600 mt-2">{movie.original_title}</p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                        <img
                            src={movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : fallbackImage}
                            alt={`${movie.title} 포스터`}
                            className="w-full rounded-lg shadow-lg"
                        />
                    </div>

                    <div className="w-full md:w-2/3">
                        <div className="space-y-4">
                            <div>

                                <p className="text-xl font-bold text-blue-600">{movie.vote_average.toFixed(1)} ({movie.vote_count} 평가)</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">개봉일</h3>
                                <p className="text-gray-600">{movie.release_date}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">인기도</h3>
                                <div className="space-y-1">
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                                            style={{ width: `${Math.min(100, Math.round(movie.popularity))}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700">줄거리</h3>
                                <p className="text-gray-600">{movie.overview}</p>
                            </div>
                
                            

                            <div className="flex gap-4">


                                <button className="container bg-blue-500 font-semibold text-white rounded-lg w-30 h-12 ">
                                    ImDB에서 검색
                                </button>
                                <button className="container bg-white font-semibold text-blue-500 rounded-lg w-30 h-12 border-blue-500 border-2" onClick={onClose}>
                                    닫기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;