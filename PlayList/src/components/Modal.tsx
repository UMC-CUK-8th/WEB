import { useCartInfo, useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const { isModalOpen } = useCartInfo();
  const { clearCart, closeModal } = useCartActions();

  if (!isModalOpen) return null;

  const handleYes = () => {
    clearCart();
    closeModal();
  };

  const handleNo = () => {
    closeModal();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-10 rounded-2xl shadow-2xl border-[1px] border-gray-200">
        <p className="mb-4">전체 삭제하시겠습니까?</p>
        <div className="flex w-full justify-between gap-3">
          <button
            onClick={handleYes}
            className="flex-1 bg-red-500 text-white px-4 py-2 rounded shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            네
          </button>
          <button
            onClick={handleNo}
            className="flex-1 bg-gray-300 text-black px-4 py-2 rounded shadow-md hover:shadow-lg transition-transform transform hover:-translate-y-1"
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
