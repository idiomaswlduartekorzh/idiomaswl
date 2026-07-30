import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'da-presente-a2',
  order: '11',
  color: '#009246',
  category: 'Preposizioni + tempo',
  level: 'A2',
  title: 'Da + presente para acciones continuas en italiano A2',
  shortTitle: 'Da + presente',
  metaTitle: 'Da + presente italiano A2 — Vivo qui da tre anni, studio italiano da sei mesi',
  description:
    'En italiano, para indicar que una acción comenzó en el pasado y continúa en el presente, se usa el presente indicativo + la preposición "da". A diferencia del español, no se usa el pretérito perfecto compuesto. Vivo qui da tre anni = Llevo tres años viviendo aquí.',
  lead: 'Presente + da + tiempo. Vivo qui da tre anni. Studio italiano da sei mesi. La acción empezó antes y SIGUE ahora. NO se usa el passato prossimo.',
  outcomes: [
    'Usar presente + da para acciones que empezaron en el pasado y continúan en el presente',
    'Distinguir "da" de tiempo de "fa" (hace tiempo)',
    'Preguntar por la duración con "da quanto tempo?"',
    'Evitar el error de usar el passato prossimo con da',
  ],

  guide: {
    goal: 'Indicar cuánto tiempo lleva ocurriendo una acción que comenzó en el pasado y aún continúa.',
    model: 'Vivo a Roma da tre anni. / Studio l\'italiano da sei mesi. / Conosco Marco da quando eravamo bambini.',
    formula: 'verbo al presente + da + [durata / momento di inizio]',
    decisions: [
      'Duración: studio italiano da sei mesi (llevo seis meses estudiando italiano)',
      'Punto de inicio: lavoro qui da gennaio (trabajo aquí desde enero)',
      'Pregunta: da quanto tempo studi italiano? = ¿Cuánto tiempo llevas estudiando italiano?',
      'Contraste con "fa": tre anni fa = hace tres años (acción puntual en el pasado)',
      'NO usar passato prossimo: Ho vissuto qui da tre anni ✗ → Vivo qui da tre anni ✓',
      'Con verbi di stato: abito, studio, lavoro, aspetto, conosco, sono (con essere)',
    ],
    table: [
      ['Estructura', 'Uso', 'Ejemplo'],
      ['presente + da + duración', 'acción que continúa', 'Studio italiano da sei mesi'],
      ['presente + da + momento', 'desde cuándo', 'Lavoro qui da gennaio'],
      ['presente + da + evento', 'desde que...', 'Non lo vedo da Natale'],
      ['da quanto tempo?', 'preguntar la duración', 'Da quanto tempo vivi qui?'],
      ['tre anni fa', 'acción pasada puntual', 'Sono arrivato tre anni fa'],
    ],
    mistakes: [
      'Usar passato prossimo con da: Ho studiato italiano da sei mesi ✗ → Studio italiano da sei mesi ✓',
      'Confundir da (desde / hace) con fa (hace): Tre anni fa sono arrivato (acción pasada) vs Vivo qui da tre anni (acción continua)',
      'Confundir da (tiempo) con da (origen): Vengo da Roma = soy de Roma (distinto uso de da)',
    ],
  },

  seo: [
    {
      heading: 'Da + presente en italiano: la estructura y sus usos',
      paragraphs: [
        'Donde el español dice "llevo tres años viviendo aquí" o "hace tres años que vivo aquí", el italiano usa simplemente presente + da: "Vivo qui da tre anni". La clave: la acción empezó en el pasado y SIGUE ahora, por eso va en presente (no en passato prossimo). Esta tabla resume las estructuras con "da" y su contraste con "fa":',
      ],
      table: [
        ['Estructura', 'Uso', 'Ejemplo'],
        ['presente + da + duración', 'acción que sigue en curso', 'Studio italiano da due anni.'],
        ['presente + da + momento', 'desde cuándo', 'Lavoro qui da gennaio.'],
        ['[tiempo] + fa + passato prossimo', 'cuándo ocurrió (terminada)', 'Sono arrivato due anni fa.'],
        ['Da quanto tempo + presente?', 'preguntar la duración', 'Da quanto tempo studi?'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "da" y "fa"?',
      paragraphs: [
        '"Da" indica el inicio de una acción que continúa en el presente: studio italiano da sei mesi (llevo seis meses y sigo estudiando). "Fa" se usa para indicar cuánto tiempo atrás ocurrió una acción puntual ya terminada: sei mesi fa ho iniziato a studiare (hace seis meses empecé a estudiar).',
        'La regla de oro: si la acción continúa ahora → presente + da. Si la acción ya terminó y sólo indicamos cuándo fue → [tiempo] + fa + passato prossimo.',
      ],
    },
    {
      heading: '¿Cómo se dice "llevo X tiempo haciendo algo" en italiano?',
      paragraphs: [
        'Con presente + da + tiempo: "Studio italiano da sei mesi" (llevo seis meses estudiando italiano), "Vivo qui da tre anni" (llevo tres años viviendo aquí). No se usa el passato prossimo porque la acción continúa en el presente.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "da" y "fa" en italiano?',
      paragraphs: [
        '"da" + presente marca una acción que empezó antes y sigue ahora: "Aspetto da un\'ora" (llevo una hora esperando). "fa" + passato prossimo marca cuándo ocurrió algo ya terminado: "Sono arrivato un\'ora fa" (llegué hace una hora). Da = continúa; fa = terminó.',
      ],
    },
    {
      heading: '¿Por qué se usa el presente y no el passato prossimo con "da"?',
      paragraphs: [
        'Porque la acción sigue ocurriendo. "Studio da due anni" = empecé hace dos años y todavía estudio, así que va en presente. "Ho studiato da due anni" es incorrecto. Es una diferencia importante frente al español, que usa perífrasis ("llevo… ", "hace… que").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante usa presente + da para acciones continuas, distinguiéndolo del passato prossimo y de "fa".',
    graphicPrompt: 'Línea de tiempo: punto en el pasado → flecha continua hasta "ora". Contraste con "fa" (punto pasado).',
    scene: [
      ['Vivo a Milano da tre anni.', 'Llevo tres años viviendo en Milán.'],
      ['Studio italiano da sei mesi.', 'Llevo seis meses estudiando italiano.'],
      ['Da quanto tempo lavori qui?', '¿Cuánto tiempo llevas trabajando aquí?'],
      ['Non la vedo da Natale.', 'No la veo desde Navidad.'],
    ],
    learnerModes: ['visual: línea de tiempo', 'analítico: da vs fa', 'oral: hablar de cuánto tiempo llevas haciendo algo'],
    reviewFocus: ['presente + da (NO passato prossimo)', 'da quanto tempo? para preguntar', 'da vs fa'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: '¿Presente + da o passato?',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para expresar una acción que continúa en el presente.',
        type: 'choice',
        items: [
          {
            scene: 'El estudio',
            lines: [['Marco', '___ italiano da un anno.']],
            options: ['Studio', 'Ho studiato', 'Studiavo', 'Studierò'],
            answer: 'Studio',
            explain: 'Acción que continúa → presente. Studio italiano da un anno (llevo un año estudiando).',
          },
          {
            scene: 'La ciudad',
            lines: [['Sofia', 'Vivo a Roma ___. (tres años, acción continua)']],
            options: ['da tre anni', 'tre anni fa', 'per tre anni', 'da tre anni fa'],
            answer: 'da tre anni',
            explain: 'Acción que continúa en el presente → presente + da + duración.',
          },
          {
            scene: 'El trabajo',
            lines: [['Tomás', '___ in questa scuola da settembre.']],
            options: ['Lavoro', 'Ho lavorato', 'Lavoravo', 'Lavorerò'],
            answer: 'Lavoro',
            explain: 'Sigue trabajando ahora → presente. Lavoro qui da settembre.',
          },
          {
            scene: 'La pregunta',
            lines: [['Ana', '___ abiti in Italia?']],
            options: ['Da quanto tempo', 'Quanti anni fa', 'Per quanto tempo', 'Quando'],
            answer: 'Da quanto tempo',
            explain: 'Para preguntar la duración de una acción continua: da quanto tempo + presente.',
          },
          {
            scene: 'La amistad',
            lines: [['Carlo', 'Conosco Luca ___ bambini.']],
            options: ['da quando eravamo', 'quando eravamo', 'da bambini fa', 'per bambini'],
            answer: 'da quando eravamo',
            explain: 'Desde que éramos niños (y siguen siendo amigos): da quando + imperfetto.',
          },
          {
            scene: 'Sin verla',
            lines: [['Giulia', 'Non vedo mia cugina ___ due anni.']],
            options: ['da', 'fa', 'per', 'di'],
            answer: 'da',
            explain: 'La acción (no verla) continúa en el presente → presente + da.',
          },
          {
            scene: 'Hace tiempo vs sigue',
            lines: [['Luca', '___ ho cominciato a studiare il cinese. (acción pasada puntual)']],
            options: ['Tre anni fa', 'Da tre anni', 'Per tre anni', 'In tre anni'],
            answer: 'Tre anni fa',
            explain: 'Acción completada en el pasado → [tempo] + fa + passato prossimo.',
          },
          {
            scene: 'La espera',
            lines: [['Iris', 'Aspetto l\'autobus ___ venti minuti!']],
            options: ['da', 'fa', 'per', 'di'],
            answer: 'da',
            explain: 'Sigo esperando ahora → presente + da. Aspetto da venti minuti.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbo + da',
        tag: '2 espacios',
        intro: 'Completa con el verbo en presente y la preposición correcta (da o fa).',
        type: 'dual',
        items: [
          {
            scene: 'El italiano',
            lines: [['Marco', '[[0]] italiano [[1]] sei mesi e lo amo!']],
            blanks: [
              { options: ['Studio', 'Ho studiato', 'Studiavo'], answer: 'Studio', explain: 'Sigue estudiando → presente.' },
              { options: ['da', 'fa', 'per'], answer: 'da', explain: 'Acción continua → da. Studio da sei mesi.' },
            ],
          },
          {
            scene: 'La ciudad',
            lines: [['Sofia', '[[0]] a Milano [[1]] due anni.']],
            blanks: [
              { options: ['Abito', 'Ho abitato', 'Abitavo'], answer: 'Abito', explain: 'Sigue viviendo en Milán → presente.' },
              { options: ['da', 'fa', 'per'], answer: 'da', explain: 'Duración de acción continua → da.' },
            ],
          },
          {
            scene: 'El trabajo',
            lines: [['Giulia', 'Tre anni [[0]] ho cambiato lavoro. Adesso [[1]] qui.']],
            blanks: [
              { options: ['fa', 'da', 'per'], answer: 'fa', explain: 'Acción pasada puntual (cambió de trabajo) → fa.' },
              { options: ['lavoro', 'ho lavorato', 'lavoravo'], answer: 'lavoro', explain: 'Sigue trabajando aquí ahora → presente.' },
            ],
          },
          {
            scene: 'La espera',
            lines: [['Tomás', '[[0]] [[1]] mezz\'ora! Dov\'è Marco?']],
            blanks: [
              { options: ['Aspetto', 'Ho aspettato', 'Aspettavo'], answer: 'Aspetto', explain: 'Sigo esperando → presente.' },
              { options: ['da', 'fa', 'per'], answer: 'da', explain: 'Aspetto da mezz\'ora — da + duración con presente.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La historia de Ana',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre Ana usando presente + da o fa.',
        type: 'guidedText',
        scene: 'Ana, estudiante colombiana, habla de su experiencia en Italia',
        text: 'Sono in Italia [[0]] sei mesi. (da/fa — acción continua) Due anni [[1]] ho deciso di imparare l\'italiano. Adesso [[2]] l\'italiano all\'università [[3]] settembre. Il weekend [[4]] italiano con gli amici del quartiere.',
        blanks: [
          { options: ['da', 'fa', 'per'], answer: 'da', explain: 'Sigo en Italia ahora → presente + da.' },
          { options: ['fa', 'da', 'per'], answer: 'fa', explain: 'Acción pasada puntual (decidí) → fa.' },
          { options: ['studio', 'ho studiato', 'studiavo'], answer: 'studio', explain: 'Sigo estudiando → presente.' },
          { options: ['da', 'fa', 'per'], answer: 'da', explain: 'Desde septiembre y continúa → da.' },
          { options: ['parlo', 'ho parlato', 'parlavo'], answer: 'parlo', explain: 'Hábito que continúa → presente.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Completa con el verbo correcto en presente o el tiempo indicado.',
        type: 'freeText',
        scene: 'Tomás habla de su experiencia como profesor en WeLearn',
        text: 'Insegno lingue [[0]] cinque anni. [[1]] questa scuola da gennaio. Due anni [[2]] ho fondato WeLearn con Iris. [[3]] l\'italiano e il coreano [[4]] più di tre anni.',
        blanks: [
          { answer: 'da', explain: 'Sigo enseñando → presente + da.' },
          { answer: 'Gestisco', explain: 'Gestire: sigo gestionando → presente: gestisco.' },
          { answer: 'fa', explain: 'Acción pasada puntual (fondato) → fa.' },
          { answer: 'Insegno', explain: 'Sigo enseñando → presente: insegno.' },
          { answer: 'da', explain: 'Acción continua → da.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones con da',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando presente + da.',
        type: 'write',
        items: [
          {
            scene: 'El estudio',
            prompt: 'studio / italiano / tre anni → frase completa con presente + da',
            answer: 'Studio italiano da tre anni.',
            accepted: ['studio italiano da tre anni'],
            explain: 'Presente + da + duración. Studio (presente) + da + tre anni.',
          },
          {
            scene: 'La ciudad',
            prompt: 'abito / a Bologna / 2019 → frase completa con presente + da',
            answer: 'Abito a Bologna dal 2019.',
            accepted: ['abito a bologna dal 2019', 'abito a bologna da il 2019'],
            explain: 'Presente + da + anno. Da + il 2019 = dal 2019.',
          },
          {
            scene: 'Sin verlo',
            prompt: 'non vedo / mio fratello / Natale → frase completa con presente + da',
            answer: 'Non vedo mio fratello da Natale.',
            accepted: ['non vedo mio fratello da natale'],
            explain: 'Presente + da + evento. Non vedo (sigo sin verlo) da Natale.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu historia con da',
        tag: 'Escritura libre',
        intro: 'Habla de acciones que empezaron en el pasado y siguen ahora, usando presente + da.',
        type: 'write',
        items: [
          {
            scene: 'Tu idioma',
            prompt: 'Studio [idioma] da... / Parlo [idioma] da... (¿cuánto tiempo llevas?)',
            answer: "Studio l'italiano da sei mesi e studio l'inglese da dieci anni.",
            accepted: ['studio', 'parlo', 'imparo', 'da'],
            explain: 'Presente + da + duración para acciones que continúan.',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'Abito/Vivo a [ciudad] da... (¿cuánto tiempo vives ahí?)',
            answer: 'Vivo a Bogotá da tutta la vita.',
            accepted: ['vivo', 'abito', 'da'],
            explain: 'Presente + da + duración o da + momento de inicio.',
          },
          {
            scene: 'Tu actividad',
            prompt: '[Verbo] [actividad] da... (una cosa que llevas tiempo haciendo)',
            answer: 'Suono la chitarra da cinque anni e canto da quando avevo dieci anni.',
            accepted: ['da', 'lavoro da', 'studio da', 'conosco da'],
            explain: 'Cualquier actividad continua: presente + da + tiempo/momento.',
          },
        ],
      },
    ],
  },
}

export default topic
