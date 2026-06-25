'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#bc002d';

interface WritingTask {
  id: number;
  title: string;
  titleJa: string;
  topic: string;
  prompt: string;
  model: string;
  modelRomaji: string;
  criteria: string[];
  vocab: string[];
  checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Carta a un amigo',
    titleJa: '友達へのメール',
    topic: '〜たら + 受身形',
    prompt: 'Escribe un correo electrónico informal a tu amigo/a japonés/a contando cómo pasaste las últimas vacaciones. Usa 〜たら para la secuencia temporal, 〜てよかった para expresar satisfacción y vocabulario de viajes B1.',
    model: '健太へ、こんにちは！先週、沖縄に行ってきたよ。初めて飛行機に乗ったら、とても興奮した！那覇に着いたら、すぐにホテルにチェックインして、荷物を置いてから散歩に出かけた。首里城に行ったら、思ったより大きくてびっくりした。二日目は海岸でシュノーケリングをしたよ。魚がたくさん見られて、本当に楽しかった。沖縄料理も食べてみたら、とてもおいしかった！特にゴーヤチャンプルーが好きになったよ。また行きたいな。元気でね。カルロスより',
    modelRomaji: 'Kenta he, konnichiwa! Senshū, Okinawa ni ittekita yo. Hajimete hikōki ni nottara, totemo kōfun shita! Naha ni tsuitara, sugu ni hoteru ni chekku-in shite, nimotsu o oite kara sanpo ni dekaketa. Shuri-jō ni ittara, omotta yori ōkakute bikkuri shita.',
    criteria: ['〜たら para secuencia temporal (mín. 3 veces)', '〜てよかった / 〜てよかったと思う', 'Registro informal (だ体 / 普通体)', 'Mínimo 100 palabras'],
    vocab: ['行ってきた — fui (y volví)', '興奮した — me emocioné', 'チェックイン — hacer check-in', 'シュノーケリング — snorkel', '〜てびっくりした — me sorprendió que ~', 'ゴーヤチャンプルー — plato típico okinawense'],
    checklist: ['¿Usé 〜たら para la secuencia de acciones?', '¿El tono es informal (だ体)?', '¿Expresé reacciones emocionales?', '¿El texto tiene mínimo 100 palabras?', '¿Mencioné actividades y comidas específicas?'],
  },
  {
    id: 2,
    title: 'Presentación personal',
    titleJa: '自己紹介文',
    topic: '〜ことができる + 〜ようになった',
    prompt: 'Escribe una presentación personal para un sitio web de intercambio de idiomas. Presenta quién eres, dónde vives, qué estudias/trabajas, tus aficiones y por qué quieres practicar japonés. Usa 〜ことができる para capacidades y 〜ようになった para cambios de habilidad.',
    model: 'はじめまして！私はコロンビア出身のマリアと申します。現在ボゴタに住んでいて、大学で日本語を専攻しています。趣味は料理と映画鑑賞です。日本のアニメを見ているうちに、日本語に興味を持つようになりました。今は日常会話ならある程度話せるようになりましたが、まだ敬語は難しいです。将来は日本で働くことができるようになりたいと思っています。そのために、日本人の友達を作って、もっと自然な表現を学びたいです。スペイン語を学びたい方は、ぜひ連絡してください！よろしくお願いします。',
    modelRomaji: 'Hajimemashite! Watashi wa Koronbia shussin no Maria to mōshimasu. Genzai Bogota ni sunde ite, daigaku de Nihongo o senkō shite imasu. Shumi wa ryōri to eiga-kanshō desu. Nihon no anime o mite iru uchi ni, Nihongo ni kyōmi o motsu yō ni narimashita.',
    criteria: ['〜ことができる para capacidades', '〜ようになった para cambios aprendidos', 'Registro formal (です・ます体)', 'Mínimo 100 palabras'],
    vocab: ['〜と申します — me llamo ~ (keigo)', '〜を専攻する — especializarse en ~', '映画鑑賞 — disfrutar de películas', '〜ているうちに — mientras ~aba/con el tiempo', 'ある程度 — hasta cierto punto', '敬語 — lenguaje honorífico'],
    checklist: ['¿Usé 〜ことができる para habilidades?', '¿Usé 〜ようになった para cambios?', '¿El registro es formal (です・ます体)?', '¿El texto tiene mínimo 100 palabras?', '¿Expliqué por qué quiero practicar japonés?'],
  },
  {
    id: 3,
    title: 'Mi ciudad favorita',
    titleJa: '私のお気に入りの都市',
    topic: '〜より〜の方が + 〜のに',
    prompt: 'Escribe un artículo corto para un blog de viajes describiendo tu ciudad favorita. Compara esa ciudad con otra usando 〜より〜の方が para comparaciones. Usa 〜のに para contraste y て形 + いる para describir estados actuales.',
    model: '私が一番好きな都市はカルタヘナです。コロンビアの北部にあるカリブ海沿岸の街で、美しい植民地建築で有名です。カルタヘナはボゴタより気温がずっと高いのに、過ごしやすい感じがします。街の雰囲気はボゴタよりずっと明るくてカラフルです。旧市街はユネスコの世界遺産に指定されていて、カラフルな家々と古い城壁が残っています。海もあるので、泳ぐこともできます。ボゴタより観光客が多いのに、なぜか落ち着いた雰囲気があります。本物のラテンアメリカを感じたい方は、ぜひカルタヘナを訪れてみてください！',
    modelRomaji: 'Watashi ga ichiban suki na toshi wa Karutahena desu. Koronbia no hokubu ni aru Karibekai engan no machi de, utsukushii shokuminchi kenchiku de yūmei desu. Karutahena wa Bogota yori kion ga zutto takai no ni, sugoshiyasui kanji ga shimasu.',
    criteria: ['Mínimo 3 comparaciones con 〜より〜の方が o 〜よりずっと', '〜のに para contraste (mín. 2)', 'て形+いる para estados actuales', 'Mínimo 120 palabras'],
    vocab: ['沿岸 — costa/litoral', '植民地建築 — arquitectura colonial', '旧市街 — casco antiguo', '城壁 — muralla', '〜に指定されている — estar designado como ~', 'なぜか — por alguna razón'],
    checklist: ['¿Usé 〜より para comparaciones?', '¿Usé 〜のに para contrastar?', '¿Describí características específicas de la ciudad?', '¿El texto tiene mínimo 120 palabras?', '¿Recomendé la ciudad al lector?'],
  },
  {
    id: 4,
    title: 'Planes de verano',
    titleJa: '夏の計画',
    topic: '〜つもりだ + 〜たらいいな',
    prompt: 'Escribe un texto sobre tus planes para el próximo verano. Describe qué harás (〜つもりだ / 〜予定だ), qué te gustaría hacer idealmente (〜たらいいな / 〜といいな) y qué harías si tuvieras más dinero o tiempo (〜ば〜のに).',
    model: '今年の夏は東南アジアをバックパックで旅するつもりです。まずタイに2週間滞在する予定です。バンコクで始めて、チェンマイまで電車で移動するつもりです。もしもっとお金があれば、ベトナムにも行けるのに、今回は難しそうです。時間がもっとあったら、カンボジアのアンコールワットも見たらいいなと思っています。現地の食べ物もたくさん食べるつもりで、新しい友達もたくさん作りたいです。この夏が素晴らしい経験になったらいいなと思っています。楽しみです！',
    modelRomaji: 'Kotoshi no natsu wa Tōnan-Ajia o bakkupakku de tabi suru tsumori desu. Mazu Tai ni 2-shūkan taizai suru yotei desu. Bangkok de hajimete, Chiang Mai made densha de idō suru tsumori desu. Moshimo motto okane ga areba, Betonamu ni mo ikeru no ni, konkai wa muzukashisō desu.',
    criteria: ['〜つもりだ para intenciones concretas', '〜たらいいな para deseos', '〜ば〜のに para condicional irreal', 'Mínimo 120 palabras'],
    vocab: ['バックパック — mochila', '滞在する — alojarse/quedarse', '移動する — desplazarse', '現地 — lugar/local', '素晴らしい経験 — experiencia maravillosa', '楽しみです — estoy emocionado/a'],
    checklist: ['¿Usé 〜つもりだ para planes?', '¿Usé 〜たらいいな para deseos?', '¿Usé 〜ば〜のに para lo irreal?', '¿El texto tiene mínimo 120 palabras?', '¿Distinguí entre planes concretos y deseos?'],
  },
  {
    id: 5,
    title: 'Mi rutina diaria',
    titleJa: '私の日課',
    topic: '〜てから + 〜ながら',
    prompt: 'Describe tu rutina diaria típica en un día de trabajo o estudio. Usa 〜てから (después de ~) para la secuencia temporal y 〜ながら (mientras ~) para actividades simultáneas. Explica también por qué es importante esta rutina para ti. Mínimo 5 actividades.',
    model: '私の一日は午前7時から始まります。まず起きてから、ストレッチを15分します。シャワーを浴びてから、朝ごはんを食べます。朝ごはんを食べながら、ニュースをチェックします。家を出る前に、その日にやることをメモします。電車に乗りながら、日本語の単語を覚えます。仕事が終わってから、30分ジョギングをします。夕ごはんを食べてから、本を読んだりドラマを見たりします。寝る前に、翌日の準備をします。このルーティンのおかげで、毎日充実した時間を過ごせています。',
    modelRomaji: 'Watashi no ichinichi wa gozen 7-ji kara hajimarimasu. Mazu okite kara, sutorecchi o 15-fun shimasu. Shawā o abite kara, asagohan o tabemasu. Asagohan o tabenagara, nyūsu o chekku shimasu. Ie o deru mae ni, sono hi ni yaru koto o memo shimasu.',
    criteria: ['Mínimo 4 usos de 〜てから', 'Mínimo 2 usos de 〜ながら', 'Secuencia temporal clara', 'Mínimo 120 palabras'],
    vocab: ['起きてから — después de levantarse', 'ストレッチ — estiramientos', 'シャワーを浴びる — ducharse', '単語を覚える — memorizar palabras', '充実した — productivo/lleno', 'ルーティン — rutina'],
    checklist: ['¿Usé 〜てから al menos 4 veces?', '¿Usé 〜ながら al menos 2 veces?', '¿La rutina tiene un orden temporal lógico?', '¿El texto tiene mínimo 120 palabras?', '¿Expliqué el beneficio de la rutina?'],
  },
];

