import { NavLink } from "react-router-dom";
import { ReactNode } from "react";

interface SideBarLinkProps {
  to: string;
  label: string;
  icon: ReactNode;
}

const SideBarLink = ({ to, label, icon }: SideBarLinkProps) => {
    
    return (
        <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
                `flex items-center ${
                    isActive
                        ? 'text-white font-bold border-2 border-black'
                        : 'text-gray-500 border-1 border-gray-200'
                } px-3 py-1 rounded-md`
            }
        >
            <span className="mr-4">{icon}</span>
            {label}
        </NavLink>
    );
};

export default SideBarLink;