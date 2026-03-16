import { create } from "zustand";

export type KYCStep = "info" | "selfie" | "id";

const STEP_ORDER: KYCStep[] = ["info", "selfie", "id"];

interface VerificationState {
  isOpen: boolean;
  step: KYCStep;
  nombre: string;
  cedula: string;
  nacimiento: string;
  direccion: string;
  selfieImage: string | null;
  idImage: string | null;
  showKYCToast: boolean;

  open: () => void;
  close: () => void;
  kycSuccess: () => void;
  dismissKYCToast: () => void;
  next: () => void;
  back: () => void;
  setNombre: (v: string) => void;
  setCedula: (v: string) => void;
  setNacimiento: (v: string) => void;
  setDireccion: (v: string) => void;
  setSelfieImage: (v: string | null) => void;
  setIdImage: (v: string | null) => void;
}

export const useVerificationStore = create<VerificationState>((set, get) => ({
  isOpen: false,
  step: "info",
  nombre: "",
  cedula: "",
  nacimiento: "",
  direccion: "",
  selfieImage: null,
  idImage: null,
  showKYCToast: false,

  open: () => set({ isOpen: true, step: "info" }),
  close: () => set({ isOpen: false, step: "info", nombre: "", cedula: "", nacimiento: "", direccion: "", selfieImage: null, idImage: null }),
  kycSuccess: () => set({ isOpen: false, step: "info", nombre: "", cedula: "", nacimiento: "", direccion: "", selfieImage: null, idImage: null, showKYCToast: true }),
  dismissKYCToast: () => set({ showKYCToast: false }),

  next: () => {
    const { step } = get();
    const idx = STEP_ORDER.indexOf(step);
    if (idx < STEP_ORDER.length - 1) set({ step: STEP_ORDER[idx + 1] });
  },

  back: () => {
    const { step } = get();
    const idx = STEP_ORDER.indexOf(step);
    if (idx > 0) set({ step: STEP_ORDER[idx - 1] });
    else set({ isOpen: false });
  },

  setNombre: (v) => set({ nombre: v }),
  setCedula: (v) => set({ cedula: v }),
  setNacimiento: (v) => set({ nacimiento: v }),
  setDireccion: (v) => set({ direccion: v }),
  setSelfieImage: (v) => set({ selfieImage: v }),
  setIdImage: (v) => set({ idImage: v }),
}));
