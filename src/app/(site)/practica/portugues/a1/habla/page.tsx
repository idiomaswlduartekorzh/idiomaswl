'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#009c3b';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:"Olá!", phonetic:"[oh-LAH]", es:"¡Hola!", note:'"Olá" é mais formal. No dia a dia, os brasileiros dizem "Oi!" [oy] — é muito comum e amistoso.', category:'Saudações' },
  { id:2, phrase:"Meu nome é ___.", phonetic:"[mew NOH-meh eh]", es:"Mi nombre es ___.", note:'"Meu" suena [mew] con la "u" casi muda. El "e" final de "nome" es mudo. También: "Me chamo ___."', category:'Apresentação' },
  { id:3, phrase:"Como vai você?", phonetic:"[KOH-moo vai voh-SAY]", es:"¿Cómo estás?", note:'"Você" [voh-SAY] es el pronombre de segunda persona en Brasil (no se usa "tu" en el habla cotidiana). La "c" final suena [s].', category:'Saudações' },
  { id:4, phrase:"Tudo bem?", phonetic:"[TOO-doo beng]", es:"¿Todo bien?", note:'La forma más común e informal de saludar en Brasil. Respuesta: "Tudo bem, obrigado/a!" La "m" final tiene nasal.', category:'Saudações' },
  { id:5, phrase:"Prazer em conhecê-lo/la.", phonetic:"[prah-ZER eng koh-nyeh-SAY-loo/lah]", es:"Mucho gusto.", note:'"Conhecê-lo" (masc.) / "Conhecê-la" (fem.). El acento circunflejo en "ê" indica vocal fechada. Más simple: "Prazer!" [prah-ZER].', category:'Apresentação' },
  { id:6, phrase:"Obrigado / Obrigada.", phonetic:"[oh-bree-GAH-doo / -dah]", es:"Gracias.", note:'Hombres dicen "obrigado" [doo], mujeres dicen "obrigada" [dah]. Es una regla fija — no depende del receptor.', category:'Cortesia' },
  { id:7, phrase:"Não entendo.", phonetic:"[nowng en-TEN-doo]", es:"No entiendo.", note:'"Não" tiene vocal nasal [ɑ̃w̃]. Parecido al "não" en español pero más nasal. Informa: también "Não entendi" (no entendí).', category:'Ajuda' },
  { id:8, phrase:"Pode repetir?", phonetic:"[POH-djeh heh-peh-TEER]", es:"¿Puede repetir?", note:'"Pode" — en São Paulo se pronuncia [POH-djeh] con "d" suavizada. "Repetir" lleva acento en la última sílaba: [heh-peh-TEER].', category:'Ajuda' },
  { id:9, phrase:"Onde fica o banheiro?", phonetic:"[OHN-djeh FEE-kah oo bah-NYAY-roo]", es:"¿Dónde está el baño?", note:'"Banheiro" [bah-NYAY-roo] — el "nh" se pronuncia como "ñ" en español. El "lh" y "nh" son dos dígrafos únicos del portugués.', category:'Sobrevivência' },
  { id:10, phrase:"Quanto custa?", phonetic:"[KWAHN-too KOOS-tah]", es:"¿Cuánto cuesta?", note:'"Quanto" [KWAHN-too] tiene el diptongo "ua". El "a" final siempre es abierto en portugués. Alternativa: "Qual é o preço?"', category:'Sobrevivência' },
  { id:11, phrase:"Preciso de ajuda.", phonetic:"[preh-SEE-zoo djeh ah-ZHOO-dah]", es:"Necesito ayuda.", note:'"Preciso" [preh-SEE-zoo] — el "d" antes de "i" suena suavizado en São Paulo: [djeh]. La "j" suena como [zh] (la "j" francesa).', category:'Sobrevivência' },
  { id:12, phrase:"Com licença.", phonetic:"[kong lee-SEN-sah]", es:"Con permiso / Disculpe.", note:'"Com licença" se usa para pedir paso. "Desculpe" [desh-KOOL-peh] se usa para disculparse por un error.', category:'Cortesia' },
  { id:13, phrase:"Desculpe.", phonetic:"[desh-KOOL-peh]", es:"Disculpa / Lo siento.", note:'"Desculpe" = disculpa (error cometido). La "s" entre vocales suena [z] en portugués europeo, pero en Brasil suena más [sh] o [z] según la región.', category:'Cortesia' },
  { id:14, phrase:"Que horas são?", phonetic:"[keh OH-ras sowng]", es:"¿Qué hora es?", note:'"São" = son [sowng], con la nasal "ão". Respuesta: "São duas horas" (son las dos). "É uma hora" (es la una) — con "é" en singular.', category:'Sobrevivência' },
  { id:15, phrase:"Tchau!", phonetic:"[tchaw]", es:"¡Adiós! / ¡Chao!", note:'"Tchau" viene del italiano "ciao". Es muy común en Brasil. Más formal: "Até logo" [ah-TEH LOH-goo] o "Até mais" [ah-TEH mais].', category:'Despedidas' },
];

const CATEGORIES = ['Todos', 'Saudações', 'Apresentação', 'Cortesia', 'Ajuda', 'Sobrevivência', 'Despedidas'];

export default function HablaPortuguesA1() {
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
          <Link href="/practica/portugues/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇧🇷 Português A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🗣️ Expressão oral</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Expressão oral · Português A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Frases de sobrevivência A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:580, margin:'0 0 0.75rem' }}>
          15 expressões essenciais com guia fonético e notas para hispanofalantes.
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
          <div style={{ flex:1, height:7, background:'var(--line-soft)', borderRadius:4 }}>
            <div style={{ height:'100%', width:`${pct}%`, background:COLOR, borderRadius:4, transition:'width 0.5s' }}/>
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
          🎯 <strong style={{ color:'var(--ink)' }}>Como praticar:</strong> Leia a guia fonética → diga a frase 3 vezes em voz alta → se conseguiu bem, marque ✓. Se não, deixe para voltar depois.
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
                      {done?'✓ Dominada':'Consegui ✓'}
                    </button>
                  </div>
                </div>
                {isExpanded && (
                  <div style={{ padding:'0.7rem 1.25rem 0.85rem 4.5rem', borderTop:'1px solid var(--line-soft)', background:`${COLOR}04` }}>
                    <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Nota de pronúncia</div>
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
            <p style={{ margin:0, fontWeight:800, color:COLOR, fontSize:'1.1rem' }}>Ótimo trabalho! Você domina as 15 frases.</p>
            <p style={{ margin:'0.3rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Agora use-as em conversa real — pratique com David ou Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
