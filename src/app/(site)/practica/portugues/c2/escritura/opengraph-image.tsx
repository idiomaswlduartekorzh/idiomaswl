import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Escrita C2 · Casos do trabalho | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('pt', 'C2')
}
