import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparatives',
  order: '05',
  color: '#dc2626',
  category: 'Adjectives',
  level: 'A2',
  title: 'Comparativos en Inglés A2',
  shortTitle: 'Comparativos',
  metaTitle: 'Comparativos en Inglés A2 — -er y more, than',
  description:
    'Los adjetivos comparativos en inglés permiten comparar dos cosas. Se forman con -er para adjetivos cortos (bigger, faster) o con "more" para adjetivos largos (more interesting, more expensive). Siempre se usa "than" para introducir el segundo elemento de la comparación.',
  lead: 'Aprende a comparar personas, lugares y cosas en inglés con -er y more...than.',
  outcomes: [
    'Forma comparativos con -er o more según el adjetivo',
    'Usa than correctamente para comparar dos elementos',
    'Maneja las formas irregulares: good→better, bad→worse',
    'Aplica las reglas ortográficas del comparativo',
  ],

  guide: {
    goal: 'Usar adjetivos comparativos con -er/more + than para comparar dos personas, lugares o cosas.',
    model: 'This city is bigger than my hometown. / The new phone is more expensive than the old one.',
    formula: 'Adjective + -er + than / more + adjective + than',
    decisions: [
      'Adjetivos de 1 sílaba → + er: tall→taller, fast→faster, cold→colder',
      'Adjetivos de 1 sílaba CVC → duplica + er: big→bigger, hot→hotter, thin→thinner',
      'Adjetivos de 1-2 sílabas en -y → quita y + ier: happy→happier, easy→easier, heavy→heavier',
      'Adjetivos de 2+ sílabas → more + adjetivo: more comfortable, more interesting, more expensive',
      'Irregulares: good→better, bad→worse, far→farther/further',
    ],
    table: [
      ['Tipo de adjetivo', 'Regla', 'Ejemplo'],
      ['1 sílaba', '+ er', 'tall → taller, small → smaller'],
      ['1 sílaba CVC', 'CC + er', 'big → bigger, hot → hotter'],
    ],
    mistakes: [
      '"More taller" ❌ → "taller" ✓ — no uses "more" con adjetivos cortos que ya llevan -er.',
      '"Importanter" ❌ → "more important" ✓ — adjetivos de 3+ sílabas siempre usan "more".',
      '"She is more tall as me" ❌ → "She is taller than me" ✓ — usa "than", no "as" para comparativos.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forman los comparativos en inglés?',
      paragraphs: [
        'Los adjetivos comparativos en inglés tienen dos formas principales: añadir -er al final (para adjetivos cortos) o usar "more" delante (para adjetivos largos). La regla básica es que los adjetivos de una sílaba usan -er y los de tres o más sílabas usan "more".',
        'El conectador entre los dos elementos comparados siempre es "than": "Madrid is bigger than Valencia." / "This exercise is more difficult than the last one." En español usamos "que" — en inglés siempre es "than".',
      ],
    },
    {
      heading: 'Reglas de formación del comparativo',
      paragraphs: [
        'Adjetivos de 1 sílaba: añade -er directamente. Si el adjetivo termina en consonante-vocal-consonante (CVC) con sílaba tónica, duplica la consonante final: big→bigger, hot→hotter, thin→thinner.',
        'Adjetivos terminados en -y: cambia -y por -ier: happy→happier, easy→easier, heavy→heavier, early→earlier.',
        'Adjetivos de 2 sílabas (no -y): algunos admiten -er (clever→cleverer, quiet→quieter, simple→simpler), pero es más seguro usar "more" si no estás seguro.',
        'Adjetivos de 3+ sílabas: siempre "more": more comfortable, more interesting, more important, more expensive.',
      ],
      table: [
        ['Adjetivo', 'Comparativo', 'Ejemplo'],
        ['tall', 'taller', 'He is taller than his brother.'],
        ['big', 'bigger', 'This apartment is bigger.'],
        ['happy', 'happier', 'I feel happier today.'],
        ['expensive', 'more expensive', 'The hotel is more expensive.'],
        ['interesting', 'more interesting', 'This book is more interesting.'],
        ['good', 'better', 'Your English is getting better!'],
        ['bad', 'worse', 'The traffic is worse today.'],
      ],
    },
    {
      heading: 'Comparativos irregulares: good, bad, far',
      paragraphs: [
        'Tres adjetivos tienen formas irregulares que debes memorizar: good→better (no "gooder" ni "more good"), bad→worse (no "badder" ni "more bad"), far→farther/further (ambas formas son correctas).',
        '"Better" es uno de los comparativos más usados en inglés: "This solution is better than the previous one." / "I\'m feeling better today, thanks."',
      ],
    },
    {
      heading: 'Otras estructuras comparativas útiles',
      paragraphs: [
        'Para expresar igualdad: as + adjetivo + as. "She is as tall as her sister." / "This test is as difficult as the last one."',
        'Para expresar diferencia negativa: not as + adjetivo + as. "This restaurant is not as expensive as I thought." / "The film wasn\'t as good as the book."',
        'Para intensificar: much/a lot + comparativo. "This car is much more expensive than mine." / "He runs a lot faster than me."',
      ],
    },
    {
      heading: 'Errores comunes de hispanohablantes',
      paragraphs: [
        'El error más frecuente es usar "more" con adjetivos cortos: "more big" en lugar de "bigger". Recuerda: si el adjetivo tiene una sílaba, siempre usa -er.',
        'También es común confundir "than" con "then". "Than" es para comparaciones: "better than me". "Then" es para secuencias de tiempo: "First I went home, then I cooked dinner."',
        'Otro error: "She is more intelligent that her brother" — la conjunción correcta es "than", no "that".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Adjetivos comparativos -er/more + than en contextos A2.',
    graphicPrompt: 'Comparaciones visuales entre personas, objetos y lugares.',
    scene: [
      ['Madrid is bigger than Seville.', 'Madrid es más grande que Sevilla.'],
      ['This phone is more expensive than that one.', 'Este teléfono es más caro que ese.'],
      ['She\'s taller than her sister.', 'Ella es más alta que su hermana.'],
      ['Summer is hotter than spring.', 'El verano es más caluroso que la primavera.'],
      ['My new job is better than the old one.', 'Mi nuevo trabajo es mejor que el anterior.'],
      ['Today\'s homework is easier than yesterday\'s.', 'La tarea de hoy es más fácil que la de ayer.'],
      ['Trains are more comfortable than buses.', 'Los trenes son más cómodos que los autobuses.'],
      ['Is the new restaurant more expensive?', '¿Es más caro el nuevo restaurante?'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['-er vs more', 'CVC doubling in comparatives', 'than vs then', 'good→better, bad→worse'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el comparativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el comparativo correcto para cada adjetivo.',
        type: 'choice',
        items: [
          {
            scene: 'Comparando ciudades',
            lines: [['', 'London is ___ than Manchester.']],
            options: ['bigger', 'more big', 'biger', 'most big'],
            answer: 'bigger',
            explain: '"Big" = CVC de 1 sílaba → duplica g + er: bigger.',
          },
          {
            scene: 'Hablando de tecnología',
            lines: [['', 'The new laptop is ___ than the old model.']],
            options: ['more powerful', 'powerfuler', 'more powerfuller', 'powerfull'],
            answer: 'more powerful',
            explain: '"Powerful" = 3 sílabas → usa "more": more powerful.',
          },
          {
            scene: 'Comparando el tiempo',
            lines: [['', 'January is ___ than April in northern Europe.']],
            options: ['colder', 'more cold', 'coldder', 'most cold'],
            answer: 'colder',
            explain: '"Cold" = 1 sílaba → añade -er: colder.',
          },
          {
            scene: 'Hablando de trabajo',
            lines: [['', 'This new project is ___ than the previous one.']],
            options: ['more interesting', 'interestinger', 'more intersting', 'interestingest'],
            answer: 'more interesting',
            explain: '"Interesting" = 4 sílabas → "more interesting".',
          },
          {
            scene: 'Comparando personas',
            lines: [['', 'My sister is ___ than me at math.']],
            options: ['better', 'more good', 'gooder', 'best'],
            answer: 'better',
            explain: '"Good" es irregular → comparativo: better (nunca "more good").',
          },
          {
            scene: 'El tiempo esta semana',
            lines: [['', 'The weather today is ___ than yesterday.']],
            options: ['worse', 'more bad', 'badder', 'worst'],
            answer: 'worse',
            explain: '"Bad" es irregular → comparativo: worse (nunca "more bad").',
          },
          {
            scene: 'Hablando de exámenes',
            lines: [['', 'The second exam was ___ than the first.']],
            options: ['easier', 'more easy', 'easyer', 'easiest'],
            answer: 'easier',
            explain: '"Easy" termina en -y → cambia a -ier: easier.',
          },
          {
            scene: 'Comparando restaurantes',
            lines: [['', 'The Italian restaurant is ___ than the fast food place.']],
            options: ['more expensive', 'expensiver', 'more expensiver', 'expensivest'],
            answer: 'more expensive',
            explain: '"Expensive" = 3 sílabas → "more expensive".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Comparativo completo',
        tag: '2 espacios',
        intro: 'Completa el comparativo y la conjunción correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de transporte',
            lines: [['', 'The subway is [[0]] [[1]] the bus in this city.']],
            blanks: [
              { options: ['faster', 'more fast', 'fastest', 'fast'], answer: 'faster', explain: '"Fast" = 1 sílaba → faster.' },
              { options: ['than', 'that', 'then', 'as'], answer: 'than', explain: '"Than" conecta los dos elementos en una comparación.' },
            ],
          },
          {
            scene: 'Eligiendo un hotel',
            lines: [['', 'The city center hotel is [[0]] [[1]] the one near the airport.']],
            blanks: [
              { options: ['more convenient', 'convenienter', 'most convenient', 'convenientest'], answer: 'more convenient', explain: '"Convenient" = 3 sílabas → "more convenient".' },
              { options: ['than', 'that', 'then', 'as'], answer: 'than', explain: 'Comparación → "than".' },
            ],
          },
          {
            scene: 'Progreso en inglés',
            lines: [['', 'My English is [[0]] [[1]] it was six months ago.']],
            blanks: [
              { options: ['better', 'more good', 'gooder', 'best'], answer: 'better', explain: '"Good" → irregular: better.' },
              { options: ['than', 'that', 'then', 'as'], answer: 'than', explain: 'Comparación → "than".' },
            ],
          },
          {
            scene: 'Comparando apartamentos',
            lines: [['', 'The new apartment is [[0]] but [[1]] than the old one.']],
            blanks: [
              { options: ['bigger', 'more big', 'biger', 'biggest'], answer: 'bigger', explain: '"Big" → CVC → bigger.' },
              { options: ['more expensive', 'expensiver', 'most expensive', 'expensive'], answer: 'more expensive', explain: '"Expensive" = 3 sílabas → "more expensive".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Eligiendo entre opciones',
        tag: 'Texto guiado',
        intro: 'Completa el texto comparando dos ciudades con los comparativos correctos.',
        type: 'guidedText',
        scene: 'Completa el texto comparando dos ciudades con los comparativos correctos.',
        text: 'I recently moved from a small town to a big city. Life here is very different. The city is [[0]] (big) than my hometown, of course, but it\'s also [[1]] (noisy). The public transport is much [[2]] (good) — I don\'t need a car. Food options are [[3]] (varied) here than back home. However, my apartment is [[4]] (small) than my old house, and rent is [[5]] (expensive). Still, I think the city is [[6]] (exciting) than living in a small town.',
        blanks: [
          { options: ['bigger', 'more big', 'biger', 'most big'], answer: 'bigger', explain: '"Big" → CVC → bigger.' },
          { options: ['noisier', 'more noisy', 'noisyer', 'noisiest'], answer: 'noisier', explain: '"Noisy" termina en -y → noisier.' },
          { options: ['better', 'more good', 'gooder', 'best'], answer: 'better', explain: '"Good" → better (irregular).' },
          { options: ['more varied', 'variedder', 'varieder', 'most varied'], answer: 'more varied', explain: '"Varied" = 2 sílabas → "more varied".' },
          { options: ['smaller', 'more small', 'smaler', 'smallest'], answer: 'smaller', explain: '"Small" → smaller.' },
          { options: ['more expensive', 'expensiver', 'most expensive', 'expensivest'], answer: 'more expensive', explain: '"Expensive" → more expensive.' },
          { options: ['more exciting', 'excitinger', 'most exciting', 'excitingest'], answer: 'more exciting', explain: '"Exciting" → more exciting.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma el comparativo',
        tag: 'Texto libre',
        intro: 'Escribe el comparativo del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Escribe el comparativo del adjetivo entre paréntesis.',
        text: 'My new phone is [[0]] (fast) than my old one. The screen is [[1]] (large) and the camera is [[2]] (good). However, the battery life is [[3]] (bad) — it runs out faster. The price was also [[4]] (high) than I expected, but I\'m [[5]] (happy) with it.',
        blanks: [
          { answer: 'faster', accepted: ['faster'], explain: '"Fast" → faster.' },
          { answer: 'larger', accepted: ['larger'], explain: '"Large" termina en -e → larger.' },
          { answer: 'better', accepted: ['better'], explain: '"Good" → better (irregular).' },
          { answer: 'worse', accepted: ['worse'], explain: '"Bad" → worse (irregular).' },
          { answer: 'higher', accepted: ['higher'], explain: '"High" → higher.' },
          { answer: 'happier', accepted: ['happier'], explain: '"Happy" → -ier: happier.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones comparativas sobre tu vida, experiencias o entorno.',
        type: 'write',
        items: [
          {
            scene: 'Comparando dos cosas que conoces',
            prompt: 'Compara dos ciudades, países o lugares que conozcas.',
            answer: 'Bogotá is much bigger than Medellín.',
            accepted: ['bigger', 'smaller', 'more', 'better', 'worse', 'more interesting', 'more expensive', 'more beautiful', 'colder', 'hotter', 'quieter'],
            explain: 'Ejemplo: Paris is more expensive than Madrid. / The beach is more relaxing than the mountains.',
          },
          {
            scene: 'Tu progreso',
            prompt: 'Escribe cómo algo en tu vida está mejor ahora que antes (usa "better than").',
            answer: 'My English is much better than it was last year.',
            accepted: ['better than', 'more than', 'easier than', 'faster than', 'healthier than'],
            explain: 'Ejemplo: I\'m healthier than I was two years ago. / My cooking is better than before.',
          },
          {
            scene: 'Comparando opciones',
            prompt: 'Compara dos formas de transporte (tren, carro, autobús, avión, etc.).',
            answer: 'Trains are more comfortable than buses but more expensive.',
            accepted: ['more comfortable', 'faster', 'more expensive', 'cheaper', 'better', 'worse', 'more convenient', 'slower'],
            explain: 'Ejemplo: Flying is faster than driving. / The bus is cheaper than the train.',
          },
          {
            scene: 'Hablando de películas o series',
            prompt: 'Compara dos películas o series que hayas visto recientemente.',
            answer: 'The second season was more exciting than the first.',
            accepted: ['more exciting', 'better', 'worse', 'more interesting', 'funnier', 'longer', 'shorter', 'more boring'],
            explain: 'Ejemplo: The sequel was better than the original. / The documentary was more interesting than the film.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El mejor y el peor',
        tag: 'Producción libre',
        intro: 'Compara experiencias reales tuyas. Escribe 3 comparaciones con adjetivos diferentes.',
        type: 'write',
        items: [
          {
            scene: 'Tu experiencia',
            prompt: 'Compara dos trabajos, estudios o actividades que hayas tenido (usa un comparativo de 1 sílaba).',
            answer: 'My current job is harder than my previous one, but better paid.',
            accepted: ['harder', 'easier', 'better', 'worse', 'longer', 'shorter', 'faster', 'slower', 'bigger', 'smaller'],
            explain: 'Usa adjetivos cortos: hard→harder, long→longer, good→better, bad→worse.',
          },
          {
            scene: 'Tu experiencia',
            prompt: 'Compara dos lugares donde hayas vivido o visitado (usa "more" + adjetivo largo).',
            answer: 'The capital was more expensive but more entertaining than my hometown.',
            accepted: ['more expensive', 'more interesting', 'more comfortable', 'more exciting', 'more relaxing', 'more convenient', 'more beautiful', 'more crowded'],
            explain: 'Usa "more" con adjetivos de 3+ sílabas: more comfortable, more interesting, more expensive.',
          },
          {
            scene: 'Tu experiencia',
            prompt: 'Di algo que hacías mejor o peor antes que ahora (usa "better"/"worse than before").',
            answer: 'I\'m much better at managing my time now than I was in school.',
            accepted: ['better than', 'worse than', 'more than', 'faster than', 'healthier than', 'happier than'],
            explain: 'Ejemplo: I cook much better now than when I was 20. / I\'m less stressed now than last year.',
          },
        ],
      },
    ],
  },
}

export default topic
