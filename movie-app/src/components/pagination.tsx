type Props = {
    page: number;
    onPageChange: (newPage: number) => void;
}

const Pagination = ({ page, onPageChange }: Props ) => {
    return (
        <div className="flex items-center justify-center mt-6 space-x-4">
            <button 
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                    page === 1 
                     ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                     : "bg-purple-500 text-white hover:bg-purple-600"
                }`}
            >
                &lt;
            </button>
            <span className="text-sm font-medium text-gray-700">Page {page}</span>
            <button
                onClick={() => onPageChange(page+1)}
                className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600"
            >
                &gt;
            </button>
        </div>
    );
};

export default Pagination;