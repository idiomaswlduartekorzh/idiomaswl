import type { Metadata } from 'next';
import Link from 'next/link';
import TTSPlayer from '@/components/practica/TTSPlayer';

export const metadata: Metadata = {
  title: 'Ruso A2 Escucha — Próximamente | Idiomas WeLearn',
  description: 'Ejercicios de comprensión auditiva A2 de ruso. Diálogos con voz nativa en preparación.',
  alternates: { canonical: 'https://idiomaswl.com/practica/ruso/a2/escucha' },
};

const COLOR = '#0369a1';

const PLANNED = [
  {
    id: 1, title: 'В аэропорту (V aeroportu — En el aeropuerto)',
    desc: 'Diálogo en el aeropuerto usando прошедшее время (pasado) y vocabulario de viajes. Practica ruso formal en situaciones reales.',
    script: '"Здравствуйте! Я хочу сделать регистрацию на рейс в Мадрид. (Zdravstvuyte! Ya khochu sdelat registratsiyu na reys v Madrid.) — Конечно. Ваш паспорт, пожалуйста. (Konechno. Vash pasport, pozhaluysta.) — Вот, возьмите. (Vot, vozmite.) — Спасибо. Вы сами упаковали чемодан? (Spasibo. Vy sami upakovli chemodan?) — Да, сам упаковал. (Da, sam upakoval.) — В ручной клади есть жидкости? (V ruchnoy kladi est zhidkosti?) — Только бутылка воды. (Tolko butylka vody.) — Хорошо. Место у окна или у прохода? (Khorosho. Mesto u okna ili u prohoda?) — У окна, пожалуйста. (U okna, pozhaluysta.) — Отлично. Ваш рейс отправляется в 15:30 с выхода B4. Счастливого пути! (Otlichno. Vash reys otpravlyaetsya v 15:30 s vykhoda B4. Schastlivogo puti!) — Спасибо большое! (Spasibo bolshoye!)"',
    questions: ['¿A qué ciudad viaja el pasajero?', '¿Qué documento presenta?', '¿Él mismo hizo la maleta?', '¿Qué tipo de asiento prefiere?', '¿A qué hora sale el vuelo?', '¿De qué puerta sale?'],
    duration: '~55 seg', accent: 'Ruso estándar (Moscú)', wpm: 95,
  },
  {
    id: 2, title: 'Собеседование (Sobesedovaniye — Entrevista de trabajo)',
    desc: 'Entrevista de trabajo usando прошедшее время (experiencia) y будущее время (planes). Practica ruso formal profesional.',
    script: '"Добрый день! Меня зовут Анна Петрова. (Dobry den! Menya zovut Anna Petrova.) — Добрый день! Присаживайтесь, пожалуйста. (Dobry den! Prisajivaytes, pozhaluysta.) — Спасибо. (Spasibo.) — Расскажите немного о себе. (Rasskazhite nemnogo o sebe.) — Я работала в маркетинговой компании три года. Я многому научилась, но хотела найти более интересную работу. (Ya rabotala v marketingvoy kompanii tri goda. Ya mnogomu nauchilas, no khotela nayti boleye interesnuyu rabotu.) — Почему вы хотите работать у нас? (Pochemu vy khotite rabotat u nas?) — Потому что ваша компания более инновационная, чем другие в отрасли. Я думаю, что здесь буду расти профессионально. (Potomu chto vasha kompaniya boleye innovatsionnaya, chem druguye v otrasli. Ya dumayu, chto zdes budu rasti professionalno.) — Хорошо. Когда вы сможете начать работу? (Khorosho. Kogda vy smozhete nachat rabotu?) — Я смогу начать со следующей недели. (Ya smogu nachat so sleduyushchey nedeli.)"',
    questions: ['¿Cuánto tiempo trabajó en la empresa anterior?', '¿Por qué quería cambiar de trabajo?', '¿Por qué quiere trabajar en esa empresa?', '¿Cuándo puede empezar?'],
    duration: '~55 seg', accent: 'Ruso estándar neutro', wpm: 90,
  },
  {
    id: 3, title: 'Планирование поездки (Planirovaniye Poyezdki — Planear un viaje)',
    desc: 'Dos amigos planean un viaje usando будущее время y глаголы движения. Escucha ruso coloquial con vocabulario de viajes.',
    script: '"Слушай, ты свободна на следующей неделе? Я думаю поехать в Санкт-Петербург. (Slushai, ty svobodna na sleduyushchey nedele? Ya dumayu poyekhat v Sankt-Peterburg.) — В Петербург? Как здорово! Я всегда хотела туда поехать. (V Peterburg? Kak zdorovo! Ya vsegda khotela tuda poyekhat.) — Я буду покупать билеты в эти выходные — они дешевле, если купить заранее. (Ya budu pokupat bilety v eti vyikhodnyye — oni deshevle, yesli kupit zaranee.) — А я найду гостиницу в центре города, пока ты покупаешь билеты. (A ya naydu gostinitsu v tsentre goroda, poka ty pokupayesh bilety.) — Отлично! Сколько дней мы будем там? (Otlichno! Skolko dney my budem tam?) — Я думаю, пяти дней будет достаточно. Обязательно пойдём в Эрмитаж! (Ya dumayu, pyati dney budet dostatochno. Obyazatelno poydyom v Ermitazh!) — Конечно! Это будет замечательная поездка. (Konechno! Eto budet zamechatelnaya poyezdka.)"',
    questions: ['¿A qué ciudad planean ir?', '¿Cuándo va a comprar los billetes?', '¿Quién buscará el hotel?', '¿Cuántos días van a quedarse?', '¿Qué lugar quieren visitar?'],
    duration: '~55 seg', accent: 'Ruso coloquial estándar', wpm: 95,
  },
];

