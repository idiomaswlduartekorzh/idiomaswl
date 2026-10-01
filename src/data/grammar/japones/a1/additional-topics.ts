import type { Blank, ChoiceItem, DualItem, GrammarTopic, WriteItem } from '../../types'

type TopicSeed = Omit<GrammarTopic, 'practice'> & {
  choiceItems: ChoiceItem[]
  dualItems: DualItem[]
  guided: { scene: string; text: string; blanks: Blank[] }
  free: { scene: string; text: string; blanks: Blank[] }
  writeItems: WriteItem[]
}

function buildTopic(seed: TopicSeed): GrammarTopic {
  const { choiceItems, dualItems, guided, free, writeItems, ...topic } = seed
  return {
    ...topic,
    practice: {
      levels: [
        {
          id: 'l1',
          title: 'Reconoce la forma',
          tag: 'Opción múltiple',
          intro: 'Elige la estructura que completa cada situación.',
          type: 'choice',
          items: choiceItems,
        },
        {
          id: 'l2',
          title: 'Combina dos decisiones',
          tag: '2 huecos',
          intro: 'Completa dos elementos relacionados dentro de la misma frase.',
          type: 'dual',
          items: dualItems,
        },
        {
          id: 'l3',
          title: 'Lee en contexto',
          tag: 'Texto guiado',
          intro: 'Reconstruye un pequeño texto usando el patrón de la lección.',
          type: 'guidedText',
          ...guided,
        },
        {
          id: 'l4',
          title: 'Recupera sin opciones',
          tag: 'Producción controlada',
          intro: 'Escribe cada elemento sin apoyarte en una lista de respuestas.',
          type: 'freeText',
          ...free,
        },
        {
          id: 'l5',
          title: 'Construye frases',
          tag: 'Producción',
          intro: 'Escribe frases completas y compara tu respuesta con el modelo.',
          type: 'write',
          items: writeItems,
        },
        {
          id: 'l6',
          title: 'Misión comunicativa',
          tag: 'Transferencia',
          intro: 'Resuelve situaciones reales reutilizando la estructura sin copiar el modelo.',
          type: 'write',
          items: writeItems.slice(-2).map((item) => ({
            ...item,
            scene: `Misión: ${item.scene}`,
            prompt: `${item.prompt} Puedes cambiar el vocabulario y mantener la estructura.`,
          })),
        },
      ],
    },
  }
}

const demonstratives = buildTopic({
  slug: 'demostrativos-kosoado', order: '22', color: '#0f766e', category: 'Demostrativos', level: 'A1',
  title: 'Demostrativos japoneses こ・そ・あ・ど para hispanohablantes',
  shortTitle: 'こ・そ・あ・ど',
  metaTitle: 'Demostrativos japoneses A1: kore, sore, are, kono y koko',
  description: 'El sistema こ・そ・あ・ど organiza las palabras según la distancia: こ cerca de quien habla, そ cerca de quien escucha, あ lejos de ambos y ど para preguntar. La misma lógica produce これ/それ/あれ/どれ, この/その/あの/どの y ここ/そこ/あそこ/どこ.',
  lead: 'En español decimos este, ese y aquel. En japonés la distancia se convierte en una familia completa y predecible: こ, そ, あ y ど.',
  outcomes: ['Distinguir cercanía del hablante y del oyente', 'Usar これ y この sin confundirlos', 'Preguntar por objetos y lugares con どれ, どの y どこ'],
  guide: {
    goal: 'Elegir el demostrativo correcto según distancia y según si aparece solo o delante de un sustantivo.',
    model: 'これは ほんです。(Esto es un libro.) / その かばんは だれのですか。(¿De quién es ese bolso?)',
    formula: 'こ = aquí | そ = ahí contigo | あ = allí lejos | ど = pregunta',
    decisions: ['Mira quién tiene el objeto: hablante, oyente o ninguno.', 'Usa これ/それ/あれ si la palabra aparece sola.', 'Usa この/その/あの si después viene un sustantivo.', 'Usa ここ/そこ/あそこ para lugares.'],
    table: [['Distancia', 'Objeto / + sustantivo', 'Lugar'], ['Cerca de mí', 'これ / この + N', 'ここ'], ['Cerca de ti', 'それ / その + N', 'そこ'], ['Lejos de ambos', 'あれ / あの + N', 'あそこ'], ['Pregunta', 'どれ / どの + N', 'どこ']],
    mistakes: ['この, その y あの nunca aparecen solos: necesitan un sustantivo.', 'どれ pregunta cuál entre varios; どこ pregunta dónde.', 'No traduzcas solo por este/ese: imagina físicamente la distancia.'],
  },
  seo: [
    { heading: '¿Cómo funciona la familia こ・そ・あ・ど?', paragraphs: ['La primera sílaba codifica la distancia. こ señala el territorio del hablante; そ, el del interlocutor; あ, algo separado de ambos; y ど convierte la serie en pregunta. Aprender la matriz completa evita memorizar doce palabras aisladas.'] },
    { heading: '¿Cuál es la diferencia entre これ y この?', paragraphs: ['これ significa esto y funciona como pronombre: これは本です. この significa este/esta y debe acompañar un nombre: この本はおもしろいです. La misma diferencia existe entre それ/その y あれ/あの.'] },
    { heading: '¿Cómo se pregunta cuál y dónde en japonés?', paragraphs: ['どれ pregunta cuál cuando no nombras el objeto; どの acompaña al nombre; どこ pregunta por un lugar. どの本ですか significa ¿cuál libro?, mientras どこですか significa ¿dónde está?'] },
  ],
  visual: { mode: 'distance-map', teacherLens: 'La distancia se entiende como tres zonas alrededor de hablante y oyente.', graphicPrompt: 'Mapa de distancia こ・そ・あ・ど con objeto, sustantivo y lugar.', scene: [['これ / この / ここ', 'cerca de quien habla'], ['それ / その / そこ', 'cerca de quien escucha'], ['あれ / あの / あそこ', 'lejos de ambos'], ['どれ / どの / どこ', 'pregunta']], learnerModes: ['visual: zonas de distancia', 'analítico: matriz de familias', 'oral: señalar y nombrar'], practiceVerbs: ['Reconoce', 'Relaciona', 'Contextualiza', 'Recupera', 'Produce', 'Transfiere'], reviewFocus: ['これ vs この', 'distancia そ/あ', 'どれ vs どこ'] },
  choiceItems: [
    { scene: 'El libro está en tu mano', lines: [['A', '___は ほんです。(Esto es un libro.)']], options: ['これ', 'それ', 'あれ', 'どこ'], answer: 'これ', explain: 'これ señala un objeto cerca de quien habla.' },
    { scene: 'El bolso está junto a la otra persona', lines: [['A', '___は あなたの かばんですか。']], options: ['それ', 'これ', 'あれ', 'ここ'], answer: 'それ', explain: 'それ señala algo cerca del oyente.' },
    { scene: 'El edificio está lejos de ambos', lines: [['A', '___は ぎんこうです。']], options: ['あれ', 'それ', 'これ', 'どれ'], answer: 'あれ', explain: 'あれ señala algo lejos de ambos.' },
    { scene: 'El sustantivo aparece después', lines: [['A', '___ ほんは おもしろいです。']], options: ['この', 'これ', 'ここ', 'どれ'], answer: 'この', explain: 'この acompaña al sustantivo ほん.' },
    { scene: 'Pregunta por un lugar', lines: [['A', 'トイレは ___ですか。']], options: ['どこ', 'どれ', 'どの', 'なに'], answer: 'どこ', explain: 'どこ pregunta dónde.' },
    { scene: 'Pregunta cuál libro', lines: [['A', '___ ほんですか。']], options: ['どの', 'どれ', 'どこ', 'この'], answer: 'どの', explain: 'どの debe acompañar al nombre ほん.' },
  ],
  dualItems: [
    { scene: 'Cerca y lejos', lines: [['A', '[[0]] かさは わたしのです。[[1]]は せんせいのです。']], blanks: [{ options: ['この', 'これ', 'ここ'], answer: 'この', explain: 'Va antes de かさ.' }, { options: ['あれ', 'あの', 'あそこ'], answer: 'あれ', explain: 'Aparece solo y está lejos.' }] },
    { scene: 'Dos lugares', lines: [['A', 'きょうしつは [[0]]です。しょくどうは [[1]]です。']], blanks: [{ options: ['ここ', 'これ', 'この'], answer: 'ここ', explain: 'Lugar cercano al hablante.' }, { options: ['そこ', 'それ', 'その'], answer: 'そこ', explain: 'Lugar cercano al oyente.' }] },
    { scene: 'Pregunta y respuesta', lines: [['A', '[[0]] かばんですか。— [[1]] かばんです。']], blanks: [{ options: ['どの', 'どれ', 'どこ'], answer: 'どの', explain: 'Acompaña a かばん.' }, { options: ['その', 'それ', 'そこ'], answer: 'その', explain: 'También acompaña a かばん.' }] },
  ],
  guided: { scene: 'En una tienda', text: 'A: [[0]]は いくらですか。B: [[1]] とけいですか。A: はい。B: 3000円です。A: [[2]] かばんは？ B: [[3]]は 5000円です。', blanks: [{ options: ['これ', 'この', 'ここ'], answer: 'これ', explain: 'Objeto cercano al hablante.' }, { options: ['その', 'それ', 'そこ'], answer: 'その', explain: 'Acompaña a とけい.' }, { options: ['あの', 'あれ', 'あそこ'], answer: 'あの', explain: 'Acompaña a かばん y está lejos.' }, { options: ['あれ', 'あの', 'あそこ'], answer: 'あれ', explain: 'Pronombre para el bolso lejano.' }] },
  free: { scene: 'Sin mirar la tabla', text: '___は わたしの ペンです。___ ほんは あなたのです。えきは ___ですか。___は びょういんです。', blanks: [{ answer: 'これ', explain: 'Objeto cerca del hablante.' }, { answer: 'その', explain: 'Ese libro junto al oyente.' }, { answer: 'どこ', explain: 'Pregunta por lugar.' }, { answer: 'あれ', accepted: ['あそこ'], explain: 'Algo o un lugar lejos de ambos.' }] },
  writeItems: [
    { scene: 'Presenta un objeto cercano', prompt: 'Escribe: Este es mi libro.', answer: 'これは わたしの ほんです。', accepted: ['これは わたしの ほんです', 'これは私の本です。'], explain: 'これ aparece solo; わたしの indica posesión.' },
    { scene: 'Pregunta por un lugar', prompt: 'Escribe: ¿Dónde está la estación?', answer: 'えきは どこですか。', accepted: ['えきは どこですか', '駅はどこですか。'], explain: 'Lugar + は + どこですか.' },
    { scene: 'Señala lejos', prompt: 'Escribe: Aquel edificio es una escuela.', answer: 'あの たてものは がっこうです。', accepted: ['あのたてものはがっこうです。', 'あの建物は学校です。'], explain: 'あの acompaña al sustantivo たてもの.' },
    { scene: 'Elige entre varios', prompt: 'Escribe: ¿Cuál bolso es el tuyo?', answer: 'どの かばんが あなたのですか。', accepted: ['どのかばんがあなたのですか。'], explain: 'どの acompaña a かばん.' },
  ],
})

