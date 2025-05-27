export const LoadingSpinner = () => {
  return (
    <div className='size-12 animate-spin rounded-full border-6
    border-t-transparent border-[#b2dab1]' // 동그라미 형태로 돌아가는 스피너가 생성.
    role='status'
    >
        <span className="sr-only">로딩 중...</span>
    </div> // 시각 장애인 분들 같은 분들이나 스크린 리더에 의존하는 사람들을 고려하기 위해 
    // 음성 인식이 되게 해주는 처리도 해줄 수 있음.
  )
}
