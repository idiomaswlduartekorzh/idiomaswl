import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'konjunktionen-a2',
  order: '11',
  color: '#c9a900',
  category: 'Satzstruktur',
  level: 'A2',
  title: 'Konjunktionen: weil, obwohl, als, wenn, bevor, nachdem',
  shortTitle: 'Konjunktionen',
  metaTitle: 'Conjunciones subordinantes en alemán A2 — weil, obwohl, als, wenn',
  description:
    'Las conjunciones subordinantes conectan dos oraciones y envían el verbo conjugado al final de la cláusula subordinada. Las más importantes en A2 son: weil (porque), obwohl (aunque), als (cuando — pasado), wenn (cuando/si), bevor (antes de que), nachdem (después de que).',
  lead: 'Conectores que mandan el verbo al final: weil, obwohl, als, wenn, bevor, nachdem.',
  outcomes: [
    'Colocar el verbo conjugado al final de la cláusula con weil, obwohl, als, wenn, bevor, nachdem',
    'Distinguir "als" (momento pasado único) de "wenn" (presente/futuro/pasado repetido)',
    'Usar weil para dar razones y obwohl para expresar contraste',
    'Reconocer el orden de las oraciones principales y subordinadas',
  ],

  guide: {
    goal: 'Construir oraciones subordinadas con verbo al final usando las conjunciones clave del A2.',
    model: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten möchte. / Als ich Kind war, wohnte ich in Madrid.',
    formula: 'Hauptsatz + Konnektor + ... + Verb (final) / Konnektor + ... + Verb (final) , + Hauptsatz',
    decisions: [
      'Todas estas conjunciones envían el verbo conjugado al FINAL de la cláusula subordinada',
      'weil (porque) = causal: Ich bin müde, weil ich nicht geschlafen habe.',
      'obwohl (aunque) = concesivo: Er läuft, obwohl es regnet.',
      'als (cuando) = evento único en el pasado: Als ich jung war, lebte ich in Spanien.',
      'wenn (cuando/si) = presente, futuro o acción repetida en el pasado: Wenn ich Zeit habe, lese ich.',
      'bevor (antes de que) = orden temporal anterior: Ich dusche mich, bevor ich frühstücke.',
      'nachdem (después de que) = orden temporal posterior: Nachdem ich gegessen habe, gehe ich schlafen.',
    ],
    table: [
      ['Konjunktion', 'Bedeutung', 'Verbposition'],
      ['weil', 'porque (causa)', 'final'],
      ['obwohl', 'aunque (concesión)', 'final'],
      ['als', 'cuando (pasado único)', 'final'],
      ['wenn', 'cuando/si (presente o repetido)', 'final'],
      ['bevor', 'antes de que', 'final'],
      ['nachdem', 'después de que', 'final'],
    ],
    mistakes: [
      'No enviar el verbo al final: INCORRECTO "Ich lerne Deutsch, weil ich möchte arbeiten" → CORRECTO "weil ich arbeiten möchte"',
      'Confundir als y wenn: INCORRECTO "Wenn ich Kind war" (evento pasado único) → CORRECTO "Als ich Kind war"',
      'Olvidar la coma entre las dos cláusulas: INCORRECTO "Ich schlafe nicht weil ich lerne" → CORRECTO "Ich schlafe nicht, weil ich lerne"',
    ],
  },

  seo: [
    {
      heading: '¿Por qué el verbo va al final en las subordinadas alemanas?',
      paragraphs: [
        'En alemán, las conjunciones subordinantes como weil, obwohl, als, wenn, bevor y nachdem introducen una cláusula donde el verbo conjugado va obligatoriamente al final. Esto es una de las reglas más importantes del alemán y se aplica sin excepciones: "Ich bin müde, weil ich nicht geschlafen habe" (habe va al último lugar).',
        'Cuando la oración subordinada va primero (antes de la principal), la oración principal invierte su orden: "Weil es regnet, bleibe ich zu Hause." La conjunción + cláusula subordinada + coma, luego el verbo de la principal en posición 1.',
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre als y wenn en alemán?',
      paragraphs: [
        '"Als" se usa para hablar de un evento o período único en el pasado: "Als ich in Berlin war, habe ich viel gesehen." "Wenn" se usa para el presente, el futuro y para acciones habituales o repetidas en el pasado: "Wenn ich frei habe, gehe ich schwimmen." (presente) / "Wenn ich jung war, spielte ich oft Fußball." (pasado repetido).',
      ],
    },
    {
      heading: '¿Cómo se usa obwohl en alemán?',
      paragraphs: [
        '"Obwohl" introduce una idea que contradice o sorprende dado el contexto de la oración principal: "Er ist glücklich, obwohl er kein Geld hat." (Es feliz aunque no tiene dinero.) Esta estructura es equivalente al "aunque" español y permite matizar afirmaciones de manera sofisticada.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Konjunktionen: verbo al final de la subordinada. Als=pasado único, wenn=presente/repetido.',
    graphicPrompt: 'Dos bloques de oración conectados por flecha, con verbo marcado al final de la subordinada.',
    scene: [
      ['Ich lerne Deutsch, weil ich es brauche', 'Aprendo alemán porque lo necesito'],
      ['Er kommt, obwohl er müde ist', 'Viene aunque está cansado'],
      ['Als ich jung war, wohnte ich in Berlin', 'Cuando era joven vivía en Berlín'],
      ['Wenn es regnet, bleibe ich zu Hause', 'Cuando llueve me quedo en casa'],
      ['Ich putze die Zähne, bevor ich schlafe', 'Me lavo los dientes antes de dormir'],
      ['Nachdem ich gegessen habe, gehe ich raus', 'Después de comer salgo'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['verbo al final', 'als vs wenn', 'weil/obwohl/bevor/nachdem'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la conjunción correcta según el significado.',
        type: 'choice',
        items: [
          {
            scene: 'Dando una razón',
            lines: [['', 'Ich gehe früh schlafen, ___ ich morgen früh aufstehen muss.']],
            options: ['weil', 'obwohl', 'als', 'wenn'],
            answer: 'weil',
            explain: 'Se da una razón → weil (porque). Verbo al final: aufstehen muss.',
          },
          {
            scene: 'Expresando contraste',
            lines: [['', 'Sie lernt Japanisch, ___ es sehr schwer ist.']],
            options: ['obwohl', 'weil', 'als', 'bevor'],
            answer: 'obwohl',
            explain: 'Contraste inesperado → obwohl (aunque). Verbo al final: schwer ist.',
          },
          {
            scene: 'Evento pasado único',
            lines: [['', '___ ich klein war, lebte ich in München.']],
            options: ['Als', 'Wenn', 'Weil', 'Bevor'],
            answer: 'Als',
            explain: 'Período único en el pasado → als. "Als ich klein war" — evento que ocurrió una sola vez.',
          },
          {
            scene: 'Acción habitual en presente',
            lines: [['', '___ ich Stress habe, höre ich Musik.']],
            options: ['Wenn', 'Als', 'Weil', 'Nachdem'],
            answer: 'Wenn',
            explain: 'Acción habitual en presente → wenn (cuando). "Wenn ich Stress habe" — situación repetida.',
          },
          {
            scene: 'Orden temporal: primero A, luego B',
            lines: [['', 'Ich wasche mir die Hände, ___ ich esse.']],
            options: ['bevor', 'nachdem', 'weil', 'obwohl'],
            answer: 'bevor',
            explain: '"antes de comer" → bevor. Acción que ocurre primero: lavarse las manos.',
          },
          {
            scene: 'Orden temporal: B después de A',
            lines: [['', '___ ich geduscht habe, ziehe ich mich an.']],
            options: ['Nachdem', 'Bevor', 'Als', 'Weil'],
            answer: 'Nachdem',
            explain: '"después de ducharme" → nachdem. La acción principal ocurre después de la subordinada.',
          },
          {
            scene: 'Condición futura',
            lines: [['', '___ ich Zeit habe, besuche ich dich.']],
            options: ['Wenn', 'Als', 'Weil', 'Obwohl'],
            answer: 'Wenn',
            explain: 'Condición futura → wenn (si/cuando). "Wenn ich Zeit habe" — condición en el futuro.',
          },
          {
            scene: 'Razón para quedarse en casa',
            lines: [['', 'Er bleibt zu Hause, ___ er krank ist.']],
            options: ['weil', 'obwohl', 'als', 'bevor'],
            answer: 'weil',
            explain: 'Razón lógica → weil (porque). El estar enfermo causa quedarse en casa.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa la conjunción y la posición correcta del verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Dando una razón para aprender',
            lines: [['', 'Ich lerne Deutsch, [[0]] ich in Wien arbeiten [[1]].']],
            blanks: [
              { options: ['weil', 'obwohl', 'wenn', 'als'], answer: 'weil', explain: 'Se da una razón → weil.' },
              { options: ['möchte', 'möchten', 'möchtest', 'möcht'], answer: 'möchte', explain: 'Verbo modal al final: ich möchte → möchte al final.' },
            ],
          },
          {
            scene: 'Hablando de la infancia',
            lines: [['', '[[0]] ich Kind war, [[1]] ich sehr gern Fußball.']],
            blanks: [
              { options: ['Als', 'Wenn', 'Weil', 'Nachdem'], answer: 'Als', explain: 'Período único pasado → Als.' },
              { options: ['spielte', 'spiele', 'spielen', 'spielst'], answer: 'spielte', explain: 'Oración principal tras Als-Satz: verbo en posición 1 — spielte ich.' },
            ],
          },
          {
            scene: 'Aunque hace frío',
            lines: [['', 'Sie geht spazieren, [[0]] es sehr kalt [[1]].']],
            blanks: [
              { options: ['obwohl', 'weil', 'wenn', 'als'], answer: 'obwohl', explain: 'Contraste inesperado → obwohl.' },
              { options: ['ist', 'sind', 'bin', 'bist'], answer: 'ist', explain: 'Verbo al final de la subordinada: es ist → ist al final.' },
            ],
          },
          {
            scene: 'Antes de salir',
            lines: [['', 'Ich überprüfe alles, [[0]] ich das Haus [[1]].']],
            blanks: [
              { options: ['bevor', 'nachdem', 'weil', 'als'], answer: 'bevor', explain: '"antes de salir" → bevor.' },
              { options: ['verlasse', 'verlassen', 'verlässt', 'verlass'], answer: 'verlasse', explain: 'Verbo al final de la subordinada: ich verlasse → verlasse al final.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el texto con las conjunciones correctas.',
        type: 'guidedText',
        scene: 'Paula cuenta su rutina y sus razones.',
        text: 'Ich stehe früh auf, [[0]] ich weit entfernt arbeite. [[1]] ich aufstehe, dusche ich mich zuerst. Ich trinke Kaffee, [[2]] ich nicht so müde bin. [[3]] ich jung war, mochte ich keinen Kaffee. Jetzt trinke ich ihn jeden Morgen, [[4]] er mir Energie gibt.',
        blanks: [
          { options: ['weil', 'obwohl', 'wenn', 'als'], answer: 'weil', explain: 'Razón para levantarse temprano → weil (porque).' },
          { options: ['Bevor', 'Nachdem', 'Weil', 'Als'], answer: 'Bevor', explain: 'Ducharse antes de salir → Bevor (antes de que).' },
          { options: ['obwohl', 'weil', 'als', 'wenn'], answer: 'obwohl', explain: 'Contraste: sigue cansada a pesar del café → obwohl (aunque).' },
          { options: ['Als', 'Wenn', 'Weil', 'Bevor'], answer: 'Als', explain: 'Período único pasado (la infancia) → Als (cuando).' },
          { options: ['weil', 'obwohl', 'als', 'bevor'], answer: 'weil', explain: 'Razón para tomarlo → weil (porque le da energía).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Escribe la conjunción correcta sin opciones.',
        type: 'freeText',
        scene: 'Tom habla sobre sus hábitos y su pasado.',
        text: 'Ich lese jeden Abend, [[0]] es mir hilft, besser zu schlafen. [[1]] ich ein Kind war, las ich nur Comics. Jetzt lese ich Romane, [[2]] ich Comics zu einfach finde. Ich mache Sport, [[3]] das Wetter gut ist. [[4]] ich Sport gemacht habe, esse ich zu Abend.',
        blanks: [
          { answer: 'weil', accepted: ['weil'], explain: 'Razón para leer → weil (porque).' },
          { answer: 'Als', accepted: ['als', 'Als'], explain: 'Infancia = período pasado único → Als.' },
          { answer: 'obwohl', accepted: ['obwohl'], explain: 'Contraste (sigue leyendo aunque los comics sean fáciles — aquí: porque los encuentra demasiado fáciles, así que usa weil). Contexto: deja los comics porque son fáciles → weil.' },
          { answer: 'wenn', accepted: ['wenn'], explain: 'Condición repetida en presente → wenn (cuando/si).' },
          { answer: 'Nachdem', accepted: ['nachdem', 'Nachdem'], explain: 'Después de hacer deporte → nachdem.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones subordinadas usando las conjunciones indicadas.',
        type: 'write',
        items: [
          {
            scene: 'Tu razón para aprender alemán',
            prompt: 'Di por qué aprendes alemán (usa "weil" con verbo al final).',
            answer: 'Ich lerne Deutsch, weil ich in Deutschland leben möchte.',
            accepted: ['weil ich', 'weil es', 'weil das'],
            explain: 'weil + subordinada con verbo al final: Ich lerne Deutsch, weil ich ... möchte.',
          },
          {
            scene: 'Una acción habitual bajo cierta condición',
            prompt: 'Di qué haces cuando tienes tiempo libre (usa "wenn").',
            answer: 'Wenn ich Zeit habe, gehe ich ins Kino.',
            accepted: ['Wenn ich Zeit', 'Wenn es schön', 'Wenn ich frei'],
            explain: 'wenn + subordinada (verbo al final) → coma → oración principal con verbo en posición 1.',
          },
          {
            scene: 'Algo que haces a pesar de',
            prompt: 'Di algo que haces aunque hay un obstáculo (usa "obwohl").',
            answer: 'Ich lerne Deutsch, obwohl es schwer ist.',
            accepted: ['obwohl es', 'obwohl ich', 'obwohl das'],
            explain: 'obwohl introduce el obstáculo. Verbo al final: schwer ist.',
          },
          {
            scene: 'Recuerdos de infancia',
            prompt: 'Habla de algo que hacías cuando eras niño/a (usa "als").',
            answer: 'Als ich klein war, spielte ich jeden Tag Fußball.',
            accepted: ['Als ich klein', 'Als ich jung', 'Als ich Kind'],
            explain: 'Als = período único en el pasado. Verbo al final de la als-subordinada.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Usa varias conjunciones para construir un texto coherente.',
        type: 'write',
        items: [
          {
            scene: 'Tu rutina matutina',
            prompt: 'Describe tu rutina de la mañana usando bevor, nachdem y wenn.',
            answer: 'Bevor ich zur Arbeit gehe, dusche ich mich. Nachdem ich geduscht habe, frühstücke ich. Wenn ich Zeit habe, lese ich die Nachrichten.',
            accepted: ['Bevor ich', 'Nachdem ich', 'Wenn ich', 'bevor', 'nachdem', 'wenn'],
            explain: 'bevor = antes de; nachdem = después de; wenn = cuando (habitual). Verbo al final de cada subordinada.',
          },
          {
            scene: 'Tus motivaciones',
            prompt: 'Explica 2-3 razones por las que haces algo importante para ti (usa weil).',
            answer: 'Ich lerne Deutsch, weil es mir Spaß macht. Ich mache Sport, weil ich fit bleiben möchte. Ich reise viel, weil ich neue Kulturen kennenlernen will.',
            accepted: ['weil es', 'weil ich', 'weil das', 'weil man'],
            explain: 'weil + verbo al final. Recuerda poner coma antes de weil.',
          },
          {
            scene: 'Tus recuerdos de infancia',
            prompt: 'Escribe 2-3 cosas que hacías de niño/a usando als y wenn.',
            answer: 'Als ich klein war, spielte ich immer draußen. Wenn es regnete, blieb ich zu Hause und las Comics. Als ich sechs Jahre alt war, begann ich Gitarre zu spielen.',
            accepted: ['Als ich klein', 'Als ich jung', 'Wenn es', 'Wenn ich'],
            explain: 'Als = momento o período pasado único. Wenn = acción repetida en el pasado.',
          },
        ],
      },
    ],
  },
}

export default topic