export default function EscrituraJaponesB1() {
  const [active, setActive] = useState(0);
  const [showRomaji, setShowRomaji] = useState(false);
  const task = TASKS[active];

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />書く練習 · Japonés B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          5 tareas de escritura guiada B1. Cada tarea incluye consigna, modelo con romaji y lista de verificación.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', borderRadius: 20, border: `1.5px solid ${active === i ? COLOR : 'var(--line-soft)'}`, background: active === i ? COLOR : 'transparent', color: active === i ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.id}. {t.title}
            </button>
          ))}
        </div>

        <div style={{ border: `1.5px solid rgba(188,0,45,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', background: `rgba(188,0,45,0.04)` }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>{task.titleJa}</span>
              <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(188,0,45,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{task.topic}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{task.prompt}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Modelo de respuesta</div>
              <button onClick={() => setShowRomaji(v => !v)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
                {showRomaji ? '▲ Ocultar romaji' : '▼ Ver romaji'}
              </button>
            </div>
            <div style={{ background: 'rgba(188,0,45,0.03)', borderRadius: 10, padding: '1rem 1.1rem', borderLeft: `3px solid rgba(188,0,45,0.3)`, marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
              {showRomaji && (
                <p style={{ margin: '0.6rem 0 0', fontSize: '0.78rem', color: '#059669', lineHeight: 1.65, fontFamily: 'var(--mono)' }}>{task.modelRomaji}</p>
              )}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Vocabulario clave</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.1rem' }}>
              {task.vocab.map((v, i) => (
                <span key={i} style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem', borderRadius: 8, background: 'rgba(188,0,45,0.07)', color: COLOR, fontWeight: 600 }}>{v}</span>
              ))}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criterios de evaluación</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem' }}>
              {task.criteria.map((c, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>{c}</li>
              ))}
            </ul>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Lista de verificación</div>
            {task.checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                <span style={{ color: COLOR, fontSize: '0.85rem', marginTop: 1 }}>□</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(188,0,45,0.06)', border: '1px solid rgba(188,0,45,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Practica el vocabulario en{' '}
          <Link href="/practica/japones/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o la gramática en{' '}
          <Link href="/practica/japones/b1/gramatica" style={{ color: COLOR, fontWeight: 700 }}>Gramática B1</Link>.
        </div>
      </div>
    </section>
  );
}
