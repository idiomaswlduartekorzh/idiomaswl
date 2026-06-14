'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface Question { q: string; hint: string; a: string; fb: string; }
interface Topic { title: string; titleEs: string; explanation: string; table?: { head: string[]; rows: string[][] }; qs: Question[]; }

const GRAMMAR_TOPICS: Record<string, Topic> = {
  hiragana: {
    title: 'ひらがな — Las 46 sílabas',
    titleEs: 'Sistema de escritura básico',
    explanation: 'ひらがな (hiragana) es el primer sistema de escritura japonés que debes aprender. Tiene 46 caracteres básicos, cada uno representa una sílaba (mora). Se usa para: palabras japonesas, partículas gramaticales, conjugaciones verbales. A diferencia del español, cada símbolo = consonante+vocal (ka, ki, ku, ke, ko) o solo vocal (a, i, u, e, o). El japonés tiene 5 vocales: あ(a) い(i) う(u) え(e) お(o).',
    table: {
      head: ['あ行', 'か行', 'さ行', 'た行', 'な行'],
      rows: [
        ['あ(a)', 'か(ka)', 'さ(sa)', 'た(ta)', 'な(na)'],
        ['い(i)', 'き(ki)', 'し(shi)', 'ち(chi)', 'に(ni)'],
        ['う(u)', 'く(ku)', 'す(su)', 'つ(tsu)', 'ぬ(nu)'],
        ['え(e)', 'け(ke)', 'せ(se)', 'て(te)', 'ね(ne)'],
        ['お(o)', 'こ(ko)', 'そ(so)', 'と(to)', 'の(no)'],
      ],
    },
    qs: [
      { q: '¿Qué hiragana representa la sílaba "ka"?', hint: 'Segunda columna, primera fila de la tabla か行', a: 'か', fb: 'か = ka. La fila か行 es: か(ka) き(ki) く(ku) け(ke) こ(ko). Son las primeras consonantes que se aprenden.' },
      { q: '¿Cómo se escribe "ni" en hiragana?', hint: 'Fila な行, vocal い', a: 'に', fb: 'に = ni. La fila な行: な(na) に(ni) ぬ(nu) ね(ne) の(no). "に" es también la partícula de dirección "a/hacia".' },
      { q: '"さくら" (sakura = flor de cerezo) — ¿cuántas sílabas tiene?', hint: 'Cada hiragana = una sílaba', a: '3', fb: 'さ(sa) + く(ku) + ら(ra) = 3 sílabas. El japonés opera por mora (unidad de tiempo), no por sílaba española.' },
      { q: '¿Cuál es el hiragana especial para "tsu"?', hint: 'Fila た行, vocal う', a: 'つ', fb: 'つ = tsu. Es especial porque la consonante es "ts", no común en español. 富士山 = Fujisan; 津波 = tsunami.' },
      { q: '"ありがとう" (arigatou = gracias) — ¿cuántos hiragana tiene?', hint: 'Cuenta cada カナ', a: '5', fb: 'あ+り+が+と+う = 5 hiragana. Nota: "が" tiene dakuten (") que convierte か→が (k→g). うhará una "u" larga al final.' },
      { q: '¿Cuál fila es del sonido "n" independiente (ん)?', hint: 'Es el único hiragana que no tiene vocal propia', a: 'ん', fb: 'ん es el único hiragana que representa solo consonante nasal [n/m]. Ejemplo: にほん (Nihon = Japón) tiene ん al final.' },
      { q: '"し" se pronuncia:', hint: 'No es "si" como en español', a: 'shi', fb: 'し = "shi" (no "si"). Similarmente: ち=chi, つ=tsu, ふ=fu. Son irregularidades importantes de ひらがな.' },
      { q: '¿Cuántas vocales tiene el japonés?', hint: 'Son las mismas que el español, ¡pero en diferente orden!', a: '5', fb: '5 vocales: あ(a) い(i) う(u) え(e) お(o). La "u" japonesa es más cerrada y a veces casi inaudible entre consonantes sordas.' },
    ],
  },
  katakana: {
    title: 'カタカナ — Palabras extranjeras',
    titleEs: 'Loanwords y nombres extranjeros',
    explanation: 'カタカナ (katakana) se usa para escribir: préstamos lingüísticos del inglés y otros idiomas (コーヒー=café, テレビ=TV), nombres extranjeros (マリア=María, コロンビア=Colombia), onomatopeyas y énfasis. Tiene los mismos 46 sonidos que hiragana pero con formas angulares. Aprender katakana es muy gratificante porque permite leer muchas palabras conocidas.',
    table: {
      head: ['ア行', 'カ行', 'サ行', 'タ行', 'マ行'],
      rows: [
        ['ア(a)', 'カ(ka)', 'サ(sa)', 'タ(ta)', 'マ(ma)'],
        ['イ(i)', 'キ(ki)', 'シ(shi)', 'チ(chi)', 'ミ(mi)'],
        ['ウ(u)', 'ク(ku)', 'ス(su)', 'ツ(tsu)', 'ム(mu)'],
        ['エ(e)', 'ケ(ke)', 'セ(se)', 'テ(te)', 'メ(me)'],
        ['オ(o)', 'コ(ko)', 'ソ(so)', 'ト(to)', 'モ(mo)'],
      ],
    },
    qs: [
      { q: '"コーヒー" (koohii) ¿qué bebida es?', hint: 'Suena similar al inglés "coffee"', a: 'café', fb: '"コーヒー" = café. La línea larga (ー) indica vocal larga. El japonés adapta palabras extranjeras a sus sílabas.' },
      { q: '"テレビ" (terebi) ¿qué aparato es?', hint: 'Del inglés "television"', a: 'televisión', fb: '"テレビ" = televisión (de "terebi" ← inglés "TV"). Muy común: テーブル(tabla/mesa), スマホ(smartphone), パソコン(PC).' },
      { q: '"コロンビア" ¿qué país es?', hint: 'Tu país de origen', a: 'Colombia', fb: '"コロンビア" = Colombia. Los nombres de países se escriben en katakana: アメリカ(América), スペイン(España), ブラジル(Brasil).' },
      { q: '¿Por qué "コーヒー" tiene ー (línea)?', hint: 'Indica algo sobre la vocal', a: 'vocal larga / prolongación', fb: 'ー = vocal larga (onbiki). "コーヒー" = ko-o-hi-i. En japonés la longitud vocálica cambia el significado: おばさん(tía) vs おばあさん(abuela).' },
      { q: '"スタバ" (Sutaba) ¿qué lugar es?', hint: 'Del inglés "Starbucks"', a: 'Starbucks', fb: '"スタバ" = Starbucks (abreviación de ス[ta]ーバ[cksu]). El japonés acorta muchos préstamos: アイスクリーム→アイス (helado).' },
      { q: '"マリア" en katakana ¿qué es?', hint: 'Un nombre propio femenino', a: 'María', fb: '"マリア" = María. Los nombres extranjeros siempre van en カタカナ. Tu nombre en japonés: カルロス (Carlos), アナ (Ana), ルイス (Luis).' },
      { q: 'La diferencia visual entre ア(katakana) y あ(hiragana) es:', hint: 'Piensa en la forma: redondeado vs angular', a: 'katakana es angular/recto; hiragana es redondeado/curvo', fb: 'Katakana tiene trazos más rectos y angulares. Hiragana tiene curvas suaves. Mismo sonido, diferente forma y uso.' },
      { q: '"アイスクリーム" ¿qué es?', hint: 'Del inglés "ice cream"', a: 'helado', fb: '"アイスクリーム" = helado (ice cream). ア(a)+イ(i)+ス(su)+ク(ku)+リ(ri)+ー(oo)+ム(mu) = aisukuriimu.' },
    ],
  },
  desu: {
    title: '〜は〜です — La cópula japonesa',
    titleEs: 'Ser/estar: identidad y descripción',
    explanation: 'La estructura más fundamental del japonés A1: [tema は (wa)] [predicado] です (desu). "は" después del tema se pronuncia "wa" (no "ha"). "です" = es/soy/eres (forma educada). La negación es "〜ではありません" (o "じゃありません" informal). El orden japonés es: Sujeto → Objeto → Verbo, opuesto al español.',
    table: {
      head: ['Forma', 'Japonés', 'Romaji', 'Español'],
      rows: [
        ['Afirmativo', '〜は〜です', '〜wa〜desu', 'Es / soy / eres ___'],
        ['Negativo formal', '〜ではありません', '〜dewa arimasen', 'No es / no soy ___'],
        ['Negativo informal', '〜じゃない', '〜ja nai', 'No es / no soy ___'],
        ['Pregunta', '〜ですか？', '〜desu ka?', '¿Es ___?'],
        ['Respuesta sí', 'はい、そうです', 'hai, sou desu', 'Sí, así es'],
        ['Respuesta no', 'いいえ、違います', 'iie, chigaimasu', 'No, es diferente'],
      ],
    },
    qs: [
      { q: '"わたしは がくせいです" — ¿qué significa?', hint: 'わたし=yo, がくせい=estudiante, です=es/soy', a: 'Soy estudiante', fb: '"わたしは がくせいです" (watashi wa gakusei desu) = Soy estudiante. は aquí es partícula de tema, se pronuncia "wa".' },
      { q: '"これは ほんです" — ¿qué es "これ"?', hint: 'これ = este / esto (cerca)', a: 'esto / este (pronombre demostrativo)', fb: 'これ = esto (cerca del hablante). それ = eso (cerca del oyente). あれ = aquello (lejos de ambos).' },
      { q: '¿Cómo se niega "がくせいです"?', hint: 'Forma negativa formal = では + ___ません', a: 'がくせいではありません', fb: 'がくせいではありません (gakusei dewa arimasen) = No soy estudiante. Informal: がくせいじゃない (gakusei ja nai).' },
      { q: '"これは なんですか？" — ¿qué pregunta hace?', hint: 'なん = qué; ですか = ¿es?', a: '¿Qué es esto?', fb: '"これは なんですか？" (kore wa nan desu ka?) = ¿Qué es esto? Muy útil para aprender vocabulario señalando cosas.' },
      { q: 'En "わたしは にほんじんです", は se pronuncia:', hint: 'Es una partícula, no una consonante simple', a: 'wa', fb: 'La partícula は se pronuncia "wa" (no "ha"). Solo se pronuncia "ha" cuando es parte de una palabra, no como partícula.' },
      { q: '"はい、そうです" responde a una pregunta con ___か?', hint: 'そう = así / de esa forma', a: 'afirmativa (sí)', fb: '"はい、そうです" (hai, sou desu) = Sí, así es. Para negar: "いいえ、ちがいます" (iie, chigaimasu) = No, es diferente.' },
      { q: '"わたしは マリアです。コロンビアじんです。" — ¿cuántas oraciones hay?', hint: 'Cada です termina una oración', a: '2', fb: 'Hay 2 oraciones: "Soy María." + "Soy colombiana." Cada proposición termina con です o じゃありません.' },
      { q: '¿Cuál es el orden de palabras en japonés?', hint: 'A diferencia del español (SVO)', a: 'sujeto - objeto - verbo (SOV)', fb: 'Japonés = SOV: "わたしは コーヒーを のみます" = Yo café bebo. El verbo siempre va AL FINAL en japonés.' },
    ],
  },
  existencia: {
    title: 'あります / います — Existencia',
    titleEs: 'Hay / está (cosas vs personas/animales)',
    explanation: 'El japonés distingue existencia de cosas inanimadas (あります) de personas y animales (います). あります (arimasu) = hay / está / tengo (objetos, plantas). います (imasu) = hay / está / tengo (personas, animales). Ambos expresan "hay" y "estar en un lugar". La partícula に marca el lugar: [lugar に] [objeto が] あります/います.',
    table: {
      head: ['', 'あります (arimasu)', 'います (imasu)'],
      rows: [
        ['Uso', 'Objetos inanimados, plantas', 'Personas, animales'],
        ['Ejemplo afirm.', 'テーブルに ほんが あります', 'そこに ねこが います'],
        ['Romaji', 'Teeburu ni hon ga arimasu', 'Soko ni neko ga imasu'],
        ['Español', 'En la mesa hay un libro', 'Ahí hay un gato'],
        ['Negativo', 'ほんが ありません', 'ねこが いません'],
        ['Romaji', 'hon ga arimasen', 'neko ga imasen'],
      ],
    },
    qs: [
      { q: '"ほんが あります" — ¿qué hay?', hint: 'ほん = libro; あります = hay (inanimado)', a: 'hay un libro', fb: '"ほんが あります" (hon ga arimasu) = Hay un libro. Usado para objetos inanimados.' },
      { q: '"ねこが います" — ¿qué animal hay?', hint: 'ねこ = gato; います = hay (animado)', a: 'hay un gato', fb: '"ねこが います" (neko ga imasu) = Hay un gato. います se usa para seres vivos (animales, personas).' },
      { q: '¿Se dice "ひとが あります" o "ひとが います" para "hay una persona"?', hint: 'ひと = persona; ¿animado o inanimado?', a: 'います (ひとが います)', fb: '"ひとが います" (hito ga imasu) = Hay una persona. Las personas son seres animados → います. Error común para hispanohablantes.' },
      { q: '"えに ねこが います" — ¿dónde está el gato?', hint: 'え = foto/imagen; に = en', a: 'En la foto (hay un gato)', fb: '"えに ねこが います" = En la foto hay un gato. に marca la ubicación.' },
      { q: '"ここに なにが ありますか？" — ¿qué pregunta?', hint: 'ここ=aquí; なに=qué; ありますか=¿hay?', a: '¿Qué hay aquí?', fb: '"ここに なにが ありますか？" (koko ni nani ga arimasu ka?) = ¿Qué hay aquí? Útil para pedir información.' },
      { q: '"つくえの うえに ほんが あります" — ¿dónde está el libro?', hint: 'つくえ=escritorio; うえ=encima/arriba; に=en', a: 'Encima del escritorio', fb: '"つくえの うえに" (tsukue no ue ni) = encima del escritorio. Preposiciones de lugar: うえ(arriba), した(abajo), まえ(delante), うしろ(detrás).' },
      { q: '"はなが ありません" — ¿qué no hay?', hint: 'はな = flor; ありません = no hay', a: 'No hay flores', fb: '"はなが ありません" (hana ga arimasen) = No hay flores. はな (flor) es inanimado → ありません.' },
      { q: '"いぬが います" — ¿correcto o incorrecto y por qué?', hint: 'いぬ = perro; ¿animado o inanimado?', a: 'Correcto — いぬ es un animal (animado) → います', fb: '¡Correcto! いぬ (perro) es un animal = ser animado → います. Resumen: あります para cosas, います para seres vivos.' },
    ],
  },
  numeros: {
    title: '数字・時刻・値段 — Números, hora y precio',
    titleEs: 'Números, ¿qué hora es? y ¿cuánto cuesta?',
    explanation: 'Los números japoneses son simples: 1=いち, 2=に, 3=さん, 4=し/よん, 5=ご... La hora se forma con número + じ (時): いちじ(1h), にじ(2h). Los minutos: número + ふん/ぷん. El precio usa えん (円 yen). Vocabulario de tiempo esencial: いま(ahora), ごぜん(AM), ごご(PM), なんじ(¿qué hora?).',
    table: {
      head: ['Número', 'Hiragana', 'Romaji', 'Uso'],
      rows: [
        ['1', 'いち', 'ichi', 'いちじ (1:00)'],
        ['2', 'に', 'ni', 'にひゃくえん (¥200)'],
        ['3', 'さん', 'san', 'さんじゅっぷん (30 min)'],
        ['4', 'し/よん', 'shi/yon', 'よじ (4:00) *yon+ji'],
        ['5', 'ご', 'go', 'ごじ (5:00)'],
        ['10', 'じゅう', 'juu', 'じゅうじ (10:00)'],
        ['100', 'ひゃく', 'hyaku', 'ひゃくえん (¥100)'],
        ['1000', 'せん', 'sen', 'せんえん (¥1000)'],
      ],
    },
    qs: [
      { q: '"いまは なんじですか？" — ¿qué pregunta?', hint: 'いま=ahora; なんじ=¿qué hora?', a: '¿Qué hora es ahora?', fb: '"いまは なんじですか？" (ima wa nanji desu ka?) = ¿Qué hora es ahora? なん = qué; じ = hora.' },
      { q: '"ごじはんです" — ¿qué hora es?', hint: 'ご=5; じ=hora; はん=mitad/y media', a: '5:30 / las cinco y media', fb: '"ごじはん" (go-ji han) = 5:30. はん = mitad = y media. Útil para horas en punto y media.' },
      { q: '"せんえんです" — ¿cuánto cuesta?', hint: 'せん=1000; えん=yen', a: '1.000 yenes', fb: '"せんえんです" (sen en desu) = Cuesta 1.000 yenes. えん (円) = yen. 1 USD ≈ 150 えん.' },
      { q: '¿Cuál es el contador de hora en japonés?', hint: 'Va después del número: にじ=2__', a: 'じ (時)', fb: 'じ = 時 (hora). Número + じ = la hora en punto: いちじ(1:00), にじ(2:00), さんじ(3:00)... Los minutos usan ふん/ぷん.' },
      { q: '"ごぜん しちじです" — ¿AM o PM?', hint: 'ごぜん vs ごご', a: 'AM (7:00 de la mañana)', fb: '"ごぜん" (gozen) = AM / mañana (antes del mediodía). "ごご" (gogo) = PM / tarde. "ごぜん しちじ" = 7:00 AM.' },
      { q: '"にひゃくごじゅうえん" ¿cuánto es?', hint: 'に=2; ひゃく=100; ごじゅう=50; えん=yen', a: '250 yenes', fb: 'に(2) × ひゃく(100) + ごじゅう(50) + えん(¥) = ¥250. Los precios en Japón usan miles y centenas con esta estructura.' },
      { q: '"じゅうにじ さんじゅっぷん" — ¿qué hora es?', hint: 'じゅうに=12; じ=hora; さんじゅっぷん=30min', a: '12:30', fb: '"じゅうにじ さんじゅっぷん" (juuni-ji sanjuppun) = 12:30. さんじゅっぷん = 30 minutos. Nota: 30 minutos también puede ser はん (y media).' },
      { q: '¿Cuánto es "ひゃくえん"?', hint: 'ひゃく = 100', a: '100 yenes', fb: '"ひゃくえん" = 100 yenes. Las tiendas de 100 yenes (ひゃくえんショップ) son icónicas en Japón: todo cuesta exactamente ¥100.' },
    ],
  },
};

