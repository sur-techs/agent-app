"use client";

import React from "react";
import { StoreIcon, UserIcon, QrIcon, LinkIcon, PosIcon, RequestIcon } from "@/components/ui/icons";
import { useChargeStore, ChargeMethod } from "@/store/chargeStore";


const recentSales = [
  { id: 1, method: "QR", amount: "+180.00", time: "Hace 3 min" },
  { id: 2, method: "Link de Pago", amount: "+450.00", time: "Hace 12 min" },
  { id: 3, method: "POS", amount: "+1,200.00", time: "Hace 25 min" },
  { id: 4, method: "QR", amount: "+320.00", time: "Hace 40 min" },
  { id: 5, method: "POS", amount: "+89.00", time: "Hace 1 hr" },
  { id: 6, method: "Link de Pago", amount: "+2,100.00", time: "Hace 1.5 hr" },
];

const dashedBorder: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='16' ry='16' stroke='%23D4CFC9' stroke-width='1.5' stroke-dasharray='4%2c10' stroke-linecap='round'/%3e%3c%2fsvg%3e")`,
};

const methods: { id: ChargeMethod; title: string; subtitle: string; Icon: typeof QrIcon }[] = [
  { id: "qr",      title: "Generar QR",       subtitle: "Cobra con código", Icon: QrIcon      },
  { id: "link",    title: "Link de Pago",      subtitle: "Comparte tu link", Icon: LinkIcon    },
  { id: "pos",     title: "POS",               subtitle: "Terminal de cobro", Icon: PosIcon    },
  { id: "request", title: "Payment Request",   subtitle: "Solicita un pago", Icon: RequestIcon },
];

export function HomeScreen({ onProfileClick }: { onProfileClick: () => void }) {
  const openWithMethod = useChargeStore((s) => s.openWithMethod);

  return (
    <div className="relative w-full h-full bg-[#F5F2EE]">
      {/* Scrollable content */}
      <div className="h-full overflow-y-auto">
        {/* Logo */}
        <div className="px-8 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StoreIcon color="#141210" />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-[#141210]">MerchantApp</span>
          </div>
          <button onClick={onProfileClick} className="cursor-pointer">
            <UserIcon color="#141210" />
          </button>
        </div>

        {/* Balance Section */}
        <div className="flex flex-col justify-end px-8 pt-16 pb-0">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95] mb-5">
            Overview
          </span>
          <span className="text-[44px] font-light tracking-[-0.035em] leading-none text-[#141210]">
            Cafe La Barra
          </span>
        </div>

        {/* Method Cards */}
        <div className="px-8 mt-12">
          <div className="grid grid-cols-2 gap-3">
            {methods.map(({ id, title, subtitle, Icon }) => (
              <button
                key={id}
                onClick={() => openWithMethod(id)}
                style={dashedBorder}
                className="aspect-square bg-[#F5F2EE] rounded-2xl py-5 px-4 flex flex-col justify-between text-left active:scale-[0.97] transition-transform cursor-pointer"
              >
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#EDE9E4]">
                  <Icon color="#141210" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[13px] font-medium tracking-[-0.01em] text-[#141210]">{title}</span>
                  <span className="text-[11px] text-[#A09B95]">{subtitle}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Sales */}
        <div className="flex flex-col px-8 mt-12" style={{ paddingBottom: "calc(80px + max(16px, env(safe-area-inset-bottom)) + 32px)" }}>
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95] mb-7">
            Actividad reciente
          </span>
          {recentSales.map((sale) => (
            <div
              key={sale.id}
              className="flex items-start justify-between mb-7"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[13px] font-normal tracking-[-0.01em] text-[#141210]">
                  {sale.method}
                </span>
                <span className="text-[11px] font-normal text-[#C0BAB3]">
                  {sale.time}
                </span>
              </div>
              <span className="text-[13px] font-normal tracking-[-0.01em] text-[#2A6041]">
                {sale.amount}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
