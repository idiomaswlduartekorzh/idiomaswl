import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'passive-voice-b1',
  order: '09',
  color: '#dc2626',
  category: 'Structure',
  level: 'B1',
  title: 'Voz Pasiva en Inglés B1 — Present y Past Simple Passive',
  shortTitle: 'Passive Voice',
  metaTitle: 'Voz Pasiva B1 — Am/Is/Are/Was/Were + Past Participle en Inglés',
  description:
    'La voz pasiva en inglés (am/is/are/was/were + participio pasado) cambia el foco de la oración: el objeto de la acción se convierte en el sujeto. En nivel B1 dominas el presente y pasado simple pasivo, el uso opcional de "by + agente" y los contextos donde la pasiva es preferida: textos formales, reportajes, ciencia e instrucciones.',
  lead: 'Aprende a transformar oraciones activas en pasivas y a usarlas correctamente en textos formales, noticias y descripciones de procesos.',
  outcomes: [
    'Forma el presente simple pasivo con am/is/are + participio pasado',
    'Forma el pasado simple pasivo con was/were + participio pasado',
    'Usa "by + agente" correctamente y sabe cuándo omitirlo',
    'Identifica cuándo usar la pasiva: foco en el objeto, agente desconocido o irrelevante',
  ],

  guide: {
    goal: 'Usar la voz pasiva en presente y pasado para cambiar el foco de una oración y escribir textos formales con naturalidad.',
    model: 'The report is written by the manager. / The castle was built in 1420. / English is spoken in over 50 countries.',
    formula: 'Subject + am/is/are (present) or was/were (past) + past participle [+ by + agent]',
    decisions: [
      'Presente simple pasivo: am/is/are + participio → "Coffee is grown in Colombia." / "The results are checked every day."',
      'Pasado simple pasivo: was/were + participio → "The bridge was built in 1890." / "The emails were sent this morning."',
      'Por/By + agente: añade quién hizo la acción (solo si es relevante o nuevo) → "The poem was written by García Lorca."',
      'Omite el agente si es desconocido, irrelevante o general → "My bike was stolen." (no sabemos quién) / "The store is closed at 8." (es una norma general).',
      'Cuándo usar pasiva: (1) el agente es desconocido/irrelevante, (2) el objeto de la acción es más importante, (3) estilo formal, académico o de noticias.',
      'Preguntas en pasiva: Is/Are/Was/Were + subject + past participle? → "Was the letter sent?" / "Are the tickets included?"',
    ],
    table: [
      ['Tiempo', 'Estructura', 'Ejemplo'],
      ['Present simple passive', 'am/is/are + past participle', 'The results are announced today.'],
      ['Past simple passive', 'was/were + past participle', 'The building was designed in 1900.'],
      ['Negative', 'is not / was not + past participle', 'The report wasn\'t finished on time.'],
    ],
    mistakes: [
      '"The book was wrote by Márquez" ❌ → "The book was written by Márquez" ✓ — usa el participio pasado, no el pasado simple.',
      '"It is build in 1950" ❌ → "It was built in 1950" ✓ — fecha histórica → pasado (was/were), no presente.',
      '"The car is driven by he" ❌ → "The car is driven by him" ✓ — after "by" usa pronombre objeto (him, her, them, us).',
    ],
  },

  seo: [
    {
      heading: '¿Qué es la voz pasiva y para qué sirve?',
      paragraphs: [
        'En una oración activa, el sujeto realiza la acción: "The chef cooked the meal." En la voz pasiva, el objeto de esa acción se convierte en el sujeto: "The meal was cooked by the chef." El foco cambia: ahora nos interesa más "the meal" que "the chef".',
        'La pasiva no es simplemente una variación estilística — tiene una función comunicativa clara. La usas cuando el agente (quien hace la acción) es desconocido, obvio o poco importante, y cuando el objeto de la acción merece el foco de la oración.',
      ],
    },
    {
      heading: 'Cómo se forma: presente y pasado simple pasivo',
      paragraphs: [
        'Presente simple pasivo: am/is/are + participio pasado. El auxiliar (am/is/are) concuerda con el nuevo sujeto (el objeto original). "English is taught in most schools." / "The tests are corrected automatically." / "I am paid monthly."',
        'Pasado simple pasivo: was/were + participio pasado. Was para I/he/she/it; were para you/we/they. "The Eiffel Tower was built in 1889." / "The reports were submitted last week." / "A new law was passed yesterday."',
      ],
      table: [
        ['Activa', 'Pasiva presente', 'Pasiva pasado'],
        ['Someone cleans the office.', 'The office is cleaned.', 'The office was cleaned.'],
        ['They speak Spanish here.', 'Spanish is spoken here.', 'Spanish was spoken here.'],
        ['Workers built the bridge.', 'The bridge is (now) built.', 'The bridge was built.'],
      ],
    },
    {
      heading: 'By + agente: cuándo incluirlo y cuándo omitirlo',
      paragraphs: [
        'El agente (quien realiza la acción) puede añadirse con "by" si es importante o nuevo para el lector: "The Sistine Chapel was painted by Michelangelo." Aquí Michelangelo es la información nueva y relevante.',
        'Pero en muchos contextos el agente se omite: "My car was stolen." (No sabemos quién.) / "The building was closed due to a fire." (Es obvio que fue la autoridad.) / "The results are published every month." (Es una norma general; quién lo hace no importa.) Incluir el agente cuando es obvio suena torpe: evita "The window was broken by someone."',
      ],
    },
    {
      heading: 'La pasiva en textos formales, noticias y ciencia',
      paragraphs: [
        'La voz pasiva es mucho más frecuente en inglés académico, científico y periodístico que en la conversación cotidiana. En ciencia se usa para describir procesos objetivamente: "The samples were collected and analyzed." / "The results were recorded every 24 hours." El foco está en el proceso, no en los investigadores.',
        'En noticias y reportajes la pasiva evita comprometer al reportero: "Three people were arrested." / "A new vaccine has been developed." / "The decision was made at the highest level." Para el IELTS Academic Writing Task 1, la pasiva es esencial para describir procesos y diagramas.',
      ],
    },
    {
      heading: 'Participios pasados irregulares más frecuentes en pasiva',
      paragraphs: [
        'Para usar la pasiva correctamente debes conocer los participios pasados irregulares más comunes. Algunos de los más frecuentes: write → written, build → built, make → made, break → broken, give → given, take → taken, know → known, find → found, see → seen, speak → spoken, sell → sold, send → sent.',
        'Un error muy común es usar el pasado simple en lugar del participio: "It was wrote" en lugar de "It was written." El auxiliar was/were ya indica el tiempo — el participio nunca cambia: siempre written, built, made, no matter the person.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Transformación de activa a pasiva en contextos formales, noticias y descripciones de procesos.',
    graphicPrompt: 'Diagrama de flecha de oración activa a pasiva con sujeto y objeto intercambiados.',
    scene: [
      ['English is spoken in over 80 countries.', 'El inglés se habla en más de 80 países.'],
      ['The report was submitted yesterday morning.', 'El informe fue entregado ayer por la mañana.'],
      ['A new hospital is being built near the city center.', 'Se está construyendo un nuevo hospital cerca del centro.'],
      ['The ancient temple was built over 2,000 years ago.', 'El templo antiguo fue construido hace más de 2.000 años.'],
      ['Are tourists allowed to enter without a guide?', '¿Se permite la entrada a turistas sin guía?'],
      ['Three suspects were arrested last night.', 'Tres sospechosos fueron arrestados anoche.'],
      ['The new policy was announced by the president.', 'La nueva política fue anunciada por el presidente.'],
      ['These products are manufactured in Colombia.', 'Estos productos se fabrican en Colombia.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['make', 'build', 'write', 'speak', 'find', 'sell', 'send', 'teach', 'give', 'know'],
    reviewFocus: ['am/is/are + past participle', 'was/were + past participle', 'by + agent optional'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma pasiva correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma pasiva correcta para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Una ciudad histórica',
            lines: [['', 'This cathedral ___ in the 15th century.']],
            options: ['was built', 'is built', 'built', 'were built'],
            answer: 'was built',
            explain: 'Pasado simple pasivo: "This cathedral" (singular) → was built. La catedral fue construida en el siglo XV.',
          },
          {
            scene: 'Un proceso de fábrica',
            lines: [['', 'These cars ___ in South Korea.']],
            options: ['are manufactured', 'is manufactured', 'manufactured', 'was manufactured'],
            answer: 'are manufactured',
            explain: 'Presente simple pasivo: "these cars" (plural) → are manufactured. Producción habitual → presente.',
          },
          {
            scene: 'Una noticia',
            lines: [['', 'Two people ___ in the accident last night.']],
            options: ['were injured', 'are injured', 'injured', 'was injured'],
            answer: 'were injured',
            explain: 'Pasado simple pasivo: "two people" (plural) → were injured. Acontecimiento pasado en una noticia.',
          },
          {
            scene: 'Instrucciones del producto',
            lines: [['', 'This device ___ in a dry, cool place.']],
            options: ['should be stored', 'should stored', 'is store', 'was storing'],
            answer: 'should be stored',
            explain: 'Modal + pasiva: should + be + past participle → should be stored. Instrucción de almacenamiento.',
          },
          {
            scene: 'Literatura famosa',
            lines: [['', '"Don Quixote" ___ by Miguel de Cervantes.']],
            options: ['was written', 'wrote', 'is written', 'were written'],
            answer: 'was written',
            explain: 'Pasado simple pasivo con agente → was written by. Cervantes es la información nueva e importante.',
          },
          {
            scene: 'Ciencia en el aula',
            lines: [['', 'The experiment ___ three times to confirm the results.']],
            options: ['was repeated', 'repeated', 'is repeated', 'were repeated'],
            answer: 'was repeated',
            explain: 'Pasado simple pasivo: "the experiment" (singular) → was repeated. Contexto científico, foco en el proceso.',
          },
          {
            scene: 'Correo de empresa',
            lines: [['', 'All invoices ___ by the accounting department before payment.']],
            options: ['are checked', 'is checked', 'checked', 'were checked'],
            answer: 'are checked',
            explain: 'Presente simple pasivo (proceso habitual): "all invoices" (plural) → are checked.',
          },
          {
            scene: 'Una pregunta de turista',
            lines: [['', '___ credit cards accepted in this shop?']],
            options: ['Are', 'Is', 'Were', 'Was'],
            answer: 'Are',
            explain: 'Pregunta en presente pasivo: Are + plural subject + past participle? → Are credit cards accepted?',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Activa a pasiva en contexto',
        tag: '2 espacios',
        intro: 'Transforma la información en pasiva completando los dos espacios.',
        type: 'dual',
        items: [
          {
            scene: 'Transformar: activa → pasiva',
            lines: [['Activa:', 'Workers build these shoes by hand.'], ['Pasiva:', 'These shoes [[0]] [[1]] by hand.']],
            blanks: [
              { options: ['are', 'is', 'were', 'was'], answer: 'are', explain: '"These shoes" es plural → are (presente simple pasivo).' },
              { options: ['built', 'build', 'building', 'built up'], answer: 'built', explain: 'Build → built (participio pasado irregular). Se necesita el participio, no el pasado simple.' },
            ],
          },
          {
            scene: 'Noticia del periódico',
            lines: [['', 'A famous painting [[0]] from the museum last night. The thieves [[1]] by police the following morning.']],
            blanks: [
              { options: ['was stolen', 'is stolen', 'stole', 'were stolen'], answer: 'was stolen', explain: '"A famous painting" (singular) + pasado → was stolen.' },
              { options: ['were caught', 'was caught', 'caught', 'are caught'], answer: 'were caught', explain: '"The thieves" (plural) + pasado → were caught.' },
            ],
          },
          {
            scene: 'Hecho histórico',
            lines: [['', 'The telephone [[0]] by Alexander Graham Bell in 1876. The first call [[1]] to his assistant, Watson.']],
            blanks: [
              { options: ['was invented', 'is invented', 'invented', 'were invented'], answer: 'was invented', explain: '"The telephone" (singular) + pasado histórico → was invented.' },
              { options: ['was made', 'is made', 'made', 'were made'], answer: 'was made', explain: '"The first call" (singular) + pasado → was made. Make → made (participio irregular).' },
            ],
          },
          {
            scene: 'Proceso de producción',
            lines: [['', 'First, the coffee beans [[0]] carefully by hand. Then they [[1]] and packaged.']],
            blanks: [
              { options: ['are selected', 'is selected', 'select', 'were selected'], answer: 'are selected', explain: '"The coffee beans" (plural) + proceso habitual → are selected (presente pasivo).' },
              { options: ['are roasted', 'is roasted', 'roasted', 'were roasted'], answer: 'are roasted', explain: '"They" (plural) + proceso habitual → are roasted.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Producción de café colombiano',
        tag: 'Texto guiado',
        intro: 'Completa la descripción del proceso de producción de café eligiendo la forma pasiva correcta.',
        type: 'guidedText',
        scene: 'Elige la forma pasiva correcta para describir el proceso.',
        text: 'Colombian coffee is known worldwide for its quality. The coffee plants [[0]] (grow) on mountain slopes at high altitude. The ripe cherries [[1]] (pick) by hand — this is what makes Colombian coffee special. After harvesting, the beans [[2]] (remove) from the fruit and [[3]] (wash) in clean water. Then they [[4]] (dry) in the sun for several days. Finally, the beans [[5]] (sort) by size and quality and [[6]] (export) to more than 60 countries around the world.',
        blanks: [
          { options: ['are grown', 'is grown', 'grow', 'were grown'], answer: 'are grown', explain: '"The coffee plants" (plural) + proceso habitual → are grown.' },
          { options: ['are picked', 'is picked', 'picked', 'were picked'], answer: 'are picked', explain: '"The ripe cherries" (plural) + proceso habitual → are picked.' },
          { options: ['are removed', 'is removed', 'remove', 'were removed'], answer: 'are removed', explain: '"The beans" (plural) + proceso habitual → are removed.' },
          { options: ['washed', 'are washed', 'is washed', 'were washed'], answer: 'are washed', explain: 'Continuando la serie de procesos habituales → are washed.' },
          { options: ['are dried', 'is dried', 'dry', 'were dried'], answer: 'are dried', explain: '"They" (plural) + proceso habitual → are dried.' },
          { options: ['are sorted', 'is sorted', 'sort', 'sorted'], answer: 'are sorted', explain: '"The beans" (plural) + proceso habitual → are sorted.' },
          { options: ['exported', 'are exported', 'is exported', 'were exported'], answer: 'are exported', explain: 'Último paso del proceso: are exported. Plural → are.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Transforma y completa',
        tag: 'Texto libre',
        intro: 'Escribe la forma pasiva correcta (presente o pasado) para cada verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Transforma la información dada a voz pasiva.',
        text: 'The WeLearn building has an interesting history. It [[0]] (design) by a famous local architect in 1975. The original walls [[1]] (make) of traditional stone. Today, the building [[2]] (use) as a language academy. New technologies [[3]] (install) every year to improve the learning experience. Last month, new interactive boards [[4]] (add) to every classroom.',
        blanks: [
          { answer: 'was designed', accepted: ['was designed'], explain: 'Pasado simple pasivo: "it" (singular) + fecha en el pasado → was designed.' },
          { answer: 'were made', accepted: ['were made'], explain: '"The original walls" (plural) + pasado → were made. Make → made (irregular).' },
          { answer: 'is used', accepted: ['is used'], explain: '"The building" (singular) + uso habitual presente → is used.' },
          { answer: 'are installed', accepted: ['are installed'], explain: '"New technologies" (plural) + presente habitual → are installed.' },
          { answer: 'were added', accepted: ['were added'], explain: '"New interactive boards" (plural) + pasado (last month) → were added.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas en voz pasiva usando los datos e instrucciones dados.',
        type: 'write',
        items: [
          {
            scene: 'Un hecho histórico',
            prompt: 'Escribe una oración sobre cuándo fue construido o fundado un lugar famoso en tu país (usa was/were + participio).',
            answer: 'The Gold Museum in Bogotá was opened in 1968.',
            accepted: ['was built', 'was founded', 'was opened', 'was created', 'was established', 'was constructed'],
            explain: 'Ejemplo: The cathedral was built in the 16th century. / The national park was founded in 1952.',
          },
          {
            scene: 'Una norma o proceso',
            prompt: 'Describe algo que se hace regularmente en tu trabajo o escuela usando presente simple pasivo (is/are + participio).',
            answer: 'Homework is checked every Monday by the teacher.',
            accepted: ['is checked', 'are checked', 'is reviewed', 'are reviewed', 'is taught', 'are given', 'is done', 'are sent'],
            explain: 'Ejemplo: Reports are submitted every Friday. / English is taught from primary school.',
          },
          {
            scene: 'Una noticia reciente',
            prompt: 'Escribe una oración sobre algo que ocurrió recientemente en tu ciudad o país, en voz pasiva (was/were + participio).',
            answer: 'A new metro line was opened in Bogotá last year.',
            accepted: ['was opened', 'were injured', 'was announced', 'were arrested', 'was built', 'was launched', 'was elected'],
            explain: 'Ejemplo: Three suspects were arrested last week. / A new stadium was built for the games.',
          },
          {
            scene: 'Descripción de producto',
            prompt: 'Escribe dónde se fabrica o hace algo que usas a diario (usa is/are + made/produced/manufactured).',
            answer: 'My phone is made in South Korea.',
            accepted: ['is made', 'are made', 'is produced', 'are produced', 'is manufactured', 'are manufactured', 'is grown', 'is sold'],
            explain: 'Ejemplo: These shoes are made in Italy. / Coffee is grown in the mountains of Colombia.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Describe un proceso',
        tag: 'Producción libre',
        intro: 'Elige un proceso que conoces (hacer chocolate, reciclar papel, hacer café) y descríbelo en 3 pasos usando voz pasiva.',
        type: 'write',
        items: [
          {
            scene: 'Paso 1 del proceso',
            prompt: 'Escribe el primer paso del proceso en voz pasiva (presente simple: is/are + participio).',
            answer: 'First, the cocoa beans are collected from the trees.',
            accepted: ['are collected', 'are picked', 'are harvested', 'are gathered', 'are selected', 'is collected', 'is prepared', 'are cut'],
            explain: 'Ejemplo: First, the raw material is collected. / The grapes are harvested in autumn.',
          },
          {
            scene: 'Paso 2 del proceso',
            prompt: 'Escribe el segundo paso usando un participio diferente (is/are + participio).',
            answer: 'Then, the beans are roasted at a high temperature.',
            accepted: ['are roasted', 'are cleaned', 'are washed', 'are dried', 'are crushed', 'are mixed', 'are processed', 'is processed', 'are ground'],
            explain: 'Ejemplo: Then, the material is processed in a machine. / The beans are ground into powder.',
          },
          {
            scene: 'Paso 3 del proceso',
            prompt: 'Escribe el paso final del proceso (can also use "finally" + is/are + participio).',
            answer: 'Finally, the chocolate is packed and sold in stores around the world.',
            accepted: ['is packed', 'are packed', 'is sold', 'are sold', 'is bottled', 'are bottled', 'is shipped', 'are shipped', 'is distributed', 'is sent'],
            explain: 'Ejemplo: Finally, the product is packaged and delivered. / The finished goods are shipped to retailers.',
          },
        ],
      },
    ],
  },
}

export default topic
