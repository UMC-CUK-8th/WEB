import { createSlice } from '@reduxjs/toolkit';

export interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

const modalReducer = modalSlice.reducer;

export default modalReducer;

export const { openModal, closeModal } = modalSlice.actions;
