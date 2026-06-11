import type { FactCheck } from "../game/types";

// Alle factchecks. Fact-vakjes trekken willekeurig een nog niet gespeelde
// vraag uit hun themapool (zie cards.ts). De rest is bereikbaar via docentmodus.
export const FACTS: FactCheck[] = [
  {
    id: "f1",
    statement:
      "Een perfect uitgebalanceerde maaltijd is altijd beter, ook als iemand hem niet eet.",
    answer: "oneens",
    explain:
      "Voeding werkt alleen als die ook echt gegeten wordt. Een haalbare maaltijd die op het bord verdwijnt, doet meer dan een ideale maaltijd die blijft staan.",
  },
  {
    id: "f2",
    statement:
      "De eetomgeving kan gedrag beïnvloeden, ook als mensen formeel vrije keuze houden.",
    answer: "eens",
    explain:
      "Wat zichtbaar, goedkoop en dichtbij is, wordt vaker gekozen. Keuzevrijheid bestaat, maar altijd binnen een omgeving die meestuurt.",
  },
  {
    id: "f3",
    statement:
      "Een AI-schema dat persoonlijk klinkt houdt automatisch rekening met medische en psychologische context.",
    answer: "oneens",
    explain:
      "Een persoonlijke toon is geen persoonlijke analyse. AI kent vaak geen medische geschiedenis, eetproblematiek of leefsituatie — tenzij die expliciet en veilig wordt meegenomen.",
  },
  {
    id: "f4",
    statement: "Een product met veel eiwit is automatisch gezond.",
    answer: "oneens",
    explain:
      "Eiwit zegt niets over suiker, verzadigd vet, zout of de totale voedingswaarde. Kijk altijd naar het hele product en de context van de eter.",
  },
  {
    id: "f5",
    statement: "Een grote verpakking is altijd duurzamer dan een kleine verpakking.",
    answer: "oneens",
    explain:
      "Per kilo is een grote verpakking vaak efficiënter, maar als een deel wordt weggegooid, slaat het voordeel om. Verspilling telt zwaar mee in de planeetimpact.",
  },
  {
    id: "f6",
    statement:
      "Nutri-Score kan nuttig zijn bij vergelijken binnen een productcategorie, maar vertelt niet het hele verhaal.",
    answer: "eens",
    explain:
      "Nutri-Score vergelijkt producten binnen een schap, niet tussen totaal verschillende producten. Bewerking, portiegrootte en context blijven buiten beeld.",
  },
  {
    id: "f7",
    statement: "Meer inkomen leidt automatisch tot een kleinere ecologische voetafdruk.",
    answer: "oneens",
    explain:
      "Meer geld maakt duurzame keuzes bereikbaarder, maar leidt gemiddeld ook tot méér consumptie: vaker vlees, vliegreizen en grotere huizen. Gedrag bepaalt, niet inkomen.",
  },
  {
    id: "f8",
    statement: "Afslankmedicatie maakt voedingsbegeleiding per definitie overbodig.",
    answer: "oneens",
    explain:
      "Medicatie zoals GLP-1 verandert eetlust, maar juist dan is begeleiding belangrijk: voldoende eiwit, spierbehoud, eetgedrag en wat er gebeurt na het stoppen.",
  },
  {
    id: "f9",
    statement: "Een duurzaam advies is altijd passend bij ieder ziektebeeld.",
    answer: "oneens",
    explain:
      "Bij bijvoorbeeld ondervoeding of kauwproblemen kan het duurzaamste advies medisch niet passend zijn. Gezondheid en planeet vragen soms een eerlijke afweging.",
  },
  {
    id: "f10",
    statement:
      "Bij risico op ondervoeding kan voldoende eten belangrijker zijn dan het ideale voedingspatroon.",
    answer: "eens",
    explain:
      "Bij ondervoeding telt elke hap. Energie en eiwit binnenkrijgen gaat dan vóór de schijf van vijf — friet die gegeten wordt verslaat een salade die blijft staan.",
  },
  {
    id: "f11",
    statement: "Sociale verbinding hoort bij gezondheid en is dus geen losse luxe.",
    answer: "eens",
    explain:
      "Samen eten, gezelschap en steun beïnvloeden eetgedrag, mentale gezondheid en zelfs levensverwachting. Een advies dat sociaal isoleert kan ongezond uitpakken.",
  },
  {
    id: "f12",
    statement:
      "Professioneel handelen betekent ook transparant zijn over onzekerheid en belangen.",
    answer: "eens",
    explain:
      "Een professional die eerlijk is over wat (nog) niet zeker is en wie er meebetaalt, is geloofwaardiger én ethischer dan een professional die altijd stellig klinkt.",
  },
];

export function getFact(id: string): FactCheck | undefined {
  return FACTS.find((f) => f.id === id);
}
