import type { GameState } from "./types";
import { initialState } from "./engine";

const KEY = "het-levenspad-v1";

export function saveState(state: GameState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // opslag niet beschikbaar (bijv. private mode) — spel blijft speelbaar
  }
}

export function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    // minimale sanity-check zodat een oud of corrupt save het spel niet breekt
    if (typeof parsed.position !== "number" || !parsed.meters) return null;
    return { ...initialState(), ...parsed };
  } catch {
    return null;
  }
}

export function clearState() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // negeren
  }
}
