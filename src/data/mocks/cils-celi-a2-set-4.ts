import type { MockExam } from './types';

// CILS A2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/a2-4/.

const mock: MockExam = {
  id: 'a2-4',
  examSlug: 'cils-celi',
  title: 'CILS A2 – Prova 4',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 150,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/a2-4/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [In palestra]
Istruttore: Buongiorno! Vuole iscriversi ai nostri corsi?
Cliente: Sì, mi interessa il corso di nuoto. Quando si tiene?
Istruttore: Il lunedì e il mercoledì, dalle diciotto alle diciannove. L'abbonamento mensile costa quaranta euro.

TESTO 2 [Messaggio in segreteria]
Ciao Sara, sono Elena. Ti chiamo per dirti che la festa di domani è rimandata a sabato prossimo, perché Giada è ancora in viaggio. Fammi sapere se puoi venire. A presto!

TESTO 3 [Alla posta]
Impiegato: Desidera?
Cliente: Vorrei spedire questo pacco in Francia.
Impiegato: Con la spedizione normale arriva in una settimana e costa quindici euro. Con quella veloce, in tre giorni, ne costa venticinque.
Cliente: Vada per quella veloce, grazie.`,
      questions: [
        { type: 'mcq', id: 'cils-a2-4-a1', part: 1, text: 'Quando si tiene il corso di nuoto?', options: ['Solo il sabato', 'Ogni giorno', 'Martedì e giovedì', 'Lunedì e mercoledì'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-4-a2', part: 1, text: 'Quanto costa l\'abbonamento mensile?', options: ['Trenta euro', 'Quaranta euro', 'Cinquanta euro', 'Venti euro'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-4-a3', part: 1, text: 'Perché la festa è rimandata?', options: ['Perché piove', 'Perché Giada è in viaggio', 'Perché Sara è malata', 'Perché il locale è chiuso'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-4-a4', part: 1, text: 'Dove vuole spedire il pacco il cliente?', options: ['In Italia', 'In Spagna', 'In Germania', 'In Francia'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-4-a5', part: 1, text: 'Quale spedizione sceglie il cliente?', options: ['Non spedisce', 'Ritira di persona', 'Normale, una settimana', 'Veloce, tre giorni'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi il testo e indica se le affermazioni sono vere o false.',
      passage: `LA PASSIONE PER LA CUCINA

Da qualche anno la cucina è diventata la mia più grande passione. Tutto è cominciato quando mia nonna mi ha insegnato a preparare la pasta fatta in casa. All'inizio non ero bravo, ma con il tempo sono migliorato molto.

Adesso, ogni fine settimana, invito amici a casa e preparo per loro piatti nuovi. Mi piace soprattutto la cucina regionale italiana: ogni regione ha ricette diverse e ingredienti particolari. La settimana scorsa ho preparato le lasagne, e tutti hanno fatto il bis!

Il mio sogno è aprire un giorno un piccolo ristorante dove servire piatti tradizionali fatti con prodotti freschi e locali. Per ora cucino solo per gli amici, ma chissà cosa succederà in futuro.`,
      passageTitle: 'Testo: La passione per la cucina',
      questions: [
        { type: 'mcq', id: 'cils-a2-4-l1', part: 2, text: 'La nonna gli ha insegnato a fare la pasta.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-4-l2', part: 2, text: 'È sempre stato bravo a cucinare fin dall\'inizio.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-4-l3', part: 2, text: 'Ogni fine settimana invita amici a casa.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-4-l4', part: 2, text: 'La settimana scorsa nessuno ha mangiato le lasagne.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-4-l5', part: 2, text: 'Il suo sogno è aprire un ristorante.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali',
      instructions: 'Scegli la parola corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-a2-4-g1', part: 3, text: 'Mentre _____, è suonato il telefono.', options: ['cucino', 'cucinavo', 'cucinerò', 'ho cucinato'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-4-g2', part: 3, text: 'Vado in vacanza _____ agosto.', options: ['per', 'a', 'in', 'di'], answer: 2 },
        { type: 'mcq', id: 'cils-a2-4-g3', part: 3, text: 'Ho telefonato a Luca ma non _____ ha risposto.', options: ['ne', 'ci', 'lo', 'gli'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-4-g4', part: 3, text: 'Questa torta è buonissima! _____ vuoi ancora un po\'?', options: ['Ne', 'Lo', 'Ci', 'La'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-4-g5', part: 3, text: 'Preferisco il tè _____ caffè.', options: ['al', 'del', 'che il', 'come il'], answer: 0 },
        { type: 'mcq', id: 'cils-a2-4-g6', part: 3, text: 'Ragazzi, _____ i compiti prima di uscire!', options: ['fanno', 'fate', 'fai', 'facciamo'], answer: 1 },
        { type: 'mcq', id: 'cils-a2-4-g7', part: 3, text: 'Non sono ancora arrivati, forse _____ persi.', options: ['hanno', 'erano', 'sono', 'si sono'], answer: 3 },
        { type: 'mcq', id: 'cils-a2-4-g8', part: 3, text: 'Vorrei una camera _____ due persone.', options: ['per', 'a', 'da', 'di'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 60 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-4-w1', part: 4, taskNumber: 1, stimulusLabel: 'Descrizione', stimulus: 'Descrivi il tuo piatto o il tuo cibo preferito: che cos\'è, quando lo mangi, chi lo prepara e perché ti piace.', text: 'Scrivi il testo (almeno 60 parole).', minWords: 60 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un messaggio di almeno 40 parole.',
      questions: [
        { type: 'write', id: 'cils-a2-4-w2', part: 5, taskNumber: 2, stimulusLabel: 'Invito', stimulus: 'Vuoi invitare un amico a cena a casa tua sabato sera. Scrivigli un messaggio: invitalo, di\' a che ora e cosa preparerai, e chiedi se ha allergie.', text: 'Scrivi il messaggio (almeno 40 parole).', minWords: 40 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-a2-4-s1', part: 6, partNumber: 1, text: 'Parla delle tue abitudini alimentari.', cueCard: 'Parla di:\n• Che cosa mangi di solito durante la giornata?\n• Ti piace cucinare? Che cosa sai preparare?\n• Qual è il tuo piatto preferito?\n• Mangi spesso al ristorante?', followUp: ['Nel tuo paese quali sono i piatti tipici?', 'Pensi di mangiare in modo sano? Perché?'] },
        { type: 'speak', id: 'cils-a2-4-s2', part: 6, partNumber: 2, text: 'Descrivi questa immagine e di\' la tua opinione.', cueCard: 'Immagine: alcuni amici che cenano insieme in un ristorante.\n\n• Descrivi la scena.\n• Preferisci mangiare a casa o al ristorante? Perché?', followUp: ['Con chi ti piace mangiare di più? Perché?', 'Qual è stata l\'ultima cena speciale che hai fatto?'] },
      ],
    },
  ],
};

export default mock;
