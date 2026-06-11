import { useMemo, useState } from "react";
import { PHASES, SQUARES, TYPE_LABELS, phaseForSquare } from "../data/board";
import type { GameState, Square } from "../game/types";

// ── Geometrie van het slingerende levenspad ─────────────────────────
// Het bord is een wereld van 1000 × 2000 eenheden: acht zones van 250 hoog.
// Net als bij het klassieke Levensweg-bord liggen de speelvakken als
// gekleurde tegels óp een lichte weg die door het landschap slingert.
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

// Donkere tegels krijgen lichte tekst, lichte tegels donkere tekst.
const DARK_TEXT_TYPES = new Set(["event", "fact", "life", "milestone"]);

export function nodePos(n: number) {
  const idx = n - 1;
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const c = row % 2 === 0 ? col : 7 - col; // slangpatroon
  const x = 92 + c * (816 / 7);
  const y = row * BAND + 162 + Math.sin((c + row * 1.7) * 1.05) * 22 + Math.cos(c * 2.2 + row) * 7;
  return { x, y };
}

// Hoek van de weg bij vakje n, genormaliseerd zodat tekst nooit op z'n kop staat.
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
      // U-bocht buiten het bord om naar de volgende levensfase
      const out = prev.x > W / 2 ? prev.x + 108 : prev.x - 108;
      d += ` C ${out.toFixed(1)} ${(prev.y + 45).toFixed(1)}, ${out.toFixed(1)} ${(cur.y - 45).toFixed(1)}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
  }
  return d;
}

// Vaste decoratieposities per zone (x%, y% binnen de band, grootte, rotatie)
const DECO_SPOTS = [
  [5, 16, 32, -10],
  [90, 14, 28, 9],
  [30, 82, 26, -6],
  [72, 84, 28, 7],
] as const;

// Boompjes en struiken die het landschap aankleden
const TREE_SPOTS = [
  [16, 78, 36],
  [62, 12, 30],
  [86, 80, 38],
  [40, 86, 28],
] as const;
const TREES = ["🌳", "🌲", "🌳", "🌴", "🌳", "🌲", "🍂", "🌳"];

function Billboard({ zone }: { zone: number }) {
  const p = PHASES[zone];
  // het fotobord staat in de bovenstrook, uit de buurt van de fasekop
  const cx = zone % 2 === 0 ? 620 : 380;
  const top = zone * BAND + 8;
  const w = 168;
  const h = 96;
  return (
    <g className="billboard" transform={`rotate(${zone % 2 === 0 ? -1.6 : 1.8} ${cx} ${top + h / 2})`}>
      <rect x={cx - 12} y={top + h - 6} width="7" height="26" fill="#3a3a42" />
      <rect x={cx + 6} y={top + h - 6} width="7" height="26" fill="#3a3a42" />
      <rect
        x={cx - w / 2 - 6}
        y={top - 6}
        width={w + 12}
        height={h + 12}
        rx="10"
        fill="#f7f5f5"
        stroke="#e50067"
        strokeWidth="2.5"
      />
      <clipPath id={`bb${zone}`}>
        <rect x={cx - w / 2} y={top} width={w} height={h} rx="6" />
      </clipPath>
      <image
        href={p.billboard}
        x={cx - w / 2}
        y={top}
        width={w}
        height={h}
        preserveAspectRatio="xMidYMid slice"
        clipPath={`url(#bb${zone})`}
      />
    </g>
  );
}

// Klassiek pionnetje dat over het pad hupt
function Pawn({ x, y, moving }: { x: number; y: number; moving: boolean }) {
  return (
    <g
      className={`pawn ${moving ? "is-moving" : ""}`}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      aria-hidden="true"
    >
      <ellipse className="pawn-shadow" cx="0" cy="14" rx="17" ry="5.5" />
      <g className="pawn-body">
        <ellipse cx="0" cy="10" rx="17" ry="7" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <path
          d="M -7 -28 C -8.5 -18 -12 -8 -15 4 L 15 4 C 12 -8 8.5 -18 7 -28 Z"
          fill="url(#pawnGrad)"
          stroke="#fff"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <ellipse cx="0" cy="-27" rx="9.5" ry="4.5" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <circle cx="0" cy="-38" r="10.5" fill="url(#pawnGrad)" stroke="#fff" strokeWidth="2" />
        <ellipse cx="-3.5" cy="-41" rx="3" ry="2" fill="rgba(255,255,255,0.55)" />
      </g>
    </g>
  );
}

