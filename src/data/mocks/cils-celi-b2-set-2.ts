import type { MockExam } from './types';

// CILS Due B2 (Università per Stranieri di Siena). Contenuto ORIGINALE WeLearn. Audio: /audio/cils/b2-2/.

const mock: MockExam = {
  id: 'cils-b2-2',
  examSlug: 'cils-celi',
  title: 'CILS B2 – Due B2 Set 2',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 270,
  sections: [
    {
      part: 1, skill: 'listening', title: 'Ascolto – Comprensione Orale',
      audioUrl: '/audio/cils/b2-2/ascolto.mp3',
      instructions: 'Ascolta i testi e scegli la risposta corretta.',
      transcript: `TESTO 1 [Intervista a un architetto]
Conduttore: Architetto Sala, si parla molto di "città verdi". Che cosa significa concretamente?
Sala: Significa ripensare lo spazio urbano mettendo al centro la natura e le persone, non le automobili. Più alberi, più parchi, edifici che consumano meno energia.
Conduttore: Non è un lusso per città ricche?
Sala: È un errore pensarlo. Al contrario, molte soluzioni verdi fanno risparmiare denaro nel lungo periodo: meno consumi, meno spese sanitarie legate all'inquinamento. È un investimento, non una spesa.
Conduttore: Qual è l'ostacolo principale?
Sala: La resistenza al cambiamento. Trasformare una città richiede tempo, coraggio politico e la partecipazione dei cittadini. Senza il coinvolgimento della gente, nessun progetto funziona.

TESTO 2 [Servizio giornalistico]
Un recente studio ha rivelato che gli italiani leggono in media meno di altri europei: solo il quaranta per cento dichiara di aver letto almeno un libro nell'ultimo anno. Le cause sono molteplici: la concorrenza degli schermi, la mancanza di tempo, ma anche un'educazione alla lettura ancora insufficiente. Alcune biblioteche stanno però sperimentando iniziative originali per avvicinare i giovani ai libri, con risultati incoraggianti.

TESTO 3 [Dibattito sul cibo]
Moderatrice: Dottoressa Longo, mangiare bene è davvero più costoso?
Longo: È un luogo comune da sfatare. Cucinare con ingredienti semplici e di stagione costa spesso meno del cibo pronto o dei fast food. Il problema non è il prezzo, ma il tempo e le competenze.
Moderatrice: In che senso?
Longo: Molte persone non hanno più il tempo o non hanno mai imparato a cucinare. Per questo scelgono soluzioni rapide, spesso meno sane. Educare alla cucina, fin da piccoli, sarebbe un investimento prezioso per la salute pubblica.`,
      questions: [
        { type: 'mcq', id: 'cils-b2-2-a1', part: 1, text: 'Cosa significa "città verde" secondo l\'architetto?', options: ['Una città con più automobili', 'Ripensare lo spazio urbano mettendo al centro natura e persone', 'Una città solo per ricchi', 'Una città senza edifici'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-a2', part: 1, text: 'Perché le soluzioni verdi non sono un lusso?', options: ['Perché piacciono ai turisti', 'Perché sono gratis', 'Perché fanno risparmiare nel lungo periodo', 'Perché sono obbligatorie'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-a3', part: 1, text: 'Qual è l\'ostacolo principale, secondo l\'architetto?', options: ['Il clima', 'Il numero di abitanti', 'La mancanza di alberi', 'La resistenza al cambiamento'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-2-a4', part: 1, text: 'Cosa rivela lo studio sulla lettura in Italia?', options: ['Solo il 40% ha letto almeno un libro nell\'ultimo anno', 'Nessuno legge più', 'I giovani leggono moltissimo', 'Gli italiani leggono più degli altri europei'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-a5', part: 1, text: 'Secondo la dottoressa Longo, mangiare bene è costoso?', options: ['Sì, sempre', 'No, è un luogo comune da sfatare', 'Solo al ristorante', 'Solo per le famiglie'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-a6', part: 1, text: 'Qual è il vero problema secondo la dottoressa?', options: ['Le troppe regole', 'Il prezzo degli ingredienti', 'Il tempo e le competenze per cucinare', 'La mancanza di negozi'], answer: 2 },
      ],
    },
    {
      part: 2, skill: 'reading', title: 'Lettura – Comprensione della Lettura',
      instructions: 'Leggi i testi e scegli la risposta corretta o indica se l\'affermazione è vera o falsa.',
      passage: `TESTO A – Il volontariato culturale

In molte città italiane, chiese, musei e siti archeologici che rischierebbero di restare chiusi vengono tenuti aperti grazie all'impegno di volontari. Si tratta spesso di persone in pensione, ma anche di giovani studenti, che dedicano il loro tempo libero ad accogliere i visitatori e a raccontare la storia di questi luoghi.

Questo fenomeno ha aspetti indubbiamente positivi. Permette di valorizzare un patrimonio artistico immenso, che lo Stato da solo non riuscirebbe a gestire, e crea un legame profondo tra i cittadini e la loro storia. Chi fa il volontario, inoltre, spesso dichiara di ricevere più di quanto dà, in termini di soddisfazione personale e relazioni.

Non mancano però le voci critiche. Alcuni sostengono che affidare la gestione del patrimonio a volontari non retribuiti rischi di sostituire posti di lavoro qualificati con lavoro gratuito. Secondo questa visione, sarebbe compito delle istituzioni investire risorse adeguate, invece di contare sulla buona volontà dei cittadini.

La verità sta probabilmente nel mezzo: il volontariato è una risorsa preziosa e insostituibile, ma non può e non deve diventare una scusa per giustificare la mancanza di investimenti pubblici nella cultura.

---

TESTO B – Nativi digitali: un mito da ridimensionare

Si è a lungo pensato che i giovani, cresciuti con smartphone e computer, fossero automaticamente esperti di tecnologia. Recenti studi, però, invitano a ridimensionare questo "mito del nativo digitale". Saper usare i social network o giocare con un videogioco non significa affatto padroneggiare gli strumenti digitali in modo consapevole e critico.

Molti giovani, per esempio, hanno grandi difficoltà a valutare l'affidabilità di una fonte online, a proteggere i propri dati personali o a distinguere un'informazione vera da una falsa. Sono abili nell'uso "ludico" e sociale della tecnologia, ma spesso privi delle competenze necessarie in ambito scolastico o professionale.

Per questo, gli esperti sottolineano l'importanza di un'educazione digitale strutturata, che non dia per scontate competenze che, in realtà, vanno insegnate. La familiarità con un dispositivo non equivale alla capacità di usarlo in modo intelligente.`,
      passageTitle: 'Testi: Volontariato culturale / Nativi digitali',
      questions: [
        { type: 'mcq', id: 'cils-b2-2-l1', part: 2, stimulusLabel: 'Testo A', text: 'Chi tiene aperti molti siti culturali in Italia?', options: ['Solo aziende private', 'Turisti stranieri', 'Solo dipendenti statali', 'Volontari, spesso pensionati o studenti'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-2-l2', part: 2, stimulusLabel: 'Testo A', text: 'Qual è un aspetto positivo del volontariato culturale?', options: ['Valorizza il patrimonio e crea legami con la storia', 'Sostituisce lo Stato del tutto', 'Elimina i musei', 'Fa guadagnare molto'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-l3', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la critica principale citata nel testo?', options: ['I volontari sono troppo pochi', 'Il lavoro gratuito rischia di sostituire posti di lavoro qualificati', 'I siti restano chiusi', 'I volontari guadagnano troppo'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-l4', part: 2, stimulusLabel: 'Testo A', text: 'Qual è la conclusione del testo?', options: ['Lo Stato non deve investire nella cultura', 'Il volontariato deve sostituire lo Stato', 'Il volontariato è prezioso ma non deve giustificare la mancanza di investimenti', 'Il volontariato è inutile'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-l5', part: 2, stimulusLabel: 'Testo A', text: 'Cosa dichiara spesso chi fa volontariato?', options: ['Di voler smettere', 'Di essere sottopagato', 'Di annoiarsi', 'Di ricevere più di quanto dà'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-2-l6', part: 2, stimulusLabel: 'Testo B', text: 'Saper usare i social significa padroneggiare la tecnologia in modo critico.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-l7', part: 2, stimulusLabel: 'Testo B', text: 'Molti giovani faticano a valutare l\'affidabilità di una fonte online.', options: ['Vero', 'Falso'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-l8', part: 2, stimulusLabel: 'Testo B', text: 'I giovani sono abili soprattutto nell\'uso ludico e sociale della tecnologia.', options: ['Falso', 'Vero'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-l9', part: 2, stimulusLabel: 'Testo B', text: 'Secondo gli esperti, le competenze digitali non vanno insegnate.', options: ['Vero', 'Falso'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-l10', part: 2, stimulusLabel: 'Testo B', text: 'La familiarità con un dispositivo equivale a saperlo usare in modo intelligente.', options: ['Falso', 'Vero'], answer: 0 },
      ],
    },
    {
      part: 3, skill: 'general', title: 'Analisi – Strutture Grammaticali e Lessico',
      instructions: 'Scegli la parola o l\'espressione corretta per completare ogni frase.',
      questions: [
        { type: 'mcq', id: 'cils-b2-2-g1', part: 3, text: 'Sebbene _____ giovane, ha molta esperienza.', options: ['è', 'era', 'sia', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-g2', part: 3, text: 'Vorrei che tu _____ più attento.', options: ['sia', 'sei', 'fossi', 'sarai'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-g3', part: 3, text: 'Se fosse partito prima, ora _____ già arrivato.', options: ['era', 'fosse', 'sarebbe', 'sarà'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-g4', part: 3, text: 'Il tema _____ ci occupiamo è complesso.', options: ['di cui', 'a cui', 'per cui', 'che'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-g5', part: 3, text: 'Terminata la riunione, tutti _____ andarono via.', options: ['si ne', 'se ne', 'ci si', 'ne si'], answer: 1 },
        { type: 'mcq', id: 'cils-b2-2-g6', part: 3, text: 'Ha agito senza che nessuno _____ ne accorgesse.', options: ['ne', 'si', 'se', 'ci'], answer: 2 },
        { type: 'mcq', id: 'cils-b2-2-g7', part: 3, text: 'La decisione fu presa _____ tutti i presenti.', options: ['con', 'per', 'di', 'da'], answer: 3 },
        { type: 'mcq', id: 'cils-b2-2-g8', part: 3, text: '"Sfatare" un luogo comune significa:', options: ['dimostrare che è falso', 'diffonderlo', 'crearlo', 'confermarlo'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-g9', part: 3, text: 'Non solo è competente, _____ anche molto disponibile.', options: ['ma', 'però', 'invece', 'anzi'], answer: 0 },
        { type: 'mcq', id: 'cils-b2-2-g10', part: 3, text: 'Faremo il possibile _____ tutto vada bene.', options: ['poiché', 'perché', 'affinché', 'benché'], answer: 2 },
      ],
    },
    {
      part: 4, skill: 'writing', title: 'Scrittura – Produzione Scritta 1',
      instructions: 'Scrivi un testo argomentativo di almeno 180 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-2-w1', part: 4, taskNumber: 1, stimulusLabel: 'Saggio breve', stimulus: 'In molte città il patrimonio culturale è gestito grazie a volontari non retribuiti. Scrivi un testo argomentativo in cui discuti i pro e i contro di questo fenomeno ed esprimi la tua opinione con esempi.', text: 'Scrivi il testo (almeno 180 parole).', minWords: 180 },
      ],
    },
    {
      part: 5, skill: 'writing', title: 'Scrittura – Produzione Scritta 2',
      instructions: 'Scrivi un testo formale di almeno 120 parole.',
      questions: [
        { type: 'write', id: 'cils-b2-2-w2', part: 5, taskNumber: 2, stimulusLabel: 'Lettera formale', stimulus: 'La biblioteca della tua città vuole avvicinare i giovani alla lettura. Scrivi una lettera al direttore in cui proponi due o tre iniziative concrete, spiegando perché potrebbero funzionare.', text: 'Scrivi la lettera (almeno 120 parole).', minWords: 120 },
      ],
    },
    {
      part: 6, skill: 'speaking', title: 'Parlato – Produzione Orale',
      instructions: 'La prova orale si sviluppa in due parti.',
      questions: [
        { type: 'speak', id: 'cils-b2-2-s1', part: 6, partNumber: 1, text: 'Esponi il tuo punto di vista sul tema seguente in modo articolato.', cueCard: 'Tema: "Le città del futuro dovranno essere più verdi e a misura d\'uomo."\n\n• Presenta la questione.\n• Argomenta vantaggi e difficoltà.\n• Porta esempi concreti.\n• Esprimi e difendi la tua opinione.', followUp: ['Com\'è la tua città dal punto di vista ambientale?', 'Cosa saresti disposto/a a cambiare nelle tue abitudini per una città più sostenibile?'] },
        { type: 'speak', id: 'cils-b2-2-s2', part: 6, partNumber: 2, text: 'Sostieni una discussione con l\'esaminatore sul tema proposto.', cueCard: 'Tema: "I giovani sono davvero esperti di tecnologia?"\n\n• il mito del "nativo digitale"\n• uso ludico vs. uso critico e consapevole\n• il ruolo dell\'educazione digitale\n• la tua posizione argomentata\n\nEspressioni B2: "Contrariamente a quanto si pensa…" / "Occorre distinguere tra…" / "In ultima analisi…"', followUp: ['Ti senti competente nell\'uso critico della tecnologia? Perché?', 'La scuola dovrebbe insegnare a usare internet? Come?'] },
      ],
    },
  ],
};

export default mock;
