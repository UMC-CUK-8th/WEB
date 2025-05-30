// hooks/useUploadImage.ts
import { useMutation } from '@tanstack/react-query';
import { addImg } from '../../apis/lp';

function useUploadImage() {
  return useMutation({
    mutationFn: (formData: FormData) => addImg(formData),
    onError: () => {
      alert('이미지 업로드에 실패했습니다.');
    },
  });
}

export default useUploadImage;
