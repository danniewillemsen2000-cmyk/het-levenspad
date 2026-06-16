import { useEffect, useMemo, useRef, useState } from "react";
import { PHASES, SQUARES, TYPE_LABELS, phaseForSquare } from "../data/board";
import type { GameState, Square } from "../game/types";
import { GLYPHS, GlyphIcon } from "./Glyphs";

// ── Geometrie van het slingerende levenspad ─────────────────────────
// De wereld is 1000 × 2000 eenheden: acht zones van 250 hoog. Net als bij
// het klassieke Levensweg-bord liggen de speelvakken als gekleurde tegels
// óp een lichte weg die door een landschap met huizen en bomen slingert.
const W = 1000;
const BAND = 250;
const H = 8 * BAND;

export const TYPE_COLORS: Record<string, string> = {
  start: "#e50067",
  dilemma: "#e50067",
  event: "#f59e0b",
  fact: "#38bdf8",
  compass: "#a78bfa",
  life: "#34d399",
  career: "#fb7185",
  milestone: "#facc15",
  finish: "#e50067",
};

const DARK_TEXT_TYPES = new Set(["event", "fact", "life", "milestone"]);

export function nodePos(n: number) {
  const idx = n - 1;
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const c = row % 2 === 0 ? col : 7 - col; // slangpatroon
  const x = 92 + c * (816 / 7);
  const y = row * BAND + 150 + Math.sin((c + row * 1.7) * 1.05) * 22 + Math.cos(c * 2.2 + row) * 7;
  return { x, y };
}

function tileAngle(n: number): number {
  const prev = nodePos(Math.max(1, n - 1));
  const next = nodePos(Math.min(64, n + 1));
  let a = (Math.atan2(next.y - prev.y, next.x - prev.x) * 180) / Math.PI;
  if (a > 90) a -= 180;
  if (a < -90) a += 180;
  return a;
}

function buildRoad(): string {
  const p1 = nodePos(1);
  let d = `M ${p1.x.toFixed(1)} ${p1.y.toFixed(1)}`;
  for (let n = 2; n <= 64; n++) {
    const prev = nodePos(n - 1);
    const cur = nodePos(n);
    const sameRow = Math.floor((n - 2) / 8) === Math.floor((n - 1) / 8);
    if (sameRow) {
      const mx = (prev.x + cur.x) / 2;
      d += ` C ${mx.toFixed(1)} ${prev.y.toFixed(1)}, ${mx.toFixed(1)} ${cur.y.toFixed(1)}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    } else {
      const out = prev.x > W / 2 ? prev.x + 108 : prev.x - 108;
      d += ` C ${out.toFixed(1)} ${(prev.y + 45).toFixed(1)}, ${out.toFixed(1)} ${(cur.y - 45).toFixed(1)}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
  }
  return d;
}

// ── Landschapselementen (SVG) ───────────────────────────────────────
type BuildProps = { x: number; y: number; s?: number };

function Shadow({ x, y, w }: { x: number; y: number; w: number }) {
  return <ellipse cx={x} cy={y + 2} rx={w} ry={w * 0.22} fill="rgba(0,0,0,0.32)" />;
}

type Tone = "green" | "warm" | "autumn";
const CANOPY: Record<Tone, string[]> = {
  green: ["#2f8f4e", "#37a85c", "#268043", "#43bd6a"],
  warm: ["#56962f", "#69ad38", "#477a28", "#7bbf45"],
  autumn: ["#c2742a", "#d98f33", "#a85f22", "#e0a83a"],
};
const PINE: Record<Tone, string[]> = {
  green: ["#1f7a43", "#2a9150"],
  warm: ["#3f7a2a", "#4f8f33"],
  autumn: ["#6f6a26", "#85812f"],
};
const FLOWER_COLORS = ["#e50067", "#ffffff", "#f5c542", "#a78bfa", "#ff8fab"];

function RoundTree({ x, y, s = 1, tone = "green" }: BuildProps & { tone?: Tone }) {
  const c = CANOPY[tone];
  return (
    <g>
      <Shadow x={x} y={y} w={16 * s} />
      <rect x={x - 3 * s} y={y - 16 * s} width={6 * s} height={16 * s} rx={2 * s} fill="#5b3a25" />
      <circle cx={x} cy={y - 26 * s} r={16 * s} fill={c[0]} />
      <circle cx={x - 9 * s} cy={y - 20 * s} r={11 * s} fill={c[1]} />
      <circle cx={x + 9 * s} cy={y - 21 * s} r={10 * s} fill={c[2]} />
      <circle cx={x + 2 * s} cy={y - 31 * s} r={9 * s} fill={c[3]} />
    </g>
  );
}

function PineTree({ x, y, s = 1, tone = "green" }: BuildProps & { tone?: Tone }) {
  const c = PINE[tone];
  return (
    <g>
      <Shadow x={x} y={y} w={14 * s} />
      <rect x={x - 2.5 * s} y={y - 10 * s} width={5 * s} height={10 * s} fill="#5b3a25" />
      <path d={`M ${x} ${y - 46 * s} L ${x - 15 * s} ${y - 18 * s} L ${x + 15 * s} ${y - 18 * s} Z`} fill={c[0]} />
      <path d={`M ${x} ${y - 36 * s} L ${x - 17 * s} ${y - 6 * s} L ${x + 17 * s} ${y - 6 * s} Z`} fill={c[1]} />
    </g>
  );
}

function Bush({ x, y, s = 1, tone = "green" }: BuildProps & { tone?: Tone }) {
  const c = CANOPY[tone];
  return (
    <g>
      <Shadow x={x} y={y} w={13 * s} />
      <circle cx={x - 7 * s} cy={y - 6 * s} r={8 * s} fill={c[2]} />
      <circle cx={x + 7 * s} cy={y - 6 * s} r={8 * s} fill={c[0]} />
      <circle cx={x} cy={y - 10 * s} r={9 * s} fill={c[1]} />
    </g>
  );
}

function Flower({ x, y, s = 1, color = "#e50067" }: BuildProps & { color?: string }) {
  const petals = [];
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    petals.push(
      <circle key={k} cx={x + Math.cos(a) * 3.4 * s} cy={y - 8 * s + Math.sin(a) * 3.4 * s} r={2.6 * s} fill={color} />,
    );
  }
  return (
    <g>
      <line x1={x} y1={y} x2={x} y2={y - 8 * s} stroke="#3f7a2a" strokeWidth={1.5 * s} />
      {petals}
      <circle cx={x} cy={y - 8 * s} r={2.1 * s} fill="#ffd34d" />
    </g>
  );
}

