import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import { closeModal } from "../slices/modalSlice";

const Modal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.modal.isOpen);

  if (!isOpen) return null;

  const handleYes = () => {
    dispatch(clearCart());   
    dispatch(closeModal());  
  };

  const handleNo = () => {
    dispatch(closeModal());  
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md">
        <p className="mb-4">정말 전체 삭제하시겠습니까?</p>
        <div className="flex justify-between">
          <button onClick={handleYes} className="bg-red-500 text-white px-4 py-2 rounded">
            네
          </button>
          <button onClick={handleNo} className="bg-gray-300 text-black px-4 py-2 rounded">
            아니요
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
