import {useNavigate} from "react-router-dom";
import { FaSearch, FaUser} from "react-icons/fa";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import useDeleteUsers from "../hooks/mutations/useDeleteUsers";

const Sidebar = () => {
    const navigate=useNavigate();

    const[modalClick,setModalClick]=useState(false);


    const openModal=()=>{
        setModalClick(true);
    }
    const closeModal=()=>{
        setModalClick(false);
    }

    const {mutate}=useDeleteUsers();
    const clickYes=()=>{
        mutate();
    }
    return (
        <div  className="flex flex-col justify-between w-50 p-6 bg-stone-900 ">
            <div className="flex flex-col gap-y-4 text-white">
                
                <div className="flex items-center gap-3 cursor-pointer  text-left w-20">
                <FaSearch/>
                <button className="cursor-pointer"
                            onClick={()=>navigate("/search")}>
                    찾기
                </button>
                </div>

                <div className="flex items-center gap-3 cursor-pointer  text-left">
                <FaUser/>
                <button
                    className="cursor-pointer"
                        onClick={()=>navigate("/my")}>
                        마이페이지
                </button>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="text-white cursor-pointer w-auto"
                    onClick={openModal}>
                    탈퇴하기
                </button>
            </div>  
        
            {modalClick &&(
                <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)]">
                    <div className="bg-gray-900 w-140 h-100 text-white rounded-xl p-3 ">
                        <div className="flex justify-end text-4xl "> 
                            <button className="cursor-pointer"
                            onClick={closeModal} ><IoIosClose /></button>
                        </div> 
                        <div className="flex items-center flex-col h-80 justify-center">
                            <h1 className="text-2xl ">정말 탈퇴하시겠습니까?</h1>
                            <div className="flex gap-x-10 mt-10">
                                <button className="w-30 h-8 bg-gray-200 cursor-pointer rounded-lg text-black" onClick={clickYes}>예</button>
                                <button className="w-30 h-8 bg-pink-500 cursor-pointer rounded-lg text-white" onClick={closeModal}>아니요</button>

                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Sidebar;
