"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVerificationStore } from "@/store/verificationStore";

export function SuccessToast() {
  const { showKYCToast, dismissKYCToast } = useVerificationStore();

  useEffect(() => {
    if (!showKYCToast) return;
    const timer = setTimeout(() => dismissKYCToast(), 5000);
    return () => clearTimeout(timer);
  }, [showKYCToast, dismissKYCToast]);

  return (
    <AnimatePresence>
      {showKYCToast && (
        <motion.div
          key="kyc-toast"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute top-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5 bg-white text-[#141210] px-3 py-1.5 rounded-full whitespace-nowrap"
        >
          <span className="text-[11px]">👍</span>
          <span className="text-[11px] font-normal tracking-[-0.01em]">
            Verificación exitosa
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
