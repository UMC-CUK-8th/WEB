
import { Cast } from "../types/credits";

interface PeopleCardProps{
    people: Cast;
}


export default function PeopleCard({people}:PeopleCardProps){
    
    return(
    <div className="p-3 bg-black w-35 flex flex-col items-center  text-center">
    {people.profile_path? (
    <img src={`https://image.tmdb.org/t/p/w200${people.profile_path}`} 
        className="rounded-full w-25 h-25 object-cover border-2 border-white"/>
    ):(
        <div className="rounded-full w-25 h-25 object-cover border-2 border-white"></div>
    )}
    <h2 className="pt-2">{people.name}</h2>
    <h2 className="pt-2 text-gray-500 ">{people.character}</h2>
    </div>);
}