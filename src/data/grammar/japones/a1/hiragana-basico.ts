import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'hiragana-basico',
  order: '01',
  color: '#dc2626',
  category: 'Escritura',
  level: 'A1',
  title: 'Hiragana Básico en japonés A1 — El sistema de escritura esencial',
  shortTitle: 'Hiragana básico',
  metaTitle: 'Hiragana básico japonés A1 — あいうえお ka ki ku ke ko',
  description:
    'El hiragana es el sistema de escritura silábica esencial del japonés. Consta de 46 caracteres básicos que representan sílabas (mora). Aprenderlo es el primer paso obligatorio: sin hiragana no puedes leer ni escribir japonés. Se usa para palabras nativas, conjugaciones y partículas.',
  lead: 'あいうえお... 46 caracteres silábicos = todo el japonés se puede escribir en hiragana. Es el alfabeto fonético del japonés. Memorizar las 5 vocales y los 5 primeros grupos (あ か さ た な) es suficiente para A1.',
  outcomes: [
    'Lee y escribe las vocales japonesas: あいうえお (a-i-u-e-o)',
    'Reconoce los grupos ka, sa, ta, na, ha en hiragana',
    'Comprende que el japonés es silábico, no alfabético',
  ],

  guide: {
    goal: 'Dominar las vocales y los primeros grupos del hiragana para leer palabras básicas del japonés A1.',
    model: 'あ=a, い=i, う=u, え=e, お=o | か=ka, き=ki, く=ku, け=ke, こ=ko',
    formula: '[consonante] + [vocal] = mora/sílaba en hiragana',
    decisions: [
      'Vocales: あ(a) い(i) う(u) え(e) お(o)',
      'Fila か: か(ka) き(ki) く(ku) け(ke) こ(ko)',
      'Fila さ: さ(sa) し(shi) す(su) せ(se) そ(so) — shi es irregular',
      'Fila た: た(ta) ち(chi) つ(tsu) て(te) と(to) — chi y tsu son irregulares',
      'Fila な: な(na) に(ni) ぬ(nu) ね(ne) の(no)',
      'Solo existe ん = n (única consonante sin vocal, al final de sílaba)',
    ],
    table: [
      ['', 'a', 'i'],
      ['∅', 'あ', 'い'],
      ['k', 'か', 'き'],
      ['s', 'さ', 'し(shi)'],
      ['t', 'た', 'ち(chi)'],
      ['n', 'な', 'に'],
    ],
    mistakes: [
      '"shi" no "si" — し siempre es "shi", no "si". El japonés no tiene "si".',
      '"chi" no "ti" y "tsu" no "tu" — ち y つ son irregulares respecto al patrón.',
      'Cada mora tiene la misma duración — "ka" y "a" duran lo mismo en japonés.',
    ],
  },
  seo: [
    {
      heading: 'Hiragana: el primer sistema de escritura del japonés',
      paragraphs: [
        'El hiragana (ひらがな) es un sistema de escritura silábica que representa 46 sílabas básicas del japonés. A diferencia de un alfabeto donde cada letra es un sonido (consonante o vocal), en el hiragana cada carácter representa una mora completa: ka, ki, ku, ke, ko (か、き、く、け、こ).',
        'Aprender el hiragana es el primer paso absoluto para el japonés. Sin él no puedes leer partículas gramaticales, conjugaciones verbales ni la mayoría de palabras nativas. Para el hispanohablante hay buenas noticias: los sonidos del japonés son muy similares a los del español. Las vocales a/i/u/e/o se pronuncian casi igual que en español.',
      ],
    },
    {
      heading: 'Las irregularidades de las filas さ y た',
      paragraphs: [
        'El patrón general del hiragana es [consonante] + [vocal]. Pero hay excepciones importantes en dos filas. En la fila さ (s): し no es "si" sino "shi" — el japonés tiene este sonido palatal. En la fila た (t): ち no es "ti" sino "chi" y つ no es "tu" sino "tsu".',
        'Estas irregularidades son históricas y fonéticas. Para los hispanohablantes son fáciles porque usamos "sh" como en "shampoo" para "shi", y "ch" como en "chocolate" para "chi". El sonido "tsu" es nuevo para el hispanohablante pero se practica con palabras como "tsuki" (luna) o "tsunami" (ola gigante).',
      ],
    },
    {
      heading: 'Vocales largas y ん: los dos casos especiales',
      paragraphs: [
        'El hiragana tiene dos particularidades. La primera: las vocales largas (おかあさん = okaasan = madre) se escriben repitiendo la vocal. La segunda: ん es el único carácter que no tiene vocal — representa solo la consonante n al final de sílaba o antes de otra consonante: にほん = nihon (Japón).',
        'Para A1, lo más importante es dominar las 46 formas básicas y reconocerlas en lectura. La escritura a mano es secundaria en un primer nivel pero ayuda mucho a la memorización. Se recomienda practicar trazando cada carácter en orden.',
      ],
    },
  ],
  visual: {
    mode: 'syllable-chart',
    teacherLens: 'El estudiante aprende el sistema silábico del hiragana comenzando por vocales y los primeros grupos.',
    graphicPrompt: 'Tabla gojuuon (5×10) con vocales y filas か/さ/た/な resaltadas para A1.',
    scene: [
      ['あいうえお', 'a-i-u-e-o (vocales)'],
      ['かきくけこ', 'ka-ki-ku-ke-ko'],
      ['し=shi, ち=chi, つ=tsu', 'irregulares importantes'],
    ],
    learnerModes: ['visual: tabla de caracteres', 'analítico: sistema silábico vs alfabético', 'oral: canción あいうえお'],
    reviewFocus: ['shi no si', 'chi no ti', 'tsu no tu', 'ん sin vocal'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento de hiragana',
        tag: 'Opción múltiple',
        intro: 'Elige la romanización correcta del carácter hiragana.',
        type: 'choice',
        items: [
          {
            scene: 'Vocal',
            lines: [['David', '¿Cómo se lee? → あ']],
            options: ['a', 'i', 'u', 'e'],
            answer: 'a',
            explain: 'あ = a. Primera vocal del hiragana.',
          },
          {
            scene: 'Vocal',
            lines: [['David', '¿Cómo se lee? → い']],
            options: ['i', 'a', 'u', 'e'],
            answer: 'i',
            explain: 'い = i. Segunda vocal del hiragana.',
          },
          {
            scene: 'Fila か',
            lines: [['David', '¿Cómo se lee? → か']],
            options: ['ka', 'ki', 'sa', 'ta'],
            answer: 'ka',
            explain: 'か = ka. Consonante k + vocal a.',
          },
          {
            scene: 'Fila さ (irregular)',
            lines: [['David', '¿Cómo se lee? → し']],
            options: ['shi', 'si', 'chi', 'su'],
            answer: 'shi',
            explain: 'し = shi (no "si"). Irregular en la fila さ.',
          },
          {
            scene: 'Fila た (irregular)',
            lines: [['David', '¿Cómo se lee? → ち']],
            options: ['chi', 'ti', 'tsu', 'ki'],
            answer: 'chi',
            explain: 'ち = chi (no "ti"). Irregular en la fila た.',
          },
          {
            scene: 'Fila た (irregular)',
            lines: [['David', '¿Cómo se lee? → つ']],
            options: ['tsu', 'tu', 'su', 'ku'],
            answer: 'tsu',
            explain: 'つ = tsu (no "tu"). Irregular, como en "tsunami".',
          },
          {
            scene: 'Fila な',
            lines: [['David', '¿Cómo se lee? → の']],
            options: ['no', 'na', 'ne', 'ni'],
            answer: 'no',
            explain: 'の = no. También es la partícula posesiva del japonés.',
          },
          {
            scene: 'Consonante especial',
            lines: [['David', '¿Cómo se lee? → ん']],
            options: ['n', 'na', 'nu', 'ni'],
            answer: 'n',
            explain: 'ん = n. La única consonante sin vocal del hiragana.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Palabras en hiragana',
        tag: '2 caracteres',
        intro: 'Lee las dos sílabas de la palabra y elige la lectura correcta.',
        type: 'dual',
        items: [
          {
            scene: 'Palabra: いぬ',
            lines: [['David', 'いぬ = [[0]] + [[1]] = ¿qué significa?']],
            blanks: [
              { options: ['i', 'a', 'u'], answer: 'i', explain: 'い = i.' },
              { options: ['nu', 'na', 'ni'], answer: 'nu', explain: 'ぬ = nu. いぬ = inu = perro.' },
            ],
          },
          {
            scene: 'Palabra: ねこ',
            lines: [['David', 'ねこ = [[0]] + [[1]] = gato']],
            blanks: [
              { options: ['ne', 'na', 'ni'], answer: 'ne', explain: 'ね = ne.' },
              { options: ['ko', 'ka', 'ku'], answer: 'ko', explain: 'こ = ko. ねこ = neko = gato.' },
            ],
          },
          {
            scene: 'Palabra: さけ',
            lines: [['David', 'さけ = [[0]] + [[1]] = sake (alcohol de arroz)']],
            blanks: [
              { options: ['sa', 'si', 'su'], answer: 'sa', explain: 'さ = sa.' },
              { options: ['ke', 'ki', 'ku'], answer: 'ke', explain: 'け = ke. さけ = sake.' },
            ],
          },
          {
            scene: 'Palabra: にほん',
            lines: [['David', 'にほん = [[0]] + ho + [[1]] = Japón (nihon)']],
            blanks: [
              { options: ['ni', 'na', 'nu'], answer: 'ni', explain: 'に = ni.' },
              { options: ['n', 'na', 'no'], answer: 'n', explain: 'ん = n final. にほん = nihon = Japón.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Lectura de texto hiragana',
        tag: 'Opciones',
        intro: 'Elige la lectura correcta de cada carácter en el texto.',
        type: 'guidedText',
        scene: 'Palabras básicas del japonés en hiragana',
        text: 'En japonés, [[0]](あ) es la primera vocal. [[1]](か) = ka. La palabra [[2]](さかな) = sakana = pez. [[3]](ちち) = chichi = padre. [[4]](にほん) = Nihon = Japón.',
        blanks: [
          { options: ['a', 'i', 'u'], answer: 'a', explain: 'あ = a. Primera vocal.' },
          { options: ['ka', 'sa', 'ta'], answer: 'ka', explain: 'か = ka.' },
          { options: ['sakana', 'satana', 'sikana'], answer: 'sakana', explain: 'さかな: sa-ka-na = pez.' },
          { options: ['chichi', 'titi', 'sisi'], answer: 'chichi', explain: 'ちち: chi-chi = padre. ち = chi (no ti).' },
          { options: ['nihon', 'niton', 'nisonn'], answer: 'nihon', explain: 'にほん: ni-ho-n = Japón. ん = n.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la romanización (romaji) de los caracteres hiragana.',
        type: 'freeText',
        scene: 'Reconocimiento de hiragana sin opciones',
        text: 'Lee en romaji: 1) う=[[0]] | 2) え=[[1]] | 3) き=[[2]] | 4) し=[[3]] | 5) つ=[[4]] | 6) の=[[5]]',
        blanks: [
          { answer: 'u', explain: 'う = u. Tercera vocal.' },
          { answer: 'e', explain: 'え = e. Cuarta vocal.' },
          { answer: 'ki', explain: 'き = ki. Fila か, vocal i.' },
          { answer: 'shi', explain: 'し = shi (no si). Irregular fila さ.' },
          { answer: 'tsu', explain: 'つ = tsu (no tu). Irregular fila た.' },
          { answer: 'no', explain: 'の = no. Fila な, vocal o.' },
        ],
      },
      {
        id: 'l5',
        title: 'Hiragana a romaji',
        tag: 'Producción',
        intro: 'Lee la palabra en hiragana y escribe su romanización.',
        type: 'write',
        items: [
          {
            scene: 'Agua',
            prompt: 'Lee en romaji: みず (mizu = agua)',
            answer: 'mizu',
            accepted: ['mizu'],
            explain: 'み = mi, ず = zu. みず = mizu = agua.',
          },
          {
            scene: 'Nombre de Japón',
            prompt: 'Lee en romaji: にほん (nihon = Japón)',
            answer: 'nihon',
            accepted: ['nihon'],
            explain: 'に=ni, ほ=ho, ん=n. にほん = nihon.',
          },
          {
            scene: 'Gato',
            prompt: 'Lee en romaji: ねこ (neko = gato)',
            answer: 'neko',
            accepted: ['neko'],
            explain: 'ね=ne, こ=ko. ねこ = neko.',
          },
          {
            scene: 'Perro',
            prompt: 'Lee en romaji: いぬ (inu = perro)',
            answer: 'inu',
            accepted: ['inu'],
            explain: 'い=i, ぬ=nu. いぬ = inu.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: tu nombre en hiragana',
        tag: 'Reto final',
        intro: 'Aprende a escribir palabras básicas en hiragana y tu nombre aproximado.',
        type: 'write',
        items: [
          {
            scene: 'Vocabulario de supervivencia',
            prompt: '¿Cómo se escribe en romaji? にほんご (nihongo = japonés)',
            answer: 'nihongo',
            accepted: ['nihongo'],
            explain: 'に=ni, ほ=ho, ん=n, ご=go. にほんご = nihongo = idioma japonés.',
          },
          {
            scene: 'Saludos',
            prompt: '¿Cómo se escribe en romaji? こんにちは (konnichiwa = hola)',
            answer: 'konnichiwa',
            accepted: ['konnichiwa', 'konnitiwa'],
            explain: 'こ=ko, ん=n, に=ni, ち=chi, は=wa (は es "wa" al usarse como partícula). = hola/buenos días.',
          },
          {
            scene: 'Gracias',
            prompt: '¿Cómo se escribe en romaji? ありがとう (arigatou = gracias)',
            answer: 'arigatou',
            accepted: ['arigatou', 'arigato', 'arigatō'],
            explain: 'あ=a, り=ri, が=ga, と=to, う=u. ありがとう = arigatou = gracias.',
          },
        ],
      },
    ],
  },
}

export default topic
