import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Expression écrite C1 · Situations professionnelles | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('fr', 'C1')
}
