import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'nakerebanaranai-b1', order: '11', color: '#dc2626', category: 'Obligación y Necesidad', level: 'B1',
  title: '〜なければならない — Debo, tengo que en Japonés B1',
  shortTitle: '〜なければならない (must, have to)',
  metaTitle: '〜なければならない en Japonés B1',
  description: '〜なければならない expresa obligación fuerte: "must", "have to". 毎日勉強しなければならない (tengo que estudiar cada día).',
  lead: 'Domina 〜なければならない: obligación fuerte',
  outcomes: ['Forma 〜なければならない', 'Expresa obligación', 'Usa formas negativas correctas', 'Distingue de 〜べき'],
  guide: {
    goal: 'Expresar que algo es obligatorio o necesario.',
    model: '毎日勉強しなければなりません。(Mainichi benkyou shinakereba narimasen.) — Tengo que estudiar cada día.',
    formula: 'Verbo negativo + なければならない',
    decisions: ['〜なければならない: obligación (formal)', '〜なきゃない: coloquial'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['〜なければならない', 'Obligación', '勉強しなければ (debo estudiar)']],
    mistakes: ['「勉強しなければなりません」 ✓ (formal). 「勉強しなきゃ」 ✓ (casual).'],
  },
  seo: [{heading: '〜なければならない', paragraphs: ['勉強しなければならない (tengo que estudiar). Expresa obligación fuerte.', 'Muy formal y polite.']}, {heading: '〜なきゃない (casual)', paragraphs: ['勉強しなきゃ (tengo que estudiar — casual). Forma coloquial de なければならない.', 'Mucho más común en conversación informal.']}],
  visual: {mode: 'scene', teacherLens: '〜なければならない: obligación', graphicPrompt: 'Tabla: 〜なければならない vs 〜なきゃ', scene: [['勉強しなければならない。', 'Tengo que estudiar (formal).'], ['行かなきゃ。', 'Tengo que ir (casual).']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['義務', '強制', '必須']},
  practice: {levels: [{id: 'level-1', title: '〜なければならない', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Obligación', lines: [['', '勉強し___。']], options: ['なければならない', 'なきゃ', 'べき', 'ほう'], answer: 'なければならない', explain: 'なければならない (obligación).'}]}, {id: 'level-2', title: 'Contexto', tag: '義務', intro: 'Completa.', type: 'guidedText', scene: 'Obligaciones.', text: '行かなければ___。'
, blanks: [{options: ['ならない', 'いけない'], answer: 'ならない', explain: 'なければならない.'}]}, {id: 'level-3', title: '作文', tag: 'なければならない', intro: 'Escribe.', type: 'freeText', scene: 'Obligaciones.', text: '1. [[0]] (Tengo que trabajar).', blanks: [{answer: '仕事しなければならない', accepted: ['なければならない', '仕事'], explain: '〜なければならない (obligación).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜なければならない?', answer: 'Expresa obligación o necesidad fuerte. "Tengo que...", "debo...". Formal y polite. En casual es 〜なきゃ.', accepted: ['義務', '強制'], explain: '〜なければならない: obligación fuerte.'}]}]},
}
export default topic
