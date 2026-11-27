import SpeakingDilemmaHub, { speakingDilemmaHubMetadata } from '@/components/practica/speaking-dilemmas/SpeakingDilemmaHub'

export const metadata = speakingDilemmaHubMetadata('b2')

export default function Page() {
  return <SpeakingDilemmaHub level="b2" />
}
