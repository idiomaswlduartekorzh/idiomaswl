import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'konjunktiv-ii-wurden-a2',
  order: '05',
  color: '#c9a900',
  category: 'Verben',
  level: 'A2',
  title: 'Der Konjunktiv II: würde + Infinitiv — Alemán A2',
  shortTitle: 'Konjunktiv II (würde)',
  metaTitle: 'Konjunktivo II con würde — Alemán A2: Hipotético y Cortés',
  description:
    'El Konjunktiv II se usa en alemán para hacer peticiones corteses, expresar situaciones hipotéticas y dar sugerencias. La forma más común es würde + Infinitivo. Algunos verbos frecuentes tienen formas propias: wäre, hätte, könnte, müsste.',
  lead: 'Würde ich gern... — el modo de la cortesía y la hipótesis en alemán.',
  outcomes: [
    'Conjugar würde (würde/würdest/würde/würden/würdet/würden)',
    'Hacer peticiones corteses con Würden Sie...? o Würdest du...?',
    'Usar wäre, hätte, könnte, müsste, dürfte como formas propias del Konjunktiv II',
    'Expresar situaciones hipotéticas con wenn + Konjunktiv II',
  ],

  guide: {
    goal: 'Usar würde + Infinitiv para peticiones corteses, hipótesis y sugerencias.',
    model: 'Ich würde gern ein Zimmer reservieren. / Würden Sie mir helfen? / Das wäre schön.',
    formula: 'Sujeto + würde (conjugado) + ... + Infinitiv',
    decisions: [
      'würde funciona como auxiliar: würde/würdest/würde/würden/würdet/würden + Infinitivo al final',
      'Petición formal: Würden Sie mir bitte ... zeigen? / Würden Sie das wiederholen?',
      'Petición informal: Würdest du mir helfen? / Ich würde gern...',
      'Formas sin würde (propias): wäre (sein) / hätte (haben) / könnte (können) / müsste (müssen) / dürfte (dürfen) / sollte (sollen)',
      'Hipótesis con wenn: Wenn ich Geld hätte, würde ich reisen. (Si tuviera dinero, viajaría)',
      '"Ich würde gern + Infinitiv" = me gustaría + Infinitivo: Ich würde gern Deutsch lernen.',
    ],
    table: [
      ['Persona', 'würde', 'Ejemplo'],
      ['ich', 'würde', 'Ich würde gern reisen'],
      ['du', 'würdest', 'Du würdest das mögen'],
      ['er/sie/es', 'würde', 'Er würde kommen'],
      ['wir', 'würden', 'Wir würden helfen'],
      ['ihr', 'würdet', 'Ihr würdet staunen'],
      ['sie/Sie', 'würden', 'Sie würden es tun'],
    ],
    mistakes: [
      'Usar "würde" con sein/haben: INCORRECTO "Ich würde sein müde" → CORRECTO "Ich wäre müde"',
      'Olvidar el Infinitivo al final: INCORRECTO "Ich würde gern" (sin Inf.) → CORRECTO "Ich würde gern schlafen"',
      'Confundir Präteritum "sollte" con Konjunktiv II "sollte": el contexto lo aclara (hipótesis → Konj. II)',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa el Konjunktiv II en alemán?',
      paragraphs: [
        'El Konjunktiv II (subjuntivo II) tiene tres usos principales en A2. Primero, peticiones corteses: "Würden Sie mir bitte helfen?" (¿Me ayudaría usted, por favor?) es mucho más amable que el imperativo. Segundo, deseos y preferencias: "Ich würde gern nach Japan reisen" (Me gustaría ir a Japón). Tercero, situaciones hipotéticas: "Wenn ich Zeit hätte, würde ich mehr lesen" (Si tuviera tiempo, leería más).',
        'En el registro formal alemán, el Konjunktiv II es imprescindible. En hoteles, tiendas, oficinas y situaciones de servicio al cliente, usar "würde" eleva inmediatamente el nivel de cortesía.',
      ],
    },
    {
      heading: '¿Qué verbos tienen forma propia de Konjunktiv II sin würde?',
      paragraphs: [
        'Varios verbos muy frecuentes tienen su propia forma en Konjunktiv II y no necesitan würde: sein → wäre, haben → hätte, können → könnte, müssen → müsste, dürfen → dürfte, sollen → sollte, mögen → möchte. La forma "möchte" (quisiera) es especialmente importante en A2 para pedir cosas en una tienda o restaurante.',
        '"Das wäre super!" (¡Eso sería genial!), "Ich hätte gern einen Kaffee" (Quisiera un café), "Könnten Sie langsamer sprechen?" (¿Podría hablar más despacio?) — estas frases son esenciales en la comunicación cotidiana alemana.',
      ],
    },
    {
      heading: '¿Cómo se forman las oraciones condicionales con Konjunktiv II?',
      paragraphs: [
        'Las oraciones condicionales hipotéticas usan Konjunktiv II en ambas cláusulas: "Wenn ich mehr Zeit hätte, würde ich mehr Sport machen" (Si tuviera más tiempo, haría más deporte). La cláusula con "wenn" tiene el verbo al final.',
        'Este patrón es diferente de las condiciones reales (Indikativ): "Wenn ich Zeit habe, gehe ich spazieren" (Si tengo tiempo, voy a pasear). La diferencia entre Indikativ y Konjunktiv II marca la diferencia entre "una condición posible" y "una hipótesis irreal".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Konjunktiv II: würde + Infinitiv para cortesía e hipótesis; wäre/hätte/könnte sin würde.',
    graphicPrompt: 'Bocadillo de conversación formal con "würden Sie...?" y nube de hipótesis con "wenn...würde".',
    scene: [
      ['Ich würde gern reisen', 'Me gustaría viajar'],
      ['Würden Sie mir helfen?', '¿Me ayudaría usted?'],
      ['Das wäre super!', '¡Eso sería genial!'],
      ['Ich hätte gern einen Kaffee', 'Quisiera un café'],
      ['Könnten Sie langsamer sprechen?', '¿Podría hablar más despacio?'],
      ['Wenn ich Zeit hätte, würde ich lesen', 'Si tuviera tiempo, leería'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['würde + Infinitiv', 'wäre/hätte/könnte', 'Wenn + Konjunktiv II'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennung',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del Konjunktiv II.',
        type: 'choice',
        items: [
          {
            scene: 'En el hotel',
            lines: [['', '___ Sie mir bitte Ihr Passwort zeigen?']],
            options: ['Würden', 'Wurden', 'Würdest', 'Werden'],
            answer: 'Würden',
            explain: '"Würden Sie...?" es la forma formal (Sie) de Konjunktiv II para peticiones corteses.',
          },
          {
            scene: 'Expresando un deseo',
            lines: [['', 'Ich ___ gern nach Japan reisen.']],
            options: ['würde', 'wurde', 'werden', 'werde'],
            answer: 'würde',
            explain: '"Ich würde gern..." = me gustaría... (ich + würde).',
          },
          {
            scene: 'Hablando de alguien',
            lines: [['', 'Das ___ sehr praktisch. (sein)']],
            options: ['wäre', 'würde', 'ist', 'sei'],
            answer: 'wäre',
            explain: '"sein" en Konjunktiv II → wäre (no se usa würde sein).',
          },
          {
            scene: 'Pidiendo en un restaurante',
            lines: [['', 'Ich ___ gern ein Steak bestellen.']],
            options: ['hätte', 'würde', 'wäre', 'habe'],
            answer: 'hätte',
            explain: '"Ich hätte gern..." (quisiera...) es la forma cortés con haben en Konjunktiv II.',
          },
          {
            scene: 'Petición a un amigo',
            lines: [['', '___ du mir kurz helfen?']],
            options: ['Würdest', 'Würden', 'Wärst', 'Hättest'],
            answer: 'Würdest',
            explain: '"Würdest du...?" es la petición informal (du) en Konjunktiv II.',
          },
          {
            scene: 'Hipótesis sobre dinero',
            lines: [['', 'Wenn ich mehr Geld ___, würde ich ein Haus kaufen. (haben)']],
            options: ['hätte', 'habe', 'hatte', 'hat'],
            answer: 'hätte',
            explain: '"haben" en Konjunktiv II → hätte. Oraciones condicionales: wenn + Konj. II.',
          },
          {
            scene: 'Preguntando si puede',
            lines: [['', '___ du mir die Tür aufmachen?']],
            options: ['Könntest', 'Könnten', 'Kann', 'Kannst'],
            answer: 'Könntest',
            explain: '"können" en Konjunktiv II → könntest (du). Petición cortés.',
          },
          {
            scene: 'Sugerencia para todos',
            lines: [['', 'Wir ___ morgen ins Kino gehen.']],
            options: ['könnten', 'können', 'konnten', 'würden können'],
            answer: 'könnten',
            explain: '"könnten" = podríamos (sugerencia). wir + können Konj. II → könnten.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Doppelergänzung',
        tag: '2 espacios',
        intro: 'Completa las peticiones o hipótesis con dos formas del Konjunktiv II.',
        type: 'dual',
        items: [
          {
            scene: 'En la tienda',
            lines: [['', 'Ich [[0]] gern dieses Hemd anprobieren. [[1]] Sie mir die Umkleidekabine zeigen?']],
            blanks: [
              { options: ['würde', 'wurde', 'wäre', 'hätte'], answer: 'würde', explain: '"Ich würde gern..." = me gustaría. ich + würde.' },
              { options: ['Würden', 'Wurden', 'Könnten', 'Wären'], answer: 'Würden', explain: '"Würden Sie...?" petición formal. Sie + würden.' },
            ],
          },
          {
            scene: 'Hipótesis de vacaciones',
            lines: [['', 'Wenn ich Urlaub [[0]], [[1]] ich nach Mexiko fliegen. (haben, würde)']],
            blanks: [
              { options: ['hätte', 'habe', 'hatte', 'hat'], answer: 'hätte', explain: '"haben" Konj. II → hätte. Konditionalsatz con "wenn".' },
              { options: ['würde', 'würdest', 'werden', 'wäre'], answer: 'würde', explain: 'Hauptsatz: ich + würde + Infinitiv al final.' },
            ],
          },
          {
            scene: 'Sugerencia a un amigo',
            lines: [['', 'Du [[0]] mal früher aufstehen. Das [[1]] besser für dich. (sollen, sein)']],
            blanks: [
              { options: ['solltest', 'sollst', 'sollte', 'solltest'], answer: 'solltest', explain: '"sollen" Konj. II → solltest (du). Recomendación cortés.' },
              { options: ['wäre', 'würde', 'ist', 'sei'], answer: 'wäre', explain: '"sein" Konj. II → wäre. No se usa "würde sein".' },
            ],
          },
          {
            scene: 'En el restaurante',
            lines: [['', 'Ich [[0]] gern die Suppe und danach [[1]] ich den Salat probieren.']],
            blanks: [
              { options: ['hätte', 'würde', 'wäre', 'möchte'], answer: 'hätte', explain: '"Ich hätte gern..." = quisiera. Típico al pedir en restaurante.' },
              { options: ['würde', 'wäre', 'hätte', 'könnte'], answer: 'würde', explain: '"Ich würde gern... probieren" = me gustaría probar.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Lückentext',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo en un hotel con formas del Konjunktiv II.',
        type: 'guidedText',
        scene: 'Reservando una habitación en recepción de hotel.',
        text: 'Gast: Guten Tag! Ich [[0]] gern ein Zimmer reservieren. [[1]] Sie mir zeigen, was frei ist? Rezeption: Natürlich. [[2]] Sie ein Einzelzimmer oder ein Doppelzimmer? Gast: Ich [[3]] gern ein Doppelzimmer. [[4]] das Zimmer einen Balkon haben? Das [[5]] perfekt. Rezeption: Ja, wir [[6]] Ihnen Zimmer 14 anbieten.',
        blanks: [
          { options: ['würde', 'wurde', 'wäre', 'habe'], answer: 'würde', explain: '"Ich würde gern..." ich + würde.' },
          { options: ['Würden', 'Wurden', 'Können', 'Wären'], answer: 'Würden', explain: 'Petición formal: "Würden Sie...?" Sie + würden.' },
          { options: ['Hätten', 'Wären', 'Würden', 'Können'], answer: 'Hätten', explain: '"Hätten Sie...?" = ¿Tendría usted...? (haben Konj. II, formal).' },
          { options: ['hätte', 'würde', 'habe', 'wäre'], answer: 'hätte', explain: '"Ich hätte gern..." = quisiera. (haben Konj. II).' },
          { options: ['Könnte', 'Würde', 'Kann', 'Wäre'], answer: 'Könnte', explain: '"Könnte das Zimmer...?" = ¿Podría la habitación...? (können Konj. II).' },
          { options: ['wäre', 'würde', 'ist', 'sei'], answer: 'wäre', explain: '"Das wäre..." = Eso sería. (sein Konj. II → wäre).' },
          { options: ['könnten', 'können', 'würden', 'konnten'], answer: 'könnten', explain: '"Wir könnten..." = podríamos (können Konj. II, wir).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Freier Text',
        tag: 'Texto libre',
        intro: 'Completa libremente con la forma correcta del Konjunktiv II.',
        type: 'freeText',
        scene: 'Sara describe sus sueños con condicionales.',
        text: 'Wenn ich reich [[0]], [[1]] ich eine große Reise machen. Ich [[2]] gern nach Australien fliegen. Das [[3]] fantastisch. Mein Partner [[4]] auch sehr glücklich sein.',
        blanks: [
          { answer: 'wäre', accepted: ['wäre'], explain: '"reich sein" Konj. II: ich + sein → wäre.' },
          { answer: 'würde', accepted: ['würde'], explain: 'Hauptsatz: ich + würde + Infinitiv.' },
          { answer: 'würde', accepted: ['würde'], explain: '"Ich würde gern..." ich + würde.' },
          { answer: 'wäre', accepted: ['wäre'], explain: '"Das wäre..." sein Konj. II → wäre.' },
          { answer: 'wäre', accepted: ['würde', 'wäre'], explain: '"wäre" (sein Konj. II) o "würde ... sein" (aunque wäre es más natural).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Produktion',
        tag: 'Escritura guiada',
        intro: 'Escribe peticiones corteses e hipótesis con Konjunktiv II.',
        type: 'write',
        items: [
          {
            scene: 'En una tienda',
            prompt: 'Haz una petición formal usando "Würden Sie...?" para pedir ayuda en una tienda.',
            answer: 'Würden Sie mir bitte zeigen, wo die Umkleidekabine ist?',
            accepted: ['Würden Sie', 'Könnten Sie', 'Würden Sie mir'],
            explain: '"Würden Sie...?" = ¿Podría usted...? Petición formal muy cortés.',
          },
          {
            scene: 'Un deseo personal',
            prompt: 'Di dos cosas que te gustaría hacer usando "Ich würde gern...".',
            answer: 'Ich würde gern Deutsch perfekt sprechen und nach Deutschland reisen.',
            accepted: ['Ich würde gern', 'würde gern'],
            explain: '"Ich würde gern + Infinitiv" = me gustaría + infinitivo.',
          },
          {
            scene: 'Una hipótesis',
            prompt: 'Completa: "Wenn ich mehr Zeit hätte, würde ich..."',
            answer: 'Wenn ich mehr Zeit hätte, würde ich jeden Tag Sport machen.',
            accepted: ['wenn ich', 'hätte', 'würde ich'],
            explain: 'Konditionalsatz: wenn + Konj. II (hätte), Hauptsatz: würde + Infinitiv.',
          },
          {
            scene: 'Sugerencia a un amigo',
            prompt: 'Da una sugerencia a un amigo usando "Du könntest..." o "Du solltest...".',
            answer: 'Du könntest mehr schlafen — das wäre besser für dich.',
            accepted: ['könntest', 'solltest', 'würdest'],
            explain: '"könntest/solltest" = podrías/deberías. Konjunktiv II para sugerencias.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Kommunikation',
        tag: 'Texto libre',
        intro: 'Escribe un diálogo o un párrafo usando el Konjunktiv II.',
        type: 'write',
        items: [
          {
            scene: 'En un restaurante',
            prompt: 'Escribe un mini-diálogo pidiendo comida y bebida cortésmente (hätte gern, würde gern).',
            answer: 'Gast: Ich hätte gern die Tomatensuppe und danach würde ich gern das Steak probieren. Kellner: Natürlich! Würden Sie auch etwas trinken?',
            accepted: ['hätte gern', 'würde gern', 'Würden Sie'],
            explain: '"Ich hätte gern..." (quisiera) y "Ich würde gern..." (me gustaría) para pedir. "Würden Sie...?" para el camarero.',
          },
          {
            scene: 'Tu vida ideal',
            prompt: 'Describe cómo sería tu vida ideal usando wäre, hätte y würde.',
            answer: 'Wenn ich reich wäre, hätte ich ein großes Haus am Meer. Ich würde jeden Tag reisen und neue Kulturen kennenlernen.',
            accepted: ['wäre', 'hätte', 'würde'],
            explain: 'Combina wäre (sein Konj. II), hätte (haben Konj. II), würde + Infinitiv para hipótesis.',
          },
          {
            scene: 'Consejo a alguien',
            prompt: 'Da tres consejos a alguien que quiere aprender alemán usando Konjunktiv II.',
            answer: 'Du solltest jeden Tag üben. Du könntest deutsche Filme schauen. Es wäre auch toll, einen Kurs zu machen.',
            accepted: ['solltest', 'könntest', 'wäre'],
            explain: '"solltest" (deberías), "könntest" (podrías), "wäre" (sería) — Konjunktiv II para consejos.',
          },
        ],
      },
    ],
  },
}

export default topic
