import { create } from "zustand";

interface ScrollState {
  ref: HTMLDivElement | null;
  scrollToTop: () => void;
}

export const useScrollState = create<ScrollState>((set, get) => ({
  ref: null,
  scrollToTop: () => {
    const ref = get().ref;
    console.log("ref", ref);
    if (ref) {
      ref.scrollIntoView(true);
    }
  },
}));
