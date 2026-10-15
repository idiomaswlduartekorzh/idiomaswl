import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'obligacion-eoyahada-b1',
  order: '15',
  color: '#c60c30',
  category: 'Obligación y necesidad',
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
    formula: 'raíz verbal + -아/어야 하다/되다',
    decisions: ['ㅏ/ㅗ → -아야 하다; las demás vocales → -어야 하다; 하다 → 해야 하다', '해야 해요 y 해야 돼요 son variantes corteses muy frecuentes', 'Prohibición: -(으)면 안 되다; obligación negativa: -지 말아야 하다', 'Arrepentimiento: -았/었어야 했다 = debería haber hecho', 'No confundas obligación con posibilidad: -(으)ㄹ 수 있다'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-어야 하다', 'Obligación', '공부해야 해요 → tengo que estudiar'], ['vs 가능', 'Posibilidad', '공부할 수 있어요 → puedo estudiar']],
    mistakes: ['En una oración completa no dejes -아/어야 aislado: añade 하다/되다 o una continuación adecuada.', '"해야 돼요" no es 반말: pertenece al registro cortés 해요체; el informal íntimo es 해야 돼.', '"갔어야 했어요" significa «debería haber ido»; "가야 했어요" significa «tuve que ir».'],
  },
  seo: [
    {heading: '¿Qué es -어야 하다?', paragraphs: ['-어야 하다 expresa obligación o necesidad: algo que DEBES hacer. "Tengo que", "Debo", "Es necesario que". Muy común en instrucciones, consejos y expresión de deber.', 'Se usa en contextos prácticos (reglas), morales (deber) y académicos (requisitos).']},
    {heading: '¿Cómo se usa -어야 하다 en el día a día?', paragraphs: ['Trabajo: "업무를 끝내야 해요" (tengo que terminar el trabajo).', 'Salud: "약을 먹어야 해요" (tengo que tomar medicina). Escuela: "숙제를 해야 해요" (tengo que hacer la tarea).']},
    {heading: '¿Cuál es la diferencia entre -어야 하다 y -(으)ㄹ 수 있다?', paragraphs: ['-어야 하다: obligatorio, necesario. "시간을 지켜야 해요" (tienes que ser puntual — es obligatorio).', '-을/ㄹ 수 있다: opcional, posible. "늦을 수 있어요" (puedes llegar tarde — es posible pero no obligatorio).']},
    {heading: 'Negación: 하면 안 되다 (prohibición)', paragraphs: ['"담배를 피우면 안 돼요" (no puedes fumar — prohibido). Opuesto a -어야 하다.', '-어야 하다 + "하지 말아야 해요" (no debes X).']},
    {heading: 'Pasado: -았/었어야 했어요 (deberías haber)', paragraphs: ['"일찍 갔어야 했어요" significa «deberías haber ido temprano» y sugiere que no ocurrió. En cambio, "일찍 가야 했어요" significa «tuve que ir temprano».', 'La forma -았/었어야 했다 expresa arrepentimiento o crítica sobre una acción que convenía realizar en el pasado.']},
  ],
  visual: {mode: 'scene', teacherLens: '-어야 하다: obligación. vs -을/ㄹ 수 있다 (posibilidad)', graphicPrompt: 'Tabla: -어야 하다 (debo) vs -을/ㄹ 수 있다 (puedo)', scene: [['매일 공부해야 해요.', 'Tengo que estudiar cada día.'], ['시간을 지켜야 해요.', 'Tienes que ser puntual.'], ['이 책을 읽어야 해요.', 'Debo leer este libro.'], ['담배를 피우면 안 돼요.', 'No puedes fumar.'], ['일찍 가야 했어요.', 'Tuve que ir temprano.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['의무', '필요성', '부정']},
  practice: {levels: [{id: 'level-1', title: 'Forma -어야 하다', tag: 'Opción múltiple', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -어야 하다', lines: [['', '공부___ 해요. (합격하기 위해)']], options: ['해야', '할 수 있', '하면', '할 때'], answer: '해야', explain: '공부하다 → 공부해야 해요 (obligación).'}, {scene: '-어야 하다 vs posibilidad', lines: [['', '약을 먹___ 해요. (의무)']], options: ['어야', '을/ㄹ 수 있', '할 수 있', '하면'], answer: '어야', explain: '-어야 하다 para obligación.'}]}, {id: 'level-2', title: 'Obligación en contexto', tag: 'Obligación', intro: 'Completa obligaciones.', type: 'guidedText', scene: 'Descripción de tareas obligatorias.', text: '아침 일찍 [[0]] 해요. 숙제를 [[1]] 해요. 매일 [[2]] 해요.', blanks: [{options: ['일어나야', '일어나면'], answer: '일어나야', explain: '일어나다 → 일어나야 해요.'}, {options: ['마쳐야', '마치면'], answer: '마쳐야', explain: '마치다 → 마쳐야 해요 por contracción de 마치어야.'}, {options: ['운동해야', '운동하면'], answer: '운동해야', explain: '운동하다 → 운동해야 해요.'}]}, {id: 'level-3', title: 'Escritura de obligación', tag: 'Obligación', intro: 'Escribe obligaciones.', type: 'freeText', scene: 'Mis obligaciones diarias.', text: '1. [[0]] (Debo estudiar coreano). 2. [[1]] (Tengo que llegar a tiempo). 3. [[2]] (Debo hacer ejercicio).', blanks: [{answer: '한국어를 공부해야 해요', accepted: ['-어야', '해요'], explain: '-어야 하다 con estudios.'}, {answer: '시간을 지켜야 해요', accepted: ['-어야', '지키'], explain: '-어야 하다 con puntualidad.'}, {answer: '운동을 해야 해요', accepted: ['-어야', '운동'], explain: '-어야 하다 con ejercicio.'}]}, {id: 'level-4', title: 'Análisis de obligación', tag: 'Análisis', intro: 'Explica obligación.', type: 'write', items: [{scene: 'Obligación vs posibilidad', prompt: '"-어야 해요" vs "-을/ㄹ 수 있어요": ¿cuál es más fuerte?', answer: '-어야 해요 expresa obligación: algo que DEBES hacer. -을/ㄹ 수 있어요 expresa posibilidad: algo que PUEDES hacer (opcional). -어야 해요 es más fuerte y exigente.', accepted: ['의무', '선택', '강제'], explain: '-어야 하다 es obligatorio; posibilidad es opcional.'}]}]},
}

export default topic
