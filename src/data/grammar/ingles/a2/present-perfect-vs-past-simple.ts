import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-perfect-vs-past-simple',
  order: '13',
  color: '#dc2626',
  category: 'Verbs',
  level: 'A2',
  title: 'Present Perfect vs. Past Simple en Inglés A2',
  shortTitle: 'PP vs. Past Simple',
  metaTitle: 'Present Perfect vs Past Simple A2 — Cuándo usar cada tiempo',
  description:
    'Elegir entre el present perfect y el past simple es uno de los mayores retos para hispanohablantes. La regla clave: present perfect cuando no hay referencia de tiempo específica (o usas ever/never/already/yet); past simple cuando hay una referencia de tiempo específica (yesterday, last year, in 2020). El cuándo lo cambia todo.',
  lead: 'La distinción más desafiante del inglés A2: cuándo usar "I have done" y cuándo "I did" — con reglas claras y práctica contextual.',
  outcomes: [
    'Identifica cuándo usar present perfect vs. past simple',
    'Reconoce las señales temporales de cada tiempo',
    'Evita mezclar referencias de tiempo con present perfect',
    'Responde natural y correctamente en conversación',
  ],

  guide: {
    goal: 'Distinguir el present perfect (experiencia/relevancia presente) del past simple (momento específico terminado) y usarlos correctamente.',
    model: 'I\'ve visited Paris. (experiencia) / I visited Paris in 2019. (momento específico)',
    formula: 'PP: have/has + participle (no specific time) / Past Simple: verb-ed/irregular (specific time)',
    decisions: [
      'PRESENT PERFECT → experiencia de vida, sin tiempo específico, con ever/never/already/yet/just',
      'PAST SIMPLE → momento pasado específico, con yesterday/last week/in 2020/at 3pm/ago',
      'Señales PP: ever, never, already, yet, just, recently, so far, in my life',
      'Señales Past Simple: yesterday, last night, last year, in + año, at + hora, ... ago, when I was...',
      'Regla de conversación: present perfect abre el tema; past simple da los detalles.',
    ],
    table: [
      ['Señales de tiempo', 'Tiempo correcto', 'Ejemplo'],
      ['yesterday / last year / in 2019', 'Past Simple', 'I went to Paris last year.'],
      ['ever / never / yet / already', 'Present Perfect', 'I\'ve never been to Paris.'],
    ],
    mistakes: [
      '"I have gone there yesterday" ❌ → "I went there yesterday" ✓ — "yesterday" → past simple.',
      '"I went to Japan many times" (sin contexto) → mejor "I\'ve been to Japan many times" ✓',
      '"Did you ever...?" (formal) → más natural "Have you ever...?" ✓ en inglés moderno',
    ],
  },

  seo: [
    {
      heading: 'La distinción más importante entre present perfect y past simple',
      paragraphs: [
        'El present perfect y el past simple son dos tiempos que se superponen en español, pero en inglés tienen usos claramente distintos. La diferencia central: el past simple describe un evento en un MOMENTO ESPECÍFICO del pasado (que ya terminó). El present perfect describe una experiencia o situación con RELEVANCIA EN EL PRESENTE (sin importar cuándo exactamente).',
        'Piénsalo así: "He visitado París" en español puede referirse a una experiencia de vida (present perfect) o a un viaje específico (past simple). En inglés, hay que elegir: "I have visited Paris" (experiencia general) vs. "I visited Paris in 2019" (viaje específico).',
      ],
    },
    {
      heading: 'Palabras clave que indican cada tiempo',
      paragraphs: [
        'Past Simple: ayer (yesterday), anoche (last night), la semana pasada (last week), el año pasado (last year), en + año (in 2018), hace... (... ago), cuando era niño (when I was a child), en ese momento (at that time).',
        'Present Perfect: alguna vez (ever), nunca (never), ya (already), todavía (yet), hace un momento (just), recientemente (recently), hasta ahora (so far), en mi vida (in my life), desde... (since...), por X años (for X years).',
      ],
      table: [
        ['Señal temporal', 'Tiempo correcto', 'Ejemplo'],
        ['yesterday', 'Past Simple', 'I called you yesterday.'],
        ['last night', 'Past Simple', 'She went out last night.'],
        ['in 2020', 'Past Simple', 'They met in 2020.'],
        ['ever', 'Present Perfect', 'Have you ever tried it?'],
        ['just', 'Present Perfect', 'He\'s just called.'],
        ['yet', 'Present Perfect', 'I haven\'t eaten yet.'],
        ['recently', 'Present Perfect', 'She\'s recently started a new job.'],
        ['for 3 years', 'Present Perfect', 'I\'ve lived here for 3 years.'],
      ],
    },
    {
      heading: 'El patrón conversacional: PP abre, Past Simple da detalles',
      paragraphs: [
        'En conversación en inglés, es muy común abrir un tema con present perfect y luego usar past simple para dar los detalles concretos: "I\'ve been to Japan. (PP) → I went there in 2019 (PS) and I stayed for two weeks. (PS) It was incredible. (PS)"',
        'Esta alternancia es muy natural en inglés y te permite demostrar dominio de ambos tiempos. Practica este patrón: experiencia general (PP) → cuándo/dónde/qué pasó (PS) → evaluación (PS).',
      ],
    },
    {
      heading: 'El caso especial de "just", "recently" y "already"',
      paragraphs: [
        '"Just", "recently" y "already" se usan con present perfect en inglés británico, pero en inglés americano informal, el past simple también es aceptable: "I just ate" (American English) vs. "I\'ve just eaten" (British English). Para exámenes, usa la forma con present perfect.',
        '"Since" y "for" siempre acompañan al present perfect cuando describen la duración hasta el presente: "I\'ve lived here since 2015." / "She\'s worked here for ten years." Si se refiere a un período pasado ya terminado, usa past simple: "I lived there for five years (and then I moved)."',
      ],
    },
    {
      heading: 'Por qué este error es tan común para hispanohablantes',
      paragraphs: [
        'En español latinoamericano, el pretérito indefinido (pasado simple) domina donde los europeos usan el pretérito perfecto. "Hoy comí" (Latinoamérica) = "Hoy he comido" (España). Esta preferencia por el pasado simple en español latinoamericano refuerza el error de usar past simple en inglés cuando se necesita present perfect.',
        'La solución: en inglés, si el momento no está especificado y hablas de experiencias de vida → present perfect. Si estás narrando hechos con referencia temporal concreta → past simple.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Contraste present perfect (experiencia/sin tiempo específico) vs. past simple (momento concreto).',
    graphicPrompt: 'Línea de tiempo comparando oraciones con y sin referencia temporal específica.',
    scene: [
      ['I\'ve been to Colombia. (experience)', 'He estado en Colombia. (experiencia)'],
      ['I went to Cartagena last year. (specific)', 'Fui a Cartagena el año pasado. (específico)'],
      ['Have you ever tried ceviche?', '¿Has probado el ceviche alguna vez?'],
      ['I tried it for the first time last month.', 'Lo probé por primera vez el mes pasado.'],
      ['She\'s just called — she\'s outside.', 'Acaba de llamar — está afuera.'],
      ['She called at 3pm yesterday.', 'Llamó a las 3pm ayer.'],
      ['I\'ve worked here for two years.', 'Llevo dos años trabajando aquí.'],
      ['I worked there from 2018 to 2020.', 'Trabajé allí de 2018 a 2020.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['specific time → past simple', 'no time reference → present perfect', 'PP opens / PS gives details', 'since/for with PP'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'PP o Past Simple: ¿cuál es?',
        tag: 'Opción múltiple',
        intro: 'Elige el tiempo verbal correcto según el contexto y las señales temporales.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de viajes',
            lines: [['', 'I ___ to New York three times in my life.']],
            options: ['\'ve been', 'went', 'was', 'go'],
            answer: '\'ve been',
            explain: '"In my life" = sin tiempo específico → present perfect "I\'ve been".',
          },
          {
            scene: 'Contando una historia',
            lines: [['', 'We ___ Rome last summer and it was incredible.']],
            options: ['visited', 'have visited', '\'ve visited', 'visit'],
            answer: 'visited',
            explain: '"Last summer" = tiempo específico → past simple "visited".',
          },
          {
            scene: 'Conversación reciente',
            lines: [['', 'Good news — she ___ just passed her driving test!']],
            options: ['\'s', 'did', 'was', 'is'],
            answer: '\'s',
            explain: '"Just" → present perfect: "She\'s just passed" = ha pasado hace un momento.',
          },
          {
            scene: 'Una fecha concreta',
            lines: [['', 'My parents ___ in 1985.']],
            options: ['met', 'have met', '\'ve met', 'meet'],
            answer: 'met',
            explain: '"In 1985" = año específico → past simple "met".',
          },
          {
            scene: 'Pregunta de experiencia',
            lines: [['', '___ you ever seen the Northern Lights?']],
            options: ['Have', 'Did', 'Do', 'Were'],
            answer: 'Have',
            explain: '"Ever" → present perfect "Have you ever seen...?" — experiencia de vida.',
          },
          {
            scene: 'Hace X días/años',
            lines: [['', 'She ___ that company five years ago.']],
            options: ['left', 'has left', '\'s left', 'leave'],
            answer: 'left',
            explain: '"Five years ago" = referencia temporal específica → past simple "left".',
          },
          {
            scene: 'Relevancia presente',
            lines: [['', 'I can\'t go out — I ___ my keys.']],
            options: ['\'ve lost', 'lost', 'was losing', 'have lose'],
            answer: '\'ve lost',
            explain: 'Relevancia presente (no puedo salir AHORA) → present perfect "I\'ve lost my keys".',
          },
          {
            scene: 'Tiempo específico pasado',
            lines: [['', 'When ___ you start learning English?']],
            options: ['did', 'have', 'were', 'do'],
            answer: 'did',
            explain: '"When did you start?" — preguntas sobre momento específico → past simple.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Experiencia y detalles',
        tag: '2 espacios',
        intro: 'Completa: present perfect para la experiencia, past simple para los detalles.',
        type: 'dual',
        items: [
          {
            scene: 'Patrón conversacional',
            lines: [
              ['A:', '[[0]] you ever been to Japan?'],
              ['B:', 'Yes! I [[1]] there in 2019. It was incredible.'],
            ],
            blanks: [
              { options: ['Have', 'Did', 'Do', 'Were'], answer: 'Have', explain: '"Have you ever been?" — present perfect para preguntar por experiencia.' },
              { options: ['went', 'have gone', 'was', 'go'], answer: 'went', explain: '"In 2019" → past simple "went".' },
            ],
          },
          {
            scene: 'Historia personal',
            lines: [['', 'I [[0]] three languages — I [[1]] the third one at university.']],
            blanks: [
              { options: ['\'ve learned', 'learned', 'learn', 'was learning'], answer: '\'ve learned', explain: '"I\'ve learned three languages" — experiencia acumulada, sin tiempo específico → PP.' },
              { options: ['learned', '\'ve learned', 'learn', 'was learning'], answer: 'learned', explain: '"At university" implica un período pasado específico → past simple.' },
            ],
          },
          {
            scene: 'Hablando de trabajo',
            lines: [
              ['A:', 'How long [[0]] you worked here?'],
              ['B:', 'I [[1]] here in January 2021, so about three years.'],
            ],
            blanks: [
              { options: ['have', 'did', 'do', 'were'], answer: 'have', explain: '"How long have you worked here?" — PP para situaciones que continúan hasta ahora.' },
              { options: ['started', 'have started', 'start', 'was starting'], answer: 'started', explain: '"In January 2021" → past simple para el momento específico de inicio.' },
            ],
          },
          {
            scene: 'Noticia reciente',
            lines: [['', 'They [[0]] just [[0]] that the government [[1]] a new environmental law last week.']],
            blanks: [
              { options: ['\'ve announced', 'announced', 'announce', 'announcing'], answer: '\'ve announced', explain: '"Just" → present perfect "They\'ve just announced".' },
              { options: ['passed', 'have passed', 'pass', 'passing'], answer: 'passed', explain: '"Last week" → past simple "passed".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Entrevista de trabajo',
        tag: 'Texto guiado',
        intro: 'Elige entre present perfect y past simple para completar esta entrevista.',
        type: 'guidedText',
        scene: 'Elige entre present perfect y past simple para completar esta entrevista.',
        text: '"Tell me about yourself." — "I [[0]] as a marketing professional for six years. I [[1]] my career in a small startup in 2018. Since then, I [[2]] with companies of different sizes. I [[3]] a major campaign for a tech company last year that [[4]] a 40% increase in sales. I [[5]] also recently [[5]] a digital marketing certification. I\'m passionate about data-driven strategies and I [[6]] always excited by new challenges."',
        blanks: [
          { options: ['\'ve worked', 'worked', 'work', 'was working'], answer: '\'ve worked', explain: '"For six years" + situación que continúa hasta ahora → present perfect.' },
          { options: ['started', '\'ve started', 'start', 'was starting'], answer: 'started', explain: '"In 2018" = momento específico → past simple.' },
          { options: ['\'ve worked', 'worked', 'work', 'was working'], answer: '\'ve worked', explain: '"Since then" + experiencias acumuladas hasta ahora → present perfect.' },
          { options: ['led', '\'ve led', 'lead', 'was leading'], answer: 'led', explain: '"Last year" = tiempo específico → past simple.' },
          { options: ['resulted in', 'has resulted in', 'result in', 'results in'], answer: 'resulted in', explain: 'Consecuencia de la campaña pasada → past simple.' },
          { options: ['completed', '\'ve completed', 'complete', 'completing'], answer: 'completed', explain: '"Recently" → present perfect "I\'ve recently completed".' },
          { options: ['\'ve been', 'was', 'am', 'be'], answer: '\'ve been', explain: '"Always excited" en mi vida → present perfect "I\'ve always been".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el tiempo correcto',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta (present perfect o past simple) del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe la forma correcta (present perfect o past simple) del verbo entre paréntesis.',
        text: 'I [[0]] (live) in this city for five years. I [[1]] (move) here from Medellín in 2019 when I [[2]] (get) a new job. Since I arrived, I [[3]] (meet) amazing people and [[4]] (discover) wonderful neighborhoods. Last month, I [[5]] (visit) a gallery that (open) just opened — it was spectacular.',
        blanks: [
          { answer: "I've lived", accepted: ["i've lived", 'i have lived'], explain: '"For five years" + sigo viviendo aquí → present perfect.' },
          { answer: 'moved', accepted: ['moved'], explain: '"In 2019" → past simple.' },
          { answer: 'got', accepted: ['got'], explain: '"When I arrived" = momento específico pasado → past simple.' },
          { answer: "I've met", accepted: ["i've met", 'i have met'], explain: '"Since I arrived" → present perfect para experiencias acumuladas.' },
          { answer: 'visited', accepted: ['visited'], explain: '"Last month" → past simple.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción: El patrón completo',
        tag: 'Producción',
        intro: 'Practica el patrón: PP para la experiencia, Past Simple para los detalles.',
        type: 'write',
        items: [
          {
            scene: 'Hablar de viajes',
            prompt: 'Escribe una oración en present perfect sobre un viaje que has hecho, y luego una en past simple con un detalle (cuándo, qué viste).',
            answer: 'I\'ve been to Colombia. I visited Cartagena in 2022 and it was breathtaking.',
            accepted: ["i've been", "i've visited", 'i have been', 'i have visited'],
            explain: 'PP: "I\'ve been to..." → PS: "I went there in... / I visited... last year."',
          },
          {
            scene: 'Hablar de trabajo o estudio',
            prompt: 'Escribe en present perfect cuánto tiempo llevas haciendo algo, y en past simple cuándo empezaste.',
            answer: 'I\'ve studied English for four years. I started in 2020 during the pandemic.',
            accepted: ["i've studied", "i've worked", "i've learned", "i've been"],
            explain: 'PP con "for" para duración hasta ahora → PS para el momento de inicio.',
          },
          {
            scene: 'Habilidades y logros',
            prompt: 'Escribe algo que has logrado (PP) y cuándo lo lograste (PS).',
            answer: 'I\'ve run a half marathon. I ran my first one in 2021 and finished in 2:15.',
            accepted: ["i've run", "i've won", "i've completed", "i've finished", "i've achieved", "i've passed"],
            explain: 'PP para el logro → PS con cuándo para los detalles.',
          },
          {
            scene: 'Comparar los dos tiempos',
            prompt: 'Escribe una oración sobre la misma experiencia en AMBOS tiempos — explica la diferencia de significado.',
            answer: 'I\'ve visited that museum (experience, don\'t remember when). I visited it in 2021 (specific trip, I remember).',
            accepted: ["i've", "i have", 'i visited', 'i went', 'i saw', 'i tried', 'i ate'],
            explain: 'PP = sin referencia temporal, es la experiencia lo que importa. PS = con referencia temporal, importa el momento.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu autobiografía de 3 minutos',
        tag: 'Producción libre',
        intro: 'Escribe una mini autobiografía usando AMBOS tiempos: present perfect para experiencias generales y past simple para momentos específicos.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Escribe 1-2 oraciones sobre dónde has vivido o estudiado (PP para la experiencia general, PS para detalles).',
            answer: 'I\'ve lived in three cities. I was born in Cali, studied in Bogotá, and moved to Madrid in 2021.',
            accepted: ["i've lived", "i've studied", "i've worked", "i've been"],
            explain: 'PP para el total de experiencias → PS para los momentos concretos.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Escribe sobre un logro que te enorgullece (PP para lo que has logrado, PS para cuándo/cómo).',
            answer: 'I\'ve learned to play the guitar. I took my first lesson when I was 18 and practiced every day for two years.',
            accepted: ["i've learned", "i've achieved", "i've passed", "i've completed", "i've built"],
            explain: 'PP para el logro → PS con cuando/cómo lo conseguiste.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Escribe algo que no has hecho todavía pero que quieres hacer (PP negativo), y un plan concreto en futuro o pasado simple.',
            answer: 'I haven\'t visited Asia yet. I was planning to go last year but the trip was cancelled. I\'ll go this summer.',
            accepted: ["haven't", "have not", "hasn't", "hasn't visited", "haven't been"],
            explain: 'PP negativo con "yet" para lo que falta → PS para el contexto → futuro con will para el plan.',
          },
        ],
      },
    ],
  },
}

export default topic
