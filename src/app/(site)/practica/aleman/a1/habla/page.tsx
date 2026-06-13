'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

interface Phrase {
  id: number; phrase: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id:1, phrase:'Hallo!', phonetic:'[HA-lo]', es:'¡Hola!', note:'"Hallo" se usa en contextos informales. Para formal: "Guten Tag" [GOO-ten TAHK] (buenos días/tardes). "Guten Morgen" = buenos días (mañana). La "H" siempre se aspira fuerte en alemán.', category:'Begrüßung' },
  { id:2, phrase:'Ich heiße ___.', phonetic:'[ich HY-se]', es:'Me llamo ___.',  note:'"Ich" suena [ich] con la "ch" gutural suave. "Heiße" viene de "heißen" (llamarse). El "ß" (Eszett) suena como "ss". Alternativa: "Mein Name ist ___." [myn NAH-me ist]', category:'Vorstellung' },
  { id:3, phrase:'Wie geht es Ihnen?', phonetic:'[vee GAYT es EE-nen]', es:'¿Cómo está usted? (formal)', note:'"Wie geht es Ihnen?" es formal. Informal: "Wie geht\'s?" [vee GAYTS]. La "W" alemana suena como "V" en español. "Ihnen" lleva mayúscula porque es formal.', category:'Begrüßung' },
  { id:4, phrase:'Wie geht\'s?', phonetic:'[vee GAYTS]', es:'¿Cómo estás? (informal)', note:'Contracción de "Wie geht es dir?". La "W" = [v]. Respuesta típica: "Gut, danke!" [goot DAHN-ke] o "Es geht." [es GAYT] (más o menos).', category:'Begrüßung' },
  { id:5, phrase:'Freut mich!', phonetic:'[froyt mich]', es:'¡Mucho gusto!', note:'"Freut mich" = me alegra (conocerte). La "eu" suena como [oy]. "Ch" después de vocal anterior es el "ch" palatal suave, diferente al "ch" posterior de "Bach".', category:'Vorstellung' },
  { id:6, phrase:'Danke schön!', phonetic:'[DAHN-ke shern]', es:'¡Muchas gracias!', note:'"Danke" solo = gracias. "Danke schön" = muchas gracias. "Schön" [shern] — la "ö" es una vocal redondeada sin equivalente en español: labios como para "o" pero intentando decir "e".', category:'Höflichkeit' },
  { id:7, phrase:'Bitte!', phonetic:'[BI-te]', es:'¡De nada! / ¡Por favor!', note:'"Bitte" es multifuncional: de nada (respuesta a danke), por favor (petición) y ¿cómo? (no entendí). La doble "t" se pronuncia más fuerte que en español.', category:'Höflichkeit' },
  { id:8, phrase:'Ich verstehe nicht.', phonetic:'[ich fer-SHTAY-e nicht]', es:'No entiendo.',  note:'"Verstehe" [fer-SHTAY-e] — "V" suena como "F". "Nicht" [nicht] — "ch" gutural después de "i". Alternativa más corta: "Verstehe ich nicht" o simplemente "Nicht verstanden."', category:'Hilfe' },
  { id:9, phrase:'Können Sie das wiederholen?', phonetic:'[KER-nen zee das VEE-der-ho-len]', es:'¿Puede repetirlo?',  note:'Formal (Sie). Informal: "Kannst du das wiederholen?" La "K" siempre es oclusiva (nunca suena "kh"). "Ö" en "Können" = vocal redondeada anterior.', category:'Hilfe' },
  { id:10, phrase:'Wo ist die Toilette?', phonetic:'[vo ist dee toy-LET-e]', es:'¿Dónde está el baño?', note:'"Wo" [vo] — W=V. "Toilette" [toy-LET-e] viene del francés. Alternativa: "Wo ist das WC?" [vay-TSAY]. En Alemania los baños públicos se llaman "die Toilette" o "das WC".', category:'Überleben' },
  { id:11, phrase:'Was kostet das?', phonetic:'[vas KOS-tet das]', es:'¿Cuánto cuesta esto?', note:'"Was" [vas] — W=V. "Kostet" — el verbo "kosten" (costar). Alternativa: "Wie viel kostet das?" [vee feel] = ¿cuánto vale? La "W" y la "V" son el error más común para hispanohablantes.', category:'Überleben' },
  { id:12, phrase:'Ich brauche Hilfe.', phonetic:'[ich BROW-che HIL-fe]', es:'Necesito ayuda.', note:'"Brauche" [BROW-che] — "au" = diptongo [ow]. "Hilfe" — la "H" se aspira. Si hay urgencia: "Hilfe!" solo es el equivalente a "¡Auxilio!". "Ich brauche" = I need (cognado con inglés "need"... casi).', category:'Überleben' },
  { id:13, phrase:'Entschuldigung!', phonetic:'[ent-SHOOL-di-gung]', es:'¡Disculpe! / ¡Perdón!', note:'Es larga pero se usa mucho. Para simplificar: "Entschuldige!" [ent-SHOOL-di-ge] (informal) o "Sorry!" (aceptado en contextos jóvenes). La "digung" final es átona.', category:'Höflichkeit' },
  { id:14, phrase:'Wie spät ist es?', phonetic:'[vee shpayt ist es]', es:'¿Qué hora es?',  note:'"Spät" [shpayt] = tarde. "ä" = vocal abierta tipo "e" larga. La "sp" al inicio de sílaba suena [shp] en alemán. Respuesta: "Es ist drei Uhr." [es ist dry oor] = Son las tres.', category:'Überleben' },
  { id:15, phrase:'Tschüss!', phonetic:'[CHÜS]', es:'¡Adiós! (informal)', note:'"Tschüss" — la "Ü" es otra vocal redondeada: labios como para "u" pero intentando decir "i". Formal: "Auf Wiedersehen!" [owf VEE-der-zayn] = hasta la vista. Entre amigos: "Tschüss!" es perfectamente natural.', category:'Verabschiedung' },
];

