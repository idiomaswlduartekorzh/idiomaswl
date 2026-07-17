import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-perfect-basic',
  order: '11',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Present Perfect Básico en Inglés A2',
  shortTitle: 'Present Perfect',
  metaTitle: 'Present Perfect en Inglés A2 — Have/Has + Participio Pasado',
  description:
    'El present perfect conecta el pasado con el presente: "I have visited Paris" (sin decir cuándo — la experiencia es lo importante). Se forma con have/has + participio pasado. Es uno de los tiempos más difíciles para hispanohablantes porque en español usamos el pretérito indefinido donde los ingleses usan el present perfect.',
  lead: 'Aprende el present perfect: have/has + participio pasado para hablar de experiencias y resultados presentes.',
  outcomes: [
    'Forma el present perfect con have/has + participio pasado',
    'Usa el present perfect para hablar de experiencias sin tiempo específico',
    'Conoce los 20 participios irregulares más comunes',
    'Distingue cuándo usar present perfect vs. past simple',
  ],

  guide: {
    goal: 'Usar have/has + participio pasado para hablar de experiencias de vida, logros y hechos recientes con relevancia presente.',
    model: 'I have visited three countries. / She has just finished her homework. / Have you ever tried sushi?',
    formula: 'Subject + have/has + past participle',
    decisions: [
      'I / you / we / they → have (o \'ve): I\'ve been to Japan.',
      'He / she / it → has (o \'s): She\'s finished the report.',
      'Negativo: haven\'t / hasn\'t + participio: He hasn\'t called yet.',
      'Pregunta: Have/Has + sujeto + participio? → Have you eaten? / Has she called?',
      'Participios regulares: verb + -ed (worked, visited, studied)',
      'Participios irregulares comunes: go→gone, come→come, see→seen, eat→eaten, have→had, do→done, write→written, be→been',
    ],
    table: [
      ['Sujeto', 'Auxiliar', 'Ejemplo'],
      ['I / You / We / They', 'have / \'ve', 'I\'ve visited Paris.'],
      ['He / She / It', 'has / \'s', 'She\'s read the book.'],
    ],
    mistakes: [
      '"I have went" ❌ → "I have gone" ✓ — participio de go = gone (no went).',
      '"She has write" ❌ → "She has written" ✓ — participio de write = written.',
      '"I have visited Paris yesterday" ❌ → "I visited Paris yesterday" ✓ — con tiempo específico → past simple.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el present perfect y cuándo se usa?',
      paragraphs: [
        'El present perfect (have/has + participio pasado) conecta una acción o experiencia pasada con el momento presente. La clave es que NO se especifica cuándo ocurrió — el énfasis está en que ocurrió en algún momento de la vida o que tiene relevancia ahora.',
        'Se usa principalmente en cuatro contextos: (1) Experiencias de vida: "I have visited Japan." (2) Hechos recientes con relevancia presente: "She\'s just finished her work." (3) Con ever/never para hablar de experiencias: "Have you ever eaten sushi?" (4) Con yet/already para acciones esperadas: "I haven\'t done it yet."',
      ],
    },
    {
      heading: 'Formación del present perfect',
      paragraphs: [
        'La estructura es: sujeto + have/has + participio pasado. Con I, you, we, they → "have" (o la contracción \'ve). Con he, she, it → "has" (o la contracción \'s).',
        'Los participios regulares se forman igual que el past simple: -ed. Los irregulares tienen su propia forma que hay que memorizar: go→gone, come→come, see→seen, eat→eaten, have→had, do→done, write→written, be→been, take→taken, know→known.',
        'Contracción en afirmativo: I\'ve seen it. / She\'s read it. En negativo: I haven\'t finished. / He hasn\'t called.',
      ],
      table: [
        ['Infinitivo', 'Participio', 'Ejemplo present perfect'],
        ['go', 'gone', 'I\'ve gone too far.'],
        ['see', 'seen', 'I\'ve seen that film twice.'],
        ['eat', 'eaten', 'She\'s eaten already.'],
        ['write', 'written', 'He\'s written a great book.'],
        ['be', 'been', 'We\'ve been very busy.'],
        ['take', 'taken', 'They\'ve taken the wrong bus.'],
        ['know', 'known', 'I\'ve known her for years.'],
        ['do', 'done', 'Have you done your homework?'],
      ],
    },
    {
      heading: 'Present perfect vs. past simple: la distinción clave',
      paragraphs: [
        'Present perfect: experiencias o hechos sin tiempo específico. "I have been to New York." (En algún momento de mi vida — no digo cuándo.)',
        'Past simple: acciones en un momento específico del pasado. "I went to New York in 2019." (Tengo una referencia temporal específica.)',
        'La señal: si hay una referencia de tiempo específica (yesterday, last year, in 2020, at 3pm), usa el past simple. Si no hay referencia de tiempo o hablas de si algo ha ocurrido alguna vez, usa el present perfect.',
      ],
    },
    {
      heading: 'Adverbios más usados con el present perfect',
      paragraphs: [
        '"Just" = hace un momento: "She\'s just arrived." / "Ever" = alguna vez (en preguntas): "Have you ever tried Thai food?" / "Never" = nunca: "I\'ve never smoked."',
        '"Already" = ya (antes de lo esperado): "I\'ve already done it." / "Yet" = todavía/aún (en negativos y preguntas): "I haven\'t finished yet." / "Have you called him yet?"',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más frecuente es usar el participio incorrecto: "I have went" en lugar de "I have gone". Recuerda que el present perfect usa el PARTICIPIO PASADO, no el past simple. "Went" es el past simple de "go"; "gone" es el participio.',
        'Otro error muy común es añadir una referencia de tiempo específica con el present perfect: "I have visited Paris in 2022." Si sabes cuándo, usa past simple: "I visited Paris in 2022." El present perfect se usa cuando el CUÁNDO no importa o no se menciona.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Present perfect básico: have/has + participio para experiencias y hechos recientes.',
    graphicPrompt: 'Experiencias de vida y logros recientes sin referencia de tiempo específica.',
    scene: [
      ['I\'ve visited five countries.', 'He visitado cinco países.'],
      ['She\'s just finished the report.', 'Ella acaba de terminar el informe.'],
      ['Have you ever eaten sushi?', '¿Has comido sushi alguna vez?'],
      ['We\'ve never been to Australia.', 'Nunca hemos estado en Australia.'],
      ['He\'s already done his homework.', 'Él ya ha hecho su tarea.'],
      ['I haven\'t called him yet.', 'Todavía no lo he llamado.'],
      ['They\'ve won the championship!', '¡Han ganado el campeonato!'],
      ['Has she seen that film?', '¿Ella ha visto esa película?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['go', 'see', 'eat', 'write', 'do', 'have', 'be', 'take', 'visit', 'finish'],
    reviewFocus: ['have vs has', 'irregular past participles', 'no specific time reference', 'just/already/yet/ever/never'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el present perfect',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de present perfect.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de experiencias',
            lines: [['', 'I ___ to Japan twice. It\'s an amazing country.']],
            options: ['\'ve been', '\'ve went', 'went', 'was'],
            answer: '\'ve been',
            explain: '"Been" es el participio de "be/go" (en el sentido de visitar). "I\'ve been to Japan" = experiencia de vida.',
          },
          {
            scene: 'Noticia reciente',
            lines: [['', 'She ___ the exam results. She passed!']],
            options: ['\'s just received', 'received just', 'just received', 'just receive'],
            answer: '\'s just received',
            explain: '"Has just received" — hecho muy reciente. "Just" va entre have/has y el participio.',
          },
          {
            scene: 'Participio irregular',
            lines: [['', 'Have you ___ the new season of that series?']],
            options: ['seen', 'saw', 'see', 'seeing'],
            answer: 'seen',
            explain: '"Seen" es el participio pasado de "see". En present perfect: have + seen.',
          },
          {
            scene: 'Tercera persona',
            lines: [['', 'He ___ his assignment yet.']],
            options: ['hasn\'t finished', 'haven\'t finished', 'didn\'t finish', 'not finished'],
            answer: 'hasn\'t finished',
            explain: '"He hasn\'t finished yet" — tercera persona singular: hasn\'t (has not).',
          },
          {
            scene: 'Pregunta de experiencia',
            lines: [['', '___ you ever tried Mexican street food?']],
            options: ['Have', 'Has', 'Did', 'Do'],
            answer: 'Have',
            explain: 'Pregunta con "you" → "Have you ever...?" — ever se usa en preguntas de experiencia.',
          },
          {
            scene: 'Error a detectar',
            lines: [['', 'I have ___ to the supermarket this morning.']],
            options: ['been', 'went', 'go', 'going'],
            answer: 'been',
            explain: '"Been" es el participio de "go" cuando significa ir a un lugar (y volver). "I have been to the supermarket" = fui y ya volví.',
          },
          {
            scene: 'Ya terminado',
            lines: [['', 'Don\'t buy bread — I\'ve ___ bought some.']],
            options: ['already', 'yet', 'just', 'never'],
            answer: 'already',
            explain: '"Already" = ya (algo que se hizo antes de lo esperado). Posición: entre have y el participio.',
          },
          {
            scene: 'Todavía no',
            lines: [['', 'I haven\'t seen that film ___.']],
            options: ['yet', 'already', 'just', 'ever'],
            answer: 'yet',
            explain: '"Yet" en negativo = todavía no. Se coloca al final de la oración.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Auxiliar y participio',
        tag: '2 espacios',
        intro: 'Completa con have/has y el participio correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Conversación sobre viajes',
            lines: [['', 'My friend [[0]] never [[1]] outside of her country.']],
            blanks: [
              { options: ['has', 'have', 'had', 'is'], answer: 'has', explain: '"My friend" = tercera persona singular → "has".' },
              { options: ['been', 'went', 'go', 'gone'], answer: 'been', explain: '"Been" = participio de "be/go" para visitar un lugar.' },
            ],
          },
          {
            scene: 'Sobre las noticias',
            lines: [['', 'Scientists [[0]] just [[1]] a cure for this disease.']],
            blanks: [
              { options: ['have', 'has', 'had', 'are'], answer: 'have', explain: '"Scientists" = plural → "have".' },
              { options: ['discovered', 'discover', 'discovers', 'discovering'], answer: 'discovered', explain: '"Discovered" = participio regular de discover.' },
            ],
          },
          {
            scene: 'Revisando el trabajo',
            lines: [
              ['Boss:', '[[0]] you [[1]] the quarterly report?'],
              ['Employee:', 'Not yet — I\'ll have it ready by 5pm.'],
            ],
            blanks: [
              { options: ['Have', 'Has', 'Did', 'Do'], answer: 'Have', explain: 'Pregunta con "you" → "Have you...?"' },
              { options: ['finished', 'finish', 'finishes', 'finishing'], answer: 'finished', explain: '"Finished" = participio regular de finish.' },
            ],
          },
          {
            scene: 'Hablando de un libro',
            lines: [['', 'I [[0]] already [[1]] that book — I read it last year.']],
            blanks: [
              { options: ['\'ve', 'has', 'had', 'am'], answer: '\'ve', explain: '"I\'ve already read" — "I have" contraído.' },
              { options: ['read', 'readed', 'reads', 'reading'], answer: 'read', explain: '"Read" = el participio de read es "read" (misma escritura, pronunciación /rɛd/).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una persona interesante',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del present perfect para describir las experiencias de vida de esta persona.',
        type: 'guidedText',
        scene: 'Elige la forma correcta del present perfect para describir las experiencias de vida de esta persona.',
        text: 'My uncle Carlos is fascinating. He [[0]] (live) in four different countries. He [[1]] (meet) people from every continent. He [[2]] (write) two books about his travels. He [[3]] never [[4]] (fly) in a private jet, though. He [[5]] (learn) three languages. He [[6]] (visit) more than 50 countries — and he\'s only 45!',
        blanks: [
          { options: ['has lived', 'have lived', 'lived', 'lives'], answer: 'has lived', explain: '"He has lived" — he/she/it → has + participio.' },
          { options: ['has met', 'have met', 'met', 'meets'], answer: 'has met', explain: '"He has met" — has + participle of "meet" (= met).' },
          { options: ['has written', 'have written', 'wrote', 'has wrote'], answer: 'has written', explain: '"He has written" — participio de write = written.' },
          { options: ['has', 'have', 'had', 'is'], answer: 'has', explain: '"He has never" — auxiliar has para tercera persona.' },
          { options: ['flown', 'flew', 'fly', 'flying'], answer: 'flown', explain: '"Flown" = participio de fly.' },
          { options: ['has learned', 'have learned', 'learned', 'learns'], answer: 'has learned', explain: '"Has learned" o "has learnt" (ambos correctos).' },
          { options: ['has visited', 'have visited', 'visited', 'visits'], answer: 'has visited', explain: '"He has visited" — experiencia acumulada.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el present perfect',
        tag: 'Texto libre',
        intro: 'Escribe el present perfect correcto del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el present perfect correcto del verbo entre paréntesis.',
        text: 'I [[0]] (never / eat) Korean food before, but my friend [[1]] (try) it many times. She [[2]] (recommend) a great restaurant to me. I [[3]] (not / call) to make a reservation yet. Have you [[4]] (be) to any Korean restaurants?',
        blanks: [
          { answer: 'have never eaten', accepted: ["have never eaten", "'ve never eaten"], explain: '"I have never eaten" — never + participio.' },
          { answer: 'has tried', accepted: ['has tried'], explain: '"She has tried" — she → has.' },
          { answer: 'has recommended', accepted: ['has recommended'], explain: '"She has recommended" — participio de recommend.' },
          { answer: "haven't called", accepted: ["haven't called", 'have not called'], explain: '"I haven\'t called yet" — negativo + yet.' },
          { answer: 'been', accepted: ['been'], explain: '"Have you been to...?" — been como participio de be/go.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones en present perfect sobre tus propias experiencias.',
        type: 'write',
        items: [
          {
            scene: 'Tus viajes',
            prompt: 'Escribe dos países o ciudades que has visitado (usa "I\'ve been to...").',
            answer: 'I\'ve been to Mexico City and Buenos Aires.',
            accepted: ["i've been", "i have been", "i've visited", "i have visited"],
            explain: 'Ejemplo: I\'ve been to Colombia, Brazil, and Spain. / I\'ve never been outside of my country.',
          },
          {
            scene: 'Logros recientes',
            prompt: 'Escribe algo que acabas de hacer o terminar (usa "I\'ve just...").',
            answer: 'I\'ve just finished reading a great novel.',
            accepted: ["i've just", "i have just", "she's just", "he's just"],
            explain: 'Ejemplo: I\'ve just completed a course online. / She\'s just started a new project.',
          },
          {
            scene: 'Algo que no has hecho todavía',
            prompt: 'Escribe algo que todavía no has hecho pero planeas hacer (usa "I haven\'t... yet").',
            answer: 'I haven\'t started learning piano yet, but I plan to this year.',
            accepted: ["i haven't", "i have not", "she hasn't", "he hasn't"],
            explain: 'Ejemplo: I haven\'t called my parents yet. / We haven\'t decided where to go yet.',
          },
          {
            scene: 'Experiencias de vida',
            prompt: 'Escribe una experiencia única que hayas tenido (usa "I\'ve + participio irregular").',
            answer: 'I\'ve met some amazing people through my work.',
            accepted: ["i've met", "i've seen", "i've eaten", "i've done", "i've written", "i've read", "i've taken", "i've learned"],
            explain: 'Ejemplo: I\'ve seen the Northern Lights. / I\'ve eaten food from 20 different countries.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu lista de vida',
        tag: 'Producción libre',
        intro: 'Escribe sobre 3 experiencias de tu "lista de vida" — cosas que has hecho y cosas que aún no has hecho.',
        type: 'write',
        items: [
          {
            scene: 'Tu lista de vida',
            prompt: 'Escribe una experiencia impresionante que ya has tenido (present perfect).',
            answer: 'I\'ve climbed a mountain — it was one of the best experiences of my life.',
            accepted: ["i've", "i have", "we've", "we have", "she's", "he's"],
            explain: 'Ejemplo: I\'ve run a marathon. / I\'ve lived in a different country. / I\'ve spoken in front of 200 people.',
          },
          {
            scene: 'Tu lista de vida',
            prompt: 'Escribe algo que todavía no has hecho pero que quieres hacer (haven\'t... yet).',
            answer: 'I haven\'t written a book yet, but it\'s a dream of mine.',
            accepted: ["haven't", "have not", "hasn't", "has not"],
            explain: 'Ejemplo: I haven\'t traveled to Asia yet. / I haven\'t learned to cook properly yet.',
          },
          {
            scene: 'Tu lista de vida',
            prompt: 'Escribe algo que nunca has hecho y por qué (I\'ve never...).',
            answer: 'I\'ve never gone skydiving because I\'m terrified of heights.',
            accepted: ["i've never", "i have never", "we've never", "she's never", "he's never"],
            explain: 'Ejemplo: I\'ve never tried surfing. / I\'ve never been to Asia — I\'d love to go one day.',
          },
        ],
      },
    ],
  },
}

export default topic
