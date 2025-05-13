import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt } from "react-icons/fa";
import useGetInfiniteCommentsList from "../hooks/queries/useGetInfiniteCommentsList";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard/CommentCard";
import CommentCardSkeletonList from "../components/CommentCard/CommentCardSkeletonList";
import { useInView } from "react-intersection-observer";

const LpPage=()=>{
    const {id} = useParams();
    const numberId = Number(id);
    const {data,isPending, isError}=useGetLpDetail(numberId);
    
    console.log("Fetched Data:", data); // 데이터를 콘솔에서 확인

    const [oldnew,setOldnew]=useState(PAGINATION_ORDER.asc);
    const {data:comments,isFetching,isPending:commentIsPending,fetchNextPage,hasNextPage,isError:commentIsError}=useGetInfiniteCommentsList(numberId,3,oldnew);
   

    const {ref,inView}=useInView({threshold:0,})

    useEffect(()=>{
        if (inView&&!isFetching && hasNextPage){fetchNextPage()
        }
    },[inView,isFetching,fetchNextPage]);

    if(isPending){
        return <div>Loading...</div>;
    }

    if (isError){
        return <div>Error.</div>;
    }

    if (!data) {
        return <div>No data found</div>;  // 데이터가 없을 경우
      }

    return <div className="bg-black flex items-center justify-center">
    <div className="p-5 gap-y-5 bg-gray-400 w-200 rounded-lg flex flex-col items-center text-white mt-10 mb-10">
        <div className="flex items-center justify-between w-150">
            <div className="flex gap-x-2">
                <img src={data.data.author.avatar} 
                className="w-10 h-10"
                alt={"구글로고"}/>
                <p className=" flex items-center">{data.data.author.name}</p>
            </div>
            <p>{data.data.createdAt.slice(0,10)}</p>
        </div>
        <div className="flex items-center justify-between w-150">
            <p>{data.data.title}</p>
            <div className="flex gap-x-2">
                <GoPencil />
                <FaRegTrashAlt />
            </div>
        </div>
        <div className="w-65 h-65 shadow-md flex items-center justify-center relative">
            <img src={data.data.thumbnail} className="w-60 h-60 object-cover rounded-full animate-spin"/>
            <div className="absolute w-8 h-8 rounded-full bg-gray-300   "></div>
        </div>
        <p className="w-150">{data.data.content}</p>
        {data.data.tags.map((tag) => (<span>#{tag.name}</span>))}

        <div className="flex justify-between items-center w-full">
            <h2 className="text-lg">댓글</h2>
                <div className="flex justify-end items-center">
                <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-l-lg ${oldnew === "asc" ? "bg-white text-black" : " text-white"}`}
                    onClick={()=>setOldnew(PAGINATION_ORDER.asc)}>오래된순</button>
                <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-r-lg ${oldnew !== "asc" ? "bg-white text-black" : " text-white"}`}
                    onClick={()=>setOldnew(PAGINATION_ORDER.desc)}>최신순</button>
                </div>
        </div>
        <div className="flex w-full">
            <input
                type="text"
                placeholder="댓글을 입력해주세요"
                className="border border-gray-300 rounded-md p-2 w-full"
                />
            <button className="w-25 mx-3 bg-gray-500 rounded-md">작성</button>
        </div>
        <div className="w-full">
        {commentIsPending&&<CommentCardSkeletonList count={3}/>}
        {comments?.pages?.map((page)=>page.data.data).flat().map((comment)=><CommentCard key={comment.id} comment={comment}/>)}
        {isFetching&&<CommentCardSkeletonList count={3}/>}
        <div ref={ref} className="h-2"></div>
        </div>


    </div>
    </div>
}

export default LpPage;