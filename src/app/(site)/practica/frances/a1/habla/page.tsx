'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#003189';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:"Bonjour!", phonetic:"[bon-ZHOOR]", es:"¡Buenos días! / ¡Hola!", note:'"Bon" = bueno, "jour" = día. La "j" francesa es como la "y" de "yo" pero más suave: [ʒ]. No es la "j" española.', category:'Saludos' },
  { id:2, phrase:"Je m'appelle ___.", phonetic:"[zhe mah-PEL ___]", es:"Me llamo ___.", note:'"Je" suena [zhe], nunca "ye". La "j" siempre es [ʒ] en francés. "Appelle" con doble "l" pero se pronuncia solo una.', category:'Presentación' },
  { id:3, phrase:"Comment allez-vous?", phonetic:"[koh-mahn-tah-LEH-voo]", es:"¿Cómo está usted? (formal)", note:'La "t" de "allez-vous" es una liaison: se une el sonido. La "z" en "allez" no se pronuncia, pero sí en liaison: [tah-LEH-voo].', category:'Saludos' },
  { id:4, phrase:"Ça va bien, merci.", phonetic:"[sah VAH byehn, mehr-SEE]", es:"Bien, gracias. (informal)", note:'"Ça" = eso/así. La cedilla (ç) hace que la "c" suene [s]. "Bien" suena como "bián" con nasal.', category:'Saludos' },
  { id:5, phrase:"Enchanté(e).", phonetic:"[ahn-shahn-TEH]", es:"Encantado/a (al conocer)", note:'La "e" final es muda. Se usa al conocer a alguien. Las vocales nasales (an, en, in) no existen en español — practica: [ɑ̃].', category:'Presentación' },
  { id:6, phrase:"Merci beaucoup.", phonetic:"[mehr-SEE boh-KOO]", es:"Muchas gracias.", note:'"Beaucoup" — la "eau" siempre suena [o]. La "p" final es muda. [boh-KOO] — acento en la última sílaba.', category:'Cortesía' },
  { id:7, phrase:"Je ne comprends pas.", phonetic:"[zhe ne kom-PRAHN pah]", es:"No entiendo.", note:'"Comprends" — la "ds" final es muda. La "an" de "comprends" es nasal [ɑ̃]. Informal: "Je comprends pas" (sin "ne").', category:'Ayuda' },
  { id:8, phrase:"Pouvez-vous répéter?", phonetic:"[poo-VEH-voo reh-peh-TEH]", es:"¿Puede repetir?", note:'"Répéter" tiene dos é — recuerda los acentos. La liaison "Pouvez-vous" → [poo-VEH-voo], la z se pronuncia en liaison.', category:'Ayuda' },
  { id:9, phrase:"Où sont les toilettes?", phonetic:"[oo sohn leh twah-LET]", es:"¿Dónde están los baños?", note:'"Où" = dónde (con acento grave). "Toilettes" siempre en plural en francés. La "s" de "sont" y "les" son silenciosas.', category:'Supervivencia' },
  { id:10, phrase:"Combien ça coûte?", phonetic:"[kom-BYEHN sah koot]", es:"¿Cuánto cuesta?", note:'"Combien" — vocal nasal "ien" [jɛ̃]. "Coûte" tiene acento circunflejo en la "û" pero la pronunciación es igual que "coute".', category:'Supervivencia' },
  { id:11, phrase:"Excusez-moi.", phonetic:"[ek-skü-ZEH-mwah]", es:"Discúlpeme / Con permiso.", note:'"Excusez" — la liaison con "moi" hace [ZEH-mwah]. La "ui" en "moi" es un diptongo: empieza con [m] y termina en [wa].', category:'Cortesía' },
  { id:12, phrase:"Je suis désolé(e).", phonetic:"[zhe swee deh-zoh-LEH]", es:"Lo siento / Disculpa.", note:'"Suis" = [swee], no "sús". "Désolé" tiene acento agudo (é) en todas sus ées. Adjetivo: désolé (m) / désolée (f).', category:'Cortesía' },
  { id:13, phrase:"J'ai besoin d'aide.", phonetic:"[zhay buh-ZWAN daid]", es:"Necesito ayuda.", note:'"J\'ai besoin de" + sustantivo = necesitar algo. "Besoin" tiene vocal nasal [buh-ZWƐN]. La contracción "d\'aide" = de + aide.', category:'Supervivencia' },
  { id:14, phrase:"Quelle heure est-il?", phonetic:"[kel uhr eh-TEEL]", es:"¿Qué hora es?", note:'"Quelle" = ¿cuál? (femenino). La liaison en "est-il" → [eh-TEEL]. Respuesta: "Il est deux heures" (son las dos).', category:'Supervivencia' },
  { id:15, phrase:"Au revoir!", phonetic:"[oh ruh-VWAHR]", es:"¡Adiós! / ¡Hasta la vista!", note:'"Revoir" = ver de nuevo. "Au" = a + le. La "r" francesa es gutural (de la garganta). "Bonne journée!" = ¡Buen día!', category:'Despedidas' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaFrancesA1() {
  const [filter, setFilter] = useState('Todos');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter === 'Todos' ? PHRASES : PHRASES.filter(p => p.category === filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number, val: boolean) {
    setPracticed(prev => { const next = new Set(prev); if (val) next.add(id); else next.delete(id); return next; });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🗣️ Expression orale</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Expression orale · Français A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Expressions de survie A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:580, margin:'0 0 0.75rem' }}>
          15 expresiones esenciales con guía fonética y notas especiales para hispanohablantes.
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
          <div style={{ flex:1, height:7, background:'var(--line-soft)', borderRadius:4 }}>
            <div style={{ height:'100%', width:`${pct}%`, background:COLOR, borderRadius:4, transition:'width 0.5s' }} />
          </div>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:pct===100?COLOR:'var(--muted)', flexShrink:0 }}>{practiced.size}/{PHRASES.length}</span>
        </div>

        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter===cat?'btn btn-sm':'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.8rem', ...(filter===cat?{background:COLOR,borderColor:COLOR}:{}) }}>
              {cat}
            </button>
          ))}
        </div>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`${COLOR}0a`, border:`1px solid ${COLOR}22`, marginBottom:'1.5rem', fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.6 }}>
          🎯 <strong style={{ color:'var(--ink)' }}>Cómo practicar:</strong> Lee la guía fonética → di la frase 3 veces en voz alta → si sonó natural, marca ✓. Si no, deja sin marcar para volver después.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {shown.map(p => {
            const done = practiced.has(p.id);
            const isExpanded = expanded === p.id;
            return (
              <div key={p.id} style={{ border:`1.5px solid ${done?`${COLOR}44`:'var(--line-soft)'}`, borderRadius:16, background:done?`${COLOR}06`:'var(--bg)', overflow:'hidden' }}>
                <div style={{ padding:'1rem 1.25rem', display:'flex', alignItems:'center', gap:'1rem' }}>
                  <div style={{ width:32, height:32, borderRadius:8, background:done?COLOR:'var(--line-soft)', color:done?'#fff':'var(--muted)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.8rem', fontWeight:900, fontFamily:'var(--mono)', flexShrink:0 }}>{p.id}</div>
                  <div style={{ flex:1 }}>
                    <div style={{ fontWeight:800, color:'var(--ink)', fontSize:'0.97rem', marginBottom:'0.12rem' }}>{p.phrase}</div>
                    <div style={{ fontSize:'0.78rem', color:COLOR, fontFamily:'var(--mono)', fontStyle:'italic', marginBottom:'0.12rem' }}>{p.phonetic}</div>
                    <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{p.es}</div>
                  </div>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', flexShrink:0 }}>
                    <button onClick={() => setExpanded(isExpanded?null:p.id)}
                      style={{ fontSize:'0.72rem', padding:'0.2rem 0.55rem', borderRadius:6, border:'1px solid var(--line-soft)', background:'transparent', cursor:'pointer', fontFamily:'var(--mono)', color:'var(--muted)' }}>
                      {isExpanded?'▲ nota':'▼ nota'}
                    </button>
                    <button onClick={() => mark(p.id, !done)}
                      style={{ fontSize:'0.82rem', padding:'0.3rem 0.75rem', borderRadius:8, border:`1.5px solid ${done?COLOR:'var(--line-soft)'}`, background:done?COLOR:'transparent', color:done?'#fff':'var(--muted)', cursor:'pointer', fontFamily:'inherit', fontWeight:700, transition:'all 0.15s', whiteSpace:'nowrap' }}>
                      {done?'✓ Dominada':'Lo logré ✓'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ padding:'0.7rem 1.25rem 0.85rem 4.5rem', borderTop:'1px solid var(--line-soft)', background:`${COLOR}04` }}>
                    <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Note de prononciation</div>
                    <p style={{ margin:0, fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.55 }}>{p.note}</p>
                    <div style={{ marginTop:'0.4rem', display:'inline-block', fontSize:'0.68rem', padding:'0.12rem 0.45rem', borderRadius:5, background:`${COLOR}15`, color:COLOR, fontFamily:'var(--mono)', fontWeight:700 }}>{p.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size === PHRASES.length && (
          <div style={{ marginTop:'2rem', padding:'1.25rem 1.5rem', borderRadius:16, background:`${COLOR}0a`, border:`2px solid ${COLOR}33`, textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:'0.4rem' }}>🎉</div>
            <p style={{ margin:0, fontWeight:800, color:COLOR, fontSize:'1.1rem' }}>¡Felicitaciones! Dominas las 15 expresiones.</p>
            <p style={{ margin:'0.3rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Ahora úsalas en conversación real — practica con David o Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
