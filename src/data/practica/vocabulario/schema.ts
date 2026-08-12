/**
 * Esquema del vocabulario de práctica — 8 idiomas × A1–B1.
 *
 * Método en docs/vocabulario-metodologia.md, procedencia de cada pieza en
 * docs/vocabulario-blueprints.md.
 *
 * La idea que sostiene todo este archivo: el ciclo de estudio es común a los ocho idiomas,
 * pero **lo que hay que anclar de una palabra no lo es**. Un sustantivo alemán sin artículo
 * y plural no es una palabra a medias: es un dato incompleto que enseña mal. Lo mismo el
 * acento en ruso, la partícula en coreano o la colocación en inglés.
 *
 * Por eso `extra` es una unión discriminada y no un saco de campos opcionales: el compilador
 * rechaza un sustantivo alemán sin `articulo`, y esa comprobación no depende de que alguien
 * se acuerde de revisarlo. Los 24 archivos que había antes tenían ocho formas de datos
 * distintas y el género alemán era opcional; se podía «dominar» *Brot* sin saber que es *das*.
 */

export type Lang =
  | 'ingles'
  | 'aleman'
  | 'frances'
  | 'italiano'
  | 'portugues'
  | 'ruso'
  | 'coreano'
  | 'japones'

export type Nivel = 'a1' | 'a2' | 'b1'

export type Pos =
  | 'sustantivo'
  | 'verbo'
  | 'adjetivo'
  | 'adverbio'
  | 'expresion'
  | 'conector'
  | 'numero'
  | 'pronombre'
  | 'preposicion'

/**
 * Grado de conocimiento (metodología §1). No es el estado del SRS —eso es la caja— sino
 * QUÉ sabe hacer el estudiante con la palabra. La riqueza lexical que se percibe al hablar
 * es el ancho de la banda G3–G4, no el número de tarjetas vistas.
 */
export type Grado = 0 | 1 | 2 | 3 | 4

/**
 * Ejemplo de uso. `fuente` señala el episodio del corpus de escucha de donde se tomó.
 *
 * No es decorativo: la regla de veto exige que la palabra aparezca en el corpus de su nivel,
 * y los mazos Core 2k/6k enseñaron lo que pasa cuando las frases se inventan —suenan
 * artificiales y enseñan léxico de oficina antes que «probablemente». Nuestras frases salen
 * de series escritas para sonar a conversación. Comprobable con:
 *
 *   node scripts/vocab-corpus-index.mjs --lang ingles --level a1 --find "bakery"
 */
export type Ejemplo = {
  target: string
  es: string
  fuente: FuenteEjemplo
}

/**
 * De dónde sale el ejemplo, declarado y no deducido.
 *
 * `corpus` es el caso bueno: la frase se oye literal en la serie de escucha del nivel.
 * `redactado` existe porque la regla de veto absoluta era irrealizable y conviene decirlo:
 * la serie de inglés A1 tiene 353 formas distintas y el núcleo del nivel pide 300 lemas con
 * reparto temático equilibrado. Hay palabras que un A1 necesita —«brother», «woman»— y que
 * el corpus no dice en ningún momento.
 *
 * La salida no es inventar en silencio: es declararlo, dar el motivo, y que la puerta de
 * calidad exija que al menos el 60 % del núcleo venga del corpus. Así el ejemplo redactado
 * es una excepción contada y auditable, y no la puerta de atrás por donde vuelven las frases
 * artificiales de los mazos Core.
 */
export type FuenteEjemplo =
  | { tipo: 'corpus'; serie: string; episodio: number }
  | { tipo: 'lectura'; ejercicio: string }
  | { tipo: 'redactado'; motivo: string }

/**
 * Un chunk con su traducción. La colocación sin traducir no sirve en A1: si el estudiante
 * no entiende «make a decision», la ficha le está enseñando ruido. Todo lo demás de la ficha
 * lleva español; esto también.
 */
export type Colocacion = {
  chunk: string
  es: string
}

/**
 * Falso amigo. Los tres campos son necesarios porque la trampa tiene tres partes, y dar
 * solo una deja al estudiante a medio camino: qué le parece, qué significa de verdad, y
 * cómo se dice entonces lo que él quería decir.
 */
export type FalsoAmigo = {
  /** La palabra española a la que se parece y que NO significa. */
  pareceEspanol: string
  /** Lo que significa en realidad. */
  significaEnRealidad: string
  /** Cómo se dice de verdad, en la lengua meta, lo que el español quería decir. */
  seDiceAsi: string
}

// ─── Capa por idioma ──────────────────────────────────────────────────────────

/**
 * Inglés. La unidad de aprendizaje no es la palabra: es el chunk. Entre el 55 % y el 80 %
 * del habla nativa sale de frases prefabricadas (enfoque léxico de Michael Lewis), así que
 * `colocaciones` es obligatorio en sustantivos y verbos: saber *decision* no da
 * *make a decision*.
 *
 * `registro` existe porque el cognado latino engaña al hispanohablante, que escribe
 * *obtain* y *utilize* donde el nativo dice *get* y *use*. Eso cuesta banda en IELTS.
 */
