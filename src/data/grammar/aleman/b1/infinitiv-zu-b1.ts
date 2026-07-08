import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'infinitiv-zu-b1',
  order: '05',
  color: '#c9a900',
  category: 'Verben',
  level: 'B1',
  title: 'Infinitiv mit zu en Alemán B1 — Construcciones de Infinitivo',
  shortTitle: 'Infinitiv mit zu',
  metaTitle: 'Infinitiv mit zu B1 — Construcciones de infinitivo con zu en alemán',
  description:
    'El Infinitiv mit zu en alemán corresponde al infinitivo español con preposición: "Es ist wichtig, Deutsch zu lernen." Con verbos separables, "zu" se inserta entre el prefijo y el verbo: aufzumachen, anzurufen.',
  lead: 'Aprende a construir frases con Infinitiv mit zu: verbos que lo requieren, la posición de "zu" y el uso con verbos separables.',
  outcomes: [
    'Construye frases con Infinitiv mit zu correctamente',
    'Coloca "zu" correctamente en verbos separables: aufzumachen, anzufangen',
    'Reconoce los verbos y expresiones que requieren Infinitiv mit zu',
    'Distingue cuándo usar Infinitiv mit zu vs. cuándo usar un dass-Satz',
  ],

  guide: {
    goal: 'Usar correctamente el Infinitiv mit zu para expresar propósitos, intenciones y opiniones.',
    model: 'Ich versuche, mehr Sport zu machen. / Es ist toll, Deutsch zu sprechen. / Er versucht, früh aufzustehen.',
    formula: 'Verb/Ausdruck + [Komma] + zu + Infinitiv (am Ende)',
    decisions: [
      'El "zu" va delante del Infinitiv que queda al final: "Ich versuche zu lernen."',
      'Cuando hay complementos, todo va después de la coma y "zu+Infinitiv" cierra: "Ich versuche, jeden Tag Deutsch zu lernen."',
      'Con verbos separables: "zu" se inserta entre el prefijo y el verbo — aufmachen → aufzumachen; anrufen → anzurufen.',
      'Verbos y expresiones que usan Infinitiv mit zu: versuchen, vergessen, beginnen, anfangen, planen, empfehlen, bitten, aufhören, hoffen, beschließen, es ist wichtig/möglich/schön...',
      'NO se usa zu con Modalverben ni con sehen, hören, lassen, helfen en ciertas construcciones.',
      'Si los sujetos son diferentes, se usa dass en lugar de Infinitiv mit zu: "Ich möchte, dass er kommt." (sujetos distintos).',
    ],
    table: [
      ['Tipo de verbo', 'Ejemplo infinitivo', 'Con zu'],
      ['Regular', 'lernen', 'zu lernen'],
      ['Separable', 'aufmachen', 'aufzumachen'],
      ['Separable', 'anrufen', 'anzurufen'],
      ['Separable', 'aufhören', 'aufzuhören'],
    ],
    mistakes: [
      '"Ich versuche zu lerne" ❌ → "Ich versuche zu lernen" ✓ — se usa el Infinitiv (forma base), no forma conjugada.',
      '"Ich versuche aufzumachen die Tür" ❌ → "Ich versuche, die Tür aufzumachen" ✓ — zu+Infinitiv va al FINAL.',
      '"Ich hoffe dass er kommt zu" ❌ → "Ich hoffe, dass er kommt" ✓ — con "dass" no se añade "zu".',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el Infinitiv mit zu en alemán?',
      paragraphs: [
        'El Infinitiv mit zu es una construcción en la que un Infinitiv (la forma base del verbo) va precedido de "zu". Equivale al infinitivo con "de" o "a" en español: "Es ist wichtig, täglich zu üben" = Es importante practicar a diario. El "zu" siempre aparece justo antes del infinitivo al final de la frase.',
        'Esta construcción es obligatoria con ciertos verbos y expresiones: versuchen (intentar), vergessen (olvidar), beginnen/anfangen (empezar), aufhören (dejar de), planen (planear), empfehlen (recomendar), hoffen (esperar/tener esperanza), beschließen (decidir).',
      ],
    },
    {
      heading: 'Posición de zu con verbos separables',
      paragraphs: [
        'Con verbos separables (los que tienen un prefijo que se separa), el "zu" se inserta entre el prefijo y el verbo principal, formando una sola palabra: auf-zu-machen → aufzumachen; an-zu-rufen → anzurufen; auf-zu-hören → aufzuhören.',
        'Otros ejemplos: vor-zu-bereiten (vorbereitEN → vorzubereiten), mit-zu-nehmen (mitnehmen → mitzunehmen), ab-zu-fahren (abfahren → abzufahren). La regla es siempre: prefijo + zu + Verbstamm.',
      ],
    },
    {
      heading: 'Verbos y expresiones que requieren Infinitiv mit zu',
      paragraphs: [
        'Algunos verbos siempre van seguidos de Infinitiv mit zu: versuchen, vergessen, beginnen, anfangen, aufhören, planen, empfehlen, bitten (pedir), beschließen, erlauben, verbieten, versprechen (prometer), hoffen.',
        'También muchas expresiones con "es ist...": "Es ist wichtig, pünktlich zu sein." / "Es ist schön, Freunde zu haben." / "Es ist schwer, eine neue Sprache zu lernen." Y estructuras con sustantivos abstractos: "Ich habe keine Lust, aufzuräumen" / "Ich habe keine Zeit, das zu machen."',
      ],
    },
    {
      heading: 'Cuándo usar dass en lugar de Infinitiv mit zu',
      paragraphs: [
        'Si las dos oraciones tienen el mismo sujeto, se puede usar Infinitiv mit zu: "Ich versuche [ich] zu kommen" → "Ich versuche zu kommen." Si los sujetos son diferentes, se usa un dass-Satz: "Ich möchte, dass du kommst." (yo quiero, que tú vengas — sujetos distintos).',
        'Algunos verbos admiten ambas construcciones: "Ich glaube zu wissen, was passiert ist." / "Ich glaube, dass ich weiß, was passiert ist." En el habla cotidiana el dass-Satz es a veces preferido por claridad.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Infinitiv mit zu B1: posición de zu, verbos separables con zu intercalado, diferencia con dass-Satz.',
    graphicPrompt: 'Escalera de infinitivos: cada peldaño muestra un verbo + zu + Infinitiv al final de la oración.',
    scene: [
      ['Ich versuche, jeden Tag zu joggen.', 'Intento salir a correr todos los días.'],
      ['Es ist wichtig, pünktlich zu sein.', 'Es importante ser puntual.'],
      ['Sie hat vergessen, die Tür abzuschließen.', 'Ella olvidó cerrar la puerta con llave.'],
      ['Wir planen, nächsten Sommer zu verreisen.', 'Planeamos viajar el próximo verano.'],
      ['Er beginnt, Spanisch zu lernen.', 'Él empieza a aprender español.'],
      ['Ich habe keine Lust, heute aufzuräumen.', 'No tengo ganas de ordenar hoy.'],
      ['Sie empfiehlt, früh anzufangen.', 'Ella recomienda empezar temprano.'],
      ['Es ist schön, Freunde zu haben.', 'Es bonito tener amigos.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['versuchen', 'vergessen', 'beginnen', 'anfangen', 'aufhören', 'planen', 'empfehlen', 'hoffen'],
    reviewFocus: ['zu + Infinitiv am Ende', 'zu bei Trennverben: auf-zu-machen', 'gleicher Subjekt → Inf. mit zu'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma con zu correcta',
        tag: 'Opción múltiple',
        intro: 'Selecciona la construcción con Infinitiv mit zu correctamente formada.',
        type: 'choice',
        items: [
          {
            scene: 'Un propósito',
            lines: [['', 'Ich versuche, jeden Tag Deutsch ___.']],
            options: ['zu lernen', 'zu lerne', 'lernen zu', 'zu gelern'],
            answer: 'zu lernen',
            explain: '"zu" va delante del Infinitiv (forma base): zu lernen. Siempre al final.',
          },
          {
            scene: 'Verbo separable',
            lines: [['', 'Sie hat vergessen, die Tür ___.']],
            options: ['aufzumachen', 'zu aufmachen', 'aufmachen zu', 'aufgemacht zu'],
            answer: 'aufzumachen',
            explain: 'Verbo separable: prefijo + zu + Verbstamm → auf-zu-machen = aufzumachen.',
          },
          {
            scene: 'Una expresión impersonal',
            lines: [['', 'Es ist wichtig, regelmäßig Sport ___.']],
            options: ['zu machen', 'zu macht', 'machen zu', 'gemacht'],
            answer: 'zu machen',
            explain: '"Es ist wichtig, zu + Infinitiv" al final. machen → zu machen.',
          },
          {
            scene: 'Verbo separable: anrufen',
            lines: [['', 'Er vergisst immer, seine Mutter ___.']],
            options: ['anzurufen', 'zu anrufen', 'anrufen zu', 'zu rufen an'],
            answer: 'anzurufen',
            explain: 'anrufen es separable: an + zu + rufen → anzurufen.',
          },
          {
            scene: 'Dejar de hacer algo',
            lines: [['', 'Sie hat beschlossen, ___ rauchen.']],
            options: ['aufzuhören zu', 'aufzuhören mit', 'zu aufhören', 'aufhören zu'],
            answer: 'aufzuhören zu',
            explain: '"aufhören zu rauchen" = dejar de fumar. Separable: auf-zu-hören. Luego "zu rauchen".',
          },
          {
            scene: 'Una esperanza',
            lines: [['', 'Ich hoffe, bald ___ reisen.']],
            options: ['zu können', 'können zu', 'zu kann', 'zu gekonnt'],
            answer: 'zu können',
            explain: '"hoffen + zu + Infinitiv". El modal "können" como infinitivo: zu können.',
          },
          {
            scene: 'Una promesa',
            lines: [['', 'Er hat versprochen, früher ___.']],
            options: ['nach Hause zu kommen', 'zu kommen nach Hause', 'nach Hause kommen zu', 'zu gekommen'],
            answer: 'nach Hause zu kommen',
            explain: '"versprechen + zu + Infinitiv". Los complementos van antes de "zu kommen": nach Hause zu kommen.',
          },
          {
            scene: 'Una recomendación',
            lines: [['', 'Der Arzt empfiehlt, viel Wasser ___.']],
            options: ['zu trinken', 'trinken zu', 'zu trank', 'zu getrunken'],
            answer: 'zu trinken',
            explain: '"empfehlen + zu + Infinitiv". trinken → zu trinken al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Verbos separables con zu',
        tag: '2 espacios',
        intro: 'Completa con el verbo separable con zu y el contexto correcto.',
        type: 'dual',
        items: [
          {
            scene: 'La mañana de Marco',
            lines: [['', 'Marco vergisst oft, früh [[0]] und pünktlich [[1]].']],
            blanks: [
              { options: ['aufzustehen', 'zu aufstehen', 'aufstehen zu', 'gestanden zu'], answer: 'aufzustehen', explain: 'aufstehen separable: auf + zu + stehen → aufzustehen.' },
              { options: ['loszufahren', 'zu losfahren', 'losfahren zu', 'gefahren zu'], answer: 'loszufahren', explain: 'losfahren separable: los + zu + fahren → loszufahren.' },
            ],
          },
          {
            scene: 'Una resolución de Año Nuevo',
            lines: [['', 'Ich habe beschlossen, mit dem Rauchen [[0]] und mehr Sport [[1]].']],
            blanks: [
              { options: ['aufzuhören', 'zu aufhören', 'aufhören zu', 'aufgehört zu'], answer: 'aufzuhören', explain: 'aufhören separable: auf + zu + hören → aufzuhören.' },
              { options: ['zu treiben', 'treiben zu', 'zu trieb', 'getrieben zu'], answer: 'zu treiben', explain: 'treiben no es separable: zu + treiben → zu treiben. Sport treiben = hacer deporte.' },
            ],
          },
          {
            scene: 'Planes de viaje',
            lines: [['', 'Wir planen, im Sommer [[0]] und viele Städte [[1]].']],
            blanks: [
              { options: ['loszufahren', 'zu fahren los', 'losfahren zu', 'zu losfahren'], answer: 'loszufahren', explain: 'losfahren separable: los-zu-fahren = loszufahren.' },
              { options: ['zu besuchen', 'besuchen zu', 'zu besuchte', 'gebesucht zu'], answer: 'zu besuchen', explain: 'besuchen no es separable: zu + besuchen → zu besuchen.' },
            ],
          },
          {
            scene: 'Una queja',
            lines: [['', 'Sie hat keine Lust, den Haushalt [[0]] und die Wäsche [[1]].']],
            blanks: [
              { options: ['aufzuräumen', 'zu aufräumen', 'aufräumen zu', 'aufgeräumt zu'], answer: 'aufzuräumen', explain: 'aufräumen separable: auf-zu-räumen = aufzuräumen.' },
              { options: ['abzuhängen', 'zu abhängen', 'abhängen zu', 'geabhängt zu'], answer: 'abzuhängen', explain: 'abhängen separable: ab-zu-hängen = abzuhängen.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Los planes de Julia',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta de Infinitiv mit zu para el texto de Julia.',
        type: 'guidedText',
        scene: 'Julia describe sus planes y resoluciones del año nuevo.',
        text: 'Julia hat viele Pläne für dieses Jahr. Sie versucht, jeden Morgen früh [[0]] (aufstehen). Sie plant auch, ein neues Instrument [[1]] (lernen). Es ist ihr wichtig, mehr Zeit mit der Familie [[2]] (verbringen). Sie hat versprochen, öfter [[3]] (anrufen). Außerdem möchte sie aufhören, so viel Handy [[4]] (benutzen). Sie hofft, am Ende des Jahres zufrieden [[5]] (sein). Es wäre schön, alle Ziele [[6]] (erreichen).',
        blanks: [
          { options: ['aufzustehen', 'zu aufstehen', 'aufstehen', 'zu stehen auf'], answer: 'aufzustehen', explain: 'aufstehen separable: auf + zu + stehen → aufzustehen.' },
          { options: ['zu lernen', 'lernen zu', 'gelernt zu', 'lernen'], answer: 'zu lernen', explain: 'lernen no es separable: zu + lernen → zu lernen.' },
          { options: ['zu verbringen', 'verbringen zu', 'verbracht zu', 'zu verbringe'], answer: 'zu verbringen', explain: 'verbringen no separable: zu verbringen.' },
          { options: ['anzurufen', 'zu anrufen', 'anrufen zu', 'zu rufen an'], answer: 'anzurufen', explain: 'anrufen separable: an + zu + rufen → anzurufen.' },
          { options: ['zu benutzen', 'benutzen zu', 'benutzt zu', 'zu benutz'], answer: 'zu benutzen', explain: 'benutzen no separable: zu benutzen.' },
          { options: ['zu sein', 'sein zu', 'gewesen zu', 'zu ist'], answer: 'zu sein', explain: 'sein → zu sein (infinitivo de sein con zu).' },
          { options: ['zu erreichen', 'erreichen zu', 'erreicht zu', 'zu erreich'], answer: 'zu erreichen', explain: 'erreichen no separable: zu erreichen.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe la forma de Infinitiv mit zu del verbo indicado (pon atención a los separables).',
        type: 'freeText',
        scene: 'Completa con la forma correcta de zu + Infinitiv.',
        text: 'Es ist schön, neue Freunde [[0]] (kennenlernen). Ich vergesse oft, mein Handy [[1]] (aufladen). Sie beginnt, eine neue Sprache [[2]] (lernen). Er hat keine Lust, jeden Tag [[3]] (aufstehen). Wir hoffen, bald [[4]] (reisen können).',
        blanks: [
          { answer: 'kennenzulernen', accepted: ['kennenzulernen', 'kennen zu lernen'], explain: 'kennenlernen: Verb separable: kennen + zu + lernen → kennenzulernen.' },
          { answer: 'aufzuladen', accepted: ['aufzuladen'], explain: 'aufladen separable: auf + zu + laden → aufzuladen.' },
          { answer: 'zu lernen', accepted: ['zu lernen'], explain: 'lernen no separable: zu lernen.' },
          { answer: 'aufzustehen', accepted: ['aufzustehen'], explain: 'aufstehen separable: auf + zu + stehen → aufzustehen.' },
          { answer: 'reisen zu können', accepted: ['reisen zu können', 'zu reisen und zu können', 'bald reisen zu können'], explain: 'hoffen + zu + Infinitiv. "reisen zu können" o "reisen zu können": el modal al final también lleva zu.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa propósitos e intenciones',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con Infinitiv mit zu.',
        type: 'write',
        items: [
          {
            scene: 'Tu intención',
            prompt: 'Describe algo que intentas hacer usando "Ich versuche, ... zu ...".',
            answer: 'Ich versuche, jeden Tag eine Stunde Deutsch zu lernen.',
            accepted: ['versuche', 'zu lernen', 'zu machen', 'zu sprechen'],
            explain: 'Estructura: Ich versuche, + complementos + zu + Infinitiv al final.',
          },
          {
            scene: 'Algo que olvidaste',
            prompt: 'Di algo que olvidaste hacer hoy usando "Ich habe vergessen, ... zu ...".',
            answer: 'Ich habe vergessen, meine Mutter anzurufen.',
            accepted: ['vergessen', 'anzurufen', 'aufzurufen', 'zu schreiben'],
            explain: 'vergessen + zu + Infinitiv. Si es separable, recuerda: an-zu-rufen = anzurufen.',
          },
          {
            scene: 'Un consejo importante',
            prompt: 'Da un consejo usando "Es ist wichtig, ... zu ...".',
            answer: 'Es ist wichtig, jeden Tag Wasser zu trinken.',
            accepted: ['wichtig', 'zu trinken', 'zu essen', 'zu schlafen', 'zu lernen', 'zu üben'],
            explain: 'Expresión impersonal + zu + Infinitiv. Ej: Es ist wichtig, regelmäßig zu schlafen.',
          },
          {
            scene: 'Lo que planeas',
            prompt: 'Describe un plan tuyo usando "Ich plane, ... zu ...".',
            answer: 'Ich plane, im Sommer nach Deutschland zu reisen.',
            accepted: ['plane', 'zu reisen', 'zu besuchen', 'zu fahren', 'zu lernen'],
            explain: 'planen + zu + Infinitiv. Los complementos van antes de "zu + Infinitiv".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mis resoluciones',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tus propósitos o planes usando Infinitiv mit zu.',
        type: 'write',
        items: [
          {
            scene: 'Tu mayor resolución',
            prompt: 'Escribe tu resolución más importante usando "Ich habe beschlossen, ...".',
            answer: 'Ich habe beschlossen, jeden Morgen früh aufzustehen.',
            accepted: ['beschlossen', 'zu', 'aufzustehen', 'zu machen', 'zu lernen'],
            explain: 'beschließen + zu + Infinitiv. Recuerda los separables: aufzustehen, anzufangen, etc.',
          },
          {
            scene: 'Algo que quieres empezar',
            prompt: 'Di algo que quieres empezar a hacer usando "Ich möchte anfangen, ...".',
            answer: 'Ich möchte anfangen, regelmäßig zu meditieren.',
            accepted: ['anfangen', 'zu meditieren', 'zu laufen', 'zu kochen', 'zu lesen'],
            explain: 'anfangen + zu + Infinitiv. anfangen mismo es separable pero aquí es el verbo principal conjugado.',
          },
          {
            scene: 'Algo que deberías dejar',
            prompt: 'Menciona algo que deberías dejar de hacer usando "Ich sollte aufhören, ...".',
            answer: 'Ich sollte aufhören, so spät ins Bett zu gehen.',
            accepted: ['aufhören', 'zu gehen', 'zu essen', 'zu spielen', 'zu surfen'],
            explain: 'aufhören separable en la construcción: aufhören + zu + Infinitiv. ins Bett gehen = irse a la cama.',
          },
        ],
      },
    ],
  },
}

export default topic
