import { buildExpandedTopic } from '../build-expanded-topic'

const color = '#0f766e'

export const nodeKara = buildExpandedTopic({
  slug: 'node-kara-causa-a2', order: '21', color, category: 'Causa y explicación', level: 'A2',
  title: 'ので y から en japonés A2: explicar causas con el tono adecuado', shortTitle: 'ので vs から', metaTitle: 'ので y から en japonés A2: diferencias y ejemplos',
  description: 'ので y から conectan una causa con su resultado, pero no proyectan el mismo tono. ので presenta la razón como circunstancia compartida y suele sonar más suave; から expresa una razón más directa y personal. Para un hispanohablante, la clave no es traducir ambos como «porque», sino decidir cuánta firmeza necesita la situación.',
  lead: 'Aprende a dar una razón sin sonar más tajante de lo que pretendes: ので suaviza la explicación; から la presenta con voz propia.',
  outcomes: ['Elegir ので o から según relación y tono', 'Conectar verbos, adjetivos y nombres con la forma correcta', 'Pedir, rechazar o justificar con cortesía'],
  guide: { goal: 'Dar razones naturales en conversaciones cotidianas y de servicio.', model: 'アレルギーがあるので、食べられません。(Como tengo alergia, no puedo comerlo.)', formula: 'causa + ので／から、resultado', decisions: ['Usa ので cuando la razón funciona como explicación neutral o cortés.', 'Usa から para una razón directa, una decisión propia o una conversación cercana.', 'Antes de ので, los nombres y adjetivos な toman な: 学生なので、静かなので.', 'No cierres una petición formal con una causa brusca si ので comunica mejor consideración.'], table: [['Forma', 'Construcción', 'Matiz'], ['Verbo', '行けないので', 'circunstancia'], ['Adjetivo い', '高いから', 'razón directa'], ['Nombre / な', '休みなので', 'な + ので'], ['Nombre / な', '便利だから', 'だ + から']], mistakes: ['No uses だので: con nombre o adjetivo な se dice なので.', 'から no es incorrecto en registro cortés, pero puede sonar más afirmativo.', 'La causa suele ir antes del resultado, aunque en conversación el resultado puede quedar implícito.'] },
  seo: [
    { heading: '¿Cuál es la diferencia real entre ので y から?', paragraphs: ['Ambas estructuras explican una causa. ので encuadra esa causa como una circunstancia que el interlocutor puede comprender; から pone más foco en el razonamiento o decisión del hablante. Por eso ので aparece con frecuencia al rechazar, pedir disculpas o solicitar algo.'] },
    { heading: '¿Cómo se unen a nombres y adjetivos な?', paragraphs: ['Con ので aparece な: 雨なので y 静かなので. Con から aparece だ en estilo llano: 雨だから y 静かだから. Los verbos y adjetivos い se conectan en su forma llana: 行けないので, 高いから.'] },
    { heading: '¿Qué conviene usar al hablar con desconocidos?', paragraphs: ['Cuando la explicación acompaña una petición o una negativa, ので suele ser una opción segura: 今日は予定があるので、参加できません. から puede funcionar, pero transmite una posición más directa.'] },
  ],
  visual: { mode: 'tone-scale', teacherLens: 'La misma causa cambia de tono: ので amortigua; から afirma.', graphicPrompt: 'Dos rutas desde una causa hasta un resultado, una suave y otra directa.', scene: [['予定があるので…', 'explicación considerada'], ['時間がないから…', 'razón directa'], ['静かなので', 'adjetivo な + ので'], ['休みだから', 'nombre + だから']], learnerModes: ['visual: escala de tono', 'analítico: forma de enlace', 'oral: rechazo cortés'], reviewFocus: ['な + ので', 'だ + から', 'tono interpersonal'] },
  practiceSeed: {
    choices: [
      { scene: 'Rechazo cortés', lines: [['店員', 'アレルギーがある___、これは食べられません。']], options: ['ので', 'のに', 'ても', 'ながら'], answer: 'ので', explain: 'La circunstancia explica una negativa con tono considerado.' },
      { scene: 'Decisión directa', lines: [['友だち', '疲れた___、今日は帰る。']], options: ['から', 'まで', 'しか', 'ほど'], answer: 'から', explain: 'El hablante comunica directamente su razón.' },
      { scene: 'Adjetivo な', lines: [['会社', 'この町は便利___、住みやすいです。']], options: ['なので', 'だので', 'ので', 'なから'], answer: 'なので', explain: '便利 es adjetivo な: 便利なので.' },
      { scene: 'Nombre', lines: [['学校', '明日は休み___、図書館は閉まっています。']], options: ['なので', 'のに', 'ても', 'ながら'], answer: 'なので', explain: '休み + な + ので.' },
    ],
    duals: [
      { scene: 'Reserva', lines: [['客', '子どもが[[0]]、禁煙席で[[1]]。']], blanks: [{ options: ['いるので', 'いるのに', 'いるまで'], answer: 'いるので', explain: 'Razón considerada.' }, { options: ['お願いします', 'ありません', 'しまいます'], answer: 'お願いします', explain: 'La razón conduce a una petición.' }] },
      { scene: 'Plan personal', lines: [['友だち', '明日は早い[[0]]、もう[[1]]。']], blanks: [{ options: ['から', 'のでに', 'しか'], answer: 'から', explain: 'Razón directa.' }, { options: ['寝る', '寝たこと', '寝ながら'], answer: '寝る', explain: 'Resultado de la decisión.' }] },
    ],
    guided: { scene: 'Mensaje al profesor', text: '先生、熱が[[0]]、今日は授業に[[1]]。宿題はメールで送ります。', blanks: [{ options: ['あるので', 'あるからに', 'あっても'], answer: 'あるので', explain: 'Motivo cortés.' }, { options: ['参加できません', '参加したことです', '参加しながら'], answer: '参加できません', explain: 'Resultado de la causa.' }] },
    free: { scene: 'Dos tonos', text: '電車が遅れた___、少し遅れます。おなかがすいた___、何か食べよう。', blanks: [{ answer: 'ので', explain: 'Explicación al interlocutor.' }, { answer: 'から', explain: 'Decisión directa del hablante.' }] },
    writes: [
      { scene: 'Restaurante', prompt: 'Di con cortesía: Como tengo alergia, no puedo comer huevo.', answer: 'アレルギーがあるので、卵は食べられません。', explain: 'ので presenta la circunstancia sin confrontación.' },
      { scene: 'Trabajo', prompt: 'Explica: Como mañana trabajo temprano, hoy me voy a casa.', answer: '明日は早く仕事があるので、今日は帰ります。', explain: 'La razón precede la decisión.' },
      { scene: 'Amigos', prompt: 'Di de forma cercana: Como estoy cansado, no voy.', answer: '疲れたから、行かない。', explain: 'から encaja con una decisión directa e informal.' },
    ],
  },
})

