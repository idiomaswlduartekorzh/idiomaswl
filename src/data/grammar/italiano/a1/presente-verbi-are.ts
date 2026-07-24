import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'presente-verbi-are',
  order: '06',
  color: '#059669',
  category: 'Verbos',
  level: 'A1',
  title: 'Presente dei verbi -are en italiano A1 — Primera conjugación',
  shortTitle: 'Presente -are',
  metaTitle: 'Presente verbi -are italiano A1 — conjugación: parlare, studiare, lavorare (tabla)',
  description:
    'Los verbos en -are son la primera y más numerosa conjugación del italiano. En presente: -o, -i, -a, -iamo, -ate, -ano. Son verbos como parlare (hablar), studiare (estudiar), mangiare (comer), lavorare (trabajar). Con esta conjugación puedes expresar acciones cotidianas en italiano A1.',
  lead: 'Verbos -are: quita -are, añade -o/-i/-a/-iamo/-ate/-ano. Parlare → parlo/parli/parla/parliamo/parlate/parlano. La terminación ya dice "quién" — el pronombre es opcional.',
  outcomes: [
    'Conjuga verbos regulares en -are en presente para los 6 sujetos',
    'Reconoce cuándo el pronombre es necesario y cuándo puede omitirse',
    'Usa verbos frecuentes: parlare, studiare, lavorare, abitare, mangiare',
  ],

  guide: {
    goal: 'Conjugar verbos regulares en -are en presente indicativo del italiano A1.',
    model: 'parlare → parlo, parli, parla, parliamo, parlate, parlano',
    formula: 'radical + -o / -i / -a / -iamo / -ate / -ano',
    decisions: [
      'io → -o: parlo, studio, lavoro',
      'tu → -i: parli, studi, lavori',
      'lui/lei → -a: parla, studia, lavora',
      'noi → -iamo: parliamo, studiamo, lavoriamo',
      'voi → -ate: parlate, studiate, lavorate',
      'loro → -ano: parlano, studiano, lavorano',
      'Verbos en -iare (studiare): tu studi (no studii), noi studiamo (no studiiamo)',
      'Verbos en -care/-gare: cercare → cerchi (tu) para mantener sonido k',
    ],
    table: [
      ['Sujeto', 'Terminación', 'parlare'],
      ['io', '-o', 'parlo'],
      ['tu', '-i', 'parli'],
      ['lui/lei', '-a', 'parla'],
      ['noi', '-iamo', 'parliamo'],
      ['voi', '-ate', 'parlate'],
      ['loro', '-ano', 'parlano'],
    ],
    mistakes: [
      'Tu "studi" (no "studii") — verbos en -iare pierden una i en tu y noi es normal: studiamo.',
      '"Loro parlano" (no "parlono") — la tercera plural siempre termina en -ano.',
      'La negazione: non + verbo: non parlo = no hablo. Non antes del verbo.',
    ],
  },
  seo: [
    {
      heading: 'Los verbos -are: la conjugación más usada del italiano',
      paragraphs: [
        'Los verbos de la primera conjugación (-are) son los más numerosos y regulares del italiano. Se conjugan quitando -are del infinitivo y añadiendo las terminaciones -o, -i, -a, -iamo, -ate, -ano. Una vez sabes el patrón, conjugas cientos de verbos: parlare, lavorare, abitare, ascoltare, comprare, guardare… Compara el mismo patrón aplicado a tres verbos frecuentes:',
      ],
      table: [
        ['Persona', 'parlare (hablar)', 'lavorare (trabajar)', 'mangiare (comer)'],
        ['io', 'parlo', 'lavoro', 'mangio'],
        ['tu', 'parli', 'lavori', 'mangi'],
        ['lui/lei', 'parla', 'lavora', 'mangia'],
        ['noi', 'parliamo', 'lavoriamo', 'mangiamo'],
        ['voi', 'parlate', 'lavorate', 'mangiate'],
        ['loro', 'parlano', 'lavorano', 'mangiano'],
      ],
    },
    {
      heading: 'Verbos en -iare: una i menos',
      paragraphs: [
        'Los verbos en -iare como studiare, mangiare, viaggiare presentan una pequeña variación: en las formas de tu y noi, la i del radical no se duplica. "Tu studi" (no "studii"), "noi mangiamo" (no "mangiiamo"). Esto es para evitar la doble i que sería antifonética en italiano.',
        'En las otras personas el patrón es normal: studio, studia, studiate, studiano. La regla es sencilla: solo en tu y noi pierden una i — en las demás formas es regular.',
      ],
    },
    {
      heading: 'Verbos en -care y -gare: la h que salva el sonido',
      paragraphs: [
        'Los verbos en -care (cercare, giocare) y -gare (pagare, spiegare) añaden una h en las formas de tu y noi. ¿Por qué? Porque sin la h, la c y la g sonarían suaves (como "ch" y "ll") delante de la terminación -i. La h mantiene el sonido fuerte /k/ y /g/ del infinitivo:',
      ],
      table: [
        ['Infinitivo', 'tu', 'noi', 'Por qué'],
        ['cercare', 'cerchi', 'cerchiamo', 'conserva el sonido /k/'],
        ['giocare', 'giochi', 'giochiamo', 'conserva el sonido /k/'],
        ['pagare', 'paghi', 'paghiamo', 'conserva el sonido /g/'],
        ['spiegare', 'spieghi', 'spieghiamo', 'conserva el sonido /g/'],
      ],
    },
    {
      heading: 'El pronombre: opcional pero útil',
      paragraphs: [
        'Como en todos los verbos italianos, el pronombre sujeto es opcional con los -are porque la terminación ya indica la persona. "Parlo italiano" = "Io parlo italiano". El pronombre se añade para énfasis o contraste: "Io studio lingue, tu studi matematica." Por eso frases cortas como "Mangi?" o "Lavoriamo insieme" son perfectamente naturales sin pronombre.',
      ],
    },
    {
      heading: '¿Cómo se conjugan los verbos en -are en italiano?',
      paragraphs: [
        'Quita la terminación -are del infinitivo y añade: -o (io), -i (tu), -a (lui/lei), -iamo (noi), -ate (voi), -ano (loro). Ejemplo con parlare: parlo, parli, parla, parliamo, parlate, parlano. Es la conjugación más regular del italiano.',
      ],
    },
    {
      heading: '¿Por qué "studi" no lleva doble i?',
      paragraphs: [
        'Los verbos en -iare (studiare, mangiare, viaggiare) ya tienen una i en el radical. En las formas de tu y noi no se duplica: "tu studi" (no "studii"), "noi studiamo" (no "studiiamo"). En el resto de personas la conjugación es totalmente regular: studio, studia, studiate, studiano.',
      ],
    },
  ],
  visual: {
    mode: 'verb-conjugation',
    teacherLens: 'El estudiante aprende el patrón -o/-i/-a/-iamo/-ate/-ano y lo aplica a verbos frecuentes.',
    graphicPrompt: 'Tabla de conjugación con radical + terminaciones. Verbos en -iare con nota de una i.',
    scene: [
      ['radical + -o/-i/-a', 'io/tu/lui-lei'],
      ['radical + -iamo/-ate/-ano', 'noi/voi/loro'],
      ['non + verbo', 'negación'],
    ],
    learnerModes: ['visual: tabla de conjugación', 'analítico: radical + terminación', 'oral: verbos de rutina'],
    practiceVerbs: ['parlare', 'studiare', 'lavorare', 'abitare', 'mangiare', 'ascoltare'],
    reviewFocus: ['loro -ano (no -ono)', 'verbos -iare: studi no studii', 'non antes del verbo', 'pronombre opcional'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Conjugación correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma verbal correcta del verbo entre paréntesis.',
        type: 'choice',
        items: [
          {
            scene: 'Yo hablo',
            lines: [['Carlo', 'Io ___ italiano e spagnolo. (parlare)']],
            options: ['parlo', 'parli', 'parla', 'parlano'],
            answer: 'parlo',
            explain: 'Io + -o: parlo. Primera persona singular.',
          },
          {
            scene: 'Tú estudias',
            lines: [['Sofia', 'Tu ___ molto bene. (studiare)']],
            options: ['studi', 'studio', 'studia', 'studiate'],
            answer: 'studi',
            explain: 'Tu + -i: studi. Verbo en -iare: una sola i.',
          },
          {
            scene: 'Ella trabaja',
            lines: [['Marco', 'Clara ___ come insegnante. (lavorare)']],
            options: ['lavora', 'lavoro', 'lavori', 'lavorano'],
            answer: 'lavora',
            explain: 'Lei + -a: lavora. Tercera persona singular.',
          },
          {
            scene: 'Nosotros hablamos',
            lines: [['Bruno', 'Noi ___ italiano in classe. (parlare)']],
            options: ['parliamo', 'parlate', 'parlano'],
            answer: 'parliamo',
            explain: 'Noi + -iamo: parliamo.',
          },
          {
            scene: 'Vosotros trabajáis',
            lines: [['Clara', 'Voi ___ molto. Siete stanchi? (lavorare)']],
            options: ['lavorate', 'lavorano', 'lavoriamo', 'lavora'],
            answer: 'lavorate',
            explain: 'Voi + -ate: lavorate. Segunda persona plural.',
          },
          {
            scene: 'Ellos estudian',
            lines: [['Lina', 'I miei figli ___ all\'università. (studiare)']],
            options: ['studiano', 'studiate', 'studiamo', 'studia'],
            answer: 'studiano',
            explain: 'Loro + -ano: studiano. Tercera persona plural.',
          },
          {
            scene: 'Negación',
            lines: [['Ana', 'Marco non ___ la mattina — preferisce il pomeriggio. (lavorare)']],
            options: ['lavora', 'lavori', 'lavorano', 'lavoriamo'],
            answer: 'lavora',
            explain: 'Non lavora = no trabaja. Non + verbo conjugado en 3ª sg.',
          },
          {
            scene: 'Donde vivimos',
            lines: [['Carlo', 'Noi ___ a Bogotá. (abitare)']],
            options: ['abitiamo', 'abitate', 'abitano', 'abito'],
            answer: 'abitiamo',
            explain: 'Noi + -iamo: abitiamo. Primera persona plural.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos verbos en diálogo',
        tag: '2 espacios',
        intro: 'Conjuga los dos verbos del diálogo correctamente.',
        type: 'dual',
        items: [
          {
            scene: 'Idiomas que hablas',
            lines: [
 ['Sofia', 'Tu [[0]] italiano? (parlare)'],
 ['Carlo', 'Sì, e [[1]] anche lo spagnolo. (studiare)'],
 ],
            blanks: [
              { options: ['parli', 'parla', 'parlate'], answer: 'parli', explain: 'Tu parli = tú hablas. -are tu → -i.' },
              { options: ['studio', 'studi', 'studia'], answer: 'studio', explain: 'Io studio = yo estudio. -are io → -o.' },
            ],
          },
          {
            scene: 'Rutina diaria',
            lines: [['Bruno', 'La mattina [[0]] e la sera [[1]]. (lavorare / studiare)']],
            blanks: [
              { options: ['lavoro', 'lavori', 'lavora'], answer: 'lavoro', explain: 'Io lavoro = yo trabajo. Primera sg.' },
              { options: ['studio', 'studi', 'studia'], answer: 'studio', explain: 'Io studio = yo estudio. Primera sg.' },
            ],
          },
          {
            scene: 'Ellos y nosotros',
            lines: [['Clara', 'Loro [[0]] tutto il giorno e noi [[1]] insieme la sera. (lavorare / mangiare)']],
            blanks: [
              { options: ['lavorano', 'lavoriamo', 'lavorate'], answer: 'lavorano', explain: 'Loro lavorano = ellos trabajan. Tercera pl.' },
              { options: ['mangiamo', 'mangiano', 'mangiate'], answer: 'mangiamo', explain: 'Noi mangiamo = nosotros comemos. Primera pl.' },
            ],
          },
          {
            scene: 'Dónde vives',
            lines: [
 ['Marco', 'Tu dove [[0]]? (abitare)'],
 ['Sofia', 'Io [[1]] a Milano, in centro. (abitare)'],
 ],
            blanks: [
              { options: ['abiti', 'abita', 'abito'], answer: 'abiti', explain: 'Tu abiti = tú vives. -are tu → -i.' },
              { options: ['abito', 'abiti', 'abita'], answer: 'abito', explain: 'Io abito = yo vivo. -are io → -o.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Conjuga los verbos para completar la presentación.',
        type: 'guidedText',
        scene: 'Un día normal de Bruno en WeLearn',
        text: 'Bruno [[0]] (lavorare) a WeLearn ogni giorno. La mattina [[1]] (studiare) le nuove lezioni e [[2]] (preparare) i materiali. A pranzo [[3]] (mangiare) con Clara. Nel pomeriggio [[4]] (insegnare) le classi. Gli studenti [[5]] (ascoltare) e [[6]] (domandare) molte cose. È una bella vita!',
        blanks: [
          { options: ['lavora', 'lavoro', 'lavorano'], answer: 'lavora', explain: 'Bruno (lui) lavora. Terza sg.' },
          { options: ['studia', 'studio', 'studiano'], answer: 'studia', explain: 'Lui studia. Stesso soggetto.' },
          { options: ['prepara', 'preparo', 'preparano'], answer: 'prepara', explain: 'Lui prepara. Terza sg.' },
          { options: ['mangia', 'mangio', 'mangiano'], answer: 'mangia', explain: 'Lui mangia. Verbo -iare, terza sg → -a.' },
          { options: ['insegna', 'insegno', 'insegnano'], answer: 'insegna', explain: 'Lui insegna. Terza sg.' },
          { options: ['ascoltano', 'ascolta', 'ascoltiamo'], answer: 'ascoltano', explain: 'Gli studenti (loro) ascoltano. Terza pl.' },
          { options: ['domandano', 'domanda', 'domandiamo'], answer: 'domandano', explain: 'Loro domandano. Terza pl.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Conjuga el verbo indicado sin opciones.',
        type: 'freeText',
        scene: 'Estudiantes de italiano en Bogotá',
        text: 'Noi [[0]] (studiare) italiano a Bogotá. Io [[1]] (parlare) italiano con i miei amici. Voi [[2]] (abitare) vicino alla scuola? Marco [[3]] (lavorare) e [[4]] (studiare) al tempo stesso. I professori [[5]] (insegnare) con passione. Tu dove [[6]] (mangiare) di solito?',
        blanks: [
          { answer: 'studiamo', explain: 'Noi studiamo. Prima plurale.' },
          { answer: 'parlo', explain: 'Io parlo. Prima singolare.' },
          { answer: 'abitate', explain: 'Voi abitate. Seconda plurale.' },
          { answer: 'lavora', explain: 'Marco (lui) lavora. Terza singolare.' },
          { answer: 'studia', explain: 'Lui studia. Stesso soggetto.' },
          { answer: 'insegnano', explain: 'I professori (loro) insegnano. Terza plurale.' },
          { answer: 'mangi', explain: 'Tu mangi. Seconda singolare. -iare tu → -i.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la frase completa con el verbo conjugado.',
        type: 'write',
        items: [
          {
            scene: 'Yo hablo italiano',
            prompt: 'Escribe: Yo hablo italiano y español. → Io ___ italiano e spagnolo. (parlare)',
            answer: 'Io parlo italiano e spagnolo.',
            accepted: ['io parlo italiano e spagnolo', 'io parlo italiano e spagnolo.'],
            explain: 'Io parlo. Primera sg de parlare (-are → -o).',
          },
          {
            scene: 'Ellos estudian',
            prompt: 'Escribe: Ellos estudian en la universidad. → Loro ___ all\'università. (studiare)',
            answer: 'Loro studiano all\'università.',
            accepted: ['loro studiano all\'università', 'loro studiano all\'università.'],
            explain: 'Loro studiano. Tercera pl de studiare (-are → -ano).',
          },
          {
            scene: 'Nosotros trabajamos',
            prompt: 'Escribe: Nosotros trabajamos mucho. → Noi ___ molto. (lavorare)',
            answer: 'Noi lavoriamo molto.',
            accepted: ['noi lavoriamo molto', 'noi lavoriamo molto.'],
            explain: 'Noi lavoriamo. Primera pl de lavorare (-are → -iamo).',
          },
          {
            scene: 'Negación',
            prompt: 'Escribe: Ella no habla inglés. → Lei non ___ inglese. (parlare)',
            answer: 'Lei non parla inglese.',
            accepted: ['lei non parla inglese', 'lei non parla inglese.'],
            explain: 'Non parla = no habla. Non antes del verbo conjugado.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Habla de tu rutina en italiano usando verbos -are.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina',
            prompt: 'Descrivi la tua giornata: La mattina ___. Il pomeriggio ___. La sera ___.',
            answer: 'La mattina lavoro. Il pomeriggio studio l\'italiano. La sera mangio con la famiglia.',
            accepted: [
              'la mattina lavoro il pomeriggio studio l\'italiano la sera mangio con la famiglia',
              'la mattina studio il pomeriggio lavoro la sera mangio',
            ],
            explain: 'Verbi -are in prima singolare: lavoro, studio, mangio.',
          },
          {
            scene: 'Tu compañero',
            prompt: 'Descrivi il tuo amico/la tua amica: ___ [nome]. Lui/Lei ___ e ___.',
            answer: 'Il mio amico si chiama Marco. Lui lavora e studia l\'italiano.',
            accepted: ['il mio amico si chiama marco lui lavora e studia l\'italiano', 'la mia amica si chiama sofia lei studia e lavora'],
            explain: 'Lui/lei + terza sg: lavora, studia.',
          },
          {
            scene: 'Vuestra clase',
            prompt: 'Noi ___ italiano. In classe ___ e ___.',
            answer: 'Noi studiamo italiano. In classe parliamo e ascoltiamo.',
            accepted: ['noi studiamo italiano in classe parliamo e ascoltiamo'],
            explain: 'Noi: studiamo, parliamo, ascoltiamo. Prima plurale (-are → -iamo).',
          },
        ],
      },
    ],
  },
}

export default topic
