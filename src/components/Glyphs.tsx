import type { ReactNode } from "react";

// Strakke vector-iconen (lijnstijl) in plaats van emoji. Elk icoon is getekend
// in een 24×24 vlak; de omhullende groep zet stroke/fill via currentColor.
export const GLYPHS: Record<string, ReactNode> = {
  plate: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  bottle: (
    <>
      <rect x="8.5" y="9" width="7" height="11" rx="3" />
      <path d="M10 9 V6.5 a2 2 0 0 1 4 0 V9" />
      <line x1="8.5" y1="12.5" x2="15.5" y2="12.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8 V12 L15 14" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19 C5 11 11 5 19 5 C19 13 13 19 5 19 Z" />
      <path d="M8 16 L16 8" />
    </>
  ),
  gift: (
    <>
      <rect x="4" y="10" width="16" height="10" rx="1" />
      <rect x="3.5" y="9.5" width="17" height="3.5" />
      <line x1="12" y1="9.5" x2="12" y2="20" />
      <path d="M12 9.5 C10 6 6 6 8 9.5" />
      <path d="M12 9.5 C14 6 18 6 16 9.5" />
    </>
  ),
  lightbulb: (
    <>
      <path d="M9 16 a5 5 0 1 1 6 0 c-1 0.8 -1.2 1.4 -1.2 2.5 H10.2 c0 -1.1 -0.2 -1.7 -1.2 -2.5 Z" />
      <line x1="10" y1="20.5" x2="14" y2="20.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3.5 19 a5.5 5.5 0 0 1 11 0" />
      <circle cx="17" cy="9.5" r="2.3" />
      <path d="M14.5 19 a4.5 4.5 0 0 1 7 -0.5" />
    </>
  ),
  star: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 2 L14.6 8.6 L21.8 9 L16 13.5 L18 20.5 L12 16.5 L6 20.5 L8 13.5 L2.2 9 L9.4 8.6 Z"
    />
  ),
  cupcake: (
    <>
      <path d="M7 12 a5 4 0 0 1 10 0 Z" />
      <path d="M7.5 12 L9 20 H15 L16.5 12" />
      <line x1="11" y1="12" x2="11" y2="20" />
      <line x1="13" y1="12" x2="13" y2="20" />
      <circle cx="12" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
    </>
  ),
  drop: <path d="M12 3 C7 10 6 13 6 15 a6 6 0 0 0 12 0 C18 13 17 10 12 3 Z" />,
  sandwich: (
    <>
      <path d="M4 9 a8 3.5 0 0 1 16 0" />
      <path d="M4 9 V13 a8 3 0 0 0 16 0 V9" />
      <line x1="4" y1="11" x2="20" y2="11" />
    </>
  ),
  trash: (
    <>
      <line x1="4" y1="7" x2="20" y2="7" />
      <path d="M6 7 L7 20 H17 L18 7" />
      <path d="M9.5 7 V5 a1 1 0 0 1 1 -1 H13.5 a1 1 0 0 1 1 1 V7" />
    </>
  ),
  paw: (
    <>
      <ellipse cx="12" cy="15.5" rx="4.5" ry="3.5" fill="currentColor" stroke="none" />
      <circle cx="7" cy="11" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="10.3" cy="8.5" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="13.7" cy="8.5" r="1.8" fill="currentColor" stroke="none" />
      <circle cx="17" cy="11" r="1.8" fill="currentColor" stroke="none" />
    </>
  ),
  ball: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4 C9 9 9 15 12 20" />
      <path d="M12 4 C15 9 15 15 12 20" />
      <path d="M4.5 9 H19.5" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="3" width="10" height="18" rx="2.5" />
      <line x1="10.5" y1="5.5" x2="13.5" y2="5.5" />
      <circle cx="12" cy="18" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  chip: (
    <>
      <rect x="7" y="7" width="10" height="10" rx="1.5" />
      <rect x="10" y="10" width="4" height="4" />
      <path d="M9.5 7 V4 M14.5 7 V4 M9.5 17 V20 M14.5 17 V20 M7 9.5 H4 M7 14.5 H4 M17 9.5 H20 M17 14.5 H20" />
    </>
  ),
  dumbbell: (
    <>
      <line x1="6.5" y1="12" x2="17.5" y2="12" />
      <rect x="3.5" y="8.5" width="3" height="7" rx="1" />
      <rect x="17.5" y="8.5" width="3" height="7" rx="1" />
    </>
  ),
  burger: (
    <>
      <path d="M4 9.5 a8 4.5 0 0 1 16 0 Z" />
      <line x1="4" y1="12.5" x2="20" y2="12.5" />
      <path d="M5 14.5 H19 V15.5 a3 3 0 0 1 -3 3 H8 a3 3 0 0 1 -3 -3 Z" />
    </>
  ),
  mirror: (
    <>
      <ellipse cx="12" cy="9.5" rx="6" ry="6.5" />
      <line x1="12" y1="16" x2="12" y2="21" />
      <line x1="9.5" y1="21" x2="14.5" y2="21" />
    </>
  ),
  home: (
    <>
      <path d="M3.5 11 L12 3.5 L20.5 11" />
      <path d="M6 11 V20 H18 V11" />
      <rect x="10" y="14.5" width="4" height="5.5" />
    </>
  ),
  bag: (
    <>
      <path d="M6 8 H18 L17 20 H7 Z" />
      <path d="M9 8 V6 a3 3 0 0 1 6 0 V8" />
    </>
  ),
  pan: (
    <>
      <circle cx="10.5" cy="13" r="6" />
      <line x1="16" y1="9.5" x2="21" y2="6.5" />
    </>
  ),
  tag: (
    <>
      <path d="M3.5 12.5 L12 4 H20 V12 L11.5 20.5 Z" />
      <circle cx="16.5" cy="7.5" r="1.4" />
    </>
  ),
  cap: (
    <>
      <path d="M12 5.5 L21 9.5 L12 13.5 L3 9.5 Z" />
      <path d="M6.5 11 V15 c0 2 11 2 11 0 V11" />
      <line x1="21" y1="9.5" x2="21" y2="15" />
    </>
  ),
  baby: (
    <>
      <circle cx="12" cy="9" r="4" />
      <path d="M7 20 a5 5 0 0 1 10 0" />
      <path d="M10.5 6.7 c1 -0.9 2 -0.9 3 0" />
    </>
  ),
  meat: (
    <>
      <circle cx="9.5" cy="9.5" r="5" />
      <line x1="12.5" y1="12.5" x2="19" y2="19" />
      <circle cx="19.5" cy="19.5" r="1.6" />
      <circle cx="17.8" cy="20.8" r="1.4" />
    </>
  ),
  cross: (
    <>
      <rect x="10" y="4" width="4" height="16" rx="1" fill="currentColor" stroke="none" />
      <rect x="4" y="10" width="16" height="4" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  heart: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 21 C12 21 4 14.5 4 9 C4 6 6.2 4 9 4 C10.7 4 12 5 12 6.5 C12 5 13.3 4 15 4 C17.8 4 20 6 20 9 C20 14.5 12 21 12 21 Z"
    />
  ),
  coins: (
    <>
      <ellipse cx="12" cy="8" rx="7" ry="3" />
      <path d="M5 8 V13 a7 3 0 0 0 14 0 V8" />
      <path d="M5 10.5 a7 3 0 0 0 14 0" />
    </>
  ),
  cart: (
    <>
      <path d="M4 5 H6 L8 15 H18 L20 8 H7" />
      <circle cx="9" cy="19" r="1.4" />
      <circle cx="17" cy="19" r="1.4" />
    </>
  ),
  cup: (
    <>
      <path d="M7 8 H17 L16 19 a2 2 0 0 1 -2 1.8 H10 a2 2 0 0 1 -2 -1.8 Z" />
      <line x1="6.5" y1="8" x2="17.5" y2="8" />
      <line x1="13" y1="4" x2="15" y2="8" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <ellipse cx="12" cy="12" rx="3.2" ry="8" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </>
  ),
  warning: (
    <>
      <path d="M12 4 L21 19 H3 Z" />
      <line x1="12" y1="10" x2="12" y2="14.5" />
      <circle cx="12" cy="17" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  briefcase: (
    <>
      <rect x="4" y="8" width="16" height="11" rx="2" />
      <path d="M9 8 V6 a2 2 0 0 1 2 -2 H13 a2 2 0 0 1 2 2 V8" />
      <line x1="4" y1="13" x2="20" y2="13" />
    </>
  ),
  candle: (
    <>
      <rect x="9" y="9" width="6" height="11" rx="1" />
      <path d="M12 4 C10.5 6 10.5 7.5 12 8.5 C13.5 7.5 13.5 6 12 4 Z" fill="currentColor" stroke="none" />
    </>
  ),
  flag: (
    <>
      <line x1="6" y1="3.5" x2="6" y2="20.5" />
      <rect x="6" y="4" width="13" height="8" />
      <rect x="6" y="4" width="3.25" height="4" fill="currentColor" stroke="none" />
      <rect x="12.5" y="4" width="3.25" height="4" fill="currentColor" stroke="none" />
      <rect x="9.25" y="8" width="3.25" height="4" fill="currentColor" stroke="none" />
      <rect x="15.75" y="8" width="3.25" height="4" fill="currentColor" stroke="none" />
    </>
  ),
};

export function GlyphIcon({
  name,
  size = 24,
  color = "currentColor",
}: {
  name: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      style={{ color }}
      stroke="currentColor"
      fill="none"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[name] ?? GLYPHS.plate}
    </svg>
  );
}
