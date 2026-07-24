import type { MockExam } from './types';

// CILS Due B2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b2-4/.

const mock: MockExam = {
  id: 'cils-b2-4',
  examSlug: 'cils-celi',
  title: 'CILS B2 – Due B2 Set 4',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 270,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b2-4/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a un esperto di alimentazione]
Conduttore: Dottor Rinaldi, lo spreco alimentare è un problema enorme. Quali sono i numeri?
Rinaldi: A livello mondiale, circa un terzo del cibo prodotto viene buttato. È un dato scandaloso, se pensiamo che milioni di persone soffrono la fame.
Conduttore: Dove avviene lo spreco maggiore?
Rinaldi: Nei paesi ricchi, gran parte dello spreco avviene nelle case: compriamo troppo, cuciniamo troppo, e poi buttiamo. Nei paesi poveri, invece, il problema è la conservazione e il trasporto.
Conduttore: Cosa può fare il singolo cittadino?
Rinaldi: Molto più di quanto creda. Pianificare la spesa, controllare le scadenze, riutilizzare gli avanzi. Sono piccoli gesti, ma se moltiplicati per milioni di persone hanno un impatto enorme.

TESTO 2 [Comunicato di un'università]
Si comunica agli studenti che, a partire dal prossimo semestre, sarà attivo un nuovo servizio di sostegno psicologico gratuito. Il servizio, pensato per aiutare gli studenti a gestire l'ansia da esame e le difficoltà personali, sarà disponibile su prenotazione. L'iniziativa nasce dalla crescente attenzione dell'ateneo verso il benessere degli studenti, considerato parte integrante del percorso formativo.

TESTO 3 [Dibattito sulla lettura]
Moderatrice: Professor Gallo, i libri di carta scompariranno a favore degli e-book?
Gallo: Non credo. Si era detto lo stesso anni fa, eppure il libro cartaceo resiste. Molti lettori restano affezionati alla carta, all'odore, alla sensazione fisica di sfogliare le pagine.
Moderatrice: Quindi gli e-book hanno fallito?
Gallo: Assolutamente no. Convivono. L'e-book è comodo per i viaggi, per chi legge molto, per chi ha problemi di vista. Non è una guerra: sono due strumenti diversi per esigenze diverse.`,
      questions: [
        { type: 'mcq', id: 'cils-b2-4-a1', part: 1, text: 'Quanto cibo viene buttato a livello mondiale?', options: ['Un decimo', 'Un terzo', 'La metà', 'Nulla'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-a2', part: 1, text: 'Dove avviene lo spreco maggiore nei paesi ricchi?', options: ['Nei campi', 'Nei ristoranti', 'Nelle case', 'Nei supermercati'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-4-a3', part: 1, text: 'Cosa può fare il singolo cittadino?', options: ['Solo protestare', 'Comprare di più', 'Niente', 'Pianificare la spesa e riutilizzare gli avanzi'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-4-a4', part: 1, text: 'A cosa serve il nuovo servizio dell\'università?', options: ['A sostegno psicologico gratuito per gli studenti', 'A prestare libri', 'A organizzare gite', 'A trovare lavoro'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-a5', part: 1, text: 'Secondo il professor Gallo, i libri di carta scompariranno?', options: ['Sì, molto presto', 'No, conviveranno con gli e-book', 'Sono già scomparsi', 'Solo in Italia'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-a6', part: 1, text: 'Come descrive Gallo il rapporto tra libro cartaceo ed e-book?', options: ['Un problema', 'Una guerra', 'Due strumenti diversi per esigenze diverse', 'Un fallimento'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il dialetto: un patrimonio da salvare?

Per molto tempo, in Italia, parlare dialetto è stato considerato un segno di scarsa istruzione. A scuola si insegnava esclusivamente l'italiano e molti genitori evitavano di trasmettere il dialetto ai figli, temendo che potesse ostacolarli. Il risultato è che oggi molti dialetti rischiano di scomparire.

Negli ultimi anni, però, l'atteggiamento è cambiato. Sempre più persone riscoprono il valore dei dialetti, non più visti come un ostacolo, ma come una ricchezza culturale. I dialetti custodiscono modi di dire, espressioni e sfumature che l'italiano standard non possiede, e rappresentano un legame profondo con la storia e l'identità di un territorio.

Alcuni studiosi sottolineano che conoscere il dialetto, accanto all'italiano e alle lingue straniere, non impoverisce affatto: al contrario, arricchisce il patrimonio linguistico di una persona. Diverse iniziative culturali, come rappresentazioni teatrali, canzoni e pubblicazioni, cercano oggi di valorizzare questo patrimonio.

Resta però una domanda aperta: è possibile salvare i dialetti in una società sempre più globalizzata e uniforme? Per alcuni è una battaglia persa; per altri, invece, proprio la globalizzazione rende più prezioso ciò che è locale e autentico.

---

TESTO B – L'arte di sbagliare

Nella nostra società, l'errore è spesso vissuto come qualcosa di negativo, da nascondere o da evitare a ogni costo. Fin da bambini, a scuola, impariamo che sbagliare significa essere puniti con un voto basso. Eppure, numerosi studi dimostrano che l'errore è una parte essenziale dell'apprendimento.

Chi ha paura di sbagliare tende a non rischiare, a non provare cose nuove, limitando così le proprie possibilità di crescita. Al contrario, chi impara a considerare l'errore come un'occasione per capire e migliorare sviluppa maggiore creatività e resilienza. Molte grandi scoperte e invenzioni, del resto, sono nate proprio da errori o da fallimenti.

Cambiare il nostro rapporto con l'errore non è facile, perché richiede di superare la paura del giudizio altrui. Ma imparare a sbagliare senza scoraggiarsi, traendo insegnamento da ogni caduta, è forse una delle competenze più importanti per affrontare la vita.`,
      passageTitle: 'Testi: Il dialetto / L\'arte di sbagliare',
      questions: [
        { type: 'mcq', id: 'cils-b2-4-l1', part: 2, stimulusLabel: 'Testo A', text: 'Come veniva considerato in passato parlare dialetto?', options: ['Un obbligo scolastico', 'Un vantaggio sociale', 'Un segno di cultura', 'Un segno di scarsa istruzione'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-4-l2', part: 2, stimulusLabel: 'Testo A', text: 'Perché molti genitori non trasmettevano il dialetto ai figli?', options: ['Perché temevano che potesse ostacolarli', 'Perché era vietato', 'Perché costava troppo', 'Perché non lo conoscevano'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-l3', part: 2, stimulusLabel: 'Testo A', text: 'Come sono visti oggi i dialetti?', options: ['Come un ostacolo', 'Come una ricchezza culturale', 'Come una lingua morta', 'Come un errore'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-l4', part: 2, stimulusLabel: 'Testo A', text: 'Cosa sostengono alcuni studiosi sul conoscere il dialetto?', options: ['Ostacola l\'italiano', 'Impoverisce la persona', 'Arricchisce il patrimonio linguistico', 'È inutile'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-4-l5', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la domanda aperta del testo?', options: ['Se l\'italiano sia difficile', 'Quanti dialetti esistono', 'Se il dialetto sia una lingua', 'Se sia possibile salvare i dialetti in una società globalizzata'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-4-l6', part: 2, stimulusLabel: 'Testo B', text: 'Nella nostra società l\'errore è spesso vissuto come negativo.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-l7', part: 2, stimulusLabel: 'Testo B', text: 'Secondo gli studi, l\'errore è inutile per l\'apprendimento.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-l8', part: 2, stimulusLabel: 'Testo B', text: 'Chi ha paura di sbagliare tende a non rischiare.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-l9', part: 2, stimulusLabel: 'Testo B', text: 'Nessuna scoperta è mai nata da un errore.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-l10', part: 2, stimulusLabel: 'Testo B', text: 'Cambiare il rapporto con l\'errore richiede di superare la paura del giudizio.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b2-4-g1', part: 3, text: 'Credevo che _____ già partiti.', options: ['erano', 'fossero', 'sono', 'saranno'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-4-g2', part: 3, text: 'Qualunque cosa _____, ti sosterrò.', options: ['succedeva', 'succede', 'succeda', 'succederà'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-4-g3', part: 3, text: 'Ci vediamo domani, a meno che non _____ qualcosa.', options: ['è successo', 'succederà', 'succede', 'succeda'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-4-g4', part: 3, text: 'Ecco le ragioni _____ ho deciso di rifiutare.', options: ['per cui', 'di cui', 'a cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-g5', part: 3, text: '_____ le difficoltà, il progetto è andato avanti.', options: ['Malgrado', 'Sebbene', 'Poiché', 'Affinché'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-g6', part: 3, text: 'Non appena _____ la notizia, ti avviserò.', options: ['ricevevo', 'ricevo', 'avrò ricevuto', 'ricevessi'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-4-g7', part: 3, text: 'È un\'opera _____ autore è sconosciuto.', options: ['di cui', 'del quale il', 'che', 'il cui'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-4-g8', part: 3, text: '"Valorizzare" un patrimonio significa:', options: ['metterne in evidenza il valore', 'venderlo', 'nasconderlo', 'distruggerlo'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-g9', part: 3, text: 'Non ha studiato, _____ ha superato l\'esame.', options: ['eppure', 'perciò', 'quindi', 'affinché'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-4-g10', part: 3, text: 'Ha parlato a lungo _____ dire nulla di concreto.', options: ['con', 'per', 'senza', 'da'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo di almeno 180 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-4-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio breve', stimulus: 'Ogni anno si spreca un terzo del cibo prodotto nel mondo. Scrivi un testo argomentativo in cui analizzi le cause dello spreco alimentare e proponi soluzioni concrete, sia individuali sia collettive.', text: 'Scrivi il testo (almeno 180 parole).', minWords: 180 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-4-w2', part: 5, taskNumber: 2, stimulusLabel: 'Lettera formale', stimulus: 'Nel tuo quartiere molti dialetti e tradizioni locali stanno scomparendo. Scrivi una lettera al giornale locale in cui proponi alcune iniziative per valorizzare la cultura del territorio, spiegando perché è importante.', text: 'Scrivi la lettera (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b2-4-s1', part: 6, partNumber: 1, text: 'Esponi il tuo punto di vista sul tema seguente in modo articolato.', cueCard: 'Tema: "Sbagliare fa parte dell\'apprendimento, eppure abbiamo paura degli errori."\n\n• Presenta la questione.\n• Argomenta perché l\'errore può essere utile.\n• Porta esempi concreti dalla tua esperienza.\n• Esprimi e difendi la tua opinione.', followUp: ['Come reagisci di solito quando commetti un errore?', 'La scuola dovrebbe cambiare il modo di valutare gli errori? Come?'] },
        { type: 'speak', id: 'cils-b2-4-s2', part: 6, partNumber: 2, text: 'Sostieni una discussione con l\'esaminatore sul tema proposto.', cueCard: 'Tema: "I dialetti e le tradizioni locali: un patrimonio da salvare o un ostacolo al progresso?"\n\n• il valore culturale e identitario dei dialetti\n• il rischio della loro scomparsa\n• globalizzazione e cultura locale\n• la tua posizione argomentata\n\nEspressioni B2: "Per quanto mi riguarda…" / "Bisogna riconoscere che…" / "In fin dei conti…"', followUp: ['Nel tuo paese esistono lingue o dialetti locali? Come stanno?', 'La globalizzazione minaccia o valorizza le culture locali? Perché?'] },
      ],
    },
  ],
};

export default mock;
