import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'wish-clauses-b1',
  order: '19',
  color: '#dc2626',
  category: 'Grammar',
  level: 'B1',
  title: 'Oraciones con WISH en Inglés B1',
  shortTitle: 'Wish Clauses',
  metaTitle: 'Wish B1 — Deseos, lamentos y situaciones contrarias a la realidad en inglés',
  description:
    'Las oraciones con wish expresan deseos sobre situaciones que no son reales: wish + past simple (deseos sobre el presente), wish + past perfect (lamentos sobre el pasado), wish + would (deseos sobre comportamientos ajenos). Son esenciales para el IELTS Writing Task 2 y el Cambridge B1.',
  lead: 'Aprende a expresar deseos, lamentos y situaciones imaginarias con wish en inglés B1.',
  outcomes: [
    'Usas wish + past simple para expresar deseos sobre situaciones presentes que quisieras cambiar',
    'Usas wish + would para expresar frustración con comportamientos ajenos o pedir un cambio',
    'Usas wish + past perfect para expresar lamentos sobre el pasado',
    'Distingues wish de hope: wish = situación contraria a la realidad; hope = posible',
  ],

  guide: {
    goal: 'Expresar deseos, lamentos y situaciones contrarias a la realidad usando wish correctamente.',
    model: 'I wish I spoke Chinese. / I wish you wouldn\'t be so loud. / I wish I had studied harder.',
    formula: 'wish + past simple (present unreal) / wish + would (behaviour change) / wish + past perfect (past regret)',
    decisions: [
      'Wish + past simple: deseo sobre el presente (contrario a la realidad) → "I wish I had more time." (No tengo tiempo)',
      'Wish + were (not was): con to be siempre se usa were en formal/examen, aunque was se acepta en conversación → "I wish I were taller."',
      'Wish + would: frustración o deseo de que algo cambie → "I wish he would stop talking." (Él habla, pero no debería)',
      'Wish + past perfect: lamento sobre algo del pasado que no se puede cambiar → "I wish I had worked harder."',
      'Hope vs wish: hope = algo posible en el futuro → "I hope I pass the exam." / wish = contrario a la realidad → "I wish I spoke English like a native." (no lo hablo así ahora)',
      'If only: igual que wish pero más dramático/énfasis → "If only I had more money!"',
    ],
    table: [
      ['Estructura', 'Significado', 'Ejemplo'],
      ['wish + past simple', 'deseo sobre el presente', 'I wish I lived in London. (No vivo allí)'],
      ['wish + past perfect', 'lamento sobre el pasado', 'I wish I had studied. (No estudié)'],
    ],
    mistakes: [
      '"I wish I will have more money." ❌ → "I wish I had more money." ✓ — wish + past simple para el presente, NO will.',
      '"I wish he stops talking." ❌ → "I wish he would stop talking." ✓ — deseo de cambio de comportamiento → wish + would.',
      '"I hope I spoke better English." ❌ → "I wish I spoke better English." / "I hope my English gets better." ✓ — hope + presente/futuro; wish + pasado (contrario a realidad).',
    ],
  },

  seo: [
    {
      heading: 'Wish + past simple: deseos sobre el presente',
      paragraphs: [
        '"Wish + past simple" expresa un deseo sobre una situación del presente que quisieras que fuera diferente. El pasado aquí no indica tiempo pasado — indica distancia de la realidad. "I wish I spoke Japanese" = no hablo japonés ahora, pero me gustaría. "She wishes she had a car" = no tiene carro ahora, pero lo desea.',
        'Con el verbo "to be", el inglés formal y los exámenes usan "were" para todas las personas: "I wish I were taller." / "She wishes she were more patient." / "I wish it were Friday already." En inglés hablado informal, "was" es también aceptable: "I wish I was taller."',
      ],
    },
    {
      heading: 'Wish + would: frustración y deseos de cambio',
      paragraphs: [
        '"Wish + would" expresa frustración con el comportamiento actual de alguien (o algo) y el deseo de que cambie. "I wish she would call more often." (Ella no llama mucho y me gustaría que cambiara). "I wish the neighbours would stop making noise." (Están haciendo ruido y eso me molesta).',
        'Importante: NO uses "I wish I would" — would en wish siempre se refiere a otro. Para hablar de los propios deseos en el presente, usa wish + past simple: "I wish I were more patient." Si usas would contigo mismo, suena como si el hablante fuera otra persona.',
      ],
    },
    {
      heading: 'Wish + past perfect: lamentos del pasado',
      paragraphs: [
        '"Wish + past perfect" expresa un lamento sobre algo que ocurrió (o no ocurrió) en el pasado y ya no se puede cambiar. "I wish I had studied harder." = No estudié suficiente y ahora me arrepiento. "She wishes she hadn\'t quit her job." = Renunció a su trabajo y ahora lamenta esa decisión.',
        'Es equivalente a "If only I had studied harder!" — que es simplemente una versión más enfática y dramática. El past perfect (had + past participle) siempre indica lamento sobre el pasado.',
      ],
    },
    {
      heading: 'Wish vs hope: la distinción crucial',
      paragraphs: [
        '"Hope" se usa cuando algo es posible, realista o esperable: "I hope I pass the exam next week." (Es posible pasar). "I hope the weather is nice tomorrow." (Es posible que haga buen tiempo). "Hope" va seguido de presente o futuro (o que + subjuntivo en español).',
        '"Wish" se usa cuando la situación es contraria a la realidad o muy poco probable. "I wish I could fly." (No puedo volar — imposible). "I wish I lived in Paris." (No vivo en París — contrario a la realidad actual). "If only" intensifica el deseo o lamento con más emoción: "If only I had more time!" / "If only she had told me the truth!"',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Wish + past simple (presente irreal), wish + would (comportamiento), wish + past perfect (lamento pasado).',
    graphicPrompt: 'Burbuja de pensamiento con tres niveles: presente, comportamiento ajeno, pasado — cada uno con su estructura de wish.',
    scene: [
      ['I wish I spoke English as fluently as a native speaker.', 'Ojalá hablara inglés tan fluidamente como un nativo.'],
      ['She wishes she had more free time to travel.', 'Ella desearía tener más tiempo libre para viajar.'],
      ['I wish my neighbor would stop playing music so late.', 'Ojalá mi vecino dejara de poner música tan tarde.'],
      ['I wish I had started learning Korean five years ago.', 'Ojalá hubiera empezado a aprender coreano hace cinco años.'],
      ['He wishes he hadn\'t missed the deadline.', 'Él lamenta haber perdido la fecha límite.'],
      ['If only I had more confidence when speaking in public!', '¡Ojalá tuviera más confianza cuando hablo en público!'],
      ['I hope the IELTS results come out soon — I\'m so nervous.', 'Espero que los resultados del IELTS salgan pronto — estoy muy nervioso.'],
      ['She wishes she were closer to her family.', 'Ella desearía estar más cerca de su familia.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['wish + past simple = present unreal', 'wish + would = behaviour change', 'wish + past perfect = past regret', 'wish vs hope', 'if only for emphasis'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Identifica la estructura correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta de wish para cada situación.',
        type: 'choice',
        items: [
          {
            scene: 'Un deseo sobre el presente',
            lines: [['', 'I wish I ___ more time to study every day. (I don\'t have enough time now)']],
            options: ['had', 'have', 'will have', 'would have'],
            answer: 'had',
            explain: 'Wish + past simple para deseos sobre el presente: "I wish I had more time." (No tengo tiempo ahora — contrario a la realidad).',
          },
          {
            scene: 'Frustración con un vecino',
            lines: [['', 'I wish my neighbor ___ stop making noise at midnight!']],
            options: ['would', 'will', 'had', 'were'],
            answer: 'would',
            explain: 'Wish + would para frustración con el comportamiento de otra persona y deseo de cambio: "I wish he would stop..."',
          },
          {
            scene: 'Un lamento del pasado',
            lines: [['', 'She wishes she ___ the opportunity when she had it.']],
            options: ['had taken', 'took', 'would take', 'takes'],
            answer: 'had taken',
            explain: 'Wish + past perfect para lamentos del pasado: "wishes she had taken" (no aprovechó la oportunidad — ya pasó).',
          },
          {
            scene: 'Deseo o esperanza',
            lines: [['', '"I ___ my English was better." (It\'s not — it\'s a wish about the present)']],
            options: ['wish', 'hope', 'want', 'would'],
            answer: 'wish',
            explain: '"Wish" para situaciones contrarias a la realidad. "Hope" se usaría si fuera algo posible en el futuro.',
          },
          {
            scene: 'El verbo to be',
            lines: [['', 'I wish I ___ a professional athlete. (I am not one)']],
            options: ['were', 'was', 'am', 'be'],
            answer: 'were',
            explain: 'Wish + to be: en inglés formal/examen siempre "were" (no "was") con todas las personas: "I wish I were..."',
          },
          {
            scene: 'Un error del pasado',
            lines: [['', 'He wishes he ___ that comment in the meeting.']],
            options: ['hadn\'t made', 'didn\'t make', 'wouldn\'t make', 'hasn\'t made'],
            answer: 'hadn\'t made',
            explain: 'Wish + past perfect negativo para lamentos: "hadn\'t made" = no debió haberlo dicho (ya ocurrió).',
          },
          {
            scene: 'Énfasis dramático',
            lines: [['', '___ I had more confidence when speaking English!']],
            options: ['If only', 'I wish', 'I hope', 'Unless'],
            answer: 'If only',
            explain: '"If only" = versión más enfática y dramática de wish: "If only I had more confidence!" Expresa el deseo con más emoción.',
          },
          {
            scene: 'Algo posible vs imposible',
            lines: [['', '"I ___ the exam results are good." (It\'s possible — I just took it)']],
            options: ['hope', 'wish', 'had hoped', 'wished'],
            answer: 'hope',
            explain: '"Hope" para situaciones posibles: el examen se puede haber ido bien. "Wish" es para situaciones contrarias a la realidad actual.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Deseos y lamentos',
        tag: '2 espacios',
        intro: 'Completa con la forma correcta de wish y el verbo.',
        type: 'dual',
        items: [
          {
            scene: 'Un idioma deseado',
            lines: [['', 'I wish I [[0]] (speak) Japanese. I also wish I [[1]] (have) enough time to study it.']],
            blanks: [
              { options: ['spoke', 'speak', 'would speak', 'had spoken'], answer: 'spoke', explain: 'Wish + past simple para el presente: "I wish I spoke Japanese" (no hablo japonés ahora).' },
              { options: ['had', 'have', 'would have', 'had had'], answer: 'had', explain: 'Wish + past simple: "I wish I had enough time" (no tengo suficiente tiempo ahora).' },
            ],
          },
          {
            scene: 'Frustración en clase',
            lines: [['', 'I wish the teacher [[0]] (explain) more slowly. I also wish my classmates [[1]] (stop) interrupting all the time.']],
            blanks: [
              { options: ['would explain', 'explained', 'will explain', 'had explained'], answer: 'would explain', explain: 'Wish + would para deseo de cambio de comportamiento: "I wish the teacher would explain more slowly."' },
              { options: ['would stop', 'stopped', 'will stop', 'had stopped'], answer: 'would stop', explain: 'Wish + would para comportamiento ajeno: "I wish my classmates would stop interrupting."' },
            ],
          },
          {
            scene: 'Lamentos sobre la universidad',
            lines: [['', 'He wishes he [[0]] (choose) a different degree. He also wishes he [[1]] (not/waste) so much time.']],
            blanks: [
              { options: ['had chosen', 'chose', 'would choose', 'has chosen'], answer: 'had chosen', explain: 'Wish + past perfect para lamentos del pasado: "He wishes he had chosen..." (ya se graduó, no puede cambiarlo).' },
              { options: ['hadn\'t wasted', 'didn\'t waste', 'wouldn\'t waste', 'hasn\'t wasted'], answer: 'hadn\'t wasted', explain: 'Wish + past perfect negativo: "he hadn\'t wasted" — lamenta haber perdido el tiempo.' },
            ],
          },
          {
            scene: 'Wish vs hope',
            lines: [['', '"I [[0]] I spoke English like a native." (No lo habla así ahora) / "I [[1]] my pronunciation gets better soon." (Es posible con práctica)']],
            blanks: [
              { options: ['wish', 'hope', 'would like', 'want'], answer: 'wish', explain: '"Wish" para el presente irreal: no habla así ahora → contrario a la realidad.' },
              { options: ['hope', 'wish', 'wished', 'would hope'], answer: 'hope', explain: '"Hope" para algo posible en el futuro: la pronunciación puede mejorar con práctica.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Los lamentos de una estudiante',
        tag: 'Texto guiado',
        intro: 'Completa el monólogo de Clara usando la estructura correcta de wish.',
        type: 'guidedText',
        scene: 'Completa con la estructura correcta de wish.',
        text: 'I have my IELTS exam next week and I\'m very nervous. I wish I [[0]] (be) more confident. I wish I [[1]] (study) more when I had the chance. I also wish my flatmate [[2]] (stop) watching TV loudly when I try to concentrate. If only I [[3]] (start) preparing six months ago! I hope I [[4]] (pass) — I know it\'s possible, but I\'m nervous. I wish I [[5]] (know) the results already. I [[6]] (hope/wish) that everything goes well — my parents are counting on me.',
        blanks: [
          { options: ['were', 'was', 'am', 'would be'], answer: 'were', explain: 'Wish + were: "I wish I were more confident." (No soy tan confiada ahora — presente irreal con "be").' },
          { options: ['had studied', 'studied', 'would study', 'have studied'], answer: 'had studied', explain: 'Wish + past perfect para lamento del pasado: "I wish I had studied more" (no estudié suficiente — ya pasó).' },
          { options: ['would stop', 'stopped', 'will stop', 'had stopped'], answer: 'would stop', explain: 'Wish + would para comportamiento ajeno que molesta: "I wish my flatmate would stop..."' },
          { options: ['had started', 'started', 'would start', 'have started'], answer: 'had started', explain: '"If only I had started..." = lamento del pasado con if only (más énfasis que wish). Past perfect.' },
          { options: ['pass', 'passed', 'would pass', 'have passed'], answer: 'pass', explain: 'Hope + present simple (o will): "I hope I pass" — algo posible en el futuro.' },
          { options: ['knew', 'know', 'would know', 'had known'], answer: 'knew', explain: 'Wish + past simple para el presente: "I wish I knew the results already" (no los sé todavía).' },
          { options: ['hope', 'wish', 'wished', 'had hoped'], answer: 'hope', explain: '"I hope that everything goes well" — el resultado es posible. Hope + presente/futuro, no pasado.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con wish o hope',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta de wish o la estructura completa.',
        type: 'freeText',
        scene: 'Completa con la estructura correcta de wish/hope.',
        text: 'Learning a language is sometimes frustrating. I [[0]] I could memorise vocabulary more easily (but I can\'t). I also [[1]] I had more opportunities to practise speaking (I don\'t have many). I [[2]] my English teacher would give us more speaking exercises (she doesn\'t). However, I [[3]] to improve before the end of the year (it\'s possible!). I [[4]] I had discovered this method earlier — it would have saved me so much time.',
        blanks: [
          { answer: 'wish', accepted: ['wish'], explain: 'Situation contraria a la realidad del presente: "I wish I could memorise easily" (no puedo).' },
          { answer: 'wish', accepted: ['wish'], explain: '"Wish I had more opportunities" = no tengo muchas ahora (presente irreal).' },
          { answer: 'wish', accepted: ['wish'], explain: '"Wish... would" = deseo de cambio de comportamiento ajeno (de la profesora).' },
          { answer: 'hope', accepted: ['hope'], explain: '"Hope to improve" = es posible mejorar antes de fin de año. Algo realista.' },
          { answer: 'wish', accepted: ['wish'], explain: '"Wish I had discovered" = past perfect. Lamento del pasado: no lo descubrí antes.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe oraciones completas con wish según los contextos.',
        type: 'write',
        items: [
          {
            scene: 'Un deseo sobre el presente',
            prompt: 'Expresa algo que desearías tener o ser diferente en tu vida ahora (wish + past simple).',
            answer: 'I wish I had more free time to dedicate to learning languages.',
            accepted: ['wish i had', 'wish i spoke', 'wish i lived', 'wish i could', 'wish i were', 'wish i knew'],
            explain: 'Wish + past simple = deseo sobre el presente. La situación es contraria a la realidad actual.',
          },
          {
            scene: 'Frustración',
            prompt: 'Expresa una frustración con el comportamiento de alguien que conoces (wish + would).',
            answer: 'I wish my colleagues would stop sending emails at 11 pm. It\'s impossible to disconnect.',
            accepted: ['wish', 'would stop', 'would start', 'would be', 'would help', 'would listen', 'would answer'],
            explain: 'Wish + would + infinitivo para el comportamiento de otra persona: wish + [persona] + would + verbo.',
          },
          {
            scene: 'Un lamento del pasado',
            prompt: 'Expresa algo que lamentas no haber hecho (wish + past perfect).',
            answer: 'I wish I had started learning English earlier — it would have opened so many doors.',
            accepted: ['wish i had started', 'wish i hadn\'t', 'wish i had studied', 'wish i had taken', 'wish i had practiced', 'wish i had listened'],
            explain: 'Wish + past perfect = lamento sobre algo del pasado que ya no se puede cambiar.',
          },
          {
            scene: 'If only para énfasis',
            prompt: 'Escribe una frase dramática con "if only" sobre un deseo o lamento.',
            answer: 'If only I had more confidence when speaking English in public!',
            accepted: ['if only i had', 'if only i could', 'if only i were', 'if only i hadn\'t', 'if only she had', 'if only we had'],
            explain: '"If only" es igual a wish pero más emocional y dramático. Puede ir con past simple (presente irreal) o past perfect (pasado).',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Tus deseos y lamentos sobre el inglés',
        tag: 'Producción libre',
        intro: 'Escribe sobre tus deseos y lamentos en el aprendizaje de idiomas.',
        type: 'write',
        items: [
          {
            scene: 'El presente',
            prompt: 'Escribe dos deseos sobre tu situación actual con el inglés usando wish + past simple.',
            answer: 'I wish I had more time to practise. I wish I could speak without thinking about grammar.',
            accepted: ['wish i had', 'wish i could', 'wish i spoke', 'wish i lived', 'wish i knew', 'wish i were'],
            explain: 'Wish + past simple: dos deseos sobre situaciones del presente que son contrarias a la realidad.',
          },
          {
            scene: 'El pasado',
            prompt: 'Expresa un lamento sobre algo relacionado con tu aprendizaje de inglés en el pasado (wish + past perfect o if only).',
            answer: 'I wish I had practised speaking more when I was younger. If only I had had a native speaker friend to practise with!',
            accepted: ['wish i had', 'hadn\'t wasted', 'if only i had', 'had studied', 'had practised', 'had started'],
            explain: 'Wish + past perfect o if only + past perfect para lamentos sobre el pasado que ya no se pueden cambiar.',
          },
          {
            scene: 'El futuro',
            prompt: 'Escribe una esperanza realista sobre tu inglés usando hope (algo posible, no contrario a la realidad).',
            answer: 'I hope I can have a fluent conversation in English by the end of this year. I hope my pronunciation improves with daily practice.',
            accepted: ['hope i can', 'hope i will', 'hope my', 'hope to', 'hope that'],
            explain: '"Hope" para algo posible y realista en el futuro. Contraste con wish: hope = posible, wish = irreal.',
          },
        ],
      },
    ],
  },
}

export default topic
