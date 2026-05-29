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
<p>La razón: los errores que te tienen estancado en 6.5 suelen ser puntos ciegos que tú no ves porque llevas semanas mirando el mismo tipo de respuesta. Un evaluador externo los ve en segundos. Si estás en esa etapa, puedes <a href="/clases-de-ingles">conocer cómo trabajamos el IELTS en WeLearn</a> o hacer un simulacro gratuito para ver dónde estás exactamente.</p>
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
<p>Depende de dónde estás. Si estás en nivel A2 y quieres llegar a B1, el estudio autónomo con buenos recursos es suficiente si tienes disciplina. Si quieres llegar a B2 o tienes menos de 8 semanas para el examen, un tutor que analice tus simulacros y te dé retroalimentación real ahorra tiempo —y puede ser la diferencia entre quedar admitido o repetir el año. Conoce cómo funciona nuestra <a href="/preparacion-icfes">preparación para el inglés del ICFES</a> con simulacros incluidos.</p>
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
<p>Encuentra tu razón. El idioma vendrá solo si la razón es real. Si quieres empezar con estructura desde el primer día, conoce nuestro <a href="/clases-de-coreano">método de coreano para hispanohablantes</a> — diseñado específicamente para este camino.</p>
    `,
  },

  {
    slug: 'toefl-ibt-preparacion-guia-completa',
    title: 'TOEFL iBT: guía de preparación desde cero para colombianos',
    description:
      'Todo lo que necesitas saber sobre el TOEFL iBT: estructura del examen, puntaje mínimo para cada objetivo, diferencias con el IELTS y plan de estudio de 10 semanas.',
    date: '2026-05-20',
    readTime: 8,
    category: 'TOEFL',
    tags: ['TOEFL iBT', 'inglés', 'exámenes internacionales', 'Estados Unidos', 'universidad', 'preparación'],
    body: `
<h2>¿Qué es el TOEFL iBT y para qué sirve?</h2>
<p>El TOEFL iBT (Test of English as a Foreign Language, Internet-Based Test) es el examen de inglés más reconocido para admisión a universidades de Estados Unidos y Canadá. A diferencia del IELTS, que nació en el Reino Unido con foco académico y migratorio, el TOEFL fue diseñado específicamente para entornos universitarios norteamericanos.</p>
<p>Las principales razones para tomar el TOEFL:</p>
<ul>
  <li><strong>Universidades en EE.UU. y Canadá</strong>: más del 85% de las universidades norteamericanas lo aceptan. Muchas lo prefieren sobre el IELTS.</li>
  <li><strong>Becas Fulbright y otras becas federales</strong>: suelen requerir TOEFL específicamente.</li>
  <li><strong>Programas de máster y doctorado</strong>: puntaje mínimo entre 80 y 100 según la institución y el programa.</li>
  <li><strong>Visas y residencia en ciertos países</strong>: aunque el IELTS domina en este campo, algunas jurisdicciones aceptan TOEFL.</li>
</ul>

<h2>Estructura del TOEFL iBT</h2>
<p>El TOEFL iBT dura aproximadamente <strong>3 horas</strong> y tiene 4 secciones:</p>
<ul>
  <li><strong>Reading (54-72 minutos)</strong> — 3-4 pasajes académicos de 700 palabras cada uno. 10 preguntas por pasaje. Enfocado en vocabulario académico y comprensión de argumentos complejos.</li>
  <li><strong>Listening (41-57 minutos)</strong> — 3-4 conversaciones universitarias + 3-4 conferencias académicas. Las conferencias simulan clases universitarias reales con múltiples hablantes.</li>
  <li><strong>Speaking (17 minutos)</strong> — 4 tareas: 1 opinión personal, 1 basada en lectura, 2 basadas en lectura+escucha. Las respuestas se graban.</li>
  <li><strong>Writing (50 minutos)</strong> — 2 tareas: una integrada (leer + escuchar + escribir) y una discusión académica en un foro online.</li>
</ul>
<p>Puntaje total: 0 a 120. Cada sección vale 30 puntos.</p>

<h2>¿Qué puntaje necesitas?</h2>
<ul>
  <li><strong>60-79 (Basic)</strong>: mínimo para algunos programas de pregrado y comunidades universitarias.</li>
  <li><strong>80-93 (Fair)</strong>: rango competitivo para universidades estatales de EE.UU. en programas de humanidades y ciencias sociales.</li>
  <li><strong>94-101 (Good)</strong>: mínimo para universidades de alta exigencia como las del sistema UC o Big Ten en programas de ingeniería y ciencias.</li>
  <li><strong>102-110 (Very Good)</strong>: rango competitivo para la Ivy League y programas de posgrado top.</li>
  <li><strong>111-120 (Excellent)</strong>: rango de asistentes de enseñanza (Teaching Assistants) y becas por mérito pleno.</li>
</ul>

<h2>TOEFL vs IELTS: ¿cuál elegir?</h2>
<p>Esta es la pregunta que más recibe David en WeLearn. La respuesta honesta: depende de tu destino y tu perfil.</p>
<ul>
  <li><strong>Elige TOEFL si</strong>: tu objetivo es una universidad en EE.UU. o Canadá, presentarás becas Fulbright o LASPAU, o te sientes más cómodo con tecnología (todo se hace en computador).</li>
  <li><strong>Elige IELTS si</strong>: tu objetivo es Europa (especialmente UK), Australia o Nueva Zelanda, o prefieres el examen de Speaking cara a cara con un examinador humano.</li>
  <li><strong>Presentas los dos si</strong>: aplicas a universidades en múltiples países o quieres tener opciones abiertas.</li>
</ul>
<p>Diferencia clave de formato: en el TOEFL, Speaking se hace frente a un micrófono en solitario; en el IELTS, es una entrevista en vivo. Para algunos hispanohablantes, hablar solo a una pantalla resulta más difícil que con un interlocutor real.</p>

<h2>Los 3 errores más comunes en el TOEFL</h2>
<h3>Error 1: subestimar la sección de Listening</h3>
<p>El Listening del TOEFL es diferente al de otros exámenes: las grabaciones simulan clases universitarias con interrupciones, digresiones y vocabulario técnico académico. No es inglés cotidiano. Los hablantes tienen acentos norteamericanos pero con variantes regionales.</p>
<p>La solución: escuchar podcasts y conferencias académicas en inglés desde el comienzo de la preparación. MIT OpenCourseWare, TED Academic y NPR Science Friday son buenas fuentes.</p>

<h3>Error 2: no practicar Speaking en voz alta</h3>
<p>El mayor problema de los hispanohablantes en Speaking no es la gramática ni el vocabulario: es la velocidad y la organización. El TOEFL te da 15-30 segundos para preparar y 45-60 segundos para responder. Quien no practica cronometrado no puede entregar una respuesta completa y coherente.</p>

<h3>Error 3: confundir la tarea de Writing integrada</h3>
<p>La Writing Task 1 del TOEFL (Integrated Writing) no es un ensayo de opinión: es un resumen que reconcilia lo que leíste con lo que escuchaste. Muchos estudiantes escriben su opinión en lugar de analizar la relación entre el texto y la conferencia, y pierden entre 4 y 8 puntos por esto.</p>

<h2>Plan de estudio de 10 semanas para 90+ puntos</h2>
<h3>Semanas 1-2: diagnóstico y estructura</h3>
<ul>
  <li>Simulacro completo oficial (ETS ofrece uno gratuito en toefl.org).</li>
  <li>Identifica tu sección más débil.</li>
  <li>Empieza a escuchar 20 minutos diarios de inglés académico.</li>
</ul>
<h3>Semanas 3-5: ataque por sección</h3>
<ul>
  <li>Reading: un pasaje completo por día con análisis de errores. Enfócate en vocabulario académico (Academic Word List) y preguntas de inferencia.</li>
  <li>Listening: practica con grabaciones oficiales del TOEFL. No con cualquier podcast — el estilo del TOEFL es específico.</li>
  <li>Speaking: graba 2 respuestas por día. Escucha. Analiza la fluidez, la organización y si respondiste lo que preguntaron.</li>
  <li>Writing: escribe la tarea integrada completa tres veces por semana, variando el tema académico.</li>
</ul>
<h3>Semanas 6-9: simulacros completos</h3>
<ul>
  <li>Uno o dos simulacros completos por semana en condiciones cronometradas reales.</li>
  <li>Análisis detallado de errores. No avances sin entender por qué te equivocaste.</li>
</ul>
<h3>Semana 10: consolidación</h3>
<ul>
  <li>Repaso de los modelos de respuesta de Writing que te funcionaron.</li>
  <li>Práctica de Speaking cronometrado.</li>
  <li>Nada nuevo. Confirma la logística del examen.</li>
</ul>

<h2>Recursos gratuitos recomendados</h2>
<ul>
  <li><strong>ETS.org</strong>: simulacros y materiales oficiales. La fuente más confiable.</li>
  <li><strong>Magoosh TOEFL Blog</strong>: explicaciones de cada tipo de pregunta en inglés.</li>
  <li><strong>NoteFull YouTube</strong>: plantillas y estrategias de Speaking y Writing.</li>
  <li><strong><a href="/examenes/toefl">Simulacros WeLearn</a></strong>: banco de preguntas estilo TOEFL con retroalimentación automática por sección.</li>
</ul>
<p>Si buscas preparación guiada con tutor 1:1, puedes revisar cómo funciona nuestro programa de <a href="/clases-de-ingles">preparación para exámenes internacionales de inglés</a>.</p>
    `,
  },

  {
    slug: 'topik-1-preparacion-guia-para-principiantes',
    title: 'TOPIK I: cómo prepararlo desde cero y pasar al primer intento',
    description:
      'Guía completa del TOPIK I para hispanohablantes: qué evalúa, cómo se califica, materiales gratuitos y plan de estudio de 8 semanas para obtener el nivel 1 o 2.',
    date: '2026-05-22',
    readTime: 7,
    category: 'Coreano',
    tags: ['TOPIK', 'TOPIK I', 'coreano', 'examen coreano', 'Korea', 'certificación', 'principiantes'],
    body: `
