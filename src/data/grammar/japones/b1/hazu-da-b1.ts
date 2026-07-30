import type { GrammarTopic } from '../../types'
const topic: GrammarTopic = {
  slug: 'hazu-da-b1', order: '10', color: '#dc2626', category: 'Lógica y Expectativa', level: 'B1',
  title: '〜はずだ — Debe ser, se supone que en Japonés B1',
  shortTitle: '〜はずだ (should be, is supposed to)',
  metaTitle: '〜はずだ en Japonés B1',
  description: '〜はずだ expresa lo que debería ser lógicamente o se espera: "debe ser", "se supone que". 彼は来るはずだ (se supone que vendría).',
  lead: 'Domina 〜はずだ: expectativa lógica',
  outcomes: ['Forma 〜はずだ', 'Expresa expectativas', 'Usa para contradictorio expectativa', 'Distingue de 〜べき'],
  guide: {
    goal: 'Expresar lo que lógicamente debería ser o se espera que ocurra.',
    model: '彼は来るはずです。(Kare wa kuru hazu desu.) — Se supone que viene.',
    formula: 'Verbo/Adjetivo + はずだ',
    decisions: ['〜はず: expectativa lógica', '〜はずがない: "no puede ser"'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['〜はずだ', 'Expectativa', '来るはず (se supone que viene)']],
    mistakes: ['「来るはずです」 ✓ (se supone). No 「来ているはず」 con ている.'],
  },
  seo: [
    {heading: '¿Qué expresa 〜はずだ (expectativa lógica)?', paragraphs: ['彼は来るはずだ (se supone que vendrá). Expresa una expectativa basada en razonamiento: por lo que sé, lo lógico es que ocurra.', 'Se une a la forma plana: 来るはずだ (verbo), 高いはずだ (adjetivo い), 静かなはずだ (adjetivo な, con な), 学生のはずだ (sustantivo, con の). La trampa para el hispanohablante es la conexión con の/な en sustantivos y な-adjetivos.']},
    {heading: '¿Cuál es la diferencia entre 〜はずだ y 〜に違いない?', paragraphs: ['Ambos son deducciones, pero difieren en la fuerza. 〜はずだ expresa una expectativa lógica razonable ("se supone que...", basada en información): 予約したから、席があるはずだ (reservé, así que debería haber sitio). 〜に違いない expresa una convicción casi total del hablante ("no cabe duda de que..."): 彼が犯人に違いない (seguro que él es el culpable).', 'はずだ apela a la lógica objetiva; に違いない a la certeza subjetiva fuerte.']},
    {heading: '¿Cómo se usa 〜はずがない para negar una expectativa?', paragraphs: ['はずがない (o はずはない) niega la posibilidad: expresa "no puede ser que...", "es imposible que...". そんなに簡単なはずがない (no puede ser tan fácil), 彼が知らないはずがない (es imposible que él no lo sepa).', 'Ojo: はずがない no es lo mismo que la simple negación 来ないはずだ (se supone que no vendrá). はずがない niega la propia expectativa con fuerza ("no hay manera de que"), mientras que 〜ないはずだ mantiene una expectativa, solo que negativa.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜はずだ: expectativa', graphicPrompt: 'Tabla: 〜はずだ', scene: [['来るはずです。', 'Se supone que viene.'], ['知っているはず。', 'Debería saber.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['期待', '論理']},
  practice: {levels: [{id: 'level-1', title: '〜はずだ', tag: 'Múltipla escolha', intro: 'Selecciona.', type: 'choice', items: [{scene: 'Expectativa', lines: [['', '来る___。']], options: ['はず', 'はずだ', 'べき', 'ほう'], answer: 'はずだ', explain: 'はずだ (expectativa).'}]}, {id: 'level-2', title: 'Contexto', tag: 'Expectativa', intro: 'Completa.', type: 'guidedText', scene: 'Expectativas.', text: '知っている[[0]]。'
, blanks: [{options: ['はず', 'はずだ'], answer: 'はずだ', explain: '〜はずだ.'}]}, {id: 'level-3', title: '作文', tag: 'はず', intro: 'Escribe.', type: 'freeText', scene: 'Expectativas.', text: '1. [[0]] (Se supone que sabe).', blanks: [{answer: '知っているはずです', accepted: ['はず', '知っ'], explain: '〜はずだ (expectativa).'}]}, {id: 'level-4', title: 'Análise', tag: 'Análise', intro: 'Explica.', type: 'write', items: [{scene: 'Significado', prompt: '¿Qué significa 〜はずだ?', answer: 'Expresa que algo debería ser o se espera lógicamente que ocurra. Basado en expectativa racional.', accepted: ['期待', '論理'], explain: '〜はずだ: expectativa lógica.'}]}]},
}
export default topic
