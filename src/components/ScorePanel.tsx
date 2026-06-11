import { useEffect, useRef, useState } from "react";
import { budgetLabel, timeLabel } from "../game/engine";
import { careerById } from "../data/careers";
import type { GameState, MeterId } from "../game/types";

function MeterBar({
  id,
  label,
  value,
}: {
  id: MeterId;
  label: string;
  value: number;
}) {
  const prev = useRef(value);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (prev.current !== value) {
      prev.current = value;
      setFlash(true);
      const t = setTimeout(() => setFlash(false), 700);
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <div className={`meter meter-${id} ${flash ? "flash" : ""}`}>
      <div className="meter-head">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div
        className="meter-track"
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        aria-label={label}
      >
        <div className="meter-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

type Props = {
  state: GameState;
  onRoll: () => void;
  rollDisabled: boolean;
  lastRoll: number | null;
  moving: boolean;
  onToggleTeacher: () => void;
};

export function ScorePanel({
  state,
  onRoll,
  rollDisabled,
  lastRoll,
  moving,
  onToggleTeacher,
}: Props) {
  const route = careerById(state.careerRouteId);
  return (
    <aside className="score-panel" aria-label="Scorepaneel">
      <MeterBar id="health" label="Gezondheid" value={state.meters.health} />
      <MeterBar id="planet" label="Planeet" value={state.meters.planet} />
      <MeterBar id="compass" label="Kompas" value={state.meters.compass} />

      <div className="cond-tags">
        <span className="cond-tag">
          Budget: <strong>{budgetLabel(state.conditions.budget)}</strong>
        </span>
        <span className="cond-tag">
          Tijdsdruk: <strong>{timeLabel(state.conditions.timePressure)}</strong>
        </span>
        {state.conditions.diagnosis !== "geen" && (
          <span className="cond-tag">
            Diagnose: <strong>{state.conditions.diagnosis}</strong>
          </span>
        )}
      </div>

      {route && <div className="career-badge">Beroepsroute: {route.title}</div>}

      <div className="dice-area">
        <button className="btn" onClick={onRoll} disabled={rollDisabled}>
          {moving ? "DE PION BEWEEGT…" : "GOOI DE DOBBELSTEEN"}
        </button>
        <div className="dice-result" aria-live="polite">
          {lastRoll !== null && (
            <>
              Gegooid: <span className="dice-face">{lastRoll}</span>
            </>
          )}
        </div>
      </div>

      <button className="btn btn-ghost btn-small" onClick={onToggleTeacher}>
        {state.teacherMode ? "DOCENTMODUS SLUITEN" : "DOCENTMODUS"}
      </button>
    </aside>
  );
}
