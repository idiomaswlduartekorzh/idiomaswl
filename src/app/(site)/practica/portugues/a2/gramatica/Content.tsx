'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#7c3aed';

interface GQItem { s: string; opts: string[]; a: number; fb: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: GQItem[]; }

const TOPICS: Topic[] = [
  {
    id: 'preterito_perfeito_imperfeito', title: 'Pretérito perfeito vs imperfeito', icon: '⏰',
    desc: 'Pretérito perfeito: ações concluídas em um momento específico do passado ("Ontem, fui ao mercado"). Pretérito imperfeito: ações habituais no passado ("Quando era criança, ia à praia todo verão") ou descrições de estados/situações passadas ("A casa era grande / Chovia muito").',
    tip: 'Marcadores do perfeito: ontem, semana passada, em 2020, de repente, uma vez. Marcadores do imperfeito: sempre, todos os dias, quando era criança, naquela época, às vezes, geralmente.',
    qs: [
      { s:'Quando era criança, eu ___ (brincar) na rua todos os dias.', opts:['brincava','brinquei','brinco','brincarei'], a:0, fb:'"Brincava" — pretérito imperfeito para hábito passado. "Quando era criança + todos os dias" = ação repetida → imperfeito.' },
      { s:'Ontem, nós ___ (ir) ao cinema.', opts:['fomos','íamos','vamos','foram'], a:0, fb:'"Fomos" — pretérito perfeito para ação concluída em momento específico. "Ontem" = marcador de perfeito.' },
      { s:'Ela ___ (dormir) quando o telefone tocou.', opts:['dormia','dormiu','dorme','dormirá'], a:0, fb:'"Dormia" — imperfeito para ação em progresso interrompida. O pretérito perfeito (tocou) interrompe a ação contínua (dormia).' },
      { s:'Eles ___ (chegar) na festa às 22h.', opts:['chegaram','chegavam','chegam','chegarão'], a:0, fb:'"Chegaram" — perfeito para ação pontual e concluída (chegaram = chegada única naquele momento).' },
      { s:'Antes, eu ___ (tomar) café toda manhã. Agora prefiro chá.', opts:['tomava','tomei','tomo','tomarei'], a:0, fb:'"Tomava" — imperfeito para hábito passado que não existe mais. "Antes... agora" = contraste entre passado habitual e presente.' },
      { s:'O apartamento ___ (ser) pequeno mas muito aconchegante.', opts:['era','foi','é','será'], a:0, fb:'"Era" — imperfeito para descrição de estado passado. Descrever como a coisa era → imperfeito.' },
      { s:'No ano passado, eles ___ (viajar) para o Nordeste.', opts:['viajaram','viajavam','viajam','viajarão'], a:0, fb:'"Viajaram" — perfeito para ação concluída. "No ano passado" = tempo específico → perfeito.' },
      { s:'Quando eu ___ (ter) 10 anos, adorava assistir desenhos animados.', opts:['tinha','tive','tenho','terei'], a:0, fb:'"Tinha" — imperfeito de "ter". Em "quando + imperfeito" expressamos a idade/situação passada como contexto.' },
      { s:'De repente, ela ___ (lembrar) do nome do professor.', opts:['lembrou','lembrava','lembra','lembrará'], a:0, fb:'"Lembrou" — perfeito para ação súbita e pontual. "De repente" é marcador clássico de ação pontual → perfeito.' },
      { s:'Todas as sextas, a família ___ (jantar) junta no restaurante.', opts:['jantava','jantou','janta','jantará'], a:0, fb:'"Jantava" — imperfeito para hábito regular passado. "Todas as sextas" = frequência repetida → imperfeito.' },
    ],
  },
  {
    id: 'pronomes_obliquos', title: 'Pronomes oblíquos átonos: posição e uso', icon: '🔗',
    desc: 'Pronomes átonos: me/te/o/a/nos/os/as (substituem o objeto direto) e me/te/lhe/nos/lhes (objeto indireto). Posição no PB (Português Brasileiro): em frases afirmativas, antes do verbo é mais natural ("Eu te ligo"); em negativas e com pronomes oblíquos, antes do verbo ("Não te vi / Eu não o conheço").',
    tip: 'No Brasil, é muito comum usar os pronomes ANTES do verbo na linguagem coloquial: "Eu te amo" (não "Amo-te"). Em contexto formal/escrito: "O diretor chamou-me." Para o CELPE-Bras, conhecer as duas posições é essencial.',
    qs: [
      { s:'Você viu a Maria hoje? — Não, não ___ vi.', opts:['a','ela','lhe','la'], a:0, fb:'"Não a vi" — pronome oblíquo átono de 3ª pessoa feminina (objeto direto). "Ver alguém" = objeto direto → a/o.' },
      { s:'Ela ___ contou tudo sobre a viagem. (a mim)', opts:['me','a mim','lhe','se'], a:0, fb:'"Ela me contou" — "me" = pronome de 1ª pessoa, objeto indireto. "Contar a alguém" = objeto indireto → me/te/lhe.' },
      { s:'Preciso comprar um presente. Vou ___ comprar amanhã.', opts:['o','ele','lhe','se'], a:0, fb:'"Vou o comprar" / mais natural no Brasil: "Vou comprar ele". Formalmente: objeto direto masculino → o.' },
      { s:'Vocês ___ telefonaram ontem à noite? (a nós)', opts:['nos','lhes','a nós','se'], a:0, fb:'"Vocês nos telefonaram" — "nos" = pronome de 1ª pessoa plural. "Telefonar a alguém" = objeto indireto → nos.' },
      { s:'___ (te) ajudei com o relatório.', opts:['Te','Lhe','Se','O'], a:0, fb:'"Te ajudei" — "te" = 2ª pessoa singular. No Brasil, o pronome vai antes do verbo na língua coloquial.' },
      { s:'O professor ___ explicou a matéria muito bem. (aos alunos)', opts:['lhes','os','as','se'], a:0, fb:'"O professor lhes explicou" — "lhes" = pronome de 3ª pessoa plural (objeto indireto). "Explicar a alguém" = OI → lhes.' },
      { s:'Ele prometeu ___ um presente. (a ela)', opts:['lhe','a','o','se'], a:0, fb:'"Ele prometeu lhe um presente" / "prometeu a ela". "Prometer a alguém" = objeto indireto → lhe (singular).' },
      { s:'Não ___ conheço bem ainda. (você)', opts:['te','lhe','o','se'], a:0, fb:'"Não te conheço" — em frase negativa, o pronome fica antes do verbo (próclise). "Conhecer alguém" = objeto direto → te.' },
      { s:'A diretora ___ chamou para uma reunião. (a mim e a você)', opts:['nos','lhes','me','se'], a:0, fb:'"A diretora nos chamou" — "nos" = 1ª pessoa plural. "Chamar alguém" = objeto direto → nos.' },
      { s:'Ela quer ___ falar algo importante. (a você)', opts:['te','lhe','a você','se'], a:0, fb:'"Ela quer te falar" (coloquial BR) / "Ela quer lhe falar" (mais formal). Ambos são aceitos no CELPE-Bras.' },
    ],
  },
  {
    id: 'ser_vs_estar', title: 'Ser vs. Estar: identidade e estado', icon: '🔵',
    desc: 'SER: identidade permanente (profissão, origem, características essenciais, material, relações). ESTAR: estados temporários (emoções, localização, condições físicas passageiras). Dica de ouro: "Ela é bonita" (característica) vs "Ela está bonita hoje" (estado passageiro/como ela está naquele dia).',
    tip: 'Atenção especial: localização. Com SER: eventos ou coisas fixas ("A reunião É na sala 3 / A farmácia É na esquina"). Com ESTAR: onde uma pessoa ou coisa está num momento ("Onde ESTÁ o João? ESTÁ no trabalho"). Emoções → SEMPRE estar: estou feliz/triste/com fome/cansado.',
    qs: [
      { s:'Ela ___ médica e trabalha no hospital público.', opts:['é','está','fica','tem'], a:0, fb:'"É médica" — profissão permanente = SER. A profissão é parte da identidade, não muda diariamente.' },
      { s:'Você ___ muito cansado hoje. Vai dormir cedo.', opts:['está','é','fica','tem'], a:0, fb:'"Está cansado" — estado temporário = ESTAR. O cansaço é passageiro, não permanente.' },
      { s:'O Brasil ___ na América do Sul.', opts:['fica/é','está','tem','fica'], a:0, fb:'"O Brasil fica/é na América do Sul" — localização geográfica permanente pode usar ambos, mas "fica" é preferido para localização permanente de lugares.' },
      { s:'Onde ___ o seu celular? Não está na mesa.', opts:['está','é','fica','tem'], a:0, fb:'"Onde está o celular?" — localização de objeto no momento = ESTAR. "Está na mesa" = localização atual.' },
      { s:'Esta cadeira ___ de madeira.', opts:['é','está','fica','tem'], a:0, fb:'"É de madeira" — material ou composição = SER permanente. A cadeira não muda de material.' },
      { s:'Ela ___ muito feliz com a promoção que recebeu.', opts:['está','é','fica','tem'], a:0, fb:'"Está feliz" — emoção passageira = ESTAR. A felicidade neste momento é um estado temporário.' },
      { s:'O João ___ de Minas Gerais, mas mora em São Paulo.', opts:['é','está','fica','tem'], a:0, fb:'"É de Minas Gerais" — origem permanente = SER. A origem não muda nunca.' },
      { s:'A sopa ___ fria! Você pode quentar de novo?', opts:['está','é','fica','tem'], a:0, fb:'"A sopa está fria" — estado temporário = ESTAR. A sopa pode ser aquecida, o frio é passageiro.' },
      { s:'Nós ___ professores de matemática há cinco anos.', opts:['somos','estamos','ficamos','temos'], a:0, fb:'"Somos professores" — profissão = SER. Identidade profissional permanente.' },
      { s:'Você ___ pronto para a apresentação?', opts:['está','é','fica','tem'], a:0, fb:'"Você está pronto?" — estado preparatório passageiro = ESTAR. "Estar pronto" = estado neste momento.' },
    ],
  },
  {
    id: 'comparativo_superlativo', title: 'Comparativo e superlativo em português', icon: '📊',
    desc: 'Comparativo: mais...do que (superioridade), menos...do que (inferioridade), tão...quanto (igualdade). Superlativo: o/a mais + adj + de (relativo), muito + adj (absoluto sintético). Irregulares: bom → melhor/o melhor, mau → pior/o pior, grande → maior/o maior, pequeno → menor/o menor.',
    tip: 'No português brasileiro coloquial, "que" substitui "do que" frequentemente: "Ele é mais alto que eu". Atenção: "O João é maior que o Pedro" (tamanho OU idade) — "maior" é irregular de "grande". Nunca "mais grande"!',
    qs: [
      { s:'O Brasil é ___ país da América do Sul.', opts:['o maior','o mais grande','mais grande','o maior de'], a:0, fb:'"O maior país" — superlativo irregular de "grande". NUNCA "o mais grande". "Maior" = superlativo de grande.' },
      { s:'Este livro é ___ interessante ___ o primeiro.', opts:['mais / do que','mais / de','o mais / de','menos / que'], a:0, fb:'"Mais interessante do que" — comparativo de superioridade. Estrutura: mais + adj + do que.' },
      { s:'Ela é ___ alta ___ a irmã.', opts:['tão / quanto','mais / que','menos / de','o mais / de'], a:0, fb:'"Tão alta quanto" — comparativo de igualdade. Estrutura: tão + adj + quanto.' },
      { s:'Este restaurante é ___ caro ___ o outro.', opts:['menos / do que','menos / de','mais / que','o menos / de'], a:0, fb:'"Menos caro do que" — comparativo de inferioridade. Estrutura: menos + adj + do que.' },
      { s:'O café da manhã é a refeição ___ importante do dia.', opts:['mais','o mais','muito','maior'], a:1, fb:'"A refeição mais importante do dia" — superlativo relativo. Estrutura: o/a + mais + adj + de.' },
      { s:'Este resultado é muito ___. Era para ser melhor.', opts:['pior','mais mau','muito mau','mais ruim'], a:0, fb:'"Muito pior" OU "muito ruim" — comparativo/absoluto de "mau". "Pior" é o comparativo irregular de "mau".' },
      { s:'Ela canta ___ do que eu imaginava.', opts:['melhor','mais bem','muito bem','maior'], a:0, fb:'"Melhor" — comparativo irregular de "bem" (adv.) e "bom" (adj). Nunca "mais bem" em português padrão.' },
      { s:'Este apartamento é ___ do que parece nas fotos.', opts:['menor','mais pequeno','menos grande','o menor'], a:0, fb:'"Menor" — comparativo irregular de "pequeno". Nunca "mais pequeno" em português brasileiro padrão.' },
      { s:'Essa solução é ___ eficiente ___ a anterior.', opts:['tão / quanto','mais / de','menos / que','o mais / de'], a:0, fb:'"Tão eficiente quanto" — igualdade. As duas soluções têm o mesmo nível de eficiência.' },
      { s:'São Paulo é ___ cidade ___ populosa do Brasil.', opts:['a / mais','o / mais','a / maior','o / maior'], a:0, fb:'"A cidade mais populosa do Brasil" — superlativo relativo. "Populosa" é adjetivo regular → mais populosa (não mais população).' },
    ],
  },
  {
    id: 'futuro', title: 'Futuro do presente vs ir + infinitivo', icon: '🔮',
    desc: 'Ir + infinitivo: plano imediato ou intencional no falar coloquial brasileiro ("Vou ligar para você amanhã" — decidi agora ou já planejei). Futuro do presente (-arei/-erá/-iremos): usado em escrita formal, promessas solenes, previsões distantes ("O relatório será entregue na sexta-feira").',
    tip: 'No Brasil, "ir + infinitivo" domina completamente a fala cotidiana. O futuro simples é muito formal. Na escrita profissional ou acadêmica, prefira o futuro simples. Para o CELPE-Bras: use ir + inf. em produção oral e ambos na escrita.',
    qs: [
      { s:'Espera, eu ___ te ajudar com as malas.', opts:['vou','ajudarei','irei','vou ir'], a:0, fb:'"Vou te ajudar" — ir + infinitivo para decisão/ação imediata. Uso natural do falante nativo brasileiro.' },
      { s:'Em 2050, as energias renováveis ___ nosso planeta.', opts:['salvarão','vão salvar','salvam','salvaram'], a:0, fb:'"Salvarão" — futuro simples para previsão distante e formal. "Em 2050" = horizonte longínquo → futuro simples.' },
      { s:'Essa noite, nós ___ ao show — os ingressos já foram comprados.', opts:['vamos ir','iremos','fomos','vamos'], a:0, fb:'"Vamos ir" (ir + ir + inf.) — plano concreto já organizado. No Brasil coloquial: plano confirmado → ir + inf.' },
      { s:'Ela ___ terminar o projeto até sexta.', opts:['vai','irá','irão','vão'], a:0, fb:'"Ela vai terminar" — ir + infinitivo para plano futuro próximo. Forma mais natural na fala brasileira.' },
      { s:'O relatório ___ entregue ao diretor na próxima segunda.', opts:['será','vai ser','é','foi'], a:0, fb:'"Será entregue" — futuro simples formal + voz passiva. Contexto profissional/formal → futuro simples.' },
      { s:'Quando você ___ em Curitiba, ligue para mim.', opts:['estiver','vai estar','está','estará'], a:0, fb:'"Quando você estiver" — após "quando" + situação futura, usa-se o FUTURO DO SUBJUNTIVO ("estiver"), não o presente.' },
      { s:'Eu ___ estudar mais para o próximo exame — já comprei os livros.', opts:['vou','estudarei','estudo','irei'], a:0, fb:'"Vou estudar" — plano concreto com preparação (livros comprados). Ir + inf. para plano imediato.' },
      { s:'As temperaturas ___ subir nos próximos anos, segundo os cientistas.', opts:['vão','irão','irá','vai'], a:0, fb:'"As temperaturas vão subir" — previsão científica próxima/concreta. "Ir + inf." é usado até em previsões quando são concretas.' },
      { s:'Nós ___ mudar de casa no mês que vem — já assinamos o contrato.', opts:['vamos','iremos','mudamos','vão'], a:0, fb:'"Vamos mudar" — plano concreto com contrato assinado. Ir + inf. = plano confirmado no coloquial brasileiro.' },
      { s:'Segundo as previsões, o PIB ___ crescer 3% este ano.', opts:['deverá','vai','ira','será'], a:0, fb:'"Deverá crescer" — futuro formal em contexto econômico/oficial. "Deverá" (de dever) exprime previsão oficial.' },
    ],
  },
];

