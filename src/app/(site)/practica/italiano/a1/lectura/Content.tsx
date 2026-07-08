'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#009246';

interface ReadingText { id: number; title: string; topic: string; words: number; grammar: string; text: string; vocab: Record<string, string>; goal: string; keyVocab: { w: string; t: string }[]; mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[]; openQ: string; production: string; }

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Mi chiamo Sofia', topic: 'Presentazione', words: 58, grammar: 'Essere + avere · Presente',
    text: 'Ciao! Mi chiamo Sofia. Ho ventitré anni. Sono di Napoli ma abito a Milano. Studio lingue all\'università. Parlo italiano, inglese e un po\' di spagnolo. Ho un gatto di nome Micio. Mi piace leggere e ascoltare musica. La mia canzone preferita è una canzone italiana classica.',
    vocab: { chiamo:'me llamo', anni:'años', abito:'vivo/habito', studio:'estudio', parlo:'hablo', gatto:'gato', piace:'me gusta', leggere:'leer', ascoltare:'escuchar', canzone:'canción', preferita:'favorita', classica:'clásica' },
    goal: 'Lee el texto y averigua: ¿de dónde es Sofia y qué idiomas habla?',
    keyVocab: [
      { w: 'mi chiamo', t: 'me llamo' },
      { w: 'ho ventitré anni', t: 'tengo veintitrés años' },
      { w: 'sono di / abito a', t: 'soy de / vivo en' },
      { w: 'studio lingue', t: 'estudio idiomas' },
      { w: 'parlo', t: 'hablo' },
      { w: 'mi piace', t: 'me gusta' },
    ],
    mcq: [
      { q: '¿Qué significa "mi chiamo"?', cat: 'Vocabulario', opts: ['Me llaman','Me llamo','Yo soy','Mi nombre'], a: 1, fb: '"Mi chiamo" = me llamo (literalmente "me llaman"). Es la forma de presentarse en italiano.' },
      { q: '¿De dónde es Sofia?', cat: 'Comprensión', opts: ['Milano','Roma','Napoli','Firenze'], a: 2, fb: '"Sono di Napoli" — Sofia es de Nápoles pero vive en Milán.' },
      { q: '¿Qué estudia Sofia?', cat: 'Comprensión', opts: ['Medicina','Lingue','Informatica','Arte'], a: 1, fb: '"Studio lingue all\'università" — Sofia estudia lenguas en la universidad.' },
      { q: '¿Cuántos idiomas habla Sofia?', cat: 'Comprensión', opts: ['1','2','3','4'], a: 2, fb: '"Parlo italiano, inglese e un po\' di spagnolo" — habla 3 idiomas.' },
      { q: '"Mi piace leggere" — "piace" es la forma de...', cat: 'Gramática', opts: ['Essere (yo)','Piacere con singular/infinitivo','Avere (él/ella)','Fare con plural'], a: 1, fb: '"Mi piace" se usa con singular o infinitivo. "Mi piacciono" se usa con plural. Piace = gusta.' },
    ],
    openQ: 'Preséntate en italiano en 3–4 oraciones. Usa: "Mi chiamo...", "Ho ___ anni", "Sono di...", "Mi piace..."',
    production: 'Usa "mi chiamo", "ho anni", "sono di" y "mi piace/mi piacciono".',
  },
  {
    id: 2, title: 'La famiglia di Marco', topic: 'La famiglia', words: 62, grammar: 'Aggettivi + essere · Pronomi',
    text: 'Marco ha una famiglia grande. Sua madre si chiama Anna. Lei è medica e lavora in un ospedale. Suo padre si chiama Luigi. Lui è insegnante di matematica. Marco ha due sorelle: Chiara e Giulia. Chiara ha diciotto anni e studia all\'università. Giulia ha quindici anni e va al liceo. Tutta la famiglia abita in una casa grande a Roma.',
    vocab: { famiglia:'familia', grande:'grande/numerosa', madre:'madre', medica:'médica', lavora:'trabaja', ospedale:'hospital', padre:'padre', insegnante:'maestro/a', sorelle:'hermanas', studia:'estudia', liceo:'bachillerato/secundaria', tutta:'toda', abita:'vive/habita' },
    goal: 'Lee el texto y averigua: ¿a qué se dedican los padres de Marco y cuántas hermanas tiene?',
    keyVocab: [
      { w: 'famiglia', t: 'familia' },
      { w: 'madre / padre', t: 'madre / padre' },
      { w: 'medica', t: 'médica' },
      { w: 'insegnante', t: 'maestro/a' },
      { w: 'sorelle', t: 'hermanas' },
      { w: 'sua / suo', t: 'su (concuerda con el objeto)' },
    ],
    mcq: [
      { q: '¿Qué significa "insegnante"?', cat: 'Vocabulario', opts: ['Estudiante','Maestro/a','Doctor/a','Abogado/a'], a: 1, fb: '"Insegnante" = maestro/a, profesor/a. Viene de "insegnare" = enseñar.' },
      { q: '¿De qué trabaja la madre de Marco?', cat: 'Comprensión', opts: ['Insegnante','Avvocata','Medica','Ingegnere'], a: 2, fb: '"Sua madre è medica" — la mamá de Marco es médica.' },
      { q: '¿Dónde vive la familia?', cat: 'Comprensión', opts: ['Milano','Firenze','Napoli','Roma'], a: 3, fb: '"Tutta la famiglia abita in una casa grande a Roma."' },
      { q: '¿Cuántos años tiene Chiara?', cat: 'Comprensión', opts: ['15','16','17','18'], a: 3, fb: '"Chiara ha diciotto anni" — diciotto = 18.' },
      { q: '"Sua madre" y "Suo padre" — ¿por qué cambia su/sua?', cat: 'Gramática', opts: ['Varía por el sexo del poseedor', 'Varía por el género del sustantivo poseído', 'Varía por el número', 'No hay regla'], a: 1, fb: 'En italiano, los posesivos concuerdan con el sustantivo poseído: "madre" (fem.) → sua; "padre" (masc.) → suo.' },
    ],
    openQ: 'Describe a dos miembros de tu familia en 4 oraciones. Usa: "Mio/Mia ___ si chiama ___, ha ___ anni ed è ___."',
    production: 'Usa "mio padre/mia madre/mio fratello/mia sorella" y "è" para la profesión.',
  },
  {
    id: 3, title: 'Il mio appartamento', topic: 'La casa', words: 65, grammar: "C'è · Ci sono · Preposizioni",
    text: 'Abito in un appartamento al secondo piano. Il mio appartamento non è grande, ma è molto comodo. Ci sono tre stanze: una cucina, un soggiorno e una camera da letto. In cucina c\'è un frigorifero nuovo e una piccola tavola. In soggiorno ci sono un divano, una libreria e una televisione. La camera da letto è tranquilla. Accanto al palazzo c\'è un bel parco.',
    vocab: { appartamento:'apartamento', piano:'piso/planta', comodo:'cómodo', stanze:'habitaciones', cucina:'cocina', soggiorno:'sala/salón', camera:'habitación/cuarto', frigorifero:'refrigerador/nevera', piccola:'pequeña', tavola:'mesa', divano:'sofá', libreria:'estantería', tranquilla:'tranquila', palazzo:'edificio', parco:'parque' },
    goal: 'Lee el texto y averigua: ¿cuántas habitaciones tiene el apartamento y qué hay al lado del edificio?',
    keyVocab: [
      { w: 'c’è / ci sono', t: 'hay (singular / plural)' },
      { w: 'stanze', t: 'habitaciones' },
      { w: 'cucina / soggiorno', t: 'cocina / sala' },
      { w: 'camera da letto', t: 'dormitorio' },
      { w: 'frigorifero', t: 'nevera' },
      { w: 'accanto al', t: 'al lado del' },
    ],
    mcq: [
      { q: '¿Qué significa "frigorifero"?', cat: 'Vocabulario', opts: ['Congelador','Horno','Refrigerador/nevera','Lavavajillas'], a: 2, fb: '"Frigorifero" = nevera/refrigerador (de "frigoris" = frío en latín).' },
      { q: '¿Cuántas habitaciones tiene el apartamento?', cat: 'Comprensión', opts: ['2','3','4','5'], a: 1, fb: '"Ci sono tre stanze: una cucina, un soggiorno e una camera da letto."' },
      { q: '¿Qué hay al lado del edificio?', cat: 'Comprensión', opts: ['Un mercato','Una scuola','Un ospedale','Un parco'], a: 3, fb: '"Accanto al palazzo c\'è un bel parco" — hay un bonito parque al lado del edificio.' },
      { q: '¿Qué hay en el soggiorno?', cat: 'Comprensión', opts: ['Solo un divano','Un divano e una tv','Un divano, libreria e tv','Un letto'], a: 2, fb: '"In soggiorno ci sono un divano, una libreria e una televisione."' },
      { q: '"C\'è un frigorifero" vs "Ci sono stanze" — ¿cuál es la regla?', cat: 'Gramática', opts: ['"C\'è" siempre', '"Ci sono" siempre', '"C\'è" singular, "ci sono" plural', 'Son intercambiables'], a: 2, fb: '"C\'è" (= c\'è = ci è) para singular: c\'è un gatto. "Ci sono" para plural: ci sono gatti. Igual que "hay" en español, que no varía.' },
    ],
    openQ: 'Describe tu cuarto o tu casa en 4 oraciones usando "c\'è", "ci sono" y preposiciones de lugar.',
    production: 'Usa: "In camera mia c\'è...", "Ci sono...", "Sul/Nella..." para describir objetos y su ubicación.',
  },
  {
    id: 4, title: 'Cosa mangio di solito', topic: 'Il cibo', words: 60, grammar: 'Verbi -ARE · Frequenza',
    text: 'Amo il cibo italiano! La mia colazione preferita è un cornetto e un cappuccino. A pranzo di solito mangio pasta al pomodoro o pizza. Non mi piacciono molto le verdure, ma mangio sempre frutta. Le mie frutta preferite sono le arance e le fragole. La sera ceno con la mia famiglia. La domenica cuciniamo tutti insieme un risotto o una lasagna. Non mangio mai fast food.',
    vocab: { colazione:'desayuno', cornetto:'croissant', cappuccino:'capuchino', pranzo:'almuerzo', mangio:'como', pasta:'pasta', pomodoro:'tomate', verdure:'verduras', sempre:'siempre', frutta:'fruta', fragole:'fresas', ceno:'ceno', cuciniamo:'cocinamos', insieme:'juntos', mai:'nunca' },
    goal: 'Lee el texto y averigua: ¿qué almuerza normalmente y qué no come nunca?',
    keyVocab: [
      { w: 'colazione', t: 'desayuno' },
      { w: 'a pranzo', t: 'en el almuerzo' },
      { w: 'verdure / frutta', t: 'verduras / fruta' },
      { w: 'sempre / mai', t: 'siempre / nunca' },
      { w: 'non mi piacciono', t: 'no me gustan' },
      { w: 'cuciniamo', t: 'cocinamos' },
    ],
    mcq: [
      { q: '¿Qué es un "cornetto"?', cat: 'Vocabulario', opts: ['Panecillo de maíz','Croissant/medialuna','Torta','Galleta'], a: 1, fb: '"Cornetto" = croissant/medialuna. Es el desayuno típico italiano junto al cappuccino.' },
      { q: '¿Qué come de almuerzo habitualmente?', cat: 'Comprensión', opts: ['Pizza solamente','Pasta al pomodoro o pizza','Risotto','Fast food'], a: 1, fb: '"A pranzo di solito mangio pasta al pomodoro o pizza."' },
      { q: '¿Cuándo cena con la familia?', cat: 'Comprensión', opts: ['Solo la domenica','Ogni sera','Solo il sabato','Raramente'], a: 1, fb: '"La sera ceno con la mia famiglia" — cena con la familia cada tarde.' },
      { q: '¿Qué nunca come?', cat: 'Comprensión', opts: ['Frutta','Verdure','Fast food','Pasta'], a: 2, fb: '"Non mangio mai fast food" — mai = nunca. Nunca come fast food.' },
      { q: '"Non mangio mai" — "mai" es un adverbio de...', cat: 'Gramática', opts: ['Luogo (lugar)','Tempo (tiempo)','Frequenza (frecuencia)','Modo (modo)'], a: 2, fb: '"Mai" = nunca, es un adverbio de frecuencia. Escala: sempre → di solito → a volte → raramente → mai.' },
    ],
    openQ: 'Escribe 4 oraciones sobre tu alimentación usando: "Mi piace/piacciono", "Non mi piace/piacciono", "Di solito mangio/bevo..." y al menos un adverbio de frecuencia.',
    production: 'Usa: sempre / di solito / a volte / raramente / mai + verbo en presente.',
  },
  {
    id: 5, title: 'La mia giornata', topic: 'Routine quotidiana', words: 63, grammar: 'Verbi riflessivi · Espressioni di tempo',
    text: 'Mi alzo alle sette di mattina. Faccio la doccia e poi faccio colazione. Prendo un caffè e mangio un po\' di pane con la marmellata. Alle otto e mezzo prendo il tram per andare al lavoro. Lavoro in un ufficio nel centro della città. Finisco di lavorare alle sei di sera. La sera guardo la televisione o esco con gli amici. Vado a letto alle undici.',
    vocab: { alzo:'levanto (me levanto)', doccia:'ducha', colazione:'desayuno', pane:'pan', marmellata:'mermelada', tram:'tranvía', lavoro:'trabajo/trabajar', ufficio:'oficina', centro:'centro', finisco:'termino', esco:'salgo', amici:'amigos', letto:'cama', undici:'once' },
    goal: 'Lee el texto y averigua: ¿a qué hora se levanta y cómo va al trabajo?',
    keyVocab: [
      { w: 'mi alzo', t: 'me levanto' },
      { w: 'faccio la doccia', t: 'me ducho' },
      { w: 'prendo il tram', t: 'tomo el tranvía' },
      { w: 'lavoro / ufficio', t: 'trabajo / oficina' },
      { w: 'finisco', t: 'termino' },
      { w: 'vado a letto', t: 'me voy a la cama' },
    ],
    mcq: [
      { q: '¿Qué significa "mi alzo"?', cat: 'Vocabulario', opts: ['Me duermo','Me levanto','Me ducho','Me desayuno'], a: 1, fb: '"Mi alzo" = me levanto. "Alzarsi" es un verbo reflexivo: mi alzo, ti alzi, si alza...' },
      { q: '¿A qué hora toma el tram?', cat: 'Comprensión', opts: ['Alle 7','Alle 7:30','Alle 8:00','Alle 8:30'], a: 3, fb: '"Alle otto e mezzo" = a las ocho y media (8:30).' },
      { q: '¿Dónde trabaja?', cat: 'Comprensión', opts: ['In periferia','In centro città','A casa','All\'università'], a: 1, fb: '"Lavoro in un ufficio nel centro della città" — trabaja en una oficina en el centro.' },
      { q: '¿A qué hora va a dormir?', cat: 'Comprensión', opts: ['Alle 10','Alle 11','Alle 12','Alle 9'], a: 1, fb: '"Vado a letto alle undici" — se acuesta a las once (23:00).' },
      { q: '"Mi alzo" — la partícula "mi" indica que...', cat: 'Gramática', opts: ['El sujeto es "mi" (mío)', 'El verbo es reflexivo (acción sobre sí mismo)', 'Es negación', 'Es pasado'], a: 1, fb: '"Mi alzo" = me levanto. Los verbos reflexivos italianos usan pronombres reflexivos (mi, ti, si, ci, vi, si) para indicar que la acción recae sobre el sujeto.' },
    ],
    openQ: 'Describe tu rutina diaria en 5 oraciones. Usa verbos reflexivos si sabes alguno, expresiones de tiempo (alle, di mattina, la sera) y conectores (poi, dopo, quindi).',
    production: 'Usa: "Mi alzo alle...", "Poi...", "Alle ... prendo/vado", "La sera...".',
  },
];