export const teOku = buildExpandedTopic({
  slug: 'te-oku-preparacion-a2', order: '22', color: '#2563eb', category: 'Preparación', level: 'A2',
  title: '〜ておく en japonés A2: preparar algo antes de que haga falta', shortTitle: '〜ておく', metaTitle: 'te oku japonés A2: preparación y dejar algo hecho',
  description: '〜ておく expresa una acción realizada con antelación o un estado que se deja intencionalmente tal como está. Conecta el presente con una necesidad futura: reservar antes del viaje, comprar antes de la fiesta o dejar una puerta abierta por una razón.',
  lead: 'No es solo «hacer antes»: 〜ておく muestra que preparas el terreno para lo que viene.',
  outcomes: ['Expresar preparativos conscientes', 'Distinguir preparar de mantener un estado', 'Reconocer la contracción coloquial 〜とく'],
  guide: { goal: 'Hablar de preparativos útiles para viajes, estudio y trabajo.', model: '旅行の前に、ホテルを予約しておきます。(Antes del viaje, reservaré el hotel.)', formula: 'verbo en て + おく', decisions: ['Identifica la situación futura.', 'Elige la acción que conviene completar antes.', 'Usa ておく para el preparativo.', 'Si mantienes un estado, explica para qué: ドアを開けておく.'], table: [['Uso', 'Ejemplo', 'Sentido'], ['Preparación', '予約しておく', 'reservar con antelación'], ['Prevención', '調べておく', 'averiguar antes'], ['Mantener', '開けておく', 'dejar abierto'], ['Coloquial', '買っとく', '買っておく']], mistakes: ['No confundas ておく con てある: ておく enfoca la acción preparatoria; てある, el resultado visible.', 'おく se conjuga: しておきました, しておかない.', 'La contracción とく pertenece a la conversación informal.'] },
  seo: [
    { heading: '¿Qué intención añade 〜ておく?', paragraphs: ['Añade una mirada al futuro: haces algo ahora porque después será útil. チケットを買っておきます no es solo comprar el billete, sino dejarlo resuelto antes de necesitarlo.'] },
    { heading: '¿Cómo expresa que algo se deja como está?', paragraphs: ['Con verbos como 開ける o つける, ておく puede significar mantener deliberadamente un estado: 暑いので、窓を開けておきます, dejaré la ventana abierta porque hace calor.'] },
    { heading: '¿Qué significa 〜とく en conversación?', paragraphs: ['ておく se contrae a とく: 買っておく → 買っとく; でおく pasa a どく: 読んでおく → 読んどく. Conviene reconocerlo, aunque al principio puedes producir la forma completa.'] },
  ],
  visual: { mode: 'timeline', teacherLens: 'Una acción de ahora elimina una dificultad futura.', graphicPrompt: 'Línea ahora-preparación-futuro con maleta, reserva y ventana abierta.', scene: [['今', '準備する'], ['予約しておく', 'viaje resuelto'], ['調べておく', 'información lista'], ['開けておく', 'estado mantenido']], learnerModes: ['visual: línea temporal', 'analítico: intención futura', 'oral: planificar'], reviewFocus: ['て形 + おく', 'preparación', '〜とく'] },
  practiceSeed: {
    choices: [
      { scene: 'Viaje', lines: [['A', 'ホテルを予約して___。']], options: ['おきます', 'みます', 'います', 'しまいます'], answer: 'おきます', explain: 'La reserva se completa antes del viaje.' },
      { scene: 'Examen', lines: [['A', 'この漢字を復習して___ほうがいいです。']], options: ['おいた', 'いた', 'みた', 'あった'], answer: 'おいた', explain: 'ておいたほうがいい recomienda prepararse.' },
      { scene: 'Ventana', lines: [['A', '暑いので、窓を開けて___。']], options: ['おきます', 'ありますか', 'みません', 'しまいました'], answer: 'おきます', explain: 'Se deja abierta intencionalmente.' },
      { scene: 'Coloquial', lines: [['A', '飲み物、買っ___ね。']], options: ['とく', 'てる', 'ちゃう', 'たこと'], answer: 'とく', explain: '買っとく es la contracción de 買っておく.' },
    ],
    duals: [
      { scene: 'Fiesta', lines: [['A', '先に食べ物を[[0]]、部屋も[[1]]。']], blanks: [{ options: ['買っておきます', '買っています', '買ってみます'], answer: '買っておきます', explain: 'Compra previa.' }, { options: ['掃除しておきます', '掃除しています', '掃除したことです'], answer: '掃除しておきます', explain: 'Preparativo previo.' }] },
      { scene: 'Reunión', lines: [['A', '資料を[[0]]、質問を[[1]]。']], blanks: [{ options: ['読んでおきます', '読んでいます', '読んでしまう'], answer: '読んでおきます', explain: 'Lectura previa.' }, { options: ['考えておきます', '考えていますか', '考えたこと'], answer: '考えておきます', explain: 'Preparar preguntas.' }] },
    ],
    guided: { scene: 'Antes de viajar', text: '出発の前に、切符を[[0]]。天気も[[1]]。', blanks: [{ options: ['買っておきます', '買っています', '買ってみます'], answer: '買っておきます', explain: 'Billete listo.' }, { options: ['調べておきます', '調べています', '調べてしまいます'], answer: '調べておきます', explain: 'Consulta previa.' }] },
    free: { scene: 'Preparativos', text: '会議の前に資料を読んで___。あとで使うので、この箱はここに置いて___。', blanks: [{ answer: 'おきます', explain: 'Preparación.' }, { answer: 'おきます', explain: 'Mantener la caja en esa posición.' }] },
    writes: [
      { scene: 'Viaje', prompt: 'Di: Reservaré el hotel antes del viaje.', answer: '旅行の前に、ホテルを予約しておきます。', explain: 'Reserva anticipada.' },
      { scene: 'Clase', prompt: 'Di: Leeré el texto antes de la clase.', answer: '授業の前に、文章を読んでおきます。', explain: 'Lectura como preparación.' },
      { scene: 'Oficina', prompt: 'Di: Dejaré la puerta abierta.', answer: 'ドアを開けておきます。', explain: 'Se conserva un estado intencionalmente.' },
    ],
  },
})

