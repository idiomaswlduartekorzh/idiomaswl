import Link from 'next/link';

const COLOR = '#bc002d';

const EXERCISES = [
  {
    id: 1,
    title: 'はじめまして！',
    titleRom: 'Hajimemashite!',
    titleEs: 'Presentaciones',
    duration: '~30 seg',
    level: 'A1',
    topic: '〜は〜です · じんです · どうぞよろしく',
    script: [
      { speaker: 'たなか', text: 'はじめまして！わたしは たなか けんじです。にほんじんです。どうぞ よろしく おねがいします。', rom: 'Hajimemashite! Watashi wa Tanaka Kenji desu. Nihonjin desu. Douzo yoroshiku onegaishimasu.' },
      { speaker: 'マリア', text: 'はじめまして！わたしは マリアです。コロンビアじんです。いま にほんごを べんきょうしています。よろしく おねがいします！', rom: 'Hajimemashite! Watashi wa Maria desu. Korombiya-jin desu. Ima nihongo o benkyou shite imasu. Yoroshiku onegaishimasu!' },
      { speaker: 'たなか', text: 'にほんごが じょうずですね！どこで べんきょうしましたか？', rom: 'Nihongo ga jouzu desu ne! Doko de benkyou shimashita ka?' },
      { speaker: 'マリア', text: 'ありがとうございます！WeLearnで べんきょうしています！', rom: 'Arigatou gozaimasu! WeLearn de benkyou shite imasu!' },
    ],
    questions: [
      { q: '¿De dónde es Tanaka?', opts: ['コロンビア', 'にほん (Japón)', 'ちゅうごく (China)', 'かんこく (Corea)'], a: 1 },
      { q: '¿Qué estudia María?', opts: ['えいご', 'ちゅうごくご', 'にほんご', 'かんこくご'], a: 2 },
      { q: '¿Dónde estudia María?', opts: ['だいがく', 'WeLearn', 'がっこう', 'うち'], a: 1 },
    ],
    glossary: [
      { word: 'たなか けんじ', rom: 'Tanaka Kenji', es: 'nombre japonés (apellido+nombre)' },
      { word: 'じょうずですね', rom: 'jouzu desu ne', es: '¡qué habilidad tienes! / ¡qué bien!' },
      { word: 'どこで', rom: 'doko de', es: '¿dónde? (lugar donde ocurre algo)' },
      { word: '〜ましたか', rom: '〜mashita ka', es: '¿___aste/ó? (pregunta en pasado)' },
    ],
  },
  {
    id: 2,
    title: 'レストランで',
    titleRom: 'Resutoran de',
    titleEs: 'En el restaurante',
    duration: '~40 seg',
    level: 'A1',
    topic: '___を ください · いくら · ありがとうございます',
    script: [
      { speaker: 'てんいん', text: 'いらっしゃいませ！おひとりですか？', rom: 'Irasshaimase! Ohitori desu ka?' },
      { speaker: 'きゃく', text: 'はい、ひとりです。', rom: 'Hai, hitori desu.' },
      { speaker: 'てんいん', text: 'こちらへ どうぞ。メニューです。', rom: 'Kochira e douzo. Menyuu desu.' },
      { speaker: 'きゃく', text: 'ありがとうございます。えーと... ラーメンを ひとつ ください。それから、みずも おねがいします。', rom: 'Arigatou gozaimasu. Eeto... raamen o hitotsu kudasai. Sorekara, mizu mo onegaishimasu.' },
      { speaker: 'てんいん', text: 'かしこまりました！しょうしょう おまちください。', rom: 'Kashikomarimashita! Shoushou omachi kudasai.' },
      { speaker: 'きゃく', text: 'すみません、おかいけい おねがいします。', rom: 'Sumimasen, okaikei onegaishimasu.' },
      { speaker: 'てんいん', text: 'せんにひゃく えんです。', rom: 'Sen nihyaku en desu.' },
    ],
    questions: [
      { q: '¿Cuántas personas son?', opts: ['1人', '2人', '3人', '4人'], a: 0 },
      { q: '¿Qué pidió el cliente?', opts: ['すしとみず', 'ラーメンとみず', 'てんぷらとおちゃ', 'ラーメンだけ'], a: 1 },
      { q: '¿Cuánto fue la cuenta?', opts: ['¥1000', '¥1100', '¥1200', '¥2000'], a: 2 },
    ],
    glossary: [
      { word: 'いらっしゃいませ', rom: 'irasshaimase', es: 'bienvenido/a (saludo formal en negocios)' },
      { word: 'ひとつ ください', rom: 'hitotsu kudasai', es: 'uno por favor (hitotsu=1 unidad nativa)' },
      { word: 'かしこまりました', rom: 'kashikomarimashita', es: 'entendido / a sus órdenes (muy formal)' },
      { word: 'おかいけい', rom: 'okaikei', es: 'la cuenta (会計 = pago/cuenta)' },
    ],
  },
  {
    id: 3,
    title: 'でんわで',
    titleRom: 'Denwa de',
    titleEs: 'Por teléfono',
    duration: '~35 seg',
    level: 'A1',
    topic: 'なんじ？ · あります/います · ___に いきますか',
    script: [
      { speaker: 'サラ', text: 'もしもし、けんたくん？', rom: 'Moshi moshi, Kenta-kun?' },
      { speaker: 'けんた', text: 'あ、サラちゃん！どうしたの？', rom: 'A, Sara-chan! Dou shita no?' },
      { speaker: 'サラ', text: 'ねえ、どようびに じかんある？こうえんに いかない？', rom: 'Nee, doyoubi ni jikan aru? Kouen ni ikanai?' },
      { speaker: 'けんた', text: 'どようびか... ごぜんは ちょっと... でも ごごは だいじょうぶだよ。なんじ？', rom: 'Doyoubi ka... Gozen wa chotto... Demo gogo wa daijoubu da yo. Nanji?' },
      { speaker: 'サラ', text: 'さんじは どう？えきのまえで あおうよ！', rom: 'Sanji wa dou? Eki no mae de aou yo!' },
      { speaker: 'けんた', text: 'いいね！じゃあ どようびに！', rom: 'Ii ne! Jaa doyoubi ni!' },
    ],
    questions: [
      { q: '¿Adónde quieren ir?', opts: ['えいがかん', 'レストラン', 'こうえん', 'えき'], a: 2 },
      { q: '¿Por qué Kenta no puede en la mañana?', opts: ['Tiene clase', 'Tiene que trabajar', 'Está ocupado (わからない)', 'Está enfermo'], a: 2 },
      { q: '¿Dónde se encuentran?', opts: ['こうえん', 'えきのまえ', 'さらのうち', 'レストラン'], a: 1 },
    ],
    glossary: [
      { word: 'もしもし', rom: 'moshi moshi', es: '¿aló? (contestar el teléfono en japonés)' },
      { word: 'じかん ある？', rom: 'jikan aru?', es: '¿tienes tiempo? (informal de ありますか)' },
      { word: 'ちょっと', rom: 'chotto', es: 'un poco / es un poco difícil (eufemismo de "no")' },
      { word: 'だいじょうぶ', rom: 'daijoubu', es: 'está bien / no hay problema' },
      { word: 'あおうよ！', rom: 'aou yo!', es: '¡nos vemos! / ¡juntémonos! (propuesta informal)' },
    ],
  },
];

