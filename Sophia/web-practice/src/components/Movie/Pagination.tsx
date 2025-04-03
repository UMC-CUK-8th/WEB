interface MoviePaginationProps {
  page: number;
  onPrev: () => void;
  onNext: () => void;
  isDisabled: boolean;
}

export default function Pagination({ page, onPrev, onNext, isDisabled }: MoviePaginationProps) {
  const handlePrev = () => {
    onPrev?.();
  };

  const handleNext = () => {
    onNext?.();
  };

  return (
    <div className='flex items-center justify-center gap-6 mt-5'>
      <button type='button' onClick={handlePrev} className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer  disabled:bg-gray-500 disabled:cursor-not-allowed' disabled={isDisabled}>{`<`}</button>
      <span>{page} 페이지</span>
      <button type='button' onClick={handleNext} className='bg-[#dda5e3] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#b2dab1] transition-all duration-200 cursor-pointer '>{`>`}</button>
    </div>
  );
}
