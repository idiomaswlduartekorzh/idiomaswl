import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'adverbios-frequencia',
  order: '18',
  color: '#166534',
  category: 'Advérbios',
  level: 'A1',
  title: 'Advérbios de frequência em português A1: sempre, às vezes, nunca',
  shortTitle: 'Advérbios de frequência',
  metaTitle: 'Advérbios de frequência português A1 — sempre, geralmente, às vezes, raramente, nunca',
  description:
    'Los adverbios de frecuencia en portugués dicen con qué regularidad ocurre algo. Sempre (siempre), geralmente (generalmente), às vezes (a veces), raramente (raramente), nunca (nunca). En portugués brasileño van generalmente ANTES del verbo, a diferencia del español que los pone después.',
  lead: 'Sempre, geralmente, às vezes, raramente, nunca — en portugués van normalmente antes del verbo. Eu sempre estudo = Siempre estudio. Eu nunca como carne = Nunca como carne.',
  outcomes: [
    'Usar los adverbios de frecuencia más comunes del portugués',
    'Colocar el adverbio correctamente (generalmente antes del verbo en portugués brasileño)',
    'Distinguir "nunca" del italiano/español: en portugués "nunca" no necesita doble negación',
  ],
  guide: {
    goal: 'Expresar la frecuencia de acciones habituales con adverbios de frecuencia.',
    model: '[sujeto] + [adverbio] + [verbo] + [resto]',
    formula: 'Eu sempre estudo. / Ela nunca chega tarde. / A gente às vezes come pizza.',
    decisions: [
      '¿La acción es constante? → sempre (Eu sempre tomo café — Siempre tomo café)',
      '¿La acción es la norma general? → geralmente (Geralmente trabalho de casa)',
      '¿La acción ocurre de vez en cuando? → às vezes / de vez em quando (Às vezes saio)',
      '¿La acción es poco frecuente? → raramente (Raramente como fast food)',
      '¿La acción NUNCA ocurre? → nunca (Eu nunca fumo — Nunca fumo)',
    ],
    table: [
      ['Adverbio', 'Equivalente español', 'Ejemplo en portugués'],
      ['sempre', 'siempre', 'Eu sempre estudo à noite (Siempre estudio por la noche)'],
      ['geralmente', 'generalmente / normalmente', 'Geralmente como em casa (Generalmente como en casa)'],
      ['às vezes', 'a veces', 'Às vezes vou ao cinema (A veces voy al cine)'],
      ['raramente', 'raramente', 'Raramente faço exercício (Raramente hago ejercicio)'],
      ['nunca', 'nunca', 'Eu nunca bebo álcool (Nunca bebo alcohol)'],
    ],
    mistakes: [
      '"Nunca" en portugués NO necesita doble negación: "Eu nunca fumo" (correcto). No como el italiano "non...mai".',
      'Posición estándar brasileña: ANTES del verbo (Eu sempre estudo), no después (estudo sempre es menos común aunque válido).',
      '"Às vezes" = a veces. No confundir con "às vezes" (con acento) vs "as vezes" (sin acento — incorrecto como adverbio).',
      '"Frequentemente" (frecuentemente) y "muitas vezes" (muchas veces) son sinónimos de "geralmente" en intensidad.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se usan los adverbios de frecuencia en portugués brasileño?',
      paragraphs: [
        'En el portugués brasileño hablado, los adverbios de frecuencia generalmente van ANTES del verbo: Eu sempre estudo (no estudo sempre). Esta posición es diferente del español europeo estándar pero similar al español latinoamericano informal.',
        'El adverbio "nunca" es más directo que en italiano o ruso: no necesita partícula negativa adicional. Eu nunca fumo = Nunca fumo. Simple y directo.',
      ],
      table: [
        ['Adverbio', 'Frecuencia aprox.', 'Ejemplo'],
        ['sempre', '100%', 'Sempre tomo café de manhã'],
        ['geralmente', '70-80%', 'Geralmente como em casa'],
        ['às vezes', '30-50%', 'Às vezes saio para jantar'],
        ['raramente', '10-20%', 'Raramente faço exercício'],
        ['nunca', '0%', 'Nunca fumo'],
      ],
    },
    {
      heading: 'Nunca en portugués vs nunca en español: una diferencia importante',
      paragraphs: [
        'En español rioplatense y algunas variedades, "nunca" puede aparecer solo o con negación. En portugués brasileño, "nunca" va antes del verbo SIN negación adicional: Eu nunca como carne (Nunca como carne). Si "nunca" va después del verbo, entonces SÍ necesitas "não": Eu não como carne nunca.',
        'Para hispanohablantes, la forma natural brasileña es: sujeto + nunca + verbo + resto. Eu nunca acordo tarde = Nunca me levanto tarde. Sin "não".',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Key difference from Spanish: frequency adverbs go BEFORE the verb in Brazilian Portuguese (eu sempre estudo, not estudo sempre). Also, "nunca" needs no double negative — just "eu nunca fumo" without "não".',
    graphicPrompt:
      'Frequency bar from 100% to 0%: sempre → geralmente → às vezes → raramente → nunca. Green Portuguese flag colors.',
    scene: [
      ['sempre', 'Eu sempre estudo (sémpri) — Siempre estudio'],
      ['geralmente', 'Geralmente como em casa (jeralménte) — Generalmente como en casa'],
      ['às vezes', 'Às vezes saio (às vézes) — A veces salgo'],
      ['raramente', 'Raramente faço esporte (raraménte) — Raramente hago deporte'],
      ['nunca', 'Eu nunca fumo (nûnca) — Nunca fumo'],
      ['muitas vezes', 'Muitas vezes estudo à noite — Muchas veces estudio de noche'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['estudar', 'comer', 'trabalhar', 'sair', 'fumar', 'beber'],
    reviewFocus: ['posición: antes del verbo', 'nunca sin doble negación', 'às vezes vs às vezes'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconhecimento dos advérbios',
        tag: 'Opción múltiple',
        intro: 'Identifica el adverbio de frecuencia correcto.',
        type: 'choice',
        items: [
          { scene: 'Significado de "sempre"', lines: [['', '"Eu sempre estudo português." ¿Qué significa sempre?']], options: ['nunca', 'a veces', 'siempre', 'raramente'], answer: 'siempre', explain: 'Sempre = siempre. Eu sempre estudo = Siempre estudio.' },
          { scene: 'Posición del adverbio', lines: [['', '¿Cuál es el orden más natural en portugués brasileño?']], options: ['Estudo sempre português', 'Eu sempre estudo português', 'Português estudo sempre', 'Sempre português estudo'], answer: 'Eu sempre estudo português', explain: 'En portugués brasileño el adverbio va ANTES del verbo: sempre estudo (no estudo sempre).' },
          { scene: 'Nunca sin doble negación', lines: [['', '¿Cómo se dice correctamente "Nunca bebo alcohol" en portugués?']], options: ['Não bebo nunca álcool', 'Eu nunca bebo álcool', 'Eu não nunca bebo álcool', 'Nunca não bebo álcool'], answer: 'Eu nunca bebo álcool', explain: 'Eu nunca bebo álcool. "Nunca" antes del verbo, sin "não" adicional.' },
          { scene: '"Às vezes"', lines: [['', '"A veces voy al restaurante": Eu ___ vou ao restaurante.']], options: ['sempre', 'nunca', 'às vezes', 'raramente'], answer: 'às vezes', explain: 'Às vezes = a veces. Posición: antes del verbo.' },
          { scene: 'Geralmente', lines: [['', '"Generalmente trabajo desde casa": ___ trabalho de casa.']], options: ['Às vezes', 'Nunca', 'Sempre', 'Geralmente'], answer: 'Geralmente', explain: 'Geralmente = generalmente / normalmente. Muy usado en portugués brasileño.' },
          { scene: 'Nunca posición', lines: [['', '"Nunca llego tarde": Eu ___ chego tarde.']], options: ['às vezes', 'geralmente', 'nunca', 'sempre'], answer: 'nunca', explain: 'Eu nunca chego tarde. nunca antes del verbo, sin negación adicional.' },
          { scene: 'Raramente', lines: [['', '"Raramente faccio sport" en italiano es equivalente a:']], options: ['Eu sempre faço esporte', 'Eu raramente faço esporte', 'Eu às vezes faço esporte', 'Eu nunca faço esporte'], answer: 'Eu raramente faço esporte', explain: 'Raramente = raramente. La misma palabra funciona en italiano y portugués.' },
          { scene: 'Frecuencia de hábito', lines: [['', '"Muitas vezes estudo à noite." ¿Qué significa?']], options: ['Nunca estudio de noche', 'A veces estudio de noche', 'Muchas veces estudio de noche', 'Siempre estudio de noche'], answer: 'Muchas veces estudio de noche', explain: 'Muitas vezes = muchas veces. Sinónimo de "frequentemente".' },
        ],
      },
      {
        id: 'level-2',
        title: 'Frequência — dois espaços',
        tag: '2 espacios',
        intro: 'Completa con el adverbio y la posición correcta.',
        type: 'dual',
        items: [
          { scene: 'Nunca + verbo', lines: [['', '"Nunca como carne": Eu [[0]] [[1]] carne.']], blanks: [{ options: ['nunca', 'sempre', 'às vezes', 'raramente'], answer: 'nunca', explain: 'Nunca = nunca. Posición antes del verbo, sin "não".' }, { options: ['bebo', 'como', 'faço', 'estudo'], answer: 'como', explain: 'Eu nunca como carne = Nunca como carne.' }] },
          { scene: 'Sempre en rutina', lines: [['', '"Siempre tomo café por la mañana": Eu [[0]] [[1]] de manhã.']], blanks: [{ options: ['sempre', 'nunca', 'às vezes', 'geralmente'], answer: 'sempre', explain: 'Sempre = siempre. Adverbio antes del verbo.' }, { options: ['como', 'bebo', 'tomo café', 'estudo'], answer: 'tomo café', explain: 'Eu sempre tomo café de manhã = Siempre tomo café por la mañana.' }] },
          { scene: 'Geralmente en contexto', lines: [['', '"Generalmente David llega a las ocho": David [[0]] [[1]] às oito.']], blanks: [{ options: ['nunca', 'geralmente', 'sempre', 'às vezes'], answer: 'geralmente', explain: 'Geralmente = generalmente. Adverbio antes del verbo.' }, { options: ['estuda', 'trabalha', 'chega', 'come'], answer: 'chega', explain: 'David geralmente chega às oito = David generalmente llega a las ocho.' }] },
          { scene: 'Às vezes + actividad', lines: [['', '"A veces vamos al cine": A gente [[0]] [[1]] ao cinema.']], blanks: [{ options: ['nunca', 'sempre', 'às vezes', 'geralmente'], answer: 'às vezes', explain: 'Às vezes = a veces.' }, { options: ['vai', 'vamos', 'vão', 'vou'], answer: 'vai', explain: 'A gente → vai (a gente usa formas de ela/ele/você). A gente às vezes vai ao cinema.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — rotina de Lina',
        tag: 'Opciones',
        intro: 'Elige el adverbio correcto para cada espacio.',
        type: 'guidedText',
        scene: 'A rotina de Lina, aluna da WeLearn',
        text: 'Lina é aluna de português na WeLearn. Ela [[0]] estuda português às sete da manhã. (Siempre estudia) [[1]] ela trabalha de casa, mas às vezes vai ao escritório. (Generalmente trabaja) Ela [[2]] come fast food — prefere comida caseira. (Raramente come) Aos fins de semana, [[3]] ela sai com amigos. (A veces sale) Ela [[4]] fuma. (Nunca fuma)',
        blanks: [
          { options: ['às vezes', 'nunca', 'sempre', 'raramente'], answer: 'sempre', explain: 'Sempre = siempre. Ela sempre estuda = Ella siempre estudia.' },
          { options: ['Às vezes', 'Nunca', 'Raramente', 'Geralmente'], answer: 'Geralmente', explain: 'Geralmente = generalmente. Posición al inicio de la frase también es válida.' },
          { options: ['sempre', 'nunca', 'geralmente', 'raramente'], answer: 'raramente', explain: 'Raramente = raramente. Ela raramente come fast food.' },
          { options: ['sempre', 'nunca', 'às vezes', 'raramente'], answer: 'às vezes', explain: 'Às vezes = a veces. Às vezes ela sai com amigos.' },
          { options: ['sempre', 'às vezes', 'geralmente', 'nunca'], answer: 'nunca', explain: 'Nunca = nunca. Ela nunca fuma. Sin "não" adicional.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto livre — escreve a frequência',
        tag: 'Sin opciones',
        intro: 'Escribe el adverbio correcto sin opciones.',
        type: 'freeText',
        scene: 'Descrevendo hábitos',
        text: '1. "Siempre desayuno en casa": Eu [[0]] tomo café da manhã em casa. 2. "Nunca bebo alcohol": Eu [[1]] bebo álcool. 3. "A veces estudio por la noche": [[2]] estudo à noite. 4. "Generalmente trabajo ocho horas": [[3]] trabalho oito horas. 5. "Raramente como sushi": Eu [[4]] como sushi.',
        blanks: [
          { answer: 'sempre', accepted: ['sempre'], explain: 'Sempre = siempre. Eu sempre tomo café.' },
          { answer: 'nunca', accepted: ['nunca'], explain: 'Nunca = nunca. Eu nunca bebo álcool. Sin "não".' },
          { answer: 'Às vezes', accepted: ['Às vezes', 'às vezes', 'De vez em quando', 'de vez em quando'], explain: 'Às vezes = a veces. También: de vez em quando.' },
          { answer: 'Geralmente', accepted: ['Geralmente', 'geralmente', 'Normalmente', 'normalmente'], explain: 'Geralmente = generalmente. También: normalmente.' },
          { answer: 'raramente', accepted: ['raramente', 'Raramente'], explain: 'Raramente = raramente. Eu raramente como sushi.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produção escrita',
        tag: 'Producción',
        intro: 'Construye frases completas con adverbios de frecuencia.',
        type: 'write',
        items: [
          { scene: 'Rotina pessoal', prompt: 'Traduce al portugués: "Siempre tomo café pero raramente como desayuno completo. A veces como una fruta." (café = café, café da manhã completo = desayuno completo, fruta = fruta)', answer: 'Sempre tomo café mas raramente como café da manhã completo. Às vezes como uma fruta.', accepted: ['sempre', 'raramente', 'às vezes'], explain: 'sempre (antes del verbo), raramente (antes del verbo), às vezes (inicio de frase).' },
          { scene: 'Descrever um colega', prompt: 'Traduce al portugués: "David siempre llega puntual, nunca cancela clases y generalmente prepara materiales innovadores." (pontual = puntual, cancelar = cancelar, preparar = preparar, materiais = materiales)', answer: 'David sempre chega pontual, nunca cancela aulas e geralmente prepara materiais inovadores', accepted: ['sempre', 'nunca', 'geralmente'], explain: 'sempre chega, nunca cancela (sin não), geralmente prepara — todos antes del verbo.' },
          { scene: 'Comparação de hábitos', prompt: 'Escribe en portugués: "Yo nunca fumo pero a veces bebo una cerveza. Generalmente prefiero agua." (fumar = fumar, cerveja = cerveza, preferir = preferir, água = agua)', answer: 'Eu nunca fumo mas às vezes bebo uma cerveja. Geralmente prefiro água.', accepted: ['nunca', 'às vezes', 'geralmente'], explain: 'nunca + verbo (sin não), às vezes bebo, geralmente prefiro.' },
          { scene: 'Pergunta sobre frequência', prompt: 'Traduce: "¿Con qué frecuencia estudias? Yo siempre estudio pero a veces necesito un descanso." (com que frequência = con qué frecuencia, descanso = descanso)', answer: 'Com que frequência você estuda? Eu sempre estudo mas às vezes preciso de um descanso.', accepted: ['sempre', 'às vezes'], explain: 'Com que frequência? = ¿Con qué frecuencia? sempre estudo + às vezes preciso.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Missão comunicativa',
        tag: 'Producción',
        intro: 'Usa todos los adverbios para describir tu vida cotidiana.',
        type: 'write',
        items: [
          { scene: 'Minha rotina', prompt: 'Escreve 5 frases sobre a tua rotina usando: sempre, geralmente, às vezes, raramente e nunca. Vocabulário: estudar, trabalhar, comer, sair, fazer exercício, beber, dormir.', answer: 'Sempre tomo café de manhã. Geralmente estudo duas horas por dia. Às vezes saio com amigos. Raramente faço exercício. Nunca fumo.', accepted: ['sempre', 'geralmente', 'às vezes', 'raramente', 'nunca'], explain: 'Usa os cinco advérbios. Posição antes do verbo: eu sempre estudo, eu nunca fumo, etc.' },
          { scene: 'Entrevista sobre hábitos', prompt: 'Escreve 3 perguntas para um colega sobre frequência (Com que frequência...? Você sempre/nunca...?) + as respostas.', answer: 'Com que frequência você estuda? Geralmente estudo todos os dias. Você sempre dorme bem? Às vezes não durmo bem. Você nunca come fast food? Raramente como, mas às vezes sim.', accepted: ['geralmente', 'às vezes', 'nunca', 'raramente'], explain: 'Perguntas com frequência + respostas com advérbios. Padrão natural de conversa em português.' },
        ],
      },
    ],
  },
}

export default topic
