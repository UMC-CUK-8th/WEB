import { useDispatch } from "react-redux";
import {
    increase,
    decrease,
} from "../features/cart/cartSlice";

const CartItem = ({ item }: any) => {
    const dispatch = useDispatch();

    return (
        <div className="flex items-center justify-between py-3 border-b">
        <div className="flex gap-4 items-center">
            <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded" />
            <div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-gray-500 text-sm">{item.singer}</p>
            <p className="text-sm font-bold">₩{item.price}</p>
            </div>
        </div>
        <div className="flex gap-2 items-center">
            <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => dispatch(decrease(item.id))}>-</button>
            <span>{item.amount}</span>
            <button className="px-3 py-1 bg-gray-200 rounded" onClick={() => dispatch(increase(item.id))}>+</button>
        </div>
        </div>
    );
};

export default CartItem;
