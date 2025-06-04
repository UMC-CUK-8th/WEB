import type { Movie } from "../types/movie";
import { IoMdClose } from "react-icons/io";


interface ModalProps{
    movieInfo:Movie|null;
    closeModal:()=>void;
}
const Modal=({movieInfo,closeModal}:ModalProps)=>{
    const imageBaseUrl="https://image.tmdb.org/t/p/w500"
    const fallbackImage="https://via.placeholder.com/640x480"
    
    return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/40">
        <div className="bg-white w-180 h-150">
            <div className="relative w-full h-50">
                <img src={movieInfo?.poster_path?`${imageBaseUrl}${movieInfo.poster_path}`: fallbackImage} 
                    className="w-full h-full object-cover object-center"/>
                <div className="absolute top-3 right-3 rounded-full w-8 h-8 bg-black/80 cursor-pointer text-white text-center flex items-center justify-center text-xl"
                onClick={()=>{closeModal()}}
                ><IoMdClose /></div>
                <div className="absolute bottom-3 left-3 text-white flex flex-col items-center">
                    <p className="font-bold text-2xl">{movieInfo?.title}</p>
                    <p className="">{movieInfo?.original_title}</p>
                </div>
            </div>


            <div className="m-5 flex gap-x-5">
                <div className="w-70">
                    <img src={movieInfo?.poster_path?`${imageBaseUrl}${movieInfo.poster_path}`: fallbackImage} 
                    className="w-full h-full object-cover object-center rounded-md"/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex gap-x-2">
                        <p className="text-blue-500 font-bold">{movieInfo?.vote_average.toFixed(1)}</p>
                        <p className="text-gray-400">{'('}{movieInfo?.vote_count} 평가{')'}</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p>개봉일</p>
                        <p>{movieInfo?.release_date}</p>
                        <p>인기도</p>
                        <p>{movieInfo?.popularity}</p>
                        <p>줄거리</p>
                        <p className="text-gray-800">{movieInfo?.overview}</p>
                    </div>
                </div>
                
                
            </div>
            <div className="flex justify-center items-center gap-x-4">
                <button className="bg-blue-500 rounded-sm cursor-pointer text-white w-30 h-8 text-sm"
                    onClick={()=>{
                        if (movieInfo?.title){
                        const imdbSearchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(movieInfo.title)}&s=tt`;
                        window.open(imdbSearchUrl, '_blank');}}}>IMDb에서 검색</button>
                <button className="bg-white rounded-sm cursor-pointer text-blue-500 w-15 h-8 text-sm border border-blue-500"
                        onClick={()=>{closeModal()}}>닫기</button>


            </div>

        </div>
        

    </div>
    )
}

export default Modal;