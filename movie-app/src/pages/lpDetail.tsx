import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import api from "../api/axiosInstance";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { postComment } from "../api/postComment";
import { updateComment, deleteComment } from "../api/comment";
import { likeLP, unlikeLP } from "../api/like";

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
    const { lpId } = useParams<{ lpId: string }>();
    const queryClient = useQueryClient();
    const observerRef = useRef<HTMLDivElement | null>(null);
    const rawUserId = localStorage.getItem("userId");
    const userId = rawUserId ? Number(rawUserId) : null;

    const [commentInput, setCommentInput] = useState("");
    const [commentOrder, setCommentOrder] = useState("desc");
    const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editingContent, setEditingContent] = useState("");

    const [isEditingLP, setIsEditingLP] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editContent, setEditContent] = useState("");
    const [editThumbnail, setEditThumbnail] = useState<string | File>("");
    const [editTags, setEditTags] = useState<string[]>([]);
    const [newTagInput, setNewTagInput] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showTagInput, setShowTagInput] = useState(false);

    const [isLiked, setIsLiked] = useState(false);

    const { data, isLoading, isError } = useQuery<LPDetail>({
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

    const postCommentMutation = useMutation({
        mutationFn: ({ lpId, content }: { lpId: string; content: string }) =>
        postComment({ lpId, content }),
        onSuccess: () => {
        setCommentInput("");
        queryClient.invalidateQueries({ queryKey: ["comments", lpId, commentOrder] });
        },
    });
    
    const updateCommentMutation = useMutation({
        mutationFn: ({ lpId, commentId, content }: { lpId: string; commentId: number; content: string }) =>
            updateComment({ lpId, commentId, content }),
        onSuccess: () => {
            setEditingCommentId(null);
            queryClient.invalidateQueries({ queryKey: ["comments", lpId, commentOrder] });
        },
    });

    const deleteCommentMutation = useMutation({
        mutationFn: ({ lpId, commentId }: { lpId: string; commentId: number }) =>
            deleteComment({ lpId, commentId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["comments", lpId, commentOrder] });
        },
    });
    
    const handleStartEdit = () => {
        if (!data) return;
        setEditTitle(data.title);
        setEditContent(data.content);
        setEditThumbnail(data.thumbnail);
        setEditTags(data.tags.map((tag) => tag.name));
        setIsEditingLP(true);
    };

    const handleAddTag = () => {
        if (newTagInput.trim() && !editTags.includes(newTagInput.trim())) {
        setEditTags([...editTags, newTagInput.trim()]);
        setNewTagInput("");
        }
    };

    const handleThumbnailUpload = async (file: File): Promise<string> => {
        const formData = new FormData();
        formData.append("file", file);

        const res = await api.post("/v1/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return res.data.data.imageUrl; // LP 등록/수정 시 이 URL 사용
    };

    const handleSaveEditLP = async () => {
        try {
            let uploadedThumbnailUrl = editThumbnail;

            // 새로 업로드한 이미지가 File 객체인 경우
            if (editThumbnail instanceof File) {
                uploadedThumbnailUrl = await handleThumbnailUpload(editThumbnail);
            }

            await api.patch(`/v1/lps/${lpId}`, {
                title: editTitle,
                content: editContent,
                thumbnail: uploadedThumbnailUrl,
                tags: editTags,
            });

            alert("수정 완료!");
            setIsEditingLP(false);
            queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
        } catch (err) {
            alert("수정 실패!");
            console.error("LP 수정 에러:", err);
        }
    };

    const handleDeleteLP = async () => {
        try {
            await api.delete(`/v1/lps/${lpId}`);
            alert("삭제 완료!");
            window.location.href = "/";
        } catch (err: any) {
            console.error("삭제 실패 응답:", err?.response?.data); // 상세 응답 보기
            alert("삭제 실패: 서버 오류");
        }
    };

    const toggleLike = async () => {
        if (!lpId) return;
        try {
            if (isLiked) {
            await unlikeLP(lpId);
            } else {
            await likeLP(lpId);
            }
            queryClient.invalidateQueries({ queryKey: ["lpDetail", lpId] });
        } catch (err) {
            alert("좋아요 처리 중 오류가 발생했습니다.");
        }
    };

    useEffect(() => {
        if (!observerRef.current || !hasNextPage) return;
        const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) fetchNextPage();
        });
        observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage]);
    
    useEffect(() => {
        if (data && userId) {
            setIsLiked(data.likes.some((like) => like.userId === userId));
        }
    }, [data, userId]);

    if (isLoading) return <div className="text-white">로딩 중...</div>;
    if (isError || !data) return <div className="text-red-500">데이터를 불러오는 데 실패했습니다.</div>;

    const isMyLP = userId === data.author.id;

    return (
        <div className="bg-black min-h-screen pt-20 px-4 text-white">
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
                    {isEditingLP ? (
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            className="text-2xl font-bold bg-transparent border-b border-gray-600 focus:outline-none focus:border-red-500 w-full"
                        />
                    ) : (
                        <h1 className="text-2xl font-bold">{data.title}</h1>
                    )}
                    {isMyLP && !isEditingLP && (
                        <div className="flex gap-3 text-gray-400">
                            <button onClick={handleStartEdit} className="hover:text-red-500 transition" aria-label="수정">
                                <FiEdit size={20} />
                            </button>
                            <button onClick={() => setShowDeleteModal(true)} className="hover:text-red-500 transition" aria-label="삭제">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
                    )}
                </div>

                {/* 썸네일 LP 모양 */}
                {isEditingLP ? (
                    <div className="flex justify-center mb-8 relative">
                        <input
                            type="file"
                            accept="image/*"
                            id="thumbnail-upload"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    setEditThumbnail(file);
                                }
                            }}
                        />
                        <label htmlFor="thumbnail-upload" className="cursor-pointer">
                            <div className="w-96 h-96 rounded-full border-4 border-gray-800 overflow-hidden hover:opacity-80 transition">
                                <img
                                    src={
                                        typeof editThumbnail === "string"
                                        ? editThumbnail
                                        : URL.createObjectURL(editThumbnail)
                                    }
                                    alt="LP Thumbnail"
                                    className="w-full h-full object-cover"
                                    style={{ animation: "spin 10s linear infinite" }}
                                />
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="flex justify-center mb-8">
                        <div className="w-96 h-96 rounded-full border-4 border-gray-800 overflow-hidden animate-spin-slow">
                            <img
                                src={data.thumbnail}
                                alt={data.title}
                                className="w-full h-full object-cover"
                                style={{ animation: "spin 10s linear infinite" }}
                            />
                        </div>
                    </div>
                )}

                {/* 소개글 */}
                {isEditingLP ? (
                    <div className="mb-6 space-y-3">
                        <textarea
                            className="w-full p-2 rounded bg-gray-800 text-white"
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            rows={5}
                        />
                        <div className="flex gap-2">
                            <button onClick={handleSaveEditLP} className="bg-red-500 px-3 py-1 rounded text-sm">저장</button>
                            <button onClick={() => setIsEditingLP(false)} className="bg-gray-700 px-3 py-1 rounded text-sm">취소</button>
                        </div>
                    </div>
                ) : (
                    <>
                        <p className="text-center text-gray-300 mb-6 whitespace-pre-wrap">{data.content}</p>
                    </>
                )}

                {/* 태그 */}
                {isEditingLP ? (
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {editTags.map((tag, idx) => (
                            <div key={idx} className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-xs text-white">
                                #{tag}
                                <button
                                    onClick={() =>
                                        setEditTags(editTags.filter((_, i) => i !== idx))
                                    }
                                    className="ml-2 text-red-400 hover:text-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}

                        {showTagInput && (
                            <input
                                type="text"
                                value={newTagInput}
                                autoFocus
                                onChange={(e) => setNewTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddTag();
                                    setShowTagInput(false);
                                } else if (e.key === "Escape") {
                                    setShowTagInput(false);
                                    setNewTagInput("");
                                }
                                }}
                                className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full outline-none w-24"
                                placeholder="새 태그"
                            />
                        )}

                        <button
                            onClick={() => setShowTagInput(true)}
                            className="w-7 h-7 rounded-full bg-gray-600 text-white text-sm flex items-center justify-center hover:bg-gray-500 transition"
                        >
                            +
                        </button>
                    </div>
                ) : (
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
                )}

                {/* 좋아요 */}
                <div className="flex justify-center text-xl mb-6">
                    <button onClick={toggleLike}>
                        <span className={isLiked ? "text-red-500" : "text-gray-500"}>♥</span> {data.likes.length}
                    </button>
                </div>

                {/* 댓글 입력창 및 정렬 */}
                <div className="bg-gray-900 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-4">
                        <input
                            type="text"
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                            placeholder="댓글을 입력해주세요"
                            className="bg-gray-800 text-white p-2 rounded w-full mr-4"
                        />
                        <button 
                            onClick={() => 
                                postCommentMutation.mutate({ lpId: lpId!, content: commentInput })
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
                        >
                            작성
                        </button>
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
                            page.data.map((comment: Comment) => {
                                console.log("내 userId:", userId, "댓글 작성자:", comment.author.id);
                                return (
                                    <div key={comment.id} className="flex gap-3 items-start relative">
                                        <img
                                            src={comment.author.avatar ?? "/default-avatar.png"}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="font-semibold flex items-center justify-between">
                                            <span>{comment.author.name}</span>

                                            {comment.author.id === userId && (
                                                <div className="relative">
                                                <button
                                                    onClick={() => setOpenDropdownId(comment.id)}
                                                    className="text-gray-400 hover:text-white"
                                                >
                                                    ⋮
                                                </button>

                                                {openDropdownId === comment.id && (
                                                    <div className="absolute right-0 top-6 bg-gray-800 border border-gray-700 rounded text-sm shadow-md z-10 flex flex-col">
                                                        <button
                                                            onClick={() => {
                                                            setEditingCommentId(comment.id);
                                                            setEditingContent(comment.content);
                                                            setOpenDropdownId(null);
                                                            }}
                                                            className="px-4 py-2 hover:bg-gray-700 flex gap-2 items-center"
                                                        >
                                                            <FiEdit size={15}/>
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                            deleteCommentMutation.mutate({
                                                                lpId: lpId!,
                                                                commentId: comment.id,
                                                            });
                                                            }}
                                                            className="px-4 py-2 hover:bg-gray-700 text-red-500 flex gap-2 items-center"
                                                        >
                                                            <FiTrash2 size={15}/>
                                                        </button>
                                                    </div>
                                                )}
                                                </div>
                                            )}
                                            </div>

                                            {editingCommentId === comment.id ? (
                                                <div className="mt-2">
                                                    <textarea
                                                        value={editingContent}
                                                        onChange={(e) => setEditingContent(e.target.value)}
                                                        className="w-full p-2 bg-gray-800 text-white rounded"
                                                    />
                                                    <div className="flex gap-2 mt-2">
                                                        <button
                                                            className="px-3 py-1 bg-red-500 rounded text-white text-sm"
                                                            onClick={() =>
                                                            updateCommentMutation.mutate({
                                                                lpId: lpId!,
                                                                commentId: comment.id,
                                                                content: editingContent,
                                                            })
                                                            }
                                                        >
                                                            저장
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 bg-gray-600 rounded text-sm"
                                                            onClick={() => setEditingCommentId(null)}
                                                        >
                                                            취소
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="text-sm text-gray-300">{comment.content}</div>
                                            )}
                                        </div>
                                    </div>
                                )
                            }
                        ))
                    }
                </div>

                {/* 무한스크롤 트리거 */}
                <div ref={observerRef} className="h-10" />

                {/* 삭제 모달 */ }
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
                        <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
                            <p className="text-white mb-4">정말 삭제하시겠습니까?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={handleDeleteLP}
                                    className="bg-red-500 px-4 py-2 rounded text-white"
                                >
                                    확인
                                </button>
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-600 px-4 py-2 rounded text-white"
                                >
                                    취소
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LPDetail;
