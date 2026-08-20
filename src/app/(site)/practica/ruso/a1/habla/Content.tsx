import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase { id: number; phrase: string; translit: string; phonetic: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, phrase: 'Привет!', translit: 'Privet!', phonetic: '[pri-VYET]', es: '¡Hola! (informal)', note: '"Привет" (privet) es informal, entre amigos. Para contextos formales: "Здравствуйте" (zdravstvuyte). La В aquí suena V.', category: 'Saludos' },
  { id: 2, phrase: 'Здравствуйте!', translit: 'Zdravstvuyte!', phonetic: '[ZDRAS-tvuy-tye]', es: '¡Buenos días / Hola! (formal)', note: 'La combinación "здр" es difícil: [zdr]. La В del medio se pronuncia muy débil o se omite: [ZDRAS-tvuy-tye]. Es el saludo formal universal.', category: 'Saludos' },
  { id: 3, phrase: 'Меня зовут ___', translit: 'Menya zovut ___', phonetic: '[mye-NYA za-VUT]', es: 'Me llamo ___', note: '"Меня зовут" literalmente = "a mí me llaman". Zovut es la forma "ellos llaman". Equivale exactamente al español "me llamo".', category: 'Presentación' },
  { id: 4, phrase: 'Я из Колумбии.', translit: 'Ya iz Kolumbii.', phonetic: '[ya iz ko-LUM-bii]', es: 'Soy de Colombia.', note: '"Я из" + país en genitivo. Я (ya) = yo; из (iz) = de (origen). "Из Колумбии" = de Colombia. El genitivo termina aquí en -ии.', category: 'Presentación' },
  { id: 5, phrase: 'Очень приятно!', translit: 'Ochen\' priyatno!', phonetic: '[O-chen\' pri-YAT-no]', es: '¡Mucho gusto!', note: '"Очень приятно" = muy agradable. Очень (ochen\') = muy. Приятно (priyatno) = agradable/placentero. El acento en priYATno.', category: 'Presentación' },
  { id: 6, phrase: 'Спасибо!', translit: 'Spasibo!', phonetic: '[spa-SI-ba]', es: '¡Gracias!', note: '"Спасибо" literalmente viene de "спаси Бог" (spasi Bog) = que Dios te salve. La O final se pronuncia [a] (reducción vocálica rusa). Много спасибо = muchas gracias.', category: 'Cortesía' },
  { id: 7, phrase: 'Пожалуйста!', translit: 'Pozhaluysta!', phonetic: '[pa-ZHA-lus-ta]', es: 'Por favor / De nada', note: '"Пожалуйста" es dual: antes del verbo = por favor. Respuesta a спасибо = de nada. La Й aquí es corta [y]. Acento: paZHAlysta.', category: 'Cortesía' },
  { id: 8, phrase: 'Я не понимаю.', translit: 'Ya ne ponimayu.', phonetic: '[ya nye pa-ni-MA-yu]', es: 'No entiendo.', note: '"Не" (nye) = no (negación). "Понимаю" (ponimayu) = entiendo (yo). НЕ + verbo = negación. Acento: poniMAyu.', category: 'Ayuda' },
  { id: 9, phrase: 'Повторите, пожалуйста.', translit: 'Povtorite, pozhaluysta.', phonetic: '[pav-ta-RI-tye pa-ZHA-lus-ta]', es: 'Repita, por favor.', note: '"Повторите" (povtorite) = repita (usted formal). Viene de повторить = repetir. Forma imperativa formal con -ите.', category: 'Ayuda' },
  { id: 10, phrase: 'Где туалет?', translit: 'Gde tualet?', phonetic: '[gdye tu-a-LYET]', es: '¿Dónde está el baño?', note: '"Где" (gde) = dónde. "Туалет" (tualet) = baño/toilet. ¡Cognado con el inglés! Гд se pronuncia como una sola sílaba [gd].', category: 'Supervivencia' },
  { id: 11, phrase: 'Сколько стоит?', translit: 'Skol\'ko stoit?', phonetic: '[SKOL\'-ka STO-it]', es: '¿Cuánto cuesta?', note: '"Сколько" (skol\'ko) = cuánto. "Стоит" (stoit) = cuesta (de стоить = costar). Pregunta universal de compras.', category: 'Supervivencia' },
  { id: 12, phrase: 'До свидания!', translit: 'Do svidaniya!', phonetic: '[da svi-DA-ni-ya]', es: '¡Hasta luego!', note: '"До свидания" = hasta la vista/reunión. До (do) = hasta. Свидание (svidaniye) = cita/reunión. Informal: "Пока!" (poka) = ¡chao!', category: 'Despedidas' },
  { id: 13, phrase: 'Как дела?', translit: 'Kak dela?', phonetic: '[kak dye-LA]', es: '¿Cómo estás? / ¿Cómo te va?', note: '"Как дела?" es la pregunta informal más común. Formal: "Как вы поживаете?" (kak vy pozhivayete). Дела (dela) = asuntos/negocios — literalmente "¿cómo van tus asuntos?". Acento en la última sílaba: de-LA.', category: 'Saludos' },
  { id: 14, phrase: 'Хорошо, спасибо!', translit: 'Khorosho, spasibo!', phonetic: '[kha-ra-SHO spa-SI-ba]', es: '¡Bien, gracias!', note: '"Хорошо" (khorosho) = bien/bueno. La х suena como J española. Alternativas: "Отлично!" (otlichno) = ¡excelente!, "Нормально" (normalno) = normal/bien, "Неплохо" (neplokho) = no mal.', category: 'Saludos' },
  { id: 15, phrase: 'Говорите медленнее, пожалуйста.', translit: 'Govorite medlennee, pozhaluysta.', phonetic: '[ga-va-RI-tye MYED-lye-nye-ye]', es: 'Habla más despacio, por favor.', note: '"Говорите" = hablen (imperativo formal usted). "Медленнее" (medlennee) = más despacio (comparativo de медленно). La doble Н se pronuncia larga. Alternativa: "Помедленнее, пожалуйста" (más corta y natural).', category: 'Ayuda' },
  { id: 16, phrase: 'Я хочу есть / пить.', translit: 'Ya khochu yest\' / pit\'.', phonetic: '[ya kha-CHOO yest\' / pit\']', es: 'Quiero comer / beber.', note: '"Я хочу" (ya khochu) = yo quiero (de хотеть = querer). "Есть" (yest\') = comer. "Пить" (pit\') = beber. El signo blando ь suaviza la consonante final. "Я хочу есть!" = ¡Tengo hambre! (lit. quiero comer).', category: 'Supervivencia' },
  { id: 17, phrase: 'Извините / Простите.', translit: 'Izvinite / Prostite.', phonetic: '[iz-vi-NI-tye] / [pras-TI-tye]', es: 'Perdón / Lo siento.', note: '"Извините" (izvinite) = disculpe (para interrumpir, pasar). "Простите" (prostite) = perdone (para errores más serios). Informal: "Извини" / "Прости" (sin -те). La И final se pronuncia [tye].', category: 'Cortesía' },
  { id: 18, phrase: 'Хорошо! / Ладно!', translit: 'Khorosho! / Ladno!', phonetic: '[kha-ra-SHO] / [LAD-na]', es: '¡Está bien! / ¡De acuerdo!', note: '"Хорошо" = bien/OK. "Ладно" (ladno) = de acuerdo, vale (más informal/coloquial). "Договорились" (dogovorilis\') = acordado/trato. Usar "хорошо" o "ладно" es perfecto para A1.', category: 'Cortesía' },
  { id: 19, phrase: 'Во сколько...?', translit: 'Vo skol\'ko...?', phonetic: '[va SKOL\'-ka]', es: '¿A qué hora...?', note: '"Во сколько" = ¿a qué hora? Ejemplo: "Во сколько открывается музей?" (¿A qué hora abre el museo?). Para decir la hora: "В час" (v chas) = a la una; "В два часа" = a las dos. В + время (tiempo).', category: 'Supervivencia' },
  { id: 20, phrase: 'Можно мне ___, пожалуйста?', translit: 'Mozhno mne ___, pozhaluysta?', phonetic: '[MOZH-na mnye]', es: '¿Me puede dar ___, por favor?', note: '"Можно мне" = ¿puedo tener? / ¿me puede dar?. Ejemplo: "Можно мне воду?" (¿me puede dar agua?). "Можно" es el equivalente ruso de "may I" — muy educado para pedir cosas en restaurantes y tiendas.', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Saludos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaRusoA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/ruso/a1"
      hubLabel="🇷🇺 Ruso A1"
      eyebrow="Разговор · Ruso A1"
      title="Frases esenciales"
      lead={<>12 frases en cirílico + transliteración + pronunciación. Cada frase se muestra en los 3 sistemas: <strong style={{ color: 'var(--ink)' }}>Cirílico · Transliteración · Fonética</strong>.</>}
      categories={CATEGORIES.slice(1)}
      completionTitle="Отлично! Practicaste todas las frases."
      completionBody="Ya tienes las bases para una conversación A1 en ruso."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          script: p.translit,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
    />
  )
}
