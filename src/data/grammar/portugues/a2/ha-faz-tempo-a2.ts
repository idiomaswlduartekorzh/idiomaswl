import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'ha-faz-tempo-a2',
  order: '08',
  color: '#166534',
  category: 'Gramática',
  level: 'A2',
  title: 'Há / Faz + Tempo em Português A2',
  shortTitle: 'Há / faz + tempo',
  metaTitle: 'Há e faz + tempo português A2 — expressar duração e tempo decorrido',
  description:
    'Para expresar el tiempo que lleva ocurriendo algo o que ha transcurrido desde un evento, el portugués usa "há" o "faz" seguido de una expresión de tiempo. "Há três anos que moro aqui." / "Faz dois meses que não te vejo." Ambas formas son equivalentes y de uso cotidiano en Brasil.',
  lead: '"Há" y "faz" expresan duración o tiempo transcurrido. "Há dois anos que estudo português" = llevo dos años estudiando portugués. "Faz uma semana que não chove" = hace una semana que no llueve.',
  outcomes: [
    'Usa "há + tiempo + que" para indicar duración de una acción continua',
    'Usa "faz + tiempo + que" como alternativa coloquial',
    'Forma preguntas con "há quanto tempo?" y "faz quanto tempo?"',
    'Distingue "há" (duración) de "há" (existencia: hay)',
  ],

  guide: {
    goal: 'Expresar duración y tiempo transcurrido en portugués usando há y faz con expresiones de tiempo.',
    model: 'Há três anos que moro aqui. / Faz dois meses que não te vejo. / Há quanto tempo você estuda?',
    formula: 'Há/Faz + expresión de tiempo + que + verbo en presente/presente neg.',
    decisions: [
      '"Há + tiempo + que + verbo presente": acción que empezó en el pasado y continúa. "Há cinco anos que trabalho aqui."',
      '"Faz + tiempo + que + verbo presente": mismo significado, más coloquial en Brasil. "Faz cinco anos que trabalho aqui."',
      'Para pregunta: "Há quanto tempo você mora aqui?" / "Faz quanto tempo que você não fala com ela?"',
      '"Há" también significa "hay" (existencia). El contexto diferencia: "Há leite na geladeira" (hay leche) vs "Há dois anos que..." (hace dos años que...).',
      'La respuesta puede omitir "que": "Moro aqui há dois anos." / "Não te vejo há um mês."',
    ],
    table: [
      ['Estructura', 'Ejemplo', 'Traducción'],
      ['Há + tiempo + que + pres.', 'Há dois anos que estudo.', 'Hace dos años que estudio.'],
      ['Faz + tiempo + que + pres.', 'Faz dois anos que estudo.', 'Hace dos años que estudio.'],
      ['Verbo + há + tiempo', 'Estudo português há dois anos.', 'Estudio portugués hace dos años.'],
      ['Há quanto tempo + que?', 'Há quanto tempo você mora aqui?', '¿Hace cuánto tiempo vives aquí?'],
      ['Faz quanto tempo + que?', 'Faz quanto tempo que você não come?', '¿Cuánto tiempo hace que no comes?'],
    ],
    mistakes: [
      '"Tem dois anos que moro aqui" es una variante regional brasileña muy común pero poco formal. Prefiere "Há" o "Faz" en contextos formales.',
      '"Há" no cambia en número: siempre "há", nunca "hão". "Há dois anos" ✓ / "Hão dois anos" ✗.',
      'No confundir "Há um banco aqui" (existencia: hay un banco) con "Há dois anos que..." (duración: hace dos años que...).',
      '"Faz dois anos que estudei" ✗ → Usa presente: "Faz dois anos que estudo" si la acción continúa.',
    ],
  },

  seo: [
    {
      heading: 'Expresar duración en portugués: há y faz',
      paragraphs: [
        'En portugués existen dos formas principales para expresar el tiempo que lleva transcurriendo una acción: "há" y "faz". Ambas son equivalentes en significado y corresponden al español "hace + tiempo + que". La diferencia es de registro: "há" es más formal y usada en escritura, mientras "faz" es muy frecuente en el habla cotidiana brasileña.',
        'La estructura básica es: Há/Faz + expresión de tiempo + que + verbo en presente. Si la acción es negativa (no ha ocurrido): Há/Faz + tiempo + que + não + verbo en presente. Ejemplo: "Faz três semanas que não saio de casa" (hace tres semanas que no salgo de casa).',
      ],
    },
    {
      heading: 'Diferencia entre há (duración) y há (existencia)',
      paragraphs: [
        'El verbo "haver" tiene dos funciones principales en portugués. Como indicador de existencia es equivalente al "hay" del español: "Há um supermercado perto daqui" (Hay un supermercado cerca de aquí). Como indicador de tiempo transcurrido se usa con expresión de duración: "Há dois anos que moro no Brasil" (Hace dos años que vivo en Brasil).',
        'Para distinguirlas en la lectura, observa la estructura: si "há" va seguido de una expresión de tiempo (horas, dias, meses, anos), indica duración. Si "há" va seguido de un sustantivo o artículo, indica existencia.',
      ],
    },
    {
      heading: 'Preguntas con há quanto tempo y faz quanto tempo',
      paragraphs: [
        'Para preguntar cuánto tiempo lleva algo ocurriendo se usan: "Há quanto tempo você estuda português?" o "Faz quanto tempo que você mora aqui?" La respuesta puede seguir la misma estructura o usar la inversión: "Estudo português há seis meses" / "Moro aqui faz dois anos".',
        'En el habla coloquial brasileña, es también muy común escuchar "Tem quanto tempo que você mora aqui?" con el verbo "ter" en lugar de "haver". Esta variante es gramaticalmente aceptada en el habla informal, aunque en contextos formales se prefiere "há" o "faz".',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a expresar el tiempo transcurrido usando há y faz.',
    graphicPrompt: 'Línea de tiempo mostrando el inicio de acciones que continúan en el presente.',
    scene: [
      ['Há dois anos que moro no Brasil.', 'Hace dos años que vivo en Brasil.'],
      ['Faz três meses que não chove.', 'Hace tres meses que no llueve.'],
      ['Há quanto tempo você estuda português?', '¿Hace cuánto tiempo estudias portugués?'],
      ['Moro aqui há cinco anos.', 'Vivo aquí hace cinco años.'],
      ['Faz uma semana que não te vejo.', 'Hace una semana que no te veo.'],
      ['Há dez anos que ele trabalha nessa empresa.', 'Hace diez años que trabaja en esa empresa.'],
      ['Faz quanto tempo que você não come pizza?', '¿Cuánto tiempo hace que no comes pizza?'],
      ['Há seis meses que estudo japonês.', 'Hace seis meses que estudio japonés.'],
    ],
    learnerModes: ['duración: há/faz + tiempo + que', 'preguntas: há quanto tempo', 'inversión: verbo + há + tiempo'],
    reviewFocus: ['há vs faz', 'há (duración) vs há (existencia)', 'estructura com que', 'pregunta há quanto tempo'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige la estructura correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta para expresar duración o tiempo transcurrido.',
        type: 'choice',
        items: [
          {
            scene: 'El trabajo',
            lines: [['Ana', '___ cinco anos que trabalho nessa empresa.']],
            options: ['Há', 'Tem', 'Está', 'Fui'],
            answer: 'Há',
            explain: '"Há + tiempo + que + verbo presente" para duración: "Há cinco anos que trabalho."',
          },
          {
            scene: 'La lluvia',
            lines: [['Carlos', '___ três semanas que não chove aqui.']],
            options: ['Faz', 'Tem', 'Está', 'Fez'],
            answer: 'Faz',
            explain: '"Faz + tiempo + que + verbo" para duración: "Faz três semanas que não chove."',
          },
          {
            scene: 'La pregunta',
            lines: [['Pedro', '___ você mora nessa cidade?']],
            options: ['Há quanto tempo que', 'Quanto tempo', 'Faz que tempo', 'Tem que'],
            answer: 'Há quanto tempo que',
            explain: 'Pregunta de duración: "Há quanto tempo que você mora...?" o "Há quanto tempo você mora...?"',
          },
          {
            scene: 'El amigo',
            lines: [['Maria', 'Faz dois meses que ___ ele.']],
            options: ['não vejo', 'não vi', 'não veria', 'não via'],
            answer: 'não vejo',
            explain: 'Con faz + tiempo + que, el verbo va en presente: "não vejo" (no veo).',
          },
          {
            scene: 'La existencia',
            lines: [['David', '___ uma farmácia perto daqui.']],
            options: ['Há', 'Faz', 'Tem', 'Está'],
            answer: 'Há',
            explain: '"Há + sustantivo" = hay (existencia). "Há uma farmácia" = hay una farmacia.',
          },
          {
            scene: 'El estudio',
            lines: [['Zhanna', 'Eu estudo português ___ um ano.']],
            options: ['há', 'faz', 'desde', 'por'],
            answer: 'há',
            explain: 'Inversión: verbo + há + expresión de tiempo. "Estudo português há um ano."',
          },
          {
            scene: 'La relación',
            lines: [['Lina', 'Eles são casados ___ dez anos.']],
            options: ['há', 'faz', 'desde', 'por'],
            answer: 'há',
            explain: '"São casados há dez anos" = llevan diez años casados. Inversión con há.',
          },
          {
            scene: 'El tiempo',
            lines: [['Sofia', 'Você não me liga ___!']],
            options: ['há muito tempo', 'faz muito', 'tem muito', 'demorou muito'],
            answer: 'há muito tempo',
            explain: '"Há muito tempo" = hace mucho tiempo. Expresión de duración al final.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos expresiones de tiempo',
        tag: '2 espacios',
        intro: 'Completa las oraciones con "há", "faz" u otra expresión de tiempo adecuada.',
        type: 'dual',
        items: [
          {
            scene: 'Los amigos',
            lines: [['Ana', 'Nós somos amigos [[0]] dez anos. [[1]] muito tempo que não nos vemos pessoalmente.']],
            blanks: [
              { options: ['há', 'faz', 'desde'], answer: 'há', explain: '"Há + tiempo" en inversión: somos amigos há dez anos.' },
              { options: ['Faz', 'Há', 'Tem'], answer: 'Faz', explain: '"Faz + tiempo + que" para duración: Faz muito tempo que...' },
            ],
          },
          {
            scene: 'El trabajo',
            lines: [['Carlos', '[[0]] três meses que comecei o novo emprego e [[1]] quanto tempo você trabalha aqui?']],
            blanks: [
              { options: ['Faz', 'Há', 'Tem'], answer: 'Faz', explain: '"Faz + tiempo + que" para hablar de duración.' },
              { options: ['há', 'faz', 'tem'], answer: 'há', explain: 'Pregunta: "há quanto tempo" (¿cuánto tiempo hace?).' },
            ],
          },
          {
            scene: 'La ciudad',
            lines: [['Pedro', '[[0]] cinco anos que moro nessa cidade. Antes [[1]] em outro bairro [[2]] dois anos.']],
            blanks: [
              { options: ['Há', 'Faz', 'Tem'], answer: 'Há', explain: '"Há + tiempo + que + presente" para acción continua.' },
              { options: ['morava', 'morei', 'moro'], answer: 'morava', explain: 'En pasado: "morava em outro bairro" (vivía en otro barrio).' },
            ],
          },
          {
            scene: 'El contacto',
            lines: [['Maria', '[[0]] seis meses que não vejo minha família. Eles moram [[1]] longe.']],
            blanks: [
              { options: ['Faz', 'Há', 'Tem'], answer: 'Faz', explain: '"Faz + tiempo + que + negación" para tiempo sin contacto.' },
              { options: ['há', 'faz', 'muito'], answer: 'há', explain: '"Moram há muito tempo" o simplemente "há longe" aquí: vivem tão longe.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'La historia de la empresa',
        tag: 'Texto guiado',
        intro: 'Elige "há", "faz" u otra forma correcta para completar el texto.',
        type: 'guidedText',
        scene: 'Historia de una empresa familiar brasileña',
        text: 'A nossa empresa existe [[0]] vinte anos. [[1]] dez anos que expandimos para outros estados. O dono trabalha nessa área [[2]] trinta anos. [[3]] quanto tempo você trabalha aqui? Eu trabalho aqui [[4]] três anos.',
        blanks: [
          { options: ['há', 'faz', 'desde'], answer: 'há', explain: '"Há + tiempo": a empresa existe há vinte anos.' },
          { options: ['Faz', 'Há', 'Tem'], answer: 'Faz', explain: '"Faz + tiempo + que" para duración continua.' },
          { options: ['há', 'faz', 'desde'], answer: 'há', explain: '"Trabalha há trinta anos": inversión verbo + há + tiempo.' },
          { options: ['Há', 'Faz', 'Tem'], answer: 'Há', explain: 'Pregunta: "Há quanto tempo você trabalha?" (¿Cuánto tiempo llevas trabajando?).' },
          { options: ['há', 'faz', 'desde'], answer: 'há', explain: '"Trabalho aqui há três anos": inversión verbo + há + tiempo.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Completa con há o faz',
        tag: 'Texto libre',
        intro: 'Escribe "há" o "faz" para completar correctamente cada oración.',
        type: 'freeText',
        scene: 'Conversación sobre el tiempo en una mudanza',
        text: '[[0]] dois anos que me mudei para São Paulo. Conheço meu vizinho [[1]] um ano. [[2]] três meses que não fui à academia. Trabalho nessa empresa [[3]] seis meses. [[4]] quanto tempo você mora nesse apartamento?',
        blanks: [
          { answer: 'Faz', explain: '"Faz + tiempo + que" para duración desde el pasado.' },
          { answer: 'há', explain: '"Conheço há um ano" = inversión: verbo + há + tiempo.' },
          { answer: 'Faz', explain: '"Faz + tiempo + que + não" para ausencia de actividad.' },
          { answer: 'há', explain: '"Trabalho há seis meses" = inversión: verbo + há + tiempo.' },
          { answer: 'Há', explain: '"Há quanto tempo" para preguntar duración.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Forma oraciones con há/faz',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa expresando la duración indicada.',
        type: 'write',
        items: [
          {
            scene: 'El portugués',
            prompt: 'Escribe: Hace seis meses que estudio portugués. → ___ seis meses que estudo português.',
            answer: 'Há seis meses que estudo português.',
            accepted: ['há seis meses que estudo português', 'faz seis meses que estudo português'],
            explain: '"Há/Faz + tiempo + que + verbo en presente" para duración continua.',
          },
          {
            scene: 'La ciudad',
            prompt: 'Escribe: Vivo en esta ciudad hace tres años. → Moro nessa cidade ___.',
            answer: 'Moro nessa cidade há três anos.',
            accepted: ['moro nessa cidade há três anos', 'moro nessa cidade faz três anos'],
            explain: 'Inversión: verbo + há + tiempo. "Moro nessa cidade há três anos."',
          },
          {
            scene: 'La pregunta',
            prompt: 'Escribe la pregunta: ¿Cuánto tiempo hace que no comes carne? → ___ que você não come carne?',
            answer: 'Há quanto tempo que você não come carne?',
            accepted: ['há quanto tempo que você não come', 'faz quanto tempo que você não come', 'há quanto tempo você não come'],
            explain: '"Há/Faz quanto tempo que + sujeto + não + verbo?"',
          },
          {
            scene: 'El no contacto',
            prompt: 'Escribe: Hace dos semanas que no nos vemos. → ___ duas semanas que não ___ vemos.',
            answer: 'Faz duas semanas que não nos vemos.',
            accepted: ['faz duas semanas que não nos vemos', 'há duas semanas que não nos vemos'],
            explain: '"Faz/Há + tiempo + que + não + verbo en presente."',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Habla de tu propia duración',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones verdaderas sobre tu vida usando há/faz + tiempo.',
        type: 'write',
        items: [
          {
            scene: 'Tu aprendizaje',
            prompt: 'Escribe cuánto tiempo llevas estudiando portugués u otro idioma.',
            answer: 'Há seis meses que estudo português. Faz um ano que aprendo inglês também.',
            accepted: ['há', 'faz', 'estudo', 'aprendo', 'que estudo', 'que aprendo'],
            explain: 'Usa: "Há/Faz X meses/anos que estudo/aprendo..."',
          },
          {
            scene: 'Tu ciudad',
            prompt: 'Escribe cuánto tiempo llevas viviendo donde vives ahora.',
            answer: 'Moro nessa cidade há cinco anos. Faz três anos que moro nesse apartamento.',
            accepted: ['há', 'faz', 'moro', 'vivo', 'que moro', 'que vivo'],
            explain: 'Usa: "Moro aqui há X anos" o "Faz X anos que moro aqui."',
          },
          {
            scene: 'Sin contacto',
            prompt: 'Escribe cuánto tiempo hace que no ves a alguien o no haces algo.',
            answer: 'Faz dois meses que não vejo minha família. Há uma semana que não como chocolate.',
            accepted: ['faz', 'há', 'que não', 'não vejo', 'não como', 'não falo'],
            explain: 'Usa: "Faz/Há X tempo que não + verbo en presente."',
          },
        ],
      },
    ],
  },
}

export default topic
