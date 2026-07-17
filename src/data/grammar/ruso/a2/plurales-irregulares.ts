import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'plurales-irregulares',
  order: '20',
  color: '#1a2ecc',
  category: 'Morfología',
  level: 'A2',
  title: 'Plurales irregulares en ruso A2: дети, люди, времена, имена',
  shortTitle: 'Plurales irregulares',
  metaTitle: 'Plurales irregulares ruso A2 — дети люди времена имена, plural supletivo ruso',
  description:
    'Algunos sustantivos rusos tienen formas de plural completamente irregulares o con cambios de raíz. Los más importantes: ребёнок → дети (niños), человек → люди (personas), время → времена (tiempos/épocas), имя → имена (nombres), брат → братья (hermanos), друг → друзья (amigos), стул → стулья (sillas), дерево → деревья (árboles), сосед → соседи (vecinos). Estos plurales son frecuentes y hay que memorizarlos.',
  lead: 'У меня двое детей / Все люди разные / В разные времена: plurales irregulares rusos A2.',
  outcomes: [
    'Usar los plurales supletivioss: дети, люди',
    'Formar el plural de sustantivos neutros en -мя: имена, времена',
    'Reconocer plurales en -ья: братья, друзья, стулья, деревья',
    'Usar дети y люди con los casos más frecuentes',
  ],

  guide: {
    goal: 'Memorizar y usar correctamente los plurales irregulares rusos más frecuentes.',
    model: 'Дети играют в парке. (Los niños juegan en el parque.) / Все люди равны. (Todas las personas son iguales.) / У меня много друзей. (Tengo muchos amigos.)',
    formula: 'ребёнок → дети | человек → люди | -мя → -мена | друг → друзья | брат → братья',
    decisions: [
      'Supletivos: ребёнок (sg.) → дети (pl.); человек (sg.) → люди (pl.)',
      'Neutros en -мя: время → времена; имя → имена; племя → племена',
      'Plurales en -ья: брат → братья; друг → друзья; стул → стулья; дерево → деревья; лист → листья',
      'Con числительные: двое детей (Gen.pl), много людей (Gen.pl), пятеро друзей',
      'Declension де́ти: детей (Gen.pl), детям (Dat.pl), детьми (Instr.pl), о детях (Prep.pl)',
    ],
    table: [
      ['Singular', 'Plural', 'Significado'],
      ['ребёнок / человек', 'дети / люди', 'niño(s) / persona(s)'],
      ['друг / брат', 'друзья / братья', 'amigo(s) / hermano(s)'],
    ],
    mistakes: [
      '"Ребята" (chavales/compañeros) ≠ "дети" (niños pequeños). Ребята es más coloquial y para jóvenes.',
      '"Люди" no tiene singular regular → "человек" para 1 persona; "два человека" (2 personas con Gen.sg), "пять человек" (5 personas Gen.pl irregular).',
      '"Много время" ❌ → "много времени" (Gen.sg. de время) o "во все времена" (Acus.pl). Tiempo como sustantivo neutro en -мя.',
    ],
  },

  seo: [
    {
      heading: 'Los plurales supletivioss más importantes: дети y люди',
      paragraphs: [
        'En ruso, algunos sustantivos forman el plural a partir de una raíz completamente diferente — fenómeno llamado supletivismo. Los casos más frecuentes son ребёнок (niño) → дети (niños) y человек (persona) → люди (personas). Estos plurales tienen sus propias declinaciones: дети, детей, детям, детей, детьми, о детях; люди, людей, людям, людей, людьми, о людях.',
        'Para expresar cantidades: un niño = один ребёнок; dos niños = двое детей (o два ребёнка en contexto más formal); muchos niños = много детей. Con человек el Gen.plural es especial: пять человек (cinco personas, no "людей" con números). "Много людей" (mucha gente) también es correcto en contexto general.',
      ],
    },
    {
      heading: 'Plurales en -ья y neutros en -мя',
      paragraphs: [
        'Varios sustantivos masculinos y neutros forman plural en -ья: друг → друзья (amigos), брат → братья (hermanos), стул → стулья (sillas), дерево → деревья (árboles), лист → листья (hojas), муж → мужья (esposos). El genitivo plural de estos: друзей, братьев, стульев, деревьев, листьев, мужей.',
        'Los sustantivos neutros en -мя (grupo limitado) forman plural en -мена: время (tiempo) → времена, имя (nombre) → имена, племя (tribu) → племена, знамя (bandera) → знамёна. Estos neutros tienen una raíz extendida en Gen.sg también: времени (del tiempo), имени (del nombre).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'ребёнок→дети | человек→люди | друг→друзья | брат→братья | время→времена | имя→имена',
    graphicPrompt: 'Árbol genealógico con distintas generaciones: дети, братья, друзья.',
    scene: [
      ['Дети бегут по парку.', 'Los niños corren por el parque.'],
      ['Все люди имеют право на образование.', 'Todas las personas tienen derecho a la educación.'],
      ['Мои друзья живут в разных городах.', 'Mis amigos viven en distintas ciudades.'],
      ['У него три брата.', 'Él tiene tres hermanos.'],
      ['В саду растут красивые деревья.', 'En el jardín crecen árboles hermosos.'],
      ['Как тебя зовут? Какое твоё имя?', '¿Cómo te llamas? ¿Cuál es tu nombre?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['ребёнок→дети', 'человек→люди', 'друг→друзья / брат→братья', 'время→времена / имя→имена'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el plural correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el plural correcto del sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Много ___ (ребёнок) играют на улице.',
            lines: [['', 'Много ___ играют на улице.']],
            options: ['детей', 'ребят', 'ребёнков', 'детьев'],
            answer: 'детей',
            explain: '"детей" — Gen.plural de дети (plural supletivo de ребёнок). много + Gen.pl.',
          },
          {
            scene: 'В городе живут добрые ___.',
            lines: [['', 'В городе живут добрые ___.']],
            options: ['люди', 'человеки', 'людей', 'человеков'],
            answer: 'люди',
            explain: '"люди" — Nominativo plural supletivo de человек.',
          },
          {
            scene: 'У меня много ___. (друг)',
            lines: [['', 'У меня много ___.']],
            options: ['друзей', 'другов', 'друзьев', 'дружей'],
            answer: 'друзей',
            explain: '"друзей" — Gen.plural de друзья (plural в -ья: друзья → Gen.pl. друзей).',
          },
          {
            scene: 'В парке растут большие ___. (дерево)',
            lines: [['', 'В парке растут большие ___.']],
            options: ['деревья', 'деревы', 'деревей', 'дерева'],
            answer: 'деревья',
            explain: '"деревья" — plural de дерево. Нейтр. → деревья (pl. в -ья).',
          },
          {
            scene: 'Он помнит ___ молодости. (время)',
            lines: [['', 'Он помнит ___ молодости.']],
            options: ['времена', 'времени', 'времёна', 'время'],
            answer: 'времена',
            explain: '"времена" — plural de время (neutro en -мя). помнить + Acus.pl = времена.',
          },
          {
            scene: 'Его ___ живут в Сибири. (брат)',
            lines: [['', 'Его ___ живут в Сибири.']],
            options: ['братья', 'братя', 'братьи', 'братов'],
            answer: 'братья',
            explain: '"братья" — plural de брат (plural в -ья). Nom.pl = братья.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Singular y plural',
        tag: '2 espacios',
        intro: 'Completa con el singular y el plural del mismo sustantivo.',
        type: 'dual',
        items: [
          {
            scene: 'Un niño vs. muchos niños.',
            lines: [['', 'Один [[0]] играет. Много [[1]] играют.']],
            blanks: [
              { options: ['ребёнок', 'дети', 'детей', 'ребят'], answer: 'ребёнок', explain: '"ребёнок" — singular. один ребёнок.' },
              { options: ['детей', 'ребёнок', 'дети', 'ребят'], answer: 'детей', explain: '"детей" — Gen.plural после много. много детей.' },
            ],
          },
          {
            scene: 'Una persona vs. todas las personas.',
            lines: [['', 'Этот [[0]] говорит по-русски. Все [[1]] говорят.']],
            blanks: [
              { options: ['человек', 'люди', 'людей', 'человеки'], answer: 'человек', explain: '"человек" — singular. этот человек.' },
              { options: ['люди', 'человек', 'людей', 'человеков'], answer: 'люди', explain: '"люди" — plural Nom. все люди.' },
            ],
          },
          {
            scene: 'Un amigo vs. mis amigos.',
            lines: [['', 'У меня один [[0]]. Мои [[1]] живут везде.']],
            blanks: [
              { options: ['друг', 'друзья', 'друзей', 'дружба'], answer: 'друг', explain: '"друг" — singular (un amigo). один друг.' },
              { options: ['друзья', 'другов', 'друзей', 'друг'], answer: 'друзья', explain: '"друзья" — plural Nom. мои друзья.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Familia y amigos',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los plurales irregulares correctos.',
        type: 'guidedText',
        scene: 'Ольга рассказывает о своей семье.',
        text: 'В моей семье есть [[0]]: их зовут Саша и Миша. Мои [[1]] живут в разных городах. Мой папа говорит: "Берегите [[2]]!" Ещё я хочу посадить [[3]] в нашем саду.',
        blanks: [
          { options: ['дети', 'ребёнки', 'детей', 'ребята'], answer: 'дети', explain: '"дети" — Nom.pl de ребёнок. есть + Nom. (hay niños).' },
          { options: ['друзья', 'другов', 'друзей', 'другие'], answer: 'друзья', explain: '"друзья" — Nom.pl de друг. мои друзья.' },
          { options: ['друзей', 'друзья', 'другов', 'дружей'], answer: 'друзей', explain: '"друзей" — Gen.pl / Acus.pl anim. беречь кого? → Acus.pl anim. = друзей.' },
          { options: ['деревья', 'дерева', 'деревы', 'деревьев'], answer: 'деревья', explain: '"деревья" — Acus.pl inan. de дерево. посадить что? → деревья.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el plural irregular',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe el plural correcto.',
        type: 'freeText',
        scene: 'Напиши множественное число.',
        text: 'ребёнок → ___ (Nom.pl) / время → ___ (Nom.pl) / брат → ___ (Nom.pl) / имя → ___ (Nom.pl)',
        blanks: [
          { answer: 'дети', explain: '"дети" — plural supletivo de ребёнок. Memorizar.' },
          { answer: 'времена', explain: '"времена" — neutro -мя → plural -мена.' },
          { answer: 'братья', explain: '"братья" — plural en -ья de брат.' },
          { answer: 'имена', explain: '"имена" — neutro -мя → plural -мена.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe sobre personas y naturaleza',
        tag: 'Escritura guiada',
        intro: 'Escribe frases con plurales irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Di que los niños juegan en el parque.',
            prompt: 'Usa дети + играть + в парке.',
            answer: 'Дети играют в парке.',
            accepted: ['Маленькие дети играют в парке.'],
            explain: '"Дети" — plural supletivo de ребёнок. Sujeto Nom.pl.',
          },
          {
            scene: 'Di que tienes muchos amigos.',
            prompt: 'Usa у меня + много + друзей (Gen.pl).',
            answer: 'У меня много друзей.',
            accepted: ['У меня очень много хороших друзей.'],
            explain: '"друзей" — Gen.pl de друзья (pl. de друг). много + Gen.pl.',
          },
          {
            scene: 'Di que en distintas épocas la gente vivía de manera diferente.',
            prompt: 'Usa в разные + времена + люди + жить по-разному.',
            answer: 'В разные времена люди жили по-разному.',
            accepted: ['Во все времена люди жили по-разному.'],
            explain: '"времена" — Acus.pl de время. "люди" — Nom.pl supletivo de человек.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Tus personas y recuerdos',
        tag: 'Escritura libre',
        intro: 'Escribe sobre personas importantes usando plurales irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Describe a las personas más importantes en tu vida.',
            prompt: 'Используй люди, друзья, дети, братья + прилагательные.',
            answer: 'В моей жизни есть очень важные люди. Мои друзья всегда рядом. Мои братья живут далеко, но мы часто общаемся. Для меня дети — это будущее.',
            explain: 'люди (Nom.pl) | друзья (Nom.pl) | братья (Nom.pl) | дети (Nom.pl) — todos Nom.pl irregulares.',
          },
          {
            scene: 'Habla sobre los tiempos que has vivido o que te han contado.',
            prompt: 'Используй времена, люди жили, имена которые помним.',
            answer: 'Мои дедушки рассказывали о трудных временах. В те времена люди жили иначе. Я помню имена всех, кто помог нашей семье.',
            accepted: ['Есть времена, которые люди не забывают. Имена героев остаются в истории.'],
            explain: 'времена (Acus.pl) | в те времена (Prep. con в + Acus.) | люди (Nom.pl) | имена (Acus.pl).',
          },
        ],
      },
    ],
  },
}

export default topic
