import create from "zustand";

export const useStore = create((set) => ({
  state: {
    showReelList: JSON.parse(localStorage.getItem("showReelList")) ?? [],
  },
  fns: {
    setState: (newState) =>
      set((store) => ({
        state: {
          ...store?.state,
          ...newState,
        },
      })),
  },
}));
