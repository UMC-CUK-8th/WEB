import { createSlice } from "@reduxjs/toolkit";

export interface ModalState {
    isOpen: boolean;
}

const initialState: ModalState = {
    isOpen: false,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            document.body.style.overflow = "hidden";
            state.isOpen = true;
        },
        closeModal: (state) => {
            document.body.style.overflow = "auto";
            state.isOpen = false;
        },
    },
});

export const {
    openModal, closeModal
} = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;