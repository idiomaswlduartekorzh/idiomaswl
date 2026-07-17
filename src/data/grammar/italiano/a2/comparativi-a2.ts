import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparativi-a2',
  order: '05',
  color: '#009246',
  category: 'Comparativi',
  level: 'A2',
  title: 'Los comparativos en italiano A2 — più, meno, tanto…quanto',
  shortTitle: 'Comparativos',
  metaTitle: 'Comparativos italiano A2 — più/meno/tanto quanto, migliore/peggiore',
  description:
    'Los comparativos permiten comparar personas, cosas o acciones. En italiano se usan più...di/che para "más que", meno...di/che para "menos que" y tanto...quanto para "tan...como". Las formas irregulares más importantes son migliore (mejor), peggiore (peor), maggiore (mayor) y minore (menor).',
  lead: 'più + adj + di/che (más que). meno + adj + di/che (menos que). tanto + adj + quanto (tan…como). Irregulares: buono→migliore, cattivo→peggiore.',
  outcomes: [
    'Usar più...di/che y meno...di/che para comparaciones de superioridad e inferioridad',
    'Aplicar tanto...quanto para comparaciones de igualdad',
    'Distinguir cuándo usar di y cuándo usar che tras el comparativo',
    'Usar migliore, peggiore, maggiore y minore como formas irregulares',
  ],

  guide: {
    goal: 'Comparar personas, objetos y acciones usando los comparativos de mayoría, minoría e igualdad.',
    model: 'Roma è più grande di Milano. / Questa pizza è meno buona di quella. / Marco parla tanto quanto Sofia.',
    formula: 'più/meno + aggettivo/avverbio + di (persona/cosa) oppure che (tra due azioni/aggettivi)',
    decisions: [
      'Superioridad: più + adj + di/che → Roma è più grande di Milano',
      'Inferioridad: meno + adj + di/che → Questo caffè è meno caro di quello',
      'Igualdad: tanto + adj + quanto → Sei alto tanto quanto me',
      'Usa DI antes de un sustantivo o pronombre: più bello di te',
      'Usa CHE antes de un verbo, adjetivo o preposición: è meglio dormire che studiare di notte',
      'Irregulari: buono→migliore, cattivo→peggiore, grande→maggiore, piccolo→minore',
      'Migliore/peggiore ya incluyen el "più": più migliore ✗ → migliore ✓',
    ],
    table: [
      ['Comparativo', 'Forma', 'Ejemplo'],
      ['Superioridad', 'più + adj + di/che', 'L\'Italia è più calda della Norvegia'],
      ['Inferioridad', 'meno + adj + di/che', 'Il treno è meno veloce dell\'aereo'],
      ['Igualdad', 'tanto + adj + quanto', 'Mario è tanto simpatico quanto Luca'],
      ['Irregular buono', 'migliore (mejor)', 'Questa pizza è migliore di quella'],
      ['Irregular cattivo', 'peggiore (peor)', 'Il tempo oggi è peggiore di ieri'],
    ],
    mistakes: [
      'No usar "più migliore": migliore ya significa "más bueno". ✗ più migliore → ✓ migliore',
      'Confundir di y che: usa di antes de sustantivos/pronombres, che antes de verbos/adjetivos',
      'Igualdad: tanto…quanto son invariables con adverbios: canta tanto bene quanto te',
    ],
  },

  seo: [
    {
      heading: 'Cómo comparar en italiano: superioridad, inferioridad e igualdad',
      paragraphs: [
        'Los comparativos en italiano siguen un patrón claro: più para "más", meno para "menos" y tanto…quanto para "tan…como". La clave está en elegir bien entre di y che después del comparativo.',
        'La regla básica: usa di antes de un nombre o pronombre (più alto di me), y che cuando comparas dos acciones, dos adjetivos o una preposición está involucrada (è meglio camminare che prendere il taxi).',
      ],
    },
    {
      heading: 'Formas irregulares: migliore, peggiore, maggiore, minore',
      paragraphs: [
        'Cuatro adjetivos tienen formas comparativas propias: buono→migliore (mejor), cattivo→peggiore (peor), grande→maggiore (mayor), piccolo→minore (menor). Se usan sin più o meno delante.',
        'En el lenguaje cotidiano también se oyen "più buono" y "più cattivo", especialmente para sabores: questa torta è più buona di quella. Pero migliore/peggiore son siempre correctas y preferidas en contextos formales.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a comparar usando più/meno + di/che y las formas irregulares migliore/peggiore.',
    graphicPrompt: 'Dos columnas con objetos comparados, flechas que apuntan a più/meno, tabla di vs che.',
    scene: [
      ['Roma è più grande di Milano.', 'Roma es más grande que Milán.'],
      ['Il caffè è meno caro del vino.', 'El café es menos caro que el vino.'],
      ['Luca è tanto alto quanto Marco.', 'Luca es tan alto como Marco.'],
      ['Questa pizzeria è migliore di quella.', 'Esta pizzería es mejor que aquella.'],
    ],
    learnerModes: ['visual: tabla comparativa', 'analítico: di vs che', 'oral: comparar personas del aula'],
    reviewFocus: ['di vs che tras el comparativo', 'irregulares: migliore/peggiore', 'tanto…quanto invariable'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el comparativo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la opción correcta para completar cada comparación.',
        type: 'choice',
        items: [
          {
            scene: 'Comparando ciudades',
            lines: [['Giulia', 'Milano è ___ Roma? No, è più piccola.']],
            options: ['più grande di', 'meno grande di', 'tanto grande quanto', 'più grande che'],
            answer: 'meno grande di',
            explain: 'Milán es menos grande que Roma: meno grande di (inferioridad con sustantivo → di).',
          },
          {
            scene: 'El café o el vino',
            lines: [['Marco', 'Il caffè è ___ il vino in Italia.']],
            options: ['più economico di', 'più economico che', 'meno economico quanto', 'tanto economico di'],
            answer: 'più economico di',
            explain: 'Comparación con sustantivo (il vino) → di. Più economico di il vino = più economico del vino.',
          },
          {
            scene: 'Actividades',
            lines: [['Sofia', 'È meglio studiare ___ guardare la TV.']],
            options: ['che', 'di', 'quanto', 'come'],
            answer: 'che',
            explain: 'Comparamos dos verbos (studiare vs guardare): usamos che. È meglio studiare che guardare la TV.',
          },
          {
            scene: 'Los hermanos',
            lines: [['David', 'Mio fratello è alto ___ me.']],
            options: ['tanto quanto', 'più di', 'meno che', 'tanto di'],
            answer: 'tanto quanto',
            explain: 'Igualdad: tanto + adj + quanto. Mio fratello è alto tanto quanto me.',
          },
          {
            scene: 'La pizza',
            lines: [['Ana', 'Questa pizza è ___! Non mi piace per niente. (cattiva / irregular)']],
            options: ['peggiore', 'più cattiva', 'meno buona che', 'più peggiore'],
            answer: 'peggiore',
            explain: 'Peggiore es la forma irregular de cattivo (comparativo). No se usa "più peggiore".',
          },
          {
            scene: 'El restaurante',
            lines: [['Luca', "Il ristorante di Marco è ___ di quello vicino a casa mia."]],
            options: ['migliore', 'più buono che', 'meglio di', 'più migliore'],
            answer: 'migliore',
            explain: 'Migliore es la forma comparativa irregular de buono. No se usa "più migliore".',
          },
          {
            scene: 'El tren y el autobús',
            lines: [['Zhanna', 'Il treno è ___ comodo ___ l\'autobus.']],
            options: ['più / di', 'più / che', 'meno / quanto', 'tanto / di'],
            answer: 'più / di',
            explain: 'Superioridad con sustantivo: più comodo di. Il treno è più comodo dell\'autobus.',
          },
          {
            scene: 'Los idiomas',
            lines: [['Carlo', 'L\'italiano è ___ il francese per me.']],
            options: ['più facile di', 'più facile che', 'tanto facile di', 'meno facile quanto'],
            answer: 'più facile di',
            explain: 'Comparación con sustantivo (il francese) → di. Più facile di il francese.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Más o menos / di o che',
        tag: '2 espacios',
        intro: 'Completa con el comparativo correcto y la preposición di o che.',
        type: 'dual',
        items: [
          {
            scene: 'Comparando asignaturas',
            lines: [['Giulia', 'La matematica è [[0]] difficile [[1]] la storia per me.']],
            blanks: [
              { options: ['più', 'meno', 'tanto'], answer: 'più', explain: 'Las matemáticas son más difíciles: superioridad → più.' },
              { options: ['di', 'che', 'quanto'], answer: 'di', explain: 'Comparación con sustantivo (la storia) → di.' },
            ],
          },
          {
            scene: 'Ciudades italianas',
            lines: [['Marco', 'Venezia è [[0]] bella [[1]] ho immaginato!']],
            blanks: [
              { options: ['più', 'meno', 'tanto'], answer: 'più', explain: 'Venecia es más bella: superioridad → più.' },
              { options: ['di', 'che', 'quanto'], answer: 'di', explain: 'Que + frase verbal → che. Ho immaginato es verbo.' },
            ],
          },
          {
            scene: 'Dos actividades',
            lines: [['Sofia', 'È [[0]] stancante camminare [[1]] correre.']],
            blanks: [
              { options: ['meno', 'più', 'tanto'], answer: 'meno', explain: 'Caminar cansa menos: inferioridad → meno.' },
              { options: ['che', 'di', 'quanto'], answer: 'che', explain: 'Comparamos dos verbos (camminare vs correre) → che.' },
            ],
          },
          {
            scene: 'Los amigos',
            lines: [['David', 'Luca parla [[0]] velocemente [[1]] Carlo.']],
            blanks: [
              { options: ['tanto', 'più', 'meno'], answer: 'tanto', explain: 'Igualdad: tanto…quanto. Hablan igual de rápido.' },
              { options: ['quanto', 'di', 'che'], answer: 'quanto', explain: 'Igualdad con avverbio: tanto velocemente quanto.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La guía de viaje',
        tag: 'Texto guiado',
        intro: 'Completa la guía de viaje con los comparativos correctos.',
        type: 'guidedText',
        scene: 'Una guía turística compara dos ciudades italianas',
        text: 'Roma è [[0]] grande [[1]] Firenze. Il Colosseo è [[2]] famoso del Duomo di Firenze? Dipende! I prezzi dei ristoranti a Roma sono [[3]] cari di quelli a Firenze. Ma Firenze è [[4]] romantica di Roma? Molti turisti pensano di sì.',
        blanks: [
          { options: ['più', 'meno', 'tanto'], answer: 'più', explain: 'Roma es más grande: superioridad → più.' },
          { options: ['di', 'che', 'quanto'], answer: 'di', explain: 'Comparación con sustantivo (Firenze) → di.' },
          { options: ['più', 'meno', 'tanto'], answer: 'più', explain: 'El Coliseo es más famoso: superioridad → più.' },
          { options: ['meno', 'più', 'tanto'], answer: 'più', explain: 'Los precios son más caros: superioridad → più.' },
          { options: ['più', 'meno', 'tanto'], answer: 'più', explain: 'Florencia es más romántica: superioridad → più.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma comparativa correcta (más, menos o igual).',
        type: 'freeText',
        scene: 'Marco compara su vida antes y ahora',
        text: 'Adesso lavoro [[0]] di prima. (meno) Studio [[1]] ore [[2]] prima però imparo [[3]]. (le stesse / di / di più) La mia vita è [[4]] interessante di quella di mio fratello.',
        blanks: [
          { answer: 'meno', explain: 'Ahora trabaja menos: meno.' },
          { answer: 'le stesse', explain: 'Las mismas horas: le stesse (igualdad con sustantivo).' },
          { answer: 'di', explain: 'Comparación con "prima" → di.' },
          { answer: 'di più', explain: 'Aprendo más: di più (comparativo de quantità).' },
          { answer: 'più', explain: 'Su vida es más interesante: superioridad → più.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construcciones comparativas',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa usando el comparativo indicado.',
        type: 'write',
        items: [
          {
            scene: 'Comparando comida',
            prompt: 'La pasta ___ buona ___ la pizza per me. (igual)',
            answer: 'La pasta è tanto buona quanto la pizza per me.',
            accepted: ['la pasta è tanto buona quanto la pizza', 'la pasta è buona quanto la pizza'],
            explain: 'Igualdad: tanto + buona + quanto. La pasta è tanto buona quanto la pizza.',
          },
          {
            scene: 'Los idiomas',
            prompt: "Il coreano è ___ difficile ___ l'italiano per me. (más)",
            answer: "Il coreano è più difficile dell'italiano per me.",
            accepted: ["il coreano è più difficile dell'italiano", 'il coreano è più difficile di italiano'],
            explain: "Superioridad con sustantivo → più difficile di. Di + l'italiano = dell'italiano.",
          },
          {
            scene: 'El restaurant',
            prompt: 'Questo ristorante è ___. (mejor que ayer)',
            answer: 'Questo ristorante è migliore di ieri.',
            accepted: ['questo ristorante è migliore di ieri', 'questo ristorante è migliore'],
            explain: 'Migliore = mejor (forma irregular de buono). Migliore di ieri.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Comparaciones libres',
        tag: 'Escritura libre',
        intro: 'Escribe tus propias comparaciones en italiano usando più/meno/tanto…quanto.',
        type: 'write',
        items: [
          {
            scene: 'Tu país y otro país',
            prompt: 'Il mio paese è... (compara con otro país usando più/meno + adjetivo)',
            answer: "Il mio paese è più caldo dell'Italia ma meno grande degli Stati Uniti.",
            accepted: ['più', 'meno', 'migliore', 'peggiore'],
            explain: 'Usa più/meno + adjetivo + di + nombre del país.',
          },
          {
            scene: 'Dos actividades',
            prompt: 'Per me è più/meno... (compara dos actividades usando che)',
            answer: 'Per me è più rilassante leggere che guardare la TV.',
            accepted: ['è più', 'è meno', 'che'],
            explain: 'Comparar dos verbos/actividades → è più/meno + adj + che + verbo.',
          },
          {
            scene: 'Personas de tu vida',
            prompt: 'Mio/a ___ è tanto... quanto... (compara dos personas)',
            answer: 'Mia sorella è tanto simpatica quanto mia madre.',
            accepted: ['tanto', 'quanto'],
            explain: 'Igualdad: tanto + adjetivo + quanto + nombre/pronombre.',
          },
        ],
      },
    ],
  },
}

export default topic
