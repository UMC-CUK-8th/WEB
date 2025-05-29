import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import cartItems from '../constants/cartItem';
import { CartItems } from '../types/cart';

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },

    decrement: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((item) => item.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },

    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    clearCart: (state) => {
      state.cartItems = [];
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

// duck pattern
// reducer는 export default로 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;

// actions 내보내기
export const { increment, decrement, removeItem, clearCart, calculateTotals } = cartSlice.actions;
