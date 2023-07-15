import { create } from 'zustand';

interface AuthState {
  userAuth: any;
  setUserAuth: (user: any) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  userAuth: {},
  setUserAuth: (item) => {
    set({ userAuth: item });
  },
}));
export default useAuthStore;
