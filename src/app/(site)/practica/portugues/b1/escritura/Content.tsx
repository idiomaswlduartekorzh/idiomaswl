'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#059669';

interface WritingTask {
  id: number; title: string; titlePt: string; topic: string;
  prompt: string; model: string;
  criteria: string[]; vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Uma opinião pessoal', titlePt: 'Uma opinião pessoal', topic: 'Subjuntivo + opinião',
    prompt: 'Escribe tu opinión sobre las redes sociales en 5-6 oraciones. Usa "Acredito que...", "É fundamental que...", "Embora..." y el subjuntivo cuando sea necesario.',
    model: 'Acredito que as redes sociais têm um papel ambíguo na sociedade moderna. Por um lado, é fundamental que as pessoas as utilizem com responsabilidade e senso crítico. Por outro lado, é inegável que elas facilitam a comunicação e o acesso à informação. Embora existam riscos como a desinformação e o vício, os benefícios podem superar os problemas quando usadas de forma consciente. É importante que os jovens aprendam a distinguir fontes confiáveis de informação falsa. No meu ponto de vista, a educação digital é a chave para um uso saudável das redes sociais.',
    criteria: ['Usa "Acredito que" o "No meu ponto de vista" para expressar opinión', 'Usa "embora + subjuntivo" para concesión', 'Usa "é fundamental/importante que + subjuntivo" al menos 1 vez', 'Presenta argumentos a favor y en contra', 'Mínimo 5 oraciones completas'],
    vocab: ['Acredito que...', 'No meu ponto de vista...', 'É fundamental que + subjuntivo', 'Embora + subjuntivo', 'Por um lado... Por outro lado...', 'É inegável que...'],
    checklist: ['¿Usaste el subjuntivo después de "é importante/fundamental que"?', '¿Usaste "embora" seguido de subjuntivo?', '¿Presentaste al menos un argumento a favor y uno en contra?', '¿La opinión está claramente expresada?'],
  },
  {
    id: 2, title: 'Um email formal', titlePt: 'Um email formal', topic: 'Condicional de cortesia + voz passiva',
    prompt: 'Escribe un email formal de reclamación. Eres cliente de una empresa y recibiste un producto defectuoso. Usa "Gostaria de informar...", "O problema foi...", voz passiva y condicional de cortesía.',
    model: 'Prezado(a) Senhor(a),\n\nGostaria de informar que recebi o pedido número 45872 no dia 15 de junho, porém o produto chegou com defeito. A tela do notebook foi danificada durante o transporte e a caixa foi entregue em péssimas condições.\n\nGostaria de solicitar a substituição do produto ou o reembolso integral do valor pago. Poderia, por gentileza, me informar qual é o procedimento para a devolução? O produto será enviado de volta assim que eu receber as instruções.\n\nAguardo seu retorno com brevidade.\n\nAtenciosamente,\n[Seu nome]',
    criteria: ['Usa fórmula de saludo formal (Prezado/a)', 'Usa "gostaria de" (condicional de cortesía) al menos 2 veces', 'Usa la voz passiva para describir el problema', 'Explica el problema claramente', 'Incluye solicitud y despedida formal'],
    vocab: ['Gostaria de informar/solicitar...', 'O produto foi/será...', 'Poderia me informar...?', 'Aguardo seu retorno', 'Atenciosamente', 'Em relação ao pedido número...'],
    checklist: ['¿Usaste "Prezado/a" al inicio?', '¿Usaste "gostaria de" en lugar de "quero"?', '¿Describiste el problema con voz passiva?', '¿Pediste una solución concreta?', '¿Terminaste con "Atenciosamente" o similar?'],
  },
  {
    id: 3, title: 'Comparar duas cidades', titlePt: 'Comparar duas cidades', topic: 'Comparativos + pronomes relativos',
    prompt: 'Compara Rio de Janeiro y São Paulo en 5-6 oraciones. Usa "Rio é mais bonito do que...", "a cidade que eu prefiro...", pronomes relativos y comparativos.',
    model: 'Rio de Janeiro e São Paulo são as duas maiores metrópoles do Brasil, mas são muito diferentes entre si. Rio é mais bonito do que São Paulo do ponto de vista natural, pois tem praias e montanhas que tornam a paisagem única no mundo. São Paulo, por outro lado, é maior e mais cosmopolita, sendo a cidade que concentra o maior número de empresas internacionais. Quanto à gastronomia, São Paulo, cuja diversidade culinária é impressionante, oferece restaurantes de mais de 60 países. No que diz respeito ao estilo de vida, eu prefiro o Rio, onde o ritmo é mais tranquilo e as pessoas são mais alegres. No entanto, para trabalho, São Paulo seria minha primeira escolha.',
    criteria: ['Usa al menos 2 comparativos (mais...do que, tão...quanto)', 'Usa al menos 1 pronome relativo (que, onde, cujo/cuja)', 'Compara aspectos diferentes (naturaleza, economía, cultura)', 'Usa conectores (por outro lado, no entanto, quanto a)', 'Mínimo 5 oraciones'],
    vocab: ['___ é mais ___ do que ___', 'a cidade que eu prefiro', 'onde o ritmo é...', 'cujo/cuja ___ é', 'por outro lado', 'no que diz respeito a...'],
    checklist: ['¿Usaste "do que" (no solo "que") en los comparativos formales?', '¿Usaste al menos un pronome relativo?', '¿Comparaste aspectos concretos y diferentes?', '¿La opinión personal está expresada claramente?'],
  },
  {
    id: 4, title: 'Uma escolha difícil', titlePt: 'Uma escolha difícil', topic: 'Condicional + subjuntivo (Se...)',
    prompt: 'Describe una elección hipotética difícil usando el condicional y el subjuntivo. "Se eu pudesse escolher, escolheria..." — ¿Estudiar o trabajar? ¿Vivir en el campo o en la ciudad? Escribe 5-6 oraciones.',
    model: 'Se eu pudesse escolher meu estilo de vida ideal, viveria em uma cidade pequena perto do mar. Trabalharia remotamente para uma empresa internacional e, assim, não precisaria sacrificar a qualidade de vida pelo trabalho. Se ganhasse na loteria, compraria uma casa com jardim e investiria o resto em educação para meus filhos. No entanto, se fosse totalmente honesto, reconheço que viveria em São Paulo porque as oportunidades profissionais são muito maiores lá. A escolha mais difícil seria entre a estabilidade financeira e a felicidade pessoal. Se tivesse que decidir agora, escolheria a felicidade, pois o dinheiro pode ser conquistado com trabalho, mas o tempo perdido não volta.',
    criteria: ['Usa "se + imperfeito do subjuntivo" para hipótese al menos 2 veces', 'Usa el condicional (-ria/-ríamos) para el resultado', 'Describe la elección hipotética con detalle', 'Usa conectores (no entanto, assim, pois)', 'Mínimo 5 oraciones'],
    vocab: ['Se eu pudesse...', 'Se eu tivesse...', 'Se eu fosse...', '...escolheria/viveria/faria', 'No entanto...', 'A escolha mais difícil seria...'],
    checklist: ['¿Usaste "se + imperfeito do subjuntivo" (pudesse, tivesse, fosse)?', '¿El resultado está en condicional (-ria)?', '¿EVITASTE "se + condicional" (error muy común)?', '¿La hipótesis es coherente y bien explicada?'],
  },
  {
    id: 5, title: 'Um evento passado', titlePt: 'Um evento passado', topic: 'Mais-que-perfeito + pretérito perfeito',
    prompt: 'Describe un evento importante de tu vida usando el mais-que-perfeito y el pretérito perfeito. "Quando cheguei, ele já tinha..." Puede ser un viaje, un examen, una celebración. Escribe 5-6 oraciones.',
    model: 'Quando cheguei ao aeroporto para minha primeira viagem internacional, já tinha feito todos os documentos com antecedência. No entanto, descobri que havia esquecido a carteira no táxi. Já tinha comprado os ingressos para todos os museus, mas sem a carteira, não poderia pagar nada. Por sorte, minha amiga, que já tinha chegado antes de mim, me emprestou dinheiro. Quando finalmente embarcamos, o avião já tinha atrasado duas horas. Apesar de tudo, foi a melhor viagem da minha vida porque, no momento em que aterrissei, eu já tinha superado vários desafios e me sentia muito mais confiante.',
    criteria: ['Usa o mais-que-perfeito ("já tinha + particípio") ao menos 3 vezes', 'Usa o pretérito perfeito para as ações principais', 'Narra eventos em ordem cronológica clara', 'Usa marcadores temporais (quando, antes de, no momento em que)', 'Mínimo 5 oraciones'],
    vocab: ['Quando cheguei, já tinha...', 'Havia/tinha + particípio', 'Antes de ___, já tinha...', 'No momento em que...', 'Apesar de tudo,...', 'Por sorte,...'],
    checklist: ['¿Usaste "já tinha + participio" (mais-que-perfeito) al menos 3 veces?', '¿Las acciones principales están en pretérito perfeito?', '¿El orden cronológico es claro?', '¿Usaste "quando" para conectar el mais-que-perfeito con el perfeito?'],
  },
];

export default function EscrituraPortuguesB1() {
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Português B1</Link>
          <span>/</span>
          <button onClick={back} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>✍️ Escrita</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>Tarefa {task.id}</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Tarefa de escrita {task.id} — {task.topic}</p>
        <h2 style={{ fontSize: '1.7rem', margin: '0 0 1.5rem', fontWeight: 700 }}>{task.titlePt}</h2>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>Consigna (español)</div>
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', fontSize: '0.78rem', fontFamily: 'var(--mono)', color: words < 40 ? '#d97706' : '#059669' }}>
          <span>{words} palavras {words < 40 ? '(mínimo recomendado: 50)' : '✓'}</span>
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
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escrita</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Escrita · Português B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Produção escrita B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>5 tarefas guiadas com texto modelo, vocabulário e lista de verificação para o nível B1.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}05`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}18`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}44`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.15rem' }}>{t.titlePt}</div>
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
