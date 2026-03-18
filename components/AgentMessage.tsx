"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Transition } from "motion/react";

// --- Types ---

export type TextStep = {
  type: "text";
  content: string;
  speed?: number;
};

export type ListRow =
  | { header: true;     label: string; value?: never; paragraph?: never }
  | { paragraph: true;  label: string; value?: never; header?: never    }
  | { label: string;    value?: string; header?: never; paragraph?: never };

export type ListStep = {
  type: "list";
  rows: ListRow[];
  rowDelay?: number;
};

export type PaymentWidgetData = {
  payer: string;
  recipient: string;
  amount: string;
  reference: string;
};

export type WidgetStep = {
  type: "widget";
  widget: "payment";
  data: PaymentWidgetData;
};

export type AgentStep = TextStep | ListStep | WidgetStep;

export type ConfirmData = {
  amount: string;
  recipient: string;
  reference: string;
};

export type FooterItem = {
  icon: "attachment" | "http" | "check";
  label: string;
  code?: string;
  sublabel?: string;
  loading?: boolean;
  confirm?: boolean;
  confirmData?: ConfirmData;
};

export interface AgentMessageData {
  name: string;
  steps: AgentStep[];
  footer?: FooterItem[];
}

// --- Internals ---

const FADE: Transition = { duration: 0.5, ease: "easeInOut" as const };

