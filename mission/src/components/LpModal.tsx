import { useState, useRef } from "react";
import useAddLp from "../hooks/mutations/useAddLp";
import { FiX } from "react-icons/fi";
import LpImg from "../assets/lp.png";
import { addImg } from "../apis/lp"; 

interface LpModalProps {
  onClose: () => void;
}

const LpModal = ({ onClose }: LpModalProps) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImg, setPreviewImg] = useState<string>(LpImg);
  const [thumbnail, setThumbnail] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { mutate: createLpMutate } = useAddLp();

  const handleImageClick = () => {
    inputRef.current?.click();
  };

  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImg(reader.result);
      }
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const imageUrl = await addImg(formData);
      setThumbnail(imageUrl);
    } catch (error) {
      alert("이미지 업로드에 실패했습니다.");
      console.error(error);
    }
  };

  const addTag = () => {
    if (!tag.trim()) return;
    if (tags.includes(tag.trim())) return;
    setTags((prev) => [...prev, tag.trim()]);
    setTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddLp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createLpMutate({
      title,
      content,
      thumbnail, 
      tags,
      published: true,
    });
    onClose(); 
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <form
        className="bg-[#1a1a1a] text-white p-6 rounded-xl w-96 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-white text-xl"
          aria-label="Close modal"
        >
          <FiX />
        </button>

        <div
          className="flex justify-center mb-4 cursor-pointer"
          onClick={handleImageClick}
        >
          <img
            src={previewImg}
            alt="LP"
            className="w-40 h-40 object-cover rounded"
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleImgChange}
          />
        </div>

        <input
          type="text"
          placeholder="제목"
          className="w-full p-2 rounded bg-black border mb-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="설명"
          className="w-full p-2 rounded bg-black border mb-2"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        <div className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder="태그"
            className="flex-1 p-2 rounded bg-black border"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTag();
              }
            }}
          />
          <button
            type="button"
            onClick={addTag}
            disabled={!tag.trim()}
            className={`px-3 rounded text-white ${
              tag.trim()
                ? "bg-purple-400 hover:bg-purple-500"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white text-black px-2 py-1 rounded text-sm flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-red-600 text-xs"
                aria-label={`Remove tag ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          type="submit"
          disabled={!title.trim() || !content.trim() || !thumbnail}
          className={`w-full py-2 rounded mt-4 ${
            !title.trim() || !content.trim() || !thumbnail
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-purple-400 hover:bg-purple-500"
          }`}
          onClick={handleAddLp}
        >
          Add LP
        </button>
      </form>
    </div>
  );
};

export default LpModal;
