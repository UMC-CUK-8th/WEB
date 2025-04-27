import { useEffect, useState } from 'react';
import { getMyInfo } from '../../apis/auth';
import { ResponseMyTypeDto } from '../../types/auth';

export default function MyPage() {
  const [data, setData] = useState<ResponseMyTypeDto>();

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

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      {data?.data.avatar ? <img src={data.data.avatar} alt={data.data.name} className='rounded-full w-[100px] h-[100px]'></img> : <div className='rounded-full w-[100px] h-[100px] bg-gray-300'></div>}
      <div className='text-white flex flex-col items-center'>
        <p>{data?.data.name}</p>
        <p>{data?.data.bio}</p>
        {/* Date 타입 문자열 변환 -> Time 이전값만 추출 */}
        <p>{data?.data.createdAt.toString().split('T')[0]}</p>
      </div>
    </div>
  );
}
