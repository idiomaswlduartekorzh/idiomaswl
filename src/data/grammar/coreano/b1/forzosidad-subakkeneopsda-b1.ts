import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'forzosidad-subakkeneopsda-b1',
  order: '16',
  color: '#c60c30',
  category: 'Obligación y Necesidad',
  level: 'B1',
  title: '-수밖에 없다: Sin Alternativa en Coreano B1',
  shortTitle: '-수밖에 없다 (no hay más remedio que)',
  metaTitle: '-수밖에 없다 en Coreano B1 — Expresar Inevitabilidad',
  description: '-수밖에 없다 expresa que algo es inevitable, sin alternativa: "no hay más remedio que", "inevitablemente". Literal: "-ㄹ 수" (poder) + "밖에" (solo, nada más) + "없다" (no hay). Más fuerte que -어야 하다. Fundamental para expresar forzosidad en B1.',
  lead: 'Domina -수밖에 없다 para expresar: "no hay más remedio que..., inevitablemente..."',
  outcomes: ['Forma inevitabilidad con -수밖에 없다', 'Expresa ausencia de alternativa', 'Usa en narrativa de situaciones forzadas', 'Distingues -수밖에 없다 de -어야 하다 (deber vs forzosidad)'],
  guide: {
    goal: 'Expresar que algo no tiene alternativa, es inevitable.',
    model: '돈이 없어서 일할 수밖에 없어요. 상황이 그래서 참을 수밖에 없었어요. (Sin dinero, no hay más remedio que trabajar. La situación no dejó otra opción que aguantar.)',
    formula: '동사 + -ㄹ/을 수밖에 없다',
    decisions: ['--수밖에 없다: sin alternativa', '-어야 하다: obligación pero con opción', '강제적 상황: "-ㄹ 수밖에 없다" expresa fuerza de circunstancia', 'Muy coreano: implica resignación o inevitabilidad'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-수밖에 없다', 'Inevitable, sin alternativa', '참을 수밖에 없어요 → no hay más remedio que aguantar'], ['-어야 하다', 'Obligación', '공부해야 해요 → tengo que estudiar (pero puedo elegir)']],
    mistakes: ['"-을 수 없다" es "poder hacer algo"; "-을 수밖에 없다" es "sin alternativa". Diferencia crucial.', 'No confundas con "-을 수 있다" (posibilidad).'],
  },
  seo: [
    {heading: '¿Qué es -수밖에 없다?', paragraphs: ['-수밖에 없다 expresa que algo es inevitable: "no hay alternativa", "sin remedio". Es más fuerte que -어야 하다.', 'Se usa cuando las circunstancias dejan sin opción: "mi trabajo es duro, no hay más remedio que continuar".']},
    {heading: '¿Cómo se usa -(으)ㄹ 수밖에 없다 en el día a día?', paragraphs: ['Trabajo: "돈이 없으니 일할 수밖에 없어요" (sin dinero, no hay más remedio que trabajar).', 'Familia: "그렇게 할 수밖에 없었어요" (no tuve más opción que hacer eso). Escuela: "시험을 봐야 될 수밖에 없어요" (inevitablemente debo hacer el examen).']},
    {heading: '¿Cuál es la diferencia entre -수밖에 없다 y -어야 하다?', paragraphs: ['-수밖에 없다: "돈이 없어서 일할 수밖에 없어요" (sin dinero = sin alternativa, inevitablemente trabajo).', '-어야 하다: "일해야 해요" (tengo que trabajar — pero puedo elegir no hacerlo). -수밖에 없다 es más fuerte.']},
    {heading: 'Expresión de resignación y inevitabilidad', paragraphs: ['-수밖에 없다 implica resignación: algo que no querías pero es inevitable. "그럴 수밖에" (no hay más remedio) es muy usado en conversación.', 'Narrativa pasada: "그렇게 할 수밖에 없었어요" (no tuve opción, fue inevitable).']},
    {heading: 'Con negación: -을 수밖에 없다 (inevitabilemente) y 밖에 no (nada más que)', paragraphs: ['"밖에 없다" también puede significar "solo/nada más que": "돈이 10만원밖에 없어요" (solo tengo 100K de dinero).', '-수밖에 없다 enfatiza inevitabilidad en contexto de obligación.']},
  ],
  visual: {mode: 'scene', teacherLens: '-수밖에 없다: sin alternativa vs -어야 하다 (deber)', graphicPrompt: 'Tabla: -수밖에 없다 (inevitable) vs -어야 하다 (deber)', scene: [['돈이 없어서 일할 수밖에 없어요.', 'Sin dinero, no hay más remedio que trabajar.'], ['그렇게 할 수밖에 없었어요.', 'No tuve más opción que hacer eso.'], ['시험을 볼 수밖에 없어요.', 'Inevitablemente debo hacer el examen.'], ['참을 수밖에 없어요.', 'No hay más remedio que aguantar.'], ['계속 일할 수밖에 없었어요.', 'No tuve opción pero continuar trabajando.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['필연성', '선택 불가', '포기']},
  practice: {levels: [{id: 'level-1', title: 'Forma -수밖에 없다', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -수밖에 없다', lines: [['', '돈이 없어서 일할 ___ 없어요.']], options: ['수밖에', '수 있', '을 수 있', '어야'], answer: '수밖에', explain: '일하다 → 일할 수밖에 없어요 (sin alternativa).'}, {scene: '-수밖에 없다 vs -어야 하다', lines: [['', '그렇게 할 ___ 없었어요. (forzoso, sin opción)']], options: ['수밖에', '어야', '을 수 있', '한다'], answer: '수밖에', explain: '-수밖에 없다 para inevitabilidad.'}]}, {id: 'level-2', title: 'Inevitabilidad en contexto', tag: 'Forzosidad', intro: 'Completa con inevitabilidad.', type: 'guidedText', scene: 'Descripción de situaciones sin alternativa.', text: '상황이 그래서 받아들일 [[0]] 없어요. 그렇게 진행할 [[1]] 없어요. 계속 기다릴 [[2]] 없었어요.', blanks: [{options: ['수밖에', '어야'], answer: '수밖에', explain: '-수밖에 없다 para aceptar inevitablemente.'}, {options: ['수밖에', '어야'], answer: '수밖에', explain: '-수밖에 없다 con procedimiento.'}, {options: ['수밖에', '어야'], answer: '수밖에', explain: '-수밖에 없다 pasado.'}]}, {id: 'level-3', title: 'Escritura de forzosidad', tag: 'Forzosidad', intro: 'Escribe inevitabilidades.', type: 'freeText', scene: 'Situaciones sin alternativa.', text: '1. [[0]] (Sin dinero, no hay más remedio). 2. [[1]] (No tuve opción en esa situación). 3. [[2]] (Inevitablemente debo continuar).', blanks: [{answer: '돈이 없어서 일할 수밖에 없어요', accepted: ['-수밖에', '없다'], explain: '-수밖에 없다 con trabajo.'}, {answer: '그렇게 할 수밖에 없었어요', accepted: ['-수밖에', '없'], explain: '-수밖에 없다 pasado.'}, {answer: '계속할 수밖에 없어요', accepted: ['-수밖에', '계속'], explain: '-수밖에 없다 con continuación.'}]}, {id: 'level-4', title: 'Análise de forzosidad', tag: 'Análise', intro: 'Explica inevitabilidad.', type: 'write', items: [{scene: 'Forzosidad vs obligación', prompt: '"-수밖에 없다" vs "-어야 해요": ¿por qué es -수밖에 없다 más fuerte?', answer: '-수밖에 없다 significa "sin alternativa", la situación no deja opción. -어야 해요 es obligación pero existe la opción de no hacerlo. -수밖에 없다 expresa resignación e inevitabilidad completa.', accepted: ['선택', '필연', '상황'], explain: '-수밖에 없다 es más forzado que -어야 하다.'}]}]},
}

export default topic
