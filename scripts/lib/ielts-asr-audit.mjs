const NUMBER_EQUIVALENTS = new Map([
  ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'],
  ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10'],
  ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fourteen', '14'], ['fifteen', '15'],
  ['sixteen', '16'], ['seventeen', '17'], ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20'],
  ['advisor', 'adviser'], ['theatre', 'theater'], ['centre', 'center'],
]);

const CONTRACTIONS = [
  [/\bi[’']m\b/g, 'i am'], [/\bi[’']ve\b/g, 'i have'], [/\bi[’']ll\b/g, 'i will'],
  [/\bwe[’']re\b/g, 'we are'], [/\byou[’']re\b/g, 'you are'], [/\bthey[’']re\b/g, 'they are'],
  [/\bit[’']s\b/g, 'it is'], [/\bthat[’']s\b/g, 'that is'], [/\bthere[’']s\b/g, 'there is'],
  [/\bcan[’']t\b/g, 'cannot'], [/\bwon[’']t\b/g, 'will not'], [/\bdon[’']t\b/g, 'do not'],
  [/\bdoesn[’']t\b/g, 'does not'], [/\bdidn[’']t\b/g, 'did not'], [/\bisn[’']t\b/g, 'is not'],
  [/\baren[’']t\b/g, 'are not'], [/\bwasn[’']t\b/g, 'was not'], [/\bweren[’']t\b/g, 'were not'],
  [/\bhasn[’']t\b/g, 'has not'], [/\bhaven[’']t\b/g, 'have not'], [/\bhadn[’']t\b/g, 'had not'],
];

export function normalizedWords(text = '') {
  const normalized = String(text).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/£/g, ' pounds ')
    .replace(/\b([ap])\s*\.\s*m\s*\./g, '$1m');
  return CONTRACTIONS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalized)
    .replace(/[’']/g, '')
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/(\d)([a-z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => NUMBER_EQUIVALENTS.get(word) ?? word);
}

export function editDistance(left, right) {
  let previous = Uint32Array.from({ length: right.length + 1 }, (_, index) => index);
  let current = new Uint32Array(right.length + 1);
  for (let row = 1; row <= left.length; row += 1) {
    current[0] = row;
    for (let column = 1; column <= right.length; column += 1) {
      current[column] = Math.min(
        previous[column] + 1,
        current[column - 1] + 1,
        previous[column - 1] + Number(left[row - 1] !== right[column - 1]),
      );
    }
    [previous, current] = [current, previous];
  }
  return previous[right.length];
}

const normalizedPhrase = value => normalizedWords(value).join(' ');

export function auditAsrAlignment({ expectedText, segments, objectiveRows, maximumWordErrorRate = 0.08 }) {
  if (!Array.isArray(segments) || segments.length === 0) throw Error('ASR JSON must contain non-empty segments with start, end and text');
  for (const [index, segment] of segments.entries()) {
    if (!Number.isFinite(segment.start) || !Number.isFinite(segment.end) || segment.end <= segment.start || !String(segment.text ?? '').trim()) {
      throw Error(`Invalid ASR segment ${index}`);
    }
  }
  const expectedWords = normalizedWords(expectedText);
  const recognizedWords = normalizedWords(segments.map(segment => segment.text).join(' '));
  const distance = editDistance(expectedWords, recognizedWords);
  const wordErrorRate = expectedWords.length ? distance / expectedWords.length : 0;
  const normalizedSegments = segments.map(segment => ({ ...segment, normalized: ` ${normalizedPhrase(segment.text)} ` }));
  const completionRows = objectiveRows.filter(row => row.kind === 'fill').sort((left, right) => left.number - right.number);
  let cursor = 0;
  const completionEvidence = completionRows.map(row => {
    const variants = row.accepted.map(normalizedPhrase).filter(Boolean);
    const matchIndex = normalizedSegments.findIndex((segment, index) => index >= cursor && variants.some(variant => segment.normalized.includes(` ${variant} `)));
    const diagnosticIndex = matchIndex >= 0
      ? matchIndex
      : normalizedSegments.findIndex(segment => variants.some(variant => segment.normalized.includes(` ${variant} `)));
    const segment = matchIndex >= 0 ? segments[matchIndex] : null;
    if (matchIndex >= 0) cursor = matchIndex;
    return {
      question: row.number,
      responseKey: row.key,
      candidateAcceptedAnswers: row.accepted,
      found: Boolean(segment),
      foundOutOfOrder: matchIndex < 0 && diagnosticIndex >= 0,
      diagnosticStartSeconds: matchIndex < 0 && diagnosticIndex >= 0 ? segments[diagnosticIndex].start : null,
      startSeconds: segment?.start ?? null,
      endSeconds: segment?.end ?? null,
      audiblePhrase: segment?.text?.trim() ?? '',
    };
  });
  const missingCompletionQuestions = completionEvidence.filter(item => !item.found).map(item => item.question);
  const failures = [];
  if (wordErrorRate > maximumWordErrorRate) failures.push(`WER ${(wordErrorRate * 100).toFixed(2)}% exceeds ${(maximumWordErrorRate * 100).toFixed(2)}%`);
  if (missingCompletionQuestions.length) failures.push(`Accepted completion phrases not found in question order for Q${missingCompletionQuestions.join(', Q')}`);
  return {
    status: failures.length ? 'FAIL' : 'PASS',
    expectedWords: expectedWords.length,
    recognizedWords: recognizedWords.length,
    editDistance: distance,
    wordErrorRate: Number(wordErrorRate.toFixed(4)),
    maximumWordErrorRate,
    completionEvidence,
    completionEvidenceFound: completionEvidence.length - missingCompletionQuestions.length,
    completionEvidenceTotal: completionEvidence.length,
    failures,
  };
}
