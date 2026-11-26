import Link from 'next/link';
import { TASK2_PROMPT_BANK } from './tarea-completa/task2-prompt-bank';
import styles from './introduccion/page.module.css';

// The questions come from the same bank the learner will open to write the complete essay.
const decisions = [
  {
    id: 'opinion--public-transport', route: 'opinion',
    question: 'Which words ask you to make a comparison?',
    reading: '“More money … than on new roads” matters. You could fill a paragraph with reasons buses are useful and still leave the spending decision unanswered. Take one crowded street. More frequent buses could carry extra passengers along it. Widening the road would need land on either side. Now the example helps you explain which investment you favour and why.',
    transfer: 'In your next opinion essay, read your example with the opposing choice in mind. Would a reader understand why your choice works better in the situation you describe?',
  },
  {
    id: 'discussion--museum-funding', route: 'discussion',
    question: 'What would a reasonable person on the other side say?',
    reading: 'Think about a parent taking three children to a museum. Admission charges add up quickly, which gives the free-entry argument a reason. Now take the curator’s side. Tickets can help pay the staff who conserve the exhibits. Once both arguments have had a fair hearing, you can explain which costs you would pass on to visitors and why.',
    transfer: 'Read just the two body paragraphs. Could someone who disagrees with you recognise their position? Then find the sentence that gives your own judgement.',
  },
  {
    id: 'problem-solution--rural-depopulation', route: 'problem-solution',
    question: 'Does the first question ask why people moved?',
    reading: '“What problems does this cause?” takes the move as its starting point. Better wages in a city might explain a young adult’s decision to leave. They tell us little about what happens in the village afterwards. If a smaller population can no longer support a daily bus, residents who stay may struggle to reach a clinic. A shared transport service would address that particular difficulty.',
    transfer: 'Pair each proposed measure with one problem you have already explained. If the two paragraphs could describe different places with different difficulties, check the pairing.',
  },
  {
    id: 'advantages-disadvantages--working-from-home', route: 'advantages-disadvantages',
    question: 'What would persuade you that one side carries more weight?',
    reading: 'A count of the pros and cons leaves “outweigh” unanswered. Picture a worker who can do the job from home but faces an inaccessible commute. Keeping that job can matter more than the inconvenience of arranging meetings online. Another job might depend on being together every day. Naming the kind of work makes your judgement easier to defend.',
    transfer: 'In a plain advantages-and-disadvantages prompt, explain each side. When the writer asks whether one outweighs the other, add the reason your comparison tips that way.',
  },
  {
    id: 'direct-questions--news-consumption', route: 'direct-question',
    question: 'Which part of the question does the phone alert answer?',
    reading: 'A phone alert during a commute helps explain why social media has become a convenient news source. It tells you very little about whether the story is true. For the second question, follow that same reader as they open the original report, check its date and compare it with another independent account.',
    transfer: 'Put the two questions above your plan. Read the first sentence of each body paragraph aloud. You should hear an answer to each question.',
  },
] as const;

export default function Task2PlanningExamples() {
  return (
    <div className={styles.studyGrid}>
      {decisions.map((decision) => {
        const prompt = TASK2_PROMPT_BANK.find((item) => item.id === decision.id);
        if (!prompt) throw new Error(`Writing teaching example is missing its source prompt: ${decision.id}`);
        return (
          <article className={styles.pathCard} key={decision.id}>
            <h3>{prompt.familyLabel}</h3>
            <p>{prompt.prompt}</p>
            <details className={styles.planRecall}>
              <summary>{decision.question}</summary>
              <p>{decision.reading}</p>
              <p>{decision.transfer}</p>
            </details>
            <Link href={`/practica/ielts/academic/writing/task2/${decision.route}`}>Practise this question type →</Link>
          </article>
        );
      })}
    </div>
  );
}
