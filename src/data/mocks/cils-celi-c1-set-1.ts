import type { MockExam } from './types';

// CILS Tre C1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/c1-1/.

const mock: MockExam = {
  id: 'cils-c1-1',
  examSlug: 'cils-celi',
  title: 'CILS C1 – Tre C1 Set 1',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 300,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/c1-1/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Conferenza di un filosofo]
Relatore: Quando parliamo di "progresso", diamo per scontato che si tratti di qualcosa di positivo. Eppure, la storia ci insegna che ogni avanzamento tecnologico porta con sé non solo benefici, ma anche costi nascosti, spesso pagati dalle generazioni successive. Il vero interrogativo non è se il progresso sia buono o cattivo in sé, ma chi ne stabilisce la direzione e chi ne raccoglie i frutti. Delegare ciecamente alla tecnica la definizione del nostro futuro significa rinunciare a una responsabilità che dovrebbe restare politica ed etica. Non è la macchina a doverci dire dove andare: siamo noi a doverlo decidere, con lucidità e senso critico.

TESTO 2 [Intervista a un'economista]
Giornalista: Si parla molto di "decrescita". È un'utopia irrealizzabile?
Economista: È un concetto frainteso. Non significa tornare a vivere nelle caverne, come si dice per screditarlo, ma ripensare il rapporto tra benessere e crescita economica. Abbiamo confuso il "di più" con il "meglio". La sfida è immaginare una prosperità che non dipenda dal consumo illimitato di risorse finite. È complesso, certo, ma non più utopico di quanto lo fosse, un tempo, l'idea di una società senza schiavitù.

TESTO 3 [Dibattito sull'arte]
Moderatore: L'arte contemporanea è spesso accusata di essere incomprensibile. È una critica fondata?
Critico: In parte. Ma attenzione: la difficoltà non è di per sé un difetto. Anche la musica di Bach, oggi amatissima, richiedeva un ascolto colto. Il problema semmai è un altro: quando la complessità diventa un pretesto per nascondere il vuoto, per mascherare l'assenza di contenuto dietro un linguaggio criptico. Distinguere la vera ricerca dalla mera provocazione è il compito, non sempre facile, di chi guarda.`,
      questions: [
        { type: 'mcq', id: 'cils-c1-1-a1', part: 1, text: 'Qual è il vero interrogativo sul progresso, secondo il filosofo?', options: ['Se sia buono o cattivo in sé', 'Chi ne stabilisce la direzione e chi ne raccoglie i frutti', 'Quanto costi', 'Se sia veloce'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-a2', part: 1, text: 'Cosa significa, secondo il filosofo, delegare il futuro alla tecnica?', options: ['Un atto di saggezza', 'Progredire più in fretta', 'Rinunciare a una responsabilità etica e politica', 'Risparmiare risorse'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-a3', part: 1, text: 'Come viene spesso frainteso il concetto di "decrescita"?', options: ['Come una teoria economica ricca', 'Come un\'utopia già realizzata', 'Come un ritorno a vivere nelle caverne', 'Come un aumento dei consumi'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-a4', part: 1, text: 'Cosa propone realmente la decrescita, secondo l\'economista?', options: ['Ripensare il rapporto tra benessere e crescita', 'Consumare di più', 'Tornare al passato', 'Abolire l\'economia'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-a5', part: 1, text: 'Secondo il critico, la difficoltà nell\'arte è:', options: ['sempre un difetto', 'non necessariamente un difetto', 'sempre una virtù', 'irrilevante'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-a6', part: 1, text: 'Qual è il vero problema secondo il critico?', options: ['Quando nessuno la guarda', 'Quando la complessità nasconde il vuoto di contenuto', 'Quando l\'arte è troppo semplice', 'Quando l\'arte costa troppo'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – L'illusione della memoria perfetta

Viviamo nell'epoca della registrazione totale. Ogni momento può essere fotografato, filmato, archiviato; ogni informazione è a portata di clic. Paradossalmente, però, questa disponibilità illimitata di memoria esterna sembra indebolire la nostra memoria interiore. Perché sforzarsi di ricordare un numero, una data, un percorso, se un dispositivo lo fa per noi?

Alcuni studiosi parlano di "amnesia digitale": la tendenza a dimenticare informazioni che sappiamo essere facilmente reperibili. Non si tratta necessariamente di un male: la mente, liberata da compiti mnemonici, potrebbe dedicarsi ad attività più complesse. Il rischio, tuttavia, è più sottile. La memoria non è un semplice magazzino di dati, ma il tessuto stesso della nostra identità. Ricordare non significa solo conservare informazioni, ma dare loro un senso, collegarle, rielaborarle.

Delegare interamente il ricordo alle macchine significherebbe rinunciare a questo lavoro di rielaborazione, che è profondamente umano. C'è poi una questione di potere: chi controlla gli archivi digitali controlla, in un certo senso, la nostra memoria collettiva. Ciò che viene cancellato, o semplicemente reso irreperibile, rischia di sparire dalla coscienza comune.

La vera sfida, dunque, non è scegliere tra memoria umana e memoria digitale, ma imparare a farle convivere, senza che la seconda atrofizzi la prima. Ricordare resta un atto di libertà.

---

TESTO B – Contro la tirannia dell'ottimismo

Nella cultura contemporanea, l'ottimismo è diventato quasi un dovere. Ci viene ripetuto di "pensare positivo", di trasformare ogni difficoltà in opportunità, di non lamentarci mai. Chi esprime dubbi o preoccupazioni viene bollato come disfattista. Eppure, questa "tirannia della positività" nasconde alcune insidie.

Innanzitutto, imporre l'ottimismo a tutti i costi può trasformarsi in una negazione della realtà. Non tutti i problemi sono opportunità travestite; alcune situazioni sono semplicemente dolorose, e riconoscerlo non è debolezza, ma onestà. Costringere una persona in difficoltà a "vedere il lato positivo" può farla sentire, oltre che infelice, anche colpevole della propria infelicità.

Inoltre, un ottimismo acritico rischia di paralizzare l'azione. Se tutto andrà bene comunque, perché impegnarsi a cambiare le cose? Una dose di sano pessimismo, al contrario, può spingerci a prevedere i rischi e a prepararci ad affrontarli. Non si tratta di coltivare la disperazione, ma di rivendicare il diritto a uno sguardo lucido, capace di accogliere anche il negativo senza esserne travolto.`,
      passageTitle: 'Testi: La memoria / L\'ottimismo',
      questions: [
        { type: 'mcq', id: 'cils-c1-1-l1', part: 2, stimulusLabel: 'Testo A', text: 'Qual è il paradosso descritto nel testo?', options: ['I dispositivi non funzionano', 'Nessuno usa la tecnologia', 'La memoria esterna illimitata sembra indebolire quella interiore', 'Ricordiamo sempre di più'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-l2', part: 2, stimulusLabel: 'Testo A', text: 'Che cos\'è la "amnesia digitale"?', options: ['La tendenza a dimenticare informazioni facilmente reperibili', 'Un guasto dei computer', 'La perdita totale della memoria', 'Una malattia grave'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-l3', part: 2, stimulusLabel: 'Testo A', text: 'Perché la memoria non è un semplice magazzino di dati?', options: ['Perché è illimitata', 'Perché è il tessuto della nostra identità e dà senso alle informazioni', 'Perché è digitale', 'Perché è inutile'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-l4', part: 2, stimulusLabel: 'Testo A', text: 'Quale questione di potere solleva il testo?', options: ['Le macchine sono più intelligenti', 'Chi controlla gli archivi controlla la memoria collettiva', 'I dispositivi costano troppo', 'Nessuno può ricordare'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-l5', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la "vera sfida" secondo l\'autore?', options: ['Ricordare tutto', 'Cancellare gli archivi', 'Eliminare la memoria digitale', 'Far convivere memoria umana e digitale senza atrofizzare la prima'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-1-l6', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, oggi l\'ottimismo è diventato quasi un dovere.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-l7', part: 2, stimulusLabel: 'Testo B', text: 'L\'autore ritiene che tutti i problemi siano opportunità travestite.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-l8', part: 2, stimulusLabel: 'Testo B', text: 'Imporre l\'ottimismo può far sentire una persona colpevole della propria infelicità.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo l\'autore, un ottimismo acritico stimola sempre all\'azione.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-l10', part: 2, stimulusLabel: 'Testo B', text: 'L\'autore rivendica il diritto a uno sguardo lucido, capace di accogliere il negativo.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-c1-1-g1', part: 3, text: 'Per quanto ci si _____, non tutti i problemi hanno soluzione.', options: ['sforza', 'sforzi', 'sforzerà', 'sforzava'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-g2', part: 3, text: 'Ove _____ necessario, interverremo tempestivamente.', options: ['era', 'è', 'fosse', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-g3', part: 3, text: 'Non che non _____ ragione, ma il tono era eccessivo.', options: ['aveva', 'avrà', 'ha', 'avesse'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-1-g4', part: 3, text: 'Si tratta di una tesi _____ fondamento è tutt\'altro che solido.', options: ['il cui', 'di cui', 'per cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-g5', part: 3, text: 'Fosse anche l\'ultima cosa che faccio, _____ a fondo la questione.', options: ['chiarisco', 'chiarirò', 'chiarissi', 'chiarivo'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-1-g6', part: 3, text: 'Lungi _____ risolvere il problema, la misura lo ha aggravato.', options: ['del', 'da', 'dal', 'di'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-g7', part: 3, text: 'La proposta, _____ quanto ambiziosa, non è irrealizzabile.', options: ['sebbene', 'nonostante', 'per', 'benché'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-1-g8', part: 3, text: '"Atrofizzare" una facoltà significa:', options: ['farla indebolire per mancanza di uso', 'trasferirla', 'ignorarla del tutto', 'potenziarla'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-g9', part: 3, text: 'Il fenomeno va contestualizzato, _____ si rischia di fraintenderlo.', options: ['altrimenti', 'perciò', 'infatti', 'cioè'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-1-g10', part: 3, text: 'Il suo intervento fu tanto brillante _____ inatteso.', options: ['di', 'quanto', 'che', 'come'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo strutturato di almeno 250 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-1-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio argomentativo', stimulus: 'Diamo spesso per scontato che il progresso tecnologico sia sempre positivo. Scrivi un saggio argomentativo in cui rifletti in modo critico sul concetto di progresso, considerandone benefici e costi nascosti, e sostieni con argomenti la tua tesi.', text: 'Scrivi il saggio (almeno 250 parole).', minWords: 250 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 150 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-1-w2', part: 5, taskNumber: 2, stimulusLabel: 'Recensione / Articolo di opinione', stimulus: 'Una rivista culturale ti chiede un articolo di opinione sul tema: "L\'arte contemporanea è davvero incomprensibile, o siamo noi a non saperla leggere?". Scrivi il tuo articolo, prendendo posizione in modo argomentato e sfumato.', text: 'Scrivi l\'articolo (almeno 150 parole).', minWords: 150 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-c1-1-s1', part: 6, partNumber: 1, text: 'Presenta e argomenta in modo articolato il tuo punto di vista.', cueCard: 'Tema: "La memoria digitale ci sta rendendo più liberi o più fragili?"\n\n• Inquadra la questione in modo critico.\n• Presenta tesi e antitesi.\n• Porta esempi ed eventuali riferimenti culturali.\n• Sostieni una posizione argomentata e sfumata.', followUp: ['Fino a che punto ci si può fidare della memoria delle macchine?', 'Chi dovrebbe controllare gli archivi digitali della nostra memoria collettiva?'] },
        { type: 'speak', id: 'cils-c1-1-s2', part: 6, partNumber: 2, text: 'Sostieni un confronto dialettico con l\'esaminatore.', cueCard: 'Tema: "La tirannia dell\'ottimismo: dobbiamo sempre pensare positivo?"\n\n• l\'ottimismo come dovere sociale\n• i rischi della negazione della realtà\n• il valore di uno sguardo lucido e critico\n• la tua posizione, argomentata e capace di accogliere obiezioni\n\nEspressioni C1: "Se è vero che… è altrettanto vero che…" / "Occorre tuttavia problematizzare…" / "Ciò non toglie che…"', followUp: ['Esiste un "sano pessimismo"? In che senso?', 'Come distingui il realismo dalla rassegnazione?'] },
      ],
    },
  ],
};

export default mock;
