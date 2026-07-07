import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperfetto-a2',
  order: '03',
  color: '#009246',
  category: 'Imperfetto',
  level: 'A2',
  title: "L'imperfetto en italiano A2 — Pasado imperfecto y descripción",
  shortTitle: 'Imperfetto',
  metaTitle: "Imperfetto italiano A2 — parlavo, faceva, eravamo, era una volta",
  description:
    "El imperfetto expresa acciones habituales en el pasado, descripciones y acciones de fondo. Se forma quitando -re del infinitivo y añadiendo -vo/-vi/-va/-vamo/-vate/-vano. Essere es irregular: ero/eri/era/eravamo/eravate/erano. Se contrasta con el passato prossimo: acciones de fondo (imperfetto) vs eventos (passato prossimo).",
  lead: 'Imperfetto = pasado habitual o descriptivo. -are: -avo/-avi/-ava/-avamo/-avate/-avano. Essere: ero/eri/era... Da contesto a los eventos del passato prossimo: Mentre mangiavo, è arrivato Marco.',
  outcomes: [
    'Conjugar verbos regulares en imperfetto para los 6 sujetos',
    'Conjugar essere en imperfetto (ero, eri, era...)',
    'Usar el imperfetto para hábitos pasados, descripción y acciones de fondo',
  ],

  guide: {
    goal: 'Conjugar el imperfetto y distinguirlo del passato prossimo según el tipo de acción.',
    model: 'Da bambino abitavo a Napoli. / Mentre dormivo, ha suonato il telefono.',
    formula: 'infinitivo sin -re + -vo / -vi / -va / -vamo / -vate / -vano',
    decisions: [
      'io → -vo: parlavo, leggevo, dormivo',
      'tu → -vi: parlavi, leggevi, dormivi',
      'lui/lei → -va: parlava, leggeva, dormiva',
      'noi → -vamo: parlavamo, leggevamo, dormivamo',
      'voi → -vate: parlavate, leggevate, dormivate',
      'loro → -vano: parlavano, leggevano, dormivano',
      'Essere irregular: ero, eri, era, eravamo, eravate, erano',
      'Irregolari en la raíz: fare→facevo, dire→dicevo, bere→bevevo',
    ],
    table: [
      ['Sujeto', 'parlare (-are)', 'essere (irregular)'],
      ['io', 'parlavo', 'ero'],
      ['tu', 'parlavi', 'eri'],
      ['lui/lei', 'parlava', 'era'],
      ['noi', 'parlavamo', 'eravamo'],
      ['voi', 'parlavate', 'eravate'],
      ['loro', 'parlavano', 'erano'],
    ],
    mistakes: [
      'Essere irregular: era ✓ (no "erava"); erano ✓ (no "eravano" es correcto, pero "eravano" ✗)',
      'fare → facevo (raíz fa-): facevo ✓ / faccevo ✗',
      'Usar passato prossimo para habitual: Da bambino ho giocato ogni giorno ✗ → giocavo ogni giorno ✓',
    ],
  },

  seo: [
    {
      heading: 'Imperfetto vs passato prossimo: la clave del italiano',
      paragraphs: [
        'La distinción entre imperfetto y passato prossimo es uno de los puntos más importantes del italiano A2. El imperfetto describe el fondo, las circunstancias, los hábitos y las situaciones en curso del pasado. El passato prossimo narra eventos puntuales y acciones completadas.',
        'Una analogía útil: el imperfetto es como el telón de fondo de una obra de teatro (descripción, ambiente, hábito), mientras que el passato prossimo son los eventos que suceden en escena (acciones concretas). "Mentre studiavo (imperfetto: acción de fondo), Marco è arrivato (passato prossimo: evento puntual)."',
      ],
    },
    {
      heading: 'Usos del imperfetto',
      paragraphs: [
        'Hábitos y acciones repetidas en el pasado: "Da bambino giocavo ogni giorno nel parco." (De pequeño jugaba todos los días en el parque.) Esta función equivale al "solía + infinitivo" o "jugaba" en español con valor habitual.',
        'Descripción del pasado: "Era una bella giornata. Il cielo era azzurro e c\'era molto vento." Para describir cómo eran las cosas se usa imperfetto, no passato prossimo.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende las terminaciones -vo/-vi/-va y los irregulares essere/fare/dire/bere.',
    graphicPrompt: 'Tabla de conjugación con tres columnas: -are/-ere/-ire + essere. Contraste imperfetto vs passato prossimo.',
    scene: [
      ['Da bambino abitavo a Roma.', 'De niño vivía en Roma. (hábito)'],
      ['Era una bella giornata.', 'Era un hermoso día. (descripción)'],
      ['Mentre guardavo la TV, ha suonato il telefono.', 'Mientras veía la TV, sonó el teléfono. (fondo vs evento)'],
      ['Ogni estate andavamo al mare.', 'Cada verano íbamos al mar. (hábito repetido)'],
    ],
    learnerModes: ['visual: tabla de terminaciones', 'analítico: imperfetto vs passato', 'oral: narrar la infancia'],
    reviewFocus: ['essere: ero/eri/era/eravamo', 'fare→facevo, dire→dicevo, bere→bevevo', 'mentre + imperfetto', 'hábito vs evento'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Imperfetto correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma del imperfetto correcta para el sujeto dado.',
        type: 'choice',
        items: [
          {
            scene: 'La infancia en Roma',
            lines: [['David', 'Da bambino ___ a Roma con la mia famiglia. (abitare / io)']],
            options: ['abitavo', 'abitavo', 'abitava', 'abitavano'],
            answer: 'abitavo',
            explain: 'Io + abitare: raíz abita- + -vo → abitavo.',
          },
          {
            scene: 'El tiempo de antes',
            lines: [['Sofia', 'Quando ero giovane, ___ molto. (lavorare / tu)']],
            options: ['lavoravi', 'lavoravo', 'lavorava', 'lavoravate'],
            answer: 'lavoravi',
            explain: 'Tu + lavorare: raíz lavora- + -vi → lavoravi.',
          },
          {
            scene: 'Las costumbres de Marco',
            lines: [['Ana', 'Marco ___ la pizza ogni venerdì. (mangiare / lui)']],
            options: ['mangiava', 'mangiavo', 'mangiavi', 'mangiavano'],
            answer: 'mangiava',
            explain: 'Lui/lei + mangiare: raíz mangia- + -va → mangiava.',
          },
          {
            scene: 'Nosotros antes',
            lines: [['Carlo', 'Noi ___ insieme ogni domenica. (studiare / noi)']],
            options: ['studiavamo', 'studiavate', 'studiavano', 'studiavo'],
            answer: 'studiavamo',
            explain: 'Noi + studiare: raíz studia- + -vamo → studiavamo.',
          },
          {
            scene: 'Essere en el pasado',
            lines: [['Marco', 'Quando ___ piccolo, amavo il calcio. (essere / io)']],
            options: ['ero', 'era', 'eri', 'eravamo'],
            answer: 'ero',
            explain: 'Essere irregular: io ero. No es "erava" sino ero.',
          },
          {
            scene: 'El tiempo meteorológico',
            lines: [['Zhanna', '___ bel tempo ieri, vero? (fare / lui-impersonale)']],
            options: ['Faceva', 'Facevo', 'Facevate', 'Facceva'],
            answer: 'Faceva',
            explain: 'Fare impersonal (il tempo): faceva bel tempo. Fare → facevo/facevi/faceva...',
          },
          {
            scene: 'Los abuelos',
            lines: [['Lina', 'I miei nonni ___ sempre il caffè dopo pranzo. (bere / loro)']],
            options: ['bevevano', 'bevono', 'bevevano', 'bevevate'],
            answer: 'bevevano',
            explain: 'Bere → radice beve- + -vano → bevevano. Loro bevevano.',
          },
          {
            scene: 'La situación',
            lines: [['Giulia', '___ le nove di sera quando è tornato. (essere / ora)']],
            options: ['Erano', 'Era', 'Ero', 'Eravano'],
            answer: 'Erano',
            explain: 'Le nove (plural) → erano le nove. No es "eravano".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos formas en contexto',
        tag: '2 espacios',
        intro: 'Completa con dos formas del imperfetto.',
        type: 'dual',
        items: [
          {
            scene: 'La infancia',
            lines: [['Marco', 'Da bambino io [[0]] nel parco e i miei amici [[1]] la bici. (giocare / usare)']],
            blanks: [
              { options: ['giocavo', 'giocavi', 'giocava'], answer: 'giocavo', explain: 'Io + giocare → giocavo.' },
              { options: ['usavano', 'usavo', 'usava'], answer: 'usavano', explain: 'I miei amici (loro) + usare → usavano.' },
            ],
          },
          {
            scene: 'La vida universitaria',
            lines: [['Sofia', 'All\'università [[0]] molto e [[1]] spesso in biblioteca. (studiare / lavorare / io)']],
            blanks: [
              { options: ['studiavo', 'studiava', 'studiavamo'], answer: 'studiavo', explain: 'Io + studiare → studiavo.' },
              { options: ['lavoravo', 'lavorava', 'lavoravamo'], answer: 'lavoravo', explain: 'Io + lavorare → lavoravo.' },
            ],
          },
          {
            scene: 'Mientras tanto',
            lines: [['David', 'Mentre noi [[0]], loro [[1]] la TV. (mangiare / guardare)']],
            blanks: [
              { options: ['mangiavamo', 'mangiavate', 'mangiavano'], answer: 'mangiavamo', explain: 'Noi + mangiare → mangiavamo.' },
              { options: ['guardavano', 'guardavate', 'guardavamo'], answer: 'guardavano', explain: 'Loro + guardare → guardavano.' },
            ],
          },
          {
            scene: 'El estado del tiempo',
            lines: [['Zhanna', '[[0]] caldo e [[1]] bel tempo quando siamo arrivati. (fare / essere)']],
            blanks: [
              { options: ['Faceva', 'Facevo', 'Facevate'], answer: 'Faceva', explain: 'Impersonale: faceva caldo. Fare → faceva.' },
              { options: ["C'era", "C'ero", "C'eravamo"], answer: "C'era", explain: "Esserci impersonale: c'era bel tempo → era (sing)." },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Memories de la infancia',
        tag: 'Texto guiado',
        intro: 'Completa el recuerdo de Ana con el imperfetto correcto.',
        type: 'guidedText',
        scene: 'Ana recuerda su infancia en Bogotá',
        text: 'Da bambina [[0]] a Bogotá con la mia famiglia. (abitare / io) [[1]] la scuola ogni mattina alle sette. (andare / io) La mia maestra [[2]] molto brava e simpatica. (essere) I miei amici e io [[3]] nel parco ogni pomeriggio. (giocare) Mia nonna [[4]] sempre la cena per tutta la famiglia. (cucinare) La domenica tutti noi [[5]] insieme e [[6]] molto. (mangiare / parlare)',
        blanks: [
          { options: ['abitavo', 'abitava', 'abitavamo'], answer: 'abitavo', explain: 'Io + abitare → abitavo.' },
          { options: ['andavo', 'andava', 'andavamo'], answer: 'andavo', explain: 'Io + andare → andavo.' },
          { options: ['era', 'ero', 'erano'], answer: 'era', explain: 'La maestra (f sing) + essere → era.' },
          { options: ['giocavamo', 'giocavo', 'giocavano'], answer: 'giocavamo', explain: 'Noi + giocare → giocavamo.' },
          { options: ['cucinava', 'cucinavo', 'cucinavano'], answer: 'cucinava', explain: 'Mia nonna (f sing) + cucinare → cucinava.' },
          { options: ['mangiavamo', 'mangiavo', 'mangiavano'], answer: 'mangiavamo', explain: 'Noi + mangiare → mangiavamo.' },
          { options: ['parlavamo', 'parlavo', 'parlavano'], answer: 'parlavamo', explain: 'Noi + parlare → parlavamo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el imperfetto correcto sin opciones.',
        type: 'freeText',
        scene: 'Carlo recuerda su vida de estudiante universitario',
        text: 'Quando [[0]] studente, [[1]] in un piccolo appartamento. (essere / abitare / io) Ogni mattina [[2]] un caffè al bar e poi [[3]] a lezione. (bere / andare / io) I professori [[4]] molto esigenti ma bravi. (essere) La sera io e i miei amici [[5]] insieme in pizzeria. (cenare)',
        blanks: [
          { answer: 'ero', explain: 'Essere irregolare: io ero (studente).' },
          { answer: 'abitavo', explain: 'Abitare: io abitavo.' },
          { answer: 'bevevo', explain: 'Bere → bevevo (radice beve-).' },
          { answer: 'andavo', explain: 'Andare: io andavo.' },
          { answer: 'erano', explain: 'Essere: i professori (pl) → erano.' },
          { answer: 'cenavamo', explain: 'Cenare: noi cenavamo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe una oración completa con el imperfetto.',
        type: 'write',
        items: [
          {
            scene: 'Hábito pasado',
            prompt: 'Da bambino/a ___ (giocare) ogni giorno nel parco.',
            answer: 'Da bambino giocavo ogni giorno nel parco.',
            accepted: ['da bambino giocavo ogni giorno nel parco', 'da bambina giocavo ogni giorno nel parco'],
            explain: 'Hábito pasado con imperfetto: io giocavo.',
          },
          {
            scene: 'Descripción del tiempo',
            prompt: 'Ieri ___ (fare) bel tempo e ___ (essere) caldo.',
            answer: 'Ieri faceva bel tempo e faceva caldo.',
            accepted: ['ieri faceva bel tempo e faceva caldo', 'ieri faceva bel tempo e era caldo'],
            explain: 'Descripción pasada: faceva bel tempo. Fare → faceva (impersonale).',
          },
          {
            scene: 'Acción de fondo + evento',
            prompt: 'Mentre ___ (dormire / io), è squillato il telefono.',
            answer: 'Mentre dormivo, è squillato il telefono.',
            accepted: ['mentre dormivo, è squillato il telefono', 'mentre dormivo è squillato il telefono'],
            explain: 'Imperfetto (fondo) + passato prossimo (evento): Mentre dormivo, è squillato.',
          },
          {
            scene: 'La rutina de antes',
            prompt: 'Ogni mattina noi ___ (bere) il caffè insieme prima di andare al lavoro.',
            answer: 'Ogni mattina noi bevevamo il caffè insieme prima di andare al lavoro.',
            accepted: ['ogni mattina noi bevevamo il caffè insieme', 'ogni mattina bevevamo il caffè insieme'],
            explain: 'Hábito repetido: noi bevevamo. Bere → bevevo/bevi/beve... → bevevamo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Narrar el pasado',
        tag: 'Escritura guiada',
        intro: 'Usa el imperfetto para describir hábitos o situaciones de tu pasado.',
        type: 'write',
        items: [
          {
            scene: 'Tu infancia',
            prompt: 'Da bambino/a ___ (describe un hábito o situación con imperfetto)',
            answer: 'Da bambino vivevo in una piccola città e giocavo ogni pomeriggio con i miei amici.',
            accepted: ['da bambino', 'da bambina', 'da piccolo', 'da piccola'],
            explain: 'Imperfetto para hábitos y situaciones de la infancia.',
          },
          {
            scene: 'La escena de ayer',
            prompt: 'Ieri mentre ___ (imperfetto), è successo che ___ (passato prossimo).',
            answer: "Ieri mentre studiavo, è arrivato un messaggio importante dall'università.",
            accepted: ['ieri mentre studiavo', 'ieri mentre lavoravo', 'ieri mentre dormivo'],
            explain: 'Mientras (imperfetto) + evento (passato prossimo).',
          },
          {
            scene: 'La vida antes',
            prompt: 'Prima ___ (imperfetto: una situación anterior que ya cambió)',
            answer: 'Prima abitavo in centro, ma adesso vivo in periferia.',
            accepted: ['prima abitavo', 'prima lavoravo', 'prima studiavo'],
            explain: 'Prima + imperfetto contrasta con la situación actual.',
          },
        ],
      },
    ],
  },
}

export default topic
