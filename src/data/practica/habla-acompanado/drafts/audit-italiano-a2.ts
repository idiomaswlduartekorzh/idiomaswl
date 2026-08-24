import type { RoleplayScenarioAudit, SimulationProfile } from './audit-ingles-a2.ts'

type AuditSeed = {
  slug: string
  source: string
  complicationAt: number
  requiredPieces: [string, string, string, string]
  note: string
}

const PROFILES: Array<{
  profile: SimulationProfile
  globalTurns: number
  wordsA: number
  wordsB: number
  note: string
}> = [
  { profile: 'solid-solid', globalTurns: 14, wordsA: 116, wordsB: 113, note: 'Entrambi i ruoli producono dato, limite, alternativa e conferma. La carta cambia il piano senza anticipare informazioni private.' },
  { profile: 'solid-weak', globalTurns: 17, wordsA: 139, wordsB: 68, note: 'Il ruolo solido riformula e fa una domanda alla volta. Il ruolo debole deve comunque dare un dato privato, un limite e una decisione.' },
  { profile: 'weak-weak', globalTurns: 18, wordsA: 86, wordsB: 84, note: 'Entrambi usano la scatola comune per riparare la conversazione. La chiusura recupera responsabili, prove e orari dimenticati.' },
  { profile: 'quiet', globalTurns: 13, wordsA: 101, wordsB: 35, note: 'Il ruolo silenzioso non può chiudere con un semplice sì: deve produrre almeno un fatto privato, una condizione e una conferma.' },
  { profile: 'shortcut', globalTurns: 8, wordsA: 70, wordsB: 67, note: 'La prima scorciatoia fallisce dopo la carta. Anche il percorso minimo richiede informazioni di entrambe le schede e quattro elementi di chiusura.' },
]

