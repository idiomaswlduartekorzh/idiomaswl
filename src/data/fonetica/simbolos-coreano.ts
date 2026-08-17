/**
 * Qué significa cada símbolo del AFI coreano, explicado desde el español.
 *
 * Sin esto la herramienta no cumple su promesa. Escribir que `앉다` es /ant͈a/ solo sirve
 * si quien lo lee sabe qué es esa marca `͈` — y no lo sabe, porque ese sonido no existe en
 * español. Cambiarle un código que no entiende (el hangul) por otro que tampoco entiende
 * (el AFI) no le enseña nada.
 *
 * Por eso cada símbolo lleva tres cosas: a qué se parece en español, en qué se diferencia,
 * y **cuál es el error que comete un hispanohablante**. Ese tercer campo es el que más
 * vale: casi todos los errores de pronunciación de un colombiano estudiando coreano son
 * predecibles, porque vienen de sustituir el sonido coreano por el castellano más cercano.
 *
 * La romanización se ofrece aparte y en segundo plano a propósito. `학교` se romaniza
 * `hakgyo` —así, oficialmente— y eso le dice a un hispanohablante que pronuncie «hak-gyo»,
 * que es justo lo que NO suena. La romanización sirve para escribir nombres en un pasaporte,
 * no para aprender a hablar.
 */

export interface SimboloCoreano {
  /** El símbolo tal cual aparece en la transcripción. */
  readonly simbolo: string
  /** Las letras del hangul que lo producen. */
  readonly hangul: string
  /** A qué suena, dicho en español llano. */
  readonly comoSuena: string
  /** El error típico de un hispanohablante, cuando lo hay. */
  readonly errorTipico?: string
  /**
   * De dónde sale el símbolo.
   *
   * `extendido` significa que viene del **AFI Extendido**, la parte del estándar para
   * sonidos que la tabla principal no cubre. Es oficial y es lo que usa la bibliografía
   * de fonología coreana, pero NO está en la tabla que traen los diccionarios — así que
   * quien lo ve por primera vez con razón duda de si se lo han inventado. La página lo
   * dice en vez de dejar la duda.
   */
  readonly fuente?: 'extendido'
  /** Cómo lo escriben otros materiales, para reconocerlo fuera de aquí. */
  readonly tambienEscrito?: string
  readonly ejemplo: { readonly palabra: string; readonly afi: string }
}

