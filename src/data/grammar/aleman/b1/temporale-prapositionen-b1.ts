import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'temporale-prapositionen-b1',
  order: '13',
  color: '#1a2ecc',
  category: 'Preposiciones',
  level: 'B1',
  title: 'Temporale Präpositionen — Preposiciones de tiempo en alemán B1',
  shortTitle: 'Temporale Präpositionen',
  metaTitle: 'Preposiciones de tiempo en alemán B1 — seit, vor, nach, in, bis, während, ab',
  description:
    'Las preposiciones temporales alemanas tienen casos específicos y usos precisos. Seit + Dativ expresa duración en progreso; vor + Dativ indica hace X tiempo; nach + Dativ significa después de; in + Dativ habla de un tiempo futuro o de un mes; bis indica límite; während + Genitiv expresa durante; ab + Dativ indica a partir de.',
  lead: 'Aprende las preposiciones de tiempo en alemán con sus casos y usos: seit, vor, nach, in, bis, während y ab.',
  outcomes: [
    'Usas seit + Dativ para duración que continúa en el presente',
    'Distingues vor (hace X tiempo) de seit (desde hace X tiempo)',
    'Aplicas nach, in, bis, während y ab correctamente con sus casos',
    'Describes rutinas y eventos con precisión temporal',
  ],

  guide: {
    goal: 'Usar las preposiciones temporales alemanas con el caso correcto y el significado preciso.',
    model: 'Ich lerne seit drei Jahren Deutsch. / Das war vor einer Woche. / Nach der Arbeit gehe ich ins Gym. / Bis morgen!',
    formula: 'seit + Dat. (duración presente) | vor + Dat. (pasado) | nach/in/ab + Dat. | während + Gen. | bis (+ Akk.)',
    decisions: [
      'seit + Dativ: duración que CONTINÚA en el presente. Siempre con presente o Präteritum, nunca con Perfekt. Ich lerne seit zwei Jahren Deutsch (y sigo aprendiendo).',
      'vor + Dativ: punto en el pasado "hace X tiempo". Vor einer Woche war ich krank. Vor dem Essen (antes de comer).',
      'nach + Dativ: después de (secuencia o posición). Nach dem Essen gehe ich spazieren. Nach Deutschland (sin artículo para países).',
      'in + Dativ: en un período futuro (dentro de X tiempo) o dentro de un mes/año. In zehn Minuten / im Juli / im nächsten Jahr.',
      'bis: hasta un límite. Bis morgen! / bis 18 Uhr / bis zum Ende (bis zu + Dativ para sustantivos).',
      'während + Genitiv: durante. Während der Prüfung / während des Unterrichts.',
      'ab + Dativ: a partir de un momento. Ab dem ersten Januar / ab nächster Woche.',
    ],
    table: [
      ['Preposición', 'Caso', 'Uso y ejemplo'],
      ['seit', 'Dativ', 'duración presente: seit drei Jahren'],
      ['vor', 'Dativ', 'hace X tiempo: vor zwei Wochen'],
      ['während', 'Genitiv', 'durante: während der Arbeit'],
    ],
    mistakes: [
      '"Ich habe seit drei Jahren Deutsch gelernt" ❌ → "Ich lerne seit drei Jahren Deutsch" ✓ — seit + presente (acción continua).',
      '"Nach Deutschland fahren" ❌ → "Ich fahre nach Deutschland" ✓ — nach para países/ciudades va sin artículo.',
      '"Bis den Montag" ❌ → "Bis Montag" ✓ — bis + día de la semana sin artículo.',
    ],
  },

  seo: [
    {
      heading: 'Seit vs. vor: la confusión más común con las preposiciones temporales',
      paragraphs: [
        '"Seit" y "vor" son las dos preposiciones de tiempo que más confunden a los estudiantes de alemán. La diferencia es clara: "seit" mira desde el pasado hacia el presente (la acción CONTINÚA), mientras que "vor" solo señala un punto en el pasado (la acción YA TERMINÓ).',
        'Ejemplos: "Ich wohne seit einem Jahr in Berlin" (Vivo en Berlín desde hace un año — y sigo viviendo). "Vor einem Jahr bin ich nach Berlin gezogen" (Hace un año me mudé a Berlín — acción puntual en el pasado).',
      ],
      table: [
        ['Preposición', 'Perspectiva', 'Tiempo verbal'],
        ['seit', 'pasado → presente (continúa)', 'Präsens o Präteritum'],
        ['vor', 'solo pasado (terminado)', 'Perfekt o Präteritum'],
        ['nach', 'después de (secuencial)', 'cualquier tiempo'],
        ['in', 'futuro (dentro de X)', 'Präsens + Futur'],
      ],
    },
    {
      heading: 'Mientras vs. durante: während + Genitivo',
      paragraphs: [
        '"Während" rige siempre Genitivo en alemán formal, tanto masculino/neutro (während des Essens, während des Unterrichts) como femenino (während der Pause). En el habla coloquial a veces se usa con Dativo, pero la forma estándar en B1 es con Genitivo.',
        '"Bis" es especial: con horas y días va sin artículo (bis morgen, bis 8 Uhr). Con sustantivos necesita "bis zu + Dativ": bis zum Ende, bis zur Haltestelle.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Temporale Präpositionen B1: seit (continuidad), vor (pasado puntual), nach, in, bis, während, ab. Reglas de caso para cada una.',
    graphicPrompt: 'Línea del tiempo mostrando dónde apunta cada preposición temporal: pasado (vor/seit), presente, futuro (in/ab/bis).',
    scene: [
      ['Ich lerne seit zwei Jahren Deutsch.', 'Aprendo alemán desde hace dos años.'],
      ['Das war vor drei Wochen.', 'Eso fue hace tres semanas.'],
      ['Nach der Arbeit gehe ich einkaufen.', 'Después del trabajo voy de compras.'],
      ['Ich komme in zehn Minuten.', 'Llego en diez minutos.'],
      ['Bis Montag!', '¡Hasta el lunes!'],
      ['Während des Essens spreche ich nicht.', 'Durante la comida no hablo.'],
      ['Ab nächster Woche lerne ich täglich.', 'A partir de la semana que viene aprendo a diario.'],
      ['Vor dem Schlafen lese ich ein Buch.', 'Antes de dormir leo un libro.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['seit + Präsens', 'vor + Dativ', 'nach/in/ab', 'während + Genitiv', 'bis'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la preposición temporal correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la preposición de tiempo adecuada según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'El estudiante',
            lines: [['', 'Ich lerne Deutsch ___ drei Jahren. (desde hace 3 años)']],
            options: ['seit', 'vor', 'nach', 'in'],
            answer: 'seit',
            explain: '"seit" + Dativ: duración que continúa en el presente. Ich lerne (Präsens) → sigo aprendiendo.',
          },
          {
            scene: 'El accidente',
            lines: [['', 'Das war ___ einer Woche. (hace una semana)']],
            options: ['vor', 'seit', 'nach', 'bis'],
            answer: 'vor',
            explain: '"vor" + Dativ: punto en el pasado "hace X tiempo". La acción ya terminó.',
          },
          {
            scene: 'La rutina',
            lines: [['', '___ dem Essen gehe ich immer schlafen. (después de)']],
            options: ['Nach', 'Vor', 'Seit', 'Bis'],
            answer: 'Nach',
            explain: '"nach" + Dativ: después de (algo). Nach dem Essen = después de comer.',
          },
          {
            scene: 'Planificación',
            lines: [['', 'Ich komme ___ fünf Minuten. (en, dentro de)']],
            options: ['in', 'seit', 'vor', 'nach'],
            answer: 'in',
            explain: '"in" + Dativ: en/dentro de X tiempo (futuro). In fünf Minuten = dentro de 5 minutos.',
          },
          {
            scene: 'El horario',
            lines: [['', 'Wir arbeiten ___ 18 Uhr. (hasta)']],
            options: ['bis', 'seit', 'nach', 'vor'],
            answer: 'bis',
            explain: '"bis" + hora (sin artículo): hasta las 18h.',
          },
          {
            scene: 'El examen',
            lines: [['', '___ der Prüfung darf man nicht sprechen. (durante)']],
            options: ['Während', 'Nach', 'Seit', 'Vor'],
            answer: 'Während',
            explain: '"während" + Genitiv: durante. während der Prüfung (Prüfung = fem. → der).',
          },
          {
            scene: 'El cambio',
            lines: [['', '___ dem ersten Mai gilt das neue Gesetz. (a partir de)']],
            options: ['Ab', 'Vor', 'Seit', 'Nach'],
            answer: 'Ab',
            explain: '"ab" + Dativ: a partir de un momento. ab dem ersten Mai.',
          },
          {
            scene: 'La preparación',
            lines: [['', '___ dem Unterricht trinken wir immer Kaffee. (antes de)']],
            options: ['Vor', 'Nach', 'Seit', 'Bis'],
            answer: 'Vor',
            explain: '"vor" + Dativ: antes de (en secuencia). Vor dem Unterricht = antes de clase.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Preposición + artículo en Dativ',
        tag: '2 espacios',
        intro: 'Completa con la preposición y el artículo en Dativo correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina de tarde',
            lines: [['', '[[0]] [[1]] Arbeit geht er immer ins Fitnessstudio.']],
            blanks: [
              { options: ['Nach', 'Vor', 'Seit', 'Bis'], answer: 'Nach', explain: '"nach" = después de.' },
              { options: ['der', 'dem', 'die', 'das'], answer: 'der', explain: 'Arbeit es femenino → Dativ: der.' },
            ],
          },
          {
            scene: 'El concierto',
            lines: [['', '[[0]] [[1]] Konzert haben wir noch in einem Restaurant gegessen.']],
            blanks: [
              { options: ['Nach', 'Vor', 'Während', 'Ab'], answer: 'Nach', explain: '"nach" = después del concierto.' },
              { options: ['dem', 'der', 'die', 'das'], answer: 'dem', explain: 'Konzert es neutro → Dativ: dem.' },
            ],
          },
          {
            scene: 'Desde que llegó',
            lines: [['', 'Ich wohne hier [[0]] [[1]] Jahr.']],
            blanks: [
              { options: ['seit', 'vor', 'nach', 'in'], answer: 'seit', explain: '"seit" = duración en progreso (sigo viviendo aquí).' },
              { options: ['einem', 'ein', 'eine', 'einer'], answer: 'einem', explain: 'Jahr es neutro → Dativ: einem.' },
            ],
          },
          {
            scene: 'Hace tiempo',
            lines: [['', 'Das Meeting war [[0]] [[1]] Woche.']],
            blanks: [
              { options: ['vor', 'seit', 'nach', 'in'], answer: 'vor', explain: '"vor" = hace X tiempo (acción pasada, terminada).' },
              { options: ['einer', 'einem', 'eine', 'ein'], answer: 'einer', explain: 'Woche es femenino → Dativ: einer.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mi rutina de aprendizaje',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las preposiciones temporales correctas.',
        type: 'guidedText',
        scene: 'Una estudiante describe cómo estudia alemán.',
        text: 'Ich lerne [[0]] sechs Monaten Deutsch. [[1]] einem Jahr möchte ich die B2-Prüfung machen. [[2]] dem Kurs mache ich immer Hausaufgaben. [[3]] dem Unterricht höre ich gern Musik. [[4]] der Prüfung bin ich immer etwas nervös.',
        blanks: [
          { options: ['seit', 'vor', 'nach', 'in'], answer: 'seit', explain: '"seit" + Dativ: lleva 6 meses aprendiendo (y sigue).' },
          { options: ['In', 'Seit', 'Nach', 'Vor'], answer: 'In', explain: '"in" + Dativ: dentro de un año (futuro).' },
          { options: ['Nach', 'Vor', 'Seit', 'Bis'], answer: 'Nach', explain: '"nach" = después del curso.' },
          { options: ['Vor', 'Nach', 'Seit', 'Ab'], answer: 'Vor', explain: '"vor" = antes de la clase.' },
          { options: ['Während', 'Nach', 'Vor', 'Seit'], answer: 'Während', explain: '"während" + Genitiv: durante el examen.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Traduce con precisión',
        tag: 'Texto libre',
        intro: 'Traduce al alemán usando la preposición temporal correcta.',
        type: 'freeText',
        scene: 'Escribe cada oración en alemán con la preposición adecuada.',
        text: 'Vivo en Berlín desde hace dos años. → [[0]] / Eso pasó hace tres semanas. → [[1]] / Después del trabajo voy al supermercado. → [[2]] / Te llamo en diez minutos. → [[3]] / La tienda está abierta hasta las 8. → [[4]]',
        blanks: [
          { answer: 'Ich wohne seit zwei Jahren in Berlin.', explain: '"seit" + Dativ + Präsens para duración continua.' },
          { answer: 'Das war vor drei Wochen.', explain: '"vor" + Dativ para punto en el pasado.' },
          { answer: 'Nach der Arbeit gehe ich in den Supermarkt.', explain: '"nach" + Dativ femenino: nach der Arbeit.' },
          { answer: 'Ich rufe in zehn Minuten an.', explain: '"in" + Dativ plural para tiempo futuro.' },
          { answer: 'Das Geschäft ist bis 20 Uhr geöffnet.', explain: '"bis" + hora sin artículo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Preposiciones temporales en uso',
        tag: 'Producción guiada',
        intro: 'Escribe frases y textos usando las preposiciones temporales.',
        type: 'write',
        items: [
          {
            scene: 'La diferencia',
            prompt: 'Explica la diferencia entre "seit" y "vor" con dos ejemplos propios.',
            answer: '"seit" = Handlung dauert noch an (acción continua): Ich lerne seit einem Jahr Deutsch. "vor" = Punkt in der Vergangenheit (acción terminada): Vor einem Jahr habe ich angefangen.',
            explain: 'seit + Präsens = sigo haciéndolo. vor + Perfekt/Präteritum = ya terminé.',
          },
          {
            scene: 'Tu rutina',
            prompt: 'Describe tu rutina diaria usando al menos 4 preposiciones temporales diferentes.',
            answer: 'Vor dem Frühstück mache ich Sport. Während des Mittagessens lese ich. Nach der Arbeit treffe ich Freunde. Bis Mitternacht schaue ich manchmal Serien.',
            explain: 'Cada preposición con su caso correcto (Dat./Gen.).',
          },
          {
            scene: 'Planes futuros',
            prompt: 'Escribe 3 planes futuros usando "in" (dentro de X tiempo) o "ab" (a partir de).',
            answer: 'In drei Monaten mache ich die B1-Prüfung. Ab September studiere ich in Deutschland. In einem Jahr spreche ich fließend Deutsch.',
            explain: '"in" para lapsos futuros; "ab" para inicio de un período.',
          },
          {
            scene: 'Preguntas y respuestas',
            prompt: 'Formula 3 preguntas con preposiciones temporales y respóndelas.',
            answer: 'Seit wann lernst du Deutsch? — Seit zwei Jahren. Bis wann bist du heute im Büro? — Bis 17 Uhr. Was machst du nach der Arbeit? — Ich gehe ins Gym.',
            explain: 'Wann? para punto en el tiempo; seit wann? para inicio de duración.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Narración temporal libre',
        tag: 'Escritura libre',
        intro: 'Usa preposiciones temporales en textos más largos.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia con el alemán',
            prompt: 'Escribe un párrafo sobre tu historia aprendiendo alemán usando seit, vor, nach, in, bis y während.',
            answer: '',
            explain: 'Muestra el progreso temporal: cuándo empezaste, qué pasó antes/después, cuánto falta para tu objetivo.',
          },
          {
            scene: 'Tu semana típica',
            prompt: 'Describe tu semana típica usando preposiciones temporales en cada frase.',
            answer: '',
            explain: 'Usa vor, nach, während, bis, seit para estructurar la semana.',
          },
          {
            scene: 'Análisis',
            prompt: '¿Por qué "seit" siempre va con tiempo presente en alemán y nunca con Perfekt? Explica el principio.',
            answer: '',
            explain: '"seit" implica que la acción CONTINÚA → en alemán el presente expresa eso; el Perfekt implica que ya terminó.',
          },
        ],
      },
    ],
  },
}

export default topic
