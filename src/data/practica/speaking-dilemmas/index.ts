import { LEARNING_AND_CULTURE_DILEMMAS } from './learning-and-culture'
import { PILOT_DILEMMA } from './pilot'
import { PUBLIC_LIFE_DILEMMAS } from './public-life'
import { WORK_AND_MEDIA_DILEMMAS } from './work-and-media'

export const NEW_DILEMMAS = [
  ...PUBLIC_LIFE_DILEMMAS,
  ...WORK_AND_MEDIA_DILEMMAS,
  ...LEARNING_AND_CULTURE_DILEMMAS,
]

export const SPEAKING_DILEMMAS = [PILOT_DILEMMA, ...NEW_DILEMMAS]
