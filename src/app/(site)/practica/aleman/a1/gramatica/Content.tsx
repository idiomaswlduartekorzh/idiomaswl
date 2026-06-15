'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#dd0000';

interface Q { s: string; answer: string; hint: string; }
interface Topic { id: string; title: string; icon: string; desc: string; tip: string; qs: Q[]; }

const TOPICS: Topic[] = [
  {
    id:'artikel', title:'Artikel: der, die, das, ein, eine', icon:'🔤',
    desc:'El alemán tiene 3 géneros: masculino (der/ein), femenino (die/eine) y neutro (das/ein). No hay regla universal — hay que aprenderlos de memoria con cada sustantivo.',
    tip:'"der Mann, die Frau, das Kind" — con personas hay lógica. Con objetos hay que memorizar: das Buch (el libro), die Tür (la puerta), der Tisch (la mesa).',
    qs:[
      { s:'Wo ist ___ Tisch? (m.)', answer:'der', hint:'"Tisch" (mesa) es masculino → der Tisch' },
      { s:'Ich kaufe ___ Buch. (n.)', answer:'ein', hint:'"Buch" (libro) es neutro y está en función de objeto → ein Buch (artículo indefinido)' },
      { s:'___ Frau ist sehr nett. (f.)', answer:'Die', hint:'"Frau" (mujer/esposa) es femenino → die Frau' },
      { s:'Das ist ___ Auto. (n.)', answer:'ein', hint:'"Auto" (carro) es neutro → ein Auto (artículo indefinido)' },
      { s:'Ich habe ___ Hund. (m.)', answer:'einen', hint:'"Hund" (perro) es masculino pero como objeto directo (Akkusativ) cambia: ein → einen' },
      { s:'___ Kind spielt im Garten. (n.)', answer:'Das', hint:'"Kind" (niño/a) es neutro → Das Kind' },
      { s:'Wo ist ___ Küche? (f.)', answer:'die', hint:'"Küche" (cocina) es femenino → die Küche' },
      { s:'Ich trinke ___ Kaffee. (m.)', answer:'einen', hint:'"Kaffee" como objeto directo masculino → einen Kaffee (Akkusativ)' },
      { s:'Das ist ___ Wohnung. (f.)', answer:'eine', hint:'"Wohnung" (apartamento) es femenino → eine Wohnung (artículo indefinido)' },
      { s:'___ Mann kommt aus Berlin. (m.)', answer:'Der', hint:'"Mann" (hombre) es masculino como sujeto → Der Mann' },
    ],
  },
  {
    id:'sein', title:'sein — ser/estar (ich bin, du bist…)', icon:'🧩',
    desc:'"Sein" es el verbo más importante del alemán (ser/estar). Se usa para identidad, profesión, origen, estado y descripción. Conjugación irregular: bin/bist/ist/sind/seid/sind.',
    tip:'En alemán "sein" hace las dos funciones de ser y estar: "Ich bin müde" (estoy cansado) y "Ich bin Lehrer" (soy profesor). No hay "estar" separado.',
    qs:[
      { s:'Ich ___ Student.', answer:'bin', hint:'Primera persona singular: ich bin' },
      { s:'Du ___ sehr nett!', answer:'bist', hint:'Segunda persona singular: du bist' },
      { s:'Er ___ aus Deutschland.', answer:'ist', hint:'Tercera persona singular: er/sie/es ist' },
      { s:'Sie (she) ___ Ärztin.', answer:'ist', hint:'Sie (ella) → ist (igual que er)' },
      { s:'Wir ___ Freunde.', answer:'sind', hint:'Primera persona plural: wir sind' },
      { s:'Ihr ___ in Berlin.', answer:'seid', hint:'Segunda persona plural (ustedes informal): ihr seid' },
      { s:'Sie (they) ___ Studenten.', answer:'sind', hint:'Tercera persona plural: sie sind' },
      { s:'Das ___ mein Buch.', answer:'ist', hint:'Das (neutro 3ª persona) → ist' },
      { s:'Ich ___ nicht müde.', answer:'bin', hint:'Con negación "nicht" el verbo no cambia: Ich bin nicht...' },
      { s:'Wo ___ du?', answer:'bist', hint:'Pregunta con du → du bist → ¿Wo bist du?' },
    ],
  },
  {
    id:'haben', title:'haben — tener (ich habe, du hast…)', icon:'✋',
    desc:'"Haben" (tener) es otro verbo fundamental para A1. Se usa para posesión, familia y expresar estados físicos (Ich habe Hunger = tengo hambre).',
    tip:'"Ich habe Hunger/Durst/Angst" literalmente = "Tengo hambre/sed/miedo" — en alemán estos estados se expresan con HABEN, no SEIN.',
    qs:[
      { s:'Ich ___ einen Bruder.', answer:'habe', hint:'Primera persona: ich habe' },
      { s:'Du ___ ein großes Haus.', answer:'hast', hint:'Segunda persona: du hast' },
      { s:'Er ___ keine Zeit.', answer:'hat', hint:'Tercera persona: er/sie/es hat' },
      { s:'Wir ___ zwei Kinder.', answer:'haben', hint:'Primera plural: wir haben' },
      { s:'Ihr ___ viele Freunde.', answer:'habt', hint:'Segunda plural: ihr habt' },
      { s:'Sie (they) ___ ein Auto.', answer:'haben', hint:'Tercera plural: sie haben' },
      { s:'Ich ___ Hunger.', answer:'habe', hint:'Estados físicos con haben: Ich habe Hunger (tengo hambre)' },
      { s:'Sie (she) ___ eine Katze.', answer:'hat', hint:'Sie (ella) → hat — igual que er' },
      { s:'___ du ein Handy?', answer:'Hast', hint:'Pregunta invertida: verbo al inicio → Hast du...?' },
      { s:'Wir ___ keine Garage.', answer:'haben', hint:'Negación con "keine" (ningún/a): kein/keine/kein + sustantivo' },
    ],
  },
  {
    id:'pronomen', title:'Personalpronomen — Pronombres personales', icon:'👤',
    desc:'Los pronombres alemanes: ich (yo), du (tú), er (él), sie (ella), es (ello/neutro), wir (nosotros), ihr (vosotros), sie (ellos), Sie (usted, formal con mayúscula).',
    tip:'"Sie" con mayúscula = usted/ustedes (formal). "sie" con minúscula = ella/ellas. El contexto y la mayúscula marcan la diferencia: "Sind Sie Herr Müller?" vs "Ist sie müde?"',
    qs:[
      { s:'___ heiße Marie.', answer:'Ich', hint:'Primera persona: Ich (yo)' },
      { s:'___ kommst aus Spanien.', answer:'Du', hint:'Segunda persona informal: Du (tú)' },
      { s:'___ ist sehr groß. (m.)', answer:'Er', hint:'Tercera persona masculino: Er (él)' },
      { s:'___ wohnt in Paris. (f.)', answer:'Sie', hint:'Tercera persona femenino: Sie/sie (ella)' },
      { s:'___ sind Studenten. (nosotros)', answer:'Wir', hint:'Primera persona plural: Wir (nosotros)' },
      { s:'___ seid meine Freunde. (vosotros)', answer:'Ihr', hint:'Segunda persona plural informal: Ihr (vosotros)' },
      { s:'___ kommen aus Deutschland. (ellos)', answer:'Sie', hint:'Tercera persona plural: Sie/sie (ellos/ellas)' },
      { s:'___ sind der Chef? (usted formal)', answer:'Sie', hint:'"Sie" con mayúscula = usted. En alemán formal: "Sind Sie der Chef?"' },
      { s:'___ ist klein. (el carro — neutro)', answer:'Es', hint:'Para sustantivos neutros se usa "Es" como pronombre' },
      { s:'___ lernst Deutsch.', answer:'Du', hint:'"Du lernst" — conjugación del verbo regular: -st para du' },
    ],
  },
  {
    id:'negation', title:'Verneinung: nicht y kein/keine', icon:'🚫',
    desc:'"Nicht" niega verbos, adjetivos y adverbios. "Kein/Keine/Kein" niega sustantivos (= ningún, no hay). Regla: "nicht" va al final o delante del elemento negado; "kein" va antes del sustantivo.',
    tip:'"Ich habe kein Auto" (no tengo carro). "Ich fahre nicht" (no manejo). Confusión común: NO se dice "Ich habe nicht ein Auto" — debe ser "kein".',
    qs:[
      { s:'Ich habe ___ Hund. (ningún perro)', answer:'keinen', hint:'"Hund" es masculino objeto (Akkusativ) → keinen (kein + Akkusativ masculino)' },
      { s:'Das ist ___ Problem. (no es un problema)', answer:'kein', hint:'"Problem" es neutro → kein Problem' },
      { s:'Ich verstehe das ___.', answer:'nicht', hint:'"Nicht" niega el verbo "verstehen" — va al final: Ich verstehe das nicht.' },
      { s:'Er kommt ___ heute.', answer:'nicht', hint:'"Nicht" niega el adverbio "heute" — Ich komme nicht heute.' },
      { s:'Wir haben ___ Zeit. (ningún tiempo)', answer:'keine', hint:'"Zeit" es femenino → keine Zeit' },
      { s:'Das ist ___ Tisch. (no es una mesa)', answer:'kein', hint:'"Tisch" es masculino pero aquí como "es" → kein Tisch' },
      { s:'Ich bin ___ müde.', answer:'nicht', hint:'"Nicht" niega el adjetivo "müde" → Ich bin nicht müde.' },
      { s:'Sie hat ___ Kinder. (ningún hijo)', answer:'keine', hint:'"Kinder" (hijos, plural) → keine Kinder' },
      { s:'Ich spreche ___ Englisch.', answer:'kein', hint:'"Englisch" aquí actúa como sustantivo neutro no contable → kein Englisch' },
      { s:'Er arbeitet ___ viel.', answer:'nicht', hint:'"Nicht" niega el adverbio "viel" — Er arbeitet nicht viel.' },
    ],
  },
];

