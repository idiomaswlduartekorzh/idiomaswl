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
  b1note: string; examples: string[];
  fills: FQ[]; transforms: TQ[]; errors: EQ[]; production: string;
}

const TOPICS: Topic[] = [
  {
    id: 'permission', title: '〜てもいい / 〜てはいけない (Permiso/Prohibición)', icon: '🚦',
    rule: "〜てもいい = está bien si... / se permite (て-form + もいいです). 〜てはいけない = no se puede / está prohibido (て-form + はいけません). Para pedir permiso formalmente: 〜てもよろしいですか？ (muy formal). Para prohibición más fuerte: 〜てはなりません (lenguaje oficial/legal). La diferencia entre B1 y A2 es el contexto más formal y la capacidad de negar o matizar permisos.",
    tip: "Truco: もいい suaviza la acción (¿está OK?), はいけない la corta en seco (¡no!). En contextos laborales o formales, usa もよろしいですか en lugar de もいいですか para mayor respeto.",
    table: {
      headers: ['Estructura', 'Formación', 'Ejemplo', 'Romaji', 'Significado'],
      rows: [
        ['〜てもいいです', 'て-form + もいいです', '入ってもいいです', 'Haitte mo ii desu', 'Puedes entrar / Está bien entrar'],
        ['〜てもいいですか', 'て-form + もいいですか', '写真を撮ってもいいですか', 'Shashin o totte mo ii desu ka', '¿Puedo tomar fotos?'],
        ['〜てもよろしいですか', 'て-form + もよろしいですか', '質問してもよろしいですか', 'Shitsumon shite mo yoroshii desu ka', '¿Me permite hacer una pregunta? (formal)'],
        ['〜てはいけません', 'て-form + はいけません', 'ここで食べてはいけません', 'Koko de tabete wa ikemasen', 'No se puede comer aquí'],
        ['〜てはなりません', 'て-form + はなりません', '嘘をついてはなりません', 'Uso o tsuite wa narimasen', 'No está permitido mentir (oficial)'],
      ]
    },
    b1note: "En A2 aprendiste la forma básica 〜てもいい/〜てはいけない. En B1, domina los contextos formales (よろしいですか) y la prohibición enfática (〜てはなりません). También: 〜なくてもいいです (no hace falta que...) y 〜なくてはいけません (tienes que... / hay que...).",
    examples: [
      "ここで写真を撮ってもいいですか？(Koko de shashin o totte mo ii desu ka?) — ¿Puedo tomar fotos aquí?",
      "ここで写真を撮ってはいけません。(Koko de shashin o totte wa ikemasen.) — Está prohibido tomar fotos aquí.",
      "会議中に携帯を使ってはなりません。(Kaigichū ni keitai o tsukatte wa narimasen.) — No está permitido usar el celular durante la reunión. (formal/reglamentario)",
    ],
    fills: [
      { s: "先生、質問___(する)もよろしいですか？", opts: ['してもよろしいですか (shite mo yoroshii desu ka)', 'するもいいですか (suru mo ii desu ka)', 'したはいけますか (shita wa ikemasu ka)', 'してもいいですか (shite mo ii desu ka)'], a: 0, fb: "Formal: する → して + もよろしいですか = してもよろしいですか。よろしいですか es más respetuoso que いいですか en contextos formales." },
      { s: "図書館では本を___(食べる)いけません。", opts: ['食べてはいけません (tabete wa ikemasen)', '食べるはいけません (taberu wa ikemasen)', '食べないいけません (tabenai ikemasen)', '食べてもいけません (tabete mo ikemasen)'], a: 0, fb: "Prohibición: 食べる → 食べて + はいけません = 食べてはいけません。Siempre usa て-form antes de はいけません." },
      { s: "今日は早退し___(てもいい)ですか？", opts: ['てもいい (te mo ii)', 'てはいけない (te wa ikenai)', 'てもよろしく (te mo yoroshiku)', 'なければならない (nakereba naranai)'], a: 0, fb: "Pedir permiso: 早退してもいいですか = ¿Puedo salir temprano? て-form + もいいですか para solicitar permiso." },
      { s: "契約書にサイン___(する)てはいけません。まだ読んでいません。", opts: ['してはいけません (shite wa ikemasen)', 'してもいいです (shite mo ii desu)', 'するはいいです (suru wa ii desu)', 'していいです (shite ii desu)'], a: 0, fb: "Prohibición: する → して + はいけません = してはいけません。No firmes el contrato todavía (prohibición situacional)." },
      { s: "このエリアでは喫煙___(する)なりません。", opts: ['してはなりません (shite wa narimasen)', 'してもいいです (shite mo ii desu)', 'してはいけません (shite wa ikemasen)', 'するはなりません (suru wa narimasen)'], a: 0, fb: "してはなりません = prohibición más formal/oficial que してはいけません. Se usa en reglamentos, leyes, avisos oficiales." },
    ],
    transforms: [
      { prompt: "Convierte la regla en permiso (formal):", s: "図書館で本を読む (Toshokan de hon o yomu)", opts: ["図書館で本を読んでもよろしいです。(Toshokan de hon o yonde mo yoroshii desu.)", "図書館で本を読んでもいいです。(Toshokan de hon o yonde mo ii desu.)", "図書館で本を読んではいけません。(Toshokan de hon o yonde wa ikemasen.)", "図書館で本を読むはいいです。(Toshokan de hon o yomu wa ii desu.)"], a: 0, fb: "読む → 読んで (G1 -む→んで) + もよろしいです = 読んでもよろしいです。よろしい es la forma más formal de いい." },
      { prompt: "Convierte en prohibición:", s: "ここでタバコを吸う (Koko de tabako o suu)", opts: ["ここでタバコを吸ってはいけません。(Koko de tabako o sutte wa ikemasen.)", "ここでタバコを吸っていいです。(Koko de tabako o sutte ii desu.)", "ここでタバコを吸うはいけません。(Koko de tabako o suu wa ikemasen.)", "ここでタバコを吸ってはいいです。(Koko de tabako o sutte wa ii desu.)"], a: 0, fb: "吸う → 吸って (G1 -う→って) + はいけません = 吸ってはいけません。Prohibición clara: no se puede fumar aquí." },
      { prompt: "Pide permiso de forma muy formal:", s: "会議室を使う (Kaigishitsu o tsukau)", opts: ["会議室を使ってもよろしいでしょうか。(Kaigishitsu o tsukatte mo yoroshii deshō ka.)", "会議室を使ってもいいですか。(Kaigishitsu o tsukatte mo ii desu ka.)", "会議室を使ってはいけませんか。(Kaigishitsu o tsukatte wa ikemasen ka.)", "会議室を使っていいです。(Kaigishitsu o tsukatte ii desu.)"], a: 0, fb: "つかう → つかって + もよろしいでしょうか = 最も丁寧。でしょうか (deshō ka) hace la pregunta aún más cortés que ですか." },
    ],
    errors: [
      { s: "ここで写真を撮るもいいですか？(Koko de shashin o toru mo ii desu ka?)", q: "¿Cuál es el error gramatical?", opts: ["'撮る' debe ser '撮って' (totte) — hay que usar て-form antes de もいいですか", "'もいいですか' debe ser 'もよろしいですか'", "'写真を' debe ser '写真が'", "No hay error"], a: 0, fb: "La estructura es: て-form + もいいですか. 撮る (G1 -る→って): 撮って + もいいですか = 撮ってもいいですか？ Nunca se usa la forma del diccionario directamente." },
      { s: "今日は残業してもいけません。(Kyō wa zangyō shite mo ikemasen.)", q: "¿Qué error hay?", opts: ["'してもいけません' mezcla permiso y prohibición — debe ser 'してはいけません' o 'してもいいです'", "'残業' debe ser '仕事'", "'今日は' debe ir al final", "No hay error"], a: 0, fb: "してもいけません no existe. Para prohibición: してはいけません. Para permiso: してもいいです. No se pueden combinar もy は en este contexto." },
    ],
    production: "Escribe 4 reglas para un lugar (oficina, biblioteca, clase, gimnasio): 2 permisos (〜てもいいです) y 2 prohibiciones (〜てはいけません). Bonus: usa よろしいですか para una pregunta formal.",
  },
  {
    id: 'passive', title: '受身形 (Ukemi-kei — Voz pasiva)', icon: '🔄',
    rule: "La voz pasiva japonesa (受身形) se forma así: Grupo 1 (-u verbs): cambia la vocal final u → a + れる. Ej: 書く (kaku) → 書かれる (kakareru), 読む (yomu) → 読まれる (yomareru). Grupo 2 (-ru verbs): quitar る + られる. Ej: 食べる (taberu) → 食べられる (taberareru). Irregulares: する → される, くる → こられる. La pasiva directa (直接受身): el objeto del activo se convierte en sujeto. La pasiva indirecta (間接受身): el sujeto sufre la acción de otro.",
    tip: "Regla G1 universal: cambia la vocal de la última sílaba de u→a y añade れる. か(ka)→かれる, ば(ba)→ばれる, ま(ma)→まれる, な(na)→なれる, ら(ra)→られる. G2: simplemente añade られる al stem. Memoriza: する→される, くる→こられる.",
    table: {
      headers: ['Grupo', 'Activa', 'Pasiva', 'Romaji (pasiva)', 'Significado'],
      rows: [
        ['G1 -く', '書く (kaku)', '書かれる', 'kakareru', 'ser escrito'],
        ['G1 -む', '読む (yomu)', '読まれる', 'yomareru', 'ser leído'],
        ['G1 -す', '話す (hanasu)', '話される', 'hanasareru', 'ser hablado/dicho'],
        ['G1 -ぬ/ぶ', '呼ぶ (yobu)', '呼ばれる', 'yobareru', 'ser llamado'],
        ['G2', '食べる (taberu)', '食べられる', 'taberareru', 'ser comido'],
        ['Irr.', 'する (suru)', 'される', 'sareru', 'ser hecho'],
        ['Irr.', 'くる (kuru)', 'こられる', 'korareru', 'ser venido (ind.)'],
      ]
    },
    b1note: "En A2 dominas la voz activa. En B1, la pasiva te permite hablar de noticias, reportes y situaciones formales donde el sujeto que sufre la acción es lo importante. 'この小説は夏目漱石によって書かれました' (Esta novela fue escrita por Natsume Soseki). El agente va con に o によって.",
    examples: [
      "先生に褒められた。(Sensei ni homerareta.) — Fui elogiado/a por el/la profesor/a. (pasiva directa)",
      "財布を盗まれた。(Saifu o nusumareta.) — Me robaron la cartera. (pasiva indirecta — el hablante sufre)",
      "この映画は1990年に作られました。(Kono eiga wa 1990-nen ni tsukuraremashita.) — Esta película fue hecha en 1990.",
    ],
    fills: [
      { s: "田中さんは上司に___(叱る)。(Tanaka-san wa jōshi ni ___)", opts: ['叱られた (shikarareta)', '叱る (shikaru)', '叱った (shikatta)', '叱らせた (shikaraseta)'], a: 0, fb: "叱る (G1 -る→ら + れる): 叱られた (shikarareta) = fue regañado por el jefe. Pasiva directa: 上司に = por el jefe (agente)." },
      { s: "その手紙は英語で___(書く)。(Sono tegami wa eigo de ___)", opts: ['書かれた (kakareta)', '書いた (kaita)', '書く (kaku)', '書かせた (kakaseta)'], a: 0, fb: "書く (G1 -く→か + れる): 書かれた (kakareta) = fue escrita. La carta fue escrita en inglés (pasiva de hecho/estado)." },
      { s: "子供の頃、よく親に___(叱る)。(Kodomo no koro, yoku oya ni ___)", opts: ['叱られました (shikararemashita)', '叱りました (shkarimashita)', '叱られます (shikararemasu)', '叱らせました (shikarasemashita)'], a: 0, fb: "叱られました = fui regañado/a. Pasiva indirecta: el hablante sufrió la acción de los padres (oya ni = por los padres)." },
      { s: "このビルは50年前に___(建てる)。(Kono biru wa 50-nen mae ni ___)", opts: ['建てられました (tateraremashita)', '建てました (tatemashita)', '建てる (tateru)', '建てさせました (tatesasemashita)'], a: 0, fb: "建てる (G2 -る→られる): 建てられました (tateraremashita) = fue construido. Pasiva factual: describe cuándo fue construido el edificio." },
      { s: "彼女は友達に悪口を___(言う)、泣いてしまった。(Kanojo wa tomodachi ni warukuchi o ___, naite shimatta.)", opts: ['言われて (iwarete)', '言って (itte)', '言わせて (iwasete)', '言いて (iite)'], a: 0, fb: "言う (G1 -う→わ + れる): 言われて (iwarete) = (le) dijeron cosas malas. Pasiva indirecta: ella sufrió porque le dijeron cosas malas." },
    ],
    transforms: [
      { prompt: "Transforma de activa a pasiva directa:", s: "先生は学生を褒めた。(Sensei wa gakusei o hometa.) — El profesor elogió al estudiante.", opts: ["学生は先生に褒められた。(Gakusei wa sensei ni homerareta.)", "学生は先生を褒めた。(Gakusei wa sensei o hometa.)", "先生は学生に褒められた。(Sensei wa gakusei ni homerareta.)", "学生は先生が褒めた。(Gakusei wa sensei ga hometa.)"], a: 0, fb: "Activa: 先生(S)→学生(O)を褒めた. Pasiva: 学生(S)は先生(agente)に褒められた。El objeto 学生 se convierte en sujeto, el sujeto 先生 se convierte en agente con に." },
      { prompt: "Forma la pasiva indirecta (el hablante sufre):", s: "泥棒が財布を盗んだ。(Dorobō ga saifu o nusunda.) — El ladrón robó la cartera.", opts: ["（私は）泥棒に財布を盗まれた。(Watashi wa dorobō ni saifu o nusumareta.)", "（私は）泥棒が財布を盗んだ。(Watashi wa dorobō ga saifu o nusunda.)", "財布は泥棒に盗まれた。(Saifu wa dorobō ni nusumareta.)", "泥棒に財布が盗まれた。(Dorobō ni saifu ga nusumareta.)"], a: 0, fb: "Pasiva indirecta: 私は (yo, el que sufre) + 泥棒に (por el ladrón, agente) + 財布を (el objeto robado) + 盗まれた (fue robado = me robaron)." },
      { prompt: "Forma la pasiva factual (historia/noticia):", s: "夏目漱石が「坊ちゃん」を書いた。(Natsume Sōseki ga 'Botchan' o kaita.)", opts: ["「坊ちゃん」は夏目漱石によって書かれた。('Botchan' wa Natsume Sōseki ni yotte kakareta.)", "「坊ちゃん」は夏目漱石に書かれた。('Botchan' wa Natsume Sōseki ni kakareta.)", "夏目漱石は「坊ちゃん」を書かれた。(Natsume Sōseki wa 'Botchan' o kakareta.)", "「坊ちゃん」が夏目漱石によって書いた。('Botchan' ga Natsume Sōseki ni yotte kaita.)"], a: 0, fb: "Pasiva factual (estilo periodístico): によって (ni yotte) se usa para el agente cuando es un hecho notable. 書かれた (kakareta) = fue escrito." },
    ],
    errors: [
      { s: "その本は田中さんが読まれた。(Sono hon wa Tanaka-san ga yomareta.)", q: "¿Cuál es el error en las partículas?", opts: ["'が' debe ser 'に' — el agente de la pasiva va con に, no が", "'読まれた' debe ser '読んだ'", "'その本は' debe ser 'その本を'", "No hay error"], a: 0, fb: "En la pasiva, el agente (quien realiza la acción) va con に o によって, nunca con が. Correcto: その本は田中さんに読まれた (El libro fue leído por Tanaka-san)." },
      { s: "私は先生に褒めた。(Watashi wa sensei ni hometa.)", q: "¿Cuál es el problema?", opts: ["'褒めた' debe ser '褒められた' (homerareta) — falta la forma pasiva", "'先生に' debe ser '先生を'", "'私は' debe ser '私が'", "No hay error"], a: 0, fb: "Para decir 'fui elogiado por el profesor': 褒めた (elogié) → 褒められた (fui elogiado). Sin la pasiva, la oración dice 'yo elogié al profesor'." },
    ],
    production: "Escribe 4 oraciones usando la voz pasiva: 2 directas (algo que te hicieron) y 2 factuales (sobre algo histórico o en las noticias). Usa に para el agente personal y によって para hechos notables.",
  },
  {
    id: 'causative', title: '使役形 (Shieki-kei — Voz causativa)', icon: '🎯',
    rule: "La voz causativa expresa que ALGUIEN HACE QUE OTRO haga algo (compulsión) o LO DEJA/PERMITE HACER algo (permiso). Formación: Grupo 1: cambia vocal final u→a + せる. Ej: 書く→書かせる, 読む→読ませる. Grupo 2: quitar る + させる. Ej: 食べる→食べさせる. Irregulares: する→させる, くる→こさせる. Compulsión: 先生は学生に本を読ませた (El profesor hizo que el estudiante leyera). Permiso: 母は私に出かけさせてくれた (Mi madre me dejó salir).",
    tip: "G1: última vocal u→a + せる. か行(k)→かせる, ま行(m)→ませる, な行(n)→なせる, ら行(r)→らせる. G2: simplemente += させる al stem. Doble passive-causative: 〜させられる = ser forzado a hacer algo (¡muy común en el trabajo!)",
    table: {
      headers: ['Grupo', 'Activa', 'Causativa', 'Romaji', 'Significado'],
      rows: [
        ['G1 -く', '書く (kaku)', '書かせる', 'kakaseru', 'hacer que escriban / dejar escribir'],
        ['G1 -む', '飲む (nomu)', '飲ませる', 'nomaseru', 'hacer que beban / dejar beber'],
        ['G1 -す', '話す (hanasu)', '話させる', 'hanasaseru', 'hacer que hablen / dejar hablar'],
        ['G2', '食べる (taberu)', '食べさせる', 'tabesaseru', 'hacer que coman / dejar comer'],
        ['Irr.', 'する (suru)', 'させる', 'saseru', 'hacer hacer / dejar hacer'],
        ['Caus.+Pas.', '〜させる', '〜させられる', '~ saserareru', 'ser forzado a hacer'],
      ]
    },
    b1note: "En A2 aprendiste a hablar de lo que haces. En B1, la causativa añade una dimensión social: relaciones de poder, trabajo, familia. '上司は私に残業させた' (El jefe me hizo trabajar horas extra). La causativa pasiva 〜させられる expresa obligación forzada desde afuera.",
    examples: [
      "先生は学生に本を読ませた。(Sensei wa gakusei ni hon o yomaseta.) — El profesor hizo que el estudiante leyera el libro. (compulsión)",
      "母は私に好きな音楽を聴かせてくれた。(Haha wa watashi ni sukina ongaku o kikasete kureta.) — Mi madre me dejó escuchar la música que me gusta. (permiso)",
      "毎日残業させられる。(Mainichi zangyō saserareru.) — Me hacen/obligan a trabajar horas extra todos los días. (causativa pasiva = forzado)",
    ],
    fills: [
      { s: "親は子供に野菜を___(食べる)。(Oya wa kodomo ni yasai o ___)", opts: ['食べさせた (tabesaseta)', '食べた (tabeta)', '食べられた (taberareta)', '食べてもいい (tabete mo ii)'], a: 0, fb: "食べる (G2) → 食べさせた (tabesaseta). Los padres hicieron que el niño comiera verduras. G2 causativa: stem + させた (pasado)." },
      { s: "先生は生徒に黒板に字を___(書く)。(Sensei wa seito ni kokuban ni ji o ___)", opts: ['書かせた (kakaseta)', '書いた (kaita)', '書かれた (kakareta)', '書かせられた (kakaserareta)'], a: 0, fb: "書く (G1 -く→か + せる): 書かせた (kakaseta). El profesor hizo que el estudiante escribiera en la pizarra." },
      { s: "毎日上司に残業___(する)。会社が嫌だ。(Mainichi jōshi ni zangyō ___ kaisha ga iya da.)", opts: ['させられる (saserareru)', 'させる (saseru)', 'される (sareru)', 'させた (saseta)'], a: 0, fb: "させられる = causativa pasiva = ser forzado a hacer. 残業させられる (zangyō saserareru) = me obligan a hacer horas extra. Expresa la perspectiva de la víctima." },
      { s: "子供たちに好きな遊びを___(する)あげた。(Kodomo-tachi ni sukina asobi o ___ ageta.)", opts: ['させて (sasete)', 'して (shite)', 'されて (sarete)', 'させられて (saserarete)'], a: 0, fb: "させてあげた = permiso (hice que pudieran / les dejé). Te-form + あげた indica dar algo a otros. 'Les dejé jugar lo que querían'." },
      { s: "病気なのに、毎日学校に___(行く)はひどい。(Byōki na no ni, mainichi gakkō ni ___ wa hidoi.)", opts: ['行かせるの (ikaseru no)', '行くの (iku no)', '行かれるの (ikareruno)', '行かせられるの (ikaserareru no)'], a: 3, fb: "行かせられる (iku → ikaserareru) = ser forzado a ir. Causativa pasiva: G1 -く→か + せられる. Es cruel obligar a alguien enfermo a ir a la escuela." },
    ],
    transforms: [
      { prompt: "Forma la causativa (compulsión):", s: "子供は野菜を食べない。(Kodomo wa yasai o tabenai.) → Los padres los hacen comer.", opts: ["親は子供に野菜を食べさせた。(Oya wa kodomo ni yasai o tabesaseta.)", "親は子供が野菜を食べさせた。(Oya wa kodomo ga yasai o tabesaseta.)", "親は子供を野菜を食べさせた。(Oya wa kodomo o yasai o tabesaseta.)", "親は子供に野菜を食べさせられた。(Oya wa kodomo ni yasai o tabesaserareta.)"], a: 0, fb: "Causativa: 食べる→食べさせた. La persona que es 'causada' a hacer algo va con に (kodomo ni). Compulsión directa." },
      { prompt: "Forma la causativa de permiso:", s: "子供は映画を見たい。母が許す。(Kodomo wa eiga o mitai. Haha ga yurusu.) → La madre lo deja.", opts: ["母は子供に映画を見させてあげた。(Haha wa kodomo ni eiga o misasete ageta.)", "母は子供を映画を見させた。(Haha wa kodomo o eiga o misaseta.)", "母は子供に映画を見られた。(Haha wa kodomo ni eiga o mirareta.)", "母は子供が映画を見させた。(Haha wa kodomo ga eiga o misaseta.)"], a: 0, fb: "Permiso: 見させてあげた (le dejó ver). あげた indica que es un beneficio para el hijo. に marca al que recibe el permiso." },
      { prompt: "Forma la causativa pasiva (ser forzado):", s: "上司：毎日残業して！(Jōshi: Mainichi zangyō shite!) → El empleado sufre.", opts: ["私は毎日残業させられる。(Watashi wa mainichi zangyō saserareru.)", "私は毎日残業させる。(Watashi wa mainichi zangyō saseru.)", "私は毎日残業された。(Watashi wa mainichi zangyō sareta.)", "私は毎日残業させた。(Watashi wa mainichi zangyō saseta.)"], a: 0, fb: "Causativa pasiva (させられる): expresa que YO soy forzado por otro. する→させられる. 毎日残業させられる = me obligan a trabajar horas extra diariamente." },
    ],
    errors: [
      { s: "先生は生徒に発表をさせられた。(Sensei wa seito ni happyō o saserareta.)", q: "¿Qué implica esta oración?", opts: ["El profesor fue forzado a hacer la presentación (causativa pasiva — el profesor sufrió)", "El profesor hizo que el estudiante presentara (causativa activa)", "El estudiante fue forzado a presentar", "No hay error — es ambigua"], a: 0, fb: "Causativa pasiva (させられた) con 先生 como sujeto = el PROFESOR fue forzado (por alguien, quizá el director). Si queremos decir que el profesor hizo que el estudiante presentara: 先生は生徒に発表をさせた (sin られた)." },
      { s: "母は私を好きな音楽を聴かせてくれた。(Haha wa watashi o sukina ongaku o kikasete kureta.)", q: "¿Cuál es el error de partícula?", opts: ["'私を' debe ser '私に' — el receptor de la causativa va con に, no を", "'母は' debe ser '母が'", "'聴かせて' debe ser '聴かれて'", "No hay error"], a: 0, fb: "En la causativa, la persona que recibe la permisión o compulsión va con に: 母は私に聴かせてくれた. El を solo se usa cuando la persona es directamente 'movida' (con verbos de movimiento)." },
    ],
    production: "Escribe 4 oraciones causativas: 1 compulsión en el trabajo, 1 permiso en familia, 1 causativa pasiva (algo que te forzaron a hacer), 1 causativa positiva (algo que hiciste que otra persona hiciera para su beneficio).",
  },
  {
    id: 'tara', title: '〜たら Condicional (Cuando / Si... entonces)', icon: '🔀',
    rule: "〜たら expresa condición o temporalidad: 'cuando X ocurra' o 'si X ocurre, entonces Y'. Formación: た-form + ら. Ej: 食べた→食べたら (si/cuando comas). Se usa para: (1) Condición hipotética: もし宝くじが当たったら (si gano la lotería). (2) Secuencia: 家に帰ったら、電話して (cuando llegues a casa, llama). (3) Descubrimiento: 部屋に入ったら、誰もいなかった (cuando entré al cuarto, no había nadie). Diferencia con と: たら permite una Y volitiva (decisión), と solo para resultados naturales.",
    tip: "Regla: た-form + ら. Si sabes el pasado (〜た), añade ら y listo. 食べた→食べたら. 行った→行ったら. し た→したら. くる→きた→きたら. La clave B1: たら puede ir con condiciones hipotéticas (もし〜たら) y con secuencias ('primero X, luego Y').",
    table: {
      headers: ['Tipo', 'Ejemplo japonés', 'Romaji', 'Significado'],
      rows: [
        ['Secuencia', '家に帰ったら、電話してください。', 'Ie ni kaettara, denwa shite kudasai.', 'Cuando llegues a casa, llama.'],
        ['Hipotética', 'もし雨が降ったら、中止します。', 'Moshi ame ga futtara, chūshi shimasu.', 'Si llueve, lo cancelamos.'],
        ['Descubrimiento', '部屋に入ったら、誰もいなかった。', 'Heya ni haittara, dare mo inakatta.', 'Cuando entré al cuarto, no había nadie.'],
        ['Contrafactual', 'もっと勉強したら、合格できた。', 'Motto benkyō shitara, gōkaku dekita.', 'Si hubiera estudiado más, habría aprobado.'],
      ]
    },
    b1note: "En A2 usabas condicionales simples con と. En B1, 〜たら te permite expresar condiciones más complejas, resultados sorpresivos y contrafactuales. Diferencia clave: たら admite Y volitiva (órdenes, peticiones, deseos) mientras que と no.",
    examples: [
      "日本語を勉強したら、日本に行きたいです。(Nihongo o benkyō shitara, Nihon ni ikitai desu.) — Si (cuando) aprenda japonés, quiero ir a Japón.",
      "宿題が終わったら、ゲームをしてもいいですよ。(Shukudai ga owattara, gēmu o shite mo ii desu yo.) — Cuando termines la tarea, puedes jugar videojuegos.",
      "冷蔵庫を開けたら、ケーキがなかった！(Reizōko o aketara, kēki ga nakatta!) — Cuando abrí el refrigerador, ¡no había pastel! (descubrimiento)",
    ],
    fills: [
      { s: "仕事が___(終わる)、映画を見に行きましょう。", opts: ['終わったら (owattara)', '終わると (owaru to)', '終わったので (owatta node)', '終わっても (owatte mo)'], a: 0, fb: "終わる → た-form: 終わった + ら = 終わったら. 'Cuando el trabajo termine, vayamos al cine.' Secuencia futura con proposición volitiva (行きましょう)." },
      { s: "もし___、絶対に日本に行きます。(Moshi ___, zettai ni Nihon ni ikimasu.)", opts: ['お金があったら (okane ga attara)', 'お金があると (okane ga aru to)', 'お金があっても (okane ga atte mo)', 'お金があるなら (okane ga aru nara)'], a: 0, fb: "もし + たら = hipótesis condicional. ある → あった + ら = あったら. 'Si tuviera dinero, iría a Japón sin duda.'" },
      { s: "電気をつけ___、猫が窓の上にいた。(Denki o tsuke ___, neko ga mado no ue ni ita.)", opts: ['たら (tara)', 'ると (ru to)', 'ても (te mo)', 'てから (te kara)'], a: 0, fb: "つけ(る) → つけた + ら = つけたら. Descubrimiento: 'Cuando encendí la luz, el gato estaba encima de la ventana.' たら se usa con resultados inesperados." },
      { s: "この薬を飲ん___、きっとよくなりますよ。(Kono kusuri o non ___, kitto yoku narimasu yo.)", opts: ['だら (dara)', 'だので (da node)', 'でも (demo)', 'でから (de kara)'], a: 0, fb: "飲む → 飲んだ + ら = 飲んだら. 'Si tomas esta medicina, seguramente te mejorarás.' 飲む (G1 -む→んだ) + ら." },
      { s: "もっと練習し___、もっと上手になれた。(Motto renshū shi ___, motto jōzu ni nareta.)", opts: ['たら (tara)', 'ても (te mo)', 'てから (te kara)', 'ながら (nagara)'], a: 0, fb: "したら + もっと上手になれた (contrafactual pasado): 'Si hubiera practicado más, habría mejorado más.' する→した+ら = したら con resultado pasado = contrafactual." },
    ],
    transforms: [
      { prompt: "Combina las dos acciones con 〜たら (secuencia):", s: "家に帰る + 電話する (Ie ni kaeru + denwa suru)", opts: ["家に帰ったら、電話してください。(Ie ni kaettara, denwa shite kudasai.)", "家に帰ると、電話してください。(Ie ni kaeru to, denwa shite kudasai.)", "家に帰るので、電話します。(Ie ni kaeru node, denwa shimasu.)", "家に帰っても、電話してください。(Ie ni kaette mo, denwa shite kudasai.)"], a: 0, fb: "帰る → 帰った + ら = 帰ったら. Petición futura con secuencia. Nota: 〜ると no puede ir con peticiones/órdenes, pero 〜たら sí." },
      { prompt: "Forma una condición hipotética con もし〜たら:", s: "もし時間がある + 何をしますか？", opts: ["もし時間があったら、何をしますか？(Moshi jikan ga attara, nani o shimasu ka?)", "もし時間があると、何をしますか？(Moshi jikan ga aru to, nani o shimasu ka?)", "もし時間があれば、何をしますか？(Moshi jikan ga areba, nani o shimasu ka?)", "もし時間があっても、何をしますか？(Moshi jikan ga atte mo, nani o shimasu ka?)"], a: 0, fb: "ある → あった + ら = あったら. もし〜たら es la combinación más común para hipótesis. 'Si tuvieras tiempo, ¿qué harías?'" },
      { prompt: "Convierte en descubrimiento con 〜たら:", s: "冷蔵庫を開けた → ケーキがなかった (sorpresa)", opts: ["冷蔵庫を開けたら、ケーキがなかった。(Reizōko o aketara, kēki ga nakatta.)", "冷蔵庫を開けると、ケーキがなかった。(Reizōko o akeru to, kēki ga nakatta.)", "冷蔵庫を開けてから、ケーキがなかった。(Reizōko o akete kara, kēki ga nakatta.)", "冷蔵庫を開けたので、ケーキがなかった。(Reizōko o aketa node, kēki ga nakatta.)"], a: 0, fb: "たら para descubrimiento (Y pasado inesperado). 開ける → 開けた + ら = 開けたら. 'Cuando abrí el refrigerador, no había pastel.' と también funciona aquí, pero たら es más natural para sorpresas." },
    ],
    errors: [
      { s: "家に帰ると、電話してください。(Ie ni kaeru to, denwa shite kudasai.)", q: "¿Por qué es incorrecto usar と aquí?", opts: ["と no puede usarse con peticiones/órdenes — debe ser たら", "と está bien — ambos son correctos", "'電話して' debe ser '電話する'", "と solo se usa con hechos pasados"], a: 0, fb: "と solo puede usarse cuando Y es un resultado natural/automático. No puede ir con órdenes, peticiones o intenciones volitivas (〜してください, 〜しましょう, 〜したい). Usa たら en su lugar: 家に帰ったら、電話してください。" },
      { s: "もし雨が降ったらば、家にいます。(Moshi ame ga futtaraba, uchi ni imasu.)", q: "¿Cuál es el error?", opts: ["'降ったらば' no existe — debe ser '降ったら' solamente", "'もし' no se usa con たら", "'家にいます' debe ser '家にいました'", "No hay error"], a: 0, fb: "'たらば' es una forma arcaica que no se usa en japonés moderno. La forma correcta es simplemente たら: もし雨が降ったら、家にいます。" },
    ],
    production: "Escribe 4 oraciones con 〜たら: 1 secuencia futura, 1 hipótesis con もし, 1 descubrimiento pasado (con たら + Y en pasado) y 1 petición/consejo (〜たら、〜してください).",
  },
  {
    id: 'noni', title: '〜のに (A pesar de / Para)', icon: '⚖️',
    rule: "〜のに tiene DOS usos distintos: (1) CONTRASTE (despite/although): expresa que el resultado es contrario a lo esperado. Se forma con: oración A en forma casual + のに + oración B (sorprendente/contraria). Ej: 勉強したのに、試験に落ちた (Estudié, pero reprobé el examen). Tono: queja, sorpresa, frustración. (2) PROPÓSITO (in order to): indica el propósito de una acción o herramienta. Ej: 日本語を勉強するのに、この本が役に立つ (Este libro es útil para estudiar japonés). のに propósito = の (nominalizador) + に (dirección/propósito).",
    tip: "Truco para distinguir: Contraste = la oración A va en PASADO (したのに). Propósito = la oración A va en PRESENTE/DICCIONARIO (するのに). Contraste produce queja/sorpresa; Propósito describe utilidad. '勉強したのに = estudié Y SIN EMBARGO...'; '勉強するのに = para estudiar...'",
    table: {
      headers: ['Uso', 'Formación', 'Ejemplo', 'Romaji', 'Significado'],
      rows: [
        ['Contraste (queja)', 'Oración casual pasada + のに', '頑張ったのに、失敗した。', 'Ganbatta noni, shippai shita.', 'Me esforcé mucho, pero fallé.'],
        ['Contraste (sorpresa)', 'Oración casual + のに', '高いのに、買う人がいる。', 'Takai noni, kau hito ga iru.', 'Aunque es caro, hay gente que lo compra.'],
        ['Propósito (herramienta)', 'Dict. form + のに', 'この道具は料理するのに便利だ。', 'Kono dōgu wa ryōri suru noni benri da.', 'Esta herramienta es útil para cocinar.'],
        ['Propósito (tiempo/costo)', 'Dict. form + のに', '日本語を学ぶのに時間がかかる。', 'Nihongo o manabu noni jikan ga kakaru.', 'Se tarda tiempo en aprender japonés.'],
      ]
    },
    b1note: "Este es uno de los puntos más complejos del B1 porque のに tiene dos significados opuestos según el contexto. En A2 aprendiste の (nominalizador). En B1, dominar のに como contraste y propósito te permitirá expresar matices emocionales (frustración, ironía) y hablar de medios y fines.",
    examples: [
      "一生懸命勉強したのに、試験に落ちた。(Issōkenmei benkyō shita noni, shiken ni ochita.) — Estudié con todo mi esfuerzo, pero reprobé el examen. (contraste/queja)",
      "あんなに練習したのに、うまくいかなかった。(Anna ni renshū shita noni, umaku ikanakatta.) — Practiqué tanto, pero no salió bien. (contraste/frustración)",
      "日本語を勉強するのに、毎日練習することが大切だ。(Nihongo o benkyō suru noni, mainichi renshū suru koto ga taisetsu da.) — Para estudiar japonés, es importante practicar todos los días. (propósito)",
    ],
    fills: [
      { s: "薬を飲ん___、まだ頭が痛い。(Kusuri o non ___, mada atama ga itai.)", opts: ['だのに (da noni)', 'でも (demo)', 'だから (da kara)', 'だし (da shi)'], a: 0, fb: "飲む → 飲んだ (pasado) + のに = 飲んだのに. 'Tomé la medicina, pero todavía me duele la cabeza.' Contraste/queja: el resultado contradice la expectativa." },
      { s: "日本語を話す___、どのくらい練習が必要ですか？(Nihongo o hanasu ___, dono kurai renshū ga hitsuyō desu ka?)", opts: ['のに (noni)', 'ために (tame ni)', 'ので (node)', 'ながら (nagara)'], a: 0, fb: "Propósito: 話す (diccionario) + のに = 話すのに. '¿Cuánta práctica se necesita para hablar japonés?' のに propósito = para (lograr algo)." },
      { s: "あんなに高い___、みんなが買っている。(Anna ni takai ___, minna ga katte iru.)", opts: ['のに (noni)', 'ので (node)', 'から (kara)', 'けど (kedo)'], a: 0, fb: "高い (adjetivo presente) + のに = contraste. 'Aunque es tan caro, todo el mundo lo compra.' Sorpresa ante el comportamiento contrario a lo esperado." },
      { s: "毎日運動し___、ぜんぜん痩せない。(Mainichi undō shi ___, zenzen yasenai.)", opts: ['ているのに (te iru noni)', 'ているので (te iru node)', 'ているから (te iru kara)', 'ているけど (te iru kedo)'], a: 0, fb: "している (progresivo) + のに = contraste. 'Hago ejercicio todos los días, pero no adelgazo nada.' のに con ている expresa queja persistente." },
      { s: "この辞書は日本語を学ぶ___とても役に立つ。(Kono jisho wa nihongo o manabu ___ totemo yaku ni tatsu.)", opts: ['のに (noni)', 'ために (tame ni)', 'ことに (koto ni)', 'ように (yō ni)'], a: 0, fb: "学ぶ (diccionario) + のに = propósito. 'Este diccionario es muy útil para aprender japonés.' のに propósito enfatiza la utilidad de algo." },
    ],
    transforms: [
      { prompt: "Combina las oraciones con のに (contraste/queja):", s: "頑張った + うまくいかなかった (Ganbatta + umaku ikanakatta)", opts: ["頑張ったのに、うまくいかなかった。(Ganbatta noni, umaku ikanakatta.)", "頑張ったから、うまくいかなかった。(Ganbatta kara, umaku ikanakatta.)", "頑張るのに、うまくいかなかった。(Ganbaru noni, umaku ikanakatta.)", "頑張ったのに、うまくいった。(Ganbatta noni, umaku itta.)"], a: 0, fb: "Contraste: 頑張った (pasado) + のに + resultado negativo. 'Me esforcé, pero no funcionó.' のに de contraste siempre requiere que A sea pasado/estado y B sea contrario a la expectativa." },
      { prompt: "Forma una oración de propósito con のに:", s: "旅行する + パスポートが必要だ", opts: ["旅行するのに、パスポートが必要だ。(Ryokō suru noni, pasupōto ga hitsuyō da.)", "旅行したのに、パスポートが必要だ。(Ryokō shita noni, pasupōto ga hitsuyō da.)", "旅行するために、パスポートが必要だ。(Ryokō suru tame ni, pasupōto ga hitsuyō da.)", "旅行するのに、パスポートが要らない。(Ryokō suru noni, pasupōto ga iranai.)"], a: 0, fb: "Propósito: 旅行する (diccionario) + のに = 旅行するのに. 'Para viajar, se necesita pasaporte.' Nota: ために también es correcto en propósito, pero のに es más informal." },
      { prompt: "Identifica el uso de のに en esta oración:", s: "日本語が上手なのに、なぜ練習するの？(Nihongo ga jōzu na noni, naze renshū suru no?)", opts: ["Contraste/sorpresa: eres bueno en japonés, ¿entonces por qué practicas?", "Propósito: para ser bueno en japonés, ¿cuándo practicas?", "Causativo: porque eres bueno en japonés, practicas.", "Error — のに no puede usarse con な-adjetivos"], a: 0, fb: "Contraste con な-adjetivo: 上手な (presente) + のに = sorpresa. '¿Por qué practicas si ya eres bueno en japonés?' El hablante se sorprende del comportamiento. な-adjetivo + のに es perfectamente válido." },
    ],
    errors: [
      { s: "お金がないのに、欲しいものが買える。(Okane ga nai noni, hoshii mono ga kaeru.)", q: "¿Qué problema tiene esta oración lógicamente?", opts: ["のに de contraste requiere un resultado CONTRARIO a la expectativa — si no hay dinero, no poder comprar ES lo esperado. Aquí no hay contraste real.", "のに debe ser ために", "'買える' debe ser '買えない'", "No hay error — es un contraste válido"], a: 0, fb: "のに contraste expresa que el resultado es SORPRENDENTE/CONTRARIO. Si no tienes dinero y PUEDES comprar (買える), SÍ es sorprendente. La oración es en realidad válida — expresa asombro: 'a pesar de no tener dinero, puede comprar lo que quiere'. La opción A es incorrecta como análisis." },
      { s: "試験に合格するのに、もっと勉強すべきだ。(Shiken ni gōkaku suru noni, motto benkyō subeki da.)", q: "¿Cuál es el uso correcto de のに aquí?", opts: ["Propósito: 'Para aprobar el examen, deberías estudiar más.' (uso correcto)", "Contraste: 'A pesar de aprobar el examen, deberías estudiar más.' (incorrecto)", "Error: debería ser のため", "Error: する debe ser した"], a: 0, fb: "合格する (diccionario) + のに = propósito. 'Para aprobar el examen, deberías estudiar más.' Este es el uso correcto y natural del のに de propósito con sujeto implícito." },
    ],
    production: "Escribe 4 oraciones con のに: 2 de contraste/queja (algo que hiciste pero no funcionó como esperabas) y 2 de propósito (qué se necesita para lograr algo). Asegúrate de usar pasado para contraste y diccionario para propósito.",
  },
];

