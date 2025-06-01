import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface ModalActions {
    openModal: () => void;
    closeModal: () => void;
}

interface ModalState {
    isOpen: boolean;

    actions: ModalActions;
}

export const useModalStore = create<ModalState>()(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    immer((set, get) => ({
    isOpen: false,

    actions: {
        openModal: () => set((state) => {
            document.body.style.overflow = "hidden";
            state.isOpen = true;
        }),
        closeModal: () => set((state) => {
            document.body.style.overflow = "auto";
            state.isOpen = false;
        }),
    },
})));

export const useModalInfo = () => 
    useModalStore((state) => 
        state.isOpen,
    );


export const useModalActions = () => {
    return useModalStore((state) => state.actions);
};