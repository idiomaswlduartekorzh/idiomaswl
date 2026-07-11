import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'ni-chigainai-b1', order: '13', color: '#dc2626', category: 'Lógica y Deducción', level: 'B1',
  title: '〜に違いない — Debe ser, seguramente en Japonés B1',
  shortTitle: '〜に違いない (must be, surely)',
  metaTitle: '〜に違いない en Japonés B1',
  description: '〜に違いない expresa deducción lógica: "must be", "surely". 彼は来るに違いない (seguramente vendría).',
  lead: 'Domina 〜に違いない: deducción lógica segura',
  outcomes: ['Forma 〜に違いない', 'Expresa deducción cierta', 'Usa en razonamiento lógico', 'Distingue de 〜はずだ'],
  guide: {
    goal: 'Expresar que algo debe ser cierto lógicamente.',
    model: '彼は来るに違いありません。(Kare wa kuru ni chigai arimasen.) — Seguramente vendrá.',
    formula: 'Verbo/Adjetivo + に違いない',
    decisions: ['〜に違いない: deducción cierta'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['〜に違いない', 'Deducción cierta', '来るに違いない (seguramente viene)']],
    mistakes: ['「来るに違いません」 ✓ (deducción formal).'],
  },
  seo: [{heading: '〜に違いない', paragraphs: ['彼は来るに違いない (seguramente vendrá — deducción lógica fuerte).', 'Expresa convicción basada en lógica.']}],
  visual: {mode: 'scene', teacherLens: '〜に違いない: deducción segura', graphicPrompt: 'Tabla: 〜に違いない vs 〜はずだ', scene: [['来るに違いない。', 'Seguramente vendrá.'], ['間違いに違いない。', 'Debe ser un error.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['確実', '推測', '論理']},
  practice: {levels: [{id: 'level-1', title: '〜に違いない', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Deducción', lines: [['', '来る___。']], options: ['に違いない', 'に違いありません', 'はずだ', 'ほう'], answer: 'に違いない', explain: 'に違いない (deducción).'}]}, {id: 'level-2', title: 'Contexto', tag: '確実', intro: 'Completa.', type: 'guidedText', scene: 'Deducciones.', text: '彼は知っている___。'
, blanks: [{options: ['に違いない', 'に違いありません'], answer: 'に違いない', explain: '〜に違いない.'}]}, {id: 'level-3', title: '作文', tag: 'に違いない', intro: 'Escribe.', type: 'freeText', scene: 'Deducciones.', text: '1. [[0]] (Debe ser error).', blanks: [{answer: '間違いに違いない', accepted: ['に違いない', '間違い'], explain: '〜に違いない (deducción).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜に違いない?', answer: 'Expresa deducción lógica segura. "Debe ser...", "seguramente...". Más fuerte que はずだ en convicción.', accepted: ['確実', '推測'], explain: '〜に違いない: deducción lógica fuerte.'}]}]},
}
export default topic
