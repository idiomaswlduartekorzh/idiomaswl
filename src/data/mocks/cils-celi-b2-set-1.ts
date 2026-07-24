import type { MockExam } from './types';

// CILS Due B2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b2-1/.

const mock: MockExam = {
  id: 'cils-b2-1',
  examSlug: 'cils-celi',
  title: 'CILS B2 – Due B2 Set 1',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 270,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b2-1/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a una sociologa]
Conduttore: Professoressa Vinci, si parla molto di "società della fretta". Che cosa intende?
Vinci: Viviamo in un'epoca in cui tutto deve essere immediato: le informazioni, le risposte, persino le relazioni. La tecnologia ci ha abituati a non aspettare, e questo ha cambiato profondamente il nostro modo di pensare.
Conduttore: È necessariamente un male?
Vinci: Non del tutto. La rapidità ha innegabili vantaggi. Il problema nasce quando perdiamo la capacità di soffermarci, di riflettere con calma. La lentezza, in certi ambiti, è una risorsa preziosa: pensiamo alla lettura, all'apprendimento, alla creatività.
Conduttore: Come si può recuperare questa dimensione?
Vinci: Non si tratta di rifiutare la tecnologia, ma di usarla con consapevolezza. Ritagliarsi momenti senza schermi, coltivare attività che richiedono tempo. È una questione di equilibrio, non di rinuncia.

TESTO 2 [Notiziario culturale]
Si è conclusa ieri la rassegna cinematografica dedicata al cinema d'autore europeo, che ha registrato un'affluenza record. Oltre quindicimila spettatori hanno partecipato alle proiezioni e agli incontri con i registi. Gli organizzatori si dicono soddisfatti e annunciano che, vista la richiesta, l'anno prossimo la manifestazione durerà due settimane invece di una.

