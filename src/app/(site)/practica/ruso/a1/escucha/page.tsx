import Link from 'next/link';

const COLOR = '#cc0000';

const EXERCISES = [
  {
    id: 1,
    title: 'Знакомство на уроке',
    titleEs: 'Presentación en clase',
    duration: '~30 seg',
    level: 'A1',
    topic: 'Меня зовут · Я из · Я изучаю',
    script: [
      { speaker: 'Учитель', text: 'Добрый день! Я — ваш преподаватель. Меня зовут Андрей Сергеевич. Расскажите о себе, пожалуйста.', translit: 'Dobryy den\'! Ya — vash prepodavatel\'. Menya zovut Andrey Sergeyevich. Rasskhazhite o sebe, pozhaluysta.' },
      { speaker: 'Анна', text: 'Привет! Меня зовут Анна. Я из Москвы. Мне двадцать лет. Я люблю музыку.', translit: 'Privet! Menya zovut Anna. Ya iz Moskvy. Mne dvadtsat\' let. Ya lyublyu muzyku.' },
      { speaker: 'Карлос', text: 'Здравствуйте! Я Карлос. Я из Колумбии. Мне двадцать два года. Я изучаю русский язык.', translit: 'Zdravstvuyte! Ya Karlos. Ya iz Kolumbii. Mne dvadtsat\' dva goda. Ya izuchayu russkiy yazyk.' },
    ],
    questions: [
      { q: '¿Cómo se llama el profesor?', opts: ['Андрей Сергеевич', 'Карлос', 'Анна', 'Иван'], a: 0 },
      { q: '¿De dónde es Anna?', opts: ['Колумбия', 'Санкт-Петербург', 'Москва', 'Лондон'], a: 2 },
      { q: '¿Qué estudia Carlos?', opts: ['Испанский', 'Английский', 'Французский', 'Русский язык'], a: 3 },
    ],
    glossary: [
      { word: 'преподаватель', translit: 'prepodavatel\'', es: 'profesor/a (universitario)' },
      { word: 'ваш', translit: 'vash', es: 'su (posesivo formal, pl.)' },
      { word: 'расскажите о себе', translit: 'rasskazhite o sebe', es: 'cuéntenos sobre usted/sí mismo' },
    ],
  },
  {
    id: 2,
    title: 'В кафе',
    titleEs: 'En el café',
    duration: '~35 seg',
    level: 'A1',
    topic: 'Что вы хотите? · Числа · Это (стоит)',
    script: [
      { speaker: 'Официант', text: 'Здравствуйте! Что вы хотите?', translit: 'Zdravstvuyte! Chto vy khotite?' },
      { speaker: 'Клиент', text: 'Один кофе и один бутерброд, пожалуйста.', translit: 'Odin kofe i odin butertbrod, pozhaluysta.' },
      { speaker: 'Официант', text: 'Хорошо. Кофе стоит сто рублей. Бутерброд стоит пятьдесят рублей. Всё вместе — сто пятьдесят рублей.', translit: 'Khorosho. Kofe stoit sto rubley. Butertbrod stoit pyat\'desyat rubley. Vsyo vmeste — sto pyat\'desyat rubley.' },
      { speaker: 'Клиент', text: 'Вот, пожалуйста.', translit: 'Vot, pozhaluysta.' },
      { speaker: 'Официант', text: 'Спасибо большое! Приятного аппетита!', translit: 'Spasibo bol\'shoye! Priyatnogo appetita!' },
    ],
    questions: [
      { q: '¿Qué pide el cliente?', opts: ['Чай и торт', 'Кофе и бутерброд', 'Воду и суп', 'Кофе и торт'], a: 1 },
      { q: '¿Cuánto cuesta el café?', opts: ['50 рублей', '100 рублей', '150 рублей', '200 рублей'], a: 1 },
      { q: '¿Cuánto es el total?', opts: ['100 рублей', '120 рублей', '150 рублей', '200 рублей'], a: 2 },
    ],
    glossary: [
      { word: 'что вы хотите?', translit: 'chto vy khotite?', es: '¿qué quieren/desean?' },
      { word: 'стоит', translit: 'stoit', es: 'cuesta (precio)' },
      { word: 'всё вместе', translit: 'vsyo vmeste', es: 'todo junto / el total' },
      { word: 'приятного аппетита', translit: 'priyatnogo appetita', es: '¡buen provecho!' },
    ],
  },
  {
    id: 3,
    title: 'Телефонный разговор',
    titleEs: 'Conversación telefónica',
    duration: '~40 seg',
    level: 'A1',
    topic: 'Числа · Дни недели · Время (час)',
    script: [
      { speaker: 'Наташа', text: 'Алло! Привет, это Наташа!', translit: 'Allo! Privet, eto Natasha!' },
      { speaker: 'Максим', text: 'Привет, Наташа! Как дела?', translit: 'Privet, Natasha! Kak dela?' },
      { speaker: 'Наташа', text: 'Хорошо, спасибо! Слушай, в субботу ты свободен? Мы идём в кино!', translit: 'Khorosho, spasibo! Slushaу, v subbotu ty svoboden? My idyom v kino!' },
      { speaker: 'Максим', text: 'В субботу? Да! В котором часу?', translit: 'V subbotu? Da! V kotorom chasu?' },
      { speaker: 'Наташа', text: 'В шесть часов вечера. Встречаемся у кинотеатра.', translit: 'V shest\' chasov vechera. Vstrechaemsya u kinoteatral.' },
      { speaker: 'Максим', text: 'Отлично! До субботы!', translit: 'Otlichno! Do subboty!' },
    ],
    questions: [
      { q: '¿Qué planean hacer?', opts: ['Ir al teatro', 'Ir al cine', 'Ir al restaurante', 'Ir al parque'], a: 1 },
      { q: '¿Qué día es el plan?', opts: ['Пятница', 'Суббота', 'Воскресенье', 'Понедельник'], a: 1 },
      { q: '¿A qué hora se encuentran?', opts: ['В 5 часов', 'В 6 часов вечера', 'В 7 часов', 'В 8 часов'], a: 1 },
    ],
    glossary: [
      { word: 'алло', translit: 'allo', es: '¡aló! (contestar el teléfono)' },
      { word: 'как дела?', translit: 'kak dela?', es: '¿cómo estás?' },
      { word: 'свободен', translit: 'svoboden', es: 'libre / disponible (masc.)' },
      { word: 'встречаемся', translit: 'vstrechaemsya', es: 'nos encontramos / quedamos' },
      { word: 'у кинотеатра', translit: 'u kinoteatral', es: 'en el cine / frente al cine' },
    ],
  },
];

