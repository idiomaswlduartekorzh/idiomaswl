import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'future-will-going-to-b1',
  order: '03',
  color: '#dc2626',
  category: 'Verbs',
  level: 'B1',
  title: 'Will vs Going To en Inglés B1',
  shortTitle: 'Will vs Going To',
  metaTitle: 'Will vs Going To B1 — Cuándo usar cada forma para el futuro en inglés',
  description:
    'En B1 dominas la diferencia clave entre will y going to. Will se usa para decisiones espontáneas, predicciones sin evidencia y promesas. Going to se usa para planes ya decididos e intenciones e predicciones con evidencia visible. También aprendes Present Continuous para planes futuros confirmados.',
  lead: 'Aprende a elegir entre will, going to y present continuous según el tipo de futuro que necesitas expresar.',
  outcomes: [
    'Elige will para decisiones espontáneas, promesas y predicciones generales',
    'Usa going to para planes decididos de antemano e intenciones',
    'Identifica predicciones basadas en evidencia y las expresa con going to',
    'Usa present continuous para planes futuros con hora y lugar confirmados',
  ],

  guide: {
    goal: 'Distinguir y usar correctamente will, going to y present continuous para expresar el futuro en inglés.',
    model: 'I\'ll help you! / I\'m going to study medicine. / She\'s meeting him tomorrow at 5.',
    formula: 'will + infinitive | am/is/are + going to + infinitive | am/is/are + verb-ing',
    decisions: [
      'WILL — decisión espontánea en el momento de hablar: "The phone is ringing — I\'ll get it!"',
      'WILL — promesas y ofrecimientos: "I\'ll call you tonight." / "I\'ll carry that for you."',
      'WILL — predicciones sin evidencia presente, opinión: "I think it will rain tomorrow."',
      'GOING TO — plan o intención decidida de antemano: "I\'m going to apply for that job." (ya lo decidí)',
      'GOING TO — predicción con evidencia visible ahora: "Look at those clouds — it\'s going to rain!"',
      'PRESENT CONTINUOUS — arreglo futuro con otros, hora/lugar específicos: "I\'m meeting Sara at 7."',
    ],
    table: [
      ['Forma', 'Uso principal', 'Ejemplo'],
      ['will + inf.', 'Decisión espontánea / promesa', '"I\'ll open the window."'],
      ['going to + inf.', 'Plan previo / predicción con evidencia', '"I\'m going to quit my job."'],
      ['Present Continuous', 'Arreglo confirmado con detalles', '"She\'s flying to Paris on Friday."'],
    ],
    mistakes: [
      '"I will to call you" ❌ → "I will call you" ✓ — will va directamente con infinitivo sin "to".',
      '"I going to study" ❌ → "I\'m going to study" ✓ — necesitas el verbo to be: am/is/are + going to.',
      '"Look, it will rain!" ❌ → "Look, it\'s going to rain!" ✓ — evidencia visible → going to, no will.',
    ],
  },

  seo: [
    {
      heading: 'Will vs Going To: la diferencia esencial',
      paragraphs: [
        'La confusión entre will y going to es uno de los errores más comunes de hispanohablantes, ya que en español ambas formas corresponden al mismo futuro simple. La clave está en el momento de la decisión.',
        'Will se usa cuando decides en el momento de hablar: estás en un restaurante y el camarero te pregunta qué quieres — respondes "I\'ll have the pasta" (decides ahora). Going to se usa cuando ya habías decidido antes de hablar: "I\'m going to have the pasta" implica que ya lo habías pensado antes.',
      ],
    },
    {
      heading: 'Will para promesas, ofrecimientos y predicciones',
      paragraphs: [
        'Will es la forma para comprometerse: "I\'ll send you the documents by Friday." / "Don\'t worry, I\'ll help you." También para ofrecer ayuda espontáneamente: "Let me carry that — I\'ll take it."',
        'Para predicciones generales sobre el futuro (opiniones, expectativas): "I think technology will change everything." / "I don\'t think it will be a problem." Con think, believe, expect, hope + will.',
      ],
    },
    {
      heading: 'Going To para planes e intenciones',
      paragraphs: [
        '"I\'m going to study medicine" significa que ya lo decidiste — es tu plan. Este es el uso más común de going to: planes e intenciones decididos antes de hablar. Puede ser mañana o en cinco años — la clave es que la decisión ya existe.',
        'Para predicciones con evidencia que puedes ver ahora mismo: "She\'s not going to make it on time — she\'s still at home!" Usas going to porque la evidencia es visible en el presente.',
      ],
    },
    {
      heading: 'Present Continuous para planes futuros concretos',
      paragraphs: [
        'El present continuous (am/is/are + -ing) se usa para planes futuros muy concretos: sabes dónde, cuándo y con quién. "We\'re having dinner with clients on Thursday." Hay un elemento de arreglo previo con otra persona.',
        'Es más específico que going to: "I\'m flying to Madrid on Monday at 6 am" (billete comprado, hora confirmada). A menudo intercambiable con going to, pero el present continuous suena más definitivo.',
      ],
    },
    {
      heading: 'Diferencias sutiles y errores comunes',
      paragraphs: [
        'La pregunta "Will you come?" suena más como una invitación/promesa ("¿vendrás?"). "Are you going to come?" es más neutral, pregunta por el plan. "Are you coming?" implica que ya hay un arreglo.',
        'Error frecuente: usar will para todo. "Tomorrow I will go to the gym" es correcto pero suena a promesa/predicción. Si ya es tu plan: "I\'m going to go to the gym." Si tienes una clase reservada: "I\'m going to the gym at 7."',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Will vs going to con énfasis en el momento de la decisión y evidencia presente.',
    graphicPrompt: 'Tres caminos al futuro: espontáneo (will), planeado (going to), acordado (present continuous).',
    scene: [
      ['I\'ll answer that — just a moment!', '¡Yo contesto eso — un momento!'],
      ['I\'m going to apply for the job next week.', 'Voy a solicitar el trabajo la próxima semana.'],
      ['Look at those clouds — it\'s going to storm.', 'Mira esas nubes — va a haber tormenta.'],
      ['I think the conference will be very useful.', 'Creo que la conferencia será muy útil.'],
      ['She\'s presenting her project on Friday.', 'Ella va a presentar su proyecto el viernes.'],
      ['Don\'t worry, I\'ll help you move the furniture.', 'No te preocupes, te ayudaré a mover los muebles.'],
      ['We\'re visiting my parents this weekend.', 'Vamos a visitar a mis padres este fin de semana.'],
      ['He\'s going to quit his job and start his own business.', 'Va a dejar su trabajo y emprender su propio negocio.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['spontaneous will', 'going to = prior decision', 'evidence = going to', 'confirmed arrangement = present continuous'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Will, Going To o Present Continuous',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'En la cocina',
            lines: [['Sam:', 'The milk is finished.'], ['Alex:', '___ get some from the shop.']],
            options: ['I\'ll', 'I\'m going to', 'I\'m', 'I will to'],
            answer: 'I\'ll',
            explain: 'Decisión tomada en el momento de escuchar → will: "I\'ll get some."',
          },
          {
            scene: 'Planes de año nuevo',
            lines: [['', '"This year ___ learn to play the guitar." (you already decided)']],
            options: ['I\'m going to', 'I\'ll', 'I\'m', 'I going to'],
            answer: 'I\'m going to',
            explain: 'Plan decidido de antemano → going to: "I\'m going to learn to play the guitar."',
          },
          {
            scene: 'El tiempo hoy',
            lines: [['', 'Look at the sky! Those clouds are very dark. It ___ rain soon.']],
            options: ['\'s going to', '\'ll', 'is', 'going to'],
            answer: '\'s going to',
            explain: 'Evidencia visible (nubes oscuras) → going to: "It\'s going to rain."',
          },
          {
            scene: 'Una promesa',
            lines: [['Child:', 'Don\'t forget my birthday!'], ['Parent:', 'I ___ forget — I promise!']],
            options: ['won\'t', 'am not going to', 'don\'t', 'not will'],
            answer: 'won\'t',
            explain: 'Promesa → will negativo (won\'t): "I won\'t forget."',
          },
          {
            scene: 'Reserva confirmada',
            lines: [['', '"I ___ the doctor at 3 pm tomorrow." (appointment already made)']],
            options: ['\'m seeing', '\'ll see', '\'m going to see', '\'m going seeing'],
            answer: '\'m seeing',
            explain: 'Arreglo confirmado con hora específica → present continuous: "I\'m seeing the doctor at 3 pm."',
          },
          {
            scene: 'Una predicción',
            lines: [['', 'I think electric cars ___ replace petrol cars within 20 years.']],
            options: ['will', 'are going to', 'are', 'would'],
            answer: 'will',
            explain: 'Predicción general sin evidencia inmediata → will: "will replace".',
          },
          {
            scene: 'Ayuda espontánea',
            lines: [['', 'You look cold. ___ get you a blanket?']],
            options: ['Shall I', 'Am I going to', 'Do I', 'I will'],
            answer: 'Shall I',
            explain: 'Ofrecimiento espontáneo en pregunta → shall I o will I. "Shall I get you a blanket?" es idiomático y natural.',
          },
          {
            scene: 'Planes de carrera',
            lines: [['', 'After graduation, she ___ work abroad for a year.']],
            options: ['\'s going to', '\'ll', '\'s', 'going to'],
            answer: '\'s going to',
            explain: 'Plan decidido previamente para después de la graduación → going to: "she\'s going to work abroad."',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Contexto y forma',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de will, going to o present continuous.',
        type: 'dual',
        items: [
          {
            scene: 'En la oficina',
            lines: [['Boss:', 'The presentation is in 10 minutes and the projector isn\'t working!'], ['Assistant:', 'Don\'t worry — I [[0]] (fix) it. I [[1]] (also / bring) the backup laptop.']],
            blanks: [
              { options: ['\'ll fix', '\'m going to fix', '\'m fixing', 'will to fix'], answer: '\'ll fix', explain: 'Decisión espontánea de resolver el problema en ese momento → will: "I\'ll fix it."' },
              { options: ['\'ll also bring', '\'m going to also bring', '\'m also bringing', 'also will bring'], answer: '\'ll also bring', explain: 'Segunda acción espontánea → will: "I\'ll also bring the backup laptop."' },
            ],
          },
          {
            scene: 'Planes de viaje',
            lines: [['', 'Next summer we [[0]] (travel) to Japan. We [[1]] (already / book) the flights.']],
            blanks: [
              { options: ['\'re going to travel', '\'ll travel', '\'re travelling', 'going to travel'], answer: '\'re going to travel', explain: 'Plan decidido de antemano → going to: "we\'re going to travel to Japan."' },
              { options: ['\'ve already booked', '\'ll already book', '\'re already booking', 'already booked'], answer: '\'ve already booked', explain: '"Already booked" → present perfect (ya realizado). "We\'ve already booked the flights."' },
            ],
          },
          {
            scene: 'El bebé',
            lines: [['', 'Look at her face — she [[0]] (cry)! Quick, [[1]] (pick her up)?']],
            blanks: [
              { options: ['\'s going to cry', '\'ll cry', '\'s crying', 'going to cry'], answer: '\'s going to cry', explain: 'Predicción con evidencia visible → going to: "she\'s going to cry."' },
              { options: ['Shall I', 'Will I', 'Am I going to', 'Do I'], answer: 'Shall I', explain: 'Ofrecimiento espontáneo → Shall I? "Shall I pick her up?"' },
            ],
          },
          {
            scene: 'Una cena especial',
            lines: [['', 'I [[0]] (have) dinner with my ex-boss on Saturday — she [[1]] (offer) me a new position.']],
            blanks: [
              { options: ['\'m having', '\'ll have', '\'m going to have', 'will have'], answer: '\'m having', explain: 'Cita confirmada con día específico → present continuous: "I\'m having dinner."' },
              { options: ['\'s going to offer', '\'ll offer', '\'s offering', 'going to offer'], answer: '\'s going to offer', explain: 'Plan/intención de ella decidida de antemano → going to: "she\'s going to offer me."' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Una conversación sobre el futuro',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta en esta conversación sobre planes y predicciones.',
        type: 'guidedText',
        scene: 'Elige will, going to o present continuous según el contexto.',
        text: 'Mia and Leo are talking about their plans. "So what are you doing this summer?" asks Leo. "I [[0]] (travel) to Colombia — I\'ve already bought the ticket," says Mia. "Wow! I think you [[1]] (love) it there. The food and people are amazing." "I know! I [[2]] (also / take) a Spanish course while I\'m there." Leo looks thoughtful: "Maybe I [[3]] (come) too! Wait, I [[4]] (have) an important meeting on July 15th — I checked this morning. But I [[5]] (ask) my boss if I can move it." Mia smiles: "The weather [[6]] (be) perfect in July. You should come!"',
        blanks: [
          { options: ['\'m going to travel', '\'ll travel', '\'m travelling', 'travel'], answer: '\'m going to travel', explain: 'Plan ya decidido (ticket comprado) → going to: "I\'m going to travel to Colombia."' },
          { options: ['\'ll love', '\'re going to love', '\'re loving', 'love'], answer: '\'ll love', explain: 'Predicción/opinión sin evidencia directa → will: "I think you\'ll love it."' },
          { options: ['\'m also going to take', '\'ll also take', '\'m also taking', 'also will take'], answer: '\'m also going to take', explain: 'Plan adicional decidido → going to: "I\'m also going to take a Spanish course."' },
          { options: ['\'ll come', '\'m going to come', '\'m coming', 'come'], answer: '\'ll come', explain: 'Decisión espontánea en el momento → will: "Maybe I\'ll come too!"' },
          { options: ['\'m having', '\'ll have', '\'m going to have', 'have'], answer: '\'m having', explain: 'Cita confirmada con fecha específica (ya chequeada) → present continuous: "I\'m having a meeting on July 15th."' },
          { options: ['\'ll ask', '\'m going to ask', '\'m asking', 'ask'], answer: '\'ll ask', explain: 'Decisión tomada en el momento → will: "I\'ll ask my boss."' },
          { options: ['\'ll be', '\'s going to be', '\'s being', 'is'], answer: '\'ll be', explain: 'Predicción general → will: "The weather will be perfect in July."' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe la forma correcta',
        tag: 'Texto libre',
        intro: 'Escribe will, going to o present continuous según el contexto dado.',
        type: 'freeText',
        scene: 'Escribe la forma correcta del verbo indicado.',
        text: 'A: What are your plans for the weekend? B: On Saturday I [[0]] (visit) my grandmother — I called her yesterday and we arranged it. On Sunday I [[1]] (probably / stay) home and rest. A: That sounds nice. Oh, look — your coffee [[2]] (spill)! B: Quick, I [[3]] (get) some paper towels! A: Thanks. By the way, do you think the economy [[4]] (improve) next year?',
        blanks: [
          { answer: '\'m visiting', accepted: ['am visiting', '\'m visiting', 'am going to visit', '\'m going to visit'], explain: '\'m visiting: arreglo confirmado con abuela (llamada ayer, día específico) → present continuous o going to, ambos son correctos.' },
          { answer: '\'ll probably stay', accepted: ['will probably stay', '\'ll probably stay', '\'m probably going to stay', 'am probably going to stay'], explain: '\'ll probably stay: predicción/intención menos firme → will o going to, ambos correctos.' },
          { answer: '\'s going to spill', accepted: ['is going to spill', '\'s going to spill'], explain: '\'s going to spill: evidencia visible (el café se está cayendo) → going to.' },
          { answer: '\'ll get', accepted: ['will get', '\'ll get'], explain: '\'ll get: respuesta espontánea a la situación → will.' },
          { answer: '\'ll improve', accepted: ['will improve', '\'ll improve'], explain: '\'ll improve: predicción general/opinión → will.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando la forma futura correcta.',
        type: 'write',
        items: [
          {
            scene: 'Un plan real',
            prompt: 'Describe un plan que ya has decidido para los próximos meses (usa going to).',
            answer: 'I\'m going to start a new exercise routine next month.',
            accepted: ['going to', '\'m going to', 'am going to', 'is going to', 'are going to'],
            explain: 'Ejemplo: I\'m going to apply for a new job. / She\'s going to travel to Argentina this summer.',
          },
          {
            scene: 'Una promesa',
            prompt: 'Haz una promesa a un amigo que está preocupado por algo (usa will).',
            answer: 'Don\'t worry — I\'ll be there for you.',
            accepted: ['i\'ll', 'i will', 'she\'ll', 'he\'ll', 'we\'ll', 'they\'ll'],
            explain: 'Ejemplo: I\'ll call you every day. / I won\'t tell anyone your secret.',
          },
          {
            scene: 'Una predicción con evidencia',
            prompt: 'Mira tu ciudad o el mundo hoy y haz una predicción con evidencia (usa going to).',
            answer: 'Traffic is terrible — we\'re going to be late.',
            accepted: ['going to be', 'going to miss', 'going to have', 'going to lose', 'going to win', 'going to rain', 'going to fail'],
            explain: 'Ejemplo: Prices are rising — things are going to get more expensive. / Look at the queue — we\'re going to wait for hours.',
          },
          {
            scene: 'Un arreglo confirmado',
            prompt: 'Describe un plan concreto que tienes esta semana con hora/día específicos (usa present continuous).',
            answer: 'I\'m having a video call with my team on Wednesday at 10 am.',
            accepted: ['i\'m having', 'i\'m meeting', 'i\'m visiting', 'i\'m flying', 'i\'m starting', 'i\'m attending', 'i\'m seeing'],
            explain: 'Ejemplo: I\'m meeting my manager on Friday. / We\'re having dinner with friends on Saturday evening.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tu futuro',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones sobre tu futuro usando will, going to y present continuous.',
        type: 'write',
        items: [
          {
            scene: 'Tu futuro',
            prompt: 'Escribe un plan que ya decidiste para los próximos meses o años (going to).',
            answer: 'I\'m going to improve my English and apply for an international job.',
            accepted: ['going to', '\'m going to', 'am going to', 'are going to', 'is going to'],
            explain: 'Usa: I\'m going to [plan]. Ej: I\'m going to take an IELTS exam next year.',
          },
          {
            scene: 'Tu futuro',
            prompt: 'Haz una predicción personal sobre cómo será tu vida en 5 años (will o going to).',
            answer: 'I think I\'ll be living in a different city and working in my own business.',
            accepted: ['i think i\'ll', 'i think i will', 'i\'ll probably', 'i will probably', 'i\'m going to', 'i think things will'],
            explain: 'Usa: I think I\'ll [predicción]. Ej: I think I\'ll have my own apartment. / I\'m going to be a manager by then.',
          },
          {
            scene: 'Tu futuro',
            prompt: 'Menciona algo que tienes planeado para esta semana con día u hora (present continuous).',
            answer: 'I\'m taking an English test on Thursday afternoon.',
            accepted: ['i\'m having', 'i\'m meeting', 'i\'m taking', 'i\'m visiting', 'i\'m starting', 'i\'m attending', 'i\'m working', 'i\'m flying'],
            explain: 'Usa: I\'m [verbo -ing] on [día]. Ej: I\'m starting a new project on Monday.',
          },
        ],
      },
    ],
  },
}

export default topic
