"use client";

import { AnimatePresence, motion } from "motion/react";
import { useChargeStore, ChargeStep, ChargeMethod } from "@/store/chargeStore";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { AmountStep } from "./AmountStep";
import { QrDisplayStep } from "./QrDisplayStep";
import { LinkDisplayStep } from "./LinkDisplayStep";
import { PosDisplayStep } from "./PosDisplayStep";
import { RequestDisplayStep } from "./RequestDisplayStep";

const METHOD_TITLES: Record<ChargeMethod, string> = {
  qr:      "Generar QR",
  link:    "Link de Pago",
  pos:     "POS",
  request: "Payment Request",
};

export function ChargeSheet() {
  const { isOpen, step, method, close } = useChargeStore();

  const showTitle = step === "amount";

  return (
    <BottomSheet isOpen={isOpen} onClose={close} height="auto">
      <div className="flex flex-col flex-1 overflow-hidden">

        {showTitle && step === "amount" && (
          <div className="px-6 pb-4 pt-7 shrink-0 flex justify-center">
            <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
              {METHOD_TITLES[method]}
            </h2>
          </div>
        )}

        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {step === "amount" && <AmountStep />}
            {step === "qr_display" && <QrDisplayStep />}
            {step === "link_display" && <LinkDisplayStep />}
            {step === "pos_display" && <PosDisplayStep />}
            {step === "request_display" && <RequestDisplayStep />}
          </motion.div>
        </AnimatePresence>

      </div>
    </BottomSheet>
  );
}