export default function EscuchaRusoA1() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Аудирование</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Аудирование · Ruso A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Comprensión auditiva A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 580, margin: '0 0 0.75rem' }}>
          Los audios están en producción. Mientras tanto, practica con los guiones en cirílico + transliteración.
        </p>

        <div style={{ marginBottom: '2rem', padding: '1rem 1.25rem', borderRadius: 14, background: 'rgba(204,0,0,0.06)', border: `1px solid ${COLOR}22`, display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '0.1rem' }}>🎙️</span>
          <div>
            <p style={{ margin: '0 0 0.35rem', fontWeight: 700, color: 'var(--ink)', fontSize: '0.95rem' }}>Cómo practicar sin audio</p>
            <ol style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--muted)', fontSize: '0.84rem', lineHeight: 1.75 }}>
              <li>Lee el guión <strong>en cirílico</strong> — lo que escucharías.</li>
              <li>Usa la transliteración (en rojo) si necesitas ayuda con la pronunciación.</li>
              <li>Responde las preguntas de comprensión sin releer el guión.</li>
              <li>Usa el glosario para palabras nuevas.</li>
            </ol>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {EXERCISES.map((ex) => (
            <div key={ex.id} className="wl-card" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{ex.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--ink)' }}>{ex.title}</h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>{ex.titleEs}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', fontWeight: 700, color: COLOR, background: `${COLOR}15`, borderRadius: 6, padding: '0.1rem 0.4rem' }}>{ex.level}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{ex.duration}</span>
                    <span style={{ fontSize: '0.68rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>· {ex.topic}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.85rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', fontSize: '0.78rem', color: 'var(--muted)', flexShrink: 0 }}>
                  🎵 Audio próximamente
                </div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--ink)', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📄 Guión / Сценарий</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {ex.script.map((line, li) => (
                    <div key={li} style={{ padding: '0.65rem 0.9rem', borderRadius: 10, background: li % 2 === 0 ? `${COLOR}06` : 'var(--bg-2)', borderLeft: `3px solid ${li % 2 === 0 ? COLOR : '#6b7280'}` }}>
                      <div style={{ fontSize: '0.68rem', fontWeight: 800, color: li % 2 === 0 ? COLOR : '#6b7280', fontFamily: 'var(--mono)', marginBottom: '0.2rem' }}>{line.speaker}</div>
                      <p style={{ margin: '0 0 0.2rem', fontSize: '0.95rem', color: 'var(--ink)', lineHeight: 1.6 }}>{line.text}</p>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: '#cc0000', lineHeight: 1.5, fontStyle: 'italic' }}>{line.translit}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.1rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#059669', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>🗓️ Glosario clave</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                  {ex.glossary.map(g => (
                    <div key={g.word} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.83rem', flexWrap: 'wrap', alignItems: 'baseline' }}>
                      <span style={{ fontWeight: 800, color: 'var(--ink)' }}>{g.word}</span>
                      <span style={{ color: '#cc0000', fontSize: '0.73rem' }}>({g.translit})</span>
                      <span style={{ color: 'var(--muted)' }}>— {g.es}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#7c3aed', fontFamily: 'var(--mono)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>❓ Comprensión — Preguntas</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                  {ex.questions.map((q, qi) => (
                    <div key={qi} style={{ padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(124,58,237,0.05)', border: '1px solid rgba(124,58,237,0.15)' }}>
                      <p style={{ margin: '0 0 0.45rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.9rem' }}>{qi + 1}. {q.q}</p>
                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        {q.opts.map((opt, oi) => (
                          <span key={oi} style={{ padding: '0.3rem 0.75rem', borderRadius: 8, background: oi === q.a ? 'rgba(5,150,105,0.1)' : 'var(--bg-2)', border: oi === q.a ? '1px solid #059669' : '1px solid var(--line-soft)', fontSize: '0.84rem', color: oi === q.a ? '#059669' : 'var(--ink)', fontWeight: oi === q.a ? 700 : 400 }}>
                            {opt} {oi === q.a && '✓'}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
