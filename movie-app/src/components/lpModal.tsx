import { useEffect, useRef, useState } from "react";
import LPImage from '../assets/icon/LP.jpeg';
import { useMutation } from "@tanstack/react-query";
import { createLp } from "../api/createLP";
import { uploadImage } from "../api/uploadImage";

type Props = {
    onClose: () => void;
};

export const LPModal = ({ onClose }: Props) => {
    const [lpName, setLpName] = useState("");
    const [lpContent, setLpContent] = useState("");
    const [lpTag, setLpTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handelOutsideClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handelOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handelOutsideClick);
        };
    }, [onClose]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;
        setFile(selectedFile);
      
        const reader = new FileReader();
        reader.onloadend = () => {
          setImage(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleAddTag = () => {
        if (lpTag.trim() && !tags.includes(lpTag)) {
          setTags([...tags, lpTag.trim()]);
          setLpTag("");
        }
    };
    
    const handleRemoveTag = (tag: string) => {
        setTags(tags.filter((t) => t !== tag));
    };
    
    const isFormValid = lpName && lpContent && image;

    const mutation = useMutation({
        mutationFn: async () => {
          if (!file) throw new Error("이미지가 선택되지 않았습니다.");
      
          const imageUrl = await uploadImage(file); // 이미지 먼저 업로드
      
          return createLp(
            {
              title: lpName,
              content: lpContent,
              thumbnail: imageUrl,
              tags,
              published: true,
            },
          );
        },
        onSuccess: () => {
          alert("LP 생성 완료!");
          onClose();
        },
        onError: (err) => {
          console.error("LP 생성 실패", err);
          alert("LP 생성에 실패했습니다.");
        },
    });
      
      
    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div
                ref={modalRef}
                className="bg-gray-900 text-white p-6 rounded-xl w-[90%] max-w-md relative"
            >
                <button
                    className="absolute top-4 right-4 text-white text-xl"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* 이미지 표시 영역 */}
                <div className="relative w-full h-40 mx-auto my-4 flex justify-center items-center">
                    {!image && (
                        <img
                        src={LPImage}
                        alt="LP only"
                        className="w-40 h-40 object-cover"
                        />
                    )}

                    {image && (
                        <div className="relative w-60 h-40">
                        <img
                            src={image}
                            alt="User Upload"
                            className="absolute z-10 w-40 h-40 object-cover left-0"
                        />
                        <img
                            src={LPImage}
                            alt="LP"
                            className="absolute z-0 w-35 h-35 right-0 top-1/2 -translate-y-1/2"
                        />
                        </div>
                    )}

                    {/* 투명 파일 업로드 영역 */}
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                        onChange={handleImageChange}
                    />
                </div>

                {/* 입력 필드 */}
                <input
                    placeholder="LP Name"
                    value={lpName}
                    onChange={(e) => setLpName(e.target.value)}
                    className="w-full mt-4 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                />
                <input
                    placeholder="LP Content"
                    value={lpContent}
                    onChange={(e) => setLpContent(e.target.value)}
                    className="w-full mt-2 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                />

                {/* 태그 추가 */}
                <div className="flex items-center mt-2">
                    <input
                        placeholder="LP Tag"
                        value={lpTag}
                        onChange={(e) => setLpTag(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleAddTag()}
                        className="flex-1 p-2 rounded bg-gray-800 text-white placeholder-gray-400"
                    />
                    <button
                        className="ml-2 px-4 py-2 bg-red-600 rounded"
                        onClick={handleAddTag}
                    >
                        Add
                    </button>
                </div>

                {/* 태그 리스트 */}
                <div className="flex flex-wrap mt-2 gap-2">
                    {tags.map((tag) => (
                        <div key={tag} className="flex items-center text-red-600 bg-gray-700 rounded-full px-3 py-1">
                            <span>{tag}</span>
                            <button
                                className="ml-2 text-sm text-red-600"
                                onClick={() => handleRemoveTag(tag)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                </div>

                {/* LP 추가 버튼 */}
                <button
                    disabled={!isFormValid}
                    onClick={() => mutation.mutate()}
                    className={`w-full mt-4 py-2 rounded ${
                        isFormValid
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-gray-700 cursor-not-allowed"
                    }`}
                >
                    Add LP
                </button>
            </div>
        </div>
    );
};
