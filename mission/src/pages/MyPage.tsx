import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth";
import { ResponseMyInfoDto } from "../types/auth";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { PAGINATION_ORDER } from "../enums/common";
import { FiCheck, FiSettings } from 'react-icons/fi';
import useGetMyLpList from '../hooks/queries/useGetMyLp';
import useUpdateMyInfo from '../hooks/mutations/useUpdateMyInfo';
import LpCard from '../components/LpCard';
import LpCardSkeletonList from '../components/LpCardSkeletonList';

const MyPage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [data, setData] = useState<ResponseMyInfoDto>();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [order, setOrder] = useState(PAGINATION_ORDER.desc);

  const { data: lps, isPending } = useGetMyLpList({ order });
  const { mutate: updateMyInfo } = useUpdateMyInfo();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getMyInfo();
      setData(response);
      setName(response.data.name);
      setBio(response.data.bio ?? "");
      setAvatar(response.data.avatar ?? "");
    };
    fetchData();
  }, []);

  const handleUpdate = () => {
    if (!name.trim()) {
      alert("닉네임은 빈칸일 수 없습니다!");
      return;
    }
    updateMyInfo({ name, bio, avatar });
  };

  return (
    <div className="flex items-center flex-col">
      <div className="flex items-center gap-6 text-white m-10">
        <img
          src={avatar || "/default-avatar.png"}
          alt="프로필 사진"
          className="w-24 h-24 rounded-full"
        />
        <div className="flex flex-col w-full max-w-md">
          <div className="flex items-center justify-between gap-2">
            {isEditMode ? (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-black border border-white rounded px-3 py-2 text-white w-full"
              />
            ) : (
              <div className="text-xl font-semibold">{data?.data?.name}</div>
            )}
            <button
              onClick={isEditMode ? handleUpdate : () => setIsEditMode(true)}
              className="text-gray-300 hover:text-white"
            >
              {isEditMode ? <FiCheck size={20} /> : <FiSettings size={18} />}
            </button>
          </div>

          {isEditMode ? (
            <>
              <input
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="자기소개를 입력하세요"
                className="bg-black border border-white rounded px-3 py-2 text-white mt-2"
              />
            </>
          ) : (
            <div className="text-sm text-gray-300">{data?.data?.bio}</div>
          )}

          <h1 className="text-sm mt-2">{data?.data?.email}</h1>
        </div>
      </div>

      <div className='w-full flex justify-end mb-4 px-10'>
        <div className='inline-flex border-2 rounded-md border-white'>
          <button
            type='button'
            className={`${order === PAGINATION_ORDER.asc ? 'bg-transparent text-white' : 'bg-white text-black'} px-4 py-2`}
            onClick={() => setOrder(PAGINATION_ORDER.desc)}
          >
            오래된순
          </button>
          <button
            type='button'
            className={`${order === PAGINATION_ORDER.asc ? 'bg-white text-black' : 'bg-transparent text-white'} px-4 py-2`}
            onClick={() => setOrder(PAGINATION_ORDER.asc)}
          >
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
      {!isPending && lps?.length === 0 && (
        <p className='text-white flex justify-center mt-20'>게시한 LP가 없습니다.</p>
      )}
    </div>
  );
};

export default MyPage;
