import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'alfabeto-cirilico',
  order: '01',
  color: '#1a2ecc',
  category: 'Escritura',
  level: 'A1',
  title: 'Alfabeto Cirílico en ruso A1 — Las 33 letras del ruso',
  shortTitle: 'Alfabeto cirílico',
  metaTitle: 'Alfabeto cirílico ruso A1 — las 33 letras con pronunciación para hispanohablantes',
  description:
    'El alfabeto cirílico ruso tiene 33 letras. Muchas son similares al latino (А, Е, О, С, К, М, Т), otras son nuevas (Ж, Ш, Щ, Ц, Ч, Ю, Я) y algunas son "trampas" — letras de aspecto latino con sonido diferente (Н=N, Р=R, В=V, Х=KH). Dominar el cirílico es el primer paso del ruso.',
  lead: '33 letras. Unas 10 parecen latinas y suenan parecido. Otras 10 son trampas: В=V, Н=N, Р=R, С=S, Х=KH, Е=YE, И=I, У=U. Las 13 restantes son nuevas. ¡Aprende las trampas primero!',
  outcomes: [
    'Lee y escribe las 33 letras del alfabeto cirílico ruso',
    'Identifica las "letras trampa" que parecen latinas pero suenan diferente',
    'Lee palabras rusas básicas usando transliteración',
  ],

  guide: {
    goal: 'Aprender el alfabeto cirílico ruso distinguiendo letras familiares, trampas y nuevas.',
    model: 'А=A (como español), В=V (no B), Н=N (no H), Р=R (no P), С=S (no C), Х=KH (no X)',
    formula: '[letra cirílica] → [sonido en español]',
    decisions: [
      'Letras "fáciles" (similares al latín): А(a) Е(ye) К(k) М(m) О(o) Т(t)',
      'TRAMPAS (parecen latinas pero suenan diferente): В(v) Н(n) Р(r) С(s) Х(kh) У(u) Е(ye) И(i)',
      'Letras nuevas: Б(b) Г(g) Д(d) Ж(zh) З(z) Й(y) Л(l) П(p) Ф(f)',
      'Sibilantes: Ш(sh) Щ(shch) Ц(ts) Ч(ch)',
      'Vocales suaves: Я(ya) Ё(yo) Ю(yu) Э(e)',
      'Signos: Ъ(signo duro, sin sonido) Ь(signo blando, suaviza la consonante)',
    ],
    table: [
      ['Grupo', 'Letras', 'Sonido'],
      ['Fáciles', 'А О М К Т', 'a o m k t (como en español)'],
      ['TRAMPAS', 'В Н Р С Х У И Е', 'v n r s kh u i ye (¡no confundir!)'],
      ['Nuevas', 'Б Г Д Л П Ф З Й', 'b g d l p f z y'],
      ['Sibilantes', 'Ж Ш Щ Ц Ч', 'zh sh shch ts ch'],
      ['Vocales compuestas', 'Я Ё Ю Э', 'ya yo yu e'],
    ],
    mistakes: [
      'Н no es "H" — Н = N. "Нет" se lee "nyet" (no), no "het".',
      'Р no es "P" — Р = R vibrante. "Россия" = "Rossiya" (Rusia).',
      'В no es "B" — В = V. "Вот" = "vot" (aquí está), no "bot".',
      'С no es "C" — С = S. "Спасибо" = "spasibo" (gracias), no "cpasibo".',
    ],
  },
  seo: [
    {
      heading: 'El cirílico ruso: 33 letras y sus grupos',
      paragraphs: [
        'El alfabeto cirílico ruso tiene 33 letras. Para el hispanohablante, la estrategia más eficaz es dividirlas en tres grupos: (1) las que parecen latinas y suenan similar (А, О, К, М, Т), (2) las "trampas" — letras que parecen latinas pero suenan diferente (В=V, Н=N, Р=R, С=S) y (3) las letras completamente nuevas.',
        'Las trampas son el mayor obstáculo inicial. Ver "РЕСТОРАН" y leer "PECTOPAH" en vez de "RESTORAN" (restaurante) es el error clásico. Una vez memorizadas las trampas (В, Н, Р, С, Х sobre todo), la lectura mejora rápidamente porque el resto del cirílico sigue siendo fonético — cada letra tiene un sonido fijo, mucho más regular que el inglés o el francés.',
      ],
    },
    {
      heading: 'Signos blando y duro: Ь y Ъ',
      paragraphs: [
        'Dos letras rusas no tienen sonido propio. Ь (znak myagkiy = signo blando) suaviza la consonante anterior: день (den\') = día, con consonante palatalizada. Ъ (tvyordiy znak = signo duro) separa una consonante de una vocal y crea pausa articulatoria: объявление (ob\'yavleniye). En A1 basta con saber que Ь suaviza.',
        'El acento en ruso (тоническое ударение) no se escribe normalmente en textos cotidianos pero determina la pronunciación de las vocales. La О no acentuada suena como "a": Москва (Moskva) no "Mosk-VA". En A1 aprende palabras con su acento marcado cuando sea posible.',
      ],
    },
  ],
  visual: {
    mode: 'alphabet-chart',
    teacherLens: 'El estudiante aprende el cirílico por grupos: fáciles, trampas, nuevas, sibilantes.',
    graphicPrompt: 'Tabla cirílico × sonido con grupo color-coded. Trampas en rojo.',
    scene: [
      ['А О М К Т', 'fáciles (similares al latín)'],
      ['В=v Н=n Р=r С=s Х=kh', 'TRAMPAS (cuidado)'],
      ['Я=ya Ю=yu Ж=zh Ш=sh Ч=ch', 'nuevas y sibilantes'],
    ],
    learnerModes: ['visual: tabla de letras por grupo', 'analítico: trampa vs fácil', 'oral: deletrear palabras'],
    reviewFocus: ['В=v no b', 'Н=n no h', 'Р=r no p', 'С=s no c', 'Х=kh'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Sonido de letras cirílicas',
        tag: 'Opción múltiple',
        intro: 'Elige el sonido correcto para cada letra cirílica.',
        type: 'choice',
        items: [
          {
            scene: 'Trampa clásica',
            lines: [['Diego', '¿Cómo se pronuncia la letra Н?']],
            options: ['n', 'h', 'r', 'v'],
            answer: 'n',
            explain: 'Н = n (como en "noche"). No es "h" aunque se parece al latín H.',
          },
          {
            scene: 'Trampa clásica 2',
            lines: [['Diego', '¿Cómo se pronuncia la letra Р?']],
            options: ['r', 'p', 'b', 'n'],
            answer: 'r',
            explain: 'Р = r vibrante (como en "perro"). No es "p".',
          },
          {
            scene: 'Trampa clásica 3',
            lines: [['Diego', '¿Cómo se pronuncia la letra В?']],
            options: ['v', 'b', 'w', 'f'],
            answer: 'v',
            explain: 'В = v (como en "vino"). No es "b".',
          },
          {
            scene: 'Trampa clásica 4',
            lines: [['Diego', '¿Cómo se pronuncia la letra С?']],
            options: ['s', 'c', 'k', 'z'],
            answer: 's',
            explain: 'С = s (como en "sol"). No es "c" ni "k".',
          },
          {
            scene: 'Vocal compuesta',
            lines: [['Diego', '¿Cómo se pronuncia la letra Я?']],
            options: ['ya', 'a', 'ia', 'je'],
            answer: 'ya',
            explain: 'Я = ya (como "ya" en inglés o "lla" coloquial). Vocal compuesta y+a.',
          },
          {
            scene: 'Sibilante',
            lines: [['Diego', '¿Cómo se pronuncia la letra Ш?']],
            options: ['sh', 'ch', 's', 'zh'],
            answer: 'sh',
            explain: 'Ш = sh (como "sh" en "shampoo"). Sibilante sorda.',
          },
          {
            scene: 'Sibilante 2',
            lines: [['Diego', '¿Cómo se pronuncia la letra Ж?']],
            options: ['zh', 'z', 'sh', 'ch'],
            answer: 'zh',
            explain: 'Ж = zh (como la "g" de "garage" en inglés). Sibilante sonora.',
          },
          {
            scene: 'Letra fácil',
            lines: [['Diego', '¿Cómo se pronuncia la letra М?']],
            options: ['m', 'n', 'p', 'b'],
            answer: 'm',
            explain: 'М = m. Idéntica al latín. Sin trampa aquí.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Leer palabras en cirílico',
        tag: '2 sonidos',
        intro: 'Lee las dos sílabas de la palabra rusa.',
        type: 'dual',
        items: [
          {
            scene: 'Нет (no)',
            lines: [['Diego', 'НЕТ = [[0]] + [[1]] + т = "nyet" (no)']],
            blanks: [
              { options: ['n', 'h', 'r'], answer: 'n', explain: 'Н = n. Primera trampa: Н es n, no h.' },
              { options: ['ye', 'e', 'i'], answer: 'ye', explain: 'Е = ye. Vocal compuesta y+e.' },
            ],
          },
          {
            scene: 'Россия (Rusia)',
            lines: [['Diego', 'РОССИЯ = [[0]]оссия = primer sonido']],
            blanks: [
              { options: ['r', 'p', 'b'], answer: 'r', explain: 'Р = r vibrante. No es "p".' },
              { options: ['ya', 'a', 'ja'], answer: 'ya', explain: 'Я = ya. Final de Россия = Rossiya.' },
            ],
          },
          {
            scene: 'Спасибо (gracias)',
            lines: [['Diego', 'СПАСИБО = [[0]]пасибо — primer sonido']],
            blanks: [
              { options: ['s', 'c', 'k'], answer: 's', explain: 'С = s. No es "c". Spasibo comienza con s.' },
              { options: ['i', 'y', 'e'], answer: 'i', explain: 'И = i (no "y"). Спасибо = spa-SI-bo.' },
            ],
          },
          {
            scene: 'Привет (hola)',
            lines: [['Diego', 'ПРИВЕТ = [[0]]ривет — primer y segundo sonido']],
            blanks: [
              { options: ['p', 'r', 'b'], answer: 'p', explain: 'П = p. Nueva letra (no trampa). Привет comienza con p.' },
              { options: ['r', 'p', 'n'], answer: 'r', explain: 'Р = r. Trampа: Р es r, no p.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Palabras cirílicas',
        tag: 'Opciones',
        intro: 'Elige la transliteración correcta de la palabra rusa.',
        type: 'guidedText',
        scene: 'Palabras rusas básicas — ¿cómo se leen?',
        text: '1) НЕТ = [[0]] | 2) ДА = [[1]] | 3) СПАСИБО = [[2]] | 4) ПРИВЕТ = [[3]] | 5) РОССИЯ = [[4]]',
        blanks: [
          { options: ['nyet', 'het', 'pyet'], answer: 'nyet', explain: 'НЕТ = N(Н)+YE(Е)+T(Т) = nyet = no.' },
          { options: ['da', 'ba', 'pa'], answer: 'da', explain: 'ДА = D(Д)+A(А) = da = sí.' },
          { options: ['spasibo', 'cpasibo', 'zvacivo'], answer: 'spasibo', explain: 'СПАСИБО: С=s, П=p, А=a, С=s, И=i, Б=b, О=o = spasibo.' },
          { options: ['privet', 'bhivet', 'phivet'], answer: 'privet', explain: 'ПРИВЕТ: П=p, Р=r, И=i, В=v, Е=ye, Т=t = privet.' },
          { options: ['rossiya', 'possess', 'россп'], answer: 'rossiya', explain: 'РОССИЯ: Р=r, О=o, С=s, С=s, И=i, Я=ya = rossiya.' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la transliteración (pronunciación) de las letras rusas.',
        type: 'freeText',
        scene: 'Transliteración del cirílico',
        text: '¿Qué sonido tiene cada letra? Н=[[0]] | Р=[[1]] | В=[[2]] | С=[[3]] | Я=[[4]] | Ш=[[5]] | Ж=[[6]]',
        blanks: [
          { answer: 'n', explain: 'Н = n. Trampa principal.' },
          { answer: 'r', explain: 'Р = r. Trampa principal.' },
          { answer: 'v', explain: 'В = v. Trampa principal.' },
          { answer: 's', explain: 'С = s. Trampa principal.' },
          { answer: 'ya', explain: 'Я = ya. Vocal compuesta.' },
          { answer: 'sh', explain: 'Ш = sh. Sibilante.' },
          { answer: 'zh', explain: 'Ж = zh. Sibilante sonora.' },
        ],
      },
      {
        id: 'l5',
        title: 'Leer palabras rusas',
        tag: 'Producción',
        intro: 'Lee la palabra rusa y escribe su transliteración.',
        type: 'write',
        items: [
          {
            scene: 'Da (sí)',
            prompt: 'Transliterar: ДА (sí)',
            answer: 'da',
            accepted: ['da'],
            explain: 'Д=d, А=a → da.',
          },
          {
            scene: 'Privet (hola)',
            prompt: 'Transliterar: ПРИВЕТ (hola)',
            answer: 'privet',
            accepted: ['privet'],
            explain: 'П=p, Р=r, И=i, В=v, Е=ye, Т=t → privet.',
          },
          {
            scene: 'Spasibo (gracias)',
            prompt: 'Transliterar: СПАСИБО (gracias)',
            answer: 'spasibo',
            accepted: ['spasibo'],
            explain: 'С=s, П=p, А=a, С=s, И=i, Б=b, О=o → spasibo.',
          },
          {
            scene: 'Moskva (Moscú)',
            prompt: 'Transliterar: МОСКВА (Moscú)',
            answer: 'moskva',
            accepted: ['moskva'],
            explain: 'М=m, О=o, С=s, К=k, В=v, А=a → moskva.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión: frases básicas',
        tag: 'Reto final',
        intro: 'Lee y comprende estas frases básicas en ruso.',
        type: 'write',
        items: [
          {
            scene: 'Hola en ruso',
            prompt: 'Transliterar y traducir: ПРИВЕТ → ___',
            answer: 'privet = hola',
            accepted: ['privet = hola', 'privet', 'privet hola'],
            explain: 'ПРИВЕТ = privet = hola (informal).',
          },
          {
            scene: 'Gracias en ruso',
            prompt: 'Transliterar y traducir: СПАСИБО → ___',
            answer: 'spasibo = gracias',
            accepted: ['spasibo = gracias', 'spasibo', 'spasibo gracias'],
            explain: 'СПАСИБО = spasibo = gracias.',
          },
          {
            scene: 'Rusia en ruso',
            prompt: 'Transliterar: РОССИЯ → ___',
            answer: 'rossiya',
            accepted: ['rossiya', 'rossia'],
            explain: 'РОССИЯ = Rossiya = Rusia.',
          },
        ],
      },
    ],
  },
}

export default topic
