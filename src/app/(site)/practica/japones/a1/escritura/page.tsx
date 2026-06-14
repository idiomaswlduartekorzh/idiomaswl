'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface Task { id: number; title: string; titleRom: string; titleEs: string; emoji: string; topic: string; prompt: string; grammar: string; vocab: { word: string; rom: string; es: string }[]; model: string; modelRom: string; modelEs: string; criteria: string[]; checklist: string[]; }

const TASKS: Task[] = [
  {
    id: 1, emoji: '👋', title: 'じこしょうかい', titleRom: 'Jiko shoukai', titleEs: 'Presentación personal', topic: '〜は〜です · よろしく',
    prompt: 'Escribe una presentación personal en japonés (4–6 oraciones). Incluye: nombre, origen, dónde vives ahora, qué estudias y un hobby.',
    grammar: 'わたしは ___です (soy ___) · ___じんです (soy de ___) · ___に すんでいます (vivo en ___) · ___を べんきょうしています (estudio ___) · すきな ___は ___です (mi ___ favorito es ___)',
    vocab: [
      { word: 'わたしは', rom: 'watashi wa', es: 'yo (tema)' },
      { word: '___じんです', rom: '___jin desu', es: 'soy ___ (de ese país)' },
      { word: '___に すんでいます', rom: '___ni sunde imasu', es: 'vivo en ___' },
      { word: '___を べんきょうしています', rom: '___o benkyou shite imasu', es: 'estoy estudiando ___' },
      { word: 'しゅみは ___です', rom: 'shumi wa ___ desu', es: 'mi hobby es ___' },
      { word: 'どうぞ よろしく', rom: 'douzo yoroshiku', es: 'mucho gusto (cierre)' },
    ],
    model: 'はじめまして。わたしは カルロスです。コロンビアじんです。いまは メデジンに すんでいます。にほんごと えいごを べんきょうしています。しゅみは サッカーです。どうぞ よろしく おねがいします。',
    modelRom: 'Hajimemashite. Watashi wa Karurosu desu. Korombiya-jin desu. Ima wa Medehin ni sunde imasu. Nihongo to eigo o benkyou shite imasu. Shumi wa sakkaa desu. Douzo yoroshiku onegaishimasu.',
    modelEs: 'Mucho gusto. Soy Carlos. Soy colombiano. Ahora vivo en Medellín. Estudio japonés e inglés. Mi hobby es el fútbol. Encantado de conocerles.',
    criteria: ['Usar は para el tópico', 'Usar です para identidad', 'Mencionar lugar de residencia con に+います', 'Cerrar con どうぞよろしく'],
    checklist: ['Nombre con ___です', 'Nacionalidad con ___じんです', 'Ciudad con ___にすんでいます', 'Qué estudias con ___をべんきょうしています', 'Hobby con しゅみは___です', 'Cierre どうぞよろしく'],
  },
  {
    id: 2, emoji: '🏠', title: 'わたしの うち', titleRom: 'Watashi no uchi', titleEs: 'Mi casa', topic: 'あります/います · ___の ___',
    prompt: 'Describe tu casa o habitación en japonés (4–6 oraciones). Usa あります e います para describir qué hay.',
    grammar: '[lugar]に [objeto]が あります (hay ___ en ___) · [lugar]に [persona/animal]が います · ___の うち (la casa de ___) · おおきい/ちいさい (grande/pequeño)',
    vocab: [
      { word: 'へやに', rom: 'heya ni', es: 'en la habitación' },
      { word: '___が あります', rom: '___ga arimasu', es: 'hay ___ (inanimado)' },
      { word: '___が います', rom: '___ga imasu', es: 'hay ___ (persona/animal)' },
      { word: 'おおきい', rom: 'ookii', es: 'grande' },
      { word: 'ちいさい', rom: 'chiisai', es: 'pequeño/a' },
      { word: 'きれいな', rom: 'kirei na', es: 'bonito/a, limpio/a' },
    ],
    model: 'わたしの うちは アパートです。へやは みっつ あります。へやに ベッドと つくえが あります。まどの そとに こうえんが あります。ねこが います。なまえは ポチです。うちが すきです。',
    modelRom: 'Watashi no uchi wa apaato desu. Heya wa mittsu arimasu. Heya ni beddo to tsukue ga arimasu. Mado no soto ni kouen ga arimasu. Neko ga imasu. Namae wa Pochi desu. Uchi ga suki desu.',
    modelEs: 'Mi casa es un apartamento. Hay tres habitaciones. En la habitación hay una cama y un escritorio. Fuera de la ventana hay un parque. Hay un gato. Su nombre es Pochi. Me gusta mi casa.',
    criteria: ['Usar あります para objetos inanimados', 'Usar います para mascotas/personas', 'Usar の para posesión', 'Describir al menos 1 cualidad de la casa'],
    checklist: ['Tipo de casa (アパート/いえ)', 'Al menos 2 objetos con あります', 'Algo con います (si tienes mascota/familia)', 'Una ubicación con ___のそと/なか/うえ', 'Opinión personal de la casa'],
  },
  {
    id: 3, emoji: '🗾', title: 'にほんに ついて', titleRom: 'Nihon ni tsuite', titleEs: 'Sobre Japón', topic: '〜が すきです · ___は ___です',
    prompt: 'Escribe 4–5 oraciones sobre Japón: qué sabes, qué te gusta y por qué estudias japonés.',
    grammar: '___が すきです (me gusta ___) · ___が ゆうめいです (es famoso ___) · なぜなら (porque) · にほんに いきたいです (quiero ir a Japón)',
    vocab: [
      { word: '___が すきです', rom: '___ga suki desu', es: 'me gusta ___' },
      { word: '___が ゆうめいです', rom: '___ga yuumei desu', es: '___ es famoso/a' },
      { word: '___に いきたいです', rom: '___ni ikitai desu', es: 'quiero ir a ___' },
      { word: 'にほんご', rom: 'nihongo', es: 'idioma japonés' },
      { word: 'ぶんか', rom: 'bunka', es: 'cultura' },
      { word: 'たのしい', rom: 'tanoshii', es: 'divertido/a, alegre' },
    ],
    model: 'にほんが だいすきです。にほんの たべものが おいしいです。すしと ラーメンが とくに すきです。にほんの アニメも すきです。にほんに いきたいです。だから にほんごを べんきょうしています。',
    modelRom: 'Nihon ga daisuki desu. Nihon no tabemono ga oishii desu. Sushi to raamen ga tokuni suki desu. Nihon no anime mo suki desu. Nihon ni ikitai desu. Dakara nihongo o benkyou shite imasu.',
    modelEs: 'Me encanta Japón. La comida japonesa está deliciosa. Me gusta especialmente el sushi y el ramen. También me gusta el anime japonés. Quiero ir a Japón. Por eso estudio japonés.',
    criteria: ['Usar ___が すきです correctamente', 'Mencionar algo específico sobre Japón', 'Explicar por qué estudias japonés', 'Usar も (también) al menos una vez'],
    checklist: ['Al menos 2 cosas que te gustan de Japón', 'Comida japonesa mencionada', 'Por qué estudias japonés', 'Quiero ir a Japón (いきたいです)', 'Adjetivo descriptivo (おいしい/すごい/たのしい)'],
  },
  {
    id: 4, emoji: '📅', title: 'きのうの こと', titleRom: 'Kinou no koto', titleEs: 'Lo de ayer', topic: '〜ました (pasado) · ___で ___をしました',
    prompt: 'Describe qué hiciste ayer en japonés (4–6 oraciones). Usa la forma pasada -ました.',
    grammar: '___に いきました (fui a ___) · ___を たべました (comí ___) · ___を みました (vi ___) · ___で ___を しました (hice ___ en ___) · たのしかったです (fue divertido)',
    vocab: [
      { word: '___に いきました', rom: '___ni ikimashita', es: 'fui a ___' },
      { word: '___を たべました', rom: '___o tabemashita', es: 'comí ___' },
      { word: '___を みました', rom: '___o mimashita', es: 'vi ___' },
      { word: '___で ___を しました', rom: '___de ___o shimashita', es: 'hice ___ en ___' },
      { word: 'たのしかったです', rom: 'tanoshikatta desu', es: 'fue divertido (pasado de たのしい)' },
      { word: 'きのう', rom: 'kinou', es: 'ayer' },
    ],
    model: 'きのうは ともだちと いっしょに でかけました。えきのちかくの レストランで ランチを たべました。すしを たべました。おいしかったです！そのあと えいがを みました。よるは うちで にほんごを べんきょうしました。たのしかったです！',
    modelRom: 'Kinou wa tomodachi to issho ni dekakemashita. Eki no chikaku no resutoran de ranchi o tabemashita. Sushi o tabemashita. Oishikatta desu! Sono ato eiga o mimashita. Yoru wa uchi de nihongo o benkyou shimashita. Tanoshikatta desu!',
    modelEs: 'Ayer salí junto con un amigo. Almorcé en un restaurante cerca de la estación. Comí sushi. ¡Estaba delicioso! Después vi una película. En la noche estudié japonés en casa. ¡Fue divertido!',
    criteria: ['Al menos 3 verbos en forma -ました', 'Usar で para lugar de la acción', 'Mencionar con quién estuviste (si aplica)', 'Expresar opinión sobre el día'],
    checklist: ['Actividad matutina o de mediodía', 'Actividad de tarde o noche', 'Al menos 3 verbos en -ました', 'Lugar con ___で', 'Adjetivo en pasado (おいしかった/たのしかった)'],
  },
  {
    id: 5, emoji: '🌤️', title: 'きょうの てんき', titleRom: 'Kyou no tenki', titleEs: 'El tiempo de hoy', topic: '〜です · 形容詞 (adjetivos)',
    prompt: 'Describe el tiempo de hoy y el clima de tu ciudad en diferentes estaciones. 4–5 oraciones.',
    grammar: 'きょうは ___です (hoy es ___) · あつい/さむい/あたたかい (caluroso/frío/templado) · ___が ふります (llueve/nieva) · いつも (siempre) · ときどき (a veces)',
    vocab: [
      { word: 'きょうの てんきは', rom: 'kyou no tenki wa', es: 'el tiempo de hoy' },
      { word: 'あつい', rom: 'atsui', es: 'caluroso/a' },
      { word: 'さむい', rom: 'samui', es: 'frío/a' },
      { word: 'あたたかい', rom: 'atatakai', es: 'templado/a, cálido/a' },
      { word: 'あめが ふります', rom: 'ame ga furimasu', es: 'llueve (ame=lluvia, furu=caer)' },
      { word: 'はれています', rom: 'harete imasu', es: 'está despejado / hace sol' },
    ],
    model: 'きょうは はれています。あたたかいです。ボゴタの てんきは いつも すずしいです。なつも ふゆも あまり あつくないです。ときどき あめが ふります。でも、ゆきは ふりません。ボゴタの てんきが すきです！',
    modelRom: 'Kyou wa harete imasu. Atatakai desu. Bogota no tenki wa itsumo suzushii desu. Natsu mo fuyu mo amari atsuku nai desu. Tokidoki ame ga furimasu. Demo, yuki wa furimasen. Bogota no tenki ga suki desu!',
    modelEs: 'Hoy está despejado. Está templado. El clima de Bogotá siempre es fresco. Ni en verano ni en invierno hace mucho calor. A veces llueve. Pero no nieva. ¡Me gusta el clima de Bogotá!',
    criteria: ['Describir el tiempo de HOY', 'Usar adjetivo de temperatura (あつい/さむい/あたたかい)', 'Mencionar lluvia o nieve', 'Comparar estaciones o usar いつも/ときどき'],
    checklist: ['Tiempo de hoy', 'Temperatura con adjetivo', 'Referencia a lluvia o nieve', 'Una estación mencionada (なつ=verano/ふゆ=invierno)', 'Opinión personal sobre el clima'],
  },
];

