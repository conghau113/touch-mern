import { create } from 'zustand';

interface ChatBoxState {
  isOpenListUser: boolean;
  isOpenConversation: boolean;
  setOpenListUser: (isOpenListUser: boolean) => void;
  setOpenConversation: (isOpenConversation: boolean) => void;
}

const useChatBoxStore = create<ChatBoxState>((set) => ({
  isOpenConversation: false,
  isOpenListUser: false,
  setOpenListUser(isOpenListUser) {
    set({ isOpenListUser });
  },
  setOpenConversation(isOpenConversation) {
    set({ isOpenConversation });
  },
}));
export default useChatBoxStore;
