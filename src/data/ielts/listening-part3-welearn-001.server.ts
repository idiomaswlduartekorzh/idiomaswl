import 'server-only';

import { resolveAudioUrl } from '@/lib/examAudio';
import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  type IeltsListeningPracticeSource,
} from '@/lib/ielts/listening-practice-contract';

const SOURCE: IeltsListeningPracticeSource = {
  id: 'welearn-listening-part-3-001',
  contentVersion: '2026-09-01.draft.1',
  part: 3,
  practiceNumber: 1,
  title: 'Mereford Ensemble Feedback Trial',
  scenario: 'Two music students review a rehearsal-feedback activity with their course tutor and allocate the next-stage work.',
  instructions: 'Listen and answer Questions 21–30. You may replay the recording in this WeLearn practice mode.',
  transcript: `DR HARLOW: Thanks for coming, Lara and Jonah. I read your notes from the Mereford first-year ensemble session. Let’s review what happened before we plan the second trial.

LARA: We tested the rehearsal feedback cards with twenty-four students. After listening to a short performance, each student chose one of three headings and wrote a brief observation.

JONAH: The headings were timing, balance and entries. We explained that balance meant whether every musical part could be heard clearly, while an entry was the moment a player began after a pause.

DR HARLOW: And what did you expect the cards to produce?

LARA: We expected comments to be spread fairly evenly across all three headings.

JONAH: But eighteen of the twenty-four cards only said that a section should play louder or more quietly. Volume was simply the easiest feature for listeners to notice.

LARA: It wasn’t a timing problem. Everyone finished within the minute we allowed, and the students wrote the comments themselves rather than relying on the tutor.

DR HARLOW: So the trial showed that the original cards encouraged attention to one obvious feature instead of a wider range of musical details.

DR HARLOW: How did the colour system work?

LARA: We printed timing on blue cards, balance on green cards and entries on amber cards.

JONAH: The print stayed clear under the rehearsal-room lights, and the card bundles were easy to find on every table.

LARA: The difficulty was the meaning students gave the colours. Several treated green as a compliment and amber as a warning, as if the cards were judging whether the performance was good or bad.

DR HARLOW: Then remove the colours. Use plain black headings and add a one-line question under each heading so that students focus on the topic rather than inventing a rating system.

DR HARLOW: When do you intend to collect the next set of comments?

JONAH: My first thought was an online form completed the following day.

LARA: I wondered whether we should collect everything at the end of the full rehearsal, which lasts about fifty minutes.

DR HARLOW: Both options leave too much time between listening and responding. After each four-minute performance, allow ninety seconds for students to complete one card. Collect the cards before anyone discusses the performance.

JONAH: That should keep the comments connected to what they have just heard.

DR HARLOW: What exactly will you compare in the second trial?

LARA: We considered comparing comments from different groups of instruments.

JONAH: Another possibility was to compare anonymous cards with cards carrying the writer’s name.

DR HARLOW: Either choice would introduce a new variable. Have the ensemble perform the same short passage twice. Discuss the first set of cards between performances, then compare whether the same musical issue is still present in the second performance.

LARA: So the comparison is between the first and second versions of one passage, not between different students or instruments.

DR HARLOW: Exactly. What evidence should be central to your report?

LARA: The total number of cards returned will be easy to count.

JONAH: We also planned one question asking whether students enjoyed the activity.

DR HARLOW: Keep those as supporting information. Your main evidence should show whether the problem identified after the first performance is reduced in the repeated performance.

JONAH: For example, if several cards say that players begin at different moments, we should check whether they begin more closely together the second time.

DR HARLOW: Correct. Now let’s assign the remaining work. First, the category headings need simpler wording.

JONAH: I can shorten them, although Lara has already tried a few alternatives.

LARA: I drafted questions such as “Do the players begin together?” and “Can every part be heard?” I’m happy to finish that work.

DR HARLOW: Given that preparation, Lara should take the headings forward and turn those drafts into the final set.

DR HARLOW: Next, we need two short passages that can each be performed twice without taking too much rehearsal time.

LARA: I don’t have the complete rehearsal score.

JONAH: I do, and I marked three possible passages yesterday. I can select two and time them before Friday.

DR HARLOW: Then Jonah, bring me two timed extracts by Friday.

DR HARLOW: The consent wording also needs checking because the students’ comments will be used in your course report.

JONAH: Can one of us approve that?

DR HARLOW: No. It has to be checked by the course tutor. I’ll review the wording and confirm that no student names are collected.

LARA: So that remains your task, Dr Harlow.

DR HARLOW: Yes. Who will manage the cards during the next rehearsal?

LARA: I’ll be playing in the demonstration group, so I can’t move around collecting them.

JONAH: I’m not performing in that session. I can put the cards on the tables, collect them after each performance and keep the two sets separate.

DR HARLOW: Jonah, you’ll handle the rehearsal materials and keep both rounds apart.

DR HARLOW: Finally, we need one summary visual for the report.

JONAH: I’ll already be timing the passages and organising the cards.

LARA: I can design the visual. I’ll show the first and second performances side by side, using the same categories for both.

DR HARLOW: Excellent. Lara, take responsibility for presenting that comparison visually. Bring the revised cards and passages to me on Friday, and we’ll confirm whether everything is ready.`,
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-3-001.mp3',
    durationSeconds: 0,
    sha256: '0000000000000000000000000000000000000000000000000000000000000000',
  },
  groups: [
    {
      type: 'single-choice',
      id: 'feedback-card-review',
      questionRange: [21, 25],
      instruction: 'Select one option, A, B or C, for each question.',
      questions: [
        {
          number: 21,
          prompt: 'What did the first trial reveal about the original feedback cards?',
          options: [
            { key: 'A', label: 'Students concentrated mainly on volume.' },
            { key: 'B', label: 'Students needed too long to complete them.' },
            { key: 'C', label: 'The tutor supplied most of the comments.' },
          ],
          correctOptionKey: 'A',
          expected: 'A',
          explanation: 'Eighteen of twenty-four comments concerned playing louder or more quietly. Students finished within the allotted minute and wrote their own comments.',
        },
        {
          number: 22,
          prompt: 'What problem did the colour system cause?',
          options: [
            { key: 'A', label: 'The text became difficult to read.' },
            { key: 'B', label: 'Students interpreted the colours as judgments of quality.' },
            { key: 'C', label: 'Students could not locate the correct cards.' },
          ],
          correctOptionKey: 'B',
          expected: 'B',
          explanation: 'The printing and card locations were satisfactory. Students treated green as praise and amber as a warning rather than as topic labels.',
        },
        {
          number: 23,
          prompt: 'When will feedback be collected in the second trial?',
          options: [
            { key: 'A', label: 'Immediately after each short performance.' },
            { key: 'B', label: 'At the end of the complete rehearsal.' },
            { key: 'C', label: 'Through an online form the following day.' },
          ],
          correctOptionKey: 'A',
          expected: 'A',
          explanation: 'Dr Harlow rejects the delayed alternatives and requires ninety seconds of writing after each four-minute performance.',
        },
        {
          number: 24,
          prompt: 'Which comparison does Dr Harlow approve?',
          options: [
            { key: 'A', label: 'Comments about different groups of instruments.' },
            { key: 'B', label: 'Anonymous comments versus signed comments.' },
            { key: 'C', label: 'The first and second performances of the same passage.' },
          ],
          correctOptionKey: 'C',
          expected: 'C',
          explanation: 'The other comparisons introduce new variables. The approved design repeats the same passage after the first comments have been discussed.',
        },
        {
          number: 25,
          prompt: 'What should be the main evidence in the report?',
          options: [
            { key: 'A', label: 'The total number of cards returned.' },
            { key: 'B', label: 'Whether an identified problem is reduced in the repeated performance.' },
            { key: 'C', label: 'Students’ enjoyment ratings.' },
          ],
          correctOptionKey: 'B',
          expected: 'B',
          explanation: 'Card totals and enjoyment are supporting information. The central evidence is whether the same musical problem is reduced in the repeated performance.',
        },
      ],
    },
    {
      type: 'matching',
      id: 'rehearsal-action-plan',
      questionRange: [26, 30],
      instruction: 'Match each action with the person responsible. Choose A, B or C. You may use each letter more than once.',
      optionReuse: 'may-repeat',
      options: [
        { key: 'A', label: 'Lara' },
        { key: 'B', label: 'Jonah' },
        { key: 'C', label: 'Dr Harlow' },
      ],
      questions: [
        {
          number: 26,
          prompt: 'Make the feedback headings easier to understand',
          correctOptionKey: 'A',
          explanation: 'Lara has drafted plain-language questions, so Dr Harlow asks her to turn those drafts into the final heading set.',
        },
        {
          number: 27,
          prompt: 'Prepare suitable extracts for the next rehearsal',
          correctOptionKey: 'B',
          explanation: 'Jonah has the full score and marked candidates, so Dr Harlow asks him to bring two timed extracts.',
        },
        {
          number: 28,
          prompt: 'Ensure the participation wording is approved',
          correctOptionKey: 'C',
          explanation: 'Neither student can approve the wording. Dr Harlow says the approval remains her task and will protect anonymity.',
        },
        {
          number: 29,
          prompt: 'Organise the trial materials during the rehearsal',
          correctOptionKey: 'B',
          explanation: 'Lara will perform and cannot move around. Jonah is free to handle the cards and keep the two rounds separate.',
        },
        {
          number: 30,
          prompt: 'Create the graphic for the written report',
          correctOptionKey: 'A',
          explanation: 'Jonah already has two operational tasks. Lara offers a side-by-side display and is assigned to present the comparison visually.',
        },
      ],
    },
  ],
};

export function getIeltsListeningPart3Practice() {
  const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;
  return projectIeltsListeningPractice(SOURCE, resolved);
}

export function getIeltsListeningPart3Identity() {
  return {
    id: SOURCE.id,
    contentVersion: SOURCE.contentVersion,
    part: SOURCE.part,
    practiceNumber: SOURCE.practiceNumber,
  } as const;
}

export function getIeltsListeningPart3QuestionNumbers() {
  return ieltsListeningQuestionNumbers(SOURCE);
}

export function getIeltsListeningPart3ResponseSpecs() {
  return ieltsListeningResponseSpecs(SOURCE);
}

export function scoreIeltsListeningPart3Practice(responses: Readonly<Record<string, string>>) {
  return scoreIeltsListeningPractice(SOURCE, responses);
}

export function scoreIeltsListeningPart3Registration(responses: Readonly<Record<string, string>>) {
  return {
    identity: getIeltsListeningPart3Identity(),
    result: scoreIeltsListeningPart3Practice(responses),
  } as const;
}
