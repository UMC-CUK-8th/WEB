import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '../../apis/lp';
// import { queryClient } from '../../App';
// import { LOCAL_STORAGE_KEY, QUERY_KEY } from '../../constants/key';
// import { ResponseMyTypeDto } from '../../types/auth';
// import { useLocalStorage } from '../useLocalStorage';
// import { useAuth } from '../../context/AuthContext';

function useUpdateMyInfo() {
  // 전역 상태 변경을 위한 함수 가져오기
  // setUserName: 전역 상태 변경 관리
  // const { setUserName } = useAuth();
  // const { setItem: setUserNameInStorage } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  return useMutation({
    mutationFn: updateMyInfo,

    // 업데이트 데이터 받아오기
    // onMutate: async (data) => {
    //   await queryClient.cancelQueries({
    //     queryKey: [QUERY_KEY.myInfo],
    //   });

    //   const previousMyInfo = queryClient.getQueryData<ResponseMyTypeDto>([QUERY_KEY.myInfo]);

    //   const updatedMyInfo = {
    //     ...previousMyInfo,
    //     data: {
    //       ...previousMyInfo?.data,
    //       name: data.name ?? previousMyInfo?.data.name,
    //       bio: data.bio ?? previousMyInfo?.data.bio,
    //       // avatar: data.avatar ?? previousMyInfo.data.avatar,
    //     },
    //   };

    //   const myPreviousName = previousMyInfo?.data.name;
    //   const myNewName = data.name;

    //   if (myNewName !== myPreviousName) {
    //     setUserName(myNewName); // 전역 상태 업데이트
    //     setUserNameInStorage(myNewName); // 로컬 스토리지 업데이트
    //   }

    //   queryClient.setQueryData([QUERY_KEY.myInfo], updatedMyInfo);

    //   return { previousMyInfo, updatedMyInfo };
    // },

    // onError: (error, _variables, context) => {
    //   console.error(error);

    //   if (context?.previousMyInfo) {
    //     queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
    //   }
    // },

    // onSettled: async () => {
    //   await queryClient.invalidateQueries({
    //     queryKey: [QUERY_KEY.myInfo],
    //   });
    // },
    // // UI 변경을 위한 업데이트
    // onSuccess: (data) => {
    //   queryClient.setQueryData([QUERY_KEY.myInfo], data);
    // },
  });
}

export default useUpdateMyInfo;
