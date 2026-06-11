import type { CareerRoute } from "../game/types";

// De zes beroepsroutes (vak 33). De `tag` koppelt latere kaartopties
// aan deze route: een passende keuze geeft +1 routebonus op het kompas.
export const CAREERS: CareerRoute[] = [
  {
    id: "eerstelijns",
    tag: "eerstelijns",
    title: "Eerstelijnsdiëtist",
    bonusText: "Kompas +2, invloed +1",
    accent: "Betaalbaarheid, autonomie, leefstijl en haalbaarheid",
    effect: { compass: 2, professionalInfluence: 1 },
  },
  {
    id: "klinisch",
    tag: "klinisch",
    title: "Klinisch diëtist",
    bonusText: "Gezondheid +2, invloed +1",
    accent: "Ondervoeding, herstel, ziekenhuisvoeding en medische context",
    effect: { health: 2, professionalInfluence: 1 },
  },
  {
    id: "industrie",
    tag: "industrie",
    title: "Productontwikkelaar foodindustrie",
    bonusText: "Budget ruimer, invloed +2",
    accent: "Claims, receptuur, marketing, verpakking en systeemimpact",
    effect: { budget: 1, professionalInfluence: 2 },
  },
  {
    id: "beleid",
    tag: "beleid",
    title: "Beleidsadviseur publieke gezondheid",
    bonusText: "Planeet +2, invloed +2",
    accent: "Eetomgeving, belasting, supermarktbeleid en volksgezondheid",
    effect: { planet: 2, professionalInfluence: 2 },
  },
  {
    id: "ai",
    tag: "ai",
    title: "Voedingstechnoloog & AI-specialist",
    bonusText: "AI-geletterdheid +2, invloed +1",
    accent: "Datagebruik, personalisatie, bias en verantwoordelijkheid",
    effect: { aiLiteracy: 2, professionalInfluence: 1 },
  },
  {
    id: "onderzoek",
    tag: "onderzoek",
    title: "Onderzoeker Voeding en Diëtetiek",
    bonusText: "Kompas +1, AI-geletterdheid +1, invloed +1",
    accent: "Bewijs, onzekerheid en vertaling naar de praktijk",
    effect: { compass: 1, aiLiteracy: 1, professionalInfluence: 1 },
  },
];

export function careerById(id: string | undefined): CareerRoute | undefined {
  return CAREERS.find((c) => c.id === id);
}
