"use client";

import { useRef } from "react";
import { useVerificationStore } from "@/store/verificationStore";
import { Button } from "@/components/ui/Button";

export function IDStep() {
  const { idImage, setIdImage, kycSuccess } = useVerificationStore();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setIdImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col flex-1 px-6 pt-2 pb-10 gap-6">
      <p className="text-[14px] font-normal leading-[1.5] tracking-[-0.01em] text-[#A09B95]">
        Fotografía el frente de tu cédula de identidad. Asegúrate de que todos los datos sean legibles.
      </p>

      {/* Capture area — landscape ratio like an ID card */}
      <button
        onClick={() => inputRef.current?.click()}
        className="flex flex-col items-center justify-center gap-3 w-full rounded-2xl border border-dashed border-[#D8D3CC] bg-[#F5F2EE] cursor-pointer overflow-hidden transition-opacity active:opacity-70"
        style={{ aspectRatio: "1.586 / 1" }}
      >
        {idImage ? (
          <img src={idImage} alt="Cédula" className="w-full h-full object-cover" />
        ) : (
          <>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C0BAB3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <circle cx="8" cy="12" r="2.5" />
              <line x1="13" y1="10" x2="19" y2="10" />
              <line x1="13" y1="14" x2="17" y2="14" />
            </svg>
            <span className="text-[13px] font-normal text-[#C0BAB3] tracking-[-0.01em]">
              Fotografiar cédula
            </span>
          </>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />

      <Button label="Confirmar" onClick={kycSuccess} disabled={!idImage} showIcon={false} />
    </div>
  );
}
