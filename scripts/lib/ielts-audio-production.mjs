import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { objectiveRows } from './ielts-answer-key-audit.mjs';

export const ACCENT_ROTATION = Object.freeze(['british', 'north-american', 'australian', 'new-zealand']);
const PART_NAMES = Object.freeze(['One', 'Two', 'Three', 'Four']);
const FEMALE_NAMES = new Set(['AMY', 'ANNA', 'KIRSTY', 'MAYA', 'MEG', 'MEGAN', 'PRIYA', 'SARAH', 'SOFIA', 'SOPHIE']);
const MALE_NAMES = new Set(['BEN', 'JAMES', 'JOHN', 'JOSH', 'LEE', 'LIAM', 'RYAN', 'SAM', 'TOM']);
const STAFF_LABELS = new Set(['AGENT', 'ASSISTANT', 'CONSULTANT', 'COORDINATOR', 'LIBRARIAN', 'OFFICER', 'ORGANISER', 'RECEPTIONIST', 'REGISTRAR', 'STAFF']);
const PARTICIPANT_LABELS = new Set(['CALLER', 'CUSTOMER', 'JOBSEEKER', 'MEMBER', 'PARENT', 'PASSENGER', 'STUDENT']);

export const sha256 = value => createHash('sha256').update(value).digest('hex');
export const wordCount = value => String(value ?? '').trim().split(/\s+/).filter(Boolean).length;

const SMALL_NUMBERS = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

export function integerToEnglish(value) {
  const number = Number(String(value).replace(/,/gu, ''));
  assert.ok(Number.isSafeInteger(number) && number >= 0 && number < 1_000_000, `Unsupported number: ${value}`);
  if (number < 20) return SMALL_NUMBERS[number];
  if (number < 100) return `${TENS[Math.floor(number / 10)]}${number % 10 ? `-${SMALL_NUMBERS[number % 10]}` : ''}`;
  if (number < 1000) return `${SMALL_NUMBERS[Math.floor(number / 100)]} hundred${number % 100 ? ` and ${integerToEnglish(number % 100)}` : ''}`;
  const thousands = Math.floor(number / 1000);
  return `${integerToEnglish(thousands)} thousand${number % 1000 ? `${number % 1000 < 100 ? ' and' : ''} ${integerToEnglish(number % 1000)}` : ''}`;
}

function yearToEnglish(value) {
  const year = Number(value);
  if (year >= 2000 && year <= 2009) return `two thousand${year % 2000 ? ` and ${integerToEnglish(year % 2000)}` : ''}`;
  if (year >= 2010 && year <= 2099) return `twenty ${integerToEnglish(year % 2000)}`;
  const century = Math.floor(year / 100);
  const rest = year % 100;
  return `${integerToEnglish(century)}${rest ? ` ${integerToEnglish(rest)}` : ' hundred'}`;
}

const digitsToEnglish = value => [...String(value).replace(/\D/gu, '')].map(digit => SMALL_NUMBERS[Number(digit)]).join(' ');

/** Normalizes sensitive tokens before Flash synthesis while leaving the canonical transcript untouched. */
export function ttsText(value = '') {
  return String(value)
    .replace(/\b([A-Z])(?:-([A-Z])){2,}\b/gu, match => match.split('-').join(', '))
    .replace(/\b0\d{2,}(?:\s+\d{2,})+\b/gu, match => match.split(/\s+/u).map(digitsToEnglish).join(', '))
    .replace(/£\s*(\d[\d,]*)(?:\.(\d{1,2}))?/gu, (_match, whole, pence) => `${integerToEnglish(whole)} pounds${pence ? ` and ${integerToEnglish(pence)} pence` : ''}`)
    .replace(/\b(\d[\d,]*)%/gu, (_match, number) => `${integerToEnglish(number)} percent`)
    .replace(/\b(\d{1,2}):(\d{2})\b/gu, (_match, hour, minute) => `${integerToEnglish(hour)} ${minute === '00' ? "o'clock" : integerToEnglish(minute)}`)
    .replace(/\b(1\d{3}|20\d{2})\b/gu, match => yearToEnglish(match))
    .replace(/\b(0\d{2,})\b/gu, match => digitsToEnglish(match))
    .replace(/\b(\d[\d,]*)\.(\d+)\b/gu, (_match, whole, fraction) => `${integerToEnglish(whole)} point ${digitsToEnglish(fraction)}`)
    .replace(/\b(\d[\d,]*)\b/gu, match => integerToEnglish(match));
}

