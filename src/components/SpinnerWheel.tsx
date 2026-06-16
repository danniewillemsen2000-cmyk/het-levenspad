import { useEffect, useRef, useState } from "react";

// Een draairad in Levensweg-stijl. Het rad heeft 12 segmenten (waarde 1–6,
// elk twee keer) zodat het speelt als een d6 maar oogt als een echt rad.
const SEG = 12;
const SEG_ANG = 360 / SEG;
const PALETTE = ["#e50067", "#f59e0b", "#38bdf8", "#a78bfa", "#34d399", "#fb7185"];

// Punt op de rand, hoek gemeten vanaf de top met de klok mee.
function pt(angDeg: number, r = 48) {
  const a = (angDeg * Math.PI) / 180;
  return { x: 50 + r * Math.sin(a), y: 50 - r * Math.cos(a) };
}

function slicePath(i: number) {
  const p0 = pt(i * SEG_ANG);
  const p1 = pt((i + 1) * SEG_ANG);
  return `M50 50 L ${p0.x.toFixed(2)} ${p0.y.toFixed(2)} A 48 48 0 0 1 ${p1.x.toFixed(2)} ${p1.y.toFixed(2)} Z`;
}

type Props = {
  value: number | null;
  spinId: number;
  spinning: boolean;
  disabled: boolean;
  onSpin: () => void;
};

export function SpinnerWheel({ value, spinId, spinning, disabled, onSpin }: Props) {
  const [rotation, setRotation] = useState(0);
  const prevSpin = useRef(0);

  useEffect(() => {
    if (spinId === prevSpin.current || value == null) return;
    prevSpin.current = spinId;
    // kies een van de twee segmenten met deze waarde (waarde = (i % 6) + 1)
    const options = [value - 1, value - 1 + 6];
    const seg = options[Math.floor(Math.random() * options.length)];
    const segCenter = seg * SEG_ANG + SEG_ANG / 2;
    const alignment = (360 - segCenter) % 360; // breng segmentmidden naar de top
    setRotation((prev) => {
      const minTarget = prev + 4 * 360; // minstens vier hele slagen
      return Math.ceil((minTarget - alignment) / 360) * 360 + alignment;
    });
  }, [spinId, value]);

  return (
    <div className="wheel-area">
      <button
        className="wheel-btn"
        onClick={onSpin}
        disabled={disabled}
        aria-label="Draai aan het rad"
      >
        <div className="wheel-stage">
          <svg viewBox="0 0 100 100" className="wheel-svg" aria-hidden="true">
            <g
              className="wheel-spin"
              style={{
                transform: `rotate(${rotation}deg)`,
                transformOrigin: "50% 50%",
                transformBox: "fill-box",
              }}
            >
              <circle cx="50" cy="50" r="49" fill="#101014" />
              {Array.from({ length: SEG }, (_, i) => (
                <path
                  key={i}
                  d={slicePath(i)}
                  fill={PALETTE[i % 6]}
                  stroke="rgba(16,16,20,0.55)"
                  strokeWidth="0.6"
                />
              ))}
              {Array.from({ length: SEG }, (_, i) => {
                const mid = i * SEG_ANG + SEG_ANG / 2;
                const p = pt(mid, 34);
                const dark = i % 6 === 1 || i % 6 === 2 || i % 6 === 4; // amber/sky/green
                return (
                  <text
                    key={i}
                    x={p.x}
                    y={p.y}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize="9"
                    fontWeight="900"
                    fill={dark ? "#101014" : "#ffffff"}
                    transform={`rotate(${mid} ${p.x} ${p.y})`}
                  >
                    {(i % 6) + 1}
                  </text>
                );
              })}
              <circle cx="50" cy="50" r="48" fill="none" stroke="#ffffff" strokeWidth="2" />
            </g>
            {/* vaste naaf met merksterretje */}
            <circle cx="50" cy="50" r="11" fill="#101014" stroke="#ffffff" strokeWidth="2" />
            <path
              d="M50 44 L51.6 48.4 L56 50 L51.6 51.6 L50 56 L48.4 51.6 L44 50 L48.4 48.4 Z"
              fill="#e50067"
            />
            {/* wijzer bovenaan */}
            <path
              d="M50 13 L43 -1 L57 -1 Z"
              fill="#ffffff"
              stroke="#e50067"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="wheel-cta">{spinning ? "HET RAD DRAAIT…" : "DRAAI AAN HET RAD"}</span>
      </button>
      <div className="wheel-result" aria-live="polite">
        {value !== null && !spinning && (
          <>
            Je draaide <span className="wheel-number">{value}</span>
          </>
        )}
      </div>
    </div>
  );
}
