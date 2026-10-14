import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const vowels = [
  ['ㅏ', 'a', 'básica'], ['ㅐ', 'ae', 'comp.'], ['ㅑ', 'ya', 'básica'], ['ㅒ', 'yae', 'comp.'], ['ㅓ', 'eo', 'básica'], ['ㅔ', 'e', 'comp.'], ['ㅕ', 'yeo', 'básica'],
  ['ㅖ', 'ye', 'comp.'], ['ㅗ', 'o', 'básica'], ['ㅘ', 'wa', 'comp.'], ['ㅙ', 'wae', 'comp.'], ['ㅚ', 'oe/we', 'comp.'], ['ㅛ', 'yo', 'básica'], ['ㅜ', 'u', 'básica'],
  ['ㅝ', 'wo', 'comp.'], ['ㅞ', 'we', 'comp.'], ['ㅟ', 'wi', 'comp.'], ['ㅠ', 'yu', 'básica'], ['ㅡ', 'eu', 'básica'], ['ㅢ', 'ui', 'comp.'], ['ㅣ', 'i', 'básica'],
]

const consonants = [
  ['ㄱ', 'g/k', 'básica'], ['ㄲ', 'kk', 'tensa'], ['ㄴ', 'n', 'básica'], ['ㄷ', 'd/t', 'básica'], ['ㄸ', 'tt', 'tensa'], ['ㄹ', 'r/l', 'básica'], ['ㅁ', 'm', 'básica'],
  ['ㅂ', 'b/p', 'básica'], ['ㅃ', 'pp', 'tensa'], ['ㅅ', 's', 'básica'], ['ㅆ', 'ss', 'tensa'], ['ㅇ', 'muda/ng', 'básica'], ['ㅈ', 'j', 'básica'], ['ㅉ', 'jj', 'tensa'],
  ['ㅊ', 'ch', 'básica'], ['ㅋ', 'k asp.', 'básica'], ['ㅌ', 't asp.', 'básica'], ['ㅍ', 'p asp.', 'básica'], ['ㅎ', 'h', 'básica'],
]

function cells(items, { width, centerLast = false }) {
  return items.map(([glyph, reading, family], index) => {
    const row = Math.floor(index / 7)
    const countInLastRow = items.length % 7
    const column = index % 7
    const lastOffset = centerLast && row === Math.floor((items.length - 1) / 7) && countInLastRow ? ((7 - countInLastRow) * 96) / 2 : 0
    const x = column * 96 + lastOffset
    const y = row * 138
    const derived = family !== 'básica'
    const fill = derived ? '#fff1f3' : '#eef5ff'
    const border = derived ? '#f1d4da' : '#d8e4f2'
    const color = derived ? '#c60c30' : '#003478'
    const readingSize = reading.length > 5 ? 13 : reading.length > 3 ? 15 : 17
    return `<g transform="translate(${x} ${y})"><rect width="88" height="126" rx="14" fill="${fill}" stroke="${border}"/><text x="44" y="57" font-size="43" fill="${color}">${glyph}</text><text x="44" y="92" font-size="${readingSize}" font-weight="700" fill="#596579">${reading}</text><text x="44" y="113" font-size="11" fill="#798396">${family}</text></g>`
  }).join('\n')
}

