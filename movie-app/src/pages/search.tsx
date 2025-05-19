import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useDebounce } from "../hooks/useDebounce";
import SkeletonCard from "../components/skeletonCard";
import LPCard from "../components/lpCard";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

interface LP {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    tags: { name: string }[];
    likes: { id: number }[];
}

type SearchFilter = "all" | "title" | "tag";

const filterLabels: Record<SearchFilter, string> = {
  all: "전체",
  title: "제목",
  tag: "태그",
};

const fetchSearchLPs = async ({ pageParam = 0, queryKey }: any) => {
    const [, search, order] = queryKey;
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/v1/lps`, {
        params: {
            cursor: pageParam,
            limit: 5,
            order,
            search,
        },
    });
    return res.data.data;
};

const SearchPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
    const [order, setOrder] = useState<"asc" | "desc">("desc");
    const [filter, setFilter] = useState<SearchFilter>("all");
    const debouncedSearch = useDebounce(searchTerm, 500);
    const bottomRef = useRef<HTMLDivElement | null>(null);
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        status,
        refetch,
    } = useInfiniteQuery({
        queryKey: ["search", debouncedSearch, order],
        queryFn: fetchSearchLPs,
        enabled: !!debouncedSearch.trim(),
        getNextPageParam: (lastPage) =>
            lastPage.hasNext ? lastPage.nextCursor : undefined,
        initialPageParam: 0,
    });

    useEffect(() => {
        const saved = localStorage.getItem("recentKeywords");
        if (saved) setRecentKeywords(JSON.parse(saved));
    }, []);

    const addRecentSearch = (keyword: string) => {
        const updated = [keyword, ...recentKeywords.filter(k => k !== keyword)].slice(0, 5);
        setRecentKeywords(updated);
        localStorage.setItem("recentKeywords", JSON.stringify(updated));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addRecentSearch(searchTerm);
        refetch();
    };

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        }, { threshold: 1 });
        if (bottomRef.current) observer.observe(bottomRef.current);
        return () => {
            if (bottomRef.current) observer.unobserve(bottomRef.current);
        };
    }, [bottomRef, hasNextPage, isFetchingNextPage]);

    useEffect(() => {
        console.log("Debounced search:", debouncedSearch);
    }, [debouncedSearch]);

    const dropdownRef = useRef<HTMLDivElement>(null);
        useEffect(() => {
            function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setFilterDropdownOpen(false);
            }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredLPs = data?.pages.flatMap(page =>
        page.data.filter((lp: LP) => {
            const titleMatch = lp.title.includes(debouncedSearch);
            const tagMatch = lp.tags.some(tag => tag.name.includes(debouncedSearch));

            if (filter === "title") return titleMatch;
            if (filter === "tag") return tagMatch;
            return titleMatch || tagMatch;
        })
    );

    return (
        <div className="bg-black pt-20 min-h-screen py-6 px-4">
            <div className="max-w-screen-2xl mx-auto px-6">
                <form onSubmit={handleSubmit} className="flex items-center gap-3 mb-6">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="검색어를 입력하세요"
                        className="bg-transparent border-b border-red-500 text-white px-2 py-1 focus:outline-none flex-grow min-w-0"
                    />
                    <button
                        type="submit"
                        className="h-9 px-4 text-sm border border-red-500 text-red-500 rounded bg-transparent hover:bg-red-500 hover:text-white transition leading-none"
                    >
                        검색
                    </button>
                </form>

                <div className="mb-4 text-sm text-white">
                    <p className="mb-1">최근 검색어:</p>
                    <div className="flex gap-2 flex-wrap">
                        {recentKeywords.map((k) => (
                            <button
                                key={k}
                                onClick={() => {
                                    setSearchTerm(k);
                                    addRecentSearch(k);
                                }}
                                className="border border-gray-700 px-2 py-1 rounded text-xs"
                            >
                                {k}
                            </button>
                        ))}
                    </div>
                </div>
                
                <div className="flex justify-between items-center mb-6 text-sm text-white">
                    {/* 왼쪽: 필터 */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                            className="flex items-center gap-1 border border-red-500 px-3 py-1 rounded text-red-500 bg-transparent hover:bg-red-500 hover:text-white transition"
                        >
                            필터: {filterLabels[filter]}
                            {filterDropdownOpen ? <FiChevronUp /> : <FiChevronDown />}
                        </button>

                        {filterDropdownOpen && (
                            <ul className="absolute left-0 mt-1 w-28 bg-black border border-red-500 rounded shadow-lg z-10">
                                {(Object.keys(filterLabels) as SearchFilter[]).map((f) => (
                                    <li key={f}>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFilter(f);
                                                setFilterDropdownOpen(false);
                                            }}
                                            className={`block w-full text-left px-3 py-1 text-sm ${
                                                filter === f ? "bg-red-500 text-white" : "text-red-500 hover:bg-red-700"
                                            }`}
                                        >
                                            {filterLabels[f]}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* 오른쪽: 정렬 */}
                    <div className="flex gap-2">
                        {(["asc", "desc"] as const).map((o) => (
                            <button
                                key={o}
                                onClick={() => setOrder(o)}
                                className={`px-2 py-1 border rounded ${
                                    order === o
                                        ? "border-red-500 text-white bg-red-500"
                                        : "border-red-500 text-red-500"
                                }`}
                            >
                                {o === "asc" ? "오래된순" : "최신순"}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                ) : status === "error" ? (
                    <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {filteredLPs?.map((lp) => (
                                <LPCard
                                    key={lp.id}
                                    lp={lp}
                                    onClick={() => navigate(`/lp/${lp.id}`)}
                                />
                            ))}
                            {isFetchingNextPage &&
                                Array.from({ length: 3 }).map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                        </div>
                        <div ref={bottomRef} className="h-12" />
                    </>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
