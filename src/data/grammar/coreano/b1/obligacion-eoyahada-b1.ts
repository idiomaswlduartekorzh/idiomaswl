import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'obligacion-eoyahada-b1',
  order: '15',
  color: '#c60c30',
  category: 'Obligación y Necesidad',
  level: 'B1',
  title: '-어야 하다: Obligación y Necesidad en Coreano B1',
  shortTitle: '-어야 하다 (debo, tengo que)',
  metaTitle: '-어야 하다 en Coreano B1 — Expresar Obligación',
  description: '-어야 하다 expresa obligación, necesidad o requisito: "tengo que X", "debo X". Literal: "-어야" (condición) + "하다" (hacer). Diferente de -을/ㄹ 수 있다 (posibilidad). Fundamental para expresar deber, necesidad y requisitos en B1.',
  lead: 'Domina -어야 하다 para expresar obligación: "tengo que..., debo..."',
  outcomes: ['Forma obligación con -어야 하다', 'Expresa necesidad y requisitos', 'Usa en contextos de deber moral y práctico', 'Distingues -어야 하다 de -을/ㄹ 수 있다 (posibilidad)'],
  guide: {
    goal: 'Expresar que algo es obligatorio, necesario o requerido.',
    model: '매일 공부해야 해요. 시험에 합격하려면 노력해야 해요. (Tengo que estudiar cada día. Para aprobar el examen, debo esforzarme.)',
    formula: '동사 + -어야 하다',
    decisions: ['--어야 하다: obligación', '부정: 하면 안 되다 (no debes)', '과거형: 했어야 했어요 (deberías haber hecho)', 'vs -을/ㄹ 수 있다: obligación vs posibilidad'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-어야 하다', 'Obligación', '공부해야 해요 → tengo que estudiar'], ['vs 가능', 'Posibilidad', '공부할 수 있어요 → puedo estudiar']],
    mistakes: ['"-어야" solo, sin "하다" es incompleto.', '"해야 돼요" es informal pero correcto (반말).'],
  },
  seo: [
    {heading: '¿Qué es -어야 하다?', paragraphs: ['-어야 하다 expresa obligación o necesidad: algo que DEBES hacer. "Tengo que", "Debo", "Es necesario que". Muy común en instrucciones, consejos y expresión de deber.', 'Se usa en contextos prácticos (reglas), morales (deber) y académicos (requisitos).']},
    {heading: '-어야 하다 en contextos cotidianos', paragraphs: ['Trabajo: "업무를 끝내야 해요" (tengo que terminar el trabajo).', 'Salud: "약을 먹어야 해요" (tengo que tomar medicina). Escuela: "숙제를 해야 해요" (tengo que hacer la tarea).']},
    {heading: '-어야 하다 vs -을/ㄹ 수 있다', paragraphs: ['-어야 하다: obligatorio, necesario. "시간을 지켜야 해요" (tienes que ser puntual — es obligatorio).', '-을/ㄹ 수 있다: opcional, posible. "늦을 수 있어요" (puedes llegar tarde — es posible pero no obligatorio).']},
    {heading: 'Negación: 하면 안 되다 (prohibición)', paragraphs: ['"담배를 피우면 안 돼요" (no puedes fumar — prohibido). Opuesto a -어야 하다.', '-어야 하다 + "하지 말아야 해요" (no debes X).']},
    {heading: 'Pasado: 했어야 했어요 (deberías haber)', paragraphs: ['"일찍 가야 했어요" (deberías haber ido temprano — no fuiste pero deberías haberlo hecho).', 'Expresa arrepentimiento o crítica de algo que no se hizo pero era obligatorio.']},
  ],
  visual: {mode: 'scene', teacherLens: '-어야 하다: obligación. vs -을/ㄹ 수 있다 (posibilidad)', graphicPrompt: 'Tabla: -어야 하다 (debo) vs -을/ㄹ 수 있다 (puedo)', scene: [['매일 공부해야 해요.', 'Tengo que estudiar cada día.'], ['시간을 지켜야 해요.', 'Tienes que ser puntual.'], ['이 책을 읽어야 해요.', 'Debo leer este libro.'], ['담배를 피우면 안 돼요.', 'No puedes fumar.'], ['일찍 가야 했어요.', 'Deberías haber ido temprano.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['의무', '필요성', '부정']},
  practice: {levels: [{id: 'level-1', title: 'Forma -어야 하다', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -어야 하다', lines: [['', '공부___ 해요. (합격하기 위해)']], options: ['해야', '할 수 있', '하면', '할 때'], answer: '해야', explain: '공부하다 → 공부해야 해요 (obligación).'}, {scene: '-어야 하다 vs posibilidad', lines: [['', '약을 먹___ 해요. (의무)']], options: ['어야', '을/ㄹ 수 있', '할 수 있', '하면'], answer: '어야', explain: '-어야 하다 para obligación.'}]}, {id: 'level-2', title: 'Obligación en contexto', tag: 'Obligación', intro: 'Completa obligaciones.', type: 'guidedText', scene: 'Descripción de tareas obligatorias.', text: '아침 일찍 일어나___ 해요. 숙제를 마치___ 해요. 매일 운동하___ 해요.', blanks: [{options: ['어야', '을 수 있'], answer: '어야', explain: '-어야 하다 para obligación.'}, {options: ['어야', '을 수 있'], answer: '어야', explain: '-어야 하다 con tareas.'}, {options: ['어야', '을 수 있'], answer: '어야', explain: '-어야 하다 con rutina.'}]}, {id: 'level-3', title: 'Escritura de obligación', tag: 'Obligación', intro: 'Escribe obligaciones.', type: 'freeText', scene: 'Mis obligaciones diarias.', text: '1. [[0]] (Debo estudiar coreano). 2. [[1]] (Tengo que llegar a tiempo). 3. [[2]] (Debo hacer ejercicio).', blanks: [{answer: '한국어를 공부해야 해요', accepted: ['-어야', '해요'], explain: '-어야 하다 con estudios.'}, {answer: '시간을 지켜야 해요', accepted: ['-어야', '지키'], explain: '-어야 하다 con puntualidad.'}, {answer: '운동을 해야 해요', accepted: ['-어야', '운동'], explain: '-어야 하다 con ejercicio.'}]}, {id: 'level-4', title: 'Análise de obligación', tag: 'Análise', intro: 'Explica obligación.', type: 'write', items: [{scene: 'Obligación vs posibilidad', prompt: '"-어야 해요" vs "-을/ㄹ 수 있어요": ¿cuál es más fuerte?', answer: '-어야 해요 expresa obligación: algo que DEBES hacer. -을/ㄹ 수 있어요 expresa posibilidad: algo que PUEDES hacer (opcional). -어야 해요 es más fuerte y exigente.', accepted: ['의무', '선택', '강제'], explain: '-어야 하다 es obligatorio; posibilidad es opcional.'}]}]},
}

export default topic
