import type { ErrorChallenge, GapChallenge, TimelineChallenge } from './tense-quest-types.ts'
import type { TenseId } from './italian-tense-quest.ts'

const tense: TenseId = 'passato-prossimo'
const focus = 'Passato prossimo'
const rule = 'El passato prossimo presenta hechos concluidos vinculados con el marco actual.'

function gap(
  id: string,
  title: string,
  instruction: string,
  segments: string[],
  entries: Array<[verb: string, answer: string]>,
): GapChallenge<TenseId> {
  return {
    id,
    title,
    focus,
    instruction,
    segments,
    gaps: entries.map(([verb, answer], index) => ({ id: `${id}-gap-${index + 1}`, tense, verb, answers: [answer] })),
    explanation: `${rule} El relato aporta sujeto, secuencia y resultado suficientes para producir cada forma sin adivinar palabras extra.`,
  }
}

export const PASSATO_PROSSIMO_MICRO: GapChallenge<TenseId>[] = [
  gap('it-pp-micro-editorial-1', 'Una consegna', 'Conjuga spedire en passato prossimo.', ['Oggi Chiara ', ' il pacco prima di pranzo.'], [['spedire', 'ha spedito']]),
  gap('it-pp-micro-editorial-2', 'La porta del laboratorio', 'Conjuga chiudere en passato prossimo.', ['Poco fa noi ', ' tutte le finestre del laboratorio.'], [['chiudere', 'abbiamo chiuso']]),
  gap('it-pp-micro-editorial-3', 'Una buona notizia', 'Conjuga ricevere en passato prossimo.', ['In questi giorni loro ', ' una risposta positiva.'], [['ricevere', 'hanno ricevuto']]),
  gap('it-pp-micro-editorial-4', 'Il nuovo indirizzo', 'Conjuga trasferirsi en passato prossimo.', ['Da gennaio Elisa ', ' in un appartamento più vicino.'], [['trasferirsi', 'si è trasferita']]),
  gap('it-pp-micro-editorial-5', 'La relazione', 'Conjuga finire en passato prossimo.', ['Paolo ', ' la relazione poco fa.'], [['finire', 'ha finito']]),
  gap('it-pp-micro-editorial-6', 'Il computer', 'Conjuga spegnere en passato prossimo.', ['Il computer non risponde perché io ', ' il sistema per errore.'], [['spegnere', 'ho spento']]),
  gap('it-pp-micro-editorial-7', 'La prima neve', 'Conjuga cadere en passato prossimo.', ['Stanotte ', ' la prima neve dell’anno.'], [['cadere', 'è caduta']]),
  gap('it-pp-micro-editorial-8', 'Gli appunti', 'Conjuga condividere en passato prossimo.', ['Per la lezione di oggi tu ', ' gli appunti con tutti.'], [['condividere', 'hai condiviso']]),
  gap('it-pp-micro-editorial-9', 'Il volo', 'Conjuga decollare en passato prossimo.', ['Il volo per Bari ', ' con venti minuti di ritardo.'], [['decollare', 'è decollato']]),
  gap('it-pp-micro-editorial-10', 'La decisione', 'Conjuga scegliere en passato prossimo.', ['Alla fine Marta e Paolo ', ' il corso serale.'], [['scegliere', 'hanno scelto']]),
]

