import { useEffect } from "react";
import { useCartStore } from "../zustand/cartStore";
import CartItem from "../components/cartItem";
import CartFooter from "../components/cartFooter";
import CartModal from "../components/cartModal";

const CartPage = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const calculateTotals = useCartStore((state) => state.calculateTotals);

    useEffect(() => {
        calculateTotals();
    }, [cartItems, calculateTotals]);

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
