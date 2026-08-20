'use client';
import { useState } from 'react';
import Link from 'next/link';

const C = '#7c3aed';

interface FQ { s: string; opts: string[]; a: number; fb: string; }
interface TQ { prompt: string; s: string; opts: string[]; a: number; fb: string; }
interface EQ { s: string; q: string; opts: string[]; a: number; fb: string; }
interface Topic {
  id: string; title: string; icon: string;
  rule: string; tip: string;
  table: { headers: string[]; rows: string[][] };
  a1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'te_form', title: 'て-form (Te-form)', icon: '🔗',
    rule: "La て-form es la 'llave maestra' del japonés A2. Se usa para: (1) Conectar acciones ('Come, speak and go out'); (2) Pedir/dar permiso (～てもいい); (3) Prohibición (～てはいけない); (4) Progresivo ～ています (ver Tema 3). Formación: Grupo 1 (-u verbs): く→いて, ぐ→いで, す→して, つ/る/う→って, ぬ/ぶ/む→んで. Grupo 2 (-eru/-iru): quitar る → て. Irregulares: する→して, くる→きて.",
    tip: "Truco para el grupo 1: solo memoriza la regla del 'く→いて' y el patrón っ (tsu/ru/u → tte). Los demás siguen reglas predecibles. Excepción famosa: 行く (iku) → 行って (itte), no 行いて.",
    table: {
      headers: ['Grupo', 'Verbo (dict.)', 'Romaji', 'て-form', 'Romaji'],
      rows: [
        ['G1 -く', '書く', 'kaku', '書いて', 'kaite'],
        ['G1 -す', '話す', 'hanasu', '話して', 'hanashite'],
        ['G1 -つ/る/う', '待つ', 'matsu', '待って', 'matte'],
        ['G1 -ぬ/ぶ/む', '飲む', 'nomu', '飲んで', 'nonde'],
        ['G2 (-る)', '食べる', 'taberu', '食べて', 'tabete'],
        ['Irr.', 'する', 'suru', 'して', 'shite'],
        ['Irr.', 'くる', 'kuru', 'きて', 'kite'],
      ]
    },
    a1note: "En A1 usabas la forma ～ます: '食べます (tabemasu) — como'. La て-form no es un tiempo verbal — es una forma de conectar. '食べて、飲んで、帰ります' (Tabete, nonde, kaerimasu) = 'Como, bebo y regreso.'",
    examples: [
      "シャワーを浴びて、朝ごはんを食べて、出かけます。(Shawā o abite, asagohan o tabete, dekakemasu.) — Me ducho, desayuno y salgo.",
      "ここに入ってもいいですか？(Koko ni haitte mo ii desu ka?) — ¿Está bien entrar aquí? [permiso con ～てもいい]",
      "ここでタバコを吸ってはいけません。(Koko de tabako o sutte wa ikemasen.) — No se puede fumar aquí. [prohibición con ～てはいけない]",
    ],
    fills: [
      { s: "毎朝、シャワーを___(浴びる)、朝ごはんを食べます。", opts: ['浴びて (abite)', '浴びる (abiru)', '浴びた (abita)', '浴びます (abimasu)'], a: 0, fb: "'浴びる' (G2 verb) → て-form: quita る → '浴び' + て = '浴びて' (abite). Se usa para conectar acciones." },
      { s: "音楽を___(聴く)、勉強します。", opts: ['聴いて (kiite)', '聴く (kiku)', '聴いた (kiita)', '聴きます (kikimasu)'], a: 0, fb: "'聴く' (G1 -く verb) → く→いて: '聴いて' (kiite). Conecta dos acciones simultáneas o secuenciales." },
      { s: "ここに___(入る)もいいですか？", opts: ['入って (haitte)', '入る (hairu)', '入りて (hairite)', '入った (haitta)'], a: 0, fb: "'入る' (G1 -る verb, NOT G2) → つ/る/う → って: '入って' (haitte). ～てもいい = permiso." },
      { s: "窓を___(開ける)、換気します。", opts: ['開けて (akete)', '開ける (akeru)', '開けた (aketa)', '開けます (akemasu)'], a: 0, fb: "'開ける' (G2 verb) → quita る → '開け' + て = '開けて' (akete). Conecta las dos acciones." },
      { s: "電話を___(する)、友達に話しました。", opts: ['して (shite)', 'する (suru)', 'した (shita)', 'します (shimasu)'], a: 0, fb: "'する' es irregular → て-form: 'して' (shite). Memoriza: する→して, くる→きて." },
    ],
    transforms: [
      { prompt: "Conecta las dos acciones con て-form:", s: "起きる (okiru) + 歯を磨く (ha o migaku)", opts: ["起きて、歯を磨きます。(Okite, ha o migakimasu.)", "起きた、歯を磨きます。(Okita, ha o migakimasu.)", "起きる、歯を磨きます。(Okiru, ha o migakimasu.)", "起きます、歯を磨きます。(Okimasu, ha o migakimasu.)"], a: 0, fb: "'起きる' (G2) → '起きて'. Luego continúa con la segunda acción en ます forma. '起きて、歯を磨きます。'" },
      { prompt: "Pide permiso usando ～てもいいですか:", s: "写真を撮る (shashin o toru)", opts: ["写真を撮ってもいいですか？(Shashin o totte mo ii desu ka?)", "写真を撮るもいいですか？(Shashin o toru mo ii desu ka?)", "写真を撮りてもいいですか？(Shashin o torite mo ii desu ka?)", "写真を撮ったもいいですか？(Shashin o totta mo ii desu ka?)"], a: 0, fb: "'撮る' (G1 -る→って): '撮って' + もいいですか = '撮ってもいいですか？' (Totte mo ii desu ka?)" },
      { prompt: "Expresa prohibición con ～てはいけません:", s: "ここで走る (koko de hashiru)", opts: ["ここで走ってはいけません。(Koko de hashitte wa ikemasen.)", "ここで走るはいけません。(Koko de hashiru wa ikemasen.)", "ここで走りてはいけません。(Koko de hashirite wa ikemasen.)", "ここで走ったはいけません。(Koko de hashitta wa ikemasen.)"], a: 0, fb: "'走る' (G1 -る→って): '走って' + はいけません = '走ってはいけません。' Prohibición de correr aquí." },
    ],
    errors: [
      { s: "食べるて、飲んで、帰ります。(Taberu te, nonde, kaerimasu.)", q: "¿Cuál es el error en la て-form?", opts: ["'食べるて' debe ser '食べて' (tabete)", "'飲んで' debe ser '飲みて' (nomite)", "'帰ります' debe ser '帰りて' (kairite)", "No hay error"], a: 0, fb: "'食べる' es G2 verb: quita る → '食べ' + て = '食べて' (tabete). NUNCA se añade て al diccionario form directamente." },
      { s: "書くて、本を読みます。(Kaku te, hon o yomimasu.)", q: "¿Qué está mal?", opts: ["'書くて' debe ser '書いて' (kaite)", "'読みます' debe ser '読みて' (yomite)", "'本を' debe ir al final", "No hay error"], a: 0, fb: "'書く' es G1 -く verb: く→いて = '書いて' (kaite). Nunca se agrega て directamente a la forma del diccionario." },
    ],
    production: "Describe tu rutina mañanera usando 4-5 acciones conectadas con て-form: 起きて、(okite) → ___て → ___て → ___ます. Ejemplo: '起きて、シャワーを浴びて、朝ごはんを食べて、学校に行きます。'"
  },
  {
    id: 'ta_form', title: 'た-form (Pasado)', icon: '⏰',
    rule: "El pasado informal japonés (た-form) sigue las MISMAS reglas de formación que la て-form, pero cambia て→た y で→だ. Formal negativo: ～ませんでした. Informal negativo: ～なかった. Interrogativa: ～ましたか？ / ～た？ Grupo 1: く→いた, す→した, つ/る/う→った, ぬ/ぶ/む→んだ. Grupo 2: quitar る→た. Irregulares: する→した, くる→きた.",
    tip: "Truco: si sabes formar て-form, ya casi sabes た-form. Solo cambia て→た y で→だ. Ejemplo: 書いて (kaite) → 書いた (kaita); 飲んで (nonde) → 飲んだ (nonda). La única excepción es 行く: 行って (itte) → 行った (itta).",
    table: {
      headers: ['Grupo', 'Verbo (dict.)', 'て-form', 'た-form', 'Romaji (た)'],
      rows: [
        ['G1 -く', '書く (kaku)', '書いて', '書いた', 'kaita'],
        ['G1 -す', '話す (hanasu)', '話して', '話した', 'hanashita'],
        ['G1 -む', '飲む (nomu)', '飲んで', '飲んだ', 'nonda'],
        ['G2 (-る)', '食べる (taberu)', '食べて', '食べた', 'tabeta'],
        ['Irr.', 'する (suru)', 'して', 'した', 'shita'],
        ['Formal neg.', '～ます', '—', '～ませんでした', 'masen deshita'],
      ]
    },
    a1note: "En A1 usabas el presente ～ます para hablar de hábitos ('毎日勉強します — Estudio todos los días'). En A2, el た-form cuenta eventos ya terminados: '昨日、映画を見ました (Kinō, eiga o mimashita) — Ayer vi una película.' Hábito = ます; evento pasado = ました.",
    examples: [
      "昨日、友達に電話しました。(Kinō, tomodachi ni denwa shimashita.) — Ayer llamé a un amigo.",
      "先週、京都に行きました。(Senshū, Kyōto ni ikimashita.) — La semana pasada fui a Kioto.",
      "朝ごはんを食べませんでした。(Asagohan o tabemasen deshita.) — No desayuné.",
    ],
    fills: [
      { s: "先週の土曜日、映画を___(見る)。(Senshū no doyōbi, eiga o ___)", opts: ['見ました (mimashita)', '見ます (mimasu)', '見て (mite)', '見る (miru)'], a: 0, fb: "'見る' (G2) → た-form formal: '見ました' (mimashita). '先週 (senshū) = la semana pasada' indica pasado." },
      { s: "昨日、何を___(食べる)か？(Kinō, nani o ___ ka?)", opts: ['食べましたか (tabemashita ka)', '食べますか (tabemasu ka)', '食べたか (tabeta ka)', '食べてか (tabete ka)'], a: 0, fb: "Pregunta en pasado formal: '食べましたか？' (tabemashita ka?). '昨日 (kinō) = ayer' confirma el pasado." },
      { s: "彼女は駅まで___(走る)。(Kanojo wa eki made ___)", opts: ['走りました (hashirimashita)', '走ります (hashirimasu)', '走って (hashitte)', '走る (hashiru)'], a: 0, fb: "'走る' (G1 -る→った→った formal: 走りました). G1 -る verb: quita る → 走り + ました." },
      { s: "昨夜はよく___(寝る)。(Sakuya wa yoku ___)", opts: ['寝ました (nemashita)', '寝ます (nemasu)', '寝て (nete)', '寝た (neta)'], a: 0, fb: "'寝る' (G2) → た-form formal: '寝ました' (nemashita). '昨夜 (sakuya) = anoche' señala el pasado." },
      { s: "この本を___(読む)でしたか？(Kono hon o ___ deshita ka?)", opts: ['読みませんか (yomimasen ka)', '読みましたか (yomimashita ka)', '読みませんでしたか (yomimasen deshita ka)', '読んでか (yonde ka)'], a: 2, fb: "Pregunta pasada negativa: '読みませんでしたか？' (yomimasen deshita ka?) = ¿No leyó este libro?" },
    ],
    transforms: [
      { prompt: "Convierte al pasado formal (～ました):", s: "今日、公園に行きます。(Kyō, kōen ni ikimasu.) [ayer]", opts: ["昨日、公園に行きました。(Kinō, kōen ni ikimashita.)", "昨日、公園に行くました。(Kinō, kōen ni ikumashita.)", "昨日、公園に行ってました。(Kinō, kōen ni itte mashita.)", "昨日、公園に行きます。(Kinō, kōen ni ikimasu.)"], a: 0, fb: "'行きます' → pasado formal: '行きました' (ikimashita). Cambia 'きます' → 'きました'. También cambia '今日' → '昨日'." },
      { prompt: "Forma el pasado negativo formal:", s: "朝ごはんを食べます。(Asagohan o tabemasu.)", opts: ["朝ごはんを食べませんでした。(Asagohan o tabemasen deshita.)", "朝ごはんを食べませんです。(Asagohan o tabemasen desu.)", "朝ごはんを食べなかった。(Asagohan o tabenakatta.)", "朝ごはんを食べたません。(Asagohan o tabeta masen.)"], a: 0, fb: "Negativo pasado formal: ～ません + でした = '食べませんでした' (tabemasen deshita). No desayuné." },
      { prompt: "Haz una pregunta en pasado:", s: "彼は映画を見ました。(Kare wa eiga o mimashita.)", opts: ["彼は映画を見ましたか？(Kare wa eiga o mimashita ka?)", "彼は映画を見ますか？(Kare wa eiga o mimasu ka?)", "彼は映画を見たか？(Kare wa eiga o mita ka?)", "彼は映画を見てか？(Kare wa eiga o mite ka?)"], a: 0, fb: "Pregunta formal en pasado: agrega か al final de la oración en ～ました: '見ましたか？' (mimashita ka?)" },
    ],
    errors: [
      { s: "昨日、映画を見ます。(Kinō, eiga o mimasu.)", q: "¿Cuál es el error temporal?", opts: ["'見ます' debe ser '見ました' (mimashita) — es pasado", "'昨日' debe ser '今日'", "'映画を' debe ser '映画が'", "No hay error"], a: 0, fb: "'昨日 (kinō) = ayer' exige pasado: '見ました' (mimashita). '見ます' es presente. Nunca uses presente con marcadores de tiempo pasado como 昨日, 先週, 去年." },
      { s: "先週、友達に話しませんです。(Senshū, tomodachi ni hanashimasen desu.)", q: "¿Qué está mal en el negativo pasado?", opts: ["'ませんです' debe ser 'ませんでした' (masen deshita)", "'話し' debe ser '話す'", "'先週' debe ir al final", "No hay error"], a: 0, fb: "Negativo pasado formal: ～ません + でした = 'ませんでした'. 'ませんです' es incorrecto — mezcla presente y pasado." },
    ],
    production: "Escribe 4 frases sobre lo que hiciste el fin de semana pasado. Usa la forma ～ました para al menos 3 verbos. Empieza con: '先週末、私は___ (Senshūmatsu, watashi wa ___). También incluye al menos un negativo ～ませんでした.'"
  },
  {
    id: 'te_imasu', title: '～ています (Progresivo / Estado)', icon: '🔄',
    rule: "～ています (te-form + います) tiene DOS usos: (1) PROGRESIVO: acción en curso AHORA ('今 食べています — Ima tabete imasu — Estoy comiendo ahora'). (2) ESTADO RESULTANTE: resultado de una acción pasada que persiste ('結婚しています — Kekkon shite imasu — Estoy casado/a'; '住んでいます — Sunde imasu — Vivo en...'). Con el segundo uso, NO implica que la acción ocurre AHORA, sino que el resultado de la acción es el estado actual.",
    tip: "Clave para distinguir los usos: verbos de proceso (comer, correr, hablar) → progresivo. Verbos de cambio de estado (casarse, llegar, conocer) → estado resultante. 'わかっています (wakatte imasu)' = ya lo sé/entiendo (estado, no proceso). NUNCA digas 'わかっています' para 'estoy entendiendo'.",
    table: {
      headers: ['Uso', 'Verbo', 'て-form + います', 'Romaji', 'Significado'],
      rows: [
        ['Progresivo', '食べる (taberu)', '食べています', 'tabete imasu', 'estoy comiendo (ahora)'],
        ['Progresivo', '走る (hashiru)', '走っています', 'hashitte imasu', 'estoy corriendo'],
        ['Estado', '結婚する (kekkon suru)', '結婚しています', 'kekkon shite imasu', 'estoy casado/a'],
        ['Estado', '住む (sumu)', '住んでいます', 'sunde imasu', 'vivo en (estado)'],
        ['Estado', '知る (shiru)', '知っています', 'shitte imasu', 'sé / lo conozco'],
        ['Negativo', '—', '～ていません', 'te imasen', 'no estoy ___'],
      ]
    },
    a1note: "En A1 describías el estado simple: '私は学生です (Watashi wa gakusei desu) — Soy estudiante.' En A2, ～ています añade dinamismo: '今、日本語を勉強しています (Ima, nihongo o benkyō shite imasu) — Ahora estoy estudiando japonés.' También: '東京に住んでいます (Tōkyō ni sunde imasu) — Vivo en Tokio (estado resultado de mudarse).'",
    examples: [
      "今、音楽を聴いています。(Ima, ongaku o kiite imasu.) — Ahora estoy escuchando música. [progresivo]",
      "彼女は東京に住んでいます。(Kanojo wa Tōkyō ni sunde imasu.) — Ella vive en Tokio. [estado resultado]",
      "その映画を知っています。(Sono eiga o shitte imasu.) — Conozco esa película. [estado de conocimiento]",
    ],
    fills: [
      { s: "今、彼は部屋で___(勉強する)。(Ima, kare wa heya de ___)", opts: ['勉強しています (benkyō shite imasu)', '勉強します (benkyō shimasu)', '勉強した (benkyō shita)', '勉強して (benkyō shite)'], a: 0, fb: "'今 (ima) = ahora' + acción en curso → progresivo: '勉強しています' (benkyō shite imasu). する→して+います." },
      { s: "彼女はどこに___(住む)か？(Kanojo wa doko ni ___ ka?)", opts: ['住んでいますか (sunde imasu ka)', '住みますか (sumimasu ka)', '住んだか (sunda ka)', '住むか (sumu ka)'], a: 0, fb: "Vivir = estado resultado → '住んでいますか？' (sunde imasu ka?). 住む es G1 -む: nonde → sunde." },
      { s: "すみません、その映画を___(知る)か？(Sumimasen, sono eiga o ___ ka?)", opts: ['知っていますか (shitte imasu ka)', '知りますか (shirimasu ka)', '知ったか (shitta ka)', '知るか (shiru ka)'], a: 0, fb: "'知る' con ～ています = estado de conocimiento. '知っていますか？' (shitte imasu ka?) = ¿Lo conoce? Es estado, no progresivo." },
      { s: "今、雨が___(降る)。(Ima, ame ga ___)", opts: ['降っています (futte imasu)', '降ります (furimasu)', '降った (futta)', '降って (futte)'], a: 0, fb: "'降る' (G1 -る→って): '降って' + います = '降っています' (futte imasu). La lluvia es una acción en curso ahora." },
      { s: "彼は結婚___(する)か？(Kare wa kekkon ___ ka?)", opts: ['していますか (shite imasu ka)', 'しますか (shimasu ka)', 'したか (shita ka)', 'してか (shite ka)'], a: 0, fb: "Estado resultado del matrimonio: '結婚していますか？' (kekkon shite imasu ka?) = ¿Está casado? する→して+います." },
    ],
    transforms: [
      { prompt: "Describe qué está haciendo ahora (progresivo):", s: "田中さんは電話を話す。(Tanaka-san wa denwa o hanasu.) [ahora mismo]", opts: ["田中さんは電話で話しています。(Tanaka-san wa denwa de hanashite imasu.)", "田中さんは電話で話します。(Tanaka-san wa denwa de hanashimasu.)", "田中さんは電話で話した。(Tanaka-san wa denwa de hanashita.)", "田中さんは電話で話して。(Tanaka-san wa denwa de hanashite.)"], a: 0, fb: "Progresivo: '話す' → '話して' + います = '話しています' (hanashite imasu). Acción en curso ahora." },
      { prompt: "Expresa el estado resultado:", s: "彼女は結婚した。(Kanojo wa kekkon shita.) → [estado actual]", opts: ["彼女は結婚しています。(Kanojo wa kekkon shite imasu.)", "彼女は結婚しました。(Kanojo wa kekkon shimashita.)", "彼女は結婚しています。(Kanojo wa kekkon shite imasu.)", "彼女は結婚します。(Kanojo wa kekkon shimasu.)"], a: 0, fb: "Estado resultado: '結婚しています' (kekkon shite imasu) = está casada (el matrimonio es el estado actual). '結婚しました' = se casó (evento pasado)." },
      { prompt: "Haz negativo el progresivo:", s: "彼は今、テレビを見ています。(Kare wa ima, terebi o mite imasu.)", opts: ["彼は今、テレビを見ていません。(Kare wa ima, terebi o mite imasen.)", "彼は今、テレビを見ません。(Kare wa ima, terebi o mimasen.)", "彼は今、テレビを見ていなかった。(Kare wa ima, terebi o mite inakatta.)", "彼は今、テレビを見なかった。(Kare wa ima, terebi o minakatta.)"], a: 0, fb: "Negativo de ～ています: ～ていません (te imasen). '見ていません' (mite imasen) = no está mirando." },
    ],
    errors: [
      { s: "毎日、走っています。(Mainichi, hashitte imasu.)", q: "¿Es este uso correcto de ～ています?", opts: ["No: '毎日 (mainichi)' indica hábito — debería ser '走ります (hashirimasu)'", "Sí, es correcto — expresa hábito continuo", "No: debería ser '走った (hashitta)'", "No: debería ser '走って (hashitte)'"], a: 1, fb: "¡Correcto! ～ています también puede indicar hábito continuo o actividad regular: '毎日走っています' = Corro todos los días (como actividad habitual que define mi estado actual). ¡Ambos usos son válidos!" },
      { s: "今、日本語がわかっています。(Ima, nihongo ga wakatte imasu.)", q: "¿Qué está mal semánticamente?", opts: ["'わかっています' es correcto para estado de comprensión, no para proceso activo", "'わかっています' debería ser 'わかります'", "'今' no se usa con ～ています", "No hay error"], a: 0, fb: "'わかっています' = ya lo sé/entiendo (estado permanente). Si quieres decir 'lo entiendo' en general, usa 'わかります (wakarimasu)'. '今わかっています' suena raro porque わかる es un estado, no un proceso." },
    ],
    production: "Describe qué estás haciendo ahora mismo y 2 estados actuales de tu vida (dónde vives, si estudias/trabajas, etc.) usando ～ています. Ejemplo: '今、日本語を勉強しています。大阪に住んでいます。仕事をしています。'"
  },
  {
    id: 'tai_desu', title: '～たいです (Querer hacer)', icon: '💫',
    rule: "～たいです = quiero + verbo. Formación: verbo en stem (quitar ます de la forma ～ます) + たいです. Negativo: ～たくないです. Pregunta: ～たいですか？ Para referirse al deseo de OTRA persona: ～たがっています (él/ella quiere). Objeto: puede usar を o が (más subjetivo/desiderativo). Ejemplos: 食べたいです (tabetai desu / quiero comer), 行きたいです (ikitai desu / quiero ir), 勉強したいです (benkyō shitai desu / quiero estudiar).",
    tip: "Truco: quita ます de la forma polite y agrega たいです. 食べます→食べ+たいです=食べたいです. 飲みます→飲み+たいです=飲みたいです. CUIDADO: ～たいです solo se usa para hablar de los propios deseos. Para terceros usa ～たがっています: '彼は日本語を勉強したがっています (Kare wa nihongo o benkyō shitagatte imasu) = Él quiere estudiar japonés.'",
    table: {
      headers: ['Forma', 'Ejemplo', 'Romaji', 'Significado'],
      rows: [
        ['Afirmativo', '食べたいです', 'tabetai desu', 'quiero comer'],
        ['Negativo', '食べたくないです', 'tabetakunai desu', 'no quiero comer'],
        ['Pregunta', '食べたいですか？', 'tabetai desu ka?', '¿quiere comer?'],
        ['Pasado', '食べたかったです', 'tabetakatta desu', 'quería comer'],
        ['3a persona', '食べたがっています', 'tabetagatte imasu', 'él/ella quiere comer'],
        ['Con が', 'コーヒーが飲みたいです', 'kōhī ga nomitai desu', 'quiero (tomar) café'],
      ]
    },
    a1note: "En A1 expresabas necesidades básicas: '水をください (Mizu o kudasai) — Agua, por favor.' En A2, ～たいです expresa deseos más elaborados: '日本に行きたいです (Nihon ni ikitai desu) — Quiero ir a Japón.' También puedes hablar de planes y aspiraciones con más precisión.",
    examples: [
      "今年、日本語能力試験を受けたいです。(Kotoshi, nihongo nōryoku shiken o uketai desu.) — Este año quiero tomar el examen JLPT.",
      "甘いものは食べたくないです。(Amai mono wa tabetakunai desu.) — No quiero comer cosas dulces.",
      "どこか静かなところに行きたいですか？(Dokoka shizuka na tokoro ni ikitai desu ka?) — ¿Quieres ir a algún lugar tranquilo?",
    ],
    fills: [
      { s: "将来、日本に___(住む)です。(Shōrai, Nihon ni ___ desu.)", opts: ['住みたい (sumitai)', '住む (sumu)', '住んだ (sunda)', '住みます (sumimasu)'], a: 0, fb: "'住む' → stem: '住み' + たい = '住みたい(desu)' (sumitai desu). Quiero vivir en Japón en el futuro." },
      { s: "今は何も___(食べる)です。(Ima wa nanimo ___ desu.)", opts: ['食べたくない (tabetakunai)', '食べたい (tabetai)', '食べません (tabemasen)', '食べた (tabeta)'], a: 0, fb: "Deseo negativo: '食べたくないです' (tabetakunai desu). '何も (nanimo) = nada' + negativo." },
      { s: "来年、スペイン語を___(勉強する)ですか？(Rainen, supeingo o ___ desu ka?)", opts: ['勉強したい (benkyō shitai)', '勉強します (benkyō shimasu)', '勉強した (benkyō shita)', '勉強して (benkyō shite)'], a: 0, fb: "Pregunta sobre deseo: '勉強したいですか？' (benkyō shitai desu ka?). する→し+たい=したい." },
      { s: "のどが渇いた。冷たい水が___(飲む)。(Nodo ga kawaita. Tsumetai mizu ga ___)", opts: ['飲みたい (nomitai)', '飲みます (nomimasu)', '飲んだ (nonda)', '飲んで (nonde)'], a: 0, fb: "'飲む' → stem: '飲み' + たい = '飲みたい' (nomitai). Con が marca el objeto del deseo de forma subjetiva." },
      { s: "彼は新しい仕事を見つけ___(たい)です。(Kare wa atarashii shigoto o mitsuke ___ desu.)", opts: ['たがっています (tagatteimasu)', 'たいです (tai desu)', 'たかったです (takatta desu)', 'たくないです (takunai desu)'], a: 0, fb: "Para el deseo de un tercero (彼 = él): '～たがっています' (tagatteimasu). '見つけたがっています' = él quiere encontrar." },
    ],
    transforms: [
      { prompt: "Expresa tu deseo con ～たいです:", s: "Quiero aprender japonés este año.", opts: ["今年、日本語を学びたいです。(Kotoshi, nihongo o narabitai desu.)", "今年、日本語を学びます。(Kotoshi, nihongo o narabimasu.)", "今年、日本語を学んだ。(Kotoshi, nihongo o naranda.)", "今年、日本語が学びます。(Kotoshi, nihongo ga narabimasu.)"], a: 0, fb: "'学ぶ (manabu)' → stem: '学び' + たいです = '学びたいです'. Kotoshi (este año) + deseo." },
      { prompt: "Convierte al negativo ～たくないです:", s: "早く起きたいです。(Hayaku okitai desu.)", opts: ["早く起きたくないです。(Hayaku okitakunai desu.)", "早く起きたくない。(Hayaku okitakunai.)", "早く起きません。(Hayaku okimasen.)", "早く起きなかった。(Hayaku okinakatta.)"], a: 0, fb: "Negativo de ～たいです: quita い → agrega くないです = 'たくないです'. '起きたいです' → '起きたくないです'." },
      { prompt: "Expresa el deseo de un tercero:", s: "彼女は海外に行きたいです。(Kanojo wa kaigai ni ikitai desu.) [forma incorrecta para 3a persona]", opts: ["彼女は海外に行きたがっています。(Kanojo wa kaigai ni ikitagatte imasu.)", "彼女は海外に行きたいです。(Kanojo wa kaigai ni ikitai desu.)", "彼女は海外に行きます。(Kanojo wa kaigai ni ikimasu.)", "彼女は海外が行きたい。(Kanojo wa kaigai ga ikitai.)"], a: 0, fb: "～たいです = propios deseos. Para terceros: ～たがっています. '行きたがっています' (ikitagatte imasu) = ella quiere ir." },
    ],
    errors: [
      { s: "彼はコーヒーを飲みたいです。(Kare wa kōhī o nomitai desu.)", q: "¿Hay un problema de uso?", opts: ["Sí: para terceros debería ser '飲みたがっています' (nomitagatte imasu)", "No: ～たいです se puede usar para cualquier persona", "Sí: debería ser '飲みたくないです'", "Sí: 'コーヒーを' debe ser 'コーヒーが'"], a: 0, fb: "En japonés formal, ～たいです generalmente solo se usa para los propios deseos. Para terceros (彼 = él), la forma correcta es ～たがっています: '彼はコーヒーを飲みたがっています。'" },
      { s: "日本語を勉強したいくないです。(Nihongo o benkyō shitai kunai desu.)", q: "¿Cuál es el error gramatical?", opts: ["'たいくない' debe ser 'たくない'", "'勉強したい' debe ser '勉強したく'", "'日本語を' debe ser '日本語が'", "No hay error"], a: 0, fb: "Negativo de ～たいです: quita い → + くないです. 'したいです' → 'したくないです'. Nunca 'したいくない'." },
    ],
    production: "Escribe 4 frases sobre lo que quieres hacer este año. Incluye al menos 1 negativo (～たくないです) y 1 pregunta a un amigo (～たいですか？). Empieza con: '今年、___たいです。でも、___たくないです。'"
  },
  {
    id: 'dekimasu_nakereba', title: '～ことができます / ～なければなりません', icon: '🎯',
    rule: "～ことができます = poder (habilidad/posibilidad). Formación: diccionario + ことができます. Equivalente informal: ～られる (potencial). ～なければなりません = deber/tener que. Formación: nai-form + ければなりません. Forma corta: ～なきゃ (coloquial). Negativo de obligación (no hace falta): ～なくてもいいです. Ejemplos: 日本語を話すことができます (Nihongo o hanasu koto ga dekimasu / puedo hablar japonés). 毎日勉強しなければなりません (Mainichi benkyō shinakereba narimasen / debo estudiar todos los días).",
    tip: "Truco para なければなりません: 1) Forma la nai-form: 食べる→食べない, 行く→行かない, する→しない. 2) Quita い → agrega ければなりません. '食べない→食べなければなりません.' Forma corta coloquial: '食べなきゃ (tabenakya).' Negativo de obligación: '食べなくてもいいです (tabenakute mo ii desu) = no tienes que comer.'",
    table: {
      headers: ['Estructura', 'Formación', 'Ejemplo', 'Significado'],
      rows: [
        ['～ことができます', 'dict. + ことができます', '泳ぐことができます', 'puedo nadar'],
        ['～ことができません', 'dict. + ことができません', '泳ぐことができません', 'no puedo nadar'],
        ['～なければなりません', 'nai-form + ければなりません', '行かなければなりません', 'debo ir'],
        ['～なきゃ (coloquial)', 'nai-form + きゃ', '行かなきゃ', 'tengo que ir'],
        ['～なくてもいいです', 'nai-form + くてもいいです', '行かなくてもいいです', 'no tienes que ir'],
      ]
    },
    a1note: "En A1 usabas 'できます (dekimasu) = puedo' con sustantivos: '日本語ができます (Nihongo ga dekimasu) = Puedo (hablar) japonés.' En A2, la estructura ～ことができます añade un verbo en diccionario: '日本語を話すことができます (Nihongo o hanasu koto ga dekimasu) = Puedo hablar japonés.' Más precisa y expresiva.",
    examples: [
      "日本語を少し話すことができます。(Nihongo o sukoshi hanasu koto ga dekimasu.) — Puedo hablar un poco de japonés.",
      "明日、早く起きなければなりません。(Ashita, hayaku okinakereba narimasen.) — Mañana debo levantarme temprano.",
      "今日は残業しなくてもいいです。(Kyō wa zangyō shinakute mo ii desu.) — Hoy no tienes que hacer horas extra.",
    ],
    fills: [
      { s: "彼女はピアノを弾く___(できる)か？(Kanojo wa piano o hiku ___ ka?)", opts: ['ことができますか (koto ga dekimasu ka)', 'ことができません (koto ga dekimasen)', 'ことができた (koto ga dekita)', 'ことが (koto ga)'], a: 0, fb: "Habilidad en pregunta: '弾くことができますか？' (hiku koto ga dekimasu ka?) = ¿Puede tocar el piano? dict. form + ことができますか." },
      { s: "試験があるので、今夜は勉強し___(ない)なりません。(Shiken ga aru node, konya wa benkyō shi ___ narimasen.)", opts: ['なければ (nakereba)', 'ないで (naide)', 'なくて (nakute)', 'ない (nai)'], a: 0, fb: "Obligación: '勉強しなければなりません' (benkyō shinakereba narimasen). する→しない→しなければ+なりません." },
      { s: "ここでは日本語を話す___(できる)。(Koko de wa nihongo o hanasu ___.)", opts: ['ことができます (koto ga dekimasu)', 'ことができません (koto ga dekimasen)', 'ことができた (koto ga dekita)', 'こと (koto)'], a: 0, fb: "Posibilidad en este lugar: 'ここでは～ことができます' = aquí se puede / puedo." },
      { s: "この書類を今日中に出さ___(ない)なりません。(Kono shorui o kyōjū ni dasa ___ narimasen.)", opts: ['なければ (nakereba)', 'ないで (naide)', 'なくて (nakute)', 'ました (mashita)'], a: 0, fb: "'出す (dasu)' nai-form: '出さない' → '出さなければなりません' (dasanakereba narimasen). Debo entregar este documento hoy." },
      { s: "週末は来___(ない)もいいですよ。(Shūmatsu wa ko ___ mo ii desu yo.)", opts: ['なくて (nakute)', 'なければ (nakereba)', 'ない (nai)', 'ません (masen)'], a: 0, fb: "Negativo de obligación: '来なくてもいいです' (konakute mo ii desu) = no tienes que venir. くる→こない→こなくて+もいいです." },
    ],
    transforms: [
      { prompt: "Expresa habilidad con ～ことができます:", s: "Puedo cocinar comida japonesa.", opts: ["日本料理を作ることができます。(Nihon ryōri o tsukuru koto ga dekimasu.)", "日本料理を作ります。(Nihon ryōri o tsukurimasu.)", "日本料理を作ることができません。(Nihon ryōri o tsukuru koto ga dekimasen.)", "日本料理を作るができます。(Nihon ryōri o tsukuru ga dekimasu.)"], a: 0, fb: "Habilidad: 'dict. form + ことができます'. '作る (tsukuru) + ことができます' = puedo hacer. '日本料理を作ることができます。'" },
      { prompt: "Expresa obligación con ～なければなりません:", s: "Debo trabajar mañana.", opts: ["明日、働かなければなりません。(Ashita, hatarakanakereba narimasen.)", "明日、働きます。(Ashita, hatarakimasu.)", "明日、働くことができます。(Ashita, hataraku koto ga dekimasu.)", "明日、働いてなりません。(Ashita, hataraite narimasen.)"], a: 0, fb: "'働く (hataraku)' nai-form: '働かない' → '働かなければなりません'. Debo trabajar mañana." },
      { prompt: "Expresa que NO es necesario:", s: "No tienes que venir a la reunión.", opts: ["会議に来なくてもいいです。(Kaigi ni konakute mo ii desu.)", "会議に来なければなりません。(Kaigi ni konakereba narimasen.)", "会議に来ることができません。(Kaigi ni kuru koto ga dekimasen.)", "会議に来ないです。(Kaigi ni konai desu.)"], a: 0, fb: "No obligatorio: '～なくてもいいです'. 'くる→こない→こなくて+もいいです' = '来なくてもいいです' (konakute mo ii desu)." },
    ],
    errors: [
      { s: "日本語をこと話すができます。(Nihongo o koto hanasu ga dekimasu.)", q: "¿Cuál es el error de orden?", opts: ["El orden correcto es: 日本語を話すことができます (nihongo o hanasu koto ga dekimasu)", "'ができます' debe ser 'ことできます'", "'日本語を' debe ser '日本語が'", "No hay error"], a: 0, fb: "El orden es: objeto + verbo (dict.) + ことができます. '日本語を話すことができます.' 'こと' siempre va DESPUÉS del verbo en diccionario." },
      { s: "毎日運動しなければいけません。(Mainichi undō shinakereba ikemasen.)", q: "¿Hay un error?", opts: ["No es error — ～なければいけません también es correcto", "Debe ser ～なければなりません", "Debe ser ～なければなりません — ikemasen no existe", "Sí, debe ser ～なくてもいいです"], a: 0, fb: "¡Atención! Tanto '～なければなりません' como '～なければいけません' son correctas y comunes en japonés cotidiano. '～なければいけません (nakereba ikemasen)' es incluso más frecuente en conversación informal." },
    ],
    production: "Escribe 3 cosas que puedes hacer en japonés (ことができます) y 3 cosas que debes hacer esta semana (なければなりません). Ejemplo: '日本語を少し話すことができます。毎日練習しなければなりません。'"
  },
];

