import type { MockExam } from './types';

// CILS Uno B1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b1-5/.

const mock: MockExam = {
  id: 'b1-5',
  examSlug: 'cils-celi',
  title: 'CILS B1 – Uno B1 Set 5',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 240,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b1-5/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a un libraio]
Giornalista: Signor Conti, gestisce una libreria indipendente da vent'anni. Come è cambiato il vostro lavoro?
Conti: Molto. Con internet e gli e-book, molti pensavano che le librerie sarebbero sparite. Invece resistiamo, ma dobbiamo offrire qualcosa in più.
Giornalista: Cioè?
Conti: Organizziamo presentazioni di libri, incontri con gli autori, gruppi di lettura. La nostra libreria è diventata un luogo di incontro, non solo un negozio.
Giornalista: E i giovani leggono ancora?
Conti: Sì, forse più di quanto si creda. Molti giovani cercano il contatto umano, il consiglio del libraio. Questo un sito internet non può darlo.

TESTO 2 [Annuncio in un centro sportivo]
Gentili soci, vi informiamo che la piscina resterà chiusa per manutenzione da lunedì a mercoledì della prossima settimana. Le altre attività, come la palestra e i corsi di yoga, proseguiranno regolarmente. Ci scusiamo per il disagio e vi ringraziamo per la comprensione.

