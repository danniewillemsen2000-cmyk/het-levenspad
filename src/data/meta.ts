import type { EndProfile, GameState } from "../game/types";

// Eindprofielen: het eerste profiel waarvan de voorwaarde klopt, wint.
export const PROFILES: Array<{
  profile: EndProfile;
  match: (s: GameState) => boolean;
}> = [
  {
    profile: {
      id: "overbelast",
      title: "De overbelaste helper",
      text: "Jullie zorgden voor iedereen — behalve voor jezelf. Hoge tijdsdruk en een dalende gezondheid laten zien hoe snel een helper zichzelf voorbijloopt. Een belangrijke les voor het vak.",
    },
    match: (s) => s.conditions.timePressure >= 2 && s.meters.health < 45,
  },
  {
    profile: {
      id: "groene-pionier",
      title: "De groene pionier",
      text: "De planeet woog bij jullie consequent mee, ook als het schuurde met gemak of gewoonte. Jullie laten een lichte voetafdruk na — en het besef dat duurzaam advies óók haalbaar moet zijn.",
    },
    match: (s) =>
      s.meters.planet >= s.meters.health && s.meters.planet >= s.meters.compass && s.meters.planet >= 60,
  },
  {
    profile: {
      id: "scherpe-professional",
      title: "De scherpe professional",
      text: "Claims, belangen en data: jullie prikten er telkens doorheen. Het kompas was jullie sterkste instrument. Precies de kritische houding die het werkveld nodig heeft.",
    },
    match: (s) =>
      s.meters.compass >= s.meters.health && s.meters.compass >= s.meters.planet && s.meters.compass >= 60,
  },
  {
    profile: {
      id: "digitale-versneller",
      title: "De digitale versneller",
      text: "AI en digitale hulpmiddelen waren bij jullie geen bedreiging maar gereedschap — kritisch gebruikt, met oog voor privacy en bias. Zo ziet digitale professionaliteit eruit.",
    },
    match: (s) => s.conditions.aiLiteracy >= 4,
  },
  {
    profile: {
      id: "systeemveranderaar",
      title: "De systeemveranderaar",
      text: "Jullie keken voorbij het individuele bord naar het systeem erachter: beleid, supermarkt, industrie. Met groeiende invloed kozen jullie voor structurele verandering.",
    },
    match: (s) => s.conditions.professionalInfluence >= 4,
  },
  {
    profile: {
      id: "zorgzame-verbinder",
      title: "De zorgzame verbinder",
      text: "Samen eten, steun zoeken, anderen meenemen: jullie speelden het spel zoals een goede maaltijd werkt — met verbinding als hoofdingrediënt. Sociale verbinding ís gezondheid.",
    },
    match: (s) => s.conditions.socialSupport >= 4,
  },
  {
    profile: {
      id: "gezonde-realist",
      title: "De gezonde realist",
      text: "Gezond én haalbaar: jullie zochten telkens de keuze die ook echt vol te houden is. Geen perfectie, wel resultaat — de realistische kern van goed voedingsadvies.",
    },
    match: (s) => s.meters.health >= 60,
  },
  {
    profile: {
      id: "levenslange-leerling",
      title: "De levenslange leerling",
      text: "Geen enkele meter schoot uit, maar jullie bleven wegen, twijfelen en bijsturen. Dat is geen gebrek aan richting — dat is hoe zorgvuldig redeneren eruitziet.",
    },
    match: () => true,
  },
];

export const DEBRIEF_QUESTIONS = [
  "Welke keuze leek gezond, maar was niet haalbaar?",
  "Wanneer woog individuele gezondheid zwaarder dan de planeet?",
  "Wanneer was een duurzame keuze niet automatisch een gezonde keuze?",
  "Op welk moment hielp AI en wanneer ontstond risico?",
  "Welke systeemfactor kon je als individu nauwelijks beïnvloeden?",
  "Hoe veranderde geld de ruimte om te kiezen?",
  "Welke keuze zou je als diëtist anders toelichten dan als consument?",
  "Welke score vertelt volgens jullie het meeste en welke juist het minste?",
  "Welke eerdere levenskeuze kwam later onverwacht terug?",
  "Waar ligt volgens jullie de grens tussen adviseren en sturen?",
];

export const CLOSING_LINE =
  "Een goed voedingsadvies is niet perfect. Het is gezond, haalbaar, duurzaam en eerlijk over de afweging.";
