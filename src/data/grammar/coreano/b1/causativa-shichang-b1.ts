import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'causativa-shichang-b1',
  order: '18',
  color: '#c60c30',
  category: 'Voz y Perspectiva',
  level: 'B1',
  title: '사동사: Voz Causativa en Coreano B1',
  shortTitle: '사동사 (hacer que, dejar que)',
  metaTitle: '사동사 en Coreano B1 — Voz Causativa Coreana',
  description: '사동사 (voz causativa) expresa hacer que alguien haga algo: "hacer que X coma" en lugar de "X come". Formación: raíz + -게 하다 o sufijos -이/-히/-리/-게. Muy diferente del español que usa perífrasis "hacer + infinitivo". Fundamental para expresar causación en B1.',
  lead: 'Domina 사동사 para expresar causación: "hacer que..., dejar que..."',
  outcomes: ['Forma voz causativa con -게 하다 y sufijos', 'Expresa causación y permiso', 'Usa en narrativa de acciones causadas', 'Distingues causativa de activa y pasiva'],
  guide: {
    goal: 'Expresar que alguien hace que otra persona haga algo.',
    model: '엄마가 아이를 먹게 해요. 선생님이 학생들을 읽히게 해요. (La mamá hace que el niño coma. El profesor hace que los estudiantes lean.)',
    formula: '동사 + -게 하다 o sufijo + 다',
    decisions: ['--게 하다: forma más común, "hacer que X haga"', '-이/-히/-리: sufijos causativos específicos (menos comunes)', '대상 표시: -을/를 (complemento directo del causador)', '행위자 표시: -에게 (quien realiza la acción causada)', '"하게" vs "하지 못하게" (permitir vs impedir)'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['사동사', 'Causativa', '먹게 해요 → hacer que coma'], ['vs 능동사', 'Activa', '먹어요 → comer (acción propia)']],
    mistakes: ['"-게 하다" se pronuncia separado pero funciona como sufijo causativo.', 'Confundir -게 하다 con -더라고 (reportado).'],
  },
  seo: [
    {heading: '¿Qué es 사동사 (causativa)?', paragraphs: ['사동사 es la voz causativa coreana: expresa hacer que alguien haga algo. "El padre hace que el hijo estudie" en lugar de "El hijo estudia".', 'Se usa en narrativa, instrucciones y expresión de acciones causadas.']},
    {heading: 'Formación con -게 하다', paragraphs: ['-게 하다 es la forma más común: verbo + -게 하다. 먹다 → 먹게 해요 (hacer que coma).', 'Otros ejemplos: 공부하다 → 공부하게 해요, 읽다 → 읽게 해요.']},
    {heading: '사동사 en narrativa familiar y académica', paragraphs: ['"엄마가 아이를 먹게 해요" (la mamá hace que el niño coma). "선생님이 학생들을 공부하게 해요" (el profesor hace que los estudiantes estudien).', 'Común en instrucciones, historias, descripción de responsabilidades.']},
    {heading: 'Complemento directo y agente en causativa', paragraphs: ['El objeto causado es marcado por -을/를: "아이를 먹게 해요" (hacer que el niño coma).', 'El agente de la acción causada puede ir con -에게: "아이에게 먹게 해요" (hacer que el niño coma — más directo).']},
    {heading: 'Expresión de permiso: -게 해 주다 (dejar que, permitir)', paragraphs: ['"가게 해 주세요" (déjame ir — permiso). -게 해 주다 combina causativa + "dar" para expresar permiso amable.', '"-게 하지 말다" (no dejes que, impide que) expresa prohibición causada.']},
  ],
  visual: {mode: 'scene', teacherLens: '사동사 (causativa): alguien hace que otro haga vs 능동사 (activa)', graphicPrompt: 'Tabla: 사동사 (causativa) vs 능동사 (activa). Ejemplo comparativo.', scene: [['엄마가 아이를 먹게 해요.', 'La mamá hace que el niño coma.'], ['선생님이 학생들을 읽게 해요.', 'El profesor hace que los estudiantes lean.'], ['아버지가 나를 공부하게 해요.', 'Mi padre me hace estudiar.'], ['언니가 내 친구를 만나게 해 줬어요.', 'Mi hermana permitió que conociera a mi amigo.'], ['아이들을 뛰게 해요.', 'Hago que los niños corran.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['원인', '피행위자', '사동 형태']},
  practice: {levels: [{id: 'level-1', title: 'Forma causativa -게 하다', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -게 하다', lines: [['', '엄마가 아이를 먹___ 해요.']], options: ['게', '기', '니', '므'], answer: '게', explain: '먹다 → 먹게 해요 (hacer que coma).'}, {scene: 'Causativa con permiso -게 해 주다', lines: [['', '가___ 해 주세요. (permiso)']], options: ['게', '기', '니', '나'], answer: '게', explain: '-게 해 주세요 para permiso.'}]}, {id: 'level-2', title: 'Causativa en contexto', tag: 'Causativa', intro: 'Completa causativas.', type: 'guidedText', scene: 'Descripción de acciones causadas.', text: '선생님이 학생들을 공부___ 해요. 아버지가 나를 읽___ 해요. 언니가 나를 가___ 해 줬어요.', blanks: [{options: ['게', '기'], answer: '게', explain: '-게 하다 con estudio.'}, {options: ['게', '기'], answer: '게', explain: '-게 하다 con lectura.'}, {options: ['게', '기'], answer: '게', explain: '-게 해 주다 con permiso.'}]}, {id: 'level-3', title: 'Escritura causativa', tag: 'Causativa', intro: 'Escribe oraciones causativas.', type: 'freeText', scene: 'Acciones causadas.', text: '1. [[0]] (Mi madre me hace estudiar). 2. [[1]] (El profesor hace que los estudiantes lean). 3. [[2]] (Déjame ir, por favor).', blanks: [{answer: '엄마가 나를 공부하게 해요', accepted: ['-게 하다', '공부'], explain: '사동사 con estudio.'}, {answer: '선생님이 학생들을 읽게 해요', accepted: ['-게 하다', '읽'], explain: '사동사 con lectura.'}, {answer: '가게 해 주세요', accepted: ['-게 해 주다', '가'], explain: '-게 해 주다 para permiso.'}]}, {id: 'level-4', title: 'Análise de causativa', tag: 'Análise', intro: 'Explica causación.', type: 'write', items: [{scene: 'Causativa vs activa', prompt: '"나는 먹어요" vs "엄마가 나를 먹게 해요": ¿cuál expresa causación?', answer: '"엄마가 나를 먹게 해요" expresa causación: la mamá hace que yo coma (ella causa la acción). "나는 먹어요" es activa: yo como (acción propia). 사동사 enfatiza que alguien causa que otro haga algo.', accepted: ['원인', '타인', '사동'], explain: '사동사 expresa causación por tercero.'}]}]},
}

export default topic
