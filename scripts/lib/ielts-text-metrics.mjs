export const whitespaceWords = value => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

// IELTS treats a spaced digit sequence such as a telephone number as one number.
// Written number words remain separate words and must still respect the displayed limit.
export function ieltsAnswerUnits(value = '') {
  const normalized = String(value).trim()
    .replace(/\b(\d+(?::\d+)?)\s*([ap])\.?m\.?\b/gi, '$1$2m')
    .replace(/([£$€])\s+(?=\d)/g, '$1')
    .replace(/\b\d+(?:[\u00a0 ]+\d+)+\b/g, match => match.replace(/[\u00a0 ]+/g, ''));
  return whitespaceWords(normalized);
}
