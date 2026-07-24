import type { MockExam } from './types';

// CILS Tre C1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/c1-2/.

const mock: MockExam = {
  id: 'cils-c1-2',
  examSlug: 'cils-celi',
  title: 'CILS C1 – Tre C1 Set 2',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 300,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/c1-2/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Lezione universitaria]
Docente: Uno degli equivoci più diffusi riguardo alla lingua è considerarla un sistema fisso, immutabile, di cui esisterebbe una forma "corretta" e tante forme "sbagliate". In realtà, ogni lingua viva è per definizione in continua trasformazione. Le regole grammaticali non precedono l'uso, ma lo seguono: sono descrizioni di come i parlanti effettivamente parlano, non leggi imposte dall'alto. Ciò non significa che tutto sia lecito: esistono registri, contesti, adeguatezze. Ma confondere l'evoluzione naturale di una lingua con la sua "corruzione" è un errore di prospettiva che la linguistica ha da tempo smascherato.

TESTO 2 [Intervista a un urbanista]
Giornalista: Le grandi città attraggono, ma respingono anche. Come si spiega?
Urbanista: È il paradosso della metropoli. Da un lato offrono opportunità, servizi, stimoli culturali ineguagliabili. Dall'altro generano solitudine, costi proibitivi, ritmi disumani. La sfida del nostro secolo sarà rendere le città non solo efficienti, ma vivibili. E vivibilità non significa soltanto verde e piste ciclabili, ma anche tempo, relazioni, possibilità di rallentare. Una città che funziona ma in cui nessuno è felice ha fallito il suo scopo più profondo.

