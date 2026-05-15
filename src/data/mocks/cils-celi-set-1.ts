import type { MockExam } from './types';

const mock: MockExam = {
  id: 'set-1',
  examSlug: 'cils-celi',
  title: 'CILS B1 – Uno B1',
  subtitle: 'Ascolto · Lettura · Analisi · Scrittura · Parlato',
  timeMinutes: 240,
  sections: [
    // ─────────────────────────────────────────────────────────────
    // SECTION 1 — Ascolto
    // ─────────────────────────────────────────────────────────────
    {
      part: 1,
      title: 'Ascolto – Comprensione Orale',
      skill: 'listening',
      instructions:
        'Escucha los textos y elige la respuesta correcta entre las cuatro opciones propuestas.',
      transcript: `
TESTO 1
[Una telefonata tra due amici]
Sofia: Pronto? Ciao, Marco! Come stai?
Marco: Ciao Sofia! Bene, grazie. Senti, ti chiamo per organizzare la cena per il compleanno di Luca sabato sera.
Sofia: Ottima idea! Avevi già pensato a un ristorante?
Marco: Sì, pensavo al "Da Tonino", vicino alla stazione. Fanno un'ottima pasta fatta in casa e il servizio è molto buono.
Sofia: Perfetto! A che ora ci troviamo?
Marco: Direi alle otto e mezza. Ho già prenotato per sei persone. Ci saranno anche Giulia, Davide e Anna.
Sofia: Benissimo! Portiamo anche un regalo insieme?
Marco: Sì, ho pensato di comprare un libro di cucina che Luca voleva da tempo. Costa venti euro a testa.
Sofia: Va bene! Allora ci vediamo sabato alle otto e mezza davanti al ristorante.
Marco: Perfetto! A presto, Sofia.

TESTO 2
[Un annuncio radiofonico]
Buongiorno a tutti i cittadini. Il Comune di Bologna è lieto di annunciare il lancio del nuovo programma di raccolta differenziata "Bologna Verde". A partire dal primo del mese prossimo, in tutta la città entreranno in funzione nuovi bidoni di colore arancione dedicati ai rifiuti organici: scarti di cibo, bucce di frutta e verdura. I tradizionali bidoni gialli continueranno a essere usati per la plastica e le lattine, mentre quelli blu restano destinati alla carta e al cartone. I cittadini che aderiranno correttamente al programma riceveranno un bonus annuale sulla tassa dei rifiuti. Per maggiori informazioni visitare il sito del Comune o chiamare il numero verde 800-123-456. Grazie per la vostra collaborazione nella costruzione di una città più sostenibile.

TESTO 3
[Una conversazione in ufficio universitario]
Impiegata: Buongiorno, prego.
Studente: Buongiorno. Volevo informazioni sulle iscrizioni al corso di laurea magistrale in Scienze della Comunicazione.
Impiegata: Certo. Le iscrizioni per il prossimo anno accademico aprono il quindici giugno e chiudono il trenta settembre.
Studente: Capisco. Io mi sono laureato triennale ad aprile. Posso iscrivermi subito?
Impiegata: Sì, l'importante è avere il titolo prima della scadenza. Tenga presente però che deve anche presentare il portfolio con i suoi lavori entro il quindici luglio.
Studente: E per quanto riguarda il test di ammissione?
Impiegata: Il test si svolge il dieci ottobre. I risultati vengono pubblicati entro una settimana. In caso di ammissione, deve formalizzare l'iscrizione entro tre giorni dalla pubblicazione dei risultati.
Studente: Perfetto. E dove trovo tutta la documentazione necessaria?
Impiegata: Sul sito universitario, nella sezione "Ammissioni". Lì trova anche il bando completo con tutti i requisiti.
Studente: Grazie mille, è stato molto utile.
Impiegata: Prego, buona fortuna!
      `.trim(),
      questions: [
        // Testo 1 — questions 1–2
        {
          type: 'mcq',
          id: 's1-q1',
          part: 1,
          text: 'Dove si svolgerà la cena di compleanno di Luca?',
          options: [
            'A casa di Marco',
            'Al ristorante "Da Tonino"',
            'In una pizzeria vicino al centro',
            'Al bar della stazione',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's1-q2',
          part: 1,
          text: 'Che regalo hanno deciso di fare a Luca?',
          options: [
            'Una bottiglia di vino pregiato',
            'Un biglietto per un concerto',
            'Un libro di cucina',
            'Una cena pagata dagli amici',
          ],
          answer: 2,
        },
        // Testo 2 — questions 3–4
        {
          type: 'mcq',
          id: 's1-q3',
          part: 1,
          text: "A cosa servono i nuovi bidoni arancioni nel programma 'Bologna Verde'?",
          options: [
            'Alla raccolta della plastica e delle lattine',
            'Alla raccolta della carta e del cartone',
            'Alla raccolta dei rifiuti organici',
            'Alla raccolta del vetro',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 's1-q4',
          part: 1,
          text: 'Quale vantaggio ricevono i cittadini che partecipano correttamente al programma?',
          options: [
            'Un parcheggio gratuito in centro',
            'Un bonus annuale sulla tassa dei rifiuti',
            'Un abbonamento ai mezzi pubblici',
            'Una riduzione sulla bolletta del gas',
          ],
          answer: 1,
        },
        // Testo 3 — questions 5–6
        {
          type: 'mcq',
          id: 's1-q5',
          part: 1,
          text: 'Quando chiudono le iscrizioni alla laurea magistrale?',
          options: [
            'Il quindici giugno',
            'Il quindici luglio',
            'Il dieci ottobre',
            'Il trenta settembre',
          ],
          answer: 3,
        },
        {
          type: 'mcq',
          id: 's1-q6',
          part: 1,
          text: 'Entro quando deve essere presentato il portfolio?',
          options: [
            'Entro il quindici giugno',
            'Entro il quindici luglio',
            'Entro il trenta settembre',
            'Entro il dieci ottobre',
          ],
          answer: 1,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SECTION 2 — Lettura
    // ─────────────────────────────────────────────────────────────
    {
      part: 2,
      title: 'Lettura – Comprensione della Lettura',
      skill: 'reading',
      instructions:
        'Lee los textos y elige la respuesta correcta, o indica si la afirmación es verdadera o falsa.',
      passage: `
TESTO A – La fuga dei cervelli: i giovani italiani in Europa

Negli ultimi anni un numero sempre maggiore di giovani italiani ha deciso di lasciare il proprio paese per cercare lavoro all'estero. Questo fenomeno, conosciuto come "fuga dei cervelli", coinvolge soprattutto laureati e professionisti qualificati tra i venti e i trentacinque anni. Secondo le statistiche più recenti, ogni anno circa centomila italiani si trasferiscono in un altro paese europeo.

Le mete preferite sono Londra, Berlino, Amsterdam e Barcellona, città dinamiche che offrono molte opportunità professionali e stipendi più alti rispetto alla media italiana. I settori più richiesti sono quello tecnologico, quello medico-scientifico e quello creativo. Molti giovani lamentano la difficoltà di trovare in Italia un lavoro stabile e ben retribuito, soprattutto nei primi anni dopo la laurea.

La situazione preoccupa non poco i demografi e gli economisti italiani. Alcune stime indicano che, tra il 2010 e il 2024, l'Italia ha perso quasi un milione di lavoratori qualificati. Questo provoca una carenza di competenze in settori strategici e rappresenta un costo enorme per il sistema educativo del paese, che forma professionisti poi impiegati all'estero.

Tuttavia, non tutti i giovani che emigrano lo fanno per necessità. Una parte di loro sceglie l'estero per curiosità, per fare esperienze internazionali e per imparare nuove lingue. Alcune di queste persone, dopo qualche anno, tornano in Italia portando con sé competenze e prospettive nuove, contribuendo così allo sviluppo del paese.

Il governo italiano ha avviato negli ultimi anni alcuni programmi di incentivi fiscali per attrarre i "cervelli di ritorno", ma molti esperti ritengono che siano misure ancora insufficienti per invertire la tendenza in modo significativo.

---

TESTO B – La dieta mediterranea: un tesoro per la salute

La dieta mediterranea è considerata da molti nutrizionisti uno dei modelli alimentari più sani al mondo. Riconosciuta dall'UNESCO come patrimonio culturale immateriale dell'umanità nel 2010, questa dieta si basa sul consumo abbondante di frutta, verdura, legumi, cereali integrali, olio d'oliva e pesce. La carne rossa viene consumata solo occasionalmente.

Numerosi studi scientifici hanno dimostrato che seguire la dieta mediterranea riduce il rischio di malattie cardiovascolari, diabete di tipo 2 e alcune forme di cancro. L'olio d'oliva, ricco di grassi insaturi, è considerato il principale responsabile di molti di questi benefici.

Oltre agli aspetti nutrizionali, la dieta mediterranea promuove anche uno stile di vita basato sulla convivialità: i pasti vengono consumati lentamente, in compagnia di familiari o amici, il che contribuisce al benessere psicologico. Anche l'attività fisica moderata è parte integrante di questo stile di vita.

Negli ultimi decenni, tuttavia, la dieta mediterranea tradizionale si è modificata nelle abitudini quotidiane di molte famiglie italiane, greche e spagnole. Il consumo di cibo industriale e fast food è aumentato notevolmente, specialmente tra i più giovani. Gli esperti avvertono che abbandonare questo modello alimentare potrebbe avere conseguenze negative sulla salute pubblica nei prossimi anni.
      `.trim(),
      questions: [
        // Testo A — 5 MCQ (3 options each)
        {
          type: 'mcq',
          id: 's2-q1',
          part: 2,
          stimulusLabel: 'Testo A',
          text: 'Quanti italiani emigrano in Europa ogni anno, secondo le statistiche?',
          options: [
            'Circa cinquantamila',
            'Circa centomila',
            'Quasi un milione',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's2-q2',
          part: 2,
          stimulusLabel: 'Testo A',
          text: 'Quale settore NON è menzionato tra quelli più richiesti nei paesi europei?',
          options: [
            'Il settore tecnologico',
            'Il settore agricolo',
            'Il settore medico-scientifico',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's2-q3',
          part: 2,
          stimulusLabel: 'Testo A',
          text: "Qual è uno dei problemi causati dall'emigrazione dei giovani qualificati per l'Italia?",
          options: [
            'Un aumento del turismo straniero',
            'Una carenza di competenze in settori strategici',
            'Una riduzione delle tasse universitarie',
          ],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's2-q4',
          part: 2,
          stimulusLabel: 'Testo A',
          text: 'Perché alcuni giovani italiani scelgono di vivere allestero?',
          options: [
            'Solo per necessità economica',
            'Esclusivamente per motivi familiari',
            'Per curiosità e per fare esperienze internazionali',
          ],
          answer: 2,
        },
        {
          type: 'mcq',
          id: 's2-q5',
          part: 2,
          stimulusLabel: 'Testo A',
          text: 'Come giudicano gli esperti i programmi governativi per il ritorno dei cervelli?',
          options: [
            'Sufficienti per risolvere il problema',
            'Ancora insufficienti per invertire la tendenza',
            'Molto efficaci e innovativi',
          ],
          answer: 1,
        },
        // Testo B — 5 T/F
        {
          type: 'mcq',
          id: 's2-q6',
          part: 2,
          stimulusLabel: 'Testo B',
          text: "La dieta mediterranea è stata riconosciuta dall'UNESCO come patrimonio culturale nel 2010.",
          options: ['Vero', 'Falso'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 's2-q7',
          part: 2,
          stimulusLabel: 'Testo B',
          text: 'Secondo il testo, la carne rossa è un elemento fondamentale e quotidiano della dieta mediterranea.',
          options: ['Vero', 'Falso'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's2-q8',
          part: 2,
          stimulusLabel: 'Testo B',
          text: "L'olio d'oliva è considerato responsabile di molti benefici della dieta per il suo contenuto di grassi insaturi.",
          options: ['Vero', 'Falso'],
          answer: 0,
        },
        {
          type: 'mcq',
          id: 's2-q9',
          part: 2,
          stimulusLabel: 'Testo B',
          text: 'La dieta mediterranea promuove consumare i pasti in solitudine per favorire la concentrazione.',
          options: ['Vero', 'Falso'],
          answer: 1,
        },
        {
          type: 'mcq',
          id: 's2-q10',
          part: 2,
          stimulusLabel: 'Testo B',
          text: 'Il consumo di cibo industriale e fast food è aumentato tra i giovani di alcuni paesi mediterranei.',
          options: ['Vero', 'Falso'],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SECTION 3 — Analisi delle Strutture di Comunicazione
    // ─────────────────────────────────────────────────────────────
    {
      part: 3,
      title: 'Analisi – Strutture Grammaticali e Lessico',
      skill: 'general',
      instructions:
        'Elige la palabra o expresión correcta para completar cada frase.',
      questions: [
        // 1. Congiuntivo vs indicativo
        {
          type: 'mcq',
          id: 's3-q1',
          part: 3,
          text: 'Penso che Marco _____ già tornato a casa.',
          options: ['è', 'sia', 'sarà', 'era'],
          answer: 1,
        },
        // 2. Congiuntivo dopo "benché"
        {
          type: 'mcq',
          id: 's3-q2',
          part: 3,
          text: 'Benché _____ molto stanco, Luca ha continuato a lavorare.',
          options: ['è', 'era', 'fosse', 'sarebbe'],
          answer: 2,
        },
        // 3. Condizionale
        {
          type: 'mcq',
          id: 's3-q3',
          part: 3,
          text: 'Se avessi più tempo libero, _____ viaggiare di più.',
          options: ['vorrei', 'voglio', 'volevo', 'vorrò'],
          answer: 0,
        },
        // 4. Pronome "ne"
        {
          type: 'mcq',
          id: 's3-q4',
          part: 3,
          text: 'Hai del pane? Sì, _____ ho ancora un po\'.',
          options: ['lo', 'ne', 'ci', 'la'],
          answer: 1,
        },
        // 5. Pronome "ci"
        {
          type: 'mcq',
          id: 's3-q5',
          part: 3,
          text: 'Sei mai stato a Venezia? Sì, _____ sono andato due anni fa.',
          options: ['ne', 'vi', 'ci', 'lo'],
          answer: 2,
        },
        // 6. Preposizione articolata
        {
          type: 'mcq',
          id: 's3-q6',
          part: 3,
          text: 'I bambini hanno paura _____ buio.',
          options: ['del', 'al', 'dal', 'nel'],
          answer: 0,
        },
        // 7. Preposizione con mezzo di trasporto
        {
          type: 'mcq',
          id: 's3-q7',
          part: 3,
          text: 'Di solito vado al lavoro _____ autobus.',
          options: ['con il', 'in', 'per il', 'a'],
          answer: 1,
        },
        // 8. Pronome diretto (lo/la/li/le)
        {
          type: 'mcq',
          id: 's3-q8',
          part: 3,
          text: 'Hai visto le chiavi? No, non _____ ho viste.',
          options: ['li', 'le', 'la', 'ne'],
          answer: 1,
        },
        // 9. Falso amico: "attualmente"
        {
          type: 'mcq',
          id: 's3-q9',
          part: 3,
          text: 'Attualmente il direttore è in riunione e non può ricevere visite.',
          options: [
            'La parola "attualmente" significa "en realidad"',
            'La parola "attualmente" significa "actualmente / en este momento"',
            'La parola "attualmente" significa "eventualmente"',
            'La parola "attualmente" significa "puntualmente"',
          ],
          answer: 1,
        },
        // 10. Collocazione lessicale
        {
          type: 'mcq',
          id: 's3-q10',
          part: 3,
          text: 'Devo _____ una telefonata importante prima di pranzo.',
          options: ['fare', 'dire', 'mettere', 'portare'],
          answer: 0,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SECTION 4 — Scrittura Part 1
    // ─────────────────────────────────────────────────────────────
    {
      part: 4,
      title: 'Scrittura – Produzione Scritta 1',
      skill: 'writing',
      instructions:
        'Escribe un texto siguiendo las indicaciones. Escribe al menos 120 palabras.',
      questions: [
        {
          type: 'write',
          id: 's4-q1',
          part: 4,
          taskNumber: 1,
          stimulus:
            'Hai letto un articolo online che afferma che i giovani di oggi non sanno cucinare e mangiano troppo cibo industriale. Scrivi una risposta all\'articolo esprimendo la tua opinione. Usa esempi concreti.',
          stimulusLabel: 'Risposta a un articolo online',
          text: 'Scrivi la tua risposta (almeno 120 parole).',
          minWords: 120,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SECTION 5 — Scrittura Part 2
    // ─────────────────────────────────────────────────────────────
    {
      part: 5,
      title: 'Scrittura – Produzione Scritta 2',
      skill: 'writing',
      instructions:
        "Escribe un correo electrónico siguiendo las indicaciones. Escribe al menos 80 palabras.",
      questions: [
        {
          type: 'write',
          id: 's5-q1',
          part: 5,
          taskNumber: 2,
          stimulus:
            'Il tuo amico italiano Marco ti ha invitato alla sua festa di laurea a Milano. Non puoi partecipare. Scrivi un\'email a Marco: spiegagli perché non puoi venire, scusati e suggerisci di vedervi in un altro momento.',
          stimulusLabel: 'Email a un amico',
          text: "Scrivi l'email (almeno 80 parole).",
          minWords: 80,
        },
      ],
    },

    // ─────────────────────────────────────────────────────────────
    // SECTION 6 — Parlato
    // ─────────────────────────────────────────────────────────────
    {
      part: 6,
      title: 'Parlato – Produzione Orale',
      skill: 'speaking',
      instructions: 'La prueba oral se desarrolla en dos partes.',
      questions: [
        {
          type: 'speak',
          id: 's6-q1',
          part: 6,
          partNumber: 1,
          text: 'Osserva questa immagine e descrivila. Poi esprimi la tua opinione: ami le feste di piazza? Perché?\n\n[Immagine: una piazza italiana affollata durante una festa popolare, con luci, bancarelle e persone che ballano e mangiano.]',
          followUp: [
            'Le feste tradizionali italiane sono importanti per la cultura locale? Perché?',
            'Nel tuo paese ci sono feste simili alle sagre italiane? Descrivile.',
            'Pensi che le feste popolari stiano perdendo importanza tra i giovani? Perché?',
          ],
        },
        {
          type: 'speak',
          id: 's6-q2',
          part: 6,
          partNumber: 2,
          text: 'Parla di un viaggio indimenticabile che hai fatto. Usa la cue card come guida.',
          cueCard:
            'Parla di un viaggio che hai fatto:\n• Dove sei andato/a?\n• Con chi?\n• Cosa hai visitato?\n• Cosa ti è piaciuto di più?',
          followUp: [
            'Preferisci viaggiare in gruppo o da solo/a? Perché?',
            'Qual è la destinazione che vorresti visitare in futuro e per quale motivo?',
            "Pensi che viaggiare cambi il modo in cui vediamo il mondo? In che senso?",
          ],
        },
      ],
    },
  ],
};

export default mock;
