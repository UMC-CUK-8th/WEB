import React from "react";
import type { Movie } from "../../types/movie";

type ModalBackdropProps = {
  movie: Movie;
  onClose: () => void;
};

const ModalBackdrop: React.FC<ModalBackdropProps> = ({ movie, onClose }) => {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-t-lg">
      {movie.backdrop_path && (
        <img
          src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
      )}
      <button
        onClick={onClose}
        className="absolute top-2 right-4 text-white text-xl p-1"
      >
        ✕
      </button>
      <div className="absolute bottom-2 left-4 text-white font-bold p-2 rounded-md">
        <h2 className="text-3xl font-bold">{movie.title}</h2>
        <p className="text-mb">{movie.original_title}</p>
      </div>
    </div>
  );
};

export default ModalBackdrop;
