import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'kamo-b1',
  order: '20',
  color: '#dc2626',
  category: 'Especulación e Incertidumbre',
  level: 'B1',
  title: '〜かもしれない — Posibilidad e Incertidumbre en Japonés B1',
  shortTitle: '〜かもしれない (might, may, perhaps)',
  metaTitle: '〜かもしれない en Japonés B1 — Expresar Posibilidad',
  description: '〜かもしれない expresa posibilidad o incertidumbre: "雨が降るかもしれない" (tal vez llueva, podría llover). Literal: kamo (partícula de duda) + shirenu (no saber). Muy usado en predicciones y suposiciones.',
  lead: 'Domina 〜かもしれない: expresa posibilidad e incertidumbre',
  outcomes: [
    'Forma 〜かもしれない con diferentes verbos',
    'Expresa posibilidad y especulación',
    'Usa en contexto de predicción',
    'Distingue 〜かもしれない de たぶん (probablemente)',
  ],
  guide: {
    goal: 'Expresar que algo es POSIBLE pero INCIERTO: tal vez, podría, quizás.',
    model: '雨が降るかもしれない。(Ame ga furu kamo shirenai.) — Tal vez llueva / Podría llover. 彼は医者かもしれない。(Kare wa isha kamo shirenai.) — Tal vez sea doctor.',
    formula: 'Verbo [forma base] + かもしれない / Sustantivo + かもしれない / Adjetivo-na + かもしれない',
    decisions: [
      '〜かもしれない: posibilidad indeterminada (tal vez, podría, quizás)',
      '〜かもしれません: forma formal/cortés',
      '〜かも: versión coloquial (みたい、っぽい よりも formal)',
      'Contraste: かもしれない (posibilidad), かもしれた (hubiera sido posible — raro)',
    ],
    table: [
      ['Forma', 'Significado', 'Ejemplo'],
      ['〜かもしれない', 'Posibilidad', '明日雨かもしれない (tal vez llueva mañana)'],
      ['〜かもしれません', 'Formal', '来週辞めるかもしれません (tal vez renuncie la próxima semana)'],
      ['〜かも', 'Coloquial', '彼が来るかも (tal vez venga él)'],
    ],
    mistakes: [
      '「雨が降るかもしれない」 ✓ (tal vez llueva). 「雨が降るだろう」 es más predicción segura.',
      '「彼は医者かもしれない」 ✓ (tal vez sea doctor). 「彼は医者です」 es afirmación segura.'],
  },
  seo: [
    {heading: '¿Qué es 〜かもしれない?', paragraphs: ['〜かもしれない expresa posibilidad e incertidumbre sobre algo. No es predicción segura, sino una posibilidad que no se puede descartar.', 'Muy usado en conversación cotidiana.']},
    {heading: '〜かもしれない: posibilidad indeterminada', paragraphs: ['"明日雨が降るかもしれない" (tal vez llueva mañana — el speaker no está seguro). "彼は今寝ているかもしれない" (tal vez esté durmiendo ahora).', 'Expresa que algo ES POSIBLE pero el speaker NO ESTÁ SEGURO.']},
    {heading: '¿Cómo es la forma formal 〜かもしれません?', paragraphs: ['"来週辞めるかもしれません" (formal: tal vez renuncie la próxima semana). "この計画は失敗するかもしれません" (formal: este plan podría fracasar).', 'Usado en contextos formales, presentaciones, noticias.']},
    {heading: '¿Cuándo se usa la forma coloquial 〜かも?', paragraphs: ['"彼が来るかも" (informal: tal vez venga él). "そうかも" (puede ser, tal vez). "知らんけど" es aún más coloquial.', 'En conversación casual, especialmente con amigos.']},
    {heading: '〜かもしれない vs かもしれない vs かも', paragraphs: ['"来るかもしれない" (formal/neutro) vs "来るかもしれません" (más cortés) vs "来るかも" (coloquial). Todos expresan posibilidad pero con tonos diferentes.', 'Elegir según contexto y relación con oyente.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜かもしれない: posibilidad e incertidumbre', graphicPrompt: 'Tabla: Niveles de certeza (から vs だろう vs かもしれない)', scene: [['雨が降るかもしれない。', 'Tal vez llueva (incierto).'], ['明日は寒いかもしれません。', 'Mañana podría ser frío (formal, incierto).'], ['彼は医者かもしれない。', 'Tal vez sea doctor (especulación).'], ['そうかも。', 'Puede ser, tal vez (coloquial).'], ['辞めるかもしれません。', 'Podría renunciar (posibilidad).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['可能性', '不確実', 'かも']},
  practice: {levels: [{id: 'level-1', title: '〜かもしれない correcto', tag: 'Múltipla escolha', intro: 'Elige la forma correcta.', type: 'choice', items: [{scene: 'Posibilidad', lines: [['', '雨が降るかも___。']], options: ['しれない', 'しれます', 'ない', 'ます'], answer: 'しれない', explain: 'かもしれない (posibilidad).'}, {scene: 'Formal', lines: [['', '来週辞めるかも___。']], options: ['しれません', 'しれない', 'ません', 'ます'], answer: 'しれません', explain: 'かもしれません (formal).'}]}, {id: 'level-2', title: '〜かもしれない en contexto', tag: 'Contexto', intro: 'Completa con posibilidad.', type: 'guidedText', scene: 'Posibilidades e incertidumbres.', text: '明日雨かも[[0]]。 彼は医者かも[[1]]。 計画は失敗かも[[2]]。', blanks: [{options: ['しれない', 'ない'], answer: 'しれない', explain: 'かもしれない.'}, {options: ['しれない', 'ない'], answer: 'しれない', explain: 'かもしれない.'}, {options: ['しれません', 'ません'], answer: 'しれません', explain: 'かもしれません (formal).'}]}, {id: 'level-3', title: 'Escritura con 〜かもしれない', tag: 'Escritura', intro: 'Expresa posibilidades.', type: 'freeText', scene: 'Mis predicciones inciertas.', text: '1. [[0]] (Tal vez llueva mañana). 2. [[1]] (Podría ser doctor). 3. [[2]] (Tal vez renuncie).', blanks: [{answer: '明日雨が降るかもしれない', accepted: ['かもしれない', '雨'], explain: 'かもしれない (posibilidad).'}, {answer: '彼は医者かもしれない', accepted: ['かもしれない', '医者'], explain: 'かもしれない (posibilidad).'}, {answer: '辞めるかもしれません', accepted: ['かもしれません', '辞め'], explain: 'かもしれません (formal).'}]}, {id: 'level-4', title: 'Análise de 〜かもしれない', tag: 'Análise', intro: 'Explica significado.', type: 'write', items: [{scene: '〜かもしれない vs 〜だろう', prompt: '"雨が降るかもしれない" と "雨が降るだろう" の違いは何？', answer: '"かもしれない" は可能性、不確実性（～かもしれない、つまり可能だけど確実ではない）。"だろう" はより確実な予想・推測（～だろう、つまり多分そうだと思う）。"かもしれない" は可能性は低いかもしれない; "だろう" は高い確率。', accepted: ['可能性', '確実', '推測'], explain: 'かもしれない: posibilidad; だろう: predicción probable.'}]}]},
}

export default topic
