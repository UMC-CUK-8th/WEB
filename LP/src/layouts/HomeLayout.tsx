import { Outlet, useNavigate } from "react-router-dom";

const HomeLayout=()=>{
    const navigate=useNavigate();

    return (
        <div className="h-dvh flex flex-col">
            <nav  className="flex items-center justify-between p-6 pl-10 bg-stone-900 ">
                <span
                    className="text-pink-500 text-2xl font-bold cursor-pointer"
                    onClick={()=>navigate("/")}>
                돌려돌려LP판
                </span>
                <div className="flex gap-x-4">
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
                </div>
            </nav>
            <main className="flex-1">
                <Outlet />
            </main>
        </div>
        
    )
}
export default HomeLayout;