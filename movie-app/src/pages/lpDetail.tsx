import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import api from "../api/axiosInstance";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

dayjs.extend(relativeTime);

interface Tag {
    id: number;
    name: string;
}

interface Like {
    id: number;
    userId: number;
    lpId: number;
}

interface Author {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
    bio: string | null;
    createdAt: string;
    updatedAt: string;
}

interface LPDetail {
    id: number;
    title: string;
    content: string;
    thumbnail: string;
    createdAt: string;
    tags: Tag[];
    likes: Like[];
    author: Author;
}

interface Comment {
    id: number;
    content: string;
    lpId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    author: {
        id: number;
        name: string;
        email: string;
        bio: string | null;
        avatar: string | null;
        createdAt: string;
        updatedAt: string;
    };
}

const fetchLPDetail = async (id: string): Promise<LPDetail> => {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/v1/lps/${id}`);
    return res.data.data;
};

const fetchComments = async ({
    pageParam = 0,
    lpId,
    order,
}: {
    pageParam?: number;
    lpId: string;
    order: string;
}) => {
    const res = await api.get(`/v1/lps/${lpId}/comments`, {
        params: {
            cursor: pageParam,
            limit: 10,
            order,
        },
    });
  
    await new Promise((res) => setTimeout(res, 500)); // 로딩 연출용
    return res.data.data;
};

const LPDetail = () => {
    const [commentOrder, setCommentOrder] = useState("desc");
    const { lpId } = useParams<{ lpId: string }>();
    const observerRef = useRef<HTMLDivElement | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lpDetail", lpId],
        queryFn: () => fetchLPDetail(lpId!),
        enabled: !!lpId,
    });

    const {
        data: commentPages,
        fetchNextPage,
        hasNextPage,
        isLoading: isCommentsLoading,
    } = useInfiniteQuery({
        queryKey: ["comments", lpId, commentOrder],
        queryFn: ({ pageParam = 0 }) => fetchComments({ lpId: lpId!, pageParam, order: commentOrder }),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
        enabled: !!lpId,
    });
    
    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return;
    
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) fetchNextPage();
          },
          { threshold: 1.0 }
        );
    
        observer.observe(observerRef.current);
    
        return () => {
          if (observerRef.current) observer.unobserve(observerRef.current);
        };
    }, [fetchNextPage, hasNextPage]);
    
    if (isLoading) return <div className="text-white">로딩 중...</div>;
    if (isError || !data) return <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>;

    return (
        <div className="bg-black min-h-screen py-10 px-4 text-white">
            <div className="max-w-3xl mx-auto">
                {/* 사용자 정보 */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <img
                            src={data.author.avatar ?? "/default-avatar.png"}
                            alt="avatar"
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-semibold">{data.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-400">
                        {dayjs(data.createdAt).fromNow()}
                    </span>
                </div>

                {/* 제목 + 수정/삭제 버튼 */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{data.title}</h1>
                    <div className="flex gap-3 text-gray-400">
                        <button
                            className="hover:text-red-500 transition"
                            onClick={() => console.log("수정 클릭")}
                            aria-label="수정"
                        >
                            <FiEdit size={20} />
                        </button>
                        <button
                            className="hover:text-red-500 transition"
                            onClick={() => console.log("삭제 클릭")}
                            aria-label="삭제"
                        >
                            <FiTrash2 size={20} />
                        </button>
                    </div>
                </div>

                {/* 썸네일 LP 모양 */}
                <div className="flex justify-center mb-8">
                    <div className="w-96 h-96 rounded-full border-4 border-gray-800 overflow-hidden animate-spin-slow">
                        <img
                        src={data.thumbnail}
                        alt={data.title}
                        className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* 소개글 */}
                <p className="text-center text-gray-300 mb-6 whitespace-pre-wrap">{data.content}</p>

                {/* 태그 */}
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {data.tags.map(tag => (
                        <span
                        key={tag.id}
                        className="px-3 py-1 rounded-full bg-gray-700 text-xs"
                        >
                        #{tag.name}
                        </span>
                    ))}
                </div>

                {/* 좋아요 */}
                <div className="flex justify-center text-red-500 text-xl mb-6">
                    ♥ {data.likes.length}
                </div>

                {/* 댓글 입력창 및 정렬 */}
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            placeholder="댓글을 입력해주세요"
                            className="bg-gray-800 text-white p-2 rounded w-full mr-4"
                        />
                        <button className="bg-red-500 text-white px-4 py-2 rounded text-sm whitespace-nowrap">작성</button>
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            className={`px-3 py-1 text-sm rounded border ${
                                commentOrder === "asc" ? "bg-red-500 text-white border-red-500" : "text-red-500 border-red-500"
                            }`}
                            onClick={() => setCommentOrder("asc")}
                        >
                            오래된 순
                        </button>
                        <button
                            className={`px-3 py-1 text-sm rounded border ${
                                commentOrder === "desc" ? "bg-red-500 text-white border-red-500" : "text-red-500 border-red-500"
                            }`}
                            onClick={() => setCommentOrder("desc")}
                        >
                            최신 순
                        </button>
                    </div>
                </div>

                {/* 댓글 목록 */}
                <div className="space-y-4 bg-gray-900 p-4 rounded-lg">
                    {isCommentsLoading
                        ? Array.from({ length: 10 }).map((_, i) => (
                            <div key={i} className="flex gap-3 animate-pulse items-center">
                                <div className="w-10 h-10 rounded-full bg-gray-700" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 bg-gray-700 rounded w-1/4"></div>
                                    <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                                </div>
                            </div>
                        ))
                        : commentPages?.pages.flatMap((page) =>
                            page.data.map((comment: Comment) => (
                                <div key={comment.id} className="flex gap-3 items-start">
                                    <img
                                        src={comment.author.avatar ?? "/default-avatar.png"}
                                        alt="avatar"
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <div className="font-semibold">{comment.author.name}</div>
                                        <div className="text-sm text-gray-300">{comment.content}</div>
                                    </div>
                                </div>
                            ))
                        )}
                </div>

                {/* 무한스크롤 트리거 */}
                <div ref={observerRef} className="h-10" />
            </div>
        </div>
    );
};

export default LPDetail;
