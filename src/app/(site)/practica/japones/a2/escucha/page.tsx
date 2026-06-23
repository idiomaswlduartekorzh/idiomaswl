import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Japonés A2 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de japonés. Diálogos con voz nativa en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/japones/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: '空港で (Kūkō de — En el aeropuerto)',
    desc: 'Diálogo en el aeropuerto entre un viajero y el agente de check-in. Practica vocabulario de viajes y た-form (pasado) en japonés real.',
    script: '"おはようございます。マドリードへのフライトのチェックインをお願いします。(Ohayō gozaimasu. Madoriido e no furaito no chekku-in o onegai shimasu.) — かしこまりました。パスポートをお見せいただけますか？(Kashikomarimashita. Pasupōto o omisei itadakemasu ka?) — はい、どうぞ。(Hai, dōzo.) — ありがとうございます。お荷物はご自身でお詰めになりましたか？(Arigatō gozaimasu. Onimotsu wa gojishin de otsume ni narimashita ka?) — はい、自分で詰めました。(Hai, jibun de tsumemashita.) — 機内持ち込みに液体はありますか？(Kinai mochikomi ni ekitai wa arimasu ka?) — 水だけです。(Mizu dake desu.) — 窓側と通路側、どちらがよろしいですか？(Madogawa to tsūrogawa, dochira ga yoroshii desu ka?) — 窓側をお願いします。(Madogawa o onegai shimasu.) — かしこまりました。フライトは14時30分、C7番ゲートからです。良いご旅行を！(Kashikomarimashita. Furaito wa 14-ji 30-pun, C7-ban gēto kara desu. Yoi goryokō o!) — ありがとうございました。(Arigatō gozaimashita.)"',
    questions: ['¿A qué ciudad viaja el pasajero?', '¿Qué documento presenta?', '¿Él mismo hizo las maletas?', '¿Qué tipo de asiento prefiere?', '¿A qué hora sale el vuelo?', '¿De qué puerta sale?'],
    duration: '~55 seg', accent: 'Japonés estándar (Tokio)', wpm: 95,
  },
  {
    id: 2, title: '就職面接 (Shūshoku Mensetsu — Entrevista de trabajo)',
    desc: 'Entrevista de trabajo usando た-form (pasado) y ことができます (habilidades). Practica japonés formal y vocabulario profesional.',
    script: '"はじめまして。田中と申します。(Hajimemashite. Tanaka to mōshimasu.) — はじめまして。どうぞおかけください。(Hajimemashite. Dōzo okake kudasai.) — ありがとうございます。(Arigatō gozaimasu.) — 自己紹介をお願いします。(Jikoshōkai o onegai shimasu.) — はい。私は3年間マーケティング会社で働きました。日本語と英語を話すことができます。(Hai. Watashi wa 3-nenkan māketingu gaisha de hatarakimashita. Nihongo to eigo o hanasu koto ga dekimasu.) — なぜ弊社に応募したいと思いますか？(Naze heisha ni ōbo shitai to omoimasu ka?) — 御社は業界でとても革新的だと思います。もっと成長できると考えました。(Onsha wa gyōkai de totemo kakushinteki da to omoimasu. Motto seichō dekiru to kangaemashita.) — 一番大切にしていることは何ですか？(Ichiban taisetsu ni shite iru koto wa nan desu ka?) — チームワークとコミュニケーションです。(Chīmuwāku to komyunikēshon desu.)"',
    questions: ['¿Cuántos años trabajó en la empresa anterior?', '¿Qué idiomas puede hablar?', '¿Por qué quiere trabajar en esa empresa?', '¿Qué valora más en el trabajo?'],
    duration: '~55 seg', accent: 'Japonés formal (estándar)', wpm: 90,
  },
  {
    id: 3, title: '週末の計画 (Shūmatsu no Keikaku — Planes del fin de semana)',
    desc: 'Dos amigos planean el fin de semana usando たいです (querer) y ことができます (poder). Escucha japonés coloquial informal.',
    script: '"ねえ、今週末、何かしたい？(Nee, konshūmatsu, nanika shitai?) — そうだね。映画を見たいな。でも、どの映画がいいかな？(Sō da ne. Eiga o mitai na. Demo, dono eiga ga ii ka na?) — 新しいアニメ映画が公開されたよ。見ることができる？(Atarashii anime eiga ga kōkai sareta yo. Miru koto ga dekiru?) — うん、見たい！何時に会える？(Un, mitai! Nanji ni aeru?) — 午後2時はどう？その前にランチを食べたい。(Gogo 2-ji wa dō? Sono mae ni ranchi o tabetai.) — いいね！どこで食べたい？(Ii ne! Doko de tabetai?) — 駅の近くに新しいラーメン屋ができたよ。行ってみたい！(Eki no chikaku ni atarashii rāmen-ya ga dekita yo. Itte mitai!) — 最高！じゃあ、土曜日ね。(Saikō! Jā, doyōbi ne.)"',
    questions: ['¿Qué quieren hacer el fin de semana?', '¿A qué hora van a encontrarse?', '¿Qué quieren hacer antes de la película?', '¿Dónde quieren comer?', '¿Qué día van a encontrarse?'],
    duration: '~50 seg', accent: 'Japonés coloquial (Tokio)', wpm: 100,
  },
];

export default function EscuchaJaponesA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />聞く (Kiku) · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación. Los audios se grabarán con hablantes nativos japoneses. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts con romaji en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen た-form, たいです y ことができます.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Diálogo {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (texto que se grabará)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ja-JP" label="Escuchar script" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en japonés ahora?</strong> Practica la lectura en voz alta con los textos de{' '}
          <Link href="/practica/japones/a2/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura A2</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/japones/a2/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral A2</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
