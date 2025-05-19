import { X } from 'lucide-react';
import useDeleteAuth from '../../hooks/mutations/useDeleteAuth';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

interface AddLPModalProps {
  onClose: () => void;
}

export default function ModalDeleteAuth({ onClose }: AddLPModalProps) {
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const { mutate: deleteAuthMutate } = useDeleteAuth();

  const handleClose = () => {
    onClose?.();
  };

  const handleNo = () => {
    onClose?.();
  };

  const handleYes = () => {
    if (accessToken) {
      deleteAuthMutate();
    } else {
      alert('로그인 후 탈퇴 가능합니다.');
      navigate('/login');
    }
  };

  return (
    <div className='bg-[#363535] text-white flex flex-col items-center relative p-10'>
      <button type='button' className='absolute right-4 top-4' onClick={handleClose}>
        <X />
      </button>
      <p className='font-bold mt-8'>정말 탈퇴하시겠습니까?</p>
      <div className='flex gap-10 mt-7 mb-10'>
        <button type='button' className='rounded-xl text-black bg-gray-300 w-[5rem] py-2 font-bold' onClick={handleYes}>
          예
        </button>
        <button type='button' className='rounded-xl bg-pink-500 w-[5rem] py-2 font-bold' onClick={handleNo}>
          아니오
        </button>
      </div>
    </div>
  );
}
