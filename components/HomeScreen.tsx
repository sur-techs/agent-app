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

      </div>
    </div>
  );
}
