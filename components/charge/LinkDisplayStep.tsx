"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { HiLink } from "react-icons/hi";
import { useChargeStore } from "@/store/chargeStore";
import { Button } from "@/components/ui/Button";

const PAYMENT_LINK = "pay.merchant.app/c/1491";

type SharePlatform = "copy" | "whatsapp" | "instagram" | "facebook";

const shareOptions: {
  id: SharePlatform;
  color: string;
  Icon: React.ComponentType<{ size?: number; color?: string }>;
}[] = [
  { id: "copy",      color: "#141210", Icon: HiLink      },
  { id: "whatsapp",  color: "#25D366", Icon: FaWhatsapp  },
  { id: "instagram", color: "#E1306C", Icon: FaInstagram },
  { id: "facebook",  color: "#1877F2", Icon: FaFacebook  },
];

export function LinkDisplayStep() {
  const { amount, reset } = useChargeStore();
  const [activePlatform, setActivePlatform] = useState<SharePlatform | null>(null);

  const [whole, decimals] = amount.split(".");
  const fullLink = `https://${PAYMENT_LINK}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullLink);
    } catch {
      // fallback for environments without clipboard API
    }
  };

  const handleShare = async (platform: SharePlatform) => {
    setActivePlatform(platform);
    setTimeout(() => setActivePlatform(null), 600);

    switch (platform) {
      case "copy":
        await copyToClipboard();
        break;
      case "whatsapp": {
        const text = encodeURIComponent(`Te comparto el link de pago: ${fullLink}`);
        window.open(`https://wa.me/?text=${text}`, "_blank");
        break;
      }
      case "instagram":
        await copyToClipboard();
        break;
      case "facebook": {
        const url = encodeURIComponent(fullLink);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
        break;
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden">

      {/* Title */}
      <div className="pt-7 pb-2 flex justify-center shrink-0">
        <span className="text-[22px] font-medium tracking-[-0.02em] text-[#141210]">
          Link de Pago
        </span>
      </div>

      {/* Amount */}
      <div className="flex items-baseline justify-center gap-2 py-5 shrink-0">
        <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#141210]">
          {whole}<span className="text-[#C0BAB3]">,{decimals ?? "00"}</span>
        </span>
        <span className="text-[56px] font-light tracking-[-0.035em] leading-none text-[#C0BAB3]">
          XUY
        </span>
      </div>

      {/* Link badge */}
      <div className="px-6 pb-2 mt-4 shrink-0 flex justify-center">
        <div className="bg-[#F5F2EE] rounded-full px-5 py-2.5 inline-flex">
          <span className="text-[13px] font-medium text-[#141210] tracking-[-0.01em]">
            {PAYMENT_LINK}
          </span>
        </div>
      </div>

      {/* Share icons */}
      <div className="px-6 pt-6 flex-1">
        <div className="grid grid-cols-4 gap-3">
          {shareOptions.map(({ id, color, Icon }) => (
            <button
              key={id}
              onClick={() => handleShare(id)}
              className="flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
            >
              <motion.div
                animate={activePlatform === id ? { scale: [1, 0.88, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="w-14 h-14 rounded-2xl bg-[#F5F2EE] flex items-center justify-center"
              >
                <Icon size={22} color={color} />
              </motion.div>
            </button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10 pt-6 shrink-0">
        <Button label="Cerrar" onClick={reset} showIcon={false} />
      </div>

    </div>
  );
}
