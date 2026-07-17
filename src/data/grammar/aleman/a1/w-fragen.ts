import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'w-fragen',
  order: '09',
  color: '#c9a900',
  category: 'Satzbau',
  level: 'A1',
  title: 'W-Fragen im Deutschen A1',
  shortTitle: 'W-Fragen',
  metaTitle: 'Preguntas W en alemán A1 — Wer, Was, Wo, Wann, Wie, Warum, Wohin',
  description:
    'Las preguntas W del alemán (Wer, Was, Wo, Wann, Wie, Warum, Wie viel, Woher, Wohin) siguen una regla fija: la palabra W ocupa la primera posición y el verbo conjugado SIEMPRE va inmediatamente en segunda posición. Es la misma regla V2 que rige las frases declarativas.',
  lead: 'Las palabras W en alemán: el verbo siempre va en 2.ª posición, justo después de la W. Wer (quién), Was (qué), Wo (dónde), Wann (cuándo), Wie (cómo), Warum (por qué).',
  outcomes: [
    'Usas las 9 palabras W más frecuentes correctamente',
    'Aplicas la regla V2 en preguntas W (W + verbo + sujeto)',
    'Distingues preguntas W de preguntas Ja/Nein',
  ],

  guide: {
    goal: 'Formular preguntas con palabras W aplicando la regla V2.',
    model: 'Wo wohnst du? / Was machst du? / Wann kommst du?',
    formula: 'W-Wort + Verb (pos. 2) + Subjekt + Rest',
    decisions: [
      'Wer (quién) — persona: Wer ist das?',
      'Was (qué) — cosa/acción: Was machst du?',
      'Wo (dónde) — lugar estático: Wo wohnst du?',
      'Woher (de dónde) — origen: Woher kommst du?',
      'Wohin (a dónde) — dirección: Wohin fährst du?',
      'Wann (cuándo) — tiempo: Wann beginnt der Kurs?',
      'Wie (cómo) — modo/manera: Wie heißt du?',
      'Warum (por qué) — causa: Warum lernst du Deutsch?',
      'Wie viel/Wie viele (cuánto/cuántos): Wie viel kostet das?',
    ],
    table: [
      ['W-Wort', 'Significado', 'Ejemplo'],
      ['Wer', 'quién', 'Wer ist das?'],
      ['Was', 'qué', 'Was machst du?'],
      ['Wo', 'dónde', 'Wo wohnst du?'],
      ['Wann', 'cuándo', 'Wann kommst du?'],
      ['Wie', 'cómo', 'Wie heißt du?'],
      ['Warum', 'por qué', 'Warum lernst du?'],
    ],
    mistakes: [
      '"Wo du wohnst?" ❌ — el verbo siempre en 2.ª posición: "Wo wohnst du?" ✓',
      '"Was du machst?" ❌ — V2: "Was machst du?" ✓',
      '"Wohin gehst du hin?" ❌ — "wohin" ya incluye "hin", no se repite: "Wohin gehst du?" ✓',
    ],
  },

  seo: [
    {
      heading: 'Preguntas W: la regla V2 en acción',
      paragraphs: [
        'En las preguntas W alemanas, la palabra interrogativa ocupa siempre la primera posición (posición 1) y el verbo conjugado ocupa inmediatamente la segunda posición (posición 2). El sujeto queda en tercera posición: Wo [pos.1] wohnst [pos.2] du [pos.3]? Esta es exactamente la misma regla V2 de las oraciones declarativas.',
        'En español el orden es más libre: "¿Dónde vives tú?" o "¿Dónde tú vives?" son ambos posibles. En alemán la posición del verbo es obligatoria e inamovible en las preguntas directas.',
      ],
    },
    {
      heading: 'Wo, Woher, Wohin: el movimiento importa',
      paragraphs: [
        'El alemán distingue tres aspectos de "lugar": Wo (dónde = posición estática), Woher (de dónde = origen) y Wohin (a dónde = destino). Esta triada es esencial para evitar confusiones: Wo wohnst du? (¿Dónde vives?) vs. Wohin fährst du? (¿A dónde vas?) vs. Woher kommst du? (¿De dónde vienes?).',
        'El español solo usa "dónde" y "a dónde" (y raramente "de dónde" en lenguaje formal), mientras que el alemán tiene tres palabras distintas para cada función.',
      ],
    },
    {
      heading: 'Preguntas Ja/Nein vs. preguntas W',
      paragraphs: [
        'Las preguntas de sí/no (Ja/Nein-Fragen) empiezan directamente con el verbo: Wohnst du in Berlin? / Arbeitest du heute? El verbo va en primera posición porque no hay palabra W que lo preceda.',
        'Las preguntas W, en cambio, siempre tienen una palabra W en posición 1 y el verbo en posición 2. Esta distinción estructural es fundamental para el alemán A1 y no tiene paralelo exacto en español.',
      ],
    },
    {
      heading: 'Wie: mucho más que "cómo"',
      paragraphs: [
        '"Wie" es la W-palabra más versátil del alemán: Wie heißt du? (¿Cómo te llamas?), Wie alt bist du? (¿Cuántos años tienes?), Wie geht es dir? (¿Cómo estás?), Wie viel kostet das? (¿Cuánto cuesta?), Wie viele Sprachen sprichst du? (¿Cuántos idiomas hablas?).',
        'La combinación "Wie + adjetivo" permite preguntar características: Wie groß bist du? / Wie weit ist es? En A1 conviene memorizar como fórmulas fijas: Wie heißt du, Wie alt bist du, Wie viel kostet das.',
      ],
    },
  ],

  visual: {
    mode: 'paradigm',
    teacherLens: 'Las 9 W-Fragen con estructura V2: W + verbo + sujeto.',
    graphicPrompt: 'Tabla de palabras W con ejemplos de preguntas y estructura visual.',
    scene: [
      ['Wer? (quién)', 'Wer ist das? — ¿Quién es?'],
      ['Was? (qué)', 'Was machst du? — ¿Qué haces?'],
      ['Wo? (dónde)', 'Wo wohnst du? — ¿Dónde vives?'],
      ['Woher? (de dónde)', 'Woher kommst du? — ¿De dónde eres?'],
      ['Wohin? (a dónde)', 'Wohin fährst du? — ¿A dónde vas?'],
      ['Wann? (cuándo)', 'Wann beginnt der Kurs? — ¿Cuándo empieza?'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['V2: W + verbo + sujeto', 'Wo/Woher/Wohin', 'Wie = "cómo" y "cuánto"'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Nivel 1 — Erkennen',
        tag: 'Opción múltiple',
        intro: 'Elige la palabra W correcta para cada pregunta.',
        type: 'choice',
        items: [
          {
            scene: 'David quiere saber de dónde es un estudiante',
            lines: [['David', '___ kommst du?']],
            options: ['Woher', 'Wohin', 'Wo', 'Wann'],
            answer: 'Woher',
            explain: '"Woher" pregunta por el origen: Woher kommst du? = ¿De dónde vienes?',
          },
          {
            scene: 'Zhanna pregunta el nombre de un estudiante nuevo',
            lines: [['Zhanna', '___ heißt du?']],
            options: ['Wie', 'Was', 'Wer', 'Wo'],
            answer: 'Wie',
            explain: '"Wie heißt du?" = ¿Cómo te llamas? Es una fórmula fija con "wie".',
          },
          {
            scene: 'Carlos no sabe la hora de la clase',
            lines: [['Carlos', '___ beginnt der Kurs?']],
            options: ['Wann', 'Wie', 'Warum', 'Wer'],
            answer: 'Wann',
            explain: '"Wann" pregunta por el tiempo/hora: Wann beginnt der Kurs? = ¿Cuándo empieza el curso?',
          },
          {
            scene: 'Ana no reconoce a alguien',
            lines: [['Ana', '___ ist das?']],
            options: ['Wer', 'Was', 'Wie', 'Wo'],
            answer: 'Wer',
            explain: '"Wer" pregunta por personas: Wer ist das? = ¿Quién es eso?',
          },
          {
            scene: 'Sofía pregunta por el precio',
            lines: [['Sofía', '___ kostet das Buch?']],
            options: ['Wie viel', 'Wie viele', 'Was', 'Wann'],
            answer: 'Wie viel',
            explain: '"Wie viel" pregunta por cantidad/precio: Wie viel kostet das? = ¿Cuánto cuesta?',
          },
          {
            scene: 'Marco pregunta adónde va Lina',
            lines: [['Marco', '___ gehst du?']],
            options: ['Wohin', 'Wo', 'Woher', 'Wann'],
            answer: 'Wohin',
            explain: '"Wohin" pregunta por el destino: Wohin gehst du? = ¿A dónde vas?',
          },
          {
            scene: 'Zhanna pregunta la razón a Carlos',
            lines: [['Zhanna', '___ lernst du Deutsch?']],
            options: ['Warum', 'Wie', 'Was', 'Wo'],
            answer: 'Warum',
            explain: '"Warum" pregunta por la causa: Warum lernst du Deutsch? = ¿Por qué aprendes alemán?',
          },
          {
            scene: 'Lina pregunta qué estudia David',
            lines: [['Lina', '___ studierst du?']],
            options: ['Was', 'Wie', 'Wer', 'Wann'],
            answer: 'Was',
            explain: '"Was" pregunta por cosas/acciones: Was studierst du? = ¿Qué estudias?',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Nivel 2 — Orden de la pregunta',
        tag: '2 espacios',
        intro: 'Ordena la pregunta: elige el verbo y el sujeto en orden correcto (V2).',
        type: 'dual',
        items: [
          {
            scene: 'Preguntando dónde vive alguien',
            lines: [['', 'Wo [[0]] [[1]]?']],
            blanks: [
              { options: ['wohnst', 'wohne', 'wohnt', 'wohnen'], answer: 'wohnst', explain: 'Verbo en 2.ª posición: "wohnst".' },
              { options: ['du', 'er', 'ich', 'wir'], answer: 'du', explain: 'Sujeto en 3.ª posición: "du" para pregunta informal.' },
            ],
          },
          {
            scene: 'Preguntando cuándo empieza la clase',
            lines: [['', 'Wann [[0]] [[1]] Kurs?']],
            blanks: [
              { options: ['beginnt', 'beginne', 'beginnst', 'beginnen'], answer: 'beginnt', explain: '"Der Kurs" = er → "beginnt" en 2.ª posición.' },
              { options: ['der', 'die', 'das', 'ein'], answer: 'der', explain: '"Kurs" es masculino: "der Kurs". El artículo forma parte del sujeto.' },
            ],
          },
          {
            scene: 'Preguntando qué hace un amigo',
            lines: [['', 'Was [[0]] [[1]] heute?']],
            blanks: [
              { options: ['macht', 'machst', 'mache', 'machen'], answer: 'macht', explain: '"Er" (un amigo) → "macht" en 2.ª posición.' },
              { options: ['er', 'sie', 'du', 'ich'], answer: 'er', explain: 'Un amigo (masculino) = "er".' },
            ],
          },
          {
            scene: 'Preguntando por qué alguien aprende alemán',
            lines: [['', 'Warum [[0]] [[1]] Deutsch?']],
            blanks: [
              { options: ['lernst', 'lernt', 'lerne', 'lernen'], answer: 'lernst', explain: '"Du" → "lernst" en 2.ª posición.' },
              { options: ['du', 'er', 'sie', 'ihr'], answer: 'du', explain: 'Pregunta informal a una persona → "du".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Nivel 3 — Texto guiado',
        tag: 'Texto guiado',
        intro: 'Completa el diálogo con la palabra W o el verbo correcto.',
        type: 'guidedText',
        scene: 'Primera conversación entre David y un estudiante nuevo.',
        text: '[[0]] heißt du? — Ich heiße Carlos. [[1]] kommst du? — Aus Kolumbien. [[2]] wohnst du jetzt? — In Berlin. [[3]] lernst du Deutsch? — Für meinen Job. [[4]] alt bist du? — Ich bin 25. [[5]] [[6]] du Deutsch schon? (wie lange/sprechen)',
        blanks: [
          { options: ['Wie', 'Was', 'Wer', 'Wann'], answer: 'Wie', explain: '"Wie heißt du?" = ¿Cómo te llamas? Fórmula fija.' },
          { options: ['Woher', 'Wohin', 'Wo', 'Wann'], answer: 'Woher', explain: '"Woher kommst du?" = ¿De dónde vienes? Origen.' },
          { options: ['Wo', 'Wohin', 'Woher', 'Wann'], answer: 'Wo', explain: '"Wo wohnst du?" = ¿Dónde vives? Posición estática.' },
          { options: ['Warum', 'Wie', 'Was', 'Wer'], answer: 'Warum', explain: '"Warum lernst du?" = ¿Por qué aprendes? Causa.' },
          { options: ['Wie', 'Was', 'Wann', 'Wer'], answer: 'Wie', explain: '"Wie alt bist du?" = ¿Cuántos años tienes? Wie + adj.' },
          { options: ['Wie lange', 'Wie viel', 'Was', 'Woher'], answer: 'Wie lange', explain: '"Wie lange" = ¿Desde hace cuánto? Duración temporal.' },
          { options: ['sprichst', 'spricht', 'spreche', 'sprechen'], answer: 'sprichst', explain: '"Wie lange sprichst du Deutsch?" — V2: verbo en posición 2.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Nivel 4 — Texto libre',
        tag: 'Texto libre',
        intro: 'Escribe la palabra W correcta de memoria.',
        type: 'freeText',
        scene: 'Zhanna prepara una ficha de presentación de un nuevo estudiante.',
        text: '[[0]] heißt der Student? [[1]] kommt er? [[2]] wohnt er in Deutschland? [[3]] alt ist er? [[4]] spricht er schon Deutsch?',
        blanks: [
          { answer: 'Wie', accepted: ['Wie', 'wie'], explain: '"Wie heißt...?" = ¿Cómo se llama? Pregunta por nombre.' },
          { answer: 'Woher', accepted: ['Woher', 'woher'], explain: '"Woher kommt er?" = ¿De dónde viene? Origen.' },
          { answer: 'Wo', accepted: ['Wo', 'wo'], explain: '"Wo wohnt er?" = ¿Dónde vive? Posición estática.' },
          { answer: 'Wie', accepted: ['Wie', 'wie'], explain: '"Wie alt ist er?" = ¿Cuántos años tiene?' },
          { answer: 'Wie gut', accepted: ['Wie gut', 'wie gut', 'Wie', 'wie'], explain: '"Wie gut spricht er Deutsch?" = ¿Qué tan bien habla? O simplemente "Wie gut".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Nivel 5 — Producción',
        tag: 'Escritura libre',
        intro: 'Escribe preguntas completas con W-Wörter.',
        type: 'write',
        items: [
          {
            scene: 'Conociendo a alguien nuevo en WeLearn',
            prompt: 'Escribe 3 preguntas para conocer a alguien: nombre, origen y motivación para aprender alemán.',
            answer: 'Wie heißt du? Woher kommst du? Warum lernst du Deutsch?',
            accepted: ['wie heißt', 'woher kommst', 'warum lernst', 'wo wohnst', 'wie alt'],
            explain: 'Estructura V2: W + verbo + sujeto. Ej: Wie heißt du? / Woher kommst du? / Warum lernst du Deutsch?',
          },
          {
            scene: 'Preguntando sobre horarios y costes',
            prompt: 'Pregunta cuándo empieza el curso y cuánto cuesta.',
            answer: 'Wann beginnt der Kurs? Wie viel kostet er?',
            accepted: ['wann beginnt', 'wie viel kostet', 'wann fängt', 'wann ist'],
            explain: '"Wann beginnt der Kurs?" y "Wie viel kostet das/er?" — V2 en ambas.',
          },
          {
            scene: 'Preguntando por dirección',
            prompt: 'Pregunta dónde está la academia y a dónde va el autobús número 5.',
            answer: 'Wo ist die Akademie? Wohin fährt der Bus Nummer 5?',
            accepted: ['wo ist', 'wohin fährt', 'wo liegt', 'wohin geht'],
            explain: '"Wo" para posición estática, "wohin" para dirección/movimiento.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Nivel 6 — Tarea comunicativa',
        tag: 'Producción',
        intro: 'Escribe un mini-diálogo usando al menos 4 palabras W distintas.',
        type: 'write',
        items: [
          {
            scene: 'Primera conversación con un nuevo compañero de clase',
            prompt: 'Escribe 4 preguntas variadas para conocer a un nuevo compañero (usa al menos 4 W distintas).',
            answer: 'Wie heißt du? Woher kommst du? Wo wohnst du? Warum lernst du Deutsch?',
            accepted: ['wie', 'woher', 'wo ', 'wohin', 'wann', 'warum', 'was', 'wer', 'wie viel'],
            explain: 'Usa al menos 4 palabras W distintas. Recuerda siempre: W + verbo + sujeto.',
          },
          {
            scene: 'Planificando una salida con amigos',
            prompt: 'Escribe preguntas para organizar un plan: qué hacen, cuándo, dónde y cuánto cuesta.',
            answer: 'Was machen wir? Wann treffen wir uns? Wo essen wir? Wie viel kostet das Restaurant?',
            accepted: ['was ', 'wann ', 'wo ', 'wie viel', 'wohin ', 'warum '],
            explain: 'Las 4 preguntas organizativas: Was, Wann, Wo, Wie viel. Siempre V2.',
          },
          {
            scene: 'Entrevistando a David sobre su vida políglota',
            prompt: 'Escribe 3 preguntas interesantes para David sobre sus idiomas y experiencias.',
            answer: 'Wie viele Sprachen sprechen Sie? Warum lernen Sie so viele Sprachen? Wo haben Sie Arabisch gelernt?',
            accepted: ['wie viele', 'warum', 'wo ', 'wann ', 'wie ', 'was '],
            explain: 'Con David: usa "Sie" (formal). Estructura sigue igual: W + Verb + Sie.',
          },
        ],
      },
    ],
  },
}

export default topic
