import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La videochiamata', instruction: 'Coniuga parlare al presente progressivo.', segments: ['Non posso salutarti: ', ' con una cliente.'], entries: [['parlare', 'sto parlando']] },
  { title: 'Il trasloco', instruction: 'Coniuga portare al presente progressivo.', segments: ['Guarda, i vicini ', ' gli scatoloni al piano di sopra.'], entries: [['portare', 'stanno portando']] },
  { title: 'La stampante', instruction: 'Coniuga stampare al presente progressivo.', segments: ['Aspetta un momento: la macchina ', ' il tuo documento.'], entries: [['stampare', 'sta stampando']] },
  { title: 'Una nuova ricetta', instruction: 'Coniuga provare al presente progressivo.', segments: ['Oggi noi ', ' una ricetta siciliana.'], entries: [['provare', 'stiamo provando']] },
  { title: 'Il rumore in cortile', instruction: 'Coniuga costruire al presente progressivo.', segments: ['I bambini ', ' una torre con le scatole.'], entries: [['costruire', 'stanno costruendo']] },
  { title: 'Alla fermata', instruction: 'Coniuga aspettare al presente progressivo.', segments: ['Vedo che tu ', ' l’autobus sotto la pioggia.'], entries: [['aspettare', 'stai aspettando']] },
  { title: 'La presentazione', instruction: 'Coniuga mostrare al presente progressivo.', segments: ['In questo momento voi ', ' i risultati al direttore.'], entries: [['mostrare', 'state mostrando']] },
  { title: 'Il corridoio', instruction: 'Coniuga pulire al presente progressivo.', segments: ['Non passare di qui: Anna ', ' il pavimento.'], entries: [['pulire', 'sta pulendo']] },
  { title: 'La ricerca', instruction: 'Coniuga raccogliere al presente progressivo.', segments: ['Questo mese il gruppo ', ' nuovi dati sul traffico.'], entries: [['raccogliere', 'sta raccogliendo']] },
  { title: 'La valigia', instruction: 'Coniuga scegliere al presente progressivo.', segments: ['Io ', ' i vestiti da portare a Roma.'], entries: [['scegliere', 'sto scegliendo']] },
]

