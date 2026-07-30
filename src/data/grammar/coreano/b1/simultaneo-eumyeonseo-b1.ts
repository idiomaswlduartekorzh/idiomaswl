import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'simultaneo-eumyeonseo-b1',
  order: '14',
  color: '#c60c30',
  category: 'Simultaneidad',
  level: 'B1',
  title: '-으면서: Simultaneidad en Coreano B1',
  shortTitle: '-으면서 (mientras, a la vez)',
  metaTitle: '-으면서 en Coreano B1 — Acciones Simultáneas',
  description: '-으면서 expresa que dos acciones ocurren al mismo tiempo. "Mientras X, Y." Literal: "-으면" (si) + "-서" (y, así). Diferente del español "mientras" porque es acción paralela, no necesariamente simultánea. Fundamental para narrativa y descripción en B1.',
  lead: 'Domina -으면서 para expresar acciones simultáneas: "mientras..., a la vez..."',
  outcomes: ['Forma acciones simultáneas con -으면서', 'Expresa paralelismo temporal', 'Usa en narrativa de acciones concurrentes', 'Distingues de -자마자 (inmediato) y -고 나서 (después)'],
  guide: {
    goal: 'Expresar que dos acciones ocurren al mismo tiempo.',
    model: '걸으면서 음악을 들어요. 공부하면서 밥을 먹어요. (Escucho música mientras camino. Como mientras estudio.)',
    formula: '동사 + -으면서',
    decisions: ['--으면서: simultaneidad paralela', '같은 주어: 나는 가면서 vs 나는 간다면서 (reportado, diferente)'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['-으면서', 'Simultaneidad', '걷으면서 → mientras camino']],
    mistakes: ['"-으면서" no implica ni causalidad ni orden temporal, solo paralelismo.'],
  },
  seo: [
    {heading: '¿Qué es -으면서?', paragraphs: ['-으면서 expresa paralelismo temporal: dos acciones ocurren juntas. Es muy común en coreano cotidiano.', 'Se usa en narración para describir lo que sucede simultáneamente: mientras haces una cosa, haces otra.']},
    {heading: '¿Cómo se usa -(으)면서 en el día a día?', paragraphs: ['Comer mientras estudia: "공부하면서 밥을 먹어요". Escuchar música caminando: "걸으면서 음악을 들어요".', 'Muy natural en descripción de actividades diarias con múltiples tareas.']},
    {heading: '¿Cuál es la diferencia entre -(으)면서 y -는 동안?', paragraphs: ['-(으)면서 exige el MISMO sujeto en las dos acciones simultáneas: 음악을 들으면서 공부해요 (estudio mientras escucho música, yo hago ambas). -는 동안 admite sujetos distintos y expresa un periodo de duración: 제가 자는 동안 동생이 청소했어요 (mientras yo dormía, mi hermano limpió).', 'Regla clave para el hispanohablante: si el "mientras" tiene un solo sujeto haciendo dos cosas a la vez, usa -(으)면서; si son dos personas o quieres marcar una duración, usa -는 동안.']},
  ],
  visual: {mode: 'scene', teacherLens: '-으면서: simultaneidad de acciones.', graphicPrompt: 'Tabla: -으면서 (simultáneo).', scene: [['걸으면서 음악을 들어요.', 'Escucho música mientras camino.'], ['공부하면서 밥을 먹어요.', 'Como mientras estudio.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['동시성']},
  practice: {levels: [{id: 'level-1', title: 'Forma -으면서', tag: 'Múltipla escolha', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -으면서', lines: [['', '걸으___ 음악을 들어요.']], options: ['면서', '면', '자마자', '고 나서'], answer: '면서', explain: '걷다 → 걸으면서.'}]}, {id: 'level-2', title: 'Simultaneidad en contexto', tag: 'Simultaneidad', intro: 'Completa acciones simultáneas.', type: 'guidedText', scene: 'Descripción de actividades paralelas.', text: '공부하[[0]] 음악을 들어요. 밥을 먹[[1]] 영화를 봐요.', blanks: [{options: ['면서', '고 나서'], answer: '면서', explain: '-으면서 para simultáneo.'}]}, {id: 'level-3', title: 'Escritura de acciones simultáneas', tag: 'Narrativa', intro: 'Describe lo que haces a la vez.', type: 'freeText', scene: 'Mis actividades paralelas.', text: '1. [[0]] (Escucho música mientras trabajo).', blanks: [{answer: '일하면서 음악을 들어요', accepted: ['-으면서'], explain: '-으면서 con actividades paralelas.'}]}, {id: 'level-4', title: 'Análise de -으면서', tag: 'Análise', intro: 'Explica paralelismo.', type: 'write', items: [{scene: 'Paralelismo', prompt: '"-으면서"는 정확히 무엇을 표현합니까?', answer: 'Expresa que dos acciones ocurren al mismo tiempo sin relación de causa-efecto, solo paralelismo temporal.', accepted: ['동시성', '병렬'], explain: '-으면서 es paralelismo sin relación causal.'}]}]},
}

export default topic
