'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

const COLOR = '#cc0000';

interface ReadingText { id: number; title: string; titleEs: string; topic: string; words: number; grammar: string; text: string; translit: string; vocab: Record<string, string>; goal: string; keyVocab: { w: string; t: string }[]; mcq: { q: string; cat: string; opts: string[]; a: number; fb: string }[]; openQ: string; production: string; }

const TEXTS: ReadingText[] = [
  {
    id: 1, title: 'Меня зовут Анна', titleEs: 'Me llamo Anna', topic: 'Знакомство · Presentación', words: 52, grammar: 'Местоимения · Omisión de быть',
    text: 'Привет! Меня зовут Анна. Мне двадцать два года. Я студентка. Я из Москвы. Сейчас я живу в Боготе, в Колумбии. Я изучаю испанский язык. Мой любимый предмет — история. У меня есть кот. Его зовут Мурка.',
    translit: 'Privet! Menya zovut Anna. Mne dvadtsat\' dva goda. Ya studentka. Ya iz Moskvy. Seychas ya zhivu v Bogote, v Kolumbii. Ya izuchayu ispanskiy yazyk. Moy lyubimyy predmet — istoriya. U menya yest\' kot. Yego zovut Murka.',
    vocab: { привет:'privet — hola', меня:'menya — me / a mí', зовут:'zovut — llaman (me llamo)', мне:'mne — me / a mí (dativo)', двадцать:'dvadtsat\' — veinte', студентка:'studentka — estudiante (f.)', живу:'zhivu — vivo (yo)', изучаю:'izuchayu — estudio/aprendo', язык:'yazyk — idioma/lengua', любимый:'lyubimyy — favorito', предмет:'predmet — materia/asignatura', история:'istoriya — historia', есть:'yest\' — hay / tengo', кот:'kot — gato (m.)' },
    goal: 'Lee la presentación de Anna y averigua: ¿de dónde es, qué estudia y qué mascota tiene?',
    keyVocab: [
      { w: 'меня зовут (menya zovut)', t: 'me llamo' },
      { w: 'мне ... года (mne ... goda)', t: 'tengo ... años' },
      { w: 'я из (ya iz)', t: 'soy de' },
      { w: 'я живу (ya zhivu)', t: 'vivo' },
      { w: 'я изучаю (ya izuchayu)', t: 'estudio / aprendo' },
      { w: 'у меня есть (u menya yest)', t: 'tengo' },
    ],
    mcq: [
      { q: '¿Qué significa "меня зовут"?', cat: 'Vocabulario', opts: ['Yo soy','Me llamo','Soy de','Tengo'], a: 1, fb: '"Меня зовут" (menya zovut) = me llaman = me llamo. Literalmente "a mí me llaman".' },
      { q: '¿De dónde es Anna?', cat: 'Comprensión', opts: ['Богота','Москва','Колумбия (Colombia)','Испания'], a: 1, fb: '"Я из Москвы" (ya iz Moskvy) = soy de Moscú.' },
      { q: '¿Qué estudia Anna?', cat: 'Comprensión', opts: ['Русский язык','Историю','Испанский язык','Математику'], a: 2, fb: '"Я изучаю испанский язык" (ya izuchayu ispanskiy yazyk) = estudio español.' },
      { q: '¿Cómo se llama el gato?', cat: 'Comprensión', opts: ['Барсик','Мурка','Котик','Пушок'], a: 1, fb: '"Его зовут Мурка" (yego zovut Murka) = se llama Murka. Мурка es un nombre típico de gato en Rusia.' },
      { q: '"Я студентка" (ya studentka) — ¿la -ка final indica?', cat: 'Gramática', opts: ['Plural', 'Femenino (Anna es mujer)', 'Pasado', 'Negación'], a: 1, fb: 'En ruso, -ка/-ница marcan el género femenino de sustantivos de profesión: студент (m.) → студентка (f.), учитель (m.) → учительница (f.).' },
    ],
    openQ: 'Preséntate en ruso en 3–4 oraciones. Usa: "Меня зовут...", "Мне ___ лет/года", "Я из...", "Я изучаю..."',
    production: 'Puedes usar transliteración si no tienes teclado cirílico. Ej: "Menya zovut ___. Mne ___ let."',
  },
  {
    id: 2, title: 'Моя семья', titleEs: 'Mi familia', topic: 'Семья · Familia', words: 55, grammar: 'Притяжательные местоимения · Possesivos',
    text: 'Моя семья небольшая. Моя мама — врач. Она работает в больнице. Мой папа — инженер. Он работает в офисе. У меня есть сестра. Её зовут Катя. Ей восемнадцать лет. Она учится в университете. Мы живём в большом доме в Санкт-Петербурге.',
    translit: 'Moya sem\'ya nebol\'shaya. Moya mama — vrach. Ona rabotayet v bol\'nitse. Moy papa — inzhener. On rabotayet v ofise. U menya yest\' sestra. Yey vosemnadtsat\' let. Ona uchitsya v universitete. My zhivyom v bol\'shom dome v Sankt-Peterburge.',
    vocab: { семья:'sem\'ya — familia', небольшая:'nebol\'shaya — pequeña', врач:'vrach — médico/a', работает:'rabotayet — trabaja', больнице:'bol\'nitse — hospital (loc.)', инженер:'inzhener — ingeniero', офисе:'ofise — oficina (loc.)', сестра:'sestra — hermana', учится:'uchitsya — estudia/se educa', живём:'zhivyom — vivimos', большом:'bol\'shom — grande (loc.)', доме:'dome — casa (loc.)' },
    goal: 'Lee el texto y averigua: ¿a qué se dedican los padres, cuántos años tiene la hermana y dónde vive la familia?',
    keyVocab: [
      { w: 'семья (sem\'ya)', t: 'familia' },
      { w: 'врач (vrach)', t: 'médico/a' },
      { w: 'инженер (inzhener)', t: 'ingeniero' },
      { w: 'работает (rabotayet)', t: 'trabaja' },
      { w: 'сестра (sestra)', t: 'hermana' },
      { w: 'мы живём (my zhivyom)', t: 'vivimos' },
    ],
    mcq: [
      { q: '¿Qué significa "врач" (vrach)?', cat: 'Vocabulario', opts: ['Ingeniero','Abogado','Médico/a','Maestro/a'], a: 2, fb: '"Врач" (vrach) = médico/a. Es un sustantivo masculino aunque puede referirse a hombre o mujer.' },
      { q: '¿Dónde trabaja la madre?', cat: 'Comprensión', opts: ['В офисе (en la oficina)','В больнице (en el hospital)','В университете (en la universidad)','Дома (en casa)'], a: 1, fb: '"Она работает в больнице" (ona rabotayet v bol\'nitse) = ella trabaja en el hospital.' },
      { q: '¿Cuántos años tiene la hermana?', cat: 'Comprensión', opts: ['16','17','18','19'], a: 2, fb: '"Ей восемнадцать лет" (yey vosemnadtsat\' let) = ella tiene 18 años. Восемнадцать = 18.' },
      { q: '¿Dónde vive la familia?', cat: 'Comprensión', opts: ['Москва','Санкт-Петербург','Богота','Лондон'], a: 1, fb: '"Мы живём в Санкт-Петербурге" = vivimos en San Petersburgo.' },
      { q: '"Моя мама" vs "Мой папа" — ¿por qué moy/moya?', cat: 'Gramática', opts: ['Varía por el sexo del hablante', 'Varía por el género del sustantivo poseído', 'Varía por el tiempo verbal', 'No hay regla'], a: 1, fb: 'En ruso los posesivos concuerdan con el género del sustantivo poseído: мама (f.) → МОЯ мама; папа (m.) → МОЙ папа.' },
    ],
    openQ: 'Describe a 2 miembros de tu familia en ruso (puedes usar transliteración). Usa: "Moy/Moya ___ — (profesión). On/Ona rabotayet v ___."',
    production: 'Patrón: "Moy papa — ___. On rabotayet v ___. Moey mame ___ let."',
  },
  {
    id: 3, title: 'Мой день', titleEs: 'Mi día', topic: 'Распорядок дня · Rutina', words: 58, grammar: 'Настоящее время · Presente',
    text: 'Я встаю в семь часов утра. Я принимаю душ и завтракаю. Я пью кофе и ем бутерброд. В половине девятого я еду на работу на метро. Я работаю в центре города. Я заканчиваю работу в шесть часов вечера. Вечером я читаю книги или смотрю телевизор. Я ложусь спать в одиннадцать часов.',
    translit: 'Ya vstayú v sem\' chasov utra. Ya prinimayu dush i zavtrakáyu. Ya p\'yu kofe i yem buterbrод. V polovine devyatogo ya édu na rabotu na metro. Ya rabotayu v tsentre goroda. Ya zakanchivayu rabotu v shest\' chasov vechera. Vecherom ya chitayu knigi ili smotryu televizor. Ya lozhus\' spat\' v odinnadtsat\' chasov.',
    vocab: { встаю:'vstayu — me levanto', утра:'utra — de la mañana (gen.)', принимаю:'prinimayu — tomo/recibo', душ:'dush — ducha', завтракаю:'zavtrakayu — desayuno', пью:'p\'yu — bebo', ем:'yem — como', еду:'yedu — voy (en vehículo)', заканчиваю:'zakanchivayu — termino', вечером:'vecherom — en la noche/tarde', читаю:'chitayu — leo', смотрю:'smotryu — veo/miro', ложусь:'lozhus\' — me acuesto' },
    goal: 'Lee la rutina y averigua: ¿a qué hora se levanta, cómo va al trabajo y qué hace por la noche?',
    keyVocab: [
      { w: 'я встаю (ya vstayu)', t: 'me levanto' },
      { w: 'завтракаю (zavtrakayu)', t: 'desayuno' },
      { w: 'я еду (ya yedu)', t: 'voy (en transporte)' },
      { w: 'я работаю (ya rabotayu)', t: 'trabajo' },
      { w: 'читаю (chitayu)', t: 'leo' },
      { w: 'ложусь спать (lozhus\' spat\')', t: 'me acuesto a dormir' },
    ],
    mcq: [
      { q: '¿Qué significa "я встаю" (ya vstayu)?', cat: 'Vocabulario', opts: ['Me duermo','Me levanto','Me ducho','Desayuno'], a: 1, fb: '"Встаю" (vstayu) = me levanto. De "вставать" (vstavat\') = levantarse. Verbo reflexivo de movimiento.' },
      { q: '¿A qué hora se levanta?', cat: 'Comprensión', opts: ['В 6','В 7','В 8','В 9'], a: 1, fb: '"В семь часов утра" (v sem\' chasov utra) = a las siete de la mañana.' },
      { q: '¿Cómo va al trabajo?', cat: 'Comprensión', opts: ['На автобусе','На метро','На машине','Пешком'], a: 1, fb: '"Я еду на работу на метро" (ya yedu na rabotu na metro) = voy al trabajo en metro.' },
      { q: '¿Qué hace por la noche?', cat: 'Comprensión', opts: ['Смотрит фильмы','Читает книги или смотрит телевизор','Занимается спортом','Встречается с друзьями'], a: 1, fb: '"Вечером я читаю книги или смотрю телевизор" = en la noche leo libros o veo televisión.' },
      { q: '"Читаю, смотрю, работаю" — todos terminan en -ю porque:', cat: 'Gramática', opts: ['Son verbos en pasado', 'Son verbos en yo (primera persona)', 'Son verbos en plural', 'Son verbos negativos'], a: 1, fb: 'La 1ª persona del singular del presente ruso termina en -ю/-у. читать→читаю; работать→работаю; говорить→говорю.' },
    ],
    openQ: 'Describe tu rutina diaria en ruso (transliteración OK). Usa: "Ya vstayú v... Ya... Vecherom ya..."',
    production: 'Usa verbos en primera persona del singular: vstayú, zavtrakayu, rabotayu, chitayu, lozhus\' spat\'...',
  },
  {
    id: 4, title: 'В магазине', titleEs: 'En la tienda', topic: 'Покупки · De compras', words: 62, grammar: 'Числа · Сколько стоит · Можно',
    text: 'Я иду в магазин. В магазине есть фрукты, овощи и хлеб. Я беру яблоки, бананы и молоко. Продавец спрашивает: «Что ещё?» Я говорю: «Мне нужен хлеб, пожалуйста.» Продавец отвечает: «Хлеб стоит пятьдесят рублей.» Я плачу сто рублей. Продавец даёт сдачу — пятьдесят рублей. Я говорю: «Спасибо!» и выхожу из магазина.',
    translit: 'Ya idu v magazin. V magazine yest\' frukty, ovoshchi i khleb. Ya beru yabloki, banany i moloko. Prodavets sprashivayet: "Chto yeshchyo?" Ya govoryu: "Mne nuzhen khleb, pozhaluysta." Prodavets otvechayet: "Khleb stoit pyat\'desyat rubley." Ya plachu sto rubley. Prodavets dayot sdachu — pyat\'desyat rubley. Ya govoryu: "Spasibo!" i vykhozhu iz magazina.',
    vocab: { иду:'idu — voy (a pie)', магазин:'magazin — tienda', фрукты:'frukty — frutas', овощи:'ovoshchi — verduras', беру:'beru — tomo/cojo', продавец:'prodavets — vendedor', спрашивает:'sprashivayet — pregunta', нужен:'nuzhen — necesito (masc.)', стоит:'stoit — cuesta', плачу:'plachu — pago', сдачу:'sdachu — el cambio (dinero)', выхожу:'vykhozhu — salgo' },
    goal: 'Lee el diálogo en la tienda y averigua: ¿qué compra, cuánto cuesta el pan y cuánto cambio recibe?',
    keyVocab: [
      { w: 'магазин (magazin)', t: 'tienda' },
      { w: 'я беру (ya beru)', t: 'tomo / cojo' },
      { w: 'сколько стоит? (skol\'ko stoit?)', t: '¿cuánto cuesta?' },
      { w: 'мне нужен (mne nuzhen)', t: 'necesito' },
      { w: 'рублей (rubley)', t: 'rublos' },
      { w: 'сдачу (sdachu)', t: 'el cambio (dinero)' },
    ],
    mcq: [
      { q: '¿Qué significa "сколько стоит?" (skol\'ko stoit?)', cat: 'Vocabulario', opts: ['¿Qué necesitas?', '¿Cuánto cuesta?', '¿Dónde está?', '¿Cuándo abres?'], a: 1, fb: '"Сколько стоит?" = ¿cuánto cuesta? Сколько (skol\'ko) = cuánto; стоит (stoit) = cuesta.' },
      { q: '¿Qué compra en la tienda?', cat: 'Comprensión', opts: ['Carne y verduras', 'Manzanas, bananas y leche', 'Pan y queso', 'Frutas y carne'], a: 1, fb: '"Я беру яблоки, бананы и молоко" = tomo manzanas, bananas y leche.' },
      { q: '¿Cuánto cuesta el pan?', cat: 'Comprensión', opts: ['20 рублей', '50 рублей', '100 рублей', '75 рублей'], a: 1, fb: '"Хлеб стоит пятьдесят рублей" (khleb stoit pyat\'desyat rubley) = el pan cuesta cincuenta rublos.' },
      { q: '"Мне нужен хлеб" — ¿por qué se dice "нужен" y no "нужна"?', cat: 'Gramática', opts: ['Porque es plural', 'Porque хлеб es masculino', 'Porque es negativo', 'Por el contexto'], a: 1, fb: '"Нужен" es la forma masculina. "Нужна" va con femeninos: "мне нужна вода" (necesito agua — вода es fem.).' },
      { q: '¿Qué le da el vendedor al final?', cat: 'Comprensión', opts: ['Un recibo', 'El pan gratis', 'Cincuenta rublos de cambio', 'Más frutas'], a: 2, fb: '"Продавец даёт сдачу — пятьдесят рублей" = el vendedor da el cambio — cincuenta rublos.' },
    ],
    openQ: 'Escribe una compra simple en ruso (transliteración OK): "Ya idu v magazin. Mne nuzhen/nuzhna ___."',
    production: 'Usa: iду v magazin, mne nuzhen (masc.) / nuzhna (fem.), stoit ___ rubley, spasibo.',
  },
  {
    id: 5, title: 'Мои друзья', titleEs: 'Mis amigos', topic: 'Люди и характер · Personas', words: 60, grammar: 'Притяжательные + прилагательные согласования',
    text: 'У меня есть два друга. Мой друг Иван — высокий и добрый. Он живёт в Москве и работает врачом. Моя подруга Наташа — весёлая и умная. Она учится в университете. Иван любит спорт, а Наташа любит читать книги. Мы часто встречаемся в кафе. Мы пьём кофе и разговариваем.',
    translit: 'U menya yest\' dva druga. Moy drug Ivan — vysokiy i dobryy. On zhivyot v Moskve i rabotayet vrachom. Moya podruga Natasha — vyosyolaya i umnaya. Ona uchitsya v universitete. Ivan lyubit sport, a Natasha lyubit chitat\' knigi. My chasto vstrechayemsya v kafe. My p\'yom kofe i razgovarivaem.',
    vocab: { друга:'druga — amigos (gen. pl.)', высокий:'vysokiy — alto', добрый:'dobryy — bueno/bondadoso', живёт:'zhivyot — vive', подруга:'podruga — amiga (fem.)', весёлая:'vesyolaya — alegre', умная:'umnaya — inteligente', учится:'uchitsya — estudia', часто:'chasto — frecuentemente', встречаемся:'vstrechayemsya — nos encontramos', разговариваем:'razgovarivaem — conversamos' },
    goal: 'Lee el texto y averigua: ¿cómo son los dos amigos, qué hace cada uno y dónde se encuentran?',
    keyVocab: [
      { w: 'друг / подруга (drug / podruga)', t: 'amigo / amiga' },
      { w: 'высокий (vysokiy)', t: 'alto' },
      { w: 'добрый (dobryy)', t: 'bueno / bondadoso' },
      { w: 'весёлая (vesyolaya)', t: 'alegre' },
      { w: 'умная (umnaya)', t: 'inteligente' },
      { w: 'встречаемся (vstrechayemsya)', t: 'nos encontramos' },
    ],
    mcq: [
      { q: '¿Cuántos amigos menciona el narrador?', cat: 'Comprensión', opts: ['Uno', 'Dos', 'Tres', 'Cuatro'], a: 1, fb: '"У меня есть два друга" (u menya yest\' dva druga) = tengo dos amigos.' },
      { q: '"Мой" vs "Моя" — la diferencia es:', cat: 'Gramática', opts: ['Moy = plural, Moya = singular', 'Moy = masculino, Moya = femenino', 'Moy = formal, Moya = informal', 'Son iguales'], a: 1, fb: '"Мой" (moy) = mi (con masc.): мой друг. "Моя" (moya) = mi (con fem.): моя подруга. El posesivo concuerda con el género del sustantivo.' },
      { q: '¿Qué hace Наташа?', cat: 'Comprensión', opts: ['Trabaja como médica', 'Estudia en la universidad', 'Vive en Moscú', 'Trabaja en una cafetería'], a: 1, fb: '"Она учится в университете" (ona uchitsya v universitete) = ella estudia en la universidad.' },
      { q: '¿Qué significa "добрый" (dobryy)?', cat: 'Vocabulario', opts: ['Alto', 'Alegre', 'Bueno/bondadoso', 'Inteligente'], a: 2, fb: '"Добрый" (dobryy) = bueno/bondadoso, de buen corazón. "Высокий" = alto; "весёлый" = alegre; "умный" = inteligente.' },
      { q: '¿Dónde se encuentran los amigos?', cat: 'Comprensión', opts: ['En casa de Iván', 'En la universidad', 'En un café', 'En el trabajo'], a: 2, fb: '"Мы часто встречаемся в кафе" (my chasto vstrechayemsya v kafe) = nos encontramos frecuentemente en un café.' },
    ],
    openQ: 'Describe a un amigo tuyo en ruso: "Moy drug ___ — [adjetivos]. On/ona zhivyot v ___ i [verb]."',
    production: 'Usa: moy drug (masc.) / moya podruga (fem.), vysokiy/vysokaya, umniy/umnaya, zhivyot, rabotayet/uchitsya.',
  },
];

