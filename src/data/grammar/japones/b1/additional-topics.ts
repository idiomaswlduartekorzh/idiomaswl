import { buildExpandedTopic } from '../build-expanded-topic'

export const wakeDewaNai = buildExpandedTopic({
  slug: 'wake-dewa-nai-b1', order: '21', color: '#7c3aed', category: 'Matiz y negación', level: 'B1',
  title: '〜わけではない en japonés B1: negar una conclusión sin negar todo', shortTitle: '〜わけではない', metaTitle: 'wake dewa nai japonés B1: negación parcial y matiz',
  description: '〜わけではない corrige una interpretación demasiado amplia: «no es que…», «no significa que…» o «no necesariamente». Permite disentir sin convertir la respuesta en un no absoluto y es esencial para expresar opiniones matizadas.',
  lead: 'No todo desacuerdo necesita un “no” total: 〜わけではない recorta exactamente la conclusión que no aceptas.',
  outcomes: ['Negar una interpretación parcial', 'Usar 全部・必ず・いつも con negación matizada', 'Distinguir わけではない de わけがない'],
  guide: { goal: 'Matizar opiniones y corregir inferencias con precisión.', model: '日本料理が嫌いなわけではありません。ただ、魚が苦手なんです。', formula: 'forma llana + わけではない', decisions: ['Identifica la conclusión que el oyente podría sacar.', 'Niega esa conclusión, no necesariamente el hecho completo.', 'Añade una aclaración con ただ, でも o というより.', 'Usa わけがない solo cuando la posibilidad es imposible.'], table: [['Forma', 'Matiz', 'Ejemplo'], ['わけではない', 'no es que', '嫌いなわけではない'], ['全部〜わけではない', 'no todo', '全部読んだわけではない'], ['必ずしも〜わけではない', 'no necesariamente', '必ずしも正しいわけではない'], ['わけがない', 'imposible', '忘れるわけがない']], mistakes: ['No traduzcas siempre como una negación absoluta.', 'Con nombre o adjetivo な se usa なわけではない.', 'わけがない expresa imposibilidad y no es intercambiable.'] },
  seo: [
    { heading: '¿Qué niega exactamente 〜わけではない?', paragraphs: ['Niega la interpretación o generalización, no todos los hechos. 高いものが全部いいわけではない significa que no todo lo caro es bueno; no afirma que nada caro sea bueno.'] },
    { heading: '¿Cómo suaviza un desacuerdo?', paragraphs: ['嫌いなわけではありません permite corregir «entonces lo odias» y después explicar el matiz. Es útil en conversaciones donde un no tajante cerraría demasiado la interpretación.'] },
    { heading: '¿En qué se diferencia de わけがない?', paragraphs: ['わけではない limita una conclusión; わけがない declara que algo no puede ocurrir o ser cierto. 忘れたわけではない es «no es que lo olvidara»; 忘れるわけがない es «es imposible que lo olvide».'] },
  ],
  visual: { mode: 'scope', teacherLens: 'La negación no borra toda la frase: reduce el alcance de una conclusión.', graphicPrompt: 'Un círculo grande de generalización se recorta para mostrar la excepción.', scene: [['嫌いなわけではない', 'no es que no me guste'], ['全部〜わけではない', 'no todo'], ['必ずしも〜ない', 'no necesariamente'], ['わけがない', 'imposibilidad total']], learnerModes: ['visual: alcance', 'analítico: parcial vs total', 'oral: desacuerdo amable'], reviewFocus: ['alcance de la negación', 'なわけではない', 'vs わけがない'] },
  practiceSeed: {
    choices: [
      { scene: 'Gusto matizado', lines: [['A', '嫌いな___。ただ、今日は食べたくないです。']], options: ['わけではありません', 'わけがありません', 'はずです', 'べきです'], answer: 'わけではありません', explain: 'No niega el gusto por completo.' },
      { scene: 'Generalización', lines: [['A', '高いものが全部いい___。']], options: ['わけではない', 'に違いない', 'ことになる', 'そうだ'], answer: 'わけではない', explain: 'No todo lo caro es bueno.' },
      { scene: 'No necesariamente', lines: [['A', '経験が長ければ、必ず成功する___。']], options: ['わけではない', 'わけがない', 'はずがある', 'べきだった'], answer: 'わけではない', explain: 'Corrige una relación automática.' },
      { scene: 'Imposibilidad', lines: [['A', '彼が約束を忘れる___。']], options: ['わけがない', 'わけではない', 'ところだ', 'たびに'], answer: 'わけがない', explain: 'Aquí se niega la posibilidad completa.' },
    ],
    duals: [
      { scene: 'Trabajo', lines: [['A', '仕事が嫌いな[[0]]。ただ、残業が多いのは[[1]]。']], blanks: [{ options: ['わけではありません', 'わけがありません'], answer: 'わけではありません', explain: 'Negación parcial.' }, { options: ['困ります', '困るわけがない'], answer: '困ります', explain: 'Se aclara el problema real.' }] },
      { scene: 'Estudio', lines: [['A', '全部[[0]]わけではないですが、要点は[[1]]。']], blanks: [{ options: ['分かった', '分かるがない'], answer: '分かった', explain: 'Forma llana pasada.' }, { options: ['理解しました', '理解するわけがない'], answer: '理解しました', explain: 'Aclaración positiva.' }] },
    ],
    guided: { scene: 'Opinión sobre vivir en Japón', text: '日本での生活が楽な[[0]]。でも、毎日が大変な[[1]]。', blanks: [{ options: ['わけではありません', 'わけがありません'], answer: 'わけではありません', explain: 'Niega una simplificación.' }, { options: ['わけでもありません', 'に違いありません'], answer: 'わけでもありません', explain: 'Añade el matiz opuesto.' }] },
    free: { scene: 'Alcance', text: '有名なら必ずおいしい___。行きたくない___、今日は時間がありません。', blanks: [{ answer: 'わけではない', explain: 'No necesariamente.' }, { answer: 'わけではなく', accepted: ['わけではありません'], explain: 'Se corrige la inferencia.' }] },
    writes: [
      { scene: 'Preferencia', prompt: 'Di: No es que no me guste; hoy no tengo hambre.', answer: '嫌いなわけではありません。今日はおなかがすいていないんです。', explain: 'La segunda frase aclara el matiz.' },
      { scene: 'Generalización', prompt: 'Di: No todo lo barato es malo.', answer: '安いものが全部悪いわけではありません。', explain: '全部 delimita la generalización.' },
      { scene: 'Opinión', prompt: 'Di: Tener experiencia no significa necesariamente tener razón.', answer: '経験があるからといって、必ず正しいわけではありません。', explain: 'Negación de una inferencia automática.' },
    ],
  },
})