export const PASSATO_PROSSIMO_LONG: GapChallenge<TenseId>[] = [
  gap('it-pp-long-editorial-1', 'Il fine settimana a Bologna', 'Completa il racconto con il passato prossimo.', ['Sabato noi ', ' presto da Firenze. Alla stazione ', ' subito il binario giusto e il viaggio ', ' senza ritardi.'], [['partire', 'siamo partiti'], ['trovare', 'abbiamo trovato'], ['cominciare', 'è cominciato']]),
  gap('it-pp-long-editorial-2', 'Le chiavi del nuovo appartamento', 'Completa il racconto con il passato prossimo.', ['Ieri io ', ' il contratto. Poi io e Luca ', ' le chiavi in agenzia e la sera i primi mobili ', ' a casa.'], [['firmare', 'ho firmato'], ['ritirare', 'abbiamo ritirato'], ['arrivare', 'sono arrivati']]),
  gap('it-pp-long-editorial-3', 'Una cena improvvisata', 'Completa il racconto con il passato prossimo.', ['Nel pomeriggio Sara ', ' gli ingredienti al mercato. A casa ', ' una pasta semplice e tutti ', ' insieme sul balcone.'], [['comprare', 'ha comprato'], ['preparare', 'ha preparato'], ['cenare', 'hanno cenato']]),
  gap('it-pp-long-editorial-4', 'La riunione del progetto', 'Completa il racconto con il passato prossimo.', ['Alle nove io ', ' il proiettore. Durante la riunione noi ', ' due proposte e alla fine la direttrice ', ' la seconda.'], [['accendere', 'ho acceso'], ['discutere', 'abbiamo discusso'], ['approvare', 'ha approvato']]),
  gap('it-pp-long-editorial-5', 'La visita guidata', 'Completa il racconto con il passato prossimo.', ['Alle undici noi ', ' nel museo. Poi ', ' la guida nella sala romana e prima di uscire ', ' alcune fotografie.'], [['entrare', 'siamo entrati'], ['seguire', 'abbiamo seguito'], ['scattare', 'abbiamo scattato']]),
  gap('it-pp-long-editorial-6', 'Il cane del vicino', 'Completa il racconto con il passato prossimo.', ['Stamattina il cane ', ' dal giardino. I vicini lo ', ' per tutto il quartiere e alla fine ', ' l’animale vicino al parco.'], [['scappare', 'è scappato'], ['cercare', 'hanno cercato'], ['trovare', 'hanno trovato']]),
  gap('it-pp-long-editorial-7', 'Un pomeriggio in biblioteca', 'Completa il racconto con il passato prossimo.', ['Dopo pranzo Elena ', ' in biblioteca. Lì ', ' due capitoli della tesi e prima di tornare a casa ', ' i libri necessari.'], [['andare', 'è andata'], ['scrivere', 'ha scritto'], ['prendere', 'ha preso']]),
  gap('it-pp-long-editorial-8', 'La festa a sorpresa', 'Completa il racconto con il passato prossimo.', ['Nel pomeriggio gli amici ', ' la sala. Giulia ', ' alle otto senza sospettare nulla e poi ', ' tutti i regali.'], [['decorare', 'hanno decorato'], ['arrivare', 'è arrivata'], ['aprire', 'ha aperto']]),
  gap('it-pp-long-editorial-9', 'Il problema tecnico', 'Completa il racconto con il passato prossimo.', ['Durante la videochiamata il computer ', '. Io ', ' il sistema e dopo pochi minuti tutto ', ' di nuovo.'], [['bloccarsi', 'si è bloccato'], ['riavviare', 'ho riavviato'], ['funzionare', 'ha funzionato']]),
  gap('it-pp-long-editorial-10', 'La lezione di oggi', 'Completa il racconto con il passato prossimo.', ['In classe noi ', ' un articolo breve. Poi voi ', ' tre domande e alla fine io ', ' le risposte alla lavagna.'], [['leggere', 'abbiamo letto'], ['fare', 'avete fatto'], ['correggere', 'ho corretto']]),
]

type ErrorSeed = {
  id: string
  title: string
  pieces: Array<[before: string, shown: string]>
  after: string
  wrong: number
  answer: string
  reason: string
}

const errorSeeds: ErrorSeed[] = [
  { id: '1', title: 'Il treno per Torino', pieces: [['Sabato Marta ', 'ha prenduto'], [' il treno delle sette, ', 'è arrivata'], [' a Torino prima delle dieci e lì ', 'ha incontrato']], after: ' sua sorella.', wrong: 0, answer: 'ha preso', reason: 'el participio irregular de prendere es preso' },
  { id: '2', title: 'La mostra', pieces: [['Questa settimana noi ', 'abbiamo visitato'], [' la nuova mostra, ', 'abbiamo veduto'], [' tutte le sale e alla fine ', 'abbiamo comprato']], after: ' il catalogo.', wrong: 1, answer: 'abbiamo visto', reason: 'el participio esperado de vedere es visto' },
  { id: '3', title: 'Una mattina complicata', pieces: [['Oggi io ', 'ho perso'], [' le chiavi, poi ', 'ho chiamato'], [' Luca e insieme ', 'abbiamo controllati']], after: ' tutta la casa.', wrong: 2, answer: 'abbiamo controllato', reason: 'con avere el participio no concuerda aquí con el sujeto plural' },
  { id: '4', title: 'Il messaggio', pieces: [['Poco fa Chiara ', 'ha scrivuto'], [' un messaggio, lo ', 'ha inviato'], [' al gruppo e tutti ', 'hanno risposto']], after: ' subito.', wrong: 0, answer: 'ha scritto', reason: 'el participio irregular de scrivere es scritto' },
  { id: '5', title: 'La partita', pieces: [['I ragazzi ', 'hanno giocato'], [' fino alle sei, poi ', 'sono tornato'], [' a casa e ', 'hanno bevuto']], after: ' qualcosa di fresco.', wrong: 1, answer: 'sono tornati', reason: 'el sujeto masculino plural exige tornati' },
  { id: '6', title: 'La prenotazione', pieces: [['Ieri voi ', 'avete scelto'], [' l’albergo, ', 'avete prenotato'], [' due camere e poi ', 'avete ricevesto']], after: ' la conferma.', wrong: 2, answer: 'avete ricevuto', reason: 'el participio de ricevere es ricevuto' },
  { id: '7', title: 'Il temporale', pieces: [['Nel pomeriggio ', 'è cominciato'], [' un temporale, molte persone ', 'sono entrate'], [' nel bar e il proprietario ', 'ha chiuduto']], after: ' le finestre.', wrong: 2, answer: 'ha chiuso', reason: 'el participio irregular de chiudere es chiuso' },
  { id: '8', title: 'Il documento', pieces: [['Stamattina tu ', 'hai stampato'], [' il modulo, lo ', 'hai firmata'], [' e poi lo ', 'hai consegnato']], after: ' in segreteria.', wrong: 1, answer: 'hai firmato', reason: 'el participio permanece firmato en esta construcción con avere' },
  { id: '9', title: 'Le ospiti', pieces: [['Le ospiti ', 'sono arrivate'], [' alle otto, ', 'hanno lasciato'], [' i cappotti all’ingresso e poi ', 'si è sedute']], after: ' in salotto.', wrong: 2, answer: 'si sono sedute', reason: 'el sujeto plural femenino exige sono y sedute' },
  { id: '10', title: 'Il risultato', pieces: [['Il tecnico ', 'ha controllato'], [' i dati, ', 'ha scoperto'], [' l’errore e alla fine lo ', 'ha correggiuto']], after: '.', wrong: 2, answer: 'ha corretto', reason: 'el participio irregular de correggere es corretto' },
]

