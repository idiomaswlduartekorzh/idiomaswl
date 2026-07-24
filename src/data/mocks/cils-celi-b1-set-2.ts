import type { MockExam } from './types';

// CILS Uno B1 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b1-2/.

const mock: MockExam = {
  id: 'b1-2',
  examSlug: 'cils-celi',
  title: 'CILS B1 – Uno B1 Set 2',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 240,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b1-2/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista in radio]
Conduttore: Oggi parliamo di volontariato con Elena Bianchi, che coordina un'associazione ambientale.
Elena: Sì, la nostra associazione organizza ogni mese giornate di pulizia di spiagge e parchi. Partecipano soprattutto giovani, ma anche intere famiglie.
Conduttore: Quante persone coinvolgete di solito?
Elena: In media un centinaio a evento. L'estate scorsa abbiamo raccolto oltre due tonnellate di rifiuti in una sola giornata.
Conduttore: Un risultato importante. Come si può partecipare?
Elena: Basta iscriversi gratuitamente sul nostro sito. Non serve alcuna esperienza, forniamo noi tutto il materiale.

TESTO 2 [Annuncio in una scuola di lingue]
Cari studenti, vi ricordiamo che i corsi estivi inizieranno il primo luglio. Le lezioni si terranno dal lunedì al venerdì, dalle nove a mezzogiorno. Chi è interessato alle attività pomeridiane, come le gite culturali e i laboratori di cucina, deve iscriversi in segreteria entro il venti giugno. I posti sono limitati.

