/**
 * Guías de examen: el contenido de texto que acompaña a cada simulacro.
 *
 * Por qué existe este archivo. La página /examenes/[exam] era solo una infografía
 * animada y una rejilla de simulacros: cero texto. Search Console (18-29 jul 2026)
 * mostraba /examenes/cambridge-b2 con 115 impresiones repartidas en 30 consultas
 * distintas, pero en posición media 37,7 — hay demanda real y la página no la
 * respondía.
 *
 * Regla al escribir una guía nueva:
 *  1. Las preguntas salen de consultas REALES de Search Console, no de lo que
 *     suponemos que la gente pregunta.
 *  2. `lead` responde en la primera frase. Es lo que citan los motores de respuesta.
 *  3. Nada sin fuente oficial verificable. Si no se pudo confirmar, no se publica:
 *     ni precios de examen, ni sedes, ni fechas. Ver la memoria de datos verificados.
 *  4. Las FAQs visibles y el FAQPage del schema salen del MISMO arreglo. Nunca
 *     escribir el marcado aparte: esa divergencia es justo lo que Google penaliza.
 */

export type GuideSection = {
  h: string;
  /** Cada string es un párrafo. Se permite <strong> y <a>. */
  body: string[];
};

export type GuideFaq = { q: string; a: string };

export type ExamGuide = {
  /**
   * Title y description propios. Se usan cuando el nombre oficial del examen no
   * coincide con lo que la gente teclea: el ICFES se llama oficialmente «Saber 11
   * · Componente de Inglés», pero nadie busca eso — buscan «simulacro icfes ingles».
   */
  title?: string;
  description?: string;
  /** Respuesta directa a la duda más buscada. Va primero y va sola. */
  lead: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Fuentes oficiales consultadas, visibles para el lector. */
  sources: { label: string; url: string }[];
  /**
   * El resto del clúster de este examen. Es lo que convierte páginas sueltas en
   * una red: la guía manda a la práctica y al contenido, no solo al simulacro.
   */
  related?: { href: string; label: string; note: string }[];
  /** Fecha de última verificación, en texto. */
  checked: string;
};

