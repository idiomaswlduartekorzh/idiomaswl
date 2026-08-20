/**
 * El espinazo del superhub de SAT: las páginas de referencia de
 * `/examenes/sat/guia/<slug>`.
 *
 * Por qué existe este archivo, y no es el mismo que `examGuides.ts`. Aquel es
 * **una** página por examen: qué es, cómo se puntúa, dónde se inscribe. Esto es lo
 * que ninguna página en español cubre — los cuatro dominios de Reading and Writing
 * uno por uno, con el detalle de cómo se responde cada tipo de pregunta. Ese material
 * existe (Princeton Review, UWorld, Albert, Acely) y está todo en inglés. El plan
 * completo, con quién ocupa hoy cada búsqueda, está en `docs/sat-superhub-plan.md`.
 *
 * Reglas al añadir una página. Las cinco primeras vienen de errores que ya pagamos:
 *
 *  1. **Nada sin fuente oficial verificable.** Ni una fecha, ni un precio, ni una
 *     sede escritos a mano: College Board los rehace cada año escolar. Se enlaza al
 *     sitio oficial y se dice qué se va a encontrar allí.
 *  2. **La primera frase responde.** `lead` es lo que citan los motores de respuesta.
 *  3. **Las FAQ visibles y el `FAQPage` del marcado salen del MISMO arreglo.**
 *  4. **Nada en el marcado que no esté visible en la página.**
 *  5. **Secciones de 100 a 150 palabras**, repitiendo la entidad. Es lo que un motor
 *     de respuesta extrae entero sin cortar a mitad de idea.
 *  6. Los enlaces internos del clúster se declaran en `relatedSlugs`, **no** a mano:
 *     así una página que todavía no existe no genera un 404. La lista se filtra
 *     contra las que sí están escritas.
 *
 * Los datos del examen que aparecen aquí salen de `docs/sat-ingles-blueprint.md` §2,
 * verificado el 18 ago 2026 contra tres documentos oficiales de College Board. Varios
 * de ellos —los dos ítems de prueba por módulo, la palabra de seis caracteres, las tres
 * bandas de complejidad— no están publicados en español en ninguna otra parte.
 */

export type SatGuideSection = { h: string; body: string[] };
export type SatGuideFaq = { q: string; a: string };

export type SatGuidePage = {
  slug: string;
  /**
   * Dominio del examen, si la página cubre uno. Es lo que ata el desglose por
   * dominio de la pantalla de resultados con la página que explica ese dominio:
   * el estudiante falla siete de Craft and Structure y tiene dónde ir.
   */
  domain?: 'CS' | 'II' | 'SEC' | 'EOI';
  title: string;
  description: string;
  h1: string;
  /** Kicker corto sobre el h1. */
  eyebrow: string;
  lead: string;
  sections: SatGuideSection[];
  faqs: SatGuideFaq[];
  /** Otras páginas del clúster. Se filtran contra las que existen. */
  relatedSlugs?: string[];
  /** Enlaces fuera del clúster. Estos sí se escriben a mano. */
  related?: { href: string; label: string; note: string }[];
  sources: { label: string; url: string }[];
  checked: string;
  checkedISO: string;
};

