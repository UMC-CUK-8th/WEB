import { CartItems } from '../types/cart';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useShallow } from 'zustand/shallow';
import cartItems from '../constants/cartItems';

interface CartActions {
    increase: (id: string) => void;
    decrease: (id: string) => void;
    removeItem: (id: string) => void;
    clearCart: () => void;
    calculateTotals: () => void;
}

interface CartState {
    cartItems: CartItems;
    amount: number;
    total: number;

    actions: CartActions;
}

export const useCartStore = create<CartState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, get) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,

    actions: {
        increase: (id) => set((state) => {
            const cartItem = state.cartItems.find((item) => item.id === id);
            if (cartItem) {
                cartItem.amount += 1;
            }
        }),
        decrease: (id) => set((state) => {
            const cartItem = state.cartItems.find((item) => item.id === id);
            if (cartItem && cartItem.amount > 0) {
                cartItem.amount -= 1;
            }
        }),
        removeItem: (id) => set((state) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
        }),
        clearCart: () => set((state) => {
            state.cartItems = [];
        }),
        calculateTotals: () => set((state) => {
            let amount = 0;
            let total = 0;

            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.price * item.amount;
            });
            state.amount = amount;
            state.total = total;
        }),
    },
})));

export const useCartInfo = () => {
    return (
        useCartStore(
            useShallow((state) => ({
                cartItems: state.cartItems,
                amount: state.amount,
                total: state.total,
            }))
        )
    );
}


export const useCartActions = () => {
    return useCartStore((state) => state.actions);
};