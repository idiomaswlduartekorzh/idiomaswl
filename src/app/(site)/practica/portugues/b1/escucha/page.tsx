import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Portugués B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de portugués. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/portugues/b1/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'Uma entrevista de emprego (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo en portugués brasileño. Practica o subjuntivo, o condicional y vocabulario profesional B1.',
    script: '"Bom dia! Por favor, sente-se. — Obrigado/a. — Fale-me um pouco sobre seu histórico profissional. — Claro. Trabalhei em marketing por quatro anos e recentemente concluí um curso de gestão de projetos. — Você já gerenciou uma equipe? — Sim, liderei uma equipe de cinco pessoas por dois anos. — Por que quer deixar seu emprego atual? — Estou buscando novos desafios. Acredito que sua empresa possa me oferecer oportunidades de crescimento profissional. — O que você faria nos primeiros três meses? — Gostaria de conhecer a equipe e depois proporia novas estratégias de comunicação. — Quais são suas pretensões salariais? — Eu esperaria um salário de aproximadamente R$ 5.000 mensais. — Entraremos em contato até o fim da semana. Obrigado/a pela sua visita. — Obrigado/a. Até logo."',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué curso completó recientemente?', '¿Ha gestionado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~65 seg', accent: 'Portugués brasileño (São Paulo)', wpm: 105,
  },
  {
    id: 2, title: 'Debate sobre o meio ambiente (Debate ambiental)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica o subjuntivo, o condicional y vocabulario medioambiental.',
    script: '"Você viu as notícias sobre as enchentes no Brasil? Está piorando todo ano. — Sei, é muito preocupante. Se os governos tivessem agido antes, não estaríamos nessa situação. — Você acha que as ações individuais fazem diferença? — Acho que sim, mas, honestamente, se as empresas reduzissem suas emissões de carbono, o impacto seria muito maior do que qualquer mudança individual. — É verdade. Estou tentando usar mais transporte público e comprar menos plástico. — Toda ação conta, mas a mudança real precisa vir de políticas públicas. Seria necessário que leis ambientais mais rígidas fossem introduzidas. — Concordo. Mas enquanto esperamos os governos agirem, devemos todos fazer o que pudermos. — Com certeza. Acho que precisamos das duas coisas: responsabilidade individual e ação governamental forte."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~65 seg', accent: 'Portugués brasileño informal', wpm: 108,
  },
  {
    id: 3, title: 'Planejando uma viagem (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a Portugal usando o condicional y vocabulario de viajes B1.',
    script: '"Tenho vontade de viajar nesse verão. E você? — Eu também! Pensei em Portugal. Você toparia? — Ótima ideia! Se reservássemos agora, as passagens seriam mais baratas. — Eu gostaria de visitar Lisboa e o Porto. Que tipo de acomodação você preferiria? — Preferiria ficar num apartamento em vez de hotel. Seria mais barato e mais autêntico. — Concordo. Precisaríamos começar a economizar. Quantos dias você planeja? — Acho que dez dias seriam suficientes. Poderíamos passar cinco dias em Lisboa e cinco no Porto. — Perfeito. Se fôssemos em julho, o clima seria ideal. — Então, está decidido! Vou reservar as passagens essa semana."',
    questions: ['¿A qué destino quieren ir?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren partir?', '¿Quién reservará los billetes?'],
    duration: '~65 seg', accent: 'Portugués brasileño informal', wpm: 108,
  },
];

export default function EscuchaPortuguesB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Portugués B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Compreensão auditiva · Portugués B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos brasileños. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen subjuntivo, condicional y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Diálogo {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (texto a ser gravado)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="pt-BR" label="Ouvir o diálogo" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en portugués ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/portugues/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/portugues/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