const possession = buildTopic({
  slug: 'particula-no-posesion', order: '23', color: '#7c3aed', category: 'Partículas', level: 'A1',
  title: 'Partícula の en japonés A1: posesión, relación y tipo', shortTitle: 'の posesivo',
  metaTitle: 'Partícula no の en japonés A1: posesión y relación',
  description: 'La partícula の conecta dos nombres. El primero especifica al segundo: posesión, pertenencia, origen, especialidad o tipo. La dirección siempre es A の B, literalmente B relacionado con A.',
  lead: 'Piensa の como un puente entre nombres: わたしの本 no es “yo libro”, sino “el libro relacionado conmigo”: mi libro.',
  outcomes: ['Formar posesivos con pronombres y nombres', 'Expresar nacionalidad, área o tipo', 'Preguntar だれの y evitar invertir A y B'],
  guide: { goal: 'Conectar nombres con の para expresar quién posee algo y qué relación existe entre dos sustantivos.', model: 'これは わたしの ほんです。(Este es mi libro.) / にほんごの せんせいです。(Es profesor de japonés.)', formula: 'A の B = B de A / B relacionado con A', decisions: ['Identifica el nombre principal: siempre va después de の.', 'Coloca antes de の a la persona, país, materia o categoría que lo define.', 'Usa だれの para preguntar de quién.', 'Puedes omitir el segundo nombre si el contexto es claro: わたしのです.'], table: [['Relación', 'Patrón', 'Ejemplo'], ['Posesión', 'persona の objeto', 'マリアの ほん'], ['Origen', 'país の producto', 'にほんの くるま'], ['Área', 'materia の persona', 'にほんごの せんせい'], ['Pregunta', 'だれ の', 'だれの かばん']], mistakes: ['No inviertas el orden: マリアの本 es el libro de María.', 'の no equivale siempre a de; expresa una relación amplia.', 'Si omites el sustantivo final, conserva の: わたしのです.'] },
  seo: [{ heading: '¿Qué significa la partícula の?', paragraphs: ['の conecta dos sustantivos y hace que el primero describa o limite al segundo. Por eso sirve para mi libro, profesor de japonés, coche japonés y estudiante universitario con el mismo mecanismo.'] }, { heading: '¿Cuál es el orden de A の B?', paragraphs: ['El nombre importante va al final. 日本語の先生 es profesor de japonés, no japonés del profesor. Leer de derecha a izquierda ayuda al principio: 先生, profesor; ¿de qué?, 日本語, japonés.'] }, { heading: '¿Cómo se pregunta de quién?', paragraphs: ['だれの reemplaza al poseedor: これはだれのかばんですか. Si el objeto ya está claro, basta これはだれのですか. La respuesta también puede omitirlo: わたしのです.'] }],
  visual: { mode: 'bridge', teacherLens: 'の funciona como un puente: el nombre izquierdo especifica al derecho.', graphicPrompt: 'Puente A の B con posesión, origen, materia y pregunta.', scene: [['わたし の ほん', 'mi libro'], ['にほん の くるま', 'coche japonés'], ['にほんご の せんせい', 'profesor de japonés'], ['だれ の かばん', 'bolso de quién']], learnerModes: ['visual: puente entre nombres', 'analítico: leer desde B', 'oral: señalar pertenencias'], practiceVerbs: ['Reconoce', 'Conecta', 'Contextualiza', 'Recupera', 'Produce', 'Transfiere'], reviewFocus: ['orden A の B', 'だれの', 'omisión del nombre'] },
  choiceItems: [
    { scene: 'Mi libro', lines: [['A', 'わたし___ ほんです。']], options: ['の', 'は', 'を', 'に'], answer: 'の', explain: 'の conecta el poseedor con el objeto.' },
    { scene: 'Profesor de japonés', lines: [['A', 'にほんご___ せんせいです。']], options: ['の', 'を', 'で', 'が'], answer: 'の', explain: 'La materia especifica al profesor.' },
    { scene: 'Pregunta de quién', lines: [['A', 'これは ___ かばんですか。']], options: ['だれの', 'だれを', 'どこの', 'なに'], answer: 'だれの', explain: 'だれの pregunta de quién.' },
    { scene: 'Coche japonés', lines: [['A', 'にほん___ くるまです。']], options: ['の', 'は', 'に', 'と'], answer: 'の', explain: '日本の車 = coche de Japón/japonés.' },
    { scene: 'El de María', lines: [['A', 'これは マリア___です。']], options: ['の', 'は', 'が', 'を'], answer: 'の', explain: 'の sustituye al nombre ya conocido.' },
    { scene: 'Estudiante universitario', lines: [['A', 'だいがく___ がくせいです。']], options: ['の', 'で', 'も', 'へ'], answer: 'の', explain: 'La universidad define el tipo de estudiante.' },
  ],
  dualItems: [
    { scene: 'Familia', lines: [['A', 'これは [[0]] はは[[1]] しゃしんです。']], blanks: [{ options: ['わたしの', 'わたしは', 'わたしを'], answer: 'わたしの', explain: 'Mi madre.' }, { options: ['の', 'は', 'が'], answer: 'の', explain: 'Foto de mi madre.' }] },
    { scene: 'Pregunta y respuesta', lines: [['A', 'これは [[0]] ほんですか。— [[1]]です。']], blanks: [{ options: ['だれの', 'だれは', 'どこ'], answer: 'だれの', explain: 'De quién.' }, { options: ['せんせいの', 'せんせいは', 'せんせいを'], answer: 'せんせいの', explain: 'Es el del profesor.' }] },
    { scene: 'Dos relaciones', lines: [['A', 'にほん[[0]] だいがく[[1]] がくせいです。']], blanks: [{ options: ['の', 'は', 'で'], answer: 'の', explain: 'Universidad de Japón.' }, { options: ['の', 'が', 'を'], answer: 'の', explain: 'Estudiante de la universidad.' }] },
  ],
  guided: { scene: 'Objetos en el aula', text: 'これは [[0]] ペンです。あれは [[1]] かばんです。その ほんは [[2]]ですか。はい、[[3]]です。', blanks: [{ options: ['わたしの', 'わたしは', 'わたしを'], answer: 'わたしの', explain: 'Mi bolígrafo.' }, { options: ['せんせいの', 'せんせいは', 'せんせいが'], answer: 'せんせいの', explain: 'Bolso del profesor.' }, { options: ['だれの', 'だれを', 'どこ'], answer: 'だれの', explain: 'De quién.' }, { options: ['マリアの', 'マリアは', 'マリアを'], answer: 'マリアの', explain: 'El de María.' }] },
  free: { scene: 'Completa con の o un posesivo', text: 'わたし___ かぞくです。にほんご___ ほんです。これは ___ですか。— ともだち___です。', blanks: [{ answer: 'の', explain: 'Mi familia.' }, { answer: 'の', explain: 'Libro de japonés.' }, { answer: 'だれの', explain: 'De quién.' }, { answer: 'の', explain: 'El de un amigo.' }] },
  writeItems: [
    { scene: 'Posesión', prompt: 'Escribe: Este es mi diccionario.', answer: 'これは わたしの じしょです。', accepted: ['これはわたしのじしょです。', 'これは私の辞書です。'], explain: 'Poseedor + の + objeto.' },
    { scene: 'Profesión', prompt: 'Escribe: Soy profesor de japonés.', answer: 'わたしは にほんごの せんせいです。', accepted: ['わたしは日本語の先生です。'], explain: '日本語 especifica a 先生.' },
    { scene: 'Pregunta', prompt: 'Escribe: ¿De quién es este paraguas?', answer: 'この かさは だれのですか。', accepted: ['このかさはだれのですか。'], explain: 'だれの puede aparecer sin repetir かさ.' },
    { scene: 'Origen', prompt: 'Escribe: Es un coche japonés.', answer: 'にほんの くるまです。', accepted: ['日本の車です。'], explain: '日本の + 車.' },
  ],
})

