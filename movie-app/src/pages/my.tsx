import { useEffect, useState, useRef } from "react";
import api from "../api/axiosInstance";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FiTrash2, FiEdit } from "react-icons/fi";
import defaultImage from "../assets/icon/defaultImage.png";

interface User {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
}

const fetchMe = async (): Promise<User> => {
    const res = await api.get("/v1/users/me");
    localStorage.setItem("userId", String(res.data.data.id));
    return res.data.data;
};

const MyPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [avatar, setAvatar] = useState<string | null>(null);
    const [_email, setEmail] = useState("");

    const [showAvatarMenu, setShowAvatarMenu] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const avatarMenuRef = useRef<HTMLDivElement>(null);
    const queryClient = useQueryClient();

    const uploadImage = async (base64: string): Promise<string> => {
        const blob = await (await fetch(base64)).blob();
        const formData = new FormData();
        formData.append("file", blob, "profile.jpg");

        const res = await api.post("/v1/uploads", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data.data.imageUrl;
    };

    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["userProfile"],
        queryFn: fetchMe,
        enabled: true,
    });

    const mutation = useMutation({
        mutationFn: (body: { name: string; bio: string; avatar: string | null }) =>
            api.patch("/v1/users", body),

        // Optimistic update
        onMutate: async (newData) => {
            await queryClient.cancelQueries({ queryKey: ["userProfile"] });

            const previousUser = queryClient.getQueryData<User>(["userProfile"]);

            queryClient.setQueryData<User>(["userProfile"], (old) => {
                if (!old) return old;
                return {
                    ...old,
                    name: newData.name,
                    bio: newData.bio,
                    avatar: newData.avatar,
                };
            });

            return { previousUser };
        },

        onError: (_err, _variables, context) => {
            if (context?.previousUser) {
            queryClient.setQueryData(["userProfile"], context.previousUser);
            }
            alert("업데이트 실패: 서버 오류");
        },

        onSuccess: () => {
            alert("프로필이 수정되었습니다.");
            setIsEditing(false);
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["userProfile"] });
        },
    });

    const handleAvatarClick = () => {
        if (!isEditing) return;
        setShowAvatarMenu(!showAvatarMenu);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => {
            if (typeof reader.result === "string") {
                setAvatar(reader.result);
            }
        };
        reader.readAsDataURL(file);

        e.target.value = "";
    };

    const handleUpdateProfile = async () => {
        if (!name.trim()) {
        alert("닉네임은 필수입니다.");
        return;
        }
        
        try {
            let avatarUrl = avatar;

            if (avatar?.startsWith("data:image")) {
            avatarUrl = await uploadImage(avatar);
            }

            mutation.mutate({ name, bio, avatar: avatarUrl });
        } catch (err) {
            console.error("업로드 실패:", err);
            alert("이미지 업로드에 실패했습니다.");
        }
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
            avatarMenuRef.current &&
            !avatarMenuRef.current.contains(e.target as Node)
            ) {
            setShowAvatarMenu(false);
            }
        };

        if (showAvatarMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showAvatarMenu]);

    if (isLoading) return <div>로딩 중...</div>;
    if (isError || !user) return <div>에러 발생</div>;

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                        <img
                            src={isEditing ? avatar ?? defaultImage : user.avatar ?? defaultImage}
                            alt="avatar"
                            className="w-24 h-24 rounded-full object-cover border-2 border-red-700 cursor-pointer"
                            onClick={handleAvatarClick}
                        />
                        {showAvatarMenu && (
                            <div 
                                ref={avatarMenuRef} 
                                className="absolute bottom-full left-1/2 -translate-x-1/2 mt-2 bg-gray-800 border border-gray-700 rounded shadow z-10"
                            >
                                <div className="flex flex-row items-center justify-center space-x-2 px-2 py-1">
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="text-sm px-2 py-1 rounded hover:text-red-600"
                                    >
                                        <FiEdit/>
                                    </button>
                                    {avatar && (
                                        <button
                                            onClick={() => setAvatar(null)}
                                            className="text-sm block px-2 py-1 rounded hover:text-gray-700 text-red-600"
                                        >
                                            <FiTrash2/>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                        />
                    </div>

                    {/* 프로필 정보 */}
                    {isEditing ? (
                        <div className="w-full max-w-sm space-y-2">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="닉네임"
                            className="w-full bg-transparent text-lg text-white font-semibold px-4 py-2 text-center"
                        />
                        <input
                            type="text"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="자기소개"
                            className="w-full bg-transparent text-sm text-white/60 px-4 py-2 text-center"
                        />
                        <p className="text-sm text-white/40 text-center">{user.email}</p>
                        <div className="flex gap-2 justify-center mt-2">
                            <button
                            onClick={handleUpdateProfile}
                            className="mt-3 border border-white px-4 py-1 rounded text-sm"
                            >
                            저장
                            </button>
                            <button
                            onClick={() => setIsEditing(false)}
                            className="mt-3 border border-white px-4 py-1 rounded text-sm"
                            >
                            취소
                            </button>
                        </div>
                        </div>
                    ) : (
                        <>
                            <p className="text-lg font-semibold">{user.name}</p>
                            <p className="text-sm text-white/60">{user.bio || "소개 없음"}</p>
                            <p className="text-sm text-white/40">{user.email}</p>
                            <button
                                onClick={() => {
                                setName(user.name);
                                setBio(user.bio || "");
                                setEmail(user.email);
                                setAvatar(user.avatar);
                                setIsEditing(true);
                                }}
                                className="mt-3 border border-white px-4 py-1 rounded text-sm"
                            >
                                프로필 수정
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyPage;