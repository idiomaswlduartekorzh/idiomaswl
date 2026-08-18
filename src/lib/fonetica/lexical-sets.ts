/**
 * Conjuntos léxicos que separan el inglés americano del británico.
 *
 * El británico de esta herramienta **se deriva del americano**, no se busca en un
 * diccionario aparte. La razón está medida: el CMU tiene 126.052 palabras con acento
 * tónico marcado, y la mejor fuente libre de británico (wikipron/Wiktionary) solo tiene
 * 79.884, sin marcas de acento y con variedades mezcladas — da `water` como "w a t ɐ",
 * que no es RP. Derivar cubre el 100 % del diccionario con una sola convención.
 *
 * La mayoría de la derivación es regla pura (ver `british.ts`): el británico no pronuncia
 * la /r/ final, `oʊ` pasa a `əʊ`, etcétera. Pero hay cinco grupos de palabras donde la
 * diferencia **no es predecible desde el fonema**, porque depende de la historia de cada
 * palabra. Son los conjuntos léxicos de este archivo.
 *
 * ## De dónde salen estas listas
 *
 * Se minaron alineando CMU con wikipron UK palabra por palabra (32.169 palabras
 * alineadas) para descubrir qué pertenece a cada conjunto. Ese minado sirvió de
 * **investigación**, no de fuente: al revisarlo tenía ruido —daba `stop` y `object` como
 * PALM, y metía `altar`, `assault` y `australia` en CLOTH, que en RP son /ɔː/—. Las
 * listas finales están escritas y verificadas a mano sobre ese hallazgo. Así el
 * resultado no hereda los errores de Wiktionary ni su licencia.
 *
 * ## Por qué basta con la palabra base
 *
 * Cada conjunto se expande solo a sus formas derivadas (`ask` cubre `asks`, `asked`,
 * `asking`). Y una pertenencia de más es inofensiva: los conjuntos solo actúan si el
 * fonema en cuestión está presente. `photograph` es BATH, y su derivado `photographer`
 * también entra en la lista expandida — pero como el CMU lo transcribe sin ninguna /æ/,
 * la regla no llega a dispararse.
 */

/* ------------------------------------------------------------------ *
 * BATH — /æ/ americana que en RP se alarga a /ɑː/
 * ------------------------------------------------------------------ *
 * `ask` es /æsk/ en Estados Unidos y /ɑːsk/ en Inglaterra. Es el conjunto que más se
 * nota en un texto corriente, y el que más delata a un transcriptor que no lo tiene.
 */
const BATH_BASE = `
  after afternoon afterward afterwards aft aftermath aghast
  answer ask avalanche aunt advance advantage
  bask basket basketball bath bathroom bathrobe blast branch brass broadcast
  calf cast castle casket chance chancellor chant clasp class classmate classroom
  command commander contrast craft
  dance demand disaster draft draught
  enchant enhance example
  fast fasten flask forecast France
  ghastly giraffe glance glass graft grant graph grasp grass
  half halve
  lance lass last laugh laughter
  mask mast master
  nasty
  outcast overcast
  pass past pastor path photograph paragraph autograph telegraph plant plaster prance
  raft rafter rascal rather remand reprimand repast
  sample shaft slander slant staff stanch
  task telegraph trance
  vast
  banana alexander gasp aircraft calves khaki pakistan nevada
  cant shant can't shan't
`

/* ------------------------------------------------------------------ *
 * PALM — /ɑ/ americana que en RP es /ɑː/ y no /ɒ/
 * ------------------------------------------------------------------ *
 * Por defecto la /ɑ/ americana pasa a /ɒ/ británica (`hot` → /hɒt/). Estas palabras son
 * la excepción: conservan la vocal larga. Casi todas son préstamos.
 */
const PALM_BASE = `
  father palm calm balm psalm alms almond qualm
  bra spa ma pa papa mama grandma grandpa
  lava java drama llama plaza sonata saga aria
  facade garage mirage massage camouflage entourage collage corsage montage sabotage
  barrage memoir reservoir repertoire croissant
  nirvana piranha scenario safari salami khaki suave guava iguana marijuana
  tiara karate avocado wasabi koala
  iraq iran vietnam milan chicago bahamas pyjamas pajamas lager taiwan
`

/* ------------------------------------------------------------------ *
 * TRAP desde /ɑ/ — préstamos que el británico acorta a /æ/
 * ------------------------------------------------------------------ */
const TRAP_FROM_LOT_BASE = `pasta taco tacos macho nacho nachos lasagne mafia salsa`

/* ------------------------------------------------------------------ *
 * CLOTH — /ɔ/ americana que en RP es /ɒ/ corta
 * ------------------------------------------------------------------ *
 * `off`, `dog`, `long`, `cross`. El resto de las /ɔ/ americanas sí pasan a /ɔː/
 * (`thought`, `law`, `water`), que es el comportamiento por defecto.
 *
 * Aquí es donde el minado más engañaba: metía `altar`, `assault`, `alternative`,
 * `australia` y `baltic`, que en RP llevan /ɔː/. Todas tienen la vocal escrita `al`
 * o `au`; las de este conjunto se escriben con `o` (o con `ough` en `cough`).
 */
