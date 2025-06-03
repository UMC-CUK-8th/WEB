import { CartItems } from '../types/cart';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import cartItems from '../constants/cartItem';
import { useShallow } from 'zustand/shallow';

interface CartActions {
  increment: (id: string) => void;
  decrement: (id: string) => void;
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increment: (id: string) => {
        // immer가 없을 경우
        // 업데이트하는 값 이외의 다른 값들의 불변성을 지키기 위해 코드를 고려하여 작성
        // set((state) => ({
        //   cartItems: state.cartItems.map((item) => (item.id === id ? { ...item, amount: item.amount + 1 } : item)),
        // }));

        // immer가 있을 경우
        // immer로 불변성 관리가 가능
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrement: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price);
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

// state 내보내기
// useShallow를 통해 불필요한 리렌더링 방지
export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

// action 내보내기
export const useCartActions = () => useCartStore((state) => state.actions);
