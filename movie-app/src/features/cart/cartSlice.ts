import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "./cartItems";

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
}

const initialState: CartState = {
    cartItems,
    totalAmount: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
        state.cartItems = [];
        },
        removeItem: (state, action: PayloadAction<string>) => {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        increase: (state, action: PayloadAction<string>) => {
        const item = state.cartItems.find(item => item.id === action.payload);
        if (item) item.amount += 1;
        },
        decrease: (state, action: PayloadAction<string>) => {
        const item = state.cartItems.find(item => item.id === action.payload);
        if (item) {
            item.amount -= 1;
            if (item.amount < 1) {
            state.cartItems = state.cartItems.filter(i => i.id !== item.id);
            }
        }
        },
        calculateTotals: (state) => {
        let totalAmount = 0;
        let totalPrice = 0;
        state.cartItems.forEach(item => {
            totalAmount += item.amount;
            totalPrice += item.amount * parseInt(item.price);
        });
        state.totalAmount = totalAmount;
        state.totalPrice = totalPrice;
        }
    }
});

export const {
    clearCart,
    removeItem,
    increase,
    decrease,
    calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
