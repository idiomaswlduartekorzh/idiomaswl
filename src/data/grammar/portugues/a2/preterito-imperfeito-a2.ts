import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preterito-imperfeito-a2',
  order: '02',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Pretérito Imperfeito em Português Brasileiro A2',
  shortTitle: 'Pretérito imperfeito',
  metaTitle: 'Pretérito imperfeito português A2 — formação e usos',
  description:
    'El pretérito imperfeito del indicativo en portugués equivale al pretérito imperfecto del español. Se usa para describir acciones habituales en el pasado, descripciones y el fondo de una narración. Las terminaciones son: -ar → -ava/-avas/-ava/-ávamos/-avam; -er/-ir → -ia/-ias/-ia/-íamos/-iam.',
  lead: 'El imperfeito describe hábitos pasados (Quando era criança, brincava na rua.), situaciones de fondo y solicitudes educadas. Terminaciones regulares: -ava (verbos -ar) y -ia (verbos -er/-ir).',
  outcomes: [
    'Forma el pretérito imperfeito de verbos regulares -ar, -er, -ir',
    'Conjuga los irregulares ser, ter y vir en imperfeito',
    'Distingue el uso del imperfeito frente al perfeito simple',
    'Usa o imperfeito para pedir algo con cortesía (Queria um café.)',
  ],

  guide: {
    goal: 'Formar y usar el pretérito imperfeito para hábitos pasados, descripciones y contexto narrativo.',
    model: 'Quando era criança, brincava na rua todos os dias. (Cuando era niño/a, jugaba en la calle todos los días.)',
    formula: '-AR: -ava/-avas/-ava/-ávamos/-avam | -ER/-IR: -ia/-ias/-ia/-íamos/-iam',
    decisions: [
      'Hábito o acción repetida en el pasado: "Ela estudava português todos os dias."',
      'Descripción de personas, lugares o circunstancias en el pasado: "Era uma cidade tranquila."',
      'Fondo de narración (mientras algo ocurría): "Eu dormia quando o telefone tocou."',
      'Solicitud educada o suavizada: "Queria um café, por favor." / "Podia me ajudar?"',
      'Irregulares: ser → era/eras/era/éramos/eram; ter → tinha/tinhas/tinha/tínhamos/tinham; vir → vinha/vinhas/vinha',
    ],
    table: [
      ['Sujeto', '-AR (falar)', '-ER/-IR (comer/partir)'],
      ['eu', 'falava', 'comia / partia'],
      ['tu/você', 'falavas/falava', 'comias/comia'],
      ['ele/ela', 'falava', 'comia / partia'],
      ['nós', 'falávamos', 'comíamos / partíamos'],
      ['vocês/eles', 'falavam', 'comiam / partiam'],
    ],
    mistakes: [
      '"Eu falei todos os dias" para hábito ✗ → "Eu falava todos os dias". Hábito pasado usa imperfeito.',
      '"Eu serei criança" ✗ → "Eu era criança". Descripción en el pasado usa era (ser, imperfeito).',
      '"Querei um café" ✗ → "Queria um café". La solicitud cortés usa queria, no querei.',
      'Los verbos -er/-ir nunca toman -ava en imperfeito: "comava" ✗ → "comia" ✓.',
    ],
  },

  seo: [
    {
      heading: 'El pretérito imperfeito: hábitos, descripciones y fondo narrativo',
      paragraphs: [
        'El pretérito imperfeito en portugués funciona de manera muy similar al imperfecto en español. Se usa para tres propósitos principales: describir hábitos o rutinas pasadas ("Quando era criança, jogava bola todo dia"), hacer descripciones en el pasado ("O apartamento era pequeno mas confortável") y proporcionar el contexto de fondo para una historia ("Estava chovendo quando o carro parou").',
        'Una cuarta función muy útil en portugués coloquial es el uso cortés: en lugar de pedir algo directamente, se suaviza la solicitud con el imperfeito: "Queria um café, por favor" (Quisiera un café) o "Podia me dizer a hora?" (¿Podría decirme la hora?). Esta función es especialmente útil en situaciones de servicio al cliente.',
      ],
    },
    {
      heading: 'Formación regular: -ava y -ia',
      paragraphs: [
        'Los verbos en -ar añaden el sufijo -ava a la raíz: falar → fal + ava = falava; estudar → estudava; gostar → gostava. Todas las personas siguen el mismo patrón excepto nosotros: falávamos (con acento en la primera a).',
        'Los verbos en -er e -ir añaden el sufijo -ia: comer → com + ia = comia; beber → bebia; partir → partia; abrir → abria. Nosotros: comíamos/partíamos. Este patrón es completamente regular y no presenta excepciones entre los verbos regulares.',
      ],
    },
    {
      heading: 'Los tres irregulares: ser, ter y vir',
      paragraphs: [
        'Ser es totalmente irregular en imperfeito: era/eras/era/éramos/eram. Estas formas son idénticas en español: era/eras/era/éramos/eran. Es una de las coincidencias más útiles entre los dos idiomas.',
        'Ter (tener) en imperfeito: tinha/tinhas/tinha/tínhamos/tinham. Note la raíz "tinh-" que cambia completamente. Vir (venir) en imperfeito: vinha/vinhas/vinha/vínhamos/vinham. También con raíz "vinh-". Estas dos formas sorprenden a los hispanohablantes pero se memorizan fácilmente.',
      ],
    },
    {
      heading: '¿Cómo se conjuga el pretérito imperfeito en portugués?',
      paragraphs: [
        'Los verbos en -ar toman -ava; los en -er e -ir toman -ia. Solo hay tres irregulares (ser, ter, vir). Esta tabla reúne el paradigma regular de los dos grupos más un irregular clave:',
      ],
      table: [
        ['Persona', 'falar (-ar)', 'comer (-er)', 'ser (irreg.)'],
        ['eu', 'falava', 'comia', 'era'],
        ['tu', 'falavas', 'comias', 'eras'],
        ['você/ele/ela', 'falava', 'comia', 'era'],
        ['nós', 'falávamos', 'comíamos', 'éramos'],
        ['vocês/eles/elas', 'falavam', 'comiam', 'eram'],
      ],
    },
    {
      heading: '¿Cuál es la diferencia entre pretérito perfeito e imperfeito?',
      paragraphs: [
        'El perfeito (fui, comi, falei) presenta la acción como un hecho puntual y terminado; el imperfeito (ia, comia, falava) la presenta como habitual, en curso o descriptiva. "Ontem estudei duas horas" (acción concreta, perfeito) frente a "Quando era criança, estudava pouco" (hábito, imperfeito). En una narración se combinan: el imperfeito pinta el fondo ("Chovia e eu dormia") y el perfeito marca el evento que irrumpe ("…quando o telefone tocou"). Es el mismo reparto del español, así que la intuición se traslada casi sin ajuste.',
      ],
    },
    {
      heading: '¿Por qué se dice "queria um café" en vez de "quero um café"?',
      paragraphs: [
        'Porque el imperfeito suaviza la petición y suena más educado, igual que el español "quería/quisiera un café" frente al directo "quiero". Es un uso de cortesía muy común en portugués: "Queria um café", "Podia me ajudar?", "Gostava de ver o cardápio". No indica pasado real, sino distancia y amabilidad. Para el hispanohablante es intuitivo, porque el español hace exactamente lo mismo con el imperfecto de cortesía.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a usar el imperfeito para narrar el pasado habitual y hacer descripciones.',
    graphicPrompt: 'Escenas de infancia y rutinas del pasado en portugués brasileño.',
    scene: [
      ['Quando era criança, brincava na rua.', 'Cuando era niño/a, jugaba en la calle.'],
      ['Ela estudava inglês todas as tardes.', 'Ella estudiaba inglés todas las tardes.'],
      ['Nós morávamos perto da praia.', 'Nosotros vivíamos cerca de la playa.'],
      ['Ele sempre vinha de bicicleta.', 'Él siempre venía en bicicleta.'],
      ['A casa era grande e antiga.', 'La casa era grande y antigua.'],
      ['Eu dormia quando o telefone tocou.', 'Yo dormía cuando sonó el teléfono.'],
      ['Queria um café, por favor.', 'Quisiera un café, por favor.'],
      ['Meu avô tinha uma fazenda.', 'Mi abuelo tenía una hacienda.'],
    ],
    learnerModes: ['narrativo: infancia y recuerdos', 'descriptivo: pasado', 'social: solicitudes corteses'],
    reviewFocus: ['falava vs falei', 'era/tinha/vinha', 'Queria (cortesía)', '-ava vs -ia'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el imperfeito correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma del pretérito imperfeito para completar cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Recuerdos de infancia',
            lines: [['Ana', 'Quando era criança, eu ___ muito no parque.']],
            options: ['brincava', 'brinquei', 'brinca', 'brincará'],
            answer: 'brincava',
            explain: 'Hábito en la infancia: brincar (-ar) → brincava. Eu + imperfeito.',
          },
          {
            scene: 'Descripción del apartamento',
            lines: [['Carlos', 'O apartamento ___ pequeno mas muito aconchegante.']],
            options: ['era', 'foi', 'é', 'será'],
            answer: 'era',
            explain: 'Descripción en el pasado: ser → era. Ser es irregular en imperfeito.',
          },
          {
            scene: 'La abuela',
            lines: [['Leo', 'Minha avó sempre ___ bolo de laranja aos domingos.']],
            options: ['fazia', 'fez', 'faz', 'fará'],
            answer: 'fazia',
            explain: 'Hábito pasado: fazer (-er irregular) → fazia.',
          },
          {
            scene: 'El fondo de la historia',
            lines: [['Alba', 'Eu ___ quando ouvi o barulho na rua.']],
            options: ['dormia', 'dormi', 'durma', 'dorme'],
            answer: 'dormia',
            explain: 'Fondo narrativo: dormir (-ir) → dormia. Yo dormía cuando...',
          },
          {
            scene: 'Solicitud cortés',
            lines: [['Cliente', '___ um suco de laranja, por favor.']],
            options: ['Queria', 'Quis', 'Quero', 'Quereria'],
            answer: 'Queria',
            explain: 'Solicitud educada: querer → queria (eu). "Queria" es más cortés que "quero".',
          },
          {
            scene: 'Antes de la ciudad',
            lines: [['Marco', 'Nós ___ em uma cidade pequena antes de se mudar para São Paulo.']],
            options: ['morávamos', 'moramos', 'moraremos', 'moremos'],
            answer: 'morávamos',
            explain: 'Hábito/estado pasado: morar → morávamos (nós). Note el acento: -ávamos.',
          },
          {
            scene: 'El recuerdo',
            lines: [['Sofia', 'Eles sempre ___ ao trabalho de metrô.']],
            options: ['iam', 'foram', 'vão', 'iriam'],
            answer: 'iam',
            explain: 'Ir es irregular en imperfeito: ia/ias/ia/íamos/iam. Hábito pasado.',
          },
          {
            scene: 'La posesión',
            lines: [['Lina', 'Quando era pequena, eu ___ um cachorro enorme.']],
            options: ['tinha', 'tive', 'tenho', 'terei'],
            answer: 'tinha',
            explain: 'Ter en imperfeito: tinha (eu). Era una posesión habitual en el pasado.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos verbos en imperfeito',
        tag: '2 espacios',
        intro: 'Completa las oraciones con el pretérito imperfeito de los verbos indicados.',
        type: 'dual',
        items: [
          {
            scene: 'Rutina de la abuela',
            lines: [['Ana', 'Minha avó [[0]] (acordar) cedo e [[1]] (fazer) café para toda a família.']],
            blanks: [
              { options: ['acordava', 'acordou', 'acorda'], answer: 'acordava', explain: 'Acordar (-ar), hábito: acordava.' },
              { options: ['fazia', 'fez', 'faz'], answer: 'fazia', explain: 'Fazer, hábito: fazia (ela).' },
            ],
          },
          {
            scene: 'De vacaciones',
            lines: [['Carlos', 'Nós sempre [[0]] (ir) à praia nas férias e [[1]] (ficar) lá uma semana.']],
            blanks: [
              { options: ['íamos', 'fomos', 'vamos'], answer: 'íamos', explain: 'Ir en imperfeito, nós: íamos.' },
              { options: ['ficávamos', 'ficamos', 'ficaremos'], answer: 'ficávamos', explain: 'Ficar (-ar), nós: ficávamos.' },
            ],
          },
          {
            scene: 'El fondo del accidente',
            lines: [['Alba', 'Eu [[0]] (trabalhar) no computador quando de repente [[1]] (começar) a chover muito.']],
            blanks: [
              { options: ['trabalhava', 'trabalhei', 'trabalho'], answer: 'trabalhava', explain: 'Trabalhar, fondo narrativo: trabalhava.' },
              { options: ['começou', 'começava', 'começa'], answer: 'começou', explain: 'El evento súbito usa perfeito: começou. (Contraste: fondo=imperfeito, evento=perfeito)' },
            ],
          },
          {
            scene: 'El restaurante antiguo',
            lines: [['Leo', 'O restaurante [[0]] (ser) muito bom mas [[1]] (ter) preços altos.']],
            blanks: [
              { options: ['era', 'foi', 'é'], answer: 'era', explain: 'Ser, descripción pasada: era.' },
              { options: ['tinha', 'teve', 'tem'], answer: 'tinha', explain: 'Ter, descripción pasada: tinha.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Recuerdos de infancia',
        tag: 'Texto guiado',
        intro: 'Elige la forma del imperfeito correcta para completar este relato de infancia.',
        type: 'guidedText',
        scene: 'Recuerdos de infancia en Brasil',
        text: 'Quando [[0]] criança, a vida [[1]] muito simples. Eu [[2]] na rua com os amigos até anoitecer. Minha mãe sempre [[3]] o jantar cedo. Nós não [[4]] televisão, mas [[5]] muito. A minha avó [[6]] histórias incríveis antes de dormir.',
        blanks: [
          { options: ['era', 'foi', 'é'], answer: 'era', explain: 'Ser, descripción habitual: era (eu era criança).' },
          { options: ['era', 'foi', 'é'], answer: 'era', explain: 'Ser, descripción del pasado: era.' },
          { options: ['brincava', 'brinquei', 'brinca'], answer: 'brincava', explain: 'Brincar, hábito: brincava.' },
          { options: ['fazia', 'fez', 'faz'], answer: 'fazia', explain: 'Fazer, hábito: fazia.' },
          { options: ['tínhamos', 'tivemos', 'temos'], answer: 'tínhamos', explain: 'Ter, negación de hábito: tínhamos. Nós + imperfeito.' },
          { options: ['líamos', 'lemos', 'lemos'], answer: 'líamos', explain: 'Ler en imperfeito, nós: líamos.' },
          { options: ['contava', 'contou', 'conta'], answer: 'contava', explain: 'Contar (-ar), hábito: contava.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe el imperfeito',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del pretérito imperfeito del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Mi vida antes de mudarme a la ciudad',
        text: 'Antes eu [[0]] (morar) em uma cidade pequena. Eu [[1]] (trabalhar) em uma padaria e [[2]] (acordar) às 5h da manhã. A vida [[3]] (ser) tranquila. Minha família [[4]] (ter) uma casa grande com quintal. Nós [[5]] (passar) os fins de semana juntos.',
        blanks: [
          { answer: 'morava', explain: 'Morar (-ar), eu: morava.' },
          { answer: 'trabalhava', explain: 'Trabalhar (-ar), eu: trabalhava.' },
          { answer: 'acordava', explain: 'Acordar (-ar), eu: acordava.' },
          { answer: 'era', explain: 'Ser, descripción: era.' },
          { answer: 'tinha', explain: 'Ter, posesión habitual: tinha.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con imperfeito',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en portugués usando el pretérito imperfeito.',
        type: 'write',
        items: [
          {
            scene: 'Tu infancia',
            prompt: 'Escribe: Cuando era niño/a, jugaba mucho. → Quando era criança, eu ___ muito.',
            answer: 'Quando era criança, eu brincava muito.',
            accepted: ['quando era criança eu brincava muito', 'quando era criança brincava muito'],
            explain: 'Brincar (-ar) en imperfeito: brincava.',
          },
          {
            scene: 'Solicitud cortés',
            prompt: 'Escribe una solicitud educada: Quisiera una agua, por favor. → ___ uma água, por favor.',
            answer: 'Queria uma água, por favor.',
            accepted: ['queria uma água por favor', 'queria uma agua por favor'],
            explain: 'Querer en imperfeito para solicitud educada: queria.',
          },
          {
            scene: 'El fondo',
            prompt: 'Escribe: Yo estudiaba cuando llegó mi amigo. → Eu ___ quando meu amigo chegou.',
            answer: 'Eu estudava quando meu amigo chegou.',
            accepted: ['eu estudava quando meu amigo chegou'],
            explain: 'Estudar (-ar) en imperfeito para fondo: estudava. El evento puntual usa perfeito: chegou.',
          },
          {
            scene: 'Descripción pasada',
            prompt: 'Escribe: El restaurante era muy bonito. → O restaurante ___ muito bonito.',
            answer: 'O restaurante era muito bonito.',
            accepted: ['o restaurante era muito bonito'],
            explain: 'Ser en imperfeito para descripción pasada: era.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Describe tu pasado',
        tag: 'Escritura libre',
        intro: 'Escribe sobre tu vida en el pasado usando el pretérito imperfeito.',
        type: 'write',
        items: [
          {
            scene: 'Tu infancia',
            prompt: 'Describe dónde vivías y qué hacías cuando eras niño/a (usa morava, brincava, estudava, etc.).',
            answer: 'Quando era criança, morava em uma cidade pequena e brincava com os amigos na rua.',
            accepted: ['morava', 'vivia', 'brincava', 'estudava', 'jogava', 'gostava'],
            explain: 'Usa verbos en imperfeito: morava, estudava, brincava, comia, jogava, tinha, era.',
          },
          {
            scene: 'Tu rutina anterior',
            prompt: 'Describe cómo era tu rutina antes (usa acordava, trabalhava, ia, etc.).',
            answer: 'Antes eu acordava às 7h, tomava café e ia trabalhar de ônibus.',
            accepted: ['acordava', 'trabalhava', 'ia', 'comia', 'estudava', 'chegava', 'saía', 'fazia'],
            explain: 'Usa: acordava, tomava, ia, trabalhava, estudava, chegava, comia, fazia, dormia.',
          },
          {
            scene: 'Solicitud educada',
            prompt: 'Escribe tres cosas que pedirías educadamente en un restaurante (usa queria, podia, gostaria).',
            answer: 'Queria um café com leite. Podia trazer o cardápio? Gostaria de uma mesa perto da janela.',
            accepted: ['queria', 'podia', 'gostaria', 'queria um', 'podia me'],
            explain: 'Queria, podia, gostaria son formas de imperfeito que expresan cortesía en portugués.',
          },
        ],
      },
    ],
  },
}

export default topic
