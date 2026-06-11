import { MILESTONES } from "../data/board";
import { careerById } from "../data/careers";
import { PROFILES } from "../data/meta";
import type {
  Card,
  CardOption,
  Conditions,
  Diagnosis,
  Effect,
  EndProfile,
  GameState,
} from "./types";

export const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));

export function initialState(): GameState {
  return {
    started: false,
    position: 1,
    meters: { health: 50, planet: 50, compass: 50 },
    conditions: {
      budget: 1,
      timePressure: 1,
      socialSupport: 2,
      cookingSkill: 1,
      aiLiteracy: 1,
      professionalInfluence: 0,
      diagnosis: "geen",
      hasChild: false,
      hasPet: false,
    },
    passedMilestones: [],
    answeredCardIds: [],
    usedFactIds: [],
    history: [],
    turn: 0,
    completed: false,
    teacherMode: false,
  };
}

// Bepaal het doelvakje: stop altijd op de eerstvolgende nog niet gespeelde mijlpaal.
export function targetSquare(state: GameState, roll: number): number {
  const raw = Math.min(64, state.position + roll);
  for (const m of MILESTONES) {
    if (m > state.position && m <= raw && !state.passedMilestones.includes(m)) {
      return m;
    }
  }
  return raw;
}

const BUDGET_LABELS = ["krap", "gemiddeld", "ruim"];
const TIME_LABELS = ["laag", "gemiddeld", "hoog"];

export function budgetLabel(v: number) {
  return BUDGET_LABELS[clamp(v, 0, 2)];
}
export function timeLabel(v: number) {
  return TIME_LABELS[clamp(v, 0, 2)];
}

// Past één effect toe op de state en geeft een leesbare samenvatting terug.
export function applyEffect(state: GameState, effect: Effect): string {
  const parts: string[] = [];
  const m = state.meters;
  const c = state.conditions;

  const meterNames: Array<["health" | "planet" | "compass", string]> = [
    ["health", "Gezondheid"],
    ["planet", "Planeet"],
    ["compass", "Kompas"],
  ];
  for (const [key, label] of meterNames) {
    const d = effect[key];
    if (d) {
      m[key] = clamp(m[key] + d, 0, 100);
      parts.push(`${label} ${d > 0 ? "+" : ""}${d}`);
    }
  }
  if (effect.budget) {
    c.budget = clamp(c.budget + effect.budget, 0, 2);
    parts.push(`budget ${effect.budget > 0 ? "ruimer" : "krapper"} (${budgetLabel(c.budget)})`);
  }
  if (effect.timePressure) {
    c.timePressure = clamp(c.timePressure + effect.timePressure, 0, 2);
    parts.push(
      `tijdsdruk ${effect.timePressure > 0 ? "hoger" : "lager"} (${timeLabel(c.timePressure)})`,
    );
  }
  const hidden: Array<[keyof Conditions, string]> = [
    ["socialSupport", "sociale steun"],
    ["cookingSkill", "kookvaardigheid"],
    ["aiLiteracy", "AI-geletterdheid"],
    ["professionalInfluence", "invloed"],
  ];
  for (const [key, label] of hidden) {
    const d = effect[key as keyof Effect] as number | undefined;
    if (d) {
      (c[key] as number) = clamp((c[key] as number) + d, 0, 5);
      parts.push(`${label} ${d > 0 ? "+" : ""}${d}`);
    }
  }
  if (effect.diagnosis && effect.diagnosis !== c.diagnosis) {
    c.diagnosis = effect.diagnosis;
    parts.push(`diagnose: ${effect.diagnosis}`);
  }
  if (effect.hasChild) {
    c.hasChild = true;
    parts.push("gezinsuitbreiding");
  }
  if (effect.hasPet) {
    c.hasPet = true;
    parts.push("huisdier in huis");
  }
  return parts.length ? parts.join(", ") : "geen wijziging";
}

// Routebonus: na de beroepskeuze geeft een optie met passende routeTag +1 Kompas.
export function routeBonusFor(state: GameState, option: CardOption): boolean {
  if (!state.careerRouteId) return false;
  const route = careerById(state.careerRouteId);
  return !!route && !!option.routeTags?.includes(route.tag);
}