export default function GramaticaJaponesB1() {
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
    if (ok) return { background: 'rgba(5,150,105,0.1)', border: '1px solid #059669', color: '#059669' };
    if (sel) return { background: 'rgba(220,38,38,0.1)', border: '1px solid #dc2626', color: '#dc2626' };
    return { background: 'var(--bg-2)', border: '1px solid var(--line-soft)', color: 'var(--muted)' };
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 800 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: C, fontWeight: 800 }}>📐 文法</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />文法 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>Gramática B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.95rem', maxWidth: 560, margin: '0 0 1.5rem', lineHeight: 1.6 }}>
          5 temas B1 con tabla de conjugación, ejemplos reales, fill-in-blank, transformaciones, detección de errores y producción libre.
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
            📌 <strong style={{ color: 'var(--ink)' }}>vs A2:</strong> {t.b1note}
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#d97706', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔄 {q.prompt}</div>
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
                <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🔍 Analiza la oración</div>
                <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: '#dc2626', fontSize: '0.93rem', fontFamily: 'var(--mono)', borderLeft: '3px solid #dc2626', paddingLeft: '0.5rem', lineHeight: 1.5 }}>{q.s}</p>
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
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tu producción</div>
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
                ? '¡Perfecto! Dominas este tema B1.'
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
              <Link href="/practica/japones/b1" className="btn btn-ghost btn-sm">Volver a B1</Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
