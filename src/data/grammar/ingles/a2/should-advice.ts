import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'should-advice',
  order: '09',
  color: '#dc2626',
  category: 'Modals',
  level: 'A2',
  title: 'Should y Shouldn\'t en Inglés A2',
  shortTitle: 'Should',
  metaTitle: 'Should y Shouldn\'t en Inglés A2 — Dar Consejos en Inglés',
  description:
    'Should y shouldn\'t son los modales del consejo y la recomendación en inglés. Se usan para decir qué es aconsejable hacer o no hacer. Como todos los modales, van seguidos del verbo en forma base y son iguales para todos los sujetos — nunca llevan -s ni cambian.',
  lead: 'Da y recibe consejos en inglés con should/shouldn\'t — el modal de la recomendación.',
  outcomes: [
    'Usa should + verbo base para dar consejos',
    'Usa shouldn\'t para desaconsejar algo',
    'Hace preguntas de consejo: Should I...?',
    'Distingue should de must (obligación vs. consejo)',
  ],

  guide: {
    goal: 'Dar consejos, recomendaciones y sugerencias usando should y shouldn\'t + verbo base.',
    model: 'You should drink more water. / She shouldn\'t eat so much sugar. / Should I call him?',
    formula: 'Subject + should/shouldn\'t + base verb',
    decisions: [
      '"Should" es igual para todos los sujetos: I should, he should, she should — nunca "shoulds" ni "she shoulds"',
      '"Shouldn\'t" = should not — contracción obligatoria en conversación',
      'Pregunta: Should + sujeto + verbo base? → Should I go? / Should we book in advance?',
      '"Should" = consejo/recomendación (lo correcto o conveniente)',
      '"Must" = obligación fuerte; "Should" = consejo moderado — diferencia de intensidad',
    ],
    table: [
      ['Modal', 'Uso', 'Ejemplo'],
      ['Should', 'Consejo / recomendación', 'You should call a doctor.'],
      ['Shouldn\'t', 'Desaconsejo', 'You shouldn\'t eat so late.'],
    ],
    mistakes: [
      '"She shoulds go" ❌ → "She should go" ✓ — los modales nunca llevan -s.',
      '"You should to rest" ❌ → "You should rest" ✓ — modal + verbo BASE sin "to".',
      '"I am should study" ❌ → "I should study" ✓ — no se combina con "be".',
    ],
  },

  seo: [
    {
      heading: '¿Cuándo se usa "should" en inglés?',
      paragraphs: [
        '"Should" es un verbo modal que expresa consejo, recomendación u obligación moral ligera. En español equivale a "deberías", "sería bueno que", "te recomiendo que". Es el modal más común para dar consejos en inglés cotidiano.',
        'Diferencia clave con "must": "should" sugiere que algo es conveniente o la opción correcta, pero no es una obligación estricta. "Must" implica obligación fuerte. "You should exercise more" (es bueno para ti, te lo recomiendo) vs. "You must wear a seatbelt" (es obligatorio por ley).',
      ],
    },
    {
      heading: 'Estructura de should: afirmativo, negativo e interrogativo',
      paragraphs: [
        'Como todos los modales, "should" es invariable (no añade -s ni cambia con ningún sujeto) y va seguido del verbo en forma base (sin "to").',
        'Afirmativo: sujeto + should + verbo base: You should sleep more. / He should see a doctor.',
        'Negativo: shouldn\'t (should not) + verbo base: She shouldn\'t work so hard. / They shouldn\'t stay up late.',
        'Interrogativo: Should + sujeto + verbo base? → Should I accept the job offer? / What should we do?',
      ],
      examples: [
        ['Forma', 'Ejemplo'],
        ['Afirmativo', 'You should drink eight glasses of water a day.'],
        ['Negativo', 'You shouldn\'t eat too much fast food.'],
        ['Pregunta', 'Should I apologize to him?'],
        ['Pregunta Wh-', 'What should I do about this situation?'],
      ],
    },
    {
      heading: 'Diferencia entre should, must y have to',
      paragraphs: [
        '"Should" = consejo, recomendación: "You should exercise." (No es obligación — es una buena idea.)',
        '"Must" = obligación fuerte, generalmente interna/personal: "I must finish this report today." (Yo siento que es necesario.)',
        '"Have to" = obligación externa, regla o necesidad práctica: "You have to pay taxes." (Es la ley.)',
        'En la práctica de A2, enfócate en: should = bueno que hagas esto; shouldn\'t = mejor que no lo hagas.',
      ],
    },
    {
      heading: 'Expresiones comunes con should',
      paragraphs: [
        '"You should try..." — para recomendar algo: "You should try the new Thai restaurant in town."',
        '"I think you should..." — consejo personal: "I think you should talk to your manager about this."',
        '"Maybe you should..." — consejo más suave: "Maybe you should take a break — you look tired."',
        '"Should I...?" — pedir consejo u opinión: "Should I apply for that job?" / "Should I call or text?"',
      ],
    },
    {
      heading: 'Errores frecuentes de hispanohablantes',
      paragraphs: [
        'El error más común es añadir -s: "She shoulds sleep earlier." Los modales en inglés son invariables — nunca llevan -s para tercera persona singular.',
        'Otro error es añadir "to" después del modal: "You should to rest" es incorrecto. La estructura correcta es "should + verbo base": "You should rest."',
        'En español a veces decimos "deberías de": "Deberías de estudiar más." En inglés no existe esta forma — "You should study more" (sin equivalente a "de").',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Should/shouldn\'t para consejos y recomendaciones en A2.',
    graphicPrompt: 'Escenas de personas dando y recibiendo consejos en contextos cotidianos.',
    scene: [
      ['You should see a doctor about that cough.', 'Deberías ver a un médico por esa tos.'],
      ['You shouldn\'t eat so late at night.', 'No deberías comer tan tarde.'],
      ['Should I apply for the job?', '¿Debería solicitar el trabajo?'],
      ['I think you should talk to her directly.', 'Creo que deberías hablar con ella directamente.'],
      ['You should try the local food when you travel.', 'Deberías probar la comida local cuando viajas.'],
      ['He shouldn\'t drive if he\'s tired.', 'Él no debería manejar si está cansado.'],
      ['What should I wear to the interview?', '¿Qué debería ponerme para la entrevista?'],
      ['Maybe you should take a break.', 'Quizás deberías tomar un descanso.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['should + base verb (no -s)', "shouldn't = should not", 'should vs must', "should I? = ask for advice"],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce el consejo correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de should/shouldn\'t para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Un amigo tiene dolor de cabeza',
            lines: [['', 'You ___ take a painkiller and rest for a while.']],
            options: ['should', 'shouldn\'t', 'must to', 'should to'],
            answer: 'should',
            explain: '"Should" + verbo base = consejo. Sin "to" después del modal.',
          },
          {
            scene: 'Alguien llega tarde siempre',
            lines: [['', 'She ___ set an alarm if she has trouble waking up.']],
            options: ['should', 'shoulds', 'should to', 'is should'],
            answer: 'should',
            explain: '"She should" — los modales son invariables. "Shoulds" no existe.',
          },
          {
            scene: 'Consejo de salud',
            lines: [['', 'You ___ drink coffee so late — it will affect your sleep.']],
            options: ['shouldn\'t', 'should', 'don\'t should', 'not should'],
            answer: 'shouldn\'t',
            explain: '"Shouldn\'t" = consejo negativo (no es una buena idea hacer eso).',
          },
          {
            scene: 'Pidiendo consejo',
            lines: [['', '___ I call her or send a text message?']],
            options: ['Should', 'Would', 'Must', 'Do'],
            answer: 'Should',
            explain: '"Should I...?" = pedir consejo o recomendación.',
          },
          {
            scene: 'Consejo para el examen',
            lines: [['', 'You ___ review your notes the night before, not the morning of.']],
            options: ['should', 'shouldn\'t', 'have to', 'must to'],
            answer: 'should',
            explain: '"Should" para recomendar la mejor estrategia.',
          },
          {
            scene: 'Problema de sueño',
            lines: [['', 'He ___ stay up until 2am watching TV — he has work tomorrow.']],
            options: ['shouldn\'t', 'should', 'mustn\'t to', 'don\'t should'],
            answer: 'shouldn\'t',
            explain: '"Shouldn\'t" = desaconsejo, mala idea.',
          },
          {
            scene: 'Recomendación de viaje',
            lines: [['', 'You ___ try the local market when you visit — it\'s amazing!']],
            options: ['should', 'shouldn\'t', 'would', 'must to'],
            answer: 'should',
            explain: '"You should try" = recomendación positiva.',
          },
          {
            scene: 'Consejo de trabajo',
            lines: [['', 'What ___ I say in the job interview about my salary expectations?']],
            options: ['should', 'would', 'must', 'shall'],
            answer: 'should',
            explain: '"What should I say?" = pedir consejo sobre la acción correcta.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Consejo y razón',
        tag: '2 espacios',
        intro: 'Completa el consejo y la razón.',
        type: 'dual',
        items: [
          {
            scene: 'Consejo para aprender inglés',
            lines: [['', 'You [[0]] listen to podcasts in English every day — it [[1]] your comprehension a lot.']],
            blanks: [
              { options: ['should', 'shouldn\'t', 'must to', 'should to'], answer: 'should', explain: '"You should listen" — consejo positivo.' },
              { options: ['\'ll improve', 'improves', 'improve', 'improving'], answer: '\'ll improve', explain: 'Resultado en first conditional: "it will improve".' },
            ],
          },
          {
            scene: 'Hablando de un amigo enfermo',
            lines: [
 ['A:', 'My friend has a terrible cold.'],
 ['B:', 'He [[0]] rest and drink lots of fluids. He [[1]] go out in the rain!'],
 ],
            blanks: [
              { options: ['should', 'shouldn\'t', 'must to', 'should to'], answer: 'should', explain: '"He should rest" — consejo positivo.' },
              { options: ['shouldn\'t', 'should', 'mustn\'t to', 'not should'], answer: 'shouldn\'t', explain: '"He shouldn\'t go out" — desaconsejo.' },
            ],
          },
          {
            scene: 'Sobre las redes sociales',
            lines: [['', 'Teenagers [[0]] spend hours on their phones. They [[1]] time in activities outside.']],
            blanks: [
              { options: ['shouldn\'t', 'should', 'don\'t should', 'mustn\'t'], answer: 'shouldn\'t', explain: '"Teenagers shouldn\'t spend" — desaconsejo general.' },
              { options: ['should spend', 'spend should', 'spending should', 'should to spend'], answer: 'should spend', explain: '"They should spend time" — consejo alternativo.' },
            ],
          },
          {
            scene: 'Preparándose para una entrevista',
            lines: [
 ['A:', 'I have a job interview tomorrow. Any tips?'],
 ['B:', 'You [[0]] research the company beforehand. And you [[1]] be late!'],
 ],
            blanks: [
              { options: ['should', 'shouldn\'t', 'must to', 'would'], answer: 'should', explain: '"You should research" — consejo clave.' },
              { options: ['shouldn\'t', 'should', 'won\'t', 'don\'t'], answer: 'shouldn\'t', explain: '"You shouldn\'t be late" — advertencia importante.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Consejos para un viajero',
        tag: 'Texto guiado',
        intro: 'Elige should o shouldn\'t para completar estos consejos de viaje.',
        type: 'guidedText',
        scene: 'Elige should o shouldn\'t para completar estos consejos de viaje.',
        text: 'Are you visiting a new country? Here\'s what you [[0]] do. First, you [[1]] research local customs before you go — it shows respect. You [[2]] carry too much cash; use a travel card instead. You [[3]] always have a copy of your passport in case of emergency. You [[4]] eat street food without checking if it\'s a reputable stall — food poisoning can ruin a trip. You [[5]] try the local language — even a few words make a difference. And you [[6]] forget travel insurance!',
        blanks: [
          { options: ['should', 'shouldn\'t'], answer: 'should', explain: '"Here\'s what you should do" — intro a consejos positivos.' },
          { options: ['should', 'shouldn\'t'], answer: 'should', explain: '"You should research local customs" — consejo positivo.' },
          { options: ['shouldn\'t', 'should'], answer: 'shouldn\'t', explain: '"You shouldn\'t carry too much cash" — desaconsejo.' },
          { options: ['should', 'shouldn\'t'], answer: 'should', explain: '"You should always have a copy" — consejo de seguridad.' },
          { options: ['shouldn\'t', 'should'], answer: 'shouldn\'t', explain: '"You shouldn\'t eat street food without checking" — advertencia.' },
          { options: ['should', 'shouldn\'t'], answer: 'should', explain: '"You should try the local language" — recomendación positiva.' },
          { options: ['shouldn\'t', 'should'], answer: 'shouldn\'t', explain: '"You shouldn\'t forget travel insurance" — consejo crítico negativo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los consejos',
        tag: 'Texto libre',
        intro: 'Escribe should o shouldn\'t según el contexto.',
        type: 'freeText',
        scene: 'Escribe should o shouldn\'t según el contexto.',
        text: 'My friend wants to learn a new language. I told him: "You [[0]] (should/set) a daily routine — consistency is key." I also said he [[1]] (shouldn\'t/try) to learn everything at once. He [[2]] (should/focus) on the basics first. He [[3]] (shouldn\'t/skip) practice days, even if it\'s just 10 minutes. And he [[4]] (should/enjoy) the process — languages are fun!"',
        blanks: [
          { answer: 'should set', accepted: ['should set'], explain: '"You should set a daily routine" — consejo positivo.' },
          { answer: 'shouldn\'t try', accepted: ["shouldn't try", 'should not try'], explain: '"He shouldn\'t try to learn everything at once" — desaconsejo.' },
          { answer: 'should focus', accepted: ['should focus'], explain: '"He should focus on the basics" — recomendación.' },
          { answer: 'shouldn\'t skip', accepted: ["shouldn't skip", 'should not skip'], explain: '"He shouldn\'t skip practice days" — advertencia.' },
          { answer: 'should enjoy', accepted: ['should enjoy'], explain: '"He should enjoy the process" — consejo positivo final.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción: Da consejos',
        tag: 'Producción',
        intro: 'Escribe consejos para diferentes situaciones de la vida real.',
        type: 'write',
        items: [
          {
            scene: 'Un amigo con estrés',
            prompt: 'Tu amigo dice que está muy estresado y agotado. Dale dos consejos (usa should y shouldn\'t).',
            answer: 'You should take breaks during work. You shouldn\'t check your email after 8pm.',
            accepted: ['you should', 'you shouldn\'t', 'he should', 'he shouldn\'t', 'she should', "she shouldn't"],
            explain: 'Ejemplo: You should exercise to reduce stress. / You shouldn\'t take work home with you.',
          },
          {
            scene: 'Consejo de salud',
            prompt: 'Escribe dos cosas que la gente debería o no debería hacer para dormir mejor.',
            answer: 'People should go to bed at the same time every day. They shouldn\'t look at their phone before sleeping.',
            accepted: ['should', "shouldn't"],
            explain: 'Ejemplo: You should avoid caffeine in the afternoon. / You shouldn\'t sleep with the TV on.',
          },
          {
            scene: 'Consejo de idiomas',
            prompt: 'Da un consejo a alguien que quiere mejorar su inglés (usa "I think you should...").',
            answer: 'I think you should watch films in English without subtitles.',
            accepted: ['i think you should', 'you should', 'maybe you should', 'i think she should', 'i think he should'],
            explain: 'Ejemplo: I think you should practice speaking with native speakers. / You should keep a vocabulary notebook.',
          },
          {
            scene: 'Pidiendo consejo',
            prompt: 'Escribe una pregunta pidiendo consejo sobre algo real en tu vida.',
            answer: 'Should I accept this job offer or wait for a better opportunity?',
            accepted: ['should i', 'should we', 'should she', 'should he'],
            explain: 'Ejemplo: Should I apply for the course? / Should I call him first or wait?',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: El manual de vida',
        tag: 'Producción libre',
        intro: 'Escribe 3 consejos de vida usando should y shouldn\'t — para alguien que empieza su carrera profesional.',
        type: 'write',
        items: [
          {
            scene: 'Manual de vida profesional',
            prompt: 'Escribe un consejo sobre hábitos de trabajo (use "You should...").',
            answer: 'You should set clear goals every morning and review them at the end of the day.',
            accepted: ['you should', 'one should', 'people should', 'everyone should'],
            explain: 'Ejemplo: You should ask questions when you don\'t understand. / You should build good relationships with colleagues.',
          },
          {
            scene: 'Manual de vida profesional',
            prompt: 'Escribe algo que definitivamente no se debe hacer en el trabajo (use "You shouldn\'t...").',
            answer: 'You shouldn\'t speak badly about your colleagues — it always comes back to you.',
            accepted: ["you shouldn't", "one shouldn't", "people shouldn't"],
            explain: 'Ejemplo: You shouldn\'t miss deadlines without communicating first. / You shouldn\'t be afraid to ask for help.',
          },
          {
            scene: 'Manual de vida profesional',
            prompt: 'Escribe un consejo sobre el equilibrio entre trabajo y vida personal.',
            answer: 'You should protect your personal time — work will always ask for more if you let it.',
            accepted: ['you should', "you shouldn't", 'people should', "people shouldn't"],
            explain: 'Ejemplo: You should set clear boundaries between work time and personal time. / You shouldn\'t take your work stress home.',
          },
        ],
      },
    ],
  },
}

export default topic
