"use client";

interface AvatarProps {
  name: string;
  filled?: boolean;
  size?: "sm" | "md";
  border?: boolean;
}

export function Avatar({ name, filled = false, size = "md", border = false }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase();
  const dim = size === "sm" ? "w-8 h-8 text-sm" : "w-10 h-10 text-[15px]";
  const bg = filled
    ? "bg-[#141210] text-white"
    : "bg-[#EDE9E4] text-[#A09B95]";
  const borderClass = border ? "ring-1 ring-[#D8D3CC]" : "";

  return (
    <div
      className={`${dim} ${bg} ${borderClass} rounded-full flex items-center justify-center shrink-0 font-normal`}
    >
      {initial}
    </div>
  );
}