<h2>¿Qué es el TOPIK I y por qué hacerlo?</h2>
<p>El TOPIK I (Test of Proficiency in Korean, nivel principiante-intermedio) es la certificación oficial de coreano del gobierno de Corea del Sur. Lo aplica el NIIED (National Institute for International Education) y se presenta en más de 70 países, incluyendo Colombia.</p>
<p>El TOPIK I cubre los niveles 1 y 2 del TOPIK (equivalentes aproximados a A1-A2 del MCER). No incluye escritura: solo Listening y Reading.</p>
<p>¿Para qué sirve tenerlo?</p>
<ul>
  <li><strong>Demostrar conocimiento certificado de coreano</strong> en tu CV o portafolio profesional.</li>
  <li><strong>Requisito previo para el TOPIK II</strong>: muchos aspirantes al Nivel 3 (necesario para becas GKS y universidades coreanas) empiezan demostrando con el I que tienen base sólida.</li>
  <li><strong>Aplicar a visas de trabajo básicas en Corea</strong>: algunos procesos aceptan TOPIK Nivel 2.</li>
  <li><strong>Motivación y estructura personal</strong>: preparar un examen real impone disciplina que el aprendizaje sin objetivo no tiene.</li>
</ul>

<h2>Estructura del TOPIK I</h2>
<p>El examen dura 100 minutos y tiene dos secciones:</p>
<ul>
  <li><strong>Listening (듣기) — 30 minutos, 30 preguntas</strong>: diálogos cortos, anuncios y conversaciones en coreano. Las grabaciones son claras y el vocabulario es cotidiano.</li>
  <li><strong>Reading (읽기) — 40 minutos, 40 preguntas</strong>: frases cortas, letreros, instrucciones sencillas, emails y textos breves. No requiere leer textos largos.</li>
</ul>
<p>El puntaje total va de 0 a 200 puntos:</p>
<ul>
  <li><strong>Nivel 1</strong>: 80 a 139 puntos. Puede comunicarse en coreano en situaciones básicas cotidianas.</li>
  <li><strong>Nivel 2</strong>: 140 a 200 puntos. Puede entender y comunicarse en contextos familiares y rutinarios con vocabulario ampliado.</li>
</ul>
<p>No existe puntaje de corte por sección: el total es lo que determina tu nivel.</p>

<h2>Vocabulario que necesitas para el TOPIK I</h2>
<p>Para el Nivel 1 necesitas dominar aproximadamente <strong>800 palabras</strong>. Para el Nivel 2, alrededor de <strong>1.500 a 2.000</strong>. Estas son las categorías prioritarias:</p>
<ul>
  <li>Saludos y presentaciones (안녕하세요, 감사합니다, 죄송합니다).</li>
  <li>Lugares (학교, 은행, 병원, 식당, 지하철).</li>
  <li>Tiempos y fechas (오늘, 어제, 내일, 월, 화, 수, 목, 금).</li>
  <li>Verbos cotidianos (가다, 오다, 먹다, 마시다, 사다, 공부하다).</li>
  <li>Números (sino-coreanos para cantidades y fechas, nativos para horas).</li>
  <li>Transporte, comida, tiempo atmosférico, trabajo básico.</li>
</ul>
<p>Un mazo de Anki con las 800 palabras más frecuentes del coreano cotidiano te cubre el Nivel 1. Para el Nivel 2 necesitas ampliar con vocabulario temático.</p>

<h2>Gramática esencial para el TOPIK I</h2>
<p>El TOPIK I no evalúa gramática en forma aislada, pero la gramática impregna todas las preguntas de lectura y escucha. Los patrones indispensables son:</p>
<ul>
  <li>Estructura SOV y partículas básicas: 은/는, 이/가, 을/를, 에, 에서, 와/과, 하고.</li>
  <li>Conjugación presente formal (-아요/어요) e informal (-아/어).</li>
  <li>Pasado (-았/었어요) y futuro (-ㄹ/을 거예요).</li>
  <li>Negación (안 + verbo, 못 + verbo).</li>
  <li>Expresiones de deseo (싶다), capacidad (수 있다/없다) y necesidad (해야 하다).</li>
  <li>Conectores básicos: 그리고, 그런데, 그래서, 하지만.</li>
</ul>

<h2>Plan de estudio de 8 semanas para TOPIK I Nivel 2</h2>
<h3>Semanas 1-2: Hangul + vocabulario de emergencia</h3>
<ul>
  <li>Si aún no dominas el Hangul: dedica la primera semana a leerlo y escribirlo con fluidez.</li>
  <li>Empieza con las primeras 200 palabras de frecuencia más alta.</li>
  <li>Escucha coreano cotidiano 15 minutos diarios (K-dramas para principiantes, Peppa Pig en coreano, etc.).</li>
</ul>
<h3>Semanas 3-5: gramática y vocabulario temático</h3>
<ul>
  <li>Estudia los patrones gramaticales del Nivel 1-2 de Talk to Me in Korean (lecciones gratuitas en su web).</li>
  <li>Amplía el vocabulario por temas: lugares, comida, transporte, salud.</li>
  <li>Practica dictado: escucha y escribe lo que entiendes. Mejora el Listening y el Hangul simultáneamente.</li>
</ul>
<h3>Semanas 6-7: simulacros TOPIK I</h3>
<ul>
  <li>Descarga exámenes anteriores del sitio oficial del TOPIK (topik.go.kr).</li>
  <li>Haz los últimos 3 exámenes completos en condiciones cronometradas.</li>
  <li>Analiza errores por tipo de pregunta (comprensión de conversaciones, comprensión de letreros, comprensión de textos cortos).</li>
</ul>
<h3>Semana 8: refuerzo y logística</h3>
<ul>
  <li>Repasa el vocabulario con el que más erraste.</li>
  <li>Practica las estrategias de eliminación en Reading.</li>
  <li>Confirma la sede del examen, documentos y horarios con semanas de anticipación (los cupos se agotan).</li>
</ul>

<h2>¿Dónde se presenta el TOPIK en Colombia?</h2>
<p>El TOPIK en Colombia generalmente se presenta en Bogotá, en la embajada de Corea o en alianza con universidades con departamento de estudios coreanos. Las convocatorias se abren una o dos veces por año. Sigue la página del NIIED y del Centro Cultural Coreano para las fechas.</p>
<p>Importante: inscríbete temprano. Los cupos en Colombia son limitados y suelen agotarse en días.</p>

<h2>¿Es el TOPIK I asequible para alguien que estudia solo?</h2>
<p>Sí — es uno de los exámenes de idiomas más asequibles de preparar de forma autónoma, por dos razones:</p>
<ol>
  <li>El material oficial está completamente disponible gratis en topik.go.kr (todos los exámenes anteriores con respuestas).</li>
  <li>El vocabulario y la gramática del Nivel 1-2 son limitados y sistemáticos. No hay ambigüedades.</li>
</ol>
<p>El mayor reto no es el contenido: es la constancia. El coreano requiere práctica diaria. Veinte días de estudio intensivo no reemplazan seis meses de trabajo regular. Si quieres un plan estructurado con tutor desde el primer día, conoce nuestras <a href="/clases-de-coreano">clases de coreano con preparación TOPIK</a> incluida.</p>
    `,
  },
  {
    slug: 'ielts-vs-toefl-cual-tomar-en-colombia',
    title: 'IELTS vs TOEFL en Colombia: ¿cuál es mejor para tu objetivo?',
    description:
      'Comparación completa entre IELTS y TOEFL iBT: diferencias de formato, puntajes, reconocimiento en universidades y cuál elegir según tu meta (migración, maestría o trabajo).',
    date: '2026-05-26',
    readTime: 8,
    category: 'IELTS',
    tags: ['IELTS', 'TOEFL', 'inglés', 'exámenes internacionales', 'migración', 'Colombia', 'comparación'],
    body: `
<h2>La pregunta que todos hacen primero</h2>
<p>Cada semana, decenas de colombianos buscan la misma respuesta: "¿IELTS o TOEFL?". Ambos exámenes certifican competencia en inglés para contextos académicos y profesionales. Pero no son intercambiables: su formato, su costo, su reconocimiento y sus exigencias técnicas son significativamente diferentes.</p>
<p>Esta guía te da la respuesta directa según tu objetivo específico.</p>

<h2>Diferencias fundamentales de formato</h2>
<table style="width: 100%; border-collapse: collapse; margin: 1.25rem 0;">
  <thead>
    <tr style="background: rgba(0,0,0,0.04);">
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">Aspecto</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">IELTS Academic</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">TOEFL iBT</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Duración total</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">2 h 45 min</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">~3 horas</td>
    </tr>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Speaking</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Cara a cara con examinador</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Frente al computador (grabado)</td>
    </tr>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Escala de puntaje</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">0–9 (bandas)</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">0–120 puntos</td>
    </tr>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Validez</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">2 años</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">2 años</td>
    </tr>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Costo aproximado en Colombia</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">~$750.000–$850.000 COP</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">~$800.000–$900.000 COP</td>
    </tr>
    <tr>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Sede en Colombia</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Bogotá, Medellín, Cali, Barranquilla, Bucaramanga</td>
      <td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Bogotá, Medellín, Cali (menos opciones)</td>
    </tr>
  </tbody>
</table>

<h2>¿Cuál elegir según tu objetivo?</h2>
<h3>Si quieres emigrar a Canadá, Australia o UK</h3>
<p><strong>IELTS General Training</strong> es la opción estándar. Los programas migratorios de estos países (Express Entry, Skilled Worker, etc.) aceptan o prefieren IELTS. El TOEFL también se acepta en muchos casos, pero IELTS tiene mayor reconocimiento en organismos migratorios.</p>

<h3>Si quieres hacer una maestría en EE.UU. o Canadá</h3>
<p><strong>TOEFL iBT</strong> es la opción natural. Las universidades norteamericanas, especialmente en EE.UU., lo desarrollaron y lo conocen mejor. También es requisito para la mayoría de becas Fulbright. Si la universidad destino acepta ambos (muchas lo hacen), revisa sus conversiones de puntaje antes de decidir.</p>

<h3>Si quieres hacer una maestría en Europa o Australia</h3>
<p><strong>IELTS Academic</strong>. Las universidades europeas y australianas conocen mejor la escala IELTS y muchas la prefieren o requieren explícitamente.</p>

<h3>Si vas a trabajar en una empresa multinacional en Colombia</h3>
<p>Ambos funcionan. Sin embargo, IELTS tiende a ser más reconocido en empresas con operaciones en Europa, y TOEFL en empresas con sede en EE.UU. Si el HR de tu empresa no tiene preferencia, elige el que te sea más cómodo en formato.</p>

<h2>La gran diferencia práctica: el Speaking</h2>
<p>Aquí está la diferencia que cambia el desempeño de la mayoría de candidatos:</p>
<ul>
  <li><strong>IELTS Speaking</strong>: entrevista de 11-14 minutos con un examinador humano en persona. Más natural para personas que se sienten cómodas conversando. Muchos lo encuentran menos intimidante porque es como una conversación.</li>
  <li><strong>TOEFL Speaking</strong>: 4 tareas grabadas frente a la pantalla. Sin contacto humano. Requiere hablar solo hacia un micrófono, a veces integrando lectura y audio en el mismo ejercicio. Muchos colombianos lo encuentran más difícil porque no hay retroalimentación visual del interlocutor.</li>