// Deterministische pseudo-randomgenerator zodat het groen niet verspringt.
function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type GreenItem = { kind: string; x: number; y: number; s: number; tone: Tone; color: string; key: string };

function buildGreenery(): GreenItem[] {
  const out: GreenItem[] = [];
  for (let z = 0; z < 8; z++) {
    const rnd = mulberry32(z * 97 + 13);
    const tone: Tone = z >= 6 ? "autumn" : z >= 4 ? "warm" : "green";
    const strip = (count: number, yMin: number, yMax: number, tag: string) => {
      for (let i = 0; i < count; i++) {
        const x = 36 + rnd() * 928;
        const y = z * BAND + yMin + rnd() * (yMax - yMin);
        const r = rnd();
        const kind = r < 0.38 ? "round" : r < 0.6 ? "pine" : r < 0.82 ? "bush" : "flower";
        const s = 0.55 + rnd() * 0.7;
        const color = FLOWER_COLORS[Math.floor(rnd() * FLOWER_COLORS.length)];
        out.push({ kind, x, y, s, tone, color, key: `${z}-${tag}-${i}` });
      }
    };
    strip(6, 26, 112, "t");
    strip(6, 196, 243, "b");
  }
  return out;
}

function Greenery() {
  const items = useMemo(buildGreenery, []);
  return (
    <g aria-hidden="true">
      {items.map((it) => {
        switch (it.kind) {
          case "round":
            return <RoundTree key={it.key} x={it.x} y={it.y} s={it.s} tone={it.tone} />;
          case "pine":
            return <PineTree key={it.key} x={it.x} y={it.y} s={it.s} tone={it.tone} />;
          case "bush":
            return <Bush key={it.key} x={it.x} y={it.y} s={it.s} tone={it.tone} />;
          case "flower":
            return <Flower key={it.key} x={it.x} y={it.y} s={it.s} color={it.color} />;
          default:
            return null;
        }
      })}
    </g>
  );
}

