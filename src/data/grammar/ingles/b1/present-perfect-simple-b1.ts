import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-perfect-simple-b1',
  order: '04',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Present Perfect Simple en Inglés B1',
  shortTitle: 'Present Perfect Simple',
  metaTitle: 'Present Perfect Simple B1 — Have/Has + Participio para conectar pasado y presente',
  description:
    'El present perfect simple (have/has + participio) conecta el pasado con el presente. En B1 lo usas con for y since para duración, con ever/never para experiencias de vida, con just/already/yet para noticias recientes, y aprendes a contrastarlo con el past simple.',
  lead: 'Domina el present perfect para hablar de experiencias de vida, noticias recientes y situaciones que conectan el pasado con el presente.',
  outcomes: [
    'Forma el present perfect con have/has + participio correctamente',
    'Usa for y since para expresar duración hasta el presente',
    'Usa ever/never para hablar de experiencias de vida',
    'Contrasta present perfect (sin tiempo específico) con past simple (con tiempo específico)',
  ],

  guide: {
    goal: 'Usar el present perfect para conectar experiencias y estados del pasado con el momento presente.',
    model: 'I have lived here for five years. / Have you ever been to Japan? / She has just left.',
    formula: 'Subject + have/has (not) + past participle',
    decisions: [
      'Have con I/you/we/they — has con he/she/it.',
      'FOR + período de tiempo: "I\'ve lived here for three years." (duración)',
      'SINCE + punto de inicio: "She\'s worked here since 2020." (desde cuándo)',
      'EVER (alguna vez) / NEVER (nunca): "Have you ever tried sushi?" / "I\'ve never been to Africa."',
      'JUST (acabar de), ALREADY (ya — afirmativa), YET (todavía — negativa/pregunta): "I\'ve just finished." / "Have you eaten yet?"',
      'Contraste: present perfect = sin tiempo específico / past simple = con tiempo específico. "I\'ve seen that film." vs "I saw it last week."',
    ],
    table: [
      ['Adverbio', 'Posición', 'Ejemplo'],
      ['for / since', 'al final / después de have', 'for three years / since Monday'],
      ['ever / never', 'entre have y participio', 'Have you ever eaten...? / I\'ve never tried...'],
      ['just / already / yet', 'entre have y participio / al final', 'I\'ve just left. / Have you eaten yet?'],
    ],
    mistakes: [
      '"I have seen him yesterday" ❌ → "I saw him yesterday" ✓ — con tiempo específico usa past simple.',
      '"She has been there since three years" ❌ → "She has been there for three years" ✓ — FOR + período, SINCE + punto de inicio.',
      '"Have you ever went to...?" ❌ → "Have you ever been to...?" ✓ — usa el participio pasado, no el past simple.',
    ],
  },

  seo: [
    {
      heading: '¿Qué expresa el present perfect simple?',
      paragraphs: [
        'El present perfect conecta el pasado con el presente. Lo usas cuando el resultado o la relevancia de una acción pasada importa ahora: "I\'ve lost my keys" — no sé dónde están tus llaves AHORA. No importa cuándo las perdiste exactamente; lo que importa es la situación actual.',
        'Es el tiempo que más confunde a hispanohablantes porque en español a veces usamos pretérito perfecto compuesto ("he perdido") y a veces pretérito indefinido ("perdí"). En inglés la regla es clara: si mencionas cuándo → past simple. Si no mencionas cuándo → present perfect.',
      ],
    },
    {
      heading: 'For vs Since: duración hasta ahora',
      paragraphs: [
        '"For" va con un período de tiempo — cuánto tiempo ha durado algo: "I\'ve studied English for five years." / "She\'s worked here for two months." "Since" va con el punto de inicio — cuándo empezó: "I\'ve lived here since 2018." / "He\'s been a teacher since he finished university."',
        'Truco mental: FOR responde a "¿cuánto tiempo?" — SINCE responde a "¿desde cuándo?" "I\'ve had this phone for a year / since last January." Ambas son correctas, solo cambia la referencia temporal.',
      ],
      table: [
        ['Marcador', 'Tipo de expresión', 'Ejemplos'],
        ['for', 'Período de tiempo', 'for three days, for a week, for 20 years'],
        ['since', 'Punto de inicio', 'since Monday, since 2019, since I was a child'],
      ],
    },
    {
      heading: 'Ever y Never para experiencias de vida',
      paragraphs: [
        '"Ever" en preguntas significa "alguna vez en tu vida" y va entre have y el participio: "Have you ever eaten frog legs?" → pregunta por cualquier momento de tu vida hasta ahora. La respuesta afirmativa usa "Yes, I have" o "Yes, I\'ve [participio]."',
        '"Never" equivale a "not ever" — experiencias que no has tenido: "I\'ve never been skydiving." / "She\'s never tried spicy food." Never va siempre entre have y el participio.',
      ],
    },
    {
      heading: 'Just, Already y Yet para noticias recientes',
      paragraphs: [
        '"Just" (acabar de) indica que algo ocurrió hace muy poco: "I\'ve just arrived." / "She\'s just called." Va entre have y el participio. "Already" confirma que algo ocurrió antes de lo esperado (afirmativas): "I\'ve already eaten, thanks." También va entre have y el participio, o al final con énfasis.',
        '"Yet" aparece en negativos y preguntas, al final de la oración: "I haven\'t finished yet." / "Have you emailed them yet?" Significa "todavía" en negativas y "ya" en preguntas.',
      ],
    },
    {
      heading: 'Present Perfect vs Past Simple: la regla definitiva',
      paragraphs: [
        'La regla es simple pero fundamental: ¿mencionas cuándo ocurrió? → Past Simple. ¿No mencionas cuándo? → Present Perfect. "I\'ve been to Paris." (experiencia, no importa cuándo) vs "I went to Paris last year." (tiempo específico).',
        'Estas dos frases no son intercambiables. Si tu interlocutor pregunta "When did you go?" (cuándo fuiste), la respuesta es "I went in 2022" (past simple), nunca "I have gone in 2022".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Present perfect con for/since para duración, ever/never para experiencias, just/already/yet para noticias.',
    graphicPrompt: 'Línea de tiempo con flecha continua desde el pasado hasta NOW para for/since.',
    scene: [
      ['I\'ve lived in Bogotá for three years.', 'He vivido en Bogotá durante tres años.'],
      ['Have you ever visited the Caribbean coast?', '¿Has visitado alguna vez la costa Caribe?'],
      ['She\'s never tried Korean food.', 'Ella nunca ha probado la comida coreana.'],
      ['I\'ve just finished the report — here it is.', 'Acabo de terminar el informe — aquí está.'],
      ['Have you eaten yet? The food is ready.', '¿Ya has comido? La comida está lista.'],
      ['He\'s worked at that company since 2019.', 'Ha trabajado en esa empresa desde 2019.'],
      ['We haven\'t received their answer yet.', 'Todavía no hemos recibido su respuesta.'],
      ['They\'ve already booked the tickets.', 'Ya han reservado los billetes.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['be', 'go', 'see', 'eat', 'try', 'live', 'work', 'finish', 'meet', 'learn'],
    reviewFocus: ['for vs since', 'ever/never position', 'just/already/yet', 'pp vs past simple contrast'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Have/Has y la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de present perfect.',
        type: 'choice',
        items: [
          {
            scene: 'Experiencia de viaje',
            lines: [['', 'Have you ever ___ to Argentina?']],
            options: ['been', 'went', 'go', 'gone to'],
            answer: 'been',
            explain: '"Been to" es la forma correcta para experiencia de lugar. "Gone to" implicaría que todavía estás allí.',
          },
          {
            scene: 'Una noticia',
            lines: [['', 'She ___ just ___ a promotion!']],
            options: ['has / got', 'have / got', 'did / get', 'is / getting'],
            answer: 'has / got',
            explain: 'She → has + got (participio). "Just" va entre has y el participio.',
          },
          {
            scene: 'Esperar una respuesta',
            lines: [['', 'They ___ answered our email ___.']],
            options: ['haven\'t / yet', 'didn\'t / yet', 'haven\'t / already', 'hasn\'t / yet'],
            answer: 'haven\'t / yet',
            explain: 'They → haven\'t (not have). "Yet" va al final en negativas.',
          },
          {
            scene: 'Duración',
            lines: [['', 'He ___ this company ___ ten years.']],
            options: ['has run / for', 'has run / since', 'ran / for', 'have run / for'],
            answer: 'has run / for',
            explain: 'He → has run. "For" + período de tiempo (ten years).',
          },
          {
            scene: 'Desde cuándo',
            lines: [['', 'I ___ vegetarian ___ I was fifteen.']],
            options: ['\'ve been / since', '\'ve been / for', 'was / since', 'am / since'],
            answer: '\'ve been / since',
            explain: '\'ve been → have been. "Since" + punto de inicio (a specific past moment: age 15).',
          },
          {
            scene: 'Una primera vez',
            lines: [['', 'I ___ never ___ a horror film in the cinema.']],
            options: ['have / watched', 'have / watch', 'did / watch', 'was / watching'],
            answer: 'have / watched',
            explain: 'Have + never + watched (participio). "Never" va entre have y el participio.',
          },
          {
            scene: 'La comida',
            lines: [['', 'I\'m not hungry, thank you — I ___ already ___.']],
            options: ['\'ve / eaten', '\'ve / eat', 'did / eat', '\'m / eating'],
            answer: '\'ve / eaten',
            explain: '\'ve eaten = have eaten. "Already" va entre have y el participio.',
          },
          {
            scene: 'Un logro',
            lines: [['', '___ your team ___ the project?']],
            options: ['Has / finished', 'Have / finished', 'Did / finish', 'Is / finishing'],
            answer: 'Has / finished',
            explain: 'Your team = singular → Has. Pregunta sobre si el proyecto está terminado ahora.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'For, Since y adverbios',
        tag: '2 espacios',
        intro: 'Completa con la forma de present perfect y el marcador correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Una relación de trabajo',
            lines: [['', 'I [[0]] (work) with her [[1]] we started at the company together.']],
            blanks: [
              { options: ['\'ve worked', '\'ve been working', 'worked', 'work'], answer: '\'ve worked', explain: '\'ve worked: duración hasta ahora → present perfect.' },
              { options: ['since', 'for', 'when', 'during'], answer: 'since', explain: 'Since + punto de inicio (we started = momento específico del pasado).' },
            ],
          },
          {
            scene: 'La nueva aplicación',
            lines: [['', 'Have you [[0]] (try) the new app? I [[1]] (just / download) it.']],
            blanks: [
              { options: ['tried', 'try', 'trying', 'tried out'], answer: 'tried', explain: 'Have you tried: participio de try (tried). Pregunta por experiencia.' },
              { options: ['\'ve just downloaded', '\'ve just download', 'just downloaded', 'just have downloaded'], answer: '\'ve just downloaded', explain: '\'ve just downloaded: I + have → \'ve. "Just" entre have y participio.' },
            ],
          },
          {
            scene: 'Espera en el aeropuerto',
            lines: [['', 'We [[0]] (wait) here [[1]] three hours and nobody has come to help us!']],
            blanks: [
              { options: ['\'ve been waiting', 'waited', '\'ve waited', 'wait'], answer: '\'ve been waiting', explain: '\'ve been waiting: presente perfect continuous (acción en progreso), aunque present perfect simple también es aceptable.' },
              { options: ['for', 'since', 'during', 'from'], answer: 'for', explain: 'For + período de tiempo (three hours).' },
            ],
          },
          {
            scene: 'Los deberes',
            lines: [['', 'A: [[0]] you [[0]] (finish) your homework? B: Not [[1]].']],
            blanks: [
              { options: ['Have / finished', 'Has / finished', 'Did / finish', 'Are / finishing'], answer: 'Have / finished', explain: 'Have you finished: you → have. Pregunta por resultado actual.' },
              { options: ['yet', 'already', 'just', 'ever'], answer: 'yet', explain: 'Not yet: todavía no (yet en negativas al final).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Noticias del mundo',
        tag: 'Texto guiado',
        intro: 'Elige present perfect o past simple según el contexto.',
        type: 'guidedText',
        scene: 'Elige la forma verbal correcta para este texto de noticias.',
        text: 'Scientists [[0]] (discover) a new species of bird in the Amazon rainforest. The team [[1]] (make) the discovery last Tuesday during a routine survey. They [[2]] (never / see) anything like it before. The bird [[3]] (have) bright blue feathers and an unusual song. The researchers [[4]] (already / publish) their findings online, and the scientific community [[5]] (react) with great enthusiasm. The team leader [[6]] (study) Amazonian wildlife for over 20 years and says this is the most exciting moment of her career.',
        blanks: [
          { options: ['have discovered', 'discovered', 'has discovered', 'were discovering'], answer: 'have discovered', explain: 'Have discovered: noticia reciente sin tiempo específico → present perfect.' },
          { options: ['made', 'have made', 'has made', 'were making'], answer: 'made', explain: 'Made: tiempo específico (last Tuesday) → past simple.' },
          { options: ['had never seen', 'never saw', 'have never seen', 'were never seeing'], answer: 'have never seen', explain: 'Have never seen: experiencia hasta el presente → present perfect.' },
          { options: ['has', 'had', 'have', 'having'], answer: 'has', explain: 'Has: descripción del pájaro en presente (the bird has feathers).' },
          { options: ['have already published', 'already published', 'has already published', 'were already publishing'], answer: 'have already published', explain: 'Have already published: acción reciente ya completada → present perfect con "already".' },
          { options: ['has reacted', 'reacted', 'have reacted', 'was reacting'], answer: 'has reacted', explain: 'Has reacted: the scientific community = singular → has. Reacción reciente, sin tiempo específico.' },
          { options: ['has studied', 'studied', 'have studied', 'is studying'], answer: 'has studied', explain: 'Has studied: duración continua hasta el presente → present perfect. "For over 20 years."' },
        ],
      },
      {
        id: 'level-4',
        title: 'Present Perfect vs Past Simple',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta: present perfect o past simple.',
        type: 'freeText',
        scene: 'Elige entre present perfect y past simple según las pistas de tiempo.',
        text: 'My friend Carlos is a great traveler. He [[0]] (visit) over 30 countries so far. Last year he [[1]] (go) to Vietnam and loved the food. He [[2]] (never / be) to Africa, but it\'s on his list. He [[3]] (take) his first international trip when he was 22 — he [[4]] (fly) to Spain for a language course.',
        blanks: [
          { answer: 'has visited', accepted: ['has visited'], explain: 'Has visited: "so far" indica hasta ahora → present perfect.' },
          { answer: 'went', accepted: ['went'], explain: 'Went: "last year" es tiempo específico → past simple.' },
          { answer: 'has never been', accepted: ['has never been', '\'s never been'], explain: 'Has never been: experiencia de vida sin tiempo específico → present perfect.' },
          { answer: 'took', accepted: ['took'], explain: 'Took: "when he was 22" es tiempo específico → past simple.' },
          { answer: 'flew', accepted: ['flew'], explain: 'Flew: referido al mismo viaje específico (primer viaje a los 22) → past simple.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando present perfect.',
        type: 'write',
        items: [
          {
            scene: 'Tu experiencia de vida',
            prompt: 'Menciona tres países o ciudades que has visitado usando "I have been to" o "I have never been to".',
            answer: 'I\'ve been to Mexico and Spain, but I\'ve never been to Asia.',
            accepted: ['i\'ve been to', 'i have been to', 'i\'ve never been', 'i have never been'],
            explain: 'Ejemplo: I\'ve been to Paris twice. / I\'ve never been to Australia but I\'d love to go.',
          },
          {
            scene: 'Una noticia reciente',
            prompt: 'Comparte algo que acaba de pasar en tu vida o en las noticias (usa just o already).',
            answer: 'I\'ve just finished reading a really good book.',
            accepted: ['\'ve just', 'have just', '\'ve already', 'have already', '\'s just', 'has just'],
            explain: 'Ejemplo: I\'ve just heard some exciting news. / The president has already signed the new law.',
          },
          {
            scene: 'Duración',
            prompt: 'Di cuánto tiempo llevas viviendo en tu ciudad, trabajando en tu trabajo o estudiando inglés (for o since).',
            answer: 'I\'ve studied English for three years.',
            accepted: ['i\'ve lived', 'i have lived', 'i\'ve worked', 'i have worked', 'i\'ve studied', 'i have studied', 'i\'ve been', 'i have been'],
            explain: 'Ejemplo: I\'ve lived in Bogotá since 2015. / I\'ve worked at this company for two years.',
          },
          {
            scene: 'Una pregunta de experiencia',
            prompt: 'Escribe una pregunta con "Have you ever...?" sobre una experiencia interesante.',
            answer: 'Have you ever eaten at a Michelin-starred restaurant?',
            accepted: ['have you ever', 'has he ever', 'has she ever', 'have they ever'],
            explain: 'Ejemplo: Have you ever spoken in front of a large audience? / Have you ever lived abroad?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu historial',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre experiencias y logros de tu vida usando present perfect.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Escribe algo que nunca has hecho pero que quisieras hacer (I\'ve never...).',
            answer: 'I\'ve never run a marathon, but it\'s on my bucket list.',
            accepted: ['i\'ve never', 'i have never', 'she\'s never', 'he\'s never', 'we\'ve never'],
            explain: 'Usa: I\'ve never [participio]. Ej: I\'ve never learned to surf. / I\'ve never visited Japan.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Comparte un logro reciente — algo que ya completaste (just o already).',
            answer: 'I\'ve already passed my driving test — I\'m so proud!',
            accepted: ['\'ve just', 'have just', '\'ve already', 'have already', '\'s just finished', '\'s just passed', '\'s just received'],
            explain: 'Usa: I\'ve just [logro]. Ej: I\'ve just finished an online course. / I\'ve already saved enough money for my trip.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Describe cuánto tiempo llevas haciendo algo importante en tu vida (for o since).',
            answer: 'I\'ve been learning English since I was twelve years old.',
            accepted: ['for', 'since', '\'ve been', 'i have been', 'i\'ve lived', 'i\'ve worked', 'i\'ve studied'],
            explain: 'Usa: I\'ve [verbo] for [tiempo] / since [momento]. Ej: I\'ve lived in this city for 5 years.',
          },
        ],
      },
    ],
  },
}

export default topic
