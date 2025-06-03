import { useMutation } from '@tanstack/react-query';
import { updateMyInfo } from '../../apis/lp';
import { queryClient } from '../../App';
import { ResponseMyInfoDto } from '../../types/auth';
import { useLocalStorage } from '../useLocalStorage';
import { useAuth } from '../../context/AuthContext';
import { LOCAL_STORAGE_KEY, QUERY_KEY } from '../../constants/key';


function useUpdateMyInfo() {
  const { setUserName } = useAuth();
  const { setItem: setUserNameInStorage } = useLocalStorage(LOCAL_STORAGE_KEY.userName);

  return useMutation({
    mutationFn: updateMyInfo,
     onMutate: async (data) => {
      await queryClient.cancelQueries({
        queryKey: [QUERY_KEY.myInfo],
      });

      const previousMyInfo = queryClient.getQueryData<ResponseMyInfoDto>([QUERY_KEY.myInfo]);

      const updatedMyInfo = {
        ...previousMyInfo,
        data: {
          ...previousMyInfo?.data,
          name: data.name ?? previousMyInfo?.data.name,
          bio: data.bio ?? previousMyInfo?.data.bio,
        },
      };

      const myPreviousName = previousMyInfo?.data.name;
      const myNewName = data.name;

      if (myNewName !== myPreviousName) {
        setUserName(myNewName); 
        setUserNameInStorage(myNewName); 
      }

      queryClient.setQueryData([QUERY_KEY.myInfo], updatedMyInfo);

      return { previousMyInfo, updatedMyInfo };
    },

    onError: (error, _variables, context) => {
      console.error(error);

      if (context?.previousMyInfo) {
        queryClient.setQueryData([QUERY_KEY.myInfo], context.previousMyInfo);
      }
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY.myInfo], data);
    },
  });
}

export default useUpdateMyInfo;