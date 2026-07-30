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
  seo: [
    {heading: '¿Qué expresa 〜に違いない (deducción segura)?', paragraphs: ['彼は来るに違いない (seguramente vendrá). Expresa una convicción fuerte del hablante: "no cabe duda de que...", basada en indicios o lógica.', 'Es más rotundo que でしょう o かもしれない: quien lo dice está casi seguro, aunque no lo haya confirmado.']},
    {heading: '¿En qué se diferencia 〜に違いない de 〜かもしれない?', paragraphs: ['Marcan grados opuestos de certeza. かもしれない expresa una posibilidad baja o insegura ("quizá"): 雨が降るかもしれない (tal vez llueva). に違いない expresa casi certeza ("seguro que"): 雨が降るに違いない (seguro que va a llover).', 'La escala de certeza aproximada de menor a mayor es: かもしれない < でしょう < に違いない < afirmación directa.']},
    {heading: '¿Cómo se conecta 〜に違いない con cada tipo de palabra?', paragraphs: ['Se une a la forma plana. Con verbos y adjetivos い va directo: 来るに違いない, 高いに違いない. Con sustantivos y adjetivos な se une SIN だ: 学生に違いない (seguro que es estudiante), 便利に違いない —nunca 学生だに違いない—.', 'La trampa para el hispanohablante es añadir だ con sustantivos y な-adjetivos: igual que con かもしれない, hay que quitarlo antes de に違いない.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜に違いない: deducción segura', graphicPrompt: 'Tabla: 〜に違いない vs 〜はずだ', scene: [['来るに違いない。', 'Seguramente vendrá.'], ['間違いに違いない。', 'Debe ser un error.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['確実', '推測', '論理']},
  practice: {levels: [{id: 'level-1', title: '〜に違いない', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Deducción', lines: [['', '来る___。']], options: ['に違いない', 'に違いありません', 'はずだ', 'ほう'], answer: 'に違いない', explain: 'に違いない (deducción).'}]}, {id: 'level-2', title: 'Contexto', tag: '確実', intro: 'Completa.', type: 'guidedText', scene: 'Deducciones.', text: '彼は知っている[[0]]。'
, blanks: [{options: ['に違いない', 'に違いありません'], answer: 'に違いない', explain: '〜に違いない.'}]}, {id: 'level-3', title: '作文', tag: 'に違いない', intro: 'Escribe.', type: 'freeText', scene: 'Deducciones.', text: '1. [[0]] (Debe ser error).', blanks: [{answer: '間違いに違いない', accepted: ['に違いない', '間違い'], explain: '〜に違いない (deducción).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜に違いない?', answer: 'Expresa deducción lógica segura. "Debe ser...", "seguramente...". Más fuerte que はずだ en convicción.', accepted: ['確実', '推測'], explain: '〜に違いない: deducción lógica fuerte.'}]}]},
}
export default topic
