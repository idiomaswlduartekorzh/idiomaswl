import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Japonés B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de japonés. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/japones/b1/escucha' },
};

const COLOR = '#bc002d';

const PLANNED = [
  {
    id: 1, title: '就職面接 (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo. Practica 受身形, 〜たら, keigo y vocabulario profesional B1.',
    script: '"こんにちは。どうぞ、お座りください。 — ありがとうございます。 — これまでのご経歴についてお聞かせください。 — はい。私はマーケティング分野で4年間働いておりまして、最近プロジェクト管理の資格を取得いたしました。 — チームを率いた経験はおありですか？ — はい。2年間、5名のチームを率いておりました。 — 現在の職場を離れたいとお考えの理由を教えていただけますか？ — 新しい挑戦を探しております。御社であれば、専門的に成長できる機会が与えられると思っております。 — 最初の3ヶ月間は何をされますか？ — チームの皆さんとの関係を築き、新しいコミュニケーション戦略を提案したいと考えております。 — 希望給与はどのくらいですか？ — 月給30万円程度を希望しております。 — 週末までにご連絡いたします。本日はありがとうございました。 — ありがとうございました。失礼いたします。"',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué certificación obtuvo recientemente?', '¿Ha liderado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~75 seg', accent: 'Japonés estándar (tokiota)', wpm: 95,
  },
  {
    id: 2, title: '環境問題について (Debate ambiental)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica 〜のに, 受身形, 〜たら y vocabulario medioambiental B1.',
    script: '"日本の洪水のニュース見た？毎年ひどくなってるよね。 — うん、本当に心配だよ。もし政府がもっと早く行動していたら、こんな状況にならなかったのに。 — 個人の行動って効果があると思う？ — あると思うけど、正直に言うと、企業が炭素排出量を減らしたら、個人の変化よりもずっと大きな影響があると思う。 — そうだね。私は公共交通機関を使ったり、プラスチックを買わないようにしたりしている。 — どんな行動も大切だけど、本当の変化は政策から来なければならないよ。もっと厳しい環境法が導入されなければならないと思う。 — そうだね。でも政府が行動するまでの間、私たちも自分にできることをしなければならない。 — もちろん。個人の責任と強い政府の行動、両方が必要だと思うよ。"',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~70 seg', accent: 'Japonés conversacional informal', wpm: 93,
  },
  {
    id: 3, title: '旅行の計画 (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a Kioto usando 〜たら, 〜と思う y vocabulario de viajes B1.',
    script: '"今年の夏、旅行に行きたいな。あなたは？ — 私も！京都はどう？ — いいね！今予約したら、航空券が安くなると思う。 — 嵐山と金閣寺を訪れたいな。宿泊はどんなところが好き？ — ホテルより旅館がいいと思う。安くて、本物の日本の雰囲気が感じられるから。 — 私もそう思う。そろそろ貯金を始めなければならないね。何日間考えてる？ — 10日間あれば十分だと思う。京都に5日間、奈良に5日間はどうかな。 — 完璧だね。7月に行ったら、天気がよくていいと思う。 — じゃあ、決まりだね！今週、航空券を予約するよ。"',
    questions: ['¿A qué ciudad quieren ir?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren ir?', '¿Quién reservará los billetes?'],
    duration: '~65 seg', accent: 'Japonés informal estándar', wpm: 95,
  },
];

export default function EscuchaJaponesB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />聴解練習 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos japoneses. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(188,0,45,0.08)`, border: `1px solid rgba(188,0,45,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen 受身形, 〜たら, 使役形 y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(188,0,45,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(188,0,45,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>会話 {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(188,0,45,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>スクリプト（録音用テキスト）</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(188,0,45,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ja-JP" label="会話を聴く" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(188,0,45,0.06)', border: '1px solid rgba(188,0,45,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en japonés ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/japones/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/japones/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