export type EnExtra = {
  lang: 'ingles'
  /** Sílaba tónica marcada en mayúsculas: `de-CI-sion`. */
  acento: string
  registro: 'neutro' | 'formal' | 'informal'
  /**
   * Obligatorio en TODA entrada inglesa, sea de la clase que sea. Es la traducción
   * literal del enfoque léxico: si la ficha solo lleva la palabra suelta, enseña la
   * palabra suelta, y eso no es lo que produce un hablante.
   */
  colocaciones: Colocacion[]
  /**
   * Falso amigo. Llegó tarde y por un error de diseño que conviene dejar escrito.
   *
   * El campo existía solo en las románicas —francés, italiano, portugués— porque el blueprint
   * dio por hecho que la trampa era cosa de las lenguas transparentes con el español. La
   * auditoría pedagógica del 12 ago 2026 lo midió sobre inglés A1 y A2 y encontró diez
   * trampas clásicas para un hispanohablante —`attend`, `realise`, `library`, `parents`— sin
   * una sola advertencia en la ficha.
   *
   * Es opcional a propósito: la mayoría de palabras inglesas no engañan, y marcar como trampa
   * lo que no lo es enseña a desconfiar de todo.
   */
  falsoAmigo?: FalsoAmigo
} & (
  | { tipo: 'verbo'; phrasal?: string[] }
  | { tipo: 'sustantivo' }
  | { tipo: 'otro' }
)

/**
 * Alemán. El género y el plural son la palabra, no metadatos.
 *
 * `imagenGenero` describe una imagen que codifica significado Y género a la vez. Es
 * deliberado y va contra la intuición: un estudio con 283 participantes encontró que las
 * imágenes que codifican ambas cosas ganan por más del 57 % en recuerdo inmediato, que
 * **el color solo no supera al grupo de control** —colorear el artículo no funciona— y que
 * las voces son la peor condición de todas.
 */
export type DeExtra = {
  lang: 'aleman'
} & (
  | {
      tipo: 'sustantivo'
      articulo: 'der' | 'die' | 'das'
      plural: string
      /** Descripción de la imagen que codifica objeto + género. */
      imagenGenero?: string
    }
  | {
      tipo: 'verbo'
      auxiliar: 'haben' | 'sein'
      participio: string
      separable: boolean
      /** Régimen preposicional con su caso: aprender el verbo sin él es aprenderlo mal. */
      regimen?: { prep: string; caso: 'akkusativ' | 'dativ' | 'genitiv' }
    }
  | { tipo: 'otro' }
)

/**
 * Francés. El problema no es el significado —el hispanohablante lee francés— sino la brecha
 * grafía ↔ sonido: liaison, elisión y consonantes finales mudas. Por eso `fonetica` es
 * obligatoria y el ejercicio distintivo es el dictado.
 */
export type FrExtra = {
  lang: 'frances'
  fonetica: string
  /** Si encadena con la palabra siguiente. Cambia lo que el estudiante oye. */
  liaison: boolean
  falsoAmigo?: FalsoAmigo
} & (
  | { tipo: 'sustantivo'; genero: 'm' | 'f' }
  | { tipo: 'otro' }
)

/**
 * Italiano. La transparencia con el español es una trampa: la confianza es justo lo que
 * fosiliza el error, y los falsos amigos más insidiosos son los funcionales (come/como),
 * que pasan desapercibidos por pequeños.
 *
 * `dobleConsonante` porque en italiano cambia el significado —nonno/nono, casa/cassa— y en
 * texto es invisible para quien no la busca.
 */
export type ItExtra = {
  lang: 'italiano'
  dobleConsonante: boolean
  falsoAmigo?: FalsoAmigo
} & (
  | {
      tipo: 'sustantivo'
      articulo: string
      /** Marca los casos donde el género NO coincide con el español: il fiore, il latte. */
      generoDivergente?: boolean
      pluralIrregular?: string
    }
  | { tipo: 'otro' }
)

/**
 * Portugués (BR por defecto). Mismo riesgo de fosilización que el italiano, agravado por la
 * cercanía: el portuñol. `nasal` marca las que llevan ão/ãe/õe, que no se aprenden leyendo.
 */
export type PtExtra = {
  lang: 'portugues'
  registro: 'br' | 'pt' | 'ambos'
  nasal: boolean
  falsoAmigo?: FalsoAmigo
} & (
  | { tipo: 'sustantivo'; genero: 'm' | 'f' }
  | { tipo: 'otro' }
)

