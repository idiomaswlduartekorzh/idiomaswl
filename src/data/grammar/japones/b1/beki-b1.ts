import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'beki-b1',
  order: '15',
  color: '#dc2626',
  category: 'Modalidad y Opinión',
  level: 'B1',
  title: '〜べき — Obligación y Deber en Japonés B1',
  shortTitle: '〜べき (should, ought to, be supposed to)',
  metaTitle: '〜べき en Japonés B1 — Expresar Obligación y Deber',
  description: '〜べき expresa lo que alguien DEBERÍA hacer (obligación fuerte, responsabilidad ética/lógica): "学生は勉強すべき" (los estudiantes deberían estudiar). Literal: be (deber) + (auxiliar formativo de obligación). Más formal que "べき".',
  lead: 'Domina 〜べき: expresa obligación ética y responsabilidad',
  outcomes: [
    'Forma 〜べき con diferentes verbos',
    'Expresa obligación fuerte y lo que debería hacerse',
    'Usa en contexto de responsabilidad moral/lógica',
    'Distingue 〜べき de 〜なければならない (deber forzado)',
  ],
  guide: {
    goal: 'Expresar lo que alguien DEBERÍA hacer (obligación moral/lógica, responsabilidad).',
    model: '学生は勉強すべきだ。(Gakusei wa benkyou subeki da.) — Los estudiantes deberían estudiar. 今は行くべき時だ。(Ima wa iku beki toki da.) — Ahora es el momento en que deberías ir.',
    formula: 'Verbo [forma base/い-adjetivo] + べき（だ/です）',
    decisions: [
      '〜べきだ: obligación ética/lógica fuerte (should, ought to)',
      '〜べきではない: negación (no debería, no deberías)',
      '〜べきだった: pasado contrafáctico (debería haber hecho)',
      'べき vs なければならない: べき es más ético/lógico; なければならない es más forzado/urgente',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜べきだ', 'Obligación ética/lógica', '正直であるべきだ (deberías ser honesto)'],
      ['〜べきではない', 'Negación de obligación', '嘘をつくべきではない (no deberías mentir)'],
      ['〜べきだった', 'Pasado (debería haber)', '早く起きるべきだった (debería haber me levantado temprano)'],
    ],
    mistakes: [
      '「学生は勉強すべきだ」 ✓ (obligación ética). 「勉強します」 es neutro, no expresa should.',
      '「行くべきではない」 ✓ (no debería ir). 「行きません」 es solo negación de hecho, no de obligación.'],
  },
  seo: [
    {heading: '¿Qué es 〜べき?', paragraphs: ['〜べき expresa obligación ética o lógica: lo que DEBERÍA hacer por responsabilidad moral, razón lógica o norma social.', 'Es diferente de 〜なければならない (obligación forzada/urgente) y 〜た ほうがいい (recomendación).']},
    {heading: '〜べきだ: obligación fuerte', paragraphs: ['"親は子どもを大事にすべきだ" (los padres deberían cuidar a sus hijos — responsabilidad ética). "学生は宿題をやるべきだ" (los estudiantes deberían hacer la tarea).', 'Expresa lo que la lógica o la moral EXIGE.']},
    {heading: '〜べきではない: prohibición lógica', paragraphs: ['"子どもの前で悪口を言うべきではない" (no deberías hablar mal frente a niños — inapropiado). "秘密を他の人に話すべきではない" (no deberías contar secretos a otros).', 'Expresa lo que moralmente NO deberías hacer.']},
    {heading: '〜べきだった: pasado contrafáctico', paragraphs: ['"もっと勉強するべきだった" (debería haber estudiado más). "その時に言うべきだった" (debería haber dicho en ese momento).', 'Lamento de no haber cumplido con la obligación.']},
    {heading: 'べき vs なければならない', paragraphs: ['"正直であるべきだ" (deberías ser honesto — ética) vs "明日までに終わらなければならない" (TIENES QUE terminarlo para mañana — urgencia). べき es ético/lógico; なければならない es forzado/urgente.', 'Contextos diferentes aunque ambos expresan obligación.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜べき: obligación ética y lógica', graphicPrompt: 'Tabla: 〜べき (debería) vs 〜なければならない (tienes que)', scene: [['学生は勉強すべきだ。', 'Los estudiantes deberían estudiar (ético).'], ['親切にするべきだ。', 'Deberías ser amable (responsabilidad).'], ['嘘をつくべきではない。', 'No deberías mentir (prohibición moral).'], ['早く起きるべきだった。', 'Debería haberme levantado temprano (lamento).'], ['正直であるべき。', 'Deberías ser honesto (obligación ética).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['義務', '倫理', '論理']},
  practice: {levels: [{id: 'level-1', title: '〜べき correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: '〜べきだ positivo', lines: [['', '学生は勉強___。']], options: ['すべきだ', 'しなければならない', 'しています', 'しましょう'], answer: 'すべきだ', explain: 'すべきだ (obligación ética).'}, {scene: '〜べきではない', lines: [['', '子どもの前で悪口を言___。']], options: ['べきではない', 'つけない', 'わない', 'りません'], answer: 'うべきではない', explain: 'べきではない (prohibición moral).'}]}, {id: 'level-2', title: '〜べき en contexto', tag: 'Contexto', intro: 'Completa con la forma correcta.', type: 'guidedText', scene: 'Obligaciones éticas y lógicas.', text: '親は___。 その時___。 秘密は___。', blanks: [{options: ['子どもを大事にすべきだ', 'います'], answer: '子どもを大事にすべきだ', explain: 'すべきだ (obligación ética).'}, {options: ['言うべきだった', 'いません'], answer: '言うべきだった', explain: 'べきだった (debería haber).'}, {options: ['話すべきではない', 'ます'], answer: '話すべきではない', explain: 'べきではない (no debería).'}]}, {id: 'level-3', title: 'Escritura con 〜べき', tag: 'Escritura', intro: 'Escribe obligaciones éticas.', type: 'freeText', scene: 'Mis opiniones sobre lo que deberíamos hacer.', text: '1. [[0]] (Los estudiantes deberían estudiar). 2. [[1]] (No deberías mentir). 3. [[2]] (Debería haber trabajado más).', blanks: [{answer: '学生は勉強すべきだ', accepted: ['べき', '勉強'], explain: 'すべきだ (obligación ética).'}, {answer: '嘘をつくべきではない', accepted: ['べきではない', 'つく'], explain: 'べきではない (prohibición).'}, {answer: '頑張るべきだった', accepted: ['べきだった', '頑張'], explain: 'べきだった (pasado contrafáctico).'}]}, {id: 'level-4', title: 'Análise de 〜べき', tag: 'Análise', intro: 'Explica el significado.', type: 'write', items: [{scene: 'べき vs なければならない', prompt: '"正直であるべき" と "明日までに終わらなければならない" の違いは何？', answer: '"正直であるべき" は倫理的・論理的な義務（～するべきである、道義的に正しい）。"明日までに終わらなければならない" は強制的・緊急的義務（～しないといけない、外部からの強制）。どちらも義務だが、性質が異なる。', accepted: ['倫理', '論理', '緊急'], explain: 'べき: ética/lógica; なければならない: forzada/urgencia.'}]}]},
}

export default topic
