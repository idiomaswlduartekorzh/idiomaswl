import type { MockExam } from './types';

// CILS A2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/a2-1/.

const mock: MockExam = {
  id: 'a2-1',
  examSlug: 'cils-celi',
  title: 'CILS A2 – Prova 1',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/a2-1/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Alla stazione]
Annuncio: Attenzione. Il treno regionale per Firenze delle ore 10 e 15 partirà dal binario 4, e non dal binario 2. Ripetiamo: binario 4. Ci scusiamo per il disagio.

TESTO 2 [Al telefono]
Anna: Pronto, ciao Luca! Senti, ci vediamo domani al cinema?
Luca: Ciao Anna! Domani non posso, lavoro fino alle otto. Che ne dici di sabato pomeriggio?
Anna: Perfetto! Alle quattro davanti al cinema Odeon?
Luca: Va bene, a sabato!

TESTO 3 [Al supermercato]
Commessa: Buongiorno, desidera?
Cliente: Buongiorno, vorrei un chilo di mele e due etti di prosciutto.
Commessa: Ecco a lei. Altro?
Cliente: No, grazie. Quanto le devo?
Commessa: Sono otto euro e cinquanta.`,
      questions: [
        { type: 'mcq', id: 'cils-a2-1-a1', part: 1, text: 'Da quale binario parte il treno per Firenze?', options: ['Binario 2', 'Binario 4', 'Binario 10', 'Binario 15'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-1-a2', part: 1, text: 'Quando si vedono Anna e Luca?', options: ['Domenica', 'Domani al cinema', 'Sabato pomeriggio', 'Sabato mattina'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-1-a3', part: 1, text: 'Dove si incontrano?', options: ['Al supermercato', 'A casa di Anna', 'Davanti al cinema Odeon', 'Alla stazione'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-1-a4', part: 1, text: 'Quanto spende il cliente al supermercato?', options: ['Otto euro e cinquanta', 'Dieci euro', 'Due euro', 'Cinque euro'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-1-a5', part: 1, text: 'Che cosa compra il cliente?', options: ['Pane e latte', 'Mele e prosciutto', 'Pasta e vino', 'Frutta e pesce'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi il testo e indica se le affermazioni sono vere o false.',
      passage: `IL MERCATO DEL SABATO

Ogni sabato mattina, nella piazza principale del mio paese, c'è il mercato. Comincia alle otto e finisce verso l'una. Ci sono molte bancarelle: alcune vendono frutta e verdura fresca, altre vestiti, scarpe e oggetti per la casa.

Io ci vado quasi ogni settimana con mia madre. Compriamo sempre la frutta dal signor Giovanni, che ha i prodotti più freschi e i prezzi più bassi. A volte prendiamo anche il formaggio e il pane.

Il mercato è un luogo molto vivace: la gente parla, i venditori chiamano i clienti e c'è sempre un buon profumo di cibo. Dopo la spesa, io e mia madre andiamo al bar della piazza a bere un caffè. È il nostro momento preferito del fine settimana.`,
      passageTitle: 'Testo: Il mercato del sabato',
      questions: [
        { type: 'mcq', id: 'cils-a2-1-l1', part: 2, text: 'Il mercato si tiene ogni sabato mattina.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-1-l2', part: 2, text: 'Al mercato si vende solo frutta e verdura.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-1-l3', part: 2, text: 'La protagonista va al mercato con sua madre.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-1-l4', part: 2, text: 'Il signor Giovanni ha i prezzi più alti.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-1-l5', part: 2, text: 'Dopo la spesa vanno al bar a bere un caffè.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali',
      instructions: 'Scegli la parola corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-a2-1-g1', part: 3, text: 'Ieri _____ al cinema con i miei amici.', options: ['andrò', 'vada', 'vado', 'sono andato'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-1-g2', part: 3, text: 'Mi piace molto _____ musica italiana.', options: ['il', 'le', 'lo', 'la'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-1-g3', part: 3, text: 'Vado a scuola _____ piedi.', options: ['in', 'a', 'con', 'per'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-1-g4', part: 3, text: 'Questa è la casa _____ mio nonno.', options: ['in', 'di', 'da', 'a'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-1-g5', part: 3, text: 'Hai comprato il pane? Sì, _____ ho comprato.', options: ['li', 'ne', 'la', 'lo'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-1-g6', part: 3, text: 'Domani _____ una gita in montagna.', options: ['ho fatto', 'faremo', 'facessi', 'facevo'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-1-g7', part: 3, text: 'Marta è più alta _____ sua sorella.', options: ['di', 'che', 'come', 'da'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-1-g8', part: 3, text: 'Devo _____ una telefonata alla mamma.', options: ['dare', 'dire', 'fare', 'mettere'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 60 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-1-w1', part: 4, taskNumber: 1, stimulusLabel: 'Cartolina / messaggio', stimulus: 'Sei in vacanza in una città italiana. Scrivi una cartolina a un amico: dove sei, con chi, che cosa fai e come stai.', text: 'Scrivi la cartolina (almeno 60 parole).', minWords: 60 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un messaggio di almeno 40 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-1-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email breve', stimulus: 'Un amico ti invita a cena sabato sera, ma tu non puoi andare. Scrivigli un\'email: ringrazia, spiega perché non puoi e proponi un altro giorno.', text: 'Scrivi l\'email (almeno 40 parole).', minWords: 40 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-a2-1-s1', part: 6, partNumber: 1, text: 'Presentati e parla della tua giornata tipica.', cueCard: 'Parla di te:\n• Come ti chiami e di dove sei?\n• Che cosa fai (studi/lavori)?\n• Com\'è una tua giornata normale?\n• Che cosa fai nel tempo libero?', followUp: ['Qual è il tuo giorno preferito della settimana? Perché?', 'Che cosa fai di solito il fine settimana?'] },
        { type: 'speak', id: 'cils-a2-1-s2', part: 6, partNumber: 2, text: 'Descrivi questa immagine e di\' cosa preferisci.', cueCard: 'Immagine: una famiglia che fa la spesa al mercato all\'aperto.\n\n• Descrivi le persone e il luogo.\n• Preferisci fare la spesa al mercato o al supermercato? Perché?', followUp: ['Che cosa compri di solito quando fai la spesa?', 'Ti piace cucinare? Che cosa sai preparare?'] },
      ],
    },
  ],
};

export default mock;
