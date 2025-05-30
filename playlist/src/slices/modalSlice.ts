import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ModalState = {
    type: string;
    isOpen: boolean;
};

const initialState: ModalState= {
    type:'모두 지우시겠습니까',
    isOpen: false,
};

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers:{
        openModal:(state, action:PayloadAction<string>) =>{
            state.type = action.payload;
            state.isOpen = true;
        },
        closeModal:(state)=>{
            state.isOpen = false;
        },
    },
});

export default modalSlice.reducer;
export const {openModal, closeModal} = modalSlice.actions;