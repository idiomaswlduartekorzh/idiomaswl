import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'periodo-ipotetico-b1',
  order: '06',
  color: '#009246',
  category: 'Struttura',
  level: 'B1',
  title: 'Periodo Ipotetico en Italiano B1',
  shortTitle: 'Periodo Ipotetico',
  metaTitle: 'Periodo Ipotetico Italiano B1 — Las Tres Condicionales del Italiano',
  description:
    'El periodo ipotetico es la estructura condicional del italiano. Tiene tres tipos: realtà (condición real), possibilità (condición posible pero hipotética) e impossibilità (condición imposible o contraria a los hechos). Cada tipo usa una combinación específica de tiempos verbales.',
  lead: 'Aprende las tres condicionales del italiano: real, posible e imposible, con sus combinaciones de tiempos verbales.',
  outcomes: [
    'Identificar y usar los tres tipos de periodo ipotetico',
    'Combinar congiuntivo imperfetto con condizionale presente (tipo 2)',
    'Combinar congiuntivo trapassato con condizionale passato (tipo 3)',
    'Distinguir cuándo usar cada tipo según la realidad de la condición',
  ],

  guide: {
    goal: 'Construir oraciones condicionales de los tres tipos: real, posible e imposible en el pasado.',
    model: 'Se hai tempo, vieni con me. / Se avessi soldi, comprerei quella casa. / Se avessi studiato, avresti superato l\'esame.',
    formula: 'Tipo 1: se + presente, presente/futuro | Tipo 2: se + congiuntivo imperfetto, condizionale presente | Tipo 3: se + congiuntivo trapassato, condizionale passato',
    decisions: [
      'Tipo 1 — Realtà: la condición es real o muy probable. "Se + presente indicativo, presente/futuro indicativo": "Se ha fame, mangia!" / "Se piove, prendo l\'ombrello"',
      'Tipo 2 — Possibilità: la condición es hipotética o poco probable. "Se + congiuntivo imperfetto, condizionale presente": "Se avessi più tempo, studierei il giapponese"',
      'Tipo 3 — Impossibilità: la condición es imposible porque se refiere al pasado. "Se + congiuntivo trapassato, condizionale passato": "Se avessi studiato, avrei superato l\'esame"',
      'El congiuntivo imperfetto de essere: fossi, fossi, fosse, fossimo, foste, fossero',
      'El congiuntivo imperfetto de avere: avessi, avessi, avesse, avessimo, aveste, avessero',
      'Mezcla posible (tipo misto): "Se avessi studiato, passerei l\'esame adesso" — condición pasada imposible con consecuencia en el presente',
    ],
    table: [
      ['Tipo', 'Cláusula con SE', 'Cláusula principal'],
      ['1 — Realtà', 'se + presente indicativo', 'presente / futuro / imperativo'],
      ['2 — Possibilità', 'se + congiuntivo imperfetto', 'condizionale presente'],
      ['3 — Impossibilità', 'se + congiuntivo trapassato', 'condizionale passato'],
    ],
    mistakes: [
      '"Se avrei soldi" ❌ → "Se avessi soldi" ✓ — después de "se" condicional NUNCA se usa el condizionale, sino el congiuntivo.',
      '"Se studiassi, avrei passato" — tipo mixto posible; pero para tipo 3 puro: "Se avessi studiato, avrei passato" ✓.',
      '"Se avessi fame, mangio" ❌ — mezcla incoherente de tipos. Tipo 1: "Se ho fame, mangio" ✓. Tipo 2: "Se avessi fame, mangerei" ✓.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el periodo ipotetico en italiano?',
      paragraphs: [
        'El periodo ipotetico es la estructura que en italiano expresa condiciones y sus consecuencias. Tiene dos partes: la prótasis (la cláusula con "se") que introduce la condición, y la apódosis (la cláusula principal) que expresa la consecuencia. En italiano hay tres tipos principales según el grado de realidad o posibilidad de la condición.',
        'A diferencia del español, en italiano NUNCA se usa el condizionale después de "se" condicional. Esta es la regla más importante: "Se avrei..." ❌ → siempre "Se avessi..." ✓.',
      ],
    },
    {
      heading: 'Tipo 1: Periodo ipotetico della realtà',
      paragraphs: [
        'Se usa para condiciones reales o altamente probables. La estructura es: "Se + presente indicativo + presente indicativo/futuro semplice/imperativo". Ejemplos: "Se studi, impari" (Si estudias, aprendes). "Se avrai tempo, vieni con noi" (Si tienes tiempo, ven con nosotros). "Se sei stanco, riposati!" (Si estás cansado, ¡descansa!).',
        'Es el tipo más simple y el que más se parece al español. No requiere subjuntivo y usa tiempos de indicativo en ambas cláusulas.',
      ],
    },
    {
      heading: 'Tipo 2: Periodo ipotetico della possibilità',
      paragraphs: [
        'Se usa para condiciones hipotéticas o poco probables en el presente/futuro. Estructura: "Se + congiuntivo imperfetto + condizionale presente". Ejemplos: "Se avessi più soldi, comprerei quella macchina" (Si tuviera más dinero, compraría ese coche). "Se fossi te, non lo direi" (Si fuera tú, no lo diría). "Se potessi scegliere, vivrei in Italia" (Si pudiera elegir, viviría en Italia).',
        'El congiuntivo imperfetto de los verbos regulares: -are → -assi, -assi, -asse, -assimo, -aste, -assero (parlare → parlassi); -ere → -essi (scrivere → scrivessi); -ire → -issi (dormire → dormissi).',
      ],
      table: [
        ['Verbo', 'Yo (io)', 'Tú (tu)', 'Él/Ella', 'Nosotros', 'Ellos'],
        ['essere', 'fossi', 'fossi', 'fosse', 'fossimo', 'fossero'],
        ['avere', 'avessi', 'avessi', 'avesse', 'avessimo', 'avessero'],
        ['parlare', 'parlassi', 'parlassi', 'parlasse', 'parlassimo', 'parlassero'],
        ['potere', 'potessi', 'potessi', 'potesse', 'potessimo', 'potessero'],
      ],
    },
    {
      heading: 'Tipo 3: Periodo ipotetico dell\'impossibilità',
      paragraphs: [
        'Se usa para condiciones imposibles porque se refieren al pasado. Estructura: "Se + congiuntivo trapassato + condizionale passato". El congiuntivo trapassato = avessi/fossi + participio passato. Ejemplos: "Se avessi studiato di più, avrei superato l\'esame" (Si hubiera estudiado más, habría aprobado el examen). "Se fosse arrivato in tempo, avremmo potuto parlare" (Si hubiera llegado a tiempo, habríamos podido hablar).',
        'Este tipo es equivalente al español "si hubiera... habría...". Se usa para hablar de situaciones del pasado que no ocurrieron y reflexionar sobre sus consecuencias hipotéticas.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Los tres tipos de periodo ipotetico con énfasis en las combinaciones de tiempos verbales.',
    graphicPrompt: 'Tres círculos concéntricos: realidad, posibilidad e imposibilidad, con ejemplos en cada nivel.',
    scene: [
      ['Se piove, prendo l\'ombrello.', 'Si llueve, cojo el paraguas. (Tipo 1)'],
      ['Se avessi tempo, studierei il cinese.', 'Si tuviera tiempo, estudiaría chino. (Tipo 2)'],
      ['Se fossi ricco, viaggierei tutto il mondo.', 'Si fuera rico, viajaría por todo el mundo. (Tipo 2)'],
      ['Se avessi studiato, avrei passato l\'esame.', 'Si hubiera estudiado, habría aprobado. (Tipo 3)'],
      ['Se fosse rimasto, avremmo parlato.', 'Si se hubiera quedado, habríamos hablado. (Tipo 3)'],
      ['Se hai fame, mangia qualcosa!', 'Si tienes hambre, ¡come algo! (Tipo 1)'],
      ['Se potessi scegliere, vivrei a Roma.', 'Si pudiera elegir, viviría en Roma. (Tipo 2)'],
      ['Se mi avesse ascoltato, non sarebbe successo.', 'Si me hubiera escuchado, no habría ocurrido. (Tipo 3)'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['tres tipos', 'congiuntivo imperfetto', 'congiuntivo trapassato', 'nunca condizionale después de se'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el tipo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para completar cada oración condicional.',
        type: 'choice',
        items: [
          {
            scene: 'Consejo práctico',
            lines: [['', 'Se ___ fame, c\'è del cibo in frigo.']],
            options: ['hai', 'avessi', 'avresti', 'avrai'],
            answer: 'hai',
            explain: 'Condición real (Tipo 1): "Se hai fame..." → presente indicativo.',
          },
          {
            scene: 'Sueño hipotético',
            lines: [['', 'Se ___ milionario, donerei metà dei miei soldi in beneficenza.']],
            options: ['fossi', 'sono', 'sarò', 'saresti'],
            answer: 'fossi',
            explain: 'Condición hipotética (Tipo 2): "Se fossi..." → congiuntivo imperfetto di essere.',
          },
          {
            scene: 'Arrepentimiento pasado',
            lines: [['', 'Se ___ più attento, non avrei fatto quell\'errore.']],
            options: ['fossi stato', 'sono stato', 'fossi', 'sia stato'],
            answer: 'fossi stato',
            explain: 'Condición imposible en el pasado (Tipo 3): "Se fossi stato..." → congiuntivo trapassato di essere.',
          },
          {
            scene: 'Hipótesis presente',
            lines: [['', 'Se avessi la tua intelligenza, ___ un grande scienziato.']],
            options: ['diventerei', 'diventassi', 'divento', 'sono diventato'],
            answer: 'diventerei',
            explain: 'Tipo 2: la condición está en congiuntivo imperfetto, la consecuencia en condizionale presente: diventerei.',
          },
          {
            scene: 'Regla general',
            lines: [['', 'Se esci senza giacca, ___ freddo!']],
            options: ['avrai', 'avresti', 'avresti avuto', 'avessi'],
            answer: 'avrai',
            explain: 'Tipo 1: condición real + futuro para la consecuencia: "avrai freddo".',
          },
          {
            scene: 'Pasado imposible',
            lines: [['', 'Se tu mi ___ prima, avrei potuto aiutarti.']],
            options: ['avessi detto', 'hai detto', 'dicessi', 'direi'],
            answer: 'avessi detto',
            explain: 'Tipo 3: "Se avessi detto" → congiuntivo trapassato (dire → detto). Condición pasada imposible.',
          },
          {
            scene: 'Consejo hipotético',
            lines: [['', 'Se ___ te, non direi niente a nessuno.']],
            options: ['fossi', 'sono', 'sarò', 'sia'],
            answer: 'fossi',
            explain: '"Se fossi te" (Tipo 2, si fuera tú) → congiuntivo imperfetto di essere: fossi.',
          },
          {
            scene: 'Consecuencia hipotética pasada',
            lines: [['', 'Se avessimo prenotato prima, ___ il volo.']],
            options: ['avremmo preso', 'prendiamo', 'prendessimo', 'abbiamo preso'],
            answer: 'avremmo preso',
            explain: 'Tipo 3: condizionale passato en la apódosis: avremmo preso.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Completa las dos partes',
        tag: '2 espacios',
        intro: 'Completa tanto la condición como la consecuencia de cada oración condicional.',
        type: 'dual',
        items: [
          {
            scene: 'Elección de carrera (hipotética)',
            lines: [['', 'Se [[0]] (potere) scegliere di nuovo, [[1]] (studiare) architettura.']],
            blanks: [
              { options: ['potessi', 'posso', 'potrei', 'possa'], answer: 'potessi', explain: 'Tipo 2: Se + congiuntivo imperfetto. "Potere" → potessi.' },
              { options: ['studierei', 'studio', 'avrei studiato', 'studi'], answer: 'studierei', explain: 'Tipo 2: condizionale presente: studierei.' },
            ],
          },
          {
            scene: 'Lo que no pasó en el pasado',
            lines: [['', 'Se [[0]] (leggere) le istruzioni, non [[1]] (rompere) la macchina.']],
            blanks: [
              { options: ['avessi letto', 'ho letto', 'leggessi', 'abbia letto'], answer: 'avessi letto', explain: 'Tipo 3: Se + congiuntivo trapassato. "Leggere" → avessi letto.' },
              { options: ['avrei rotto', 'ho rotto', 'rompessi', 'rompo'], answer: 'avrei rotto', explain: 'Tipo 3: condizionale passato: avrei rotto. (Con negación: non avrei rotto → habría roto sin la instrucción).' },
            ],
          },
          {
            scene: 'Condición real',
            lines: [['', 'Se [[0]] (avere) tempo stasera, [[1]] (venire) a trovarti.']],
            blanks: [
              { options: ['ho', 'avessi', 'avrò', 'abbia'], answer: 'ho', explain: 'Tipo 1: Se + presente indicativo. "Avere" → ho.' },
              { options: ['vengo', 'verrei', 'venga', 'vieni'], answer: 'vengo', explain: 'Tipo 1: presente o futuro. "Venire" → vengo (o: verrò).' },
            ],
          },
          {
            scene: 'Sueño hipotético',
            lines: [['', 'Se [[0]] (essere) più coraggioso, [[1]] (parlare) con lei direttamente.']],
            blanks: [
              { options: ['fossi', 'sono', 'sarò', 'sia'], answer: 'fossi', explain: 'Tipo 2: Se + congiuntivo imperfetto di essere: fossi.' },
              { options: ['parlerei', 'parlo', 'avrei parlato', 'parlassi'], answer: 'parlerei', explain: 'Tipo 2: condizionale presente: parlerei.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Carta de un soñador',
        tag: 'Texto guiado',
        intro: 'Completa la carta eligiendo las formas correctas de los tres tipos de periodo ipotetico.',
        type: 'guidedText',
        scene: 'Elige la forma verbal correcta según el tipo de condicional.',
        text: 'Caro Paolo, ti scrivo da Roma. Se [[0]] (sapere) prima quanto fosse bella questa città, sarei venuto molto prima! Se [[1]] (avere) più soldi, resterei altri tre mesi. Se [[2]] (essere) possibile, vivrei qui per sempre. Ma la realtà è un\'altra: se [[3]] (non tornare) a lavoro, perdo il posto! A volte penso: se [[4]] (non studiare) giurisprudenza, cosa avrei fatto? Comunque, se [[5]] (volere) venirmi a trovare la prossima settimana, ci sono ancora posti liberi in ostello. A presto! — Luca',
        blanks: [
          { options: ['avessi saputo', 'so', 'sapessi', 'sapevo'], answer: 'avessi saputo', explain: 'Tipo 3: condición pasada imposible. "Sapere" → avessi saputo (congiuntivo trapassato).' },
          { options: ['avessi', 'ho', 'avrò', 'abbia'], answer: 'avessi', explain: 'Tipo 2: condición hipotética presente. "Avere" → avessi (congiuntivo imperfetto).' },
          { options: ['fosse', 'è', 'sarà', 'sia'], answer: 'fosse', explain: 'Tipo 2: "Se fosse possibile" → congiuntivo imperfetto di essere: fosse.' },
          { options: ['non torno', 'non tornassi', 'non tornerei', 'non sia tornato'], answer: 'non torno', explain: 'Tipo 1: consecuencia real e inminente. "Se non torno..." → presente indicativo.' },
          { options: ['non avessi studiato', 'non studio', 'non studiassi', 'non abbia studiato'], answer: 'non avessi studiato', explain: 'Tipo 3: reflexión sobre el pasado. "Non avessi studiato" → congiuntivo trapassato.' },
          { options: ['vuoi', 'vorresti', 'volessi', 'voglia'], answer: 'vuoi', explain: 'Tipo 1: invitación real. "Se vuoi venire" → presente indicativo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa los periodi ipotetici',
        tag: 'Texto libre',
        intro: 'Escribe la forma verbal correcta según el tipo de condicional indicado.',
        type: 'freeText',
        scene: 'Escribe la forma correcta. El tipo de condicional está indicado entre paréntesis.',
        text: 'Se [[0]] (avere - Tipo 2) più tempo libero, imparerei a dipingere. Se [[1]] (studiare - Tipo 3) di più all\'università, avrei trovato un lavoro migliore. Se [[2]] (fare - Tipo 1) bel tempo domani, andremo al mare. Se [[3]] (essere - Tipo 2) in te, chiederei scusa a Marco. Se [[4]] (prendere - Tipo 3) quella decisione, la mia vita sarebbe completamente diversa.',
        blanks: [
          { answer: 'avessi', accepted: ['avessi'], explain: 'Tipo 2 → congiuntivo imperfetto di avere: avessi.' },
          { answer: 'avessi studiato', accepted: ['avessi studiato'], explain: 'Tipo 3 → congiuntivo trapassato di studiare: avessi studiato.' },
          { answer: 'fa', accepted: ['fa', 'farà'], explain: 'Tipo 1 → presente indicativo (o futuro): fa / farà.' },
          { answer: 'fossi', accepted: ['fossi'], explain: 'Tipo 2 → congiuntivo imperfetto di essere: fossi.' },
          { answer: 'avessi preso', accepted: ['avessi preso'], explain: 'Tipo 3 → congiuntivo trapassato di prendere: avessi preso.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye tus condicionales',
        tag: 'Producción',
        intro: 'Escribe oraciones condicionales completas de los tipos indicados.',
        type: 'write',
        items: [
          {
            scene: 'Una hipótesis presente (Tipo 2)',
            prompt: 'Escribe lo que harías si tuvieras superposibilidades (más dinero, más tiempo, otra vida...). Tipo 2.',
            answer: 'Se fossi invisibile, entrerei nei musei senza pagare.',
            accepted: ['se fossi', 'se avessi', 'se potessi', 'farei', 'andrei', 'comprerei', 'vivrei', 'studierei'],
            explain: 'Tipo 2: Se + congiuntivo imperfetto + condizionale presente. Ejemplo: Se avessi più tempo, viaggierei ogni mese.',
          },
          {
            scene: 'Un arrepentimiento real (Tipo 3)',
            prompt: 'Escribe algo que habrías hecho diferente en el pasado. Tipo 3.',
            answer: 'Se avessi imparato l\'italiano da bambino, ora lo parlerei perfettamente.',
            accepted: ['se avessi', 'se fossi', 'avrei', 'sarei', 'avremmo', 'saremmo'],
            explain: 'Tipo 3: Se + congiuntivo trapassato + condizionale passato. Ejemplo: Se avessi studiato medicina, sarei diventato dottore.',
          },
          {
            scene: 'Una condición real (Tipo 1)',
            prompt: 'Escribe un consejo real o regla usando el Tipo 1 con "se" + presente.',
            answer: 'Se studi ogni giorno, migliorerai velocemente.',
            accepted: ['se + presente', 'se hai', 'se vuoi', 'se fai', 'studi', 'vuoi', 'hai', 'fai'],
            explain: 'Tipo 1: Se + presente indicativo + presente/futuro. Ejemplo: Se mangi meno dolci, ti sentirai meglio.',
          },
          {
            scene: 'La mezcla (Tipo misto)',
            prompt: 'Escribe una condición pasada imposible con consecuencia en el presente (tipo misto).',
            answer: 'Se avessi studiato di più, adesso saprei parlare l\'italiano meglio.',
            accepted: ['se avessi', 'se fossi', 'adesso', 'ora', 'saprei', 'potrei', 'avrei', 'sarei'],
            explain: 'Tipo misto: Se + congiuntivo trapassato + condizionale presente (consecuencia actual). Ejemplo: Se non avessi mangiato troppo ieri, oggi non mi sentirei così male.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu vida en condicional',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones condicionales de distintos tipos sobre tu vida.',
        type: 'write',
        items: [
          {
            scene: 'Un sueño (Tipo 2)',
            prompt: 'Describe algo que harías si las circunstancias fueran diferentes ahora mismo.',
            answer: 'Se non avessi questo lavoro, viaggerei per un anno intero.',
            accepted: ['se fossi', 'se avessi', 'se potessi', 'farei', 'andrei', 'vivrei', 'studierei', 'comprerei'],
            explain: 'Tipo 2: Se + congiuntivo imperfetto + condizionale presente. Ej.: Se abitassi in Italia, parlerei italiano tutti i giorni.',
          },
          {
            scene: 'Un arrepentimiento (Tipo 3)',
            prompt: 'Reflexiona sobre algo que podrías haber hecho diferente en tu pasado.',
            answer: 'Se avessi viaggiato di più da giovane, avrei aperto la mente prima.',
            accepted: ['se avessi', 'se fossi', 'avrei', 'sarei', 'non avrei', 'non sarei'],
            explain: 'Tipo 3: Se + congiuntivo trapassato + condizionale passato. Ej.: Se avessi scelto un\'altra città, la mia vita sarebbe diversa.',
          },
          {
            scene: 'Una condición real (Tipo 1)',
            prompt: 'Escribe un plan real para el futuro próximo usando el Tipo 1.',
            answer: 'Se finirò presto il lavoro oggi, uscirò a fare una passeggiata.',
            accepted: ['se ho', 'se finisco', 'se finirò', 'se posso', 'se potrò', 'uscirò', 'andrò', 'verrò', 'farò'],
            explain: 'Tipo 1: Se + presente/futuro indicativo + futuro/presente. Ej.: Se ho tempo stasera, chiamo la mia famiglia.',
          },
        ],
      },
    ],
  },
}

export default topic
