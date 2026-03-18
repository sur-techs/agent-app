"use client";

import { CoffeeIcon } from "@/components/ui/icons";
import { AgentChatScreen } from "@/components/AgentChatScreen";

export default function Home() {
  return (
    <div className="relative w-full h-full bg-[#F5F2EE]">
      <div className="h-full overflow-y-auto">

        {/* Header */}
        <div className="px-8 pt-10 flex items-center justify-between">
          <CoffeeIcon color="#141210" />
        </div>

        {/* Agent Chat */}
        <div className="mt-12 pb-10">
          <AgentChatScreen />
        </div>

      </div>
    </div>
  );
}
