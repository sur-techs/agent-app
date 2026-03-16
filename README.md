# Merchants App

A mobile-first merchant-facing web app for accepting payments. Built with Next.js 16, Tailwind CSS v4, Zustand, and Motion (Framer Motion).

The app is designed as a phone shell prototype — all screens are scoped to a mobile viewport and use a consistent cream (`#F5F2EE`) design language with floating bottom sheets, soft shadows, and animated transitions.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS v4 |
| Animations | Motion (Framer Motion) |
| State | Zustand |
| Icons | Custom SVGs + `react-icons` (brand icons) |

---

## Project Structure

```
app/
  layout.tsx          # Root layout with mobile shell wrapper
  page.tsx            # Entry point — renders screens, nav, sheets, FAB

components/
  HomeScreen.tsx      # Main dashboard (balance, method cards, recent activity)
  SettlementScreen.tsx # Settlements tab

  charge/
    ChargeSheet.tsx         # Bottom sheet orchestrator for all charge flows
    AmountStep.tsx          # Shared amount entry step (numpad)
    QrDisplayStep.tsx       # QR code display
    LinkDisplayStep.tsx     # Payment link with social sharing
    PosDisplayStep.tsx      # POS terminal with ripple animation
    RequestDisplayStep.tsx  # Payment request with recipient input

  verification/
    VerificationSheet.tsx   # KYC identity verification flow
    IDStep.tsx
    InfoStep.tsx
    SelfieStep.tsx

  ui/
    BottomSheet.tsx    # Reusable floating bottom sheet
    Button.tsx         # Primary CTA button
    FAB.tsx            # Floating action button (visual only)
    SuccessToast.tsx   # Animated toast notification
    Avatar.tsx         # User avatar component
    icons.tsx          # All custom SVG icons

store/
  chargeStore.ts       # Charge flow state (method, amount, step)
  navStore.ts          # Bottom navigation state
  verificationStore.ts # KYC verification state
```

---

## Screens

### Home (`HomeScreen`)

The main screen merchants see on login. Contains:

- **Header** — app name and profile button (opens KYC verification sheet)
- **Balance** — total merchant balance in XUY with store name label
- **Method Cards** — 2×2 grid of charge method shortcuts. Tapping any card opens the charge bottom sheet pre-set to that method, skipping the method picker
- **Actividad reciente** — chronological list of recent transactions with method, amount, and time

### Settlements (`SettlementScreen`)

Accessible via the bottom nav. Shows:

- Total amount pending settlement
- Daily settlement history list with date, transaction count, amount, and a status badge (`liquidado`, `en proceso`, `pendiente`)

---

## Charge Flows

All charge flows share the same entry pattern:

```
Homepage card tap
       ↓
[AmountStep] — enter amount with numpad
       ↓
[Display step for selected method]
```

The shared `ChargeSheet` is a bottom sheet that animates between steps with a horizontal slide transition. The title on the amount step reflects the selected method.

State is managed in `chargeStore`:
- `method` — which flow is active (`qr | link | pos | request`)
- `step` — current screen within the sheet (`amount | qr_display | link_display | pos_display | request_display`)
- `amount` — entered amount string
- `openWithMethod(method)` — called by homepage cards, opens at amount step with method pre-selected
- `goToDisplay()` — called by AmountStep's "Continuar", routes to the correct display step
- `reset()` — closes the sheet and clears all state

---

### QR (`QrDisplayStep`)

Displays a static QR code for the customer to scan.

- Shows the entered amount and a rendered QR code
- "Mostrá este código para cobrar" hint
- "Cerrar" button resets the flow

---

### Link de Pago (`LinkDisplayStep`)

Generates a shareable payment link.

- Shows the amount and a cream pill badge with the link (`pay.merchant.app/c/1491`)
- Four share buttons using official brand icons (Copy via `HiLink`, WhatsApp, Instagram, Facebook), each on a cream background
  - **Copy** — writes to clipboard
  - **WhatsApp** — opens `wa.me/?text=...` with the link
  - **Instagram** — copies link (Instagram has no direct web share URL)
  - **Facebook** — opens `facebook.com/sharer/sharer.php?u=...`
- "Cerrar" button resets the flow

---

### POS (`PosDisplayStep`)

Simulates a card terminal interaction.

Three internal states:

| State | Visual | Label |
|---|---|---|
| `waiting` | Three expanding cream ripple circles | "Acercá la tarjeta" |
| `processing` | Spinner fades in at center, ripples exit | "Procesando pago" |
| `approved` | Green checkmark spring-animates in | "Pago aprobado" |

- Ripples are seamlessly looping circles that expand from the center and fade out, with staggered delays so they feel continuous
- "Simular cobro" button triggers the `waiting → processing → approved` transition for demo purposes
- On approval, button becomes "Cerrar"

---

### Payment Request (`RequestDisplayStep`)

Sends a payment request to a specific user.

Two internal states:

| State | Description |
|---|---|
| `idle` | Input field for recipient XUY ID + "Enviar solicitud" button |
| `sending` | Button shows spinner (1.8s) |
| `sent` | Form fades out, green checkmark + "Solicitud enviada" + recipient shown |

- Recipient field accepts a XUY ID (`Ingresá el ID#XUY`)
- "Enviar solicitud" is disabled until a recipient is entered
- On success, the form transitions to a confirmation state with the recipient shown

---

## Bottom Sheet

All flows live inside `BottomSheet`, a reusable component with:

- Spring animation entrance/exit (`y: 100% → 0`)
- 16px margin from device edges on left, right, and bottom
- `rounded-[24px]` corners (fully rounded since it floats)
- Subtle upward shadow
- Backdrop blur scrim that closes the sheet on tap
- Background scroll lock while open

---

## Navigation

Bottom nav with two tabs:

| Tab | Screen |
|---|---|
| Home | `HomeScreen` |
| Settlements | `SettlementScreen` |

State in `navStore` (`page: "home" | "settlement"`).

---

## Design Tokens

| Token | Value | Usage |
|---|---|---|
| `#141210` | Near-black | Primary text, icons |
| `#F5F2EE` | Cream | Page background, card backgrounds |
| `#EDE9E4` | Darker cream | Icon container backgrounds |
| `#D4CFC9` | Warm border | Dashed card borders |
| `#C0BAB3` | Muted warm | Decimal values, XUY label, hints |
| `#A09B95` | Muted text | Subtitles, secondary labels |
| `#22C55E` | Green | Success states (approved, sent) |

---

## Getting Started

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.
