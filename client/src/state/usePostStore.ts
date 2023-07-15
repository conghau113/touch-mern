import { create } from 'zustand';
import { EPostModal } from '../enums/EPostModal';

interface PostStoreModalState {
  isOpenPostModal: boolean;
  isOpenLikePostModal: boolean;
  modePostModal: EPostModal;
  postValues: any;
  setPostValues: (postValues: any) => void;
  setModePostModal: (modePostModal: EPostModal) => void;
  setOpenPostModal: (isOpenPostModal: boolean) => void;
  setOpenLikePostModal: (isOpenLikePostModal: boolean) => void;
}

const usePostStore = create<PostStoreModalState>((set) => ({
  isOpenPostModal: false,
  isOpenLikePostModal: false,
  postValues: {},
  modePostModal: EPostModal.Create,
  setPostValues: (item) => {
    set({ postValues: item });
  },
  setModePostModal: (item) => {
    set({ modePostModal: item });
  },
  setOpenPostModal: (item) => {
    set({ isOpenPostModal: item });
  },
  setOpenLikePostModal: (item) => {
    set({ isOpenLikePostModal: item });
  },
}));
export default usePostStore;
