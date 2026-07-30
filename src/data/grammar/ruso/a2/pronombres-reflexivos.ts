import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronombres-reflexivos',
  order: '13',
  color: '#1a2ecc',
  category: 'Pronombres',
  level: 'A2',
  title: 'Pronombres reflexivos en ruso A2: себя y свой',
  shortTitle: 'Reflexivos себя/свой',
  metaTitle: 'Pronombres reflexivos ruso A2 — себя, себе, собой, свой, своя, своё, своих',
  description:
    'En ruso, себя es el pronombre reflexivo personal (a sí mismo/misma) que se declina pero no tiene forma de nominativo: себя (Gen/Acus.), себе (Dat/Prep.), собой/собою (Inst.). Свой es el adjetivo posesivo reflexivo (su propio/su propia) que concuerda con el objeto poseído y se usa cuando el poseedor es el sujeto de la oración: Он взял свою книгу (tomó su propio libro). Se contraste con его/её/их (ajeno).',
  lead: 'Он думает о себе / Она взяла свою сумку: los reflexivos себя y свой en ruso A2.',
  outcomes: [
    'Declinar себя en los casos principales',
    'Usar себя con preposiciones (о себе, у себя, с собой)',
    'Usar свой cuando el poseedor es el sujeto',
    'Distinguir свой de его/её/их',
  ],

  guide: {
    goal: 'Usar себя y свой correctamente para expresar reflexividad y posesión reflexiva.',
    model: 'Он рассказал о себе. (Habló de sí mismo.) / Она взяла свою сумку, а не его. (Tomó su propio bolso, no el de él.)',
    formula: 'себя: sin nominativo | Gen/Acus: себя | Dat/Prep: себе | Inst: собой | свой: concuerda con objeto poseído',
    decisions: [
      'себя (Acus.): "Он видит себя в зеркале" = se ve en el espejo',
      'себе (Dat.): "Она купила себе кофе" = se compró un café (para sí misma)',
      'себе (Prep.): "Расскажи о себе" = habla de ti (mismo/misma)',
      'собой (Inst.): "Возьми это с собой" = lleva esto contigo',
      'свой = el objeto es del sujeto: "Он любит свою маму" = ama a su (propia) mamá',
    ],
    table: [
      ['Caso', 'Себя', 'Uso'],
      ['Genitivo / Acusativo', 'себя', 'Он видит себя / Она купила для себя'],
      ['Dativo / Prepositivo', 'себе', 'Купи себе / Думать о себе'],
      ['Instrumental', 'собой', 'Иди с собой / Доволен собой'],
    ],
    mistakes: [
      '"Себя" no tiene nominativo — nunca: "себя пришёл" ❌.',
      '"Он взял его книгу" = tomó el libro de otra persona | "Он взял свою книгу" = tomó su propio libro.',
      '"Возьми себя с собой" ❌ → "Возьми это с собой" ✓ — с собой = contigo, consigo.',
    ],
  },

  seo: [
    {
      heading: '¿Cómo funciona el pronombre reflexivo себя?',
      paragraphs: [
        'Себя es el pronombre reflexivo en ruso — equivale a "a sí mismo/misma", "te", "se" según el contexto. No tiene forma de nominativo porque el sujeto reflexivo es siempre el mismo sujeto de la frase. Se declina: себя (Gen./Acus.), себе (Dat./Prep.), собой/собою (Inst.). Frases clave: "о себе" (sobre sí mismo/oneself), "у себя" (en casa/en su lugar), "с собой" (consigo), "для себя" (para sí mismo).',
        'Ejemplos con preposiciones: "Расскажи о себе" (cuéntame sobre ti), "Возьми зонтик с собой" (lleva el paraguas contigo), "Купи себе что-нибудь" (cómprate algo), "Он доволен собой" (está satisfecho consigo mismo). La elección de себя/себе/собой depende de la preposición o la función gramatical.',
      ],
    },
    {
      heading: '¿En qué se diferencia свой de его, её e их?',
      paragraphs: [
        'Свой es un adjetivo posesivo reflexivo que indica que el poseedor es el sujeto de la oración. Concuerda con el sustantivo poseído: свой (masc.), своя (fem.), своё (neut.), свои (pl.). "Он взял свою книгу" = He took his own book (= la suya). Contrasta con "его книгу" = He took his book (= de otra persona).',
        'La regla: cuando el poseedor coincide con el sujeto, usa свой. Cuando el poseedor es diferente del sujeto, usa его/её/их. "Мария любит свою кошку" (María ama a su gata — la suya) vs "Мария любит её кошку" (María ama la gata de ella — de otra persona).',
      ],
    },
    {
      heading: '¿Cómo se declina себя y por qué no tiene nominativo?',
      paragraphs: [
        'себя no tiene forma de nominativo porque nunca es el sujeto: siempre remite al sujeto de la oración. Se declina en el resto de casos con una sola forma para todas las personas y géneros: acusativo/genitivo себя, dativo/prepositivo себе, instrumental собой. Ejemplos: Он купил себе книгу (se compró un libro), Расскажи о себе (habla de ti), Она довольна собой (está satisfecha de sí misma).',
        'La trampa para el hispanohablante es que себя vale para "me/te/se/nos" según el sujeto: Я вижу себя, Ты видишь себя, Они видят себя usan la misma palabra. No cambia con la persona, solo con el caso que exija el verbo o la preposición.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'себя/себе/собой = reflexivo personal. свой = posesivo reflexivo (sujeto = poseedor).',
    graphicPrompt: 'Persona mirándose al espejo (себя) y señalando sus propias cosas (свой).',
    scene: [
      ['Она смотрит на себя в зеркало.', 'Ella se mira en el espejo.'],
      ['Расскажи мне о себе.', 'Cuéntame sobre ti.'],
      ['Возьми зонтик с собой — будет дождь.', 'Lleva el paraguas contigo — va a llover.'],
      ['Он взял свои ключи и ушёл.', 'Cogió sus (propias) llaves y se fue.'],
      ['Она купила себе новое платье.', 'Se compró un vestido nuevo (para sí misma).'],
      ['Он доволен собой после экзамена.', 'Está satisfecho consigo mismo después del examen.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['себя (Acus/Gen)', 'себе (Dat/Prep)', 'собой (Inst)', 'свой = del sujeto vs его/её/их = ajeno'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige себя, себе o собой',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma correcta del pronombre reflexivo.',
        type: 'choice',
        items: [
          {
            scene: 'Расскажи мне о ___.',
            lines: [['', 'Расскажи мне о ___.']],
            options: ['себе', 'себя', 'собой', 'сам'],
            answer: 'себе',
            explain: '"о себе" — preposición о + prepositivo → себе.',
          },
          {
            scene: 'Она видит ___ в зеркале.',
            lines: [['', 'Она видит ___ в зеркале.']],
            options: ['себя', 'себе', 'собой', 'сам'],
            answer: 'себя',
            explain: '"видит себя" — acusativo (objeto directo de видеть) → себя.',
          },
          {
            scene: 'Он купил ___ новую рубашку.',
            lines: [['', 'Он купил ___ новую рубашку.']],
            options: ['себе', 'себя', 'собой', 'сам'],
            answer: 'себе',
            explain: '"купил себе" — dativo (para sí mismo, beneficiario) → себе.',
          },
          {
            scene: 'Возьми документы с ___.',
            lines: [['', 'Возьми документы с ___.']],
            options: ['собой', 'себе', 'себя', 'сам'],
            answer: 'собой',
            explain: '"с собой" — instrumental (с + instrumental) → собой.',
          },
          {
            scene: 'Она недовольна ___.',
            lines: [['', 'Она недовольна ___.']],
            options: ['собой', 'себе', 'себя', 'сам'],
            answer: 'собой',
            explain: '"недовольна собой" — instrumental (стать/быть + instrumental) → собой.',
          },
          {
            scene: 'У ___ дома есть хороший компьютер.',
            lines: [['', 'У ___ дома есть хороший компьютер.']],
            options: ['себя', 'себе', 'собой', 'сам'],
            answer: 'себя',
            explain: '"у себя дома" — у + genitivo (fijo = себя). Significa "en su propia casa".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Свой vs его/её/их',
        tag: '2 espacios',
        intro: 'Completa con свой o его/её/их según quien es el poseedor.',
        type: 'dual',
        items: [
          {
            scene: 'Antón toma su libro (= el propio) / María toma el libro de Antón.',
            lines: [['', 'Антон взял [[0]] книгу. Мария взяла [[1]] книгу.']],
            blanks: [
              { options: ['свою', 'его', 'её', 'их'], answer: 'свою', explain: '"свою книгу" — Антон tomó su propio libro (poseedor = sujeto → свой, fem. Acus. → свою).' },
              { options: ['его', 'свою', 'её', 'их'], answer: 'его', explain: '"его книгу" — María tomó el libro de él (poseedor ≠ sujeto → его).' },
            ],
          },
          {
            scene: 'Ella ama a su madre (la propia) / Él ama la familia de ella.',
            lines: [['', 'Она любит [[0]] маму. Он любит [[1]] семью.']],
            blanks: [
              { options: ['свою', 'её', 'его', 'их'], answer: 'свою', explain: '"свою маму" — ella ama a su propia madre (sujeto = poseedor → свою, fem. Acus.).' },
              { options: ['её', 'свою', 'его', 'их'], answer: 'её', explain: '"её семью" — él ama la familia de ella (poseedor ≠ sujeto → её).' },
            ],
          },
          {
            scene: 'Los estudiantes tienen sus propios libros / El profesor tiene los libros de ellos.',
            lines: [['', 'Студенты взяли [[0]] книги. Преподаватель взял [[1]] книги.']],
            blanks: [
              { options: ['свои', 'их', 'его', 'её'], answer: 'свои', explain: '"свои книги" — los estudiantes tienen sus propios libros → свои (pl.).' },
              { options: ['их', 'свои', 'его', 'её'], answer: 'их', explain: '"их книги" — el profesor tiene los libros de ellos (poseedor ≠ sujeto → их).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Conversación sobre uno mismo',
        tag: 'Texto guiado',
        intro: 'Completa con себя/себе/собой o свой.',
        type: 'guidedText',
        scene: 'Анна рассказывает о себе.',
        text: 'Мне нравится рассказывать о [[0]]. Я горжусь [[1]] — я много работала этот год. Я всегда ношу с [[2]] маленькую записную книжку. Я люблю [[3]] кота — он самый умный ! Мой коллега тоже любит кошек, но он любит [[4]] кошку больше.',
        blanks: [
          { options: ['себе', 'себя', 'собой', 'себе'], answer: 'себе', explain: '"о себе" — preposición о + prepositivo → себе.' },
          { options: ['собой', 'себя', 'себе', 'свой'], answer: 'собой', explain: '"горжусь собой / ношу с собой" — instrumental → собой.' },
          { options: ['своего', 'его', 'её', 'своя'], answer: 'своего', explain: '"своего кота" — Anna ama a su propio gato (sujeto = poseedor → своего, masc. gen./acus. anim.).' },
          { options: ['свою', 'её', 'своё', 'его'], answer: 'свою', explain: '"свою кошку" — коллега ama a su propia gata (sujeto = poseedor → свою, fem. acus.).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con la forma correcta',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe себя/себе/собой o свой con concordancia.',
        type: 'freeText',
        scene: 'Напишите правильную форму.',
        text: 'Она думает о [[0]]. (reflexivo, sobre sí misma) / Он доволен [[1]]. (reflexivo, Instrumental) / Они взяли [[2]] паспорта. (sus propios, pl.) / Возьми зонтик с [[3]]. (contigo, Instrumental)',
        blanks: [
          { answer: 'себе', explain: '"о себе" — preposición о + prepositivo → себе.' },
          { answer: 'собой', explain: '"доволен собой" — предикат со instrumental → собой.' },
          { answer: 'свои', explain: '"свои паспорта" — ellos tomaron sus propios pasaportes → свои (pl.).' },
          { answer: 'собой', explain: '"с собой" — preposición с + instrumental → собой.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Usa sebya y svoy',
        tag: 'Escritura guiada',
        intro: 'Escribe la frase con el reflexivo o posesivo reflexivo correcto.',
        type: 'write',
        items: [
          {
            scene: 'Ella habla mucho sobre sí misma.',
            prompt: 'Usa говорить о + себе.',
            answer: 'Она много говорит о себе.',
            accepted: ['Она всегда говорит о себе.'],
            explain: '"о себе" — preposición о + prepositivo (себе).',
          },
          {
            scene: 'Él cogió su (propia) mochila y salió.',
            prompt: 'Usa свой en la forma correcta (fem. acusativo si рюкзак es masc.).',
            answer: 'Он взял свой рюкзак и вышел.',
            accepted: ['Он взял свой рюкзак и ушёл.'],
            explain: '"свой рюкзак" — рюкзак (masc. inan.) → свой (masc. acusativo = nominativo para inanimados).',
          },
          {
            scene: 'Lleva siempre el teléfono contigo.',
            prompt: 'Usa носить/брать + с собой.',
            answer: 'Всегда бери телефон с собой.',
            accepted: ['Носи телефон с собой.'],
            explain: '"с собой" — con + instrumental reflexivo → собой.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Habla de ti mismo/a',
        tag: 'Escritura libre',
        intro: 'Escribe un párrafo sobre ti mismo/a usando себя/себе/собой y свой.',
        type: 'write',
        items: [
          {
            scene: 'Descríbete: qué te gusta de ti, qué llevas siempre contigo.',
            prompt: 'Используй о себе, с собой, собой, свой/своя/своё/свои.',
            answer: 'Расскажу немного о себе. Я доволен собой в целом — я стараюсь работать усердно. Я всегда ношу с собой книгу. Мне нравится читать — я люблю своих авторов.',
            accepted: ['Немного о себе: я люблю путешествовать. Я всегда беру с собой фотоаппарат. Я горжусь своими фотографиями.'],
            explain: 'о себе (Prep.) / собой (Inst.) / с собой (с+Inst.) / своими (Inst. pl. de свой).',
          },
          {
            scene: 'Describe diferencias entre lo tuyo (propio) y lo de otra persona.',
            prompt: 'Используй свой vs его/её для comparar posesiones.',
            answer: 'Мой друг принёс свою гитару на вечеринку. Но я взял его гитару поиграть — моя была дома. В итоге каждый играл на своей гитаре.',
            accepted: ['Она взяла свою сумку, а я взял её пальто по ошибке. Потом мы обменялись — каждый взял своё.'],
            explain: 'свою/свой = del propio sujeto | его/её = de otra persona. Contraste clave.',
          },
        ],
      },
    ],
  },
}

export default topic
