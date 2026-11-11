import { createWritingOgImage } from '../../../_writing-og'

export const alt = "Письмо C1 · Рабочие ситуации | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('ru', 'C1')
}
