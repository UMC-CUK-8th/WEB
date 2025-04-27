import { FC, MouseEvent } from "react";

interface TrailerProps {
    videoKey: string;
    onClose: () => void;
}

const Trailer: FC<TrailerProps> = ({ videoKey, onClose }) => {
    const handleBackClick = () => {
        onClose();
    };

    const handleModalClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-70 flex items-center justify-center" onClick={handleBackClick}>
            <div className="relative w-full max-w-3xl aspect-video" onClick={handleModalClick}>
                <iframe 
                    className="w-full h-full rounded"
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
                    title="Trailer"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                ></iframe>
                <button 
                    onClick={onClose}
                    className="absolute top-2 right-2 text-sm"
                >✖</button>
            </div>
        </div>
    );
};

export default Trailer;