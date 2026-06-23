'use client';

import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#e11d48';

interface Word { word: string; romaji: string; es: string; emoji: string; example: string; exampleRomaji: string; exampleEs: string; }
interface VocabSet { id: string; name: string; nameJa: string; icon: string; words: Word[]; }

const SETS: VocabSet[] = [
  {
    id: 'ryokou', name: 'Viajes y transporte', nameJa: '旅行と交通', icon: '✈️',
    words: [
      { word: '切符', romaji: 'kippu', es: 'tiquete / billete', emoji: '🎫', example: '切符を二枚買いました。', exampleRomaji: 'Kippu o nimai kaimashita.', exampleEs: 'Compré dos tiquetes.' },
      { word: 'パスポート', romaji: 'pasupōto', es: 'pasaporte', emoji: '📕', example: 'パスポートを忘れないでください。', exampleRomaji: 'Pasupōto o wasurenaide kudasai.', exampleEs: 'Por favor no olvide su pasaporte.' },
      { word: '荷物', romaji: 'nimotsu', es: 'equipaje', emoji: '🧳', example: '荷物が重すぎます。', exampleRomaji: 'Nimotsu ga omosugimasu.', exampleEs: 'El equipaje es demasiado pesado.' },
      { word: '税関', romaji: 'zeikan', es: 'aduana', emoji: '🛃', example: '税関を通らなければなりません。', exampleRomaji: 'Zeikan o toranakere ba narimasen.', exampleEs: 'Tenemos que pasar por la aduana.' },
      { word: '搭乗口', romaji: 'tōjōguchi', es: 'puerta de embarque', emoji: '🚪', example: '搭乗口はどこですか？', exampleRomaji: 'Tōjōguchi wa doko desu ka?', exampleEs: '¿Dónde está la puerta de embarque?' },
      { word: '目的地', romaji: 'mokutekichi', es: 'destino', emoji: '📍', example: '目的地は東京です。', exampleRomaji: 'Mokutekichi wa Tōkyō desu.', exampleEs: 'El destino es Tokio.' },
      { word: '出発', romaji: 'shuppatsu', es: 'salida / partida', emoji: '🚀', example: '出発は朝八時です。', exampleRomaji: 'Shuppatsu wa asa hachiji desu.', exampleEs: 'La salida es a las ocho de la mañana.' },
      { word: '到着', romaji: 'tōchaku', es: 'llegada', emoji: '🛬', example: '到着は午後三時です。', exampleRomaji: 'Tōchaku wa gogo sanji desu.', exampleEs: 'La llegada es a las tres de la tarde.' },
      { word: '乗り換え', romaji: 'norikae', es: 'transbordo / cambio de tren', emoji: '🔄', example: '大阪で乗り換えてください。', exampleRomaji: 'Ōsaka de norikaete kudasai.', exampleEs: 'Por favor haga el transbordo en Osaka.' },
      { word: '予約', romaji: 'yoyaku', es: 'reserva', emoji: '📋', example: 'ホテルを予約しました。', exampleRomaji: 'Hoteru o yoyaku shimashita.', exampleEs: 'Hice una reserva en el hotel.' },
    ],
  },
  {
    id: 'shigoto', name: 'Trabajo y carrera', nameJa: '仕事とキャリア', icon: '💼',
    words: [
      { word: '給料', romaji: 'kyūryō', es: 'salario', emoji: '💰', example: '給料が上がりました。', exampleRomaji: 'Kyūryō ga agarimashita.', exampleEs: 'El salario subió.' },
      { word: '同僚', romaji: 'dōryō', es: 'colega / compañero de trabajo', emoji: '🤝', example: '同僚はみんな親切です。', exampleRomaji: 'Dōryō wa minna shinsetsu desu.', exampleEs: 'Todos mis colegas son amables.' },
      { word: '上司', romaji: 'jōshi', es: 'jefe / jefa', emoji: '👔', example: '上司に報告しました。', exampleRomaji: 'Jōshi ni hōkoku shimashita.', exampleEs: 'Le informé a mi jefa.' },
      { word: '締め切り', romaji: 'shimekiri', es: 'fecha límite / plazo', emoji: '⏰', example: '締め切りは明日です。', exampleRomaji: 'Shimekiri wa ashita desu.', exampleEs: 'La fecha límite es mañana.' },
      { word: '会議', romaji: 'kaigi', es: 'reunión', emoji: '📋', example: '午後に会議があります。', exampleRomaji: 'Gogo ni kaigi ga arimasu.', exampleEs: 'Hay una reunión en la tarde.' },
      { word: '昇進', romaji: 'shōshin', es: 'ascenso', emoji: '⬆️', example: '来月、昇進します。', exampleRomaji: 'Raigetsu, shōshin shimasu.', exampleEs: 'El mes que viene me ascienden.' },
      { word: '辞める', romaji: 'yameru', es: 'renunciar / dejar el trabajo', emoji: '🚪', example: '彼女は仕事を辞めました。', exampleRomaji: 'Kanojo wa shigoto o yamemashita.', exampleEs: 'Ella renunció a su trabajo.' },
      { word: '採用する', romaji: 'saiyō suru', es: 'contratar', emoji: '📝', example: '会社は十人採用しました。', exampleRomaji: 'Kaisha wa jūnin saiyō shimashita.', exampleEs: 'La empresa contrató a diez personas.' },
      { word: '残業', romaji: 'zangyō', es: 'horas extra', emoji: '⌚', example: '今週はずっと残業しています。', exampleRomaji: 'Konshū wa zutto zangyō shite imasu.', exampleEs: 'Esta semana he estado haciendo horas extra todo el tiempo.' },
      { word: '仕事を探す', romaji: 'shigoto o sagasu', es: 'buscar trabajo', emoji: '🔍', example: '新しい仕事を探しています。', exampleRomaji: 'Atarashii shigoto o sagashite imasu.', exampleEs: 'Estoy buscando un nuevo trabajo.' },
    ],
  },
  {
    id: 'kaimono', name: 'Compras y dinero', nameJa: '買い物とお金', icon: '🛍️',
    words: [
      { word: 'レシート', romaji: 'reshīto', es: 'recibo', emoji: '🧾', example: 'レシートを保管してください。', exampleRomaji: 'Reshīto o hokan shite kudasai.', exampleEs: 'Por favor guarde el recibo.' },
      { word: '割引', romaji: 'waribiki', es: 'descuento', emoji: '🏷️', example: '今日は二十パーセント割引です。', exampleRomaji: 'Kyō wa nijuppāsento waribiki desu.', exampleEs: 'Hoy hay un descuento del veinte por ciento.' },
      { word: '返金', romaji: 'henkin', es: 'reembolso', emoji: '↩️', example: '返金をお願いしました。', exampleRomaji: 'Henkin o onegai shimashita.', exampleEs: 'Pedí un reembolso.' },
      { word: 'お得', romaji: 'otoku', es: 'ganga / oferta', emoji: '🤑', example: 'これはお得ですね！', exampleRomaji: 'Kore wa otoku desu ne!', exampleEs: '¡Esto es una ganga!' },
      { word: '現金', romaji: 'genkin', es: 'efectivo', emoji: '💵', example: '現金で払います。', exampleRomaji: 'Genkin de haraimasu.', exampleEs: 'Pago en efectivo.' },
      { word: 'クレジットカード', romaji: 'kurejitto kādo', es: 'tarjeta de crédito', emoji: '💳', example: 'クレジットカードは使えますか？', exampleRomaji: 'Kurejitto kādo wa tsukaemasu ka?', exampleEs: '¿Se puede usar tarjeta de crédito?' },
      { word: 'おつり', romaji: 'otsuri', es: 'cambio / vuelta', emoji: '🪙', example: 'おつりは百円です。', exampleRomaji: 'Otsuri wa hyakuen desu.', exampleEs: 'El cambio es cien yenes.' },
      { word: '値段', romaji: 'nedan', es: 'precio', emoji: '🔢', example: 'この値段は高すぎます。', exampleRomaji: 'Kono nedan wa takasugimasu.', exampleEs: 'Este precio es demasiado alto.' },
      { word: 'セール', romaji: 'sēru', es: 'rebajas / liquidación', emoji: '📢', example: 'デパートでセールをしています。', exampleRomaji: 'Depāto de sēru o shite imasu.', exampleEs: 'El almacén está haciendo rebajas.' },
      { word: '値札', romaji: 'nefuda', es: 'etiqueta de precio', emoji: '🏷️', example: '値札には三千円と書いてあります。', exampleRomaji: 'Nefuda ni wa sanzen en to kaite arimasu.', exampleEs: 'En la etiqueta dice tres mil yenes.' },
    ],
  },
  {
    id: 'kenkou', name: 'Salud y cuerpo', nameJa: '健康と体', icon: '🏥',
    words: [
      { word: '頭痛', romaji: 'zutsū', es: 'dolor de cabeza', emoji: '🤕', example: 'ひどい頭痛がします。', exampleRomaji: 'Hidoi zutsū ga shimasu.', exampleEs: 'Tengo un terrible dolor de cabeza.' },
      { word: '熱', romaji: 'netsu', es: 'fiebre', emoji: '🌡️', example: '三十九度の熱があります。', exampleRomaji: 'Sanjūkyūdo no netsu ga arimasu.', exampleEs: 'Tengo fiebre de treinta y nueve grados.' },
      { word: '処方箋', romaji: 'shohōsen', es: 'receta médica', emoji: '📋', example: '医者に処方箋をもらいました。', exampleRomaji: 'Isha ni shohōsen o moraimashita.', exampleEs: 'El médico me dio una receta.' },
      { word: '薬局', romaji: 'yakkyoku', es: 'farmacia', emoji: '💊', example: '薬局は夜八時まで開いています。', exampleRomaji: 'Yakkyoku wa yoru hachiji made aite imasu.', exampleEs: 'La farmacia está abierta hasta las ocho de la noche.' },
      { word: '症状', romaji: 'shōjō', es: 'síntoma', emoji: '🔍', example: '症状はどうですか？', exampleRomaji: 'Shōjō wa dō desu ka?', exampleEs: '¿Cómo están sus síntomas?' },
      { word: '診察', romaji: 'shinsatsu', es: 'consulta médica', emoji: '📅', example: '明日、診察があります。', exampleRomaji: 'Ashita, shinsatsu ga arimasu.', exampleEs: 'Mañana tengo consulta médica.' },
      { word: '外科医', romaji: 'gekai', es: 'cirujano / cirujana', emoji: '🔬', example: '外科医が明日手術します。', exampleRomaji: 'Gekai ga ashita shujutsu shimasu.', exampleEs: 'El cirujano opera mañana.' },
      { word: '回復する', romaji: 'kaifuku suru', es: 'recuperarse', emoji: '💪', example: '二週間で回復しました。', exampleRomaji: 'Nishūkan de kaifuku shimashita.', exampleEs: 'Me recuperé en dos semanas.' },
      { word: 'アレルギー', romaji: 'arerugī', es: 'alergia', emoji: '🤧', example: 'ピーナッツのアレルギーがあります。', exampleRomaji: 'Pīnattsu no arerugī ga arimasu.', exampleEs: 'Soy alérgico/a a los maníes.' },
      { word: '注射', romaji: 'chūsha', es: 'inyección', emoji: '💉', example: '医者に注射をされました。', exampleRomaji: 'Isha ni chūsha o saremashita.', exampleEs: 'El médico me puso una inyección.' },
    ],
  },
  {
    id: 'seikaku', name: 'Describir personas', nameJa: '性格と人柄', icon: '👤',
    words: [
      { word: '自信がある', romaji: 'jishin ga aru', es: 'seguro/a de sí mismo/a', emoji: '😎', example: '彼女は人前でとても自信があります。', exampleRomaji: 'Kanojo wa hitomae de totemo jishin ga arimasu.', exampleEs: 'Ella es muy segura en público.' },
      { word: '野心的', romaji: 'yashinteki', es: 'ambicioso/a', emoji: '🚀', example: '新しい同僚はとても野心的です。', exampleRomaji: 'Atarashii dōryō wa totemo yashinteki desu.', exampleEs: 'El nuevo colega es muy ambicioso.' },
      { word: '信頼できる', romaji: 'shinrai dekiru', es: 'confiable / de confianza', emoji: '🤝', example: '彼は信頼できる人です。', exampleRomaji: 'Kare wa shinrai dekiru hito desu.', exampleEs: 'Él es una persona confiable.' },
      { word: '頑固な', romaji: 'ganko na', es: 'terco/a', emoji: '🐂', example: '彼は頑固で意見を変えません。', exampleRomaji: 'Kare wa ganko de iken o kaemasen.', exampleEs: 'Él es terco y no cambia de opinión.' },
      { word: '寛大な', romaji: 'kandai na', es: 'generoso/a', emoji: '🎁', example: '彼女は友達にとても寛大です。', exampleRomaji: 'Kanojo wa tomodachi ni totemo kandai desu.', exampleEs: 'Ella es muy generosa con sus amigos.' },
      { word: '辛抱強い', romaji: 'shinbō zuyoi', es: 'paciente', emoji: '⏳', example: '良い先生は辛抱強くなければなりません。', exampleRomaji: 'Yoi sensei wa shinbō zuyoku nakereba narimasen.', exampleEs: 'Un buen maestro debe ser paciente.' },
      { word: '好奇心旺盛', romaji: 'kōkishin ōsei', es: 'curioso/a', emoji: '🔭', example: '子供はみんな好奇心旺盛です。', exampleRomaji: 'Kodomo wa minna kōkishin ōsei desu.', exampleEs: 'Todos los niños son curiosos.' },
      { word: '内気な', romaji: 'uchiki na', es: 'tímido/a', emoji: '🙈', example: '彼は最初は内気でした。', exampleRomaji: 'Kare wa saisho wa uchiki deshita.', exampleEs: 'Él era tímido al principio.' },
      { word: '社交的', romaji: 'shakōteki', es: 'sociable', emoji: '🎉', example: '彼女はとても社交的で友達がたくさんいます。', exampleRomaji: 'Kanojo wa totemo shakōteki de tomodachi ga takusan imasu.', exampleEs: 'Ella es muy sociable y tiene muchos amigos.' },
      { word: '正直な', romaji: 'shōjiki na', es: 'honesto/a', emoji: '✅', example: '正直な人は信頼できます。', exampleRomaji: 'Shōjiki na hito wa shinrai dekimasu.', exampleEs: 'Una persona honesta es confiable.' },
    ],
  },
  {
    id: 'ie', name: 'Casa y hogar', nameJa: '家と住まい', icon: '🏠',
    words: [
      { word: 'アパート', romaji: 'apāto', es: 'apartamento', emoji: '🏢', example: '駅の近くにアパートを借りました。', exampleRomaji: 'Eki no chikaku ni apāto o karimashita.', exampleEs: 'Alquilé un apartamento cerca de la estación.' },
      { word: '家賃', romaji: 'yachin', es: 'alquiler (mensual)', emoji: '💴', example: '家賃は月七万円です。', exampleRomaji: 'Yachin wa tsuki nanaman en desu.', exampleEs: 'El alquiler es de setenta mil yenes al mes.' },
      { word: '大家', romaji: 'ōya', es: 'dueño/a del inmueble', emoji: '🔑', example: '大家さんはとても親切です。', exampleRomaji: 'Ōya-san wa totemo shinsetsu desu.', exampleEs: 'El dueño del inmueble es muy amable.' },
      { word: '入居者', romaji: 'nyūkyosha', es: 'inquilino/a', emoji: '🏠', example: '新しい入居者が今日来ます。', exampleRomaji: 'Atarashii nyūkyosha ga kyō kimasu.', exampleEs: 'El nuevo inquilino viene hoy.' },
      { word: '家具', romaji: 'kagu', es: 'muebles', emoji: '🛋️', example: '家具付きのアパートを探しています。', exampleRomaji: 'Kagu tsuki no apāto o sagashite imasu.', exampleEs: 'Estoy buscando un apartamento con muebles.' },
      { word: 'マンション', romaji: 'manshon', es: 'condominio / apartamento grande', emoji: '🏙️', example: '彼女は高級マンションに住んでいます。', exampleRomaji: 'Kanojo wa kōkyū manshon ni sunde imasu.', exampleEs: 'Ella vive en un condominio de lujo.' },
      { word: '引っ越し', romaji: 'hikkoshi', es: 'mudanza', emoji: '📦', example: '来月引っ越しをします。', exampleRomaji: 'Raigetsu hikkoshi o shimasu.', exampleEs: 'El mes que viene hago la mudanza.' },
      { word: '内装する', romaji: 'naisō suru', es: 'amueblar / decorar el interior', emoji: '🎨', example: '新しい部屋を内装しました。', exampleRomaji: 'Atarashii heya o naisō shimashita.', exampleEs: 'Amueblé la nueva habitación.' },
      { word: '光熱費', romaji: 'kōnetsubi', es: 'facturas de servicios (agua/luz/gas)', emoji: '💡', example: '冬は光熱費が高くなります。', exampleRomaji: 'Fuyu wa kōnetsubi ga takaku narimasu.', exampleEs: 'En invierno las facturas de servicios suben.' },
      { word: '改装する', romaji: 'kaisō suru', es: 'renovar', emoji: '🔨', example: 'キッチンを改装しました。', exampleRomaji: 'Kitchin o kaisō shimashita.', exampleEs: 'Renovamos la cocina.' },
    ],
  },
  {
    id: 'tekunoloji', name: 'Tecnología', nameJa: 'テクノロジー', icon: '💻',
    words: [
      { word: 'ダウンロードする', romaji: 'daunrōdo suru', es: 'descargar', emoji: '⬇️', example: 'アプリをダウンロードしました。', exampleRomaji: 'Apuri o daunrōdo shimashita.', exampleEs: 'Descargué la aplicación.' },
      { word: 'アップロードする', romaji: 'appurōdo suru', es: 'subir / cargar (a internet)', emoji: '⬆️', example: '写真をアップロードしてください。', exampleRomaji: 'Shashin o appurōdo shite kudasai.', exampleEs: 'Por favor suba las fotos.' },
      { word: '接続する', romaji: 'setsuzoku suru', es: 'conectarse', emoji: '📶', example: 'Wi-Fiに接続できません。', exampleRomaji: 'Waifai ni setsuzoku dekimasen.', exampleEs: 'No me puedo conectar al Wi-Fi.' },
      { word: 'デバイス', romaji: 'debaisu', es: 'dispositivo', emoji: '📱', example: '新しいデバイスを買いました。', exampleRomaji: 'Atarashii debaisu o kaimashita.', exampleEs: 'Compré un nuevo dispositivo.' },
      { word: 'アプリ', romaji: 'apuri', es: 'aplicación', emoji: '📲', example: '日本語のアプリを使っています。', exampleRomaji: 'Nihongo no apuri o tsukatte imasu.', exampleEs: 'Estoy usando una aplicación de japonés.' },
      { word: '更新する', romaji: 'kōshin suru', es: 'actualizar', emoji: '🔄', example: 'ソフトウェアを更新しなければなりません。', exampleRomaji: 'Sofutowea o kōshin shinakereba narimasen.', exampleEs: 'Debo actualizar el software.' },
      { word: 'パスワード', romaji: 'pasuwādo', es: 'contraseña', emoji: '🔑', example: 'パスワードを忘れました。', exampleRomaji: 'Pasuwādo o wasuremashita.', exampleEs: 'Olvidé la contraseña.' },
      { word: '共有する', romaji: 'kyōyū suru', es: 'compartir', emoji: '📤', example: 'ファイルを共有してもいいですか？', exampleRomaji: 'Fairu o kyōyū shite mo ii desu ka?', exampleEs: '¿Está bien si comparto el archivo?' },
      { word: 'プロフィール', romaji: 'purofīru', es: 'perfil', emoji: '👤', example: 'プロフィールを更新しました。', exampleRomaji: 'Purofīru o kōshin shimashita.', exampleEs: 'Actualicé mi perfil.' },
      { word: '通知', romaji: 'tsūchi', es: 'notificación', emoji: '🔔', example: '通知をオフにしました。', exampleRomaji: 'Tsūchi o ofu ni shimashita.', exampleEs: 'Desactivé las notificaciones.' },
    ],
  },
  {
    id: 'shizen', name: 'Naturaleza y medio ambiente', nameJa: '自然と環境', icon: '🌿',
    words: [
      { word: '景色', romaji: 'keshiki', es: 'paisaje / vista', emoji: '🏞️', example: '山からの景色はとてもきれいです。', exampleRomaji: 'Yama kara no keshiki wa totemo kirei desu.', exampleEs: 'El paisaje desde la montaña es muy bonito.' },
      { word: '森', romaji: 'mori', es: 'bosque', emoji: '🌲', example: '森の中を散歩しました。', exampleRomaji: 'Mori no naka o sanpo shimashita.', exampleEs: 'Di un paseo por el bosque.' },
      { word: '滝', romaji: 'taki', es: 'cascada', emoji: '💧', example: '有名な滝を見に行きたいです。', exampleRomaji: 'Yūmei na taki o mi ni ikitai desu.', exampleEs: 'Quiero ir a ver la cascada famosa.' },
      { word: '汚染', romaji: 'osen', es: 'contaminación', emoji: '🏭', example: '空気の汚染は大きな問題です。', exampleRomaji: 'Kūki no osen wa ōkina mondai desu.', exampleEs: 'La contaminación del aire es un gran problema.' },
      { word: 'リサイクル', romaji: 'risaikuru', es: 'reciclar', emoji: '♻️', example: 'ガラスと紙をリサイクルしなければなりません。', exampleRomaji: 'Garasu to kami o risaikuru shinakereba narimasen.', exampleEs: 'Debemos reciclar el vidrio y el papel.' },
      { word: '節約する', romaji: 'setsuyaku suru', es: 'ahorrar (recursos)', emoji: '💚', example: '電気を節約することができます。', exampleRomaji: 'Denki o setsuyaku suru koto ga dekimasu.', exampleEs: 'Podemos ahorrar electricidad.' },
      { word: '気候', romaji: 'kikō', es: 'clima', emoji: '🌍', example: '気候変動は世界的な問題です。', exampleRomaji: 'Kikō hendō wa sekaiteki na mondai desu.', exampleEs: 'El cambio climático es un problema mundial.' },
      { word: '干ばつ', romaji: 'kanbatsu', es: 'sequía', emoji: '🌵', example: 'この地域は干ばつに苦しんでいます。', exampleRomaji: 'Kono chiiki wa kanbatsu ni kurushinde imasu.', exampleEs: 'Esta región está sufriendo una sequía.' },
      { word: '生物多様性', romaji: 'seibutsu tayōsei', es: 'biodiversidad', emoji: '🦁', example: '生物多様性を守ることが大切です。', exampleRomaji: 'Seibutsu tayōsei o mamoru koto ga taisetsu desu.', exampleEs: 'Es importante proteger la biodiversidad.' },
      { word: '火山', romaji: 'kazan', es: 'volcán', emoji: '🌋', example: '日本には活火山がたくさんあります。', exampleRomaji: 'Nihon ni wa kakkazan ga takusan arimasu.', exampleEs: 'En Japón hay muchos volcanes activos.' },
    ],
  },
];

