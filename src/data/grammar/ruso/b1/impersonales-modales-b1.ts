import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'impersonales-modales-b1',
  order: '15',
  color: '#1a2ecc',
  category: 'Modo e Impersonal',
  level: 'B1',
  title: 'Construcciones Impersonales Modales en Ruso B1',
  shortTitle: 'Можно, нельзя, нужно, надо, жаль',
  metaTitle: 'Impersonales Modales en Ruso B1',
  description: 'Construcciones impersonales (безличные конструкции) con predicados modales: можно (se puede), нельзя (no se puede), нужно (es necesario), надо (hay que), жаль (es lástima). Estructura: мне/ему/ей + нужно + infinitivo.',
  lead: 'Domina impersonales: можно, нельзя, нужно — construcciones sin sujeto nominativo',
  outcomes: [
    'Forma construcciones impersonales modales',
    'Usa dativo con impersonales: мне нужно',
    'Expresa posibilidad, necesidad, lástima',
    'Distingue impersonal de oraciones normales',
  ],
  guide: {
    goal: 'Usar construcciones impersonales para expresar posibilidad, necesidad, obligación.',
    model: 'Можно войти? Мне нужна помощь. Ему нельзя есть мясо. Мне жаль, что...',
    formula: 'Dativo + Predicado impersonal + Infinitivo',
    decisions: [
      'можно + Inf: "Можно пойти?" (¿Se puede ir? — permiso/posibilidad)',
      'нельзя + Inf: "Нельзя курить" (no se puede fumar — prohibición)',
      'нужно/надо + Inf: "Мне нужно работать" (me es necesario trabajar)',
      'жаль + что + оруд: "Мне жаль, что ты ушла" (me da lástima que te hayas ido)',
    ],
    table: [
      ['Predicado', 'Ejemplo', 'Significado'],
      ['можно', 'можно войти', 'Se puede entrar (posible/permitido)'],
      ['нельзя', 'нельзя курить', 'No se puede fumar (prohibido)'],
      ['нужно/надо', 'мне нужно работать', 'Me es necesario trabajar (obligación)'],
      ['жаль', 'мне жаль', 'Me da lástima'],
    ],
    mistakes: [
      '"Можно пойти?" ✓ (не "я может идти") — конструкция безличная, нет nominativo сущ.',
      '"Мне нельзя есть" ✓ (дато + нельзя) — сам без nominativo.'],
  },
  seo: [
    {heading: '¿Qué son construcciones impersonales?', paragraphs: ['Construcciones impersonales (безличные конструкции) no tienen sujeto nominativo. En lugar de "Я могу идти", en ruso es más natural "Можно (идти)?".', 'Muy comunes, especialmente con modales: можно, нельзя, нужно, надо.']},
    {heading: 'Можно: posibilidad y permiso', paragraphs: ['"Можно пойти?" (¿Puedo ir? — permiso). "Здесь можно курить" (aquí se puede fumar — posibilidad).' , 'Sin sujeto; el dativo opcional expresa a quién le afecta.']},
    {heading: 'Нельзя: prohibición', paragraphs: ['"Здесь нельзя курить" (aquí no se puede fumar — prohibición). "Ему нельзя есть мясо" (no puede comer carne — prohibición personal).', 'Opuesto a можно.']},
    {heading: 'Нужно/надо: necesidad y obligación', paragraphs: ['"Мне нужно работать" (me es necesario trabajar). "Нам надо идти" (nos hace falta ir). Casi intercambiables; надо es más coloquial.', 'Requieren dativo + infinitivo.']},
    {heading: 'Жаль: lástima', paragraphs: ['"Мне жаль" (me da lástima/me da pena). "Мне жаль, что ты уехал" (me da lástima que te hayas ido).', 'Expresión de sentimiento impersonal.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Impersonales modales: sin sujeto nominativo', graphicPrompt: 'Tabla: Modales impersonales y sus significados', scene: [['Можно пойти?', '¿Puedo ir? (permiso)'], ['Здесь нельзя курить.', 'No se puede fumar (prohibición).'], ['Мне нужно работать.', 'Me es necesario trabajar (necesidad).'], ['Нам надо идти.', 'Tenemos que ir (obligación).'], ['Мне жаль, что ты ушла.', 'Me da pena que te hayas ido (lástima).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['безличный', 'модальность', 'дательный']},
  practice: {levels: [{id: 'level-1', title: 'Impersonal modal', tag: 'Múltipla escolha', intro: 'Elige predicado correcto.', type: 'choice', items: [{scene: 'Можно (permiso)', lines: [['', '___ пойти?']], options: ['Можно', 'Мне можно', 'Я можно', 'Можна'], answer: 'Можно', explain: 'Можно (impersonal) — can go?'}, {scene: 'Нужно (necesidad)', lines: [['', 'Мне ___ работать.']], options: ['нужно', 'нужна', 'нужны', 'нужно'], answer: 'нужно', explain: 'нужно (impersonal neut) + infinitivo.'}]}, {id: 'level-2', title: 'Modales en contexto', tag: 'Modales', intro: 'Completa modales.', type: 'guidedText', scene: 'Oraciones impersonales.', text: '___ пойти? Мне ___ помощь. Здесь ___ курить.', blanks: [{options: ['Можно', 'Я могу'], answer: 'Можно', explain: 'Можно (impersonal).'}, {options: ['нужна', 'нужно'], answer: 'нужна', explain: 'нужна (fem) — помощь (fem) needs.'}, {options: ['нельзя', 'можно'], answer: 'нельзя', explain: 'нельзя (prohibición).'}]}, {id: 'level-3', title: 'Escritura impersonal', tag: 'Modales', intro: 'Escribe impersonales.', type: 'freeText', scene: 'Expresiones modales.', text: '1. [[0]] (Puedo entrar). 2. [[1]] (Me es necesario trabajar). 3. [[2]] (No se puede fumar).', blanks: [{answer: 'Можно войти?', accepted: ['можно', 'войти'], explain: 'Можно (impersonal) + infinitivo.'}, {answer: 'Мне нужно работать', accepted: ['нужно', 'работать'], explain: 'Мне (dat) + нужно + infinitivo.'}, {answer: 'Здесь нельзя курить', accepted: ['нельзя', 'курить'], explain: 'нельзя (prohibición) + infinitivo.'}]}, {id: 'level-4', title: 'Análise de impersonales', tag: 'Análise', intro: 'Explica estructura.', type: 'write', items: [{scene: 'Razón del dativo', prompt: '¿Por qué en "Мне нужно" el dativo aparece en lugar de nominativo?', answer: 'Porque es construcción impersonal: no hay sujeto nominativo explícito. El dativo marca a quién le afecta la necesidad. "Мне нужно" = "a mí es necesario" (la necesidad es el predicado, no una acción de un sujeto). Estructura: dativo (afectado) + predicado impersonal (necesidad/posibilidad).', accepted: ['безличный', 'дательный', 'конструкция'], explain: 'Impersonales: dativo marca el afectado, sin nominativo sujeto.'}]}]},
}

export default topic