function FadeWords({ text, speed = 60, onDone }: { text: string; speed?: number; onDone?: () => void }) {
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

function Row({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-[13px] font-normal tracking-[-0.01em] text-[#141210]">{label}</span>
      {value && <span className="text-[13px] font-normal text-[#A09B95] ml-4 shrink-0">{value}</span>}
    </div>
  );
}

function ListStepView({ step, onDone }: { step: ListStep; onDone: () => void }) {
  const [count, setCount] = useState(0);
  const delay = step.rowDelay ?? 110;

  useEffect(() => {
    let i = 0;
    const tick = () => {
      i++;
      setCount(i);
      if (i < step.rows.length) timer = setTimeout(tick, delay);
      else onDone();
    };
    let timer = setTimeout(tick, delay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE} className="flex flex-col gap-1.5">
      {step.rows.map((row, idx) =>
        idx < count ? (
          <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
            {row.header ? (
              <span className={`text-[13px] font-normal tracking-[-0.01em] text-[#141210] block ${idx > 0 ? "mt-3" : ""}`}>
                {row.label}
              </span>
            ) : row.paragraph ? (
              <p className="text-[13px] font-normal tracking-[-0.01em] text-[#141210] leading-[1.5]">
                {row.label}
              </p>
            ) : (
              <Row label={row.label} value={row.value} />
            )}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
}

// --- Payment Widget ---
function PaymentWidget({ data, onDone }: { data: PaymentWidgetData; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={FADE}
      className="flex flex-col gap-1.5"
    >
      {[
        { label: "Amount",    value: data.amount    },
        { label: "Payer",     value: data.payer     },
        { label: "Recipient", value: data.recipient },
        { label: "Reference", value: data.reference },
      ].map(({ label, value }) => (
        <div key={label} className="flex items-baseline justify-between">
          <span className="text-[13px] text-[#A09B95] tracking-[-0.01em]">{label}</span>
          <span className="text-[13px] font-normal tracking-[-0.01em] text-[#141210]">{value}</span>
        </div>
      ))}

    </motion.div>
  );
}

// --- Payment Confirm Sheet ---

function PaymentConfirmSheet({ data, onConfirm }: { data: ConfirmData; onConfirm: () => void }) {
  const shell = typeof document !== "undefined" ? (document.getElementById("mobile-shell") ?? document.body) : null;
  if (!shell) return null;
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="absolute inset-0 z-50 flex items-end"
    >
      <div className="absolute inset-0 bg-black/20" />
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full px-4 pb-4"
      >
      <div className="w-full bg-[#F5F2EE] rounded-2xl px-5 pt-5 pb-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95]">Payment request</span>
          <span className="text-[32px] font-light tracking-[-0.03em] text-[#141210] leading-none mt-2">{data.amount}</span>
        </div>

        <div className="flex flex-col gap-2">
          {[
            { label: "To",        value: data.recipient },
            { label: "Reference", value: data.reference },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline justify-between">
              <span className="text-[13px] text-[#A09B95] tracking-[-0.01em]">{label}</span>
              <span className="text-[13px] text-[#141210] tracking-[-0.01em]">{value}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onConfirm}
          className="w-full bg-[#141210] text-[#F5F2EE] text-[14px] font-medium tracking-[-0.01em] rounded-xl py-4 cursor-pointer"
        >
          Confirm payment
        </button>
      </div>
      </motion.div>
    </motion.div>,
    shell
  );
}

// --- AgentMessage ---

export function AgentMessage({ data, onComplete, delay = 0 }: { data: AgentMessageData; onComplete?: () => void; delay?: number }) {
  const [agentVisible, setAgentVisible] = useState(false);
  const [stepIdx, setStepIdx] = useState<number | null>(null);
  const [isDone, setIsDone] = useState(false);
  const [footerCount, setFooterCount] = useState(0);
  const [resolvedLoading, setResolvedLoading] = useState<Set<number>>(new Set());
  const [showConfirmSheet, setShowConfirmSheet] = useState(false);
  const [confirmSheetData, setConfirmSheetData] = useState<ConfirmData | null>(null);
  const [pendingConfirmIdx, setPendingConfirmIdx] = useState<number | null>(null);
  const footerIdxRef = useRef(0);
  const advanceFooterRef = useRef<() => void>(() => {});
  const stepIdxRef = useRef<number | null>(null);

  const advance = () => {
    const current = stepIdxRef.current;
    if (current === null) return;
    if (current + 1 < data.steps.length) {
      setStepIdx(current + 1);
    } else {
      setIsDone(true);
    }
  };
  const onDone = () => setTimeout(advance, 1500);

  useEffect(() => {
    const t1 = setTimeout(() => setAgentVisible(true), delay + 250);
    const t2 = setTimeout(() => setStepIdx(0),         delay + 600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  advanceFooterRef.current = () => {
    const items = data.footer ?? [];
    const i = footerIdxRef.current;
    if (i >= items.length) { setTimeout(() => onComplete?.(), 400); return; }
    footerIdxRef.current = i + 1;
    setFooterCount(i + 1);
    const item = items[i];
    if (item.confirm) {
      setConfirmSheetData(item.confirmData ?? null);
      setPendingConfirmIdx(i);
    } else if (item.loading) {
      setTimeout(() => {
        setResolvedLoading(prev => new Set([...prev, i]));
        setTimeout(() => advanceFooterRef.current(), 300);
      }, 5000);
    } else {
      setTimeout(() => advanceFooterRef.current(), 400);
    }
  };

  const handleOpenSheet = (i: number) => {
    setShowConfirmSheet(true);
    setPendingConfirmIdx(i);
  };

  const handleConfirm = () => {
    const i = pendingConfirmIdx!;
    setShowConfirmSheet(false);
    setPendingConfirmIdx(null);
    setResolvedLoading(prev => new Set([...prev, i]));
    setTimeout(() => advanceFooterRef.current(), 500);
  };

  useEffect(() => {
    if (!isDone) return;
    const items = data.footer ?? [];
    if (items.length === 0) { setTimeout(() => onComplete?.(), 0); return; }
    setTimeout(() => advanceFooterRef.current(), 300);
  }, [isDone]);

  stepIdxRef.current = stepIdx;
  const currentStep = stepIdx !== null ? data.steps[stepIdx] : null;

  return (
    <div className="px-8 flex flex-col gap-3">

      {agentVisible && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={FADE}>
          <span className="font-mono text-[11px] tracking-[0.04em] text-[#8B2020]">{data.name}</span>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {currentStep && (
          currentStep.type === "text" ? (
            <motion.div key={stepIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={FADE}>
              <p className="text-[13px] font-normal tracking-[-0.01em] text-[#141210] leading-[1.5]">
                <FadeWords text={currentStep.content} speed={currentStep.speed ?? 55} onDone={onDone} />
              </p>
            </motion.div>
          ) : currentStep.type === "widget" ? (
            <PaymentWidget key={stepIdx} data={currentStep.data} onDone={onDone} />
          ) : (
            <ListStepView key={stepIdx} step={currentStep} onDone={onDone} />
          )
        )}
      </AnimatePresence>

      {data.footer && (
        <div className="flex flex-col gap-2">
          {data.footer.slice(0, footerCount).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={FADE}
              className={`flex items-center gap-1.5 ${item.confirm && pendingConfirmIdx === i ? "cursor-pointer group" : ""}`}
              onClick={item.confirm && pendingConfirmIdx === i ? () => handleOpenSheet(i) : undefined}
            >
              <AnimatePresence mode="wait">
                {item.confirm && pendingConfirmIdx === i ? (
                  <motion.div key="exclamation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8B2020" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  </motion.div>
                ) : item.loading && !resolvedLoading.has(i) && !item.confirm ? (
                  <motion.div key="spinner" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="shrink-0">
                    <motion.svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B95" strokeWidth="1.8" strokeLinecap="round" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" as const }}>
                      <path d="M22 12a10 10 0 1 1-10-10" />
                    </motion.svg>
                  </motion.div>
                ) : item.icon === "attachment" ? (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B95" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                    </svg>
                  </motion.div>
                ) : item.icon === "check" ? (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B95" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </motion.div>
                ) : (
                  <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#A09B95" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="flex flex-col gap-0.5">
                <span className={`text-[13px] font-normal tracking-[-0.01em] flex items-center gap-1.5 flex-wrap ${item.confirm && pendingConfirmIdx === i ? "shimmer-text group-hover:underline" : "text-[#A09B95]"}`}>
                  {item.confirm
                    ? resolvedLoading.has(i)
                      ? `${item.label} — Approved`
                      : `${item.label} — Open to approve`
                    : item.label}
                  {item.code && (
                    <code className="font-mono text-[11px] tracking-tight text-[#8B2020] bg-[#E8E4DF] px-1.5 py-0.5 rounded">
                      {item.code}
                    </code>
                  )}
                </span>
                {item.sublabel && (
                  <span className="text-[11px] font-normal tracking-[0.01em] text-[#C4BFBB]">{item.sublabel}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {showConfirmSheet && confirmSheetData && (
          <PaymentConfirmSheet data={confirmSheetData} onConfirm={handleConfirm} />
        )}
      </AnimatePresence>

    </div>
  );
}
