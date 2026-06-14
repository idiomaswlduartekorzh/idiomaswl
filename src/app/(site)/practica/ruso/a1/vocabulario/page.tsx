'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface VocabWord { word: string; translit: string; es: string; emoji: string; example: string; exampleTranslit: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameTranslit: string; nameEs: string; emoji: string; words: VocabWord[]; }

const SETS: VocabSet[] = [
  {
    id: 'semya', name: 'Семья', nameTranslit: 'Sem\'ya', nameEs: 'La familia', emoji: '👨‍👩‍👧‍👦',
    words: [
      { word: 'мама', translit: 'mama', es: 'mamá', emoji: '👩', example: 'Моя мама врач.', exampleTranslit: 'Moya mama vrach.', exampleEs: 'Mi mamá es médica.' },
      { word: 'папа', translit: 'papa', es: 'papá', emoji: '👨', example: 'Мой папа работает в офисе.', exampleTranslit: 'Moy papa rabotayet v ofise.', exampleEs: 'Mi papá trabaja en una oficina.' },
      { word: 'брат', translit: 'brat', es: 'hermano', emoji: '👦', example: 'У меня есть брат.', exampleTranslit: 'U menya yest\' brat.', exampleEs: 'Tengo un hermano.' },
      { word: 'сестра', translit: 'sestra', es: 'hermana', emoji: '👧', example: 'Моя сестра студентка.', exampleTranslit: 'Moya sestra studentka.', exampleEs: 'Mi hermana es estudiante.' },
      { word: 'бабушка', translit: 'babushka', es: 'abuela', emoji: '👵', example: 'Бабушка живёт в деревне.', exampleTranslit: 'Babushka zhivyot v derevne.', exampleEs: 'La abuela vive en el pueblo.' },
      { word: 'дедушка', translit: 'dedushka', es: 'abuelo', emoji: '👴', example: 'Мой дедушка любит читать.', exampleTranslit: 'Moy dedushka lyubit chitat\'.', exampleEs: 'Mi abuelo ama leer.' },
      { word: 'сын', translit: 'syn', es: 'hijo', emoji: '🧒', example: 'У неё есть сын.', exampleTranslit: 'U neyo yest\' syn.', exampleEs: 'Ella tiene un hijo.' },
      { word: 'дочь', translit: 'doch\'', es: 'hija', emoji: '👶', example: 'Её дочь учится в школе.', exampleTranslit: 'Yeyo doch\' uchitsya v shkole.', exampleEs: 'Su hija estudia en la escuela.' },
      { word: 'муж', translit: 'muzh', es: 'esposo', emoji: '💑', example: 'Её муж — инженер.', exampleTranslit: 'Yeyo muzh — inzhener.', exampleEs: 'Su esposo es ingeniero.' },
      { word: 'жена', translit: 'zhena', es: 'esposa', emoji: '💍', example: 'Его жена — учительница.', exampleTranslit: 'Yego zhena — uchitel\'nitsa.', exampleEs: 'Su esposa es maestra.' },
    ],
  },
  {
    id: 'cveta', name: 'Цвета', nameTranslit: 'Tsveta', nameEs: 'Los colores', emoji: '🎨',
    words: [
      { word: 'красный', translit: 'krasnyy', es: 'rojo', emoji: '🔴', example: 'Яблоко красное.', exampleTranslit: 'Yabloko kasnoye.', exampleEs: 'La manzana es roja.' },
      { word: 'синий', translit: 'siniy', es: 'azul (oscuro)', emoji: '🔵', example: 'Небо синее.', exampleTranslit: 'Nebo sineye.', exampleEs: 'El cielo es azul.' },
      { word: 'зелёный', translit: 'zelyonyy', es: 'verde', emoji: '🟢', example: 'Трава зелёная.', exampleTranslit: 'Trava zelyonaya.', exampleEs: 'El pasto es verde.' },
      { word: 'жёлтый', translit: 'zholtyy', es: 'amarillo', emoji: '🟡', example: 'Солнце жёлтое.', exampleTranslit: 'Solntse zholtoe.', exampleEs: 'El sol es amarillo.' },
      { word: 'белый', translit: 'belyy', es: 'blanco', emoji: '⬜', example: 'Снег белый.', exampleTranslit: 'Sneg belyy.', exampleEs: 'La nieve es blanca.' },
      { word: 'чёрный', translit: 'chornyy', es: 'negro', emoji: '⬛', example: 'Кот чёрный.', exampleTranslit: 'Kot chornyy.', exampleEs: 'El gato es negro.' },
      { word: 'коричневый', translit: 'korichnevyy', es: 'café/marrón', emoji: '🟫', example: 'Стол коричневый.', exampleTranslit: 'Stol korichnevyy.', exampleEs: 'La mesa es café.' },
      { word: 'оранжевый', translit: 'oranzhevyy', es: 'naranja', emoji: '🟠', example: 'Апельсин оранжевый.', exampleTranslit: 'Apel\'sin oranzhevyy.', exampleEs: 'La naranja es naranja.' },
      { word: 'розовый', translit: 'rozovyy', es: 'rosado', emoji: '🩷', example: 'Цветы розовые.', exampleTranslit: 'Tsvety rozovyye.', exampleEs: 'Las flores son rosadas.' },
      { word: 'фиолетовый', translit: 'fioletovyy', es: 'morado', emoji: '🟣', example: 'Виноград фиолетовый.', exampleTranslit: 'Vinograd fioletovyy.', exampleEs: 'La uva es morada.' },
    ],
  },
  {
    id: 'eda', name: 'Еда', nameTranslit: 'Yeda', nameEs: 'La comida', emoji: '🍽️',
    words: [
      { word: 'хлеб', translit: 'khleb', es: 'pan', emoji: '🍞', example: 'Я ем хлеб на завтрак.', exampleTranslit: 'Ya yem khleb na zavtrak.', exampleEs: 'Como pan en el desayuno.' },
      { word: 'суп', translit: 'sup', es: 'sopa', emoji: '🍲', example: 'Борщ — это русский суп.', exampleTranslit: 'Borshch — eto russkiy sup.', exampleEs: 'El borsch es una sopa rusa.' },
      { word: 'кофе', translit: 'kofe', es: 'café', emoji: '☕', example: 'Я пью кофе каждое утро.', exampleTranslit: 'Ya p\'yu kofe kazhdoye utro.', exampleEs: 'Tomo café cada mañana.' },
      { word: 'чай', translit: 'chay', es: 'té', emoji: '🫖', example: 'В России пьют много чая.', exampleTranslit: 'V Rossii p\'yut mnogo chaya.', exampleEs: 'En Rusia se toma mucho té.' },
      { word: 'вода', translit: 'voda', es: 'agua', emoji: '💧', example: 'Пей больше воды!', exampleTranslit: 'Pey bol\'she vody!', exampleEs: '¡Bebe más agua!' },
      { word: 'яблоко', translit: 'yabloko', es: 'manzana', emoji: '🍎', example: 'Я люблю яблоки.', exampleTranslit: 'Ya lyublyu yabloki.', exampleEs: 'Me encantan las manzanas.' },
      { word: 'мясо', translit: 'myaso', es: 'carne', emoji: '🥩', example: 'Он не ест мясо.', exampleTranslit: 'On ne yest myaso.', exampleEs: 'Él no come carne.' },
      { word: 'молоко', translit: 'moloko', es: 'leche', emoji: '🥛', example: 'Дети пьют молоко.', exampleTranslit: 'Deti p\'yut moloko.', exampleEs: 'Los niños toman leche.' },
      { word: 'рыба', translit: 'ryba', es: 'pescado/pez', emoji: '🐟', example: 'Рыба очень вкусная.', exampleTranslit: 'Ryba ochen\' vkusnaya.', exampleEs: 'El pescado es muy rico.' },
      { word: 'пельмени', translit: 'pel\'meni', es: 'pelmeni (ravioles rusos)', emoji: '🥟', example: 'Пельмени — любимое блюдо.', exampleTranslit: 'Pel\'meni — lyubimoye blyudo.', exampleEs: 'Los pelmeni son el plato favorito.' },
    ],
  },
  {
    id: 'dni', name: 'Дни недели', nameTranslit: 'Dni nedeli', nameEs: 'Días de la semana', emoji: '📅',
    words: [
      { word: 'понедельник', translit: 'ponedel\'nik', es: 'lunes', emoji: '1️⃣', example: 'В понедельник я работаю.', exampleTranslit: 'V ponedel\'nik ya rabotayu.', exampleEs: 'El lunes trabajo.' },
      { word: 'вторник', translit: 'vtornik', es: 'martes', emoji: '2️⃣', example: 'Во вторник у меня урок.', exampleTranslit: 'Vo vtornik u menya urok.', exampleEs: 'El martes tengo clase.' },
      { word: 'среда', translit: 'sreda', es: 'miércoles', emoji: '3️⃣', example: 'В среду мы встречаемся.', exampleTranslit: 'V sredu my vstrechaemsia.', exampleEs: 'El miércoles nos reunimos.' },
      { word: 'четверг', translit: 'chetverg', es: 'jueves', emoji: '4️⃣', example: 'В четверг собрание.', exampleTranslit: 'V chetverg sobraniye.', exampleEs: 'El jueves hay reunión.' },
      { word: 'пятница', translit: 'pyatnitsa', es: 'viernes', emoji: '5️⃣', example: 'Я люблю пятницу!', exampleTranslit: 'Ya lyublyu pyatnitsu!', exampleEs: '¡Me encanta el viernes!' },
      { word: 'суббота', translit: 'subbota', es: 'sábado', emoji: '6️⃣', example: 'В субботу я отдыхаю.', exampleTranslit: 'V subbotu ya otdykhayu.', exampleEs: 'El sábado descanso.' },
      { word: 'воскресенье', translit: 'voskresen\'ye', es: 'domingo', emoji: '7️⃣', example: 'В воскресенье я дома.', exampleTranslit: 'V voskresen\'ye ya doma.', exampleEs: 'El domingo estoy en casa.' },
      { word: 'утро', translit: 'utro', es: 'mañana (del día)', emoji: '🌅', example: 'Доброе утро!', exampleTranslit: 'Dobroye utro!', exampleEs: '¡Buenos días!' },
      { word: 'вечер', translit: 'vecher', es: 'noche/tarde', emoji: '🌙', example: 'Добрый вечер!', exampleTranslit: 'Dobryy vecher!', exampleEs: '¡Buenas noches/tardes!' },
      { word: 'день', translit: 'den\'', es: 'día', emoji: '☀️', example: 'Хороший день!', exampleTranslit: 'Khoroshiy den\'!', exampleEs: '¡Buen día!' },
    ],
  },
  {
    id: 'telo', name: 'Тело', nameTranslit: 'Telo', nameEs: 'El cuerpo', emoji: '🧍',
    words: [
      { word: 'голова', translit: 'golova', es: 'cabeza', emoji: '🗣️', example: 'У меня болит голова.', exampleTranslit: 'U menya bolit golova.', exampleEs: 'Me duele la cabeza.' },
      { word: 'глаз', translit: 'glaz', es: 'ojo', emoji: '👁️', example: 'У него синие глаза.', exampleTranslit: 'U nego siniye glaza.', exampleEs: 'Él tiene ojos azules.' },
      { word: 'ухо', translit: 'ukho', es: 'oreja', emoji: '👂', example: 'У неё маленькие уши.', exampleTranslit: 'U neyo malen\'kiye ushi.', exampleEs: 'Ella tiene orejas pequeñas.' },
      { word: 'нос', translit: 'nos', es: 'nariz', emoji: '👃', example: 'У меня болит нос.', exampleTranslit: 'U menya bolit nos.', exampleEs: 'Me duele la nariz.' },
      { word: 'рот', translit: 'rot', es: 'boca', emoji: '👄', example: 'Открой рот!', exampleTranslit: 'Otkroy rot!', exampleEs: '¡Abre la boca!' },
      { word: 'рука', translit: 'ruka', es: 'mano/brazo', emoji: '✋', example: 'Вымой руки!', exampleTranslit: 'Vymoy ruki!', exampleEs: '¡Lávate las manos!' },
      { word: 'нога', translit: 'noga', es: 'pie/pierna', emoji: '🦶', example: 'У меня болит нога.', exampleTranslit: 'U menya bolit noga.', exampleEs: 'Me duele el pie.' },
      { word: 'сердце', translit: 'serdtse', es: 'corazón', emoji: '❤️', example: 'Сердце бьётся быстро.', exampleTranslit: 'Serdtse b\'yotsya bystro.', exampleEs: 'El corazón late rápido.' },
      { word: 'спина', translit: 'spina', es: 'espalda', emoji: '🫀', example: 'У меня болит спина.', exampleTranslit: 'U menya bolit spina.', exampleEs: 'Me duele la espalda.' },
      { word: 'волосы', translit: 'volosy', es: 'cabello/pelo', emoji: '💇', example: 'У неё длинные волосы.', exampleTranslit: 'U neyo dlinnyye volosy.', exampleEs: 'Ella tiene cabello largo.' },
    ],
  },
  {
    id: 'chisla', name: 'Числа', nameTranslit: 'Chisla', nameEs: 'Los números', emoji: '🔢',
    words: [
      { word: 'один', translit: 'odin', es: '1 (masc.)', emoji: '1️⃣', example: 'У меня один брат.', exampleTranslit: 'U menya odin brat.', exampleEs: 'Tengo un hermano.' },
      { word: 'два', translit: 'dva', es: '2 (masc.)', emoji: '2️⃣', example: 'У меня два кота.', exampleTranslit: 'U menya dva kota.', exampleEs: 'Tengo dos gatos.' },
      { word: 'три', translit: 'tri', es: '3', emoji: '3️⃣', example: 'Три комнаты.', exampleTranslit: 'Tri komnaty.', exampleEs: 'Tres habitaciones.' },
      { word: 'пять', translit: 'pyat\'', es: '5', emoji: '5️⃣', example: 'Мне пять лет.', exampleTranslit: 'Mne pyat\' let.', exampleEs: 'Tengo 5 años.' },
      { word: 'десять', translit: 'desyat\'', es: '10', emoji: '🔟', example: 'Десять рублей.', exampleTranslit: 'Desyat\' rubley.', exampleEs: 'Diez rublos.' },
      { word: 'двадцать', translit: 'dvadtsat\'', es: '20', emoji: '2️⃣0️⃣', example: 'Мне двадцать лет.', exampleTranslit: 'Mne dvadtsat\' let.', exampleEs: 'Tengo veinte años.' },
      { word: 'сто', translit: 'sto', es: '100', emoji: '💯', example: 'Сто рублей.', exampleTranslit: 'Sto rubley.', exampleEs: 'Cien rublos.' },
      { word: 'тысяча', translit: 'tysyacha', es: '1000', emoji: '💰', example: 'Тысяча слов.', exampleTranslit: 'Tysyacha slov.', exampleEs: 'Mil palabras.' },
      { word: 'ноль', translit: 'nol\'', es: '0', emoji: '0️⃣', example: 'Температура ноль градусов.', exampleTranslit: 'Temperatura nol\' gradusov.', exampleEs: 'Temperatura cero grados.' },
      { word: 'первый', translit: 'pervyy', es: 'primero', emoji: '🥇', example: 'Первый урок.', exampleTranslit: 'Pervyy urok.', exampleEs: 'Primera clase.' },
    ],
  },
];

