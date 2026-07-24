import type { MockExam } from './types';

// CILS A2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/a2-3/.

const mock: MockExam = {
  id: 'a2-3',
  examSlug: 'cils-celi',
  title: 'CILS A2 – Prova 3',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/a2-3/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [In biglietteria]
Cliente: Buongiorno, vorrei due biglietti per il museo.
Impiegata: Interi o ridotti?
Cliente: Uno intero e uno ridotto per studenti. Quanto costa?
Impiegata: L'intero è dodici euro, il ridotto sette. In totale diciannove euro.

TESTO 2 [Previsioni del tempo]
Radio: Ecco le previsioni per domani. Al Nord cielo nuvoloso con pioggia nel pomeriggio. Al Centro sole e temperature miti. Al Sud bel tempo e clima caldo, con temperature fino a trenta gradi.

TESTO 3 [Tra colleghi]
Giulia: Marco, hai finito il progetto per il cliente?
Marco: Quasi. Mi manca solo l'ultima parte, la finisco domani mattina.
Giulia: Ricordati che la riunione è alle undici. Dobbiamo presentarlo insieme.
Marco: Tranquilla, sarò pronto in tempo.`,
      questions: [
        { type: 'mcq', id: 'cils-a2-3-a1', part: 1, text: 'Quanto costa in totale?', options: ['Dodici euro', 'Sette euro', 'Diciannove euro', 'Ventuno euro'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-3-a2', part: 1, text: 'Che tempo farà domani al Nord?', options: ['Nebbia', 'Sole', 'Nuvoloso con pioggia', 'Neve'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-3-a3', part: 1, text: 'Dove farà più caldo?', options: ['Al Sud', 'Ovunque uguale', 'Al Nord', 'Al Centro'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-a4', part: 1, text: 'Quando finisce Marco il progetto?', options: ['Domani mattina', 'Domani sera', 'Dopodomani', 'Oggi'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-a5', part: 1, text: 'A che ora è la riunione?', options: ['Alle nove', 'Alle dieci', 'Alle undici', 'A mezzogiorno'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi il testo e indica se le affermazioni sono vere o false.',
      passage: `IL MIO LAVORO DEI SOGNI

Da quando ero piccola volevo fare la veterinaria. Amo gli animali e mi piace prendermi cura di loro. Dopo il liceo ho studiato cinque anni all'università e poi ho fatto un anno di pratica in una clinica.

Adesso lavoro in un piccolo ambulatorio veterinario in campagna. Ogni giorno visito cani, gatti, ma anche animali da fattoria come mucche e cavalli. Il lavoro è faticoso e a volte devo uscire anche di notte per un'emergenza, ma sono felice.

La parte più bella è quando riesco a guarire un animale malato e vedo la gioia dei proprietari. Non cambierei il mio lavoro per niente al mondo.`,
      passageTitle: 'Testo: Il mio lavoro dei sogni',
      questions: [
        { type: 'mcq', id: 'cils-a2-3-l1', part: 2, text: 'La protagonista voleva fare la veterinaria fin da piccola.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-l2', part: 2, text: 'Ha studiato solo due anni all\'università.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-l3', part: 2, text: 'Lavora in un ambulatorio in città.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-l4', part: 2, text: 'A volte lavora anche di notte per le emergenze.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-3-l5', part: 2, text: 'Vorrebbe cambiare lavoro.', options: ['Falso', 'Vero'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali',
      instructions: 'Scegli la parola corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-a2-3-g1', part: 3, text: 'Se domani fa bel tempo, _____ al mare.', options: ['andassi', 'sono andato', 'andavo', 'vado'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-3-g2', part: 3, text: 'Ho comprato un regalo _____ mia madre.', options: ['per', 'da', 'di', 'a'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-g3', part: 3, text: 'Non conosco _____ in questa città.', options: ['qualcuno', 'nessuno', 'niente', 'ognuno'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-3-g4', part: 3, text: 'Il film è _____ interessante del libro.', options: ['così', 'più', 'molto', 'tanto'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-3-g5', part: 3, text: 'A che ora ti _____ la mattina?', options: ['svegliano', 'svegliamo', 'svegli', 'sveglia'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-3-g6', part: 3, text: 'Vieni con noi? Sì, _____ vengo volentieri.', options: ['ci', 'ne', 'la', 'lo'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-g7', part: 3, text: 'Ho mangiato una pizza _____ una birra.', options: ['e', 'ma', 'però', 'oppure'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-3-g8', part: 3, text: 'Domani _____ dal dentista.', options: ['andassi', 'sono andato', 'andavo', 'devo andare'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 60 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-3-w1', part: 4, taskNumber: 1, stimulusLabel: 'Racconto', stimulus: 'Racconta come è stata la tua ultima vacanza o il tuo ultimo fine settimana: dove sei andato/a, con chi, che cosa hai fatto.', text: 'Scrivi il testo (almeno 60 parole).', minWords: 60 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un messaggio di almeno 40 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-3-w2', part: 5, taskNumber: 2, stimulusLabel: 'Messaggio', stimulus: 'Un tuo amico è malato. Scrivigli un messaggio: chiedi come sta, dagli un consiglio e proponi di andarlo a trovare.', text: 'Scrivi il messaggio (almeno 40 parole).', minWords: 40 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-a2-3-s1', part: 6, partNumber: 1, text: 'Parla del tuo lavoro o dei tuoi studi.', cueCard: 'Parla di:\n• Che cosa studi o che lavoro fai?\n• Perché hai scelto questo?\n• Che cosa ti piace e cosa non ti piace?\n• Che cosa vuoi fare in futuro?', followUp: ['Qual è il lavoro dei tuoi sogni? Perché?', 'È importante studiare le lingue? Perché?'] },
        { type: 'speak', id: 'cils-a2-3-s2', part: 6, partNumber: 2, text: 'Descrivi questa immagine e di\' la tua opinione.', cueCard: 'Immagine: una persona che lavora al computer da casa.\n\n• Descrivi la scena.\n• Ti piacerebbe lavorare da casa? Perché sì o perché no?', followUp: ['Quali sono i vantaggi e gli svantaggi del lavoro da casa?', 'Usi molto il computer? Per quali cose?'] },
      ],
    },
  ],
};

export default mock;
