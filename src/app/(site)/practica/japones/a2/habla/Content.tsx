'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; romaji: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: '私は～と思います。', romaji: 'Watashi wa ~ to omoimasu.', phonetic: '[wa-ta-shi wa ~ to o-moi-ma-su]', es: 'Creo que... / Pienso que...', note: 'La forma más natural para dar opiniones en japonés educado. El verbo de opinión siempre va AL FINAL de la oración. Versión informal: 「～と思う」(to omou). No confundir con ～と言います (decir).', category: 'Opiniones' },
  { id: 2, phrase: '～のほうが好きです。', romaji: '~ no hō ga suki desu.', phonetic: '[~ no hoo ga su-ki de-su]', es: 'Prefiero... / Me gusta más...', note: 'Para expresar preferencia entre dos cosas: 「猫より犬のほうが好きです」= Prefiero los perros a los gatos. La cosa preferida + のほうが. Informal: ～のほうが好き.', category: 'Opiniones' },
  { id: 3, phrase: '～はどうだと思いますか？', romaji: '~ wa dō da to omoimasu ka?', phonetic: '[~ wa doo da to o-moi-ma-su ka]', es: '¿Qué piensa/piensas de...?', note: 'Manera educada de pedir una opinión. Puedes sustituir どう (cómo/qué tal) por 何 (qué). Informal: 「～はどうだと思う？」Seguir con 「私は...と思います」para responder.', category: 'Opiniones' },
  { id: 4, phrase: 'もう一度おっしゃっていただけますか？', romaji: 'Mō ichido osshatte itadakemasu ka?', phonetic: '[moo i-chi-do o-sha-tte i-ta-da-ke-ma-su ka]', es: '¿Podría repetir, por favor? (formal)', note: 'Forma muy educada. おっしゃる = decir (keigo/lenguaje honorífico). Versión informal: 「もう一度言って」(Mō ichido itte). Puedes añadir 「すみません」(sumimasen) antes para suavizar.', category: 'Comprensión' },
  { id: 5, phrase: 'ゆっくり話してもらえますか？', romaji: 'Yukkuri hanashite moraemasu ka?', phonetic: '[yuk-ku-ri ha-na-shi-te mo-ra-e-ma-su ka]', es: '¿Podría hablar más despacio?', note: 'ゆっくり = despacio/lentamente. 話してもらえますか = ¿podría hablar? (te-form + もらえますか). Clave para principiantes — los japoneses apreciarán el esfuerzo por comunicarse.', category: 'Comprensión' },
  { id: 6, phrase: '～はどういう意味ですか？', romaji: '~ wa dō iu imi desu ka?', phonetic: '[~ wa doo i-u i-mi de-su ka]', es: '¿Qué significa...?', note: 'どういう意味 = qué significado. Puedes señalar la palabra o decirla. Alternativa: 「～って何ですか？」(informal, ¿qué es ~?). Extremadamente útil en conversación real.', category: 'Comprensión' },
  { id: 7, phrase: '～まではどうやって行けますか？', romaji: '~ made wa dō yatte ikemasu ka?', phonetic: '[~ ma-de wa doo ya-tte i-ke-ma-su ka]', es: '¿Cómo puedo llegar a...?', note: 'どうやって = ¿de qué manera/cómo? いけますか = ¿puedo ir? Se usa con estaciones, barrios, edificios. Alternativamente: 「～はどこですか？」(¿Dónde está ~?) para ubicaciones.', category: 'Viajes' },
  { id: 8, phrase: '～へのチケットをください。', romaji: '~ e no chiketto o kudasai.', phonetic: '[~ e no chi-ke-tto o ku-da-sa-i]', es: 'Deme un billete para..., por favor.', note: 'へ = partícula de dirección (hacia). チケット o 切符 (kippu) = billete/ticket. Para reservar: 「～を予約したいのですが」(Quería reservar ~). En taquillas y estaciones.', category: 'Viajes' },
  { id: 9, phrase: '部屋を予約したいのですが。', romaji: 'Heya o yoyaku shitai no desu ga.', phonetic: '[he-ya o yo-ya-ku shi-ta-i no de-su ga]', es: 'Quisiera reservar una habitación.', note: 'のですが al final suaviza la petición — muy educado. 予約する = reservar. Para número de noches: 「～泊お願いします」(~ haku onegai shimasu). ～泊 (~ noches) es el contador de noches.', category: 'Viajes' },
  { id: 10, phrase: '何時に開きますか / 閉まりますか？', romaji: 'Nanji ni akimasu ka / shimarimasu ka?', phonetic: '[nan-ji ni a-ki-ma-su ka / shi-ma-ri-ma-su ka]', es: '¿A qué hora abre / cierra?', note: '開く (aku) = abrir / 閉まる (shimaru) = cerrar. Para preguntar si está abierto ahora: 「今、開いていますか？」(Ima, aite imasu ka?). Imprescindible para museos, tiendas, restaurantes.', category: 'Viajes' },
  { id: 11, phrase: '～として約～年間働いています。', romaji: '~ toshite yaku ~-nen-kan hataraite imasu.', phonetic: '[~ to-shi-te ya-ku ~-nen-kan ha-ta-ra-i-te i-ma-su]', es: 'Trabajo como ~ desde hace aproximadamente ~ años.', note: 'として = como (función/rol). 約 (yaku) = aproximadamente. 年間 (nen-kan) = por ~ años. 働いています usa ～ています para estado continuo. Para meses: 約～ヶ月 (yaku ~ kagetsu).', category: 'Trabajo' },
  { id: 12, phrase: '～ことができます。', romaji: '~ koto ga dekimasu.', phonetic: '[~ ko-to ga de-ki-ma-su]', es: 'Sé / Puedo... (habilidad)', note: 'La estructura clave para expresar habilidades: diccionario + ことができます. Ejemplo: 「日本語を話すことができます」(puedo hablar japonés). Informal: ～できる. Negativo: ～ことができません.', category: 'Trabajo' },
  { id: 13, phrase: '私の担当は～です。', romaji: 'Watashi no tantō wa ~ desu.', phonetic: '[wa-ta-shi no tan-too wa ~ de-su]', es: 'Soy responsable de... / Mi área es...', note: '担当 (tantō) = responsabilidad/área a cargo. En entrevistas: 「主に～を担当しています」(principalmente me encargo de ~). 担当者 = persona responsable/encargado.', category: 'Trabajo' },
  { id: 14, phrase: '～より～のほうが～です。', romaji: '~ yori ~ no hō ga ~ desu.', phonetic: '[~ yo-ri ~ no hoo ga ~ de-su]', es: '... es más ... que ...', note: 'La estructura comparativa de superioridad: A より B のほうが + adjetivo. Ejemplo: 「東京より大阪のほうが安いです」(Osaka es más barato que Tokyo). Para superlativo: ～が一番 + adj (el/la más...).', category: 'Descripción' },
  { id: 15, phrase: '～は～と同じくらいです。', romaji: '~ wa ~ to onaji kurai desu.', phonetic: '[~ wa ~ to o-na-ji ku-ra-i de-su]', es: '... es tan ... como ...', note: 'Comparativo de igualdad: A は B と 同じくらい (igualmente). Para adjetivos: 「この映画はあの映画と同じくらい面白いです」. También: Aと同じです (es igual a A) para identidad total.', category: 'Descripción' },
  { id: 16, phrase: '～はどんな人ですか？', romaji: '~ wa donna hito desu ka?', phonetic: '[~ wa don-na hi-to de-su ka]', es: '¿Cómo es ~ ? (descripción de persona)', note: 'どんな = qué tipo de (descriptivo). Para cosas: どんな + sustantivo. Para pedir descripción física: 「どんな見た目ですか？」(¿Qué aspecto tiene?). Responder: 「～な人です」(Es una persona ~).', category: 'Descripción' },
  { id: 17, phrase: '子どもの頃、よく～ていました。', romaji: 'Kodomo no koro, yoku ~ te imashita.', phonetic: '[ko-do-mo no ko-ro, yo-ku ~ te i-ma-shi-ta]', es: 'De niño/a, solía... frecuentemente.', note: '子どもの頃 = cuando era niño/a. よく = frecuentemente/a menudo. ～ていました = estado/hábito pasado (imperfecto). Ejemplo: 「子どもの頃、よく公園で遊んでいました」(De niño, solía jugar en el parque).', category: 'Social' },
  { id: 18, phrase: 'お久しぶりですね！', romaji: 'Ohisashiburi desu ne!', phonetic: '[o-hi-sa-shi-bu-ri de-su ne]', es: '¡Cuánto tiempo sin verte!', note: 'Se usa cuando no has visto a alguien en mucho tiempo (semanas/meses). ね es partícula de búsqueda de acuerdo/confirmación. Respuesta natural: 「そうですね、お元気でしたか？」(Sí, ¿cómo ha estado?). Informal: 「久しぶり！」', category: 'Social' },
  { id: 19, phrase: '一緒に来ませんか？', romaji: 'Issho ni kimasen ka?', phonetic: '[is-sho ni ki-ma-sen ka]', es: '¿No quieres venir con nosotros?', note: 'Invitación educada usando la forma negativa (～ませんか) para suavizar. 一緒に = juntos. Alternativa más directa: 「一緒に来てください」(más imperativo). Para proponer: 「一緒に～しませんか？」(¿No hacemos ~ juntos?)', category: 'Social' },
  { id: 20, phrase: 'またいつか会いましょう！', romaji: 'Mata itsuka aimashō!', phonetic: '[ma-ta i-tsu-ka a-i-ma-shoo]', es: '¡Nos vemos algún día!', note: 'Despedida cálida pero indefinida. Más específico: 「また今度ね」(mata kondo ne = hasta la próxima) o 「また来週」(mata raishū = hasta la semana que viene). ～しましょう = vamos a ~ / ¡hagamos ~!', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Comprensión', 'Viajes', 'Trabajo', 'Descripción', 'Social'];

export default function HablaJaponesA2() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);

  function mark(id: number, val: boolean) {
    setPracticed(prev => {
      const next = new Set(prev);
      if (val) next.add(id); else next.delete(id);
      return next;
    });
  }

  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />話す (Hanasu) · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frases esenciales con romaji, pronunciación y contexto. Practica en voz alta y marca las que domines.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>
            {practiced.size}/{PHRASES.length} practicadas
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter === cat ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.8rem', ...(filter === cat ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem', fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎯 <strong style={{ color: 'var(--ink)' }}>Cómo practicar:</strong> Lee el romaji en silencio → dilo en voz alta 3 veces → si sale bien, marca ✓. Si no, déjalo sin marcar y vuelve después.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {shown.map(p => {
            const done = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{
                border: `1.5px solid ${done ? `${COLOR}44` : 'var(--line-soft)'}`,
                borderRadius: 16,
                background: done ? `${COLOR}06` : 'var(--bg)',
                overflow: 'hidden',
              }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: done ? COLOR : 'var(--line-soft)', color: done ? '#fff' : 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{p.id}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem', marginBottom: '0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.08rem' }}>{p.romaji}</div>
                    <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic', marginBottom: '0.12rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                    <button onClick={() => setExpanded(isExpanded ? null : p.id)}
                      style={{ fontSize: '0.72rem', padding: '0.2rem 0.55rem', borderRadius: 6, border: '1px solid var(--line-soft)', background: 'transparent', cursor: 'pointer', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
                      {isExpanded ? '▲ nota' : '▼ nota'}
                    </button>
                    <button onClick={() => mark(p.id, !done)}
                      style={{ fontSize: '0.82rem', padding: '0.3rem 0.75rem', borderRadius: 8, border: `1.5px solid ${done ? COLOR : 'var(--line-soft)'}`, background: done ? COLOR : 'transparent', color: done ? '#fff' : 'var(--muted)', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 700, transition: 'all 0.15s', whiteSpace: 'nowrap' }}>
                      {done ? '✓ Dominada' : 'Lo logré ✓'}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div style={{ padding: '0.7rem 1.25rem 0.85rem 4.5rem', borderTop: '1px solid var(--line-soft)', background: `${COLOR}04` }}>
                    <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Nota de uso y pronunciación</div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.55 }}>{p.note}</p>
                    <div style={{ marginTop: '0.4rem', display: 'inline-block', fontSize: '0.68rem', padding: '0.12rem 0.45rem', borderRadius: 5, background: `${COLOR}15`, color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{p.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size === PHRASES.length && (
          <div style={{ marginTop: '2rem', padding: '1.25rem 1.5rem', borderRadius: 16, background: `${COLOR}0a`, border: `2px solid ${COLOR}33`, textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 800, color: COLOR, fontSize: '1.1rem' }}>¡Completaste las 20 frases!</p>
            <p style={{ margin: '0.3rem 0 0', fontSize: '0.85rem', color: 'var(--muted)' }}>Úsalas en una conversación real — aplícalas en tu próxima clase con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