function House({ x, y, s = 1, roof = "#e50067", wall = "#f7f5f5" }: BuildProps & { roof?: string; wall?: string }) {
  const w = 58 * s;
  const h = 40 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.6} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill={wall} stroke="#101014" strokeWidth="1.5" />
      <path d={`M ${x - w / 2 - 6 * s} ${y - h} L ${x} ${y - h - 26 * s} L ${x + w / 2 + 6 * s} ${y - h} Z`} fill={roof} stroke="#101014" strokeWidth="1.5" strokeLinejoin="round" />
      <rect x={x - 9 * s} y={y - 22 * s} width={18 * s} height={22 * s} fill="#a9004c" />
      <circle cx={x + 5 * s} cy={y - 11 * s} r={1.6 * s} fill="#ffd34d" />
      <rect x={x + 9 * s} y={y - h + 7 * s} width={13 * s} height={13 * s} fill="#7fd4f5" stroke="#101014" strokeWidth="1" />
    </g>
  );
}

function School({ x, y, s = 1 }: BuildProps) {
  const w = 86 * s;
  const h = 44 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.58} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#fbe3ee" stroke="#101014" strokeWidth="1.5" />
      <rect x={x - w / 2} y={y - h - 9 * s} width={w} height={9 * s} fill="#a9004c" />
      <rect x={x - 10 * s} y={y - h - 30 * s} width={20 * s} height={21 * s} fill="#e50067" stroke="#101014" strokeWidth="1.5" />
      <line x1={x} y1={y - h - 30 * s} x2={x} y2={y - h - 46 * s} stroke="#101014" strokeWidth="1.5" />
      <path d={`M ${x} ${y - h - 46 * s} l ${12 * s} ${4 * s} l ${-12 * s} ${4 * s} Z`} fill="#34d399" />
      {[-1, 0, 1].map((k) => (
        <rect key={k} x={x + k * 22 * s - 7 * s} y={y - h + 9 * s} width={14 * s} height={15 * s} fill="#7fd4f5" stroke="#101014" strokeWidth="1" />
      ))}
      <rect x={x - 8 * s} y={y - 19 * s} width={16 * s} height={19 * s} fill="#5b3a25" />
    </g>
  );
}

function Office({ x, y, s = 1 }: BuildProps) {
  const w = 50 * s;
  const h = 86 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.7} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#2e2e35" stroke="#101014" strokeWidth="1.5" />
      <rect x={x - w / 2} y={y - h} width={w} height={6 * s} fill="#e50067" />
      {Array.from({ length: 6 }, (_, r) =>
        [-1, 0, 1].map((k) => (
          <rect key={`${r}-${k}`} x={x + k * 14 * s - 5 * s} y={y - h + 14 * s + r * 12 * s} width={10 * s} height={7 * s} fill={(r + k) % 2 ? "#7fd4f5" : "#ffd34d"} opacity="0.92" />
        )),
      )}
    </g>
  );
}

function Hospital({ x, y, s = 1 }: BuildProps) {
  const w = 76 * s;
  const h = 56 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.6} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#ffffff" stroke="#101014" strokeWidth="1.5" />
      <rect x={x - w / 2} y={y - h} width={w} height={8 * s} fill="#38bdf8" />
      <g fill="#e50067">
        <rect x={x - 4 * s} y={y - h - 22 * s} width={8 * s} height={22 * s} />
        <rect x={x - 11 * s} y={y - h - 15 * s} width={22 * s} height={8 * s} />
      </g>
      {[-1, 1].map((k) => (
        <rect key={k} x={x + k * 20 * s - 7 * s} y={y - h + 16 * s} width={14 * s} height={14 * s} fill="#cdeefb" stroke="#101014" strokeWidth="1" />
      ))}
      <rect x={x - 9 * s} y={y - 22 * s} width={18 * s} height={22 * s} fill="#38bdf8" />
    </g>
  );
}

function Shop({ x, y, s = 1 }: BuildProps) {
  const w = 64 * s;
  const h = 40 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.6} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#f7f5f5" stroke="#101014" strokeWidth="1.5" />
      <rect x={x - w / 2 - 3 * s} y={y - h - 12 * s} width={w + 6 * s} height={12 * s} fill="#34d399" stroke="#101014" strokeWidth="1.2" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={x - w / 2 - 3 * s + i * (w + 6 * s) / 6} y={y - h - 12 * s} width={(w + 6 * s) / 6} height={12 * s} fill={i % 2 ? "#e50067" : "#f7f5f5"} opacity="0.85" />
      ))}
      <rect x={x - 22 * s} y={y - h + 8 * s} width={24 * s} height={18 * s} fill="#7fd4f5" stroke="#101014" strokeWidth="1" />
      <rect x={x + 6 * s} y={y - 20 * s} width={16 * s} height={20 * s} fill="#5b3a25" />
    </g>
  );
}

