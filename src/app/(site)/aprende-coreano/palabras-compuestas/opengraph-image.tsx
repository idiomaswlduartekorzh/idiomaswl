import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Palabras Compuestas en Coreano (합성어) — Vocabulario × 10 | WeLearn';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0d1a14', fontFamily: 'system-ui, sans-serif',
        padding: '60px 72px', position: 'relative', overflow: 'hidden',
      }}>
        {/* Glows */}
        <div style={{ position:'absolute', top:-100, right:-80, width:500, height:500, borderRadius:'50%', background:'#059669', opacity:0.12, filter:'blur(110px)' }} />
        <div style={{ position:'absolute', bottom:-60, left:'20%', width:400, height:400, borderRadius:'50%', background:'#534AB7', opacity:0.1, filter:'blur(90px)' }} />

        {/* Tags */}
        <div style={{ display:'flex', gap:10, marginBottom:28 }}>
          {['합성어', 'Vocabulario × 10', 'Interactivo'].map(tag => (
            <div key={tag} style={{
              background:'rgba(74,222,128,0.1)', border:'1px solid rgba(74,222,128,0.3)',
              color:'#4ade80', fontSize:14, fontWeight:700, padding:'5px 16px', borderRadius:999,
            }}>{tag}</div>
          ))}
        </div>

        {/* Headline */}
        <div style={{ fontSize:54, fontWeight:800, color:'#fff', lineHeight:1.15, letterSpacing:'-0.02em', marginBottom:20, flex:1 }}>
          Palabras compuestas{' '}
          <span style={{ color:'#4ade80' }}>en coreano</span>
          <br />
          <span style={{ fontSize:34, fontWeight:600, color:'rgba(255,255,255,0.55)' }}>
            Aprende las raíces → el vocabulario fluye solo
          </span>
        </div>

        {/* Compound examples row */}
        <div style={{ display:'flex', gap:16, marginBottom:32 }}>
          {[
            { parts:['눈','물'], emoji:['👁️','💧'], result:'눈물', meaning:'lágrimas', c:'#8b5cf6' },
            { parts:['손','가락'], emoji:['✋','〽️'], result:'손가락', meaning:'dedo', c:'#e11d48' },
            { parts:['불','고기'], emoji:['🔥','🥩'], result:'불고기', meaning:'bulgogi', c:'#f97316' },
          ].map(ex => (
            <div key={ex.result} style={{
              display:'flex', alignItems:'center', gap:8, padding:'10px 16px', borderRadius:12,
              background:`${ex.c}15`, border:`1.5px solid ${ex.c}44`,
            }}>
              <span style={{ fontSize:18 }}>{ex.emoji[0]}</span>
              <span style={{ color:ex.c, fontWeight:800, fontSize:20 }}>{ex.parts[0]}</span>
              <span style={{ color:'rgba(255,255,255,0.3)', fontSize:16, fontWeight:700 }}>+</span>
              <span style={{ fontSize:18 }}>{ex.emoji[1]}</span>
              <span style={{ color:ex.c, fontWeight:800, fontSize:20 }}>{ex.parts[1]}</span>
              <span style={{ color:'rgba(255,255,255,0.3)', fontSize:16, fontWeight:700 }}>=</span>
              <span style={{ color:'#fff', fontWeight:900, fontSize:22 }}>{ex.result}</span>
              <span style={{ color:'rgba(255,255,255,0.5)', fontSize:13 }}>{ex.meaning}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize:16, color:'rgba(255,255,255,0.5)' }}>
            23 raíces · 20 compuestos · Herramienta interactiva gratuita
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <div style={{ width:34, height:34, borderRadius:9, background:'#059669', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:16, fontWeight:900 }}>W</div>
            <span style={{ fontSize:16, fontWeight:700, color:'rgba(255,255,255,0.5)' }}>idiomaswl.com</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
