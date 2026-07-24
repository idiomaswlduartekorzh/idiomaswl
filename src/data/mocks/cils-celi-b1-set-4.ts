import type { MockExam } from './types';

// CILS Uno B1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b1-4/.

const mock: MockExam = {
  id: 'b1-4',
  examSlug: 'cils-celi',
  title: 'CILS B1 – Uno B1 Set 4',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 240,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b1-4/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a una studentessa Erasmus]
Giornalista: Giulia, hai passato sei mesi a Madrid con il progetto Erasmus. Com'è stata l'esperienza?
Giulia: Fantastica! All'inizio è stato difficile per la lingua, ma dopo poche settimane parlavo spagnolo molto meglio.
Giornalista: Cosa ti è piaciuto di più?
Giulia: Conoscere studenti da tutta Europa. Abbiamo stretto amicizie che dureranno per sempre. E poi viaggiare, scoprire una cultura diversa.
Giornalista: Consiglieresti l'Erasmus ad altri studenti?
Giulia: Assolutamente sì. Ti rende più indipendente e aperto. È un'esperienza che cambia la vita.

TESTO 2 [Messaggio telefonico]
Salve, la chiamo dalla biblioteca comunale. Il libro che aveva prenotato, "Storia dell'arte italiana", è ora disponibile. Può passare a ritirarlo entro una settimana, dal lunedì al sabato, dalle nove alle diciotto. Grazie e buona giornata.