function CareHome({ x, y, s = 1 }: BuildProps) {
  const w = 84 * s;
  const h = 46 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.6} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#fbe3ee" stroke="#101014" strokeWidth="1.5" />
      <path d={`M ${x - w / 2 - 5 * s} ${y - h} L ${x} ${y - h - 20 * s} L ${x + w / 2 + 5 * s} ${y - h} Z`} fill="#a9004c" stroke="#101014" strokeWidth="1.5" strokeLinejoin="round" />
      <path d={`M ${x} ${y - h - 6 * s} c -6 -7 -16 -1 -8 7 l 8 7 l 8 -7 c 8 -8 -2 -14 -8 -7 Z`} fill="#e50067" />
      {[-1, 1].map((k) => (
        <rect key={k} x={x + k * 22 * s - 7 * s} y={y - h + 10 * s} width={14 * s} height={14 * s} fill="#7fd4f5" stroke="#101014" strokeWidth="1" />
      ))}
      <rect x={x - 9 * s} y={y - 20 * s} width={18 * s} height={20 * s} fill="#5b3a25" />
    </g>
  );
}

function Dorm({ x, y, s = 1 }: BuildProps) {
  const w = 54 * s;
  const h = 76 * s;
  return (
    <g>
      <Shadow x={x} y={y} w={w * 0.66} />
      <rect x={x - w / 2} y={y - h} width={w} height={h} fill="#a78bfa" stroke="#101014" strokeWidth="1.5" />
      <rect x={x - w / 2} y={y - h} width={w} height={6 * s} fill="#e50067" />
      {Array.from({ length: 5 }, (_, r) =>
        [-1, 1].map((k) => (
          <rect key={`${r}-${k}`} x={x + k * 12 * s - 6 * s} y={y - h + 14 * s + r * 13 * s} width={12 * s} height={9 * s} fill="#fce7f0" stroke="#101014" strokeWidth="0.8" />
        )),
      )}
      <rect x={x - 8 * s} y={y - 18 * s} width={16 * s} height={18 * s} fill="#5b3a25" />
    </g>
  );
}

function Lake({ x, y, s = 1 }: BuildProps) {
  const rx = 95 * s;
  const ry = 30 * s;
  return (
    <g>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#2a7fb8" opacity="0.55" />
      <ellipse cx={x} cy={y - 3} rx={rx * 0.92} ry={ry * 0.85} fill="#3a9bd6" opacity="0.55" />
      {[-0.4, 0.1, 0.5].map((k, i) => (
        <path key={i} d={`M ${x + k * rx - 14 * s} ${y + i * 7 * s - 6 * s} q 7 -4 14 0 q 7 4 14 0`} fill="none" stroke="#bfe6fb" strokeWidth="1.4" opacity="0.7" />
      ))}
    </g>
  );
}

type SceneItem = { zone: number; kind: string; x: number; ly: number; s?: number };

