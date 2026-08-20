import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'caso-genitivo',
  order: '08',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A1',
  title: 'El caso genitivo en ruso: posesión, ausencia y números',
  shortTitle: 'Caso genitivo',
  metaTitle: 'Caso genitivo en ruso A1 | родительный падеж — posesión y нет',
  description:
    'El genitivo (родительный падеж — rodítelny padyezh) es el caso más versátil del ruso. Expresa posesión (el libro de Marina = книга Марины), ausencia con нет (no tengo = у меня нет), y se usa después de números (dos estudiantes = два студента). La construcción У меня есть/нет es la forma rusa de "tener".',
  lead: 'Domina el genitivo ruso: posesión sin "de", negación de existencia con нет, y la peculiar manera en que el ruso expresa "tener" con у меня есть/нет.',
  outcomes: [
    'Formar el genitivo singular de sustantivos masculinos, femeninos y neutros',
    'Usar нет + genitivo para expresar ausencia',
    'Construir la expresión у + genitivo + есть/нет para "tener/no tener"',
  ],
  guide: {
    goal: 'Usar el genitivo para posesión, ausencia y después de números básicos.',
    model: 'У [pronombre genitivo] есть/нет + [sustantivo genitivo]',
    formula: 'книга Марины (de Marina) | нет + genitivo | у меня есть/нет',
    decisions: [
      '¿Expresas posesión? → sustantivo poseedor en genitivo (книга Марины = el libro de Marina)',
      '¿Dices que algo no existe/no tienes? → нет + genitivo (нет книги = no hay libro / no tengo libro)',
      '¿Usas números 2-4? → genitivo singular (два студента = dos estudiantes)',
      '¿Usas números 5+? → genitivo plural (пять студентов = cinco estudiantes)',
      '¿Dices que tienes algo? → у + genitivo del poseedor + есть + nominativo',
    ],
    table: [
      ['Género', 'Nominativo', 'Genitivo'],
      ['Masculino', 'студент (stud.) / брат (hermano)', 'студента / брата — añadir -а'],
      ['Masculino -й/-ь', 'музей (museo) / учитель', 'музея / учителя — añadir -я'],
      ['Femenino -а', 'книга (libro) / сестра', 'книги / сестры — -а → -ы'],
      ['Femenino -я', 'неделя (semana)', 'недели — -я → -и'],
      ['Neutro -о/-е', 'окно (ventana) / море', 'окна / моря — -о/-е → -а/-я'],
    ],
    mistakes: [
      'У меня нет книги — el sustantivo va en GENITIVO después de нет, no en nominativo.',
      'La posesión en ruso no usa "de" como preposición — el sustantivo poseedor va en genitivo directamente: книга Марины (no "книга де Марина").',
      'Femenino -ы/-и: después de г, к, х, ж, ш, щ, ч → siempre -и (книги, не книгы — regla ortográfica).',
      'У меня есть vs мне нравится: У меня есть = tengo (posesión). Мне нравится = me gusta (dativo).',
    ],
  },
  seo: [
    {
      heading: '¿Qué es el caso genitivo en ruso y cuándo se usa?',
      paragraphs: [
        'El genitivo (родительный падеж) es el caso más frecuente del ruso después del nominativo. Tiene tres usos principales en A1: expresar posesión (книга Марины — el libro de Marina), expresar ausencia con нет (Нет книги — No hay libro), y seguir a ciertos números (два студента — dos estudiantes).',
        'A diferencia del español, el ruso expresa la posesión sin preposición: el sustantivo poseedor simplemente toma la forma del genitivo. "El libro de Bruno" → книга Давида (no "libro de Давид").',
      ],
      table: [
        ['Uso', 'Estructura', 'Ejemplo'],
        ['Posesión', 'sustantivo + genitivo del poseedor', 'книга Марины — el libro de Marina'],
        ['Ausencia (нет)', 'нет + sustantivo genitivo', 'Нет времени — No hay tiempo'],
        ['Tener (positivo)', 'У + genitivo + есть + nominativo', 'У меня есть книга — Tengo un libro'],
        ['No tener', 'У + genitivo + нет + genitivo', 'У меня нет книги — No tengo libro'],
        ['Números 2-4', 'число + genitivo sg', 'два студента — dos estudiantes'],
      ],
    },
    {
      heading: '¿Cómo se dice "tener" en ruso con У меня есть/нет?',
      paragraphs: [
        'El ruso no tiene un verbo directo equivalente a "tener" (como el español tener o el inglés have). En cambio usa la construcción у + [poseedor en genitivo] + есть + [objeto en nominativo]. У меня есть книга = literalmente "Cerca de mí hay un libro" = Tengo un libro.',
        'Para la negación: у + [poseedor genitivo] + нет + [objeto en GENITIVO]. У меня нет книги = No tengo libro (книга → книги en genitivo). ¡Atención: el objeto cambia de nominativo a genitivo al negar!',
      ],
    },
    {
      heading: '¿Por qué los números cambian el sustantivo al genitivo?',
      paragraphs: [
        'Los números en ruso afectan el caso del sustantivo siguiente. Con 1: nominativo singular (один студент). Con 2, 3, 4: genitivo singular (два студента, три книги, четыре окна). Con 5 en adelante: genitivo plural (пять студентов, десять книг).',
        'En A1 es suficiente saber que después de dos, tres y cuatro, el sustantivo toma una forma especial. El genitivo plural se aprenderá más adelante en A2.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The у меня есть/нет construction is the single most important A1 grammar point for expressing possession and absence — students use it constantly from day one.',
    graphicPrompt:
      'Three-panel diagram: Panel 1 "Posesión" with arrow, Panel 2 "У меня есть/нет" with plus/minus icons, Panel 3 "Números + genitivo" with 2-4 highlighted. Blue scheme.',
    scene: [
      ['Posesión', 'книга Марины (kniga Maríny) — el libro de Marina'],
      ['У меня есть', 'У меня есть книга (U menya yest kniga) — Tengo un libro'],
      ['У меня нет', 'У меня нет книги (U menya nyet knigi) — No tengo libro'],
      ['Нет + genitivo', 'Нет времени (Nyet vrémeni) — No hay tiempo'],
      ['Números 2-4', 'два студента (dva studyenta) — dos estudiantes'],
      ['Números 5+', 'пять студентов (pyat studyentov) — cinco estudiantes'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['иметь (у меня есть)', 'нет', 'posesión con genitivo'],
    reviewFocus: ['нет + genitivo', 'у меня есть vs нет', 'posesión sin "de"'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento del genitivo',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma genitiva correcta y su uso.',
        type: 'choice',
        items: [
          { scene: 'Formación genitivo', lines: [['', '¿Cuál es el genitivo de "книга" (kniga — libro, fem -а)?']], options: ['книгу', 'книги', 'книге', 'книгой'], answer: 'книги', explain: 'книга → книги. Femenino -а → -ы/-и (después de г → -и).' },
          { scene: 'Genitivo masculino', lines: [['', '¿Cuál es el genitivo de "студент" (studyent — estudiante, masc)?']], options: ['студента', 'студенту', 'студентом', 'студенте'], answer: 'студента', explain: 'студент → студента. Masculino consonante → añadir -а en genitivo.' },
          { scene: 'Posesión', lines: [['', 'Para decir "el libro de Marina" en ruso, ¿qué forma de Марина usas?']], options: ['Марины', 'Марине', 'Марину', 'Мариной'], answer: 'Марины', explain: 'книга Марины. Марина → Марины. Femenino -а → -ы en genitivo.' },
          { scene: 'У меня есть/нет', lines: [['', '"No tengo libro" en ruso: У меня нет ___']], options: ['книга', 'книгу', 'книги', 'книге'], answer: 'книги', explain: 'У меня нет книги. После нет el sustantivo va en GENITIVO. книга → книги.' },
          { scene: 'У меня есть', lines: [['', '"Tengo un libro" en ruso: У меня ___ книга.']], options: ['нет', 'есть', 'не', 'нету'], answer: 'есть', explain: 'У меня есть книга = Tengo un libro. есть expresa existencia/posesión.' },
          { scene: 'Números', lines: [['', '"Dos estudiantes" en ruso: два ___']], options: ['студент', 'студенты', 'студентов', 'студента'], answer: 'студента', explain: 'два/три/четыре + genitivo singular. студент → студента.' },
          { scene: 'Genitivo femenino -я', lines: [['', '¿Cuál es el genitivo de "неделя" (nedelya — semana, fem -я)?']], options: ['недели', 'неделю', 'неделе', 'недель'], answer: 'недели', explain: 'неделя → недели. Femenino -я → -и en genitivo.' },
          { scene: 'У меня нет — negación', lines: [['', 'La diferencia entre "У меня есть книга" y "У меня нет книги" es:']], options: ['Solo el verbo cambia', 'Solo el orden cambia', 'El objeto cambia de nominativo a genitivo', 'No hay diferencia'], answer: 'El objeto cambia de nominativo a genitivo', explain: 'Positivo: есть + nominativo (книга). Negativo: нет + genitivo (книги). El caso del objeto cambia.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Posesión y "У меня"',
        tag: '2 espacios',
        intro: 'Completa las expresiones de posesión y ausencia con genitivo.',
        type: 'dual',
        items: [
          { scene: 'Posesión con genitivo', lines: [['', '"El teléfono de Bruno": телефон [[0]] → genitivo de Давид: [[1]]']], blanks: [{ options: ['Давида', 'Давиду', 'Давидом', 'Давид'], answer: 'Давида', explain: 'Давид (masc consonante) → Давида en genitivo.' }, { options: ['-а', '-у', '-е', '-ом'], answer: '-а', explain: 'Masculino consonante añade -а en genitivo.' }] },
          { scene: 'У меня есть/нет', lines: [['', '"No tengo tiempo": У меня [[0]] [[1]].']], blanks: [{ options: ['нет', 'есть', 'не', 'нету'], answer: 'нет', explain: 'У меня нет = No tengo / No hay.' }, { options: ['времени', 'время', 'времени', 'временем'], answer: 'времени', explain: 'время (ntr) → времени en genitivo. нет siempre pide genitivo.' }] },
          { scene: 'У меня есть', lines: [['', '"Tengo una hermana": У меня [[0]] [[1]].']], blanks: [{ options: ['есть', 'нет', 'не', 'нету'], answer: 'есть', explain: 'У меня есть = Tengo.' }, { options: ['сестра', 'сестры', 'сестре', 'сестру'], answer: 'сестра', explain: 'Con есть el sustantivo va en NOMINATIVO. сестра (fem nominativo).' }] },
          { scene: 'Números y genitivo', lines: [['', '"Tres libros": три [[0]]; el genitivo de книга es [[1]].']], blanks: [{ options: ['книги', 'книга', 'книг', 'книге'], answer: 'книги', explain: 'три + genitivo singular. книга → книги.' }, { options: ['книги', 'книгу', 'книга', 'книге'], answer: 'книги', explain: 'Femenino -а → -ы/-и (после г → -и). книга → книги.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — genitivo en contexto',
        tag: 'Opciones',
        intro: 'Elige la forma genitiva correcta para cada espacio.',
        type: 'guidedText',
        scene: 'El genitivo en situaciones reales',
        text: 'Это телефон [[0]]. (Este es el teléfono de Vera.) У [[1]] есть машина. (Bruno tiene carro.) У Анны нет [[2]]. (Ana no tiene libro.) В классе три [[3]]. (En la clase hay tres estudiantes.) Нет [[4]]! (¡No hay tiempo!)',
        blanks: [
          { options: ['Жанна', 'Жанны', 'Жанне', 'Жанну'], answer: 'Жанны', explain: 'Жанна → Жанны. Femenino -а → -ы en genitivo. Posesión: teléfono de Vera.' },
          { options: ['Давид', 'Давиде', 'Давида', 'Давиду'], answer: 'Давида', explain: 'У Давида есть. Давид → Давида en genitivo. La construcción "у + genitivo + есть".' },
          { options: ['книга', 'книгу', 'книги', 'книге'], answer: 'книги', explain: 'У Анны нет книги. Después de нет: genitivo. книга → книги.' },
          { options: ['студент', 'студента', 'студентов', 'студенты'], answer: 'студента', explain: 'Три + genitivo singular. студент → студента.' },
          { options: ['время', 'времени', 'временем', 'времен'], answer: 'времени', explain: 'Нет времени. время → времени en genitivo. Clásica expresión rusa.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — producción del genitivo',
        tag: 'Sin opciones',
        intro: 'Escribe la forma genitiva correcta sin opciones.',
        type: 'freeText',
        scene: 'Escribiendo el genitivo',
        text: '1. "No tengo carro" (машина — carro, fem): У меня нет [[0]]. 2. "El libro de Sofia" (София — Sofia, fem -а): книга [[1]]. 3. "Cuatro libros" (книга — fem): четыре [[2]]. 4. "Tengo un hermano" (брат — hermano, masc): У меня есть [[3]]. 5. "No hay problema" (проблема, fem): Нет [[4]].',
        blanks: [
          { answer: 'машины', accepted: ['машины'], explain: 'машина (fem -а) → машины en genitivo. У меня нет машины.' },
          { answer: 'Софии', accepted: ['Софии', 'софии'], explain: 'София (fem -ия) → Софии en genitivo. книга Софии = el libro de Sofia.' },
          { answer: 'книги', accepted: ['книги'], explain: 'четыре (4) + genitivo sg. книга → книги.' },
          { answer: 'брат', accepted: ['брат', 'Брат'], explain: 'Con есть el sustantivo va en NOMINATIVO. У меня есть брат.' },
          { answer: 'проблем', accepted: ['проблем', 'проблемы'], explain: 'Нет проблем — frase hecha (genitivo plural). También aceptable: Нет проблемы (sg).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas usando el genitivo.',
        type: 'write',
        items: [
          { scene: 'Posesión', prompt: 'Traduce al ruso: "El libro de Carlos está en la mesa." (стол = mesa, лежит = está)', answer: 'Книга Карлоса лежит на столе', accepted: ['книга карлоса лежит на столе', 'книга карлоса на столе'], explain: 'Книга Карлоса лежит на столе. Карлос → Карлоса (masc consonante → -а genitivo).' },
          { scene: 'У меня есть/нет', prompt: 'Traduce al ruso: "Tengo un teléfono, pero no tengo tablet." (телефон — tel., планшет — tablet)', answer: 'У меня есть телефон, но у меня нет планшета', accepted: ['у меня есть телефон', 'у меня нет планшета'], explain: 'У меня есть телефон, но у меня нет планшета. планшет (masc) → планшета en genitivo después de нет.' },
          { scene: 'Números', prompt: 'Traduce al ruso: "En la clase hay cinco estudiantes." (в классе = en clase, пять = cinco)', answer: 'В классе пять студентов', accepted: ['в классе пять студентов'], explain: 'В классе пять студентов. Пять (5+) + genitivo plural: студент → студентов.' },
          { scene: 'Ausencia', prompt: 'Traduce al ruso: "No hay tiempo." (время → врem.)', answer: 'Нет времени', accepted: ['нет времени'], explain: 'Нет времени. время → времени en genitivo. Frase rusa muy frecuente.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Habla de lo que tienes y no tienes usando el genitivo.',
        type: 'write',
        items: [
          { scene: 'Presentando posesiones', prompt: 'Lina le cuenta a Bruno qué tiene y qué no tiene. Escribe 3 oraciones: una con есть, dos con нет. Usa: ноутбук (laptop), время (tiempo), деньги (dinero, pl), друзья (amigos).', answer: 'У Лины есть ноутбук. У неё нет времени. У неё нет денег.', accepted: ['есть', 'нет'], explain: 'У Лины есть ноутбук. У неё нет времени. У неё нет денег. (у неё = de ella, genitivo).' },
          { scene: 'Posesión de objetos', prompt: 'Describe qué pertenece a quién en tu clase. Ej: "El libro de Ana, el teléfono de Marco". Escribe 2 oraciones con genitivo de posesión.', answer: 'Это книга Анны. Это телефон Марко.', accepted: ['книга', 'телефон', 'геnitivo'], explain: 'Это книга Анны. Esto + sustantivo + nombre en genitivo. Анна → Анны.' },
        ],
      },
    ],
  },
}

export default topic
