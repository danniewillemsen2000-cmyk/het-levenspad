import { useState } from "react";
import { GlyphIcon } from "./Glyphs";

type Props = {
  onStart: () => void;
  onTeacher: () => void;
  hasSave: boolean;
  onContinue: () => void;
};

export function StartScreen({ onStart, onTeacher, hasSave, onContinue }: Props) {
  const [showRules, setShowRules] = useState(false);

  const floaters = ["leaf", "cupcake", "chip", "globe", "bottle", "cap", "cart", "heart"];

  return (
    <div className="start-screen">
      <div className="start-floaters" aria-hidden="true">
        {floaters.map((f, i) => (
          <span
            key={i}
            style={{
              left: `${6 + i * 12}%`,
              top: `${i % 2 === 0 ? 12 + i * 3 : 68 - i * 2}%`,
              animationDelay: `${i * 0.9}s`,
            }}
          >
            <GlyphIcon name={f} size={26 + (i % 3) * 12} color="var(--go-pink)" />
          </span>
        ))}
      </div>
      <div className="start-kicker">HAN · Voeding en Diëtetiek</div>
      <h1 className="start-title">
        HET <span className="accent">LEVENSPAD</span>
      </h1>
      <p className="start-subtitle">Van eerste hap tot laatste advies</p>
      <p className="start-intro">
        Je doorloopt een mensenleven vol voedingskeuzes. Sommige keuzes lijken
        gezond, maar zijn niet haalbaar. Sommige keuzes zijn duurzaam, maar
        passen niet bij ieder ziektebeeld. Sommige digitale hulpmiddelen helpen,
        andere sturen je ongemerkt de verkeerde kant op. Hoe oud word je en wat
        laat je achter?
      </p>
      <div className="start-buttons">
        <button className="btn" onClick={onStart}>
          START HET LEVENSPAD
        </button>
        {hasSave && (
          <button className="btn btn-ghost" onClick={onContinue}>
            VERDER MET OPGESLAGEN SPEL
          </button>
        )}
        <button className="btn btn-ghost" onClick={() => setShowRules((v) => !v)}>
          BEKIJK DE SPELREGELS
        </button>
        <button className="btn btn-ghost" onClick={onTeacher}>
          DOCENTMODUS
        </button>
      </div>
      {showRules && (
        <div className="rules-box">
          <h3>Spelregels</h3>
          <ul>
            <li>Speel in teams van 2 tot 4 studenten met één scherm.</li>
            <li>
              Gooi de dobbelsteen en doorloop het levenspad van 64 vakjes: van
              babyvoeding tot het laatste beroepsadvies.
            </li>
            <li>
              Op elk vakje volgt een dilemma, gebeurtenis, factcheck of
              levenskeuze. Overleg en kies samen — veel opties zijn verdedigbaar.
            </li>
            <li>
              Drie meters tellen mee: <strong>Gezondheid</strong>,{" "}
              <strong>Planeet</strong> en <strong>Kompas</strong>. Ze kunnen
              botsen: dat hoort zo.
            </li>
            <li>
              Mijlpalen (vak 8, 16, 24 …) kun je niet overslaan: daar reflecteer
              je op de afgelopen levensfase.
            </li>
            <li>Op vak 33 kies je een beroepsroute die latere keuzes kleurt.</li>
            <li>
              Aan het einde zie je hoe oud jullie werden, welk profiel bij
              jullie past en wat jullie nalaten. De nabespreking in de klas is
              onderdeel van het spel.
            </li>
          </ul>
          <p style={{ fontSize: "0.82rem", color: "#999" }}>
            Dit is een educatief reflectiespel, geen persoonlijk
            gezondheidsadvies.
          </p>
        </div>
      )}
    </div>
  );
}
