import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'aggettivi-qualificativi',
  order: '11',
  color: '#009246',
  category: 'Adjetivos',
  level: 'A1',
  title: 'Aggettivi qualificativi en italiano A1 — Concordancia y posición',
  shortTitle: 'Adjetivos calificativos',
  metaTitle: 'Adjetivos en italiano A1 — bello brutto grande buono concordancia género número',
  description:
    'Los adjetivos calificativos en italiano concuerdan en género y número con el sustantivo. Terminaciones: -o/-a/-i/-e (bello/bella/belli/belle) o -e/-i (grande/grandi). Van generalmente después del nombre pero algunos como bello, grande, buono van antes y cambian de significado.',
  lead: 'Adjetivos -o/-a/-i/-e: bello/bella/belli/belle. Adjetivos -e/-i: grande/grandi. Van después del nombre (un libro interessante) pero bello, buono, grande, piccolo van antes (un bel ragazzo, un buon caffè).',
  outcomes: [
    'Concuerda adjetivos en género y número con el sustantivo que modifican',
    'Distingue los dos grupos de terminaciones: -o/-a/-i/-e y -e/-i',
    'Posiciona correctamente los adjetivos y conoce los irregulares bello y buono',
  ],

  guide: {
    goal: 'Usar adjetivos calificativos con concordancia correcta y posición adecuada en italiano A1.',
    model: 'un libro interessante / una lezione interessante / libri interessanti / lezioni interessanti',
    formula: 'sustantivo + adjetivo (posición estándar) | artículo + adjetivo + sustantivo (bello/buono/grande antes)',
    decisions: [
      'Grupo 1: -o (masc. sg.) / -a (fem. sg.) / -i (masc. pl.) / -e (fem. pl.): bello/bella/belli/belle',
      'Grupo 2: -e (sing. masc. y fem.) / -i (plural masc. y fem.): grande/grandi, intelligente/intelligenti',
      'Posición DOPO il nome: un libro interessante, una professoressa brava',
      'Posición PRIMA del nome: bello, brutto, piccolo, grande, buono cambian matiz',
      'Bello prima del nome: bel (masc. sg. cons.), bello (masc. sg. s+cons./z), bella (fem.), bel (masc. pl. cons.), bei (masc. pl.), belle (fem. pl.)',
      'Buono prima del nome: un buon caffè, uno buon studente, una buona pizza',
      'Grande prima del nome puede abreviarse: un gran professore (= un gran maestro)',
      'Adjetivos invariables (colores compuestos): verde/grigi/rosa no cambian siempre',
    ],
    table: [
      ['', 'Masc. sg.', 'Fem. sg.', 'Masc. pl.', 'Fem. pl.'],
      ['Grupo 1', 'bello', 'bella', 'belli', 'belle'],
      ['Grupo 2', 'grande', 'grande', 'grandi', 'grandi'],
      ['Buono (antes)', 'un buon libro', 'una buona lezione', 'buoni libri', 'buone lezioni'],
    ].map(row => [row[0], row[1], row[2]] as [string, string, string]),
    mistakes: [
      '"Una lezione interessanto" — MAL: lezione es femenino → interessante (grupo 2, invariable en género).',
      '"Un bello ragazzo" — puede decirse, pero antes del nombre lo más natural es "un bel ragazzo".',
      '"Grande professoressa" puede significar grande en tamaño; "una gran professoressa" = una gran profesora (antes = sentido metafórico).',
    ],
  },
  seo: [
    {
      heading: 'Los dos grupos de adjetivos en italiano',
      paragraphs: [
        'Los adjetivos italianos se dividen en dos grupos según sus terminaciones. El grupo 1 tiene cuatro formas: -o (masc. sg.), -a (fem. sg.), -i (masc. pl.), -e (fem. pl.). Ejemplos: bello/bella/belli/belle, brutto/brutta/brutti/brutte, nuovo/nuova/nuovi/nuove, buono/buona/buoni/buone.',
        'El grupo 2 tiene solo dos formas: -e en singular (para ambos géneros) y -i en plural (para ambos géneros). Ejemplos: grande/grandi, intelligente/intelligenti, interessante/interessanti, importante/importanti, forte/forti. Son muy frecuentes y más fáciles de aprender porque no distinguen género.',
      ],
    },
    {
      heading: 'Posición del adjetivo: antes o después del nombre',
      paragraphs: [
        'La posición estándar del adjetivo en italiano es DESPUÉS del sustantivo: un libro interessante, una professoressa brava, degli studenti intelligenti. Esto contrasta con el español, donde el adjetivo puede ir antes o después con mayor libertad.',
        'Sin embargo, ciertos adjetivos muy frecuentes van habitualmente antes del nombre: bello (bel/bella/bei/belle), brutto, piccolo, grande, buono, cattivo, giovane, vecchio. Cuando van antes, pueden cambiar de matiz: "un grande uomo" (un gran hombre, notable) vs "un uomo grande" (un hombre de gran estatura).',
      ],
    },
    {
      heading: 'Bello y buono: variantes antes del nombre',
      paragraphs: [
        'Bello antes del nombre sigue el patrón del artículo determinado: bel libro (il libro), bell\'amico (l\'amico), bello zaino (lo zaino), bella casa (la casa), bei libri (i libri), begli amici (gli amici), belle case (le case). Después del nombre es regular: libro bello, amici belli.',
        'Buono antes de un sustantivo singular funciona como el artículo indeterminado: un buon vino (un vino), uno buon studente (un estudiante, masc. s+cons.), una buona pizza (una pizza), una buon\'amica (una amiga). En plural es regular: buoni vini, buone pizze.',
      ],
    },
  ],
  visual: {
    mode: 'grammar-table',
    teacherLens: 'El estudiante aprende los dos grupos de terminaciones y la posición general vs. los adjetivos que van antes del nombre.',
    graphicPrompt: 'Dos columnas: grupo -o/-a/-i/-e y grupo -e/-i. Flecha de posición: [sustantivo] + adjetivo. Cuadro especial para bello/buono antes del nombre.',
    scene: [
      ['Grupo 1: -o/-a/-i/-e', 'bello bella belli belle'],
      ['Grupo 2: -e/-i', 'grande grande grandi grandi'],
      ['Después del nombre', 'un libro interessante'],
      ['Antes del nombre', 'un bel ragazzo / un buon caffè'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['concordancia género-número', 'grupo 2 no distingue género', 'bello antes del nombre', 'posición estándar: después'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Forma correcta del adjetivo',
        tag: 'Opción múltiple',
        intro: 'Elige la forma del adjetivo que concuerda con el sustantivo.',
        type: 'choice',
        items: [
          {
            scene: 'Una profesora inteligente',
            lines: [['David', 'Zhanna è una professoressa molto ___. (intelligente)']],
            options: ['intelligente', 'intelligenti', 'intelligenta', 'intelligento'],
            answer: 'intelligente',
            explain: 'Professoressa = femenino singular. Grupo 2: intelligente (sing. masc. y fem.).',
          },
          {
            scene: 'Libros nuevos',
            lines: [['Sofia', 'Ho comprato tre libri ___. (nuovo)']],
            options: ['nuovi', 'nuove', 'nuovo', 'nuova'],
            answer: 'nuovi',
            explain: 'Libri = masculino plural. Grupo 1: nuovo → nuovi.',
          },
          {
            scene: 'Una bella ciudad',
            lines: [['Carlo', 'Bucaramanga è una ___ città! (bello)']],
            options: ['bella', 'bello', 'bel', 'belle'],
            answer: 'bella',
            explain: 'Città = femenino. Antes del nombre femenino: bella (= forma normal fem.).',
          },
          {
            scene: 'Estudiantes importantes',
            lines: [['Zhanna', 'I nostri studenti sono ___. (importante)']],
            options: ['importanti', 'importante', 'importanta', 'importanto'],
            answer: 'importanti',
            explain: 'Studenti = masculino plural. Grupo 2: importante → importanti.',
          },
          {
            scene: 'Un buen café',
            lines: [['Marco', 'David fa sempre un ___ caffè. (buono)']],
            options: ['buon', 'buono', 'buona', 'buoni'],
            answer: 'buon',
            explain: 'Caffè = masc. sg. que empieza por consonante. Antes del nombre: un buon caffè.',
          },
          {
            scene: 'Clases interesantes',
            lines: [['Ana', 'Le lezioni di italiano sono ___! (interessante)']],
            options: ['interessanti', 'interessante', 'interessanta', 'interessanto'],
            answer: 'interessanti',
            explain: 'Lezioni = femenino plural. Grupo 2: interessante → interessanti.',
          },
          {
            scene: 'Un chico guapo',
            lines: [['Lina', 'Marco è proprio un ___ ragazzo. (bello)']],
            options: ['bel', 'bello', 'bella', 'bei'],
            answer: 'bel',
            explain: 'Ragazzo = masc. sg. que empieza por consonante simple. Antes: bel ragazzo.',
          },
          {
            scene: 'Profesoras bravas',
            lines: [['Carlo', 'Le insegnanti di WeLearn sono molto ___. (bravo)']],
            options: ['brave', 'bravi', 'brava', 'bravo'],
            answer: 'brave',
            explain: 'Insegnanti = femenino plural. Grupo 1: bravo → brave (fem. pl.).',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Diálogo con dos adjetivos',
        tag: '2 espacios',
        intro: 'Completa los adjetivos del diálogo con la forma correcta.',
        type: 'dual',
        items: [
          {
            scene: 'La clase y el profesor',
            lines: [
              ['Sofia', 'La lezione è [[0]] (interessante) e il professore è [[1]] (bravo).'],
            ],
            blanks: [
              { options: ['interessante', 'interessanti', 'interessanta'], answer: 'interessante', explain: 'Lezione = fem. sg. Grupo 2: interessante (sing. invariable en género).' },
              { options: ['bravo', 'brava', 'bravi'], answer: 'bravo', explain: 'Professore = masc. sg. Grupo 1: bravo (masc. sg.).' },
            ],
          },
          {
            scene: 'Los libros y las canciones',
            lines: [['Carlo', 'I libri sono [[0]] (nuovo) e le canzoni sono [[1]] (bello).']],
            blanks: [
              { options: ['nuovi', 'nuove', 'nuovo'], answer: 'nuovi', explain: 'Libri = masc. pl. Grupo 1: nuovo → nuovi.' },
              { options: ['belle', 'belli', 'bello'], answer: 'belle', explain: 'Canzoni = fem. pl. Dopo il nome: belle.' },
            ],
          },
          {
            scene: 'Las estudiantes',
            lines: [['David', 'Sofia e Lina sono ragazze [[0]] (bravo) e molto [[1]] (intelligente).']],
            blanks: [
              { options: ['brave', 'bravi', 'brava'], answer: 'brave', explain: 'Ragazze = fem. pl. Grupo 1: bravo → brave.' },
              { options: ['intelligenti', 'intelligente', 'intelligento'], answer: 'intelligenti', explain: 'Ragazze = fem. pl. Grupo 2: intelligente → intelligenti.' },
            ],
          },
          {
            scene: 'Un buen estudiante',
            lines: [['Zhanna', 'Carlo è un [[0]] (buono) studente e un [[1]] (bello) esempio per tutti.']],
            blanks: [
              { options: ['buono', 'buon', 'buona'], answer: 'buono', explain: 'Studente empieza por s+cons. → uno buono studente / un buono studente.' },
              { options: ['bell\'', 'bel', 'bello'], answer: 'bell\'', explain: 'Esempio empieza por vocal → bell\'esempio.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'WeLearn è bella!',
        tag: 'Opciones',
        intro: 'Completa el texto con la forma correcta de cada adjetivo.',
        type: 'guidedText',
        scene: 'David describe la academia WeLearn a un nuevo estudiante',
        text: 'WeLearn è una scuola [[0]] (piccolo). Abbiamo professori [[1]] (bravo) e lezioni [[2]] (interessante). L\'ambiente è [[3]] (caldo e accogliente). Gli studenti sono [[4]] (giovane) e [[5]] (motivato). Le classi sono [[6]] (piccolo) — massimo dieci persone. È una [[7]] (bello) esperienza imparare qui!',
        blanks: [
          { options: ['piccola', 'piccolo', 'piccoli'], answer: 'piccola', explain: 'Scuola = fem. sg. Grupo 1: piccolo → piccola.' },
          { options: ['bravi', 'brave', 'bravo'], answer: 'bravi', explain: 'Professori = masc. pl. Grupo 1: bravo → bravi.' },
          { options: ['interessanti', 'interessante', 'interessanto'], answer: 'interessanti', explain: 'Lezioni = fem. pl. Grupo 2: interessante → interessanti.' },
          { options: ['caldo', 'calda', 'caldi'], answer: 'caldo', explain: 'Ambiente = masc. sg. → caldo (masc. sg.).' },
          { options: ['giovani', 'giovane', 'giovano'], answer: 'giovani', explain: 'Studenti = masc. pl. Grupo 2: giovane → giovani.' },
          { options: ['motivati', 'motivate', 'motivato'], answer: 'motivati', explain: 'Studenti = masc. pl. Grupo 1: motivato → motivati.' },
          { options: ['piccole', 'piccoli', 'piccola'], answer: 'piccole', explain: 'Classi = fem. pl. Grupo 1: piccolo → piccole.' },
          { options: ['bella', 'bello', 'belle'], answer: 'bella', explain: 'Esperienza = fem. sing. → una bella esperienza (antes del nombre: forma normal fem.).' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la forma correcta del adjetivo entre paréntesis.',
        type: 'freeText',
        scene: 'Lina describe personas y cosas de su vida en italiano',
        text: 'Ho un\'amica [[0]] (simpatico) che si chiama Ana. Abitiamo in una città [[1]] (grande). Frequentiamo una scuola [[2]] (ottimo). I nostri professori sono [[3]] (preparato). Le lezioni sono [[4]] (lungo) ma [[5]] (interessante). Abbiamo libri [[6]] (nuovo) e molto [[7]] (utile).',
        blanks: [
          { answer: 'simpatica', explain: 'Amica = fem. sg. Grupo 1: simpatico → simpatica.' },
          { answer: 'grande', explain: 'Città = fem. sg. Grupo 2: grande (sing., invariable en género).' },
          { answer: 'ottima', explain: 'Scuola = fem. sg. Grupo 1: ottimo → ottima.' },
          { answer: 'preparati', explain: 'Professori = masc. pl. Grupo 1: preparato → preparati.' },
          { answer: 'lunghe', explain: 'Lezioni = fem. pl. Grupo 1: lungo → lunghe.' },
          { answer: 'interessanti', explain: 'Lezioni = fem. pl. Grupo 2: interessante → interessanti.' },
          { answer: 'nuovi', explain: 'Libri = masc. pl. Grupo 1: nuovo → nuovi.' },
          { answer: 'utili', explain: 'Libri = masc. pl. Grupo 2: utile → utili.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la oración completa con el adjetivo en la forma y posición correcta.',
        type: 'write',
        items: [
          {
            scene: 'Una buena pizza',
            prompt: 'Escribe: En Nápoles hay una buena pizza. → A Napoli c\'è una ___ pizza. (buono)',
            answer: 'A Napoli c\'è una buona pizza.',
            accepted: ['a napoli c\'è una buona pizza', 'a napoli c\'e una buona pizza'],
            explain: 'Buona pizza — buono antes del nombre femenino: buona.',
          },
          {
            scene: 'Profesores inteligentes',
            prompt: 'Escribe: Los profesores de WeLearn son inteligentes. → I professori di WeLearn sono ___. (intelligente)',
            answer: 'I professori di WeLearn sono intelligenti.',
            accepted: ['i professori di welearn sono intelligenti', 'i professori di welearn sono intelligenti.'],
            explain: 'Professori = masc. pl. Grupo 2: intelligente → intelligenti.',
          },
          {
            scene: 'Una ciudad bella',
            prompt: 'Escribe: Roma es una ciudad bella y grande. → Roma è una città ___ e ___. (bello / grande)',
            answer: 'Roma è una città bella e grande.',
            accepted: ['roma è una città bella e grande', 'roma e una città bella e grande'],
            explain: 'Città = fem. sg. Bella (después del nombre, forma normal). Grande (Grupo 2, sing. invariable).',
          },
          {
            scene: 'Un buen libro',
            prompt: 'Escribe: Tengo un buen libro nuevo. → Ho un ___ libro ___. (buono / nuovo)',
            answer: 'Ho un buon libro nuovo.',
            accepted: ['ho un buon libro nuovo', 'ho un buon libro nuovo.'],
            explain: 'Un buon libro — buono antes, masc. sg. consonante. Nuovo después del nombre.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión final',
        tag: 'Reto final',
        intro: 'Describe personas y cosas usando adjetivos en italiano.',
        type: 'write',
        items: [
          {
            scene: 'Describe a tu profesor',
            prompt: 'Descrivi il tuo professore/la tua professoressa di italiano: È ___. Ha lezioni ___.',
            answer: 'Il mio professore è bravo e simpatico. Ha lezioni interessanti e utili.',
            accepted: ['è bravo', 'è intelligente', 'ha lezioni interessanti', 'ha lezioni utili'],
            explain: 'Masc. sg.: bravo, simpatico. Lezioni fem. pl.: interessanti, utili.',
          },
          {
            scene: 'Describe tu ciudad',
            prompt: 'Descrivi la tua città: È una città ___. Ha ___.',
            answer: 'È una città grande e bella. Ha parchi belli e ristoranti buoni.',
            accepted: ['è una città grande e bella', 'è bella e grande', 'ha parchi belli'],
            explain: 'Città fem. sg.: grande (Grupo 2), bella. Parchi masc. pl.: belli. Ristoranti masc. pl.: buoni.',
          },
          {
            scene: 'Describe WeLearn',
            prompt: 'Descrivi la scuola WeLearn con almeno 3 aggettivi.',
            answer: 'WeLearn è una scuola piccola ma ottima. I professori sono bravi e motivati. Le lezioni sono interessanti.',
            accepted: ['piccola', 'ottima', 'bravi', 'interessanti', 'motivati'],
            explain: 'Concordanza: scuola fem. sg. → piccola, ottima. Professori masc. pl. → bravi. Lezioni fem. pl. → interessanti.',
          },
        ],
      },
    ],
  },
}

export default topic
