import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pasiva-jeosudo-b1',
  order: '17',
  color: '#c60c30',
  category: 'Voz y Perspectiva',
  level: 'B1',
  title: '피동사: Voz Pasiva en Coreano B1',
  shortTitle: '피동사 (ser + participio)',
  metaTitle: '피동사 en Coreano B1 — Voz Pasiva Coreana',
  description: '피동사 (voz pasiva) cambia el enfoque del agente al objeto: "el libro es leído" en lugar de "yo leo el libro". Formación: raíz + -이/히/리/기. Muy diferente del español en que el sujeto recibe la acción. Fundamental para narrativa y descripción neutral en B1.',
  lead: 'Domina 피동사 para expresar pasiva: "ser + participio..."',
  outcomes: ['Forma voz pasiva con -이/히/리/기', 'Expresa acciones enfocadas en objeto', 'Usa en narrativa y descripción neutral', 'Distingues pasiva de activa en contexto'],
  guide: {
    goal: 'Cambiar perspectiva de agente (sujeto activo) a objeto (sujeto pasivo).',
    model: '책이 읽혀요. 손님을 대접해요 → 손님이 대접받아요. (El libro es leído. Atendemos al cliente → El cliente es atendido.)',
    formula: '동사 + -이/히/리/기 (sufijo pasivo)',
    decisions: ['--이: 먹다 → 먹이다 (alimentar como transitivo), 닫다 → 닫혀요 (cerrarse)', '--히: 보이다 (verse), 들리다 (oírse)', '--리: 날리다 (volar—causativo)', '--기: 웃기다 (burlarse), 익히다 (aprender)', 'No todos los verbos tienen forma pasiva; verbos intransitivos no', 'El complemento agente es marcado por "에게" o "에 의해"'],
    table: [['Estructura', 'Significado', 'Ejemplo'], ['피동사', 'Pasiva', '책이 읽혀요 → el libro es leído'], ['vs 능동사', 'Activa', '나는 책을 읽어요 → yo leo el libro']],
    mistakes: ['Confundir "-이" (pasiva) con "-이" (cópula). "-히" y "-리" son menos comunes.', 'No todos los verbos tienen pasiva: "가다" (ir) no tiene pasiva común.'],
  },
  seo: [
    {heading: '¿Qué es 피동사 (pasiva)?', paragraphs: ['피동사 es la voz pasiva coreana: enfoca la acción en el objeto en lugar del agente. "El libro es leído" en lugar de "Yo leo el libro".', 'Se usa en narrativa, descripción neutral y escritura académica/periodística.']},
    {heading: 'Formación con sufijos', paragraphs: ['"-이": 닫다 → 닫혀요 (cerrarse). "-히": 보이다 (verse), 들리다 (oírse). "-리": 말리다 (disuadir), 날리다 (volar).', '"-기": 웃기다 (burlarse), 익히다 (aprender). Algunos verbos tienen múltiples formas.']},
    {heading: '피동사 en narrativa y descripción', paragraphs: ['"책이 출판되었어요" (el libro fue publicado). "학생들이 표를 받았어요" (los estudiantes recibieron premios — más neutral que "nosotros dimos premios").', 'Común en noticias, documentos académicos, descripciones objetivas.']},
    {heading: 'Expresión del agente: -에게 vs -에 의해', paragraphs: ['-에게: más personal, cercano. "엄마에게 혼났어요" (fui regañado por mamá — directo).', '-에 의해: más formal, abstracto. "법에 의해 처벌받았어요" (fue castigado por la ley — formal, no personal).']},
    {heading: 'Verbos que no tienen pasiva común', paragraphs: ['가다 (ir), 오다 (venir), 있다 (haber) raramente usan pasiva.', 'Algunos verbos tienen formas especiales: 듣다 (oír) → 들려요 (sonar, se oye), no "들으려요".']},
  ],
  visual: {mode: 'scene', teacherLens: '피동사 (pasiva): sujeto recibe acción vs 능동사 (activa)', graphicPrompt: 'Tabla: 피동사 (pasiva) vs 능동사 (activa). Ejemplo comparativo.', scene: [['책이 읽혀요.', 'El libro es leído.'], ['학생이 표를 받았어요.', 'El estudiante recibió un premio (pasiva neutral).'], ['엄마에게 혼났어요.', 'Fui regañado por mamá.'], ['밤이 밝혀요.', 'La noche se ilumina.'], ['소문이 퍼졌어요.', 'El rumor se propagó.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['목적어→주어', '피동 형태', '능동 대비']},
  practice: {levels: [{id: 'level-1', title: 'Forma pasiva', tag: 'Múltipla escolha', intro: 'Selecciona pasiva correcta.', type: 'choice', items: [{scene: 'Verbo + pasiva -이/-히/-리/-기', lines: [['', '책이 읽___요. (pasiva de "읽다")']], options: ['혀', '려', '겨', '겨'], answer: '혀', explain: '읽다 → 읽혀요 (ser leído).'}, {scene: 'Pasiva con agente -에게', lines: [['', '엄마___ 혼났어요.']], options: ['에게', '에', '으로', '께'], answer: '에게', explain: '-에게 marca agente personal.'}]}, {id: 'level-2', title: 'Pasiva en contexto', tag: 'Pasiva', intro: 'Completa oraciones pasivas.', type: 'guidedText', scene: 'Descripción con pasiva.', text: '책이 출판___요. 소식이 알려___어요. 학생이 표를 받___어요.', blanks: [{options: ['되', '혀'], answer: '되', explain: '출판하다 → 출판되어요 (pasiva).'}, {options: ['려', '졌'], answer: '졌', explain: '알려지다 → 알려졌어요 (pasiva).'}, {options: ['았', '았'], answer: '았', explain: '받다 → 받았어요 (recibir, pasiva neutral).'}]}, {id: 'level-3', title: 'Escritura pasiva', tag: 'Pasiva', intro: 'Escribe oraciones pasivas.', type: 'freeText', scene: 'Descripción neutra con pasiva.', text: '1. [[0]] (El libro fue publicado). 2. [[1]] (La noche se ilumina). 3. [[2]] (Fui regañado por mi maestro).', blanks: [{answer: '책이 출판되었어요', accepted: ['출판', '-되'], explain: '피동사 con publicación.'}, {answer: '밤이 밝혀요', accepted: ['밝다', '혀'], explain: '피동사 con iluminación.'}, {answer: '선생님에게 혼났어요', accepted: ['혼나다', '-에게'], explain: '피동사 con agente personal.'}]}, {id: 'level-4', title: 'Análise de pasiva', tag: 'Análise', intro: 'Explica diferencia.', type: 'write', items: [{scene: 'Activa vs pasiva', prompt: '"나는 책을 읽어요" vs "책이 읽혀요": ¿cuál es pasiva y por qué?', answer: '"책이 읽혀요" es pasiva: el sujeto "책" (libro) recibe la acción. "나는 책을 읽어요" es activa: el sujeto "나" (yo) realiza la acción. Pasiva enfatiza el objeto afectado.', accepted: ['주어', '동작', '피동'], explain: '피동사 enfatiza objeto; 능동사 enfatiza agente.'}]}]},
}

export default topic