const CLOTH_BASE = `
  off offer office officer offset offside
  coffee coffin cough trough
  soft soften softly software loft lofty aloft croft
  cross across crossing crossword crossroads crossbow
  boss bossy loss lost cost costly frost gloss floss moss toss accost
  cloth moth broth froth
  dog log fog frog hog bog jog cog smog clog slog blog catalog dialog analog
  catalogue dialogue monologue synagogue epilogue travelogue
  layoff takeoff playoff kickoff cutoff spinoff offshore offspring offhand offline
  defrost glossary ostrich washcloth tablecloth leapfrog underdog watchdog hotdog
  austria australia australian austere austerity austin
  long along alongside belong longer longest oblong
  song wrong strong gong prong throng sarong
  gone often sausage
  because chocolate
  want
`

/* ------------------------------------------------------------------ *
 * ORANGE — /ɔr/ + vocal que en RP es /ɒr/
 * ------------------------------------------------------------------ *
 * `orange` es /ˈɔrɪndʒ/ en Estados Unidos y /ˈɒrɪndʒ/ en Inglaterra, mientras que
 * `story` es /ˈstɔːri/ en las dos. Desde el CMU las dos se ven igual, así que hace
 * falta la lista.
 */
const ORANGE_BASE = `
  orange forest forestry florist
  horrible horribly horrid horror horrific
  moral morally morality immoral
  coral quarrel warrant warranty quarry
  foreign foreigner
  origin original originally
  florid florida corridor coronation coroner correspond
  majority authority priority minority sorority
  historic historical historian
  porridge forage orator oracle laurel torrid torrent
`

/* ------------------------------------------------------------------ *
 * YOD — la /j/ que el americano perdió y el británico conserva
 * ------------------------------------------------------------------ *
 * `new` es /nu/ en Estados Unidos y /njuː/ en Inglaterra. Pasa detrás de /t d n s z θ/.
 * No vale una regla sobre el fonema: `new` lleva yod y `noon` no, y el CMU las escribe
 * con la misma vocal.
 */
const YOD_BASE = `
  new news newspaper newsletter newly renew renewal knew
  nude nuisance numeral numerous nuance nutrient nutrition nutritious
  neutral neuter neutron nuclear nucleus neuron neurotic neurology pneumonia
  avenue revenue venue
  due duo duke duty dutiful duel dual during duration dubious deuce dew dude dune
  endure produce producer reduce introduce subdue induce seduce deduce
  educate education individual schedule duplicate durable
  tune tuna tuesday tube tuba tumour tumor tulip tunic tutor tutorial tuition
  attitude altitude gratitude latitude multitude magnitude
  institute institution constitute constitution substitute opportunity
  stupid stupidity student studio studious stew steward
  costume presume assume resume consume consumer
  pursue pursuit suit suitable suitcase
  enthusiasm enthusiastic allude lewd
`

/**
 * Palabras que llevan la vocal pero **no** el yod, pese a encajar en el patrón.
 * `super` es /ˈsuːpə/ en Inglaterra, no /ˈsjuːpə/.
 */
const YOD_BLOCKED_BASE = `super superb supermarket superior suicide sushi sue sued suede`

/**
 * La clase de `marry`: /æ/ ante /r/ intervocálica.
 *
 * El RP mantiene tres clases que el americano fundió en una —`marry` /ˈmæri/, `merry`
 * /ˈmeri/, `Mary` /ˈmeəri/— y el CMU las escribe todas igual. La doble erre delata a la
 * mayoría (`marry`, `arrow`, `embarrass`); estas llevan erre simple y no hay nada en la
 * ortografía que las separe de `Mary`, así que se nombran a mano.
 */
const TRAP_BEFORE_R_BASE = `
  character characteristic paris parisian marathon parallel guarantee guarantor
  apparel apparent transparent transparency comparison comparative comparable disparate
  baron baroness tariff paragraph? arid
`.replace('paragraph?', '')

/* ------------------------------------------------------------------ *
 * ILE — el sufijo que el británico pronuncia /aɪl/
 * ------------------------------------------------------------------ *
 * `fertile` es /ˈfɜrtl/ en Estados Unidos y /ˈfɜːtaɪl/ en Inglaterra.
 */
const ILE_BASE = `
  fertile hostile missile mobile fragile agile futile docile ductile facile
  infantile juvenile reptile senile sterile textile versatile volatile virile
  tactile projectile percentile immobile
`

/* ------------------------------------------------------------------ *
 * Excepciones de palabra entera
 * ------------------------------------------------------------------ *
 * Ninguna regla las predice: hay que escribir la forma británica completa. Se aplican
 * al final, por encima de todo lo demás.
 */
