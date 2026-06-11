import type { Card } from "../game/types";

// Alle speelkaarten van Het Levenspad, één per vakje.
// Effecten: health/planet/compass = hoofdmeters; budget/timePressure = stappen;
// overige velden = verborgen omstandigheden.
// `routeTags` geeft na de beroepskeuze (vak 33) een zichtbare routebonus.
// `requires` vergrendelt een optie zolang een omstandigheid niet op niveau is.

export const CARDS: Card[] = [
  // ── Fase 1: Eerste happen (0–4 jaar) ───────────────────────────────
  {
    id: "c1",
    square: 1,
    type: "start",
    title: "Welkom aan tafel",
    situation:
      "Jullie beginnen een mensenleven vol voedingskeuzes. Sommige keuzes lijken gezond maar zijn niet haalbaar, sommige zijn duurzaam maar passen niet bij elke situatie. Gooi de dobbelsteen en ontdek hoe oud jullie worden — en wat jullie achterlaten.",
    autoEffect: {},
    autoLabel: "Het levenspad begint. Alle meters starten op 50.",
  },
  {
    id: "c2",
    square: 2,
    type: "dilemma",
    title: "Fles, borst of combinatie",
    situation:
      "Een jong gezin krijgt van alle kanten advies over borstvoeding. De praktijk is weerbarstiger: werk, nachten, en een baby die doet wat baby's doen. Wat weegt het zwaarst?",
    options: [
      {
        id: "a",
        text: "Borstvoeding nastreven mét goede ondersteuning en realistische verwachtingen",
        effect: { health: 1, compass: 1 },
        explain:
          "Goede informatie en steun maken borstvoeding haalbaarder, zonder druk te leggen op wat niet lukt.",
      },
      {
        id: "b",
        text: "Zonder schuldgevoel combineren of voor de fles kiezen als dat beter past",
        effect: { health: 1, compass: 1, socialSupport: 1 },
        explain:
          "Een gevoede baby en een ouder die overeind blijft: haalbaarheid is ook gezondheid. Beide routes zijn verdedigbaar.",
      },
      {
        id: "c",
        text: "De verwachtingen van de omgeving laten bepalen wat er gebeurt",
        effect: { health: -1, compass: -1 },
        explain:
          "Wie kiest op basis van druk in plaats van informatie, raakt de eigen afweging kwijt. Dat kost rust én autonomie.",
      },
    ],
    reflection: "Wie bepaalt eigenlijk wat 'goed voeden' is — en op basis waarvan?",
  },
  {
    id: "c3",
    square: 3,
    type: "event",
    title: "Een druk huishouden",
    situation:
      "Twee werkende ouders, een peuter, een huishouden. De dagen zijn vol en de avonden kort. Routines rond eten staan onder druk.",
    autoEffect: { timePressure: 1 },
    autoLabel: "Tijdsdruk stijgt: gemak wordt aantrekkelijker in de komende keuzes.",
    reflection: "Welke voedingsroutine sneuvelt als eerste bij tijdgebrek?",
  },
  {
    id: "c4",
    square: 4,
    type: "dilemma",
    title: "Knijpfruit of bakje fruit",
    situation:
      "Een peuter eet op de opvang alleen fruit uit een knijpzakje. Zelf fruit snijden kost tijd en levert thuis strijd op.",
    options: [
      {
        id: "a",
        text: "Iedere dag knijpfruit meegeven",
        effect: { planet: -1 },
        explain:
          "Begrijpelijk gemak, maar de verpakking telt op en zuigen is iets anders dan leren kauwen en proeven.",
        convenience: true,
      },
      {
        id: "b",
        text: "Alleen vers fruit toestaan",
        effect: { health: -1, planet: 1, compass: -1 },
        explain:
          "Streng vasthouden aan het ideaal kan averechts werken: strijd aan tafel en fruit dat niet gegeten wordt.",
      },
      {
        id: "c",
        text: "Afwisselen en samen oefenen met verschillende vormen",
        effect: { health: 1, planet: 1, compass: 1, cookingSkill: 1 },
        explain:
          "Smaakontwikkeling vraagt geduld. Afwisselen houdt het haalbaar en bouwt rustig vaardigheid op.",
      },
    ],
    reflection: "Wanneer is gemak een goede keuze en wanneer een gewoonte?",
  },
  {
    id: "c5",
    square: 5,
    type: "compass",
    title: "Vrolijke verpakking",
    situation:
      "In de supermarkt grijpt een peuter naar een pakje met vrolijke dieren erop. De voorkant roept 'met echt fruit!', het etiket vertelt een ander verhaal.",
    options: [
      {
        id: "a",
        text: "Kopen — het kind is blij en het lijkt gezond",
        effect: { compass: -1, planet: -1 },
        explain:
          "Kindermarketing werkt precies zo: de verpakking kiest, niet de ouder. De claim op de voorkant is geen voedingswaarde.",
      },
      {
        id: "b",
        text: "Alles met een cartoon erop principieel weigeren",
        effect: {},
        explain:
          "Begrijpelijk, maar een vuistregel op uiterlijk vervangt geen etiketkennis — sommige producten met cartoon zijn prima.",
      },
      {
        id: "c",
        text: "Het etiket bekijken en het kind spelenderwijs leren wat reclame doet",
        effect: { health: 1, compass: 2 },
        explain:
          "Bronkritiek begint vroeg. Wie leert kijken voorbij de verpakking, kiest later zelfstandiger.",
      },
    ],
    reflection: "Op wie richt deze marketing zich eigenlijk: het kind of de ouder?",
  },
  {
    id: "c6",
    square: 6,
    type: "fact",
    title: "Wat is haalbaar?",
    situation: "Tijd voor een factcheck. Eens of oneens?",
    factPool: ["f1", "f11"],
  },
  {
    id: "c7",
    square: 7,
    type: "life",
    title: "Samen aan tafel",
    situation:
      "Het gezin kan kiezen hoe de avondmaaltijd eruitziet: samen aan tafel, ieder op een eigen moment, of iets ertussenin.",
    options: [
      {
        id: "a",
        text: "Vaste gezamenlijke eetmomenten, ook als het soms rommelig is",
        effect: { health: 2, socialSupport: 1 },
        explain:
          "Samen eten is meer dan voeding: het bouwt verbinding, structuur en smaakontwikkeling op. Sociale verbinding ís gezondheid.",
      },
      {
        id: "b",
        text: "Ieder eet wanneer het uitkomt",
        effect: { health: -1 },
        explain:
          "Flexibel, maar losse eetmomenten maken het lastiger om samen smaken te ontdekken en signalen op te vangen.",
        convenience: true,
      },
      {
        id: "c",
        text: "Doordeweeks flexibel, in het weekend uitgebreid samen",
        effect: { health: 1, socialSupport: 1 },
        explain: "Een haalbaar compromis dat het ritueel van samen eten levend houdt.",
      },
    ],
    reflection: "Wat gebeurt er aan tafel dat nergens anders gebeurt?",
  },
  {
    id: "c8",
    square: 8,
    type: "milestone",
    title: "Smaakbasis gelegd",
    situation:
      "De eerste jaren zijn voorbij. Welke basis heeft jullie huishouden vooral opgebouwd?",
    options: [
      {
        id: "a",
        text: "Meestal samen eten en nieuwe smaken rustig blijven aanbieden",
        effect: { health: 2, planet: 1, compass: 1, socialSupport: 1, cookingSkill: 1 },
        explain:
          "Geduld en herhaling vormen de smaakbasis. Deze routines reizen mee naar de volgende fasen.",
      },
      {
        id: "b",
        text: "Vooral kiezen voor gemak omdat tijd schaars is",
        effect: { planet: -1, timePressure: -1 },
        explain:
          "Eerlijk en herkenbaar: gemak kocht rust. De prijs zit in verpakking, bewerking en gemiste oefenmomenten.",
        convenience: true,
      },
      {
        id: "c",
        text: "Strakke regels gebruiken om gezond eten af te dwingen",
        effect: { health: -1, compass: -1 },
        explain:
          "Dwang rond eten werkt vaak averechts: het koppelt voeding aan strijd in plaats van aan plezier.",
      },
    ],
    reflection: "Wanneer helpt structuur en wanneer werkt het averechts?",
  },

  // ── Fase 2: Broodtrommeljaren (5–11 jaar) ──────────────────────────
  {
    id: "c9",
    square: 9,
    type: "dilemma",
    title: "Traktaties op school",
    situation:
      "De school wil alleen nog gezonde traktaties toestaan. Sommige ouders vinden dit betuttelend.",
    options: [
      {
        id: "a",
        text: "Een volledig verbod steunen",
        effect: { health: 1, planet: 1 },
        explain:
          "Effectief op papier, maar een verbod zonder draagvlak verschuift het probleem naar buiten het schoolplein.",
      },
      {
        id: "b",
        text: "Alles vrijlaten",
        effect: { planet: -1 },
        explain:
          "Keuzevrijheid klinkt eerlijk, maar laat de sociale norm — trakteren is groot en zoet — ongemoeid.",
      },
      {
        id: "c",
        text: "Een haalbare richtlijn maken met ruimte voor uitzonderingen",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "Een norm mét draagvlak verandert gedrag duurzamer dan een verbod. Plezier en gezondheid sluiten elkaar niet uit.",
      },
    ],
    reflection: "Is een traktatie een voedingsmoment of een sociaal moment?",
  },
  {
    id: "c10",
    square: 10,
    type: "life",
    title: "Water of drinkpakje",
    situation:
      "Elke schooldag gaat er iets te drinken mee. Een kleine gewoonte — maal tweehonderd schooldagen per jaar.",
    options: [
      {
        id: "a",
        text: "Een herbruikbare fles met water",
        effect: { health: 1, planet: 1 },
        explain:
          "Klein gebaar, lange adem: geen suiker, geen verpakking, en de gewoonte zet zich vast.",
      },
      {
        id: "b",
        text: "Elke dag een drinkpakje",
        effect: { health: -1, planet: -1 },
        explain:
          "Tweehonderd pakjes per jaar tellen op — in suiker én in afval. Gemak heeft hier een stille prijs.",
        convenience: true,
      },
      {
        id: "c",
        text: "Water als basis, pakje als uitzondering",
        effect: { health: 1, planet: 1, compass: 1 },
        explain:
          "De norm is water, de uitzondering blijft leuk. Zo blijft de gewoonte vol te houden.",
      },
    ],
    reflection: "Welke kleine dagelijkse gewoonte heeft bij jullie de grootste optelsom?",
  },
  {
    id: "c11",
    square: 11,
    type: "dilemma",
    title: "Schoollunch",
    situation:
      "De gemeente overweegt een gezonde schoollunch voor alle kinderen. Critici vinden dat eten een taak van ouders is, niet van school.",
    options: [
      {
        id: "a",
        text: "Schoollunch invoeren voor alle kinderen",
        effect: { health: 1, planet: 1, compass: 1 },
        explain:
          "Eén gezonde maaltijd per dag voor ieder kind verkleint verschillen — maar kost geld en vraagt uitvoering.",
        routeTags: ["beleid"],
      },
      {
        id: "b",
        text: "Volledig bij ouders laten",
        effect: { compass: -1 },
        explain:
          "Niet elk gezin heeft dezelfde tijd, kennis en portemonnee. Wie alles bij ouders legt, vergroot bestaande verschillen.",
      },
      {
        id: "c",
        text: "Schoollunch starten waar de nood het hoogst is, en leren van de praktijk",
        effect: { health: 1, compass: 2 },
        explain:
          "Gericht beginnen maakt het betaalbaar en meetbaar. Beleid mag klein starten en groeien op bewijs.",
        routeTags: ["beleid", "onderzoek"],
      },
    ],
    reflection: "Wie is verantwoordelijk voor wat een kind op school eet?",
  },
  {
    id: "c12",
    square: 12,
    type: "event",
    title: "Eten blijft liggen",
    situation:
      "De helft van de opgeschepte borden gaat onaangeroerd de afvalbak in. Het gebeurt elke week opnieuw. Wat doet het huishouden?",
    options: [
      {
        id: "a",
        text: "Weggooien en doorgaan — zo gaat dat nu eenmaal",
        effect: { planet: -1 },
        explain:
          "Voedselverspilling is een van de grootste verborgen klimaatposten van een huishouden.",
      },
      {
        id: "b",
        text: "Kleinere porties opscheppen en restjes bewaren",
        effect: { health: 1, planet: 1, cookingSkill: 1 },
        explain:
          "Minder opscheppen, vaker bijscheppen: simpel, goedkoop en direct minder verspilling.",
      },
      {
        id: "c",
        text: "Kinderen dwingen hun bord leeg te eten",
        effect: { health: -1, compass: -1 },
        explain:
          "'Bord leeg' leert kinderen tegen hun verzadiging in te eten — verspilling bestrijden hoort niet via dwang.",
      },
    ],
    reflection: "Waar ontstaat verspilling: bij het koken, het opscheppen of het kopen?",
  },
  {
    id: "c13",
    square: 13,
    type: "life",
    title: "Een huisdier",
    situation:
      "De kinderen smeken om een hond. Een huisdier brengt gezelschap en beweging, maar ook kosten, tijd en een voetafdruk.",
    options: [
      {
        id: "a",
        text: "Een hond nemen",
        effect: { health: 1, planet: -1, budget: -1, socialSupport: 1, hasPet: true },
        explain:
          "Dagelijkse wandelingen en gezelschap zijn echte gezondheidswinst. Voer en verzorging kosten geld en hebben planeetimpact.",
      },
      {
        id: "b",
        text: "Geen huisdier",
        effect: {},
        explain: "Een eerlijke keuze: niet elk gezin heeft er de ruimte of tijd voor.",
      },
      {
        id: "c",
        text: "Een asieldier dat bij de gezinssituatie past",
        effect: { health: 1, planet: -1, compass: 1, socialSupport: 1, hasPet: true },
        explain:
          "Bewust kiezen — passend bij tijd, ruimte en budget — maakt het gezelschap duurzamer in alle betekenissen.",
      },
    ],
    reflection: "Telt het geluk van een huisdier mee in een gezondheidsafweging?",
  },
  {
    id: "c14",
    square: 14,
    type: "compass",
    title: "Reclame bij de sportclub",
    situation:
      "Een fastfoodketen wil de jeugdteams sponsoren: nieuwe shirts en een bijdrage voor de kantine, met logo's langs het veld.",
    options: [
      {
        id: "a",
        text: "Accepteren — de club heeft het geld hard nodig",
        effect: { compass: -2, budget: 1 },
        explain:
          "Het geld is echt, maar de deal koppelt sport aan fastfood, precies bij de doelgroep die het meest beïnvloedbaar is.",
      },
      {
        id: "b",
        text: "Weigeren en bezuinigen",
        effect: { compass: 1, budget: -1 },
        explain:
          "Principieel zuiver, maar de rekening komt bij de leden te liggen. Ook dat is een afweging.",
      },
      {
        id: "c",
        text: "Onderhandelen: sponsoring zonder kindermarketing in de kantine",
        effect: { health: 1, compass: 2 },
        explain:
          "Sponsoring en voorwaarden kunnen samengaan. Wie de grens vooraf vastlegt, houdt de regie.",
        routeTags: ["beleid"],
      },
    ],
    reflection: "Wanneer wordt sponsoring sturing?",
  },
  {
    id: "c15",
    square: 15,
    type: "fact",
    title: "Omgeving stuurt mee",
    situation: "Tijd voor een factcheck. Eens of oneens?",
    factPool: ["f2", "f7"],
  },
  {
    id: "c16",
    square: 16,
    type: "milestone",
    title: "Broodtrommeljaren voorbij",
    situation:
      "Op school merken jullie hoe sterk de eetomgeving keuzes beïnvloedt. Wat nemen jullie mee?",
    options: [
      {
        id: "a",
        text: "Individuele verantwoordelijkheid blijft belangrijk, maar de omgeving verdient aandacht",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "Gedrag is een samenspel van keuze en context. Wie beide ziet, adviseert straks realistischer.",
      },
      {
        id: "b",
        text: "Alle verantwoordelijkheid bij ouders en kinderen leggen",
        effect: { planet: -1, compass: -1 },
        explain:
          "Dat negeert hoe sterk aanbod, prijs en reclame meesturen — vooral bij gezinnen met minder ruimte.",
      },
      {
        id: "c",
        text: "Alles verbieden wat ongezond kan zijn",
        effect: { planet: 1, compass: -1 },
        explain:
          "Verboden zonder draagvlak voeden weerstand en verschuiven gedrag naar buiten het zicht.",
      },
    ],
    reflection: "Wie heeft invloed op de eetomgeving en wie draagt verantwoordelijkheid?",
  },

  // ── Fase 3: Zelf kiezen (12–17 jaar) ───────────────────────────────
  {
    id: "c17",
    square: 17,
    type: "compass",
    title: "Influencer zonder diploma",
    situation:
      "Een populaire influencer deelt voedingsadvies en verkoopt een eigen programma. De disclaimer is klein en vaag.",
    options: [
      {
        id: "a",
        text: "Het advies delen omdat het motiveert",
        effect: { compass: -1 },
        explain:
          "Motivatie is waardevol, maar wie ongetoetst advies doorstuurt, wordt zelf een schakel in de verspreiding.",
      },
      {
        id: "b",
        text: "De influencer direct volledig afschrijven",
        effect: {},
        explain:
          "Afschrijven zonder argumenten overtuigt niemand — zeker geen volgers die zich er thuis voelen.",
      },
      {
        id: "c",
        text: "Claims controleren en transparantie eisen",
        effect: { compass: 3, aiLiteracy: 1 },
        explain:
          "Bronkritiek is de vaardigheid: wat wordt beweerd, door wie, met welk belang en welk bewijs?",
        routeTags: ["onderzoek"],
      },
    ],
    reflection: "Waarom voelt een influencer soms betrouwbaarder dan een professional?",
  },
  {
    id: "c18",
    square: 18,
    type: "compass",
    title: "AI-schema voor jongeren",
    situation:
      "Een chatbot maakt gratis een streng voedingsschema voor een zestienjarige die snel wil afvallen.",
    options: [
      {
        id: "a",
        text: "Het schema volgen omdat het persoonlijk lijkt",
        effect: { health: -2, compass: -2 },
        explain:
          "Een persoonlijke toon is geen persoonlijke zorg. Streng afvallen op zestien zonder begeleiding is een reëel gezondheidsrisico.",
      },
      {
        id: "b",
        text: "Het schema als aanleiding gebruiken om professionele hulp te zoeken",
        effect: { health: 1, compass: 2, aiLiteracy: 1 },
        explain:
          "De vraag achter de vraag serieus nemen: waarom wil deze jongere snel afvallen, en wie kan echt helpen?",
      },
      {
        id: "c",
        text: "Alle AI-advies verbieden",
        effect: {},
        explain:
          "Een verbod stopt het gebruik niet — het verplaatst het alleen buiten het zicht van wie kan helpen.",
      },
    ],
    reflection: "Wanneer is AI een hulpmiddel en wanneer een risico?",
  },
  {
    id: "c19",
    square: 19,
    type: "dilemma",
    title: "High-protein overal",
    situation:
      "Een snack met veel eiwit wordt gepresenteerd als automatisch gezond, maar bevat ook veel suiker en is duur verpakt.",
    options: [
      {
        id: "a",
        text: "Kopen vanwege het eiwitlabel",
        effect: { planet: -1, compass: -1 },
        explain:
          "'High protein' is een marketingclaim, geen gezondheidsoordeel. De rest van het etiket telt net zo hard.",
      },
      {
        id: "b",
        text: "Etiket en totale voedingswaarde bekijken",
        effect: { health: 1, compass: 2 },
        explain:
          "Eiwit, suiker, prijs en portie samen bekijken — dat is het verschil tussen marketing en voedingswaarde.",
        routeTags: ["industrie"],
      },
      {
        id: "c",
        text: "Eiwitproducten altijd vermijden",
        effect: {},
        explain:
          "Het probleem is niet eiwit, maar de claim. Categorisch vermijden is geen kritisch kijken.",
      },
    ],
    reflection: "Voor wie is extra eiwit nuttig — en voor wie vooral een verkoopargument?",
  },
  {
    id: "c20",
    square: 20,
    type: "dilemma",
    title: "Fastfoodreclame rond school",
    situation: "Een gemeente overweegt fastfoodreclame rond scholen te beperken.",
    options: [
      {
        id: "a",
        text: "Beperken en tegelijk gezonde alternatieven zichtbaar maken",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "Minder verleiding én een beter aanbod: de omgeving verandert pas echt als beide gebeuren.",
        routeTags: ["beleid"],
      },
      {
        id: "b",
        text: "Niets doen: iedereen kiest zelf",
        effect: { planet: -1, compass: -1 },
        explain:
          "'Vrije keuze' in een omgeving vol reclame is minder vrij dan het klinkt — zeker voor jongeren.",
      },
      {
        id: "c",
        text: "Alle fastfood verbieden",
        effect: { health: 1, planet: 1, compass: -1 },
        explain:
          "Gezondheidswinst op papier, maar een totaalverbod schuurt met proportionaliteit en draagvlak.",
      },
    ],
    reflection: "Is dit een individuele keuze of een systeemprobleem?",
  },
  {
    id: "c21",
    square: 21,
    type: "event",
    title: "Lichaamsbeeld onder druk",
    situation:
      "Eindeloos scrollen langs perfecte lichamen en transformatievideo's. Het eigen spiegelbeeld lijkt ineens nooit goed genoeg.",
    autoEffect: { health: -1 },
    autoLabel: "Online vergelijking drukt op de mentale gezondheid.",
    options: [
      {
        id: "a",
        text: "Een streng dieet beginnen om aan het beeld te voldoen",
        effect: { health: -2, compass: -1 },
        explain:
          "Een dieet als antwoord op onzekerheid pakt het verkeerde probleem aan — en kan eetproblemen uitlokken.",
      },
      {
        id: "b",
        text: "Erover praten en de feed opschonen",
        effect: { health: 2, socialSupport: 1 },
        explain:
          "Mentale gezondheid is gezondheid. Steun zoeken en de online omgeving aanpassen werkt beter dan strenger eten.",
      },
      {
        id: "c",
        text: "Niets doen en blijven scrollen",
        effect: { health: -1 },
        explain: "De vergelijkingsmachine stopt niet vanzelf.",
      },
    ],
    reflection: "Wat doet de online omgeving met de relatie tussen eten en zelfbeeld?",
  },
  {
    id: "c22",
    square: 22,
    type: "life",
    title: "Sport en herstel",
    situation:
      "Het sportseizoen loopt. Trainen, presteren, eten: hoe verhouden plezier en prestatie zich tot elkaar?",
    options: [
      {
        id: "a",
        text: "Sporten voor plezier, met gewone gevarieerde voeding",
        effect: { health: 2, socialSupport: 1 },
        explain:
          "Plezier is de beste voorspeller van volhouden. Voor de meeste sporters is gewoon goed eten genoeg.",
      },
      {
        id: "b",
        text: "Fanatiek presteren met een streng voedingsschema",
        effect: { health: -1, compass: -1 },
        explain:
          "Strenge schema's op jonge leeftijd koppelen eten aan prestatie en schuld — herstel en groei vragen juist ruimte.",
      },
      {
        id: "c",
        text: "Stoppen met sporten, te druk",
        effect: { health: -1, socialSupport: -1 },
        explain: "Met de sport verdwijnt ook beweging én een sociaal netwerk.",
      },
    ],
    reflection: "Wanneer gaat sportvoeding over gezondheid en wanneer over prestatiedruk?",
  },
  {
    id: "c23",
    square: 23,
    type: "compass",
    title: "Gratis voedingsapp",
    situation:
      "Een gratis app belooft persoonlijk voedingsinzicht. Bij het aanmelden vraagt hij toegang tot locatie, contacten en gezondheidsdata.",
    options: [
      {
        id: "a",
        text: "Alles accepteren — gratis is gratis",
        effect: { compass: -2 },
        explain:
          "Als het product gratis is, ben jij het product. Gezondheidsdata zijn goud waard voor adverteerders.",
      },
      {
        id: "b",
        text: "De app niet gebruiken",
        effect: {},
        explain: "Veilig, maar zo blijft ook de mogelijke waarde van zelfinzicht liggen.",
      },
      {
        id: "c",
        text: "Alleen noodzakelijke toegang geven en instellingen nalopen",
        effect: { compass: 2, aiLiteracy: 1 },
        explain:
          "Dataminimalisatie: de app gebruiken zonder jezelf weg te geven. Dat is digitale basishygiëne.",
        routeTags: ["ai"],
      },
    ],
    reflection: "Wat betaal je eigenlijk voor een gratis app?",
  },
  {
    id: "c24",
    square: 24,
    type: "milestone",
    title: "Digitaal kompas",
    situation:
      "Voedingsadvies komt steeds vaker via feeds, apps en AI. Hoe gaan jullie daarmee om?",
    options: [
      {
        id: "a",
        text: "AI gebruiken als startpunt en bronnen, doelgroep en risico's controleren",
        effect: { health: 1, compass: 3, aiLiteracy: 1 },
        explain:
          "AI als startpunt, nooit als eindpunt. Controleren is de vaardigheid die het verschil maakt.",
      },
      {
        id: "b",
        text: "AI negeren omdat het nooit bruikbaar is",
        effect: {},
        explain:
          "Wie AI volledig negeert, mist hulpmiddelen én het vermogen om anderen erover te adviseren.",
      },
      {
        id: "c",
        text: "Het populairste advies volgen zolang veel mensen het delen",
        effect: { health: -1, compass: -2 },
        explain: "Populariteit is geen bewijs. Viraal en waar zijn twee verschillende dingen.",
      },
    ],
    reflection: "Wanneer is AI een hulpmiddel en wanneer een risico?",
  },

  // ── Fase 4: Op kamers (18–24 jaar) ─────────────────────────────────
  {
    id: "c25",
    square: 25,
    type: "event",
    title: "Op kamers met weinig geld",
    situation:
      "Eerste eigen kamer, eerste eigen boodschappen. De studiefinanciering is op vóór de maand dat is. Budget bepaalt ineens wat haalbaar voelt.",
    autoEffect: { budget: -1 },
    autoLabel: "Budget wordt krapper: dure opties zijn voorlopig buiten bereik.",
    reflection: "Wat verandert er aan 'gezond eten' als geld echt schaars is?",
  },
  {
    id: "c26",
    square: 26,
    type: "dilemma",
    title: "Bezorgapp na college",
    situation:
      "Na een lange dag is bestellen makkelijk. Samen koken kost meer tijd maar kan goedkoper zijn.",
    options: [
      {
        id: "a",
        text: "Bestellen en tijd winnen",
        effect: { health: -1, planet: -1, budget: -1 },
        explain:
          "Gemak heeft meerdere prijzen: geld, verpakking én een gewoonte die zich vastzet.",
        convenience: true,
      },
      {
        id: "b",
        text: "Samen een eenvoudige maaltijd koken",
        effect: { health: 1, planet: 1, compass: 1, cookingSkill: 1, socialSupport: 1 },
        explain:
          "Goedkoper, gezonder en gezelliger — en elke keer koken bouwt vaardigheid op voor later.",
        requires: {
          cookingSkill: 1,
          reason: "Vereist kookvaardigheid 1 — iemand moet weten waar te beginnen.",
        },
      },
      {
        id: "c",
        text: "Maaltijden overslaan om geld te sparen",
        effect: { health: -2, compass: -1, budget: 1 },
        explain:
          "Bezuinigen op eten zelf is de duurste besparing die er is: concentratie, energie en gezondheid betalen de rekening.",
      },
    ],
    reflection: "Welke prijs van gemak zie je pas later terug?",
  },
  {
    id: "c27",
    square: 27,
    type: "life",
    title: "Samen koken",
    situation:
      "Het studentenhuis overweegt een kookroulatie: ieder kookt één vaste avond voor de groep.",
    options: [
      {
        id: "a",
        text: "Meedoen aan de kookroulatie",
        effect: { health: 1, planet: 1, cookingSkill: 1, socialSupport: 1 },
        explain:
          "Grotere pannen, minder verspilling, meer gezelligheid — en gratis kookles van huisgenoten.",
      },
      {
        id: "b",
        text: "Ieder voor zich blijven koken",
        effect: {},
        explain: "Prima te doen, maar de schaalvoordelen en het sociale moment blijven liggen.",
      },
      {
        id: "c",
        text: "Eén vaste gezamenlijke avond per week",
        effect: { health: 1, socialSupport: 1 },
        explain: "Een lichte versie die het ritueel levend houdt zonder grote verplichting.",
      },
    ],
    reflection: "Wat leert samen koken dat een receptenvideo niet leert?",
  },
  {
    id: "c28",
    square: 28,
    type: "compass",
    title: "AI-maaltijdplanner",
    situation:
      "Een app maakt goedkope weekmenu's, maar vraagt veel persoonsgegevens en laat bronnen niet zien.",
    options: [
      {
        id: "a",
        text: "Alles invullen voor maximaal gemak",
        effect: { compass: -2 },
        explain:
          "Het gemak is echt, maar onzichtbare bronnen en maximale datadeling zijn een slechte ruil.",
        convenience: true,
      },
      {
        id: "b",
        text: "Geen app gebruiken",
        effect: {},
        explain: "Veilig, maar een goed gebruikt hulpmiddel had tijd en geld kunnen besparen.",
      },
      {
        id: "c",
        text: "Alleen noodzakelijke data delen en adviezen controleren",
        effect: { health: 1, compass: 2, aiLiteracy: 1 },
        explain:
          "Slim gebruiken vraagt controle: minimale data erin, kritische blik op wat eruit komt.",
        routeTags: ["ai"],
      },
    ],
    reflection: "Hoe controleer je een advies waarvan je de bron niet kent?",
  },
  {
    id: "c29",
    square: 29,
    type: "dilemma",
    title: "Twee halen, één betalen",
    situation:
      "Een grote verpakking is goedkoper per kilo, maar je woont alleen en gooit geregeld eten weg.",
    options: [
      {
        id: "a",
        text: "De aanbieding kopen",
        effect: { planet: -1, budget: 1 },
        explain:
          "Goedkoper per kilo, duurder per gegeten portie: weggegooid eten is weggegooid geld én klimaatimpact.",
      },
      {
        id: "b",
        text: "Een kleinere verpakking kopen",
        effect: { planet: 1, budget: -1 },
        explain: "Iets duurder per kilo, maar wat je koopt wordt ook echt gegeten.",
      },
      {
        id: "c",
        text: "De grote verpakking delen met huisgenoten",
        effect: { planet: 2, compass: 1, socialSupport: 1 },
        explain: "Het voordeel van groot inkopen zonder de verspilling: delen is de slimste route.",
      },
    ],
    reflection: "Wanneer is een aanbieding eigenlijk een verleiding tot verspilling?",
  },
  {
    id: "c30",
    square: 30,
    type: "life",
    title: "Flexweek",
    situation:
      "Het huis daagt elkaar uit: een week minder vlees. Niet als dogma, maar als experiment.",
    options: [
      {
        id: "a",
        text: "De hele week plantaardig proberen",
        effect: { planet: 2, compass: 1, cookingSkill: 1 },
        explain:
          "Een week experimenteren leert meer dan een jaar discussiëren — nieuwe recepten blijven vaak hangen.",
      },
      {
        id: "b",
        text: "Een paar dagen meedoen",
        effect: { health: 1, planet: 1 },
        explain: "Flexibel verminderen is voor de meeste mensen de haalbaarste route.",
      },
      {
        id: "c",
        text: "Niet meedoen",
        effect: { planet: -1 },
        explain: "Mag — maar wie nooit experimenteert, weet ook niet wat haalbaar zou zijn.",
      },
    ],
    reflection: "Werkt een uitdaging beter dan een verplichting?",
  },
  {
    id: "c31",
    square: 31,
    type: "fact",
    title: "Restjesavond",
    situation: "Tijd voor een factcheck. Eens of oneens?",
    factPool: ["f5", "f6"],
  },
  {
    id: "c32",
    square: 32,
    type: "milestone",
    title: "Eigen routine",
    situation: "Jullie studententijd heeft gewoontes gevormd. Wat is blijven hangen?",
    options: [
      {
        id: "a",
        text: "Samen koken met betaalbare basisproducten",
        effect: { health: 2, planet: 1, compass: 1, cookingSkill: 1, socialSupport: 1 },
        explain:
          "De goedkoopste gezonde routine die er is — en hij reist mee naar het werkende leven.",
      },
      {
        id: "b",
        text: "Veel losse bezorgmomenten en weinig planning",
        effect: { health: -1, planet: -1, timePressure: -1 },
        explain:
          "Het gemak van nu wordt de standaard van straks. Gewoontes verhuizen mee.",
        convenience: true,
      },
      {
        id: "c",
        text: "Een rigide voedingsschema dat weinig ruimte laat voor plezier",
        effect: { health: -1, compass: -1 },
        explain:
          "Controle kan doorslaan. Een routine zonder plezier houdt zelden stand — en vreet mentale energie.",
      },
    ],
    reflection: "Welke routines zijn gezond én vol te houden?",
  },

  // ── Fase 5: Werk en relaties (25–39 jaar) ──────────────────────────
  {
    id: "c33",
    square: 33,
    type: "career",
    title: "Kies je beroepsroute",
    situation:
      "De opleiding is afgerond. Vanaf nu beïnvloeden jullie keuzes niet alleen het eigen bord, maar ook dat van anderen. Kies een beroepsroute — elke route geeft een bonus en kleurt latere dilemma's.",
  },
  {
    id: "c34",
    square: 34,
    type: "life",
    title: "Kind, huisdier of vrije ruimte",
    situation:
      "Het leven biedt ruimte voor een grote stap. Elke keuze verandert de omstandigheden — geen enkele is fout.",
    options: [
      {
        id: "a",
        text: "Een kind",
        effect: { socialSupport: 1, timePressure: 1, hasChild: true },
        explain:
          "Een kind brengt verbinding en betekenis, en zet tegelijk alle routines onder druk. Beide zijn waar.",
      },
      {
        id: "b",
        text: "Een huisdier",
        effect: { health: 1, planet: -1, budget: -1, socialSupport: 1, hasPet: true },
        explain: "Gezelschap en beweging, met een prijskaartje in geld en voetafdruk.",
      },
      {
        id: "c",
        text: "Vrije ruimte houden",
        effect: { timePressure: -1 },
        explain:
          "Tijd en flexibiliteit zijn ook iets waard. Een bewuste keuze, geen gemiste kans.",
      },
    ],
    reflection: "Hoe verandert een levenskeuze wat 'gezond eten' in de praktijk betekent?",
  },
  {
    id: "c35",
    square: 35,
    type: "dilemma",
    title: "Hybride gehakt",
    situation:
      "Een product bevat half vlees en half plantaardige ingrediënten. De verpakking noemt het de nieuwe duurzame standaard.",
    options: [
      {
        id: "a",
        text: "Het zien als laagdrempelige tussenstap",
        effect: { planet: 1, compass: 1 },
        explain:
          "Voor veel huishoudens is half-om een haalbare eerste stap — perfectie is niet het enige criterium.",
      },
      {
        id: "b",
        text: "Het afwijzen omdat alleen volledig plantaardig telt",
        effect: { compass: -1 },
        explain:
          "Wie alleen het maximale accepteert, verliest de grote groep die wél een stap wil zetten.",
      },
      {
        id: "c",
        text: "Eerst voedingswaarde, herkomst en claim controleren",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "'Duurzame standaard' is een claim, geen feit. Controleren vóór oordelen — in beide richtingen.",
        routeTags: ["industrie", "onderzoek"],
      },
    ],
    reflection: "Is een tussenstap vooruitgang of marketing — en kan het allebei zijn?",
  },
  {
    id: "c36",
    square: 36,
    type: "dilemma",
    title: "Nutri-Score A",
    situation:
      "Een sterk bewerkte snack krijgt een gunstige Nutri-Score en wordt als gezonde keuze gepresenteerd.",
    options: [
      {
        id: "a",
        text: "De score als volledig oordeel gebruiken",
        effect: { compass: -1 },
        explain:
          "Nutri-Score vergelijkt binnen een categorie. Een A op een snack maakt het geen groente.",
      },
      {
        id: "b",
        text: "Nutri-Score negeren omdat het nooit werkt",
        effect: {},
        explain:
          "Het hulpmiddel afschrijven om zijn beperkingen is even ongenuanceerd als het blind volgen.",
      },
      {
        id: "c",
        text: "De score gebruiken binnen de productcategorie en context uitleggen",
        effect: { health: 1, compass: 2 },
        explain:
          "Een hulpmiddel is nuttig zodra je weet wat het wél en niet meet — dat uitleggen is professionele kerntaak.",
        routeTags: ["industrie", "eerstelijns"],
      },
    ],
    reflection: "Helpt een simpel label, of versimpelt het te veel?",
  },
  {
    id: "c37",
    square: 37,
    type: "event",
    title: "Werkdruk",
    situation:
      "Een promotie! Meer salaris, meer verantwoordelijkheid — en een agenda die uit zijn voegen barst. Tijd wordt het schaarste ingrediënt.",
    autoEffect: { budget: 1, timePressure: 1 },
    autoLabel: "Budget wordt ruimer, maar de tijdsdruk stijgt. Gemak lonkt.",
    reflection: "Wat koop je met meer geld als je geen tijd hebt om het goed te besteden?",
  },
  {
    id: "c38",
    square: 38,
    type: "life",
    title: "Seizoensboodschappen",
    situation:
      "Een nieuwe routine ligt binnen handbereik: koken met wat het seizoen biedt, in plaats van wat de gewoonte dicteert.",
    options: [
      {
        id: "a",
        text: "Wekelijks plannen rond seizoensgroenten",
        effect: { health: 1, planet: 2, cookingSkill: 1 },
        explain:
          "Seizoensgroenten zijn vaak goedkoper, verser en klimaatvriendelijker — maar het vraagt kookvaardigheid en planning.",
        requires: {
          cookingSkill: 2,
          reason: "Vereist kookvaardigheid 2 — improviseren met wisselend aanbod moet je kunnen.",
        },
      },
      {
        id: "b",
        text: "Alles houden zoals het is",
        effect: {},
        explain: "Vertrouwd, maar de winst van het seizoen blijft op de plank liggen.",
      },
      {
        id: "c",
        text: "Alleen op aanbiedingen letten",
        effect: { planet: -1, budget: 1 },
        explain:
          "Goedkoop, maar aanbiedingen sturen richting bewerkte producten en impulsaankopen.",
      },
    ],
    reflection: "Welke routine levert planeetwinst op zonder extra geld?",
  },
  {
    id: "c39",
    square: 39,
    type: "compass",
    title: "Slimme koelkast",
    situation:
      "Een slimme koelkast kan verspilling verminderen, maar verzamelt aankoop- en eetdata.",
    options: [
      {
        id: "a",
        text: "Alles delen voor automatisch advies",
        effect: { planet: 1, compass: -1 },
        explain:
          "De verspilling daalt echt — maar het complete eetpatroon van het huishouden wordt handelswaar.",
        convenience: true,
      },
      {
        id: "b",
        text: "Geen slimme functies gebruiken",
        effect: {},
        explain: "Privacyveilig, maar de verspillingswinst blijft liggen.",
      },
      {
        id: "c",
        text: "Alleen voorraadfuncties gebruiken en datadeling beperken",
        effect: { planet: 1, compass: 2, aiLiteracy: 1 },
        explain:
          "De functie gebruiken zonder het eetpatroon te verkopen: techniek op jouw voorwaarden.",
        routeTags: ["ai"],
      },
    ],
    reflection: "Hoeveel data is verspillingsreductie waard?",
  },
  {
    id: "c40",
    square: 40,
    type: "milestone",
    title: "Invloed groeit",
    situation: "Je hebt meer geld en invloed dan vroeger. Wat doe je daarmee?",
    options: [
      {
        id: "a",
        text: "Investeren in haalbare routines en bewuste keuzes zonder perfectie na te jagen",
        effect: { health: 1, planet: 2, compass: 2, professionalInfluence: 1 },
        explain:
          "Geld als gereedschap voor betere routines — niet als excuus voor meer consumptie.",
      },
      {
        id: "b",
        text: "Meer consumeren omdat duurzame producten toch worden gekocht",
        effect: { planet: -2, budget: 1 },
        explain:
          "Duurzaam kopen én meer kopen heft elkaar op. De voetafdruk groeit gewoon mee met de consumptie.",
      },
      {
        id: "c",
        text: "Duurzaamheid als luxeprobleem wegzetten",
        effect: { planet: -1, compass: -1 },
        explain:
          "Begrijpelijk cynisme, maar wie invloed heeft en wegkijkt, maakt het probleem van een ander groter.",
      },
    ],
    reflection: "Leidt meer geld automatisch tot duurzamer gedrag?",
  },

  // ── Fase 6: Midden in het leven (40–59 jaar) ───────────────────────
  {
    id: "c41",
    square: 41,
    type: "event",
    title: "Diabetesrisico",
    situation:
      "Een bloedtest bij de huisarts: verhoogd risico op diabetes type 2. Geen paniek, wel een keerpunt. De context van elke voedingskeuze is veranderd.",
    autoEffect: { health: -2, diagnosis: "diabetesrisico" },
    autoLabel: "Diagnose: diabetesrisico. Gezondheid daalt, de context verandert.",
    options: [
      {
        id: "a",
        text: "Leefstijl serieus aanpakken met begeleiding",
        effect: { health: 2, compass: 1 },
        explain:
          "Bij diabetesrisico is leefstijl bewezen effectief — met begeleiding is het ook vol te houden.",
        routeTags: ["eerstelijns"],
      },
      {
        id: "b",
        text: "Het negeren — het valt vast mee",
        effect: { health: -1 },
        explain: "Risico verdwijnt niet door wegkijken. Het groeit in stilte.",
      },
      {
        id: "c",
        text: "Alleen op toekomstige medicatie vertrouwen",
        effect: { compass: -1 },
        explain:
          "Medicatie kan helpen, maar wie leefstijl bij voorbaat afschrijft, laat het krachtigste middel liggen.",
      },
    ],
    reflection: "Wat verandert er aan een voedingsadvies als er een diagnose bij komt?",
  },
  {
    id: "c42",
    square: 42,
    type: "dilemma",
    title: "GLP-1 zonder begeleiding",
    situation: "Een cliënt verwacht dat afslankmedicatie leefstijlbegeleiding overbodig maakt.",
    options: [
      {
        id: "a",
        text: "Medicatie als complete oplossing presenteren",
        effect: { health: -1, compass: -2 },
        explain:
          "GLP-1 onderdrukt eetlust, maar zonder begeleiding loert spierverlies, tekorten en terugval na stoppen.",
      },
      {
        id: "b",
        text: "Medicatie afwijzen ongeacht context",
        effect: { health: -1, compass: -1 },
        explain:
          "Dogmatisch afwijzen van een werkzaam middel is net zo onprofessioneel als het blind omarmen.",
      },
      {
        id: "c",
        text: "Medicatie bespreken als mogelijk hulpmiddel naast passende begeleiding",
        effect: { health: 2, compass: 2 },
        explain:
          "Medicatie én begeleiding versterken elkaar: eetlust verandert, dus juist dan telt wát er gegeten wordt.",
        routeTags: ["klinisch", "eerstelijns"],
      },
    ],
    reflection: "Verandert nieuwe medicatie de rol van de diëtist — of bevestigt het die juist?",
  },
  {
    id: "c43",
    square: 43,
    type: "event",
    title: "Mantelzorg",
    situation:
      "Een ouder wordt hulpbehoevend. Boodschappen, maaltijden, doktersbezoeken — de zorg komt boven op alles wat er al was.",
    autoEffect: { health: -1, compass: 1, timePressure: 1 },
    autoLabel:
      "Mantelzorg vraagt veel: tijd en eigen gezondheid staan onder druk, maar het kompas groeit.",
    reflection: "Wie zorgt er voor de voeding van de mantelzorger zelf?",
  },
  {
    id: "c44",
    square: 44,
    type: "dilemma",
    title: "Minder vlees bij hart- en vaatziekten",
    situation:
      "Een cliënt wil duurzamer eten, maar betaalbare alternatieven en kookvaardigheid zijn beperkt.",
    options: [
      {
        id: "a",
        text: "Direct volledig plantaardig eisen",
        effect: { health: -1, planet: 1, compass: -1 },
        explain:
          "Een advies dat niet uitvoerbaar is, is geen advies. De cliënt haakt af en het doel verdwijnt uit zicht.",
      },
      {
        id: "b",
        text: "Niets veranderen omdat het lastig is",
        effect: { planet: -1 },
        explain: "Haalbaarheid respecteren is goed — ambitie opgeven is iets anders.",
      },
      {
        id: "c",
        text: "Stapsgewijs betaalbare alternatieven oefenen",
        effect: { health: 1, planet: 1, compass: 2, cookingSkill: 1 },
        explain:
          "Kleine haalbare stappen mét oefening veranderen gedrag duurzamer dan grote eisen.",
        routeTags: ["eerstelijns"],
      },
    ],
    reflection: "Wat als het ideale advies en het haalbare advies verschillen?",
  },
  {
    id: "c45",
    square: 45,
    type: "dilemma",
    title: "Suikertaks",
    situation:
      "De overheid wil suikerrijke producten duurder maken. Lage inkomens kunnen relatief harder worden geraakt.",
    options: [
      {
        id: "a",
        text: "Alleen belasting verhogen",
        effect: { health: 1 },
        explain:
          "Prijs stuurt gedrag, maar zonder betaalbaar alternatief betaalt de krapste portemonnee de rekening.",
      },
      {
        id: "b",
        text: "Niets doen vanwege keuzevrijheid",
        effect: { compass: -1 },
        explain:
          "Keuzevrijheid in een omgeving vol goedkope suiker is geen gelijk speelveld.",
      },
      {
        id: "c",
        text: "Belasting combineren met betaalbare gezonde alternatieven",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "Ontmoedigen én mogelijk maken: pas samen wordt prijsbeleid eerlijk beleid.",
        routeTags: ["beleid"],
      },
    ],
    reflection: "Raakt sturen via prijs iedereen hetzelfde?",
  },
  {
    id: "c46",
    square: 46,
    type: "dilemma",
    title: "Gezond supermarktbeleid",
    situation:
      "Supermarkten kunnen worden beloond als hun verkoop gezonder wordt. De definitie van gezond blijft onderwerp van discussie.",
    options: [
      {
        id: "a",
        text: "Belonen met transparante criteria en evaluatie",
        effect: { health: 1, planet: 1, compass: 2, professionalInfluence: 1 },
        explain:
          "Meetbaar, bijstuurbaar en eerlijk: beleid dat leert van zijn eigen resultaten.",
        routeTags: ["beleid", "onderzoek"],
      },
      {
        id: "b",
        text: "Alleen de consument aanspreken",
        effect: { planet: -1, compass: -1 },
        explain:
          "De consument kiest in een schap dat de supermarkt heeft ingericht. Wie alleen de klant aanspreekt, kijkt weg van het systeem.",
      },
      {
        id: "c",
        text: "Elk ongezond product uit het schap halen",
        effect: { health: 1, planet: 1, compass: -1 },
        explain:
          "Radicaal effectief op papier, maar wie bepaalt 'ongezond' — en waar blijft de autonomie?",
      },
    ],
    reflection: "Belonen, bestraffen of informeren: wat verandert gedrag echt?",
  },
  {
    id: "c47",
    square: 47,
    type: "compass",
    title: "Cliëntdata in een AI-tool",
    situation:
      "Een AI-tool maakt snel een conceptadvies, maar slaat gevoelige cliëntdata extern op.",
    options: [
      {
        id: "a",
        text: "Gebruiken zonder controle omdat het tijd bespaart",
        effect: { compass: -3 },
        explain:
          "Gezondheidsdata van cliënten extern opslaan zonder grondslag schendt privacy én beroepsethiek.",
        convenience: true,
      },
      {
        id: "b",
        text: "Nooit meer digitale hulpmiddelen gebruiken",
        effect: {},
        explain:
          "Het probleem is niet 'digitaal', maar 'onzorgvuldig'. Vermijden is geen beleid.",
      },
      {
        id: "c",
        text: "Alleen werken met passende toestemming, dataminimalisatie en controle",
        effect: { compass: 3, aiLiteracy: 1 },
        explain:
          "Efficiëntie en privacy kunnen samengaan — maar alleen wie de voorwaarden kent, kan ze stellen.",
        routeTags: ["ai", "klinisch"],
      },
    ],
    reflection: "Wiens data is het eigenlijk — en wie draagt het risico?",
  },
  {
    id: "c48",
    square: 48,
    type: "milestone",
    title: "Professionele verantwoordelijkheid",
    situation:
      "Je advies bereikt cliënten, collega's of consumenten. Waar ligt je professionele grens?",
    options: [
      {
        id: "a",
        text: "Transparant zijn over onzekerheid, belangen en haalbaarheid",
        effect: { health: 1, planet: 1, compass: 3, professionalInfluence: 1 },
        explain:
          "Eerlijkheid over wat je niet weet maakt een professional geloofwaardiger, niet zwakker.",
      },
      {
        id: "b",
        text: "Altijd het theoretisch ideale advies geven, ongeacht context",
        effect: { planet: 1, compass: -1 },
        explain:
          "Een medisch correct advies dat niemand kan uitvoeren, is professioneel gezien geen goed advies.",
      },
      {
        id: "c",
        text: "Vooral kiezen wat snel en commercieel aantrekkelijk is",
        effect: { planet: -1, compass: -2, budget: 1 },
        explain:
          "Het verdient nu, maar professioneel vertrouwen is het enige kapitaal dat niet terugkomt na verkoop.",
      },
    ],
    reflection: "Wanneer is een medisch correct advies toch geen goed advies?",
  },

  // ── Fase 7: Ouder worden (60–74 jaar) ──────────────────────────────
  {
    id: "c49",
    square: 49,
    type: "dilemma",
    title: "Spierbehoud",
    situation:
      "Na het zestigste levensjaar verdwijnt spiermassa sneller. Eiwit en beweging worden belangrijker — maar de eetlust wordt juist kleiner.",
    options: [
      {
        id: "a",
        text: "Eiwitrijk eten spreiden over de dag én blijven bewegen",
        effect: { health: 2, compass: 1 },
        explain:
          "Spierbehoud vraagt beide: voldoende eiwit per maaltijd én kracht blijven gebruiken.",
        routeTags: ["klinisch"],
      },
      {
        id: "b",
        text: "Niets veranderen — eten zoals altijd",
        effect: { health: -1 },
        explain:
          "Wat op je veertigste genoeg was, is dat op je zeventigste niet meer. De behoefte verschuift.",
      },
      {
        id: "c",
        text: "Dure supplementen kopen zonder advies",
        effect: { compass: -1, budget: -1 },
        explain:
          "Supplementen kunnen zinvol zijn, maar zonder beoordeling is het vooral dure urine.",
      },
    ],
    reflection: "Waarom verandert het eiwitadvies met de levensfase?",
  },
  {
    id: "c50",
    square: 50,
    type: "event",
    title: "Vast inkomen",
    situation:
      "Pensioen. Het inkomen wordt vast — en krapper. Duurdere duurzame producten zijn niet altijd meer haalbaar.",
    autoEffect: { budget: -1 },
    autoLabel: "Budget wordt krapper: het pensioen dwingt tot scherpere keuzes.",
    options: [
      {
        id: "a",
        text: "Duurzaamheid niet meer bespreken",
        effect: { planet: -1 },
        explain:
          "Krap budget is een reden om slimmer te kiezen, niet om het gesprek te stoppen.",
      },
      {
        id: "b",
        text: "Goedkope seizoenskeuzes en minder verspilling zoeken",
        effect: { health: 1, planet: 1, compass: 2, cookingSkill: 1 },
        explain:
          "Duurzaam en goedkoop overlappen vaker dan gedacht: seizoen, peulvruchten, restjes.",
      },
      {
        id: "c",
        text: "Alleen dure keurmerkproducten adviseren",
        effect: { planet: 1, compass: -1, budget: -1 },
        explain:
          "Goedbedoeld, maar een advies dat het budget overschrijdt, schuift het probleem naar de portemonnee.",
      },
    ],
    reflection: "Hoe verandert geld de ruimte om te kiezen?",
  },
  {
    id: "c51",
    square: 51,
    type: "dilemma",
    title: "Friet in het ziekenhuis",
    situation:
      "Een patiënt met kanker en weinig eetlust wil alleen friet. De ideale maaltijd blijft onaangeroerd.",
    options: [
      {
        id: "a",
        text: "Friet toestaan en zoeken naar haalbare aanvullingen",
        effect: { health: 2, compass: 2 },
        explain:
          "Bij weinig eetlust telt elke gegeten hap. Friet die binnen blijft verslaat een ideale maaltijd die blijft staan.",
        routeTags: ["klinisch"],
      },
      {
        id: "b",
        text: "Alleen de ideale maaltijd blijven aanbieden",
        effect: { health: -2, compass: -1 },
        explain:
          "Het ideaal wint op papier en verliest aan het bed: de patiënt eet simpelweg niet.",
      },
      {
        id: "c",
        text: "Voedingsadvies volledig loslaten",
        effect: { health: -1 },
        explain:
          "Meedenken blijft nodig: wat erbij kan, hoe het meer wordt, wat het lichaam nu nodig heeft.",
      },
    ],
    reflection: "Wanneer krijgt voldoende eten voorrang op ideaal eten?",
  },
  {
    id: "c52",
    square: 52,
    type: "life",
    title: "Samen eten",
    situation:
      "Na het pensioen worden de dagen stiller. De buurt organiseert een wekelijkse eettafel in het wijkcentrum.",
    options: [
      {
        id: "a",
        text: "Wekelijks aanschuiven bij de buurteettafel",
        effect: { health: 2, compass: 1, socialSupport: 1 },
        explain:
          "Samen eten beschermt tegen eenzaamheid én tegen slechter eten — de twee versterken elkaar.",
      },
      {
        id: "b",
        text: "Liever alleen blijven eten",
        effect: { health: -1, socialSupport: -1 },
        explain:
          "Alleen eten went — en juist dat is het risico: de zorg voor het eigen bord verschraalt mee.",
      },
      {
        id: "c",
        text: "Zelf af en toe familie of buren uitnodigen",
        effect: { health: 1, socialSupport: 1 },
        explain: "Gastheer of gast: het effect van gezelschap aan tafel is hetzelfde.",
      },
    ],
    reflection: "Sociale verbinding is gezondheid — waar zie je dat hier terug?",
  },
  {
    id: "c53",
    square: 53,
    type: "compass",
    title: "Eiwitmarketing voor ouderen",
    situation:
      "Speciale eiwitdrankjes voor 60-plussers liggen prominent in het schap, met claims over spierbehoud. Ze zijn fors geprijsd.",
    options: [
      {
        id: "a",
        text: "Kopen — de reclame zegt dat het nodig is",
        effect: { compass: -1, budget: -1 },
        explain:
          "De behoefte aan eiwit is echt, maar dure drankjes zijn zelden de enige of beste route.",
        requires: {
          budget: 1,
          reason: "Vereist minimaal gemiddeld budget — deze producten zijn fors geprijsd.",
        },
      },
      {
        id: "b",
        text: "De werkelijke behoefte laten beoordelen en eerst gewone voeding benutten",
        effect: { health: 1, compass: 2 },
        explain:
          "Kwark, eieren, peulvruchten: vaak goedkoper en net zo effectief. Eerst beoordelen, dan kopen.",
        routeTags: ["eerstelijns", "klinisch"],
      },
      {
        id: "c",
        text: "Alles afwijzen, ook bij echte behoefte",
        effect: { health: -1 },
        explain:
          "Bij ondervoeding of kleine eetlust kán drinkvoeding juist waardevol zijn. Marketing wantrouwen is iets anders dan behoefte ontkennen.",
      },
    ],
    reflection: "Noodzaak of slimme verkoop — hoe maak je dat onderscheid?",
  },
  {
    id: "c54",
    square: 54,
    type: "dilemma",
    title: "Klimaatbestendig menu",
    situation:
      "Een zorginstelling wil het menu klimaatvriendelijker maken. Bewoners hechten aan vertrouwde gerechten.",
    options: [
      {
        id: "a",
        text: "In één keer een volledig plantaardig menu invoeren",
        effect: { health: -1, planet: 2, compass: -1 },
        explain:
          "Maximale planeetwinst, maar bewoners die hun eten niet herkennen, eten minder — en dat is hier een echt risico.",
      },
      {
        id: "b",
        text: "Niets veranderen",
        effect: { planet: -1 },
        explain: "De zorg heeft een grote voedselvoetafdruk. Stilstand is ook een keuze.",
      },
      {
        id: "c",
        text: "Stapsgewijs verduurzamen mét inspraak van bewoners",
        effect: { health: 1, planet: 1, compass: 2 },
        explain:
          "Vertrouwde gerechten verduurzamen van binnenuit: kleinere stappen die wél gegeten worden.",
        routeTags: ["beleid", "onderzoek"],
      },
    ],
    reflection: "Planetary Health in de praktijk: wat mag duurzaamheid kosten aan eetplezier?",
  },
  {
    id: "c55",
    square: 55,
    type: "compass",
    title: "Digitaal zorgdossier",
    situation:
      "Het zorgdossier wordt digitaal gedeeld tussen behandelaars. Handig — maar wie kijkt er allemaal mee, en wat wordt er gedeeld?",
    options: [
      {
        id: "a",
        text: "Alles automatisch delen met iedereen",
        effect: { compass: -1 },
        explain:
          "Gemak zonder grenzen: ook gegevens die niets met de behandeling te maken hebben, gaan mee.",
        convenience: true,
      },
      {
        id: "b",
        text: "Niets delen, ook niet met behandelaars",
        effect: { health: -1 },
        explain:
          "Maximale privacy, maar behandelaars die elkaars informatie missen, maken vermijdbare fouten.",
      },
      {
        id: "c",
        text: "Bewust delen: wél met behandelaars, niet met derden",
        effect: { compass: 2, aiLiteracy: 1 },
        explain:
          "Delen waar het de zorg dient, begrenzen waar het dat niet doet. Autonomie in de praktijk.",
        routeTags: ["ai", "klinisch"],
      },
    ],
    reflection: "Wat deel je en met wie — en wie beslist dat?",
  },
  {
    id: "c56",
    square: 56,
    type: "milestone",
    title: "Kwaliteit van leven",
    situation:
      "Op oudere leeftijd worden sociale verbinding, smaak en voldoende eten extra belangrijk. Wat is jullie uitgangspunt?",
    options: [
      {
        id: "a",
        text: "Gezondheid breed bekijken: voeding, plezier, herstel en autonomie",
        effect: { health: 2, compass: 2, socialSupport: 1 },
        explain:
          "Gezondheid is meer dan voedingsstoffen — zeker in deze fase is kwaliteit van leven het doel.",
      },
      {
        id: "b",
        text: "Alleen sturen op de ideale voedingsrichtlijn",
        effect: { compass: -1 },
        explain:
          "De richtlijn is een middel, geen doel. Wie alleen de richtlijn ziet, mist de mens.",
      },
      {
        id: "c",
        text: "Voedingsadvies volledig loslaten omdat genieten alles is",
        effect: { health: -1 },
        explain:
          "Genieten hoort erbij, maar wie alle zorg loslaat, mist risico's zoals ondervoeding.",
      },
    ],
    reflection: "Wanneer krijgt voldoende eten voorrang op ideaal eten?",
  },

  // ── Fase 8: Nalatenschap (75+ jaar) ────────────────────────────────
  {
    id: "c57",
    square: 57,
    type: "event",
    title: "Risico op ondervoeding",
    situation:
      "De eetlust neemt af, kleding gaat losser zitten. Ongemerkt is er gewicht verloren. Meer eten wordt belangrijker dan perfect eten.",
    autoEffect: { health: -2, diagnosis: "ondervoeding" },
    autoLabel: "Risico op ondervoeding: de prioriteiten verschuiven.",
    options: [
      {
        id: "a",
        text: "Maaltijden verrijken en vaker kleine porties eten",
        effect: { health: 2, compass: 1 },
        explain:
          "Roomboter, volle producten, tussendoortjes: bij ondervoeding draait het advies om — energie eerst.",
        routeTags: ["klinisch"],
      },
      {
        id: "b",
        text: "Strikt 'gezond' blijven eten zoals de schijf voorschrijft",
        effect: { health: -1, compass: -1 },
        explain:
          "Magere producten en veel vezels verzadigen snel — precies wat hier níet helpt.",
      },
      {
        id: "c",
        text: "Eetmomenten sociaal maken om de zin terug te brengen",
        effect: { health: 1, socialSupport: 1 },
        explain: "Gezelschap is een bewezen eetlustopwekker. Samen eten is hier ook medicijn.",
      },
    ],
    reflection: "Waarom keert het voedingsadvies hier om ten opzichte van eerdere fasen?",
  },
  {
    id: "c58",
    square: 58,
    type: "dilemma",
    title: "Menu in het verzorgingstehuis",
    situation:
      "Een verzorgingstehuis wil ongezonde snacks volledig weren. Bewoners missen vertrouwde producten en sociale momenten.",
    options: [
      {
        id: "a",
        text: "Volledig verbieden",
        effect: { planet: 1, compass: -1 },
        explain:
          "Gezond op papier, maar het ontneemt bewoners autonomie en dierbare momenten — in hun eigen huis.",
      },
      {
        id: "b",
        text: "Alles onbeperkt aanbieden",
        effect: { health: -1, planet: -1 },
        explain: "Keuzevrijheid zonder enige zorgcontext is hier ook geen zorg.",
      },
      {
        id: "c",
        text: "Keuzevrijheid behouden en het aanbod slim aanvullen",
        effect: { health: 1, compass: 2 },
        explain:
          "Het gebakje bij de koffie blijft, het aanbod eromheen wordt beter. Autonomie én zorg.",
        routeTags: ["klinisch", "beleid"],
      },
    ],
    reflection: "Van wie is het menu in een verzorgingstehuis eigenlijk?",
  },
  {
    id: "c59",
    square: 59,
    type: "life",
    title: "Een kleinkind vraagt advies",
    situation:
      "Een kleinkind van veertien vraagt: 'Wat moet ik nou eigenlijk eten?' Welke gewoonte geven jullie door?",
    options: [
      {
        id: "a",
        text: "Samen koken en laten proeven hoe lekker gewoon eten is",
        effect: { health: 1, compass: 1, cookingSkill: 1, socialSupport: 1 },
        explain:
          "De waardevolste overdracht is geen regel maar een vaardigheid — en een herinnering aan samen.",
      },
      {
        id: "b",
        text: "Strenge regels meegeven: dit wel, dat nooit",
        effect: { health: -1, compass: -1 },
        explain:
          "Regels zonder context houden geen stand bij een veertienjarige — en smaken naar dwang.",
      },
      {
        id: "c",
        text: "'Eet gewoon wat je lekker vindt' en verder niets",
        effect: {},
        explain:
          "Ontspannen, maar een gemiste kans: juist deze vraag verdient een echt gesprek.",
      },
    ],
    reflection: "Welke eetgewoonte van vroeger draag jij nu nog mee?",
  },
  {
    id: "c60",
    square: 60,
    type: "dilemma",
    title: "Planetary Health",
    situation:
      "Een medisch correct advies heeft een relatief hoge milieu-impact. Er bestaan alternatieven, maar die vragen extra begeleiding.",
    options: [
      {
        id: "a",
        text: "Alleen medische uitkomst meewegen",
        effect: { health: 1, planet: -1 },
        explain:
          "Medisch verdedigbaar, maar wie de planeet structureel buiten de afweging laat, schuift de rekening door.",
      },
      {
        id: "b",
        text: "Alleen planeetimpact meewegen",
        effect: { health: -1, planet: 2, compass: -1 },
        explain:
          "De planeet wint, de patiënt verliest. Een advies dat medisch tekortschiet, is geen duurzame oplossing.",
      },
      {
        id: "c",
        text: "Samen zoeken naar een passend alternatief en eerlijk zijn over de afweging",
        effect: { health: 1, planet: 1, compass: 3 },
        explain:
          "Individu en systeem komen samen: de afweging benoemen ís het professionele antwoord.",
        routeTags: ["onderzoek", "klinisch"],
      },
    ],
    reflection: "Mag een diëtist de planeet laten meewegen in een individueel advies?",
  },
  {
    id: "c61",
    square: 61,
    type: "compass",
    title: "Lobby uit de industrie",
    situation:
      "Een producent sponsort een voorlichtingscampagne en wil de formulering van het advies subtiel sturen.",
    options: [
      {
        id: "a",
        text: "Accepteren zonder dit te melden",
        effect: { compass: -3, budget: 1 },
        explain:
          "Verborgen beïnvloeding is de snelste manier om publiek vertrouwen te verspelen — voor het hele beroep.",
      },
      {
        id: "b",
        text: "Alle samenwerking afwijzen",
        effect: {},
        explain:
          "Zuiver, maar samenwerking met de industrie kán waarde hebben — mits de voorwaarden kloppen.",
      },
      {
        id: "c",
        text: "Alleen samenwerken met transparantie en inhoudelijke onafhankelijkheid",
        effect: { compass: 3, professionalInfluence: 1 },
        explain:
          "Wie de voorwaarden vooraf vastlegt en belangen openbaar maakt, kan samenwerken zonder te buigen.",
        routeTags: ["industrie", "onderzoek"],
      },
    ],
    reflection: "Waar ligt de grens tussen samenwerken en gestuurd worden?",
  },
  {
    id: "c62",
    square: 62,
    type: "career",
    title: "Laatste beroepsadvies",
    situation:
      "De loopbaan loopt ten einde. Eén laatste professionele daad: welke verandering laten jullie na aan het vakgebied?",
    options: [
      {
        id: "a",
        text: "Kennis en twijfels overdragen aan de nieuwe generatie",
        effect: { compass: 2, professionalInfluence: 1 },
        explain:
          "De eerlijkste nalatenschap: niet alleen wat je weet, maar ook wat je nooit zeker wist.",
      },
      {
        id: "b",
        text: "Pleiten voor één structurele verandering in het systeem",
        effect: { planet: 1, compass: 1, professionalInfluence: 1 },
        explain:
          "Eén goed gekozen systeemverandering werkt langer door dan duizend individuele adviezen.",
      },
      {
        id: "c",
        text: "In stilte afsluiten — het is mooi geweest",
        effect: {},
        explain: "Begrijpelijk en gun jezelf die rust. Al blijft er kennis onbenut achter.",
      },
    ],
    reflection: "Welke verandering in het voedingslandschap zou jij willen nalaten?",
  },
  {
    id: "c63",
    square: 63,
    type: "life",
    title: "Reflectietafel",
    situation:
      "De tafel is gedekt voor een laatste gesprek. Terugkijkend op een leven vol afwegingen: wat typeerde jullie keuzes het meest?",
    options: [
      {
        id: "a",
        text: "We kozen vaak voor haalbaar boven perfect",
        effect: { health: 1, compass: 1 },
        explain: "Haalbaarheid is geen compromis maar een voorwaarde — dat inzicht is winst.",
      },
      {
        id: "b",
        text: "We lieten de planeet zwaar meewegen, ook als het schuurde",
        effect: { planet: 1, compass: 1 },
        explain: "Consequent kiezen voor het systeem vraagt moed — en eerlijkheid over de prijs.",
      },
      {
        id: "c",
        text: "We bleven twijfelen en juist dat hield ons scherp",
        effect: { compass: 2 },
        explain: "Twijfel is geen zwakte. Zorgvuldig redeneren bestaat juist dankzij twijfel.",
      },
    ],
    reflection: "Terugkijken zonder oordeel: wat zou je opnieuw zo doen?",
  },
  {
    id: "c64",
    square: 64,
    type: "finish",
    title: "De laatste tafel",
    situation:
      "Je kijkt terug op je levenspad. Welke zin past het beste bij jullie keuzes?",
    options: [
      {
        id: "a",
        text: "Een goed advies is gezond, haalbaar, duurzaam en eerlijk",
        effect: { health: 1, planet: 1, compass: 2 },
        explain: "De vier woorden die dit hele spel samenvatten.",
      },
      {
        id: "b",
        text: "De hoogste score was belangrijker dan de afweging",
        effect: { compass: -1 },
        explain:
          "Eerlijk antwoord! Maar het spel ging stiekem nooit over de score — net als het vak.",
      },
      {
        id: "c",
        text: "Perfecte keuzes bestaan niet, maar zorgvuldig redeneren wel",
        effect: { health: 1, planet: 1, compass: 2 },
        explain: "Precies de houding die een goede professional kenmerkt.",
      },
    ],
    reflection: "Welke keuze uit het spel zou je in het echt opnieuw willen bespreken?",
  },
];

export function cardForSquare(n: number): Card | undefined {
  return CARDS.find((c) => c.square === n);
}

export function cardById(id: string): Card | undefined {
  return CARDS.find((c) => c.id === id);
}
