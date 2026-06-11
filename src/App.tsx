import { useEffect, useRef, useState } from "react";
import { Board } from "./components/Board";
import { CardPanel, type CardResult } from "./components/CardPanel";
import { DiceOverlay } from "./components/DiceOverlay";
import { EndScreen } from "./components/EndScreen";
import { ScorePanel } from "./components/ScorePanel";
import { StartScreen } from "./components/StartScreen";
import { TeacherPanel } from "./components/TeacherPanel";
import { phaseForSquare } from "./data/board";
import { cardById, cardForSquare } from "./data/cards";
import { getFact } from "./data/facts";
import { initialState, resolveChoice, targetSquare } from "./game/engine";
import { clearState, loadState, saveState } from "./game/storage";
import type { Card, CardOption, CareerRoute, FactCheck, GameState } from "./game/types";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function App() {
  const [state, setState] = useState<GameState>(initialState);
  const [savedGame, setSavedGame] = useState<GameState | null>(null);
  const [activeCard, setActiveCard] = useState<Card | null>(null);
  const [activeFact, setActiveFact] = useState<FactCheck | null>(null);
  const [result, setResult] = useState<CardResult | null>(null);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [lastRoll, setLastRoll] = useState<number | null>(null);
  const [diceRolling, setDiceRolling] = useState<number | null>(null);
  const [moving, setMoving] = useState(false);
  const [forcedRoll, setForcedRoll] = useState<number | null>(null);

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    setSavedGame(loadState());
  }, []);

  useEffect(() => {
    if (state.started) saveState(state);
  }, [state]);

  const screen = !state.started ? "start" : state.completed ? "end" : "game";

  const startGame = (teacher: boolean) => {
    setState({ ...initialState(), started: true, teacherMode: teacher });
    setLastRoll(null);
    setForcedRoll(null);
  };

  const continueGame = () => {
    if (savedGame) setState(savedGame);
  };

  const resetAll = () => {
    clearState();
    setSavedGame(null);
    setActiveCard(null);
    setActiveFact(null);
    setResult(null);
    setState(initialState());
    setLastRoll(null);
    setForcedRoll(null);
  };

  const openCardAt = (square: number) => {
    const card = cardForSquare(square);
    if (!card) return;
    const s = stateRef.current;
    setIsDemo(false);
    setResult(null);
    setActiveFact(null);

    // geen dubbele kaart binnen één sessie
    if (s.answeredCardIds.includes(card.id) || (card.square === 33 && s.careerRouteId)) {
      setAlreadyPlayed(true);
      setActiveCard(card);
      return;
    }
    setAlreadyPlayed(false);

    if (card.type === "fact" && card.factPool) {
      const unused = card.factPool.filter((f) => !s.usedFactIds.includes(f));
      const pick = unused[Math.floor(Math.random() * unused.length)];
      if (!pick) {
        setAlreadyPlayed(true);
        setActiveCard(card);
        return;
      }
      setActiveFact(getFact(pick) ?? null);
    }
    setActiveCard(card);
  };

  const handleRoll = async () => {
    if (moving || activeCard || state.completed) return;
    const roll = forcedRoll ?? 1 + Math.floor(Math.random() * 6);
    setLastRoll(roll);
    const from = stateRef.current.position;
    const to = targetSquare(stateRef.current, roll);
    if (to === from) return;
    setMoving(true);
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    // de dobbelsteen rolt rustig over het scherm voordat de pion vertrekt
    setDiceRolling(roll);
    await sleep(reduce ? 250 : 2900);
    setDiceRolling(null);
    for (let p = from + 1; p <= to; p++) {
      setState((s) => ({ ...s, position: p }));
      await sleep(reduce ? 30 : 260);
    }
    setMoving(false);
    openCardAt(to);
  };

  // Verwerk een keuze; bij demo (docentmodus) blijft het vakje opnieuw speelbaar.
  const applyChoice = (card: Card, option?: CardOption, factCorrect?: boolean) => {
    const s = structuredClone(stateRef.current);
    const wasAnswered = s.answeredCardIds.includes(card.id);
    const summary = resolveChoice(s, card, option);
    if (isDemo && !wasAnswered) {
      s.answeredCardIds = s.answeredCardIds.filter((id) => id !== card.id);
    }
    setState(s);
    setResult({ summary, explain: option?.explain, factCorrect });
  };

  const handleChoose = (option: CardOption) => {
    if (!activeCard) return;
    applyChoice(activeCard, option);
  };

  const handleFactAnswer = (answer: "eens" | "oneens") => {
    if (!activeCard || !activeFact) return;
    const correct = answer === activeFact.answer;
    const s = stateRef.current;
    if (!isDemo && !s.usedFactIds.includes(activeFact.id)) {
      // markeer de factcheck als gebruikt vóór het verwerken van de keuze
      stateRef.current = { ...s, usedFactIds: [...s.usedFactIds, activeFact.id] };
    }
    applyChoice(
      activeCard,
      {
        id: answer,
        text: `${activeFact.statement} — antwoord: ${answer}`,
        effect: correct ? { compass: 1 } : {},
        explain: activeFact.explain,
      },
      correct,
    );
  };

  const handleCareerPick = (route: CareerRoute) => {
    if (!activeCard) return;
    const s = structuredClone(stateRef.current);
    s.careerRouteId = route.id;
    const summary = resolveChoice(s, activeCard, {
      id: route.id,
      text: route.title,
      effect: route.effect,
      explain: `Accent van deze route: ${route.accent.toLowerCase()}. Vanaf nu geven passende keuzes een routebonus.`,
    });
    setState(s);
    setResult({
      summary,
      explain: `Accent van deze route: ${route.accent.toLowerCase()}. Vanaf nu geven passende keuzes een routebonus.`,
    });
  };

  const handleAutoContinue = () => {
    if (!activeCard) return;
    applyChoice(activeCard);
    // gebeurtenis zonder keuze: meteen sluiten na het toepassen
    if (!activeCard.reflection) {
      closeCard(activeCard);
      return;
    }
  };

  const closeCard = (card?: Card) => {
    const c = card ?? activeCard;
    setActiveCard(null);
    setActiveFact(null);
    setResult(null);
    if (c && c.type === "finish" && !isDemo) {
      setState((s) => ({ ...s, completed: true }));
    }
    setIsDemo(false);
  };

  const openDemoCard = (cardId: string, factId?: string) => {
    const card = cardById(cardId);
    if (!card) return;
    setIsDemo(true);
    setAlreadyPlayed(false);
    setResult(null);
    setActiveFact(factId ? (getFact(factId) ?? null) : null);
    setActiveCard(card);
  };

  if (screen === "start") {
    return (
      <StartScreen
        onStart={() => startGame(false)}
        onTeacher={() => startGame(true)}
        hasSave={!!savedGame?.started && !savedGame.completed}
        onContinue={continueGame}
      />
    );
  }

  if (screen === "end") {
    return (
      <div className="app-shell">
        <TopBar position={64} />
        <EndScreen state={state} onRestart={() => startGame(state.teacherMode)} />
        {state.teacherMode && (
          <div style={{ padding: "0 1.5rem 2rem", maxWidth: "46rem", margin: "0 auto", width: "100%" }}>
            <TeacherPanel
              state={state}
              forcedRoll={forcedRoll}
              onForcedRoll={setForcedRoll}
              onOpenCard={openDemoCard}
              onReset={resetAll}
            />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app-shell">
      <TopBar position={state.position} />
      <main className="main-layout">
        <Board state={state} moving={moving} />
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <ScorePanel
            state={state}
            onRoll={handleRoll}
            rollDisabled={moving || !!activeCard}
            lastRoll={lastRoll}
            moving={moving}
            onToggleTeacher={() =>
              setState((s) => ({ ...s, teacherMode: !s.teacherMode }))
            }
          />
          {state.teacherMode && (
            <TeacherPanel
              state={state}
              forcedRoll={forcedRoll}
              onForcedRoll={setForcedRoll}
              onOpenCard={openDemoCard}
              onReset={resetAll}
            />
          )}
        </div>
      </main>
      {diceRolling !== null && <DiceOverlay roll={diceRolling} />}
      {activeCard && (
        <CardPanel
          card={activeCard}
          state={state}
          fact={activeFact}
          result={result}
          alreadyPlayed={alreadyPlayed}
          onChoose={handleChoose}
          onFactAnswer={handleFactAnswer}
          onAutoContinue={handleAutoContinue}
          onCareerPick={handleCareerPick}
          onClose={() => closeCard()}
        />
      )}
    </div>
  );
}

function TopBar({ position }: { position: number }) {
  const phase = phaseForSquare(position);
  return (
    <header className="topbar">
      <div className="topbar-logo">
        HAN
        <br />
        GREEN OFFICE
      </div>
      <div className="topbar-title">HET LEVENSPAD</div>
      <div className="topbar-phase">
        Levensfase {phase.rij} van 8
        <strong>
          {phase.title} · {phase.ages}
        </strong>
      </div>
    </header>
  );
}
