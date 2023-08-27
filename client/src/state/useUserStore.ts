import { create } from 'zustand';

interface UserState {
  user?: { username?: string; avatar?: string };
  setUser: (user: { username?: string; avatar?: string }) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: { username: '', avatar: undefined },
  setUser(user) {
    set({ user });
  },
}));
export default useUserStore;
