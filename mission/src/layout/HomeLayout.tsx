import { Outlet, Link } from 'react-router-dom';

const HomeLayout = () => {
    return(
        <div className="h-dvh flex flex-col">
            <nav className="flex items-center justify-between bg-[#1e1e1e] text-white p-4">
            <Link to="/" className="flex text-[#D0C1FF] font-bold text-2xl">돌려돌려 LP판</Link>
            <div className="flex items-center gap-2">
            <Link to="/login" className="w-20 bg-black p-2 rounded-md text-white text-center">로그인</Link>
            <Link to="/signup" className="w-20 bg-[#D0C1FF] p-2 rounded-md text-black text-center">회원가입</Link>
            </div>
            </nav>
            <main className="flex-1">
                <Outlet/>
            </main>
            {/* <footer>푸터</footer> */}
        </div>
    );
};

export default HomeLayout;