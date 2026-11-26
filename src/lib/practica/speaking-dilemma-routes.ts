export const SPEAKING_C1_PATH = '/practica/ingles/c1/habla'
export const DILEMMA_BASE_PATH = `${SPEAKING_C1_PATH}/dilemas`
export const DILEMMA_COLLECTION_PATH = `${DILEMMA_BASE_PATH}/temas`
export const PILOT_DILEMMA_SLUG = 'academic-merit'

export function dilemmaPath(slug: string) {
  return slug === PILOT_DILEMMA_SLUG ? DILEMMA_BASE_PATH : `${DILEMMA_BASE_PATH}/${slug}`
}
