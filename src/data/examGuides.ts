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
  /** Respuesta directa a la duda más buscada. Va primero y va sola. */
  lead: string;
  sections: GuideSection[];
  faqs: GuideFaq[];
  /** Fuentes oficiales consultadas, visibles para el lector. */
  sources: { label: string; url: string }[];
  /** Fecha de última verificación, en texto. */
  checked: string;
};

export const EXAM_GUIDES: Record<string, ExamGuide> = {
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
    checked: 'agosto de 2026',
  },
};
