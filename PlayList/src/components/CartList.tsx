import CartItem from "./CartItem";
import { useSelector } from "../hooks/useCustomRedux";

const CartList=()=>{
    const {cartItems} =useSelector((state)=>state.cart);
    return (
        <div className="flex flex-col items-center justify-center">
            <ul>{cartItems.map((item)=>(
                <CartItem key={item.id} lp={item}/> //idx보다 고유한 값인 id를 넣어주는게 더 좋다 
            ))}</ul>
        
        </div>)
}

export default CartList;