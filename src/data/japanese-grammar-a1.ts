export type JapaneseGrammarFamily = 'structure' | 'verbs-time' | 'descriptions' | 'questions' | 'location' | 'communication'

type GrammarResource = {
  family: JapaneseGrammarFamily
  image: string
  imageAlt: string
  audio: string
  audioText: string
  glyph: string
  studyMinutes: number
}

const FAMILY_IMAGE: Record<JapaneseGrammarFamily, string> = {
  structure: '/images/japanese-a1/grammar/structure.jpg',
  'verbs-time': '/images/japanese-a1/grammar/verbs-time.jpg',
  descriptions: '/images/japanese-a1/grammar/descriptions.jpg',
  questions: '/images/japanese-a1/grammar/questions.jpg',
  location: '/images/japanese-a1/grammar/location.jpg',
  communication: '/images/japanese-a1/grammar/communication.jpg',
}

const resources: Record<string, Omit<GrammarResource, 'image'>> = {
  'estructura-sov-particulas': { family: 'structure', imageAlt: 'Tarjetas visuales para ordenar una frase japonesa', audio: '/audio/japones/a1/grammar/estructura-sov-particulas.mp3', audioText: 'パンを食べます。', glyph: 'を', studyMinutes: 35 },
  'desu-masu': { family: 'structure', imageAlt: 'Mesa de estudio para practicar registros formales', audio: '/audio/japones/a1/grammar/desu-masu.mp3', audioText: '学生です。', glyph: 'です', studyMinutes: 30 },
  'particula-wa-ga': { family: 'structure', imageAlt: 'Tarjetas que ayudan a distinguir tema y sujeto', audio: '/audio/japones/a1/grammar/particula-wa-ga.mp3', audioText: '猫がいます。', glyph: 'は', studyMinutes: 35 },
  'particula-wo-ni': { family: 'structure', imageAlt: 'Secuencia visual de objeto y destino', audio: '/audio/japones/a1/grammar/particula-wo-ni.mp3', audioText: '学校に行きます。', glyph: 'に', studyMinutes: 35 },
  'particula-de-e': { family: 'location', imageAlt: 'Escena espacial para practicar lugar, medio y dirección', audio: '/audio/japones/a1/grammar/particula-de-e.mp3', audioText: 'カフェで勉強します。', glyph: 'で', studyMinutes: 35 },
  'arimasu-imasu': { family: 'location', imageAlt: 'Habitación japonesa con personas, animales y objetos ubicados', audio: '/audio/japones/a1/grammar/arimasu-imasu.mp3', audioText: '本があります。', glyph: 'います', studyMinutes: 35 },
  'i-keiyoshi': { family: 'descriptions', imageAlt: 'Objetos contrastados por tamaño, color y antigüedad', audio: '/audio/japones/a1/grammar/i-keiyoshi.mp3', audioText: '大きいです。', glyph: 'い', studyMinutes: 35 },
  'na-keiyoshi': { family: 'descriptions', imageAlt: 'Objetos cotidianos para practicar descripciones en japonés', audio: '/audio/japones/a1/grammar/na-keiyoshi.mp3', audioText: 'きれいです。', glyph: 'な', studyMinutes: 35 },
  'masu-kei-conjugacion': { family: 'verbs-time', imageAlt: 'Agenda japonesa para visualizar presente, pasado y negación', audio: '/audio/japones/a1/grammar/masu-kei-conjugacion.mp3', audioText: '食べました。', glyph: 'ます', studyMinutes: 40 },
  'interrogativos-ka': { family: 'questions', imageAlt: 'Estudiante señalando objetos y lugares para formular preguntas', audio: '/audio/japones/a1/grammar/interrogativos-ka.mp3', audioText: 'これは何ですか。', glyph: 'か', studyMinutes: 35 },
  'numeros-contadores': { family: 'verbs-time', imageAlt: 'Agenda y objetos cotidianos para contar en japonés', audio: '/audio/japones/a1/grammar/numeros-contadores.mp3', audioText: 'りんごが三つあります。', glyph: '三', studyMinutes: 40 },
  'jikan-tiempo': { family: 'verbs-time', imageAlt: 'Reloj y agenda para aprender la hora en japonés', audio: '/audio/japones/a1/grammar/jikan-tiempo.mp3', audioText: '七時です。', glyph: '時', studyMinutes: 35 },
  'tai-form': { family: 'verbs-time', imageAlt: 'Agenda de planes para expresar deseos y actividades', audio: '/audio/japones/a1/grammar/tai-form.mp3', audioText: '日本へ行きたいです。', glyph: 'たい', studyMinutes: 35 },
  'te-form-permission': { family: 'communication', imageAlt: 'Conversación cotidiana para pedir permiso con cortesía', audio: '/audio/japones/a1/grammar/te-form-permission.mp3', audioText: '入ってもいいですか。', glyph: 'て', studyMinutes: 40 },
  'adverbios-frecuencia': { family: 'verbs-time', imageAlt: 'Agenda semanal para visualizar hábitos y frecuencia', audio: '/audio/japones/a1/grammar/adverbios-frecuencia.mp3', audioText: '毎日勉強します。', glyph: '毎', studyMinutes: 35 },
  'negacion-completa': { family: 'descriptions', imageAlt: 'Contrastes visuales para construir afirmación y negación', audio: '/audio/japones/a1/grammar/negacion-completa.mp3', audioText: '肉を食べません。', glyph: 'ない', studyMinutes: 45 },
  conjunciones: { family: 'structure', imageAlt: 'Tarjetas ordenadas para conectar ideas japonesas', audio: '/audio/japones/a1/grammar/conjunciones.mp3', audioText: 'そして、勉強します。', glyph: 'と', studyMinutes: 35 },
  'expresiones-cotidianas': { family: 'communication', imageAlt: 'Conversación natural en una cafetería japonesa', audio: '/audio/japones/a1/grammar/expresiones-cotidianas.mp3', audioText: 'ありがとうございます。', glyph: '礼', studyMinutes: 35 },
  'demostrativos-kosoado': { family: 'questions', imageAlt: 'Estudiante señalando elementos cercanos y lejanos', audio: '/audio/japones/a1/grammar/demostrativos-kosoado.mp3', audioText: 'これは本です。', glyph: 'こ', studyMinutes: 35 },
  'particula-no-posesion': { family: 'structure', imageAlt: 'Tarjetas visuales conectadas para expresar posesión', audio: '/audio/japones/a1/grammar/particula-no-posesion.mp3', audioText: 'わたしの本です。', glyph: 'の', studyMinutes: 35 },
  'particulas-to-mo': { family: 'structure', imageAlt: 'Tarjetas que unen elementos y expresan también', audio: '/audio/japones/a1/grammar/particulas-to-mo.mp3', audioText: '猫と犬がいます。', glyph: 'も', studyMinutes: 35 },
  'kara-made-origen-limite': { family: 'verbs-time', imageAlt: 'Agenda y reloj para visualizar un inicio y un límite', audio: '/audio/japones/a1/grammar/kara-made-origen-limite.mp3', audioText: '九時から五時までです。', glyph: 'まで', studyMinutes: 35 },
  'ubicacion-posiciones': { family: 'location', imageAlt: 'Habitación con objetos situados encima, debajo y al lado', audio: '/audio/japones/a1/grammar/ubicacion-posiciones.mp3', audioText: '本は机の上です。', glyph: '上', studyMinutes: 40 },
  'suki-kirai-gustos': { family: 'descriptions', imageAlt: 'Objetos cotidianos para expresar gustos y preferencias', audio: '/audio/japones/a1/grammar/suki-kirai-gustos.mp3', audioText: '音楽が好きです。', glyph: '好き', studyMinutes: 35 },
  'invitaciones-masenka-mashou': { family: 'communication', imageAlt: 'Dos estudiantes conversando y haciendo una invitación', audio: '/audio/japones/a1/grammar/invitaciones-masenka-mashou.mp3', audioText: 'いっしょに行きませんか。', glyph: '誘', studyMinutes: 35 },
}

export function getJapaneseGrammarResource(slug: string): GrammarResource | undefined {
  const item = resources[slug]
  return item ? { ...item, image: FAMILY_IMAGE[item.family] } : undefined
}

export const JAPANESE_GRAMMAR_A1_RESOURCE_COUNT = Object.keys(resources).length
