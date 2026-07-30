import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'comparativos-superlativos-b1',
  order: '10',
  color: '#1a2ecc',
  category: 'Adjetivos y Adverbios',
  level: 'B1',
  title: 'Comparativos y Superlativos en Ruso B1',
  shortTitle: 'Сравнительная и превосходная степень',
  metaTitle: 'Comparativos y Superlativos en Ruso B1',
  description: 'Comparativos y superlativos expresan grados de cualidad. Comparativo: -ее/-е (regular: красивее, более красивый) o irregular (лучше, хуже). Superlativo: самый + adjetivo o -ейший (правильнейший).',
  lead: 'Domina comparativos: больше, лучше, красивее — y superlativos: самый, наиболее',
  outcomes: [
    'Forma comparativos regulares e irregulares',
    'Usa superlativos con самый y суффixos -ейший',
    'Expresa grados de comparación con чем',
    'Distingue comparativos simples de compuestos',
  ],
  guide: {
    goal: 'Expresar comparación y superlativos de cualidades.',
    model: 'Этот фильм интереснее. Она самая красивая. Это лучший выбор.',
    formula: 'Adj + -ее/-е (simple) o более + Adj (compuesto)',
    decisions: [
      'Comparativo simple: краснее (más rojo), больше (más grande), лучше (mejor)',
      'Comparativo compuesto: более красивый (más hermoso)',
      'Superlativo: самый красивый (el más hermoso) o красивейший (-ейший suffix)',
      'Irregular: хороший→лучше, плохой→хуже, большой→больше, маленький→меньше',
    ],
    table: [
      ['Grado', 'Positivo', 'Comparativo / Superlativo'],
      ['Regular', 'красивый', 'красивее / более красивый → самый красивый / красивейший'],
      ['Irregular', 'хороший', 'лучше → лучший / самый хороший'],
    ],
    mistakes: [
      '"Этот фильм интереснее, чем тот" ✓ — чем para comparación.',
      '"Это самый интересный фильм" ✓ (no "это интереснейший фильм" sin самый).'],
  },
  seo: [
    {heading: '¿Qué son comparativos?', paragraphs: ['Comparativos expresan que algo tiene más (o menos) de una cualidad que otra cosa. "больше" (más), "меньше" (menos), "лучше" (mejor), "хуже" (peor).', 'Estructura: Adj comparativo + чем + segunda cosa.']},
    {heading: '¿Cómo se forman los comparativos simples regulares?', paragraphs: ['"Этот фильм интереснее (того)" — este filme es más interesante. "Она красивее сестры" — ella es más hermosa que su hermana.', 'Formación: raíz + -ее/-е (e se usa si la raíz tiene consonante dura final).']},
    {heading: 'Comparativos irregulares', paragraphs: ['"хороший" → "лучше" (mejor). "плохой" → "хуже" (peor). "большой" → "больше" (más grande). "маленький" → "меньше" (más pequeño).', 'Son pares irregulares frecuentes.']},
    {heading: '¿Cómo se forma el superlativo con самый + adjetivo?', paragraphs: ['"самый красивый" (el más hermoso). "самое интересное" (lo más interesante, neutro). "самые большие" (los más grandes, plural).', 'самый concuerda en género/número con el adjetivo.']},
    {heading: 'Superlativos con -ейший', paragraphs: ['"красивейший" (hermosísimo/el más hermoso). "интереснейший" (interesantísimo). Suffix -ейший/-айший crea superlativo directo sin самый.', 'Menos común que самый + Adj, pero muy expresivo.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Comparativos y superlativos: grados de cualidad', graphicPrompt: 'Tabla: Positivo → Comparativo → Superlativo', scene: [['Этот фильм интереснее.', 'Este filme es más interesante.'], ['Она самая красивая.', 'Ella es la más hermosa.'], ['Это лучший выбор.', 'Esta es la mejor opción.'], ['Это самое дорогое платье.', 'Este es el vestido más caro.'], ['Он работает лучше других.', 'Trabaja mejor que otros.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['сравнение', 'превосходная', 'степень']},
  practice: {levels: [{id: 'level-1', title: 'Comparativos', tag: 'Múltipla escolha', intro: 'Elige comparativo correcto.', type: 'choice', items: [{scene: 'Comparativo regular', lines: [['', 'Этот фильм ___, чем тот.']], options: ['интересно', 'интереснее', 'интересный', 'интересные'], answer: 'интереснее', explain: 'интереснее (comparativo) — más interesante.'}, {scene: 'Comparativo irregular', lines: [['', 'Она работает ___, чем раньше.']], options: ['хорошо', 'лучше', 'лучший', 'хороший'], answer: 'лучше', explain: 'лучше (comparativo irregular) — better.'}]}, {id: 'level-2', title: 'Superlativos', tag: 'Superlativo', intro: 'Completa superlativos.', type: 'guidedText', scene: 'Oraciones con superlativo.', text: 'Это [[0]] красивый фильм. Она [[1]] умная ученица. Он [[2]] быстро бегает.', blanks: [{options: ['самый', 'самое'], answer: 'самый', explain: 'самый (masc) — the most.'}, {options: ['самая', 'самое'], answer: 'самая', explain: 'самая (fem) — the most.'}, {options: ['самый', 'наиболее'], answer: 'наиболее', explain: 'наиболее (adv) — most быстро.'}]}, {id: 'level-3', title: 'Escritura con comparativos', tag: 'Comparación', intro: 'Escribe comparaciones.', type: 'freeText', scene: 'Mis opiniones sobre cosas.', text: '1. [[0]] (Este libro es más interesante). 2. [[1]] (Ella es la más inteligente). 3. [[2]] (Este es el mejor día).', blanks: [{answer: 'Эта книга интереснее', accepted: ['интереснее', 'книга'], explain: 'интереснее (comparativo).'}, {answer: 'Она самая умная', accepted: ['самая', 'умная'], explain: 'самая умная (superlativo fem).'}, {answer: 'Это лучший день', accepted: ['лучший', 'день'], explain: 'лучший (superlativo irregular).'}]}, {id: 'level-4', title: 'Análise de grados', tag: 'Análise', intro: 'Explica formación de grados.', type: 'write', items: [{scene: 'Grados de cualidad', prompt: 'Explica la diferencia entre "интереснее", "более интересный", y "самый интересный"', answer: '"интереснее" es comparativo simple (más). "более интересный" es comparativo compuesto (más formal). "самый интересный" es superlativo (el más). Todos expresan grados de intensidad pero en contextos distintos.', accepted: ['сравнение', 'превосходство', 'степень'], explain: 'Tres formas de expresar grados de cualidad.'}]}]},
}

export default topic