function panel({ x, title, note, accent, items, centerLast = false }) {
  return `<g transform="translate(${x} 250)">
    <rect width="720" height="570" rx="26" fill="#fff" stroke="#d4dbe6" stroke-width="3"/>
    <rect width="720" height="70" rx="26" fill="${accent}"/><path d="M0 44h720v26H0z" fill="${accent}"/>
    <text x="28" y="46" font-family="Arial, 'Noto Sans KR', sans-serif" font-size="27" font-weight="700" fill="#fff">${title}</text>
    <text x="690" y="45" text-anchor="end" font-family="Arial, sans-serif" font-size="17" fill="#fff" opacity=".82">${note}</text>
    <g transform="translate(25 94)" font-family="Arial, 'Noto Sans KR', sans-serif" text-anchor="middle">${cells(items, { width: 720, centerLast })}</g>
  </g>`
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1200" viewBox="0 0 1600 1200" role="img" aria-labelledby="title desc">
  <title id="title">Hangeúl A1: los 40 jamo modernos</title>
  <desc id="desc">Tabla visual completa de diecinueve consonantes y veintiuna vocales del hangeúl moderno, con ejemplos de bloques silábicos.</desc>
  <rect width="1600" height="1200" fill="#f7f4ee"/><rect width="1600" height="24" fill="#003478"/><rect x="1210" width="390" height="24" fill="#c60c30"/>
  <text x="72" y="82" font-family="Arial, 'Noto Sans KR', sans-serif" font-size="23" font-weight="700" letter-spacing="4" fill="#c60c30">IDIOMAS WELEARN · COREANO A1</text>
  <text x="72" y="160" font-family="Arial, 'Noto Sans KR', sans-serif" font-size="68" font-weight="800" fill="#003478">Los 40 jamo del hangeúl</text>
  <text x="72" y="205" font-family="Arial, 'Noto Sans KR', sans-serif" font-size="26" fill="#596579">19 consonantes · 21 vocales · formas básicas, tensas y compuestas</text>
  ${panel({ x: 72, title: '21 vocales', note: '10 básicas + 11 compuestas', accent: '#003478', items: vowels })}
  ${panel({ x: 824, title: '19 consonantes', note: '14 básicas + 5 tensas', accent: '#c60c30', items: consonants, centerLast: true })}
  <g transform="translate(72 860)" font-family="Arial, 'Noto Sans KR', sans-serif">
    <text x="0" y="38" font-size="34" font-weight="800" fill="#003478">De jamo a bloque silábico</text>
    <text x="0" y="74" font-size="21" fill="#596579">La forma del bloque cambia con la orientación de la vocal; el batchim ocupa la base.</text>
    <g transform="translate(0 100)">
      <g><rect width="340" height="164" rx="22" fill="#fff" stroke="#d4dbe6" stroke-width="3"/><text x="30" y="43" font-size="17" font-weight="700" fill="#c60c30">VOCAL VERTICAL</text><text x="42" y="119" font-size="53" fill="#596579">ㄱ + ㅏ</text><text x="255" y="122" font-size="70" font-weight="700" fill="#003478">가</text></g>
      <g transform="translate(372)"><rect width="340" height="164" rx="22" fill="#fff" stroke="#d4dbe6" stroke-width="3"/><text x="30" y="43" font-size="17" font-weight="700" fill="#c60c30">VOCAL HORIZONTAL</text><text x="42" y="119" font-size="53" fill="#596579">ㄱ + ㅗ</text><text x="255" y="122" font-size="70" font-weight="700" fill="#003478">고</text></g>
      <g transform="translate(744)"><rect width="340" height="164" rx="22" fill="#fff" stroke="#d4dbe6" stroke-width="3"/><text x="30" y="43" font-size="17" font-weight="700" fill="#c60c30">CON BATCHIM</text><text x="28" y="116" font-size="45" fill="#596579">ㅎ+ㅏ+ㄴ</text><text x="255" y="122" font-size="70" font-weight="700" fill="#003478">한</text></g>
      <g transform="translate(1116)"><rect width="340" height="164" rx="22" fill="#003478"/><text x="30" y="43" font-size="17" font-weight="700" fill="#fff">ORDEN DE ESTUDIO</text><text x="30" y="81" font-size="21" font-weight="700" fill="#fff">24 básicos primero</text><text x="30" y="114" font-size="18" fill="#dce8ff">+ 5 tensas</text><text x="30" y="140" font-size="18" fill="#dce8ff">+ 11 compuestas</text></g>
    </g>
  </g>
  <text x="72" y="1170" font-family="Arial, sans-serif" font-size="18" fill="#7a8496">Material original · Idiomas WeLearn · idiomaswl.com</text>
</svg>`

const here = dirname(fileURLToPath(import.meta.url))
writeFileSync(join(here, '..', 'public', 'downloads', 'coreano-a1', 'idiomaswl-hangul-chart.svg'), svg)
