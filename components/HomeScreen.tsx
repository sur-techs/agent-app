"use client";

import { StoreIcon, UserIcon } from "@/components/ui/icons";


export function HomeScreen({ onProfileClick }: { onProfileClick: () => void }) {
  return (
    <div className="relative w-full h-full bg-[#F5F2EE]">
      <div className="h-full overflow-y-auto">
        {/* Header */}
        <div className="px-8 pt-10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <StoreIcon color="#141210" />
            <span className="text-[15px] font-medium tracking-[-0.01em] text-[#141210]">MerchantApp</span>
          </div>
          <button onClick={onProfileClick} className="cursor-pointer">
            <UserIcon color="#141210" />
          </button>
        </div>

        {/* Overview */}
        <div className="flex flex-col justify-end px-8 pt-16 pb-0">
          <span className="text-[11px] font-medium tracking-[0.1em] uppercase text-[#A09B95] mb-5">
            Overview
          </span>
          <span className="text-[44px] font-light tracking-[-0.035em] leading-none text-[#141210]">
            Cafe La Barra
          </span>
        </div>

      </div>
    </div>
  );
}