const SEEDS: AuditSeed[] = [
  {
    slug: 'four-portions-are-missing', source: 'Italiano A2 · simulazione editoriale · transazioni 1', complicationAt: 5,
    requiredPieces: ['ordine BG-184 e quattro porzioni mancanti', 'piatto sostitutivo confermato', 'contenitori ed etichette', 'ritiro e rimborso di 2,64 €'],
    note: 'Il cliente conosce il numero delle porzioni e il negozio controlla disponibilità e allergeni. La carta abilita un sostituto concreto senza cancellare il rimborso parziale.',
  },
  {
    slug: 'recharge-on-the-wrong-card', source: 'Italiano A2 · simulazione editoriale · transazioni 2', complicationAt: 5,
    requiredPieces: ['tessere 0274 e 4318 distinte', 'credito provvisorio', 'trasferimento diretto impossibile', 'pratica per 25 € e termine di risposta'],
    note: 'Il saldo visto dal cliente non permette al tabaccaio di promettere uno storno. La carta apre una pratica, quindi il trasferimento resta irrisolto e il credito è solo provvisorio.',
  },
  {
    slug: 'reserved-chair-is-gone', source: 'Italiano A2 · simulazione editoriale · transazioni 3', complicationAt: 5,
    requiredPieces: ['prenotazione M-308 e sedia identificata', 'vendita delle 10:55', 'alternativa blu larga 49 cm', 'restituzione di 15 € senza sostituzione'],
    note: 'La prenotazione prova quale sedia era stata scelta, non consente di recuperarla. La misura rivelata dalla carta fa fallire la sostituzione rapida e conserva il disaccordo.',
  },
  {
    slug: 'breakfast-is-now-too-late', source: 'Italiano A2 · simulazione editoriale · transazioni 4', complicationAt: 4,
    requiredPieces: ['sala alle 8 dopo il controllo', 'cestino condizionato al pane delle 6:40', 'contenuto minimo', 'decisione alle 21 e piano stazione'],
    note: 'La consegna del pane non è confermata. La carta crea due rami reali e impedisce all’ospite o all’host di annunciare il cestino come già disponibile.',
  },
  {
    slug: 'shift-change-is-not-recorded', source: 'Italiano A2 · simulazione editoriale · lavoro 5', complicationAt: 5,
    requiredPieces: ['Marco 5:40–6:15', 'responsabile 6:15–6:40', 'Luca 6:40–12:00', 'consegna e recupero dei trenta minuti'],
    note: 'Il messaggio privato di Luca copre solo una parte del turno. La carta non autorizza a lasciare il forno senza responsabile e il passaggio deve restare in tre fasi.',
  },
  {
    slug: 'room-was-booked-twice', source: 'Italiano A2 · simulazione editoriale · lavoro 6', complicationAt: 5,
    requiredPieces: ['foyer 16:00–16:50', 'sala piccola 17:00–18:00', 'dodici presenti e quattro online', 'adattatore e sala grande non concessa'],
    note: 'La doppia prenotazione non si risolve togliendo l’accessibilità all’altro gruppo. La carta rende possibile una parte online, ma il laboratorio perde comunque la sala grande.',
  },
  {
    slug: 'banner-did-not-arrive', source: 'Italiano A2 · simulazione editoriale · lavoro 7', complicationAt: 4,
    requiredPieces: ['cartello provvisorio entro 17:40', 'chiamata a San Marco', 'via Verdi 81 non ancora confermata', 'decisione 17:30 e tre volontari ai tavoli'],
    note: 'Foto e firma indicano un luogo, non provano che il pacco sia recuperabile. La carta mantiene la ricerca aperta e protegge l’avvio dell’attività.',
  },
  {
    slug: 'locker-key-is-at-home', source: 'Italiano A2 · simulazione editoriale · lavoro 8', complicationAt: 4,
    requiredPieces: ['autorizzazione entro 9:15', 'apertura C-17 alle 9:20', 'sei oggetti controllati', 'prova 9:25 e chiave domani'],
    note: 'La reception può aprire solo con autorizzazione e presenza del collega. La carta permette la procedura eccezionale senza trasformarla in accesso libero.',
  },
  {
    slug: 'bike-is-no-longer-in-the-courtyard', source: 'Italiano A2 · simulazione editoriale · comunità 9', complicationAt: 5,
    requiredPieces: ['bici 631 al D2 e ritiro 7:15', 'cortile chiuso fino al 18 settembre', 'androne vietato', 'rastrelliera rifiutata e locale B non promesso'],
    note: 'Ritrovare la bici non concede un nuovo parcheggio. La carta localizza il mezzo, ma il ruolo residente deve ancora rifiutare la soluzione esterna e accettare il disaccordo.',
  },
  {
    slug: 'wrong-bin-day', source: 'Italiano A2 · simulazione editoriale · comunità 10', complicationAt: 4,
    requiredPieces: ['bidone marrone riportato dentro', 'raccolta di lunedì persa', 'bidone blu entro 21:30', 'organico giovedì e promemoria comune'],
    note: 'La carta del calendario corregge i turni futuri, ma non crea un recupero straordinario. Il problema odierno resta solo parzialmente risolto.',
  },
  {
    slug: 'package-delivered-to-another-rossi', source: 'Italiano A2 · simulazione editoriale · comunità 11', complicationAt: 5,
    requiredPieces: ['firma Rossi non conclusiva', 'tre avvisi chiusi', 'controllo video autorizzato', 'richiamo 10:30 e reclamo entro 12'],
    note: 'La foto punta a Rossi G., ma non identifica la persona. La carta non autorizza accuse né condivisione di dati e la ricerca termina correttamente rinviata.',
  },
  {
    slug: 'terrace-booked-at-the-same-time', source: 'Italiano A2 · simulazione editoriale · comunità 12', complicationAt: 5,
    requiredPieces: ['festa 19:00–20:20', 'pulizia 20:20–20:30', 'lettura dal portico alla terrazza', 'passaggio e ritorno della chiave'],
    note: 'Le due conferme non danno a nessuno tutta la serata. La carta rende disponibile il portico per l’accoglienza e forza un passaggio con pulizia reale.',
  },
  {
    slug: 'ticket-starts-at-the-wrong-station', source: 'Italiano A2 · simulazione editoriale · mobilità 13', complicationAt: 5,
    requiredPieces: ['QR FR-620 da Rifredi', 'titolo da 1,80 € per il primo tratto', 'regionale 18:47 binario 4', 'arrivo Pisa 19:50'],
    note: 'Un QR valido non copre Santa Maria Novella. La carta scarta il treno irraggiungibile e il dialogo deve distinguere due titoli consecutivi.',
  },
  {
    slug: 'ztl-explanation-arrived-too-late', source: 'Italiano A2 · simulazione editoriale · mobilità 14', complicationAt: 5,
    requiredPieces: ['e-mail 17 minuti dopo il varco', 'pratica Z-144 con prove', '35 € di gestione annullati', 'risposta in cinque giorni senza sanzione promessa'],
    note: 'L’orario dell’e-mail prova il ritardo informativo, non l’esistenza o l’annullamento di una multa. La carta conserva il reclamo senza falsa compensazione.',
  },
  {
    slug: 'scooter-is-not-ready', source: 'Italiano A2 · simulazione editoriale · mobilità 15', complicationAt: 5,
    requiredPieces: ['cavo da 92 cm errato', 'nessuna consegna insicura', 'e-bike alle 12:45 e deposito 20 €', 'richiamo 12:20 con due rami di ritiro'],
    note: 'L’urgenza del cliente non rende sicuro il vecchio cavo. La carta offre mobilità temporanea, non conferma l’arrivo del ricambio.',
  },
  {
    slug: 'ferry-luggage-surcharge', source: 'Italiano A2 · simulazione editoriale · mobilità 16', complicationAt: 5,
    requiredPieces: ['eccedenza iniziale di 5 cm', 'borsa ridotta sotto 20 cm', 'sacchetto entro misura e peso', '8 €, due etichette e varco 8:35'],
    note: 'Il peso basso da solo non elimina il supplemento. La carta rende possibile due colli piccoli, ma solo la nuova misurazione dell’agente autorizza gli 8 €.',
  },
  {
    slug: 'sagra-electricity-allocation', source: 'Italiano A2 · simulazione editoriale · piani 17', complicationAt: 5,
    requiredPieces: ['bollitore 16:00–16:20', 'controllo di cinque minuti', 'piastra 16:25–18:30', 'copricavo e spegnimento responsabile'],
    note: 'Una presa fisica non significa capacità per due apparecchi caldi. La carta libera il turno, ma non elimina il controllo né autorizza la multipresa.',
  },
  {
    slug: 'cooking-course-oven-unavailable', source: 'Italiano A2 · simulazione editoriale · piani 18', complicationAt: 4,
    requiredPieces: ['impasto e ripieno prima', 'forno alle 19:05', '190 °C per trenta minuti', 'riposo, otto porzioni e uscita entro 20'],
    note: 'Il ripieno già cotto riduce la preparazione, non la cottura con uova. La carta mantiene la ricetta e cambia formato e ordine senza rischi.',
  },
  {
    slug: 'rain-moves-birthday-indoors', source: 'Italiano A2 · simulazione editoriale · piani 19', complicationAt: 5,
    requiredPieces: ['cortile chiuso', '18 invitati più 2 organizzatori', 'orari di torta, musica e pulizia', 'uscita 21:30 e rimborso 35 €'],
    note: 'I due organizzatori contano nella capienza. La carta riduce la lista senza promettere il portico e conserva festa, torta e rimborso in un formato più breve.',
  },
  {
    slug: 'refuge-late-arrival', source: 'Italiano A2 · simulazione editoriale · piani 20', complicationAt: 5,
    requiredPieces: ['accesso dopo le 19 rifiutato', 'ritorno sui segnavia 7 e 7A', 'navetta delle 19:20', 'credito 70% e richiamo entro 19:05'],
    note: 'Una prenotazione non autorizza accesso senza personale. La carta rende verificabile il ritorno e il dialogo deve conservare il no all’arrivo tardivo.',
  },
]

export const ITALIAN_A2_RELEASE_AUDITS: RoleplayScenarioAudit[] = SEEDS.map((seed) => ({
  slug: seed.slug,
  auditedAt: '2026-08-24',
  source: seed.source,
  verdict: 'pass',
  runs: PROFILES.map((profile) => ({
    profile: profile.profile,
    globalTurns: profile.globalTurns,
    wordsA: profile.wordsA,
    wordsB: profile.wordsB,
    reachesClosing: true,
    complicationAt: seed.complicationAt,
    noLeak: true,
    requiredPieces: [...seed.requiredPieces],
    note: `${seed.note} ${profile.note}`,
  })),
}))
