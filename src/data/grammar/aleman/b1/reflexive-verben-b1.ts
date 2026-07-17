import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'reflexive-verben-b1',
  order: '19',
  color: '#1a2ecc',
  category: 'Verb',
  level: 'B1',
  title: 'Reflexive Verben en Alemán B1 — Verbos Reflexivos con sich',
  shortTitle: 'Reflexive Verben',
  metaTitle: 'Reflexive Verben B1 — sich freuen, sich ärgern, Akkusativ y Dativ reflexiv',
  description:
    'Los verbos reflexivos alemanes llevan el pronombre reflexivo sich (Akkusativ o Dativ). Muchos verbos de emociones, rutinas y cambios de estado son reflexivos. En B1 es esencial distinguir entre pronombres reflexivos en Akkusativ y Dativ, y reconocer los verbos que son siempre reflexivos.',
  lead: 'Domina los verbos reflexivos alemanes: cuándo usar sich, cómo cambia el pronombre según la persona (mich/mir, dich/dir...) y los verbos reflexivos más frecuentes en B1.',
  outcomes: [
    'Usa correctamente los pronombres reflexivos en Akkusativ (mich, dich, sich…)',
    'Distingue pronombres reflexivos Akkusativ vs. Dativ (mich/mir, dich/dir…)',
    'Identifica los verbos que son siempre reflexivos (sich freuen, sich ärgern...)',
    'Usa verbos reflexivos con Dativ cuando ya hay otro objeto en Akkusativ',
    'Construye oraciones con verbos reflexivos en diferentes tiempos',
  ],

  guide: {
    goal: 'Usar correctamente los pronombres reflexivos y los verbos reflexivos en B1 para hablar de emociones, rutinas diarias y estados.',
    model: 'Ich freue mich. / Ich wasche mir die Hände. / Er hat sich geärgert.',
    formula: 'Subjekt + Verb (reflexiv) + Reflexivpronomen (Akk. o Dat.)',
    decisions: [
      'Si el verbo no tiene otro objeto en Akkusativ: usa el pronombre reflexivo en Akkusativ. Ich freue mich, du freust dich, er freut sich, wir freuen uns, ihr freut euch, sie freuen sich.',
      'Si el verbo ya tiene un objeto en Akkusativ (lo que se lava, se viste...): el pronombre reflexivo va en Dativ. Ich wasche mir die Hände (Dativ: mir, dir, sich, uns, euch, sich).',
      'Verbos siempre reflexivos (echt reflexive): solo existen con sich, no tienen significado sin él. Ejemplos: sich beeilen (darse prisa), sich erholen (recuperarse), sich befinden (encontrarse/estar), sich bewerben (solicitar empleo), sich entschuldigen (disculparse).',
      'Verbos opcionalmente reflexivos: pueden usarse con u sin pronombre reflexivo con significado distinto. waschen (lavar algo) vs. sich waschen (lavarse); setzen (sentar algo) vs. sich setzen (sentarse).',
      'En el Perfekt, el pronombre reflexivo va justo después del auxiliar haben: Ich habe mich gefreut. / Wir haben uns beeilt.',
      'En oraciones con Modalverben: el reflexivo va después del sujeto o del verbo modal: Ich muss mich beeilen. / Du solltest dich ausruhen.',
    ],
    table: [
      ['Persona', 'Akk. reflexiv / Dat. reflexiv', 'Ejemplo (Akk. / Dat.)'],
      ['ich', 'mich / mir', 'Ich freue mich. / Ich wasche mir die Haare.'],
      ['du', 'dich / dir', 'Du freust dich. / Du wäschst dir das Gesicht.'],
      ['er/sie/es', 'sich / sich', 'Er freut sich. / Er wäscht sich die Hände.'],
      ['wir', 'uns / uns', 'Wir freuen uns. / Wir waschen uns die Hände.'],
      ['ihr', 'euch / euch', 'Ihr freut euch. / Ihr wascht euch die Haare.'],
      ['sie/Sie', 'sich / sich', 'Sie freuen sich. / Sie waschen sich die Gesichter.'],
    ],
    mistakes: [
      '"Ich freue mir" ❌ → "Ich freue mich" ✓ — sin otro objeto Akkusativ, el reflexivo va en Akk.: mich.',
      '"Ich wasche mich die Hände" ❌ → "Ich wasche mir die Hände" ✓ — "die Hände" es el objeto Akk., así que el reflexivo va en Dat.: mir.',
      '"Er hat sich beeilen" ❌ → "Er hat sich beeilt" ✓ — en Perfekt: hat + sich + Partizip II.',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los verbos reflexivos en alemán?',
      paragraphs: [
        'Los verbos reflexivos (reflexive Verben) en alemán llevan un pronombre reflexivo que refiere de vuelta al sujeto. El pronombre reflexivo es sich para las terceras personas y er/sie/es/sie/Sie, y varía en las demás personas: mich/mir (ich), dich/dir (du), uns (wir), euch (ihr).',
        'En alemán hay verbos que son siempre reflexivos (sin sich no tienen sentido: sich beeilen, sich freuen) y verbos que pueden usarse reflexivamente o no, cambiando su significado (waschen = lavar algo / sich waschen = lavarse).',
      ],
    },
    {
      heading: 'Pronombres reflexivos: Akkusativ vs. Dativ',
      paragraphs: [
        'La clave es si el verbo tiene otro objeto en Akkusativ. Si NO tiene otro objeto Akkusativ: el reflexivo va en Akkusativ (mich, dich, sich, uns, euch, sich). Ejemplos: sich freuen, sich ärgern, sich beeilen, sich erholen → "Ich freue mich", "Wir beeilen uns".',
        'Si el verbo SÍ tiene otro objeto en Akkusativ (la parte del cuerpo, la ropa, etc.): el reflexivo va en Dativ (mir, dir, sich, uns, euch, sich). Ejemplos: sich die Hände waschen, sich die Haare kämmen, sich etwas vorstellen → "Ich wasche mir die Hände", "Er putzt sich die Zähne".',
      ],
      table: [
        ['Situación', 'Caso reflexivo', 'Ejemplo'],
        ['Solo el reflexivo como objeto', 'Akkusativ', 'Ich freue mich. / Er ärgert sich.'],
        ['Reflexivo + objeto Akk.', 'Dativ', 'Ich wasche mir die Hände.'],
        ['Reflexivo + objeto Akk.', 'Dativ', 'Sie kämmt sich die Haare.'],
      ],
    },
    {
      heading: 'Los verbos reflexivos más importantes en B1',
      paragraphs: [
        'En B1 debes dominar los verbos reflexivos más frecuentes en contextos cotidianos: emociones (sich freuen, sich ärgern, sich schämen, sich wundern), salud y rutina (sich waschen, sich anziehen, sich ausruhen, sich erholen), y acciones sociales (sich vorstellen, sich entschuldigen, sich bewerben, sich beschäftigen).',
        'Muchos verbos reflexivos de B1 van con preposición fija: sich freuen auf + Akk. (alegrarse de), sich ärgern über + Akk. (enfadarse por), sich interessieren für + Akk. (interesarse por), sich bewerben um + Akk. (solicitar), sich beschäftigen mit + Dat. (ocuparse con).',
      ],
      table: [
        ['Verbo reflexivo', 'Preposición', 'Ejemplo'],
        ['sich freuen', 'auf + Akk. / über + Akk.', 'Ich freue mich auf den Urlaub.'],
        ['sich ärgern', 'über + Akk.', 'Er ärgert sich über den Stau.'],
        ['sich interessieren', 'für + Akk.', 'Sie interessiert sich für Kunst.'],
        ['sich bewerben', 'um + Akk.', 'Er bewirbt sich um die Stelle.'],
        ['sich beschäftigen', 'mit + Dat.', 'Ich beschäftige mich mit Grammatik.'],
      ],
    },
    {
      heading: 'Verbos reflexivos en diferentes tiempos verbales',
      paragraphs: [
        'En el Präsens el pronombre reflexivo sigue al verbo conjugado: "Ich freue mich." En el Perfekt va después del auxiliar haben (casi todos los reflexivos usan haben): "Ich habe mich gefreut." / "Wir haben uns beeilt."',
        'Con verbos modales el reflexivo sigue al modal: "Ich muss mich beeilen." / "Du solltest dich ausruhen." En el Nebensatz con dass o weil: "Er sagt, dass er sich beeilt hat." / "Ich gehe schlafen, weil ich mich müde fühle."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Reflexive Verben B1: pronombres Akk. (mich/dich/sich/uns/euch) vs Dat. (mir/dir/sich/uns/euch) según si hay objeto Akk., verbos siempre reflexivos (sich freuen/beeilen), Perfekt con haben.',
    graphicPrompt: 'Dos columnas: izquierda — verbos con solo reflexivo (Akkusativ: sich freuen, sich ärgern); derecha — verbos con reflexivo + objeto Akk. (Dativ: sich die Hände waschen). Tabla de pronombres visible.',
    scene: [
      ['Akk.', 'Ich freue mich! (Me alegro)'],
      ['Dat.', 'Ich wasche mir die Hände. (Me lavo las manos)'],
      ['Akk.', 'Wir beeilen uns. (Nos damos prisa)'],
      ['Dat.', 'Er kämmt sich die Haare. (Se peina)'],
      ['Akk.', 'Sie hat sich geärgert. (Se ha enfadado)'],
    ],
    learnerModes: ['Decide Akk. o Dat. según si hay otro objeto Akk.', 'Conjuga el pronombre según la persona', 'Identifica verbos que son siempre reflexivos'],
    practiceVerbs: ['sich freuen', 'sich ärgern', 'sich waschen', 'sich beeilen', 'sich erholen', 'sich vorstellen', 'sich setzen', 'sich anziehen'],
    reviewFocus: ['¿Por qué "mir" en "Ich wasche mir die Hände"?', '¿Cuál es la forma reflexiva de "wir" en Akk.?', '¿Qué verbo reflexivo uses para "disculparse"?'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        type: 'choice',
        title: 'Elige el pronombre reflexivo correcto',
        tag: 'Comprensión',
        intro: 'Selecciona el pronombre reflexivo correcto para cada oración.',
        items: [
          {
            scene: '¿Cuál es el pronombre reflexivo correcto para "ich" en Akkusativ?',
            lines: [['Oración', 'Ich freue ___ sehr über das Geschenk.']],
            options: ['mir', 'mich', 'sich', 'uns'],
            answer: 'mich',
            explain: '"ich" + Akkusativ reflexivo = mich. No hay otro objeto Akk., así que el reflexivo va en Akk.',
          },
          {
            scene: '¿Cuál es el pronombre reflexivo correcto para "er" en Dativ? (hay otro objeto Akk.)',
            lines: [['Oración', 'Er wäscht ___ die Hände.']],
            options: ['ihn', 'sich', 'ihm', 'er'],
            answer: 'sich',
            explain: '"er" + Dativ reflexivo = sich (en 3.ª persona Akk. y Dat. son iguales: sich). "die Hände" es el objeto Akk.',
          },
          {
            scene: '¿Cuál es el pronombre reflexivo correcto para "wir"?',
            lines: [['Oración', 'Wir müssen ___ beeilen!']],
            options: ['sich', 'uns', 'euch', 'mir'],
            answer: 'uns',
            explain: '"wir" + reflexivo (Akk. y Dat.) = uns. sich beeilen → Wir beeilen uns.',
          },
          {
            scene: '¿Cuándo se usa "mir" en lugar de "mich" como reflexivo?',
            lines: [['Pregunta', 'Ich putze ___ die Zähne.']],
            options: ['mich (siempre usamos mich para ich)', 'mir (hay otro objeto Akk.: die Zähne)', 'sich (es reflexivo)', 'dir (segunda persona)'],
            answer: 'mir (hay otro objeto Akk.: die Zähne)',
            explain: '"die Zähne" es el objeto Akkusativ → el reflexivo va en Dativ: mir.',
          },
          {
            scene: '¿Cuál es el pronombre reflexivo correcto para "ihr"?',
            lines: [['Oración', 'Habt ihr ___ gut erholt?']],
            options: ['euch', 'uns', 'sich', 'ihr'],
            answer: 'euch',
            explain: '"ihr" + reflexivo = euch. sich erholen → Ihr erholt euch / Habt ihr euch erholt?',
          },
        ],
      },
      {
        id: 'level-2',
        type: 'choice',
        title: 'Verbos siempre reflexivos',
        tag: 'Vocabulario',
        intro: 'Elige el verbo reflexivo correcto para cada contexto.',
        items: [
          {
            scene: 'Llegas tarde a una cita. ¿Qué dices?',
            lines: [['Tú', 'Entschuldigung! Ich habe ___ verspätet.']],
            options: ['mich beeilt', 'mir beeilt', 'mich verspätet', 'mir verspätet'],
            answer: 'mich verspätet',
            explain: 'sich verspäten = llegar tarde. Ich habe mich verspätet. (Perfekt: haben + mich + verspätet).',
          },
          {
            scene: '¿Cómo se dice "Me intereso por el teatro" en alemán?',
            lines: [['Tú', 'Ich interessiere ___ ___ Theater.']],
            options: ['mich für', 'mir für', 'mich um', 'mir für das'],
            answer: 'mich für',
            explain: 'sich interessieren für + Akk. → Ich interessiere mich für Theater/das Theater.',
          },
          {
            scene: 'Después de las vacaciones, ¿cómo dices que te recuperaste?',
            lines: [['Tú', 'Ich habe ___ gut erholt.']],
            options: ['mich', 'mir', 'sich', 'uns'],
            answer: 'mich',
            explain: 'sich erholen (recuperarse) es siempre reflexivo en Akk. Ich habe mich erholt.',
          },
          {
            scene: '¿Cómo se dice "Se disculpó" en alemán?',
            lines: [['Contexto', 'Er hat ___ entschuldigt.']],
            options: ['ihn', 'sich', 'ihm', 'er'],
            answer: 'sich',
            explain: 'sich entschuldigen (disculparse) es siempre reflexivo. Er hat sich entschuldigt.',
          },
          {
            scene: '¿Cuál es la traducción correcta de "Siéntate, por favor"?',
            lines: [['Instrucción', '___ bitte!']],
            options: ['Setz dich', 'Sitz dich', 'Setze mir', 'Setz mir'],
            answer: 'Setz dich',
            explain: 'sich setzen (sentarse) → imperativo du + reflexivo Akk.: Setz dich!',
          },
        ],
      },
      {
        id: 'level-3',
        type: 'dual',
        title: 'Completa con el reflexivo correcto',
        tag: 'Producción',
        intro: 'Añade el pronombre reflexivo correcto (Akk. o Dat.) en cada espacio.',
        items: [
          {
            scene: 'sich ärgern (Akkusativ, sin otro objeto)',
            lines: [['Tú', 'Ich ärgere [[0]] über den Lärm.']],
            blanks: [
              { answer: 'mich', explain: 'ich + Akk. reflexivo = mich. sin otro objeto Akk.' },
            ],
          },
          {
            scene: 'sich die Hände waschen (hay otro objeto Akk.)',
            lines: [['Mamá a hijo', 'Wasch [[0]] bitte die Hände!']],
            blanks: [
              { answer: 'dir', explain: 'du + Dat. reflexivo = dir. "die Hände" es el objeto Akk.' },
            ],
          },
          {
            scene: 'sich vorstellen (presentarse) — Perfekt',
            lines: [['Cuenta', 'Er hat [[0]] beim Chef vorgestellt.']],
            blanks: [
              { answer: 'sich', explain: 'er/sie/es + reflexivo = sich (Akk. y Dat. son iguales en 3.ª persona). Perfekt: hat + sich + vorgestellt.' },
            ],
          },
          {
            scene: 'sich ausruhen (descansar) — con Modal',
            lines: [['Recomendación', 'Du solltest [[0]] mehr ausruhen.']],
            blanks: [
              { answer: 'dich', explain: 'du + Akk. reflexivo = dich. Mit Modal: solltest + dich + ausruhen (Infinitiv am Ende).' },
            ],
          },
          {
            scene: 'sich die Zähne putzen — wir',
            lines: [['Rutina', 'Wir putzen [[0]] abends die Zähne.']],
            blanks: [
              { answer: 'uns', explain: 'wir + Dat. reflexivo = uns. "die Zähne" es el objeto Akk.' },
            ],
          },
        ],
      },
      {
        id: 'level-4',
        type: 'guidedText',
        title: 'Rutina matutina',
        tag: 'Texto guiado',
        intro: 'Completa la descripción de una mañana típica con los pronombres reflexivos correctos.',
        scene: 'La rutina matutina de Lena',
        text: 'Jeden Morgen steht Lena um sieben Uhr auf. Zuerst duscht sie [[0]] und wäscht [[1]] die Haare. Dann kämmt sie [[2]] die Haare und zieht [[3]] an. Sie freut [[4]] auf das Frühstück. Um acht Uhr beeilt sie [[5]], weil sie nicht zu spät kommen will.',
        blanks: [
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie (3.ª f.) + Akk. reflexivo = sich. duschen sin otro objeto Akk.' },
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie + Dat. reflexivo = sich. "die Haare" es el objeto Akk.' },
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie + Dat. reflexivo = sich. "die Haare" es el objeto Akk.' },
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie + Akk. reflexivo = sich. sich anziehen sin objeto Akk. separado.' },
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie + Akk. reflexivo = sich. sich freuen sin otro objeto Akk.' },
          { options: ['sich', 'ihr', 'ihr sich'], answer: 'sich', explain: 'sie + Akk. reflexivo = sich. sich beeilen sin otro objeto Akk.' },
        ],
      },
      {
        id: 'level-5',
        type: 'freeText',
        title: 'Akk. vs. Dat. reflexivo',
        tag: 'Análisis',
        intro: 'Explica por qué se usa mich o mir en cada caso.',
        scene: 'Distinción Akkusativ vs. Dativ reflexivo',
        text: 'Oración A: "Ich wasche mich." → ¿Por qué "mich"? [[0]]. Oración B: "Ich wasche mir das Gesicht." → ¿Por qué "mir"? [[1]]. Oración C: "Ich freue mich." → ¿Por qué "mich"? [[2]]. Oración D: "Ich putze mir die Zähne." → ¿Por qué "mir"? [[3]].',
        blanks: [
          { answer: 'No hay otro objeto Akk., el cuerpo entero es el objeto implícito → reflexivo en Akk.', explain: 'Cuando no hay otro sustantivo en Akk., el reflexivo va en Akk.' },
          { answer: 'Das Gesicht es el objeto Akkusativ explícito → el reflexivo necesita ser Dativ: mir', explain: 'Con objeto Akk. adicional, el reflexivo va en Dat.' },
          { answer: 'sich freuen no tiene otro objeto Akk. → el reflexivo va en Akk.: mich', explain: 'Verbos siempre reflexivos sin objeto Akk. adicional usan el reflexivo en Akk.' },
          { answer: 'die Zähne es el objeto Akkusativ → el reflexivo necesita ser Dativ: mir', explain: 'Con objeto Akk. adicional (die Zähne), el reflexivo va en Dat.' },
        ],
      },
      {
        id: 'level-6',
        type: 'write',
        title: 'Escribe sobre emociones y rutinas',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas con verbos reflexivos según el contexto dado.',
        items: [
          {
            scene: 'Describe cómo te sientes cuando recibes buenas noticias.',
            prompt: 'Escribe dos oraciones con verbos reflexivos de emoción (freuen, wundern, etc.).',
            answer: 'Ich freue mich sehr über gute Nachrichten. Ich wundere mich manchmal über meinen Glück.',
            accepted: ['Ich freue mich immer, wenn ich gute Nachrichten bekomme.', 'Ich ärgere mich, wenn etwas schiefläuft.'],
            explain: 'sich freuen + über + Akk. / sich wundern + über + Akk. — ambos llevan Akk. reflexivo (mich).',
          },
          {
            scene: 'Describe tu rutina matutina usando al menos tres verbos reflexivos.',
            prompt: 'Escribe 3 oraciones sobre tu mañana con verbos reflexivos.',
            answer: 'Ich dusche mich um sieben Uhr. Dann kämme ich mir die Haare. Danach ziehe ich mich an.',
            accepted: ['Ich wasche mir das Gesicht. Ich beeile mich, weil ich früh aufstehen muss.'],
            explain: 'sich duschen (Akk.: mich), sich die Haare kämmen (Dat.: mir + Akk. die Haare), sich anziehen (Akk.: mich).',
          },
          {
            scene: 'Tu amigo está estresado. Dale tres consejos usando verbos reflexivos.',
            prompt: 'Escribe tres recomendaciones con du solltest + reflexiv o du musst + reflexiv.',
            answer: 'Du solltest dich mehr ausruhen. Du musst dich entspannen. Du solltest dich nicht so stressen.',
            accepted: ['Erhol dich gut!', 'Du solltest dich mit Freunden treffen.', 'Du musst dich um deine Gesundheit kümmern.'],
            explain: 'sich ausruhen (dich), sich entspannen (dich), sich stressen (dich) — todos en Akk. sin otro objeto Akk.',
          },
          {
            scene: 'Habla de algo que te interesa o te preocupa usando verbos reflexivos con preposición.',
            prompt: 'Escribe dos oraciones con sich interessieren für o sich Sorgen machen um.',
            answer: 'Ich interessiere mich sehr für Sprachen. Ich mache mir Sorgen um meine Familie.',
            accepted: ['Ich interessiere mich für Musik.', 'Ich mache mir keine Sorgen darum.'],
            explain: 'sich interessieren für (mich + für + Akk.). sich Sorgen machen um (Dat.: mir + um + Akk.).',
          },
        ],
      },
    ],
  },
}

export default topic