export const kotoNiNatteIru = buildExpandedTopic({
  slug: 'koto-ni-natte-iru-b1', order: '22', color: '#2563eb', category: 'Normas y sistemas', level: 'B1',
  title: '〜ことになっている en japonés B1: reglas, acuerdos y funcionamiento', shortTitle: '〜ことになっている', metaTitle: 'koto ni natte iru japonés B1: reglas y acuerdos',
  description: '〜ことになっている presenta una regla, un acuerdo o una disposición vigente que no depende solamente de la voluntad del hablante. Es la estructura de manuales, normas de convivencia, horarios y procedimientos.',
  lead: 'Cuando la regla ya existe —aunque nadie la repita ahora—, 〜ことになっている la presenta como sistema vigente.',
  outcomes: ['Explicar normas y acuerdos', 'Distinguir decisión personal de regla externa', 'Usar la forma negativa ないことになっている'],
  guide: { goal: 'Describir cómo están organizadas las cosas en una institución o grupo.', model: 'この会社では、九時までに出勤することになっています。', formula: 'verbo diccionario／ない + ことになっている', decisions: ['Pregunta si la regla existe fuera de tu voluntad.', 'Usa la forma diccionario para obligación o procedimiento.', 'Usa ない para prohibición o regla negativa.', 'Para una decisión puntual usa ことになった.'], table: [['Forma', 'Uso', 'Ejemplo'], ['ことになっている', 'regla vigente', '九時に始めることになっている'], ['ないことになっている', 'prohibición', '入れないことになっている'], ['ことになった', 'decisión adoptada', '転勤することになった'], ['ことにしている', 'hábito propio', '毎日歩くことにしている']], mistakes: ['No la uses para una decisión exclusivamente personal.', 'なっている señala estado vigente; なった, cambio o decisión.', 'La prohibición se forma con Vない + ことになっている.'] },
  seo: [
    { heading: '¿Qué tipo de regla expresa?', paragraphs: ['Puede ser una norma formal, una costumbre acordada o el funcionamiento previsto de un sistema: ゴミは火曜日に出すことになっています. El hablante informa de una disposición compartida.'] },
    { heading: '¿Cómo se diferencia de ことにしている?', paragraphs: ['ことになっている apunta a una regla externa o colectiva. ことにしている describe una decisión habitual del hablante: 健康のために毎日歩くことにしています.'] },
    { heading: '¿Cuándo se usa ことになった?', paragraphs: ['Cuando quieres contar que se tomó una decisión: 来月、大阪へ転勤することになりました. El foco está en el cambio, no en una norma ya establecida.'] },
  ],
  visual: { mode: 'system-map', teacherLens: 'La estructura separa voluntad personal de norma compartida.', graphicPrompt: 'Un reglamento conecta institución, regla y conducta.', scene: [['ことになっている', 'norma vigente'], ['ないことになっている', 'prohibición'], ['ことになった', 'decisión adoptada'], ['ことにしている', 'hábito propio']], learnerModes: ['visual: sistema', 'analítico: agente de la decisión', 'oral: explicar normas'], reviewFocus: ['regla externa', 'vigente vs decisión', 'forma negativa'] },
  practiceSeed: {
    choices: [
      { scene: 'Empresa', lines: [['A', '九時までに出勤する___。']], options: ['ことになっています', 'ことにしています', 'わけではありません', 'ようとします'], answer: 'ことになっています', explain: 'Es una norma de la empresa.' },
      { scene: 'Prohibición', lines: [['A', 'ここでは写真を撮らない___。']], options: ['ことになっています', 'つもりです', 'たびにあります', '一方です'], answer: 'ことになっています', explain: 'Vない + regla vigente.' },
      { scene: 'Decisión nueva', lines: [['A', '来月、東京へ行くことに___。']], options: ['なりました', 'なっていますか', 'しています', '違いません'], answer: 'なりました', explain: 'Se adoptó una decisión.' },
      { scene: 'Hábito propio', lines: [['A', '毎朝走ることに___。']], options: ['しています', 'なっています', 'なりましたか', 'されます'], answer: 'しています', explain: 'Es una decisión habitual propia.' },
    ],
    duals: [
      { scene: 'Biblioteca', lines: [['A', '本は二週間で[[0]]。館内では電話を[[1]]。']], blanks: [{ options: ['返すことになっています', '返すことにしています'], answer: '返すことになっています', explain: 'Regla de préstamo.' }, { options: ['使わないことになっています', '使わないつもりです'], answer: '使わないことになっています', explain: 'Prohibición institucional.' }] },
      { scene: 'Residencia', lines: [['A', '玄関は十一時に[[0]]。来客は受付に[[1]]。']], blanks: [{ options: ['閉まることになっています', '閉めるつもりです'], answer: '閉まることになっています', explain: 'Funcionamiento previsto.' }, { options: ['知らせることになっています', '知らせてみます'], answer: '知らせることになっています', explain: 'Procedimiento acordado.' }] },
    ],
    guided: { scene: 'Normas del curso', text: '宿題は金曜日までに[[0]]。授業中はスペイン語を[[1]]。', blanks: [{ options: ['出すことになっています', '出すつもりです'], answer: '出すことになっています', explain: 'Plazo del curso.' }, { options: ['使わないことになっています', '使わないと思います'], answer: '使わないことになっています', explain: 'Norma negativa.' }] },
    free: { scene: 'Procedimientos', text: '会議は十時に始まる___。この部屋には入れない___。', blanks: [{ answer: 'ことになっています', explain: 'Horario establecido.' }, { answer: 'ことになっています', explain: 'Regla negativa.' }] },
    writes: [
      { scene: 'Empresa', prompt: 'Di: En esta empresa se debe llegar antes de las nueve.', answer: 'この会社では、九時までに出勤することになっています。', explain: 'Regla institucional.' },
      { scene: 'Museo', prompt: 'Di: Está establecido que no se pueden tomar fotos.', answer: '写真は撮らないことになっています。', explain: 'Vない + norma.' },
      { scene: 'Cambio', prompt: 'Di: Se decidió que trabajaré en Osaka desde abril.', answer: '四月から大阪で働くことになりました。', explain: 'ことになりました presenta la decisión adoptada.' },
    ],
  },
})

