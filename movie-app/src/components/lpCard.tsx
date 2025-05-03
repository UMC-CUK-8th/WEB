interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
}

interface Props {
    lp: LP;
    onClick: () => void;
}

const LPCard = ({ lp, onClick }: Props) => {
    return (
        <div
        onClick={onClick}
        className="relative cursor-pointer overflow-hidden rounded shadow-md group"
        >
        <img
            src={lp.thumbnail}
            alt={lp.title}
            className="w-full aspect-square object-cover transition-transform duration-200 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end px-3 py-2">
            <div className="font-semibold">{lp.title}</div>
            <div className="text-xs">
            {new Date(lp.createdAt).toLocaleDateString()} ・ ♥ {lp.likes.length}
            </div>
        </div>
        </div>
    );
};

export default LPCard;