function ReadingLesson({ t, onBack }: { t: ReadingText; onBack: () => void }) {
  const [phase, setPhase] = useState<'pre' | 'read' | 'questions' | 'done'>('pre');
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [openAns, setOpenAns] = useState('');
  const [showTranslit, setShowTranslit] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const tokens = t.text.split(/(\s+|[.,!?—:]+)/).filter(Boolean).map(tk => ({
    raw: tk, isSpace: /^\s+$/.test(tk), isPunct: /^[.,!?—:]+$/.test(tk),
    clean: tk.replace(/[^а-яёА-ЯЁa-zA-Z]/g, '').toLowerCase(),
  }));
  const allDone = t.mcq.every((_, i) => answers[i] !== undefined);
  const score = t.mcq.filter((q, i) => answers[i] === q.a).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button onClick={onBack} className="btn btn-ghost btn-sm">← Все тексты</button>
        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontFamily: 'var(--mono)' }}>Текст {t.id} / 5 — {t.title}</span>
        <span style={{ marginLeft: 'auto', fontSize: '0.7rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>📝 {t.words} слов · {t.grammar}</span>
      </div>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {(['pre', 'read', 'questions', 'done'] as const).map((p, i) => {
          const labels = ['Antes', 'Lectura', 'Preguntas', 'Resultado'];
          const phaseOrder = ['pre','read','questions','done'];
          const current = phase === p; const past = phaseOrder.indexOf(p) < phaseOrder.indexOf(phase);
          return (
            <div key={p} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.25rem' }}>
              <div style={{ width: '100%', height: 4, borderRadius: 2, background: current ? COLOR : past ? `${COLOR}66` : 'var(--line-soft)' }} />
              <span style={{ fontSize: '0.62rem', fontFamily: 'var(--mono)', color: current ? COLOR : 'var(--muted)', fontWeight: current ? 800 : 400 }}>{labels[i]}</span>
            </div>
          );
        })}
      </div>

      {phase === 'pre' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <p className="eyebrow" style={{ marginBottom: '0.75rem' }}><span className="ink-line" />Перед чтением — antes de leer</p>
          {/* Objetivo de lectura */}
          <div style={{ padding: '0.9rem 1.1rem', borderRadius: 12, background: `${COLOR}0d`, border: `1px solid ${COLOR}2a`, marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.3rem' }}>🎯 Tu objetivo</div>
            <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', fontSize: '0.95rem', lineHeight: 1.55 }}>{t.goal}</p>
          </div>
          {/* Vocabulario clave */}
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.6rem' }}>📚 Vocabulario clave — apréndelo antes de leer</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {t.keyVocab.map((kv, i) => (
              <div key={i} style={{ padding: '0.6rem 0.85rem', borderRadius: 10, background: 'var(--bg-2)', border: '1px solid var(--line-soft)' }}>
                <div style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '0.88rem' }}>{kv.w}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{kv.t}</div>
              </div>
            ))}
          </div>
          <button className="btn btn-sm" onClick={() => setPhase('read')}>Готово — читать →</button>
        </div>
      )}

      {phase === 'read' && (
        <div className="wl-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <p className="eyebrow" style={{ margin: 0 }}><span className="ink-line" />{t.title} — {t.titleEs}</p>
            <button onClick={() => setShowTranslit(!showTranslit)} className="btn btn-ghost btn-sm" style={{ fontSize: '0.75rem' }}>
              {showTranslit ? '🔤 Ocultar transliteración' : '🔤 Ver transliteración'}
            </button>
          </div>
          {showTranslit && (
            <div style={{ marginBottom: '1rem', padding: '0.75rem 1rem', borderRadius: 10, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.7, fontStyle: 'italic' }}>
              {t.translit}
            </div>
          )}
          <div style={{ lineHeight: 2.2, fontSize: '1.05rem', color: 'var(--ink)', position: 'relative', marginBottom: '1.25rem' }}>
            {tokens.map((tk, i) => {
              if (tk.isSpace || tk.isPunct) return <span key={i}>{tk.raw}</span>;
              const hasTrans = !!t.vocab[tk.clean];
              const isActive = activeIdx === i;
              return (
                <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                  <button onClick={() => { setActiveWord(t.vocab[tk.clean] ?? null); setActiveIdx(i); }}
                    style={{ background: isActive ? 'rgba(204,0,0,0.12)' : hasTrans ? 'rgba(204,0,0,0.06)' : 'transparent', border: isActive ? '1.5px solid #cc0000' : hasTrans ? '1px dashed rgba(204,0,0,0.3)' : 'none', borderRadius: 6, padding: '0 3px', cursor: hasTrans ? 'pointer' : 'default', fontSize: 'inherit', fontFamily: 'inherit', color: isActive ? '#cc0000' : 'inherit', fontWeight: isActive ? 700 : 'inherit' }}>{tk.raw}</button>
                  {isActive && (
                    <span ref={tooltipRef} style={{ position: 'absolute', top: '100%', left: '50%', transform: 'translateX(-50%)', background: activeWord ? '#8b0000' : '#6f7691', color: '#fff', borderRadius: 8, padding: '0.28rem 0.8rem', fontSize: '0.76rem', fontWeight: 600, whiteSpace: 'nowrap', zIndex: 10, boxShadow: '0 4px 16px rgba(139,0,0,0.25)', marginTop: 4, maxWidth: 260, textAlign: 'center' }}>
                      {activeWord ?? '(слово без перевода)'}
                    </span>
                  )}
                </span>
              );
            })}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--line-soft)' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('questions'); setActiveWord(null); setActiveIdx(null); }}>Прочитал/а → Отвечать на вопросы</button>
            <button className="btn btn-ghost btn-sm" onClick={() => setPhase('pre')}>← Назад</button>
          </div>
        </div>
      )}

      {phase === 'questions' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }} onClick={() => setPhase('read')}>← Вернуться к тексту</button>
          {t.mcq.map((q, qi) => {
            const ans = answers[qi]; const done = ans !== undefined;
            return (
              <div key={qi} className="wl-card" style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: COLOR, fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>{q.cat} · Вопрос {qi + 1}</div>
                <p style={{ margin: '0 0 0.85rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{q.q}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  {q.opts.map((opt, oi) => {
                    const isCorrect = oi === q.a; const isSelected = ans === oi;
                    let bg = 'var(--bg)'; let border = '1.5px solid var(--line-soft)'; let color = 'var(--ink)';
                    if (done && isSelected && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
                    if (done && isSelected && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
                    if (done && !isSelected && isCorrect) { bg = 'rgba(5,150,105,0.06)'; border = '1.5px solid #059669'; color = '#059669'; }
                    return (
                      <button key={oi} onClick={() => { if (answers[qi] !== undefined) return; setAnswers(p => ({ ...p, [qi]: oi })); }} disabled={done}
                        style={{ textAlign: 'left', padding: '0.6rem 0.9rem', borderRadius: 10, border, background: bg, color, fontSize: '0.9rem', cursor: done ? 'default' : 'pointer', fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--mono)', fontWeight: 700, opacity: 0.55 }}>{String.fromCharCode(65 + oi)}.</span>{opt}
                        {done && isCorrect && <span style={{ marginLeft: 'auto' }}>✓</span>}
                        {done && isSelected && !isCorrect && <span style={{ marginLeft: 'auto' }}>✗</span>}
                      </button>
                    );
                  })}
                </div>
                {done && <div style={{ marginTop: '0.7rem', padding: '0.6rem 0.85rem', borderRadius: 8, background: ans === q.a ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--ink-2)' }}>{ans === q.a ? '✅ ' : '💡 '}{q.fb}</div>}
              </div>
            );
          })}
          <div className="wl-card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.5rem' }}>Свободная письменная работа</div>
            <p style={{ margin: '0 0 0.25rem', fontWeight: 600, color: 'var(--ink)', fontSize: '0.97rem' }}>{t.openQ}</p>
            <p style={{ margin: '0 0 0.85rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>💡 {t.production}</p>
            <textarea value={openAns} onChange={e => setOpenAns(e.target.value)} rows={4} placeholder="Пиши по-русски (cirílico o transliteración)..." style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: 10, resize: 'vertical', border: '1.5px solid var(--line-soft)', background: 'var(--bg)', color: 'var(--ink)', fontSize: '0.95rem', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          {allDone && <button className="btn btn-sm" onClick={() => setPhase('done')}>Посмотреть результат →</button>}
        </div>
      )}

      {phase === 'done' && (
        <div className="wl-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2.8rem', marginBottom: '0.5rem' }}>{score === t.mcq.length ? '🏆' : score >= 3 ? '⭐' : '📚'}</div>
          <h2 style={{ margin: '0 0 0.35rem', color: 'var(--ink)' }}>{score} / {t.mcq.length} правильно</h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>
            {score === t.mcq.length ? '¡Отлично! Entendiste todo el texto.' : score >= 3 ? 'Хорошо. Repasa las preguntas que fallaste.' : 'Прочитай текст ещё раз. Vuelve al texto.'}
          </p>
          {openAns && (
            <div style={{ padding: '1rem', borderRadius: 12, background: 'rgba(5,150,105,0.07)', border: '1px solid rgba(5,150,105,0.2)', marginBottom: '1.25rem', textAlign: 'left' }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--wl-on-panel-ok, #059669)', fontFamily: 'var(--mono)', marginBottom: '0.4rem' }}>ТВОЯ СВОБОДНАЯ РАБОТА</div>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>{openAns}</p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn btn-sm" onClick={() => { setPhase('read'); setAnswers({}); setOpenAns(''); }}>Читать снова</button>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← Все тексты</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LecturaRusoA1() {
  const [selected, setSelected] = useState<number | null>(null);

  if (selected !== null) {
    return (
      <section className="wl-section">
        <div className="wrap" style={{ maxWidth: 780 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
            <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
            <span>/</span>
            <Link href="/practica/ruso/a1" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇷🇺 Ruso A1</Link>
            <span>/</span>
            <span style={{ color: COLOR, fontWeight: 800 }}>📖 Чтение</span>
          </div>
          <ReadingLesson t={TEXTS[selected]} onBack={() => setSelected(null)} />
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
          <span style={{ color: COLOR, fontWeight: 800 }}>📖 Чтение · Lectura</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />Чтение · Ruso A1</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Lectura A1</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 540, margin: '0 0 2rem' }}>
          5 textos en cirílico con transliteración disponible, vocabulario interactivo y preguntas de comprensión. Haz clic en las palabras resaltadas para ver su transliteración y significado.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {TEXTS.map((t, i) => (
            <button key={t.id} onClick={() => setSelected(i)}
              style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.1rem 1.4rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `linear-gradient(135deg, rgba(204,0,0,0.04) 0%, transparent 100%)` }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', fontWeight: 900, fontFamily: 'var(--mono)', flexShrink: 0 }}>{t.id}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.18rem', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, color: 'var(--ink)', fontSize: '1rem' }}>{t.title}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', fontStyle: 'italic' }}>{t.titleEs}</span>
                    <span style={{ fontSize: '0.65rem', color: COLOR, fontFamily: 'var(--mono)', fontWeight: 700 }}>{t.topic}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{t.words} слов · {t.grammar} · {t.mcq.length} вопроса + свободная работа</p>
                </div>
                <span style={{ color: COLOR, fontSize: '1.1rem', fontWeight: 700, flexShrink: 0 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', padding: '0.85rem 1.1rem', borderRadius: 12, background: 'rgba(204,0,0,0.06)', border: '1px solid rgba(204,0,0,0.15)', fontSize: '0.83rem', color: 'var(--muted)', lineHeight: 1.6 }}>
          💡 <strong style={{ color: 'var(--ink)' }}>Consejo:</strong> Dentro de cada texto puedes activar la <strong>transliteración</strong> para leer el texto en letras latinas mientras aprendes el cirílico.
        </div>
      </div>
    </section>
  );
}