export default function EscrituraJaponesA1() {
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showRom, setShowRom] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const task = activeTask !== null ? TASKS[activeTask] : null;
  const checkCount = Object.values(checklist).filter(Boolean).length;

  function reset() { setActiveTask(null); setText(''); setShowModel(false); setShowRom(false); setChecklist({}); setSubmitted(false); }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
            <span>/</span>
            <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', font: 'inherit', padding: 0 }}>✍️ 書く</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{task.emoji} {task.titleEs}</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{task.topic}</p>
          <h1 style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', margin: '0 0 0.35rem', fontWeight: 700 }}>{task.emoji} {task.title} ({task.titleRom}) — {task.titleEs}</h1>
          <p style={{ color: 'var(--muted)', margin: '0 0 1.75rem', fontSize: '0.94rem', lineHeight: 1.6 }}>{task.prompt}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>文法 · Gramática</div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink)', lineHeight: 1.65 }}>{task.grammar}</p>
            </div>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>語彙 · Vocabulario</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {task.vocab.map(v => (
                  <div key={v.word} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.8rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{v.word}</span>
                    <span style={{ color: COLOR, fontSize: '0.7rem', fontStyle: 'italic' }}>({v.rom})</span>
                    <span style={{ color: 'var(--muted)' }}>— {v.es}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>にほんごで かいてください (hiragana, katakana o romaji):</label>
            <textarea value={text} onChange={e => setText(e.target.value)} disabled={submitted} rows={7}
              placeholder="はじめまして。わたしは...  o  Hajimemashite. Watashi wa..."
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 12, resize: 'vertical', border: `1.5px solid ${submitted ? `${COLOR}44` : 'var(--line-soft)'}`, background: submitted ? `${COLOR}06` : 'var(--bg)', color: 'var(--ink)', fontSize: '0.98rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
          </div>
          {!submitted ? (
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem' }}>
              <button className="btn btn-sm" disabled={text.trim().length < 10} onClick={() => setSubmitted(true)} style={{ ...(text.trim().length >= 10 ? { background: COLOR, borderColor: COLOR } : {}) }}>提出する ✓</button>
              <button className="btn btn-ghost btn-sm" onClick={reset}>← ほかのかだい</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>チェックリスト · Verificación</div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: checkCount === task.checklist.length ? '#059669' : 'var(--muted)' }}>{checkCount}/{task.checklist.length}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {task.checklist.map((item, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem', color: checklist[i] ? '#059669' : 'var(--ink)' }}>
                      <input type="checkbox" checked={!!checklist[i]} onChange={e => setChecklist(p => ({ ...p, [i]: e.target.checked }))} style={{ accentColor: '#059669', width: 16, height: 16, flexShrink: 0 }} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>模範解答 · Modelo</div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => setShowRom(!showRom)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>{showRom ? 'Ocultar romaji' : '🔤 Ver romaji'}</button>
                    <button onClick={() => setShowModel(!showModel)} className={showModel ? 'btn btn-ghost btn-sm' : 'btn btn-sm'} style={{ fontSize: '0.72rem', ...(showModel ? {} : { background: COLOR, borderColor: COLOR }) }}>{showModel ? 'Ocultar modelo' : 'Ver modelo'}</button>
                  </div>
                </div>
                {showModel && (
                  <div>
                    <p style={{ margin: '0 0 0.4rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.8 }}>{task.model}</p>
                    {showRom && <p style={{ margin: '0 0 0.4rem', fontSize: '0.82rem', color: COLOR, lineHeight: 1.65, fontStyle: 'italic' }}>{task.modelRom}</p>}
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{task.modelEs}</p>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: '0.65rem' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); setChecklist({}); }}>もう一度書く</button>
                <button className="btn btn-ghost btn-sm" onClick={reset}>← ぜんぶのかだい</button>
              </div>
            </div>
          )}
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
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ 書く · Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />書く · Escritura Japonés A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>5 tareas con vocabulario, modelo con romaji y checklist. Puedes escribir en ひらがな, カタカナ o romaji.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => { setActiveTask(i); setText(''); setSubmitted(false); setChecklist({}); setShowModel(false); }} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0 }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title} ({t.titleRom}) — {t.titleEs}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.checklist.length} criterios</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
