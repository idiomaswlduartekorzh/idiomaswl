import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'congiunzioni-logiche-a2',
  order: '13',
  color: '#009246',
  category: 'Connettivi',
  level: 'A2',
  title: 'Conjunciones lógicas en italiano A2 — quindi, però, invece, anzi',
  shortTitle: 'Conjunciones lógicas',
  metaTitle: 'Conjunciones italiano A2 — quindi, però, invece, anzi, comunque, tuttavia',
  description:
    'Las conjunciones y conectores lógicos permiten expresar consecuencias, contraposiciones, alternativas y matices. Los más importantes en A2 son: quindi (por lo tanto), però (pero/sin embargo), invece (en cambio/al contrario), anzi (es más/mejor dicho), comunque (de todas formas) y tuttavia (sin embargo).',
  lead: 'quindi (por lo tanto) / però (pero) / invece (en cambio) / anzi (es más/mejor dicho) / comunque (de todas formas) / tuttavia (sin embargo).',
  outcomes: [
    'Usar quindi para expresar consecuencia o conclusión',
    'Usar però e tuttavia para expresar contraste o limitación',
    'Usar invece para contrastar o corregir',
    'Distinguir anzi (rectificación positiva) de però (contraste)',
    'Construir párrafos coherentes con conectores apropiados',
  ],

  guide: {
    goal: 'Conectar ideas de forma lógica usando conjunciones que expresen consecuencia, contraste, corrección o adición.',
    model: 'Non ho tempo, quindi non vengo. / Mi piace, però è difficile. / Non leggo libri, invece guardo film. / È buono, anzi ottimo!',
    formula: '[oración 1] + congiunzione + [oración 2]',
    decisions: [
      'quindi = por lo tanto, así que: Non ho soldi, quindi non compro niente',
      'però = pero, sin embargo: È bella, però costa troppo',
      'invece = en cambio, al contrario: Io studio, invece Marco dorme',
      'anzi = es más, mejor dicho (rectifica hacia algo más fuerte o diferente): È bravo, anzi bravissimo!',
      'comunque = de todas formas, en cualquier caso: Fa freddo, comunque vado a correre',
      'tuttavia = sin embargo (más formal que però): È difficile, tuttavia ci provo',
      'Posición: generalmente entre las dos oraciones, pueden ir al inicio de la segunda oración',
    ],
    table: [
      ['Connettore', 'Significado', 'Ejemplo'],
      ['quindi', 'por lo tanto / así que', 'Piove, quindi resto a casa'],
      ['però', 'pero / sin embargo', "Mi piace l'italiano, però è difficile"],
      ['invece', 'en cambio / al contrario', 'Tu studi, invece io lavoro'],
      ['anzi', 'es más / mejor dicho', 'È buono, anzi delizioso!'],
      ['comunque', 'de todas formas', 'Fa tardi, comunque vengo'],
      ['tuttavia', 'sin embargo (formal)', 'È costoso, tuttavia vale la pena'],
    ],
    mistakes: [
      'Confundir invece (en cambio) con però (pero): invece introduce un contraste de sujetos; però introduce una limitación',
      'Usar anzi como "sin embargo": Non mi piace, però va bene ✓. Anzi introduce algo más intenso o una corrección, no un simple contraste.',
      'Usar quindi en posición incorrecta: Quindi non ho soldi ✗ (al inicio sin contexto) → Non ho soldi, quindi... ✓',
    ],
  },

  seo: [
    {
      heading: 'Conectores lógicos en italiano: cohesión del discurso',
      paragraphs: [
        'Los conectores lógicos (connettivi logici) son esenciales para expresarse con naturalidad en italiano. Sin ellos, las oraciones quedan sueltas y el discurso parece mecánico. Con ellos, puedes expresar relaciones causa-efecto, contraste, adición y corrección.',
        'En A2 los más importantes son quindi (consecuencia), però (contraste), invece (cambio de perspectiva) y anzi (rectificación o énfasis). Dominarlos te permite pasar de un italiano fragmentado a un italiano fluido y natural.',
      ],
    },
    {
      heading: 'La diferencia entre però, invece y anzi',
      paragraphs: [
        'Però introduce una limitación o contraste: mi piace la pizza, però non posso mangiarla ogni giorno (me gusta la pizza, pero no puedo comerla todos los días). Invece introduce un contraste entre dos sujetos o dos acciones opuestas: io lavoro, invece tu dormi (yo trabajo, tú en cambio duermes).',
        'Anzi es más especial: introduce una corrección o un énfasis mayor, a menudo para decir "al contrario" o "es más": Non è buono, anzi è ottimo (No es bueno, es más, es excelente). O para corregir: Non voglio caffè, anzi, un tè (No quiero café, mejor dicho, un té).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a conectar ideas con los cinco conectores principales, distinguiendo consecuencia, contraste y rectificación.',
    graphicPrompt: 'Diagrama con flechas de colores: → (quindi), ≠ (però/invece), ↑ (anzi), ∞ (comunque).',
    scene: [
      ['Sono stanco, quindi vado a dormire.', 'Estoy cansado, por lo tanto me voy a dormir.'],
      ['Mi piace, però costa troppo.', 'Me gusta, pero cuesta demasiado.'],
      ['Io studio, invece lui guarda la TV.', 'Yo estudio, él en cambio ve la tele.'],
      ["È bello, anzi bellissimo!", '¡Es bonito, es más, precioso!'],
    ],
    learnerModes: ['visual: diagrama de relaciones lógicas', 'analítico: consecuencia vs contraste vs corrección', 'oral: debate y opiniones'],
    reviewFocus: ['quindi (consecuencia)', 'però vs invece (contraste)', 'anzi (rectificación/énfasis)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'El conector correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el conector más apropiado para cada contexto.',
        type: 'choice',
        items: [
          {
            scene: 'La consecuencia',
            lines: [['Marco', 'Non ho dormito bene, ___ sono stanchissimo oggi.']],
            options: ['quindi', 'però', 'invece', 'anzi'],
            answer: 'quindi',
            explain: 'No dormí bien → consecuencia: estoy cansadísimo. Quindi = por lo tanto.',
          },
          {
            scene: 'El contraste',
            lines: [['Sofia', "Mi piace l'italiano, ___ è difficile."]],
            options: ['però', 'quindi', 'anzi', 'comunque'],
            answer: 'però',
            explain: 'Contraste entre gustar y ser difícil: però = pero/sin embargo.',
          },
          {
            scene: 'El contraste de sujetos',
            lines: [['David', 'Io mangio la pasta, ___ Marco preferisce la pizza.']],
            options: ['invece', 'però', 'quindi', 'anzi'],
            answer: 'invece',
            explain: 'Contraste entre dos sujetos con preferencias diferentes: invece = en cambio.',
          },
          {
            scene: 'La corrección hacia arriba',
            lines: [['Giulia', "Questo vino è buono, ___ ottimo!"]],
            options: ['anzi', 'però', 'invece', 'quindi'],
            answer: 'anzi',
            explain: 'Rectificación hacia algo más intenso: es bueno, es más, ¡excelente! Anzi.',
          },
          {
            scene: 'De todas formas',
            lines: [['Carlo', 'Fa molto freddo, ___ vado a fare jogging.']],
            options: ['comunque', 'quindi', 'invece', 'anzi'],
            answer: 'comunque',
            explain: 'A pesar del frío, de todas formas va a correr: comunque.',
          },
          {
            scene: 'La consecuencia',
            lines: [['Ana', 'Ho finito i soldi, ___ non posso uscire stasera.']],
            options: ['quindi', 'invece', 'però', 'anzi'],
            answer: 'quindi',
            explain: 'Causa: se le acabó el dinero → consecuencia: no puede salir. Quindi.',
          },
          {
            scene: 'El contraste formal',
            lines: [['Prof.', "L'esame è difficile, ___ con lo studio si può superare."]],
            options: ['tuttavia', 'quindi', 'anzi', 'invece'],
            answer: 'tuttavia',
            explain: 'Contraste formal entre dificultad y posibilidad: tuttavia = sin embargo.',
          },
          {
            scene: 'El contraste de actividades',
            lines: [['Luca', 'Lei va in palestra, ___ io preferisco camminare.']],
            options: ['invece', 'però', 'anzi', 'quindi'],
            answer: 'invece',
            explain: 'Contraste entre dos personas con actividades diferentes: invece = en cambio.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conectando ideas',
        tag: '2 espacios',
        intro: 'Completa con el conector y la continuación lógica.',
        type: 'dual',
        items: [
          {
            scene: 'El tiempo',
            lines: [['Marco', 'Piove molto, [[0]] resto a casa [[1]].']],
            blanks: [
              { options: ['quindi', 'però', 'invece', 'anzi'], answer: 'quindi', explain: 'Consecuencia de la lluvia: me quedo en casa. Quindi.' },
              { options: ['tutta la giornata', 'e esco', 'fuori'], answer: 'tutta la giornata', explain: 'Complemento temporal de resto a casa.' },
            ],
          },
          {
            scene: 'El desayuno',
            lines: [['Sofia', 'Mi piace il cappuccino, [[0]] oggi prendo un tè [[1]].']],
            blanks: [
              { options: ['però', 'quindi', 'anzi', 'invece'], answer: 'però', explain: 'Contraste entre preferencia y acción diferente: però.' },
              { options: ['verde', 'al latte', 'caldo'], answer: 'verde', explain: 'Tè verde: elección alternativa al cappuccino.' },
            ],
          },
          {
            scene: 'La rectificación',
            lines: [['Giulia', 'Il film era interessante, [[0]] bellissimo, [[1]] un capolavoro!']],
            blanks: [
              { options: ['anzi', 'però', 'quindi', 'invece'], answer: 'anzi', explain: 'Rectificación hacia algo más intenso: anzi.' },
              { options: ['anzi', 'però', 'invece', 'quindi'], answer: 'anzi', explain: 'Segunda rectificación, aún más fuerte: anzi.' },
            ],
          },
          {
            scene: 'Los planes',
            lines: [['David', '[[0]] non posso venire stasera, [[1]] ci vediamo domani!']],
            blanks: [
              { options: ['Purtroppo', 'Però', 'Invece', 'Quindi'], answer: 'Purtroppo', explain: 'Purtroppo = desgraciadamente (introduce la mala noticia).' },
              { options: ['comunque', 'quindi', 'invece', 'anzi'], answer: 'comunque', explain: 'De todas formas nos vemos mañana: comunque.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El diario de Marco',
        tag: 'Texto guiado',
        intro: 'Completa el diario con los conectores lógicos correctos.',
        type: 'guidedText',
        scene: 'Marco escribe en su diario sobre su semana',
        text: 'Questa settimana è stata impegnativa. Ho lavorato molto, [[0]] sono stanco. Il progetto è andato bene, [[1]] ci sono stati dei problemi tecnici. I colleghi erano tutti bravi, [[2]] uno era eccezionale. Fa freddo, [[3]] vado a correre tutti i giorni. La vita è dura, [[4]] vale la pena!',
        blanks: [
          { options: ['quindi', 'però', 'invece', 'anzi'], answer: 'quindi', explain: 'Consecuencia del trabajo: estoy cansado. Quindi.' },
          { options: ['però', 'quindi', 'anzi', 'comunque'], answer: 'però', explain: 'Contraste: fue bien pero hubo problemas. Però.' },
          { options: ['anzi', 'però', 'invece', 'quindi'], answer: 'anzi', explain: 'Rectificación hacia algo más intenso: uno era eccezionale. Anzi.' },
          { options: ['comunque', 'quindi', 'però', 'anzi'], answer: 'comunque', explain: 'De todas formas sale a correr: comunque.' },
          { options: ['però', 'quindi', 'invece', 'comunque'], answer: 'però', explain: 'Contraste entre dificultad y valor: però vale la pena.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el conector lógico más adecuado (quindi, però, invece, anzi, comunque, tuttavia).',
        type: 'freeText',
        scene: 'Zhanna explica sus planes de la semana',
        text: 'Domani ho una riunione importante, [[0]] devo prepararmi bene. L\'italiano mi piace molto, [[1]] a volte trovo la grammatica complicata. Marco studia sempre, [[2]] io preferisco guardare i video in italiano. Il corso è intensivo, [[3]] efficacissimo. Pioverà tutta la settimana, [[4]] non cambio i miei piani.',
        blanks: [
          { answer: 'quindi', explain: 'Consecuencia de la reunión importante: devo prepararmi. Quindi.' },
          { answer: 'però', explain: 'Contraste entre gustar y encontrar la gramática complicada: però.' },
          { answer: 'invece', explain: 'Contraste entre dos personas con métodos distintos: invece.' },
          { answer: 'anzi', explain: 'Rectificación hacia algo más fuerte: es intensivo, es más, eficacísimo. Anzi.' },
          { answer: 'comunque', explain: 'De todas formas no cambia sus planes: comunque.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Oraciones conectadas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa uniendo las dos partes con el conector indicado.',
        type: 'write',
        items: [
          {
            scene: 'La consecuencia',
            prompt: 'Ho fame + (quindi) + [consecuencia lógica]',
            answer: 'Ho fame, quindi vado a mangiare qualcosa.',
            accepted: ['ho fame quindi', 'ho fame, quindi'],
            explain: 'Consecuencia lógica del hambre: voy a comer algo. Quindi.',
          },
          {
            scene: 'El contraste',
            prompt: "L'italiano è bello + (però) + [dificultad]",
            answer: "L'italiano è bello, però richiede molta pratica.",
            accepted: ["l'italiano è bello però", "l'italiano è bello, però"],
            explain: 'Contraste entre belleza y dificultad/esfuerzo: però.',
          },
          {
            scene: 'La rectificación',
            prompt: 'La pizza era buona + (anzi) + [algo más intenso]',
            answer: 'La pizza era buona, anzi perfetta!',
            accepted: ['la pizza era buona anzi', 'anzi perfetta', 'anzi ottima'],
            explain: 'Anzi eleva la valoración: buona → perfetta/ottima.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tu opinión con conectores',
        tag: 'Escritura libre',
        intro: 'Usa los conectores aprendidos para expresar tu opinión sobre temas cotidianos.',
        type: 'write',
        items: [
          {
            scene: 'Aprender idiomas',
            prompt: "Studiare le lingue è utile, però... / quindi... (tu opinión con al menos 2 conectores)",
            answer: "Studiare le lingue è utile, però richiede tempo e dedizione. Tuttavia, ne vale assolutamente la pena!",
            accepted: ['però', 'quindi', 'tuttavia', 'comunque', 'anzi'],
            explain: 'Usa però para el contraste, quindi para la consecuencia, anzi para el énfasis.',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'La mia città è... però... invece... (describe con 2-3 conectores)',
            answer: 'La mia città è grande e caotica, però ha molto da offrire. Invece, le piccole città sono più tranquille.',
            accepted: ['però', 'invece', 'quindi', 'comunque'],
            explain: 'Però para contrastar, invece para comparar con otra realidad.',
          },
          {
            scene: 'Una opinión personal',
            prompt: 'Mi piace [cosa], anzi... però... quindi... (usa 3 conectores)',
            answer: "Mi piace molto la cucina italiana, anzi è la mia preferita al mondo. Però non so cucinare bene, quindi preferisco andare al ristorante!",
            accepted: ['anzi', 'però', 'quindi'],
            explain: 'Anzi para intensificar, però para el contraste, quindi para la consecuencia.',
          },
        ],
      },
    ],
  },
}

export default topic
