import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Português A2 Compreensão auditiva — Próximamente | Idiomas WeLearn',
  description: 'Exercícios de compreensão auditiva A2 em português brasileiro. Diálogos sobre aeroporto, entrevista de emprego e planejamento de viagem.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/portugues/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'No aeroporto',
    desc: 'Escucha el check-in de dos pasajeros en el aeropuerto de Guarulhos, São Paulo. Identifica destinos, número de maletas, asientos y restricciones de equipaje.',
    script: '"Bom dia! Seu passaporte e a passagem, por favor. — Aqui está. Vou para Lisboa com escala em Frankfurt. — Quantas malas você vai despachar? — Duas. — Ok, uma delas está acima do peso — 24 quilos. O limite é 23. Vai precisar pagar uma taxa ou redistribuir o peso. — Pode redistribuir aqui mesmo? — Sim, temos um balcão logo ali. Aqui está o seu cartão de embarque — portão 42, embarque às 14h30. Bom voo!"',
    questions: [
      '¿Cuál es el destino final del pasajero?',
      '¿En qué ciudad hace escala?',
      '¿Cuántas maletas va a despachar?',
      '¿Cuál es el problema con el equipaje?',
      '¿Cuál es la solución propuesta?',
      '¿A qué hora es el embarque?',
    ],
    duration: '~50 seg', accent: 'Português brasileiro (São Paulo)', wpm: 105,
  },
  {
    id: 2, title: 'Uma entrevista de emprego',
    desc: 'Escucha una entrevista de trabajo en una empresa de marketing digital. Identifica la experiencia del candidato, sus habilidades, expectativas salariales y disponibilidad.',
    script: '"Bom dia, Fernanda! Obrigado por vir. Pode me falar um pouco sobre sua experiência? — Claro. Trabalhei dois anos como analista de marketing numa agência. Gerenciei campanhas nas redes sociais e aumentei o engajamento em 40%. — Impressionante! Você tem experiência com Google Ads? — Sim, fiz um curso certificado no ano passado e gerenciei campanhas com budget de até R$50 mil. — Ótimo. Qual é a sua expectativa salarial? — Entre R$5.000 e R$6.000 por mês. — Quando você poderia começar? — Em duas semanas, após cumprir meu aviso prévio. — Perfeito. Vamos dar um retorno até sexta."',
    questions: [
      '¿Cuánto tiempo trabajó Fernanda como analista de marketing?',
      '¿Cuánto aumentó el engagement en su trabajo anterior?',
      '¿Qué certificación tiene Fernanda?',
      '¿Cuál es su expectativa salarial?',
      '¿Cuándo podría empezar?',
      '¿Cuándo recibirá una respuesta?',
    ],
    duration: '~55 seg', accent: 'Português brasileiro (Rio de Janeiro)', wpm: 110,
  },
  {
    id: 3, title: 'Planejando uma viagem',
    desc: 'Escucha a dos amigos planeando un viaje al Nordeste de Brasil. Identifica destinos, fechas, transportes, presupuesto y actividades planeadas.',
    script: '"Então, fechou a viagem para o Nordeste? — Quase! Vou pesquisar os voos ainda. Você prefere ir para Fortaleza ou para Recife? — Prefiro Fortaleza — as praias são mais bonitas do que as de Recife. Além disso, a passagem é mais barata. — Combinado. Vamos em julho, quando está mais seco lá. — Boa ideia. Vou reservar o hotel e você cuida dos passeios. Queremos visitar Jericoacoara, né? — Com certeza! Mas precisamos alugar um carro ou contratar um transfer — é longe da cidade. — Deixa que eu pesquiso. Quanto você quer gastar no total? — Em torno de R$3.000 por pessoa. — Ok. Vou mandar as opções amanhã."',
    questions: [
      '¿Cuál destino eligen y por qué?',
      '¿Por qué prefieren Fortaleza sobre Recife?',
      '¿En qué mes planean viajar?',
      '¿Qué lugar quieren visitar obligatoriamente?',
      '¿Por qué necesitan alquilar un carro o transfer?',
      '¿Cuál es el presupuesto por persona?',
    ],
    duration: '~55 seg', accent: 'Português brasileiro (Minas Gerais)', wpm: 108,
  },
];

export default function EscuchaPortuguesA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇧🇷 Português A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Compreensão oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Compreensão oral · Português A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Compreensão auditiva A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 em preparação com vozes nativas do Brasil. <strong style={{ color: 'var(--ink)' }}>Scripts completos e perguntas prontos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Enquanto isso:</strong> Leia os scripts em voz alta para praticar a pronúncia A2. Recomendamos também o canal <strong style={{ color: 'var(--ink)' }}>Falar Português</strong> e o podcast <strong style={{ color: 'var(--ink)' }}>Café Brasil</strong> no YouTube para compreensão auditiva autêntica.
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
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script completo</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem', whiteSpace: 'pre-line' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="pt-BR" label="Escuchar script" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Perguntas de compreensão</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
