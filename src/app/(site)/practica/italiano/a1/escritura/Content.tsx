import IntegratedWritingPractice from '@/components/practica/IntegratedWritingPractice'
import { getIntegratedWritingExercises } from '@/data/practica/writing-integrated'

export default function Content() {
  return <IntegratedWritingPractice exercises={getIntegratedWritingExercises('italiano', 'a1')} />
}