export default function EscuchaRusoA2() {
  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/ruso/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>🎧 Escucha</span>
        </div>

        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Аудирование (Audirovaniye) · Ruso A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Escucha A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 560, margin: '0 0 2rem' }}>
          3 diálogos A2 en preparación. Los audios se grabarán con hablantes nativos rusos. <strong style={{ color: 'var(--ink)' }}>Los scripts y preguntas ya están listos.</strong>
        </p>

        <div style={{ padding: '0.85rem 1.1rem', borderRadius: 12, background: `rgba(3,105,161,0.08)`, border: `1px solid rgba(3,105,161,0.2)`, marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          🎙️ <strong style={{ color: 'var(--ink)' }}>Mientras tanto:</strong> Puedes leer los scripts con transliteración en voz alta para practicar la pronunciación rusa, o pedirle a David que los lea en clase. Los diálogos incluyen прошедшее время, будущее время y глаголы движения.
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {PLANNED.map(ex => (
            <div key={ex.id} style={{ border: `1.5px solid rgba(3,105,161,0.2)`, borderRadius: 18, overflow: 'hidden' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: `rgba(3,105,161,0.04)` }}>
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
                        <span key={tag} style={{ fontSize: '0.68rem', padding: '0.15rem 0.5rem', borderRadius: 6, background: 'rgba(3,105,161,0.08)', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 600 }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--line-soft)' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Script (текст для записи)</div>
                <p style={{ margin: '0 0 0.85rem', fontSize: '0.88rem', color: 'var(--ink)', lineHeight: 1.65, fontStyle: 'italic', borderLeft: `3px solid rgba(3,105,161,0.3)`, paddingLeft: '0.75rem' }}>
                  {ex.script}
                <TTSPlayer text={ex.script} lang="ru-RU" label="Escuchar script" />
                </p>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>Preguntas que se harán</div>
                {ex.questions.map((q, i) => (
                  <p key={i} style={{ margin: '0 0 0.2rem', fontSize: '0.82rem', color: 'var(--muted)' }}>{i + 1}. {q}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '2rem', padding: '1.1rem 1.3rem', borderRadius: 14, background: 'rgba(3,105,161,0.06)', border: '1px solid rgba(3,105,161,0.18)', fontSize: '0.84rem', lineHeight: 1.6, color: 'var(--muted)' }}>
          <strong style={{ color: 'var(--ink)' }}>¿Quieres practicar escucha en ruso ahora?</strong> Practica la lectura en voz alta con los textos de{' '}
          <Link href="/practica/ruso/a2/lectura" style={{ color: COLOR, fontWeight: 700 }}>Lectura A2</Link>{' '}
          o trabaja las frases de{' '}
          <Link href="/practica/ruso/a2/habla" style={{ color: COLOR, fontWeight: 700 }}>Expresión oral A2</Link>{' '}
          que ya están disponibles.
        </div>
      </div>
    </section>
  );
}
