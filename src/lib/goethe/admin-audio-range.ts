export interface AudioByteRange {
  start: number
  end: number
}

/** A media player may request a single byte range to read MP4 metadata or seek. */
export function resolveAudioByteRange(header: string | null, size: number): AudioByteRange | null | undefined {
  if (!header) return undefined
  if (!Number.isSafeInteger(size) || size <= 0) return null

  const match = /^bytes=(\d*)-(\d*)$/.exec(header.trim())
  if (!match || (!match[1] && !match[2])) return null

  const first = match[1] ? Number(match[1]) : undefined
  const last = match[2] ? Number(match[2]) : undefined
  if ((first !== undefined && !Number.isSafeInteger(first)) || (last !== undefined && !Number.isSafeInteger(last))) return null

  if (first === undefined) {
    if (!last) return null
    return { start: Math.max(0, size - last), end: size - 1 }
  }
  if (first >= size || (last !== undefined && last < first)) return null
  return { start: first, end: Math.min(last ?? size - 1, size - 1) }
}