TESTO 3 [Dibattito culturale]
Moderatore: I classici della letteratura vanno ancora letti, o sono ormai superati?
Studioso: Definire un classico "superato" rivela un fraintendimento. Un classico non è un testo vecchio, ma un testo che continua a parlarci, che a ogni rilettura rivela qualcosa di nuovo. Certo, richiede uno sforzo, una mediazione. Ma rinunciare ai classici in nome dell'attualità significherebbe amputare la nostra memoria culturale, condannandoci a un eterno presente senza radici né profondità.`,
      questions: [
        { type: 'mcq', id: 'cils-c1-2-a1', part: 1, text: 'Qual è l\'equivoco diffuso sulla lingua, secondo il docente?', options: ['Che sia inutile', 'Che cambi troppo lentamente', 'Che sia difficile', 'Considerarla un sistema fisso con una sola forma "corretta"'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-2-a2', part: 1, text: 'Che rapporto c\'è tra regole grammaticali e uso, secondo il docente?', options: ['Le regole seguono e descrivono l\'uso', 'Non c\'è alcun rapporto', 'Le regole sono imposte dall\'alto', 'Le regole precedono l\'uso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-2-a3', part: 1, text: 'Qual è il "paradosso della metropoli"?', options: ['È troppo piccola', 'Offre opportunità ma genera solitudine e ritmi disumani', 'Non ha servizi', 'È sempre vuota'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-a4', part: 1, text: 'Cosa significa "vivibilità" per l\'urbanista?', options: ['Solo bassi costi', 'Solo verde e piste ciclabili', 'Anche tempo, relazioni e possibilità di rallentare', 'Solo efficienza'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-a5', part: 1, text: 'Cos\'è un classico, secondo lo studioso?', options: ['Un testo di moda', 'Un testo facile', 'Un testo vecchio e superato', 'Un testo che continua a parlarci e rivela sempre qualcosa di nuovo'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-2-a6', part: 1, text: 'Cosa comporterebbe rinunciare ai classici, secondo lo studioso?', options: ['Amputare la nostra memoria culturale', 'Una maggiore attualità', 'Nessuna conseguenza', 'Un guadagno di tempo'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Elogio della lentezza

In un mondo che celebra la velocità come valore supremo, rivendicare il diritto alla lentezza può sembrare un atto quasi sovversivo. Eppure, un numero crescente di persone comincia a interrogarsi sul prezzo di questa accelerazione perpetua. Fare tutto più in fretta ci permette davvero di vivere meglio, o ci condanna a una superficialità cronica?

La lentezza di cui parliamo non è pigrizia né inefficienza. È piuttosto la capacità di dare a ogni cosa il tempo che merita: assaporare un pasto, ascoltare davvero un interlocutore, portare a termine un lavoro con cura. Attività che, svolte di fretta, perdono gran parte del loro valore. Il movimento "slow", nato in Italia con la filosofia dello "slow food", si è progressivamente esteso a molti ambiti: dal turismo all'educazione, dal design alle relazioni.

I critici obiettano che si tratti di un lusso per privilegiati: chi lotta per la sopravvivenza non può permettersi di rallentare. È un'osservazione seria, che impedisce di trasformare l'elogio della lentezza in una moda superficiale. Ma proprio per questo la questione non è meramente individuale: riguarda l'organizzazione stessa della nostra società, i suoi tempi, le sue priorità.

Rallentare, in fondo, non significa fare meno, ma scegliere con maggiore consapevolezza a cosa dedicare il proprio tempo, la risorsa più preziosa e irrecuperabile che possediamo.

---

TESTO B – La retorica della meritocrazia

Poche parole godono oggi di un consenso così ampio come "meritocrazia". Chi potrebbe opporsi all'idea che le posizioni sociali debbano essere assegnate in base al merito, e non alla nascita o alle raccomandazioni? Eppure, dietro questo concetto apparentemente incontestabile si nascondono ambiguità che vale la pena esaminare.

Il primo problema riguarda la misurazione del merito. Chi stabilisce cosa sia "meritevole"? I criteri non sono mai neutri: premiano certe qualità e ne ignorano altre, riflettendo i valori dominanti di una società. Il secondo problema, più insidioso, è che la retorica meritocratica tende a ignorare i punti di partenza. Affermare che ognuno ottiene ciò che merita implica che chi si trova in basso se lo sia meritato, dimenticando le disuguaglianze di opportunità che precedono ogni competizione.

Così, un'idea nata per combattere il privilegio può paradossalmente legittimarlo, offrendo ai vincitori la comoda convinzione di aver meritato tutto da soli, e ai perdenti il peso di una colpa che spesso non hanno. Riconoscere questi limiti non significa rifiutare il merito, ma smettere di usarlo come alibi per non guardare le disuguaglianze.`,
      passageTitle: 'Testi: Elogio della lentezza / La meritocrazia',
      questions: [
        { type: 'mcq', id: 'cils-c1-2-l1', part: 2, stimulusLabel: 'Testo A', text: 'Come viene definita la lentezza nel testo?', options: ['Pigrizia e inefficienza', 'La capacità di dare a ogni cosa il tempo che merita', 'Un difetto da correggere', 'Una perdita di tempo'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-l2', part: 2, stimulusLabel: 'Testo A', text: 'Dove è nato il movimento "slow"?', options: ['In Giappone', 'In Francia', 'In Italia, con lo "slow food"', 'Negli Stati Uniti'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-l3', part: 2, stimulusLabel: 'Testo A', text: 'Qual è l\'obiezione seria dei critici?', options: ['Che nessuno la pratica', 'Che è illegale', 'Che la lentezza è un lusso per privilegiati', 'Che è troppo veloce'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-l4', part: 2, stimulusLabel: 'Testo A', text: 'Perché la questione non è meramente individuale?', options: ['Perché riguarda l\'organizzazione della società, i suoi tempi e priorità', 'Perché nessuno se ne occupa', 'Perché è impossibile', 'Perché riguarda solo i ricchi'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-2-l5', part: 2, stimulusLabel: 'Testo A', text: 'Cosa significa rallentare, secondo la conclusione?', options: ['Fare meno cose', 'Scegliere con consapevolezza a cosa dedicare il proprio tempo', 'Non lavorare', 'Dormire di più'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-l6', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, la meritocrazia gode oggi di un ampio consenso.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-2-l7', part: 2, stimulusLabel: 'Testo B', text: 'L\'autore sostiene che i criteri del merito sono sempre neutri.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-l8', part: 2, stimulusLabel: 'Testo B', text: 'La retorica meritocratica tende a ignorare i punti di partenza.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo l\'autore, il merito va del tutto rifiutato.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-l10', part: 2, stimulusLabel: 'Testo B', text: 'Un\'idea nata contro il privilegio può paradossalmente legittimarlo.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-c1-2-g1', part: 3, text: 'Checché se ne _____, la situazione è grave.', options: ['dirà', 'diceva', 'dice', 'dica'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-2-g2', part: 3, text: 'Sia pure con qualche riserva, la proposta _____ accolta.', options: ['sarebbe stata', 'sia', 'era', 'fu'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-2-g3', part: 3, text: 'Qualora _____ dubbi, non esiti a contattarci.', options: ['ha', 'avesse', 'avrà', 'aveva'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-2-g4', part: 3, text: 'È una tesi contro _____ si sono levate molte critiche.', options: ['quale', 'che', 'cui', 'la cui'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-g5', part: 3, text: 'A dispetto _____ previsioni, l\'evento fu un successo.', options: ['dalle', 'per le', 'di', 'delle'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-2-g6', part: 3, text: 'Tanto _____ era stanco che si addormentò subito.', options: ['poiché', 'era', 'che', 'perché'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-g7', part: 3, text: 'Non v\'è dubbio _____ la questione sia complessa.', options: ['che', 'di cui', 'come', 'perché'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-2-g8', part: 3, text: '"Insidioso" significa:', options: ['costoso', 'evidente e innocuo', 'nascosto e pericoloso', 'lento'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-g9', part: 3, text: 'La misura, _____ efficace, sollevò molte polemiche.', options: ['poiché', 'cosicché', 'ancorché', 'affinché'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-2-g10', part: 3, text: 'Legittimare una prassi significa:', options: ['vietarla', 'ignorarla', 'complicarla', 'renderla accettabile o giustificarla'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo strutturato di almeno 250 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-2-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio argomentativo', stimulus: 'La nostra società celebra la velocità come valore supremo. Scrivi un saggio argomentativo in cui rifletti sul valore della lentezza e dei ritmi lenti, considerando anche le obiezioni possibili, e sostieni la tua tesi con argomenti ed esempi.', text: 'Scrivi il saggio (almeno 250 parole).', minWords: 250 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 150 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-2-w2', part: 5, taskNumber: 2, stimulusLabel: 'Articolo di opinione', stimulus: 'Una rivista ti chiede un articolo sul tema della "meritocrazia": è davvero il sistema più giusto, o nasconde delle ambiguità? Scrivi un articolo di opinione argomentato, prendendo posizione in modo critico e sfumato.', text: 'Scrivi l\'articolo (almeno 150 parole).', minWords: 150 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-c1-2-s1', part: 6, partNumber: 1, text: 'Presenta e argomenta in modo articolato il tuo punto di vista.', cueCard: 'Tema: "Le grandi città: opportunità o alienazione?"\n\n• Inquadra il "paradosso della metropoli".\n• Presenta tesi e antitesi.\n• Porta esempi concreti.\n• Sostieni una posizione argomentata e sfumata.', followUp: ['Che cosa rende una città davvero "vivibile"?', 'Preferiresti vivere in una grande metropoli o in un centro più piccolo? Perché?'] },
        { type: 'speak', id: 'cils-c1-2-s2', part: 6, partNumber: 2, text: 'Sostieni un confronto dialettico con l\'esaminatore.', cueCard: 'Tema: "La meritocrazia è davvero il criterio più giusto per organizzare la società?"\n\n• il problema della misurazione del merito\n• il ruolo dei punti di partenza e delle disuguaglianze\n• il rischio di legittimare il privilegio\n• la tua posizione, capace di accogliere obiezioni\n\nEspressioni C1: "Bisogna guardarsi dal… " / "Il nodo della questione sta nel…" / "Lungi dall\'essere…"', followUp: ['Come si potrebbe rendere più equa una competizione basata sul merito?', 'Il merito individuale esiste davvero, o siamo sempre figli del contesto?'] },
      ],
    },
  ],
};

export default mock;
