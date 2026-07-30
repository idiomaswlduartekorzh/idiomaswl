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
  seo: [
    {heading: '¿Cómo expresa 〜ほど grado o magnitud?', paragraphs: ['〜ほど indica el grado o la medida de algo: 死ぬほど疲れた (estoy cansado hasta morir), 泣きたいほど嬉しい (tan feliz que querría llorar).', 'Establece un punto de referencia para medir la intensidad, comparando con una situación extrema o concreta.']},
    {heading: '¿Cómo se forma la estructura 〜ば〜ほど (cuanto más... más...)?', paragraphs: ['Se combina la forma condicional ば con ほど sobre el mismo verbo o adjetivo: 働けば働くほど稼げる (cuanto más trabajas, más ganas), 高ければ高いほどいい (cuanto más caro, mejor), 練習すればするほど上手になる (cuanto más practicas, mejor te vuelves).', 'La trampa para el hispanohablante es que hay que repetir la palabra dos veces (una en forma ば, otra antes de ほど); no basta con decirla una vez.']},
    {heading: '¿Qué diferencia hay entre 〜ほど y 〜くらい/ぐらい?', paragraphs: ['Ambos indican grado y a veces son intercambiables, pero ほど tiende a marcar un límite superior o una comparación proporcional (Aほど...ない = no tanto como A), mientras que くらい/ぐらい señala una cantidad o grado aproximado y menor: 一時間くらい (una hora más o menos), これくらいできる (esto al menos puedo hacerlo).', 'En la negación comparativa solo funciona ほど: 東京は大阪ほど暑くない (Tokio no es tan caluroso como Osaka), nunca くらい.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ほど: proporción y grado', graphicPrompt: 'Tabla: 〜ほど', scene: [['大きいほどいい。', 'Cuanto más grande, mejor.'], ['働くほど稼げます。', 'Cuanto más trabajas, más ganas.'], ['古いほど価値がある。', 'Cuanto más viejo, más valor.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['程度', '比例', '尺度']},
  practice: {levels: [{id: 'level-1', title: '〜ほど', tag: 'Múltipla escolha', intro: 'Selecciona forma.', type: 'choice', items: [{scene: 'Grado', lines: [['', '大き___ほどいい。']], options: ['い', 'ける', 'する', 'た'], answer: 'い', explain: '大きいほど (cuanto más grande).'}]}, {id: 'level-2', title: '比例', tag: 'Proporción', intro: 'Completa proporción.', type: 'guidedText', scene: 'Proporciones.', text: '働く[[0]] 稼げます。'
, blanks: [{options: ['ほど', 'だけ'], answer: 'ほど', explain: '〜ほど (proporcional).'}]}, {id: 'level-3', title: '作文', tag: 'Grado', intro: 'Escribe.', type: 'freeText', scene: 'Proporciones.', text: '1. [[0]] (Cuanto más grande, mejor).', blanks: [{answer: '大きいほどいい', accepted: ['ほど', '大き'], explain: '〜ほど (grado).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜ほど?', answer: 'Expresa grado, medida, o relación proporcional: "cuanto más X, más Y". Muy usado en comparaciones.', accepted: ['程度', '比例'], explain: '〜ほど: grado y proporción.'}]}]},
}
export default topic
