import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Français A1 Compréhension orale — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A1 de francés. Diálogos auténticos en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances/a1/escucha' },
};

const COLOR = '#003189';

const PLANNED = [
  {
    id: 1, title: 'Dialogue à la boulangerie',
    desc: 'Escucha un diálogo en una boulangerie parisina. Identifica qué pide el cliente, el precio y cómo agradece.',
    script: '"Bonjour! — Bonjour madame! Je voudrais une baguette et deux croissants, s\'il vous plaît. — Bien sûr. Ça fait deux euros cinquante. — Voilà. Merci! — Merci à vous, bonne journée!"',
    questions: ['¿Qué pide el cliente?', '¿Cuánto cuesta?', '¿Cómo dice "por favor" en el diálogo?', '¿Cómo se despiden?'],
    duration: '~35 seg', accent: 'Francés parisino', wpm: 100,
  },
  {
    id: 2, title: 'Se présenter',
    desc: 'Escucha a una persona presentarse en una clase de francés. Identifica nombre, edad, ciudad y pasatiempo.',
    script: '"Bonjour tout le monde! Je m\'appelle Sophie. J\'ai vingt-deux ans. J\'habite à Lyon depuis trois ans. J\'étudie le droit à l\'université. J\'aime lire et faire du vélo le week-end."',
    questions: ['¿Cómo se llama?', '¿Cuántos años tiene?', '¿Dónde vive?', '¿Qué le gusta hacer?'],
    duration: '~30 seg', accent: 'Francés estándar', wpm: 95,
  },
  {
    id: 3, title: 'La météo',
    desc: 'Escucha un pronóstico del tiempo breve para Francia. Identifica las ciudades y el tiempo que hace.',
    script: '"Aujourd\'hui, il fait beau à Paris avec du soleil. À Lyon, il y a des nuages et il fait frais. Dans le sud, à Marseille, il fait très chaud, vingt-huit degrés."',
    questions: ['¿Cómo está el tiempo en París?', '¿Qué hay en Lyon?', '¿Cuántos grados hace en Marsella?', '¿Cuál ciudad está en el sur?'],
    duration: '~30 seg', accent: 'Francés de TV', wpm: 100,
  },
];

export default function EscuchaFrancesA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🎧 Compréhension orale</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Compréhension orale · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compréhension orale A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:560, margin:'0 0 2rem' }}>
          3 exercices en préparation — audios con voces nativas francesas. <strong style={{ color:'var(--ink)' }}>Scripts y preguntas ya listos.</strong>
        </p>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`rgba(0,49,137,0.08)`, border:`1px solid rgba(0,49,137,0.2)`, marginBottom:'2rem', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>
          🎙️ <strong style={{ color:'var(--ink)' }}>Mientras tanto:</strong> Lee los scripts en voz alta — es pronunciación activa. O escucha <strong style={{ color:'var(--ink)' }}>innerFrench (podcast)</strong> o <strong style={{ color:'var(--ink)' }}>Français Authentique</strong> en YouTube.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border:`1.5px solid rgba(0,49,137,0.2)`, borderRadius:18, overflow:'hidden' }}>
              <div style={{ padding:'1.25rem 1.5rem', background:`rgba(0,49,137,0.04)` }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'1rem', flexWrap:'wrap' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'var(--line-soft)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>🎧</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem', flexWrap:'wrap' }}>
                      <span style={{ fontWeight:800, color:'var(--ink)' }}>Exercice {ex.id}: {ex.title}</span>
                      <span style={{ fontSize:'0.62rem', fontWeight:700, background:'var(--line-soft)', color:'var(--muted)', borderRadius:5, padding:'0.1rem 0.4rem', fontFamily:'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin:'0 0 0.5rem', fontSize:'0.84rem', color:'var(--muted)', lineHeight:1.5 }}>{ex.desc}</p>
                    <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize:'0.68rem', padding:'0.15rem 0.5rem', borderRadius:6, background:'rgba(0,49,137,0.08)', color:COLOR, fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--line-soft)' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Script</div>
                <p style={{ margin:'0 0 0.85rem', fontSize:'0.88rem', color:'var(--ink)', lineHeight:1.65, fontStyle:'italic', borderLeft:`3px solid rgba(0,49,137,0.3)`, paddingLeft:'0.75rem' }}>
                  {ex.script}
                </p>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Questions de compréhension</div>
                {ex.questions.map((q, i) => (
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
