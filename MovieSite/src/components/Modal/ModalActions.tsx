import React from "react";

type ModalActionsProps = {
  movieTitle: string;
  onClose: () => void;
};

const ModalActions: React.FC<ModalActionsProps> = ({ movieTitle, onClose }) => {
  return (
    <div className="flex justify-center items-center gap-3 p-3">
      <a
        href={`https://www.imdb.com/find?q=${encodeURIComponent(movieTitle)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        IMDb에서 검색
      </a>
      <button
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
      >
        닫기
      </button>
    </div>
  );
};

export default ModalActions;
