import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbo-ficar-a2',
  order: '07',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'O Verbo Ficar em Português A2',
  shortTitle: 'Verbo ficar',
  metaTitle: 'O verbo ficar português A2 — localização, resultado, estado',
  description:
    'El verbo "ficar" en portugués tiene múltiples usos fundamentales: indica localización (Fica no centro.), resultado de un cambio de estado (Fiquei cansado.), permanencia (Fica em casa.), y equivale a "quedarse" en español. Es uno de los verbos más frecuentes del portugués cotidiano.',
  lead: '"Ficar" es versátil e imprescindible. Significa quedarse, estar ubicado, ponerse/volverse y quedarse en un lugar. "Onde fica o banco?" / "Fiquei com fome." / "Fica em casa."',
  outcomes: [
    'Conjuga el verbo ficar en presente e pretérito perfeito',
    'Usa ficar para indicar localización de lugares',
    'Usa ficar + adjetivo para expresar cambios de estado',
    'Distingue ficar (quedarse/estar) de ser/estar en contexto de localización',
  ],

  guide: {
    goal: 'Dominar los tres usos principales de ficar: localización, resultado/estado y permanencia.',
    model: 'O banco fica na esquina. / Fiquei cansado depois do trabalho. / Fica aqui comigo.',
    formula: 'ficar + lugar (ubicación) | ficar + adjetivo (resultado) | ficar + gerúndio (continuidad)',
    decisions: [
      'Localización de un lugar: "Onde fica o metrô?" / "A farmácia fica na rua principal."',
      'Resultado de un cambio: "Fiquei feliz com a notícia." / "Ela ficou surpresa." / "Fiquei com fome."',
      'Permanencia en un lugar: "Fica aqui, não vá embora." / "Vou ficar em casa hoje."',
      'Con gerúndio para acción continua: "Ele ficou esperando por horas."',
      'Conjugación presente: fico/fica/ficamos/ficam. Pretérito: fiquei/ficou/ficamos/ficaram.',
    ],
    table: [
      ['Uso de ficar', 'Estructura', 'Ejemplo'],
      ['Ubicación de lugares', 'ficar + prep + lugar', 'O banco fica no centro.'],
      ['Cambio de estado', 'ficar + adjetivo', 'Fiquei cansado. / Ela ficou triste.'],
      ['Permanencia', 'ficar + adv/prep', 'Fica aqui. / Vou ficar em casa.'],
      ['Continuidad', 'ficar + gerúndio', 'Ele ficou estudando a noite toda.'],
      ['Con color/condición', 'ficar + adj', 'A porta ficou aberta. / Ficou quente.'],
    ],
    mistakes: [
      '"O banco está no centro" no es incorrecto, pero "O banco fica no centro" es más natural en Brasil para localización permanente.',
      '"Eu fico cansado" (presente) = me canso habitualmente. "Fiquei cansado" (perfeito) = me quedé cansado (resultado ya ocurrido).',
      'No confundir "ficar bem" (quedar bien / sentirse bien) con "estar bem" (estar bien en este momento).',
      '"Fica com raiva" ✓ = se enoja. No usar "torna" en lugar de "fica" para cambios de estado en portugués brasileño coloquial.',
    ],
  },

  seo: [
    {
      heading: 'El verbo ficar: uno de los más versátiles del portugués',
      paragraphs: [
        'El verbo "ficar" es uno de los más polivalentes del portugués brasileño. Aparece con tanta frecuencia que entenderlo bien es fundamental para comunicarse de manera natural. Sus tres usos principales son: indicar la ubicación permanente de un lugar ("O hospital fica longe daqui"), expresar un cambio de estado o resultado ("Fiquei surpreso com a notícia") y significar quedarse en un lugar ("Fica aqui comigo").',
        'A diferencia del español, donde usamos "estar" para la ubicación temporal y "quedar" para permanecer, el portugués usa "ficar" para ambas funciones en muchos contextos. Esto hace que "ficar" sea un verbo de vocabulario activo obligatorio desde el nivel A2.',
      ],
    },
    {
      heading: 'Ficar + adjetivo: cambios de estado',
      paragraphs: [
        'Uno de los usos más productivos de "ficar" es la estructura ficar + adjetivo, equivalente a "ponerse/quedarse + adjetivo" en español. Ejemplos: "Fiquei com raiva" (me puse furioso), "Ela ficou nervosa" (ella se puso nerviosa), "Ficamos felizes" (nos pusimos/quedamos felices), "O leite ficou quente" (la leche se calentó).',
        'Esta estructura también funciona con "com" para indicar una sensación: "Fiquei com fome" (me quedé con hambre), "Fiquei com saudade" (me quedé con nostalgia/extrañé), "Você ficou com frio?" (¿tenías/te quedaste con frío?). Este uso de "ficar com + sustantivo" es característico del portugués brasileño.',
      ],
    },
    {
      heading: 'Conjugación de ficar: irregular solo en el perfeito',
      paragraphs: [
        'En el presente del indicativo, "ficar" es completamente regular: fico, fica, ficamos, ficam. En el pretérito perfeito, la raíz cambia para evitar la combinación "cou": fiquei, ficou, ficamos, ficaram. Esta irregularidad ortográfica es la única que presenta el verbo.',
        'En el pretérito imperfeito, "ficar" es regular: ficava, ficava, ficávamos, ficavam. Útil para expresar: "Quando era criança, ficava em casa da vovó aos fins de semana."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende los múltiples usos de ficar en contextos reales.',
    graphicPrompt: 'Mapa de ciudad con referencias de localización, personas expresando emociones después de noticias.',
    scene: [
      ['Onde fica o banco?', '¿Dónde queda el banco?'],
      ['O banco fica na esquina.', 'El banco queda en la esquina.'],
      ['Fiquei cansado depois do trabalho.', 'Me quedé cansado después del trabajo.'],
      ['Ela ficou feliz com o presente.', 'Ella se puso feliz con el regalo.'],
      ['Fica aqui comigo.', 'Quédate aquí conmigo.'],
      ['Vou ficar em casa hoje.', 'Voy a quedarme en casa hoy.'],
      ['Fiquei com fome depois da academia.', 'Me quedé con hambre después del gym.'],
      ['O museu fica perto da praça.', 'El museo queda cerca de la plaza.'],
    ],
    learnerModes: ['localización: onde fica...?', 'resultado: fiquei + adjetivo', 'permanencia: vou ficar em...'],
    practiceVerbs: ['ficar', 'fiquei', 'ficou', 'ficamos'],
    reviewFocus: ['ficar + lugar', 'ficar + adjetivo', 'ficar com + sustantivo', 'fiquei/ficou'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el uso correcto de ficar',
        tag: 'Opción múltiple',
        intro: 'Elige la forma o uso correcto de "ficar" para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'La ciudad',
            lines: [['Ana', 'Onde ___ a farmácia mais próxima?']],
            options: ['fica', 'está', 'é', 'tem'],
            answer: 'fica',
            explain: '"Ficar" para ubicación permanente de un lugar: "Onde fica a farmácia?"',
          },
          {
            scene: 'La noticia',
            lines: [['Carlos', 'Ela ___ muito surpresa quando soube da notícia.']],
            options: ['ficou', 'estava', 'foi', 'tinha'],
            answer: 'ficou',
            explain: '"Ficar + adjetivo" para cambio de estado: "ficou surpresa" (se quedó sorprendida).',
          },
          {
            scene: 'El plan',
            lines: [['Pedro', 'Eu vou ___ em casa este fim de semana.']],
            options: ['ficar', 'estar', 'ser', 'ir'],
            answer: 'ficar',
            explain: '"Ficar em casa" = quedarse en casa. Uso de permanencia.',
          },
          {
            scene: 'El resultado',
            lines: [['Maria', 'Depois de correr 10 km, eu ___ com muita fome.']],
            options: ['fiquei', 'estive', 'fui', 'tive'],
            answer: 'fiquei',
            explain: '"Ficar com + sustantivo" para sensación resultante: "fiquei com fome".',
          },
          {
            scene: 'La ubicación',
            lines: [['David', 'O hotel ___ do outro lado da praça central.']],
            options: ['fica', 'está', 'é', 'vem'],
            answer: 'fica',
            explain: '"Fica" para localización permanente de establecimientos.',
          },
          {
            scene: 'El período',
            lines: [['Zhanna', 'Ela ___ estudando até a meia-noite para o exame.']],
            options: ['ficou', 'estava', 'foi', 'tinha'],
            answer: 'ficou',
            explain: '"Ficar + gerúndio" para acción que continúa: "ficou estudando" (se quedó estudiando).',
          },
          {
            scene: 'La emoción',
            lines: [['Lina', 'Eu ___ com raiva quando vi o que aconteceu.']],
            options: ['fiquei', 'estava', 'fui', 'tive'],
            answer: 'fiquei',
            explain: '"Ficar com raiva" = ponerse furioso. "Fiquei" = perfeito del verbo ficar.',
          },
          {
            scene: 'La petición',
            lines: [['Sofia', '___ aqui, não precisa sair.']],
            options: ['Fica', 'Está', 'É', 'Vai'],
            answer: 'Fica',
            explain: '"Fica" como imperativo informal: "Fica aqui" (quédate aquí).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos usos de ficar',
        tag: '2 espacios',
        intro: 'Completa las oraciones con la forma correcta de "ficar".',
        type: 'dual',
        items: [
          {
            scene: 'La ciudad',
            lines: [['Ana', 'Você sabe onde [[0]] o correiro? Ele [[1]] na rua Quinze.']],
            blanks: [
              { options: ['fica', 'está', 'é'], answer: 'fica', explain: '"Ficar" para ubicación: onde fica o correio.' },
              { options: ['fica', 'está', 'é'], answer: 'fica', explain: '"Ficar" para ubicación permanente: ele fica na rua Quinze.' },
            ],
          },
          {
            scene: 'La reacción',
            lines: [['Carlos', 'Quando soube do acidente, eu [[0]] muito assustado e a minha família [[1]] preocupada.']],
            blanks: [
              { options: ['fiquei', 'estava', 'fui'], answer: 'fiquei', explain: '"Ficar + adjetivo": fiquei assustado (me asusté).' },
              { options: ['ficou', 'estava', 'foi'], answer: 'ficou', explain: '"Ficar + adjetivo": a família ficou preocupada.' },
            ],
          },
          {
            scene: 'El plan',
            lines: [['Pedro', 'Vou [[0]] em casa amanhã porque estou doente. Você pode [[1]] também?']],
            blanks: [
              { options: ['ficar', 'estar', 'ser'], answer: 'ficar', explain: '"Ficar em casa" = quedarse en casa. Uso de permanencia.' },
              { options: ['ficar', 'estar', 'ser'], answer: 'ficar', explain: '"Ficar" = quedarse. "Você pode ficar?" ¿puedes quedarte?' },
            ],
          },
          {
            scene: 'La espera',
            lines: [['Maria', 'Eu [[0]] esperando por duas horas e depois [[1]] com raiva.']],
            blanks: [
              { options: ['fiquei', 'estava', 'fui'], answer: 'fiquei', explain: '"Ficar + gerúndio": fiquei esperando (me quedé esperando).' },
              { options: ['fiquei', 'estava', 'fui'], answer: 'fiquei', explain: '"Ficar com raiva": me puse furioso después de esperar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en São Paulo',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de "ficar" para completar este texto sobre la ciudad.',
        type: 'guidedText',
        scene: 'Turista en São Paulo preguntando por lugares',
        text: 'Cheguei a São Paulo e não sabia onde [[0]] o meu hotel. Perguntei a um senhor: "Onde [[1]] o Museu do Ipiranga?" Ele me explicou tudo. Depois de caminhar muito, [[2]] com fome e entrei em um restaurante. A comida era deliciosa e eu [[3]] muito satisfeito. No fim do dia, decidi [[4]] no hotel e descansar.',
        blanks: [
          { options: ['ficava', 'estava', 'era'], answer: 'ficava', explain: '"Ficar" en imperfeito para ubicación: onde ficava (dónde quedaba).' },
          { options: ['fica', 'está', 'é'], answer: 'fica', explain: '"Fica" para ubicación permanente de museo.' },
          { options: ['fiquei', 'estava', 'fui'], answer: 'fiquei', explain: '"Ficar com fome": fiquei com fome (me quedé con hambre).' },
          { options: ['fiquei', 'estava', 'fui'], answer: 'fiquei', explain: '"Ficar + adjetivo": fiquei satisfeito (me quedé satisfecho).' },
          { options: ['ficar', 'estar', 'ser'], answer: 'ficar', explain: '"Ficar no hotel" = quedarse en el hotel.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma de ficar',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de "ficar" según el contexto.',
        type: 'freeText',
        scene: 'Describiendo una visita a Río de Janeiro',
        text: 'O Cristo Redentor [[0]] no topo do Corcovado. Quando cheguei lá, [[1]] impressionado com a vista. Depois [[2]] com sede e comprei uma água. Minha amiga [[3]] tirando fotos por horas. No fim, decidimos [[4]] mais um dia na cidade.',
        blanks: [
          { answer: 'fica', explain: '"Fica" para localización permanente del Cristo Redentor.' },
          { answer: 'fiquei', explain: '"Fiquei + adjetivo": me quedé impresionado.' },
          { answer: 'fiquei', explain: '"Fiquei com sede": me quedé con sed.' },
          { answer: 'ficou', explain: '"Ficou + gerúndio": ella se quedó sacando fotos.' },
          { answer: 'ficar', explain: '"Ficar + tiempo": quedarse un día más.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye oraciones con ficar',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en portugués usando "ficar" según el uso indicado.',
        type: 'write',
        items: [
          {
            scene: 'Ubicación',
            prompt: 'Escribe: El teatro queda en el centro de la ciudad. → O teatro ___ no ___.',
            answer: 'O teatro fica no centro da cidade.',
            accepted: ['o teatro fica no centro', 'fica no centro da cidade'],
            explain: '"Ficar" para ubicación permanente: o teatro fica no centro.',
          },
          {
            scene: 'Cambio de estado',
            prompt: 'Escribe: Yo me puse muy feliz con la noticia. → Eu ___ muito feliz com a notícia.',
            answer: 'Eu fiquei muito feliz com a notícia.',
            accepted: ['eu fiquei muito feliz', 'fiquei muito feliz com a notícia'],
            explain: '"Ficar + adjetivo": fiquei muito feliz.',
          },
          {
            scene: 'Permanencia',
            prompt: 'Escribe: Ella se quedó en casa todo el fin de semana. → Ela ___ em casa o fim de semana todo.',
            answer: 'Ela ficou em casa o fim de semana todo.',
            accepted: ['ela ficou em casa o fim de semana', 'ficou em casa o fim de semana todo'],
            explain: '"Ficar em casa" = quedarse en casa. "Ficou" = perfeito.',
          },
          {
            scene: 'Sensación',
            prompt: 'Escribe: Nos quedamos con hambre después del entrenamiento. → Ficamos com ___ depois do treino.',
            answer: 'Ficamos com fome depois do treino.',
            accepted: ['ficamos com fome depois do treino', 'ficamos com fome'],
            explain: '"Ficar com fome": ficamos = 1ª persona plural del perfeito.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Usa ficar libremente',
        tag: 'Escritura libre',
        intro: 'Escribe sobre situaciones reales usando diferentes usos de "ficar".',
        type: 'write',
        items: [
          {
            scene: 'Tu ciudad',
            prompt: 'Describe la ubicación de dos lugares importantes de tu ciudad usando "ficar".',
            answer: 'O banco central fica no centro da cidade. A universidade fica perto da praça principal.',
            accepted: ['fica no', 'fica perto', 'fica na', 'fica ao lado'],
            explain: 'Usa: fica no centro, fica perto de, fica na rua, fica ao lado de.',
          },
          {
            scene: 'Una emoción',
            prompt: 'Describe cómo te pusiste ante una situación reciente usando "ficar + adjetivo".',
            answer: 'Fiquei muito nervoso antes do exame de português.',
            accepted: ['fiquei', 'ficou', 'ficamos', 'feliz', 'nervoso', 'surpreso', 'preocupado', 'animado'],
            explain: 'Usa: fiquei + adjetivo como feliz, nervoso, surpreso, animado, preocupado.',
          },
          {
            scene: 'El plan del fin de semana',
            prompt: 'Escribe sobre tus planes usando "ficar" para expresar permanencia o continuidad.',
            answer: 'Vou ficar em casa no sábado e ficar estudando português.',
            accepted: ['vou ficar', 'ficar em', 'ficar estudando', 'ficar em casa', 'ficar com'],
            explain: 'Usa: vou ficar em + lugar, vou ficar + gerúndio.',
          },
        ],
      },
    ],
  },
}

export default topic