TESTO 3 [Conversazione tra amici]
Anna: Hai deciso cosa fare per le vacanze estive?
Paolo: Sto pensando a un viaggio in treno per l'Europa, con l'Interrail. Un mese, tanti paesi.
Anna: Che bello! Da solo?
Paolo: No, con due amici. Vogliamo visitare Vienna, Praga e Budapest.
Anna: Ti invidio! Io invece resto al mare con la famiglia, come ogni anno.`,
      questions: [
        { type: 'mcq', id: 'cils-b1-5-a1', part: 1, text: 'Cosa temevano molti riguardo alle librerie?', options: ['Che diventassero troppo grandi', 'Che sarebbero sparite a causa di internet', 'Che costassero troppo', 'Che vendessero solo e-book'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-a2', part: 1, text: 'Cosa organizza la libreria del signor Conti?', options: ['Mostre d\'arte', 'Concerti', 'Presentazioni di libri e gruppi di lettura', 'Corsi di cucina'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-5-a3', part: 1, text: 'Perché la piscina resterà chiusa?', options: ['Per uno sciopero', 'Per mancanza di soci', 'Per le vacanze', 'Per manutenzione'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-5-a4', part: 1, text: 'Quali attività proseguono regolarmente?', options: ['La palestra e lo yoga', 'Nessuna attività', 'I corsi per bambini', 'Solo il nuoto'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-a5', part: 1, text: 'Cosa vuole fare Paolo per le vacanze?', options: ['Restare al mare', 'Un viaggio in treno per l\'Europa', 'Andare in montagna', 'Studiare una lingua'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-a6', part: 1, text: 'Con chi viaggia Paolo?', options: ['Con la fidanzata', 'Da solo', 'Con la famiglia', 'Con due amici'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il turismo sostenibile

Negli ultimi anni si parla sempre più di turismo sostenibile, cioè un modo di viaggiare che rispetta l'ambiente, le comunità locali e la cultura dei luoghi visitati. Questa idea nasce come risposta ai problemi causati dal turismo di massa, che in molte città e località ha portato affollamento, aumento dei prezzi e danni all'ambiente.

Il turista sostenibile cerca di ridurre il proprio impatto: sceglie mezzi di trasporto meno inquinanti, come il treno, alloggia in strutture rispettose dell'ambiente e preferisce prodotti e servizi locali. In questo modo sostiene l'economia del posto e vive un'esperienza più autentica.

Molte destinazioni stanno cambiando strategia: invece di puntare solo sul grande numero di visitatori, promuovono un turismo di qualità, che valorizzi le tradizioni e protegga il territorio. Alcune città, per esempio, hanno limitato il numero di turisti nei centri storici per evitare il sovraffollamento.

Naturalmente, il turismo sostenibile richiede uno sforzo da parte di tutti: viaggiatori, aziende e amministrazioni pubbliche. Solo lavorando insieme sarà possibile far sì che il turismo continui a essere una ricchezza, e non un problema.

---

TESTO B – Gli animali domestici e il benessere

Avere un animale domestico non è solo una gioia, ma può fare bene alla salute. Diversi studi dimostrano che chi possiede un cane o un gatto tende a essere meno stressato e più felice. Prendersi cura di un animale, infatti, dà un senso di responsabilità e riduce la solitudine.

I cani, in particolare, spingono i loro padroni a fare più movimento: portarli a passeggio ogni giorno significa camminare regolarmente, con benefici per il cuore e per l'umore. Anche i bambini che crescono con un animale imparano il rispetto e la cura verso gli altri esseri viventi.

Tuttavia, prima di adottare un animale è importante riflettere: serve tempo, spazio e denaro. Un animale non è un giocattolo, ma un essere vivente che ha bisogno di attenzioni per tutta la vita.`,
      passageTitle: 'Testi: Turismo sostenibile / Animali domestici',
      questions: [
        { type: 'mcq', id: 'cils-b1-5-l1', part: 2, stimulusLabel: 'Testo A', text: 'Che cos\'è il turismo sostenibile?', options: ['Un turismo solo in città', 'Un viaggio organizzato', 'Un turismo solo per ricchi', 'Un modo di viaggiare che rispetta ambiente e comunità locali'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-5-l2', part: 2, stimulusLabel: 'Testo A', text: 'Quali problemi ha causato il turismo di massa?', options: ['Affollamento, aumento dei prezzi e danni all\'ambiente', 'Prezzi più bassi', 'Meno inquinamento', 'Meno visitatori'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-l3', part: 2, stimulusLabel: 'Testo A', text: 'Come si comporta il turista sostenibile?', options: ['Sceglie mezzi meno inquinanti e prodotti locali', 'Viaggia sempre in aereo', 'Evita i piccoli paesi', 'Compra solo prodotti stranieri'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-l4', part: 2, stimulusLabel: 'Testo A', text: 'Cosa hanno fatto alcune città per evitare il sovraffollamento?', options: ['Abbassato i prezzi', 'Aumentato gli hotel', 'Limitato il numero di turisti nei centri storici', 'Vietato i treni'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-5-l5', part: 2, stimulusLabel: 'Testo A', text: 'Chi deve impegnarsi per il turismo sostenibile?', options: ['Solo i governi', 'Solo gli alberghi', 'Solo i turisti', 'Viaggiatori, aziende e amministrazioni pubbliche'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-5-l6', part: 2, stimulusLabel: 'Testo B', text: 'Avere un animale domestico può fare bene alla salute.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-l7', part: 2, stimulusLabel: 'Testo B', text: 'Chi ha un animale tende a essere più stressato.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-l8', part: 2, stimulusLabel: 'Testo B', text: 'I cani spingono i padroni a fare più movimento.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-l9', part: 2, stimulusLabel: 'Testo B', text: 'Adottare un animale non richiede tempo né denaro.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-l10', part: 2, stimulusLabel: 'Testo B', text: 'Un animale ha bisogno di attenzioni per tutta la vita.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b1-5-g1', part: 3, text: 'Penso che questa _____ la scelta giusta.', options: ['è', 'sia', 'sarà', 'era'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-g2', part: 3, text: 'Se fossi in te, _____ con lei.', options: ['parli', 'parlavo', 'parlerei', 'parlerò'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-5-g3', part: 3, text: 'Ho visitato molte città, _____ Roma è la mia preferita.', options: ['quindi', 'affinché', 'ma', 'perché'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-5-g4', part: 3, text: 'È un problema _____ non c\'è soluzione.', options: ['a cui', 'di cui', 'per cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-5-g5', part: 3, text: 'Da giovane _____ molto sport.', options: ['ho fatto', 'facevo', 'farò', 'faccia'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-g6', part: 3, text: 'Vai al supermercato? _____ compri il latte?', options: ['Lo', 'Mi', 'Ci', 'Ne'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-g7', part: 3, text: 'Il monumento è visitato _____ migliaia di turisti.', options: ['con', 'per', 'di', 'da'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-5-g8', part: 3, text: 'Ho _____ una bella notizia da darti.', options: ['un', 'un\'', 'uno', 'una'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-g9', part: 3, text: '"Impegnativo" significa:', options: ['facile', 'che richiede molto sforzo', 'noioso', 'economico'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-5-g10', part: 3, text: 'Ti chiamo appena _____ a casa.', options: ['sia arrivato', 'arrivo', 'arriverò', 'arrivassi'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-5-w1', part: 4, taskNumber: 1, stimulusLabel: 'Testo argomentativo', stimulus: 'Il turismo di massa crea molti problemi ad ambiente e città. Scrivi un testo in cui spieghi che cosa significa viaggiare in modo responsabile e cosa può fare ognuno di noi per un turismo più sostenibile.', text: 'Scrivi il testo (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un\'email di almeno 80 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-5-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email', stimulus: 'Hai passato una vacanza in una città italiana e ti sei trovato/a molto bene in un albergo. Scrivi un\'email all\'albergo: ringrazia per l\'ospitalità, di\' cosa ti è piaciuto di più e annuncia che vorresti tornare.', text: 'Scrivi l\'email (almeno 80 parole).', minWords: 80 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b1-5-s1', part: 6, partNumber: 1, text: 'Osserva questa immagine, descrivila ed esprimi la tua opinione.', cueCard: 'Immagine: un gruppo di turisti che visita un centro storico affollato.\n\n• Descrivi la scena.\n• Ti piace viaggiare? Che tipo di viaggi preferisci?\n• Cosa pensi del turismo di massa?', followUp: ['Qual è il viaggio più bello che hai fatto?', 'Come si può viaggiare rispettando l\'ambiente?'] },
        { type: 'speak', id: 'cils-b1-5-s2', part: 6, partNumber: 2, text: 'Parla degli animali domestici. Usa la cue card come guida.', cueCard: 'Parla di:\n• Hai un animale domestico o ne hai avuto uno?\n• Che tipo di animale ti piace di più?\n• Secondo te, quali sono i vantaggi di avere un animale?\n• Ci sono anche degli svantaggi?', followUp: ['Pensi che sia giusto tenere animali in appartamento? Perché?', 'I bambini dovrebbero crescere con un animale? Perché?'] },
      ],
    },
  ],
};

export default mock;
