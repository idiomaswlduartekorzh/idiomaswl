/**
 * Guardián del transcriptor de coreano.
 *
 *     npm run check:fonetica-coreano
 *
 * El coreano no lleva diccionario: es un motor de reglas encadenadas, y **el orden en que
 * se aplican cambia el resultado**. Tocar una para arreglar una palabra rompe otra sin
 * hacer ruido. Cada caso de abajo es el ejemplo canónico de su regla, y lleva escrito qué
 * vigila, así que cuando falle uno se sabe dónde mirar.
 *
 * Las formas esperadas salen de la 표준 발음법 (Normas de Pronunciación Estándar) del
 * Instituto Nacional de la Lengua Coreana.
 */

import path from 'node:path'
import process from 'node:process'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'
import { registerHooks } from 'node:module'

const root = path.resolve(import.meta.dirname, '..')

if (!process.execArgv.some((a) => a.includes('strip-types')) && Number(process.versions.node.split('.')[0]) < 23) {
  const again = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--no-warnings', import.meta.filename, ...process.argv.slice(2)],
    { stdio: 'inherit' },
  )
  process.exit(again.status ?? 1)
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context)
    } catch (error) {
      if (specifier.startsWith('.') && !specifier.match(/\.[cm]?[jt]s$/)) return nextResolve(`${specifier}.ts`, context)
      throw error
    }
  },
})

const { transcribeKorean } = await import(
  pathToFileURL(path.join(root, 'src/lib/fonetica/coreano/ipa.ts')).href
)

/** [palabra, cómo suena en hangul, AFI, romanización, qué regla vigila] */
const CASES = [
  // Sin cambios: el caso base tiene que seguir intacto.
  ['김치', '김치', 'kimtɕʰi', 'gimchi', 'sin cambios'],
  ['서울', '서울', 'sʌul', 'seoul', 'sin cambios'],
  ['안녕하세요', '안녕하세요', 'annjʌŋhasejo', 'annyeonghaseyo', 'sin cambios, palabra larga'],

  // 경음화 — tensificación tras consonante cerrada.
  ['학교', '학꾜', 'hak̚k͈jo', 'hakgyo', '경음화 tras oclusiva'],
  ['읽다', '익따', 'ik̚t͈a', 'ikda', '자음군 단순화 + 경음화'],
  ['없다', '업따', 'ʌp̚t͈a', 'eopda', '자음군 ㅄ'],
  ['앉다', '안따', 'ant͈a', 'anda', '경음화 de raíz verbal (제24항)'],
  ['넓게', '널께', 'nʌlk͈e', 'neolge', '경음화 de raíz verbal (제25항)'],
  ['산도', '산도', 'sando', 'sando', 'NO tensa: ㄴ simple no es raíz verbal'],

  // 비음화 — nasalización.
  ['국물', '궁물', 'kuŋmul', 'gungmul', '비음화'],
  ['감사합니다', '감사함니다', 'kamsahamnida', 'gamsahamnida', '비음화 en ㅂ + ㄴ'],
  ['독립', '동닙', 'toŋnip̚', 'dongnip', 'ㄹ → ㄴ y arrastra la nasalización'],

  // 유음화 — lateralización.
  ['신라', '실라', 'ɕilla', 'silla', '유음화 ㄴ + ㄹ'],
  ['설날', '설랄', 'sʌllal', 'seollal', '유음화 ㄹ + ㄴ'],
  ['종로', '종노', 'tɕoŋno', 'jongno', 'ㅇ + ㄹ → ㄴ'],

  // ㅎ: aspira o desaparece.
  ['좋다', '조타', 'tɕotʰa', 'jota', '격음화 con ㅎ final'],
  ['축하', '추카', 'tɕʰukʰa', 'chuka', '격음화 con ㅎ inicial'],
  ['싫어', '시러', 'ɕiɾʌ', 'sireo', 'la ㅎ del grupo ㅀ se cae'],

  // 연음 — la consonante final pasa a la sílaba siguiente.
  ['한국어', '한구거', 'hanɡuɡʌ', 'hangugeo', '연음 y sonorización'],
  ['밥을', '바블', 'pabɯl', 'babeul', '연음 simple'],
  ['읽어', '일거', 'ilɡʌ', 'ilgeo', '연음 de grupo: pasa la ㄱ, se queda la ㄹ'],

  // 구개음화 y 끝소리 규칙.
  ['같이', '가치', 'katɕʰi', 'gachi', '구개음화 ㅌ + 이'],
  ['꽃이', '꼬치', 'k͈otɕʰi', 'kkochi', '연음 con la letra original, no la neutralizada'],
  ['옷', '옫', 'ot̚', 'ot', '음절의 끝소리 규칙'],
]

