import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'Al ristorante', instruction: 'Coniuga prendere al condizionale presente.', segments: ['Io ', ' il risotto, grazie.'], entries: [['prendere', 'prenderei']] },
  { title: 'Un consiglio', instruction: 'Coniuga controllare al condizionale presente.', segments: ['Al tuo posto, ', ' prima l’indirizzo.'], entries: [['controllare', 'controllerei']] },
  { title: 'Una richiesta', instruction: 'Coniuga chiudere al condizionale presente.', segments: ['Per favore, voi ', ' la porta?'], entries: [['chiudere', 'chiudereste']] },
  { title: 'Il viaggio ideale', instruction: 'Coniuga visitare al condizionale presente.', segments: ['Con una settimana libera noi ', ' anche la Sicilia.'], entries: [['visitare', 'visiteremmo']] },
  { title: 'Una notizia incerta', instruction: 'Coniuga essere al condizionale presente.', segments: ['Secondo la stampa, l’accordo ', ' vicino.'], entries: [['essere', 'sarebbe']] },
  { title: 'Il tuo parere', instruction: 'Coniuga scegliere al condizionale presente.', segments: ['Quale soluzione ', ' tu?'], entries: [['scegliere', 'sceglieresti']] },
  { title: 'Un desiderio', instruction: 'Coniuga vivere al condizionale presente.', segments: ['Marta ', ' volentieri vicino al mare.'], entries: [['vivere', 'vivrebbe']] },
  { title: 'Una raccomandazione', instruction: 'Coniuga bere al condizionale presente.', segments: ['Dopo la corsa voi ', ' più acqua.'], entries: [['bere', 'berreste']] },
  { title: 'La soluzione economica', instruction: 'Coniuga ridurre al condizionale presente.', segments: ['Un contratto annuale ', ' i costi.'], entries: [['ridurre', 'ridurrebbe']] },
  { title: 'Un aiuto gentile', instruction: 'Coniuga potere al condizionale presente.', segments: ['Scusa, mi ', ' aiutare con questa scatola?'], entries: [['potere', 'potresti']] },
]

