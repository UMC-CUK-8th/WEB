import { Cast } from '../types/credits';

interface CreditCardProps {
  Credit: Cast;
}

export default function CreditCard({ Credit }: CreditCardProps) {
  const imageUrl = Credit.profile_path
    ? `https://image.tmdb.org/t/p/w200${Credit.profile_path}`
    : 'https://via.placeholder.com/100x100?text=No+Image';

  return (
    <div className="flex flex-col items-center p-4">
      <img
        src={imageUrl}
        alt={Credit.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="mt-2 text-center">
        <p className="text-sm font-semibold">{Credit.name}</p>
        <p className="text-xs text-gray-400">{Credit.character}</p>
      </div>
    </div>
  );
}
