"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useChargeStore } from "@/store/chargeStore";
import { Button } from "@/components/ui/Button";

type RequestState = "idle" | "sending" | "sent";

function Spinner() {
  return (
    <motion.div
      className="w-5 h-5 rounded-full border-2 border-white/40 border-t-white"
      animate={{ rotate: 360 }}
      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
    />
  );
}

export function RequestDisplayStep() {
  const { amount, reset } = useChargeStore();
  const [recipient, setRecipient] = useState("");
  const [reqState, setReqState] = useState<RequestState>("idle");

  const [whole, decimals] = amount.split(".");

  const canSend = recipient.trim().length > 0;

  const handleSend = () => {
    if (!canSend) return;
    setReqState("sending");
    setTimeout(() => setReqState("sent"), 1800);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Title */}
      <div className="pt-7 pb-2 flex justify-center shrink-0">
        <span className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
          Payment Request
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

      {/* Content area — form or success */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>

          {/* Form */}
          {reqState !== "sent" && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col flex-1 px-6 pt-4"
            >
              <div className="bg-[#F5F2EE] rounded-2xl px-4 py-3.5 flex items-center gap-3">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A09B95" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <input
                  type="text"
                  placeholder="Ingresá el ID#XUY"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  className="flex-1 bg-transparent text-[13px] font-medium text-[#141210] placeholder:text-[#C0BAB3] tracking-[-0.01em] outline-none"
                />
              </div>

              <div className="flex-1" />
            </motion.div>
          )}

          {/* Sent */}
          {reqState === "sent" && (
            <motion.div
              key="sent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="flex-1 flex flex-col items-center justify-center gap-5 px-6"
            >
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="w-14 h-14 rounded-full bg-[#22C55E] flex items-center justify-center"
              >
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="4 11 9 16 18 6" />
                </svg>
              </motion.div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[16px] font-medium tracking-[-0.02em] text-[#141210]">
                  Solicitud enviada
                </span>
                <span className="text-[13px] text-[#A09B95] tracking-[-0.01em]">
                  {recipient}
                </span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="px-6 pb-10 pt-8 shrink-0">
        {reqState === "sent" ? (
          <Button label="Cerrar" onClick={reset} showIcon={false} />
        ) : (
          <button
            onClick={handleSend}
            disabled={!canSend || reqState === "sending"}
            className={`w-full h-14 rounded-2xl flex items-center justify-center transition-opacity bg-black text-white
              ${!canSend || reqState === "sending" ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
          >
            {reqState === "sending" ? (
              <Spinner />
            ) : (
              <span className="text-[15px] font-medium tracking-[-0.01em]">Enviar solicitud</span>
            )}
          </button>
        )}
      </div>

    </div>
  );
}