const FUENTES_BASE: { label: string; url: string }[] = [
  { label: 'College Board — La sección de Reading and Writing', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/reading-writing' },
  { label: 'College Board — Cómo está estructurado el SAT', url: 'https://satsuite.collegeboard.org/sat/whats-on-the-test/structure' },
  { label: 'College Board — Assessment Framework de la SAT Suite (PDF)', url: 'https://satsuite.collegeboard.org/media/pdf/assessment-framework-for-digital-sat-suite.pdf' },
];

export const SAT_GUIDES: SatGuidePage[] = [

  {
    slug: 'reading-and-writing',
    title: 'SAT Reading and Writing: qué preguntan y en qué orden',
    description: 'Las 54 preguntas de la sección, los cuatro dominios y cuánto pesa cada uno, cómo funcionan los dos módulos adaptativos y qué hacer con los 64 minutos.',
    h1: 'La sección de Reading and Writing del SAT',
    eyebrow: 'Guía SAT · la sección completa',
    lead:
      'La sección de <strong>Reading and Writing</strong> del SAT digital son <strong>54 preguntas en 64 minutos</strong>, repartidas en dos módulos de 27 preguntas y 32 minutos cada uno. Cada pregunta trae su propio texto corto —entre 25 y 150 palabras— y cuatro opciones con una sola respuesta correcta. Las preguntas llegan siempre agrupadas en los mismos cuatro dominios y en el mismo orden, y el segundo módulo cambia de dificultad según cómo te fue en el primero.',
    sections: [
      {
        h: 'Son 54 preguntas, pero cuatro no cuentan',
        body: [
          'Este dato casi no aparece en español y cambia cómo se lee un mal momento durante el examen. De las 27 preguntas de cada módulo de <strong>Reading and Writing</strong>, <strong>25 son operativas —las que puntúan— y 2 son de prueba</strong>: College Board las incluye para calibrarlas de cara a exámenes futuros. En la sección entera eso son 50 preguntas que cuentan y 4 que no.',
          'No están marcadas y no hay forma de reconocerlas: se responden igual que las demás. Lo útil es lo otro — si te topas con una pregunta rarísima, que no se parece a nada de lo que practicaste, es perfectamente posible que sea una de las cuatro. No merece que le regales cinco minutos.',
        ],
      },
      {
        h: 'Cómo funciona el examen adaptativo por etapas',
        body: [
          'El SAT digital no adapta pregunta a pregunta: adapta <strong>por módulo</strong>. Es lo que se llama adaptativo por etapas. El módulo 1 es el mismo para todo el mundo y sirve para enrutarte; según cómo te vaya, el módulo 2 llega con una dificultad media más alta o más baja. Dentro de un módulo te mueves libremente y puedes marcar preguntas para volver, pero <strong>una vez entregas el módulo 1 no puedes regresar a él</strong>.',
          'Aquí vive el malentendido más extendido: el módulo 2 difícil <strong>no son 27 preguntas difíciles</strong>. Lleva la misma estructura de dominios y su propia mezcla de fáciles, medias y difíciles; lo que sube es el promedio. Y el módulo al que te enrutan determina el techo de tu puntaje, así que el módulo 1 no es un calentamiento: es la parte que decide en qué examen acabas.',
        ],
      },
      {
        h: 'Los cuatro dominios y cuánto pesa cada uno',
        body: [
          'Las preguntas de <strong>Reading and Writing</strong> se agrupan en cuatro dominios, y College Board publica el peso de cada uno sobre las 50 preguntas que puntúan:',
          '<strong>Craft and Structure — cerca del 28 %</strong>, entre 13 y 15 preguntas. Vocabulario en contexto, propósito y estructura del texto, y relación entre dos textos. Es el dominio más grande.<br /><strong>Information and Ideas — cerca del 26 %</strong>, entre 12 y 14. Idea central y detalles, evidencia textual, evidencia con datos e inferencias.<br /><strong>Standard English Conventions — cerca del 26 %</strong>, entre 11 y 15. Puntuación, límites de oración, concordancia, tiempos verbales y modificadores.<br /><strong>Expression of Ideas — cerca del 20 %</strong>, entre 8 y 12. Transiciones y síntesis de notas.',
          'Traducido a un módulo de 27 preguntas como el de nuestro simulacro, eso da <strong>8 · 7 · 7 · 5</strong>. No es una elección de estilo: es la única combinación de números enteros que suma 27 dejando los cuatro dominios a menos de dos puntos porcentuales de su peso oficial.',
        ],
      },
      {
        h: 'En qué orden llegan las preguntas',
        body: [
          'El orden no es aleatorio, y saberlo vale minutos. Los dominios aparecen <strong>siempre en la misma secuencia, en los dos módulos</strong>: Craft and Structure, después Information and Ideas, después Standard English Conventions y al final Expression of Ideas.',
          'Dentro de cada dominio los ítems van <strong>de más fácil a más difícil</strong>. En Craft and Structure, Information and Ideas y Expression of Ideas se agrupan además por tipo de pregunta, así que las que miden lo mismo llegan juntas. <strong>Standard English Conventions es la excepción</strong>: ahí la dificultad crece sin agrupar por tipo.',
          'La consecuencia práctica: cuando notas que se pone cuesta arriba, no es que te estés hundiendo, es que vas por el final de un dominio — y al empezar el siguiente vuelve a bajar. Mucha gente pierde la cabeza en la pregunta 7 sin saber que la 9 va a ser más fácil.',
        ],
      },
      {
        h: 'Cómo son los textos, y por qué son tan cortos',
        body: [
          'Cada pregunta de <strong>Reading and Writing</strong> trae su propio texto y ninguna se enlaza con otra: no hay pasajes largos con diez preguntas colgando, como en el SAT de papel. Los textos miden entre <strong>25 y 150 palabras</strong>, y ahí «palabra» tiene una definición técnica curiosa — College Board cuenta los caracteres totales, puntuación y espacios incluidos, y los divide entre seis.',
          'Vienen de cuatro materias: literatura, historia y estudios sociales, humanidades y ciencia. Y la complejidad se reparte en tres bandas —de grado 6-8, de 9-11 y de 12-14—, sin que el SAT restrinja ninguna: las tres pueden salirte. Algunos textos llegan acompañados de una <strong>tabla o una gráfica</strong> que hay que leer para responder, y ese es el punto donde más gente se rinde sin intentarlo.',
        ],
      },
      {
        h: 'Cómo se puntúa, y qué hacer con los 64 minutos',
        body: [
          '<strong>Reading and Writing</strong> se puntúa de <strong>200 a 800</strong>, en intervalos de diez puntos, igual que Math; sumadas dan el total de 400 a 1600. El puntaje sale de las preguntas operativas de <strong>los dos módulos juntos</strong>, no de cada uno por separado. Y no se penaliza el error: si no sabes, marca — dejarla en blanco solo garantiza que no suma.',
          'El tiempo medio que publica College Board es de <strong>1,19 minutos por pregunta</strong>: un minuto y once segundos. Se siente muy distinto en casa que el día del examen, y es la razón por la que un simulacro sin cronómetro engaña. Si acertaste bastante pero no te alcanzó el tiempo, lo que falla no es tu inglés, es el ritmo — y eso se entrena repitiendo módulos cronometrados hasta que los 32 minutos sobren.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuántas preguntas tiene la sección de Reading and Writing del SAT?',
        a: '54 preguntas en 64 minutos, repartidas en dos módulos de 27 preguntas y 32 minutos cada uno. De esas 54, solo 50 puntúan: cada módulo lleva dos preguntas de prueba que College Board incluye para calibrarlas de cara a exámenes futuros y que no cuentan para tu puntaje. No están marcadas y no hay forma de identificarlas.',
      },
      {
        q: '¿El módulo 2 del SAT es más difícil?',
        a: 'Depende de cómo te haya ido en el módulo 1. El SAT digital es adaptativo por etapas: el módulo 1 es igual para todos y sirve para enrutarte, y el módulo 2 llega con una dificultad media más alta o más baja. El módulo 2 difícil no son 27 preguntas difíciles: lleva la misma estructura de dominios y su propia mezcla de fáciles, medias y difíciles, con el promedio más alto.',
      },
      {
        q: '¿Puedo volver a una pregunta del módulo anterior?',
        a: 'No. Dentro del módulo en el que estás puedes moverte libremente y marcar preguntas para revisarlas, pero una vez entregas el módulo 1 no puedes regresar a él. Es la diferencia práctica más importante entre el SAT digital y un examen de papel.',
      },
      {
        q: '¿Qué dominio del SAT tiene más preguntas?',
        a: 'Craft and Structure, con cerca del 28 % de la sección: entre 13 y 15 de las 50 preguntas que puntúan. Cubre vocabulario en contexto, propósito y estructura del texto, y relación entre dos textos. Después van Information and Ideas y Standard English Conventions, con cerca del 26 % cada uno, y Expression of Ideas con cerca del 20 %.',
      },
      {
        q: '¿Las preguntas del SAT van de fácil a difícil?',
        a: 'Dentro de cada dominio, sí. Los cuatro dominios llegan siempre en el mismo orden —Craft and Structure, Information and Ideas, Standard English Conventions, Expression of Ideas— y dentro de cada uno la dificultad crece. Eso significa que cuando el examen se pone cuesta arriba suele ser porque vas por el final de un dominio, y al empezar el siguiente vuelve a bajar.',
      },
      {
        q: '¿Se penaliza responder mal en el SAT?',
        a: 'No. No hay descuento por error, así que dejar una pregunta en blanco solo garantiza que no suma. Si el tiempo se acaba, marca las que queden: con cuatro opciones, una respuesta al azar acierta una de cada cuatro veces y una en blanco, ninguna.',
      },
      {
        q: '¿Cuánto tiempo tengo por pregunta en Reading and Writing?',
        a: 'Un minuto y once segundos de media: la cifra que publica College Board es de 1,19 minutos por pregunta. Como los textos son cortos —de 25 a 150 palabras— el problema rara vez es leer, es decidir. Por eso conviene hacer al menos un simulacro cronometrado de verdad antes de presentarte.',
      },
      {
        q: '¿Hay preguntas con gráficas en Reading and Writing?',
        a: 'Sí. Algunos textos vienen acompañados de una tabla, una gráfica de barras o una de líneas, y hay que leerla para responder. Aparecen sobre todo en Information and Ideas, en las preguntas de evidencia cuantitativa. No exigen matemáticas: exigen leer un dato y comprobar si sostiene lo que dice la opción.',
      },
    ],
    relatedSlugs: ['craft-and-structure', 'information-and-ideas', 'standard-english-conventions', 'expression-of-ideas', 'como-estudiar-sat-desde-cero', 'puntaje-sat-universidades', 'sat-desde-colombia', 'sat-toefl-ielts-diferencias'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: '27 preguntas en 32 minutos, con los cuatro dominios en la proporción del examen.' },
      { href: '/examenes/sat', label: 'Guía general del SAT', note: 'Qué es, cómo se puntúa, y dónde se consultan fechas y tarifas.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'El SAT premia precisión de lectura, y eso se entrena.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
  },


  {
    slug: 'craft-and-structure',
    domain: 'CS',
    title: 'Craft and Structure del SAT: vocabulario en contexto y estructura',
    description: 'El dominio con más peso del SAT: qué mide Words in Context, Text Structure and Purpose y Cross-Text Connections, y cómo se responde cada uno.',
    h1: 'Craft and Structure: el dominio con más peso del SAT',
    eyebrow: 'Guía SAT · dominio 1 de 4',
    lead:
      '<strong>Craft and Structure</strong> es el dominio más grande de la sección de Reading and Writing del SAT: cerca del <strong>28 %</strong> de las preguntas que puntúan, entre 13 y 15 de las 50. Mide tres cosas distintas —vocabulario en contexto, propósito y estructura del texto, y relación entre dos textos— y es el primero que aparece en cada módulo. También es el que menos se arregla estudiando listas: no pregunta qué significa una palabra, sino qué trabajo hace en la frase donde está.',
    sections: [
      {
        h: 'Qué mide Craft and Structure, y por qué es el más grande',
        body: [
          '<strong>Craft and Structure</strong> mide comprensión de precisión: no si entendiste de qué iba el texto, sino si entendiste <em>cómo</em> está hecho. Se divide en tres tipos de pregunta. <strong>Words in Context</strong> —el más numeroso— te da un texto corto con una palabra marcada y cuatro candidatas. <strong>Text Structure and Purpose</strong> pregunta por la función de una parte del texto o por su organización. <strong>Cross-Text Connections</strong> te da dos textos breves sobre el mismo asunto y pregunta cómo se relacionan.',
          'Es el dominio con más peso porque es el que menos se puede fingir. Un estudiante puede acertar preguntas de idea central por sentido común; en Craft and Structure, si no leíste la frase concreta, no hay heurística que te salve.',
        ],
      },
      {
        h: 'Words in Context: no es vocabulario, es sintaxis y sentido',
        body: [
          'El error de preparación más caro del SAT es tratar <strong>Words in Context</strong> como una prueba de vocabulario y ponerse a memorizar listas de palabras difíciles. No funciona, porque las cuatro opciones suelen ser palabras que ya conoces. Lo que se pregunta es cuál encaja en <em>esa</em> frase, con ese sujeto, ese verbo y esa preposición.',
          'La técnica que sí rinde es de dos pasos y no requiere saber más inglés del que ya sabes. Primero, <strong>tapa las opciones</strong> y escribe tú una palabra que quepa en el hueco: si el texto está bien construido, casi siempre hay una sola idea posible. Después mira las cuatro y elige la que se parece a la tuya. Hacerlo al revés —leer las cuatro y ver cuál «suena bien»— es exactamente el modo de fallar, porque el examen diseña dos opciones para que suenen bien.',
        ],
      },
      {
        h: 'Text Structure and Purpose: por qué está ahí esa frase',
        body: [
          'Estas preguntas del SAT no van del contenido sino de la <strong>función</strong>. Las dos formas habituales son «¿cuál es la función principal de la parte subrayada?» y «¿cuál describe mejor la estructura general del texto?». La respuesta correcta describe lo que el fragmento <em>hace</em> —introduce una objeción, matiza una afirmación anterior, da un ejemplo, anticipa una consecuencia—, no lo que dice.',
          'Un truco que funciona: resume la parte subrayada en un verbo. Si tu verbo es «explicar», busca la opción que diga explicar, no la que repita el tema del texto. La trampa clásica es una opción que resume correctamente el contenido y se equivoca en la función; es verdadera como frase y falsa como respuesta.',
        ],
      },
      {
        h: 'Cross-Text Connections: la pregunta es sobre la relación',
        body: [
          '<strong>Cross-Text Connections</strong> es el único tipo del SAT que te da dos textos, y casi siempre pregunta lo mismo: cómo respondería el autor del Texto 2 a lo que sostiene el autor del Texto 1. Son pocas preguntas por examen, pero es donde más gente pierde tiempo, porque se lee todo dos veces.',
          'La forma económica de hacerlo es anotar, antes de mirar las opciones, la postura de cada autor en tres o cuatro palabras y en qué se diferencian. Casi siempre no es acuerdo total ni desacuerdo total: es que el segundo acepta el hecho y discute la explicación, o acepta la explicación y discute su alcance. Las opciones que dicen «contradice por completo» o «coincide plenamente» suelen ser demasiado gruesas para un examen que trabaja con matices.',
        ],
      },
      {
        h: 'Cómo está construido un distractor, y qué te dice eso',
        body: [
          'Esto no lo publica College Board, pero se ve al escribir ítems, que es lo que hacemos: <strong>un distractor bueno no es una respuesta falsa, es una respuesta que sería correcta bajo una lectura ligeramente equivocada</strong>. En Words in Context, las cuatro opciones comparten normalmente la misma categoría gramatical y el mismo régimen —si tres van seguidas de <em>to</em> y una de <em>with</em>, esa se puede descartar sin leer, y un ítem así está mal hecho.',
          'La consecuencia práctica para ti: cuando una opción se pueda eliminar por la forma en vez de por el sentido, sospecha de tu propio acierto. Y al revés — si sientes que dos opciones son defendibles, no es que el examen sea injusto: es que estás en la zona donde el ítem separa a quien leyó la frase entera de quien leyó media.',
        ],
      },
      {
        h: 'Cómo se entrena, y cuánto tarda',
        body: [
          'Hay que decirlo claro: <strong>Craft and Structure es el dominio más lento de mejorar</strong> del SAT. No son reglas cerradas como la puntuación; es sensibilidad al matiz, y eso se construye leyendo. Lo que más rinde es leer no ficción en inglés —artículos de divulgación científica, historia, crítica— y pararse en cada palabra que el autor pudo haber elegido de otra manera para preguntarse por qué eligió esa.',
          'Lo segundo que rinde es revisar los errores como si fueran casos, no como puntos perdidos: por cada fallo, vuelve al texto y busca la palabra exacta que hacía imposible tu opción. Si no aparece, el problema no fue de vocabulario, fue de lectura — y ese diagnóstico cambia por completo qué deberías practicar mañana.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuántas preguntas de Craft and Structure trae el SAT?',
        a: 'Entre 13 y 15 de las 50 preguntas que puntúan, cerca del 28 % de la sección de Reading and Writing. Es el dominio con más peso. En un módulo de 27 preguntas como el de nuestro simulacro, son 8.',
      },
      {
        q: '¿Sirve memorizar listas de vocabulario para el SAT?',
        a: 'Poco. Las preguntas de Words in Context suelen usar palabras comunes y preguntan cuál encaja en esa frase concreta, con ese sujeto y esa preposición. Rinde mucho más leer no ficción en inglés y fijarse en qué trabajo hace cada palabra que memorizar listas de palabras raras, que además ya no aparecen en el SAT digital.',
      },
      {
        q: '¿Cómo se responde una pregunta de Words in Context?',
        a: 'Tapa las cuatro opciones y escribe tú una palabra que quepa en el hueco. Si el texto está bien construido, casi siempre hay una sola idea posible. Después mira las opciones y elige la que se parece a la tuya. Leer primero las cuatro y buscar cuál suena bien es el modo más común de fallar, porque el examen diseña dos para que suenen bien.',
      },
      {
        q: '¿Qué es Cross-Text Connections?',
        a: 'El único tipo de pregunta del SAT que te da dos textos cortos sobre el mismo asunto. Casi siempre pregunta cómo respondería el autor del segundo a lo que sostiene el primero. Conviene anotar la postura de cada uno en tres palabras antes de mirar las opciones: la relación rara vez es acuerdo total o desacuerdo total.',
      },
      {
        q: '¿Cuánto tardo en mejorar en Craft and Structure?',
        a: 'Más que en cualquier otro dominio del SAT. No son reglas cerradas como la puntuación, es sensibilidad al matiz y se construye leyendo. Si te queda poco tiempo antes del examen, la mejora más rápida está en Standard English Conventions; Craft and Structure es la inversión larga, y también la que más puntos vale.',
      },
      {
        q: '¿Qué diferencia hay entre Text Structure and Purpose y una pregunta de idea central?',
        a: 'La idea central pregunta qué dice el texto; Text Structure and Purpose pregunta qué hace una parte del texto. La respuesta correcta describe una función —introducir una objeción, matizar, ejemplificar— y no el tema. La trampa habitual es una opción que resume bien el contenido y se equivoca en la función.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'information-and-ideas', 'standard-english-conventions', 'expression-of-ideas'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: 'Ocho preguntas de Craft and Structure, en la proporción del examen.' },
      { href: '/practica/ingles/b1/lectura', label: 'Práctica de lectura en inglés', note: 'Lecturas cortas con preguntas, gratis y sin registro.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
  },

  {
    slug: 'information-and-ideas',
    domain: 'II',
    title: 'Information and Ideas del SAT: evidencia, inferencias y gráficas',
    description: 'Idea central, evidencia textual, evidencia con datos e inferencias en el SAT: qué se pregunta y cuál es el error que más puntos cuesta.',
    h1: 'Information and Ideas: lo que el texto sostiene',
    eyebrow: 'Guía SAT · dominio 2 de 4',
    lead:
      '<strong>Information and Ideas</strong> es el segundo dominio de la sección de Reading and Writing del SAT: cerca del <strong>26 %</strong> de las preguntas que puntúan, entre 12 y 14 de las 50. Mide idea central y detalles, evidencia textual, evidencia cuantitativa —las preguntas con tabla o gráfica— e inferencias. Todas comparten una sola exigencia, y es la que más gente incumple: la respuesta correcta es la que el texto <em>sostiene</em>, no la que suena verdadera.',
    sections: [
      {
        h: 'Qué mide Information and Ideas',
        body: [
          '<strong>Information and Ideas</strong> agrupa cuatro tipos de pregunta del SAT. <strong>Central Ideas and Details</strong> pregunta por la idea principal o por un dato concreto. <strong>Command of Evidence (Textual)</strong> te da una afirmación y pregunta qué dato del texto la apoyaría o la debilitaría. <strong>Command of Evidence (Quantitative)</strong> hace lo mismo pero con una tabla o una gráfica. <strong>Inferences</strong> te da un texto que termina en puntos suspensivos y pide la conclusión que se sigue.',
          'La unidad entre los cuatro es que todos preguntan por la relación entre una afirmación y su respaldo. No hay que valorar si la afirmación es cierta en el mundo: hay que comprobar si este texto, con estas frases, la sostiene.',
        ],
      },
      {
        h: 'El error que más puntos cuesta: elegir lo verdadero',
        body: [
          'Si tuviéramos que señalar un solo error en <strong>Information and Ideas</strong>, sería este: <strong>elegir la opción que es verdad en vez de la que el texto demuestra</strong>. El SAT construye a propósito distractores que son afirmaciones correctas sobre el mundo y que el texto no respalda. Quien lee rápido las reconoce como ciertas y las marca.',
          'El antídoto es mecánico y cabe en una frase: por cada respuesta que marques, señala la línea exacta que la prueba. Si tienes que sumar dos frases y una suposición tuya para llegar, no es la respuesta. Al revisar un simulacro, haz lo mismo con los errores — si la línea no aparece, ya sabes que tu problema no es de comprensión, es de disciplina.',
        ],
      },
      {
        h: 'Command of Evidence: apoyar o debilitar',
        body: [
          'Las preguntas de <strong>Command of Evidence</strong> del SAT suelen presentar la hipótesis de un investigador y preguntar qué hallazgo la apoyaría —o, en la versión más difícil, cuál la <em>debilitaría</em>. Ahí se pierden muchos puntos por leer mal el enunciado: la mitad de los que fallan eligen la opción que apoya cuando se pedía debilitar.',
          'La técnica: antes de mirar las opciones, formula qué tendría que ocurrir para que la hipótesis fuera cierta, y qué tendría que ocurrir para que fuera falsa. Con esas dos frases escritas, las cuatro opciones se clasifican solas. Y ojo con las que hablan de algo cercano pero distinto —otra especie, otro periodo, otra variable—: son ciertas, relevantes de aspecto y no tocan la hipótesis.',
        ],
      },
      {
        h: 'Las preguntas con tabla o gráfica no son de matemáticas',
        body: [
          'Una parte de <strong>Information and Ideas</strong> viene con una tabla, una gráfica de barras o una de líneas, y mucha gente las salta por miedo. Es un error de cálculo: <strong>no piden matemáticas</strong>, piden leer un dato y comprobar si sostiene lo que dice la opción. Casi nunca hay que operar; a lo sumo comparar dos números.',
          'El procedimiento que funciona es leer primero el título de la gráfica, las unidades y qué representa cada eje —ahí está la mitad de las trampas— y solo después ir a las opciones. Los distractores típicos invierten la relación, cambian las unidades, citan un dato que sí está en la gráfica pero no viene al caso, o afirman una tendencia que la gráfica no llega a mostrar.',
        ],
      },
      {
        h: 'Inferences: la conclusión que se sigue, no la que se te ocurre',
        body: [
          'Las preguntas de <strong>Inferences</strong> del SAT terminan el texto con puntos suspensivos y piden completarlo con la conclusión más lógica. La palabra clave del enunciado suele ser <em>most logically completes</em>, y significa algo estrecho: la conclusión tiene que seguirse de lo dicho, no ser compatible con lo dicho.',
          'Sirve leer el texto buscando su estructura lógica antes que su contenido: si el texto presenta una expectativa y luego un resultado que la contradice, la conclusión irá por el lado de que la expectativa era errónea. Y desconfía de las opciones con absolutos —<em>always</em>, <em>never</em>, <em>only</em>—: un texto de cien palabras casi nunca da para sostener una afirmación universal.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuántas preguntas de Information and Ideas tiene el SAT?',
        a: 'Entre 12 y 14 de las 50 que puntúan, cerca del 26 % de la sección de Reading and Writing. En un módulo de 27 preguntas como el de nuestro simulacro, son 7.',
      },
      {
        q: '¿Las preguntas con gráficas del SAT son de matemáticas?',
        a: 'No. Están en Information and Ideas, dentro de Command of Evidence cuantitativo, y piden leer un dato y comprobar si sostiene lo que afirma la opción. Casi nunca hay que operar; a lo sumo comparar dos números. Lo que más falla es no leer el título de la gráfica ni las unidades antes de ir a las opciones.',
      },
      {
        q: '¿Por qué fallo preguntas cuya respuesta me parecía obvia?',
        a: 'Es el error característico de Information and Ideas: elegir la opción que es verdad en vez de la que el texto demuestra. El SAT diseña distractores que son afirmaciones correctas sobre el mundo pero que ese texto no respalda. La comprobación es señalar la línea exacta que prueba tu respuesta; si necesitas sumar una suposición tuya, no es la respuesta.',
      },
      {
        q: '¿Qué es una pregunta de inferencia en el SAT?',
        a: 'Un texto que termina en puntos suspensivos y cuatro finales posibles. El enunciado suele decir most logically completes, y eso es más estrecho de lo que parece: la conclusión tiene que seguirse de lo dicho, no solo ser compatible con ello. Las opciones con always, never u only rara vez son correctas en un texto de cien palabras.',
      },
      {
        q: '¿Cómo distingo apoyar de debilitar en Command of Evidence?',
        a: 'Escribiendo las dos frases antes de mirar las opciones: qué tendría que ocurrir para que la hipótesis fuera cierta y qué para que fuera falsa. Buena parte de los errores en este tipo del SAT vienen de contestar la pregunta contraria a la que se hizo, no de no entender el texto.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'craft-and-structure', 'standard-english-conventions', 'expression-of-ideas'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: 'Siete preguntas de Information and Ideas, con desglose de en cuál fallaste.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
  },

  {
    slug: 'standard-english-conventions',
    domain: 'SEC',
    title: 'Gramática del SAT: Standard English Conventions explicado',
    description: 'Puntuación, límites de oración, concordancia, tiempos y modificadores en el SAT: el dominio de reglas cerradas y la mejora más rápida.',
    h1: 'Standard English Conventions: la mejora más barata del SAT',
    eyebrow: 'Guía SAT · dominio 3 de 4',
    lead:
      '<strong>Standard English Conventions</strong> es el dominio de gramática y puntuación del SAT: cerca del <strong>26 %</strong> de las preguntas que puntúan, entre 11 y 15 de las 50. Es el único dominio hecho de <strong>reglas cerradas</strong> —se pueden aprender enteras, y se acaban— y por eso es donde más sube el puntaje por hora de estudio. Si te queda poco tiempo antes del examen, este es el sitio por donde empezar.',
    sections: [
      {
        h: 'Por qué este dominio se estudia distinto',
        body: [
          'En el resto del SAT la mejora es lenta porque depende de la lectura. <strong>Standard English Conventions</strong> no: es un conjunto finito de reglas de la norma escrita estadounidense, y el examen las repite examen tras examen. Se pueden aprender en unas semanas y se quedan.',
          'Hay un detalle de formato que ayuda a reconocerlas: en este dominio del SAT <strong>los ítems no se agrupan por tipo</strong> —son el único caso—, van de más fácil a más difícil sin más. Y las cuatro opciones suelen ser la misma frase con puntuación distinta, o el mismo verbo en cuatro formas. Cuando veas eso, sabes exactamente qué te están preguntando.',
        ],
      },
      {
        h: 'Boundaries: dónde empieza y acaba una oración',
        body: [
          'La mitad de este dominio del SAT son <strong>límites de oración</strong>, y casi todo se reduce a una pregunta: ¿lo que hay a cada lado del signo puede vivir solo? Dos oraciones independientes no se unen con coma —eso es un <em>comma splice</em> y es el error que más veces se pone a prueba—; se unen con punto, con punto y coma, con coma más conjunción (<em>and</em>, <em>but</em>, <em>so</em>) o con dos puntos si la segunda explica a la primera.',
          'La comprobación es mecánica y no requiere saber gramática: tapa la primera mitad y pregúntate si la segunda es una frase completa. Si lo es, y la primera también, la coma sola está mal. Los dos puntos y el guion largo tienen además una condición extra que se olvida: <strong>lo que va antes tiene que ser una oración independiente</strong>, lo que va después no necesariamente.',
        ],
      },
      {
        h: 'La puntuación que el SAT pregunta de verdad',
        body: [
          'Más allá de los límites de oración, el <strong>SAT</strong> insiste en unos pocos usos. Los <strong>incisos no restrictivos</strong> van entre comas, y los restrictivos no: <em>My brother, who lives in Bogotá, is a teacher</em> dice que tengo un hermano; <em>The student who arrived late missed the exam</em> señala a un estudiante entre varios. Quitar el inciso y ver si la frase cambia de sentido resuelve casi todos estos ítems.',
          'Después vienen los posesivos —<em>its</em> es posesivo y <em>it</em>&rsquo;<em>s</em> es <em>it is</em>; en plural el apóstrofo va detrás de la <em>s</em>— y una regla que sorprende a quien viene del español: <strong>no se pone coma entre el sujeto y su verbo</strong>, por larga que sea la frase. Muchos ítems del SAT ofrecen esa coma como opción precisamente porque en español suena natural.',
        ],
      },
      {
        h: 'Form, Structure, and Sense: verbos, pronombres y modificadores',
        body: [
          'La otra mitad del dominio cubre concordancia, tiempos verbales, pronombres y modificadores. En <strong>concordancia</strong>, el truco del SAT es casi siempre meter una frase larga entre el sujeto y el verbo: en <em>The collection of essays was published</em>, el sujeto es <em>collection</em>, no <em>essays</em>. Tapa lo que hay en medio y la duda desaparece.',
          'En <strong>tiempos verbales</strong> la regla es la coherencia con el resto del texto, no lo que suene mejor aislado. En <strong>pronombres</strong>, cada uno tiene que tener un antecedente claro y único. Y los <strong>modificadores</strong> mal colocados son el ítem más divertido y el que más se falla: si una frase empieza con <em>Having studied for months, …</em>, quien estudió tiene que ser el sujeto que viene justo después, o la frase dice algo que nadie quiso decir.',
        ],
      },
      {
        h: 'Cómo estudiarlo en dos semanas',
        body: [
          'Este es el único dominio del <strong>SAT</strong> que admite un plan corto y honesto. Semana uno: límites de oración y puntuación —coma, punto y coma, dos puntos, guion largo, incisos, posesivos—, haciendo ejercicios hasta que reconozcas el tipo de ítem antes de leer las opciones. Semana dos: concordancia, tiempos, pronombres y modificadores.',
          'Dos advertencias. La primera: el SAT evalúa la <strong>norma escrita estadounidense</strong>, así que hay usos correctos en inglés británico o en habla informal que aquí cuentan como error. La segunda: no estudies estas reglas leyendo explicaciones, estúdialas fallando ítems y volviendo a la regla que fallaste. Es la diferencia entre reconocer una regla y aplicarla en cincuenta segundos.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuánta gramática hay en el SAT?',
        a: 'Standard English Conventions es cerca del 26 % de la sección de Reading and Writing: entre 11 y 15 de las 50 preguntas que puntúan. En un módulo de 27 como el de nuestro simulacro, son 7. Cubre puntuación, límites de oración, concordancia, tiempos verbales, pronombres y modificadores.',
      },
      {
        q: '¿Cuál es la forma más rápida de subir el puntaje del SAT?',
        a: 'Standard English Conventions, sin discusión. Es el único dominio hecho de reglas cerradas: se aprenden enteras y se acaban. Los demás dependen de la lectura y mejoran despacio. Si te queda poco tiempo antes del examen, dos semanas bien invertidas aquí rinden más que dos meses de vocabulario.',
      },
      {
        q: '¿Qué es un comma splice y por qué importa tanto en el SAT?',
        a: 'Unir dos oraciones que podrían vivir solas con una coma. Es el error que el SAT pone a prueba más veces. Se arregla con punto, punto y coma, coma más conjunción, o dos puntos si la segunda explica a la primera. La comprobación es tapar cada mitad y ver si sobrevive sola.',
      },
      {
        q: '¿El SAT evalúa inglés británico o americano?',
        a: 'La norma escrita estadounidense. Hay usos correctos en inglés británico o en habla informal que en el SAT cuentan como error. Es un detalle que afecta sobre todo a estudiantes que aprendieron con material británico, como quien viene de preparar el IELTS.',
      },
      {
        q: '¿Se puede poner coma entre el sujeto y el verbo?',
        a: 'No, por larga que sea la frase. Es una regla que sorprende a los hispanohablantes porque en español esa coma suena natural, y por eso el SAT la ofrece como opción una y otra vez. Si dudas, localiza el sujeto y el verbo y comprueba que no haya nada separándolos.',
      },
      {
        q: '¿Qué es un modificador mal colocado?',
        a: 'Una frase introductoria cuyo sujeto no es el que viene después. En Having studied for months, the exam felt easy, quien estudió tendría que ser una persona y el sujeto es the exam. El SAT lo pregunta a menudo porque se detecta con una sola comprobación: quién hace lo que dice la frase inicial.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'craft-and-structure', 'information-and-ideas', 'expression-of-ideas'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: 'Siete preguntas de gramática y puntuación, con la regla explicada en cada una.' },
      { href: '/practica/ingles/b1/gramatica', label: 'Gramática inglesa gratis', note: 'Los temas de fondo, explicados desde el español.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
  },

  {
    slug: 'expression-of-ideas',
    domain: 'EOI',
    title: 'Expression of Ideas del SAT: transiciones y síntesis de notas',
    description: 'El dominio más pequeño del SAT y el más recuperable: cómo se eligen las transiciones por lógica y cómo se resuelve la síntesis de notas.',
    h1: 'Expression of Ideas: pocas preguntas, y se recuperan en un rato',
    eyebrow: 'Guía SAT · dominio 4 de 4',
    lead:
      '<strong>Expression of Ideas</strong> cierra cada módulo de la sección de Reading and Writing del SAT y es el dominio más pequeño: cerca del <strong>20 %</strong> de las preguntas que puntúan, entre 8 y 12 de las 50. Solo tiene dos tipos —<strong>transiciones</strong> y <strong>síntesis retórica</strong>— y ambos se resuelven con un procedimiento, no con intuición. Es el dominio donde más rápido se recuperan puntos después de Standard English Conventions.',
    sections: [
      {
        h: 'Dónde aparece y por qué conviene llegar con tiempo',
        body: [
          '<strong>Expression of Ideas</strong> va siempre al final del módulo, después de Standard English Conventions. Eso tiene una consecuencia que no se suele decir: si administras mal los 32 minutos, las preguntas que sacrificas son justamente las de este dominio — que son de las más fáciles de acertar con método.',
          'Por eso el consejo de ritmo para el SAT es concreto: si una pregunta de Craft and Structure te está costando más de dos minutos, márcala y sigue. Cambiar tres minutos de una pregunta difícil por dos preguntas de transiciones es un buen negocio, y solo se puede hacer si llegas al final del módulo con tiempo.',
        ],
      },
      {
        h: 'Transiciones: es lógica, no oído',
        body: [
          'Las preguntas de <strong>transiciones</strong> del SAT te dan un hueco entre dos frases y cuatro conectores. El error casi universal es elegir el que «suena bien». La forma correcta es taparlos todos y decidir primero <strong>qué relación hay entre las dos frases</strong>: contraste, causa, consecuencia, ejemplo, adición o concesión. Con esa palabra decidida, tres opciones se caen solas.',
          'Conviene tenerlos agrupados por función, no memorizados en lista: contraste (<em>however</em>, <em>nevertheless</em>, <em>by contrast</em>), causa y consecuencia (<em>therefore</em>, <em>consequently</em>, <em>as a result</em>), adición (<em>moreover</em>, <em>in addition</em>, <em>furthermore</em>), ejemplo (<em>for instance</em>, <em>for example</em>), concesión (<em>admittedly</em>, <em>granted</em>). Y una advertencia para hispanohablantes: los falsos amigos hacen daño aquí. <em>Actually</em> no es «actualmente» y <em>eventually</em> no es «eventualmente».',
        ],
      },
      {
        h: 'Rhetorical Synthesis: el objetivo manda',
        body: [
          'La <strong>síntesis retórica</strong> es el formato más raro del SAT y el más agradecido cuando lo entiendes. Te dan una lista de notas de un estudiante y un enunciado que fija un objetivo: <em>The student wants to emphasize a similarity between the two studies</em>. Las cuatro opciones son frases construidas con esas notas, y las cuatro son verdaderas.',
          'Ahí está la clave: <strong>no se pregunta cuál es correcta, sino cuál cumple el objetivo</strong>. Por eso hay que leer el enunciado antes que las notas, subrayar el verbo del objetivo —enfatizar, comparar, explicar, presentar— y descartar todo lo que no lo haga, por bien escrito que esté. La opción más elegante suele ser un distractor: es cierta y no cumple el encargo.',
        ],
      },
      {
        h: 'Cómo entrenar este dominio en un fin de semana',
        body: [
          'De todo el <strong>SAT</strong>, <strong>Expression of Ideas</strong> es lo que más sube en menos tiempo, porque son dos procedimientos y ninguno depende de tu nivel de inglés. Para transiciones: haz veinte ítems seguidos obligándote a escribir la relación en una palabra <em>antes</em> de mirar las opciones. Si aciertas la relación y fallas el conector, tu problema es de vocabulario de conectores y se arregla con una tabla. Si fallas la relación, tu problema es de lectura y es otro trabajo.',
          'Para síntesis retórica: haz diez ítems subrayando siempre el verbo del objetivo y tachando de entrada cualquier opción que no lo cumpla, aunque te guste. En un fin de semana de trabajo honesto, este dominio deja de costar puntos.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuántas preguntas de Expression of Ideas tiene el SAT?',
        a: 'Entre 8 y 12 de las 50 que puntúan, cerca del 20 % de la sección de Reading and Writing. Es el dominio más pequeño. En un módulo de 27 preguntas como el de nuestro simulacro, son 5, y van siempre al final.',
      },
      {
        q: '¿Cómo se eligen las transiciones en el SAT?',
        a: 'Tapando las cuatro opciones y decidiendo primero qué relación hay entre las dos frases: contraste, causa, consecuencia, ejemplo, adición o concesión. Con esa palabra decidida, tres opciones se caen solas. Elegir el conector que suena bien es el error más común y el más caro.',
      },
      {
        q: '¿Qué es Rhetorical Synthesis?',
        a: 'Un formato del SAT donde te dan las notas de un estudiante y un objetivo concreto —por ejemplo, enfatizar una semejanza entre dos estudios— y cuatro frases construidas con esas notas. Las cuatro suelen ser verdaderas: la correcta es la que cumple el objetivo. Por eso se lee el enunciado antes que las notas.',
      },
      {
        q: '¿Por qué me quedo sin tiempo justo en las últimas preguntas?',
        a: 'Porque Expression of Ideas va al final del módulo, así que es lo primero que se sacrifica cuando el reloj aprieta. Es mal negocio: son de las preguntas más fáciles de acertar con método. Si una pregunta de Craft and Structure te lleva más de dos minutos, márcala y sigue.',
      },
      {
        q: '¿Qué conectores confunden más a los hispanohablantes en el SAT?',
        a: 'Los falsos amigos. Actually significa en realidad, no actualmente. Eventually significa con el tiempo, no eventualmente. Currently es actualmente. Son errores que no vienen de no saber inglés sino de traducir, y el SAT los aprovecha en las preguntas de transiciones.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'craft-and-structure', 'information-and-ideas', 'standard-english-conventions'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: 'Cinco preguntas de Expression of Ideas, al final del módulo como en el examen.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
  },


  {
    slug: 'como-estudiar-sat-desde-cero',
    title: 'Cómo estudiar para el SAT desde cero: plan por semanas',
    description: 'Un plan de preparación del SAT según el tiempo que te queda: qué estudiar primero, en qué orden y cómo usar los simulacros para que sirvan.',
    h1: 'Cómo estudiar para el SAT desde cero',
    eyebrow: 'Guía SAT · plan de estudio',
    lead:
      'Preparar el <strong>SAT</strong> no es preparar inglés general, y esa confusión cuesta meses. El examen da por hecho que lees en inglés y mide otra cosa: precisión de lectura, reglas de la norma escrita estadounidense y ritmo bajo cronómetro. Por eso un estudiante con B2 bien entrenado supera a un C1 que llega en frío. Lo que decide tu plan no es tu nivel, es <strong>cuánto tiempo te queda</strong> — y el orden en que estudias los cuatro dominios es casi el inverso del orden en que aparecen en el examen.',
    sections: [
      {
        h: 'Lo primero: mide, no estimes',
        body: [
          'Antes de estudiar nada, haz <strong>un módulo completo cronometrado</strong>. No sirve responder preguntas sueltas con el teléfono al lado: el <strong>SAT</strong> da un minuto y once segundos por pregunta y la mitad de los problemas de la gente son de ritmo, no de inglés. Un simulacro sin reloj te devuelve un diagnóstico optimista, que es el peor de todos.',
          'De ese primer módulo lo único que importa es el <strong>desglose por dominio</strong>, no el porcentaje. Un 60 % concentrado en gramática y un 60 % repartido por igual son dos estudiantes distintos con dos planes distintos. Y si acertaste bastante pero no terminaste, tu problema no está en ningún dominio: está en el cronómetro, y se entrena repitiendo módulos completos hasta que los 32 minutos sobren.',
        ],
      },
      {
        h: 'El orden que rinde es casi el inverso del examen',
        body: [
          'En el <strong>SAT</strong> las preguntas llegan en este orden: Craft and Structure, Information and Ideas, Standard English Conventions y Expression of Ideas. Para estudiar conviene ir casi al revés, porque no todos los dominios cuestan lo mismo de arreglar.',
          '<strong>Standard English Conventions primero.</strong> Es el único dominio hecho de reglas cerradas: se aprenden enteras y se acaban. <strong>Expression of Ideas después</strong>, porque son dos procedimientos —decidir la relación antes de mirar los conectores, y leer el objetivo antes que las notas— y ninguno depende de tu nivel de inglés. <strong>Information and Ideas en tercer lugar</strong>: aquí la mejora viene de una disciplina, señalar la línea que prueba cada respuesta. Y <strong>Craft and Structure al final y en paralelo con todo</strong>, porque es el más lento: se construye leyendo, no estudiando.',
        ],
      },
      {
        h: 'Si te quedan cuatro semanas',
        body: [
          'Es poco tiempo, así que el plan se juega a lo que sí se puede mover. <strong>Semanas 1 y 2, Standard English Conventions</strong>: límites de oración y puntuación la primera —coma, punto y coma, dos puntos, guion largo, incisos, posesivos—, y concordancia, tiempos, pronombres y modificadores la segunda. No la estudies leyendo explicaciones: falla ítems y vuelve a la regla que fallaste.',
          '<strong>Semana 3, Expression of Ideas</strong>, que se aprende en un fin de semana honesto, y el resto a repasar los errores de gramática. <strong>Semana 4, dos módulos completos cronometrados</strong>, separados, revisando cada error como un caso: qué línea probaba la correcta y por qué elegiste la tuya. Lo que <strong>no</strong> hay que hacer en cuatro semanas es ponerse a memorizar vocabulario: es la inversión más lenta del SAT y no llega a tiempo.',
        ],
      },
      {
        h: 'Si te quedan tres meses',
        body: [
          'Este es el plazo en el que se puede trabajar de verdad los cuatro dominios del <strong>SAT</strong>. <strong>Mes 1:</strong> Standard English Conventions completo y empezar a leer no ficción en inglés todos los días —artículos de divulgación científica, historia, crítica—, veinte minutos, sin diccionario salvo cuando la frase se rompa. <strong>Mes 2:</strong> Expression of Ideas e Information and Ideas, con un módulo cronometrado cada dos semanas.',
          '<strong>Mes 3:</strong> Craft and Structure a fondo y ritmo. Aquí la lectura del mes 1 empieza a notarse, que es la razón de empezarla el primer día y no el último. Y un módulo completo por semana, siempre cronometrado, dedicando más tiempo a revisarlo que a hacerlo. Un módulo mal revisado es media hora tirada; un módulo bien revisado vale por tres.',
        ],
      },
      {
        h: 'Cómo se revisa un simulacro para que sirva',
        body: [
          'La parte que casi todo el mundo se salta. Hacer simulacros del <strong>SAT</strong> sin revisarlos no entrena nada: solo mide otra vez lo mismo. La revisión útil tiene tres pasos y se hace pregunta a pregunta, incluidas las que acertaste.',
          'Uno: <strong>busca la línea exacta del texto que probaba la respuesta correcta</strong>. Si no la encuentras, acertaste por otra cosa y volverás a fallar. Dos: <strong>di en voz alta qué error concreto cometía la opción que elegiste</strong> — confundir verdadero con demostrado, invertir apoyar y debilitar, elegir el conector que sonaba bien. Tres: <strong>agrupa los errores por tipo, no por dominio</strong>. Cinco fallos que son el mismo error son un problema, no cinco.',
        ],
      },
      {
        h: 'Los tres errores de preparación más caros',
        body: [
          '<strong>Estudiar inglés en vez de estudiar el SAT.</strong> Un curso general de inglés mejora tu inglés y casi no mueve tu puntaje, porque el examen mide formato, precisión y ritmo. Si tu nivel es B1 o menos, sí hace falta primero el idioma; a partir de un B2 sólido, cada hora rinde más en el examen que en la lengua.',
          '<strong>Memorizar listas de palabras.</strong> El SAT digital ya no tiene preguntas sueltas de vocabulario: pregunta qué palabra encaja en esta frase, y las opciones suelen ser palabras que ya conoces. <strong>Y hacer simulacros sin cronómetro.</strong> Es la forma más común de llegar al examen creyendo que vas mejor de lo que vas, porque el tiempo es justo la mitad de la dificultad.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuánto tiempo necesito para prepararme el SAT?',
        a: 'Depende de tu punto de partida, pero con tres meses se pueden trabajar los cuatro dominios de Reading and Writing con calma. Con cuatro semanas hay que concentrarse en lo que sí se puede mover: gramática y puntuación primero, Expression of Ideas después, y dos módulos cronometrados al final. Lo que no cabe en un mes es la mejora de vocabulario en contexto, que es lenta.',
      },
      {
        q: '¿Por dónde empiezo a estudiar para el SAT?',
        a: 'Por un módulo completo cronometrado, para tener el desglose por dominio. Después, por Standard English Conventions: es el único dominio de reglas cerradas y el que más sube por hora de estudio. Craft and Structure se deja para el final en cuanto a estudio intensivo, pero la lectura diaria en inglés conviene empezarla el primer día porque tarda en notarse.',
      },
      {
        q: '¿Qué nivel de inglés necesito para el SAT?',
        a: 'El SAT no mide inglés como lengua extranjera: da por hecho que lees en inglés y mide comprensión y redacción a nivel de bachillerato estadounidense. En la práctica se necesita un B2 sólido para competir. Con B1 o menos, la prioridad es el idioma, porque preparar formato sobre una base que no está no rinde.',
      },
      {
        q: '¿Sirve Khan Academy para preparar el SAT?',
        a: 'Sí: es el socio oficial de College Board y su material es gratuito y fiable. Está en inglés, que para un estudiante hispanohablante es a la vez su límite y una ventaja — practicar en inglés es parte del entrenamiento. Lo que le falta, y es lo que intentamos cubrir aquí, es la explicación en español de por qué una opción es la correcta y qué error concreto comete cada distractor.',
      },
      {
        q: '¿Cuántas veces conviene presentar el SAT?',
        a: 'No hay un límite oficial. Muchos estudiantes lo presentan dos o tres veces y la mayoría de universidades aceptan el mejor puntaje o combinan lo mejor de cada sección. Presentarlo más de tres veces rara vez mejora el resultado, sobre todo si entre intento e intento no cambió nada en cómo se estudia.',
      },
      {
        q: '¿Debo memorizar vocabulario para el SAT?',
        a: 'No como estrategia principal. El SAT digital eliminó las preguntas sueltas de vocabulario; lo que hay es Words in Context, donde las opciones suelen ser palabras comunes y se pregunta cuál encaja en esa frase concreta. Leer no ficción en inglés todos los días rinde mucho más que cualquier lista.',
      },
      {
        q: '¿Cada cuánto debo hacer un simulacro?',
        a: 'Uno cada dos semanas al principio y uno por semana en el último mes, siempre cronometrado. Y dedicando más tiempo a revisarlo que a hacerlo: buscar la línea que probaba cada respuesta correcta y nombrar el error de la opción que elegiste. Un simulacro sin revisar solo vuelve a medir lo mismo.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'standard-english-conventions', 'expression-of-ideas', 'information-and-ideas', 'craft-and-structure'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Empieza midiendo · simulacro SAT', note: 'Un módulo cronometrado de 27 preguntas con desglose por dominio. Gratis, sin crear cuenta.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'Si tu nivel todavía no llega a B2, esto va antes que el formato.' },
    ],
    sources: FUENTES_BASE,
    checked: '20 de agosto de 2026',
    checkedISO: '2026-08-20',
  },


  {
    slug: 'puntaje-sat-universidades',
    title: 'Qué puntaje de SAT necesitas: cómo leer el de tu universidad',
    description: 'El SAT no tiene nota de aprobado. Cómo funciona la escala 400-1600, qué es el rango del 50 % central y dónde consultar lo que pide cada universidad.',
    h1: 'Qué puntaje de SAT necesitas',
    eyebrow: 'Guía SAT · puntajes',
    lead:
      'El <strong>SAT no tiene nota de aprobado</strong>. Se puntúa de <strong>200 a 800 por sección</strong> —Reading and Writing por un lado, Math por otro— y de <strong>400 a 1600</strong> en total, en intervalos de diez puntos; lo que decide si tu puntaje sirve es lo que publica cada universidad, no una cifra universal. Por eso esta página no te da una tabla de números: te enseña a leer la de la universidad que te interesa, que es lo único que no caduca.',
    sections: [
      {
        h: 'Por qué aquí no vas a encontrar una tabla de puntajes',
        body: [
          'Casi todas las páginas en español sobre el <strong>SAT</strong> traen una tabla del tipo «Harvard: 1500, universidad estatal: 1200». Ese dato envejece cada año y, peor, se malinterpreta: no es un requisito, es una descripción de a quién admitieron el año pasado. Una cifra vieja te hace descartar universidades a las que sí podrías entrar, o confiarte con otras a las que no.',
          'Lo que sí es estable es <strong>dónde mirar y cómo leerlo</strong>. Cada universidad estadounidense publica el perfil de puntajes de su clase admitida, y College Board mantiene un buscador —BigFuture— donde ese dato aparece junto al resto de requisitos. Aprender a leer esa ficha te sirve para las diez universidades de tu lista y para el año que presentes.',
        ],
      },
      {
        h: 'Cómo se lee el rango del 50 % central',
        body: [
          'El número que publican las universidades es un <strong>rango, no un mínimo</strong>: suele darse como el intervalo donde cae el 50 % central de los admitidos —lo que en inglés llaman <em>middle 50 %</em>. Si una universidad publica 1250-1430, significa que una cuarta parte de sus admitidos entró por debajo de 1250 y otra cuarta parte por encima de 1430.',
          'De ahí salen dos lecturas útiles. Estar por debajo del extremo inferior <strong>no te descalifica</strong>: uno de cada cuatro admitidos estaba ahí, normalmente porque algo más en su solicitud pesó más. Y estar por encima del extremo superior <strong>no te admite</strong>: el <strong>SAT</strong> es una parte de la solicitud, junto al promedio del colegio, los ensayos, las cartas y las actividades. Trata el rango como un termómetro de a qué distancia estás, no como una puerta.',
        ],
      },
      {
        h: 'Test-optional: comprobarlo cada año, sin excepción',
        body: [
          'Muchas universidades estadounidenses dejaron de exigir el <strong>SAT</strong> y algunas han vuelto a pedirlo. Es una política que cambia de un ciclo de admisión al siguiente y por universidad, así que <strong>no hay una respuesta general válida</strong>: hay que mirar la página de admisiones de cada una para el ciclo en el que vas a presentar.',
          'Aun cuando sea opcional, conviene hacer una cuenta antes de decidir. Un puntaje que cae dentro o por encima del rango de la universidad casi siempre suma; uno muy por debajo puede restar, y ahí no enviarlo es razonable. Y para ayuda financiera por mérito o para becas concretas el examen a veces sigue siendo obligatorio aunque la admisión sea opcional: son dos decisiones distintas que suelen leerse como una sola.',
        ],
      },
      {
        h: 'Cómo llegan tus puntajes a las universidades',
        body: [
          'Al inscribirte en el <strong>SAT</strong> puedes elegir a qué universidades y programas de beca enviar el puntaje, y después puedes añadir destinatarios o cambiar los que elegiste. Cada institución tiene un código, y College Board mantiene el buscador para localizarlo.',
          'Dos cosas conviene decidir antes que después. Primero, si vas a presentarte más de una vez —muchos estudiantes lo hacen dos o tres veces—, piensa qué política sigue cada universidad de tu lista con los intentos múltiples, porque varias combinan lo mejor de cada sección. Segundo, revisa los plazos: el puntaje tiene que llegar dentro del calendario de admisiones de cada universidad, y eso se cuenta hacia atrás desde su fecha límite, no desde el día del examen.',
        ],
      },
      {
        h: 'Qué significa tu puntaje de Reading and Writing por separado',
        body: [
          'El total de 400 a 1600 esconde información que a ti te sirve más que a la universidad. Un 1200 hecho de 500 en Reading and Writing y 700 en Math no es el mismo estudiante que un 1200 de 650 y 550, y el plan de estudio de cada uno es distinto.',
          'Si tu punto débil es <strong>Reading and Writing</strong>, la buena noticia es que es la sección con la mejora más ordenada: Standard English Conventions son reglas cerradas que se aprenden enteras, Expression of Ideas son dos procedimientos, y solo Craft and Structure exige tiempo largo. Antes de fijarte una meta en la escala 400-1600, mira en qué dominio se te van los puntos — es lo que hace nuestro simulacro.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Cuál es un buen puntaje de SAT?',
        a: 'Depende por completo de a dónde apliques: el SAT no tiene nota de aprobado. La escala va de 400 a 1600, con 200 a 800 por sección. Lo que decide es el rango que publica cada universidad para su clase admitida, y ese dato se consulta en la página de admisiones de la universidad o en el buscador BigFuture de College Board.',
      },
      {
        q: '¿Qué significa el rango de puntajes que publica una universidad?',
        a: 'Es el intervalo donde cae el 50 % central de los admitidos, no un mínimo. Si publica 1250-1430, una cuarta parte de sus admitidos entró por debajo de 1250. Estar por debajo no te descalifica y estar por encima no te admite: el SAT es una parte de la solicitud, junto al promedio, los ensayos y las cartas.',
      },
      {
        q: '¿Sigue siendo obligatorio el SAT en Estados Unidos?',
        a: 'Depende de la universidad y del año. Muchas dejaron de exigirlo y algunas han vuelto a pedirlo, así que no hay una respuesta general: hay que comprobarlo en la página de admisiones de cada universidad para el ciclo en el que vas a presentar. Y ojo, porque la admisión y las becas por mérito pueden tener políticas distintas.',
      },
      {
        q: 'Si es opcional, ¿me conviene enviar el puntaje?',
        a: 'Si cae dentro o por encima del rango que publica esa universidad, casi siempre suma. Si queda muy por debajo, no enviarlo es una decisión razonable. Comprueba además si la beca que te interesa lo exige aunque la admisión no lo haga: son dos decisiones distintas que se suelen confundir.',
      },
      {
        q: '¿Qué puntaje de SAT piden para una beca?',
        a: 'No existe un puntaje que dé una beca por sí solo. Al inscribirte puedes elegir programas de beca a los que enviar tu puntaje, y muchas universidades usan el mismo puntaje para decidir su ayuda por mérito, pero cada convocatoria pone sus requisitos y suelen pesar también el promedio del colegio y la situación económica.',
      },
      {
        q: '¿Importa cómo se reparte mi puntaje entre las dos secciones?',
        a: 'A ti, mucho. Un 1200 hecho de 500 en Reading and Writing y 700 en Math necesita un plan distinto que un 1200 de 650 y 550. Antes de fijarte una meta en la escala total, mira en qué dominio se te van los puntos dentro de Reading and Writing: es lo que arregla o no arregla tu preparación.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'como-estudiar-sat-desde-cero', 'sat-desde-colombia'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Mide antes de fijarte una meta', note: 'Un módulo cronometrado con desglose por dominio. Gratis y sin crear cuenta.' },
    ],
    sources: [
      ...FUENTES_BASE,
      { label: 'College Board — Envío de puntajes a universidades y programas de beca', url: 'https://satsuite.collegeboard.org/scores/sending-sat-scores' },
      { label: 'College Board — BigFuture, buscador de universidades', url: 'https://bigfuture.collegeboard.org/college-search' },
    ],
    checked: '20 de agosto de 2026',
    checkedISO: '2026-08-20',
  },

  {
    slug: 'sat-desde-colombia',
    title: 'El SAT desde Colombia: inscripción, sedes y qué esperar',
    description: 'Cómo se presenta el SAT desde Colombia: la inscripción internacional, dónde se consultan sedes y fechas, y la exención de pago que no te aplica.',
    h1: 'Presentar el SAT desde Colombia',
    eyebrow: 'Guía SAT · Colombia y Latinoamérica',
    lead:
      'El <strong>SAT</strong> se presenta en Colombia con normalidad: quien lo hace fuera de Estados Unidos se inscribe en línea como estudiante internacional, y <strong>las fechas de examen son las mismas dentro y fuera del país</strong>. Lo que cambia es lo administrativo — un recargo internacional sobre la inscripción, sedes que abren y cierran de una convocatoria a otra, y unas exenciones de pago que, conviene saberlo antes, no aplican a un colombiano sin ciudadanía estadounidense.',
    sections: [
      {
        h: 'Las fechas son las mismas: el cierre no',
        body: [
          'Un dato que sorprende a casi todo el mundo: <strong>College Board publica un único calendario de fechas de examen y aplica dentro y fuera de Estados Unidos</strong>. No hay convocatorias «internacionales» aparte. En su página oficial de fechas y cierres están los sábados de examen del ciclo con su fecha límite de inscripción.',
          'Lo que sí conviene apuntar es <strong>el cierre, no el día del examen</strong>. Entre uno y otro suelen pasar semanas, y quien planea sobre la fecha del examen se encuentra la inscripción cerrada. No escribimos aquí ninguna fecha concreta a propósito: el calendario se rehace cada año escolar y una cifra vieja en una página como esta te haría planear mal algo que se decide con meses de antelación.',
        ],
      },
      {
        h: 'La inscripción, paso por paso y sin cifras inventadas',
        body: [
          'Quien presenta el <strong>SAT</strong> fuera de Estados Unidos se inscribe <strong>en línea</strong>, a través de la sección de <em>international testing</em> de College Board. El proceso pide crear una cuenta de estudiante, elegir fecha y sede, y ahí mismo puedes seleccionar universidades y programas de beca a los que enviar el puntaje.',
          'Un punto donde se juega la tranquilidad del día del examen: <strong>el documento de identidad con el que te inscribes tiene que coincidir con el que lleves</strong>, y los requisitos de identificación para quien presenta fuera de Estados Unidos son más estrictos que dentro. Es lo primero que hay que leer en las políticas de examen internacional de College Board, y hay que leerlo antes de pagar, no la semana antes.',
        ],
      },
      {
        h: 'Lo que cuesta, y las exenciones que no son para ti',
        body: [
          'Desde Colombia se paga <strong>la inscripción más un recargo internacional</strong>, y en algunas sedes un cargo adicional del propio centro. No ponemos la cifra porque la tabla oficial lleva impresa su propia fecha de vigencia: se consulta en la página de tarifas internacionales de College Board antes de presupuestar.',
          'Y hay algo que conviene saber antes de contar con ello. Existen <strong>exenciones de pago</strong> del <strong>SAT</strong>, pero College Board las reserva a estudiantes de grados 11 y 12 con bajos ingresos que estén en Estados Unidos o sus territorios, y a ciudadanos estadounidenses que viven fuera. <strong>Si presentas desde Colombia sin esa ciudadanía, presupuesta la tarifa completa.</strong> Es una de esas cosas que casi nadie dice y que descoloca a una familia a mitad del proceso.',
        ],
      },
      {
        h: 'Las sedes cambian de una convocatoria a otra',
        body: [
          'No publicamos una lista de ciudades colombianas con centro de <strong>SAT</strong>, y no es por pereza: los centros abren y cierran de una convocatoria a la siguiente, así que una lista escrita hoy engaña dentro de seis meses. El buscador oficial de centros de College Board te dice qué sedes hay disponibles <em>para la fecha que te interesa</em>.',
          'El orden correcto es mirarlo <strong>antes</strong> de elegir fecha, no después. Si la sede más cercana solo abre en dos de las convocatorias del año, eso manda sobre tu calendario de preparación — y si implica viajar, entra en el presupuesto junto con la tarifa.',
        ],
      },
      {
        h: 'Qué pasa el día del examen',
        body: [
          'El <strong>SAT</strong> es digital: se hace en un computador con la aplicación de examen de College Board, y se puede usar el equipo propio o uno del centro. La sección de Reading and Writing son 64 minutos en dos módulos de 32, con un descanso antes de Math. En total, unas 2 horas y 14 minutos de examen.',
          'Para un estudiante colombiano hay un detalle de preparación que pesa más de lo que parece: el examen está <strong>íntegramente en inglés</strong>, incluidas las instrucciones y la interfaz. Llegar habiendo practicado solo con material explicado en español y no haber visto nunca la pantalla real es un sobresalto evitable. Haz al menos un módulo completo cronometrado, en condiciones parecidas a las del día.',
        ],
      },
      {
        h: 'Prepararse desde Colombia: qué cambia',
        body: [
          'Preparar el <strong>SAT</strong> desde Colombia no es preparar inglés general, y esa confusión cuesta meses. El examen da por hecho que lees en inglés; lo que mide es precisión de lectura, reglas de la norma escrita estadounidense y ritmo. Un estudiante con B2 bien entrenado supera a un C1 que llega en frío.',
          'Dos cosas afectan específicamente a quien viene del español. Una: el <strong>SAT evalúa la norma escrita estadounidense</strong>, así que usos correctos en inglés británico —los de quien preparó IELTS— cuentan aquí como error. Otra: hay errores de puntuación que en español suenan naturales, como la coma entre el sujeto y su verbo, y el examen los ofrece como opción una y otra vez precisamente por eso.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿Se puede presentar el SAT en Colombia?',
        a: 'Sí. El SAT se aplica en sedes internacionales, Colombia incluida, y las fechas de examen son las mismas dentro y fuera de Estados Unidos. Qué centros abren cambia de una convocatoria a otra, así que la sede se comprueba en el buscador oficial de centros de College Board para la fecha que te interesa.',
      },
      {
        q: '¿Cuánto cuesta el SAT desde Colombia?',
        a: 'La inscripción más un recargo internacional, y en algunas sedes un cargo adicional del centro. No escribimos la cifra porque la tabla oficial lleva su propia fecha de vigencia y cambia cada año escolar: se consulta en la página de tarifas internacionales de College Board antes de presupuestar.',
      },
      {
        q: '¿Puedo pedir exención de pago del SAT siendo colombiano?',
        a: 'Normalmente no. College Board reserva las exenciones a estudiantes de grados 11 y 12 con bajos ingresos que estén en Estados Unidos o sus territorios, y a ciudadanos estadounidenses que viven fuera. Si presentas desde Colombia sin esa ciudadanía, presupuesta la tarifa completa.',
      },
      {
        q: '¿Cómo me inscribo al SAT desde Colombia?',
        a: 'En línea, en la sección de international testing de College Board: creas una cuenta de estudiante, eliges fecha y sede, y ahí mismo puedes elegir universidades y programas de beca a los que enviar el puntaje. Lee los requisitos de identificación antes de pagar: para quien presenta fuera de Estados Unidos son más estrictos, y el documento tiene que coincidir con el que lleves el día del examen.',
      },
      {
        q: '¿El SAT está en español?',
        a: 'No. El examen es íntegramente en inglés, incluidas las instrucciones y la interfaz de la aplicación. Existen traducciones de las instrucciones para ciertos contextos escolares en Estados Unidos, pero el examen que presentas desde Colombia está en inglés de principio a fin.',
      },
      {
        q: '¿Con qué antelación debo empezar a prepararme?',
        a: 'Con tres meses se pueden trabajar los cuatro dominios de Reading and Writing con calma. Con cuatro semanas hay que concentrarse en gramática y puntuación, que son reglas cerradas, y en el ritmo. Y cuenta el cierre de inscripción, no la fecha del examen: entre uno y otro suelen pasar semanas.',
      },
    ],
    relatedSlugs: ['como-estudiar-sat-desde-cero', 'puntaje-sat-universidades', 'reading-and-writing'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT gratis', note: 'Un módulo cronometrado, en inglés y con la presión real de los 32 minutos.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'Academia colombiana, en Bucaramanga y online.' },
      { href: '/examenes/toefl', label: 'TOEFL iBT', note: 'El examen de idioma que muchas universidades piden además del SAT.' },
    ],
    sources: [
      ...FUENTES_BASE,
      { label: 'College Board — Inscripción para quienes presentan fuera de EE. UU.', url: 'https://satsuite.collegeboard.org/sat/registration/international-testing' },
      { label: 'College Board — Fechas de examen y cierres de inscripción', url: 'https://satsuite.collegeboard.org/sat/dates-deadlines' },
      { label: 'College Board — Tarifas para quienes presentan fuera de EE. UU.', url: 'https://satsuite.collegeboard.org/sat/registration/international-testing/fees' },
      { label: 'College Board — Requisitos de exención de pago', url: 'https://satsuite.collegeboard.org/sat/registration/fee-waivers/fee-waiver-eligibility' },
      { label: 'College Board — Buscador de centros de examen', url: 'https://satsuite.collegeboard.org/sat/test-center-search' },
    ],
    checked: '20 de agosto de 2026',
    checkedISO: '2026-08-20',
  },

  {
    slug: 'sat-toefl-ielts-diferencias',
    title: 'SAT, TOEFL e IELTS: por qué te piden dos exámenes distintos',
    description: 'El SAT es de admisión; el TOEFL y el IELTS miden tu inglés. Qué mide cada uno, por qué las universidades piden los dos y en qué orden presentarlos.',
    h1: 'SAT, TOEFL e IELTS: para qué sirve cada uno',
    eyebrow: 'Guía SAT · comparativa',
    lead:
      'Es la confusión más cara del proceso: el <strong>SAT</strong> y el <strong>TOEFL</strong> o el <strong>IELTS</strong> no son alternativas, son exámenes que miden cosas distintas y muchas universidades estadounidenses piden los dos. El SAT es un <strong>examen de admisión</strong> que da por hecho que lees en inglés y compara tu razonamiento con el de estudiantes estadounidenses. El TOEFL y el IELTS son <strong>exámenes de dominio del idioma</strong> para quien no tiene el inglés como lengua materna.',
    sections: [
      {
        h: 'Miden cosas distintas, no niveles distintos',
        body: [
          'La diferencia no es de dificultad, es de propósito. El <strong>TOEFL</strong> y el <strong>IELTS</strong> preguntan si tu inglés alcanza para estudiar en inglés: evalúan las cuatro destrezas —comprensión oral y escrita, expresión oral y escrita— y te sitúan en una escala de dominio del idioma.',
          'El <strong>SAT</strong> no evalúa tu inglés como lengua extranjera. Da por sentado que lees en inglés y a partir de ahí mide otra cosa: precisión de lectura, dominio de la norma escrita estadounidense y razonamiento matemático, comparándote con estudiantes de bachillerato de Estados Unidos. Por eso el SAT no tiene sección de conversación ni de comprensión oral, y por eso un buen puntaje de TOEFL no te garantiza un buen SAT.',
        ],
      },
      {
        h: 'Por qué una universidad pide los dos',
        body: [
          'Porque responden a dos preguntas de admisión distintas. Con el <strong>SAT</strong>, la universidad quiere saber cómo te comparas académicamente con el resto de aspirantes. Con el <strong>TOEFL</strong> o el <strong>IELTS</strong> quiere asegurarse de que podrás seguir las clases, escribir trabajos y participar — incluidas las destrezas orales, que el SAT no toca.',
          'Algunas universidades contemplan eximir del examen de idioma cuando el puntaje de <strong>Reading and Writing</strong> del SAT es suficientemente alto, o cuando cursaste el bachillerato en inglés. Es una política que varía por universidad y por año, así que se comprueba en la página de admisiones de cada una: es exactamente el tipo de dato que no conviene dar por hecho a partir de lo que le pasó a un conocido.',
        ],
      },
      {
        h: 'En qué orden conviene presentarlos',
        body: [
          'La regla práctica es simple: <strong>primero el idioma, después el SAT</strong>. Si tu nivel de inglés todavía no llega a un B2 sólido, prepararte para el formato del SAT es construir sobre una base que no está — las estrategias de lectura no compensan no entender el texto.',
          'Cuando el inglés ya está, el orden se invierte en importancia: el <strong>SAT</strong> pide más tiempo de preparación porque hay que aprender un formato, no un idioma, y porque sus fechas son pocas al año, mientras que el TOEFL y el IELTS se presentan con mucha más frecuencia. Y ojo con el detalle que muerde a quien viene del IELTS: el SAT evalúa la <strong>norma escrita estadounidense</strong>, así que usos que en inglés británico son correctos aquí cuentan como error.',
        ],
      },
      {
        h: 'Lo que se transfiere de un examen a otro, y lo que no',
        body: [
          'Sí se transfiere: la velocidad de lectura, el vocabulario académico y la comodidad de hacer un examen largo en inglés. Quien preparó el <strong>IELTS</strong> Academic llega al SAT leyendo mejor que quien no ha preparado nada.',
          'No se transfiere lo que decide el puntaje. Los cuatro dominios del SAT —vocabulario en contexto, evidencia, convenciones y expresión— tienen tipos de pregunta propios que no aparecen en TOEFL ni IELTS, y el ritmo es muy distinto: un minuto y once segundos por pregunta, con un texto nuevo en cada una. Es la razón por la que estudiantes con IELTS 7.5 sacan puntajes mediocres de SAT en su primer intento: el inglés estaba, el formato no.',
        ],
      },
    ],
    faqs: [
      {
        q: '¿El SAT reemplaza al TOEFL o al IELTS?',
        a: 'No. Son cosas distintas y muchas universidades piden las dos: el SAT como examen de admisión y el TOEFL o el IELTS como prueba de dominio del inglés para estudiantes internacionales. Algunas universidades contemplan eximir del examen de idioma si el puntaje de Reading and Writing es alto, pero eso se comprueba universidad por universidad.',
      },
      {
        q: '¿Qué presento primero, el SAT o el examen de inglés?',
        a: 'Primero el idioma. Si tu nivel no llega a un B2 sólido, prepararte para el formato del SAT es construir sobre una base que no está. Cuando el inglés ya está, el SAT pide más tiempo de preparación y tiene menos fechas al año, así que conviene reservarle el calendario más largo.',
      },
      {
        q: '¿Es más difícil el SAT o el TOEFL?',
        a: 'No se pueden comparar así, porque no miden lo mismo. El TOEFL evalúa si tu inglés alcanza para estudiar en inglés, con las cuatro destrezas. El SAT da por hecho que lees en inglés y mide precisión de lectura, norma escrita estadounidense y matemáticas, comparándote con estudiantes de bachillerato de Estados Unidos.',
      },
      {
        q: 'Preparé el IELTS. ¿Me sirve para el SAT?',
        a: 'En parte. Se transfiere la velocidad de lectura, el vocabulario académico y la resistencia a un examen largo en inglés. No se transfieren los tipos de pregunta del SAT ni su ritmo, y hay una trampa concreta: el SAT evalúa la norma escrita estadounidense, así que usos correctos en inglés británico cuentan aquí como error.',
      },
      {
        q: '¿El SAT tiene sección de speaking o listening?',
        a: 'No. El SAT digital tiene dos secciones, Reading and Writing y Math, y ninguna evalúa comprensión oral ni expresión oral. Es una de las razones por las que las universidades piden además un examen de idioma a los estudiantes internacionales.',
      },
    ],
    relatedSlugs: ['reading-and-writing', 'puntaje-sat-universidades', 'como-estudiar-sat-desde-cero'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT gratis', note: 'Un módulo cronometrado de 27 preguntas con desglose por dominio.' },
      { href: '/examenes/toefl', label: 'TOEFL iBT', note: 'Guía y simulacros del examen de idioma más pedido en EE. UU.' },
      { href: '/examenes/ielts', label: 'IELTS', note: 'La alternativa al TOEFL, aceptada por la mayoría de universidades de EE. UU.' },
    ],
    sources: FUENTES_BASE,
    checked: '20 de agosto de 2026',
    checkedISO: '2026-08-20',
  },

];

export const SAT_GUIDE_SLUGS = SAT_GUIDES.map(g => g.slug);

export function getSatGuide(slug: string): SatGuidePage | undefined {
  return SAT_GUIDES.find(g => g.slug === slug);
}

/**
 * Enlaces internos del clúster, ya filtrados: una página que aún no está escrita
 * no aparece. Es lo que evita que el espinazo se llene de 404 mientras se construye.
 */
export function resolveRelatedGuides(page: SatGuidePage): { href: string; label: string; note: string }[] {
  return (page.relatedSlugs ?? [])
    .map(slug => SAT_GUIDES.find(g => g.slug === slug))
    .filter((g): g is SatGuidePage => Boolean(g))
    .map(g => ({ href: `/examenes/sat/guia/${g.slug}`, label: g.h1, note: g.description }));
}
