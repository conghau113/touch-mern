import { create } from 'zustand';

interface PostStoreModalState {
  selectedPostValue: string;
  setSelectedPostValue: (selectedPostValue: string) => void;
}

const useSelectedTypePostStore = create<PostStoreModalState>((set) => ({
  selectedPostValue: '-createdAt',
  setSelectedPostValue: (item) => {
    set({ selectedPostValue: item });
  },
}));
export default useSelectedTypePostStore;
