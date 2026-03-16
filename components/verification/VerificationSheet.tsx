"use client";

import { AnimatePresence, motion } from "motion/react";
import { useVerificationStore, KYCStep } from "@/store/verificationStore";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { ArrowLeft } from "@/components/ui/icons";
import { InfoStep } from "./InfoStep";
import { SelfieStep } from "./SelfieStep";
import { IDStep } from "./IDStep";

const STEPS: KYCStep[] = ["info", "selfie", "id"];

const STEP_TITLES: Record<KYCStep, string> = {
  info: "Verificación",
  selfie: "Selfie",
  id: "Tu cédula",
};

export function VerificationSheet() {
  const { isOpen, step, back } = useVerificationStore();
  const stepIndex = STEPS.indexOf(step);

  return (
    <BottomSheet isOpen={isOpen} onClose={back} height="auto">
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-2 pb-3 shrink-0">
          {/* Circle back button */}
          <button
            onClick={back}
            className="w-8 h-8 rounded-full bg-[#F5F2EE] flex items-center justify-center cursor-pointer shrink-0"
          >
            <ArrowLeft color="#141210" />
          </button>

          {/* Step dots — right aligned */}
          <div className="flex items-center gap-1.5">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === stepIndex ? 20 : 6,
                  height: 6,
                  background: i <= stepIndex ? "#141210" : "#DDD8D2",
                }}
              />
            ))}
          </div>
        </div>

        {/* Title — left aligned, below the nav row */}
        <div className="px-6 pb-4 pt-7 shrink-0">
          <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
            {STEP_TITLES[step]}
          </h2>
        </div>

        {/* Animated step content */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col flex-1 overflow-hidden"
          >
            {step === "info" && <InfoStep />}
            {step === "selfie" && <SelfieStep />}
            {step === "id" && <IDStep />}
          </motion.div>
        </AnimatePresence>

      </div>
    </BottomSheet>
  );
}