/**
 * Ruso. El acento gobierna la reducción vocálica: si cae mal, todas las vocales de la
 * palabra salen mal y deja de ser reconocible. Y a veces cambia el significado
 * (за́мок castillo / замо́к candado). En texto ruso normal el acento no se escribe, así
 * que la ficha es el único sitio donde el estudiante lo va a ver.
 *
 * Los pares aspectuales van en UNA entrada con dos formas, no en dos entradas: si se parten,
 * el SRS las trata como palabras distintas y el estudiante nunca aprende que son la misma idea.
 */
export type RuExtra = {
  lang: 'ruso'
  /** Lema con la vocal tónica marcada: `за́мок`. */
  acento: string
} & (
  | { tipo: 'sustantivo'; genero: 'm' | 'f' | 'n' }
  | {
      tipo: 'verbo'
      aspecto: { imperfectivo: string; perfectivo: string }
      rige?: 'nominativo' | 'genitivo' | 'dativo' | 'acusativo' | 'instrumental' | 'preposicional'
    }
  | { tipo: 'otro' }
)

/**
 * Coreano. En torno al 60 % del léxico es sino-coreano y sigue patrones predecibles: 학(學)
 * abre 학교, 학생, 대학, 학기. Con 50–100 raíces el estudiante deja de ver una lista infinita
 * y empieza a ver bloques, así que `raizHanja` es la palanca de este idioma.
 *
 * `particula` es obligatoria en sustantivos porque un sustantivo coreano suelto no es usable.
 */
export type KoExtra = {
  lang: 'coreano'
  romanizacion: string
  raizHanja?: { hanja: string; significado: string }[]
} & (
  | { tipo: 'sustantivo'; particula: string; contador?: string }
  | {
      tipo: 'verbo'
      /** La misma idea cambia de forma según a quién le hablas. Las tres, o ninguna. */
      formas: { haeyo: string; hapshyo: string; banmal: string }
    }
  | { tipo: 'otro' }
)

/**
 * Japonés. Misma palanca de raíz que el coreano más una capa: el mismo kanji tiene lecturas
 * 音読み y 訓読み distintas según la palabra, y lo que hay que producir es la lectura que toca
 * en ESA frase, no «la lectura de la palabra».
 *
 * Único idioma de los ocho sin lista oficial: la Japan Foundation no publica una. El nivel
 * JLPT que se declara aquí es estimación nuestra y la página debe decirlo.
 */
export type JaExtra = {
  lang: 'japones'
  kanji?: string
  furigana: string
  romaji: string
  jlpt: 'N5' | 'N4' | 'N3'
} & (
  | { tipo: 'sustantivo'; contador?: string; lectura?: 'on' | 'kun' | 'mixta' }
  | {
      tipo: 'verbo'
      grupo: 'godan' | 'ichidan' | 'irregular'
      parTransitivo?: { transitivo: string; intransitivo: string }
    }
  | { tipo: 'otro' }
)

export type LangExtra =
  | EnExtra
  | DeExtra
  | FrExtra
  | ItExtra
  | PtExtra
  | RuExtra
  | KoExtra
  | JaExtra

// ─── Entrada, bloque, nivel ───────────────────────────────────────────────────

export type VocabEntry = {
  /** Estable: la clave del SRS depende de él. Cambiarlo borra el progreso del estudiante. */
  id: string
  /** Forma de diccionario, en la escritura del idioma. */
  lemma: string
  es: string
  pos: Pos
  ejemplo: Ejemplo
  /** Se llena en la Fase 5, con ElevenLabs, cuando el catálogo esté cerrado. */
  audio?: string
  extra: LangExtra
}

export type VocabBlock = {
  id: string
  nombre: string
  icono: string
  entradas: VocabEntry[]
}

/**
 * La lista oficial de la que sale este nivel. Las ocho lenguas tienen listas distintas y
 * de naturaleza distinta —alemán y ruso publican cupo cerrado por nivel; inglés e italiano
 * etiquetan por nivel sin cupo; japonés no tiene lista oficial— y el estudiante merece
 * saber de dónde sale lo que está estudiando.
 */
export type ListaBase = {
  fuente: string
  url?: string
  /** Cupo declarado por la fuente para este nivel, si lo declara. */
  cupoOficial?: number
  /** Salvedades: por ejemplo, que en japonés la lista es nuestra y no oficial. */
  nota?: string
}

export type VocabLevel = {
  lang: Lang
  nivel: Nivel
  /** Eje organizador del nivel: entorno inmediato (A1), situaciones (A2), función discursiva (B1). */
  eje: string
  listaBase: ListaBase
  bloques: VocabBlock[]
}

// ─── Utilidades ───────────────────────────────────────────────────────────────

export const entradasDe = (nivel: VocabLevel): VocabEntry[] =>
  nivel.bloques.flatMap((bloque) => bloque.entradas)

/** Núcleo productivo por nivel (metodología §3), calibrado contra las listas oficiales. */
export const NUCLEO_OBJETIVO: Record<Nivel, number> = { a1: 300, a2: 350, b1: 400 }
