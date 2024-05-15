import { create } from "zustand";

interface DrawerState {
  open: boolean;
  setOpen: (open: boolean) => void;
  comicId: string;
  openComicDetail: (comicId: string) => void;
  authorId: string;
  openAuthorDetail: (authorId: string) => void;
}

export const useDrawerState = create<DrawerState>((set) => ({
  open: false,
  setOpen: (open: boolean) => set({ open }),
  comicId: "",
  openComicDetail: (comicId: string) => set({ comicId, open: true }),
  authorId: "",
  openAuthorDetail: (authorId: string) => set({ authorId, open: true }),
}));
