import type { MockExam } from './types';

// CILS Uno B1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b1-3/.

const mock: MockExam = {
  id: 'b1-3',
  examSlug: 'cils-celi',
  title: 'CILS B1 – Uno B1 Set 3',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 240,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b1-3/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a uno chef]
Giornalista: Chef Rossi, il suo ristorante usa solo prodotti locali. Perché questa scelta?
Chef: Perché credo nella qualità e nel rispetto del territorio. Compro frutta e verdura dai contadini della zona, il pesce dai pescatori del porto vicino.
Giornalista: Non è più costoso?
Chef: Un po', ma il sapore è incomparabile e sostengo l'economia locale. I clienti lo apprezzano e tornano.
Giornalista: Qual è il suo piatto più richiesto?
Chef: Il risotto alle erbe di campo. Cambia con le stagioni, quindi non è mai uguale.

TESTO 2 [Annuncio in una stazione]
Attenzione, il treno Intercity 582 diretto a Napoli viaggia con un ritardo di venticinque minuti. I passeggeri sono pregati di recarsi al binario 6. Le coincidenze per Salerno e Bari saranno garantite. Ci scusiamo per il disagio.

TESTO 3 [Conversazione tra vicini]
Marco: Buongiorno signora Neri! Ha saputo del nuovo parco che apriranno nel quartiere?
Signora Neri: Davvero? Che bella notizia! Dove esattamente?
Marco: Al posto del vecchio parcheggio abbandonato, in via Verdi. Ci saranno alberi, panchine e un'area giochi per i bambini.
Signora Neri: Finalmente uno spazio verde! Ne avevamo proprio bisogno. Quando aprirà?
Marco: Dovrebbe essere pronto per la primavera.`,
      questions: [
        { type: 'mcq', id: 'cils-b1-3-a1', part: 1, text: 'Perché lo chef usa prodotti locali?', options: ['Perché costano meno', 'Per qualità e rispetto del territorio', 'Perché è obbligatorio', 'Perché non trova altro'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-a2', part: 1, text: 'Qual è il piatto più richiesto?', options: ['La bistecca', 'La pasta al pomodoro', 'Il pesce alla griglia', 'Il risotto alle erbe di campo'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-a3', part: 1, text: 'Di quanto è il ritardo del treno per Napoli?', options: ['Un\'ora', 'Cinque minuti', 'Dieci minuti', 'Venticinque minuti'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-a4', part: 1, text: 'Da quale binario parte il treno?', options: ['Binario 4', 'Binario 6', 'Binario 8', 'Binario 2'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-a5', part: 1, text: 'Dove sarà costruito il nuovo parco?', options: ['Al posto di un vecchio parcheggio', 'Vicino alla stazione', 'In centro', 'Al posto di una scuola'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-a6', part: 1, text: 'Quando dovrebbe aprire il parco?', options: ['In inverno', 'In estate', 'In autunno', 'In primavera'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il fenomeno degli acquisti online

Negli ultimi anni gli acquisti online sono diventati un'abitudine per milioni di italiani. Con pochi clic è possibile comprare di tutto: vestiti, libri, elettrodomestici, perfino la spesa alimentare, ricevendo il pacco direttamente a casa in pochi giorni.

I vantaggi sono evidenti: si risparmia tempo, si possono confrontare facilmente i prezzi di negozi diversi e si ha accesso a una scelta molto più ampia rispetto a un negozio fisico. Per chi vive in piccoli centri, lontano dai grandi centri commerciali, è spesso l'unico modo per trovare certi prodotti.

Tuttavia, non mancano gli aspetti negativi. Molti piccoli negozi tradizionali faticano a competere con i grandi siti di vendita e sono costretti a chiudere. Inoltre, l'aumento delle consegne a domicilio comporta più traffico e più inquinamento nelle città. Infine, comprare senza vedere e toccare il prodotto può portare a delusioni.

Gli esperti consigliano un uso equilibrato: approfittare della comodità degli acquisti online, ma senza dimenticare l'importanza dei negozi di quartiere, che rappresentano un punto di riferimento per la comunità.

---

TESTO B – Muoversi in bicicletta

Sempre più città italiane investono nelle piste ciclabili per incoraggiare i cittadini a spostarsi in bicicletta. Andare in bici, infatti, fa bene alla salute, non inquina e permette di evitare il traffico e i problemi di parcheggio.

In alcune città sono nati servizi di bike sharing, che permettono di prendere una bicicletta pubblica, usarla per il tragitto necessario e lasciarla in un'altra postazione. Questo sistema è molto pratico per chi non possiede una bici propria o per i turisti.

Nonostante i vantaggi, l'uso della bicicletta in città presenta ancora alcune difficoltà: piste ciclabili incomplete, poca sicurezza e il timore degli incidenti. Per questo molte associazioni chiedono alle amministrazioni maggiori investimenti e regole più chiare.`,
      passageTitle: 'Testi: Acquisti online / La bicicletta',
      questions: [
        { type: 'mcq', id: 'cils-b1-3-l1', part: 2, stimulusLabel: 'Testo A', text: 'Quale vantaggio degli acquisti online è citato nel testo?', options: ['La possibilità di toccare i prodotti', 'La garanzia di non sbagliare mai', 'Il prezzo sempre più basso di tutto', 'Il risparmio di tempo e la scelta più ampia'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-l2', part: 2, stimulusLabel: 'Testo A', text: 'Perché gli acquisti online sono utili per chi vive nei piccoli centri?', options: ['Perché spesso è l\'unico modo per trovare certi prodotti', 'Perché non c\'è traffico', 'Perché i negozi sono chiusi', 'Perché costano meno'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-l3', part: 2, stimulusLabel: 'Testo A', text: 'Qual è un aspetto negativo menzionato?', options: ['I piccoli negozi faticano a competere', 'I prezzi sono troppo alti', 'Le consegne sono troppo lente', 'Non si può pagare con la carta'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-l4', part: 2, stimulusLabel: 'Testo A', text: 'Che cosa consigliano gli esperti?', options: ['Di comprare solo online', 'Di non comprare mai online', 'Un uso equilibrato senza dimenticare i negozi di quartiere', 'Di chiudere tutti i negozi fisici'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-3-l5', part: 2, stimulusLabel: 'Testo A', text: 'Che cosa rappresentano i negozi di quartiere secondo il testo?', options: ['Un costo inutile', 'Una moda passeggera', 'Un problema per le città', 'Un punto di riferimento per la comunità'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-l6', part: 2, stimulusLabel: 'Testo B', text: 'Andare in bicicletta fa bene alla salute e non inquina.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-l7', part: 2, stimulusLabel: 'Testo B', text: 'Il bike sharing è utile solo per chi possiede una bici.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-l8', part: 2, stimulusLabel: 'Testo B', text: 'Con il bike sharing si può lasciare la bici in una postazione diversa.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-l9', part: 2, stimulusLabel: 'Testo B', text: 'In città non ci sono difficoltà nell\'uso della bicicletta.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-l10', part: 2, stimulusLabel: 'Testo B', text: 'Le associazioni chiedono più investimenti e regole più chiare.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b1-3-g1', part: 3, text: 'Spero che tu _____ presto.', options: ['guarisci', 'guarisca', 'guarirai', 'guarivi'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-g2', part: 3, text: 'Se potessi, _____ un anno in Italia.', options: ['passassi', 'passavo', 'passerei', 'passerò'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-3-g3', part: 3, text: 'Prima di uscire, _____ le finestre.', options: ['chiusa', 'chiudendo', 'chiudi', 'chiudere'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-3-g4', part: 3, text: 'Ho conosciuto una ragazza _____ padre è medico.', options: ['il cui', 'di cui', 'dove', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-3-g5', part: 3, text: 'Quando ero piccolo, _____ spesso dai nonni.', options: ['sono andato', 'andavo', 'andrò', 'vada'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-g6', part: 3, text: 'Il libro _____ ti parlavo è finalmente uscito.', options: ['dove', 'che', 'di cui', 'a cui'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-3-g7', part: 3, text: 'La torta è stata mangiata _____ i bambini.', options: ['con', 'per', 'di', 'da'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-g8', part: 3, text: 'Bisogna _____ una soluzione al più presto.', options: ['cercare di', 'fare', 'prendere', 'trovare'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-3-g9', part: 3, text: '"Fastidioso" significa:', options: ['veloce', 'noioso / che dà disturbo', 'divertente', 'costoso'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-3-g10', part: 3, text: 'Continua a piovere, _____ non usciamo.', options: ['affinché', 'perciò', 'benché', 'sebbene'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-3-w1', part: 4, taskNumber: 1, stimulusLabel: 'Testo argomentativo', stimulus: 'Sempre più persone fanno acquisti su internet invece di andare nei negozi. Scrivi un testo in cui presenti i vantaggi e gli svantaggi degli acquisti online ed esprimi la tua opinione.', text: 'Scrivi il testo (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un\'email di almeno 80 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-3-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email di reclamo', stimulus: 'Hai comprato un prodotto online ma è arrivato danneggiato. Scrivi un\'email al servizio clienti: descrivi il problema, spiega cosa vuoi (rimborso o sostituzione) e chiedi una risposta rapida.', text: 'Scrivi l\'email (almeno 80 parole).', minWords: 80 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b1-3-s1', part: 6, partNumber: 1, text: 'Osserva questa immagine, descrivila ed esprimi la tua opinione.', cueCard: 'Immagine: una persona in bicicletta su una pista ciclabile in città.\n\n• Descrivi la scena.\n• Usi la bicicletta? Ti piacerebbe usarla di più?\n• Secondo te, le città dovrebbero incoraggiare l\'uso della bici?', followUp: ['Come ti sposti di solito? Perché?', 'Che cosa servirebbe per usare di più la bicicletta nella tua città?'] },
        { type: 'speak', id: 'cils-b1-3-s2', part: 6, partNumber: 2, text: 'Parla delle tue abitudini di acquisto. Usa la cue card come guida.', cueCard: 'Parla di:\n• Preferisci comprare nei negozi o online?\n• Che cosa compri più spesso?\n• Quanto è importante per te il prezzo?\n• Ti fidi degli acquisti online?', followUp: ['Hai mai avuto un problema con un acquisto online?', 'Pensi che i negozi tradizionali scompariranno? Perché?'] },
      ],
    },
  ],
};

export default mock;
