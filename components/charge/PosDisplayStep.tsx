"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useChargeStore } from "@/store/chargeStore";
import { Button } from "@/components/ui/Button";

type PosState = "waiting" | "processing" | "approved";

export function PosDisplayStep() {
  const { amount, reset } = useChargeStore();
  const [posState, setPosState] = useState<PosState>("waiting");

  const [whole, decimals] = amount.split(".");

  useEffect(() => {
    setPosState("waiting");
  }, []);

  const handleSimulate = () => {
    setPosState("processing");
    setTimeout(() => setPosState("approved"), 2500);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Title */}
      <div className="pt-7 pb-2 flex justify-center shrink-0">
        <span className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
          Terminal POS
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-baseline justify-center gap-2 py-5 shrink-0">
        <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#141210]">
          {whole}<span className="text-[#C0BAB3]">,{decimals ?? "00"}</span>
        </span>
        <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#C0BAB3]">
          XUY
        </span>
      </div>

      {/* Waves area */}
      <div className="flex-1 flex flex-col items-center justify-center gap-8 py-8">
        <div className="w-48 h-48 flex items-center justify-center relative overflow-visible">

          {/* Ripple waves — exit-fade when leaving waiting */}
          <AnimatePresence>
            {posState === "waiting" && [0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="rounded-full"
                style={{
                  width: 48,
                  height: 48,
                  position: "absolute",
                  borderWidth: 0.75,
                  borderStyle: "solid",
                  borderColor: "#EDE9E4",
                }}
                animate={{ scale: [0.8, 5.5], opacity: [0, 0.8, 0] }}
                exit={{ opacity: 0, transition: { duration: 0.4 } }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: i * 0.8,
                  times: [0, 0.15, 1],
                }}
              />
            ))}
          </AnimatePresence>

          {/* Center icon — spinner or checkmark */}
          <AnimatePresence mode="wait">
            {posState === "processing" && (
              <motion.div
                key="spinner"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute"
              >
                <motion.div
                  className="w-10 h-10 rounded-full border-2 border-[#E8E4DF] border-t-[#141210]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            )}

            {posState === "approved" && (
              <motion.div
                key="check"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="absolute"
              >
                <div className="w-14 h-14 rounded-full bg-[#22C55E] flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4 11 9 16 18 6" />
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* Status label */}
        <AnimatePresence mode="wait">
          <motion.span
            key={posState}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="text-[14px] font-medium tracking-[-0.01em] text-[#141210]"
          >
            {posState === "waiting" && "Acercá la tarjeta"}
            {posState === "processing" && "Procesando pago"}
            {posState === "approved" && "Pago aprobado"}
          </motion.span>
        </AnimatePresence>

      </div>

      {/* Footer */}
      <div className="px-6 pb-10 pt-4 shrink-0">
        {posState === "approved" ? (
          <Button label="Cerrar" onClick={reset} showIcon={false} />
        ) : (
          <Button
            label="Simular cobro"
            onClick={handleSimulate}
            disabled={posState === "processing"}
            showIcon={false}
          />
        )}
      </div>

    </div>
  );
}
