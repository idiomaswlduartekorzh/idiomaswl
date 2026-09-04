const STOPWORDS = new Set('a an and are as at be been below by can choose complete correct did do does each for from had has have how in into is it its may more most no not of on one only or our passage people question questions same show shows some than that the their them there these they this to two was were what when which who why will with write'.split(' '));

export function readingTokens(value = '') {
  return String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim().split(/\s+/).filter(token => token.length > 2 && !STOPWORDS.has(token));
}

const normalized = value => String(value).toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[’']/g, '').replace(/[^a-z0-9]+/g, ' ').trim();
const excerptAround = (paragraph, terms) => {
  const lower = paragraph.toLowerCase();
  const found = terms.map(term => lower.indexOf(term.toLowerCase())).find(index => index >= 0) ?? 0;
  const start = Math.max(0, found - 120);
  const end = Math.min(paragraph.length, start + 520);
  return `${start > 0 ? '…' : ''}${paragraph.slice(start, end).trim()}${end < paragraph.length ? '…' : ''}`;
};

export function rankReadingParagraphs(passage, query, literalAnswers = []) {
  const queryTokens = [...new Set(readingTokens(query))];
  const literal = [...new Set(literalAnswers.map(answer => normalized(answer)).filter(Boolean))];
  return String(passage).split(/\n\s*\n/).map((paragraph, index) => {
    const paragraphTokens = new Set(readingTokens(paragraph));
    const overlap = queryTokens.filter(token => paragraphTokens.has(token));
    const paragraphNormalized = ` ${normalized(paragraph)} `;
    const literalMatches = literal.filter(answer => paragraphNormalized.includes(` ${answer} `));
    const score = (queryTokens.length ? overlap.length / queryTokens.length : 0) + literalMatches.length * 2;
    return {
      paragraph: index + 1,
      score: Number(score.toFixed(4)),
      overlappingTerms: overlap,
      literalMatches,
      excerpt: excerptAround(paragraph, literalMatches.length ? literalMatches : overlap),
    };
  }).sort((left, right) => right.score - left.score || left.paragraph - right.paragraph).slice(0, 3);
}
