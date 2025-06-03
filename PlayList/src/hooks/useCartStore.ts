import { immer } from "zustand/middleware/immer";
import type { CartItems } from "../types/cart";
import { create } from "zustand";
import cartItems from "../constants/cartItems";
import { useShallow } from "zustand/shallow";

interface CartActions{
    increase:(id:string)=>void;
    decrease:(id:string)=>void;
    removeItem:(id:string)=>void;
    clearCart:()=>void;
    calculateTotals:()=>void;
}

interface CartState {
    cartItems:CartItems;
    amount:number;
    total:number;

    actions:CartActions;
}

export const useCartStore=create<CartState>()(
    immer((set,_)=>({
        cartItems:cartItems,
        amount:0,
        total:0,
        actions:{
            increase:(id:string)=>{
                //immer 를 처리하지 않았더라면 아래 주석들을 썼어야 한다. 
                /*set((state)=>({
                    cartItems:state.cartItems.map((item)=>
                    item.id===id?{...item,amount:item.amount+1}:item),
                }));*/
                set((state)=>{
                    const cartItem=state.cartItems.find((item)=>item.id===id);

                    if (cartItem){
                        cartItem.amount+=1;
                    }
                })
            },
            decrease:(id:string)=>{
                set((state)=>{
                    const cartItem=state.cartItems.find((item)=>item.id===id);

                    if (cartItem&&cartItem.amount>0){
                        cartItem.amount-=1;
                    }
                })
            },
            removeItem:(id:string)=>{
                set((state)=>{
                    state.cartItems=state.cartItems.filter((item)=>item.id!==id);
                })
            },
            clearCart:()=>{
                set((state)=>{
                    state.cartItems=[];
                })
            },
            calculateTotals:()=>{
                set((state)=>{
                    let amount=0;
                    let total=0;

                    state.cartItems.forEach((item)=>{
                        amount+=item.amount;
                        total+=item.amount*item.price;
                    })

                    state.amount=amount;
                    state.total=total;
                })
            },
        },
    }))
);//immer : 불변성 유지 해주는 코드 

export const useCartInfo=()=>useCartStore(useShallow((state)=>({
    cartItems:state.cartItems,
    amount:state.amount,
    total:state.total,
})));

export const useCartActions=()=>useCartStore((state)=>state.actions);

