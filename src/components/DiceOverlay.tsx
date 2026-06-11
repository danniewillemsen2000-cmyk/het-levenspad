import { useEffect, useState } from "react";

// Eindrotatie per ogenwaarde: zo komt de juiste zijde boven te liggen.
// De extra hele omwentelingen (720°) zorgen voor het tuimelen.
const FINAL_ROT: Record<number, [number, number]> = {
  1: [0, 0],
  2: [0, -90],
  3: [-90, 0],
  4: [90, 0],
  5: [0, 90],
  6: [0, 180],
};

// Posities van de stippen per zijde (3×3 grid, cellen 1-9)
const PIPS: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

function Face({ value, className }: { value: number; className: string }) {
  return (
    <div className={`dice-face-3d ${className}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
        <span key={cell} className={PIPS[value].includes(cell) ? "pip" : "pip empty"} />
      ))}
    </div>
  );
}

export function DiceOverlay({ roll }: { roll: number }) {
  const [spun, setSpun] = useState(false);
  useEffect(() => {
    // start de worp één frame na het mounten, zodat de transitie aanslaat
    const raf = requestAnimationFrame(() => setSpun(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const [rx, ry] = FINAL_ROT[roll] ?? [0, 0];
  // drie volledige omwentelingen: rustig maar levendig tuimelen
  const transform = spun
    ? `rotateX(${1080 + rx}deg) rotateY(${1080 + ry}deg)`
    : "rotateX(-180deg) rotateY(-270deg)";

  return (
    <div className="dice-overlay" aria-label={`Dobbelsteen rolt: ${roll}`} role="status">
      <div className="dice-stage">
        <div className="dice-drop">
          <div className="dice-cube" style={{ transform }}>
            <Face value={1} className="f-front" />
            <Face value={6} className="f-back" />
            <Face value={2} className="f-right" />
            <Face value={5} className="f-left" />
            <Face value={3} className="f-top" />
            <Face value={4} className="f-bottom" />
          </div>
        </div>
        <div className="dice-shadow" />
      </div>
    </div>
  );
}