export const youToSuru = buildExpandedTopic({
  slug: 'you-to-suru-b1', order: '23', color: '#dc2626', category: 'Intento', level: 'B1',
  title: '〜ようとする en japonés B1: estar a punto o intentar deliberadamente', shortTitle: '〜ようとする', metaTitle: 'you to suru japonés B1: intento y acción inminente',
  description: 'La forma volitiva + とする enfoca el instante en que alguien intenta realizar una acción o algo está a punto de ocurrir. Puede describir esfuerzo intencional, una acción frustrada o una transición inminente.',
  lead: '〜ようとする captura el borde de la acción: el esfuerzo empieza, aunque el resultado todavía no esté asegurado.',
  outcomes: ['Describir intentos observables', 'Narrar una acción interrumpida', 'Expresar un cambio inminente'],
  guide: { goal: 'Narrar con precisión el momento anterior a una acción.', model: '家を出ようとしたとき、電話が鳴りました。', formula: 'forma volitiva + とする', decisions: ['Forma la volitiva correctamente.', 'Usa としたとき para una acción interrumpida.', 'Usa としている para un intento en curso.', 'Con fenómenos no voluntarios, interpreta «estar a punto de».'], table: [['Forma', 'Lectura', 'Ejemplo'], ['ようとする', 'intenta', '開けようとする'], ['ようとした', 'intentó', '出ようとした'], ['ようとしている', 'está intentando', '立とうとしている'], ['日が沈もうとしている', 'inminencia', 'el sol está por ponerse']], mistakes: ['No confundir con ようにする, que expresa esfuerzo habitual.', 'El resultado puede no ocurrir.', 'Con sujetos no humanos suele expresar inminencia, no intención.'] },
  seo: [
    { heading: '¿Cómo describe un intento?', paragraphs: ['ドアを開けようとしました presenta el esfuerzo por abrir la puerta; no confirma que se abriera. Por eso funciona bien al narrar obstáculos o acciones fallidas.'] },
    { heading: '¿Cómo narra una interrupción?', paragraphs: ['Vようとしたとき establece el instante previo: 帰ろうとしたとき、雨が降り始めた. La segunda acción interrumpe o modifica la primera.'] },
    { heading: '¿Cuándo significa «estar a punto de»?', paragraphs: ['Con cambios naturales o sujetos sin voluntad, describe inminencia: 日が沈もうとしている. La forma enfoca el comienzo del cambio.'] },
  ],
  visual: { mode: 'threshold', teacherLens: 'El foco está entre intención y resultado.', graphicPrompt: 'Una puerta entre intención, intento y resultado, con una interrupción.', scene: [['帰ろうとした', 'intentó irse'], ['開けようとしている', 'está intentando abrir'], ['雨が降ろうとしている', 'está por llover'], ['結果は未確定', 'resultado no asegurado']], learnerModes: ['visual: umbral', 'analítico: volitiva + とする', 'oral: narrar interrupciones'], reviewFocus: ['intento', 'inminencia', 'resultado abierto'] },
  practiceSeed: {
    choices: [
      { scene: 'Interrupción', lines: [['A', '家を出ようと___とき、電話が鳴った。']], options: ['した', 'するため', 'しておく', 'したびに'], answer: 'した', explain: 'Intento en el instante previo.' },
      { scene: 'Esfuerzo en curso', lines: [['A', '子どもが立とうと___。']], options: ['しています', 'なっています', 'してあります', 'しまいました'], answer: 'しています', explain: 'Intento observable en curso.' },
      { scene: 'Inminencia', lines: [['A', '日が沈もうと___。']], options: ['しています', 'してみます', 'しておきます', 'するべきです'], answer: 'しています', explain: 'El sol está a punto de ponerse.' },
      { scene: 'Negativa a intentar', lines: [['A', '彼は説明を聞こうと___。']], options: ['しない', 'ならない', 'できないこと', 'おかない'], answer: 'しない', explain: 'No muestra intención de escuchar.' },
    ],
    duals: [
      { scene: 'Salida interrumpida', lines: [['A', '帰ろうと[[0]]とき、上司に[[1]]。']], blanks: [{ options: ['した', 'している'], answer: 'した', explain: 'Instante previo.' }, { options: ['呼ばれました', '呼ぶつもりです'], answer: '呼ばれました', explain: 'Interrupción.' }] },
      { scene: 'Puerta', lines: [['A', 'ドアを[[0]]が、鍵が[[1]]。']], blanks: [{ options: ['開けようとしました', '開けることになりました'], answer: '開けようとしました', explain: 'Intento.' }, { options: ['かかっていました', 'かけようと思います'], answer: 'かかっていました', explain: 'Obstáculo.' }] },
    ],
    guided: { scene: 'En la estación', text: '電車に[[0]]としたとき、ドアが[[1]]。', blanks: [{ options: ['乗ろう', '乗るよう'], answer: '乗ろう', explain: 'Volitiva.' }, { options: ['閉まりました', '閉めようと思います'], answer: '閉まりました', explain: 'Resultado que interrumpe.' }] },
    free: { scene: 'Intento e inminencia', text: '窓を開けよ___としました。雨が降ろうとし___。', blanks: [{ answer: 'う', explain: '開けよう.' }, { answer: 'ています', explain: 'Inminencia.' }] },
    writes: [
      { scene: 'Interrupción', prompt: 'Di: Cuando iba a salir de casa, sonó el teléfono.', answer: '家を出ようとしたとき、電話が鳴りました。', explain: 'Vようとしたとき.' },
      { scene: 'Intento', prompt: 'Di: Está intentando abrir la caja.', answer: '箱を開けようとしています。', explain: 'Intento en curso.' },
      { scene: 'Naturaleza', prompt: 'Di: El sol está a punto de ponerse.', answer: '日が沈もうとしています。', explain: 'Inminencia sin voluntad.' },
    ],
  },
})

