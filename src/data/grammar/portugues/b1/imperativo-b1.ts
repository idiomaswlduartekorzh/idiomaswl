import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'imperativo-b1',
  order: '13',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Imperativo en Portugués B1',
  shortTitle: 'Imperativo',
  metaTitle: 'Imperativo Portugués B1 — Afirmativo y Negativo, Formas de Cortesía',
  description:
    'El imperativo en portugués se usa para dar órdenes, hacer peticiones o dar instrucciones. Tiene formas afirmativas y negativas, y cambia según la persona (tú, usted, nosotros, ustedes). Es diferente al español y requiere cuidado especial con la colocación de pronombres.',
  lead: 'Domina el imperativo portugués: formas afirmativas y negativas, con y sin pronombres, cortesía.',
  outcomes: [
    'Forma imperativos regulares e irregulares',
    'Usa imperativo afirmativo y negativo correctamente',
    'Coloca pronombres oblicuos con imperativo',
    'Distingue imperativos formales e informales',
  ],

  guide: {
    goal: 'Dar órdenes, instrucciones y peticiones usando el imperativo con entonación y colocación correctas.',
    model: 'Fala! / Não fales. / Fale! (formal) / Vem aqui! / Não venhas. / Vinde! (vosotros)',
    formula: 'Imperativo afirmativo = raíz con terminaciones especiales | Imperativo negativo = não + subjuntivo',
    decisions: [
      'Tú afirmativo: termina en -a/-e (fala, come, parte) — igual que 3ª del singular indicativo',
      'Tú negativo: não + subjuntivo (não fales, não comas, não partas)',
      'Usted formal: subjuntivo (fale, coma, parta)',
      'Nosotros: subjuntivo (falemos, comamos, partamos) — = subjuntivo nós',
      'Vosotros: infinitivo sin -r (falai, comei, parti) — típico de Portugal',
      'Con pronombre enclítico afirmativo: verbo-pronombre (fala-me, ajuda-nos)',
      'Con pronombre proclítico negativo: não pronombre-verbo (não me fales, não te ajudes)',
    ],
    table: [
      ['Persona', 'Afirmativo', 'Negativo'],
      ['tú', 'fala', 'não fales'],
      ['usted', 'fale', 'não fale'],
      ['nosotros', 'falemos', 'não falemos'],
      ['vosotros', 'falai', 'não faleis'],
      ['ustedes', 'falem', 'não falem'],
    ],
    mistakes: [
      '"Fales!" ❌ (afirmativo con subjuntivo, forma negativa) → "Fala!" ✓ (afirmativo correcto).',
      '"Não fala!" ❌ (con indicativo) → "Não fales!" ✓ (con subjuntivo negativo).',
      '"Ajuda-me" ✓ (enclítico afirmativo) vs "Não me ajudes" ✓ (proclítico negativo).',
    ],
  },

  seo: [
    {
      heading: '¿Cómo se forma el imperativo en portugués?',
      paragraphs: [
        'El imperativo en portugués tiene dos formas principales: afirmativa (para dar órdenes positivas) y negativa (para prohibir o desaconsejar). La formación varía según la persona (tú, usted, nosotros, vosotros, ustedes).',
        'Una peculiaridad del portugués es que el imperativo afirmativo toma formas especiales, mientras que el negativo simplemente usa "não" + subjuntivo. Esto es diferente al español.',
      ],
    },
    {
      heading: 'Imperativo afirmativo',
      paragraphs: [
        'Para la 2ª persona singular (tú), el imperativo afirmativo toma la forma de la 3ª persona singular del indicativo presente: fala (de falar), come (de comer), parte (de partir).',
        'Para usted y nosotros, se usa el subjuntivo: fale, falemos, comam, etc. Para vosotros (Portugal), se elimina la -r del infinitivo: falai, comei, partí.',
      ],
    },
    {
      heading: '¿Cómo se forma el imperativo negativo en portugués?',
      paragraphs: [
        'El imperativo negativo se forma con "não" + subjuntivo para todas las personas: não fales, não fale, não falemos, não faleis, não falem.',
        'Esta estructura es más regular que el afirmativo y es más fácil de formar, ya que solo necesitas saber el subjuntivo.',
      ],
    },
    {
      heading: 'Colocación de pronombres con imperativo',
      paragraphs: [
        'Con imperativo afirmativo, los pronombres van enclíticos (después del verbo): fala-me (háblame), ajuda-nos (ayúdanos), dá-lhes (dales).',
        'Con imperativo negativo, los pronombres van proclíticos (antes del verbo): não me fales, não nos ajudes, não lhes dês.',
      ],
    },
    {
      heading: '¿Cuáles son los imperativos irregulares en portugués?',
      paragraphs: [
        'Algunos verbos tienen imperativos irregulares: ser→sê/sejas, estar→está/estejas, ir→vai/vás, ter→tem/tenhas, fazer→faz/faças, dizer→diz/digas, trazer→traz/tragas.',
        'Estos irregulares deben ser memorizados, pero son los verbos más frecuentes.',
      ],
    },
    {
      heading: 'Formas de cortesía: imperativo formal vs informal',
      paragraphs: [
        'En portugués brasileño, el imperativo informal (tú) es menos usado que en español. Se prefiere usar "você" + indicativo: "Você fala português?" (¿Hablas portugués?) en lugar de "Fales português?',
        'En portugués europeo, el imperativo informal (tú) es más frecuente. La cortesía se expresa con entonación: "Fala, por favor!" (Habla, por favor) es más cortés que "Fala!" (¡Habla!).',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Imperativo: afirmativo vs negativo, con/sin pronombres, formas irregulares.',
    graphicPrompt: 'Tabla: afirmativo enclítico vs negativo proclítico; irregulares clave.',
    scene: [
      ['Fala comigo! / Não me fales.', '¡Habla conmigo! / No me hables.'],
      ['Ajuda-nos! / Não nos ajudes.', '¡Ayúdanos! / No nos ayudes.'],
      ['Vai ao mercado! / Não vás.', '¡Ve al mercado! / No vayas.'],
      ['Façam o dever! / Não façam.', '¡Hagan la tarea! / No hagan.'],
      ['Vem aqui agora! / Não venhas tarde.', '¡Ven aquí ahora! / No vengas tarde.'],
      ['Diz a verdade! / Não digas mentiras.', '¡Dí la verdad! / No digas mentiras.'],
      ['Sê corajoso! / Não sejas medo.', '¡Sé valiente! / No tengas miedo.'],
      ['Tem paciência! / Não tenhas pressa.', '¡Ten paciencia! / No tengas prisa.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['afirmativo vs negativo', 'pronombres', 'irregulares'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Escolha a forma correta',
        tag: 'Múltipla escolha',
        intro: 'Selecciona la forma correcta del imperativo.',
        type: 'choice',
        items: [
          {
            scene: 'Imperativo tú afirmativo',
            lines: [['', "___! (falar)"]],
            options: ['Fales', 'Fala', 'Falo', 'Falei'],
            answer: 'Fala',
            explain: 'Tú afirmativo = 3ª persona indicativo: Fala!',
          },
          {
            scene: 'Imperativo tú negativo',
            lines: [['', "Não ___! (falar)"]],
            options: ['fales', 'falas', 'fala', 'falei'],
            answer: 'fales',
            explain: 'Tú negativo = subjuntivo: Não fales!',
          },
          {
            scene: 'Imperativo usted',
            lines: [['', "___ aqui! (estar)"]],
            options: ['Estás', 'Esteja', 'Estou', 'Estive'],
            answer: 'Esteja',
            explain: 'Usted = subjuntivo: Esteja aqui!',
          },
          {
            scene: 'Imperativo nosotros',
            lines: [['', "___ juntos! (comer)"]],
            options: ['Comamos', 'Comemos', 'Comei', 'Comam'],
            answer: 'Comamos',
            explain: 'Nosotros = subjuntivo: Comamos juntos!',
          },
          {
            scene: 'Imperativo irregular',
            lines: [['', "___! (ir)"]],
            options: ['Vás', 'Vai', 'Vou', 'Vá'],
            answer: 'Vai',
            explain: 'Ir irregular tú: Vai!',
          },
          {
            scene: 'Imperativo con pronombre',
            lines: [['', "___! (hablar-me)"]],
            options: ['Fala-me', 'Me fala', 'Fales-me', 'Não me fales'],
            answer: 'Fala-me',
            explain: 'Afirmativo con pronombre enclítico: Fala-me!',
          },
          {
            scene: 'Negativo con pronombre',
            lines: [['', "___! (no hablar-me)"]],
            options: ['Não fala-me', 'Não me fales', 'Fales-me', 'Não fales-me'],
            answer: 'Não me fales',
            explain: 'Negativo con pronombre proclítico: Não me fales!',
          },
          {
            scene: 'Imperativo formal ustedes',
            lines: [['', "___! (fazer)"]],
            options: ['Fazem', 'Façam', 'Fazei', 'Fazerem'],
            answer: 'Façam',
            explain: 'Ustedes = subjuntivo: Façam!',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Imperativos en contexto',
        tag: '2 formas',
        intro: 'Completa con imperativo afirmativo y negativo.',
        type: 'dual',
        items: [
          {
            scene: 'Contraste afirmativo/negativo',
            lines: [['', "[[0]] aqui! / Não [[1]]!"]],
            blanks: [
              { options: ['Vem', 'Venhas', 'Vinha'], answer: 'Vem', explain: 'Tú afirmativo: Vem!' },
              { options: ['venhas', 'vem', 'vieres'], answer: 'venhas', explain: 'Tú negativo: Não venhas!' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Diálogos con imperativo',
        tag: 'Texto guiado',
        intro: 'Completa diálogos usando imperativos.',
        type: 'guidedText',
        scene: 'Instrucciones e interacciones cotidianas.',
        text: "Mãe: [[0]] (fazer) seu trabalho! Não [[1]] (brinca). Filho: Tá bem! Mãe: [[2]] (vem) aqui para tomar café. Pai: [[3]] (estuda) português! É muito importante.",
        blanks: [
          { options: ['Faz', 'Faças', 'Faze'], answer: 'Faz', explain: 'Tú afirmativo: Faz!' },
          { options: ['brinques', 'brinca', 'brinques'], answer: 'brinques', explain: 'Tú negativo: Não brinques!' },
          { options: ['Vem', 'Venhas', 'Vinda'], answer: 'Vem', explain: 'Tú afirmativo: Vem!' },
          { options: ['Estuda', 'Estudes', 'Estude'], answer: 'Estuda', explain: 'Tú afirmativo: Estuda!' },
        ],
      },
      {
        id: 'level-4',
        title: 'Producción de órdenes',
        tag: 'Texto libre',
        intro: 'Escribe órdenes usando imperativo.',
        type: 'freeText',
        scene: 'Situaciones donde das instrucciones.',
        text: "1. [[0]] (abrir) a porta! 2. Não [[1]] (fazer) barulho! 3. [[2]] (beber) água! 4. Não [[3]] (ir) embora!",
        blanks: [
          { answer: 'Abre', accepted: ['Abre'], explain: 'Tú afirmativo de abrir.' },
          { answer: 'faças', accepted: ['faças'], explain: 'Tú negativo de fazer.' },
          { answer: 'Bebe', accepted: ['Bebe'], explain: 'Tú afirmativo de beber.' },
          { answer: 'vás', accepted: ['vás'], explain: 'Tú negativo de ir.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción contextualizada',
        tag: 'Producción',
        intro: 'Crea órdenes en contextos específicos.',
        type: 'write',
        items: [
          {
            scene: 'Orden positiva',
            prompt: "Escribe una orden positiva: '¡Ayúdame!' usando imperativo + pronombre.",
            answer: "Ajuda-me!",
            accepted: ['Ajuda', 'enclítico', '-me', 'afirmativo'],
            explain: 'Imperativo afirmativo con pronombre enclítico.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Análise de órdenes',
        tag: 'Análise',
        intro: 'Analiza la estructura del imperativo.',
        type: 'write',
        items: [
          {
            scene: 'Explicación',
            prompt: "¿Por qué 'Ajuda-me!' tiene el pronombre después y 'Não me ajudes!' tiene antes?",
            answer: "'Ajuda-me' = afirmativo, pronombre enclítico después. 'Não me ajudes' = negativo, pronombre proclítico antes.",
            accepted: ['enclítico', 'proclítico', 'afirmativo', 'negativo'],
            explain: 'Colocación del pronombre depende si es afirmativo o negativo.',
          },
        ],
      },
    ],
  },
}

export default topic
