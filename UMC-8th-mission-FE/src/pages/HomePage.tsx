const HomePage = () => {
  return (
    <div>
      <div className="bg-[#434343] w-full h-[400px] mb-32 flex items-center justify-center text-3xl font-bold">
        오늘의 추천 영화
      </div>

      <div className="mb-28 px-4">
        <h2 className="text-3xl font-semibold mb-12">박스오피스 랭킹</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#434343] h-[150px] flex items-center justify-center"
            >
              #{idx + 1}
            </div>
          ))}
        </div>
      </div>
      <div className="mb-24 px-4">
        <h2 className="text-3xl font-semibold mb-12">카테고리별 인기작</h2>
        <div className="flex overflow-x-scroll space-x-4 no-scrollbar">
          {Array.from({ length: 10 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#434343] w-[200px] h-[300px] shrink-0 flex items-center justify-center"
            >
              콘텐츠 {idx + 1}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default HomePage;