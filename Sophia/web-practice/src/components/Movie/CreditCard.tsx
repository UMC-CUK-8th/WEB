interface CreditCardProps {
  image: string;
  name: string;
  character: string;
}

export default function CreditCard({ image, name, character }: CreditCardProps) {
  return (
    <div className='flex flex-col items-center w-30'>
      <img src={`https://image.tmdb.org/t/p/original/${image}`} alt={`${character}역의 ${name}`} className='rounded-full w-20 h-20 object-cover border-white border-2'></img>
      <p className='font-bold text-white text-center'>{name}</p>
      <p className=' text-white text-center'>{character}</p>
    </div>
  );
}
