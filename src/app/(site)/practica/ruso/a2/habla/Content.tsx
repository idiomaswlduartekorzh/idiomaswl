'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#d97706';

interface Phrase {
  id: number; phrase: string; translit: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'По-моему, ...', translit: 'Po-moyemu, ...', phonetic: '[po-MO-ye-mu]', es: 'En mi opinión, ... / A mi modo de ver,...', note: 'Literalmente: "a mi manera". Se coloca al inicio de la oración para suavizar una opinión. Alternativas: "Я думаю, что..." (Ya dumayu, chto — Creo que...) / "Мне кажется..." (Mne kazhetsya — Me parece que...). Тón conversacional natural.', category: 'Opiniones' },
  { id: 2, phrase: 'Я согласен / Я не согласна.', translit: 'Ya soglasen / Ya ne soglasna.', phonetic: '[ya sog-LA-sen / ya ne sog-LAS-na]', es: 'Estoy de acuerdo / No estoy de acuerdo.', note: 'Согласен = masculino; согласна = femenino. Acuerdo parcial: "Я частично согласен, но..." (Ya chastichno soglasen, no — Estoy parcialmente de acuerdo, pero...). Para preguntar: "Вы согласны?" (¿Está de acuerdo?)', category: 'Opiniones' },
  { id: 3, phrase: 'Как вы думаете о...?', translit: 'Kak vy dumayete o...?', phonetic: '[kak vy DU-ma-ye-te o]', es: '¿Qué piensa usted sobre...?', note: 'Formal (вы = usted/ustedes). Informal: "Как ты думаешь о...?" (Kak ty dumayesh o?). Alternativa directa: "Что вы думаете о...?" (¿Qué piensa de...?). La preposición О + prepositivo para temas abstractos.', category: 'Opiniones' },
  { id: 4, phrase: 'Повторите, пожалуйста.', translit: 'Povtorite, pozhaluysta.', phonetic: '[pov-to-RI-te, po-ZHA-luy-sta]', es: 'Repita, por favor. (formal)', note: 'Повторите = imperativo formal de повторять (repetir). Informal: "Повтори, пожалуйста." Para pedir que digan algo de nuevo por no haber entendido: también "Простите?" (¿Perdón?) o "Что?" (¿Qué?) en contexto informal.', category: 'Comprensión' },
  { id: 5, phrase: 'Говорите медленнее, пожалуйста.', translit: 'Govorite medlenneye, pozhaluysta.', phonetic: '[go-vo-RI-te MED-len-eye-ye, po-ZHA-luy-sta]', es: '¿Podría hablar más despacio?', note: 'Медленнее = comparativo de медленно (despacio). Informal: "Говори медленнее." También útil: "Я плохо понимаю по-русски" (ya plokho ponimayu po-russki — Entiendo poco ruso) para contextualizar. Los rusos lo apreciarán.', category: 'Comprensión' },
  { id: 6, phrase: 'Что значит ...?', translit: "Chto znachit ...?", phonetic: "[shto ZNA-chit]", es: '¿Qué significa...?', note: 'Значить = significar. Se usa para preguntar el significado de una palabra o frase. Alternativa: "Что означает...?" (Chto oznachayet? — ¿Qué quiere decir...?). Para pedir traducción: "Как это сказать по-испански?" (¿Cómo se dice esto en español?)', category: 'Comprensión' },
  { id: 7, phrase: 'Как добраться до...?', translit: 'Kak dobratsya do...?', phonetic: '[kak dob-RA-tsya do]', es: '¿Cómo llegar a...?', note: 'Добраться = llegar/llegar hasta (verbo de movimiento prefijado). До + genitivo = hasta. Alternativa: "Как пройти до...?" (a pie, Kak proyti do?) / "Как проехать до...?" (en vehículo, Kak proyekhat do?). La preposición "до" pide genitivo.', category: 'Viajes' },
  { id: 8, phrase: 'Один билет до... пожалуйста.', translit: 'Odin bilet do... pozhaluysta.', phonetic: '[o-DIN bi-LET do, po-ZHA-luy-sta]', es: 'Un billete a..., por favor.', note: 'Bilет = billete. Один = uno (masculino). Para dos: "Два билета". До + genitivo = hasta. En metro de Moscú también: "Одну поездку" (una sola viaje en metro). Para tren: preguntar "Какой вагон?" (¿qué vagón?).', category: 'Viajes' },
  { id: 9, phrase: 'Я хотел(а) бы забронировать номер.', translit: 'Ya khotel(a) by zabronirovat nomer.', phonetic: '[ya kho-TEL/TEL-a by zab-ro-ni-RO-vat NO-mer]', es: 'Quisiera reservar una habitación.', note: 'Хотел бы (masc.) / Хотела бы (fem.) = quisiera (condicional). Забронировать = reservar. Номер = habitación de hotel (también "комната" para habitación en casa). Más directo: "Есть свободный номер?" (¿Hay habitación disponible?)', category: 'Viajes' },
  { id: 10, phrase: 'В котором часу открывается / закрывается?', translit: 'V kotorom chasu otkryvayetsya / zakryvayetsya?', phonetic: '[v ko-TO-rom cha-SU ot-kry-VAY-et-sya / zak-ry-VAY-et-sya]', es: '¿A qué hora abre / cierra?', note: 'Открываться = abrirse (reflexivo), закрываться = cerrarse (reflexivo). En котором часу = a qué hora (literalmente "en qué hora"). Para saber si está abierto ahora: "Сейчас открыто?" (Seychas otkryto? = ¿Está abierto ahora?)', category: 'Viajes' },
  { id: 11, phrase: 'Я работаю как ... уже ... лет.', translit: 'Ya rabotayu kak ... uzhe ... let.', phonetic: '[ya ra-BO-ta-yu kak ... u-ZHE ... let]', es: 'Trabajo como... ya hace... años.', note: 'Уже = ya. Лет = genitivo plural de год (año), se usa con 5+. Para 1-4: год/года. Ejemplo: "Я работаю как учитель уже три года" (Soy profesor desde hace 3 años). Работаю = presente — en ruso el presente expresa duración continua.', category: 'Trabajo' },
  { id: 12, phrase: 'Я умею / могу...', translit: 'Ya umeyu / mogu...', phonetic: '[ya u-MEY-u / MO-gu]', es: 'Sé... / Puedo...', note: 'Уметь (umeyу) = saber hacer (habilidad aprendida). Мочь (mogu) = poder (posibilidad o capacidad). Diferencia: "Я умею играть на гитаре" (Sé tocar guitarra — habilidad) vs "Я могу прийти" (Puedo venir — posibilidad). Ambos son A2 esenciales.', category: 'Trabajo' },
  { id: 13, phrase: 'В мои обязанности входит...', translit: 'V moi obyazannosti vkhodit...', phonetic: '[v moi o-BYA-zan-nos-ti vkho-DIT]', es: 'Entre mis responsabilidades está...', note: 'Обязанности = responsabilidades/obligaciones. Входить = entrar/incluir. Formal-profesional. Alternativa más simple: "Я отвечаю за..." (Ya otvechayu za — Soy responsable de...). Para entrevistas de trabajo en contexto ruso.', category: 'Trabajo' },
  { id: 14, phrase: '... лучше/хуже, чем ...', translit: '... luchshe/khuzhe, chem ...', phonetic: '[LUCH-she/KHU-zhe, chem]', es: '... es mejor/peor que ...', note: 'Лучше = mejor (comp. irregular de хороший). Хуже = peor (comp. irregular de плохой). Чем + nominativo para comparar. Alternativa: "... более/менее ... чем ..." (más/menos... que...) para adjetivos regulares: более интересный (más interesante).', category: 'Descripción' },
  { id: 15, phrase: 'Такой же ... как ...', translit: 'Takoy zhe ... kak ...', phonetic: '[ta-KOY zhe ... kak]', es: 'Tan ... como ... (igualdad)', note: 'Такой же = tan/igualmente (concuerda en género: такой/такая/такое/такие). Кak = como. Ejemplo: "Москва такая же красивая, как Санкт-Петербург" (Moscú es tan hermosa como San Petersburgo). Para nouns: столько же (la misma cantidad).', category: 'Descripción' },
  { id: 16, phrase: 'Какой он/она человек?', translit: 'Kakoy on/ona chelovek?', phonetic: '[ka-KOY on/o-NA che-lo-VEK]', es: '¿Cómo es él/ella (como persona)?', note: 'Какой = qué tipo de (masculino). Какая = femenino. Человек = persona. Para descripción física: "Как он/она выглядит?" (Kak on/ona vyglyadit? = ¿Cómo es físicamente?). Responder con adjetivo corto: "Он добрый" (Es amable).', category: 'Descripción' },
  { id: 17, phrase: 'Когда я был(а) ребёнком, я часто...', translit: 'Kogda ya byl(a) rebyonkom, ya chasto...', phonetic: '[kog-DA ya byl/by-LA re-BYONK-om ya CHAS-to]', es: 'Cuando era niño/a, frecuentemente...', note: 'Был (masc.) / Была (fem.) = era (pasado de быть). Ребёнком = de niño/a (instrumental). Часто = frecuentemente. Ejemplo: "Когда я была ребёнком, я часто читала книги" (De niña, leía libros frecuentemente). El pasado imperfectivo expresa hábito.', category: 'Social' },
  { id: 18, phrase: 'Сколько лет мы не виделись!', translit: 'Skolko let my ne videlis!', phonetic: '[SKOL-ko let my ne VI-de-lis]', es: '¡Cuánto tiempo sin vernos!', note: 'Видеться (videtsa) = verse (reflexivo recíproco). Не виделись = no nos vimos (pasado negativo). Скольо лет = cuántos años. Respuesta natural: "Да, уже сто лет!" (¡Sí, hace cien años ya! — hipérbole común). O "Как давно!" (¡Qué tiempo!)', category: 'Social' },
  { id: 19, phrase: 'Не хотите пойти с нами?', translit: 'Ne khotite poyti s nami?', phonetic: '[ne kho-TI-te poy-TI s NA-mi]', es: '¿No quieren venir con nosotros?', note: 'Хотите = formal (вы). Пойти = ir a pie (verbo de movimiento perfectivo → una vez). С нами = con nosotros (instrumental). Informal: "Не хочешь пойти с нами?" (Khoches?). Para proponer actividad: "Давайте пойдём...!" (¡Vamos a ir...!)', category: 'Social' },
  { id: 20, phrase: 'До скорой встречи!', translit: 'Do skoroy vstrechi!', phonetic: '[do SKO-roy VSTRE-chi]', es: '¡Hasta pronto! / ¡Hasta vernos pronto!', note: 'Скорый = próximo/inminente. Встреча = encuentro/cita. Literalmente: "hasta el próximo encuentro". Alternativas: "До свидания!" (formal, hasta la vista) / "Пока!" (informal, ¡chao!) / "До завтра!" (¡hasta mañana!) / "Увидимся!" (¡Nos vemos!).', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Comprensión', 'Viajes', 'Trabajo', 'Descripción', 'Social'];

export default function HablaRusoA2() {
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
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🗣️ Expresión oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Разговор (Razgovor) · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Expresión oral A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          20 frases esenciales con cirílico, transliteración y contexto. Practica en voz alta y marca las que domines.
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
          🎯 <strong style={{ color: 'var(--ink)' }}>Cómo practicar:</strong> Lee la transliteración en silencio → dila en voz alta 3 veces → si sale bien, marca ✓. Si no, déjala sin marcar y vuelve después.
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
                    <div style={{ fontSize: '0.78rem', color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.08rem' }}>{p.translit}</div>
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
