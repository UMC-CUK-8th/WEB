import { Lp } from "../types/lp";


interface LpCardProps{
    lp:Lp
}

const LpCard1=({lp}:LpCardProps)=>{
    return (<div
         className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
         <img src={lp.thumbnail} alt={lp.title} className="object-cover w-full h-48"/>
     </div>);
}

export default LpCard1;