type PracticeMode = 'flashcard' | 'mcq' | 'fillblank';

function shuffle<T>(arr: T[]): T[] { return [...arr].sort(() => Math.random() - 0.5); }

function Flashcard({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);

  if (idx >= words.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎴</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>¡Mazo completado!</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginBottom: '1.25rem' }}>{known}/{words.length} palabras marcadas como conocidas.</p>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setFlipped(false); setKnown(0); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir mazo</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = words[idx];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem' }}>
      <div style={{ fontSize: '0.78rem', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>{idx + 1}/{words.length}</div>
      <div onClick={() => setFlipped(f => !f)} style={{ width: '100%', maxWidth: 400, minHeight: 200, cursor: 'pointer', borderRadius: 18, border: `2px solid ${flipped ? COLOR : 'var(--line-soft)'}`, background: flipped ? `${COLOR}08` : 'var(--bg)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.65rem', padding: '1.5rem', transition: 'all 0.3s', textAlign: 'center' }}>
        {!flipped ? (
          <>
            <div style={{ fontSize: '2.5rem' }}>{w.emoji}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
            <div style={{ fontSize: '0.85rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.1rem 0.5rem', borderRadius: 5, background: `${COLOR}15` }}>{w.romaji}</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Toca para ver</div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '1rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.word} · {w.romaji}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: COLOR }}>{w.es}</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--muted)', marginTop: '0.5rem', lineHeight: 1.5, borderTop: '1px solid var(--line-soft)', paddingTop: '0.5rem', width: '100%', textAlign: 'left' }}>
              <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
              <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaji}</span><br />
              <span>{w.exampleEs}</span>
            </div>
          </>
        )}
      </div>
      {flipped && (
        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button className="btn btn-sm" onClick={() => { setKnown(k => k + 1); setIdx(i => i + 1); setFlipped(false); }} style={{ background: COLOR, borderColor: COLOR }}>✓ La sé</button>
          <button className="btn btn-ghost btn-sm" onClick={() => { setIdx(i => i + 1); setFlipped(false); }}>Repasar →</button>
        </div>
      )}
    </div>
  );
}

