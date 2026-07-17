import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'linking-words-b1',
  order: '20',
  color: '#dc2626',
  category: 'Writing',
  level: 'B1',
  title: 'Conectores y Cohesión en Inglés B1',
  shortTitle: 'Linking Words',
  metaTitle: 'Linking Words B1 — Conectores de adición, contraste, causa y resultado en inglés',
  description:
    'Los linking words (conectores) son esenciales para IELTS Writing, Cambridge y cualquier producción escrita o oral de nivel B1. Aprende a usar correctamente los conectores de adición, contraste, causa, resultado, propósito y ejemplificación para cohesionar tus textos.',
  lead: 'Domina los conectores esenciales del inglés B1 para escribir y hablar con fluidez y cohesión.',
  outcomes: [
    'Usas conectores de adición (furthermore, moreover, in addition, also)',
    'Distingues conectores de contraste (however, although, despite, on the other hand)',
    'Aplicas conectores de causa (because, since, as, due to) y resultado (therefore, as a result)',
    'Expresas propósito con in order to, so that, y das ejemplos con for instance, such as',
  ],

  guide: {
    goal: 'Usar conectores variados para cohesionar párrafos y expresar relaciones lógicas entre ideas.',
    model: 'Learning English is challenging. However, it opens many doors. Furthermore, it improves career prospects. Despite the difficulty, it is worth the effort.',
    formula: 'Idea 1 + linking word + Idea 2 (same sentence or new sentence)',
    decisions: [
      'Adición: also (posición media), in addition/furthermore/moreover (inicio de oración, más formal)',
      'Contraste: but (informal, medio de oración), however (inicio, necesita coma), although/even though (inicio o medio, NO coma separadora como however)',
      'Causa: because + cláusula; due to / because of + sustantivo/gerundio',
      'Resultado: so (informal), therefore/as a result/consequently (formal, inicio de oración)',
      'Propósito: to + infinitivo / in order to (más formal) / so that + sujeto + verbo',
      'Concesión: despite / in spite of + sustantivo/gerundio (NO + cláusula con sujeto); although + cláusula completa',
    ],
    table: [
      ['Función', 'Formal', 'Informal/Neutro'],
      ['Adición', 'Furthermore / Moreover', 'Also / And'],
      ['Contraste', 'However / Nevertheless', 'But / Although'],
    ],
    mistakes: [
      '"Despite she studied hard, she failed." ❌ → "Despite studying hard, she failed." / "Although she studied hard, she failed." ✓ — despite + gerundio/sustantivo, NOT cláusula.',
      '"He was tired, however he continued." ❌ → "He was tired. However, he continued." / "He was tired; however, he continued." ✓ — however separa oraciones completas, no va entre comas en medio de una.',
      '"Due to she was ill, she missed the exam." ❌ → "Due to her illness, she missed the exam." / "Because she was ill, she missed the exam." ✓ — due to + sustantivo, NOT cláusula.',
    ],
  },

  seo: [
    {
      heading: 'Conectores de adición: ampliar y enriquecer ideas',
      paragraphs: [
        'Los conectores de adición añaden información nueva que refuerza o amplía la idea anterior. En inglés B1 debes variar entre opciones formales e informales. Also va en posición media (después del verbo auxiliar o antes del verbo principal): "She also speaks French." In addition y Furthermore van al inicio de una oración nueva y son más formales: "Furthermore, learning a language improves cognitive skills."',
        'Moreover (todavía más enfático que furthermore) y besides (además de eso) también son útiles en writing formal. En speaking, "plus" y "on top of that" son más naturales: "It\'s cheaper. Plus, it\'s faster." Para IELTS Writing Band 7+, usa furthermore y moreover para mostrar rango léxico.',
      ],
      table: [
        ['Conector', 'Registro', 'Posición', 'Ejemplo'],
        ['also', 'neutro', 'medio de oración', 'It is fast and also affordable.'],
        ['in addition', 'formal', 'inicio', 'In addition, it creates jobs.'],
        ['furthermore', 'formal', 'inicio', 'Furthermore, the benefits are clear.'],
        ['moreover', 'muy formal', 'inicio', 'Moreover, evidence supports this view.'],
        ['besides', 'informal-neutro', 'inicio', 'Besides, nobody would disagree.'],
      ],
    },
    {
      heading: 'Conectores de contraste: but, however, although, despite',
      paragraphs: [
        '"But" es informal y va en el medio de la oración, conectando dos cláusulas: "It is expensive but worth it." "However" introduce una idea contraria en una oración nueva (o después de punto y coma) y va seguido de coma: "The course is expensive. However, the results are excellent." / "The course is expensive; however, the results are excellent."',
        '"Although" y "even though" introducen una cláusula subordinada de contraste y pueden ir al inicio o en el medio: "Although the course was expensive, she enrolled." / "She enrolled, although the course was expensive." "Despite" y "in spite of" van seguidos de sustantivo o gerundio (NO cláusula): "Despite the high cost, she enrolled." / "Despite being expensive, the course was worth it."',
      ],
    },
    {
      heading: 'Causa y resultado: because, due to, therefore, as a result',
      paragraphs: [
        'Para expresar causa: "because + cláusula" (informal y formal): "She failed because she didn\'t study." "Since" y "as" también expresan causa pero son más formales: "Since the exam was difficult, many students failed." "Due to" y "because of" van seguidos de sustantivo/gerundio: "Due to the heavy rain, the match was cancelled." / "Because of studying every day, her English improved."',
        'Para expresar resultado: "so" es informal (medio de oración): "It was raining, so we stayed inside." "Therefore", "as a result" y "consequently" son formales y van al inicio de una nueva oración: "The economy grew. As a result, unemployment fell." / "He worked hard. Therefore, he got the promotion." Estos son esenciales para IELTS Writing Task 2.',
      ],
    },
    {
      heading: 'Propósito, ejemplificación y secuencia',
      paragraphs: [
        'Para propósito: "to + infinitivo" o "in order to + infinitivo" (más formal): "I study every day to improve my English." / "She takes notes in order to remember the vocabulary." "So that + sujeto + verbo" cuando el sujeto cambia: "She speaks slowly so that students can understand."',
        'Para ejemplos: "for example" y "for instance" van al inicio de oración o entre comas: "There are many ways to learn English. For instance, you can watch series, listen to podcasts or take a class." "Such as" va inmediatamente antes de los ejemplos sin coma: "Some languages, such as Chinese and Arabic, use different writing systems." Para secuencia: first/firstly, secondly, then, next, finally, lastly.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Conectores de adición, contraste, causa, resultado, propósito y ejemplificación para writing y speaking B1.',
    graphicPrompt: 'Mapa conceptual con flechas de colores: adición (verde), contraste (rojo), causa-resultado (naranja), propósito (azul).',
    scene: [
      ['Learning English is hard work. However, the rewards are enormous.', 'Aprender inglés es mucho trabajo. Sin embargo, las recompensas son enormes.'],
      ['She studies every morning in order to be ready for the IELTS.', 'Estudia cada mañana para estar lista para el IELTS.'],
      ['Despite having little time, she managed to improve her speaking.', 'A pesar de tener poco tiempo, logró mejorar su expresión oral.'],
      ['He practises every day; therefore, his pronunciation is getting better.', 'Practica todos los días; por lo tanto, su pronunciación está mejorando.'],
      ['There are many benefits. Furthermore, the cost is quite reasonable.', 'Hay muchos beneficios. Además, el costo es bastante razonable.'],
      ['Although it was difficult, she passed the exam on her first attempt.', 'Aunque fue difícil, aprobó el examen en su primer intento.'],
      ['Due to its global importance, English is taught in most schools worldwide.', 'Debido a su importancia global, el inglés se enseña en la mayoría de las escuelas del mundo.'],
      ['There are various approaches, such as immersion, apps and conversation groups.', 'Hay varios enfoques, como la inmersión, las aplicaciones y los grupos de conversación.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['addition: also/furthermore/moreover', 'contrast: however/although/despite', 'cause: because/due to', 'result: therefore/as a result', 'purpose: in order to/so that'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el linking word más apropiado para cada contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Argumentando una ventaja',
            lines: [['', 'Learning English opens career opportunities. ___, it allows you to communicate with people worldwide.']],
            options: ['Furthermore', 'Despite', 'Because', 'Although'],
            answer: 'Furthermore',
            explain: '"Furthermore" añade otro beneficio adicional. Es formal y adecuado para writing académico.',
          },
          {
            scene: 'Un contraste',
            lines: [['', '___ the course was expensive, she decided to enroll.']],
            options: ['Although', 'Despite', 'However', 'Due to'],
            answer: 'Although',
            explain: '"Although + cláusula completa" expresa contraste. La oración tiene sujeto y verbo (the course was expensive).',
          },
          {
            scene: 'Una causa',
            lines: [['', 'She improved rapidly ___ her illness, she could not attend every session.']],
            options: ['Due to', 'Despite', 'Therefore', 'However'],
            answer: 'Despite',
            explain: '"Despite" = a pesar de. "Despite her illness, she could not..." — pero espera, la causa aquí es un contraste. La oración dice "mejoró rápidamente a pesar de su enfermedad".',
          },
          {
            scene: 'Un resultado',
            lines: [['', 'He studied twelve hours a day for three months. ___, he passed the IELTS with a band 8.']],
            options: ['As a result', 'Although', 'Despite', 'In addition'],
            answer: 'As a result',
            explain: '"As a result" introduce el resultado de una acción. Formal, inicio de oración, seguido de coma.',
          },
          {
            scene: 'Un propósito',
            lines: [['', 'She speaks slowly ___ her students can understand every word.']],
            options: ['so that', 'in order to', 'because', 'therefore'],
            answer: 'so that',
            explain: '"So that + sujeto + verbo" expresa propósito cuando el sujeto de las dos cláusulas es diferente (she / her students).',
          },
          {
            scene: 'Un ejemplo',
            lines: [['', 'There are many effective ways to improve your listening, ___ watching films in English with subtitles.']],
            options: ['such as', 'for example,', 'therefore', 'although'],
            answer: 'such as',
            explain: '"Such as" va antes de ejemplos específicos sin coma previa dentro de la oración. "For example" va al inicio de una oración nueva.',
          },
          {
            scene: 'Una causa formal',
            lines: [['', 'The event was cancelled ___ the heavy rain.']],
            options: ['due to', 'because', 'although', 'so that'],
            answer: 'due to',
            explain: '"Due to + sustantivo/gerundio". "due to the heavy rain" = el sustantivo es "the heavy rain". NO "due to it rained heavily".',
          },
          {
            scene: 'Contraste entre oraciones',
            lines: [['', 'The test was very hard. ___, most students managed to pass.']],
            options: ['However', 'Although', 'Despite', 'Because'],
            answer: 'However',
            explain: '"However" al inicio de una nueva oración introduce contraste. Siempre va seguido de coma: "However, most students..."',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Conecta las ideas',
        tag: '2 espacios',
        intro: 'Completa con el conector correcto para cada espacio.',
        type: 'dual',
        items: [
          {
            scene: 'Ventajas de aprender coreano',
            lines: [['', 'Korean is a fascinating language. [[0]], it is very logical in structure. [[1]], it gives access to Korean culture, film and music.']],
            blanks: [
              { options: ['Furthermore', 'Despite', 'Because', 'However'], answer: 'Furthermore', explain: '"Furthermore" añade otro punto positivo en la misma línea argumental.' },
              { options: ['In addition', 'Although', 'Due to', 'Nevertheless'], answer: 'In addition', explain: '"In addition" añade un tercer beneficio. Similar a furthermore pero puede ir también en posición media.' },
            ],
          },
          {
            scene: 'Un argumento equilibrado',
            lines: [['', 'Online learning is flexible and affordable. [[0]], some students find it difficult to stay motivated. [[1]] these challenges, many people are choosing it.']],
            blanks: [
              { options: ['However', 'Furthermore', 'Therefore', 'Such as'], answer: 'However', explain: '"However" introduce el contrapunto o desventaja. Inicio de oración + coma.' },
              { options: ['Despite', 'Although', 'Because', 'In addition'], answer: 'Despite', explain: '"Despite + sustantivo/gerundio": "Despite these challenges..." No se puede usar "although" aquí porque "challenges" es un sustantivo solo.' },
            ],
          },
          {
            scene: 'Causa y resultado',
            lines: [['', '[[0]] the increasing demand for English speakers, many companies now offer language training to their employees. [[1]], employee engagement and retention have improved.']],
            blanks: [
              { options: ['Due to', 'Despite', 'Although', 'Therefore'], answer: 'Due to', explain: '"Due to + sustantivo": "Due to the increasing demand" — la causa es un sustantivo.' },
              { options: ['As a result', 'However', 'Although', 'Despite'], answer: 'As a result', explain: '"As a result" introduce la consecuencia. Formal, inicio de nueva oración.' },
            ],
          },
          {
            scene: 'Propósito y ejemplo',
            lines: [['', 'She practises speaking every day [[0]] gain confidence before her IELTS exam. There are many resources she uses, [[1]] podcasts, YouTube channels and language exchange apps.']],
            blanks: [
              { options: ['in order to', 'so that', 'because', 'despite'], answer: 'in order to', explain: '"In order to + infinitivo": propósito formal. El sujeto es el mismo en ambas partes.' },
              { options: ['such as', 'for example', 'therefore', 'however'], answer: 'such as', explain: '"Such as" introduce ejemplos específicos dentro de la misma oración, sin coma previa.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un párrafo de IELTS Writing',
        tag: 'Texto guiado',
        intro: 'Completa el párrafo de estilo IELTS con los conectores correctos.',
        type: 'guidedText',
        scene: 'Completa el párrafo con el linking word más apropiado.',
        text: 'There are several compelling reasons why learning a second language is beneficial. [[0]], it enhances cognitive abilities such as memory and problem-solving skills. [[1]], it provides access to new cultures and perspectives. [[2]] living in a monolingual world has its advantages, the ability to communicate in multiple languages is increasingly valuable. [[3]] the growing importance of global communication, multilingualism is becoming a key skill in the job market. [[4]], many employers now consider language skills a significant advantage when hiring new staff. [[5]] expand one\'s opportunities, learning a language is an investment that pays dividends throughout life.',
        blanks: [
          { options: ['Firstly', 'However', 'Despite', 'Due to'], answer: 'Firstly', explain: '"Firstly" inicia una secuencia argumentativa. Formal, inicio de párrafo.' },
          { options: ['Furthermore', 'Although', 'Because', 'Despite'], answer: 'Furthermore', explain: '"Furthermore" añade un segundo argumento en la misma línea. Formal y apropiado para IELTS.' },
          { options: ['Although', 'Despite', 'However', 'Because'], answer: 'Although', explain: '"Although + cláusula completa" (sujeto + verbo). Expresa contraste dentro de la oración.' },
          { options: ['Due to', 'Despite', 'Although', 'Therefore'], answer: 'Due to', explain: '"Due to + sustantivo": "Due to the growing importance of global communication".' },
          { options: ['As a result', 'In contrast', 'Although', 'Despite'], answer: 'As a result', explain: '"As a result" introduce la consecuencia lógica de lo dicho. Formal.' },
          { options: ['In order to', 'So that', 'Because', 'Although'], answer: 'In order to', explain: '"In order to + infinitivo": propósito formal. Aquí: "In order to expand one\'s opportunities".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa el texto',
        tag: 'Texto libre',
        intro: 'Escribe el linking word más apropiado para cada espacio.',
        type: 'freeText',
        scene: 'Completa con el conector más adecuado.',
        text: 'Technology has transformed language learning. [[0]], students can now access native speakers through video calls. [[1]] the internet, learning has become more accessible than ever. [[2]] it can be isolating to study online, the flexibility it provides is undeniable. [[3]], many learners have achieved fluency without ever leaving their country. There are also great apps, [[4]] Duolingo and AnkiApp, that help with vocabulary practice.',
        blanks: [
          { answer: 'Furthermore', accepted: ['Furthermore', 'In addition', 'Moreover', 'For instance'], explain: 'Conectores de adición: Furthermore / In addition / Moreover — formal, inicio de oración.' },
          { answer: 'Due to', accepted: ['Due to', 'Because of', 'Thanks to'], explain: '"Due to / Because of + sustantivo": "Due to the internet" — causa expresada como sustantivo.' },
          { answer: 'Although', accepted: ['Although', 'Even though', 'While'], explain: '"Although + cláusula completa": contraste. La oración tiene sujeto (it) + verbo (can be).' },
          { answer: 'As a result', accepted: ['As a result', 'Therefore', 'Consequently'], explain: 'Resultado de la flexibilidad del aprendizaje online → "As a result, many learners have achieved..."' },
          { answer: 'such as', accepted: ['such as', 'like', 'for example'], explain: '"Such as" para dar ejemplos específicos dentro de la oración, sin coma previa antes de "such".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando los conectores indicados.',
        type: 'write',
        items: [
          {
            scene: 'Ventajas de aprender inglés',
            prompt: 'Escribe dos oraciones sobre las ventajas de aprender inglés usando "furthermore" o "in addition".',
            answer: 'Learning English improves career prospects. Furthermore, it allows you to connect with people from around the world.',
            accepted: ['furthermore', 'in addition', 'moreover', 'additionally'],
            explain: '"Furthermore/In addition" = conectores de adición formales. Van al inicio de la segunda oración + coma.',
          },
          {
            scene: 'Un contraste real',
            prompt: 'Escribe una oración usando "although" o "despite" para expresar un contraste sobre el aprendizaje de idiomas.',
            answer: 'Despite the challenges, learning a new language is one of the most rewarding things you can do.',
            accepted: ['although', 'despite', 'even though', 'however'],
            explain: 'Although + cláusula (sujeto + verbo). Despite + sustantivo o gerundio (NO cláusula completa).',
          },
          {
            scene: 'Causa y efecto',
            prompt: 'Escribe una oración de causa con "because" o "due to" y una de resultado con "therefore" o "as a result".',
            answer: 'Due to the global demand for English speakers, many people are investing in language courses. As a result, the language learning industry has grown significantly.',
            accepted: ['due to', 'because of', 'because', 'therefore', 'as a result', 'consequently'],
            explain: 'Due to / because of + sustantivo. Because + cláusula. Therefore / As a result + inicio de nueva oración.',
          },
          {
            scene: 'Un propósito claro',
            prompt: 'Explica por qué estudias inglés usando "in order to" o "so that".',
            answer: 'I study English in order to communicate confidently in international business settings.',
            accepted: ['in order to', 'so that', 'to improve', 'to be able', 'to communicate', 'to open'],
            explain: '"In order to + infinitivo" (mismo sujeto, formal). "So that + sujeto + verbo" (diferente sujeto o más formal).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Un mini-párrafo de IELTS',
        tag: 'Producción libre',
        intro: 'Escribe un mini-párrafo de 4-5 oraciones usando al menos 4 tipos diferentes de linking words.',
        type: 'write',
        items: [
          {
            scene: 'Ventajas y desventajas',
            prompt: 'Escribe 2-3 oraciones sobre una ventaja del aprendizaje online usando although o however y furthermore.',
            answer: 'Online learning offers great flexibility. However, it requires strong self-discipline. Furthermore, it provides access to world-class resources that might not be available locally.',
            accepted: ['however', 'although', 'furthermore', 'in addition', 'moreover', 'despite', 'nevertheless'],
            explain: 'Contraste con however/although + adición con furthermore/in addition. Estos conectores son clave en IELTS Writing.',
          },
          {
            scene: 'Causa y resultado',
            prompt: 'Escribe una mini-cadena lógica: una causa, una consecuencia y un ejemplo (usa due to/because + therefore/as a result + such as/for instance).',
            answer: 'Due to the growth of global business, English has become the language of international trade. As a result, professionals who speak English fluently have more career opportunities. For instance, multinational companies often require English for senior positions.',
            accepted: ['due to', 'because', 'as a result', 'therefore', 'for instance', 'for example', 'such as'],
            explain: 'Cadena lógica: causa → resultado → ejemplo. Usa linking words diferentes para cada paso.',
          },
          {
            scene: 'Tu opinión sobre los idiomas',
            prompt: 'Escribe tu opinión sobre la importancia de aprender idiomas usando al menos 3 linking words diferentes (contraste, adición y resultado o causa).',
            answer: 'Although learning a language takes years of practice, the benefits are enormous. Furthermore, it improves cognitive skills. Due to globalisation, speaking more than one language has become a significant advantage. As a result, more people are investing time and money in language education.',
            accepted: ['although', 'however', 'furthermore', 'in addition', 'due to', 'because', 'as a result', 'therefore', 'despite'],
            explain: 'Objetivo: variedad de conectores. Elige uno de contraste (although/however), uno de adición (furthermore/in addition) y uno de causa o resultado.',
          },
        ],
      },
    ],
  },
}

export default topic
