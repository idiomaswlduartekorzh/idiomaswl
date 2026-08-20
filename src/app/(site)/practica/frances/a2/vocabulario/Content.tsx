'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; gender?: string; }
interface VocabSet { id: string; name: string; nameFr: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'voyages', name: 'Viajes y transporte', nameFr: 'Voyages et transport', icon: '✈️',
    words: [
      { word:'le billet', es:'el billete / tiquete', emoji:'🎫', example:'J\'ai acheté un billet aller-retour pour Lyon.', exampleEs:'Compré un billete de ida y vuelta a Lyon.', pronunciation:'[biyé]', gender:'m' },
      { word:'le passeport', es:'el pasaporte', emoji:'📕', example:'N\'oublie pas ton passeport !', exampleEs:'¡No olvides tu pasaporte!', pronunciation:'[pasepOR]', gender:'m' },
      { word:'les bagages', es:'el equipaje', emoji:'🧳', example:'Mes bagages sont trop lourds.', exampleEs:'Mi equipaje es demasiado pesado.', pronunciation:'[baGAZH]', gender:'m' },
      { word:'la douane', es:'la aduana', emoji:'🛃', example:'Il faut passer par la douane.', exampleEs:'Hay que pasar por la aduana.', pronunciation:'[dwan]', gender:'f' },
      { word:'l\'enregistrement', es:'el check-in', emoji:'✅', example:'L\'enregistrement commence à 14h.', exampleEs:'El check-in comienza a las 14h.', pronunciation:'[ãrəZHistrəMÃ]', gender:'m' },
      { word:'la destination', es:'el destino', emoji:'📍', example:'Quelle est votre destination finale ?', exampleEs:'¿Cuál es su destino final?', pronunciation:'[destinaSYÕ]', gender:'f' },
      { word:'le départ', es:'la salida', emoji:'🚀', example:'Le départ est prévu à 8h du matin.', exampleEs:'La salida está prevista a las 8 de la mañana.', pronunciation:'[depAR]', gender:'m' },
      { word:'l\'arrivée', es:'la llegada', emoji:'🛬', example:'L\'arrivée est à 11h30.', exampleEs:'La llegada es a las 11h30.', pronunciation:'[ariVÉ]', gender:'f' },
      { word:'l\'escale', es:'la escala (vuelo)', emoji:'✈️', example:'Il y a une escale à Madrid.', exampleEs:'Hay una escala en Madrid.', pronunciation:'[esKAL]', gender:'f' },
      { word:"la carte d'embarquement", es:'la tarjeta de embarque', emoji:'🗂️', example:"N'oubliez pas votre carte d'embarquement.", exampleEs:'No olvide su tarjeta de embarque.', pronunciation:'[kart dãbarkəMÃ]', gender:'f' },
    ],
  },
  {
    id: 'travail', name: 'Trabajo y carrera', nameFr: 'Travail et carrière', icon: '💼',
    words: [
      { word:'le salaire', es:'el salario / sueldo', emoji:'💰', example:'Son salaire a augmenté cette année.', exampleEs:'Su salario aumentó este año.', pronunciation:'[salÈR]', gender:'m' },
      { word:'le/la collègue', es:'el/la colega / compañero/a', emoji:'🤝', example:'Mes collègues sont très sympas.', exampleEs:'Mis colegas son muy simpáticos.', pronunciation:'[kolÈG]' },
      { word:'le/la directeur/trice', es:'el/la director/a', emoji:'👔', example:'La directrice a organisé une réunion.', exampleEs:'La directora organizó una reunión.', pronunciation:'[direktÖR/tris]' },
      { word:'le délai', es:'el plazo / el límite de tiempo', emoji:'⏰', example:'Nous devons respecter le délai.', exampleEs:'Debemos respetar el plazo.', pronunciation:'[deLÉ]', gender:'m' },
      { word:'la réunion', es:'la reunión', emoji:'📋', example:'La réunion est annulée.', exampleEs:'La reunión está cancelada.', pronunciation:'[reÜnyõ]', gender:'f' },
      { word:'la promotion', es:'el ascenso / la promoción', emoji:'⬆️', example:'Il a eu une promotion ce mois-ci.', exampleEs:'Tuvo un ascenso este mes.', pronunciation:'[prəmoSYÕ]', gender:'f' },
      { word:'démissionner', es:'renunciar / dimitir', emoji:'🚪', example:'Elle a décidé de démissionner.', exampleEs:'Ella decidió renunciar.', pronunciation:'[demisyoNÉ]' },
      { word:'embaucher', es:'contratar (a alguien)', emoji:'📝', example:"L'entreprise va embaucher vingt personnes.", exampleEs:'La empresa va a contratar a veinte personas.', pronunciation:'[ãboSHÉ]' },
      { word:'le chômeur / la chômeuse', es:'el/la desempleado/a', emoji:'📉', example:"Le nombre de chômeurs a diminué.", exampleEs:'El número de desempleados disminuyó.', pronunciation:'[SHÔmör]' },
      { word:'les heures supplémentaires', es:'las horas extra', emoji:'⌚', example:'Il fait beaucoup d\'heures supplémentaires.', exampleEs:'Hace muchas horas extra.', pronunciation:'[ör süplemãTÈR]', gender:'f' },
    ],
  },
  {
    id: 'shopping', name: 'Compras y dinero', nameFr: 'Shopping et argent', icon: '🛍️',
    words: [
      { word:'le reçu', es:'el recibo', emoji:'🧾', example:'Gardez votre reçu pour les retours.', exampleEs:'Guarde su recibo para las devoluciones.', pronunciation:'[rəSÜ]', gender:'m' },
      { word:'la remise', es:'el descuento', emoji:'🏷️', example:'Il y a une remise de 20% ce week-end.', exampleEs:'Hay un descuento del 20% este fin de semana.', pronunciation:'[rəMIZ]', gender:'f' },
      { word:'le remboursement', es:'el reembolso / la devolución', emoji:'↩️', example:'J\'ai demandé un remboursement.', exampleEs:'Pedí un reembolso.', pronunciation:'[rãbursəMÃ]', gender:'m' },
      { word:'une bonne affaire', es:'una ganga / un buen negocio', emoji:'🤑', example:'Ce manteau à 30€, c\'est une bonne affaire !', exampleEs:'Este abrigo a 30€, ¡es una ganga!', pronunciation:'[bon afÈR]', gender:'f' },
      { word:"se permettre", es:'permitirse (económicamente)', emoji:'💳', example:'Je ne peux pas me permettre ce voyage.', exampleEs:'No puedo permitirme ese viaje.', pronunciation:'[sə pèrMÈTR]' },
      { word:'la monnaie', es:'la moneda / el cambio (dinero)', emoji:'🪙', example:"Je n'ai pas de monnaie.", exampleEs:'No tengo moneda/cambio.', pronunciation:'[moNÈ]', gender:'f' },
      { word:'les espèces', es:'el efectivo', emoji:'💵', example:'Vous payez en espèces ou par carte ?', exampleEs:'¿Paga en efectivo o con tarjeta?', pronunciation:'[esPÈS]', gender:'f' },
      { word:'la carte bleue', es:'la tarjeta de débito (Francia)', emoji:'💳', example:'Je peux payer avec ma carte bleue ?', exampleEs:'¿Puedo pagar con mi tarjeta?', pronunciation:'[kart blÖ]', gender:'f' },
      { word:'la monnaie (change)', es:'el cambio (vuelta)', emoji:'🔄', example:"Gardez la monnaie !", exampleEs:'¡Quédese con el cambio!', pronunciation:'[moNÈ]', gender:'f' },
      { word:"l'étiquette", es:'la etiqueta (de precio)', emoji:'🏷️', example:"L'étiquette dit 25 euros.", exampleEs:'La etiqueta dice 25 euros.', pronunciation:'[etiKÈT]', gender:'f' },
    ],
  },
  {
    id: 'sante', name: 'Salud y cuerpo', nameFr: 'Santé et corps', icon: '🏥',
    words: [
      { word:'le mal de tête', es:'el dolor de cabeza', emoji:'🤕', example:"J'ai un terrible mal de tête.", exampleEs:'Tengo un terrible dolor de cabeza.', pronunciation:'[mal də tÈT]', gender:'m' },
      { word:'la fièvre', es:'la fiebre', emoji:'🌡️', example:"Il a 39 degrés de fièvre.", exampleEs:'Tiene 39 grados de fiebre.', pronunciation:'[fyÈVR]', gender:'f' },
      { word:"l'ordonnance", es:'la receta médica', emoji:'📋', example:"Le médecin m'a donné une ordonnance.", exampleEs:'El médico me dio una receta.', pronunciation:'[ordoNÃS]', gender:'f' },
      { word:'la pharmacie', es:'la farmacia', emoji:'💊', example:"La pharmacie est ouverte jusqu'à 20h.", exampleEs:'La farmacia está abierta hasta las 20h.', pronunciation:'[farMASI]', gender:'f' },
      { word:'le symptôme', es:'el síntoma', emoji:'🔍', example:"Quels sont vos symptômes ?", exampleEs:'¿Cuáles son sus síntomas?', pronunciation:'[sẽPTÔM]', gender:'m' },
      { word:'le rendez-vous', es:'la cita (médica)', emoji:'📅', example:"J'ai un rendez-vous chez le médecin.", exampleEs:'Tengo una cita médica.', pronunciation:'[rãdéVÜ]', gender:'m' },
      { word:'le/la chirurgien/ne', es:'el/la cirujano/a', emoji:'🔬', example:"Le chirurgien opère demain matin.", exampleEs:'El cirujano opera mañana por la mañana.', pronunciation:'[SHirürZHYÃ]' },
      { word:'guérir', es:'curar / recuperarse', emoji:'💪', example:"Il a mis deux semaines pour guérir.", exampleEs:'Tardó dos semanas en recuperarse.', pronunciation:'[géRIR]' },
      { word:"l'allergie", es:'la alergia', emoji:'🤧', example:"J'ai une allergie aux noix.", exampleEs:'Soy alérgico/a a las nueces.', pronunciation:'[alerZHI]', gender:'f' },
      { word:'la piqûre', es:'la inyección / la picadura', emoji:'💉', example:"Le médecin m'a fait une piqûre.", exampleEs:'El médico me puso una inyección.', pronunciation:'[piKÜR]', gender:'f' },
    ],
  },
  {
    id: 'personnalite', name: 'Describir personas', nameFr: 'Décrire les personnes', icon: '👤',
    words: [
      { word:'confiant(e)', es:'seguro/a de sí mismo', emoji:'😎', example:"Elle est très confiante en public.", exampleEs:'Ella es muy segura en público.', pronunciation:'[kõfYÃ/t]' },
      { word:'ambitieux/euse', es:'ambicioso/a', emoji:'🚀', example:"Mon nouveau collègue est très ambitieux.", exampleEs:'Mi nuevo colega es muy ambicioso.', pronunciation:'[ãbisYÖ/öz]' },
      { word:'fiable', es:'confiable / de confianza', emoji:'🤝', example:"C'est une personne fiable et honnête.", exampleEs:'Es una persona confiable y honesta.', pronunciation:'[fyABL]' },
      { word:'têtu(e)', es:'terco/a / obstinado/a', emoji:'🐂', example:"Il est têtu — il ne change jamais d'avis.", exampleEs:'Es terco — nunca cambia de opinión.', pronunciation:'[teTÜ]' },
      { word:'généreux/euse', es:'generoso/a', emoji:'🎁', example:"Elle est très généreuse avec ses amis.", exampleEs:'Es muy generosa con sus amigos.', pronunciation:'[ZHéneRÖ/öz]' },
      { word:'patient(e)', es:'paciente', emoji:'⏳', example:"Un bon professeur doit être patient.", exampleEs:'Un buen profesor debe ser paciente.', pronunciation:'[paSYÃ/t]' },
      { word:'anxieux/euse', es:'ansioso/a', emoji:'😰', example:"Il est anxieux avant les examens.", exampleEs:'Está ansioso antes de los exámenes.', pronunciation:'[ãksYÖ/öz]' },
      { word:'joyeux/euse', es:'alegre / jovial', emoji:'😄', example:"C'est une personne toujours joyeuse.", exampleEs:'Es una persona siempre alegre.', pronunciation:'[ZHwaYÖ/öz]' },
      { word:'indépendant(e)', es:'independiente', emoji:'🦅', example:"Elle préfère vivre seule — elle est indépendante.", exampleEs:'Prefiere vivir sola — es independiente.', pronunciation:'[ẽdepãDÃ/t]' },
      { word:'créatif/ive', es:'creativo/a', emoji:'🎨', example:"Les artistes doivent être créatifs.", exampleEs:'Los artistas deben ser creativos.', pronunciation:'[kreaТIF/iv]' },
    ],
  },
  {
    id: 'restaurant', name: 'Comida y restaurantes', nameFr: 'Nourriture et restaurants', icon: '🍽️',
    words: [
      { word:'la carte / le menu', es:'la carta / el menú del día', emoji:'📋', example:"Je voudrais voir la carte, s'il vous plaît.", exampleEs:'Me gustaría ver la carta, por favor.', pronunciation:'[kart / məNÜ]', gender:'f/m' },
      { word:"l'entrée", es:'la entrada (primer plato)', emoji:'🥗', example:"Comme entrée, je prends la soupe.", exampleEs:'De entrada tomo la sopa.', pronunciation:'[ãTRÉ]', gender:'f' },
      { word:'le plat principal', es:'el plato principal', emoji:'🍽️', example:"Le plat principal est un steak-frites.", exampleEs:'El plato principal es un bistec con papas.', pronunciation:'[pla prẽsiPAL]', gender:'m' },
      { word:'le dessert', es:'el postre', emoji:'🍮', example:"Pour le dessert, je prends une crème brûlée.", exampleEs:'De postre tomo una crème brûlée.', pronunciation:'[deZÈR]', gender:'m' },
      { word:"l'addition", es:'la cuenta', emoji:'🧾', example:"L'addition, s'il vous plaît !", exampleEs:'¡La cuenta, por favor!', pronunciation:'[adiSYÕ]', gender:'f' },
      { word:'le pourboire', es:'la propina', emoji:'💰', example:"En France, le pourboire n'est pas obligatoire.", exampleEs:'En Francia, la propina no es obligatoria.', pronunciation:'[purBWAR]', gender:'m' },
      { word:'la réservation', es:'la reserva', emoji:'📞', example:"J'ai une réservation au nom de Martin.", exampleEs:'Tengo una reserva a nombre de Martin.', pronunciation:'[rezervaSYÕ]', gender:'f' },
      { word:'le serveur / la serveuse', es:'el mesero / la mesera', emoji:'🤵', example:"Le serveur est très attentionné.", exampleEs:'El mesero es muy atento.', pronunciation:'[serVÖR / serVÖZ]' },
      { word:"l'ingrédient", es:'el ingrediente', emoji:'🧄', example:"Quels sont les ingrédients de ce plat ?", exampleEs:'¿Cuáles son los ingredientes de este plato?', pronunciation:'[ẽgrédYÃ]', gender:'m' },
      { word:'la saveur', es:'el sabor', emoji:'😋', example:"Ce fromage a une saveur intense.", exampleEs:'Este queso tiene un sabor intenso.', pronunciation:'[saVÖR]', gender:'f' },
    ],
  },
  {
    id: 'technologie', name: 'Tecnología y comunicación', nameFr: 'Technologie et communication', icon: '📱',
    words: [
      { word:'le mot de passe', es:'la contraseña', emoji:'🔑', example:"J'ai oublié mon mot de passe.", exampleEs:'Olvidé mi contraseña.', pronunciation:'[mo də PAS]', gender:'m' },
      { word:'la mise à jour', es:'la actualización', emoji:'🔄', example:"Il faut faire la mise à jour du logiciel.", exampleEs:'Hay que actualizar el software.', pronunciation:'[miz a ZHUR]', gender:'f' },
      { word:'télécharger', es:'descargar', emoji:'⬇️', example:"J'ai téléchargé l'application.", exampleEs:'Descargué la aplicación.', pronunciation:'[teleSHarZHÉ]' },
      { word:'la connexion', es:'la conexión (internet)', emoji:'📶', example:"La connexion est lente aujourd'hui.", exampleEs:'La conexión está lenta hoy.', pronunciation:'[konekSYÕ]', gender:'f' },
      { word:"l'appareil", es:'el dispositivo / el aparato', emoji:'📱', example:"Mon appareil est en panne.", exampleEs:'Mi dispositivo está averiado.', pronunciation:'[apaRÈY]', gender:'m' },
      { word:'le courriel', es:'el correo electrónico', emoji:'📧', example:"Je vous envoie le document par courriel.", exampleEs:'Le envío el documento por correo electrónico.', pronunciation:'[kuRYÈL]', gender:'m' },
      { word:'la pièce jointe', es:'el archivo adjunto', emoji:'📎', example:"La pièce jointe est trop lourde.", exampleEs:'El archivo adjunto es demasiado pesado.', pronunciation:'[pyès ZHWÃT]', gender:'f' },
      { word:'rechercher', es:'buscar (en internet)', emoji:'🔍', example:"J'ai recherché l'information en ligne.", exampleEs:'Busqué la información en línea.', pronunciation:'[rəSHèrSHÉ]' },
      { word:'charger', es:'cargar (batería)', emoji:'🔋', example:"Mon téléphone est à plat — je dois le charger.", exampleEs:'Mi teléfono está sin batería — debo cargarlo.', pronunciation:'[SHarZHÉ]' },
      { word:'la notification', es:'la notificación', emoji:'🔔', example:"J'ai désactivé les notifications.", exampleEs:'Desactivé las notificaciones.', pronunciation:'[notifikaСYÕ]', gender:'f' },
    ],
  },
  {
    id: 'environnement', name: 'Medio ambiente y naturaleza', nameFr: 'Environnement et nature', icon: '🌿',
    words: [
      { word:'la pollution', es:'la contaminación', emoji:'🏭', example:"La pollution de l'air est un problème majeur.", exampleEs:'La contaminación del aire es un problema mayor.', pronunciation:'[polüSYÕ]', gender:'f' },
      { word:'recycler', es:'reciclar', emoji:'♻️', example:"Il faut recycler le verre et le papier.", exampleEs:'Hay que reciclar el vidrio y el papel.', pronunciation:'[rəsiKLÉ]' },
      { word:'renouvelable', es:'renovable', emoji:'☀️', example:"L'énergie renouvelable est l'avenir.", exampleEs:'La energía renovable es el futuro.', pronunciation:'[rənuveˈlabl]' },
      { word:'la sécheresse', es:'la sequía', emoji:'🌵', example:"Cette région souffre d'une sécheresse.", exampleEs:'Esta región sufre una sequía.', pronunciation:'[seSHrÈS]', gender:'f' },
      { word:"l'inondation", es:'la inundación', emoji:'🌊', example:"Des inondations ont touché le sud de la France.", exampleEs:'Inundaciones afectaron el sur de Francia.', pronunciation:'[inõdaSYÕ]', gender:'f' },
      { word:"l'espèce menacée", es:'la especie en peligro', emoji:'🦁', example:"Le tigre est une espèce menacée.", exampleEs:'El tigre es una especie en peligro.', pronunciation:'[esPÈS məNaSÉ]', gender:'f' },
      { word:"l'habitat", es:'el hábitat', emoji:'🏡', example:"La déforestation détruit l'habitat des animaux.", exampleEs:'La deforestación destruye el hábitat de los animales.', pronunciation:'[abitA]', gender:'m' },
      { word:'la déforestation', es:'la deforestación', emoji:'🌳', example:"La déforestation détruit les forêts tropicales.", exampleEs:'La deforestación destruye las selvas tropicales.', pronunciation:'[deforestaСYÕ]', gender:'f' },
      { word:'le climat', es:'el clima', emoji:'🌍', example:"Le changement climatique est urgent.", exampleEs:'El cambio climático es urgente.', pronunciation:'[kliMA]', gender:'m' },
      { word:'le carbone', es:'el carbono / las emisiones de CO₂', emoji:'💨', example:"Il faut réduire les émissions de carbone.", exampleEs:'Hay que reducir las emisiones de carbono.', pronunciation:'[karBON]', gender:'m' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>🎴</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>¡Mazo completado!</h3>
      <p style={{ color:'var(--muted)', fontSize:'0.88rem', marginBottom:'1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1.25rem' }}>
      <div style={{ fontSize:'0.78rem', fontFamily:'var(--mono)', color:'var(--muted)' }}>{idx+1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width:'100%', maxWidth:400, minHeight:200, cursor:'pointer', borderRadius:18, border:`2px solid ${flipped?COLOR:'var(--line-soft)'}`, background:flipped?`${COLORMix(3.1)}`:'var(--bg)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:'0.65rem', padding:'1.5rem', transition:'all 0.3s', textAlign:'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize:'2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
            {w.pronunciation && <div style={{ fontSize:'0.75rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.1rem 0.5rem', borderRadius:5, background:`${COLORMix(8.2)}` }}>{w.pronunciation}</div>}
            <div style={{ fontSize:'0.78rem', color:'var(--muted)', marginTop:'0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize:'1rem', color:'var(--muted)', fontStyle:'italic' }}>{w.word}</div>
            <div style={{ fontSize:'1.5rem', fontWeight:800, color:COLOR }}>{w.es}</div>
            <div style={{ fontSize:'0.82rem', color:'var(--muted)', marginTop:'0.5rem', lineHeight:1.5, borderTop:'1px solid var(--line-soft)', paddingTop:'0.5rem', width:'100%', textAlign:'left' }}>
              <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span><br/>
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display:'flex', gap:'0.65rem', flexWrap:'wrap', justifyContent:'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k+1); setIdx(i => i+1); setFlipped(false); }} style={{ background:COLOR, borderColor:COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i+1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score >= shuffled.length*0.8?'🏆':'⭐'}</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.4rem', fontWeight:800, color:'var(--ink)' }}>{w.word}</div>
        {w.pronunciation && <div style={{ fontSize:'0.72rem', fontFamily:'var(--mono)', color:COLOR, fontWeight:700, padding:'0.12rem 0.5rem', borderRadius:5, background:`${COLORMix(8.2)}`, display:'inline-block', marginTop:'0.3rem' }}>{w.pronunciation}</div>}
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)', textAlign:'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display:'flex', flexDirection:'column', gap:'0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg='var(--bg)', border='1.5px solid var(--line-soft)', color='var(--ink)';
          if (answered !== null && isCorrect) { bg='rgba(5,150,105,0.1)'; border='1.5px solid #059669'; color='#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg='rgba(220,38,38,0.1)'; border='1.5px solid #dc2626'; color='#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s=>s+1); }}
              style={{ padding:'0.65rem 1rem', borderRadius:10, border, background:bg, color, fontSize:'0.95rem', cursor:answered!==null?'default':'pointer', fontFamily:'inherit', textAlign:'left', transition:'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding:'0.65rem 0.9rem', borderRadius:8, background:allOpts[answered]===w.es?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.82rem', color:'var(--muted)', marginBottom:'0.65rem' }}>
            <span style={{ fontStyle:'italic', color:'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setAnswered(null); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign:'center', padding:'2rem' }}>
      <div style={{ fontSize:'2.5rem', marginBottom:'0.5rem' }}>{score>=shuffled.length*0.7?'🎉':'📝'}</div>
      <h3 style={{ margin:'0 0 0.5rem', color:COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display:'flex', gap:'0.65rem', justifyContent:'center', flexWrap:'wrap', marginTop:'1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() ||
    input.trim().toLowerCase() === w.word.toLowerCase().replace(/[\(\/].*/, '').trim();

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
      <div style={{ padding:'1.25rem', borderRadius:14, background:'var(--bg-2)', border:'1px solid var(--line-soft)', textAlign:'center' }}>
        <div style={{ fontSize:'2rem', marginBottom:'0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize:'1.1rem', fontWeight:700, color:COLOR }}>{w.es}</div>
        <div style={{ fontSize:'0.8rem', color:'var(--muted)', marginTop:'0.25rem', fontStyle:'italic' }}>{w.example.replace(new RegExp(w.word.split('/')[0].replace(/[\[\]()\']/g,'').trim(), 'i'), '___')}</div>
      </div>
      <p style={{ margin:0, fontWeight:600, color:'var(--ink)' }}>Escribe la palabra en francés:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="Ta réponse en français..."
        onKeyDown={e => { if (e.key==='Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s=>s+1); }}}
        style={{ padding:'0.7rem 1rem', borderRadius:10, border:`1.5px solid ${checked?(isCorrect?'#059669':'#dc2626'):'var(--line-soft)'}`, background:'var(--bg)', color:'var(--ink)', fontSize:'1rem', fontFamily:'inherit', outline:'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s=>s+1); }} style={{ background:COLOR, borderColor:COLOR }}>Vérifier</button>}
      {checked && (
        <div>
          <div style={{ padding:'0.7rem 0.9rem', borderRadius:9, background:isCorrect?'rgba(5,150,105,0.08)':'rgba(220,38,38,0.08)', fontSize:'0.88rem', marginBottom:'0.65rem' }}>
            {isCorrect ? '✅ ¡Correct!' : `✗ La réponse est: ${w.word}`}
            <div style={{ marginTop:'0.3rem', fontSize:'0.8rem', color:'var(--muted)', fontStyle:'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i=>i+1); setInput(''); setChecked(false); }} style={{ background:COLOR, borderColor:COLOR }}>
            {idx < shuffled.length - 1 ? 'Suivant →' : 'Voir résultat →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioFrancesA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:580 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.25rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background:'none', border:'none', color:'var(--muted)', cursor:'pointer', padding:0, fontFamily:'var(--mono)', fontSize:'0.82rem' }}>← {set.nameFr}</button>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Choix multiple' : '✏️ Écrire'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom:'1.5rem' }}>← Vocabulaire A2</button>
        <p className="eyebrow" style={{ marginBottom:'0.4rem' }}><span className="ink-line" />{set.icon} {set.nameFr}</p>
        <h2 style={{ fontSize:'1.75rem', margin:'0 0 0.25rem', fontWeight:700 }}>{set.name}</h2>
        <p style={{ color:'var(--muted)', fontSize:'0.9rem', margin:'0 0 1.5rem' }}>{set.words.length} mots · Choisissez un mode de pratique</p>
        <div style={{ display:'flex', flexDirection:'column', gap:'0.75rem', marginBottom:'2rem' }}>
          {[
            { id:'flashcard' as PracticeMode, icon:'🎴', title:'Flashcards', desc:'Ve cada palabra y su traducción. Marca las que ya conoces.' },
            { id:'mcq' as PracticeMode, icon:'🎯', title:'Choix multiple', desc:'Elige la traducción correcta de 4 opciones.' },
            { id:'fillblank' as PracticeMode, icon:'✏️', title:'Écrire le mot', desc:'Escribe la palabra en francés a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'1.1rem 1.3rem', border:`1.5px solid ${COLORMix(13.3)}`, borderRadius:14, background:`${COLORMix(1.6)}`, transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLORMix(7.8)}`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ width:42, height:42, borderRadius:10, background:COLOR, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.25rem', flexShrink:0 }}>{m.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontWeight:700, color:'var(--ink)', marginBottom:'0.1rem' }}>{m.title}</div>
                  <p style={{ margin:0, fontSize:'0.8rem', color:'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color:COLOR, fontWeight:700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop:'1px solid var(--line-soft)', paddingTop:'1.25rem' }}>
          <div style={{ fontSize:'0.65rem', fontWeight:800, color:'var(--muted)', fontFamily:'var(--mono)', textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:'0.65rem' }}>Vocabulaire ({set.words.length} mots)</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(170px,1fr))', gap:'0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding:'0.55rem 0.7rem', borderRadius:9, border:'1px solid var(--line-soft)', background:'var(--bg)' }}>
                <div style={{ fontWeight:700, fontSize:'0.85rem', color:'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--muted)' }}>{w.es}</div>
                {w.pronunciation && <div style={{ fontSize:'0.65rem', fontFamily:'var(--mono)', color:COLOR, marginTop:'0.1rem' }}>{w.pronunciation}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth:780 }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1.5rem', fontSize:'0.82rem', fontFamily:'var(--mono)', color:'var(--muted)', flexWrap:'wrap' }}>
          <Link href="/practica" style={{ color:'var(--muted)', textDecoration:'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/frances/a2" style={{ color:'var(--muted)', textDecoration:'none' }}>🇫🇷 Français A2</Link>
          <span>/</span>
          <span style={{ color:COLOR, fontWeight:800 }}>📚 Vocabulaire</span>
        </div>
        <p className="eyebrow" style={{ marginBottom:'0.5rem' }}><span className="ink-line" />Vocabulaire · Français A2</p>
        <h1 style={{ fontSize:'2rem', letterSpacing:'-0.03em', margin:'0 0 0.5rem', fontWeight:700 }}>Vocabulaire A2</h1>
        <p style={{ color:'var(--muted)', fontSize:'1rem', maxWidth:520, margin:'0 0 2rem' }}>8 thèmes essentiels — 80 mots avec prononciation. Flashcards, choix multiple et exercices d&apos;écriture.</p>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign:'left', appearance:'none', background:'none', border:'none', padding:0, cursor:'pointer', color:'inherit', font:'inherit' }}>
              <div style={{ padding:'1.25rem', border:`1.5px solid ${COLORMix(13.3)}`, borderRadius:16, background:`${COLORMix(1.6)}`, height:'100%', display:'flex', flexDirection:'column', gap:'0.5rem', transition:'all 0.18s' }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow=`0 4px 16px ${COLORMix(7.8)}`;}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor=`${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow='none';}}>
                <div style={{ fontSize:'1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight:800, color:'var(--ink)' }}>{s.nameFr}</div>
                <div style={{ fontSize:'0.78rem', color:'var(--muted)' }}>{s.name} · {s.words.length} mots</div>
                <div style={{ marginTop:'auto', fontSize:'0.8rem', color:COLOR, fontWeight:700 }}>Commencer →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
