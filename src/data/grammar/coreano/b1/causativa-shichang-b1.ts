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
  description: '사동사 (voz causativa) expresa que una persona provoca o permite que otra realice una acción. La forma productiva y más transparente es V-게 하다; también existen verbos causativos lexicalizados con -이/-히/-리/-기/-우/-구/-추. Es fundamental para hablar de causación, instrucciones y permiso en B1.',
  lead: 'Domina 사동사 para expresar causación: "hacer que..., dejar que..."',
  outcomes: ['Forma voz causativa con -게 하다 y sufijos', 'Expresa causación y permiso', 'Usa en narrativa de acciones causadas', 'Distingues causativa de activa y pasiva'],
  guide: {
    goal: 'Expresar que alguien hace que otra persona haga algo.',
    model: '엄마가 아이를 먹게 해요. 선생님이 학생들에게 책을 읽게 해요. (La mamá hace que el niño coma. El profesor hace que los estudiantes lean un libro.)',
    formula: 'causante + 이/가 + causatario + 을/를 o 에게 + V-게 하다',
    decisions: ['-게 하다: forma productiva para «hacer que alguien haga»', 'Con un verbo intransitivo, el causatario suele llevar 을/를: 아이를 자게 해요', 'Con un verbo transitivo y su propio objeto, el causatario suele llevar 에게/한테: 학생들에게 책을 읽게 해요', 'Algunos verbos tienen causativas lexicalizadas: 먹이다, 앉히다, 울리다, 깨우다', '-게 해 주다 puede expresar que se permite o facilita una acción'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['N을/를 + V-게 하다', 'hacer que N actúe', '아이를 자게 해요'], ['N에게 + O를 + V-게 하다', 'hacer que N actúe sobre O', '학생들에게 책을 읽게 해요'], ['V-게 해 주다', 'permitir o facilitar', '아이를 놀게 해 줬어요']],
    mistakes: ['No uses 학생들을 읽게 해요 si quieres decir «hacer que los estudiantes lean»: añade el objeto y usa 학생들에게 책을 읽게 해요.', 'No confundas -게 하다 con -고 싶다: una expresa causación y la otra deseo.', 'Los causativos lexicalizados no se pueden predecir siempre; conviene aprenderlos como pares.'],
  },
  seo: [
    {heading: '¿Qué es 사동사 (causativa)?', paragraphs: ['사동사 es la voz causativa coreana: expresa hacer que alguien haga algo. "El padre hace que el hijo estudie" en lugar de "El hijo estudia".', 'Se usa en narrativa, instrucciones y expresión de acciones causadas.']},
    {heading: '¿Cómo se forma la causativa con -게 하다 en coreano?', paragraphs: ['-게 하다 es la forma más común: verbo + -게 하다. 먹다 → 먹게 해요 (hacer que coma).', 'Otros ejemplos: 공부하다 → 공부하게 해요, 읽다 → 읽게 해요.']},
    {heading: '사동사 en narrativa familiar y académica', paragraphs: ['"엄마가 아이를 먹게 해요" (la mamá hace que el niño coma). "선생님이 학생들을 공부하게 해요" (el profesor hace que los estudiantes estudien).', 'Común en instrucciones, historias, descripción de responsabilidades.']},
    {heading: '¿Cómo se marca a quien realiza la acción causada?', paragraphs: ['Con un verbo intransitivo, el causatario suele llevar 을/를: 엄마가 아이를 자게 했어요 (la mamá hizo dormir al niño).', 'Si el verbo causado ya tiene objeto, 에게/한테 evita la ambigüedad: 선생님이 학생들에게 책을 읽게 했어요 (el profesor hizo que los estudiantes leyeran un libro).']},
    {heading: 'Expresión de permiso: -게 해 주다 (dejar que, permitir)', paragraphs: ['"가게 해 주세요" (déjame ir — permiso). -게 해 주다 combina causativa + "dar" para expresar permiso amable.', '"-게 하지 말다" (no dejes que, impide que) expresa prohibición causada.']},
  ],
  visual: {mode: 'scene', teacherLens: '사동사 (causativa): alguien provoca o permite la acción de otra persona.', graphicPrompt: 'Diagrama con causante, causatario, objeto y acción causada.', scene: [['엄마가 아이를 먹게 해요.', 'La mamá hace que el niño coma.'], ['선생님이 학생들에게 책을 읽게 해요.', 'El profesor hace que los estudiantes lean un libro.'], ['아버지가 나를 공부하게 해요.', 'Mi padre me hace estudiar.'], ['언니가 나에게 친구를 만나게 해 줬어요.', 'Mi hermana me permitió conocer a un amigo.'], ['아이들을 밖에서 뛰게 해요.', 'Hago que los niños corran afuera.'], ['아기가 자도록 불을 껐어요.', 'Apagué la luz para que el bebé durmiera.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['causante', 'causatario', '사동 형태']},
  practice: {levels: [{id: 'level-1', title: 'Forma causativa -게 하다', tag: 'Opción múltiple', intro: 'Selecciona forma correcta.', type: 'choice', items: [{scene: 'Verbo + -게 하다', lines: [['', '엄마가 아이를 먹___ 해요.']], options: ['게', '기', '니', '므'], answer: '게', explain: '먹다 → 먹게 해요 (hacer que coma).'}, {scene: 'Causativa con permiso -게 해 주다', lines: [['', '가___ 해 주세요. (permiso)']], options: ['게', '기', '니', '나'], answer: '게', explain: '-게 해 주세요 para pedir permiso.'}]}, {id: 'level-2', title: 'Causativa en contexto', tag: 'Causativa', intro: 'Completa causativas.', type: 'guidedText', scene: 'Descripción de acciones causadas.', text: '선생님이 학생들을 공부[[0]] 해요. 아버지가 나에게 책을 읽[[1]] 해요. 언니가 나를 가[[2]] 해 줬어요.', blanks: [{options: ['게', '기'], answer: '게', explain: '-게 하다 con estudio.'}, {options: ['게', '기'], answer: '게', explain: '나에게 책을 읽게 해요: la persona causada usa 에게 y el libro usa 을/를.'}, {options: ['게', '기'], answer: '게', explain: '-게 해 주다 puede expresar permiso.'}]}, {id: 'level-3', title: 'Escritura causativa', tag: 'Causativa', intro: 'Escribe oraciones causativas.', type: 'freeText', scene: 'Acciones causadas.', text: '1. [[0]] (Mi madre me hace estudiar). 2. [[1]] (El profesor hace que los estudiantes lean un libro). 3. [[2]] (Déjame ir, por favor).', blanks: [{answer: '엄마가 나를 공부하게 해요', accepted: ['-게 하다', '공부'], explain: '사동사 con estudio.'}, {answer: '선생님이 학생들에게 책을 읽게 해요', accepted: ['-게 하다', '학생들에게', '책을'], explain: 'El causatario lleva 에게 y el objeto de 읽다 lleva 을/를.'}, {answer: '가게 해 주세요', accepted: ['-게 해 주다', '가'], explain: '-게 해 주다 para permiso.'}]}, {id: 'level-4', title: 'Análisis de causativa', tag: 'Análisis', intro: 'Explica causación.', type: 'write', items: [{scene: 'Causativa vs activa', prompt: '"나는 먹어요" vs "엄마가 나를 먹게 해요": ¿cuál expresa causación?', answer: '"엄마가 나를 먹게 해요" expresa causación: la mamá hace que yo coma. "나는 먹어요" es activa: yo realizo la acción por cuenta propia.', accepted: ['원인', '타인', '사동'], explain: '사동사 expresa que una persona provoca la acción de otra.'}]}]},
}

export default topic
