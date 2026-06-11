import { useMemo, useState } from "react";
import { END_PHOTO, END_PHOTO_ALT } from "../data/board";
import { CLOSING_LINE, DEBRIEF_QUESTIONS } from "../data/meta";
import { biggestImpact, endProfile, lifeExpectancy } from "../game/engine";
import type { GameState } from "../game/types";

function pickThree(): string[] {
  const pool = [...DEBRIEF_QUESTIONS];
  const out: string[] = [];
  while (out.length < 3 && pool.length) {
    out.push(pool.splice(Math.floor(Math.random() * pool.length), 1)[0]);
  }
  return out;
}

export function EndScreen({
  state,
  onRestart,
}: {
  state: GameState;
  onRestart: () => void;
}) {
  const [showPath, setShowPath] = useState(false);
  const age = lifeExpectancy(state);
  const profile = endProfile(state);
  const impact = biggestImpact(state);
  const questions = useMemo(pickThree, []);
  const minMeter = Math.min(
    state.meters.health,
    state.meters.planet,
    state.meters.compass,
  );

  return (
    <div className="end-screen">
      <div className="end-hero">
        <img src={END_PHOTO} alt={END_PHOTO_ALT} />
      </div>
      <div className="end-age">
        <div className="age">{age} jaar</div>
        <div className="label">Bereikte leeftijd op het levenspad</div>
      </div>

      <div className="end-scores">
        <div className="end-score">
          <div className="value" style={{ color: "#34d399" }}>
            {state.meters.health}
          </div>
          <div className="name">Gezondheid</div>
        </div>
        <div className="end-score">
          <div className="value" style={{ color: "#38bdf8" }}>
            {state.meters.planet}
          </div>
          <div className="name">Planeet (lichtste nalatenschap)</div>
        </div>
        <div className="end-score">
          <div className="value" style={{ color: "var(--go-pink)" }}>
            {state.meters.compass}
          </div>
          <div className="name">Kompas (scherpste kompas)</div>
        </div>
      </div>

      <div className="end-profile">
        <h3>Jullie eindprofiel: {profile.title}</h3>
        <p>{profile.text}</p>
      </div>

      <div className="end-block">
        <h4>Sterkste balans</h4>
        <p>
          Jullie laagste meter eindigde op <strong>{minMeter}</strong>. Hoe
          hoger die laagste score, hoe beter jullie gezondheid, planeet en
          kompas in evenwicht hielden — en dat evenwicht is precies waar goed
          voedingsadvies om draait.
        </p>
        {impact && impact.score > 0 && (
          <p>
            De keuze met het grootste effect was <strong>{impact.title}</strong>
            {impact.choice ? (
              <>
                {" "}
                — jullie kozen: <em>"{impact.choice}"</em>
              </>
            ) : null}
            .
          </p>
        )}
      </div>

      <div className="end-block">
        <h4>Bespreek na met de klas</h4>
        <ol>
          {questions.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
      </div>

      <p className="end-closing">"{CLOSING_LINE}"</p>

      <div className="end-buttons">
        <button className="btn" onClick={onRestart}>
          SPEEL OPNIEUW
        </button>
        <button className="btn btn-ghost" onClick={() => setShowPath((v) => !v)}>
          BEKIJK JULLIE LEVENSPAD
        </button>
      </div>

      {showPath && (
        <div className="end-block path-log">
          <h4>Jullie levenspad</h4>
          <ol>
            {state.history.map((h) => (
              <li key={h.turn}>
                <strong>
                  Vak {h.square}: {h.cardTitle}
                </strong>
                {h.choiceText && <> — {h.choiceText}</>}
                <div className="fx">{h.effectSummary}</div>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}
