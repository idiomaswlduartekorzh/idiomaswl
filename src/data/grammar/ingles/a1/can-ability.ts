import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'can-ability',
  order: '10',
  color: '#0369a1',
  category: 'Verbs',
  level: 'A1',
  title: 'Can para habilidad en inglés A1',
  shortTitle: 'Can (habilidad)',
  metaTitle: 'Can para habilidad en inglés A1 | Guía para hispanohablantes',
  description: 'Aprende a usar can para expresar habilidad y posibilidad, construir negaciones con can\'t y preguntas con Can you?, con explicación orientada al hispanohablante y práctica progresiva de 6 niveles.',
  lead: 'Can es el primer verbo modal que necesitas en inglés. Expresa lo que puedes o sabes hacer: I can swim, She can speak French. La regla más importante: can nunca cambia según el sujeto (no existe "cans"), y el verbo que sigue siempre va en forma base.',
  outcomes: [
    'Usar can para expresar habilidad con todos los sujetos sin conjugar.',
    'Construir negaciones con can\'t y preguntas con Can + subject?',
    'Responder preguntas con can de forma corta y natural.',
  ],
  guide: {
    goal: 'Expresar lo que sabes o puedes hacer usando can sin añadir -s ni conjugar el verbo siguiente.',
    model: 'Can no se conjuga: I can, you can, he can, she can, it can, we can, they can. El verbo que sigue: forma base. No "can swims" ni "can to swim".',
    formula: 'subject + can + verb (base) | subject + can\'t + verb (base) | Can + subject + verb (base)?',
    decisions: [
      'can → afirmativo: I can play the guitar.',
      'can\'t / cannot → negativo: She can\'t drive.',
      'Can…? → pregunta: Can you help me?',
      'Respuesta corta: Yes, I can. / No, I can\'t.',
      'NUNCA: cans / can\'s / can + to + verb / can + verb-s.',
    ],
    table: [
      ['Forma', 'Ejemplo', 'Error frecuente'],
      ['Afirmativo', 'I can swim.', 'I cans swim. ✗'],
      ['Negativo', 'She can\'t drive.', 'She doesn\'t can drive. ✗'],
      ['Pregunta', 'Can they speak English?', 'Do they can speak? ✗'],
      ['Respuesta', 'Yes, I can. / No, I can\'t.', 'Yes, I can do. ✗'],
    ],
    mistakes: [
      '"She cans play piano." → She can play piano. Can nunca lleva -s.',
      '"I can to swim." → I can swim. Después de can: forma base, sin "to".',
      '"Do you can speak English?" → Can you speak English? Can ya es auxiliar; no necesita do.',
    ],
  },
  seo: [
    {
      heading: 'Qué expresa can y por qué es el primer modal que necesitas',
      paragraphs: [
        'Can es un verbo modal que expresa principalmente habilidad (lo que alguien sabe hacer: I can swim), posibilidad o permiso en A1 (Can I open the window?). En español lo traducimos como poder o saber dependiendo del contexto: I can swim = Sé nadar o Puedo nadar, Can I come in? = ¿Puedo entrar?',
        'Es el primer modal que se aprende porque es el más frecuente en conversaciones A1: presentarte describiendo lo que sabes hacer, pedir permiso, ofrecer ayuda, hacer preguntas sobre habilidades. Con can puedes construir decenas de frases útiles desde el primer día.',
      ],
    },
    {
      heading: 'La regla más importante: can no se conjuga',
      paragraphs: [
        'Can es un verbo modal y los verbos modales en inglés tienen una propiedad fundamental: no se conjugan según el sujeto. No existen "cans", "canning", ni "caned" en este sentido. Para todos los pronombres la forma es siempre can: I can, you can, he can, she can, it can, we can, they can.',
        'Esto contrasta con el español donde conjugamos: yo puedo, tú puedes, él puede, nosotros podemos, ellos pueden. El hispanohablante a veces añade -s por inercia: "she cans swim". Esta forma no existe en inglés. También contrasta con la tendencia a añadir "to" después: "I can to swim" no existe. Después de can va directamente la forma base del verbo: can swim, can speak, can help.',
      ],
    },
    {
      heading: 'Negativo: can\'t vs cannot',
      paragraphs: [
        'La forma negativa es can\'t (contracción informal) o cannot (una sola palabra, más formal o enfática). I can\'t swim. She cannot come tomorrow. En conversación cotidiana can\'t es la forma estándar. Cannot se usa en textos formales o para enfatizar: You simply cannot do that here.',
        'El error frecuente del hispanohablante es construir la negación con don\'t: "She doesn\'t can drive." En inglés los modales no usan do/does para negar. Solo añade not: can + not = can\'t/cannot.',
      ],
    },
    {
      heading: 'Preguntas con can: inversión directa',
      paragraphs: [
        'Para hacer preguntas con can, invierte el orden entre can y el sujeto. I can swim → Can I swim? She can speak French → Can she speak French? No se usa do/does: Do you can speak English? es incorrecto. La estructura es: Can + subject + verb (base)?',
        'Las respuestas cortas usan can o can\'t: Can you drive? Yes, I can. / No, I can\'t. Nota que en la respuesta corta afirmativa no se añade el verbo principal: Yes, I can drive is complete but "Yes, I can" is the natural short answer.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "She cans play the guitar." → She can play the guitar. Can nunca lleva -s. Error 2: "I can to drive." → I can drive. Sin "to" después de can. Error 3: "Do you can help me?" → Can you help me? No se usa do con modales. Error 4: "Yes, I can do." → Yes, I can. La respuesta corta termina en can.',
      ],
      examples: [
        ['Incorrecto', 'He cans speak English.', 'Correcto', 'He can speak English.'],
        ['Incorrecto', 'I can to swim very fast.', 'Correcto', 'I can swim very fast.'],
        ['Incorrecto', 'Do they can come tomorrow?', 'Correcto', 'Can they come tomorrow?'],
      ],
    },
  ],
  visual: {
    mode: 'modal-rule',
    teacherLens: 'El estudiante aprende que can nunca cambia y que el verbo siguiente siempre va en forma base.',
    graphicPrompt: 'Sujeto + can (invariable) + verbo base. Nunca: cans, can to, do can.',
    scene: [['I / he / she / they', 'can (no change)'], ['can + base verb', 'can swim, can speak'], ['can\'t / Can...?', 'negative / question']],
    learnerModes: ['visual: tabla modal invariable', 'analítico: estructura comparada', 'oral: presentación de habilidades'],
    practiceVerbs: ['Declara', 'Niega', 'Pregunta', 'Responde', 'Corrige', 'Describe'],
    reviewFocus: ['can sin -s', 'forma base después de can', 'pregunta sin do', 'can\'t vs don\'t'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta con can para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Habilidad propia',
            lines: [['Carlos', 'I ___ speak English and a little French.']],
            options: ['can', 'cans', 'can to', 'do can'],
            answer: 'can',
            explain: 'Can no se conjuga. I can speak.',
          },
          {
            scene: 'Habilidad de ella',
            lines: [['Teacher', 'Sofia ___ play the piano very well.']],
            options: ['can', 'cans', 'can to', 'is can'],
            answer: 'can',
            explain: 'She can (no she cans). La forma no cambia.',
          },
          {
            scene: 'Negando una habilidad',
            lines: [['Ana', 'I ___ drive. I don\'t have a license.']],
            options: ['can', 'can\'t', 'don\'t can', 'not can'],
            answer: 'can\'t',
            explain: 'Negativo de can: can\'t (no don\'t can).',
          },
          {
            scene: 'Preguntando por habilidad',
            lines: [['Teacher', '___ you read this sentence aloud?']],
            options: ['Can', 'Do can', 'Are', 'Is'],
            answer: 'Can',
            explain: 'Pregunta con modal: Can + subject + verb. Sin do.',
          },
          {
            scene: 'Habilidad del grupo',
            lines: [['David', 'My students ___ understand English at A1 level.']],
            options: ['can', 'cans', 'can to', 'are can'],
            answer: 'can',
            explain: 'They can. Can es invariable para todos los sujetos.',
          },
          {
            scene: 'Ofreciendo ayuda',
            lines: [['Lina', '___ I help you with your homework?']],
            options: ['Can', 'Do I can', 'Am', 'I can'],
            answer: 'Can',
            explain: 'Pregunta de oferta: Can I + verb?',
          },
          {
            scene: 'Respuesta corta',
            lines: [['Teacher', 'Can you come to class tomorrow?'], ['Student', 'Yes, I ___.']],
            options: ['can', 'cans', 'can do', 'can come'],
            answer: 'can',
            explain: 'Respuesta corta afirmativa: Yes, I can.',
          },
          {
            scene: 'Negando habilidad de él',
            lines: [['Marco', 'My brother ___ swim but he wants to learn.']],
            options: ['can', 'can\'t', 'don\'t', 'isn\'t'],
            answer: 'can\'t',
            explain: 'He can\'t swim. Negativo de can para cualquier sujeto: can\'t.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos usos de can en un diálogo',
        tag: '2 espacios',
        intro: 'Completa las dos estructuras con can en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Presentando habilidades',
            lines: [['Student', 'I [[0]] speak English and I [[1]] drive yet, but I want to learn.']],
            blanks: [
              { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'Habilidad positiva: I can speak.' },
              { options: ['can', 'can\'t', 'cans'], answer: 'can\'t', explain: 'Habilidad negativa: I can\'t drive.' },
            ],
          },
          {
            scene: 'Pidiendo y ofreciendo ayuda',
            lines: [['Carlos', '[[0]] you help me with exercise 3?'], ['Ana', 'Sure! I [[1]] explain it to you.']],
            blanks: [
              { options: ['Can', 'Do', 'Are'], answer: 'Can', explain: 'Pregunta de petición: Can you + verb?' },
              { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'Oferta: I can explain.' },
            ],
          },
          {
            scene: 'Describiendo habilidades',
            lines: [['Teacher', 'David [[0]] speak eight languages. He [[1]] understand basic Korean too.']],
            blanks: [
              { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'He can (invariable) speak.' },
              { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'He can understand. Sin "to" después de can.' },
            ],
          },
          {
            scene: 'Pregunta y respuesta',
            lines: [['Lina', '[[0]] your sister cook?'], ['Sofia', 'No, she [[1]]. She always orders food online.']],
            blanks: [
              { options: ['Can', 'Do', 'Does'], answer: 'Can', explain: 'Pregunta con modal: Can + subject?' },
              { options: ['can', 'can\'t', 'doesn\'t'], answer: 'can\'t', explain: 'Respuesta negativa corta: she can\'t.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Elige la forma correcta de can para completar la presentación de habilidades.',
        type: 'guidedText',
        scene: 'Presentación de habilidades de un estudiante A1',
        text: 'My name is Carlos. I [[0]] speak Spanish and basic English. I [[1]] drive but I [[2]] ride a bicycle. In my free time I [[3]] play the guitar a little. My sister is more talented: she [[4]] play three instruments. We [[5]] both sing, but not very well. [[6]] you play any instrument?',
        blanks: [
          { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'I can speak (habilidad positiva).' },
          { options: ['can', 'can\'t', 'cans'], answer: 'can\'t', explain: 'I can\'t drive (habilidad negativa).' },
          { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'I can ride (habilidad positiva).' },
          { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'I can play (habilidad positiva, "a little" la califica).' },
          { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'She can (no she cans) play.' },
          { options: ['can', 'can\'t', 'cans'], answer: 'can', explain: 'We can both sing.' },
          { options: ['Can', 'Do', 'Are'], answer: 'Can', explain: 'Pregunta con modal: Can you + verb?' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe can, can\'t o Can + subject sin ayuda.',
        type: 'freeText',
        scene: 'Habilidades del equipo WeLearn',
        text: 'David [[0]] speak eight languages fluently. He [[1]] play the piano but he [[2]] cook very well. Zhanna [[3]] teach English and other languages. Together they [[4]] help students from many different countries. [[5]] they understand A1 students? Absolutely yes!',
        blanks: [
          { answer: 'can', explain: 'David can speak.' },
          { answer: 'can\'t', accepted: ['cannot', 'can not', 'cant'], explain: 'He can\'t play the piano.' },
          { answer: 'can', explain: 'He can cook.' },
          { answer: 'can', explain: 'Zhanna can teach.' },
          { answer: 'can', explain: 'Together they can help.' },
          { answer: 'Can', explain: 'Pregunta con modal: Can they...?' },
        ],
      },
      {
        id: 'l5',
        title: 'Construyendo con can',
        tag: 'Producción',
        intro: 'Escribe la frase completa usando can, can\'t o Can...?',
        type: 'write',
        items: [
          {
            scene: 'Describiendo una habilidad',
            prompt: 'Escribe: She / can / speak / three languages.',
            answer: 'She can speak three languages.',
            accepted: ['she can speak three languages'],
            explain: 'She can (invariable) + speak (forma base).',
          },
          {
            scene: 'Negando una habilidad',
            prompt: 'Escribe: He / can\'t / swim.',
            answer: 'He can\'t swim.',
            accepted: ['he can\'t swim', 'he cannot swim', 'he can not swim'],
            explain: 'He can\'t + swim (forma base).',
          },
          {
            scene: 'Pregunta de habilidad',
            prompt: 'Escribe: Can / you / understand / English / songs?',
            answer: 'Can you understand English songs?',
            accepted: ['can you understand english songs', 'can you understand english songs?'],
            explain: 'Can + you + understand (forma base)? Sin do.',
          },
          {
            scene: 'Respuesta doble',
            prompt: 'Answer yes and no: Can you cook? Yes, I ___. Can you drive? No, I ___.',
            answer: 'Yes, I can. No, I can\'t.',
            accepted: ['yes i can no i can\'t', 'yes i can no i cant', 'yes, i can. no, i can\'t.'],
            explain: 'Respuestas cortas: Yes, I can. / No, I can\'t.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Usa can para presentar tus habilidades y hacer preguntas reales.',
        type: 'write',
        items: [
          {
            scene: 'Presentación de habilidades',
            prompt: 'Tell two things you can do and one you can\'t: I can ___ and I can ___. I can\'t ___.',
            answer: 'I can speak Spanish and I can read English. I can\'t drive.',
            accepted: ['i can speak spanish and i can read english i can\'t drive', 'i can sing and i can dance i can\'t swim', 'i can cook and i can ride a bike i can\'t play guitar'],
            explain: 'I can + forma base; I can\'t + forma base.',
          },
          {
            scene: 'Preguntando al profesor',
            prompt: 'Ask your teacher: ___ you speak any other languages?',
            answer: 'Can you speak any other languages?',
            accepted: ['can you speak any other languages', 'can you speak any other languages?'],
            explain: 'Can + you + speak? Sin do.',
          },
          {
            scene: 'Describiendo a tu compañero',
            prompt: 'Tell about your classmate: Carlos ___ (play) the guitar but he ___ (not / sing).',
            answer: 'Carlos can play the guitar but he can\'t sing.',
            accepted: ['carlos can play the guitar but he can\'t sing', 'carlos can play the guitar but he cannot sing'],
            explain: 'He can play; he can\'t sing. Can no cambia para he.',
          },
        ],
      },
    ],
  },
}

export default topic
