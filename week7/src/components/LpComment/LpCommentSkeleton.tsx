const LpCommentSkeleton = () => {
    return (
        <div className="flex items-start animate-pulse">
            <div className="w-10 h-10 rounded-full bg-gray-300 mr-3" />
            <div className="flex flex-col space-y-2 w-full">
            <div className="w-1/4 h-4 bg-gray-300 rounded" />
            <div className="w-3/4 h-3 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export default LpCommentSkeleton;