</ul>
<p><strong>Si hablar en inglés con personas te resulta más fácil que hablar solo:</strong> elige IELTS.<br />
<strong>Si el nerviosismo frente a un humano te bloquea:</strong> elige TOEFL.</p>

<h2>¿Cuál es más difícil?</h2>
<p>No hay un consenso absoluto. Depende de tus fortalezas:</p>
<ul>
  <li>El Reading del TOEFL es más largo y con textos más académicos que el IELTS en algunos sets.</li>
  <li>El Writing del IELTS Task 1 (describir un gráfico) no tiene equivalente en el TOEFL y puede sorprender a quienes no se preparan para él.</li>
  <li>El Listening del TOEFL integra lectura + audio (Listening + Reading integrado), lo cual es más complejo que las tareas separadas del IELTS.</li>
</ul>

<h2>Puntajes de referencia para las metas más comunes</h2>
<ul>
  <li><strong>Maestría en universidades top EE.UU.</strong>: TOEFL 100–110 / IELTS 7.0–7.5</li>
  <li><strong>Residencia permanente Canadá (Express Entry)</strong>: IELTS 6.0 general (mayor puntaje = más puntos CRS)</li>
  <li><strong>Visa de trabajo UK (Skilled Worker)</strong>: IELTS 4.0–5.5 según ocupación</li>
  <li><strong>Maestría en Europa</strong>: IELTS 6.5–7.0 según programa</li>
  <li><strong>Becas Fulbright Colombia</strong>: TOEFL 80+ / IELTS 6.5+</li>
</ul>

<h2>Mi recomendación final</h2>
<p>Si tienes un objetivo específico: sigue al destino, no al examen. Revisa los requisitos de la universidad o el programa migratorio al que aplicas y usa el puntaje que piden.</p>
<p>Si no tienes un objetivo definido aún y quieres "tener el examen listo": <strong>IELTS Academic</strong> tiene mayor reconocimiento global y más opciones de sede en Colombia. Es la apuesta más segura si no sabes todavía a dónde vas.</p>
<p>En cualquier caso, la preparación estructurada hace la diferencia. Puedes ver cómo abordamos ambos exámenes en nuestro programa de <a href="/clases-de-ingles">preparación para certificaciones de inglés</a>, o hacer un <a href="/examenes">simulacro gratuito de IELTS o TOEFL</a> para saber dónde estás ahora.</p>
    `,
  },
  {
    slug: 'ingles-para-trabajar-en-empresas-multinacionales',
    title: 'Inglés para trabajar en empresas multinacionales en Colombia: nivel, certificaciones y cómo lograrlo',
    description:
      'Qué nivel de inglés exigen Samsung, Deloitte, Accenture y otras multinacionales en Colombia, qué certificaciones tienen más peso y el plan realista para llegar ahí.',
    date: '2026-05-28',
    readTime: 8,
    category: 'IELTS',
    tags: ['inglés profesional', 'multinacionales', 'Colombia', 'IELTS', 'B2', 'trabajo', 'carrera'],
    body: `
<h2>La realidad del inglés en el mercado laboral colombiano</h2>
<p>Colombia tiene hoy más de 800 empresas multinacionales con operaciones activas, concentradas en Bogotá, Medellín, Cali y Bucaramanga. Samsung, Deloitte, Accenture, Nestlé, P&G, KPMG, Siemens, Amazon, Oracle y decenas más tienen equipos locales que trabajan en inglés a diario — con clientes, proveedores y colegas internacionales.</p>
<p>El problema: la mayoría de los profesionales colombianos subestiman el nivel real que se exige y sobreestiman el que tienen.</p>
<p>Según el EF English Proficiency Index, Colombia ocupa consistentemente posiciones en el nivel "Bajo" entre los países latinoamericanos evaluados. El resultado: el inglés se ha convertido en uno de los filtros más efectivos para acceder a los salarios más altos del mercado laboral formal.</p>

<h2>¿Qué nivel de inglés exigen realmente las multinacionales?</h2>
<p>La respuesta varía según el área y el nivel de seniority, pero estos son los estándares más comunes:</p>
<ul>
  <li><strong>Roles de entrada (Junior / Analista)</strong>: B1 funcional — leer documentos en inglés, escribir emails simples, entender instrucciones en inglés. El mínimo para muchos filtros de HR.</li>
  <li><strong>Roles de ejecución (Semi-senior / Consultor)</strong>: B2 sólido — reuniones en inglés con nativos, reportes en inglés, presentaciones a clientes internacionales. El nivel real de trabajo diario.</li>
  <li><strong>Roles de liderazgo (Senior / Manager / Director)</strong>: C1 — negociación, presentaciones ejecutivas, comunicación con C-level internacional. Aquí la fluidez sin esfuerzo se vuelve no negociable.</li>
</ul>
<p>El B2 es el umbral crítico. Es donde se concentra la mayor parte del mercado: suficiente para hacer el trabajo real, suficiente para no quedar fuera de una promoción, suficiente para que un recruiter no rechace tu perfil en los primeros treinta segundos.</p>

<h2>¿Qué certificaciones tienen más peso?</h2>
<p>En el entorno corporativo colombiano, las certificaciones de inglés funcionan de dos maneras: como filtro de entrada en los procesos de selección, y como credencial en el CV que abre conversaciones.</p>

<h3>IELTS Academic o IELTS General Training</h3>
<p>Es la certificación más reconocida globalmente y, por tanto, la que más abre puertas en multinacionales con operaciones en Europa, Asia y Oceanía (Nestlé, Unilever, SAP, Siemens). Un Band 7.0 equivale a C1 en el MCER y es señal clara de dominio profesional. Band 6.5 corresponde a B2 avanzado.</p>

<h3>TOEFL iBT</h3>
<p>Preferido por empresas con sede en EE.UU. (IBM, Oracle, Amazon, Accenture). Un puntaje de 90+ en el TOEFL iBT señala B2-C1. Si el destino de tu carrera es trabajar con clientes o socios norteamericanos, el TOEFL tiene más peso que el IELTS en ese contexto específico.</p>

<h3>Cambridge B2 First (FCE) o Cambridge C1 Advanced (CAE)</h3>
<p>Certificaciones del British Council altamente reconocidas en el sector financiero (banca, consultoría, seguros) y en industrias con fuerte presencia europea. No tienen fecha de vencimiento —son certificaciones permanentes, lo cual las hace convenientes para poner en el CV.</p>

<h3>¿Y el inglés "sin certificación"?</h3>
<p>En roles de entrada, muchas empresas hacen una prueba interna (Versant, ILEC Test, o una entrevista en inglés) en lugar de exigir certificación. Pero para roles de liderazgo y para procesos de selección competitivos, una certificación internacional elimina la ambigüedad —es una credencial verificable que ahorra tiempo al evaluador.</p>

<h2>Las habilidades que más diferencian en el entorno corporativo</h2>
<p>El inglés profesional no es solo gramática avanzada. Las áreas que más distinguen a los candidatos con experiencia corporativa son:</p>

<h3>Reuniones en inglés (Meetings English)</h3>
<p>Saber cómo tomar la palabra sin interrumpir abruptamente (<em>"If I may add..."</em>, <em>"Building on what you said..."</em>), cómo reformular lo que entendiste (<em>"So what you're saying is..."</em>) y cómo hacer preguntas de clarificación (<em>"Could you elaborate on...?"</em>) — estas micro-habilidades son invisibles en el aula pero determinantes en una reunión real con un cliente de Frankfurt o Chicago.</p>

<h3>Email profesional</h3>
<p>El email de trabajo tiene un registro muy específico: directo, cortés, orientado a la acción. Los errores más comunes de hispanohablantes son la traducción literal del español (demasiado formal y largo) y el uso excesivo de fórmulas de cortesía que en inglés suenan arcaicas. Un email bien escrito en inglés dice en tres líneas lo que el interlocutor necesita saber y qué acción se espera de él.</p>

<h3>Presentaciones y storytelling</h3>
<p>En inglés corporativo, las presentaciones siguen estructuras muy específicas (Situation–Complication–Resolution, o la estructura STAR para reportes de gestión). Saber armar y ejecutar estas estructuras en inglés es lo que diferencia a quien "se defiende en inglés" de quien realmente comunica.</p>

<h2>Plan realista para pasar de B1 a B2 trabajando</h2>
<p>Este es el escenario más común: profesional con inglés de colegio o universidad, puede leer y entender, pero se bloquea al hablar o escribir. Con una carga laboral de 8-10 horas diarias, el plan tiene que ser eficiente.</p>

<h3>Primeros 30 días: inmersión pasiva + diagnóstico</h3>
<ul>
  <li>Cambia el idioma de tu teléfono, laptop y aplicaciones de trabajo al inglés. Fricción diaria sin costo de tiempo.</li>
  <li>Escucha podcasts de tu industria en inglés durante el desplazamiento diario (Lex Fridman, HBR IdeaCast, McKinsey Global Institute). El oído se adapta más rápido cuando el contenido es relevante.</li>
  <li>Haz una prueba de nivel gratuita para saber dónde estás exactamente: B1 alto, B2 bajo, etc.</li>
</ul>

<h3>Meses 2–4: trabajo activo en producción</h3>
<ul>
  <li><strong>Escribe un párrafo en inglés cada día</strong>: resumen de la reunión del día, opinión sobre un artículo de tu industria, descripción de un proceso. El escribir regularmente consolida la gramática más que cualquier ejercicio descontextualizado.</li>
  <li><strong>Una clase de conversación 1:1 por semana</strong>: el bloqueo al hablar se resuelve hablando, no estudiando gramática. Cuarenta y cinco minutos semanales con un tutor que corrija en tiempo real avanzan más que dos horas de app.</li>
  <li><strong>Simulacros de presentaciones</strong>: practica en voz alta las presentaciones que harás en el trabajo, primero en español, luego en inglés.</li>
</ul>

<h3>Meses 5–6: certificación</h3>
<ul>
  <li>Con B2 consolidado, 6-8 semanas de preparación específica para el IELTS o TOEFL son suficientes para obtener una certificación que lo demuestre.</li>
  <li>La certificación no es el objetivo: el inglés funcional lo es. La certificación es la demostración verificable.</li>
</ul>

<h2>El ROI del inglés profesional en Colombia</h2>
<p>Los datos son concretos: según estudios del mercado laboral colombiano, un profesional con nivel B2 certificado gana en promedio entre 30% y 60% más que uno con el mismo perfil técnico pero sin inglés funcional, en sectores como consultoría, tecnología, banca y manufactura. En roles con reporte a matrices internacionales, la brecha es aún mayor.</p>
<p>No es un beneficio abstracto: el inglés en el entorno corporativo colombiano es una habilidad con retorno financiero directo y medible.</p>

