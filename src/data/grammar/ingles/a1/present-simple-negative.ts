import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'present-simple-negative',
  order: '07',
  color: '#9333ea',
  category: 'Verbs',
  level: 'A1',
  title: 'Present simple negativo en inglés A1',
  shortTitle: 'Present simple (negativo)',
  metaTitle: 'Present simple negativo en inglés A1 | don\'t y doesn\'t — guía para hispanohablantes',
  description: 'Aprende a construir frases negativas con don\'t y doesn\'t, por qué el verbo principal vuelve a su forma base y cuándo usar cada auxiliar, con práctica progresiva de 6 niveles.',
  lead: 'Negar en present simple requiere un auxiliar: don\'t para yo, tú, nosotros y ellos; doesn\'t para él, ella y eso. El error más frecuente es añadir -s al verbo principal después de doesn\'t, cuando el auxiliar ya lleva esa carga. She doesn\'t work, no she doesn\'t works.',
  outcomes: [
    'Construir frases negativas usando don\'t y doesn\'t correctamente.',
    'Mantener el verbo principal en forma base después del auxiliar.',
    'Distinguir cuándo usar don\'t vs doesn\'t según el sujeto.',
  ],
  guide: {
    goal: 'Negar rutinas y hábitos en present simple sin cometer el error don\'t/doesn\'t + verbo conjugado.',
    model: 'El auxiliar do/does lleva la carga de la tercera persona. Por eso el verbo principal vuelve a su forma base: He doesn\'t study (no "doesn\'t studies").',
    formula: 'I/you/we/they + don\'t + verb (base) | he/she/it + doesn\'t + verb (base)',
    decisions: [
      'don\'t = do + not → para I, you, we, they.',
      'doesn\'t = does + not → para he, she, it.',
      'Después de don\'t/doesn\'t el verbo SIEMPRE va en forma base.',
      'Contracción habitual: don\'t / doesn\'t (más natural en conversación).',
    ],
    table: [
      ['Sujeto', 'Auxiliar', 'Ejemplo'],
      ['I / you / we / they', 'don\'t', 'I don\'t study on Sundays.'],
      ['he / she / it', 'doesn\'t', 'She doesn\'t work here.'],
    ],
    mistakes: [
      '"She doesn\'t studies" → She doesn\'t study. El auxiliar ya tiene la -s.',
      '"He don\'t work" → He doesn\'t work. He necesita doesn\'t.',
      '"I doesn\'t like it" → I don\'t like it. I necesita don\'t.',
    ],
  },
  seo: [
    {
      heading: 'Por qué negar en inglés es diferente al español',
      paragraphs: [
        'En español para negar solo añades no antes del verbo: No estudio, No trabaja, No vivimos. El verbo sigue conjugado igual. En inglés necesitas un auxiliar: I don\'t study, She doesn\'t work, We don\'t live. El verbo principal vuelve a su forma base porque el auxiliar ya lleva la información de persona y número.',
        'Esto confunde al hispanohablante porque en español la negación es transparente. En inglés hay que elegir el auxiliar correcto (do o does según el sujeto) y luego usar la forma base del verbo. La buena noticia es que la regla es simple: solo hay dos opciones, don\'t o doesn\'t.',
      ],
    },
    {
      heading: 'don\'t vs doesn\'t: cómo elegir sin error',
      paragraphs: [
        'La elección es directa: si el sujeto fuera he, she o it en afirmativo (es decir, el verbo llevaría -s/-es), en negativo usas doesn\'t. Para todos los demás (I, you, we, they), usas don\'t. El auxiliar absorbe la -s que el verbo tendría en afirmativo.',
        'Ejemplo: She studies → She doesn\'t study. El -ies de studies desaparece porque pasa al auxiliar (doesn\'t). He watches → He doesn\'t watch. Watches pierde el -es porque ya está en doesn\'t. Esta es la llave para entender el sistema: el verbo siempre queda en forma base después del auxiliar.',
      ],
      table: [
        ['Afirmativo', 'Negativo', 'Error frecuente'],
        ['I study', 'I don\'t study', '—'],
        ['She studies', 'She doesn\'t study', 'She doesn\'t studies ✗'],
        ['He goes', 'He doesn\'t go', 'He doesn\'t goes ✗'],
        ['They work', 'They don\'t work', '—'],
        ['It works', 'It doesn\'t work', 'It doesn\'t works ✗'],
      ],
    },
    {
      heading: 'Contextos reales: cuándo usar la negación en present simple',
      paragraphs: [
        'La negación con don\'t/doesn\'t aparece para contradecir suposiciones (I don\'t live there anymore), expresar preferencias negativas (She doesn\'t like coffee), hablar de ausencias de hábito (We don\'t study on weekends) o negar hechos (It doesn\'t rain in the Sahara).',
        'En respuestas cortas también es fundamental: Do you study English? Yes, I do. / No, I don\'t. Does she work here? Yes, she does. / No, she doesn\'t. Nota que en la respuesta corta afirmativa no se contrae: Yes, I do (no "Yes, I\'m do" ni "Yes, I does").',
      ],
    },
    {
      heading: 'El error más difícil de eliminar',
      paragraphs: [
        'El error "doesn\'t + verbo con -s" persiste mucho porque el cerebro hispanohablante tiene que suprimir la conjugación de tercera persona en el verbo principal. She doesn\'t studies suena lógico desde el español porque estudia ya tiene su propia marca. En inglés, la marca de tercera persona ya está en el auxiliar (does), así que el verbo principal vuelve a cero.',
        'Práctica recomendada: cuando vayas a negar con he, she o it, di primero el auxiliar (doesn\'t) y luego el infinitivo del verbo (study, work, go). Nunca conjugues el verbo principal al mismo tiempo que piensas en el sujeto.',
      ],
    },
    {
      heading: 'Errores frecuentes y sus correcciones',
      paragraphs: [
        'Error 1: "He don\'t like coffee." → He doesn\'t like coffee. He necesita doesn\'t. Error 2: "She doesn\'t works on Sundays." → She doesn\'t work on Sundays. Después de doesn\'t → forma base. Error 3: "I doesn\'t understand." → I don\'t understand. I necesita don\'t.',
      ],
      examples: [
        ['Incorrecto', 'He don\'t speak English.', 'Correcto', 'He doesn\'t speak English.'],
        ['Incorrecto', 'She doesn\'t likes pizza.', 'Correcto', 'She doesn\'t like pizza.'],
        ['Incorrecto', 'They doesn\'t study on weekends.', 'Correcto', 'They don\'t study on weekends.'],
      ],
    },
  ],
  visual: {
    mode: 'auxiliary-split',
    teacherLens: 'El estudiante aprende que el auxiliar absorbe la tercera persona, liberando al verbo principal para volver a su forma base.',
    graphicPrompt: 'Sujeto → elige don\'t o doesn\'t → verbo en forma base.',
    scene: [['I / you / we / they', 'don\'t + base verb'], ['he / she / it', 'doesn\'t + base verb'], ['doesn\'t study', 'NOT doesn\'t studies']],
    learnerModes: ['visual: auxiliar absorbe -s', 'analítico: tabla de sujetos', 'oral: negaciones en conversación'],
    practiceVerbs: ['Niega', 'Elige', 'Completa', 'Corrige', 'Contrasta', 'Responde'],
    reviewFocus: ['don\'t vs doesn\'t', 'forma base después del auxiliar', 'respuestas cortas'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'Reconocimiento en contexto',
        tag: 'Opción múltiple',
        intro: 'Elige la negación correcta para completar cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Corrigiendo una suposición',
            lines: [['Teacher', 'Do you live near the school?'], ['Ana', 'No, I ___ live near the school. I live in Chapinero.']],
            options: ['don\'t', 'doesn\'t', 'not', 'am not'],
            answer: 'don\'t',
            explain: 'I → don\'t live.',
          },
          {
            scene: 'Describiendo hábitos',
            lines: [['Carlos', 'My brother ___ like English music. He prefers rock in Spanish.']],
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'],
            answer: 'doesn\'t',
            explain: 'My brother → he → doesn\'t like.',
          },
          {
            scene: 'Hábito de pareja',
            lines: [['Lina', 'We ___ watch TV in the morning. We prefer to study.']],
            options: ['don\'t', 'doesn\'t', 'not', 'aren\'t'],
            answer: 'don\'t',
            explain: 'We → don\'t watch.',
          },
          {
            scene: 'Negando un horario',
            lines: [['David', 'The café ___ open on Sundays.']],
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'],
            answer: 'doesn\'t',
            explain: 'The café → it → doesn\'t open.',
          },
          {
            scene: 'Preferencia personal',
            lines: [['Sofia', 'I ___ drink coffee. I prefer tea.']],
            options: ['don\'t', 'doesn\'t', 'not', 'am not'],
            answer: 'don\'t',
            explain: 'I → don\'t drink.',
          },
          {
            scene: 'Grupo de estudio',
            lines: [['Teacher', 'They ___ study at home. They prefer the library.']],
            options: ['don\'t', 'doesn\'t', 'not', 'aren\'t'],
            answer: 'don\'t',
            explain: 'They → don\'t study.',
          },
          {
            scene: 'Negando un hábito de ella',
            lines: [['Marco', 'My sister ___ use social media much. She reads books instead.']],
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'],
            answer: 'doesn\'t',
            explain: 'My sister → she → doesn\'t use.',
          },
          {
            scene: 'Negación de hecho',
            lines: [['Teacher', 'English ___ have grammatical gender for nouns.']],
            options: ['don\'t', 'doesn\'t', 'not', 'isn\'t'],
            answer: 'doesn\'t',
            explain: 'English → it → doesn\'t have.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Dos negaciones en un diálogo',
        tag: '2 espacios',
        intro: 'Completa las dos negaciones en la misma situación.',
        type: 'dual',
        items: [
          {
            scene: 'Comparando hábitos',
            lines: [['Ana', 'I [[0]] study on Fridays but my sister [[1]] study on weekdays either.']],
            blanks: [
              { options: ['don\'t', 'doesn\'t'], answer: 'don\'t', explain: 'I → don\'t study.' },
              { options: ['don\'t', 'doesn\'t'], answer: 'doesn\'t', explain: 'My sister → she → doesn\'t study.' },
            ],
          },
          {
            scene: 'El profesor y el estudiante',
            lines: [['Carlos', 'My teacher [[0]] use Spanish in class. We [[1]] translate everything; we use English directly.']],
            blanks: [
              { options: ['don\'t', 'doesn\'t'], answer: 'doesn\'t', explain: 'My teacher → he/she → doesn\'t use.' },
              { options: ['don\'t', 'doesn\'t'], answer: 'don\'t', explain: 'We → don\'t translate.' },
            ],
          },
          {
            scene: 'Empresa y empleados',
            lines: [['Manager', 'The company [[0]] close on Fridays but the employees [[1]] work on weekends.']],
            blanks: [
              { options: ['don\'t', 'doesn\'t'], answer: 'doesn\'t', explain: 'The company → it → doesn\'t close.' },
              { options: ['don\'t', 'doesn\'t'], answer: 'don\'t', explain: 'The employees → they → don\'t work.' },
            ],
          },
          {
            scene: 'Familia y hábitos',
            lines: [['Valentina', 'My father [[0]] eat meat. My brothers and I [[1]] eat it either.']],
            blanks: [
              { options: ['don\'t', 'doesn\'t'], answer: 'doesn\'t', explain: 'My father → he → doesn\'t eat.' },
              { options: ['don\'t', 'doesn\'t'], answer: 'don\'t', explain: 'My brothers and I → we → don\'t eat.' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado',
        tag: 'Opciones',
        intro: 'Completa las negaciones eligiendo don\'t o doesn\'t y la forma base del verbo.',
        type: 'guidedText',
        scene: 'Diferencias entre dos compañeros',
        text: 'Carlos and Lina are different. Carlos [[0]] (doesn\'t / don\'t) like mornings, but Lina [[1]] (doesn\'t / don\'t) mind. They both [[2]] (doesn\'t / don\'t) use social media during class. Carlos [[3]] (doesn\'t / don\'t) study on Fridays. Lina [[4]] (doesn\'t / don\'t) skip any class. Their teacher [[5]] (doesn\'t / don\'t) give homework on weekends.',
        blanks: [
          { options: ['doesn\'t', 'don\'t'], answer: 'doesn\'t', explain: 'Carlos → he → doesn\'t like.' },
          { options: ['doesn\'t', 'don\'t'], answer: 'doesn\'t', explain: 'Lina → she → doesn\'t mind.' },
          { options: ['doesn\'t', 'don\'t'], answer: 'don\'t', explain: 'They both → they → don\'t use.' },
          { options: ['doesn\'t', 'don\'t'], answer: 'doesn\'t', explain: 'Carlos → he → doesn\'t study.' },
          { options: ['doesn\'t', 'don\'t'], answer: 'doesn\'t', explain: 'Lina → she → doesn\'t skip.' },
          { options: ['doesn\'t', 'don\'t'], answer: 'doesn\'t', explain: 'Their teacher → he/she → doesn\'t give.' },
        ],
      },
      {
        id: 'l4',
        title: 'Texto libre',
        tag: 'Sin opciones',
        intro: 'Escribe don\'t o doesn\'t seguido de la forma base sin ayuda.',
        type: 'freeText',
        scene: 'Lo que no hago los fines de semana',
        text: 'I [[0]] (not study) on Saturdays. My friend Marco [[1]] (not come) to the library either. We [[2]] (not have) class on weekends. My teacher [[3]] (not send) homework on Fridays. The school [[4]] (not open) on Sundays.',
        blanks: [
          { answer: 'don\'t study', accepted: ['dont study', 'do not study'], explain: 'I → don\'t study.' },
          { answer: 'doesn\'t come', accepted: ['doesnt come', 'does not come'], explain: 'Marco → he → doesn\'t come.' },
          { answer: 'don\'t have', accepted: ['dont have', 'do not have'], explain: 'We → don\'t have.' },
          { answer: 'doesn\'t send', accepted: ['doesnt send', 'does not send'], explain: 'My teacher → he/she → doesn\'t send.' },
          { answer: 'doesn\'t open', accepted: ['doesnt open', 'does not open'], explain: 'The school → it → doesn\'t open.' },
        ],
      },
      {
        id: 'l5',
        title: 'Transformar a negativo',
        tag: 'Producción',
        intro: 'Convierte la frase afirmativa en negativa.',
        type: 'write',
        items: [
          {
            scene: 'Negar hábito propio',
            prompt: 'Make negative: I study on Sundays.',
            answer: 'I don\'t study on Sundays.',
            accepted: ['i don\'t study on sundays', 'i do not study on sundays', 'i dont study on sundays'],
            explain: 'I → don\'t study.',
          },
          {
            scene: 'Negar hábito de ella',
            prompt: 'Make negative: She works on weekends.',
            answer: 'She doesn\'t work on weekends.',
            accepted: ['she doesn\'t work on weekends', 'she does not work on weekends', 'she doesnt work on weekends'],
            explain: 'She → doesn\'t work (verbo en forma base, sin -s).',
          },
          {
            scene: 'Negar hábito de grupo',
            prompt: 'Make negative: They eat lunch at school.',
            answer: 'They don\'t eat lunch at school.',
            accepted: ['they don\'t eat lunch at school', 'they do not eat lunch at school', 'they dont eat lunch at school'],
            explain: 'They → don\'t eat.',
          },
          {
            scene: 'Negar hábito de él',
            prompt: 'Make negative: He goes to the gym every day.',
            answer: 'He doesn\'t go to the gym every day.',
            accepted: ['he doesn\'t go to the gym every day', 'he does not go to the gym every day', 'he doesnt go to the gym every day'],
            explain: 'He → doesn\'t go (go, no goes, en forma base).',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión de conversación',
        tag: 'Reto final',
        intro: 'Responde las preguntas de forma negativa usando don\'t o doesn\'t.',
        type: 'write',
        items: [
          {
            scene: 'Pregunta directa',
            prompt: 'Your teacher asks: Do you drink coffee? Answer: No, I ___ coffee. I prefer water.',
            answer: 'No, I don\'t drink coffee. I prefer water.',
            accepted: ['no i don\'t drink coffee i prefer water', 'no i dont drink coffee i prefer water', 'i don\'t drink coffee i prefer water'],
            explain: 'I → don\'t drink.',
          },
          {
            scene: 'Sobre tu compañero',
            prompt: 'Someone asks about Carlos: Does Carlos live near the school? No, he ___ near the school.',
            answer: 'No, he doesn\'t live near the school.',
            accepted: ['no he doesn\'t live near the school', 'he doesn\'t live near the school', 'no, he doesn\'t live near the school.'],
            explain: 'He → doesn\'t live (forma base, sin -s).',
          },
          {
            scene: 'Respuesta doble',
            prompt: 'Explain: You don\'t use Spanish in English class. Your teacher ___ use Spanish either.',
            answer: 'My teacher doesn\'t use Spanish either.',
            accepted: ['my teacher doesn\'t use spanish either', 'the teacher doesn\'t use spanish either', 'she doesn\'t use spanish either', 'he doesn\'t use spanish either'],
            explain: 'My teacher → he/she → doesn\'t use.',
          },
        ],
      },
    ],
  },
}

export default topic
