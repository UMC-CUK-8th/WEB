import React, { useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // 사이드바 바깥 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      id="sidebar"
      style={{
        width: isOpen ? "200px" : "0",
        height: "100vh",
        backgroundColor: "#222",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        overflowX: "hidden",
        transition: "width 0.3s",
        padding: isOpen ? "20px" : "0",
        boxSizing: "border-box",
        zIndex: 999,
      }}
    >
      {isOpen && (
        <>
          <h2
            style={{ marginBottom: "1rem", cursor: "pointer" }}
            onClick={onClose}
          >
            <GiHamburgerMenu size={24} />
          </h2>

          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/search"
                className="text-[#ac0576] hover:text-gray-600 transition"
                title="검색"
                onClick={onClose}
              >
                <FaSearch size={20} className="inline-block mr-2" />
                검색
              </Link>
            </li>
            <li style={{ marginBottom: "1rem" }}>
              <Link
                to="/my"
                className="text-[#ac0576] hover:text-gray-600 transition"
                title="마이페이지"
                onClick={onClose}
              >
                <FaUser size={20} className="inline-block mr-2" />
                마이페이지
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default Sidebar;

// import React from "react";
// import { FaSearch } from "react-icons/fa";
// import { FaUser } from "react-icons/fa";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { Link } from "react-router-dom";

// interface SidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
//   return (
//     <div
//       id="sidebar"
//       style={{
//         width: isOpen ? "200px" : "0",
//         height: "100vh",
//         backgroundColor: "#222",
//         color: "white",
//         position: "fixed",
//         top: 0,
//         left: 0,
//         overflowX: "hidden",
//         transition: "width 0.3s",
//         padding: isOpen ? "20px" : "0",
//         boxSizing: "border-box",
//         zIndex: 999, // Sidebar가 Navbar보다 아래에 위치
//       }}
//       onClick={onClose} // 사이드바 외부 클릭 시 닫히도록 처리
//     >
//       {isOpen && (
//         <>
//           <h2 style={{ marginBottom: "1rem" }}>
//             <GiHamburgerMenu size={24} />
//           </h2>

//           <ul style={{ listStyle: "none", padding: 0 }}>
//             <li style={{ marginBottom: "1rem" }}>
//               <Link
//                 to="/search"
//                 className="text-[#ac0576] hover:text-gray-600 transition"
//                 title="검색"
//                 onClick={onClose} // 링크 클릭 시 사이드바 닫히도록
//               >
//                 <FaSearch size={20} />
//                 검색
//               </Link>
//             </li>
//             <li style={{ marginBottom: "1rem" }}>
//               <Link
//                 to="/my"
//                 className="text-[#ac0576] hover:text-gray-600 transition"
//                 title="마이페이지"
//                 onClick={onClose} // 링크 클릭 시 사이드바 닫히도록
//               >
//                 <FaUser size={20} />
//                 마이페이지
//               </Link>
//             </li>
//           </ul>
//         </>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
