import { useAuth } from "../context/AuthContext";
import useGetMyInfo from "../hooks/queries/useGetInfo";
import { PAGINATION_ORDER } from "../enums/common";
import { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import usePatchUsers from "../hooks/mutations/usePatchUsers";



const MyPage=()=>{
    const {accessToken}=useAuth();
    const [oldnew,setOldnew]=useState(PAGINATION_ORDER.asc);
    
    
    const {data}=useGetMyInfo(accessToken);

    const[startEdit,setStartEdit]=useState(false);
    const[changeName,setChangeName]=useState("");
    const[changeBio,setChangeBio]=useState("");
    const[changeAvatar,setChangeAvatar]=useState("");


    useEffect(() => {
    if (data?.data) {
      setChangeName(data.data.name);
      setChangeBio(data.data.bio ?? "");
      setChangeAvatar(data.data.avatar ?? "");
    }
  }, [data]);

    const{mutate:userChangeMutate}=usePatchUsers();
    const changeOnClick=()=>{
        setStartEdit(false);
        console.log("성공");
        userChangeMutate({
            name:changeName,
            bio:changeBio,
            avatar:changeAvatar
        })
    }

    
    return (
    <div className="flex  justify-center bg-black h-full">
        <div className="flex flex-col items-center p-10 w-full text-white">
            <div className="flex w-150">
            {!startEdit ? (<>
                <img src={data?.data?.avatar as string} className="w-40 rounded-full aspect-square" alt={"구글로고"}/>
                <div className="pl-5 flex flex-col gap-y-1 text-left w-full">
                    <div className="flex justify-between w-full">
                        <h1 className="text-4xl text-left">{data?.data?.name}</h1>
                        <button onClick={()=>setStartEdit(true)} className="text-3xl cursor-pointer">
                            <IoIosSettings />
                        </button></div>
                    <p className="text-lg">{data?.data.bio}</p>
                    <h1 className="text-lg">{data?.data?.email}</h1>
                </div>
            </>) : (
                <>
                    <img src={data?.data?.avatar as string} className="w-40 rounded-full aspect-square" alt={"구글로고"}/>
                    <div className="pl-5 flex flex-col gap-y-1 text-left w-full">
                        <div className="flex justify-between w-full">
                            <input className="text-4xl text-left border border-gray-300 rounded-lg"
                                value={changeName}
                                onChange={(e)=>setChangeName(e.target.value)}/>

                            <button onClick={changeOnClick} className="text-xl cursor-pointer ">
                                <FaCheck />
                            </button>
                            </div>
                        <input className="text-lg border border-gray-300 rounded-lg" 
                            value={changeBio ?? ""} 
                            onChange={(e)=>setChangeBio(e.target.value)}/>
                        <h1 className="text-lg">{data?.data?.email}</h1>
                    </div>
                </>
            )}
            </div>
            <div className="flex justify-end items-center w-full mt-10">
                                <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-l-lg ${oldnew === "asc" ? "bg-white text-black" : " text-white"}`}
                                    onClick={()=>setOldnew(PAGINATION_ORDER.asc)}>오래된순</button>
                                <button className={`w-23 p-2 border-2 border-white cursor-pointer rounded-r-lg ${oldnew !== "asc" ? "bg-white text-black" : " text-white"}`}
                                    onClick={()=>setOldnew(PAGINATION_ORDER.desc)}>최신순</button>
            </div>

            
    
            

            

        </div>
    </div>
    )
}

export default MyPage;