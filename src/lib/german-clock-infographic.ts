import type { ClockExample } from '@/data/grammar/types'

function xml(value: string) {
  return value.replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char] ?? char)
}

function position(cx: number, cy: number, degrees: number, radius: number) {
  const radians = ((degrees - 90) * Math.PI) / 180
  return { x: (cx + Math.cos(radians) * radius).toFixed(2), y: (cy + Math.sin(radians) * radius).toFixed(2) }
}

function textLines(value: string, x: number, firstBaseline: number, maxCharacters: number, lineHeight: number) {
  const lines: string[] = []
  for (const word of value.split(/\s+/)) {
    const last = lines.length - 1
    if (last >= 0 && lines[last].length + word.length + 1 <= maxCharacters) {
      lines[last] += ` ${word}`
    } else {
      lines.push(word)
    }
  }
  return lines.map((line, i) => `<tspan x="${x}" y="${firstBaseline + i * lineHeight}">${xml(line)}</tspan>`).join('')
}

function clockSvg(example: ClockExample, x: number, y: number) {
  const cx = x + 73
  const cy = y + 94
  const hour = position(cx, cy, ((example.hour % 12) + example.minute / 60) * 30, 24)
  const minute = position(cx, cy, example.minute * 6, 34)
  const ticks = Array.from({ length: 12 }, (_, index) => {
    const inner = position(cx, cy, index * 30, 48)
    const outer = position(cx, cy, index * 30, 54)
    return `<line x1="${inner.x}" y1="${inner.y}" x2="${outer.x}" y2="${outer.y}" stroke="#302c25" stroke-width="2" stroke-linecap="round"/>`
  }).join('')
  const numerals = Array.from({ length: 12 }, (_, index) => {
    const number = index + 1
    const p = position(cx, cy, number * 30, 42)
    return `<text x="${p.x}" y="${p.y}" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="700" fill="#302c25">${number}</text>`
  }).join('')
  const labelX = x + 148

  return `<g>
    <rect x="${x}" y="${y}" width="360" height="188" rx="18" fill="#fffdf8" stroke="#d6c8aa" stroke-width="2"/>
    <circle cx="${cx}" cy="${cy}" r="57" fill="#fffdf5" stroke="#242424" stroke-width="3"/>
    ${ticks}${numerals}
    <line x1="${cx}" y1="${cy}" x2="${hour.x}" y2="${hour.y}" stroke="#244363" stroke-width="6" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${minute.x}" y2="${minute.y}" stroke="#ba4a32" stroke-width="3.5" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="4" fill="#242424"/>
    <text x="${labelX}" y="${y + 63}" font-size="19" font-weight="700" fill="#805516">${xml(example.digital)}</text>
    <text lang="de" font-size="20" font-weight="700" fill="#171717">${textLines(example.spoken, labelX, y + 94, 19, 21)}</text>
    <text lang="es" font-size="16" fill="#4e4638">${textLines(example.meaning, labelX, y + 128, 25, 18)}</text>
  </g>`
}

export function germanClockInfographic(examples: ClockExample[]) {
  const cards = examples.slice(0, 6).map((example, index) => clockSvg(example, 40 + (index % 3) * 380, 170 + Math.floor(index / 3) * 205)).join('')
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-labelledby="title description" font-family="Arial, Helvetica, sans-serif">
    <title id="title">Leer relojes y decir la hora en alemán A1</title>
    <desc id="description">Seis relojes analógicos muestran 03:00, 03:05, 03:15, 03:30, 03:45 y 03:55 con sus expresiones en alemán.</desc>
    <rect width="1200" height="630" fill="#fff9e8"/>
    <rect width="1200" height="12" fill="#d7a300"/>
    <text x="40" y="56" font-size="18" font-weight="800" fill="#856100">WELEARN · DEUTSCH A1</text>
    <text x="40" y="109" font-size="42" font-weight="800" fill="#171717">Die Uhrzeit · la hora</text>
    <text x="40" y="142" font-size="21" fill="#4e4638">Lee las manecillas y compara <tspan font-weight="700">nach · halb · vor</tspan></text>
    ${cards}
    <line x1="40" y1="588" x2="1160" y2="588" stroke="#ddc987"/>
    <text x="40" y="615" font-size="15" fill="#4e4638">Aguja corta azul · Aguja larga roja · <tspan font-weight="700">halb vier = 03:30</tspan></text>
    <text x="1160" y="615" text-anchor="end" font-size="15" font-weight="700" fill="#856100">idiomaswl.com</text>
  </svg>`
}
