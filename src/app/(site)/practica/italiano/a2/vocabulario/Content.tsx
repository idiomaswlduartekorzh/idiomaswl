'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; gender?: string; }
interface VocabSet { id: string; name: string; nameIt: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'viaggi', name: 'Viajes y transporte', nameIt: 'Viaggi e trasporti', icon: '✈️',
    words: [
      { word: 'il biglietto', es: 'el billete / tiquete', emoji: '🎫', example: 'Ho comprato un biglietto di andata e ritorno per Roma.', exampleEs: 'Compré un billete de ida y vuelta a Roma.', pronunciation: '[biLYÉT-to]', gender: 'm' },
      { word: 'il passaporto', es: 'el pasaporte', emoji: '📕', example: 'Non dimenticare il passaporto!', exampleEs: '¡No olvides el pasaporte!', pronunciation: '[pas-sa-POR-to]', gender: 'm' },
      { word: 'il bagaglio', es: 'el equipaje', emoji: '🧳', example: 'Il mio bagaglio è troppo pesante.', exampleEs: 'Mi equipaje es demasiado pesado.', pronunciation: '[ba-GÀL-yo]', gender: 'm' },
      { word: 'la dogana', es: 'la aduana', emoji: '🛃', example: 'Bisogna passare per la dogana.', exampleEs: 'Hay que pasar por la aduana.', pronunciation: '[do-GÀ-na]', gender: 'f' },
      { word: 'il check-in', es: 'el check-in', emoji: '✅', example: 'Il check-in inizia alle 14:00.', exampleEs: 'El check-in comienza a las 14:00.', pronunciation: '[chèk-in]', gender: 'm' },
      { word: 'la destinazione', es: 'el destino', emoji: '📍', example: 'Qual è la tua destinazione finale?', exampleEs: '¿Cuál es tu destino final?', pronunciation: '[des-ti-na-TSYÓ-ne]', gender: 'f' },
      { word: 'la partenza', es: 'la salida / la partida', emoji: '🚀', example: 'La partenza è prevista per le 8 di mattina.', exampleEs: 'La salida está prevista para las 8 de la mañana.', pronunciation: '[par-TÈN-tsa]', gender: 'f' },
      { word: "l'arrivo", es: 'la llegada', emoji: '🛬', example: "L'arrivo è previsto alle 11:30.", exampleEs: 'La llegada está prevista a las 11:30.', pronunciation: '[ar-RÍ-vo]', gender: 'm' },
      { word: 'lo scalo', es: 'la escala (vuelo)', emoji: '✈️', example: 'C\'è uno scalo a Madrid.', exampleEs: 'Hay una escala en Madrid.', pronunciation: '[SKÀ-lo]', gender: 'm' },
      { word: 'la carta d\'imbarco', es: 'la tarjeta de embarque', emoji: '🗂️', example: 'Non dimenticare la carta d\'imbarco.', exampleEs: 'No olvides la tarjeta de embarque.', pronunciation: '[KÀR-ta dim-BÀR-ko]', gender: 'f' },
    ],
  },
  {
    id: 'lavoro', name: 'Trabajo y carrera', nameIt: 'Lavoro e carriera', icon: '💼',
    words: [
      { word: 'lo stipendio', es: 'el salario / sueldo', emoji: '💰', example: 'Il mio stipendio è aumentato quest\'anno.', exampleEs: 'Mi salario aumentó este año.', pronunciation: '[sti-PÈN-dyo]', gender: 'm' },
      { word: 'il/la collega', es: 'el/la compañero/a de trabajo', emoji: '🤝', example: 'I miei colleghi sono molto simpatici.', exampleEs: 'Mis compañeros de trabajo son muy simpáticos.', pronunciation: '[kol-LÈ-ga]' },
      { word: 'il/la direttore/direttrice', es: 'el/la director/a', emoji: '👔', example: 'La direttrice ha organizzato una riunione.', exampleEs: 'La directora organizó una reunión.', pronunciation: '[di-ret-TÒ-re / di-ret-TRÍ-che]' },
      { word: 'la scadenza', es: 'el plazo / la fecha límite', emoji: '⏰', example: 'Dobbiamo rispettare la scadenza.', exampleEs: 'Debemos respetar el plazo.', pronunciation: '[ska-DÈN-tsa]', gender: 'f' },
      { word: 'la riunione', es: 'la reunión', emoji: '📋', example: 'La riunione è stata annullata.', exampleEs: 'La reunión fue cancelada.', pronunciation: '[riu-NYÓ-ne]', gender: 'f' },
      { word: 'la promozione', es: 'el ascenso / la promoción', emoji: '⬆️', example: 'Ha ricevuto una promozione questo mese.', exampleEs: 'Recibió un ascenso este mes.', pronunciation: '[pro-mo-TSYÓ-ne]', gender: 'f' },
      { word: 'dimettersi', es: 'renunciar / dimitir', emoji: '🚪', example: 'Ha deciso di dimettersi.', exampleEs: 'Decidió renunciar.', pronunciation: '[di-MÈT-ter-si]' },
      { word: 'assumere', es: 'contratar (a alguien)', emoji: '📝', example: "L'azienda assumerà venti persone.", exampleEs: 'La empresa contratará a veinte personas.', pronunciation: '[as-SÙ-me-re]' },
      { word: 'il/la disoccupato/a', es: 'el/la desempleado/a', emoji: '📉', example: 'Il numero di disoccupati è diminuito.', exampleEs: 'El número de desempleados disminuyó.', pronunciation: '[di-zok-ku-PÀ-to]' },
      { word: 'lo straordinario', es: 'las horas extra', emoji: '⌚', example: 'Fa molti straordinari ogni settimana.', exampleEs: 'Hace muchas horas extra cada semana.', pronunciation: '[stra-or-di-NÀ-ryo]', gender: 'm' },
    ],
  },
  {
    id: 'acquisti', name: 'Compras y dinero', nameIt: 'Acquisti e soldi', icon: '🛍️',
    words: [
      { word: 'lo scontrino', es: 'el recibo / el ticket', emoji: '🧾', example: 'Conserva lo scontrino per i resi.', exampleEs: 'Guarda el recibo para las devoluciones.', pronunciation: '[skon-TRÍ-no]', gender: 'm' },
      { word: 'lo sconto', es: 'el descuento', emoji: '🏷️', example: 'C\'è uno sconto del 20% questo weekend.', exampleEs: 'Hay un descuento del 20% este fin de semana.', pronunciation: '[SKÒN-to]', gender: 'm' },
      { word: 'il rimborso', es: 'el reembolso / la devolución', emoji: '↩️', example: 'Ho chiesto un rimborso.', exampleEs: 'Pedí un reembolso.', pronunciation: '[rim-BÒR-so]', gender: 'm' },
      { word: 'un affare', es: 'una ganga / un buen negocio', emoji: '🤑', example: 'Questo cappotto a 30€ è un vero affare!', exampleEs: 'Este abrigo a 30€ es una verdadera ganga.', pronunciation: '[af-FÀ-re]', gender: 'm' },
      { word: 'permettersi', es: 'permitirse (económicamente)', emoji: '💳', example: 'Non posso permettermi questo viaggio.', exampleEs: 'No puedo permitirme ese viaje.', pronunciation: '[per-MÈT-ter-si]' },
      { word: 'gli spiccioli', es: 'las monedas / el cambio suelto', emoji: '🪙', example: 'Non ho spiccioli.', exampleEs: 'No tengo monedas sueltas.', pronunciation: '[SPÌT-cho-li]', gender: 'm' },
      { word: 'il contante', es: 'el efectivo', emoji: '💵', example: 'Paga in contante o con la carta?', exampleEs: '¿Paga en efectivo o con tarjeta?', pronunciation: '[kon-TÀN-te]', gender: 'm' },
      { word: 'la carta di credito', es: 'la tarjeta de crédito', emoji: '💳', example: 'Posso pagare con la carta di credito?', exampleEs: '¿Puedo pagar con la tarjeta de crédito?', pronunciation: '[KÀR-ta di KRÈ-di-to]', gender: 'f' },
      { word: 'il cambio', es: 'el cambio / la vuelta', emoji: '🔄', example: 'Tenga il resto — tenga il cambio!', exampleEs: '¡Quédese con el cambio!', pronunciation: '[KÀM-byo]', gender: 'm' },
      { word: "l'etichetta", es: 'la etiqueta (de precio)', emoji: '🏷️', example: "L'etichetta dice 25 euro.", exampleEs: 'La etiqueta dice 25 euros.', pronunciation: '[e-ti-KÈT-ta]', gender: 'f' },
    ],
  },
  {
    id: 'salute', name: 'Salud y cuerpo', nameIt: 'Salute e corpo', icon: '🏥',
    words: [
      { word: 'il mal di testa', es: 'el dolor de cabeza', emoji: '🤕', example: 'Ho un terribile mal di testa.', exampleEs: 'Tengo un terrible dolor de cabeza.', pronunciation: '[mal di TÈS-ta]', gender: 'm' },
      { word: 'la febbre', es: 'la fiebre', emoji: '🌡️', example: 'Ha 39 gradi di febbre.', exampleEs: 'Tiene 39 grados de fiebre.', pronunciation: '[FÈB-bre]', gender: 'f' },
      { word: 'la ricetta', es: 'la receta médica', emoji: '📋', example: 'Il medico mi ha dato una ricetta.', exampleEs: 'El médico me dio una receta.', pronunciation: '[ri-CHÈT-ta]', gender: 'f' },
      { word: 'la farmacia', es: 'la farmacia', emoji: '💊', example: 'La farmacia è aperta fino alle 20:00.', exampleEs: 'La farmacia está abierta hasta las 20:00.', pronunciation: '[far-ma-CHÍ-a]', gender: 'f' },
      { word: 'il sintomo', es: 'el síntoma', emoji: '🔍', example: 'Quali sono i tuoi sintomi?', exampleEs: '¿Cuáles son tus síntomas?', pronunciation: '[SÍN-to-mo]', gender: 'm' },
      { word: 'la visita medica', es: 'la consulta médica / la cita', emoji: '📅', example: 'Ho una visita medica domani.', exampleEs: 'Tengo una consulta médica mañana.', pronunciation: '[VÍ-zi-ta MÈ-di-ka]', gender: 'f' },
      { word: 'il chirurgo', es: 'el/la cirujano/a', emoji: '🔬', example: 'Il chirurgo opera domani mattina.', exampleEs: 'El cirujano opera mañana por la mañana.', pronunciation: '[ki-RÙR-go]', gender: 'm' },
      { word: 'guarire', es: 'curar / recuperarse', emoji: '💪', example: 'Ha impiegato due settimane per guarire.', exampleEs: 'Tardó dos semanas en recuperarse.', pronunciation: '[gua-RÍ-re]' },
      { word: "l'allergia", es: 'la alergia', emoji: '🤧', example: 'Ho un\'allergia alle noci.', exampleEs: 'Soy alérgico/a a las nueces.', pronunciation: '[al-ler-JÍ-a]', gender: 'f' },
      { word: 'la puntura / iniezione', es: 'la inyección / la picadura', emoji: '💉', example: 'Il medico mi ha fatto un\'iniezione.', exampleEs: 'El médico me puso una inyección.', pronunciation: '[pun-TÙ-ra / i-nyè-TSYÓ-ne]', gender: 'f' },
    ],
  },
  {
    id: 'carattere', name: 'Describir personas', nameIt: 'Carattere e personalità', icon: '👤',
    words: [
      { word: 'sicuro/a di sé', es: 'seguro/a de sí mismo/a', emoji: '😎', example: 'È molto sicura di sé in pubblico.', exampleEs: 'Es muy segura de sí misma en público.', pronunciation: '[si-KÙ-ro di SÈ]' },
      { word: 'ambizioso/a', es: 'ambicioso/a', emoji: '🚀', example: 'Il mio nuovo collega è molto ambizioso.', exampleEs: 'Mi nuevo compañero es muy ambicioso.', pronunciation: '[am-bi-TSYÓ-zo]' },
      { word: 'affidabile', es: 'confiable / de confianza', emoji: '🤝', example: 'È una persona affidabile e onesta.', exampleEs: 'Es una persona confiable y honesta.', pronunciation: '[af-fi-DÀ-bi-le]' },
      { word: 'testardo/a', es: 'terco/a / obstinado/a', emoji: '🐂', example: 'È testardo — non cambia mai idea.', exampleEs: 'Es terco — nunca cambia de opinión.', pronunciation: '[tes-TÀR-do]' },
      { word: 'generoso/a', es: 'generoso/a', emoji: '🎁', example: 'È molto generosa con i suoi amici.', exampleEs: 'Es muy generosa con sus amigos.', pronunciation: '[je-ne-RÓ-zo]' },
      { word: 'paziente', es: 'paciente', emoji: '⏳', example: 'Un buon insegnante deve essere paziente.', exampleEs: 'Un buen profesor debe ser paciente.', pronunciation: '[pa-TSYÈN-te]' },
      { word: 'curioso/a', es: 'curioso/a', emoji: '🔎', example: 'I bambini sono sempre curiosi.', exampleEs: 'Los niños siempre son curiosos.', pronunciation: '[ku-RYÓ-zo]' },
      { word: 'timido/a', es: 'tímido/a', emoji: '🐢', example: 'All\'inizio era timida, poi si è aperta.', exampleEs: 'Al principio era tímida, luego se abrió.', pronunciation: '[TÍ-mi-do]' },
      { word: 'socievole', es: 'sociable / extrovertido/a', emoji: '😄', example: 'È molto socievole e ha tanti amici.', exampleEs: 'Es muy sociable y tiene muchos amigos.', pronunciation: '[so-CHÈV-vo-le]' },
      { word: 'onesto/a', es: 'honesto/a', emoji: '⚖️', example: 'Apprezzo le persone oneste.', exampleEs: 'Aprecio a las personas honestas.', pronunciation: '[o-NÈS-to]' },
    ],
  },
  {
    id: 'casa', name: 'Casa y hogar', nameIt: 'Casa e abitazione', icon: '🏠',
    words: [
      { word: 'il monolocale', es: 'el estudio / el apartamento de un cuarto', emoji: '🏢', example: 'Vivo in un monolocale vicino al centro.', exampleEs: 'Vivo en un estudio cerca del centro.', pronunciation: '[mo-no-lo-KÀ-le]', gender: 'm' },
      { word: "l'affitto", es: 'el alquiler / la renta', emoji: '🏠', example: "L'affitto è aumentato molto quest'anno.", exampleEs: 'El alquiler ha aumentado mucho este año.', pronunciation: '[af-FÍT-to]', gender: 'm' },
      { word: 'il padrone di casa', es: 'el/la propietario/a / el arrendador', emoji: '🔑', example: 'Il padrone di casa è molto gentile.', exampleEs: 'El propietario es muy amable.', pronunciation: '[pa-DRÓ-ne di KÀ-za]', gender: 'm' },
      { word: "l'inquilino/a", es: 'el/la inquilino/a / el arrendatario', emoji: '🧑', example: "L'inquilina paga l'affitto puntualmente.", exampleEs: 'La inquilina paga el alquiler puntualmente.', pronunciation: '[in-kwi-LÍ-no]' },
      { word: 'i mobili', es: 'los muebles', emoji: '🛋️', example: 'I mobili del salotto sono nuovi.', exampleEs: 'Los muebles de la sala son nuevos.', pronunciation: '[MÒ-bi-li]', gender: 'm' },
      { word: 'il condominio', es: 'el condominio / la comunidad de vecinos', emoji: '🏘️', example: 'Le spese del condominio sono alte.', exampleEs: 'Los gastos de la comunidad son altos.', pronunciation: '[kon-do-MÍ-nyo]', gender: 'm' },
      { word: 'il trasloco', es: 'la mudanza', emoji: '📦', example: 'Il trasloco è previsto per sabato.', exampleEs: 'La mudanza está prevista para el sábado.', pronunciation: '[tra-ZLÒ-ko]', gender: 'm' },
      { word: 'arredare', es: 'amueblar / decorar', emoji: '🎨', example: 'Vogliamo arredare il nuovo appartamento.', exampleEs: 'Queremos amueblar el nuevo apartamento.', pronunciation: '[ar-re-DÀ-re]' },
      { word: 'la bolletta', es: 'la factura (de servicios)', emoji: '📄', example: 'La bolletta della luce è arrivata.', exampleEs: 'Ha llegado la factura de la electricidad.', pronunciation: '[bol-LÈT-ta]', gender: 'f' },
      { word: 'ristrutturare', es: 'renovar / reformar', emoji: '🔨', example: 'Vogliamo ristrutturare la cucina.', exampleEs: 'Queremos renovar la cocina.', pronunciation: '[ri-strut-tu-RÀ-re]' },
    ],
  },
  {
    id: 'tecnologia', name: 'Tecnología', nameIt: 'Tecnologia', icon: '💻',
    words: [
      { word: 'scaricare', es: 'descargar', emoji: '⬇️', example: 'Ho scaricato l\'applicazione sul telefono.', exampleEs: 'Descargué la aplicación en el teléfono.', pronunciation: '[ska-ri-KÀ-re]' },
      { word: 'caricare', es: 'cargar (batería) / subir (archivo)', emoji: '⬆️', example: 'Devo caricare il telefono — è scarico.', exampleEs: 'Debo cargar el teléfono — está sin batería.', pronunciation: '[ka-ri-KÀ-re]' },
      { word: 'connettersi', es: 'conectarse', emoji: '📶', example: 'Non riesco a connettermi al Wi-Fi.', exampleEs: 'No logro conectarme al Wi-Fi.', pronunciation: '[kon-NÈT-ter-si]' },
      { word: 'il dispositivo', es: 'el dispositivo', emoji: '📱', example: 'Il mio dispositivo non funziona.', exampleEs: 'Mi dispositivo no funciona.', pronunciation: '[di-spo-zi-TÍ-vo]', gender: 'm' },
      { word: "l'applicazione", es: 'la aplicación / la app', emoji: '📲', example: "C'è un'applicazione per tutto.", exampleEs: 'Hay una aplicación para todo.', pronunciation: '[ap-pli-ka-TSYÓ-ne]', gender: 'f' },
      { word: 'aggiornare', es: 'actualizar', emoji: '🔄', example: 'Devo aggiornare il sistema operativo.', exampleEs: 'Debo actualizar el sistema operativo.', pronunciation: '[ad-dyor-NÀ-re]' },
      { word: 'la password', es: 'la contraseña', emoji: '🔑', example: 'Ho dimenticato la password.', exampleEs: 'Olvidé la contraseña.', pronunciation: '[PÀS-word]', gender: 'f' },
      { word: 'condividere', es: 'compartir', emoji: '🔗', example: 'Puoi condividere il link con me?', exampleEs: '¿Puedes compartir el enlace conmigo?', pronunciation: '[kon-di-VÍ-de-re]' },
      { word: 'il profilo', es: 'el perfil', emoji: '👤', example: 'Ho creato un nuovo profilo sui social.', exampleEs: 'Creé un nuevo perfil en las redes sociales.', pronunciation: '[PRÒ-fi-lo]', gender: 'm' },
      { word: 'la notifica', es: 'la notificación', emoji: '🔔', example: 'Ho disattivato le notifiche.', exampleEs: 'Desactivé las notificaciones.', pronunciation: '[no-TÍ-fi-ka]', gender: 'f' },
    ],
  },
  {
    id: 'natura', name: 'Naturaleza y medio ambiente', nameIt: 'Natura e ambiente', icon: '🌿',
    words: [
      { word: 'il paesaggio', es: 'el paisaje', emoji: '🏔️', example: 'Il paesaggio delle Dolomiti è magnifico.', exampleEs: 'El paisaje de los Dolomitas es magnífico.', pronunciation: '[pa-e-ZÀD-dyo]', gender: 'm' },
      { word: 'la foresta', es: 'el bosque / la selva', emoji: '🌲', example: 'La foresta amazzonica è in pericolo.', exampleEs: 'La selva amazónica está en peligro.', pronunciation: '[fo-RÈS-ta]', gender: 'f' },
      { word: 'la cascata', es: 'la cascada / la catarata', emoji: '🌊', example: 'La cascata è bellissima in primavera.', exampleEs: 'La cascada es bellísima en primavera.', pronunciation: '[kas-KÀ-ta]', gender: 'f' },
      { word: "l'inquinamento", es: 'la contaminación', emoji: '🏭', example: "L'inquinamento dell'aria è un problema grave.", exampleEs: 'La contaminación del aire es un problema grave.', pronunciation: '[in-kwi-na-MÈN-to]', gender: 'm' },
      { word: 'riciclare', es: 'reciclar', emoji: '♻️', example: 'Bisogna riciclare vetro e carta.', exampleEs: 'Hay que reciclar vidrio y papel.', pronunciation: '[ri-chi-KLÀ-re]' },
      { word: 'risparmiare', es: 'ahorrar (energía/agua)', emoji: '💧', example: 'Dobbiamo risparmiare acqua.', exampleEs: 'Debemos ahorrar agua.', pronunciation: '[ri-spar-MYÀ-re]' },
      { word: 'il clima', es: 'el clima', emoji: '🌍', example: 'Il cambiamento climatico è urgente.', exampleEs: 'El cambio climático es urgente.', pronunciation: '[KLÍ-ma]', gender: 'm' },
      { word: 'la siccità', es: 'la sequía', emoji: '🌵', example: 'La siccità ha colpito molte regioni.', exampleEs: 'La sequía afectó muchas regiones.', pronunciation: '[sic-chi-TÀ]', gender: 'f' },
      { word: 'la biodiversità', es: 'la biodiversidad', emoji: '🦋', example: 'La biodiversità è essenziale per l\'ecosistema.', exampleEs: 'La biodiversidad es esencial para el ecosistema.', pronunciation: '[bio-di-ver-si-TÀ]', gender: 'f' },
      { word: 'il vulcano', es: 'el volcán', emoji: '🌋', example: 'Il Vesuvio è il vulcano più famoso d\'Italia.', exampleEs: 'El Vesubio es el volcán más famoso de Italia.', pronunciation: '[vul-KÀ-no]', gender: 'm' },
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
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLOR}08` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            {w.pronunciation && <div style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLOR}15` }}>{w.pronunciation}</div>}
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
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
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
        {w.pronunciation && <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLOR}15`, display: 'inline-block', marginTop: '0.3rem' }}>{w.pronunciation}</div>}
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
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
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() ||
    input.trim().toLowerCase() === w.word.toLowerCase().replace(/[\(\/].*/, '').trim();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>{w.example.replace(new RegExp(w.word.split('/')[0].replace(/[\[\]()']/g, '').trim(), 'i'), '___')}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Scrive la parola in italiano:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="La tua risposta in italiano..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificare</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Corretto!' : `✗ La risposta è: ${w.word}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Successivo →' : 'Vedere risultato →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabolarioItalianoA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameIt}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcard' : mode === 'mcq' ? '🎯 Scelta multipla' : '✏️ Scrivere'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabolario A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameIt}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} parole · Scegli una modalità di pratica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcard', desc: 'Vedi ogni parola e la sua traduzione. Segna quelle che già conosci.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Scelta multipla', desc: 'Scegli la traduzione corretta tra 4 opzioni.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Scrivi la parola', desc: 'Scrivi la parola in italiano partendo dalla traduzione.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Vocabolario ({set.words.length} parole)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
                {w.pronunciation && <div style={{ fontSize: '0.65rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.pronunciation}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/italiano/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇮🇹 Italiano A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabolario</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabolario · Italiano A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabolario A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temi essenziali — 80 parole con pronuncia. Flashcard, scelta multipla ed esercizi di scrittura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameIt}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} parole</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Iniziare →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
