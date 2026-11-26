import setOne from '@/data/mocks/ielts-set-1';
import type { SpeakQuestion } from '@/data/mocks/types';
import { getIeltsGuidedSpeakingReference } from '@/data/ielts/guided-speaking-references';

export interface SpeakingRehearsal {
  part: number;
  name: string;
  prompt: string;
  before: string;
  example: string;
  credit: string;
  coaching: string;
  next: string;
  transfer?: string;
}

// Keep the bank on the server. The workshop receives only the three public prompts it teaches.
export function getSpeakingRehearsals(): SpeakingRehearsal[] {
  const questions = setOne.sections
    .filter(section => section.skill === 'speaking')
    .flatMap(section => section.questions)
    .filter((question): question is SpeakQuestion => question.type === 'speak');
  const interview = questions.find(question => question.partNumber === 1)?.followUp;
  const longTurn = questions.find(question => question.partNumber === 2)?.cueCard;
  const discussion = questions.find(question => question.partNumber === 3)?.followUp;
  const cooking = interview?.find(prompt => prompt.includes('enjoy cooking'));
  const food = interview?.find(prompt => prompt.includes('food do you usually eat'));
  const salary = discussion?.find(prompt => prompt.includes('satisfaction or salary'));
  const work = discussion?.find(prompt => prompt.includes('world of work change'));
  const library = 'When I arrived, she was preparing a proposal for a small public library. She showed me an early hand-drawn concept and then the detailed digital model her team had developed from it.';
  const reference = getIeltsGuidedSpeakingReference(1);
  if (!cooking || !food || !longTurn || !salary || !work || !reference.samples['9.0'].transcript.includes(library)) {
    throw new Error('The Set 1 prompts or the studio example have changed. Review the Speaking lesson alongside the new material.');
  }

  return [
    {
      part: 1,
      name: 'Interview',
      prompt: cooking,
      before: 'Think of the last time you cooked. Would what happened that day help a stranger understand your answer?',
      example: 'I do now. At university I used to ring my mum with the rice already on the stove. These days I enjoy making a few meals on Sunday. It’s a lovely feeling to get home late on Tuesday and know dinner’s ready.',
      credit: 'One way to answer',
      coaching: '“Yes, I enjoy it” already answers the question. What I wondered next was why. I can picture the rice on the stove and the call to your mum. By Tuesday’s dinner I understand what’s changed for you. At that point I can ask my next question. Your turn can be that short.',
      next: 'Answer the cooking question a second time. Keep one detail that helps a stranger understand your reason. When you play the two takes, listen for the moment that reason becomes clear.',
      transfer: 'Now try the examiner’s next question, “' + food + '” You can stay in the same kitchen. Tell us which of those Sunday meals you actually eat during the week.',
    },
    {
      part: 2,
      name: 'Long turn',
      prompt: longTurn,
      before: 'Take the minute you would have in the test. Jot down who you visited, one thing you saw them do and how the visit changed your impression. Then speak for one to two minutes.',
      example: library,
      credit: 'Two sentences from the existing Set 1 studio example',
      coaching: 'Listen to the order inside those two sentences. The library gives us a reason to be in the studio. Going from a drawing to a digital model gives us something to follow once we’re there. A note as short as “sketch → model” could bring that whole moment back. For the last line of the cue card, tell us how it felt to see the work up close.',
      next: 'Try your own story again with three notes in front of you. When you reach the moment you remember most clearly, stay there for another sentence. Tell the listener what you saw or heard.',
    },
    {
      part: 3,
      name: 'Discussion',
      prompt: salary,
      before: 'Choose a case in which one of the two matters more. Then think of a change in that person’s circumstances that might alter your answer.',
      example: 'If someone’s struggling to pay the rent, I think salary comes first. A job you love can still keep you awake at night if you can’t cover the bills. Once you earn enough to live on, though, the people you work with can make a bigger difference to your day than a small pay rise.',
      credit: 'One way to develop a view',
      coaching: '“It depends” is a fair first thought. I’d ask what it depends on. Rent gives the listener a reason they can examine. “Once you earn enough” changes one condition, so your second point grows out of the first. You can have a definite view and still explain where it might change.',
      next: 'Answer the salary question again. This time, give one example of a person whose circumstances might change your answer. On replay, can you hear why the example matters?',
      transfer: 'Move to another Set 1 question, “' + work + '” Pick one job and explain a change someone in that job might notice. Then consider whether the same change would matter in a different job.',
    },
  ];
}
