import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Schreiben B2 · Fälle aus dem Berufsalltag | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('de', 'B2')
}
