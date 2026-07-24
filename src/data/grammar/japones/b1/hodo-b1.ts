import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'hodo-b1', order: '07', color: '#dc2626', category: 'Grado y Comparación', level: 'B1',
  title: '〜ほど — Medida y grado en Japonés B1',
  shortTitle: '〜ほど (extent, to the degree that)',
  metaTitle: '〜ほど en Japonés B1',
  description: '〜ほど expresa grado o medida: "tan X como", "cuanto más... más...". 寒いほど (tan frío como), 働くほど稼げる (cuanto más trabajas, más ganas).',
  lead: 'Domina 〜ほど: expresión de grado y proporción',
  outcomes: ['Forma 〜ほど con adjetivos y verbos', 'Expresa "cuanto más... más..."', 'Usa en comparaciones de grado', 'Distingue 〜ほど de 〜ぐらい'],
  guide: {
    goal: 'Expresar grado, medida, o relación proporcional.',
    model: '大きいほどいい。(Ookii hodo ii.) — Cuanto más grande, mejor. 働くほど稼げます。(Hataraку hodo kagemasu.) — Cuanto más trabajas, más ganas.',
    formula: 'Adjetivo/Verbo + ほど',
    decisions: ['形容詞 + ほど: "big as", "tall as"', 'A-ほど B：proporcional "cuanto más A, más B"'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['adj + ほど', 'Medida/grado', '大きいほど (cuanto más grande)'], ['A + ほど B', 'Proporcional', '働くほど稼ぐ (cuanto más trabaja)']],
    mistakes: ['「大きいほど」 ✓ es "cuanto más grande". No confundas con 「大きいくらい」 que es "aproximadamente del tamaño de".'],
  },
  seo: [{heading: '〜ほど para grado', paragraphs: ['大きいほど、高いほど — cuanto más grande/alto. Expresa medida o magnitud.', 'Muy natural en comparaciones proporcionales.']}],
  visual: {mode: 'scene', teacherLens: '〜ほど: proporción y grado', graphicPrompt: 'Tabla: 〜ほど', scene: [['大きいほどいい。', 'Cuanto más grande, mejor.'], ['働くほど稼げます。', 'Cuanto más trabajas, más ganas.'], ['古いほど価値がある。', 'Cuanto más viejo, más valor.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['程度', '比例', '尺度']},
  practice: {levels: [{id: 'level-1', title: '〜ほど', tag: 'Múltipla escolha', intro: 'Selecciona forma.', type: 'choice', items: [{scene: 'Grado', lines: [['', '大き___ほどいい。']], options: ['い', 'ける', 'する', 'た'], answer: 'い', explain: '大きいほど (cuanto más grande).'}]}, {id: 'level-2', title: '比例', tag: 'Proporción', intro: 'Completa proporción.', type: 'guidedText', scene: 'Proporciones.', text: '働く[[0]] 稼げます。'
, blanks: [{options: ['ほど', 'だけ'], answer: 'ほど', explain: '〜ほど (proporcional).'}]}, {id: 'level-3', title: '作文', tag: 'Grado', intro: 'Escribe.', type: 'freeText', scene: 'Proporciones.', text: '1. [[0]] (Cuanto más grande, mejor).', blanks: [{answer: '大きいほどいい', accepted: ['ほど', '大き'], explain: '〜ほど (grado).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜ほど?', answer: 'Expresa grado, medida, o relación proporcional: "cuanto más X, más Y". Muy usado en comparaciones.', accepted: ['程度', '比例'], explain: '〜ほど: grado y proporción.'}]}]},
}
export default topic
