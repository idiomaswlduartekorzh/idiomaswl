'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; topic: string;
  prompt: string; promptPt: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Um fim de semana', topic: 'Passado (pretérito perfeito)',
    prompt: 'Escribe 5–6 oraciones sobre lo que hiciste el fin de semana pasado. Usa verbos en pretérito perfeito y marcadores de tiempo como "ontem", "no sábado", "na sexta-feira".',
    promptPt: 'Escreva 5–6 frases sobre o que você fez no fim de semana passado. Use o pretérito perfeito e marcadores temporais.',
    model: 'No fim de semana passado, acordei tarde no sábado. De manhã, fui ao mercado e comprei frutas e legumes frescos. À tarde, encontrei meus amigos no parque e tomamos sorvete. À noite, assistimos a um filme em casa. No domingo, estudei português por duas horas e depois liguei para minha família. Foi um fim de semana muito tranquilo.',
    criteria: ['Usa el pretérito perfeito correctamente (no el presente)', 'Incluye al menos 3 verbos diferentes conjugados', 'Usa marcadores temporais (no sábado, de manhã, à tarde, à noite)', 'La narración tiene orden lógico (sábado → domingo)', 'Mínimo 5 oraciones completas'],
    vocab: ['No fim de semana passado', 'No sábado/domingo', 'De manhã/À tarde/À noite', 'Acordei/Fui/Comi/Encontrei/Assisti', 'depois/em seguida/por fim', 'Foi um/uma ___'],
    checklist: ['¿Todos los verbos están en pretérito perfeito (não em presente)?', '¿Usaste marcadores de tiempo (no sábado, à tarde)?', '¿La narración sigue un orden cronológico?', '¿Mínimo 5 oraciones completas?'],
  },
  {
    id: 2, title: 'Comparar duas coisas', topic: 'Comparativo e superlativo',
    prompt: 'Elige dos ciudades, países, personas o cosas y compáralos en 5–6 oraciones. Usa al menos: mais...do que, tão...quanto, o/a mais, melhor/pior, maior/menor.',
    promptPt: 'Compare duas cidades, países, pessoas ou coisas. Use comparativos e superlativos.',
    model: 'São Paulo é maior do que Rio de Janeiro, mas o Rio é mais bonito do que São Paulo. As praias do Rio são as mais famosas do Brasil. São Paulo é tão importante quanto o Rio para a economia brasileira. Para mim, o Rio de Janeiro é melhor como destino turístico. Mas São Paulo é a cidade mais cosmopolita do país. As duas cidades são essenciais para entender o Brasil.',
    criteria: ['Usa al menos 1 comparativo de superioridade (mais...do que)', 'Usa al menos 1 comparativo de igualdad (tão...quanto)', 'Usa al menos 1 superlativo relativo (o/a mais + de)', 'Usa al menos 1 irregular (melhor, pior, maior, menor)', 'Mínimo 5 oraciones'],
    vocab: ['___ é maior/menor do que ___', 'mais ___ do que', 'tão ___ quanto', 'o/a mais ___ de/do/da ___', 'melhor/pior do que', 'Para mim, ___ é o/a melhor'],
    checklist: ['¿Usaste "do que" (no solo "que") en los comparativos formales?', '¿Usaste "tão...quanto" para la igualdad (no "tan...como")?', '¿Evitaste "mais grande" y usaste "maior"?', '¿Evitaste "mais bom" y usaste "melhor"?'],
  },
  {
    id: 3, title: 'Meus planos futuros', topic: 'Ir + infinitivo + futuro simples',
    prompt: 'Escribe sobre tus planes para el próximo mes o año. Usa "ir + infinitivo" para planes concretos y el futuro simple (-arei/-erá) para compromisos más formales o previsiones distantes.',
    promptPt: 'Escreva sobre seus planos para o próximo mês ou ano. Use "ir + infinitivo" para planos próximos e o futuro simples para compromissos formais.',
    model: 'No próximo mês, vou começar um curso de fotografia que sempre quis fazer. Em março, vou viajar para Curitiba com minha família — já compramos as passagens. No trabalho, irei apresentar um projeto importante em abril. No fim do ano, vou tentar economizar dinheiro para uma viagem ao exterior. Quando terminar o curso de português, farei o CELPE-Bras. Espero que tudo saia bem!',
    criteria: ['Usa "ir + infinitivo" para al menos 3 planes concretos', 'Usa el futuro simples (-rei/-rá) al menos 1 vez', 'Menciona marcadores temporais (próximo mês, em março, no fim do ano)', 'Incluye planes personales, profesionales o de estudios', 'Mínimo 5 oraciones'],
    vocab: ['No próximo mês/ano', 'Vou + infinitivo', 'Em ___ (mes), irei ___', 'Quando ___, farei ___', 'Espero ___', 'Pretendo / Tenho planos de ___'],
    checklist: ['¿Usaste "vou + infinitivo" para los planes próximos/concretos?', '¿Usaste el futuro simple (-rei/-rá) para algo formal o distante?', '¿Incluiste marcadores temporais?', '¿Los verbos están bien conjugados (eu vou, ele irá)?'],
  },
  {
    id: 4, title: 'Dar conselhos', topic: 'Dever/poder + imperativo',
    prompt: 'Un amigo tuyo tiene problemas aprendiendo português o tiene dificultades en el trabajo. Escribe 5–6 oraciones dándole consejos. Usa "você deve", "você pode", "tente" y el imperativo.',
    promptPt: 'Seu amigo tem dificuldades aprendendo português ou no trabalho. Escreva conselhos para ele usando "deve", "pode" e o imperativo.',
    model: 'Se você quer melhorar o seu português, você deve praticar todos os dias — mesmo que seja por 15 minutos. Você pode ouvir músicas brasileiras para acostumar o ouvido ao sotaque. Tente assistir séries em português com legendas. Também deve falar com falantes nativos sempre que puder. Não tenha medo de errar — os erros fazem parte do aprendizado. Se você seguir esses conselhos, vai melhorar muito rapidamente.',
    criteria: ['Usa "você deve" al menos 2 veces', 'Usa "você pode" al menos 1 vez', 'Usa el imperativo al menos 1 vez (Tente, Não tenha, Fale)', 'Los consejos son específicos y prácticos', 'Mínimo 5 oraciones'],
    vocab: ['Você deve ___', 'Você pode ___', 'Tente ___', 'Não tenha medo de ___', 'É importante ___', 'Se você ___, vai ___'],
    checklist: ['¿Usaste "deve" para obligación y "pode" para posibilidad?', '¿El imperativo está en 2ª o 3ª persona (Tente/Não faça)?', '¿Los consejos son concretos y útiles?', '¿Usaste conectores (também, além disso, por fim)?'],
  },
  {
    id: 5, title: 'Um e-mail formal', topic: 'E-mail profissional formal',
    prompt: 'Escribe un email formal en portugués. Elige un contexto: (a) solicitar información sobre un curso, (b) confirmar una entrevista de trabajo, o (c) reclamar por un producto defectuoso. Mínimo 6 oraciones.',
    promptPt: 'Escreva um e-mail formal em português. Escolha um contexto: (a) pedir informações sobre um curso, (b) confirmar uma entrevista ou (c) reclamar de um produto com defeito.',
    model: 'Prezado(a) Diretor(a),\n\nEscrevo para solicitar informações sobre os cursos de português para estrangeiros oferecidos por sua instituição. Gostaria de saber quais são os horários disponíveis, o valor das mensalidades e se há certificação reconhecida ao final do curso.\n\nAlém disso, gostaria de saber se há aula de avaliação de nível antes da matrícula. Aguardo seu retorno e coloco-me à disposição para qualquer esclarecimento.\n\nAtenciosamente,\n[Seu nome]',
    criteria: ['Usa una fórmula de saludo formal (Prezado/a, Caro/a)', 'Usa el motivo del email (Escrevo para...)', 'Usa lenguaje formal (gostaria de, aguardo, solicito)', 'Incluye una conclusión formal (Atenciosamente, Cordialmente)', 'Mínimo 6 oraciones', 'No usa coloquialismos ni emojis'],
    vocab: ['Prezado(a)/Caro(a)', 'Escrevo para ___/Venho por meio deste ___', 'Gostaria de saber ___', 'Solicito ___/Informo que ___', 'Aguardo seu retorno', 'Atenciosamente/Cordialmente'],
    checklist: ['¿Usaste "Prezado(a)" o "Caro(a)" al inicio?', '¿Explicaste el motivo del email formalmente (Escrevo para...)?', '¿Usaste "gostaria" (no "quero") para peticiones formales?', '¿Terminaste con "Atenciosamente" o similar?', '¿Evitaste contracciones coloquiales?'],
  },
];

