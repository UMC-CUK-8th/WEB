import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";

const CartList=()=>{
    const {cartItems}=useCartInfo();
    
    return (
        <div className="flex flex-col items-center justify-center">
            <ul>{cartItems.map((item,)=>(
                <CartItem key={item.id} lp={item}/> //idx보다 고유한 값인 id를 넣어주는게 더 좋다 
            ))}</ul>
        
        </div>)
}

export default CartList;