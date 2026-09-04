export type IeltsSet1Skill = 'listening' | 'reading';

export interface IeltsSet1AnswerEntry {
  number: number;
  kind: 'text' | 'option';
  display: string;
  accepted: readonly string[];
}

const text = (number: number, display: string, ...alternatives: string[]): IeltsSet1AnswerEntry => ({
  number,
  kind: 'text',
  display,
  accepted: [display, ...alternatives],
});

const option = (number: number, letter: string): IeltsSet1AnswerEntry => ({
  number,
  kind: 'option',
  display: letter,
  accepted: [letter],
});

/**
 * Canonical, audited answer template for IELTS Academic Set 1.
 *
 * Keep this as the single source of truth for the public mock, server scoring,
 * report exports and contract checks. Every skill must contain Questions 1-40
 * exactly once and in order.
 */
export const IELTS_SET_1_ANSWER_TEMPLATE: Record<IeltsSet1Skill, readonly IeltsSet1AnswerEntry[]> = {
  listening: [
    text(1, 'Ardleigh'),
    text(2, 'newspaper'),
    text(3, 'theme'),
    text(4, 'tent'),
    text(5, 'castle'),
    text(6, 'beach', 'beaches'),
    text(7, '2020', '2,020'),
    text(8, 'flight'),
    text(9, '429'),
    text(10, 'dinner'),
    option(11, 'A'),
    option(12, 'C'),
    text(13, 'health problems'),
    text(14, 'safety rules'),
    text(15, 'plan'),
    text(16, 'joining'),
    text(17, 'free entry'),
    text(18, 'peak'),
    text(19, 'guests'),
    text(20, 'photo card', 'photo cards'),
    option(21, 'C'),
    option(22, 'A'),
    option(23, 'B'),
    option(24, 'A'),
    option(25, 'C'),
    text(26, 'presentation'),
    text(27, 'model'),
    text(28, 'material', 'materials'),
    text(29, 'grant'),
    text(30, 'technical'),
    text(31, 'gene'),
    text(32, 'power', 'powers'),
    text(33, 'strangers'),
    text(34, 'erosion'),
    text(35, 'islands'),
    text(36, 'roads'),
    text(37, 'fishing'),
    text(38, 'reproduction'),
    text(39, 'method', 'methods'),
    text(40, 'expansion'),
  ],
  reading: [
    text(1, 'candlewax'),
    text(2, 'synthetic'),
    text(3, 'chemistry'),
    text(4, 'Novalak'),
    text(5, 'fillers'),
    text(6, 'hexa'),
    text(7, 'raw'),
    text(8, 'pressure'),
    option(9, 'B'),
    option(10, 'C'),
    option(11, 'A'),
    option(12, 'B'),
    option(13, 'B'),
    option(14, 'B'),
    option(15, 'C'),
    option(16, 'A'),
    option(17, 'B'),
    option(18, 'A'),
    option(19, 'C'),
    option(20, 'A'),
    text(21, 'problem solving'),
    text(22, 'temporal lobes'),
    text(23, 'evaluating information'),
    option(24, 'C'),
    option(25, 'A'),
    option(26, 'F'),
    option(27, 'D'),
    text(28, 'Latin'),
    text(29, 'doctors'),
    text(30, 'technical vocabulary'),
    text(31, 'grammatical resources'),
    text(32, 'Royal Society'),
    text(33, 'German'),
    text(34, 'industrial revolution'),
    option(35, 'C'),
    option(36, 'B'),
    option(37, 'A'),
    text(38, 'popular'),
    text(39, 'Principia', 'the Principia', "Newton's Principia", 'mathematical treatise'),
    text(40, 'local', 'more local', 'local audience'),
  ],
};

function entry(skill: IeltsSet1Skill, number: number): IeltsSet1AnswerEntry {
  const answer = IELTS_SET_1_ANSWER_TEMPLATE[skill].find(item => item.number === number);
  if (!answer) throw new Error(`Missing ${skill} answer for IELTS Set 1 Question ${number}`);
  return answer;
}

export function ieltsSet1TextAnswers(skill: IeltsSet1Skill, number: number): string[] {
  const answer = entry(skill, number);
  if (answer.kind !== 'text') throw new Error(`${skill} Question ${number} is not a text answer`);
  return [...answer.accepted];
}

export function ieltsSet1OptionLetter(skill: IeltsSet1Skill, number: number): string {
  const answer = entry(skill, number);
  if (answer.kind !== 'option') throw new Error(`${skill} Question ${number} is not an option answer`);
  return answer.accepted[0];
}

export function ieltsSet1OptionIndex(skill: IeltsSet1Skill, number: number): number {
  return ieltsSet1OptionLetter(skill, number).charCodeAt(0) - 65;
}

export function ieltsSet1OptionLetters(skill: IeltsSet1Skill, numbers: readonly number[]): string[] {
  return numbers.map(number => ieltsSet1OptionLetter(skill, number));
}
