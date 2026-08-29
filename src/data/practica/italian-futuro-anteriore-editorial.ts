import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Prima della chiamata', instruction: 'Coniuga controllare al futuro anteriore.', segments: ['Quando ti chiamerò, io ', ' tutti i dati.'], entries: [['controllare', 'avrò controllato']] },
  { title: 'Il rientro', instruction: 'Coniuga tornare al futuro anteriore.', segments: ['Entro domenica Marta ', ' dal congresso.'], entries: [['tornare', 'sarà tornata']] },
  { title: 'La lettura del contratto', instruction: 'Coniuga leggere al futuro anteriore.', segments: ['Dopo che voi ', ' il contratto, discuteremo le clausole.'], entries: [['leggere', 'avrete letto']] },
  { title: 'La consegna', instruction: 'Coniuga finire al futuro anteriore.', segments: ['Prima della riunione noi ', ' la relazione.'], entries: [['finire', 'avremo finito']] },
  { title: 'Il volo', instruction: 'Coniuga atterrare al futuro anteriore.', segments: ['A quest’ora domani il volo ', ' a Lisbona.'], entries: [['atterrare', 'sarà atterrato']] },
  { title: 'I risultati', instruction: 'Coniuga ricevere al futuro anteriore.', segments: ['Quando inizierà il colloquio, tu ', ' i risultati del test.'], entries: [['ricevere', 'avrai ricevuto']] },
  { title: 'La nuova strada', instruction: 'Coniuga completare al futuro anteriore.', segments: ['Entro la fine dell’anno il comune ', ' la nuova strada.'], entries: [['completare', 'avrà completato']] },
  { title: 'L’arrivo degli ospiti', instruction: 'Coniuga arrivare al futuro anteriore.', segments: ['Prima di cena gli ospiti ', '.'], entries: [['arrivare', 'saranno arrivati']] },
  { title: 'Il ponte', instruction: 'Coniuga superare al futuro anteriore.', segments: ['Appena noi ', ' il ponte, faremo una pausa.'], entries: [['superare', 'avremo superato']] },
  { title: 'La formazione', instruction: 'Coniuga seguire al futuro anteriore.', segments: ['Entro giugno voi ', ' tutti i moduli obbligatori.'], entries: [['seguire', 'avrete seguito']] },
]

