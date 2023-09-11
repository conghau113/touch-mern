import { create } from 'zustand';

interface TrendingPostState {
  isEdit: boolean;
  setEdit: (isEdit: boolean) => void;
}

const useTrendingPostStore = create<TrendingPostState>((set) => ({
  isEdit: false,
  setEdit(isEdit) {
    set({ isEdit });
  },
}));
export default useTrendingPostStore;
