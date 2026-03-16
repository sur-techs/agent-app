"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

type Step = "goal" | "inv" | "action" | "req";
type Phase = "write" | "shimmer";

// --- Word-by-word fade in ---
function FadeWords({ text, speed = 120, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    let i = 0;
    const tick = () => {
      i++;
      setCount(i);
      if (i < words.length) timer = setTimeout(tick, speed);
      else onDone?.();
    };
    let timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [text]);

  return (
    <span>
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: idx < count ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {word}{idx < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}

const FADE = { duration: 0.5, ease: "easeInOut" };
const GOAL_TEXT   = "Monitor ingredient inventory and detect supply shortages affecting daily operations";
const ACTION_TEXT = "Inventory scan completed";
const REQ_TEXT    = "Initiate supply restocking process";

const NEXT_STEP: Partial<Record<Step, Step>> = {
  goal:   "inv",
  inv:    "action",
  action: "req",
};

// --- Row ---
function Row({ label, value, shimmer }: { label: string; value: string; shimmer?: boolean }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className={`text-[13px] font-normal tracking-[-0.01em] ${shimmer ? "shimmer-text" : "text-[#141210]"}`}>{label}</span>
      <span className={`text-[13px] font-normal ml-4 shrink-0 ${shimmer ? "shimmer-text" : "text-[#A09B95]"}`}>{value}</span>
    </div>
  );
}

// --- Screen ---
export function AgentChatScreen() {
  const [agentVisible, setAgentVisible] = useState(false);
  const [step, setStep]   = useState<Step | null>(null);
  const [phase, setPhase] = useState<Phase>("write");

  const advance = () => {
    const next = step ? NEXT_STEP[step] : undefined;
    if (next) { setStep(next); setPhase("write"); }
  };

  // On write done → shimmer; after 3s → next step
  const onWriteDone = () => {
    setPhase("shimmer");
    setTimeout(advance, 3000);
  };

  // inv has no writing phase — shimmer immediately on mount
  useEffect(() => {
    if (step === "inv" && phase === "write") onWriteDone();
  }, [step, phase]);

  // Start sequence
  useEffect(() => {
    const t1 = setTimeout(() => setAgentVisible(true), 500);
    const t2 = setTimeout(() => setStep("goal"),        1200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="px-8 flex flex-col gap-5">

      {agentVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={FADE}>
          <span className="font-mono text-[11px] tracking-[0.04em] text-[#8B2020]">CoffeeShopAgent</span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">

        {step === "goal" && (
          <motion.div key="goal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE}>
            {phase === "shimmer" ? (
              <p className="shimmer-text text-[13px] font-normal tracking-[-0.01em] leading-[1.5]">{GOAL_TEXT}</p>
            ) : (
              <p className="text-[13px] font-normal tracking-[-0.01em] text-[#141210] leading-[1.5]">
                <FadeWords text={GOAL_TEXT} speed={100} onDone={onWriteDone} />
              </p>
            )}
          </motion.div>
        )}

        {step === "inv" && (
          <motion.div key="inv" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <span className={`text-[13px] font-normal tracking-[-0.01em] ${phase === "shimmer" ? "shimmer-text" : "text-[#141210]"}`}>Inventory scan results</span>
              <div className="flex flex-col gap-1.5">
                <Row label="Coffee beans (house espresso blend)" value="1.2 kg" shimmer={phase === "shimmer"} />
                <Row label="Whole milk" value="6 L"               shimmer={phase === "shimmer"} />
                <Row label="Oat milk" value="2 L"                 shimmer={phase === "shimmer"} />
                <Row label="Sugar packets" value="120"            shimmer={phase === "shimmer"} />
                <Row label="Lids for takeaway cups" value="80"    shimmer={phase === "shimmer"} />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className={`text-[13px] font-normal tracking-[-0.01em] ${phase === "shimmer" ? "shimmer-text" : "text-[#141210]"}`}>Minimum operating thresholds</span>
              <div className="flex flex-col gap-1.5">
                <Row label="Coffee beans" value="5 kg"        shimmer={phase === "shimmer"} />
                <Row label="Whole milk" value="20 L"          shimmer={phase === "shimmer"} />
                <Row label="Oat milk" value="10 L"            shimmer={phase === "shimmer"} />
                <Row label="Sugar packets" value="500 units"  shimmer={phase === "shimmer"} />
                <Row label="Cup lids" value="300 units"       shimmer={phase === "shimmer"} />
              </div>
            </div>
          </motion.div>
        )}

        {step === "action" && (
          <motion.div key="action" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE}>
            {phase === "shimmer" ? (
              <p className="shimmer-text text-[13px] font-normal tracking-[-0.01em]">{ACTION_TEXT}</p>
            ) : (
              <p className="text-[13px] font-normal tracking-[-0.01em] text-[#141210]">
                <FadeWords text={ACTION_TEXT} speed={130} onDone={onWriteDone} />
              </p>
            )}
          </motion.div>
        )}

        {step === "req" && (
          <motion.div key="req" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE}>
            {phase === "shimmer" ? (
              <p className="shimmer-text text-[13px] font-normal tracking-[-0.01em]">{REQ_TEXT}</p>
            ) : (
              <p className="text-[13px] font-normal tracking-[-0.01em] text-[#141210]">
                <FadeWords text={REQ_TEXT} speed={130} onDone={onWriteDone} />
              </p>
            )}
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
