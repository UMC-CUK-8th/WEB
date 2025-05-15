
import { useAuth } from "../../context/AuthContext";
import useGetMyInfo from "../../hooks/queries/useGetInfo";
import { Comments } from "../../types/lp";
import { GoPencil } from "react-icons/go";
import { FaRegTrashAlt,FaCheck  } from "react-icons/fa";
import { useState } from "react";
import usePatchComment from "../../hooks/mutations/usePatchComments";



interface commentCardProps {
    comment: Comments;
} 

export default function CommentCard({comment}:commentCardProps){

    const {accessToken}=useAuth();    
    const {data:myData}=useGetMyInfo(accessToken);
    const[startEdit,setStartEdit]=useState(false);
    const[changeContent,setChangeContent]=useState('');

    const {mutate:commentPatchMutate}=usePatchComment();
    const editOnClick=()=>{
        setStartEdit(false);
        commentPatchMutate({
            lpId:comment.lpId,
            commentId:comment.id,
            content:changeContent,
        })

    }


    return(
    <div className="flex w-full items-center pt-2">
        <img src={comment.author.avatar} 
            alt={`[${comment.author.avatar}] 프로필 이미지`}
            className="rounded-full w-8 h-8"/>
        <div className="pl-3 w-full">
            <div className="flex w-full justify-between">{comment.author.name}
                {myData?.data.email === comment.author.email &&(
                    !startEdit ? (
                        <div className="flex gap-x-2 ">
                        <button className="cursor-pointer" onClick={()=>{setChangeContent(comment.content); setStartEdit(true)}}><GoPencil /></button>
                        <button className="cursor-pointer"><FaRegTrashAlt /></button>
                        </div>
                    ):(
                        <button className="cursor-pointer" onClick={editOnClick}><FaCheck /></button>
                    )
                    
                )}
            </div>
            {!startEdit ? (<p className="h-8">{comment.content}</p>):
                (
                    <input className="border border-gray-300 rounded-md p-1 m-1 w-150 h-8"
                        value={changeContent}
                        onChange={(e)=>setChangeContent(e.target.value)}/>
                )}
            
            
        </div>
            
    </div>);
}