export const PASSATO_PROSSIMO_ERRORS: ErrorChallenge<TenseId>[] = errorSeeds.map((seed) => ({
  id: `it-pp-error-editorial-${seed.id}`,
  tense,
  title: seed.title,
  focus,
  instruction: 'Leggi il testo, seleziona l’unica forma verbale errata e riscrivila correttamente.',
  chunks: seed.pieces.map(([before, form], index) => ({ before, form, id: `it-pp-error-editorial-${seed.id}-token-${index + 1}` })),
  after: seed.after,
  wrongId: `it-pp-error-editorial-${seed.id}-token-${seed.wrong + 1}`,
  answers: [seed.answer],
  explanation: `${rule} Qui ${seed.reason}.`,
}))

const sequences: Array<[string, string, string, 'prima' | 'poi' | 'infine']> = [
  ['Luca ha comprato il biglietto', 'è salito sul treno', 'ha trovato il suo posto', 'poi'],
  ['Marta ha acceso il computer', 'ha aperto il documento', 'ha inviato il file', 'infine'],
  ['Noi abbiamo scelto la ricetta', 'abbiamo comprato gli ingredienti', 'abbiamo preparato la cena', 'prima'],
  ['Paolo ha cercato l’indirizzo', 'ha preso l’autobus', 'è arrivato allo studio', 'infine'],
  ['Le ragazze hanno montato il tavolo', 'hanno disposto i libri', 'hanno aperto la sala', 'poi'],
  ['Io ho letto l’avviso', 'ho compilato il modulo', 'l’ho consegnato in segreteria', 'prima'],
  ['Voi avete acceso le luci', 'avete provato i microfoni', 'avete iniziato lo spettacolo', 'poi'],
  ['Il medico ha visitato Anna', 'ha scritto la ricetta', 'ha spiegato la terapia', 'infine'],
  ['Gli studenti hanno raccolto i dati', 'hanno creato il grafico', 'hanno presentato i risultati', 'prima'],
  ['Sara è uscita di casa', 'ha incontrato Giulia', 'sono entrate al cinema', 'poi'],
]

export const PASSATO_PROSSIMO_TIMELINES: TimelineChallenge<TenseId>[] = sequences.map((events, index) => {
  const [first, second, third, target] = events
  const answer = target === 'prima' ? first : target === 'poi' ? second : third
  return {
    id: `it-pp-sequence-editorial-${index + 1}`,
    title: `Sequenza conclusa · ${index + 1}`,
    focus,
    context: `${first}. Poi ${second.charAt(0).toLocaleLowerCase('it')}${second.slice(1)}. Infine ${third.charAt(0).toLocaleLowerCase('it')}${third.slice(1)}.`,
    slots: [{
      id: `it-pp-sequence-editorial-${index + 1}-slot`,
      tense,
      label: target === 'prima' ? 'Quale evento apre la sequenza?' : target === 'poi' ? 'Quale evento occupa il punto intermedio?' : 'Quale evento chiude la sequenza?',
      hint: 'Usa prima, poi e infine: la forma verbale da sola non basta.',
      answer,
    }],
    options: [second, third, first],
    explanation: `La risposta è «${answer}»: la posizione si ricava dall’ordine del racconto, non eliminando altri tempi verbali.`,
  }
})