const toMo = buildTopic({
  slug: 'particulas-to-mo', order: '24', color: '#2563eb', category: 'Partículas', level: 'A1',
  title: 'Partículas と y も en japonés A1: y, con y también', shortTitle: 'と y も',
  metaTitle: 'Partículas japonesas to と y mo も en nivel A1',
  description: 'と une una lista cerrada de nombres o marca compañía; も reemplaza a は, が o を para añadir la idea de también. Son partículas pequeñas que cambian la relación entre elementos completos.',
  lead: 'と construye conjuntos cerrados: A y B. も añade semejanza: A también. Dominar la diferencia permite hablar de compañía, listas y coincidencias.',
  outcomes: ['Unir nombres con と', 'Expresar compañía con persona と', 'Añadir información con も sin duplicar は'],
  guide: { goal: 'Usar と para y/con y も para también en frases básicas.', model: 'パンと たまごを たべます。(Como pan y huevo.) / わたしも がくせいです。(Yo también soy estudiante.)', formula: 'A と B = A y B | persona と = con | A も = A también', decisions: ['Usa と entre los elementos de una lista completa.', 'Usa persona + と + verbo para hacer algo con alguien.', 'Sustituye は/が/を por も cuando significa también.', 'No escribas はも en el patrón básico.'], table: [['Uso', 'Patrón', 'Ejemplo'], ['Lista', 'A と B', 'パンと たまご'], ['Compañía', 'persona と verbo', 'ともだちと いきます'], ['También', 'A も predicado', 'わたしも がくせいです'], ['Ambos', 'Aも Bも', 'コーヒーも おちゃも']], mistakes: ['と presenta una lista cerrada; や, que significa entre otros, se estudia después.', 'も normalmente reemplaza a は, が o を.', 'Para compañía, la persona va antes de と.'] },
  seo: [{ heading: '¿Cuándo significa と “y” y cuándo “con”?', paragraphs: ['Entre dos nombres, と los coordina: パンと卵. Después de una persona y antes de una acción, marca compañía: 友だちと行きます. El contexto y el verbo muestran cuál lectura corresponde.'] }, { heading: '¿Cómo se usa も para decir también?', paragraphs: ['も ocupa el lugar de la partícula que sustituye en patrones básicos: わたしは学生です pasa a わたしも学生です. No se añade después de は como una segunda partícula.'] }, { heading: '¿Qué diferencia hay entre と y も?', paragraphs: ['と conecta dos entidades dentro del mismo grupo. も declara que otra entidad comparte una propiedad o acción ya mencionada. “Pan y huevo” usa と; “yo también” usa も.'] }],
  visual: { mode: 'connector', teacherLens: 'と une; も copia una propiedad o acción a otro elemento.', graphicPrompt: 'Dos conectores: と como unión y も como eco de información.', scene: [['A と B', 'lista cerrada'], ['persona と 行きます', 'compañía'], ['A も です', 'también'], ['Aも Bも', 'ambos']], learnerModes: ['visual: unión y eco', 'analítico: sustitución de partícula', 'oral: listas y coincidencias'], practiceVerbs: ['Reconoce', 'Combina', 'Contextualiza', 'Recupera', 'Produce', 'Transfiere'], reviewFocus: ['と = y/con', 'も reemplaza は', 'AもBも'] },
  choiceItems: [
    { scene: 'Lista de dos alimentos', lines: [['A', 'パン___ たまごを たべます。']], options: ['と', 'も', 'に', 'で'], answer: 'と', explain: 'と une los dos alimentos.' },
    { scene: 'Compañía', lines: [['A', 'ともだち___ えいがを みます。']], options: ['と', 'も', 'を', 'が'], answer: 'と', explain: '友だちと = con un amigo.' },
    { scene: 'Yo también', lines: [['A', 'わたし___ がくせいです。']], options: ['も', 'と', 'はも', 'を'], answer: 'も', explain: 'も reemplaza a は para decir también.' },
    { scene: 'Café también', lines: [['A', 'コーヒー___ のみます。']], options: ['も', 'と', 'へ', 'が'], answer: 'も', explain: 'Aquí も reemplaza a を: también bebo café.' },
    { scene: 'Ambos gustan', lines: [['A', 'ねこ___ いぬも すきです。']], options: ['も', 'と', 'を', 'で'], answer: 'も', explain: 'AもBも destaca ambos.' },
    { scene: 'Padres', lines: [['A', 'ちち___ ははは せんせいです。']], options: ['と', 'も', 'に', 'から'], answer: 'と', explain: 'Padre y madre forman una lista.' },
  ],
  dualItems: [
    { scene: 'Lista y compañía', lines: [['A', 'パン[[0]] チーズを かって、ともだち[[1]] たべます。']], blanks: [{ options: ['と', 'も', 'で'], answer: 'と', explain: 'Pan y queso.' }, { options: ['と', 'も', 'を'], answer: 'と', explain: 'Con un amigo.' }] },
    { scene: 'Dos personas también', lines: [['A', 'マリア[[0]] がくせいです。カルロス[[1]] がくせいです。']], blanks: [{ options: ['は', 'も', 'と'], answer: 'は', explain: 'Primero presentamos a María.' }, { options: ['も', 'と', 'を'], answer: 'も', explain: 'Carlos también.' }] },
    { scene: 'Ambas bebidas', lines: [['A', 'コーヒー[[0]] おちゃ[[1]] のみます。']], blanks: [{ options: ['も', 'と', 'を'], answer: 'も', explain: 'Café también.' }, { options: ['も', 'と', 'で'], answer: 'も', explain: 'Té también.' }] },
  ],
  guided: { scene: 'Plan de fin de semana', text: 'どようびに マリア[[0]] こうえんへ いきます。カルロス[[1]] きます。パン[[2]] くだものを もっていきます。おちゃ[[3]] のみます。', blanks: [{ options: ['と', 'も', 'を'], answer: 'と', explain: 'Con María.' }, { options: ['も', 'と', 'に'], answer: 'も', explain: 'Carlos también viene.' }, { options: ['と', 'も', 'で'], answer: 'と', explain: 'Pan y fruta.' }, { options: ['も', 'と', 'が'], answer: 'も', explain: 'También beben té.' }] },
  free: { scene: 'Escribe と o も', text: 'ねこ___ いぬが います。わたし___ ねこが すきです。あね___ かいものします。パン___ かいます。', blanks: [{ answer: 'と', explain: 'Gato y perro.' }, { answer: 'も', explain: 'Yo también.' }, { answer: 'と', explain: 'Con mi hermana.' }, { answer: 'も', accepted: ['を'], explain: 'Pan también; を es posible sin contexto previo.' }] },
  writeItems: [
    { scene: 'Lista', prompt: 'Escribe: Como arroz y pescado.', answer: 'ごはんと さかなを たべます。', accepted: ['ごはんとさかなをたべます。', 'ご飯と魚を食べます。'], explain: 'と une los alimentos.' },
    { scene: 'Compañía', prompt: 'Escribe: Voy a Tokio con un amigo.', answer: 'ともだちと とうきょうへ いきます。', accepted: ['友だちと東京へ行きます。'], explain: 'Persona + と marca compañía.' },
    { scene: 'También', prompt: 'Escribe: Yo también estudio japonés.', answer: 'わたしも にほんごを べんきょうします。', accepted: ['私も日本語を勉強します。'], explain: 'わたしも = yo también.' },
    { scene: 'Ambos', prompt: 'Escribe: Me gustan tanto el café como el té.', answer: 'コーヒーも おちゃも すきです。', accepted: ['コーヒーもおちゃも好きです。'], explain: 'AもBも incluye ambos.' },
  ],
})

