"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect } from "react";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | "auto";
}

export function BottomSheet({
  isOpen,
  onClose,
  children,
  height = 500,
}: BottomSheetProps) {
  const isAuto = height === "auto";

  // Lock background scroll when open.
  useEffect(() => {
    if (!isOpen) return;
    const shell = document.getElementById("mobile-shell");
    if (!shell) return;
    const scrollables = shell.querySelectorAll<HTMLElement>(".overflow-y-auto");
    scrollables.forEach((el) => (el.style.overflow = "hidden"));
    return () => {
      scrollables.forEach((el) => (el.style.overflow = ""));
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Scrim */}
          <motion.div
            key="scrim"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-40"
            style={{ backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            key="sheet"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 500, damping: 42, mass: 0.8 }}
            className="absolute left-4 right-4 bottom-4 bg-white rounded-[24px] z-50 flex flex-col overflow-hidden shadow-[0_-4px_24px_rgba(0,0,0,0.06)]"
            style={isAuto ? {} : { height }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3.5 pb-2 shrink-0">
              <div className="w-9 h-1 rounded-full bg-[#DDD8D2]" />
            </div>

            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
