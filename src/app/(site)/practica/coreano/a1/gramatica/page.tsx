'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#534AB7';

interface Question { q: string; hint: string; a: string; fb: string; }
interface Topic { title: string; titleEs: string; explanation: string; table?: { head: string[]; rows: string[][] }; qs: Question[]; }

const GRAMMAR_TOPICS: Record<string, Topic> = {
  hangeul: {
    title: '한글 — El alfabeto coreano',
    titleEs: 'Sistema de escritura',
    explanation: '한글 (hangeul) tiene 14 consonantes y 10 vocales básicas. Las letras no se escriben linealmente: se agrupan en bloques silábicos. Cada sílaba tiene al menos: consonante inicial (초성) + vocal (중성), y opcionalmente consonante final (받침). Ejemplo: 학 = ㅎ+ㅏ+ㄱ → ha+k = hak.',
    table: {
      head: ['Vocal', 'Sonido', 'Consonante', 'Sonido'],
      rows: [
        ['ㅏ', 'a', 'ㄱ', 'g/k'],
        ['ㅓ', 'eo', 'ㄴ', 'n'],
        ['ㅗ', 'o', 'ㄷ', 'd/t'],
        ['ㅜ', 'u', 'ㄹ', 'r/l'],
        ['ㅡ', 'eu', 'ㅁ', 'm'],
        ['ㅣ', 'i', 'ㅂ', 'b/p'],
        ['ㅔ', 'e', 'ㅅ', 's'],
        ['ㅐ', 'ae', 'ㅇ', 'ng/silencioso'],
        ['ㅑ', 'ya', 'ㅈ', 'j'],
        ['ㅕ', 'yeo', 'ㅎ', 'h'],
      ],
    },
    qs: [
      { q: '¿Qué vocal es "ㅏ"?', hint: 'La vocal más básica del coreano', a: 'a', fb: 'ㅏ = "a". Es la primera vocal que se aprende. Visualmente: la línea vertical es la base, la línea horizontal corta señala la derecha → suena [a].' },
      { q: '안녕 (annyeong) = ¿cuántas sílabas tiene?', hint: 'Cada bloque = una sílaba', a: '2', fb: '안녕 tiene 2 sílabas: 안 (an) + 녕 (nyeong). Cada bloque cuadrado es una sílaba.' },
      { q: '"학교" (hakgyo = escuela) — ¿cuántos bloques silábicos hay?', hint: 'Cuenta los bloques cuadrados', a: '2', fb: '학교 tiene 2 sílabas: 학 (hak) + 교 (gyo). 학 = ㅎ+ㅏ+ㄱ; 교 = ㄱ+ㅛ.' },
      { q: '"ㅇ" al inicio de sílaba suena como:', hint: 'Es la consonante más especial del coreano', a: 'silencioso', fb: 'ㅇ inicial es silencioso y sirve como "relleno" cuando la sílaba empieza con vocal. Ej: 아 = [a], 이 = [i], 우 = [u]. Al final de sílaba, ㅇ suena [ng].' },
      { q: '"사랑해요" (saranghaeyo = te quiero) — ¿qué consonante final (받침) tiene la sílaba 랑?', hint: 'Recuerda: consonante inicial + vocal + consonante FINAL', a: 'ㅇ', fb: '랑 = ㄹ+ㅏ+ㅇ. La consonante final ㅇ suena [ng] aquí. Por eso la romanización es "rang".' },
      { q: '"한글" — ¿cuál es la vocal de la primera sílaba 한?', hint: 'La sílaba 한 = ㅎ + ? + ㄴ', a: 'ㅏ', fb: '한 = ㅎ(h) + ㅏ(a) + ㄴ(n) = "han". La vocal ㅏ va a la derecha de ㅎ en el bloque silábico.' },
      { q: 'El bloque silábico "무" equivale a:', hint: 'ㅁ+ㅜ = consonante + vocal', a: 'mu', fb: 'ㅁ = m, ㅜ = u → 무 = "mu". Los bloques de consonante+vocal (sin 받침) son los más simples.' },
      { q: '¿Cuál de estas es una consonante "aspirada" (con más aire)?', hint: 'Las aspiradas son versiones más fuertes de consonantes básicas', a: 'ㅋ', fb: 'ㅋ (k aspirada) es la versión aspirada de ㄱ. El coreano tiene pares: ㄱ/ㅋ, ㄷ/ㅌ, ㅂ/ㅍ, ㅈ/ㅊ. Las aspiradas suenan con más aire.' },
    ],
  },
  copula: {
    title: '이에요/예요 + 있어요/없어요',
    titleEs: 'Ser/estar · Hay/no hay',
    explanation: '"이에요/예요" significa "es/soy/eres" (copula). Se usa: sustantivo + consonante final → 이에요; sustantivo sin consonante final → 예요. "있어요" (isseoyo) = hay / tengo / está. "없어요" (eopseoyo) = no hay / no tengo / no está. Son las estructuras más fundamentales del A1 coreano.',
    table: {
      head: ['Termina en consonante', 'Termina en vocal', 'Hay / Está', 'No hay / No está'],
      rows: [
        ['학생이에요', '의사예요', '있어요', '없어요'],
        ['hakssaeng-ieyo', 'uisa-yeyo', 'isseoyo', 'eopseoyo'],
        ['(soy) estudiante', '(soy) médico/a', 'hay / está', 'no hay / no está'],
      ],
    },
    qs: [
      { q: '"저는 학생___" — ¿이에요 o 예요?', hint: '학생 termina en ㅇ (consonante final = 받침)', a: '이에요', fb: '학생 (hakssaeng) termina en consonante ㅇ → usa 이에요. Regla: consonante final → 이에요; sin consonante final → 예요.' },
      { q: '"저는 의사___" — ¿이에요 o 예요?', hint: '의사 termina en "ㅏ" (vocal)', a: '예요', fb: '의사 (uisa) termina en vocal ㅏ → usa 예요. Vocal final → 예요.' },
      { q: '"시간이 ___ (no hay tiempo)"', hint: 'No hay / no existe → 없어요', a: '없어요', fb: '"시간이 없어요" (sigan-i eopseoyo) = no hay tiempo / no tengo tiempo. 없어요 es la forma negativa de 있어요.' },
      { q: '"책이 ___ (hay un libro / tengo un libro)"', hint: 'Hay / existe → 있어요', a: '있어요', fb: '"책이 있어요" (chaegi isseoyo) = hay un libro / tengo un libro. 있어요 (isseoyo) es para existencia o posesión.' },
      { q: '"저는 선생님___" — ¿이에요 o 예요?', hint: '선생님 termina en ㅁ (consonante)', a: '이에요', fb: '선생님 (seonsaengnim) termina en consonante ㅁ → 이에요.' },
      { q: '"커피가 ___ (hay café)"', hint: '있어요 para existencia', a: '있어요', fb: '"커피가 있어요" (keopi-ga isseoyo) = hay café. 커피 = café (préstamo del inglés "coffee").' },
      { q: '¿Cuál es la diferencia entre 이에요/예요 y 있어요?', hint: 'Piensa en "ser" vs "haber/estar"', a: '이에요/예요 = ser (identidad); 있어요 = haber/estar (existencia)', fb: '이에요/예요 = copula (ser/llamarse): "Soy estudiante" = 학생이에요. 있어요 = existencia/posesión: "Hay café" / "Tengo café" = 커피 있어요.' },
      { q: '"친구가 없어요" significa:', hint: '친구 = amigo; 없어요 = no hay/no tengo', a: 'No tengo amigos / No hay amigos', fb: '"친구가 없어요" (chinguga eopseoyo) = No tengo amigos. 친구 = amigo; 없어요 = no hay/no tengo.' },
    ],
  },
  partikulas: {
    title: '은/는 · 이/가 · 을/를',
    titleEs: 'Partículas de tema, sujeto y objeto',
    explanation: 'El coreano usa partículas (조사) después del sustantivo para indicar su función gramatical. 은/는 (tema/tópico), 이/가 (sujeto), 을/를 (objeto). La elección entre las variantes depende de si el sustantivo termina en consonante (받침) o vocal. Las partículas de tema y sujeto se pueden omitir en conversación pero son esenciales en escritura.',
    table: {
      head: ['Partícula', 'Termina en consonante', 'Termina en vocal', 'Función'],
      rows: [
        ['Tema', '은 (eun)', '는 (neun)', 'Sobre lo que se habla'],
        ['Sujeto', '이 (i)', '가 (ga)', 'Quién hace la acción'],
        ['Objeto', '을 (eul)', '를 (reul)', 'Lo que recibe la acción'],
      ],
    },
    qs: [
      { q: '"저___ 학생이에요" — partícula de tema para 저 (yo)', hint: '저 termina en vocal "ㅓ"', a: '는', fb: '저는 (jeoneun) = yo (tópico/tema). 저 termina en vocal → usa 는. "저는 학생이에요" = yo soy estudiante.' },
      { q: '"책___ 있어요 (hay un libro)" — partícula de sujeto para 책', hint: '책 termina en consonante ㄱ', a: '이', fb: '책이 있어요. 책 termina en consonante → partícula de sujeto 이. "Hay un libro / existe un libro."' },
      { q: '"커피___ 마셔요 (tomo café)" — partícula de objeto para 커피', hint: '커피 termina en vocal "ㅣ"', a: '를', fb: '커피를 마셔요. 커피 termina en vocal → partícula de objeto 를. "를" marca el objeto directo.' },
      { q: '"한국어___ 공부해요 (estudio coreano)" — ¿qué partícula?', hint: '한국어 termina en vocal; es el objeto de la oración', a: '를', fb: '한국어를 공부해요. 한국어 termina en vocal → 를 (objeto). "공부해요" = estudio (verbo).' },
      { q: '"선생님___ 한국 사람이에요" — partícula de tema para 선생님', hint: '선생님 termina en consonante ㅁ', a: '은', fb: '선생님은 한국 사람이에요. "선생님" tiene 받침 ㅁ → usa 은. Significa "el/la profesor/a es coreano/a".' },
      { q: '"나___ 영어 잘 해요 (hablo bien inglés)" — partícula de tema para 나 (yo informal)', hint: '나 termina en vocal "ㅏ"', a: '는', fb: '나는 영어 잘 해요. 나 termina en vocal → 는. Diferencia: 저 (yo, formal/deferente) vs 나 (yo, informal).' },
      { q: '"물___ 마셔요 (bebo agua)" — partícula de objeto para 물', hint: '물 termina en consonante ㄹ', a: '을', fb: '물을 마셔요. 물 termina en consonante ㄹ → partícula de objeto 을.' },
      { q: '"언니___ 왔어요 (la hermana mayor llegó)" — partícula de sujeto para 언니', hint: '언니 termina en vocal "ㅣ"', a: '가', fb: '언니가 왔어요. 언니 termina en vocal → partícula de sujeto 가. "왔어요" = llegó (pasado de 오다).' },
    ],
  },
  numeros: {
    title: '숫자 — Números',
    titleEs: 'Números sino-coreanos y nativos',
    explanation: 'El coreano tiene DOS sistemas numéricos. Los sino-coreanos (한자어 숫자) son de origen chino: 일(1), 이(2), 삼(3)... Se usan para: fechas, dinero, minutos, años, pisos. Los nativos (고유어 숫자) son coreanos originales: 하나(1), 둘(2), 셋(3)... Se usan para: contar objetos (con contadores), horas, edad informal.',
    table: {
      head: ['Sino (일이삼...)', 'Nativo (하나둘셋...)', 'Uso Sino', 'Uso Nativo'],
      rows: [
        ['일(1) 이(2) 삼(3)', '하나(1) 둘(2) 셋(3)', 'Dinero', 'Horas (시)'],
        ['사(4) 오(5) 육(6)', '넷(4) 다섯(5) 여섯(6)', 'Minutos', 'Contar objetos'],
        ['칠(7) 팔(8) 구(9)', '일곱(7) 여덟(8) 아홉(9)', 'Fechas', 'Edad informal'],
        ['십(10) 백(100) 천(1000)', '열(10) 스물(20)', 'Meses', 'Botella/copa (잔)'],
      ],
    },
    qs: [
      { q: '¿Cómo se dice "3" en sino-coreano?', hint: 'El sistema de origen chino: 일, 이, ___', a: '삼', fb: 'Los sino-coreanos: 일(1) 이(2) 삼(3) 사(4) 오(5) 육(6) 칠(7) 팔(8) 구(9) 십(10).' },
      { q: '¿Cómo se dice "3" en números nativos coreanos?', hint: 'El sistema nativo: 하나, 둘, ___', a: '셋', fb: 'Los nativos: 하나(1) 둘(2) 셋(3) 넷(4) 다섯(5) 여섯(6) 일곱(7) 여덟(8) 아홉(9) 열(10).' },
      { q: '¿Qué sistema usas para decir "son las 3" (hora)?', hint: 'Las horas en coreano usan ¿sino o nativo?', a: 'nativo', fb: 'Las horas usan números NATIVOS: 한 시 (1h), 두 시 (2h), 세 시 (3h)... Pero los MINUTOS usan sino-coreanos: 오 분 (5 min), 삼십 분 (30 min).' },
      { q: '"오천 원이에요" (ocheon woneyo) — ¿cuántos won?', hint: 'Sino: 오=5, 천=1000, 원=won', a: '5000', fb: '오천 원 = 5.000 won. El dinero usa números sino-coreanos: 천(1000) × 오(5) = 오천.' },
      { q: '¿Cómo se dice "20" en números nativos?', hint: 'Nat. 10=열, 20=?', a: '스물', fb: 'Nativos: 열(10), 스물(20), 서른(30), 마흔(40), 쉰(50). Los decenares nativos son irregulares.' },
      { q: '¿Qué sistema usas para contar libros: "두 권" (dos libros)?', hint: '두 = ?, 권 = contador de libros', a: 'nativo', fb: '"두 권" (du gwon) = dos libros. 두 es la forma que toma 둘(2) cuando va con contador. Los objetos se cuentan con nativos + contador.' },
      { q: '"이월 십사일이에요" — ¿qué fecha es?', hint: '이월=febrero, 십사=14, 일=día', a: '14 de febrero', fb: '"이월 십사일" = 14 de febrero. Fechas: mes en sino-coreano (이=2=febrero) + 일 + día en sino-coreano (십사=14).' },
      { q: '"열 시 삼십 분이에요" — ¿qué hora es?', hint: '열(nativo)=10, 시=hora, 삼십(sino)=30, 분=minuto', a: '10:30', fb: '"열 시 삼십 분" = 10:30. HORA en nativo (열), MINUTOS en sino (삼십). Este patrón mixto es típico del coreano.' },
    ],
  },
  verbos: {
    title: '-아요/어요 — Verbos en presente',
    titleEs: 'Forma verbal polite informal',
    explanation: 'La forma 아요/어요 es el presente educado informal, el más usado en conversación diaria. Proceso: raíz verbal → si la última vocal es ㅏ o ㅗ → añade 아요; cualquier otra vocal → añade 어요; verbos en 하다 (hacer) → 해요 (irregular pero muy frecuente). Esta forma NO cambia según la persona (yo/tú/él = misma forma).',
    table: {
      head: ['Infinitivo', 'Raíz', 'Última vocal', 'Presente -아/어요'],
      rows: [
        ['가다 (ir)', '가-', 'ㅏ → 아요', '가요 (gayo)'],
        ['오다 (venir)', '오-', 'ㅗ → 아요', '와요 (wayo) ← irregular'],
        ['먹다 (comer)', '먹-', 'ㅓ → 어요', '먹어요 (meogeoyo)'],
        ['마시다 (beber)', '마시-', 'ㅣ → 어요', '마셔요 (masyeoyo)'],
        ['공부하다 (estudiar)', '공부하-', 'ㅏ → 하다→', '공부해요 (gongbu-haeyo)'],
        ['좋아하다 (gustar)', '좋아하-', 'ㅏ → 하다→', '좋아해요 (joahaeyo)'],
      ],
    },
    qs: [
      { q: '가다 (gada = ir) → presente educado?', hint: 'Raíz 가: última vocal ㅏ → 아요', a: '가요', fb: '가다 → 가 + 아요 → 가아요 → 가요 (contracción). "가요" = voy/va/van (no cambia según persona).' },
      { q: '먹다 (meokda = comer) → presente educado?', hint: 'Raíz 먹: última vocal ㅓ → 어요', a: '먹어요', fb: '먹다 → 먹 + 어요 → 먹어요 (meogeoyo). La ㄱ y 어요 se unen formando el bloque 어요.' },
      { q: '공부하다 (gongbu-hada = estudiar) → presente?', hint: 'Verbos en 하다 → 해요 (irregular muy frecuente)', a: '공부해요', fb: '공부하다 → 공부해요 (gongbu-haeyo). Todos los verbos en 하다 forman 해요 en presente.' },
      { q: '"저는 한국어를 ___" (estudio coreano)', hint: 'Verbo: 공부하다 → ?', a: '공부해요', fb: '저는 한국어를 공부해요 (jeoneun hangugeo-reul gongbu-haeyo) = Estudio coreano.' },
      { q: '마시다 (masida = beber) → presente?', hint: 'Raíz 마시: última vocal ㅣ → 어요, pero hay contracción', a: '마셔요', fb: '마시다 → 마시 + 어요 → 마셔요 (contracción: ㅣ+어=여). "물을 마셔요" = bebo agua.' },
      { q: '"좋아하다" (joahada = gustar/amar) → presente?', hint: 'Verbo en 하다', a: '좋아해요', fb: '좋아하다 → 좋아해요 (joahaeyo). "한국 음식을 좋아해요" = Me gusta la comida coreana.' },
      { q: '"저는 집에 ___" (voy a casa) — verbo 가다', hint: '집에 = a casa; verbo: 가다 → ?', a: '가요', fb: '저는 집에 가요 (jeoneun jibe gayo) = Voy a casa. "집에" = a/en casa (집=casa, 에=a/en).' },
      { q: 'La forma 아요/어요 cambia según la persona (yo/tú/él)?', hint: 'A diferencia del español, ¿el coreano conjuga?', a: 'no, es la misma forma para todas las personas', fb: '¡NO cambia! 가요 = voy / vas / va / vamos / van. El contexto o los pronombres (저는/너는/그는) indican la persona.' },
    ],
  },
};