export default function GramaticaJaponesA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [fillAns, setFillAns] = useState<Record<number, number>>({});
  const [transAns, setTransAns] = useState<Record<number, number>>({});
  const [errAns, setErrAns] = useState<Record<number, number>>({});
  const [prodText, setProdText] = useState('');
  const [prodDone, setProdDone] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const t = TOPICS[topicIdx];
  const allFill = t.fills.every((_, i) => fillAns[i] !== undefined);
  const allTrans = t.transforms.every((_, i) => transAns[i] !== undefined);
  const allErr = t.errors.every((_, i) => errAns[i] !== undefined);
  const allMCQ = allFill && allTrans && allErr;
  const total = t.fills.length + t.transforms.length + t.errors.length;
  const correct =
    t.fills.filter((q, i) => fillAns[i] === q.a).length +
    t.transforms.filter((q, i) => transAns[i] === q.a).length +
    t.errors.filter((q, i) => errAns[i] === q.a).length;

  function reset() {
    setFillAns({}); setTransAns({}); setErrAns({});
    setProdText(''); setProdDone(false); setShowResult(false);
  }

  function bs(done: boolean, ok: boolean, sel: boolean) {
    if (!done) return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--ink)' };
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: 'var(--wl-on-panel-ok, #059669)' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: 'var(--wl-on-panel-alert, #dc2626)' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 文法</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />文法 · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas con tabla de conjugación, ejemplos reales, fill-in-blank, transformaciones, detección de errores y producción libre.
        </p>

        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TOPICS.map((tp, i) => (
            <button key={tp.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: C, borderColor: C } : {}) }}>
              {tp.icon} {tp.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 16, background: `${C}08`, border: `1.5px solid ${C}22`, marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.5rem', fontSize: '1rem' }}>{t.icon} {t.title}</div>
          <p style={{ margin: '0 0 0.6rem', fontSize: '0.87rem', color: 'var(--muted)', lineHeight: 1.7 }}>{t.rule}</p>
          <div style={{ padding: '0.5rem 0.75rem', borderRadius: 8, background: `${C}0d`, fontSize: '0.82rem', color: C, borderLeft: `3px solid ${C}`, marginBottom: '0.85rem', lineHeight: 1.6 }}>
            💡 {t.tip}
          </div>
          <div style={{ overflowX: 'auto', marginBottom: '0.85rem' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', minWidth: 380 }}>
              <thead>
                <tr>{t.table.headers.map((h, hi) => (
                  <th key={hi} style={{ padding: '0.45rem 0.7rem', background: `${C}18`, border: '1px solid var(--line-soft)', textAlign: 'left', fontWeight: 800, color: 'var(--ink)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}</tr>
              </thead>
              <tbody>
                {t.table.rows.map((row, ri) => (
                  <tr key={ri}>{row.map((cell, ci) => (
                    <td key={ci} style={{ padding: '0.4rem 0.7rem', border: '1px solid var(--line-soft)', color: 'var(--ink)', lineHeight: 1.45, background: ri % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.015)' }}>{cell}</td>
                  ))}</tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', padding: '0.5rem 0.75rem', borderRadius: 8, background: 'rgba(0,0,0,0.04)', borderLeft: '3px solid var(--muted)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
            📌 <strong style={{ color: 'var(--ink)' }}>vs A1:</strong> {t.a1note}
          </div>
          <div style={{ fontSize: '0.68rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Ejemplos en contexto real</div>
          {t.examples.map((ex, ei) => (
            <p key={ei} style={{ margin: '0 0 0.3rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.6, borderLeft: '2px solid var(--line-soft)', paddingLeft: '0.6rem' }}>
              &ldquo;{ex}&rdquo;
            </p>
          ))}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>📝</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Completa las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.fills.filter((_, i) => fillAns[i] !== undefined).length}/{t.fills.length}
            </span>
          </div>
          {t.fills.map((q, qi) => {
            const ans = fillAns[qi]; const done = ans !== undefined;
            const parts = q.s.split('___');
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <p style={{ margin: '0 0 0.7rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {qi + 1}.{' '}
                  {parts.map((part, pi) => (
                    <span key={pi}>{part}{pi < parts.length - 1 && (
                      <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${C}`, margin: '0 3px', textAlign: 'center', verticalAlign: 'bottom' }}>
                        {done && <span style={{ fontSize: '0.85rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                      </span>
                    )}</span>
                  ))}
                </p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setFillAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.9rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 700, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔄</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Transforma las oraciones</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.transforms.filter((_, i) => transAns[i] !== undefined).length}/{t.transforms.length}
            </span>
          </div>
          {t.transforms.map((q, qi) => {
            const ans = transAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-warn, #d97706)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
                <p style={{ margin: '0 0 0.7rem', fontSize: '0.92rem', color: 'var(--ink)', fontStyle: 'italic', borderLeft: '3px solid var(--line-soft)', paddingLeft: '0.5rem', fontWeight: 600 }}>
                  &ldquo;{q.s}&rdquo;
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setTransAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.5rem 0.9rem', borderRadius: 8, fontSize: '0.87rem', ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.12s', lineHeight: 1.45 }}>
                        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', opacity: 0.6, marginRight: '0.4rem' }}>{['A', 'B', 'C', 'D'][oi]}.</span>
                        {opt}{done && oi === q.a && ' ✓'}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ ' : `✗ Correcta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>🔍</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Detecta el error</span>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              {t.errors.filter((_, i) => errAns[i] !== undefined).length}/{t.errors.length}
            </span>
          </div>
          {t.errors.map((q, qi) => {
            const ans = errAns[qi]; const done = ans !== undefined;
            return (
              <div key={qi} style={{ padding: '1rem 1.2rem', borderRadius: 12, border: `1.5px solid ${done ? (ans === q.a ? '#05966955' : '#dc262644') : 'var(--line-soft)'}`, background: done ? (ans === q.a ? 'rgba(5,150,105,0.03)' : 'rgba(220,38,38,0.03)') : 'var(--bg)', marginBottom: '0.7rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-alert, #dc2626)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Encuentra el error</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--wl-on-panel-alert, #dc2626)', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.83rem', color: 'var(--muted)' }}>{q.q}</p>
                <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                  {q.opts.map((opt, oi) => {
                    const st = bs(done, oi === q.a, ans === oi);
                    return (
                      <button key={oi} onClick={() => !done && setErrAns(p => ({ ...p, [qi]: oi }))} disabled={done}
                        style={{ padding: '0.4rem 0.85rem', borderRadius: 7, fontSize: '0.85rem', fontWeight: 600, ...st, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.12s' }}>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {done && (
                  <div style={{ marginTop: '0.5rem', fontSize: '0.78rem', padding: '0.4rem 0.65rem', borderRadius: 7, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {ans === q.a ? '✅ Correcto. ' : `✗ Respuesta: "${q.opts[q.a]}". `}{q.fb}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <span>✍️</span>
            <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.95rem' }}>Producción libre</span>
          </div>
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.2)', marginBottom: '0.85rem' }}>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7 }}>{t.production}</p>
          </div>
          {!allMCQ && (
            <p style={{ fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic' }}>
              🔒 Completa todos los ejercicios de arriba para desbloquear la producción libre.
            </p>
          )}
          {allMCQ && !prodDone && (
            <>
              <textarea value={prodText} onChange={e => setProdText(e.target.value)} rows={5}
                placeholder="Escribe tu respuesta aquí en japonés (romaji o kana/kanji)..."
                style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.92rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                  {prodText.trim() ? prodText.trim().split(/\s+/).length : 0} palabras
                </span>
                <button className="btn btn-sm"
                  onClick={() => { if (prodText.trim().split(/\s+/).filter(Boolean).length >= 5) setProdDone(true); }}
                  disabled={prodText.trim().split(/\s+/).filter(Boolean).length < 5}
                  style={{ background: '#059669', borderColor: '#059669', opacity: prodText.trim().split(/\s+/).filter(Boolean).length >= 5 ? 1 : 0.5 }}>
                  Listo →
                </button>
              </div>
            </>
          )}
          {prodDone && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(5,150,105,0.06)', border: '1.5px solid rgba(5,150,105,0.25)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tu producción</div>
              <p style={{ margin: '0 0 0.7rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>{prodText}</p>
              <button className="btn btn-ghost btn-sm" onClick={() => { setProdText(''); setProdDone(false); }} style={{ fontSize: '0.78rem' }}>Editar</button>
            </div>
          )}
        </div>

        {allMCQ && prodDone && !showResult && (
          <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: C, borderColor: C, marginBottom: '1rem' }}>
            Ver resultado del tema →
          </button>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: `2px solid ${C}33`, background: `${C}06`, textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>
              {correct === total ? '🏆' : correct >= Math.ceil(total * 0.7) ? '⭐' : '📖'}
            </div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.3rem' }}>
              {correct} / {total} ejercicios correctos
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem', lineHeight: 1.6 }}>
              {correct === total
                ? '¡Perfecto! Dominas este tema A2.'
                : correct >= Math.ceil(total * 0.7)
                ? 'Muy bien. Repasa los ejercicios marcados con ✗.'
                : 'Estudia la explicación arriba y vuelve a intentarlo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: C, borderColor: C }}>Intentar de nuevo</button>
              {topicIdx < TOPICS.length - 1 && (
                <button className="btn btn-ghost btn-sm" onClick={() => { setTopicIdx(topicIdx + 1); reset(); }}>
                  Siguiente tema →
                </button>
              )}
              <Link href="/practica/japones/a2" className="btn btn-ghost btn-sm">Volver a A2</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
