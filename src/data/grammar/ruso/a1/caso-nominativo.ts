import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'caso-nominativo',
  order: '06',
  color: '#1a2ecc',
  category: 'Casos',
  level: 'A1',
  title: 'El caso nominativo en ruso: el sujeto de la frase',
  shortTitle: 'Caso nominativo',
  metaTitle: 'Caso nominativo en ruso A1 | именительный падеж — el sujeto',
  description:
    'El nominativo (именительный падеж — imenítelny padyezh) es el caso base del ruso: la forma del diccionario. Marca el sujeto de la oración. A diferencia del español, en ruso el orden de palabras es flexible porque son los casos —no la posición— los que indican la función gramatical.',
  lead: 'Entiende el caso nominativo, la forma base de todos los sustantivos rusos, y aprende sus terminaciones para masculino, femenino, neutro y plural.',
  outcomes: [
    'Reconocer la forma nominativa de sustantivos masculinos, femeninos y neutros',
    'Identificar el sujeto de una oración rusa',
    'Formar plurales básicos en nominativo',
  ],
  guide: {
    goal: 'Usar sustantivos en nominativo como sujeto de oraciones simples.',
    model: '[Sustantivo nominativo] + [verbo conjugado] + ...',
    formula: 'Sujeto (nominativo) + predicado',
    decisions: [
      '¿Es el sujeto de la oración? → usa el nominativo (forma del diccionario)',
      '¿Termina en consonante? → masculino (стол — stol — mesa)',
      '¿Termina en -а/-я? → femenino (книга — kniga — libro)',
      '¿Termina en -о/-е? → neutro (окно — okno — ventana)',
      '¿Es plural? → masculino/femenino -ы/-и; neutro -а/-я',
    ],
    table: [
      ['Género', 'Terminación sg', 'Ejemplo'],
      ['Masculino', 'consonante / -й / -ь', 'стол (stol) — mesa'],
      ['Femenino', '-а / -я / -ь', 'книга (kniga) — libro'],
      ['Neutro', '-о / -е', 'окно (okno) — ventana'],
      ['Plural masc/fem', '-ы / -и', 'столы (stoly) — mesas'],
      ['Plural neutro', '-а / -я', 'окна (okna) — ventanas'],
    ],
    mistakes: [
      'El nominativo NO tiene sufijo especial — es la forma del diccionario. No añadas nada.',
      'El orden de palabras en ruso es flexible: Студент читает книгу y Книгу читает студент son ambas válidas — el caso nominativo (студент) marca quién es el sujeto.',
      'No confundas -а del nominativo femenino con -а del acusativo masculino animado — son distintos casos.',
      'El plural en -ы/-и tiene restricción ortográfica: después de г, к, х, ж, ш, щ, ч → siempre -и (книги, не книгы).',
    ],
  },
  seo: [
    {
      heading: '¿Qué es el caso nominativo en ruso?',
      paragraphs: [
        'El ruso tiene 6 casos gramaticales. El nominativo (именительный падеж) es el caso del sujeto — quien realiza la acción. Es también la forma que encuentras en el diccionario. Студент читает (El estudiante lee): студент está en nominativo porque es quien lee.',
        'La gran diferencia con el español: en español el orden de palabras marca la función ("El perro muerde al hombre" ≠ "Al hombre muerde el perro"). En ruso son los casos los que marcan la función, así que el orden es mucho más libre.',
      ],
      table: [
        ['Género', 'Singular', 'Plural'],
        ['Masculino', 'стол (stol) — consonante', 'столы (stoly) — -ы/-и'],
        ['Femenino', 'книга (kniga) — -а/-я', 'книги (knigi) — -ы/-и'],
        ['Neutro', 'окно (okno) — -о/-е', 'окна (okna) — -а/-я'],
      ],
    },
    {
      heading: '¿Cómo funciona el ruso sin artículos ("la mesa" vs "una mesa")?',
      paragraphs: [
        'Una ventaja enorme del ruso para hispanohablantes: no hay artículos definidos ni indefinidos. Стол significa tanto "una mesa" como "la mesa" — el contexto lo aclara. Студент = un estudiante / el estudiante.',
        'Esto simplifica mucho el nominativo: donde en español dices "el libro", en ruso dices simplemente книга. Sin artículo que concuerde.',
      ],
    },
    {
      heading: '¿Por qué el orden de palabras es tan flexible en ruso?',
      paragraphs: [
        'Gracias a los casos, el ruso puede cambiar el orden para dar énfasis sin cambiar el significado básico. Марина читает книгу (Marina lee el libro) y Книгу читает Марина expresan la misma acción. Марина está en nominativo en ambas frases — es siempre el sujeto.',
        'En A1 usa el orden estándar Sujeto-Verbo-Objeto. Pero al leer ruso ya sabrás que el nominativo (no la posición) señala al sujeto.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'The nominative is the anchor case — students who master it have the foundation for all other cases. Emphasize that word order flexibility comes from the case system.',
    graphicPrompt:
      'Three columns showing masculine/feminine/neuter nouns in nominative with their endings highlighted. Clean table, Russian script with transliteration, blue color scheme.',
    scene: [
      ['Masculino sg', 'стол (stol) — mesa · брат (brat) — hermano · учитель (uchítel) — maestro'],
      ['Femenino sg', 'книга (kniga) — libro · мама (mama) — mamá · дверь (dver) — puerta'],
      ['Neutro sg', 'окно (okno) — ventana · море (more) — mar · имя (imya) — nombre'],
      ['Plural masc', 'столы (stoly) — mesas · братья (bratya) — hermanos'],
      ['Plural fem', 'книги (knigi) — libros · мамы (mamy) — mamás'],
      ['Plural neutro', 'окна (okna) — ventanas · моря (morya) — mares'],
    ],
    learnerModes: ['recognition', 'gender-sort', 'gap-fill', 'production'],
    practiceVerbs: ['читать', 'работать', 'учиться', 'жить'],
    reviewFocus: ['nominativo = forma diccionario', 'sin artículo en ruso', 'plural -ы/-и'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento del nominativo',
        tag: 'Opción múltiple',
        intro: 'Identifica el sustantivo en caso nominativo (el sujeto) en cada oración.',
        type: 'choice',
        items: [
          { scene: 'Sujeto en ruso', lines: [['', '¿Cuál es la función del caso nominativo en ruso?']], options: ['Objeto directo', 'Sujeto de la oración', 'Posesión', 'Ubicación'], answer: 'Sujeto de la oración', explain: 'El nominativo marca el sujeto — quien realiza la acción. Es la forma base del diccionario.' },
          { scene: 'Terminación masculina', lines: [['', '¿Cuál de estas terminaciones corresponde al nominativo masculino singular?']], options: ['-а', '-у', 'consonante o -й', '-ого'], answer: 'consonante o -й', explain: 'Masculino nominativo sg: termina en consonante (стол), -й (музей) o -ь (учитель).' },
          { scene: 'Identificando sujeto', lines: [['', 'En "Марина читает книгу" (Marina lee un libro), ¿qué palabra está en nominativo?']], options: ['читает', 'книгу', 'Марина', 'не'], answer: 'Марина', explain: 'Марина (Marina) es el sujeto — quien realiza la acción de leer. Está en nominativo.' },
          { scene: 'Género neutro', lines: [['', '¿Qué terminación indica género neutro en nominativo singular?']], options: ['-а/-я', 'consonante', '-о/-е', '-ы/-и'], answer: '-о/-е', explain: 'Neutro nominativo sg: -о (окно — ventana) o -е (море — mar).' },
          { scene: 'Plural', lines: [['', '¿Cuál es el plural nominativo de "книга (kniga — libro)"?']], options: ['книгу', 'книге', 'книги', 'книгов'], answer: 'книги', explain: 'книга → книги. Plural femenino: -ы/-и. Después de г → siempre -и (regla ortográfica).' },
          { scene: 'Sin artículo', lines: [['', 'En ruso, ¿cómo se dice "el libro"?']], options: ['ла книга', 'книга', 'эль книга', 'книга-ла'], answer: 'книга', explain: 'El ruso no tiene artículos. книга = "libro", "el libro" y "un libro" según contexto.' },
          { scene: 'Orden de palabras', lines: [['', 'En "Книгу читает студент" (El estudiante lee el libro), ¿quién es el sujeto (nominativo)?']], options: ['Книгу', 'читает', 'студент', 'ninguno'], answer: 'студент', explain: 'студент está en nominativo — es el sujeto. книгу está en acusativo (objeto). El orden es flexible en ruso.' },
          { scene: 'Plural neutro', lines: [['', '¿Cuál es el plural nominativo de "окно (okno — ventana)"?']], options: ['окны', 'окни', 'окна', 'окнов'], answer: 'окна', explain: 'окно → окна. Plural neutro: -а/-я. окно → окна.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Género y terminación',
        tag: '2 espacios',
        intro: 'Completa el género y el plural de cada sustantivo en nominativo.',
        type: 'dual',
        items: [
          { scene: 'Terminaciones nominativo', lines: [['', 'стол (stol — mesa): género [[0]], plural [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: 'стол termina en consonante → masculino.' }, { options: ['столы', 'столи', 'стола', 'столов'], answer: 'столы', explain: 'Plural masculino: -ы. стол → столы.' }] },
          { scene: 'Terminaciones nominativo', lines: [['', 'книга (kniga — libro): género [[0]], plural [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'femenino', explain: 'книга termina en -а → femenino.' }, { options: ['книги', 'книгы', 'книгу', 'книгов'], answer: 'книги', explain: 'Plural femenino: -и (después de г → -и). книга → книги.' }] },
          { scene: 'Terminaciones nominativo', lines: [['', 'окно (okno — ventana): género [[0]], plural [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'neutro', explain: 'окно termina en -о → neutro.' }, { options: ['окна', 'окны', 'окни', 'окнов'], answer: 'окна', explain: 'Plural neutro: -а. окно → окна.' }] },
          { scene: 'Terminaciones nominativo', lines: [['', 'студент (studyent — estudiante): género [[0]], plural [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: 'студент termina en consonante → masculino.' }, { options: ['студенты', 'студенти', 'студентов', 'студента'], answer: 'студенты', explain: 'Plural masculino: -ы. студент → студенты.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — nominativo en contexto',
        tag: 'Opciones',
        intro: 'Elige la forma nominativa correcta para completar cada oración.',
        type: 'guidedText',
        scene: 'Sustantivos en nominativo',
        text: '[[0]] читает книгу. (El estudiante lee un libro.) [[1]] большая. (La casa es grande.) [[2]] открыто. (La ventana está abierta.) [[3]] работают в офисе. (Los estudiantes trabajan en la oficina.) [[4]] говорит по-русски. (El profesor habla ruso.)',
        blanks: [
          { options: ['Студента', 'Студент', 'Студентов', 'Студенту'], answer: 'Студент', explain: 'Студент — nominativo masculino sg. Es el sujeto de la oración.' },
          { options: ['Дом', 'Дома', 'Дому', 'Домов'], answer: 'Дом', explain: 'Дом (dom — casa, masc.) — nominativo masculino. Es el sujeto predicativo.' },
          { options: ['Окно', 'Окна', 'Окну', 'Окном'], answer: 'Окно', explain: 'Окно — nominativo neutro. Es el sujeto.' },
          { options: ['Студента', 'Студент', 'Студенты', 'Студентов'], answer: 'Студенты', explain: 'Студенты — nominativo plural. Sujeto plural.' },
          { options: ['Учителя', 'Учителю', 'Учитель', 'Учителем'], answer: 'Учитель', explain: 'Учитель (uchítel — maestro) — nominativo masculino con -ь.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — escribiendo el nominativo',
        tag: 'Sin opciones',
        intro: 'Escribe el sustantivo correcto en nominativo sin opciones.',
        type: 'freeText',
        scene: 'Producción del nominativo',
        text: '1. "libro" en ruso (nominativo femenino): [[0]]. 2. "ventana" en ruso (nominativo neutro): [[1]]. 3. Plural de студент (estudiante): [[2]]. 4. "hermano" en ruso (nominativo masculino): [[3]]. 5. Plural de книга (libro): [[4]].',
        blanks: [
          { answer: 'книга', accepted: ['книга', 'Книга'], explain: 'книга (kniga) — libro. Femenino sg nominativo, termina en -а.' },
          { answer: 'окно', accepted: ['окно', 'Окно'], explain: 'окно (okno) — ventana. Neutro sg nominativo, termina en -о.' },
          { answer: 'студенты', accepted: ['студенты', 'Студенты'], explain: 'студент → студенты. Plural masculino: -ы.' },
          { answer: 'брат', accepted: ['брат', 'Брат'], explain: 'брат (brat) — hermano. Masculino sg nominativo, termina en consonante.' },
          { answer: 'книги', accepted: ['книги', 'Книги'], explain: 'книга → книги. Plural femenino: -и (después de г → -и).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Construye oraciones completas usando el nominativo correctamente.',
        type: 'write',
        items: [
          { scene: 'Sujeto nominativo', prompt: 'Traduce al ruso: "El libro está en la mesa." (лежит = está/yace, на столе = en la mesa)', answer: 'Книга лежит на столе', accepted: ['книга лежит на столе', 'книга лежит на столе.'], explain: 'Книга лежит на столе. Книга está en nominativo como sujeto. на столе = en la mesa (prepositivo).' },
          { scene: 'Sujeto nominativo', prompt: 'Traduce al ruso: "El estudiante habla ruso." (говорит = habla, по-русски = ruso)', answer: 'Студент говорит по-русски', accepted: ['студент говорит по-русски', 'студент говорит по-русски.'], explain: 'Студент говорит по-русски. Студент en nominativo como sujeto.' },
          { scene: 'Sujeto plural', prompt: 'Traduce al ruso: "Los libros están en la mochila." (в рюкзаке = en la mochila, лежат = están)', answer: 'Книги лежат в рюкзаке', accepted: ['книги лежат в рюкзаке', 'книги лежат в рюкзаке.'], explain: 'Книги (plural nominativo) лежат в рюкзаке.' },
          { scene: 'Predicado nominal', prompt: 'Traduce al ruso: "Emma es profesora." (преподаватель = profesor/a — sin verbo ser en presente)', answer: 'Жанна преподаватель', accepted: ['жанна преподаватель', 'жанна — преподаватель', 'жанна преподаватель.'], explain: 'Жанна преподаватель. En ruso no se usa el verbo ser/estar en presente: Жанна преподаватель.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe personas y objetos usando el nominativo en contexto real.',
        type: 'write',
        items: [
          { scene: 'Descripción', prompt: 'Carlos le dice a Iván qué hay en su mesa. Escribe 3 oraciones con sujetos en nominativo. (стол = mesa, ручка = bolígrafo, тетрадь = cuaderno, телефон = teléfono)', answer: 'На столе книга. Ручка лежит на столе. Телефон тоже на столе.', accepted: ['книга', 'ручка', 'тетрадь', 'телефон'], explain: 'Modelo: На столе книга. Ручка лежит на столе. Телефон тоже на столе.' },
          { scene: 'Presentación', prompt: 'Iván presenta a Emma y a los estudiantes. Escribe 2 oraciones con nominativo plural y singular. (преподаватель = profesora, студенты = estudiantes)', answer: 'Жанна — преподаватель. Студенты работают.', accepted: ['жанна', 'студенты', 'преподаватель'], explain: 'Жанна — преподаватель. Студенты работают. Ambos en nominativo como sujetos.' },
        ],
      },
    ],
  },
}

export default topic