const karaMade = buildTopic({
  slug: 'kara-made-origen-limite', order: '25', color: '#b45309', category: 'Tiempo y lugar', level: 'A1',
  title: 'Partículas から y まで en japonés A1: desde y hasta', shortTitle: 'から y まで',
  metaTitle: 'Kara y made en japonés A1: desde, hasta, horarios y trayectos',
  description: 'から marca el punto de inicio y まで el límite final. Funcionan con horas y lugares, pueden aparecer juntas o por separado y permiten describir horarios, recorridos y procedencia.',
  lead: 'Imagina una línea: から coloca el punto de partida y まで el punto de llegada. La misma imagen sirve para tiempo y espacio.',
  outcomes: ['Expresar horarios completos', 'Indicar origen y destino de un trayecto', 'Usar から o まで por separado cuando solo se conoce un extremo'],
  guide: { goal: 'Construir rangos de tiempo y lugar con un inicio y un límite claros.', model: 'くじから ごじまで はたらきます。(Trabajo de nueve a cinco.) / コロンビアから きました。(Vine de Colombia.)', formula: '[inicio] から [final] まで', decisions: ['Identifica el punto donde comienza la acción: añade から.', 'Identifica hasta dónde o hasta cuándo llega: añade まで.', 'Puedes usar solo uno si no mencionas el otro extremo.', 'El verbo queda al final después del rango.'], table: [['Ámbito', 'Inicio con から', 'Final con まで'], ['Hora', '9時から', '5時まで'], ['Lugar', 'うちから', 'がっこうまで'], ['Procedencia', 'コロンビアから', '-'], ['Límite', '-', 'きんようびまで']], mistakes: ['No añadas に después de una hora marcada con から o まで.', 'まで indica el límite incluido, no un destino de movimiento como に/へ.', 'から también puede significar porque en niveles posteriores; aquí estudias origen e inicio.'] },
  seo: [{ heading: '¿Cómo se dice de... a... en japonés?', paragraphs: ['El patrón es inicio + から + final + まで. 九時から五時まで significa de nueve a cinco. La estructura no cambia si usas lugares: 家から学校まで, desde casa hasta la escuela.'] }, { heading: '¿Se pueden usar から y まで por separado?', paragraphs: ['Sí. コロンビアから来ました menciona solo el origen. 金曜日までです menciona solo el límite. No es obligatorio completar los dos extremos cuando el contexto ya aporta el otro.'] }, { heading: '¿Qué diferencia hay entre まで y に?', paragraphs: ['に señala un destino o momento concreto; まで dibuja el límite de un recorrido o intervalo. 学校に行きます es voy a la escuela; 学校まで歩きます es camino hasta la escuela.'] }],
  visual: { mode: 'timeline', teacherLens: 'Una línea con origen y límite sirve tanto para horarios como para trayectos.', graphicPrompt: 'Línea animada desde から hasta まで con ejemplos de tiempo y lugar.', scene: [['9時 から', 'inicio'], ['→ はたらきます →', 'acción'], ['5時 まで', 'límite'], ['うちから 学校まで', 'trayecto']], learnerModes: ['visual: línea temporal', 'analítico: extremos del rango', 'oral: horario y recorrido'], practiceVerbs: ['Reconoce', 'Conecta', 'Contextualiza', 'Recupera', 'Produce', 'Transfiere'], reviewFocus: ['inicio から', 'límite まで', 'まで vs に'] },
  choiceItems: [
    { scene: 'Inicio a las nueve', lines: [['A', 'くじ___ はたらきます。']], options: ['から', 'まで', 'に', 'で'], answer: 'から', explain: 'から marca el inicio.' },
    { scene: 'Hasta las cinco', lines: [['A', 'ごじ___ はたらきます。']], options: ['まで', 'から', 'へ', 'を'], answer: 'まで', explain: 'まで marca el límite.' },
    { scene: 'Procedencia', lines: [['A', 'コロンビア___ きました。']], options: ['から', 'まで', 'で', 'と'], answer: 'から', explain: 'País de origen + から.' },
    { scene: 'Fecha límite', lines: [['A', 'しゅくだいは きんようび___です。']], options: ['まで', 'から', 'に', 'を'], answer: 'まで', explain: 'Hasta el viernes.' },
    { scene: 'Trayecto completo', lines: [['A', 'うちから がっこう___ あるきます。']], options: ['まで', 'から', 'に', 'で'], answer: 'まで', explain: 'Hasta la escuela, límite del recorrido.' },
    { scene: 'Rango', lines: [['A', 'げつようび___ きんようびまでです。']], options: ['から', 'まで', 'と', 'も'], answer: 'から', explain: 'Desde el lunes.' },
  ],
  dualItems: [
    { scene: 'Horario de trabajo', lines: [['A', 'くじ[[0]] ごじ[[1]] はたらきます。']], blanks: [{ options: ['から', 'まで', 'に'], answer: 'から', explain: 'Inicio.' }, { options: ['まで', 'から', 'で'], answer: 'まで', explain: 'Final.' }] },
    { scene: 'Camino diario', lines: [['A', 'うち[[0]] えき[[1]] あるきます。']], blanks: [{ options: ['から', 'まで', 'で'], answer: 'から', explain: 'Desde casa.' }, { options: ['まで', 'に', 'から'], answer: 'まで', explain: 'Hasta la estación.' }] },
    { scene: 'Curso', lines: [['A', 'しがつ[[0]] しちがつ[[1]] にほんごを べんきょうします。']], blanks: [{ options: ['から', 'まで', 'に'], answer: 'から', explain: 'Desde abril.' }, { options: ['まで', 'から', 'で'], answer: 'まで', explain: 'Hasta julio.' }] },
  ],
  guided: { scene: 'Horario de una academia', text: 'クラスは げつようび[[0]] きんようび[[1]]です。あさ くじ[[2]] ひる じゅうにじ[[3]] べんきょうします。', blanks: [{ options: ['から', 'まで', 'に'], answer: 'から', explain: 'Inicio semanal.' }, { options: ['まで', 'から', 'で'], answer: 'まで', explain: 'Final semanal.' }, { options: ['から', 'まで', 'に'], answer: 'から', explain: 'Inicio diario.' }, { options: ['まで', 'から', 'へ'], answer: 'まで', explain: 'Final diario.' }] },
  free: { scene: 'Rangos sin opciones', text: 'うち___ えき___ あるきます。コロンビア___ きました。しゅくだいは あした___です。', blanks: [{ answer: 'から', explain: 'Origen.' }, { answer: 'まで', explain: 'Límite.' }, { answer: 'から', explain: 'Procedencia.' }, { answer: 'まで', explain: 'Fecha límite.' }] },
  writeItems: [
    { scene: 'Horario', prompt: 'Escribe: Estudio de ocho a diez.', answer: 'はちじから じゅうじまで べんきょうします。', accepted: ['八時から十時まで勉強します。'], explain: 'Inicio から + final まで.' },
    { scene: 'Trayecto', prompt: 'Escribe: Camino desde casa hasta la estación.', answer: 'うちから えきまで あるきます。', accepted: ['家から駅まで歩きます。'], explain: 'El mismo patrón con lugares.' },
    { scene: 'Procedencia', prompt: 'Escribe: Vengo de Colombia.', answer: 'コロンビアから きました。', accepted: ['コロンビアから来ました。'], explain: 'Solo se expresa el origen.' },
    { scene: 'Límite', prompt: 'Escribe: La tarea es hasta mañana.', answer: 'しゅくだいは あしたまでです。', accepted: ['宿題は明日までです。'], explain: '明日まで marca la fecha límite.' },
  ],
})

