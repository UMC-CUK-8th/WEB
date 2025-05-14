import { useEffect, useRef, useState } from 'react';
import { getMyInfo } from '../../apis/auth';
import { ResponseMyTypeDto } from '../../types/auth';
import { Settings } from 'lucide-react';
import { PAGINATION_ORDER } from '../../enums/common';
import useGetMyLpList from '../../hooks/queries/useGetMyLpList';
import LpCard from '../../components/Site/LpCard';
import LpCardSkeletonList from '../../components/Site/LpCardSkeletonList';
import useUpdateMyInfo from '../../hooks/mutations/useUpdateMyInfo';

export default function MyPage() {
  const [order, setorder] = useState(PAGINATION_ORDER.desc);
  const [data, setData] = useState<ResponseMyTypeDto>();
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState('');
  const [editiingBio, setEditingBio] = useState('');
  const [editingAvatar, setEditingAvatar] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: lps, isPending, isError } = useGetMyLpList({ order });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getMyInfo();
        setData(response);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, []);

  const { mutate: updateMyInfoMutate } = useUpdateMyInfo();

  const handleUpdateMyInfo = () => {
    updateMyInfoMutate({
      name: editingName,
      bio: editiingBio,
      // avatar: editingAvatar,
    });
  };

  const handleClickEdit = (name: string, bio: string, avatar: string) => {
    setIsEditing(true);
    setEditingName(name);
    setEditingBio(bio);
    setEditingAvatar(avatar);
  };

  const handleEditAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setEditingAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  if (isPending) {
    return <div className='text-white'>Loading..</div>;
  }

  if (isError) {
    return <div className='text-white'>Error!</div>;
  }

  return (
    <div>
      <div className='flex justify-center gap-10 mt-10'>
        {isEditing ? (
          <div>
            <input type='file' name='LPImage' id='LPImage' className='hidden' accept='image/jpeg, image/png, image/webp, image/jpg, image/svg+xml' ref={fileInputRef} onChange={handleAvatarChange} />
            <button type='button' className='my-10 cursor-pointer' onClick={handleEditAvatar}>
              {editingAvatar ? <img src={editingAvatar} alt='LP 이미지' className='rounded-full w-[120px] h-[120px]' /> : <div className='rounded-full w-[100px] h-[100px] bg-gray-300' aria-label='기본 프로필'></div>}
            </button>
          </div>
        ) : data?.data.avatar ? (
          <img src={data.data.avatar} alt={data.data.name} className='rounded-full w-[100px] h-[100px]' />
        ) : (
          <div className='rounded-full w-[100px] h-[100px] bg-gray-300' aria-label='기본 프로필'></div>
        )}
        <div className='text-white flex flex-col justify-center'>
          <div className='flex justify-between'>
            {isEditing ? <input type='text' className='border-2 border-white rounded-md px-2 text-2xl w-[70%] text-white' value={editingName} onChange={(e) => setEditingName(e.target.value)} required /> : <p className='text-2xl'>{data?.data.name}</p>}
            {isEditing ? (
              <div className='flex gap-2'>
                <button type='button' className='cursor-pointer border-2 border-white rounded-md p-1' onClick={() => setIsEditing(false)}>
                  취소
                </button>
                <button type='button' className='cursor-pointer border-2 border-white rounded-md p-1 disabled:text-gray-500 disabled:border-gray-500' disabled={!editingName} onClick={handleUpdateMyInfo}>
                  완료
                </button>
              </div>
            ) : (
              <button type='button' onClick={() => handleClickEdit(data?.data.name ?? '', data?.data.bio ?? '', data?.data.avatar ?? '')}>
                <Settings />
              </button>
            )}
          </div>
          {isEditing ? <input type='text' className='border-2 border-white rounded-md px-2 w-[80%] text-white mt-2' value={editiingBio} onChange={(e) => setEditingBio(e.target.value)} /> : <p>{data?.data.bio}</p>}
          <p>{data?.data.email}</p>
        </div>
      </div>

      <div className='flex justify-end mt-10'>
        <div className='inline-flex border-2 rounded-md border-white'>
          <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-transparent text-white p-1 ' : 'bg-white text-black p-1'}`} onClick={() => setorder(PAGINATION_ORDER.desc)}>
            오래된순
          </button>
          <button type='button' className={`${order === PAGINATION_ORDER.asc ? 'bg-white text-black p-1' : 'bg-transparent text-white p-1'}`} onClick={() => setorder(PAGINATION_ORDER.asc)}>
            최신순
          </button>
        </div>
      </div>

      <div className='grid gap-4 grid-cols-2 sm:grid-cols-3 justify-items-center'>
        {isPending && <LpCardSkeletonList count={20} />}
        {lps?.map((lp) => (
          <LpCard key={lp.id} data={lp} />
        ))}
      </div>
      {lps.length === 0 && <p className='text-white flex justify-center mt-20'>게시한 LP가 없습니다.</p>}
    </div>
  );
}