<h2>Por dónde empezar</h2>
<p>Si ya estás en B1 y tu objetivo es llegar a B2 con orientación al mundo profesional, la ruta más eficiente combina trabajo en producción (hablar y escribir) con retroalimentación real de un tutor — no solo apps ni cursos grabados.</p>
<p>En WeLearn trabajamos inglés profesional con enfoque en el entorno corporativo latinoamericano: reuniones, presentaciones, emails y preparación para IELTS o TOEFL si lo necesitas. Puedes <a href="/clases-de-ingles">conocer cómo funcionan las clases de inglés</a> o hacer un <a href="/examenes">simulacro gratuito de IELTS</a> para ver tu nivel actual antes de decidir cualquier cosa.</p>
    `,
  },
  {
    slug: 'beca-gks-corea-del-sur-para-colombianos',
    title: 'Beca GKS de Corea del Sur para colombianos: requisitos, cómo aplicar y el rol del TOPIK',
    description:
      'Todo lo que necesitas saber sobre la Beca GKS del gobierno coreano: quién puede aplicar, qué cubre, qué nivel de TOPIK se requiere y cómo aumentar tus probabilidades desde Colombia.',
    date: '2026-05-29',
    readTime: 9,
    category: 'Coreano',
    tags: ['beca GKS', 'estudiar en Corea', 'TOPIK', 'coreano', 'Colombia', 'beca gobierno coreano', 'NIIED'],
    body: `
<h2>¿Qué es la Beca GKS y por qué importa?</h2>
<p>La Beca GKS (Global Korea Scholarship), también conocida como Beca KGSP, es el programa de becas del gobierno de Corea del Sur para estudiantes extranjeros. Es administrada por el NIIED (National Institute for International Education) bajo el Ministerio de Educación de Corea y es, sin duda, una de las becas más completas para estudiar en Asia.</p>
<p>Cada año, Colombia tiene un cupo asignado de becas a través de dos canales: la vía Embajada (Embassy Track) y la vía Universidad (University Track). Los colombianos que logran esta beca acceden a estudios en universidades coreanas de primer nivel —SKY (Seoul National University, Korea University, Yonsei University), KAIST, POSTECH y muchas más— con gastos casi completamente cubiertos.</p>

<h2>¿Qué cubre la Beca GKS?</h2>
<p>Esta es la razón por la que la GKS es tan buscada. A diferencia de becas parciales, la GKS cubre prácticamente todo:</p>
<ul>
  <li><strong>Tiquete de avión</strong>: ida a Corea al inicio del programa y regreso al terminar.</li>
  <li><strong>Matrícula completa</strong>: todos los semestres del programa de posgrado (maestría: 2 años, doctorado: 3 años) o pregrado (4 años).</li>
  <li><strong>Mensualidad de manutención</strong>: entre 900.000 y 1.100.000 won coreanos mensuales (equivalente a aproximadamente $600–750 USD). Cubre alojamiento y comida básica.</li>
  <li><strong>Seguro médico</strong>: cobertura durante toda la estadía.</li>
  <li><strong>Programa de coreano</strong>: un año de clases de idioma coreano antes del inicio del programa académico. La mayoría de becarios llegan sin coreano y aprenden durante este año preparatorio.</li>
  <li><strong>Beneficio adicional</strong>: si llegas con TOPIK Nivel 5 o superior, recibes un bono económico extra durante el año de idioma.</li>
</ul>
<p>Para un colombiano, esto significa estudiar gratis en una de las mejores universidades de Asia, con mensualidad incluida, en un país con altísima calidad de vida y seguridad. El valor de la beca por año supera los 30.000 USD.</p>

<h2>Requisitos para aplicar desde Colombia</h2>
<p>Los requisitos varían ligeramente según el nivel (pregrado vs. posgrado) y el track (Embajada vs. Universidad), pero los puntos comunes son:</p>

<h3>Requisitos generales</h3>
<ul>
  <li><strong>Nacionalidad</strong>: colombiana (no puedes tener ciudadanía coreana).</li>
  <li><strong>Edad</strong>: para pregrado, menor de 25 años al momento de la aplicación. Para posgrado, menor de 40 años.</li>
  <li><strong>Promedio académico</strong>: GPA mínimo de 2.64 sobre 4.0 (equivalente a aproximadamente 3.5 sobre 5 en Colombia). En la práctica, los seleccionados tienen promedios mucho más altos.</li>
  <li><strong>Salud</strong>: certificado médico oficial.</li>
  <li><strong>No ser ciudadano coreano</strong>: ni el solicitante ni sus padres.</li>
</ul>

<h3>Requisitos de idioma</h3>
<p>Este es el punto donde muchos colombianos tienen dudas. La respuesta directa: <strong>no es obligatorio llegar con coreano</strong>. El programa incluye un año de inmersión en coreano antes del programa académico.</p>
<p>Sin embargo:</p>
<ul>
  <li>Si presentas TOPIK Nivel 3 o superior al aplicar, aumentas significativamente tu perfil competitivo frente a otros candidatos.</li>
  <li>Si presentas TOPIK Nivel 5 o superior, recibes el bono adicional durante el año de idioma y puedes omitir el año preparatorio si el programa lo permite.</li>
  <li>No tener TOPIK no elimina tu candidatura, pero en un proceso altamente competitivo, tenerlo (incluso nivel 1 o 2) diferencia tu expediente.</li>
</ul>
<p>El requisito de inglés varía: algunas universidades exigen TOEFL 80+ o IELTS 6.0+ para los programas dictados en inglés. Para programas en coreano, el inglés es opcional.</p>

<h2>Los dos tracks de aplicación: Embassy vs. University</h2>
<h3>Embassy Track (Vía Embajada)</h3>
<p>La aplicación va directamente a través de la Embajada de Corea en Bogotá. El NIIED asigna a Colombia un número de cupos anual (generalmente entre 10 y 20 para todos los niveles). Tú postulas a la Embajada indicando tres universidades de preferencia, y si eres seleccionado, el NIIED asigna la universidad.</p>
<p><strong>Ventaja</strong>: puedes aplicar sin contacto previo con ninguna universidad coreana.<br />
<strong>Desventaja</strong>: la competencia es muy alta y la asignación de universidad no está garantizada.</p>

<h3>University Track (Vía Universidad)</h3>
<p>Contactas directamente con la universidad coreana que te interesa, que tiene cupos GKS propios asignados por el NIIED. Aplicas primero a la universidad, y si ella te selecciona, procesa tu beca con el NIIED.</p>
<p><strong>Ventaja</strong>: te asegura la universidad específica que quieres; el proceso es más directo con los departamentos.<br />
<strong>Desventaja</strong>: requiere contacto proactivo con la universidad y, en muchos casos, cartas de recomendación de profesores del departamento.</p>

<h2>Calendario aproximado del proceso</h2>
<p>Las fechas varían año a año, pero el ciclo general es:</p>
<ul>
  <li><strong>Septiembre – Octubre</strong>: el NIIED publica la convocatoria para el año siguiente. La Embajada de Corea en Colombia anuncia los detalles locales.</li>
  <li><strong>Octubre – Enero</strong>: período de aplicación. Reúnes y envías toda la documentación.</li>
  <li><strong>Febrero – Abril</strong>: evaluación de expedientes, entrevistas (en algunos casos).</li>
  <li><strong>Mayo – Junio</strong>: anuncio de seleccionados preliminares.</li>
  <li><strong>Agosto – Septiembre</strong>: llegada a Corea, inicio del año de idioma.</li>
</ul>
<p><strong>Importante</strong>: el TOPIK se presenta una o dos veces al año en Colombia (generalmente en abril y octubre). Si quieres tener TOPIK Nivel 3 para la próxima convocatoria, necesitas empezar a prepararte con suficiente anticipación.</p>

<h2>¿Cuán competitivo es el proceso?</h2>
<p>Muy. En el Embassy Track, los cupos para Colombia suelen ser escasos frente a la cantidad de aplicantes. Un perfil competitivo típico de seleccionado colombiano tiene:</p>
<ul>
  <li>GPA de 4.3/5.0 o superior.</li>
  <li>Experiencia de investigación o práctica relevante para el área de estudio.</li>
  <li>Al menos TOPIK Nivel 2 (Nivel 3 es mejor).</li>
  <li>Carta de motivación específica y precisa sobre el plan de estudios en Corea.</li>
  <li>Cartas de recomendación de profesores que conocen el trabajo del estudiante.</li>
  <li>Propuesta de investigación clara (para posgrado).</li>
</ul>

<h2>El rol del coreano en tu candidatura</h2>
<p>El punto que más subestiman los aplicantes colombianos: aprender coreano antes de aplicar no es solo una ventaja competitiva — es una señal al comité evaluador de que el compromiso es real.</p>
<p>Un evaluador del NIIED que lee dos expedientes similares en contenido académico, pero uno tiene TOPIK Nivel 2 y el otro no tiene ninguna evidencia de haber estudiado coreano, tiene un criterio de diferenciación muy claro: el que estudió coreano demuestra que planificó, se preparó y tiene conexión genuina con Corea.</p>
<p>Llegar con TOPIK Nivel 3 es aún más poderoso: significa que puedes comunicarte en coreano cotidiano, que el año de idioma será de consolidación y no de construcción desde cero, y que tu integración en la universidad será más efectiva.</p>

<h2>Por dónde empezar si quieres aplicar a la GKS</h2>
<ol>
  <li><strong>Define tu área de estudio</strong>: la GKS cubre casi todas las disciplinas. La carta de motivación y la propuesta deben ser específicas — no basta con "quiero estudiar en Corea".</li>
  <li><strong>Revisa las universidades que te interesan</strong>: el NIIED publica la lista de universidades participantes. Muchas tienen programas en inglés además de en coreano.</li>
  <li><strong>Empieza el coreano ahora</strong>: si la convocatoria es en octubre y hoy es mayo, tienes 5 meses para alcanzar TOPIK Nivel 1 o 2. Con preparación constante y un método estructurado, es completamente alcanzable.</li>
  <li><strong>Sigue a la Embajada de Corea en Colombia</strong>: en sus redes y sitio web anuncian las convocatorias con todos los detalles locales.</li>
  <li><strong>Prepara el inglés si el programa lo requiere</strong>: algunos programas son en inglés y exigen TOEFL o IELTS. Prepara los dos certificados en paralelo si puedes.</li>
</ol>

