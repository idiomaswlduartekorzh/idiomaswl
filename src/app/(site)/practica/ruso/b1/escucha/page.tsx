import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Ruso B1 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva B1 de ruso. Diálogos con vocabulario intermedio en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/b1/escucha' },
};

const COLOR = '#cc0000';

const PLANNED = [
  {
    id: 1, title: 'Собеседование на работу (Entrevista de trabajo)',
    desc: 'Diálogo formal de entrevista de trabajo. Practica el condicional con бы, el aspecto verbal y vocabulario profesional B1.',
    script: '"Здравствуйте! Присаживайтесь, пожалуйста. — Спасибо. — Расскажите о своём профессиональном опыте. — Конечно. Я работал в маркетинге четыре года и недавно окончил курсы по управлению проектами. — Вы когда-нибудь руководили командой? — Да, я руководил командой из пяти человек в течение двух лет. — Почему вы хотите уйти с нынешней работы? — Я ищу новые вызовы. Думаю, что ваша компания могла бы предоставить мне возможности для профессионального роста. — Что бы вы сделали в первые три месяца? — Я бы познакомился с командой и предложил новые стратегии коммуникации. — Каковы ваши ожидания по зарплате? — Я ожидал бы зарплату около 80 000 рублей в месяц. — Мы свяжемся с вами до конца недели. Спасибо за визит. — Спасибо. До свидания."',
    questions: ['¿Cuántos años trabajó en marketing?', '¿Qué curso completó recientemente?', '¿Ha liderado un equipo? ¿Cuántas personas?', '¿Por qué quiere cambiar de trabajo?', '¿Qué haría en los primeros tres meses?', '¿Cuándo recibirá respuesta?'],
    duration: '~70 seg', accent: 'Ruso estándar (moscovita)', wpm: 90,
  },
  {
    id: 2, title: 'Разговор об экологии (Debate ambiental)',
    desc: 'Dos amigos debaten sobre el cambio climático. Practica el condicional con бы, subjuntivo y vocabulario medioambiental B1.',
    script: '"Ты видел новости о наводнениях в Сибири? С каждым годом становится хуже. — Да, это очень тревожно. Если бы правительства действовали раньше, мы бы не оказались в такой ситуации. — Ты думаешь, что индивидуальные действия помогают? — Думаю, да, но честно говоря, если бы компании сократили выбросы углерода, эффект был бы намного больше, чем от любых индивидуальных изменений. — Это правда. Я стараюсь пользоваться общественным транспортом и покупать меньше пластика. — Каждое действие важно, но настоящие изменения должны прийти через политику. Нужно, чтобы были введены более строгие экологические законы. — Согласен. Но пока правительства действуют, мы все должны делать что можем. — Абсолютно. Думаю, нам нужно и то, и другое: индивидуальная ответственность и сильные государственные меры."',
    questions: ['¿Qué desastre ambiental mencionan?', '¿Qué crítica hacen a los gobiernos?', '¿Qué acciones individuales toma uno de ellos?', '¿Qué tendría más impacto?', '¿En qué están de acuerdo al final?'],
    duration: '~70 seg', accent: 'Ruso conversacional', wpm: 88,
  },
  {
    id: 3, title: 'Планирование поездки (Planear un viaje)',
    desc: 'Dos amigos planean un viaje a San Petersburgo usando el condicional con бы y vocabulario de viajes B1.',
    script: '"Мне хочется куда-нибудь съездить этим летом. А тебе? — Мне тоже! Я думал о Санкт-Петербурге. Ты бы поехал? — Отличная идея! Если бы мы забронировали сейчас, билеты были бы дешевле. — Я бы хотел посетить Эрмитаж и Петергоф. Какое жильё ты предпочтёшь? — Я бы предпочёл снять квартиру, а не жить в отеле. Это было бы дешевле и интереснее. — Согласен. Нам нужно было бы начать откладывать деньги. На сколько дней ты планируешь? — Думаю, десяти дней было бы достаточно. Мы могли бы провести пять дней в Петербурге и пять в окрестностях. — Отлично. Если бы мы поехали в июле, погода была бы идеальной. — Тогда решено! Я куплю билеты на этой неделе."',
    questions: ['¿A qué ciudad quieren ir?', '¿Por qué conviene reservar ya?', '¿Qué tipo de alojamiento prefieren?', '¿Cuántos días en total?', '¿Cuándo quieren ir?', '¿Quién comprará los billetes?'],
    duration: '~70 seg', accent: 'Ruso informal estándar', wpm: 88,
  },
];

export default function EscuchaRusoB1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/b1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso B1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Аудирование · Ruso B1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha B1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos B1 en preparación. Los audios se grabarán con hablantes nativos rusos. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(204,0,0,0.08)`, border: `1px solid rgba(204,0,0,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts en voz alta para practicar la pronunciación, o pedirle a David que los lea en clase. Los diálogos incluyen condicional con бы, aspecto verbal y vocabulario B1 esencial.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(204,0,0,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(204,0,0,0.04)` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--line-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>🎧</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>Диалог {ex.id}: {ex.title}</span>
                      <span style={{ fontSize: '0.62rem', fontWeight: 700, background: 'var(--line-soft)', color: 'var(--muted)', borderRadius: 5, padding: '0.1rem 0.4rem', fontFamily: 'var(--mono)' }}>PRÓXIMAMENTE</span>
                    </div>
                    <p style={{ margin: '0 0 0.5rem', fontSize: '0.84rem', color: 'var(--muted)', lineHeight: 1.5 }}>{ex.desc}</p>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {[`⏱ ${ex.duration}`, `🗣 ${ex.accent}`, `~${ex.wpm} wpm`].map(tag => (
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(204,0,0,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Скрипт (текст для записи)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(204,0,0,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ru-RU" label="Послушать диалог" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en ruso ahora?</strong> Practica con los textos de{' '}
          <Link href="/practica/ruso/b1/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura B1</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/ruso/b1/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral B1</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
