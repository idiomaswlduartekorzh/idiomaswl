import type { MockExam } from './types';

// CILS Tre C1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/c1-3/.

const mock: MockExam = {
  id: 'cils-c1-3',
  examSlug: 'cils-celi',
  title: 'CILS C1 – Tre C1 Set 3',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 300,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/c1-3/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Conferenza su ambiente ed economia]
Relatrice: Si contrappongono spesso ambiente ed economia, come se proteggere il primo significasse necessariamente danneggiare la seconda. È una falsa alternativa. La transizione ecologica, se ben governata, non è un costo, ma la più grande occasione economica del nostro tempo: nuovi settori, nuove professioni, innovazione. Il vero rischio non è agire, ma tardare: chi arriva prima detta le regole del mercato di domani. Continuare a difendere modelli produttivi obsoleti in nome dell'occupazione significa, paradossalmente, condannare quei posti di lavoro a una lenta agonia.

TESTO 2 [Intervista a una neuroscienziata]
Giornalista: La creatività si può insegnare, o è un dono innato?
Neuroscienziata: È uno dei falsi dilemmi più duri a morire. La ricerca mostra che la creatività non è un talento misterioso riservato a pochi, ma una competenza che si può coltivare. Certo, esistono predisposizioni individuali, ma il contesto conta enormemente: un ambiente che tollera l'errore, che stimola la curiosità, che concede tempo, produce più creatività di qualsiasi presunto "genio" lasciato solo. Il mito del talento innato, in fondo, è comodo: ci esime dalla responsabilità di creare le condizioni perché la creatività fiorisca.