const long: EditorialGapSeed[] = [
  { title: 'La diretta dalla piazza', instruction: 'Completa la scena al presente progressivo.', segments: ['La giornalista ', ' il corteo. Dietro di lei alcune persone ', ' cartelli e la polizia ', ' il traffico.'], entries: [['descrivere', 'sta descrivendo'], ['mostrare', 'stanno mostrando'], ['deviare', 'sta deviando']] },
  { title: 'La cucina del ristorante', instruction: 'Completa la scena al presente progressivo.', segments: ['In cucina lo chef ', ' il pesce, due aiuti ', ' le verdure e la cameriera ', ' i primi piatti.'], entries: [['tagliare', 'sta tagliando'], ['lavare', 'stanno lavando'], ['portare', 'sta portando']] },
  { title: 'Il guasto sulla linea', instruction: 'Completa la scena al presente progressivo.', segments: ['Un tecnico ', ' il quadro elettrico. I colleghi ', ' i cavi mentre la responsabile ', ' i passeggeri.'], entries: [['controllare', 'sta controllando'], ['sostituire', 'stanno sostituendo'], ['informare', 'sta informando']] },
  { title: 'La prova generale', instruction: 'Completa la scena al presente progressivo.', segments: ['Sul palco gli attori ', ' l’ultima scena. Il regista li ', ' dalla platea e i tecnici ', ' le luci.'], entries: [['ripetere', 'stanno ripetendo'], ['osservare', 'sta osservando'], ['regolare', 'stanno regolando']] },
  { title: 'Una classe molto attiva', instruction: 'Completa la scena al presente progressivo.', segments: ['La docente ', ' un esperimento. Noi ', ' le reazioni e due compagni ', ' le misure alla lavagna.'], entries: [['eseguire', 'sta eseguendo'], ['annotare', 'stiamo annotando'], ['scrivere', 'stanno scrivendo']] },
  { title: 'Il salvataggio del cane', instruction: 'Completa la scena al presente progressivo.', segments: ['Il cane è nel canale. Un pompiere ', ' una scala, i colleghi ', ' la corda e il proprietario ', ' l’animale.'], entries: [['calare', 'sta calando'], ['tenere', 'stanno tenendo'], ['chiamare', 'sta chiamando']] },
  { title: 'La sala conferenze', instruction: 'Completa la scena al presente progressivo.', segments: ['Il pubblico ', ' nella sala. Gli organizzatori ', ' i programmi e il relatore ', ' il microfono.'], entries: [['entrare', 'sta entrando'], ['distribuire', 'stanno distribuendo'], ['provare', 'sta provando']] },
  { title: 'Il cantiere davanti casa', instruction: 'Completa la scena al presente progressivo.', segments: ['Una squadra ', ' il marciapiede. Due operai ', ' le pietre e un altro ', ' il cemento.'], entries: [['rifare', 'sta rifacendo'], ['posare', 'stanno posando'], ['mescolare', 'sta mescolando']] },
  { title: 'La partenza del traghetto', instruction: 'Completa la scena al presente progressivo.', segments: ['I passeggeri ', ' a bordo. Il personale ', ' i biglietti e il capitano ', ' le ultime istruzioni.'], entries: [['salire', 'stanno salendo'], ['controllare', 'sta controllando'], ['dare', 'sta dando']] },
  { title: 'Un pomeriggio nello studio', instruction: 'Completa la scena al presente progressivo.', segments: ['Io ', ' le fotografie, Marta ', ' il testo e insieme noi ', ' la pagina finale.'], entries: [['selezionare', 'sto selezionando'], ['correggere', 'sta correggendo'], ['preparare', 'stiamo preparando']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La gara', pieces: [['Gli atleti ', 'stanno correndo'], [' verso il traguardo, il pubblico ', 'stanno applaudendo'], [' e il cronista ', 'sta descrivendo']], after: ' l’arrivo.', wrong: 1, answer: 'sta applaudendo', reason: 'il pubblico es singular y exige sta applaudendo' },
  { title: 'La riunione online', pieces: [['Noi ', 'stiamo condividendo'], [' lo schermo, voi ', 'state prendendo'], [' appunti e Luca ', 'stanno rispondendo']], after: ' alle domande.', wrong: 2, answer: 'sta rispondendo', reason: 'Luca es singular y exige sta rispondendo' },
  { title: 'Il temporale', pieces: [['La pioggia ', 'stanno cadendo'], [' con forza, il vento ', 'sta muovendo'], [' gli alberi e tutti ', 'stanno cercando']], after: ' un riparo.', wrong: 0, answer: 'sta cadendo', reason: 'la pioggia es singular y exige sta cadendo' },
  { title: 'Il nuovo appartamento', pieces: [['Anna ', 'sta montando'], [' un armadio, noi ', 'sta sistemando'], [' i libri e suo fratello ', 'sta pulendo']], after: ' la cucina.', wrong: 1, answer: 'stiamo sistemando', reason: 'el sujeto noi exige stiamo sistemando' },
  { title: 'La stazione', pieces: [['Il treno ', 'sta arrivando'], [' al binario tre, i viaggiatori ', 'stanno alzando'], [' le valigie e tu ', 'sta cercando']], after: ' la carrozza giusta.', wrong: 2, answer: 'stai cercando', reason: 'el sujeto tu exige stai cercando' },
  { title: 'Il documentario', pieces: [['Io ', 'sta guardando'], [' un documentario, mia sorella ', 'sta leggendo'], [' i sottotitoli e noi ', 'stiamo annotando']], after: ' le parole nuove.', wrong: 0, answer: 'sto guardando', reason: 'el sujeto io exige sto guardando' },
  { title: 'Il cortile della scuola', pieces: [['Alcuni bambini ', 'stanno saltando'], [' la corda, una maestra ', 'stanno osservando'], [' il gruppo e altri alunni ', 'stanno disegnando']], after: ' con i gessetti.', wrong: 1, answer: 'sta osservando', reason: 'una maestra es singular y exige sta osservando' },
  { title: 'La consegna urgente', pieces: [['Il corriere ', 'sta caricando'], [' i pacchi, noi ', 'stiamo verificando'], [' gli indirizzi e voi ', 'stiamo preparando']], after: ' le ricevute.', wrong: 2, answer: 'state preparando', reason: 'el sujeto voi exige state preparando' },
  { title: 'La mostra', pieces: [['I visitatori ', 'sta entrando'], [' nella prima sala, la guida ', 'sta indicando'], [' un affresco e i custodi ', 'stanno sorvegliando']], after: ' le uscite.', wrong: 0, answer: 'stanno entrando', reason: 'i visitatori exige stanno entrando' },
  { title: 'La cena sul balcone', pieces: [['Mio padre ', 'sta accendendo'], [' le candele, io ', 'stanno portando'], [' i bicchieri e gli ospiti ', 'stanno prendendo']], after: ' posto.', wrong: 1, answer: 'sto portando', reason: 'el sujeto io exige sto portando' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Il cuoco sta lavando le verdure', 'le sta tagliando', 'le sta mettendo in pentola'], target: 0 },
  { events: ['Noi stiamo aprendo le scatole', 'stiamo montando i ripiani', 'stiamo sistemando i libri'], target: 1 },
  { events: ['Marta sta leggendo la richiesta', 'sta cercando i dati', 'sta scrivendo la risposta'], target: 2 },
  { events: ['Gli operai stanno bloccando la strada', 'stanno riparando il tubo', 'stanno riaprendo il passaggio'], target: 0 },
  { events: ['Io sto scegliendo le fotografie', 'le sto ordinando', 'le sto caricando sul sito'], target: 1 },
  { events: ['Il medico sta visitando Paolo', 'sta compilando il referto', 'sta spiegando la terapia'], target: 2 },
  { events: ['Voi state raccogliendo i moduli', 'state controllando le firme', 'state archiviando i documenti'], target: 0 },
  { events: ['La squadra sta entrando in campo', 'sta salutando il pubblico', 'sta iniziando il riscaldamento'], target: 1 },
  { events: ['Sara sta pesando gli ingredienti', 'li sta mescolando', 'sta versando l’impasto nello stampo'], target: 2 },
  { events: ['I tecnici stanno spegnendo il server', 'stanno sostituendo il disco', 'stanno riavviando il sistema'], target: 0 },
]

export const ITALIAN_PRESENT_PROGRESSIVE_EDITORIAL = createItalianEditorialPack({
  slug: 'present-progressive',
  tense: 'presente-progressivo',
  focus: 'Presente progressivo',
  rule: 'Stare al presente più gerundio mette a fuoco un processo realmente in corso.',
  micro,
  long,
  errors,
  sequences,
})