export default function EscrituraPortuguesA2() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setCheckDone({}); }

  if (submitted && task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
          <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>Texto enviado!</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Registrado para revisão com David ou Zhanna.</p>
          <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
          </div>
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setText(''); setSubmitted(false); setCheckDone({}); }} style={{ background: COLOR, borderColor: COLOR }}>Escrever de novo</button>
            <button className="btn btn-ghost btn-sm" onClick={back}>← Outras tarefas</button>
          </div>
        </div>
      </div>
    </section>
  );

  if (task) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Português A2</Link>
          <span>/</span>
          <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Escrita</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Tarefa {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Tarefa de escrita {task.id} — {task.topic}</p>
        <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.title}</h2>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Consigna (español)</div>
          <p style={{ margin: '0 0 0.5rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Em português</div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.promptPt}</p>
        </div>

        <button onClick={() => setShowModel(s => !s)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1rem', fontSize: '0.82rem' }}>
          {showModel ? '👁 Esconder modelo' : '👁 Ver texto modelo'}
        </button>
        {showModel && (
          <div style={{ padding: '1rem 1.2rem', borderRadius: 12, background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.2)', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#2563eb', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', whiteSpace: 'pre-wrap' }}>{task.model}</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '0.85rem', marginBottom: '1.25rem' }}>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Critérios de avaliação</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.3rem', fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.4 }}>• {c}</p>)}
          </div>
          <div style={{ padding: '0.9rem 1rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Vocabulário útil — clique</div>
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {task.vocab.map((v, i) => (
                <button key={i} onClick={() => setText(p => p ? `${p} ${v}` : v)}
                  style={{ fontSize: '0.72rem', padding: '0.18rem 0.5rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, border: `1px solid ${COLOR}30`, cursor: 'pointer', fontFamily: 'inherit' }}>
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>

        <textarea value={text} onChange={e => setText(e.target.value)} rows={8} placeholder="Escreva seu texto em português aqui..."
          style={{ width: '100%', padding: '1rem 1.1rem', borderRadius: 12, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7, marginBottom: '0.5rem' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 30 ? '#d97706' : '#059669' }}>
          <span>{words} palavras {words < 30 ? '(mínimo recomendado: 40)' : '✓'}</span>
        </div>

        <div style={{ padding: '1rem 1.2rem', borderRadius: 12, border: '1px solid var(--line-soft)', background: 'var(--bg)', marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>Lista de verificação antes de enviar</div>
          {task.checklist.map((item, i) => (
            <button key={i} onClick={() => setCheckDone(p => ({ ...p, [i]: !p[i] }))}
              style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', width: '100%', padding: '0.35rem 0', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', textAlign: 'left' }}>
              <span style={{ fontSize: '1rem', flexShrink: 0 }}>{checkDone[i] ? '✅' : '⬜'}</span>
              <span style={{ fontSize: '0.82rem', color: checkDone[i] ? '#059669' : 'var(--muted)' }}>{item}</span>
            </button>
          ))}
        </div>

        <button className="btn btn-sm" onClick={() => text.trim() && setSubmitted(true)} disabled={!text.trim()}
          style={{ background: COLOR, borderColor: COLOR, opacity: text.trim() ? 1 : 0.5 }}>
          Enviar texto →
        </button>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escrita</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Escrita · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Produção escrita A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 tarefas guiadas com texto modelo, vocabulário e lista de verificação.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.prompt.substring(0, 72)}...</p>
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