const locations = buildTopic({
  slug: 'ubicacion-posiciones', order: '26', color: '#0f766e', category: 'Ubicación', level: 'A1',
  title: 'Ubicación en japonés A1: 上, 下, 中, 前, 後ろ y 隣', shortTitle: 'Posiciones',
  metaTitle: 'Posiciones en japonés A1: ue shita naka mae ushiro tonari',
  description: 'Las palabras de posición funcionan como nombres y se conectan al referente con の: つくえの上, encima del escritorio. Después, に marca el lugar de existencia y が introduce lo que está allí.',
  lead: 'En japonés no dices simplemente “sobre la mesa”: construyes “la parte de arriba de la mesa”, つくえの上. Esa imagen hace el patrón mucho más lógico.',
  outcomes: ['Nombrar posiciones básicas', 'Construir X の posición', 'Combinar posición con あります/います'],
  guide: { goal: 'Describir dónde están personas, animales y objetos usando posiciones y verbos de existencia.', model: 'つくえの うえに ほんが あります。(Hay un libro encima del escritorio.)', formula: '[referencia] の [posición] に [objeto/persona] が あります/います', decisions: ['Elige el objeto de referencia: mesa, silla, escuela.', 'Añade の y después la posición.', 'Marca ese lugar con に.', 'Usa あります para cosas e います para seres animados.'], table: [['Japonés', 'Lectura', 'Significado'], ['上', 'うえ (ue)', 'encima'], ['下', 'した (shita)', 'debajo'], ['中', 'なか (naka)', 'dentro'], ['前', 'まえ (mae)', 'delante'], ['後ろ', 'うしろ (ushiro)', 'detrás'], ['隣', 'となり (tonari)', 'al lado'], ['間', 'あいだ (aida)', 'entre']], mistakes: ['No omitas の entre la referencia y la posición.', 'Usa に, no で, para existencia estática.', '隣 suele expresar vecindad entre elementos de la misma categoría.'] },
  seo: [{ heading: '¿Cómo se forman las posiciones en japonés?', paragraphs: ['La construcción básica es referencia + の + posición: 机の上, la parte superior del escritorio. Después se añade に para situar la existencia: 机の上に本があります.'] }, { heading: '¿Por qué se usa に y no で?', paragraphs: ['に señala el lugar donde algo existe; で señala el lugar donde sucede una acción. Un libro está sobre la mesa con に, pero estudias en la biblioteca con で.'] }, { heading: '¿Cuándo se usa あります o います?', paragraphs: ['あります se usa con objetos y plantas; います con personas y animales. La posición no cambia: いすの下にかばんがあります y いすの下にねこがいます.'] }],
  visual: { mode: 'spatial-map', teacherLens: 'Una escena espacial permite ver referencia, posición, に y existencia en un solo patrón.', graphicPrompt: 'Mapa de una habitación con 上, 下, 中, 前, 後ろ, 隣 y 間.', scene: [['つくえ の 上', 'encima de la mesa'], ['いす の 下', 'debajo de la silla'], ['かばん の 中', 'dentro del bolso'], ['ぎんこう の 隣', 'junto al banco']], learnerModes: ['visual: mapa espacial', 'analítico: cadena の + に + が', 'oral: describir una habitación'], practiceVerbs: ['Reconoce', 'Sitúa', 'Contextualiza', 'Recupera', 'Describe', 'Transfiere'], reviewFocus: ['referencia の posición', 'に vs で', 'あります vs います'] },
  choiceItems: [
    { scene: 'Libro sobre la mesa', lines: [['A', 'ほんは つくえの ___です。']], options: ['うえ', 'した', 'なか', 'うしろ'], answer: 'うえ', explain: '上 significa encima.' },
    { scene: 'Bolso debajo de la silla', lines: [['A', 'かばんは いすの ___です。']], options: ['した', 'うえ', 'まえ', 'となり'], answer: 'した', explain: '下 significa debajo.' },
    { scene: 'Llave dentro del bolso', lines: [['A', 'かぎは かばんの ___です。']], options: ['なか', 'そと', 'うえ', 'あいだ'], answer: 'なか', explain: '中 significa dentro.' },
    { scene: 'Frente a la estación', lines: [['A', 'カフェは えきの ___です。']], options: ['まえ', 'うしろ', 'した', 'なか'], answer: 'まえ', explain: '前 significa delante.' },
    { scene: 'Junto al banco', lines: [['A', 'ゆうびんきょくは ぎんこうの ___です。']], options: ['となり', 'なか', 'うえ', 'あと'], answer: 'となり', explain: '隣 significa al lado.' },
    { scene: 'Entre dos edificios', lines: [['A', 'カフェは ぎんこうと えきの ___です。']], options: ['あいだ', 'うえ', 'そと', 'まえ'], answer: 'あいだ', explain: '間 significa entre.' },
  ],
  dualItems: [
    { scene: 'Objeto', lines: [['A', 'つくえの うえ[[0]] ほん[[1]] あります。']], blanks: [{ options: ['に', 'で', 'を'], answer: 'に', explain: 'Lugar de existencia.' }, { options: ['が', 'を', 'は'], answer: 'が', explain: 'Lo que existe.' }] },
    { scene: 'Animal', lines: [['A', 'いすの した[[0]] ねこが [[1]]。']], blanks: [{ options: ['に', 'で', 'へ'], answer: 'に', explain: 'Lugar de existencia.' }, { options: ['います', 'あります', 'です'], answer: 'います', explain: 'El gato es animado.' }] },
    { scene: 'Objeto inanimado', lines: [['A', 'かばんの なか[[0]] かぎが [[1]]。']], blanks: [{ options: ['に', 'で', 'を'], answer: 'に', explain: 'Dentro del bolso.' }, { options: ['あります', 'います', 'します'], answer: 'あります', explain: 'La llave es inanimada.' }] },
  ],
  guided: { scene: 'Mi habitación', text: 'つくえの [[0]]に パソコンが あります。いすの [[1]]に かばんが あります。ベッドの [[2]]に ねこが います。ほんは はこの [[3]]です。', blanks: [{ options: ['うえ', 'した', 'なか'], answer: 'うえ', explain: 'Sobre el escritorio.' }, { options: ['した', 'うえ', 'まえ'], answer: 'した', explain: 'Debajo de la silla.' }, { options: ['うえ', 'なか', 'そと'], answer: 'うえ', explain: 'Sobre la cama.' }, { options: ['なか', 'うえ', 'となり'], answer: 'なか', explain: 'Dentro de la caja.' }] },
  free: { scene: 'Sin opciones', text: 'ほんは つくえの ___です。かばんは いすの ___です。ねこは ドアの ___です。カフェは ぎんこうの ___です。', blanks: [{ answer: 'うえ', explain: 'Encima.' }, { answer: 'した', explain: 'Debajo.' }, { answer: 'まえ', accepted: ['うしろ'], explain: 'Delante; detrás también sería gramatical según la escena.' }, { answer: 'となり', explain: 'Al lado.' }] },
  writeItems: [
    { scene: 'Objeto', prompt: 'Escribe: Hay un libro encima de la mesa.', answer: 'つくえの うえに ほんが あります。', accepted: ['机の上に本があります。'], explain: 'Referencia の posición に objeto が あります.' },
    { scene: 'Animal', prompt: 'Escribe: Hay un gato debajo de la silla.', answer: 'いすの したに ねこが います。', accepted: ['椅子の下に猫がいます。'], explain: 'Con animales se usa います.' },
    { scene: 'Ciudad', prompt: 'Escribe: El café está al lado del banco.', answer: 'カフェは ぎんこうの となりです。', accepted: ['カフェは銀行の隣です。'], explain: 'El lugar se presenta con は y se identifica con です.' },
    { scene: 'Interior', prompt: 'Escribe: La llave está dentro del bolso.', answer: 'かぎは かばんの なかです。', accepted: ['鍵はかばんの中です。'], explain: 'かばんの中 = dentro del bolso.' },
  ],
})