function MCQPractice({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.8 ? '🏆' : '⭐'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const distractors = shuffle(shuffled.filter(x => x.word !== w.word)).slice(0, 3).map(x => x.es);
  const allOpts = shuffle([w.es, ...distractors]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--ink)' }}>{w.word}</div>
        <div style={{ fontSize: '0.82rem', fontFamily: 'var(--mono)', color: COLOR, fontWeight: 700, padding: '0.12rem 0.5rem', borderRadius: 5, background: `${COLOR}15`, display: 'inline-block', marginTop: '0.3rem' }}>{w.romaji}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)', textAlign: 'center' }}>¿Cuál es la traducción correcta?</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
        {allOpts.map((opt, i) => {
          const isCorrect = opt === w.es, isSel = answered !== null && allOpts[answered] === opt;
          let bg = 'var(--bg)', border = '1.5px solid var(--line-soft)', color = 'var(--ink)';
          if (answered !== null && isCorrect) { bg = 'rgba(5,150,105,0.1)'; border = '1.5px solid #059669'; color = '#059669'; }
          if (answered !== null && isSel && !isCorrect) { bg = 'rgba(220,38,38,0.1)'; border = '1.5px solid #dc2626'; color = '#dc2626'; }
          return (
            <button key={i} disabled={answered !== null} onClick={() => { setAnswered(i); if (isCorrect) setScore(s => s + 1); }}
              style={{ padding: '0.65rem 1rem', borderRadius: 10, border, background: bg, color, fontSize: '0.95rem', cursor: answered !== null ? 'default' : 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              {opt}
            </button>
          );
        })}
      </div>
      {answered !== null && (
        <div>
          <div style={{ padding: '0.65rem 0.9rem', borderRadius: 8, background: allOpts[answered] === w.es ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.82rem', color: 'var(--muted)', marginBottom: '0.65rem' }}>
            <span style={{ fontStyle: 'italic', color: 'var(--ink)' }}>{w.example}</span><br />
            <span style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaji}</span><br />
            <span>{w.exampleEs}</span>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setAnswered(null); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

function FillBlank({ words, onDone }: { words: Word[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState('');
  const [checked, setChecked] = useState(false);
  const [score, setScore] = useState(0);
  const shuffled = useState(() => shuffle(words))[0];

  if (idx >= shuffled.length) return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{score >= shuffled.length * 0.7 ? '🎉' : '📝'}</div>
      <h3 style={{ margin: '0 0 0.5rem', color: COLOR }}>{score}/{shuffled.length} correctas</h3>
      <div style={{ display: 'flex', gap: '0.65rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '1rem' }}>
        <button className="btn btn-sm" onClick={() => { setIdx(0); setScore(0); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>Repetir</button>
        <button className="btn btn-ghost btn-sm" onClick={onDone}>← Otros modos</button>
      </div>
    </div>
  );

  const w = shuffled[idx];
  const isCorrect = input.trim().toLowerCase() === w.romaji.toLowerCase() || input.trim() === w.word;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ padding: '1.25rem', borderRadius: 14, background: 'var(--bg-2)', border: '1px solid var(--line-soft)', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.3rem' }}>{w.emoji}</div>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: COLOR }}>{w.es}</div>
        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '0.25rem', fontStyle: 'italic' }}>{w.exampleEs}</div>
      </div>
      <p style={{ margin: 0, fontWeight: 600, color: 'var(--ink)' }}>Escribe el romaji (o kanji/kana) de la palabra:</p>
      <input value={input} onChange={e => setInput(e.target.value)} disabled={checked}
        placeholder="Romaji o japonés..."
        onKeyDown={e => { if (e.key === 'Enter' && input.trim() && !checked) { setChecked(true); if (isCorrect) setScore(s => s + 1); } }}
        style={{ padding: '0.7rem 1rem', borderRadius: 10, border: `1.5px solid ${checked ? (isCorrect ? '#059669' : '#dc2626') : 'var(--line-soft)'}`, background: 'var(--bg)', color: 'var(--ink)', fontSize: '1rem', fontFamily: 'inherit', outline: 'none' }} />
      {!checked && input.trim() && <button className="btn btn-sm" onClick={() => { setChecked(true); if (isCorrect) setScore(s => s + 1); }} style={{ background: COLOR, borderColor: COLOR }}>Verificar</button>}
      {checked && (
        <div>
          <div style={{ padding: '0.7rem 0.9rem', borderRadius: 9, background: isCorrect ? 'rgba(5,150,105,0.08)' : 'rgba(220,38,38,0.08)', fontSize: '0.88rem', marginBottom: '0.65rem' }}>
            {isCorrect ? '✅ ¡Correcto!' : `✗ La respuesta es: ${w.word} (${w.romaji})`}
            <div style={{ marginTop: '0.3rem', fontSize: '0.8rem', color: 'var(--muted)', fontStyle: 'italic' }}>{w.example}</div>
            <div style={{ fontSize: '0.75rem', color: COLOR }}>{w.exampleRomaji}</div>
          </div>
          <button className="btn btn-sm" onClick={() => { setIdx(i => i + 1); setInput(''); setChecked(false); }} style={{ background: COLOR, borderColor: COLOR }}>
            {idx < shuffled.length - 1 ? 'Siguiente →' : 'Ver resultado →'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularioJaponesA2() {
  const [setId, setSetId] = useState<string | null>(null);
  const [mode, setMode] = useState<PracticeMode | null>(null);

  const set = SETS.find(s => s.id === setId);

  if (set && mode) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 580 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <button onClick={() => setMode(null)} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', padding: 0, fontFamily: 'var(--mono)', fontSize: '0.82rem' }}>← {set.nameJa}</button>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>{mode === 'flashcard' ? '🎴 Flashcards' : mode === 'mcq' ? '🎯 Opción múltiple' : '✏️ Escribir'}</span>
        </div>
        {mode === 'flashcard' && <Flashcard words={set.words} onDone={() => setMode(null)} />}
        {mode === 'mcq' && <MCQPractice words={set.words} onDone={() => setMode(null)} />}
        {mode === 'fillblank' && <FillBlank words={set.words} onDone={() => setMode(null)} />}
      </div>
    </section>
  );

  if (set) return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 600 }}>
        <button onClick={() => setSetId(null)} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>← Vocabulario A2</button>
        <p className="eyebrow" style={{ marginBottom: '0.4rem' }}><span className="ink-line" />{set.icon} {set.nameJa}</p>
        <h2 style={{ fontSize: '1.75rem', margin: '0 0 0.25rem', fontWeight: 700 }}>{set.name}</h2>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem', margin: '0 0 1.5rem' }}>{set.words.length} palabras · Elige un modo de práctica</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {[
            { id: 'flashcard' as PracticeMode, icon: '🎴', title: 'Flashcards', desc: 'Ve cada palabra con kanji y romaji. Marca las que ya conoces.' },
            { id: 'mcq' as PracticeMode, icon: '🎯', title: 'Opción múltiple', desc: 'Elige la traducción correcta de 4 opciones.' },
            { id: 'fillblank' as PracticeMode, icon: '✏️', title: 'Escribir el romaji', desc: 'Escribe el romaji (o kanji) a partir de la traducción.' },
          ].map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.1rem 1.3rem', border: `1.5px solid ${COLOR}22`, borderRadius: 14, background: `${COLOR}04`, transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: COLOR, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>{m.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--ink)', marginBottom: '0.1rem' }}>{m.title}</div>
                  <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>{m.desc}</p>
                </div>
                <span style={{ color: COLOR, fontWeight: 700 }}>→</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ borderTop: '1px solid var(--line-soft)', paddingTop: '1.25rem' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 800, color: 'var(--muted)', fontFamily: 'var(--mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.65rem' }}>Vocabulario ({set.words.length} palabras)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px,1fr))', gap: '0.55rem' }}>
            {set.words.map(w => (
              <div key={w.word} style={{ padding: '0.55rem 0.7rem', borderRadius: 9, border: '1px solid var(--line-soft)', background: 'var(--bg)' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--ink)' }}>{w.emoji} {w.word}</div>
                <div style={{ fontSize: '0.7rem', fontFamily: 'var(--mono)', color: COLOR, marginTop: '0.1rem' }}>{w.romaji}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{w.es}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section className="wl-section">
      <div className="wrap" style={{ maxWidth: 780 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.82rem', fontFamily: 'var(--mono)', color: 'var(--muted)', flexWrap: 'wrap' }}>
          <Link href="/practica" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Práctica</Link>
          <span>/</span>
          <Link href="/practica/japones/a2" style={{ color: 'var(--muted)', textDecoration: 'none' }}>🇯🇵 Japonés A2</Link>
          <span>/</span>
          <span style={{ color: COLOR, fontWeight: 800 }}>📚 語彙</span>
        </div>
        <p className="eyebrow" style={{ marginBottom: '0.5rem' }}><span className="ink-line" />語彙 · Japonés A2</p>
        <h1 style={{ fontSize: '2rem', letterSpacing: '-0.03em', margin: '0 0 0.5rem', fontWeight: 700 }}>Vocabulario A2</h1>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', maxWidth: 520, margin: '0 0 2rem' }}>8 temas esenciales — 80 palabras con kanji, romaji y español. Flashcards, opción múltiple y escritura.</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.85rem' }}>
          {SETS.map(s => (
            <button key={s.id} onClick={() => setSetId(s.id)} style={{ textAlign: 'left', appearance: 'none', background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit', font: 'inherit' }}>
              <div style={{ padding: '1.25rem', border: `1.5px solid ${COLOR}22`, borderRadius: 16, background: `${COLOR}04`, height: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem', transition: 'all 0.18s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}55`; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 16px ${COLOR}14`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = `${COLOR}22`; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>
                <div style={{ fontSize: '1.75rem' }}>{s.icon}</div>
                <div style={{ fontWeight: 800, color: 'var(--ink)' }}>{s.nameJa}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{s.name} · {s.words.length} palabras</div>
                <div style={{ marginTop: 'auto', fontSize: '0.8rem', color: COLOR, fontWeight: 700 }}>Empezar →</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
