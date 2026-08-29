import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Il preventivo', instruction: 'Coniuga inviare al futuro semplice.', segments: ['Domani mattina io ti ', ' il preventivo definitivo.'], entries: [['inviare', 'invierò']] },
  { title: 'La nuova sede', instruction: 'Coniuga aprire al futuro semplice.', segments: ['A settembre l’azienda ', ' una sede a Bari.'], entries: [['aprire', 'aprirà']] },
  { title: 'Una promessa', instruction: 'Coniuga restituire al futuro semplice.', segments: ['Non preoccuparti: noi ti ', ' i libri lunedì.'], entries: [['restituire', 'restituiremo']] },
  { title: 'Il risultato', instruction: 'Coniuga sapere al futuro semplice.', segments: ['Tra pochi giorni voi ', ' il risultato dell’esame.'], entries: [['sapere', 'saprete']] },
  { title: 'La serata', instruction: 'Coniuga venire al futuro semplice.', segments: ['Stasera Marta e Giulia ', ' direttamente dopo il lavoro.'], entries: [['venire', 'verranno']] },
  { title: 'La previsione', instruction: 'Coniuga diminuire al futuro semplice.', segments: ['Secondo gli esperti, domani il vento ', '.'], entries: [['diminuire', 'diminuirà']] },
  { title: 'Il nuovo collega', instruction: 'Coniuga sedersi al futuro semplice.', segments: ['Da lunedì Paolo si ', ' accanto a te.'], entries: [['sedersi', 'siederà']] },
  { title: 'La decisione', instruction: 'Coniuga scegliere al futuro semplice.', segments: ['Dopo la visita tu ', ' quale appartamento affittare.'], entries: [['scegliere', 'sceglierai']] },
  { title: 'Il viaggio', instruction: 'Coniuga rimanere al futuro semplice.', segments: ['Durante il viaggio loro ', ' due notti a Lecce.'], entries: [['rimanere', 'rimarranno']] },
  { title: 'Il prossimo incontro', instruction: 'Coniuga discutere al futuro semplice.', segments: ['Nella prossima riunione noi ', ' anche il budget.'], entries: [['discutere', 'discuteremo']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Il primo giorno del corso', instruction: 'Completa il programma al futuro semplice.', segments: ['Lunedì gli studenti ', ' il docente, poi ', ' un test breve e alla fine ', ' il calendario delle lezioni.'], entries: [['conoscere', 'conosceranno'], ['fare', 'faranno'], ['ricevere', 'riceveranno']] },
  { title: 'Il trasloco di sabato', instruction: 'Completa il piano al futuro semplice.', segments: ['Sabato noi ', ' il furgone alle otto. Luca ', ' i mobili grandi e io ', ' le scatole in cucina.'], entries: [['ritirare', 'ritireremo'], ['smontare', 'smonterà'], ['sistemare', 'sistemerò']] },
  { title: 'La visita a Torino', instruction: 'Completa l’itinerario al futuro semplice.', segments: ['Al mattino voi ', ' il museo egizio, a pranzo ', ' in centro e nel pomeriggio ', ' lungo il Po.'], entries: [['visitare', 'visiterete'], ['mangiare', 'mangerete'], ['passeggiare', 'passeggerete']] },
  { title: 'Il progetto del quartiere', instruction: 'Completa le previsioni al futuro semplice.', segments: ['Il comune ', ' la vecchia piazza, ', ' nuovi alberi e ', ' una pista ciclabile.'], entries: [['rinnovare', 'rinnoverà'], ['piantare', 'pianterà'], ['costruire', 'costruirà']] },
  { title: 'La consegna urgente', instruction: 'Completa gli impegni al futuro semplice.', segments: ['Io ', ' il testo entro mezzogiorno, Marta lo ', ' nel pomeriggio e voi lo ', ' al cliente prima delle sei.'], entries: [['finire', 'finirò'], ['correggere', 'correggerà'], ['spedire', 'spedirete']] },
  { title: 'Il temporale di domani', instruction: 'Completa la previsione al futuro semplice.', segments: ['Nel pomeriggio il cielo si ', ', il vento ', ' da nord e probabilmente ', ' fino a sera.'], entries: [['coprirsi', 'coprirà'], ['soffiare', 'soffierà'], ['piovere', 'pioverà']] },
  { title: 'La cena di compleanno', instruction: 'Completa il piano al futuro semplice.', segments: ['Giulia ', ' gli invitati, noi ', ' la sala e Paolo ', ' la torta.'], entries: [['avvisare', 'avviserà'], ['decorare', 'decoreremo'], ['preparare', 'preparerà']] },
  { title: 'La manutenzione del server', instruction: 'Completa il piano al futuro semplice.', segments: ['Alle ventidue il tecnico ', ' il sistema, ', ' il componente difettoso e poi lo ', '.'], entries: [['spegnere', 'spegnerà'], ['sostituire', 'sostituirà'], ['riavviare', 'riavvierà']] },
  { title: 'Il concorso', instruction: 'Completa le tappe al futuro semplice.', segments: ['Prima i candidati ', ' un test scritto, poi la commissione li ', ' e infine ', ' i risultati online.'], entries: [['sostenere', 'sosterranno'], ['intervistare', 'intervisterà'], ['pubblicare', 'pubblicherà']] },
  { title: 'Le vacanze in montagna', instruction: 'Completa il programma al futuro semplice.', segments: ['Durante la settimana noi ', ' due sentieri, ', ' un rifugio storico e ci ', ' un giorno alle terme.'], entries: [['percorrere', 'percorreremo'], ['visitare', 'visiteremo'], ['riposare', 'riposeremo']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La riunione di domani', pieces: [['Domani io ', 'presenterò'], [' i dati, Marta ', 'spiegherà'], [' il grafico e voi ', 'risponderanno']], after: ' alle domande.', wrong: 2, answer: 'risponderete', reason: 'el sujeto voi exige risponderete' },
  { title: 'Il viaggio a Firenze', pieces: [['Sabato noi ', 'partirete'], [' alle sette, ', 'prenderemo'], [' il treno veloce e Luca ', 'arriverà']], after: ' da Bologna.', wrong: 0, answer: 'partiremo', reason: 'el sujeto noi exige partiremo' },
  { title: 'Il nuovo laboratorio', pieces: [['L’azienda ', 'acquisterà'], [' le macchine, i tecnici le ', 'installerà'], [' e il direttore ', 'inaugurerà']], after: ' la sede a maggio.', wrong: 1, answer: 'installeranno', reason: 'i tecnici exige installeranno' },
  { title: 'La festa del paese', pieces: [['I volontari ', 'monteranno'], [' il palco, il comune ', 'pagherà'], [' le luci e la banda ', 'suoneranno']], after: ' in piazza.', wrong: 2, answer: 'suonerà', reason: 'la banda es singular y exige suonerà' },
  { title: 'La risposta al cliente', pieces: [['Tra poco tu ', 'leggerete'], [' il reclamo, io ', 'controllerò'], [' l’ordine e insieme ', 'troveremo']], after: ' una soluzione.', wrong: 0, answer: 'leggerai', reason: 'el sujeto tu exige leggerai' },
  { title: 'Il restauro', pieces: [['Gli esperti ', 'esamineranno'], [' il dipinto, il laboratorio lo ', 'puliranno'], [' e il museo lo ', 'esporrà']], after: ' in autunno.', wrong: 1, answer: 'pulirà', reason: 'il laboratorio es singular y exige pulirà' },
  { title: 'La giornata sportiva', pieces: [['Al mattino voi ', 'giocherete'], [' a pallavolo, poi ', 'correrete'], [' nel parco e la sera vi ', 'riposerà']], after: ' in albergo.', wrong: 2, answer: 'riposerete', reason: 'el sujeto voi exige vi riposerete' },
  { title: 'L’arrivo degli ospiti', pieces: [['Gli ospiti ', 'arriverà'], [' alle otto, noi li ', 'accoglieremo'], [' e Marta ', 'mostrerà']], after: ' le camere.', wrong: 0, answer: 'arriveranno', reason: 'gli ospiti exige arriveranno' },
  { title: 'Il corso online', pieces: [['Io ', 'registrerò'], [' i video, voi li ', 'caricherà'], [' sulla piattaforma e gli studenti li ', 'vedranno']], after: ' da lunedì.', wrong: 1, answer: 'caricherete', reason: 'el sujeto voi exige caricherete' },
  { title: 'La nuova linea', pieces: [['Il treno ', 'partirà'], [' ogni ora, ', 'fermerà'], [' in sei stazioni e i passeggeri ', 'cambierà']], after: ' a Pisa.', wrong: 2, answer: 'cambieranno', reason: 'i passeggeri exige cambieranno' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Domani aprirò il documento', 'controllerò i dati', 'invierò il rapporto'], target: 0 },
  { events: ['Marta sceglierà la ricetta', 'comprerà gli ingredienti', 'preparerà la cena'], target: 1 },
  { events: ['Noi ritireremo le chiavi', 'porteremo i mobili', 'dormiremo nella nuova casa'], target: 2 },
  { events: ['Il tecnico spegnerà il server', 'sostituirà il disco', 'riavvierà il sistema'], target: 0 },
  { events: ['Voi leggerete il regolamento', 'compilerete il modulo', 'consegnerete la domanda'], target: 1 },
  { events: ['La guida accoglierà il gruppo', 'mostrerà la collezione', 'accompagnerà tutti all’uscita'], target: 2 },
  { events: ['Io controllerò l’indirizzo', 'prenderò la metropolitana', 'raggiungerò lo studio'], target: 0 },
  { events: ['Gli studenti raccoglieranno le fonti', 'scriveranno la relazione', 'presenteranno i risultati'], target: 1 },
  { events: ['Paolo monterà lo scaffale', 'ordinerà i libri', 'pulirà la stanza'], target: 2 },
  { events: ['La squadra farà riscaldamento', 'proverà gli schemi', 'entrerà in campo'], target: 0 },
]

export const ITALIAN_FUTURO_SEMPLICE_EDITORIAL = createItalianEditorialPack({
  slug: 'simple-future',
  tense: 'futuro-semplice',
  focus: 'Futuro semplice',
  rule: 'El futuro semplice proyecta planes, promesas y predicciones posteriores al momento de habla.',
  micro,
  long,
  errors,
  sequences,
})
