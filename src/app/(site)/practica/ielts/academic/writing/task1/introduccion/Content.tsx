'use client';

import { useState } from 'react';
import Link from 'next/link';

const C = '#0f3d8c';

// ─── SVG Charts ───────────────────────────────────────────────────────────────

function LineChartInternet() {
  // Internet users (%) in UK, Brazil, India — 2000 to 2020
  // X: 2000=60, 2005=168, 2010=276, 2015=384, 2020=492  (plot area x: 60-492)
  // Y: 0%=230, 100%=30  (200px range → 2px per %)
  const yScale = (pct: number) => 230 - pct * 2;
  const xPos = [60, 168, 276, 384, 492];
  const uk = [26, 63, 80, 92, 96];
  const brazil = [3, 14, 40, 66, 81];
  const india = [1, 2, 8, 26, 50];
  const pts = (data: number[]) => data.map((v, i) => `${xPos[i]},${yScale(v)}`).join(' ');

  return (
    <svg viewBox="0 0 560 270" style={{ width: '100%', maxWidth: 540, display: 'block' }}>
      {/* Grid lines */}
      {[0, 25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1="60" y1={yScale(v)} x2="492" y2={yScale(v)} stroke="var(--line-soft)" strokeWidth="1" />
          <text x="52" y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">{v}%</text>
        </g>
      ))}
      {/* X axis labels */}
      {[2000, 2005, 2010, 2015, 2020].map((yr, i) => (
        <text key={yr} x={xPos[i]} y="250" textAnchor="middle" fontSize="10" fill="var(--muted)">{yr}</text>
      ))}
      {/* Lines */}
      <polyline points={pts(uk)} fill="none" stroke="#0f3d8c" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points={pts(brazil)} fill="none" stroke="#059669" strokeWidth="2.5" strokeLinejoin="round" />
      <polyline points={pts(india)} fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinejoin="round" />
      {/* Dots UK */}
      {uk.map((v, i) => <circle key={i} cx={xPos[i]} cy={yScale(v)} r="3.5" fill="#0f3d8c" />)}
      {/* Dots Brazil */}
      {brazil.map((v, i) => <circle key={i} cx={xPos[i]} cy={yScale(v)} r="3.5" fill="#059669" />)}
      {/* Dots India */}
      {india.map((v, i) => <circle key={i} cx={xPos[i]} cy={yScale(v)} r="3.5" fill="#dc2626" />)}
      {/* Legend */}
      <rect x="70" y="32" width="12" height="12" fill="#0f3d8c" rx="2" />
      <text x="87" y="42" fontSize="11" fill="var(--ink)">United Kingdom</text>
      <rect x="195" y="32" width="12" height="12" fill="#059669" rx="2" />
      <text x="212" y="42" fontSize="11" fill="var(--ink)">Brazil</text>
      <rect x="268" y="32" width="12" height="12" fill="#dc2626" rx="2" />
      <text x="285" y="42" fontSize="11" fill="var(--ink)">India</text>
      {/* Axes */}
      <line x1="60" y1="30" x2="60" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="60" y1="232" x2="495" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
    </svg>
  );
}

function BarChartAdvertising() {
  // Advertising spending UK 2020 (£ billions)
  // TV=5.2, Online=7.1, Print=2.8, Radio=1.4, Outdoor=1.1
  const cats = ['TV', 'Online', 'Print', 'Radio', 'Outdoor'];
  const vals = [5.2, 7.1, 2.8, 1.4, 1.1];
  const colors = ['#0f3d8c', '#0369a1', '#7c3aed', '#059669', '#d97706'];
  // Y: 0=230, 8bn=30 → 200px/8 = 25px per bn
  const yScale = (v: number) => 230 - v * 25;
  // X: 5 bars, width 60, spacing
  const barW = 58;
  const xs = [70, 168, 266, 364, 462];

  return (
    <svg viewBox="0 0 560 270" style={{ width: '100%', maxWidth: 540, display: 'block' }}>
      {/* Grid */}
      {[0, 2, 4, 6, 8].map(v => (
        <g key={v}>
          <line x1="55" y1={yScale(v)} x2="510" y2={yScale(v)} stroke="var(--line-soft)" strokeWidth="1" />
          <text x="50" y={yScale(v) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">£{v}bn</text>
        </g>
      ))}
      {/* Bars */}
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={xs[i]} y={yScale(v)} width={barW} height={230 - yScale(v)} fill={colors[i]} rx="4" opacity="0.85" />
          <text x={xs[i] + barW / 2} y={yScale(v) - 5} textAnchor="middle" fontSize="10" fontWeight="700" fill={colors[i]}>{v}</text>
          <text x={xs[i] + barW / 2} y="248" textAnchor="middle" fontSize="10" fill="var(--muted)">{cats[i]}</text>
        </g>
      ))}
      {/* Axes */}
      <line x1="55" y1="30" x2="55" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="55" y1="232" x2="512" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
    </svg>
  );
}

