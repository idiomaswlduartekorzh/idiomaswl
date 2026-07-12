import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'sou-b1', order: '09', color: '#dc2626', category: 'Apariencia y Percepción', level: 'B1',
  title: '〜そう — Parece que en Japonés B1',
  shortTitle: '〜そう (looks like, seems)',
  metaTitle: '〜そう en Japonés B1',
  description: '〜そう expresa apariencia o lo que parece: "looks like", "seems like". 美しそう (parece hermoso), 雨が降りそう (parece que va a llover).',
  lead: 'Domina 〜そう: expresión de apariencia y probabilidad',
  outcomes: ['Forma 〜そう con adjetivos y verbos', 'Expresa "parece que"', 'Usa para predicción de acciones inminentes', 'Distingue 〜そう de 〜みたい'],
  guide: {
    goal: 'Expresar que algo parece cierto, probable o está a punto de suceder.',
    model: '美しそうです。(Utsukushii sou desu.) — Parece hermoso. 雨が降りそうです。(Ame ga furiso desu.) — Parece que va a llover.',
    formula: 'Adjetivo/Verbo [raíz negativa] + そう',
    decisions: ['形容詞 + そう: "parece X"', 'V連用 + そう: "a punto de V"'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['形容詞 + そう', 'Apariencia', '美しそう (parece hermoso)'], ['V + そう', 'Próximo a ocurrir', '降りそう (a punto de llover)']],
    mistakes: ['「美しそう」 ✓ (parece hermoso). No 「美しいそう」.'],
  },
  seo: [{heading: '〜そう para apariencia', paragraphs: ['美しそう (parece hermoso), 難しそう (parece difícil). Expresa percepción visual o sensorial.', 'Muy común en descripción.']}, {heading: '〜そう para acción inminente', paragraphs: ['雨が降りそう (está a punto de llover). 彼は笑いそう (parece que va a reír).', 'Expresa que una acción está próxima.']}],
  visual: {mode: 'scene', teacherLens: '〜そう: apariencia e inminencia', graphicPrompt: 'Tabla: 〜そう', scene: [['美しそう。', 'Parece hermoso.'], ['雨が降りそう。', 'Parece que va a llover.'], ['難しそう。', 'Parece difícil.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['外見', '近い', '推測']},
  practice: {levels: [{id: 'level-1', title: '〜そう', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Apariencia', lines: [['', '美し___。']], options: ['そう', 'い', 'そうだ', 'そうです'], answer: 'そう', explain: 'そう (apariencia).'}]}, {id: 'level-2', title: 'Contexto', tag: 'Apariencia', intro: 'Completa.', type: 'guidedText', scene: 'Descripciones.', text: '雨が降り___。'
, blanks: [{options: ['そう', 'そうだ'], answer: 'そう', explain: '〜そう (inminencia).'}]}, {id: 'level-3', title: '作文', tag: 'そう', intro: 'Escribe.', type: 'freeText', scene: 'Apariencias.', text: '1. [[0]] (Parece difícil).', blanks: [{answer: '難しそう', accepted: ['そう', '難し'], explain: '〜そう (apariencia).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜そう?', answer: 'Expresa que algo parece cierto, probable o inminente. "Parece...", "está a punto de...". Basado en apariencia o indicios.', accepted: ['外見', '推測'], explain: '〜そう: apariencia e inminencia.'}]}]},
}
export default topic
