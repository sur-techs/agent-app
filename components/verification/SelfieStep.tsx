"use client";

import { useRef } from "react";
import { useVerificationStore } from "@/store/verificationStore";
import { Button } from "@/components/ui/Button";

export function SelfieStep() {
  const { selfieImage, setSelfieImage, next } = useVerificationStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setSelfieImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-2 pb-10 gap-6">
      <p className="text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-[#A09B95]">
        Asegúrate de estar en un lugar bien iluminado y que tu rostro esté claramente visible.
      </p>

      {/* Capture area */}
      <button
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center gap-3 w-full aspect-square max-h-56 rounded-2xl border border-dashed border-[#D8D3CC] bg-[#F5F2EE] cursor-pointer overflow-hidden transition-opacity active:opacity-70"
      >
        {selfieImage ? (
          <img src={selfieImage} alt="Selfie" className="w-full h-full object-cover" />
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C0BAB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="10" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            <span className="text-[13px] font-normal text-[#C0BAB3] tracking-[-0.01em]">
              Tomar selfie
            </span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="user"
        className="hidden"
        onChange={handleFile}
      />

      <Button label="Continuar" onClick={next} disabled={!selfieImage} />
    </div>
  );
}
