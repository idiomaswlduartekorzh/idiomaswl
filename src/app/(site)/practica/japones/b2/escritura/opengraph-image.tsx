import { createWritingOgImage } from '../../../_writing-og'

export const alt = "日本語B2ライティング · 職場のケース | WeLearn"
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return createWritingOgImage('ja', 'B2')
}
