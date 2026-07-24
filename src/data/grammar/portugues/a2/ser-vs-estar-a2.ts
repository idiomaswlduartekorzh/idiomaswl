import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ser-vs-estar-a2',
  order: '12',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Ser vs Estar em Contextos Avançados A2',
  shortTitle: 'Ser vs Estar A2',
  metaTitle: 'Ser vs Estar português A2 — contextos avançados e diferenças',
  description:
    'A nivel A2, la distinción entre ser y estar en portugués se vuelve más matizada. Ser expresa identidad permanente, profesión, origen, material, tiempo y características esenciales. Estar expresa estados temporales, ubicación de personas y sentimientos momentáneos. Hay casos de contraste importante con el español.',
  lead: '"Ele é nervoso" (es nervioso de personalidad) vs "Ele está nervoso" (ahora mismo está nervioso). La diferencia cambia el significado completamente. Domina estos contextos avanzados.',
  outcomes: [
    'Distingue ser (esencia/identidad) de estar (estado/condición temporal)',
    'Usa ser para profesión, origen, material, relaciones, tiempo',
    'Usa estar para estados físicos y emocionales del momento y ubicación de personas',
    'Identifica pares contrastivos que cambian de significado según ser o estar',
  ],

  guide: {
    goal: 'Usar ser y estar correctamente en contextos que van más allá de lo básico de nivel A1.',
    model: 'Ela é médica e é muito calma. / Hoje ela está ocupada e está cansada.',
    formula: 'SER: identidad/esencia/características permanentes | ESTAR: estado temporal/ubicación de personas',
    decisions: [
      'SER → profesión: "Ele é professor." / origen: "Sou do Brasil." / material: "A mesa é de madeira." / hora: "São três horas."',
      'ESTAR → estado físico: "Estou cansado." / emocional: "Ela está triste." / ubicación de persona: "Onde você está?"',
      'Contraste: "A sopa é quente" (naturalmente caliente) vs "A sopa está quente" (ahora está caliente, temporal).',
      'Contraste: "Ele é nervoso" (de carácter nervioso) vs "Ele está nervoso" (ahora mismo está nervioso).',
      'ESTAR para ubicación de personas: "Ela está em casa." pero SER para eventos: "A festa é em casa da Ana."',
      'Adjetivos de estado con estar: aberto/fechado, ocupado, livre, pronto, sentado, deitado.',
    ],
    table: [
      ['Contexto', 'SER', 'ESTAR'],
      ['Profesión/identidad', 'Ela é professora.', '—'],
      ['Estado físico/emocional', '—', 'Estou com fome. Ela está triste.'],
      ['Ubicación', 'A prova é na sala 3. (evento)', 'Ela está na sala 3. (persona)'],
      ['Temperatura', 'O café é quente. (natural)', 'O café está quente. (ahora)'],
      ['Carácter vs estado', 'Ele é nervoso. (rasgo)', 'Ele está nervoso. (ahora)'],
    ],
    mistakes: [
      '"Estou brasileiro" ✗ → "Sou brasileiro" ✓. La nacionalidad siempre usa ser.',
      '"O banco é fechado" ✗ → "O banco está fechado" ✓. Estados temporales (abierto/cerrado) usan estar.',
      '"Onde é você?" ✗ → "Onde você está?" ✓. La ubicación de una persona usa estar.',
      '"Ela está médica" ✗ → "Ela é médica" ✓. La profesión siempre usa ser.',
    ],
  },

  seo: [
    {
      heading: 'Ser vs Estar en A2: más allá de lo básico',
      paragraphs: [
        'Para el nivel A2, la distinción entre ser y estar en portugués requiere dominar casos más complejos. La regla general es: ser para la esencia e identidad (características permanentes, origen, profesión, material) y estar para estados temporales (emociones momentáneas, estados físicos, ubicación de personas). Sin embargo, hay varios contrastes importantes que cambian el significado completamente.',
        'Un par importante es "quente/frio": "A sopa é quente" significa que la sopa es naturalmente caliente (su función es calentar), mientras "A sopa está quente" indica que en este momento está a alta temperatura. Otro par: "nervoso" → "Ele é nervoso" (es una persona nerviosa por naturaleza) vs "Ele está nervoso" (ahora mismo está nervioso por alguna razón).',
      ],
    },
    {
      heading: 'SER: profesión, origen, material, eventos',
      paragraphs: [
        'En portugués A2, ser se usa obligatoriamente para: profesiones ("Ela é dentista"), origen o nacionalidad ("Sou argentino"), material ("A cadeira é de plástico"), relaciones ("Ele é meu irmão"), características de carácter ("Ela é paciente e inteligente") y eventos localizados ("A reunião é na sala B").',
        'La hora también usa ser en portugués: "Que horas são?" / "São duas da tarde." / "É meio-dia." Este es un uso que sorprende a los hispanohablantes porque en español también usamos ser para la hora, pero es útil confirmarlo para el A2.',
      ],
    },
    {
      heading: 'ESTAR: ubicación de personas, estados y condiciones',
      paragraphs: [
        'Estar se usa para estados temporales de personas y cosas: "Estou cansado" (estoy cansado ahora), "O banco está fechado" (el banco está cerrado), "Ela está grávida" (ella está embarazada). También se usa para la ubicación de personas y objetos: "Onde você está?" / "O livro está na mesa."',
        'Un grupo importante de adjetivos siempre va con estar: aberto/fechado (abierto/cerrado), ocupado/livre (ocupado/libre), pronto (listo), sentado/deitado (sentado/acostado). Estos describen estados o posiciones físicas que son temporales por naturaleza.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende los contrastes más avanzados entre ser y estar en portugués.',
    graphicPrompt: 'Situaciones contrastivas: una persona con rasgos de carácter vs estados momentáneos.',
    scene: [
      ['Ela é médica. / Ela está ocupada.', 'Ella es médica. / Ella está ocupada.'],
      ['Ele é nervoso. / Ele está nervoso hoje.', 'Él es nervioso (de carácter). / Hoy está nervioso.'],
      ['A festa é aqui. / Ela está aqui.', 'La fiesta es aquí. / Ella está aquí.'],
      ['O café é quente. / O café está quente.', 'El café es caliente. / El café está caliente ahora.'],
      ['São três horas. / Estamos em março.', 'Son las tres. / Estamos en marzo.'],
      ['A porta está fechada. / A porta é vermelha.', 'La puerta está cerrada. / La puerta es roja.'],
      ['Sou do Brasil. / Estou em Portugal.', 'Soy de Brasil. / Estoy en Portugal.'],
      ['Ela é bonita. / Ela está bonita hoje.', 'Ella es bonita. / Ella está bonita hoy.'],
    ],
    learnerModes: ['ser: identidad/esencia', 'estar: estado temporal', 'pares contrastivos', 'ubicación'],
    reviewFocus: ['ser profesión/origen', 'estar emoción/estado', 'ubicación persona vs evento', 'pares quente/frio, nervoso, bonito'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Ser o Estar: elige la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige entre ser o estar la forma correcta según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'La profesión',
            lines: [['Ana', 'Minha irmã ___ médica. Ela trabalha no hospital central.']],
            options: ['é', 'está', 'era', 'estava'],
            answer: 'é',
            explain: '"Ser" para profesión: "ela é médica" es una identidad, no un estado temporal.',
          },
          {
            scene: 'El estado',
            lines: [['Carlos', 'Depois da corrida, eu ___ muito cansado.']],
            options: ['estou', 'sou', 'fui', 'era'],
            answer: 'estou',
            explain: '"Estar" para estado físico temporal: "estou cansado" = estoy cansado ahora.',
          },
          {
            scene: 'El banco',
            lines: [['Pedro', 'O banco ___ fechado hoje porque é feriado.']],
            options: ['está', 'é', 'foi', 'era'],
            answer: 'está',
            explain: '"Estar" para estado temporal de abierto/cerrado: "o banco está fechado."',
          },
          {
            scene: 'La fiesta',
            lines: [['Maria', 'A festa ___ na casa do Carlos amanhã às 8h.']],
            options: ['é', 'está', 'foi', 'estava'],
            answer: 'é',
            explain: '"Ser" para la localización de eventos: "a festa é na casa do Carlos."',
          },
          {
            scene: 'La sopa',
            lines: [['Hugo', 'Cuidado, a sopa ___ muito quente!']],
            options: ['está', 'é', 'foi', 'era'],
            answer: 'está',
            explain: '"Estar" para temperatura actual temporal: "a sopa está quente" (ahora está caliente).',
          },
          {
            scene: 'El carácter',
            lines: [['Clara', 'Meu chefe ___ muito nervoso. Ele sempre reage assim.']],
            options: ['é', 'está', 'foi', 'era'],
            answer: 'é',
            explain: '"Ser" para rasgo de carácter permanente: "ele é nervoso" (es una persona nerviosa).',
          },
          {
            scene: 'La ubicación',
            lines: [['Lina', 'Onde você ___ agora? Estou procurando você.']],
            options: ['está', 'é', 'foi', 'era'],
            answer: 'está',
            explain: '"Estar" para ubicación de persona: "onde você está?" (¿dónde estás?).',
          },
          {
            scene: 'El material',
            lines: [['Sofia', 'Esta mesa ___ de madeira e muito resistente.']],
            options: ['é', 'está', 'foi', 'era'],
            answer: 'é',
            explain: '"Ser" para material: "é de madeira" = es de madera. Característica esencial.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Ser y Estar en contexto',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de ser o estar en cada espacio.',
        type: 'dual',
        items: [
          {
            scene: 'La médica',
            lines: [['Ana', 'Minha amiga [[0]] médica, mas hoje ela [[1]] em casa descansando.']],
            blanks: [
              { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para profesión: ela é médica.' },
              { options: ['está', 'é', 'foi'], answer: 'está', explain: '"Estar" para ubicación temporal: ela está em casa.' },
            ],
          },
          {
            scene: 'El café',
            lines: [['Carlos', 'Este café [[0]] muito bom, mas [[1]] um pouco frio agora.']],
            blanks: [
              { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para característica esencial: o café é bom.' },
              { options: ['está', 'é', 'foi'], answer: 'está', explain: '"Estar" para temperatura actual: está frio agora.' },
            ],
          },
          {
            scene: 'La reunión',
            lines: [['Pedro', 'A reunião [[0]] na sala 5 e os participantes [[1]] esperando.']],
            blanks: [
              { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para localización de evento: a reunião é na sala 5.' },
              { options: ['estão', 'são', 'foram'], answer: 'estão', explain: '"Estar" para estado de personas: estão esperando.' },
            ],
          },
          {
            scene: 'La descripción',
            lines: [['Maria', 'Ela [[0]] bonita naturalmente, mas hoje ela [[1]] ainda mais bonita com esse vestido.']],
            blanks: [
              { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para característica permanente: ela é bonita.' },
              { options: ['está', 'é', 'foi'], answer: 'está', explain: '"Estar" para estado circunstancial: hoje ela está ainda mais bonita.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción de un día laboral',
        tag: 'Texto guiado',
        intro: 'Elige entre ser y estar la forma correcta para completar este texto.',
        type: 'guidedText',
        scene: 'Un día en la vida de una médica',
        text: 'Luisa [[0]] médica há cinco anos. Hoje ela [[1]] de plantão no hospital. O hospital [[2]] no centro da cidade. Esta manhã, ela [[3]] muito ocupada com vários pacientes. Um deles [[4]] nervoso e ela teve que calmar a situação com paciência.',
        blanks: [
          { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para profesión: Luisa é médica.' },
          { options: ['está', 'é', 'foi'], answer: 'está', explain: '"Estar" para estado temporal: está de plantão (está de guardia).' },
          { options: ['é', 'está', 'foi'], answer: 'é', explain: '"Ser" para ubicación permanente de lugar: o hospital é no centro.' },
          { options: ['estava', 'era', 'foi'], answer: 'estava', explain: '"Estar" para estado temporal en pasado: ela estava ocupada.' },
          { options: ['estava', 'era', 'foi'], answer: 'estava', explain: '"Estar" para estado emocional momentáneo: estava nervoso.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe ser o estar',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de ser o estar según el contexto.',
        type: 'freeText',
        scene: 'Describiendo personas y situaciones',
        text: 'Meu irmão [[0]] engenheiro e trabalha em São Paulo. Hoje ele [[1]] cansado depois de um dia longo. A empresa dele [[2]] no bairro Berrini. A reunião de amanhã [[3]] no décimo andar. Quando cheguei na festa, todos [[4]] animados e felizes.',
        blanks: [
          { answer: 'é', explain: '"Ser" para profesión: meu irmão é engenheiro.' },
          { answer: 'está', explain: '"Estar" para estado físico temporal: ele está cansado.' },
          { answer: 'é', explain: '"Ser" para localización permanente de empresa: a empresa é no Berrini.' },
          { answer: 'é', explain: '"Ser" para localización de evento: a reunião é no décimo andar.' },
          { answer: 'estavam', explain: '"Estar" para estado emocional en pasado: estavam animados.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Corrige los errores',
        tag: 'Escritura guiada',
        intro: 'Corrige el error de ser/estar en cada oración y explica por qué.',
        type: 'write',
        items: [
          {
            scene: 'La profesión',
            prompt: 'Corrige: "Ela está professora de matemática há dez anos." → Ela ___ professora...',
            answer: 'Ela é professora de matemática há dez anos.',
            accepted: ['ela é professora de matemática', 'é professora de matemática'],
            explain: '"Ser" para profesión, no "estar". Profesión = identidad permanente.',
          },
          {
            scene: 'El banco',
            prompt: 'Corrige: "O banco é fechado hoje." → O banco ___ fechado hoje.',
            answer: 'O banco está fechado hoje.',
            accepted: ['o banco está fechado hoje'],
            explain: '"Estar" para estado temporal (abierto/cerrado). "Fechado" es estado, no esencia.',
          },
          {
            scene: 'La ubicación',
            prompt: 'Corrige: "Onde é você agora?" → Onde ___ você agora?',
            answer: 'Onde você está agora?',
            accepted: ['onde você está agora', 'onde está você agora'],
            explain: '"Estar" para ubicación de persona. "Onde você está?" = ¿Dónde estás?',
          },
          {
            scene: 'El estado',
            prompt: 'Corrige: "Ele é muito nervoso porque tem uma entrevista hoje." → Ele ___ nervoso porque...',
            answer: 'Ele está nervoso porque tem uma entrevista hoje.',
            accepted: ['ele está nervoso porque tem uma entrevista'],
            explain: '"Estar" para estado emocional momentáneo: entrevista hoy = estado temporal.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe personas y situaciones',
        tag: 'Escritura libre',
        intro: 'Escribe sobre personas y situaciones de tu vida usando ser y estar correctamente.',
        type: 'write',
        items: [
          {
            scene: 'Tu mejor amigo/a',
            prompt: 'Describe a tu mejor amigo/a usando ser para características permanentes y estar para estados actuales.',
            answer: 'Meu melhor amigo é arquiteto e muito criativo. Hoje ele está ocupado com um projeto novo.',
            accepted: ['é', 'está', 'é muito', 'está muito', 'é arquiteto', 'está ocupado'],
            explain: 'Usa ser para: professão, características, origem. Usar estar para: estado atual.',
          },
          {
            scene: 'El lugar',
            prompt: 'Describe un lugar que conoces usando ser para sus características y estar para la situación actual.',
            answer: 'O museu é muito grande e fica no centro. Hoje está fechado por reforma.',
            accepted: ['é', 'está', 'está fechado', 'é grande', 'é bonito', 'é no centro'],
            explain: 'Ser para características del lugar; estar para el estado actual (abierto/cerrado/lleno).',
          },
          {
            scene: 'Tú mismo',
            prompt: 'Describe quién eres (ser) y cómo te sientes hoy (estar).',
            answer: 'Sou estudante de português e sou muito dedicado. Hoje estou animado porque aprendi o condicional.',
            accepted: ['sou', 'estou', 'sou estudante', 'estou animado', 'estou cansado', 'estou feliz'],
            explain: 'Sou + profesión/nacionalidad/característica. Estou + estado de ánimo/condición actual.',
          },
        ],
      },
    ],
  },
}

export default topic
