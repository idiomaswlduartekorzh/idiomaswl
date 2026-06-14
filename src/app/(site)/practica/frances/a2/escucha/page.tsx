import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Français A2 Compréhension orale — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de francés. Diálogos auténticos A2 en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/frances/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: "À l'aéroport",
    desc: 'Escucha un diálogo en el aeropuerto: check-in, equipaje y cambio de vuelo. Practica vocabulario de viajes en contexto real.',
    script: `"Bonjour, votre passeport et votre billet, s'il vous plaît. — Voilà. — Merci. Avez-vous des bagages à enregistrer ? — Oui, j'ai une valise. — Elle fait combien de kilos ? — Je ne sais pas exactement... — Posez-la sur la balance, s'il vous plaît. Elle fait 23 kilos, c'est parfait. Vous avez choisi votre siège ? — Non, pas encore. Je préfère un siège côté fenêtre si possible. — Il me reste un siège côté fenêtre en rangée 14. — C'est parfait, merci beaucoup. — Voici votre carte d'embarquement. L'embarquement commence à 14h30, porte B7."`,
    questions: ['¿Cuántos kilos pesa la maleta?', '¿Qué tipo de asiento prefiere el pasajero?', '¿En qué fila y puerta es el embarque?', '¿A qué hora comienza el embarque?', '¿Qué documentos pide la agente?', '¿Cómo dice "peso permitido exacto" la agente?'],
    duration: '~50 seg', accent: 'Francés estándar — aeropuerto', wpm: 110,
  },
  {
    id: 2, title: "Une conversation au restaurant",
    desc: 'Escucha a dos personas pedir en un restaurante parisino. Vocabulario: carta, platos, vino, cuenta y propina.',
    script: `"Bonsoir ! Vous avez une réservation ? — Oui, au nom de Dubois, pour deux personnes. — Parfait, suivez-moi. Voilà votre table. Je vous apporte la carte. — Merci. ... — Vous avez choisi ? — Oui, pour moi, une soupe à l'oignon comme entrée et un steak-frites comme plat principal, s'il vous plaît. — Et pour vous, madame ? — Je voudrais la salade niçoise et le saumon grillé. — Vous voulez quelque chose à boire ? — Une bouteille d'eau plate et un verre de vin rouge. — Très bien. ... — L'addition, s'il vous plaît ! — Voilà. Ça fait 48 euros. — Gardez la monnaie. — Merci beaucoup, bonne soirée !"`,
    questions: ['¿A qué nombre está la reserva?', '¿Cuántas personas son?', '¿Qué pide el señor de entrante y plato principal?', '¿Qué pide la señora?', '¿Cuánto cuesta la cuenta?', '¿Qué bebidas piden?'],
    duration: '~55 seg', accent: 'Francés parisino — restaurante', wpm: 105,
  },
  {
    id: 3, title: "Un appel téléphonique professionnel",
    desc: 'Escucha una llamada de trabajo: concertar una reunión, dejar un mensaje y confirmar datos. Vocabulario de negocios A2.',
    script: `"Allô, bonjour, ici le cabinet Martin. — Bonjour, je suis Thomas Leclerc, de la société Innovatech. Je voudrais parler à Madame Fontaine, s'il vous plaît. — Je suis désolé, Madame Fontaine est en réunion jusqu'à 16h. Vous voulez laisser un message ? — Oui, s'il vous plaît. Pouvez-vous lui dire que j'appelle au sujet de notre rendez-vous du jeudi 20 juin ? Je voudrais changer l'heure si possible. — Bien sûr. Votre numéro de téléphone ? — C'est le 06 12 34 56 78. — Je lui transmets le message. — Merci beaucoup. Au revoir. — Au revoir, bonne journée !"`,
    questions: ['¿De qué empresa llama Thomas Leclerc?', '¿Por qué no puede hablar con Madame Fontaine ahora?', '¿Sobre qué tema llama Thomas?', '¿Cuál es su número de teléfono?', '¿Hasta qué hora está en reunión Madame Fontaine?', '¿Qué quiere cambiar Thomas?'],
    duration: '~50 seg', accent: 'Francés professionnel standard', wpm: 100,
  },
];

export default function EscuchaFrancesA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A2</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>🎧 Compréhension orale</span>
        </div>

        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Compréhension orale · Français A2</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Compréhension orale A2</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:560, margin:'0 0 2rem' }}>
          3 dialogues A2 en préparation — voix natives françaises. <strong style={{ color:'var(--ink)' }}>Scripts y preguntas ya listos.</strong>
        </p>

        <div style={{ padding:'0.85rem 1.1rem', borderRadius:12, background:`rgba(3,105,161,0.08)`, border:`1px solid rgba(3,105,161,0.2)`, marginBottom:'2rem', fontSize:'0.85rem', color:'var(--muted)', lineHeight:1.6 }}>
          🎙️ <strong style={{ color:'var(--ink)' }}>Mientras tanto:</strong> Lee los scripts en voz alta e intenta responder las preguntas sin releer. También puedes escuchar <strong style={{ color:'var(--ink)' }}>TV5Monde</strong> o <strong style={{ color:'var(--ink)' }}>RFI Savoirs</strong> para audios A2 reales con transcripciones.
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border:`1.5px solid rgba(3,105,161,0.2)`, borderRadius:18, overflow:'hidden' }}>
              <div style={{ padding:'1.25rem 1.5rem', background:`rgba(3,105,161,0.04)` }}>
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
                        <span key={tag} style={{ fontSize:'0.68rem', padding:'0.15rem 0.5rem', borderRadius:6, background:'rgba(3,105,161,0.08)', color:COLOR, fontFamily:'var(--mono)', fontWeight:600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid var(--line-soft)' }}>
                <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.5rem' }}>Script</div>
                <p style={{ margin:'0 0 0.85rem', fontSize:'0.88rem', color:'var(--ink)', lineHeight:1.65, fontStyle:'italic', borderLeft:`3px solid rgba(3,105,161,0.3)`, paddingLeft:'0.75rem', whiteSpace:'pre-wrap' }}>
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
