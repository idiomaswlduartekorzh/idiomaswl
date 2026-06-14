'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface VocabWord { word: string; es: string; emoji: string; example: string; exampleEs: string; pronunciation: string; }
interface VocabSet { id: string; name: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'travel', name: 'Travel & Transport', nameEs: 'Viajes y transporte', emoji: '✈️',
    words: [
      { word: 'flight', es: 'vuelo', emoji: '✈️', example: 'My flight departs at 6am.', exampleEs: 'Mi vuelo sale a las 6am.', pronunciation: '[flait]' },
      { word: 'passport', es: 'pasaporte', emoji: '🛂', example: 'Don\'t forget your passport!', exampleEs: '¡No olvides tu pasaporte!', pronunciation: '[PAS-port]' },
      { word: 'luggage', es: 'equipaje', emoji: '🧳', example: 'I only have hand luggage.', exampleEs: 'Solo tengo equipaje de mano.', pronunciation: '[LUG-ij]' },
      { word: 'customs', es: 'aduana', emoji: '🛃', example: 'We waited an hour at customs.', exampleEs: 'Esperamos una hora en la aduana.', pronunciation: '[KUS-tumz]' },
      { word: 'check-in', es: 'registro/facturación', emoji: '🏨', example: 'Check-in is at 3pm.', exampleEs: 'El registro es a las 3pm.', pronunciation: '[CHEK-in]' },
      { word: 'destination', es: 'destino', emoji: '📍', example: 'What is your final destination?', exampleEs: '¿Cuál es tu destino final?', pronunciation: '[des-ti-NAY-shun]' },
      { word: 'ticket', es: 'tiquete/boleto', emoji: '🎫', example: 'I bought a return ticket.', exampleEs: 'Compré un tiquete de ida y vuelta.', pronunciation: '[TIK-it]' },
      { word: 'departure', es: 'salida/partida', emoji: '🛫', example: 'The departure gate is B7.', exampleEs: 'La puerta de salida es B7.', pronunciation: '[di-PAR-cher]' },
      { word: 'arrival', es: 'llegada', emoji: '🛬', example: 'The arrival time is 9pm.', exampleEs: 'La hora de llegada es las 9pm.', pronunciation: '[uh-RY-vul]' },
      { word: 'boarding pass', es: 'tarjeta de embarque', emoji: '📋', example: 'Please show your boarding pass.', exampleEs: 'Por favor muestre su tarjeta de embarque.', pronunciation: '[BOR-ding pas]' },
    ],
  },
  {
    id: 'work', name: 'Work & Jobs', nameEs: 'Trabajo y empleo', emoji: '💼',
    words: [
      { word: 'salary', es: 'salario', emoji: '💰', example: 'My salary increased last year.', exampleEs: 'Mi salario aumentó el año pasado.', pronunciation: '[SAL-uh-ree]' },
      { word: 'colleague', es: 'colega/compañero de trabajo', emoji: '🤝', example: 'My colleague helped me with the report.', exampleEs: 'Mi colega me ayudó con el informe.', pronunciation: '[KOL-eeg]' },
      { word: 'manager', es: 'gerente/jefe', emoji: '👔', example: 'The manager approved my request.', exampleEs: 'El gerente aprobó mi solicitud.', pronunciation: '[MÆN-ij-er]' },
      { word: 'deadline', es: 'fecha límite', emoji: '⏰', example: 'The deadline is tomorrow morning.', exampleEs: 'La fecha límite es mañana por la mañana.', pronunciation: '[DED-lain]' },
      { word: 'meeting', es: 'reunión', emoji: '📊', example: 'We have a meeting at ten.', exampleEs: 'Tenemos una reunión a las diez.', pronunciation: '[MEE-ting]' },
      { word: 'promotion', es: 'ascenso/promoción', emoji: '📈', example: 'She got a promotion last month.', exampleEs: 'Ella recibió un ascenso el mes pasado.', pronunciation: '[pruh-MOH-shun]' },
      { word: 'resign', es: 'renunciar', emoji: '🚪', example: 'He decided to resign from his job.', exampleEs: 'Él decidió renunciar a su trabajo.', pronunciation: '[ri-ZYN]' },
      { word: 'hire', es: 'contratar', emoji: '📝', example: 'The company hired ten new people.', exampleEs: 'La empresa contrató diez personas nuevas.', pronunciation: '[hair]' },
      { word: 'unemployed', es: 'desempleado', emoji: '😟', example: 'He was unemployed for six months.', exampleEs: 'Estuvo desempleado por seis meses.', pronunciation: '[un-im-PLOID]' },
      { word: 'overtime', es: 'horas extra', emoji: '🕐', example: 'I worked overtime last week.', exampleEs: 'Trabajé horas extra la semana pasada.', pronunciation: '[OH-ver-taim]' },
    ],
  },
  {
    id: 'shopping', name: 'Shopping & Money', nameEs: 'Compras y dinero', emoji: '🛍️',
    words: [
      { word: 'receipt', es: 'recibo/factura', emoji: '🧾', example: 'Keep your receipt for returns.', exampleEs: 'Guarda tu recibo para devoluciones.', pronunciation: '[ri-SEET]' },
      { word: 'discount', es: 'descuento', emoji: '🏷️', example: 'There is a 20% discount today.', exampleEs: 'Hay un descuento del 20% hoy.', pronunciation: '[DIS-kownt]' },
      { word: 'refund', es: 'reembolso/devolución', emoji: '💸', example: 'I asked for a refund.', exampleEs: 'Pedí un reembolso.', pronunciation: '[REE-fund]' },
      { word: 'bargain', es: 'ganga/precio especial', emoji: '🤑', example: 'This jacket was a real bargain!', exampleEs: '¡Esta chaqueta fue una verdadera ganga!', pronunciation: '[BAR-gin]' },
      { word: 'afford', es: 'poder pagar', emoji: '💳', example: 'I can\'t afford that car.', exampleEs: 'No puedo pagar ese carro.', pronunciation: '[uh-FORD]' },
      { word: 'currency', es: 'moneda/divisa', emoji: '💱', example: 'What is the local currency?', exampleEs: '¿Cuál es la moneda local?', pronunciation: '[KUR-en-see]' },
      { word: 'cash', es: 'efectivo', emoji: '💵', example: 'Do you pay by cash or card?', exampleEs: '¿Pagas en efectivo o con tarjeta?', pronunciation: '[kæsh]' },
      { word: 'credit card', es: 'tarjeta de crédito', emoji: '💳', example: 'I paid with my credit card.', exampleEs: 'Pagué con mi tarjeta de crédito.', pronunciation: '[KRED-it kard]' },
      { word: 'change', es: 'cambio/vuelto', emoji: '🪙', example: 'Here is your change: three pounds.', exampleEs: 'Aquí tiene su vuelto: tres libras.', pronunciation: '[cheinj]' },
      { word: 'price tag', es: 'etiqueta de precio', emoji: '🏷️', example: 'Check the price tag before buying.', exampleEs: 'Mira la etiqueta de precio antes de comprar.', pronunciation: '[prais tæg]' },
    ],
  },
  {
    id: 'health', name: 'Health & Body', nameEs: 'Salud y cuerpo', emoji: '🏥',
    words: [
      { word: 'headache', es: 'dolor de cabeza', emoji: '🤕', example: 'I have a terrible headache.', exampleEs: 'Tengo un terrible dolor de cabeza.', pronunciation: '[HED-ayk]' },
      { word: 'fever', es: 'fiebre', emoji: '🌡️', example: 'The child has a high fever.', exampleEs: 'El niño tiene mucha fiebre.', pronunciation: '[FEE-ver]' },
      { word: 'prescription', es: 'receta médica', emoji: '📋', example: 'You need a prescription for this.', exampleEs: 'Necesitas una receta para esto.', pronunciation: '[pri-SKRIP-shun]' },
      { word: 'pharmacy', es: 'farmacia', emoji: '💊', example: 'The pharmacy is open until 10pm.', exampleEs: 'La farmacia está abierta hasta las 10pm.', pronunciation: '[FAR-muh-see]' },
      { word: 'symptom', es: 'síntoma', emoji: '🩺', example: 'What are your symptoms?', exampleEs: '¿Cuáles son tus síntomas?', pronunciation: '[SIM-tum]' },
      { word: 'appointment', es: 'cita médica', emoji: '📅', example: 'I have a doctor\'s appointment at 3.', exampleEs: 'Tengo cita con el médico a las 3.', pronunciation: '[uh-POINT-munt]' },
      { word: 'surgeon', es: 'cirujano', emoji: '🏥', example: 'The surgeon performed the operation.', exampleEs: 'El cirujano realizó la operación.', pronunciation: '[SUR-jun]' },
      { word: 'recover', es: 'recuperarse', emoji: '🌱', example: 'She recovered quickly after surgery.', exampleEs: 'Ella se recuperó rápidamente tras la cirugía.', pronunciation: '[ri-KUV-er]' },
      { word: 'allergy', es: 'alergia', emoji: '🤧', example: 'I have an allergy to peanuts.', exampleEs: 'Tengo alergia a los maníes.', pronunciation: '[AL-er-jee]' },
      { word: 'injection', es: 'inyección', emoji: '💉', example: 'The nurse gave me an injection.', exampleEs: 'La enfermera me puso una inyección.', pronunciation: '[in-JEK-shun]' },
    ],
  },
  {
    id: 'personality', name: 'Describing People', nameEs: 'Describir personas', emoji: '👤',
    words: [
      { word: 'confident', es: 'seguro/confiado', emoji: '💪', example: 'She gave a confident presentation.', exampleEs: 'Ella dio una presentación con confianza.', pronunciation: '[KON-fi-dent]' },
      { word: 'ambitious', es: 'ambicioso', emoji: '🎯', example: 'He is very ambitious and hardworking.', exampleEs: 'Él es muy ambicioso y trabajador.', pronunciation: '[æm-BISH-us]' },
      { word: 'reliable', es: 'confiable/responsable', emoji: '🤝', example: 'Maria is the most reliable person I know.', exampleEs: 'María es la persona más confiable que conozco.', pronunciation: '[ri-LY-uh-bul]' },
      { word: 'stubborn', es: 'terco/obstinado', emoji: '🐂', example: 'He is too stubborn to change his mind.', exampleEs: 'Él es demasiado terco para cambiar de opinión.', pronunciation: '[STUB-urn]' },
      { word: 'generous', es: 'generoso', emoji: '🎁', example: 'My grandmother is very generous.', exampleEs: 'Mi abuela es muy generosa.', pronunciation: '[JEN-er-us]' },
      { word: 'patient', es: 'paciente', emoji: '😌', example: 'Good teachers are patient with students.', exampleEs: 'Los buenos maestros son pacientes con los estudiantes.', pronunciation: '[PAY-shunt]' },
      { word: 'anxious', es: 'ansioso/nervioso', emoji: '😰', example: 'I feel anxious before exams.', exampleEs: 'Me siento ansioso antes de los exámenes.', pronunciation: '[ANG-shus]' },
      { word: 'cheerful', es: 'alegre/animado', emoji: '😊', example: 'She is always cheerful in the morning.', exampleEs: 'Ella siempre está alegre por la mañana.', pronunciation: '[CHEER-ful]' },
      { word: 'independent', es: 'independiente', emoji: '🦅', example: 'He is very independent and lives alone.', exampleEs: 'Él es muy independiente y vive solo.', pronunciation: '[in-di-PEN-dent]' },
      { word: 'creative', es: 'creativo', emoji: '🎨', example: 'She is creative and loves designing things.', exampleEs: 'Ella es creativa y le encanta diseñar cosas.', pronunciation: '[kree-AY-tiv]' },
    ],
  },
  {
    id: 'food', name: 'Food & Restaurants', nameEs: 'Comida y restaurantes', emoji: '🍽️',
    words: [
      { word: 'menu', es: 'menú/carta', emoji: '📋', example: 'Can I see the menu, please?', exampleEs: '¿Me puede traer el menú, por favor?', pronunciation: '[MEN-yoo]' },
      { word: 'starter', es: 'entrada/aperitivo', emoji: '🥗', example: 'I\'ll have the soup as a starter.', exampleEs: 'Tomaré la sopa como entrada.', pronunciation: '[STAR-ter]' },
      { word: 'main course', es: 'plato principal', emoji: '🍝', example: 'For the main course, I\'d like the chicken.', exampleEs: 'Para el plato principal, quisiera el pollo.', pronunciation: '[mayn kors]' },
      { word: 'dessert', es: 'postre', emoji: '🍰', example: 'Would you like dessert?', exampleEs: '¿Le gustaría un postre?', pronunciation: '[di-ZERT]' },
      { word: 'bill', es: 'cuenta', emoji: '🧾', example: 'Could we have the bill, please?', exampleEs: '¿Nos podría traer la cuenta, por favor?', pronunciation: '[bil]' },
      { word: 'tip', es: 'propina', emoji: '💰', example: 'We left a 15% tip.', exampleEs: 'Dejamos una propina del 15%.', pronunciation: '[tip]' },
      { word: 'reservation', es: 'reserva', emoji: '📞', example: 'I have a reservation for two.', exampleEs: 'Tengo una reserva para dos.', pronunciation: '[rez-er-VAY-shun]' },
      { word: 'waiter', es: 'mesero/camarero', emoji: '🧑‍🍳', example: 'Excuse me, waiter! Can I order?', exampleEs: '¡Disculpe, mesero! ¿Puedo pedir?', pronunciation: '[WAY-ter]' },
      { word: 'ingredient', es: 'ingrediente', emoji: '🧅', example: 'What are the main ingredients?', exampleEs: '¿Cuáles son los ingredientes principales?', pronunciation: '[in-GREE-dee-ent]' },
      { word: 'flavour', es: 'sabor', emoji: '👅', example: 'This has a wonderful flavour.', exampleEs: 'Esto tiene un sabor maravilloso.', pronunciation: '[FLAY-ver]' },
    ],
  },
  {
    id: 'technology', name: 'Technology & Communication', nameEs: 'Tecnología y comunicación', emoji: '📱',
    words: [
      { word: 'password', es: 'contraseña', emoji: '🔑', example: 'Don\'t share your password.', exampleEs: 'No compartas tu contraseña.', pronunciation: '[PAS-werd]' },
      { word: 'update', es: 'actualizar/actualización', emoji: '🔄', example: 'Please update your app.', exampleEs: 'Por favor actualiza tu aplicación.', pronunciation: '[UP-dayt]' },
      { word: 'download', es: 'descargar', emoji: '⬇️', example: 'Download the file from the link.', exampleEs: 'Descarga el archivo del enlace.', pronunciation: '[DOWN-lohd]' },
      { word: 'connection', es: 'conexión', emoji: '📶', example: 'The internet connection is slow.', exampleEs: 'La conexión a internet es lenta.', pronunciation: '[kuh-NEK-shun]' },
      { word: 'device', es: 'dispositivo', emoji: '💻', example: 'This app works on all devices.', exampleEs: 'Esta aplicación funciona en todos los dispositivos.', pronunciation: '[di-VYS]' },
      { word: 'email', es: 'correo electrónico', emoji: '📧', example: 'I\'ll send you an email with the details.', exampleEs: 'Te enviaré un correo con los detalles.', pronunciation: '[EE-mayl]' },
      { word: 'attach', es: 'adjuntar', emoji: '📎', example: 'Please attach the document.', exampleEs: 'Por favor adjunta el documento.', pronunciation: '[uh-TÆCH]' },
      { word: 'search', es: 'buscar', emoji: '🔍', example: 'Search for the answer online.', exampleEs: 'Busca la respuesta en línea.', pronunciation: '[serch]' },
      { word: 'charge', es: 'cargar (batería)', emoji: '🔋', example: 'My phone needs to charge.', exampleEs: 'Mi teléfono necesita cargarse.', pronunciation: '[charj]' },
      { word: 'notification', es: 'notificación', emoji: '🔔', example: 'I get too many notifications.', exampleEs: 'Recibo demasiadas notificaciones.', pronunciation: '[noh-ti-fi-KAY-shun]' },
    ],
  },
  {
    id: 'environment', name: 'Environment & Nature', nameEs: 'Medio ambiente y naturaleza', emoji: '🌿',
    words: [
      { word: 'pollution', es: 'contaminación', emoji: '🏭', example: 'Air pollution is a serious problem.', exampleEs: 'La contaminación del aire es un problema serio.', pronunciation: '[puh-LOO-shun]' },
      { word: 'recycle', es: 'reciclar', emoji: '♻️', example: 'We should recycle more plastic.', exampleEs: 'Debemos reciclar más plástico.', pronunciation: '[ree-SY-kul]' },
      { word: 'renewable', es: 'renovable', emoji: '☀️', example: 'Solar energy is renewable.', exampleEs: 'La energía solar es renovable.', pronunciation: '[ri-NOO-uh-bul]' },
      { word: 'drought', es: 'sequía', emoji: '🏜️', example: 'The drought lasted three months.', exampleEs: 'La sequía duró tres meses.', pronunciation: '[drowt]' },
      { word: 'flood', es: 'inundación', emoji: '🌊', example: 'The flood destroyed many homes.', exampleEs: 'La inundación destruyó muchas casas.', pronunciation: '[flud]' },
      { word: 'endangered', es: 'en peligro de extinción', emoji: '🦁', example: 'Tigers are an endangered species.', exampleEs: 'Los tigres son una especie en peligro.', pronunciation: '[en-DAYN-jerd]' },
      { word: 'habitat', es: 'hábitat', emoji: '🌲', example: 'We must protect natural habitats.', exampleEs: 'Debemos proteger los hábitats naturales.', pronunciation: '[HÆB-i-tæt]' },
      { word: 'deforestation', es: 'deforestación', emoji: '🪓', example: 'Deforestation harms biodiversity.', exampleEs: 'La deforestación daña la biodiversidad.', pronunciation: '[dee-for-es-TAY-shun]' },
      { word: 'climate', es: 'clima', emoji: '🌍', example: 'Climate change affects everyone.', exampleEs: 'El cambio climático afecta a todos.', pronunciation: '[KLY-mit]' },
      { word: 'carbon', es: 'carbono', emoji: '🌫️', example: 'We need to reduce carbon emissions.', exampleEs: 'Necesitamos reducir las emisiones de carbono.', pronunciation: '[KAR-bun]' },
    ],
  },
];

