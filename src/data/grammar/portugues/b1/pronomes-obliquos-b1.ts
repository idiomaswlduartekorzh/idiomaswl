import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomes-obliquos-b1',
  order: '11',
  color: '#166534',
  category: 'Pronomes',
  level: 'B1',
  title: 'Pronomes Oblíquos en Portugués B1',
  shortTitle: 'Pronomes Oblíquos',
  metaTitle: 'Pronomes Oblíquos Portugués B1 — Me, Te, Se, Nos, Vos, Lhes',
  description:
    'Los pronombres oblicuos (me, te, se, nos, vos, lhes) en portugués funcionan como objetos directo e indirecto. Su colocación correcta es fundamental para el nivel B1 y varia según el contexto: enclítica (después del verbo), próclítica (antes del verbo) o mesoclítica (dentro del verbo en futuro/condicional).',
  lead: 'Domina pronombres oblicuos: me/te/se/nos/lhes como objetos directo e indirecto, y su colocación en la oración.',
  outcomes: [
    'Identifica pronombres oblicuos como objetos directo e indirecto',
    'Aplica correctamente la colocación proclítica, enclítica y mesoclítica',
    'Usa pronombres oblicuos en contextos de conversación natural',
    'Diferencia pronombres en portugués europeo vs brasileño',
  ],

  guide: {
    goal: 'Usar pronombres oblicuos en sus tres posiciones correctas para expresar acciones que afectan a otros.',
    model: 'Me ajuda. / Ajuda-me. / Vou-te ajudar. / Ele me vê. / Não me vê.',
    formula: 'Pronombre oblicuo + verbo (próclítica) | Verbo + pronombre (enclítica) | Verbo + pronombre + verbo (mesoclítica)',
    decisions: [
      'Próclítica (pronombre ANTES del verbo): después de negación, con adverbios, en oraciones subordinadas → Não me vê. / Sempre te ajudo.',
      'Enclítica (pronombre DESPUÉS del verbo): en inicio de frase o después de pausa → Ajuda-me. / Vejo-te bem.',
      'Mesoclítica (pronombre DENTRO del verbo): en futuro y condicional → Vou-te ajudar. / Ajudar-te-ia.',
      'Objeto directo (acción recae sobre la persona): me/te/o/a/nos/vos/os/as → Ele me vê. (me ve a mí)',
      'Objeto indirecto (acción beneficia a la persona): me/te/lhe/nos/vos/lhes → Ele me dá um livro. (me da un libro a mí)',
      'Diferencia entre se (reflexivo: me veo) y te (objeto: me ves): se = acción sobre sí mismo; te/me = acción sobre otro.',
    ],
    table: [
      ['Pronombre', 'Objeto directo', 'Objeto indirecto'],
      ['me/te', 'Ele me vê', 'Ele me dá'],
      ['se', 'Ele se vê (reflexivo)', 'Ele se dá (reflexivo)'],
      ['nos/vos', 'Ele nos vê', 'Ele nos dá'],
      ['o/a (direto)', 'Ele a vê', 'Ela recebe'],
      ['lhe/lhes', 'Eu lhe dou', 'Eu lhes falo'],
    ],
    mistakes: [
      '"Ele me chama" ✓ (próclítica: después de sujeto explícito es optativa) vs "Chama-me" ✓ (enclítica: en portugués europeo más común).',
      '"Não me vê" ✓ (próclítica obligatoria con negación) vs "Vê-me" ✓ (enclítica sin negación).',
      '"Vou-te ajudar" ✓ (mesoclítica en futuro) vs "Vou ajudá-lo" (enclítica después de infinitivo).',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los pronombres oblicuos en portugués?',
      paragraphs: [
        'Los pronombres oblicuos (pronomes oblíquos átonos) en portugués son: me, te, se, nos, vos, lhe, lhes. Funcionan como objetos directo e indirecto del verbo. La palabra "oblicuo" significa que no son el sujeto de la oración.',
        'Estos pronombres tienen una característica muy importante en portugués: pueden colocarse ANTES del verbo (próclisis), DESPUÉS del verbo (enclisis) o DENTRO del verbo (mesoclisis). La colocación depende del contexto y es muy diferente al español.',
      ],
    },
    {
      heading: 'Próclisis: el pronombre ANTES del verbo',
      paragraphs: [
        'La próclisis (pronombre antes del verbo) ocurre en estos contextos: 1) Después de negación: "Não me vê", "Nunca te ajudo". 2) Con adverbios: "Sempre me ajuda", "Já me viu". 3) En oraciones subordinadas: "Se me chamares, venho", "Quando me vir, cumprimenta-me".',
        'En portugués brasileño, la próclisis es mucho más común que en portugués europeo, especialmente en inicio de frase: brasileño "Eu te amo" vs europeo "Amo-te".',
      ],
    },
    {
      heading: 'Enclisis: el pronombre DESPUÉS del verbo',
      paragraphs: [
        'La enclisis (pronombre después del verbo) ocurre: 1) En inicio de frase o después de pausa: "Ajuda-me!", "Vejo-te bem". 2) Con infinitivo: "Quero ajudá-lo", "Deixa-me falar". 3) Con gerundio: "Estou vendo-te", "Começaram a calar-se".',
        'En portugués europeo es la forma preferida en muchos contextos. En portugués brasileño es menos común, excepto en verbos reflexivos o con infinitivo.',
      ],
    },
    {
      heading: 'Mesoclisis: el pronombre DENTRO del verbo (futuro/condicional)',
      paragraphs: [
        'La mesoclisis ocurre exclusivamente en futuro y condicional, donde el pronombre se coloca DENTRO del verbo (entre la raíz y la terminación): "Vou-te ajudar" (te-ayudaré), "Ajudar-te-ia" (te ayudaría).',
        'Esta estructura es típicamente portuguesa y menos frecuente en portugués brasileño, que prefiere: "Vou te ajudar" (próclisis) o "Vou ajudar você" (pronombre tónico).',
      ],
    },
    {
      heading: 'Objeto directo vs indirecto: distinción importante',
      paragraphs: [
        'Objeto directo: la acción recae directamente sobre la persona: "Ele me vê" (me ve a mí). Objeto indirecto: la acción beneficia a la persona: "Ele me dá um livro" (me da un libro a mí, a mí me da).',
        'En portugués, el mismo pronombre (me/te/nos/vos) funciona para ambos. Pero con tercera persona, se distingue: "o/a" para directo (lo/la ve), "lhe" para indirecto (le da).',
      ],
    },
    {
      heading: 'Reflexivos vs pronombres oblicuos: "se" especial',
      paragraphs: [
        'El pronombre "se" es reflexivo cuando la acción recae sobre el mismo sujeto: "Ele se vê" (él se ve a sí mismo), "Eles se abraçam" (se abrazan mutuamente). En estos casos, la acción es reflexiva o recíproca.',
        'Diferencia: "Ele me vê" (él me ve a mí, objeto de la acción) vs "Ele se vê" (él se ve a sí mismo, reflexivo). En el primer caso, yo recibo la acción. En el segundo, él la recibe sobre sí mismo.',
      ],
    },
    {
      heading: 'Diferencias entre portugués europeo y brasileño',
      paragraphs: [
        'Portugués europeo prefiere enclisis en muchos contextos: "Vejo-te", "Ajuda-me", "Quero conhecê-lo". Portugués brasileño prefiere próclisis: "Eu te vejo", "Me ajuda", "Quero conhecê-lo" (enclisis con infinitivo se mantiene).',
        'En la producción B1, ambas formas son aceptadas, pero es importante ser consistente con una variante y reconocer la otra.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Pronombres oblicuos: próclisis (antes) vs enclisis (después) vs mesoclisis (dentro).',
    graphicPrompt: 'Flecha mostrando tres posiciones: [me] verbo | verbo [me] | verbo [me] conjugação.',
    scene: [
      ['Ele me vê. / Vê-me.', 'Él me ve. / Me ve.'],
      ['Não me ajuda. / Ajuda-me.', 'No me ayuda. / Ayúdame.'],
      ['Vou-te chamar.', 'Voy a llamarte.'],
      ['Sempre me chama.', 'Siempre me llama.'],
      ['Ele se vê no espelho.', 'Él se ve en el espejo.'],
      ['Me dá um livro.', 'Me da un libro.'],
      ['Deixa-me falar.', 'Déjame hablar.'],
      ['Se me chamares, venho.', 'Si me llamas, vengo.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['próclisis/enclisis/mesoclisis', 'objeto directo/indirecto', 'reflexivos'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha a posição correta',
        tag: 'Colocação',
        intro: 'Selecciona la colocación correcta del pronombre.',
        type: 'choice',
        items: [
          {
            scene: 'Início de frase (enclítica)',
            lines: [['', "___? — Ajuda-me!"]],
            options: ['Me ajuda!', 'Ajuda-me!', 'Ajuda me!', 'Me ajuda?'],
            answer: 'Ajuda-me!',
            explain: 'En inicio de frase impeativa → enclítica (pronombre después).',
          },
          {
            scene: 'Con negación (próclítica)',
            lines: [['', "Não ___ ajuda."]],
            options: ['me', 'a mim', '-me', 'm'],
            answer: 'me',
            explain: 'Después de "não" → próclítica (pronombre antes).',
          },
          {
            scene: 'Futuro (mesoclítica)',
            lines: [['', "Vou___ ajudar."]],
            options: ['me', '-me', 'a mim', 'm'],
            answer: '-te',
            explain: 'En futuro con pronombre → mesoclítica (dentro del verbo: Vou-te ajudar).',
          },
          {
            scene: 'Con infinitivo (enclítica)',
            lines: [['', "Quero ajudá___."]],
            options: ['-te', 'te', 'a ti', 't'],
            answer: '-te',
            explain: 'Con infinitivo → enclítica (pronuncia: ajudá-te).',
          },
          {
            scene: 'Con adverbio (próclítica)',
            lines: [['', "Sempre ___ ajuda."]],
            options: ['me', '-me', 'a mim', 'm'],
            answer: 'me',
            explain: 'Con adverbio → próclítica (pronombre antes).',
          },
          {
            scene: 'Oración subordinada (próclítica)',
            lines: [['', "Se ___ chamas, venho."]],
            options: ['me', '-me', 'a mim', 'm'],
            answer: 'me',
            explain: 'En oración subordinada → próclítica.',
          },
          {
            scene: 'Gerundio (enclítica)',
            lines: [['', "Estou vendo___."]],
            options: ['-te', 'te', 'a ti', 't'],
            answer: '-te',
            explain: 'Con gerundio → enclítica (vendo-te).',
          },
          {
            scene: 'Reflexivo',
            lines: [['', "Ele ___ vê no espelho."]],
            options: ['se', 'a si', 'a si mesmo', 's'],
            answer: 'se',
            explain: 'Reflexivo (verbo recae sobre sí mismo) → "se".',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Contexto pronomes',
        tag: '2 decisiones',
        intro: 'Completa con la colocación correcta del pronombre.',
        type: 'dual',
        items: [
          {
            scene: 'Contraste: próclisis y enclisis',
            lines: [['', "Ele [[0]] vê / Vê[[1]]."]],
            blanks: [
              { options: ['-me', 'me', 'a mim'], answer: 'me', explain: 'Con sujeto explícito "Ele" → próclítica.' },
              { options: ['-me', 'me', '-o'], answer: '-me', explain: 'Sin sujeto, imperativo → enclítica.' },
            ],
          },
          {
            scene: 'Negación vs positivo',
            lines: [['', "Não [[0]] ajuda. / [[1]]."]],
            blanks: [
              { options: ['-me', 'me', 'a mim'], answer: 'me', explain: 'Con "não" → próclítica.' },
              { options: ['Ajuda-me', 'Me ajuda', 'Ajuda me'], answer: 'Ajuda-me', explain: 'Sin negación, imperativo → enclítica.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Narrativa con pronombres',
        tag: 'Texto guiado',
        intro: 'Completa con pronombres oblicuos en la colocación correcta.',
        type: 'guidedText',
        scene: 'Una situación donde los pronombres son necesarios.',
        text: "Meu amigo [[0]] (me/te) chama todos os dias. Não [[1]] (me/te) quer perder de vista. Quando [[2]] (me/se) vê, sempre [[3]] (me/se) abraça. Ele disse que [[4]] (me/te) ama muito e que [[5]] (me/te) ajudará sempre.",
        blanks: [
          { options: ['-me', 'me', '-te'], answer: 'me', explain: 'Próclítica con sujeto.' },
          { options: ['-me', 'me', '-te'], answer: 'me', explain: 'Próclítica con negación.' },
          { options: ['-me', 'me', '-se'], answer: 'se', explain: 'Próclítica en subordinada, y es reflexivo.' },
          { options: ['-me', 'me', '-se'], answer: 'me', explain: 'Con adverbio "sempre" → próclítica.' },
          { options: ['-me', 'me', '-te'], answer: 'me', explain: 'Próclítica en oración subordinada.' },
          { options: ['-me', 'me', 'ajudará-te'], answer: 'me', explain: 'Próclítica (no mesoclítica en condicional futuro).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Reescrita con pronombres',
        tag: 'Texto libre',
        intro: 'Reescribe las frases usando pronombres oblicuos.',
        type: 'freeText',
        scene: 'Transformación de oraciones usando pronombres.',
        text: "1. Quiero ayudar a ti. / Quiero [[0]] ajudar. 2. Cuando vea a ti. / Quando [[1]] vir. 3. No me llamaré. / Não [[2]] chamarei.",
        blanks: [
          { answer: 'te', accepted: ['te', 'ajudá-te'], explain: 'Usar pronombre: ajudá-te o te ajudar.' },
          { answer: 'te', accepted: ['te'], explain: 'En subordinada con pronombre: quando te vir.' },
          { answer: 'me', accepted: ['me', 'chamarei'], explain: 'Con negación: não me chamarei.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción de diálogos',
        tag: 'Producción',
        intro: 'Escribe diálogos usando pronombres oblicuos.',
        type: 'write',
        items: [
          {
            scene: 'Petición',
            prompt: "Escribe: 'Ayúdame, por favor' usando enclítica.",
            answer: "Ajuda-me, por favor!",
            accepted: ['Ajuda-me', 'enclítica', 'imperativo'],
            explain: 'Imperativo en inicio → enclítica: Ajuda-me!',
          },
          {
            scene: 'Negación',
            prompt: "Escribe: 'Él no me ve' usando próclítica.",
            answer: "Ele não me vê.",
            accepted: ['não', 'me', 'próclítica'],
            explain: 'Con negación → próclítica: não me vê.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de pronombres',
        tag: 'Análise',
        intro: 'Analiza la colocación de pronombres en ejemplos.',
        type: 'write',
        items: [
          {
            scene: 'Justificación',
            prompt: "Explica por qué 'Não me ajuda' usa próclítica y 'Ajuda-me' usa enclítica.",
            answer: "'Não me ajuda': después de negación → próclítica. 'Ajuda-me': imperativo en inicio de frase → enclítica.",
            accepted: ['próclítica', 'enclítica', 'negación', 'imperativo'],
            explain: 'La negación requiere próclítica; imperativo requiere enclítica.',
          },
        ],
      },
    ],
  },
}

export default topic
