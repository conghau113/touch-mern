import { create } from 'zustand';
import { PrimaryModalProps } from '../components/custom/modal/PrimaryModal';

interface ModalState {
  isOpen: boolean;
  modalProps: PrimaryModalProps;
  openStaticModal: (modalProps?: PrimaryModalProps) => void;
  closeStaticModal: () => void;
}

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalProps: {},
  openStaticModal: (modalProps) => {
    set({ isOpen: true, modalProps });
  },
  closeStaticModal: () => {
    set({ isOpen: false });
  },
}));

export default useModalStore;
