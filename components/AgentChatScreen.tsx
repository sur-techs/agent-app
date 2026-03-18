"use client";

import { useState } from "react";
import { AgentMessage, AgentMessageData } from "@/components/AgentMessage";

const supplierAgent: AgentMessageData = {
  name: "SupplierAgent",
  footer: [
    { icon: "attachment", label: "Order sent" },
    { icon: "http", label: "Payment x402 —", code: "/order/4421/confirm" },
  ],
  steps: [
    {
      type: "text",
      content: "Generating quote for supply restock request",
      speed: 50,
    },
    {
      type: "list",
      rows: [
        { paragraph: true, label: "Roasters & Co – Café Supply Distributor" },
        { label: "Delivery window", value: "2 hours"     },
        { label: "Quoted amount",   value: "20,000 XUY"  },
      ],
    },
    {
      type: "text",
      content: "Quote ready — sending to CoffeeShopAgent",
      speed: 65,
    },
  ],
};

const coffeeShopAgent: AgentMessageData = {
  name: "CoffeeShopAgent",
  footer: [
    { icon: "attachment", label: "Request for Quote sent" },
  ],
  steps: [
    {
      type: "text",
      content: "Monitor ingredient inventory and detect supply shortages affecting daily operations",
      speed: 50,
    },
    {
      type: "list",
      rows: [
        { label: "Inventory scan results", header: true },
        { label: "Coffee beans (house espresso blend)", value: "1.2 kg" },
        { label: "Whole milk",             value: "6 L"        },
        { label: "Oat milk",               value: "2 L"        },
        { label: "Sugar packets",          value: "120"        },
        { label: "Lids for takeaway cups", value: "80"         },
        { label: "Minimum operating thresholds", header: true  },
        { label: "Coffee beans",           value: "5 kg"       },
        { label: "Whole milk",             value: "20 L"       },
        { label: "Oat milk",               value: "10 L"       },
        { label: "Sugar packets",          value: "500 units"  },
        { label: "Cup lids",               value: "300 units"  },
      ],
    },
    {
      type: "text",
      content: "Inventory scan completed",
      speed: 65,
    },
    {
      type: "text",
      content: "Initiate supply restocking process",
      speed: 65,
    },
  ],
};

const coffeeShopAgent2: AgentMessageData = {
  name: "CoffeeShopAgent",
  footer: [
    { icon: "check", label: "Payment x402 received —", code: "/order/4421/confirm" },
    { icon: "check", label: "Requires Manager Approval", confirm: true, confirmData: { amount: "20,000 XUY", recipient: "Roasters & Co", reference: "Supply Order #4421" } },
    { icon: "check", label: "The transaction has been paid" },
  ],
  steps: [
    {
      type: "text",
      content: "Evaluate supplier quote and confirm supply order",
      speed: 50,
    },
    {
      type: "list",
      rows: [
        { paragraph: true, label: "Quote received from supplier: Roasters & Co – Café Supply Distributor" },
        { label: "Quoted amount",     value: "20,000 XUY" },
        { label: "Delivery estimate", value: "2 hours"    },
      ],
    },
    {
      type: "text",
      content: "Supplier quote evaluated and accepted",
      speed: 65,
    },
    {
      type: "text",
      content: "Initiating payment to Roasters & Co via SUR infrastructure",
      speed: 50,
    },
    {
      type: "text",
      content: "Payment request submitted — awaiting settlement confirmation",
      speed: 65,
    },
    {
      type: "widget",
      widget: "payment",
      data: {
        payer:     "Coffee LLC (coffee.sur/xuy)",
        recipient: "Roasters & Co (roasters.sur/xuy)",
        amount:    "20,000 XUY",
        reference: "Supply Order #4421",
      },
    },
  ],
};

const supplierAgent2: AgentMessageData = {
  name: "SupplierAgent",
  footer: [
    { icon: "check", label: "Payment received and settled" },
    { icon: "attachment", label: "Invoice #4421 — Roasters & Co" },
  ],
  steps: [
    {
      type: "text",
      content: "Thanks for your purchase.",
      speed: 65,
    },
  ],
};

export function AgentChatScreen() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <div className="flex flex-col gap-10">
      <AgentMessage data={coffeeShopAgent}  onComplete={() => setActiveIdx(1)} />
      {activeIdx >= 1 && <AgentMessage data={supplierAgent}    onComplete={() => setActiveIdx(2)} />}
      {activeIdx >= 2 && <AgentMessage data={coffeeShopAgent2} onComplete={() => setActiveIdx(3)} />}
      {activeIdx >= 3 && <AgentMessage data={supplierAgent2} />}
    </div>
  );
}