const likes = buildTopic({
  slug: 'suki-kirai-gustos', order: '27', color: '#be185d', category: 'Preferencias', level: 'A1',
  title: '好き y 嫌い en japonés A1: hablar de gustos', shortTitle: '好き・嫌い',
  metaTitle: 'Suki y kirai en japonés A1: expresar gustos y preferencias',
  description: '好き y 嫌い se comportan como adjetivos な. Lo que gusta o disgusta suele marcarse con が, no con を. Con とても, あまり y いちばん se puede graduar la preferencia.',
  lead: 'El español dice “me gusta X”; el japonés presenta X como aquello que es agradable para mí: わたしは X が 好きです.',
  outcomes: ['Expresar gustos y aversiones', 'Usar が con el objeto de preferencia', 'Preguntar 何が好きですか y graduar respuestas'],
  guide: { goal: 'Hablar de gustos personales con el patrón は + が + 好き/嫌いです.', model: 'わたしは おんがくが すきです。(Me gusta la música.)', formula: '[persona] は [cosa] が 好き / 嫌い です', decisions: ['Marca a la persona como tema con は.', 'Marca aquello que gusta con が.', 'Usa 好き para gusto y 嫌い para desagrado.', 'Añade とても, あまり o いちばん para graduar.'], table: [['Intención', 'Patrón', 'Ejemplo'], ['Me gusta', 'N が 好きです', '音楽が好きです'], ['No me gusta mucho', 'N は あまり好きじゃないです', '肉はあまり好きじゃないです'], ['Odio / no me gusta', 'N が 嫌いです', '虫が嫌いです'], ['Favorito', 'N が いちばん好きです', '猫がいちばん好きです']], mistakes: ['No uses を con 好き en el patrón estándar A1.', '好き no es un verbo; se combina con です y じゃありません.', '嫌い puede sonar fuerte: あまり好きじゃないです es más suave.'] },
  seo: [{ heading: '¿Por qué 好き usa la partícula が?', paragraphs: ['好き describe una propiedad o estado, no una acción transitiva. Por eso aquello que gusta se marca con が: 音楽が好きです. Para un hispanohablante ayuda traducirlo mentalmente como “la música me resulta agradable”.'] }, { heading: '¿Cómo se pregunta qué te gusta?', paragraphs: ['何が好きですか pregunta qué te gusta. La respuesta puede ser breve, 猫が好きです, o incluir el tema, わたしは猫が好きです.'] }, { heading: '¿Cómo se dice que algo no gusta sin sonar brusco?', paragraphs: ['嫌いです expresa aversión clara. En conversación cotidiana suele ser más suave decir あまり好きじゃないです, no me gusta mucho, especialmente al hablar de comida o actividades.'] }],
  visual: { mode: 'preference-scale', teacherLens: 'Una escala muestra la intensidad y el patrón fijo de tema + が + preferencia.', graphicPrompt: 'Escala desde 嫌い hasta いちばん好き con el objeto marcado por が.', scene: [['N が 好きです', 'me gusta'], ['とても 好きです', 'me gusta mucho'], ['いちばん 好きです', 'es mi favorito'], ['あまり 好きじゃないです', 'no me gusta mucho']], learnerModes: ['visual: escala de preferencia', 'analítico: は + が', 'oral: gustos personales'], practiceVerbs: ['Reconoce', 'Relaciona', 'Contextualiza', 'Recupera', 'Expresa', 'Transfiere'], reviewFocus: ['好き + が', 'negación suave', '何が好き'] },
  choiceItems: [
    { scene: 'Gusto por la música', lines: [['A', 'おんがく___ すきです。']], options: ['が', 'を', 'に', 'で'], answer: 'が', explain: '好き marca el objeto de gusto con が.' },
    { scene: 'Pregunta por gustos', lines: [['A', '___が すきですか。']], options: ['なに', 'どこ', 'だれを', 'いつ'], answer: 'なに', explain: '何が好きですか = ¿qué te gusta?' },
    { scene: 'Favorito', lines: [['A', 'ねこが ___すきです。']], options: ['いちばん', 'あまり', 'ぜんぜん', 'どこ'], answer: 'いちばん', explain: 'いちばん好き = lo que más gusta.' },
    { scene: 'No me gusta mucho', lines: [['A', 'にくは あまり すき___。']], options: ['じゃないです', 'です', 'でした', 'があります'], answer: 'じゃないです', explain: '好き es adjetivo な; se niega con じゃないです.' },
    { scene: 'Desagrado fuerte', lines: [['A', 'むしが ___です。']], options: ['きらい', 'すき', 'じょうず', 'あります'], answer: 'きらい', explain: '嫌い expresa aversión.' },
    { scene: 'Gusto intenso', lines: [['A', 'えいがが ___すきです。']], options: ['とても', 'あまり', 'ぜんぜん', 'どれ'], answer: 'とても', explain: 'とても intensifica una afirmación.' },
  ],
  dualItems: [
    { scene: 'Tema y gusto', lines: [['A', 'わたし[[0]] りょうり[[1]] すきです。']], blanks: [{ options: ['は', 'が', 'を'], answer: 'は', explain: 'La persona es tema.' }, { options: ['が', 'を', 'に'], answer: 'が', explain: 'La comida es lo que gusta.' }] },
    { scene: 'Pregunta', lines: [['A', '[[0]]が いちばん [[1]]ですか。']], blanks: [{ options: ['なに', 'どこ', 'いつ'], answer: 'なに', explain: 'Qué.' }, { options: ['すき', 'きらい', 'あります'], answer: 'すき', explain: 'Qué te gusta más.' }] },
    { scene: 'Negación suave', lines: [['A', 'さかな[[0]] あまり すき[[1]]。']], blanks: [{ options: ['は', 'が', 'を'], answer: 'は', explain: 'El contraste aparece con は.' }, { options: ['じゃないです', 'です', 'でした'], answer: 'じゃないです', explain: 'No me gusta mucho.' }] },
  ],
  guided: { scene: 'Conversación sobre comida', text: 'A: [[0]]が すきですか。B: すし[[1]] すきです。A: にくは？ B: にくは [[2]] すきじゃないです。さかなが [[3]]すきです。', blanks: [{ options: ['なに', 'どこ', 'いつ'], answer: 'なに', explain: 'Pregunta qué.' }, { options: ['が', 'を', 'に'], answer: 'が', explain: 'Objeto de gusto.' }, { options: ['あまり', 'とても', 'いちばん'], answer: 'あまり', explain: 'Negación parcial.' }, { options: ['いちばん', 'あまり', 'ぜんぜん'], answer: 'いちばん', explain: 'Favorito.' }] },
  free: { scene: 'Completa sin opciones', text: 'わたしは おんがく___ すきです。___が すきですか。コーヒーは あまり すき___。ねこが ___すきです。', blanks: [{ answer: 'が', explain: 'Objeto de gusto.' }, { answer: 'なに', accepted: ['何'], explain: 'Qué.' }, { answer: 'じゃないです', explain: 'Negación de 好き.' }, { answer: 'いちばん', explain: 'Favorito.' }] },
  writeItems: [
    { scene: 'Gusto', prompt: 'Escribe: Me gusta la música.', answer: 'わたしは おんがくが すきです。', accepted: ['私は音楽が好きです。', 'おんがくがすきです。'], explain: 'Persona は + música が + 好きです.' },
    { scene: 'Pregunta', prompt: 'Escribe: ¿Qué comida te gusta?', answer: 'どんな たべものが すきですか。', accepted: ['どんな食べ物が好きですか。', 'なにがすきですか。'], explain: 'どんな食べ物 pregunta qué tipo de comida.' },
    { scene: 'Preferencia máxima', prompt: 'Escribe: Me gustan más los gatos.', answer: 'ねこが いちばん すきです。', accepted: ['猫がいちばん好きです。'], explain: 'いちばん好き = favorito.' },
    { scene: 'Negación suave', prompt: 'Escribe: No me gusta mucho la carne.', answer: 'にくは あまり すきじゃないです。', accepted: ['肉はあまり好きじゃないです。'], explain: 'あまり se combina con negación.' },
  ],
})