export default function GramaticaPortuguesA2() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});
  const [showResult, setShowResult] = useState(false);

  const topic = TOPICS[topicIdx];
  const all = topic.qs.length;
  const done = Object.keys(answers).length;
  const correct = topic.qs.filter((q, i) => answers[i] === q.a).length;

  function pick(qi: number, oi: number) {
    if (answers[qi] !== undefined) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }
  function reset() { setAnswers({}); setRevealed({}); setShowResult(false); }
  function nextTopic() { setTopicIdx(i => (i + 1) % TOPICS.length); reset(); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 740 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📐 Gramática</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Gramática · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Gramática A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 1.5rem' }}>5 temas essenciais: perfeito vs imperfeito, pronomes oblíquos, ser/estar, comparativo e futuro.</p>

        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
          {TOPICS.map((t, i) => (
            <button key={t.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx === i ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
              style={{ fontSize: '0.78rem', ...(topicIdx === i ? { background: COLOR, borderColor: COLOR } : {}) }}>
              {t.icon} {t.title.split(':')[0]}
            </button>
          ))}
        </div>

        <div style={{ padding: '1.1rem 1.3rem', borderRadius: 14, background: `${COLOR}08`, border: `1.5px solid ${COLOR}25`, marginBottom: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.25rem' }}>Regra</div>
          <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.3rem' }}>{topic.desc}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--muted)', borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>💡 {topic.tip}</div>
        </div>

        {done > 0 && !showResult && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <div style={{ flex: 1, height: 6, background: 'var(--line-soft)', borderRadius: 4 }}>
              <div style={{ height: '100%', width: `${(done / all) * 100}%`, background: COLOR, borderRadius: 4, transition: 'width 0.4s' }} />
            </div>
            <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexShrink: 0 }}>{done}/{all}</span>
          </div>
        )}

        {!showResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {topic.qs.map((q, qi) => {
              const ans = answers[qi]; const isDone = ans !== undefined;
              return (
                <div key={`${topic.id}-${qi}`} style={{ padding: '1.1rem 1.25rem', borderRadius: 14, border: '1.5px solid var(--line-soft)', background: 'var(--bg)' }}>
                  <p style={{ margin: '0 0 0.7rem', fontSize: '1rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.7 }}>
                    {qi + 1}. {q.s.split('___').map((part, i, arr) => (
                      <span key={i}>{part}{i < arr.length - 1 && (
                        <span style={{ display: 'inline-block', minWidth: 72, borderBottom: `2px solid ${COLOR}`, margin: '0 4px', verticalAlign: 'bottom' }}>
                          {isDone && <span style={{ fontSize: '0.88rem', fontWeight: 800, color: ans === q.a ? '#059669' : '#dc2626' }}>{q.opts[ans]}</span>}
                        </span>
                      )}</span>
                    ))}
                  </p>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    {q.opts.map((opt, oi) => {
                      const isCorrect = oi === q.a, isSel = ans === oi;
                      let bg = 'var(--bg)', border = '1px solid var(--line-soft)', color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} onClick={() => pick(qi, oi)} disabled={isDone}
                          style={{ padding: '0.45rem 1rem', borderRadius: 8, fontSize: '0.92rem', fontWeight: 700, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {revealed[qi] && <div style={{ marginTop: '0.55rem', fontSize: '0.8rem', color: 'var(--muted)', padding: '0.45rem 0.7rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.07)' : 'rgba(220,38,38,0.07)' }}>
                    {ans === q.a ? '✅ ' : `✗ Correto: "${q.opts[q.a]}". `}{q.fb}
                  </div>}
                </div>
              );
            })}
            {done === all && <button className="btn btn-sm" onClick={() => setShowResult(true)} style={{ background: COLOR, borderColor: COLOR }}>Ver meu resultado →</button>}
          </div>
        )}

        {showResult && (
          <div style={{ padding: '1.75rem', borderRadius: 18, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{correct === all ? '🏆' : correct >= all * 0.7 ? '⭐' : '📖'}</div>
            <h2 style={{ margin: '0 0 0.25rem', fontWeight: 800, color: 'var(--ink)' }}>{correct} / {all} corretas</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 1.25rem' }}>{correct === all ? 'Perfeito! Você domina este tema.' : correct >= all * 0.7 ? 'Muito bem. Revise os erros.' : 'Estude a regra acima e pratique de novo.'}</p>
            <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" onClick={reset} style={{ background: COLOR, borderColor: COLOR }}>Tentar de novo</button>
              <button className="btn btn-ghost btn-sm" onClick={nextTopic}>Próximo tema →</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
