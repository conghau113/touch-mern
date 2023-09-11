import { create } from 'zustand';

interface UseConverSationState {
  current: string;
  setCurrent: (current: string) => void;
}

const useConversationStore = create<UseConverSationState>((set) => ({
  current: '',
  setCurrent(current) {
    set({ current });
  },
}));
export default useConversationStore;
