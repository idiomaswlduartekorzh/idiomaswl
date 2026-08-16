'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface Question { q: string; opts: string[]; ans: number; }
interface Text {
  id: number;
  title: string;
  titleJa: string;
  genre: string;
  level: string;
  text: string;
  textRomaji: string;
  questions: Question[];
}

const TEXTS: Text[] = [
  {
    id: 1,
    title: 'Un viaje a Kioto',
    titleJa: '京都への旅',
    genre: 'Blog personal',
    level: 'B1',
    text: '先月、友達と一緒に京都に行ってきました。京都は日本の古都として知られており、たくさんの寺院や神社があります。新幹線で大阪から約15分で到着できます。最初の日は金閣寺と嵐山に行きました。金閣寺は池に映る姿が美しく、嵐山では竹林の中を歩くことができました。二日目には伏見稲荷大社に行き、千本鳥居の中を歩きました。思ったより長い道のりでしたが、とても印象的でした。夜は京料理を食べました。京料理は見た目が美しく、味も繊細でした。次に来るときは、春に桜を見ながら散歩したいと思っています。京都は何度訪れても発見があると感じました。',
    textRomaji: 'Sengetsu, tomodachi to isshoni Kyōto ni ittekimashita. Kyōto wa Nihon no koto toshite shirarete ori, takusan no jiin ya jinja ga arimasu. Shinkansen de Ōsaka kara yaku 15-pun de tōchaku dekimasu.',
    questions: [
      { q: '京都はどんな都市として知られていますか？', opts: ['日本の最大都市', '日本の古都', '日本の港町', '日本の工業都市'], ans: 1 },
      { q: '大阪から京都まで新幹線でどのくらいかかりますか？', opts: ['約5分', '約15分', '約30分', '約1時間'], ans: 1 },
      { q: '最初の日に行った場所はどこですか？', opts: ['伏見稲荷大社と京都駅', '金閣寺と嵐山', '清水寺と二条城', '銀閣寺と平安神宮'], ans: 1 },
      { q: '嵐山でできたことは何ですか？', opts: ['温泉に入ること', '竹林の中を歩くこと', '舟に乗ること', '映画を見ること'], ans: 1 },
      { q: '京料理についての説明として正しいものはどれですか？', opts: ['辛くておいしい', '見た目が美しく味が繊細', '量が多くてボリュームがある', '値段が安くて気軽に食べられる'], ans: 1 },
      { q: '次に京都に来るときは何をしたいですか？', opts: ['秋の紅葉を見る', '春に桜を見ながら散歩する', '冬の雪景色を楽しむ', '夏の祭りに参加する'], ans: 1 },
    ],
  },
  {
    id: 2,
    title: 'La importancia del descanso',
    titleJa: '休息の大切さ',
    genre: 'Artículo de salud',
    level: 'B1',
    text: '現代社会では、多くの人が仕事や勉強に忙しく、十分な休息を取れていないという問題があります。しかし、適切な休息は心身の健康を維持するために非常に重要です。睡眠不足になると、集中力が低下し、判断力も弱まります。研究によれば、成人に必要な睡眠時間は7〜8時間だと言われています。また、休日に趣味の活動や運動をすることも、ストレスを解消するために効果的です。仕事や勉強の合間に短い休憩を取ることも大切です。5〜10分の休憩でも、疲れを回復させる効果があります。「休むこと」を怠慢だと思わずに、パフォーマンスを向上させるための投資と考えることが必要です。',
    textRomaji: 'Gendai shakai de wa, ōku no hito ga shigoto ya benkyō ni isogashiku, jūbun na kyūsoku o torenai to iu mondai ga arimasu. Shikashi, tekisetsu na kyūsoku wa shinshin no kenkō o iji suru tame ni hijō ni jūyō desu.',
    questions: [
      { q: '現代社会の問題として挙げられているのは何ですか？', opts: ['運動不足', '十分な休息が取れていない', '食事の質の低下', '対人関係の問題'], ans: 1 },
      { q: '睡眠不足になると何が起こりますか？', opts: ['食欲が増す', '集中力が低下する', '体重が増える', '免疫力が高まる'], ans: 1 },
      { q: '成人に必要な睡眠時間はどのくらいですか？', opts: ['5〜6時間', '6〜7時間', '7〜8時間', '9〜10時間'], ans: 2 },
      { q: 'ストレスを解消するために効果的なことは何ですか？', opts: ['長時間の睡眠', '趣味の活動や運動', '仕事の量を増やすこと', 'テレビを長時間見ること'], ans: 1 },
      { q: '仕事の合間の休憩について、何分が効果的だと書かれていますか？', opts: ['1〜2分', '5〜10分', '30分', '1時間'], ans: 1 },
      { q: '「休むこと」についての著者の考えはどれですか？', opts: ['怠慢なので避けるべき', 'パフォーマンス向上への投資', '贅沢なので制限が必要', '特別な人のみに許されること'], ans: 1 },
    ],
  },
  {
    id: 3,
    title: 'El sistema de trenes en Japón',
    titleJa: '日本の鉄道システム',
    genre: 'Texto informativo',
    level: 'B1',
    text: '日本の鉄道システムは、世界で最も発達した交通機関の一つとして高く評価されています。新幹線は最速で時速320キロメートルに達し、東京から大阪まで約2時間半で結んでいます。都市部では地下鉄と在来線が複雑に連結しており、一枚のICカードでほぼすべての交通機関を利用できます。日本の列車は時間に非常に正確であり、数分の遅延でも車内アナウンスで謝罪するほどです。外国人旅行者向けには、JRパスという特別な乗り放題切符があり、一定期間内に好きなだけ乗車できます。また、駅には多言語対応のサービスが整っており、英語や中国語の案内も充実しています。',
    textRomaji: 'Nihon no tetsudō shisutemu wa, sekai de mottomo hattatsu shita kōtsū kikan no hitotsu toshite takaku hyōka sarete imasu. Shinkansen wa saisoku de jisoku 320 kirometoru ni tasshi, Tōkyō kara Ōsaka made yaku 2-jikan han de musunde imasu.',
    questions: [
      { q: '新幹線の最高速度はどのくらいですか？', opts: ['時速200km', '時速280km', '時速320km', '時速400km'], ans: 2 },
      { q: '東京から大阪まで新幹線でどのくらいかかりますか？', opts: ['約1時間', '約2時間半', '約3時間', '約4時間'], ans: 1 },
      { q: 'ICカードで何ができますか？', opts: ['新幹線だけ乗れる', 'ほぼすべての交通機関が使える', '地下鉄だけ乗れる', 'バスだけ使える'], ans: 1 },
      { q: '日本の列車の時間について何が言われていますか？', opts: ['しばしば遅延する', '非常に正確', '予定通りには来ない', '遅延しても謝罪しない'], ans: 1 },
      { q: 'JRパスとは何ですか？', opts: ['学生向けの割引カード', '一定期間乗り放題の切符', '新幹線専用の切符', '年間パスポート'], ans: 1 },
      { q: '外国人向けのサービスとして何が挙げられていますか？', opts: ['無料の通訳サービス', '多言語対応と英語・中国語案内', '特別な外国人専用車両', '外国語のガイドブック配布'], ans: 1 },
    ],
  },
  {
    id: 4,
    title: 'El trabajo desde casa',
    titleJa: 'テレワークの現実',
    genre: 'Artículo de opinión',
    level: 'B1',
    text: 'コロナ禍をきっかけに、日本でもテレワーク（在宅勤務）が急速に普及しました。テレワークには通勤時間が不要なため、時間を有効に使えるというメリットがあります。また、家族と過ごす時間が増えたと感じる人も多いようです。一方で、テレワークにはデメリットもあります。職場の同僚とのコミュニケーションが取りにくくなり、孤独感を感じる人もいます。また、仕事と私生活の境界線が曖昧になり、仕事時間が長くなりがちです。これを防ぐために、仕事開始・終了の時間を決めることが大切です。テレワークが向いている人と向いていない人がいるため、個人の性格や職種によって柔軟に対応することが重要です。',
    textRomaji: 'Korona-ka o kikkake ni, Nihon de mo terawāku (zaifuku kinmu) ga kyūsoku ni fukyū shimashita. Terawāku ni wa tsūkin jikan ga fuyō na tame, jikan o yūkō ni tsukaeru to iu meritto ga arimasu.',
    questions: [
      { q: 'テレワークが普及したきっかけは何ですか？', opts: ['技術の発展', 'コロナ禍', '交通渋滞の増加', '電力不足'], ans: 1 },
      { q: 'テレワークのメリットとして挙げられているのは？', opts: ['給料が上がる', '通勤時間が不要', '運動する機会が増える', '新しい技術が学べる'], ans: 1 },
      { q: 'テレワークのデメリットとして挙げられているのは？', opts: ['経費の増加', '同僚とのコミュニケーション低下', '電気代が安くなる', '仕事の量が減る'], ans: 1 },
      { q: 'テレワークで仕事時間が長くなる理由は何ですか？', opts: ['休憩時間が少ない', '仕事と私生活の境界が曖昧', 'インターネットが遅い', '上司からの監視が少ない'], ans: 1 },
      { q: '長時間労働を防ぐためのアドバイスは何ですか？', opts: ['毎日運動する', '仕事の開始・終了時間を決める', '休日も仕事する', '職場に戻る'], ans: 1 },
      { q: 'テレワークについての著者の結論は何ですか？', opts: ['全員にテレワークを推奨', '個人と職種に応じて柔軟に対応', 'テレワークは廃止すべき', 'テレワークは大企業のみ'], ans: 1 },
    ],
  },
  {
    id: 5,
    title: 'La cocina japonesa en el mundo',
    titleJa: '世界に広がる和食',
    genre: 'Artículo cultural',
    level: 'B1',
    text: '和食は2013年にユネスコ無形文化遺産に登録され、世界中でその価値が認められています。日本食レストランは現在、世界に約16万店あり、特にアメリカやフランスで人気が高いです。寿司や刺身、天ぷら、ラーメンなどが世界中で親しまれています。和食の特徴の一つは「うまみ」と呼ばれる第五の味覚で、だし文化を中心に発展してきました。また、旬の食材を大切にし、食材の自然の味を生かす調理法が重視されています。健康面でも、和食は低カロリーで栄養バランスが良いとして注目されています。ただし、海外で食べられている「日本食」の中には、現地の文化に合わせてアレンジされたものも多く、本格的な和食とは異なる場合もあります。',
    textRomaji: 'Washoku wa 2013-nen ni Yunesuko mukei bunka isan ni tōroku sare, sekai-jū de sono kachi ga mitomerarete imasu. Nihon shoku resutoran wa genzai, sekai ni yaku 16-man-ten ari, toku ni Amerika ya Furansu de ninki ga takai desu.',
    questions: [
      { q: '和食がユネスコに登録されたのはいつですか？', opts: ['2010年', '2013年', '2015年', '2018年'], ans: 1 },
      { q: '世界に日本食レストランはいくつありますか？', opts: ['約5万店', '約10万店', '約16万店', '約20万店'], ans: 2 },
      { q: '和食の「うまみ」とは何ですか？', opts: ['第三の味覚', '第四の味覚', '第五の味覚', '第六の味覚'], ans: 2 },
      { q: '和食の調理の特徴として挙げられているのは？', opts: ['強い香辛料を使う', '食材の自然の味を生かす', '火を使わない', '外国の調理法を取り入れる'], ans: 1 },
      { q: '健康面での和食の特徴は何ですか？', opts: ['高タンパク・高脂質', '低カロリーで栄養バランスが良い', '食物繊維が少ない', '塩分が低い'], ans: 1 },
      { q: '海外の「日本食」について、著者が指摘していることは何ですか？', opts: ['すべて本格的な和食', '現地文化に合わせてアレンジされたものもある', '品質が低い', '値段が高すぎる'], ans: 1 },
    ],
  },
];

