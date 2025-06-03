import React from "react";
import type { Movie } from "../../types/movie";
import ModalBackdrop from "./ModalBackdrop";
import ModalContent from "./ModalContent";
import ModalActions from "./ModalActions";

type MovieModalProps = {
  movie: Movie;
  onClose: () => void;
};

const MovieModal: React.FC<MovieModalProps> = ({ movie, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg w-[90%] max-w-4xl max-h-[100vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalBackdrop movie={movie} onClose={onClose} />
        <ModalContent movie={movie} />
        <ModalActions movieTitle={movie.title} onClose={onClose} />
      </div>
    </div>
  );
};

export default MovieModal;