<h2>El camino empieza ahora</h2>
<p>La Beca GKS no es un sueño inalcanzable para colombianos. Es un proceso planificado. Y el coreano es el elemento que más puedes controlar desde hoy: no depende de tu historial académico pasado ni de tus cartas de recomendación — depende de que empieces a estudiarlo con método.</p>
<p>Si tu meta es llegar al TOPIK Nivel 3 para la próxima convocatoria GKS, necesitas un plan de 8 a 12 meses. Puedes <a href="/clases-de-coreano">conocer cómo funciona nuestro método de coreano</a> — diseñado específicamente para hispanohablantes con objetivos concretos como el TOPIK — o leer primero nuestra <a href="/blog/aprender-coreano-desde-cero-guia-colombia">guía completa para aprender coreano desde cero en Colombia</a>.</p>
    `,
  },
  {
    slug: 'aprender-idiomas-con-series-y-peliculas',
    title: 'Cómo aprender idiomas con series y películas: lo que funciona y lo que no',
    description:
      'La guía honesta sobre aprender idiomas con Netflix y K-dramas: qué funciona según la lingüística, cómo estructurar la práctica y por qué hacerlo sin método no da resultados.',
    date: '2026-05-29',
    readTime: 7,
    category: 'Coreano',
    tags: ['aprender idiomas', 'Netflix', 'K-dramas', 'input comprensible', 'inmersión', 'coreano', 'inglés'],
    body: `
<h2>El mito y la realidad de aprender con series</h2>
<p>Hay dos versiones de esta historia. La primera: "Me volví fluido en japonés viendo anime". La segunda: "Llevo dos años viendo K-dramas y todavía no entiendo nada". Ambas son reales, y la diferencia no está en las series — está en cómo las usas.</p>
<p>La investigación en adquisición de segundas lenguas tiene una respuesta clara: la exposición pasiva a contenido en el idioma objetivo produce resultados limitados por sí sola. La exposición <em>activa</em>, estructurada y comprensible, produce resultados extraordinarios. La serie o película es el material — no el método.</p>

<h2>Por qué el cerebro aprende idiomas con contenido audiovisual</h2>
<p>La teoría del input comprensible de Stephen Krashen, refinada por décadas de investigación posterior, establece que el idioma se adquiere cuando entendemos mensajes ligeramente por encima de nuestro nivel actual (i+1: comprensible, pero con algo nuevo). Las series crean las condiciones perfectas para esto:</p>
<ul>
  <li><strong>Contexto visual enriquecido</strong>: el lenguaje corporal, las expresiones faciales y los objetos en pantalla dan pistas del significado que no existen en el texto escrito.</li>
  <li><strong>Variedad de registros</strong>: las series mezclan lenguaje formal e informal, coloquial y técnico, dialectos y acentos.</li>
  <li><strong>Repetición contextualizada</strong>: los mismos personajes usan las mismas frases en múltiples episodios. La exposición repetida sin memorización forzada es la condición ideal para la adquisición.</li>
  <li><strong>Motivación intrínseca</strong>: si te engancha el drama, sigues. El interés genuino sostiene las horas de exposición necesarias para aprender.</li>
</ul>

<h2>Lo que sí funciona: el método activo con series</h2>
<h3>1. Subtítulos en el idioma que estás aprendiendo (no en español)</h3>
<p>Este es el cambio más importante y el más difícil de hacer. Los subtítulos en español te hacen leer español mientras escuchas el idioma objetivo — el cerebro toma el camino fácil y no procesa el idioma de la pantalla.</p>
<p>Los subtítulos en el idioma que aprendes obligan al cerebro a conectar el audio con el texto en ese idioma. Al principio es incómodo; en semanas, el oído empieza a separar sonidos y reconocer palabras.</p>
<p>Progresión recomendada: subtítulos en español (para entender el contenido) → subtítulos en el idioma objetivo → sin subtítulos.</p>

<h3>2. La pausa activa</h3>
<p>Cuando escuchas una frase interesante — una expresión que no conocías, una estructura que notas por primera vez — pausa. Repite en voz alta. Busca el significado si no lo intuyes. Escribe la frase en tu cuaderno o app de notas. Continúa.</p>
<p>No necesitas pausar en cada frase desconocida (eso haría la experiencia miserable). Escoge las que te resulten especialmente útiles o recurrentes.</p>

<h3>3. Shadowing</h3>
<p>Pausa en una línea de diálogo que te guste. Repite imitando exactamente la entonación, velocidad y ritmo del personaje — no solo las palabras. Este ejercicio, llamado shadowing, es uno de los métodos más efectivos para mejorar la pronunciación y la fluidez porque activa la memoria muscular del habla.</p>

<h3>4. El episodio doble</h3>
<p>Ve el mismo episodio dos veces seguidas. En el primer visionado: subtítulos en el idioma objetivo, disfruta la historia. En el segundo visionado: sin subtítulos, enfócate en el audio. La segunda vuelta es sorprendentemente diferente — entiendes mucho más porque ya conoces el contexto.</p>

<h3>5. Language Reactor (extensión Chrome)</h3>
<p>Esta extensión gratuita para Chrome convierte Netflix y YouTube en una herramienta de aprendizaje: muestra los subtítulos en dos idiomas simultáneamente, permite pausar al hacer clic en cualquier palabra para ver su definición, y guarda el vocabulario nuevo automáticamente para revisión posterior. Es el puente perfecto entre el entretenimiento pasivo y el aprendizaje activo.</p>

<h2>Lo que no funciona</h2>
<h3>Ver en español con audio original</h3>
<p>Si el audio es en español (doblado), no estás aprendiendo el idioma objetivo. Si el audio está en el idioma y los subtítulos en español, el cerebro lee español y el input del idioma objetivo queda en segundo plano. Parece útil — no lo es.</p>

<h3>Ver sin ningún nivel base</h3>
<p>Si tu nivel de coreano es cero, ver un K-drama sin ninguna base te enseñará muy poco. El input comprensible requiere que tengas al menos un nivel mínimo (A1) para que el cerebro pueda "anclar" el nuevo vocabulario a algo conocido. Las series son potentes a partir del nivel A2.</p>

<h3>Ver horas seguidas sin aplicar lo aprendido</h3>
<p>Cuatro horas de serie el fin de semana sin producción durante la semana produce resultados mínimos. El idioma se consolida cuando <em>usas</em> lo que aprendiste: conversación, escritura, notas en el idioma. Las series deben ser el insumo, no el único actividad.</p>

<h2>Las mejores series para aprender idiomas</h2>
<h3>Para aprender coreano</h3>
<ul>
  <li><strong>My Mister (나의 아저씨)</strong>: diálogos lentos y naturales, vocabulario cotidiano, sin jerga excesiva. Ideal para principiantes intermedios.</li>
  <li><strong>Reply 1988 (응답하라 1988)</strong>: lenguaje informal, coloquial, natural. Excelente para practicar el registro cotidiano.</li>
  <li><strong>Goblin (도깨비)</strong>: mezcla de lenguaje formal e informal. Vocabulario rico sin ser académico.</li>
  <li><strong>Running Man (YouTube)</strong>: para escucha de coreano conversacional rápido y coloquial.</li>
</ul>

<h3>Para aprender inglés</h3>
<ul>
  <li><strong>The Crown</strong>: inglés claro, articulado, con vocabulario rico y formal. Excelente para preparar IELTS.</li>
  <li><strong>Friends</strong>: inglés americano cotidiano, velocidad moderada, expresiones muy frecuentes. Clásico del aprendizaje.</li>
  <li><strong>Suits</strong>: inglés de negocios y legal. Perfecto para profesionales que necesitan inglés corporativo.</li>
  <li><strong>Breaking Bad</strong>: inglés americano variado, desde coloquial hasta técnico. Para nivel intermedio-avanzado.</li>
</ul>

<h3>Para aprender alemán</h3>
<ul>
  <li><strong>Dark (Dark)</strong>: alemán estándar, bien articulado, vocabulario variado. Tiene subtítulos oficiales de Netflix en alemán.</li>
  <li><strong>Babylon Berlin</strong>: alemán histórico con lenguaje colorido. Para nivel intermedio.</li>
</ul>

<h2>La integración con un método estructurado</h2>
<p>Las series funcionan como complemento, no como reemplazo, de un método estructurado. El rol de cada uno es claro:</p>
<ul>
  <li><strong>El método</strong> te da la gramática, el vocabulario base y la producción activa (hablar y escribir).</li>
  <li><strong>Las series</strong> te dan la exposición masiva, el oído para la pronunciación y la motivación para continuar.</li>
</ul>
<p>Los estudiantes que más avanzan hacen ambas cosas. Después de las clases, practican con material real — series, música, podcasts, libros. Las series sin clases producen comprensión pasiva. Las clases sin series producen conocimiento sin naturalidad. La combinación produce fluidez real.</p>
<p>Si quieres empezar con el coreano usando este método combinado, puedes revisar nuestro <a href="/clases-de-coreano">programa de coreano WeLearn</a> — diseñado específicamente para hispanohablantes que aprenden de contenido coreano. Para inglés con preparación para certificaciones, nuestro <a href="/clases-de-ingles">programa de inglés con IELTS y TOEFL</a> combina clases con práctica con material auténtico.</p>
    `,
  },
  {
    slug: 'niveles-de-ingles-a1-a2-b1-b2-c1-c2',
    title: 'Niveles de inglés A1, A2, B1, B2, C1 y C2: qué significa cada uno y para qué sirve',
    description:
      'Guía completa del Marco Común Europeo de Referencia (MCER): qué evalúa cada nivel, cómo saber en cuál estás y qué certificaciones corresponden a cada banda.',
    date: '2026-05-29',
    readTime: 7,
    category: 'IELTS',
    tags: ['niveles de inglés', 'MCER', 'B2', 'C1', 'IELTS', 'TOEFL', 'certificación', 'Colombia'],
    body: `
<h2>El sistema que todos usan pero pocos entienden bien</h2>
<p>Cuando alguien te dice "tengo inglés B2", ¿sabes exactamente qué puede hacer en inglés? ¿Y cuándo una oferta de trabajo dice "inglés C1 requerido", qué significa en la práctica?</p>
<p>El MCER (Marco Común Europeo de Referencia para las lenguas), desarrollado por el Consejo de Europa, es el estándar universal para describir el dominio de un idioma. Lo usan universidades, empleadores, programas migratorios y organismos de certificación en todo el mundo. Saber exactamente qué implica cada nivel no es solo académico: tiene consecuencias directas en qué puertas se abren y cuáles no.</p>

<h2>Los 6 niveles y qué puede hacer quien los tiene</h2>

