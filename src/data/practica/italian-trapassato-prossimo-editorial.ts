import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La sala vuota', instruction: 'Coniuga uscire al trapassato prossimo.', segments: ['Quando arrivò il custode, tutti ', '.'], entries: [['uscire', 'erano usciti']] },
  { title: 'Il documento mancante', instruction: 'Coniuga dimenticare al trapassato prossimo.', segments: ['Luca non poté entrare perché ', ' il documento a casa.'], entries: [['dimenticare', 'aveva dimenticato']] },
  { title: 'Una strada familiare', instruction: 'Coniuga percorrere al trapassato prossimo.', segments: ['Anna riconobbe la strada che ', ' anni prima.'], entries: [['percorrere', 'aveva percorso']] },
  { title: 'Le finestre aperte', instruction: 'Coniuga chiudere al trapassato prossimo.', segments: ['Entrando scoprimmo che nessuno ', ' le finestre.'], entries: [['chiudere', 'aveva chiuso']] },
  { title: 'Il cambio di programma', instruction: 'Coniuga partire al trapassato prossimo.', segments: ['Non trovai Marco in ufficio: ', ' quella mattina.'], entries: [['partire', 'era partito']] },
  { title: 'La prima bozza', instruction: 'Coniuga scrivere al trapassato prossimo.', segments: ['Prima della riunione voi ', ' una bozza molto dettagliata.'], entries: [['scrivere', 'avevate scritto']] },
  { title: 'La notizia', instruction: 'Coniuga sapere al trapassato prossimo.', segments: ['Non fui sorpreso perché io ', ' tutto da Carla.'], entries: [['sapere', 'avevo saputo']] },
  { title: 'Il quartiere cambiato', instruction: 'Coniuga costruire al trapassato prossimo.', segments: ['Quando tornammo, il comune ', ' una nuova piazza.'], entries: [['costruire', 'aveva costruito']] },
  { title: 'La prenotazione', instruction: 'Coniuga prenotare al trapassato prossimo.', segments: ['Al nostro arrivo l’albergo non trovò le camere che noi ', '.'], entries: [['prenotare', 'avevamo prenotato']] },
  { title: 'La fotografia', instruction: 'Coniuga cadere al trapassato prossimo.', segments: ['Dietro il mobile trovai una fotografia che ', ' dalla parete.'], entries: [['cadere', 'era caduta']] },
]

