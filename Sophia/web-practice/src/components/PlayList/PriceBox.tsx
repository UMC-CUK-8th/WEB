import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from '../../hooks/useCustomRedux';
import { closeModal, openModal } from '../../slices/modalSlice';
import Modal from './Modal';

export default function PriceBox() {
  const { total } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const modalBg = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickModalbg = (e: MouseEvent) => {
      if (isOpen && modalBg.current && !modalBg.current.contains(e.target as Node)) {
        dispatch(closeModal());
      }
    };

    document.addEventListener('mousedown', handleClickModalbg);

    return () => {
      document.removeEventListener('mousedown', handleClickModalbg);
    };
  }, [dispatch, isOpen]);

  const handleClearCart = () => {
    dispatch(openModal());
  };

  return (
    <>
      <div className='p-12 flex justify-between'>
        <button type='button' className='border p-4 rounded-md cursor-pointer' onClick={handleClearCart}>
          장바구니 초기화
        </button>
        <div>총 가격: {total}원</div>
      </div>

      {isOpen && (
        <div className='fixed inset-0 flex justify-center items-center z-100 backdrop-blur-md'>
          <div ref={modalBg}>
            <Modal />
          </div>
        </div>
      )}
    </>
  );
}
