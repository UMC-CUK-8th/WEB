const CommentSkeleton = () => {
    return (
      <div className="p-4 border-b animate-pulse">
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-2" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
        <div className="mt-2 h-4 bg-gray-200 rounded w-full" />
        <div className="mt-1 h-4 bg-gray-100 rounded w-1/3" />
      </div>
    );
  };
  
  export default CommentSkeleton;
  