export default function LecturaJaponesB1() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [checked, setChecked] = useState(false);
  const [showRomaji, setShowRomaji] = useState(false);
  const text = TEXTS[activeIdx];

  function answer(qIdx: number, opt: number) {
    if (checked) return;
    setAnswers(prev => ({ ...prev, [`${activeIdx}-${qIdx}`]: opt }));
  }

  function checkAnswers() { setChecked(true); }

  function reset() {
    setChecked(false);
    setAnswers({});
  }

  const score = checked ? text.questions.filter((q, i) => answers[`${activeIdx}-${i}`] === q.ans).length : null;

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lectura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />読解練習 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          5 textos B1 en japonés (120-150 palabras cada uno) con 6 preguntas de comprensión. Incluye romaji opcional.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => { setActiveIdx(i); reset(); }} style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', borderRadius: 20, border: `1.5px solid ${activeIdx === i ? COLOR : 'var(--line-soft)'}`, background: activeIdx === i ? COLOR : 'transparent', color: activeIdx === i ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.id}. {t.title}
            </button>
          ))}
        </div>

        <div style={{ border: `1.5px solid rgba(188,0,45,0.2)`, borderRadius: 18, overflow: 'hidden', marginBottom: '1.5rem' }}>
          <div style={{ padding: '1rem 1.5rem', background: `rgba(188,0,45,0.04)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div>
              <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{text.titleJa}</span>
              <span style={{ marginLeft: '0.6rem', fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{text.genre} · {text.level}</span>
            </div>
            <button onClick={() => setShowRomaji(v => !v)} style={{ fontSize: '0.72rem', padding: '0.25rem 0.65rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
              {showRomaji ? '▲ Ocultar romaji' : '▼ Ver romaji'}
            </button>
          </div>
          <div style={{ padding: '1.25rem 1.5rem' }}>
            <p style={{ margin: 0, fontSize: '0.93rem', color: 'var(--ink)', lineHeight: 1.85 }}>{text.text}</p>
            {showRomaji && (
              <p style={{ margin: '0.8rem 0 0', fontSize: '0.78rem', color: 'var(--wl-on-panel-ok, #059669)', lineHeight: 1.7, fontFamily: 'var(--mono)', borderTop: '1px solid var(--line-soft)', paddingTop: '0.75rem' }}>{text.textRomaji}</p>
            )}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem' }}>
          {text.questions.map((q, qi) => {
            const sel = answers[`${activeIdx}-${qi}`];
            return (
              <div key={qi} style={{ border: '1.5px solid var(--line-soft)', borderRadius: 14, padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--ink)', marginBottom: '0.6rem' }}>{qi + 1}. {q.q}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    let bg = 'transparent'; let border = 'var(--line-soft)'; let col = 'var(--muted)';
                    if (checked) {
                      if (oi === q.ans) { bg = 'rgba(5,150,105,0.1)'; border = '#059669'; col = '#059669'; }
                      else if (sel === oi) { bg = 'rgba(220,38,38,0.1)'; border = '#dc2626'; col = '#dc2626'; }
                    } else if (sel === oi) { bg = 'rgba(188,0,45,0.1)'; border = COLOR; col = COLOR; }
                    return (
                      <button key={oi} onClick={() => answer(qi, oi)} style={{ textAlign: 'left', padding: '0.5rem 0.85rem', borderRadius: 9, border: `1.5px solid ${border}`, background: bg, color: col, fontSize: '0.84rem', cursor: checked ? 'default' : 'pointer', fontWeight: sel === oi ? 600 : 400, transition: 'all 0.15s' }}>
                        {String.fromCharCode(65 + oi)}. {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {!checked ? (
          <button onClick={checkAnswers} disabled={Object.keys(answers).filter(k => k.startsWith(`${activeIdx}-`)).length < text.questions.length} style={{ padding: '0.65rem 1.5rem', borderRadius: 12, background: COLOR, color: '#fff', border: 'none', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer', opacity: Object.keys(answers).filter(k => k.startsWith(`${activeIdx}-`)).length < text.questions.length ? 0.5 : 1 }}>
            Comprobar respuestas
          </button>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ padding: '0.75rem 1.25rem', borderRadius: 12, background: score! >= 4 ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', border: `1.5px solid ${score! >= 4 ? '#059669' : '#dc2626'}`, fontWeight: 700, color: score! >= 4 ? '#059669' : '#dc2626', fontSize: '0.95rem' }}>
              {score}/{text.questions.length} correctas {score! >= 5 ? '🎉' : score! >= 3 ? '👍' : '📚'}
            </div>
            <button onClick={reset} style={{ padding: '0.65rem 1.2rem', borderRadius: 12, border: `1.5px solid ${COLOR}`, background: 'transparent', color: COLOR, fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>
              Reintentar
            </button>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(188,0,45,0.06)', border: '1px solid rgba(188,0,45,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Trabaja el vocabulario en{' '}
          <Link href="/practica/japones/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o la gramática en{' '}
          <Link href="/practica/japones/b1/gramatica" style={{ color: COLOR, fontWeight: 700 }}>Gramática B1</Link>.
        </div>
      </div>
    </section>
  );
}
