import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Writing B2 · Workplace cases | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('en', 'B2')
}
