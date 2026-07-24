import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'futuro-presente-b1',
  order: '15',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Futuro do Presente en Portugués B1',
  shortTitle: 'Futuro do Presente',
  metaTitle: 'Futuro do Presente Portugués B1 — Predicciones, Planes y Promesas',
  description:
    'El futuro do presente (também llamado futuro simple) se forma con infinitivo + terminaciones de futuro (-ei, -ás, -á, -emos, -eis, -ão). Se usa para hablar de hechos futuros, predicciones, promesas e intenciones. En portugués se usa más que en español, donde "ir a" es más común. Incluye irregularidades importantes.',
  lead: 'Domina el futuro do presente: formación, irregularidades, diferencias con "ir + infinitivo".',
  outcomes: [
    'Forma futuro do presente regular e irregular',
    'Usa futuro para predicciones, promesas y planes',
    'Distingue futuro do presente de "ir + infinitivo"',
    'Reconoce irregularidades frecuentes (trazer, fazer, dizer, etc.)',
  ],

  guide: {
    goal: 'Hablar de eventos futuros, predicciones y promesas usando futuro do presente con precisión.',
    model: 'Viajarei para Brasil em agosto. / Dirá a verdade. / Fará calor amanhã. / Você virá comigo?',
    formula: 'Infinitivo + terminaciones de futuro (-ei, -ás, -á, -emos, -eis, -ão) | Irregulares: raíz modificada + terminaciones',
    decisions: [
      'Futuro regular: infinitivo sin modificación + terminaciones (falarei, comerei, partirei)',
      'Irregularidades de reducción: fazer→farei, trazer→trarei, dizer→direi, vir→virei, estar→estarei',
      'Irregularidades con inserción: pôr→porei, ter→terei, poder→poderei, saber→saberei',
      'Futuro vs ir+infinitivo: futuro es más formal y menos común en oralidad portuguesa brasileña',
      'Portugueses usan futuro con frecuencia; brasileños prefieren "ir a"',
      'En promesas y hechos cerrados: futuro es más obligante que "ir a"',
    ],
    table: [
      ['Verbo', 'Futuro regular', 'Irregularidad'],
      ['falar', 'falarei', '—'],
      ['fazer', 'farei', 'raíz faz- → far-'],
      ['dizer', 'direi', 'raíz diz- → dir-'],
      ['trazer', 'trarei', 'raíz traz- → trar-'],
      ['vir', 'virei', 'raíz vin- → vir-'],
      ['estar', 'estarei', '—'],
    ],
    mistakes: [
      '"Vou fazer" (oralidad brasileña) vs "Farei" (futuro formal, más portugués europeo). Ambos correctos en contextos diferentes.',
      '"Faz-se" (present) vs "Fará" (futuro). Confundir por la similitud de pronunciación.',
      '"Trazerarei" ❌ (redundancia) → "Trarei" ✓ (solo una vez la raíz irregular).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el futuro do presente en portugués?',
      paragraphs: [
        'El futuro do presente se forma añadiendo al infinitivo las terminaciones de futuro: -ei, -ás, -á, -emos, -eis, -ão. Para verbos regulares es simple: falar → falarei, comer → comerei, partir → partirei.',
        'Estos terminaciones provienen de la conjugación del verbo "haver" en pretérito imperfecto: havia + infinitivo. Con el tiempo, se fusionaron en una única forma.',
      ],
    },
    {
      heading: 'Futuro regular: conjugación de verbos en -ar, -er, -ir',
      paragraphs: [
        'Verbos regulares: falar (hablar): falarei, falarás, falará, falaremos, falareis, falarão. Comer: comerei, comerás, comerá, comeremos, comereis, comerão.',
        'Partir: partirei, partirás, partirá, partiremos, partireis, partirão. Todos los verbos regulares siguen este patrón sin excepción.',
      ],
    },
    {
      heading: 'Irregularidades: cambios en la raíz del futuro',
      paragraphs: [
        'Hacer: fazer → farei (no "fazerarei"). Decir: dizer → direi. Traer: trazer → trarei. Venir: vir → virei. Tener: ter → terei. Poder: poder → poderei. Saber: saber → saberei.',
        'Estas irregularidades afectan la raíz pero NO las terminaciones, que siguen siendo -ei, -ás, -á, -emos, -eis, -ão. Es un error común añadir ambas formas (fazer + -arei).',
      ],
    },
    {
      heading: 'Futuro do presente vs "ir + infinitivo"',
      paragraphs: [
        'Portugués europeo prefiere futuro: "Farei isso amanhã" (Haré eso mañana). Portugués brasileño prefiere "ir a": "Vou fazer isso amanhã". Ambos son correctos, pero indican registro o variante.',
        'El futuro es más formal y se usa en textos escritos, noticias, predicciones meteorológicas, promesas solemnes. En conversación casual brasileña, "ir a" es mucho más frecuente.',
      ],
    },
    {
      heading: 'Futuro en predicciones, promesas y planes',
      paragraphs: [
        'Predicciones: "Amanhã fará calor" (Mañana hará calor). Promesas: "Prometo que virá" (Prometo que vendrá). Planes formales: "Viajarei para Brasil em agosto" (Viajaré a Brasil en agosto).',
        'En el CELPE-Bras, el futuro muestra dominio gramatical completo y aparece frecuentemente en escritura académica y discurso formal.',
      ],
    },
    {
      heading: 'Mesoclisis en futuro y condicional',
      paragraphs: [
        'Cuando se añaden pronombres enclíticos al futuro, ocurre mesoclisis (pronombre dentro del verbo): dar-te-ei (te daré), dar-lhe-emos (le daremos). Esta es una característica muy distintiva del portugués.',
        'Ejemplo: "Entregar-lhe-ei o livro amanhã" (Le entregaré el libro mañana). El pronombre "lhe" va entre la raíz "entreg-" y la terminación "-ei".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Futuro do presente: regular vs irregular, mesoclisis, diferencia con ir+infinitivo.',
    graphicPrompt: 'Tabla: futuro regular (-ei, -ás, -á) vs irregulares (fazer→farei, dizer→direi, etc.).',
    scene: [
      ['Viajarei para o Brasil em agosto.', 'Viajaré a Brasil en agosto.'],
      ['Ele dirá a verdade.', 'Él dirá la verdad.'],
      ['Fará calor amanhã.', 'Hará calor mañana.'],
      ['Você virá comigo?', '¿Vendrás conmigo?'],
      ['Trarei os documentos.', 'Traéré los documentos.'],
      ['Ele fará o trabalho rapidamente.', 'Él hará el trabajo rápidamente.'],
      ['Você poderá sair cedo amanhã?', '¿Podrás salir temprano mañana?'],
      ['Daremos o presente a ela.', 'Le daremos el regalo.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['regular', 'irregulares', 'mesoclisis', 'vs ir+infinitivo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Conjuga verbos en futuro',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta del futuro do presente.',
        type: 'choice',
        items: [
          {
            scene: 'Futuro regular -ar',
            lines: [['', 'Eu ___ para o Brasil em agosto. (viajar)']],
            options: ['viajo', 'viajarei', 'viajaria', 'viajava'],
            answer: 'viajarei',
            explain: 'Futuro regular: viajarei (viaja + -rei).',
          },
          {
            scene: 'Futuro regular -er',
            lines: [['', 'Você ___ o livro amanhã. (compreender)']],
            options: ['compreende', 'compreenderá', 'compreendia'],
            answer: 'compreenderá',
            explain: 'Futuro regular: compreenderá (compreende + -rá).',
          },
          {
            scene: 'Futuro irregular: fazer',
            lines: [['', 'O que você ___ este fim de semana? (fazer)']],
            options: ['faz', 'fará', 'faziá', 'fazera'],
            answer: 'fará',
            explain: 'Irregular: fazer → farei/fará (no fazerarei).',
          },
          {
            scene: 'Futuro irregular: dizer',
            lines: [['', 'Ele ___ a verdade. (dizer)']],
            options: ['diz', 'dirá', 'dizia', 'diria'],
            answer: 'dirá',
            explain: 'Irregular: dizer → direi/dirá (no dizerarei).',
          },
          {
            scene: 'Futuro irregular: trazer',
            lines: [['', 'Eu ___ os documentos amanhã. (trazer)']],
            options: ['trago', 'trarei', 'trazeria', 'traziá'],
            answer: 'trarei',
            explain: 'Irregular: trazer → trarei (no trazerei).',
          },
          {
            scene: 'Futuro irregular: vir',
            lines: [['', 'Você ___ à festa? (vir)']],
            options: ['vem', 'virá', 'vinha', 'viria'],
            answer: 'virá',
            explain: 'Irregular: vir → virei/virá.',
          },
          {
            scene: 'Futuro irregular: poder',
            lines: [['', 'Você ___ sair cedo amanhã? (poder)']],
            options: ['pode', 'poderá', 'podia', 'poderia'],
            answer: 'poderá',
            explain: 'Irregular: poder → poderei/poderá.',
          },
          {
            scene: 'Futuro regular plural',
            lines: [['', 'Nós ___ em casa amanhã. (estar)']],
            options: ['estamos', 'estaremos', 'estávamos', 'estaríamos'],
            answer: 'estaremos',
            explain: 'Futuro regular 1ª plural: estaremos.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Futuro en contexto',
        tag: '2 decisiones',
        intro: 'Completa diálogos con futuro do presente.',
        type: 'dual',
        items: [
          {
            scene: 'Promesa y predicción',
            lines: [['', "Eu te prometo: [[0]] (fazer) tudo certo. Amanhã, [[1]] (fazer) calor?"]],
            blanks: [
              { options: ['faço', 'farei', 'faria'], answer: 'farei', explain: 'Promesa en futuro: farei.' },
              { options: ['faz', 'fará', 'faria'], answer: 'fará', explain: 'Predicción en futuro: fará.' },
            ],
          },
          {
            scene: 'Planes y decisiones',
            lines: [['', "Este ano [[0]] (viajar) para o Brasil. Depois, [[1]] (ir) para Portugal."]],
            blanks: [
              { options: ['viajo', 'viajarei', 'viajaria'], answer: 'viajarei', explain: 'Plan futuro: viajarei.' },
              { options: ['vou', 'irei', 'ia'], answer: 'irei', explain: 'Plan futuro: irei.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Predicción meteorológica y anuncios',
        tag: 'Texto guiado',
        intro: 'Completa un boletín meteorológico o anuncio formal.',
        type: 'guidedText',
        scene: 'Pronóstico del tiempo o anuncio oficial.',
        text: 'Amanhã [[0]] (fazer) muito calor no Rio de Janeiro. A temperatura [[1]] (chegar) a 35 graus. Não [[2]] (haver) chuva. Os cariocas [[3]] (precisar) de protetor solar. A noite [[4]] (estar) mais fresca, com temperatura ao redor de 25 graus.',
        blanks: [
          { options: ['faz', 'fará', 'faria'], answer: 'fará', explain: 'Predicción: fará.' },
          { options: ['chega', 'chegará', 'chegaria'], answer: 'chegará', explain: 'Predicción futuro: chegará.' },
          { options: ['há', 'haverá', 'haveria'], answer: 'haverá', explain: 'Futuro: haverá (de haver).' },
          { options: ['precisam', 'precisarão', 'precisariam'], answer: 'precisarão', explain: 'Futuro: precisarão.' },
          { options: ['está', 'estará', 'estaria'], answer: 'estará', explain: 'Predicción futuro: estará.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con futuro',
        tag: 'Texto libre',
        intro: 'Escribe predicciones sobre tu futuro.',
        type: 'freeText',
        scene: 'Declaraciones de planes e intenciones personales.',
        text: 'En cinco años, 1. [[0]] (estudiar) más idiomas. 2. [[1]] (trabajar) en una empresa internacional. 3. [[2]] (vivir) en Brasil. 4. [[3]] (tener) una familia feliz.',
        blanks: [
          { answer: 'estudiarei', accepted: ['estudiarei', 'estudarei'], explain: 'Futuro de estudiar: estudiarei.' },
          { answer: 'trabalharei', accepted: ['trabalharei'], explain: 'Futuro de trabajar: trabalharei.' },
          { answer: 'viverei', accepted: ['viverei'], explain: 'Futuro de vivir: viverei.' },
          { answer: 'terei', accepted: ['terei'], explain: 'Futuro irregular de ter: terei.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con mesoclisis',
        tag: 'Producción',
        intro: 'Escribe promesas con pronombres (mesoclisis).',
        type: 'write',
        items: [
          {
            scene: 'Promesa personal',
            prompt: 'Escribe una promesa: "Te daré..." usando mesoclisis (dar-te-ei).',
            answer: 'Dar-te-ei o presente amanhã. / Dar-lhe-emos ajuda quando precisar.',
            accepted: ['mesoclisis', '-ei', 'promesa', 'dar-te'],
            explain: 'Mesoclisis: el pronombre va dentro del verbo en futuro/condicional.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de futuro vs ir+infinitivo',
        tag: 'Análise',
        intro: 'Explica la diferencia entre dos expresiones de futuro.',
        type: 'write',
        items: [
          {
            scene: 'Registro y variante',
            prompt: '¿Cuál es la diferencia entre "Farei isso amanhã" y "Vou fazer isso amanhã"?',
            answer: '"Farei" es futuro do presente (formal, portugués europeo). "Vou fazer" es ir+infinitivo (informal, portugués brasileño común). Ambos correctos pero diferente registro.',
            accepted: ['formal', 'informal', 'europeo', 'brasileño', 'registro'],
            explain: 'El futuro do presente es más formal; ir+infinitivo es más cotidiano.',
          },
        ],
      },
    ],
  },
}

export default topic
