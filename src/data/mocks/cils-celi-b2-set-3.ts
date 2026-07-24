import type { MockExam } from './types';

// CILS Due B2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b2-3/.

const mock: MockExam = {
  id: 'cils-b2-3',
  examSlug: 'cils-celi',
  title: 'CILS B2 – Due B2 Set 3',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 270,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b2-3/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a una psicologa del lavoro]
Conduttore: Dottoressa Marini, si parla molto di "equilibrio tra vita e lavoro". È un obiettivo realistico?
Marini: È diventato un tema centrale, soprattutto dopo la diffusione del lavoro da casa. Il confine tra tempo professionale e tempo personale si è fatto sempre più sottile, e questo genera stress.
Conduttore: Di chi è la responsabilità?
Marini: È condivisa. Le aziende devono rispettare gli orari e non pretendere disponibilità continua. Ma anche il singolo deve imparare a porre dei limiti, a spegnere il telefono, a dire di no quando serve.
Conduttore: Non è facile, però.
Marini: No, richiede consapevolezza ed esercizio. Ma è fondamentale: chi non si concede pause paga un prezzo alto, in salute e in produttività. Riposare non è pigrizia, è necessità.

TESTO 2 [Notiziario]
Il comune ha inaugurato ieri una nuova rete di piste ciclabili che collega la periferia al centro storico. L'opera, attesa da anni, ha richiesto un investimento di due milioni di euro. L'assessore ai trasporti ha dichiarato che l'obiettivo è ridurre del venti per cento il traffico automobilistico nei prossimi tre anni. Le prime reazioni dei cittadini sono positive, anche se alcuni commercianti temono difficoltà per il carico e lo scarico delle merci.

