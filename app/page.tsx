"use client";

import { HomeScreen } from "@/components/HomeScreen";
import { DashboardScreen } from "@/components/DashboardScreen";
import { ChargeSheet } from "@/components/charge/ChargeSheet";
import { VerificationSheet } from "@/components/verification/VerificationSheet";
import { SuccessToast } from "@/components/ui/SuccessToast";
import { FAB } from "@/components/ui/FAB";
import { HomeIcon, ChartIcon } from "@/components/ui/icons";
import { useVerificationStore } from "@/store/verificationStore";
import { useNavStore } from "@/store/navStore";
import type { Page } from "@/store/navStore";

const navItems: { id: Page; Icon: typeof HomeIcon }[] = [
  { id: "home",      Icon: HomeIcon  },
  { id: "dashboard", Icon: ChartIcon },
];

export default function Home() {
  const openVerification = useVerificationStore((s) => s.open);
  const page = useNavStore((s) => s.page);
  const setPage = useNavStore((s) => s.setPage);

  return (
    <div className="relative w-full h-full">
      <div className="relative w-full h-full bg-[#F5F2EE]">
        {page === "home"      && <HomeScreen onProfileClick={openVerification} />}
        {page === "dashboard" && <DashboardScreen />}

        {/* Bottom Nav */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-12 pointer-events-none bg-gradient-to-t from-[#F5F2EE] to-transparent" />
          <div className="flex flex-col bg-[#F5F2EE]">
            <div className="flex items-center justify-between px-4 h-20">
              <div className="flex items-center">
                {navItems.map(({ id, Icon }) => {
                  const active = page === id;
                  return (
                    <button
                      key={id}
                      onClick={() => setPage(id)}
                      className="w-12 h-12 flex items-center justify-center cursor-pointer"
                    >
                      <Icon color={active ? "#141210" : "#C0BAB3"} />
                    </button>
                  );
                })}
              </div>
              <div className="w-12" />
            </div>
            <div style={{ height: "max(16px, env(safe-area-inset-bottom))" }} />
          </div>
        </div>
      </div>

      <SuccessToast />
      <FAB />
      <ChargeSheet />
      <VerificationSheet />
    </div>
  );
}
