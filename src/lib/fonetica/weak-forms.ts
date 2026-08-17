/**
 * Formas débiles: cómo suenan de verdad las palabras gramaticales dentro de una frase.
 *
 * Un diccionario da la forma fuerte, la de la palabra dicha sola: `can` es /kæn/. Pero
 * nadie dice «I /kæn/ swim»; dice «I /kən/ swim». El inglés hablado reduce a schwa casi
 * todas sus palabras de función, y no oírlas es una de las razones por las que un
 * estudiante entiende cada palabra por separado y no entiende la frase entera.
 *
 * Por eso la herramienta las trae, pero **apagadas por defecto**: la forma fuerte es la
 * que hay que aprender primero, y la débil se activa cuando toca trabajar el habla
 * conectada.
 *
 * Las formas siguen la tradición de Gimson y del Cambridge English Pronouncing
 * Dictionary. `beforeVowel` recoge los dos casos en que la elección depende de lo que
 * viene detrás: `the apple` es /ði/ y no /ðə/.
 */

export interface WeakForm {
  readonly uk: string
  readonly us: string
  /** Variante ante sonido vocálico: `the end`, `to open`. */
  readonly beforeVowel?: { readonly uk: string; readonly us: string }
}

export const WEAK_FORMS: Record<string, WeakForm> = {
  a: { uk: 'ə', us: 'ə' },
  am: { uk: 'əm', us: 'əm' },
  an: { uk: 'ən', us: 'ən' },
  and: { uk: 'ənd', us: 'ənd' },
  are: { uk: 'ə', us: 'ɚ' },
  as: { uk: 'əz', us: 'əz' },
  at: { uk: 'ət', us: 'ət' },
  be: { uk: 'bi', us: 'bi' },
  been: { uk: 'bɪn', us: 'bɪn' },
  but: { uk: 'bət', us: 'bət' },
  can: { uk: 'kən', us: 'kən' },
  could: { uk: 'kəd', us: 'kəd' },
  do: { uk: 'də', us: 'də' },
  does: { uk: 'dəz', us: 'dəz' },
  for: { uk: 'fə', us: 'fɚ' },
  from: { uk: 'frəm', us: 'frəm' },
  had: { uk: 'həd', us: 'həd' },
  has: { uk: 'həz', us: 'həz' },
  have: { uk: 'həv', us: 'həv' },
  he: { uk: 'hi', us: 'hi' },
  her: { uk: 'hə', us: 'hɚ' },
  him: { uk: 'ɪm', us: 'ɪm' },
  his: { uk: 'ɪz', us: 'ɪz' },
  just: { uk: 'dʒəst', us: 'dʒəst' },
  must: { uk: 'məst', us: 'məst' },
  nor: { uk: 'nə', us: 'nɚ' },
  of: { uk: 'əv', us: 'əv' },
  or: { uk: 'ə', us: 'ɚ' },
  our: { uk: 'ɑː', us: 'ɑr' },
  per: { uk: 'pə', us: 'pɚ' },
  shall: { uk: 'ʃəl', us: 'ʃəl' },
  she: { uk: 'ʃi', us: 'ʃi' },
  should: { uk: 'ʃəd', us: 'ʃəd' },
  sir: { uk: 'sə', us: 'sɚ' },
  some: { uk: 'səm', us: 'səm' },
  than: { uk: 'ðən', us: 'ðən' },
  that: { uk: 'ðət', us: 'ðət' },
  the: { uk: 'ðə', us: 'ðə', beforeVowel: { uk: 'ði', us: 'ði' } },
  them: { uk: 'ðəm', us: 'ðəm' },
  there: { uk: 'ðə', us: 'ðɚ' },
  to: { uk: 'tə', us: 'tə', beforeVowel: { uk: 'tu', us: 'tu' } },
  us: { uk: 'əs', us: 'əs' },
  was: { uk: 'wəz', us: 'wəz' },
  we: { uk: 'wi', us: 'wi' },
  were: { uk: 'wə', us: 'wɚ' },
  who: { uk: 'hu', us: 'hu' },
  will: { uk: 'wəl', us: 'wəl' },
  would: { uk: 'wəd', us: 'wəd' },
  you: { uk: 'ju', us: 'ju' },
  your: { uk: 'jə', us: 'jɚ' },
}

/**
 * Nombre de cada letra, para las siglas.
 *
 * `NASA` se lee como palabra, pero `BBC` se deletrea. La herramienta deletrea todo lo
 * que va en mayúsculas y no está en el diccionario, igual que hace toPhonetics.
 */
export const LETTER_NAMES: Record<string, { uk: string; us: string }> = {
  a: { uk: 'eɪ', us: 'eɪ' },
  b: { uk: 'biː', us: 'bi' },
  c: { uk: 'siː', us: 'si' },
  d: { uk: 'diː', us: 'di' },
  e: { uk: 'iː', us: 'i' },
  f: { uk: 'ef', us: 'ɛf' },
  g: { uk: 'dʒiː', us: 'dʒi' },
  h: { uk: 'eɪtʃ', us: 'eɪtʃ' },
  i: { uk: 'aɪ', us: 'aɪ' },
  j: { uk: 'dʒeɪ', us: 'dʒeɪ' },
  k: { uk: 'keɪ', us: 'keɪ' },
  l: { uk: 'el', us: 'ɛl' },
  m: { uk: 'em', us: 'ɛm' },
  n: { uk: 'en', us: 'ɛn' },
  o: { uk: 'əʊ', us: 'oʊ' },
  p: { uk: 'piː', us: 'pi' },
  q: { uk: 'kjuː', us: 'kju' },
  r: { uk: 'ɑː', us: 'ɑr' },
  s: { uk: 'es', us: 'ɛs' },
  t: { uk: 'tiː', us: 'ti' },
  u: { uk: 'juː', us: 'ju' },
  v: { uk: 'viː', us: 'vi' },
  w: { uk: 'ˈdʌbljuː', us: 'ˈdʌbəlju' },
  x: { uk: 'eks', us: 'ɛks' },
  y: { uk: 'waɪ', us: 'waɪ' },
  z: { uk: 'zed', us: 'zi' },
}
