import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import LPCard from "../components/lpCard";
import { useAuth } from "../context/authContext";
import SkeletonCard from "../components/skeletonCard";

interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    likes: { id: number }[];
}

const fetchLPs = async ({ pageParam = 0, queryKey }: any) => {
    const order = queryKey[1];
    await new Promise((resolve) => setTimeout(resolve, 500)); // 일부러 지연
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/v1/lps`, {
        params: {
            cursor: pageParam,
            limit: 5,
            order,
        },
    });
    return res.data.data;
  };

const HomePage = () => {
    const navigate = useNavigate();
    const [order, setOrder] = useState("desc");
    const { isAuthenticated } = useAuth();
    const bottomRef = useRef<HTMLDivElement | null>(null);

    const {
        data,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
        status,
        isLoading,
    } = useInfiniteQuery({
        queryKey: ["lps", order],
        queryFn: fetchLPs,
        getNextPageParam: (lastPage) =>
          lastPage.hasNext ? lastPage.nextCursor : undefined,
        initialPageParam: 0,
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

    useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
              fetchNextPage();
            }
          },
          { threshold: 1 }
        );
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => {
          if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [bottomRef, hasNextPage, isFetchingNextPage]);
    
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 px-6">
                {Array.from({ length: 5 }).map((_, i) => (
                <SkeletonCard key={i} />
                ))}
            </div>
        );
    }
    
    if (status === "error") {
        return <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>;
    }

    return (
        <div className="bg-black pt-20 min-h-screen py-6 px-4">
            <div className="max-w-screen-2xl mx-auto px-6">
                <div className="flex justify-end mb-4 gap-2">
                    {["asc", "desc"].map((o) => (
                        <button
                        key={o}
                        onClick={() => setOrder(o)}
                        className={`px-3 py-1 text-sm rounded border ${
                            order === o
                            ? "bg-red-500 text-white border-red-500"
                            : "text-red-500 border-red-500"
                        }`}
                        >
                        {o === "asc" ? "오래된 순" : "최신 순"}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {data?.pages.map((page) =>
                        page.data.map((lp: LP) => (
                        <LPCard key={lp.id} lp={lp} onClick={() => handleCardClick(lp.id)} />
                        ))
                    )}
                    {isFetchingNextPage &&
                        Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
                <div ref={bottomRef} className="h-12" />
            </div>
        </div>
    );
};

export default HomePage;