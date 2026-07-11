import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'proposito-dorok-b1',
  order: '19',
  color: '#c60c30',
  category: 'Propósito y Grado',
  level: 'B1',
  title: '-도록: Propósito y Grado en Coreano B1',
  shortTitle: '-도록 (para que, de modo que)',
  metaTitle: '-도록 en Coreano B1 — Expresar Propósito',
  description: '-도록 expresa propósito o grado de cambio: "para que", "de modo que", "hasta el punto de". Literal: "-도" (también/grado) + "-록" (cómo). Muy versátil: propósito explícito, grado de cambio, resultado deseado. Fundamental para narrativa de metas en B1.',
  lead: 'Domina -도록 para expresar propósito: "para que..., de modo que..."',
  outcomes: ['Forma propósito con -도록', 'Expresa grado de cambio y resultado', 'Usa en narrativa de metas y objetivos', 'Distingues -도록 de -으려고 (intención) y -기 위해 (propósito formal)'],
  guide: {
    goal: 'Expresar propósito, intención de cambio, o grado alcanzado.',
    model: '공부하도록 노력해요. 헷갈리지 않도록 조심해요. (Me esfuerzo para estudiar. Ten cuidado para no confundirte.)',
    formula: '동사 + -도록',
    decisions: ['--도록: propósito, grado de cambio', '-으려고: intención personal (более внутренняя)', '-기 위해: propósito formal (más fuerte)', 'Con sujeto diferente: "-도록 하다" (asegurar que X pase)', 'Negación: "-지 않도록" (para que no)'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-도록', 'Propósito, grado', '공부하도록 해요 → hago para estudiar'], ['-으려고', 'Intención', '공부하려고 해요 → intento estudiar'], ['-기 위해', 'Propósito formal', '공부하기 위해 노력해요 → me esfuerzo para estudiar (formal)']],
    mistakes: ['-도록 vs -기 위해: -도록 es más natural; -기 위해 es más formal.', '"-도록" no lleva objeto directo como -으려고.'],
  },
  seo: [
    {heading: '¿Qué es -도록?', paragraphs: ['-도록 expresa propósito: "para que X ocurra" o grado de cambio: "hasta el punto de X". Es muy versátil y natural en coreano.', 'Se usa en narrativa de metas, instrucciones de cuidado, expresión de resultados deseados.']},
    {heading: '-도록 en contextos de propósito', paragraphs: ['"공부하도록 해요" (me esfuerzo para estudiar). "시간을 지키도록 조심해요" (ten cuidado para ser puntual).', 'Muy natural en instrucciones y consejos.']},
    {heading: '-도록 con grado de cambio', paragraphs: ['"많이 먹도록" (comer mucho = hasta el punto de comer mucho, de modo que). "피곤하도록 일해요" (trabajo de modo que me canso mucho).', 'Enfatiza el grado o resultado del cambio.']},
    {heading: '-도록 vs -으려고 (propósito vs intención)', paragraphs: ['-도록: "공부하도록 해요" (esfuerzo para que X ocurra — más objetivo). -으려고: "공부하려고 해요" (intento de estudiar — más personal).', '-도록 enfatiza logro; -으려고 enfatiza intención personal.']},
    {heading: '-도록 vs -기 위해 (propósito natural vs formal)', paragraphs: ['-도록: "공부하도록 노력해요" (esfuerzo para estudiar — natural). -기 위해: "공부하기 위해 노력해요" (me esfuerzo para estudiar — formal).', '-도록 es conversacional; -기 위해 es académico/formal.']},
  ],
  visual: {mode: 'scene', teacherLens: '-도록: propósito y grado vs -으려고 (intención)', graphicPrompt: 'Tabla: -도록 (propósito) vs -으려고 (intención). Ejemplos.', scene: [['공부하도록 해요.', 'Me esfuerzo para estudiar.'], ['헷갈리지 않도록 조심해요.', 'Ten cuidado para no confundirte.'], ['성공하도록 노력해요.', 'Me esfuerzo para tener éxito.'], ['건강하도록 운동해요.', 'Hago ejercicio para estar saludable.'], ['늦지 않도록 서둘러요.', 'Me apuro para no llegar tarde.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['목적', '노력', '정도']},
  practice: {levels: [{id: 'level-1', title: 'Forma -도록', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -도록', lines: [['', '공부하___ 해요.']], options: ['도록', '으려고', '기 위해', '-고'], answer: '도록', explain: '공부하다 → 공부하도록 해요 (propósito).'}, {scene: '-도록 con negación', lines: [['', '헷갈리지 않___ 조심해요.']], options: ['도록', '으려고', '기 위해', '고'], answer: '도록', explain: '-지 않도록 para evitar.'}]}, {id: 'level-2', title: 'Propósito en contexto', tag: 'Propósito', intro: 'Completa con propósito.', type: 'guidedText', scene: 'Descripción de metas y cuidados.', text: '성공하___ 노력해요. 건강하___ 운동해요. 늦지 않___ 서둘러요.', blanks: [{options: ['도록', '으려고'], answer: '도록', explain: '-도록 con éxito.'}, {options: ['도록', '으려고'], answer: '도록', explain: '-도록 con salud.'}, {options: ['도록', '으려고'], answer: '도록', explain: '-도록 con puntualidad.'}]}, {id: 'level-3', title: 'Escritura de propósito', tag: 'Propósito', intro: 'Escribe oraciones de propósito.', type: 'freeText', scene: 'Mis metas y esfuerzos.', text: '1. [[0]] (Me esfuerzo para estudiar bien). 2. [[1]] (Tengo cuidado para no llegar tarde). 3. [[2]] (Hago ejercicio para estar saludable).', blanks: [{answer: '잘 공부하도록 노력해요', accepted: ['-도록', '노력'], explain: '-도록 con estudio.'}, {answer: '늦지 않도록 조심해요', accepted: ['-도록', '조심'], explain: '-도록 con puntualidad.'}, {answer: '건강하도록 운동해요', accepted: ['-도록', '운동'], explain: '-도록 con salud.'}]}, {id: 'level-4', title: 'Análise de propósito', tag: 'Análise', intro: 'Explica diferencia de propósito.', type: 'write', items: [{scene: 'Propósito natural vs formal', prompt: '"공부하도록 해요" vs "공부하기 위해 해요": ¿cuál es más natural?', answer: '"공부하도록 해요" es más natural y conversacional. "공부하기 위해 해요" es más formal y académico. -도록 es la forma coreana natural para expresar propósito; -기 위해 es la forma más formal que imita la estructura académica.', accepted: ['목적', '자연스러움', '형식'], explain: '-도록 es natural; -기 위해 es formal.'}]}]},
}

export default topic
