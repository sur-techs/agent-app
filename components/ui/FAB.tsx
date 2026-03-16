"use client";

import { Plus } from "./icons";

export function FAB() {
  return (
    <div
      className="absolute right-6 z-30"
      style={{ bottom: "calc(max(16px, env(safe-area-inset-bottom)) + 16px)" }}
    >
      <button
        className="w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg cursor-pointer transition-transform active:scale-95"
      >
        <Plus color="white" />
      </button>
    </div>
  );
}
