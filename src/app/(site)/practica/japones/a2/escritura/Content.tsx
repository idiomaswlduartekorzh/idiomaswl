'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titleJa: string; topic: string;
  prompt: string; model: string; modelRomaji: string; criteria: string[];
  vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Email a un amigo', titleJa: '友達へのメール',
    topic: 'た-form (pasado)',
    prompt: 'Escribe un email a tu amigo japonés Kenta contando lo que hiciste el fin de semana pasado. Usa al menos 4 verbos en た-form. Incluye adónde fuiste, con quién, qué comiste y cómo te sentiste.',
    model: 'けんたへ、元気？先週末、私は友達と山に行きました。朝六時に起きて、電車で二時間かかりました。山の景色はとても美しかったです。お昼に山の上でおにぎりを食べました。とても美味しかったです！午後は少し雨が降りましたが、楽しかったです。また一緒に行きたいですね！バイバイ、[名前]',
    modelRomaji: 'Kenta e, genki? Senshūmatsu, watashi wa tomodachi to yama ni ikimashita. Asa rokuji ni okite, densha de nijikan kakarimashita. Yama no keshiki wa totemo utsukushikatta desu. Ohiru ni yama no ue de onigiri o tabemashita. Totemo oishikatta desu! Gogo wa sukoshi ame ga furimashita ga, tanoshikatta desu. Mata issho ni ikitai desu ne! Baibai, [namae]',
    criteria: ['Usa al menos 4 verbos en ～ました (pasado formal)', 'Incluye expresiones de tiempo (先週末, 朝, 午後)', 'Menciona al menos un lugar y una comida', 'Cierra con una frase de deseo o saludo'],
    vocab: ['先週末 (senshūmatsu)', '行きました (ikimashita)', '食べました (tabemashita)', '見ました (mimashita)', '楽しかったです (tanoshikatta desu)', '美味しかったです (oishikatta desu)', 'また～たいです (mata ~ tai desu)'],
    checklist: ['¿Todos los verbos de eventos pasados usan ～ました?', '¿Las descripciones de estado usan ～でした / ～かったです?', '¿Incluiste al menos dos eventos distintos?', '¿El tono es informal y amistoso?'],
  },
  {
    id: 2, title: 'Presentación extendida', titleJa: '自己紹介',
    topic: '～ています (estado actual) + ～たいです (planes)',
    prompt: 'Escribe una presentación extendida de ti mismo/a para un grupo de intercambio japonés. Usa ～ています para describir tu vida actual (dónde vives, qué estudias/trabajas) y ～たいです para hablar de tus planes y deseos futuros.',
    model: 'はじめまして、私はマリアです。コロンビアのボゴタに住んでいます。今、大学で経済学を勉強しています。毎日、日本語も練習しています。趣味は音楽を聴くことと映画を見ることです。将来、日本に行きたいです。日本の食べ物を食べてみたいし、桜も見たいです。どうぞよろしくお願いします！',
    modelRomaji: 'Hajimemashite, watashi wa Maria desu. Koronbia no Bogota ni sunde imasu. Ima, daigaku de keizaigaku o benkyō shite imasu. Mainichi, nihongo mo renshū shite imasu. Shumi wa ongaku o kiku koto to eiga o miru koto desu. Shōrai, Nihon ni ikitai desu. Nihon no tabemono o tabete mitai shi, sakura mo mitai desu. Dōzo yoroshiku onegai shimasu!',
    criteria: ['Usa ～ています para al menos 2 estados actuales (vivir, estudiar, trabajar)', 'Usa ～たいです para al menos 2 deseos o planes futuros', 'Menciona tus hobbies o intereses', 'Usa fórmulas de saludo japonesas (はじめまして, どうぞよろしく)'],
    vocab: ['はじめまして (hajimemashite)', '～に住んでいます (~ ni sunde imasu)', '～を勉強しています (~ o benkyō shite imasu)', '趣味は～ことです (shumi wa ~ koto desu)', '～たいです (~ tai desu)', '将来 (shōrai)', 'どうぞよろしくお願いします (dōzo yoroshiku onegai shimasu)'],
    checklist: ['¿Usaste ～ています para los estados actuales?', '¿Usaste ～たいです para los deseos futuros?', '¿Incluiste hobbies con "～ことが好きです" o "趣味は～"?', '¿Empezaste con "はじめまして" y terminaste con "よろしくお願いします"?'],
  },
  {
    id: 3, title: 'Comparar mi ciudad', titleJa: '私の街の比較',
    topic: 'Adjetivos comparativos: ～より～の方が',
    prompt: 'Compara dos ciudades o dos barrios que conozcas bien. Usa la estructura comparativa japonesa ～より～の方が～ (A yori B no hō ga ~ / B es más ~ que A). Escribe 5-6 oraciones.',
    model: 'ボゴタとメデジンを比べると、いくつか違いがあります。ボゴタよりメデジンの方が気候が温かいです。でも、ボゴタよりメデジンの方が小さいです。交通はボゴタよりメデジンの方が便利だと思います。食べ物の値段はメデジンよりボゴタの方が高いです。私はメデジンより東京の方が行きたいですが、コロンビアが大好きです！',
    modelRomaji: 'Bogota to Medeyin o kuraberu to, ikutsuka chigai ga arimasu. Bogota yori Medeyin no hō ga kikō ga atatakai desu. Demo, Bogota yori Medeyin no hō ga chiisai desu. Kōtsū wa Bogota yori Medeyin no hō ga benri da to omoimasu. Tabemono no nedan wa Medeyin yori Bogota no hō ga takai desu. Watashi wa Medeyin yori Tōkyō no hō ga ikitai desu ga, Koronbia ga daisuki desu!',
    criteria: ['Usa la estructura ～より～の方が al menos 3 veces', 'Compara al menos 3 aspectos diferentes (clima, tamaño, precio, etc.)', 'Incluye tu opinión personal', 'Usa conectores (でも、～と思います)'],
    vocab: ['～より～の方が (~ yori ~ no hō ga)', '～と比べると (~ to kuraberu to)', '大きい/小さい (ōkii/chiisai)', '便利 (benri)', '高い/安い (takai/yasui)', '私は～の方が好きです (watashi wa ~ no hō ga suki desu)', '～だと思います (~ da to omoimasu)'],
    checklist: ['¿Usaste ～より～の方が para los comparativos?', '¿Comparaste el mismo aspecto de las dos ciudades?', '¿Incluiste adjetivos en su forma apropiada (い-adj / な-adj)?', '¿La redacción tiene 5-6 oraciones coherentes?'],
  },
  {
    id: 4, title: 'Vacaciones soñadas', titleJa: '夢のバケーション',
    topic: '～たいです + ～ことができます',
    prompt: 'Describe tus vacaciones ideales usando ～たいです para expresar lo que quieres hacer y ～ことができます para mencionar qué actividades son posibles o qué habilidades necesitas. Escribe 5-6 oraciones.',
    model: '私の夢のバケーションは日本旅行です。まず、東京に行きたいです。渋谷や浅草を歩いて、おいしい食べ物を食べたいです。日本語が話せるので、日本人と話すことができます。また、京都のお寺を見たいし、着物を着ることもできたらいいなと思います。富士山に登ることができるかどうか分かりませんが、挑戦してみたいです！',
    modelRomaji: 'Watashi no yume no bakeit-shon wa Nihon ryokō desu. Mazu, Tōkyō ni ikitai desu. Shibuya ya Asakusa o aruite, oishii tabemono o tabetai desu. Nihongo ga hanaseru node, Nihonjin to hanasu koto ga dekimasu. Mata, Kyōto no otera o mitai shi, kimono o kiru koto mo dekitara ii na to omoimasu. Fujisan ni noboru koto ga dekiru ka dō ka wakarimasen ga, chōsen shite mitai desu!',
    criteria: ['Usa ～たいです al menos 3 veces', 'Usa ～ことができます al menos 2 veces', 'Menciona al menos 2 lugares concretos', 'Cierra con una reflexión o comentario personal'],
    vocab: ['夢の (yume no)', '旅行 (ryokō)', '～に行きたいです (~ ni ikitai desu)', '～を食べたいです (~ o tabetai desu)', '～ことができます (~ koto ga dekimasu)', '～してみたいです (~ shite mitai desu)', '～かどうか分かりません (~ ka dō ka wakarimasen)'],
    checklist: ['¿Usaste ～たいです para deseos específicos?', '¿Usaste ～ことができます para habilidades o posibilidades?', '¿Mencionaste lugares o actividades concretas?', '¿La redacción es fluida y conectada?'],
  },
  {
    id: 5, title: 'Explicar reglas', titleJa: 'ルール説明',
    topic: '～なければなりません + ～てはいけません',
    prompt: 'Explica las reglas de tu trabajo, escuela o casa usando ～なければなりません (hay que / debo) para las obligaciones y ～てはいけません (no se puede / está prohibido) para las prohibiciones. Escribe 5-6 reglas.',
    model: '私の学校のルールを説明します。まず、毎日九時までに来なければなりません。授業中に携帯電話を使ってはいけません。制服を着なければなりません。廊下で走ってはいけません。宿題は毎日提出しなければなりません。でも、先生に許可をもらえば、早退することができます。このルールは厳しいですが、大切だと思います。',
    modelRomaji: 'Watashi no gakkō no rūru o setsumei shimasu. Mazu, mainichi kuji made ni konakereba narimasen. Jugyōchū ni keitai denwa o tsukatte wa ikemasen. Seifuku o kinakereba narimasen. Rōka de hashitte wa ikemasen. Shukudai wa mainichi teifu shinakereba narimasen. Demo, sensei ni kyoka o moraeba, sōtai suru koto ga dekimasu. Kono rūru wa kibishii desu ga, taisetsu da to omoimasu.',
    modelRomaji2: '',
    criteria: ['Usa ～なければなりません para al menos 3 obligaciones', 'Usa ～てはいけません para al menos 2 prohibiciones', 'Introduce el tema con "～のルールを説明します"', 'Cierra con tu opinión personal (～と思います)'],
    vocab: ['ルール (rūru)', '～なければなりません (~ nakereba narimasen)', '～てはいけません (~ te wa ikemasen)', '～することができます (~ suru koto ga dekimasu)', '毎日 (mainichi)', '許可 (kyoka)', '大切 (taisetsu)'],
    checklist: ['¿Usaste ～なければなりません para las obligaciones?', '¿Usaste ～てはいけません para las prohibiciones?', '¿Las reglas son claras y específicas?', '¿Hay al menos 5 reglas diferentes?'],
  },
];