export default function GramaticaAlemanA1() {
  const [topicIdx, setTopicIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number,string>>({});
  const [checked, setChecked] = useState(false);

  const topic = TOPICS[topicIdx];
  const score = topic.qs.filter((q,i)=>answers[i]?.trim().toLowerCase()===q.answer.toLowerCase()).length;

  function reset() { setAnswers({}); setChecked(false); }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:800 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/aleman/a1" style={{ color:'var(--muted)', textDecoration:'none' }}>🇩🇪 Deutsch A1</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📝 Grammatik</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line"/>Grammatik · Deutsch A1</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 1.5rem', fontWeight:700 }}>Grammatik A1</h1>

        <div style={{ display:'flex', gap:'0.45rem', flexWrap:'wrap', marginBottom:'1.75rem' }}>
          {TOPICS.map((t,i)=>(
            <button key={t.id} onClick={() => { setTopicIdx(i); reset(); }}
              className={topicIdx===i?'btn btn-sm':'btn btn-ghost btn-sm'}
              style={{ fontSize:'0.8rem', ...(topicIdx===i?{background:COLOR,borderColor:COLOR}:{}) }}>
              {t.icon} {t.title.split('—')[0].trim()}
            </button>
          ))}
        </div>

        <div style={{ padding:'1.1rem 1.3rem', borderRadius:14, background:`${COLOR}08`, border:`1.5px solid ${COLOR}22`, marginBottom:'1.5rem' }}>
          <div style={{ fontWeight:800, color:'var(--ink)', marginBottom:'0.3rem' }}>{topic.icon} {topic.title}</div>
          <p style={{ margin:'0 0 0.5rem', fontSize:'0.88rem', color:'var(--muted)', lineHeight:1.6 }}>{topic.desc}</p>
          <div style={{ padding:'0.55rem 0.75rem', borderRadius:8, background:`${COLOR}0d`, fontSize:'0.82rem', color:COLOR, borderLeft:`3px solid ${COLOR}` }}>💡 {topic.tip}</div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'1.25rem' }}>
          {topic.qs.map((q,i)=>{
            const val=answers[i]||'';
            const correct=val.trim().toLowerCase()===q.answer.toLowerCase();
            return (
              <div key={i} style={{ padding:'0.85rem 1.1rem', borderRadius:12, border:`1.5px solid ${checked?(correct?'#05966944':'#dc262644'):'var(--line-soft)'}`, background:checked?(correct?'rgba(5,150,105,0.04)':'rgba(220,38,38,0.03)'):'var(--bg)' }}>
                <p style={{ margin:'0 0 0.5rem', color:'var(--ink)', fontWeight:600, fontSize:'0.93rem', lineHeight:1.55 }}>
                  {q.s.split('___').map((part,j,arr)=>(
                    <span key={j}>{part}{j<arr.length-1&&(
                      checked
                        ? <span style={{ padding:'0.1rem 0.5rem', borderRadius:5, background:correct?'rgba(5,150,105,0.12)':'rgba(220,38,38,0.12)', color:correct?'#059669':'#dc2626', fontFamily:'var(--mono)', fontWeight:800 }}>{val||'___'}</span>
                        : <input value={val} onChange={e=>!checked&&setAnswers(p=>({...p,[i]:e.target.value}))}
                            onKeyDown={e=>e.key==='Enter'&&!checked&&setChecked(true)}
                            style={{ display:'inline-block', width:80, padding:'0.1rem 0.35rem', borderRadius:5, border:`1.5px solid ${COLOR}55`, background:'var(--bg)', color:'var(--ink)', fontSize:'0.88rem', fontFamily:'var(--mono)', fontWeight:700, textAlign:'center', outline:'none' }}/>
                    )}</span>
                  ))}
                </p>
                {checked&&<p style={{ margin:0, fontSize:'0.78rem', color:correct?'#059669':'#dc2626', fontFamily:'var(--mono)' }}>
                  {correct?`✓ Richtig! "${q.answer}"`:`✗ Richtig: "${q.answer}"`} — {q.hint}
                </p>}
              </div>
            );
          })}
        </div>

        {!checked
          ? <button className="btn btn-sm" onClick={() => setChecked(true)} style={{ background:COLOR, borderColor:COLOR }}>Überprüfen →</button>
          : (
            <div style={{ display:'flex', gap:'0.65rem', alignItems:'center', flexWrap:'wrap' }}>
              <div style={{ padding:'0.65rem 1rem', borderRadius:10, background:`${COLOR}0d`, border:`1.5px solid ${COLOR}33`, fontWeight:800, color:COLOR, fontFamily:'var(--mono)' }}>
                {score}/{topic.qs.length} richtig
              </div>
              <button className="btn btn-ghost btn-sm" onClick={reset}>Nochmal üben</button>
              {topicIdx<TOPICS.length-1&&<button className="btn btn-sm" onClick={() => { setTopicIdx(i=>i+1); reset(); }} style={{ background:COLOR, borderColor:COLOR }}>Nächstes Thema →</button>}
            </div>
          )
        }
      </div>
    </section>
  );
}
