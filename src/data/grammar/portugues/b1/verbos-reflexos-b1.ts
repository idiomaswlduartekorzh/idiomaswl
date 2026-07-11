import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'verbos-reflexos-b1',
  order: '17',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Verbos Reflexos en Portugués B1',
  shortTitle: 'Verbos Reflexos',
  metaTitle: 'Verbos Reflexos Portugués B1 — Estructuras Reflexivas y Pronombres "Se"',
  description:
    'Los verbos reflexos son aquellos donde la acción recae sobre el sujeto mismo (levantarse, bañarse, cuidarse). En portugués son extremadamente comunes y frecuentes en la oralidad. Se forman con un verbo + pronombre reflexivo (me, te, se, nos, vos, se). Incluyen: reflexivos puros (bañarse), reflexivos recíprocos (amarse mutuamente) y reflexivos cuasi-reflexivos (arrepentirse, quejarse).',
  lead: 'Domina verbos reflexos: conjugación, pronombre placement, reflexivos puros vs recíprocos.',
  outcomes: [
    'Reconoce y forma verbos reflexos con pronombres (me, te, se, nos)',
    'Distingue reflexivos puros (action on self) de recíprocos (mutual action)',
    'Coloca pronombres reflexivos según las reglas de colocación portuguesas',
    'Usa verbos reflexos comunes: levantar-se, deitar-se, arrepender-se, lembrar-se',
  ],

  guide: {
    goal: 'Usar verbos reflexos para expresar acciones que recaen sobre el sujeto mismo.',
    model: 'Eu me levanto cedo. / Você se veste rapidamente. / Eles se abraçam diariamente. / Ela se arrependeu.',
    formula: 'Verbo reflexivo = infinitivo + -se | Conjugación: me, te, se, nos, vos, se (proclíticos/enclíticos según verbo)',
    decisions: [
      'Reflexivos puros: la acción recae totalmente en el sujeto (banhar-se, pentear-se)',
      'Reflexivos recíprocos: dos sujetos realizan la acción mutuamente (amar-se, abraçar-se, encontrar-se)',
      'Reflexivos cuasi-reflexivos: verbo + pronombre cambia significado (arrepender-se, queixar-se, lembrar-se)',
      'Colocación: proclítica en infinitivo personal (arrepender-me, lembrar-te) o enclítica en infinitivo impersonal (para arrepender-me)',
      'En negación: proclítica (não me levanto, não se deita)',
      'Participios: concordancia en voz pasiva reflexiva (as janelas se abriram)',
    ],
    table: [
      ['Verbo reflexivo', 'Infinitivo', 'Presente 1ª persona', 'Pretérito 1ª persona'],
      ['Levantar-se', 'infinitivo reflexivo', 'me levanto', 'me levantei'],
      ['Vestir-se', 'infinitivo reflexivo', 'me visto', 'me vesti'],
      ['Abrir-se', 'infinitivo reflexivo', 'me abro', 'me abri'],
      ['Arrepender-se', 'infinitivo reflexivo', 'me arrependo', 'me arrependi'],
      ['Lembrar-se', 'infinitivo reflexivo', 'me lembro', 'me lembrei'],
    ],
    mistakes: [
      '"Eu levanto-me cedo" ❌ (enclítica en prótasis negativa) → "Eu me levanto cedo" ✓ (proclítica).',
      '"Se lembrar" ❌ (sin pronombre en infinitivo personal) → "Lembrar-me" ✓ (infinitivo personal con pronombre enclítico).',
      '"Eles se abraçam-se" ❌ (pronombre duplicado) → "Eles se abraçam" ✓ (solo una vez).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los verbos reflexos en portugués?',
      paragraphs: [
        'Los verbos reflexos son verbos transitivos donde el objeto directo es el mismo sujeto. Se forman añadiendo el pronombre reflexivo "se" al infinitivo: banhar-se (bañarse), pentear-se (peinarse), levantar-se (levantarse).',
        'En portugués, especialmente en la oralidad brasileña, los reflexivos son extremadamente comunes. Aparecen en muchas situaciones cotidianas y son frecuentes en el CELPE-Bras.',
      ],
    },
    {
      heading: 'Reflexivos puros: acciones que recaen sobre el sujeto',
      paragraphs: [
        'En reflexivos puros, el sujeto realiza la acción sobre sí mismo. Ejemplos: levantarse (levantar-se), bañarse (banhar-se), peinarse (pentear-se), vestirse (vestir-se), acostarse (deitar-se).',
        'La acción es completa: si dices "Eu me banhei", significa que yo mismo realicé la acción de bañarme, no que alguien me bañó.',
      ],
    },
    {
      heading: 'Reflexivos recíprocos: acciones mutuas entre dos o más sujetos',
      paragraphs: [
        'En reflexivos recíprocos, dos sujetos realizan la acción el uno sobre el otro mutuamente. Ejemplos: amarse (amar-se), abrazarse (abraçar-se), encontrarse (encontrar-se), besarse (beijar-se), conocerse (conhecer-se).',
        '"Eles se amam" significa que ellos se aman mutuamente (uno al otro). Notar que el mismo pronombre "se" expresa tanto reflexivo puro como recíproco, pero el contexto deja claro cuál es.',
      ],
    },
    {
      heading: 'Reflexivos cuasi-reflexivos: cambio de significado con pronombre',
      paragraphs: [
        'Hay verbos cuyo significado cambia cuando se añade el pronombre reflexivo. Ejemplos: acordar (despertar) vs acordarse (recordar), parecer vs parecerse (parecerse físicamente). Otros: arrepentirse (arrepender-se), quejarse (queixar-se), atreverse (atrever-se).',
        'Estos verbos son problemáticos porque pueden causar confusión: "Acordei cedo" (Desperté temprano) vs "Me acordei de você" (Me acordé de ti, recordé).',
      ],
    },
    {
      heading: 'Colocación de pronombres reflexivos',
      paragraphs: [
        'Los pronombres reflexivos siguen las mismas reglas de colocación que otros pronombres: proclítica (antes) en negación y subordinadas ("Não me levanto", "Se eu me levantasse"), enclítica (después) en afirmación e infinitivo impersonal ("Levanto-me", "para levantar-me").',
        'En infinitivo personal (infinitivo conjugado), el pronombre va al final: "lembrar-me", "lembrar-te", "lembrar-nos". En el presente, es proclítico: "me lembro", "te lembras".',
      ],
    },
    {
      heading: 'Pasiva refleja: construcciones impersonales con "se"',
      paragraphs: [
        'El portugués usa "se" para crear oraciones impersonales que funcionan como pasiva: "Aquí se habla portugués" (Aquí se habla portugués = Here Portuguese is spoken). "Abre-se cedo" (Se abre temprano = It opens early).',
        'Diferencia: reflexivo puro ("Ele se abre para novos desafios" = He opens himself) vs pasiva refleja ("A porta se abre" = The door opens itself, impersonal). Son sintácticamente similares pero semánticamente diferentes.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Verbos reflexos: puros (action on self), recíprocos (mutual), cuasi-reflexivos (semantic change).',
    graphicPrompt: 'Tabla: infinitivo reflexivo, conjugación presente, ejemplos puros vs recíprocos.',
    scene: [
      ['Eu me levanto cedo todos os dias.', 'Me levanto temprano todos los días.'],
      ['Você se veste muito rapidamente.', 'Te vistes muy rápidamente.'],
      ['Eles se abraçam com amor.', 'Se abrazan con amor.'],
      ['Ela se arrependeu de suas palavras.', 'Se arrepintió de sus palabras.'],
      ['Nós nos encontramos no café.', 'Nos encontramos en la cafetería.'],
      ['Ele se lembrou de você.', 'Se acordó de ti.'],
      ['As crianças se divertem no parque.', 'Los niños se divierten en el parque.'],
      ['Aqui se fala português corretamente.', 'Aquí se habla portugués correctamente.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['puro vs recíproco', 'colocación', 'infinitivo personal', 'verbos comunes'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce y forma reflexivos',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta del verbo reflexivo.',
        type: 'choice',
        items: [
          {
            scene: 'Reflexivo puro',
            lines: [['', 'Eu ___ cedo todos os dias. (levantar-se)']],
            options: ['levanto', 'me levanto', 'levanto-me', 'me levanto-me'],
            answer: 'me levanto',
            explain: 'Presente proclítica: me levanto.',
          },
          {
            scene: 'Reflexivo recíproco',
            lines: [['', 'Eles ___ com paixão. (amar-se)']],
            options: ['amam', 'se amam', 'amam-se', 'se ama'],
            answer: 'se amam',
            explain: 'Recíproco: se amam (mutuamente).',
          },
          {
            scene: 'Reflexivo cuasi-reflexivo',
            lines: [['', 'Ele ___ de tudo. (queixar-se)']],
            options: ['queixa', 'se queixa', 'queixa-se', 'queixa se'],
            answer: 'se queixa',
            explain: 'Presente proclítica: se queixa.',
          },
          {
            scene: 'Pretérito',
            lines: [['', 'Eu ___ ontem cedo. (acordar-se/despertar-se)']],
            options: ['acordei', 'me acordei', 'acordei-me', 'acordei se'],
            answer: 'acordei',
            explain: 'Pretérito de acordar: acordei (sin "me" si significa despertar).',
          },
          {
            scene: 'Infinitivo personal',
            lines: [['', 'Quero ___ de você. (lembrar-se)']],
            options: ['lembrar', 'me lembrar', 'lembrar-me', 'me lembrar-me'],
            answer: 'lembrar-me',
            explain: 'Infinitivo personal enclítico: lembrar-me.',
          },
          {
            scene: 'Negación',
            lines: [['', 'Não ___ de nada. (lembrar-se)']],
            options: ['lembro', 'me lembro', 'lembro-me', 'lembra-me'],
            answer: 'me lembro',
            explain: 'Negación proclítica: não me lembro.',
          },
          {
            scene: 'Pasiva refleja',
            lines: [['', 'Aqui ___ português muito bem. (falar-se)']],
            options: ['fala', 'se fala', 'fala-se', 'se falam'],
            answer: 'se fala',
            explain: 'Impersonal/pasiva refleja: se fala.',
          },
          {
            scene: 'Infinitivo impersonal',
            lines: [['', 'É importante ___ de erros. (aprender-se)']],
            options: ['aprender', 'aprender-se', 'se aprender', 'aprender se'],
            answer: 'aprender-se',
            explain: 'Infinitivo impersonal: aprender-se.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Reflexivo puro vs recíproco',
        tag: '2 decisiones',
        intro: 'Completa con reflexivos identificando si es puro o recíproco.',
        type: 'dual',
        items: [
          {
            scene: 'Puro (individual) y recíproco (mutuo)',
            lines: [['', "Ela [[0]] (pentear) antes de sair. Eles [[1]] (abraçar) quando [[2]] (encontrar)."]],
            blanks: [
              { options: ['penteia', 'se penteia', 'penteia-se'], answer: 'se penteia', explain: 'Reflexivo puro: se penteia.' },
              { options: ['abraçam', 'se abraçam', 'abraçam-se'], answer: 'se abraçam', explain: 'Recíproco: se abraçam.' },
              { options: ['encontram', 'se encontram', 'encontram-se'], answer: 'se encontram', explain: 'Recíproco: se encontram.' },
            ],
          },
          {
            scene: 'Puro (action on self) y cuasi-reflexivo (semantic)',
            lines: [['', "Eu [[0]] (banhar) todas as noites. Ele [[1]] (arrepender) de suas ações."]],
            blanks: [
              { options: ['banho', 'me banho', 'banho-me'], answer: 'me banho', explain: 'Reflexivo puro: me banho.' },
              { options: ['arrepende', 'se arrepende', 'arrepende-se'], answer: 'se arrepende', explain: 'Cuasi-reflexivo: se arrepende.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa con reflexivos',
        tag: 'Texto guiado',
        intro: 'Completa una narrativa con verbos reflexivos.',
        type: 'guidedText',
        scene: 'Descripción de la rutina diaria.',
        text: 'Todos os dias eu [[0]] (levantar) às 6 da manhã. Primeiro, [[1]] (banhar) e depois [[2]] (pentear). Meu marido [[3]] (vestir) enquanto eu [[4]] (maquiar). Nós [[5]] (encontrar) na cozinha para o café da manhã. À noite, [[6]] (deitar) cansados mas felizes.',
        blanks: [
          { options: ['levanto', 'me levanto', 'levanto-me'], answer: 'me levanto', explain: 'Reflexivo puro: me levanto.' },
          { options: ['banho', 'me banho', 'banho-me'], answer: 'me banho', explain: 'Reflexivo: me banho.' },
          { options: ['penteia', 'me penteia', 'penteio'], answer: 'me penteio', explain: 'Reflexivo: me penteio.' },
          { options: ['veste', 'se veste', 'veste-se'], answer: 'se veste', explain: 'Reflexivo: se veste.' },
          { options: ['maquio', 'me maquio', 'maquio-me'], answer: 'me maquio', explain: 'Reflexivo: me maquio.' },
          { options: ['encontramos', 'nos encontramos', 'encontramos-nos'], answer: 'nos encontramos', explain: 'Recíproco: nos encontramos.' },
          { options: ['deitamos', 'nos deitamos', 'deitamos-nos'], answer: 'nos deitamos', explain: 'Reflexivo: nos deitamos.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escritura con reflexivos',
        tag: 'Texto libre',
        intro: 'Escribe sobre tu rutina diaria usando verbos reflexivos.',
        type: 'freeText',
        scene: 'Descripción personal de actividades reflexivas.',
        text: '1. [[0]] (Me levanto) a las 7. 2. [[1]] (Me ducho) rápidamente. 3. [[2]] (Me visto) en 10 minutos. 4. [[3]] (Me encuentro) con amigos en la cafetería.',
        blanks: [
          { answer: 'Me levanto', accepted: ['Me levanto', 'me levanto'], explain: 'Reflexivo puro: me levanto.' },
          { answer: 'Me ducho', accepted: ['Me ducho', 'me ducho'], explain: 'Reflexivo: me ducho.' },
          { answer: 'Me visto', accepted: ['Me visto', 'me visto'], explain: 'Reflexivo: me visto.' },
          { answer: 'Me encuentro', accepted: ['Me encuentro', 'me encuentro'], explain: 'Recíproco: me encuentro.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de situaciones',
        tag: 'Producción',
        intro: 'Escribe una escena con múltiples reflexivos.',
        type: 'write',
        items: [
          {
            scene: 'Encuentro recíproco',
            prompt: 'Describe un encuentro: dos personas que se ven, se saludan, se abrazan. Usa verbos reflexivos.',
            answer: 'Nos vimos na rua, nos abraçamos e nos beijamos. Depois, nos sentamos para conversar.',
            accepted: ['reflexivo', 'recíproco', 'nos', 'se'],
            explain: 'Construcción recíproca con pronombre reflexivo "nos".',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de reflexivo vs pasiva',
        tag: 'Análise',
        intro: 'Distingue reflexivo puro de pasiva refleja.',
        type: 'write',
        items: [
          {
            scene: 'Interpretación semántica',
            prompt: '¿Cuál es la diferencia entre "As janelas se abriram" (Las ventanas se abrieron) y pasiva refleja "Aqui se vende livros"?',
            answer: '"As janelas se abriram" = reflexivo puro (las ventanas realizan la acción). "Aqui se vende livros" = pasiva refleja/impersonal (equivale a "se venden libros aquí"). Ambas usan "se" pero diferente función.',
            accepted: ['reflexivo', 'pasiva', 'impersonal', 'se'],
            explain: 'Reflexivo vs pasiva refleja: sujeto actúa vs voz pasiva.',
          },
        ],
      },
    ],
  },
}

export default topic