const invitations = buildTopic({
  slug: 'invitaciones-masenka-mashou', order: '28', color: '#c2410c', category: 'Comunicación', level: 'A1',
  title: 'Invitaciones en japonés A1: ませんか, ましょう y ましょうか', shortTitle: 'ませんか・ましょう',
  metaTitle: 'Invitar y proponer en japonés A1: masen ka y mashou',
  description: 'La forma negativa ませんか funciona como una invitación cortés: ¿no quieres...?. ましょう propone hacer algo juntos y ましょうか puede ofrecer ayuda o confirmar un plan.',
  lead: 'La cortesía japonesa convierte una pregunta negativa en invitación: いきませんか no significa simplemente “¿no vas?”, sino “¿te gustaría ir?”.',
  outcomes: ['Invitar con ませんか', 'Proponer una acción conjunta con ましょう', 'Aceptar y rechazar con fórmulas naturales'],
  guide: { goal: 'Hacer invitaciones, aceptar propuestas y rechazar con cortesía.', model: 'いっしょに コーヒーを のみませんか。(¿Tomamos café juntos?) / はい、のみましょう。(Sí, tomemos.)', formula: 'raíz ます + ませんか = invitación | raíz + ましょう = hagamos', decisions: ['Para invitar, cambia ます por ませんか.', 'Para aceptar y proponer, usa ましょう.', 'Usa ましょうか para ofrecer ayuda o consultar una acción conjunta.', 'Rechaza suavemente con すみません、ちょっと… o またこんど.'], table: [['Función', 'Forma', 'Ejemplo'], ['Invitar', 'Vませんか', '映画を見ませんか'], ['Proponer', 'Vましょう', '行きましょう'], ['Ofrecer', 'Vましょうか', '手伝いましょうか'], ['Aceptar', 'はい、Vましょう', 'はい、食べましょう'], ['Rechazar', 'すみません、ちょっと…', 'Ahora no...']], mistakes: ['ませんか es invitación cuando la entonación y el contexto proponen hacer algo juntos.', 'No respondas a una invitación solo con いいえ si quieres sonar amable.', 'ましょう expresa intención compartida, no una orden.'] },
  seo: [{ heading: '¿Cómo se hace una invitación con ませんか?', paragraphs: ['Toma la forma ます y cambia ます por ませんか: 食べます pasa a 食べませんか. Aunque la forma parece negativa, en contexto equivale a ¿te gustaría comer? o ¿comemos?'] }, { heading: '¿Qué diferencia hay entre ませんか y ましょう?', paragraphs: ['ませんか abre la decisión al interlocutor y es una invitación. ましょう propone directamente una acción compartida: hagamos. Una secuencia natural es 映画を見ませんか - はい、見ましょう.'] }, { heading: '¿Cómo se rechaza una invitación en japonés?', paragraphs: ['Un rechazo directo puede sonar brusco. すみません、ちょっと… deja la negativa implícita; またこんどお願いします añade “en otra ocasión”. Aprender la respuesta cultural es tan importante como la conjugación.'] }],
  visual: { mode: 'conversation-flow', teacherLens: 'La invitación se aprende como un flujo: proponer, aceptar o rechazar con cortesía.', graphicPrompt: 'Flujo de conversación ませんか → ましょう / ちょっと…', scene: [['Vませんか', 'invitar'], ['はい', 'aceptar'], ['Vましょう', 'hacer juntos'], ['すみません、ちょっと…', 'rechazar con tacto']], learnerModes: ['visual: flujo de diálogo', 'analítico: cambio ます → ませんか', 'oral: invitación y respuesta'], practiceVerbs: ['Reconoce', 'Transforma', 'Dialoga', 'Recupera', 'Invita', 'Transfiere'], reviewFocus: ['ます → ませんか', 'ませんか vs ましょう', 'rechazo cortés'] },
  choiceItems: [
    { scene: 'Invitar a tomar café', lines: [['A', 'コーヒーを のみ___。']], options: ['ませんか', 'ますか', 'ました', 'ません'], answer: 'ませんか', explain: 'La forma negativa interrogativa crea la invitación.' },
    { scene: 'Aceptar', lines: [['A', 'はい、のみ___。']], options: ['ましょう', 'ませんか', 'ません', 'ました'], answer: 'ましょう', explain: 'ましょう = tomemos.' },
    { scene: 'Invitar al cine', lines: [['A', 'えいがを み___。']], options: ['ませんか', 'ましょうか', 'ませんでした', 'ですか'], answer: 'ませんか', explain: '見ませんか invita a ver una película.' },
    { scene: 'Proponer ir', lines: [['A', 'いっしょに いき___。']], options: ['ましょう', 'ません', 'ますか', 'でした'], answer: 'ましょう', explain: '行きましょう = vayamos.' },
    { scene: 'Ofrecer ayuda', lines: [['A', 'てつだい___。']], options: ['ましょうか', 'ませんか', 'ます', 'でしたか'], answer: 'ましょうか', explain: '手伝いましょうか = ¿te ayudo?' },
    { scene: 'Rechazo suave', lines: [['A', 'すみません、___。']], options: ['ちょっと…', 'はい', 'ましょう', 'もちろん'], answer: 'ちょっと…', explain: 'ちょっと… suaviza el rechazo.' },
  ],
  dualItems: [
    { scene: 'Invitación y aceptación', lines: [['A', 'すしを たべ[[0]]。— はい、たべ[[1]]。']], blanks: [{ options: ['ませんか', 'ましょう', 'ます'], answer: 'ませんか', explain: 'Invitación.' }, { options: ['ましょう', 'ませんか', 'ません'], answer: 'ましょう', explain: 'Aceptación conjunta.' }] },
    { scene: 'Cine', lines: [['A', 'えいがを み[[0]]。— すみません、[[1]]…。']], blanks: [{ options: ['ませんか', 'ましょう', 'ますか'], answer: 'ませんか', explain: 'Invita.' }, { options: ['ちょっと', 'はい', 'もちろん'], answer: 'ちょっと', explain: 'Rechazo cortés.' }] },
    { scene: 'Ofrecer y agradecer', lines: [['A', 'にもつを もち[[0]]。— はい、[[1]]。']], blanks: [{ options: ['ましょうか', 'ませんか', 'ます'], answer: 'ましょうか', explain: 'Oferta de ayuda.' }, { options: ['おねがいします', 'ちょっと', 'だめです'], answer: 'おねがいします', explain: 'Aceptación cortés.' }] },
  ],
  guided: { scene: 'Plan para el sábado', text: 'A: どようびに えいがを み[[0]]。B: いいですね。み[[1]]。A: そのあと、コーヒーを のみ[[2]]。B: はい。でも よるは [[3]]…。', blanks: [{ options: ['ませんか', 'ましょう', 'ます'], answer: 'ませんか', explain: 'Invitación.' }, { options: ['ましょう', 'ませんか', 'ません'], answer: 'ましょう', explain: 'Aceptación.' }, { options: ['ませんか', 'ました', 'ません'], answer: 'ませんか', explain: 'Otra invitación.' }, { options: ['ちょっと', 'はい', 'もちろん'], answer: 'ちょっと', explain: 'Rechazo suave.' }] },
  free: { scene: 'Completa el diálogo', text: 'いっしょに いき___。— はい、いき___。てつだい___。— おねがいします。すみません、___…。', blanks: [{ answer: 'ませんか', explain: 'Invitación.' }, { answer: 'ましょう', explain: 'Aceptación.' }, { answer: 'ましょうか', explain: 'Oferta.' }, { answer: 'ちょっと', explain: 'Rechazo suave.' }] },
  writeItems: [
    { scene: 'Invitación', prompt: 'Escribe: ¿Tomamos café juntos?', answer: 'いっしょに コーヒーを のみませんか。', accepted: ['いっしょにコーヒーを飲みませんか。'], explain: '飲みます → 飲みませんか.' },
    { scene: 'Aceptar', prompt: 'Escribe: Sí, vayamos.', answer: 'はい、いきましょう。', accepted: ['はい、行きましょう。'], explain: '行きましょう propone ir juntos.' },
    { scene: 'Ofrecer ayuda', prompt: 'Escribe: ¿Te ayudo?', answer: 'てつだいましょうか。', accepted: ['手伝いましょうか。'], explain: 'ましょうか funciona como oferta.' },
    { scene: 'Rechazar con tacto', prompt: 'Responde con cortesía que hoy no puedes.', answer: 'すみません、きょうは ちょっと…。', accepted: ['すみません、今日はちょっと…。', 'すみません、またこんど おねがいします。'], explain: 'ちょっと deja la negativa implícita.' },
  ],
})

const additionalTopics = [demonstratives, possession, toMo, karaMade, locations, likes, invitations]

export default additionalTopics
