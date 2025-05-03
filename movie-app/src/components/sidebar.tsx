import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {
  open: boolean;
  onClose: () => void;
  breakpoint?: number;
};

const Sidebar = ({ open, onClose, breakpoint = 768 }: Props) => {
    const ref = useRef<HTMLDivElement>(null);
  
    // 바깥 클릭 시 닫힘
    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open, onClose]);
  
    // 창 크기 줄이면 닫힘
    useEffect(() => {
      if (!open) return;
      const handleResize = () => {
        if (window.innerWidth < breakpoint) {
          onClose();
        }
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [open, onClose, breakpoint]);
  
    return (
        <div
          ref={ref}
          className={`
            absolute left-0 top-full w-56 bg-black text-white flex flex-col py-8 px-6
            transition-transform duration-200 z-10
            ${open ? "translate-x-0" : "-translate-x-full"}
          `}
        >
          {/* 메뉴 내용 */}
          <nav className="flex flex-col gap-6">
            <Link to="/search" className="hover:text-red-500" onClick={onClose}>찾기</Link>
            <Link to="/mypage" className="hover:text-red-500" onClick={onClose}>마이페이지</Link>
            <button className="text-left text-xs text-gray-400 hover:text-red-600 mt-8" onClick={() => {/* 탈퇴 로직 */}}>탈퇴하기</button>
          </nav>
        </div>
    );
};
  
export default Sidebar;