import { createItalianEditorialPack, type EditorialErrorSeed, type EditorialGapSeed, type EditorialSequenceSeed } from './italian-editorial-builder.ts'

const micro: EditorialGapSeed[] = [
  { title: 'La portineria', instruction: 'Coniuga consegnare al presente.', segments: ['Ogni pomeriggio il corriere ', ' i pacchi alla portineria.'], entries: [['consegnare', 'consegna']] },
  { title: 'Un dubbio', instruction: 'Coniuga sapere al presente.', segments: ['Scusate, voi ', ' dove si trova l’aula dodici?'], entries: [['sapere', 'sapete']] },
  { title: 'Il pane del quartiere', instruction: 'Coniuga cuocere al presente.', segments: ['In questo forno loro ', ' il pane due volte al giorno.'], entries: [['cuocere', 'cuociono']] },
  { title: 'La nuova collega', instruction: 'Coniuga venire al presente.', segments: ['Amina ', ' dal Marocco e parla tre lingue.'], entries: [['venire', 'viene']] },
  { title: 'Il turno serale', instruction: 'Coniuga finire al presente.', segments: ['Questa settimana io ', ' il turno alle dieci.'], entries: [['finire', 'finisco']] },
  { title: 'Una regola chiara', instruction: 'Coniuga dovere al presente.', segments: ['Per entrare in laboratorio, noi ', ' indossare il camice.'], entries: [['dovere', 'dobbiamo']] },
  { title: 'Il rumore', instruction: 'Coniuga sentire al presente.', segments: ['Da qui tu ', ' bene la musica della piazza.'], entries: [['sentire', 'senti']] },
  { title: 'La tessera', instruction: 'Coniuga servire al presente.', segments: ['Per prendere un libro in prestito ', ' la tessera della biblioteca.'], entries: [['servire', 'serve']] },
  { title: 'Il balcone', instruction: 'Coniuga crescere al presente.', segments: ['Con tutta questa luce, le piante ', ' rapidamente.'], entries: [['crescere', 'crescono']] },
  { title: 'Una scelta pratica', instruction: 'Coniuga preferire al presente.', segments: ['Per i viaggi brevi noi ', ' il treno all’aereo.'], entries: [['preferire', 'preferiamo']] },
]

const long: EditorialGapSeed[] = [
  { title: 'L’apertura del bar', instruction: 'Completa il racconto al presente.', segments: ['Alle sei Marco ', ' la serranda. Subito dopo sua sorella ', ' i tavoli e il primo cliente ', ' il giornale vicino alla finestra.'], entries: [['alzare', 'alza'], ['preparare', 'prepara'], ['leggere', 'legge']] },
  { title: 'Il laboratorio del lunedì', instruction: 'Completa il racconto al presente.', segments: ['Ogni lunedì la docente ', ' il problema alla classe. Noi ', ' una soluzione in gruppo e alla fine ogni portavoce la ', ' agli altri.'], entries: [['presentare', 'presenta'], ['cercare', 'cerchiamo'], ['spiegare', 'spiega']] },
  { title: 'Il mercato coperto', instruction: 'Completa il racconto al presente.', segments: ['Al mercato Paolo ', ' la lista, poi ', ' la frutta più matura e infine ', ' tutto con la carta.'], entries: [['controllare', 'controlla'], ['scegliere', 'sceglie'], ['pagare', 'paga']] },
  { title: 'Una mattina in redazione', instruction: 'Completa il racconto al presente.', segments: ['La riunione ', ' alle nove. La caporedattrice ', ' le notizie principali e i giornalisti ', ' gli articoli da seguire.'], entries: [['cominciare', 'comincia'], ['riassumere', 'riassume'], ['dividere', 'dividono']] },
  { title: 'Il percorso della linea 4', instruction: 'Completa il racconto al presente.', segments: ['L’autobus ', ' dalla stazione, ', ' davanti all’ospedale e poi ', ' al capolinea sul lungomare.'], entries: [['partire', 'parte'], ['passare', 'passa'], ['arrivare', 'arriva']] },
  { title: 'La biblioteca del paese', instruction: 'Completa il racconto al presente.', segments: ['La biblioteca ', ' anche il sabato. I volontari ', ' i nuovi libri e la bibliotecaria ', ' i lettori nelle ricerche.'], entries: [['aprire', 'apre'], ['catalogare', 'catalogano'], ['aiutare', 'aiuta']] },
  { title: 'La squadra prima della gara', instruction: 'Completa il racconto al presente.', segments: ['Prima della gara l’allenatore ', ' la strategia. I giocatori ', ' in silenzio e poi ', ' in campo insieme.'], entries: [['ripetere', 'ripete'], ['ascoltare', 'ascoltano'], ['entrare', 'entrano']] },
  { title: 'Una cena in famiglia', instruction: 'Completa il racconto al presente.', segments: ['Mentre mio padre ', ' la pasta, io ', ' l’insalata e i bambini ', ' la tavola.'], entries: [['cuocere', 'cuoce'], ['condire', 'condisco'], ['apparecchiare', 'apparecchiano']] },
  { title: 'Il controllo del treno', instruction: 'Completa il racconto al presente.', segments: ['Il controllore ', ' nel vagone, ', ' i biglietti e poi ', ' ai viaggiatori la prossima fermata.'], entries: [['entrare', 'entra'], ['verificare', 'verifica'], ['annunciare', 'annuncia']] },
  { title: 'La serra della scuola', instruction: 'Completa il racconto al presente.', segments: ['Ogni mattina due studenti ', ' la temperatura. Se il terreno è asciutto, lo ', ' e poi ', ' i dati sul quaderno.'], entries: [['misurare', 'misurano'], ['bagnare', 'bagnano'], ['scrivere', 'scrivono']] },
]

