import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'expresiones-cotidianas',
  order: '21',
  color: '#dc2626',
  category: '文法',
  level: 'A1',
  title: 'Expresiones cotidianas esenciales en japonés A1',
  shortTitle: 'Expresiones cotidianas',
  metaTitle: 'Expresiones cotidianas japonés A1 — すみません、よろしく、ちょっと待って、わかりません',
  description:
    'El japonés tiene expresiones fijas de alta frecuencia que no siguen la gramática regular. すみません (disculpe/perdón), よろしくおねがいします (encantado/por favor cuéntame con usted), ちょっと待ってください (espera un momento), わかりません (no entiendo). Son esenciales desde el primer día.',
  lead: 'すみません, よろしくおねがいします, わかりません, もう一度おねがいします — estas expresiones japonesas te sacan de cualquier situación. Memorízalas como bloques fijos.',
  outcomes: [
    'Usar expresiones de cortesía y supervivencia en situaciones japonesas reales',
    'Pedir perdón, agradecer, pedir que repitan y expresar incomprensión',
    'Entender el concepto de よろしくおねがいします y cuándo usarlo',
  ],
  guide: {
    goal: 'Dominar las expresiones fijas de mayor utilidad en situaciones cotidianas en Japón.',
    model: 'Expresiones fijas = bloques para memorizar, no analizar.',
    formula: 'すみません / よろしく / わかりません / もう一度 / ありがとうございます',
    decisions: [
      '¿Llamas la atención de alguien o te disculpas? → すみません (Excuse me / Lo siento)',
      '¿Agradeces formalmente? → ありがとうございます (Muchas gracias)',
      '¿No entiendes algo? → わかりません (No entiendo / No sé)',
      '¿Pides que repitan? → もう一度おねがいします (Por favor, otra vez)',
      '¿Te presentas y terminas la presentación? → よろしくおねがいします (Encantado/a de conocerte)',
    ],
    table: [
      ['Expresión', 'Romaji', 'Cuándo usarla'],
      ['すみません', 'sumimasen', 'Disculpe / Perdón / Llamar atención'],
      ['ありがとうございます', 'arigatou gozaimasu', 'Gracias (formal)'],
      ['よろしくおねがいします', 'yoroshiku onegaishimasu', 'Al presentarse / Pedir favor'],
      ['わかりません', 'wakarimasen', 'No entiendo / No sé'],
      ['もう一度おねがいします', 'mou ichido onegaishimasu', 'Por favor, una vez más'],
    ],
    mistakes: [
      'すみません sirve para llamar al camarero, disculparse leve y agradecer a alguien por molestarse — es multifuncional.',
      'ありがとう (sin ございます) es informal entre amigos. Con desconocidos/formalmente: ありがとうございます.',
      'よろしくおねがいします es intraducible literalmente — expresa "espero una buena relación contigo" y se dice al final de toda presentación.',
      'わかりません ≠ しりません. わかりません = No entiendo (proceso). しりません = No lo sé (información que no poseo).',
    ],
  },
  seo: [
    {
      heading: '¿Cuáles son las expresiones más importantes para sobrevivir en japonés A1?',
      paragraphs: [
        'El japonés tiene un conjunto de expresiones rituales que se usan en situaciones muy específicas y que no se pueden deducir de la gramática. すみません (sumimasen) es probablemente la más útil: sirve para llamar la atención, disculparse levemente, y agradecer a alguien por molestarse.',
        'よろしくおねがいします es única del japonés: se dice al final de toda presentación y literalmente significa algo como "por favor trátame bien". No tiene equivalente directo en español y debe memorizarse como fórmula completa.',
      ],
      table: [
        ['Situación', 'Expresión', 'Nota'],
        ['Llamar al camarero', 'すみません', 'Más cortés que gritar o agitar la mano'],
        ['Disculparse leve', 'すみません', 'Para cosas pequeñas; para cosas graves: もうしわけありません'],
        ['Agradecer formal', 'ありがとうございます', 'Con desconocidos y superiores siempre'],
        ['Al presentarse', 'よろしくおねがいします', 'Siempre al final de la presentación'],
        ['No entender', 'わかりません', 'Puede añadir ちょっと... para suavizar'],
        ['Pedir repetición', 'もう一度おねがいします', 'Educado y directo'],
        ['Hablar más despacio', 'ゆっくり話してください', 'En clases y situaciones de aprendizaje'],
      ],
    },
    {
      heading: 'すみません: la expresión más versátil del japonés',
      paragraphs: [
        'すみません (sumimasen) tiene tres usos principales que sorprenden a los estudiantes hispanohablantes. Primero, para llamar la atención ("Disculpe" — como al camarero). Segundo, para disculparse levemente ("Lo siento" — si pisas a alguien). Tercero, para agradecer agradeciendo la molestia causada ("Gracias por molestarte").',
        'Este tercer uso es el más cultural: cuando alguien te ayuda, a veces decir すみません en lugar de ありがとう refleja que entiendes que la persona se ha molestado. Es una muestra de sensibilidad social japonesa.',
      ],
    },
  ],
  visual: {
    mode: 'table-drill',
    teacherLens:
      'よろしくおねがいします has no Spanish equivalent and must be drilled as a full chunk. すみません\'s triple use (excuse me / sorry / thank you for the trouble) is counter-intuitive and needs contextualized practice. Drill through role-play.',
    graphicPrompt:
      'Six scenario illustrations: restaurant (すみません), bow (ありがとう), handshake (よろしく), confused face (わかりません), repeat gesture (もう一度), speech bubble (ゆっくり). Japanese red/white theme.',
    scene: [
      ['すみません', 'すみません！(su-mi-ma-sen) — ¡Disculpe! / Perdón / Llamar atención'],
      ['ありがとう', 'ありがとうございます (a-ri-ga-tou go-za-i-ma-su) — Muchas gracias'],
      ['よろしく', 'よろしくおねがいします (yo-ro-shi-ku) — Encantado/a / Por favor cuente conmigo'],
      ['わかりません', 'わかりません (wa-ka-ri-ma-sen) — No entiendo / No sé'],
      ['もう一度', 'もう一度おねがいします (mou i-chi-do) — Por favor, una vez más'],
      ['ゆっくり', 'ゆっくり話してください (yu-kku-ri) — Por favor hable despacio'],
    ],
    learnerModes: ['recognition', 'transformation', 'gap-fill', 'production'],
    practiceVerbs: ['わかる', 'はなす', 'おねがいする'],
    reviewFocus: ['すみません (3 usos)', 'よろしくおねがいします (al presentarse)', 'わかりません vs しりません'],
  },
  practice: {
    levels: [
      {
        id: 'level-1',
        title: '表現 認識',
        tag: 'Opción múltiple',
        intro: 'Identifica la expresión correcta para cada situación.',
        type: 'choice',
        items: [
          { scene: 'Llamar al camarero', lines: [['', 'Estás en un restaurante y necesitas al camarero. ¿Qué dices?']], options: ['ありがとうございます', 'よろしくおねがいします', 'すみません', 'わかりません'], answer: 'すみません', explain: 'すみません = Disculpe. Se usa para llamar la atención de alguien (camarero, dependiente, etc.).' },
          { scene: 'Agradecer formalmente', lines: [['', 'Tu profesor te ayuda mucho. ¿Qué dices?']], options: ['すみません', 'ありがとうございます', 'わかりません', 'よろしく'], answer: 'ありがとうございます', explain: 'ありがとうございます = Muchas gracias (formal). Con profesores y personas mayores siempre la forma completa.' },
          { scene: 'Final de presentación', lines: [['', 'Te acabas de presentar en clase. Para terminar dices:']], options: ['わかりません', 'すみません', 'よろしくおねがいします', 'ありがとうございます'], answer: 'よろしくおねがいします', explain: 'よろしくおねがいします se dice siempre al final de una presentación en Japón. Es fórmula fija obligatoria.' },
          { scene: 'No entiendo', lines: [['', 'El profesor habla rápido y no entiendes. ¿Qué dices?']], options: ['すみません', 'ありがとうございます', 'よろしく', 'わかりません'], answer: 'わかりません', explain: 'わかりません = No entiendo. También puedes añadir ちょっと antes para suavizar.' },
          { scene: 'Pedir repetición', lines: [['', 'No escuchaste bien. ¿Qué expresión usas para pedir que repitan?']], options: ['わかりません', 'よろしく', 'すみません', 'もう一度おねがいします'], answer: 'もう一度おねがいします', explain: 'もう一度おねがいします = Por favor, una vez más. もう一度 = una vez más, おねがいします = por favor.' },
          { scene: 'すみません multifunción', lines: [['', '¿Cuál NO es un uso correcto de すみません?']], options: ['Llamar la atención', 'Agradecer a alguien por molestarse', 'Disculparse levemente', 'Despedirse al final del día'], answer: 'Despedirse al final del día', explain: 'Para despedirse: またね (informal) o さようなら. すみません NO se usa para despedirse.' },
          { scene: 'Hablar más despacio', lines: [['', 'Quieres que hablen más despacio:']], options: ['わかりません', 'もう一度おねがいします', 'ゆっくり話してください', 'よろしくおねがいします'], answer: 'ゆっくり話してください', explain: 'ゆっくり話してください = Por favor hable despacio. ゆっくり = despacio/lentamente.' },
          { scene: 'Informal vs formal', lines: [['', '¿Cuál forma de "gracias" usarías con tu mejor amigo en Japón?']], options: ['ありがとうございます', 'よろしくおねがいします', 'ありがとう', 'すみません'], answer: 'ありがとう', explain: 'ありがとう (sin ございます) es la forma informal entre amigos. ありがとうございます es formal.' },
        ],
      },
      {
        id: 'level-2',
        title: '場面別 表現 練習',
        tag: '2 espacios',
        intro: 'Completa los diálogos con las expresiones correctas.',
        type: 'dual',
        items: [
          { scene: 'En el restaurante', lines: [['', 'Camarero: ありがとうございます。Tú: [[0]]. No entiendes el menú: [[1]]...']], blanks: [{ options: ['すみません', 'よろしく', 'わかりません', 'ありがとう'], answer: 'すみません', explain: 'すみません = Disculpe. Para llamar al camarero o para agradecer la molestia.' }, { options: ['わかりません', 'ありがとう', 'よろしく', 'もう一度'], answer: 'わかりません', explain: 'わかりません = No entiendo. Ante el menú desconocido.' }] },
          { scene: 'Primera clase de japonés', lines: [['', 'Hugo habla rápido. Tú: [[0]]。 Pides: [[1]]。']], blanks: [{ options: ['ありがとうございます', 'すみません', 'わかりません', 'よろしく'], answer: 'すみません', explain: 'すみません para interrumpir educadamente y llamar la atención del profesor.' }, { options: ['よろしくおねがいします', 'もう一度おねがいします', 'わかりません', 'ありがとう'], answer: 'もう一度おねがいします', explain: 'もう一度おねがいします = Por favor, una vez más.' }] },
          { scene: 'Presentación formal', lines: [['', '"Soy Carlos de Colombia. Encantado." 私はコロンビアのCarlosです。[[0]]。']], blanks: [{ options: ['わかりません', 'すみません', 'よろしくおねがいします', 'ありがとうございます'], answer: 'よろしくおねがいします', explain: 'よろしくおねがいします siempre al final de la presentación. Obligatorio en cultura japonesa.' }, { options: ['(fin)', 'です', 'ます', 'ございます'], answer: '(fin)', explain: 'La frase termina con よろしくおねがいします。 Es la conclusión de la presentación.' }] },
          { scene: 'Recibir ayuda', lines: [['', 'Alguien te ayuda con la maleta. Tú primero dices [[0]], luego cuando termina: [[1]]。']], blanks: [{ options: ['すみません', 'わかりません', 'よろしく', 'もう一度'], answer: 'すみません', explain: 'すみません al recibir ayuda = reconocer la molestia que causas. Muy educado.' }, { options: ['ありがとうございます', 'すみません', 'よろしく', 'わかりません'], answer: 'ありがとうございます', explain: 'ありがとうございます = Muchas gracias al final de la ayuda recibida.' }] },
        ],
      },
      {
        id: 'level-3',
        title: 'かいわ シミュレーション',
        tag: 'Opciones',
        intro: 'Elige la expresión correcta en cada turno del diálogo.',
        type: 'guidedText',
        scene: 'Primer día de Carlos en WeLearn Tokyo',
        text: 'Carlos llega a WeLearn. Hugo: 「ようこそ！」Carlos: 「[[0]]！WeLearnに来ました。」(¡Hola! He venido a WeLearn) Hugo explica las reglas rápido. Carlos: 「[[1]]...はやいです...」(No entiendo. Muy rápido.) Hugo repite. Carlos: 「[[2]]！」(¡Gracias!) Hugo: 「じこしょうかいをしてください」(Preséntate.) Carlos: 「わたしはCarlosです。コロンビアから来ました。日本語をべんきょうします。[[3]]！」Hugo: 「こちらこそ、[[4]]！」',
        blanks: [
          { options: ['わかりません', 'すみません', 'よろしく', 'ありがとうございます'], answer: 'すみません', explain: 'すみません al llegar = Disculpe / Hola (al llamar la atención de Hugo al entrar).' },
          { options: ['ありがとうございます', 'すみません', 'わかりません', 'よろしく'], answer: 'わかりません', explain: 'わかりません = No entiendo. Respuesta natural cuando algo va demasiado rápido.' },
          { options: ['わかりません', 'よろしく', 'ありがとうございます', 'すみません'], answer: 'ありがとうございます', explain: 'ありがとうございます al recibir la repetición. Agradecer la molestia de repetir.' },
          { options: ['ありがとうございます', 'わかりません', 'すみません', 'よろしくおねがいします'], answer: 'よろしくおねがいします', explain: 'よろしくおねがいします al final de toda presentación. Siempre obligatorio en Japón.' },
          { options: ['ありがとうございます', 'すみません', 'よろしくおねがいします', 'わかりません'], answer: 'よろしくおねがいします', explain: 'Hugo responde con こちらこそ (yo también) + よろしくおねがいします. Fórmula recíproca.' },
        ],
      },
      {
        id: 'level-4',
        title: '表現 自由記述',
        tag: 'Sin opciones',
        intro: 'Escribe la expresión japonesa correcta sin opciones.',
        type: 'freeText',
        scene: 'Situaciones reales del día a día en japonés',
        text: '1. Disculpe (para llamar atención): [[0]] 2. Muchas gracias (formal): [[1]] 3. No entiendo: [[2]] 4. Por favor, una vez más: [[3]] 5. Al final de tu presentación: [[4]]',
        blanks: [
          { answer: 'すみません', accepted: ['すみません'], explain: 'すみません = Disculpe / Excuse me. Multifunción: llamar atención, disculparse, agradecer molestia.' },
          { answer: 'ありがとうございます', accepted: ['ありがとうございます', 'ありがとうございました'], explain: 'ありがとうございます (presente), ありがとうございました (pasado — por algo que ya hicieron). Ambas válidas.' },
          { answer: 'わかりません', accepted: ['わかりません', 'ちょっとわかりません'], explain: 'わかりません = No entiendo. ちょっとわかりません = No entiendo muy bien (más suave).' },
          { answer: 'もう一度おねがいします', accepted: ['もう一度おねがいします', 'もういちどおねがいします'], explain: 'もう一度おねがいします = Por favor, una vez más.' },
          { answer: 'よろしくおねがいします', accepted: ['よろしくおねがいします', 'よろしく'], explain: 'よろしくおねがいします al final de la presentación. よろしく es la versión más informal.' },
        ],
      },
      {
        id: 'level-5',
        title: '場面 作文',
        tag: 'Producción',
        intro: 'Usa las expresiones cotidianas en situaciones reales.',
        type: 'write',
        items: [
          { scene: 'En un konbini en Japón', prompt: 'Escribe un mini-diálogo en un convenience store japonés. Usa すみません para llamar la atención, ありがとうございます para agradecer. Al menos 4 turnos.', answer: 'Carlos: すみません！みずはありますか？店員: はい、あちらです。Carlos: ありがとうございます。（支払い後）店員: ありがとうございます。Carlos: ありがとうございました！', accepted: ['すみません', 'ありがとうございます'], explain: 'すみません para llamar atención. ありがとうございます al recibir. ありがとうございました después de terminar.' },
          { scene: 'Clase de japonés — no entiendes', prompt: 'El profesor explica rápido. Escribe 3-4 frases que dirías para pedir clarificación: primero interrumpir, luego decir que no entiendes, luego pedir que repitan más despacio.', answer: 'すみません。ちょっとわかりません。もう一度おねがいします。ゆっくり話してください。ありがとうございます！', accepted: ['すみません', 'わかりません', 'もう一度', 'ゆっくり'], explain: 'Secuencia perfecta para clase: すみません (interrumpir) → わかりません (no entiendo) → もう一度 (repetir) → ゆっくり (más despacio).' },
          { scene: 'Presentación propia', prompt: 'Escribe tu presentación completa en japonés incluyendo todas las fórmulas: saludo, nombre, origen, qué estudias, y よろしくおねがいします al final.', answer: 'はじめまして。わたしはCarlosです。コロンビアから来ました。WeLearnで日本語をべんきょうしています。よろしくおねがいします！', accepted: ['よろしくおねがいします'], explain: 'はじめまして (Encantado/primera vez que nos encontramos) + presentación + よろしくおねがいします al final. Estructura completa.' },
          { scene: 'Rol cultural: すみません vs ありがとう', prompt: 'Explica en 2 frases japonesas una situación donde usarías すみません en lugar de ありがとうございます (cuando alguien te ayuda y quieres reconocer la molestia causada).', answer: 'だれかがたすけてくれました。すみません、ありがとうございます！', accepted: ['すみません', 'ありがとうございます'], explain: 'すみません reconoce la molestia causada. ありがとうございます agradece. En Japón, combinar ambas es muy natural y educado.' },
        ],
      },
      {
        id: 'level-6',
        title: '日本語 サバイバル ミッション',
        tag: 'Producción',
        intro: 'Practica todas las expresiones en un escenario completo.',
        type: 'write',
        items: [
          { scene: 'Primera semana en Japón', prompt: 'Imagina tu primera semana en Japón. Describe 5 situaciones donde usarías cada expresión: すみません, ありがとうございます, わかりません, もう一度おねがいします, y よろしくおねがいします. Una situación por expresión.', answer: '1. コンビニ: すみません！トイレはどこですか？2. 電車: 席をゆずってくれました。ありがとうございます！3. 授業: 先生がはやい...わかりません。4. 電話: もう一度おねがいします。5. 会社: 私はCarlosです。よろしくおねがいします！', accepted: ['すみません', 'ありがとうございます', 'わかりません', 'もう一度', 'よろしくおねがいします'], explain: '日本語で生きるための５つの表現 — the 5 essential survival expressions for Japan.' },
          { scene: '自己紹介と表現', prompt: '日本のクラスで自己紹介をして、最初の会話をしてください。(Haz una autopresentación completa y una conversación inicial.) Usa よろしく, すみません, y ありがとう.', answer: 'はじめまして！私はCarlosです。コロンビアから来ました。日本語が大好きです。よろしくおねがいします！すみません、名前をもう一度おねがいします？ありがとうございます！', accepted: ['よろしくおねがいします', 'すみません', 'ありがとうございます'], explain: 'フル自己紹介 + 会話の流れ — presentación completa y conversación natural con las expresiones de supervivencia.' },
        ],
      },
    ],
  },
}

export default topic
