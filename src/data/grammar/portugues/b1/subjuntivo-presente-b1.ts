import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'subjuntivo-presente-b1',
  order: '07',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Subjuntivo Presente en Portugués B1',
  shortTitle: 'Subjuntivo Presente',
  metaTitle: 'Subjuntivo Presente Portugués B1 — Uso y Conjugación',
  description:
    'El subjuntivo presente en portugués expresa deseos, dudas, posibilidades y emociones cuando el sujeto de la cláusula principal es diferente del de la subordinada. Se usa después de verbos de opinión, deseo, emoción y expresiones impersonales. Es uno de los rasgos más característicos del portugués culto y es indispensable para B1.',
  lead: 'Domina el subjuntivo presente portugués: cuándo usarlo, conjugación regular e irregular, y construcciones típicas.',
  outcomes: [
    'Conjuga verbos regulares e irregulares en subjuntivo presente',
    'Usa el subjuntivo después de expresiones de deseo, duda, emoción y opinión',
    'Distingue cuándo usar subjuntivo vs indicativo',
    'Construye oraciones complejas con subjuntivo de forma natural',
  ],

  guide: {
    goal: 'Expresar deseos, dudas, emociones y posibilidades usando el subjuntivo presente con los desencadenantes más comunes.',
    model: 'Espero que você venha. / É possível que chova amanhã. / Quero que você estude mais.',
    formula: 'Verbo principal + que + sujeito diferente + subjuntivo presente',
    decisions: [
      'Verbos -AR: elimina -ar, añade -e, -es, -e, -emos, -eis, -em (falar → fale, fales, fale, falemos, faleis, falem)',
      'Verbos -ER/-IR: elimina -er/-ir, añade -a, -as, -a, -amos, -ais, -am (comer → coma; partir → parta)',
      'Irregulares frecuentes: ser→seja, estar→esteja, ir→vá, fazer→faça, ter→tenha, vir→venha, poder→possa, querer→queira, saber→saiba',
      'El subjuntivo va después de: espero/desejo/quero que, é possível/provável/necessário/importante que, me alegra/preocupa/incomoda que, não acredito/duvido que',
      'Si el sujeto es el mismo en ambas cláusulas, usa el infinitivo: Quero viajar (no: quero que eu viaje)',
      'Con "para que" (para, a fim de que), "embora" (aunque), "sem que" (sin que), usa subjuntivo: Estou estudando para que passe no exame.',
    ],
    table: [
      ['Verbo', 'Indicativo presente', 'Subjuntivo presente'],
      ['falar', 'falo, falas, fala...', 'fale, fales, fale, falemos, faleis, falem'],
      ['comer', 'como, comes, come...', 'coma, comas, coma, comamos, comais, comam'],
      ['partir', 'parto, partes, parte...', 'parta, partas, parta, partamos, partais, partam'],
      ['ser', 'sou, és, é...', 'seja, sejas, seja, sejamos, sejais, sejam'],
      ['estar', 'estou, estás, está...', 'esteja, estejas, esteja, estejamos, estejais, estejam'],
    ],
    mistakes: [
      '"Espero que você vem" ❌ → "Espero que você venha" ✓ — después de "espero que" el verbo debe ir en subjuntivo.',
      '"Quero que eu viaje" ❌ → "Quero viajar" ✓ — mismo sujeto: usa el infinitivo, no el subjuntivo.',
      '"É necessário estudar muito" ✓ (sujeto genérico) vs "É necessário que você estude" ✓ — con sujeto específico, usa que + subjuntivo.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el subjuntivo presente en portugués?',
      paragraphs: [
        'El subjuntivo presente (modo subjuntivo, tempo presente) es un modo verbal que expresa subjetividad: deseos, dudas, emociones, posibilidades y opiniones. A diferencia del indicativo, que presenta los hechos como reales y objetivos, el subjuntivo los presenta desde la perspectiva del hablante o como hipotéticos.',
        'En portugués moderno se usa con frecuencia tanto en el lenguaje escrito como hablado, especialmente después de verbos que expresan voluntad, sentimiento o duda cuando hay dos sujetos diferentes. Es una de las estructuras más importantes del nivel B1.',
      ],
    },
    {
      heading: '¿Cómo se conjuga el subjuntivo presente en portugués?',
      paragraphs: [
        'Para los verbos en -AR: elimina la terminación y añade -e, -es, -e, -emos, -eis, -em. Ejemplo: falar → (que eu) fale, (que você/ele) fale, (que nós) falemos, (que vocês/eles) falem.',
        'Para los verbos en -ER: elimina la terminación y añade -a, -as, -a, -amos, -ais, -am. Ejemplo: comer → (que eu) coma, (que você) coma, (que nós) comamos.',
        'Para los verbos en -IR: la conjugación es similar a la de -ER: partir → (que eu) parta, (que você) parta, (que nós) partamos.',
      ],
    },
    {
      heading: 'Expresiones que requieren subjuntivo',
      paragraphs: [
        'Verbos de deseo y voluntad: querer que, desejar que, preferir que. Ejemplo: "Quero que você venha à festa."',
        'Verbos de duda y negación: duvidar que, não acreditar que, negar que. Ejemplo: "Duvido que ele chegue a tempo."',
        'Verbos de emoción: alegrar-se que, afligir-se que, esperar que, preocupar-se que. Ejemplo: "Me alegra que você esteja bem."',
        'Expresiones impersonales: é possível que, é provável que, é importante que, é necessário que. Ejemplo: "É importante que vocês estudem regularmente."',
      ],
    },
    {
      heading: '¿Cuándo se usa subjuntivo y cuándo indicativo en portugués?',
      paragraphs: [
        'Con verbos de opinión (achar, parecer, pensar), se puede usar indicativo si la opinión es presentada como un hecho cierto: "Acho que você tem razão" (indicativo = seguridad). Pero si es presentada como duda: "Não acho que você tenha razão" (subjuntivo = duda).',
        'Con "porque" (porque, pois) siempre va indicativo: "Não vou porque estou cansado." Con "para que" (para que, a fim de que) y otras conjunciones de propósito, va subjuntivo: "Estou estudando para que você fique orgulhoso."',
      ],
    },
    {
      heading: 'Infinitivo personal vs subjuntivo',
      paragraphs: [
        'En portugués, existe el infinitivo personal que flexiona según el sujeto: "Quero que você coma" vs "Quero comer" vs "Quero que ele coma". El infinitivo personal es más natural en muchos casos: "Quero que vocês comam" = "Quero vocês comerem" (infinitivo personal).',
        'La regla es: cuando los sujetos son diferentes, puedes usar tanto subjuntivo como infinitivo personal (especialmente en portugués brasileño). Cuando el sujeto es el mismo, usa infinitivo simple: "Quero comer" no "Quero que eu coma".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Subjuntivo: expresión de deseo, duda, emoción, posibilidad con dos sujetos diferentes.',
    graphicPrompt: 'Diagrama mostrando la bifurcación: sujeto principal → "que" → sujeto diferente en subjuntivo.',
    scene: [
      ['Espero que você venha amanhã.', 'Espero que vengas mañana.'],
      ['É possível que chova este fim de semana.', 'Es posible que llueva este fin de semana.'],
      ['Meus pais querem que eu seja médico.', 'Mis padres quieren que sea médico.'],
      ['Duvido que ele chegue no horário.', 'Dudo que llegue a tiempo.'],
      ['Me alegra que você tenha passado no exame.', 'Me alegra que hayas aprobado el examen.'],
      ['É importante que vocês estudem regularmente.', 'Es importante que estudien regularmente.'],
      ['Preciso de uma sala onde eu possa trabalhar.', 'Necesito una sala donde pueda trabajar.'],
      ['Faço isto para que você fique contente.', 'Hago esto para que estés contento.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['deseo/duda/emoción', 'dos sujetos diferentes', 'subjuntivo vs indicativo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha o modo correto',
        tag: 'Múltipla escolha',
        intro: 'Escolha entre subjuntivo e indicativo segundo o contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Expresión de deseo',
            lines: [['', "Eu quero que você ___ à festa comigo."]],
            options: ['vens', 'venha', 'virá', 'viria'],
            answer: 'venha',
            explain: 'Después de "quero que" (deseo) con sujeto diferente → subjuntivo.',
          },
          {
            scene: 'Expresión de posibilidad',
            lines: [['', "É possível que ele ___ amanhã."]],
            options: ['chega', 'chegará', 'chegue', 'chegaria'],
            answer: 'chegue',
            explain: 'Expresión impersonal de posibilidad → subjuntivo.',
          },
          {
            scene: 'Expresión de opinión segura',
            lines: [['', "Acho que você ___ razão nesse caso."]],
            options: ['têm', 'tenha', 'terá', 'teria'],
            answer: 'têm',
            explain: '"Acho que" expresa opinión segura → indicativo.',
          },
          {
            scene: 'Expresión de duda',
            lines: [['', "Não acredito que ele ___ a verdade."]],
            options: ['fala', 'fale', 'falará', 'falaria'],
            answer: 'fale',
            explain: '"Não acredito que" expresa duda → subjuntivo.',
          },
          {
            scene: 'Expresión de emoción',
            lines: [['', "Me alegra que você ___ bem de saúde."]],
            options: ['está', 'esteja', 'estará', 'estaria'],
            answer: 'esteja',
            explain: '"Me alegra que" expresa emoción → subjuntivo.',
          },
          {
            scene: 'Mismo sujeto',
            lines: [['', "Eu quiero ___ à festa."]],
            options: ['que eu vá', 'ir', 'vou', 'vá'],
            answer: 'ir',
            explain: 'Mismo sujeto (yo): usa infinitivo, no subjuntivo.',
          },
          {
            scene: 'Propósito',
            lines: [['', "Estou estudando para que você ___ orgulhoso."]],
            options: ['ficará', 'fica', 'fique', 'ficaria'],
            answer: 'fique',
            explain: '"Para que" (propósito) → subjuntivo.',
          },
          {
            scene: 'Cláusula relativa con dudá',
            lines: [['', "Preciso de um livro que ___ fácil de ler."]],
            options: ['é', 'seja', 'será', 'seria'],
            answer: 'seja',
            explain: '"Preciso de...que" (restricción) → subjuntivo.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dois modos em contexto',
        tag: '2 espaços',
        intro: 'Complete com subjuntivo ou indicativo segundo o contexto.',
        type: 'dual',
        items: [
          {
            scene: 'Desejo vs certeza',
            lines: [['', "Eu quero que você [[0]] no exame e acho que você [[1]] capacidade para passar."]],
            blanks: [
              { options: ['passa', 'passe', 'passará', 'passaria'], answer: 'passe', explain: '"Quero que" (deseo) → subjuntivo.' },
              { options: ['tem', 'tenha', 'terá', 'teria'], answer: 'tem', explain: '"Acho que" (opinión segura) → indicativo.' },
            ],
          },
          {
            scene: 'Propósito y resultado',
            lines: [['', "Ele trabalha para que sua família [[0]] bem de vida, e sua esposa [[1]] que ele é muito dedicado."]],
            blanks: [
              { options: ['tem', 'tenha', 'terá', 'teria'], answer: 'tenha', explain: '"Para que" (propósito) → subjuntivo.' },
              { options: ['sabe', 'saiba', 'saberá', 'saberia'], answer: 'sabe', explain: '"Sua esposa sabe" (hecho cierto) → indicativo.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narração de desejos',
        tag: 'Texto guiado',
        intro: 'Complete esta narrativa usando subjuntivo o indicativo según corresponda.',
        type: 'guidedText',
        scene: 'Uma mãe expressando esperanças para seu filho.',
        text: "Quero que meu filho [[0]] (ter) uma boa educação. Espero que ele [[1]] (aproveitar) todas as oportunidades que a vida lhe oferece. Sei que ele [[2]] (ser) inteligente e responsável. Acho que ele [[3]] (poder) chegar longe em sua carreira. Para que ele [[4]] (alcançar) seus sonhos, vou fazer tudo que está ao meu alcance.",
        blanks: [
          { options: ['tem', 'tenha', 'terá'], answer: 'tenha', explain: '"Quero que" (deseo) → subjuntivo.' },
          { options: ['aproveita', 'aproveite', 'aproveitará'], answer: 'aproveite', explain: '"Espero que" (esperanza) → subjuntivo.' },
          { options: ['é', 'seja', 'será'], answer: 'é', explain: '"Sei que" (certeza) → indicativo.' },
          { options: ['pode', 'possa', 'poderá'], answer: 'pode', explain: '"Acho que" (opinión segura) → indicativo.' },
          { options: ['alcance', 'alcança', 'alcançará'], answer: 'alcance', explain: '"Para que" (propósito) → subjuntivo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjugação livre',
        tag: 'Texto livre',
        intro: 'Complete los verbos en subjuntivo presente.',
        type: 'freeText',
        scene: 'Cartas de motivação y deseos.',
        text: "Para que você [[0]] (conseguir) seus objetivos, [[1]] (ser) necessário dedicação. Espero que você [[2]] (ir) atrás de seus sonhos. Quero que você [[3]] (saber) que eu acredito em você. É importante que você [[4]] (estar) sempre otimista.",
        blanks: [
          { answer: 'consiga', accepted: ['consiga'], explain: '"Para que" (propósito) → subjuntivo presente de "conseguir".' },
          { answer: 'será', accepted: ['será'], explain: '"Será necessário" → futuro de indicativo.' },
          { answer: 'vá', accepted: ['vá'], explain: '"Espero que" (esperanza) → subjuntivo presente de "ir".' },
          { answer: 'saiba', accepted: ['saiba'], explain: '"Quero que" (deseo) → subjuntivo presente de "saber".' },
          { answer: 'esteja', accepted: ['esteja'], explain: '"É importante que" (expresión impersonal) → subjuntivo de "estar".' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción guiada',
        tag: 'Producción',
        intro: 'Escribe frases usando subjuntivo según las instrucciones.',
        type: 'write',
        items: [
          {
            scene: 'Expresión de deseo',
            prompt: "Escribe una frase sobre algo que deseas que ocurra (quero que... / espero que...).",
            answer: "Quero que você chegue em casa com segurança.",
            accepted: ['quero', 'espero', 'desejo', 'prefiro', 'que', 'subjuntivo'],
            explain: "Usa subjuntivo después de verbos de deseo con sujeto diferente.",
          },
          {
            scene: 'Expresión de propósito',
            prompt: "Escribe una frase sobre algo que haces con un propósito (para que + subjuntivo).",
            answer: "Estudo para que meus pais fiquem orgulhosos.",
            accepted: ['para que', 'a fim de que', 'subjuntivo', 'estudo'],
            explain: '"Para que" siempre va seguido de subjuntivo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de verbos',
        tag: 'Análise',
        intro: 'Identifica si el verbo es subjuntivo o indicativo y explica por qué.',
        type: 'write',
        items: [
          {
            scene: 'Clasificación modal',
            prompt: "Lee: 'Não acho que ele venha' vs 'Acho que ele vem'. ¿Cuál usa subjuntivo? ¿Por qué?",
            answer: "'Não acho que ele venha' usa subjuntivo porque la negación 'não' introduce duda. 'Acho que ele vem' usa indicativo porque expresa opinión segura.",
            accepted: ['não', 'dúvida', 'subjuntivo', 'acho', 'indicativo', 'segura'],
            explain: 'La negación cambia el modo: opinión segura (indicativo) vs opinión dudosa (subjuntivo).',
          },
        ],
      },
    ],
  },
}

export default topic
