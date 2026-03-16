"use client";

import React from "react";
import { StoreIcon, ChartIcon, CardIcon, CheckIcon, SettlementIcon, QrIcon, LinkIcon, PosIcon, RequestIcon } from "@/components/ui/icons";

const dashedBorder: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23D4CFC9' stroke-width='1.5' stroke-dasharray='4%2c10' stroke-linecap='round'/%3e%3c%2fsvg%3e")`,
};

const periods = ["Hoy", "Semana", "Mes"];

const data = [
  {
    ventas: "12,340", decimals: "00",
    txCount: "47", ticket: "262.55", aprobacion: "96.2%",
    methods: [
      { label: "QR",              Icon: QrIcon,      amount: "4,200.00", pct: 34 },
      { label: "Link de Pago",    Icon: LinkIcon,    amount: "3,810.00", pct: 31 },
      { label: "POS",             Icon: PosIcon,     amount: "2,930.00", pct: 24 },
      { label: "Payment Request", Icon: RequestIcon, amount: "1,400.00", pct: 11 },
    ],
  },
  {
    ventas: "84,210", decimals: "00",
    txCount: "318", ticket: "264.80", aprobacion: "97.1%",
    methods: [
      { label: "QR",              Icon: QrIcon,      amount: "28,630.00", pct: 34 },
      { label: "POS",             Icon: PosIcon,     amount: "25,260.00", pct: 30 },
      { label: "Link de Pago",    Icon: LinkIcon,    amount: "21,895.00", pct: 26 },
      { label: "Payment Request", Icon: RequestIcon, amount: "8,425.00",  pct: 10 },
    ],
  },
  {
    ventas: "341,800", decimals: "00",
    txCount: "1,274", ticket: "268.30", aprobacion: "95.8%",
    methods: [
      { label: "QR",              Icon: QrIcon,      amount: "116,212.00", pct: 34 },
      { label: "POS",             Icon: PosIcon,     amount: "102,540.00", pct: 30 },
      { label: "Link de Pago",    Icon: LinkIcon,    amount: "88,868.00",  pct: 26 },
      { label: "Payment Request", Icon: RequestIcon, amount: "34,180.00",  pct: 10 },
    ],
  },
];

export function DashboardScreen() {
  const [period, setPeriod] = React.useState(0);
  const d = data[period];

  return (
    <div className="relative w-full h-full bg-[#F5F2EE]">
      <div className="h-full overflow-y-auto">

        {/* Header */}
        <div className="px-8 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StoreIcon color="#141210" />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-[#141210]">MerchantApp</span>
          </div>
        </div>

        {/* Hero — same design as balance on homepage */}
        <div className="flex flex-col px-8 pt-16 pb-0">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95] mb-5">
            Dashboard
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-[44px] font-light tracking-[-0.035em] leading-none text-[#141210]">
              {d.ventas}<span className="text-[#C0BAB3]">,{d.decimals}</span>
            </span>
            <span className="text-[44px] font-light tracking-[-0.035em] leading-none text-[#C0BAB3]">XUY</span>
          </div>
        </div>

        {/* Period selector */}
        <div className="px-8 mt-12 flex gap-2">
          {periods.map((label, i) => (
            <button
              key={label}
              onClick={() => setPeriod(i)}
              className={`px-4 py-1.5 rounded-full text-[12px] font-medium tracking-[-0.01em] transition-colors cursor-pointer
                ${period === i ? "bg-[#141210] text-white" : "bg-[#EDE9E4] text-[#A09B95]"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Stat cards */}
        <div className="px-8 mt-6">
          <div className="grid grid-cols-2 gap-3">

            <div style={dashedBorder} className="aspect-square bg-[#F5F2EE] rounded-2xl py-5 px-4 flex flex-col justify-between text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EDE9E4]">
                <CardIcon color="#141210" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{d.txCount}</span>
                <span className="text-[11px] text-[#A09B95]">Transacciones</span>
              </div>
            </div>

            <div style={dashedBorder} className="aspect-square bg-[#F5F2EE] rounded-2xl py-5 px-4 flex flex-col justify-between text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EDE9E4]">
                <SettlementIcon color="#141210" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{d.ticket} <span className="text-[#A09B95]">XUY</span></span>
                <span className="text-[11px] text-[#A09B95]">Ticket promedio</span>
              </div>
            </div>

            <div style={dashedBorder} className="aspect-square bg-[#F5F2EE] rounded-2xl py-5 px-4 flex flex-col justify-between text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EDE9E4]">
                <CheckIcon color="#141210" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{d.aprobacion}</span>
                <span className="text-[11px] text-[#A09B95]">Aprobación</span>
              </div>
            </div>

            <div style={dashedBorder} className="aspect-square bg-[#F5F2EE] rounded-2xl py-5 px-4 flex flex-col justify-between text-left">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EDE9E4]">
                <ChartIcon color="#141210" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">+12.4%</span>
                <span className="text-[11px] text-[#A09B95]">vs período ant.</span>
              </div>
            </div>

          </div>
        </div>

        {/* Cobros por método */}
        <div className="px-8 mt-10" style={{ paddingBottom: "calc(80px + max(16px, env(safe-area-inset-bottom)) + 32px)" }}>
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95]">
            Por método
          </span>

          <div className="mt-6 flex flex-col gap-5">
            {d.methods.map(({ label, Icon, amount, pct }) => (
              <div key={label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <div style={{ transform: "scale(0.55)", display: "flex" }}>
                      <Icon color="#A09B95" />
                    </div>
                  </div>
                    <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{label}</span>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{amount}</span>
                    <span className="text-[11px] text-[#A09B95]">XUY</span>
                    <span className="text-[11px] text-[#A09B95] w-8 text-right">{pct}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-1 w-full bg-[#EDE9E4] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#A09B95] rounded-full"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