// Vaste landschapsopstelling per levensfase (ly = lokale y binnen de band).
const SCENERY: SceneItem[] = [
  { zone: 0, kind: "house", x: 150, ly: 236, s: 1.1 },
  { zone: 0, kind: "round", x: 255, ly: 234, s: 1 },
  { zone: 0, kind: "round", x: 58, ly: 232, s: 0.8 },
  { zone: 1, kind: "school", x: 815, ly: 238, s: 1 },
  { zone: 1, kind: "pine", x: 915, ly: 232, s: 1 },
  { zone: 1, kind: "round", x: 690, ly: 234, s: 0.85 },
  { zone: 2, kind: "office", x: 165, ly: 240, s: 0.9 },
  { zone: 2, kind: "pine", x: 60, ly: 232, s: 1.1 },
  { zone: 2, kind: "round", x: 300, ly: 234, s: 0.85 },
  { zone: 3, kind: "dorm", x: 845, ly: 240, s: 1 },
  { zone: 3, kind: "lake", x: 640, ly: 232, s: 1 },
  { zone: 3, kind: "round", x: 935, ly: 234, s: 0.8 },
  { zone: 4, kind: "office", x: 152, ly: 240, s: 1 },
  { zone: 4, kind: "house", x: 300, ly: 236, s: 0.9 },
  { zone: 4, kind: "round", x: 58, ly: 232, s: 0.85 },
  { zone: 5, kind: "hospital", x: 845, ly: 238, s: 1 },
  { zone: 5, kind: "shop", x: 695, ly: 236, s: 0.95 },
  { zone: 5, kind: "pine", x: 938, ly: 232, s: 0.95 },
  { zone: 6, kind: "house", x: 165, ly: 236, s: 1 },
  { zone: 6, kind: "carehome", x: 330, ly: 238, s: 0.9 },
  { zone: 6, kind: "round", x: 58, ly: 232, s: 1 },
  { zone: 7, kind: "carehome", x: 820, ly: 238, s: 1.05 },
  { zone: 7, kind: "round", x: 700, ly: 232, s: 1.4 },
  { zone: 7, kind: "round", x: 935, ly: 234, s: 0.8 },
];

function Scenery() {
  return (
    <g aria-hidden="true">
      {SCENERY.map((it, idx) => {
        const x = it.x;
        const y = it.zone * BAND + it.ly;
        const s = it.s ?? 1;
        const tone: Tone = it.zone >= 6 ? "autumn" : it.zone >= 4 ? "warm" : "green";
        switch (it.kind) {
          case "house":
            return <House key={idx} x={x} y={y} s={s} />;
          case "school":
            return <School key={idx} x={x} y={y} s={s} />;
          case "office":
            return <Office key={idx} x={x} y={y} s={s} />;
          case "hospital":
            return <Hospital key={idx} x={x} y={y} s={s} />;
          case "shop":
            return <Shop key={idx} x={x} y={y} s={s} />;
          case "carehome":
            return <CareHome key={idx} x={x} y={y} s={s} />;
          case "dorm":
            return <Dorm key={idx} x={x} y={y} s={s} />;
          case "round":
            return <RoundTree key={idx} x={x} y={y} s={s} tone={tone} />;
          case "pine":
            return <PineTree key={idx} x={x} y={y} s={s} tone={tone} />;
          case "lake":
            return <Lake key={idx} x={x} y={y} s={s} />;
          default:
            return null;
        }
      })}
    </g>
  );
}

// Vector-icoon op een tegel; kleur wit, of donker op lichte tegels.
function TileGlyph({ name, x, y, dark, size = 25 }: { name: string; x: number; y: number; dark: boolean; size?: number }) {
  const k = size / 24;
  return (
    <g
      transform={`translate(${x - size / 2} ${y - size / 2}) scale(${k})`}
      style={{ color: dark ? "#101014" : "#ffffff" }}
      stroke="currentColor"
      fill="none"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {GLYPHS[name] ?? GLYPHS.plate}
    </g>
  );
}

function Billboard({ zone }: { zone: number }) {
  const p = PHASES[zone];
  const cx = zone % 2 === 0 ? 640 : 360;
  const top = zone * BAND + 8;
  const w = 168;
  const h = 96;
  return (
    <g className="billboard" transform={`rotate(${zone % 2 === 0 ? -1.6 : 1.8} ${cx} ${top + h / 2})`}>
      <rect x={cx - 12} y={top + h - 6} width="7" height="26" fill="#3a3a42" />
      <rect x={cx + 6} y={top + h - 6} width="7" height="26" fill="#3a3a42" />
      <rect x={cx - w / 2 - 6} y={top - 6} width={w + 12} height={h + 12} rx="10" fill="#f7f5f5" stroke="#e50067" strokeWidth="2.5" />
      <clipPath id={`bb${zone}`}>
        <rect x={cx - w / 2} y={top} width={w} height={h} rx="6" />
      </clipPath>
      <image href={p.billboard} x={cx - w / 2} y={top} width={w} height={h} preserveAspectRatio="xMidYMid slice" clipPath={`url(#bb${zone})`} />
    </g>
  );
}