type Mode = 'browse' | 'flashcard' | 'quiz';

export default function VocabularioRusoA1() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>('browse');
  const [cardIdx, setCardIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showTranslit, setShowTranslit] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizOpts, setQuizOpts] = useState<string[][]>([]);

  const currentSet = SETS.find(s => s.id === setId);

  const generateOpts = useCallback((set: VocabSet) => {
    return set.words.map((w, i) => {
      const others = set.words.filter((_, j) => j !== i).map(x => x.es);
      const shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);
      return [...shuffled, w.es].sort(() => Math.random() - 0.5);
    });
  }, []);

  function startMode(m: Mode, set: VocabSet) {
    setMode(m); setCardIdx(0); setFlipped(false); setShowTranslit(false); setQuizAnswers({});
    if (m === 'quiz') setQuizOpts(generateOpts(set));
  }

  if (!currentSet) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 900 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📚 Словарь</span>
          </div>
          <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Словарь · Ruso A1</p>
          <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A1</h1>
          <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>6 conjuntos temáticos. Cada palabra: Cirílico + Transliteración + Español. 3 modos de práctica.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {SETS.map(s => (
              <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', background: 'none', border: 'none', padding: 0, cursor: 'pointer', font: 'inherit', color: 'inherit' }}>
                <div style={{ padding: '1.25rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}06` }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{s.emoji}</div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--ink)', marginBottom: '0.1rem' }}>{s.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#cc0000', fontWeight: 600, marginBottom: '0.1rem' }}>{s.nameTranslit}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{s.nameEs} · {s.words.length} palabras</div>
                </div>
              </button>
            ))}
          </div>
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
          <button onClick={() => setSetId(null)} style={{ color: 'var(--muted)', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0 }}>📚 Словарь</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{currentSet.emoji} {currentSet.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {(['browse', 'flashcard', 'quiz'] as Mode[]).map(m => {
            const labels = { browse: '📖 Explorar', flashcard: '🃏 Flashcards', quiz: '🎯 Quiz' };
            return (
              <button key={m} onClick={() => startMode(m, currentSet)}
                className={mode === m ? 'btn btn-sm' : 'btn btn-ghost btn-sm'}
                style={{ ...(mode === m ? { background: COLOR, borderColor: COLOR } : {}) }}>
                {labels[m]}
              </button>
            );
          })}
        </div>

        {mode === 'browse' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.85rem' }}>
            {currentSet.words.map(w => (
              <div key={w.word} style={{ padding: '1rem 1.2rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}06` }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>{w.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--ink)' }}>{w.word}</div>
                    <div style={{ fontSize: '0.73rem', color: '#cc0000', fontWeight: 700 }}>{w.translit}</div>
                    <div style={{ fontSize: '0.85rem', color: COLOR, fontWeight: 700 }}>{w.es}</div>
                  </div>
                </div>
                <p style={{ margin: '0.35rem 0 0.1rem', fontSize: '0.82rem', color: 'var(--ink)', fontStyle: 'italic' }}>{w.example}</p>
                <p style={{ margin: '0.1rem 0 0.1rem', fontSize: '0.75rem', color: '#cc0000' }}>{w.exampleTranslit}</p>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--muted)' }}>{w.exampleEs}</p>
              </div>
            ))}
          </div>
        )}

        {mode === 'flashcard' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: 480 }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{cardIdx + 1} / {currentSet.words.length}</span>
              <button onClick={() => setShowTranslit(!showTranslit)} style={{ fontSize: '0.75rem', background: 'none', border: 'none', cursor: 'pointer', color: '#cc0000', fontWeight: 700 }}>
                {showTranslit ? '🔤 Ocultar translit.' : '🔤 Ver translit.'}
              </button>
            </div>
            <div onClick={() => setFlipped(!flipped)} style={{ width: '100%', maxWidth: 480, minHeight: 200, padding: '2rem', border: `2px solid ${COLOR}44`, borderRadius: 20, background: flipped ? `${COLOR}0d` : 'var(--bg)', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', textAlign: 'center' }}>
              {!flipped ? (
                <>
                  <span style={{ fontSize: '2.5rem' }}>{currentSet.words[cardIdx].emoji}</span>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--ink)' }}>{currentSet.words[cardIdx].word}</span>
                  {showTranslit && <span style={{ fontSize: '0.9rem', color: '#cc0000', fontWeight: 600 }}>{currentSet.words[cardIdx].translit}</span>}
                  <span style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '0.5rem' }}>toca para ver la traducción</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '1.8rem', fontWeight: 800, color: COLOR }}>{currentSet.words[cardIdx].es}</span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--ink)', fontStyle: 'italic', maxWidth: 340 }}>{currentSet.words[cardIdx].example}</p>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#cc0000', maxWidth: 340 }}>{currentSet.words[cardIdx].exampleTranslit}</p>
                </>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button className="btn btn-ghost btn-sm" disabled={cardIdx === 0} onClick={() => { setCardIdx(i => i - 1); setFlipped(false); }}>← Anterior</button>
              <button className="btn btn-sm" disabled={cardIdx === currentSet.words.length - 1} onClick={() => { setCardIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>Siguiente →</button>
            </div>
          </div>
        )}

        {mode === 'quiz' && quizOpts.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {currentSet.words.map((w, wi) => {
              const ans = quizAnswers[wi]; const isDone = ans !== undefined;
              return (
                <div key={wi} className="wl-card" style={{ padding: '1.1rem' }}>
                  <p style={{ margin: '0 0 0.35rem', fontWeight: 800, color: 'var(--ink)', fontSize: '1.1rem' }}>{w.emoji} {w.word}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.78rem', color: '#cc0000', fontWeight: 600 }}>{w.translit}</p>
                  <p style={{ margin: '0 0 0.75rem', fontSize: '0.85rem', color: 'var(--muted)' }}>¿Qué significa en español?</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {quizOpts[wi]?.map((opt, oi) => {
                      const isCorrect = opt === w.es; const isSelected = ans === oi;
                      let bg = 'var(--bg-2)'; let border = '1px solid var(--line-soft)'; let color = 'var(--ink)';
                      if (isDone && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1px solid #059669'; color = '#059669'; }
                      if (isDone && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1px solid #dc2626'; color = '#dc2626'; }
                      return (
                        <button key={oi} disabled={isDone} onClick={() => setQuizAnswers(p => ({ ...p, [wi]: oi }))}
                          style={{ padding: '0.5rem 1rem', borderRadius: 8, border, background: bg, color, cursor: isDone ? 'default' : 'pointer', fontFamily: 'inherit', fontWeight: 700, fontSize: '0.9rem' }}>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {Object.keys(quizAnswers).length === currentSet.words.length && (
              <div className="wl-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
                <p style={{ margin: '0 0 1rem', fontWeight: 700, color: 'var(--ink)' }}>
                  {currentSet.words.filter((w, i) => quizOpts[i]?.[quizAnswers[i]] === w.es).length} / {currentSet.words.length} correctas
                </p>
                <button className="btn btn-sm" onClick={() => startMode('quiz', currentSet)} style={{ background: COLOR, borderColor: COLOR }}>Повторить квиз</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
