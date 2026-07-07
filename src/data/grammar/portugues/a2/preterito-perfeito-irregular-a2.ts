import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'preterito-perfeito-irregular-a2',
  order: '01',
  color: '#166534',
  category: 'Verbos',
  level: 'A2',
  title: 'Pretérito Perfeito Irregular em Português Brasileiro A2',
  shortTitle: 'Perfeito irregular',
  metaTitle: 'Pretérito perfeito irregular português A2 — ser, ir, ter, fazer, vir',
  description:
    'El pretérito perfecto de los verbos irregulares en portugués es fundamental para narrar el pasado. Los verbos ser/ir comparten forma (fui), mientras que ter→tive, fazer→fiz, estar→estive, vir→vim, dizer→disse, ver→vi, poder→pude, querer→quis y saber→soube forman grupos con patrones propios.',
  lead: 'Los irregulares más frecuentes: fui (ser/ir), estive (estar), tive (ter), fiz (fazer), vim (vir), disse (dizer), vi (ver). Aprende estos 10 verbos y dominarás el 80% del pasado en portugués.',
  outcomes: [
    'Conjuga los 10 irregulares más frecuentes en pretérito perfeito',
    'Distingue cuándo fui viene de ser o de ir según contexto',
    'Narra experiencias del pasado usando verbos irregulares',
    'Evita aplicar las terminaciones regulares a estos verbos',
  ],

  guide: {
    goal: 'Usar correctamente las formas irregulares del pretérito perfeito simple en portugués brasileño A2.',
    model: 'Ontem fui ao mercado. (Ayer fui al mercado.) / Fiz o dever de casa. (Hice la tarea.) / Vim de táxi. (Vine en taxi.)',
    formula: 'SER/IR: fui/foste/foi/fomos/foram | TER: tive/tiveste/teve/tivemos/tiveram | FAZER: fiz/fizeste/fez/fizemos/fizeram',
    decisions: [
      'Ser e Ir comparten exactamente la misma conjugación: "Fui ao banco" (ir) / "Fui professor" (ser) — el contexto distingue',
      'Estar → estive/estiveste/esteve/estivemos/estiveram (notar la e- inicial diferente del español)',
      'Ter → tive/tiveste/teve/tivemos/tiveram (similar a "tuve" en español)',
      'Fazer → fiz/fizeste/fez/fizemos/fizeram (la 1ª sg termina en -z, la 3ª sg en -ez)',
      'Vir → vim/vieste/veio/viemos/vieram (vim = vine, veio = vino)',
      'Ver → vi/viste/viu/vimos/viram (muy similar al español)',
    ],
    table: [
      ['Verbo', '1ª sg (eu)', '3ª sg (ele/ela)'],
      ['ser/ir', 'fui', 'foi'],
      ['estar', 'estive', 'esteve'],
      ['ter', 'tive', 'teve'],
      ['fazer', 'fiz', 'fez'],
      ['vir', 'vim', 'veio'],
      ['dizer', 'disse', 'disse'],
      ['ver', 'vi', 'viu'],
      ['poder', 'pude', 'pôde'],
      ['querer', 'quis', 'quis'],
      ['saber', 'soube', 'soube'],
    ],
    mistakes: [
      '"Eu fazi" ✗ → "Eu fiz". La 1ª persona de fazer termina en -z, no en -i.',
      '"Ele fezeu" ✗ → "Ele fez". La 3ª persona de fazer es fez, sin terminación extra.',
      '"Eu veni" ✗ → "Eu vim". Vir en pasado es vim, no sigue el patrón de venir español.',
      '"Eles viram um filme" = vieron una película (ver, viram). No confundir con "viram" de vir (vinieron = vieram).',
    ],
  },

  seo: [
    {
      heading: 'Verbos irregulares en pretérito perfeito: los 10 esenciales',
      paragraphs: [
        'El pretérito perfeito simple del indicativo en portugués equivale al pretérito indefinido del español (yo fui, yo hice, yo vine). Los verbos irregulares son aquellos cuya raíz cambia de forma impredecible en el pasado y que no siguen las terminaciones regulares -ei/-aste/-ou/-amos/-aram (-ar) o -i/-iste/-eu/-emos/-eram (-er/-ir).',
        'La buena noticia para el hispanohablante es que muchos de estos irregulares tienen paralelos claros: ter→tive (tener→tuve), dizer→disse (decir→dije), ver→vi (ver→vi). Las diferencias más importantes son ser/ir (ambos = fui), fazer→fiz (hacer→hice) y vir→vim (venir→vine/vim).',
      ],
    },
    {
      heading: 'Ser e Ir: dos verbos, una conjugación',
      paragraphs: [
        'Una particularidad notable del portugués es que ser e ir comparten exactamente la misma conjugación en pretérito perfeito: fui/foste/foi/fomos/foram. El contexto siempre resuelve la ambigüedad: "Fui ao mercado" (ir) vs "Fui professor muitos anos" (ser).',
        'Esta fusión puede sorprender al hispanohablante, acostumbrado a que "fui" también funciona para ambos en español (yo fui = I went / I was). En portugués es igual: "Fui ao Rio" (fui/ir) y "Fui feliz naquela época" (fui/ser) son perfectamente normales.',
      ],
    },
    {
      heading: 'Fazer, vir y estar: los tres más tramposos',
      paragraphs: [
        'Fazer (hacer) es especialmente irregular: fiz (yo), fizeste (tú), fez (él), fizemos (nosotros), fizeram (ellos). Nótese que fiz (1ª sg) termina en -z y fez (3ª sg) en -z también, pero con vocal diferente.',
        'Vir (venir) produce vim/vieste/veio/viemos/vieram. La 3ª persona singular "veio" es muy característica y no se parece al infinitivo. Estar produce estive/estiveste/esteve/estivemos/estiveram — diferente del español estuve en la vocal temática.',
      ],
    },
    {
      heading: 'Ver, poder, querer y saber: los otros cuatro',
      paragraphs: [
        'Ver (ver) es bastante similar al español: vi/viste/viu/vimos/viram. La 3ª singular "viu" es la única forma diferente al español "vio".',
        'Poder→pude, querer→quis y saber→soube son irregulares en toda su conjugación. "Pôde" (3ª sg de poder) lleva acento circunflejo para diferenciarse de "pode" (presente). "Soube" (saber) no tiene equivalente claro en español pero su patrón soube/soubeste/soube/soubemos/souberam es regular dentro de su propia irregularidad.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende las formas irregulares del pretérito perfeito en contexto narrativo del pasado.',
    graphicPrompt: 'Línea de tiempo de un día pasado con acciones narradas usando los irregulares más comunes.',
    scene: [
      ['Ontem fui ao supermercado.', 'Ayer fui al supermercado.'],
      ['Fizemos o jantar juntos.', 'Hicimos la cena juntos.'],
      ['Ela veio de ônibus.', 'Ella vino en autobús.'],
      ['Você esteve em casa o dia todo?', '¿Estuviste en casa todo el día?'],
      ['Tive uma reunião importante.', 'Tuve una reunión importante.'],
      ['Vi um filme incrível ontem à noite.', 'Vi una película increíble anoche.'],
      ['Ele disse que estava ocupado.', 'Él dijo que estaba ocupado.'],
      ['Não pude ir à festa.', 'No pude ir a la fiesta.'],
    ],
    learnerModes: ['narrativo: pasado reciente', 'analítico: paradigmas irregulares', 'oral: contar experiencias'],
    reviewFocus: ['fui = ser/ir', 'fiz vs fez', 'vim vs veio', 'estive', 'soube'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'Elige el pasado irregular correcto',
        tag: 'Opción múltiple',
        intro: 'Elige la forma correcta del pretérito perfeito para cada oración.',
        type: 'choice',
        items: [
          {
            scene: 'Viaje al centro',
            lines: [['Carlos', 'Ontem eu ___ ao centro de ônibus.']],
            options: ['fui', 'foi', 'fumos', 'fazia'],
            answer: 'fui',
            explain: 'Ir en pretérito perfeito, 1ª sg (eu): fui. "Fui al centro" = "Fui ao centro".',
          },
          {
            scene: 'La cena de anoche',
            lines: [['Ana', 'Ela ___ um jantar delicioso ontem à noite.']],
            options: ['fez', 'fiz', 'fazeu', 'fazia'],
            answer: 'fez',
            explain: 'Fazer en pretérito perfeito, 3ª sg (ela): fez.',
          },
          {
            scene: 'La llegada',
            lines: [['David', 'Eles ___ de São Paulo ontem cedo.']],
            options: ['vieram', 'viram', 'veniram', 'viemos'],
            answer: 'vieram',
            explain: 'Vir en pretérito perfeito, 3ª pl (eles): vieram. No confundir con "viram" (ver).',
          },
          {
            scene: 'La reunión',
            lines: [['Zhanna', 'Eu ___ uma reunião importante esta manhã.']],
            options: ['tive', 'tinha', 'teve', 'tenho'],
            answer: 'tive',
            explain: 'Ter en pretérito perfeito, 1ª sg (eu): tive.',
          },
          {
            scene: 'En casa',
            lines: [['Marco', 'Você ___ em casa o fim de semana todo?']],
            options: ['esteve', 'estava', 'estiveste', 'estás'],
            answer: 'esteve',
            explain: 'Estar en pretérito perfeito, 3ª sg (você = ele/ela): esteve.',
          },
          {
            scene: 'La película',
            lines: [['Lina', 'Nós ___ um ótimo filme no cinema ontem.']],
            options: ['vimos', 'viemos', 'víamos', 'veio'],
            answer: 'vimos',
            explain: 'Ver en pretérito perfeito, 1ª pl (nós): vimos.',
          },
          {
            scene: 'El anuncio',
            lines: [['Professor', 'Ele ___ que a aula foi cancelada.']],
            options: ['disse', 'dizia', 'diz', 'dizeu'],
            answer: 'disse',
            explain: 'Dizer en pretérito perfeito, 3ª sg: disse. (Tanto 1ª como 3ª sg son "disse".)',
          },
          {
            scene: 'El intento',
            lines: [['Sofia', 'Eu não ___ ir à reunião porque estava doente.']],
            options: ['pude', 'podia', 'pôde', 'pudi'],
            answer: 'pude',
            explain: 'Poder en pretérito perfeito, 1ª sg (eu): pude. (3ª sg es pôde con acento.)',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Dos irregulares en diálogo',
        tag: '2 espacios',
        intro: 'Completa con las formas correctas del pretérito perfeito.',
        type: 'dual',
        items: [
          {
            scene: 'Recuento del fin de semana',
            lines: [['Carlos', 'Eu [[0]] ao shopping e [[1]] muitas compras.']],
            blanks: [
              { options: ['fui', 'foi', 'fumos'], answer: 'fui', explain: 'Ir, 1ª sg: fui.' },
              { options: ['fiz', 'fez', 'fazei'], answer: 'fiz', explain: 'Fazer, 1ª sg: fiz.' },
            ],
          },
          {
            scene: 'La reunión de trabajo',
            lines: [
              ['Ana', 'Onde você [[0]] ontem? Eu te liguei.'],
              ['David', 'Eu [[1]] em reunião a tarde toda.'],
            ],
            blanks: [
              { options: ['esteve', 'estava', 'estás'], answer: 'esteve', explain: 'Estar, 3ª sg (você): esteve.' },
              { options: ['estive', 'estava', 'estarei'], answer: 'estive', explain: 'Estar, 1ª sg: estive.' },
            ],
          },
          {
            scene: 'La visita',
            lines: [['Zhanna', 'Minha amiga [[0]] de Recife e nós [[1]] muito tempo juntas.']],
            blanks: [
              { options: ['veio', 'vim', 'vieram'], answer: 'veio', explain: 'Vir, 3ª sg (minha amiga): veio.' },
              { options: ['tivemos', 'tínhamos', 'teremos'], answer: 'tivemos', explain: 'Ter, 1ª pl: tivemos.' },
            ],
          },
          {
            scene: 'Las noticias',
            lines: [['Marcos', 'Eles [[0]] que não [[1]] participar da reunião.']],
            blanks: [
              { options: ['disseram', 'diziam', 'dizem'], answer: 'disseram', explain: 'Dizer, 3ª pl: disseram.' },
              { options: ['puderam', 'podiam', 'podem'], answer: 'puderam', explain: 'Poder, 3ª pl: puderam.' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en São Paulo',
        tag: 'Texto guiado',
        intro: 'Elige la forma correcta del pretérito perfeito para completar el relato.',
        type: 'guidedText',
        scene: 'Relato de un día intenso en la ciudad',
        text: 'Ontem [[0]] (ir) ao trabalho bem cedo. Meu chefe [[1]] (fazer) uma reunião importante pela manhã. Depois, eu e minha colega [[2]] (ir) almoçar fora. Ela me [[3]] (dizer) que vai se casar! À tarde, eu [[4]] (ter) que resolver uns problemas urgentes. Quando [[5]] (vir) para casa, estava exausto, mas [[6]] (ver) um pôr do sol lindo pela janela do metrô.',
        blanks: [
          { options: ['fui', 'foi', 'fumos'], answer: 'fui', explain: 'Ir, 1ª sg (eu): fui.' },
          { options: ['fez', 'fiz', 'fazeu'], answer: 'fez', explain: 'Fazer, 3ª sg (meu chefe): fez.' },
          { options: ['fomos', 'foram', 'íamos'], answer: 'fomos', explain: 'Ir, 1ª pl (eu e minha colega): fomos.' },
          { options: ['disse', 'dizia', 'dizeu'], answer: 'disse', explain: 'Dizer, 3ª sg (ela): disse.' },
          { options: ['tive', 'tinha', 'tenho'], answer: 'tive', explain: 'Ter, 1ª sg (eu): tive.' },
          { options: ['vim', 'veio', 'venho'], answer: 'vim', explain: 'Vir, 1ª sg (eu): vim.' },
          { options: ['vi', 'viu', 'via'], answer: 'vi', explain: 'Ver, 1ª sg (eu): vi.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Escribe los irregulares',
        tag: 'Texto libre',
        intro: 'Escribe la forma correcta del pretérito perfeito del verbo entre paréntesis.',
        type: 'freeText',
        scene: 'Conversación entre amigos sobre el fin de semana',
        text: 'No fim de semana, nós [[0]] (ir) à praia. [[1]] (fazer) muito calor, mas [[2]] (ser) um dia incrível. Minha amiga [[3]] (vir) também e [[4]] (trazer) comida deliciosa. Eu nunca [[5]] (saber) que ela cozinhava tão bem!',
        blanks: [
          { answer: 'fomos', explain: 'Ir, 1ª pl (nós): fomos.' },
          { answer: 'fez', explain: 'Fazer (en expresión de tiempo/clima), 3ª sg: fez.' },
          { answer: 'foi', explain: 'Ser, 3ª sg (um dia): foi.' },
          { answer: 'veio', explain: 'Vir, 3ª sg (minha amiga): veio.' },
          { answer: 'trouxe', explain: 'Trazer en pretérito perfeito, 3ª sg: trouxe (verbo adicional frecuente).' },
        ],
      },
      {
        id: 'level-5',
        title: 'Producción con irregulares',
        tag: 'Escritura guiada',
        intro: 'Escribe la oración completa en portugués usando el pretérito perfeito.',
        type: 'write',
        items: [
          {
            scene: 'Tu ayer',
            prompt: 'Escribe: Ayer fui al gimnasio. → Ontem eu ___ à academia.',
            answer: 'Ontem eu fui à academia.',
            accepted: ['ontem eu fui à academia', 'ontem fui à academia'],
            explain: 'Ir, 1ª sg: fui. "Academia" = gimnasio en portugués brasileño.',
          },
          {
            scene: 'La cena',
            prompt: 'Escribe: Ella hizo la cena ayer. → Ela ___ o jantar ontem.',
            answer: 'Ela fez o jantar ontem.',
            accepted: ['ela fez o jantar ontem', 'ela fez o jantar'],
            explain: 'Fazer, 3ª sg: fez.',
          },
          {
            scene: 'La visita',
            prompt: 'Escribe: Ellos vinieron a mi casa. → Eles ___ à minha casa.',
            answer: 'Eles vieram à minha casa.',
            accepted: ['eles vieram à minha casa', 'eles vieram a minha casa'],
            explain: 'Vir, 3ª pl: vieram.',
          },
          {
            scene: 'La noticia',
            prompt: 'Escribe: Yo no supe la verdad. → Eu não ___ a verdade.',
            answer: 'Eu não soube a verdade.',
            accepted: ['eu não soube a verdade', 'não soube a verdade'],
            explain: 'Saber, 1ª sg: soube.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Cuéntame tu semana',
        tag: 'Escritura libre',
        intro: 'Escribe oraciones completas describiendo lo que hiciste esta semana. Usa al menos 4 verbos irregulares.',
        type: 'write',
        items: [
          {
            scene: 'Un día de la semana',
            prompt: 'Escribe qué hiciste un día de esta semana (usa fui, fiz, tive o vim).',
            answer: 'Na segunda-feira fui ao trabalho, tive uma reunião e fiz um relatório.',
            accepted: ['fui', 'fiz', 'tive', 'vim', 'estive', 'vi', 'disse'],
            explain: 'Usa verbos como: fui, fiz, tive, vim, estive, vi, disse, soube, pude, quis.',
          },
          {
            scene: 'Un encuentro',
            prompt: 'Escribe sobre una persona que vino a verte o que fuiste a ver (usa vieram/vim/fui/viu).',
            answer: 'Meu amigo veio me visitar e nós fomos jantar juntos.',
            accepted: ['vieram', 'vim', 'veio', 'fui', 'fomos', 'foram', 'vimos', 'vi', 'viu'],
            explain: 'Ejemplo: Minha amiga veio de visita. / Eu fui visitar minha família. / Nós nos vimos no café.',
          },
          {
            scene: 'Una novedad',
            prompt: 'Cuenta algo que supiste, dijiste o pudiste (no pudiste) hacer esta semana.',
            answer: 'Soube que meu colega vai se casar. Não pude ir à festa porque estava doente.',
            accepted: ['soube', 'disse', 'pude', 'pudemos', 'quis', 'quisemos', 'disseram', 'dissemos'],
            explain: 'Usa: soube (saber), disse (dizer), pude/pudemos (poder), quis/quisemos (querer).',
          },
        ],
      },
    ],
  },
}

export default topic