export const teMiru = buildExpandedTopic({
  slug: 'te-miru-intentar-a2', order: '23', color: '#b45309', category: 'Experiencia', level: 'A2',
  title: '〜てみる en japonés A2: probar una acción y descubrir el resultado', shortTitle: '〜てみる', metaTitle: 'te miru japonés A2: intentar y probar a hacer algo',
  description: '〜てみる significa intentar o probar una acción para ver qué ocurre. A diferencia de una simple intención, presupone curiosidad, comprobación o una primera experiencia: pedir un plato nuevo, usar una aplicación o hablar en japonés.',
  lead: 'Con 〜てみる no prometes un resultado: das el paso para comprobarlo por ti mismo.',
  outcomes: ['Proponer una prueba', 'Contar que intentaste algo', 'Diferenciar てみる de la forma potencial'],
  guide: { goal: 'Probar acciones nuevas y comentar el resultado.', model: 'この料理を食べてみます。(Voy a probar este plato.)', formula: 'verbo en て + みる', decisions: ['Elige una acción que puedas realizar voluntariamente.', 'Añade てみる cuando el propósito sea probar o comprobar.', 'Conjuga みる: てみたい, てみた, てみませんか.', 'Usa la forma potencial si hablas de capacidad, no de intento.'], table: [['Forma', 'Ejemplo', 'Función'], ['Presente', '使ってみる', 'probar a usar'], ['Pasado', '行ってみた', 'intenté ir'], ['Deseo', '話してみたい', 'quisiera probar'], ['Invitación', '食べてみませんか', '¿quieres probar?']], mistakes: ['食べられる expresa poder comer; 食べてみる, probar a comer.', 'みる aquí se escribe a menudo en hiragana porque funciona como auxiliar.', 'El resultado puede ser positivo o negativo: lo importante es la prueba.'] },
  seo: [
    { heading: '¿Qué diferencia hay entre intentar y poder?', paragraphs: ['日本語で話してみます significa que probarás a hablar en japonés. 日本語で話せます significa que tienes la capacidad de hacerlo. てみる describe la acción experimental; la forma potencial describe capacidad.'] },
    { heading: '¿Cómo se invita a alguien a probar algo?', paragraphs: ['Con てみませんか haces una invitación suave: このケーキを食べてみませんか. También puedes recomendar con てみてください, literalmente «prueba a hacerlo».'] },
    { heading: '¿Cómo se cuenta una prueba pasada?', paragraphs: ['Con てみた narras que realizaste el intento: 新しいアプリを使ってみた. Después suele aparecer una valoración: 便利でした o 難しかったです.'] },
  ],
  visual: { mode: 'experiment', teacherLens: 'Acción, prueba y descubrimiento forman una secuencia.', graphicPrompt: 'Tres pasos: curiosidad, acción de prueba y resultado observado.', scene: [['気になる', 'curiosidad'], ['食べてみる', 'probar'], ['使ってみた', 'experiencia pasada'], ['どうだった？', 'evaluar']], learnerModes: ['visual: ciclo de prueba', 'analítico: て形 + みる', 'oral: recomendar'], reviewFocus: ['intento vs capacidad', 'てみたい', 'てみませんか'] },
  practiceSeed: {
    choices: [
      { scene: 'Plato nuevo', lines: [['A', 'この料理を食べて___。']], options: ['みます', 'います', 'おきます', 'あります'], answer: 'みます', explain: 'Se prueba el plato para descubrir cómo es.' },
      { scene: 'Aplicación', lines: [['A', '新しいアプリを使って___。']], options: ['みました', 'いました', 'おきました', 'ありました'], answer: 'みました', explain: 'Cuenta una prueba ya realizada.' },
      { scene: 'Deseo', lines: [['A', '日本で働いて___です。']], options: ['みたい', 'いる', 'おく', 'ある'], answer: 'みたい', explain: 'てみたい expresa deseo de probar la experiencia.' },
      { scene: 'Invitación', lines: [['A', 'いっしょに作って___か。']], options: ['みません', 'いません', 'おきません', 'ありません'], answer: 'みません', explain: 'てみませんか invita a probar.' },
    ],
    duals: [
      { scene: 'Aprendizaje', lines: [['A', '日本語で[[0]]、先生に[[1]]。']], blanks: [{ options: ['書いてみます', '書いています', '書いておきます'], answer: '書いてみます', explain: 'Intento de escritura.' }, { options: ['見せてみます', '見せています', '見せてあります'], answer: '見せてみます', explain: 'Prueba de mostrarlo.' }] },
      { scene: 'Restaurante', lines: [['A', 'この魚を[[0]]。おいしかったら、家でも[[1]]。']], blanks: [{ options: ['食べてみます', '食べています', '食べておきます'], answer: '食べてみます', explain: 'Primera prueba.' }, { options: ['作ってみます', '作っています', '作ってあります'], answer: '作ってみます', explain: 'Segundo intento condicionado.' }] },
    ],
    guided: { scene: 'Una app nueva', text: '友だちにすすめられて、新しいアプリを[[0]]。便利だったので、家族にも[[1]]。', blanks: [{ options: ['使ってみました', '使っていました', '使っておきました'], answer: '使ってみました', explain: 'Prueba pasada.' }, { options: ['すすめてみました', 'すすめています', 'すすめてあります'], answer: 'すすめてみました', explain: 'Intento de recomendar.' }] },
    free: { scene: 'Prueba y resultado', text: 'この漢字を自分で書いて___。昨日、日本語で注文して___。', blanks: [{ answer: 'みます', explain: 'Prueba futura.' }, { answer: 'みました', explain: 'Prueba pasada.' }] },
    writes: [
      { scene: 'Comida', prompt: 'Di: Voy a probar este plato.', answer: 'この料理を食べてみます。', explain: 'Acción experimental.' },
      { scene: 'Idioma', prompt: 'Di: Quiero probar a hablar en japonés.', answer: '日本語で話してみたいです。', explain: 'てみたい expresa deseo de intentar.' },
      { scene: 'Invitación', prompt: 'Pregunta: ¿Quieres probar a hacerlo juntos?', answer: 'いっしょにやってみませんか。', explain: 'Invitación suave con ませんか.' },
    ],
  },
})

