import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'caso-acusativo',
  order: '07',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A1',
  title: 'El caso acusativo en ruso: el objeto directo',
  shortTitle: 'Caso acusativo',
  metaTitle: 'Caso acusativo en ruso A1 | винительный падеж — objeto directo',
  description:
    'El acusativo (винительный падеж — vinitelny padyezh) marca el objeto directo: lo que recibe la acción. La gran singularidad del ruso: la forma del acusativo depende de si el sustantivo es ANIMADO (persona/animal) o INANIMADO (objeto). Esta distinción no existe en español.',
  lead: 'Aprende el caso acusativo ruso — el objeto directo — y domina la distinción animado/inanimado que no existe en español.',
  outcomes: [
    'Formar el acusativo de sustantivos inanimados masculinos, femeninos y neutros',
    'Aplicar la regla animado/inanimado para masculinos',
    'Usar los verbos más comunes que piden acusativo',
  ],
  guide: {
    goal: 'Usar el acusativo para expresar el objeto directo de verbos transitivos.',
    model: 'Sujeto + verbo transitivo + objeto (acusativo)',
    formula: '[Sujeto nom.] + [verbo] + [objeto acusativo]',
    decisions: [
      '¿Es el objeto directo de la oración? → usa acusativo',
      '¿Es femenino? → cambia -а a -у (книга → книгу) o -я a -ю (неделя → неделю)',
      '¿Es masculino INANIMADO? → igual al nominativo (стол → стол)',
      '¿Es masculino ANIMADO (persona/animal)? → igual al genitivo (студент → студента)',
      '¿Es neutro? → igual al nominativo (окно → окно)',
    ],
    table: [
      ['Género/Animación', 'Nominativo', 'Acusativo'],
      ['Femenino (-а)', 'книга (libro)', 'книгу (el libro)'],
      ['Femenino (-я)', 'неделя (semana)', 'неделю (la semana)'],
      ['Masc. inanimado', 'стол (mesa)', 'стол (igual)'],
      ['Masc. animado', 'студент (estudiante)', 'студента'],
      ['Neutro', 'окно (ventana)', 'окно (igual)'],
    ],
    mistakes: [
      'Los sustantivos NEUTROS en acusativo son siempre iguales al nominativo — no cambian.',
      'Masculinos INANIMADOS tampoco cambian: Я вижу стол = Veo la mesa (стол no cambia).',
      'No confundas animado/inanimado: un muñeco (кукла — kuklya) es inanimado; una persona (студент) es animada — aunque ambos sean "cosas".',
      'El femenino -ь (como дверь — puerta) en acusativo NO cambia: Я вижу дверь.',
    ],
  },
  seo: [
    {
      heading: '¿Qué es el caso acusativo en ruso?',
      paragraphs: [
        'El acusativo (винительный падеж) es el caso del objeto directo — lo que recibe directamente la acción del verbo. Я читаю книгу (Leo un libro): книгу está en acusativo porque es el objeto directo de leer.',
        'En español el objeto directo no cambia la forma de las palabras. En ruso sí: книга (nominativo) se convierte en книгу (acusativo). Esto es lo que los rusos llaman "declinación".',
      ],
      table: [
        ['Nominativo', 'Acusativo', 'Ejemplo completo'],
        ['книга (libro, fem)', 'книгу', 'Я читаю книгу — Leo un libro'],
        ['стол (mesa, masc inani)', 'стол', 'Я вижу стол — Veo la mesa'],
        ['студент (masc anim)', 'студента', 'Я вижу студента — Veo al estudiante'],
        ['окно (ventana, neutro)', 'окно', 'Я открываю окно — Abro la ventana'],
      ],
    },
    {
      heading: 'La distinción animado/inanimado: el gran reto del acusativo',
      paragraphs: [
        'En ruso, los sustantivos se clasifican como ANIMADOS (personas, animales) o INANIMADOS (objetos, conceptos). Esta distinción afecta solo a los masculinos en acusativo singular: los animados toman la forma del genitivo (-а/-я), los inanimados se quedan igual que el nominativo.',
        'Я вижу студента (Veo al estudiante — animado: студент → студента). Я вижу стол (Veo la mesa — inanimado: стол → стол sin cambio). Esta distinción no existe en español y es uno de los primeros retos del ruso.',
      ],
    },
    {
      heading: 'Verbos que piden acusativo en A1',
      paragraphs: [
        'Los verbos más comunes que toman objeto directo en acusativo: читать (leer), видеть (ver), любить (querer/amar), знать (saber/conocer), пить (beber), есть (comer), слушать (escuchar), смотреть (mirar), понимать (entender), учить (estudiar/aprender).',
        'Regla práctica: si el verbo puede responder a "¿qué?" o "¿a quién?", el objeto va en acusativo. Я читаю что? — книгу. Я вижу кого? — студента.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The animate/inanimate distinction is the key cognitive shift in this lesson — once students internalize it for masculine nouns, they unlock a core Russian grammatical concept.',
    graphicPrompt:
      'Two-column diagram: left column "Nominativo" with arrows pointing right to "Acusativo". Animate nouns highlighted in orange (showing change), inanimate in grey (no change). Blue theme.',
    scene: [
      ['Я читаю...', 'книгу (knigU — libro, fem) · газету (gazetU — periódico)'],
      ['Я вижу...', 'студента (studyentA — animado) · стол (stol — inanimado, sin cambio)'],
      ['Я люблю...', 'музыку (mUziku — música) · кофе (kofe — café, invariable)'],
      ['Я пью...', 'воду (vOdu — agua) · сок (sok — jugo, masc inanimado)'],
      ['Я смотрю...', 'фильм (filM — película) · телевизор (televisor)'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['читать', 'видеть', 'любить', 'пить', 'знать', 'слушать'],
    reviewFocus: ['fem -а → -у', 'masc animado = genitivo', 'neutro/masc inanimado sin cambio'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento del acusativo',
        tag: 'Opción múltiple',
        intro: 'Identifica la forma correcta del acusativo para cada sustantivo.',
        type: 'choice',
        items: [
          { scene: 'Acusativo femenino', lines: [['', '¿Cuál es el acusativo de "книга" (kniga — libro)?']], options: ['книга', 'книге', 'книгу', 'книги'], answer: 'книгу', explain: 'книга → книгу. Femenino -а → -у en acusativo.' },
          { scene: 'Acusativo neutro', lines: [['', '¿Cuál es el acusativo de "окно" (okno — ventana)?']], options: ['окна', 'окне', 'окно', 'окном'], answer: 'окно', explain: 'окно → окно. Neutro: el acusativo es igual al nominativo. Sin cambio.' },
          { scene: 'Animado vs inanimado', lines: [['', '¿Cuál es el acusativo de "студент" (studyent — estudiante, animado)?']], options: ['студент', 'студентов', 'студенту', 'студента'], answer: 'студента', explain: 'студент (animado masculino) → студента. Acusativo animado = forma del genitivo.' },
          { scene: 'Inanimado masculino', lines: [['', '¿Cuál es el acusativo de "стол" (stol — mesa, inanimado)?']], options: ['стол', 'стола', 'столу', 'столом'], answer: 'стол', explain: 'стол (inanimado masculino) → стол. Masculino inanimado: acusativo = nominativo. Sin cambio.' },
          { scene: 'Verbos con acusativo', lines: [['', '"Я ___ книгу" (Yo leo un libro). ¿Qué verbo completa?']], options: ['иду', 'читаю', 'сижу', 'живу'], answer: 'читаю', explain: 'читать (leer) pide objeto directo en acusativo. Я читаю книгу = Leo un libro.' },
          { scene: 'Acusativo femenino -я', lines: [['', '¿Cuál es el acusativo de "неделя" (nedelya — semana)?']], options: ['неделя', 'неделе', 'неделю', 'недели'], answer: 'неделю', explain: 'неделя → неделю. Femenino -я → -ю en acusativo.' },
          { scene: 'Animado vs inanimado', lines: [['', 'Ana dice "Я вижу ___" y ve a su profesor. ¿Qué forma usa?']], options: ['учитель', 'учителем', 'учителя', 'учителю'], answer: 'учителя', explain: 'учитель (persona, animado) → учителя en acusativo. Igual al genitivo.' },
          { scene: 'Distinción conceptual', lines: [['', 'Un libro (inanimado) y un estudiante (animado): ¿cuáles cambian en acusativo masculino?']], options: ['Los dos', 'Solo el libro', 'Solo el estudiante (animado)', 'Ninguno'], answer: 'Solo el estudiante (animado)', explain: 'Masculinos: solo los ANIMADOS cambian en acusativo (→ genitivo form). Los inanimados quedan igual.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Transformación nominativo → acusativo',
        tag: '2 espacios',
        intro: 'Transforma cada sustantivo al acusativo e identifica el cambio.',
        type: 'dual',
        items: [
          { scene: 'Transformación acusativo', lines: [['', '"газета" (gazyeta — periódico, fem): nom → [[0]], cambio: [[1]]']], blanks: [{ options: ['газету', 'газета', 'газете', 'газетой'], answer: 'газету', explain: 'газета (fem -а) → газету (-а → -у).' }, { options: ['-а → -у', 'sin cambio', '-а → -е', '-а → -и'], answer: '-а → -у', explain: 'Femenino -а cambia a -у en acusativo.' }] },
          { scene: 'Transformación acusativo', lines: [['', '"врач" (vrach — médico, masc animado): nom → [[0]], regla: [[1]]']], blanks: [{ options: ['врача', 'врач', 'врачу', 'врачом'], answer: 'врача', explain: 'врач (masc animado) → врача. Acusativo animado = genitivo.' }, { options: ['animado = genitivo', 'inanimado = genitivo', 'sin cambio', '-а → -у'], answer: 'animado = genitivo', explain: 'Masculino animado: acusativo toma la forma del genitivo.' }] },
          { scene: 'Transformación acusativo', lines: [['', '"письмо" (pismo — carta, neutro): nom → [[0]], cambio: [[1]]']], blanks: [{ options: ['письмо', 'письма', 'письму', 'письмом'], answer: 'письмо', explain: 'письмо (neutro) → письмо. Sin cambio.' }, { options: ['sin cambio', '-о → -у', '-о → -а', '-о → -е'], answer: 'sin cambio', explain: 'Neutro: acusativo = nominativo. Sin cambio.' }] },
          { scene: 'Transformación acusativo', lines: [['', '"музыка" (múzika — música, fem): nom → [[0]], cambio: [[1]]']], blanks: [{ options: ['музыку', 'музыка', 'музыке', 'музыкой'], answer: 'музыку', explain: 'музыка (fem -а) → музыку (-а → -у).' }, { options: ['-а → -у', 'sin cambio', '-а → -и', '-а → -е'], answer: '-а → -у', explain: 'Femenino -а cambia a -у en acusativo.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — acusativo en oraciones',
        tag: 'Opciones',
        intro: 'Elige la forma acusativa correcta para completar cada oración.',
        type: 'guidedText',
        scene: 'Usando el acusativo con verbos transitivos',
        text: 'Я читаю [[0]]. (Leo un libro.) Давид видит [[1]]. (David ve al estudiante.) Я люблю [[2]]. (Amo la música.) Анна пьёт [[3]]. (Ana bebe agua.) Мы знаем [[4]]. (Conocemos al profesor.)',
        blanks: [
          { options: ['книга', 'книгу', 'книге', 'книги'], answer: 'книгу', explain: 'книга → книгу. Femenino -а → -у en acusativo.' },
          { options: ['студент', 'студенту', 'студента', 'студентом'], answer: 'студента', explain: 'студент (animado masc) → студента. Acusativo animado = genitivo.' },
          { options: ['музыка', 'музыке', 'музыку', 'музыкой'], answer: 'музыку', explain: 'музыка → музыку. Femenino -а → -у.' },
          { options: ['вода', 'воды', 'воду', 'водой'], answer: 'воду', explain: 'вода (voda — agua, fem -а) → воду. -а → -у en acusativo.' },
          { options: ['учитель', 'учителем', 'учителю', 'учителя'], answer: 'учителя', explain: 'учитель (animado masc) → учителя. Acusativo animado = genitivo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — producción del acusativo',
        tag: 'Sin opciones',
        intro: 'Escribe la forma acusativa correcta sin opciones.',
        type: 'freeText',
        scene: 'Escribiendo el acusativo',
        text: '1. кофе (kofe — café, invariable) en acusativo: [[0]]. 2. газета (periódico, fem) en acusativo: [[1]]. 3. Анна (Anna, nombre femenino animado) en acusativo: [[2]]. 4. стол (stol — mesa, masc inanimado) en acusativo: [[3]]. 5. сестра (sestra — hermana, fem) en acusativo: [[4]].',
        blanks: [
          { answer: 'кофе', accepted: ['кофе'], explain: 'кофе es invariable en ruso — nunca cambia de forma.' },
          { answer: 'газету', accepted: ['газету'], explain: 'газета (fem -а) → газету. -а → -у en acusativo.' },
          { answer: 'Анну', accepted: ['анну', 'Анну'], explain: 'Анна (nombre propio femenino, termina en -а) → Анну. -а → -у en acusativo.' },
          { answer: 'стол', accepted: ['стол'], explain: 'стол (masc inanimado) → стол. Sin cambio en acusativo.' },
          { answer: 'сестру', accepted: ['сестру', 'Сестру'], explain: 'сестра (sestra — hermana, fem -а) → сестру. -а → -у en acusativo.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas usando el acusativo correctamente.',
        type: 'write',
        items: [
          { scene: 'Acusativo femenino', prompt: 'Traduce al ruso: "Carlos lee el periódico." (читать — leer, газета — periódico)', answer: 'Карлос читает газету', accepted: ['карлос читает газету', 'carlos читает газету'], explain: 'Карлос читает газету. газета → газету (fem acusativo). читает = 3.ª sg.' },
          { scene: 'Acusativo animado', prompt: 'Traduce al ruso: "Veo a Lina." (видеть — ver, Лина — Lina)', answer: 'Я вижу Лину', accepted: ['я вижу лину', 'я вижу Лину'], explain: 'Я вижу Лину. Лина (fem animada, -а) → Лину en acusativo.' },
          { scene: 'Acusativo inanimado', prompt: 'Traduce al ruso: "Sofia escucha música." (слушать — escuchar, музыка — música)', answer: 'София слушает музыку', accepted: ['софия слушает музыку', 'sofia слушает музыку'], explain: 'София слушает музыку. музыка → музыку (fem -а → -у).' },
          { scene: 'Distinción animado/inanimado', prompt: 'Escribe dos oraciones: "Veo la silla." (стул — silla, masc inanimado) y "Veo al doctor." (врач — médico, masc animado)', answer: 'Я вижу стул. Я вижу врача.', accepted: ['я вижу стул', 'я вижу врача'], explain: 'стул (inanimado) → стул sin cambio. врач (animado) → врача (= genitivo).' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Usa el acusativo para hablar de lo que haces y lo que ves.',
        type: 'write',
        items: [
          { scene: 'Gustos y acciones', prompt: 'Escribe 3 cosas que haces regularmente en ruso. Usa: читать, слушать, любить, видеть, знать. Incluye el objeto directo en acusativo.', answer: 'Я читаю книгу. Я слушаю музыку. Я люблю кофе.', accepted: ['читаю', 'слушаю', 'люблю', 'вижу', 'знаю'], explain: 'Modelo: Я читаю книгу. Я слушаю музыку. Я люблю кофе. ¡Adapta según tus gustos!' },
          { scene: 'Descripción de personas', prompt: 'Marco ve a tres personas: una estudiante (студентка), al profesor (учитель) y a Ana (Анна). Escribe las tres oraciones.', answer: 'Марко видит студентку. Марко видит учителя. Марко видит Анну.', accepted: ['студентку', 'учителя', 'анну'], explain: 'студентка (fem -а animada) → студентку; учитель (masc animado) → учителя; Анна → Анну.' },
        ],
      },
    ],
  },
}

export default topic
