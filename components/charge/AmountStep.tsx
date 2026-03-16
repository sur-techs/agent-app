"use client";

import { useChargeStore } from "@/store/chargeStore";
import { Button } from "@/components/ui/Button";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "⌫"],
];

function NumPad({ onKey }: { onKey: (key: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-y-1 px-6">
      {KEYS.map((row, r) =>
        row.map((key) => (
          <button
            key={`${r}-${key}`}
            onClick={() => onKey(key)}
            className="h-14 flex items-center justify-center rounded-2xl active:bg-[#F5F2EE] transition-colors cursor-pointer"
          >
            {key === "⌫" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#141210" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />
                <line x1="18" y1="9" x2="13" y2="14" />
                <line x1="13" y1="9" x2="18" y2="14" />
              </svg>
            ) : (
              <span className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
                {key}
              </span>
            )}
          </button>
        ))
      )}
    </div>
  );
}

export function AmountStep() {
  const { amount, setAmount, goToDisplay } = useChargeStore();

  const hasAmount = amount.length > 0 && parseFloat(amount) > 0;

  const handleKey = (key: string) => {
    if (key === "⌫") {
      setAmount(amount.slice(0, -1));
      return;
    }
    if (key === ".") {
      if (amount.includes(".")) return;
      setAmount((amount || "0") + ".");
      return;
    }
    const next = amount === "0" ? key : amount + key;
    const parts = next.split(".");
    if (parts[1]?.length > 2) return;
    if (parts[0].length > 7) return;
    setAmount(next);
  };

  const display = amount || "0";

  return (
    <div className="flex flex-col overflow-hidden">
      {/* Amount display */}
      <div className="flex items-baseline justify-center gap-2 px-6 pt-4 pb-6">
        <span
          className={`text-[56px] font-light tracking-[-0.035em] leading-none transition-colors ${
            hasAmount ? "text-[#141210]" : "text-[#C0BAB3]"
          }`}
        >
          {display}
        </span>
        <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#C0BAB3]">
          XUY
        </span>
      </div>

      <NumPad onKey={handleKey} />

      <div className="px-6 pt-4 pb-10 shrink-0">
        <Button label="Continuar" onClick={goToDisplay} disabled={!hasAmount} />
      </div>
    </div>
  );
}
