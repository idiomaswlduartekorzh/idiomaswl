'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#cc0000';

interface Task {
  id: number; title: string; titleEs: string; emoji: string; topic: string;
  prompt: string; grammar: string;
  vocab: { word: string; translit: string; es: string }[];
  model: string; modelTranslit: string; modelEs: string;
  criteria: string[]; checklist: string[];
}

const TASKS: Task[] = [
  {
    id: 1, emoji: '👋', title: 'Знакомство', titleEs: 'Presentación personal', topic: 'Местоимения · Ser/estar omitido',
    prompt: 'Escribe una presentación personal en ruso (4–6 oraciones). Incluye: tu nombre, edad, origen, qué estudias o trabajas y un hobby. Usa las estructuras A1.',
    grammar: 'Я (yo) · Меня зовут (me llamo) · Мне __ лет (tengo __ años) · Я из + ciudad en genitivo · Я студент/студентка · Я изучаю/работаю',
    vocab: [
      { word: 'меня зовут', translit: 'menya zovut', es: 'me llamo' },
      { word: 'мне', translit: 'mne', es: 'me / a mí (dativo)' },
      { word: 'лет / года', translit: 'let / goda', es: 'años (depende del número)' },
      { word: 'я из', translit: 'ya iz', es: 'soy de' },
      { word: 'студент(ка)', translit: 'student(ka)', es: 'estudiante (m./f.)' },
      { word: 'изучаю', translit: 'izuchayu', es: 'estudio / aprendo' },
      { word: 'люблю', translit: 'lyublyu', es: 'amo / me encanta' },
    ],
    model: 'Привет! Меня зовут Карлос. Мне двадцать лет. Я из Богота, из Колумбии. Я студент — изучаю экономику. Я люблю футбол и музыку.',
    modelTranslit: 'Privet! Menya zovut Karlos. Mne dvadtsat\' let. Ya iz Bogotá, iz Kolumbii. Ya student — izuchayu ekonomiku. Ya lyublyu futbol i muzyku.',
    modelEs: '¡Hola! Me llamo Carlos. Tengo veinte años. Soy de Bogotá, de Colombia. Soy estudiante — estudio economía. Me encanta el fútbol y la música.',
    criteria: ['Usa "Меня зовут" para el nombre', 'Incluye la edad con "Мне __ лет/года"', 'Indica el origen con "Я из"', 'Menciona un hobby con "Я люблю"'],
    checklist: ['Nombre con Меня зовут', 'Edad con Мне __ лет', 'País/ciudad con Я из', 'Ocupación (Я студент/работаю)', 'Hobby con Я люблю'],
  },
  {
    id: 2, emoji: '👨‍👩‍👧', title: 'Моя семья', titleEs: 'Mi familia', topic: 'Притяжательные · Verbos работать/учиться',
    prompt: 'Describe a tu familia en ruso (4–6 oraciones). Incluye: cuántos miembros tiene, nombres/edades de 2 personas y su profesión o actividad.',
    grammar: 'Моя/Мой (mi) · У меня есть (tengo) · Её/Его зовут (ella/él se llama) · Она/Он работает (ella/él trabaja) · большой/маленький (grande/pequeño)',
    vocab: [
      { word: 'у меня есть', translit: 'u menya yest\'', es: 'tengo / hay en mí' },
      { word: 'её/его зовут', translit: 'yeyo/yego zovut', es: 'ella/él se llama' },
      { word: 'мой/моя', translit: 'moy/moya', es: 'mi (masc./fem.)' },
      { word: 'работает', translit: 'rabotayet', es: 'trabaja' },
      { word: 'учится', translit: 'uchitsya', es: 'estudia / va a la escuela' },
      { word: 'небольшая', translit: 'nebol\'shaya', es: 'pequeña (fem.)' },
      { word: 'ей/ему', translit: 'yey/yemu', es: 'ella/él tiene __ años (dativo)' },
    ],
    model: 'Моя семья небольшая. У меня есть мама и папа. Мою маму зовут Мария. Ей сорок пять лет. Она врач. Мой папа — инженер. Ему пятьдесят лет. Я их очень люблю.',
    modelTranslit: 'Moya sem\'ya nebol\'shaya. U menya yest\' mama i papa. Moyu mamu zovut Mariya. Yey sorok pyat\' let. Ona vrach. Moy papa — inzhener. Yemu pyat\'desyat let. Ya ikh ochen\' lyublyu.',
    modelEs: 'Mi familia es pequeña. Tengo mamá y papá. Mi mamá se llama María. Ella tiene 45 años. Es médica. Mi papá es ingeniero. Él tiene 50 años. Los quiero mucho.',
    criteria: ['Usa "У меня есть" para decir quién está en tu familia', 'Usa мой/моя con el género correcto', 'Indica la profesión sin verbo "ser"', 'Incluye la edad con "Ей/Ему __ лет"'],
    checklist: ['Descripción de la familia (grande/pequeña)', 'Al menos 2 miembros mencionados', 'Nombres con их/её/его зовут', 'Edades indicadas', 'Profesiones sin "быть"'],
  },
  {
    id: 3, emoji: '🏠', title: 'Мой город', titleEs: 'Mi ciudad', topic: 'Есть / нет · Предлоги места',
    prompt: 'Describe tu ciudad o barrio en ruso (4–6 oraciones). Usa "В моём городе есть..." y "Нет..." para indicar qué hay y qué no hay.',
    grammar: 'В моём городе (en mi ciudad) · Есть (hay) · Нет (no hay + genitivo) · Рядом (cerca) · Далеко (lejos) · Красивый/большой/маленький',
    vocab: [
      { word: 'в моём городе', translit: 'v moyom gorode', es: 'en mi ciudad' },
      { word: 'есть', translit: 'yest\'', es: 'hay' },
      { word: 'нет', translit: 'net', es: 'no hay (+ genitivo)' },
      { word: 'рядом', translit: 'ryadom', es: 'cerca / al lado' },
      { word: 'парк', translit: 'park', es: 'parque' },
      { word: 'метро', translit: 'metro', es: 'metro/subte' },
      { word: 'красивый', translit: 'krasivyy', es: 'bonito/hermoso' },
    ],
    model: 'Я живу в Боготе. Богота — большой город. В Боготе есть много ресторанов, парков и музеев. Рядом с моим домом есть парк. Метро в Боготе нет. Я люблю свой город!',
    modelTranslit: 'Ya zhivu v Bogote. Bogotá — bol\'shoy gorod. V Bogote yest\' mnogo restoranov, parkov i muzeyev. Ryadom s moim domom yest\' park. Metro v Bogote net. Ya lyublyu svoy gorod!',
    modelEs: 'Vivo en Bogotá. Bogotá es una ciudad grande. En Bogotá hay muchos restaurantes, parques y museos. Cerca de mi casa hay un parque. En Bogotá no hay metro. ¡Amo mi ciudad!',
    criteria: ['Usa "Есть" para lo que hay', 'Usa "Нет" para lo que no hay', 'Incluye preposición В + ciudad', 'Usa al menos un adjetivo (grande/pequeño/bonito)'],
    checklist: ['Nombre de la ciudad', 'Descripción general (grande/pequeña)', '"Есть" para lugares existentes', '"Нет" para algo ausente', 'Opinión personal sobre la ciudad'],
  },
  {
    id: 4, emoji: '📅', title: 'Мой распорядок дня', titleEs: 'Mi rutina diaria', topic: 'Настоящее время · Время (hora)',
    prompt: 'Describe tu rutina diaria típica en ruso (5–7 oraciones). Incluye al menos 3 acciones con hora aproximada (утра, дня, вечера).',
    grammar: 'Я встаю/ем/иду/работаю/ложусь (verbos presente 1ª persona) · В __ часов (a las __ en punto) · Утром/днём/вечером (de mañana/tarde/noche)',
    vocab: [
      { word: 'встаю', translit: 'vstayu', es: 'me levanto' },
      { word: 'завтракаю', translit: 'zavtrakayu', es: 'desayuno' },
      { word: 'иду', translit: 'idu', es: 'voy (a pie)' },
      { word: 'обедаю', translit: 'obedayu', es: 'almuerzo' },
      { word: 'ужинаю', translit: 'uzhinayu', es: 'ceno' },
      { word: 'ложусь спать', translit: 'lozhus\' spat\'', es: 'me acuesto / me duermo' },
      { word: 'утром', translit: 'utrom', es: 'de mañana / en la mañana' },
    ],
    model: 'Каждый день я встаю в семь часов утра. Я завтракаю дома. В девять часов я иду на работу. Я обедаю в час дня. Вечером я ужинаю, смотрю телевизор или читаю книгу. Я ложусь спать в одиннадцать часов.',
    modelTranslit: 'Kazhdyy den\' ya vstayu v sem\' chasov utra. Ya zavtrakayu doma. V devyat\' chasov ya idu na rabotu. Ya obedayu v chas dnya. Vecherom ya uzhinayu, smotryu televizor ili chitayu knigu. Ya lozhus\' spat\' v odinnadtsat\' chasov.',
    modelEs: 'Cada día me levanto a las siete de la mañana. Desayuno en casa. A las nueve voy al trabajo. Almuerzo a la una de la tarde. En la noche ceno, veo televisión o leo un libro. Me acuesto a las once.',
    criteria: ['Al menos 3 verbos en 1ª persona del presente (-ю/-у)', 'Al menos 2 referencias de hora ("в __ часов")', 'Usa утром/вечером para contextualizar', 'Verbos en la forma correcta (no infinitivo)'],
    checklist: ['Hora de levantarse', 'Mañana: al menos 1 actividad', 'Tarde: al menos 1 actividad', 'Noche: acostarse + 1 actividad', 'Verbos en primera persona (-ю/-у)'],
  },
  {
    id: 5, emoji: '🌤️', title: 'Какая сегодня погода?', titleEs: '¿Qué tiempo hace hoy?', topic: 'Безличные предложения · Прилагательные',
    prompt: 'Describe el tiempo de hoy y de tu ciudad en invierno y verano en ruso (4–5 oraciones). Usa las construcciones impersonales.',
    grammar: 'Сегодня (hoy) · Холодно/жарко/тепло (hace frío/calor/templado) · Идёт дождь/снег (llueve/nieva) · В __ (месяц) обычно (en __ mes usualmente) · Градусов (grados)',
    vocab: [
      { word: 'сегодня', translit: 'segodnya', es: 'hoy' },
      { word: 'холодно', translit: 'kholodno', es: 'hace frío' },
      { word: 'жарко', translit: 'zharko', es: 'hace calor' },
      { word: 'тепло', translit: 'teplo', es: 'hace buen tiempo / templado' },
      { word: 'идёт дождь', translit: 'idyot dozhd\'', es: 'está lloviendo / llueve' },
      { word: 'идёт снег', translit: 'idyot sneg', es: 'está nevando / nieva' },
      { word: 'градусов', translit: 'gradusov', es: 'grados (genitivo plural)' },
    ],
    model: 'Сегодня в Боготе тепло и солнечно. Температура — двадцать градусов. В Боготе не очень холодно зимой. Летом здесь часто идёт дождь. Я люблю тёплую погоду!',
    modelTranslit: 'Segodnya v Bogote teplo i solnechno. Temperatura — dvadtsat\' gradusov. V Bogote ne ochen\' kholodno zimoy. Letom zdes\' chasto idyot dozhd\'. Ya lyublyu tyoluyu pogodu!',
    modelEs: 'Hoy en Bogotá hace buen tiempo y está soleado. La temperatura es de veinte grados. En Bogotá no hace mucho frío en invierno. En verano aquí llueve frecuentemente. ¡Me encanta el clima cálido!',
    criteria: ['Usa construcciones impersonales (жарко/холодно/тепло sin pronombre sujeto)', 'Menciona la temperatura en grados', 'Usa "идёт дождь/снег" para hablar de lluvia o nieve', 'Habla del clima habitual con зимой/летом'],
    checklist: ['Descripción del tiempo de hoy', 'Temperatura en números', 'Referencia al invierno o verano', '"Идёт дождь" o "идёт снег" mencionado', 'Opinión personal sobre el clima'],
  },
];

