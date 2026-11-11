import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Scrittura C2 · Casi di lavoro | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('it', 'C2')
}