const failures = []

for (const [word, spoken, ipa, rr, rule] of CASES) {
  const result = transcribeKorean(word)
  if (!result) {
    failures.push(`${word}: no se pudo transcribir  — ${rule}`)
    continue
  }
  if (result.spoken !== spoken) failures.push(`${word} · pronunciación: esperaba [${spoken}] y salió [${result.spoken}]  — ${rule}`)
  if (result.ipa !== ipa) failures.push(`${word} · AFI: esperaba /${ipa}/ y salió /${result.ipa}/  — ${rule}`)
  if (result.rr !== rr) failures.push(`${word} · romanización: esperaba «${rr}» y salió «${result.rr}»  — ${rule}`)
}

// Lo que no es hangul se rechaza en vez de inventarse.
for (const notKorean of ['hello', '123', 'こんにちは', '']) {
  if (transcribeKorean(notKorean) !== null) {
    failures.push(`«${notKorean}» debería devolver null: no es hangul`)
  }
}

/* ------------------------------------------------------------------ *
 * El decodificador de símbolos
 * ------------------------------------------------------------------ *
 * Es lo que hace que la transcripción sirva de algo: sin él, /ant͈a/ es tan opaco como
 * 앉다. Y su trampa es que las consonantes coreanas se escriben unas DENTRO de otras —la
 * tensa `t͈` lleva una `t`, la africada `tɕʰ` también— así que una búsqueda ingenua
 * explica series que no están en la palabra.
 */

const { simbolosPresentes } = await import(
  pathToFileURL(path.join(root, 'src/data/fonetica/simbolos-coreano.ts')).href
)

/** [AFI, series que DEBEN salir, series que NO deben salir] */
const SYMBOL_CASES = [
  ['ant͈a', ['k͈ · t͈ · p͈ · s͈ · t͈ɕ'], ['k · t · p · tɕ', 'kʰ · tʰ · pʰ · tɕʰ']],
  ['tɕʰɛk̚', ['kʰ · tʰ · pʰ · tɕʰ', 'k̚ · t̚ · p̚'], ['k · t · p · tɕ']],
  ['pabo', ['k · t · p · tɕ'], ['k͈ · t͈ · p͈ · s͈ · t͈ɕ', 'k̚ · t̚ · p̚']],
  ['sʌul', ['ʌ', 'l'], ['ɾ', 'k · t · p · tɕ']],
]

for (const [afi, deben, noDeben] of SYMBOL_CASES) {
  const encontrados = simbolosPresentes(afi).map((s) => s.simbolo)
  for (const simbolo of deben) {
    if (!encontrados.includes(simbolo)) {
      failures.push(`/${afi}/: debería explicar «${simbolo}» y no lo hace`)
    }
  }
  for (const simbolo of noDeben) {
    if (encontrados.includes(simbolo)) {
      failures.push(`/${afi}/: explica «${simbolo}», que NO está en esa palabra`)
    }
  }
}

if (failures.length > 0) {
  console.error(`\n✗ ${failures.length} caso(s) de coreano fuera de sitio:\n`)
  for (const failure of failures) console.error(`  · ${failure}`)
  console.error('\nNo ajustes el caso esperado para que pase: cada uno es el ejemplo canónico')
  console.error('de su regla en la norma estándar. Si falla, es el motor el que se movió.\n')
  process.exit(1)
}

console.log(`Coreano íntegro: ${CASES.length} palabras y las 8 familias de reglas de 변동 comprobadas.`)
