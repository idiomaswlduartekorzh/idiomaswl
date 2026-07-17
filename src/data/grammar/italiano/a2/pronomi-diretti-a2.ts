import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'pronomi-diretti-a2',
  order: '06',
  color: '#009246',
  category: 'Pronomi',
  level: 'A2',
  title: 'Los pronombres directos en italiano A2 — lo, la, li, le',
  shortTitle: 'Pronombres directos',
  metaTitle: 'Pronombres directos italiano A2 — lo, la, li, le, mi, ti, ci, vi',
  description:
    'Los pronombres de objeto directo (complemento oggetto diretto) reemplazan al sustantivo que recibe directamente la acción del verbo. En italiano son: mi, ti, lo/la, ci, vi, li/le. Van antes del verbo conjugado y se eligen según el género y número del sustantivo que reemplazan.',
  lead: 'lo (él/ello masc. sing.) / la (ella/ello fem. sing.) / li (ellos masc.) / le (ellas fem.) / mi, ti, ci, vi (me, te, nos, os). Van ANTES del verbo.',
  outcomes: [
    'Identificar el complemento directo de una oración y reemplazarlo por el pronombre correcto',
    'Distinguir lo/la/li/le según género y número',
    'Colocar correctamente el pronombre antes del verbo conjugado',
    'Usar mi, ti, ci, vi como pronombres de primera y segunda persona',
  ],

  guide: {
    goal: 'Reemplazar el objeto directo de una oración con el pronombre correcto para evitar repeticiones.',
    model: 'Vedo Marco → Lo vedo. / Compro la pizza → La compro. / Leggo i libri → Li leggo. / Mangio le mele → Le mangio.',
    formula: '[sujeto] + pronombre directo + verbo conjugado',
    decisions: [
      'lo → sustantivo masculino singular: vedo Marco → lo vedo',
      'la → sustantivo femenino singular: compro la pizza → la compro',
      'li → sustantivo masculino plural: leggo i libri → li leggo',
      'le → sustantivo femenino plural: mangio le mele → le mangio',
      'mi → me (objeto directo primera persona): mi vede = me ve',
      'ti → te: ti chiamo domani = te llamo mañana',
      'ci → nos: ci saluta = nos saluda',
      'vi → os: vi vedo domani = os veo mañana',
      'Con infinitivo: il pronombre se une al final del infinitivo sin -e: voglio vederlo, devo comprarlo',
    ],
    table: [
      ['Persona', 'Pronombre directo', 'Ejemplo'],
      ['1ª sing. (io)', 'mi', 'Marco mi vede al bar'],
      ['2ª sing. (tu)', 'ti', 'Ti chiamo stasera'],
      ['3ª sing. masc.', 'lo', 'Lo vedo tutti i giorni (Marco)'],
      ['3ª sing. fem.', 'la', 'La compro al mercato (la pizza)'],
      ['1ª plur. (noi)', 'ci', 'Il professore ci saluta'],
      ['2ª plur. (voi)', 'vi', 'Vi aspetto fuori'],
      ['3ª plur. masc.', 'li', 'Li leggo in biblioteca (i libri)'],
      ['3ª plur. fem.', 'le', 'Le mangio ogni giorno (le mele)'],
    ],
    mistakes: [
      'Colocar el pronombre después del verbo conjugado: Vedo lo ✗ → Lo vedo ✓',
      'Confundir le (pronombre femenino plural) con le (pronombre indirecto): Le telefono (=le llamo por teléfono) vs le leggo (= las leo). El contexto aclara.',
      'Con l\'ausiliare al passato prossimo: Lo ho visto ✗ → L\'ho visto ✓ (la o la se elidon antes de ho/hai/ha)',
    ],
  },

  seo: [
    {
      heading: '¿Qué son los pronombres de objeto directo en italiano?',
      paragraphs: [
        'Los pronombres de objeto directo (pronomi diretti) reemplazan el sustantivo que recibe directamente la acción del verbo, sin preposición. Por ejemplo, en "Compro la pizza", el objeto directo es "la pizza". Para no repetirlo, decimos "La compro".',
        'La posición es fija: siempre van antes del verbo conjugado. Ho visto Marco → L\'ho visto. Mangio le mele → Le mangio. En infinitivo se unen al final: voglio vederlo, devo comprarlo.',
      ],
    },
    {
      heading: 'Lo, la, li, le: concordancia de género y número',
      paragraphs: [
        'La elección del pronombre depende del género y número del sustantivo que reemplaza: lo (masc. sing.), la (fem. sing.), li (masc. plur.), le (fem. plur.). Si el objeto es un grupo mixto, se usa li.',
        'Ante verbo auxiliar (ho, hai, ha…) lo y la se apocopan: l\'. Lo ho mangiato → L\'ho mangiato. La ho vista → L\'ho vista. Con li y le no hay apócope: Li ho visti. Le ho lette.',
      ],
    },
  ],

  visual: {
    mode: 'scene',
    teacherLens: 'El estudiante aprende a sustituir el objeto directo usando lo/la/li/le y coloca el pronombre antes del verbo.',
    graphicPrompt: 'Cuatro casillas: lo, la, li, le con flechas hacia ejemplos de masc/fem/sing/plur.',
    scene: [
      ['Vedo Marco ogni giorno. Lo vedo ogni giorno.', 'Veo a Marco. Lo veo.'],
      ['Compro la pizza. La compro.', 'Compro la pizza. La compro.'],
      ['Leggo i libri. Li leggo.', 'Leo los libros. Los leo.'],
      ['Mangio le mele. Le mangio.', 'Como las manzanas. Las como.'],
    ],
    learnerModes: ['visual: tabla con género y número', 'analítico: identificar objeto directo', 'oral: transformar oraciones'],
    reviewFocus: ['lo/la/li/le según género y número', 'posición antes del verbo', 'apócope ante auxiliar: l\'ho visto'],
  },

  practice: {
    levels: [
      {
        id: 'level-1',
        title: 'El pronombre correcto',
        tag: 'Opción múltiple',
        intro: 'Elige el pronombre de objeto directo correcto para reemplazar el sustantivo subrayado.',
        type: 'choice',
        items: [
          {
            scene: 'El libro',
            lines: [['Marco', '___ leggo ogni sera. (il libro)']],
            options: ['Lo', 'La', 'Li', 'Le'],
            answer: 'Lo',
            explain: 'Il libro = masculino singular → lo. Lo leggo ogni sera.',
          },
          {
            scene: 'La lettera',
            lines: [['Sofia', '___ scrivo domani. (la lettera)']],
            options: ['La', 'Lo', 'Li', 'Le'],
            answer: 'La',
            explain: 'La lettera = femenino singular → la. La scrivo domani.',
          },
          {
            scene: 'I compiti',
            lines: [['David', '___ faccio sempre a casa. (i compiti)']],
            options: ['Li', 'Le', 'Lo', 'La'],
            answer: 'Li',
            explain: 'I compiti = masculino plural → li. Li faccio sempre a casa.',
          },
          {
            scene: 'Le chiavi',
            lines: [['Giulia', 'Non trovo ___ da nessuna parte. (le chiavi)']],
            options: ['le', 'li', 'la', 'lo'],
            answer: 'le',
            explain: 'Le chiavi = femenino plural → le. Non le trovo da nessuna parte.',
          },
          {
            scene: 'Marco',
            lines: [['Ana', '___ vedo ogni martedì. (Marco)']],
            options: ['Lo', 'La', 'Li', 'Le'],
            answer: 'Lo',
            explain: 'Marco = persona masculina singular → lo. Lo vedo ogni martedì.',
          },
          {
            scene: 'Maria e Giulia',
            lines: [['Carlo', '___ chiamo stasera. (Maria e Giulia)']],
            options: ['Le', 'Li', 'La', 'Lo'],
            answer: 'Le',
            explain: 'Maria e Giulia = dos personas femeninas → le. Le chiamo stasera.',
          },
          {
            scene: 'Il caffè',
            lines: [['Luca', '___ prendo sempre senza zucchero. (il caffè)']],
            options: ['Lo', 'La', 'Li', 'Le'],
            answer: 'Lo',
            explain: 'Il caffè = masculino singular → lo. Lo prendo sempre senza zucchero.',
          },
          {
            scene: 'Le email',
            lines: [['Zhanna', '___ controllo ogni mattina. (le email)']],
            options: ['Le', 'Li', 'Lo', 'La'],
            answer: 'Le',
            explain: 'Le email = femenino plural → le. Le controllo ogni mattina.',
          },
        ],
      },
      {
        id: 'level-2',
        title: 'Pronombre + verbo',
        tag: '2 espacios',
        intro: 'Completa con el pronombre directo y la forma verbal correcta.',
        type: 'dual',
        items: [
          {
            scene: 'La pizza del viernes',
            lines: [['Marco', '— Ordini la pizza stasera? — Sì, [[0]] [[1]] sempre il venerdì.']],
            blanks: [
              { options: ['la', 'lo', 'le', 'li'], answer: 'la', explain: 'La pizza = femenino singular → la.' },
              { options: ['ordino', 'ordina', 'ordiniamo'], answer: 'ordino', explain: 'Io ordino (primera persona singular).' },
            ],
          },
          {
            scene: 'Los exámenes',
            lines: [['Sofia', '— Hai studiato gli esami? — Sì, [[0]] [[1]] tutta la settimana.']],
            blanks: [
              { options: ['li', 'le', 'lo', 'la'], answer: 'li', explain: 'Gli esami = masculino plural → li.' },
              { options: ['ho studiati', 'ho studiato', 'ho studiate'], answer: 'ho studiato', explain: 'Con avere il participio es invariable: ho studiato (aunque li lo precede en este contexto de respuesta).' },
            ],
          },
          {
            scene: 'Las llaves',
            lines: [['Giulia', '— Dove sono le chiavi? — Non [[0]] [[1]]. Cerca in borsa!']],
            blanks: [
              { options: ['le', 'li', 'la', 'lo'], answer: 'le', explain: 'Le chiavi = femenino plural → le.' },
              { options: ['trovo', 'trova', 'trovano'], answer: 'trovo', explain: 'Io non le trovo.' },
            ],
          },
          {
            scene: 'El número de teléfono',
            lines: [['David', '— Hai il numero di Luca? — Sì, [[0]] [[1]] qui.']],
            blanks: [
              { options: ['lo', 'la', 'li', 'le'], answer: 'lo', explain: 'Il numero = masculino singular → lo.' },
              { options: ['ho', 'sono', 'avevo'], answer: 'ho', explain: 'Tener algo: avere → ho (primera persona).' },
            ],
          },
        ],
      },
      {
        id: 'level-3',
        title: 'Un día en el mercado',
        tag: 'Texto guiado',
        intro: 'Completa el texto con los pronombres directos correctos.',
        type: 'guidedText',
        scene: 'Sofia va al mercado y describe lo que compra',
        text: 'Al mercato compro molte cose. Le mele? [[0]] compro sempre fresche. Il pane? [[1]] prendo dal fornaio. Le verdure? [[2]] scelgo con cura. Il formaggio? [[3]] assaggio prima di comprare. I pomodori? [[4]] uso per la pasta.',
        blanks: [
          { options: ['Le', 'Li', 'Lo', 'La'], answer: 'Le', explain: 'Le mele = femenino plural → le.' },
          { options: ['Lo', 'La', 'Li', 'Le'], answer: 'Lo', explain: 'Il pane = masculino singular → lo.' },
          { options: ['Le', 'Li', 'Lo', 'La'], answer: 'Le', explain: 'Le verdure = femenino plural → le.' },
          { options: ['Lo', 'La', 'Li', 'Le'], answer: 'Lo', explain: 'Il formaggio = masculino singular → lo.' },
          { options: ['Li', 'Le', 'Lo', 'La'], answer: 'Li', explain: 'I pomodori = masculino plural → li.' },
        ],
      },
      {
        id: 'level-4',
        title: 'Sin opciones',
        tag: 'Texto libre',
        intro: 'Escribe el pronombre directo correcto según el sustantivo dado.',
        type: 'freeText',
        scene: 'Marco habla de sus hábitos cotidianos',
        text: 'Il caffè? [[0]] bevo ogni mattina. Le notizie? [[1]] leggo sul telefono. I messaggi? [[2]] rispondo subito. La palestra? [[3]] frequento tre volte a settimana. I film? [[4]] guardo il sabato sera.',
        blanks: [
          { answer: 'Lo', explain: 'Il caffè = masculino singular → lo.' },
          { answer: 'Le', explain: 'Le notizie = femenino plural → le.' },
          { answer: 'Li', explain: 'I messaggi = masculino plural → li.' },
          { answer: 'La', explain: 'La palestra = femenino singular → la.' },
          { answer: 'Li', explain: 'I film = masculino plural → li.' },
        ],
      },
      {
        id: 'level-5',
        title: 'Transformar oraciones',
        tag: 'Escritura guiada',
        intro: 'Reescribe la oración reemplazando el objeto directo con el pronombre correcto.',
        type: 'write',
        items: [
          {
            scene: 'La música',
            prompt: 'Ascolto la musica ogni giorno. → ___ ogni giorno.',
            answer: 'La ascolto ogni giorno.',
            accepted: ['la ascolto ogni giorno'],
            explain: 'La musica = femenino singular → la. La ascolto ogni giorno.',
          },
          {
            scene: 'Los amigos',
            prompt: 'Vedo i miei amici il weekend. → ___ il weekend.',
            answer: 'Li vedo il weekend.',
            accepted: ['li vedo il weekend'],
            explain: 'I miei amici = masculino plural → li. Li vedo il weekend.',
          },
          {
            scene: 'El libro',
            prompt: 'Ho finito il libro ieri. → ___ ieri.',
            answer: "L'ho finito ieri.",
            accepted: ["l'ho finito ieri", 'lo ho finito ieri'],
            explain: "Il libro = masculino singular → lo. Ante auxiliar ho → l'ho finito.",
          },
          {
            scene: 'Las fotos',
            prompt: 'Guardo le foto delle vacanze. → ___ spesso.',
            answer: 'Le guardo spesso.',
            accepted: ['le guardo spesso'],
            explain: 'Le foto = femenino plural → le. Le guardo spesso.',
          },
        ],
      },
      {
        id: 'level-6',
        title: 'Respuestas con pronombres',
        tag: 'Escritura libre',
        intro: 'Responde a las preguntas usando el pronombre directo correcto.',
        type: 'write',
        items: [
          {
            scene: 'La pizza',
            prompt: '— Mangi spesso la pizza? — Sì, ___ (responde con pronombre)',
            answer: 'Sì, la mangio spesso.',
            accepted: ['la mangio', 'sì la mangio'],
            explain: 'La pizza = femenino singular → la. Sì, la mangio spesso.',
          },
          {
            scene: 'Los libros',
            prompt: '— Leggi i libri in italiano? — No, ___ (responde negativamente con pronombre)',
            answer: 'No, non li leggo in italiano.',
            accepted: ['non li leggo', 'no non li leggo'],
            explain: 'I libri = masculino plural → li. Non li leggo.',
          },
          {
            scene: 'Tu actividad favorita',
            prompt: 'Cosa fai con la musica? ___ (usa il pronombre diretto)',
            answer: 'La ascolto ogni sera mentre cucino.',
            accepted: ['la ascolto', 'la sento', 'la metto'],
            explain: 'La musica = femenino singular → la. La ascolto/sento/metto...',
          },
        ],
      },
    ],
  },
}

export default topic
