import type { MockExam } from './types';

// CILS A2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/a2-2/.

const mock: MockExam = {
  id: 'a2-2',
  examSlug: 'cils-celi',
  title: 'CILS A2 – Prova 2',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/a2-2/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Dal medico]
Medico: Allora, signora, come si sente oggi?
Signora: Non molto bene, dottore. Ho mal di gola e un po' di febbre da due giorni.
Medico: Le prescrivo uno sciroppo. Lo prenda tre volte al giorno dopo i pasti. E beva molta acqua calda.

TESTO 2 [Prenotazione al ristorante]
Impiegato: Ristorante La Lanterna, buonasera.
Cliente: Buonasera, vorrei prenotare un tavolo per venerdì sera.
Impiegato: Per quante persone?
Cliente: Per quattro, verso le otto e mezza.
Impiegato: Benissimo, a nome?
Cliente: Rossi. Grazie!

TESTO 3 [In albergo]
Receptionist: Buongiorno, la sua camera è la numero 210, al secondo piano.
Cliente: A che ora è la colazione?
Receptionist: Dalle sette alle dieci, al piano terra. Il wifi è gratuito, la password è sulla chiave.`,
      questions: [
        { type: 'mcq', id: 'cils-a2-2-a1', part: 1, text: 'Quale problema ha la signora?', options: ['Mal di stomaco', 'Mal di schiena', 'Mal di testa', 'Mal di gola e febbre'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-2-a2', part: 1, text: 'Quante volte al giorno deve prendere lo sciroppo?', options: ['Due volte', 'Tre volte', 'Quattro volte', 'Una volta'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-2-a3', part: 1, text: 'Per quante persone è la prenotazione?', options: ['Due', 'Tre', 'Quattro', 'Cinque'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-2-a4', part: 1, text: 'A che piano è la camera del cliente?', options: ['Terzo piano', 'Piano terra', 'Primo piano', 'Secondo piano'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-2-a5', part: 1, text: 'Fino a che ora si può fare colazione?', options: ['Fino alle otto', 'Fino a mezzogiorno', 'Fino alle nove', 'Fino alle dieci'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi il testo e indica se le affermazioni sono vere o false.',
      passage: `UNA NUOVA VITA IN CITTÀ

Mi chiamo Paolo e tre mesi fa mi sono trasferito a Torino per lavoro. All'inizio non è stato facile: non conoscevo nessuno e la città mi sembrava troppo grande. Vivo in un piccolo appartamento vicino al centro, comodo perché posso andare al lavoro a piedi.

Poco a poco ho conosciuto i miei colleghi e alcuni vicini di casa. Il sabato gioco a calcio con una squadra di amici e la domenica visito i musei o vado al parco. Torino è una città elegante, con bei palazzi e tanti caffè storici.

La cosa che mi piace di più è la vista sulle montagne: nelle giornate limpide si vedono le Alpi. Ora mi sento a casa e sono contento della mia scelta.`,
      passageTitle: 'Testo: Una nuova vita in città',
      questions: [
        { type: 'mcq', id: 'cils-a2-2-l1', part: 2, text: 'Paolo si è trasferito a Torino per studiare.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-2-l2', part: 2, text: 'Va al lavoro a piedi.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-2-l3', part: 2, text: 'Il sabato gioca a calcio con gli amici.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-2-l4', part: 2, text: 'A Paolo non piace la sua nuova città.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-2-l5', part: 2, text: 'Dalla città si possono vedere le Alpi nelle giornate limpide.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali',
      instructions: 'Scegli la parola corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-a2-2-g1', part: 3, text: 'Da bambino _____ sempre al parco.', options: ['gioco', 'giocavo', 'giocherò', 'giochi'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-2-g2', part: 3, text: 'Vado _____ Roma in treno.', options: ['per', 'a', 'in', 'da'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-2-g3', part: 3, text: 'Non ho _____ soldi con me.', options: ['più', 'qualche', 'nessuno', 'niente'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-2-g4', part: 3, text: 'Ti va _____ un caffè al bar?', options: ['di prendere', 'prendere', 'per prendere', 'a prendere'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-2-g5', part: 3, text: 'Questi sono i libri _____ ho comprato ieri.', options: ['che', 'chi', 'cui', 'dove'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-2-g6', part: 3, text: 'La lezione comincia _____ nove.', options: ['di', 'a', 'alle', 'in'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-2-g7', part: 3, text: 'Mangio _____ frutta ogni giorno.', options: ['dei', 'delle', 'del', 'della'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-2-g8', part: 3, text: 'Ieri sera _____ molto stanchi.', options: ['eravamo', 'saremo', 'siate', 'siamo'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 60 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-2-w1', part: 4, taskNumber: 1, stimulusLabel: 'Descrizione', stimulus: 'Descrivi la tua città o il tuo quartiere: com\'è, cosa c\'è, cosa ti piace fare e perché.', text: 'Scrivi il testo (almeno 60 parole).', minWords: 60 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un messaggio di almeno 40 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-2-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email breve', stimulus: 'Vuoi prenotare una camera in un albergo in Italia. Scrivi un\'email: indica le date, il tipo di camera e chiedi il prezzo e se c\'è la colazione.', text: 'Scrivi l\'email (almeno 40 parole).', minWords: 40 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-a2-2-s1', part: 6, partNumber: 1, text: 'Parla della tua famiglia e della tua casa.', cueCard: 'Parla di:\n• Quante persone ci sono nella tua famiglia?\n• Com\'è la tua casa (stanze, dove si trova)?\n• Qual è la tua stanza preferita? Perché?', followUp: ['Vivi in città o in campagna? Ti piace? Perché?', 'Come sarebbe la tua casa ideale?'] },
        { type: 'speak', id: 'cils-a2-2-s2', part: 6, partNumber: 2, text: 'Descrivi questa immagine e di\' la tua opinione.', cueCard: 'Immagine: alcune persone che aspettano l\'autobus a una fermata in città.\n\n• Descrivi la scena.\n• Come ti sposti di solito in città? Perché?', followUp: ['Preferisci i mezzi pubblici o la macchina? Perché?', 'Com\'è il traffico nella tua città?'] },
      ],
    },
  ],
};

export default mock;
