/**
 * Habla acompañada — la forma de los datos.
 *
 * Es §7 de `docs/habla-acompanado-blueprint.md`, con dos cambios que salieron al
 * llevarlo al repo y que las propias fichas piden por escrito:
 *
 * 1. **`grammarReferences` lleva `level`.** El tipo del blueprint no lo tenía, y el
 *    consumidor que ya existe (`getGrammarReferences`, en `writing-integrated.ts`)
 *    tampoco. Sin ese campo, las trece referencias que apuntan a temas de A1 dan 404:
 *    la ruta de gramática de A2 clava `const NIVEL = 'a2'` y hace `notFound()`.
 *    El enlace se arma con `/practica/<idioma>/<level de la referencia>/gramatica/<slug>`.
 *
 * 2. **La ficha se guarda en bloques, no en un chorro de markdown.** Las ocho fichas
 *    traen tablas, listas y citas mezcladas —la carta del escenario 7 tiene dos tablas
 *    y tres párrafos—, y renderizar markdown crudo obligaría a meter un parser en el
 *    cliente. Aquí el bloque ya viene resuelto; lo único que queda por interpretar es
 *    el formato en línea (`**negrita**`, `*cursiva*`, `` `código` ``).
 *
 * Lo que el motor NO hace, y está dicho en pantalla y no solo aquí (§8 del blueprint):
 * no hay sincronía entre las dos pantallas, no se graba nada, no hay evaluación
 * automática y no hay emparejador.
 */

export type RoleplayLanguage = 'ingles'
export type RoleplayLevel = 'a1' | 'a2' | 'b1'
export type RoleId = 'a' | 'b'

export type SpeechAct =
  | 'pedir-favor'
  | 'rechazar'
  | 'negociar'
  | 'disculparse'
  | 'quejarse'
  | 'proponer-alternativa'
  | 'dar-mala-noticia'
  | 'insistir'
  | 'poner-limite'
  | 'pedir-aclaracion'
  | 'conceder-con-condicion'
  | 'recomendar'

/** Un bloque de ficha ya resuelto. El renderizador solo interpreta formato en línea. */
export type RoleplayBlock =
  | { kind: 'p'; text: string }
  | { kind: 'ul'; items: string[] }
  | { kind: 'ol'; items: string[] }
  /** La carta llega dentro de una cita, y dentro de la cita hay tablas y listas. */
  | { kind: 'quote'; blocks: RoleplayBlock[] }
  | { kind: 'table'; head?: string[]; rows: string[][] }

/** Situación, objetivo, restricciones, dato oculto y lo que se pierde. En ese orden. */
export type RoleplayProseBlock = {
  label: string
  text?: string
  items?: string[]
}

export type RoleplayRole = {
  id: RoleId
  /** Nombre corto y neutro. Es lo único del rol que ve la otra persona, al elegir. */
  name: string
  nameEs: string
  /** El titular de la ficha, en inglés. Solo en la pantalla de este rol. */
  headline: string
  /** Registro, quién arranca, turnos y minutos. Va arriba del todo. */
  briefing: string[]
  prose: RoleplayProseBlock[]
  /** Una línea de contexto sobre la tabla de datos. Solo dos fichas la traen. */
  factsNote?: string
  /** Datos duros en nota. Nunca una frase decible. */
  facts: { label: string; value: string }[]
  /** 8-10 palabras que este rol necesita aquí, con definición en inglés sencillo. */
  vocab: { word: string; whatItIs: string; here: string }[]
  /** A qué bloques de la caja común le toca echar mano, y por qué. */
  toolkit: string
  /** 6-9 exponentes propios, agrupados por función y en orden alfabético de función. */
  exponents: { purpose: string; form: string; effect: string }[]
  success: string
}

export type RoleplayCard = {
  toRole: RoleId
  /** Turno **global**, no el turno de este rol. Puerta 6 del blueprint. */
  afterTurn: number
  openWhen: RoleplayBlock[]
  blocks: RoleplayBlock[]
}

export type RoleplayGrammarReference = {
  slug: string
  level: RoleplayLevel
  title: string
  rationale: string
}

export type RoleplayScenario = {
  id: string
  slug: string
  sequence: number
  language: RoleplayLanguage
  level: RoleplayLevel
  /** Título en español, para el hub. */
  title: string
  /** El mismo escenario nombrado en inglés. */
  titleTarget: string
  setting: string
  settingEs: string
  speechActs: SpeechAct[]
  power: 'a>b' | 'b>a' | 'igual'
  initiator: RoleId
  outcome: 'acuerdo' | 'acuerdo-parcial' | 'sin-acuerdo' | 'aplazado'
  minutes: number
  turnsPerRole: number
  /** Proveniencia de la auditoría histórica; el registro TypeScript es la fuente runtime. */
  source: string
  roles: [RoleplayRole, RoleplayRole]
  card: RoleplayCard
  /** Idéntico en las dos pantallas. Puerta 7. */
  closing: RoleplayBlock[]
  /** Las 3–4 preguntas de después, en español. */
  debrief: string[]
  grammarReferences: RoleplayGrammarReference[]
}

/** La caja de herramientas del nivel: común a los dieciséis roles. §10 del blueprint. */
export type RoleplayToolkitBlock = {
  number: number
  title: string
  /** La marca del bloque entero: `[receives]`, `[jargon]`, `[grants]`. */
  tag?: string
  /** Por qué existe el bloque. En inglés, como el resto de lo que se lee en pantalla. */
  note?: string
  rows: { form: string; when: string; register?: string; tag?: string }[]
  tail?: string
}

export type RoleplayToolkit = {
  language: RoleplayLanguage
  level: RoleplayLevel
  intro: string
  blocks: RoleplayToolkitBlock[]
}
