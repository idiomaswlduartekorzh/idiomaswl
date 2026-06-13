import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Português A1 Compreensão auditiva — Próximamente | Idiomas WeLearn',
  description: 'Exercícios de compreensão auditiva A1 em português brasileiro. Diálogos autênticos em preparação.',
  alternates: { canonical: 'https://idiomaswl.com/practica/portugues/a1/escucha' },
};

const COLOR = '#009c3b';

const PLANNED = [
  {
    id: 1, title: 'No restaurante',
    desc: 'Escucha a dos personas pidiendo comida en un restaurante brasileño. Identifica los platos pedidos, el precio y cómo pagan.',
    script: '"Boa tarde! O que vocês vão querer? — Vou querer o prato feito, por favor. — E eu quero um suco de laranja e uma salada. — Pois não. O total vai ser vinte e cinco reais. — Pode colocar no cartão? — Claro!"',
    questions: ['¿Qué pide la primera persona?', '¿Qué pide la segunda persona?', '¿Cuánto cuesta en total?', '¿Cómo pagan?'],
    duration: '~40 seg', accent: 'Português brasileiro', wpm: 100,
  },
  {
    id: 2, title: 'Se apresentando',
    desc: 'Escucha a alguien presentarse en una reunión de trabajo. Identifica nombre, ciudad, profesión y cuánto tiempo lleva en la empresa.',
    script: '"Olá, pessoal! Me chamo Camila. Sou de Belo Horizonte, mas moro em São Paulo há dois anos. Trabalho como designer. Estou nessa empresa há seis meses. Adoro o que faço!"',
    questions: ['¿Cómo se llama?', '¿De dónde es?', '¿Cuál es su profesión?', '¿Cuánto tiempo lleva en la empresa?'],
    duration: '~30 seg', accent: 'Português brasileiro (sotaque mineiro)', wpm: 95,
  },
  {
    id: 3, title: 'No mercado',
    desc: 'Escucha a alguien comprando frutas y verduras en un mercado. Identifica qué compra, cuánto cuesta y cómo despide.',
    script: '"Bom dia! Quanto custa o quilo da banana? — Dois reais. — Me dá um quilo, por favor. E as laranjas? — As laranjas estão a três reais o quilo. — Me dá dois quilos. Obrigada! — De nada, tenha um bom dia!"',
    questions: ['¿Cuánto cuesta el kilo de banana?', '¿Cuántos kilos de naranja compra?', '¿Cuánto cuesta el kilo de naranja?', '¿Cómo se despide el vendedor?'],
    duration: '~40 seg', accent: 'Português brasileiro (São Paulo)', wpm: 105,
  },
];

export default function EscuchaPortuguesA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇧🇷 Português A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🎧 Compreensão oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Compreensão oral · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compreensão auditiva A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:560, margin:'0 0 2rem' }}>
          3 exercícios em preparação com vozes nativas do Brasil. <strong style={{ color:'var(--ink)' }}>Scripts e perguntas já prontos.</strong>
        </p>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`rgba(0,156,59,0.08)`, border:`1px solid rgba(0,156,59,0.2)`, marginBottom:'2rem', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>
          🎙️ <strong style={{ color:'var(--ink)' }}>Enquanto isso:</strong> Leia os scripts em voz alta para praticar a pronúncia. Ou escute <strong style={{ color:'var(--ink)' }}>Português com Letras</strong> ou <strong style={{ color:'var(--ink)' }}>Brazilian Portuguese Podcast</strong> no YouTube.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {PLANNED.map(ex=>(
            <div key={ex.id} style={{ border:`1.5px solid rgba(0,156,59,0.2)`, borderRadius:18, overflow:'hidden' }}>
              <div style={{ padding:'1.25rem 1.5rem', background:`rgba(0,156,59,0.04)` }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'1rem', flexWrap:'wrap' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'var(--line-soft)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>🎧</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem', flexWrap:'wrap' }}>
                      <span style={{ fontWeight:800, color:'var(--ink)' }}>Exercício {ex.id}: {ex.title}</span>
                      <span style={{ fontSize:'0.62rem', fontWeight:700, background:'var(--line-soft)', color:'var(--muted)', borderRadius:5, padding:'0.1rem 0.4rem', fontFamily:'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin:'0 0 0.5rem', fontSize:'0.84rem', color:'var(--muted)', lineHeight:1.5 }}>{ex.desc}</p>
                    <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag=>(
                        <span key={tag} style={{ fontSize:'0.68rem', padding:'0.15rem 0.5rem', borderRadius:6, background:'rgba(0,156,59,0.08)', color:COLOR, fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--line-soft)' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Script</div>
                <p style={{ margin:'0 0 0.85rem', fontSize:'0.88rem', color:'var(--ink)', lineHeight:1.65, fontStyle:'italic', borderLeft:`3px solid rgba(0,156,59,0.3)`, paddingLeft:'0.75rem' }}>
                  {ex.script}
                </p>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Perguntas de compreensão</div>
                {ex.questions.map((q,i)=>(
                  <p key={i} style={{ margin:'0 0 0.2rem', fontSize:'0.82rem', color:'var(--muted)' }}>{i+1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
