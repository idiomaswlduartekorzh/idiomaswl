import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'reported-speech-b1',
  order: '12',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Reported Speech en Inglés B1',
  shortTitle: 'Reported Speech',
  metaTitle: 'Reported Speech B1 — Estilo indirecto en inglés: backshift y cambios pronominales',
  description:
    'El reported speech (estilo indirecto) permite reportar lo que alguien dijo sin usar sus palabras exactas. En B1 debes dominar el backshift verbal (retroceso de tiempos), los cambios de pronombres y las expresiones de tiempo. Es esencial para IELTS, Cambridge y exámenes de inglés.',
  lead: 'Domina el estilo indirecto para reportar conversaciones, noticias y entrevistas con precisión en inglés B1.',
  outcomes: [
    'Aplicas el backshift verbal correcto al transformar discurso directo a indirecto',
    'Cambias pronombres y expresiones de tiempo correctamente',
    'Reportas preguntas de sí/no con if/whether y preguntas con pronombre interrogativo',
    'Usas verbos de reporte como say, tell, ask, warn, promise y recommend',
  ],

  guide: {
    goal: 'Transformar discurso directo a indirecto aplicando backshift, cambios pronominales y de tiempo.',
    model: '"I am tired." → She said she was tired. / "Did you pass?" → He asked if I had passed.',
    formula: 'Subject + reporting verb + (that) + backshifted clause / Subject + asked + if/wh-word + backshifted clause',
    decisions: [
      'Backshift: present simple → past simple; past simple → past perfect; will → would; can → could; must → had to',
      'Pronombres: I → he/she; we → they; you → I/he/she; my → his/her; our → their',
      'Expresiones de tiempo: today → that day; yesterday → the day before; tomorrow → the next day; now → then; here → there',
      'say vs tell: say (no objeto directo) → She said she was tired. / tell + persona → She told me she was tired.',
      'Preguntas sí/no → asked + if/whether + sujeto + verbo (sin inversión)',
      'Preguntas con wh- → asked + pronombre interrogativo + sujeto + verbo (sin inversión)',
    ],
    table: [
      ['Discurso directo', 'Backshift', 'Discurso indirecto'],
      ['"I am happy."', 'am → was', 'She said she was happy.'],
      ['"I will call you."', 'will → would', 'He said he would call me.'],
    ],
    mistakes: [
      '"She said me she was tired." ❌ → "She told me she was tired." ✓ — tell siempre va con objeto: told me/him/her/them.',
      '"He asked where was she." ❌ → "He asked where she was." ✓ — en reported questions no hay inversión sujeto-verbo.',
      '"She said she is coming." ❌ → "She said she was coming." ✓ — aplica el backshift correctamente.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el reported speech y por qué es clave en B1?',
      paragraphs: [
        'El reported speech (estilo indirecto) es la forma de reportar lo que alguien dijo usando nuestras propias palabras, sin repetir exactamente sus palabras. En lugar de "She said: \'I am tired\'", decimos "She said she was tired."',
        'En el nivel B1 es fundamental porque aparece en textos periodísticos, entrevistas, narraciones y en los exámenes Cambridge PET, IELTS y TOEFL. Dominar el backshift y los cambios pronominales marca la diferencia entre un nivel B1 básico y uno sólido.',
      ],
    },
    {
      heading: 'El backshift: retroceso de tiempos verbales',
      paragraphs: [
        'La regla principal del reported speech es el backshift: los tiempos verbales "retroceden" un paso en el pasado. Present simple → past simple ("I work" → "she worked"). Past simple → past perfect ("I worked" → "he had worked"). Will → would ("I will help" → "she said she would help"). Can → could, must → had to.',
        'El backshift ocurre cuando el verbo de reporte está en pasado (said, told, asked). Si el verbo de reporte está en presente (says, tells), no hay backshift: "She says she is tired." (presente) vs "She said she was tired." (pasado).',
      ],
      table: [
        ['Directo', 'Indirecto (backshift)', 'Cambio'],
        ['I am studying.', 'She said she was studying.', 'present → past'],
        ['I passed the exam.', 'He said he had passed the exam.', 'past simple → past perfect'],
        ['I will call tomorrow.', 'She said she would call the next day.', 'will → would'],
        ['I can help you.', 'He said he could help me.', 'can → could'],
      ],
    },
    {
      heading: 'Cambios de pronombres y expresiones de tiempo',
      paragraphs: [
        'Los pronombres cambian según el contexto: I → he/she, we → they, you → I (si la persona reportada te hablaba a ti), my → his/her, our → their. Siempre piensa quién está hablando y quién está escuchando.',
        'Las expresiones de tiempo también cambian: today → that day, yesterday → the day before / the previous day, tomorrow → the next day / the following day, now → then, here → there, last week → the week before, next year → the following year.',
      ],
    },
    {
      heading: 'Reported questions: preguntas en estilo indirecto',
      paragraphs: [
        'Las preguntas reportadas tienen una estructura diferente: NO hay inversión sujeto-verbo, y llevan un auxiliar como en una oración afirmativa. Para preguntas de sí/no, se usa if o whether: "Are you coming?" → He asked if she was coming / whether she was coming.',
        'Para preguntas con pronombre interrogativo (who, what, where, when, why, how), el pronombre interrogativo introduce la cláusula: "Where do you live?" → She asked where I lived. Nota: "do/does/did" desaparece en el estilo indirecto.',
      ],
    },
    {
      heading: 'Verbos de reporte más allá de say y tell',
      paragraphs: [
        'En B1 debes conocer más verbos de reporte: warn + not to (advertir): "He warned me not to be late." / promise + to (prometer): "She promised to help." / recommend + -ing (recomendar): "The guide recommended visiting the museum." / refuse + to (negarse): "He refused to sign the contract."',
        'Estos verbos tienen estructuras propias: ask + to-infinitive para órdenes ("She asked me to close the window." = "Could you close the window?"); advise + to-infinitive para consejos ("The doctor advised me to rest more.").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Reported speech con backshift completo, cambios pronominales y preguntas indirectas en contexto real.',
    graphicPrompt: 'Dos burbujas de diálogo: una con el discurso directo y una flecha que lleva al discurso indirecto.',
    scene: [
      ['"I love this city." → She said she loved that city.', '"Me encanta esta ciudad." → Dijo que le encantaba esa ciudad.'],
      ['"We will arrive tomorrow." → They said they would arrive the next day.', '"Llegaremos mañana." → Dijeron que llegarían al día siguiente.'],
      ['"Did you pass the test?" → She asked if I had passed the test.', '"¿Pasaste el examen?" → Preguntó si yo había pasado el examen.'],
      ['"Where do you study?" → He asked where I studied.', '"¿Dónde estudias?" → Preguntó dónde estudiaba yo.'],
      ['"I can help you." → She said she could help me.', '"Puedo ayudarte." → Dijo que podía ayudarme.'],
      ['"Don\'t be late!" → He warned me not to be late.', '"¡No llegues tarde!" → Me advirtió que no llegara tarde.'],
      ['"I must finish the report." → She said she had to finish the report.', '"Debo terminar el informe." → Dijo que tenía que terminar el informe.'],
      ['"I passed!" → He told me he had passed.', '"¡Pasé!" → Me dijo que había pasado.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['say', 'tell', 'ask', 'warn', 'promise', 'advise', 'recommend', 'refuse'],
    reviewFocus: ['backshift', 'pronoun changes', 'time expressions', 'reported questions', 'say vs tell'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica el backshift correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de reported speech para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'En la clase de inglés',
            lines: [['Teacher (direct):', '"The exam is next Friday."'], ['Reported:', 'The teacher said the exam ___ the following Friday.']],
            options: ['was', 'is', 'were', 'will be'],
            answer: 'was',
            explain: 'present simple (is) → past simple (was) con backshift. "is next Friday" → "was the following Friday".',
          },
          {
            scene: 'Noticias del trabajo',
            lines: [['Colleague (direct):', '"I will send you the report."'], ['Reported:', 'She said she ___ me the report.']],
            options: ['would send', 'will send', 'sends', 'sent'],
            answer: 'would send',
            explain: 'will → would en backshift: "I will send" → "she would send".',
          },
          {
            scene: 'Conversación de familia',
            lines: [['Brother:', '"I passed all my exams!"'], ['Reported:', 'He told us he ___ all his exams.']],
            options: ['had passed', 'passed', 'has passed', 'pass'],
            answer: 'had passed',
            explain: 'past simple (passed) → past perfect (had passed) en backshift.',
          },
          {
            scene: 'Un aviso importante',
            lines: [['Manager:', '"You must finish the project today."'], ['Reported:', 'The manager told us we ___ the project that day.']],
            options: ['had to finish', 'must finish', 'have to finish', 'would finish'],
            answer: 'had to finish',
            explain: 'must → had to en backshift cuando se reporta en pasado.',
          },
          {
            scene: 'Say o Tell',
            lines: [['', '"I am ready." — direct speech'], ['Reported:', 'She ___ she was ready.']],
            options: ['said', 'told', 'said me', 'told to'],
            answer: 'said',
            explain: 'say no lleva objeto directo de persona: She said she was ready. (NO "said me").',
          },
          {
            scene: 'Pregunta reportada',
            lines: [['Friend:', '"Do you like Bogotá?"'], ['Reported:', 'She asked me if I ___ Bogotá.']],
            options: ['liked', 'like', 'do like', 'liking'],
            answer: 'liked',
            explain: 'Pregunta de sí/no → asked if + sujeto + verbo backshifted: asked if I liked.',
          },
          {
            scene: 'Pregunta de lugar',
            lines: [['Tourist:', '"Where is the metro station?"'], ['Reported:', 'She asked where the metro station ___.']],
            options: ['was', 'is', 'were', 'had been'],
            answer: 'was',
            explain: 'Pregunta wh- → asked where + sujeto + verbo backshifted. Sin inversión sujeto-verbo.',
          },
          {
            scene: 'Promesa',
            lines: [['Dario:', '"I will help you prepare for the IELTS."'], ['Reported:', 'Dario promised ___ me prepare for the IELTS.']],
            options: ['to help', 'helping', 'help', 'helped'],
            answer: 'to help',
            explain: 'promise + to-infinitive: "promised to help" — estructura fija del verbo de reporte.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Transforma el discurso directo',
        tag: '2 espacios',
        intro: 'Completa el reported speech con los cambios de backshift y pronombres correctos.',
        type: 'dual',
        items: [
          {
            scene: 'Una noticia de trabajo',
            lines: [['Direct:', '"I am looking for a new job." (Carlos said)'], ['Reported:', 'Carlos said he [[0]] for a new [[1]].']],
            blanks: [
              { options: ['was looking', 'is looking', 'were looking', 'has looked'], answer: 'was looking', explain: 'present continuous (am looking) → past continuous (was looking) + pronombre I → he.' },
              { options: ['job', 'work', 'career', 'position'], answer: 'job', explain: 'El sustantivo "job" se mantiene igual en reported speech.' },
            ],
          },
          {
            scene: 'Una pregunta difícil',
            lines: [['Direct:', '"Can you speak Portuguese?" (The interviewer asked Maria)'], ['Reported:', 'The interviewer asked Maria if she [[0]] speak [[1]].']],
            blanks: [
              { options: ['could', 'can', 'would', 'will'], answer: 'could', explain: 'can → could en backshift: "Can you" → "if she could".' },
              { options: ['Portuguese', 'Spanish', 'English', 'French'], answer: 'Portuguese', explain: 'El idioma mencionado en la pregunta original es Portuguese.' },
            ],
          },
          {
            scene: 'Un consejo médico',
            lines: [['Direct:', '"You must rest and drink more water." (The doctor told her)'], ['Reported:', 'The doctor told her she [[0]] rest and drink more [[1]].']],
            blanks: [
              { options: ['had to', 'must', 'should', 'would'], answer: 'had to', explain: 'must → had to en backshift: "You must rest" → "she had to rest".' },
              { options: ['water', 'juice', 'coffee', 'tea'], answer: 'water', explain: 'El sustantivo "water" se mantiene del discurso original.' },
            ],
          },
          {
            scene: 'Pregunta sobre planes',
            lines: [['Direct:', '"Where are you going for your holidays?" (She asked me)'], ['Reported:', 'She asked me where I [[0]] for my [[1]].']],
            blanks: [
              { options: ['was going', 'am going', 'went', 'would go'], answer: 'was going', explain: 'present continuous (are going) → past continuous (was going). "you" → "I".' },
              { options: ['holidays', 'holiday', 'vacation', 'break'], answer: 'holidays', explain: '"holidays" se mantiene del original.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La entrevista de trabajo',
        tag: 'Texto guiado',
        intro: 'Completa el reported speech de esta entrevista de trabajo.',
        type: 'guidedText',
        scene: 'Convierte la entrevista de trabajo a estilo indirecto.',
        text: 'During the interview, the manager said the company [[0]] (is) growing fast. She asked me if I [[1]] (have) experience with data analysis. I said I [[2]] (have worked) with Excel and Python. She told me they [[3]] (will offer) a decision the following week. She also warned me not [[4]] (be) late for the second interview. She said she [[5]] (can) see potential in my profile. Finally, she asked where I [[6]] (see) myself in five years.',
        blanks: [
          { options: ['was', 'is', 'were', 'had been'], answer: 'was', explain: 'present simple "is" → past simple "was" con backshift.' },
          { options: ['had', 'have', 'having', 'has'], answer: 'had', explain: 'present simple "have" → past simple "had" con backshift.' },
          { options: ['had worked', 'worked', 'have worked', 'was working'], answer: 'had worked', explain: 'past simple/present perfect → past perfect: "had worked".' },
          { options: ['would offer', 'will offer', 'offers', 'offered'], answer: 'would offer', explain: 'will → would en backshift: "will offer" → "would offer".' },
          { options: ['to be', 'being', 'be', 'been'], answer: 'to be', explain: 'warn + not to + infinitivo: "warned me not to be late".' },
          { options: ['could', 'can', 'would', 'might'], answer: 'could', explain: 'can → could en backshift: "She can see" → "she could see".' },
          { options: ['saw', 'see', 'was seeing', 'had seen'], answer: 'saw', explain: 'Pregunta wh- en pasado: "where I saw myself" (backshift de "see" → "saw").' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el reported speech',
        tag: 'Texto libre',
        intro: 'Transforma las oraciones de discurso directo a indirecto escribiendo la forma correcta.',
        type: 'freeText',
        scene: 'Escribe la forma verbal correcta para el reported speech de cada oración.',
        text: 'Direct: "I am preparing for the IELTS exam." (Ana said) → Ana said she [[0]] for the IELTS exam.\nDirect: "We will finish the project tomorrow." (They said) → They said they [[1]] the project the following day.\nDirect: "Did you study abroad?" (She asked him) → She asked if he [[2]] abroad.\nDirect: "You must submit the form today." (The office told us) → The office told us we [[3]] the form that day.\nDirect: "I can speak three languages." (He said) → He said he [[4]] three languages.',
        blanks: [
          { answer: 'was preparing', accepted: ['was preparing'], explain: 'present continuous → past continuous: "am preparing" → "was preparing".' },
          { answer: 'would finish', accepted: ['would finish'], explain: 'will → would: "will finish" → "would finish".' },
          { answer: 'had studied', accepted: ['had studied'], explain: 'past simple → past perfect: "Did you study" → "if he had studied".' },
          { answer: 'had to submit', accepted: ['had to submit'], explain: 'must → had to: "must submit" → "had to submit".' },
          { answer: 'could speak', accepted: ['could speak'], explain: 'can → could: "can speak" → "could speak".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Reporta la conversación',
        tag: 'Producción',
        intro: 'Escribe el reported speech completo de cada situación.',
        type: 'write',
        items: [
          {
            scene: 'En la academia de idiomas',
            prompt: 'Tu profesor dijo: "You are making excellent progress." Reporta lo que dijo usando told.',
            answer: 'My teacher told me I was making excellent progress.',
            accepted: ['told me i was making', 'told us we were making', 'said i was making', 'said we were making'],
            explain: 'Backshift: am making → was making. Pronombre: you → I. Usa told + persona para tell.',
          },
          {
            scene: 'Planes de viaje',
            prompt: 'Tu amiga dijo: "I\'m going to visit Cartagena next month." Reporta lo que dijo.',
            answer: 'She said she was going to visit Cartagena the following month.',
            accepted: ['said she was going to visit', 'told me she was going to visit', 'said she would visit'],
            explain: 'Backshift: am going → was going. Cambio de tiempo: next month → the following month.',
          },
          {
            scene: 'Pregunta sobre el examen',
            prompt: 'Tu compañero te preguntó: "Have you registered for the TOEFL?" Reporta la pregunta.',
            answer: 'He asked me if I had registered for the TOEFL.',
            accepted: ['asked if i had registered', 'asked whether i had registered', 'asked me if i had registered'],
            explain: 'Pregunta de sí/no → asked if + sujeto + had + participio (backshift de present perfect → past perfect).',
          },
          {
            scene: 'Advertencia',
            prompt: 'La profesora advirtió: "Don\'t use your phone during the exam." Reporta la advertencia.',
            answer: 'The teacher warned us not to use our phones during the exam.',
            accepted: ['warned us not to use', 'told us not to use', 'warned me not to use'],
            explain: 'warn/tell + persona + not to + infinitivo para órdenes negativas reportadas.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Reporta una entrevista',
        tag: 'Producción libre',
        intro: 'Imagina que entrevistaste a alguien interesante. Reporta 3 cosas que dijo.',
        type: 'write',
        items: [
          {
            scene: 'Una declaración',
            prompt: 'Reporta algo positivo que dijo la persona entrevistada (usa said + that + backshift).',
            answer: 'She said that learning English had changed her life completely.',
            accepted: ['said that', 'said she', 'said he', 'said they'],
            explain: 'Usa: He/She said (that) + oración con backshift. That es opcional pero formal.',
          },
          {
            scene: 'Una pregunta que le hiciste',
            prompt: 'Reporta una pregunta que tú le hiciste durante la entrevista (usa asked + if/where/what/how).',
            answer: 'I asked how she had learned to speak four languages.',
            accepted: ['asked how', 'asked what', 'asked where', 'asked if', 'asked whether', 'asked when', 'asked why'],
            explain: 'Pregunta wh-: asked + pronombre interrogativo + sujeto + verbo (sin inversión).',
          },
          {
            scene: 'Un consejo',
            prompt: 'Reporta un consejo que te dio la persona usando advised/recommended + to + infinitivo o -ing.',
            answer: 'She advised me to practise speaking every day with native speakers.',
            accepted: ['advised me to', 'recommended practising', 'suggested practising', 'told me to', 'recommended that i'],
            explain: 'advise + persona + to + infinitivo / recommend + -ing: ambas son estructuras correctas para consejos.',
          },
        ],
      },
    ],
  },
}

export default topic
