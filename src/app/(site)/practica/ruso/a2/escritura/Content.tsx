'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#cc0000';

interface WritingTask {
  id: number; title: string; titleRu: string; topic: string;
  prompt: string; model: string; modelTranslit: string; criteria: string[];
  vocab: string[]; checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1, title: 'Письмо другу', titleRu: 'Pismo drugu (Carta a un amigo)', topic: 'Прошедшее время (pasado)',
    prompt: 'Напишите письмо другу о вашей последней поездке. 5-6 предложений. Куда вы ездили? Что видели? Что вам понравилось? (Escribe una carta a un amigo sobre tu último viaje. 5-6 oraciones. ¿Adónde fuiste? ¿Qué viste? ¿Qué te gustó?)',
    model: 'Привет, Саша! Я недавно ездил в Барселону. Это был удивительный город! Я гулял по старому городу и видел красивую архитектуру. Я ел вкусную испанскую еду и пил sangria. Мне очень понравилось море. Я хочу вернуться туда снова!',
    modelTranslit: 'Privet, Sasha! Ya nedavno yezdil v Barselonu. Eto byl udivitelny gorod! Ya gulyal po staromu gorodu i videl krasivuyu arkhitekturu. Ya yel vkusnuyu ispanskuyu yedu i pil sangria. Mne ochen ponravilos more. Ya khochu vernutsya tuda snova!',
    criteria: ['Usa al menos 4 verbos en прошедшее время (passato)', 'Incluye expresiones de tiempo (недавно, вчера, на прошлой неделе)', 'Menciona al menos un lugar y una actividad', 'Termina con una opinión o reacción emocional'],
    vocab: ['недавно (recientemente)', 'ездил/а (fui en transporte)', 'гулял/а (paseé)', 'видел/а (vi)', 'понравилось (me gustó)', 'было (fue/era)', 'попробовал/а (probé)', 'встретил/а (conocí/encontré)'],
    checklist: ['¿Los verbos concuerdan en género con el sujeto (гулял/гуляла)?', '¿Usaste al menos una expresión de tiempo?', '¿El relato sigue un orden lógico?', '¿La carta tiene saludo y cierre?'],
  },
  {
    id: 2, title: 'О себе', titleRu: 'O sebe (Sobre mí)', topic: 'Настоящее + Будущее время (presente + futuro)',
    prompt: 'Напишите короткое представление о себе: кто вы сейчас и какие у вас планы на будущее. 5-6 предложений. (Escribe una breve presentación sobre ti: quién eres ahora y cuáles son tus planes para el futuro. 5-6 oraciones.)',
    model: 'Меня зовут Карлос, мне 25 лет. Я живу в Колумбии и работаю менеджером. Сейчас я учу русский язык — это трудно, но очень интересно! В следующем году я буду сдавать экзамен TORFL. Я думаю, что буду жить в России два года. Моя мечта — говорить по-русски свободно.',
    modelTranslit: 'Menya zovut Karlos, mne 25 let. Ya zhivu v Kolumbii i rabotayu menedzherom. Seychas ya uchu russky yazyk — eto trudno, no ochen interesno! V sleduyushchem godu ya budu sdavat ekzamen TORFL. Ya dumayu, chto budu zhit v Rossii dva goda. Moya mechta — govorit po-russki svobodno.',
    criteria: ['Usa al menos 2 verbos en presente para describir tu situación actual', 'Usa буду + infinitivo para al menos 2 planes futuros', 'Incluye tu nombre, edad y actividad principal', 'Expresa un deseo o sueño personal al final'],
    vocab: ['меня зовут (me llamo)', 'мне ... лет (tengo ... años)', 'живу (vivo)', 'работаю (trabajo)', 'учу (estudio/aprendo)', 'буду + инф. (estaré/haré)', 'в следующем году (el próximo año)', 'моя мечта (mi sueño)'],
    checklist: ['¿Usaste presente para describir tu situación actual?', '¿Usaste буду + infinitivo para los planes futuros?', '¿El texto tiene al menos 5 oraciones?', '¿Incluiste información personal relevante?'],
  },
  {
    id: 3, title: 'Мой любимый город', titleRu: 'Moy lyubimy gorod (Mi ciudad favorita)', topic: 'Сравнительная степень (comparativo)',
    prompt: 'Опишите два города и сравните их. Используйте сравнительную степень прилагательных. 5-6 предложений. (Describe dos ciudades y compáralas. Usa comparativos de adjetivos. 5-6 oraciones.)',
    model: 'Мой любимый город — Медельин. Он красивее и современнее, чем я думал раньше. Медельин больше Картахены, но Картахена более историческая. Климат в Медельине лучше, чем в Боготе — там всегда тепло. Люди там добрее и дружелюбнее. Я думаю, что Медельин интереснее для туристов.',
    modelTranslit: 'Moy lyubimy gorod — Medellin. On krasiveye i sovremennee, chem ya dumal ranshe. Medellin bolshe Kartageny, no Kartagena boleye istoricheskaya. Klimat v Medellyne luchshe, chem v Bogote — tam vsegda teplo. Lyudi tam dobree i druzhelyubnee. Ya dumayu, chto Medellin interesnee dlya turistov.',
    criteria: ['Usa сравнительную степень (прил. + -ee o более + прил.) al menos 4 veces', 'Usa чем para indicar "que" en las comparaciones', 'Menciona al menos 2 aspectos comparados (tamaño, clima, gente, etc.)', 'Incluye tu opinión personal al final'],
    vocab: ['красивее (más bonito)', 'больше (más grande)', 'лучше (mejor)', 'хуже (peor)', 'интереснее (más interesante)', 'дороже (más caro)', 'более + прил. (más + adj.)', 'чем (que)', 'раньше думал/а (antes pensaba)'],
    checklist: ['¿Usaste correctamente los comparativos irregulares (хорошо→лучше, плохо→хуже)?', '¿Usaste чем para las comparaciones directas?', '¿El texto tiene contraste entre las dos ciudades?', '¿Incluiste tu preferencia personal?'],
  },
  {
    id: 4, title: 'Планы на лето', titleRu: 'Plany na leto (Planes para el verano)', topic: 'Будущее время (futuro con буду)',
    prompt: 'Напишите о ваших планах на лето. 5-6 предложений. Куда вы поедете? Что будете делать? С кем? (Escribe sobre tus planes para el verano. 5-6 oraciones. ¿Adónde irás? ¿Qué harás? ¿Con quién?)',
    model: 'Этим летом я поеду в Петербург с другом. Мы будем жить в маленькой гостинице в центре. Я буду фотографировать архитектуру и гулять по набережным. Мой друг будет посещать музеи, особенно Эрмитаж. По вечерам мы будем ужинать в местных ресторанах. Это будет незабываемая поездка!',
    modelTranslit: 'Etim letom ya poyedu v Peterburg s drugom. My budem zhit v malenkoy gostinitsy v tsentre. Ya budu fotografirovat arkhitekturu i gulyat po naberezhnykh. Moy drug budet poseshchat muzei, osobenno Ermitazh. Po vecheram my budem uzhinat v mestnykh restoranakh. Eto budet nezabyvaemaya poyezdka!',
    criteria: ['Usa буду/будешь/будет/будем + инфинитив al menos 4 veces', 'Incluye con quién vas y dónde te alojarás', 'Describe al menos 3 actividades planificadas', 'Cierra con una expresión de anticipación o entusiasmo'],
    vocab: ['этим летом (este verano)', 'поеду (iré en transporte)', 'буду + инф. (estaré haciendo)', 'будем (estaremos)', 'жить (vivir/alojarme)', 'посещать (visitar)', 'гулять (pasear)', 'незабываемый (inolvidable)'],
    checklist: ['¿Usaste буду + infinitivo para acciones continuas en el futuro?', '¿Diferenciaste поеду (ir una vez) de буду ездить (ir repetidamente)?', '¿El texto incluye quién, dónde y qué actividades?', '¿El cierre expresa emoción o expectativa?'],
  },
  {
    id: 5, title: 'Мой распорядок дня', titleRu: 'Moy rasporyadok dnya (Mi rutina diaria)', topic: 'Возвратные глаголы + Глаголы движения',
    prompt: 'Опишите ваш обычный день. Используйте возвратные глаголы (одеваться, умываться) и глаголы движения (идти/ехать, ходить/ездить). 5-6 предложений. (Describe tu día habitual. Usa verbos reflexivos y verbos de movimiento. 5-6 oraciones.)',
    model: 'Каждое утро я просыпаюсь в семь часов и умываюсь. Потом я одеваюсь и завтракаю дома. Я иду на работу пешком — это занимает двадцать минут. На работе я занимаюсь документами и встречаюсь с коллегами. Вечером я еду домой на автобусе. Перед сном я читаю книгу или занимаюсь русским языком.',
    modelTranslit: 'Kazhdo utro ya prosypayus v sem chasov i umyvayus. Potom ya odyvayus i zavtrakayu doma. Ya idu na rabotu peshkom — eto zanimayet dvadtsat minut. Na rabote ya zanimayus dokumentami i vstrechayus s kollegami. Vecherom ya yedu domoy na avtobuse. Pered snom ya chitayu knigu ili zanimayus russkim yazykom.',
    criteria: ['Usa al menos 3 возвратных глагола (с -ся/-сь)', 'Usa идти (ir a pie, una vez) y/o ехать (ir en transporte, una vez)', 'Narra los eventos en orden cronológico con expresiones de tiempo', 'Incluye tanto actividades en casa como fuera de ella'],
    vocab: ['просыпаюсь (me despierto)', 'умываюсь (me lavo la cara)', 'одеваюсь (me visto)', 'занимаюсь (me ocupo/practico)', 'встречаюсь (me reúno)', 'иду (voy a pie — unidireccional)', 'еду (voy en transporte — unidireccional)', 'хожу (voy a pie — habitual)'],
    checklist: ['¿Todos los возвратных глаголов terminan en -ся o -сь (después de vocal)?', '¿Usaste иду/еду para acciones de un solo sentido hoy, no хожу/езжу?', '¿Los tiempos del día aparecen en orden lógico?', '¿El texto describe tanto la mañana como la tarde/noche?'],
  },
];