export const tsumoriYotei = buildExpandedTopic({
  slug: 'tsumori-yotei-planes-a2', order: '24', color: '#7c3aed', category: 'Planes', level: 'A2',
  title: '〜つもり y 予定 en japonés A2: intención personal y plan programado', shortTitle: 'つもり vs 予定', metaTitle: 'tsumori y yotei japonés A2: intención y planes',
  description: 'つもり expresa una intención que pertenece al hablante; 予定 presenta un plan organizado, una agenda o una previsión más objetiva. Separarlas ayuda a decir si algo depende de tu voluntad o ya forma parte de un calendario.',
  lead: '¿Es una decisión tuya o un plan ya programado? Esa pregunta separa つもり de 予定.',
  outcomes: ['Expresar intención afirmativa y negativa', 'Describir planes programados', 'Evitar confundir voluntad con agenda'],
  guide: { goal: 'Comunicar planes con el grado correcto de compromiso.', model: '来年、日本へ留学するつもりです。会議は三時に始まる予定です。', formula: 'verbo diccionario／ない + つもり | verbo diccionario + 予定', decisions: ['Usa つもり para una intención personal.', 'Usa 予定 para un plan establecido o previsto.', 'La intención negativa usa ないつもり.', 'Con nombres: N の予定です.'], table: [['Idea', 'Patrón', 'Ejemplo'], ['Intención', 'Vる + つもり', '勉強するつもり'], ['No intención', 'Vない + つもり', '買わないつもり'], ['Programa', 'Vる + 予定', '始まる予定'], ['Agenda nominal', 'N の予定', '会議の予定']], mistakes: ['No uses la forma ます delante de つもり.', 'つもり no garantiza que el plan esté organizado.', '予定 no siempre expresa voluntad del hablante; puede ser un horario externo.'] },
  seo: [
    { heading: '¿Cuándo se usa つもり?', paragraphs: ['Se usa cuando el hablante ha tomado una decisión o mantiene una intención: 毎日勉強するつもりです. La forma negativa se construye con ない: 車は買わないつもりです.'] },
    { heading: '¿Cuándo se usa 予定?', paragraphs: ['予定 encaja con horarios, reservas, itinerarios o planes compartidos: 飛行機は十時に着く予定です. También puede seguir a un nombre con の: 来週は出張の予定です.'] },
    { heading: '¿Por qué no son intercambiables?', paragraphs: ['卒業するつもりです comunica mi intención de graduarme. 卒業する予定です comunica que la graduación está prevista. La primera mira la voluntad; la segunda, el plan organizado.'] },
  ],
  visual: { mode: 'decision-map', teacherLens: 'Voluntad interior frente a calendario exterior.', graphicPrompt: 'Dos tarjetas: una decisión personal y una agenda programada.', scene: [['つもり', 'decisión propia'], ['予定', 'plan organizado'], ['ないつもり', 'intención negativa'], ['N の予定', 'agenda nominal']], learnerModes: ['visual: mente vs calendario', 'analítico: forma verbal', 'oral: planes'], reviewFocus: ['Vる/Vない + つもり', 'Vる + 予定', 'N の予定'] },
  practiceSeed: {
    choices: [
      { scene: 'Decisión personal', lines: [['A', '来年、日本語を勉強する___です。']], options: ['つもり', '予定に', 'ことが', 'ところ'], answer: 'つもり', explain: 'Es una intención del hablante.' },
      { scene: 'Horario de vuelo', lines: [['A', '飛行機は十時に着く___です。']], options: ['予定', 'つもりを', 'ながら', 'しか'], answer: '予定', explain: 'Es una previsión programada.' },
      { scene: 'Intención negativa', lines: [['A', '今日は外出しない___です。']], options: ['つもり', '予定に', 'ことがある', 'そう'], answer: 'つもり', explain: 'Vない + つもり.' },
      { scene: 'Agenda nominal', lines: [['A', '午後は会議___です。']], options: ['の予定', 'つもり', 'を予定', 'でつもり'], answer: 'の予定', explain: 'Nombre + の予定.' },
    ],
    duals: [
      { scene: 'Fin de semana', lines: [['A', '土曜日は友だちに[[0]]。日曜日は仕事の[[1]]。']], blanks: [{ options: ['会うつもりです', '会った予定です', '会いながら'], answer: '会うつもりです', explain: 'Intención personal.' }, { options: ['予定です', 'つもりをです', 'ことです'], answer: '予定です', explain: 'Agenda de trabajo.' }] },
      { scene: 'Viaje', lines: [['A', '京都へ[[0]]。新幹線は八時に[[1]]。']], blanks: [{ options: ['行くつもりです', '行った予定です', '行きしか'], answer: '行くつもりです', explain: 'Decisión propia.' }, { options: ['出る予定です', '出るつもりをです', '出て予定です'], answer: '出る予定です', explain: 'Horario previsto.' }] },
    ],
    guided: { scene: 'Plan del próximo mes', text: '来月、引っ越す[[0]]。新しい仕事は一日に始まる[[1]]。', blanks: [{ options: ['つもりです', '予定をです'], answer: 'つもりです', explain: 'Intención de mudarse.' }, { options: ['予定です', 'つもりをです'], answer: '予定です', explain: 'Fecha programada.' }] },
    free: { scene: 'Intención y agenda', text: '今年は車を買わない___です。試験は六月にある___です。', blanks: [{ answer: 'つもり', explain: 'Intención negativa.' }, { answer: '予定', explain: 'Plan previsto.' }] },
    writes: [
      { scene: 'Estudio', prompt: 'Di: Tengo la intención de estudiar todos los días.', answer: '毎日勉強するつもりです。', explain: 'Vる + つもり.' },
      { scene: 'Decisión negativa', prompt: 'Di: No pienso comprarlo.', answer: '買わないつもりです。', explain: 'Vない + つもり.' },
      { scene: 'Agenda', prompt: 'Di: La reunión está prevista para empezar a las tres.', answer: '会議は三時に始まる予定です。', explain: '予定 presenta un horario.' },
    ],
  },
})

