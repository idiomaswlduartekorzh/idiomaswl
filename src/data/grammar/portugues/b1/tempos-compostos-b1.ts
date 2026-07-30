import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'tempos-compostos-b1',
  order: '09',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Tempos Compostos en Portugués B1',
  shortTitle: 'Tempos Compostos',
  metaTitle: 'Tempos Compostos Portugués B1 — Pretérito Perfeito Composto',
  description:
    'Los tiempos compostos en portugués se forman con el verbo auxiliar "ter" o "haver" más el participio pasado. El pretérito perfeito composto expresa una acción que comenzó en el pasado y continúa hasta el presente. Es fundamental para expresar experiencias recientes y duraciones que conectan pasado y presente.',
  lead: 'Domina los tiempos compostos: pretérito perfeito composto, mais-que-perfeito composto, y futuro composto con ter/haver.',
  outcomes: [
    'Forma correctamente el pretérito perfeito composto (tenho + participio)',
    'Usa tiempos compostos para expresar acciones que conectan pasado y presente',
    'Distingue entre pretérito perfeito simple y composto',
    'Aplica tiempos compostos en contextos de experiencias recientes',
  ],

  guide: {
    goal: 'Construir tiempos compuestos con ter/haver + participio para expresar acciones recientes o durativas.',
    model: 'Tenho estudado português há meses. / Tinha comido quando você chegou. / Terei terminado até amanhã.',
    formula: 'Ter/Haver (conjugado) + participio pasado | Conecta pasado y presente',
    decisions: [
      'Pretérito perfeito composto: tenho + participio → ação que comenzó en el pasado y continúa',
      'Imperfeito composto: tinha + participio → ación durativa interrumpida por otra acción',
      'Mais-que-perfeito composto: tivera + participio (menos usado, más literario)',
      'Futuro composto: terei + participio → ación que será completada antes de otro momento',
      'Con "há" + tiempo: expresa una duración hasta ahora: "Tenho vivido aqui há 5 anos"',
      'Diferencia: pretérito perfetto simple (ação puntual) vs composto (ación durativa/reciente)',
    ],
    table: [
      ['Tiempo compuesto', 'Estructura', 'Ejemplo'],
      ['Pretérito perfeito composto', 'Tenho + participio', 'Tenho estudado bastante.'],
      ['Imperfeito composto', 'Tinha + participio', 'Tinha comido quando ele chegou.'],
      ['Futuro composto', 'Terei + participio', 'Terei terminado até sexta.'],
      ['Mais-que-perfeito composto', 'Tivera + participio', 'Tivera partido quando chegastes.'],
    ],
    mistakes: [
      '"Comi uma maçã" (correto: ação puntual no passado) vs "Tenho comido maçã todo dia" (ação que se repete até agora) — tempos diferentes para contextos diferentes.',
      '"Tenho morado em São Paulo há 5 anos" ✓ → duração hasta ahora. "Morei em São Paulo durante 5 anos" ✓ → ação completa no passado.',
      '"Tinha partido quando você chegou" ✓ (imperfeito composto: ação anterior a outra no passado) vs "Partiu quando você chegou" ✓ (ambas simultâneas/punctuales).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los tiempos compostos en portugués?',
      paragraphs: [
        'Los tiempos compostos (tempos compostos) en portugués se forman con un verbo auxiliar "ter" (o "haver" en contextos más formales) conjugado en diferentes tiempos, seguido del participio pasado del verbo principal. Esta estructura permite expresar acciones con diferentes matices temporales.',
        'El tiempo compuesto más importante y usado es el pretérito perfeito composto, que expresa una acción que comenzó en el pasado y continúa siendo relevante en el presente. Es similar al presente perfecto inglés (have studied).',
      ],
    },
    {
      heading: '¿Cómo se forma el pretérito perfeito composto en portugués?',
      paragraphs: [
        'El pretérito perfeito composto se forma con "tenho" (presente de ter) + participio pasado: "Tenho estudado", "Tenho trabalhado", "Tenho comido". Se usa para expresar una acción que comenzó en el pasado y continúa hasta el presente o que se ha repetido varias veces recientemente.',
        'Ejemplos: "Tenho procurado emprego há três meses" (he estado buscando trabajo durante tres meses y sigo buscando). "Tenho visitado meu avó frequentemente" (he visitado a mi abuelo con frecuencia recientemente).',
      ],
      table: [
        ['Sujeto', 'Ter (presente)', 'Participio', 'Ejemplo'],
        ['Eu', 'tenho', 'estudado', 'Tenho estudado muito.'],
        ['Tu', 'tens', 'comido', 'Tens comido bem?'],
        ['Ele/Ela', 'tem', 'dormido', 'Tem dormido pouco.'],
        ['Nós', 'temos', 'vivido', 'Temos vivido aqui há anos.'],
      ],
    },
    {
      heading: 'Imperfeito composto: tinha + participio',
      paragraphs: [
        'El imperfeito composto se forma con "tinha" (imperfeito de ter) + participio pasado. Se usa para expresar una acción que estaba durando en el pasado cuando fue interrumpida por otra acción puntual.',
        'Ejemplo: "Eu tinha comido quando você chegou" (yo había comido cuando tú llegaste). "Eles tinham trabalhado o dia todo quando o chefe os chamou" (ellos habían trabajado todo el día cuando el jefe los llamó).',
      ],
    },
    {
      heading: 'Futuro composto: terei + participio',
      paragraphs: [
        'El futuro composto (futuro anterior) se forma con "terei" (futuro de ter) + participio pasado. Se usa para expresar una acción que será completada antes de otro momento futuro especificado.',
        'Ejemplo: "Terei terminado o trabalho até sexta-feira" (habré terminado el trabajo para el viernes). "Teremos chegado em casa antes das 8" (habremos llegado a casa antes de las 8).',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre pretérito perfeito simple y composto?',
      paragraphs: [
        'El pretérito perfeito simple (comei, bebi, partí) expresa una acción puntual completada en el pasado: "Comi uma maçã ontem" (comí una manzana ayer = acción puntual, terminada).',
        'El pretérito perfeito composto (tenho comido, tenho bebido, tenho partido) expresa una acción que se repite o que conecta el pasado con el presente: "Tenho comido maçã todo dia" (he comido manzana todos los días = hábito que continúa). Esta es una distinción crucial que confunde a muchos estudiantes.',
      ],
    },
    {
      heading: 'Tiempos compostos con duraciones: "há" + tiempo',
      paragraphs: [
        'Para expresar cuánto tiempo ha durado una acción hasta ahora, se usa "há" + cantidad de tiempo: "Tenho vivido em Salvador há cinco anos" (he vivido en Salvador durante cinco años = y sigo viviendo).',
        'Comparación: "Morei em Salvador durante cinco anos" (pretérito simple = acción terminada, ya no vivo allí) vs "Tenho vivido em Salvador há cinco anos" (compuesto = acción que continúa).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Tiempos compuestos: ter/haver + participio para conectar pasado y presente o para duraciones.',
    graphicPrompt: 'Línea de tiempo: pasado (acción comenzó) → presente (sigue siendo relevante, o acción completada antes de otro punto).',
    scene: [
      ['Tenho estudado português há meses.', 'He estudiado portugués durante meses.'],
      ['Tinha comido quando você chegou.', 'Había comido cuando llegaste.'],
      ['Terei terminado antes de amanhã.', 'Habré terminado antes de mañana.'],
      ['Tenho visitado aquele lugar frequentemente.', 'He visitado ese lugar frecuentemente.'],
      ['Tinha trabalhado o dia todo.', 'Había trabajado todo el día.'],
      ['Teremos chegado antes das 8.', 'Habremos llegado antes de las 8.'],
      ['Tenho procurado emprego há tempos.', 'He estado buscando empleo durante tiempo.'],
      ['Tinha vivido em três cidades.', 'Había vivido en tres ciudades.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['ter/haver + participio', 'simple vs composto', 'duraciones con há'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha o tempo correto',
        tag: 'Múltipla escolha',
        intro: 'Escolha entre pretérito perfeito simples e composto.',
        type: 'choice',
        items: [
          {
            scene: 'Ação puntual vs durativa',
            lines: [['', "Ontem eu ___ uma maçã no café da manhã."]],
            options: ['tenho comido', 'comi', 'comia', 'comerei'],
            answer: 'comi',
            explain: '"Ontem" (ayer) = ação puntual e completa → pretérito perfeito simples.',
          },
          {
            scene: 'Ação reciente até agora',
            lines: [['', "Eu ___ português há vários anos."]],
            options: ['estudei', 'tenho estudado', 'estudava', 'estudaria'],
            answer: 'tenho estudado',
            explain: '"Há vários anos" = duração até agora que continua → pretérito perfeito composto.',
          },
          {
            scene: 'Ação repetida recentemente',
            lines: [['', "Eu ___ aquele restaurante muitas vezes este mês."]],
            options: ['visitei', 'tenho visitado', 'visitava', 'visitaria'],
            answer: 'tenho visitado',
            explain: 'Ações repetidas recentemente → pretérito perfeito composto.',
          },
          {
            scene: 'Imperfeito composto',
            lines: [['', "Eu ___ quando você chegou."]],
            options: ['comi', 'tenho comido', 'tinha comido', 'comeria'],
            answer: 'tinha comido',
            explain: 'Ação durativa interrumpida por outra → imperfeito composto.',
          },
          {
            scene: 'Futuro composto',
            lines: [['', "Nós ___ antes do pôr-do-sol."]],
            options: ['chegamos', 'temos chegado', 'teremos chegado', 'chegaríamos'],
            answer: 'teremos chegado',
            explain: 'Ação completa antes de outro momento futuro → futuro composto.',
          },
          {
            scene: 'Pretérito puntual',
            lines: [['', "Ele ___ a carta ontem à tarde."]],
            options: ['tem enviado', 'tinha enviado', 'enviou', 'enviaria'],
            answer: 'enviou',
            explain: '"Ontem à tarde" = momento específico no passado → pretérito perfeito simples.',
          },
          {
            scene: 'Experiência acumulada',
            lines: [['', "Você nunca ___ um filme daquele diretor?"]],
            options: ['viu', 'tem visto', 'tinha visto', 'verá'],
            answer: 'tem visto',
            explain: 'Experiência acumulada na vida → pretérito perfeito composto.',
          },
          {
            scene: 'Ação anterior a outra no passado',
            lines: [['', "Ele já ___ quando ela entrou na sala."]],
            options: ['sai', 'tem saído', 'tinha saído', 'sairia'],
            answer: 'tinha saído',
            explain: 'Uma ação no passado anterior a outra → imperfeito composto.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dois tempos em contexto',
        tag: '2 espaços',
        intro: 'Complete com pretérito perfeito simples ou composto.',
        type: 'dual',
        items: [
          {
            scene: 'Contraste: ayer vs hasta ahora',
            lines: [['', "Ontem eu [[0]] com amigos, e este mês eu [[1]] saído com eles muitas vezes."]],
            blanks: [
              { options: ['comi', 'tenho comido', 'tinha comido'], answer: 'comi', explain: '"Ontem" = ação puntual → simples.' },
              { options: ['sai', 'tenho saído', 'tinha saído'], answer: 'tenho saído', explain: '"Este mês" = duração até agora → composto.' },
            ],
          },
          {
            scene: 'Ação durativa interrumpida',
            lines: [['', "Ele [[0]] na empresa há 10 anos quando [[1]] demitido."]],
            blanks: [
              { options: ['trabalha', 'trabalhou', 'tem trabalhado'], answer: 'tem trabalhado', explain: '"Há 10 anos" até agora → composto.' },
              { options: ['foi', 'tem sido', 'tinha sido'], answer: 'foi', explain: 'Evento puntual (foi demitido) → simples.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa com tempos compostos',
        tag: 'Texto guiado',
        intro: 'Complete com tempos simples e compostos adequados.',
        type: 'guidedText',
        scene: 'Uma conversa sobre experiências e atividades recentes.',
        text: "Eu [[0]] (trabalhar) nesta empresa há três anos agora. [[1]] (fazer) muitos amigos aqui. Ontem [[2]] (ir) a uma reunião importante. Eu [[3]] (estudar) para essa reunião durante semanas. Meu colega me [[4]] (ajudar) a preparar. Quando eu [[5]] (chegar) na reunião, a discussão já [[6]] (começar).",
        blanks: [
          { options: ['trabalho', 'tenho trabalhado', 'trabalhei'], answer: 'tenho trabalhado', explain: '"Há três anos até agora" → composto.' },
          { options: ['fiz', 'tenho feito', 'tinha feito'], answer: 'tenho feito', explain: 'Ações acumuladas até agora → composto.' },
          { options: ['fui', 'tenho ido', 'tinha ido'], answer: 'fui', explain: '"Ontem" = ação puntual específica → simples.' },
          { options: ['estudei', 'tenho estudado', 'tinha estudado'], answer: 'tenho estudado', explain: '"Durante semanas" até agora → composto.' },
          { options: ['ajudou', 'tem ajudado', 'tinha ajudado'], answer: 'ajudou', explain: 'Ação puntual no passado → simples.' },
          { options: ['cheguei', 'tenho chegado', 'tinha chegado'], answer: 'cheguei', explain: '"Quando cheguei" = momento específico → simples.' },
          { options: ['começou', 'tem começado', 'tinha começado'], answer: 'tinha começado', explain: 'Ação anterior a minha chegada → imperfeito composto.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjugação livre',
        tag: 'Texto livre',
        intro: 'Complete os verbos em tempos compostos.',
        type: 'freeText',
        scene: 'Descrição de atividades e durações.',
        text: "Eu [[0]] (morar) em várias cidades. Atualmente [[1]] (viver) aqui há cinco anos. [[2]] (trabalhar) nesta profissão durante dez anos. Quando [[3]] (chegar) aqui, já [[4]] (adquirir) muita experiência.",
        blanks: [
          { answer: 'tenho morado', accepted: ['tenho morado', 'morei'], explain: 'Experiência acumulada → pretérito perfeito composto.' },
          { answer: 'vivo', accepted: ['vivo'], explain: 'Presente de duração: vivo aqui.' },
          { answer: 'tenho trabalhado', accepted: ['tenho trabalhado'], explain: 'Duração hasta agora → composto.' },
          { answer: 'cheguei', accepted: ['cheguei'], explain: '"Quando cheguei" = momento específico → simples.' },
          { answer: 'tinha adquirido', accepted: ['tinha adquirido'], explain: 'Ação anterior a outra no passado → imperfeito composto.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe frases con tiempos compostos.',
        type: 'write',
        items: [
          {
            scene: 'Duración hasta ahora',
            prompt: "Escribe una frase sobre algo que has estado haciendo durante un tiempo (tenho + participio + há).",
            answer: "Tenho estudado português há seis meses.",
            accepted: ['tenho', 'tem', 'participio', 'há', 'duração'],
            explain: 'Use pretérito perfeito composto para duraciones hasta ahora.',
          },
          {
            scene: 'Ación anterior a otra',
            prompt: "Escribe una frase: 'Cuando llegué, ya había...' (tinha + participio).",
            answer: "Quando cheguei, o filme tinha começado.",
            accepted: ['tinha', 'participio', 'quando', 'imperfeito', 'composto'],
            explain: 'Use imperfeito composto para ación anterior a otra en el pasado.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de contextos',
        tag: 'Análise',
        intro: 'Explica por qué cada verbo usa simple o composto.',
        type: 'write',
        items: [
          {
            scene: 'Simple vs Composto',
            prompt: "Compara: 'Visitei o museu ontem' vs 'Tenho visitado o museu frequentemente'. ¿Por qué cambia el tiempo?",
            answer: "'Visitei' = ación puntual y completa ayer (simples). 'Tenho visitado' = aciones repetidas que continúan siendo relevantes (compuesto).",
            accepted: ['puntual', 'simples', 'repetida', 'duración', 'composto'],
            explain: 'El contexto (momento específico vs duración/repetición) determina el tiempo verbal.',
          },
        ],
      },
    ],
  },
}

export default topic
