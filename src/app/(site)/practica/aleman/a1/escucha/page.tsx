import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Deutsch A1 Hörverstehen — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A1 en alemán. Diálogos auténticos con hablantes nativos en preparación.',
  alternates: { canonical: 'https://www.idiomaswl.com/practica/aleman/a1/escucha' },
};

const COLOR = '#dd0000';

const PLANNED = [
  {
    id:1, title:'Sich vorstellen',
    desc:'Escucha a alguien presentarse en una reunión. Identifica nombre, edad, ciudad y profesión.',
    script:'"Guten Tag! Mein Name ist Stefan Müller. Ich bin 34 Jahre alt. Ich komme aus Hamburg, aber ich wohne jetzt in München. Ich arbeite als Softwareentwickler bei einer großen Firma. Sehr erfreut, Sie kennenzulernen!"',
    questions:['¿Cómo se llama?','¿Cuántos años tiene?','¿En qué ciudad vive ahora?','¿Cuál es su profesión?'],
    duration:'~30 seg', accent:'Hochdeutsch (alemán estándar)', wpm:95,
  },
  {
    id:2, title:'Im Supermarkt',
    desc:'Escucha un diálogo en un supermercado. Identifica qué compra, el precio y cómo paga.',
    script:'"Guten Tag! Ich hätte gern ein Kilo Äpfel. — Natürlich, die kosten zwei Euro fünfzig. — Und eine Flasche Milch bitte. — Gerne. Zusammen sind das vier Euro. — Ich zahle mit Karte. — Kein Problem. Auf Wiedersehen!"',
    questions:['¿Qué dos cosas compra?','¿Cuánto cuestan las manzanas?','¿Cuánto es el total?','¿Cómo paga?'],
    duration:'~40 seg', accent:'Hochdeutsch con acento suave del norte', wpm:100,
  },
  {
    id:3, title:'Der Tagesablauf',
    desc:'Escucha a alguien describir su rutina diaria. Identifica las horas y actividades clave.',
    script:'"Ich stehe um sechs Uhr auf. Dann dusche ich und esse Brot zum Frühstück. Um Viertel nach sieben fahre ich mit dem Bus zur Arbeit. Mittags esse ich in der Kantine. Um achtzehn Uhr bin ich wieder zu Hause. Abends lese ich oder sehe fern."',
    questions:['¿A qué hora se levanta?','¿Cómo va al trabajo?','¿Dónde come al mediodía?','¿Qué hace por las noches?'],
    duration:'~40 seg', accent:'Hochdeutsch (acento berlinés suave)', wpm:105,
  },
];

export default function EscuchaAlemanA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇩🇪 Deutsch A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🎧 Hörverstehen</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Hörverstehen · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Hörverstehen A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:560, margin:'0 0 2rem' }}>
          3 ejercicios en preparación con voces nativas alemanas. <strong style={{ color:'var(--ink)' }}>Scripts y preguntas ya listos.</strong>
        </p>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`rgba(221,0,0,0.06)`, border:`1px solid rgba(221,0,0,0.18)`, marginBottom:'2rem', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>
          🎙️ <strong style={{ color:'var(--ink)' }}>Mientras tanto:</strong> Lee los scripts en voz alta para practicar pronunciación. O escucha <strong style={{ color:'var(--ink)' }}>DeutschFunk Nova</strong> o <strong style={{ color:'var(--ink)' }}>Slow German</strong> en podcast — ambos son perfectos para A1–B1.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {PLANNED.map(ex=>(
            <div key={ex.id} style={{ border:`1.5px solid rgba(221,0,0,0.18)`, borderRadius:18, overflow:'hidden' }}>
              <div style={{ padding:'1.25rem 1.5rem', background:`rgba(221,0,0,0.03)` }}>
                <div style={{ display:'flex', alignItems:'flex-start', gap:'1rem', flexWrap:'wrap' }}>
                  <div style={{ width:48, height:48, borderRadius:12, background:'var(--line-soft)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>🎧</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.2rem', flexWrap:'wrap' }}>
                      <span style={{ fontWeight:800, color:'var(--ink)' }}>Übung {ex.id}: {ex.title}</span>
                      <span style={{ fontSize:'0.62rem', fontWeight:700, background:'var(--line-soft)', color:'var(--muted)', borderRadius:5, padding:'0.1rem 0.4rem', fontFamily:'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin:'0 0 0.5rem', fontSize:'0.84rem', color:'var(--muted)', lineHeight:1.5 }}>{ex.desc}</p>
                    <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
                      {[`⏱ ${ex.duration}`,`🗣 ${ex.accent}`,`~${ex.wpm} wpm`].map(tag=>(
                        <span key={tag} style={{ fontSize:'0.68rem', padding:'0.15rem 0.5rem', borderRadius:6, background:'rgba(221,0,0,0.07)', color:COLOR, fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--line-soft)' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Script</div>
                <p style={{ margin:'0 0 0.85rem', fontSize:'0.88rem', color:'var(--ink)', lineHeight:1.65, fontStyle:'italic', borderLeft:`3px solid rgba(221,0,0,0.25)`, paddingLeft:'0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="de-DE" label="Escuchar script" />
                </p>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.4rem' }}>Fragen zum Hörtext</div>
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
