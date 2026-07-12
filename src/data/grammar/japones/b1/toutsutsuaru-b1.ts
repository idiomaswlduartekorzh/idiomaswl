import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'toutsutsuaru-b1', order: '12', color: '#dc2626', category: 'Aspecto y Progreso', level: 'B1',
  title: '〜つつある — Está sucediendo, está cambiando en Japonés B1',
  shortTitle: '〜つつある (is becoming, in the process of)',
  metaTitle: '〜つつある en Japonés B1',
  description: '〜つつある expresa cambio gradual o proceso en desarrollo: "está cambiando", "está sucediendo gradualmente". 気温が上がりつつある (la temperatura está subiendo gradualmente).',
  lead: 'Domina 〜つつある: cambio gradual en progreso',
  outcomes: ['Forma 〜つつある', 'Expresa cambio gradual', 'Usa para procesos en desarrollo', 'Distingue de 〜ている'],
  guide: {
    goal: 'Expresar que algo está cambiando o sucediendo gradualmente.',
    model: '気温が上がりつつあります。(Kion ga agari tsutsutsu arimasu.) — La temperatura está subiendo gradualmente.',
    formula: 'Verbo conectivo + つつある',
    decisions: ['〜つつある: proceso gradual (formal/escrito)', '〜つつあります: forma polita'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['〜つつある', 'Gradual', '上がりつつある (subiendo gradualmente)']],
    mistakes: ['「気温が上がりつつあります」 ✓ (formal, escrito). Menos común en habla casual.'],
  },
  seo: [{heading: '〜つつある', paragraphs: ['気温が上がりつつある (la temperatura está subiendo gradualmente). Muy formal/escrito.', 'Expresa cambio lento y continuo.']}, {heading: '〜つつある vs 〜ている', paragraphs: ['〜ている: acción en progreso presente. 〜つつある: cambio gradual continuo (más formal).', 'つつある es más literario y menos coloquial.']}],
  visual: {mode: 'scene', teacherLens: '〜つつある: proceso gradual', graphicPrompt: 'Tabla: 〜つつある', scene: [['気温が上がりつつある。', 'La temperatura está subiendo gradualmente.'], ['社会が変わりつつある。', 'La sociedad está cambiando gradualmente.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['段階', '進行', '文語']},
  practice: {levels: [{id: 'level-1', title: '〜つつある', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Cambio gradual', lines: [['', '気温が上がり___。']], options: ['つつある', 'ている', 'つつあります', 'あります'], answer: 'つつある', explain: 'つつある (cambio gradual).'}]}, {id: 'level-2', title: 'Contexto', tag: '段階', intro: 'Completa.', type: 'guidedText', scene: 'Cambios.', text: '社会が変わり___。'
, blanks: [{options: ['つつある', 'ている'], answer: 'つつある', explain: '〜つつある (gradual).'}]}, {id: 'level-3', title: '作文', tag: 'つつある', intro: 'Escribe.', type: 'freeText', scene: 'Cambios.', text: '1. [[0]] (La tecnología está avanzando gradualmente).', blanks: [{answer: '技術が進みつつある', accepted: ['つつある', '進み'], explain: '〜つつある (cambio gradual).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜つつある?', answer: 'Expresa que algo está cambiando o sucediendo gradualmente, lentamente. Es más formal y literario que 〜ている. Común en escritura académica.', accepted: ['段階', '進行'], explain: '〜つつある: cambio gradual (formal).'}]}]},
}
export default topic
