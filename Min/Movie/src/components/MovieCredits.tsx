import { Cast } from "../types/detail";

type Props = {
  cast: Cast[];
};

const MovieCredits = ({ cast }: Props) => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-white">
      <h2 className="text-2xl font-semibold mb-6">감독 / 출연</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
        {cast.slice(0, 16).map((person) => (
          <div key={person.cast_id} className="text-center">
            <img
              src={
                person.profile_path
                  ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                  : "/placeholder.jpg"
              }
              alt={person.name}
              className="w-20 h-20 rounded-full mx-auto object-cover"
            />
            <p className="mt-2 text-sm font-bold">{person.name}</p>
            <p className="text-xs text-gray-300">{person.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCredits;
