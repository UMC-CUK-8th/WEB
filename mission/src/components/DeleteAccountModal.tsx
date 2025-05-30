import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import useDeleteAccount from '../hooks/mutations/useDeleteAccount';

interface AddLPModalProps {
  onClose: () => void;
}

export default function ModalDeleteAuth({ onClose }: AddLPModalProps) {
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const { mutate: deleteAuthMutate } = useDeleteAccount();

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
  <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex items-center justify-center z-50'>
    <div className='bg-[#363535] text-white flex flex-col items-center relative p-10 rounded-lg w-[300px]'>
      <button type='button' className='absolute right-4 top-4' onClick={handleClose}>
        x
      </button>
      <p className='font-bold mt-8'>정말 탈퇴하시겠습니까?</p>
      <div className='flex gap-10 mt-7 mb-10'>
        <button
          type='button'
          className='rounded-xl text-black bg-white w-[5rem] py-2 font-bold'
          onClick={handleYes}
        >
          예
        </button>
        <button
          type='button'
          className='rounded-xl bg-[#D0C1FF] w-[5rem] py-2 font-bold'
          onClick={handleNo}
        >
          아니오
        </button>
      </div>
    </div>
  </div>
);
}