export function spokenText(value = '') {
  return String(value).replace(/^([A-Z][A-Z0-9 .'-]{1,30}):\s*/u, '').trim();
}

export function normalizedEvidenceText(value = '') {
  return String(value).normalize('NFKD').replace(/[\u0300-\u036f]/gu, '').toLowerCase()
    .replace(/[’']/gu, '').replace(/-/gu, ' ').replace(/[^a-z0-9\s]/gu, ' ')
    .replace(/\b(?:pounds?|dollars?|euros?)\b/gu, ' ')
    .replace(/\bzero\b/gu, '0').replace(/\bone\b/gu, '1').replace(/\btwo\b/gu, '2')
    .replace(/\bthree\b/gu, '3').replace(/\bfour\b/gu, '4').replace(/\bfive\b/gu, '5')
    .replace(/\bsix\b/gu, '6').replace(/\bseven\b/gu, '7').replace(/\beight\b/gu, '8')
    .replace(/\bnine\b/gu, '9').replace(/\bten\b/gu, '10').replace(/\beleven\b/gu, '11')
    .replace(/\btwelve\b/gu, '12').replace(/\bfifteen\b/gu, '15').replace(/\btwenty\b/gu, '20')
    .replace(/\bthirty\b/gu, '30').replace(/\bforty\b/gu, '40').replace(/\bfifty\b/gu, '50')
    .replace(/\bsixty\b/gu, '60').replace(/\bseventy\b/gu, '70').replace(/\beighty\b/gu, '80').replace(/\bninety\b/gu, '90')
    .replace(/\s+/gu, ' ').trim();
}

export function profileForLabel(label, accent, setNumber) {
  if (label === 'TUTOR' || label === 'PROFESSOR') return `tutor:${accent}`;
  if (FEMALE_NAMES.has(label)) return `student-woman:${accent}`;
  if (MALE_NAMES.has(label)) return `student-man:${accent}`;
  if (STAFF_LABELS.has(label)) return `service-staff:${accent}`;
  if (PARTICIPANT_LABELS.has(label)) return `participant-${setNumber % 2 ? 'woman' : 'man'}:${accent}`;
  return `speaker:${accent}`;
}

export function sectionContentSegments(section, accent, setNumber) {
  const blocks = section.transcript.trim().split(/\n{2,}/u).map(block => block.trim()).filter(Boolean);
  assert.ok(blocks.length, `Set ${setNumber} Part ${section.part}: empty transcript`);
  if (section.part === 2 || section.part === 4) {
    return blocks.map(text => ({ part: section.part, profile: `${section.part === 2 ? 'guide' : 'lecturer'}:${accent}`, text }));
  }
  return blocks.map(block => {
    const match = block.match(/^([A-Z][A-Z0-9 .'-]{1,30}):\s*([\s\S]+)$/u);
    assert.ok(match, `Set ${setNumber} Part ${section.part}: unlabeled dialogue block: ${block.slice(0, 80)}`);
    return { part: section.part, profile: profileForLabel(match[1], accent, setNumber), text: match[2].trim() };
  });
}

export function plannedSegments(section, accent, setNumber, policy) {
  const content = sectionContentSegments(section, accent, setNumber);
  const split = Math.max(1, Math.ceil(content.length / 2));
  const first = (section.part - 1) * 10 + 1;
  const midpoint = first + 4;
  const final = first + 9;
  const announcements = [
    { kind: 'announcer', part: section.part, profile: 'announcer:british', text: `Part ${PART_NAMES[section.part - 1]}. First, review Questions ${first} to ${midpoint}.`, pauseAfterSeconds: 30 },
    { kind: 'announcer', part: section.part, profile: 'announcer:british', text: `Now review Questions ${midpoint + 1} to ${final} before the recording continues.`, pauseAfterSeconds: 30 },
    { kind: 'announcer', part: section.part, profile: 'announcer:british', text: `Part ${PART_NAMES[section.part - 1]} is complete. Check your answers.`, pauseAfterSeconds: section.part === 4 ? 0 : 20 },
  ];
  const turnPause = Number(policy.target.conversationTurnPauseSeconds);
  return [announcements[0],
    ...content.slice(0, split).map(segment => ({ kind: 'content', ...segment, pauseAfterSeconds: turnPause })),
    announcements[1],
    ...content.slice(split).map(segment => ({ kind: 'content', ...segment, pauseAfterSeconds: turnPause })),
    announcements[2]];
}

function sectionForObjectiveRow(sections, row) {
  return sections.find(section => section.questions.some(question => row.key === question.id || row.key.startsWith(`${question.id}__`)));
}

export function auditScript(mock, expandedSections, policy) {
  assert.equal(expandedSections.length, policy.editorial.partsPerSet, `${mock.id} must have four Listening parts`);
  const rows = objectiveRows(mock).filter(row => row.skill === 'listening');
  const numbers = rows.flatMap(row => Array.from({ length: row.weight }, (_, index) => row.number + index));
  const expected = Array.from({ length: policy.editorial.questionsPerSet }, (_, index) => index + 1);
  const failures = [];
  if (JSON.stringify(numbers) !== JSON.stringify(expected)) failures.push('Listening numbering is not exactly Q1-Q40');
  const completionSupport = [];
  for (const row of rows.filter(candidate => candidate.kind === 'fill').sort((a, b) => a.number - b.number)) {
    const section = sectionForObjectiveRow(expandedSections, row);
    const haystack = normalizedEvidenceText(section?.transcript);
    const variants = row.accepted.map(normalizedEvidenceText).filter(Boolean);
    const found = variants.some(variant => ` ${haystack} `.includes(` ${variant} `));
    completionSupport.push({ question: row.number, part: section?.part ?? null, accepted: row.accepted, found });
    if (!found) failures.push(`Q${row.number} completion answer absent from Part ${section?.part ?? '?'}`);
  }
  const partWords = expandedSections.map(section => ({ part: section.part, words: wordCount(section.transcript) }));
  for (const part of partWords) {
    if (part.words < policy.editorial.minimumExpandedWordsPerPart) failures.push(`Part ${part.part} has ${part.words} words; minimum ${policy.editorial.minimumExpandedWordsPerPart}`);
  }
  const totalWords = partWords.reduce((total, part) => total + part.words, 0);
  if (totalWords < policy.editorial.minimumExpandedWordsPerSet) failures.push(`Set has ${totalWords} words; minimum ${policy.editorial.minimumExpandedWordsPerSet}`);
  return { status: failures.length ? 'FAIL' : 'PASS', questions: numbers.length, totalWords, partWords, completionSupport, failures };
}

export function sensitiveTokens(segments) {
  return segments.flatMap((segment, segmentIndex) => [...segment.text.matchAll(/(?:£\s*\d[\d,.]*|\b\d+(?::\d+|[.,]\d+|%|\s*(?:a\.m\.|p\.m\.|am|pm))?|\b[A-Z](?:-[A-Z]){2,}\b)/giu)]
    .map(match => ({ segmentIndex, part: segment.part, token: match[0], textSha256: sha256(segment.text) })));
}

export function releaseAction(setNumber, knownAudioStatus) {
  if (knownAudioStatus === 'CONFIRMED_MISMATCH') return 'REPLACE_CONFIRMED_MISMATCH';
  if (knownAudioStatus === 'MISSING') return 'CREATE_MISSING';
  if (knownAudioStatus === 'FULL_MATCH_REVIEWED') return 'KEEP_VERIFIED';
  return 'AUDIT_BEFORE_REUSE';
}

export function buildInvoice(rows, policy, modelId = policy.generation.defaultModelId) {
  const rate = Number(policy.generation.creditsPerCharacter[modelId]);
  const usdRate = Number(policy.generation.apiPriceUsdPer1000Characters[modelId]);
  assert.ok(Number.isFinite(rate) && Number.isFinite(usdRate), `Missing pricing policy for ${modelId}`);
  const billableCharacters = rows.reduce((total, row) => total + (row.billableCharacters ?? row.sourceCharacters), 0);
  const estimatedCredits = rows.reduce((total, row) => total + row.segments.reduce((sum, segment) => sum + Math.ceil((segment.billableCharacters ?? segment.characters) * rate), 0), 0);
  const contingencyCredits = Math.ceil(estimatedCredits * Number(policy.generation.budgetContingencyRatio));
  return {
    modelId,
    files: rows.length,
    billableCharacters,
    estimatedCredits,
    contingencyCredits,
    maximumPlannedCredits: estimatedCredits + contingencyCredits,
    estimatedUsdBeforeTax: Number((billableCharacters / 1000 * usdRate).toFixed(4)),
    generationAuthorized: false,
  };
}
