import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'connectors-a2',
  order: '18',
  color: '#dc2626',
  category: 'Cohesión del discurso',
  level: 'A2',
  title: 'Conectores en Inglés A2: because, so, although, however, but',
  shortTitle: 'Because / So / Although',
  metaTitle: 'Conectores en Inglés A2 — Because, So, Although, However, But',
  description:
    'Los conectores son el pegamento del discurso. Sin ellos, las oraciones quedan sueltas y el texto suena mecánico. Domina because, so, but, although y however para expresar causa, consecuencia y contraste con naturalidad.',
  lead: 'Conecta ideas con lógica y fluidez: los cinco conectores esenciales del inglés A2.',
  outcomes: [
    'Usa "because" para introducir la razón o causa',
    'Usa "so" para expresar la consecuencia o resultado',
    'Usa "but" para contraste dentro de la misma oración',
    'Usa "although" para concesión (aunque)',
    'Usa "however" para contraste entre oraciones separadas',
  ],

  guide: {
    goal: 'Conectar ideas expresando causa, consecuencia y contraste usando los conectores fundamentales del inglés.',
    model: 'I was tired because I worked all day, so I went to bed early. However, I couldn\'t sleep.',
    formula: '[Idea 1] + conector + [Idea 2] / conector + coma + [Idea]',
    decisions: [
      'Dar la razón → because (I left because I was tired.)',
      'Dar la consecuencia → so (I was tired, so I left.)',
      'Contraste en la misma oración → but (I wanted to go but I was sick.)',
      'Concesión (aunque) → although (Although it was cold, we went out.)',
      'Contraste entre oraciones → however (The exam was hard. However, I passed.)',
      'Although puede ir al principio (+ coma) o en el medio de la oración',
      'However va al principio de la segunda oración, siempre seguido de coma',
    ],
    table: [
      ['Conector', 'Función', 'Posición'],
      ['because', 'Causa / razón', 'Medio o principio (+ coma)'],
      ['so', 'Consecuencia / resultado', 'Medio (después de coma)'],
      ['but', 'Contraste directo', 'Medio (une dos cláusulas)'],
      ['although', 'Concesión (aunque)', 'Principio (+ coma) o medio'],
      ['however', 'Contraste entre oraciones', 'Principio de oración (+ coma)'],
    ],
    mistakes: [
      '"I was tired so I worked all day." ❌ — La lógica debe ser causa → efecto. Revisa el orden.',
      '"However I was tired, I went." ❌ → "Although I was tired, I went." ✓ — "However" no introduce concesiones; "although" sí.',
      '"The price was high, however the quality was good." ❌ → "The price was high. However, the quality was good." ✓ — "However" empieza una oración nueva con coma después.',
    ],
  },

  seo: [
    {
      heading: '¿Por qué son importantes los conectores en inglés?',
      paragraphs: [
        'Los conectores (connectors o linking words) permiten expresar relaciones lógicas entre ideas: causa, consecuencia, contraste y concesión. Sin ellos, el discurso suena telegráfico y difícil de seguir.',
        'En los exámenes Cambridge A2 Key y B1 Preliminary, el uso correcto de conectores es uno de los criterios de evaluación más valorados en escritura y expresión oral.',
      ],
    },
    {
      heading: 'Because vs So: causa y efecto',
      paragraphs: [
        '"Because" introduce la causa: I stayed home because it was raining. → El motivo es la lluvia.',
        '"So" introduce el efecto: It was raining, so I stayed home. → La consecuencia es quedarme en casa.',
        'Mismo mensaje, diferente ángulo. Recuerda: "because" = razón; "so" = resultado.',
      ],
      examples: [
        ['Conector', 'Introduce', 'Ejemplo'],
        ['because', 'La causa', 'She got the job because she speaks English.'],
        ['so', 'El resultado', 'She speaks English, so she got the job.'],
      ],
    },
    {
      heading: 'But vs However vs Although: tres formas de contrastar',
      paragraphs: [
        '"But" conecta dos cláusulas dentro de la misma oración: The hotel was expensive but very comfortable.',
        '"However" contrasta dos oraciones separadas. Va al principio + coma: The hotel was expensive. However, it was very comfortable.',
        '"Although" introduce una concesión (aunque). Puede ir al principio (+ coma) o en el medio: Although it was expensive, it was comfortable. / It was comfortable although it was expensive.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Conectores de causa, consecuencia y contraste en contextos cotidianos A2.',
    graphicPrompt: 'Diálogos y textos breves con conectores resaltados mostrando la relación lógica entre ideas.',
    scene: [
      ["I didn't go because I was sick.", 'No fui porque estaba enfermo.'],
      ["It was cold, so we stayed inside.", 'Hacía frío, así que nos quedamos adentro.'],
      ['The food was good but expensive.', 'La comida era buena pero cara.'],
      ['Although it rained, we had fun.', 'Aunque llovió, nos divertimos.'],
      ['The exam was hard. However, I passed.', 'El examen fue difícil. Sin embargo, lo pasé.'],
      ["She studied hard, so she got an A.", 'Estudió mucho, así que sacó una A.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['because vs so', 'but vs however', 'although position'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el conector correcto',
        tag: 'Opción múltiple',
        intro: 'Selecciona el conector que mejor completa la oración.',
        type: 'choice',
        items: [
          {
            scene: 'Explicando por qué llegaste tarde.',
            lines: [
              ['Jefe', 'Why are you late?'],
              ['Empleado', "I'm sorry. I was late ___ there was a lot of traffic."],
            ],
            options: ['because', 'so', 'however', 'although'],
            answer: 'because',
            explain: 'Introduce la razón (el tráfico) → "because".',
          },
          {
            scene: 'Hablando de una decisión.',
            lines: [
              ['Amiga', 'Did you go to the concert?'],
              ['Tú', 'I had a headache, ___ I stayed home.'],
            ],
            options: ['so', 'because', 'although', 'however'],
            answer: 'so',
            explain: 'El dolor de cabeza es la causa, quedarse en casa es la consecuencia → "so".',
          },
          {
            scene: 'Describiendo algo con contraste.',
            lines: [
              ['Cliente', 'How was the food?'],
              ['Turista', 'The food was delicious ___ the service was slow.'],
            ],
            options: ['but', 'because', 'so', 'although'],
            answer: 'but',
            explain: 'Contraste directo entre dos ideas de la misma oración → "but".',
          },
          {
            scene: 'Describiendo el clima y la decisión.',
            lines: [
              ['Amigo', 'Did you go hiking?'],
              ['Tú', '___ it was cloudy, we still went hiking.'],
            ],
            options: ['Although', 'Because', 'So', 'However'],
            answer: 'Although',
            explain: 'La oración empieza con la idea concesiva → "Although" + coma.',
          },
          {
            scene: 'Escribiendo un correo formal.',
            lines: [['Correo', 'The report was very long. ___, it was easy to understand.']],
            options: ['However', 'But', 'Because', 'Although'],
            answer: 'However',
            explain: 'El contraste es entre dos oraciones separadas. Al principio de una oración nueva → "However".',
          },
          {
            scene: 'Explicando un resultado de examen.',
            lines: [['Estudiante', 'I studied every day for a month, ___ I passed with a high score.']],
            options: ['so', 'because', 'but', 'however'],
            answer: 'so',
            explain: 'El estudio es la causa, la nota alta es la consecuencia → "so".',
          },
          {
            scene: 'Comparando dos productos.',
            lines: [['Vendedor', 'This model is more expensive. ___, it has better battery life.']],
            options: ['However', 'Although', 'Because', 'So'],
            answer: 'However',
            explain: 'Contraste entre dos oraciones independientes → "However" al principio + coma.',
          },
          {
            scene: 'Describiendo un viaje difícil.',
            lines: [['Viajera', '___ the journey was long, it was totally worth it.']],
            options: ['Although', 'So', 'Because', 'However'],
            answer: 'Although',
            explain: 'Concesión al principio de la oración → "Although".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Causa, consecuencia y contraste',
        tag: '2 espacios',
        intro: 'Completa con el conector y la información faltante.',
        type: 'dual',
        items: [
          {
            scene: 'Hablando de hábitos de estudio.',
            lines: [['', 'She practices English [[0]] day, [[1]] her vocabulary is excellent now.']],
            blanks: [
              { options: ['every', 'each one', 'all the', 'any'], answer: 'every', explain: '"Every day" = todos los días.' },
              { options: ['so', 'because', 'but', 'although'], answer: 'so', explain: 'La práctica diaria (causa) → vocabulario excelente (efecto) → "so".' },
            ],
          },
          {
            scene: 'Decidiendo sobre las vacaciones.',
            lines: [['', '[[0]] the hotel was expensive, we [[1]] there because the location was perfect.']],
            blanks: [
              { options: ['Although', 'Because', 'So', 'However'], answer: 'Although', explain: 'Concesión al inicio: el precio no nos impidió quedarnos → "Although".' },
              { options: ['stayed', 'stay', 'staying', 'have stayed'], answer: 'stayed', explain: 'Pasado simple → "stayed".' },
            ],
          },
          {
            scene: 'Explicando una ausencia.',
            lines: [['', "I couldn't attend the meeting [[0]] I had a doctor's appointment. [[1]], I sent my colleague to take notes."]],
            blanks: [
              { options: ['because', 'so', 'although', 'however'], answer: 'because', explain: 'La cita médica es la razón → "because".' },
              { options: ['However', 'Although', 'But', 'Because'], answer: 'However', explain: 'Contraste entre dos oraciones (solución ante el problema) → "However" al principio + coma.' },
            ],
          },
          {
            scene: 'Revisando un restaurante.',
            lines: [['', 'The food was fantastic [[0]] the atmosphere was a bit noisy. [[1]], we will definitely go back.']],
            blanks: [
              { options: ['but', 'so', 'although', 'however'], answer: 'but', explain: 'Contraste dentro de la misma oración → "but".' },
              { options: ['However', 'Although', 'Because', 'So'], answer: 'However', explain: 'A pesar del ruido, volveremos: contraste entre oraciones → "However".' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un texto argumentativo',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los conectores adecuados.',
        type: 'guidedText',
        scene: 'Un estudiante escribe sobre su experiencia aprendiendo inglés.',
        text: 'Learning English is not always easy, [[0]] it is definitely worth the effort. I started studying two years ago [[1]] I wanted to travel to the United States. At first, I was nervous [[2]] I couldn\'t understand native speakers. I kept practicing, [[3]] my listening skills improved a lot. [[4]], I still need to work on my pronunciation.',
        blanks: [
          { options: ['but', 'so', 'because', 'although'], answer: 'but', explain: 'Contraste dentro de la misma oración: no es fácil PERO vale la pena → "but".' },
          { options: ['because', 'so', 'but', 'although'], answer: 'because', explain: 'La razón por la que empecé → "because".' },
          { options: ['because', 'so', 'but', 'although'], answer: 'because', explain: 'La razón del nerviosismo → "because".' },
          { options: ['so', 'because', 'but', 'although'], answer: 'so', explain: 'La práctica (causa) → mejora del listening (efecto) → "so".' },
          { options: ['However', 'Although', 'Because', 'So'], answer: 'However', explain: 'Contraste con nueva oración: a pesar de los avances, aún hay algo que mejorar → "However".' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conectores sin pistas',
        tag: 'Texto libre',
        intro: 'Escribe el conector correcto (because, so, but, although, however).',
        type: 'freeText',
        scene: 'Una persona describe por qué cambió de trabajo.',
        text: 'I left my old job [[0]] the salary was too low. I sent applications to several companies [[1]] only two responded. [[2]] I was nervous during the interview, I spoke clearly and with confidence. The manager liked my experience, [[3]] she offered me the position immediately. [[4]], the new job requires me to move to another city, which is a big change for my family.',
        blanks: [
          { answer: 'because', explain: 'La razón por la que dejé el trabajo → "because".' },
          { answer: 'but', explain: 'Contraste: envié muchas aplicaciones PERO pocas respondieron → "but".' },
          { answer: 'Although', explain: 'Concesión: a pesar del nerviosismo, habló bien → "Although".' },
          { answer: 'so', explain: 'Consecuencia: le gustó mi experiencia, por eso me ofreció el puesto → "so".' },
          { answer: 'However', explain: 'Contraste con nueva oración: punto positivo ya dicho, ahora el desafío → "However".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Combina las oraciones',
        tag: 'Escritura guiada',
        intro: 'Une las dos ideas con el conector indicado.',
        type: 'write',
        items: [
          {
            scene: 'Combina usando "because": "I went to bed early. I was very tired."',
            prompt: 'I went to bed early. I was very tired.',
            answer: 'I went to bed early because I was very tired.',
            accepted: ['Because I was very tired, I went to bed early.'],
            explain: '"Because" introduce la causa. Puede ir al principio (+ coma) o en el medio.',
          },
          {
            scene: 'Combina usando "so": "The movie was long. We left before the end."',
            prompt: 'The movie was long. We left before the end.',
            answer: 'The movie was long, so we left before the end.',
            accepted: [],
            explain: '"So" va en el medio con coma antes: larga (causa) → salimos antes (efecto).',
          },
          {
            scene: 'Combina usando "although": "The exam was hard. She got a perfect score."',
            prompt: 'The exam was hard. She got a perfect score.',
            answer: 'Although the exam was hard, she got a perfect score.',
            accepted: ['She got a perfect score although the exam was hard.'],
            explain: '"Although" expresa concesión: el examen era difícil pero eso no le impidió sacar nota perfecta.',
          },
          {
            scene: 'Combina usando "however": "The restaurant was expensive. The food was amazing."',
            prompt: 'The restaurant was expensive. The food was amazing.',
            answer: 'The restaurant was expensive. However, the food was amazing.',
            accepted: [],
            explain: '"However" va al principio de la segunda oración, seguido de coma.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe con conectores',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones originales usando los conectores indicados.',
        type: 'write',
        items: [
          {
            scene: 'Escribe sobre una decisión que tomaste usando "because" y "so".',
            prompt: 'Escribe 2 oraciones sobre una decisión personal usando "because" y "so".',
            answer: 'I decided to study English because I wanted to get a better job, so I enrolled in an online course.',
            accepted: [
              'I started exercising because my doctor recommended it, so now I feel much healthier.',
              'I moved to this city because of my work, so I had to learn many new things.',
            ],
            explain: 'Usa "because" para la razón y "so" para la consecuencia. Lógica: causa → efecto.',
          },
          {
            scene: 'Escribe una descripción con contraste usando "but" y "however".',
            prompt: 'Describe algo (lugar, persona o experiencia) usando "but" y "however".',
            answer: 'The city is very crowded but it has incredible culture and food. However, the cost of living is too high for many people.',
            accepted: [
              'My job is stressful but very rewarding. However, I am thinking about looking for something more flexible.',
            ],
            explain: '"But" en la misma oración para contraste inmediato. "However" al principio de la siguiente oración para contraste entre oraciones.',
          },
          {
            scene: 'Escribe un párrafo corto de 3 oraciones usando although, so y however.',
            prompt: 'Escribe sobre un tema libre (viaje, trabajo, estudio) usando although, so y however.',
            answer: 'Although I was nervous, I spoke in English during my first business meeting. My colleagues were very patient, so the experience was positive. However, I still need to practice my pronunciation.',
            accepted: [
              "Although the weather was terrible, we decided to go to the beach. The waves were huge, so we couldn't swim. However, we had a great time.",
            ],
            explain: 'Usa "although" para la concesión, "so" para la consecuencia, "however" para el contraste final.',
          },
        ],
      },
    ],
  },
}

export default topic
