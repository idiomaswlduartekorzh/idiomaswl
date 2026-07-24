import type { GrammarTopic } from '../../types'

const topic: GrammarTopic = {
  slug: 'te-form-permission',
  order: '16',
  color: '#dc2626',
  category: 'Verbos',
  level: 'A1',
  title: 'Forma て (te-form) y permiso en japonés A1 — てもいいですか',
  shortTitle: '〜てもいいですか',
  metaTitle: 'Te-form japonés A1 — te mo ii desu ka permiso te form',
  description:
    'La forma て (te-form) es la forma del verbo más versátil del japonés — base de decenas de construcciones gramaticales. En A1 se usa para pedir permiso: 〜てもいいですか (te mo ii desu ka = ¿puedo...?) y para instrucciones corteses: 〜てください (te kudasai = por favor haz...). La formación varía según el grupo verbal pero sigue reglas predecibles.',
  lead: '書いてもいいですか (kaite mo ii desu ka) = ¿puedo escribir? 食べてください (tabete kudasai) = por favor come. La te-form es la base de mucha gramática japonesa intermedia — dominarla en A1 te da una ventaja enorme.',
  outcomes: [
    'Forma la te-form de verbos del grupo 1 (u-verbos) y grupo 2 (ru-verbos)',
    'Pide permiso con 〜てもいいですか y lo concede/niega con いいですよ / ちょっと...',
    'Usa 〜てください para instrucciones corteses',
  ],

  guide: {
    goal: 'Dominar la formación de la te-form y usarla para pedir permiso y dar instrucciones.',
    model: 'ここに 座ってもいいですか？(Koko ni suwatte mo ii desu ka? = ¿Puedo sentarme aquí?) / ゆっくり 話してください。(Yukkuri hanashite kudasai = Por favor habla despacio.)',
    formula: '[verbo て形] + もいいですか (permiso) | [verbo て形] + ください (instrucción)',
    decisions: [
      'Grupo 2 (ru-verbos): quitar る, añadir て → 食べる→食べて, 見る→見て',
      'Grupo 1 (u-verbos): く→いて, ぐ→いで, す→して, つ/る/う→って, ぬ/む/ぶ→んで, ぐ→いで',
      'Irregulares: する→して, くる→きて',
      'てもいいですか = ¿puedo...? / てもいいですよ = sí, puedes / ちょっと... = mejor no',
      'てください = por favor [haz] — instrucción cortés, no orden brusca',
      'て-form conecta acciones: 食べて、出かけます (como y salgo) — orden secuencial',
    ],
    table: [
      ['Tipo verbo', 'Cambio', 'Ejemplo (て形)'],
      ['Grupo 2 (ru-verbo)', 'る → て', '食べる→食べて, 見る→見て, 起きる→起きて'],
      ['Grupo 1: く', 'く → いて', '書く→書いて, 聞く→聞いて'],
      ['Grupo 1: ぐ', 'ぐ → いで', '泳ぐ→泳いで'],
      ['Grupo 1: す', 'す → して', '話す→話して, 貸す→貸して'],
      ['Grupo 1: つ/る/う', '→ って', '持つ→持って, 帰る→帰って, 買う→買って'],
      ['Grupo 1: ぬ/む/ぶ', '→ んで', '飲む→飲んで, 遊ぶ→遊んで, 死ぬ→死んで'],
      ['Irregular: する', 'する → して', 'して, 勉強して, 電話して'],
      ['Irregular: くる', 'くる → きて', 'きて, 来て'],
    ],
    mistakes: [
      '帰る (kaeru=volver) parece ru-verbo pero es grupo 1 → 帰って (kaette), NO 帰て.',
      '行く (iku=ir) es irregular en te-form: 行って (itte), NO 行いて.',
      'てもいいですか es petición cortés, no traducción literal de "¿puedo?" — implica pedir permiso al interlocutor.',
    ],
  },
  seo: [
    {
      heading: 'La te-form: la forma más versátil del japonés',
      paragraphs: [
        'La te-form (て形, te-kei) es posiblemente la forma verbal más importante del japonés después del presente. Se usa para conectar verbos en secuencia (食べて、飲んで、話す), para dar instrucciones corteses (話してください), para pedir permiso (話してもいいですか), para el progresivo (話しています), y como base de docenas de otras construcciones. Dominar la te-form en A1 te abre las puertas de la gramática intermedia.',
        'La buena noticia: los verbos del grupo 2 (ru-verbos) son completamente regulares — solo quitas る y añades て: 食べる→食べて, 見る→見て, 起きる→起きて. Los verbos del grupo 1 (u-verbos) tienen varios patrones según la consonante final, pero cada patrón es sistemático y con práctica se automatizan.',
      ],
    },
    {
      heading: 'Pedir permiso en japonés: てもいいですか',
      paragraphs: [
        'La forma 〜てもいいですか (te mo ii desu ka) es la manera estándar de pedir permiso en japonés formal. Literalmente significa algo como "¿está bien si hago...?". Para conceder el permiso: いいですよ (ii desu yo = sí, está bien) o どうぞ (dōzo = adelante). Para negarlo cortésmente: ちょっと... (chotto... = es un poco... / mejor no) — en japonés la negación directa suena brusca, por lo que se usa esta forma evasiva.',
        'Para instrucciones corteses se usa 〜てください (te kudasai = por favor haz...). Es cortés pero directo: ゆっくり 話してください (por favor habla despacio), もう一度 言ってください (por favor dilo una vez más). Más formal: 〜ていただけますか (te itadakemasu ka = ¿podría usted...?).',
      ],
    },
  ],
  visual: {
    mode: 'te-form-permission',
    teacherLens: 'El estudiante aprende a formar la te-form según el grupo verbal y usarla para permiso e instrucciones.',
    graphicPrompt: 'Tabla de formación te-form por grupos. Diálogos: てもいいですか / いいですよ. Instrucciones con てください.',
    scene: [
      ['Grupo 2: る→て', '食べる→食べて, 見る→見て'],
      ['Grupo 1: patrones', 'く→いて, す→して, つ/る/う→って'],
      ['Permiso: てもいいですか', 'Instrucción: てください'],
    ],
    learnerModes: ['reading', 'typing', 'choosing'],
    reviewFocus: ['ru-verbos → て', 'u-verbos: く/す/つ/む patrones', 'てもいいですか permiso', 'てください instrucción'],
  },
  practice: {
    levels: [
      {
        id: 'l1',
        title: 'La te-form correcta',
        tag: 'Opción múltiple',
        intro: 'Elige la te-form correcta del verbo.',
        type: 'choice',
        items: [
          {
            scene: 'Comer',
            lines: [['Carlos', '食べる → て形は？']],
            options: ['食べて', '食べって', '食べいて', '食べんで'],
            answer: '食べて',
            explain: '食べる = ru-verbo (grupo 2). る → て. 食べ + て = 食べて (tabete).',
          },
          {
            scene: 'Escribir',
            lines: [['Ana', '書く → て形は？']],
            options: ['書いて', '書って', '書して', '書んで'],
            answer: '書いて',
            explain: '書く = grupo 1 (ku-verb). く → いて. 書 + いて = 書いて (kaite).',
          },
          {
            scene: 'Hablar',
            lines: [['Tomás', '話す → て形は？']],
            options: ['話して', '話って', '話いて', '話んで'],
            answer: '話して',
            explain: '話す = grupo 1 (su-verb). す → して. 話 + して = 話して (hanashite).',
          },
          {
            scene: 'Beber',
            lines: [['Sofia', '飲む → て形は？']],
            options: ['飲んで', '飲いて', '飲して', '飲って'],
            answer: '飲んで',
            explain: '飲む = grupo 1 (mu-verb). む → んで. 飲 + んで = 飲んで (nonde).',
          },
          {
            scene: 'Hacer/venir',
            lines: [['Marco', 'する → て形は？']],
            options: ['して', 'すって', 'すいて', 'すんで'],
            answer: 'して',
            explain: 'する = irregular. する → して (shite). Memorizar: する→して, くる→きて.',
          },
          {
            scene: 'Volver',
            lines: [['Lina', '帰る → て形は？(¡Ojo! No es ru-verbo.)']],
            options: ['帰って', '帰て', '帰いて', '帰して'],
            answer: '帰って',
            explain: '帰る (kaeru=volver) es grupo 1 a pesar de terminar en る. る→って. 帰って (kaette).',
          },
          {
            scene: '¿Puedo sentarme?',
            lines: [['Elena', 'ここに 座って___ いいですか？']],
            options: ['も', 'が', 'を', 'で'],
            answer: 'も',
            explain: '〜てもいいですか = ¿puedo...? La partícula es も. 座ってもいいですか = ¿puedo sentarme?',
          },
          {
            scene: 'Por favor habla',
            lines: [['Carlos', 'ゆっくり 話して ___。(Por favor habla despacio.)']],
            options: ['ください', 'もいいですか', 'います', 'あります'],
            answer: 'ください',
            explain: '〜てください = por favor [haz]. 話してください = por favor habla.',
          },
        ],
      },
      {
        id: 'l2',
        title: 'Permiso en diálogo',
        tag: '2 espacios',
        intro: 'Completa la petición de permiso y la respuesta.',
        type: 'dual',
        items: [
          {
            scene: 'En la clase',
            lines: [
 ['Carlos', 'トイレに [[0]] いいですか？(¿Puedo ir al baño?)'],
 ['Tomás', '[[1]]。どうぞ。(Claro. Adelante.)'],
 ],
            blanks: [
              { options: ['行っても', '行きても', '行くても'], answer: '行っても', explain: '行く → 行って (grupo 1: く→いて... espera, 行く→行って es especial: 行く→行いて pero en japonés 行く→行って). 行って+も = 行っても.' },
              { options: ['いいですよ', 'だめです', 'ちょっと'], answer: 'いいですよ', explain: 'いいですよ = sí, está bien. Conceder permiso positivamente.' },
            ],
          },
          {
            scene: 'Usando el celular',
            lines: [
 ['Ana', 'スマホを [[0]] いいですか？'],
 ['Elena', '[[1]]。今は じゅぎょうちゅうです。(Hmm... Ahora estamos en clase.)'],
 ],
            blanks: [
              { options: ['使っても', '使いても', '使くても'], answer: '使っても', explain: '使う (tsukau=usar) → 使って (grupo 1: う→って). 使っても = también usar → ¿puedo usar?' },
              { options: ['ちょっと...', 'いいですよ', 'どうぞ'], answer: 'ちょっと...', explain: 'ちょっと... = negación cortés indirecta. Literalmente "un poco..." — significa "mejor no".' },
            ],
          },
          {
            scene: 'Instrucciones del profesor',
            lines: [['Tomás', 'これを [[0]] ください。そして [[1]] ください。(Por favor lee esto. Después escribe.)']],
            blanks: [
              { options: ['読んで', '読いて', '読して'], answer: '読んで', explain: '読む (yomu=leer) → 読んで (grupo 1: む→んで). 読んでください = por favor lee.' },
              { options: ['書いて', '書って', '書して'], answer: '書いて', explain: '書く (kaku=escribir) → 書いて (く→いて). 書いてください = por favor escribe.' },
            ],
          },
          {
            scene: 'En la biblioteca',
            lines: [
 ['Sofia', 'ここで 食べ[[0]] いいですか？'],
 ['Marco', 'すみません、[[1]]。(Lo siento, está prohibido.)'],
 ],
            blanks: [
              { options: ['ても', 'ても', 'ては'], answer: 'ても', explain: '食べ + ても = 食べても. 食べてもいいですか = ¿puedo comer aquí?' },
              { options: ['ちょっと...', 'いいですよ', 'どうぞ'], answer: 'ちょっと...', explain: 'En la biblioteca no se puede comer → negación cortés: ちょっと...' },
            ],
          },
        ],
      },
      {
        id: 'l3',
        title: 'Texto guiado — clase de japonés',
        tag: 'Opciones',
        intro: 'Elige la te-form o la expresión de permiso correcta.',
        type: 'guidedText',
        scene: 'Primera clase de japonés con Tomás en WeLearn',
        text: 'デービッド: では、はじめましょう。テキストを [[0]] ください。まず 83ページを [[1]] ください。カルロス: すみません、ペンを [[2]] いいですか？デービッド: いいですよ。どうぞ。アナ: この もじを [[3]] いいですか？デービッド: もちろん！[[4]] ください。ソフィア: もう いちど [[5]] いいですか？',
        blanks: [
          { options: ['開いて', '開って', '開して'], answer: '開いて', explain: '開く (hiraku=abrir) → 開いて (く→いて). 開いてください = por favor abre.' },
          { options: ['見て', '見って', '見いて'], answer: '見て', explain: '見る (miru=ver) → 見て (ru-verbo: る→て). 見てください = por favor mira.' },
          { options: ['借りても', '借りても', '借ても'], answer: '借りても', explain: '借りる (kariru=prestar/tomar prestado) → 借りて (ru-verbo). 借りても = ¿puedo pedir prestado?' },
          { options: ['書いても', '書っても', 'かいても'], answer: '書いても', explain: '書く → 書いて → 書いても. ¿Puedo escribir esta letra?' },
          { options: ['書いて', '書って', 'かして'], answer: '書いて', explain: '書く → 書いて. 書いてください = por favor escríbelo.' },
          { options: ['聞いても', '聞っても', '聞しても'], answer: '聞いても', explain: '聞く (kiku=escuchar) → 聞いて → 聞いても. ¿Puedo escuchar otra vez?' },
        ],
      },
      {
        id: 'l4',
        title: 'Sin opciones',
        tag: 'Sin opciones',
        intro: 'Escribe la te-form correcta del verbo indicado.',
        type: 'freeText',
        scene: 'Lina practica las te-forms con verbos básicos',
        text: '食べる → [[0]] | 飲む → [[1]] | 話す → [[2]] | 聞く → [[3]] | する → [[4]] | くる → [[5]]',
        blanks: [
          { answer: '食べて', accepted: ['たべて'], explain: '食べる → 食べて (ru-verbo: る→て).' },
          { answer: '飲んで', accepted: ['のんで'], explain: '飲む → 飲んで (む→んで).' },
          { answer: '話して', accepted: ['はなして'], explain: '話す → 話して (す→して).' },
          { answer: '聞いて', accepted: ['きいて'], explain: '聞く → 聞いて (く→いて).' },
          { answer: 'して', explain: 'する → して (irregular). Memorizar.' },
          { answer: 'きて', accepted: ['来て'], explain: 'くる → きて (irregular). Memorizar.' },
        ],
      },
      {
        id: 'l5',
        title: 'Producción',
        tag: 'Producción',
        intro: 'Escribe la petición de permiso o instrucción completa.',
        type: 'write',
        items: [
          {
            scene: '¿Puedo comer aquí?',
            prompt: 'Escribe: ¿Puedo comer aquí? → ここで ___か？',
            answer: 'ここで 食べてもいいですか？',
            accepted: ['ここで 食べてもいいですか', 'ここで 食べてもいいですか？'],
            explain: '食べる→食べて + もいいですか = 食べてもいいですか. Permiso con て-form.',
          },
          {
            scene: 'Por favor escucha',
            prompt: 'Escribe: Por favor escucha. → ___ください。',
            answer: '聞いてください。',
            accepted: ['聞いてください', '聞いてください。', 'きいてください'],
            explain: '聞く→聞いて + ください = 聞いてください. Instrucción cortés.',
          },
          {
            scene: '¿Puedo usar el diccionario?',
            prompt: 'Escribe: ¿Puedo usar el diccionario? → じしょを ___か？',
            answer: 'じしょを 使ってもいいですか？',
            accepted: ['じしょを 使ってもいいですか', 'じしょを つかってもいいですか'],
            explain: '使う→使って + もいいですか = 使ってもいいですか. 使う=grupo1 う→って.',
          },
          {
            scene: 'Por favor espera',
            prompt: 'Escribe: Por favor espera un momento. → ちょっと ___ください。',
            answer: 'ちょっと 待ってください。',
            accepted: ['ちょっと 待ってください', 'ちょっと まってください'],
            explain: '待つ (matsu=esperar) → 待って (つ→って) + ください = 待ってください.',
          },
        ],
      },
      {
        id: 'l6',
        title: 'Misión en clase',
        tag: 'Reto final',
        intro: 'Pide permiso y da instrucciones usando la te-form.',
        type: 'write',
        items: [
          {
            scene: 'Tres peticiones de permiso',
            prompt: '___てもいいですか？___てもいいですか？___てもいいですか？',
            answer: 'トイレに 行ってもいいですか？スマホを 使ってもいいですか？まどを 開けてもいいですか？',
            accepted: ['トイレに 行ってもいいですか スマホを 使ってもいいですか まどを 開けてもいいですか'],
            explain: '行って(ir)+も / 使って(usar)+も / 開けて(abrir)+も + いいですか.',
          },
          {
            scene: 'Instrucciones para la clase',
            prompt: 'テキストを ___ください。ペンを ___ください。そして ___ください。',
            answer: 'テキストを 開いてください。ペンを 持ってください。そして 書いてください。',
            accepted: ['テキストを 開いてください ペンを 持ってください そして 書いてください'],
            explain: '開いて(abrir) / 持って(tener/tomar) / 書いて(escribir) + ください.',
          },
          {
            scene: 'Diálogo completo',
            prompt: 'A: この いすに ___ いいですか？ B: もちろん！___ ください。',
            answer: 'A: この いすに 座ってもいいですか？ B: もちろん！どうぞ 座ってください。',
            accepted: ['この いすに 座ってもいいですか もちろん どうぞ 座ってください'],
            explain: '座る (suwaru=sentarse) → 座って (ru-verbo: る→て). Permiso e instrucción.',
          },
        ],
      },
    ],
  },
}

export default topic
