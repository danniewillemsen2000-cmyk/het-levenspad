import { useState } from "react";
import { CARDS } from "../data/cards";
import { FACTS } from "../data/facts";
import { DEBRIEF_QUESTIONS } from "../data/meta";
import { budgetLabel, exportReport, timeLabel } from "../game/engine";
import type { GameState } from "../game/types";

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

type Props = {
  state: GameState;
  forcedRoll: number | null;
  onForcedRoll: (v: number | null) => void;
  onOpenCard: (cardId: string, factId?: string) => void;
  onReset: () => void;
};

export function TeacherPanel({
  state,
  forcedRoll,
  onForcedRoll,
  onOpenCard,
  onReset,
}: Props) {
  const [debrief, setDebrief] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const c = state.conditions;

  const pickDebrief = () => {
    const pool = [...DEBRIEF_QUESTIONS];
    const out: string[] = [];
    while (out.length < 3 && pool.length) {
      out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
    }
    setDebrief(out);
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(DEBRIEF_QUESTIONS.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard niet beschikbaar
    }
  };

  return (
    <div className="teacher-panel">
      <h3>Docentmodus</h3>

      <div className="teacher-conditions">
        <span>Budget: {budgetLabel(c.budget)}</span>
        <span>Tijdsdruk: {timeLabel(c.timePressure)}</span>
        <span>Sociale steun: {c.socialSupport}/5</span>
        <span>Kookvaardigheid: {c.cookingSkill}/5</span>
        <span>AI-geletterdheid: {c.aiLiteracy}/5</span>
        <span>Invloed: {c.professionalInfluence}/5</span>
        <span>Diagnose: {c.diagnosis}</span>
        <span>
          Kind: {c.hasChild ? "ja" : "nee"} · Huisdier: {c.hasPet ? "ja" : "nee"}
        </span>
      </div>

      <div className="teacher-row">
        <label htmlFor="force-dice">Dobbelsteen forceren:</label>
        <select
          id="force-dice"
          value={forcedRoll ?? ""}
          onChange={(e) =>
            onForcedRoll(e.target.value === "" ? null : Number(e.target.value))
          }
        >
          <option value="">willekeurig</option>
          {[1, 2, 3, 4, 5, 6].map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
      </div>

      <div className="teacher-row">
        <label htmlFor="open-card">Kaart openen:</label>
        <select
          id="open-card"
          value=""
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            if (v.startsWith("fact:")) onOpenCard("c6", v.slice(5));
            else onOpenCard(v);
          }}
        >
          <option value="">kies een kaart…</option>
          {CARDS.filter((card) => card.type !== "fact").map((card) => (
            <option key={card.id} value={card.id}>
              Vak {card.square}: {card.title}
            </option>
          ))}
          {FACTS.map((f) => (
            <option key={f.id} value={`fact:${f.id}`}>
              Factcheck: {f.statement.slice(0, 60)}…
            </option>
          ))}
        </select>
      </div>

      <div className="teacher-row">
        <button
          className="btn btn-ghost btn-small"
          onClick={() =>
            download(
              "levenspad-rapport.json",
              JSON.stringify(state, null, 2),
              "application/json",
            )
          }
        >
          Export JSON
        </button>
        <button
          className="btn btn-ghost btn-small"
          onClick={() =>
            download("levenspad-rapport.txt", exportReport(state), "text/plain")
          }
        >
          Export tekst
        </button>
        <button className="btn btn-ghost btn-small" onClick={pickDebrief}>
          3 nabespreekvragen
        </button>
        <button className="btn btn-ghost btn-small" onClick={copyAll}>
          {copied ? "Gekopieerd!" : "Kopieer alle vragen"}
        </button>
        <button className="btn btn-small" onClick={onReset}>
          Sessie resetten
        </button>
      </div>

      {debrief.length > 0 && (
        <ol className="debrief-list">
          {debrief.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      )}

      <div className="teacher-log" aria-label="Logboek van keuzes">
        {state.history.length === 0 && <em>Nog geen keuzes gemaakt.</em>}
        {state.history.map((h) => (
          <div key={h.turn}>
            {h.turn}. [vak {h.square}] {h.cardTitle}
            {h.choiceText ? ` — ${h.choiceText}` : ""} → {h.effectSummary}
          </div>
        ))}
      </div>
    </div>
  );
}
