const CommentSkeleton = () => {
    return (
      <div className="flex items-start space-x-3 animate-pulse mb-4">
        <div className="w-6 h-6 rounded-full bg-gray-700" />
  
        <div className="flex-1 space-y-2">
          <div className="w-1/4 h-3 bg-gray-700 rounded-sm" />
          <div className="w-5/6 h-6 bg-gray-700 rounded-sm" />
        </div>
      </div>
    );
  };
  
  export default CommentSkeleton;
  