export default function GramaticaCoreanoA1() {
  const [topicKey, setTopicKey] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const topic = topicKey ? GRAMMAR_TOPICS[topicKey] : null;
  const keys = Object.keys(GRAMMAR_TOPICS);

  function check(idx: number) {
    setRevealed(r => ({ ...r, [idx]: true }));
  }
  function isCorrect(idx: number) {
    if (!topic) return false;
    const userAns = (answers[idx] ?? '').trim().toLowerCase();
    const correctAns = topic.qs[idx].a.toLowerCase();
    return userAns === correctAns || correctAns.includes(userAns) || userAns.includes(correctAns.split('/')[0].trim());
  }

  if (topic) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 860 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
            <span>/</span>
            <button onClick={() => { setTopicKey(null); setAnswers({}); setRevealed({}); }} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📐 Gramática</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{topic.titleEs}</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{topic.titleEs} · Coreano A1</p>
          <h1 style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', margin: '0 0 1.25rem', fontWeight: 700 }}>{topic.title}</h1>

          <div className="wl-card" style={{ padding: '1.25rem', marginBottom: '1.5rem', borderLeft: `4px solid ${COLOR}` }}>
            <p style={{ margin: 0, lineHeight: 1.75, color: 'var(--ink)', fontSize: '0.95rem' }}>{topic.explanation}</p>
          </div>

          {topic.table && (
            <div style={{ overflowX: 'auto', marginBottom: '1.75rem' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr>{topic.table.head.map(h => <th key={h} style={{ padding: '0.6rem 0.85rem', background: COLOR, color: '#fff', textAlign: 'left', fontFamily: 'var(--mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h}</th>)}</tr>
                </thead>
                <tbody>
                  {topic.table.rows.map((row, ri) => (
                    <tr key={ri} style={{ background: ri % 2 === 0 ? `${COLOR}07` : 'var(--bg)' }}>
                      {row.map((cell, ci) => <td key={ci} style={{ padding: '0.55rem 0.85rem', borderBottom: '1px solid var(--line-soft)', color: 'var(--ink)' }}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.85rem' }}>Ejercicios — {topic.qs.length} preguntas</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {topic.qs.map((q, qi) => {
              const done = revealed[qi]; const correct = isCorrect(qi);
              return (
                <div key={qi} className="wl-card" style={{ padding: '1.1rem', borderLeft: done ? `4px solid ${correct ? '#059669' : '#dc2626'}` : `4px solid ${COLOR}55` }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', marginBottom: '0.35rem' }}>PREGUNTA {qi + 1}</div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.78rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 Pista: {q.hint}</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    <input type="text" value={answers[qi] ?? ''} onChange={e => { if (!done) setAnswers(a => ({ ...a, [qi]: e.target.value })); }}
                      onKeyDown={e => { if (e.key === 'Enter' && !done) check(qi); }} disabled={done}
                      placeholder="Tu respuesta..." style={{ padding: '0.5rem 0.85rem', borderRadius: 10, border: `1.5px solid ${done ? (correct ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: done ? (correct ? 'rgba(5,150,105,0.06)' : 'rgba(220,38,38,0.06)') : 'var(--bg)', color: 'var(--ink)', fontSize: '0.9rem', fontFamily: 'inherit', minWidth: 180 }} />
                    {!done && <button className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR, fontSize: '0.8rem' }} onClick={() => check(qi)}>Verificar</button>}
                    {done && <span style={{ fontSize: '1rem' }}>{correct ? '✅' : '❌'}</span>}
                  </div>
                  {done && (
                    <div style={{ marginTop: '0.65rem', padding: '0.55rem 0.85rem', borderRadius: 8, background: correct ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>
                      {!correct && <span style={{ fontWeight: 700 }}>Respuesta correcta: <span style={{ color: '#059669' }}>{q.a}</span><br /></span>}
                      {q.fb}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <button className="btn btn-ghost btn-sm" style={{ marginTop: '1.5rem' }} onClick={() => { setTopicKey(null); setAnswers({}); setRevealed({}); }}>← Todos los temas</button>
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/coreano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇰🇷 Coreano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 문법 · Gramática</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />문법 · Gramática Coreano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>5 temas esenciales del coreano A1. Cada tema incluye explicación, tabla de referencia y 8 ejercicios prácticos.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {keys.map(k => {
            const t = GRAMMAR_TOPICS[k];
            return (
              <button key={k} onClick={() => { setTopicKey(k); setAnswers({}); setRevealed({}); }} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{t.titleEs} · {t.qs.length} ejercicios</div>
                  </div>
                  <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