// Gemaksbonus: bij hoge tijdsdruk geeft een gemaksoptie +1 Gezondheid (minder stress).
export function convenienceBonusFor(state: GameState, option: CardOption): boolean {
  return !!option.convenience && state.conditions.timePressure >= 2;
}

// Is een optie beschikbaar gegeven de omstandigheden?
export function optionLocked(state: GameState, option: CardOption): string | null {
  const r = option.requires;
  if (!r) return null;
  const c = state.conditions;
  if (r.cookingSkill !== undefined && c.cookingSkill < r.cookingSkill) return r.reason;
  if (r.aiLiteracy !== undefined && c.aiLiteracy < r.aiLiteracy) return r.reason;
  if (r.budget !== undefined && c.budget < r.budget) return r.reason;
  return null;
}

// Verwerk een keuze (of automatische gebeurtenis) en log die.
export function resolveChoice(
  state: GameState,
  card: Card,
  option?: CardOption,
): string {
  let summary = "";
  if (card.autoEffect) {
    const auto = applyEffect(state, card.autoEffect);
    if (auto !== "geen wijziging") summary += auto;
  }
  if (option) {
    const s = applyEffect(state, option.effect);
    summary += (summary ? " · " : "") + s;
    if (routeBonusFor(state, option)) {
      applyEffect(state, { compass: 1 });
      summary += " · routebonus Kompas +1";
    }
    if (convenienceBonusFor(state, option)) {
      applyEffect(state, { health: 1 });
      summary += " · hoge tijdsdruk: gemak geeft Gezondheid +1";
    }
  }
  if (!summary) summary = "geen wijziging";

  state.answeredCardIds.push(card.id);
  state.turn += 1;
  state.history.push({
    turn: state.turn,
    square: state.position,
    cardId: card.id,
    cardTitle: card.title,
    choiceId: option?.id,
    choiceText: option?.text,
    effectSummary: summary,
  });
  if (card.type === "milestone" || card.type === "finish") {
    if (!state.passedMilestones.includes(state.position)) {
      state.passedMilestones.push(state.position);
    }
  }
  return summary;
}

const DIAGNOSIS_PENALTY: Record<Diagnosis, number> = {
  geen: 0,
  diabetesrisico: 2,
  hartvaat: 3,
  ondervoeding: 3,
  kankerherstel: 3,
};

// Speelse levensverwachting: Gezondheid weegt het zwaarst,
// sociale steun, kookvaardigheid en diagnoses wegen beperkt mee.
export function lifeExpectancy(state: GameState): number {
  const { health } = state.meters;
  const { socialSupport, cookingSkill, diagnosis } = state.conditions;
  return clamp(
    Math.round(
      72 +
        (health - 50) * 0.24 +
        (socialSupport - 2) * 1.2 +
        cookingSkill * 0.5 -
        DIAGNOSIS_PENALTY[diagnosis],
    ),
    60,
    100,
  );
}

export function endProfile(state: GameState): EndProfile {
  return PROFILES.find((p) => p.match(state))!.profile;
}

// De keuze met het grootste totale effect op de hoofdmeters.
export function biggestImpact(state: GameState) {
  let best: { title: string; choice?: string; score: number } | null = null;
  for (const h of state.history) {
    const matches = h.effectSummary.match(/(Gezondheid|Planeet|Kompas) ([+-]\d+)/g) ?? [];
    const score = matches.reduce(
      (sum, m) => sum + Math.abs(parseInt(m.split(" ")[1], 10)),
      0,
    );
    if (!best || score > best.score) {
      best = { title: h.cardTitle, choice: h.choiceText, score };
    }
  }
  return best;
}

export function exportReport(state: GameState): string {
  const lines = [
    "HET LEVENSPAD — eindrapport",
    `Bereikte leeftijd: ${lifeExpectancy(state)} jaar`,
    `Gezondheid: ${state.meters.health} · Planeet: ${state.meters.planet} · Kompas: ${state.meters.compass}`,
    `Profiel: ${endProfile(state).title}`,
    `Beroepsroute: ${careerById(state.careerRouteId)?.title ?? "niet gekozen"}`,
    "",
    "Logboek:",
    ...state.history.map(
      (h) =>
        `${h.turn}. [vak ${h.square}] ${h.cardTitle}${h.choiceText ? ` — keuze: ${h.choiceText}` : ""} → ${h.effectSummary}`,
    ),
  ];
  return lines.join("\n");
}
