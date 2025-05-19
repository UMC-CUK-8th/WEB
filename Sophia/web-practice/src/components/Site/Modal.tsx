import { X } from 'lucide-react';
import LPImg from '../../assets/LPImg.png';
import { useRef, useState } from 'react';
import useCreateLp from '../../hooks/mutations/useCreateLp';

interface AddLPModalProps {
  onClose: () => void;
}

export default function Modal({ onClose }: AddLPModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImg, setPreviewImg] = useState(LPImg);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const [thumbnail, setThumbnail] = useState('');

  const { mutate: createLpMutate } = useCreateLp();

  const handleClose = () => {
    onClose?.();
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 파일을 읽기 위한 FileReader 객체 생성
    const reader = new FileReader();
    // 파일을 다 읽었을 때 실행될 콜백 함수 등록
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setPreviewImg(reader.result);
      }
    };

    // setThumbnail(file);
    // 선택한 파일을 base64 인코딩된 데이터 URL로 읽기 시작
    // HTML 파일 input에서 선택한 파일은 JS가 직접 볼 수 있는 형식이 아님 -> 파일 내용을 base64 문자열로 읽어서 <img src="...">에 넣어야 함
    reader.readAsDataURL(file);
  };

  const handleClickAddTag = () => {
    if (!tag.trim()) return;
    if (tags.includes(tag.trim())) return;

    setTags((prev) => [...prev, tag.trim()]);
    setTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddLp = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createLpMutate({
      title,
      content,
      // thumbnail,
      tags,
      published: true,
    });
  };

  return (
    <form className='bg-gray-700 rounded-2xl text-white flex flex-col items-center relative'>
      <button type='button' className='absolute right-0 p-3' onClick={handleClose}>
        <X />
      </button>
      <input type='file' name='LPImage' id='LPImage' className='hidden' accept='image/jpeg, image/png, image/webp, image/jpg, image/svg+xml' ref={fileInputRef} onChange={handleImgChange} />
      <button type='button' className='my-10 cursor-pointer' onClick={handleImageClick}>
        <img src={previewImg} alt='LP 이미지' className='w-56 p-4' />
      </button>
      <div className='w-[60%]'>
        <div className='flex flex-col gap-3 w-full'>
          <input type='text' placeholder='LP Name' className='border-white border-2 rounded-md p-1' value={title} onChange={(e) => setTitle(e.target.value)} />
          <input type='text' placeholder='LP Comment' className='border-white border-2 rounded-md p-1' value={content} onChange={(e) => setContent(e.target.value)} />
          <div className='flex gap-2'>
            <input type='text' placeholder='LP Tag' className='border-white border-2 rounded-md p-1 w-full' value={tag} onChange={(e) => setTag(e.target.value)} />
            <button type='button' className='bg-pink-500 disabled:bg-gray-400 px-2 rounded-md' disabled={!tag.trim()} onClick={handleClickAddTag}>
              Add
            </button>
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            {tags.length !== 0 &&
              tags.map((tag, index) => (
                <div className='text-white border-white border-2 rounded-md p-1' key={index}>
                  <span>{tag}</span>
                  <button type='button' onClick={() => handleRemoveTag(tag)}>
                    <X size={14} />
                  </button>
                </div>
              ))}
          </div>
        </div>
        <button type='submit' className='bg-pink-500 disabled:bg-gray-400 px-2 rounded-md w-full my-10 p-2' disabled={tags.length === 0 && !title.trim() && !content.trim()} onClick={handleAddLp}>
          Add LP
        </button>
      </div>
    </form>
  );
}
