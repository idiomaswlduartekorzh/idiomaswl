import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'congiuntivo-passato-b1',
  order: '02',
  color: '#009246',
  category: 'Verbi',
  level: 'B1',
  title: 'Congiuntivo Passato en Italiano B1',
  shortTitle: 'Congiuntivo Passato',
  metaTitle: 'Congiuntivo Passato Italiano B1 — Formación y Uso',
  description:
    'El congiuntivo passato expresa una acción pasada desde una perspectiva subjetiva: opiniones, dudas o emociones sobre algo que ya ocurrió. Se forma con il congiuntivo presente di essere o avere más il participio passato. Es el paso natural después de dominar el congiuntivo presente.',
  lead: 'Aprende a expresar opiniones y emociones sobre el pasado con el congiuntivo passato italiano.',
  outcomes: [
    'Formar el congiuntivo passato con avere y essere en congiuntivo presente',
    'Usar el congiuntivo passato después de verbos de opinión, duda y emoción',
    'Elegir entre essere y avere como auxiliar correctamente',
    'Distinguir el congiuntivo passato del congiuntivo presente según el tiempo referido',
  ],

  guide: {
    goal: 'Expresar opiniones, emociones y dudas sobre eventos pasados usando el congiuntivo passato.',
    model: 'Penso che Marco sia andato via. / Credo che lei abbia già mangiato. / Sono contento che tu sia venuto.',
    formula: 'che + soggetto + congiuntivo presente di essere/avere + participio passato',
    decisions: [
      'Usa AVERE como auxiliar con verbos transitivos: pensare → abbia pensato, mangiare → abbia mangiato, leggere → abbia letto',
      'Usa ESSERE como auxiliar con verbos de movimiento, cambio de estado y reflexivos: andare → sia andato/a, venire → sia venuto/a, alzarsi → si sia alzato/a',
      'El participio concuerda en género y número solo con ESSERE: sia andato/andata/andati/andate',
      'Desencadenantes: penso/credo/spero che + passato; sono contento/dispiaciuto/sorpreso che + passato; è strano/bello/peccato che + passato',
      'Congiuntivo presente: expresa que algo ocurre al mismo tiempo o en el futuro respecto al verbo principal',
      'Congiuntivo passato: expresa que algo ocurrió ANTES del verbo principal',
    ],
    table: [
      ['Auxiliar', 'Congiuntivo presente', 'Ejemplo congiuntivo passato'],
      ['avere', 'abbia, abbia, abbia, abbiamo, abbiate, abbiano', 'abbia mangiato, abbia scritto, abbia letto'],
      ['essere', 'sia, sia, sia, siamo, siate, siano', 'sia andato/a, sia venuto/a, sia partito/a'],
      ['reflexivo', 'si sia, ti sia, mi sia...', 'si sia alzato/a, mi sia svegliato/a'],
    ],
    mistakes: [
      '"Penso che è andato" ❌ → "Penso che sia andato" ✓ — después de "penso che" siempre congiuntivo, no indicativo.',
      '"Credo che abbia andato" ❌ → "Credo che sia andato" ✓ — "andare" lleva essere como auxiliar.',
      '"È strano che sia venuta senza avvisare" — el participio concuerda: "venuta" (femenino) porque el sujeto es femenino.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el congiuntivo passato italiano?',
      paragraphs: [
        'El congiuntivo passato es un tiempo compuesto que expresa acciones pasadas en el modo subjuntivo. Se usa cuando el verbo principal está en presente pero la acción de la cláusula subordinada ocurrió antes: "Penso che sia già partito" (creo que ya se fue, i.e., se fue antes de que yo piense esto).',
        'Este tiempo es especialmente útil para expresar opiniones, dudas y emociones sobre hechos del pasado: "È strano che non abbia chiamato" (es raro que no haya llamado). La estructura paralela en español sería "que haya + participio" o "que hubiera + participio".',
      ],
    },
    {
      heading: 'Cómo se forma el congiuntivo passato',
      paragraphs: [
        'La fórmula es sencilla: congiuntivo presente de essere o avere + participio passato del verbo principal. El punto clave es elegir el auxiliar correcto, igual que en el passato prossimo.',
        'Con AVERE: (che io) abbia parlato, abbia mangiato, abbia visto, abbia fatto, abbia letto. Con ESSERE: (che io) sia andato/a, sia venuto/a, sia tornato/a, sia partito/a. Con verbos reflexivos: (che io) mi sia alzato/a, mi sia divertito/a.',
      ],
      table: [
        ['Persona', 'Con avere (mangiare)', 'Con essere (andare)'],
        ['io', 'abbia mangiato', 'sia andato/a'],
        ['tu', 'abbia mangiato', 'sia andato/a'],
        ['lui/lei', 'abbia mangiato', 'sia andato/a'],
        ['noi', 'abbiamo mangiato', 'siamo andati/e'],
        ['voi', 'abbiate mangiato', 'siate andati/e'],
        ['loro', 'abbiano mangiato', 'siano andati/e'],
      ],
    },
    {
      heading: 'Desencadenantes del congiuntivo passato',
      paragraphs: [
        'Los mismos verbos y expresiones que desencadenan el congiuntivo presente también pueden ir seguidos del congiuntivo passato, dependiendo de la relación temporal. Verbos de opinión: pensare, credere, supporre, immaginare. Verbos de emoción: essere contento/dispiaciuto/sorpreso/felice/preoccupato che.',
        'Expresiones impersonales con referencia al pasado: è strano/incredibile/un peccato/un errore che + congiuntivo passato. Ejemplos: "È un peccato che tu non sia venuto alla festa" / "È incredibile che abbiano vinto il campionato".',
      ],
    },
    {
      heading: 'Congiuntivo presente vs. passato: la diferencia temporal',
      paragraphs: [
        'La diferencia es temporal: el congiuntivo presente indica simultaneidad o futuro respecto al verbo principal; el congiuntivo passato indica anterioridad. Compare: "Penso che lui studi molto" (creo que estudia mucho — ahora) vs. "Penso che lui abbia studiato molto" (creo que estudió mucho — antes del momento en que pienso).',
        'Ejemplo con emoción: "Sono felice che tu venga" (estoy feliz de que vengas — evento futuro) vs. "Sono felice che tu sia venuto/a" (estoy feliz de que hayas venido — ya ocurrió). Esta distinción temporal es esencial para comunicarse con precisión en italiano.',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más frecuente es usar el indicativo pasado en lugar del congiuntivo passato: "Penso che è andato" ❌ → "Penso che sia andato" ✓. El desencadenante "penso che" siempre requiere congiuntivo.',
        'Otro error es confundir los auxiliares: recordar que los mismos verbos que llevan essere en el passato prossimo también lo llevan en el congiuntivo passato. Andare, venire, partire, tornare, arrivare, uscire, nascere, morire van siempre con essere.',
      ],
    },
    {
      heading: '¿Cómo se forma el congiuntivo passato en italiano?',
      paragraphs: [
        'Con el congiuntivo presente del auxiliar (abbia/sia…) + el participio pasado: "che io abbia parlato", "che io sia andato". Se elige avere o essere con las reglas del passato prossimo, y con essere el participio concuerda: "che lei sia partita".',
      ],
    },
    {
      heading: '¿Cuándo se usa el congiuntivo passato y cuándo el presente?',
      paragraphs: [
        'El congiuntivo presente indica simultaneidad o futuro ("Penso che studi molto" = estudia ahora); el congiuntivo passato indica anterioridad ("Penso che abbia studiato molto" = estudió antes). Con verbo principal en presente, se elige según si la acción subordinada es simultánea o anterior.',
      ],
    },
    {
      heading: '¿Cómo se dice "que haya hecho" en italiano?',
      paragraphs: [
        'Con el congiuntivo passato: "che abbia fatto" (que haya hecho), "che sia andato" (que haya ido). Aparece tras desencadenantes en presente que exigen subjuntivo: "Spero che tu abbia capito", "È strano che non sia venuto".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Congiuntivo passato con énfasis en la relación temporal y la elección del auxiliar.',
    graphicPrompt: 'Línea de tiempo mostrando un evento pasado visto desde el presente con perspectiva subjetiva.',
    scene: [
      ['Penso che Marco sia già partito.', 'Creo que Marco ya se fue.'],
      ['Credo che abbiano vinto la partita.', 'Creo que ganaron el partido.'],
      ['È strano che lei non abbia chiamato.', 'Es raro que ella no haya llamado.'],
      ['Spero che tu abbia capito la lezione.', 'Espero que hayas entendido la lección.'],
      ['Sono contento che siate venuti.', 'Estoy contento de que hayáis venido.'],
      ['È un peccato che non sia rimasto.', 'Es una pena que no se haya quedado.'],
      ['Immagino che abbiano già mangiato.', 'Me imagino que ya habrán comido.'],
      ['È possibile che si siano persi.', 'Es posible que se hayan perdido.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['elección de auxiliar', 'concordancia del participio con essere', 'diferencia presente vs. passato'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el congiuntivo passato correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de congiuntivo passato para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Hablando de un compañero',
            lines: [['', 'Penso che Giulia ___ già a casa.']],
            options: ['sia tornata', 'ha tornato', 'è tornata', 'abbia tornato'],
            answer: 'sia tornata',
            explain: '"Tornare" lleva essere como auxiliar. Congiuntivo passato: sia tornata (femenino, singular).',
          },
          {
            scene: 'Sobre la reunión',
            lines: [['', 'Credo che loro ___ il progetto in tempo.']],
            options: ['abbiano finito', 'hanno finito', 'siano finito', 'abbia finito'],
            answer: 'abbiano finito',
            explain: '"Finire" (transitivo) lleva avere. Para "loro" en congiuntivo passato: abbiano finito.',
          },
          {
            scene: 'Sorpresa agradable',
            lines: [['', 'Sono sorpreso che tu ___ questo libro in un giorno.']],
            options: ['abbia letto', 'hai letto', 'sia letto', 'abbia leggere'],
            answer: 'abbia letto',
            explain: '"Leggere" lleva avere. Para "tu": abbia letto. "Letto" es el participio de "leggere".',
          },
          {
            scene: 'Sobre el viaje',
            lines: [['', 'È strano che Marco non ___ ancora dall\'aeroporto.']],
            options: ['sia arrivato', 'ha arrivato', 'abbia arrivato', 'arrivasse'],
            answer: 'sia arrivato',
            explain: '"Arrivare" lleva essere. Congiuntivo passato: sia arrivato (masculino, singular).',
          },
          {
            scene: 'Emoción positiva',
            lines: [['', 'Sono felice che voi ___ divertiti alla festa.']],
            options: ['vi siate', 'vi avete', 'vi siete', 'vi abbiate'],
            answer: 'vi siate',
            explain: '"Divertirsi" es reflexivo → essere. Para "voi": vi siate divertiti. Congiuntivo passato reflexivo.',
          },
          {
            scene: 'Algo inesperado',
            lines: [['', 'È incredibile che lei non ___ niente di tutto ciò.']],
            options: ['abbia saputo', 'ha saputo', 'sia saputa', 'abbia sapere'],
            answer: 'abbia saputo',
            explain: '"Sapere" lleva avere. Para "lei": abbia saputo. "Saputo" es el participio de "sapere".',
          },
          {
            scene: 'Preocupación',
            lines: [['', 'Sono preoccupato che i bambini ___ a dormire tardi.']],
            options: ['siano andati', 'sono andati', 'abbiano andato', 'vadano'],
            answer: 'siano andati',
            explain: '"Andare" lleva essere. Para "i bambini" (loro): siano andati. Participio plural masculino.',
          },
          {
            scene: 'Opinión sobre el resultado',
            lines: [['', 'Credo che la squadra ___ molto bene questa stagione.']],
            options: ['abbia giocato', 'ha giocato', 'sia giocata', 'abbia giocare'],
            answer: 'abbia giocato',
            explain: '"Giocare" lleva avere (transitivo de actividad). Para "la squadra" (lei): abbia giocato.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos perspectivas sobre el pasado',
        tag: '2 espacios',
        intro: 'Completa las dos formas de congiuntivo passato en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'Novedades del trabajo',
            lines: [['', 'Penso che il capo [[0]] la proposta e che i colleghi già [[1]] la decisione.']],
            blanks: [
              { options: ['abbia accettato', 'ha accettato', 'sia accettato', 'accetti'], answer: 'abbia accettato', explain: '"Accettare" lleva avere. Para "il capo" (lui): abbia accettato.' },
              { options: ['abbiano saputo', 'hanno saputo', 'siano saputi', 'sappiano'], answer: 'abbiano saputo', explain: '"Sapere" lleva avere. Para "i colleghi" (loro): abbiano saputo.' },
            ],
          },
          {
            scene: 'Noticias de amigos',
            lines: [['', 'È bello che Maria [[0]] con Marco e che loro [[1]] in un bel posto.']],
            blanks: [
              { options: ['si sia sposata', 'si è sposata', 'abbia sposato', 'si sposi'], answer: 'si sia sposata', explain: '"Sposarsi" es reflexivo → essere. Para "Maria" (lei): si sia sposata (femenino).' },
              { options: ['siano andati', 'sono andati', 'abbiano andato', 'vadano'], answer: 'siano andati', explain: '"Andare" lleva essere. Para "loro": siano andati (masculino plural, parejas mixtas).' },
            ],
          },
          {
            scene: 'Sobre los resultados del examen',
            lines: [['', 'Sono contento che tu [[0]] bene e che la tua amica [[1]] la prova.']],
            blanks: [
              { options: ['abbia fatto', 'hai fatto', 'sia fatto', 'faccia'], answer: 'abbia fatto', explain: '"Fare" lleva avere. Para "tu": abbia fatto.' },
              { options: ['abbia superato', 'ha superato', 'sia superata', 'superi'], answer: 'abbia superato', explain: '"Superare" lleva avere. Para "la tua amica" (lei): abbia superato.' },
            ],
          },
          {
            scene: 'Preguntas sobre el concierto',
            lines: [['', 'Credo che il cantante [[0]] molto bene e che il pubblico [[1]] a lungo.']],
            blanks: [
              { options: ['abbia cantato', 'ha cantato', 'sia cantato', 'canti'], answer: 'abbia cantato', explain: '"Cantare" lleva avere. Para "il cantante" (lui): abbia cantato.' },
              { options: ['abbia applaudito', 'ha applaudito', 'sia applaudito', 'applauda'], answer: 'abbia applaudito', explain: '"Applaudire" lleva avere (actividad con objeto implícito). Para "il pubblico": abbia applaudito.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Mensaje de voz sobre un viaje',
        tag: 'Texto guiado',
        intro: 'Elige entre congiuntivo passato y presente para completar el mensaje.',
        type: 'guidedText',
        scene: 'Elige la forma verbal correcta según el contexto temporal.',
        text: 'Ciao Luca! Sento che non sei venuto alla cena ieri. È strano che tu non [[0]] — di solito sei sempre puntuale. Spero che tutto [[1]] bene con te. Credo che i tuoi amici [[2]] già perché non ti hanno visto. È un peccato che non [[3]] con noi, era una bella serata! Immagino che tu [[4]] a casa e che forse [[5]] — ti sei riposato almeno?',
        blanks: [
          { options: ['abbia avvisato', 'avvisi', 'ha avvisato', 'abbia avvisare'], answer: 'abbia avvisato', explain: 'Acción pasada (ayer no avisó). "Avvisare" lleva avere: abbia avvisato.' },
          { options: ['vada', 'sia andato', 'va', 'andasse'], answer: 'vada', explain: 'La esperanza es para el presente/futuro ("que todo esté bien ahora"). Congiuntivo presente: vada.' },
          { options: ['siano partiti', 'partano', 'sono partiti', 'siano partire'], answer: 'siano partiti', explain: 'Los amigos ya se fueron (acción pasada). "Partire" lleva essere: siano partiti.' },
          { options: ['tu sia venuto', 'tu venga', 'sei venuto', 'tu abbia venuto'], answer: 'tu sia venuto', explain: '"Venire" lleva essere. Acción pasada que no ocurrió: (tu) sia venuto.' },
          { options: ['sia rimasto', 'rimanga', 'sei rimasto', 'abbia rimasto'], answer: 'sia rimasto', explain: 'Opinión sobre lo que hizo (acción pasada). "Rimanere" lleva essere: sia rimasto.' },
          { options: ['abbia dormito', 'dorma', 'ha dormito', 'sia dormito'], answer: 'abbia dormito', explain: '"Dormire" lleva avere. Acción pasada (durmió ayer): abbia dormito.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el congiuntivo passato',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de congiuntivo passato para cada verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el congiuntivo passato del verbo indicado. Atención al auxiliar y la concordancia.',
        text: 'Sono felice che tu [[0]] (venire) alla mia festa. È strano che Marco non [[1]] (telefonare) — di solito è molto preciso. Penso che loro [[2]] (uscire) prima che arrivassimo. Spero che la prof [[3]] (correggere) bene i nostri compiti. Credo che i bambini [[4]] (divertirsi) molto al parco.',
        blanks: [
          { answer: 'sia venuto', accepted: ['sia venuto', 'sia venuta'], explain: '"Venire" lleva essere. Congiuntivo passato: sia venuto/a (depende del género del interlocutor).' },
          { answer: 'abbia telefonato', accepted: ['abbia telefonato'], explain: '"Telefonare" lleva avere. Para "Marco" (lui): abbia telefonato.' },
          { answer: 'siano usciti', accepted: ['siano usciti', 'siano uscite'], explain: '"Uscire" lleva essere. Para "loro": siano usciti/e.' },
          { answer: 'abbia corretto', accepted: ['abbia corretto'], explain: '"Correggere" lleva avere. Para "la prof" (lei): abbia corretto. Participio irregular: corretto.' },
          { answer: 'si siano divertiti', accepted: ['si siano divertiti', 'si siano divertite'], explain: '"Divertirsi" es reflexivo → essere. Para "i bambini" (loro): si siano divertiti.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa reacciones sobre el pasado',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con congiuntivo passato reaccionando a situaciones pasadas.',
        type: 'write',
        items: [
          {
            scene: 'Una noticia positiva',
            prompt: 'Tu amigo aprobó un examen difícil. Expresa tu alegría con "sono felice/contento che".',
            answer: 'Sono felice che tu abbia superato l\'esame!',
            accepted: ['sono felice che', 'sono contento che', 'abbia superato', 'abbia passato', 'sia riuscito'],
            explain: 'Ejemplo: Sono contento che tu abbia passato l\'esame. / Sono felice che tu sia riuscito!',
          },
          {
            scene: 'Una sorpresa negativa',
            prompt: 'Alguien no llegó a una cita importante. Expresa tu sorpresa con "è strano che" o "è un peccato che".',
            answer: 'È strano che Marco non sia arrivato alla riunione.',
            accepted: ['è strano che', 'è un peccato che', 'non sia arrivato', 'non sia venuto', 'non abbia chiamato'],
            explain: 'Ejemplo: È strano che lei non abbia avvisato. / È un peccato che non siate venuti.',
          },
          {
            scene: 'Una opinión sobre el pasado',
            prompt: 'Expresa lo que crees que hizo alguien ayer usando "penso/credo che".',
            answer: 'Credo che Luca sia uscito con i suoi amici ieri sera.',
            accepted: ['penso che', 'credo che', 'sia uscito', 'abbia mangiato', 'sia andato', 'abbia lavorato'],
            explain: 'Ejemplo: Penso che lei abbia lavorato tutta la notte. / Credo che siano partiti presto.',
          },
          {
            scene: 'Una esperanza cumplida',
            prompt: 'Algo que esperabas ya ocurrió. Exprésalo con "spero/speravo che".',
            answer: 'Spero che tu abbia ricevuto il mio messaggio.',
            accepted: ['spero che', 'speravo che', 'abbia ricevuto', 'abbia capito', 'sia arrivato', 'abbia visto'],
            explain: 'Ejemplo: Spero che lei abbia capito la situazione. / Speravo che fossero arrivati in tempo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Reacciona a noticias pasadas',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones con congiuntivo passato reaccionando a eventos del pasado.',
        type: 'write',
        items: [
          {
            scene: 'Una noticia que te alegró',
            prompt: 'Escribe algo positivo que alguien haya hecho y tu reacción emocional (sono felice/contento/orgoglioso che).',
            answer: 'Sono molto contento che mia figlia abbia vinto il concorso di musica.',
            accepted: ['sono felice che', 'sono contento che', 'sono orgoglioso che', 'abbia vinto', 'sia riuscita', 'abbia finito', 'sia partita'],
            explain: 'Ejemplo: Sono felice che tu abbia trovato un nuovo lavoro. / Sono orgoglioso che mio figlio sia entrato all\'università.',
          },
          {
            scene: 'Algo que te sorprendió negativamente',
            prompt: 'Escribe algo que no esperabas que ocurriera usando "è strano/incredibile/un peccato che".',
            answer: 'È incredibile che nessuno abbia informato il direttore dell\'errore.',
            accepted: ['è strano che', 'è incredibile che', 'è un peccato che', 'non abbia', 'non sia', 'abbia fatto', 'sia andato'],
            explain: 'Ejemplo: È strano che lei non si sia presentata. / È incredibile che abbiano perso la partita.',
          },
          {
            scene: 'Lo que crees que ocurrió',
            prompt: 'Expresa una opinión o suposición sobre algo que crees que pasó ayer o la semana pasada.',
            answer: 'Penso che abbiano già preso una decisione senza consultarci.',
            accepted: ['penso che', 'credo che', 'immagino che', 'suppongo che', 'abbia', 'sia', 'abbiano', 'siano'],
            explain: 'Ejemplo: Credo che il treno sia già partito. / Immagino che lei abbia studiato tutta la notte.',
          },
        ],
      },
    ],
  },
}

export default topic
