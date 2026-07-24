import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'trapassato-prossimo-b1',
  order: '04',
  color: '#009246',
  category: 'Verbi',
  level: 'B1',
  title: 'Trapassato Prossimo en Italiano B1',
  shortTitle: 'Trapassato Prossimo',
  metaTitle: 'Trapassato Prossimo Italiano B1 — El Pluscuamperfecto Italiano',
  description:
    'El trapassato prossimo es el pluscuamperfecto del italiano: expresa una acción que ocurrió ANTES que otra acción pasada. Se forma con il imperfetto di avere o essere más il participio passato. Es esencial para narrar historias y ordenar eventos en el tiempo.',
  lead: 'Aprende a narrar secuencias de eventos pasados con el trapassato prossimo: la acción previa en el relato.',
  outcomes: [
    'Formar el trapassato prossimo con avevo/ero + participio passato',
    'Usar el trapassato para indicar anterioridad respecto a otro evento pasado',
    'Construir narrativas con secuencia temporal clara',
    'Distinguir trapassato prossimo de passato prossimo e imperfetto',
  ],

  guide: {
    goal: 'Narrar eventos pasados con claridad temporal, indicando cuál ocurrió primero con el trapassato prossimo.',
    model: 'Quando sono arrivato, Marco era già partito. / Non aveva mai mangiato sushi prima di quel giorno.',
    formula: 'imperfetto di avere/essere + participio passato',
    decisions: [
      'Imperfetto di AVERE: avevo, avevi, aveva, avevamo, avevate, avevano',
      'Imperfetto di ESSERE: ero, eri, era, eravamo, eravate, erano',
      'Los mismos verbos que llevan essere en el passato prossimo también lo llevan en el trapassato: essere, andare, venire, partire, tornare, arrivare, uscire, nascere, morire',
      'Verbos reflexivos siempre con essere: mi ero alzato, si era svegliata, ci eravamo divertiti',
      'Uso típico: "quando + passato prossimo/imperfetto, trapassato" (la acción que ya había ocurrido antes)',
      'También con "dopo che + trapassato": Dopo che aveva mangiato, è uscito.',
    ],
    table: [
      ['Sujeto', 'Con avere (mangiare)', 'Con essere (partire)'],
      ['io', 'avevo mangiato', 'ero partito/a'],
      ['tu', 'avevi mangiato', 'eri partito/a'],
      ['lui/lei', 'aveva mangiato', 'era partito/a'],
      ['noi', 'avevamo mangiato', 'eravamo partiti/e'],
      ['voi', 'avevate mangiato', 'eravate partiti/e'],
      ['loro', 'avevano mangiato', 'erano partiti/e'],
    ],
    mistakes: [
      '"Quando sono arrivato, Marco è già partito" ❌ → usa trapassato: "Marco era già partito" ✓ — la partida es ANTERIOR a la llegada.',
      '"Avevo andato" ❌ → "Ero andato" ✓ — "andare" lleva essere, no avere.',
      '"Non ho mai mangiato sushi prima" — ok con passato prossimo si hablas desde el presente; "Non aveva mai mangiato sushi prima" — trapassato si estás dentro de una narración pasada.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el trapassato prossimo italiano?',
      paragraphs: [
        'El trapassato prossimo es el equivalente italiano del pluscuamperfecto español ("había comido", "había ido"). Expresa una acción que ocurrió antes de otra acción pasada. Se forma con il imperfetto degli ausiliari (avevo/ero) más il participio passato del verbo principal.',
        'Es un tiempo narrativo fundamental: cuando cuentas una historia en pasado y necesitas referirte a algo que ya había sucedido antes del momento principal de la narración, usas el trapassato prossimo. Ejemplo: "Quando ho aperto il frigo, avevo già cucinato tutto" (Cuando abrí la nevera, ya lo había cocinado todo).',
      ],
    },
    {
      heading: 'Cómo se forma el trapassato prossimo',
      paragraphs: [
        'Fórmula: imperfetto del auxiliar (avevo / ero) + participio pasado. La elección del auxiliar y la concordancia siguen las reglas del passato prossimo; lo único que cambia es que el auxiliar va en imperfetto. Esta es la tabla:',
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
      heading: 'Cuándo usar el trapassato prossimo',
      paragraphs: [
        'El contexto más común es la estructura "quando + passato prossimo + trapassato": "Quando sono arrivata a casa, mia madre aveva già cucinato" (Cuando llegué a casa, mi madre ya había cocinado). La acción del trapassato (cocinar) ocurrió ANTES de la acción del passato prossimo (llegar).',
        'También se usa con expresiones como "già" (ya), "non ancora" (todavía no), "prima di" (antes de) y "dopo che" (después de que): "Dopo che aveva finito i compiti, è uscito a giocare". Y en oraciones independientes para situar un evento en el pasado: "Non avevo mai visto una cosa del genere".',
      ],
    },
    {
      heading: 'Trapassato vs. Passato Prossimo vs. Imperfetto',
      paragraphs: [
        'Los tres tiempos coexisten a menudo en la narración. El imperfetto describe el contexto o acciones habituales. El passato prossimo narra eventos principales. El trapassato prossimo indica qué había ocurrido antes: "Stavo studiando (imperfetto) quando mi ha chiamato (passato prossimo) — avevo già dimenticato che ci eravamo dati appuntamento (trapassato)".',
        'Una buena regla: si en español usarías "había + participio" en el contexto de una narración pasada, en italiano debes usar el trapassato prossimo. Si usarías "ha + participio" en relación con el presente, en italiano es passato prossimo.',
      ],
    },
    {
      heading: '¿Cómo se forma el trapassato prossimo en italiano?',
      paragraphs: [
        'Con el imperfetto del auxiliar (avevo, avevi, aveva… / ero, eri, era…) + el participio pasado: "avevo mangiato", "ero andato". Se elige avere o essere con las reglas del passato prossimo, y con essere el participio concuerda con el sujeto: "era arrivata".',
      ],
    },
    {
      heading: '¿Cuándo se usa el trapassato prossimo?',
      paragraphs: [
        'Para una acción anterior a otra acción pasada, sobre todo con quando, dopo che, prima, già: "Quando sono arrivato, avevano già cenato". Es el "pasado del pasado", equivalente al pluscuamperfecto español ("habían cenado").',
      ],
    },
    {
      heading: '¿Qué diferencia hay entre trapassato prossimo y passato prossimo?',
      paragraphs: [
        'El passato prossimo narra una acción pasada (ho mangiato = comí). El trapassato prossimo narra una acción anterior a esa (avevo mangiato = había comido, antes de otro momento pasado). El passato usa el auxiliar en presente; el trapassato, en imperfetto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Trapassato prossimo para establecer anterioridad en narrativas pasadas.',
    graphicPrompt: 'Línea de tiempo con dos eventos pasados, uno anterior al otro, marcado con flecha y "già".',
    scene: [
      ['Quando sono arrivato, erano già partiti.', 'Cuando llegué, ya se habían ido.'],
      ['Non avevo mai mangiato la polenta prima.', 'Nunca había comido polenta antes.'],
      ['Aveva studiato tutta la notte.', 'Había estudiado toda la noche.'],
      ['Dopo che erano usciti, ho chiamato.', 'Después de que salieron, llamé.'],
      ['Non avevo ancora finito quando è suonata la campanella.', 'No había terminado todavía cuando sonó el timbre.'],
      ['Eravamo già partiti quando ha iniziato a piovere.', 'Ya habíamos salido cuando empezó a llover.'],
      ['Non aveva mai visto il mare prima di quel giorno.', 'Nunca había visto el mar antes de ese día.'],
      ['Avevo dimenticato le chiavi a casa.', 'Había olvidado las llaves en casa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['anterioridad temporal', 'già con trapassato', 'auxiliar avere vs essere'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el trapassato prossimo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de trapassato prossimo para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Una llegada tardía',
            lines: [['', 'Quando sono arrivata alla festa, tutti ___ già.']],
            options: ['erano partiti', 'sono partiti', 'partivano', 'partiranno'],
            answer: 'erano partiti',
            explain: 'Los invitados se fueron ANTES de que ella llegara. Trapassato de "partire" (essere): erano partiti.',
          },
          {
            scene: 'Un olvido importante',
            lines: [['', 'Ho scoperto che ___ il portafoglio a casa.']],
            options: ['avevo dimenticato', 'ho dimenticato', 'dimentico', 'dimenticavo'],
            answer: 'avevo dimenticato',
            explain: 'El olvido ocurrió ANTES de descubrirlo. "Dimenticare" lleva avere: avevo dimenticato.',
          },
          {
            scene: 'Primera vez histórica',
            lines: [['', 'Prima di quel viaggio, non ___ mai il mare.']],
            options: ['avevo visto', 'ho visto', 'vedo', 'vedevo'],
            answer: 'avevo visto',
            explain: '"Prima di" + trapassato: "vedere" lleva avere → avevo visto. Nunca lo había visto antes.',
          },
          {
            scene: 'Una tarea completada',
            lines: [['', 'Quando il professore è entrato, gli studenti ___ già l\'esercizio.']],
            options: ['avevano finito', 'hanno finito', 'finivano', 'finiranno'],
            answer: 'avevano finito',
            explain: 'Los estudiantes terminaron ANTES de que entrara el profesor. "Finire" lleva avere: avevano finito.',
          },
          {
            scene: 'El tren perdido',
            lines: [['', 'Quando siamo arrivati alla stazione, il treno ___ già.']],
            options: ['era partito', 'è partito', 'partiva', 'partirà'],
            answer: 'era partito',
            explain: 'El tren salió ANTES de que llegaran. "Partire" lleva essere: era partito.',
          },
          {
            scene: 'Una reunión perdida',
            lines: [['', 'Non sapevo che la riunione ___ cambiata.']],
            options: ['era stata', 'è stata', 'era', 'sia stata'],
            answer: 'era stata',
            explain: 'El cambio ocurrió antes de que lo supiera. "Essere cambiata" (passivo/essere) → era stata cambiata.',
          },
          {
            scene: 'Recuerdos de infancia',
            lines: [['', 'Prima di quel giorno, non ___ mai in aereo.']],
            options: ['ero salito', 'sono salito', 'salivo', 'salirò'],
            answer: 'ero salito',
            explain: '"Salire" lleva essere. Trapassato para "io": ero salito (primera vez histórica antes de ese momento).',
          },
          {
            scene: 'Un trabajo terminado',
            lines: [['', 'Quando mi hanno chiamato per il colloquio, ___ già mandato il curriculum.']],
            options: ['avevo', 'ho', 'avevo mandato', 'mandavo'],
            answer: 'avevo',
            explain: 'La secuencia correcta completa es "avevo già mandato". El trapassato marca la anterioridad.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Antes y después: dos eventos',
        tag: '2 espacios',
        intro: 'Completa las dos formas verbales que muestran la secuencia temporal de los eventos.',
        type: 'dual',
        items: [
          {
            scene: 'Una tarde en casa',
            lines: [['', 'Quando mia sorella [[0]], io [[1]] già tutta la cena.']],
            blanks: [
              { options: ['è arrivata', 'arrivava', 'era arrivata', 'arriverà'], answer: 'è arrivata', explain: 'La llegada de la hermana es el evento principal del pasado → passato prossimo: è arrivata.' },
              { options: ['avevo cucinato', 'ho cucinato', 'cucinavo', 'cucino'], answer: 'avevo cucinato', explain: 'Cocinar ocurrió ANTES de la llegada. "Cucinare" lleva avere: avevo cucinato.' },
            ],
          },
          {
            scene: 'Un descubrimiento',
            lines: [['', 'Ho trovato che qualcuno [[0]] nella mia borsa e [[1]] il portafoglio.']],
            blanks: [
              { options: ['era entrato', 'è entrato', 'entrava', 'entra'], answer: 'era entrato', explain: 'Entrar ocurrió ANTES del descubrimiento. "Entrare" lleva essere: era entrato.' },
              { options: ['aveva preso', 'ha preso', 'prendeva', 'prende'], answer: 'aveva preso', explain: 'Tomar la cartera también ocurrió antes. "Prendere" lleva avere: aveva preso.' },
            ],
          },
          {
            scene: 'El partido de fútbol',
            lines: [['', 'Quando ho acceso la TV, la partita [[0]] già e la squadra [[1]] già due gol.']],
            blanks: [
              { options: ['era iniziata', 'è iniziata', 'iniziava', 'inizia'], answer: 'era iniziata', explain: 'El partido empezó ANTES de encender la TV. "Iniziare" lleva essere: era iniziata.' },
              { options: ['aveva segnato', 'ha segnato', 'segnava', 'segna'], answer: 'aveva segnato', explain: 'Los goles fueron ANTES de encender la TV. "Segnare" lleva avere: aveva segnato.' },
            ],
          },
          {
            scene: 'Antes de la boda',
            lines: [['', 'Quando ci siamo sposati, ci [[0]] già da dieci anni e [[1]] già insieme.']],
            blanks: [
              { options: ['conoscevamo', 'conoscevano', 'avevamo conosciuto', 'conosceremo'], answer: 'conoscevamo', explain: 'Conocerse es una acción continua del pasado → imperfetto: conoscevamo (nos conocíamos).' },
              { options: ['eravamo vissuti', 'siamo vissuti', 'vivevamo', 'viviamo'], answer: 'eravamo vissuti', explain: 'Haber vivido juntos es anterior a la boda. "Vivere" lleva essere: eravamo vissuti.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una historia de misterio',
        tag: 'Texto guiado',
        intro: 'Completa la historia eligiendo el tiempo verbal correcto: trapassato, passato prossimo o imperfetto.',
        type: 'guidedText',
        scene: 'Elige trapassato prossimo, passato prossimo o imperfetto según el contexto temporal.',
        text: 'Quella sera, il detective Moretti [[0]] (arrivare) alla villa quando il sole tramontava. La porta [[1]] (essere) aperta — qualcuno [[2]] (entrare) prima di lui. Sul tavolo [[3]] (trovare) una lettera. La padrona di casa non [[4]] (vedere) ancora nessuno. Era chiaro che qualcosa di strano [[5]] (succedere) quella notte. Moretti non [[6]] (mai/dormire) così poco in tutta la sua carriera.',
        blanks: [
          { options: ['è arrivato', 'arrivava', 'era arrivato', 'arriva'], answer: 'è arrivato', explain: 'Evento principal de la narración. Passato prossimo: è arrivato.' },
          { options: ['era', 'è stata', 'è', 'sia'], answer: 'era', explain: 'Descripción del contexto. Imperfetto: era (la puerta estaba abierta).' },
          { options: ['era entrato', 'è entrato', 'entrava', 'entra'], answer: 'era entrato', explain: 'Alguien entró ANTES de que llegara el detective. Trapassato: era entrato.' },
          { options: ['ha trovato', 'trovava', 'aveva trovato', 'trova'], answer: 'ha trovato', explain: 'El detective encuentra la carta en el momento de la narración principal. Passato prossimo: ha trovato.' },
          { options: ['aveva visto', 'ha visto', 'vedeva', 'vede'], answer: 'aveva visto', explain: 'La dueña no había visto a nadie aún antes de que llegara el detective. Trapassato: aveva visto.' },
          { options: ['era successo', 'è successo', 'succedeva', 'succede'], answer: 'era successo', explain: 'Algo había ocurrido ANTES del momento de la historia. "Succedere" lleva essere: era successo.' },
          { options: ['aveva dormito', 'ha dormito', 'dormiva', 'dorme'], answer: 'aveva dormito', explain: '"Non aveva mai dormito" — experiencia hasta ese momento (trapassato con mai). Avere: aveva dormito.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el trapassato prossimo',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de trapassato prossimo del verbo indicado.',
        type: 'freeText',
        scene: 'Escribe el trapassato prossimo correcto. Atención al auxiliar y la concordancia.',
        text: 'Quando ho chiamato Maria, lei [[0]] (uscire) già di casa. Prima di conoscere mio marito, non [[1]] (mai visitare) l\'Italia. Il film [[2]] (già iniziare) quando siamo entrati in sala. Non sapevo che [[3]] (cambiare — loro) data della riunione. Ho scoperto che il treno [[4]] (partire) cinque minuti prima.',
        blanks: [
          { answer: 'era uscita', accepted: ['era uscita'], explain: '"Uscire" lleva essere. Maria (lei) → era uscita (femenino).' },
          { answer: 'avevo mai visitato', accepted: ['avevo mai visitato', 'non avevo mai visitato'], explain: '"Visitare" lleva avere. Para "io": avevo mai visitato.' },
          { answer: 'era già iniziato', accepted: ['era già iniziato', 'aveva già iniziato'], explain: '"Iniziare" puede llevar essere (intransitivo): era già iniziato. Masculino: il film.' },
          { answer: 'avevano cambiato', accepted: ['avevano cambiato'], explain: '"Cambiare" (transitivo) lleva avere. Para "loro": avevano cambiato.' },
          { answer: 'era partito', accepted: ['era partito'], explain: '"Partire" lleva essere. Para "il treno" (lui): era partito.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Narra con secuencia temporal',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el trapassato prossimo para establecer anterioridad temporal.',
        type: 'write',
        items: [
          {
            scene: 'Una situación común',
            prompt: 'Describe algo que ya habías hecho cuando algo más ocurrió. Usa "quando" + passato prossimo + trapassato.',
            answer: 'Quando sono arrivata al bar, i miei amici avevano già ordinato.',
            accepted: ['quando', 'avevo', 'aveva', 'avevano', 'ero', 'era', 'erano', 'già'],
            explain: 'Ejemplo: Quando ho aperto la finestra, aveva smesso di piovere. / Quando ha chiamato, ero già uscito.',
          },
          {
            scene: 'Una primera vez',
            prompt: 'Describe algo que nunca habías hecho antes de un momento específico. Usa "non avevo/ero mai".',
            answer: 'Prima di quel viaggio, non ero mai stato in Asia.',
            accepted: ['non avevo mai', 'non ero mai', 'prima di', 'avevo mai', 'ero mai'],
            explain: 'Ejemplo: Non avevo mai mangiato il sushi prima di quella sera. / Non ero mai salito su un aereo.',
          },
          {
            scene: 'Explicar algo inesperado',
            prompt: 'Explica por qué algo no salió bien mencionando lo que ya había ocurrido antes.',
            answer: 'Non ho potuto entrare perché avevo dimenticato le chiavi a casa.',
            accepted: ['avevo', 'aveva', 'ero', 'era', 'avevano', 'erano', 'perché'],
            explain: 'Ejemplo: Erano già esauriti i biglietti quando sono arrivato. / Avevo già speso tutti i soldi.',
          },
          {
            scene: 'Después de un evento',
            prompt: 'Describe lo que alguien ya había logrado antes de un momento importante. Usa "dopo che" + trapassato.',
            answer: 'Dopo che aveva finito il dottorato, ha trovato un lavoro in una grande azienda.',
            accepted: ['dopo che', 'avevo', 'aveva', 'avevano', 'ero', 'era', 'erano'],
            explain: 'Ejemplo: Dopo che erano partiti, ho pulito tutta la casa. / Dopo che avevo studiato, sono uscito.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Cuenta una historia del pasado',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones narrando eventos pasados con secuencia temporal clara.',
        type: 'write',
        items: [
          {
            scene: 'Tu historia',
            prompt: 'Escribe sobre algo que ya habías hecho cuando llegaste a un lugar o evento.',
            answer: 'Quando sono arrivato all\'aeroporto, avevo già fatto il check-in online.',
            accepted: ['avevo', 'aveva', 'ero', 'era', 'avevano', 'erano', 'quando', 'già'],
            explain: 'Ejemplo: Quando ho aperto la valigia, avevo già messo tutto. / Quando sono arrivata a scuola, la lezione era già iniziata.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Escribe algo que nunca habías experimentado antes de un momento específico de tu vida.',
            answer: 'Prima di trasferirmi in Italia, non avevo mai sentito parlare il dialetto napoletano.',
            accepted: ['non avevo mai', 'non ero mai', 'prima di', 'non aveva mai', 'non era mai'],
            explain: 'Ejemplo: Prima di quel giorno, non avevo mai cucinato da solo. / Non ero mai andato a un concerto rock prima di allora.',
          },
          {
            scene: 'Tu historia',
            prompt: 'Cuenta algo que alguien ya había hecho antes de un evento importante.',
            answer: 'Mia nonna aveva già preparato il pranzo quando siamo arrivati a casa sua.',
            accepted: ['avevo', 'aveva', 'ero', 'era', 'avevano', 'erano', 'già'],
            explain: 'Ejemplo: I miei genitori avevano già scelto il nome quando sono nato. / Lei aveva già scritto il romanzo prima di trovare un editore.',
          },
        ],
      },
    ],
  },
}

export default topic
