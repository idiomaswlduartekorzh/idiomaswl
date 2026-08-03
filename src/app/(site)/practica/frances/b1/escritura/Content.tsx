import IntegratedWritingPractice from '@/components/practica/IntegratedWritingPractice'
import { getIntegratedWritingExercise } from '@/data/practica/writing-integrated'

export default function Content() {
  return <IntegratedWritingPractice exercise={getIntegratedWritingExercise('frances', 'b1')} />
}
