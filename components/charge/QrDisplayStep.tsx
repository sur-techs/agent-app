"use client";

import { useChargeStore } from "@/store/chargeStore";
import { Button } from "@/components/ui/Button";

function QrCode() {
  const size = 210;
  const cellSize = size / 9;

  const pattern = [
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1],
    [0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0,1],
    [0,0,0,0,0,0,0,0,0],
    [1,1,1,0,1,0,1,1,1],
    [1,0,1,0,0,0,1,0,1],
    [1,1,1,0,1,0,1,1,1],
  ];

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {pattern.map((row, y) =>
        row.map((cell, x) =>
          cell ? (
            <rect
              key={`${x}-${y}`}
              x={x * cellSize}
              y={y * cellSize}
              width={cellSize}
              height={cellSize}
              rx={2}
              fill="#141210"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export function QrDisplayStep() {
  const { amount, reset } = useChargeStore();

  const [whole, decimals] = amount.split(".");

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Title */}
      <div className="pt-7 pb-8 flex justify-center shrink-0">
        <span className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
          QR Generado
        </span>
      </div>

      {/* Amount + QR */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        <div className="flex items-baseline gap-2">
          <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#141210]">
            {whole}<span className="text-[#C0BAB3]">,{decimals ?? "00"}</span>
          </span>
          <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#C0BAB3]">
            XUY
          </span>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-[0_1px_4px_rgba(0,0,0,0.06)]">
          <QrCode />
        </div>
      </div>

      {/* Footer hint — equal spacing above and below */}
      <div className="py-6 flex justify-center shrink-0">
        <span className="text-[12px] font-normal text-[#C0BAB3] tracking-[-0.01em]">
          Mostrá este código para cobrar
        </span>
      </div>

      <div className="px-6 pb-10 shrink-0">
        <Button label="Cerrar" onClick={reset} showIcon={false} />
      </div>
    </div>
  );
}
