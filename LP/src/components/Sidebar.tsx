import {useNavigate} from "react-router-dom";
import { FaSearch, FaUser} from "react-icons/fa";

const Sidebar = () => {
    const navigate=useNavigate();

    return (
        <div  className="flex flex-col justify-between w-50 p-6 bg-stone-900 ">
            <div className="flex flex-col gap-y-4 text-white">
                
                <div className="flex items-center gap-3 cursor-pointer  text-left w-20">
                <FaSearch/>
                <button className="cursor-pointer">
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
                    className="text-white cursor-pointer w-auto">
                    탈퇴하기
                </button>
            </div>  
        </div>
    );
};

export default Sidebar;
