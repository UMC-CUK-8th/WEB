interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal = ({ onConfirm, onCancel }: DeleteModalProps) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#222] p-6 rounded-xl text-white w-[420px] shadow-xl text-md text-center">
        <p className="mt-12 mb-6 text-xl font-semibold">정말 탈퇴하시겠습니까?</p>
        <div className="flex py-4 justify-between gap-4 mb-12 ml-10 mr-10">
          <button
            className="flex-1 py-3 rounded bg-pink-600 hover:bg-pink-500 font-semibold"
            onClick={onConfirm}
          >
            예
          </button>
          <button
            className="flex-1 py-3 rounded bg-gray-600 hover:bg-gray-500 font-semibold"
            onClick={onCancel}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
