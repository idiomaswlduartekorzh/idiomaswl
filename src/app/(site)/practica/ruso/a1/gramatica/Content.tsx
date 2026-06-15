'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }

const GRAMMAR_TOPICS: Record<string, { title: string; icon: string; desc: string; tip: string; qs: GQItem[] }> = {
  alfabeto: {
    title: 'Алфавит — el alfabeto',
    icon: '🔤',
    desc: 'El ruso usa el alfabeto cirílico (33 letras). Muchas suenan como en español: А[a], М[m], Т[t], О[o]. Otras son "falsas amigas": В=[v], Н=[n], Р=[r], С=[s], Х=[j/h].',
    tip: 'Letras "trampas": В (parece B pero suena V), Н (parece H pero suena N), Р (parece P pero suena R), С (parece C pero suena S), Х (parece X, suena como j española). ¡No te dejes engañar por la forma!',
    qs: [
      { s: 'Мама (mama) significa:', opts: ['Hermana', 'Mamá', 'Niña', 'Casa'], a: 1, fb: 'Мама (mama) = mamá. М=m, А=a, М=m, А=a. ¡Igual al español!' },
      { s: 'La letra В en ruso suena como:', opts: ['B de barco', 'V de vaca', 'W inglesa', 'U de uva'], a: 1, fb: 'В = [v]. "Вода" (voda) = agua. La forma se parece a B pero el sonido es V.' },
      { s: 'Ноябрь (noyabr\') significa:', opts: ['Octubre', 'Noviembre', 'Número', 'Noche'], a: 1, fb: 'Ноябрь (noyabr\') = noviembre. Н=[n], О=[o], Я=[ya], Б=[b], Р=[r], Ь=signo suave (ablanda la consonante anterior).' },
      { s: 'La letra Р en ruso suena como:', opts: ['P de papá', 'R vibrante de perro', 'B de barco', 'L de luna'], a: 1, fb: 'Р = [r] vibrante. Como la R de "perro" o la RR española. NO como la P.' },
      { s: 'Студент (student) significa:', opts: ['Estudiante', 'Estudio', 'Estudiando', 'Universidad'], a: 0, fb: 'Студент (student) = estudiante. С=[s], Т=[t], У=[u], Д=[d], Е=[ye], Н=[n], Т=[t]. ¡Cognado!' },
      { s: 'Сестра (sestra) significa:', opts: ['Estrellas', 'Maestra', 'Hermana', 'Señora'], a: 2, fb: 'Сестра (sestra) = hermana. С=[s], Е=[ye], С=[s], Т=[t], Р=[r], А=[a].' },
      { s: 'La letra Н en ruso suena como:', opts: ['H aspirada', 'N de nada', 'M de mamá', 'Ñ de niño'], a: 1, fb: 'Н = [n]. No es H. "Нет" (net) = no. Н=[n], Е=[ye], Т=[t].' },
      { s: 'Театр (teatr) significa:', opts: ['Teatro', 'Teoría', 'Tierra', 'Tetera'], a: 0, fb: 'Театр (teatr) = teatro. Т=[t], Е=[ye], А=[a], Т=[t], Р=[r]. ¡Otro cognado!' },
      { s: 'Х en ruso suena como:', opts: ['X de "taxi"', 'J de "jamón" (fricativa velar)', 'K de "kilo"', 'S de "sol"'], a: 1, fb: 'Х = [kh/j] — fricativa velar sonora, como la J española de "jamón" o la JJ escocesa. "Хлеб" (khleb) = pan.' },
      { s: 'Россия (Rossiya) significa:', opts: ['Rusia', 'Rojo', 'Río', 'Religión'], a: 0, fb: 'Россия (Rossiya) = Rusia. Р=[r], О=[o], С=[s] (doble=fuerte), И=[i], Я=[ya].' },
    ],
  },
  mestoimeniya: {
    title: 'Местоимения — pronombres',
    icon: '👤',
    desc: 'Pronombres: я (ya)=yo, ты (ty)=tú, он (on)=él, она (ona)=ella, мы (my)=nosotros, вы (vy)=ustedes/usted formal, они (oni)=ellos. El verbo SER en presente se OMITE.',
    tip: '¡CLAVE! En ruso el verbo "ser/estar" (быть/byt\') NO se usa en presente. "Я студент" (ya student) = Yo [soy] estudiante. Se pone una raya (—) en escritura formal donde iría "es/soy".',
    qs: [
      { s: 'Я ___ студент. (Yo [soy] estudiante)', opts: ['быть', '—/∅ (omitido)', 'есть', 'буду'], a: 1, fb: 'En presente el verbo ser se OMITE: "Я студент" (ya student) = Yo soy estudiante. Sin verbo.' },
      { s: '___ (Él) врач. (Él es médico)', opts: ['Я', 'Ты', 'Он', 'Они'], a: 2, fb: '"Он врач" (on vrach) = Él es médico. Он (on) = él. Врач (vrach) = médico.' },
      { s: 'Мы ___ из Колумбии. (Nosotros somos de Colombia)', opts: ['Я', 'Вы', 'Мы', 'Они'], a: 2, fb: '"Мы из Колумбии" (my iz Kolumbii) = Somos de Colombia. Мы (my) = nosotros.' },
      { s: '___ (Ella) красивая. (Ella es hermosa)', opts: ['Он', 'Она', 'Ты', 'Вы'], a: 1, fb: '"Она красивая" (ona krasivaya) = Ella es hermosa. Она (ona) = ella.' },
      { s: 'Вы ___ учитель? (¿Usted es maestro?)', opts: ['Я', 'Ты', 'Они', 'Вы'], a: 3, fb: '"Вы учитель?" (vy uchitel\'?) = ¿Usted es maestro? Вы (vy) es el pronombre formal de segunda persona.' },
      { s: '___ (Ellos) дома. (Ellos [están] en casa)', opts: ['Мы', 'Вы', 'Они', 'Он'], a: 2, fb: '"Они дома" (oni doma) = Ellos están en casa. Они (oni) = ellos/ellas. Дома (doma) = en casa.' },
      { s: 'Ты ___ откуда? (¿Tú eres de dónde?)', opts: ['Я', 'Ты', 'Он', 'Мы'], a: 1, fb: '"Ты откуда?" (ty otkuda?) = ¿Tú de dónde eres? Откуда (otkuda) = de dónde.' },
      { s: 'Я ___ Мария. (Yo me llamo María)', opts: ['быть', '—/∅ (omitido)', 'есть', 'буду'], a: 1, fb: '"Я Мария" (ya Mariya) = Yo soy/me llamo María. El verbo ser se omite en presente.' },
    ],
  },
  rod: {
    title: 'Род существительного — género',
    icon: '🔵',
    desc: 'Los sustantivos rusos tienen 3 géneros. Masculino: termina en consonante (брат=brat, студент=student). Femenino: termina en -а/-я (мама=mama, сестра=sestra). Neutro: termina en -о/-е (окно=okno, море=more).',
    tip: 'Regla práctica: si termina en consonante → masculino (90%). Si termina en -а/-я → femenino (90%). Si termina en -о/-е → neutro. Excepciones: папа (papa) = papá → masculino aunque termina en -а.',
    qs: [
      { s: 'Брат (brat — hermano) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 0, fb: 'Брат (brat) termina en consonante T → MASCULINO.' },
      { s: 'Мама (mama — mamá) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 1, fb: 'Мама (mama) termina en -А → FEMENINO. (Aunque papá = папá también termina en -а, es masculino por excepción.)' },
      { s: 'Окно (okno — ventana) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 2, fb: 'Окно (okno) termina en -О → NEUTRO.' },
      { s: 'Книга (kniga — libro) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 1, fb: 'Книга (kniga) termina en -А → FEMENINO.' },
      { s: 'Город (gorod — ciudad) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 0, fb: 'Город (gorod) termina en consonante Д → MASCULINO.' },
      { s: 'Море (more — mar) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 2, fb: 'Море (more) termina en -Е → NEUTRO.' },
      { s: 'Дочь (doch\' — hija) termina en Ь (signo suave). Es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 1, fb: 'Дочь (doch\') = hija. Termina en -Ь, que puede ser masc. o fem. pero дочь es FEMENINO (por significado). En general, palabras en -ость, -есть son fem.' },
      { s: 'Письмо (pis\'mo — carta) es:', opts: ['Masculino', 'Femenino', 'Neutro'], a: 2, fb: 'Письмо (pis\'mo) termina en -О → NEUTRO.' },
    ],
  },
  glagol: {
    title: 'Глаголы — 1ª y 2ª conjugación',
    icon: '⏰',
    desc: '1ª conjugación (читать/chitat\' = leer): читаю/читаешь/читает/читаем/читаете/читают. 2ª conjugación (говорить/govorit\' = hablar): говорю/говоришь/говорит/говорим/говорите/говорят.',
    tip: 'Clave: 1ª conj. → terminaciones -ю/-ешь/-ет/-ем/-ете/-ют. 2ª conj. → terminaciones -ю/-ишь/-ит/-им/-ите/-ят. La diferencia principal está en la vocal: 1ª usa E, 2ª usa И (excepto yo=ю y ellos).',
    qs: [
      { s: 'Я ___ (читать/chitat\' — leer) каждый день.', opts: ['читает', 'читаю', 'читаешь', 'читают'], a: 1, fb: '"читаю" (chitayu) — yo leo. 1ª conjugación, yo → -ю.' },
      { s: 'Он ___ (говорить/govorit\' — hablar) по-русски.', opts: ['говорю', 'говоришь', 'говорит', 'говорят'], a: 2, fb: '"говорит" (govorit) — él habla. 2ª conjugación, él/ella → -ит.' },
      { s: 'Мы ___ (жить/zhit\' — vivir) в Москве.', opts: ['живёт', 'живём', 'живу', 'живёшь'], a: 1, fb: '"живём" (zhivyom) — nosotros vivimos. 1ª conj., nosotros → -ём/-ем.' },
      { s: 'Вы ___ (понимать/ponimat\' — entender) по-испански?', opts: ['понимает', 'понимаю', 'понимаете', 'понимают'], a: 2, fb: '"понимаете" (ponimaete) — ustedes/usted entiende. 1ª conj., ustedes → -ете.' },
      { s: 'Они ___ (работать/rabotat\' — trabajar) здесь.', opts: ['работает', 'работаю', 'работают', 'работаешь'], a: 2, fb: '"работают" (rabotayut) — ellos trabajan. 1ª conj., ellos → -ют.' },
      { s: 'Ты ___ (учиться/uchit\'sya — estudiar) в университете?', opts: ['учится', 'учишься', 'учусь', 'учатся'], a: 1, fb: '"учишься" (uchish\'sya) — tú estudias. 2ª conj., tú → -ишься (forma reflexiva con -ся).' },
      { s: 'Она ___ (любить/lyubit\' — amar/querer) музыку.', opts: ['любит', 'любишь', 'люблю', 'любят'], a: 0, fb: '"любит" (lyubit) — ella ama/quiere. 2ª conj., ella → -ит. Nota: Yo = люблю (con Л alternante).' },
      { s: 'Я ___ (знать/znat\' — saber/conocer) этот город.', opts: ['знает', 'знаю', 'знаешь', 'знают'], a: 1, fb: '"знаю" (znayu) — yo sé/conozco. 1ª conj., yo → -ю.' },
    ],
  },
  chisla: {
    title: 'Числа 1–20 + прилагательные',
    icon: '🔢',
    desc: 'Числа (chisla): один(1)/два(2)/три(3)/четыре(4)/пять(5)/шесть(6)/семь(7)/восемь(8)/девять(9)/десять(10)/одиннадцать(11)...двадцать(20). Прилагательные: новый/новая/новое (nuevo) + большой/большая/большое (grande).',
    tip: 'Truco: del 11 al 19 en ruso = número + "надцать" (nadtsat\'). 11=одиннадцать, 12=двенадцать... 20=двадцать. Los adjetivos cambian su terminación según el género del sustantivo que acompañan.',
    qs: [
      { s: 'Два (dva) + восемь (vosem\') = ___', opts: ['Восемь', 'Девять', 'Десять', 'Одиннадцать'], a: 2, fb: '2 + 8 = 10 = десять (desyat\').' },
      { s: 'У меня ___ (10) книг. (Tengo 10 libros)', opts: ['пять', 'десять', 'три', 'двадцать'], a: 1, fb: '"десять книг" (desyat\' knig) = diez libros. Десять (desyat\') = 10.' },
      { s: 'Мне ___ (15) лет. (Tengo 15 años)', opts: ['пятнадцать', 'пятьдесят', 'пять', 'двадцать пять'], a: 0, fb: '"Мне пятнадцать лет" (mne pyatnadtsat\' let) = Tengo 15 años. Пятнадцать = 15.' },
      { s: 'Это новый ___ (masculino). (Este es un nuevo libro)', opts: ['новая', 'новый', 'новое', 'новые'], a: 1, fb: '"новый" para masculino. Книга (kniga = libro) es femenino → новая книга. Стол (stol = mesa) es masculino → новый стол.' },
      { s: 'Это большая ___ (femenino). (Esta es una gran ciudad)', opts: ['большой', 'большая', 'большое', 'большие'], a: 1, fb: '"большая" para femenino: большая квартира (gran apartamento), большая семья (gran familia).' },
      { s: 'Один (odin) + девять (devyat\') = ___', opts: ['Восемь', 'Девять', 'Десять', 'Одиннадцать'], a: 2, fb: '1 + 9 = 10 = десять.' },
      { s: 'Это новое ___. (Este es un nuevo edificio — neutro)', opts: ['новый', 'новая', 'новое', 'новые'], a: 2, fb: '"новое" para neutro: здание (zdaniye) = edificio es neutro → новое здание.' },
      { s: 'Сколько тебе лет? — ___ (20). (¿Cuántos años tienes? — 20)', opts: ['двадцать', 'двенадцать', 'двести', 'две тысячи'], a: 0, fb: 'Двадцать (dvadtsat\') = 20. Двенадцать (dvenadtsat\') = 12. No confundir.' },
    ],
  },
};

export default function GramaticaRusoA1() {
  const topics = Object.entries(GRAMMAR_TOPICS);
  const [topicKey, setTopicKey] = useState(topics[0][0]);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const data = GRAMMAR_TOPICS[topicKey];
  const total = data.qs.length;
  const done = Object.keys(answers).length;
  const correct = data.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }
  function switchTopic(k: string) { setTopicKey(k); reset(); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Грамматика · Ruso A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 1.75rem' }}>5 temas esenciales. Cada palabra en cirílico incluye su transliteración (transcripción). Feedback inmediato.</p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {topics.map(([k, v]) => (
            <button key={k} onClick={() => switchTopic(k)}
              className={topicKey === k ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.83rem', ...(topicKey === k ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {v.icon} {v.title}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.25rem 1.4rem', borderRadius: 14, background: `${COLOR}0a`, border: `1px solid ${COLOR}22`, marginBottom: '1.5rem' }}>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', fontWeight: 600, lineHeight: 1.6 }}>📖 {data.desc}</p>
          <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6, fontStyle: 'italic' }}>✨ {data.tip}</p>
        </div>

        {done > 0 && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / total) * 100}%`, background: COLOR, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{total}</span>
          </div>
        )}

        {!showResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {data.qs.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={`${topicKey}-${qi}`} className="wl-card" style={{ padding: '1.25rem' }}>
                  <p style={{ margin: '0 0 0.85rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
                    {qi + 1}. {q.s.split('___').map((part, i, arr) => (
                      <span key={i}>{part}{i < arr.length - 1 && (
                        <span style={{ display: 'inline-block', minWidth: 80, borderBottom: `2px solid ${COLOR}`, margin: '0 4px', verticalAlign: 'bottom' }}>
                          {isDone && <span style={{ fontSize: '0.88rem', fontWeight: 800, color: answers[qi] === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                        </span>
                      )}</span>
                    ))}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect = oi === q.a; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = `1px solid var(--line-soft)`; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                          style={{ padding: '0.5rem 1.1rem', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && (
                    <div style={{ marginTop: '0.65rem', fontSize: '0.82rem', color: 'var(--ink-2)', padding: '0.5rem 0.75rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                      {ans === q.a ? '✅ ' : `✗ Ответ: "${q.opts[q.a]}". `}{q.fb}
                    </div>
                  )}
                </div>
              );
            })}
            {done === total && (
              <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: COLOR, borderColor: COLOR }}>Посмотреть результат →</button>
            )}
          </div>
        )}

        {showResult && (
          <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct === total ? '🏆' : correct >= total * 0.7 ? '⭐' : '📖'}</div>
            <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{correct} / {total} правильно</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
              {correct === total ? '¡Отлично! Dominas este tema.' : correct >= total * 0.7 ? 'Хорошо. Repasa los errores.' : 'Повтори урок y practica de nuevo.'}
            </p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: COLOR, borderColor: COLOR }}>Ещё раз (otra vez)</button>
              <button className="btn btn-ghost btn-sm" onClick={() => {
                const keys = Object.keys(GRAMMAR_TOPICS);
                switchTopic(keys[(keys.indexOf(topicKey) + 1) % keys.length]);
              }}>Следующая тема →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
