import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'bakari-b1',
  order: '06',
  color: '#dc2626',
  category: 'Cantidad y Énfasis',
  level: 'B1',
  title: '〜ばかり — Recién hecho, solo en Japonés B1',
  shortTitle: '〜ばかり (just, only)',
  metaTitle: '〜ばかり en Japonés B1',
  description: '〜ばかり expresa: 1) recién completada una acción (pasado reciente), 2) casi exclusivamente algo. "飲んだばかり" (recién tomé), "彼はゲームばかりやってる" (solo juega videojuegos).',
  lead: 'Domina 〜ばかり: pasado reciente o énfasis en cantidad/proporción',
  outcomes: ['Forma 〜ばかり con pasado', 'Expresa acciones recién completadas', 'Usa para énfasis en "solo" o "casi exclusivamente"', 'Distingue de 〜たばかり (reciente) vs ばかり (solo)'],
  guide: {
    goal: 'Expresar que algo acaba de suceder o que algo ocurre casi exclusivamente.',
    model: '飲んだばかりです。(Nonda bakari desu.) — Acabo de beber. ゲームばかりやってる。(Gēmu bakari yatteru.) — Solo juega videojuegos.',
    formula: 'Verbo [pasado/presente] + ばかり',
    decisions: ['〜たばかり: pasado reciente', '〜(現在形)ばかり: énfasis en "solo"', 'ばかりか: "no solo..., sino también"'],
    table: [
      ['Uso', 'Estructura', 'Ejemplo'],
      ['Pasado reciente', 'た + ばかり', '飲んだばかり (acabo de beber)'],
      ['Énfasis exclusivo', 'Verbo + ばかり', 'ゲームばかり (solo juegos)'],
    ],
    mistakes: ['「飲んだばかり」 ✓ (reciente). No confundas con 「飲むばかりだ」 que sería "solo va a beber".'],
  },
  seo: [
    {heading: '¿Cómo expresa 〜たばかり un pasado muy reciente?', paragraphs: ['飲んだばかりです (acabo de beber — pasado muy reciente). 帰ったばかり (acabo de llegar).', 'Se forma con el verbo en forma た + ばかり y expresa que la acción sucedió hace muy poco, con carga subjetiva: el hablante SIENTE que fue reciente, aunque hayan pasado semanas.']},
    {heading: '¿Cómo se usa 〜ばかり para el énfasis exclusivo?', paragraphs: ['彼はゲームばかりやってる (solo juega videojuegos — casi nada más). 毎日仕事ばかりしてる (solo trabajo cada día).', 'Tras un sustantivo o la forma て, ばかり subraya que algo ocurre casi en exclusiva, a menudo con matiz de queja o exceso.']},
    {heading: '¿En qué se diferencian 〜たばかり y 〜たところ?', paragraphs: ['Ambos traducen "acabar de", pero difieren. 〜たばかり es subjetivo y elástico: 日本に来たばかりです puede decirse aunque hayas llegado hace meses, porque expresa la SENSACIÓN de novedad. 〜たところ es objetivo y estricto: 今着いたところです (acabo de llegar justo ahora) solo vale para el instante inmediato.', 'La trampa para el hispanohablante es usarlos como sinónimos: para "hace un momento exacto" se usa ところ; para "hace poco (lo siento reciente)" se usa ばかり.']},
  ],
  visual: {mode: 'scene', teacherLens: '〜ばかり: reciente o exclusivo', graphicPrompt: 'Tabla: 〜ばかり por contexto', scene: [['飲んだばかりです。', 'Acabo de beber.'], ['帰ったばかり。', 'Acabo de llegar.'], ['ゲームばかりやってる。', 'Solo juega videojuegos.'], ['毎日仕事ばかり。', 'Solo trabajo cada día.']]
, learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['最近', '専ら', '強調']},
  practice: {levels: [{id: 'level-1', title: 'Forma 〜ばかり', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Pasado reciente', lines: [['', 'コーヒーを飲ん___。']], options: ['ばかり', 'ばかりだ', 'ばかります', 'ばかった'], answer: 'ばかり', explain: 'ばかり (pasado reciente).'}, {scene: 'Énfasis exclusivo', lines: [['', 'ゲーム___ やってる。']], options: ['ばかり', 'ばかった', 'ばかりだ', 'だけ'], answer: 'ばかり', explain: 'ばかり (solo/exclusivo).'}]}, {id: 'level-2', title: 'うち en contexto', tag: 'Reciente/Énfasis', intro: 'Completa 〜ばかり.', type: 'guidedText', scene: 'Oraciones de pasado reciente y énfasis.', text: '飲んだ[[0]] 。 ゲーム[[1]] 。 帰ったばかり[[2]]。', blanks: [{options: ['ばかり', 'だけ'], answer: 'ばかり', explain: 'ばかり (reciente).'}, {options: ['ばかり', 'だけ'], answer: 'ばかり', explain: 'ばかり (énfasis).'}, {options: ['です', 'だ'], answer: 'です', explain: '帰ったばかりです (formal).'}]}, {id: 'level-3', title: 'Escritura con 〜ばかり', tag: 'ばかり', intro: 'Escribe con 〜ばかり.', type: 'freeText', scene: 'Acciones recientes y exclusivas.', text: '1. [[0]] (Acabo de desayunar). 2. [[1]] (Solo estudio). 3. [[2]] (Acabo de llegar).', blanks: [{answer: '朝食を食べたばかり', accepted: ['たばかり', '食べ'], explain: '〜たばかり (reciente).'}, {answer: '勉強ばかりしている', accepted: ['ばかり', '勉強'], explain: '〜ばかり (énfasis).'}, {answer: '帰ったばかり', accepted: ['たばかり', '帰っ'], explain: '〜たばかり (reciente).'}]}, {id: 'level-4', title: 'Análise de 〜ばかり', tag: 'Análise', intro: 'Explica 〜ばかり.', type: 'write', items: [{scene: 'Dos significados', prompt: '¿Cuáles son los dos significados principales de 〜ばかり?', answer: '1) 〜たばかり = pasado reciente (acabo de...). 2) 〜ばかり = énfasis en exclusividad (solo..., casi nada más). Ambos son muy comunes en conversación.', accepted: ['最近', '専ら'], explain: '〜ばかり: reciente o exclusivo.'}]}]},
}

export default topic
