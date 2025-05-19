import { Search, UserRound } from "lucide-react";
import Withdraw from "./Withdraw";
import SideBarLink from "./SideBarLink";

interface SideBarProps {
    handleSearchClick: () => void;
}

const SideBar = ({handleSearchClick}: SideBarProps) => {
    
    return (
        <>
        <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-50 h-full z-30">
            <div className="flex flex-col gap-3 p-4 mt-20">
                <button
                    onClick={handleSearchClick}
                    className="flex items-center text-gray-500 border-1 border-gray-200 px-3 py-1 rounded-md"
                >
                    <Search className="w-4 h-4 mr-4" />
                    찾기
                </button>
                <SideBarLink to="/my" label="마이페이지" icon={<UserRound className="w-4 h-4" />} />
            </div>
            
            <div className="absolute bottom-20 w-full">
                <Withdraw />
            </div>
        </nav>
        </>
    );
};

export default SideBar;