export const volitionalOmou = buildExpandedTopic({
  slug: 'volitiva-you-to-omou-a2', order: '25', color: '#dc2626', category: 'Decisión', level: 'A2',
  title: 'Forma volitiva + 〜ようと思う en japonés A2: decisiones en proceso', shortTitle: '〜ようと思う', metaTitle: 'forma volitiva y you to omou en japonés A2',
  description: 'La forma volitiva seguida de と思う comunica una decisión o intención que el hablante está considerando. Frente a つもり, suele sonar como un plan menos fijado o una decisión que se forma en este momento.',
  lead: 'Cuando la idea está naciendo —«creo que voy a…»—, la forma volitiva + と思う suena natural.',
  outcomes: ['Formar la volitiva de los tres grupos verbales', 'Expresar decisiones recientes', 'Distinguir 〜ようと思う de つもり'],
  guide: { goal: 'Hablar de decisiones todavía abiertas y planes personales.', model: '今年は日本語能力試験を受けようと思っています。', formula: 'forma volitiva + と思う／と思っている', decisions: ['Grupo 1: cambia la vocal u por o + う: 書く→書こう.', 'Grupo 2: elimina る y añade よう: 食べる→食べよう.', 'する→しよう; 来る→来よう.', 'と思っている muestra una intención sostenida; と思う puede ser una decisión del momento.'], table: [['Grupo', 'Diccionario', 'Volitiva'], ['1', '行く', '行こう'], ['2', '食べる', '食べよう'], ['Irregular', 'する', 'しよう'], ['Irregular', '来る', '来よう']], mistakes: ['No añadas ます: 行きましょうと思う es incorrecto.', 'La volitiva informal sola puede invitar; con と思う comunica intención.', '来よう se lee こよう.'] },
  seo: [
    { heading: '¿Cómo se forma la volitiva?', paragraphs: ['En verbos del grupo 1, la sílaba final pasa a la fila o y recibe う: 読む→読もう. En grupo 2, se sustituye る por よう: 見る→見よう. Las formas irregulares son しよう y 来よう.'] },
    { heading: '¿Qué diferencia hay entre と思う y と思っている?', paragraphs: ['〜ようと思う puede presentar una decisión que surge ahora. 〜ようと思っている comunica que la intención lleva un tiempo en la mente del hablante.'] },
    { heading: '¿Cómo se diferencia de つもり?', paragraphs: ['つもり suele expresar una intención más asentada. 〜ようと思う deja ver el proceso mental y puede sonar menos definitivo: 来年留学しようと思っています, estoy pensando estudiar fuera el próximo año.'] },
  ],
  visual: { mode: 'decision-progress', teacherLens: 'La volitiva muestra una decisión que pasa de idea a intención.', graphicPrompt: 'Una idea se convierte en decisión mediante la forma volitiva.', scene: [['行く', '行こう'], ['食べる', '食べよう'], ['する', 'しよう'], ['〜と思っている', 'intención sostenida']], learnerModes: ['visual: transformación', 'analítico: grupos verbales', 'oral: decisiones'], reviewFocus: ['fila o + う', 'る → よう', 'pensamiento sostenido'] },
  practiceSeed: {
    choices: [
      { scene: 'Grupo 1', lines: [['A', '来年、日本へ行___と思います。']], options: ['こう', 'きよう', 'く', 'って'], answer: 'こう', explain: '行く → 行こう.' },
      { scene: 'Grupo 2', lines: [['A', 'もっと野菜を食べ___と思っています。']], options: ['よう', 'ろう', 'て', 'ます'], answer: 'よう', explain: '食べる → 食べよう.' },
      { scene: 'Irregular', lines: [['A', '毎日運動___と思います。']], options: ['しよう', 'すよう', 'して', 'します'], answer: 'しよう', explain: 'する → しよう.' },
      { scene: 'Intención sostenida', lines: [['A', '会社を変えようと___。']], options: ['思っています', '思ってみます', '思っておきます', '思うでした'], answer: '思っています', explain: 'La intención lleva tiempo presente.' },
    ],
    duals: [
      { scene: 'Nuevo hábito', lines: [['A', '朝早く[[0]]と思っています。それから、朝ごはんを[[1]]と思います。']], blanks: [{ options: ['起きよう', '起きろう', '起きて'], answer: '起きよう', explain: 'Grupo 2.' }, { options: ['作ろう', '作よう', '作って'], answer: '作ろう', explain: '作る → 作ろう.' }] },
      { scene: 'Estudio', lines: [['A', '漢字を毎日[[0]]と思っています。来年、試験を[[1]]と思います。']], blanks: [{ options: ['練習しよう', '練習すよう', '練習して'], answer: '練習しよう', explain: 'する → しよう.' }, { options: ['受けよう', '受けろう', '受けて'], answer: '受けよう', explain: 'Grupo 2.' }] },
    ],
    guided: { scene: 'Propósitos', text: '今年は本をたくさん[[0]]と思っています。週末は図書館へ[[1]]と思います。', blanks: [{ options: ['読もう', '読みよう'], answer: '読もう', explain: '読む → 読もう.' }, { options: ['行こう', '行きよう'], answer: '行こう', explain: '行く → 行こう.' }] },
    free: { scene: 'Forma volitiva', text: '来年、留学し___と思っています。日本でもっと働こ___と思います。', blanks: [{ answer: 'よう', explain: 'する → しよう.' }, { answer: 'う', explain: '働く → 働こう.' }] },
    writes: [
      { scene: 'Examen', prompt: 'Di: Estoy pensando presentarme al examen.', answer: '試験を受けようと思っています。', explain: 'Volitiva + と思っている.' },
      { scene: 'Salud', prompt: 'Di: Creo que voy a empezar a hacer ejercicio.', answer: '運動を始めようと思います。', explain: 'Decisión reciente.' },
      { scene: 'Viaje', prompt: 'Di: Estoy pensando ir a Kioto el próximo mes.', answer: '来月、京都へ行こうと思っています。', explain: 'Intención sostenida.' },
    ],
  },
})

export const additionalA2Topics = [nodeKara, teOku, teMiru, tsumoriYotei, volitionalOmou]
