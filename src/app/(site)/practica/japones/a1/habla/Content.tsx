import SpeakingPractice from '@/components/practica/SpeakingPractice'

interface Phrase { id: number; japanese: string; romaji: string; es: string; note: string; category: string; }

const PHRASES: Phrase[] = [
  { id: 1, japanese: 'はじめまして。', romaji: 'Hajimemashite.', es: 'Mucho gusto. (al conocerse por primera vez)', note: '"はじめまして" se usa SOLO la primera vez que conoces a alguien. Literalmente "por primera vez". Siempre va seguido de tu nombre y "どうぞよろしく".', category: 'Presentación' },
  { id: 2, japanese: 'わたしは ___です。', romaji: 'Watashi wa ___ desu.', es: 'Soy / Me llamo ___', note: 'La estructura básica japonesa: [yo は] [nombre] [です]. Ejemplo: "わたしは マリアです" (Soy María). En conversación informal, "わたし" se puede omitir.', category: 'Presentación' },
  { id: 3, japanese: 'どうぞ よろしく おねがいします。', romaji: 'Douzo yoroshiku onegaishimasu.', es: 'Mucho gusto / encantado/a (pido su favor).', note: 'Frase de cierre de presentación. "よろしく" = favor/buena voluntad. Se usa también al pedir favores o al despedirse de un nuevo contacto. Más formal: どうぞよろしくおねがいします.', category: 'Presentación' },
  { id: 4, japanese: 'ありがとう ございます。', romaji: 'Arigatou gozaimasu.', es: 'Muchas gracias. (formal)', note: '"ありがとう" solo = gracias (informal). "ありがとう ございます" = muchas gracias (formal). "どうも ありがとう" = también formal. "どうも" solo = gracias (breve, muy informal).', category: 'Cortesía' },
  { id: 5, japanese: 'すみません。', romaji: 'Sumimasen.', es: 'Perdón / Disculpe / Oiga (para llamar atención)', note: '"すみません" es multifuncional: disculpa, para llamar a un mesero, para pedir paso, o como "gracias" informal. Es una de las palabras más útiles del japonés.', category: 'Cortesía' },
  { id: 6, japanese: 'いただきます。', romaji: 'Itadakimasu.', es: 'Buen provecho / Gracias por la comida (antes de comer)', note: 'Se dice ANTES de comer. Literalmente "humildemente recibo". Es costumbre cultural obligatoria, como hacer la señal de la cruz antes de comer. Al terminar: "ごちそうさまでした" (Gracias por la comida).', category: 'Cortesía' },
  { id: 7, japanese: 'わかりません。', romaji: 'Wakarimasen.', es: 'No entiendo. / No sé.', note: '"わかりません" (wakarimasen) = no entiendo. "わかります" (wakarimasu) = entiendo. Muy útil: "すみません、もう いちど おねがいします" = perdón, una vez más por favor.', category: 'Ayuda' },
  { id: 8, japanese: 'もう いちど おねがいします。', romaji: 'Mou ichido onegaishimasu.', es: 'Otra vez / una vez más, por favor.', note: '"もう" = otra/una más; "いちど" = una vez; "おねがいします" = por favor. También: "ゆっくり はなして ください" (hable despacio, por favor). はなして=hablando; ゆっくり=despacio.', category: 'Ayuda' },
  { id: 9, japanese: 'トイレは どこですか？', romaji: 'Toire wa doko desu ka?', es: '¿Dónde está el baño?', note: '"どこ" = dónde. "どこですか？" = ¿dónde está?. "トイレ" (toiretto→toire) = baño. Alternativa: "おてあらいは どこですか？" (お手洗い = baño, más formal).', category: 'Supervivencia' },
  { id: 10, japanese: 'これは いくらですか？', romaji: 'Kore wa ikura desu ka?', es: '¿Cuánto cuesta esto?', note: '"これ" = esto; "いくら" = cuánto (precio); "ですか" = ¿es?. En tiendas: apunta al artículo y di "これは いくらですか？" También: "もっと やすく なりますか？" = ¿puede bajar el precio?', category: 'Supervivencia' },
  { id: 11, japanese: 'えいごが わかりますか？', romaji: 'Eigo ga wakarimasu ka?', es: '¿Habla inglés?', note: '"えいご" = inglés; "わかりますか？" = ¿entiende?. Si necesitas: "すぺいんごで はなせますか？" = ¿puede hablar en español? Suele no funcionar en zonas rurales japonesas.', category: 'Ayuda' },
  { id: 12, japanese: 'さようなら。/ またね。', romaji: 'Sayounara. / Mata ne.', es: '¡Adiós! (formal) / ¡Hasta luego! (informal)', note: '"さようなら" es formal pero permanente — implica que no se verán pronto. "またね" (mata ne) o "またあした" (mata ashita = hasta mañana) son más comunes para despedidas cotidianas.', category: 'Despedidas' },
  { id: 13, japanese: 'おげんきですか？', romaji: 'Ogenki desu ka?', es: '¿Cómo está usted? (formal)', note: '"おげんき" = お + 元気(genki) = energía/salud. La partícula お- añade cortesía. Respuesta: "はい、げんきです" (sí, estoy bien) o "おかげさまで" (gracias a usted — muy formal). Entre amigos: "げんき？"', category: 'Saludos' },
  { id: 14, japanese: 'はい、げんきです。ありがとうございます。', romaji: 'Hai, genki desu. Arigatou gozaimasu.', es: 'Sí, estoy bien. Muchas gracias.', note: '"はい" (hai) = sí (formal). Más elegante: "はい、おかげさまで" (hai, okagesama de) = sí, gracias a usted. El agradecimiento de cortesía a continuación refleja la costumbre japonesa de mantener la armonía social (和, wa).', category: 'Saludos' },
  { id: 15, japanese: 'ゆっくり はなして ください。', romaji: 'Yukkuri hanashite kudasai.', es: 'Por favor, hable despacio.', note: '"ゆっくり" (yukkuri) = despacio, con calma. "はなして" = gerundio de はなす (hablar). "ください" = por favor. También: "もっと ゆっくり おねがいします" (más despacio, por favor). Indispensable con hablantes nativos que hablan muy rápido.', category: 'Ayuda' },
  { id: 16, japanese: 'おなかが すきました。/ のどが かわきました。', romaji: 'Onaka ga sukimashita. / Nodo ga kawakimashita.', es: 'Tengo hambre. / Tengo sed.', note: '"おなか" = estómago. "すきました" (sukimashita) = se vació (de すく). "のど" = garganta. "かわきました" = se secó. En japonés el hambre y la sed son cambios de estado del cuerpo, no sensaciones subjetivas — concepto gramaticalmente diferente al español.', category: 'Supervivencia' },
  { id: 17, japanese: 'もうしわけ ありません。', romaji: 'Moushiwake arimasen.', es: 'Lo siento muchísimo. (disculpa formal grave)', note: '"もうしわけ" = excusa/justificación; "ありません" = no hay. Lit. "no tengo excusa". La disculpa más seria y formal. Cotidiano: "すみません". Error real: "ごめんなさい". Grave o laboral: "もうしわけありません". El nivel de disculpa es cultural en Japón.', category: 'Cortesía' },
  { id: 18, japanese: 'わかりました。', romaji: 'Wakarimashita.', es: 'Entendí. / De acuerdo. (confirmación)', note: '"わかりました" = entendí (pasado de わかる). Úsalo para confirmar instrucciones recibidas. "わかります" = entiendo (ahora). "まだ わかりません" = todavía no entiendo. El pasado "wakarimashita" indica recepción completa — señal de confianza comunicativa.', category: 'Cortesía' },
  { id: 19, japanese: 'いま なんじ ですか？', romaji: 'Ima nanji desu ka?', es: '¿Qué hora es ahora?', note: '"いま" = ahora. "なんじ" = ¿qué hora? 何 (nan) = qué + 時 (ji) = hora. Las horas: いち(1) に(2) さん(3) よ(4) ご(5) ろく(6) しち(7) はち(8) く(9) じゅう(10) + じ. Minutos: 〜ふん/ぷん. Ejemplo: "にじはんです" = son las 2:30.', category: 'Supervivencia' },
  { id: 20, japanese: '___ を ください。', romaji: '___ o kudasai.', es: '___, por favor. (en tiendas y restaurantes)', note: '"ください" (kudasai) = por favor deme (honorífico). Estructura: [artículo] + を + ください. Ejemplos: "みずをください" (agua, por favor), "これをください" (esto, por favor), "おかいけいをください" (la cuenta, por favor). Funciona en toda Japan.', category: 'Supervivencia' },
];

const CATEGORIES = ['Todos', 'Presentación', 'Cortesía', 'Ayuda', 'Supervivencia', 'Despedidas'];

export default function HablaJaponesA1() {
  return (
    <SpeakingPractice
      hubHref="/practica/japones/a1"
      hubLabel="🇯🇵 Japonés A1"
      eyebrow="話す · Japonés A1"
      title="Frases esenciales"
      lead={<>12 frases en <strong style={{ color: 'var(--ink)' }}>日本語 (japonés) + ローマ字 (romaji)</strong>. Primero aprende el sonido, luego el hiragana.</>}
      categories={CATEGORIES.slice(1)}
      completionTitle="よくできました！ (Yoku dekimashita!) ¡Muy bien hecho!"
      completionBody="Ya puedes presentarte y comunicarte en situaciones básicas en japonés."
      phrases={PHRASES.map((p) => ({
          id: p.id,
          phrase: p.japanese,
          script: p.romaji,
          es: p.es,
          note: p.note,
          category: p.category,
      }))}
    />
  )
}
