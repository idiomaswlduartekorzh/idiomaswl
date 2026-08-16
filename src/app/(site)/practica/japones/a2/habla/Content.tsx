import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase {
  id: number; phrase: string; romaji: string; phonetic: string; es: string;
  note: string; category: string;
}

const PHRASES: Phrase[] = [
  { id: 1, phrase: '私は～と思います。', romaji: 'Watashi wa ~ to omoimasu.', phonetic: '[wa-ta-shi wa ~ to o-moi-ma-su]', es: 'Creo que... / Pienso que...', note: 'La forma más natural para dar opiniones en japonés educado. El verbo de opinión siempre va AL FINAL de la oración. Versión informal: 「～と思う」(to omou). No confundir con ～と言います (decir).', category: 'Opiniones' },
  { id: 2, phrase: '～のほうが好きです。', romaji: '~ no hō ga suki desu.', phonetic: '[~ no hoo ga su-ki de-su]', es: 'Prefiero... / Me gusta más...', note: 'Para expresar preferencia entre dos cosas: 「猫より犬のほうが好きです」= Prefiero los perros a los gatos. La cosa preferida + のほうが. Informal: ～のほうが好き.', category: 'Opiniones' },
  { id: 3, phrase: '～はどうだと思いますか？', romaji: '~ wa dō da to omoimasu ka?', phonetic: '[~ wa doo da to o-moi-ma-su ka]', es: '¿Qué piensa/piensas de...?', note: 'Manera educada de pedir una opinión. Puedes sustituir どう (cómo/qué tal) por 何 (qué). Informal: 「～はどうだと思う？」Seguir con 「私は...と思います」para responder.', category: 'Opiniones' },
  { id: 4, phrase: 'もう一度おっしゃっていただけますか？', romaji: 'Mō ichido osshatte itadakemasu ka?', phonetic: '[moo i-chi-do o-sha-tte i-ta-da-ke-ma-su ka]', es: '¿Podría repetir, por favor? (formal)', note: 'Forma muy educada. おっしゃる = decir (keigo/lenguaje honorífico). Versión informal: 「もう一度言って」(Mō ichido itte). Puedes añadir 「すみません」(sumimasen) antes para suavizar.', category: 'Comprensión' },
  { id: 5, phrase: 'ゆっくり話してもらえますか？', romaji: 'Yukkuri hanashite moraemasu ka?', phonetic: '[yuk-ku-ri ha-na-shi-te mo-ra-e-ma-su ka]', es: '¿Podría hablar más despacio?', note: 'ゆっくり = despacio/lentamente. 話してもらえますか = ¿podría hablar? (te-form + もらえますか). Clave para principiantes — los japoneses apreciarán el esfuerzo por comunicarse.', category: 'Comprensión' },
  { id: 6, phrase: '～はどういう意味ですか？', romaji: '~ wa dō iu imi desu ka?', phonetic: '[~ wa doo i-u i-mi de-su ka]', es: '¿Qué significa...?', note: 'どういう意味 = qué significado. Puedes señalar la palabra o decirla. Alternativa: 「～って何ですか？」(informal, ¿qué es ~?). Extremadamente útil en conversación real.', category: 'Comprensión' },
  { id: 7, phrase: '～まではどうやって行けますか？', romaji: '~ made wa dō yatte ikemasu ka?', phonetic: '[~ ma-de wa doo ya-tte i-ke-ma-su ka]', es: '¿Cómo puedo llegar a...?', note: 'どうやって = ¿de qué manera/cómo? いけますか = ¿puedo ir? Se usa con estaciones, barrios, edificios. Alternativamente: 「～はどこですか？」(¿Dónde está ~?) para ubicaciones.', category: 'Viajes' },
  { id: 8, phrase: '～へのチケットをください。', romaji: '~ e no chiketto o kudasai.', phonetic: '[~ e no chi-ke-tto o ku-da-sa-i]', es: 'Deme un billete para..., por favor.', note: 'へ = partícula de dirección (hacia). チケット o 切符 (kippu) = billete/ticket. Para reservar: 「～を予約したいのですが」(Quería reservar ~). En taquillas y estaciones.', category: 'Viajes' },
  { id: 9, phrase: '部屋を予約したいのですが。', romaji: 'Heya o yoyaku shitai no desu ga.', phonetic: '[he-ya o yo-ya-ku shi-ta-i no de-su ga]', es: 'Quisiera reservar una habitación.', note: 'のですが al final suaviza la petición — muy educado. 予約する = reservar. Para número de noches: 「～泊お願いします」(~ haku onegai shimasu). ～泊 (~ noches) es el contador de noches.', category: 'Viajes' },
  { id: 10, phrase: '何時に開きますか / 閉まりますか？', romaji: 'Nanji ni akimasu ka / shimarimasu ka?', phonetic: '[nan-ji ni a-ki-ma-su ka / shi-ma-ri-ma-su ka]', es: '¿A qué hora abre / cierra?', note: '開く (aku) = abrir / 閉まる (shimaru) = cerrar. Para preguntar si está abierto ahora: 「今、開いていますか？」(Ima, aite imasu ka?). Imprescindible para museos, tiendas, restaurantes.', category: 'Viajes' },
  { id: 11, phrase: '～として約～年間働いています。', romaji: '~ toshite yaku ~-nen-kan hataraite imasu.', phonetic: '[~ to-shi-te ya-ku ~-nen-kan ha-ta-ra-i-te i-ma-su]', es: 'Trabajo como ~ desde hace aproximadamente ~ años.', note: 'として = como (función/rol). 約 (yaku) = aproximadamente. 年間 (nen-kan) = por ~ años. 働いています usa ～ています para estado continuo. Para meses: 約～ヶ月 (yaku ~ kagetsu).', category: 'Trabajo' },
  { id: 12, phrase: '～ことができます。', romaji: '~ koto ga dekimasu.', phonetic: '[~ ko-to ga de-ki-ma-su]', es: 'Sé / Puedo... (habilidad)', note: 'La estructura clave para expresar habilidades: diccionario + ことができます. Ejemplo: 「日本語を話すことができます」(puedo hablar japonés). Informal: ～できる. Negativo: ～ことができません.', category: 'Trabajo' },
  { id: 13, phrase: '私の担当は～です。', romaji: 'Watashi no tantō wa ~ desu.', phonetic: '[wa-ta-shi no tan-too wa ~ de-su]', es: 'Soy responsable de... / Mi área es...', note: '担当 (tantō) = responsabilidad/área a cargo. En entrevistas: 「主に～を担当しています」(principalmente me encargo de ~). 担当者 = persona responsable/encargado.', category: 'Trabajo' },
  { id: 14, phrase: '～より～のほうが～です。', romaji: '~ yori ~ no hō ga ~ desu.', phonetic: '[~ yo-ri ~ no hoo ga ~ de-su]', es: '... es más ... que ...', note: 'La estructura comparativa de superioridad: A より B のほうが + adjetivo. Ejemplo: 「東京より大阪のほうが安いです」(Osaka es más barato que Tokyo). Para superlativo: ～が一番 + adj (el/la más...).', category: 'Descripción' },
  { id: 15, phrase: '～は～と同じくらいです。', romaji: '~ wa ~ to onaji kurai desu.', phonetic: '[~ wa ~ to o-na-ji ku-ra-i de-su]', es: '... es tan ... como ...', note: 'Comparativo de igualdad: A は B と 同じくらい (igualmente). Para adjetivos: 「この映画はあの映画と同じくらい面白いです」. También: Aと同じです (es igual a A) para identidad total.', category: 'Descripción' },
  { id: 16, phrase: '～はどんな人ですか？', romaji: '~ wa donna hito desu ka?', phonetic: '[~ wa don-na hi-to de-su ka]', es: '¿Cómo es ~ ? (descripción de persona)', note: 'どんな = qué tipo de (descriptivo). Para cosas: どんな + sustantivo. Para pedir descripción física: 「どんな見た目ですか？」(¿Qué aspecto tiene?). Responder: 「～な人です」(Es una persona ~).', category: 'Descripción' },
  { id: 17, phrase: '子どもの頃、よく～ていました。', romaji: 'Kodomo no koro, yoku ~ te imashita.', phonetic: '[ko-do-mo no ko-ro, yo-ku ~ te i-ma-shi-ta]', es: 'De niño/a, solía... frecuentemente.', note: '子どもの頃 = cuando era niño/a. よく = frecuentemente/a menudo. ～ていました = estado/hábito pasado (imperfecto). Ejemplo: 「子どもの頃、よく公園で遊んでいました」(De niño, solía jugar en el parque).', category: 'Social' },
  { id: 18, phrase: 'お久しぶりですね！', romaji: 'Ohisashiburi desu ne!', phonetic: '[o-hi-sa-shi-bu-ri de-su ne]', es: '¡Cuánto tiempo sin verte!', note: 'Se usa cuando no has visto a alguien en mucho tiempo (semanas/meses). ね es partícula de búsqueda de acuerdo/confirmación. Respuesta natural: 「そうですね、お元気でしたか？」(Sí, ¿cómo ha estado?). Informal: 「久しぶり！」', category: 'Social' },
  { id: 19, phrase: '一緒に来ませんか？', romaji: 'Issho ni kimasen ka?', phonetic: '[is-sho ni ki-ma-sen ka]', es: '¿No quieres venir con nosotros?', note: 'Invitación educada usando la forma negativa (～ませんか) para suavizar. 一緒に = juntos. Alternativa más directa: 「一緒に来てください」(más imperativo). Para proponer: 「一緒に～しませんか？」(¿No hacemos ~ juntos?)', category: 'Social' },
  { id: 20, phrase: 'またいつか会いましょう！', romaji: 'Mata itsuka aimashō!', phonetic: '[ma-ta i-tsu-ka a-i-ma-shoo]', es: '¡Nos vemos algún día!', note: 'Despedida cálida pero indefinida. Más específico: 「また今度ね」(mata kondo ne = hasta la próxima) o 「また来週」(mata raishū = hasta la semana que viene). ～しましょう = vamos a ~ / ¡hagamos ~!', category: 'Social' },
];

const CATEGORIES = ['Todos', 'Opiniones', 'Comprensión', 'Viajes', 'Trabajo', 'Descripción', 'Social'];

export default function HablaJaponesA2() {
  return (
    <SpeakingPractice
      hubHref="/practica/japones/a2"
      hubLabel="🇯🇵 Japonés A2"
      eyebrow="話す (Hanasu) · Japonés A2"
      title="Expresión oral A2"
      lead="20 frases esenciales con romaji, pronunciación y contexto. Practica en voz alta y marca las que domines."
      categories={CATEGORIES.slice(1)}
      noteHeading="Nota de uso y pronunciación"
      doneLabel="Dominada"
      todoLabel="Lo logré"
      completionTitle="¡Completaste las 20 frases!"
      completionBody="Úsalas en una conversación real — aplícalas en tu próxima clase con David o Zhanna."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.phrase,
          script: p.romaji,
          phonetic: p.phonetic,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
      tip={
        <>
          🎯 <strong>Cómo practicar:</strong> Lee el romaji en silencio → dilo en voz alta 3 veces → si sale bien, marca ✓. Si no, déjalo sin marcar y vuelve después.
        </>
      }
    />
  )
}
