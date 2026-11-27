import { buildClockTopic } from './build'
import { type AdditionalClockLanguage } from './catalog'
import ingles from './ingles'
import frances from './frances'
import italiano from './italiano'
import portugues from './portugues'
import coreano from './coreano'
import japones from './japones'
import ruso from './ruso'

const copy = { ingles, frances, italiano, portugues, coreano, japones, ruso }

export function getClockLesson(language: AdditionalClockLanguage) {
  return { topic: buildClockTopic(language, copy[language]), reference: copy[language].reference }
}