TESTO 3 [Dibattito sui social media]
Moderatore: I social media hanno impoverito il dibattito pubblico?
Sociologo: Direi che lo hanno trasformato, in modi ambivalenti. Da un lato hanno dato voce a chi non l'aveva, democratizzando la parola. Dall'altro, la loro architettura premia l'indignazione, la semplificazione, lo scontro, a scapito della complessità e dell'ascolto. Il problema non sono gli utenti, spesso incolpati con troppa facilità, ma il modello economico che c'è dietro: piattaforme progettate per catturare l'attenzione, non per favorire la comprensione reciproca.`,
      questions: [
        { type: 'mcq', id: 'cils-c1-3-a1', part: 1, text: 'Cosa afferma la relatrice sul rapporto ambiente-economia?', options: ['Sono sempre in contrasto', 'La loro contrapposizione è una falsa alternativa', 'L\'economia è più importante', 'L\'ambiente è irrilevante'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-a2', part: 1, text: 'Qual è il vero rischio secondo la relatrice?', options: ['Creare nuove professioni', 'Agire troppo in fretta', 'Tardare nella transizione ecologica', 'Investire nell\'innovazione'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-a3', part: 1, text: 'Cosa mostra la ricerca sulla creatività?', options: ['Non esiste', 'Dipende solo dai geni', 'È un dono riservato a pochi', 'È una competenza che si può coltivare'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-3-a4', part: 1, text: 'Perché il mito del talento innato è "comodo"?', options: ['Perché ci esime dalla responsabilità di creare le condizioni giuste', 'Perché costa poco', 'Perché piace ai geni', 'Perché è vero'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-a5', part: 1, text: 'Come hanno trasformato i social il dibattito, secondo il sociologo?', options: ['Solo in positivo', 'In modi ambivalenti', 'Non l\'hanno cambiato', 'Solo in negativo'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-a6', part: 1, text: 'Qual è il vero problema secondo il sociologo?', options: ['La lentezza delle piattaforme', 'Gli utenti', 'Il modello economico progettato per catturare l\'attenzione', 'La mancanza di regole'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il paradosso della scelta

Una delle promesse implicite della modernità è che più scelte equivalgano a più libertà, e più libertà a più felicità. Su questo assunto si fonda gran parte della nostra economia e della nostra cultura del consumo. Eppure, un numero crescente di studi mette in discussione questa equazione apparentemente ovvia.

Di fronte a un numero eccessivo di opzioni, molte persone provano ansia anziché soddisfazione. La paura di sbagliare, di rinunciare a un'alternativa migliore, paralizza la decisione e ne riduce il piacere. Chi sceglie tra due prodotti è generalmente più contento di chi sceglie tra cinquanta: quest'ultimo, anche dopo aver deciso, continua a chiedersi se non avrebbe fatto meglio a scegliere diversamente.

Il fenomeno ha implicazioni che vanno oltre lo shopping. Riguarda le relazioni, le carriere, gli stili di vita: la sensazione che ci sia sempre un'opzione migliore, appena fuori portata, alimenta un'insoddisfazione cronica. La libertà, da conquista, rischia di trasformarsi in un peso.

Ciò non significa, ovviamente, rimpiangere società con meno libertà. Significa piuttosto riconoscere che la scelta ha dei costi psicologici, e che imparare a limitare volontariamente le proprie opzioni, a "scegliere di non scegliere", può paradossalmente aumentare il nostro benessere. A volte, la vera libertà consiste nel liberarsi dell'ossessione della scelta perfetta.

---

TESTO B – A cosa serve la noia

La noia gode di pessima reputazione. La combattiamo con ogni mezzo, riempendo ogni istante vuoto con uno schermo, un suono, una distrazione. Eppure, alcuni studiosi ci invitano a rivalutarla, sostenendo che quella che consideriamo un fastidio da eliminare sia in realtà una funzione preziosa della mente.

La noia, sostengono, è lo stato in cui la mente, priva di stimoli esterni, comincia a vagare liberamente. È in questi momenti di apparente vuoto che nascono spesso le idee più originali, le riflessioni più profonde, le soluzioni più creative. Il cervello, per così dire, ha bisogno di momenti di inattività per rielaborare, connettere, immaginare.

Il problema è che oggi non ci annoiamo quasi mai. Non appena avvertiamo il minimo vuoto, lo colmiamo istantaneamente. Così facendo, però, priviamo la nostra mente di quello spazio di libertà da cui scaturisce il pensiero autonomo. Riscoprire la noia, concedersi il lusso di non fare nulla, potrebbe rivelarsi non una perdita di tempo, ma una delle forme più alte di produttività dello spirito.`,
      passageTitle: 'Testi: Il paradosso della scelta / La noia',
      questions: [
        { type: 'mcq', id: 'cils-c1-3-l1', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la "promessa implicita della modernità" descritta nel testo?', options: ['Che la libertà è un peso', 'Che il consumo è dannoso', 'Che più scelte equivalgono a più libertà e felicità', 'Che meno scelte fanno bene'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-l2', part: 2, stimulusLabel: 'Testo A', text: 'Cosa provano molte persone di fronte a troppe opzioni?', options: ['Ansia anziché soddisfazione', 'Indifferenza totale', 'Felicità immediata', 'Grande soddisfazione'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-l3', part: 2, stimulusLabel: 'Testo A', text: 'Chi è generalmente più contento?', options: ['Chi sceglie tra cinquanta prodotti', 'Chi sceglie tra due prodotti', 'Chi non sceglie mai', 'Chi compra tutto'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-l4', part: 2, stimulusLabel: 'Testo A', text: 'Cosa alimenta un\'insoddisfazione cronica?', options: ['L\'assenza di libertà', 'La mancanza di scelte', 'La sensazione che ci sia sempre un\'opzione migliore fuori portata', 'La povertà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-l5', part: 2, stimulusLabel: 'Testo A', text: 'In cosa può consistere la "vera libertà", secondo la conclusione?', options: ['Nel non avere libertà', 'Nel comprare di più', 'Nell\'avere infinite opzioni', 'Nel liberarsi dell\'ossessione della scelta perfetta'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-3-l6', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, la noia gode di ottima reputazione.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-l7', part: 2, stimulusLabel: 'Testo B', text: 'Nella noia la mente comincia a vagare liberamente.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-l8', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, oggi ci annoiamo molto spesso.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-l9', part: 2, stimulusLabel: 'Testo B', text: 'Colmare ogni vuoto priva la mente dello spazio per il pensiero autonomo.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-l10', part: 2, stimulusLabel: 'Testo B', text: 'Riscoprire la noia è definito una pura perdita di tempo.', options: ['Falso', 'Vero'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-c1-3-g1', part: 3, text: 'Per poco non _____ il treno, tanto era in ritardo.', options: ['perdesse', 'perdeva', 'perse', 'perderà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-g2', part: 3, text: 'Sia che _____ sole, sia che piova, partiremo.', options: ['facesse', 'fa', 'faccia', 'farà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-g3', part: 3, text: 'Non appena se ne _____ accorto, era ormai troppo tardi.', options: ['era', 'sarebbe', 'è', 'fu'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-3-g4', part: 3, text: 'Ecco il fenomeno alla base _____ ruota tutta la teoria.', options: ['di cui', 'del quale', 'cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-g5', part: 3, text: 'A meno che non _____ prove concrete, il caso resterà irrisolto.', options: ['emergono', 'emergano', 'emergeranno', 'emergevano'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-g6', part: 3, text: 'Non fece parola, quasi _____ vergogna del suo gesto.', options: ['abbia', 'ha', 'avesse', 'aveva'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-3-g7', part: 3, text: '"Ambivalente" significa:', options: ['molto costoso', 'del tutto chiaro', 'privo di valore', 'che ha due significati o aspetti contrastanti'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-3-g8', part: 3, text: 'Il progetto fallì non _____ mancanza di fondi, ma di visione.', options: ['per', 'da', 'con', 'di'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-3-g9', part: 3, text: '"Esimere qualcuno da un compito" significa:', options: ['obbligarlo', 'dispensarlo / liberarlo da esso', 'punirlo', 'premiarlo'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-3-g10', part: 3, text: 'La sua tesi, _____ discutibile, ha il merito di far riflettere.', options: ['cosicché', 'per quanto', 'affinché', 'poiché'], answer: 1 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo strutturato di almeno 250 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-3-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio argomentativo', stimulus: 'Si dà per scontato che avere più scelte significhi essere più liberi e più felici. Scrivi un saggio argomentativo in cui discuti criticamente questa idea, considerando il "paradosso della scelta", e sostieni la tua posizione con argomenti ed esempi.', text: 'Scrivi il saggio (almeno 250 parole).', minWords: 250 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 150 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-3-w2', part: 5, taskNumber: 2, stimulusLabel: 'Articolo di opinione', stimulus: 'Una rivista ti chiede un articolo dal titolo provocatorio "Elogio della noia". Scrivi un articolo di opinione in cui sostieni, in modo argomentato, che la noia può avere un valore, rispondendo anche alle possibili obiezioni.', text: 'Scrivi l\'articolo (almeno 150 parole).', minWords: 150 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-c1-3-s1', part: 6, partNumber: 1, text: 'Presenta e argomenta in modo articolato il tuo punto di vista.', cueCard: 'Tema: "Ambiente ed economia sono davvero in contrapposizione?"\n\n• Inquadra la "falsa alternativa".\n• Presenta tesi e antitesi.\n• Porta esempi concreti.\n• Sostieni una posizione argomentata e sfumata.', followUp: ['La transizione ecologica è un costo o un\'opportunità? Perché?', 'Chi dovrebbe guidare questa transizione, e con quali strumenti?'] },
        { type: 'speak', id: 'cils-c1-3-s2', part: 6, partNumber: 2, text: 'Sostieni un confronto dialettico con l\'esaminatore.', cueCard: 'Tema: "I social media hanno impoverito o arricchito il dibattito pubblico?"\n\n• la democratizzazione della parola\n• l\'architettura che premia indignazione e scontro\n• la responsabilità: utenti o modello economico?\n• la tua posizione, capace di accogliere obiezioni\n\nEspressioni C1: "Sarebbe semplicistico ridurre… " / "Va piuttosto rintracciata nel…" / "Se ne deduce che…"', followUp: ['Come si potrebbe riprogettare un social per favorire la comprensione reciproca?', 'La responsabilità è più degli utenti o delle piattaforme? Perché?'] },
      ],
    },
  ],
};

export default mock;
