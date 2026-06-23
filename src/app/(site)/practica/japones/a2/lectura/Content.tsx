'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface ReadingText {
  id: number;
  title: string;
  titleRomaji: string;
  topic: string;
  words: number;
  grammar: string;
  text: string;
  textRomaji: string;
  vocab: Record<string, string>;
  preQ: { q: string; opts: string[]; a: number }[];
  mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[];
  openQ: string;
  production: string;
}

const TEXTS: ReadingText[] = [
  {
    id: 1, title: '週末の京都', titleRomaji: 'Shūmatsu no Kyōto', topic: 'Viajes', words: 95, grammar: 'た-form (pasado)',
    text: "先週末、私は友達と京都に行きました。新幹線で二時間かかりました。土曜日の朝、有名な神社と古いお寺を見学しました。庭園はとても美しくて、静かでした。観光客がたくさんいましたが、私たちは伝統的な町を楽しみました。昼ごはんに京料理を食べました。とても美味しかったです。日曜日は竹林を歩いて、お土産を買いました。また来たいと思いました。",
    textRomaji: "Senshūmatsu, watashi wa tomodachi to Kyōto ni ikimashita. Shinkansen de nijikan kakarimashita. Doyōbi no asa, yūmei na jinja to furui otera o kengaku shimashita. Teien wa totemo utsukushikute, shizuka deshita. Kankōkyaku ga takusan imashita ga, watashitachi wa dentōteki na machi o tanoshimimashita. Hirugohan ni kyōryōri o tabemashita. Totemo oishikatta desu. Nichiyōbi wa chikurin o aruite, omiyage o kaimashita. Mata kitai to omoimashita.",
    vocab: { '神社': 'santuario sintoísta', 'お寺': 'templo budista', '庭園': 'jardín japonés', '伝統的': 'tradicional', '観光客': 'turista', '静かな': 'tranquilo/a', '竹林': 'bambusal', 'お土産': 'recuerdo/souvenir', '新幹線': 'tren bala', '美しい': 'hermoso/a' },
    preQ: [
      { q: '¿Has visitado algún lugar histórico o cultural?', opts: ['Sí, muchos', 'Algunos', 'Todavía no'], a: -1 },
      { q: '¿Qué te gustaría ver en Japón?', opts: ['Templos y santuarios', 'La ciudad moderna', 'La naturaleza'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "神社 (jinja)"?', cat: 'Vocabulario', opts: ['Templo budista', 'Santuario sintoísta', 'Jardín japonés', 'Bambusal'], a: 1, fb: '"神社 (jinja)" = santuario sintoísta. "お寺 (otera)" = templo budista. Son dos tipos diferentes de lugares sagrados en Japón.' },
      { q: '¿Cómo viajaron a Kioto?', cat: 'Comprensión', opts: ['En avión', 'En bus', 'En shinkansen (tren bala)', 'En carro'], a: 2, fb: '"新幹線で二時間かかりました (Shinkansen de nijikan kakarimashita)" — viajaron en tren bala y tardaron dos horas.' },
      { q: '¿Cómo era el jardín?', cat: 'Comprensión', opts: ['Ruidoso y lleno de gente', 'Hermoso y tranquilo', 'Pequeño y moderno', 'Cerrado ese día'], a: 1, fb: '"庭園はとても美しくて、静かでした (Teien wa totemo utsukushikute, shizuka deshita)" — el jardín era muy hermoso y tranquilo.' },
      { q: '¿Qué hicieron el domingo?', cat: 'Comprensión', opts: ['Visitaron templos', 'Comieron kyō-ryōri', 'Caminaron por el bambusal y compraron souvenirs', 'Tomaron el shinkansen de regreso'], a: 2, fb: '"日曜日は竹林を歩いて、お土産を買いました (Nichiyōbi wa chikurin o aruite, omiyage o kaimashita)" — caminaron por el bambusal y compraron souvenirs.' },
      { q: '¿Qué comieron al mediodía?', cat: 'Comprensión', opts: ['Ramen', 'Sushi', 'Cocina de Kioto (京料理)', 'Tempura'], a: 2, fb: '"昼ごはんに京料理を食べました (Hirugohan ni kyōryōri o tabemashita)" — comieron cocina de Kioto.' },
      { q: '"行きました (ikimashita)" — ¿qué tiempo verbal es?', cat: 'Gramática', opts: ['Presente formal', 'Pasado formal (た-form)', 'Progresivo', 'Futuro'], a: 1, fb: '"行きました" = pasado formal de 行く (iku → ikimashita). El た-form (～ました) indica eventos terminados en el pasado.' },
    ],
    openQ: 'Describe un viaje que hiciste en el pasado en 3-4 oraciones usando た-form. ¿Adónde fuiste? ¿Qué viste? ¿Cómo fue?',
    production: 'Usa: "___ に行きました (___ ni ikimashita). ___ を見ました (___ o mimashita). ___ は ___ でした (___ wa ___ deshita)."',
  },
  {
    id: 2, title: '新しい仕事', titleRomaji: 'Atarashii Shigoto', topic: 'Trabajo', words: 90, grammar: '～ています + た-form',
    text: "田中さんは先月、新しい会社に入りました。今は渋谷で働いています。毎朝、電車で出勤しています。会社では、マーケティングを担当しています。同僚はみんな親切で、仕事に慣れてきました。先週は初めて一人でプレゼンをしました。緊張しましたが、うまくできました。上司に褒められました。責任は大きいですが、やりがいのある仕事です。来月は大きいプロジェクトを始める予定です。",
    textRomaji: "Tanaka-san wa sengetsu, atarashii kaisha ni hairimashita. Ima wa Shibuya de hataraite imasu. Maiasa, densha de shukkin shite imasu. Kaisha de wa, māketingu o tantō shite imasu. Dōryō wa minna shinsetsu de, shigoto ni narete kimashita. Senshū wa hajimete hitori de purezen o shimashita. Kinchō shimashita ga, umaku dekimashita. Jōshi ni homeraremashita. Sekinin wa ōkii desu ga, yarigai no aru shigoto desu.",
    vocab: { '出勤する': 'ir al trabajo / fichar', '担当する': 'estar a cargo de / encargarse de', '慣れる': 'acostumbrarse', '責任': 'responsabilidad', '緊張する': 'ponerse nervioso', '褒める': 'elogiar / felicitar', 'やりがい': 'satisfacción laboral', 'プレゼン': 'presentación', '渋谷': 'Shibuya (barrio de Tokio)', '予定': 'plan / horario' },
    preQ: [
      { q: '¿Has empezado algún trabajo o actividad nueva recientemente?', opts: ['Sí, un trabajo nuevo', 'Sí, un estudio nuevo', 'No'], a: -1 },
      { q: '¿Qué es lo más difícil de adaptarse a algo nuevo?', opts: ['Las personas', 'Las tareas', 'El horario'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "担当する (tantō suru)"?', cat: 'Vocabulario', opts: ['renunciar', 'presentar', 'estar a cargo de', 'estudiar'], a: 2, fb: '"担当する (tantō suru)" = estar a cargo de, encargarse de. "マーケティングを担当しています" = está a cargo de marketing.' },
      { q: '¿Cuándo empezó a trabajar en la nueva empresa?', cat: 'Comprensión', opts: ['Esta semana', 'El mes pasado', 'El año pasado', 'Hace dos meses'], a: 1, fb: '"先月、新しい会社に入りました (Sengetsu, atarashii kaisha ni hairimashita)" — el mes pasado entró a la nueva empresa.' },
      { q: '¿Cómo va al trabajo?', cat: 'Comprensión', opts: ['En bicicleta', 'En carro', 'En tren', 'Caminando'], a: 2, fb: '"毎朝、電車で出勤しています (Maiasa, densha de shukkin shite imasu)" — va al trabajo en tren todas las mañanas.' },
      { q: '¿Qué pasó la semana pasada?', cat: 'Comprensión', opts: ['Conoció a sus colegas', 'Hizo una presentación solo/a por primera vez', 'Renunció', 'Empezó un proyecto grande'], a: 1, fb: '"先週は初めて一人でプレゼンをしました (Senshū wa hajimete hitori de purezen o shimashita)" — hizo una presentación solo/a por primera vez.' },
      { q: '"働いています (hataraite imasu)" expresa...', cat: 'Gramática', opts: ['Una acción pasada', 'Un estado actual / trabajo en curso', 'Una acción futura', 'Una prohibición'], a: 1, fb: '"働いています (hataraite imasu)" = ～ています para estado actual. "Trabaja en Shibuya" (estado resultado de haber conseguido el trabajo).' },
      { q: '¿Qué significa "責任 (sekinin)"?', cat: 'Vocabulario', opts: ['salario', 'responsabilidad', 'colega', 'presentación'], a: 1, fb: '"責任 (sekinin)" = responsabilidad. "責任は大きい (sekinin wa ōkii)" = la responsabilidad es grande.' },
    ],
    openQ: 'Describe tu trabajo, estudios o actividad actual usando ～ています. ¿Qué haces? ¿Dónde? ¿Cómo te va?',
    production: 'Usa: "___ で ___ をしています (___ de ___ o shite imasu). ___ ました (___ mashita). ___ は ___ です (___ wa ___ desu)."',
  },
  {
    id: 3, title: '私の街、昔と今', titleRomaji: 'Watashi no Machi, Mukashi to Ima', topic: 'Ciudad y cambios', words: 88, grammar: 'た-form vs ～ています',
    text: "私が子供の頃、この町はとても静かでした。田んぼや畑がたくさんありました。商店街には小さいお店がいくつかありました。でも、今はとても変わりました。新しいビルがたくさん建っています。スーパーやコンビニが増えました。人口も増えています。昔は電車がありませんでしたが、今は便利な路線があります。古い家が壊されて、マンションになっています。昔の方が静かでよかったと思いますが、今の方が便利です。",
    textRomaji: "Watashi ga kodomo no koro, kono machi wa totemo shizuka deshita. Tanbo ya hatake ga takusan arimashita. Shōtengai ni wa chiisai omise ga ikutsuka arimashita. Demo, ima wa totemo kawarimashita. Atarashii biru ga takusan tatte imasu. Sūpā ya konbini ga fuemashita. Jinkō mo fuete imasu. Mukashi wa densha ga arimasen deshita ga, ima wa benri na rosen ga arimasu. Furui ie ga kowasarete, manshon ni natte imasu.",
    vocab: { '変わる': 'cambiar', '建てる': 'construir', '増える': 'aumentar / crecer', '商店街': 'galería comercial de calle', '田んぼ': 'arrozal', '畑': 'campo de cultivo', '人口': 'población', '路線': 'línea de transporte', '壊す': 'demoler / destruir', '便利': 'conveniente / práctico' },
    preQ: [
      { q: '¿Ha cambiado mucho el lugar donde vives?', opts: ['Sí, mucho', 'Algo', 'No, casi igual'], a: -1 },
      { q: '¿Prefieres la ciudad tranquila de antes o la más activa de ahora?', opts: ['La tranquila', 'La activa', 'Depende'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "商店街 (shōtengai)"?', cat: 'Vocabulario', opts: ['supermercado', 'galería comercial de calle', 'arrozal', 'edificio nuevo'], a: 1, fb: '"商店街 (shōtengai)" = galería o pasaje comercial con tiendas a los lados, típico en ciudades japonesas.' },
      { q: '¿Cómo era el pueblo cuando el autor era niño?', cat: 'Comprensión', opts: ['Moderno y ruidoso', 'Tranquilo con campos de arroz', 'Lleno de edificios', 'Con muchos trenes'], a: 1, fb: '"子供の頃、この町はとても静かでした。田んぼや畑がたくさんありました。" — era tranquilo y había arrozales y campos.' },
      { q: '¿Qué ha pasado con los edificios nuevos?', cat: 'Comprensión', opts: ['Han sido demolidos', 'Se están construyendo muchos', 'No han cambiado', 'Han disminuido'], a: 1, fb: '"新しいビルがたくさん建っています (Atarashii biru ga takusan tatte imasu)" — se están construyendo / ya hay muchos edificios nuevos (estado resultado).' },
      { q: '¿Qué no había antes que sí hay ahora?', cat: 'Comprensión', opts: ['Tiendas pequeñas', 'Arrozales', 'Una línea de tren conveniente', 'Campos de cultivo'], a: 2, fb: '"昔は電車がありませんでしたが、今は便利な路線があります。" — antes no había tren, ahora sí hay una línea conveniente.' },
      { q: '"増えています (fuete imasu)" indica...', cat: 'Gramática', opts: ['Que la población aumentó ayer', 'Que la población está aumentando (estado en curso)', 'Que la población disminuye', 'Una predicción futura'], a: 1, fb: '"増えています" = ～ています con verbo de cambio → estado resultado en curso. La población sigue aumentando (proceso en desarrollo).' },
      { q: '"ありませんでした (arimasen deshita)" es...', cat: 'Gramática', opts: ['Presente negativo', 'Pasado negativo formal', 'Futuro negativo', 'Imperativo negativo'], a: 1, fb: '"ありませんでした (arimasen deshita)" = pasado negativo formal de あります. Antes no existía (algo).' },
    ],
    openQ: 'Compara tu ciudad o barrio en el pasado y el presente. Usa た-form para el pasado y ～ています para el presente.',
    production: 'Usa: "昔は___でした (Mukashi wa ___ deshita). 今は___ています (Ima wa ___ te imasu). ___が増えました/減りました (___ ga fuemashita/herimashita)."',
  },
  {
    id: 4, title: '友達へのメッセージ', titleRomaji: 'Tomodachi e no Messēji', topic: 'Amistad y planes', words: 92, grammar: 'たいです + ことができます',
    text: "ゆい：もしもし、マリア！今週末、暇？\nマリア：うん、暇だよ。何かしたい？\nゆい：映画を見たいんだけど、一緒に来ることができる？\nマリア：もちろん！どんな映画が見たい？\nゆい：アクション映画が見たいな。字幕付きなら日本語で見ることができるかも。\nマリア：いいね！私も日本語を練習したいから、いいかもね。何時に会いたい？\nゆい：三時はどう？渋谷のシネマで待ち合わせができるよ。\nマリア：完璧！楽しみにしている。じゃあ、また後でね！",
    textRomaji: "Yui: Moshi moshi, Maria! Konshūmatsu, hima? / Maria: Un, hima da yo. Nanika shitai? / Yui: Eiga o mitai n da kedo, issho ni kuru koto ga dekiru? / Maria: Mochiron! Donna eiga ga mitai? / Yui: Akushon eiga ga mitai na. Jimaku tsuki nara nihongo de miru koto ga dekiru kamo. / Maria: Ii ne! Watashi mo nihongo o renshū shitai kara, ii kamo ne. Nanji ni aitai? / Yui: Sanji wa dō? Shibuya no shinema de machiawise ga dekiru yo. / Maria: Kanpeki! Tanoshimi ni shite iru. Jā, mata atode ne!",
    vocab: { '暇': 'tiempo libre / desocupado', '予定': 'plan / cita', '都合': 'conveniencia / disponibilidad', '会う': 'encontrarse / verse', '楽しみ': 'algo que esperar con ilusión', '字幕': 'subtítulos', '待ち合わせ': 'punto de encuentro', '練習する': 'practicar', '完璧': 'perfecto', 'もちろん': 'por supuesto' },
    preQ: [
      { q: '¿Sueles planear cosas con amigos por mensaje?', opts: ['Sí, siempre', 'A veces', 'Prefiero en persona'], a: -1 },
      { q: '¿Qué tipo de películas prefieres?', opts: ['Acción', 'Romance/Drama', 'Comedia'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "暇 (hima)"?', cat: 'Vocabulario', opts: ['trabajo', 'tiempo libre / estar desocupado', 'problema', 'mensaje'], a: 1, fb: '"暇 (hima)" = tener tiempo libre, estar desocupado. "今週末、暇？ (Konshūmatsu, hima?)" = ¿Estás libre este fin de semana?' },
      { q: '¿Qué quiere hacer Yui?', cat: 'Comprensión', opts: ['Comer en un restaurante', 'Ir al parque', 'Ver una película', 'Estudiar japonés'], a: 2, fb: '"映画を見たいんだけど (Eiga o mitai n da kedo)" — Yui quiere ver una película.' },
      { q: '¿Por qué es buena idea ver la película en japonés?', cat: 'Comprensión', opts: ['Es más barata', 'Maria también quiere practicar japonés', 'No hay versión en español', 'Yui no habla español'], a: 1, fb: '"私も日本語を練習したいから (Watashi mo nihongo o renshū shitai kara)" — Maria también quiere practicar japonés.' },
      { q: '¿Dónde quedarán?', cat: 'Comprensión', opts: ['En casa de Yui', 'En el parque', 'En el cine de Shibuya', 'En la estación'], a: 2, fb: '"渋谷のシネマで待ち合わせができるよ (Shibuya no shinema de machiawase ga dekiru yo)" — en el cine de Shibuya.' },
      { q: '"来ることができる (kuru koto ga dekiru)" expresa...', cat: 'Gramática', opts: ['Obligación de venir', 'Posibilidad/habilidad de venir', 'Prohibición de venir', 'Deseo de venir'], a: 1, fb: '"～ことができる" = poder / posibilidad. "来ることができる？ (kuru koto ga dekiru?)" = ¿Puedes venir? La misma estructura en informal.' },
      { q: '"見たい (mitai)" en el texto expresa...', cat: 'Gramática', opts: ['Pasado de ver', 'Deseo de ver (～たい)', 'Obligación de ver', 'Estado de ver (～ています)'], a: 1, fb: '"見たい (mitai)" = quiero ver. ～たい = deseo de hacer algo. "アクション映画が見たいな" = quiero ver una película de acción.' },
    ],
    openQ: 'Escribe un mensaje corto a un amigo/a proponiéndole un plan para el fin de semana. Usa ～たい y ～ことができる.',
    production: 'Usa: "___たいんだけど、___ことができる？ (___ tai n da kedo, ___ koto ga dekiru?) / ___が___たい (___ ga ___ tai) / ___で会いたい (___ de aitai)"',
  },
  {
    id: 5, title: '料理教室で', titleRomaji: 'Ryōri Kyōshitsu de', topic: 'Gastronomía y habilidades', words: 96, grammar: 'ことができます + なければなりません',
    text: "今日は料理教室で寿司の作り方を習いました。先生はとても親切で、詳しく説明してくださいました。まず、材料を切らなければなりません。包丁を使うことができる人は切って、できない人は先生が手伝ってくれました。次に、酢飯を作りました。ご飯と酢を混ぜなければなりません。気をつけなければならないのは、熱いご飯を冷ましてから混ぜることです。最後に、のりで巻きました。これが一番難しかったです。でも、自分で作った寿司を食べることができて、とても嬉しかったです！",
    textRomaji: "Kyō wa ryōri kyōshitsu de sushi no tsukurikata o naraimashita. Sensei wa totemo shinsetsu de, kuwashiku setsumei shite kudasaimashita. Mazu, zairyō o kiranakere ba narimasen. Hōchō o tsukau koto ga dekiru hito wa kitte, dekinai hito wa sensei ga tetsudatte kuremashita. Tsugini, sunomeshi o tsukurimashita. Gohan to su o mazenakereba narimasen. Ki o tsukenakereba naranai no wa, atsui gohan o samashite kara mazeru koto desu. Saigo ni, nori de makimashita. Kore ga ichiban muzukashikatta desu. Demo, jibun de tsukutta sushi o taberu koto ga dekite, totemo ureshikatta desu!",
    vocab: { '材料': 'ingredientes', '切る': 'cortar', '混ぜる': 'mezclar', '気をつける': 'tener cuidado', '包丁': 'cuchillo de cocina', '酢飯': 'arroz de sushi', '冷ます': 'enfriar', '巻く': 'enrollar', '説明する': 'explicar', '習う': 'aprender / tomar clases de' },
    preQ: [
      { q: '¿Has tomado alguna clase de cocina?', opts: ['Sí, varias', 'Solo una vez', 'Nunca'], a: -1 },
      { q: '¿Te gustaría aprender a hacer sushi?', opts: ['Sí, mucho', 'Quizás', 'No especialmente'], a: -1 },
    ],
    mcq: [
      { q: '¿Qué significa "材料 (zairyō)"?', cat: 'Vocabulario', opts: ['instrucciones', 'ingredientes', 'herramientas', 'receta'], a: 1, fb: '"材料 (zairyō)" = ingredientes. "まず、材料を切らなければなりません" = primero, hay que cortar los ingredientes.' },
      { q: '¿Qué aprendió en la clase de cocina?', cat: 'Comprensión', opts: ['A hacer ramen', 'A hacer tempura', 'A hacer sushi', 'A hacer mochi'], a: 2, fb: '"今日は料理教室で寿司の作り方を習いました。" — aprendió a hacer sushi.' },
      { q: '¿Qué paso fue el más difícil?', cat: 'Comprensión', opts: ['Cortar los ingredientes', 'Hacer el arroz de sushi', 'Enrollar con el nori', 'Explicar la receta'], a: 2, fb: '"最後に、のりで巻きました。これが一番難しかったです。" — enrollar con el nori fue lo más difícil.' },
      { q: '¿Por qué el arroz debe enfriarse antes de mezclarse?', cat: 'Comprensión', opts: ['Para que tenga buen sabor', 'Porque el arroz caliente no se mezcla bien', 'El texto menciona que hay que tener cuidado', 'Para que sea más higiénico'], a: 2, fb: '"気をつけなければならないのは、熱いご飯を冷ましてから混ぜること" — hay que tener cuidado de enfriarlo antes de mezclar (el texto indica precaución, no una razón específica).' },
      { q: '"切ることができる (kiru koto ga dekiru)" expresa...', cat: 'Gramática', opts: ['Obligación de cortar', 'Habilidad de cortar', 'Deseo de cortar', 'Prohibición de cortar'], a: 1, fb: '"～ことができる" = poder / habilidad. "包丁を使うことができる人" = las personas que pueden usar el cuchillo.' },
      { q: '"切らなければなりません (kira nakereba narimasen)" expresa...', cat: 'Gramática', opts: ['Habilidad de cortar', 'Deseo de cortar', 'Obligación / necesidad de cortar', 'Posibilidad de cortar'], a: 2, fb: '"～なければなりません" = deber / tener que. "材料を切らなければなりません" = hay que cortar los ingredientes (es necesario).' },
    ],
    openQ: 'Describe una habilidad que tienes usando ～ことができます y algo que debes hacer regularmente usando ～なければなりません.',
    production: 'Usa: "___ことができます (___ koto ga dekimasu). ___なければなりません (___ nakereba narimasen). ___のが好きです (___ no ga suki desu)."',
  },
];

function tokenizeJapanese(text: string) {
  return text.split(/(\s+|[。、！？\n「」…—]+)/).filter(Boolean).map(t => ({
    raw: t,
    isSpace: /^\s+$/.test(t),
    isPunct: /^[。、！？\n「」…—]+$/.test(t),
    clean: t,
  }));
}

function MCQItem({ q, qi, answers, onAnswer, color }: {
  q: ReadingText['mcq'][0]; qi: number;
  answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void; color: string;
}) {
  const ans = answers[qi];
  const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>
        {q.cat} · Pregunta {qi + 1}
      </div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let col = 'var(--ink)';
          if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; col = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; col = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; col = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color: col, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.15s' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [showRomaji, setShowRomaji] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenizeJapanese(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  function handleWord(word: string, idx: number) {
    if (!word || /^\s+$/.test(word) || /^[。、！？\n「」…—]+$/.test(word)) return;
    const found = Object.keys(t.vocab).find(k => word.includes(k) || k.includes(word));
    setActiveWord(found ? t.vocab[found] : null);
    setActiveIdx(idx);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm" style={{ fontSize: '0.82rem' }}>← Todos los textos</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>
          Texto {t.id} / 5 — {t.title} ({t.titleRomaji})
        </span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
          📝 ~{t.words} palabras · {t.grammar}
        </span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lectura', 'Lectura', 'Preguntas', 'Resultado'];
          const current = phase === p;
          const past = (['pre', 'read', 'questions', 'done'] as const).indexOf(p) < (['pre', 'read', 'questions', 'done'] as const).indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Antes de leer — activa tu conocimiento</p>
          <p style={{ margin: '0 0 1.25rem', fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>
            Piensa un momento antes de leer. Tema: <strong style={{ color: 'var(--ink)' }}>{t.topic}</strong>.
          </p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))}
                    className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                    style={{ fontSize: '0.84rem', ...(preAnswers[i] === oi ? { background: COLOR, borderColor: COLOR } : {}) }}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" style={{ marginTop: '0.5rem', background: COLOR, borderColor: COLOR }} onClick={() => setPhase('read')}>
            Listo — ir al texto →
          </button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            <span className="ink-line" />{t.title} — toca cualquier palabra para ver su traducción
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem', flexWrap: 'wrap' }}>
            <button onClick={() => setShowRomaji(r => !r)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem' }}>
              {showRomaji ? '🈲 Ocultar romaji' : '🈳 Ver romaji'}
            </button>
          </div>
          {showRomaji && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, marginBottom: '1rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.8, fontStyle: 'italic' }}>
              {t.textRomaji}
            </div>
          )}
          <div style={{ lineHeight: 2.3, fontSize: '1.1rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const found = Object.keys(t.vocab).find(k => tk.raw.includes(k) || k.includes(tk.raw));
              const hasTrans = !!found;
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => handleWord(tk.raw, i)} style={{
                    background: isActive ? 'rgba(188,0,45,0.12)' : hasTrans ? 'rgba(188,0,45,0.06)' : 'transparent',
                    border: isActive ? `1.5px solid ${COLOR}` : hasTrans ? `1px dashed rgba(188,0,45,0.3)` : 'none',
                    borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default',
                    fontSize: 'inherit', fontFamily: 'inherit',
                    color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit', transition: 'all 0.15s',
                  }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{
                      position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)',
                      background: activeWord ? '#14215c' : '#6f7691', color: '#fff', borderRadius: 8,
                      padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap',
                      zIndex: 10, boxShadow: '0 4px 16px rgba(20,33,92,0.25)', marginTop: 4,
                    }}>
                      {activeWord ?? '(palabra funcional)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR }} onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>
              Ya leí → Responder preguntas
            </button>
            <button className="btn btn-ghost btn-sm" onClick={() => { setActiveWord(null); setActiveIdx(null); }}>
              Ocultar tooltip
            </button>
            <button className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem', marginLeft: 'auto' }} onClick={() => setPhase('pre')}>
              ← Volver a pre-lectura
            </button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Volver al texto</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} color={COLOR} onAnswer={(qi, oi) => {
              if (answers[qi] !== undefined) return;
              setAnswers(p => ({ ...p, [qi]: oi }));
            }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4}
              placeholder="Escribe aquí tu respuesta en japonés (romaji o kana/kanji)..."
              style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && (
            <button className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR }} onClick={() => setPhase('done')}>Ver mi resultado →</button>
          )}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 4 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} correctas</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? '¡Perfecto! Comprendiste todo el texto.' : score >= 4 ? 'Muy bien. Repasa las preguntas que fallaste.' : 'Vuelve al texto y búscalas — el romaji ayuda.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>TU PRODUCCIÓN LIBRE</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR }} onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Reintentar</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Elegir otro texto</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaJaponesA2() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 読む</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />読む · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos progresivos en japonés con romaji. Cada texto tiene pre-lectura, vocabulario interactivo clickeable, 6 preguntas y producción libre.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem',
                border: `1.5px solid ${COLOR}22`, borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(188,0,45,0.04) 0%, transparent 100%)',
                transition: 'box-shadow 0.18s, border-color 0.18s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px rgba(188,0,45,0.12)`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}
              >
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>
                  {t.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{t.titleRomaji}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>
                    ~{t.words} palabras · Gramática: {t.grammar} · {t.mcq.length} preguntas + producción libre
                  </p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.75rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: `rgba(188,0,45,0.06)`, border: `1px solid rgba(188,0,45,0.15)`, fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Cómo usar:</strong> Toca las palabras resaltadas para ver su traducción. Usa el botón &quot;Ver romaji&quot; si necesitas ayuda con la pronunciación. Responde las 6 preguntas y escribe tu producción libre al final.
        </div>
      </div>
    </section>
  );
}
