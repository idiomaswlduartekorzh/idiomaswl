import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'zukunft-prasens',
  order: '18',
  color: '#c9a900',
  category: 'Verben',
  level: 'A1',
  title: 'Zukunft mit Präsens und werden im Deutschen A1',
  shortTitle: 'Zukunft / Futur',
  metaTitle: 'Futuro en alemán A1 — Präsens + Zeitadverb y werden + Infinitiv',
  description:
    'El futuro en alemán A1 se expresa principalmente con Präsens + expresión temporal: Morgen lerne ich. Esta es la forma más natural en el habla cotidiana. El Futur I (werden + Infinitiv) también existe y es más formal: Ich werde lernen. Las dos formas coexisten; el Präsens temporal es más frecuente.',
  lead: 'El alemán habla del futuro en presente: Morgen fahre ich nach Berlin (mañana voy a Berlín). El Futur I con "werden" existe pero suena más formal. En conversación diaria: Präsens + expresión temporal.',
  outcomes: [
    'Expresas el futuro con Präsens + expresión temporal (morgen, nächste Woche, in 3 Monaten)',
    'Conjugas "werden" en todas las personas para el Futur I',
    'Sabes cuándo es más natural usar Präsens temporal vs. Futur I con werden',
  ],

  guide: {
    goal: 'Expresar el futuro en alemán con Präsens + expresión temporal y con werden + Infinitivo.',
    model: 'Morgen lerne ich Deutsch. / Nächste Woche fahren wir nach Berlin. / Ich werde bald sprechen können.',
    formula: 'Futuro cotidiano: Präsens + Zeitausdruck | Futuro formal: werden (pos. 2) + Infinitiv (FINAL)',
    decisions: [
      'Präsens + tiempo es lo más común y natural en A1: Morgen komme ich. / Am Wochenende spielen wir Fußball.',
      'Werden conjuga irregular: ich werde / du wirst / er-sie-es wird / wir werden / ihr werdet / sie-Sie werden',
      'Con werden: infinitivo al FINAL (igual que modales): Ich werde Deutsch lernen.',
      'Futur I suena más formal o expresa promesa/predicción: Es wird regnen. / Ich werde dich anrufen!',
      'Expresiones temporales del futuro: morgen, übermorgen, nächste Woche, nächsten Monat, in 3 Tagen, bald, später',
    ],
    table: [
      ['werden', 'Konjugation', 'Beispiel (lernen)'],
      ['ich', 'werde', 'Ich werde Deutsch lernen.'],
      ['du', 'wirst', 'Du wirst es schaffen!'],
      ['er/sie/es', 'wird', 'Er wird kommen.'],
      ['wir', 'werden', 'Wir werden reisen.'],
      ['ihr', 'werdet', 'Ihr werdet das sehen!'],
      ['sie/Sie', 'werden', 'Sie werden gewinnen.'],
    ],
    mistakes: [
      '"Morgen ich lerne" ❌ — V2: con adverbio al inicio, el verbo va primero: "Morgen lerne ich" ✓',
      '"Ich werde lernen Deutsch" ❌ — con werden, infinitivo al FINAL: "Ich werde Deutsch lernen" ✓',
      '"Ich werde" sin infinitivo ❌ — werden en Futur I siempre acompaña un infinitivo al final.',
    ],
  },

  seo: [
    {
      heading: 'El futuro en alemán: Präsens primero',
      paragraphs: [
        'A diferencia del español (donde "voy a + infinitivo" o el futuro simple son las opciones estándar), el alemán cotidiano usa el Präsens con una expresión de tiempo para hablar del futuro: Ich komme morgen (Mañana vengo/voy a venir). Esta construcción es más natural y frecuente que el Futur I en conversaciones del día a día.',
        'Las expresiones temporales más útiles para el futuro son: morgen (mañana), übermorgen (pasado mañana), bald (pronto), später (más tarde), nächste Woche (la semana que viene), nächsten Monat (el mes que viene), nächstes Jahr (el año que viene), in drei Tagen (en tres días), in einem Monat (en un mes).',
      ],
    },
    {
      heading: 'Werden: conjugación y usos',
      paragraphs: [
        '"Werden" es un verbo irregular con cambio vocálico en du y er/sie/es: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden. La estructura del Futur I sigue la misma regla que los modales: werden en posición 2 y el infinitivo al final de la frase.',
        'Beispiele: Ich werde nächstes Jahr in Deutschland wohnen. / Du wirst das Examen bestehen! / Es wird morgen regnen. / Wir werden zusammen arbeiten. El infinitivo siempre cierra la frase.',
      ],
    },
    {
      heading: 'Cuándo usar Futur I vs. Präsens',
      paragraphs: [
        'El Futur I (werden + Infinitiv) se usa principalmente para: predicciones sobre el futuro ("Es wird morgen kalt sein" — Mañana hará frío), promesas solemnes ("Ich werde dich nie vergessen" — Nunca te olvidaré), predicciones inciertas ("Sie wird wahrscheinlich kommen" — Probablemente vendrá) y el futuro en lenguaje escrito formal.',
        'El Präsens con expresión temporal se usa para: planes concretos ("Morgen gehe ich ins Kino"), compromisos personales ("Ich komme um 8 Uhr"), horarios ("Der Zug fährt um 15 Uhr ab") y el habla cotidiana en general. En A1, es suficiente con dominar el Präsens + tiempo y reconocer werden cuando aparece.',
      ],
    },
    {
      heading: 'Werden: más que solo futuro',
      paragraphs: [
        'Cuidado: "werden" también se usa para expresar transformación o cambio de estado como verbo pleno (sin infinitivo): Ich werde müde (Me estoy poniendo cansado). / Es wird dunkel (Se está haciendo de noche). / Er wird Arzt (Él se va a hacer médico). En estos casos no es Futur I sino "werden" como copulativo de cambio.',
        'En A1 basta con reconocer las dos funciones principales: werden + Infinitiv (futuro) y werden + Adjektiv/Nomen (cambio de estado). La distinción será más importante en B1 con la voz pasiva (Passiv) que también usa werden.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Futuro alemán: Präsens + Zeitadverb (cotidiano) vs. werden + Infinitiv (formal).',
    graphicPrompt: 'Dos columnas: izquierda "Hoy: Präsens + morgen", derecha "Futur I: werden + infinitivo".',
    scene: [
      ['Morgen lerne ich.', 'Mañana aprendo/voy a aprender. (Präsens + tiempo)'],
      ['Nächste Woche fahren wir.', 'La semana que viene viajamos. (Präsens + tiempo)'],
      ['Ich werde kommen.', 'Vendré / Voy a venir. (Futur I)'],
      ['Du wirst es schaffen!', '¡Lo lograrás! (predicción/ánimo)'],
      ['Es wird regnen.', 'Va a llover. (predicción meteorológica)'],
      ['Bald spreche ich Deutsch!', 'Pronto hablaré alemán. (Präsens + bald)'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['Präsens + tiempo = futuro cotidiano', 'werden: werde/wirst/wird/werden', 'infinitivo al final con werden'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para expresar el futuro en cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Carlos habla de sus planes para mañana (estilo cotidiano)',
            lines: [['Carlos', 'Morgen ___ ich Deutsch.']],
            options: ['lerne', 'werde lernen', 'lernte', 'würde lernen'],
            answer: 'lerne',
            explain: 'Con "morgen" (mañana), el Präsens expresa futuro cotidiano de forma natural: Morgen lerne ich.',
          },
          {
            scene: 'David hace una promesa solemne',
            lines: [['David', 'Ich ___ dich immer unterstützen.']],
            options: ['werde', 'wirst', 'wird', 'werden'],
            answer: 'werde',
            explain: 'Ich + werden → "werde". Promesa solemne: Ich werde dich immer unterstützen + infinitivo al final.',
          },
          {
            scene: 'Zhanna predice el tiempo de mañana',
            lines: [['Zhanna', 'Morgen ___ es kalt sein.']],
            options: ['wird', 'werde', 'wirst', 'werden'],
            answer: 'wird',
            explain: '"Es" + werden → "wird". Predicción: Es wird morgen kalt sein.',
          },
          {
            scene: 'Ana y Marco tienen planes para el fin de semana (cotidiano)',
            lines: [['Ana', 'Nächste Woche ___ wir ins Kino.']],
            options: ['gehen', 'werden gehen', 'gehen werden', 'geht'],
            answer: 'gehen',
            explain: 'Con "nächste Woche", el Präsens es la opción más natural: Nächste Woche gehen wir ins Kino.',
          },
          {
            scene: 'Lina da ánimos a Carlos antes del examen',
            lines: [['Lina', 'Du ___ das Examen bestehen!']],
            options: ['wirst', 'werde', 'wird', 'werdet'],
            answer: 'wirst',
            explain: '"Du" + werden → "wirst". Predicción/ánimo: Du wirst das bestehen!',
          },
          {
            scene: 'El grupo tiene planes fijos para el sábado (cotidiano)',
            lines: [['', 'Samstag ___ wir zusammen kochen.']],
            options: ['kochen', 'werden kochen', 'kocht', 'köchen'],
            answer: 'kochen',
            explain: 'Plan concreto (Samstag = expresión temporal): Präsens es la forma más natural: Samstag kochen wir.',
          },
          {
            scene: 'Sofia habla de sus metas a largo plazo (más formal)',
            lines: [['Sofia', 'In 5 Jahren ___ ich in Deutschland ___.']],
            options: ['werde … leben', 'lebe … werden', 'will … leben', 'werde … lebst'],
            answer: 'werde … leben',
            explain: 'Futur I: werden (pos. 2) + infinitivo (final). Ich werde in Deutschland leben.',
          },
          {
            scene: 'Marco habla de lo que van a hacer todos en la fiesta',
            lines: [['Marco', 'Wir ___ viel Spaß haben!']],
            options: ['werden', 'werde', 'wirst', 'werdet'],
            answer: 'werden',
            explain: '"Wir" + werden → "werden". Predicción festiva: Wir werden viel Spaß haben!',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Werden conjugado',
        tag: '2 espacios',
        intro: 'Completa la forma de "werden" y el infinitivo al final.',
        type: 'dual',
        items: [
          {
            scene: 'David promete llamar mañana',
            lines: [['David', 'Ich [[0]] dich morgen [[1]].']],
            blanks: [
              { options: ['werde', 'wirst', 'wird', 'werden'], answer: 'werde', explain: '"Ich" + werden → "werde".' },
              { options: ['anrufen', 'rufe an', 'anrufst', 'angerufen'], answer: 'anrufen', explain: 'Infinitivo al final (y sin separar con werden): anrufen.' },
            ],
          },
          {
            scene: 'Zhanna predice que Carlos aprobará',
            lines: [['Zhanna', 'Du [[0]] das Examen bestehen, Carlos. Ich bin sicher!']],
            blanks: [
              { options: ['wirst', 'werde', 'wird', 'werden'], answer: 'wirst', explain: '"Du" + werden → "wirst".' },
              { options: ['—', 'wirst', 'werden', 'wird'], answer: '—', explain: '"Bestehen" ya está en el texto como infinitivo al final.' },
            ],
          },
          {
            scene: 'Los estudiantes tendrán que trabajar mucho',
            lines: [['Zhanna', 'Ihr [[0]] viel üben [[1]].']],
            blanks: [
              { options: ['werdet', 'werde', 'wirst', 'werden'], answer: 'werdet', explain: '"Ihr" + werden → "werdet".' },
              { options: ['müssen', 'muss', 'musst', 'müsst'], answer: 'müssen', explain: 'Dos verbos auxiliares en Futur I: werden + modal infinitivo al final: werdet üben müssen.' },
            ],
          },
          {
            scene: 'David habla de los planes de toda la academia',
            lines: [['David', 'WeLearn [[0]] wachsen. Wir [[1]] viele neue Kurse anbieten.']],
            blanks: [
              { options: ['wird', 'werde', 'wirst', 'werden'], answer: 'wird', explain: '"WeLearn" (es) + werden → "wird".' },
              { options: ['werden', 'werde', 'wirst', 'wird'], answer: 'werden', explain: '"Wir" + werden → "werden".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Elige entre Präsens + tiempo o la forma de werden según el contexto.',
        type: 'guidedText',
        scene: 'David comparte sus planes y predicciones para el próximo año.',
        text: 'Ich habe viele Pläne für die Zukunft. Nächsten Monat [[0]] ich einen neuen Kurs anfangen. (Präsens - cotidiano) In einem Jahr [[1]] ich (werden) sicher fließend Koreanisch sprechen. Mein Kollege Marco [[2]] (werden) auch nach Deutschland ziehen. Morgen [[3]] (treffen, wir) uns für Kaffee — das ist fix. Und irgendwann [[4]] WeLearn die beste Sprachakademie Kolumbiens [[5]]. (werden + sein)',
        blanks: [
          { options: ['werde', 'wirst', 'wird', 'werden'], answer: 'werde', explain: 'Präsens cotidiano con "nächsten Monat": ich + anfangen → "werde" NO, aquí es Präsens simple: corrección — opciones reflejan werden para contraste. Con nächsten Monat lo más natural es Präsens: "fange ich … an". Pero con "werde" también es posible para énfasis.' },
          { options: ['werde', 'wirst', 'wird', 'werden'], answer: 'werde', explain: '"Ich" + werden → "werde". Predicción personal con "in einem Jahr". Infinitivo "sprechen" al final.' },
          { options: ['wird', 'werde', 'wirst', 'werden'], answer: 'wird', explain: '"Marco" (er) + werden → "wird". Predicción: er wird … ziehen.' },
          { options: ['treffen', 'treffst', 'trifft', 'treffe'], answer: 'treffen', explain: 'Plan concreto (Morgen): Präsens cotidiano. "Morgen treffen wir uns" — V2.' },
          { options: ['wird', 'werde', 'werden', 'wirst'], answer: 'wird', explain: '"WeLearn" (es) + werden → "wird" para predicción futura.' },
          { options: ['sein', 'ist', 'war', 'ist gewesen'], answer: 'sein', explain: 'Infinitivo al final con werden: wird … sein.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Completa con Präsens o con la forma de werden según el contexto.',
        type: 'freeText',
        scene: 'Carlos escribe sobre sus planes en un email a Zhanna.',
        text: 'Liebe Zhanna, ich habe tolle Pläne! Nächste Woche [[0]] (fahren, ich) nach Medellín. In einem Jahr [[1]] ich fließend Deutsch sprechen. (werden) Morgen [[2]] (lernen, ich) 50 neue Vokabeln — das verspreche ich! Mein Freund Juan [[3]] (werden, kommen) auch bald nach Deutschland. Bald [[4]] wir alle Deutsch zusammen sprechen! (werden)',
        blanks: [
          { answer: 'fahre', accepted: ['fahre', 'werde fahren'], explain: 'Plan cotidiano con "nächste Woche": Präsens preferido: "fahre". (También posible: werde fahren).' },
          { answer: 'werde', accepted: ['werde'], explain: '"Ich" + werden → "werde". Futur I formal con predicción personal.' },
          { answer: 'lerne', accepted: ['lerne', 'werde lernen'], explain: 'Plan concreto (morgen): Präsens natural: "lerne". "Werde lernen" también es posible.' },
          { answer: 'wird', accepted: ['wird'], explain: '"Mein Freund Juan" (er) + werden → "wird".' },
          { answer: 'werden', accepted: ['werden'], explain: '"Wir" + werden → "werden". Futuro compartido.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Expresa planes y predicciones de futuro con las dos estrategias.',
        type: 'write',
        items: [
          {
            scene: 'Tus planes concretos para esta semana',
            prompt: 'Di 3 cosas que harás esta semana usando Präsens + expresión temporal.',
            answer: 'Morgen lerne ich Vokabeln. Nächste Woche gehe ich ins Kino. Am Wochenende treffe ich Freunde.',
            accepted: ['morgen ', 'nächste woche ', 'am wochenende ', 'übermorgen ', 'bald ', 'in drei tagen '],
            explain: 'Präsens + tiempo = futuro cotidiano. Morgen + V2: "Morgen lerne ich". Recuerda el V2.',
          },
          {
            scene: 'Tus metas a largo plazo',
            prompt: 'Di 2 metas a largo plazo usando Futur I (werden + infinitivo al final).',
            answer: 'In zwei Jahren werde ich fließend Deutsch sprechen. Ich werde in Deutschland studieren.',
            accepted: ['ich werde', 'du wirst', 'er wird', 'wir werden'],
            explain: 'Futur I: werden en pos. 2 + infinitivo al FINAL. Ich werde … lernen. (no: ich werde lernen Deutsch)',
          },
          {
            scene: 'Animando a un compañero antes de su examen',
            prompt: 'Escribe 3 frases de ánimo sobre el futuro de tu compañero (du y er/sie).',
            answer: 'Du wirst das Examen bestehen! Du wirst Deutsch sprechen wie ein Profi! Er wird es schaffen!',
            accepted: ['du wirst', 'er wird', 'sie wird', 'ihr werdet'],
            explain: 'Futur I para predicciones/ánimo. Du wirst + infinitivo al final. Er/sie wird + infinitivo al final.',
          },
          {
            scene: 'Prediciendo el futuro de WeLearn',
            prompt: 'Escribe 2 predicciones sobre el futuro de WeLearn como academia usando werden.',
            answer: 'WeLearn wird die beste Sprachschule Kolumbiens werden. Es werden viele neue Kurse kommen.',
            accepted: ['wird ', 'werden ', 'werde ', 'wirst '],
            explain: 'Predicciones institucionales: werden + infinitivo al final. WeLearn (es) → wird. Viele Kurse (sie) → werden.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un párrafo sobre tus planes y predicciones usando ambas estrategias de futuro.',
        type: 'write',
        items: [
          {
            scene: 'Tu visión de futuro con el alemán',
            prompt: 'Escribe un párrafo (4-5 frases) sobre tus metas con el alemán: planes concretos (Präsens) y metas (werden).',
            answer: 'Morgen lerne ich zwei Stunden Deutsch. Nächste Woche beginne ich mit Grammatik B1. In einem Jahr werde ich die Goethe-Prüfung B1 machen. Ich werde in Deutschland eine Stelle finden. Das wird toll sein!',
            accepted: ['morgen ', 'nächste woche ', 'in einem jahr ', 'werde ', 'wird '],
            explain: 'Combina Präsens + tiempo para planes concretos y werden + infinitivo para metas y predicciones.',
          },
          {
            scene: 'Escribiendo sobre el futuro de un amigo',
            prompt: 'Escribe 4 frases sobre lo que hará tu amigo la próxima semana y sus metas a futuro.',
            answer: 'Nächste Woche fährt mein Freund nach Berlin. Er besucht die Uni. Er wird dort Deutsch studieren. Er wird viele neue Freunde finden.',
            accepted: ['nächste woche ', 'morgen ', 'bald ', 'wird ', 'werden '],
            explain: 'Mezcla Präsens (planes concretos próximos) y werden (predicciones/metas). er/sie → wird.',
          },
          {
            scene: 'Tu discurso motivacional en WeLearn',
            prompt: 'Escribe 3 frases motivacionales sobre el futuro de los estudiantes de WeLearn usando ihr werdet y Sie werden.',
            answer: 'Ihr werdet Deutsch fließend sprechen! Sie werden Ihre Träume erreichen! Wir werden zusammen wachsen!',
            accepted: ['ihr werdet', 'sie werden', 'wir werden', 'du wirst'],
            explain: 'Ihr + werden → werdet. Sie (formal plural) → werden. Wir → werden. Infinitivo siempre al final.',
          },
        ],
      },
    ],
  },
}

export default topic