const CATEGORIES = ['Alle', 'Begrüßung', 'Vorstellung', 'Höflichkeit', 'Hilfe', 'Überleben', 'Verabschiedung'];
const CAT_ES: Record<string,string> = { 'Alle':'Todos', 'Begrüßung':'Saludos', 'Vorstellung':'Presentación', 'Höflichkeit':'Cortesía', 'Hilfe':'Ayuda', 'Überleben':'Supervivencia', 'Verabschiedung':'Despedidas' };

export default function HablaAlemanA1() {
  const [filter, setFilter] = useState('Alle');
  const [practiced, setPracticed] = useState<Set<number>>(new Set());
  const [expanded, setExpanded] = useState<number | null>(null);

  const shown = filter==='Alle' ? PHRASES : PHRASES.filter(p=>p.category===filter);
  const pct = Math.round((practiced.size / PHRASES.length) * 100);

  function mark(id: number, val: boolean) {
    setPracticed(prev=>{ const next=new Set(prev); if(val) next.add(id); else next.delete(id); return next; });
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇩🇪 Deutsch A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🗣️ Sprechen</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Sprechen · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Überlebenssätze A1</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:580, margin:'0 0 0.75rem' }}>
          15 frases esenciales con guía fonética y notas para hispanohablantes.
        </p>

        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.5rem' }}>
          <div style={{ flex:1, height:7, background:'var(--line-soft)', borderRadius:4 }}>
            <div style={{ height:'100%', width:`${pct}%`, background:COLOR, borderRadius:4, transition:'width 0.5s' }}/>
          </div>
          <span style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:pct===100?COLOR:'var(--muted)', flexShrink:0 }}>{practiced.size}/{PHRASES.length}</span>
        </div>

        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.25rem' }}>
          {CATEGORIES.map(cat=>(
            <button key={cat} onClick={() => setFilter(cat)}
              className={filter===cat?'btn btn-sm':'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.78rem', ...(filter===cat?{background:COLOR,borderColor:COLOR}:{}) }}>
              {CAT_ES[cat]}
            </button>
          ))}
        </div>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`${COLOR}0a`, border:`1px solid ${COLOR}22`, marginBottom:'1.5rem', fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.6 }}>
          🔑 <strong style={{ color:'var(--ink)' }}>Claves de pronunciación alemana:</strong> W=V, V=F, "ch" gutural, "ö/ü" vocales redondeadas, "ei"=[ai], "ie"=[ee], "eu/äu"=[oy]. Los sustantivos siempre con mayúscula.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
          {shown.map(p=>{
            const done=practiced.has(p.id);
            const isExpanded=expanded===p.id;
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
                    <button onClick={() => mark(p.id,!done)}
                      style={{ fontSize:'0.82rem', padding:'0.3rem 0.75rem', borderRadius:8, border:`1.5px solid ${done?COLOR:'var(--line-soft)'}`, background:done?COLOR:'transparent', color:done?'#fff':'var(--muted)', cursor:'pointer', fontFamily:'inherit', fontWeight:700, transition:'all 0.15s', whiteSpace:'nowrap' }}>
                      {done?'✓ Gelernt':'Geschafft ✓'}
                    </button>
                  </div>
                </div>
                {isExpanded&&(
                  <div style={{ padding:'0.7rem 1.25rem 0.85rem 4.5rem', borderTop:'1px solid var(--line-soft)', background:`${COLOR}04` }}>
                    <div style={{ fontSize:'0.65rem', fontWeight:800, color:COLOR, fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.3rem' }}>Aussprachehinweis</div>
                    <p style={{ margin:0, fontSize:'0.82rem', color:'var(--muted)', lineHeight:1.55 }}>{p.note}</p>
                    <div style={{ marginTop:'0.4rem', display:'inline-block', fontSize:'0.68rem', padding:'0.12rem 0.45rem', borderRadius:5, background:`${COLOR}15`, color:COLOR, fontFamily:'var(--mono)', fontWeight:700 }}>{p.category}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {practiced.size===PHRASES.length&&(
          <div style={{ marginTop:'2rem', padding:'1.25rem 1.5rem', borderRadius:16, background:`${COLOR}0a`, border:`2px solid ${COLOR}33`, textAlign:'center' }}>
            <div style={{ fontSize:'2rem', marginBottom:'0.4rem' }}>🎉</div>
            <p style={{ margin:0, fontWeight:800, color:COLOR, fontSize:'1.1rem' }}>Ausgezeichnet! Alle 15 Sätze beherrscht.</p>
            <p style={{ margin:'0.3rem 0 0', fontSize:'0.85rem', color:'var(--muted)' }}>Jetzt in echten Gesprächen benutzen — übe mit David oder Zhanna.</p>
          </div>
        )}
      </div>
    </section>
  );
}
