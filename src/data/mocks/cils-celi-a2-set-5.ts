import type { MockExam } from './types';

// CILS A2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/a2-5/.

const mock: MockExam = {
  id: 'a2-5',
  examSlug: 'cils-celi',
  title: 'CILS A2 – Prova 5',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/a2-5/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [In agenzia di viaggi]
Impiegata: Buongiorno, come posso aiutarla?
Cliente: Vorrei informazioni su un viaggio in Sicilia per la prossima estate.
Impiegata: Abbiamo un pacchetto di una settimana con volo e albergo a Palermo a settecento euro a persona.
Cliente: È compresa anche la colazione?
Impiegata: Sì, mezza pensione: colazione e cena.

TESTO 2 [Annuncio in aeroporto]
Il volo AZ204 per Milano è in ritardo di quaranta minuti a causa del maltempo. La nuova partenza è prevista alle ore 14 e 10 dal gate B7. Ci scusiamo per il disagio.

TESTO 3 [Tra amiche]
Lucia: Che bel vestito! È nuovo?
Marta: Sì, l'ho comprato ieri in centro. Era in saldo, costava solo trenta euro invece di sessanta.
Lucia: Che affare! Ti sta benissimo.
Marta: Grazie! Cercavo qualcosa per il matrimonio di mia cugina.`,
      questions: [
        { type: 'mcq', id: 'cils-a2-5-a1', part: 1, text: 'Dove vuole andare in vacanza il cliente?', options: ['In Sardegna', 'In Sicilia', 'In Toscana', 'In Puglia'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-5-a2', part: 1, text: 'Che cosa comprende la mezza pensione?', options: ['Nessun pasto', 'Solo colazione', 'Colazione e cena', 'Tutti i pasti'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-5-a3', part: 1, text: 'Perché il volo è in ritardo?', options: ['Per un guasto', 'Per troppi passeggeri', 'Per uno sciopero', 'Per il maltempo'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-5-a4', part: 1, text: 'Quanto ha pagato Marta il vestito?', options: ['Trenta euro', 'Venti euro', 'Cinquanta euro', 'Sessanta euro'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-a5', part: 1, text: 'Perché Marta ha comprato il vestito?', options: ['Per una festa di compleanno', 'Per un matrimonio', 'Per il lavoro', 'Per una vacanza'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi il testo e indica se le affermazioni sono vere o false.',
      passage: `IMPARARE UNA LINGUA STRANIERA

Due anni fa ho deciso di imparare l'italiano. All'inizio pensavo fosse una lingua difficile, con tante regole grammaticali. Mi sono iscritta a un corso serale nella mia città e ho cominciato a studiare con impegno.

La cosa più utile per me è stata guardare film e serie in italiano con i sottotitoli. Così ho imparato molte parole nuove e ho capito meglio la pronuncia. Ascolto anche la musica italiana mentre vado al lavoro.

L'estate scorsa sono andata in Italia per la prima volta e ho potuto parlare con la gente del posto. All'inizio ero timida, ma poi mi sono sentita più sicura. Adesso capisco quasi tutto e riesco a comunicare senza problemi. Imparare una lingua richiede tempo e pazienza, ma è una grande soddisfazione.`,
      passageTitle: 'Testo: Imparare una lingua straniera',
      questions: [
        { type: 'mcq', id: 'cils-a2-5-l1', part: 2, text: 'La protagonista studia italiano da due anni.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-l2', part: 2, text: 'Si è iscritta a un corso all\'università.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-5-l3', part: 2, text: 'Guardare film con i sottotitoli l\'ha aiutata molto.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-l4', part: 2, text: 'In Italia si è sentita subito molto sicura di sé.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-5-l5', part: 2, text: 'Secondo lei, imparare una lingua richiede tempo e pazienza.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali',
      instructions: 'Scegli la parola corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-a2-5-g1', part: 3, text: 'L\'anno prossimo _____ un corso di spagnolo.', options: ['farò', 'facessi', 'ho fatto', 'facevo'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-g2', part: 3, text: 'Sono contenta _____ il tuo arrivo.', options: ['per', 'da', 'a', 'di'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-g3', part: 3, text: 'Hai visto Maria? Sì, _____ ho vista stamattina.', options: ['lo', 'la', 'le', 'ne'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-5-g4', part: 3, text: 'Studio l\'italiano _____ tre anni.', options: ['in', 'da', 'per', 'fra'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-5-g5', part: 3, text: 'È la città _____ sono nata.', options: ['quale', 'cui', 'che', 'dove'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-5-g6', part: 3, text: 'Signora, _____ si accomodi pure!', options: ['Lei', 'voi', 'loro', 'tu'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-g7', part: 3, text: 'Non ho capito niente, puoi _____ di nuovo?', options: ['spiegarmelo', 'spiegarmi lo', 'mi spiegare', 'spiega me'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-5-g8', part: 3, text: 'Mi sono alzato _____ presto stamattina.', options: ['assai molto', 'molto', 'tanti', 'troppi'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 60 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-5-w1', part: 4, taskNumber: 1, stimulusLabel: 'Racconto', stimulus: 'Racconta perché hai deciso di studiare l\'italiano: quando hai cominciato, come studi e perché è importante per te.', text: 'Scrivi il testo (almeno 60 parole).', minWords: 60 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un messaggio di almeno 40 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-5-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email', stimulus: 'Vuoi iscriverti a un corso di italiano in Italia. Scrivi un\'email alla scuola: chiedi informazioni sui corsi, gli orari e il prezzo.', text: 'Scrivi l\'email (almeno 40 parole).', minWords: 40 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-a2-5-s1', part: 6, partNumber: 1, text: 'Parla del tuo tempo libero e dei tuoi hobby.', cueCard: 'Parla di:\n• Che cosa fai nel tempo libero?\n• Hai un hobby o uno sport preferito?\n• Con chi passi il tempo libero?\n• Che cosa ti piacerebbe imparare a fare?', followUp: ['Preferisci passare il tempo libero da solo/a o in compagnia? Perché?', 'Come è cambiato il tuo tempo libero negli ultimi anni?'] },
        { type: 'speak', id: 'cils-a2-5-s2', part: 6, partNumber: 2, text: 'Descrivi questa immagine e di\' la tua opinione.', cueCard: 'Immagine: un gruppo di persone in una classe di lingua che studiano insieme.\n\n• Descrivi la scena.\n• Preferisci studiare in gruppo o da solo/a? Perché?', followUp: ['Qual è il modo migliore per imparare una lingua, secondo te?', 'Quali altre lingue ti piacerebbe imparare?'] },
      ],
    },
  ],
};

export default mock;
