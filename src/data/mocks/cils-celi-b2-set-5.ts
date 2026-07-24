import type { MockExam } from './types';

// CILS Due B2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b2-5/.

const mock: MockExam = {
  id: 'cils-b2-5',
  examSlug: 'cils-celi',
  title: 'CILS B2 – Due B2 Set 5',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 270,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b2-5/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a una giornalista]
Conduttore: Dottoressa Ferro, oggi tutti possono pubblicare notizie online. È un bene o un male?
Ferro: È un'arma a doppio taglio. Da un lato, la rete ha democratizzato l'informazione: chiunque può raccontare ciò che vede. Dall'altro, è aumentata a dismisura la diffusione di notizie false.
Conduttore: Come possiamo difenderci dalle fake news?
Ferro: Serve spirito critico. Prima di condividere una notizia, bisogna verificarne la fonte, cercare conferme, diffidare dei titoli troppo sensazionali. Purtroppo, spesso condividiamo di getto, spinti dall'emozione.
Conduttore: È un problema di educazione, quindi?
Ferro: Esattamente. L'educazione ai media dovrebbe entrare nelle scuole, come materia fondamentale. Non possiamo lasciare i cittadini indifesi di fronte a un flusso di informazioni così enorme.

TESTO 2 [Annuncio di un festival]
Torna anche quest'anno il festival della scienza, che animerà la città per una settimana con conferenze, laboratori e spettacoli aperti a tutti. L'obiettivo è avvicinare il grande pubblico, e in particolare i più giovani, al mondo della ricerca, in modo divertente e accessibile. Tutti gli eventi sono gratuiti, ma per i laboratori è consigliata la prenotazione, vista la grande richiesta degli anni scorsi.

