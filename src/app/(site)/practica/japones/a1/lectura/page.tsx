'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface ReadingText { id: number; title: string; titleRom: string; titleEs: string; topic: string; words: number; grammar: string; text: string; textRom: string; vocab: Record<string, [string, string]>; preQ: { q: string; opts: string[] }[]; mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[]; openQ: string; production: string; }

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'はじめまして！', titleRom: 'Hajimemashite!', titleEs: '¡Mucho gusto!', topic: '自己紹介 · Presentación', words: 50, grammar: '〜は〜です · よろしくおねがいします',
    text: 'はじめまして！わたしは マリアです。コロンビアじんです。いまは とうきょうに すんでいます。にほんごを べんきょうしています。すきな たべものは すしです。しゅみは おんがくです。どうぞ よろしく おねがいします。',
    textRom: 'Hajimemashite! Watashi wa Maria desu. Korombiya-jin desu. Ima wa Tōkyō ni sunde imasu. Nihongo o benkyō shite imasu. Sukina tabemono wa sushi desu. Shumi wa ongaku desu. Dōzo yoroshiku onegai shimasu.',
    vocab: {
      'はじめまして': ['hajimemashite', 'mucho gusto (primer encuentro)'],
      'わたしは': ['watashi wa', 'yo (tema は=wa)'],
      'コロンビアじん': ['Korombiya-jin', 'colombiano/a (人=persona de)'],
      'いまは': ['ima wa', 'ahora (いま=ahora + は=tema)'],
      'とうきょうに': ['Tōkyō ni', 'en Tokio (に=partícula de lugar/dirección)'],
      'すんでいます': ['sunde imasu', 'vivo (forma continua de 住む=vivir)'],
      'にほんごを': ['Nihongo o', 'japonés (objeto + を)'],
      'べんきょうしています': ['benkyō shite imasu', 'estoy estudiando'],
      'すきな': ['sukina', 'favorito/a (que me gusta)'],
      'たべものは': ['tabemono wa', 'comida (tema は)'],
      'しゅみは': ['shumi wa', 'hobby (tema は)'],
      'おんがく': ['ongaku', 'música'],
    },
    preQ: [
      { q: '¿Qué comida japonesa conoces?', opts: ['Sushi', 'Ramen', 'Tempura', 'Todas'] },
      { q: '¿Has estudiado algún idioma antes?', opts: ['Sí, uno', 'Sí, varios', 'Estoy empezando'] },
    ],
    mcq: [
      { q: '¿Qué significa "コロンビアじんです"?', cat: 'Vocabulario', opts: ['Vivo en Colombia', 'Soy colombiano/a', 'Me gusta Colombia', 'Vengo de Colombia hoy'], a: 1, fb: '"コロンビアじん" = colombiano/a. 人(じん/jin) = persona de un país. Ej: にほんじん=japonés, アメリカじん=americano.' },
      { q: '¿Dónde vive María ahora?', cat: 'Comprensión', opts: ['コロンビア', 'とうきょう', 'おおさか', 'きょうと'], a: 1, fb: '"いまは とうきょうに すんでいます" = Ahora vivo en Tokio. いま = ahora; とうきょう = Tokio.' },
      { q: '¿Qué está estudiando?', cat: 'Comprensión', opts: ['えいご (inglés)', 'にほんご (japonés)', 'ちゅうごくご (chino)', 'かんこくご (coreano)'], a: 1, fb: '"にほんごを べんきょうしています" = Estoy estudiando japonés. にほんご = idioma japonés.' },
      { q: '¿Cuál es su comida favorita?', cat: 'Comprensión', opts: ['ラーメン', 'てんぷら', 'すし', 'カレー'], a: 2, fb: '"すきな たべものは すしです" = Mi comida favorita es el sushi. すきな = favorito/querido; たべもの = comida.' },
      { q: '"どうぞ よろしく おねがいします" se dice:', cat: 'Gramática', opts: ['Al despedirse', 'Al conocer a alguien por primera vez', 'Al comer', 'Al agradecer'], a: 1, fb: '"どうぞよろしくおねがいします" = mucho gusto / encantado/a de conocerte. Siempre cierra una presentación formal japonesa.' },
    ],
    openQ: 'Preséntate en japonés en 3–4 oraciones. Usa: "わたしは___です。___じんです。___をべんきょうしています。すきな___は___です。"',
    production: 'Puedes escribir en romaji: "Watashi wa ___ desu. ___ jin desu. ___ o benkyou shite imasu."',
  },
  {
    id: 2, title: 'わたしの かぞく', titleRom: 'Watashi no kazoku', titleEs: 'Mi familia', topic: '家族 · Familia', words: 55, grammar: 'あります/います · は〜です · の (posesivo)',
    text: 'わたしの かぞくは よにんです。ちちと ははと あにと わたしです。ちちは かいしゃいんです。ははは せんせいです。あには だいがくせいです。あには にじゅうさいです。うちには ねこが います。なまえは ミミです。かぞくが だいすきです。',
    textRom: 'Watashi no kazoku wa yonin desu. Chichi to haha to ani to watashi desu. Chichi wa kaishain desu. Haha wa sensei desu. Ani wa daigakusei desu. Ani wa nijuusai desu. Uchi ni wa neko ga imasu. Namae wa Mimi desu. Kazoku ga daisuki desu.',
    vocab: {
      'わたしの': ['watashi no', 'mi / mío (の=posesivo)'],
      'よにん': ['yo-nin', 'cuatro personas (4人)'],
      'ちちと': ['chichi to', 'papá y (と=y, conector)'],
      'ちち': ['chichi', 'mi papá (forma humilde/íntima)'],
      'はは': ['haha', 'mi mamá (forma humilde/íntima)'],
      'かいしゃいん': ['kaishain', 'empleado de empresa (会社員)'],
      'せんせい': ['sensei', 'profesor/a, maestro/a (先生)'],
      'だいがくせい': ['daigakusei', 'universitario/a (大学生)'],
      'にじゅうさい': ['nijuusai', '20 años de edad (二十歳)'],
      'ねこが': ['neko ga', 'gato (+ partícula が sujeto)'],
      'います': ['imasu', 'hay/está (ser animado)'],
      'なまえ': ['namae', 'nombre (名前)'],
      'だいすき': ['daisuki', 'amar mucho / me encanta (大好き)'],
    },
    preQ: [
      { q: '¿Cuántos son en tu familia?', opts: ['2-3 personas', '4-5 personas', '6 o más'] },
      { q: '¿Tienes mascotas?', opts: ['Gato', 'Perro', 'Otra mascota', 'No'] },
    ],
    mcq: [
      { q: '¿Cuántos son en la familia?', cat: 'Comprensión', opts: ['3人', '4人', '5人', '6人'], a: 1, fb: '"よにんです" (yo-nin desu) = somos cuatro. 四(よん/yo) = 4; 人(にん/nin) = personas.' },
      { q: '¿Cuál es la profesión del papá?', cat: 'Comprensión', opts: ['せんせい(profesor)', 'かいしゃいん(empleado)', 'いしゃ(médico)', 'がくせい(estudiante)'], a: 1, fb: '"ちちは かいしゃいんです" = Mi papá es empleado de empresa. かいしゃいん = 会社員 = empleado corporativo.' },
      { q: '"ねこが います" usa います porque:', cat: 'Gramática', opts: ['El gato es un objeto inanimado', 'Los gatos son seres animados', 'います es para objetos pequeños', 'Siempre se usa います con mascotas'], a: 1, fb: 'います = para seres animados (personas y animales). あります = para objetos inanimados. El gato (ねこ) es un ser animado → います.' },
      { q: '¿Cuántos años tiene el hermano?', cat: 'Comprensión', opts: ['18さい', '19さい', '20さい', '21さい'], a: 2, fb: '"あには にじゅうさいです" = Mi hermano tiene 20 años. にじゅう = 20; さい = años de edad.' },
      { q: '"わたしの かぞく" — ¿qué función tiene の?', cat: 'Gramática', opts: ['Partícula de objeto directo', 'Partícula posesiva (como "de/mi")', 'Partícula de tema', 'Partícula de lugar'], a: 1, fb: 'の = partícula posesiva. "わたしの かぞく" = la familia de mí = mi familia. A の B = B de A. Ej: にほんの たべもの = comida de Japón.' },
    ],
    openQ: 'Describe a 2 miembros de tu familia en japonés. Usa: "___は ___です。___さいです。"',
    production: 'Patrón: "かぞくは ___にんです。___は ___です。___さいです。"',
  },
  {
    id: 3, title: 'まいにちの せいかつ', titleRom: 'Mainichi no seikatsu', titleEs: 'La vida cotidiana', topic: '日常 · Rutina', words: 58, grammar: 'Verbos -ます形 · に (hora) · で (lugar de acción)',
    text: 'まいにち、ろくじに おきます。シャワーを あびて、あさごはんを たべます。はちじに だいがくへ いきます。ごぜん ちゅうは にほんごを べんきょうします。ひるごはんは がくしょくで たべます。ごごは としょかんで べんきょうします。よるは うちで テレビを みます。じゅういちじに ねます。',
    textRom: 'Mainichi, rokuji ni okimasu. Shawaa o abite, asagohan o tabemasu. Hachiji ni daigaku e ikimasu. Gozen-chuu wa nihongo o benkyou shimasu. Hirugohan wa gakushoku de tabemasu. Gogo wa toshokan de benkyou shimasu. Yoru wa uchi de terebi o mimasu. Juuichiji ni nemasu.',
    vocab: {
      'まいにち': ['mainichi', 'todos los días (毎日)'],
      'ろくじに': ['rokuji ni', 'a las 6 (に=partícula de hora)'],
      'おきます': ['okimasu', 'me levanto (起きます)'],
      'シャワーを あびて': ['shawaa o abite', 'me ducho (abiru=bañarse bajo ducha)'],
      'だいがくへ': ['daigaku e', 'a la universidad (へ=hacia, dirección)'],
      'ごぜん ちゅう': ['gozen-chuu', 'durante la mañana/AM (午前中)'],
      'べんきょうします': ['benkyou shimasu', 'estudio (べんきょうする=estudiar)'],
      'がくしょくで': ['gakushoku de', 'en la cafetería universitaria (で=lugar de acción)'],
      'としょかんで': ['toshokan de', 'en la biblioteca (de=lugar)'],
      'テレビを みます': ['terebi o mimasu', 'veo televisión (みる=ver)'],
      'じゅういちじ': ['juuichiji', 'las 11 (十一時)'],
      'ねます': ['nemasu', 'me duermo / duermo (ねる=dormir)'],
    },
    preQ: [
      { q: '¿A qué hora te levantas normalmente?', opts: ['Antes de las 7', '7-8h', 'Después de las 8'] },
      { q: '¿Dónde estudias con más frecuencia?', opts: ['En casa', 'En la biblioteca', 'En un café', 'En la universidad'] },
    ],
    mcq: [
      { q: '¿A qué hora se levanta?', cat: 'Comprensión', opts: ['ごじ (5:00)', 'ろくじ (6:00)', 'しちじ (7:00)', 'はちじ (8:00)'], a: 1, fb: '"ろくじに おきます" = Me levanto a las 6. ろく = 6; じ = hora; に = partícula de hora.' },
      { q: '¿Qué diferencia hay entre "へ" y "で" en este texto?', cat: 'Gramática', opts: ['"へ" = lugar de acción; "で" = dirección', '"へ" = dirección/destino; "で" = lugar donde ocurre la acción', 'Son intercambiables', '"で" = de dónde viene; "へ" = adónde va'], a: 1, fb: '"だいがくへ いきます" = voy A la universidad (へ=dirección). "がくしょくで たべます" = como EN la cafetería (で=lugar donde ocurre la acción). Distinción clave del japonés A1.' },
      { q: '"ひるごはんは がくしょくで たべます" — ¿dónde almuerza?', cat: 'Comprensión', opts: ['としょかん', 'うち', 'がくしょく', 'だいがく'], a: 2, fb: '"がくしょく" (gakushoku) = cafetería universitaria. がく=学(estudio) + しょく=食(comida).' },
      { q: '¿A qué hora se duerme?', cat: 'Comprensión', opts: ['じゅうじ (10h)', 'じゅういちじ (11h)', 'じゅうにじ (12h)', 'よじ (4h AM)'], a: 1, fb: '"じゅういちじに ねます" = Me duermo a las 11. じゅうに=11; ねます=duermo.' },
      { q: '"べんきょうします" vs "べんきょうしています" — la diferencia es:', cat: 'Gramática', opts: ['Son iguales', '"します" = hábito; "しています" = acción en progreso ahora', '"します" = pasado; "しています" = futuro', '"します" = formal; "しています" = informal'], a: 1, fb: '"べんきょうします" = estudio (hábito/rutina). "べんきょうしています" = estoy estudiando (ahora). La forma -ています indica acción en progreso o estado resultante.' },
    ],
    openQ: 'Describe tu rutina diaria en japonés. Incluye al menos 3 actividades con hora. Puedes usar romaji.',
    production: 'Patrón: "___じに おきます。___じに ___へ いきます。___で ___します。___じに ねます。"',
  },
];

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [preAnswers, setPreAnswers] = useState<Record<number, number>>({});
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeInfo, setActiveInfo] = useState<[string, string] | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const [showRom, setShowRom] = useState(false);

  const tokens = t.text.split(/(\s+|[。！？、「」]+)/).filter(Boolean).map(tk => ({
    raw: tk, isSpace: /^\s+$/.test(tk), isPunct: /^[。！？、「」]+$/.test(tk),
    clean: tk.replace(/[^぀-ゟ゠-ヿ一-龯]/g, ''),
  }));
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← テキスト一覧</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>テキスト {t.id} / 3 — {t.titleEs}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Antes', 'Lectura', 'Preguntas', 'Resultado'];
          const phaseOrder = ['pre', 'read', 'questions', 'done'];
          const current = phase === p; const past = phaseOrder.indexOf(p) < phaseOrder.indexOf(phase);
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
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />読む前に — antes de leer</p>
          {t.preQ.map((pq, i) => (
            <div key={i} style={{ marginBottom: '1.25rem' }}>
              <p style={{ margin: '0 0 0.65rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.96rem' }}>{i + 1}. {pq.q}</p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {pq.opts.map((opt, oi) => (
                  <button key={oi} onClick={() => setPreAnswers(p => ({ ...p, [i]: oi }))} className={preAnswers[i] === oi ? 'btn btn-sm' : 'btn btn-ghost btn-sm'} style={{ fontSize: '0.84rem' }}>{opt}</button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn btn-sm" onClick={() => setPhase('read')} style={{ background: COLOR, borderColor: COLOR }}>読み始める →</button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />{t.title} — {t.titleEs}</p>
            <button onClick={() => setShowRom(!showRom)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>{showRom ? 'ローマ字非表示' : '🔤 ローマ字表示'}</button>
          </div>
          {showRom && <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, fontSize: '0.84rem', color: COLOR, lineHeight: 1.7, fontStyle: 'italic' }}>{t.textRom}</div>}
          <div style={{ lineHeight: 2.4, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const info = t.vocab[tk.clean] ?? null;
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => { setActiveInfo(info); setActiveIdx(i); }}
                    style={{ background: isActive ? `${COLOR}18` : info ? `${COLOR}08` : 'transparent', border: isActive ? `1.5px solid ${COLOR}` : info ? `1px dashed ${COLOR}44` : 'none', borderRadius: 6, padding: '0 3px', cursor: info ? 'pointer' : 'default', fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? COLOR : 'inherit', fontWeight: isActive ? 700 : 'inherit' }}>{tk.raw}</button>
                  {isActive && (
                    <span style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: info ? '#4a0012' : '#6f7691', color: '#fff', borderRadius: 8, padding: '0.3rem 0.85rem', fontSize: '0.73rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 16px rgba(188,0,45,0.3)', marginTop: 4, maxWidth: 280, textAlign: 'center' }}>
                      {info ? <>{info[0]} — {info[1]}</> : '(sin notas)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveInfo(null); setActiveIdx(null); }} style={{ background: COLOR, borderColor: COLOR }}>問題へ →</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← 前へ</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← テキストへ戻る</button>
          {t.mcq.map((q, qi) => {
            const ans = answers[qi]; const done = ans !== undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>{q.cat} · 問題 {qi + 1}</div>
                <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const isCorrect = oi === q.a; const isSelected = ans === oi;
                    let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
                    if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                    if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                    if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
                    return (
                      <button key={oi} onClick={() => { if (answers[qi] !== undefined) return; setAnswers(p => ({ ...p, [qi]: oi })); }} disabled={done}
                        style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55 }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                        {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>自由記述 — Producción libre</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4} placeholder="にほんごで かいてください。(o en romaji)" style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')} style={{ background: COLOR, borderColor: COLOR }}>結果を見る →</button>}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🎌' : score >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} 正解</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
            {score === t.mcq.length ? 'よくできました！¡Perfecto!' : score >= 3 ? 'がんばりました！Muy bien.' : 'もう一度読みましょう。Vuelve a leer.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>自由記述</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }} style={{ background: COLOR, borderColor: COLOR }}>もう一度読む</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← テキスト一覧</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaJaponesA1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 読む</span>
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
          <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 読む · Lectura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />読む · Lectura Japonés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>3 textos en ひらがな・カタカナ con romaji disponible. Vocabulario interactivo: haz clic en palabras resaltadas.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title}</div>
                  <div style={{ fontSize: '0.73rem', color: COLOR, fontStyle: 'italic', marginBottom: '0.1rem' }}>{t.titleRom}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>~{t.words}語 · {t.grammar} · {t.mcq.length} preguntas</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
