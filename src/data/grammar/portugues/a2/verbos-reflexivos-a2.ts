import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-reflexivos-a2',
  order: '06',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Verbos Reflexivos com Se em Português A2',
  shortTitle: 'Verbos reflexivos',
  metaTitle: 'Verbos reflexivos com se português A2 — levantar-se, chamar-se, sentar-se',
  description:
    'Los verbos reflexivos en portugués se forman añadiendo el pronombre "se" al infinitivo (levantar-se, sentar-se, chamar-se). En la conjugación, "se" cambia según la persona: me, te, se, nos, se. En Brasil coloquial, el pronombre suele ir antes del verbo en la mayoría de los contextos.',
  lead: 'Los verbos reflexivos indican que la acción recae sobre el mismo sujeto: "Eu me chamo Ana." / "Ele se levantou cedo." En Brasil se usa principalmente con me, te, se, nos.',
  outcomes: [
    'Conjuga verbos reflexivos en el presente con me, te, se, nos',
    'Forma oraciones reflexivas afirmativas y negativas',
    'Usa verbos comunes como chamar-se, levantar-se, sentar-se, lembrar-se',
    'Reconoce la diferencia entre el uso reflexivo y el no reflexivo',
  ],

  guide: {
    goal: 'Conjugar y usar los verbos reflexivos más comunes del portugués en oraciones cotidianas.',
    model: 'Eu me chamo David. Ela se levanta às 7h. Nós nos sentamos na frente.',
    formula: 'me (eu) | te (tu/você) | se (ele/ela/você) | nos (nós) | se (eles/vocês)',
    decisions: [
      '"Chamar-se" → uso reflexivo: "Como você se chama?" / "Eu me chamo Zhanna."',
      '"Levantar-se" → acción reflexiva: "Eu me levanto às 6h da manhã todos os dias."',
      '"Sentar-se" → acción reflexiva: "Sente-se, por favor." / "Ela se sentou na cadeira."',
      '"Lembrar-se de" → recuerdo: "Você se lembra do meu nome?" / "Eu não me lembro."',
      '"Machucar-se" → hacerse daño: "Ela se machucou na queda."',
      'En Brasil el pronombre reflexivo normalmente precede al verbo: "Eu me levantei" (no "Levantei-me").',
    ],
    table: [
      ['Persona', 'Reflexivo', 'Ejemplo con levantar-se'],
      ['eu', 'me', 'Eu me levanto cedo.'],
      ['tu/você', 'te / se', 'Você se levanta tarde?'],
      ['ele/ela', 'se', 'Ele se levantou às 7h.'],
      ['nós', 'nos', 'Nós nos levantamos juntos.'],
      ['vocês/eles', 'se', 'Eles se levantaram tarde.'],
    ],
    mistakes: [
      '"Eu chamo Ana" ✗ (sin reflexivo) → "Eu me chamo Ana" ✓ cuando introduces tu nombre.',
      '"Eu levanto-me" es la forma europea; en Brasil se dice "Eu me levanto" (pronombre antes del verbo).',
      'No omitir "se" en la forma infinitiva del verbo: "levantar" ≠ "levantar-se". Son verbos distintos.',
      '"Eu se levanto" ✗ → "Eu me levanto" ✓. El pronombre debe concordar con la persona.',
    ],
  },

  seo: [
    {
      heading: 'Verbos reflexivos en portugués: qué son y cómo se forman',
      paragraphs: [
        'Los verbos reflexivos en portugués son aquellos en los que el sujeto realiza y recibe la acción al mismo tiempo. Se identifican porque el infinitivo lleva el pronombre "se" unido con guion: levantar-se, sentar-se, chamar-se, lembrar-se. Al conjugarlos, el "se" cambia según la persona: me, te, se, nos.',
        'En el portugués europeo, el pronombre reflexivo tiende a ir después del verbo en oraciones afirmativas: "Levantei-me cedo." Sin embargo, en el portugués brasileño, que es el que se enseña en este nivel, el pronombre va antes del verbo: "Eu me levantei cedo." Esta posición es la más natural y frecuente en Brasil.',
      ],
    },
    {
      heading: 'Verbos reflexivos más comunes en A2',
      paragraphs: [
        'Los verbos reflexivos más útiles para el nivel A2 incluyen: chamar-se (llamarse), levantar-se (levantarse), sentar-se (sentarse), lembrar-se de (recordarse de), machucar-se (hacerse daño), preocupar-se com (preocuparse por), preparar-se (prepararse), divertir-se (divertirse).',
        'Algunos verbos como "casar-se" (casarse), "formar-se" (graduarse) y "mudar-se" (mudarse) son especialmente útiles en conversaciones cotidianas y aparecen con frecuencia en textos de nivel A2 a B1.',
      ],
    },
    {
      heading: 'Negación y preguntas con verbos reflexivos',
      paragraphs: [
        'En las oraciones negativas, la estructura es: não + pronombre reflexivo + verbo: "Eu não me lembro do seu nome." / "Ela não se sentou." La posición del pronombre no cambia en la negación en el portugués brasileño.',
        'En preguntas, el orden es el mismo que en afirmativas: "Você se lembra do aniversário?" / "Como você se chama?" En el habla cotidiana brasileña, el orden de palabras es muy flexible.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a conjugar verbos reflexivos y usarlos en situaciones cotidianas.',
    graphicPrompt: 'Personas realizando acciones reflexivas: levantarse, sentarse, presentarse, recordar.',
    scene: [
      ['Eu me chamo Carlos.', 'Me llamo Carlos.'],
      ['Ela se levanta às 6h da manhã.', 'Ella se levanta a las 6 de la mañana.'],
      ['Sente-se, por favor.', 'Siéntese, por favor.'],
      ['Nós nos preparamos para a viagem.', 'Nosotros nos preparamos para el viaje.'],
      ['Você se lembra do meu número?', '¿Recuerdas mi número?'],
      ['Ele se machucou jogando futebol.', 'Él se lastimó jugando fútbol.'],
      ['Elas se divertiram na festa.', 'Ellas se divirtieron en la fiesta.'],
      ['Eu não me lembro do nome dele.', 'No recuerdo su nombre.'],
    ],
    learnerModes: ['rutina diaria: levantarse/prepararse', 'presentación: chamar-se', 'memoria: lembrar-se de'],
    reviewFocus: ['me/te/se/nos', 'posición del pronombre', 'chamar-se/levantar-se/lembrar-se', 'negación'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el reflexivo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma reflexiva correcta para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'La presentación',
            lines: [['Ana', 'Como você ___? Eu ___ chamo Ana.']],
            options: ['me chamo', 'chamo', 'se chamo', 'te chamo'],
            answer: 'me chamo',
            explain: '"Chamar-se": eu me chamo (yo me llamo). El pronombre reflexivo de 1ª persona es "me".',
          },
          {
            scene: 'La rutina',
            lines: [['Carlos', 'Ela ___ levanta às 6h todos os dias.']],
            options: ['se', 'me', 'te', 'nos'],
            answer: 'se',
            explain: '"Levantar-se": ela se levanta. El pronombre reflexivo de 3ª persona es "se".',
          },
          {
            scene: 'La reunión',
            lines: [['Pedro', '___, por favor. A reunião vai começar.']],
            options: ['Sente-se', 'Senta-se', 'Se senta', 'Sentamos'],
            answer: 'Sente-se',
            explain: 'Imperativo de "sentar-se": Sente-se (siéntese). Forma de cortesía.',
          },
          {
            scene: 'El recuerdo',
            lines: [['Maria', 'Você ___ do que aconteceu na festa?']],
            options: ['se lembra', 'lembra', 'me lembra', 'nos lembra'],
            answer: 'se lembra',
            explain: '"Lembrar-se de": você se lembra (¿te recuerdas?). Pronombre de 2ª cortesía: se.',
          },
          {
            scene: 'El accidente',
            lines: [['David', 'Ele ___ ao cair da bicicleta.']],
            options: ['se machucou', 'machucou', 'me machucou', 'nos machucou'],
            answer: 'se machucou',
            explain: '"Machucar-se": ele se machucou (él se lastimó). Pronombre reflexivo de 3ª: se.',
          },
          {
            scene: 'La fiesta',
            lines: [['Zhanna', 'Nós ___ muito na festa de aniversário.']],
            options: ['nos divertimos', 'divertimos', 'se divertimos', 'me divertimos'],
            answer: 'nos divertimos',
            explain: '"Divertir-se": nós nos divertimos. Pronombre reflexivo de 1ª plural: nos.',
          },
          {
            scene: 'La negación',
            lines: [['Lina', 'Eu não ___ do endereço da festa.']],
            options: ['me lembro', 'lembro', 'se lembro', 'lembro-me'],
            answer: 'me lembro',
            explain: 'Negación + reflexivo: "eu não me lembro". En Brasil el pronombre va antes del verbo.',
          },
          {
            scene: 'La preparación',
            lines: [['Sofia', 'Eles ___ para a prova a noite toda.']],
            options: ['se prepararam', 'prepararam', 'me prepararam', 'nos prepararam'],
            answer: 'se prepararam',
            explain: '"Preparar-se": eles se prepararam (ellos se prepararon). Pronombre de 3ª plural: se.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos verbos reflexivos',
        tag: '2 espacios',
        intro: 'Completa las oraciones con la forma reflexiva correcta de los verbos entre paréntesis.',
        type: 'dual',
        items: [
          {
            scene: 'La rutina matinal',
            lines: [['Ana', 'Eu [[0]] (levantar-se) às 7h e depois [[1]] (preparar-se) para o trabalho.']],
            blanks: [
              { options: ['me levanto', 'levanto', 'se levanto'], answer: 'me levanto', explain: '"Levantar-se": eu me levanto.' },
              { options: ['me preparo', 'preparo', 'se preparo'], answer: 'me preparo', explain: '"Preparar-se": eu me preparo.' },
            ],
          },
          {
            scene: 'El olvido',
            lines: [['Carlos', 'Você [[0]] (lembrar-se) do endereço? Eu não [[1]] (lembrar-se) de nada.']],
            blanks: [
              { options: ['se lembra', 'lembra', 'me lembra'], answer: 'se lembra', explain: '"Lembrar-se": você se lembra.' },
              { options: ['me lembro', 'lembro', 'se lembro'], answer: 'me lembro', explain: '"Lembrar-se" en negación: eu não me lembro.' },
            ],
          },
          {
            scene: 'La presentación',
            lines: [['Pedro', 'Como você [[0]] (chamar-se)? Eu [[1]] (chamar-se) Pedro.']],
            blanks: [
              { options: ['se chama', 'chama', 'me chama'], answer: 'se chama', explain: '"Chamar-se": você se chama (cómo te llamas).' },
              { options: ['me chamo', 'chamo', 'se chamo'], answer: 'me chamo', explain: '"Chamar-se": eu me chamo Pedro.' },
            ],
          },
          {
            scene: 'El fin de semana',
            lines: [['Maria', 'Nós [[0]] (divertir-se) muito e depois [[1]] (sentar-se) para descansar.']],
            blanks: [
              { options: ['nos divertimos', 'divertimos', 'se divertimos'], answer: 'nos divertimos', explain: '"Divertir-se": nós nos divertimos.' },
              { options: ['nos sentamos', 'sentamos', 'se sentamos'], answer: 'nos sentamos', explain: '"Sentar-se": nós nos sentamos.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La rutina diaria de Ana',
        tag: 'Texto guiado',
        intro: 'Elige la forma reflexiva correcta para completar el texto sobre la rutina de Ana.',
        type: 'guidedText',
        scene: 'La mañana de Ana en São Paulo',
        text: 'Ana [[0]] (levantar-se) às 6h30. Depois [[1]] (preparar-se) rapidamente para o trabalho. No ônibus, ela não [[2]] (lembrar-se) de que tinha uma reunião importante. Quando chegou ao escritório, [[3]] (sentar-se) e ligou para o chefe. No fim do dia, ela e os colegas [[4]] (divertir-se) em um jantar de equipe.',
        blanks: [
          { options: ['se levanta', 'levanta', 'me levanta'], answer: 'se levanta', explain: '"Levantar-se": ela se levanta (ella se levanta).' },
          { options: ['se prepara', 'prepara', 'me prepara'], answer: 'se prepara', explain: '"Preparar-se": ela se prepara.' },
          { options: ['se lembrou', 'lembrou', 'me lembrou'], answer: 'se lembrou', explain: '"Lembrar-se" en negación: não se lembrou.' },
          { options: ['se sentou', 'sentou', 'me sentou'], answer: 'se sentou', explain: '"Sentar-se": ela se sentou.' },
          { options: ['se divertiram', 'divertiram', 'nos divertiram'], answer: 'se divertiram', explain: '"Divertir-se": eles se divertiram.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el reflexivo',
        tag: 'Texto libre',
        intro: 'Escribe la forma reflexiva correcta del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Una conversación en el trabajo',
        text: 'Oi, como você [[0]] (chamar-se)? Eu [[1]] (chamar-se) Marcos. Você [[2]] (lembrar-se) de mim? Nós [[3]] (conhecer-se) na conferência do ano passado. Hoje eu [[4]] (preparar-se) para apresentar o projeto novo.',
        blanks: [
          { answer: 'se chama', explain: '"Chamar-se": você se chama (cómo te llamas).' },
          { answer: 'me chamo', explain: '"Chamar-se": eu me chamo Marcos.' },
          { answer: 'se lembra', explain: '"Lembrar-se de": você se lembra (¿te recuerdas?).' },
          { answer: 'nos conhecemos', explain: '"Conhecer-se": nós nos conhecemos (nos conocimos).' },
          { answer: 'me preparo', explain: '"Preparar-se": eu me preparo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Forma oraciones reflexivas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en portugués con el verbo reflexivo indicado.',
        type: 'write',
        items: [
          {
            scene: 'La presentación',
            prompt: 'Escribe cómo te presentas en portugués: Mi nombre es ___ → Eu me ___ ___.',
            answer: 'Eu me chamo Ana.',
            accepted: ['eu me chamo', 'me chamo'],
            explain: '"Chamar-se" para presentarse: eu me chamo + nombre.',
          },
          {
            scene: 'La rutina',
            prompt: 'Escribe: Ella se levanta a las 7 de la mañana. → Ela ___ levanta ___.',
            answer: 'Ela se levanta às 7h da manhã.',
            accepted: ['ela se levanta às 7', 'ela se levanta as 7', 'ela se levanta de manhã'],
            explain: '"Levantar-se": ela se levanta + hora.',
          },
          {
            scene: 'El olvido',
            prompt: 'Escribe: Yo no me acuerdo del número. → Eu não ___ lembro ___.',
            answer: 'Eu não me lembro do número.',
            accepted: ['eu não me lembro do número', 'não me lembro do número'],
            explain: 'Negación + reflexivo: "não me lembro de..."',
          },
          {
            scene: 'La fiesta',
            prompt: 'Escribe: Nosotros nos divertimos mucho en la fiesta. → Nós ___ divertimos ___.',
            answer: 'Nós nos divertimos muito na festa.',
            accepted: ['nós nos divertimos muito', 'nos divertimos muito na festa'],
            explain: '"Divertir-se": nós nos divertimos muito.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu rutina con reflexivos',
        tag: 'Escritura libre',
        intro: 'Usa verbos reflexivos para describir situaciones de tu vida cotidiana.',
        type: 'write',
        items: [
          {
            scene: 'Tu mañana',
            prompt: 'Describe tu rutina matinal usando al menos dos verbos reflexivos (levantar-se, preparar-se, arrumar-se).',
            answer: 'Eu me levanto às 7h e me preparo para o trabalho rapidamente.',
            accepted: ['me levanto', 'me preparo', 'me arrumo', 'me visto'],
            explain: 'Usa: me levanto, me preparo, me arrumo, me visto, me acordo.',
          },
          {
            scene: 'Una presentación',
            prompt: 'Preséntate como si estuvieras en una reunión de trabajo en Brasil (usa chamar-se y lembrar-se).',
            answer: 'Olá, eu me chamo Carlos. Você se lembra de mim?',
            accepted: ['me chamo', 'se lembra', 'eu me chamo', 'você se lembra'],
            explain: 'Usa: eu me chamo + nombre, você se lembra de + referencia.',
          },
          {
            scene: 'El fin de semana',
            prompt: 'Cuenta qué hiciste el fin de semana usando verbos reflexivos en pasado (se divertiram, nos sentamos, me levantei).',
            answer: 'No fim de semana eu me levantei tarde e nós nos divertimos muito na praia.',
            accepted: ['me levantei', 'nos divertimos', 'se divertiu', 'me sentei', 'nos sentamos'],
            explain: 'En pasado: me levantei, me diverti, nos divertimos, me sentei, nos sentamos.',
          },
        ],
      },
    ],
  },
}

export default topic