function Pawn({ x, y, moving }: { x: number; y: number; moving: boolean }) {
  return (
    <g className={`pawn ${moving ? "is-moving" : ""}`} style={{ transform: `translate(${x}px, ${y}px) scale(1.25)` }} aria-hidden="true">
      <ellipse className="pawn-shadow" cx="0" cy="14" rx="17" ry="5.5" />
      <g className="pawn-body">
        <ellipse cx="0" cy="10" rx="17" ry="7" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <path d="M -7 -28 C -8.5 -18 -12 -8 -15 4 L 15 4 C 12 -8 8.5 -18 7 -28 Z" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
        <ellipse cx="0" cy="-27" rx="9.5" ry="4.5" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <circle cx="0" cy="-38" r="10.5" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <ellipse cx="-3.5" cy="-41" rx="3" ry="2" fill="rgba(255,255,255,0.55)" />
      </g>
    </g>
  );
}

function InspectPopover({ n, state, onClose }: { n: number; state: GameState; onClose: () => void }) {
  const sq = SQUARES[n - 1];
  const phase = phaseForSquare(n);
  const played = state.history.filter((h) => h.square === n);
  const last = played[played.length - 1];
  const status =
    state.position === n
      ? "Jullie staan hier nu."
      : last
        ? `Gespeeld${last.choiceText ? ` — gekozen: "${last.choiceText}"` : ""}`
        : n < state.position
          ? "Gepasseerd."
          : "Nog te ontdekken…";
  return (
    <div className="inspect-pop" role="dialog" aria-label={`Vak ${n}`}>
      <div className="inspect-head">
        <span className="inspect-icon" style={{ color: TYPE_COLORS[sq.type] }}>
          <GlyphIcon name={sq.icon} size={26} />
        </span>
        <div>
          <div className="inspect-title">
            Vak {n} · {sq.title}
          </div>
          <div className="inspect-meta">
            <span style={{ color: TYPE_COLORS[sq.type] }}>{TYPE_LABELS[sq.type]}</span> · {phase.title} ({phase.ages})
          </div>
        </div>
        <button className="inspect-close" onClick={onClose} aria-label="Sluiten">
          ✕
        </button>
      </div>
      <p className="inspect-status">{status}</p>
      {last && <p className="inspect-effect">{last.effectSummary}</p>}
    </div>
  );
}

function Tile({ sq, state, hovered }: { sq: Square; state: GameState; hovered: boolean }) {
  const { x, y } = nodePos(sq.n);
  const a = tileAngle(sq.n);
  const isMilestone = sq.type === "milestone" || sq.type === "finish";
  const tw = isMilestone ? 112 : 99;
  const th = isMilestone ? 66 : 54;
  const current = state.position === sq.n;
  const visited = sq.n < state.position;
  const darkText = DARK_TEXT_TYPES.has(sq.type);
  const cls = ["tile", isMilestone ? "is-milestone" : "", current ? "current" : "", visited ? "visited" : "", hovered ? "hovered" : ""]
    .filter(Boolean)
    .join(" ");
  return (
    <g className={cls} transform={`rotate(${a.toFixed(1)} ${x} ${y})`}>
      <rect className="tile-bg" x={x - tw / 2} y={y - th / 2} width={tw} height={th} rx="9" fill={TYPE_COLORS[sq.type]} stroke={isMilestone ? "#fff" : "rgba(0,0,0,0.45)"} strokeWidth={isMilestone ? 3 : 2} />
      <g className="tile-icon">
        <TileGlyph name={sq.icon} x={x} y={y + 2} dark={darkText} size={isMilestone ? 30 : 25} />
      </g>
      <text className="tile-num" x={x - tw / 2 + 10} y={y - th / 2 + 16} fontSize="12.5" fontWeight="800" fill={darkText ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.9)"}>
        {sq.n}
      </text>
    </g>
  );
}