export const SIMBOLOS_COREANO: SimboloCoreano[] = [
  /* ── Vocales ──────────────────────────────────────────────────────────── */
  {
    simbolo: 'a',
    hangul: 'ㅏ',
    comoSuena: 'La «a» española, igual.',
    ejemplo: { palabra: '가다', afi: 'kada' },
  },
  {
    simbolo: 'ʌ',
    hangul: 'ㅓ',
    comoSuena: 'Entre la «o» y la «a». La boca queda más abierta que para una «o».',
    errorTipico: 'Decirla como «eo», siguiendo la romanización. No son dos sonidos: es uno solo.',
    ejemplo: { palabra: '서울', afi: 'sʌul' },
  },
  {
    simbolo: 'o',
    hangul: 'ㅗ',
    comoSuena: 'La «o» española, con los labios más redondeados.',
    ejemplo: { palabra: '오다', afi: 'oda' },
  },
  {
    simbolo: 'u',
    hangul: 'ㅜ',
    comoSuena: 'La «u» española.',
    ejemplo: { palabra: '우리', afi: 'uɾi' },
  },
  {
    simbolo: 'ɯ',
    hangul: 'ㅡ',
    comoSuena: 'Como una «u» pero SIN redondear los labios: la boca queda estirada, casi sonriendo.',
    errorTipico: 'Decirla como «u». Es el sonido que más delata a un principiante, porque en español no existe.',
    ejemplo: { palabra: '그', afi: 'kɯ' },
  },
  {
    simbolo: 'i',
    hangul: 'ㅣ',
    comoSuena: 'La «i» española.',
    ejemplo: { palabra: '이', afi: 'i' },
  },
  {
    simbolo: 'e',
    hangul: 'ㅔ',
    comoSuena: 'La «e» española.',
    ejemplo: { palabra: '네', afi: 'ne' },
  },
  {
    simbolo: 'ɛ',
    hangul: 'ㅐ',
    comoSuena: 'Una «e» un poco más abierta. Hoy casi nadie la distingue de ㅔ.',
    ejemplo: { palabra: '개', afi: 'kɛ' },
  },

  /* ── Las tres series de consonantes ───────────────────────────────────── */
  {
    simbolo: 'k · t · p · tɕ',
    hangul: 'ㄱ ㄷ ㅂ ㅈ',
    comoSuena: 'Serie SUAVE. Al principio de palabra suenan sordas, sin soltar aire.',
    errorTipico:
      'Entre vocales se vuelven sonoras y hay que decirlas así: 부부 es /pubu/, con las dos ㅂ distintas. Ni /pupu/ ni /bubu/.',
    ejemplo: { palabra: '바보', afi: 'pabo' },
  },
  {
    simbolo: 'kʰ · tʰ · pʰ · tɕʰ',
    hangul: 'ㅋ ㅌ ㅍ ㅊ',
    comoSuena: 'Serie ASPIRADA. Sueltan una bocanada de aire, como la «p» inglesa de «pin».',
    errorTipico:
      'No soltar el aire, porque en español no se hace nunca. Prueba con la mano delante de la boca: tiene que notarse el soplo.',
    ejemplo: { palabra: '코', afi: 'kʰo' },
  },
  {
    simbolo: 'k͈ · t͈ · p͈ · s͈ · t͈ɕ',
    hangul: 'ㄲ ㄸ ㅃ ㅆ ㅉ',
    comoSuena:
      'Serie TENSA. La garganta se aprieta y NO sale nada de aire. El sonido es seco y cortante.',
    errorTipico:
      'Confundirla con la aspirada, o decirla igual que la suave. Es la distinción más difícil del coreano para un hispanohablante, y cambia palabras: 달 (luna) y 딸 (hija).',
    fuente: 'extendido',
    tambienEscrito: 'Muchos manuales las escriben dobladas —kk, tt, pp, ss, jj— o con asterisco (k*).',
    ejemplo: { palabra: '딸', afi: 't͈al' },
  },

  /* ── Los cierres de sílaba ────────────────────────────────────────────── */
  {
    simbolo: 'k̚ · t̚ · p̚',
    hangul: 'ㄱ ㄷ ㅂ (al cerrar sílaba)',
    comoSuena:
      'La lengua o los labios llegan a su sitio y SE QUEDAN AHÍ. El sonido se corta en seco, sin soltar el aire.',
    errorTipico:
      'Añadir una vocal detrás: decir «chek-e» en vez de 책 /tɕʰɛk̚/. Es el error más frecuente y el que más rompe la comprensión, porque convierte una sílaba en dos.',
    tambienEscrito: 'Algunos materiales lo omiten y escriben solo /k/, /t/, /p/.',
    ejemplo: { palabra: '책', afi: 'tɕʰɛk̚' },
  },
  {
    simbolo: 'ŋ',
    hangul: 'ㅇ (al cerrar sílaba)',
    comoSuena: 'Como la «n» de «tango», sonando en la garganta y no en los dientes.',
    ejemplo: { palabra: '강', afi: 'kaŋ' },
  },

  /* ── Las que dependen de la posición ──────────────────────────────────── */
  {
    simbolo: 'ɾ',
    hangul: 'ㄹ (abriendo sílaba)',
    comoSuena: 'La «r» suave de «pero». Un solo golpe de lengua.',
    errorTipico: 'Decirla como la «rr» de «perro». El coreano no tiene ese sonido.',
    ejemplo: { palabra: '우리', afi: 'uɾi' },
  },
  {
    simbolo: 'l',
    hangul: 'ㄹ (cerrando sílaba)',
    comoSuena: 'La «l» española. La misma letra que arriba, pero al cerrar suena distinta.',
    ejemplo: { palabra: '서울', afi: 'sʌul' },
  },
  {
    simbolo: 'ɕ',
    hangul: 'ㅅ (ante «i»)',
    comoSuena: 'Entre la «s» y la «sh» inglesa, con la lengua plana contra el paladar.',
    errorTipico: 'Decir una «s» normal. 시 no es «si», es más suave y sibilante.',
    tambienEscrito: 'Algunos materiales la escriben /ʃ/, que es el sonido inglés de «she» y no es exactamente el mismo.',
    ejemplo: { palabra: '시', afi: 'ɕi' },
  },
  {
    simbolo: 'h',
    hangul: 'ㅎ',
    comoSuena: 'Una «j» suave, como la «h» inglesa de «hello». No es la «j» fuerte española.',
    ejemplo: { palabra: '하나', afi: 'hana' },
  },
  {
    simbolo: 'j',
    hangul: 'ㅑ ㅕ ㅛ ㅠ…',
    comoSuena: 'La «y» de «yo» o la «i» de «pierna». Va pegada a la vocal siguiente.',
    ejemplo: { palabra: '요리', afi: 'joɾi' },
  },
  {
    simbolo: 'w',
    hangul: 'ㅘ ㅝ ㅟ…',
    comoSuena: 'La «u» de «cuando», pegada a la vocal siguiente.',
    ejemplo: { palabra: '와', afi: 'wa' },
  },
]

/**
 * Los símbolos que aparecen en una transcripción concreta.
 *
 * Sirve para enseñar solo la leyenda que hace falta: si el texto no tiene ninguna tensa,
 * no hay por qué explicar qué es una tensa. Se comprueban primero los símbolos largos
 * para que `tɕʰ` no se detecte como `t` más otras cosas.
 */
export function simbolosPresentes(afi: string): SimboloCoreano[] {
  return SIMBOLOS_COREANO.filter((entrada) =>
    entrada.simbolo.split(' · ').some((variante) => contiene(afi, variante)),
  )
}

/**
 * Caracteres que, pegados detrás, convierten un símbolo en otro distinto.
 *
 * Las tres marcas —tensa `͈`, aspirada `ʰ`, sin soltar aire `̚`— y además `ɕ`, porque
 * `t` + `ɕ` no son una «t» seguida de otra cosa: son la africada de `ㅈ`, un sonido
 * entero. Sin incluirla, `책` /tɕʰɛk̚/ explicaba la serie suave por culpa de esa `t`.
 */
const MODIFICADORES = '͈ʰ̚ɕ'

/**
 * ¿Aparece este símbolo en la transcripción, y no como parte de otro más largo?
 *
 * Buscar `t` a secas dentro de `/ant͈a/` daba positivo, porque la consonante tensa se
 * escribe con una `t` más una marca debajo. Así la herramienta explicaba la serie suave
 * en una palabra que no tiene ninguna — justo la confusión que viene a deshacer.
 */
function contiene(afi: string, variante: string): boolean {
  // Un símbolo que YA acaba en marca se busca tal cual: `t͈` no puede confundirse.
  const ultimo = variante[variante.length - 1] ?? ''
  if ('͈ʰ̚'.includes(ultimo)) return afi.includes(variante)

  const escapado = variante.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return new RegExp(`${escapado}(?![${MODIFICADORES}])`).test(afi)
}