function PieChartsStudents() {
  // Male: Engineering 45%, Science 30%, Arts 15%, Business 10%
  // Female: Engineering 15%, Science 35%, Arts 35%, Business 15%
  const COLORS = ['#0f3d8c', '#0369a1', '#059669', '#d97706'];
  const labels = ['Engineering', 'Science', 'Arts', 'Business'];

  function slice(cx: number, cy: number, r: number, startDeg: number, endDeg: number) {
    const toRad = (d: number) => (d - 90) * Math.PI / 180;
    const s = { x: cx + r * Math.cos(toRad(startDeg)), y: cy + r * Math.sin(toRad(startDeg)) };
    const e = { x: cx + r * Math.cos(toRad(endDeg)), y: cy + r * Math.sin(toRad(endDeg)) };
    const large = endDeg - startDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x.toFixed(1)} ${s.y.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${e.x.toFixed(1)} ${e.y.toFixed(1)} Z`;
  }

  function buildPie(cx: number, cy: number, r: number, data: number[]) {
    const paths: { d: string; pct: number; mid: number }[] = [];
    let angle = 0;
    data.forEach((pct, i) => {
      const sweep = pct * 3.6;
      paths.push({ d: slice(cx, cy, r, angle, angle + sweep), pct, mid: angle + sweep / 2 });
      angle += sweep;
    });
    return paths;
  }

  const malePcts = [45, 30, 15, 10];
  const femalePcts = [15, 35, 35, 15];
  const malePie = buildPie(120, 110, 90, malePcts);
  const femalePie = buildPie(380, 110, 90, femalePcts);

  function labelPos(cx: number, cy: number, mid: number, r: number) {
    const toRad = (d: number) => (d - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(toRad(mid)), y: cy + r * Math.sin(toRad(mid)) };
  }

  return (
    <svg viewBox="0 0 500 250" style={{ width: '100%', maxWidth: 500, display: 'block' }}>
      {/* Male pie */}
      {malePie.map((p, i) => <path key={i} d={p.d} fill={COLORS[i]} opacity="0.85" />)}
      {malePie.map((p, i) => {
        if (p.pct < 12) return null;
        const pos = labelPos(120, 110, p.mid, 55);
        return <text key={i} x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{p.pct}%</text>;
      })}
      <text x="120" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">Male students</text>

      {/* Female pie */}
      {femalePie.map((p, i) => <path key={i} d={p.d} fill={COLORS[i]} opacity="0.85" />)}
      {femalePie.map((p, i) => {
        if (p.pct < 12) return null;
        const pos = labelPos(380, 110, p.mid, 55);
        return <text key={i} x={pos.x} y={pos.y + 4} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">{p.pct}%</text>;
      })}
      <text x="380" y="220" textAnchor="middle" fontSize="11" fontWeight="700" fill="var(--ink)">Female students</text>

      {/* Legend */}
      {labels.map((l, i) => (
        <g key={l}>
          <rect x={10 + i * 120} y="235" width="10" height="10" fill={COLORS[i]} rx="2" />
          <text x={24 + i * 120} y="244" fontSize="9.5" fill="var(--muted)">{l}</text>
        </g>
      ))}
    </svg>
  );
}

function BarChartWorkHours() {
  // Average weekly working hours: Germany, France, UK, Spain, Italy (2022)
  const countries = ['Germany', 'France', 'UK', 'Spain', 'Italy'];
  const vals = [34.4, 35.6, 36.0, 37.5, 38.2];
  const colors = ['#0f3d8c', '#0369a1', '#059669', '#d97706', '#7c3aed'];
  // Y: 30=230, 40=80 → 150px / 10 = 15px per hr
  const yScale = (v: number) => 230 - (v - 30) * 15;
  const barW = 52;
  const xs = [72, 164, 256, 348, 440];

  return (
    <svg viewBox="0 0 560 270" style={{ width: '100%', maxWidth: 540, display: 'block' }}>
      {[30, 32, 34, 36, 38, 40].map(v => (
        <g key={v}>
          <line x1="62" y1={yScale(v)} x2="500" y2={yScale(v)} stroke="var(--line-soft)" strokeWidth="1" />
          <text x="57" y={yScale(v) + 4} textAnchor="end" fontSize="9.5" fill="var(--muted)">{v}h</text>
        </g>
      ))}
      {vals.map((v, i) => (
        <g key={i}>
          <rect x={xs[i]} y={yScale(v)} width={barW} height={230 - yScale(v)} fill={colors[i]} rx="4" opacity="0.85" />
          <text x={xs[i] + barW / 2} y={yScale(v) - 5} textAnchor="middle" fontSize="10" fontWeight="700" fill={colors[i]}>{v}</text>
          <text x={xs[i] + barW / 2} y="248" textAnchor="middle" fontSize="9.5" fill="var(--muted)">{countries[i]}</text>
        </g>
      ))}
      <line x1="62" y1="80" x2="62" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
      <line x1="62" y1="232" x2="502" y2="232" stroke="var(--ink-2)" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const EXAMPLES = [
  {
    id: 'line',
    chartType: 'Gráfica de líneas',
    prompt: 'The graph below shows the percentage of people using the internet in three countries between 2000 and 2020.',
    Chart: LineChartInternet,
    model1: {
      text: 'The line graph illustrates the proportion of the population who had internet access in three countries over a twenty-year period from 2000 to 2020.',
      changes: ['shows → illustrates', 'percentage → proportion', 'people using the internet → population who had internet access', 'between 2000 and 2020 → over a twenty-year period from 2000 to 2020'],
    },
    model2: {
      text: 'The graph compares the percentage of internet users across three nations during the period from 2000 to 2020.',
      changes: ['shows → compares', 'people using the internet → internet users', 'countries → nations', 'between → during the period from'],
    },
  },
  {
    id: 'bar',
    chartType: 'Gráfico de barras',
    prompt: 'The bar chart below shows the amount of money spent on different types of advertising in the UK in 2020.',
    Chart: BarChartAdvertising,
    model1: {
      text: 'The bar chart presents the total expenditure on various categories of advertising in the United Kingdom in 2020.',
      changes: ['shows → presents', 'amount of money spent → total expenditure', 'different types of → various categories of', 'UK → United Kingdom'],
    },
    model2: {
      text: 'The chart displays spending on different advertising channels in the UK during 2020.',
      changes: ['shows → displays', 'amount of money spent → spending', 'types of advertising → advertising channels'],
    },
  },
  {
    id: 'pie',
    chartType: 'Gráficos de sectores',
    prompt: 'The pie charts below show the proportion of male and female students studying four subjects at a university in 2010.',
    Chart: PieChartsStudents,
    model1: {
      text: 'The pie charts illustrate the percentage of male and female students enrolled in four academic disciplines at a university in 2010.',
      changes: ['show → illustrate', 'proportion → percentage', 'studying → enrolled in', 'subjects → academic disciplines'],
    },
    model2: {
      text: 'The two pie charts present the share of male and female undergraduates across four courses at a university in 2010.',
      changes: ['show → present', 'proportion → share', 'students studying → undergraduates across', 'subjects → courses'],
    },
  },
  {
    id: 'bar2',
    chartType: 'Gráfico de barras',
    prompt: 'The bar chart below shows the average number of hours worked per week by employees in five European countries in 2022.',
    Chart: BarChartWorkHours,
    model1: {
      text: 'The bar chart illustrates the average weekly working hours among employees in five European nations in 2022.',
      changes: ['shows → illustrates', 'number of hours worked per week → weekly working hours', 'countries → nations', 'employees in → among employees in'],
    },
    model2: {
      text: 'The chart compares the mean number of hours worked weekly by workers across five European countries in 2022.',
      changes: ['shows → compares', 'average → mean', 'employees → workers', 'in → across'],
    },
  },
];

const PRACTICE = [
  {
    prompt: 'The line graph below shows changes in the number of tourists visiting Spain and Portugal between 2005 and 2022.',
    hint: 'Cambia: "shows" → "illustrates/depicts", "changes in the number" → "fluctuations/trends", "tourists visiting" → "visitors to / tourist arrivals in", "between" → "from … to / over the period"',
    model: 'The line graph illustrates the trends in tourist arrivals in Spain and Portugal over the period from 2005 to 2022.',
    changes: ['shows → illustrates', 'changes in the number of tourists visiting → trends in tourist arrivals in', 'between 2005 and 2022 → over the period from 2005 to 2022'],
  },
  {
    prompt: 'The table below shows the percentage of adults in four age groups who used social media daily in the USA in 2023.',
    hint: 'Cambia: "shows" → "provides data on / presents", "percentage" → "proportion", "used social media daily" → "who were daily social media users", "adults in four age groups" → "four adult age groups"',
    model: 'The table provides data on the proportion of four adult age groups who were daily social media users in the United States in 2023.',
    changes: ['shows → provides data on', 'percentage → proportion', 'adults in four age groups → four adult age groups', 'used social media daily → who were daily social media users', 'USA → United States'],
  },
  {
    prompt: 'The diagram below shows the process of recycling plastic bottles into new products.',
    hint: 'Cambia: "shows" → "illustrates/outlines/depicts", "process of recycling" → "stages involved in recycling / how plastic bottles are recycled", "plastic bottles" → "used plastic bottles"',
    model: 'The diagram illustrates the stages involved in recycling used plastic bottles to manufacture new products.',
    changes: ['shows → illustrates', 'process of recycling → stages involved in recycling', 'plastic bottles → used plastic bottles', 'new products → to manufacture new products (restructura)'],
  },
];

// ─── Synonym tables ───────────────────────────────────────────────────────────

const VERB_SYNS = [
  { original: 'shows', alts: ['illustrates', 'presents', 'compares', 'depicts', 'provides data on', 'displays'] },
  { original: 'show (plural)', alts: ['illustrate', 'present', 'compare', 'depict', 'outline'] },
];
const NOUN_SYNS = [
  { original: 'percentage', alts: ['proportion', 'share', 'rate'] },
  { original: 'number (of)', alts: ['figure', 'quantity', 'volume', 'total'] },
  { original: 'amount', alts: ['level', 'quantity', 'volume', 'sum'] },
  { original: 'people', alts: ['individuals', 'the population', 'residents'] },
  { original: 'countries', alts: ['nations', 'states'] },
  { original: 'types / kinds', alts: ['categories', 'forms', 'varieties'] },
];
const TIME_SYNS = [
  { original: 'between X and Y', alts: ['from X to Y', 'over the period X–Y', 'during the X to Y period'] },
  { original: 'in X years', alts: ['over a X-year period', 'across X years'] },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IntroduccionContent() {
  const [activeEx, setActiveEx] = useState<number | null>(null);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);

  const pr = PRACTICE[practiceIdx];
  const wc = text.trim().split(/\s+/).filter(Boolean).length;

  function nextPractice() {
    setPracticeIdx(i => (i + 1) % PRACTICE.length);
    setText('');
    setRevealed(false);
  }

  return (
    <section className="wl-section">
      <div className="wrap">
        <div style={{ maxWidth: 760, margin: '0 auto' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/ielts" style={{ color: 'var(--muted)', textDecoration: 'none' }}>IELTS</Link>
            <span>/</span>
            <Link href="/practica/ielts/academic/writing" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Writing</Link>
            <span>/</span>
            <Link href="/practica/ielts/academic/writing/task1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Task 1</Link>
            <span>/</span>
            <span style={{ color: C, fontWeight: 800 }}>Introducción</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />📝 Sub-habilidad 1 de 7 — Introducción</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.4rem', fontWeight: 700 }}>
            La Introducción y el Paraphrasing
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', margin: '0 0 2rem', lineHeight: 1.65 }}>
            La introducción es lo primero que el examinador lee. Si copias el enunciado, la calificación de <em>Lexical Resource</em> cae inmediatamente. Aquí aprendes a parafrasearla con precisión académica.
          </p>

          {/* ── SECCIÓN 1: TEORÍA ─────────────────────────────────────────── */}
          <div style={{ background: `${C}07`, border: `1.5px solid ${C}22`, borderRadius: 18, padding: '1.75rem', marginBottom: '2rem' }}>
            <p style={{ fontSize: '0.72rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.08em', margin: '0 0 1rem' }}>¿Qué es la Introducción?</p>

            <p style={{ fontSize: '0.97rem', color: 'var(--ink)', lineHeight: 1.75, margin: '0 0 1.25rem' }}>
              La introducción del Task 1 es un <strong>párrafo de 1 a 2 oraciones</strong> que parafrasea el enunciado de la pregunta. Su único propósito es decirle al examinador <em>qué muestra el gráfico</em>, sin copiar las palabras del enunciado y sin mencionar tendencias ni datos específicos.
            </p>

            {/* Formula */}
            <div style={{ background: 'var(--bg)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.25rem', border: '1px solid var(--line-soft)' }}>
              <p style={{ fontSize: '0.72rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Fórmula</p>
              <p style={{ fontSize: '0.97rem', color: C, fontWeight: 700, margin: 0, lineHeight: 1.65 }}>
                The [tipo de gráfica] <span style={{ color: '#0369a1' }}>illustrates / presents / compares / depicts</span> [tema parafraseado] [período de tiempo o lugar si aparece].
              </p>
            </div>

            {/* Word count */}
            <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
              {[
                { label: '30–45 palabras', desc: 'longitud ideal', icon: '📏', c: '#059669' },
                { label: '1–2 oraciones', desc: 'no más', icon: '✍️', c: C },
                { label: 'Sin tendencias', desc: 'eso va en el overview', icon: '🚫', c: '#dc2626' },
                { label: 'Sin números', desc: 'ni datos específicos', icon: '🔢', c: '#d97706' },
              ].map(item => (
                <div key={item.label} style={{ flex: '1 1 160px', padding: '0.8rem 1rem', borderRadius: 12, background: `${item.c}10`, border: `1px solid ${item.c}30` }}>
                  <div style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{item.icon}</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 800, color: item.c, marginBottom: '0.15rem' }}>{item.label}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{item.desc}</div>
                </div>
              ))}
            </div>

            {/* Include / Exclude */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>✓ Incluir</p>
                <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {['Tipo de gráfica (line graph, bar chart…)', 'Tema / asunto (parafraseado)', 'Período de tiempo o lugar (si aparece)', 'Unidad de medida si es esencial'].map(t => (
                    <li key={t} style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </div>
              <div style={{ padding: '0.9rem 1rem', borderRadius: 12, background: 'rgba(220,38,38,0.07)', border: '1px solid rgba(220,38,38,0.2)' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>✗ Excluir</p>
                <ul style={{ margin: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {['Texto copiado del enunciado', 'Tendencias o comparaciones', 'Números o porcentajes concretos', 'Opiniones o comentarios propios'].map(t => (
                    <li key={t} style={{ fontSize: '0.83rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ── SECCIÓN 2: TÉCNICAS DE PARAPHRASING ──────────────────────── */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Técnicas de Paraphrasing</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { n: '01', title: 'Cambiar el verbo principal', body: 'El verbo "shows" es demasiado simple. Reemplázalo con un sinónimo más académico. Nunca uses "shows" si el enunciado ya lo tiene.' },
              { n: '02', title: 'Cambiar sustantivos clave', body: 'Transforma los sustantivos en sinónimos de registro académico: percentage → proportion, number → figure, people → population/individuals.' },
              { n: '03', title: 'Cambiar la estructura gramatical', body: 'Convierte gerundios en cláusulas relativas: "people using the internet" → "people who had internet access". O usa nominalizaciones: "countries that produce" → "producing countries".' },
            ].map(t => (
              <div key={t.n} style={{ display: 'flex', gap: '1rem', padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 900, fontFamily: 'var(--mono)', color: C, background: `${C}15`, padding: '0.25rem 0.5rem', borderRadius: 6, flexShrink: 0, marginTop: '0.1rem' }}>{t.n}</div>
                <div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--ink)', marginBottom: '0.25rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{t.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Synonym tables */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem', marginBottom: '2.5rem' }}>
            {[
              { title: 'Verbos', rows: VERB_SYNS },
              { title: 'Sustantivos', rows: NOUN_SYNS },
              { title: 'Expresiones de tiempo', rows: TIME_SYNS },
            ].map(tbl => (
              <div key={tbl.title} style={{ padding: '1rem 1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <p style={{ fontSize: '0.68rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.6rem' }}>{tbl.title}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {tbl.rows.map(r => (
                    <div key={r.original} style={{ fontSize: '0.82rem' }}>
                      <span style={{ fontWeight: 700, color: '#dc2626', textDecoration: 'line-through', marginRight: '0.4rem' }}>{r.original}</span>
                      <span style={{ color: 'var(--muted)' }}>→ </span>
                      {r.alts.map((a, i) => (
                        <span key={a}>
                          <span style={{ color: '#059669', fontWeight: 600 }}>{a}</span>
                          {i < r.alts.length - 1 && <span style={{ color: 'var(--muted)', margin: '0 0.25rem' }}>·</span>}
                        </span>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── SECCIÓN 3: EJEMPLOS CON GRÁFICAS ─────────────────────────── */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Ejemplos con gráficas reales</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            Estudia cada gráfica + enunciado y compara la introducción original con las dos versiones parafraseadas. Haz clic en cada ejemplo para expandirlo.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
            {EXAMPLES.map((ex, idx) => {
              const isOpen = activeEx === idx;
              const { Chart } = ex;
              return (
                <div key={ex.id} style={{ borderRadius: 18, border: `1.5px solid ${isOpen ? C : 'var(--line-soft)'}`, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <button
                    onClick={() => setActiveEx(isOpen ? null : idx)}
                    style={{ width: '100%', padding: '1.1rem 1.4rem', background: isOpen ? `${C}08` : 'var(--bg)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem', textAlign: 'left' }}
                  >
                    <span style={{ fontSize: '0.62rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', background: `${C}15`, padding: '0.2rem 0.55rem', borderRadius: 6, flexShrink: 0 }}>Ejemplo {idx + 1}</span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--ink)', flex: 1 }}>{ex.chartType}</span>
                    <span style={{ color: C, fontSize: '1rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'none' }}>▾</span>
                  </button>

                  {isOpen && (
                    <div style={{ padding: '0 1.4rem 1.4rem' }}>
                      {/* Chart */}
                      <div style={{ background: 'var(--bg-2)', borderRadius: 12, padding: '1rem', marginBottom: '1rem', border: '1px solid var(--line-soft)' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>Gráfica del examen</p>
                        <Chart />
                      </div>

                      {/* Original prompt */}
                      <div style={{ padding: '0.9rem 1.1rem', borderRadius: 10, background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: '1rem' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Enunciado original — NO copies esto</p>
                        <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic' }}>&ldquo;{ex.prompt}&rdquo;</p>
                      </div>

                      {/* Model 1 */}
                      <div style={{ padding: '1rem 1.1rem', borderRadius: 10, background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.22)', marginBottom: '0.65rem' }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Introducción modelo A — Band 7+</p>
                        <p style={{ margin: '0 0 0.65rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7 }}>{ex.model1.text}</p>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {ex.model1.changes.map(c => (
                            <span key={c} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.25)', fontFamily: 'var(--mono)' }}>{c}</span>
                          ))}
                        </div>
                      </div>

                      {/* Model 2 */}
                      <div style={{ padding: '1rem 1.1rem', borderRadius: 10, background: `${C}06`, border: `1px solid ${C}22` }}>
                        <p style={{ fontSize: '0.65rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.4rem' }}>Introducción modelo B — alternativa válida</p>
                        <p style={{ margin: '0 0 0.65rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.7 }}>{ex.model2.text}</p>
                        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                          {ex.model2.changes.map(c => (
                            <span key={c} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: `${C}10`, color: C, border: `1px solid ${C}25`, fontFamily: 'var(--mono)' }}>{c}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* ── SECCIÓN 4: PRÁCTICA INTERACTIVA ─────────────────────────── */}
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Práctica interactiva</p>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
            Lee el enunciado y escribe tu propia introducción parafraseada. Luego revela la versión modelo.
          </p>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${((practiceIdx + 1) / PRACTICE.length) * 100}%`, background: C, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{practiceIdx + 1}/{PRACTICE.length}</span>
          </div>

          {/* Prompt */}
          <div className="wl-card" style={{ padding: '1.25rem', borderLeft: `4px solid ${C}`, marginBottom: '0.85rem' }}>
            <p style={{ fontSize: '0.65rem', fontWeight: 800, color: C, fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Enunciado</p>
            <p style={{ margin: 0, fontSize: '0.97rem', lineHeight: 1.7, color: 'var(--ink)', fontStyle: 'italic' }}>&ldquo;{pr.prompt}&rdquo;</p>
          </div>

          {/* Hint */}
          {!revealed && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.25)', marginBottom: '0.85rem', fontSize: '0.84rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>
              <strong style={{ color: '#d97706' }}>Pistas:</strong> {pr.hint}
            </div>
          )}

          {/* Textarea */}
          <div style={{ marginBottom: '0.85rem' }}>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Escribe aquí tu introducción parafraseada (1–2 oraciones, 30–45 palabras)…"
              rows={3}
              style={{ width: '100%', padding: '0.85rem', borderRadius: 10, border: `1.5px solid ${wc > 0 ? C + '55' : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', lineHeight: 1.6, resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.35rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: wc >= 30 && wc <= 45 ? '#059669' : wc > 45 ? '#dc2626' : 'var(--muted)', fontWeight: wc > 0 ? 700 : 400 }}>
                {wc} palabras {wc >= 30 && wc <= 45 ? '✓ longitud ideal' : wc > 45 ? '— un poco larga' : wc > 10 ? '— sigue escribiendo' : ''}
              </span>
              {text.trim().length > 15 && !revealed && (
                <button className="btn btn-sm" onClick={() => setRevealed(true)}>Ver modelo →</button>
              )}
            </div>
          </div>

          {/* Model */}
          {revealed && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem', borderLeft: '3px solid #059669' }}>
                <p style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', margin: '0 0 0.5rem' }}>Introducción modelo</p>
                <p style={{ margin: '0 0 0.65rem', fontSize: '0.95rem', lineHeight: 1.7, color: 'var(--ink)' }}>{pr.model}</p>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {pr.changes.map(c => (
                    <span key={c} style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem', borderRadius: 10, background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.25)', fontFamily: 'var(--mono)' }}>{c}</span>
                  ))}
                </div>
              </div>
              <button className="btn btn-sm" onClick={nextPractice} style={{ alignSelf: 'flex-start' }}>
                {practiceIdx < PRACTICE.length - 1 ? 'Siguiente ejercicio →' : 'Volver al inicio →'}
              </button>
            </div>
          )}

          {/* Next skill */}
          <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <p style={{ margin: '0 0 0.15rem', fontSize: '0.75rem', color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Siguiente sub-habilidad</p>
              <p style={{ margin: 0, fontWeight: 700, color: 'var(--ink)', fontSize: '0.97rem' }}>🔭 Overview — el párrafo más importante del Task 1</p>
            </div>
            <Link href="/practica/ielts/academic/writing/task1/overview" className="btn btn-sm">
              Ir a Overview →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
