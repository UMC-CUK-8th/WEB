type VideoProps = {
  trailerKey: string;
  onClose: () => void;
};

const Modal = ({ trailerKey, onClose }: VideoProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={onClose}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full px-3 py-1 cursor-pointer"
        >
          x
        </button>
      <div className="relative w-full max-w-3xl aspect-video">
        <iframe
          className="w-full h-full rounded-lg"
          src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
          title="영화 예고편"
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
        
      </div>
    </div>
  );
};

export default Modal;
