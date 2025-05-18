import { useState } from "react";
import { NavLink } from "react-router-dom";

const LINKS = [
    {to: '/search', label: '찾기'},
    {to: '/my', label: '마이페이지'},
];

const Sidebar = () => {
    const [modal, setModal] = useState(false);

    const handleOpen = () => {
        setModal(true);
        document.body.style.overflow = 'hidden';
    };
    const handleClose = () => {
        setModal(false);
        document.body.style.overflow = 'auto';
    };
    
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-50 h-full z-30">
            <div className="flex flex-col gap-3 p-4 mt-20">
                {LINKS.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) =>
                            isActive
                                ? 'text-white font-bold border-2 border-black px-3 py-1 rounded-md'
                                : 'text-gray-500 border-1 border-gray-200 px-3 py-1 rounded-md'
                        }
                    >{label}</NavLink>
                ))}
            </div>
            <div className="absolute bottom-20 w-full flex justify-center">
                <button
                    onClick={() => setModal(true)}
                    className='text-red-500 bg-gray-200 px-3 py-1 rounded-md cursor-pointer'
                >탈퇴하기</button>

                {modal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-40" onClick={handleClose}>
                        <div className="relative bg-white p-20 rounded-lg shadow-lg flex flex-col items-center space-y-5"
                            onClick={(e) => e.stopPropagation()}>
                            <div className="text-lg font-semibold text-gray-800 mb-10">
                                정말로 탈퇴하시겠습니까?
                            </div>
                            <button
                                className="absolute top-4 right-4 text-gray-600 hover:text-black cursor-pointer" onClick={handleClose}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <div className="flex space-x-4">
                                <button 
                                    className="text-gray-600 w-[100px] p-2 text-md
                                    rounded-lg border border-gray-300 transition
                                    hover:bg-gray-300 cursor-pointer"
                                    type="button"
                                >
                                    예
                                </button>
                                <button 
                                    className="text-gray-600 w-[100px] p-2 text-md
                                    rounded-lg border border-gray-300 transition
                                    hover:bg-gray-300 cursor-pointer"
                                    type="button"
                                >
                                    아니오
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Sidebar;