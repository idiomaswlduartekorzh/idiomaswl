import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'dativ-a2',
  order: '07',
  color: '#c9a900',
  category: 'Kasus',
  level: 'A2',
  title: 'Der Dativ: Verben und Präpositionen mit Dativ',
  shortTitle: 'Dativ',
  metaTitle: 'Dativo en alemán A2 — Preposiciones y verbos con Dativ',
  description:
    'El Dativ es el caso del objeto indirecto en alemán. Se usa con preposiciones fijas (mit, bei, nach, von, zu, aus, seit) y con verbos como helfen, danken y gefallen. Dominar el Dativ te permite expresar relaciones espaciales, de origen, de tiempo y de beneficio.',
  lead: 'El caso del objeto indirecto: preposiciones y verbos que siempre rigen Dativ.',
  outcomes: [
    'Reconocer las preposiciones que siempre llevan Dativ',
    'Declinar el artículo definido e indefinido en Dativ',
    'Usar helfen, danken y gefallen con el complemento en Dativ',
    'Distinguir el Dativ del Akkusativ en oraciones cotidianas',
  ],

  guide: {
    goal: 'Usar correctamente el Dativ con preposiciones fijas y verbos de Dativ.',
    model: 'Ich helfe meinem Vater. / Das Buch gehört meiner Schwester. / Ich gehe mit dem Bus.',
    formula: 'Präposition + Dativ-Artikel + Nomen / Verb(Dativ) + Dativ-NP',
    decisions: [
      'Preposiciones fijas de Dativ: mit, bei, nach, von, zu, aus, seit — siempre Dativ, sin excepción',
      'Artículo definido Dativ: dem (m/n), der (f), den (pl) → mit dem Mann, mit der Frau, mit dem Kind, mit den Kindern',
      'Artículo indefinido Dativ: einem (m/n), einer (f), keinen/meinen (pl) → mit einem Freund, mit einer Lehrerin',
      'Verbos de Dativ frecuentes: helfen (ayudar), danken (agradecer), gefallen (gustar), gehören (pertenecer), fehlen (faltar)',
      'En plural el sustantivo añade -n si no termina en -n o -s: Kindern, Männern, Freunden',
      'seit + Dativ expresa duración desde el pasado hasta ahora: Ich lerne seit einem Jahr Deutsch.',
    ],
    table: [
      ['Präposition', 'Beispiel (Dativ)', 'Bedeutung'],
      ['mit', 'Ich fahre mit dem Zug', 'con'],
      ['bei', 'Ich bin bei meiner Mutter', 'en casa de / junto a'],
      ['nach', 'nach der Schule', 'después de'],
      ['von', 'das Buch von der Lehrerin', 'de (autor/origen)'],
      ['zu', 'Ich gehe zu meinem Freund', 'a (casa de alguien)'],
      ['aus', 'Ich komme aus dem Haus', 'de (lugar de origen)'],
      ['seit', 'seit einem Monat', 'desde hace'],
    ],
    mistakes: [
      'Usar Akkusativ con preposiciones de Dativ: INCORRECTO "mit den Zug" → CORRECTO "mit dem Zug"',
      'Olvidar el -n en plural Dativ: INCORRECTO "mit die Kinder" → CORRECTO "mit den Kindern"',
      'Confundir zu y nach: nach se usa con países/ciudades sin artículo (nach Berlin), zu con personas y lugares con artículo (zum Arzt)',
    ],
  },

  seo: [
    {
      heading: '¿Cuáles son las preposiciones de Dativ en alemán?',
      paragraphs: [
        'Hay siete preposiciones que siempre rigen Dativ en alemán: mit (con), bei (junto a / en casa de), nach (después de / hacia — con países), von (de), zu (a — con personas), aus (de — procedencia), seit (desde hace). Aprenderlas como una lista fija es la estrategia más eficiente.',
        'La regla práctica: si ves una de estas preposiciones, el artículo que le sigue cambia a su forma Dativ. El artículo definido masculino "der" se convierte en "dem"; el neutro "das" también se convierte en "dem"; el femenino "die" se convierte en "der"; el plural "die" se convierte en "den".',
      ],
    },
    {
      heading: '¿Qué verbos rigen Dativ en alemán?',
      paragraphs: [
        'Algunos verbos en alemán toman su complemento directo en Dativ, no en Akkusativ. Los más frecuentes en A2 son: helfen (ayudar a alguien — Ich helfe meinem Bruder), danken (agradecer a alguien), gefallen (gustar — Das gefällt mir), gehören (pertenecer a — Das Buch gehört meiner Lehrerin), fehlen (faltar a alguien).',
        'La estructura de "gefallen" es la inversa del español: la cosa que gusta va en Nominativ (sujeto) y la persona a quien gusta va en Dativ. "Das Essen gefällt mir" = "La comida me gusta".',
      ],
    },
    {
      heading: '¿Cómo se distingue el Dativ del Akkusativ en alemán?',
      paragraphs: [
        'El Akkusativ es el objeto directo (¿a qué o a quién afecta la acción directamente?) y el Dativ es el objeto indirecto (¿en beneficio de quién o a quién se da algo?). En "Ich gebe meinem Vater das Buch", "meinem Vater" está en Dativ (objeto indirecto) y "das Buch" en Akkusativ (objeto directo).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Dativ: preposiciones fijas + verbos Dativ + cambios de artículo.',
    graphicPrompt: 'Tabla de preposiciones con flechas indicando el artículo Dativ correspondiente.',
    scene: [
      ['Ich fahre mit dem Bus', 'Voy en autobús'],
      ['Ich helfe meiner Mutter', 'Ayudo a mi madre'],
      ['Das gefällt mir sehr', 'Eso me gusta mucho'],
      ['Wir kommen aus dem Kino', 'Venimos del cine'],
      ['Ich bin seit einem Jahr hier', 'Estoy aquí desde hace un año'],
      ['Das gehört meinem Bruder', 'Eso le pertenece a mi hermano'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['mit/bei/nach/von/zu/aus/seit + Dativ', 'dem/der/den', 'helfen/gefallen/gehören'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige el artículo o pronombre en Dativ correcto.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando del transporte',
            lines: [['', 'Ich fahre mit ___ Bus. (der)']],
            options: ['dem', 'den', 'der', 'die'],
            answer: 'dem',
            explain: '"Bus" es masculino. Dativ masculino: dem. Mit dem Bus.',
          },
          {
            scene: 'Preguntando por la procedencia',
            lines: [['', 'Sie kommt aus ___ Schweiz. (die)']],
            options: ['der', 'dem', 'die', 'den'],
            answer: 'der',
            explain: '"Schweiz" es femenino. Dativ femenino: der. Aus der Schweiz.',
          },
          {
            scene: 'Hablando de dónde está alguien',
            lines: [['', 'Er ist bei ___ Arzt. (der)']],
            options: ['dem', 'der', 'das', 'den'],
            answer: 'dem',
            explain: '"Arzt" es masculino. Dativ masculino: dem. Bei dem Arzt.',
          },
          {
            scene: 'Describiendo cuánto tiempo llevas',
            lines: [['', 'Ich lerne seit ___ Jahr Deutsch. (ein)']],
            options: ['einem', 'einen', 'einer', 'ein'],
            answer: 'einem',
            explain: '"Jahr" es neutro. Dativ neutro con artículo indefinido: einem.',
          },
          {
            scene: 'Usando un verbo de Dativ',
            lines: [['', 'Ich helfe ___ Schwester. (meine)']],
            options: ['meiner', 'meinem', 'meine', 'meinen'],
            answer: 'meiner',
            explain: '"Schwester" es femenino. Dativ femenino del posesivo: meiner.',
          },
          {
            scene: 'Hablando de a quién pertenece algo',
            lines: [['', 'Das Buch gehört ___ Lehrer. (der)']],
            options: ['dem', 'der', 'den', 'die'],
            answer: 'dem',
            explain: '"Lehrer" es masculino. Dativ masculino: dem. Gehört dem Lehrer.',
          },
          {
            scene: 'Expresando destino hacia una persona',
            lines: [['', 'Ich gehe zu ___ Freundin. (meine)']],
            options: ['meiner', 'meinem', 'meinen', 'meine'],
            answer: 'meiner',
            explain: '"Freundin" es femenino. Zu + Dativ femenino: meiner.',
          },
          {
            scene: 'Indicando agrado',
            lines: [['', 'Das gefällt ___ sehr gut. (ich)']],
            options: ['mir', 'mich', 'ich', 'mein'],
            answer: 'mir',
            explain: 'Pronombre Dativ de 1.ª persona singular: mir. Das gefällt mir.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa la preposición de Dativ y el artículo correspondiente.',
        type: 'dual',
        items: [
          {
            scene: 'Contando cómo vas al trabajo',
            lines: [['', 'Ich fahre jeden Tag [[0]] [[1]] Auto. (mit, das)']],
            blanks: [
              { options: ['mit', 'bei', 'von', 'zu'], answer: 'mit', explain: '"con el coche" → mit + Dativ.' },
              { options: ['dem', 'der', 'den', 'die'], answer: 'dem', explain: '"Auto" es neutro. Dativ neutro: dem.' },
            ],
          },
          {
            scene: 'Hablando de dónde vive alguien',
            lines: [['', 'Mein Bruder wohnt [[0]] [[1]] Eltern. (bei, die)']],
            blanks: [
              { options: ['bei', 'mit', 'von', 'nach'], answer: 'bei', explain: '"en casa de sus padres" → bei + Dativ.' },
              { options: ['den', 'die', 'der', 'dem'], answer: 'den', explain: '"Eltern" es plural. Dativ plural: den.' },
            ],
          },
          {
            scene: 'Describiendo procedencia',
            lines: [['', 'Dieses Rezept kommt [[0]] [[1]] Großmutter. (von, meine)']],
            blanks: [
              { options: ['von', 'aus', 'bei', 'zu'], answer: 'von', explain: '"de mi abuela" → von + Dativ.' },
              { options: ['meiner', 'meinem', 'meinen', 'meine'], answer: 'meiner', explain: '"Großmutter" es femenino. Dativ femenino: meiner.' },
            ],
          },
          {
            scene: 'Indicando desde cuándo',
            lines: [['', 'Wir kennen uns [[0]] [[1]] Schulzeit. (seit, die)']],
            blanks: [
              { options: ['seit', 'nach', 'von', 'bei'], answer: 'seit', explain: '"desde la época escolar" → seit + Dativ.' },
              { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Schulzeit" es femenino. Dativ femenino: der.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de Dativ.',
        type: 'guidedText',
        scene: 'Ana habla sobre su vida en la nueva ciudad.',
        text: 'Ich wohne seit [[0]] Monat in Berlin. Ich fahre täglich [[1]] der U-Bahn zur Arbeit. Nach [[2]] Arbeit gehe ich oft [[3]] meiner besten Freundin. Das Leben hier gefällt [[4]] wirklich sehr gut.',
        blanks: [
          { options: ['einem', 'einen', 'ein', 'einer'], answer: 'einem', explain: '"Monat" es masculino. seit + Dativ masculino indefinido: einem.' },
          { options: ['mit', 'bei', 'von', 'nach'], answer: 'mit', explain: '"con el metro" → mit der U-Bahn.' },
          { options: ['der', 'dem', 'die', 'den'], answer: 'der', explain: '"Arbeit" es femenino. nach + Dativ femenino: der.' },
          { options: ['zu', 'bei', 'von', 'aus'], answer: 'zu', explain: '"a (casa de) mi amiga" → zu meiner Freundin.' },
          { options: ['mir', 'mich', 'ich', 'mein'], answer: 'mir', explain: 'Dativ pronombre 1.ª persona singular: mir. Gefällt mir.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de Dativ sin opciones.',
        type: 'freeText',
        scene: 'Marco describe su rutina diaria.',
        text: 'Ich komme [[0]] einem kleinen Dorf in Spanien. Jeden Morgen helfe ich [[1]] Vater im Geschäft. Nach [[2]] Mittagessen gehe ich mit [[3]] Hund spazieren. Abends bin ich oft bei [[4]] Großeltern.',
        blanks: [
          { answer: 'aus', accepted: ['aus'], explain: '"Vengo de un pequeño pueblo" → Ich komme aus + Dativ.' },
          { answer: 'meinem', accepted: ['meinem'], explain: '"Vater" es masculino. Dativ masculino posesivo: meinem.' },
          { answer: 'dem', accepted: ['dem'], explain: '"Mittagessen" es neutro. nach + Dativ neutro: dem.' },
          { answer: 'dem', accepted: ['dem'], explain: '"Hund" es masculino. mit + Dativ masculino: dem.' },
          { answer: 'meinen', accepted: ['meinen'], explain: '"Großeltern" es plural. bei + Dativ plural: meinen.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando preposiciones o verbos de Dativ.',
        type: 'write',
        items: [
          {
            scene: 'Tu forma de ir a la universidad',
            prompt: 'Di cómo vas a la universidad o al trabajo (usa "mit").',
            answer: 'Ich fahre mit dem Bus zur Universität.',
            accepted: ['mit dem', 'mit der', 'mit einem'],
            explain: 'mit + Dativ: mit dem Bus (m), mit der U-Bahn (f), mit dem Auto (n).',
          },
          {
            scene: 'Algo que le pertenece a alguien',
            prompt: 'Di a quién pertenece algo (usa "gehört").',
            answer: 'Das Handy gehört meiner Schwester.',
            accepted: ['gehört meiner', 'gehört meinem', 'gehört dem'],
            explain: 'gehören + Dativ: "gehört meiner Schwester" (femenino Dativ).',
          },
          {
            scene: 'Expresando desde cuándo',
            prompt: 'Di desde cuándo estudias alemán (usa "seit").',
            answer: 'Ich lerne seit einem Jahr Deutsch.',
            accepted: ['seit einem', 'seit zwei', 'seit einem Monat'],
            explain: 'seit + Dativ: seit einem Jahr (n), seit einem Monat (m), seit einer Woche (f).',
          },
          {
            scene: 'Ayudando a alguien',
            prompt: 'Di que ayudas a alguien (usa "helfen").',
            answer: 'Ich helfe meinem Bruder bei den Hausaufgaben.',
            accepted: ['helfe meinem', 'helfe meiner', 'helfe dem'],
            explain: 'helfen + Dativ: meinem Bruder (masculino Dativ).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe oraciones propias usando el Dativ de forma natural.',
        type: 'write',
        items: [
          {
            scene: 'Tu vida cotidiana',
            prompt: 'Escribe 2-3 oraciones sobre tu rutina usando preposiciones de Dativ (mit, bei, nach, zu).',
            answer: 'Ich fahre mit dem Fahrrad zur Arbeit. Nach der Arbeit gehe ich zu meiner Freundin.',
            accepted: ['mit dem', 'nach der', 'zu meiner', 'bei meinem'],
            explain: 'Recuerda: mit/bei/nach/von/zu/aus/seit siempre llevan Dativ.',
          },
          {
            scene: 'Expresar agrado en alemán',
            prompt: 'Di tres cosas que te gustan usando "gefällt mir" o "gefallen mir".',
            answer: 'Deutsch gefällt mir sehr. Auch Musik und Sport gefallen mir.',
            accepted: ['gefällt mir', 'gefallen mir', 'mir gefällt'],
            explain: 'gefallen + Dativ: cosa en Nominativ, persona en Dativ. Singular: gefällt; plural: gefallen.',
          },
          {
            scene: 'Hablando de pertenencias',
            prompt: 'Di tres cosas que le pertenecen a personas de tu entorno (gehört/gehören).',
            answer: 'Das Buch gehört meinem Vater. Die Tasche gehört meiner Mutter. Die Schlüssel gehören meinem Bruder.',
            accepted: ['gehört meinem', 'gehört meiner', 'gehören meinen'],
            explain: 'gehören + Dativ. Singular: gehört; plural: gehören.',
          },
        ],
      },
    ],
  },
}

export default topic
