import { create } from "zustand";

export type Page = "home" | "dashboard";

interface NavState {
  page: Page;
  setPage: (page: Page) => void;
}

export const useNavStore = create<NavState>((set) => ({
  page: "home",
  setPage: (page) => set({ page }),
}));
