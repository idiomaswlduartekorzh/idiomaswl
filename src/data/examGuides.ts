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

  'celpe-bras': {
    title: 'Celpe-Bras en Bucaramanga: el único examen oficial que se aplica aquí',
    description: 'El Celpe-Bras es la única certificación oficial de portugués de Brasil, y se aplica en Bucaramanga. Cómo funciona, qué niveles otorga y por qué no se aprueba ni se reprueba.',
    lead:
      'Si estás en Bucaramanga, esto es una ventaja poco conocida: <strong>el Celpe-Bras se aplica aquí</strong>. Es el único examen oficial de portugués reconocido por el Gobierno de Brasil, y a diferencia del IELTS o el Goethe, no tienes que viajar a Bogotá para presentarlo.',
    sections: [
      {
        h: 'Dónde se presenta',
        body: [
          'En Bucaramanga, el puesto aplicador oficial es el <strong>IBRACO</strong> (Instituto Brasil-Colombia), y la <strong>UNAB</strong> figura como centro autorizado.',
          'Conviene tener clara la diferencia: el puesto aplicador es donde se rinde el examen. Confirma el calendario y el procedimiento de inscripción directamente con ellos, porque las fechas son limitadas y se agotan.',
          'El Celpe-Bras se aplica en convocatorias con fechas fijas al año, no cuando uno quiere. Planificar con antelación no es opcional.',
        ],
      },
      {
        h: 'No se aprueba ni se reprueba: se obtiene un nivel',
        body: [
          'Es la particularidad que más desconcierta. El Celpe-Bras <strong>no tiene nota de corte</strong>: según tu desempeño obtienes <strong>Intermediário, Intermediário Superior, Avançado o Avançado Superior</strong>.',
          'Si tu desempeño queda por debajo del Intermediário, no obtienes certificado — pero no existe la categoría «reprobado» como tal.',
          'Eso cambia la estrategia de preparación: no se trata de superar un umbral concreto, sino de subir de banda. Y la banda depende mucho de la producción, no del reconocimiento.',
        ],
      },
      {
        h: 'Por qué es distinto de los demás exámenes',
        body: [
          'El Celpe-Bras no evalúa gramática de forma aislada. Es un examen <strong>de uso</strong>: te dan tareas comunicativas reales —escribir un texto con un propósito concreto, responder en una entrevista— y se evalúa si lograste el objetivo comunicativo.',
          'Para un hispanohablante eso tiene una consecuencia práctica: el «portuñol» se detecta rápido. Entender portugués es fácil desde el español; <strong>producirlo sin interferencias del español es lo que separa una banda de otra</strong>.',
          'Por eso la preparación efectiva se centra en producción escrita y oral, no en ejercicios de opción múltiple.',
        ],
      },
    ],
    faqs: [
      { q: '¿Dónde se presenta el Celpe-Bras en Bucaramanga?', a: 'El puesto aplicador oficial es el IBRACO, Instituto Brasil-Colombia, y la UNAB figura como centro autorizado. Es de los pocos exámenes internacionales que se aplican en la ciudad sin necesidad de viajar.' },
      { q: '¿Se puede reprobar el Celpe-Bras?', a: 'No hay nota de corte como tal. Según tu desempeño obtienes Intermediário, Intermediário Superior, Avançado o Avançado Superior. Si quedas por debajo del Intermediário no obtienes certificado, pero no existe la categoría de reprobado.' },
      { q: '¿Qué niveles otorga el Celpe-Bras?', a: 'Cuatro: Intermediário, Intermediário Superior, Avançado y Avançado Superior. No certifica niveles básicos.' },
      { q: '¿Qué evalúa exactamente?', a: 'El uso real del idioma, no la gramática aislada. Se dan tareas comunicativas con un propósito concreto y se evalúa si lograste comunicar lo que había que comunicar.' },
      { q: '¿Es fácil para un hispanohablante?', a: 'Entender portugués es fácil desde el español; producirlo sin interferencias no lo es. El portuñol se detecta rápido y es justo lo que separa una banda de otra, así que la preparación efectiva se centra en producción escrita y oral.' },
      { q: '¿Cuándo se puede presentar?', a: 'Se aplica en convocatorias con fechas fijas al año, no cuando uno quiere, y los cupos se agotan. Confirma el calendario con el puesto aplicador y planifica con antelación.' },
    ],
    sources: [
      { label: 'Celpe-Bras — Gobierno de Brasil', url: 'https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/celpe-bras' },
    ],
    related: [
      { href: '/practica/portugues/a1/gramatica', label: 'Gramática portuguesa gratis', note: 'Desde A1, con foco en lo que el español interfiere.' },
      { href: '/practica/portugues/b1/escritura', label: 'Escritura guiada', note: 'La destreza que más pesa en el Celpe-Bras.' },
      { href: '/clases-de-portugues', label: 'Preparación con profesor', note: 'Cómo preparamos el Celpe-Bras en WeLearn, presencial en Bucaramanga u online.' },
    ],
    checked: 'agosto de 2026',
  },
  'delf-dalf': {
    title: 'DELF y DALF: qué certifican y por qué no sirven para migrar a Canadá',
    description: 'El DELF y el DALF son las certificaciones oficiales de francés del Ministerio de Educación francés, y no caducan. Pero para inmigrar a Canadá se exige TEF o TCF: el error más caro y más común.',
    lead:
      'Antes de pagar nada: <strong>si tu objetivo es migrar a Canadá, el DELF no te sirve</strong>. Es el error más caro y más frecuente con el francés. Para inmigración canadiense se exigen <strong>TEF Canada o TCF Canada</strong>, no el DELF ni el DALF.',
    sections: [
      {
        h: 'Qué son y para qué sí sirven',
        body: [
          'El <strong>DELF</strong> cubre los niveles A1 a B2 y el <strong>DALF</strong> los niveles C1 y C2. Los emite el Ministerio de Educación francés y son la referencia para estudios y para acreditar nivel de forma permanente.',
          'Su gran ventaja: <strong>no caducan</strong>. A diferencia del TEF y el TCF, que tienen vigencia limitada, un DELF B2 sigue valiendo dentro de diez años.',
          'Por eso la elección no es «cuál es mejor» sino «para qué lo necesito»: para estudiar en Francia o acreditar nivel de por vida, DELF o DALF. Para un proceso migratorio canadiense, TEF o TCF, y hay que repetirlo si vence.',
        ],
      },
      {
        h: 'Dónde se presenta en Colombia',
        body: [
          'El DELF y el DALF se aplican en la <strong>Alianza Francesa</strong>, que tiene sede en Bucaramanga. Es una ventaja frente a otros exámenes que obligan a viajar a Bogotá.',
          'Los TEF y TCF, que son los de la ruta canadiense, se gestionan también a través de la red de la Alianza Francesa, pero con calendarios y procedimientos propios. Confirma con ellos cuál necesitas antes de inscribirte.',
        ],
      },
      {
        h: 'Qué nivel te van a pedir',
        body: [
          '<strong>B2</strong> es el nivel más solicitado: es el corte habitual para cursar estudios universitarios en francés y el que abre la mayoría de puertas profesionales.',
          '<strong>B1</strong> aparece en trámites de nacionalidad francesa y en algunos programas de intercambio.',
          'Para procesos migratorios canadienses el nivel se mide en <strong>NCLC</strong>, una escala propia, no directamente en niveles del Marco Europeo. Es otra razón para no asumir equivalencias y verificar el requisito exacto.',
        ],
      },
    ],
    faqs: [
      { q: '¿El DELF sirve para migrar a Canadá?', a: 'No. Para inmigración canadiense se exigen TEF Canada o TCF Canada. Es el error más caro y más común con el francés: mucha gente estudia y presenta el DELF pensando que le sirve para su proceso migratorio.' },
      { q: '¿Cuál es la diferencia entre DELF y DALF?', a: 'El DELF cubre los niveles A1 a B2 y el DALF los niveles C1 y C2. Ambos los emite el Ministerio de Educación francés.' },
      { q: '¿El DELF caduca?', a: 'No. Es su gran ventaja frente al TEF y el TCF, que tienen vigencia limitada. Un DELF B2 sigue siendo válido años después.' },
      { q: '¿Dónde se presenta el DELF en Bucaramanga?', a: 'En la Alianza Francesa, que tiene sede en la ciudad. Es de los exámenes internacionales que sí se aplican aquí sin necesidad de viajar.' },
      { q: '¿Qué nivel de francés necesito para estudiar en Francia?', a: 'B2 es el corte habitual para estudios universitarios en francés. Confirma el requisito de tu universidad, porque algunos programas piden C1.' },
      { q: '¿Qué nivel piden para la nacionalidad francesa?', a: 'B1 es el nivel que suele figurar en el trámite. Verifica el requisito vigente con el consulado, porque las condiciones cambian.' },
    ],
    sources: [
      { label: 'France Éducation international — DELF y DALF', url: 'https://www.france-education-international.fr/diplomes-et-tests/delf-dalf' },
    ],
    related: [
      { href: '/blog/tcf-canada-frances-para-inmigrar-a-quebec', label: 'TCF Canada para Quebec', note: 'El examen que sí sirve para el proceso migratorio.' },
      { href: '/practica/frances/a1/gramatica', label: 'Gramática francesa gratis', note: 'Desde A1, explicada desde el español.' },
      { href: '/practica/frances/b1/escritura', label: 'Escritura guiada', note: 'Produce textos y compáralos con un modelo del nivel.' },
      { href: '/clases-de-frances', label: 'Preparación con profesor', note: 'Cómo preparamos el DELF en WeLearn, presencial en Bucaramanga u online.' },
    ],
    checked: 'agosto de 2026',
  },

  'cils-celi': {
    title: 'CILS B1 ciudadanía italiana: qué examen presentar y dónde',
    description: 'Para la ciudadanía italiana necesitas acreditar B1. Aquí está la diferencia entre CILS y CELI, qué examen sirve hoy para el trámite y dónde se presenta en Colombia.',
    lead:
      'Si vas por la ciudadanía italiana, esto te ahorra un viaje: <strong>el examen corto de «B1 Ciudadanía» ya no se aplica en Bogotá</strong>. Hoy hay que presentar el <strong>CILS B1 completo</strong>, que es más largo y evalúa las cuatro destrezas. Mucho contenido que sigue circulando no está actualizado en esto.',
    sections: [
      {
        h: 'CILS o CELI: no es lo mismo, y no da igual',
        body: [
          'Son dos certificaciones oficiales italianas distintas, emitidas por universidades distintas: el <strong>CILS</strong> por la Universidad para Extranjeros de Siena y el <strong>CELI</strong> por la de Perugia. Las dos acreditan nivel según el Marco Común Europeo.',
          'Para trámites de ciudadanía, lo que importa no es cuál te parece mejor sino <strong>cuál acepta el consulado que lleva tu expediente</strong> y cuál puedes presentar sin salir del país. Verifica ambas cosas antes de inscribirte en nada.',
          'Para estudiar en Italia, la mayoría de universidades aceptan las dos, pero de nuevo: revisa la convocatoria concreta.',
        ],
      },
      {
        h: 'Dónde se presenta en Colombia',
        body: [
          'El <strong>CILS</strong> se aplica en <strong>Bogotá</strong>, en el Instituto Italiano de Cultura. No hay sede en Bucaramanga.',
          'El <strong>PLIDA</strong>, otra certificación italiana, tiene más cobertura: Bogotá, Cartagena y Medellín (EAFIT).',
          'Las sedes y los calendarios cambian de un año a otro. Confirma en el instituto antes de comprar pasajes: es un error caro y frecuente.',
        ],
      },
      {
        h: 'Qué implica el B1 completo',
        body: [
          'A diferencia del examen corto que se usaba antes, el CILS B1 evalúa <strong>comprensión auditiva, comprensión lectora, producción escrita y producción oral</strong>.',
          'Eso cambia la preparación por completo. Quien venía preparándose solo para reconocer frases va a encontrarse teniendo que escribir y hablar, que es donde más gente se queda corta.',
          'La buena noticia: el B1 sigue siendo un nivel alcanzable para un hispanohablante en menos tiempo que en casi cualquier otro idioma, porque el italiano comparte estructura y vocabulario con el español.',
        ],
      },
    ],
    faqs: [
      { q: '¿Sirve el examen corto de B1 ciudadanía?', a: 'En Bogotá ya no se aplica. Hoy hay que presentar el CILS B1 completo, que evalúa las cuatro destrezas. Mucho contenido publicado sigue mencionando el examen corto y está desactualizado.' },
      { q: '¿Cuál es la diferencia entre CILS y CELI?', a: 'Son dos certificaciones oficiales italianas emitidas por universidades distintas: el CILS por la Universidad para Extranjeros de Siena y el CELI por la de Perugia. Ambas acreditan nivel según el Marco Común Europeo.' },
      { q: '¿Qué nivel necesito para la ciudadanía italiana?', a: 'B1. Confirma con el consulado que lleva tu expediente cuál de las certificaciones acepta, porque el requisito lo define el trámite y no el instituto donde estudias.' },
      { q: '¿Dónde se presenta el CILS en Colombia?', a: 'En Bogotá, en el Instituto Italiano de Cultura. No hay sede en Bucaramanga. El PLIDA, otra certificación italiana, se aplica en Bogotá, Cartagena y Medellín.' },
      { q: '¿Qué evalúa el CILS B1?', a: 'Las cuatro destrezas: comprensión auditiva, comprensión lectora, producción escrita y producción oral. Es más exigente que el examen corto que se usaba antes para ciudadanía.' },
      { q: '¿Cuánto tarda un hispanohablante en llegar a B1 de italiano?', a: 'Menos que en casi cualquier otro idioma, porque el italiano comparte estructura y vocabulario con el español. El tiempo exacto depende de tu punto de partida y de cuántas horas semanales le dediques, así que desconfía de quien te dé una cifra sin conocerte.' },
    ],
    sources: [
      { label: 'Universidad para Extranjeros de Siena — CILS', url: 'https://cils.unistrasi.it/' },
    ],
    related: [
      { href: '/blog/cils-celi-certificacion-italiano-colombia', label: 'CILS y CELI en Colombia', note: 'La comparación completa y el estado actual de las sedes.' },
      { href: '/practica/italiano/a1/gramatica', label: 'Gramática italiana gratis', note: 'Desde A1 hasta B1, explicada desde el español.' },
      { href: '/clases-de-italiano', label: 'Preparación con profesor', note: 'Cómo preparamos el CILS en WeLearn, presencial u online.' },
    ],
    checked: 'agosto de 2026',
  },
  goethe: {
    title: 'Goethe-Zertifikat: qué nivel necesitas y dónde presentarlo en Colombia',
    description: 'El Goethe-Zertifikat es la certificación oficial de alemán. Qué nivel piden para estudiar, trabajar o reagrupación familiar en Alemania, y en qué ciudades de Colombia se presenta.',
    lead:
      'El <strong>Goethe-Zertifikat</strong> es la certificación oficial de alemán del Goethe-Institut, y va de A1 a C2. Lo primero que conviene saber si estás en Bucaramanga: <strong>aquí no hay sede</strong>. En Colombia se presenta en Bogotá, Cali, Medellín y Cartagena.',
    sections: [
      {
        h: 'Qué nivel te van a pedir',
        body: [
          'El requisito lo fija cada proceso, pero el patrón es bastante estable:',
          '<strong>A1</strong> aparece en reagrupación familiar: el nivel para acompañar a un cónyuge. <strong>B1</strong> es lo habitual en formación profesional (Ausbildung) y en muchos procesos de residencia. <strong>B2</strong> es el corte frecuente para trabajar en el sector salud y para varias carreras. <strong>C1</strong> lo piden universidades para cursar en alemán.',
          'Verifica siempre el requisito exacto de tu convocatoria. Preparar un nivel de más cuesta meses; preparar uno de menos cuesta el trámite entero.',
        ],
      },
      {
        h: 'Cómo está construido el examen',
        body: [
          'Cada nivel evalúa las cuatro destrezas por separado: leer, escuchar, escribir y hablar. Los módulos se aprueban de forma independiente, lo que en la práctica significa que <strong>puedes repetir solo el que no pasaste</strong> en lugar de todo el examen.',
          'Es una diferencia importante frente a otros exámenes y conviene tenerla en cuenta al planificar: si vas justo de tiempo, presentarte y repetir un módulo puede salir mejor que esperar a sentirte listo en las cuatro.',
          'Confirma las condiciones de repetición con la sede, porque pueden variar.',
        ],
      },
      {
        h: 'La parte que más cuesta a un hispanohablante',
        body: [
          'No es el vocabulario ni la pronunciación: es el <strong>sistema de casos</strong> y el orden de la frase. El alemán coloca el verbo en posiciones que al principio parecen arbitrarias, y los artículos cambian según la función de la palabra en la oración.',
          'Por eso conviene empezar por la estructura antes que por acumular palabras. Un vocabulario amplio con casos mal puestos no aprueba un B1.',
        ],
      },
    ],
    faqs: [
      { q: '¿Dónde se presenta el Goethe-Zertifikat en Colombia?', a: 'En Bogotá, Cali, Medellín y Cartagena. No hay sede en Bucaramanga, así que hay que contar con el desplazamiento al planificar la fecha.' },
      { q: '¿Qué nivel de alemán necesito para trabajar en Alemania?', a: 'Depende del sector. B1 es lo habitual para formación profesional y muchos procesos de residencia; B2 es el corte frecuente en el sector salud. Confirma el requisito exacto de tu proceso antes de elegir nivel.' },
      { q: '¿Qué nivel piden para reagrupación familiar?', a: 'Normalmente A1. Es el nivel para acompañar a un cónyuge, y es el examen más accesible de la familia Goethe.' },
      { q: '¿Puedo repetir solo una parte del examen?', a: 'Los módulos se aprueban de forma independiente, así que en general se puede repetir solo el que no pasaste en lugar del examen completo. Confirma las condiciones con la sede, porque pueden variar.' },
      { q: '¿Qué es lo más difícil del alemán para un hispanohablante?', a: 'El sistema de casos y el orden de la frase, no el vocabulario. Los artículos cambian según la función de la palabra en la oración y el verbo ocupa posiciones que al principio parecen arbitrarias. Conviene empezar por la estructura antes que por acumular palabras.' },
      { q: '¿El Goethe-Zertifikat caduca?', a: 'El certificado no tiene fecha de vencimiento en sí mismo, pero muchas instituciones y procesos migratorios solo aceptan certificados recientes, normalmente de los últimos dos años. Verifica el requisito de tu trámite.' },
    ],
    sources: [
      { label: 'Goethe-Institut — Exámenes de alemán', url: 'https://www.goethe.de/en/spr/kup/prf.html' },
    ],
    related: [
      { href: '/blog/goethe-zertifikat-guia-completa-colombia', label: 'Goethe en Colombia', note: 'Sedes, niveles y cómo inscribirse.' },
      { href: '/blog/trabajar-en-alemania-nivel-aleman-requerido', label: 'Qué nivel pide cada trabajo', note: 'Por sector, con lo que de verdad exigen los empleadores.' },
      { href: '/practica/aleman/a1/gramatica', label: 'Gramática alemana gratis', note: 'Casos y orden de la frase, que es donde está la dificultad real.' },
      { href: '/clases-de-aleman', label: 'Preparación con profesor', note: 'Cómo preparamos el Goethe en WeLearn, presencial u online.' },
    ],
    checked: 'agosto de 2026',
  },

  ielts: {
    title: 'IELTS Academic o General: cuál necesitas, y simulacros gratis',
    description: 'La diferencia real entre IELTS Academic y General Training: Listening y Speaking son idénticos, solo cambian Reading y Writing. Simulacros gratis, banda 0-9 explicada y dónde se presenta en Bucaramanga.',
    lead:
      'La duda más frecuente tiene una respuesta corta: <strong>Listening y Speaking son exactamente iguales en los dos exámenes</strong>. Lo único que cambia es <strong>Reading y Writing</strong>. Y no eliges por cuál te parece más fácil: eliges el que te exige la institución o el proceso migratorio al que aplicas.',
    sections: [
      {
        h: 'Academic o General Training: cuál te toca',
        body: [
          '<strong>Academic</strong> si vas a estudiar una carrera o un posgrado en inglés. Su Reading usa textos de libros, revistas y publicaciones académicas, y el Writing Task 1 te pide describir un gráfico o un diagrama.',
          '<strong>General Training</strong> si migras a Reino Unido, Canadá, Australia o Nueva Zelanda, o si vas a formarte por debajo de nivel universitario. Su Reading usa material cotidiano —avisos, anuncios, documentos de trabajo— y el Writing Task 1 es una carta.',
          'Un aviso importante: <strong>que los textos del General parezcan más fáciles no significa que la banda salga más alta</strong>. La conversión de aciertos a banda es distinta en cada examen, precisamente para compensar esa diferencia de dificultad. Elegir el General «porque es más fácil» es un error de cálculo.',
          'Y si te equivocas de examen, no hay recurso: presentar el Academic cuando te pedían el General significa volver a pagar y volver a presentarte.',
        ],
      },
      {
        h: 'Qué significa tu banda',
        body: [
          'El IELTS se puntúa de <strong>0 a 9</strong>, con medios puntos. Recibes una banda por cada destreza y una banda global que es el promedio de las cuatro.',
          'No se aprueba ni se reprueba: se obtiene una banda. Lo que decide si te sirve es el requisito de tu institución, y muchas exigen además <strong>una banda mínima por sección</strong>, no solo la global. Es un detalle que arruina candidaturas: sacar 7 global con un 5,5 en writing puede no servir aunque el promedio dé.',
          'Revisa siempre las dos cifras en la convocatoria: la global y el mínimo por destreza.',
        ],
      },
      {
        h: 'Dónde se presenta si estás en Bucaramanga',
        body: [
          'Aquí hay una ventaja concreta frente a otros exámenes: <strong>el IELTS sí se aplica en Bucaramanga</strong>, en la UNAB, sede avalada por el British Council en Santander.',
          'La inscripción y el pago se hacen con el British Council, no con la universidad. La UNAB es la sede donde se presenta el examen.',
          'Es una diferencia práctica que pesa al decidir: el TOEFL iBT no se aplica en Bucaramanga y obliga a desplazarse.',
        ],
      },
      {
        h: 'Cuánto cuesta y cuánto dura el resultado',
        body: [
          'El precio lo fija el British Council y <strong>cambia cada año</strong>, así que cualquier cifra publicada envejece mal. Consúltalo en su web antes de presupuestar; no te fíes de un número que leas en un blog, incluido este.',
          'Lo que sí conviene tener en cuenta al hacer cuentas es que el examen no es el único gasto: hay que sumar el desplazamiento si tu sede está en otra ciudad, y el reenvío de resultados si aplicas a varias instituciones.',
          'Los resultados son válidos <strong>dos años</strong>. Planifica la fecha hacia atrás desde el plazo de tu convocatoria: presentarlo demasiado pronto es tirar el dinero.',
        ],
      },
      {
        h: 'IELTS o el examen de Duolingo',
        body: [
          'Es una pregunta cada vez más frecuente y la respuesta honesta es: <strong>depende exclusivamente de quién lo va a recibir</strong>.',
          'El examen de Duolingo es más barato, se hace desde casa y da resultados en días. Pero la lista de instituciones que lo aceptan es más corta, y para procesos migratorios suele exigirse un examen de una lista oficial cerrada donde el IELTS sí figura.',
          'La regla práctica: si tu universidad o tu proceso acepta los dos y solo buscas acreditar nivel, el de Duolingo puede salirte mejor. Si hay cualquier componente migratorio de por medio, o si la convocatoria nombra el IELTS, no experimentes.',
          '<strong>Verifica en la web de tu institución, no en un foro.</strong> Las listas de exámenes aceptados cambian y una respuesta desactualizada cuesta una convocatoria entera.',
        ],
      },
    ],
    faqs: [
      { q: '¿Cuál es la diferencia entre IELTS Academic y General Training?', a: 'Listening y Speaking son idénticos en los dos. Solo cambian Reading y Writing: el Academic usa textos académicos y pide describir un gráfico, mientras que el General Training usa material cotidiano y pide escribir una carta.' },
      { q: '¿Cuál es más fácil, el Academic o el General?', a: 'Los textos del General suelen parecer más sencillos, pero la conversión de aciertos a banda es distinta en cada examen precisamente para compensarlo. Elegir el General pensando que dará una banda más alta es un error de cálculo. Elige el que te piden, no el que parece más fácil.' },
      { q: '¿Cuál necesito para migrar a Canadá o Reino Unido?', a: 'Por regla general, el General Training. El Academic es para estudios de nivel universitario. Confirma siempre el requisito exacto de tu proceso, porque algunas rutas migratorias piden versiones específicas del examen.' },
      { q: '¿Qué pasa si presento el examen equivocado?', a: 'No hay recurso: hay que volver a pagar y volver a presentarse. Es el motivo por el que conviene confirmar por escrito cuál te piden antes de inscribirte.' },
      { q: '¿Cómo se puntúa el IELTS?', a: 'De 0 a 9 con medios puntos. Recibes una banda por cada destreza y una banda global que es el promedio de las cuatro. No se aprueba ni se reprueba: se obtiene una banda.' },
      { q: '¿Me sirve una banda global alta si fallo una sección?', a: 'Depende de la institución, y es un detalle que arruina candidaturas. Muchas exigen una banda mínima por sección además de la global. Sacar 7 global con 5,5 en writing puede no servir aunque el promedio dé. Revisa las dos cifras en la convocatoria.' },
      { q: '¿Dónde se presenta el IELTS en Bucaramanga?', a: 'En la UNAB, sede avalada por el British Council en Santander. La inscripción y el pago se hacen con el British Council, no con la universidad.' },
      { q: '¿Cuánto cuesta el IELTS en Colombia?', a: 'El precio lo fija el British Council y cambia cada año, así que conviene consultarlo en su web antes de presupuestar en lugar de fiarse de una cifra publicada en un blog. Al hacer cuentas, suma también el desplazamiento si tu sede está en otra ciudad y el reenvío de resultados si aplicas a varias instituciones.' },
      { q: '¿Cuánto tiempo son válidos los resultados del IELTS?', a: 'Dos años desde la fecha del examen. Planifica hacia atrás desde el plazo de tu convocatoria: presentarlo demasiado pronto significa tener que repetirlo.' },
      { q: '¿El examen de Duolingo reemplaza al IELTS?', a: 'Solo si quien lo recibe lo acepta. Es más barato y más rápido, pero la lista de instituciones que lo admiten es más corta, y en procesos migratorios suele exigirse un examen de una lista oficial cerrada donde el IELTS sí figura. Verifica en la web de tu institución, no en un foro.' },
    ],
    sources: [
      { label: 'IELTS — Tipos de examen: Academic y General Training', url: 'https://ielts.org/take-a-test/test-types' },
      { label: 'British Council — Qué IELTS necesitas', url: 'https://takeielts.britishcouncil.org/take-ielts/which-ielts-test' },
    ],
    related: [
      { href: '/blog/ielts-bucaramanga-centros-de-examen-y-registro', label: 'IELTS en Bucaramanga', note: 'La sede, cómo inscribirse y qué llevar el día del examen.' },
      { href: '/blog/ielts-academic-vs-general-training', label: 'Academic vs General en detalle', note: 'La comparación completa, sección por sección.' },
      { href: '/blog/como-sacar-band-7-en-ielts', label: 'Cómo llegar a Band 7', note: 'Lo que separa un 6,5 de un 7 en cada destreza.' },
      { href: '/practica/ingles/b1/escritura', label: 'Escritura guiada', note: 'La destreza donde más gente se queda corta del mínimo por sección.' },
      { href: '/practica/ingles/b1/habla', label: 'Expresión oral', note: 'Estructuras y pronunciación modelo para el Speaking.' },
      { href: '/clases-de-ingles-bucaramanga', label: 'Preparación en Bucaramanga', note: 'Presencial en el barrio Sotomayor u online, con diagnóstico gratis.' },
    ],
    checked: 'agosto de 2026',
  },

  toefl: {
    title: 'Simulacro TOEFL gratis y la nueva escala 1–6: guía 2026',
    description: 'Simulacros del TOEFL iBT gratis con formato real. Desde enero de 2026 el examen se puntúa en bandas de 1 a 6, no sobre 120: aquí está qué cambió, qué significa tu banda y qué siguen pidiendo las universidades.',
    lead:
      'Antes de nada, lo que casi nadie te ha dicho: <strong>desde el 21 de enero de 2026 el TOEFL iBT ya no se puntúa sobre 120</strong>. El puntaje principal es ahora una <strong>banda de 1 a 6</strong>, con medios puntos, igual que el IELTS. El 0–120 se sigue reportando como equivalente, pero solo durante una transición de dos años.',
    sections: [
      {
        h: 'Qué cambió exactamente y qué significa para ti',
        body: [
          'Si presentaste el examen antes de esa fecha, tu certificado sigue valiendo y tus puntos se convierten a la escala nueva en el informe.',
          'Si lo vas a presentar ahora, tu resultado principal será algo como <strong>4,5</strong> en vez de <strong>95</strong>. Junto a él seguirá apareciendo el equivalente sobre 120 hasta enero de 2028.',
          'Eso importa por una razón muy práctica: <strong>las universidades siguen publicando sus requisitos en la escala vieja</strong>. Si una maestría pide «TOEFL 100», sigue refiriéndose a los 100 sobre 120, y tú tendrás que mirar la equivalencia de tu informe. No asumas que pide banda 100 de nada.',
          'Cada sección se puntúa también de 1 a 6, y la banda global es el promedio de las cuatro, redondeado al medio punto más cercano.',
        ],
      },
      {
        h: 'Tabla de equivalencias: tu banda en la escala de siempre',
        body: [
          'Como las universidades siguen publicando sus requisitos sobre 120, esta es la conversión oficial de ETS. Guárdala: es lo que necesitas para saber si tu banda alcanza lo que te piden.',
          '<strong>Banda 6</strong> equivale a 114 puntos o más. <strong>5,5</strong> → desde 107. <strong>5</strong> → desde 95. <strong>4,5</strong> → desde 86. <strong>4</strong> → desde 72.',
          '<strong>3,5</strong> → desde 58. <strong>3</strong> → desde 44. <strong>2,5</strong> → desde 34. <strong>2</strong> → desde 24. <strong>1,5</strong> → desde 12. <strong>1</strong> → desde 0.',
          'Un ejemplo de por qué esto importa: si tu maestría pide <strong>TOEFL 100</strong>, necesitas al menos <strong>banda 5</strong>, porque el 5 empieza en 95 y el 5,5 en 107. Y si pide 90, con banda 4,5 (que empieza en 86) podrías quedarte corto: conviene apuntar al 5.',
          'Ojo con leer la tabla al revés. Una banda 5 puede corresponder a cualquier puntaje entre 95 y 106, así que si tu requisito está en ese rango, mira el equivalente exacto que aparece en tu informe y no la banda a secas.',
        ],
      },
      {
        h: 'Cómo es el examen hoy',
        body: [
          'El TOEFL iBT dura <strong>unas dos horas</strong> y evalúa las cuatro destrezas en este orden: lectura, comprensión auditiva, escritura y expresión oral.',
          'Es <strong>adaptativo</strong>: el número exacto de preguntas y el tiempo varían según cómo respondas. Por eso no tiene sentido memorizar «son X preguntas»: prepárate para el tipo de tarea, no para un conteo.',
          'La sección de expresión oral es la más corta —unos ocho minutos— y la que más ansiedad genera, porque se graba y hay que responder con muy poco tiempo de preparación. Es también donde más rinde practicar en voz alta antes del examen.',
        ],
      },
      {
        h: 'Dónde se presenta si estás en Bucaramanga',
        body: [
          'Aquí hay una confusión que sale cara. <strong>El TOEFL iBT no se aplica en Bucaramanga</strong>, así que hay que contar con desplazarse.',
          'Y ojo con esto: el <strong>TOEFL ITP</strong> que se ofrece localmente <strong>es un examen distinto</strong>. Mide otra cosa, se usa para clasificación interna de instituciones y <strong>no sirve donde te piden el iBT</strong>. Confirma cuál te están pidiendo antes de inscribirte en nada.',
          'Si lo que necesitas es un examen internacional que sí se aplique en Bucaramanga, el <strong>IELTS</strong> se presenta aquí, en la UNAB, como sede avalada por el British Council.',
        ],
      },
      {
        h: 'Cuánto valen tus resultados',
        body: [
          'Los puntajes del TOEFL son válidos <strong>dos años</strong> desde la fecha del examen. Pasado ese plazo, ETS no los envía ni los reporta.',
          'Es la diferencia grande frente a un certificado de Cambridge, que no caduca. Si tu proceso de admisión es dentro de tres años, presentarlo ahora no te sirve de nada.',
          'Planifica la fecha hacia atrás desde el plazo de tu convocatoria, no hacia adelante desde cuando te sientas listo.',
        ],
      },
    ],
    faqs: [
      { q: '¿El TOEFL ya no es sobre 120?', a: 'Correcto. Desde el 21 de enero de 2026 el puntaje principal del TOEFL iBT es una banda de 1 a 6 con medios puntos. El equivalente sobre 120 se sigue reportando durante una transición de dos años, hasta enero de 2028.' },
      { q: '¿Sirve todavía mi TOEFL con puntaje sobre 120?', a: 'Sí. Los exámenes presentados antes del cambio siguen siendo válidos durante sus dos años de vigencia, y el informe convierte esos puntos a la escala nueva.' },
      { q: 'Mi universidad pide TOEFL 100. ¿Qué banda es esa?', a: 'Las universidades siguen publicando requisitos en la escala 0 a 120, y tu informe seguirá mostrando ese equivalente hasta enero de 2028. Si te piden 100, se refieren a 100 sobre 120. Confirma siempre el requisito con la institución, porque cada una decide cómo lo aplica durante la transición.' },
      { q: '¿Cómo convierto mi banda del TOEFL a la escala de 120?', a: 'Según la tabla oficial de ETS: banda 6 equivale a 114 o más, 5,5 desde 107, 5 desde 95, 4,5 desde 86, 4 desde 72, 3,5 desde 58, 3 desde 44, 2,5 desde 34, 2 desde 24, 1,5 desde 12 y 1 desde 0. Si tu universidad pide TOEFL 100, necesitas al menos banda 5.' },
      { q: '¿Cuánto dura el TOEFL iBT?', a: 'Aproximadamente dos horas. El examen es adaptativo, así que el número exacto de preguntas y el tiempo por sección varían según cómo vayas respondiendo.' },
      { q: '¿Cuánto tiempo son válidos los resultados del TOEFL?', a: 'Dos años desde la fecha del examen. Pasado ese plazo ETS no reporta ni envía los puntajes.' },
      { q: '¿Se puede presentar el TOEFL iBT en Bucaramanga?', a: 'No. El TOEFL iBT no se aplica en Bucaramanga, hay que desplazarse a otra ciudad. Si necesitas un examen internacional que sí se aplique aquí, el IELTS se presenta en la UNAB como sede avalada por el British Council.' },
      { q: '¿El TOEFL ITP sirve igual que el iBT?', a: 'No, son exámenes distintos. El ITP se usa para clasificación interna de instituciones y no reemplaza al iBT donde te piden el iBT. Es un error frecuente y caro: confirma cuál te están exigiendo antes de inscribirte.' },
      { q: '¿Los simulacros de esta página son gratis?', a: 'Sí. Reproducen el formato de las cuatro secciones y te dan un informe por sección para que veas dónde estás perdiendo puntos, que es para lo que sirve de verdad un simulacro.' },
      { q: '¿Qué sección del TOEFL es la más difícil?', a: 'Depende de tu perfil, pero la expresión oral es la que más se atraganta a los hispanohablantes: se graba, hay muy poco tiempo de preparación y no se puede corregir sobre la marcha. Es la que más mejora con práctica en voz alta.' },
      { q: '¿TOEFL o IELTS?', a: 'Si tu institución acepta los dos, pesa lo práctico: el IELTS se aplica en Bucaramanga y el TOEFL iBT no. Si te piden uno por nombre, no hay decisión que tomar. Y verifica siempre el requisito exacto antes de pagar.' },
    ],
    sources: [
      { label: 'ETS — Comprender los puntajes del TOEFL iBT', url: 'https://www.ets.org/toefl/test-takers/ibt/scores/understand-scores.html' },
      { label: 'ETS — Contenido y secciones del TOEFL iBT', url: 'https://www.ets.org/toefl/test-takers/ibt/about/content.html' },
    ],
    related: [
      { href: '/examenes/ielts', label: 'Simulacros de IELTS', note: 'El examen que sí se aplica en Bucaramanga, por si te sirven los dos.' },
      { href: '/blog/ielts-vs-toefl-cual-tomar-en-colombia', label: 'IELTS o TOEFL en Colombia', note: 'La comparación completa, con lo que pesa de verdad al elegir.' },
      { href: '/practica/ingles/b1/escritura', label: 'Escritura guiada', note: 'Produce textos y compáralos con un modelo del nivel.' },
      { href: '/practica/ingles/b1/habla', label: 'Expresión oral', note: 'La sección que más se atraganta, y la que más mejora practicando en voz alta.' },
      { href: '/clases-de-ingles', label: 'Preparación con profesor', note: 'Cómo preparamos el TOEFL en WeLearn, presencial u online.' },
    ],
    checked: 'agosto de 2026',
  },

  topik: {
    title: 'TOPIK I y TOPIK II: diferencias, puntajes y simulacro gratis',
    description: 'TOPIK I y TOPIK II no son dos niveles del mismo examen: son dos exámenes distintos. Aquí está la diferencia, los puntajes que necesitas para cada nivel del 1 al 6, y un simulacro gratis para saber por cuál empezar.',
    lead:
      'La confusión más común, y la que hace perder dinero: <strong>TOPIK I y TOPIK II no son dos niveles del mismo examen</strong>. Son dos exámenes distintos, con formato distinto y precio distinto, y te inscribes en uno o en otro. TOPIK I certifica los niveles 1 y 2; TOPIK II certifica del 3 al 6.',
    sections: [
      {
        h: 'La diferencia en una tabla',
        body: [
          '<strong>TOPIK I</strong> — certifica niveles 1 y 2. Dos secciones: comprensión auditiva y lectura. Puntaje sobre 200. Dura unos 100 minutos. <strong>No hay que escribir nada</strong>: es todo de opción múltiple.',
          '<strong>TOPIK II</strong> — certifica niveles 3, 4, 5 y 6. Tres secciones: auditiva, lectura y <strong>escritura</strong>. Puntaje sobre 300. Es bastante más largo y la escritura incluye redacción, no solo completar.',
          'Esa sección de escritura es la diferencia real de dificultad, no el vocabulario. Mucha gente con buen nivel de comprensión se estrella ahí porque nunca practicó producción escrita.',
        ],
      },
      {
        h: 'Cuántos puntos necesitas para cada nivel',
        body: [
          'No apruebas o repruebas: sacas el nivel que te dé tu puntaje. Si te presentas al TOPIK II y sacas 130, obtienes nivel 3.',
          '<strong>TOPIK I (sobre 200):</strong> nivel 1 desde 80 puntos · nivel 2 desde 140.',
          '<strong>TOPIK II (sobre 300):</strong> nivel 3 desde 120 · nivel 4 desde 150 · nivel 5 desde 190 · nivel 6 desde 230.',
          'Hay un detalle que conviene calcular antes de inscribirse: en el TOPIK I, pasar de nivel 1 a nivel 2 exige <strong>60 puntos más</strong>; en el TOPIK II los saltos entre niveles son de 30 a 40. El primer salto es el más caro.',
          'Y si te presentas al TOPIK II sin llegar a 120 puntos, no obtienes nivel 2 de consolación: te quedas sin certificado. Por eso elegir mal el examen sale caro.',
        ],
      },
      {
        h: 'Cuál te toca a ti',
        body: [
          'Si llevas menos de un año estudiando o todavía lees el hangul con esfuerzo, <strong>TOPIK I</strong>. Es donde está tu nivel y además te da un certificado real.',
          'Si ya manejas estructuras de pasado y futuro, entiendes conversación cotidiana y puedes escribir un párrafo con sentido, <strong>TOPIK II</strong> — aunque apuntes solo a nivel 3.',
          'Si dudas, haz el simulacro de esta página antes de pagar la inscripción. Media hora ahí te ahorra elegir mal.',
        ],
      },
      {
        h: 'Para qué te piden cada nivel',
        body: [
          'Los requisitos los fija cada universidad, empresa o programa, así que verifica siempre el tuyo. Pero el patrón general ayuda a orientarse:',
          '<strong>Nivel 3-4</strong> es lo que suelen pedir los programas de intercambio y muchas becas para entrar a un curso de idioma en Corea. <strong>Nivel 4</strong> es el corte habitual para cursar una carrera en coreano. <strong>Nivel 5-6</strong> aparece en posgrados y en puestos de trabajo donde el coreano es la lengua de trabajo.',
          'Para las <strong>becas GKS</strong> del Gobierno coreano hay algo que casi nadie sabe y que cambia el cálculo: <strong>no necesitas TOPIK para postularte</strong>. Muchos aplican con nivel cero y hacen el año de idioma que la beca incluye. Tener TOPIK suma puntos, pero no es un requisito de entrada.',
        ],
      },
      {
        h: 'Dónde se presenta y cuánto vale el certificado',
        body: [
          'En Colombia el TOPIK se aplica en <strong>Bogotá</strong>, en el Instituto Rey Sejong. No hay sede en Bucaramanga, así que hay que contar con el viaje al planificar la fecha.',
          'Las sedes y el calendario cambian cada año, así que confirma en la página oficial del TOPIK antes de organizar nada.',
          'El certificado <strong>tiene vigencia de dos años</strong> desde la publicación de resultados. Es distinto del Cambridge, que no caduca: aquí conviene presentarlo cuando ya tengas cerca el proceso para el que lo necesitas, no con años de antelación.',
        ],
      },
    ],
    faqs: [
      { q: '¿Cuál es la diferencia entre TOPIK I y TOPIK II?', a: 'Son dos exámenes distintos, no dos niveles del mismo. TOPIK I certifica los niveles 1 y 2, tiene comprensión auditiva y lectura, y se puntúa sobre 200. TOPIK II certifica los niveles 3 a 6, añade una sección de escritura y se puntúa sobre 300. Te inscribes en uno o en otro.' },
      { q: '¿Qué es el TOPIK?', a: 'Es el Test of Proficiency in Korean, el examen oficial de coreano del Gobierno de Corea del Sur. Es el estándar que piden universidades, becas y empleadores coreanos para acreditar tu nivel.' },
      { q: '¿Cuántos puntos necesito para cada nivel del TOPIK?', a: 'En TOPIK I (sobre 200): nivel 1 desde 80 puntos y nivel 2 desde 140. En TOPIK II (sobre 300): nivel 3 desde 120, nivel 4 desde 150, nivel 5 desde 190 y nivel 6 desde 230.' },
      { q: '¿Qué pasa si me presento al TOPIK II y saco poco puntaje?', a: 'Si no llegas a 120 puntos no obtienes ningún nivel: no hay nivel 2 de consolación por presentarte al examen avanzado. Es el motivo por el que conviene medir tu nivel antes de elegir en cuál inscribirte.' },
      { q: '¿Cuál presento si estoy empezando?', a: 'TOPIK I. Si llevas menos de un año estudiando o todavía lees el hangul con esfuerzo, es donde está tu nivel y te da un certificado real. Presentarte al II para "probar" suele terminar sin certificado.' },
      { q: '¿El certificado del TOPIK caduca?', a: 'Sí, tiene una vigencia de dos años desde la publicación de resultados. A diferencia de los certificados de Cambridge, que no expiran, aquí conviene presentarlo cuando ya tengas cerca el proceso para el que lo necesitas.' },
      { q: '¿Dónde se presenta el TOPIK en Colombia?', a: 'En Bogotá, en el Instituto Rey Sejong. No hay sede en Bucaramanga. Las sedes y el calendario cambian cada año, así que confirma en la página oficial del TOPIK antes de organizar el viaje.' },
      { q: '¿Necesito TOPIK para la beca GKS de Corea del Sur?', a: 'No. Puedes postularte sin TOPIK: la beca incluye un año de estudio del idioma. Tener TOPIK suma puntos en la evaluación, pero no es un requisito de entrada. Es uno de los malentendidos más comunes y frena a mucha gente que sí podría aplicar.' },
      { q: '¿Qué nivel de TOPIK necesito para estudiar en Corea?', a: 'Depende del programa, y el requisito lo fija cada universidad. Como orientación, el nivel 3 o 4 es lo habitual para intercambios y programas de idioma, y el nivel 4 suele ser el corte para cursar una carrera en coreano. Verifica siempre la convocatoria concreta.' },
      { q: '¿Qué es más difícil del TOPIK II?', a: 'La sección de escritura, que no existe en TOPIK I. Incluye redacción, no solo completar frases. Mucha gente con buena comprensión se queda corta ahí porque nunca practicó producción escrita en coreano.' },
    ],
    sources: [
      { label: 'TOPIK — página oficial del Gobierno de Corea del Sur', url: 'https://www.topik.go.kr' },
    ],
    related: [
      { href: '/blog/topik-i-vs-topik-ii-diferencias', label: 'TOPIK I vs TOPIK II en detalle', note: 'La comparación completa, sección por sección, si aún dudas cuál presentar.' },
      { href: '/blog/topik-1-preparacion-guia-para-principiantes', label: 'Cómo preparar el TOPIK I', note: 'Ruta desde cero para el examen básico.' },
      { href: '/blog/coreano-nivel-topik-3-4-como-alcanzarlo', label: 'Llegar a TOPIK 3 o 4', note: 'El salto que piden la mayoría de universidades y becas.' },
      { href: '/blog/beca-gks-corea-del-sur-para-colombianos', label: 'Beca GKS para colombianos', note: 'Cómo postularse, y por qué no necesitas TOPIK para hacerlo.' },
      { href: '/practica/coreano/a1/gramatica', label: 'Gramática coreana gratis', note: 'Partículas, orden de la frase y niveles de formalidad, desde el español.' },
      { href: '/clases-de-coreano', label: 'Preparación con profesor', note: 'Cómo enseñamos coreano en WeLearn, presencial en Bucaramanga u online.' },
    ],
    checked: 'agosto de 2026',
  },

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