export const EXAM_GUIDES: Record<string, ExamGuide> = {

  icfes: {
    title: 'Simulacro ICFES Inglés gratis: cuadernillos oficiales y puntajes',
    description: 'Simulacros del ICFES de inglés gratis y sin registro, con cuadernillos oficiales de años anteriores y clave de respuestas. Escala real: Pre A1, A1, A2 y B1. Al terminar ves tu puntaje y tu nivel.',
    lead:
      'Sí, aquí puedes hacer <strong>simulacros del ICFES de inglés gratis y sin registro</strong>, armados con cuadernillos oficiales de años anteriores y su clave de respuestas. Al terminar cada uno ves tu puntaje y el nivel que te correspondería en la escala real del examen.',
    sections: [
      {
        h: 'Qué mide de verdad la prueba de inglés del Saber 11',
        body: [
          'Esto sorprende a casi todo el mundo: el componente de inglés del ICFES <strong>solo evalúa comprensión de lectura</strong>. No hay escucha, no hay escritura y no hay que hablar. Son 45 preguntas de opción múltiple en una hora.',
          'Eso cambia por completo cómo conviene prepararse. Practicar conversación no te sube el puntaje. Lo que lo sube es leer más rápido, reconocer vocabulario frecuente y no perder tiempo en las preguntas fáciles del principio.',
          'La prueba avanza de menos a más: empieza con avisos e instrucciones cortas, sigue con vocabulario y diálogos, y termina con textos largos. Muchos estudiantes se quedan sin tiempo al final porque gastaron de más al comienzo.',
        ],
      },
      {
        h: 'Cuánto es un buen puntaje y qué significa',
        body: [
          'El puntaje va de 0 a 100 y se traduce a <strong>cuatro niveles, no más</strong>:',
          '<strong>Pre A1 — 0 a 36 puntos.</strong> <strong>A1 — 37 a 57.</strong> <strong>A2 — 58 a 70.</strong> <strong>B1 — 71 a 100.</strong>',
          'Hay un detalle que casi todo el contenido que circula tiene mal: <strong>B1 es el techo</strong>. El examen no reporta B2, ni C1, ni C2. Si alguien te dice que sacó B2 en el ICFES, no es posible. Tampoco existen las etiquetas «A−» ni «B+» que aparecen en muchas guías desactualizadas.',
          'Por eso «sacar 100 en inglés en el ICFES» no significa tener inglés perfecto: significa haber llegado al tope de lo que la prueba mide, que es un B1 de comprensión lectora.',
        ],
      },
      {
        h: 'Cómo aprovechar un simulacro (y cómo desperdiciarlo)',
        body: [
          'Un simulacro no sirve para saber tu puntaje. Sirve para <strong>descubrir dónde se te va el tiempo y qué tipo de pregunta fallas</strong>. Si lo haces y solo miras el número final, desperdiciaste una hora.',
          'Hazlo cronometrado y de una sentada, aunque sea incómodo: la presión de tiempo es la mitad de la dificultad real del examen.',
          'Después revisa cada error y clasifícalo: ¿no sabías la palabra, entendiste mal la pregunta, o te quedaste sin tiempo? Son tres problemas distintos y se arreglan de tres maneras distintas.',
          'Si el problema es vocabulario —lo más común—, empieza por las palabras que más se repiten en el examen antes que por listas genéricas.',
        ],
      },
      {
        h: 'Cuánto puedes subir y en cuánto tiempo',
        body: [
          'Depende de dónde partas, y conviene ser honesto: pasar de A1 a A2 suele ser más rápido que pasar de A2 a B1, porque el salto a B1 exige leer textos largos con soltura y no solo reconocer palabras sueltas.',
          'Lo que sí es predecible es que la parte de vocabulario da resultados antes que ninguna otra, porque es la más mecánica y la que más peso tiene en las primeras secciones.',
          'No te fíes de quien te prometa un número exacto de puntos en un número exacto de semanas sin haber visto un diagnóstico tuyo.',
        ],
      },
    ],
    faqs: [
      { q: '¿Los simulacros del ICFES de esta página son gratis?', a: 'Sí. Están construidos a partir de cuadernillos oficiales de años anteriores publicados por el ICFES, con su clave de respuestas. No hay que registrarse para hacerlos.' },
      { q: '¿Cuántas preguntas de inglés tiene el ICFES y cuánto dura?', a: 'Son 45 preguntas de opción múltiple y el tiempo asignado es de 60 minutos.' },
      { q: '¿El ICFES de inglés evalúa listening o speaking?', a: 'No. El componente de inglés del Saber 11 evalúa únicamente comprensión de lectura y vocabulario. No hay comprensión auditiva, ni producción escrita, ni prueba oral.' },
      { q: '¿Cuál es el puntaje máximo y qué nivel equivale?', a: 'El máximo es 100 puntos, que corresponde al nivel B1. B1 es el techo de la prueba: el ICFES no reporta B2, C1 ni C2.' },
      { q: '¿Cuáles son los niveles de inglés del ICFES?', a: 'Son cuatro: Pre A1 (0 a 36 puntos), A1 (37 a 57), A2 (58 a 70) y B1 (71 a 100). Las etiquetas «A−» y «B+» que circulan en muchas guías ya no existen.' },
      { q: '¿Qué es un buen puntaje de inglés en el ICFES?', a: 'Depende de a qué aspires. Para llegar a B1, el nivel más alto que reporta la prueba, necesitas 71 puntos o más. Cada universidad y cada beca fija su propio corte, así que revisa el requisito concreto de la que te interesa.' },
      { q: '¿Cómo sacar 100 en inglés en el ICFES?', a: 'Sacar 100 significa llegar al tope de lo que mide la prueba, que es comprensión lectora de nivel B1. En la práctica exige dos cosas: dominar el vocabulario de alta frecuencia que se repite año tras año, y leer lo bastante rápido para no quedarte sin tiempo en los textos largos del final.' },
      { q: '¿Sirve de algo practicar con cuadernillos de años anteriores?', a: 'Sí, es lo más parecido al examen real que existe. La estructura del componente de inglés se ha mantenido estable, así que los tipos de pregunta y el nivel de dificultad son representativos.' },
      { q: '¿Cuánto tiempo necesito para prepararme?', a: 'Depende de tu nivel de partida. El vocabulario es lo que más rápido rinde; el salto de A2 a B1 es el más lento porque exige leer textos largos con soltura. Desconfía de quien te prometa un número exacto de puntos en un plazo exacto sin haberte hecho un diagnóstico.' },
      { q: '¿El puntaje de inglés afecta mi puntaje global del Saber 11?', a: 'El componente de inglés se reporta con su propio puntaje y su propio nivel. Cómo pesa en cada proceso de admisión o de beca lo define cada institución, así que consulta la convocatoria específica a la que vas a aplicar.' },
    ],
    sources: [
      { label: 'ICFES — Guías de orientación Saber 11', url: 'https://www.icfes.gov.co/' },
    ],
    related: [
      { href: '/blog/icfes-vocabulario-ingles-palabras-mas-frecuentes', label: 'Vocabulario que más se repite', note: 'Las palabras de alta frecuencia del examen. Es por donde más rápido se sube.' },
      { href: '/blog/icfes-saber-11-niveles-ingles-guia-completa', label: 'Los cuatro niveles, explicados', note: 'Qué significa cada rango de puntaje y qué sabe hacer alguien en cada uno.' },
      { href: '/practica/icfes-saber-11/sinonimos-inferencia', label: 'Sinónimos e inferencia', note: 'El tipo de pregunta que más se falla en la segunda mitad del examen.' },
      { href: '/practica/icfes-saber-11/gramatica-conjunciones', label: 'Conectores y conjunciones', note: 'Para no perder puntos en los textos largos del final.' },
      { href: '/blog/icfes-ingles-plan-estudio-3-meses', label: 'Plan de estudio de tres meses', note: 'Qué hacer cada semana si tienes un trimestre por delante.' },
      { href: '/preparacion-icfes', label: 'Preparación con profesor', note: 'Cómo lo trabajamos en WeLearn, presencial en Bucaramanga u online.' },
    ],
    checked: 'agosto de 2026',
  },
  'cambridge-b2': {
    lead:
      'Sí: el <strong>B2 First</strong>, el <strong>FCE</strong> y lo que casi todo el mundo llama simplemente <strong>«el First»</strong> son exactamente el mismo examen. No son tres certificados distintos ni tres niveles distintos. Cambridge le cambió el nombre para que el propio título dijera qué nivel acredita.',
    sections: [
      {
        h: 'Por qué el mismo examen tiene tres nombres',
        body: [
          'Durante décadas se llamó <strong>First Certificate in English</strong>, abreviado <strong>FCE</strong>. Cambridge renombró toda su familia de exámenes para que el nombre incluyera el nivel del Marco Común Europeo: hoy son A2 Key, B1 Preliminary, <strong>B2 First</strong>, C1 Advanced y C2 Proficiency.',
          'Por eso conviven los tres nombres: el oficial de hoy (B2 First), el histórico (FCE) y el de la calle (el First). Si un anuncio de empleo pide «FCE» y tú tienes un certificado que dice «B2 First», tienes lo que piden.',
          'Y si presentaste el examen hace años con el nombre viejo, tu certificado <strong>sigue siendo válido</strong>: Cambridge no caduca los certificados.',
        ],
      },
      {
        h: 'Qué puntaje necesitas de verdad',
        body: [
          'El B2 First se califica en la <strong>Cambridge English Scale</strong> y el resultado se reporta entre 140 y 190 puntos. Estos son los cortes oficiales:',
          '<strong>Grade A — 180 a 190 puntos.</strong> Acredita <strong>C1</strong>, un nivel por encima del que presentaste. Es real: se puede salir del examen de B2 con un certificado que dice C1.',
          '<strong>Grade B — 173 a 179 puntos.</strong> Acredita B2.',
          '<strong>Grade C — 160 a 172 puntos.</strong> Acredita B2. Es el aprobado: a partir de 160 tienes tu certificado de B2.',
          '<strong>Entre 140 y 159 puntos</strong> no apruebas el B2, pero Cambridge <strong>igual te emite un certificado de B1</strong>. Es una particularidad que casi nadie conoce y que cambia el cálculo de riesgo: presentarte y quedarte corto no significa salir con las manos vacías.',
        ],
      },
      {
        h: 'La diferencia que casi nadie te explica: no caduca',
        body: [
          'El IELTS y el TOEFL tienen fecha de vencimiento práctica — la mayoría de instituciones solo aceptan resultados de los últimos dos años. El certificado de Cambridge <strong>no expira</strong>.',
          'Con un matiz honesto que conviene saber antes de decidir: aunque el certificado no caduque, <strong>cada universidad o empleador decide cuánto tiempo hacia atrás acepta un resultado</strong>. Cambridge lo dice explícitamente. Así que «no caduca» no es lo mismo que «te sirve para siempre en todas partes»: verifica el requisito concreto de donde vas a aplicar.',
          'Aun así, para acreditar tu inglés ante un empleador o para tenerlo en la hoja de vida sin repetir examen cada dos años, esta es la ventaja más grande del First frente al IELTS.',
        ],
      },
      {
        h: 'B2 First o IELTS: cuál te conviene',
        body: [
          'No compiten por lo mismo, y elegir mal cuesta dinero y meses.',
          '<strong>Elige B2 First</strong> si quieres una acreditación permanente de tu nivel para trabajo, hoja de vida o estudios en Europa, y no tienes un requisito que exija otra cosa.',
          '<strong>Elige IELTS</strong> si vas a migrar o a aplicar a una universidad que lo pide por nombre. Para visados y procesos migratorios suele exigirse un examen de una lista oficial cerrada, y el First no siempre está en ella. <strong>Confirma la lista vigente del país al que aplicas antes de pagar cualquier examen.</strong>',
          'Y una advertencia práctica: el IELTS sí se aplica en Bucaramanga, en la UNAB, sede avalada por el British Council. Para el Cambridge B2 consulta el buscador oficial de centros, porque la oferta cambia y no queremos mandarte a una sede que ya no existe.',
        ],
      },
      {
        h: 'Cómo es el examen',
        body: [
          'Son cuatro pruebas y unas tres horas y media en total. La que sorprende a los hispanohablantes es <strong>Reading & Use of English</strong>: no es solo comprensión de lectura, incluye transformaciones de frases y huecos que miden gramática y vocabulario con mucha precisión. Es donde se pierden más puntos.',
          'El <strong>Speaking</strong> se hace en pareja con otro candidato, no solo frente al examinador. Eso cambia la preparación: hay que practicar interacción, turnos de palabra y llegar a acuerdos, no solo monólogos.',
          'Existe también el <strong>B2 First for Schools</strong>: mismo nivel, misma estructura y mismo certificado, pero con temas pensados para adolescentes escolarizados. No es un examen «más fácil».',
        ],
      },
    ],
    faqs: [
      {
        q: '¿El B2 es el First?',
        a: 'Sí, son el mismo examen. «B2 First» es el nombre oficial actual, «FCE» (First Certificate in English) es el nombre anterior y «el First» es como lo llama todo el mundo. Un certificado que diga B2 First acredita exactamente lo mismo que uno que diga FCE.',
      },
      {
        q: '¿Qué es el FCE?',
        a: 'FCE son las siglas de First Certificate in English, el nombre histórico del examen de Cambridge de nivel B2. Hoy se llama oficialmente B2 First. Si alguien te pide el FCE, te está pidiendo el B2 First.',
      },
      {
        q: '¿Cuántos puntos necesito para aprobar el First?',
        a: 'Necesitas 160 puntos en la Cambridge English Scale. De 160 a 172 obtienes Grade C, de 173 a 179 Grade B, y de 180 a 190 Grade A. Los tres acreditan B2 como mínimo; el Grade A acredita C1.',
      },
      {
        q: '¿Qué pasa si no llego a 160 puntos?',
        a: 'Si sacas entre 140 y 159 puntos no apruebas el B2, pero Cambridge te emite igualmente un certificado que acredita nivel B1. No sales sin nada. Por debajo de 140 no se emite certificado.',
      },
      {
        q: '¿El certificado del First caduca?',
        a: 'No. Cambridge afirma que sus certificados no expiran. Pero cada universidad, colegio profesional o empleador puede decidir cuántos años hacia atrás acepta un resultado, así que verifica siempre el requisito específico de la institución donde vas a presentarlo.',
      },
      {
        q: '¿Se puede sacar un C1 presentando el examen de B2?',
        a: 'Sí. Si obtienes entre 180 y 190 puntos (Grade A) en el B2 First, Cambridge emite un certificado que acredita nivel C1. Es una de las particularidades más útiles de este examen.',
      },
      {
        q: '¿Cuánto dura el examen y de qué partes consta?',
        a: 'Unas tres horas y media repartidas en cuatro pruebas: Reading & Use of English, Writing, Listening y Speaking. El Speaking se hace en pareja con otro candidato.',
      },
      {
        q: '¿Qué diferencia hay entre B2 First y B2 First for Schools?',
        a: 'Ninguna en cuanto a nivel, formato ni valor del certificado. Cambian los temas y contextos de las preguntas, pensados para estudiantes en edad escolar en la versión for Schools. No es una versión más fácil.',
      },
      {
        q: '¿El First sirve para migrar?',
        a: 'Depende del país y del tipo de visado. Muchos procesos migratorios exigen un examen de una lista oficial cerrada de exámenes aceptados, y el B2 First no siempre figura en ella. Antes de pagar, confirma la lista vigente del país al que vas a aplicar: es un error caro y frecuente.',
      },
      {
        q: '¿Qué es mejor, el First o el IELTS?',
        a: 'Depende del objetivo. El First no caduca, lo que lo hace mejor para acreditar tu nivel de forma permanente ante empleadores. El IELTS es el que piden la mayoría de universidades y procesos migratorios, pero sus resultados suelen aceptarse solo dos años. Si tienes un requisito escrito que nombra uno de los dos, no hay decisión que tomar: presenta ese.',
      },
      {
        q: '¿Dónde puedo presentar el Cambridge B2 en Colombia?',
        a: 'Los centros autorizados cambian con el tiempo, así que consulta el buscador oficial de centros de Cambridge English antes de inscribirte. Lo que sí está confirmado es que el IELTS se aplica en Bucaramanga, en la UNAB, sede avalada por el British Council.',
      },
    ],
    sources: [
      { label: 'Cambridge English — B2 First, resultados y escala', url: 'https://www.cambridgeenglish.org/exams-and-tests/first/results/' },
      { label: 'Cambridge English — B2 First', url: 'https://www.cambridgeenglish.org/exams-and-tests/first/' },
    ],
    related: [
      { href: '/practica/ingles/b1/gramatica', label: 'Gramática B1', note: 'La base que hay que tener firme antes de entrar en material de B2.' },
      { href: '/practica/ingles/b1/escritura', label: 'Escritura guiada', note: 'Produce textos y compáralos con un modelo del nivel.' },
      { href: '/examenes/ielts', label: 'Simulacros de IELTS', note: 'Si dudas entre los dos exámenes, prueba también este formato.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'Cómo enseñamos inglés en WeLearn, presencial u online.' },
    ],
    checked: 'agosto de 2026',
  },
};