const long: EditorialGapSeed[] = [
  { title: 'Un fine settimana a Napoli', instruction: 'Completa il progetto al condizionale presente.', segments: ['Con tre giorni liberi noi ', ' in treno, ', ' il centro storico e ', ' una giornata a Procida.'], entries: [['andare', 'andremmo'], ['esplorare', 'esploreremmo'], ['dedicare', 'dedicheremmo']] },
  { title: 'Il colloquio con il cliente', instruction: 'Completa le formule cortesi.', segments: ['Signora, ci ', ' meglio il problema? Poi ', ' questo modulo e ci ', ' un recapito telefonico?'], entries: [['descrivere', 'descriverebbe'], ['compilare', 'compilerebbe'], ['lasciare', 'lascerebbe']] },
  { title: 'Una casa più efficiente', instruction: 'Completa le conseguenze ipotetiche.', segments: ['Nuove finestre ', ' il rumore, una caldaia moderna ', ' meno energia e i pannelli solari ', ' parte dell’elettricità.'], entries: [['ridurre', 'ridurrebbero'], ['consumare', 'consumerebbe'], ['produrre', 'produrrebbero']] },
  { title: 'Il consiglio alla squadra', instruction: 'Completa i consigli al condizionale presente.', segments: ['Al vostro posto ', ' con calma, ', ' meglio gli spazi e non ', ' energie all’inizio.'], entries: [['partire', 'partireste'], ['controllare', 'controllereste'], ['sprecare', 'sprechereste']] },
  { title: 'La biblioteca ideale', instruction: 'Completa i desideri al condizionale presente.', segments: ['Io ', ' più tavoli, Marta ', ' una sala silenziosa e gli studenti ', ' un orario più lungo.'], entries: [['aggiungere', 'aggiungerei'], ['creare', 'creerebbe'], ['preferire', 'preferirebbero']] },
  { title: 'Una consegna più rapida', instruction: 'Completa le ipotesi al condizionale presente.', segments: ['Un corriere locale ', ' il pacco oggi, noi ', ' il percorso in tempo reale e il cliente lo ', ' entro sera.'], entries: [['ritirare', 'ritirerebbe'], ['seguire', 'seguiremmo'], ['ricevere', 'riceverebbe']] },
  { title: 'Il parere del tecnico', instruction: 'Completa i consigli al condizionale presente.', segments: ['Il tecnico ', ' una copia dei dati, poi ', ' il disco e infine ', ' il sistema.'], entries: [['fare', 'farebbe'], ['sostituire', 'sostituirebbe'], ['aggiornare', 'aggiornerebbe']] },
  { title: 'Una notizia ancora incerta', instruction: 'Completa le informazioni non confermate.', segments: ['Secondo il giornale, il comune ', ' il progetto, due imprese ', ' un’offerta e i lavori ', ' in autunno.'], entries: [['approvare', 'approverebbe'], ['presentare', 'presenterebbero'], ['cominciare', 'comincerebbero']] },
  { title: 'La cena perfetta', instruction: 'Completa le preferenze al condizionale presente.', segments: ['Paolo ', ' la pasta, io ', ' un secondo leggero e voi ', ' il dolce.'], entries: [['ordinare', 'ordinerebbe'], ['scegliere', 'sceglierei'], ['condividere', 'condividereste']] },
  { title: 'Un quartiere più verde', instruction: 'Completa le proposte al condizionale presente.', segments: ['Noi ', ' più alberi, il comune ', ' il traffico e i residenti ', ' le aiuole.'], entries: [['piantare', 'pianteremmo'], ['limitare', 'limiterebbe'], ['curare', 'curerebbero']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'Una richiesta alla reception', pieces: [['Io ', 'vorrei'], [' una camera tranquilla, voi mi ', 'potrebbe'], [' indicare il prezzo e la direttrice mi ', 'confermerebbe']], after: ' la disponibilità?', wrong: 1, answer: 'potreste', reason: 'el interlocutor voi exige potreste' },
  { title: 'Il viaggio possibile', pieces: [['Con più tempo noi ', 'visiteremmo'], [' Firenze, Luca ', 'resterebbe'], [' due notti e voi ', 'andrebbe']], after: ' anche a Siena.', wrong: 2, answer: 'andreste', reason: 'el sujeto voi exige andreste' },
  { title: 'Il consiglio di Marta', pieces: [['Al tuo posto Marta ', 'parlerei'], [' con il capo, ', 'chiederebbe'], [' un chiarimento e poi ', 'aspetterebbe']], after: ' la risposta.', wrong: 0, answer: 'parlerebbe', reason: 'el sujeto Marta exige parlerebbe' },
  { title: 'Il nuovo orario', pieces: [['Un orario flessibile ', 'aiuterebbe'], [' i genitori, noi ', 'organizzerebbe'], [' meglio i turni e l’azienda ', 'ridurrebbe']], after: ' i ritardi.', wrong: 1, answer: 'organizzeremmo', reason: 'el sujeto noi exige organizzeremmo' },
  { title: 'La cena', pieces: [['Io ', 'prenderei'], [' il pesce, Marta ', 'sceglierebbe'], [' la pasta e voi ', 'ordinerebbe']], after: ' il vino.', wrong: 2, answer: 'ordinereste', reason: 'el sujeto voi exige ordinereste' },
  { title: 'La notizia', pieces: [['Secondo la radio, due ministri ', 'sarebbe'], [' pronti a dimettersi, il governo ', 'cercherebbe'], [' un accordo e il voto ', 'slitterebbe']], after: ' a domani.', wrong: 0, answer: 'sarebbero', reason: 'due ministri exige sarebbero' },
  { title: 'La soluzione tecnica', pieces: [['Il tecnico ', 'salverebbe'], [' i dati, poi ', 'spegneresti'], [' il server e infine ', 'installerebbe']], after: ' il nuovo disco.', wrong: 1, answer: 'spegnerebbe', reason: 'las tres acciones tienen como sujeto il tecnico' },
  { title: 'Il corso ideale', pieces: [['Noi ', 'preferiremmo'], [' lezioni brevi, gli studenti ', 'farebbero'], [' più pratica e tu ', 'sceglierebbe']], after: ' gli argomenti.', wrong: 2, answer: 'sceglieresti', reason: 'el sujeto tu exige sceglieresti' },
  { title: 'Una città più sicura', pieces: [['Più luce ', 'ridurrebbero'], [' i rischi, nuove strisce ', 'aiuterebbero'], [' i pedoni e la polizia ', 'controllerebbe']], after: ' gli incroci.', wrong: 0, answer: 'ridurrebbe', reason: 'più luce funciona como sujeto singular y exige ridurrebbe' },
  { title: 'Una domanda gentile', pieces: [['Signore, mi ', 'direbbe'], [' il suo nome, ', 'potrebbero'], [' mostrarmi il documento e poi ', 'firmerebbe']], after: ' qui?', wrong: 1, answer: 'potrebbe', reason: 'la forma di cortesia Lei exige potrebbe' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Controllerei la richiesta', 'cercherei i dati', 'risponderei al cliente'], target: 0 },
  { events: ['Marta sceglierebbe la ricetta', 'comprerebbe gli ingredienti', 'preparerebbe la cena'], target: 1 },
  { events: ['Noi ritireremmo le chiavi', 'porteremmo i mobili', 'sistemeremmo la nuova casa'], target: 2 },
  { events: ['Il tecnico spegnerebbe il server', 'sostituirebbe il disco', 'riavvierebbe il sistema'], target: 0 },
  { events: ['Voi leggereste il regolamento', 'compilereste il modulo', 'consegnereste la domanda'], target: 1 },
  { events: ['La guida accoglierebbe il gruppo', 'mostrerebbe la collezione', 'accompagnerebbe tutti all’uscita'], target: 2 },
  { events: ['Io controllerei l’indirizzo', 'prenderei la metropolitana', 'raggiungerei lo studio'], target: 0 },
  { events: ['Gli studenti raccoglierebbero le fonti', 'scriverebbero la relazione', 'presenterebbero i risultati'], target: 1 },
  { events: ['Paolo monterebbe lo scaffale', 'ordinerebbe i libri', 'pulirebbe la stanza'], target: 2 },
  { events: ['La squadra farebbe riscaldamento', 'proverebbe gli schemi', 'entrerebbe in campo'], target: 0 },
]

export const ITALIAN_CONDIZIONALE_PRESENTE_EDITORIAL = createItalianEditorialPack({
  slug: 'present-conditional',
  tense: 'condizionale-presente',
  focus: 'Condizionale presente',
  rule: 'El condizionale presente expresa cortesía, deseo, consejo, hipótesis o información no confirmada.',
  micro,
  long,
  errors,
  sequences,
})
