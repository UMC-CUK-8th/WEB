import { NavLink } from "react-router-dom";

const LINKS = [
    {to: '/search', label: '찾기'},
    {to: '/my', label: '마이페이지'},
];

const Sidebar = () => {
    return (
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-50 h-full">
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
            <div className="absolute bottom-5 w-full flex justify-center">
                <button
                    onClick={() => window.location.href = '/withdraw'}
                    className='text-red-500 bg-gray-200 px-3 py-1 rounded-md cursor-pointer'
                >탈퇴하기</button>
            </div>
        </nav>
    );
};

export default Sidebar;