export function Board({ state, moving }: { state: GameState; moving: boolean }) {
  const [inspect, setInspect] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const road = useMemo(buildRoad, []);
  const tokenPos = nodePos(state.position);
  const pawnRef = useRef<SVGGElement>(null);

  // Camera volgt de pion: bij elke stap schuift het bord zodat de pion
  // in beeld blijft — zo zie je het pionnetje echt over het bord lopen.
  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    pawnRef.current?.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "center",
      inline: "nearest",
    });
  }, [state.position]);

  return (
    <div className="world-wrap">
      <div className="world" aria-label="Speelbord: het levenspad door acht levensfasen">
        <svg className="world-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
          <defs>
            {PHASES.map((p, i) => (
              <linearGradient key={i} id={`zone${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={p.hue[0]} />
                <stop offset="100%" stopColor={p.hue[1]} />
              </linearGradient>
            ))}
            <radialGradient id="zoneglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,250,225,0.22)" />
              <stop offset="100%" stopColor="rgba(255,250,225,0)" />
            </radialGradient>
            <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(20,50,28,0)" />
              <stop offset="100%" stopColor="rgba(18,44,24,0.55)" />
            </linearGradient>
            <linearGradient id="pawnGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4d94" />
              <stop offset="100%" stopColor="#a9004c" />
            </linearGradient>
          </defs>

          {/* Wereldzones per levensfase */}
          {PHASES.map((p, i) => (
            <g key={p.rij}>
              <rect x="0" y={i * BAND} width={W} height={BAND} fill={`url(#zone${i})`} />
              <ellipse cx={i % 2 === 0 ? 230 : 770} cy={i * BAND + 120} rx="340" ry="120" fill="url(#zoneglow)" />
              {/* grasgrond onderin de zone */}
              <rect x="0" y={i * BAND + 170} width={W} height={BAND - 170 + 6} fill="url(#ground)" />
              <path d={`M 0 ${(i + 1) * BAND} Q 250 ${(i + 1) * BAND - 50} 520 ${(i + 1) * BAND - 16} T ${W} ${(i + 1) * BAND - 36} L ${W} ${(i + 1) * BAND} Z`} fill="rgba(255,255,255,0.06)" />
              <line x1="0" y1={i * BAND} x2={W} y2={i * BAND} stroke="rgba(18,44,24,0.4)" strokeWidth="2" />
            </g>
          ))}

          {/* Landschap: bomen, struiken en bloemen */}
          <Greenery />

          {/* Gebouwen en water */}
          <Scenery />

          {/* Fotoborden langs de route */}
          {PHASES.map((_, i) => (
            <Billboard key={`bb${i}`} zone={i} />
          ))}

          {/* De weg: licht asfalt met donkere rand */}
          <path d={road} className="road-outer" />
          <path d={road} className="road-inner" />

          {/* De 64 tegels óp de weg */}
          {SQUARES.map((sq) => (
            <Tile key={sq.n} sq={sq} state={state} hovered={hovered === sq.n} />
          ))}

          {/* Labels onder mijlpalen, start en finish */}
          {SQUARES.filter((sq) => sq.type === "milestone" || sq.type === "finish" || sq.type === "start").map((sq) => {
            const { x, y } = nodePos(sq.n);
            return (
              <text key={sq.n} className="tile-label" x={Math.min(Math.max(x, 130), W - 130)} y={y + 56} textAnchor="middle" fontSize="13" fontWeight="800">
                {sq.title.toUpperCase()}
              </text>
            );
          })}

          {/* Het pionnetje (camera volgt deze groep) */}
          <g ref={pawnRef}>
            <Pawn x={tokenPos.x} y={tokenPos.y - 10} moving={moving} />
          </g>
        </svg>

        {/* Fasekoppen met foto */}
        {PHASES.map((p, i) => (
          <div key={p.rij} className={`zone-head ${i % 2 === 0 ? "left" : "right"}`} style={{ top: `${((i * BAND + 14) / H) * 100}%` }}>
            <img className="zone-photo" src={p.photo} alt={p.photoAlt} loading="lazy" />
            <div className="zone-text">
              <span className="zone-phase">Fase {p.rij}</span>
              <strong>{p.title}</strong>
              <span className="zone-ages">{p.ages}</span>
            </div>
          </div>
        ))}

        {/* Onzichtbare knoppen over de tegels: klikken, hoveren, toetsenbord */}
        {SQUARES.map((sq) => {
          const { x, y } = nodePos(sq.n);
          return (
            <button
              key={sq.n}
              className="tile-hit"
              style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
              onClick={() => setInspect(sq.n)}
              onMouseEnter={() => setHovered(sq.n)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(sq.n)}
              onBlur={() => setHovered(null)}
              aria-label={`Vak ${sq.n}: ${sq.title} (${TYPE_LABELS[sq.type]})`}
              aria-current={state.position === sq.n ? "step" : undefined}
            />
          );
        })}
      </div>

      {inspect !== null && <InspectPopover n={inspect} state={state} onClose={() => setInspect(null)} />}
    </div>
  );
}
