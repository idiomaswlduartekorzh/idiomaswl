import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'conjuntivo-imperfeito-b1',
  order: '01',
  color: '#166534',
  category: 'Verbos',
  level: 'B1',
  title: 'Conjuntivo Imperfeito en Portugués B1',
  shortTitle: 'Conjuntivo Imperfeito',
  metaTitle: 'Conjuntivo Imperfeito Portugués B1 — Subjuntivo Imperfecto',
  description:
    'El conjuntivo imperfeito (subjuntivo imperfecto) es indispensable en portugués para expresar condiciones hipotéticas, deseos en el pasado y situaciones irreales. Se forma a partir del pretérito perfeito simple del indicativo y tiene terminaciones propias: -asse, -esse, -isse. A diferencia del español, el portugués europeo lo usa con mucha frecuencia en el habla cotidiana.',
  lead: 'Domina el subjuntivo imperfecto portugués: su formación desde el pretérito, sus terminaciones y sus usos en hipótesis, deseos y cortesía.',
  outcomes: [
    'Forma el conjuntivo imperfeito desde la 3.ª persona del plural del pretérito',
    'Usa -asse, -esse, -isse según la conjugación del verbo',
    'Construye frases condicionales irreales con se + conjuntivo imperfeito',
    'Expresa deseos y peticiones corteses con queria que / gostaria que',
  ],

  guide: {
    goal: 'Usar el conjuntivo imperfeito para expresar hipótesis irreales, deseos en el pasado y condiciones contrarias a la realidad.',
    model: 'Se eu tivesse dinheiro, viajaria para o Brasil. / Queria que viesses mais cedo.',
    formula: '3.ª pl. pretérito → retira -ram → + -sse / -sses / -sse / -ssemos / -sseis / -ssem',
    decisions: [
      'Toma la 3.ª persona del plural del pretérito perfeito: falaram, comeram, partiram',
      'Elimina la terminación -ram: fala-, come-, parti-',
      'Añade las terminaciones del conjuntivo imperfeito: -sse, -sses, -sse, -ssemos, -sseis, -ssem',
      'Verbos irregulares siguen el mismo proceso: fossem → fosse; tivessem → tivesse; dissessem → dissesse',
      'Con "se" (si): expresa condición irreal → Se estudasses mais, terias melhores notas.',
      'Con "como se": comparación irreal → Fala como se soubesse tudo.',
    ],
    table: [
      ['Infinitivo', 'Raíz (3.ª pl. pretérito)', 'Eu / Ele'],
      ['falar', 'fala- (falaram)', 'falasse / falasse'],
      ['comer', 'come- (comeram)', 'comesse / comesse'],
      ['partir', 'parti- (partiram)', 'partisse / partisse'],
      ['ter', 'tive- (tiveram)', 'tivesse / tivesse'],
      ['ser/ir', 'fo- (foram)', 'fosse / fosse'],
    ],
    mistakes: [
      '"Se eu tinha dinheiro" ❌ → "Se eu tivesse dinheiro" ✓ — la cláusula con "se" irreal exige conjuntivo imperfeito, no indicativo.',
      '"Queria que venhas" ❌ → "Queria que viesses" ✓ — el verbo principal en pasado pide conjuntivo imperfeito en la subordinada.',
      '"Se fosse eu" (yo) ❌ (acento) → "Se fosse eu" ✓ — notar que "fosse" es igual para eu y ele/ela; el contexto diferencia.',
    ],
  },

  seo: [
    {
      heading: '¿Qué es el conjuntivo imperfeito y para qué sirve?',
      paragraphs: [
        'El conjuntivo imperfeito corresponde al subjuntivo imperfecto del español (si yo tuviera, si ella fuera). En portugués se usa en tres contextos principales: condiciones irreales con "se", deseos en el pasado con verbos como "querer" y "gostar", y comparaciones hipotéticas con "como se".',
        'Una diferencia importante con el español es que el portugués europeo usa el conjuntivo imperfeito con mucha más frecuencia en el habla cotidiana. Donde en español informal se usaría el condicional, en portugués europeo se prefiere el imperfeito del conjuntivo.',
      ],
    },
    {
      heading: '¿Cómo se forma el conjuntivo imperfeito en portugués?',
      paragraphs: [
        'La regla de oro: toma la 3.ª persona del plural del pretérito perfeito del indicativo (ellos/elas), elimina -ram y añade las terminaciones -sse. Este método funciona con TODOS los verbos, incluso los irregulares.',
        'Ejemplos con irregulares: fazer → fizeram → fize- → fizesse; poder → puderam → pude- → pudesse; querer → quiseram → quise- → quisesse; saber → souberam → soube- → soubesse; vir → vieram → vie- → viesse.',
      ],
      table: [
        ['Persona', 'Terminación', 'falar', 'ter'],
        ['eu', '-sse', 'falasse', 'tivesse'],
        ['tu', '-sses', 'falasses', 'tivesses'],
        ['ele/ela', '-sse', 'falasse', 'tivesse'],
        ['nós', '-ssemos', 'falássemos', 'tivéssemos'],
        ['vós', '-sseis', 'falásseis', 'tivésseis'],
        ['eles/elas', '-ssem', 'falassem', 'tivessem'],
      ],
    },
    {
      heading: '¿Cuándo se usa el conjuntivo imperfeito en portugués?',
      paragraphs: [
        'Condición irreal en el presente o futuro: "Se tivesse tempo, aprenderia japonês." (Si tuviera tiempo, aprendería japonés). La cláusula principal lleva el condicional (-ia) o, en portugués europeo coloquial, el imperfeito do indicativo.',
        'Deseos y peticiones corteses: "Gostaria que me ajudasses." (Me gustaría que me ayudaras). "Queria que fosses ao supermercado." (Quería que fueras al supermercado). Este uso es muy frecuente en portugués europeo para expresar cortesía.',
        'Comparación irreal con "como se": "Ele fala como se soubesse tudo." (Habla como si lo supiera todo). "Tratavam-nos como se fôssemos crianças." (Nos trataban como si fuéramos niños).',
      ],
    },
    {
      heading: 'Contraste con el español: diferencias clave',
      paragraphs: [
        'El español tiene dos formas de subjuntivo imperfecto (-ara/-ase y -iera/-iese). El portugués solo usa las formas en -sse (equivalentes a las formas en -se del español, pero son las únicas y obligatorias).',
        'En español coloquial se acepta el indicativo en algunas condiciones: "Si tengo dinero, voy". En portugués esto es incorrecto: siempre "Se tiver dinheiro, vou" (futuro do conjuntivo) o "Se tivesse dinheiro, ia" (imperfeito do conjuntivo para irreal).',
      ],
    },
    {
      heading: 'Expresiones fijas con conjuntivo imperfeito',
      paragraphs: [
        'Hay expresiones fijas muy usadas en portugués: "Ainda que" + conjuntivo imperfeito (aunque), "Mesmo que" + conjuntivo imperfeito (incluso si), "A menos que" + conjuntivo imperfeito (a menos que), "Desde que" + conjuntivo imperfeito (siempre que).',
        'También es frecuente el uso en frases desiderativas: "Tomara que chovesse!" (¡Ojalá lloviera!), "Oxalá soubesses!" (¡Ojalá supieras!). Estas expresiones son muy características del portugués culto.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'Conjuntivo imperfeito: formación desde el pretérito y usos en hipótesis y deseos.',
    graphicPrompt: 'Dos mundos: la realidad vs el mundo hipotético, conectados por "se" y el conjuntivo.',
    scene: [
      ['Se tivesse dinheiro, viajaria pelo mundo.', 'Si tuviera dinero, viajaría por el mundo.'],
      ['Queria que me ajudasses com este exercício.', 'Quería que me ayudaras con este ejercicio.'],
      ['Fala como se soubesse tudo!', '¡Habla como si lo supiera todo!'],
      ['Se eu fosse tu, não fazia isso.', 'Si yo fuera tú, no haría eso.'],
      ['Tomara que viesses à festa!', '¡Ojalá vinieras a la fiesta!'],
      ['Ainda que pudesse, não iria.', 'Aunque pudiera, no iría.'],
      ['Se ele estudasse mais, passaria no exame.', 'Si estudiara más, pasaría el examen.'],
      ['Gostaria que ficasses mais um pouco.', 'Me gustaría que te quedaras un poco más.'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    practiceVerbs: ['ter', 'ser', 'ir', 'fazer', 'poder', 'querer', 'saber', 'vir', 'falar', 'estudar'],
    reviewFocus: ['3.ª pl. pretérito → raíz', 'terminaciones -sse', 'se + conjuntivo irreal'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Reconoce la forma correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del conjuntivo imperfeito para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Condición hipotética',
            lines: [['', 'Se eu ___ tempo, aprenderia guitarra.']],
            options: ['tivesse', 'tenho', 'terei', 'tinha'],
            answer: 'tivesse',
            explain: '"Ter" en conjuntivo imperfeito: tiveram → tive- → tivesse. La condición irreal con "se" exige conjuntivo imperfeito.',
          },
          {
            scene: 'Deseo en el pasado',
            lines: [['', 'Queria que ela ___ mais cedo.']],
            options: ['viesse', 'vem', 'veio', 'venha'],
            answer: 'viesse',
            explain: '"Vir" en conjuntivo imperfeito: vieram → vie- → viesse. Después de "queria que" (pasado) se usa el conjuntivo imperfeito.',
          },
          {
            scene: 'Comparación irreal',
            lines: [['', 'Ele fala como se ___ tudo.']],
            options: ['soubesse', 'sabe', 'saberá', 'saiba'],
            answer: 'soubesse',
            explain: '"Saber" en conjuntivo imperfeito: souberam → soube- → soubesse. "Como se" siempre exige conjuntivo imperfeito.',
          },
          {
            scene: 'Petición cortés',
            lines: [['', 'Gostaria que me ___ com as malas.']],
            options: ['ajudasses', 'ajudas', 'ajudaste', 'ajudes'],
            answer: 'ajudasses',
            explain: '"Ajudar" en conjuntivo imperfeito: ajudaram → ajuda- → ajudasse/ajudasses (tu). Después de "gostaria que" se usa el imperfeito.',
          },
          {
            scene: 'Hipótesis irreal',
            lines: [['', 'Se nós ___ ricos, comprávamos uma casa maior.']],
            options: ['fôssemos', 'somos', 'seremos', 'sejamos'],
            answer: 'fôssemos',
            explain: '"Ser/ir" en conjuntivo imperfeito: foram → fo- → fosse. Nós: fôssemos (con acento en la tónica).',
          },
          {
            scene: 'Condición con "poder"',
            lines: [['', 'Se ele ___ sair mais cedo, ia contigo.']],
            options: ['pudesse', 'pode', 'poderá', 'possa'],
            answer: 'pudesse',
            explain: '"Poder" en conjuntivo imperfeito: puderam → pude- → pudesse. Forma irregular muy frecuente.',
          },
          {
            scene: 'Deseo con "fazer"',
            lines: [['', 'Queria que eles ___ silêncio durante a reunião.']],
            options: ['fizessem', 'fazem', 'fizeram', 'façam'],
            answer: 'fizessem',
            explain: '"Fazer" en conjuntivo imperfeito: fizeram → fize- → fizesse/fizessem (eles). Verbo irregular frecuente.',
          },
          {
            scene: 'Ojalá / Tomara',
            lines: [['', 'Tomara que ___ bom tempo amanhã!']],
            options: ['fizesse', 'faz', 'fará', 'faça'],
            answer: 'fizesse',
            explain: '"Fazer" en conjuntivo imperfeito: fizesse. "Tomara que" + conjuntivo imperfeito expresa deseo irreal (ojalá).',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos formas en contexto',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas del conjuntivo imperfeito.',
        type: 'dual',
        items: [
          {
            scene: 'Conversación entre amigos',
            lines: [['', 'Se tu [[0]] mais cedo, nós [[1]] jantar juntos.']],
            blanks: [
              { options: ['chegasses', 'chegas', 'chegaste', 'chegues'], answer: 'chegasses', explain: '"Chegar" imperfeito conjuntivo: chegaram → chega- → chegasse/chegasses (tu).' },
              { options: ['podíamos', 'podemos', 'pudéssemos', 'possamos'], answer: 'pudéssemos', explain: '"Poder" imperfeito conjuntivo: puderam → pude- → pudéssemos (nós). Forma con acento en nós.' },
            ],
          },
          {
            scene: 'Jefe dando instrucciones',
            lines: [['', 'O diretor queria que nós [[0]] o relatório antes que ele [[1]] da reunião.']],
            blanks: [
              { options: ['terminássemos', 'terminamos', 'terminámos', 'terminemos'], answer: 'terminássemos', explain: '"Terminar" imperfeito conjuntivo: terminaram → termina- → terminássemos (nós).' },
              { options: ['saísse', 'saiu', 'sai', 'saia'], answer: 'saísse', explain: '"Sair" imperfeito conjuntivo: saíram → saí- → saísse (ele). Verbos en -ir siguen la misma regla.' },
            ],
          },
          {
            scene: 'Comparación hipotética',
            lines: [['', 'Ela tratava os colegas como se [[0]] seus empregados e como se [[1]] sempre razão.']],
            blanks: [
              { options: ['fossem', 'são', 'foram', 'sejam'], answer: 'fossem', explain: '"Ser" imperfeito conjuntivo: foram → fo- → fosse/fossem (eles). "Como se" exige imperfeito do conjuntivo.' },
              { options: ['tivesse', 'tem', 'teve', 'tenha'], answer: 'tivesse', explain: '"Ter" imperfeito conjuntivo: tiveram → tive- → tivesse (ela).' },
            ],
          },
          {
            scene: 'Deseo expresado con cortesía',
            lines: [['', 'Gostaria que tu me [[0]] e que [[1]] atenção ao que digo.']],
            blanks: [
              { options: ['ouvísses', 'ouves', 'ouviste', 'ouças'], answer: 'ouvísses', explain: '"Ouvir" imperfeito conjuntivo: ouviram → ouvi- → ouvisse/ouvísses (tu).' },
              { options: ['prestasses', 'prestas', 'prestaste', 'prestes'], answer: 'prestasses', explain: '"Prestar" imperfeito conjuntivo: prestaram → presta- → prestasse/prestasses (tu).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un mundo diferente',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del conjuntivo imperfeito para completar este texto hipotético.',
        type: 'guidedText',
        scene: 'Elige la forma correcta del conjuntivo imperfeito.',
        text: 'Às vezes imagino como seria a minha vida se as coisas [[0]] diferentes. Se eu [[1]] em Paris, [[2]] francês todos os dias. Gostaria que os meus amigos [[3]] comigo nessa aventura. Se [[4]] possível, [[5]] uma empresa de tradução. O meu sócio queria que nós [[6]] juntos desde o início.',
        blanks: [
          { options: ['fossem', 'são', 'foram', 'sejam'], answer: 'fossem', explain: '"Ser" imperfeito conjuntivo: foram → fo- → fosse/fossem (as coisas = plural).' },
          { options: ['vivesse', 'vivo', 'vivi', 'viva'], answer: 'vivesse', explain: '"Viver" imperfeito conjuntivo: viveram → vive- → vivesse (eu).' },
          { options: ['falasse', 'falo', 'falei', 'fale'], answer: 'falasse', explain: '"Falar" imperfeito conjuntivo: falaram → fala- → falasse (eu).' },
          { options: ['viessem', 'vêm', 'vieram', 'venham'], answer: 'viessem', explain: '"Vir" imperfeito conjuntivo: vieram → vie- → viesse/viessem (eles). Verbo irregular.' },
          { options: ['fosse', 'é', 'foi', 'seja'], answer: 'fosse', explain: '"Ser" imperfeito conjuntivo: foram → fo- → fosse (ele/ela, refiriéndose a "possível").' },
          { options: ['abriria', 'abro', 'abri', 'abra'], answer: 'abriria', explain: 'La cláusula principal de la condición irreal lleva el condicional: "abrir" → abriria.' },
          { options: ['trabalhássemos', 'trabalhamos', 'trabalhámos', 'trabalhemos'], answer: 'trabalhássemos', explain: '"Trabalhar" imperfeito conjuntivo: trabalharam → trabalha- → trabalhássemos (nós).' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe la forma del conjuntivo imperfeito del verbo indicado.',
        type: 'freeText',
        scene: 'Escribe la forma correcta del conjuntivo imperfeito.',
        text: 'Se eu [[0]] (poder) escolher qualquer profissão, [[1]] (ser) músico. Gostaria que a minha família [[2]] (compreender) essa decisão. Mesmo que [[3]] (ganhar) pouco dinheiro, seria feliz. Queria que todos nós [[4]] (ter) coragem de seguir os nossos sonhos.',
        blanks: [
          { answer: 'pudesse', accepted: ['pudesse'], explain: '"Poder" imperfeito conjuntivo: puderam → pude- → pudesse (eu).' },
          { answer: 'seria', accepted: ['seria'], explain: 'La cláusula principal lleva el condicional: ser → seria.' },
          { answer: 'compreendesse', accepted: ['compreendesse'], explain: '"Compreender" imperfeito conjuntivo: compreenderam → compreende- → compreendesse (a família = ela).' },
          { answer: 'ganhasse', accepted: ['ganhasse'], explain: '"Ganhar" imperfeito conjuntivo: ganharam → ganha- → ganhasse (eu implícito).' },
          { answer: 'tivéssemos', accepted: ['tivéssemos'], explain: '"Ter" imperfeito conjuntivo: tiveram → tive- → tivéssemos (nós). Acento en la sílaba tónica.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Construye hipótesis',
        tag: 'Producción',
        intro: 'Escribe oraciones completas usando el conjuntivo imperfeito según el contexto.',
        type: 'write',
        items: [
          {
            scene: 'Tu sueño hipotético',
            prompt: 'Escribe una oración con "Se eu tivesse..." expresando algo que harías si tuvieras una cosa.',
            answer: 'Se eu tivesse mais tempo, aprenderia a tocar guitarra.',
            accepted: ['se eu tivesse', 'tivesse'],
            explain: 'Estructura: Se eu tivesse + [coisa], + [condicional]. Ejemplo: Se eu tivesse dinheiro, viajaria pelo mundo.',
          },
          {
            scene: 'Petición cortés',
            prompt: 'Pide algo cortésmente usando "Gostaria que tu..."',
            answer: 'Gostaria que tu me ajudasses com este projeto.',
            accepted: ['gostaria que', 'gostaria que tu'],
            explain: 'Ejemplo: Gostaria que tu viesses jantar comigo. El verbo subordinado lleva imperfeito do conjuntivo.',
          },
          {
            scene: 'Comparación irreal',
            prompt: 'Describe a alguien que actúa como si supiera todo, usando "como se soubesse".',
            answer: 'Ele fala como se soubesse todas as respostas.',
            accepted: ['como se soubesse', 'como se'],
            explain: '"Como se" + conjuntivo imperfeito. Ejemplo: Ela age como se fosse a chefe.',
          },
          {
            scene: 'Deseo con "tomara"',
            prompt: 'Expresa un deseo usando "Tomara que..." con cualquier verbo en conjuntivo imperfeito.',
            answer: 'Tomara que fizesse sol amanhã!',
            accepted: ['tomara que', 'oxalá'],
            explain: '"Tomara que" + conjuntivo imperfeito expresa deseo intenso (¡ojalá!). Ejemplo: Tomara que viesses à minha festa!',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Misión: Mundo hipotético',
        tag: 'Producción libre',
        intro: 'Escribe 3 oraciones usando el conjuntivo imperfeito: una condición irreal, un deseo cortés y una comparación.',
        type: 'write',
        items: [
          {
            scene: 'Tu condición irreal',
            prompt: 'Escribe qué harías si vivieras en otro país (usa "Se eu vivesse...").',
            answer: 'Se eu vivesse no Japão, aprenderia japonês e provaria toda a comida tradicional.',
            accepted: ['se eu vivesse', 'se vivesse', 'vivesse'],
            explain: 'Usa la estructura: Se + [imperfeito conjuntivo], + [condicional]. Recuerda la raíz: viveram → vive- → vivesse.',
          },
          {
            scene: 'Tu deseo cortés',
            prompt: 'Pide algo a un amigo o familiar usando "Queria que tu..." o "Gostaria que...".',
            answer: 'Queria que tu me telefonasses mais vezes.',
            accepted: ['queria que', 'gostaria que', 'pedia que'],
            explain: 'El verbo principal en pretérito/condicional + "que" + imperfeito conjuntivo. Esta estructura es muy natural en portugués europeo.',
          },
          {
            scene: 'Tu comparación',
            prompt: 'Describe a alguien que actúa de una forma irreal usando "como se".',
            answer: 'Ela gasta dinheiro como se fosse milionária.',
            accepted: ['como se', 'como se fosse', 'como se tivesse'],
            explain: '"Como se" siempre va seguido de conjuntivo imperfeito. Ejemplo: Ele corre como se tivesse vinte anos.',
          },
        ],
      },
    ],
  },
}

export default topic