const long: EditorialGapSeed[] = [
  { title: 'La riunione anticipata', instruction: 'Completa le azioni anteriori al trapassato prossimo.', segments: ['Quando arrivai, la direttrice ', ' la riunione, i colleghi ', ' i documenti e il tecnico ', ' il proiettore.'], entries: [['aprire', 'aveva aperto'], ['distribuire', 'avevano distribuito'], ['accendere', 'aveva acceso']] },
  { title: 'Il rifugio dopo la tempesta', instruction: 'Completa le cause anteriori al trapassato prossimo.', segments: ['Il rifugio era isolato: la neve ', ' la strada, il vento ', ' un albero e la corrente ', '.'], entries: [['coprire', 'aveva coperto'], ['abbattere', 'aveva abbattuto'], ['saltare', 'era saltata']] },
  { title: 'Il ritorno a casa', instruction: 'Completa i cambiamenti anteriori al trapassato prossimo.', segments: ['Quando Elena tornò, suo fratello ', ' i mobili, i genitori ', ' la cucina e i vicini ', ' il giardino.'], entries: [['spostare', 'aveva spostato'], ['ridipingere', 'avevano ridipinto'], ['sistemare', 'avevano sistemato']] },
  { title: 'Il pacco restituito', instruction: 'Completa la ricostruzione al trapassato prossimo.', segments: ['Il negozio restituì il pacco perché noi ', ' l’indirizzo sbagliato, il corriere non ', ' il destinatario e nessuno lo ', '.'], entries: [['indicare', 'avevamo indicato'], ['trovare', 'aveva trovato'], ['contattare', 'aveva contattato']] },
  { title: 'La sorpresa in aeroporto', instruction: 'Completa le azioni anteriori al trapassato prossimo.', segments: ['All’aeroporto scoprimmo che il volo ', ', la compagnia ', ' il gate e molti passeggeri ', ' la coincidenza.'], entries: [['decollare', 'era decollato'], ['cambiare', 'aveva cambiato'], ['perdere', 'avevano perso']] },
  { title: 'Il progetto recuperato', instruction: 'Completa le azioni anteriori al trapassato prossimo.', segments: ['Il tecnico recuperò il progetto che io ', ', che Marta ', ' sul server e che poi noi ', ' per errore.'], entries: [['creare', 'avevo creato'], ['salvare', 'aveva salvato'], ['cancellare', 'avevamo cancellato']] },
  { title: 'La cena già organizzata', instruction: 'Completa i preparativi anteriori al trapassato prossimo.', segments: ['Quando arrivarono gli ospiti, Sara ', ' la tavola, Paolo ', ' il vino e noi ', ' tutte le sedie.'], entries: [['apparecchiare', 'aveva apparecchiato'], ['aprire', 'aveva aperto'], ['portare', 'avevamo portato']] },
  { title: 'La traccia nel bosco', instruction: 'Completa gli indizi anteriori al trapassato prossimo.', segments: ['La guida capì che qualcuno ', ' sul sentiero, ', ' un fuoco e poi ', ' verso il fiume.'], entries: [['camminare', 'aveva camminato'], ['accendere', 'aveva acceso'], ['scendere', 'era sceso']] },
  { title: 'L’esame rimandato', instruction: 'Completa le cause anteriori al trapassato prossimo.', segments: ['La scuola rimandò l’esame: alcuni studenti non ', ' il programma, il docente non ', ' le copie e il sistema si ', '.'], entries: [['ricevere', 'avevano ricevuto'], ['preparare', 'aveva preparato'], ['bloccarsi', 'era bloccato']] },
  { title: 'La mostra inaugurata', instruction: 'Completa i lavori anteriori al trapassato prossimo.', segments: ['Prima dell’inaugurazione gli artisti ', ' le opere, i tecnici ', ' le luci e la curatrice ', ' ogni didascalia.'], entries: [['appendere', 'avevano appeso'], ['regolare', 'avevano regolato'], ['controllare', 'aveva controllato']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La porta del magazzino', pieces: [['Quando arrivò la guardia, qualcuno ', 'avevano forzato'], [' la serratura, ', 'aveva aperto'], [' la porta e ', 'aveva spostato']], after: ' alcune casse.', wrong: 0, answer: 'aveva forzato', reason: 'qualcuno es singular y exige aveva forzato' },
  { title: 'Il viaggio annullato', pieces: [['Noi ', 'avevamo comprato'], [' i biglietti, tu ', 'avevano prenotato'], [' l’albergo e Marta ', 'aveva chiesto']], after: ' le ferie.', wrong: 1, answer: 'avevi prenotato', reason: 'el sujeto tu exige avevi prenotato' },
  { title: 'La sala pronta', pieces: [['I tecnici ', 'avevano montato'], [' il palco, la squadra audio ', 'aveva collegato'], [' i microfoni e voi ', 'aveva provato']], after: ' le luci.', wrong: 2, answer: 'avevate provato', reason: 'el sujeto voi exige avevate provato' },
  { title: 'Il sentiero interrotto', pieces: [['La pioggia ', 'erano caduta'], [' per ore, il fiume ', 'era salito'], [' e alcuni alberi ', 'erano crollati']], after: ' sul sentiero.', wrong: 0, answer: 'era caduta', reason: 'la pioggia es singular y exige era caduta' },
  { title: 'Il documento condiviso', pieces: [['Io ', 'avevo corretto'], [' il testo, noi lo ', 'aveva caricato'], [' sul portale e Anna lo ', 'aveva inviato']], after: ' al cliente.', wrong: 1, answer: 'avevamo caricato', reason: 'el sujeto noi exige avevamo caricato' },
  { title: 'Le ospiti in ritardo', pieces: [['Le ospiti ', 'erano partite'], [' tardi, ', 'avevano perso'], [' l’autobus e ', 'era arrivate']], after: ' dopo cena.', wrong: 2, answer: 'erano arrivate', reason: 'el sujeto femenino plural exige erano arrivate' },
  { title: 'La cucina in ordine', pieces: [['Prima di uscire noi ', 'aveva lavato'], [' i piatti, ', 'avevamo pulito'], [' il tavolo e ', 'avevamo spento']], after: ' il forno.', wrong: 0, answer: 'avevamo lavato', reason: 'el sujeto noi exige avevamo lavato' },
  { title: 'La relazione finale', pieces: [['Marta ', 'aveva raccolto'], [' i dati, io ', 'avevi ordinato'], [' le tabelle e voi ', 'avevate scritto']], after: ' le conclusioni.', wrong: 1, answer: 'avevo ordinato', reason: 'el sujeto io exige avevo ordinato' },
  { title: 'Il paese evacuato', pieces: [['Gli abitanti ', 'erano usciti'], [' dalle case, i vigili ', 'avevano chiuso'], [' la strada e il sindaco ', 'avevano aperto']], after: ' il centro di accoglienza.', wrong: 2, answer: 'aveva aperto', reason: 'il sindaco es singular y exige aveva aperto' },
  { title: 'La valigia sbagliata', pieces: [['Tu ', 'aveva preso'], [' una valigia nera, il personale la ', 'aveva registrata'], [' e io ', 'avevo segnalato']], after: ' lo scambio.', wrong: 0, answer: 'avevi preso', reason: 'el sujeto tu exige avevi preso' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Marta aveva letto l’avviso', 'aveva compilato il modulo', 'lo aveva consegnato in segreteria'], target: 0 },
  { events: ['Noi avevamo scelto la meta', 'avevamo prenotato il treno', 'avevamo preparato le valigie'], target: 1 },
  { events: ['Il tecnico aveva spento il server', 'aveva sostituito il disco', 'aveva riavviato il sistema'], target: 2 },
  { events: ['Io avevo ricevuto i dati', 'li avevo controllati', 'avevo scritto il rapporto'], target: 0 },
  { events: ['Gli ospiti erano arrivati', 'avevano lasciato i cappotti', 'si erano seduti in salotto'], target: 1 },
  { events: ['Voi avevate letto la ricetta', 'avevate comprato gli ingredienti', 'avevate preparato la cena'], target: 2 },
  { events: ['La guida aveva aperto il museo', 'aveva acceso le luci', 'aveva accolto il gruppo'], target: 0 },
  { events: ['Paolo aveva trovato l’indirizzo', 'aveva preso la metropolitana', 'era arrivato allo studio'], target: 1 },
  { events: ['Le studentesse avevano raccolto le fonti', 'avevano creato le schede', 'avevano presentato la ricerca'], target: 2 },
  { events: ['Il custode aveva controllato le sale', 'aveva chiuso le finestre', 'aveva attivato l’allarme'], target: 0 },
]

export const ITALIAN_TRAPASSATO_PROSSIMO_EDITORIAL = createItalianEditorialPack({
  slug: 'pluperfect',
  tense: 'trapassato-prossimo',
  focus: 'Trapassato prossimo',
  rule: 'El trapassato prossimo sitúa una acción antes de otro punto explícito del pasado.',
  micro,
  long,
  errors,
  sequences,
})