function Flashcard({ word, onNext, onPrev, idx, total }: {
  word: VocabWord; onNext: () => void; onPrev: () => void; idx: number; total: number;
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1} / {total}</div>
      <button onClick={() => setFlipped(f => !f)} style={{
        width: '100%', maxWidth: 420, minHeight: 220,
        border: `2px solid ${COLOR}33`, borderRadius: 20,
        background: flipped ? `${COLOR}0d` : 'var(--bg)',
        cursor: 'pointer', fontFamily: 'inherit', color: 'inherit',
        padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
        transition: 'all 0.25s', boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
      }}>
        {!flipped ? (
          <>
            <span style={{ fontSize: '3.5rem' }}>{word.emoji}</span>
            <span style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--ink)' }}>{word.word}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic' }}>{word.pronunciation}</span>
            <span style={{ fontSize: '0.72rem', color: COLOR, fontFamily: 'var(--mono)', marginTop: '0.25rem' }}>toca para ver la traducción</span>
          </>
        ) : (
          <>
            <span style={{ fontSize: '1.6rem', fontWeight: 800, color: COLOR }}>{word.es}</span>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
              &ldquo;{word.example}&rdquo;
            </p>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)', textAlign: 'center' }}>{word.exampleEs}</p>
          </>
        )}
      </button>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button onClick={() => { onPrev(); setFlipped(false); }} className="btn btn-ghost btn-sm">← Anterior</button>
        <button onClick={() => { onNext(); setFlipped(false); }} className="btn btn-sm" style={{ background: COLOR, borderColor: COLOR }}>Siguiente →</button>
      </div>
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  const shuffled = useCallback(() => {
    const qs = words.map((w, idx) => {
      const wrong = words.filter((_, i) => i !== idx);
      const opts3 = wrong.sort(() => Math.random() - 0.5).slice(0, 3).map(x => x.es);
      const correctPos = Math.floor(Math.random() * 4);
      const opts = [...opts3.slice(0, correctPos), w.es, ...opts3.slice(correctPos)];
      return { word: w, opts, correctPos };
    });
    return qs;
  }, [words]);

  const [questions] = useState(shuffled);
  const current = questions[qi];
  const ans = answers[qi];
  const done = ans !== undefined;
  const allDone = Object.keys(answers).length === words.length;

  function pick(oi: number) {
    if (done) return;
    setAnswers(p => ({ ...p, [qi]: oi }));
    setRevealed(p => ({ ...p, [qi]: true }));
  }

  if (allDone && qi === words.length - 1 && done) {
    const score = questions.filter((q, i) => answers[i] === q.correctPos).length;
    return (
      <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score === words.length ? '🏆' : score >= words.length * 0.7 ? '⭐' : '📚'}</div>
        <h3 style={{ margin: '0 0 0.35rem' }}>{score}/{words.length} correctas</h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.25rem' }}>
          {score === words.length ? '¡Vocabulario dominado!' : 'Repasa las tarjetas y vuelve a intentarlo.'}
        </p>
        <button className="btn btn-sm" onClick={() => onDone(score)} style={{ background: COLOR, borderColor: COLOR }}>
          Terminar práctica
        </button>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${((qi + 1) / words.length) * 100}%`, background: COLOR, borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{qi + 1}/{words.length}</span>
      </div>
      <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.5rem' }}>{current.word.emoji}</span>
        <p style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--ink)', margin: '0 0 0.3rem' }}>{current.word.word}</p>
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', fontFamily: 'var(--mono)', fontStyle: 'italic', margin: '0 0 1.25rem' }}>{current.word.pronunciation}</p>
        <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: '0 0 1.25rem' }}>¿Cuál es la traducción al español?</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
          {current.opts.map((opt, oi) => {
            const isCorrect = oi === current.correctPos; const isSelected = ans === oi;
            let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
            if (done && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
            if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
            return (
              <button key={oi} onClick={() => pick(oi)} disabled={done}
                style={{ padding: '0.65rem 0.75rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', fontWeight: 600, cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
                {opt}
                {done && isCorrect && ' ✓'}
                {done && isSelected && !isCorrect && ' ✗'}
              </button>
            );
          })}
        </div>
        {done && (
          <button className="btn btn-sm" style={{ marginTop: '1rem', background: COLOR, borderColor: COLOR }}
            onClick={() => setQi(q => Math.min(q + 1, words.length - 1))}>
            {qi < words.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        )}
      </div>
    </div>
  );
}

function FillBlank({ words, onDone }: { words: VocabWord[]; onDone: (score: number) => void }) {
  const [qi, setQi] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);

  const current = words[qi];
  const isCorrect = checked && input.trim().toLowerCase() === current.word.toLowerCase();

  function check() { if (!input.trim()) return; setChecked(true); if (input.trim().toLowerCase() === current.word.toLowerCase()) setScore(s => s + 1); }

  function next() {
    if (qi < words.length - 1) { setQi(q => q + 1); setInput(''); setChecked(false); }
    else onDone(score);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ flex: 1, height: 5, background: 'var(--line-soft)', borderRadius: 3 }}>
          <div style={{ height: '100%', width: `${((qi + 1) / words.length) * 100}%`, background: COLOR, borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{qi + 1}/{words.length}</span>
      </div>
      <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '0.75rem' }}>{current.emoji}</span>
        <p style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--muted)', margin: '0 0 1.25rem' }}>
          {current.es} <span style={{ fontSize: '0.8rem', fontFamily: 'var(--mono)' }}>→ ¿cómo se dice en inglés?</span>
        </p>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter' && !checked) check(); else if (e.key === 'Enter' && checked) next(); }}
          disabled={checked} placeholder="Escribe en inglés..."
          style={{ width: '100%', maxWidth: 280, padding: '0.75rem 1rem', borderRadius: 10, fontSize: '1.1rem', textAlign: 'center', border: checked ? `2px solid ${isCorrect ? '#059669' : '#dc2626'}` : '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'inherit', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }} />
        {checked && (
          <div style={{ marginTop: '0.85rem', padding: '0.6rem 1rem', borderRadius: 8, background: isCorrect ? 'rgba(5,150,105,0.1)' : 'rgba(220,38,38,0.1)', display: 'inline-block' }}>
            {isCorrect ? `✅ ¡Correcto! "${current.word}"` : `✗ La respuesta es "${current.word}"`}
          </div>
        )}
        <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', marginTop: '1.1rem' }}>
          {!checked ? (
            <button className="btn btn-sm" onClick={check} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>
          ) : (
            <button className="btn btn-sm" onClick={next} style={{ background: COLOR, borderColor: COLOR }}>
              {qi < words.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VocabularioInglesA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<'flash' | 'mcq' | 'fill' | null>(null);
  const [flashIdx, setFlashIdx] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const currentSet = SETS.find(s => s.id === setId);

  function startMode(m: 'flash' | 'mcq' | 'fill') { setMode(m); setFlashIdx(0); setResult(null); }
  function backToSets() { setSetId(null); setMode(null); setResult(null); }

  if (setId && currentSet) {
    if (result !== null) {
      return (
        <section className="wl-section">
          <div className="wrap" style={{ maxWidth: 640 }}>
            <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{result >= currentSet.words.length * 0.8 ? '🏆' : '⭐'}</div>
              <h2 style={{ margin: '0 0 0.35rem' }}>{result}/{currentSet.words.length} correctas</h2>
              <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
                {result >= currentSet.words.length * 0.8 ? '¡Dominas este set! Prueba otro modo.' : 'Repasa las tarjetas y vuelve a intentarlo.'}
              </p>
              <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-sm" onClick={() => startMode(mode!)} style={{ background: COLOR, borderColor: COLOR }}>Reintentar</button>
                <button className="btn btn-ghost btn-sm" onClick={() => setMode(null)}>Elegir otro modo</button>
                <button className="btn btn-ghost btn-sm" onClick={backToSets}>← Todos los sets</button>
              </div>
            </div>
          </div>
        </section>
      );
    }

    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 640 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Inglés A2</Link>
            <span>/</span>
            <button onClick={backToSets} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontFamily: 'var(--mono)', fontSize: '0.82rem', padding: 0 }}>📚 Vocabulario</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.nameEs}</span>
          </div>

          {!mode ? (
            <>
              <h2 style={{ margin: '0 0 0.35rem', fontSize: '1.6rem' }}>{currentSet.emoji} {currentSet.name}</h2>
              <p style={{ color: 'var(--muted)', margin: '0 0 1.75rem' }}>{currentSet.words.length} palabras · Elige un modo de práctica</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.85rem', marginBottom: '1.5rem' }}>
                {[
                  { id: 'flash' as const, emoji: '🃏', name: 'Flashcards', desc: 'Ve la palabra, toca para ver la traducción y el ejemplo.' },
                  { id: 'mcq' as const, emoji: '🎯', name: 'Opción múltiple', desc: 'Ve la palabra y elige la traducción correcta entre 4 opciones.' },
                  { id: 'fill' as const, emoji: '✏️', name: 'Escribir', desc: 'Ve la traducción en español y escribe la palabra en inglés.' },
                ].map(m => (
                  <button key={m.id} onClick={() => startMode(m.id)} style={{ textAlign: 'left', padding: '1.25rem', borderRadius: 14, border: `1.5px solid ${COLOR}33`, background: `${COLOR}08`, cursor: 'pointer', fontFamily: 'inherit', color: 'inherit', transition: 'all 0.15s' }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.4rem' }}>{m.emoji}</div>
                    <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.25rem' }}>{m.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.4 }}>{m.desc}</div>
                  </button>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {currentSet.words.map(w => (
                  <div key={w.word} style={{ padding: '0.35rem 0.75rem', borderRadius: 8, border: `1px solid ${COLOR}22`, background: `${COLOR}06`, fontSize: '0.85rem' }}>
                    {w.emoji} {w.word}
                  </div>
                ))}
              </div>
            </>
          ) : mode === 'flash' ? (
            <Flashcard word={currentSet.words[flashIdx]} idx={flashIdx} total={currentSet.words.length}
              onNext={() => setFlashIdx(i => Math.min(i + 1, currentSet.words.length - 1))}
              onPrev={() => setFlashIdx(i => Math.max(i - 1, 0))} />
          ) : mode === 'mcq' ? (
            <MCQPractice words={currentSet.words} onDone={(s) => setResult(s)} />
          ) : (
            <FillBlank words={currentSet.words} onDone={(s) => setResult(s)} />
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 860 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ingles/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇬🇧 Inglés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 Vocabulario</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Vocabulary · Inglés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>
          8 sets temáticos · 80 palabras esenciales · Flashcards, opción múltiple y escritura.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.3rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06`, transition: 'all 0.18s', height: '100%', boxSizing: 'border-box' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${COLOR}20`; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = 'none'; (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; }}>
                <span style={{ fontSize: '2.2rem', display: 'block', marginBottom: '0.6rem' }}>{s.emoji}</span>
                <div style={{ fontWeight: 800, color: 'var(--ink)', marginBottom: '0.2rem' }}>{s.nameEs}</div>
                <div style={{ fontSize: '0.78rem', color: COLOR, fontFamily: 'var(--mono)', marginBottom: '0.5rem' }}>{s.name} · {s.words.length} palabras</div>
                <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                  {s.words.slice(0, 4).map(w => (
                    <span key={w.word} style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem', borderRadius: 5, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)' }}>{w.word}</span>
                  ))}
                  <span style={{ fontSize: '0.7rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>+{s.words.length - 4}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
