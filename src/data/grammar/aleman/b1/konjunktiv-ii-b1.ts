import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'konjunktiv-ii-b1',
  order: '01',
  color: '#c9a900',
  category: 'Modus',
  level: 'B1',
  title: 'Konjunktiv II en Alemán B1 — Deseos, Condiciones e Hipótesis',
  shortTitle: 'Konjunktiv II',
  metaTitle: 'Konjunktiv II B1 — würde, wäre, hätte y condiciones hipotéticas en alemán',
  description:
    'El Konjunktiv II expresa situaciones irreales, deseos, recomendaciones y condiciones hipotéticas. La forma más usada en B1 es würde + Infinitiv, pero los verbos sein (wäre), haben (hätte) y los modales forman su propio Konjunktiv II sin würde.',
  lead: 'Domina el Konjunktiv II para expresar deseos, sugerencias y situaciones hipotéticas: würde + Infinitiv, wäre, hätte y los verbales modales.',
  outcomes: [
    'Forma oraciones hipotéticas con würde + Infinitiv para verbos regulares e irregulares',
    'Usa wäre y hätte como Konjunktiv II de sein y haben',
    'Expresa deseos y recomendaciones con Konjunktiv II',
    'Construye oraciones condicionales del tipo "Wenn..., würde..."',
  ],

  guide: {
    goal: 'Expresar situaciones irreales, deseos y condiciones hipotéticas usando las formas del Konjunktiv II.',
    model: 'Wenn ich Zeit hätte, würde ich mehr reisen. / Ich wäre so glücklich, wenn du kämst.',
    formula: 'würde + Infinitiv  |  wäre (sein)  |  hätte (haben)  |  Modal-Konj.II',
    decisions: [
      'Para la mayoría de verbos usa würde + Infinitiv: Ich würde kommen. / Sie würde lernen.',
      'Para sein usa wäre: Ich wäre glücklich. / Das wäre eine gute Idee.',
      'Para haben usa hätte: Ich hätte mehr Zeit. / Er hätte gerne ein Auto.',
      'Los modales forman Konjunktiv II directamente: könnte, müsste, sollte, dürfte, möchte → möchte ya actúa como Konj.II de mögen.',
      'En oraciones con wenn (si): Wenn ich Geld hätte, würde ich reisen. — el verbo conjugado va al final del wenn-Satz.',
      'Cuando würde aparece en la oración principal después del wenn-Satz, ocupa la posición 2: ... würde ich reisen.',
    ],
    table: [
      ['Verbo', 'Konjunktiv II', 'Ejemplo'],
      ['sein', 'wäre', 'Ich wäre müde. / Das wäre toll.'],
      ['haben', 'hätte', 'Ich hätte Zeit. / Er hätte ein Auto.'],
      ['können', 'könnte', 'Ich könnte helfen. / Das könnte sein.'],
      ['müssen', 'müsste', 'Du müsstest das machen. / Es müsste gehen.'],
      ['alle anderen', 'würde + Inf.', 'Ich würde kommen. / Sie würde lernen.'],
    ],
    mistakes: [
      '"Ich würde sein müde" ❌ → "Ich wäre müde" ✓ — sein forma su propio Konjunktiv II: wäre.',
      '"Wenn ich hätte Zeit" ❌ → "Wenn ich Zeit hätte" ✓ — en el Nebensatz el verbo va al final.',
      '"Ich hätte gerne würde trinken" ❌ → "Ich würde gerne einen Kaffee trinken" ✓ — no combinas hätte con würde para el mismo verbo.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el Konjunktiv II en alemán?',
      paragraphs: [
        'El Konjunktiv II es el modo del subjuntivo alemán que expresa situaciones irreales o hipotéticas: cosas que no son ciertas ahora pero podrían serlo bajo ciertas condiciones. Se usa para deseos, sugerencias corteses, hipótesis y oraciones condicionales.',
        'En nivel B1 el Konjunktiv II es imprescindible para hablar de forma matizada: "Ich würde gerne nach Berlin fahren" (Me gustaría ir a Berlín) suena mucho más natural y educado que un simple imperativo o una afirmación directa.',
      ],
    },
    {
      heading: 'Cómo se forma: würde + Infinitiv',
      paragraphs: [
        'La forma más sencilla y común del Konjunktiv II es würde + Infinitiv. Se conjuga würde según la persona y el Infinitiv queda al final: ich würde, du würdest, er/sie/es würde, wir würden, ihr würdet, sie/Sie würden.',
        'Esta construcción equivale al condicional en español: ich würde kommen = yo vendría; wir würden reisen = nosotros viajaríamos. Es la forma preferida en el alemán hablado moderno para casi todos los verbos.',
      ],
      table: [
        ['Persona', 'würde', 'Ejemplo completo'],
        ['ich', 'würde', 'Ich würde lernen.'],
        ['du', 'würdest', 'Du würdest kommen.'],
        ['er/sie/es', 'würde', 'Er würde arbeiten.'],
        ['wir', 'würden', 'Wir würden reisen.'],
        ['ihr', 'würdet', 'Ihr würdet bleiben.'],
        ['sie/Sie', 'würden', 'Sie würden helfen.'],
      ],
    },
    {
      heading: 'Las formas especiales: wäre, hätte y los modales',
      paragraphs: [
        'Los verbos sein y haben, y todos los verbos modales, no usan würde sino que forman el Konjunktiv II directamente. Estas formas son las más frecuentes en el habla real y debes memorizarlas.',
        'wäre (sein): ich wäre, du wärst, er wäre, wir wären. Hätte (haben): ich hätte, du hättest, er hätte, wir hätten. Modales: könnte (können), müsste (müssen), sollte (sollen), dürfte (dürfen). Estas formas se parecen al Präteritum más una Umlaut (ä, ö, ü).',
      ],
    },
    {
      heading: 'Oraciones condicionales con wenn',
      paragraphs: [
        'El uso más importante del Konjunktiv II en B1 es la oración condicional irreal: "Wenn ich Zeit hätte, würde ich mehr Sport machen." (Si tuviera tiempo, haría más deporte.) El wenn-Satz lleva el verbo al final, y la oración principal comienza con würde en posición 2.',
        'Cuando la oración principal va primero: "Ich würde mehr reisen, wenn ich Geld hätte." Nota que en los dos casos la parte hipotética usa hätte/wäre/Konjunktiv II y la consecuencia usa würde + Infinitiv (o también Konjunktiv II directamente).',
      ],
    },
    {
      heading: 'Deseos y recomendaciones educadas',
      paragraphs: [
        'El Konjunktiv II también se usa para expresar deseos: "Ich hätte gerne einen Kaffee" (Me gustaría un café). Estas fórmulas son esenciales en situaciones cotidianas como restaurantes, tiendas o peticiones formales.',
        'Para dar recomendaciones se usa: "Du solltest mehr schlafen" (Deberías dormir más) o "Das wäre eine gute Idee" (Eso sería una buena idea). En contextos formales, el Konjunktiv II hace que las sugerencias suenen menos directas y más corteses.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Konjunktiv II B1: würde+Infinitiv, wäre, hätte, modales en contextos de deseos y condiciones hipotéticas.',
    graphicPrompt: 'Dos caminos: el real (Indikativ) y el imaginario (Konjunktiv II), con bocadillos de sueños e hipótesis.',
    scene: [
      ['Wenn ich Zeit hätte, würde ich mehr lesen.', 'Si tuviera tiempo, leería más.'],
      ['Das wäre wirklich toll!', '¡Eso sería realmente genial!'],
      ['Ich würde gerne nach Japan reisen.', 'Me gustaría viajar a Japón.'],
      ['Könntest du mir bitte helfen?', '¿Podrías ayudarme, por favor?'],
      ['Ich hätte gerne einen Kaffee.', 'Me gustaría un café.'],
      ['Du solltest mehr Wasser trinken.', 'Deberías beber más agua.'],
      ['Wenn wir früher gestartet wären, wären wir pünktlich.', 'Si hubiéramos salido antes, llegaríamos a tiempo.'],
      ['An deiner Stelle würde ich das nicht machen.', 'En tu lugar, yo no haría eso.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['sein', 'haben', 'kommen', 'fahren', 'helfen', 'machen', 'können', 'müssen'],
    reviewFocus: ['würde + Infinitiv', 'wäre/hätte', 'Konjunktiv II der Modalverben', 'Wenn-Sätze irreal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma de Konjunktiv II correcta para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Expresando un deseo',
            lines: [['', 'Wenn ich mehr Zeit ___, würde ich Sport machen.']],
            options: ['hätte', 'habe', 'hatte', 'würde haben'],
            answer: 'hätte',
            explain: '"haben" forma Konjunktiv II como "hätte". En el wenn-Satz el verbo va al final.',
          },
          {
            scene: 'Una sugerencia',
            lines: [['', 'Das ___ eine gute Idee!']],
            options: ['wäre', 'würde sein', 'war', 'ist'],
            answer: 'wäre',
            explain: '"sein" forma Konjunktiv II como "wäre", no como "würde sein".',
          },
          {
            scene: 'Petición educada',
            lines: [['', '___ du mir bitte das Salz geben?']],
            options: ['Könntest', 'Kannst', 'Konntest', 'Würdest können'],
            answer: 'Könntest',
            explain: '"können" forma Konjunktiv II como "könnte". Du → könntest. Suena más educado que "Kannst du".',
          },
          {
            scene: 'Una hipótesis',
            lines: [['', 'Wenn ich reich wäre, ___ ich eine Weltreise machen.']],
            options: ['würde', 'wäre', 'hätte', 'könnte sein'],
            answer: 'würde',
            explain: 'La oración principal usa würde + Infinitiv para expresar la consecuencia hipotética.',
          },
          {
            scene: 'En el restaurante',
            lines: [['', 'Ich ___ gerne einen Tisch für zwei Personen reservieren.']],
            options: ['würde', 'hätte', 'wäre', 'sollte'],
            answer: 'würde',
            explain: '"würde gerne + Infinitiv" es la forma más natural para peticiones educadas en contextos formales.',
          },
          {
            scene: 'Un consejo',
            lines: [['', 'An deiner Stelle ___ ich das Angebot annehmen.']],
            options: ['würde', 'wäre', 'hätte', 'sollte'],
            answer: 'würde',
            explain: '"An deiner Stelle würde ich..." (En tu lugar yo...) usa würde + Infinitiv para dar consejo hipotético.',
          },
          {
            scene: 'Obligación hipotética',
            lines: [['', 'Du ___ wirklich mehr schlafen.']],
            options: ['solltest', 'sollst', 'würdest sollen', 'soltest'],
            answer: 'solltest',
            explain: '"sollen" forma Konjunktiv II como "sollte". Du → solltest. Expresa una recomendación.',
          },
          {
            scene: 'Condición irreal',
            lines: [['', 'Wenn es nicht so kalt ___, würde ich draußen spazieren gehen.']],
            options: ['wäre', 'war', 'ist', 'würde sein'],
            answer: 'wäre',
            explain: '"sein" → Konjunktiv II = wäre. En el wenn-Satz expresa la condición irreal presente.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos formas, un contexto',
        tag: '2 espacios',
        intro: 'Completa cada oración con las dos formas de Konjunktiv II correctas.',
        type: 'dual',
        items: [
          {
            scene: 'Sueños de viaje',
            lines: [['', 'Wenn ich Urlaub [[0]], [[1]] ich nach Spanien fahren.']],
            blanks: [
              { options: ['hätte', 'habe', 'hatte', 'würde haben'], answer: 'hätte', explain: '"haben" → Konjunktiv II = hätte. Condición en el wenn-Satz.' },
              { options: ['würde', 'wäre', 'hätte', 'könnte'], answer: 'würde', explain: 'La oración principal usa würde + Infinitiv (fahren queda al final).' },
            ],
          },
          {
            scene: 'Una recomendación',
            lines: [['', 'Das [[0]] eine tolle Idee — du [[1]] das unbedingt ausprobieren!']],
            blanks: [
              { options: ['wäre', 'würde sein', 'war', 'ist'], answer: 'wäre', explain: '"sein" → Konjunktiv II = wäre. Valoración hipotética.' },
              { options: ['solltest', 'sollst', 'müsstest', 'würdest sollen'], answer: 'solltest', explain: '"sollen" → Konjunktiv II = sollte. Du → solltest. Recomendación educada.' },
            ],
          },
          {
            scene: 'En la tienda',
            lines: [['', 'Ich [[0]] gerne dieses Kleid in Größe 38, und [[1]] ich es bitte anprobieren?']],
            blanks: [
              { options: ['hätte', 'würde', 'wäre', 'könnte'], answer: 'hätte', explain: '"hätte gerne" es la forma para pedir algo en una tienda o restaurante de forma educada.' },
              { options: ['könnte', 'kann', 'dürfte', 'würde können'], answer: 'könnte', explain: '"können" → Konjunktiv II = könnte. Petición educada con pregunta.' },
            ],
          },
          {
            scene: 'Consejos de vida',
            lines: [['', 'Wenn ich du [[0]], [[1]] ich jeden Tag meditieren.']],
            blanks: [
              { options: ['wäre', 'war', 'bin', 'würde sein'], answer: 'wäre', explain: '"sein" → Konjunktiv II = wäre. "Wenn ich du wäre" = Si yo fuera tú.' },
              { options: ['würde', 'wäre', 'hätte', 'sollte'], answer: 'würde', explain: 'Consecuencia hipotética: würde + Infinitiv (meditieren al final).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'El sueño de Mia',
        tag: 'Texto guiado',
        intro: 'Elige el Konjunktiv II correcto para completar el texto sobre los deseos de Mia.',
        type: 'guidedText',
        scene: 'Mia habla de lo que haría si ganara la lotería.',
        text: 'Mia träumt viel. Wenn sie viel Geld [[0]], [[1]] sie zuerst eine große Reise machen. Sie [[2]] gerne alle Kontinente besuchen. Wenn das Wetter schön [[3]], [[4]] sie jeden Tag am Strand spazieren. Sie [[5]] auch ihrer Familie helfen und ihnen ein Haus kaufen. Das [[6]] wirklich ihr größter Traum.',
        blanks: [
          { options: ['hätte', 'habe', 'hatte', 'haben würde'], answer: 'hätte', explain: '"haben" → Konjunktiv II = hätte. Condición hipotética en el wenn-Satz.' },
          { options: ['würde', 'wäre', 'hätte', 'könnte'], answer: 'würde', explain: 'Consecuencia: würde + Infinitiv (machen al final).' },
          { options: ['würde', 'wäre', 'hätte', 'sollte'], answer: 'würde', explain: '"würde gerne + Infinitiv" para expresar deseos.' },
          { options: ['wäre', 'war', 'ist', 'würde sein'], answer: 'wäre', explain: '"sein" → Konjunktiv II = wäre. Condición del tiempo hipotético.' },
          { options: ['würde', 'wäre', 'hätte', 'könnte'], answer: 'würde', explain: 'Consecuencia: würde + Infinitiv (spazieren al final).' },
          { options: ['könnte', 'kann', 'konnte', 'würde können'], answer: 'könnte', explain: '"können" → Konjunktiv II = könnte. Posibilidad hipotética.' },
          { options: ['wäre', 'würde sein', 'war', 'ist'], answer: 'wäre', explain: '"sein" → Konjunktiv II = wäre. Valoración del sueño.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe las formas',
        tag: 'Texto libre',
        intro: 'Escribe la forma de Konjunktiv II correcta del verbo indicado.',
        type: 'freeText',
        scene: 'Completa con la forma correcta de Konjunktiv II.',
        text: 'Wenn ich Deutschlehrer [[0]] (sein), [[1]] (würden) ich viele Spiele im Unterricht machen. Ich [[2]] (haben) immer viel Geduld mit den Schülern. Das [[3]] (sein) ein toller Job. Vielleicht [[4]] (können) ich auch ins Ausland gehen.',
        blanks: [
          { answer: 'wäre', accepted: ['wäre'], explain: '"sein" → Konjunktiv II = wäre. Condición irreal en el wenn-Satz.' },
          { answer: 'würde', accepted: ['würde'], explain: 'Oración principal: würde + Infinitiv (machen). Ich → würde.' },
          { answer: 'hätte', accepted: ['hätte'], explain: '"haben" → Konjunktiv II = hätte. Ich → hätte.' },
          { answer: 'wäre', accepted: ['wäre'], explain: '"sein" → Konjunktiv II = wäre. Valoración hipotética.' },
          { answer: 'könnte', accepted: ['könnte'], explain: '"können" → Konjunktiv II = könnte. Ich → könnte.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Produce oraciones hipotéticas',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con Konjunktiv II según las indicaciones.',
        type: 'write',
        items: [
          {
            scene: 'Un deseo personal',
            prompt: 'Expresa un deseo usando "Ich würde gerne..." o "Ich hätte gerne...".',
            answer: 'Ich würde gerne mehr Sprachen lernen.',
            accepted: ['würde gerne', 'hätte gerne', 'würde', 'hätte'],
            explain: 'Ejemplo: Ich würde gerne Japanisch lernen. / Ich hätte gerne mehr Freizeit.',
          },
          {
            scene: 'Un consejo a un amigo',
            prompt: 'Da un consejo usando "Du solltest..." o "An deiner Stelle würde ich...".',
            answer: 'Du solltest mehr Wasser trinken.',
            accepted: ['solltest', 'würde ich', 'müsstest', 'könntest'],
            explain: 'Ejemplo: Du solltest früher schlafen gehen. / An deiner Stelle würde ich einen Arzt aufsuchen.',
          },
          {
            scene: 'Una condición hipotética',
            prompt: 'Escribe una oración con "Wenn... hätte/wäre, würde ich...".',
            answer: 'Wenn ich mehr Geld hätte, würde ich eine Weltreise machen.',
            accepted: ['wenn', 'hätte', 'wäre', 'würde'],
            explain: 'La estructura: Wenn + [Subjekt + Konjunktiv II], würde + [Subjekt] + Infinitiv.',
          },
          {
            scene: 'Petición educada',
            prompt: 'Haz una petición educada usando "Könnten Sie..." o "Würden Sie...".',
            answer: 'Könnten Sie mir bitte das Fenster öffnen?',
            accepted: ['könnten', 'würden', 'könntest', 'würdest'],
            explain: 'Ejemplo: Würden Sie bitte leiser sprechen? / Könnten Sie mir helfen?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mi vida ideal',
        tag: 'Producción libre',
        intro: 'Describe tu vida ideal usando Konjunktiv II. Escribe 3 oraciones con deseos, condiciones y consejos.',
        type: 'write',
        items: [
          {
            scene: 'Tu sueño',
            prompt: 'Describe qué harías si pudieras hacer cualquier cosa (usa würde + Infinitiv).',
            answer: 'Wenn ich könnte, würde ich jeden Sommer nach Europa reisen.',
            accepted: ['würde', 'würde gerne', 'könnte'],
            explain: 'Usa würde + Infinitiv para la consecuencia y hätte/wäre/könnte para la condición.',
          },
          {
            scene: 'Tu deseo actual',
            prompt: 'Expresa algo que desearías tener o ser ahora mismo (usa hätte o wäre).',
            answer: 'Ich hätte gerne mehr Zeit für meine Familie.',
            accepted: ['hätte', 'wäre', 'hätte gerne'],
            explain: 'Ejemplo: Ich wäre gerne Musiker. / Ich hätte gerne einen Hund.',
          },
          {
            scene: 'Un consejo para ti mismo',
            prompt: 'Da un consejo a tu yo del pasado usando "Ich sollte..." o "Ich müsste...".',
            answer: 'Ich sollte früher mit dem Deutschlernen angefangen haben.',
            accepted: ['sollte', 'müsste', 'könnte', 'würde'],
            explain: 'Ejemplo: Ich sollte mehr Sport treiben. / Ich müsste gesünder essen.',
          },
        ],
      },
    ],
  },
}

export default topic
