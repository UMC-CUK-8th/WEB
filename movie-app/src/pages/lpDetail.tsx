import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiEdit, FiTrash2 } from "react-icons/fi";

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

const fetchLPDetail = async (id: string): Promise<LPDetail> => {
    const res = await axios.get(`${import.meta.env.VITE_BE_URL}/v1/lps/${id}`);
    return res.data.data;
};

const LPDetail = () => {
    const { lpId } = useParams<{ lpId: string }>();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["lpDetail", lpId],
        queryFn: () => fetchLPDetail(lpId!),
        enabled: !!lpId,
    });

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
            <div className="flex justify-center text-red-500 text-xl">
            ♥ {data.likes.length}
            </div>
        </div>
        </div>
    );
};

export default LPDetail;
