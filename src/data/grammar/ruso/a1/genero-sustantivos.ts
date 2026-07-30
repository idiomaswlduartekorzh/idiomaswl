import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'genero-sustantivos',
  order: '03',
  color: '#b45309',
  category: 'Sustantivos',
  level: 'A1',
  title: 'Género de los sustantivos en ruso: masculino, femenino y neutro',
  shortTitle: 'Género de sustantivos',
  metaTitle: 'Género de sustantivos en ruso A1 | masculino femenino neutro',
  description:
    'El ruso tiene tres géneros gramaticales: masculino, femenino y neutro. A diferencia del español (solo dos géneros), el neutro añade una tercera categoría. La buena noticia: las terminaciones de las palabras revelan el género en más del 90% de los casos, así que no hay que memorizar excepciones infinitas.',
  lead: 'Descubre cómo identificar el género de cualquier sustantivo ruso por su terminación — masculino (consonante), femenino (-а/-я), neutro (-о/-е) — y por qué esto es la llave para toda la gramática rusa.',
  outcomes: [
    'Determinar el género de un sustantivo ruso por su terminación',
    'Reconocer las excepciones más comunes',
    'Relacionar género con los pronombres он, она, оно',
  ],
  guide: {
    goal: 'Identificar el género de sustantivos nuevos sin diccionario usando las terminaciones como guía.',
    model: 'terminación → género → pronombre correspondiente',
    formula: 'consonante → маsc (он) | -а/-я → fem (она) | -о/-е → neutro (оно)',
    decisions: [
      '¿Termina en consonante o en -й? → masculino → он',
      '¿Termina en -а o -я? → femenino → она (excepto папа, дядя que son masculinos)',
      '¿Termina en -о o -е? → neutro → оно',
      '¿Termina en -ь? → puede ser masc. o fem. — hay que aprender caso por caso',
    ],
    table: [
      ['Terminación', 'Género', 'Pronombre'],
      ['consonante / -й', 'masculino', 'он'],
      ['-а / -я', 'femenino', 'она'],
      ['-о / -е', 'neutro', 'оно'],
      ['-ь', 'variable', 'он / она'],
    ],
    mistakes: [
      'папа (papá), дядя (tío), мужчина (hombre) terminan en -а/-я pero son MASCULINOS.',
      'кофе (café) es masculino aunque termina en -е — es un préstamo que mantiene su género original.',
      'Las palabras en -ь son la trampa más común: дверь (puerta) es femenino, день (día) es masculino.',
      'No confundas género gramatical con sexo biológico: врач (médico/a) es siempre masculino gramaticalmente.',
    ],
  },
  seo: [
    {
      heading: '¿Cómo se determina el género en ruso?',
      paragraphs: [
        'El ruso tiene tres géneros: masculino, femenino y neutro. La regla principal es mirar la terminación del sustantivo en su forma base (nominativo singular). La terminación revela el género en la gran mayoría de los casos.',
        'Los sustantivos terminados en consonante son masculinos (стол — mesa, брат — hermano). Los terminados en -а o -я son femeninos (книга — libro, земля — tierra). Los terminados en -о o -е son neutros (окно — ventana, море — mar).',
      ],
      table: [
        ['Género', 'Terminaciones', 'Ejemplos'],
        ['Masculino', 'consonante, -й', 'стол, врач, музей, день'],
        ['Femenino', '-а, -я', 'книга, мама, кухня, ночь'],
        ['Neutro', '-о, -е', 'окно, письмо, море, поле'],
      ],
    },
    {
      heading: '¿Cuáles son las excepciones clave del género en ruso?',
      paragraphs: [
        'El grupo más importante de excepciones son las palabras en -а/-я que son masculinas: папа (papá), дядя (tío), дедушка (abuelo), мужчина (hombre). Aunque terminan como femeninos, se tratan como masculinos porque designan hombres.',
        'La otra excepción frecuente es кофе (café), que termina en -е pero es masculino — un préstamo del alemán que conservó su género. Y las palabras en -ь son impredecibles: hay que aprenderlas de memoria o con diccionario.',
      ],
    },
    {
      heading: '¿Para qué sirve saber el género?',
      paragraphs: [
        'El género gramatical en ruso no es decorativo: determina la forma de los adjetivos, los pronombres de reemplazo (он/она/оно) y las desinencias de los casos. Si dices Он большой для новый стол (masculino), los modificadores cambian con el sustantivo.',
        'En A1, lo más práctico es conectar género con pronombre: стол (masculino) → él es grande = он большой. книга (femenino) → ella es nueva = она новая. окно (neutro) → ello es pequeño = оно маленькое.',
      ],
    },
    {
      heading: 'El género neutro: no existe en español',
      paragraphs: [
        'El género neutro es la principal diferencia con el español. Palabras como окно (ventana), письмо (carta), море (mar) o имя (nombre) son neutras y no equivalen exactamente a masculino ni femenino español.',
        'En la práctica, el género neutro es muy fácil de identificar por la terminación -о o -е, y simplemente usas оно como pronombre. Los adjetivos que modifican neutros terminan en -ое/-ее: большое окно (ventana grande), синее море (mar azul).',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'Gender is the structural backbone of Russian noun morphology. Getting it right at A1 prevents fossilized errors in agreement later.',
    graphicPrompt:
      'Three columns labeled Masculino / Femenino / Neutro with color-coded word cards showing endings and example nouns with small illustrations. Bold, clean, Spanish labels.',
    scene: [
      ['consonante / -й → он', 'стол (mesa), брат (hermano), музей (museo)'],
      ['-а / -я → она', 'книга (libro), мама (mamá), земля (tierra)'],
      ['-о / -е → оно', 'окно (ventana), море (mar), письмо (carta)'],
      ['-ь → variable', 'день (día — masc.) | ночь (noche — fem.)'],
      ['Excepciones -а masc.', 'папа, дядя, мужчина'],
      ['Préstamo especial', 'кофе → masculino'],
    ],
    learnerModes: ['recognition', 'categorization', 'gap-fill', 'production'],
    practiceVerbs: ['identificar género', 'elegir pronombre', 'describir objetos'],
    reviewFocus: ['terminaciones -ь ambiguas', 'excepciones папа/дядя', 'кофе masculino'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Identifica el género del sustantivo por su terminación.',
        type: 'choice',
        items: [
          { scene: 'Identificando género', lines: [['', 'стол (mesa) termina en consonante. ¿Cuál es su género?']], options: ['Masculino', 'Femenino', 'Neutro', 'Variable'], answer: 'Masculino', explain: 'стол termina en consonante → masculino → pronombre он.' },
          { scene: 'Identificando género', lines: [['', 'книга (libro) termina en -а. ¿Cuál es su género?']], options: ['Masculino', 'Femenino', 'Neutro', 'Variable'], answer: 'Femenino', explain: 'книга termina en -а → femenino → pronombre она.' },
          { scene: 'Identificando género', lines: [['', 'окно (ventana) termina en -о. ¿Cuál es su género?']], options: ['Masculino', 'Femenino', 'Neutro', 'Variable'], answer: 'Neutro', explain: 'окно termina en -о → neutro → pronombre оно.' },
          { scene: 'Excepciones', lines: [['', 'папа (papá) termina en -а. ¿Cuál es su género REAL?']], options: ['Femenino (por la -а)', 'Masculino (excepción)', 'Neutro', 'Variable'], answer: 'Masculino (excepción)', explain: 'папа, дядя, мужчина terminan en -а/-я pero son masculinos — designan hombres.' },
          { scene: 'Identificando género', lines: [['', 'море (mar) termina en -е. ¿Cuál es su género?']], options: ['Masculino', 'Femenino', 'Neutro', 'Variable'], answer: 'Neutro', explain: 'море termina en -е → neutro → pronombre оно.' },
          { scene: 'Pronombres', lines: [['', '¿Qué pronombre reemplaza a книга (libro — femenino)?']], options: ['он', 'она', 'оно', 'они'], answer: 'она', explain: 'книга es femenino → она. En ruso, los objetos toman он/она/оно según su género gramatical.' },
          { scene: 'Excepciones', lines: [['', 'кофе (café) es una excepción. ¿Cuál es su género?']], options: ['Neutro (por -е)', 'Femenino', 'Masculino (excepción)', 'Variable'], answer: 'Masculino (excepción)', explain: 'кофе es un préstamo que conserva género masculino aunque termina en -е.' },
          { scene: 'Uso del género', lines: [['', '¿Para qué sirve saber el género de un sustantivo?']], options: ['Solo para elegir он/она/оно', 'Para elegir pronombres y concordar adjetivos', 'Para saber si es animado o inanimado', 'Solo para el plural'], answer: 'Para elegir pronombres y concordar adjetivos', explain: 'El género determina el pronombre (он/она/оно) Y las terminaciones de adjetivos y otros modificadores.' },
        ],
      },
      {
        id: 'level-2',
        title: 'Género y pronombre',
        tag: '2 espacios',
        intro: 'Asocia cada sustantivo con su género y pronombre.',
        type: 'dual',
        items: [
          { scene: 'Emparejando', lines: [['', 'стол (mesa) → género [[0]] → pronombre [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: 'consonante → masculino.' }, { options: ['он', 'она', 'оно'], answer: 'он', explain: 'masculino → он.' }] },
          { scene: 'Emparejando', lines: [['', 'книга (libro) → género [[0]] → pronombre [[1]]']], blanks: [{ options: ['femenino', 'masculino', 'neutro'], answer: 'femenino', explain: '-а → femenino.' }, { options: ['она', 'он', 'оно'], answer: 'она', explain: 'femenino → она.' }] },
          { scene: 'Emparejando', lines: [['', 'письмо (carta) → género [[0]] → pronombre [[1]]']], blanks: [{ options: ['neutro', 'masculino', 'femenino'], answer: 'neutro', explain: '-о → neutro.' }, { options: ['оно', 'он', 'она'], answer: 'оно', explain: 'neutro → оно.' }] },
          { scene: 'Emparejando', lines: [['', 'музей (museo) → género [[0]] → pronombre [[1]]']], blanks: [{ options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: '-й → masculino.' }, { options: ['он', 'она', 'оно'], answer: 'он', explain: 'masculino → он.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'Texto guiado — terminaciones',
        tag: 'Opciones',
        intro: 'Identifica el género de cada palabra por su terminación.',
        type: 'guidedText',
        scene: 'Identificando el género por la terminación',
        text: 'брат (hermano) termina en consonante → [[0]]. земля (tierra) termina en -я → [[1]]. поле (campo) termina en -е → [[2]]. музей (museo) termina en -й → [[3]]. кухня (cocina) termina en -я → [[4]]. письмо (carta) → pronombre [[5]]. врач (médico/a) termina en consonante → [[6]].',
        blanks: [
          { options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: 'consonante → masculino. Pronombre: он.' },
          { options: ['femenino', 'masculino', 'neutro'], answer: 'femenino', explain: '-я → femenino. Pronombre: она.' },
          { options: ['neutro', 'masculino', 'femenino'], answer: 'neutro', explain: '-е → neutro. Pronombre: оно.' },
          { options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: '-й → masculino. Pronombre: он.' },
          { options: ['femenino', 'masculino', 'neutro'], answer: 'femenino', explain: '-я → femenino (no es excepción como папа/дядя).' },
          { options: ['оно', 'он', 'она'], answer: 'оно', explain: 'письмо: -о → neutro → оно.' },
          { options: ['masculino', 'femenino', 'neutro'], answer: 'masculino', explain: 'врач termina en consonante → masculino gramaticalmente.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Texto libre — pronombres',
        tag: 'Sin opciones',
        intro: 'Escribe el pronombre correcto (он, она, оно) para cada sustantivo.',
        type: 'freeText',
        scene: 'Escribiendo pronombres según el género',
        text: '1. стол (mesa, masculino) → [[0]]. 2. книга (libro, femenino) → [[1]]. 3. окно (ventana, neutro) → [[2]]. 4. папа (papá, excepción masculina) → [[3]]. 5. море (mar, -е → neutro) → [[4]].',
        blanks: [
          { answer: 'он', accepted: ['он'], explain: 'стол → masculino → он.' },
          { answer: 'она', accepted: ['она'], explain: 'книга → femenino → она.' },
          { answer: 'оно', accepted: ['оно'], explain: 'окно → neutro → оно.' },
          { answer: 'он', accepted: ['он'], explain: 'папа/дядя/мужчина son masculinos (excepciones). Pronombre: он.' },
          { answer: 'оно', accepted: ['оно'], explain: 'море: -е → neutro → оно.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción escrita',
        tag: 'Producción',
        intro: 'Escribe oraciones usando el adjetivo en la forma correcta según el género.',
        type: 'write',
        items: [
          { scene: 'Describiendo objetos', prompt: 'Escribe en ruso: "La mesa es grande." (большой/большая/большое según género)', answer: 'Стол большой', accepted: ['стол большой'], explain: 'Стол → masc. → большой (forma masculina). Sin verbo "ser" en presente.' },
          { scene: 'Describiendo objetos', prompt: 'Escribe: "El libro es nuevo." (новый/новая/новое — adapta la forma)', answer: 'Книга новая', accepted: ['книга новая'], explain: 'Книга → fem. → новая (forma femenina).' },
          { scene: 'Describiendo objetos', prompt: 'Escribe: "La ventana es grande." (большое para neutro)', answer: 'Окно большое', accepted: ['окно большое'], explain: 'Окно → neutro → большое (forma neutra).' },
          { scene: 'Pronombres en acción', prompt: 'Reemplaza "книга" con un pronombre: "Книга новая. ___ новая."', answer: 'Она новая', accepted: ['она новая'], explain: 'книга = femenino → pronombre она. "Она новая" = El libro es nuevo.' },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión comunicativa',
        tag: 'Producción',
        intro: 'Describe objetos de tu entorno usando el género correcto en ruso.',
        type: 'write',
        items: [
          { scene: 'Mi entorno', prompt: 'Elige tres objetos de tu casa y di si son masculinos, femeninos o neutros en ruso. Ejemplo: стол — он, большой.', answer: 'стол — он, большой. книга — она, новая. окно — оно, большое.', accepted: ['стол', 'книга', 'окно'], explain: 'Verifica que el pronombre coincida con el género del sustantivo.' },
          { scene: 'La excepción del café', prompt: '¿Cómo dirías en ruso "El café está caliente"? (горячий/горячая/горячее — adapta según кофе)', answer: 'Кофе горячий', accepted: ['кофе горячий'], explain: 'кофе es masculino (excepción) → горячий (forma masculina).' },
          { scene: 'Producción libre', prompt: 'Escribe una oración con un sustantivo de cada género: masculino, femenino y neutro.', answer: 'Стол большой. Книга новая. Окно маленькое.', accepted: ['masculino', 'femenino', 'neutro'], explain: 'Adjetivos: -ой/-ий para masc., -ая/-яя para fem., -ое/-ее para neutro.' },
        ],
      },
    ],
  },
}

export default topic
