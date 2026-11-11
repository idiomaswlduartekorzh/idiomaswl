import { createWritingOgImage } from '../../../_writing-og'

export const alt = "한국어 C2 쓰기 · 직장 사례 | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('ko', 'C2')
}