const errors: EditorialErrorSeed[] = [
  { title: 'La reception', pieces: [['Ogni mattina Sara ', 'accogliono'], [' gli ospiti, ', 'controlla'], [' le prenotazioni e poi ', 'consegna']], after: ' le chiavi delle camere.', wrong: 0, answer: 'accoglie', reason: 'el sujeto Sara exige la tercera persona singular accoglie' },
  { title: 'Il corso serale', pieces: [['La lezione ', 'comincia'], [' alle sette, noi ', 'prende'], [' posto e il professore ', 'spiega']], after: ' il programma.', wrong: 1, answer: 'prendiamo', reason: 'el sujeto noi exige prendiamo' },
  { title: 'La bicicletta', pieces: [['Prima di uscire io ', 'controllo'], [' le gomme, poi ', 'metto'], [' il casco e ', 'chiude']], after: ' il garage.', wrong: 2, answer: 'chiudo', reason: 'las tres acciones tienen como sujeto io' },
  { title: 'Il pranzo del personale', pieces: [['A mezzogiorno i cuochi ', 'serve'], [' il primo, la cameriera ', 'porta'], [' l’acqua e i clienti ', 'mangiano']], after: ' nella sala grande.', wrong: 0, answer: 'servono', reason: 'i cuochi exige la tercera persona plural servono' },
  { title: 'La segreteria', pieces: [['Voi ', 'compilate'], [' il modulo, lo ', 'firmano'], [' e poi lo ', 'lasciate']], after: ' sulla scrivania.', wrong: 1, answer: 'firmate', reason: 'la secuencia mantiene el sujeto voi' },
  { title: 'Il giardino condiviso', pieces: [['Noi ', 'piantiamo'], [' le erbe aromatiche, Luca le ', 'innaffia'], [' e i vicini ', 'raccoglie']], after: ' le foglie mature.', wrong: 2, answer: 'raccolgono', reason: 'i vicini exige la tercera persona plural raccolgono' },
  { title: 'La visita medica', pieces: [['Il medico ', 'ascoltano'], [' il paziente, gli ', 'misura'], [' la pressione e poi ', 'scrive']], after: ' il referto.', wrong: 0, answer: 'ascolta', reason: 'il medico es singular y exige ascolta' },
  { title: 'Il venerdì in ufficio', pieces: [['Il venerdì noi ', 'finiamo'], [' prima, ', 'spegne'], [' i computer e ', 'usciamo']], after: ' insieme.', wrong: 1, answer: 'spegniamo', reason: 'la secuencia mantiene el sujeto noi' },
  { title: 'La fermata', pieces: [['Tu ', 'guardi'], [' il tabellone, ', 'cerchi'], [' il numero della linea e poi ', 'sale']], after: ' sull’autobus.', wrong: 2, answer: 'sali', reason: 'la secuencia se dirige a tu y exige sali' },
  { title: 'Il museo civico', pieces: [['Le guide ', 'accompagna'], [' i gruppi, ', 'rispondono'], [' alle domande e il custode ', 'chiude']], after: ' le sale alle sei.', wrong: 0, answer: 'accompagnano', reason: 'le guide exige la tercera persona plural accompagnano' },
]

const sequences: EditorialSequenceSeed[] = [
  { events: ['Ogni mattina apro il laboratorio', 'controllo gli strumenti', 'registro la temperatura'], target: 0 },
  { events: ['Marta sceglie una ricetta', 'compra gli ingredienti', 'prepara la cena'], target: 1 },
  { events: ['Il tecnico riceve la richiesta', 'verifica il collegamento', 'invia la soluzione'], target: 2 },
  { events: ['Noi leggiamo le istruzioni', 'montiamo lo scaffale', 'riponiamo i libri'], target: 0 },
  { events: ['Paolo prende il numero', 'aspetta il suo turno', 'entra nello studio'], target: 1 },
  { events: ['Le atlete si riscaldano', 'corrono cinque chilometri', 'fanno stretching'], target: 2 },
  { events: ['Tu accendi il computer', 'apri il programma', 'salvi il documento'], target: 0 },
  { events: ['La guida raduna il gruppo', 'mostra la sala romana', 'accompagna tutti all’uscita'], target: 1 },
  { events: ['I volontari dividono i materiali', 'preparano i pacchi', 'li consegnano alle famiglie'], target: 2 },
  { events: ['Io controllo l’indirizzo', 'prendo la metropolitana', 'raggiungo l’appuntamento'], target: 0 },
]

export const ITALIAN_PRESENTE_EDITORIAL = createItalianEditorialPack({
  slug: 'present',
  tense: 'presente',
  focus: 'Presente',
  rule: 'El presente expresa hábitos, hechos vigentes, instrucciones narradas y acciones actuales.',
  micro,
  long,
  errors,
  sequences,
})
