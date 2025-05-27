import { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  disabled?: boolean;
}

const TagInput = ({ tags, setTags, disabled }: TagInputProps) => {
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="w-full mb-4">
      <div className="flex mb-2">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          disabled={disabled}
          className="flex-1 p-3 rounded-lg bg-gray text-white border-2 border-[#434343]"
          placeholder="LP Tag"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
        />
        <button
          type="button"
          onClick={handleAddTag}
          disabled={!tagInput.trim() || disabled}
          className={`ml-2 px-6 text-white rounded-lg ${
            tagInput.trim() ? "bg-pink-500" : "bg-gray-500"
          }`}
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-pink-900 text-white px-3 py-1 rounded-full text-sm cursor-pointer"
            onClick={() => handleRemoveTag(tag)}
          >
            #{tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TagInput;