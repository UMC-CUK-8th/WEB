import { useParams } from "react-router-dom";
import useGetLpDetail from "../hooks/queries/useGetLpDetail";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt,FaRegHeart,FaCheck } from "react-icons/fa";
import useGetInfiniteCommentsList from "../hooks/queries/useGetInfiniteCommentsList";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import CommentCard from "../components/CommentCard/CommentCard";
import CommentCardSkeletonList from "../components/CommentCard/CommentCardSkeletonList";
import { useInView } from "react-intersection-observer";
import useGetMyInfo from "../hooks/queries/useGetInfo";
import { useAuth } from "../context/AuthContext";
import usePostLike from "../hooks/mutations/usePostLike";
import useDeleteLike from "../hooks/mutations/useDeleteLike";
import usePostComment from "../hooks/mutations/usePostComment";
import { IoIosClose } from "react-icons/io";
import usePatchLp from "../hooks/mutations/usePatchLp";
import useDeleteLp from "../hooks/mutations/useDeleteLp";


const LpPage=()=>{
    const {lpId} = useParams();
    const {data:lp,isPending, isError}=useGetLpDetail({lpId:Number(lpId)});
    
    const [oldnew,setOldnew]=useState(PAGINATION_ORDER.asc);
    const {data:comments,isFetching,isPending:commentIsPending,fetchNextPage,hasNextPage,isError:commentIsError}=useGetInfiniteCommentsList(Number(lpId),3,oldnew);
   
    const {accessToken}=useAuth();
    const[startEdit,setStartEdit]=useState(false);
    const[lpThumbnail,setLpThumbnail]=useState("");
    const[lpTitle,setLpTitle]=useState("");
    const[lpContent,setLpContent]=useState("");
    const[lpTags,setLpTags]=useState('');
    const[lpTagsList,setLpTagsList]=useState<string[]>([]);


    useEffect(() => {
    if (lp?.data) {
      setLpThumbnail(lp.data.thumbnail);
      setLpTitle(lp.data.title);
      setLpContent(lp.data.content);
      setLpTagsList(lp.data.tags.map(tag=>tag.name));
    }
  }, [lp]);

    const {data:me}=useGetMyInfo(accessToken);
    //mutate -> 비동기 요청을 실행하고, 콜백 함수를 이용해서 후속 작업을 처리함
    //mutateAsync -> promise를 반환해서 await 사용가능 
    const{mutate:likeMutate}=usePostLike();
    const{mutate:disLikeMutate}=useDeleteLike();

    //const isLiked=lp?.data.likes.map((like)=>like.userId).includes(me?.data.id as number)
    const isLiked=lp?.data.likes.some((like)=>like.userId===me?.data.id); //강의: 위 코드보다 some이 더 빠른 걸로 알고있다. 
    const handleLikeLp=()=>{
        likeMutate({lpId:Number(lpId)});
    }
    const handleDislikeLp=()=>{
        disLikeMutate({lpId:Number(lpId)});
    }
    
    const {ref,inView}=useInView({threshold:0,})

    useEffect(()=>{
        if (inView&&!isFetching && hasNextPage){fetchNextPage()
        }
    },[inView,isFetching,fetchNextPage]);

    const [inputContent,setInputContent]=useState('');
    const {mutate:contentMutate}=usePostComment();
    const contentOnClick=()=>{
        contentMutate({
            lpId:Number(lpId),
            content:inputContent
        });
        setInputContent('');
    }
    
    const {mutate}=usePatchLp();
    const clickCheck=()=>{
        setStartEdit(false);
        mutate({
            lpId:Number(lpId),
                lpData:{
                title:lpTitle,
                content:lpContent,
                thumbnail:lpThumbnail,
                tags:lpTagsList,
                published:true
            }
        })

    }
    const tagOnClick=()=>{
        if(!lpTags) return;
        setLpTagsList(Prev=>[...Prev,lpTags]);
        setLpTags('');
    }
    const deleteTagonClick=(deleteTag:string)=>{
        setLpTagsList(prev => prev.filter(tag => tag !== deleteTag));
    }
    const {mutate:deleteMutate}=useDeleteLp();
    const deleteLpClick=()=>{
        deleteMutate({
            lpId:Number(lpId)
        },);
    }



    if(isPending){
        return <div>Loading...</div>;
    }

    if (isError||commentIsError){
        return <div>Error.</div>;
    }

    if (!lp) {
        return <div>No data found</div>;  // 데이터가 없을 경우
    }


    

    return <div className="bg-black flex items-center justify-center">
    <div className="p-5 gap-y-5 bg-gray-400 w-200 rounded-lg flex flex-col items-center text-white mt-10 mb-10">
        <div className="flex items-center justify-between w-150">
            <div className="flex gap-x-2">
                <img src={lp?.data?.author?.avatar} 
                className="w-10 h-10"
                alt={"구글로고"}/>
                <p className=" flex items-center">{lp.data.author.name}</p>
            </div>
            <p>{lp.data.createdAt.slice(0,10)}</p>
        </div>
        <div className="flex items-center justify-between w-150 text-2xl">
            {!startEdit?(<p>{lp.data.title}</p>):(<input type="text" value={lpTitle} onChange={(e)=>setLpTitle(e.target.value)} className="w-100 h-10 pl-2 rounded-md border border-gray-500 mb-6"/>)}
            <div className="flex gap-x-2">
                {!startEdit ? (<button onClick={()=>setStartEdit(true)} className="cursor-pointer"><GoPencil /></button>) : 
                (<button onClick={clickCheck} className="cursor-pointer"><FaCheck /></button>)}
                <button onClick={deleteLpClick} className="cursor-pointer" ><FaRegTrashAlt /></button>
            </div>
        </div>
        <div className="w-65 h-65 shadow-md flex items-center justify-center relative">
            <img src={lp.data.thumbnail} className="w-60 h-60 object-cover rounded-full animate-spin"/>
            <div className="absolute w-8 h-8 rounded-full bg-gray-300   "></div>
        </div>
        {!startEdit ? (<p className="w-150">{lp.data.content}</p>):(<input type="text" value={lpContent} onChange={(e)=>setLpContent(e.target.value)} className="w-150 h-10 pl-2 rounded-md border border-gray-500 mb-6"/>)}
        {startEdit?(
            <>
            <div className="w-full flex">
                                <input type="text" placeholder="LP Tag" className="h-10 w-full text-lg pl-2  rounded-md border border-gray-500 mb-6" value={lpTags} onChange={(e)=>setLpTags(e.target.value)}/>
                                <button className="bg-pink-500 rounded-md w-20 ml-2 h-10 text-lg cursor-pointer" onClick={tagOnClick}>Add</button>
                            </div>
                            <div className="flex gap-x-2">
                {lpTagsList.map((tag,idx) => (
                    <div className="border border-white rounded-lg p-1 flex itmes-center" >
                    <span key={idx}>#{tag}</span><button className="cursor-pointer text-xl" onClick={()=>deleteTagonClick(tag)}><IoIosClose /></button></div>) )}
            </div>
        </>):
        (<><div className="flex gap-x-2">
        {lp.data.tags.map((tag,idx) => (<span className="border border-white rounded-lg p-1 " key={idx}>#{tag.name}</span>))}
        </div></>)}
        
        <button onClick={isLiked? handleDislikeLp:handleLikeLp} className="cursor-pointer">
            <FaRegHeart color={isLiked? "red" : "black"} fill={isLiked? "red":"white"}/>
        </button>
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
                value={inputContent}
                onChange={(e)=>setInputContent(e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-full"
                />
            <button className="w-25 mx-3 bg-gray-500 rounded-md" onClick={contentOnClick}>작성</button>
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