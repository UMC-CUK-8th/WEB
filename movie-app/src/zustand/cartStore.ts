import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import cartItems from '../features/cart/cartItems'; // 초기 mock 데이터

interface CartItem {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
}

interface CartState {
    cartItems: CartItem[];
    totalAmount: number;
    totalPrice: number;
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

export const useCartStore = create<CartState>()(
    devtools((set, get) => ({
        cartItems,
        totalAmount: 0,
        totalPrice: 0,

        increase: (id) => {
            const updated = get().cartItems.map((item) =>
                item.id === id ? { ...item, amount: item.amount + 1 } : item
            );
            set({ cartItems: updated }, false, 'cart/increase');
            get().calculateTotals();
        },

        decrease: (id) => {
            const updated = get().cartItems
                .map((item) =>
                    item.id === id
                        ? { ...item, amount: item.amount - 1 }
                        : item
                )
                .filter((item) => item.amount > 0);

            set({ cartItems: updated }, false, 'cart/decrease');
            get().calculateTotals();
        },

        removeItem: (id) => {
            const filtered = get().cartItems.filter((item) => item.id !== id);
            set({ cartItems: filtered }, false, 'cart/removeItem');
            get().calculateTotals();
        },

        clearCart: () => {
            set({ cartItems: [] }, false, 'cart/clearCart');
            set({ totalAmount: 0, totalPrice: 0 }, false, 'cart/resetTotals');
        },

        calculateTotals: () => {
            const { cartItems } = get();
            const { totalAmount, totalPrice } = cartItems.reduce(
                (acc, item) => {
                    acc.totalAmount += item.amount;
                    acc.totalPrice += item.amount * parseInt(item.price);
                    return acc;
                },
                { totalAmount: 0, totalPrice: 0 }
            );
            set({ totalAmount, totalPrice }, false, 'cart/calculateTotals');
        },
    }))
);
