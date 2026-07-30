import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'perfekt-haben-sein-b1',
  order: '08',
  color: '#1a2ecc',
  category: 'Verbos',
  level: 'B1',
  title: 'Perfekt mit haben und sein — El Perfekt con haben y sein en alemán B1',
  shortTitle: 'Perfekt haben/sein',
  metaTitle: 'Perfekt haben o sein B1 — Cuándo usar cada auxiliar en alemán',
  description:
    'El Perfekt se forma con haben o sein + Partizip II. La elección del auxiliar depende del tipo de verbo: haben para la mayoría, sein para verbos de movimiento dirigido y de cambio de estado. Esta es una de las decisiones más importantes en el alemán B1.',
  lead: 'Aprende a elegir entre haben y sein como auxiliar en el Perfekt alemán con la regla definitiva y ejercicios progresivos.',
  outcomes: [
    'Identificas cuándo un verbo usa haben y cuándo sein en el Perfekt',
    'Conjugas correctamente el Perfekt de los verbos más frecuentes',
    'Distingues verbos de movimiento dirigido (sein) de verbos de estado (haben)',
    'Manejas los verbos que cambian de auxiliar según si son transitivos o intransitivos',
  ],

  guide: {
    goal: 'Elegir correctamente entre haben y sein como auxiliar en el Perfekt alemán.',
    model: 'Ich habe das Buch gelesen. / Wir sind nach Berlin gefahren. / Das Baby ist eingeschlafen.',
    formula: 'haben/sein (konjugiert) + Partizip II',
    decisions: [
      'Usa haben con verbos transitivos (que llevan objeto acusativo): Ich habe das Buch gelesen. / Sie hat einen Apfel gegessen.',
      'Usa haben con verbos reflexivos: Er hat sich gefreut. / Wir haben uns beeilt.',
      'Usa sein con verbos de movimiento dirigido de A a B: gehen, kommen, fahren, fliegen, laufen, reisen, gehen.',
      'Usa sein con verbos de cambio de estado: einschlafen, aufwachen, sterben, werden, wachsen, passieren.',
      'Verbos especiales con sein: sein (ist gewesen), bleiben (ist geblieben), begegnen (ist begegnet).',
      'Algunos verbos usan haben o sein según si son transitivos: Ich habe das Auto gefahren (transitivo) vs. Ich bin nach Berlin gefahren (intransitivo/direccional).',
    ],
    table: [
      ['Auxiliar', 'Cuándo', 'Ejemplo'],
      ['haben', 'verbos transitivos y reflexivos', 'Ich habe gegessen. / Er hat sich gefreut.'],
      ['sein', 'movimiento dirigido y cambio de estado', 'Sie ist gegangen. / Das Kind ist gewachsen.'],
      ['sein', 'sein, bleiben, passieren, begegnen', 'Wir sind geblieben. / Es ist passiert.'],
    ],
    mistakes: [
      '"Ich bin gegessen" ❌ → "Ich habe gegessen" ✓ — essen es transitivo, usa haben.',
      '"Ich habe nach Hause gegangen" ❌ → "Ich bin nach Hause gegangen" ✓ — gehen (movimiento A→B) usa sein.',
      '"Er ist geschlafen" ❌ → "Er hat geschlafen" ✓ — schlafen (acción sin desplazamiento) usa haben.',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo usar haben y cuándo sein en el Perfekt?',
      paragraphs: [
        'El Perfekt se forma con un auxiliar conjugado (haben o sein) más el Partizip II. La regla más útil: si puedes preguntar "¿Adónde fue?" o "¿Qué le pasó al sujeto?", es sehr probable que uses sein. Si hay un objeto directo en la acción, normalmente es haben.',
        'En alemán B1 la elección correcta del auxiliar es fundamental para no cometer errores básicos. Los verbos más comunes con sein son: gehen, kommen, fahren, fliegen, laufen, reisen (movimiento); werden, wachsen, einschlafen, aufwachen (cambio de estado); sein, bleiben, passieren.',
      ],
      table: [
        ['Verbo', 'Auxiliar', 'Partizip II'],
        ['gehen', 'sein', 'gegangen'],
        ['kommen', 'sein', 'gekommen'],
        ['fahren', 'sein/haben', 'gefahren'],
        ['essen', 'haben', 'gegessen'],
        ['lesen', 'haben', 'gelesen'],
      ],
    },
    {
      heading: '¿Qué verbos pueden usar haben o sein en el Perfekt?',
      paragraphs: [
        'Algunos verbos alemanes admiten los dos auxiliares según si se usan transitivamente (haben) o intransitivamente con sentido de movimiento (sein): fahren, fliegen, ziehen, schwimmen.',
        'Regla de oro: si el verbo lleva un objeto en acusativo → haben. Si expresa movimiento de A a B sin objeto → sein. Ejemplos: "Er hat das Auto gefahren" (ha conducido el coche, transitivo, haben) vs. "Er ist nach München gefahren" (ha ido a Múnich, movimiento dirigido, sein).',
      ],
    },
    {
      heading: '¿Cómo se forma el Perfekt en alemán?',
      paragraphs: [
        'Con el auxiliar haben o sein en presente + el Partizip II al final de la oración: "Ich habe gegessen" (he comido), "Ich bin gegangen" (he ido/me he ido). La mayoría de verbos usan haben; usan sein los verbos de movimiento con cambio de lugar (gehen, kommen, fahren, fliegen), los de cambio de estado (aufstehen, einschlafen, sterben, wachsen) y los verbos sein y bleiben. La trampa para el hispanohablante es doble: en español el auxiliar es siempre "haber", mientras que el alemán elige entre haben/sein; y el participio va al FINAL de la frase, no junto al auxiliar. En el sur de Alemania el Perfekt sustituye casi por completo al Präteritum en el habla.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Perfekt B1: elección entre haben y sein. Verbos de movimiento y cambio de estado con sein; verbos transitivos y reflexivos con haben.',
    graphicPrompt: 'Dos trenes: uno con "haben" para verbos de acción/estado, otro con "sein" para verbos de movimiento y cambio.',
    scene: [
      ['Ich habe heute viel gelernt.', 'Hoy he aprendido mucho.'],
      ['Wir sind um 8 Uhr angekommen.', 'Llegamos a las 8.'],
      ['Sie ist in Berlin gewesen.', 'Ella ha estado en Berlín.'],
      ['Er hat das Buch gelesen.', 'Él ha leído el libro.'],
      ['Das Baby ist eingeschlafen.', 'El bebé se ha dormido.'],
      ['Wir sind nach Hamburg gefahren.', 'Hemos ido a Hamburgo.'],
      ['Sie hat sich gefreut.', 'Ella se alegró.'],
      ['Es ist gestern passiert.', 'Ocurrió ayer.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    practiceVerbs: ['gehen', 'kommen', 'fahren', 'essen', 'lesen', 'einschlafen', 'bleiben', 'werden'],
    reviewFocus: ['auxiliar haben vs sein', 'verbos de movimiento', 'cambio de estado', 'verbos transitivos/intransitivos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el auxiliar correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona haben o sein para completar cada frase en Perfekt.',
        type: 'choice',
        items: [
          {
            scene: 'Narración de un viaje',
            lines: [['', 'Ich ___ gestern ins Kino gegangen.']],
            options: ['bin', 'habe', 'ist', 'hat'],
            answer: 'bin',
            explain: '"gehen" expresa movimiento dirigido → auxiliar sein. 1ª persona: bin.',
          },
          {
            scene: 'Tarde de estudio',
            lines: [['', 'Er ___ das Buch in zwei Stunden gelesen.']],
            options: ['hat', 'ist', 'bin', 'sind'],
            answer: 'hat',
            explain: '"lesen" es transitivo (lleva objeto: das Buch) → auxiliar haben. 3ª persona sing.: hat.',
          },
          {
            scene: 'Viaje de fin de semana',
            lines: [['', 'Wir ___ mit dem Zug nach München gefahren.']],
            options: ['sind', 'haben', 'bin', 'hat'],
            answer: 'sind',
            explain: '"fahren" sin objeto, con destino (nach München) → movimiento dirigido → sein. Plural 1ª: sind.',
          },
          {
            scene: 'Noche tranquila',
            lines: [['', 'Das Baby ___ sehr früh eingeschlafen.']],
            options: ['ist', 'hat', 'sind', 'habe'],
            answer: 'ist',
            explain: '"einschlafen" es un cambio de estado → auxiliar sein. 3ª persona sing.: ist.',
          },
          {
            scene: 'Otoño',
            lines: [['', 'Die Blumen ___ dieses Jahr sehr schön geblüht.']],
            options: ['haben', 'sind', 'hat', 'ist'],
            answer: 'haben',
            explain: '"blühen" es una acción sin desplazamiento ni cambio claro de estado → haben.',
          },
          {
            scene: 'Reunión de trabajo',
            lines: [['', 'Er ___ sich über das Ergebnis gefreut.']],
            options: ['hat', 'ist', 'bin', 'haben'],
            answer: 'hat',
            explain: '"sich freuen" es reflexivo → siempre auxiliar haben. 3ª persona sing.: hat.',
          },
          {
            scene: 'Regreso a casa',
            lines: [['', 'Sie ___ gestern Abend nach Hause gegangen.']],
            options: ['ist', 'hat', 'bin', 'haben'],
            answer: 'ist',
            explain: '"gehen nach Hause" es movimiento dirigido → sein. 3ª persona sing.: ist.',
          },
          {
            scene: 'Cambio de residencia',
            lines: [['', 'Er ___ den ganzen Sommer in Spanien geblieben.']],
            options: ['ist', 'hat', 'bin', 'sind'],
            answer: 'ist',
            explain: '"bleiben" es un verbo especial que usa sein. 3ª persona sing.: ist geblieben.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos auxiliares, una historia',
        tag: '2 espacios',
        intro: 'Completa cada oración con los dos auxiliares correctos en Perfekt.',
        type: 'dual',
        items: [
          {
            scene: 'Mañana ajetreada',
            lines: [['', 'Anna [[0]] früh aufgewacht und [[1]] sofort in die Küche gegangen.']],
            blanks: [
              { options: ['ist', 'hat', 'bin', 'sind'], answer: 'ist', explain: '"aufwachen" = cambio de estado → sein.' },
              { options: ['ist', 'hat', 'bin', 'sind'], answer: 'ist', explain: '"gehen" = movimiento dirigido → sein.' },
            ],
          },
          {
            scene: 'Viaje en taxi',
            lines: [['', 'Wir [[0]] ein Taxi genommen und [[1]] schnell zum Bahnhof gefahren.']],
            blanks: [
              { options: ['haben', 'sind', 'ist', 'hat'], answer: 'haben', explain: '"nehmen" es transitivo (ein Taxi = objeto en Akk.) → haben.' },
              { options: ['sind', 'haben', 'ist', 'hat'], answer: 'sind', explain: '"fahren" con destino (zum Bahnhof) = movimiento dirigido → sein.' },
            ],
          },
          {
            scene: 'Día productivo',
            lines: [['', 'Er [[0]] lange geschlafen und [[1]] dann spät zur Arbeit gegangen.']],
            blanks: [
              { options: ['hat', 'ist', 'haben', 'sind'], answer: 'hat', explain: '"schlafen" sin desplazamiento ni cambio de estado → haben.' },
              { options: ['ist', 'hat', 'haben', 'sind'], answer: 'ist', explain: '"gehen" = movimiento dirigido → sein.' },
            ],
          },
          {
            scene: 'Los niños en el jardín',
            lines: [['', 'Die Kinder [[0]] im Garten gespielt und [[1]] dabei sehr müde geworden.']],
            blanks: [
              { options: ['haben', 'sind', 'hat', 'ist'], answer: 'haben', explain: '"spielen" sin desplazamiento → haben.' },
              { options: ['sind', 'haben', 'hat', 'ist'], answer: 'sind', explain: '"werden" = cambio de estado → sein.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Rutina de ayer en Perfekt',
        tag: 'Texto guiado',
        intro: 'Completa la narración de un día típico con haben o sein correctamente conjugados.',
        type: 'guidedText',
        scene: 'Kai describe qué hizo ayer.',
        text: 'Gestern [[0]] ich früh aufgestanden. Ich [[1]] schnell gefrühstückt. Dann [[2]] ich mit dem Bus gefahren. Ich [[3]] pünktlich angekommen. Nachmittags [[4]] ich viel gelernt und abends [[5]] ich sehr müde geworden.',
        blanks: [
          { options: ['bin', 'habe', 'ist', 'hat'], answer: 'bin', explain: '"aufstehen" = cambio de posición/estado → sein.' },
          { options: ['habe', 'bin', 'hat', 'ist'], answer: 'habe', explain: '"frühstücken" sin desplazamiento → haben.' },
          { options: ['bin', 'habe', 'ist', 'hat'], answer: 'bin', explain: '"fahren" con destino implícito → sein.' },
          { options: ['bin', 'habe', 'ist', 'hat'], answer: 'bin', explain: '"ankommen" = verbo de llegada → sein.' },
          { options: ['habe', 'bin', 'hat', 'ist'], answer: 'habe', explain: '"lernen" es actividad sin desplazamiento → haben.' },
          { options: ['bin', 'habe', 'ist', 'hat'], answer: 'bin', explain: '"werden" = cambio de estado → sein.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completar libremente',
        tag: 'Texto libre',
        intro: 'Escribe el auxiliar correcto (haben/sein conjugado) sin opciones.',
        type: 'freeText',
        scene: 'Traduce el verbo dado al Perfekt con el auxiliar correcto.',
        text: 'Letztes Jahr [[0]] wir nach Spanien gefahren. Er [[1]] sein Mittagessen gegessen. Die Kinder [[2]] im Garten gewachsen — nein, gespielt! Das Konzert [[3]] um 20 Uhr angefangen. Sie [[4]] gestern lange in der Bibliothek geblieben.',
        blanks: [
          { answer: 'sind', explain: '"fahren" + Richtung → sein. Wir: sind.' },
          { answer: 'hat', explain: '"essen" transitivo → haben. Er: hat.' },
          { answer: 'haben', explain: '"spielen" sin desplazamiento → haben. Die Kinder: haben.' },
          { answer: 'hat', explain: '"anfangen" = inicio de estado → sein o haben según el verbo; anfangen → sein. Es: hat. (Nota: anfangen usa haben)' },
          { answer: 'ist', explain: '"bleiben" → sein. Sie (sing.): ist.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe en Perfekt',
        tag: 'Producción guiada',
        intro: 'Responde en Perfekt usando el auxiliar correcto. Puedes ver las instrucciones en español.',
        type: 'write',
        items: [
          {
            scene: 'Tu semana',
            prompt: 'Describe 5 cosas que hiciste esta semana usando Perfekt. Incluye al menos 2 verbos con sein y 2 con haben.',
            answer: 'Ich bin am Montag zur Schule gegangen. Ich habe Deutsch gelernt. Wir sind ins Kino gefahren. Ich habe ein Buch gelesen. Meine Schwester ist nach Hause gekommen.',
            explain: 'Movimiento (gehen, fahren, kommen) → sein; acciones/estados (lernen, lesen) → haben.',
          },
          {
            scene: 'La diferencia',
            prompt: 'Explica la diferencia entre "Er hat das Auto gefahren" y "Er ist nach Berlin gefahren".',
            answer: 'Mit haben ist "fahren" transitiv (das Auto = Objekt im Akkusativ). Mit sein ist "fahren" intransitiv und drückt Bewegung von A nach B aus (nach Berlin = Richtung).',
            explain: 'Schlüsselregel: transitiv mit Akk.-Objekt → haben; Bewegung A→B ohne Objekt → sein.',
          },
          {
            scene: 'Lista de verbos',
            prompt: 'Escribe 4 verbos que usan sein en Perfekt y explica brevemente por qué en cada caso.',
            answer: 'gehen (Bewegung A→B), werden (Zustandsveränderung), bleiben (Sonderfall), einschlafen (Zustandsveränderung).',
            explain: 'Verbos de movimiento dirigido y cambio de estado → sein.',
          },
          {
            scene: 'Narración',
            prompt: 'Escribe 3 oraciones describiendo qué hiciste el fin de semana en Perfekt.',
            answer: 'Am Samstag bin ich ins Fitnessstudio gegangen. Dann habe ich mit Freunden gegessen. Am Abend haben wir einen Film geschaut.',
            explain: 'Uso correcto: gehen → sein; essen y schauen (transitivos/sin desplazamiento) → haben.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Producción libre en Perfekt',
        tag: 'Escritura libre',
        intro: 'Escribe con libertad usando todo lo aprendido sobre haben y sein en Perfekt.',
        type: 'write',
        items: [
          {
            scene: 'Un viaje',
            prompt: 'Escribe un párrafo de 5-7 oraciones sobre un viaje (real o imaginario). Usa al menos 3 verbos con sein y 3 con haben.',
            answer: '',
            explain: 'Incluye movimiento (sein: fahren, fliegen, ankommen) y actividades en destino (haben: essen, sehen, kaufen).',
          },
          {
            scene: 'Un día especial',
            prompt: 'Narra el día más memorable de tu vida en Perfekt. Usa mínimo 6 verbos correctamente.',
            answer: '',
            explain: 'Varía entre haben y sein según el tipo de verbo.',
          },
          {
            scene: 'Análisis',
            prompt: '¿Por qué "passieren" (suceder) usa sein? Da 2 ejemplos propios.',
            answer: '',
            explain: '"passieren" implica un evento que le "ocurre" a algo/alguien → cambio de estado → sein.',
          },
        ],
      },
    ],
  },
}

export default topic
