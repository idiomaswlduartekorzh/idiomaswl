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
    relatedSlugs: ['craft-and-structure', 'information-and-ideas', 'standard-english-conventions', 'expression-of-ideas', 'como-estudiar-sat-desde-cero'],
    related: [
      { href: '/examenes/sat/practica/set-1', label: 'Simulacro SAT · un módulo real', note: '27 preguntas en 32 minutos, con los cuatro dominios en la proporción del examen.' },
      { href: '/examenes/sat', label: 'Guía general del SAT', note: 'Qué es, cómo se puntúa, y dónde se consultan fechas y tarifas.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'El SAT premia precisión de lectura, y eso se entrena.' },
    ],
    sources: FUENTES_BASE,
    checked: '19 de agosto de 2026',
    checkedISO: '2026-08-19',
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
