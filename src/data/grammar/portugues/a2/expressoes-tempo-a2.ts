import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'expressoes-tempo-a2',
  order: '18',
  color: '#166534',
  category: 'Vocabulario',
  level: 'A2',
  title: 'Expressões de tempo en portugués A2: daqui a, há/faz, dentro de',
  shortTitle: 'Expressões de tempo',
  metaTitle: 'Expresiones de tiempo en portugués A2 — há, faz, daqui a, dentro de, desde',
  description:
    'Las expresiones de tiempo en portugués son esenciales para situar acciones en el pasado, presente y futuro. "Há/faz" (hace) para tiempo transcurrido, "daqui a" (dentro de) para tiempo futuro, "desde" (desde), "até" (hasta), "durante" (durante), "enquanto" (mientras). Todas tienen equivalentes directos con el español pero con usos particulares.',
  lead: 'Há dois anos que estudo português: las expresiones de tiempo que sitúan todo en su contexto.',
  outcomes: [
    'Usar "há/faz" para expresar tiempo transcurrido desde el pasado',
    'Usar "daqui a" para expresar tiempo futuro en referencia al presente',
    'Usar "desde", "até", "durante" y "enquanto" en contexto',
    'Distinguir "há" (tiempo) de "a" (preposición de movimiento)',
  ],

  guide: {
    goal: 'Usar las expresiones de tiempo más frecuentes del portugués para situar acciones temporalmente.',
    model: 'Há dois anos que estudo português. / Volto daqui a uma hora. / Faz tempo que não te vejo.',
    formula: 'Passado: há/faz + tempo | Futuro: daqui a + tempo | Duração: durante | Limite: desde/até',
    decisions: [
      '"Há" + tempo + que + presente: "Há três anos que moro aqui" = Llevo tres años viviendo aquí',
      '"Faz" + tempo + que: coloquial equivalente de "há": "Faz tempo que não te vejo"',
      '"Daqui a" + tempo: futuro a partir de ahora: "Voltarei daqui a uma semana"',
      '"Desde" + punto de tiempo: "Estudo português desde janeiro"',
      '"Até" + punto de tiempo: "Vou ficar até às 18h" / "Vai demorar até amanhã"',
      '"Durante" + duración: "Estudei durante três horas"',
      '"Enquanto" + sujeito + verbo: "Enquanto você dorme, eu trabalho"',
    ],
    table: [
      ['Expressão', 'Uso', 'Exemplo'],
      ['há/faz + tempo', 'tiempo transcurrido', 'Há dois anos que estudo.'],
      ['daqui a + tempo', 'tiempo futuro', 'Voltarei daqui a uma hora.'],
      ['desde + ponto', 'inicio de período', 'Moro aqui desde 2020.'],
    ],
    mistakes: [
      '"Há" (tiempo transcurrido) ≠ "a" (dirección): "Há dois anos" (hace dos años) vs "Vou a Lisboa" (voy a Lisboa).',
      '"Daqui a" ❌ não se usa para el pasado: para el pasado se usa "há" o "faz".',
      '"Durante" no lleva artículo en contexto temporal genérico: "durante três horas" ✓ (no "durante as três horas" salvo contexto específico).',
    ],
  },

  seo: [
    {
      heading: 'Há y faz para tiempo transcurrido',
      paragraphs: [
        'En portugués, tanto "há" como "faz" se usan para expresar tiempo que ha pasado desde un punto en el pasado hasta el presente. "Há dois anos que moro aqui" y "Faz dois anos que moro aqui" significan lo mismo: "Llevo dos años viviendo aquí". "Faz" es más coloquial y típico del habla brasileña.',
        'La estructura es: "há/faz + tiempo + que + presente". El verbo de la cláusula subordinada va en presente porque la acción continúa: "Há três meses que não durmo bem" (hace tres meses que no duermo bien — y sigo sin dormir bien).',
      ],
    },
    {
      heading: 'Daqui a para el futuro',
      paragraphs: [
        '"Daqui a" equivale al español "dentro de" para referirse a un tiempo futuro calculado desde el presente: "Voltarei daqui a uma semana" (volvré dentro de una semana). Nunca se usa para el pasado.',
        '"Desde" marca el inicio de un período: "Estudo português desde março" (estudio portugués desde marzo). "Até" marca el límite: "Vou ficar até sexta-feira" (voy a quedarme hasta el viernes). Ambas pueden combinarse: "Trabalho das 9h até às 18h" (trabajo de 9 a 18h).',
      ],
    },
    {
      heading: '¿Cuáles son las expresiones de tiempo en portugués?',
      paragraphs: [
        'Cada una sitúa la acción en una zona temporal distinta: pasado, futuro, inicio, límite o duración. Esta tabla las ordena con un ejemplo:',
      ],
      table: [
        ['Expresión', 'Sitúa en', 'Ejemplo'],
        ['há / faz + tiempo', 'pasado hasta hoy', 'Há dois anos que moro aqui.'],
        ['daqui a + tiempo', 'futuro desde ahora', 'Volto daqui a uma hora.'],
        ['desde + punto', 'inicio de un período', 'Estudo desde janeiro.'],
        ['até + punto', 'límite final', 'Fico até sexta.'],
        ['durante + tiempo', 'duración', 'Estudei durante três horas.'],
        ['enquanto + frase', 'simultaneidad', 'Enquanto você fala, eu escuto.'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre "há" y "daqui a" en portugués?',
      paragraphs: [
        'Apuntan en direcciones opuestas del tiempo. "Há" (o "faz") mira al pasado: cuenta el tiempo transcurrido desde un momento anterior hasta ahora — "Há dois anos que estudo" (empecé hace dos años y sigo). "Daqui a" mira al futuro: cuenta el tiempo que falta desde ahora hasta un momento posterior — "Volto daqui a dois anos" (aún no ha pasado). El error típico del hispanohablante es usar "há" para el futuro; recuerda: pasado → há/faz, futuro → daqui a. En español ambos serían "hace" y "dentro de".',
      ],
    },
    {
      heading: '¿Cuándo se usa "desde", "até" y "durante" en portugués?',
      paragraphs: [
        '"Desde" marca el punto de inicio de algo que continúa: "Moro aqui desde 2020" (desde 2020 hasta hoy). "Até" marca el punto final o el límite: "Fico até sexta" (hasta el viernes). "Durante" indica el lapso completo de una actividad: "Estudei durante duas horas" (a lo largo de dos horas). A menudo desde y até se combinan para delimitar un intervalo: "Trabalho das 9h até às 18h". Son casi calcos del español (desde/hasta/durante), así que el reparto es intuitivo; la única cautela es no meter artículo con "durante" en sentido genérico ("durante três horas", no "durante as três horas").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Expresiones de tiempo: há/faz para pasado, daqui a para futuro, desde/até para duración.',
    graphicPrompt: 'Línea del tiempo mostrando expressões de tempo: desde, há, até, daqui a.',
    scene: [
      ['Há dois anos que moro em São Paulo.', 'Llevo dos años viviendo en São Paulo.'],
      ['Voltarei daqui a uma semana.', 'Volveré dentro de una semana.'],
      ['Estudo português desde janeiro.', 'Estudio portugués desde enero.'],
      ['Vou trabalhar até às 18h.', 'Voy a trabajar hasta las 18h.'],
      ['Faz tempo que não te vejo!', '¡Hace mucho que no te veo!'],
      ['Enquanto você fala, eu escuto.', 'Mientras tú hablas, yo escucho.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['há/faz + que + presente', 'daqui a + futuro', 'desde/até + ponto temporal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la expresión correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la expresión de tiempo adecuada para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Llevas tres años viviendo en Brasil.',
            lines: [['', '___ três anos que moro no Brasil.']],
            options: ['Há', 'Daqui a', 'Desde', 'Até'],
            answer: 'Há',
            explain: '"Há" + tiempo + que + presente = tiempo transcurrido hasta ahora.',
          },
          {
            scene: 'El médico llega en 20 minutos.',
            lines: [['', 'O médico chega ___ 20 minutos.']],
            options: ['daqui a', 'há', 'desde', 'faz'],
            answer: 'daqui a',
            explain: '"daqui a" = dentro de (tiempo futuro desde el presente).',
          },
          {
            scene: 'Estudias inglés desde 2019.',
            lines: [['', 'Estudo inglês ___ 2019.']],
            options: ['desde', 'há', 'daqui a', 'durante'],
            answer: 'desde',
            explain: '"desde" marca el punto de inicio de un período que continúa.',
          },
          {
            scene: 'Trabajarás hasta las 6 de la tarde.',
            lines: [['', 'Vou trabalhar ___ às 18h.']],
            options: ['até', 'desde', 'daqui a', 'há'],
            answer: 'até',
            explain: '"até" = hasta (límite de tiempo).',
          },
          {
            scene: 'Hace tiempo que no te veo.',
            lines: [['', '___ tempo que não te vejo!']],
            options: ['Faz', 'Daqui a', 'Desde', 'Até'],
            answer: 'Faz',
            explain: '"Faz" = equivalente coloquial de "há" para tiempo transcurrido.',
          },
          {
            scene: 'Estudié durante dos horas.',
            lines: [['', 'Estudiei ___ duas horas.']],
            options: ['durante', 'daqui a', 'há', 'desde'],
            answer: 'durante',
            explain: '"durante" = durante (duración de una actividad).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Tiempo pasado y futuro',
        tag: '2 espacios',
        intro: 'Completa con las expresiones de tiempo correctas.',
        type: 'dual',
        items: [
          {
            scene: 'Llevas seis meses trabajando aquí y saldrás en dos horas.',
            lines: [['', '[[0]] seis meses que trabalho aqui. Saio [[1]] duas horas.']],
            blanks: [
              { options: ['Há', 'Daqui a', 'Desde', 'Faz'], answer: 'Há', explain: '"há + tempo + que + presente" = tiempo transcurrido.' },
              { options: ['daqui a', 'há', 'desde', 'durante'], answer: 'daqui a', explain: '"daqui a" = dentro de (futuro).' },
            ],
          },
          {
            scene: 'Desde enero hasta diciembre.',
            lines: [['', 'Trabalho aqui [[0]] janeiro [[1]] dezembro.']],
            blanks: [
              { options: ['desde', 'há', 'daqui a', 'durante'], answer: 'desde', explain: '"desde" = a partir de (punto de inicio).' },
              { options: ['até', 'daqui a', 'desde', 'há'], answer: 'até', explain: '"até" = hasta (límite).' },
            ],
          },
          {
            scene: 'Mientras comes, él trabaja.',
            lines: [['', '[[0]] você come, ele [[1]] trabalhando.']],
            blanks: [
              { options: ['Enquanto', 'Desde', 'Durante', 'Até'], answer: 'Enquanto', explain: '"Enquanto" = mientras (dos acciones simultáneas).' },
              { options: ['fica', 'há', 'está', 'daqui a'], answer: 'fica', explain: '"fica trabalhando" = continúa trabajando (habitual).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una carta sobre el tiempo',
        tag: 'Texto guiado',
        intro: 'Completa la carta eligiendo las expresiones de tiempo correctas.',
        type: 'guidedText',
        scene: 'Rafael escreve para sua família sobre sua vida no exterior.',
        text: '[[0]] dois anos que estou aqui. Cheguei [[1]] setembro de 2022. Trabalho na empresa [[2]] manhã [[3]] às 18h. Vou voltar ao Brasil [[4]] três meses. [[5]] estou aqui, estou aprendendo muito!',
        blanks: [
          { options: ['Há', 'Daqui a', 'Desde', 'Até'], answer: 'Há', explain: '"há + dois anos + que" = llevo dos años.' },
          { options: ['desde', 'daqui a', 'há', 'durante'], answer: 'desde', explain: '"desde setembro de 2022" = desde septiembre.' },
          { options: ['de', 'desde', 'há', 'até'], answer: 'de', explain: '"de manhã" = por la mañana (expresión de periodo del día).' },
          { options: ['até', 'desde', 'daqui a', 'há'], answer: 'até', explain: '"até às 18h" = hasta las 18h.' },
          { options: ['daqui a', 'há', 'desde', 'até'], answer: 'daqui a', explain: '"daqui a três meses" = dentro de tres meses.' },
          { options: ['Enquanto', 'Desde', 'Há', 'Daqui a'], answer: 'Enquanto', explain: '"Enquanto" = mientras.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la expresión correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: completa con há, faz, daqui a, desde, até o durante.',
        type: 'freeText',
        scene: 'Situações temporais cotidianas.',
        text: '[[0]] uma hora que espero. / Voltarei [[1]] dois dias. / Moro aqui [[2]] 2020. / Estudei [[3]] uma hora. / Vou estudar [[4]] à meia-noite.',
        blanks: [
          { answer: 'Há', explain: '"Há uma hora que espero" = llevo una hora esperando.' },
          { answer: 'daqui a', explain: '"daqui a dois dias" = dentro de dos días.' },
          { answer: 'desde', explain: '"desde 2020" = desde 2020 (punto de inicio).' },
          { answer: 'durante', explain: '"durante uma hora" = durante una hora.' },
          { answer: 'até', explain: '"até à meia-noite" = hasta la medianoche.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones temporales',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas usando las expresiones de tiempo dadas.',
        type: 'write',
        items: [
          {
            scene: 'Llevas cuatro años estudiando inglés.',
            prompt: 'Escreva usando "há + tempo + que + presente".',
            answer: 'Há quatro anos que estudo inglês.',
            accepted: ['Faz quatro anos que estudo inglês.'],
            explain: '"Há/faz + quatro anos + que + presente" = llevo cuatro años.',
          },
          {
            scene: 'La reunión empieza dentro de 30 minutos.',
            prompt: 'Escreva usando "daqui a + tempo".',
            answer: 'A reunião começa daqui a trinta minutos.',
            accepted: ['A reunião vai começar daqui a meia hora.'],
            explain: '"daqui a + tiempo" = dentro de (futuro).',
          },
          {
            scene: 'Trabajas desde las 9h hasta las 17h.',
            prompt: 'Escreva usando "desde/de + hora + até + hora".',
            answer: 'Trabalho das 9h até às 17h.',
            accepted: ['Trabalho desde as 9h até às 17h.'],
            explain: '"de/desde + hora" + "até + hora" = de X a Y.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe sobre tu vida y rutina',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones usando expresiones de tiempo sobre tu vida real.',
        type: 'write',
        items: [
          {
            scene: 'Describe desde cuándo haces algo o cuánto tiempo llevas viviendo en algún lugar.',
            prompt: 'Escreva duas frases com "há/faz + que" e "desde".',
            answer: 'Há dois anos que estudo espanhol. Moro na minha cidade desde que nasci.',
            accepted: ['Faz seis meses que pratico esporte. Trabalho nessa empresa desde janeiro.'],
            explain: '"Há/faz + que" para la duración; "desde" para el punto de inicio.',
          },
          {
            scene: 'Describe tu horario o planes futuros.',
            prompt: 'Escreva sobre sua rotina ou planos usando "até", "daqui a" e "durante".',
            answer: 'Trabalho até às 18h. Vou sair daqui a uma hora. Estudo durante a noite.',
            accepted: ['Vou viajar daqui a uma semana. Vou ficar lá durante dois dias.'],
            explain: 'Combina "até", "daqui a" y "durante" para situar los eventos temporalmente.',
          },
        ],
      },
    ],
  },
}

export default topic
