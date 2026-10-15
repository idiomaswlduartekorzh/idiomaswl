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
  description: '-(으)면서 expresa que el mismo sujeto realiza dos acciones al mismo tiempo: «mientras hace X, hace Y». La forma depende de la consonante final de la raíz y contrasta con -는 동안, que también admite sujetos distintos. Es fundamental para describir actividades paralelas en B1.',
  lead: 'Domina -으면서 para expresar acciones simultáneas: "mientras..., a la vez..."',
  outcomes: ['Forma acciones simultáneas con -으면서', 'Expresa paralelismo temporal', 'Usa en narrativa de acciones concurrentes', 'Distingues de -자마자 (inmediato) y -고 나서 (después)'],
  guide: {
    goal: 'Expresar que dos acciones ocurren al mismo tiempo.',
    model: '걸으면서 음악을 들어요. 공부하면서 밥을 먹어요. (Escucho música mientras camino. Como mientras estudio.)',
    formula: 'raíz con vocal/ㄹ + -면서 | raíz con consonante + -으면서',
    decisions: ['Vocal o ㄹ final: 가다→가면서, 만들다→만들면서', 'Consonante final: 먹다→먹으면서', 'Irregular ㄷ: 걷다→걸으면서, 듣다→들으면서', 'Las dos acciones suelen compartir el mismo sujeto', 'Para sujetos diferentes, usa normalmente -는 동안'],
    table: [['Final de la raíz', 'Forma', 'Ejemplo'], ['vocal o ㄹ', '-면서', '일하다→일하면서'], ['consonante', '-으면서', '먹다→먹으면서'], ['ㄷ irregular', 'ㄷ→ㄹ + -으면서', '걷다→걸으면서']],
    mistakes: ['"걷으면서" ❌ → "걸으면서" ✓ por la irregularidad ㄷ.', 'No uses -(으)면서 para dos sujetos distintos; elige -는 동안.', 'No confundas -(으)면서 con -자마자: una expresa simultaneidad y la otra sucesión inmediata.'],
  },
  seo: [
    {heading: '¿Qué es -으면서?', paragraphs: ['-으면서 expresa paralelismo temporal: dos acciones ocurren juntas. Es muy común en coreano cotidiano.', 'Se usa en narración para describir lo que sucede simultáneamente: mientras haces una cosa, haces otra.']},
    {heading: '¿Cómo se usa -(으)면서 en el día a día?', paragraphs: ['Comer mientras estudia: "공부하면서 밥을 먹어요". Escuchar música caminando: "걸으면서 음악을 들어요".', 'Muy natural en descripción de actividades diarias con múltiples tareas.']},
    {heading: '¿Cuál es la diferencia entre -(으)면서 y -는 동안?', paragraphs: ['-(으)면서 exige el MISMO sujeto en las dos acciones simultáneas: 음악을 들으면서 공부해요 (estudio mientras escucho música, yo hago ambas). -는 동안 admite sujetos distintos y expresa un periodo de duración: 제가 자는 동안 동생이 청소했어요 (mientras yo dormía, mi hermano limpió).', 'Regla clave para el hispanohablante: si el "mientras" tiene un solo sujeto haciendo dos cosas a la vez, usa -(으)면서; si son dos personas o quieres marcar una duración, usa -는 동안.']},
  ],
  visual: {mode: 'scene', teacherLens: '-(으)면서: un mismo sujeto realiza dos acciones simultáneas.', graphicPrompt: 'Tabla de selección y contraste con -는 동안.', scene: [['걸으면서 음악을 들어요.', 'Escucho música mientras camino.'], ['공부하면서 밥을 먹어요.', 'Como mientras estudio.'], ['커피를 마시면서 친구와 이야기했어요.', 'Hablé con un amigo mientras tomaba café.'], ['요리하면서 라디오를 들어요.', 'Escucho la radio mientras cocino.'], ['웃으면서 인사했어요.', 'Saludó mientras sonreía.'], ['지하철을 타고 가면서 책을 읽었어요.', 'Leí un libro mientras viajaba en metro.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['동시성', '같은 주어', '-는 동안 대비']},
  practice: {levels: [{id: 'level-1', title: 'Forma -으면서', tag: 'Opción múltiple', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -으면서', lines: [['', '걸으___ 음악을 들어요.']], options: ['면서', '면', '자마자', '고 나서'], answer: '면서', explain: '걷다 → 걸으면서.'}]}, {id: 'level-2', title: 'Simultaneidad en contexto', tag: 'Simultaneidad', intro: 'Completa acciones simultáneas.', type: 'guidedText', scene: 'Descripción de actividades paralelas.', text: '공부하[[0]] 음악을 들어요. 밥을 먹[[1]] 영화를 봐요.', blanks: [{options: ['면서', '고 나서'], answer: '면서', explain: '-으면서 para simultáneo.'}, {options: ['으면서', '고 나서'], answer: '으면서', explain: '먹다 termina en consonante: 먹으면서.'}]}, {id: 'level-3', title: 'Escritura de acciones simultáneas', tag: 'Narrativa', intro: 'Describe lo que haces a la vez.', type: 'freeText', scene: 'Mis actividades paralelas.', text: '1. [[0]] (Escucho música mientras trabajo).', blanks: [{answer: '일하면서 음악을 들어요', accepted: ['-으면서'], explain: '-으면서 con actividades paralelas.'}]}, {id: 'level-4', title: 'Análisis de -으면서', tag: 'Análisis', intro: 'Explica paralelismo.', type: 'write', items: [{scene: 'Paralelismo', prompt: '"-으면서"는 정확히 무엇을 표현합니까?', answer: 'Expresa que dos acciones ocurren al mismo tiempo sin relación de causa-efecto, solo paralelismo temporal.', accepted: ['동시성', '병렬'], explain: '-으면서 es paralelismo sin relación causal.'}]}]},
}

export default topic
