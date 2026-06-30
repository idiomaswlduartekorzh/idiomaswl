'use client';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#cc0000';

interface WritingTask {
  id: number;
  title: string;
  titleRu: string;
  topic: string;
  prompt: string;
  model: string;
  modelTranslit: string;
  criteria: string[];
  vocab: string[];
  checklist: string[];
}

const TASKS: WritingTask[] = [
  {
    id: 1,
    title: 'Carta a un amigo',
    titleRu: 'Письмо другу',
    topic: 'Pasado + verbos de movimiento',
    prompt: 'Escribe una carta informal a tu amigo/a ruso/a contando cómo pasaste las últimas vacaciones. Cuenta adónde fuiste, qué hiciste, con quién estuviste y qué te gustó más. Usa verbos de movimiento (ехать/ездить, идти/ходить) correctamente y el pasado imperfectivo/perfectivo.',
    model: 'Привет, Антон! Пишу тебе из Барселоны. На прошлой неделе я ездил в Испанию на неделю. Мы ехали на поезде, потому что это дешевле, чем лететь. Каждый день я ходил по городу и фотографировал. Однажды мы пошли на пляж и купались в море. Вечерами мы ходили в рестораны и пробовали местную еду. Было очень вкусно! Особенно мне понравилась паэлья. Я хотел бы вернуться туда ещё раз. Напиши мне, как у тебя дела! Пока, Карлос.',
    modelTranslit: 'Privet, Anton! Pishu tebe iz Barselony. Na proshloy nedele ya yezdil v Ispaniyu na nedelyu. My yekhal na poyezde, potomu chto eto deshevle, chem letet\'. Kazhdyy den\' ya khodil po gorodu i fotografiroval. Odnazhdy my poshli na plyazh i kupalis\' v more. Vecherami my khodili v restorany i probovali mestnuyu yedu. Bylo ochen\' vkusno! Osobenno mne ponravilas\' paelya. Ya khotel by vernut\'sya tuda yeshchyo raz. Napishi mne, kak u tebya dela! Poka, Karlos.',
    criteria: ['Verbos de movimiento унипolar/multipolar correctos', 'Aspecto verbal perfectivo e imperfectivo', 'Registro informal (привет, пока)', 'Mínimo 120 palabras'],
    vocab: ['ездить/ехать — ir (en vehículo)', 'ходить/идти — ir (a pie)', 'пошли — fuimos (perfectivo)', 'купаться — bañarse', 'особенно — especialmente', 'понравиться — gustar (perfectivo)'],
    checklist: ['¿Usé ездил/ходил para acciones repetidas?', '¿Usé поехал/пошёл para acciones únicas?', '¿El tono es informal?', '¿Hay mínimo 120 palabras?', '¿Incluí detalles sobre el lugar y actividades?'],
  },
  {
    id: 2,
    title: 'Texto sobre ti mismo',
    titleRu: 'О себе',
    topic: 'Presente + futuro + casos gramaticales',
    prompt: 'Escribe un texto sobre ti mismo/a para una web de intercambio de idiomas. Presenta quién eres, dónde vives, qué estudias/trabajas, tus aficiones y por qué quieres practicar ruso. Usa el presente y el futuro correctamente. Usa los casos nominativo, acusativo y dativo correctamente.',
    model: 'Меня зовут Карла, мне 28 лет, я из Колумбии. Сейчас я живу в Боготе и работаю в банке менеджером. В свободное время я занимаюсь спортом: бегаю и плаваю. Мне нравится читать книги по истории и путешествовать. В прошлом году я побывала в России и влюбилась в эту страну. В будущем году я планирую снова поехать в Санкт-Петербург. Я хочу практиковать русский язык, чтобы лучше понимать культуру и общаться с местными жителями. Если вы хотите изучать испанский язык, я с радостью помогу вам!',
    modelTranslit: 'Menya zovut Karla, mne 28 let, ya iz Kolumbii. Seychas ya zhivu v Bogote i rabotayu v banke menedzherom. V svobodnoye vremya ya zanimayus\' sportom: begayu i plavayu. Mne nravitsya chitat\' knigi po istorii i puteshestvovat\'. V proshlom godu ya pobyvala v Rossii i vlyubilas\' v etu stranu. V budushchem godu ya planiruyu snova poyekhat\' v Sankt-Peterburg. Ya khochu praktikovat\' russkiy yazyk, chtoby luchshe ponimat\' kul\'turu i obshchatsya s mestnymi zhitelyami.',
    criteria: ['Verbos en presente e imperfectivo de futuro', 'Uso correcto de дательный (мне нравится)', 'Registro semi-formal', 'Mínimo 100 palabras'],
    vocab: ['меня зовут — me llamo', 'нравиться + дат. — gustar', 'заниматься спортом — hacer deporte', 'свободное время — tiempo libre', 'влюбиться — enamorarse', 'планировать + inf. — planear'],
    checklist: ['¿Usé "меня зовут" correctamente?', '¿Usé el dativo con "мне нравится"?', '¿Mencioné mis aficiones y planes futuros?', '¿El texto tiene mínimo 100 palabras?', '¿Evité errores de caso en los sustantivos?'],
  },
  {
    id: 3,
    title: 'Mi ciudad favorita',
    titleRu: 'Мой любимый город',
    topic: 'Comparativos + adjetivos',
    prompt: 'Escribe un artículo corto para un blog de viajes describiendo tu ciudad favorita. Compara esa ciudad con otra que conozcas. Usa comparativos (больше/меньше/красивее que) y adjetivos largos y cortos.',
    model: 'Мой любимый город — Картахена, на севере Колумбии. Это исторический город на берегу Карибского моря. Картахена красивее, чем большинство других городов страны, потому что там сохранился колониальный центр с яркими домами и старыми крепостями. Климат там теплее, чем в Боготе, но немного жарче летом. Улицы Картахены более живые и красочные, чем в других городах. Туристов там больше, чем в Медельине, но атмосфера менее суетливая, чем в Боготе. Если вы хотите увидеть настоящую Латинскую Америку, приезжайте в Картахену!',
    modelTranslit: 'Moy lyubimyy gorod — Karkhagena, na severe Kolumbii. Eto istoricheskiy gorod na beregu Karibskogo morya. Kartakhena krasiveye, chem bol\'shinstvo drugikh gorodov strany, potomu chto tam sokranilsya kolonial\'nyy tsentr s yarkimi domami i starymi krepostyami. Klimat tam tepleye, chem v Bogote, no nemnogo zharcheye letom.',
    criteria: ['Mínimo 4 comparativos correctos', 'Adjetivos cortos y largos bien usados', 'Descripción detallada del lugar', 'Mínimo 120 palabras'],
    vocab: ['красивее — más bonito', 'больше/меньше — más/menos', 'более + adj. — más + adj.', 'менее + adj. — menos + adj.', 'сохранился — se conservó', 'яркий — vivo/brillante'],
    checklist: ['¿Usé "красивее чем" correctamente?', '¿Usé "более/менее + adj. largo"?', '¿Describí características específicas de la ciudad?', '¿Hay mínimo 120 palabras?', '¿Evité repetir siempre los mismos adjetivos?'],
  },
  {
    id: 4,
    title: 'Planes de verano',
    titleRu: 'Планы на лето',
    topic: 'Futuro con буду + condicional con бы',
    prompt: 'Escribe un texto sobre tus planes para el próximo verano. Describe qué harás (futuro imperfectivo con буду), qué te gustaría hacer idealmente (condicional con бы) y por qué. Menciona también qué harías si tuvieras más dinero o tiempo.',
    model: 'Этим летом я буду путешествовать по Европе. В июне я буду работать, чтобы накопить деньги. В июле я планирую поехать в Италию. Там я буду посещать музеи и пробовать итальянскую кухню. Если бы у меня было больше времени, я бы поехал/поехала и в Грецию. Я бы хотел/хотела провести неделю на греческих островах. Если бы у меня было больше денег, я бы остановился/остановилась в хороших отелях. Вообще-то, моя мечта — путешествовать целое лето без каких-либо ограничений. Но реальность такова, что мне нужно работать. Всё равно, это лето будет замечательным!',
    modelTranslit: 'Etim letom ya budu puteshestvovat\' po Yevrope. V iyune ya budu rabotat\', chtoby nakopvit\' den\'gi. V iyule ya planiruyu poyekhat\' v Italiyu. Tam ya budu poseshchat\' muzei i probovat\' ital\'yanskuyu kukhnyyu. Yesli by u menya bylo bol\'she vremeni, ya by poyekhal/poyekhala i v Gretsiyu...',
    criteria: ['Futuro imperfectivo con буду + inf. correctamente', 'Condicional con бы correctamente', 'Distinción real/ideal clara', 'Mínimo 120 palabras'],
    vocab: ['буду + инф. — estaré ~ando/haré', 'если бы… + бы — si…, haría', 'накопить — ahorrar (acumular)', 'остановиться — alojarse', 'ограничение — limitación', 'вообще-то — en realidad/la verdad es que'],
    checklist: ['¿Usé "буду + infinitivo" para acciones futuras?', '¿Usé correctamente "если бы… + бы"?', '¿Distinguí entre planes reales e ideales?', '¿El texto tiene mínimo 120 palabras?', '¿Acordé el género del participante (masc./fem.)?'],
  },
  {
    id: 5,
    title: 'Mi rutina diaria',
    titleRu: 'Мой распорядок дня',
    topic: 'Verbos reflexivos + verbos de movimiento',
    prompt: 'Describe tu rutina diaria típica en un día de trabajo. Usa verbos reflexivos (одеваться, умываться, заниматься) y verbos de movimiento (идти/ходить, ехать/ездить). Incluye actividades de la mañana, mediodía y noche. Explica por qué es importante para ti esta rutina.',
    model: 'Обычно я просыпаюсь в семь утра. Сначала я умываюсь и чищу зубы. Потом я одеваюсь и завтракаю. Обычно я ем кашу или яичницу. В восемь часов я выхожу из дома и иду на работу пешком — это занимает двадцать минут. Иногда я езжу на автобусе, когда плохая погода. На работе я занимаюсь документами и провожу встречи. В час дня я обедаю в кафе недалеко от офиса. Вечером после работы я хожу в спортзал два раза в неделю. Дома я готовлю ужин и немного читаю. Ложусь спать около одиннадцати. Такая рутина помогает мне чувствовать себя организованным/организованной.',
    modelTranslit: 'Obychno ya prosypayus\' v sem\' utra. Snachala ya umyvayus\' i chistyu zuby. Potom ya odevayus\' i zavtrakuyu. Obychno ya yem kashu ili yaichnitsu. V vosem\' chasov ya vykhozhu iz doma i idu na rabotu peshkom — eto zanimayet dvadtsat\' minut...',
    criteria: ['Mínimo 4 verbos reflexivos correctos', 'Verbos de movimiento unipolar/multipolar bien usados', 'Secuencia temporal clara', 'Mínimo 120 palabras'],
    vocab: ['просыпаться — despertarse', 'умываться — lavarse la cara', 'одеваться — vestirse', 'заниматься — ocuparse/hacer', 'ложиться спать — acostarse', 'организованный — organizado'],
    checklist: ['¿Usé verbos reflexivos con -ся correctamente?', '¿Distinguí ходить (habitual) de идти (único)?', '¿La rutina tiene orden temporal lógico?', '¿El texto tiene mínimo 120 palabras?', '¿Expliqué por qué es importante la rutina?'],
  },
];

