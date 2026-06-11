# Het Levenspad

**Van eerste hap tot laatste advies** — een digitaal levenswegspel voor tweedejaars
studenten Voeding en Diëtetiek van de HAN.

Teams doorlopen een mensenleven van 64 vakjes: van babyvoeding en de eerste
groentehap tot studeren, werken, mantelzorg, ziekte en nalatenschap. Onderweg
wegen ze telkens drie meters tegen elkaar af:

- **Gezondheid** — lichamelijk én mentaal, inclusief sociale verbinding
- **Planeet** — klimaat, verspilling, verpakking en het voedselsysteem
- **Kompas** — ethiek, transparantie, AI-geletterdheid en professioneel handelen

Het spel is nadrukkelijk een **educatief reflectiespel**, geen persoonlijk
gezondheidsadvies. Veel dilemma's hebben meerdere verdedigbare antwoorden;
de nabespreking in de klas is onderdeel van het leerproces.

## Spelen

Online: **https://danniewillemsen2000-cmyk.github.io/het-levenspad/**

Lokaal:

```bash
npm install
npm run dev
```

## Voor docenten: content aanpassen

Alle spelinhoud staat los van de code in `src/data/`:

| Bestand | Inhoud |
|---|---|
| `src/data/cards.ts` | Alle 64 kaarten: situaties, opties, effecten, reflectievragen |
| `src/data/board.ts` | Bordindeling, levensfasen, foto's, emoji's |
| `src/data/facts.ts` | De factchecks (eens/oneens met uitleg) |
| `src/data/careers.ts` | De zes beroepsroutes met bonussen |
| `src/data/meta.ts` | Eindprofielen en nabespreekvragen |

Puntwaardes aanpassen = het `effect`-object van een optie wijzigen. Kleuren
staan centraal in `src/styles.css` (CSS-variabelen, prototypewaarden voor de
HAN Green Office-huisstijl).

### Docentmodus

Via de knop **Docentmodus** (startscherm of scorepaneel):
verborgen omstandigheden inzien, dobbelsteen forceren, elke kaart openen,
logboek bekijken, rapport exporteren (JSON/tekst) en nabespreekvragen tonen.

## Techniek

React + TypeScript + Vite. Spelstand wordt lokaal bewaard (`localStorage`),
geen backend nodig.

Nieuwe versie online zetten (GitHub Pages, `gh-pages` branch):

```bash
npm run deploy
```

Foto's: [Unsplash](https://unsplash.com) (Unsplash-licentie).
