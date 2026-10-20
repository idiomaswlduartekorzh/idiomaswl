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
  description: '-도록 expresa propósito, resultado buscado o grado: «para que», «de modo que» y «hasta el punto de». Aparece con acciones orientadas a una meta, instrucciones con -도록 하다 y descripciones de intensidad. Es una estructura versátil y frecuente del coreano B1.',
  lead: 'Domina -도록 para expresar propósito: "para que..., de modo que..."',
  outcomes: ['Forma propósito con -도록', 'Expresa grado de cambio y resultado', 'Usa en narrativa de metas y objetivos', 'Distingues -도록 de -으려고 (intención) y -기 위해 (propósito formal)'],
  guide: {
    goal: 'Expresar propósito, intención de cambio, o grado alcanzado.',
    model: '한국어를 잘 말할 수 있도록 매일 연습해요. 헷갈리지 않도록 천천히 읽어요. (Practico cada día para poder hablar bien coreano. Leo despacio para no confundirme.)',
    formula: 'V/A + -도록 + acción orientada al resultado',
    decisions: ['Propósito o resultado buscado: 잘 들리도록 크게 말해 주세요', 'Negación: -지 않도록 = para que no ocurra algo', 'Instrucción o compromiso: -도록 하다 = procurar/asegurarse de hacer', 'Grado o límite: 목이 아프도록 노래했어요 = canté hasta que me dolió la garganta', '-기 위해 suele presentar una finalidad deliberada; -도록 enfoca el resultado que se quiere lograr'],
    table: [['Uso', 'Estructura', 'Ejemplo'], ['propósito', 'V-도록 + acción', '잊지 않도록 메모해요'], ['instrucción', 'V-도록 하다', '내일까지 제출하도록 하세요'], ['grado', 'A/V-도록', '목이 아프도록 노래했어요']],
    mistakes: ['No traduzcas siempre -도록 como «para»: también puede expresar grado o una instrucción.', '"건강하도록 운동해요" suena poco natural; usa "건강해지도록 운동해요".', 'No presentes -도록 y -기 위해 como equivalentes absolutos: el contexto y el foco cambian.'],
  },
  seo: [
    {heading: '¿Qué es -도록?', paragraphs: ['-도록 expresa propósito: "para que X ocurra" o grado de cambio: "hasta el punto de X". Es muy versátil y natural en coreano.', 'Se usa en narrativa de metas, instrucciones de cuidado, expresión de resultados deseados.']},
    {heading: '¿Cómo se usa -도록 para expresar propósito en coreano?', paragraphs: ['"한국어를 잘 말할 수 있도록 매일 연습해요" (practico cada día para poder hablar bien coreano). "늦지 않도록 서둘러요" (me apresuro para no llegar tarde).', 'La cláusula con -도록 presenta el resultado deseado y la oración principal indica la acción que se realiza para alcanzarlo.']},
    {heading: '-도록 para expresar grado o límite', paragraphs: ['"목이 아프도록 노래했어요" significa «canté hasta que me dolió la garganta». Aquí -도록 no introduce propósito, sino el grado alcanzado por la acción.', 'Otros ejemplos son 밤이 새도록 이야기했어요 (hablamos hasta el amanecer) y 눈물이 나도록 웃었어요 (me reí hasta llorar).']},
    {heading: '¿Cómo funciona -도록 하다?', paragraphs: ['-도록 하다 puede dar una instrucción o expresar el compromiso de actuar: 내일까지 제출하도록 하세요 (asegúrese de entregarlo mañana), 앞으로 조심하도록 할게요 (procuraré tener cuidado de ahora en adelante).', 'No equivale simplemente a «intentar»; según el contexto puede sonar a indicación, disposición o compromiso.']},
    {heading: '¿Cuál es la diferencia entre -도록 y -기 위해?', paragraphs: ['-기 위해 presenta una finalidad deliberada: 한국어를 배우기 위해 한국에 갔어요 (fui a Corea para aprender coreano). -도록 suele enfocar un resultado que se quiere conseguir o evitar: 잊지 않도록 메모했어요 (lo anoté para no olvidarlo).', 'Ambas pueden traducirse con «para», pero no son intercambiables en todas las frases.']},
  ],
  visual: {mode: 'scene', teacherLens: '-도록: resultado buscado, instrucción y grado alcanzado.', graphicPrompt: 'Mapa de tres usos: propósito, -도록 하다 y grado/límite.', scene: [['잘 들리도록 크게 말해 주세요.', 'Hable fuerte para que se oiga bien.'], ['헷갈리지 않도록 천천히 읽어요.', 'Leo despacio para no confundirme.'], ['내일까지 제출하도록 하세요.', 'Asegúrese de entregarlo mañana.'], ['건강해지도록 매일 운동해요.', 'Hago ejercicio cada día para mejorar mi salud.'], ['늦지 않도록 서둘러요.', 'Me apresuro para no llegar tarde.'], ['목이 아프도록 노래했어요.', 'Canté hasta que me dolió la garganta.']], learnerModes: ['reading', 'typing', 'choosing'], reviewFocus: ['목적', '-도록 하다', '정도']},
  practice: {levels: [{id: 'level-1', title: 'Forma -도록', tag: 'Opción múltiple', intro: 'Selecciona la forma correcta.', type: 'choice', items: [{scene: 'Resultado buscado', lines: [['', '한국어를 잘하___ 매일 연습해요.']], options: ['도록', '으려고', '기 위해', '고'], answer: '도록', explain: '잘하도록 매일 연습해요: la práctica busca ese resultado.'}, {scene: '-도록 con negación', lines: [['', '헷갈리지 않___ 천천히 읽어요.']], options: ['도록', '으려고', '기 위해', '고'], answer: '도록', explain: '-지 않도록 expresa el resultado que se quiere evitar.'}]}, {id: 'level-2', title: 'Propósito en contexto', tag: 'Propósito', intro: 'Completa con -도록.', type: 'guidedText', scene: 'Descripción de metas y cuidados.', text: '성공할 수 있[[0]] 노력해요. 건강해지[[1]] 운동해요. 늦지 않[[2]] 서둘러요.', blanks: [{options: ['도록', '으려고'], answer: '도록', explain: '성공할 수 있도록 = para poder tener éxito.'}, {options: ['도록', '으려고'], answer: '도록', explain: '건강해지도록 = para ponerse más saludable.'}, {options: ['도록', '으려고'], answer: '도록', explain: '늦지 않도록 = para no llegar tarde.'}]}, {id: 'level-3', title: 'Escritura de propósito', tag: 'Propósito', intro: 'Escribe oraciones de propósito.', type: 'freeText', scene: 'Mis metas y esfuerzos.', text: '1. [[0]] (Practico para hablar bien coreano). 2. [[1]] (Me apresuro para no llegar tarde). 3. [[2]] (Hago ejercicio para mejorar mi salud).', blanks: [{answer: '한국어를 잘 말할 수 있도록 연습해요', accepted: ['-도록', '연습'], explain: 'La primera cláusula expresa el resultado buscado.'}, {answer: '늦지 않도록 서둘러요', accepted: ['-도록', '서두르'], explain: '-지 않도록 expresa prevención.'}, {answer: '건강해지도록 운동해요', accepted: ['-도록', '운동'], explain: '건강해지도록 expresa el cambio deseado.'}]}, {id: 'level-4', title: 'Análisis de propósito', tag: 'Análisis', intro: 'Explica la diferencia de enfoque.', type: 'write', items: [{scene: '-도록 vs -기 위해', prompt: 'Compara "잊지 않도록 메모했어요" y "공부하기 위해 도서관에 갔어요".', answer: 'La primera usa -도록 para enfocar un resultado que se quiere evitar: no olvidar. La segunda usa -기 위해 para presentar la finalidad deliberada de ir a la biblioteca: estudiar.', accepted: ['목적', '결과', '위해'], explain: '-도록 enfoca el resultado; -기 위해 presenta una finalidad explícita.'}]}]},
}

export default topic