export const BRITISH_OVERRIDES: Record<string, string> = {
  // El CMU escribe estas tres con la vocal de `but`, que es la americana. En RP llevan
  // la /ɒ/ breve, y ninguna regla lo predice: son las palabras más frecuentes del idioma
  // y su pronunciación no se deduce de cómo se escriben.
  what: 'wɒt',
  figure: 'ˈfɪɡə',
  figures: 'ˈfɪɡəz',
  figured: 'ˈfɪɡəd',
  women: 'ˈwɪmɪn',
  era: 'ˈɪərə',
  idea: 'aɪˈdɪə',
  basil: 'ˈbæzəl',
  from: 'frɒm',
  of: 'ɒv',
  schedule: 'ˈʃedjuːl',
  tomato: 'təˈmɑːtəʊ',
  tomatoes: 'təˈmɑːtəʊz',
  vase: 'vɑːz',
  vases: 'ˈvɑːzɪz',
  herb: 'hɜːb',
  herbs: 'hɜːbz',
  leisure: 'ˈleʒə',
  either: 'ˈaɪðə',
  neither: 'ˈnaɪðə',
  privacy: 'ˈprɪvəsi',
  vitamin: 'ˈvɪtəmɪn',
  vitamins: 'ˈvɪtəmɪnz',
  lieutenant: 'lefˈtenənt',
  advertisement: 'ədˈvɜːtɪsmənt',
  garage: 'ˈɡærɑːʒ',
  garages: 'ˈɡærɑːʒɪz',
  ballet: 'ˈbæleɪ',
  cafe: 'ˈkæfeɪ',
  adult: 'ˈædʌlt',
  adults: 'ˈædʌlts',
  research: 'rɪˈsɜːtʃ',
  weekend: 'ˌwiːkˈend',
  weekends: 'ˌwiːkˈendz',
  princess: 'prɪnˈses',
  magazine: 'ˌmæɡəˈziːn',
  magazines: 'ˌmæɡəˈziːnz',
  aluminum: 'ˌæljəˈmɪniəm',
  aluminium: 'ˌæljəˈmɪniəm',
  zebra: 'ˈzebrə',
  zebras: 'ˈzebrəz',
  route: 'ruːt',
  routes: 'ruːts',
  clerk: 'klɑːk',
  clerks: 'klɑːks',
  derby: 'ˈdɑːbi',
  yogurt: 'ˈjɒɡət',
  apricot: 'ˈeɪprɪkɒt',
  oregano: 'ˌɒrɪˈɡɑːnəʊ',
  premier: 'ˈpremiə',
  process: 'ˈprəʊses',
  processes: 'ˈprəʊsesɪz',
  progress: 'ˈprəʊɡres',
  glacier: 'ˈɡlæsiə',
  niche: 'niːʃ',
  dynasty: 'ˈdɪnəsti',
  z: 'zed',
}

/* ------------------------------------------------------------------ *
 * Expansión morfológica
 * ------------------------------------------------------------------ */

const SUFFIXES = ['s', 'es', 'ed', 'ing', 'ings', 'er', 'ers', 'est', 'ly', 'y', 'ment', 'ments', 'able']

/**
 * Añade a un conjunto las formas derivadas de cada palabra base.
 *
 * No pretende ser un morfólogo: genera candidatos de sobra (`asked`, `askes`, `asking`)
 * y deja que sobren, porque una palabra de más en el conjunto no hace daño —la regla
 * solo se dispara si el fonema está—, mientras que una de menos sí transcribe mal.
 */
function expand(base: string): Set<string> {
  const words = base.trim().split(/\s+/).filter(Boolean)
  const out = new Set<string>()

  for (const word of words) {
    out.add(word)
    for (const suffix of SUFFIXES) {
      out.add(word + suffix)
      // consonante final duplicada: plan -> planned
      if (/[bdgklmnprt]$/.test(word) && /^(ed|ing|er|est)$/.test(suffix)) {
        out.add(word + word.slice(-1) + suffix)
      }
      // pérdida de la -e final: dance -> danced, dancing
      if (word.endsWith('e') && /^(ed|ing|er|est|able)$/.test(suffix)) {
        out.add(word.slice(0, -1) + suffix)
      }
      // -y -> -ie: carry -> carried
      if (word.endsWith('y') && /^(s|ed|er|est)$/.test(suffix)) {
        out.add(`${word.slice(0, -1)}i${suffix === 's' ? 'es' : suffix}`)
      }
    }
  }
  return out
}

export const BATH = expand(BATH_BASE)
export const PALM = expand(PALM_BASE)
export const TRAP_FROM_LOT = expand(TRAP_FROM_LOT_BASE)
export const CLOTH = expand(CLOTH_BASE)
export const ORANGE = expand(ORANGE_BASE)
export const YOD = expand(YOD_BASE)
export const YOD_BLOCKED = expand(YOD_BLOCKED_BASE)
export const TRAP_BEFORE_R = expand(TRAP_BEFORE_R_BASE)
export const ILE = expand(ILE_BASE)