export default function EscrituraRusoA1() {
  const [activeTask, setActiveTask] = useState<number | null>(null);
  const [text, setText] = useState('');
  const [showModel, setShowModel] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [checklist, setChecklist] = useState<Record<number, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const task = activeTask !== null ? TASKS[activeTask] : null;
  const checkCount = Object.values(checklist).filter(Boolean).length;
  const totalChecks = task?.checklist.length ?? 0;

  function reset() {
    setActiveTask(null); setText(''); setShowModel(false); setShowTranslit(false);
    setChecklist({}); setSubmitted(false);
  }

  if (task) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
            <span>/</span>
            <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--muted)', font: 'inherit', padding: 0 }}>✍️ Escritura</button>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>{task.emoji} {task.titleEs}</span>
          </div>

          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />{task.topic}</p>
          <h1 style={{ fontSize: '1.7rem', letterSpacing: '-0.03em', margin: '0 0 0.35rem', fontWeight: 700 }}>{task.emoji} {task.title} — {task.titleEs}</h1>
          <p style={{ color: 'var(--muted)', margin: '0 0 1.75rem', fontSize: '0.94rem', lineHeight: 1.6 }}>{task.prompt}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Gramática a usar</div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--ink)', lineHeight: 1.65 }}>{task.grammar}</p>
            </div>
            <div className="wl-card" style={{ padding: '1rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Банк слов · Vocabulario</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                {task.vocab.map(v => (
                  <div key={v.word} style={{ display: 'flex', gap: '0.35rem', fontSize: '0.8rem', alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{v.word}</span>
                    <span style={{ color: '#cc0000', fontSize: '0.7rem' }}>({v.translit})</span>
                    <span style={{ color: 'var(--muted)' }}>— {v.es}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: 'var(--ink)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tu texto en ruso (cirílico o transliteración):</label>
            <textarea value={text} onChange={e => setText(e.target.value)} disabled={submitted} rows={7}
              placeholder="Привет! Меня зовут...  ó  Privet! Menya zovut..."
              style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: 12, resize: 'vertical', border: `1.5px solid ${submitted ? `${COLOR}44` : 'var(--line-soft)'}`, background: submitted ? `${COLOR}06` : 'var(--bg)', color: 'var(--ink)', fontSize: '0.98rem', fontFamily: 'inherit', boxSizing: 'border-box', lineHeight: 1.7 }} />
            <div style={{ textAlign: 'right', fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.25rem' }}>
              {text.trim().split(/\s+/).filter(Boolean).length} palabras
            </div>
          </div>

          {!submitted ? (
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-sm" disabled={text.trim().length < 10} onClick={() => setSubmitted(true)} style={{ ...(text.trim().length >= 10 ? { background: COLOR, borderColor: COLOR } : {}) }}>
                Отправить текст ✓
              </button>
              <button className="btn btn-ghost btn-sm" onClick={reset}>← Cambiar tarea</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>✓ Lista de verificación</div>
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', color: checkCount === totalChecks ? '#059669' : 'var(--muted)' }}>{checkCount}/{totalChecks}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {task.checklist.map((item, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer', fontSize: '0.88rem', color: checklist[i] ? '#059669' : 'var(--ink)' }}>
                      <input type="checkbox" checked={!!checklist[i]} onChange={e => setChecklist(p => ({ ...p, [i]: e.target.checked }))} style={{ accentColor: '#059669', width: 16, height: 16, flexShrink: 0 }} />
                      {item}
                    </label>
                  ))}
                </div>
              </div>

              <div className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase' }}>Текст-образец · Modelo</div>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button onClick={() => setShowTranslit(!showTranslit)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.72rem' }}>
                      {showTranslit ? 'Ocultar translit.' : '🔤 Ver translit.'}
                    </button>
                    <button onClick={() => setShowModel(!showModel)} className={showModel ? 'btn btn-ghost btn-sm' : 'btn btn-sm'} style={{ fontSize: '0.72rem' }}>
                      {showModel ? 'Ocultar modelo' : 'Ver modelo'}
                    </button>
                  </div>
                </div>
                {showModel && (
                  <div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '1rem', color: 'var(--ink)', lineHeight: 1.75, fontStyle: 'italic' }}>{task.model}</p>
                    {showTranslit && <p style={{ margin: '0 0 0.4rem', fontSize: '0.82rem', color: '#cc0000', lineHeight: 1.65 }}>{task.modelTranslit}</p>}
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.65 }}>{task.modelEs}</p>
                    <div style={{ marginTop: '0.75rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: 'rgba(204,0,0,0.06)', fontSize: '0.78rem', color: 'var(--ink-2)' }}>
                      <strong>Critérios de este modelo:</strong> {task.criteria.join(' · ')}
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
                <button className="btn btn-ghost btn-sm" onClick={() => { setText(''); setSubmitted(false); setChecklist({}); setShowModel(false); }}>Reescribir</button>
                <button className="btn btn-ghost btn-sm" onClick={reset}>← Todas las tareas</button>
              </div>
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
          <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Письмо · Ruso A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 2rem' }}>
          5 tareas guiadas. Puedes escribir en cirílico o en transliteración — lo importante es la estructura. Cada tarea incluye banco de vocabulario + modelo + checklist de autoevaluación.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => { setActiveTask(i); setText(''); setSubmitted(false); setChecklist({}); setShowModel(false); setShowTranslit(false); }}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', flexShrink: 0 }}>{t.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem', marginBottom: '0.1rem' }}>{t.title} — {t.titleEs}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.topic} · {t.checklist.length} criterios · modelo + transliteración</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700, fontSize: '1.1rem', flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', padding: '0.85rem 1.1rem', borderRadius: 12, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Si no tienes teclado cirílico, escribe con <strong>transliteración</strong> (letras latinas). Activar el teclado ruso en tu celular o computador es recomendable para A2.
        </div>
      </div>
    </section>
  );
}
