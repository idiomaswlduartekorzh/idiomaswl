import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'subjuntivo-presente-a2',
  order: '16',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Subjuntivo presente en portugués A2: quero que você venha',
  shortTitle: 'Subjuntivo presente',
  metaTitle: 'Subjuntivo presente en portugués A2 — quero que, espero que, é importante que',
  description:
    'El subjuntivo presente (subjuntivo do presente) en portugués se usa para expresar deseos, dudas, emociones y recomendaciones. Se activa después de expresiones como "quero que", "espero que", "é importante que". Su formación parte de la 1ª persona del presente indicativo.',
  lead: 'Quero que você venha: el subjuntivo portugués que expresa deseos y emociones.',
  outcomes: [
    'Formar el subjuntivo presente a partir de la 1ª persona del indicativo',
    'Usar el subjuntivo después de quero que, espero que, é importante que',
    'Conjugar los verbos irregulares más comunes en subjuntivo',
    'Reconocer cuándo se necesita subjuntivo vs. infinitivo personal',
  ],

  guide: {
    goal: 'Usar el subjuntivo presente para expresar deseos, emociones y recomendaciones en portugués.',
    model: 'Quero que você estude mais. (Quiero que estudies más.) / É importante que ele venha.',
    formula: '1ª persona indicativo (ex: falo) → quita -o → añade terminaciones: -e/-es/-e/-emos/-em',
    decisions: [
      'Formación: 1ª sing. indicativo → quita -o → añade -e, -es, -e, -emos, -em (para verbos en -ar)',
      'Verbos -er/-ir en subjuntivo: 1ª sing. indicativo → quita -o → añade -a, -as, -a, -amos, -am',
      'Irregulares frecuentes: ser → seja/sejas/seja; estar → esteja; ir → vá; ter → tenha; vir → venha',
      'Contextos de activación: quero que, espero que, é importante/necessário que, embora, para que',
      'Con el mismo sujeto, se usa infinitivo: "Quero estudar" (no subjuntivo). Con sujetos diferentes: "Quero que ele estude"',
    ],
    table: [
      ['Pronome', 'falar (subjuntivo)', 'comer (subjuntivo)'],
      ['eu', 'fale', 'coma'],
      ['você/ele/ela', 'fale', 'coma'],
      ['nós', 'falemos', 'comamos'],
      ['vocês/eles/elas', 'falem', 'comam'],
    ],
    mistakes: [
      '"Quero que você estudia" ❌ → "Quero que você estude" ✓ — después de "que" con sujeto diferente → subjuntivo.',
      '"É importante você venha" ❌ → "É importante que você venha" ✓ — no se puede omitir el "que" con subjuntivo.',
      '"Espero que ele está bem" ❌ → "Espero que ele esteja bem" ✓ — "estar" irregular: subjuntivo = esteja.',
    ],
  },

  seo: [
    {
      heading: 'El subjuntivo presente en portugués',
      paragraphs: [
        'El subjuntivo do presente en portugués se activa después de ciertos verbos y expresiones que indican deseo, duda, emoción o recomendación: "quero que", "espero que", "é importante que", "tomara que", "embora", "para que". La clave es que el sujeto de la cláusula principal sea diferente al de la subordinada.',
        'La formación es sistemática: se toma la 1ª persona del singular del presente indicativo, se quita la -o final, y se añaden las terminaciones del subjuntivo. "falar" → "falo" → "fale, fales, fale, falemos, falem".',
      ],
    },
    {
      heading: 'Irregulares esenciales del subjuntivo',
      paragraphs: [
        'Los verbos más irregulares en subjuntivo son los que más se usan: ser → seja, estar → esteja, ir → vá, ter → tenha, vir → venha, dar → dê, saber → saiba, poder → possa, querer → queira. Estos deben memorizarse porque no siguen la regla general.',
        '"Tomara que chova!" (¡Ojalá llueva!) y "Espero que você se divirta" (Espero que te diviertas) son ejemplos cotidianos donde el subjuntivo es indispensable en el portugués formal y estándar.',
      ],
    },
    {
      heading: '¿Cómo se forma el presente de subjuntivo en portugués?',
      paragraphs: [
        'Se parte de la 1ª persona del presente de indicativo, se quita la -o y se añade la terminación "opuesta": los verbos en -ar toman -e, y los en -er/-ir toman -a. Así "falo" → fale, "como" → coma, "parto" → parta. Esta tabla muestra el paradigma completo de los tres grupos:',
      ],
      table: [
        ['Persona', 'falar (-ar)', 'comer (-er)', 'partir (-ir)'],
        ['eu', 'fale', 'coma', 'parta'],
        ['você/ele/ela', 'fale', 'coma', 'parta'],
        ['nós', 'falemos', 'comamos', 'partamos'],
        ['vocês/eles/elas', 'falem', 'comam', 'partam'],
      ],
    },
    {
      heading: '¿Cuáles son los verbos irregulares del subjuntivo presente?',
      paragraphs: [
        'Los que no forman su subjuntivo a partir de la 1ª persona del indicativo. Son pocos pero muy frecuentes y hay que memorizarlos. Esta tabla reúne los esenciales del A2:',
      ],
      table: [
        ['Infinitivo', 'Subjuntivo (eu/ele)', 'Ejemplo'],
        ['ser', 'seja', 'Espero que seja fácil.'],
        ['estar', 'esteja', 'Tomara que esteja bem.'],
        ['ir', 'vá', 'Quero que ele vá.'],
        ['ter', 'tenha', 'Espero que tenha sorte.'],
        ['vir', 'venha', 'Quero que você venha.'],
        ['dar', 'dê', 'Espero que dê certo.'],
        ['saber', 'saiba', 'É bom que ele saiba.'],
        ['querer', 'queira', 'Se você quiser…'],
      ],
    },
    {
      heading: '¿Cuándo se usa subjuntivo y cuándo infinitivo en portugués?',
      paragraphs: [
        'Depende de si hay uno o dos sujetos. Con el mismo sujeto se usa infinitivo: "Quero estudar" (yo quiero, yo estudio). Con sujetos distintos, aparece el "que" y el subjuntivo: "Quero que você estude" (yo quiero, tú estudias). Este contraste es idéntico al español (quiero estudiar / quiero que estudies), así que la lógica se traslada directa. La otra trampa es no omitir el "que": "É importante que você venha" es correcto, "É importante você venha" no.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Subjuntivo presente: deseos, emociones y recomendaciones con sujetos distintos.',
    graphicPrompt: 'Dos personas: una expresando un deseo sobre la otra, con burbujas de diálogo mostrando "quero que".',
    scene: [
      ['Quero que você venha à festa.', 'Quiero que vengas a la fiesta.'],
      ['Espero que ele esteja bem.', 'Espero que él esté bien.'],
      ['É importante que vocês estudem.', 'Es importante que estudien.'],
      ['Tomara que faça sol amanhã!', '¡Ojalá haga sol mañana!'],
      ['Para que você aprenda, precisa praticar.', 'Para que aprendas, necesitas practicar.'],
      ['Embora seja difícil, vou tentar.', 'Aunque sea difícil, lo intentaré.'],
    ],
    learnerModes: ['reading', 'choosing', 'typing'],
    reviewFocus: ['quero que + subjuntivo', 'formação: -o → -e/-a', 'irregulares: seja/esteja/venha'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Indicativo o subjuntivo',
        tag: 'Opción múltiple',
        intro: 'Selecciona la forma verbal correcta según el contexto.',
        type: 'choice',
        items: [
          {
            scene: 'Expresando un deseo sobre otra persona.',
            lines: [['', 'Quero que você ___ mais.']],
            options: ['estude', 'estuda', 'estudia', 'estudar'],
            answer: 'estude',
            explain: '"quero que" + sujeto diferente → subjuntivo: "estude" (3ª sing. de estudar).',
          },
          {
            scene: 'Esperando que alguien esté bien.',
            lines: [['', 'Espero que ele ___ bem.']],
            options: ['esteja', 'está', 'estar', 'esteve'],
            answer: 'esteja',
            explain: '"espero que" → subjuntivo. "estar" irregular: esteja.',
          },
          {
            scene: 'Recomendando algo importante.',
            lines: [['', 'É importante que você ___ água.']],
            options: ['beba', 'bebe', 'beber', 'bebendo'],
            answer: 'beba',
            explain: '"é importante que" → subjuntivo. "beber" → subjuntivo: beba.',
          },
          {
            scene: 'Con el mismo sujeto, usando infinitivo.',
            lines: [['', 'Quero ___ mais.']],
            options: ['estudar', 'estude', 'estuda', 'estudia'],
            answer: 'estudar',
            explain: 'Mismo sujeto → infinitivo personal: "Quero estudar" (no subjuntivo).',
          },
          {
            scene: 'Expresando una concesión.',
            lines: [['', 'Embora ___ difícil, vou tentar.']],
            options: ['seja', 'é', 'ser', 'sendo'],
            answer: 'seja',
            explain: '"embora" siempre activa el subjuntivo: "seja" (subjuntivo de ser).',
          },
          {
            scene: 'Ojalá haga calor.',
            lines: [['', 'Tomara que ___ calor amanhã!']],
            options: ['faça', 'faz', 'fazer', 'fez'],
            answer: 'faça',
            explain: '"tomara que" (ojalá) → subjuntivo. "fazer" → subjuntivo: faça.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Expresión activadora y verbo',
        tag: '2 espacios',
        intro: 'Completa la expresión activadora y el verbo en subjuntivo.',
        type: 'dual',
        items: [
          {
            scene: 'Recomendando que alguien venga.',
            lines: [['', '[[0]] que ele [[1]] cedo.']],
            blanks: [
              { options: ['É necessário', 'Quero', 'Espero', 'Embora'], answer: 'É necessário', explain: '"É necessário que" = es necesario que → activa subjuntivo.' },
              { options: ['venha', 'vem', 'vir', 'vinha'], answer: 'venha', explain: '"vir" → subjuntivo irregular: venha.' },
            ],
          },
          {
            scene: 'Expresando un deseo sobre el tiempo.',
            lines: [['', '[[0]] que [[1]] sol no fim de semana!']],
            blanks: [
              { options: ['Tomara', 'Quero', 'É importante', 'Embora'], answer: 'Tomara', explain: '"Tomara que" = ojalá → activa subjuntivo.' },
              { options: ['faça', 'faz', 'fazer', 'fez'], answer: 'faça', explain: '"fazer" → faça (subjuntivo).' },
            ],
          },
          {
            scene: 'Aunque sea tarde, viene.',
            lines: [['', '[[0]] [[1]] tarde, ela vem.']],
            blanks: [
              { options: ['Embora', 'Espero', 'Quero', 'Para que'], answer: 'Embora', explain: '"Embora" (aunque) siempre requiere subjuntivo.' },
              { options: ['seja', 'é', 'ser', 'estava'], answer: 'seja', explain: '"ser" → subjuntivo: seja.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Consejos para un viaje',
        tag: 'Texto guiado',
        intro: 'Completa los consejos usando el subjuntivo presente.',
        type: 'guidedText',
        scene: 'Uma amiga dá conselhos para você antes de viajar para o Brasil.',
        text: 'Espero que você [[0]] se divertir muito! É importante que você [[1]] bastante água porque faz calor. Tomara que [[2]] sol todos os dias. Para que você [[3]] mais, fale com os brasileiros. Embora o português [[4]] difícil, você vai aprender.',
        blanks: [
          { options: ['consiga', 'consegue', 'conseguir', 'conseguiu'], answer: 'consiga', explain: '"espero que" → subjuntivo. "conseguir" → consiga.' },
          { options: ['beba', 'bebe', 'beber', 'bebeu'], answer: 'beba', explain: '"é importante que" → subjuntivo: beba.' },
          { options: ['faça', 'faz', 'fazer', 'fez'], answer: 'faça', explain: '"tomara que" → subjuntivo: faça.' },
          { options: ['aprenda', 'aprende', 'aprender', 'aprendeu'], answer: 'aprenda', explain: '"para que" → subjuntivo: aprenda.' },
          { options: ['seja', 'é', 'ser', 'foi'], answer: 'seja', explain: '"embora" → subjuntivo: seja.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Conjuga en subjuntivo',
        tag: 'Texto libre',
        intro: 'Sin opciones: conjuga el verbo entre paréntesis en subjuntivo presente.',
        type: 'freeText',
        scene: 'Deseos y recomendaciones.',
        text: 'Quero que você [[0]] (falar) com ele. / É importante que nós [[1]] (ir). / Espero que eles [[2]] (chegar) cedo. / Tomara que ela [[3]] (ter) sucesso. / Para que vocês [[4]] (entender), preciso explicar melhor.',
        blanks: [
          { answer: 'fale', explain: '"falar" → 1ª sing: falo → fale (subjuntivo, você).' },
          { answer: 'vamos', explain: '"ir" → subjuntivo: nós vamos (informal) ou nós vá (raro) — en la práctica nós + ir en subjuntivo usa "vamos" coloquialmente.' },
          { answer: 'cheguem', explain: '"chegar" → 1ª sing: chego → chegu- → cheguem (subjuntivo plural).' },
          { answer: 'tenha', explain: '"ter" → subjuntivo irregular: tenha.' },
          { answer: 'entendam', explain: '"entender" → 1ª sing: entendo → entend- → entendam (plural).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Expresa deseos y recomendaciones',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa con subjuntivo.',
        type: 'write',
        items: [
          {
            scene: 'Quieres que tu amigo venga a la fiesta.',
            prompt: 'Quero que meu amigo... (vir à festa)',
            answer: 'Quero que meu amigo venha à festa.',
            accepted: ['Espero que meu amigo venha à festa.'],
            explain: '"vir" → subjuntivo irregular: venha.',
          },
          {
            scene: 'Es importante que los estudiantes estudien.',
            prompt: 'É importante que os alunos... (estudar mais)',
            answer: 'É importante que os alunos estudem mais.',
            accepted: ['É necessário que os alunos estudem mais.'],
            explain: '"estudar" → estudem (plural del subjuntivo).',
          },
          {
            scene: 'Aunque sea tarde, terminarás el trabajo.',
            prompt: 'Embora seja tarde, você... (terminar o trabalho)',
            answer: 'Embora seja tarde, você vai terminar o trabalho.',
            accepted: ['Embora seja tarde, terminarás o trabalho.'],
            explain: '"embora seja" → subjuntivo de ser. La cláusula principal usa indicativo.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Escribe deseos y consejos',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones propias con subjuntivo expresando deseos, esperanzas o consejos.',
        type: 'write',
        items: [
          {
            scene: 'Escribe tres deseos para un amigo que empieza a estudiar portugués.',
            prompt: 'Escreva três conselhos usando "é importante que", "espero que", "tomara que".',
            answer: 'É importante que você pratique todo dia. Espero que você aprenda rápido. Tomara que você venha ao Brasil!',
            accepted: ['É necessário que você ouça músicas em português. Espero que você se divirta aprendendo.'],
            explain: 'Cada expressão ativa o subjuntivo do presente no verbo seguinte.',
          },
          {
            scene: 'Expresa un deseo para el futuro usando "tomara que" u "oxalá".',
            prompt: 'Escreva um desejo pessoal com "tomara que" ou "espero que".',
            answer: 'Tomara que eu encontre um emprego bom este ano.',
            accepted: ['Espero que minha família esteja sempre bem.'],
            explain: '"tomara que" e "espero que" + subjuntivo = deseos y esperanzas en portugués.',
          },
        ],
      },
    ],
  },
}

export default topic
