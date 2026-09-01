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
  id: 'welearn-listening-part-4-001',
  contentVersion: '2026-09-01.draft.1',
  part: 4,
  practiceNumber: 1,
  title: 'From Fuzz to Wear-Off: Understanding Fabric Pilling',
  scenario: 'A textile-science lecturer explains how fabric pills develop and how treated samples should be compared.',
  instructions: 'Listen and answer Questions 31–40. You may replay the recording in this WeLearn practice mode.',
  transcript: `Today we will examine why the number of visible fabric pills can rise and then fall during repeated wear. A simple count cannot by itself show how readily pills form, because older pills may also disappear.

Let us begin with the first stage. Many woven and knitted fabrics use staple-fibre yarns, so some fibre ends lie near the yarn exterior. During ordinary use, rubbing loosens some of those ends without removing them. It draws them above the fabric surface and produces a fine exposed layer called fuzz. The ends remain part of the yarn, although they now project from it.

Once fuzz is present, further friction moves the raised ends in several directions. That force can act during washing; it also occurs when a sleeve rubs against a desk or a bag moves across a coat. Heat is not required for neighbouring ends to meet and cross.

As those ends cross, they catch one another. Continued movement tightens the loose material into a small ball. The new cluster is visible, although untangled fuzz may still surround it, and it can tighten further as rubbing continues.

The new pill does not simply sit on top of the cloth. Several fibres usually remain unbroken and run back into the yarn. These anchor fibres keep the pill attached to the material. This connection allows the cluster to survive further wear even after the surrounding loose fuzz has disappeared.

That connection does not always last. Continued rubbing may pull an anchor out or cause it to break. When the remaining anchors fail, the pill can detach from the cloth. Fewer visible pills after prolonged wear do not therefore prove that no new ones formed; some may have appeared earlier and already worn away.

We can now see why two materials may look different even when they initially produce similar amounts of fuzz. Fibre strength affects the time for which a pill remains visible. Strong anchors resist breaking, so a cluster can stay on the cloth for longer, while weak anchors may release it sooner. Pill persistence and initial fuzz production are therefore separate properties.

Next, consider how researchers rate the samples. Counting the pills seems objective, and the count is useful, but it is not sufficient by itself. Ten tiny pills that are close in colour to the cloth may be less noticeable than ten large, pale pills on a dark sample. A simple count ignores both size and colour contrast. These visual properties can strongly influence the grade an observer gives.

Photography helps researchers keep a record, but only when the conditions are controlled. Every sample should be photographed with the same lighting. A lamp placed too low can create deep shadows around the pills and make the surface look more severely damaged, while moving the lamp can flatten those shadows. Controlled photography prevents that artificial change in appearance.

Distance and camera angle should also remain fixed so images from different days can be compared fairly. Magnified images may support a separate analysis, but they are not part of this study’s standard visual record.

Suppose students want to compare two finishing treatments. They should begin with equivalent specimens cut from the same batch of fabric. For this trial, every specimen must pass through the same washing procedure before it is rated. One group cannot be washed gently while another is exposed to hotter water or a longer wash, because that would mix the effect of treatment with the effect of washing.

Students should not remove existing pills before rating, and specimen dimensions and fabric construction must remain consistent. Otherwise the result may reflect uncontrolled sample differences rather than the finishing treatment.

A visual grade records appearance at one moment; it neither predicts garment life nor proves that washing caused the damage.

The main conclusion is that visible pilling reflects a balance. On one side, loose fibres are exposed and gathered into new pills. On the other, older pills lose their anchors and disappear through wear-off. A material can look badly pilled because formation is rapid, because wear-off is slow, or because both processes occur together. Understanding these two rates is essential before we compare treatments or judge the quality of a fabric.`,
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-4-001.mp3',
    durationSeconds: 0,
    sha256: '0000000000000000000000000000000000000000000000000000000000000000',
  },
  groups: [
    {
      type: 'note-completion',
      id: 'fabric-pilling-lecture-notes',
      questionRange: [31, 40],
      instruction: 'Complete the notes. Write ONE WORD ONLY for each answer.',
      title: 'Fabric pilling: formation and assessment',
      maxWords: 1,
      sections: [
        {
          heading: 'How a pill develops',
          lines: [
            { type: 'text', indent: 0, text: 'Ordinary use causes a sequence of changes in loose fibre ends.' },
            {
              type: 'blank',
              indent: 1,
              before: 'Rubbing brings loose ends above the fabric',
              blank: {
                number: 31,
                acceptedAnswers: ['surface'],
                expected: 'surface',
                explanation: 'The lecturer says repeated rubbing draws loosened fibre ends above the fabric surface.',
                maxWords: 1,
              },
              after: '.',
            },
            {
              type: 'blank',
              indent: 1,
              before: 'The physical force moving the exposed ends in different directions is',
              blank: {
                number: 32,
                acceptedAnswers: ['friction'],
                expected: 'friction',
                explanation: 'Further friction, rather than heat, moves the exposed ends in different directions.',
                maxWords: 1,
              },
              after: '.',
            },
            {
              type: 'blank',
              indent: 1,
              before: 'The tangled material takes the shape of a small',
              blank: {
                number: 33,
                acceptedAnswers: ['ball'],
                expected: 'ball',
                explanation: 'The loose fibre ends catch one another and tighten into a compact ball.',
                maxWords: 1,
              },
              after: '.',
            },
            {
              type: 'blank',
              indent: 1,
              before: 'Anchor fibres leave the pill',
              blank: {
                number: 34,
                acceptedAnswers: ['attached'],
                expected: 'attached',
                explanation: 'Unbroken fibres run back into the yarn and keep the new pill attached to the cloth.',
                maxWords: 1,
              },
              after: 'to the cloth.',
            },
            {
              type: 'blank',
              indent: 1,
              before: 'After its anchors fail, the pill can',
              blank: {
                number: 35,
                acceptedAnswers: ['detach'],
                expected: 'detach',
                explanation: 'Once the remaining anchor fibres break or pull out, the pill can detach from the cloth.',
                maxWords: 1,
              },
              after: 'from the cloth.',
            },
          ],
        },
        {
          heading: 'Why visual ratings can vary',
          lines: [
            {
              type: 'blank',
              indent: 0,
              before: 'Fibre',
              blank: {
                number: 36,
                acceptedAnswers: ['strength'],
                expected: 'strength',
                explanation: 'The lecturer explains that fibre strength affects how long a pill remains visible.',
                maxWords: 1,
              },
              after: 'affects how long a pill remains visible.',
            },
            {
              type: 'blank',
              indent: 0,
              before: 'A count overlooks pill size and colour',
              blank: {
                number: 37,
                acceptedAnswers: ['contrast'],
                expected: 'contrast',
                explanation: 'Samples with equal counts can look different because pill size and colour contrast also affect their appearance.',
                maxWords: 1,
              },
              after: '.',
            },
            {
              type: 'blank',
              indent: 0,
              before: 'Identical',
              blank: {
                number: 38,
                acceptedAnswers: ['lighting'],
                expected: 'lighting',
                explanation: 'Using the same lighting prevents changing shadows from altering the apparent severity.',
                maxWords: 1,
              },
              after: 'from the lamps prevents shadows from changing the apparent severity.',
            },
            {
              type: 'blank',
              indent: 0,
              before: 'All specimens need the same washing',
              blank: {
                number: 39,
                acceptedAnswers: ['procedure'],
                expected: 'procedure',
                explanation: 'Every specimen must undergo the same washing procedure before two finishing treatments are compared.',
                maxWords: 1,
              },
              after: 'before treatments are compared.',
            },
          ],
        },
        {
          heading: 'Interpreting the result',
          lines: [
            { type: 'text', indent: 0, text: 'A visual grade describes one moment and does not predict a garment’s useful life.' },
            {
              type: 'blank',
              indent: 0,
              before: 'Visible pilling reflects the',
              blank: {
                number: 40,
                acceptedAnswers: ['balance'],
                expected: 'balance',
                explanation: 'The conclusion describes visible pilling as a balance between new pill formation and the loss of older pills.',
                maxWords: 1,
              },
              after: 'between formation and wear-off.',
            },
          ],
        },
      ],
    },
  ],
};

export function getIeltsListeningPart4Practice() {
  const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;
  return projectIeltsListeningPractice(SOURCE, resolved);
}

export function getIeltsListeningPart4Identity() {
  return {
    id: SOURCE.id,
    contentVersion: SOURCE.contentVersion,
    part: SOURCE.part,
    practiceNumber: SOURCE.practiceNumber,
  } as const;
}

export function getIeltsListeningPart4QuestionNumbers() {
  return ieltsListeningQuestionNumbers(SOURCE);
}

export function getIeltsListeningPart4ResponseSpecs() {
  return ieltsListeningResponseSpecs(SOURCE);
}

export function scoreIeltsListeningPart4Practice(responses: Readonly<Record<string, string>>) {
  return scoreIeltsListeningPractice(SOURCE, responses);
}

export function scoreIeltsListeningPart4Registration(responses: Readonly<Record<string, string>>) {
  return {
    identity: getIeltsListeningPart4Identity(),
    result: scoreIeltsListeningPart4Practice(responses),
  } as const;
}
