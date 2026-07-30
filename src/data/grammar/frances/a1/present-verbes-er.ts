import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-verbes-er',
  order: '06',
  color: '#059669',
  category: 'Verbes',
  level: 'A1',
  title: 'Le Présent des Verbes en -ER en Français A1',
  shortTitle: 'Présent verbes -ER',
  metaTitle: 'Le présent des verbes en -er en français A1 — parler, manger, habiter',
  description:
    'Los verbos regulares en -er forman el grupo más numeroso del francés (~90% de los verbos). Su conjugación en presente sigue un patrón regular: se quita -er y se añaden las terminaciones -e, -es, -e, -ons, -ez, -ent. Aunque hay 6 terminaciones escritas, muchas suenan igual.',
  lead: 'Más del 90% de los verbos franceses son del primer grupo (-er). Aprende un patrón y conjugas cientos de verbos. Pista: 4 de las 6 formas suenan idénticas.',
  outcomes: ['Conjuga verbos -er en 6 personas', 'Aplica la regla de las terminaciones regulares', 'Forma negaciones e interrogaciones'],

  guide: {
    goal: 'Conjugar verbos del primer grupo (-er) en presente de indicativo.',
    model: 'Je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent.',
    formula: 'Raíz (infinitivo − er) + terminación (-e/-es/-e/-ons/-ez/-ent)',
    decisions: [
      'Raíz: quitar -er del infinitivo: parler → parl-, habiter → habit-, travailler → travaill-',
      'Terminaciones: -e, -es, -e, -ons, -ez, -ent',
      'Pronunciación: je/tu/il/ils suenan IGUAL (las terminaciones -e/-es/-ent son mudas)',
      'Solo nous (-ons) y vous (-ez) tienen pronunciación distinta',
      'Verbos en -ger: ajouter -e devant -ons: nous mangeons (no "manGons")',
    ],
    table: [
      ['Pronombre', 'Terminación', 'Parler'],
      ['je', '-e', 'je parle'],
      ['tu', '-es', 'tu parles'],
      ['il / elle / on', '-e', 'il parle'],
      ['nous', '-ons', 'nous parlons'],
      ['vous', '-ez', 'vous parlez'],
      ['ils / elles', '-ent', 'ils parlent'],
    ],
    mistakes: [
      '"Je parlons" ❌ — "nous" toma -ons, no "je"',
      '"Il parles" ❌ — "il/elle" toma -e sin s',
      '"Nous mangons" ❌ → "nous mangeons" ✓ (conservar el sonido /ʒ/)',
    ],
  },

  seo: [
    {
      heading: '¿Por qué los verbos en -er son el núcleo del francés?',
      paragraphs: [
        'Los verbos del primer grupo, los terminados en -er (infinitivo), representan más del 90% de los verbos franceses. Además, casi todos los verbos nuevos que el francés adopta del inglés o que crea son del primer grupo: télécharger (descargar), bloguer, googler, etc.',
        'La gran ventaja: todos se conjugan con el mismo patrón. Una vez aprendido, puedes conjugar cientos de verbos: parler (hablar), habiter (vivir), travailler (trabajar), manger (comer), aimer (amar/gustar), étudier (estudiar), regarder (mirar/ver).',
      ],
    },
    {
      heading: '¿Cómo se conjugan los verbos en -er en presente?',
      paragraphs: [
        'Pasos: (1) Toma el infinitivo: parler. (2) Quita -er: parl-. (3) Añade las terminaciones según el pronombre sujeto.',
        'Un dato importante para la pronunciación: las terminaciones -e (je), -es (tu) y -ent (ils) son completamente mudas. Por eso "je parle", "tu parles" e "ils parlent" suenan exactamente igual: /parl/. Solo "nous parlons" y "vous parlez" tienen pronunciación diferente.',
      ],
      table: [
        ['Pronombre', 'Terminación', 'Ejemplo (parler)'],
        ['je', '-e', 'je parle'],
        ['tu', '-es', 'tu parles'],
        ['il/elle', '-e', 'il parle'],
        ['nous', '-ons', 'nous parlons'],
        ['vous', '-ez', 'vous parlez'],
        ['ils/elles', '-ent', 'ils parlent'],
      ],
    },
    {
      heading: 'Verbos frecuentes del primer grupo',
      paragraphs: [
        'Algunos verbos -er esenciales para A1: parler (hablar), habiter (vivir/habitar), travailler (trabajar), étudier (estudiar), aimer (amar, querer, gustar), manger (comer), regarder (mirar/ver TV), écouter (escuchar), chercher (buscar), acheter (comprar).',
        'También: voyager (viajar), danser (bailar), chanter (cantar), jouer (jugar), penser (pensar), demander (pedir/preguntar), trouver (encontrar), donner (dar), visiter (visitar).',
      ],
    },
    {
      heading: '¿Cómo se conjugan los verbos en -ger y -cer en francés?',
      paragraphs: [
        'Los verbos en -ger (manger, voyager, nager) añaden una -e antes de la terminación -ons para conservar el sonido suave de la g: nous mangeons, nous voyageons, nous nageons (no "manGons").',
        'Los verbos en -cer (commencer, lancer) cambian la c por ç antes de -ons: nous commençons. Estos son los únicos cambios ortográficos del primer grupo en A1.',
      ],
    },
    {
      heading: 'Negación e interrogación de verbos -er',
      paragraphs: [
        'Negación: ne... pas envuelve al verbo. Je ne parle pas anglais. / Elle ne travaille pas le lundi. / Ils ne mangent pas de viande.',
        'Pregunta en A1: usa Est-ce que + orden normal: Est-ce que tu parles français? / Est-ce qu\'il habite à Paris? También se puede usar la entonación ascendente: Tu parles français? (forma coloquial)',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Verbos -er regulares: el patrón más productivo del francés.',
    graphicPrompt: 'Tabla de conjugación con parler como modelo y ejemplos adicionales.',
    scene: [
      ['parler', 'je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent'],
      ['habiter', 'j\'habite à Madrid, tu habites à Paris...'],
      ['travailler', 'elle travaille beaucoup, nous travaillons ensemble'],
      ['manger', 'on mange à midi, nous mangeons ensemble'],
      ['aimer', 'j\'aime le français, ils aiment voyager'],
      ['étudier', 'tu étudies le soir, vous étudiez le français ?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['parler', 'habiter', 'travailler', 'manger', 'aimer', 'étudier', 'regarder', 'écouter'],
    reviewFocus: ['terminaciones mudas', 'nous -ons / vous -ez', 'manger → mangeons'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la conjugación correcta del verbo entre paréntesis.',
        type: 'choice',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je ___ français. (parler)']],
            options: ['parle', 'parles', 'parlez', 'parlons'],
            answer: 'parle',
            explain: '"Je" → terminación -e: "je parle". La -e final es muda.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Tu ___ à Paris ? (habiter)']],
            options: ['habites', 'habite', 'habitez', 'habitons'],
            answer: 'habites',
            explain: '"Tu" → terminación -es: "tu habites". La -es final es muda.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Elle ___ beaucoup. (travailler)']],
            options: ['travaille', 'travailles', 'travaillent', 'travaillez'],
            answer: 'travaille',
            explain: '"Elle" → terminación -e: "elle travaille".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous ___ souvent ensemble. (manger)']],
            options: ['mangeons', 'mangons', 'mangez', 'mangent'],
            answer: 'mangeons',
            explain: '"Nous" → -ons, pero "manger" en -ger → "nous mangeons" (conservar /ʒ/).',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Vous ___ le français ? (apprendre... verbo: étudier)']],
            options: ['étudiez', 'étudient', 'étudions', 'étudie'],
            answer: 'étudiez',
            explain: '"Vous" → terminación -ez: "vous étudiez".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Ils ___ de la musique classique. (écouter)']],
            options: ['écoutent', 'écoute', 'écoutez', 'écoutons'],
            answer: 'écoutent',
            explain: '"Ils" → terminación -ent: "ils écoutent". La -ent es muda.',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'On ___ le match ce soir. (regarder)']],
            options: ['regarde', 'regardes', 'regardent', 'regardons'],
            answer: 'regarde',
            explain: '"On" se conjuga como "il/elle" → terminación -e: "on regarde".',
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Je ne ___ pas l\'anglais. (parler)']],
            options: ['parle', 'parles', 'parlez', 'parlons'],
            answer: 'parle',
            explain: 'Negación: "je ne parle pas". La conjugación no cambia, solo se añade ne...pas.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos decisiones',
        tag: '2 espacios',
        intro: 'Completa el pronombre y el verbo conjugado.',
        type: 'dual',
        items: [
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] le français et l\'espagnol. (parler)']],
            blanks: [
              { options: ['Je', 'Tu', 'Il', 'Nous'], answer: 'Je', explain: 'Primera persona singular.' },
              { options: ['parle', 'parles', 'parlons', 'parlent'], answer: 'parle', explain: '"Je" → "parle".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] [[1]] à Madrid depuis 5 ans. (habiter)']],
            blanks: [
              { options: ['Elle', 'Ils', 'Nous', 'Vous'], answer: 'Elle', explain: '"Depuis 5 ans" con sujeto femenino singular → "elle".' },
              { options: ['habite', 'habitent', 'habitons', 'habitez'], answer: 'habite', explain: '"Elle" → "habite".' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', 'Nous [[0]] ensemble ce soir. Tu [[1]] ? (manger/venir)']],
            blanks: [
              { options: ['mangeons', 'mangons', 'mangent', 'mangez'], answer: 'mangeons', explain: '"Nous" + verbo en -ger → "mangeons".' },
              { options: ['viens', 'venez', 'vient', 'venons'], answer: 'viens', explain: '"Tu viens?" — verbo venir (irrégulier): tu viens.' },
            ],
          },
          {
            scene: 'Diálogo en contexto',
            lines: [['', '[[0]] étudiants [[1]] beaucoup avant les examens. (travailler)']],
            blanks: [
              { options: ['Les', 'Des', 'Le', 'La'], answer: 'Les', explain: '"Les étudiants" — definido plural.' },
              { options: ['travaillent', 'travaille', 'travaillez', 'travaillons'], answer: 'travaillent', explain: '"Les étudiants" = ils → "travaillent".' },
            ],
          },
        ],
      },
      {
          id: 'level-3',
          title: 'Completa el texto',
          tag: 'Texto guiado',
          intro: 'Conjuga cada verbo en -er eligiendo la forma correcta según el sujeto.',
          type: 'guidedText',
        scene: 'Conjuga cada verbo en -er eligiendo la forma correcta según el sujeto.',
        text: 'Carla [[0]] à Lyon. Elle [[1]] dans un café le matin et [[2]] à l\'université l\'après-midi. Ses colocataires [[3]] aussi — ils [[4]] de la musique le soir. Le week-end, ils [[5]] au marché et [[6]] ensemble à la maison.',
        blanks: [
          { options: ['habite', 'habites', 'habitent', 'habitons'], answer: 'habite', explain: '"Carla" (elle) → "habite".' },
          { options: ['travaille', 'travailles', 'travaillent', 'travaillez'], answer: 'travaille', explain: '"Elle" → "travaille".' },
          { options: ['étudie', 'études', 'étudient', 'étudions'], answer: 'étudie', explain: '"Elle" → "étudie".' },
          { options: ['travaillent', 'travaille', 'travaillez', 'travaillons'], answer: 'travaillent', explain: '"Ses colocataires" (ils) → "travaillent".' },
          { options: ['écoutent', 'écoute', 'écoutez', 'écoutons'], answer: 'écoutent', explain: '"Ils" → "écoutent".' },
          { options: ['vont', 'va', 'allez', 'allons'], answer: 'vont', explain: '"Ils vont" — verbo aller (irrégulier): ils vont.' },
          { options: ['mangent', 'mange', 'mangeons', 'mangez'], answer: 'mangent', explain: '"Ils" → "mangent".' },
        ],
      },
      {
          id: 'level-4',
          title: 'Escribe sin ayuda',
          tag: 'Texto libre',
          intro: 'Conjuga el verbo entre paréntesis escribiendo la forma correcta.',
          type: 'freeText',
        scene: 'Conjuga el verbo entre paréntesis escribiendo la forma correcta.',
        text: 'Le soir, je [[0]] (regarder) la télé ou j\'[[1]] (écouter) de la musique. Mon frère [[2]] (préférer) jouer aux jeux vidéo. Nous [[3]] (manger) ensemble à 20h. Et toi, qu\'est-ce que tu [[4]] (aimer) faire le soir ?',
        blanks: [
          { answer: 'regarde', accepted: ['regarde'], explain: '"Je" → "regarde".' },
          { answer: 'écoute', accepted: ['écoute'], explain: '"J\'" = je → "écoute".' },
          { answer: 'préfère', accepted: ['préfère'], explain: '"Mon frère" (il) → "préfère" (verbos en -é→ -è devant terminaison muette).' },
          { answer: 'mangeons', accepted: ['mangeons'], explain: '"Nous" + -ger → "mangeons".' },
          { answer: 'aimes', accepted: ['aimes'], explain: '"Tu" → "aimes".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con verbos -er.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué lenguas hablas usando "je parle".',
            answer: 'Je parle espagnol et un peu de français.',
            accepted: ['je parle', 'je parle '],
            explain: 'Ejemplo: Je parle espagnol, anglais et français. / Je parle couramment l\'espagnol.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di dónde vives y qué trabajas/estudias (habiter/travailler/étudier).',
            answer: 'J\'habite à Bogotá. J\'étudie le français.',
            accepted: ["j'habite", "j'étudie", "je travaille", "j'étudie", "j'habite"],
            explain: 'Ejemplo: J\'habite à Madrid. Je travaille dans une école. / J\'étudie l\'économie.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di lo que haces los fines de semana (regarder/écouter/manger/voyager).',
            answer: 'Le week-end, je regarde des films et j\'écoute de la musique.',
            accepted: ['je regarde', "j'écoute", 'je mange', 'je voyage', 'je joue', 'je travaille', "j'achète"],
            explain: 'Ejemplo: Le week-end, je mange avec ma famille et je regarde des séries.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Escribe una frase negativa: algo que no haces.',
            answer: 'Je ne travaille pas le dimanche.',
            accepted: ['je ne', 'il ne', 'elle ne', 'nous ne', 'ils ne'],
            explain: 'Negación: ne + verbe + pas. Ejemplo: Je ne mange pas de viande. / Il ne travaille pas ici.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Misión: Décris ta journée habituelle en utilisant au moins 4 verbes en -er différents.',
        type: 'write',
        items: [
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué haces por la mañana (travailler/étudier/manger...).',
            answer: 'Le matin, je mange un croissant et je travaille de chez moi.',
            accepted: ['je mange', 'je travaille', "j'étudie", "j'écoute", 'je regarde', "j'habite"],
            explain: 'Ejemplo: Le matin, j\'étudie et j\'écoute de la musique en travaillant.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hace otra persona (il/elle + verbo -er).',
            answer: 'Ma mère travaille à l\'hôpital.',
            accepted: ['il travaille', 'elle travaille', 'il habite', 'elle habite', 'il écoute', 'elle écoute', 'il aime', 'elle aime'],
            explain: 'Ejemplo: Mon ami habite à Lyon. Il travaille dans un café le matin.',
          },
          {
            scene: 'Diálogo en contexto',
            prompt: 'Di qué hacen tú y tus amigos (nous + verbo -er).',
            answer: 'Nous parlons souvent en français pour pratiquer.',
            accepted: ['nous mangeons', 'nous parlons', 'nous habitons', 'nous travaillons', 'nous voyageons', 'nous aimons'],
            explain: 'Recuerda: nous → -ons. Si el verbo termina en -ger: nous mangeons, nous voyageons.',
          },
        ],
      },
    ],
  },
}

export default topic
