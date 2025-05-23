import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import defaultProfile from '../assets/defaultProfile.svg';
import useUpdateComment from '../hooks/mutations/useUpdateComment';
import useDeleteComment from '../hooks/mutations/useDeleteComment';
import { useAuth } from '../context/AuthContext';
import useGetMyInfo from '../hooks/queries/useGetMyInfo';

interface LpCommentProps {
  comment: {
    id: number;
    content: string;
    author: {
      id: number;
      name: string;
      avatar?: string;
    };
  };
  lpId: number;
}

const LpComment = ({ comment, lpId }: LpCommentProps) => {
  const { accessToken } = useAuth();
  const { data: me } = useGetMyInfo(accessToken);
  const { mutate: deleteCommentMutate } = useDeleteComment();
  const { mutate: updateCommentMutate } = useUpdateComment();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const isMyComment = comment.author.id === me?.id;

  const handleUpdate = () => {
    updateCommentMutate({ lpId, commentId: comment.id, content: editContent });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteCommentMutate({ lpId, commentId: comment.id });
  };

  return (
    <div className='relative mb-4'>
      <div className='flex items-center gap-2'>
        {comment.author.avatar ? (
          <img src={comment.author.avatar} alt={comment.author.name} className='w-10 h-10 rounded-full' />
        ) : (
          <img src={defaultProfile} className='w-10 h-10' />
        )}
        <span>{comment.author.name}</span>

        {isMyComment && (
          <button className='ml-auto' onClick={() => setMenuOpen(!menuOpen)}>
            <BsThreeDotsVertical />
          </button>
        )}

        {menuOpen && (
          <div className='absolute right-2 top-10 bg-gray-700 rounded shadow p-2 z-10'>
            <button
              className='block px-4 py-1 w-full text-left'
              onClick={() => {
                setIsEditing(true);
                setMenuOpen(false);
              }}
            >
              수정
            </button>
            <button
              className='block px-4 py-1 hover:text-red-600 w-full text-left'
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className='ml-12 mt-2'>
          <input
            type='text'
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className='border rounded w-3/4 p-1 text-white'
          />
          <button
            className='ml-2 text-white bg-[#D0C1FF] px-2 py-1 rounded'
            onClick={handleUpdate}
          >
            저장
          </button>
        </div>
      ) : (
        <p className='ml-12'>{comment.content}</p>
      )}
    </div>
  );
};

export default LpComment;
