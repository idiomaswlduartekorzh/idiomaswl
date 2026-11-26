export type ListeningSample = {
  part: 1 | 2 | 3 | 4;
  title: string;
  context: string;
  prompt: string;
  instruction: string;
  options?: string[];
  maxWords?: number;
};

// Excerpts from the existing Set 2 MP3. Source windows in seconds, checked against
// config/ielts-harness/listening-evidence/sources/set-2/*whisper-set-2.json:
// 170.05–177.96, 554.50–561.43, 914.67–929.44 and 1644.98–1657.47.
// These teaching prompts are distinct from the scored Set 2 items.
export const listeningSamples: ListeningSample[] = [
  {
    part: 1,
    title: 'A customer talks to a receptionist',
    context: 'In Part 1 two people sort out an everyday arrangement. A price can come with a condition. Here a receptionist explains a discount during a tennis booking. Listen to the caller’s reply before deciding whether the offer applies.',
    prompt: 'Which statement fits the caller at the end of the exchange?',
    instruction: 'Choose one answer.',
    options: [
      'They already qualify for the members’ rate.',
      'They are interested in becoming a member.',
      'They have decided to join today.',
    ],
  },
  {
    part: 2,
    title: 'A guide shows you around campus',
    context: 'Part 2 has one main speaker in an everyday setting. Directions can be surprisingly easy to reverse. Imagine you are at the gate, looking into the campus. Keep facing that way while the guide tells you where the Student Support Centre is.',
    prompt: 'As you enter, the support centre is on your _____.',
    instruction: 'Write ONE WORD ONLY from the recording.',
    maxWords: 1,
  },
  {
    part: 3,
    title: 'Two students discuss their tutor’s feedback',
    context: 'Part 3 follows a discussion about study or training. Sometimes one student reports someone else’s opinion. Listen to Tom answering his classmate’s question about Professor Jenkins. The praise and the request for more work refer to different parts of their project.',
    prompt: 'Which part of the project did Professor Jenkins like?',
    instruction: 'Choose one answer.',
    options: [
      'The section on wind energy.',
      'Both sections equally.',
      'The section on solar power.',
    ],
  },
  {
    part: 4,
    title: 'A lecturer explains how coral is grown',
    context: 'In Part 4 one speaker develops an academic subject. A heading can carry you through an unfamiliar term. Here the lecture has moved on to conservation. There are two places in the coral gardening process. The gap asks about the earlier stage.',
    prompt: 'Coral fragments grow in _____ before the team moves them to a reef.',
    instruction: 'Write NO MORE THAN TWO WORDS from the recording.',
    maxWords: 2,
  },
];
