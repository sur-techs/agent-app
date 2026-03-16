"use client";

import { ArrowRight } from "./icons";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  showIcon?: boolean;
}

export function Button({ label, onClick, disabled = false, showIcon = true }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-14 rounded-2xl flex items-center justify-center gap-2.5 transition-opacity
        ${disabled ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
        bg-black text-white`}
    >
      <span className="text-[15px] font-medium tracking-[-0.01em]">{label}</span>
      {showIcon && <ArrowRight />}
    </button>
  );
}
