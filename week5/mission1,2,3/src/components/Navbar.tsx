import { NavLink } from "react-router-dom";

const LINKS = [
    {to: '/login', label: '로그인'},
    {to: '/signup', label: '회원가입'},
];

export const Navbar = () => {
    return (
        <div className="flex gap-3 p-4 justify-end">
            {LINKS.map(({ to, label }) => (
            <NavLink
                key={to}
                to={to}
                className={({isActive}) => {
                return isActive ? 'text-white font-bold bg-black px-3 py-1 rounded-md' : 'text-gray-500 bg-gray-200 px-3 py-1 rounded-md'
                }}>
                {label}
            </NavLink>
            ))}
        </div>
    );
};