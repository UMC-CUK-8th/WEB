import React from "react";
import type { Movie } from "../../types/movie";
import Rating from "./Rating";
import PopularityBar from "./PopularityBar";

type ModalContentProps = {
  movie: Movie;
};

const ModalContent: React.FC<ModalContentProps> = ({ movie }) => {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="flex-shrink-0 w-64">
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
          className="rounded-md"
        />
      </div>

      <div className="flex-1 text-gray-700">
        <div className="flex items-center mb-2">
          <Rating score={movie.vote_average} count={movie.vote_count} />
        </div>

        <div className="mb-4">
          <PopularityBar popularity={movie.popularity} />
        </div>

        <div className="flex flex-col items-start gap-2 mb-2">
          <div>
            <span className="font-semibold text-sm">개봉일:</span> {movie.release_date}
          </div>
          <div>
            <span className="font-semibold text-sm">언어:</span> {movie.original_language}
          </div>
          <div>
            <span className="font-semibold text-sm">나이 제한:</span>{" "}
            {movie.adult ? "성인" : "전체관람가"}
          </div>
          <div>
            <span className="font-semibold text-sm">비디오 여부:</span>{" "}
            {movie.video ? "비디오 있음" : "비디오 없음"}
          </div>
          <div>
            <span className="font-semibold text-sm">장르 ID:</span>{" "}
            {movie.genre_ids.join(", ")}
          </div>
        </div>

        <span className="flex font-semibold text-sm items-start border-t pt-2">줄거리:</span>{" "}
        <p
          className="
            text-sm whitespace-pre-wrap
            max-h-24 overflow-y-auto
            transparent-scroll
          "
        >
          {movie.overview}
        </p>
      </div>
    </div>
  );
};

export default ModalContent;