const long: EditorialGapSeed[] = [
  { title: 'La giornata del convegno', instruction: 'Completa le anteriorità future.', segments: ['Quando arriveranno i partecipanti, noi ', ' la sala. Prima del discorso il tecnico ', ' i microfoni. Entro mezzogiorno la direttrice ', ' il nuovo progetto.'], entries: [['preparare', 'avremo preparato'], ['provare', 'avrà provato'], ['presentare', 'avrà presentato']] },
  { title: 'Il trasloco concluso', instruction: 'Completa le anteriorità future.', segments: ['Entro sabato Luca ', ' i mobili. Quando arriverà il furgone, noi ', ' tutte le scatole. Prima di sera la famiglia si ', ' nella nuova casa.'], entries: [['smontare', 'avrà smontato'], ['chiudere', 'avremo chiuso'], ['trasferire', 'sarà trasferita']] },
  { title: 'La pubblicazione', instruction: 'Completa le anteriorità future.', segments: ['Prima della revisione io ', ' la prima bozza. Quando la leggerete, Marta la ', '. Entro venerdì l’editore ', ' il testo definitivo.'], entries: [['scrivere', 'avrò scritto'], ['correggere', 'avrà corretta'], ['ricevere', 'avrà ricevuto']] },
  { title: 'Il viaggio verso Bari', instruction: 'Completa le anteriorità future.', segments: ['Quando sorgerà il sole, noi ', ' da due ore. Prima della sosta ', ' duecento chilometri. Entro pranzo ', ' a Bari.'], entries: [['partire', 'saremo partiti'], ['percorrere', 'avremo percorso'], ['arrivare', 'saremo arrivati']] },
  { title: 'L’aggiornamento del sistema', instruction: 'Completa le anteriorità future.', segments: ['Prima delle ventidue il tecnico ', ' una copia dei dati. Quando spegnerà il server, ', ' tutti gli utenti. Entro mezzanotte ', ' l’aggiornamento.'], entries: [['creare', 'avrà creato'], ['avvisare', 'avrà avvisato'], ['installare', 'avrà installato']] },
  { title: 'La gara di domenica', instruction: 'Completa le anteriorità future.', segments: ['Prima della partenza le atlete si ', '. Quando inizierà la gara, ', ' il percorso con l’allenatore. Entro mezzogiorno tutte ', ' il traguardo.'], entries: [['riscaldarsi', 'saranno riscaldate'], ['studiare', 'avranno studiato'], ['raggiungere', 'avranno raggiunto']] },
  { title: 'La cena per gli amici', instruction: 'Completa le anteriorità future.', segments: ['Quando arriveranno gli amici, Paolo ', ' il vino. Prima di sederci noi ', ' gli antipasti. Entro le nove Marta ', ' la pasta.'], entries: [['aprire', 'avrà aperto'], ['servire', 'avremo servito'], ['preparare', 'avrà preparato']] },
  { title: 'Il restauro del teatro', instruction: 'Completa le anteriorità future.', segments: ['Entro marzo gli operai ', ' il tetto. Prima delle prove i tecnici ', ' le luci. Quando il teatro riaprirà, il comune ', ' anche l’ingresso.'], entries: [['riparare', 'avranno riparato'], ['regolare', 'avranno regolato'], ['rinnovare', 'avrà rinnovato']] },
  { title: 'La ricerca universitaria', instruction: 'Completa le anteriorità future.', segments: ['Entro maggio gli studenti ', ' i dati. Quando inizierà l’analisi, noi li ', '. Prima della presentazione la docente ', ' le conclusioni.'], entries: [['raccogliere', 'avranno raccolto'], ['ordinare', 'avremo ordinati'], ['verificare', 'avrà verificato']] },
  { title: 'La settimana in montagna', instruction: 'Completa le anteriorità future.', segments: ['Prima di mercoledì noi ', ' i sentieri più facili. Quando saliremo al rifugio, ', ' l’attrezzatura. Entro domenica ', ' a valle.'], entries: [['percorrere', 'avremo percorso'], ['controllare', 'avremo controllato'], ['tornare', 'saremo tornati']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La riunione delle dieci', pieces: [['Prima delle dieci noi ', 'avrà preparato'], [' la sala. Quando arriverà il direttore, Marta ', 'avrà acceso'], [' il proiettore. Entro l’inizio voi ', 'avrete ricevuto']], after: ' l’ordine del giorno.', wrong: 0, answer: 'avremo preparato', reason: 'el sujeto noi exige avremo preparato' },
  { title: 'Il rientro dal viaggio', pieces: [['Entro venerdì Luca ', 'sarà tornato'], ['. Quando lo vedremo, noi ', 'avrà ricevuto'], [' le sue foto. Prima della cena gli amici ', 'saranno arrivati']], after: '.', wrong: 1, answer: 'avremo ricevuto', reason: 'el sujeto noi exige avremo ricevuto' },
  { title: 'Il rapporto finale', pieces: [['Prima della consegna io ', 'avrò scritto'], [' le conclusioni. Quando le leggerete, voi ', 'avrete controllato'], [' i dati. Entro sera la direttrice ', 'avranno approvato']], after: ' il documento.', wrong: 2, answer: 'avrà approvato', reason: 'la direttrice es singular y exige avrà approvato' },
  { title: 'La partenza del treno', pieces: [['Prima delle sette i passeggeri ', 'sarà saliti'], ['. Quando il treno partirà, il personale ', 'avrà chiuso'], [' le porte. Entro le otto noi ', 'avremo superato']], after: ' Bologna.', wrong: 0, answer: 'saranno saliti', reason: 'i passeggeri exige saranno saliti' },
  { title: 'L’esame di domani', pieces: [['Prima dell’esame tu ', 'avrai ripassato'], [' tutto. Quando entrerai, noi ', 'avrà preparato'], [' i fogli. Entro mezzogiorno voi ', 'avrete finito']], after: '.', wrong: 1, answer: 'avremo preparato', reason: 'el sujeto noi exige avremo preparato' },
  { title: 'La mostra', pieces: [['Entro lunedì gli artisti ', 'avranno consegnato'], [' le opere. Prima dell’apertura i tecnici ', 'avranno regolato'], [' le luci. Quando arriverà il pubblico, la curatrice ', 'avranno controllato']], after: ' ogni sala.', wrong: 2, answer: 'avrà controllato', reason: 'la curatrice es singular y exige avrà controllato' },
  { title: 'Il nuovo appartamento', pieces: [['Prima del trasloco Marta ', 'avranno firmato'], [' il contratto. Quando porteremo i mobili, noi ', 'avremo ritirato'], [' le chiavi. Entro sera i ragazzi si ', 'saranno sistemati']], after: '.', wrong: 0, answer: 'avrà firmato', reason: 'Marta es singular y exige avrà firmato' },
  { title: 'Il pranzo di domenica', pieces: [['Prima di mezzogiorno io ', 'avrò cotto'], [' il pane. Quando arriverete, voi ', 'avrà portato'], [' il dolce. Entro l’una noi ', 'avremo apparecchiato']], after: ' la tavola.', wrong: 1, answer: 'avrete portato', reason: 'el sujeto voi exige avrete portato' },
  { title: 'La manutenzione', pieces: [['Prima dell’intervento il tecnico ', 'avrà salvato'], [' i dati. Quando spegnerà il server, noi ', 'avremo avvisato'], [' gli utenti. Entro mezzanotte il sistema ', 'saranno ripartito']], after: '.', wrong: 2, answer: 'sarà ripartito', reason: 'il sistema es singular y exige sarà ripartito' },
  { title: 'Il torneo', pieces: [['Prima della finale le squadre ', 'avrà giocato'], [' tre partite. Quando inizierà l’ultimo incontro, gli arbitri ', 'avranno controllato'], [' il campo. Entro sera il pubblico ', 'avrà conosciuto']], after: ' il vincitore.', wrong: 0, answer: 'avranno giocato', reason: 'le squadre exige avranno giocato' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Quando avrò letto la richiesta, cercherò i dati', 'Dopo che avrò controllato i numeri, scriverò la risposta', 'Appena avrò inviato il messaggio, archivierò la pratica'], target: 0 },
  { events: ['Quando Marta avrà scelto la ricetta, farà la lista', 'Dopo che avrà comprato gli ingredienti, inizierà a cucinare', 'Appena avrà preparato la cena, chiamerà gli amici'], target: 1 },
  { events: ['Quando avremo ritirato le chiavi, apriremo la casa', 'Dopo che avremo portato i mobili, monteremo il letto', 'Appena ci saremo sistemati, inviteremo i vicini'], target: 2 },
  { events: ['Quando il tecnico avrà spento il server, aprirà il pannello', 'Dopo che avrà sostituito il disco, controllerà i cavi', 'Appena avrà riavviato il sistema, avviserà gli utenti'], target: 0 },
  { events: ['Quando avrete letto il regolamento, compilerete il modulo', 'Dopo che avrete firmato la domanda, allegherete i documenti', 'Appena avrete completato la pratica, la consegnerete'], target: 1 },
  { events: ['Quando la guida avrà accolto il gruppo, chiuderà l’ingresso', 'Dopo che avrà mostrato la collezione, risponderà alle domande', 'Appena avrà concluso la visita, accompagnerà tutti all’uscita'], target: 2 },
  { events: ['Quando avrò controllato l’indirizzo, uscirò di casa', 'Dopo che avrò preso la metropolitana, cambierò linea', 'Appena sarò arrivato allo studio, ti telefonerò'], target: 0 },
  { events: ['Quando gli studenti avranno raccolto le fonti, le ordineranno', 'Dopo che avranno scritto la relazione, creeranno le slide', 'Appena avranno presentato i risultati, risponderanno alle domande'], target: 1 },
  { events: ['Quando Paolo avrà montato lo scaffale, aprirà le scatole', 'Dopo che avrà ordinato i libri, pulirà il pavimento', 'Appena avrà finito la stanza, farà una fotografia'], target: 2 },
  { events: ['Quando la squadra avrà fatto riscaldamento, proverà gli schemi', 'Dopo che avrà ascoltato l’allenatore, entrerà in campo', 'Appena sarà iniziata la partita, cambierà disposizione'], target: 0 },
]

export const ITALIAN_FUTURO_ANTERIORE_EDITORIAL = createItalianEditorialPack({
  slug: 'future-perfect',
  tense: 'futuro-anteriore',
  focus: 'Futuro anteriore',
  rule: 'El futuro anteriore presenta una acción completada antes de un límite o de otro punto futuro explícito.',
  micro,
  long,
  errors,
  sequences,
})
