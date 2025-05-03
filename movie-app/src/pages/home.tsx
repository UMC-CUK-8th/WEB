import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import LPCard from "../components/lpCard";
import { useAuth } from "../context/authContext";

interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
}

const fetchLPs = async (order: string): Promise<LP[]> => {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/v1/lps`, {
        params: {
            cursor: 0,
            limit: 5,
            order,
        },
    });
    return res.data.data.data;
};

const HomePage = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState("desc");
    const { isAuthenticated } = useAuth();

    const { data: lps = [], isLoading, isError } = useQuery({
        queryKey: ["lps", order],
        queryFn: () => fetchLPs(order),
    });

    const handleCardClick = (lpId: number) => {
        if (!isAuthenticated) {
          const confirmLogin = window.confirm("로그인이 필요한 기능입니다. 로그인하시겠습니까?");
          if (confirmLogin) {
            navigate("/login");
          }
        } else {
          navigate(`/lp/${lpId}`);
        }
    };

    if (isLoading) return <div className="text-red-500">로딩 중...</div>;
    if (isError) return <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>;

    return (
        <div className="bg-black min-h-screen py-6 px-4">
            <div className="max-w-screen-2xl mx-auto px-6">
                {/* 정렬 버튼 */}
                <div className="flex justify-end mb-4 gap-2">
                    <button
                        onClick={() => setOrder("asc")}
                        className={`px-3 py-1 text-sm rounded border ${
                        order === "asc" ? "bg-red-500 text-white border-red-500" : "text-red-500 border-red-500"
                        }`}
                    >
                        오래된 순
                    </button>
                    <button
                        onClick={() => setOrder("desc")}
                        className={`px-3 py-1 text-sm rounded border ${
                        order === "desc" ? "bg-red-500 text-white border-red-500" : "text-red-500 border-red-500"
                        }`}
                    >
                        최신 순
                    </button>
                </div>

                {/* LP 카드 목록 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {lps.map((lp) => (
                        <LPCard key={lp.id} lp={lp} onClick={() => handleCardClick(lp.id)} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;