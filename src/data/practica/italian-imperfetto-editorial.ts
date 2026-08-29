import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Le vacanze al lago', instruction: 'Coniuga nuotare all’imperfetto.', segments: ['Da piccoli noi ', ' nel lago ogni mattina.'], entries: [['nuotare', 'nuotavamo']] },
  { title: 'La vecchia stazione', instruction: 'Coniuga essere all’imperfetto.', segments: ['Nel 1980 la stazione ', ' molto più piccola.'], entries: [['essere', 'era']] },
  { title: 'Il tragitto di papà', instruction: 'Coniuga andare all’imperfetto.', segments: ['Quando lavorava in centro, mio padre ', ' in ufficio a piedi.'], entries: [['andare', 'andava']] },
  { title: 'Una sera d’inverno', instruction: 'Coniuga nevicare all’imperfetto.', segments: ['Fuori ', ' e le strade erano deserte.'], entries: [['nevicare', 'nevicava']] },
  { title: 'La casa dei nonni', instruction: 'Coniuga avere all’imperfetto.', segments: ['La cucina dei nonni ', ' un grande camino.'], entries: [['avere', 'aveva']] },
  { title: 'Prima degli smartphone', instruction: 'Coniuga scrivere all’imperfetto.', segments: ['Da adolescente tu mi ', ' lunghe lettere.'], entries: [['scrivere', 'scrivevi']] },
  { title: 'Il negozio del quartiere', instruction: 'Coniuga chiudere all’imperfetto.', segments: ['A quei tempi i negozi ', ' tutti a mezzogiorno.'], entries: [['chiudere', 'chiudevano']] },
  { title: 'Il primo lavoro', instruction: 'Coniuga prendere all’imperfetto.', segments: ['Ogni giorno io ', ' due autobus per arrivare in fabbrica.'], entries: [['prendere', 'prendevo']] },
  { title: 'La sala d’attesa', instruction: 'Coniuga sembrare all’imperfetto.', segments: ['Quel pomeriggio tutti ', ' molto preoccupati.'], entries: [['sembrare', 'sembravano']] },
  { title: 'Le domeniche in famiglia', instruction: 'Coniuga riunirsi all’imperfetto.', segments: ['La domenica voi ', ' sempre a casa di zia Clara.'], entries: [['riunirsi', 'vi riunivate']] },
]

