import 'server-only';

import { resolveAudioUrl } from '@/lib/examAudio';
import {
  ieltsListeningQuestionNumbers,
  projectIeltsListeningPractice,
  scoreIeltsListeningPractice,
  type IeltsListeningPracticeSource,
} from '@/lib/ielts/listening-practice-contract';

const SOURCE: IeltsListeningPracticeSource = {
  id: 'welearn-listening-part-1-001',
  contentVersion: '2026-09-01.1',
  title: 'Harbour City Photography Walk',
  scenario: 'A customer calls a local studio to book a guided photography walk.',
  instructions: 'Listen and answer Questions 1–10. You may replay the recording in this WeLearn practice mode.',
  transcript: `HOST: Good afternoon, Harbour City Photo Studio. Leo speaking. How can I help?

CUSTOMER: Hi. I’d like to book one of your weekend photography walks. I saw a short description, but I need a few more details.

HOST: Of course. I’ll take your booking first. What’s your name?

CUSTOMER: Maya Benton. Maya is M-A-Y-A, and Benton is B-E-N-T-O-N.

HOST: Thank you. And your address?

CUSTOMER: It’s 14 Bridge Street.

HOST: Did you say Bay Street?

CUSTOMER: No, Bridge Street — like the structure you cross. Number 14.

HOST: Got it. How did you hear about the walks? Was it through a friend?

CUSTOMER: A friend follows your classes, but I actually found the walk in your newsletter.

HOST: Right. We have places on the fifteenth and the sixteenth of October.

CUSTOMER: The fifteenth is difficult because I’m working in the morning. Please put me down for 16 October.

HOST: Certainly. How would you describe your photography experience?

CUSTOMER: I use my phone a lot, but I’ve only just bought a proper camera. So I’m definitely a beginner.

HOST: That’s absolutely fine. What would you most like to photograph? We cover street portraits, boats, and architecture.

CUSTOMER: I take portraits quite often already. The old buildings are the reason I’m coming, so architecture is my main interest.

HOST: Perfect. Now I’ll compare the two walks. The Old Quarter walk lasts two and a half hours. It usually finishes at twelve thirty, although the group meets at nine forty-five for a ten o’clock start.

CUSTOMER: And how much is that one?

HOST: Thirty-eight pounds. That includes a hot drink. Most people choose coffee, but tea is available too.

CUSTOMER: Coffee for me, please. What about the Riverside walk?

HOST: That one is longer: three hours. It costs forty-four pounds. We used to charge forty-two, but the boat operator raised its fee this summer.

CUSTOMER: Does the price include lunch?

HOST: No, but it includes the ferry across the harbour. You can buy lunch at the market after the walk.

CUSTOMER: I think the Riverside route sounds better.

HOST: Good choice. Bring your camera and a charged battery. We can lend you a tripod if you need one, so don’t carry extra equipment unnecessarily.

CUSTOMER: Great. Thanks for your help.

HOST: You’re welcome. I’ll email the booking confirmation this afternoon.`,
  audio: {
    localPath: '/audio/ielts/listening/welearn-listening-part-1-001.mp3',
    durationSeconds: 134.325578,
    sha256: '1c31df90a3a64751bd7842c03f4e778584e8fdec1119f114ee6ef7308ba4cb8a',
  },
  groups: [
    {
      type: 'form',
      id: 'booking-details',
      questionRange: [1, 6],
      instruction: 'Complete the booking notes. Write ONE WORD AND/OR A NUMBER for each answer.',
      title: 'Photography walk booking',
      example: 'First name: Maya',
      template: `Surname: {{1}}
Address: 14 {{2}} Street
Found the walk in the studio {{3}}
Preferred date: {{4}} October
Photography level: {{5}}
Main interest: {{6}}`,
      blanks: [
        { number: 1, acceptedAnswers: ['Benton'], expected: 'Benton', explanation: 'Maya spells her surname after giving her full name.', maxWords: 1 },
        { number: 2, acceptedAnswers: ['Bridge'], expected: 'Bridge', explanation: 'The host first hears “Bay”, but Maya corrects it to “Bridge Street”.', maxWords: 1 },
        { number: 3, acceptedAnswers: ['newsletter'], expected: 'newsletter', explanation: 'A friend follows the studio, but Maya says she actually found the walk in the newsletter.', maxWords: 1 },
        { number: 4, acceptedAnswers: ['16', '16th', 'sixteenth'], expected: '16', explanation: 'The fifteenth is difficult, so Maya confirms 16 October.', maxWords: 1 },
        { number: 5, acceptedAnswers: ['beginner'], expected: 'beginner', explanation: 'Using a phone is background information; with a new camera, Maya classifies herself as a beginner.', maxWords: 1 },
        { number: 6, acceptedAnswers: ['architecture'], expected: 'architecture', explanation: 'Portraits are familiar to Maya; the old buildings make architecture her main interest.', maxWords: 1 },
      ],
    },
    {
      type: 'table',
      id: 'walk-comparison',
      questionRange: [7, 10],
      instruction: 'Complete the table. Write ONE WORD AND/OR A NUMBER for each answer.',
      headers: ['Walk', 'Length', 'Price', 'Included'],
      rows: [
        [
          { type: 'text', text: 'Old Quarter' },
          { type: 'blank', number: 7, acceptedAnswers: ['2.5', '2½', '2.5 hours', '2½ hours'], expected: '2.5', explanation: 'Two and a half hours is the duration; 12:30 and 9:45 are clock-time distractors.', maxWords: 1 },
          { type: 'text', text: '£38' },
          { type: 'blank', number: 8, acceptedAnswers: ['coffee'], expected: 'coffee', explanation: 'A hot drink is included, and Maya chooses coffee rather than the available tea.', maxWords: 1 },
        ],
        [
          { type: 'text', text: 'Riverside' },
          { type: 'text', text: '3 hours' },
          { type: 'blank', number: 9, acceptedAnswers: ['44', '£44', '44 pounds'], expected: '44', explanation: '£44 is the current price. £42 was the old price before the operator raised its fee.', maxWords: 1 },
          { type: 'blank', number: 10, acceptedAnswers: ['ferry'], expected: 'ferry', explanation: 'Lunch can be bought later; the ferry across the harbour is what the price includes.', maxWords: 1 },
        ],
      ],
    },
  ],
};

export function getIeltsListeningPart1Practice() {
  const resolved = resolveAudioUrl(SOURCE.audio.localPath) ?? SOURCE.audio.localPath;
  return projectIeltsListeningPractice(SOURCE, resolved);
}

export function getIeltsListeningPart1Identity() {
  return { id: SOURCE.id, contentVersion: SOURCE.contentVersion } as const;
}

export function getIeltsListeningPart1QuestionNumbers() {
  return ieltsListeningQuestionNumbers(SOURCE);
}

export function scoreIeltsListeningPart1Practice(responses: Readonly<Record<string, string>>) {
  return scoreIeltsListeningPractice(SOURCE, responses);
}
