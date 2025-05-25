import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/store";
import {
    calculateTotals,
} from "../features/cart/cartSlice";
import CartItem from "../components/cartItem";
import CartFooter from "../components/cartFooter";
import CartModal from "../components/cartModal";

const CartPage = () => {
    const { cartItems } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(calculateTotals());
    }, [cartItems, dispatch]);

    return (
        <div className="flex flex-col h-screen bg-white pt-12">
            <div className="overflow-y-auto flex-1 p-4 pb-24">
                {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
                ))}
            </div>
            <CartFooter />
            <CartModal/>
        </div>
    );
};

export default CartPage;
