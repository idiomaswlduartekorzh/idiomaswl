import cafeMorning from '@/data/reading/exercises/en-a1-my-morning-at-the-cafe.json'
import libraryMessage from '@/data/reading/exercises/en-a1-library-book-message.json'
import saturdayBus from '@/data/reading/exercises/en-a1-saturday-bus-guide.json'
import phoneWeekend from '@/data/reading/exercises/en-a2-weekend-without-my-phone.json'
import communityGarden from '@/data/reading/exercises/en-a2-community-garden-email.json'
import fourDayWeek from '@/data/reading/exercises/en-b1-four-day-work-week.json'
import repairCafe from '@/data/reading/exercises/en-b1-neighbourhood-repair-cafe.json'
import birthdayPartyInvite from '@/data/reading/exercises/en-a1-birthday-party-invite.json'
import lostAndFoundMessage from '@/data/reading/exercises/en-a1-lost-and-found-message.json'
import lunchMenu from '@/data/reading/exercises/en-a1-lunch-menu.json'
import morningSchoolNote from '@/data/reading/exercises/en-a1-morning-school-note.json'
import parkCleanupPoster from '@/data/reading/exercises/en-a1-park-cleanup-poster.json'
import petClinicCard from '@/data/reading/exercises/en-a1-pet-clinic-card.json'
import trainPlatformSign from '@/data/reading/exercises/en-a1-train-platform-sign.json'
import cookingClassReminder from '@/data/reading/exercises/en-a2-cooking-class-reminder.json'
import firstJobInterview from '@/data/reading/exercises/en-a2-first-job-interview.json'
import museumAudioGuide from '@/data/reading/exercises/en-a2-museum-audio-guide.json'
import newNeighbourWelcome from '@/data/reading/exercises/en-a2-new-neighbour-welcome.json'
import rainyDayBusChange from '@/data/reading/exercises/en-a2-rainy-day-bus-change.json'
import recyclingCollectionPlan from '@/data/reading/exercises/en-a2-recycling-collection-plan.json'
import schoolExchangeDiary from '@/data/reading/exercises/en-a2-school-exchange-diary.json'
import weekendVolunteerShift from '@/data/reading/exercises/en-a2-weekend-volunteer-shift.json'
import communityEnergyProject from '@/data/reading/exercises/en-b1-community-energy-project.json'
import libraryStudyZones from '@/data/reading/exercises/en-b1-library-study-zones.json'
import localFoodCooperative from '@/data/reading/exercises/en-b1-local-food-cooperative.json'
import onlineCourseCompletion from '@/data/reading/exercises/en-b1-online-course-completion.json'
import publicTransportFareChange from '@/data/reading/exercises/en-b1-public-transport-fare-change.json'
import remoteWorkPilot from '@/data/reading/exercises/en-b1-remote-work-pilot.json'
import urbanTreePlan from '@/data/reading/exercises/en-b1-urban-tree-plan.json'
import workplaceMentoring from '@/data/reading/exercises/en-b1-workplace-mentoring.json'
import koreanCafe from '@/data/reading/exercises/ko-a1-cafe-order.json'
// Francés A1 — blueprint 1.1.0. Generadas desde `src/data/reading/source/fr-a1.mjs`,
// en borrador hasta que pasen revisión de lengua y de pedagogía. Se ven con READING_PREVIEW=1.
import frChatTroisiemeEtage from '@/data/reading/exercises/fr-a1-le-chat-du-troisieme-etage.json'
import frMarcheDuSamedi from '@/data/reading/exercises/fr-a1-le-marche-du-samedi.json'
import frTroisMessages from '@/data/reading/exercises/fr-a1-trois-messages-et-un-retard.json'
import frChambreDeYasmine from '@/data/reading/exercises/fr-a1-la-chambre-de-yasmine.json'
import frColocataireCherche from '@/data/reading/exercises/fr-a1-colocataire-cherche.json'
import frRecetteMamieAicha from '@/data/reading/exercises/fr-a1-la-recette-de-mamie-aicha.json'
import frBus712 from '@/data/reading/exercises/fr-a1-le-bus-de-7h12.json'
import frLettreDeDakar from '@/data/reading/exercises/fr-a1-une-lettre-de-dakar.json'
import frTropDeSel from '@/data/reading/exercises/fr-a1-trop-de-sel.json'
import frPremierJour from '@/data/reading/exercises/fr-a1-le-premier-jour.json'
import { validateReadingExercise } from './validate'
import type { CefrLevel, ReadingExercise, ReadingLanguage, TutorLocale } from './types'

const RAW_EXERCISES: unknown[] = [
  cafeMorning,
  libraryMessage,
  saturdayBus,
  morningSchoolNote,
  petClinicCard,
  parkCleanupPoster,
  lunchMenu,
  lostAndFoundMessage,
  trainPlatformSign,
  birthdayPartyInvite,
  phoneWeekend,
  communityGarden,
  rainyDayBusChange,
  newNeighbourWelcome,
  cookingClassReminder,
  schoolExchangeDiary,
  recyclingCollectionPlan,
  weekendVolunteerShift,
  museumAudioGuide,
  firstJobInterview,
  fourDayWeek,
  repairCafe,
  libraryStudyZones,
  remoteWorkPilot,
  communityEnergyProject,
  urbanTreePlan,
  onlineCourseCompletion,
  localFoodCooperative,
  workplaceMentoring,
  publicTransportFareChange,
  koreanCafe,
  frChatTroisiemeEtage,
  frMarcheDuSamedi,
  frTroisMessages,
  frChambreDeYasmine,
  frColocataireCherche,
  frRecetteMamieAicha,
  frBus712,
  frLettreDeDakar,
  frTropDeSel,
  frPremierJour,
]

export const READING_EXERCISES: ReadingExercise[] = RAW_EXERCISES.map((candidate) => {
  validateReadingExercise(candidate)
  return candidate
})

export function isReadingPreviewEnabled() {
  return process.env.READING_PREVIEW === '1'
}

export function availableExercises(locale: TutorLocale) {
  return READING_EXERCISES.filter((exercise) =>
    exercise.tutorLocales.includes(locale) &&
    (exercise.status === 'published' || isReadingPreviewEnabled())
  )
}

export function findReadingExercise(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel, slug: string) {
  return availableExercises(locale).find((exercise) =>
    exercise.language === language && exercise.level.cefr === level && exercise.slug === slug
  )
}

export function findReadingHubExercises(locale: TutorLocale, language: ReadingLanguage, level: CefrLevel) {
  return availableExercises(locale).filter((exercise) => exercise.language === language && exercise.level.cefr === level)
}

export function publishedReadingExercises() {
  return READING_EXERCISES.filter((exercise) => exercise.status === 'published' && exercise.seo.indexable)
}
