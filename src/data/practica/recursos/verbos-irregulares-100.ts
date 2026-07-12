// Recurso de referencia: los 100 verbos irregulares más comunes del inglés,
// organizados por patrón de sonido (no alfabéticamente) — la forma en que de
// verdad se memorizan, según la pedagogía usada en toda la sección de Práctica.
// Usado por: la página del recurso (contenido crawleable) y el PDF descargable.

export interface IrregularVerbEntry {
  base: string
  past: string
  participle: string
  es: string    // traducción del verbo base
  note?: string // nota breve (pronunciación, uso, variante británica/americana)
}

export interface IrregularVerbGroup {
  id: string
  pattern: string      // nombre del patrón
  soundNote: string    // qué tienen en común / cómo memorizarlo
  verbs: IrregularVerbEntry[]
}

export const IRREGULAR_VERBS_100: IrregularVerbGroup[] = [
  {
    id: 'sin-cambio',
    pattern: 'Sin cambio: base = pasado = participio',
    soundNote: 'Las tres formas son idénticas. Es el grupo más fácil: si ya sabes el verbo, ya sabes las tres formas.',
    verbs: [
      { base: 'cut', past: 'cut', participle: 'cut', es: 'cortar' },
      { base: 'put', past: 'put', participle: 'put', es: 'poner' },
      { base: 'let', past: 'let', participle: 'let', es: 'dejar / permitir' },
      { base: 'cost', past: 'cost', participle: 'cost', es: 'costar' },
      { base: 'hit', past: 'hit', participle: 'hit', es: 'golpear' },
      { base: 'hurt', past: 'hurt', participle: 'hurt', es: 'herir / doler' },
      { base: 'set', past: 'set', participle: 'set', es: 'fijar / poner' },
      { base: 'shut', past: 'shut', participle: 'shut', es: 'cerrar' },
      { base: 'spread', past: 'spread', participle: 'spread', es: 'extender' },
      { base: 'burst', past: 'burst', participle: 'burst', es: 'reventar' },
      { base: 'bet', past: 'bet', participle: 'bet', es: 'apostar' },
      { base: 'quit', past: 'quit', participle: 'quit', es: 'dejar / renunciar' },
      { base: 'read', past: 'read', participle: 'read', es: 'leer', note: 'se escribe igual pero el pasado suena "red", no "riid"' },
      { base: 'broadcast', past: 'broadcast', participle: 'broadcast', es: 'transmitir' },
    ],
  },
  {
    id: 'vocal-i-a-u',
    pattern: 'Vocal i -> a -> u',
    soundNote: 'La vocal cambia tres veces siguiendo el mismo patrón: drink-drank-drunk. Muy productivo, aprende uno y reconoces el resto.',
    verbs: [
      { base: 'drink', past: 'drank', participle: 'drunk', es: 'beber' },
      { base: 'sing', past: 'sang', participle: 'sung', es: 'cantar' },
      { base: 'swim', past: 'swam', participle: 'swum', es: 'nadar' },
      { base: 'begin', past: 'began', participle: 'begun', es: 'empezar' },
      { base: 'ring', past: 'rang', participle: 'rung', es: 'sonar / timbrar' },
      { base: 'sink', past: 'sank', participle: 'sunk', es: 'hundirse' },
      { base: 'spring', past: 'sprang', participle: 'sprung', es: 'saltar / brotar' },
      { base: 'shrink', past: 'shrank', participle: 'shrunk', es: 'encoger' },
    ],
  },
  {
    id: 'vocal-i-a-a',
    pattern: 'Vocal i -> a -> a',
    soundNote: 'Solo dos verbos frecuentes, pero muy usados: pasado y participio comparten la misma vocal "a".',
    verbs: [
      { base: 'sit', past: 'sat', participle: 'sat', es: 'sentarse' },
      { base: 'spit', past: 'spat', participle: 'spat', es: 'escupir' },
    ],
  },
  {
    id: 'ought-aught',
    pattern: 'Terminación -ought / -aught',
    soundNote: 'Pasado y participio son iguales y terminan en ese sonido "-ot" largo. Es la trampa de pronunciación más famosa del inglés.',
    verbs: [
      { base: 'buy', past: 'bought', participle: 'bought', es: 'comprar' },
      { base: 'think', past: 'thought', participle: 'thought', es: 'pensar' },
      { base: 'teach', past: 'taught', participle: 'taught', es: 'enseñar' },
      { base: 'catch', past: 'caught', participle: 'caught', es: 'atrapar' },
      { base: 'bring', past: 'brought', participle: 'brought', es: 'traer' },
      { base: 'seek', past: 'sought', participle: 'sought', es: 'buscar' },
      { base: 'fight', past: 'fought', participle: 'fought', es: 'pelear' },
    ],
  },
  {
    id: 'terminacion-t',
    pattern: 'Terminación -t (pasado = participio)',
    soundNote: 'Verbos que en vez de -ed terminan en -t. Pasado y participio son siempre iguales entre sí.',
    verbs: [
      { base: 'feel', past: 'felt', participle: 'felt', es: 'sentir' },
      { base: 'keep', past: 'kept', participle: 'kept', es: 'mantener / guardar' },
      { base: 'sleep', past: 'slept', participle: 'slept', es: 'dormir' },
      { base: 'sweep', past: 'swept', participle: 'swept', es: 'barrer' },
      { base: 'leave', past: 'left', participle: 'left', es: 'dejar / salir' },
      { base: 'lose', past: 'lost', participle: 'lost', es: 'perder' },
      { base: 'spend', past: 'spent', participle: 'spent', es: 'gastar' },
      { base: 'lend', past: 'lent', participle: 'lent', es: 'prestar' },
      { base: 'send', past: 'sent', participle: 'sent', es: 'enviar' },
      { base: 'bend', past: 'bent', participle: 'bent', es: 'doblar' },
    ],
  },
  {
    id: 'terminacion-lt',
    pattern: 'Terminación -lt',
    soundNote: 'Como el grupo anterior, pero con una "l" antes de la "t". Solo 4 verbos frecuentes.',
    verbs: [
      { base: 'mean', past: 'meant', participle: 'meant', es: 'significar' },
      { base: 'deal', past: 'dealt', participle: 'dealt', es: 'tratar / lidiar' },
      { base: 'kneel', past: 'knelt', participle: 'knelt', es: 'arrodillarse' },
      { base: 'dream', past: 'dreamt', participle: 'dreamt', es: 'soñar', note: 'también regular: dreamed / dreamed' },
    ],
  },
  {
    id: 'terminacion-ld',
    pattern: 'Terminación -ld / -eld',
    soundNote: 'Pasado y participio suenan igual entre sí, terminados en ese sonido "-old/-eld".',
    verbs: [
      { base: 'sell', past: 'sold', participle: 'sold', es: 'vender' },
      { base: 'tell', past: 'told', participle: 'told', es: 'decir / contar' },
      { base: 'hold', past: 'held', participle: 'held', es: 'sostener' },
      { base: 'hear', past: 'heard', participle: 'heard', es: 'oír' },
    ],
  },
  {
    id: 'terminacion-aid',
    pattern: 'Terminación -aid / -ade',
    soundNote: 'Un grupo pequeño pero de los verbos más usados del idioma — imprescindibles desde el primer día.',
    verbs: [
      { base: 'pay', past: 'paid', participle: 'paid', es: 'pagar' },
      { base: 'say', past: 'said', participle: 'said', es: 'decir', note: 'se pronuncia "sed", no "seid"' },
      { base: 'lay', past: 'laid', participle: 'laid', es: 'poner / colocar' },
      { base: 'make', past: 'made', participle: 'made', es: 'hacer' },
      { base: 'have', past: 'had', participle: 'had', es: 'tener' },
    ],
  },
  {
    id: 'participio-en',
    pattern: 'Participio en -en (con cambio de vocal)',
    soundNote: 'El grupo más grande: el participio añade -en y la vocal suele cambiar otra vez respecto al pasado. Vale la pena dominarlo entero.',
    verbs: [
      { base: 'eat', past: 'ate', participle: 'eaten', es: 'comer' },
      { base: 'give', past: 'gave', participle: 'given', es: 'dar' },
      { base: 'take', past: 'took', participle: 'taken', es: 'tomar' },
      { base: 'break', past: 'broke', participle: 'broken', es: 'romper' },
      { base: 'speak', past: 'spoke', participle: 'spoken', es: 'hablar' },
      { base: 'write', past: 'wrote', participle: 'written', es: 'escribir' },
      { base: 'drive', past: 'drove', participle: 'driven', es: 'conducir' },
      { base: 'ride', past: 'rode', participle: 'ridden', es: 'montar' },
      { base: 'rise', past: 'rose', participle: 'risen', es: 'levantarse' },
      { base: 'choose', past: 'chose', participle: 'chosen', es: 'elegir' },
      { base: 'freeze', past: 'froze', participle: 'frozen', es: 'congelar' },
      { base: 'steal', past: 'stole', participle: 'stolen', es: 'robar' },
      { base: 'wake', past: 'woke', participle: 'woken', es: 'despertar' },
      { base: 'bite', past: 'bit', participle: 'bitten', es: 'morder' },
      { base: 'hide', past: 'hid', participle: 'hidden', es: 'esconder' },
      { base: 'fall', past: 'fell', participle: 'fallen', es: 'caer' },
      { base: 'forget', past: 'forgot', participle: 'forgotten', es: 'olvidar' },
    ],
  },
  {
    id: 'participio-n',
    pattern: 'Participio en -n (sin cambio previo)',
    soundNote: 'El pasado usa la vocal "e" o "ew", y el participio simplemente le añade -n.',
    verbs: [
      { base: 'know', past: 'knew', participle: 'known', es: 'saber / conocer' },
      { base: 'grow', past: 'grew', participle: 'grown', es: 'crecer' },
      { base: 'throw', past: 'threw', participle: 'thrown', es: 'lanzar' },
      { base: 'blow', past: 'blew', participle: 'blown', es: 'soplar' },
      { base: 'fly', past: 'flew', participle: 'flown', es: 'volar' },
      { base: 'draw', past: 'drew', participle: 'drawn', es: 'dibujar' },
      { base: 'see', past: 'saw', participle: 'seen', es: 'ver' },
      { base: 'show', past: 'showed', participle: 'shown', es: 'mostrar' },
      { base: 'sew', past: 'sewed', participle: 'sewn', es: 'coser' },
    ],
  },
  {
    id: 'muy-irregulares',
    pattern: 'Muy irregulares (sin patrón)',
    soundNote: 'Los que no encajan en ningún grupo — por suerte son solo un puñado, y son los más frecuentes del idioma, así que se aprenden rápido con la práctica.',
    verbs: [
      { base: 'go', past: 'went', participle: 'gone', es: 'ir' },
      { base: 'be', past: 'was / were', participle: 'been', es: 'ser / estar' },
      { base: 'do', past: 'did', participle: 'done', es: 'hacer' },
      { base: 'get', past: 'got', participle: 'gotten', es: 'obtener', note: 'inglés británico: got - got' },
      { base: 'run', past: 'ran', participle: 'run', es: 'correr' },
      { base: 'come', past: 'came', participle: 'come', es: 'venir' },
    ],
  },
  {
    id: 'terminacion-orn',
    pattern: 'Terminación -ore / -orn',
    soundNote: 'El pasado termina en "-ore" y el participio en "-orn". Grupo pequeño y muy reconocible.',
    verbs: [
      { base: 'wear', past: 'wore', participle: 'worn', es: 'usar / vestir' },
      { base: 'tear', past: 'tore', participle: 'torn', es: 'rasgar' },
      { base: 'bear', past: 'bore', participle: 'born', es: 'soportar / nacer' },
      { base: 'swear', past: 'swore', participle: 'sworn', es: 'jurar' },
    ],
  },
  {
    id: 'terminacion-ung-uck',
    pattern: 'Terminación -ung / -uck',
    soundNote: 'Otro grupo grande con pasado y participio iguales entre sí, terminados en ese sonido corto "-ung" o "-uck".',
    verbs: [
      { base: 'swing', past: 'swung', participle: 'swung', es: 'columpiar(se)' },
      { base: 'sting', past: 'stung', participle: 'stung', es: 'picar' },
      { base: 'sling', past: 'slung', participle: 'slung', es: 'lanzar / colgar' },
      { base: 'cling', past: 'clung', participle: 'clung', es: 'aferrarse' },
      { base: 'string', past: 'strung', participle: 'strung', es: 'encordar' },
      { base: 'win', past: 'won', participle: 'won', es: 'ganar' },
      { base: 'dig', past: 'dug', participle: 'dug', es: 'cavar' },
      { base: 'hang', past: 'hung', participle: 'hung', es: 'colgar' },
      { base: 'stick', past: 'stuck', participle: 'stuck', es: 'pegar' },
      { base: 'strike', past: 'struck', participle: 'struck', es: 'golpear' },
    ],
  },
]

export const TOTAL_VERBS = IRREGULAR_VERBS_100.reduce((n, g) => n + g.verbs.length, 0)
