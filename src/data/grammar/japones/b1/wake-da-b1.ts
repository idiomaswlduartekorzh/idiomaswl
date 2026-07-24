import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'wake-da-b1', order: '08', color: '#dc2626', category: 'Razonamiento y Lógica', level: 'B1',
  title: '〜わけだ — Por eso, no es de extrañar en Japonés B1',
  shortTitle: '〜わけだ (that explains it, no wonder)',
  metaTitle: '〜わけだ en Japonés B1',
  description: '〜わけだ expresa conclusión lógica: "por eso", "eso explica por qué", "no es de extrañar". 親切だから好かれるわけだ (es amable, no es de extrañar que sea querido).',
  lead: 'Domina 〜わけだ: conclusión lógica y explicación',
  outcomes: ['Forma 〜わけだ', 'Expresa razonamiento lógico', 'Usa para conclusiones inevitables', 'Distingue de 〜から (porque)'],
  guide: {
    goal: 'Expresar que algo es lógico o inevitable dado las circunstancias.',
    model: '親切だから好かれるわけだ。(Shinsetsudakara sukareru wake da.) — Es amable, no es de extrañar que sea querido.',
    formula: 'Razón/Hecho + から/ので + 〜わけだ',
    decisions: ['〜わけだ: conclusión lógica', '〜わけがない: "no puede ser"', '〜わけではない: "no es que"'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['理由 + わけだ', 'Conclusión lógica', '親切だからわけだ (por eso es querido)']],
    mistakes: ['「親切だから好かれるわけだ」 ✓ (lógico). No confundas con 「親切だから好かれる」 que es simple causa.'],
  },
  seo: [{heading: '〜わけだ para conclusión', paragraphs: ['親切だから好かれるわけだ (es amable, por eso es querido — explicación lógica).', 'Expresa que algo es inevitable o lógicamente necesario.']}],
  visual: {mode: 'scene', teacherLens: '〜わけだ: conclusión lógica', graphicPrompt: 'Tabla: 〜わけだ', scene: [['親切だからわけだ。', 'Es amable, por eso...'], ['賢いから成功するわけだ。', 'Es inteligente, no es extraño que tenga éxito.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['論理', '必然', '説明']},
  practice: {levels: [{id: 'level-1', title: '〜わけだ', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Conclusión', lines: [['', '親切だから___。']], options: ['わけだ', 'から', 'ので', 'わけではない'], answer: 'わけだ', explain: 'わけだ (conclusión lógica).'}]}, {id: 'level-2', title: 'Lógica', tag: 'Razonamiento', intro: 'Completa.', type: 'guidedText', scene: 'Conclusiones.', text: '賢いから成功する[[0]]。'
, blanks: [{options: ['わけだ', 'から'], answer: 'わけだ', explain: 'わけだ (lógico).'}]}, {id: 'level-3', title: '作文', tag: '論理', intro: 'Escribe.', type: 'freeText', scene: 'Conclusiones.', text: '1. [[0]] (Por eso es querido).', blanks: [{answer: '親切だからわけだ', accepted: ['わけだ', '親切'], explain: '〜わけだ (conclusión).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Diferencia', prompt: '¿Cuál es la diferencia entre "親切だから好かれる" y "親切だからわけだ"?', answer: 'La primera es simple causa (es amable, así que es querido). La segunda es conclusión lógica/inevitable (es amable, por eso (inevitablemente) es querido — no es de extrañar). わけだ añade matiz de lógica o inevitabilidad.', accepted: ['論理', '必然'], explain: 'わけだ: conclusión lógica inevitable.'}]}]},
}
export default topic
