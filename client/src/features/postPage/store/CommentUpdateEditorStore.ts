import { create } from 'zustand';

interface CommentUpdateEditorState {
  isOpenCommentUpdateEditor: boolean | false;
  setOpenCommentUpdateEditor: (item: boolean | false) => void;
}

const useCommentUpdateEditorStore = create<CommentUpdateEditorState>((set) => ({
  isOpenCommentUpdateEditor: false,
  setOpenCommentUpdateEditor: (item) => {
    set({ isOpenCommentUpdateEditor: item });
  },
}));
export default useCommentUpdateEditorStore;