export default function GramaticaJaponesA1() {
  const [topicKey, setTopicKey] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const topic = topicKey ? GRAMMAR_TOPICS[topicKey] : null;
  const keys = Object.keys(GRAMMAR_TOPICS);

  function check(idx: number) { setRevealed(r => ({ ...r, [idx]: true })); }
  function isCorrect(idx: number) {
    if (!topic) return false;
    const userAns = (answers[idx] ?? '').trim().toLowerCase();
    const correctAns = topic.qs[idx].a.toLowerCase();
    return userAns === correctAns || correctAns.includes(userAns) || userAns.includes(correctAns.split('/')[0].trim().split(' ')[0]);
  }

  if (topic) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
            <span>/</span>
            <button onClick={() => { setTopicKey(null); setAnswers({}); setRevealed({}); }} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📐 文法</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{topic.titleEs}</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{topic.titleEs} · Japonés A1</p>
          <h1 style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', margin: '0 0 1.25rem', fontWeight: 700 }}>{topic.title}</h1>
          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderLeft: `4px solid ${COLOR}` }}>
            <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--ink)', fontSize: '0.95rem' }}>{topic.explanation}</p>
          </div>
          {topic.table && (
            <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead><tr>{topic.table.head.map(h => <th key={h} style={{ padding: '0.6rem 0.85rem', background: COLOR, color: '#fff', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase' }}>{h}</th>)}</tr></thead>
                <tbody>{topic.table.rows.map((row, ri) => (
                  <tr key={ri} style={{ background: ri % 2 === 0 ? `${COLOR}07` : 'var(--bg)' }}>
                    {row.map((cell, ci) => <td key={ci} style={{ padding: '0.55rem 0.85rem', borderBottom: '1px solid var(--line-soft)', color: 'var(--ink)' }}>{cell}</td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.85rem' }}>練習 · {topic.qs.length} ejercicios</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topic.qs.map((q, qi) => {
              const done = revealed[qi]; const correct = isCorrect(qi);
              return (
                <div key={qi} className="wl-card" style={{ padding: '1.1rem', borderLeft: done ? `4px solid ${correct ? '#059669' : '#dc2626'}` : `4px solid ${COLOR}55` }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.35rem' }}>問題 {qi + 1}</div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {q.hint}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input type="text" value={answers[qi] ?? ''} onChange={e => { if (!done) setAnswers(a => ({ ...a, [qi]: e.target.value })); }}
                      onKeyDown={e => { if (e.key === 'Enter' && !done) check(qi); }} disabled={done}
                      placeholder="Tu respuesta..." style={{ padding: '0.5rem 0.85rem', borderRadius: 10, border: `1.5px solid ${done ? (correct ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: done ? (correct ? 'rgba(5,150,105,0.06)' : 'rgba(220,38,38,0.06)') : 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', minWidth: 180 }} />
                    {!done && <button className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR, fontSize: '0.8rem' }} onClick={() => check(qi)}>確認</button>}
                    {done && <span style={{ fontSize: '1rem' }}>{correct ? '✅' : '❌'}</span>}
                  </div>
                  {done && (
                    <div style={{ marginTop: '0.65rem', padding: '0.55rem 0.85rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                      {!correct && <span style={{ fontWeight: 700 }}>正解: <span style={{ color: '#059669' }}>{q.a}</span><br /></span>}
                      {q.fb}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: '1.5rem' }} onClick={() => { setTopicKey(null); setAnswers({}); setRevealed({}); }}>← 全テーマ</button>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 文法 · Gramática</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />文法 · Gramática Japonés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>5 temas esenciales del japonés A1. Explicación + tabla de referencia + 8 ejercicios prácticos.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {keys.map(k => {
            const t = GRAMMAR_TOPICS[k];
            return (
              <button key={k} onClick={() => { setTopicKey(k); setAnswers({}); setRevealed({}); }} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.titleEs} · {t.qs.length} ejercicios</div>
                  </div>
                  <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
