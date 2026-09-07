import PracticeSetCatalog, {
  type PracticeSetSummary,
} from '@/components/exam-practice/PracticeSetCatalog';
import type { PracticeSection } from '@/components/exam-practice/PracticeRouteShell';

type Props = {
  section: Exclude<PracticeSection, 'neutral'>;
  task: string;
  description: string;
  sets: readonly PracticeSetSummary[];
};

/** TOEFL preset for the reusable practice catalog template. */
export default function ToeflPracticeSetCatalog({ section, task, description, sets }: Props) {
  return (
    <PracticeSetCatalog
      product="TOEFL"
      section={section}
      task={task}
      description={description}
      sets={sets}
    />
  );
}