TESTO 3 [Dibattito radiofonico]
Moderatore: Il tema di oggi è lo smart working. Dottor Ferri, è favorevole?
Ferri: In parte sì. Il lavoro da remoto offre flessibilità e riduce gli spostamenti. Ma non possiamo ignorare i rischi: l'isolamento, la difficoltà di separare vita privata e lavoro.
Moderatore: Quindi propone un ritorno all'ufficio?
Ferri: No, propongo un modello ibrido. Alcuni giorni in presenza, per mantenere i rapporti umani e la collaborazione, altri da casa, per la concentrazione. La rigidità, in un senso o nell'altro, non aiuta nessuno.`,
      questions: [
        { type: 'mcq', id: 'cils-b2-1-a1', part: 1, text: 'Che cosa intende la sociologa per "società della fretta"?', options: ['Una società senza tecnologia', 'Un mondo senza regole', 'Una società che lavora troppo', 'Un\'epoca in cui tutto deve essere immediato'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-a2', part: 1, text: 'Qual è la posizione della sociologa sulla rapidità?', options: ['Ha vantaggi, ma non deve farci perdere la capacità di riflettere', 'Va eliminata del tutto', 'Riguarda solo i giovani', 'È sempre negativa'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-1-a3', part: 1, text: 'Che cosa propone la sociologa?', options: ['Rifiutare la tecnologia', 'Usare la tecnologia con consapevolezza ed equilibrio', 'Lavorare di più', 'Vietare gli schermi'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-a4', part: 1, text: 'Perché la rassegna durerà due settimane l\'anno prossimo?', options: ['Per problemi organizzativi', 'Per mancanza di fondi', 'Per la grande richiesta e affluenza', 'Per volere dei registi'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-1-a5', part: 1, text: 'Quali rischi dello smart working segnala il dottor Ferri?', options: ['Mancanza di computer', 'Troppa collaborazione', 'Costi troppo alti', 'Isolamento e difficoltà di separare vita e lavoro'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-a6', part: 1, text: 'Quale modello propone Ferri?', options: ['Solo casa', 'Un modello ibrido', 'Nessun lavoro', 'Solo ufficio'], answer: 1 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – L'italiano nel mondo

L'italiano è oggi una delle lingue più studiate al mondo, spesso al quarto o quinto posto tra le lingue più richieste nei corsi all'estero. Ciò che rende questo dato sorprendente è che l'Italia non è una grande potenza economica né demografica come i paesi anglofoni o la Cina: le ragioni del successo dell'italiano sono soprattutto culturali.

Molte persone scelgono di studiare l'italiano per passione: per la musica, l'arte, la cucina, il cinema, la moda o semplicemente per il fascino del "made in Italy". A differenza di altre lingue, studiate per necessità professionale, l'italiano viene spesso appreso per piacere, per il legame affettivo che suscita.

Questo fenomeno ha però anche una dimensione concreta. Il settore del turismo, quello del design e quello enogastronomico offrono numerose opportunità di lavoro a chi conosce l'italiano. Inoltre, molte aziende italiane operano all'estero e ricercano personale in grado di comunicare nella lingua.

Alcuni linguisti sottolineano tuttavia un paradosso: mentre cresce l'interesse per l'italiano all'estero, in patria la lingua è "minacciata" dall'uso eccessivo di parole straniere, soprattutto inglesi. Il dibattito su come difendere la ricchezza dell'italiano, senza però chiudersi agli influssi esterni, resta aperto e attuale.

---

TESTO B – Il lavoro che verrà

L'automazione e l'intelligenza artificiale stanno trasformando il mondo del lavoro a una velocità mai vista prima. Molti mestieri tradizionali rischiano di scomparire, mentre ne nascono di nuovi, spesso legati alla tecnologia. Questa transizione genera timori comprensibili, ma anche opportunità.

Gli esperti concordano su un punto: le competenze richieste stanno cambiando. Non basterà più avere conoscenze tecniche specifiche, che rischiano di diventare rapidamente obsolete. Sempre più importanti saranno le cosiddette "competenze trasversali": la capacità di adattarsi, di risolvere problemi, di collaborare, di comunicare e di continuare ad apprendere per tutta la vita.

La sfida, dunque, non riguarda solo le aziende, ma anche i sistemi educativi, che dovranno formare persone flessibili e capaci di reinventarsi. Chi saprà cogliere questi cambiamenti, invece di subirli, avrà maggiori possibilità di successo nel mondo del lavoro di domani.`,
      passageTitle: 'Testi: L\'italiano nel mondo / Il lavoro che verrà',
      questions: [
        { type: 'mcq', id: 'cils-b2-1-l1', part: 2, stimulusLabel: 'Testo A', text: 'Perché è sorprendente il successo dell\'italiano nel mondo?', options: ['Perché l\'Italia è una grande potenza economica', 'Perché l\'Italia non è una grande potenza economica o demografica', 'Perché nessuno lo studia', 'Perché è una lingua facile'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-l2', part: 2, stimulusLabel: 'Testo A', text: 'Per quale motivo molti studiano l\'italiano?', options: ['Per emigrare', 'Solo per lavoro', 'Per passione verso arte, musica, cucina e cultura', 'Perché è obbligatorio'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-1-l3', part: 2, stimulusLabel: 'Testo A', text: 'Quale dimensione concreta ha il fenomeno?', options: ['Solo studio teorico', 'Solo per italiani', 'Nessuna opportunità di lavoro', 'Opportunità nel turismo, design ed enogastronomia'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-l4', part: 2, stimulusLabel: 'Testo A', text: 'Qual è il paradosso segnalato dai linguisti?', options: ['L\'italiano è troppo difficile', 'Nessuno lo parla più', 'È una lingua morta', 'L\'italiano cresce all\'estero ma in patria è minacciato dalle parole straniere'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-l5', part: 2, stimulusLabel: 'Testo A', text: 'Come viene descritto il dibattito sulla difesa dell\'italiano?', options: ['Chiuso e risolto', 'Aperto e attuale', 'Inutile', 'Vietato'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-l6', part: 2, stimulusLabel: 'Testo B', text: 'L\'automazione e l\'IA stanno trasformando il lavoro molto velocemente.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-1-l7', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, non nasceranno nuovi mestieri.', options: ['Falso', 'Vero'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-1-l8', part: 2, stimulusLabel: 'Testo B', text: 'Le competenze trasversali diventeranno sempre più importanti.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-l9', part: 2, stimulusLabel: 'Testo B', text: 'I sistemi educativi non dovranno cambiare.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-l10', part: 2, stimulusLabel: 'Testo B', text: 'Chi coglie i cambiamenti avrà più possibilità di successo.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b2-1-g1', part: 3, text: 'Benché _____ molto impegnato, trova sempre il tempo per gli amici.', options: ['sia', 'sarà', 'è', 'era'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-1-g2', part: 3, text: 'Se me lo avessi detto prima, ti _____ aiutato.', options: ['avrei', 'avrò', 'abbia', 'avevo'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-1-g3', part: 3, text: 'Temo che ormai _____ troppo tardi per intervenire.', options: ['è', 'sia', 'era', 'fosse'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-g4', part: 3, text: 'Si comportò come se non _____ nulla.', options: ['saprà', 'sapeva', 'sapesse', 'sa'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-1-g5', part: 3, text: 'È una questione _____ vale la pena riflettere.', options: ['di cui', 'a cui', 'che', 'su cui'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-g6', part: 3, text: 'Una volta _____ il lavoro, potremo riposarci.', options: ['finendo', 'finire', 'finiva', 'finito'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-g7', part: 3, text: 'Pur _____ i rischi, decise di partire.', options: ['conoscere', 'conoscendo', 'conosciuto', 'conosce'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-1-g8', part: 3, text: 'Il progetto verrà completato _____ fine anno.', options: ['in', 'tra', 'entro', 'da'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-1-g9', part: 3, text: '"Ostacolare" un progetto significa:', options: ['finanziarlo', 'presentarlo', 'favorirlo', 'renderne difficile la realizzazione'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-1-g10', part: 3, text: 'Non condivido la sua opinione, _____ la rispetto.', options: ['tuttavia', 'affinché', 'purché', 'perciò'], answer: 0 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo di almeno 180 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-1-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio breve', stimulus: 'Viviamo in una "società della fretta", in cui tutto deve essere immediato. Scrivi un testo argomentativo in cui analizzi vantaggi e svantaggi di questo stile di vita ed esprimi, con esempi concreti, la tua opinione.', text: 'Scrivi il testo (almeno 180 parole).', minWords: 180 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-1-w2', part: 5, taskNumber: 2, stimulusLabel: 'Lettera formale al giornale', stimulus: 'Un giornale ha pubblicato un articolo che critica lo smart working, definendolo dannoso per le aziende. Scrivi una lettera alla redazione in cui esponi la tua posizione in modo argomentato.', text: 'Scrivi la lettera (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b2-1-s1', part: 6, partNumber: 1, text: 'Esponi il tuo punto di vista sul tema seguente in modo articolato.', cueCard: 'Tema: "La tecnologia ci ha resi più veloci ma meno capaci di concentrarci."\n\n• Presenta la questione.\n• Argomenta a favore e contro.\n• Porta esempi concreti dalla tua esperienza.\n• Esprimi e difendi la tua opinione.', followUp: ['Riesci a "staccare" dalla tecnologia? Come?', 'Pensi che le nuove generazioni siano più o meno concentrate? Perché?'] },
        { type: 'speak', id: 'cils-b2-1-s2', part: 6, partNumber: 2, text: 'Sostieni una discussione con l\'esaminatore sul tema proposto.', cueCard: 'Tema: "Il lavoro del futuro: quali competenze serviranno davvero?"\n\n• competenze tecniche vs. competenze trasversali\n• il ruolo della scuola e della formazione continua\n• opportunità e timori dell\'automazione\n• la tua posizione argomentata\n\nEspressioni B2: "Se da un lato… dall\'altro…" / "Va detto che…" / "In definitiva…"', followUp: ['Come ti prepari ai cambiamenti del mondo del lavoro?', 'L\'intelligenza artificiale ti preoccupa o ti entusiasma? Perché?'] },
      ],
    },
  ],
};

export default mock;