function tokenize(text: string) {
  return text.split(/(\s+|[.,!?']+)/).filter(Boolean).map(t => ({
    raw: t, isSpace: /^\s+$/.test(t), isPunct: /^[.,!?']+$/.test(t),
    clean: t.replace(/[^a-zA-ZàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚ]/g, '').toLowerCase(),
  }));
}

function MCQItem({ q, qi, answers, onAnswer }: { q: ReadingText['mcq'][0]; qi: number; answers: Record<number, number>; onAnswer: (qi: number, oi: number) => void; }) {
  const ans = answers[qi]; const done = ans !== undefined;
  return (
    <div className="wl-card" style={{ padding: '1.25rem' }}>
      <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{q.cat} · Domanda {qi + 1}</div>
      <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
        {q.opts.map((opt, oi) => {
          const isCorrect = oi === q.a; const isSelected = ans === oi;
          let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
          if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
          return (
            <button key={oi} onClick={() => onAnswer(qi, oi)} disabled={done}
              style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55, flexShrink: 0 }}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
              {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
              {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
            </button>
          );
        })}
      </div>
      {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
    </div>
  );
}

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = tokenize(t.text);
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← Tutti i testi</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Testo {t.id} / 5 — {t.title}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>📝 {t.words} parole · {t.grammar}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Pre-lettura', 'Lettura', 'Domande', 'Risultato'];
          const current = phase === p;
          const phaseOrder = ['pre','read','questions','done'];
          const past = phaseOrder.indexOf(p) < phaseOrder.indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Prima di leggere — preparati</p>
          {/* Objetivo de lectura */}
          <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: `${COLOR}12`, border: `1px solid ${COLOR}33`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.66rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🎯 Tu objetivo</div>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.55 }}>{t.goal}</p>
          </div>
          {/* Vocabulario clave */}
          <div style={{ fontSize: '0.66rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>📚 Vocabulario clave — apréndelo antes de leer</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {t.keyVocab.map((kv, i) => (
              <div key={i} style={{ padding: '0.6rem 0.85rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.9rem' }}>{kv.w}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{kv.t}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')}>Pronto — vai al testo →</button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{t.title} — tocca una parola per vedere la traduzione</p>
          <div style={{ lineHeight: 2.1, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => { setActiveWord(t.vocab[tk.clean] ?? null); setActiveIdx(i); }}
                    style={{ background: isActive ? 'rgba(0,146,70,0.12)' : hasTrans ? 'rgba(0,146,70,0.06)' : 'transparent', border: isActive ? '1.5px solid #009246' : hasTrans ? '1px dashed rgba(0,146,70,0.3)' : 'none', borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default', fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? '#009246' : 'inherit', fontWeight: isActive ? 700 : 'inherit' }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: activeWord ? '#006633' : '#6f7691', color: '#fff', borderRadius: 8, padding: '0.28rem 0.6rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 16px rgba(0,102,51,0.25)', marginTop: 4 }}>
                      {activeWord ?? '(parola funzionale)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>Ho letto → Rispondere alle domande</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Pre-lettura</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Tornare al testo</button>
          {t.mcq.map((q, qi) => (
            <MCQItem key={qi} q={q} qi={qi} answers={answers} onAnswer={(qi, oi) => { if (answers[qi] !== undefined) return; setAnswers(p => ({ ...p, [qi]: oi })); }} />
          ))}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Produzione libera</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4} placeholder="Scrivi qui la tua risposta in italiano..." style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')}>Vedere il risultato →</button>}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} corrette</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem', maxWidth: 380, marginLeft: 'auto', marginRight: 'auto' }}>
            {score === t.mcq.length ? 'Perfetto! Hai capito tutto il testo.' : score >= 3 ? 'Molto bene. Ripassala le domande sbagliate.' : 'Torna al testo e cercala le risposte nel contesto.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>LA TUA PRODUZIONE LIBERA</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Riprovare</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Scegliere un altro testo</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaItalianoA1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lettura</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Lettura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Lettura · Italiano A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lettura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 testi progressivi. Ogni testo ha pre-lettura, vocabolario interattivo, domande adattive e produzione libera.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `linear-gradient(135deg, rgba(0,146,70,0.04) 0%, transparent 100%)` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.words} parole · Gramática: {t.grammar} · {t.mcq.length} domande + produzione libera</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