TESTO 3 [Conversazione tra colleghi]
Elena: Hai sentito del corso di formazione che offre l'azienda?
Davide: Sì, ma non so se iscrivermi. È fuori orario, e ho già poco tempo libero.
Elena: Lo capisco, però potrebbe essere utile per la carriera. Sono competenze molto richieste.
Davide: Hai ragione. Forse dovrei vederlo come un investimento, non come un peso.
Elena: Esatto. E poi il costo lo copre l'azienda: un'occasione così non capita spesso.`,
      questions: [
        { type: 'mcq', id: 'cils-b2-3-a1', part: 1, text: 'Perché il tema dell\'equilibrio vita-lavoro è diventato centrale?', options: ['Per la riduzione degli orari', 'Per la crisi economica', 'Per l\'aumento degli stipendi', 'Per la diffusione del lavoro da casa'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-3-a2', part: 1, text: 'Di chi è la responsabilità dell\'equilibrio, secondo la psicologa?', options: ['Solo del singolo', 'Condivisa tra aziende e individuo', 'Dello Stato', 'Solo delle aziende'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-a3', part: 1, text: 'Come definisce la psicologa il riposo?', options: ['Una pigrizia', 'Una necessità', 'Un lusso', 'Una perdita di tempo'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-a4', part: 1, text: 'Qual è l\'obiettivo delle nuove piste ciclabili?', options: ['Eliminare gli autobus', 'Aumentare il turismo', 'Ridurre il traffico automobilistico del 20%', 'Chiudere il centro storico'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-3-a5', part: 1, text: 'Chi teme difficoltà per le nuove piste?', options: ['I turisti', 'Gli studenti', 'I ciclisti', 'Alcuni commercianti per il carico merci'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-3-a6', part: 1, text: 'Come dovrebbe vedere Davide il corso di formazione?', options: ['Come un investimento', 'Come una perdita di soldi', 'Come un obbligo', 'Come un peso'], answer: 0 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – La sfida della denatalità

L'Italia è uno dei paesi con il più basso tasso di natalità al mondo. Ogni anno nascono meno bambini, mentre la popolazione invecchia progressivamente. Questo fenomeno, se non affrontato, avrà conseguenze profonde sull'economia e sul sistema sociale del paese.

Le cause sono numerose e intrecciate. Molti giovani rimandano la scelta di avere figli per motivi economici: lavori precari, stipendi bassi, difficoltà a trovare una casa. A ciò si aggiunge la mancanza di servizi adeguati, come gli asili nido, e la difficoltà di conciliare la vita familiare con quella lavorativa, un peso che ricade ancora soprattutto sulle donne.

Alcuni paesi europei hanno affrontato con successo problemi simili, attraverso politiche di sostegno alla famiglia: congedi parentali ben retribuiti, servizi per l'infanzia accessibili, incentivi economici. Questi esempi mostrano che la denatalità non è un destino inevitabile, ma un problema su cui è possibile intervenire.

Gli esperti avvertono, tuttavia, che non basta un singolo provvedimento: serve una strategia di lungo periodo, che dia ai giovani sicurezza e fiducia nel futuro. Senza queste condizioni, difficilmente si sceglierà di mettere al mondo dei figli.

---

TESTO B – Il fascino ambiguo delle serie TV

Negli ultimi anni le serie televisive hanno conquistato un pubblico enorme, diventando un vero fenomeno culturale. Grazie alle piattaforme di streaming, è possibile guardare interi stagioni in pochi giorni, un fenomeno noto come "binge-watching".

Le serie moderne offrono trame complesse, personaggi sfaccettati e temi profondi, tanto da essere paragonate, per qualità narrativa, ai grandi romanzi. Molti apprezzano la possibilità di immergersi in storie lunghe e articolate, che permettono un coinvolgimento impossibile per un film di due ore.

D'altra parte, alcuni studiosi mettono in guardia dai rischi di un consumo eccessivo: notti insonni, sedentarietà, tendenza all'isolamento. Come per ogni cosa, il segreto sta nella misura. Guardare una serie può essere un piacere culturale arricchente, purché non diventi una fuga dalla realtà o un modo per riempire un vuoto.`,
      passageTitle: 'Testi: Denatalità / Serie TV',
      questions: [
        { type: 'mcq', id: 'cils-b2-3-l1', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la situazione dell\'Italia riguardo alla natalità?', options: ['Ha uno dei tassi più alti al mondo', 'Ha uno dei tassi più bassi al mondo', 'La popolazione è molto giovane', 'Nascono troppi bambini'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l2', part: 2, stimulusLabel: 'Testo A', text: 'Perché molti giovani rimandano la scelta di avere figli?', options: ['Per motivi di salute', 'Per motivi economici e lavori precari', 'Perché non amano i bambini', 'Perché viaggiano troppo'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l3', part: 2, stimulusLabel: 'Testo A', text: 'Su chi ricade ancora soprattutto il peso della conciliazione famiglia-lavoro?', options: ['Sullo Stato', 'Sui nonni', 'Sugli uomini', 'Sulle donne'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-3-l4', part: 2, stimulusLabel: 'Testo A', text: 'Cosa mostrano gli esempi di altri paesi europei?', options: ['Che è possibile intervenire con politiche di sostegno alla famiglia', 'Che non serve fare nulla', 'Che il problema non esiste', 'Che la denatalità è inevitabile'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-3-l5', part: 2, stimulusLabel: 'Testo A', text: 'Cosa serve, secondo gli esperti?', options: ['Un solo provvedimento immediato', 'Una strategia di lungo periodo che dia sicurezza ai giovani', 'Nessun intervento', 'Solo incentivi economici una tantum'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l6', part: 2, stimulusLabel: 'Testo B', text: 'Le serie TV sono diventate un fenomeno culturale.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l7', part: 2, stimulusLabel: 'Testo B', text: 'Il "binge-watching" indica guardare una sola puntata al mese.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l8', part: 2, stimulusLabel: 'Testo B', text: 'Le serie moderne vengono paragonate ai grandi romanzi per qualità narrativa.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo il testo, un consumo eccessivo non comporta alcun rischio.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-l10', part: 2, stimulusLabel: 'Testo B', text: 'Il segreto, secondo il testo, sta nella misura.', options: ['Falso', 'Vero'], answer: 1 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b2-3-g1', part: 3, text: 'Bisogna che tu _____ una decisione al più presto.', options: ['prenderai', 'prendevi', 'prendi', 'prenda'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-3-g2', part: 3, text: 'Magari _____ vincere alla lotteria!', options: ['potessi', 'potrò', 'potevo', 'posso'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-3-g3', part: 3, text: 'Per quanto _____, non riuscì a convincerlo.', options: ['prova', 'provasse', 'provava', 'proverà'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-3-g4', part: 3, text: 'Sono problemi _____ occorre trovare una soluzione.', options: ['con cui', 'che', 'ai quali', 'dei quali'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-3-g5', part: 3, text: '_____ detto questo, possiamo concludere.', options: ['Avere', 'Ho', 'Avendo', 'Avuto'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-3-g6', part: 3, text: 'La proposta, _____ interessante, presenta alcuni limiti.', options: ['pur essendo', 'essendo che', 'poiché', 'perché'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-3-g7', part: 3, text: 'Il fenomeno va affrontato, _____ le conseguenze saranno gravi.', options: ['altrimenti', 'perciò', 'infatti', 'ovvero'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-3-g8', part: 3, text: '"Conciliare" due esigenze significa:', options: ['ignorarle', 'metterle in contrasto', 'farle coesistere / armonizzarle', 'eliminarne una'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-3-g9', part: 3, text: 'Non è ricco, _____ vive più che dignitosamente.', options: ['affinché', 'quindi', 'tuttavia', 'perché'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-3-g10', part: 3, text: 'Studia molto _____ superare l\'esame.', options: ['affinché', 'perché', 'benché', 'per'], answer: 3 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo di almeno 180 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-3-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio breve', stimulus: 'In molti paesi europei nascono sempre meno bambini. Scrivi un testo argomentativo in cui analizzi le possibili cause di questo fenomeno e proponi alcune soluzioni, esprimendo la tua opinione.', text: 'Scrivi il testo (almeno 180 parole).', minWords: 180 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-3-w2', part: 5, taskNumber: 2, stimulusLabel: 'Lettera formale', stimulus: 'La tua azienda offre un corso di formazione fuori orario di lavoro. Scrivi una email al responsabile delle risorse umane in cui chiedi maggiori informazioni (orari, durata, contenuti) e proponi che il corso si svolga, almeno in parte, durante l\'orario di lavoro.', text: 'Scrivi la email (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b2-3-s1', part: 6, partNumber: 1, text: 'Esponi il tuo punto di vista sul tema seguente in modo articolato.', cueCard: 'Tema: "Trovare un equilibrio tra vita privata e lavoro è oggi più difficile che in passato."\n\n• Presenta la questione.\n• Argomenta a favore e contro.\n• Porta esempi concreti.\n• Esprimi e difendi la tua opinione.', followUp: ['Come gestisci il tuo tempo tra impegni e riposo?', 'Le aziende dovrebbero fare di più per il benessere dei dipendenti? Come?'] },
        { type: 'speak', id: 'cils-b2-3-s2', part: 6, partNumber: 2, text: 'Sostieni una discussione con l\'esaminatore sul tema proposto.', cueCard: 'Tema: "Le serie TV: un arricchimento culturale o una perdita di tempo?"\n\n• la qualità narrativa delle serie moderne\n• i rischi del "binge-watching"\n• il confronto con la lettura e il cinema\n• la tua posizione argomentata\n\nEspressioni B2: "Da un certo punto di vista…" / "Non si può negare che…" / "Tutto sommato…"', followUp: ['Quanto tempo dedichi a serie o film? È equilibrato?', 'Preferisci leggere un libro o guardare una serie? Perché?'] },
      ],
    },
  ],
};

export default mock;
