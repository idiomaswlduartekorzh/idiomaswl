export type StudentSubject =
  | 'icfes'
  | 'fce'
  | 'ielts'
  | 'toefl'
  | 'ingles'
  | 'coreano'
  | 'italiano'
  | 'aleman'
  | 'frances'
  | 'portugues'
  | 'japones'
  | 'ruso'

export const SUBJECT_LABELS: Record<StudentSubject, string> = {
  icfes:     'ICFES Saber 11',
  fce:       'FCE / B2 Inglés',
  ielts:     'IELTS Academic',
  toefl:     'TOEFL iBT',
  ingles:    'Inglés general',
  coreano:   'Coreano',
  italiano:  'Italiano',
  aleman:    'Alemán',
  frances:   'Francés',
  portugues: 'Portugués',
  japones:   'Japonés',
  ruso:      'Ruso',
}
