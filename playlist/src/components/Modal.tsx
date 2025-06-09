import { clearCart } from '../slices/cartSlice';
import { closeModal } from '../slices/modalSlice';
import { useDispatch } from '../hooks/useCustomRedux';
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const dispatch = useDispatch();

  const handleNoButton = () => {
    dispatch(closeModal());
  };    
  
  const {clearCart}=useCartActions();

  const handleYesButton = () => {
    // dispatch(clearCart());
    clearCart();
    dispatch(closeModal());
  };

  return (
    <div className=' w-70 flex flex-col items-center p-4 gap-4 rounded-md bg-white border-gray-50'>
      <p className='text-xl font-semibold'>정말 삭제하시겠습니까?</p>
      <div className='flex gap-6'>
        <button type='button' className='rounded-md bg-gray-300 p-2' onClick={handleNoButton}>
          아니요
        </button>
        <button type='button' className='rounded-md bg-red-500 text-white p-3' onClick={handleYesButton}>
          네
        </button>
      </div>
    </div>
  );
}
export default Modal;