export const tabiNi = buildExpandedTopic({
  slug: 'tabi-ni-b1', order: '24', color: '#b45309', category: 'Frecuencia y memoria', level: 'B1',
  title: '〜たびに en japonés B1: cada vez que ocurre algo', shortTitle: '〜たびに', metaTitle: 'tabi ni japonés B1: cada vez que',
  description: '〜たびに conecta un acontecimiento repetido con una reacción que vuelve a aparecer en cada ocasión. Es especialmente útil para hábitos, recuerdos, viajes y cambios acumulativos.',
  lead: '〜たびに no cuenta una frecuencia abstracta: enlaza cada repetición con su consecuencia concreta.',
  outcomes: ['Relacionar eventos repetidos', 'Conectar verbos y nombres', 'Distinguir たびに de とき y いつも'],
  guide: { goal: 'Explicar qué ocurre cada vez que se repite una situación.', model: 'この歌を聞くたびに、故郷を思い出します。', formula: 'verbo diccionario + たびに | nombre + の + たびに', decisions: ['Identifica el evento que se repite.', 'Comprueba que la consecuencia aparece en cada ocasión.', 'Usa la forma diccionario del verbo.', 'Con nombres, añade の.'], table: [['Base', 'Patrón', 'Ejemplo'], ['Verbo', 'Vる + たびに', '会うたびに'], ['Nombre', 'N の + たびに', '旅行のたびに'], ['Cambio', '見るたびに変わる', 'cambia cada vez'], ['Recuerdo', '聞くたびに思い出す', 'recuerda cada vez']], mistakes: ['No uses たびに para un evento único.', 'Con un nombre se necesita の.', 'とき solo sitúa un momento; たびに añade repetición sistemática.'] },
  seo: [
    { heading: '¿Qué aporta frente a いつも?', paragraphs: ['いつも indica frecuencia general. たびに dibuja la relación evento-consecuencia: cada vez que escucho esta canción, recuerdo mi ciudad.'] },
    { heading: '¿Cómo se conecta con nombres?', paragraphs: ['Se usa nombre + の + たびに: 出張のたびに, cada vez que hay un viaje de negocios. Con verbos se usa la forma diccionario: 行くたびに.'] },
    { heading: '¿Puede expresar cambios acumulativos?', paragraphs: ['Sí. 会うたびに日本語が上手になっている muestra que en cada encuentro se observa un avance. La estructura ayuda a narrar evolución.'] },
  ],
  visual: { mode: 'loop', teacherLens: 'Cada vuelta del evento activa la misma consecuencia.', graphicPrompt: 'Bucle evento-consecuencia repetido tres veces.', scene: [['聞くたびに', 'cada vez que escucho'], ['旅行のたびに', 'en cada viaje'], ['会うたびに', 'cada vez que nos vemos'], ['上手になる', 'cambio acumulativo']], learnerModes: ['visual: bucle', 'analítico: Vる / Nの', 'oral: recuerdos'], reviewFocus: ['repetición', 'N のたびに', 'consecuencia'] },
  practiceSeed: {
    choices: [
      { scene: 'Canción', lines: [['A', 'この歌を聞く___、故郷を思い出す。']], options: ['たびに', 'ところに', 'ために', '一方で'], answer: 'たびに', explain: 'Cada escucha activa el recuerdo.' },
      { scene: 'Nombre', lines: [['A', '旅行___たびに、写真をたくさん撮る。']], options: ['の', 'な', 'に', 'で'], answer: 'の', explain: 'Nombre + の + たびに.' },
      { scene: 'Cambio', lines: [['A', '会うたびに、日本語が___。']], options: ['上手になる', '上手なわけだ', '上手の予定だ', '上手に違いない'], answer: '上手になる', explain: 'La consecuencia cambia en cada ocasión.' },
      { scene: 'Evento único', lines: [['A', '昨日、駅に着いた___、雨が降った。']], options: ['とき', 'たびに', 'ほど', 'ばかり'], answer: 'とき', explain: 'Fue una sola ocasión, no repetición.' },
    ],
    duals: [
      { scene: 'Viajes', lines: [['A', '京都へ[[0]]、新しい店を[[1]]。']], blanks: [{ options: ['行くたびに', '行ったところ'], answer: '行くたびに', explain: 'Evento repetido.' }, { options: ['見つけます', '見つけるわけがない'], answer: '見つけます', explain: 'Consecuencia recurrente.' }] },
      { scene: 'Reuniones', lines: [['A', '会議[[0]]、同じ問題が[[1]]。']], blanks: [{ options: ['のたびに', 'なたびに'], answer: 'のたびに', explain: 'Nombre + の.' }, { options: ['出ます', '出る予定でした'], answer: '出ます', explain: 'Consecuencia repetida.' }] },
    ],
    guided: { scene: 'Recuerdo familiar', text: 'この写真を[[0]]、祖母の声を[[1]]。', blanks: [{ options: ['見るたびに', '見たところ'], answer: '見るたびに', explain: 'Cada vez que ve la foto.' }, { options: ['思い出します', '思い出す予定です'], answer: '思い出します', explain: 'Consecuencia recurrente.' }] },
    free: { scene: 'Repetición', text: '出張___たびに、お土産を買います。彼に会う___、元気になります。', blanks: [{ answer: 'の', explain: 'Nombre + の.' }, { answer: 'たびに', explain: 'Verbo + たびに.' }] },
    writes: [
      { scene: 'Música', prompt: 'Di: Cada vez que escucho esta canción, recuerdo mi ciudad.', answer: 'この歌を聞くたびに、故郷を思い出します。', explain: 'Evento y recuerdo recurrentes.' },
      { scene: 'Viaje', prompt: 'Di: En cada viaje aprendo algo nuevo.', answer: '旅行のたびに、新しいことを学びます。', explain: 'N の + たびに.' },
      { scene: 'Progreso', prompt: 'Di: Cada vez que nos vemos, hablas mejor japonés.', answer: '会うたびに、日本語が上手になりますね。', explain: 'Cambio acumulativo.' },
    ],
  },
})

