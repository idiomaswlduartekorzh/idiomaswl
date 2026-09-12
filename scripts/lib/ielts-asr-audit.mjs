const NUMBER_EQUIVALENTS = new Map([
  ['zero', '0'], ['one', '1'], ['two', '2'], ['three', '3'], ['four', '4'], ['five', '5'],
  ['six', '6'], ['seven', '7'], ['eight', '8'], ['nine', '9'], ['ten', '10'],
  ['eleven', '11'], ['twelve', '12'], ['thirteen', '13'], ['fourteen', '14'], ['fifteen', '15'],
  ['sixteen', '16'], ['seventeen', '17'], ['eighteen', '18'], ['nineteen', '19'], ['twenty', '20'],
  ['thirty', '30'], ['forty', '40'], ['fifty', '50'], ['sixty', '60'], ['seventy', '70'],
  ['eighty', '80'], ['ninety', '90'],
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
    .replace(/\b(\d+)\s+pounds?\s+(\d+)\b/g, ' pounds $1 $2 ')
    .replace(/\b([ap])\s*\.\s*m\s*\./g, '$1m');
  return CONTRACTIONS.reduce((result, [pattern, replacement]) => result.replace(pattern, replacement), normalized)
    .replace(/[’']/g, '')
    .replace(/-/g, ' ')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/(\d)([a-z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean)
    .map(word => NUMBER_EQUIVALENTS.get(word) ?? word)
    .flatMap(word => /^\d{2,}$/u.test(word) ? [...word] : [word]);
}

export function stripSpeakerLabels(text = '') {
  return String(text).replace(/^([A-Z][A-Z0-9 .'-]{1,30}):\s*/gmu, '');
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

export function auditAsrAlignment({ expectedText, segments, objectiveRows, maximumWordErrorRate = 0.08, allowFuzzySingleWords = false, enforceWordErrorRate = true }) {
  if (!Array.isArray(segments) || segments.length === 0) throw Error('ASR JSON must contain segments with start, end and text');
  const usableSegments = segments.filter(segment => String(segment.text ?? '').trim());
  if (!usableSegments.length) throw Error('ASR JSON contains no speech segments');
  for (const [index, segment] of usableSegments.entries()) {
    if (!Number.isFinite(segment.start) || !Number.isFinite(segment.end) || segment.end <= segment.start) {
      throw Error(`Invalid ASR segment ${index}`);
    }
  }
  const expectedWords = normalizedWords(stripSpeakerLabels(expectedText));
  const recognizedWords = normalizedWords(usableSegments.map(segment => segment.text).join(' '));
  const distance = editDistance(expectedWords, recognizedWords);
  const wordErrorRate = expectedWords.length ? distance / expectedWords.length : 0;
  const recognizedStream = usableSegments.flatMap((segment, segmentIndex) => normalizedWords(segment.text)
    .map(word => ({ word, segmentIndex })));
  const fuzzyWordMatch = (expected, recognized) => {
    if (!allowFuzzySingleWords || expected.length < 4 || recognized.length < 4 || expected[0] !== recognized[0]) return false;
    const maximumDistance = Math.max(expected.length, recognized.length) >= 7 ? 2 : 1;
    return editDistance([...expected], [...recognized]) <= maximumDistance;
  };
  const findPhrase = (words, startAt = 0) => {
    if (!words.length) return null;
    outer: for (let index = startAt; index <= recognizedStream.length - words.length; index += 1) {
      for (let offset = 0; offset < words.length; offset += 1) {
        const exact = recognizedStream[index + offset].word === words[offset];
        const fuzzy = words.length === 1 && fuzzyWordMatch(words[offset], recognizedStream[index + offset].word);
        if (!exact && !fuzzy) continue outer;
      }
      return { index, matchKind: recognizedStream[index].word === words[0] ? 'exact' : 'fuzzy-single-word' };
    }
    return null;
  };
  const completionRows = objectiveRows.filter(row => row.kind === 'fill').sort((left, right) => left.number - right.number);
  let cursor = 0;
  const completionEvidence = completionRows.map(row => {
    const variants = row.accepted.map(normalizedWords).filter(words => words.length);
    const candidates = variants.map(words => ({ words, match: findPhrase(words, cursor) })).filter(candidate => candidate.match)
      .sort((left, right) => left.match.index - right.match.index);
    const match = candidates[0] ?? null;
    const diagnostic = match ?? variants.map(words => ({ words, match: findPhrase(words, 0) })).find(candidate => candidate.match) ?? null;
    const startSegmentIndex = match ? recognizedStream[match.match.index].segmentIndex : null;
    const endSegmentIndex = match ? recognizedStream[match.match.index + match.words.length - 1].segmentIndex : null;
    if (match) cursor = match.match.index + match.words.length;
    return {
      question: row.number,
      responseKey: row.key,
      candidateAcceptedAnswers: row.canonicalAccepted ?? row.accepted,
      asrRecognitionVariants: row.asrRecognitionVariants ?? [],
      found: Boolean(match),
      foundOutOfOrder: !match && Boolean(diagnostic),
      matchKind: match?.match.matchKind ?? null,
      diagnosticStartSeconds: !match && diagnostic ? usableSegments[recognizedStream[diagnostic.match.index].segmentIndex].start : null,
      startSeconds: startSegmentIndex === null ? null : usableSegments[startSegmentIndex].start,
      endSeconds: endSegmentIndex === null ? null : usableSegments[endSegmentIndex].end,
      audiblePhrase: startSegmentIndex === null ? '' : usableSegments.slice(startSegmentIndex, endSegmentIndex + 1).map(segment => segment.text.trim()).join(' '),
    };
  });
  const missingCompletionQuestions = completionEvidence.filter(item => !item.found).map(item => item.question);
  const failures = [];
  if (enforceWordErrorRate && wordErrorRate > maximumWordErrorRate) failures.push(`WER ${(wordErrorRate * 100).toFixed(2)}% exceeds ${(maximumWordErrorRate * 100).toFixed(2)}%`);
  if (missingCompletionQuestions.length) failures.push(`Accepted completion phrases not found in question order for Q${missingCompletionQuestions.join(', Q')}`);
  return {
    status: failures.length ? 'FAIL' : 'PASS',
    expectedWords: expectedWords.length,
    recognizedWords: recognizedWords.length,
    editDistance: distance,
    wordErrorRate: Number(wordErrorRate.toFixed(4)),
    maximumWordErrorRate,
    wordErrorRateEnforced: enforceWordErrorRate,
    completionEvidence,
    completionEvidenceFound: completionEvidence.length - missingCompletionQuestions.length,
    completionEvidenceTotal: completionEvidence.length,
    failures,
  };
}
