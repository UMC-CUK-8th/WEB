const CommentCardSkeleton=()=>{
    return (
        <div className="flex w-full items-center mb-4 overflow-hidden animate-pulse">
            <div className="rounded-full w-8 h-8 bg-gray-300"/>
            <div className="pl-3  flex flex-col gap-y-2">
                <div className="rounded-lg bg-gray-300 w-35 h-3"/>
                <div className="rounded-lg bg-gray-300 w-80 h-3"/>
            </div>
            
    </div>
    )
 }

 export default CommentCardSkeleton;