export default function EscrituraRusoB1() {
  const [active, setActive] = useState(0);
  const [showTranslit, setShowTranslit] = useState(false);
  const task = TASKS[active];

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>✍️ Escritura</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Письмо · Ruso B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escritura B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          5 tareas de escritura guiada B1. Cada tarea incluye consigna, modelo con transliteración y lista de verificación.
        </p>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.75rem' }}>
          {TASKS.map((t, i) => (
            <button key={t.id} onClick={() => setActive(i)} style={{ fontSize: '0.78rem', padding: '0.4rem 0.9rem', borderRadius: 20, border: `1.5px solid ${active === i ? COLOR : 'var(--line-soft)'}`, background: active === i ? COLOR : 'transparent', color: active === i ? '#fff' : 'var(--muted)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s' }}>
              {t.id}. {t.title}
            </button>
          ))}
        </div>

        <div style={{ border: `1.5px solid rgba(204,0,0,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', background: `rgba(204,0,0,0.04)` }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>{task.titleRu}</span>
              <span style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(204,0,0,0.1)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{task.topic}</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{task.prompt}</p>
          </div>

          <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Modelo de respuesta</div>
              <button onClick={() => setShowTranslit(v => !v)} style={{ fontSize: '0.72rem', padding: '0.2rem 0.6rem', borderRadius: 10, border: '1px solid var(--line-soft)', background: 'transparent', color: 'var(--muted)', cursor: 'pointer', fontWeight: 600 }}>
                {showTranslit ? '▲ Ocultar translit.' : '▼ Ver translit.'}
              </button>
            </div>
            <div style={{ background: 'rgba(204,0,0,0.03)', borderRadius: 10, padding: '1rem 1.1rem', borderLeft: `3px solid rgba(204,0,0,0.3)`, marginBottom: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.7, fontStyle: 'italic' }}>{task.model}</p>
              {showTranslit && (
                <p style={{ margin: '0.6rem 0 0', fontSize: '0.78rem', color: '#059669', lineHeight: 1.65, fontFamily: 'var(--mono)' }}>{task.modelTranslit}</p>
              )}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Vocabulario clave</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.1rem' }}>
              {task.vocab.map((v, i) => (
                <span key={i} style={{ fontSize: '0.76rem', padding: '0.25rem 0.6rem', borderRadius: 8, background: 'rgba(204,0,0,0.07)', color: COLOR, fontWeight: 600 }}>{v}</span>
              ))}
            </div>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Criterios de evaluación</div>
            <ul style={{ margin: '0 0 1rem', paddingLeft: '1.2rem' }}>
              {task.criteria.map((c, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.2rem' }}>{c}</li>
              ))}
            </ul>

            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Lista de verificación</div>
            {task.checklist.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginBottom: '0.3rem' }}>
                <span style={{ color: COLOR, fontSize: '0.85rem', marginTop: 1 }}>□</span>
                <span style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres seguir practicando?</strong> Practica el vocabulario en{' '}
          <Link href="/practica/ruso/b1/vocabulario" style={{ color: COLOR, fontWeight: 700 }}>Vocabulario B1</Link>{' '}
          o la gramática en{' '}
          <Link href="/practica/ruso/b1/gramatica" style={{ color: COLOR, fontWeight: 700 }}>Gramática B1</Link>.
        </div>
      </div>
    </section>
  );
}
