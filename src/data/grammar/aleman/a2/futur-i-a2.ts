import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futur-i-a2',
  order: '15',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Futur I: werden + Infinitiv',
  shortTitle: 'Futur I',
  metaTitle: 'Futuro I en alemán A2 — werden + Infinitiv',
  description:
    'El Futur I en alemán se forma con el auxiliar "werden" conjugado más el infinitivo del verbo principal al final de la oración. Se usa para expresar predicciones, promesas, intenciones o suposiciones sobre el presente o el futuro.',
  lead: 'El futuro formal del alemán: werden conjugado + Infinitiv al final.',
  outcomes: [
    'Conjugar werden (werde/wirst/wird/werden/werdet/werden)',
    'Formar oraciones de futuro con Infinitiv al final',
    'Distinguir el uso de Futur I del Präsens para el futuro',
    'Expresar predicciones y promesas con werden',
  ],

  guide: {
    goal: 'Usar werden + Infinitiv para expresar el futuro y hacer predicciones.',
    model: 'Ich werde morgen kommen. / Es wird regnen. / Wir werden gewinnen!',
    formula: 'Sujeto + werden (conjugado) + ... + Infinitiv',
    decisions: [
      'Conjugación de werden: ich werde, du wirst, er/sie/es wird, wir werden, ihr werdet, sie/Sie werden',
      'El infinitivo del verbo principal va SIEMPRE al final de la oración',
      'En alemán cotidiano, el Präsens + adverbio de tiempo (morgen, bald, nächste Woche) a menudo reemplaza al Futur I',
      'Futur I se prefiere para: predicciones ("Es wird regnen"), promesas ("Ich werde das machen"), suposiciones sobre el presente ("Er wird jetzt schlafen")',
      'Con verbos modales en futuro: werde + Infinitiv del modal + Infinitiv: "Ich werde kommen können" (poco común)',
      'Negación: "nicht" antes del Infinitiv final: "Ich werde nicht kommen."',
    ],
    table: [
      ['Person', 'werden', 'Beispiel'],
      ['ich', 'werde', 'Ich werde lernen'],
      ['du', 'wirst', 'Du wirst kommen'],
      ['er/sie/es', 'wird', 'Es wird regnen'],
      ['wir', 'werden', 'Wir werden gewinnen'],
      ['ihr', 'werdet', 'Ihr werdet sehen'],
      ['sie/Sie', 'werden', 'Sie werden ankommen'],
    ],
    mistakes: [
      'Colocar el infinitivo en posición 2: INCORRECTO "Ich werde kommen morgen" → CORRECTO "Ich werde morgen kommen"',
      'Confundir werden (futuro) con werden (pasiva): contexto determina el uso',
      'Usar werden con "zu + Infinitiv": INCORRECTO "Ich werde zu kommen" → CORRECTO "Ich werde kommen"',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa Futur I y cuándo Präsens en alemán?',
      paragraphs: [
        'En alemán, el Präsens con un marcador temporal (morgen, bald, nächste Woche, in einem Jahr) es la forma más natural de expresar planes concretos futuros: "Ich fahre morgen nach Berlin." El Futur I con werden se reserva para predicciones, promesas solemnes, suposiciones y cuando quieres enfatizar el futuro.',
        '"Ich werde morgen nach Berlin fahren" suena más enfático o formal. En el habla cotidiana, "Ich fahre morgen nach Berlin" es más frecuente.',
      ],
    },
    {
      heading: '¿Cómo se usa werden para suposiciones en alemán?',
      paragraphs: [
        'Una función especial del Futur I es expresar suposiciones o conjeturas sobre lo que está pasando ahora mismo: "Er wird jetzt schlafen" (Supongo que ahora estará durmiendo). Esta estructura equivale al español "debería estar durmiendo" o "estará durmiendo".',
      ],
    },
    {
      heading: '¿Cómo se conjuga werden en alemán?',
      paragraphs: [
        'werden tiene una forma irregular en du (wirst) y er/sie/es (wird). El resto es regular: ich werde, wir werden, ihr werdet, sie/Sie werden. Atención: en Präteritum, werden se convierte en wurde/wurden (forma pasiva pasada).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futur I: werden conjugado + Infinitiv al final. Uso: predicciones y promesas.',
    graphicPrompt: 'Línea temporal con flechas hacia el futuro y el auxiliar werden destacado.',
    scene: [
      ['Ich werde morgen früh aufstehen', 'Mañana me levantaré temprano'],
      ['Es wird bald regnen', 'Pronto lloverá'],
      ['Wir werden das Spiel gewinnen', 'Ganaremos el partido'],
      ['Du wirst das verstehen', 'Entenderás esto'],
      ['Sie wird eine tolle Lehrerin sein', 'Será una profesora estupenda'],
      ['Ihr werdet es nicht bereuen', 'No os arrepentiréis'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['werde/wirst/wird/werden/werdet', 'Infinitiv al final', 'predicciones y promesas'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de werden.',
        type: 'choice',
        items: [
          {
            scene: 'Prometiendo algo',
            lines: [['', 'Ich ___ das nie vergessen.']],
            options: ['werde', 'wirst', 'wird', 'werden'],
            answer: 'werde',
            explain: '1.ª persona singular: ich werde.',
          },
          {
            scene: 'Predicción sobre alguien',
            lines: [['', 'Er ___ ein guter Arzt werden.']],
            options: ['wird', 'werde', 'wirst', 'werdet'],
            answer: 'wird',
            explain: '3.ª persona singular: er wird.',
          },
          {
            scene: 'Preguntando por planes',
            lines: [['', '___ du morgen kommen?']],
            options: ['Wirst', 'Wird', 'Werden', 'Werdet'],
            answer: 'Wirst',
            explain: '2.ª persona singular: du wirst → Wirst du...? (pregunta).',
          },
          {
            scene: 'Una predicción del tiempo',
            lines: [['', 'Es ___ morgen schneien.']],
            options: ['wird', 'werde', 'wirst', 'werden'],
            answer: 'wird',
            explain: '3.ª persona singular (es): es wird.',
          },
          {
            scene: 'Un plan de grupo',
            lines: [['', 'Wir ___ zusammen feiern.']],
            options: ['werden', 'werde', 'wird', 'werdet'],
            answer: 'werden',
            explain: '1.ª persona plural: wir werden.',
          },
          {
            scene: 'Prometiendo a vosotros',
            lines: [['', 'Ihr ___ das nicht bereuen.']],
            options: ['werdet', 'werden', 'werde', 'wirst'],
            answer: 'werdet',
            explain: '2.ª persona plural: ihr werdet.',
          },
          {
            scene: 'Una predicción sobre ellos',
            lines: [['', 'Sie ___ bald ankommen.']],
            options: ['werden', 'werde', 'wird', 'werdet'],
            answer: 'werden',
            explain: '3.ª persona plural (sie): sie werden.',
          },
          {
            scene: 'Hablando del viaje',
            lines: [['', 'Du ___ die Reise sicher genießen.']],
            options: ['wirst', 'wird', 'werden', 'werde'],
            answer: 'wirst',
            explain: '2.ª persona singular: du wirst.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa la forma de werden y el infinitivo al final.',
        type: 'dual',
        items: [
          {
            scene: 'Prometiendo llamar mañana',
            lines: [['', 'Ich [[0]] dich morgen [[1]]. (werden, anrufen)']],
            blanks: [
              { options: ['werde', 'wird', 'wirst', 'werden'], answer: 'werde', explain: 'ich werde (1.ª persona singular).' },
              { options: ['anrufen', 'angerufen', 'zu anrufen', 'anruf'], answer: 'anrufen', explain: 'Infinitiv al final: anrufen (sin zu).' },
            ],
          },
          {
            scene: 'Una predicción sobre el partido',
            lines: [['', 'Unser Team [[0]] das Spiel [[1]]. (werden, gewinnen)']],
            blanks: [
              { options: ['wird', 'werde', 'werden', 'werdet'], answer: 'wird', explain: 'unser Team = es → 3.ª persona sg.: wird.' },
              { options: ['gewinnen', 'gewinnt', 'zu gewinnen', 'gewonnen'], answer: 'gewinnen', explain: 'Infinitiv al final: gewinnen.' },
            ],
          },
          {
            scene: 'Planes de vacaciones',
            lines: [['', 'Wir [[0]] nächsten Sommer nach Italien [[1]]. (werden, fahren)']],
            blanks: [
              { options: ['werden', 'werde', 'wird', 'werdet'], answer: 'werden', explain: 'wir → 1.ª persona plural: werden.' },
              { options: ['fahren', 'gefahren', 'zu fahren', 'fährt'], answer: 'fahren', explain: 'Infinitiv al final: fahren.' },
            ],
          },
          {
            scene: 'Una suposición sobre alguien',
            lines: [['', 'Sie [[0]] jetzt wohl zu Hause [[1]]. (werden, sein)']],
            blanks: [
              { options: ['wird', 'werde', 'werden', 'wirst'], answer: 'wird', explain: 'sie (singular) → 3.ª persona sg.: wird.' },
              { options: ['sein', 'ist', 'zu sein', 'war'], answer: 'sein', explain: 'Infinitiv al final: sein.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las formas correctas de werden.',
        type: 'guidedText',
        scene: 'Laura habla sobre sus planes para el próximo año.',
        text: 'Nächstes Jahr [[0]] ich ein neues Studium anfangen. Meine Freundin [[1]] mich besuchen kommen. Wir [[2]] viel Zeit zusammen verbringen. Meine Eltern [[3]] sehr stolz sein. Ich [[4]] hart arbeiten müssen.',
        blanks: [
          { options: ['werde', 'wird', 'werden', 'wirst'], answer: 'werde', explain: 'ich → werde.' },
          { options: ['wird', 'werde', 'werden', 'wirst'], answer: 'wird', explain: 'meine Freundin (sie) → wird.' },
          { options: ['werden', 'werde', 'wird', 'werdet'], answer: 'werden', explain: 'wir → werden.' },
          { options: ['werden', 'werde', 'wird', 'werdet'], answer: 'werden', explain: 'meine Eltern (sie, pl.) → werden.' },
          { options: ['werde', 'wird', 'werden', 'wirst'], answer: 'werde', explain: 'ich → werde.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de werden sin opciones.',
        type: 'freeText',
        scene: 'La profesora hace predicciones sobre sus alumnos.',
        text: 'Du [[0]] eines Tages ein großer Künstler sein. Ihr [[1]] alle euren Traum erreichen. Er [[2]] sicher Erfolg haben. Wir [[3]] eine tolle Zeit in der Schule haben. Ich [[4]] immer an euch denken.',
        blanks: [
          { answer: 'wirst', accepted: ['wirst'], explain: 'du → wirst.' },
          { answer: 'werdet', accepted: ['werdet'], explain: 'ihr → werdet.' },
          { answer: 'wird', accepted: ['wird'], explain: 'er → wird.' },
          { answer: 'werden', accepted: ['werden'], explain: 'wir → werden.' },
          { answer: 'werde', accepted: ['werde'], explain: 'ich → werde.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones de futuro con werden + Infinitiv.',
        type: 'write',
        items: [
          {
            scene: 'Tus planes para mañana',
            prompt: 'Di qué harás mañana (ich werde... + Infinitiv).',
            answer: 'Ich werde morgen früh aufstehen und joggen gehen.',
            accepted: ['werde morgen', 'werde ... machen', 'werde ... gehen'],
            explain: 'ich werde + Adverb + Infinitiv al final.',
          },
          {
            scene: 'Una predicción del tiempo',
            prompt: 'Haz una predicción sobre el tiempo de mañana (Es wird...).',
            answer: 'Es wird morgen sehr kalt und windig sein.',
            accepted: ['Es wird', 'Es wird ... sein', 'Es wird regnen'],
            explain: 'es wird + adjetivo/Infinitiv al final.',
          },
          {
            scene: 'Prometiendo a un amigo',
            prompt: 'Haz una promesa a tu amigo/a (Ich werde... versprechen o directamente).',
            answer: 'Ich werde dich morgen Abend anrufen.',
            accepted: ['werde dich', 'werde ... anrufen', 'werde pünktlich'],
            explain: 'ich werde + Infinitiv al final. Verbos separables: anrufen (sin separación en infinitivo).',
          },
          {
            scene: 'Una suposición sobre alguien',
            prompt: 'Haz una suposición sobre lo que alguien está haciendo ahora (Er/Sie wird + wohl + Infinitiv).',
            answer: 'Er wird wohl jetzt schlafen.',
            accepted: ['wird wohl', 'wird jetzt', 'wird ... sein'],
            explain: '"wohl" añade el matiz de suposición/probabilidad. Infinitiv al final.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe sobre tu futuro usando Futur I de forma natural.',
        type: 'write',
        items: [
          {
            scene: 'Tus planes para el próximo año',
            prompt: 'Escribe 2-3 planes para el año que viene usando werden.',
            answer: 'Nächstes Jahr werde ich Spanisch lernen. Ich werde auch mehr reisen. Vielleicht werde ich einen neuen Job suchen.',
            accepted: ['werde ich', 'werde ... lernen', 'werde ... reisen', 'werde ... suchen'],
            explain: 'werde + Infinitiv al final. Orden: Nächstes Jahr werde ich... (sujeto después del verbo cuando hay adverbio al inicio).',
          },
          {
            scene: 'Predicciones sobre el futuro',
            prompt: 'Haz 3 predicciones sobre el mundo en 20 años.',
            answer: 'In 20 Jahren werden die Menschen auf dem Mond leben. Die Technologie wird noch intelligenter sein. Viele Jobs werden von Maschinen gemacht werden.',
            accepted: ['werden ... leben', 'wird ... sein', 'werden ... werden'],
            explain: 'werden + Infinitiv. Para plurales y wir/sie: werden.',
          },
          {
            scene: 'Promesas',
            prompt: 'Haz 3 promesas a alguien que quieres (Ich werde...).',
            answer: 'Ich werde immer für dich da sein. Ich werde dich nie vergessen. Ich werde alles tun, um dich glücklich zu machen.',
            accepted: ['Ich werde', 'werde immer', 'werde nie', 'werde alles'],
            explain: 'ich werde + Infinitiv al final. Para énfasis emocional, Futur I es más apropiado que Präsens.',
          },
        ],
      },
    ],
  },
}

export default topic
