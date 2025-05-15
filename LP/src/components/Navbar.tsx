import {useNavigate} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsList } from "react-icons/bs";
import useGetMyInfo from "../hooks/queries/useGetInfo";
import usePostSignout from "../hooks/mutations/usePostSignout";

const Navbar = ({clickSidebar}:{clickSidebar:()=>void}) => {
    const navigate=useNavigate();
    const {accessToken}=useAuth();
    const {mutate}=usePostSignout();

    const handleLogout=async()=>{
        mutate();
        navigate("/");
    };

    const {data}=useGetMyInfo(accessToken);
    return (
        <nav  className="flex items-center justify-between p-6 pl-10 bg-stone-900 ">
                
                <div className="flex items-center justify-center gap-x-4 ">
                <BsList className="text-white text-2xl cursor-pointer" onClick={clickSidebar}/>
                <span
                    className="text-pink-500 text-2xl font-bold cursor-pointer "
                    onClick={()=>navigate("/")}>
                돌려돌려LP판
                </span>
                </div>
                <div className="flex  gap-x-4">
                    {!accessToken&&(
                        <>
                            <button
                                className="bg-black text-white rounded-sm cursor-pointer w-20 h-8"
                                onClick={()=>navigate("/login")}>
                                로그인
                            </button>
                            <button
                                className=" bg-pink-500 text-white rounded-sm w-20 h-8 cursor-pointer"
                                onClick={()=>navigate("/signup")}>
                                회원가입
                            </button>
                        </>
                    )}
                    {accessToken&&(
                        <div className="flex justify-center items-center gap-x-4">
                        <div className="text-white">
                            {data?.data.name}님 반갑습니다. 
                        </div>
                        <button className="bg-black text-white rounded-sm cursor-pointer w-20 h-8" onClick={handleLogout}>로그아웃</button>

                        </div>
                    )}
                    
                </div>
            </nav>
    );
};

export default Navbar;
