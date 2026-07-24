import type { MockExam } from './types';

// CILS Tre C1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/c1-4/.

const mock: MockExam = {
  id: 'cils-c1-4',
  examSlug: 'cils-celi',
  title: 'CILS C1 – Tre C1 Set 4',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 300,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/c1-4/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Conferenza su lavoro e identità]
Relatore: Nella nostra cultura, la domanda "Che cosa fai?" equivale quasi sempre a "Che lavoro fai?". Identifichiamo una persona con la sua professione, come se essa esaurisse la sua identità. Questa sovrapposizione, però, non è affatto scontata né universale. In altre epoche, e in altre culture, l'identità si definiva attraverso l'appartenenza a una comunità, a una famiglia, a un luogo. Ridurre l'individuo al suo ruolo produttivo è un fenomeno storicamente recente, e non privo di conseguenze: quando il lavoro viene a mancare, o quando finisce con la pensione, molti si trovano di fronte a un vuoto identitario, come se avessero perso non un'occupazione, ma se stessi.

TESTO 2 [Intervista a uno storico]
Giornalista: Si dice spesso che "la storia insegna". È davvero così?
Storico: È una formula suggestiva, ma ingannevole. La storia non fornisce lezioni pronte all'uso, come un manuale. Le situazioni non si ripetono mai identiche, e chi cerca nel passato ricette per il presente rischia di forzare le analogie. Ciò che la storia offre non sono risposte, ma un metodo: la capacità di cogliere la complessità, di diffidare delle semplificazioni, di comprendere che ogni presente è stato, un tempo, un futuro incerto. Non impariamo cosa fare, ma impariamo a pensare storicamente. Ed è già moltissimo.

