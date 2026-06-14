'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase { id: number; phrase: string; translit: string; phonetic: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Привет!', translit: 'Privet!', phonetic: '[pri-VYET]', es: '¡Hola! (informal)', note: '"Привет" (privet) es informal, entre amigos. Para contextos formales: "Здравствуйте" (zdravstvuyte). La В aquí suena V.', category: 'Saludos' },
  { id: 2, phrase: 'Здравствуйте!', translit: 'Zdravstvuyte!', phonetic: '[ZDRAS-tvuy-tye]', es: '¡Buenos días / Hola! (formal)', note: 'La combinación "здр" es difícil: [zdr]. La В del medio se pronuncia muy débil o se omite: [ZDRAS-tvuy-tye]. Es el saludo formal universal.', category: 'Saludos' },
  { id: 3, phrase: 'Меня зовут ___', translit: 'Menya zovut ___', phonetic: '[mye-NYA za-VUT]', es: 'Me llamo ___', note: '"Меня зовут" literalmente = "a mí me llaman". Zovut es la forma "ellos llaman". Equivale exactamente al español "me llamo".', category: 'Presentación' },
  { id: 4, phrase: 'Я из Колумбии.', translit: 'Ya iz Kolumbii.', phonetic: '[ya iz ko-LUM-bii]', es: 'Soy de Colombia.', note: '"Я из" + país en genitivo. Я (ya) = yo; из (iz) = de (origen). "Из Колумбии" = de Colombia. El genitivo termina aquí en -ии.', category: 'Presentación' },
  { id: 5, phrase: 'Очень приятно!', translit: 'Ochen\' priyatno!', phonetic: '[O-chen\' pri-YAT-no]', es: '¡Mucho gusto!', note: '"Очень приятно" = muy agradable. Очень (ochen\') = muy. Приятно (priyatno) = agradable/placentero. El acento en priYATno.', category: 'Presentación' },
  { id: 6, phrase: 'Спасибо!', translit: 'Spasibo!', phonetic: '[spa-SI-ba]', es: '¡Gracias!', note: '"Спасибо" literalmente viene de "спаси Бог" (spasi Bog) = que Dios te salve. La O final se pronuncia [a] (reducción vocálica rusa). Много спасибо = muchas gracias.', category: 'Cortesía' },
  { id: 7, phrase: 'Пожалуйста!', translit: 'Pozhaluysta!', phonetic: '[pa-ZHA-lus-ta]', es: 'Por favor / De nada', note: '"Пожалуйста" es dual: antes del verbo = por favor. Respuesta a спасибо = de nada. La Й aquí es corta [y]. Acento: paZHAlysta.', category: 'Cortesía' },
  { id: 8, phrase: 'Я не понимаю.', translit: 'Ya ne ponimayu.', phonetic: '[ya nye pa-ni-MA-yu]', es: 'No entiendo.', note: '"Не" (nye) = no (negación). "Понимаю" (ponimayu) = entiendo (yo). НЕ + verbo = negación. Acento: poniMAyu.', category: 'Ayuda' },
  { id: 9, phrase: 'Повторите, пожалуйста.', translit: 'Povtorite, pozhaluysta.', phonetic: '[pav-ta-RI-tye pa-ZHA-lus-ta]', es: 'Repita, por favor.', note: '"Повторите" (povtorite) = repita (usted formal). Viene de повторить = repetir. Forma imperativa formal con -ите.', category: 'Ayuda' },
  { id: 10, phrase: 'Где туалет?', translit: 'Gde tualet?', phonetic: '[gdye tu-a-LYET]', es: '¿Dónde está el baño?', note: '"Где" (gde) = dónde. "Туалет" (tualet) = baño/toilet. ¡Cognado con el inglés! Гд se pronuncia como una sola sílaba [gd].', category: 'Supervivencia' },
  { id: 11, phrase: 'Сколько стоит?', translit: 'Skol\'ko stoit?', phonetic: '[SKOL\'-ka STO-it]', es: '¿Cuánto cuesta?', note: '"Сколько" (skol\'ko) = cuánto. "Стоит" (stoit) = cuesta (de стоить = costar). Pregunta universal de compras.', category: 'Supervivencia' },
  { id: 12, phrase: 'До свидания!', translit: 'Do svidaniya!', phonetic: '[da svi-DA-ni-ya]', es: '¡Hasta luego!', note: '"До свидания" = hasta la vista/reunión. До (do) = hasta. Свидание (svidaniye) = cita/reunión. Informal: "Пока!" (poka) = ¡chao!', category: 'Despedidas' },
  { id: 13, phrase: 'Как дела?', translit: 'Kak dela?', phonetic: '[kak dye-LA]', es: '¿Cómo estás? / ¿Cómo te va?', note: '"Как дела?" es la pregunta informal más común. Formal: "Как вы поживаете?" (kak vy pozhivayete). Дела (dela) = asuntos/negocios — literalmente "¿cómo van tus asuntos?". Acento en la última sílaba: de-LA.', category: 'Saludos' },
  { id: 14, phrase: 'Хорошо, спасибо!', translit: 'Khorosho, spasibo!', phonetic: '[kha-ra-SHO spa-SI-ba]', es: '¡Bien, gracias!', note: '"Хорошо" (khorosho) = bien/bueno. La х suena como J española. Alternativas: "Отлично!" (otlichno) = ¡excelente!, "Нормально" (normalno) = normal/bien, "Неплохо" (neplokho) = no mal.', category: 'Saludos' },
  { id: 15, phrase: 'Говорите медленнее, пожалуйста.', translit: 'Govorite medlennee, pozhaluysta.', phonetic: '[ga-va-RI-tye MYED-lye-nye-ye]', es: 'Habla más despacio, por favor.', note: '"Говорите" = hablen (imperativo formal usted). "Медленнее" (medlennee) = más despacio (comparativo de медленно). La doble Н se pronuncia larga. Alternativa: "Помедленнее, пожалуйста" (más corta y natural).', category: 'Ayuda' },
  { id: 16, phrase: 'Я хочу есть / пить.', translit: 'Ya khochu yest\' / pit\'.', phonetic: '[ya kha-CHOO yest\' / pit\']', es: 'Quiero comer / beber.', note: '"Я хочу" (ya khochu) = yo quiero (de хотеть = querer). "Есть" (yest\') = comer. "Пить" (pit\') = beber. El signo blando ь suaviza la consonante final. "Я хочу есть!" = ¡Tengo hambre! (lit. quiero comer).', category: 'Supervivencia' },
  { id: 17, phrase: 'Извините / Простите.', translit: 'Izvinite / Prostite.', phonetic: '[iz-vi-NI-tye] / [pras-TI-tye]', es: 'Perdón / Lo siento.', note: '"Извините" (izvinite) = disculpe (para interrumpir, pasar). "Простите" (prostite) = perdone (para errores más serios). Informal: "Извини" / "Прости" (sin -те). La И final se pronuncia [tye].', category: 'Cortesía' },
  { id: 18, phrase: 'Хорошо! / Ладно!', translit: 'Khorosho! / Ladno!', phonetic: '[kha-ra-SHO] / [LAD-na]', es: '¡Está bien! / ¡De acuerdo!', note: '"Хорошо" = bien/OK. "Ладно" (ladno) = de acuerdo, vale (más informal/coloquial). "Договорились" (dogovorilis\') = acordado/trato. Usar "хорошо" o "ладно" es perfecto para A1.', category: 'Cortesía' },
  { id: 19, phrase: 'Во сколько...?', translit: 'Vo skol\'ko...?', phonetic: '[va SKOL\'-ka]', es: '¿A qué hora...?', note: '"Во сколько" = ¿a qué hora? Ejemplo: "Во сколько открывается музей?" (¿A qué hora abre el museo?). Para decir la hora: "В час" (v chas) = a la una; "В два часа" = a las dos. В + время (tiempo).', category: 'Supervivencia' },
  { id: 20, phrase: 'Можно мне ___, пожалуйста?', translit: 'Mozhno mne ___, pozhaluysta?', phonetic: '[MOZH-na mnye]', es: '¿Me puede dar ___, por favor?', note: '"Можно мне" = ¿puedo tener? / ¿me puede dar?. Ejemplo: "Можно мне воду?" (¿me puede dar agua?). "Можно" es el equivalente ruso de "may I" — muy educado para pedir cosas en restaurantes y tiendas.', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaRusoA1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Разговор · Ruso A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Frases esenciales</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.5rem' }}>
          12 frases en cirílico + transliteración + pronunciación. Cada frase se muestra en los 3 sistemas: <strong style={{ color: 'var(--ink)' }}>Cirílico · Transliteración · Fonética</strong>.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem' }}>
          <div style={{ flex: 1, height: 7, background: 'var(--line-soft)', borderRadius: 4 }}>
            <div style={{ height: '100%', width: `${pct}%`, background: COLOR, borderRadius: 4, transition: 'width 0.5s' }} />
          </div>
          <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: pct === 100 ? COLOR : 'var(--muted)', flexShrink: 0 }}>{practiced.size}/{PHRASES.length} practicadas</span>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {shown.map(p => {
            const isPracticed = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border: `1.5px solid ${isPracticed ? `${COLOR}55` : 'var(--line-soft)'}`, borderRadius: 16, overflow: 'hidden', background: isPracticed ? `${COLOR}06` : 'var(--bg)' }}>
                <div style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'flex-start', gap: '1rem', cursor: 'pointer' }} onClick={() => setExpanded(isExpanded ? null : p.id)}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, textTransform: 'uppercase' }}>{p.category}</span>
                      {isPracticed && <span style={{ fontSize: '0.6rem', color: '#059669', fontWeight: 700 }}>✓ practicada</span>}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{p.phrase}</div>
                    <div style={{ fontSize: '0.82rem', color: '#cc0000', fontWeight: 700, marginBottom: '0.1rem' }}>{p.translit}</div>
                    <div style={{ fontSize: '0.75rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600, marginBottom: '0.15rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize: '0.84rem', color: 'var(--muted)' }}>{p.es}</div>
                  </div>
                  <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flexShrink: 0, marginTop: '0.25rem' }}>{isExpanded ? '▲' : '▼'}</span>
                </div>
                {isExpanded && (
                  <div style={{ padding: '0.85rem 1.25rem', borderTop: '1px solid var(--line-soft)', background: 'rgba(217,119,6,0.04)' }}>
                    <p style={{ margin: '0 0 0.85rem', fontSize: '0.84rem', color: 'var(--ink)', lineHeight: 1.65 }}>🗣️ {p.note}</p>
                    <button onClick={() => mark(p.id, !isPracticed)}
                      className={isPracticed ? 'btn btn-ghost btn-sm' : 'btn btn-sm'}
                      style={{ fontSize: '0.8rem', ...(isPracticed ? {} : { background: COLOR, borderColor: COLOR }) }}>
                      {isPracticed ? '↩ Desmarcar' : '✓ Marcar como practicada'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {pct === 100 && (
          <div style={{ marginTop: '1.75rem', padding: '1rem 1.25rem', borderRadius: 12, background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.25)', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.35rem' }}>🎉</div>
            <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)' }}>Отлично! Practicaste todas las frases.</p>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.84rem', color: 'var(--muted)' }}>Ya tienes las bases para una conversación A1 en ruso.</p>
          </div>
        )}
      </div>
    </section>
  );
}
