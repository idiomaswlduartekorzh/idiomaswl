import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passato-prossimo-avere-a2',
  order: '01',
  color: '#009246',
  category: 'Passato prossimo',
  level: 'A2',
  title: 'Passato prossimo con avere en italiano A2 — Pasado perfecto',
  shortTitle: 'Passato prossimo (avere)',
  metaTitle: 'Passato prossimo con avere italiano A2 — ho mangiato, ha fatto, hanno visto',
  description:
    'El passato prossimo con avere es el tiempo pasado más usado en el italiano hablado. Se forma con ho/hai/ha/abbiamo/avete/hanno + participio pasado. Los participios regulares terminan en -ato, -uto, -ito; los irregulares más importantes son: fatto, detto, scritto, letto, preso, visto, chiuso, perso.',
  lead: 'avere (ho/hai/ha...) + participio pasado (-ato/-uto/-ito). Ho mangiato. Ha fatto. Abbiamo visto. Con avere el participio NO concuerda en género con el sujeto — siempre masculino singular.',
  outcomes: [
    'Conjugar el passato prossimo con avere para los 6 sujetos',
    'Formar participios regulares en -ato, -uto, -ito',
    'Reconocer y usar los participios irregulares: fatto, detto, scritto, letto, preso, visto, chiuso, perso',
  ],

  guide: {
    goal: 'Formar el passato prossimo con avere para hablar de acciones pasadas completadas.',
    model: 'Ho mangiato la pizza. / Ha fatto i compiti. / Abbiamo visto un film.',
    formula: 'avere (presente) + participio pasado del verbo principal',
    decisions: [
      'io → ho: ho mangiato, ho fatto, ho scritto',
      'tu → hai: hai mangiato, hai fatto, hai scritto',
      'lui/lei → ha: ha mangiato, ha fatto, ha scritto',
      'noi → abbiamo: abbiamo mangiato, abbiamo fatto, abbiamo scritto',
      'voi → avete: avete mangiato, avete fatto, avete scritto',
      'loro → hanno: hanno mangiato, hanno fatto, hanno scritto',
      'Regulares: -are → -ato; -ere → -uto; -ire → -ito',
      'Irregulares: fare→fatto, dire→detto, scrivere→scritto, leggere→letto, prendere→preso, vedere→visto, chiudere→chiuso, perdere→perso',
    ],
    table: [
      ['Tipo de verbo', 'Regla del participio', 'Ejemplo'],
      ['-are → -ato', 'mangiare, parlare, lavorare', 'mangiato, parlato, lavorato'],
      ['-ere → -uto', 'vendere, credere, ricevere', 'venduto, creduto, ricevuto'],
      ['-ire → -ito', 'finire, sentire, dormire', 'finito, sentito, dormito'],
      ['Irregolari', 'fare, dire, scrivere, leggere', 'fatto, detto, scritto, letto'],
    ],
    mistakes: [
      'El participio NO concuerda con el sujeto cuando hay avere: Ho mangiata ✗ → Ho mangiato ✓',
      'Verbi transitivi usan avere, no essere: Sono mangiato ✗ → Ho mangiato ✓',
      'Participios irregulares comunes: veduto ✗ → visto ✓; dicuto ✗ → detto ✓; facito ✗ → fatto ✓',
    ],
  },

  seo: [
    {
      heading: 'El passato prossimo: el pasado más usado en italiano',
      paragraphs: [
        'El passato prossimo es el tiempo pasado del italiano hablado y estándar. Equivale tanto al pretérito perfecto compuesto español ("he comido") como al pretérito indefinido ("comí") en contextos cotidianos. Con avere se construye con el auxiliar conjugado en presente más el participio pasado.',
        'La regla de oro: los verbos transitivos (que tienen objeto directo) usan avere. Ho comprato il pane. Ho visto Maria. Ho fatto i compiti. Si el verbo lleva un complemento directo, casi siempre va con avere.',
      ],
    },
    {
      heading: 'Participios regulares e irregulares',
      paragraphs: [
        'Los verbos en -are forman -ato (mangiare→mangiato), los en -ere forman -uto (vendere→venduto) y los en -ire forman -ito (finire→finito). Estos patrones cubren la mayoría de verbos cotidianos.',
        'Los irregulares más frecuentes son: fare→fatto, dire→detto, scrivere→scritto, leggere→letto, prendere→preso, vedere→visto, chiudere→chiuso, perdere→perso. Como son tan usados, conviene memorizarlos directamente.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende avere + participio y distingue regulares (-ato/-uto/-ito) de los 8 irregulares clave.',
    graphicPrompt: 'Tabla auxiliar avere × seis personas, con columna de participios irregulares frecuentes.',
    scene: [
      ['Ho mangiato la pizza.', 'He comido la pizza.'],
      ['Ha fatto i compiti.', 'Él/ella ha hecho los deberes.'],
      ['Abbiamo visto un film.', 'Hemos visto una película.'],
      ['Hanno scritto una lettera.', 'Ellos han escrito una carta.'],
    ],
    learnerModes: ['visual: tabla auxiliar + participio', 'analítico: regular vs irregular', 'oral: narrar el día de ayer'],
    reviewFocus: ['participio sin concordancia con avere', 'irregulares: fatto/detto/visto/letto/preso', 'ho/hai/ha/abbiamo/avete/hanno'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Passato prossimo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el participio o el auxiliar correcto para completar el passato prossimo.',
        type: 'choice',
        items: [
          {
            scene: 'Desayuno de esta mañana',
            lines: [['Sofia', 'Stamattina ho ___ un caffè e un cornetto. (bere)']],
            options: ['bevuto', 'bevito', 'bevato', 'bevo'],
            answer: 'bevuto',
            explain: 'Bere → bevuto (irregular). Ho bevuto = He bebido.',
          },
          {
            scene: 'Los deberes de ayer',
            lines: [['Carlo', 'Ieri sera ho ___ tutti i compiti. (fare)']],
            options: ['fatto', 'facito', 'facuto', 'faccio'],
            answer: 'fatto',
            explain: 'Fare → fatto (irregular). Ho fatto = He hecho.',
          },
          {
            scene: 'La novela',
            lines: [['David', 'Ho ___ quel romanzo in tre giorni. (leggere)']],
            options: ['letto', 'leguto', 'leggito', 'leggo'],
            answer: 'letto',
            explain: 'Leggere → letto (irregular). Ho letto = He leído.',
          },
          {
            scene: 'El email importante',
            lines: [['Ana', 'Lei ha ___ un\'email importante a tutti. (scrivere)']],
            options: ['scritto', 'scrivuto', 'scrivo', 'scrittato'],
            answer: 'scritto',
            explain: 'Scrivere → scritto (irregular). Ha scritto = Ha escrito.',
          },
          {
            scene: 'La película',
            lines: [['Marco', 'Ieri ___ visto un bel film al cinema. (io)']],
            options: ['ho', 'sono', 'era', 'avevo'],
            answer: 'ho',
            explain: 'Vedere usa avere: ho visto. Vedere es transitivo, auxiliar avere.',
          },
          {
            scene: 'El tren',
            lines: [['Lina', 'Loro hanno ___ il treno delle otto. (prendere)']],
            options: ['preso', 'presuto', 'prenduto', 'prendo'],
            answer: 'preso',
            explain: 'Prendere → preso (irregular). Hanno preso = Han cogido.',
          },
          {
            scene: 'La ventana',
            lines: [['Zhanna', 'Chi ha ___ la finestra? Fa freddo! (chiudere)']],
            options: ['chiuso', 'chiuduto', 'chiudito', 'chiude'],
            answer: 'chiuso',
            explain: 'Chiudere → chiuso (irregular). Ha chiuso = Ha cerrado.',
          },
          {
            scene: 'El partido de fútbol',
            lines: [['Giulia', 'Noi abbiamo ___ la partita di calcio ieri sera. (finire)']],
            options: ['finito', 'finita', 'finuti', 'finite'],
            answer: 'finito',
            explain: 'Finire → finito (regular -ire). Con avere: participio invariable.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Auxiliar y participio',
        tag: '2 espacios',
        intro: 'Completa con el auxiliar correcto y el participio del verbo indicado.',
        type: 'dual',
        items: [
          {
            scene: 'La reunión de ayer',
            lines: [['Marco', 'Ieri [[0]] [[1]] una riunione importante. (io / avere / fare)']],
            blanks: [
              { options: ['ho', 'sono', 'era'], answer: 'ho', explain: 'Fare usa avere. Io → ho.' },
              { options: ['fatto', 'fate', 'faccio'], answer: 'fatto', explain: 'Fare → fatto (irregular).' },
            ],
          },
          {
            scene: 'La música del fin de semana',
            lines: [['Sofia', 'Noi [[0]] [[1]] molta musica questo weekend. (avere / sentire)']],
            blanks: [
              { options: ['abbiamo', 'siamo', 'hanno'], answer: 'abbiamo', explain: 'Noi con avere → abbiamo.' },
              { options: ['sentito', 'sentuto', 'sentato'], answer: 'sentito', explain: 'Sentire → sentito (regular -ire).' },
            ],
          },
          {
            scene: 'El informe',
            lines: [['David', 'Voi [[0]] [[1]] il rapporto? (avere / leggere)']],
            blanks: [
              { options: ['avete', 'siete', 'avevano'], answer: 'avete', explain: 'Voi con avere → avete.' },
              { options: ['letto', 'leguto', 'leggito'], answer: 'letto', explain: 'Leggere → letto (irregular).' },
            ],
          },
          {
            scene: 'El mensaje del grupo',
            lines: [['Zhanna', 'Carlo [[0]] [[1]] un messaggio a tutti. (avere / mandare)']],
            blanks: [
              { options: ['ha', 'è', 'aveva'], answer: 'ha', explain: 'Carlo (lui) con avere → ha.' },
              { options: ['mandato', 'mandito', 'manduto'], answer: 'mandato', explain: 'Mandare → mandato (regular -are).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Diario del fin de semana',
        tag: 'Texto guiado',
        intro: 'Completa el diario de Sofia con el passato prossimo correcto.',
        type: 'guidedText',
        scene: 'Sofia escribe en su diario sobre el sábado pasado',
        text: 'Sabato scorso [[0]] la colazione con la mia famiglia. (mangiare) Poi [[1]] un libro in giardino. (leggere) A pranzo [[2]] una pasta veloce. (fare) Nel pomeriggio [[3]] un bel film con Marco. (vedere) Dopo il film [[4]] un gelato al bar. (prendere) La sera [[5]] delle email importanti. (scrivere) Poi [[6]] di guardare la serie preferita. (finire)',
        blanks: [
          { options: ['ho mangiato', 'ho mangiata', 'sono mangiata'], answer: 'ho mangiato', explain: 'Mangiare con avere: ho mangiato. Participio invariable con avere.' },
          { options: ['ho letto', 'ho leguto', 'sono letto'], answer: 'ho letto', explain: 'Leggere → letto (irregular). Ho letto.' },
          { options: ['ho fatto', 'ho fatta', 'sono fatta'], answer: 'ho fatto', explain: 'Fare → fatto (irregular). Ho fatto.' },
          { options: ['ho visto', 'ho veduto', 'sono vista'], answer: 'ho visto', explain: 'Vedere → visto (irregular). Ho visto.' },
          { options: ['ho preso', 'ho presuto', 'sono presa'], answer: 'ho preso', explain: 'Prendere → preso (irregular). Ho preso.' },
          { options: ['ho scritto', 'ho scritta', 'sono scritta'], answer: 'ho scritto', explain: 'Scrivere → scritto (irregular). Ho scritto.' },
          { options: ['ho finito', 'ho finita', 'sono finita'], answer: 'ho finito', explain: 'Finire → finito (regular). Ho finito.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del passato prossimo con avere.',
        type: 'freeText',
        scene: 'David habla de su semana en WeLearn',
        text: 'Questa settimana [[0]] molto. (lavorare) Lunedì [[1]] le lezioni nuove. (preparare) Martedì [[2]] il cellulare — è stata una giornata difficile! (perdere) Mercoledì [[3]] agli studenti le date degli esami. (dire) Giovedì [[4]] l\'ufficio presto e sono andato a casa. (chiudere)',
        blanks: [
          { answer: 'ho lavorato', explain: 'Lavorare → lavorato (regular -are). Ho lavorato.' },
          { answer: 'ho preparato', explain: 'Preparare → preparato (regular -are). Ho preparato.' },
          { answer: 'ho perso', explain: 'Perdere → perso (irregular). Ho perso.' },
          { answer: 'ho detto', explain: 'Dire → detto (irregular). Ho detto.' },
          { answer: 'ho chiuso', explain: 'Chiudere → chiuso (irregular). Ho chiuso.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en passato prossimo con avere.',
        type: 'write',
        items: [
          {
            scene: 'Ayer por la tarde',
            prompt: 'Ieri pomeriggio ___ una pizza con gli amici. (mangiare)',
            answer: 'Ieri pomeriggio ho mangiato una pizza con gli amici.',
            accepted: ['ieri pomeriggio ho mangiato una pizza con gli amici'],
            explain: 'Mangiare → mangiato (regular -are). Io ho mangiato.',
          },
          {
            scene: 'Esta mañana',
            prompt: 'Stamattina ___ il giornale. (leggere)',
            answer: 'Stamattina ho letto il giornale.',
            accepted: ['stamattina ho letto il giornale'],
            explain: 'Leggere → letto (irregular). Ho letto.',
          },
          {
            scene: 'El fin de semana',
            prompt: 'Il weekend scorso noi ___ un bel film. (vedere)',
            answer: 'Il weekend scorso noi abbiamo visto un bel film.',
            accepted: ['il weekend scorso noi abbiamo visto un bel film', 'il weekend scorso abbiamo visto un bel film'],
            explain: 'Vedere → visto (irregular). Noi abbiamo visto.',
          },
          {
            scene: 'Ayer en la oficina',
            prompt: 'Ieri in ufficio ___ molte email. (scrivere)',
            answer: 'Ieri in ufficio ho scritto molte email.',
            accepted: ['ieri in ufficio ho scritto molte email'],
            explain: 'Scrivere → scritto (irregular). Ho scritto.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Narración libre',
        tag: 'Escritura guiada',
        intro: 'Describe lo que hiciste usando el passato prossimo con avere.',
        type: 'write',
        items: [
          {
            scene: 'Tu ayer',
            prompt: 'Ieri ho... (describe al menos 3 acciones con avere + participio)',
            answer: 'Ieri ho lavorato in ufficio, ho mangiato con un amico e ho visto un film.',
            accepted: ['ieri ho lavorato', 'ieri ho mangiato', 'ieri ho fatto'],
            explain: 'Acciones completadas en el pasado: avere + participio regular o irregular.',
          },
          {
            scene: 'Esta semana',
            prompt: 'Questa settimana ho... / abbiamo... (al menos 2 acciones)',
            answer: 'Questa settimana ho finito un progetto importante e ho scritto molte email.',
            accepted: ['questa settimana ho finito', 'questa settimana ho fatto', 'questa settimana abbiamo'],
            explain: 'Passato prossimo con avere para acciones de la semana.',
          },
          {
            scene: 'Un recuerdo memorable',
            prompt: "L'anno scorso ho... (una experiencia especial)",
            answer: "L'anno scorso ho visitato Roma e ho visto il Colosseo.",
            accepted: ["l'anno scorso ho visitato", "l'anno scorso ho visto", "l'anno scorso ho fatto"],
            explain: 'El año pasado: passato prossimo con avere para narrar experiencias.',
          },
        ],
      },
    ],
  },
}

export default topic
