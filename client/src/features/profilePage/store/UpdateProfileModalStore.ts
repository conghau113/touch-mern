import { PrimaryModalProps } from './../../../components/custom/modal/PrimaryModal';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  setOpen: (isOpen?: boolean) => void;
}

const UpdateProfileModalStore = create<ModalState>((set) => ({
  isOpen: false,
  setOpen: (item) => {
    set({ isOpen: item });
  },
}));

export default UpdateProfileModalStore;
