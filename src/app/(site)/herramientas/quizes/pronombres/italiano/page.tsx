import type { Metadata } from 'next'

import { GrammarLessonSchema, QuizSchema } from '@/components/practica/EducationSchema'
import PronounQuestEngine from '@/components/practica/PronounQuestEngine'
import { ITALIAN_PRONOUN_QUEST } from '@/data/practica/italian-pronoun-quest'

const URL = 'https://www.idiomaswl.com/herramientas/quizes/pronombres/italiano'

export const metadata: Metadata = {
  title: 'Quiz de pronombres en italiano — 6 niveles',
  description: 'Practica pronombres sujeto, demostrativos, posesivos, directos, indirectos, reflexivos y combinados en italiano.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'La catena dei pronomi — Quiz de italiano',
    description: 'Elige familias de pronombres y completa seis niveles autocorregibles sin respuestas abiertas.',
    url: URL,
    type: 'website',
    siteName: 'Idiomas WeLearn',
    locale: 'es_CO',
  },
}

export default function ItalianPronounQuizPage() {
  return <>
    <GrammarLessonSchema
      course={{ name: 'Quizes de Italiano', url: 'https://www.idiomaswl.com/herramientas/quizes/pronombres' }}
      description="Quiz configurable para practicar referente, función, concordancia y posición de los pronombres italianos."
      educationalLevel="A1, A2, B1"
      inLanguage="it"
      keywords={['pronombres italiano', 'pronomi diretti', 'pronomi indiretti', 'pronomi combinati', 'posesivos italiano']}
      name="La catena dei pronomi — Quiz acumulativo de pronombres"
      url={URL}
    />
    <QuizSchema description="Quiz cerrado de seis niveles sobre pronombres italianos, con resultados al finalizar cada nivel." name="La catena dei pronomi" url={URL}/>
    <PronounQuestEngine config={ITALIAN_PRONOUN_QUEST} languageSlug="italiano"/>
  </>
}
