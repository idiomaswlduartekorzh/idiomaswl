import type { MockExam } from './types';

// CILS Tre C1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/c1-5/.

const mock: MockExam = {
  id: 'cils-c1-5',
  examSlug: 'cils-celi',
  title: 'CILS C1 – Tre C1 Set 5',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 300,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/c1-5/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Conferenza sull'intelligenza artificiale]
Relatrice: Il dibattito sull'intelligenza artificiale è spesso dominato da due posizioni estreme: gli entusiasti, che vi vedono la soluzione a ogni problema, e gli apocalittici, che ne temono la ribellione. Entrambe le posizioni, a mio avviso, mancano il punto. La vera questione non è se le macchine diventeranno "coscienti", scenario ancora fantascientifico, ma come le stiamo già usando oggi, chi le controlla, a vantaggio di chi. Concentrandoci sui rischi futuri e improbabili, distogliamo l'attenzione dai problemi reali e presenti: la sorveglianza, la manipolazione, la concentrazione di potere in poche mani. Il futuro dell'intelligenza artificiale non è una fatalità tecnologica, ma una scelta politica.

TESTO 2 [Intervista a un antropologo]
Giornalista: Il concetto di "casa" sta cambiando?
Antropologo: Profondamente. Per generazioni, la casa è stata un luogo stabile, radicato, spesso ereditato. Oggi, per molti, è diventata provvisoria, mobile, plurale. Si può avere "casa" in più città, o non sentirsi a casa da nessuna parte. Non è necessariamente un impoverimento: per alcuni è una liberazione dai vincoli del luogo natio. Ma solleva domande profonde sul senso di appartenenza. Se la casa non è più un luogo fisico, dove mettiamo radici? La risposta, forse, è che le radici stanno diventando meno geografiche e più relazionali.

TESTO 3 [Dibattito sulla cultura]
Moderatore: La cultura deve essere accessibile a tutti, anche a costo di semplificarla?
Studiosa: È un falso dilemma, e pericoloso. Rendere accessibile non deve significare banalizzare. Divulgare bene è difficilissimo: richiede di padroneggiare una materia a tal punto da saperla spiegare senza tradirla. Il rischio, oggi, è confondere l'accessibilità con la superficialità, offrendo al pubblico non la cultura semplificata, ma la sua caricatura. Rispettare il pubblico significa non sottovalutarne l'intelligenza: le persone sono capaci di comprendere la complessità, se solo qualcuno si prende la briga di raccontarla bene.`,
      questions: [
        { type: 'mcq', id: 'cils-c1-5-a1', part: 1, text: 'Quali due posizioni estreme dominano il dibattito sull\'IA?', options: ['Ricchi e poveri', 'Gli entusiasti e gli apocalittici', 'Scienziati e artisti', 'Giovani e anziani'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-a2', part: 1, text: 'Qual è la "vera questione" secondo la relatrice?', options: ['Quanto costa l\'IA', 'Se le macchine diventeranno coscienti', 'Come usiamo l\'IA oggi, chi la controlla e a vantaggio di chi', 'Quando finirà il mondo'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-5-a3', part: 1, text: 'Come definisce la relatrice il futuro dell\'IA?', options: ['Un mistero', 'Un\'illusione', 'Una fatalità tecnologica', 'Una scelta politica'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-5-a4', part: 1, text: 'Come sta cambiando il concetto di "casa", secondo l\'antropologo?', options: ['Diventa provvisorio, mobile, plurale', 'Scompare del tutto', 'Diventa più costoso', 'Resta stabile e radicato'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-a5', part: 1, text: 'Cosa significa "divulgare bene", secondo la studiosa?', options: ['Banalizzare', 'Spiegare una materia senza tradirla', 'Renderla incomprensibile', 'Riservarla a pochi'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-a6', part: 1, text: 'Cosa significa rispettare il pubblico, secondo la studiosa?', options: ['Ignorarlo', 'Sottovalutarne l\'intelligenza', 'Non sottovalutarne l\'intelligenza', 'Semplificare tutto'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il diritto di cambiare idea

Viviamo in un'epoca che sembra punire il cambiamento di opinione. Un politico, un intellettuale, chiunque riveda una posizione sostenuta in passato viene immediatamente accusato di incoerenza, di opportunismo, di "aver tradito" le proprie idee. Le vecchie dichiarazioni, conservate e ricercabili in eterno negli archivi digitali, ci inseguono come fantasmi, pronte a essere brandite contro di noi.

Eppure, a ben guardare, cambiare idea dovrebbe essere considerato un segno di intelligenza, non di debolezza. Chi impara qualcosa di nuovo, chi ascolta un argomento più convincente, chi osserva mutare la realtà attorno a sé, non ha forse il dovere di aggiornare le proprie convinzioni? La coerenza a ogni costo, l'ostinazione a difendere una posizione solo per non ammettere di aver sbagliato, è semmai la vera forma di debolezza intellettuale.

Il problema è che confondiamo due cose diverse: la coerenza dei valori di fondo e la coerenza delle opinioni contingenti. Restare fedeli ai propri principi è una virtù; rifiutare di rivedere una singola opinione di fronte a nuove evidenze è testardaggine. Una cultura sana dovrebbe premiare chi sa dire "ho cambiato idea, ed ecco perché", invece di trasformare ogni ripensamento in un capo d'accusa.

Difendere il diritto di cambiare idea, in fondo, significa difendere la possibilità stessa del pensiero: perché pensare, se non ci è permesso di arrivare a conclusioni diverse da quelle di partenza?

---

TESTO B – Contro il culto della produttività

"Ottimizzare", "efficientare", "massimizzare": il lessico dell'azienda ha colonizzato la nostra vita quotidiana. Non solo lavoriamo per essere produttivi, ma pretendiamo di esserlo anche nel tempo libero, nelle relazioni, persino nel riposo. Esistono app per rendere più "efficiente" il sonno, per ottimizzare le vacanze, per non "sprecare" neppure un minuto.

Questa mentalità, apparentemente virtuosa, nasconde un'insidia. Trattare ogni istante della vita come una risorsa da sfruttare rischia di svuotarlo di senso. Vi sono esperienze, tra le più preziose, che sono per loro natura "improduttive": una conversazione senza scopo, una passeggiata senza meta, il tempo trascorso a non fare nulla. Pretendere che tutto sia utile significa perdere proprio ciò che rende la vita degna di essere vissuta.

Vi è poi un aspetto più sottile. L'ossessione per la produttività individuale ci induce a interpretare ogni fallimento come una colpa personale, ignorando i fattori strutturali. Se non "rendi" abbastanza, la colpa è tua, che non ti sei impegnato o organizzato abbastanza. Così, una logica nata nel mondo del lavoro diventa una gabbia esistenziale, e il riposo stesso, da diritto, si trasforma in una concessione da meritare.`,
      passageTitle: 'Testi: Il diritto di cambiare idea / Il culto della produttività',
      questions: [
        { type: 'mcq', id: 'cils-c1-5-l1', part: 2, stimulusLabel: 'Testo A', text: 'Di cosa viene accusato chi cambia opinione, secondo il testo?', options: ['Di coraggio', 'Di saggezza', 'Di intelligenza', 'Di incoerenza e opportunismo'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-5-l2', part: 2, stimulusLabel: 'Testo A', text: 'Perché le vecchie dichiarazioni "ci inseguono come fantasmi"?', options: ['Perché sono conservate e ricercabili in eterno negli archivi digitali', 'Perché nessuno le ricorda', 'Perché sono state cancellate', 'Perché sono false'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-l3', part: 2, stimulusLabel: 'Testo A', text: 'Come dovrebbe essere considerato cambiare idea, secondo l\'autore?', options: ['Un segno di debolezza', 'Un segno di intelligenza', 'Un tradimento', 'Un reato'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-l4', part: 2, stimulusLabel: 'Testo A', text: 'Quali due cose vengono confuse, secondo il testo?', options: ['Politica e cultura', 'Verità e menzogna', 'La coerenza dei valori di fondo e quella delle opinioni contingenti', 'Passato e futuro'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-5-l5', part: 2, stimulusLabel: 'Testo A', text: 'Cosa significa, in fondo, difendere il diritto di cambiare idea?', options: ['Rifiutare i principi', 'Evitare le responsabilità', 'Difendere l\'incoerenza', 'Difendere la possibilità stessa del pensiero'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-5-l6', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, il lessico dell\'azienda ha colonizzato la vita quotidiana.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-l7', part: 2, stimulusLabel: 'Testo B', text: 'L\'autore ritiene che tutte le esperienze debbano essere produttive.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-l8', part: 2, stimulusLabel: 'Testo B', text: 'Alcune esperienze preziose sono per loro natura "improduttive".', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, l\'ossessione per la produttività considera sempre i fattori strutturali.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-l10', part: 2, stimulusLabel: 'Testo B', text: 'Nel testo, il riposo rischia di trasformarsi da diritto a concessione da meritare.', options: ['Vero', 'Falso'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-c1-5-g1', part: 3, text: 'Non che _____ torto, ma avrebbe potuto essere più diplomatico.', options: ['ha', 'avesse', 'aveva', 'abbia'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-g2', part: 3, text: 'Volente o nolente, dovrà _____ le conseguenze.', options: ['affronta', 'affrontare', 'affrontando', 'affrontato'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-g3', part: 3, text: 'Se avesse ascoltato, non _____ in questa situazione.', options: ['era', 'fosse', 'sarebbe', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-5-g4', part: 3, text: 'È una logica in virtù _____ ogni gesto viene misurato.', options: ['della quale', 'di cui la', 'cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-g5', part: 3, text: 'Per quanto se ne _____, il fenomeno resta poco studiato.', options: ['parla', 'parli', 'parlerà', 'parlava'], answer: 1 },
        { type: 'mcq', id: 'cils-c1-5-g6', part: 3, text: '"Contingente", riferito a un\'opinione, significa:', options: ['condivisa da tutti', 'eterna e assoluta', 'legata alle circostanze / non necessaria', 'sbagliata'], answer: 2 },
        { type: 'mcq', id: 'cils-c1-5-g7', part: 3, text: 'Ammesso e non concesso che _____ ragione, il metodo resta discutibile.', options: ['avrà', 'aveva', 'ha', 'abbia'], answer: 3 },
        { type: 'mcq', id: 'cils-c1-5-g8', part: 3, text: '"Brandire" un argomento significa, in senso figurato:', options: ['usarlo come un\'arma', 'dimenticarlo', 'confutarlo', 'nasconderlo'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-g9', part: 3, text: 'Il testo è tanto denso _____ richiedere più letture.', options: ['da', 'che', 'come', 'per'], answer: 0 },
        { type: 'mcq', id: 'cils-c1-5-g10', part: 3, text: 'Riconobbe l\'errore, il _____ gli fa onore.', options: ['quello', 'che', 'quale', 'cui'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo strutturato di almeno 250 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-5-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio argomentativo', stimulus: 'Oggi chi cambia opinione viene spesso accusato di incoerenza. Scrivi un saggio argomentativo in cui difendi (o problematizzi) il "diritto di cambiare idea", distinguendo tra coerenza dei valori e delle opinioni, e sostieni la tua tesi con argomenti ed esempi.', text: 'Scrivi il saggio (almeno 250 parole).', minWords: 250 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 150 parole.',
      questions: [
        { type: 'write', id: 'cils-c1-5-w2', part: 5, taskNumber: 2, stimulusLabel: 'Articolo di opinione', stimulus: 'Una rivista ti chiede un articolo dal titolo "Contro il culto della produttività". Scrivi un articolo di opinione argomentato in cui rifletti criticamente sull\'ossessione contemporanea per l\'efficienza, senza cadere in una difesa banale della pigrizia.', text: 'Scrivi l\'articolo (almeno 150 parole).', minWords: 150 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-c1-5-s1', part: 6, partNumber: 1, text: 'Presenta e argomenta in modo articolato il tuo punto di vista.', cueCard: 'Tema: "L\'intelligenza artificiale: fatalità tecnologica o scelta politica?"\n\n• Inquadra criticamente il dibattito (entusiasti vs. apocalittici).\n• Sposta il fuoco sui problemi reali e presenti.\n• Porta esempi concreti.\n• Sostieni una posizione argomentata e sfumata.', followUp: ['Quali rischi attuali dell\'IA ti preoccupano di più?', 'Chi dovrebbe stabilire le regole sull\'uso dell\'intelligenza artificiale?'] },
        { type: 'speak', id: 'cils-c1-5-s2', part: 6, partNumber: 2, text: 'Sostieni un confronto dialettico con l\'esaminatore.', cueCard: 'Tema: "Rendere la cultura accessibile a tutti: fino a che punto senza banalizzarla?"\n\n• accessibilità vs. banalizzazione\n• la difficoltà della buona divulgazione\n• il rispetto per l\'intelligenza del pubblico\n• la tua posizione, capace di accogliere obiezioni\n\nEspressioni C1: "Non si tratta tanto di… quanto di…" / "Il punto dolente è…" / "Vorrei sfumare questa affermazione…"', followUp: ['Hai esempi di buona o cattiva divulgazione culturale?', 'La semplificazione è sempre un tradimento, o a volte è necessaria?'] },
      ],
    },
  ],
};

export default mock;
