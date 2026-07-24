import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronombres-relativos',
  order: '18',
  color: '#1a2ecc',
  category: 'Pronombres',
  level: 'A2',
  title: 'Pronombres relativos en ruso A2: который, которая, которое, которые',
  shortTitle: 'Pronombre relativo который',
  metaTitle: 'Pronombre relativo ruso A2 — который, которая, которое, которые, concordancia de caso',
  description:
    'El pronombre relativo en ruso es который (que, quien, el cual). Concuerda en género y número con el sustantivo antecedente, pero adopta el caso que le corresponde por su función en la oración subordinada. Ejemplos: Девушка, которая поёт (la chica que canta — nom.fem.); Книга, которую я читаю (el libro que leo — acus.fem.); Человек, с которым я говорил (la persona con quien hablé — instr.masc.).',
  lead: 'Фильм, который я видел / Девушка, с которой я говорил: pronombres relativos en ruso A2.',
  outcomes: [
    'Concordar который en género y número con el antecedente',
    'Usar el caso correcto de который según su función en la subordinada',
    'Construir oraciones de relativo con preposición + который',
    'Distinguir который (animado e inanimado) del uso de кто/что',
  ],

  guide: {
    goal: 'Usar который con concordancia de género/número y caso correcto en oraciones de relativo.',
    model: 'Это фильм, который я видел. (Esta es la película que vi.) / Это девушка, которая поёт. (Esta es la chica que canta.) / Это книги, которые я купил. (Estos son los libros que compré.)',
    formula: 'Antecedente (género+número) → который/которая/которое/которые | función en subord. → caso de который',
    decisions: [
      'Masc. sg.: который (Nom.), которого (Gen./Acus. anim.), которому (Dat.), которым (Instr.), котором (Prep.)',
      'Fem. sg.: которая (Nom.), которую (Acus.), которой (Gen./Dat./Prep.), которой (Instr.)',
      'Neutro sg.: которое (Nom./Acus.), — resto como masc.',
      'Plural: которые (Nom.), которых (Gen./Acus. anim./Prep.), которым (Dat.), которыми (Instr.)',
      'Con preposición: preposición precede a который: в котором, с которой, о которых',
    ],
    table: [
      ['Género', 'Nominativo', 'Acusativo (inan.)'],
      ['Masculino', 'который', 'который'],
      ['Femenino', 'которая', 'которую'],
      ['Neutro', 'которое', 'которое'],
    ],
    mistakes: [
      '"Фильм, что я видел" — en lenguaje hablado se acepta, pero formal: "фильм, который я видел" ✓.',
      '"Девушка, которого" ❌ → "Девушка, которую / которая" — который concuerda con девушка (fem.), no con другой sustantivo.',
      '"Человек, с кем говорил" — кем puede usarse en coloquial, pero formal: "человек, с которым говорил" ✓.',
    ],
  },

  seo: [
    {
      heading: 'Который: el pronombre relativo ruso y su concordancia',
      paragraphs: [
        'En ruso el pronombre relativo универсальный es который. Concuerda en género y número con el sustantivo al que se refiere (el antecedente), pero su caso lo determina la función que cumple dentro de la oración subordinada. Si el sustantivo es masculino, который/которого/которому etc.; si es femenino, которая/которую/которой etc.; si es plural, которые/которых/которыми etc.',
        'Ejemplos con diferentes casos: "Книга, которую я читаю" (el libro que leo — которую porque es complemento directo de читаю, femenino acusativo); "Человек, которому я позвонил" (la persona a quien llamé — которому, dativo masculino, porque llamé A alguien); "Город, в котором я живу" (la ciudad en la que vivo — в котором, preposición в + prepositivo masculino).',
      ],
    },
    {
      heading: 'Который con preposiciones y casos oblicuos',
      paragraphs: [
        'Cuando el pronombre relativo lleva preposición, esta se coloca ANTES de который (no al final como en inglés): "la ciudad en la que vivo" = "город, в котором я живу" (no "город, который я живу в"). La preposición selecciona el caso: в + prepositivo → в котором; с + instrumental → с которым; о + prepositivo → о котором; из + genitivo → из которого.',
        'Para personas, кто y что también pueden introducir relativas informalmente: "тот, кто помог мне" (el que me ayudó). Pero который es el estándar para todo tipo de antecedentes en el registro formal y escrito.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'género+número → forma который | función en subord. → caso | prep. + который (nunca al final)',
    graphicPrompt: 'Flecha de antecedente a pronombre relativo con cambio de caso según función.',
    scene: [
      ['Фильм, который я видел, был отличным.', 'La película que vi era excelente.'],
      ['Девушка, которая поёт, — моя сестра.', 'La chica que canta es mi hermana.'],
      ['Книга, которую я читаю, очень интересная.', 'El libro que leo es muy interesante.'],
      ['Дом, в котором он живёт, старый.', 'La casa en la que vive es antigua.'],
      ['Друг, с которым я учился, живёт в Москве.', 'El amigo con quien estudié vive en Moscú.'],
      ['Слова, которые я не знаю, трудные.', 'Las palabras que no conozco son difíciles.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['concordancia género/número с антецедентом', 'caso по функции', 'preposición + который (antes)', 'которую (acus. fem.)'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la forma correcta de который',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma de который que concuerda con el antecedente.',
        type: 'choice',
        items: [
          {
            scene: 'Фильм, ___ я смотрел вчера, был классным.',
            lines: [['', 'Фильм, ___ я смотрел вчера, был классным.']],
            options: ['который', 'которая', 'которое', 'которые'],
            answer: 'который',
            explain: '"который" — фильм (masc. inan.) → который. Función: объект смотрел (Acus. inan. = Nom. form).',
          },
          {
            scene: 'Девушка, ___ поёт, — моя подруга.',
            lines: [['', 'Девушка, ___ поёт, — моя подруга.']],
            options: ['которая', 'который', 'которую', 'которое'],
            answer: 'которая',
            explain: '"которая" — девушка (fem.) → которая. Función: sujeto de поёт (Nominativo).',
          },
          {
            scene: 'Слова, ___ я учу, трудные.',
            lines: [['', 'Слова, ___ я учу, трудные.']],
            options: ['которые', 'который', 'которая', 'которое'],
            answer: 'которые',
            explain: '"которые" — слова (plural neutro/masc.) → которые (Nom./Acus. pl. inan.).',
          },
          {
            scene: 'Дом, в ___ я живу, большой.',
            lines: [['', 'Дом, в ___ я живу, большой.']],
            options: ['котором', 'который', 'которого', 'которому'],
            answer: 'котором',
            explain: '"котором" — в + Prepositivo. дом (masc.) → в котором.',
          },
          {
            scene: 'Книга, ___ я купил, интересная.',
            lines: [['', 'Книга, ___ я купил, интересная.']],
            options: ['которую', 'которая', 'который', 'которое'],
            answer: 'которую',
            explain: '"которую" — книга (fem.) → Acusativo femenino = которую. Función: объект купил.',
          },
          {
            scene: 'Человек, с ___ я работаю, очень умный.',
            lines: [['', 'Человек, с ___ я работаю, очень умный.']],
            options: ['которым', 'которого', 'которому', 'котором'],
            answer: 'которым',
            explain: '"которым" — с + Instrumental. человек (masc.) → с которым.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Antecedente y función',
        tag: '2 espacios',
        intro: 'Elige la forma de который correcta para el género y el caso.',
        type: 'dual',
        items: [
          {
            scene: 'Профессор, которого я спросил, ответил быстро. (El prof. a quien pregunté respondió rápido.)',
            lines: [['', 'Профессор, [[0]] я [[1]], ответил быстро.']],
            blanks: [
              { options: ['которого', 'который', 'которому', 'которым'], answer: 'которого', explain: '"которого" — профессор (masc. anim.) → Acusativo animado = которого.' },
              { options: ['спросил', 'спрошу', 'спрашиваю', 'спросить'], answer: 'спросил', explain: '"спросил" — pasado masc. de спросить.' },
            ],
          },
          {
            scene: 'El museo en el que estuve era enorme.',
            lines: [['', 'Музей, в [[0]] я [[1]], был огромным.']],
            blanks: [
              { options: ['котором', 'который', 'которого', 'которым'], answer: 'котором', explain: '"котором" — в + Prepositivo. музей (masc.) → в котором.' },
              { options: ['был', 'буду', 'есть', 'бывать'], answer: 'был', explain: '"был" — pasado masc. de быть. Я был в музее.' },
            ],
          },
          {
            scene: 'Las chicas con quienes estudiamos son muy listas.',
            lines: [['', 'Девушки, с [[0]] мы [[1]], очень умные.']],
            blanks: [
              { options: ['которыми', 'которых', 'которым', 'которые'], answer: 'которыми', explain: '"которыми" — с + Instrumental plural. девушки (fem. pl.) → с которыми.' },
              { options: ['учимся', 'учим', 'учились', 'учиться'], answer: 'учимся', explain: '"учимся" — presente de учиться (мы). contexto actual.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Descripción de la ciudad',
        tag: 'Texto guiado',
        intro: 'Completa el texto descriptivo con las formas correctas de который.',
        type: 'guidedText',
        scene: 'Турист описывает город.',
        text: 'Москва — это город, [[0]] я мечтал посетить. Красная площадь, [[1]] я видел на фотографиях, оказалась ещё красивее. Люди, [[2]] я познакомился, были очень добры. Метро, в [[3]] я ездил каждый день, — самое красивое в мире.',
        blanks: [
          { options: ['который', 'которая', 'которое', 'которых'], answer: 'который', explain: '"который" — город (masc.) → который. Función: Acus. inan. (мечтал о котором → ellipsis, aquí simplificado como который).' },
          { options: ['которую', 'которая', 'которого', 'которой'], answer: 'которую', explain: '"которую" — площадь (fem.) → Acus. femenino. Función: объект видел.' },
          { options: ['с которыми', 'которых', 'которыми', 'которые'], answer: 'с которыми', explain: '"с которыми" — люди (pl.) + познакомился с + Instrumental pl. → с которыми.' },
          { options: ['котором', 'который', 'которых', 'которым'], answer: 'котором', explain: '"котором" — в + Prepositivo. метро (neutro) → в котором.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Forma oraciones de relativo',
        tag: 'Texto libre',
        intro: 'Sin opciones: escribe la forma correcta de который.',
        type: 'freeText',
        scene: 'Напиши форму относительного местоимения.',
        text: 'Фильм, [[0]] (Acus. inan. masc.) я видел / Подруга, [[1]] (Nom. fem.) пела / О городе, в [[2]] (Prep. masc.) я жил / Друзья, [[3]] (с + Instr. pl.) я учился',
        blanks: [
          { answer: 'который', explain: '"который" — фильм (masc. inan.) → Acus. inan. = Nom. masc. = который.' },
          { answer: 'которая', explain: '"которая" — подруга (fem.) → Nominativo fem. = которая.' },
          { answer: 'котором', explain: '"котором" — в + Prepositivo masc. (город) → в котором.' },
          { answer: 'которыми', explain: '"которыми" — с + Instrumental plural → с которыми.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Escribe oraciones de relativo',
        tag: 'Escritura guiada',
        intro: 'Escribe oraciones completas con pronombre relativo.',
        type: 'write',
        items: [
          {
            scene: 'El libro que estoy leyendo es muy interesante.',
            prompt: 'Usa книга (fem.) + которую + читаю.',
            answer: 'Книга, которую я читаю, очень интересная.',
            accepted: ['Книга, которую читаю, очень интересная.'],
            explain: '"которую" — книга (fem.) Acus. = которую. Función: объект читаю.',
          },
          {
            scene: 'La amiga con quien hablo es rusa.',
            prompt: 'Usa подруга (fem.) + с которой + говорю.',
            answer: 'Подруга, с которой я говорю, — русская.',
            accepted: ['Девушка, с которой я разговариваю, русская.'],
            explain: '"с которой" — подруга (fem.) с + Instrumental fem. = с которой.',
          },
          {
            scene: 'Los estudiantes que aprueban el examen recibirán un diploma.',
            prompt: 'Usa студенты (pl.) + которые + сдадут экзамен.',
            answer: 'Студенты, которые сдадут экзамен, получат диплом.',
            accepted: ['Студенты, которые сдали экзамен, получат диплом.'],
            explain: '"которые" — студенты (pl.) → Nom. pl. = которые. Función: sujeto de сдадут.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe personas y lugares',
        tag: 'Escritura libre',
        intro: 'Usa который para hacer descripciones detalladas.',
        type: 'write',
        items: [
          {
            scene: 'Describe a 3 personas importantes en tu vida usando который.',
            prompt: 'Используй человек/друг/учитель + который/которая + función.',
            answer: 'Моя мама — человек, которого я люблю больше всего. Мой лучший друг — человек, с которым я знаком с детства. Учительница, которая учила меня в школе, стала для меня примером.',
            accepted: ['Мой отец — человек, который всегда мне помогал. Моя подруга — та, с которой мы учились вместе. Профессор, которого я помню, был очень строгим.'],
            explain: 'человека (Gen./Acus. anim.) | с которым/которой (с + Instr.) | которая (Nom. fem.) — concordancia con antecedente.',
          },
          {
            scene: 'Describe tu ciudad ideal con oraciones de relativo.',
            prompt: 'Используй город/парк/люди + который/которые + описание.',
            answer: 'Идеальный город — это место, в котором всегда светит солнце. Там есть парки, в которых можно гулять. Люди, которые там живут, добрые и открытые.',
            accepted: ['Город мечты — место, которое наполнено зеленью. Улицы, по которым ходят люди, чистые. Дома, в которых живут семьи, красивые.'],
            explain: 'в котором (в + Prep. neutro/masc.) | в которых (в + Prep. pl.) | которые (Nom. pl.) | по которым (по + Dat. pl.).',
          },
        ],
      },
    ],
  },
}

export default topic
