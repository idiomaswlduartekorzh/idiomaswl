/** IELTS objective IDs carry the global skill number, not the section index. */
export function ieltsQuestionNumber(id: string): number {
  const number = Number(id.match(/q(\d+)$/i)?.[1]);
  if (!Number.isInteger(number) || number < 1 || number > 40) {
    throw new Error(`IELTS objective question has no valid global number: ${id}`);
  }
  return number;
}
