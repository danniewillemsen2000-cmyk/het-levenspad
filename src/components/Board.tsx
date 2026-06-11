import { useMemo, useState } from "react";
import { MILESTONES, PHASES, SQUARES, TYPE_LABELS, phaseForSquare } from "../data/board";
import type { GameState, Square } from "../game/types";

// ── Geometrie van het slingerende levenspad ─────────────────────────
// Het bord is een wereld van 1000 × 2000 eenheden: acht zones van 250 hoog.
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

export function nodePos(n: number) {
  const idx = n - 1;
  const row = Math.floor(idx / 8);
  const col = idx % 8;
  const c = row % 2 === 0 ? col : 7 - col; // slangpatroon
  const x = 92 + c * (816 / 7);
  const y = row * BAND + 162 + Math.sin((c + row * 1.7) * 1.05) * 18;
  return { x, y };
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
      const out = prev.x > W / 2 ? prev.x + 105 : prev.x - 105;
      d += ` C ${out.toFixed(1)} ${(prev.y + 40).toFixed(1)}, ${out.toFixed(1)} ${(cur.y - 40).toFixed(1)}, ${cur.x.toFixed(1)} ${cur.y.toFixed(1)}`;
    }
  }
  return d;
}

// Vaste decoratieposities per zone (x%, y% binnen de band, grootte, rotatie)
const DECO_SPOTS = [
  [6, 18, 34, -12],
  [88, 12, 30, 10],
  [38, 8, 24, -6],
  [68, 80, 26, 8],
] as const;

function WorldNode({
  sq,
  state,
  onInspect,
}: {
  sq: Square;
  state: GameState;
  onInspect: (n: number) => void;
}) {
  const { x, y } = nodePos(sq.n);
  const isMilestone = sq.type === "milestone" || sq.type === "finish";
  const current = state.position === sq.n;
  const visited = sq.n < state.position;
  const cls = [
    "world-node",
    isMilestone ? "is-milestone" : "",
    current ? "current" : "",
    visited ? "visited" : "",
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button
      className={cls}
      style={
        {
          left: `${(x / W) * 100}%`,
          top: `${(y / H) * 100}%`,
          "--ring": TYPE_COLORS[sq.type],
        } as React.CSSProperties
      }
      onClick={() => onInspect(sq.n)}
      aria-label={`Vak ${sq.n}: ${sq.title} (${TYPE_LABELS[sq.type]})`}
      aria-current={current ? "step" : undefined}
    >
      <span className="node-icon" aria-hidden="true">
        {sq.icon}
      </span>
      <span className="node-num">{sq.n}</span>
      {(isMilestone || sq.type === "start" || sq.type === "career") && (
        <span className="node-label">{sq.title}</span>
      )}
    </button>
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

export function Board({ state }: { state: GameState }) {
  const [inspect, setInspect] = useState<number | null>(null);
  const road = useMemo(buildRoad, []);
  const tokenPos = nodePos(state.position);

  return (
    <div className="world-wrap">
      <div className="world" aria-label="Speelbord: het levenspad door acht levensfasen">
        <svg
          className="world-svg"
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            {PHASES.map((p, i) => (
              <linearGradient key={i} id={`zone${i}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={p.hue[0]} />
                <stop offset="100%" stopColor={p.hue[1]} />
              </linearGradient>
            ))}
            <radialGradient id="zoneglow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(229,0,103,0.16)" />
              <stop offset="100%" stopColor="rgba(229,0,103,0)" />
            </radialGradient>
          </defs>

          {/* Wereldzones per levensfase */}
          {PHASES.map((p, i) => (
            <g key={p.rij}>
              <rect x="0" y={i * BAND} width={W} height={BAND} fill={`url(#zone${i})`} />
              <ellipse
                cx={i % 2 === 0 ? 220 : 780}
                cy={i * BAND + 130}
                rx="330"
                ry="120"
                fill="url(#zoneglow)"
              />
              <line
                x1="0"
                y1={i * BAND}
                x2={W}
                y2={i * BAND}
                stroke="rgba(229,0,103,0.25)"
                strokeWidth="1.5"
                strokeDasharray="10 14"
              />
              {/* zwevende decoratie-emoji's */}
              {p.deco.map((emoji, j) => {
                const [dx, dy, size, rot] = DECO_SPOTS[j % DECO_SPOTS.length];
                return (
                  <text
                    key={j}
                    className="zone-deco"
                    x={(dx / 100) * W}
                    y={i * BAND + (dy / 100) * BAND + 30}
                    fontSize={size}
                    opacity="0.33"
                    transform={`rotate(${rot} ${(dx / 100) * W} ${i * BAND + (dy / 100) * BAND + 30})`}
                    style={{ animationDelay: `${(i * 4 + j) * 0.7}s` }}
                  >
                    {emoji}
                  </text>
                );
              })}
            </g>
          ))}

          {/* De weg door het leven */}
          <path d={road} className="road-outer" />
          <path d={road} className="road-inner" />
          <path d={road} className="road-line" />
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

        {/* De 64 vakjes */}
        {SQUARES.map((sq) => (
          <WorldNode key={sq.n} sq={sq} state={state} onInspect={setInspect} />
        ))}

        {/* De pion */}
        <div
          className="world-token"
          style={{
            left: `${(tokenPos.x / W) * 100}%`,
            top: `${(tokenPos.y / H) * 100}%`,
          }}
          aria-hidden="true"
        >
          🍴
        </div>
      </div>

      {inspect !== null && (
        <InspectPopover n={inspect} state={state} onClose={() => setInspect(null)} />
      )}
    </div>
  );
}