export const ippouDe = buildExpandedTopic({
  slug: 'ippou-de-contraste-b1', order: '25', color: '#0f766e', category: 'Contraste y argumentación', level: 'B1',
  title: '〜一方で en japonés B1: contrastar dos caras de una situación', shortTitle: '〜一方で', metaTitle: 'ippou de japonés B1: por otro lado y contraste',
  description: '一方で organiza un contraste equilibrado entre dos aspectos verdaderos de un mismo tema. Sirve para presentar ventajas y desventajas, comparar tendencias o construir una opinión más completa sin reducirla a «pero».',
  lead: '一方で convierte una opinión lineal en una mirada de dos caras: reconoce un beneficio y también su coste.',
  outcomes: ['Construir contrastes equilibrados', 'Conectar verbos, adjetivos y nombres', 'Redactar una opinión con dos perspectivas'],
  guide: { goal: 'Argumentar mostrando dos aspectos coexistentes.', model: 'オンライン授業は便利な一方で、集中しにくいこともあります。', formula: 'forma llana + 一方で', decisions: ['Presenta primero un aspecto relevante.', 'Añade 一方で para abrir la segunda perspectiva.', 'Mantén un tema común entre las dos partes.', 'Cierra con una valoración o consecuencia si hace falta.'], table: [['Base', 'Conexión', 'Ejemplo'], ['Verbo', 'Vる一方で', '便利になる一方で'], ['Adjetivo い', 'Aい一方で', '安い一方で'], ['Adjetivo な', 'Aな一方で', '便利な一方で'], ['Nombre', 'Nである一方で', '学生である一方で']], mistakes: ['No lo uses para dos hechos sin relación contrastiva.', 'Con adjetivo な se conserva な.', '一方で es más estructurado que でも y frecuente en exposición.'] },
  seo: [
    { heading: '¿Qué diferencia hay entre 一方で y でも?', paragraphs: ['でも introduce un contraste conversacional. 一方で organiza dos dimensiones comparables y suena natural en explicaciones, presentaciones y textos de opinión.'] },
    { heading: '¿Cómo se conecta con adjetivos y nombres?', paragraphs: ['Los adjetivos い mantienen su forma: 安い一方で. Los adjetivos な usan な: 便利な一方で. Los nombres suelen usar である一方で en estilo escrito.'] },
    { heading: '¿Cómo mejora una argumentación?', paragraphs: ['Permite reconocer que dos afirmaciones pueden ser ciertas a la vez. リモートワークは自由な一方で、孤独を感じる人もいる presenta ventaja y problema sin simplificar.'] },
  ],
  visual: { mode: 'balance', teacherLens: 'Dos perspectivas comparten un tema y se equilibran.', graphicPrompt: 'Balanza con ventaja y limitación sobre el mismo tema.', scene: [['便利な一方で', 'por un lado, práctico'], ['集中しにくい', 'por otro, difícil concentrarse'], ['安い一方で', 'precio bajo'], ['品質が不安', 'calidad incierta']], learnerModes: ['visual: balanza', 'analítico: conexión', 'oral: opinión matizada'], reviewFocus: ['tema común', 'Aな一方で', 'contraste equilibrado'] },
  practiceSeed: {
    choices: [
      { scene: 'Clases en línea', lines: [['A', '便利な___、集中しにくいです。']], options: ['一方で', 'たびに', 'ために', 'ところで'], answer: '一方で', explain: 'Contrasta dos aspectos del mismo tema.' },
      { scene: 'Adjetivo い', lines: [['A', 'この店は安い___、駅から遠いです。']], options: ['一方で', 'な一方で', 'の一方で', 'に一方で'], answer: '一方で', explain: 'Adjetivo い + 一方で.' },
      { scene: 'Adjetivo な', lines: [['A', '都会は便利___、生活費が高いです。']], options: ['な一方で', 'の一方で', 'だ一方で', 'に一方で'], answer: 'な一方で', explain: 'Adjetivo な conserva な.' },
      { scene: 'Nombre formal', lines: [['A', '彼は学生である___、会社員でもあります。']], options: ['一方で', 'たびに', 'わけで', 'そうで'], answer: '一方で', explain: 'N である + 一方で.' },
    ],
    duals: [
      { scene: 'Trabajo remoto', lines: [['A', '時間が自由な[[0]]、同僚と話す機会が[[1]]。']], blanks: [{ options: ['一方で', 'たびに'], answer: '一方で', explain: 'Abre el otro lado.' }, { options: ['減ります', '減るに違いないですか'], answer: '減ります', explain: 'Segunda perspectiva.' }] },
      { scene: 'Turismo', lines: [['A', '観光客が増える[[0]]、町のごみも[[1]]。']], blanks: [{ options: ['一方で', 'ために'], answer: '一方で', explain: 'Contraste ligado.' }, { options: ['増えています', '増えるわけがない'], answer: '増えています', explain: 'Consecuencia paralela.' }] },
    ],
    guided: { scene: 'Vida urbana', text: '都会は仕事が多い[[0]]、家賃が[[1]]。', blanks: [{ options: ['一方で', 'たびに'], answer: '一方で', explain: 'Dos caras de vivir en ciudad.' }, { options: ['高いです', '高いわけがない'], answer: '高いです', explain: 'Segundo aspecto.' }] },
    free: { scene: 'Contraste formal', text: 'この方法は簡単な___、時間がかかります。生活は便利になる___、人間関係が薄くなることもあります。', blanks: [{ answer: '一方で', explain: 'Adjetivo な + 一方で.' }, { answer: '一方で', explain: 'Verbo + 一方で.' }] },
    writes: [
      { scene: 'Estudio', prompt: 'Di: Las clases en línea son prácticas, pero por otro lado es difícil concentrarse.', answer: 'オンライン授業は便利な一方で、集中しにくいです。', explain: 'Contraste equilibrado.' },
      { scene: 'Ciudad', prompt: 'Di: La ciudad ofrece mucho trabajo; por otro lado, el alquiler es caro.', answer: '都会は仕事が多い一方で、家賃が高いです。', explain: 'Tema común: vivir en ciudad.' },
      { scene: 'Tecnología', prompt: 'Escribe una frase con dos caras de la tecnología.', answer: '技術は生活を便利にする一方で、新しい問題も生み出します。', explain: 'Dos efectos coexistentes.' },
    ],
  },
})

export const additionalB1Topics = [wakeDewaNai, kotoNiNatteIru, youToSuru, tabiNi, ippouDe]