export default function EscuchaJaponesA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 聞く · Escucha</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />聞く · Comprensión auditiva A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Comprensión auditiva A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>Audios en producción. Practica con los guiones en ひらがな・カタカナ + romaji.</p>

        <div style={{ marginBottom: '2rem', padding: '1rem 1.25rem', borderRadius: 14, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, display: 'flex', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>🎙️</span>
          <div>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>Cómo practicar sin audio</p>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.75 }}>
              <li>Lee el guión en ひらがな como si lo escucharas (pronuncia en voz alta).</li>
              <li>Usa el romaji como apoyo de pronunciación.</li>
              <li>Cubre el guión e intenta responder las preguntas.</li>
              <li>Usa el glosario para palabras desconocidas.</li>
            </ol>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EXERCISES.map(ex => (
            <div key={ex.id} className="wl-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, flexShrink: 0 }}>{ex.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.15rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>{ex.title}</h2>
                    <span style={{ fontSize: '0.78rem', color: COLOR, fontStyle: 'italic' }}>{ex.titleRom}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>— {ex.titleEs}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, background: `${COLOR}15`, borderRadius: 6, padding: '0.1rem 0.4rem' }}>{ex.level}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{ex.duration} · {ex.topic}</span>
                  </div>
                </div>
                <div style={{ padding: '0.5rem 0.85rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '0.78rem', color: 'var(--muted)', flexShrink: 0 }}>🎵 Audio próximamente</div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📄 台本 / Guión</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {ex.script.map((line, li) => (
                    <div key={li} style={{ padding: '0.6rem 0.9rem', borderRadius: 10, background: li % 2 === 0 ? `${COLOR}06` : 'var(--bg-2)', borderLeft: `3px solid ${li % 2 === 0 ? COLOR : '#6b7280'}` }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: li % 2 === 0 ? COLOR : '#6b7280', fontFamily: 'var(--mono)', marginBottom: '0.18rem' }}>{line.speaker}</div>
                      <p style={{ margin: '0 0 0.18rem', fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.6 }}>{line.text}</p>
                      <p style={{ margin: 0, fontSize: '0.76rem', color: COLOR, lineHeight: 1.5, fontStyle: 'italic' }}>{line.rom}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📖 語彙 · Glosario</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {ex.glossary.map(g => (
                    <div key={g.word} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{g.word}</span>
                      <span style={{ color: COLOR, fontSize: '0.73rem', fontStyle: 'italic' }}>({g.rom})</span>
                      <span style={{ color: 'var(--muted)' }}>— {g.es}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>❓ 問題 · Comprensión</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {ex.questions.map((q, qi) => (
                    <div key={qi} style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
                      <p style={{ margin: '0 0 0.45rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.9rem' }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {q.opts.map((opt, oi) => (
                          <span key={oi} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, background: oi === q.a ? 'rgba(5,150,105,0.1)' : 'var(--bg-2)', border: oi === q.a ? '1px solid #059669' : '1px solid var(--line-soft)', fontSize: '0.84rem', color: oi === q.a ? '#059669' : 'var(--ink)', fontWeight: oi === q.a ? 700 : 400 }}>
                            {opt} {oi === q.a && '✓'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
