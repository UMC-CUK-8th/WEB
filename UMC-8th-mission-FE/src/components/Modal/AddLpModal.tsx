import { useRef } from "react";
import usePostLp from "../../hooks/mutations/usePostLp";
import LpForm from "./LpForm.tsx";
import type { CreateLpRequest } from "../../types/lp";

interface AddLpModalProps {
  onClose: () => void;
}

const AddLpModal = ({ onClose }: AddLpModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const mutation = usePostLp();

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const onSubmit = (data: CreateLpRequest) => {
    mutation.mutate(data, {
      onSuccess: () => onClose(),
      onError: (e) => {
        console.error("LP 생성 실패", e);
        alert("LP 생성에 실패했습니다.");
      },
    });
  };

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center mt-12 z-50"
    >
      <div className="bg-[#1C1C1C] p-6 rounded-xl w-[440px] flex flex-col items-center relative">
        <button
          className="absolute top-2 right-3 text-[#fdfdfd] text-3xl"
          onClick={onClose}
          disabled={mutation.isPending}
        >
          ×
        </button>

        <LpForm
          onSubmit={onSubmit}
          isLoading={mutation.isPending}
        />
      </div>
    </div>
  );
};

export default AddLpModal;
