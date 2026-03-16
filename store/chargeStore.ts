import { create } from "zustand";

export type ChargeMethod = "qr" | "link" | "pos" | "request";
export type ChargeStep = "amount" | "qr_display" | "link_display" | "pos_display" | "request_display";

const METHOD_DISPLAY_STEP: Record<ChargeMethod, ChargeStep> = {
  qr:      "qr_display",
  link:    "link_display",
  pos:     "pos_display",
  request: "request_display",
};

interface ChargeState {
  isOpen: boolean;
  step: ChargeStep;
  amount: string;
  method: ChargeMethod;

  openWithMethod: (method: ChargeMethod) => void;
  close: () => void;
  reset: () => void;
  setStep: (step: ChargeStep) => void;
  setAmount: (amount: string) => void;
  goToDisplay: () => void;
}

export const useChargeStore = create<ChargeState>((set, get) => ({
  isOpen: false,
  step: "amount",
  amount: "",
  method: "qr",

  openWithMethod: (method) => set({ isOpen: true, step: "amount", amount: "", method }),
  close: () => set({ isOpen: false }),
  reset: () => set({ isOpen: false, step: "amount", amount: "", method: "qr" }),

  setStep: (step) => set({ step }),
  setAmount: (amount) => set({ amount }),

  goToDisplay: () => {
    const { method } = get();
    set({ step: METHOD_DISPLAY_STEP[method] });
  },
}));
