import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { IoIosClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa";
import usePostLp from "../hooks/mutations/usePostLp";
import usePostUploads from "../hooks/mutations/usePostUploads";

const HomeLayout=()=>{

    const[sidebarClick,setSidebarClick]=useState(true);
    const[modalClick,setModalClick]=useState(false);
    const[inputImage,setInputImage]=useState('');
    const[lpName,setLpName]=useState('');
    const[lpContent,setLpContent]=useState('');
    const[lpTags,setLpTags]=useState('');
    const[lpTagsList,setLpTagsList]=useState<string[]>([]);

    const clickSidebar=()=>{
        setSidebarClick((click)=>!click);
    }
    const openModal=()=>{
        setModalClick(true);
    }
    const closeModal=()=>{
        setModalClick(false);
        setInputImage('');
    }
    const tagOnClick=()=>{
        if(!lpTags) return;
        setLpTagsList(Prev=>[...Prev,lpTags]);
        setLpTags('');
    }
    const deleteTagonClick=(deleteTag:string)=>{
        setLpTagsList(prev => prev.filter(tag => tag !== deleteTag));
    }
    const handleClick=()=>{
        const clickLp=document.getElementById("imageUpload")as HTMLInputElement;
        clickLp.click();
    }
    const {mutate:uploadMutate}=usePostUploads();
    const handleImage=(e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if (!file) return;

        uploadMutate(file,{
            onSuccess:(data)=>setInputImage(data.data.imageUrl)
        });
        
    }

    const {mutate:lpMutate}=usePostLp();
    const handleLpAdd=()=>{
        const lpData={
            title:lpName,
            content:lpContent,
            thumbnail:inputImage,
            tags:lpTagsList,
            published:true,
        };
        console.log(lpData);
        lpMutate(lpData,{
            onSuccess: () => {
            setLpName('');
            setLpContent('');
            setInputImage('');
            setLpTags('');
            setLpTagsList([]);
            closeModal();
            },
            onError: (error) => {
            console.error("LP등록오류오류오류", error);
            alert("등록에 실패했습니다ㅜㅜㅜㅜㅜㅜㅜㅜ");
            }})

    }

    return (
        <div className="flex flex-col h-screen">
            <Navbar clickSidebar={clickSidebar}/>
            
            <main className="flex flex-1 overflow-hidden">
                {sidebarClick&&<Sidebar/>}
                <div className="flex-1 overflow-auto">
                <Outlet />

                <button className="fixed bottom-7 right-10 bg-pink-500 rounded-full w-16 h-16 text-xl font-bold text-white flex items-center justify-center cursor-pointer"
                    onClick={openModal}><FaPlus /></button>

                {modalClick && (
                    <div className="fixed inset-0 flex justify-center items-center bg-[rgba(0,0,0,0.3)]" onClick={closeModal}>
                        <div className="bg-gray-900 w-125 h-160 text-white rounded-xl p-3 " onClick={(e) => e.stopPropagation()}>

                            <div className="flex justify-end text-4xl"> 
                                <button className="cursor-pointer"
                                    onClick={closeModal} ><IoIosClose /></button>
                            </div> 

                            <div className="flex justify-center items-center p-6 pb-9 w-full relative">
                                {!inputImage ? (<img src="/lpImage.png" alt="lp이미지" className="rounded-full w-60 h-60 cursor-pointer" onClick={handleClick}/>):
                                (
                                <>
                                <div className="w-60 h-60"></div>
                                <img src={inputImage} alt="업로드한 이미지" className="absolute top-0 left-5 w-70 h-70 object-cover z-10"/>
                                <img src="/lpImage.png" alt="lp이미지" className="absolute top-5 left-50 rounded-full w-60 h-60 cursor-pointer" onClick={handleClick}/>
                                </>)
                                }
                                
                            </div>
                            <input id="imageUpload" type="file" onChange={handleImage} className="hidden"/>

                            <input type="text" placeholder="LP Name" value={lpName} onChange={(e)=>setLpName(e.target.value)} className="w-full h-10 text-lg pl-2  rounded-md border border-gray-500 mb-6"/>
                            <input type="text" placeholder="LP Content" value={lpContent} onChange={(e)=>setLpContent(e.target.value)} className="w-full h-10 text-lg pl-2  rounded-md border border-gray-500 mb-6"/>
                            <div className="w-full flex">
                                <input type="text" placeholder="LP Tag" className="h-10 w-full text-lg pl-2  rounded-md border border-gray-500 mb-6" value={lpTags} onChange={(e)=>setLpTags(e.target.value)}/>
                                <button className="bg-pink-500 rounded-md w-20 ml-2 h-10 text-lg cursor-pointer" onClick={tagOnClick}>Add</button>
                            </div>
                            <div className="flex">
                                {lpTagsList.map((tag,idx)=>(
                                    <div key={idx} className="flex h-10 p-2 rounded-md border border-gray-500 justify-center itmes-center mr-2">
                                        <p className="">{tag}</p>
                                        <button className="cursor-pointer text-xl" onClick={()=>deleteTagonClick(tag)}><IoIosClose /></button>
                                    </div>))}
                            </div>



                            <button className="mt-5 bg-pink-500 rounded-md w-full h-10 text-lg cursor-pointer"
                                onClick={handleLpAdd}>
                                Add LP
                            </button>


                        </div>
                    </div>
                )}
                </div>
            </main>
        </div>
        
    )
}
export default HomeLayout;