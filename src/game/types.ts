// Centrale types voor Het Levenspad.
// Alle spelcontent is data-driven: docenten passen kaarten aan in src/data/.

export type MeterId = "health" | "planet" | "compass";

export type SquareType =
  | "start"
  | "dilemma"
  | "event"
  | "fact"
  | "compass"
  | "life"
  | "career"
  | "milestone"
  | "finish";

export type Diagnosis =
  | "geen"
  | "diabetesrisico"
  | "hartvaat"
  | "ondervoeding"
  | "kankerherstel";

// budget en timePressure als stappen: 0 = krap/laag, 1 = gemiddeld, 2 = ruim/hoog
export type Conditions = {
  budget: number; // 0 krap, 1 gemiddeld, 2 ruim
  timePressure: number; // 0 laag, 1 gemiddeld, 2 hoog
  socialSupport: number; // 0 tot 5
  cookingSkill: number; // 0 tot 5
  aiLiteracy: number; // 0 tot 5
  professionalInfluence: number; // 0 tot 5
  diagnosis: Diagnosis;
  hasChild: boolean;
  hasPet: boolean;
};

// Eén effect-object beschrijft alle mogelijke gevolgen van een keuze.
export type Effect = {
  health?: number;
  planet?: number;
  compass?: number;
  budget?: number; // +1 ruimer, -1 krapper
  timePressure?: number; // +1 hoger, -1 lager
  socialSupport?: number;
  cookingSkill?: number;
  aiLiteracy?: number;
  professionalInfluence?: number;
  diagnosis?: Diagnosis;
  hasChild?: boolean;
  hasPet?: boolean;
};

// Voorwaarden waaronder een optie beschikbaar is (omstandigheden voelbaar maken).
export type Requirement = {
  cookingSkill?: number; // minimaal niveau
  aiLiteracy?: number;
  budget?: number; // minimaal budgetniveau (0/1/2)
  reason: string; // uitleg die de speler ziet als de optie vergrendeld is
};

export type CardOption = {
  id: string;
  text: string;
  effect: Effect;
  explain: string; // korte toelichting waarom de meters verschuiven
  requires?: Requirement;
  routeTags?: string[]; // routebonus na beroepskeuze
  convenience?: boolean; // bij hoge tijdsdruk geeft gemak +1 Gezondheid (minder stress)
};

export type FactCheck = {
  id: string;
  statement: string;
  answer: "eens" | "oneens";
  explain: string;
};

export type Card = {
  id: string;
  square: number; // 0 = losse kaart (alleen via docentmodus / factpool)
  type: SquareType;
  title: string;
  situation: string;
  options?: CardOption[];
  autoEffect?: Effect; // gebeurtenis-effect dat altijd plaatsvindt
  autoLabel?: string; // korte omschrijving van het automatische effect
  reflection?: string;
  factPool?: string[]; // ids van factchecks waaruit dit vakje trekt
};

export type Square = {
  n: number;
  type: SquareType;
  title: string;
  icon: string; // emoji op het bordvakje
};

export type Phase = {
  rij: number;
  title: string;
  ages: string;
  from: number;
  to: number;
  photo: string; // sfeerfoto van de levensfase (Unsplash)
  photoAlt: string;
  hue: [string, string]; // gradient van de wereldzone
  deco: string[]; // zwevende emoji's in de zone
};

export type CareerRoute = {
  id: string;
  title: string;
  bonusText: string;
  accent: string;
  effect: Effect;
  tag: string; // koppelt latere kaartopties aan deze route
};

export type HistoryEntry = {
  turn: number;
  square: number;
  cardId: string;
  cardTitle: string;
  choiceId?: string;
  choiceText?: string;
  effectSummary: string;
};

export type GameState = {
  started: boolean;
  position: number;
  meters: Record<MeterId, number>;
  conditions: Conditions;
  careerRouteId?: string;
  passedMilestones: number[];
  answeredCardIds: string[];
  usedFactIds: string[];
  history: HistoryEntry[];
  turn: number;
  completed: boolean;
  teacherMode: boolean;
};

export type EndProfile = {
  id: string;
  title: string;
  text: string;
};
