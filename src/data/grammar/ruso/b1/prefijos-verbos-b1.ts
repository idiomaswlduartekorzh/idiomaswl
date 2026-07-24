import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'prefijos-verbos-b1',
  order: '11',
  color: '#1a2ecc',
  category: 'Verbos y Prefijos',
  level: 'B1',
  title: 'Prefijos de Verbos en Ruso B1',
  shortTitle: 'Prefijos: за-, раз-, пере-, про-',
  metaTitle: 'Prefijos de Verbos en Ruso B1',
  description: 'Prefijos (приставки) modifican significado y aspecto: раз-/рас- (separación), за- (comienzo), пере- (repetición, cambio), про- (a través). Cada prefijo afecta aspecto (generalmente СВ) y significado.',
  lead: 'Domina prefijos: за-, раз-, пере-, про- — modifica significado y aspecto',
  outcomes: [
    'Usa prefijos para modificar significado de verbos',
    'Forma пары aspectuales: работать→заработать, писать→переписать',
    'Entiende cada prefijo: inicio, separación, repetición, paso',
    'Construye verbos derivados con prefijos',
  ],
  guide: {
    goal: 'Usar prefijos para expresar matices de significado verbal.',
    model: 'работать (work) → заработать (earn), писать (write) → переписать (rewrite), рвать (tear) → разрвать (tear apart)',
    formula: 'Prefijo + глагол (обычно СВ)',
    decisions: [
      'за-: начало, получение результата. писать→записать (to write down/record)',
      'раз-/рас-: separación, distinción. рвать→разорвать (tear apart)',
      'пере-: repetición, cambio de dirección. писать→переписать (rewrite)',
      'про-: paso, duración. читать→прочитать (read through/finish reading)',
    ],
    table: [
      ['Prefijo', 'Significado', 'Ejemplo'],
      ['за-', 'Comienzo/consecuencia', 'писать→записать (anotar)'],
      ['раз-', 'Separación', 'рвать→разорвать (rasgar)'],
      ['пере-', 'Repetición/cambio', 'писать→переписать (reescribir)'],
      ['про-', 'Paso/duración', 'читать→прочитать (leer hasta fin)'],
    ],
    mistakes: [
      '"Я заработал деньги" ✓ (за- denota resultado de trabajo, earning).',
      '"Они переписали письмо" ✓ (пере- denota reescritura).'],
  },
  seo: [
    {heading: '¿Qué son prefijos de verbos?', paragraphs: ['Prefijos (приставки) son elementos que se añaden antes de la raíz verbal para modificar su significado. "писать" (escribir) vs "переписать" (reescribir).', 'Cada prefijo tiene un significado base que afecta cómo se entiende el verbo.']},
    {heading: 'Prefijo за-: comienzo y resultado', paragraphs: ['"работать" → "заработать" (earn money — resultado del trabajo). "писать" → "записать" (write down — anotar, registrar).', 'За- suele crear perfectivos y denota logro o inicio.']},
    {heading: 'Prefijo раз-/рас-: separación y distinción', paragraphs: ['"рвать" → "разорвать" (tear apart — раз- denota separación). "считать" → "рассчитать" (calculate, reckon — separación en partes).', 'Denota movimiento hacia afuera o descomposición.']},
    {heading: 'Prefijo пере-: repetición y cambio', paragraphs: ['"писать" → "переписать" (rewrite — hacer de nuevo). "идти" → "перейти" (cross — cambio de lado/dirección).', 'Muy productivo en ruso para dentar repetición o cambio de dirección.']},
    {heading: 'Prefijo про-: paso y consumo', paragraphs: ['"читать" → "прочитать" (read through/finish). "жить" → "прожить" (live through — duración/paso de tiempo).', 'Denota completitud o paso a través de algo.']},
  ],
  visual: {mode: 'scene', teacherLens: 'Prefijos: significado y aspecto verbal', graphicPrompt: 'Tabla: Prefijos y sus significados base', scene: [['Я заработал деньги.', 'Gané dinero (за- resultado).'], ['Они разорвали бумагу.', 'Rasgaron el papel (раз- separación).'], ['Она переписала письмо.', 'Reescribió la carta (пере- repetición).'], ['Я прочитал книгу.', 'Leí el libro (про- compleción).'], ['Мы заболели.', 'Nos enfermamos (за- cambio de estado).']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['приставка', 'значение', 'вид']},
  practice: {levels: [{id: 'level-1', title: 'Prefijo correcto', tag: 'Múltipla escolha', intro: 'Elige prefijo.', type: 'choice', items: [{scene: 'Prefijo за- resultado', lines: [['', '___работал деньги. (earn)']], options: ['Заработал', 'Пересработал', 'Разработал', 'Проработал'], answer: 'Заработал', explain: 'Заработал — earned (за- resultado).'}, {scene: 'Prefijo пере- repetición', lines: [['', '___писал письмо. (rewrite)']], options: ['Записал', 'Переписал', 'Разписал', 'Прописал'], answer: 'Переписал', explain: 'Переписал — rewrote (пере- repetición).'}]}, {id: 'level-2', title: 'Prefijos en contexto', tag: 'Prefijos', intro: 'Completa con prefijo.', type: 'guidedText', scene: 'Oraciones con prefijos.', text: 'Я [[0]] деньги. Он [[1]] письмо. Она [[2]] книгу.', blanks: [{options: ['заработал', 'переработал'], answer: 'заработал', explain: 'заработал (за- resultado).'}, {options: ['переписал', 'записал'], answer: 'переписал', explain: 'переписал (пере- repetición).'}, {options: ['прочитала', 'переписала'], answer: 'прочитала', explain: 'прочитала (про- compleción).'}]}, {id: 'level-3', title: 'Escritura con prefijos', tag: 'Prefijos', intro: 'Escribe verbos con prefijos.', type: 'freeText', scene: 'Mis acciones con significados de prefijos.', text: '1. [[0]] (Gané dinero). 2. [[1]] (Reescribí el documento). 3. [[2]] (Rasgué el papel).', blanks: [{answer: 'Я заработал деньги', accepted: ['заработал', 'за-'], explain: 'заработал (за- resultado).'}, {answer: 'Я переписал документ', accepted: ['переписал', 'пере-'], explain: 'переписал (пере- repetición).'}, {answer: 'Я разорвал бумагу', accepted: ['разорвал', 'раз-'], explain: 'разорвал (раз- separación).'}]}, {id: 'level-4', title: 'Análise de prefijos', tag: 'Análise', intro: 'Explica prefijos.', type: 'write', items: [{scene: 'Significado de prefijos', prompt: '¿Cómo cambia el significado al añadir prefijo? "писать" → "переписать"', answer: '"писать" es escribir (general). "переписать" es reescribir (pере- denota repetición, hacer de nuevo). El prefijo modifica no solo el significado sino también el aspecto (típicamente СВ).', accepted: ['значение', 'повтор', 'вид'], explain: 'Prefijo modifica significado y aspecto.'}]}]},
}

export default topic
