export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO format
  updatedDate?: string;
  readTime: number; // minutes
  category: string;
  tags: string[];
  coverImage?: string;
  body: string; // HTML string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'como-sacar-band-7-en-ielts',
    title: 'Cómo sacar Band 7 en el IELTS: guía práctica para hispanohablantes',
    description:
      'Todo lo que necesitas saber para alcanzar Band 7 en el IELTS: qué mide cada sección, cuánto tiempo necesitas y el plan de estudio semana a semana.',
    date: '2026-05-01',
    readTime: 9,
    category: 'IELTS',
    tags: ['IELTS', 'inglés', 'exámenes internacionales', 'Band 7', 'preparación'],
    body: `
<h2>¿Por qué Band 7?</h2>
<p>Band 7 es el puntaje mínimo que exigen la mayoría de programas de maestría en universidades anglófonas, procesos migratorios de Canadá y Australia, y empleos corporativos de nivel medio-alto. Es el umbral entre "puedo comunicarme en inglés" y "domino el inglés para entornos profesionales".</p>
<p>La buena noticia: con una preparación estructurada de 10 a 14 semanas, un estudiante con nivel B1 sólido puede alcanzarlo. La mala: sin estructura, la mayoría repite el examen dos o tres veces y pierde cientos de dólares.</p>

<h2>Qué mide el IELTS y cómo se califica</h2>
<p>El IELTS Academic tiene cuatro secciones, cada una con puntaje de 0 a 9:</p>
<ul>
  <li><strong>Listening (40 min)</strong> — 40 preguntas sobre 4 grabaciones de dificultad creciente.</li>
  <li><strong>Reading (60 min)</strong> — 3 textos académicos, 40 preguntas. Sección más temida por hispanohablantes.</li>
  <li><strong>Writing (60 min)</strong> — Task 1: describe un gráfico en 150 palabras. Task 2: ensayo argumentativo de 250 palabras.</li>
  <li><strong>Speaking (11-14 min)</strong> — Entrevista cara a cara dividida en tres partes.</li>
</ul>
<p>El Band final es el promedio redondeado al 0.5 más cercano. Para obtener 7.0 overall necesitas que tu promedio sea ≥ 6.75.</p>

<h2>Las secciones que deciden tu puntaje</h2>
<h3>Writing: el cuello de botella</h3>
<p>Writing es la sección donde la mayoría de hispanohablantes se estanca entre Band 5.5 y 6.5. Los evaluadores la califican con cuatro criterios:</p>
<ol>
  <li><strong>Task Achievement</strong> — ¿respondiste lo que pedía la pregunta?</li>
  <li><strong>Coherence &amp; Cohesion</strong> — ¿las ideas fluyen con lógica?</li>
  <li><strong>Lexical Resource</strong> — ¿usas vocabulario variado y preciso?</li>
  <li><strong>Grammatical Range &amp; Accuracy</strong> — ¿variedad de estructuras sin errores?</li>
</ol>
<p>El error más común: escribir mucho sin responder directamente la pregunta. Band 7 en Writing exige una tesis clara, párrafos con idea central + desarrollo + ejemplo y conclusión que retoma la posición, no solo resume.</p>

<h3>Reading: velocidad + estrategia</h3>
<p>Tienes 60 minutos para leer ~2.700 palabras y responder 40 preguntas. No leerás todo; aprenderás a escanear y a localizar respuestas sin leer cada palabra. Los tipos de preguntas más difíciles para hispanohablantes son:</p>
<ul>
  <li><strong>Matching Headings</strong> — confunden porque los párrafos tienen ideas múltiples.</li>
  <li><strong>True / False / Not Given</strong> — "Not Given" no significa "False"; exige que la información simplemente no aparezca.</li>
</ul>

<h2>Plan de estudio de 12 semanas hacia Band 7</h2>
<p>Este plan asume 1 hora diaria entre semana y 2 horas el fin de semana (≈ 9 horas semanales).</p>

<h3>Semanas 1–3: diagnóstico y fundamentos</h3>
<ul>
  <li>Realiza un simulacro completo sin preparación para identificar tus secciones más débiles.</li>
  <li>Escucha 20 minutos de inglés académico diario (TED Talks, BBC Learning English).</li>
  <li>Lee un artículo en inglés de nivel académico cada día y resume la idea central en 2 oraciones.</li>
</ul>

<h3>Semanas 4–7: ataque a las debilidades</h3>
<ul>
  <li>Practica Writing Task 2 diario: escribe el ensayo en 40 minutos, luego analiza con modelo de respuesta.</li>
  <li>Completa 2 secciones de Reading por semana con análisis de errores.</li>
  <li>Amplía vocabulario académico (Academic Word List, familias de palabras).</li>
  <li>Graba tus respuestas de Speaking y escúchalas para identificar patrones de error.</li>
</ul>

<h3>Semanas 8–11: simulacros completos y ajuste fino</h3>
<ul>
  <li>Un simulacro completo cada 5 días, en condiciones de examen real.</li>
  <li>Después de cada simulacro, 2 días de análisis y trabajo sobre errores específicos.</li>
  <li>Practica Writing Task 1 (gráficos) que suele descuidarse.</li>
</ul>

<h3>Semana 12: afinamiento y logística</h3>
<ul>
  <li>No hagas nada nuevo. Repasa los modelos de respuesta que más te sirvieron.</li>
  <li>Confirma el centro de examen, los documentos requeridos y el horario.</li>
  <li>Duerme bien los 3 días previos.</li>
</ul>

<h2>Recursos gratuitos que realmente funcionan</h2>
<ul>
  <li><strong>IELTS Liz (ieltsliz.com)</strong> — Estrategias por sección con ejemplos reales de Band 7-9.</li>
  <li><strong>BBC Learning English</strong> — Pronunciación y vocabulario académico en contexto.</li>
  <li><strong>British Council IELTS</strong> — Simulacros oficiales gratuitos de práctica.</li>
  <li><strong>Simulacros WeLearn</strong> — Banco de preguntas en español con retroalimentación por sección.</li>
</ul>

<h2>Los 5 errores que arruinan un Band 7</h2>
<ol>
  <li><strong>Presentarse sin haber hecho simulacros cronometrados.</strong> El tiempo es el factor más subestimado.</li>
  <li><strong>Memorizar respuestas de Writing.</strong> Los evaluadores reconocen ensayos memorizados y bajan la nota.</li>
  <li><strong>Ignorar Speaking hasta la última semana.</strong> Es la sección que más se beneficia de práctica constante.</li>
  <li><strong>Estudiar vocabulario en listas sin contexto.</strong> El cerebro recuerda palabras en oraciones, no aisladas.</li>
  <li><strong>No analizar los errores de los simulacros.</strong> Repetir sin entender por qué te equivocas no mejora el puntaje.</li>
</ol>

<h2>¿Cuándo es momento de tomar clases?</h2>
<p>El autodidacta puede llegar a Band 6.5 con recursos gratuitos y disciplina. Para dar el salto de 6.5 a 7.0 (o de 7.0 a 7.5), el cuello de botella suele ser Writing y Speaking — y ahí un tutor que da retroalimentación real sobre tus textos y grabaciones marca la diferencia.</p>
<p>La razón: los errores que te tienen estancado en 6.5 suelen ser puntos ciegos que tú no ves porque llevas semanas mirando el mismo tipo de respuesta. Un evaluador externo los ve en segundos.</p>
    `,
  },

  {
    slug: 'puntaje-icfes-ingles-niveles-y-como-mejorar',
    title: 'Puntaje ICFES inglés: niveles, puntaje mínimo y cómo mejorarlo en 3 meses',
    description:
      'Qué mide el componente de inglés del ICFES Saber 11, cuál es el puntaje que piden las universidades colombianas y el plan de estudio más eficiente para subir de nivel.',
    date: '2026-05-08',
    readTime: 7,
    category: 'ICFES',
    tags: ['ICFES', 'Saber 11', 'inglés', 'Colombia', 'universidades', 'B2'],
    body: `
<h2>El inglés en el ICFES Saber 11: lo que evalúa realmente</h2>
<p>El componente de inglés del ICFES Saber 11 evalúa comprensión lectora y uso del idioma en contextos comunicativos reales. No mide gramática aislada ni traducción: mide si puedes leer un texto en inglés y entenderlo, y si conoces las estructuras lingüísticas en contexto.</p>
<p>El examen se divide en dos grandes bloques:</p>
<ul>
  <li><strong>Comprensión lectora (aprox. 60%)</strong> — Textos informativos, argumentativos y narrativos. Preguntas de idea principal, vocabulario en contexto, inferencia y propósito del autor.</li>
  <li><strong>Uso del idioma (aprox. 40%)</strong> — Gramática funcional, conectores lógicos, coherencia textual y léxico en contexto.</li>
</ul>
<p>Son en total <strong>45 preguntas</strong> distribuidas en el componente de inglés, con un tiempo integrado dentro del bloque de comunicación del examen.</p>

<h2>La escala de puntajes y lo que significa cada nivel</h2>
<p>El ICFES usa una escala del 0 al 100 para el componente de inglés, alineada con el MCER (Marco Común Europeo de Referencia):</p>
<ul>
  <li><strong>0 – 37 → Nivel A-</strong>: No alcanza el nivel mínimo A1. Comprensión muy limitada del inglés.</li>
  <li><strong>38 – 49 → Nivel A1</strong>: Comprende palabras aisladas y frases muy básicas.</li>
  <li><strong>50 – 65 → Nivel A2</strong>: Comprende información directa en textos breves y sencillos. <em>Nivel más frecuente en Colombia.</em></li>
  <li><strong>66 – 80 → Nivel B1</strong>: Comprende textos de cierta complejidad sobre temas cotidianos y académicos.</li>
  <li><strong>81 – 100 → Nivel B2</strong>: Comprende textos complejos en inglés con vocabulario académico y abstracto.</li>
</ul>
<p>El promedio nacional ronda el nivel A2 (50-60 puntos). Llegar a B1 o B2 te pone en el decil superior.</p>

<h2>¿Qué puntaje piden las universidades colombianas?</h2>
<p>Cada universidad tiene sus propios requisitos, pero estos son los rangos más comunes:</p>
<ul>
  <li><strong>Universidades públicas (UdeA, UIS, UN)</strong>: El ICFES entra como parte del puntaje global. Un buen puntaje en inglés puede compensar debilidades en otras áreas.</li>
  <li><strong>Universidades de alta exigencia (Los Andes, Javeriana, EAFIT)</strong>: Para programas de ingeniería, economía y ciencias sociales, un nivel B1 (66+) es el mínimo competitivo; para becas y programas de honor, B2 (81+).</li>
  <li><strong>Programas con becas internacionales</strong>: B2 es prácticamente obligatorio para ser elegible.</li>
</ul>

<h2>Los errores más frecuentes de los estudiantes colombianos</h2>
<h3>Error 1: estudiar gramática fuera de contexto</h3>
<p>Muchos colegios enseñan inglés como si fuera un ejercicio de matemáticas: reglas + ejercicios mecánicos. El ICFES mide comprensión, no reglas. Alguien que ha leído mucho en inglés, aunque no sepa nombrar los tiempos verbales, tendrá mejor puntaje que quien memorizó paradigmas gramaticales sin usarlos.</p>

<h3>Error 2: no leer en inglés regularmente</h3>
<p>La comprensión lectora no se entrena con simulacros solos. Se construye con hábito de lectura. Veinte minutos diarios de lectura en inglés (noticias, artículos, Wikipedia en inglés sobre temas de interés) equivalen a meses de clases pasivas.</p>

<h3>Error 3: estudiar solo en las semanas previas al examen</h3>
<p>El inglés es una habilidad acumulativa. Tres meses de trabajo constante producen mucho más que tres semanas intensivas.</p>

<h2>Plan de 12 semanas para subir un nivel completo (A2 → B1 o B1 → B2)</h2>

<h3>Semanas 1–4: construcción de base</h3>
<ul>
  <li><strong>Lectura diaria</strong>: 15 minutos de artículos en inglés nivel apropiado. No uses el diccionario para cada palabra; intenta deducir el significado del contexto.</li>
  <li><strong>Vocabulario</strong>: Anki o cualquier app de flashcards con 10 palabras nuevas diarias. Enfócate en vocabulario académico frecuente en el ICFES: <em>however, therefore, according to, despite, whereas, consequently, nevertheless</em>.</li>
  <li><strong>Simulacro diagnóstico</strong>: en la semana 2, haz un simulacro completo para identificar tus patrones de error.</li>
</ul>

<h3>Semanas 5–9: práctica intensiva por tipo de pregunta</h3>
<ul>
  <li>Dos simulacros semanales (no completos, sino por sección).</li>
  <li>Por cada error, identifica: ¿fue vocabulario? ¿fue comprensión de la estructura de la pregunta? ¿fue velocidad de lectura?</li>
  <li>Practica especialmente las preguntas de "No aplica" o "Idea principal" — las más discriminantes.</li>
</ul>

<h3>Semanas 10–12: simulacros completos y consolidación</h3>
<ul>
  <li>Un simulacro completo cada 5 días en condiciones cronometradas.</li>
  <li>Revisión de errores acumulados y repaso de vocabulario más difícil.</li>
  <li>La semana previa al examen: no incorpores material nuevo. Refuerza lo que ya sabes.</li>
</ul>

<h2>Recursos específicos para el ICFES inglés</h2>
<ul>
  <li><strong>Simulacros ICFES oficiales</strong>: el ICFES publica cuadernillos de exámenes anteriores en su página oficial.</li>
  <li><strong>Newsela (newsela.com)</strong>: artículos de noticias reales adaptados por nivel de lectura. Ideal para construir velocidad lectora.</li>
  <li><strong>Simulacros WeLearn</strong>: banco de preguntas estilo ICFES con retroalimentación y análisis por sección.</li>
</ul>

<h2>¿Vale la pena tomar clases de preparación ICFES inglés?</h2>
<p>Depende de dónde estás. Si estás en nivel A2 y quieres llegar a B1, el estudio autónomo con buenos recursos es suficiente si tienes disciplina. Si quieres llegar a B2 o tienes menos de 8 semanas para el examen, un tutor que analice tus simulacros y te dé retroalimentación real ahorra tiempo —y puede ser la diferencia entre quedar admitido o repetir el año.</p>
    `,
  },

  {
    slug: 'aprender-coreano-desde-cero-guia-colombia',
    title: 'Aprender coreano desde cero en Colombia: la guía completa para 2026',
    description:
      'Todo lo que necesitas saber para comenzar a aprender coreano en Colombia: alfabeto, recursos gratuitos, examen TOPIK y por qué cada vez más colombianos estudian este idioma.',
    date: '2026-05-15',
    readTime: 11,
    category: 'Coreano',
    tags: ['coreano', 'Hangul', 'TOPIK', 'K-pop', 'Korea', 'Colombia', 'aprender idiomas'],
    body: `
<h2>¿Por qué coreano y por qué ahora?</h2>
<p>Colombia tiene hoy una de las comunidades de fans del contenido coreano más activas de América Latina. K-dramas, K-pop y webtoons no son solo entretenimiento: son la puerta de entrada a uno de los idiomas con mayor demanda laboral en el mundo.</p>
<p>Las razones para aprender coreano en 2026 van mucho más allá del entretenimiento:</p>
<ul>
  <li><strong>Turismo y residencia en Corea del Sur</strong>: más de 400 vuelos directos entre Latinoamérica y Corea del Sur se han sumado en la última década. El coreano básico transforma completamente la experiencia.</li>
  <li><strong>Trabajo en empresas coreanas</strong>: Samsung, LG, Hyundai y Lotte tienen operaciones en Colombia. El coreano es un diferenciador real en el mercado laboral.</li>
  <li><strong>Becas y estudios en Corea</strong>: la Beca GKS (Government Korean Scholarship) cubre matrícula, alojamiento y manutención para extranjeros. El requisito mínimo es TOPIK II Nivel 3.</li>
  <li><strong>Traducción y locución K-content</strong>: hay una demanda creciente de hispanohablantes que entiendan coreano para trabajar en subtitulado y localización.</li>
</ul>

<h2>El Hangul: la sorpresa agradable del coreano</h2>
<p>La mayoría de personas que nunca han estudiado coreano asume que el alfabeto coreano es similar al chino —miles de caracteres imposibles de memorizar. Es el primer gran malentendido.</p>
<p>El Hangul (한글) es un alfabeto <em>silábico</em> creado en el siglo XV con un principio de diseño extraordinario: los símbolos imitan la posición de la boca y la lengua al pronunciar cada sonido. Tiene <strong>14 consonantes y 10 vocales base</strong>.</p>
<p>Con 10 a 15 horas de práctica enfocada, cualquier adulto puede aprender a leer y escribir Hangul con fluidez. No entiende lo que está leyendo todavía —pero puede pronunciarlo. Esto es enormemente motivante y diferencia al coreano de otros idiomas asiáticos con sistemas de escritura mucho más complejos.</p>

<h2>¿Es difícil el coreano para hispanohablantes?</h2>
<p>Honestamente: sí, más que el inglés o el portugués. Pero menos de lo que parece desde afuera.</p>
<p>Los principales desafíos son:</p>
<ul>
  <li><strong>Orden de palabras inverso (SOV)</strong>: en español decimos "Yo como manzana" (SVO); en coreano dicen "나는 사과를 먹어요" (Yo manzana como). El verbo va al final. Requiere reentrenar el oído y el cerebro.</li>
  <li><strong>Partículas gramaticales</strong>: el coreano usa partículas (como 은/는, 이/가, 을/를) para marcar la función de cada palabra en la oración. Es un concepto nuevo para hispanohablantes.</li>
  <li><strong>Sistema de honoríficos</strong>: el coreano tiene niveles formales e informales que cambian la terminación de cada verbo. Intimidante al principio, pero hay solo 2-3 niveles que usarás el 95% del tiempo.</li>
  <li><strong>Pronunciación</strong>: algunos sonidos no existen en español (ㅡ, ㅓ, ㅏ, la distinción entre consonantes tensas y aspiradas). Son superables con práctica de escucha.</li>
</ul>
<p>Lo que facilita el aprendizaje: la gramática coreana es <em>muy regular</em>. Una vez que aprendes un patrón verbal, aplica casi sin excepciones. Y el Hangul hace que la pronunciación sea predecible desde el principio.</p>

<h2>Ruta de aprendizaje: de cero al TOPIK I en 6 meses</h2>
<p>Esta ruta asume 45 minutos diarios de estudio consistente.</p>

<h3>Mes 1: el Hangul y las bases</h3>
<ul>
  <li>Aprende todas las letras del Hangul (consonantes, vocales, consonantes dobles, diptongos). Target: 2 semanas.</li>
  <li>Practica lectura en voz alta con textos simples aunque no entiendas aún.</li>
  <li>Aprende las primeras 100 palabras más frecuentes del coreano cotidiano.</li>
  <li>Aprende a presentarte: 안녕하세요 (Annyeonghaseyo), 저는 ___예요, 만나서 반가워요.</li>
</ul>

<h3>Meses 2–3: gramática fundamental</h3>
<ul>
  <li>Partículas básicas: 은/는 (tema), 이/가 (sujeto), 을/를 (objeto), 에/에서 (lugar).</li>
  <li>Conjugación presente formal (-아요/어요), pasado (-았어요/었어요), futuro (-ㄹ/을 거예요).</li>
  <li>Números nativos coreanos vs. números sino-coreanos (para horas vs. cantidades).</li>
  <li>Expresiones cotidianas: querer, poder, tener que, ir, venir.</li>
</ul>

<h3>Meses 4–5: vocabulario temático y escucha</h3>
<ul>
  <li>Expande vocabulario por temas: familia, comida, transporte, trabajo, cuerpo, tiempo.</li>
  <li>Empieza a escuchar K-dramas con subtítulos en coreano (no en español) para entrenamiento de escucha real.</li>
  <li>Encuentra un intercambio de idiomas (tandem) con hablante nativo. Hay comunidades activas en Discord y HelloTalk.</li>
</ul>

<h3>Mes 6: preparación TOPIK I</h3>
<ul>
  <li>El TOPIK I tiene dos secciones: Listening y Reading. No hay Writing.</li>
  <li>Practica con exámenes oficiales anteriores (disponibles gratis en el sitio oficial del TOPIK).</li>
  <li>Nivel 1: puntaje 80+ en ambas secciones. Nivel 2: puntaje 140+.</li>
</ul>

<h2>El examen TOPIK: qué es y para qué sirve</h2>
<p>El TOPIK (Test of Proficiency in Korean) es el examen oficial del Ministerio de Educación de Corea del Sur para no nativos. Se divide en:</p>
<ul>
  <li><strong>TOPIK I</strong>: niveles 1 y 2, para principiantes e intermedios bajos. Solo Listening y Reading.</li>
  <li><strong>TOPIK II</strong>: niveles 3 al 6, desde intermedio hasta avanzado. Incluye Writing.</li>
</ul>
<p>¿Para qué lo necesitas?</p>
<ul>
  <li>Nivel 2: requisito de algunas visas de trabajo en Corea.</li>
  <li>Nivel 3: requisito mínimo para la Beca GKS y para entrar a programas universitarios en Korea.</li>
  <li>Nivel 4: para empleos en empresas coreanas que exigen competencia profesional.</li>
  <li>Nivel 5-6: para trabajo académico o gubernamental en Corea.</li>
</ul>
<p>En Colombia, el TOPIK se presenta generalmente una vez al año en Bogotá (sede Alliance Française o similar). Vale la pena estar pendiente de las convocatorias del NIIED (National Institute for International Education).</p>

<h2>Recursos gratuitos para empezar hoy</h2>
<ul>
  <li><strong>Talk To Me In Korean (talktomeinkorean.com)</strong>: el mejor recurso gratuito estructurado en inglés. Tiene hasta nivel 10 con lecciones de gramática, vocabulario y cultura.</li>
  <li><strong>Duolingo</strong>: útil para los primeros 2 meses de Hangul y vocabulario básico. No suficiente para llegar al TOPIK.</li>
  <li><strong>Anki + mazo Evita</strong>: mazo de vocabulario coreano por frecuencia. Las primeras 1.000 palabras te dan cobertura del 85% del vocabulario conversacional.</li>
  <li><strong>Netflix + Language Reactor</strong>: K-dramas con subtítulos en coreano, inglés y español simultáneos. Aprendizaje en contexto real.</li>
  <li><strong>Clases WeLearn</strong>: método estructurado de 17 pasos diseñado específicamente para hispanohablantes con énfasis en el TOPIK.</li>
</ul>

<h2>El factor motivación: cómo mantenerte constante</h2>
<p>El coreano tarda entre 1.000 y 1.500 horas para alcanzar fluidez conversacional (clasificado por el FSI como idioma de Categoría IV para angloparlantes; para hispanohablantes es similar). Son entre 2 y 4 años con estudio diario moderado.</p>
<p>Lo que separa a los estudiantes que llegan del TOPIK II a los que abandonan en el mes 3 no es talento lingüístico: es la conexión con el idioma. Los que más avanzan son los que tienen una razón personal fuerte —una serie, un viaje planeado, un amigo coreano, un sueño de estudiar allá.</p>
<p>Encuentra tu razón. El idioma vendrá solo si la razón es real.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map(p => p.slug);
}
