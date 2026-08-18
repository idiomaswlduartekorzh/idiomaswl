'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = 'var(--wlp-accent-vocabulario)';
/** El color al N % de opacidad. Antes se escribía pegando la transparencia en
    hexadecimal (`${COLOR}14`), que con una variable CSS no se puede. */
const COLORMix = (p: number) => `color-mix(in srgb, ${COLOR} ${p}%, transparent)`;

interface Word { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; }
interface VocabSet { id: string; name: string; nameDe: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'reisen', name: 'Viajes y transporte', nameDe: 'Reisen und Transport', icon: '✈️',
    words: [
      { word: 'das Flugticket', es: 'el tiquete aéreo', emoji: '🎫', example: 'Ich habe ein Flugticket nach Berlin gekauft.', exampleEs: 'Compré un tiquete a Berlín.', pronunciation: '[FLOOK-ti-ket]' },
      { word: 'der Reisepass', es: 'el pasaporte', emoji: '🛂', example: 'Vergiss nicht deinen Reisepass!', exampleEs: '¡No olvides tu pasaporte!', pronunciation: '[RY-ze-pass]' },
      { word: 'das Gepäck', es: 'el equipaje', emoji: '🧳', example: 'Mein Gepäck ist zu schwer.', exampleEs: 'Mi equipaje es muy pesado.', pronunciation: '[ge-PECK]' },
      { word: 'der Zoll', es: 'la aduana', emoji: '🛃', example: 'Am Zoll musste ich warten.', exampleEs: 'En la aduana tuve que esperar.', pronunciation: '[TSOL]' },
      { word: 'einchecken', es: 'hacer check-in', emoji: '✅', example: 'Wir müssen zwei Stunden vor dem Abflug einchecken.', exampleEs: 'Debemos hacer check-in dos horas antes del vuelo.', pronunciation: '[IN-che-ken]' },
      { word: 'das Reiseziel', es: 'el destino', emoji: '📍', example: 'Mein nächstes Reiseziel ist Wien.', exampleEs: 'Mi próximo destino es Viena.', pronunciation: '[RY-ze-tseel]' },
      { word: 'der Abflug', es: 'la salida / el despegue', emoji: '🛫', example: 'Der Abflug ist um 8 Uhr morgens.', exampleEs: 'La salida es a las 8 de la mañana.', pronunciation: '[AP-flook]' },
      { word: 'die Ankunft', es: 'la llegada', emoji: '🛬', example: 'Die Ankunft in Frankfurt ist um 14 Uhr.', exampleEs: 'La llegada a Frankfurt es a las 14h.', pronunciation: '[AN-koonft]' },
      { word: 'der Zwischenstopp', es: 'la escala', emoji: '🔄', example: 'Der Flug hat einen Zwischenstopp in Madrid.', exampleEs: 'El vuelo tiene una escala en Madrid.', pronunciation: '[TSVI-shen-shtop]' },
      { word: 'die Bordkarte', es: 'la tarjeta de embarque', emoji: '📋', example: 'Ich habe meine Bordkarte auf dem Handy.', exampleEs: 'Tengo la tarjeta de embarque en el celular.', pronunciation: '[BORT-kar-te]' },
    ],
  },
  {
    id: 'arbeit', name: 'Trabajo y carrera', nameDe: 'Arbeit und Karriere', icon: '💼',
    words: [
      { word: 'das Gehalt', es: 'el salario', emoji: '💰', example: 'Mein Gehalt ist dieses Jahr gestiegen.', exampleEs: 'Mi salario aumentó este año.', pronunciation: '[ge-HALT]' },
      { word: 'der Kollege', es: 'el colega / compañero', emoji: '👔', example: 'Mein Kollege hilft mir immer.', exampleEs: 'Mi colega siempre me ayuda.', pronunciation: '[ko-LEY-ge]' },
      { word: 'der Manager', es: 'el gerente', emoji: '👨‍💼', example: 'Der Manager hat das Meeting geleitet.', exampleEs: 'El gerente dirigió la reunión.', pronunciation: '[MA-na-djer]' },
      { word: 'die Frist', es: 'el plazo / la fecha límite', emoji: '⏰', example: 'Die Frist für das Projekt ist Freitag.', exampleEs: 'El plazo del proyecto es el viernes.', pronunciation: '[FRIST]' },
      { word: 'die Besprechung', es: 'la reunión', emoji: '📊', example: 'Wir haben jeden Montag eine Besprechung.', exampleEs: 'Tenemos reunión todos los lunes.', pronunciation: '[be-SHPRE-chung]' },
      { word: 'die Beförderung', es: 'el ascenso', emoji: '📈', example: 'Sie hat endlich eine Beförderung bekommen.', exampleEs: 'Por fin le dieron un ascenso.', pronunciation: '[be-FER-de-rung]' },
      { word: 'kündigen', es: 'renunciar / despedir', emoji: '📝', example: 'Er hat seinen Job gekündigt.', exampleEs: 'Renunció a su trabajo.', pronunciation: '[KÜN-di-gen]' },
      { word: 'einstellen', es: 'contratar', emoji: '🤝', example: 'Die Firma stellt neue Mitarbeiter ein.', exampleEs: 'La empresa contrata empleados nuevos.', pronunciation: '[IN-shtel-en]' },
      { word: 'arbeitslos', es: 'desempleado', emoji: '😔', example: 'Er ist seit drei Monaten arbeitslos.', exampleEs: 'Lleva tres meses desempleado.', pronunciation: '[AR-byts-lohs]' },
      { word: 'die Überstunden', es: 'las horas extra', emoji: '🕐', example: 'Ich mache oft Überstunden.', exampleEs: 'A menudo hago horas extra.', pronunciation: '[Ü-ber-shtun-den]' },
    ],
  },
  {
    id: 'einkaufen', name: 'Compras y dinero', nameDe: 'Einkaufen und Geld', icon: '🛍️',
    words: [
      { word: 'die Quittung', es: 'el recibo', emoji: '🧾', example: 'Kann ich bitte eine Quittung haben?', exampleEs: '¿Me puede dar un recibo?', pronunciation: '[KVI-tung]' },
      { word: 'der Rabatt', es: 'el descuento', emoji: '🏷️', example: 'Es gibt 20% Rabatt auf alle Bücher.', exampleEs: 'Hay 20% de descuento en todos los libros.', pronunciation: '[ra-BAT]' },
      { word: 'die Rückerstattung', es: 'el reembolso', emoji: '↩️', example: 'Ich möchte eine Rückerstattung beantragen.', exampleEs: 'Quiero solicitar un reembolso.', pronunciation: '[RÜK-er-shta-tung]' },
      { word: 'das Schnäppchen', es: 'la ganga / oferta', emoji: '🎉', example: 'Das war ein echtes Schnäppchen!', exampleEs: '¡Eso fue una verdadera ganga!', pronunciation: '[SHNEP-chen]' },
      { word: 'sich leisten', es: 'permitirse / costear', emoji: '💳', example: 'Ich kann mir das neue Auto nicht leisten.', exampleEs: 'No me puedo costear el carro nuevo.', pronunciation: '[sich LY-sten]' },
      { word: 'die Währung', es: 'la moneda / divisa', emoji: '💱', example: 'In der Schweiz ist die Währung der Franken.', exampleEs: 'En Suiza la moneda es el franco.', pronunciation: '[VÄ-rung]' },
      { word: 'das Bargeld', es: 'el efectivo', emoji: '💵', example: 'Viele Deutsche zahlen lieber mit Bargeld.', exampleEs: 'Muchos alemanes prefieren pagar en efectivo.', pronunciation: '[BAR-gelt]' },
      { word: 'die Kreditkarte', es: 'la tarjeta de crédito', emoji: '💳', example: 'Akzeptieren Sie Kreditkarte?', exampleEs: '¿Acepta tarjeta de crédito?', pronunciation: '[kre-DIT-kar-te]' },
      { word: 'das Wechselgeld', es: 'el cambio / vuelto', emoji: '🪙', example: 'Hier ist Ihr Wechselgeld.', exampleEs: 'Aquí está su cambio.', pronunciation: '[VEK-sel-gelt]' },
      { word: 'das Preisschild', es: 'la etiqueta de precio', emoji: '🏷️', example: 'Das Preisschild sagt 15 Euro.', exampleEs: 'La etiqueta dice 15 euros.', pronunciation: '[PRYS-shilt]' },
    ],
  },
  {
    id: 'gesundheit', name: 'Salud y cuerpo', nameDe: 'Gesundheit und Körper', icon: '🏥',
    words: [
      { word: 'die Kopfschmerzen', es: 'el dolor de cabeza', emoji: '🤕', example: 'Ich habe starke Kopfschmerzen.', exampleEs: 'Tengo un fuerte dolor de cabeza.', pronunciation: '[KOPF-shmert-sen]' },
      { word: 'das Fieber', es: 'la fiebre', emoji: '🌡️', example: 'Sie hat 39 Grad Fieber.', exampleEs: 'Tiene 39 grados de fiebre.', pronunciation: '[FEE-ber]' },
      { word: 'das Rezept', es: 'la receta médica', emoji: '📝', example: 'Der Arzt hat mir ein Rezept geschrieben.', exampleEs: 'El médico me escribió una receta.', pronunciation: '[re-TSEPT]' },
      { word: 'die Apotheke', es: 'la farmacia', emoji: '💊', example: 'Ich muss zur Apotheke gehen.', exampleEs: 'Tengo que ir a la farmacia.', pronunciation: '[a-po-TEY-ke]' },
      { word: 'das Symptom', es: 'el síntoma', emoji: '🩺', example: 'Welche Symptome haben Sie?', exampleEs: '¿Qué síntomas tiene usted?', pronunciation: '[zümp-TOM]' },
      { word: 'der Termin', es: 'la cita médica', emoji: '📅', example: 'Ich habe morgen einen Termin beim Arzt.', exampleEs: 'Mañana tengo cita médica.', pronunciation: '[ter-MEEN]' },
      { word: 'der Chirurg', es: 'el cirujano', emoji: '👨‍⚕️', example: 'Der Chirurg hat die Operation erfolgreich gemacht.', exampleEs: 'El cirujano realizó la operación con éxito.', pronunciation: '[chi-RURG]' },
      { word: 'sich erholen', es: 'recuperarse', emoji: '🛏️', example: 'Er erholt sich nach der Operation.', exampleEs: 'Se está recuperando de la operación.', pronunciation: '[sich er-HO-len]' },
      { word: 'die Allergie', es: 'la alergia', emoji: '🤧', example: 'Ich habe eine Allergie gegen Nüsse.', exampleEs: 'Tengo alergia a las nueces.', pronunciation: '[a-ler-GEE]' },
      { word: 'die Spritze', es: 'la inyección', emoji: '💉', example: 'Die Krankenschwester hat mir eine Spritze gegeben.', exampleEs: 'La enfermera me puso una inyección.', pronunciation: '[SHPRIT-tse]' },
    ],
  },
  {
    id: 'personen', name: 'Describir personas', nameDe: 'Personen beschreiben', icon: '👤',
    words: [
      { word: 'selbstbewusst', es: 'seguro de sí mismo', emoji: '💪', example: 'Sie ist sehr selbstbewusst und spricht vor großen Gruppen.', exampleEs: 'Es muy segura de sí misma y habla frente a grupos grandes.', pronunciation: '[ZELPST-be-voost]' },
      { word: 'ehrgeizig', es: 'ambicioso', emoji: '🎯', example: 'Er ist sehr ehrgeizig und arbeitet hart.', exampleEs: 'Es muy ambicioso y trabaja duro.', pronunciation: '[EHR-gy-tsig]' },
      { word: 'zuverlässig', es: 'confiable / responsable', emoji: '🤝', example: 'Sie ist zuverlässig — sie kommt immer pünktlich.', exampleEs: 'Es confiable — siempre llega a tiempo.', pronunciation: '[tsoo-fer-LÄ-sig]' },
      { word: 'stur', es: 'terco / obstinado', emoji: '🐂', example: 'Er ist manchmal zu stur, um zuzuhören.', exampleEs: 'A veces es demasiado terco para escuchar.', pronunciation: '[SHTOOR]' },
      { word: 'großzügig', es: 'generoso', emoji: '🎁', example: 'Meine Oma ist sehr großzügig mit Geschenken.', exampleEs: 'Mi abuela es muy generosa con los regalos.', pronunciation: '[GROHS-tsü-gig]' },
      { word: 'geduldig', es: 'paciente', emoji: '⏳', example: 'Als Lehrerin muss man sehr geduldig sein.', exampleEs: 'Como profesora hay que ser muy paciente.', pronunciation: '[ge-DOOL-dig]' },
      { word: 'ängstlich', es: 'ansioso / temeroso', emoji: '😰', example: 'Er ist ängstlich vor Prüfungen.', exampleEs: 'Le da ansiedad antes de los exámenes.', pronunciation: '[ENGST-lich]' },
      { word: 'fröhlich', es: 'alegre', emoji: '😊', example: 'Sie ist immer fröhlich und lächelt viel.', exampleEs: 'Siempre está alegre y sonríe mucho.', pronunciation: '[FRÖ-lich]' },
      { word: 'unabhängig', es: 'independiente', emoji: '🦅', example: 'Sie ist sehr unabhängig und reist alleine.', exampleEs: 'Es muy independiente y viaja sola.', pronunciation: '[oon-AP-hen-gig]' },
      { word: 'kreativ', es: 'creativo', emoji: '🎨', example: 'Er ist sehr kreativ und malt gern.', exampleEs: 'Es muy creativo y le gusta pintar.', pronunciation: '[kre-a-TEEF]' },
    ],
  },
  {
    id: 'restaurant', name: 'Comida y restaurantes', nameDe: 'Essen und Restaurants', icon: '🍽️',
    words: [
      { word: 'die Speisekarte', es: 'el menú / la carta', emoji: '📋', example: 'Kann ich bitte die Speisekarte haben?', exampleEs: '¿Me puede traer la carta?', pronunciation: '[SHPY-ze-kar-te]' },
      { word: 'die Vorspeise', es: 'la entrada / el aperitivo', emoji: '🥗', example: 'Als Vorspeise nehme ich eine Suppe.', exampleEs: 'De entrada pido una sopa.', pronunciation: '[FOR-shpy-ze]' },
      { word: 'das Hauptgericht', es: 'el plato principal', emoji: '🍖', example: 'Das Hauptgericht ist heute Schnitzel.', exampleEs: 'El plato principal de hoy es schnitzel.', pronunciation: '[HOWPT-ge-richt]' },
      { word: 'die Nachspeise', es: 'el postre', emoji: '🍰', example: 'Zur Nachspeise möchte ich Schokoladenkuchen.', exampleEs: 'De postre quiero pastel de chocolate.', pronunciation: '[NACH-shpy-ze]' },
      { word: 'die Rechnung', es: 'la cuenta', emoji: '🧾', example: 'Die Rechnung bitte!', exampleEs: '¡La cuenta, por favor!', pronunciation: '[RECH-nung]' },
      { word: 'das Trinkgeld', es: 'la propina', emoji: '💸', example: 'In Deutschland gibt man normalerweise Trinkgeld.', exampleEs: 'En Alemania normalmente se da propina.', pronunciation: '[TRINK-gelt]' },
      { word: 'die Reservierung', es: 'la reserva', emoji: '📅', example: 'Ich habe eine Reservierung für zwei Personen.', exampleEs: 'Tengo una reserva para dos personas.', pronunciation: '[re-zer-VEER-ung]' },
      { word: 'der Kellner', es: 'el mesero', emoji: '🧑‍🍳', example: 'Der Kellner hat unser Essen gebracht.', exampleEs: 'El mesero nos trajo la comida.', pronunciation: '[KEL-ner]' },
      { word: 'die Zutat', es: 'el ingrediente', emoji: '🧅', example: 'Was sind die Zutaten in diesem Gericht?', exampleEs: '¿Cuáles son los ingredientes de este plato?', pronunciation: '[TSOO-tat]' },
      { word: 'der Geschmack', es: 'el sabor / el gusto', emoji: '👅', example: 'Das hat einen sehr guten Geschmack.', exampleEs: 'Esto tiene muy buen sabor.', pronunciation: '[ge-SHMAK]' },
    ],
  },
  {
    id: 'technologie', name: 'Tecnología y comunicación', nameDe: 'Technologie und Kommunikation', icon: '📱',
    words: [
      { word: 'das Passwort', es: 'la contraseña', emoji: '🔐', example: 'Ich habe mein Passwort vergessen.', exampleEs: 'Olvidé mi contraseña.', pronunciation: '[PAS-vort]' },
      { word: 'die Aktualisierung', es: 'la actualización', emoji: '🔄', example: 'Das Telefon braucht eine Aktualisierung.', exampleEs: 'El teléfono necesita una actualización.', pronunciation: '[ak-too-a-li-ZEER-ung]' },
      { word: 'herunterladen', es: 'descargar', emoji: '⬇️', example: 'Ich habe die App heruntergeladen.', exampleEs: 'Descargué la app.', pronunciation: '[he-ROON-ter-la-den]' },
      { word: 'die Verbindung', es: 'la conexión', emoji: '📶', example: 'Die Internetverbindung ist sehr langsam.', exampleEs: 'La conexión a internet es muy lenta.', pronunciation: '[fer-BIN-dung]' },
      { word: 'das Gerät', es: 'el dispositivo', emoji: '📱', example: 'Welches Gerät benutzt du am liebsten?', exampleEs: '¿Qué dispositivo prefieres usar?', pronunciation: '[ge-RÄHT]' },
      { word: 'die E-Mail', es: 'el correo electrónico', emoji: '📧', example: 'Ich habe eine E-Mail von meinem Chef bekommen.', exampleEs: 'Recibí un correo de mi jefe.', pronunciation: '[EE-mayl]' },
      { word: 'anhängen', es: 'adjuntar', emoji: '📎', example: 'Vergiss nicht, die Datei anzuhängen.', exampleEs: 'No olvides adjuntar el archivo.', pronunciation: '[AN-hen-gen]' },
      { word: 'suchen', es: 'buscar / buscar en internet', emoji: '🔍', example: 'Ich habe die Adresse im Internet gesucht.', exampleEs: 'Busqué la dirección en internet.', pronunciation: '[ZOO-chen]' },
      { word: 'aufladen', es: 'cargar (batería)', emoji: '🔋', example: 'Mein Handy ist leer — ich muss es aufladen.', exampleEs: 'Mi celular está sin batería — tengo que cargarlo.', pronunciation: '[OWF-la-den]' },
      { word: 'die Benachrichtigung', es: 'la notificación', emoji: '🔔', example: 'Ich bekomme zu viele Benachrichtigungen.', exampleEs: 'Recibo demasiadas notificaciones.', pronunciation: '[be-NACH-rich-ti-gung]' },
    ],
  },
  {
    id: 'umwelt', name: 'Medio ambiente y naturaleza', nameDe: 'Umwelt und Natur', icon: '🌿',
    words: [
      { word: 'die Umweltverschmutzung', es: 'la contaminación ambiental', emoji: '🏭', example: 'Die Umweltverschmutzung ist ein globales Problem.', exampleEs: 'La contaminación es un problema global.', pronunciation: '[OOM-velt-fer-shmut-sung]' },
      { word: 'recyceln', es: 'reciclar', emoji: '♻️', example: 'In Deutschland recycelt man sehr viel.', exampleEs: 'En Alemania se recicla muchísimo.', pronunciation: '[re-ZÜ-keln]' },
      { word: 'erneuerbar', es: 'renovable', emoji: '☀️', example: 'Erneuerbare Energien sind die Zukunft.', exampleEs: 'Las energías renovables son el futuro.', pronunciation: '[er-NOY-er-bar]' },
      { word: 'die Dürre', es: 'la sequía', emoji: '🌵', example: 'Die Dürre hat die Ernte zerstört.', exampleEs: 'La sequía destruyó la cosecha.', pronunciation: '[DÜ-re]' },
      { word: 'die Überschwemmung', es: 'la inundación', emoji: '🌊', example: 'Nach dem Regen gab es eine Überschwemmung.', exampleEs: 'Tras la lluvia hubo una inundación.', pronunciation: '[Ü-ber-shvem-ung]' },
      { word: 'gefährdete Arten', es: 'especies en peligro', emoji: '🐼', example: 'Viele gefährdete Arten brauchen unseren Schutz.', exampleEs: 'Muchas especies en peligro necesitan nuestra protección.', pronunciation: '[ge-FÄR-de-te AR-ten]' },
      { word: 'der Lebensraum', es: 'el hábitat', emoji: '🌳', example: 'Der Lebensraum vieler Tiere wird zerstört.', exampleEs: 'El hábitat de muchos animales está siendo destruido.', pronunciation: '[LEY-bens-rowm]' },
      { word: 'die Abholzung', es: 'la deforestación', emoji: '🪓', example: 'Die Abholzung des Regenwaldes ist ein Problem.', exampleEs: 'La deforestación de la selva tropical es un problema.', pronunciation: '[AP-hol-tsung]' },
      { word: 'das Klima', es: 'el clima', emoji: '🌍', example: 'Das Klima ändert sich sehr schnell.', exampleEs: 'El clima está cambiando muy rápido.', pronunciation: '[KLEE-ma]' },
      { word: 'der Kohlenstoff', es: 'el carbono', emoji: '⚗️', example: 'Wir müssen den Kohlenstoff reduzieren.', exampleEs: 'Debemos reducir el carbono.', pronunciation: '[KO-len-shtof]' },
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>Fertig!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} Wörter bekannt.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Nochmal</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 420, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLORMix(3.1)}` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, fontStyle: 'italic' }}>{w.pronunciation}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Klicken zum Sehen</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br /><span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ Ich weiß es</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Nochmal ansehen →</button>
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
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
        <div style={{ fontSize: '0.72rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.2rem', fontStyle: 'italic' }}>{w.pronunciation}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
            style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
            {opt}
          </button>;
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span> — {w.exampleEs}
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Weiter →' : 'Ergebnis →'}
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
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} richtig</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Wiederholen</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Andere Modi</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.word.toLowerCase() ||
    input.trim().toLowerCase() === w.word.replace(/^(der|die|das|sich)\s/i, '').toLowerCase();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Wie heißt das auf Deutsch (mit Artikel wenn nötig):</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked} placeholder="z.B.: die Speisekarte"
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Überprüfen</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ Richtig!' : `✗ Richtig: ${w.word}`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Weiter →' : 'Ergebnis →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VokabularAlemanA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);
  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <button onClick={() => setMode(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.25rem' }}>← {set.nameDe}</button>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vokabular A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameDe}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} Wörter · Wähle einen Übungsmodus</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[{ id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Karteikarten', desc: 'Sieh jedes Wort mit Übersetzung und Aussprache.' }, { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Multiple Choice', desc: 'Wähle die richtige Übersetzung.' }, { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Lückentext', desc: 'Schreibe das deutsche Wort (mit Artikel).' }].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 14, background: `${COLORMix(1.6)}`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
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
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Wortliste</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{w.es}</div>
                <div style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{w.pronunciation}</div>
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
          <Link href="/practica/aleman/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇩🇪 Deutsch A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vokabular</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vokabular · Deutsch A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Wortschatz A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temáticas — 80 palabras con pronunciación y ejemplos. Karteikarten, Multiple Choice y Lückentext.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLORMix(13.3)}`, borderRadius: 16, background: `${COLORMix(1.6)}`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(33.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLORMix(7.8)}`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLORMix(13.3)}`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameDe}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} Wörter</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Lernen →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
