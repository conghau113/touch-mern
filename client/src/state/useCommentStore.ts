import { create } from 'zustand';

interface CommentPostState {
  commentCountPost: number;
  setCommentCountPost: (commentCountPost: number) => void;
}

const useCommentPostStore = create<CommentPostState>((set) => ({
  commentCountPost: 0,
  setCommentCountPost: (item) => {
    set({ commentCountPost: item });
  },
}));
export default useCommentPostStore;
