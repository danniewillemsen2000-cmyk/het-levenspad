import { useEffect, useState } from "react";
import { TYPE_LABELS, phaseForSquare } from "../data/board";
import { CAREERS } from "../data/careers";
import { getFact } from "../data/facts";
import {
  convenienceBonusFor,
  optionLocked,
  routeBonusFor,
} from "../game/engine";
import type { Card, CardOption, CareerRoute, FactCheck, GameState } from "../game/types";

const TYPE_COLORS: Record<string, string> = {
  start: "var(--go-pink)",
  dilemma: "var(--type-dilemma)",
  event: "var(--type-event)",
  fact: "var(--type-fact)",
  compass: "var(--type-compass)",
  life: "var(--type-life)",
  career: "var(--type-career)",
  milestone: "var(--type-milestone)",
  finish: "var(--go-pink)",
};

export type CardResult = {
  summary: string;
  explain?: string;
  factCorrect?: boolean;
};

type Props = {
  card: Card;
  state: GameState;
  fact: FactCheck | null; // actieve factcheck (bij fact-vakjes)
  result: CardResult | null;
  alreadyPlayed: boolean;
  onChoose: (option: CardOption) => void;
  onFactAnswer: (answer: "eens" | "oneens") => void;
  onAutoContinue: () => void;
  onCareerPick: (route: CareerRoute) => void;
  onClose: () => void;
};

export function CardPanel({
  card,
  state,
  fact,
  result,
  alreadyPlayed,
  onChoose,
  onFactAnswer,
  onAutoContinue,
  onCareerPick,
  onClose,
}: Props) {
  const color = TYPE_COLORS[card.type];
  const isCareerPicker = card.type === "career" && card.square === 33;
  const hasOptions = !!card.options?.length;

  // Korte klikbescherming: voorkomt dat een (dubbel)klik op de dobbelsteen
  // doorlekt naar een keuzeknop die op dezelfde plek openschuift.
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(false);
    const t = setTimeout(() => setReady(true), 400);
    return () => clearTimeout(t);
  }, [card.id]);
  const guard = (fn: () => void) => () => {
    if (ready) fn();
  };

  return (
    <div className="card-overlay" role="dialog" aria-modal="true" aria-label={card.title}>
      <div className="card-panel">
        {card.square > 0 && (
          <div className="card-photo">
            <img
              src={phaseForSquare(card.square).photo}
              alt={phaseForSquare(card.square).photoAlt}
            />
          </div>
        )}
        <span className="card-type" style={{ "--tag-color": color } as React.CSSProperties}>
          {TYPE_LABELS[card.type]}
        </span>
        <h2 className="card-title">{fact ? card.title : card.title}</h2>
        <span className="card-square-ref">Vak {card.square || "—"}</span>

        {alreadyPlayed ? (
          <>
            <p className="card-situation">
              Dit moment is in deze sessie al gespeeld. Jullie komen even op adem
              — het leven dendert door.
            </p>
            <button className="btn" onClick={onClose} autoFocus>
              VERDER
            </button>
          </>
        ) : (
          <>
            <p className="card-situation">{fact ? fact.statement : card.situation}</p>

            {/* Automatisch effect van een gebeurtenis, vooraf aangekondigd */}
            {card.autoLabel && !result && (
              <div className="effect-summary">
                <h4>Wat er gebeurt</h4>
                <p>{card.autoLabel}</p>
              </div>
            )}

            {/* Keuzemoment */}
            {!result && fact && (
              <div className="choice-list">
                <button className="choice-btn" onClick={guard(() => onFactAnswer("eens"))} autoFocus>
                  Eens
                </button>
                <button className="choice-btn" onClick={guard(() => onFactAnswer("oneens"))}>
                  Oneens
                </button>
              </div>
            )}

            {!result && !fact && isCareerPicker && (
              <div className="career-grid">
                {CAREERS.map((route, i) => (
                  <button
                    key={route.id}
                    className="career-card"
                    onClick={guard(() => onCareerPick(route))}
                    autoFocus={i === 0}
                  >
                    <h4>{route.title}</h4>
                    <span className="bonus">{route.bonusText}</span>
                    <div className="accent-line">{route.accent}</div>
                  </button>
                ))}
              </div>
            )}

            {!result && !fact && !isCareerPicker && hasOptions && (
              <div className="choice-list">
                {card.options!.map((opt, i) => {
                  const lock = optionLocked(state, opt);
                  const routeHint = routeBonusFor(state, opt);
                  const convHint = convenienceBonusFor(state, opt);
                  return (
                    <button
                      key={opt.id}
                      className={`choice-btn ${lock ? "locked" : ""}`}
                      disabled={!!lock}
                      onClick={guard(() => onChoose(opt))}
                      autoFocus={i === 0 && !lock}
                    >
                      {opt.text}
                      {lock && <span className="choice-lock">🔒 {lock}</span>}
                      {!lock && routeHint && (
                        <span className="choice-hint">Past bij jullie beroepsroute (+1 Kompas)</span>
                      )}
                      {!lock && convHint && (
                        <span className="choice-hint">Hoge tijdsdruk: gemak geeft hier +1 Gezondheid</span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {!result && !fact && !isCareerPicker && !hasOptions && (
              <button className="btn" onClick={guard(onAutoContinue)} autoFocus>
                VERDER
              </button>
            )}

            {/* Resultaat na de keuze */}
            {result && (
              <>
                {result.factCorrect !== undefined && (
                  <p className={`fact-answer ${result.factCorrect ? "fact-correct" : "fact-wrong"}`}>
                    {result.factCorrect
                      ? "Goed gezien — dat klopt."
                      : `Niet helemaal: het juiste antwoord is "${fact?.answer}".`}
                  </p>
                )}
                <div className="effect-summary">
                  <h4>Waarom de meters verschuiven</h4>
                  {result.explain && <p>{result.explain}</p>}
                  <p className="effect-changes">{result.summary}</p>
                </div>
                {card.reflection && (
                  <div className="reflection-box">
                    <strong>Bespreek aan tafel</strong>
                    {card.reflection}
                  </div>
                )}
                <button className="btn" onClick={onClose} autoFocus>
                  VERDER OP HET PAD
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