TESTO 3 [Conversazione al lavoro]
Direttore: Sara, ho letto la sua proposta per il nuovo progetto. È interessante, ma ho qualche dubbio sui costi.
Sara: Capisco. In effetti l'investimento iniziale è alto, ma i risparmi a lungo termine sarebbero notevoli.
Direttore: Ha dei dati concreti?
Sara: Sì, ho preparato un documento con le stime dei prossimi tre anni. Glielo mando subito via email.
Direttore: Perfetto. Ne parliamo alla riunione di giovedì.`,
      questions: [
        { type: 'mcq', id: 'cils-b1-2-a1', part: 1, text: 'Che cosa organizza l\'associazione di Elena?', options: ['Corsi di lingua', 'Gite in montagna', 'Concerti di beneficenza', 'Giornate di pulizia di spiagge e parchi'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-2-a2', part: 1, text: 'Quanti rifiuti hanno raccolto in una giornata l\'estate scorsa?', options: ['Mezza tonnellata', 'Oltre due tonnellate', 'Dieci tonnellate', 'Un centinaio di chili'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-a3', part: 1, text: 'Come si fa a partecipare?', options: ['Pagando una quota annuale', 'Iscrivendosi gratis sul sito', 'Con un colloquio', 'Portando materiale proprio'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-a4', part: 1, text: 'Entro quando ci si iscrive alle attività pomeridiane?', options: ['Non c\'è scadenza', 'Entro il primo luglio', 'Entro il venti giugno', 'Entro fine giugno'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-2-a5', part: 1, text: 'Qual è il dubbio del direttore sul progetto di Sara?', options: ['La mancanza di personale', 'La sede', 'I tempi troppo lunghi', 'I costi'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-2-a6', part: 1, text: 'Che cosa manderà Sara al direttore?', options: ['Un video di presentazione', 'Una lettera formale', 'Un preventivo di un fornitore', 'Un documento con le stime dei costi'], answer: 3 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il ritorno ai piccoli borghi

Negli ultimi anni, molti italiani hanno riscoperto il fascino dei piccoli borghi, i paesini di poche centinaia di abitanti sparsi tra colline e montagne. Dopo decenni di spopolamento, in cui i giovani lasciavano questi luoghi per trasferirsi nelle grandi città, oggi si osserva una tendenza opposta.

Le ragioni sono diverse. La possibilità di lavorare da remoto ha permesso a molti professionisti di vivere lontano dagli uffici, in luoghi più tranquilli e meno costosi. Inoltre, la pandemia ha spinto molte persone a cercare spazi più ampi e un maggiore contatto con la natura.

Alcuni comuni hanno lanciato iniziative per attirare nuovi abitanti: case in vendita a un euro da ristrutturare, incentivi economici per chi apre un'attività, servizi digitali potenziati. I risultati, però, non sono uniformi: dove mancano scuole, ospedali e trasporti, è difficile trattenere le famiglie a lungo.

Gli esperti sottolineano che il futuro dei borghi dipenderà dalla capacità di combinare la qualità della vita con servizi moderni ed efficienti. Solo così questi luoghi potranno tornare a vivere davvero, e non solo durante le vacanze estive.

---

TESTO B – Dormire bene: un bisogno sottovalutato

Il sonno è fondamentale per la nostra salute, eppure molte persone non gli danno la giusta importanza. Secondo recenti ricerche, un adulto dovrebbe dormire tra le sette e le nove ore per notte, ma una parte crescente della popolazione dorme molto meno.

Le conseguenze di un sonno insufficiente sono numerose: difficoltà di concentrazione, cattivo umore, minori difese immunitarie e, a lungo termine, un maggior rischio di malattie cardiovascolari. L'uso di smartphone e computer fino a tarda notte è uno dei principali responsabili di questo problema, perché la luce degli schermi disturba i ritmi naturali del corpo.

Gli esperti consigliano alcune semplici abitudini: andare a dormire sempre alla stessa ora, evitare pasti pesanti la sera e spegnere i dispositivi elettronici almeno un'ora prima di coricarsi.`,
      passageTitle: 'Testi: I borghi / Il sonno',
      questions: [
        { type: 'mcq', id: 'cils-b1-2-l1', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la tendenza attuale rispetto ai piccoli borghi?', options: ['Continuano a spopolarsi come prima', 'Alcune persone ci ritornano a vivere', 'Diventano tutti città', 'Vengono abbandonati del tutto'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-l2', part: 2, stimulusLabel: 'Testo A', text: 'Che cosa ha favorito il ritorno ai borghi?', options: ['Il turismo di massa', 'L\'aumento degli stipendi', 'Il lavoro da remoto e la ricerca di natura', 'La chiusura delle città'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-2-l3', part: 2, stimulusLabel: 'Testo A', text: 'Quale iniziativa hanno lanciato alcuni comuni?', options: ['Aumentare le tasse', 'Chiudere le scuole', 'Vietare l\'ingresso ai turisti', 'Case a un euro da ristrutturare'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-2-l4', part: 2, stimulusLabel: 'Testo A', text: 'Da cosa dipenderà il futuro dei borghi, secondo gli esperti?', options: ['Dalla combinazione di qualità della vita e servizi moderni', 'Dal numero di case vendute', 'Dalla vicinanza al mare', 'Solo dal turismo estivo'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-l5', part: 2, stimulusLabel: 'Testo A', text: 'Perché è difficile trattenere le famiglie in alcuni borghi?', options: ['Perché mancano scuole, ospedali e trasporti', 'Perché costano troppo', 'Perché sono troppo affollati', 'Perché fa troppo caldo'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-l6', part: 2, stimulusLabel: 'Testo B', text: 'Un adulto dovrebbe dormire tra le sette e le nove ore per notte.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-l7', part: 2, stimulusLabel: 'Testo B', text: 'Dormire poco non ha conseguenze sulla salute.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-l8', part: 2, stimulusLabel: 'Testo B', text: 'La luce degli schermi disturba i ritmi naturali del corpo.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-l9', part: 2, stimulusLabel: 'Testo B', text: 'Gli esperti consigliano di mangiare pasti pesanti la sera.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-l10', part: 2, stimulusLabel: 'Testo B', text: 'È consigliato spegnere i dispositivi almeno un\'ora prima di dormire.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b1-2-g1', part: 3, text: 'Credo che domani _____ bel tempo.', options: ['farà', 'faceva', 'fa', 'faccia'], answer: 3 },
        { type: 'mcq', id: 'cils-b1-2-g2', part: 3, text: 'Se avessi saputo, ti _____ avvisato.', options: ['avrei', 'avrò', 'abbia', 'avevo'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-g3', part: 3, text: 'Nonostante _____ stanco, è uscito.', options: ['è', 'era', 'fosse', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-2-g4', part: 3, text: 'Hai bisogno di aiuto? Sì, _____ ho proprio bisogno.', options: ['la', 'lo', 'ne', 'ci'], answer: 2 },
        { type: 'mcq', id: 'cils-b1-2-g5', part: 3, text: 'La casa _____ abito è molto antica.', options: ['in cui', 'quale', 'che', 'dove'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-g6', part: 3, text: 'Appena _____ a casa, ti telefono.', options: ['sarò arrivato', 'arrivassi', 'arrivavo', 'arrivo'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-g7', part: 3, text: 'Il progetto è stato realizzato _____ tutti.', options: ['di', 'da', 'per', 'con'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-g8', part: 3, text: 'Prendere una decisione così importante _____ tempo.', options: ['cerca', 'richiede', 'domanda', 'chiede'], answer: 1 },
        { type: 'mcq', id: 'cils-b1-2-g9', part: 3, text: '"Eventualmente" in italiano significa:', options: ['se necessario / caso mai', 'purtroppo', 'sicuramente', 'alla fine'], answer: 0 },
        { type: 'mcq', id: 'cils-b1-2-g10', part: 3, text: 'Mi ha promesso _____ mi avrebbe aiutato.', options: ['che', 'a', 'per', 'di'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-2-w1', part: 4, taskNumber: 1, stimulusLabel: 'Testo argomentativo', stimulus: 'Molte persone lasciano le grandi città per trasferirsi in piccoli borghi. Scrivi un testo in cui presenti i vantaggi e gli svantaggi della vita in un piccolo paese ed esprimi la tua opinione.', text: 'Scrivi il testo (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un\'email di almeno 80 parole.',
      questions: [
        { type: 'write', id: 'cils-b1-2-w2', part: 5, taskNumber: 2, stimulusLabel: 'Email', stimulus: 'Hai visto un annuncio per un lavoro estivo come animatore in un villaggio turistico. Scrivi un\'email al responsabile: presentati, spiega perché sei interessato/a e chiedi informazioni sull\'orario e sul compenso.', text: 'Scrivi l\'email (almeno 80 parole).', minWords: 80 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b1-2-s1', part: 6, partNumber: 1, text: 'Osserva questa immagine, descrivila ed esprimi la tua opinione.', cueCard: 'Immagine: un gruppo di volontari che raccoglie rifiuti in un parco cittadino.\n\n• Descrivi la scena.\n• Hai mai fatto volontariato? Ti piacerebbe? Perché?\n• Secondo te, il volontariato è importante per la società?', followUp: ['Che tipo di volontariato ti interesserebbe di più?', 'Come si può convincere più giovani a fare volontariato?'] },
        { type: 'speak', id: 'cils-b1-2-s2', part: 6, partNumber: 2, text: 'Parla di come vorresti vivere in futuro. Usa la cue card come guida.', cueCard: 'Parla del tuo futuro:\n• Vorresti vivere in città o in campagna?\n• In che tipo di casa?\n• Che lavoro vorresti fare?\n• Con chi vorresti vivere?', followUp: ['Preferisci una vita tranquilla o dinamica? Perché?', 'Pensi che realizzerai questi progetti? Perché?'] },
      ],
    },
  ],
};

export default mock;
