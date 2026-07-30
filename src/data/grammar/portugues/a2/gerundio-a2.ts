import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'gerundio-a2',
  order: '17',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Gerúndio en portugués A2: estou comendo, fico estudando',
  shortTitle: 'Gerúndio',
  metaTitle: 'Gerundio en portugués brasileño A2 — estar + gerúndio, ficar + gerúndio',
  description:
    'El gerúndio en portugués brasileño (-ando, -endo, -indo) es la forma más usada para expresar acciones en progreso. A diferencia del portugués europeo (que usa infinitivo), el portugués de Brasil dice "estou comendo" (no "estou a comer"). También se usa con "ficar" para acciones repetidas y con "ir" para narrar.',
  lead: 'Estou comendo: el gerúndio brasileño que expresa lo que está pasando ahora mismo.',
  outcomes: [
    'Formar el gerúndio: -ar → -ando, -er → -endo, -ir → -indo',
    'Usar estar + gerúndio para acciones en progreso',
    'Usar ficar + gerúndio para acciones repetidas o continuas',
    'Distinguir el uso brasileño (gerúndio) del europeo (a + infinitivo)',
  ],

  guide: {
    goal: 'Usar el gerúndio para expresar acciones en progreso y acciones habituales con estar y ficar.',
    model: 'Estou estudando português. / Ela fica trabalhando até tarde. / Fui lendo o livro.',
    formula: '-ar → -ando | -er → -endo | -ir → -indo',
    decisions: [
      'Estar + gerúndio = acción en progreso ahora: "Estou comendo" (estoy comiendo)',
      'Ficar + gerúndio = acción repetida o prolongada: "Fico pensando nisso" (sigo pensando en eso)',
      'Ir + gerúndio = acción gradual o narrativa: "Fui entendendo aos poucos" (fui entendiendo poco a poco)',
      'Continuar + gerúndio = continuar haciendo: "Continue tentando!" (¡sigue intentándolo!)',
      'Diferencia Brasil/Portugal: Brasil usa gerúndio; Portugal usa "a + infinitivo": "estou a comer"',
    ],
    table: [
      ['Verbo', 'Gerúndio', 'Ejemplo'],
      ['falar (-ar)', 'falando', 'Estou falando ao telefone.'],
      ['comer (-er)', 'comendo', 'Estão comendo agora.'],
      ['dormir (-ir)', 'dormindo', 'O bebê está dormindo.'],
    ],
    mistakes: [
      '"Estou a comer" ❌ (europeo) → "Estou comendo" ✓ (brasileño) — En Brasil siempre se usa el gerúndio.',
      '"Estou fazendo" ✓ — "fazer" es regular en gerúndio: fazendo (no hay irregulares en gerúndio).',
      '"Fico de estudo" ❌ → "Fico estudando" ✓ — con "ficar" siempre se usa gerúndio, no la preposición "de" + sustantivo.',
    ],
  },

  seo: [
    {
      heading: 'El gerúndio en el portugués de Brasil',
      paragraphs: [
        'Una de las características más distintivas del portugués brasileño es el uso del gerúndio (-ando/-endo/-indo) para expresar acciones en progreso. Mientras el portugués europeo dice "estou a comer", en Brasil se dice "estou comendo". Esta diferencia es inmediatamente reconocible para los hablantes nativos.',
        'La formación es completamente regular: todos los verbos en -ar forman el gerúndio en -ando (falar → falando, trabalhar → trabalhando), los verbos en -er en -endo (comer → comendo, fazer → fazendo), y los verbos en -ir en -indo (partir → partindo, dormir → dormindo).',
      ],
    },
    {
      heading: 'Ficar + gerúndio: un patrón muy brasileño',
      paragraphs: [
        'El patrón "ficar + gerúndio" es típicamente brasileño y expresa que alguien continúa haciendo algo o lo hace repetidamente: "Ela fica rindo" (ella sigue riendo/siempre está riendo). También expresa una acción que se prolonga más de lo esperado: "Você fica trabalhando demais" (trabajas demasiado / siempre estás trabajando).',
        '"Continue" + gerúndio = sigue haciendo: "Continue tentando" (sigue intentándolo). "Ir" + gerúndio = acción gradual: "Fui entendendo o português com o tempo" (fui entendiendo el portugués con el tiempo).',
      ],
    },
    {
      heading: '¿Cómo se forma el gerúndio en portugués?',
      paragraphs: [
        'Se cambia la terminación del infinitivo por -ndo, según la conjugación: -ar → -ando, -er → -endo, -ir → -indo. No hay ningún irregular, ni siquiera fazer (fazendo) o ir (indo). Esta tabla muestra los tres grupos y varios auxiliares con los que se combina:',
      ],
      table: [
        ['Auxiliar', 'Sentido', 'Ejemplo'],
        ['estar + ger.', 'acción en progreso', 'Estou comendo.'],
        ['ficar + ger.', 'acción repetida/prolongada', 'Fico pensando nisso.'],
        ['ir + ger.', 'acción gradual', 'Fui aprendendo aos poucos.'],
        ['continuar + ger.', 'seguir haciendo', 'Continue tentando!'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "estou comendo" y "estou a comer"?',
      paragraphs: [
        'Significan lo mismo (estoy comiendo), pero pertenecen a dos variantes: "estou comendo" (estar + gerúndio) es la forma brasileña, y "estou a comer" (estar a + infinitivo) es la europea. Aquí enseñamos la brasileña, que además es la más intuitiva para el hispanohablante porque calca el "estoy comiendo" del español. Basta cambiar el auxiliar estar y añadir el gerúndio en -ndo. No mezcles las dos ("estou a comendo" es incorrecto).',
      ],
    },
    {
      heading: '¿Qué significa "ficar" + gerúndio en portugués?',
      paragraphs: [
        'Expresa una acción que se repite o se prolonga más de lo normal, con matiz de insistencia: "Ele fica reclamando" (no para de quejarse), "Fico pensando nisso" (sigo pensando en eso), "Você fica chegando atrasado" (siempre llegas tarde). Es un patrón muy brasileño, sin equivalente exacto de una sola palabra en español, que se traduce por "seguir/no parar de/siempre estar + gerundio". Se diferencia de estar + gerúndio en que este describe el momento presente, mientras ficar + gerúndio describe un hábito o una duración prolongada.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Gerúndio: -ando/-endo/-indo con estar, ficar y continuar.',
    graphicPrompt: 'Personas realizando acciones en progreso con burbujas mostrando "estou + gerúndio".',
    scene: [
      ['Estou estudando português agora.', 'Estoy estudiando portugués ahora.'],
      ['Ela está dormindo — não acorde!', 'Ella está durmiendo — ¡no la despiertes!'],
      ['Fico pensando em você.', 'Sigo pensando en ti.'],
      ['Continue tentando, você vai conseguir!', '¡Sigue intentándolo, lo lograrás!'],
      ['Estamos trabalhando no projeto.', 'Estamos trabajando en el proyecto.'],
      ['Fui aprendendo aos poucos.', 'Fui aprendiendo poco a poco.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['-ando/-endo/-indo', 'estar + gerúndio', 'ficar + gerúndio'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Forma el gerúndio',
        tag: 'Opción múltiple',
        intro: 'Selecciona el gerúndio correcto para cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'El gerúndio del verbo "trabalhar".',
            lines: [['', 'Trabalhar → ___']],
            options: ['trabalhando', 'trabalhendo', 'trabalhindo', 'trabalhaindo'],
            answer: 'trabalhando',
            explain: '"trabalhar" es -ar → gerúndio -ando: trabalhando.',
          },
          {
            scene: 'El gerúndio del verbo "beber".',
            lines: [['', 'Beber → ___']],
            options: ['bebendo', 'bebando', 'bebindo', 'bebeindo'],
            answer: 'bebendo',
            explain: '"beber" es -er → gerúndio -endo: bebendo.',
          },
          {
            scene: 'El gerúndio del verbo "abrir".',
            lines: [['', 'Abrir → ___']],
            options: ['abrindo', 'abraindo', 'abrendo', 'abrando'],
            answer: 'abrindo',
            explain: '"abrir" es -ir → gerúndio -indo: abrindo.',
          },
          {
            scene: 'Acción en progreso ahora mismo.',
            lines: [['', 'Ela ___ (comer) agora.']],
            options: ['está comendo', 'está a comer', 'come', 'comeu'],
            answer: 'está comendo',
            explain: 'Portugués brasileño: estar + gerúndio para la progresiva.',
          },
          {
            scene: 'Acción continua con "ficar".',
            lines: [['', 'Ele ___ reclamando todo dia.']],
            options: ['fica', 'está', 'vai', 'continua'],
            answer: 'fica',
            explain: '"ficar + gerúndio" = acción repetida o continua.',
          },
          {
            scene: 'El gerúndio del verbo "fazer".',
            lines: [['', 'Fazer → ___']],
            options: ['fazendo', 'fazando', 'facendo', 'fezendo'],
            answer: 'fazendo',
            explain: '"fazer" es -er → gerúndio regular: fazendo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Estar/ficar y gerúndio',
        tag: '2 espacios',
        intro: 'Elige el verbo auxiliar y el gerúndio correcto.',
        type: 'dual',
        items: [
          {
            scene: 'Alguien trabajando en este momento.',
            lines: [['', 'Ela [[0]] [[1]] no computador agora.']],
            blanks: [
              { options: ['está', 'fica', 'vai', 'continua'], answer: 'está', explain: '"está" = estar conjugado en presente → acción en progreso ahora.' },
              { options: ['trabalhando', 'trabalhar', 'trabalhada', 'trabalhado'], answer: 'trabalhando', explain: '"trabalhar" → gerúndio: trabalhando.' },
            ],
          },
          {
            scene: 'Alguien que siempre llega tarde.',
            lines: [['', 'Você [[0]] [[1]] atrasado!']],
            blanks: [
              { options: ['fica', 'está', 'foi', 'vem'], answer: 'fica', explain: '"ficar" = acción repetida o hábito.' },
              { options: ['chegando', 'chegar', 'chegado', 'chegas'], answer: 'chegando', explain: '"chegar" → gerúndio: chegando.' },
            ],
          },
          {
            scene: 'Los niños durmiendo ahora.',
            lines: [['', 'As crianças [[0]] [[1]] — não faça barulho!']],
            blanks: [
              { options: ['estão', 'ficam', 'são', 'vão'], answer: 'estão', explain: '"estão" = estar en plural → acción en progreso (plural).' },
              { options: ['dormindo', 'dormir', 'dormido', 'dormida'], answer: 'dormindo', explain: '"dormir" → gerúndio: dormindo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación en progreso',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo usando el gerúndio en el tiempo correcto.',
        type: 'guidedText',
        scene: 'Carlos chama Pedro pelo celular.',
        text: 'Carlos: Oi Pedro, o que você [[0]]? Pedro: Estou [[1]] o jantar. E você? Carlos: [[2]] televisão. Fico [[3]] série todo dia. Pedro: E a Ana, o que ela [[4]]? Carlos: Ela [[5]] — vai ligar depois.',
        blanks: [
          { options: ['está fazendo', 'faz', 'fazia', 'vai fazer'], answer: 'está fazendo', explain: '"o que você está fazendo?" = ¿qué estás haciendo?' },
          { options: ['fazendo', 'fazer', 'fez', 'fazo'], answer: 'fazendo', explain: '"estou fazendo" → "fazer" → gerúndio: fazendo.' },
          { options: ['Estou assistindo', 'Assisto', 'Assistia', 'Vou assistir'], answer: 'Estou assistindo', explain: '"Estou assistindo" = estoy viendo (ahora).' },
          { options: ['assistindo', 'assistir', 'assistido', 'assisto'], answer: 'assistindo', explain: '"fico assistindo" = acción continua/habitual.' },
          { options: ['está estudando', 'estuda', 'estudava', 'vai estudar'], answer: 'está estudando', explain: '"ela está estudando" = ella está estudiando (ahora).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el gerúndio',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta de estar/ficar + gerúndio.',
        type: 'freeText',
        scene: 'Descrevendo ações em progresso ou contínuas.',
        text: 'O professor [[0]] (explicar) a lição agora. / Ela [[1]] (ficar + reclamar) toda semana. / Nós [[2]] (trabalhar) muito hoje. / Você [[3]] (entender) o que eu digo? / Eles [[4]] (aprender) rápido.',
        blanks: [
          { answer: 'está explicando', explain: '"estar" + gerúndio: está explicando.' },
          { answer: 'fica reclamando', explain: '"ficar" + gerúndio: fica reclamando.' },
          { answer: 'estamos trabalhando', explain: '"estar" (nós) + gerúndio: estamos trabalhando.' },
          { answer: 'está entendendo', explain: '"estar" + gerúndio: está entendendo.' },
          { answer: 'estão aprendendo', explain: '"estar" (eles) + gerúndio: estão aprendendo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Describe lo que está pasando',
        tag: 'Escritura guiada',
        intro: 'Escribe una oración en progreso usando el gerúndio.',
        type: 'write',
        items: [
          {
            scene: 'Tu amigo está leyendo un libro ahora.',
            prompt: 'O meu amigo... (estar + ler + agora)',
            answer: 'O meu amigo está lendo um livro agora.',
            accepted: ['Meu amigo está lendo agora.'],
            explain: '"ler" → gerúndio: lendo. "está lendo" = está leyendo.',
          },
          {
            scene: 'Siempre estás pensando en el trabajo.',
            prompt: 'Você... (ficar + pensar + no trabalho)',
            answer: 'Você fica pensando no trabalho.',
            accepted: ['Você fica pensando no trabalho o tempo todo.'],
            explain: '"ficar + gerúndio" = acción repetida o continua.',
          },
          {
            scene: 'Estamos aprendiendo portugués poco a poco.',
            prompt: 'Nós... (ir + aprender + aos poucos)',
            answer: 'Vamos aprendendo o português aos poucos.',
            accepted: ['Fomos aprendendo o português aos poucos.'],
            explain: '"ir + gerúndio" = acción gradual que progresa con el tiempo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu día ahora mismo',
        tag: 'Escritura libre',
        intro: 'Escribe sobre lo que estás haciendo ahora o lo que sueles hacer.',
        type: 'write',
        items: [
          {
            scene: 'Describe qué estás haciendo en este momento con 3 frases.',
            prompt: 'O que você está fazendo agora? Escreva três frases com "estou + gerúndio".',
            answer: 'Estou estudando português. Estou ouvindo música. Estou bebendo água.',
            accepted: ['Estou aprendendo novo vocabulário. Estou fazendo exercícios.'],
            explain: '"Estou + gerúndio" = acción en progreso en este momento.',
          },
          {
            scene: 'Describe algo que siempre estás haciendo (hábito continuo).',
            prompt: 'Escreva sobre um hábito usando "fico + gerúndio".',
            answer: 'Fico estudando tarde da noite porque trabalho durante o dia.',
            accepted: ['Fico pensando no que preciso fazer amanhã.'],
            explain: '"ficar + gerúndio" = hábito continuo o acción que se repite.',
          },
        ],
      },
    ],
  },
}

export default topic