TESTO 3 [Conversazione tra amici]
Sara: Sto pensando di fare un anno di volontariato all'estero prima di iniziare a lavorare.
Marco: Davvero? Non hai paura di "perdere tempo" rispetto ai tuoi coetanei?
Sara: All'inizio ci pensavo, ma poi ho capito che è il contrario. È un'esperienza che ti forma, ti apre la mente. E poi molti datori di lavoro la considerano un valore aggiunto.
Marco: In effetti, hai ragione. Meglio un'esperienza vera che un anno passato a mandare curriculum senza convinzione.`,
      questions: [
        { type: 'mcq', id: 'cils-b2-5-a1', part: 1, text: 'Perché l\'informazione online è "un\'arma a doppio taglio"?', options: ['È troppo costosa', 'Nessuno la legge', 'È sempre falsa', 'Ha democratizzato l\'informazione ma ha aumentato le notizie false'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-a2', part: 1, text: 'Come ci si difende dalle fake news, secondo la giornalista?', options: ['Con spirito critico, verificando le fonti', 'Condividendo tutto', 'Fidandosi dei titoli', 'Non leggendo nulla'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-5-a3', part: 1, text: 'Cosa propone la giornalista per le scuole?', options: ['Vietare internet', 'Introdurre l\'educazione ai media', 'Eliminare i giornali', 'Meno tecnologia'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-a4', part: 1, text: 'Qual è l\'obiettivo del festival della scienza?', options: ['Raccogliere fondi', 'Vendere libri', 'Avvicinare il pubblico e i giovani alla ricerca', 'Formare ricercatori professionisti'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-5-a5', part: 1, text: 'Cosa vuole fare Sara prima di lavorare?', options: ['Un viaggio di piacere', 'Un corso di lingua', 'Un master', 'Un anno di volontariato all\'estero'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-a6', part: 1, text: 'Come considerano molti datori di lavoro questa esperienza?', options: ['Un valore aggiunto', 'Un problema', 'Un difetto', 'Una perdita di tempo'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il ritorno dell'orto

Coltivare un piccolo orto, un tempo attività tipica delle campagne, è diventato negli ultimi anni una passione diffusa anche in città. Sui balconi, sui terrazzi o negli orti condivisi, sempre più persone dedicano il loro tempo libero a far crescere pomodori, insalata ed erbe aromatiche.

Le ragioni di questa riscoperta sono diverse. C'è chi lo fa per mangiare prodotti più sani e genuini, sapendo esattamente cosa finisce nel piatto. Altri cercano un contatto con la natura, sempre più raro nella vita urbana. Per molti, poi, l'orto è un'attività rilassante, quasi terapeutica, che permette di allontanarsi dallo stress quotidiano.

Un fenomeno interessante è quello degli orti condivisi, spazi verdi pubblici o privati coltivati collettivamente da un gruppo di persone. Oltre a produrre cibo, questi orti creano occasioni di incontro e collaborazione, rafforzando i legami all'interno del quartiere.

Naturalmente, coltivare un orto richiede impegno, pazienza e un po' di competenza. Non tutti hanno il tempo o lo spazio necessari. Ma per chi può permetterselo, è un modo semplice e piacevole per riavvicinarsi a ritmi più naturali e riscoprire il valore delle piccole cose.

---

TESTO B – Viaggiare da soli

Un tempo considerato un'eccezione, oggi il viaggio in solitaria è una scelta sempre più comune, soprattutto tra i giovani e le donne. Partire senza compagnia, verso una destinazione lontana, non è più visto come qualcosa di strano o pericoloso, ma come un'esperienza di crescita personale.

Chi ha provato a viaggiare da solo racconta spesso di aver imparato a contare sulle proprie forze, a prendere decisioni in autonomia e a superare le proprie paure. Senza la "protezione" di un gruppo, si è più aperti verso gli altri e più disposti a fare incontri inaspettati.

Non mancano, ovviamente, le difficoltà: i momenti di solitudine, le questioni pratiche da risolvere da soli, la necessità di prestare maggiore attenzione alla sicurezza. Ma proprio queste sfide, secondo molti viaggiatori, rendono l'esperienza ancora più preziosa e formativa.`,
      passageTitle: 'Testi: Il ritorno dell\'orto / Viaggiare da soli',
      questions: [
        { type: 'mcq', id: 'cils-b2-5-l1', part: 2, stimulusLabel: 'Testo A', text: 'Dove viene praticata oggi la coltivazione dell\'orto?', options: ['Solo in campagna', 'Anche in città, su balconi e terrazzi', 'Solo nei parchi nazionali', 'Solo nelle serre'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-l2', part: 2, stimulusLabel: 'Testo A', text: 'Qual è una delle ragioni della riscoperta dell\'orto?', options: ['Fare esercizio fisico intenso', 'Guadagnare soldi', 'Mangiare prodotti più sani e ritrovare il contatto con la natura', 'Evitare di cucinare'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-5-l3', part: 2, stimulusLabel: 'Testo A', text: 'Cosa sono gli orti condivisi?', options: ['Negozi di frutta', 'Aziende agricole', 'Orti privati recintati', 'Spazi coltivati collettivamente da un gruppo di persone'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-l4', part: 2, stimulusLabel: 'Testo A', text: 'Quale beneficio sociale offrono gli orti condivisi?', options: ['Creano occasioni di incontro e rafforzano i legami di quartiere', 'Riducono le tasse', 'Aumentano il traffico', 'Fanno guadagnare'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-5-l5', part: 2, stimulusLabel: 'Testo A', text: 'Cosa richiede coltivare un orto?', options: ['Molti soldi', 'Impegno, pazienza e un po\' di competenza', 'Nessuno sforzo', 'Un grande terreno'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-l6', part: 2, stimulusLabel: 'Testo B', text: 'Il viaggio in solitaria è oggi una scelta sempre più comune.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-l7', part: 2, stimulusLabel: 'Testo B', text: 'Chi viaggia da solo tende a chiudersi verso gli altri.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-l8', part: 2, stimulusLabel: 'Testo B', text: 'Viaggiare da soli aiuta a contare sulle proprie forze.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, viaggiare da soli non presenta alcuna difficoltà.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-5-l10', part: 2, stimulusLabel: 'Testo B', text: 'Le sfide del viaggio in solitaria lo rendono più formativo.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b2-5-g1', part: 3, text: 'Dubito che la notizia _____ vera.', options: ['sarà', 'era', 'è', 'sia'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-g2', part: 3, text: 'Se solo _____ ascoltato i consigli!', options: ['avrei', 'avevo', 'abbia', 'avessi'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-g3', part: 3, text: 'Chiunque _____ non sarebbe d\'accordo con te.', options: ['sia', 'è', 'fosse', 'sarà'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-5-g4', part: 3, text: 'La persona _____ mi riferisco è il direttore.', options: ['per cui', 'che', 'a cui', 'di cui'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-5-g5', part: 3, text: 'Fatto il lavoro, se _____ tornò a casa soddisfatto.', options: ['ne se', 'se ne', 'ci', 'ne'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-g6', part: 3, text: 'Studia molto, _____ ottenere una borsa di studio.', options: ['benché', 'nonostante', 'sebbene', 'così da'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-5-g7', part: 3, text: 'La proposta è stata accolta _____ entusiasmo.', options: ['di', 'con', 'da', 'per'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-5-g8', part: 3, text: '"Diffidare" di qualcuno significa:', options: ['ignorarlo', 'fidarsi ciecamente', 'non fidarsi / essere sospettosi', 'ammirarlo'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-5-g9', part: 3, text: 'Non è tanto una questione di soldi, _____ di principio.', options: ['come', 'perché', 'quanto', 'che'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-5-g10', part: 3, text: 'Continuò a lavorare _____ fosse tardi.', options: ['perciò', 'affinché', 'poiché', 'sebbene'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo di almeno 180 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-5-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio breve', stimulus: 'Oggi chiunque può pubblicare e condividere notizie online, ma questo ha favorito la diffusione di notizie false. Scrivi un testo argomentativo in cui analizzi il problema delle fake news e proponi come difendersi, esprimendo la tua opinione.', text: 'Scrivi il testo (almeno 180 parole).', minWords: 180 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-5-w2', part: 5, taskNumber: 2, stimulusLabel: 'Lettera formale', stimulus: 'Nel tuo comune c\'è uno spazio verde abbandonato. Scrivi una lettera al sindaco proponendo di trasformarlo in un orto condiviso per gli abitanti del quartiere, spiegando i vantaggi dell\'iniziativa.', text: 'Scrivi la lettera (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b2-5-s1', part: 6, partNumber: 1, text: 'Esponi il tuo punto di vista sul tema seguente in modo articolato.', cueCard: 'Tema: "Con internet chiunque può diffondere notizie: è un progresso o un pericolo?"\n\n• Presenta la questione.\n• Argomenta vantaggi e rischi.\n• Porta esempi concreti.\n• Esprimi e difendi la tua opinione.', followUp: ['Come verifichi se una notizia è vera?', 'Ti è mai capitato di condividere una notizia falsa? Cosa hai imparato?'] },
        { type: 'speak', id: 'cils-b2-5-s2', part: 6, partNumber: 2, text: 'Sostieni una discussione con l\'esaminatore sul tema proposto.', cueCard: 'Tema: "Prendersi un anno per viaggiare o fare volontariato prima di lavorare: opportunità o tempo perso?"\n\n• la crescita personale e le competenze acquisite\n• i timori rispetto alla carriera\n• il valore dell\'esperienza per i datori di lavoro\n• la tua posizione argomentata\n\nEspressioni B2: "A prima vista potrebbe sembrare… ma in realtà…" / "Vale la pena considerare che…" / "In conclusione…"', followUp: ['Ti piacerebbe fare un\'esperienza simile? Perché?', 'Cosa conta di più per te: la sicurezza o le esperienze? Perché?'] },
      ],
    },
  ],
};

export default mock;