function InspectPopover({
  n,
  state,
  onClose,
}: {
  n: number;
  state: GameState;
  onClose: () => void;
}) {
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
        <span className="inspect-icon">{sq.icon}</span>
        <div>
          <div className="inspect-title">
            Vak {n} · {sq.title}
          </div>
          <div className="inspect-meta">
            <span style={{ color: TYPE_COLORS[sq.type] }}>{TYPE_LABELS[sq.type]}</span>{" "}
            · {phase.title} ({phase.ages})
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
  const cls = [
    "tile",
    isMilestone ? "is-milestone" : "",
    current ? "current" : "",
    visited ? "visited" : "",
    hovered ? "hovered" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <g className={cls} transform={`rotate(${a.toFixed(1)} ${x} ${y})`}>
      <rect
        className="tile-bg"
        x={x - tw / 2}
        y={y - th / 2}
        width={tw}
        height={th}
        rx="9"
        fill={TYPE_COLORS[sq.type]}
        stroke={isMilestone ? "#fff" : "rgba(0,0,0,0.45)"}
        strokeWidth={isMilestone ? 3 : 2}
      />
      <text
        className="tile-icon"
        x={x}
        y={y + (isMilestone ? 10 : 9)}
        textAnchor="middle"
        fontSize={isMilestone ? 30 : 26}
      >
        {sq.icon}
      </text>
      <text
        className="tile-num"
        x={x - tw / 2 + 10}
        y={y - th / 2 + 16}
        fontSize="12.5"
        fontWeight="800"
        fill={darkText ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.9)"}
      >
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
              <stop offset="0%" stopColor="rgba(229,0,103,0.15)" />
              <stop offset="100%" stopColor="rgba(229,0,103,0)" />
            </radialGradient>
            <linearGradient id="pawnGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff4d94" />
              <stop offset="100%" stopColor="#a9004c" />
            </linearGradient>
          </defs>

          {/* Wereldzones per levensfase */}
          {PHASES.map((p, i) => (
            <g key={p.rij}>
              <rect x="0" y={i * BAND} width={W} height={BAND} fill={`url(#zone${i})`} />
              <ellipse
                cx={i % 2 === 0 ? 230 : 770}
                cy={i * BAND + 135}
                rx="340"
                ry="125"
                fill="url(#zoneglow)"
              />
              {/* glooiende heuvels onderin de zone */}
              <path
                d={`M 0 ${(i + 1) * BAND} Q 250 ${(i + 1) * BAND - 52} 520 ${(i + 1) * BAND - 14} T ${W} ${(i + 1) * BAND - 38} L ${W} ${(i + 1) * BAND} Z`}
                fill="rgba(255,255,255,0.035)"
              />
              <path
                d={`M 0 ${(i + 1) * BAND} Q 420 ${(i + 1) * BAND - 30} 700 ${(i + 1) * BAND - 8} T ${W} ${(i + 1) * BAND - 18} L ${W} ${(i + 1) * BAND} Z`}
                fill="rgba(229,0,103,0.05)"
              />
              <line
                x1="0"
                y1={i * BAND}
                x2={W}
                y2={i * BAND}
                stroke="rgba(229,0,103,0.22)"
                strokeWidth="1.5"
                strokeDasharray="10 14"
              />
              {/* bomen en decoratie */}
              {TREE_SPOTS.map(([tx, ty, ts], j) => (
                <text
                  key={`t${j}`}
                  x={(tx / 100) * W + ((i * 37) % 23)}
                  y={i * BAND + (ty / 100) * BAND + 20}
                  fontSize={ts}
                  opacity="0.5"
                >
                  {TREES[(i + j) % TREES.length]}
                </text>
              ))}
              {p.deco.map((emoji, j) => {
                const [dx, dy, size, rot] = DECO_SPOTS[j % DECO_SPOTS.length];
                return (
                  <text
                    key={j}
                    className="zone-deco"
                    x={(dx / 100) * W}
                    y={i * BAND + (dy / 100) * BAND + 28}
                    fontSize={size}
                    opacity="0.4"
                    transform={`rotate(${rot} ${(dx / 100) * W} ${i * BAND + (dy / 100) * BAND + 28})`}
                    style={{ animationDelay: `${(i * 4 + j) * 0.7}s` }}
                  >
                    {emoji}
                  </text>
                );
              })}
              <Billboard zone={i} />
            </g>
          ))}

          {/* De weg: licht asfalt met donkere rand, zoals op het echte bord */}
          <path d={road} className="road-outer" />
          <path d={road} className="road-inner" />

          {/* De 64 tegels óp de weg */}
          {SQUARES.map((sq) => (
            <Tile key={sq.n} sq={sq} state={state} hovered={hovered === sq.n} />
          ))}

          {/* Mijlpaallabels, rechtop onder de tegel */}
          {SQUARES.filter(
            (sq) => sq.type === "milestone" || sq.type === "finish" || sq.type === "start",
          ).map((sq) => {
            const { x, y } = nodePos(sq.n);
            return (
              <text
                key={sq.n}
                className="tile-label"
                x={Math.min(Math.max(x, 130), W - 130)}
                y={y + 56}
                textAnchor="middle"
                fontSize="13"
                fontWeight="800"
              >
                {sq.title.toUpperCase()}
              </text>
            );
          })}

          {/* Het pionnetje */}
          <Pawn x={tokenPos.x} y={tokenPos.y - 10} moving={moving} />
        </svg>

        {/* Fasekoppen met foto */}
        {PHASES.map((p, i) => (
          <div
            key={p.rij}
            className={`zone-head ${i % 2 === 0 ? "left" : "right"}`}
            style={{ top: `${((i * BAND + 14) / H) * 100}%` }}
          >
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

      {inspect !== null && (
        <InspectPopover n={inspect} state={state} onClose={() => setInspect(null)} />
      )}
    </div>
  );
}