TESTO 3 [Conversazione in ufficio]
Capo: Luca, come procede l'organizzazione della conferenza?
Luca: Bene. Abbiamo confermato la sala e i relatori. Manca solo decidere il catering per il pranzo.
Capo: Quante persone sono previste?
Luca: Circa ottanta iscritti finora, ma le iscrizioni chiudono venerdì.
Capo: Bene, aspettiamo il numero finale prima di prenotare il catering.`,
      questions: [
        { type: 'mcq', id: 'cils-b1-4-a1', part: 1, text: 'Cosa è stato difficile all\'inizio per Giulia?', options: ['Il clima', 'Trovare casa', 'Il cibo', 'La lingua'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-a2', part: 1, text: 'Cosa le è piaciuto di più dell\'Erasmus?', options: ['Conoscere studenti da tutta Europa', 'Il costo basso', 'Il tempo libero', 'Le lezioni'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-a3', part: 1, text: 'Perché chiama la biblioteca?', options: ['Per un ritardo nella consegna', 'Perché il libro prenotato è disponibile', 'Per una multa', 'Per un nuovo orario'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-a4', part: 1, text: 'Entro quando si può ritirare il libro?', options: ['Non c\'è scadenza', 'Entro tre giorni', 'Entro una settimana', 'Entro un mese'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-4-a5', part: 1, text: 'Cosa manca per la conferenza?', options: ['Decidere il catering', 'Stampare i biglietti', 'Confermare la sala', 'Trovare i relatori'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-a6', part: 1, text: 'Quando chiudono le iscrizioni?', options: ['Mercoledì', 'Venerdì', 'Domenica', 'Lunedì'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il valore del tempo libero

Nella società moderna, in cui il lavoro occupa gran parte delle nostre giornate, il tempo libero è diventato un bene prezioso. Sempre più persone, però, faticano a "staccare" davvero: anche durante le vacanze controllano le email di lavoro o rispondono ai messaggi dei colleghi.

Gli psicologi avvertono che questa incapacità di riposare può portare a stress e stanchezza cronica. Il tempo libero, infatti, non serve solo a divertirsi, ma è fondamentale per ricaricare le energie, coltivare le relazioni e dedicarsi alle proprie passioni.

Ognuno vive il tempo libero in modo diverso: c'è chi preferisce attività all'aria aperta, chi ama leggere o guardare film, chi si dedica al volontariato o all'arte. Non esiste un modo giusto o sbagliato: l'importante è scegliere ciò che ci fa stare bene.

Alcune aziende hanno capito quanto sia importante il benessere dei dipendenti e hanno introdotto regole per rispettare il tempo libero, come il "diritto alla disconnessione", che vieta di inviare email di lavoro dopo un certo orario.

---

TESTO B – La musica e il cervello

Ascoltare musica non è solo un piacere: numerose ricerche dimostrano che ha effetti positivi sul nostro cervello. La musica può migliorare l'umore, ridurre lo stress e persino aiutare la concentrazione durante lo studio.

Imparare a suonare uno strumento, poi, offre benefici ancora maggiori. I bambini che studiano musica sviluppano meglio la memoria e la capacità di concentrazione. Anche negli anziani, suonare o cantare aiuta a mantenere la mente attiva.

Non è mai troppo tardi per iniziare: molte persone imparano a suonare uno strumento da adulte, semplicemente per il piacere di farlo. L'importante è la costanza e la passione.`,
      passageTitle: 'Testi: Il tempo libero / La musica',
      questions: [
        { type: 'mcq', id: 'cils-b1-4-l1', part: 2, stimulusLabel: 'Testo A', text: 'Perché molte persone faticano a riposare davvero?', options: ['Perché non hanno hobby', 'Perché continuano a controllare il lavoro anche in vacanza', 'Perché lavorano poco', 'Perché non amano le vacanze'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-l2', part: 2, stimulusLabel: 'Testo A', text: 'A cosa serve il tempo libero secondo gli psicologi?', options: ['A guadagnare soldi', 'Solo a divertirsi', 'A ricaricare le energie e coltivare le relazioni', 'A lavorare di più'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-4-l3', part: 2, stimulusLabel: 'Testo A', text: 'Come si vive il tempo libero, secondo il testo?', options: ['Solo facendo sport', 'Solo riposando', 'In modo uguale per tutti', 'In modo diverso da persona a persona'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-l4', part: 2, stimulusLabel: 'Testo A', text: 'Che cos\'è il "diritto alla disconnessione"?', options: ['Una regola che vieta email di lavoro dopo un certo orario', 'Un obbligo di lavorare di più', 'Una vacanza obbligatoria', 'Un divieto di usare internet'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-l5', part: 2, stimulusLabel: 'Testo A', text: 'Perché alcune aziende rispettano il tempo libero?', options: ['Per risparmiare soldi', 'Perché hanno capito l\'importanza del benessere dei dipendenti', 'Perché è vietato lavorare', 'Per avere più clienti'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-l6', part: 2, stimulusLabel: 'Testo B', text: 'La musica può migliorare l\'umore e ridurre lo stress.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-l7', part: 2, stimulusLabel: 'Testo B', text: 'Studiare musica non ha effetti sulla memoria dei bambini.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-l8', part: 2, stimulusLabel: 'Testo B', text: 'Suonare o cantare aiuta gli anziani a mantenere la mente attiva.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-l9', part: 2, stimulusLabel: 'Testo B', text: 'Da adulti è impossibile imparare a suonare uno strumento.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-l10', part: 2, stimulusLabel: 'Testo B', text: 'Per imparare la musica servono costanza e passione.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b1-4-g1', part: 3, text: 'Mi sembra che loro non _____ d\'accordo.', options: ['saranno', 'erano', 'sono', 'siano'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-g2', part: 3, text: 'Al posto tuo, non _____ così.', options: ['farei', 'farò', 'faccia', 'facevo'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-g3', part: 3, text: 'È la persona più simpatica _____ conosca.', options: ['che', 'di cui', 'a cui', 'come'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-g4', part: 3, text: 'Ho lavorato tutto il giorno, _____ sono stanchissimo.', options: ['purché', 'perciò', 'benché', 'affinché'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-4-g5', part: 3, text: 'Vorrei un caffè. Come lo _____?', options: ['prendere', 'prendendo', 'prende', 'prendi'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-g6', part: 3, text: 'Ci penso io a comprare il pane. Non _____ preoccupare.', options: ['si', 'ci', 'ne', 'ti'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-g7', part: 3, text: 'Studio l\'italiano _____ poter lavorare in Italia.', options: ['per', 'di', 'da', 'a'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-4-g8', part: 3, text: 'Devo _____ una decisione importante.', options: ['mettere', 'fare', 'prendere', 'dare'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-4-g9', part: 3, text: '"Riuscire a fare qualcosa" significa:', options: ['rifiutare', 'dimenticare', 'fallire', 'essere capaci di / farcela'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-4-g10', part: 3, text: 'Ti aiuto _____ tu me lo chieda.', options: ['purché', 'benché', 'sebbene', 'perciò'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-4-w1', part: 4, taskNumber: 1, stimulusLabel: 'Testo argomentativo', stimulus: 'Molte persone non riescono a "staccare" dal lavoro nemmeno nel tempo libero. Scrivi un testo in cui spieghi perché il tempo libero è importante e come, secondo te, si dovrebbe usare.', text: 'Scrivi il testo (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un\'email di almeno 80 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-4-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email', stimulus: 'Vuoi organizzare un fine settimana fuori città con alcuni amici. Scrivi un\'email a un amico: proponi la meta, di\' quando e come andare e chiedi la sua opinione.', text: 'Scrivi l\'email (almeno 80 parole).', minWords: 80 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b1-4-s1', part: 6, partNumber: 1, text: 'Osserva questa immagine, descrivila ed esprimi la tua opinione.', cueCard: 'Immagine: una persona che studia musica suonando la chitarra a casa.\n\n• Descrivi la scena.\n• Ti piace la musica? Suoni uno strumento o ti piacerebbe imparare?\n• Che ruolo ha la musica nella tua vita?', followUp: ['Che tipo di musica preferisci? Perché?', 'Pensi che i bambini dovrebbero studiare musica a scuola? Perché?'] },
        { type: 'speak', id: 'cils-b1-4-s2', part: 6, partNumber: 2, text: 'Parla del tuo tempo libero. Usa la cue card come guida.', cueCard: 'Parla di:\n• Quanto tempo libero hai di solito?\n• Che cosa fai per rilassarti?\n• Riesci a "staccare" dal lavoro o dallo studio?\n• Cosa vorresti fare se avessi più tempo?', followUp: ['Preferisci un tempo libero attivo o tranquillo? Perché?', 'Come è cambiato il tuo modo di passare il tempo libero negli ultimi anni?'] },
      ],
    },
  ],
};

export default mock;
