import { useState } from "react";
import axios from "axios";
import Modal from "./Modal";

type TrailerButtonProps = {
  movieId: string;
};

const TrailerButton = ({ movieId }: TrailerButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const fetchTrailer = async () => {
    try {
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=ko-KR`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`,
          },
        }
      );

      const trailer = data.results.find(
        (video: any) => video.type === "Trailer" && video.site === "YouTube"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
        setIsModalOpen(true);
      } else {
        alert("예고편을 찾을 수 없습니다.");
      }
    } catch (error) {
      console.error("예고편 로딩 실패:", error);
    }
  };

  return (
    <>
      <div
        onClick={fetchTrailer}
        className="fixed bottom-6 right-6 z-50 cursor-pointer rounded-full flex items-center justify-center bg-yellow-100 w-20 h-20 hover:scale-110 transition-transform"
      >
        🎬
      </div>
      {isModalOpen && trailerKey && (
        <Modal trailerKey={trailerKey} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default TrailerButton;