export default function EscrituraRusoA2() {
  const [taskId, setTaskId] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [checkDone, setCheckDone] = useState<Record<number, boolean>>({});

  const task = TASKS.find(t => t.id === taskId);

  function back() { setTaskId(null); setText(''); setSubmitted(false); setShowModel(false); setShowTranslit(false); setCheckDone({}); }

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  if (submitted && task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>✅</div>
            <h2 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Отлично! (Muy bien)</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>Guardado — David o Zhanna pueden revisarlo contigo en clase.</p>
            <div style={{ padding: '1.1rem 1.25rem', borderRadius: 12, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', marginBottom: '1.5rem', textAlign: 'left' }}>
              <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink)', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{text}</p>
            </div>
            <button onClick={() => setShowModel(!showModel)} className="btn btn-ghost btn-sm" style={{ marginBottom: '0.75rem' }}>
              {showModel ? '▲ Ocultar modelo' : '▼ Ver texto modelo'}
            </button>
            {showModel && (
              <div style={{ padding: '1rem 1.25rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, textAlign: 'left', marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
                <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7 }}>{task.model}</p>
                <button onClick={() => setShowTranslit(!showTranslit)} style={{ fontSize: '0.72rem', border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.15rem 0.5rem', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                  {showTranslit ? '▲ Ocultar transliteración' : '▼ Ver transliteración'}
                </button>
                {showTranslit && <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.modelTranslit}</p>}
              </div>
            )}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={back} className="btn" style={{ background: COLOR, borderColor: COLOR, color: '#fff' }}>← Volver a tareas</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 720 }}>
          <button onClick={back} style={{ fontSize: '0.8rem', color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--mono)', marginBottom: '1.25rem', padding: 0 }}>← Volver</button>

          <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />Письмо · Tarea {task.id}</p>
          <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.3rem', fontWeight: 700 }}>{task.title}</h2>
          <p style={{ fontSize: '0.82rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700, margin: '0 0 1.25rem' }}>{task.titleRu} · Gramática: {task.topic}</p>

          <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Tarea</div>
            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.6 }}>{task.prompt}</p>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Criterios de evaluación</div>
            {task.criteria.map((c, i) => <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>✓ {c}</p>)}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Vocabulario útil</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {task.vocab.map((v, i) => <span key={i} style={{ fontSize: '0.75rem', padding: '0.2rem 0.55rem', borderRadius: 6, background: `${COLOR}10`, color: COLOR, fontFamily: 'var(--mono)' }}>{v}</span>)}
            </div>
          </div>

          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder="Escribe aquí en cirílico o transliteración... (пр.: Привет! Я недавно ездил в...)"
            style={{ width: '100%', minHeight: 160, padding: '0.9rem 1rem', borderRadius: 12, border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.7, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box', outline: 'none', marginBottom: '0.5rem' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>{words} palabras</span>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Checklist de revisión</div>
            {task.checklist.map((item, i) => (
              <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem', cursor: 'pointer' }}>
                <input type="checkbox" checked={!!checkDone[i]} onChange={e => setCheckDone(prev => ({ ...prev, [i]: e.target.checked }))} style={{ marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: '0.82rem', color: checkDone[i] ? COLOR : 'var(--muted)' }}>{item}</span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button onClick={() => text.trim() && setSubmitted(true)} className="btn" style={{ background: COLOR, borderColor: COLOR, color: '#fff', opacity: text.trim() ? 1 : 0.5 }}>
              Enviar texto ✓
            </button>
            <button onClick={() => setShowModel(!showModel)} className="btn btn-ghost btn-sm">
              {showModel ? '▲ Ocultar modelo' : '▼ Ver modelo'}
            </button>
          </div>

          {showModel && (
            <div style={{ marginTop: '1rem', padding: '1rem 1.25rem', borderRadius: 12, background: `${COLOR}08`, border: `1px solid ${COLOR}22` }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Texto modelo</div>
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.7 }}>{task.model}</p>
              <button onClick={() => setShowTranslit(!showTranslit)} style={{ fontSize: '0.72rem', border: '1px solid var(--line-soft)', borderRadius: 6, padding: '0.15rem 0.5rem', background: 'transparent', cursor: 'pointer', color: 'var(--muted)', fontFamily: 'var(--mono)' }}>
                {showTranslit ? '▲ Ocultar transliteración' : '▼ Ver transliteración'}
              </button>
              {showTranslit && <p style={{ margin: '0.5rem 0 0', fontSize: '0.82rem', color: 'var(--muted)', fontStyle: 'italic', lineHeight: 1.6 }}>{task.modelTranslit}</p>}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Письмо (Pismo) · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>
          5 tareas guiadas que practican gramática A2. Cada tarea incluye un modelo en cirílico con transliteración, criterios de evaluación y checklist.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map(t => (
            <button key={t.id} onClick={() => setTaskId(t.id)} style={{ textAlign: 'left', padding: '1.2rem 1.4rem', border: '1.5px solid var(--line-soft)', borderRadius: 16, background: 'var(--bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '1rem', transition: 'border-color 0.18s', fontFamily: 'inherit' }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: `${COLOR}15`, color: COLOR, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.title} — {t.titleRu}</div>
                <div style={{ fontSize: '0.75rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700, marginTop: '0.15rem' }}>Gramática: {t.topic}</div>
              </div>
              <span style={{ fontSize: '1.1rem', color: COLOR, fontWeight: 700 }}>→</span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '0.9rem 1.2rem', borderRadius: 12, background: `${COLOR}06`, border: `1px solid ${COLOR}18`, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Puedes escribir en cirílico o en transliteración — ambos son válidos. Los modelos incluyen transliteración para que puedas pronunciar cada oración en voz alta. Guarda tu texto para revisarlo con David o Zhanna en clase.
        </div>
      </div>
    </section>
  );
}