<h3>A1 — Principiante</h3>
<p>Puede presentarse, saludar, hacer preguntas simples sobre temas familiares (nombre, edad, ciudad). Entiende frases muy cortas y habituales sobre necesidades básicas. En inglés: puede ordenar un café, preguntar dónde está el baño, decir su nombre y de dónde es.</p>
<p><strong>Para qué sirve</strong>: nada profesional ni académico. Es el punto de partida.</p>

<h3>A2 — Básico</h3>
<p>Puede comunicarse en situaciones cotidianas simples: compras, información personal, la vida diaria. Entiende frases directas sobre temas que le son familiares. Puede escribir mensajes cortos y sencillos.</p>
<p><strong>Para qué sirve</strong>: turismo muy básico. En Colombia, es el nivel promedio del ICFES Saber 11. No es suficiente para ningún requisito académico o laboral internacional.</p>

<h3>B1 — Intermedio</h3>
<p>Puede entender los puntos principales de textos en inglés estándar sobre temas conocidos (trabajo, escuela, tiempo libre). Puede describir experiencias, sueños y ambiciones, dar razones y explicaciones brevemente. Puede manejarse en la mayoría de situaciones de viaje.</p>
<p><strong>Para qué sirve</strong>: comunicación funcional en inglés. Mínimo para algunas posiciones laborales de entrada en empresas internacionales. Nivel de entrada para preparar el ICFES inglés hacia B2.</p>

<h3>B2 — Intermedio alto</h3>
<p>Puede entender textos complejos sobre temas concretos y abstractos. Se comunica con fluidez y espontaneidad en interacciones con hablantes nativos. Puede producir textos claros y detallados sobre muchos temas y explicar un punto de vista.</p>
<p><strong>Para qué sirve</strong>: el nivel de trabajo real en empresas multinacionales, el mínimo competitivo en procesos de selección corporativos. Equivale aproximadamente a IELTS Band 5.5–6.5 o TOEFL 72–94. Puntaje B2 en el ICFES (81–100) te pone en el top 10% en Colombia.</p>

<h3>C1 — Avanzado</h3>
<p>Puede entender textos largos y exigentes, y reconocer su sentido implícito. Se expresa de forma espontánea, fluida y precisa, distinguiendo matices de significado incluso en situaciones complejas. Produce textos claros, bien estructurados y detallados sobre temas complejos.</p>
<p><strong>Para qué sirve</strong>: trabajo en inglés como lingua franca en entornos altamente exigentes (consultoría internacional, academia, C-level multinacional). Equivalent a IELTS 7.0–8.0 o TOEFL 95–110. Necesario para la mayoría de programas de maestría en universidades top anglófonas.</p>

<h3>C2 — Maestría / Dominio pleno</h3>
<p>Puede entender con facilidad prácticamente todo lo que lee u oye. Resume información de diferentes fuentes de forma coherente. Se expresa espontáneamente con mucha fluidez y precisión, diferenciando matices de significado en situaciones complejas.</p>
<p><strong>Para qué sirve</strong>: trabajo académico de alto nivel en inglés, docencia en inglés, traducción profesional. Equivale a IELTS 8.5–9.0 o TOEFL 110–120. Es el nivel de un hablante casi nativo.</p>

<h2>¿Cómo saber en qué nivel estás?</h2>
<p>La única forma confiable de saber tu nivel real es un test bien calibrado. Hay cuatro opciones según tu objetivo:</p>
<ol>
  <li><strong>Test interno WeLearn</strong>: si quieres una evaluación con retroalimentación de un tutor, la clase de diagnóstico gratuita te da una evaluación honesta de tu nivel en 45 minutos.</li>
  <li><strong>Simulacro oficial</strong>: Cambridge tiene tests gratuitos de ubicación. El ETS (TOEFL) tiene una prueba de práctica. Son menos precisos para niveles medios-altos.</li>
  <li><strong>Examen oficial</strong>: IELTS, TOEFL, Cambridge First (B2) o Cambridge Advanced (C1) son los más reconocidos y dan un resultado certificado, verificable y válido por 2 años (IELTS/TOEFL) o de forma permanente (Cambridge).</li>
  <li><strong>Test en línea gratuito</strong>: British Council, EF English Level Test. Dan una idea general pero no son verificables.</li>
</ol>

<h2>La tabla de equivalencias entre niveles y exámenes</h2>
<table style="width: 100%; border-collapse: collapse; margin: 1.25rem 0;">
  <thead>
    <tr style="background: rgba(0,0,0,0.04);">
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">MCER</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">IELTS</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">TOEFL iBT</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">Cambridge</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">A1</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">A2</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">—</td></tr>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">B1</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">4.0 – 5.0</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">42 – 71</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">PET / B1 Preliminary</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">B2</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">5.5 – 6.5</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">72 – 94</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">FCE / B2 First</td></tr>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">C1</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">7.0 – 8.0</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">95 – 110</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">CAE / C1 Advanced</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">C2</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">8.5 – 9.0</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">110 – 120</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">CPE / C2 Proficiency</td></tr>
  </tbody>
</table>

<h2>El nivel que más importa en Colombia: B2</h2>
<p>Si tuviéramos que elegir un único nivel como el umbral que transforma las opciones profesionales y académicas de un colombiano, es el B2.</p>
<p>¿Por qué B2 y no C1 o C2?</p>
<ul>
  <li>La mayoría de requisitos laborales en multinacionales con sede en Colombia exigen B2 como mínimo funcional (no solo para "comunicarse" sino para trabajar realmente en inglés).</li>
  <li>Las mejores universidades colombianas y la mayoría de programas de maestría en Latinoamérica piden B2 para admisión.</li>
  <li>IELTS Band 6.0–6.5 (equivalente B2) es el mínimo para la mayoría de visas de trabajo y estudio en el mundo angloparlante.</li>
  <li>El B2 es alcanzable: desde un B1 sólido, 6 a 12 meses de preparación estructurada con tutor son suficientes para la mayoría de personas.</li>
</ul>
<p>El C1 es el nivel que diferencia al bilingüe del avanzado — es el objetivo de quien quiere trabajar en una empresa global donde el inglés es el idioma de reuniones, reportes y negociaciones. Es un año o dos adicionales de trabajo desde el B2.</p>

<h2>¿Cómo pasar de tu nivel actual al siguiente?</h2>
<p>La ruta más eficiente depende de dónde estás:</p>
<ul>
  <li><strong>A2 → B1</strong>: 6–9 meses con exposición diaria (lectura, audio) + clases semanales. Base gramatical y vocabulario de alta frecuencia.</li>
  <li><strong>B1 → B2</strong>: 9–12 meses. Aquí la brecha se ensancha: necesitas producción activa (hablar y escribir), no solo comprensión. Un tutor que da retroalimentación real acelera significativamente este paso.</li>
  <li><strong>B2 → C1</strong>: 12–18 meses. Matices, vocabulario académico, fluidez sin esfuerzo. Preparación para exámenes como IELTS 7.0+ o TOEFL 95+.</li>
</ul>
<p>Si ya sabes tu nivel y quieres un plan concreto para subir al siguiente, puedes <a href="/clases-de-ingles">conocer cómo funcionan las clases de inglés en WeLearn</a> — el primer paso es una clase de diagnóstico gratis donde evaluamos tu nivel real y diseñamos el plan. También puedes hacer un <a href="/examenes">simulacro de IELTS gratuito</a> para tener un punto de referencia concreto hoy mismo.</p>
    `,
  },
  {
    slug: 'como-mejorar-el-ingles-hablado',
    title: 'Cómo mejorar el inglés hablado: por qué te bloqueas al hablar y cómo superarlo',
    description:
      'La guía honesta para hispanohablantes que entienden inglés pero se bloquean al hablarlo. Por qué ocurre el bloqueo, qué no funciona y los ejercicios específicos que sí ayudan.',
    date: '2026-05-29',
    readTime: 8,
    category: 'IELTS',
    tags: ['inglés conversacional', 'hablar inglés', 'fluidez', 'bloqueo al hablar', 'IELTS Speaking', 'Colombia'],
    body: `
<h2>El problema que nadie resuelve bien</h2>
<p>Llevas años estudiando inglés. Puedes leer artículos en inglés, entender series con subtítulos, aprobar exámenes escritos. Pero cuando alguien te habla en inglés, o cuando tienes que decir algo en una reunión de trabajo, algo se congela.</p>
<p>No estás solo: es el problema más frecuente entre hispanohablantes que aprenden inglés. Se llama de muchas formas — "bloqueo al hablar", "inhibición lingüística", "acento forzado" — pero tiene causas concretas y soluciones igual de concretas.</p>

<h2>Por qué ocurre el bloqueo: las causas reales</h2>
<h3>1. Conocimiento declarativo vs. conocimiento procedimental</h3>
<p>Saber que en inglés el verbo va después del sujeto ("I go", no "Go I") es conocimiento declarativo — lo sabes de manera consciente. Poder decirlo sin pensar en ello mientras mantienes una conversación es conocimiento procedimental — está automatizado.</p>
<p>La mayoría de hispanohablantes que estudiaron inglés en el colegio o con aplicaciones tienen abundante conocimiento declarativo (reglas que saben) y escaso conocimiento procedimental (habilidades automatizadas). Al hablar, el cerebro intenta ejecutar en tiempo real lo que aprendió como reglas abstractas, y eso genera la sensación de parálisis.</p>

<h3>2. El cerebro está procesando demasiado simultáneamente</h3>
<p>Cuando hablas tu idioma nativo, no piensas en la gramática. Piensas en lo que quieres comunicar y las palabras salen. Cuando hablas inglés sin fluidez, el cerebro intenta hacer cuatro cosas al mismo tiempo: recordar la gramática correcta, buscar el vocabulario, organizar las ideas y pronunciar. Es cognitivamente agotador y produce frases entrecortadas, silencios incómodos o directamente el "I cannot speak".</p>

<h3>3. El miedo al error en público</h3>
<p>En Colombia, la educación en inglés suele penalizar el error. El resultado: muchos hablantes de nivel B1–B2 prefieren no hablar a cometer un error. Esta inhibición es el mayor freno al desarrollo de la fluidez. La ironía: el único camino a la fluidez es atravesar miles de errores.</p>

<h2>Lo que no funciona para mejorar el inglés hablado</h2>
<h3>Estudiar más gramática</h3>
<p>Si tu problema es que te bloqueas al hablar, estudiar más la diferencia entre el present perfect y el past simple no te va a desbloquear. Tu cerebro ya sabe la gramática — el problema es que no la tiene automatizada. Más gramática consciente no resuelve la falta de gramática automática.</p>