const long: EditorialGapSeed[] = [
  { title: 'L’estate nel paese', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Ogni estate noi ', ' dai nonni. La mattina il nonno ', ' nell’orto e noi bambini ', ' vicino al fiume.'], entries: [['restare', 'restavamo'], ['lavorare', 'lavorava'], ['giocare', 'giocavamo']] },
  { title: 'La biblioteca di una volta', instruction: 'Completa la descrizione all’imperfetto.', segments: ['La biblioteca ', ' solo due stanze. La signora Bianchi ', ' ogni lettore per nome e spesso ci ', ' un libro adatto.'], entries: [['avere', 'aveva'], ['conoscere', 'conosceva'], ['consigliare', 'consigliava']] },
  { title: 'I venerdì al mercato', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Il venerdì mia madre ', ' presto. Al mercato ', ' la frutta dai produttori e poi ', ' il pane caldo.'], entries: [['uscire', 'usciva'], ['scegliere', 'sceglieva'], ['comprare', 'comprava']] },
  { title: 'La scuola elementare', instruction: 'Completa il ricordo all’imperfetto.', segments: ['La maestra ', ' vicino alla finestra. Noi ', ' su quaderni blu e durante la pausa ', ' in cortile.'], entries: [['sedere', 'sedeva'], ['scrivere', 'scrivevamo'], ['correre', 'correvamo']] },
  { title: 'Un quartiere tranquillo', instruction: 'Completa la descrizione all’imperfetto.', segments: ['La strada ', ' poco trafficata. I vicini si ', ' davanti ai portoni e i bambini ', ' senza paura.'], entries: [['essere', 'era'], ['fermare', 'fermavano'], ['andare', 'andavano']] },
  { title: 'Il laboratorio fotografico', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Prima del digitale io ', ' i rullini in una stanza buia. Le immagini ', ' lentamente e ogni stampa ', ' un odore particolare.'], entries: [['sviluppare', 'sviluppavo'], ['apparire', 'apparivano'], ['avere', 'aveva']] },
  { title: 'Le prove del coro', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Ogni mercoledì il coro si ', ' nella sala comunale. La direttrice ', ' il ritmo e noi ', ' lo stesso passaggio molte volte.'], entries: [['riunirsi', 'riuniva'], ['segnare', 'segnava'], ['ripetere', 'ripetevamo']] },
  { title: 'Il turno di notte', instruction: 'Completa la descrizione all’imperfetto.', segments: ['Di notte l’ospedale ', ' più silenzioso. Gli infermieri ', ' i corridoi e una luce azzurra ', ' sopra ogni porta.'], entries: [['sembrare', 'sembrava'], ['controllare', 'controllavano'], ['rimanere', 'rimaneva']] },
  { title: 'Prima del ponte', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Prima del ponte il traghetto ', ' le due rive. Gli abitanti lo ', ' ogni giorno e il viaggio ', ' quasi mezz’ora.'], entries: [['collegare', 'collegava'], ['usare', 'usavano'], ['durare', 'durava']] },
  { title: 'Le serate senza televisione', instruction: 'Completa il ricordo all’imperfetto.', segments: ['Dopo cena il nonno ', ' una storia. Noi lo ', ' in silenzio e mia sorella spesso ', ' i personaggi.'], entries: [['raccontare', 'raccontava'], ['ascoltare', 'ascoltavamo'], ['disegnare', 'disegnava']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La casa in collina', pieces: [['La casa ', 'avevano'], [' un tetto rosso, il giardino ', 'scendeva'], [' verso il fiume e due cipressi ', 'segnavano']], after: ' l’ingresso.', wrong: 0, answer: 'aveva', reason: 'la casa es singular y exige aveva' },
  { title: 'Le mattine di scuola', pieces: [['Io ', 'mi svegliavo'], [' alle sette, tu ', 'preparava'], [' la colazione e insieme ', 'uscivamo']], after: ' poco prima delle otto.', wrong: 1, answer: 'preparavi', reason: 'el sujeto tu exige preparavi' },
  { title: 'Il vecchio cinema', pieces: [['Il cinema ', 'apriva'], [' solo nel fine settimana, i biglietti ', 'costavano'], [' poco e la sala ', 'avevano']], after: ' duecento posti.', wrong: 2, answer: 'aveva', reason: 'la sala es singular y exige aveva' },
  { title: 'L’orto dello zio', pieces: [['Ogni primavera lo zio ', 'piantavano'], [' i pomodori, noi li ', 'innaffiavamo'], [' e la zia ', 'raccoglieva']], after: ' le erbe aromatiche.', wrong: 0, answer: 'piantava', reason: 'lo zio es singular y exige piantava' },
  { title: 'Le lezioni di musica', pieces: [['Il maestro ', 'suonava'], [' una frase e voi la ', 'ripetevano'], [' finché il ritmo ', 'diventava']], after: ' regolare.', wrong: 1, answer: 'ripetevate', reason: 'el sujeto voi exige ripetevate' },
  { title: 'Il viaggio in autobus', pieces: [['I passeggeri ', 'salivano'], [' in centro, il conducente ', 'aspettava'], [' tutti e noi ', 'sedevano']], after: ' sempre in fondo.', wrong: 2, answer: 'sedevamo', reason: 'el sujeto noi exige sedevamo' },
  { title: 'La piazza d’inverno', pieces: [['D’inverno la fontana ', 'rimanevano'], [' spenta, pochi turisti ', 'attraversavano'], [' la piazza e il bar ', 'chiudeva']], after: ' presto.', wrong: 0, answer: 'rimaneva', reason: 'la fontana es singular y exige rimaneva' },
  { title: 'Il pranzo della domenica', pieces: [['Mia nonna ', 'preparava'], [' la pasta, io ', 'apparecchiavi'], [' e i miei cugini ', 'portavano']], after: ' le sedie in giardino.', wrong: 1, answer: 'apparecchiavo', reason: 'el sujeto io exige apparecchiavo' },
  { title: 'Il primo ufficio', pieces: [['L’ufficio ', 'occupava'], [' il secondo piano, le finestre ', 'guardavano'], [' sul porto e noi ', 'lavoravate']], after: ' in una sola stanza.', wrong: 2, answer: 'lavoravamo', reason: 'el sujeto noi exige lavoravamo' },
  { title: 'Le giornate al mare', pieces: [['Da piccoli voi ', 'costruivamo'], [' castelli, vostra madre ', 'leggeva'], [' sotto l’ombrellone e vostro padre ', 'nuotava']], after: ' fino alle boe.', wrong: 0, answer: 'costruivate', reason: 'el sujeto voi exige costruivate' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Ogni mattina aprivo le finestre', 'preparavo il caffè', 'leggevo il giornale'], target: 0 },
  { events: ['Marta prendeva il registro', 'chiamava gli studenti', 'spiegava la lezione'], target: 1 },
  { events: ['Noi sceglievamo il sentiero', 'riempivamo le borracce', 'partivamo all’alba'], target: 2 },
  { events: ['Il fornaio accendeva il forno', 'impastava il pane', 'apriva il negozio'], target: 0 },
  { events: ['Voi raccoglievate i dati', 'li ordinavate', 'scrivevate il rapporto'], target: 1 },
  { events: ['Il custode controllava le sale', 'spegneva le luci', 'chiudeva il portone'], target: 2 },
  { events: ['Io sceglievo una fotografia', 'la sviluppavo', 'la lasciavo asciugare'], target: 0 },
  { events: ['I bambini prendevano i colori', 'disegnavano la scena', 'mostravano il foglio alla maestra'], target: 1 },
  { events: ['La squadra si riscaldava', 'provava gli schemi', 'entrava in campo'], target: 2 },
  { events: ['Mio padre controllava la mappa', 'caricava le valigie', 'metteva in moto'], target: 0 },
]

export const ITALIAN_IMPERFETTO_EDITORIAL = createItalianEditorialPack({
  slug: 'imperfect',
  tense: 'imperfetto',
  focus: 'Imperfetto',
  rule: 'El imperfetto construye hábitos, estados y descripciones que forman el marco del pasado.',
  micro,
  long,
  errors,
  sequences,
})
