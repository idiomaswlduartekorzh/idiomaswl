import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'trapassato-prossimo-a2',
  order: '20',
  color: '#009246',
  category: 'Verbos',
  level: 'A2',
  title: 'Il trapassato prossimo en italiano A2: avevo mangiato, era partita',
  shortTitle: 'Trapassato prossimo',
  metaTitle: 'Trapassato prossimo en italiano A2 — avevo mangiato, era arrivata',
  description:
    'El trapassato prossimo es el equivalente italiano del pluscuamperfecto: expresa una acción pasada que ocurrió ANTES que otra acción también en el pasado. Se forma con el imperfecto de avere o essere + participio passato. Es esencial para narrar secuencias de eventos en el pasado.',
  lead: 'Avevo già mangiato quando sei arrivato: el pasado del pasado en italiano.',
  outcomes: [
    'Formar el trapassato con avevo/ero + participio passato',
    'Elegir el auxiliar correcto (avere o essere) igual que en il passato prossimo',
    'Usar il trapassato para la acción más antigua en una narración',
    'Conectar eventos con quando, dopo che, perché con trapassato',
  ],

  guide: {
    goal: 'Expresar una acción pasada que ocurrió antes que otra usando il trapassato prossimo.',
    model: 'Quando sono arrivato, lei era già partita. (Cuando llegué, ella ya se había ido.)',
    formula: 'Imperfetto di avere/essere + Participio passato',
    decisions: [
      'AVERE: verbos transitivos → avevo mangiato, avevi letto, aveva dormito',
      'ESSERE: verbos de movimiento, stato e riflessivi → ero arrivato/a, era partita, si erano alzati',
      'Con essere il participio concorda con il soggetto: era arrivata (femm.), erano arrivati (masc. pl.)',
      'Orden temporal: il trapassato = la acción MÁS ANTIGUA; il passato prossimo/imperfetto = la más reciente',
      '"già" (ya) y "ancora" (todavía) frecuentemente se usan con il trapassato para enfatizar la anterioridad',
    ],
    table: [
      ['Soggetto', 'Trapassato (avere)', 'Trapassato (essere)'],
      ['io', 'avevo mangiato', 'ero arrivato/a'],
      ['tu', 'avevi letto', 'eri partito/a'],
      ['lui/lei', 'aveva dormito', 'era tornato/a'],
      ['noi', 'avevamo studiato', 'eravamo usciti/e'],
      ['voi', 'avevate parlato', 'eravate arrivati/e'],
      ['loro', 'avevano finito', 'erano partiti/e'],
    ],
    mistakes: [
      '"Quando sono arrivato, lei partiva già" ❌ → "Quando sono arrivato, lei era già partita" ✓ — Para la acción más antigua se usa trapassato, no imperfetto.',
      '"Era arrivato" (maschile) ✓ vs "Era arrivata" (femminile) ✓ — El participio concuerda con el sujeto con "essere".',
      '"Avevo arrivato" ❌ → "Ero arrivato" ✓ — "arrivare" es un verbo de movimiento → auxiliar essere.',
    ],
  },

  seo: [
    {
      heading: 'El trapassato prossimo: formación con imperfetto + participio',
      paragraphs: [
        'El trapassato prossimo es el pluscuamperfecto italiano ("había comido"). Se forma con el auxiliar (avere o essere) en IMPERFETTO + el participio pasado. La elección del auxiliar y la concordancia funcionan igual que en el passato prossimo; lo único que cambia es que el auxiliar va en imperfetto (avevo/ero, no ho/sono). Esta es la tabla:',
      ],
      table: [
        ['Persona', 'con avere (mangiare)', 'con essere (andare)'],
        ['io', 'avevo mangiato', 'ero andato/a'],
        ['tu', 'avevi mangiato', 'eri andato/a'],
        ['lui/lei', 'aveva mangiato', 'era andato/a'],
        ['noi', 'avevamo mangiato', 'eravamo andati/e'],
        ['voi', 'avevate mangiato', 'eravate andati/e'],
        ['loro', 'avevano mangiato', 'erano andati/e'],
      ],
    },
    {
      heading: '¿Cómo se forma el trapassato prossimo en italiano?',
      paragraphs: [
        'Con el auxiliar (avere o essere) en imperfetto + el participio pasado: "avevo finito" (había terminado), "ero partito" (había salido). Se elige avere o essere con las mismas reglas del passato prossimo, y con essere el participio concuerda con el sujeto: "lei era arrivata".',
      ],
    },
    {
      heading: '¿Qué diferencia hay entre passato prossimo y trapassato prossimo?',
      paragraphs: [
        'El passato prossimo narra una acción pasada (ho mangiato = comí/he comido). El trapassato prossimo narra una acción anterior a otra acción pasada (avevo già mangiato quando è arrivato = ya había comido cuando llegó). El trapassato marca el "pasado del pasado".',
      ],
    },
    {
      heading: 'Elección del auxiliar: avere o essere',
      paragraphs: [
        'La elección del auxiliar en il trapassato prossimo sigue exactamente las mismas reglas que en il passato prossimo: verbos transitivos usan "avere", verbos de movimiento y estado y reflexivos usan "essere".',
        'Con "essere", el participio concuerda en género y número con el sujeto: "lei era arrivata" (femm. sing.), "loro erano arrivati" (masc. pl.).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Trapassato prossimo: azione passata prima di un\'altra azione passata.',
    graphicPrompt: 'Línea del tiempo con dos eventos pasados, el más antiguo marcado con trapassato.',
    scene: [
      ['Quando sono arrivato, lei era già partita.', 'Cuando llegué, ella ya se había ido.'],
      ['Avevo già mangiato quando mi hai chiamato.', 'Ya había comido cuando me llamaste.'],
      ['Non avevo mai visto Roma prima di quel viaggio.', 'Nunca había visto Roma antes de ese viaje.'],
      ['Erano usciti prima che arrivasse la pioggia.', 'Habían salido antes de que llegara la lluvia.'],
      ['Aveva studiato tutta la notte, quindi era stanco.', 'Había estudiado toda la noche, así que estaba cansado.'],
      ['Mi ero dimenticato del compleanno di mia madre.', 'Me había olvidado del cumpleaños de mi madre.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['avevo/ero + participio', 'acordanza con essere', 'secuencia temporal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el auxiliar correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona avevo/avevi/aveva o ero/eri/era según el verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Cuando llegué, ella ya había comido.',
            lines: [['', 'Quando sono arrivato, lei ___ già mangiato.']],
            options: ['aveva', 'era', 'avevo', 'ero'],
            answer: 'aveva',
            explain: '"mangiare" = verbo transitivo → auxiliar avere → lei aveva mangiato.',
          },
          {
            scene: 'Ya se habían ido cuando llamé.',
            lines: [['', '___ già partiti quando ho chiamato.']],
            options: ['Erano', 'Avevano', 'Eravamo', 'Ero'],
            answer: 'Erano',
            explain: '"partire" = verbo di movimento → essere. Plural: erano partiti.',
          },
          {
            scene: 'Yo ya había leído el libro.',
            lines: [['', '___ già letto il libro.']],
            options: ['Avevo', 'Ero', 'Aveva', 'Era'],
            answer: 'Avevo',
            explain: '"leggere" = transitivo → avere. 1ª singular: avevo letto.',
          },
          {
            scene: 'Ella ya había llegado cuando empezó la reunión.',
            lines: [['', '___ già arrivata quando è iniziata la riunione.']],
            options: ['Era', 'Aveva', 'Ero', 'Avevo'],
            answer: 'Era',
            explain: '"arrivare" = verbo di movimento → essere. Femminile: era arrivata.',
          },
          {
            scene: 'Vosotros ya habíais terminado el trabajo.',
            lines: [['', '___ già finito il lavoro.']],
            options: ['Avevate', 'Eravate', 'Avevano', 'Erano'],
            answer: 'Avevate',
            explain: '"finire" = transitivo → avere. 2ª plural: avevate finito.',
          },
          {
            scene: 'Me había olvidado el teléfono en casa.',
            lines: [['', 'Mi ___ dimenticato il telefono a casa.']],
            options: ['ero', 'avevo', 'era', 'aveva'],
            answer: 'ero',
            explain: '"dimenticarsi" = verbo riflessivo → essere. Mi ero dimenticato.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Auxiliar y concordanza',
        tag: '2 espacios',
        intro: 'Elige el auxiliar correcto y verifica la concordanza del participio.',
        type: 'dual',
        items: [
          {
            scene: 'Cuando llegamos, la película ya había empezado.',
            lines: [['', 'Quando siamo arrivati, il film [[0]] già [[1]].']],
            blanks: [
              { options: ['era', 'aveva', 'ero', 'avevo'], answer: 'era', explain: '"iniziare" (intransitivo, estado) → essere. 3ª sing.: era.' },
              { options: ['iniziato', 'iniziata', 'iniziati', 'iniziate'], answer: 'iniziato', explain: '"il film" = maschile singolare → iniziato.' },
            ],
          },
          {
            scene: 'Las chicas ya se habían levantado cuando sonó el despertador.',
            lines: [['', 'Le ragazze [[0]] già [[1]] quando è suonata la sveglia.']],
            blanks: [
              { options: ['si erano', 'si avevano', 'erano', 'avevano'], answer: 'si erano', explain: '"alzarsi" = riflessivo → essere. Si erano.' },
              { options: ['alzate', 'alzato', 'alzati', 'alzata'], answer: 'alzate', explain: '"le ragazze" = femminile plurale → alzate.' },
            ],
          },
          {
            scene: 'Él ya había escrito el correo antes de la reunión.',
            lines: [['', 'Lui [[0]] già [[1]] l\'email prima della riunione.']],
            blanks: [
              { options: ['aveva', 'era', 'avevo', 'ero'], answer: 'aveva', explain: '"scrivere" = transitivo → avere. 3ª sing.: aveva.' },
              { options: ['scritto', 'scritta', 'scritti', 'scritte'], answer: 'scritto', explain: 'Con "avere" el participio no concuerda con el sujeto: scritto (invariable).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narración con trapassato',
        tag: 'Texto guiado',
        intro: 'Completa la narración eligiendo trapassato o passato prossimo según la secuencia.',
        type: 'guidedText',
        scene: 'Marco racconta cosa è successo la sera prima della partenza.',
        text: 'La sera prima di partire, [[0]] già i bagagli. Quando sono andato a letto, [[1]] tutto. La mattina, quando mi sono svegliato, mi sono ricordato che [[2]] di comprare i biglietti! Per fortuna, mia sorella [[3]] già online. Così [[4]] partire senza problemi.',
        blanks: [
          { options: ['avevo fatto', 'ho fatto', 'facevo', 'faccio'], answer: 'avevo fatto', explain: 'Acción anterior al momento de narración → trapassato.' },
          { options: ['avevo preparato', 'ho preparato', 'preparavo', 'preparo'], answer: 'avevo preparato', explain: 'Preparó todo ANTES de irse a dormir → trapassato.' },
          { options: ['mi ero dimenticato', 'mi sono dimenticato', 'dimenticavo', 'dimentico'], answer: 'mi ero dimenticato', explain: 'El olvido ocurrió ANTES de darse cuenta → trapassato riflessivo.' },
          { options: ['li aveva già comprati', 'li ha già comprati', 'li comprava', 'li compra'], answer: 'li aveva già comprati', explain: 'La sorella los compró ANTES de que él se diera cuenta → trapassato.' },
          { options: ['abbiamo potuto', 'avevamo potuto', 'possiamo', 'potevamo'], answer: 'abbiamo potuto', explain: 'Esta es la conclusión final → passato prossimo (la acción más reciente).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el trapassato',
        tag: 'Texto libre',
        intro: 'Sin opciones: conjuga el verbo en trapassato prossimo.',
        type: 'freeText',
        scene: 'Quando sono arrivato alla festa...',
        text: 'Quando sono arrivato alla festa, i miei amici [[0]] (arrivare) già. / Qualcuno [[1]] (mangiare) tutta la torta. / La musica [[2]] (iniziare) un\'ora prima. / I miei amici [[3]] (dimenticarsi) di invitarmi! / Per fortuna, [[4]] (portare) del vino.',
        blanks: [
          { answer: 'erano già arrivati', explain: '"arrivare" → essere. Masc. pl.: erano arrivati.' },
          { answer: 'aveva mangiato', explain: '"mangiare" → avere. 3ª sing.: aveva mangiato.' },
          { answer: 'era iniziata', explain: '"iniziare" (intrans.) → essere. Femm.: era iniziata.' },
          { answer: 'si erano dimenticati', explain: '"dimenticarsi" → essere. Masc. pl.: si erano dimenticati.' },
          { answer: 'avevo portato', explain: '"portare" → avere. 1ª sing.: avevo portato.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina las dos acciones',
        tag: 'Escritura guiada',
        intro: 'Une las dos acciones pasadas usando trapassato para la acción más antigua.',
        type: 'write',
        items: [
          {
            scene: 'Acción 1 (antes): "Mangiare." Acción 2 (después): "Uscire." → une con quando.',
            prompt: 'Quando sono uscito... (già mangiare)',
            answer: 'Quando sono uscito, avevo già mangiato.',
            accepted: ['Avevo già mangiato quando sono uscito.'],
            explain: 'La acción de comer ocurrió ANTES → trapassato: avevo mangiato.',
          },
          {
            scene: 'Acción 1 (antes): "Lei partire." Acción 2 (después): "Io arrivare."',
            prompt: 'Quando sono arrivato... (lei partire già)',
            answer: 'Quando sono arrivato, lei era già partita.',
            accepted: ['Lei era già partita quando sono arrivato.'],
            explain: '"partire" → essere → era partita (femm. sing.).',
          },
          {
            scene: 'Acción 1 (antes): "Loro finire il lavoro." Acción 2: "La riunione iniziare."',
            prompt: 'Quando è iniziata la riunione... (loro finire il lavoro)',
            answer: 'Quando è iniziata la riunione, loro avevano già finito il lavoro.',
            accepted: ['Loro avevano già finito il lavoro quando è iniziata la riunione.'],
            explain: '"finire" = transitivo → avere → avevano finito.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Narra una storia al passato',
        tag: 'Escritura libre',
        intro: 'Escribe una narración breve usando il trapassato prossimo.',
        type: 'write',
        items: [
          {
            scene: 'Narra un momento en que llegaste tarde a algo. ¿Qué había pasado antes?',
            prompt: 'Racconta quando sei arrivato/a in ritardo. Cosa era già successo?',
            answer: 'Sono arrivato in ritardo al cinema perché avevo perso l\'autobus. Il film era già iniziato quando sono entrato.',
            accepted: [
              'Quando sono arrivata alla stazione, il treno era già partito. Avevo dimenticato l\'orario.',
            ],
            explain: 'Usa trapassato per le azioni più vecchie, passato prossimo per la storia principale.',
          },
          {
            scene: 'Describe una sorpresa que te dieron. ¿Qué habían preparado antes?',
            prompt: 'Racconta una sorpresa. Cosa avevano già fatto le persone prima che tu arrivassi?',
            answer: 'Quando sono entrata in casa, i miei amici avevano già preparato una festa. Avevano comprato i palloncini e avevano cotto una torta.',
            accepted: [
              'Erano già arrivati tutti. Avevano decorato la sala con fiori e luci.',
            ],
            explain: 'Il trapassato descrive lo stato delle cose PRIMA del tuo arrivo.',
          },
        ],
      },
    ],
  },
}

export default topic
