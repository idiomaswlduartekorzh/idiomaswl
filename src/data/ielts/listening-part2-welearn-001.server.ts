import 'server-only';

import { resolveAudioUrl } from '@/lib/examAudio';
import {
  ieltsListeningQuestionNumbers,
  ieltsListeningResponseSpecs,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  type IeltsListeningPracticeSource,
} from '@/lib/ielts/listening-practice-contract';

// Candidate only. Audio duration and checksum deliberately remain non-release-ready
// until the generated MP3 passes human listening review and is promoted from docs/.
const SOURCE: IeltsListeningPracticeSource = {
  id: 'welearn-listening-part-2-001',
  contentVersion: '2026-09-01.draft.2',
  part: 2,
  practiceNumber: 1,
  title: 'Larkspur Fix & Share Day',
  scenario: 'A community repair-centre coordinator welcomes visitors and explains the building layout.',
  instructions: 'Listen and answer Questions 11–20. You may replay the recording in this WeLearn practice mode.',
  transcript: `COORDINATOR: Good morning, everyone, and welcome to the Larkspur Repair House. My name is Amira Cole, and I coordinate our Saturday Fix and Share Day. Before you choose a work table, I’ll explain how the morning runs, what your booking covers, and where the main rooms are.

The front doors open at nine o’clock, which gives you time to put away coats and check the noticeboard. I’ll give a short welcome at quarter past nine. The practical tables themselves open at half past nine, once the volunteer repairers have completed their safety checks. Please don’t begin taking anything apart while the tables are still being prepared.

If this is your first visit, you don’t need to show photo identification. Your booking code already contains the registration details we need. You also don’t need to bring a box of tools, because every table has its own checked equipment. What you should bring is one small, portable household item that you want to work on. A lamp, a torn bag or a small wooden stool is fine. Large kitchen appliances and anything leaking liquid must stay at home.

You may have noticed the bicycle station under the awning outside. We haven’t moved it there because we are confident about the weather—the forecast is actually rather uncertain. Nor is the indoor space being kept free for a delivery; the delivery van leaves before visitors arrive. The real reason is that six bicycle stands need considerably more working room than we can provide inside. The awning will keep the mechanics and bikes covered if it rains.

Families are welcome. Children under twelve can use the low family table and take part in simple jobs such as sewing on a button or sanding a wooden toy. They don’t need a separate booking. They can join the activity instead of simply watching. However, their accompanying adult must stay beside them throughout the activity.

Your six-pound booking fee covers the small materials that most repairs use: ordinary thread, sandpaper, glue sticks and standard inner-tube patches. If your repair needs a new cable, zip, switch or another replacement component, a volunteer will tell you its price before using it. Tea, fruit and cake are available, but those are supported by a separate donation box rather than the booking fee.

Let me now explain the building layout. Keep the floor plan in front of you. North is at the top, and we are standing at the entrance in the centre of the south wall.

The first place most visitors need is the Welcome Desk. As you come through the entrance, turn immediately to your right. The desk occupies the room beside the entrance on that side. There is also a counter on the left, but that is only for coat lockers, so don’t queue there with a booking question.

Next is the Tool Library. From the entrance, turn left, pass the coat lockers and continue into the large room in the far south-west corner. Last month, we temporarily kept some tools in the smaller room beside the west side of the courtyard. That room is now the materials shop, so all borrowed tools must be collected from the larger corner room.

For the Textile Studio, continue north along the western corridor. You’ll pass the courtyard on your right and eventually reach the toilets in the upper-left corner. The Textile Studio is the room immediately to the right of the toilets. The room farther along the same northern corridor is used for group meetings, not sewing.

The Testing Bench is on the other side of the building. Return to the courtyard and cross to its eastern side. The glass-fronted room directly opposite the courtyard’s western materials shop contains the testing equipment. This is where a volunteer checks repaired lamps and other low-power electrical items before they leave the building.

Finally, the Community Kitchen is farther north along that eastern corridor. Continue past the Testing Bench towards the top-right corner. You’ll see the Emergency Exit marked on the outer wall. The kitchen is the large room immediately to the left of that exit. Please keep the exit itself clear, even when refreshments are being served.

That completes the orientation. You may now leave coats in the lockers, take booking questions to the Welcome Desk and wait for the practical tables to open at half past nine.`,
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-2-001.mp3',
    durationSeconds: 0,
    sha256: '0000000000000000000000000000000000000000000000000000000000000000',
  },
  groups: [
    {
      type: 'single-choice',
      id: 'visitor-orientation',
      questionRange: [11, 15],
      instruction: 'Select one option, A, B or C, for each question.',
      questions: [
        {
          number: 11,
          prompt: 'At what time can visitors begin working on their repairs?',
          options: [
            { key: 'A', label: '9:00' },
            { key: 'B', label: '9:15' },
            { key: 'C', label: '9:30' },
          ],
          correctOptionKey: 'C',
          expected: 'C',
          explanation: 'The doors open at 9:00 and the welcome begins at 9:15, but the practical tables open at 9:30.',
        },
        {
          number: 12,
          prompt: 'What should a first-time visitor bring?',
          options: [
            { key: 'A', label: 'Photo identification' },
            { key: 'B', label: 'One small item to repair' },
            { key: 'C', label: 'A personal tool kit' },
          ],
          correctOptionKey: 'B',
          expected: 'B',
          explanation: 'The booking code replaces photo identification and the centre supplies tools; visitors bring one portable item.',
        },
        {
          number: 13,
          prompt: 'Why is the bicycle station outside?',
          options: [
            { key: 'A', label: 'It needs more working space' },
            { key: 'B', label: 'The weather is expected to stay dry' },
            { key: 'C', label: 'Delivery vehicles need the indoor area' },
          ],
          correctOptionKey: 'A',
          expected: 'A',
          explanation: 'The coordinator rejects the weather and delivery explanations, then says six stands require more room.',
        },
        {
          number: 14,
          prompt: 'What must children under twelve do?',
          options: [
            { key: 'A', label: 'Make a separate booking' },
            { key: 'B', label: 'Watch without taking part' },
            { key: 'C', label: 'Stay with an adult' },
          ],
          correctOptionKey: 'C',
          expected: 'C',
          explanation: 'Children may participate without a separate booking, but their accompanying adult must remain beside them.',
        },
        {
          number: 15,
          prompt: 'What is included in the booking fee?',
          options: [
            { key: 'A', label: 'Drinks and snacks' },
            { key: 'B', label: 'Small consumable materials' },
            { key: 'C', label: 'Replacement parts' },
          ],
          correctOptionKey: 'B',
          expected: 'B',
          explanation: 'Thread, sandpaper, glue sticks and patches are included; replacement parts cost extra and refreshments use donations.',
        },
      ],
    },
    {
      type: 'map-labelling',
      id: 'repair-house-map',
      questionRange: [16, 20],
      instruction: 'Look at the floor plan. Match each place to the correct letter, A–H.',
      map: {
        url: '/images/ielts/listening/welearn-listening-part-2-001-map.svg',
        width: 1000,
        height: 650,
        alt: 'North-up floor plan with an entrance on the south wall, a central courtyard, toilets at the upper left, an emergency exit at the upper right, and eight lettered areas A to H.',
        longDescription: 'The entrance is centred on the south wall and the courtyard is in the middle. Toilets are in the upper-left corner and the emergency exit is on the upper-right wall. A is right of the toilets; B is at the top centre; C is beside the emergency exit; D and E are left and right of the courtyard; F is in the lower-left corner; G is left of the entrance; and H is right of the entrance.',
        areaKeys: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      },
      options: [
        { key: 'A', label: 'Lettered area A' },
        { key: 'B', label: 'Lettered area B' },
        { key: 'C', label: 'Lettered area C' },
        { key: 'D', label: 'Lettered area D' },
        { key: 'E', label: 'Lettered area E' },
        { key: 'F', label: 'Lettered area F' },
        { key: 'G', label: 'Lettered area G' },
        { key: 'H', label: 'Lettered area H' },
      ],
      questions: [
        {
          number: 16,
          prompt: 'Welcome Desk',
          correctOptionKey: 'H',
          expected: 'H',
          explanation: 'The Welcome Desk is immediately to the right after entering, which is the area marked H.',
        },
        {
          number: 17,
          prompt: 'Tool Library',
          correctOptionKey: 'F',
          expected: 'F',
          explanation: 'The Tool Library is beyond the coat lockers in the far south-west corner, the area marked F.',
        },
        {
          number: 18,
          prompt: 'Textile Studio',
          correctOptionKey: 'A',
          expected: 'A',
          explanation: 'The Textile Studio is immediately to the right of the upper-left toilets, which is area A.',
        },
        {
          number: 19,
          prompt: 'Testing Bench',
          correctOptionKey: 'E',
          expected: 'E',
          explanation: 'The Testing Bench is in the glass-fronted room directly east of the courtyard, the area marked E.',
        },
        {
          number: 20,
          prompt: 'Community Kitchen',
          correctOptionKey: 'C',
          expected: 'C',
          explanation: 'The Community Kitchen is immediately left of the upper-right emergency exit, which is area C.',
        },
      ],
    },
  ],
};

export function getIeltsListeningPart2Practice() {
  const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;
  return projectIeltsListeningPractice(SOURCE, resolved);
}

export function getIeltsListeningPart2Identity() {
  return {
    id: SOURCE.id,
    contentVersion: SOURCE.contentVersion,
    part: SOURCE.part,
    practiceNumber: SOURCE.practiceNumber,
  } as const;
}

export function getIeltsListeningPart2QuestionNumbers() {
  return ieltsListeningQuestionNumbers(SOURCE);
}

export function getIeltsListeningPart2ResponseSpecs() {
  return ieltsListeningResponseSpecs(SOURCE);
}

export function scoreIeltsListeningPart2Practice(responses: Readonly<Record<string, string>>) {
  return scoreIeltsListeningPractice(SOURCE, responses);
}

export function scoreIeltsListeningPart2Registration(responses: Readonly<Record<string, string>>) {
  return {
    identity: getIeltsListeningPart2Identity(),
    result: scoreIeltsListeningPart2Practice(responses),
  } as const;
}