export default function EscrituraJaponesA2() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setCheckDone({}); }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (submitted && task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <h2 style={{ margin: '0 0 0.5rem', color: '#059669' }}>¡Texto completado!</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Guardado en sesión — David o Zhanna pueden revisarlo contigo en clase.</p>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Escribir de nuevo</button>
              <button className="btn btn-ghost btn-sm" onClick={back}>← Otras tareas</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Japonés A2</Link>
            <span>/</span>
            <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ 書く</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>Tarea {task.id}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />書く Tarea {task.id} — {task.topic}</p>
          <h2 style={{ fontSize: '1.7rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{task.titleJa}</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: '0 0 1.5rem' }}>{task.title}</p>

          <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Consigna</div>
            <p style={{ margin: 0, fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.65, fontWeight: 600 }}>{task.prompt}</p>
          </div>

          <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
            {showModel ? '👁 Ocultar modelo' : '👁 Ver ejemplo en japonés'}
          </button>
          {showModel && (
            <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
              <p style={{ margin: '0 0 0.65rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.9, fontStyle: 'italic' }}>{task.model}</p>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#6366f1', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Romaji</div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.modelRomaji}</p>
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criterios de evaluación</div>
              {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
            </div>
            <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Banco de vocabulario</div>
              <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                {task.vocab.map((v, i) => (
                  <button key={i} onClick={() => setText(p => p ? `${p} ${v}` : v)}
                    style={{ fontSize: '0.72rem', padding: '0.18rem 0.5rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}30`, cursor: 'pointer', fontFamily: 'inherit' }}>
                    {v}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <textarea value={text} onChange={e => setText(e.target.value)} rows={7}
            placeholder="Escribe tu texto aquí en japonés (romaji o kana/kanji)..."
            style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 20 ? '#d97706' : '#059669' }}>
            <span>{words} palabras {words < 20 ? '(mínimo recomendado: 30)' : '✓'}</span>
          </div>

          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Lista de verificación antes de enviar</div>
            {task.checklist.map((item, i) => (
              <button key={i} onClick={() => setCheckDone(p => ({ ...p, [i]: !p[i] }))}
                style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.35rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', textAlign: 'left' }}>
                <span style={{ fontSize: '1rem', flexShrink: 0 }}>{checkDone[i] ? '✅' : '⬜'}</span>
                <span style={{ fontSize: '0.82rem', color: checkDone[i] ? '#059669' : 'var(--muted)' }}>{item}</span>
              </button>
            ))}
          </div>

          <button className="btn btn-sm" onClick={() => text.trim() && setSubmitted(true)} disabled={!text.trim()}
            style={{ background: COLOR, borderColor: COLOR, opacity: text.trim() ? 1 : 0.5 }}>
            Enviar texto →
          </button>
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
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ 書く</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />書く · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 0.5rem' }}>
          5 tareas guiadas con texto modelo en japonés y romaji, banco de vocabulario y lista de verificación. Acepta romaji o hiragana/katakana/kanji.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginTop: '1.5rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.1rem' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{t.titleJa}</span>
                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.prompt.substring(0, 65)}...</p>
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
