import { useRef, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import api from "../api/axiosInstance";
import { useAuth } from "../context/authContext";

type Props = {
  open: boolean;
  onClose: () => void;
  breakpoint?: number;
};

const Sidebar = ({ open, onClose, breakpoint = 768 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const { isAuthenticated } = useAuth();

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

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await api.delete("/v1/users");
    },
    onSuccess: () => {
      alert("회원 탈퇴가 완료되었습니다.");
      localStorage.clear();
      navigate("/");
    },
    onError: () => {
      alert("회원 탈퇴에 실패했습니다.");
    },
  });

  return (
    <>
      {/* 사이드바 */}
      <div
        ref={ref}
        className={`
          fixed top-16.2 left-0 w-56 h-[calc(100vh-3.5rem)] bg-black text-white 
          flex flex-col py-8 px-6 z-10 shadow-md
          transition-transform duration-200 
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <nav className="flex flex-col gap-6 flex-grow">
          <Link to="/search" className="hover:text-red-500 text-sm" onClick={onClose}>찾기</Link>
          <Link to="/mypage" className="hover:text-red-500 text-sm" onClick={onClose}>마이페이지</Link>
        </nav>

        {isAuthenticated && (
          <button
            className="text-left text-xs text-gray-400 hover:text-red-600"
            onClick={() => setShowConfirm(true)}
          >
            탈퇴하기
          </button>
        )}
      </div>

      {/* 탈퇴 확인 모달 */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
          <div className="bg-white text-black rounded-lg p-6 shadow-md w-72 text-center space-y-4">
            <p className="text-sm font-semibold">정말 탈퇴하시겠습니까?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => {
                  setShowConfirm(false);
                  deleteMutation.mutate();
                }}
                className="border border-gray-300 text-gray-700 px-5 py-1 rounded text-sm hover:bg-gray-100"
              >
                Y
              </button>
              <button
                onClick={() => setShowConfirm(false)}
                className="bg-red-600 text-white px-5 py-1 rounded hover:bg-red-700 text-sm"
              >
                N
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
