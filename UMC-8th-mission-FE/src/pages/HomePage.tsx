import useGetLpList from "../hooks/queries/useGetLpList";

const HomePage = () => {
  const { data } = useGetLpList({});

  const lpList = data ?? [];

  console.log(data);

  return (
    <div className="w-full overflow-x-hidden px-4">

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 my-8">
        {lpList.map((lp) => (
          <div
            key={lp.id}
            className="aspect-square bg-gray-800 rounded overflow-hidden hover:opacity-90 cursor-pointer"
          >
            <img
              src={lp.thumbnail}
              alt={lp.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="bg-[#434343] w-full h-[400px] mb-32 flex items-center justify-center text-3xl font-bold">
        오늘의 추천 영화
      </div>

      <div className="mb-28">
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
    </div>
  );
};

export default HomePage;  