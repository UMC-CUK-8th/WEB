import { Cast } from '../types/credits';
import defaultImage from '../assets/defaultProfile.svg';

interface CreditCardProps {
  Credit: Cast;
}

export default function CreditCard({ Credit }: CreditCardProps) {
  const imageUrl = Credit.profile_path
    ? `https://image.tmdb.org/t/p/w200${Credit.profile_path}`
    : defaultImage;

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
