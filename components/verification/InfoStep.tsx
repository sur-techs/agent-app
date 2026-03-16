"use client";

import { useVerificationStore } from "@/store/verificationStore";
import { Button } from "@/components/ui/Button";

function Field({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-medium tracking-[0.08em] uppercase text-[#A09B95]">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-12 bg-[#F5F2EE] rounded-xl px-4 text-[15px] font-normal tracking-[-0.01em] text-[#141210] placeholder:text-[#C0BAB3] outline-none focus:ring-1 focus:ring-[#141210] transition-all"
      />
    </div>
  );
}

export function InfoStep() {
  const {
    nombre, cedula, direccion,
    setNombre, setCedula, setDireccion,
    next,
  } = useVerificationStore();

  const allFilled = nombre && cedula && direccion;

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pt-2 pb-2">
        <div className="flex flex-col gap-4">
          <Field label="Nombre completo" value={nombre} onChange={setNombre} placeholder="Juan Pérez" />
          <Field label="Cédula" value={cedula} onChange={setCedula} placeholder="V-12345678" />
          <Field label="Dirección" value={direccion} onChange={setDireccion} placeholder="Av. Principal, Casa 5" />
        </div>
      </div>

      <div className="px-6 pt-4 pb-10 shrink-0">
        <Button label="Continuar" onClick={next} disabled={!allFilled} />
      </div>
    </div>
  );
}