<h3>Escuchar más pasivamente</h3>
<p>Escuchar inglés (podcasts, series, música) es excelente para el oído y la comprensión. Pero no mejora la producción. Necesitas hablar para hablar. La escucha pasiva es necesaria pero no suficiente para el Speaking.</p>

<h3>Esperar a tener el nivel "correcto"</h3>
<p>"Cuando llegue a B2 empiezo a hablar". Este es el error más costoso de tiempo. La fluidez no se obtiene llegando a un nivel — se obtiene practicando en el nivel en que estás. Alguien que habla con errores en B1 desarrolla fluidez; alguien que espera a tener gramática perfecta en B2 para empezar a hablar no la desarrolla nunca.</p>

<h2>Lo que sí funciona: ejercicios específicos para el Speaking</h2>
<h3>1. Hablar solo (self-talk)</h3>
<p>Uno de los métodos más efectivos y menos costosos: habla solo en inglés durante 5–10 minutos al día. Describe lo que estás haciendo, comenta tu día, opina sobre algo que viste. Al principio se siente raro; en semanas, el flujo de palabras mejora notablemente.</p>
<p>El autoaprendizaje no corrige errores, pero automatiza el proceso de producir inglés bajo cero presión social. Eso reduce la carga cognitiva cuando luego hablas con otras personas.</p>

<h3>2. Shadowing con grabación propia</h3>
<p>Elige una línea de diálogo de una serie o podcast. Escúchala. Luego repítela en voz alta, imitando la entonación, el ritmo y la velocidad del hablante original. Grábate. Escucha la grabación. Identifica qué suena diferente del original.</p>
<p>El shadowing automatiza patrones fonéticos y rítmicos que el cerebro no adquiere estudiando reglas. Después de semanas de práctica constante, esos patrones empiezan a salir solos al hablar.</p>

<h3>3. El método de los monólogos de 60 segundos</h3>
<p>Elige un tema. Pon un timer de 60 segundos. Habla en inglés sin parar durante ese minuto. No corrijas, no pares, no empieces de nuevo. Solo habla. Al terminar, escucha la grabación e identifica los patrones de error (palabras que no encontraste, pausas largas, estructuras incorrectas).</p>
<p>Repite con el mismo tema al día siguiente. El cerebro buscará las palabras que le faltaron la vez anterior. Después de 5 veces con el mismo tema, hablas sobre él sin esfuerzo.</p>

<h3>4. Conversación con un interlocutor que corrija en tiempo real</h3>
<p>El self-talk y el shadowing son complementos, no reemplazos, de la conversación real. La diferencia clave del hablar con otra persona es la retroalimentación: alguien que note cuando dices "I am very hot" cuando quieres decir que hace calor (no que eres atractivo) y que te corrija con naturalidad.</p>
<p>Esta corrección en tiempo real, en contexto de uso real, es lo que más acelera la automatización de la gramática. Es por eso que las clases 1:1 con un tutor que da retroalimentación específica avanzan mucho más que la práctica autodidacta sola.</p>

<h3>5. Preparar respuestas a preguntas frecuentes</h3>
<p>En el IELTS Speaking o en una entrevista de trabajo en inglés, hay preguntas que siempre aparecen: "Tell me about yourself", "What do you do for work?", "What are your goals?". Tener respuestas elaboradas y practicadas para estas preguntas no es memorizar — es tener anclas de fluidez que reduzcan la carga cognitiva cuando el nerviosismo aumenta.</p>

<h2>Cuánto tiempo lleva ver resultados</h2>
<p>Con práctica activa de Speaking (20–30 minutos diarios entre self-talk, shadowing y conversación), la mayoría de personas en nivel B1 notan cambios claros en 4–6 semanas. No fluidez total — pero sí conversaciones más cómodas, menos pausas largas, más palabras disponibles cuando se necesitan.</p>
<p>La fluidez real (conversar sin esfuerzo consciente) tarda entre 6 meses y 2 años dependiendo de la cantidad y calidad de práctica. No hay atajos — hay práctica frecuente, retroalimentación real y tolerancia productiva al error.</p>

<h2>El rol del IELTS Speaking en este proceso</h2>
<p>Si uno de tus objetivos es el IELTS, la sección de Speaking es la que más se beneficia de este tipo de práctica — y la más subestimada. El error más común: prepararse intensamente para Listening, Reading y Writing, y abordar Speaking la semana anterior al examen.</p>
<p>La sección de Speaking del IELTS tiene 3 partes: una conversación personal (Part 1), un monólogo de 2 minutos sobre un tema dado (Part 2) y una discusión más profunda sobre ese tema (Part 3). La fluidez, la coherencia y el vocabulario en contexto son los criterios que más diferencian un Band 6 de un Band 7.</p>
<p>Si quieres trabajar específicamente la sección de Speaking del IELTS o mejorar el inglés hablado para el trabajo, puedes <a href="/clases-de-ingles">conocer cómo funcionamos en WeLearn</a> — las clases 1:1 incluyen práctica de producción con retroalimentación en cada sesión.</p>
    `,
  },
  {
    slug: 'ielts-academic-vs-general-training',
    title: 'IELTS Academic vs General Training: cuál debes tomar según tu objetivo',
    description:
      'La diferencia entre IELTS Academic y General Training es más importante de lo que parece. Elegir el módulo equivocado puede invalidar tu resultado. Aquí la guía definitiva para colombianos.',
    date: '2026-05-29',
    readTime: 7,
    category: 'IELTS',
    tags: ['IELTS Academic', 'IELTS General Training', 'diferencia', 'migración', 'universidad', 'Colombia'],
    body: `
<h2>El error que invalida meses de preparación</h2>
<p>Cada año, cientos de colombianos presentan el IELTS y descubren después que tomaron el módulo equivocado. Una universidad en Canadá rechaza su aplicación porque enviaron el resultado de General Training, no de Academic. O alguien aplica para residencia permanente en Australia con un Academic cuando el proceso migratorio acepta cualquiera, pero el Academic tiene mayor dificultad innecesaria para ese trámite.</p>
<p>La diferencia entre IELTS Academic e IELTS General Training no es de nivel de dificultad en términos absolutos — es de propósito, contenido y a qué puertas abre cada uno. Entenderla bien antes de inscribirte puede ahorrarte meses de preparación y cientos de dólares en exámenes repetidos.</p>

<h2>Qué tienen en común ambos módulos</h2>
<p>Antes de ver las diferencias, lo que es igual en los dos:</p>
<ul>
  <li><strong>Listening</strong> (40 minutos): exactamente igual en Academic y General. 4 grabaciones, 40 preguntas. Sin diferencia de dificultad.</li>
  <li><strong>Speaking</strong> (11–14 minutos): exactamente igual. Entrevista cara a cara en 3 partes. Sin diferencia.</li>
  <li><strong>Escala de puntaje</strong>: mismo sistema de Bands del 0 al 9, con medios puntos (6.5, 7.5, etc.).</li>
  <li><strong>Validez</strong>: 2 años para ambos.</li>
  <li><strong>Precio</strong>: igual (~$330.000–$380.000 COP según el centro de examinación).</li>
</ul>

<h2>Dónde difieren: Reading y Writing</h2>
<h3>Reading: el mayor contraste</h3>
<p><strong>Academic</strong>: 3 textos académicos largos y complejos (de revistas científicas, publicaciones académicas, libros especializados). Vocabulario técnico, argumentación abstracta, alta densidad de información. Es la sección que más diferencia al Academic del General.</p>
<p><strong>General Training</strong>: 3 secciones con textos más cortos y de uso cotidiano: avisos, anuncios, cartas, extractos de libros de texto, artículos de revistas generales. Menor complejidad léxica. La mayoría de personas con buen inglés cotidiano encuentran el Reading del General más manejable.</p>
<p><em>Consecuencia práctica</em>: si presentas Academic con el mismo tiempo de preparación que General, probablemente obtienes 0.5–1 Band menos en Reading.</p>

<h3>Writing: matices importantes</h3>
<p><strong>Academic Task 1</strong>: describes e interpretas un gráfico, diagrama, mapa o proceso. Lenguaje académico, estructuras formales, vocabulario de análisis visual.</p>
<p><strong>General Training Task 1</strong>: escribes una carta — formal, semiformal o informal — respondiendo a una situación dada (quejarse con una empresa, solicitar información, escribirle a un amigo).</p>
<p><strong>Task 2</strong>: el ensayo argumentativo es igual en ambos en estructura, pero los temas del Academic tienden a ser más abstractos ("Technology is changing the nature of work. To what extent do you agree or disagree?") mientras que los del General son más cotidianos ("Many people believe that everyone should have access to the internet for free. Do you agree or disagree?").</p>

<h2>La guía rápida: cuál tomar según tu objetivo</h2>
<table style="width: 100%; border-collapse: collapse; margin: 1.25rem 0;">
  <thead>
    <tr style="background: rgba(0,0,0,0.04);">
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">Objetivo</th>
      <th style="padding: 10px 14px; text-align: left; border: 1px solid #e5e7eb; font-size: 0.88rem;">Módulo</th>
    </tr>
  </thead>
  <tbody>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Universidad de pregrado o postgrado en UK, Canadá, Australia, EE.UU., Irlanda</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700; color: #1a4fcc;">Academic</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Residencia permanente o permiso de trabajo en Canadá (Express Entry, PNP)</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700; color: #1a6e3c;">General Training</td></tr>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Visa de trabajo o residencia en Australia (Subclass 189, 190, etc.)</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700; color: #1a6e3c;">General Training</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Visa de trabajo o residencia en UK (Skilled Worker Visa)</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700;">Academic o General*</td></tr>
    <tr><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Membresía en colegios profesionales (enfermería, medicina, arquitectura en UK/Australia)</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700; color: #1a4fcc;">Academic (generalmente)</td></tr>
    <tr style="background: rgba(0,0,0,0.02);"><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem;">Certificación personal de nivel de inglés (para mostrar en el trabajo)</td><td style="padding: 9px 14px; border: 1px solid #e5e7eb; font-size: 0.86rem; font-weight: 700;">Cualquiera</td></tr>
  </tbody>
</table>
<p style="font-size: 0.82rem; color: #888;">* Para la UK Skilled Worker Visa, verificar los requisitos del empleador específico. Muchos aceptan ambos; posiciones académicas suelen exigir Academic.</p>