TESTO 3 [Dibattito sull'istruzione]
Moderatrice: La scuola deve formare cittadini o preparare al mercato del lavoro?
Pedagogista: Questa contrapposizione mi sembra fuorviante. Una buona istruzione fa entrambe le cose, e non potrebbe essere altrimenti. Il problema nasce quando si subordina interamente la scuola alle esigenze immediate del mercato, riducendola a una fabbrica di competenze spendibili. Così facendo, si dimentica che le competenze più preziose a lungo termine, come il pensiero critico o la capacità di apprendere, non sono immediatamente "monetizzabili", eppure sono ciò che permette a una persona di adattarsi a un mondo che cambia.`,
      questions: [
        { type: 'mcq', id: 'cils-c1-4-a1', part: 1, text: 'Cosa critica il relatore riguardo alla domanda "Che cosa fai?"?', options: ['Che è scortese', 'Che nessuno la fa più', 'Che è troppo generica', 'Che identifica la persona con la sua professione'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-4-a2', part: 1, text: 'Quale conseguenza segnala il relatore?', options: ['La ricchezza economica', 'La felicità dei pensionati', 'Nessuna conseguenza', 'Il vuoto identitario quando il lavoro viene a mancare'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-4-a3', part: 1, text: 'Perché la formula "la storia insegna" è ingannevole, secondo lo storico?', options: ['Perché la storia è inutile', 'Perché le situazioni non si ripetono mai identiche', 'Perché nessuno studia storia', 'Perché il passato è perfetto'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-a4', part: 1, text: 'Cosa offre davvero la storia, secondo lo storico?', options: ['Nulla di utile', 'Risposte pronte', 'Un metodo per cogliere la complessità', 'Ricette per il presente'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-a5', part: 1, text: 'Come giudica la pedagogista la contrapposizione tra cittadini e mercato?', options: ['Irrilevante', 'Inevitabile', 'Corretta', 'Fuorviante'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-4-a6', part: 1, text: 'Quali competenze sono "preziose a lungo termine" secondo la pedagogista?', options: ['Il pensiero critico e la capacità di apprendere', 'Quelle immediatamente monetizzabili', 'Nessuna in particolare', 'Solo quelle tecniche'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – La gentilezza come atto rivoluzionario

In una società che spesso premia l'aggressività, l'astuzia e la competizione, la gentilezza rischia di apparire come una virtù debole, quasi ingenua. "Buonismo", "debolezza", "mancanza di carattere": non mancano i termini spregiativi con cui la si liquida. Eppure, guardata più da vicino, la gentilezza si rivela tutt'altro che segno di fragilità.

Essere gentili, infatti, non significa essere remissivi o incapaci di dire di no. La vera gentilezza richiede attenzione, sforzo, autocontrollo: è molto più facile reagire con rabbia a una provocazione che rispondere con misura. In questo senso, la gentilezza è una forma di forza, non di debolezza: la forza di chi sceglie deliberatamente di non aggiungere altra durezza a un mondo che ne ha già in abbondanza.

Vi è poi una dimensione sociale. Numerosi studi mostrano come i comportamenti gentili siano "contagiosi": un gesto di cortesia tende a generarne altri, innescando circoli virtuosi. In un'epoca segnata da conflitti e polarizzazione, riscoprire il valore della gentilezza non è un vezzo sentimentale, ma forse una necessità concreta.

Naturalmente, non si tratta di trasformare la gentilezza in un obbligo o in una maschera ipocrita. Ma riconoscerne il valore, in un contesto che tende a svalutarla, è già di per sé un piccolo atto controcorrente.

---

TESTO B – L'ossessione della sicurezza

Il desiderio di sicurezza è, senza dubbio, uno dei bisogni umani più profondi. Nessuno vorrebbe vivere in un mondo governato dal caso e dalla minaccia. Tuttavia, quando questo desiderio si trasforma in ossessione, può produrre effetti opposti a quelli sperati.

Una società che pretende di eliminare ogni rischio finisce spesso per limitare la libertà, la spontaneità, la stessa qualità della vita. Genitori che, per proteggere i figli da ogni pericolo, impediscono loro di correre rischi finiscono per crescere individui fragili, incapaci di affrontare le inevitabili difficoltà dell'esistenza. Il rischio, entro certi limiti, non è solo inevitabile, ma necessario: è affrontandolo che impariamo, cresciamo, ci fortifichiamo.

Vi è inoltre un paradosso politico. In nome della sicurezza, si è spesso disposti a rinunciare a diritti e libertà faticosamente conquistati. La storia insegna quanto sia scivoloso questo terreno: chi promette sicurezza assoluta in cambio di libertà offre, in realtà, un pessimo scambio. La sfida di una società matura non è eliminare il rischio, ma imparare a convivere con esso in modo consapevole e responsabile.`,
      passageTitle: 'Testi: La gentilezza / L\'ossessione della sicurezza',
      questions: [
        { type: 'mcq', id: 'cils-c1-4-l1', part: 2, stimulusLabel: 'Testo A', text: 'Come rischia di apparire la gentilezza in una società competitiva?', options: ['Come una virtù forte', 'Come una virtù debole e ingenua', 'Come un obbligo', 'Come un difetto tecnico'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-l2', part: 2, stimulusLabel: 'Testo A', text: 'Cosa NON significa, secondo il testo, essere gentili?', options: ['Avere autocontrollo', 'Prestare attenzione', 'Essere remissivi e incapaci di dire di no', 'Fare uno sforzo'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-l3', part: 2, stimulusLabel: 'Testo A', text: 'Perché la gentilezza è una forma di forza?', options: ['Perché premia l\'aggressività', 'Perché è ipocrita', 'Perché è facile', 'Perché richiede la forza di non aggiungere durezza al mondo'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-4-l4', part: 2, stimulusLabel: 'Testo A', text: 'Cosa mostrano gli studi sui comportamenti gentili?', options: ['Che sono "contagiosi" e generano circoli virtuosi', 'Che sono dannosi', 'Che sono rari', 'Che sono inutili'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-4-l5', part: 2, stimulusLabel: 'Testo A', text: 'Come viene definito riconoscere il valore della gentilezza oggi?', options: ['Un obbligo ipocrita', 'Un piccolo atto controcorrente', 'Una debolezza', 'Un vezzo sentimentale'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-l6', part: 2, stimulusLabel: 'Testo B', text: 'Il desiderio di sicurezza è uno dei bisogni umani più profondi.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-l7', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, eliminare ogni rischio migliora sempre la qualità della vita.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-l8', part: 2, stimulusLabel: 'Testo B', text: 'Affrontare i rischi, entro certi limiti, ci aiuta a crescere.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-4-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, è sempre saggio scambiare libertà con sicurezza assoluta.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-4-l10', part: 2, stimulusLabel: 'Testo B', text: 'La sfida di una società matura è convivere con il rischio in modo responsabile.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-c1-4-g1', part: 3, text: 'Fosse per me, la questione _____ già chiusa.', options: ['era', 'fosse', 'sarebbe', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-g2', part: 3, text: 'Che tu ci _____ o meno, la realtà non cambia.', options: ['creda', 'crederai', 'credevi', 'credi'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-4-g3', part: 3, text: 'Si comportava come se nulla _____ accaduto.', options: ['è', 'era', 'fosse', 'sarebbe'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-g4', part: 3, text: 'È un principio in nome _____ molti hanno combattuto.', options: ['cui', 'che', 'del quale', 'di cui il'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-g5', part: 3, text: 'Pur di riuscire, sarebbe stato disposto a _____.', options: ['poco', 'nulla', 'tutto', 'niente'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-g6', part: 3, text: '"Remissivo" significa:', options: ['incline a cedere / arrendevole', 'gentile', 'testardo', 'aggressivo'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-4-g7', part: 3, text: 'Non tanto le parole, _____ i fatti contano davvero.', options: ['quanto', 'che', 'come', 'di'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-4-g8', part: 3, text: 'Terreno "scivoloso", in senso figurato, indica una situazione:', options: ['trasparente', 'sicura e stabile', 'delicata e rischiosa', 'noiosa'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-4-g9', part: 3, text: 'Agì di propria iniziativa, senza che nessuno glielo _____.', options: ['chiese', 'chiederà', 'chiedeva', 'chiedesse'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-4-g10', part: 3, text: 'La proposta fu respinta, _____ le buone intenzioni dei promotori.', options: ['affinché', 'poiché', 'cosicché', 'malgrado'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo strutturato di almeno 250 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-4-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio argomentativo', stimulus: 'Nella nostra cultura tendiamo a identificare una persona con il suo lavoro. Scrivi un saggio argomentativo in cui rifletti criticamente sul rapporto tra lavoro e identità, considerandone rischi e implicazioni, e sostieni la tua tesi con argomenti ed esempi.', text: 'Scrivi il saggio (almeno 250 parole).', minWords: 250 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 150 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-4-w2', part: 5, taskNumber: 2, stimulusLabel: 'Articolo di opinione', stimulus: 'Una rivista ti chiede un articolo dal titolo "La gentilezza come atto rivoluzionario". Scrivi un articolo di opinione in cui sostieni, in modo argomentato e non sentimentale, il valore della gentilezza nella società contemporanea.', text: 'Scrivi l\'articolo (almeno 150 parole).', minWords: 150 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-c1-4-s1', part: 6, partNumber: 1, text: 'Presenta e argomenta in modo articolato il tuo punto di vista.', cueCard: 'Tema: "Siamo ciò che facciamo? Il rapporto tra lavoro e identità."\n\n• Inquadra criticamente la questione.\n• Presenta tesi e antitesi.\n• Porta esempi ed eventuali riferimenti culturali.\n• Sostieni una posizione argomentata e sfumata.', followUp: ['Cosa succede all\'identità di una persona quando va in pensione?', 'È possibile definire se stessi indipendentemente dal proprio lavoro?'] },
        { type: 'speak', id: 'cils-c1-4-s2', part: 6, partNumber: 2, text: 'Sostieni un confronto dialettico con l\'esaminatore.', cueCard: 'Tema: "In nome della sicurezza, quanto siamo disposti a rinunciare?"\n\n• il bisogno legittimo di sicurezza\n• i rischi dell\'ossessione securitaria\n• il paradosso politico (sicurezza vs. libertà)\n• la tua posizione, capace di accogliere obiezioni\n\nEspressioni C1: "È innegabile che… tuttavia…" / "Il rovescio della medaglia è…" / "A ben vedere…"', followUp: ['Esiste un livello "giusto" di sicurezza? Chi dovrebbe stabilirlo?', 'Perché il rischio, entro certi limiti, può essere necessario?'] },
      ],
    },
  ],
};

export default mock;
