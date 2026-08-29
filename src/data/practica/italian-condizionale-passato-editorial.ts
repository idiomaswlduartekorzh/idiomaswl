import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Il numero mancante', instruction: 'Coniuga telefonare al condizionale passato.', segments: ['Ti ', ', ma non avevo il tuo numero.'], entries: [['telefonare', 'avrei telefonato']] },
  { title: 'La gita annullata', instruction: 'Coniuga partire al condizionale passato.', segments: ['Senza il temporale noi ', ' all’alba.'], entries: [['partire', 'saremmo partiti']] },
  { title: 'La promessa di Anna', instruction: 'Coniuga arrivare al condizionale passato.', segments: ['Anna disse che ', ' prima delle nove.'], entries: [['arrivare', 'sarebbe arrivata']] },
  { title: 'Un’occasione persa', instruction: 'Coniuga accettare al condizionale passato.', segments: ['Con condizioni migliori voi ', ' la proposta.'], entries: [['accettare', 'avreste accettato']] },
  { title: 'Il treno previsto', instruction: 'Coniuga partire al condizionale passato.', segments: ['Credevamo che il treno ', ' dal binario cinque.'], entries: [['partire', 'sarebbe partito']] },
  { title: 'Il consiglio ignorato', instruction: 'Coniuga dovere al condizionale passato.', segments: ['Tu ', ' controllare la data prima di pagare.'], entries: [['dovere', 'avresti dovuto']] },
  { title: 'La cena mancata', instruction: 'Coniuga rimanere al condizionale passato.', segments: ['Loro ', ' volentieri, ma era già tardi.'], entries: [['rimanere', 'sarebbero rimasti']] },
  { title: 'La soluzione possibile', instruction: 'Coniuga risolvere al condizionale passato.', segments: ['Con il manuale io ', ' il problema da solo.'], entries: [['risolvere', 'avrei risolto']] },
  { title: 'La notizia non confermata', instruction: 'Coniuga fuggire al condizionale passato.', segments: ['Secondo le prime notizie, il sospetto ', ' all’estero.'], entries: [['fuggire', 'sarebbe fuggito']] },
  { title: 'Il messaggio promesso', instruction: 'Coniuga scrivere al condizionale passato.', segments: ['Marta ci assicurò che ci ', ' quella sera.'], entries: [['scrivere', 'avrebbe scritto']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Il viaggio fermato dalla neve', instruction: 'Completa le conseguenze non realizzate.', segments: ['Senza la neve noi ', ' in montagna, Luca ', ' l’auto e voi ', ' il rifugio prima di sera.'], entries: [['andare', 'saremmo andati'], ['guidare', 'avrebbe guidato'], ['raggiungere', 'avreste raggiunto']] },
  { title: 'La consegna impossibile', instruction: 'Completa le intenzioni passate.', segments: ['Io ', ' il rapporto, Marta lo ', ' e il direttore lo ', ', ma il server rimase bloccato.'], entries: [['finire', 'avrei finito'], ['correggere', 'avrebbe corretto'], ['ricevere', 'avrebbe ricevuto']] },
  { title: 'Le promesse dell’organizzatore', instruction: 'Completa il futuro visto dal passato.', segments: ['L’organizzatore disse che gli ospiti ', ' alle otto, che la banda ', ' in piazza e che i volontari ', ' la cena.'], entries: [['arrivare', 'sarebbero arrivati'], ['suonare', 'avrebbe suonato'], ['servire', 'avrebbero servito']] },
  { title: 'Un acquisto evitato', instruction: 'Completa le valutazioni retrospettive.', segments: ['Al tuo posto io non ', ' quel computer, ', ' un modello più leggero e ', ' prima la garanzia.'], entries: [['comprare', 'avrei comprato'], ['scegliere', 'avrei scelto'], ['controllare', 'avrei controllato']] },
  { title: 'La partita sotto la pioggia', instruction: 'Completa le ipotesi non realizzate.', segments: ['Senza la pioggia la squadra ', ' meglio, gli attaccanti ', ' più occasioni e il pubblico ', ' fino alla fine.'], entries: [['giocare', 'avrebbe giocato'], ['creare', 'avrebbero creato'], ['rimanere', 'sarebbe rimasto']] },
  { title: 'Il piano annunciato', instruction: 'Completa il futuro visto dal passato.', segments: ['La direttrice spiegò che noi ', ' i dati, voi ', ' il rapporto e lei lo ', ' al consiglio.'], entries: [['raccogliere', 'avremmo raccolto'], ['scrivere', 'avreste scritto'], ['presentare', 'avrebbe presentato']] },
  { title: 'La cena saltata', instruction: 'Completa i desideri passati impediti.', segments: ['Con più tempo Paolo ', ' il pane, io ', ' la pasta e gli amici ', ' il dolce.'], entries: [['preparare', 'avrebbe preparato'], ['cucinare', 'avrei cucinato'], ['portare', 'avrebbero portato']] },
  { title: 'Il progetto senza fondi', instruction: 'Completa le conseguenze non realizzate.', segments: ['Con il finanziamento il comune ', ' la piazza, le imprese ', ' nuovi alberi e noi ', ' una pista ciclabile.'], entries: [['rinnovare', 'avrebbe rinnovato'], ['piantare', 'avrebbero piantato'], ['progettare', 'avremmo progettato']] },
  { title: 'La previsione del tecnico', instruction: 'Completa il futuro visto dal passato.', segments: ['Il tecnico disse che il sistema si ', ', che i dati non si ', ' e che gli utenti ', ' normalmente.'], entries: [['bloccarsi', 'sarebbe bloccato'], ['perdersi', 'sarebbero persi'], ['collegarsi', 'si sarebbero collegati']] },
  { title: 'La visita rimandata', instruction: 'Completa le intenzioni passate.', segments: ['Noi ', ' il museo, ', ' la guida e ', ' il catalogo, ma lo sciopero chiuse la struttura.'], entries: [['visitare', 'avremmo visitato'], ['seguire', 'avremmo seguito'], ['comprare', 'avremmo comprato']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La gita mancata', pieces: [['Senza la pioggia noi ', 'saremmo partiti'], [' presto, Luca ', 'avrebbe guidato'], [' e voi ', 'avrebbe portato']], after: ' il pranzo.', wrong: 2, answer: 'avreste portato', reason: 'el sujeto voi exige avreste portato' },
  { title: 'Il documento perduto', pieces: [['Io ', 'avrebbe salvato'], [' il file, Marta lo ', 'avrebbe corretto'], [' e noi lo ', 'avremmo inviato']], after: ', ma il computer si spense.', wrong: 0, answer: 'avrei salvato', reason: 'el sujeto io exige avrei salvato' },
  { title: 'La promessa del corriere', pieces: [['Il corriere disse che ', 'sarebbe arrivato'], [' alle cinque, che i pacchi ', 'sarebbe partiti'], [' al mattino e che noi li ', 'avremmo ricevuti']], after: ' in giornata.', wrong: 1, answer: 'sarebbero partiti', reason: 'i pacchi exige sarebbero partiti' },
  { title: 'Il consiglio', pieces: [['Al tuo posto io non ', 'avrei accettato'], [' l’offerta, ', 'avrei chiesto'], [' più tempo e ', 'avresti letto']], after: ' ogni clausola.', wrong: 2, answer: 'avrei letto', reason: 'las tres valoraciones tienen como sujeto io' },
  { title: 'La partita', pieces: [['Con un campo asciutto i giocatori ', 'avrebbe corso'], [' meglio, l’arbitro ', 'avrebbe interrotto'], [' meno volte e il pubblico ', 'sarebbe rimasto']], after: ' fino alla fine.', wrong: 0, answer: 'avrebbero corso', reason: 'i giocatori exige avrebbero corso' },
  { title: 'Il piano di Marta', pieces: [['Marta disse che ', 'avrebbe scelto'], [' il locale, che noi ', 'avrebbe invitato'], [' gli ospiti e che voi ', 'avreste portato']], after: ' la musica.', wrong: 1, answer: 'avremmo invitato', reason: 'el sujeto noi exige avremmo invitato' },
  { title: 'La cena', pieces: [['Con più tempo io ', 'avrei cotto'], [' il pane, voi ', 'avreste preparato'], [' il dolce e Paolo ', 'avrebbero aperto']], after: ' il vino.', wrong: 2, answer: 'avrebbe aperto', reason: 'Paolo es singular y exige avrebbe aperto' },
  { title: 'La nuova sede', pieces: [['Con il permesso il comune ', 'avrebbero aperto'], [' la strada, le imprese ', 'avrebbero iniziato'], [' i lavori e noi ', 'avremmo controllato']], after: ' il cantiere.', wrong: 0, answer: 'avrebbe aperto', reason: 'il comune es singular y exige avrebbe aperto' },
  { title: 'Il viaggio annunciato', pieces: [['Luca disse che ', 'sarebbe partito'], [' venerdì, che Marta ', 'sarebbero arrivata'], [' sabato e che gli amici ', 'sarebbero rimasti']], after: ' una settimana.', wrong: 1, answer: 'sarebbe arrivata', reason: 'Marta es singular y exige sarebbe arrivata' },
  { title: 'Il guasto', pieces: [['Senza il guasto noi ', 'avremmo finito'], [' il lavoro, voi ', 'avreste consegnato'], [' il rapporto e il cliente lo ', 'avrebbero letto']], after: ' quella sera.', wrong: 2, answer: 'avrebbe letto', reason: 'il cliente es singular y exige avrebbe letto' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Avrei letto la richiesta', 'avrei controllato i dati', 'avrei risposto al cliente'], target: 0 },
  { events: ['Marta avrebbe scelto la ricetta', 'avrebbe comprato gli ingredienti', 'avrebbe preparato la cena'], target: 1 },
  { events: ['Noi avremmo ritirato le chiavi', 'avremmo portato i mobili', 'ci saremmo sistemati nella casa'], target: 2 },
  { events: ['Il tecnico avrebbe spento il server', 'avrebbe sostituito il disco', 'avrebbe riavviato il sistema'], target: 0 },
  { events: ['Voi avreste letto il regolamento', 'avreste compilato il modulo', 'avreste consegnato la domanda'], target: 1 },
  { events: ['La guida avrebbe accolto il gruppo', 'avrebbe mostrato la collezione', 'avrebbe accompagnato tutti all’uscita'], target: 2 },
  { events: ['Io avrei controllato l’indirizzo', 'avrei preso la metropolitana', 'sarei arrivato allo studio'], target: 0 },
  { events: ['Gli studenti avrebbero raccolto le fonti', 'avrebbero scritto la relazione', 'avrebbero presentato i risultati'], target: 1 },
  { events: ['Paolo avrebbe montato lo scaffale', 'avrebbe ordinato i libri', 'avrebbe pulito la stanza'], target: 2 },
  { events: ['La squadra avrebbe fatto riscaldamento', 'avrebbe provato gli schemi', 'sarebbe entrata in campo'], target: 0 },
]

export const ITALIAN_CONDIZIONALE_PASSATO_EDITORIAL = createItalianEditorialPack({
  slug: 'past-conditional',
  tense: 'condizionale-passato',
  focus: 'Condizionale passato',
  rule: 'El condizionale passato expresa consecuencias no realizadas, intenciones frustradas o futuro visto desde un punto pasado.',
  micro,
  long,
  errors,
  sequences,
})