<h2>¿Y si no estoy seguro de cuál necesito?</h2>
<p>La respuesta corta: verifica la convocatoria específica a la que vas a aplicar. Cada universidad, cada proceso migratorio y cada colegios profesional indica explícitamente qué módulo acepta. Nunca asumas.</p>
<p>Si tienes un objetivo claro pero no sabes cuál módulo requiere, o si quieres prepararte para el IELTS con una estrategia específica para Academic o General Training, puedes <a href="/clases-de-ingles">agendar una clase de diagnóstico gratis en WeLearn</a> — en esa sesión revisamos tu objetivo, te orientamos sobre qué módulo necesitas y diseñamos el plan de preparación más eficiente.</p>
<p>Y si quieres practicar antes con un simulacro gratuito, puedes <a href="/examenes/ielts">hacer el simulacro de IELTS</a> en nuestra plataforma.</p>
    `,
  },
  {
    slug: 'como-prepararse-para-el-ielts-en-3-meses',
    title: 'Cómo prepararse para el IELTS en 3 meses: plan semana a semana',
    description:
      'Plan de preparación de 12 semanas para el IELTS desde nivel B1. Incluye distribución de tiempo por sección, recursos recomendados y los errores más comunes que cuestan medio Band.',
    date: '2026-05-30',
    readTime: 10,
    category: 'IELTS',
    tags: ['preparación IELTS', 'plan de estudio IELTS', '3 meses', 'Band 7', 'Colombia', 'IELTS Speaking', 'IELTS Writing'],
    body: `
<h2>¿Es posible preparar el IELTS en 3 meses?</h2>
<p>Sí — con condiciones. Si partes de un nivel B1 sólido (puedes tener conversaciones básicas, entiendes textos simples en inglés, tienes gramática del presente, pasado y futuro) y dedicas entre 1 y 1.5 horas diarias de práctica activa, 12 semanas son suficientes para alcanzar Band 6.5–7.0.</p>
<p>Si tu punto de partida es A2 o menos, 3 meses no es suficiente para el IELTS — necesitarás primero 6–9 meses de trabajo en el nivel general del idioma. Si tu nivel es B2 sólido, 6–8 semanas intensivas pueden ser suficientes.</p>
<p>Este plan asume nivel B1 de partida y objetivo Band 6.5–7.0.</p>

<h2>Principios que guían este plan</h2>
<ol>
  <li><strong>Practicar en formato examen desde la primera semana</strong>. Conocer el formato del IELTS es la primera capa de preparación; sin ella, pierdes Bands por desconocer las instrucciones, no por falta de inglés.</li>
  <li><strong>Reading y Writing son las secciones donde más se gana o se pierde</strong>. La mayoría de colombianos tiene niveles de Listening y Speaking más uniformes. La diferencia entre Band 6 y Band 7 suele estar en Writing Task 2 y en la velocidad y estrategia de Reading.</li>
  <li><strong>Speaking requiere práctica activa, no solo estudio pasivo</strong>. Leer sobre técnicas de Speaking no mejora tu Speaking. Hablar lo mejora.</li>
  <li><strong>Una semana de simulacro completo antes del examen</strong>. Las condiciones de tiempo real del examen son parte de la preparación — no practicarlas es un error costoso.</li>
</ol>

<h2>El plan semana a semana</h2>

<h3>Semanas 1–2: Diagnóstico y familiarización</h3>
<p><strong>Objetivos</strong>: saber exactamente en qué nivel estás, conocer el formato de cada sección, identificar tus secciones débiles.</p>
<ul>
  <li>Haz un simulacro completo en condiciones reales (con timer). Anota tu Band estimado en cada sección.</li>
  <li>Estudia las instrucciones y el tiempo asignado a cada sección. Memoriza el número de preguntas, el tipo de respuesta y los formatos de Writing.</li>
  <li>Lee los descriptores de banda del IELTS (disponibles en el sitio oficial de British Council/IDP) para Writing y Speaking: entiende qué se califica y con qué criterios.</li>
  <li>Tiempo diario: 45–60 minutos.</li>
</ul>

<h3>Semanas 3–5: Fundamentos por sección</h3>
<p><strong>Objetivos</strong>: construir estrategias específicas para Reading, Writing y Listening.</p>
<p><em>Reading (20 min/día)</em>:</p>
<ul>
  <li>Practica skimming (leer para idea general) y scanning (buscar información específica) — no leer de inicio a fin.</li>
  <li>Haz al menos 1 texto completo con timer al día.</li>
  <li>Estudia los tipos de pregunta: True/False/Not Given, Matching Headings, Sentence Completion. Cada tipo tiene una estrategia diferente.</li>
</ul>
<p><em>Writing (20 min/día)</em>:</p>
<ul>
  <li>Escribe 2 Task 2 por semana. Usa el tiempo real (40 minutos). Revisa contra la rúbrica.</li>
  <li>Estudia la estructura del ensayo argumentativo: intro (parafraseo + tesis) → dos párrafos de argumento (idea + desarrollo + ejemplo) → conclusión (reafirmar tesis, no solo resumir).</li>
  <li>Aprende 15–20 frases conectoras y de transición: "Furthermore", "In contrast", "This suggests that", "It can be argued that".</li>
</ul>
<p><em>Speaking (15 min/día)</em>:</p>
<ul>
  <li>Practica Part 1 (preguntas personales) con respuestas de 2–3 oraciones, no monosílabos.</li>
  <li>Grábate. Escucha. Identifica palabras en las que te bloqueas.</li>
</ul>
<p><em>Listening (15 min/día)</em>:</p>
<ul>
  <li>1 sección de Listening con el audio real (sin pausas). Verifica respuestas. Vuelve a escuchar las partes incorrectas.</li>
</ul>

<h3>Semanas 6–8: Profundización y corrección de errores</h3>
<p><strong>Objetivos</strong>: corregir los patrones de error identificados en la fase anterior, aumentar velocidad en Reading, mejorar coherencia en Writing.</p>
<ul>
  <li>Haz 2 simulacros parciales (solo Reading o solo Writing) con cronómetro cada semana.</li>
  <li>Writing Task 2: empieza a trabajar el léxico por área temática. Los temas más frecuentes son: educación, tecnología, medioambiente, trabajo, salud, globalización. Aprende vocabulario específico de cada área.</li>
  <li>Speaking Part 2 (monólogo de 2 minutos): practica con un tema diferente cada día. Usa el minuto de preparación para hacer un esquema mental rápido: punto de vista + 2 argumentos + ejemplo.</li>
  <li>Tiempo diario: 60–75 minutos.</li>
</ul>

<h3>Semanas 9–11: Simulacros y ajuste fino</h3>
<p><strong>Objetivos</strong>: consolidar, hacer simulacros completos, identificar últimos puntos débiles.</p>
<ul>
  <li>1 simulacro completo (4 secciones + Speaking) por semana, en condiciones reales.</li>
  <li>Después de cada simulacro: análisis detallado de errores. ¿Fue por tiempo? ¿Por vocabulario? ¿Por estrategia? Cada tipo de error requiere una corrección diferente.</li>
  <li>Writing: pide retroalimentación externa en al menos 2–3 ensayos. La autocorrección tiene límites — un corrector externo con experiencia en IELTS puede darte el feedback específico que necesitas.</li>
  <li>Speaking Part 3: practica discutir temas abstractos. "How do you think technology will change education in the next 20 years?" — necesitas opinión + argumento + especulación sobre el futuro.</li>
</ul>

<h3>Semana 12: Preparación final</h3>
<p><strong>Objetivos</strong>: llegar al examen sin ansiedad y con la estrategia clara.</p>
<ul>
  <li>Lunes–miércoles: repaso de estrategias por sección (no nuevo material).</li>
  <li>Jueves: simulacro completo en las condiciones más parecidas posibles al día del examen.</li>
  <li>Viernes: descanso activo. Lee un texto en inglés que te guste. Conversa en inglés si puedes.</li>
  <li>El día anterior: revisa tus notas de estrategia de cada sección, come bien, duerme bien. No estudies material nuevo.</li>
</ul>

<h2>Los errores que cuestan 0.5–1 Band</h2>
<ol>
  <li><strong>Writing Task 2: no responder la pregunta</strong>. Escribe 300 palabras brillantes sobre un tema relacionado pero diferente al que preguntaron → Band 5 en Task Achievement automáticamente.</li>
  <li><strong>Reading: leer el texto completo antes de las preguntas</strong>. Con 60 minutos para 40 preguntas y 3 textos, no hay tiempo para leer todo. Debes ir a las preguntas primero y buscar la información en el texto.</li>
  <li><strong>Listening: perder el hilo y no recuperarse</strong>. Si pierdes una respuesta, suéltala y sigue. Quedarse atascado hace que pierdas las siguientes 2 o 3 respuestas.</li>
  <li><strong>Speaking: respuestas de una sola oración</strong>. "Do you like cooking?" "Yes." → Band 4. "Yes, I actually enjoy cooking. I find it relaxing after a long day. I usually cook simple things like pasta or rice, but lately I've been trying to learn more traditional Colombian recipes." → Band 6–7.</li>
  <li><strong>No practicar en condiciones de tiempo real</strong>. El estrés del tiempo del día del examen es real. Si no entrenas bajo esas condiciones, el primer examen real se convierte en el entrenamiento.</li>
</ol>

<h2>Recursos recomendados para la preparación</h2>
<ul>
  <li><strong>Cambridge IELTS Practice Tests</strong> (libros oficiales, series 1–17+): los únicos simulacros que replican el formato exacto del examen real.</li>
  <li><strong>IELTS.org</strong>: el sitio oficial de British Council e IDP tiene materiales de práctica gratuitos y los descriptores de banda.</li>
  <li><strong>E2 IELTS en YouTube</strong>: canal con estrategias específicas por sección, muy útil para entender los criterios de evaluación de Writing y Speaking.</li>
  <li><strong>Simulacro gratuito WeLearn</strong>: practica el formato del IELTS en nuestra plataforma antes de pagar por el examen oficial.</li>
</ul>

<h2>¿Solo o con un tutor?</h2>
<p>La preparación autodidacta con este plan es posible si tienes disciplina y experiencia evaluando tu propio trabajo. El mayor riesgo de la preparación solo es el Writing: la autocorrección tiene un límite claro porque no puedes detectar los errores que cometes sistemáticamente — precisamente porque los cometes sin notarlos.</p>
<p>Un tutor con experiencia en IELTS acelera significativamente la preparación en Writing y Speaking porque puede darte retroalimentación específica que tú solo no puedes generarte. En WeLearn, la preparación para IELTS es 1:1 con tutor asignado — la clase de diagnóstico gratis te permite evaluar el nivel, decidir el plan y empezar a prepararte con dirección clara.</p>
<p>Si quieres agendar tu diagnóstico gratuito o tienes preguntas sobre la preparación, puedes hacerlo por <a href="/clases-de-ingles">nuestra página de clases de inglés</a>.</p>
    `,
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(p => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return BLOG_POSTS.map(p => p.slug);
}
