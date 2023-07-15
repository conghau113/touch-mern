import { create } from 'zustand';

interface BackdropState {
  isOpenBackdrop: boolean | false;
  isCountBackdrop: number;
  setOpenBackdrop: (item: boolean | false) => void;
}

const useBackdropStore = create<BackdropState>((set) => ({
  isOpenBackdrop: false,
  isCountBackdrop: 0,
  setOpenBackdrop: (item) => {
    set({ isOpenBackdrop: item });
  },
}));
export default useBackdropStore;
