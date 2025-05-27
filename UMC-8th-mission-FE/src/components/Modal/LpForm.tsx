import { useEffect, useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import TagInput from "./TagInput";
import type { CreateLpRequest } from "../../types/lp";

interface LpFormProps {
  onSubmit: (data: CreateLpRequest & { file: File }) => void;
  isLoading: boolean;
}

const LpForm = ({ onSubmit, isLoading }: LpFormProps) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateLpRequest>({
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "", // 서버에는 file 객체로 보내므로 사용 안 함
      tags: [],
      published: true,
    },
  });

  // 선택된 파일과 미리보기 URL 상태 관리
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 컴포넌트 언마운트 또는 previewUrl 변경 시 blob URL 해제 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      if (previewUrl && previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // 파일 선택 시 처리: blob URL 생성하여 미리보기용으로만 사용
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 기존 blob URL 해제
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      const url = URL.createObjectURL(file);
      setSelectedFile(file);
      setPreviewUrl(url);
    }
  };

  const onRecordImageClick = () => {
    fileInputRef.current?.click();
  };

  // 폼 제출 시 File 객체만 서버에 넘김 (blob URL은 포함하지 않음)
  const handleFormSubmit = (data: CreateLpRequest) => {
    if (!selectedFile) {
      alert("이미지를 선택해주세요.");
      return;
    }
    onSubmit({ ...data, file: selectedFile });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="w-full flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: "none" }}
        disabled={isLoading}
      />

      <div
        onClick={onRecordImageClick}
        className="relative cursor-pointer mt-4 mb-4 w-64 h-64"
      >
        {/* 기본 이미지 */}
        <img
          src="/public/images/LpImage.png"
          alt="Default"
          className={`absolute top-0 left-5 w-60 h-60 transition-transform duration-300 ${
            previewUrl ? "translate-x-16" : "translate-x-0"
          }`}
        />
        {/* 선택된 파일 blob URL 미리보기 */}
        {previewUrl && (
          <img
            src={previewUrl}
            alt="Selected"
            className="absolute top-1 right-16 w-56 h-56 object-cover rounded"
            style={{ pointerEvents: "none" }}
          />
        )}
      </div>

      <input
        {...register("title", { required: "제목을 입력해주세요." })}
        className="w-full p-3 mb-4 rounded-md bg-gray text-white border-2 border-[#434343]"
        placeholder="LP Name"
        disabled={isLoading}
      />
      {errors.title && <p className="text-red-500 text-sm mb-2">{errors.title.message}</p>}

      <input
        {...register("content", { required: "내용을 입력해주세요." })}
        className="w-full p-3 mb-4 rounded-md bg-gray text-white border-2 border-[#434343]"
        placeholder="LP Content"
        disabled={isLoading}
      />
      {errors.content && <p className="text-red-500 text-sm mb-2">{errors.content.message}</p>}

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TagInput tags={field.value} setTags={field.onChange} disabled={isLoading} />
        )}
      />

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={`px-4 py-3 rounded-lg text-white w-full mt-6 ${
          isValid ? "bg-pink-500" : "bg-gray-500"
        }`}
      >
        {isLoading ? "추가 중..." : "Add LP"}
      </button>
    </form>
  );
};

export default LpForm;
