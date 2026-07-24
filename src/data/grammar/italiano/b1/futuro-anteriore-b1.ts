import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-anteriore-b1',
  order: '05',
  color: '#009246',
  category: 'Verbi',
  level: 'B1',
  title: 'Futuro Anteriore en Italiano B1',
  shortTitle: 'Futuro Anteriore',
  metaTitle: 'Futuro Anteriore Italiano B1 — Futuro Perfecto en Italiano',
  description:
    'El futuro anteriore es el futuro perfecto italiano. Expresa una acción que habrá ocurrido antes de otro momento o acción futura. También se usa para expresar conjeturas sobre el pasado. Se forma con il futuro semplice di avere o essere más il participio passato.',
  lead: 'Domina el futuro anteriore para hablar de acciones futuras completadas y hacer suposiciones sobre el pasado.',
  outcomes: [
    'Formar el futuro anteriore con avrò/sarò + participio passato',
    'Usar el futuro anteriore para expresar anterioridad en el futuro',
    'Reconocer el uso conjetural del futuro anteriore sobre el pasado',
    'Combinar futuro anteriore con futuro semplice en oraciones temporales',
  ],

  guide: {
    goal: 'Expresar que una acción habrá ocurrido antes de otro punto futuro, y hacer conjeturas sobre el pasado.',
    model: 'Quando tornerai, avrò già finito. / Sarà già partito. / Avranno studiato tutta la notte.',
    formula: 'futuro semplice di avere/essere + participio passato',
    decisions: [
      'Futuro di AVERE: avrò, avrai, avrà, avremo, avrete, avranno',
      'Futuro di ESSERE: sarò, sarai, sarà, saremo, sarete, saranno',
      'Los mismos verbos que llevan essere en passato prossimo llevan essere en futuro anteriore: sarò andato, sarò venuto, sarò partito',
      'El participio concuerda en género y número con essere: sarò andato/andata; saranno partiti/partite',
      'Uso temporal: "quando/appena/dopo che + futuro anteriore, futuro semplice" — expresa la acción completada primero',
      'Uso conjetural: en lugar de indicativo pasado → "Sarà andato a casa" (Habrá ido a casa — suposición)',
    ],
    table: [
      ['Sujeto', 'Con avere (finire)', 'Con essere (arrivare)'],
      ['io', 'avrò finito', 'sarò arrivato/a'],
      ['tu', 'avrai finito', 'sarai arrivato/a'],
      ['lui/lei', 'avrà finito', 'sarà arrivato/a'],
      ['noi', 'avremo finito', 'saremo arrivati/e'],
      ['voi', 'avrete finito', 'sarete arrivati/e'],
      ['loro', 'avranno finito', 'saranno arrivati/e'],
    ],
    mistakes: [
      '"Quando finirò, ti chiamo" — posible pero informal; la forma más precisa es: "Quando avrò finito, ti chiamerò" ✓ (futuro anteriore + futuro semplice).',
      '"Sarò andato" puede ser: (1) futuro anterior = habré ido; o (2) conjetural = habrá ido. El contexto determina el significado.',
      '"Avranno mangiato" ≠ "Hanno mangiato" — el primero es conjetural (supongo que habrán comido), el segundo es afirmación.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el futuro anteriore en italiano?',
      paragraphs: [
        'El futuro anteriore (futuro perfecto) expresa una acción que habrá terminado antes de otro momento futuro. Se forma con el futuro semplice del auxiliar (avrò / sarò) + el participio pasado, con las mismas reglas de auxiliar y concordancia del passato prossimo. Equivale al español "habré + participio". Esta es la tabla:',
      ],
      table: [
        ['Persona', 'con avere (finire)', 'con essere (partire)'],
        ['io', 'avrò finito', 'sarò partito/a'],
        ['tu', 'avrai finito', 'sarai partito/a'],
        ['lui/lei', 'avrà finito', 'sarà partito/a'],
        ['noi', 'avremo finito', 'saremo partiti/e'],
        ['voi', 'avrete finito', 'sarete partiti/e'],
        ['loro', 'avranno finito', 'saranno partiti/e'],
      ],
    },
    {
      heading: 'Dos usos principales del futuro anteriore',
      paragraphs: [
        'Uso 1 — Anterioridad futura: indica que una acción se habrá completado antes de otra acción futura. Aparece frecuentemente con "quando", "appena" (en cuanto), "dopo che": "Quando avrò finito il lavoro, usciremo a cena" / "Appena sarò arrivato, ti chiamerò".',
        'Uso 2 — Conjetura sobre el pasado: expresa una suposición sobre lo que ocurrió en el pasado (alternativa al futuro semplice conjetural). "Non risponde al telefono — sarà uscito" (No contesta el teléfono — habrá salido, i.e., supongo que salió). "Dove sarà andato?" (¿Dónde habrá ido?).',
      ],
    },
    {
      heading: 'Futuro anteriore en oraciones temporales',
      paragraphs: [
        'La estructura más frecuente en el uso temporal: "Quando/Appena/Non appena + futuro anteriore + futuro semplice". Ejemplos: "Quando avrai letto il libro, potrai guardare il film" / "Appena sarò tornato, ti manderò un messaggio" / "Non appena avremo finito, partiremo".',
        'Nota importante: en el italiano coloquial, a menudo se sustituye el futuro anteriore por el presente o el futuro semplice: "Quando finisco, ti chiamo" (más informal). El futuro anteriore es más preciso y formal.',
      ],
    },
    {
      heading: '¿Cómo se forma el futuro anteriore en italiano?',
      paragraphs: [
        'Con el futuro semplice del auxiliar (avrò, avrai, avrà… / sarò, sarai, sarà…) + el participio pasado: "avrò mangiato", "sarò partito". Se elige avere o essere con las reglas del passato prossimo, y con essere el participio concuerda: "sarà arrivata".',
      ],
    },
    {
      heading: '¿Cuándo se usa el futuro anteriore?',
      paragraphs: [
        'Para una acción que se habrá completado antes de otra futura, sobre todo con quando, appena, dopo che ("Quando avrò finito, usciremo"), y para conjeturas sobre el pasado ("Non risponde: sarà uscito" = no contesta, habrá salido).',
      ],
    },
    {
      heading: '¿Cómo se dice "habré hecho" en italiano?',
      paragraphs: [
        'Con el futuro anteriore: "avrò fatto" (habré hecho), "sarò andato" (habré ido), "avremo finito" (habremos terminado). Ejemplo: "Domani a quest\'ora avrò già finito l\'esame" (mañana a esta hora ya habré terminado el examen).',
      ],
    },
    {
      heading: 'Conjeturas y suposiciones en pasado',
      paragraphs: [
        'Cuando no sabes con certeza lo que ocurrió y quieres hacer una suposición, puedes usar el futuro anteriore: "Dove sono andati?" → "Saranno andati al cinema" (Supongo que habrán ido al cine). "Perché non è venuto?" → "Avrà dimenticato" (Habrá olvidado).',
        'Esta función conjetural es muy útil en conversaciones cotidianas. Se distingue del uso temporal por el contexto: si hay un evento futuro de referencia, es uso temporal; si hay una pregunta o duda sobre el pasado, es uso conjetural.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futuro anteriore para anterioridad futura y conjeturas sobre el pasado.',
    graphicPrompt: 'Línea de tiempo con dos puntos futuros, el primero marcado como completado antes del segundo.',
    scene: [
      ['Quando tornerai, avrò già cucinato.', 'Cuando regreses, ya habré cocinado.'],
      ['Appena avrò finito, ti chiamo.', 'En cuanto haya terminado, te llamo.'],
      ['Non risponde — sarà uscito.', 'No contesta — habrá salido.'],
      ['Entro domani, avremo preso una decisione.', 'Para mañana, habremos tomado una decisión.'],
      ['Dove saranno andati?', '¿Dónde habrán ido?'],
      ['Quando avrete letto il rapporto, discuteremo.', 'Cuando hayáis leído el informe, discutiremos.'],
      ['Avrà dimenticato l\'appuntamento.', 'Habrá olvidado la cita.'],
      ['Sarò partito prima che tu arrivi.', 'Habré salido antes de que llegues.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['estructura quando + futuro anteriore', 'uso conjetural', 'elección de auxiliar'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el futuro anteriore correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de futuro anteriore para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Planificando el fin de semana',
            lines: [['', 'Quando tornerai sabato sera, io ___ già tutto il necessario.']],
            options: ['avrò preparato', 'ho preparato', 'preparo', 'avevo preparato'],
            answer: 'avrò preparato',
            explain: 'Acción completada antes del retorno futuro. "Preparare" lleva avere: avrò preparato.',
          },
          {
            scene: 'Sobre el proyecto',
            lines: [['', 'Entro venerdì prossimo, noi ___ il progetto ai clienti.']],
            options: ['avremo presentato', 'presentiamo', 'avremmo presentato', 'avevamo presentato'],
            answer: 'avremo presentato',
            explain: '"Presentare" lleva avere. Para "noi" en futuro anteriore: avremo presentato.',
          },
          {
            scene: 'Una suposición',
            lines: [['', 'Non rispondono al telefono — ___ già a letto.']],
            options: ['saranno andati', 'sono andati', 'vanno', 'sarebbero andati'],
            answer: 'saranno andati',
            explain: 'Uso conjetural del futuro anteriore. "Andare" lleva essere. Para "loro": saranno andati.',
          },
          {
            scene: 'Meta personal',
            lines: [['', 'Fra un anno, ___ il corso di italiano.']],
            options: ['avrò finito', 'finisco', 'finirò', 'avevo finito'],
            answer: 'avrò finito',
            explain: '"Finire" lleva avere. Para "io" con referencia a tiempo futuro: avrò finito.',
          },
          {
            scene: 'Proceso de mudanza',
            lines: [['', 'Appena ___ di trasloco, vi inviteremo a casa.']],
            options: ['saremo finiti', 'siamo finiti', 'finiamo', 'saremo finire'],
            answer: 'saremo finiti',
            explain: '"Finire" aquí es intransitivo (acabar de hacer algo) → essere. Para "noi": saremo finiti.',
          },
          {
            scene: 'Curiosidad sobre alguien',
            lines: [['', 'Non lo vedo da giorni — dove ___?']],
            options: ['sarà andato', 'è andato', 'va', 'andava'],
            answer: 'sarà andato',
            explain: 'Pregunta conjetural sobre el pasado. "Andare" lleva essere. Para "lui": sarà andato.',
          },
          {
            scene: 'Promesa futura',
            lines: [['', 'Non partirete finché non ___ tutti i preparativi.']],
            options: ['avrete fatto', 'fate', 'avevate fatto', 'avrete fare'],
            answer: 'avrete fatto',
            explain: '"Fare" lleva avere. Para "voi" en futuro anteriore: avrete fatto.',
          },
          {
            scene: 'En la cocina',
            lines: [['', 'Quando arriverà mia madre, io ___ già la torta.']],
            options: ['avrò fatto', 'ho fatto', 'faccio', 'avevo fatto'],
            answer: 'avrò fatto',
            explain: '"Fare" lleva avere. Para "io": avrò fatto (la torta habrá sido hecha antes de que llegue la madre).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos acciones en el futuro',
        tag: '2 espacios',
        intro: 'Completa las dos formas verbales del futuro en cada oración.',
        type: 'dual',
        items: [
          {
            scene: 'El día de graduación',
            lines: [['', 'Quando [[0]] l\'università, [[1]] a festeggiare con tutta la famiglia.']],
            blanks: [
              { options: ['avrò finito', 'finisco', 'ho finito', 'finirò'], answer: 'avrò finito', explain: 'Terminar la universidad ocurre ANTES de la celebración. Futuro anteriore: avrò finito.' },
              { options: ['andremo', 'andiamo', 'siamo andati', 'andavamo'], answer: 'andremo', explain: 'La celebración ocurre después. Futuro semplice: andremo.' },
            ],
          },
          {
            scene: 'Revisión de manuscrito',
            lines: [['', 'Appena [[0]] il manoscritto, lo [[1]] all\'editore.']],
            blanks: [
              { options: ['avrò corretto', 'correggo', 'ho corretto', 'correggevo'], answer: 'avrò corretto', explain: 'Corregir es la acción completada primero. "Correggere" lleva avere: avrò corretto.' },
              { options: ['manderò', 'mando', 'ho mandato', 'mandavo'], answer: 'manderò', explain: 'Enviar ocurre después de corregir. Futuro semplice: manderò.' },
            ],
          },
          {
            scene: 'Suposiciones sobre amigos',
            lines: [['', 'Non rispondono ai messaggi — [[0]] molto occupati o [[1]] il telefono.']],
            blanks: [
              { options: ['saranno stati', 'sono stati', 'erano stati', 'saranno'], answer: 'saranno stati', explain: 'Conjetura: "essere stati occupati" → futuro anteriore conjetural: saranno stati.' },
              { options: ['avranno dimenticato', 'hanno dimenticato', 'dimenticano', 'avrebbero dimenticato'], answer: 'avranno dimenticato', explain: 'Conjetura sobre lo que habrán hecho. "Dimenticare" lleva avere: avranno dimenticato.' },
            ],
          },
          {
            scene: 'Decisiones de equipo',
            lines: [['', 'Prima di decidere, [[0]] tutti i dati e [[1]] con gli esperti.']],
            blanks: [
              { options: ['avremo analizzato', 'analizziamo', 'abbiamo analizzato', 'analizzavamo'], answer: 'avremo analizzato', explain: 'Analizar datos es previo a decidir. "Analizzare" lleva avere: avremo analizzato.' },
              { options: ['avremo parlato', 'parliamo', 'abbiamo parlato', 'parlavamo'], answer: 'avremo parlato', explain: 'Hablar con expertos también es previo. "Parlare" lleva avere: avremo parlato.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Planes de un año sabático',
        tag: 'Texto guiado',
        intro: 'Completa el texto eligiendo entre futuro anteriore y futuro semplice.',
        type: 'guidedText',
        scene: 'Elige el tiempo verbal correcto: futuro anteriore o futuro semplice.',
        text: 'Il prossimo anno farò un anno sabbatico. Prima di partire, [[0]] (risparmiare) abbastanza soldi. Quando [[1]] (arrivare) in Sud America, mi adatterò alla vita locale. Appena [[2]] (imparare) lo spagnolo base, [[3]] (iniziare) a lavorare come volontario. Dopo che [[4]] (visitare) tutti i paesi che voglio, [[5]] (tornare) in Italia con una nuova prospettiva. I miei amici dicono che quando [[6]] (finire) quest\'avventura, [[7]] (essere) una persona completamente diversa.',
        blanks: [
          { options: ['avrò risparmiato', 'risparmio', 'ho risparmiato', 'risparmiavo'], answer: 'avrò risparmiato', explain: 'Ahorrar es previo a la partida. Futuro anteriore: avrò risparmiato.' },
          { options: ['sarò arrivato', 'arrivo', 'sono arrivato', 'arrivassi'], answer: 'sarò arrivato', explain: 'Llegada que precede a la adaptación. "Arrivare" lleva essere: sarò arrivato.' },
          { options: ['avrò imparato', 'imparo', 'ho imparato', 'imparassi'], answer: 'avrò imparato', explain: 'Aprender primero, luego trabajar. "Imparare" lleva avere: avrò imparato.' },
          { options: ['inizierò', 'inizio', 'ho iniziato', 'iniziassi'], answer: 'inizierò', explain: 'La acción posterior (empezar a trabajar). Futuro semplice: inizierò.' },
          { options: ['avrò visitato', 'visito', 'ho visitato', 'visitassi'], answer: 'avrò visitato', explain: 'Visitar es previo al regreso. "Visitare" lleva avere: avrò visitato.' },
          { options: ['tornerò', 'torno', 'sono tornato', 'tornassi'], answer: 'tornerò', explain: 'Regreso como acción futura posterior. Futuro semplice: tornerò.' },
          { options: ['avrò finito', 'finisco', 'ho finito', 'finisca'], answer: 'avrò finito', explain: 'Terminar la aventura es previo al cambio. Futuro anteriore: avrò finito.' },
          { options: ['sarò', 'sono', 'sia', 'ero'], answer: 'sarò', explain: 'Ser una persona diferente es el resultado posterior. Futuro semplice: sarò.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el futuro anteriore',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de futuro anteriore del verbo indicado.',
        type: 'freeText',
        scene: 'Escribe el futuro anteriore correcto.',
        text: 'Quando [[0]] (tu - leggere) questa lettera, io [[1]] (già - partire). Appena [[2]] (noi - decidere), vi comunicheremo il risultato. Non so dove siano — [[3]] (probabilmente - uscire). Fra cinque anni, [[4]] (io - dimenticare) tutti questi problemi.',
        blanks: [
          { answer: 'avrai letto', accepted: ['avrai letto'], explain: '"Leggere" lleva avere. Para "tu": avrai letto.' },
          { answer: 'sarò già partito', accepted: ['sarò già partito', 'sarò già partita', 'sarò partito', 'sarò partita'], explain: '"Partire" lleva essere. Para "io": sarò già partito/a.' },
          { answer: 'avremo deciso', accepted: ['avremo deciso'], explain: '"Decidere" lleva avere. Para "noi": avremo deciso.' },
          { answer: 'saranno usciti', accepted: ['saranno usciti', 'saranno uscite'], explain: '"Uscire" lleva essere. Para "loro" (conjetural): saranno usciti.' },
          { answer: 'avrò dimenticato', accepted: ['avrò dimenticato'], explain: '"Dimenticare" lleva avere. Para "io": avrò dimenticato.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produce frases con futuro anteriore',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el futuro anteriore en los contextos indicados.',
        type: 'write',
        items: [
          {
            scene: 'Un plan concreto',
            prompt: 'Escribe lo que habrás hecho antes de la semana que viene. Usa "entro" o "quando".',
            answer: 'Entro lunedì prossimo, avrò consegnato tutti i compiti.',
            accepted: ['avrò', 'sarò', 'avranno', 'saranno', 'entro', 'quando', 'appena'],
            explain: 'Ejemplo: Quando finirà la settimana, avrò lavorato 40 ore. / Entro venerdì avrò finito il progetto.',
          },
          {
            scene: 'Una suposición',
            prompt: 'Alguien no llegó a la cita. Haz una conjetura sobre dónde habrá ido o qué habrá pasado.',
            answer: 'Sarà rimasto bloccato nel traffico, o forse avrà avuto un impegno urgente.',
            accepted: ['sarà', 'avrà', 'saranno', 'avranno', 'probabilmente'],
            explain: 'Ejemplo: Avrà dimenticato l\'appuntamento. / Sarà già partito per la riunione.',
          },
          {
            scene: 'Meta futura',
            prompt: 'Describe lo que habrás logrado en 5 años usando el futuro anteriore.',
            answer: 'Fra cinque anni, avrò imparato tre lingue e sarò vissuto in almeno due paesi stranieri.',
            accepted: ['avrò', 'sarò', 'avranno', 'saranno', 'fra', 'entro'],
            explain: 'Ejemplo: Fra un anno, avrò finito l\'università. / Tra dieci anni, avrò scritto il mio primo libro.',
          },
          {
            scene: 'Condición para una promesa',
            prompt: 'Haz una promesa condicional usando "appena" o "non appena" + futuro anteriore.',
            answer: 'Appena sarò arrivato a casa, ti chiamerò subito.',
            accepted: ['appena', 'non appena', 'sarò', 'avrò', 'quando', 'saremo', 'avremo'],
            explain: 'Ejemplo: Non appena avrò finito questo lavoro, verrò da te. / Appena saranno pronti, ve lo diciamo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu futuro en italiano',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones con futuro anteriore sobre tus planes o suposiciones.',
        type: 'write',
        items: [
          {
            scene: 'Tu progreso con el italiano',
            prompt: 'Describe lo que habrás logrado con el italiano en 6 meses o un año.',
            answer: 'Fra sei mesi, avrò studiato tutte le strutture grammaticali del B1.',
            accepted: ['avrò', 'sarò', 'avranno', 'saranno', 'fra', 'entro', 'quando'],
            explain: 'Ejemplo: Quando finirà l\'anno, avrò capito quasi tutto il congiuntivo. / Fra un anno, avrò guardato 50 film in italiano.',
          },
          {
            scene: 'Una suposición sobre alguien',
            prompt: 'Haz una conjetura sobre algo que una persona conocida habrá hecho esta semana.',
            answer: 'Mia madre avrà già cucinato per tutto il fine settimana.',
            accepted: ['avrà', 'sarà', 'avranno', 'saranno', 'probabilmente', 'sicuramente', 'forse'],
            explain: 'Ejemplo: Il mio capo avrà già letto la mia proposta. / I miei amici saranno già partiti per le vacanze.',
          },
          {
            scene: 'Una condición futura',
            prompt: 'Escribe una condición que debe cumplirse primero antes de otra acción futura.',
            answer: 'Quando avremo finito di pagare il mutuo, compreremo una casa più grande.',
            accepted: ['avrò', 'sarò', 'avremo', 'saremo', 'avranno', 'saranno', 'quando', 'appena', 'dopo che'],
            explain: 'Ejemplo: Dopo che avrò dormito un po\', starò meglio. / Quando avrete imparato queste regole, potrete continuare.',
          },
        ],
      },
    ],
  },
}

export default topic
