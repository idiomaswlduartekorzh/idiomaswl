import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verben-mit-prapositionen-b1',
  order: '12',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'B1',
  title: 'Verben mit Präpositionen — Verbos con preposición fija en alemán B1',
  shortTitle: 'Verben mit Präpositionen',
  metaTitle: 'Verbos con preposición fija en alemán B1 — warten auf, denken an, sich freuen',
  description:
    'Los verbos alemanes con preposición fija deben aprenderse como unidades léxicas: el verbo más su preposición determinan el caso del complemento. Los más frecuentes en B1 son: warten auf, denken an, sprechen über, sich freuen auf/über, sich ärgern über, sich interessieren für.',
  lead: 'Aprende los verbos alemanes con preposición fija y cómo preguntar por ellos con wo(r)+Präposition.',
  outcomes: [
    'Reconoces los verbos más frecuentes con preposición fija y su caso',
    'Distingues sich freuen auf (futuro) de sich freuen über (pasado/presente)',
    'Formas preguntas correctas con wo(r)+Präposition para cosas y con Präp.+wen para personas',
    'Usas verbos con preposición en contextos cotidianos',
  ],

  guide: {
    goal: 'Usar verbos con preposición fija correctamente, sabiendo el caso que rige cada uno.',
    model: 'Ich warte auf den Bus. / Sie spricht über das Problem. / Er freut sich auf die Ferien. / Ich interessiere mich für Musik.',
    formula: 'Verbo + Präposition + Kasus (meistens Akkusativ) | Frage: wo(r)+Präp. (Sachen) / Präp.+wen (Personen)',
    decisions: [
      'auf + Akkusativ: warten auf (esperar), sich freuen auf (tener ganas de, futuro), sich vorbereiten auf (prepararse para), hoffen auf (esperar algo).',
      'über + Akkusativ: sprechen über (hablar sobre), sich freuen über (alegrarse por, ya ocurrido), sich ärgern über (enojarse por), nachdenken über (reflexionar).',
      'an + Akkusativ: denken an (pensar en), sich erinnern an (recordar), glauben an (creer en).',
      'für + Akkusativ: sich interessieren für (interesarse por), danken für (agradecer).',
      'Diferencia clave: sich freuen AUF = Vorfreude (todavía no ocurrió); sich freuen ÜBER = reacción a algo ya ocurrido.',
      'Preguntas: por cosas → wo(r)+Präp.: worauf, worüber, woran, wofür. Por personas → Präp.+wen: auf wen, über wen.',
    ],
    table: [
      ['Verbo + Präposition', 'Caso', 'Ejemplo'],
      ['warten auf', 'Akkusativ', 'Ich warte auf den Zug.'],
      ['sprechen über', 'Akkusativ', 'Wir sprechen über das Projekt.'],
      ['sich freuen auf', 'Akkusativ', 'Ich freue mich auf den Urlaub.'],
    ],
    mistakes: [
      '"Ich warte für den Bus" ❌ → "Ich warte auf den Bus" ✓ — warten rige auf, no für.',
      '"Ich freue mich auf das Geschenk" (ya recibido) ❌ → "Ich freue mich über das Geschenk" ✓ — über para reacción a algo ya ocurrido.',
      '"Wofür denkst du?" ❌ → "Woran denkst du?" ✓ — denken an → woran.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los verbos con preposición fija son tan importantes?',
      paragraphs: [
        'Los verbos alemanes con preposición fija (Verben mit festen Präpositionen) no pueden traducirse literalmente. La preposición forma parte del significado del verbo y hay que aprenderla de memoria junto con él. Por ejemplo: warten auf (esperar a), no warten für.',
        'En B1 los más frecuentes son los que llevan auf, über, an y für. Una vez que los dominas, puedes usarlos en conversación y por escrito con naturalidad.',
      ],
      table: [
        ['Preposición', 'Verbos frecuentes', 'Ejemplo'],
        ['auf + Akk.', 'warten, sich freuen, hoffen', 'Ich warte auf dich.'],
        ['über + Akk.', 'sprechen, sich ärgern, nachdenken', 'Wir sprechen über alles.'],
        ['an + Akk.', 'denken, sich erinnern, glauben', 'Er denkt an sie.'],
        ['für + Akk.', 'sich interessieren, danken', 'Sie interessiert sich für Kunst.'],
      ],
    },
    {
      heading: '¿Cómo se pregunta por el complemento preposicional en alemán?',
      paragraphs: [
        'Para preguntar por el complemento de un verbo con preposición fija, la regla es: si el complemento es una cosa → wo(r)+Präposition; si es una persona → Präposition+wen.',
        'Ejemplos: "Worauf wartest du?" (¿A qué esperas? — una cosa, el bus) vs. "Auf wen wartest du?" (¿A quién esperas? — una persona). Esta distinción es esencial para el B1.',
      ],
    },
    {
      heading: '¿Qué son los verbos con preposición fija en alemán?',
      paragraphs: [
        'Son verbos que exigen siempre una preposición concreta, y esa preposición determina el caso del complemento: warten auf + Akkusativ (esperar a), denken an + Akkusativ (pensar en), sich freuen über/auf (alegrarse de/por), teilnehmen an + Dativ (participar en), sprechen mit/über. El problema para el hispanohablante es que la preposición alemana casi nunca coincide con la española (denken AN, no "en"; warten AUF, no "por"), así que hay que aprender cada verbo con su preposición y su caso como un bloque, igual que en inglés (to depend ON). Además, cuando el complemento es una cosa, la pregunta usa wo(r)+preposición (Worauf wartest du?) y la respuesta un da(r)-compuesto (Ich warte darauf).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verben mit Präpositionen B1: auf/über/an/für + Akk. sich freuen auf (futuro) vs. über (reacción). wo(r)+Präp. para preguntas.',
    graphicPrompt: 'Red de verbos conectados por flechas a sus preposiciones con ejemplos de uso.',
    scene: [
      ['Ich warte auf den Bus.', 'Espero el autobús.'],
      ['Worüber sprecht ihr?', '¿De qué habláis?'],
      ['Ich freue mich auf den Urlaub!', '¡Tengo ganas de las vacaciones!'],
      ['Sie ärgert sich über den Lärm.', 'Se enfada por el ruido.'],
      ['Er denkt oft an seine Familie.', 'Piensa a menudo en su familia.'],
      ['Wir interessieren uns für Kunst.', 'Nos interesa el arte.'],
      ['Ich freue mich über das Geschenk.', 'Me alegro por el regalo.'],
      ['Wofür interessierst du dich?', '¿Por qué te interesas?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['warten', 'sprechen', 'denken', 'sich freuen', 'sich ärgern', 'sich interessieren', 'hoffen', 'sich erinnern'],
    reviewFocus: ['Präposition + Akkusativ', 'sich freuen auf vs. über', 'wo(r)+Präp. Fragen', 'Präp.+wen Fragen'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la preposición correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la preposición fija que corresponde a cada verbo.',
        type: 'choice',
        items: [
          {
            scene: 'En la parada',
            lines: [['', 'Ich warte ___ den nächsten Bus.']],
            options: ['auf', 'über', 'an', 'für'],
            answer: 'auf',
            explain: '"warten auf" es la combinación fija: esperar algo/alguien.',
          },
          {
            scene: 'Reunión de trabajo',
            lines: [['', 'Wir sprechen ___ unsere Pläne für das nächste Jahr.']],
            options: ['über', 'auf', 'an', 'für'],
            answer: 'über',
            explain: '"sprechen über" = hablar sobre (un tema).',
          },
          {
            scene: 'Nostalgia',
            lines: [['', 'Er denkt oft ___ seine Heimat.']],
            options: ['an', 'auf', 'über', 'für'],
            answer: 'an',
            explain: '"denken an" = pensar en (algo/alguien).',
          },
          {
            scene: 'Pasión',
            lines: [['', 'Sie interessiert sich sehr ___ Geschichte.']],
            options: ['für', 'auf', 'über', 'an'],
            answer: 'für',
            explain: '"sich interessieren für" = interesarse por.',
          },
          {
            scene: 'Anticipación',
            lines: [['', 'Ich freue mich ___ die Ferien. (aún no han llegado)']],
            options: ['auf', 'über', 'an', 'für'],
            answer: 'auf',
            explain: '"sich freuen auf" = tener ganas de algo que todavía no ha ocurrido (Vorfreude).',
          },
          {
            scene: 'Molestia',
            lines: [['', 'Er ärgert sich ___ den Lärm der Nachbarn.']],
            options: ['über', 'auf', 'an', 'für'],
            answer: 'über',
            explain: '"sich ärgern über" = enojarse por algo.',
          },
          {
            scene: 'Recuerdo',
            lines: [['', 'Sie erinnert sich gern ___ ihre Kindheit.']],
            options: ['an', 'auf', 'über', 'für'],
            answer: 'an',
            explain: '"sich erinnern an" = recordar algo/alguien.',
          },
          {
            scene: 'Esperanza',
            lines: [['', 'Wir hoffen ___ besseres Wetter am Wochenende.']],
            options: ['auf', 'über', 'an', 'für'],
            answer: 'auf',
            explain: '"hoffen auf" = esperar/desear que algo suceda.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbo reflexivo + preposición',
        tag: '2 espacios',
        intro: 'Completa con el verbo reflexivo correcto y la preposición correspondiente.',
        type: 'dual',
        items: [
          {
            scene: 'Antes de las vacaciones',
            lines: [['', 'Ich [[0]] mich schon sehr [[1]] den Urlaub nächste Woche.']],
            blanks: [
              { options: ['freue', 'ärgere', 'interessiere', 'erinnere'], answer: 'freue', explain: '"sich freuen auf" para anticipar algo futuro.' },
              { options: ['auf', 'über', 'an', 'für'], answer: 'auf', explain: '"freuen auf" = Vorfreude (vacaciones no han llegado).' },
            ],
          },
          {
            scene: 'Después de recibir el regalo',
            lines: [['', 'Er [[0]] sich sehr [[1]] das schöne Geschenk.']],
            blanks: [
              { options: ['freut', 'ärgert', 'interessiert', 'erinnert'], answer: 'freut', explain: '"sich freuen über" para reaccionar a algo ya ocurrido.' },
              { options: ['über', 'auf', 'an', 'für'], answer: 'über', explain: '"freuen über" = reacción positiva a algo que ya pasó.' },
            ],
          },
          {
            scene: 'La vecina ruidosa',
            lines: [['', 'Sie [[0]] sich jeden Tag [[1]] den Lärm ihrer Nachbarn.']],
            blanks: [
              { options: ['ärgert', 'freut', 'interessiert', 'wartet'], answer: 'ärgert', explain: '"sich ärgern über" = enojarse por.' },
              { options: ['über', 'auf', 'an', 'für'], answer: 'über', explain: '"ärgern über" rige preposición über + Akkusativ.' },
            ],
          },
          {
            scene: 'Reflexión',
            lines: [['', 'Wir [[0]] lange [[1]] das Problem nach.']],
            blanks: [
              { options: ['denken', 'sprechen', 'warten', 'hoffen'], answer: 'denken', explain: '"nachdenken über" = reflexionar sobre (nachdenken es separable).' },
              { options: ['über', 'auf', 'an', 'für'], answer: 'über', explain: '"nachdenken über" rige über + Akkusativ.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El hermano deportista',
        tag: 'Texto guiado',
        intro: 'Completa el texto sobre el hermano de una persona con las preposiciones correctas.',
        type: 'guidedText',
        scene: 'Descripción de los intereses y emociones de un hermano deportista.',
        text: 'Mein Bruder interessiert sich sehr [[0]] Sport. Er denkt immer [[1]] seine nächsten Wettkämpfe. Manchmal ärgert er sich [[2]] seine Ergebnisse, aber er freut sich auch [[3]] jeden Fortschritt. Er hofft [[4]] einen Platz im Nationalteam.',
        blanks: [
          { options: ['für', 'auf', 'über', 'an'], answer: 'für', explain: '"sich interessieren für" = interesarse por.' },
          { options: ['an', 'auf', 'über', 'für'], answer: 'an', explain: '"denken an" = pensar en.' },
          { options: ['über', 'an', 'auf', 'für'], answer: 'über', explain: '"sich ärgern über" = enojarse por.' },
          { options: ['über', 'auf', 'an', 'für'], answer: 'über', explain: '"sich freuen über" = alegrarse por (progreso ya hecho).' },
          { options: ['auf', 'über', 'an', 'für'], answer: 'auf', explain: '"hoffen auf" = esperar (algo futuro).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Preguntas con wo(r)+Präposition',
        tag: 'Texto libre',
        intro: 'Formula la pregunta correcta por el complemento subrayado.',
        type: 'freeText',
        scene: 'Transforma cada frase en una pregunta usando wo(r)+Präp. o Präp.+wen.',
        text: 'Er wartet auf den Zug. → [[0]] / Sie spricht über das Buch. → [[1]] / Ich denke an meine Mutter. → [[2]] / Er interessiert sich für Musik. → [[3]] / Wir freuen uns auf die Party. → [[4]]',
        blanks: [
          { answer: 'Worauf wartet er?', explain: 'Zug = cosa → wo(r)+Präp.: worauf.' },
          { answer: 'Worüber spricht sie?', explain: 'Buch = cosa → worüber.' },
          { answer: 'An wen denkst du?', explain: 'Mutter = persona → an + wen.' },
          { answer: 'Wofür interessiert er sich?', explain: 'Musik = cosa → wofür.' },
          { answer: 'Worauf freut ihr euch?', explain: 'Party = cosa → worauf.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Verbos con preposición en contexto',
        tag: 'Producción guiada',
        intro: 'Escribe frases y textos usando verbos con preposición fija.',
        type: 'write',
        items: [
          {
            scene: 'Sobre ti',
            prompt: 'Escribe 4 frases sobre ti usando verbos con preposición fija (warten, denken, sich interessieren, sich freuen).',
            answer: 'Ich warte auf das Wochenende. Ich denke oft an meine Familie in Kolumbien. Ich interessiere mich für Sprachen und Reisen. Ich freue mich auf die Sommerferien.',
            explain: 'Cada verbo con su preposición fija correcta.',
          },
          {
            scene: 'La diferencia',
            prompt: 'Explica la diferencia entre "sich freuen auf" y "sich freuen über" con un ejemplo tuyo de cada uno.',
            answer: '"sich freuen auf" = Vorfreude: Ich freue mich auf das Konzert morgen. "sich freuen über" = Reaktion: Ich freue mich über die gute Note, die ich heute bekommen habe.',
            explain: 'auf = futuro, über = algo ya ocurrido.',
          },
          {
            scene: 'Entrevista',
            prompt: 'Formula 3 preguntas para una entrevista usando verbos con preposición fija.',
            answer: 'Wofür interessieren Sie sich beruflich? Worüber haben Sie in Ihrer letzten Stelle gearbeitet? Worauf warten Sie noch in Ihrer Karriere?',
            explain: 'Preguntas formales con wo(r)+Präp. para temas/cosas.',
          },
          {
            scene: 'Diálogo',
            prompt: 'Escribe un mini-diálogo (4 intercambios) donde cada persona usa un verbo con preposición diferente.',
            answer: '—Worauf wartest du? —Auf den Bus. Er hat Verspätung. —Und woran denkst du gerade? —An das Wochenende. Ich freue mich so darauf!',
            explain: 'darauf = da+auf → pronombre para cosas (en lugar de repetir el sustantivo).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Verbos con preposición en producción libre',
        tag: 'Escritura libre',
        intro: 'Usa verbos con preposición fija en textos más largos y complejos.',
        type: 'write',
        items: [
          {
            scene: 'Correo a un amigo',
            prompt: 'Escribe un correo electrónico a un amigo alemán contando qué esperas del próximo semestre y qué te preocupa. Usa 5 verbos con preposición fija.',
            answer: '',
            explain: 'Mezcla sich freuen auf, hoffen auf, sich ärgern über, denken an, sich vorbereiten auf.',
          },
          {
            scene: 'Aprender idiomas',
            prompt: 'Describe tu relación con el aprendizaje de idiomas usando al menos 4 verbos con preposición (denken an, sich interessieren für, sich freuen auf/über, hoffen auf).',
            answer: '',
            explain: 'Usa correctamente auf (futuro/deseo) vs. über (reacción/resultado).',
          },
          {
            scene: 'Preguntas y respuestas',
            prompt: 'Crea 5 preguntas con wo(r)+Präp. y sus respuestas completas, incluyendo tanto cosas como personas.',
            answer: '',
            explain: 'Para personas usa Präp.+wen; para cosas usa wo(r)+Präp.',
          },
        ],
      },
    ],
  },
}

export default topic
