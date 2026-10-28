import type { MockExam, MockSection, Question, TableGroupQuestion } from '../mocks/types.ts';
import type {
  IeltsGuidedEvidenceArtifact,
  IeltsListeningEvidenceRecord,
  IeltsReadingEvidenceRecord,
} from './guided-evidence.ts';
export { IELTS_GUIDED_MOCK_IDS } from './guided-eligibility.ts';
import { IELTS_GUIDED_MOCK_IDS } from './guided-eligibility.ts';

export type IeltsGuidedAudioFile = {
  ready: boolean;
  url: string | null;
  durationSeconds: number | null;
};

export type IeltsGuidedReferenceSampleBase = {
  label: string;
  transcript?: string;
  verdict: string;
  criteria: readonly (readonly [string, string])[];
};

export type IeltsGuidedWritingReference = {
  prompt: string;
  samples: Record<'5.5' | '9.0', IeltsGuidedReferenceSampleBase & {
    answer: string;
    wordCount: number;
    notice: readonly string[];
  }>;
};

export type IeltsGuidedSpeakingReference = {
  cueCard: string;
  fullCueCard: string;
  bullets: readonly string[];
  pedagogicalNotice: string;
  samples: Record<'5.5' | '9.0', IeltsGuidedReferenceSampleBase & {
    audio: IeltsGuidedAudioFile;
    transcript: string;
  }>;
};

export type IeltsGuidedReferences = {
  writing?: IeltsGuidedWritingReference;
  speaking?: IeltsGuidedSpeakingReference;
};

export type IeltsGuidedEvidence = {
  before: string;
  focus: string;
  after: string;
  /** Approved focus is verbatim; pending evidence remains hidden until independent review. */
  status: 'approved-excerpt' | 'pending-independent-review';
};

export type IeltsGuidedAudioClip = {
  startSeconds: number;
  endSeconds: number;
  audiblePhrase: string;
};

export type IeltsGuidedScoringGroup = {
  id: string;
  itemIds: readonly string[];
  /** One target per mark; each target may contain normalized accepted variants. */
  targets: readonly (readonly string[])[];
  displayAnswer: string;
};

export type IeltsGuidedVisual = {
  url: string;
  alt: string;
};

export type IeltsGuidedPracticeSegment = {
  startSeconds: number;
  endSeconds: number;
  questionNumbers: readonly number[];
  basis: 'approved-evidence-slice';
};

export type IeltsGuidedObjectiveItem = {
  id: string;
  number: number;
  kind: 'fill' | 'choice';
  prompt: string;
  frame: string;
  options?: readonly string[];
  answer: string;
  accepted: readonly string[];
  scoringGroup?: IeltsGuidedScoringGroup;
  visual?: IeltsGuidedVisual;
  evidence: IeltsGuidedEvidence;
  audioClip?: IeltsGuidedAudioClip;
  explanation: string;
  trap: string;
};

export type IeltsGuidedUnit = {
  id: string;
  skill: 'listening' | 'reading';
  part: number;
  segment: 1 | 2;
  title: string;
  instructions: string;
  sourceText: string;
  audioUrl?: string;
  practiceSegments?: readonly IeltsGuidedPracticeSegment[];
  visuals: readonly IeltsGuidedVisual[];
  items: readonly IeltsGuidedObjectiveItem[];
};

export type IeltsGuidedMockData = {
  mockId: string;
  setNumber: number;
  title: string;
  subtitle: string;
  listeningUnits: readonly IeltsGuidedUnit[];
  readingUnits: readonly IeltsGuidedUnit[];
  references: IeltsGuidedReferences;
};

export function normalizeIeltsGuidedAnswer(value: string) {
  return value.toLocaleLowerCase('en').replace(/[’‘]/g, "'").replace(/\s+/g, ' ').trim();
}

export function sanitizeIeltsGuidedIndex(value: unknown, length: number) {
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value < length ? value : 0;
}

function acceptedAnswers(answers: readonly string[]) {
  return [...new Set(answers.map(normalizeIeltsGuidedAnswer).filter(Boolean))];
}

/**
 * Scores an unordered group as a one-to-one matching problem. A response may
 * satisfy at most one target, so repeating one valid answer cannot earn two marks.
 */
export function getIeltsGuidedCorrectItemIds(
  items: readonly IeltsGuidedObjectiveItem[],
  answers: Readonly<Record<string, string>>,
) {
  const result = new Set<string>();
  const groups = new Map<string, IeltsGuidedScoringGroup>();

  for (const item of items) {
    if (!item.scoringGroup) {
      if (item.accepted.includes(normalizeIeltsGuidedAnswer(answers[item.id] ?? ''))) result.add(item.id);
      continue;
    }
    groups.set(item.scoringGroup.id, item.scoringGroup);
  }

  for (const group of groups.values()) {
    const responses = group.itemIds.map(itemId => normalizeIeltsGuidedAnswer(answers[itemId] ?? ''));
    let bestMatches: readonly (number | null)[] = responses.map(() => null);
    let bestScore = -1;

    const search = (responseIndex: number, usedTargets: Set<number>, matches: (number | null)[]) => {
      if (responseIndex === responses.length) {
        const score = matches.filter(match => match !== null).length;
        if (score > bestScore) {
          bestScore = score;
          bestMatches = [...matches];
        }
        return;
      }

      const response = responses[responseIndex];
      if (response) {
        group.targets.forEach((target, targetIndex) => {
          if (!usedTargets.has(targetIndex) && target.includes(response)) {
            usedTargets.add(targetIndex);
            matches.push(targetIndex);
            search(responseIndex + 1, usedTargets, matches);
            matches.pop();
            usedTargets.delete(targetIndex);
          }
        });
      }
      matches.push(null);
      search(responseIndex + 1, usedTargets, matches);
      matches.pop();
    };

    search(0, new Set(), []);
    bestMatches.forEach((target, index) => {
      if (target !== null) result.add(group.itemIds[index]);
    });
  }

  return result;
}

function templateFrame(template: string, number: number) {
  const marker = `{{${number}}}`;
  const line = template.split('\n').find(value => value.includes(marker)) ?? template;
  return line
    .replace(marker, '_____')
    .replace(/{{\d+}}/g, '[respuesta]')
    .replace(/^\s*[•*-]\s*/, '')
    .trim();
}

function tableFrame(question: TableGroupQuestion, number: number) {
  for (const row of question.rows) {
    const targetIndex = row.findIndex(cell => typeof cell !== 'string' && cell.num === number);
    if (targetIndex < 0) continue;
    const context = row
      .filter((cell, index) => index !== targetIndex && typeof cell === 'string' && cell.trim())
      .slice(0, 2)
      .join(' · ');
    const heading = question.headers[targetIndex] ?? 'Respuesta';
    return `${context ? `${context} · ` : ''}${heading}: _____`;
  }
  return `Pregunta ${number}: _____`;
}

function objectiveItem(input: {
  id: string;
  number: number;
  kind: IeltsGuidedObjectiveItem['kind'];
  prompt: string;
  frame: string;
  options?: readonly string[];
  answer: string;
  accepted: readonly string[];
  scoringGroup?: IeltsGuidedScoringGroup;
  visual?: IeltsGuidedVisual;
  skill: 'listening' | 'reading';
  evidenceRecord: IeltsListeningEvidenceRecord | IeltsReadingEvidenceRecord;
}): IeltsGuidedObjectiveItem {
  const approved = input.evidenceRecord.status === 'APPROVED';
  const sourceExcerpt = approved
    ? ('audiblePhrase' in input.evidenceRecord ? input.evidenceRecord.audiblePhrase : input.evidenceRecord.sourceExcerpt)
    : '';
  const evidence: IeltsGuidedEvidence = {
    before: '',
    focus: sourceExcerpt,
    after: '',
    status: approved ? 'approved-excerpt' : 'pending-independent-review',
  };
  return {
    id: input.id,
    number: input.number,
    kind: input.kind,
    prompt: input.prompt,
    frame: input.frame,
    options: input.options,
    answer: input.answer,
    accepted: acceptedAnswers(input.accepted),
    scoringGroup: input.scoringGroup,
    visual: input.visual,
    evidence,
    audioClip: approved && 'audiblePhrase' in input.evidenceRecord ? {
      startSeconds: input.evidenceRecord.startSeconds,
      endSeconds: input.evidenceRecord.endSeconds,
      audiblePhrase: input.evidenceRecord.audiblePhrase,
    } : undefined,
    explanation: approved
      ? input.evidenceRecord.rationale
      : 'Esta corrección está cerrada hasta que un revisor independiente valide la nueva clave y su evidencia.',
    trap: input.kind === 'fill'
      ? 'Una palabra cercana puede pertenecer a la misma frase y aun así no completar el espacio ni respetar el límite.'
      : 'Los distractores reutilizan palabras o ideas cercanas. Decide por el sentido completo de la evidencia, no por coincidencia superficial.',
  };
}

function numbersFor(question: Question, cursor: number) {
  if ('qRange' in question && question.qRange) {
    return Array.from({ length: question.qRange[1] - question.qRange[0] + 1 }, (_, index) => question.qRange![0] + index);
  }
  const idNumber = question.id.match(/(?:q|question|blank)[-_]?(\d{1,2})$/i)?.[1];
  return [idNumber ? Number(idNumber) : cursor];
}

function evidenceFor(artifact: IeltsGuidedEvidenceArtifact, skill: 'listening' | 'reading', number: number) {
  const row = artifact[skill].questions.find(candidate => candidate.question === number);
  if (!row || (row.status !== 'APPROVED' && !(skill === 'listening' && row.status === 'PENDING_INDEPENDENT_REVIEW'))) {
    throw new Error(`IELTS set-${artifact.set}: falta evidencia válida de ${skill} para la pregunta ${number}.`);
  }
  return row;
}

function flattenQuestion(
  question: Question,
  section: MockSection,
  cursor: number,
  skill: 'listening' | 'reading',
  artifact: IeltsGuidedEvidenceArtifact,
): IeltsGuidedObjectiveItem[] {
  const numbers = numbersFor(question, cursor);
  const visual = 'imageUrl' in question && question.imageUrl
    ? { url: question.imageUrl, alt: question.imageAlt ?? '' }
    : undefined;

  if (question.type === 'formgroup') {
    const scoringGroupByNumber = new Map<number, IeltsGuidedScoringGroup>();
    for (const [groupIndex, groupNumbers] of (question.unorderedAnswerGroups ?? []).entries()) {
      const groupedBlanks = groupNumbers.map(number => question.blanks.find(blank => blank.num === number));
      if (groupedBlanks.some(blank => !blank)) {
        throw new Error(`${artifact.set}:${skill}:${question.id}: unorderedAnswerGroups contiene una pregunta inexistente.`);
      }
      const displayAnswer = `${groupedBlanks.map(blank => blank!.answers[0]).join(' / ')} (en cualquier orden)`;
      const scoringGroup: IeltsGuidedScoringGroup = {
        id: `${skill}-${section.part}-${question.id}-unordered-${groupIndex + 1}`,
        itemIds: groupNumbers.map(number => `${skill}-${section.part}-${question.id}-${number}`),
        targets: groupedBlanks.map(blank => acceptedAnswers(blank!.answers)),
        displayAnswer,
      };
      groupNumbers.forEach(number => scoringGroupByNumber.set(number, scoringGroup));
    }
    return question.blanks.map(blank => objectiveItem({
      id: `${skill}-${section.part}-${question.id}-${blank.num}`,
      number: blank.num,
      kind: 'fill',
      prompt: question.groupLabel,
      frame: templateFrame(question.template, blank.num),
      answer: scoringGroupByNumber.get(blank.num)?.displayAnswer ?? blank.answers[0],
      accepted: blank.answers,
      scoringGroup: scoringGroupByNumber.get(blank.num),
      visual,
      skill,
      evidenceRecord: evidenceFor(artifact, skill, blank.num),
    }));
  }

  if (question.type === 'tablegroup') {
    const blanks = question.rows.flatMap(row => row.filter(cell => typeof cell !== 'string'));
    return blanks.map(blank => objectiveItem({
      id: `${skill}-${section.part}-${question.id}-${blank.num}`,
      number: blank.num,
      kind: 'fill',
      prompt: question.groupLabel,
      frame: tableFrame(question, blank.num),
      answer: blank.answers[0],
      accepted: blank.answers,
      skill,
      evidenceRecord: evidenceFor(artifact, skill, blank.num),
    }));
  }

  if (question.type === 'multiselect') {
    const itemIds = numbers.map(number => `${skill}-${section.part}-${question.id}-${number}`);
    const targets = question.answers.map(answerLetter => {
      const answerOption = question.options.find(option => option.letter === answerLetter);
      return acceptedAnswers([answerLetter, answerOption ? `${answerLetter} · ${answerOption.text}` : answerLetter]);
    });
    const displayAnswer = `${question.answers.map(answerLetter => {
      const answerOption = question.options.find(option => option.letter === answerLetter);
      return answerOption ? `${answerLetter} · ${answerOption.text}` : answerLetter;
    }).join(' / ')} (en cualquier orden)`;
    const scoringGroup: IeltsGuidedScoringGroup = {
      id: `${skill}-${section.part}-${question.id}-multiselect`,
      itemIds,
      targets,
      displayAnswer,
    };
    return numbers.map((number, index) => {
      const answerLetter = question.answers[index];
      const answerOption = question.options.find(option => option.letter === answerLetter);
      const answer = answerOption ? `${answerLetter} · ${answerOption.text}` : answerLetter;
      return objectiveItem({
        id: `${skill}-${section.part}-${question.id}-${number}`,
        number,
        kind: 'choice',
        prompt: question.text,
        frame: `Selecciona una de las ${question.selectCount} respuestas correctas.`,
        options: question.options.map(option => `${option.letter} · ${option.text}`),
        answer: displayAnswer,
        accepted: [answerLetter, answer],
        scoringGroup,
        skill,
        evidenceRecord: evidenceFor(artifact, skill, number),
      });
    });
  }

  if (question.type === 'matching') {
    return question.items.map(item => {
      const ending = question.endings.find(option => option.letter === item.answer)?.text;
      const answer = ending ? `${item.answer} · ${ending}` : item.answer;
      return objectiveItem({
        id: `${skill}-${section.part}-${question.id}-${item.num}`,
        number: item.num,
        kind: 'choice',
        prompt: question.groupLabel ?? 'Match each statement with the correct option.',
        frame: item.stem,
        options: question.endings.map(option => `${option.letter} · ${option.text}`),
        answer,
        accepted: [item.answer, answer],
        visual,
        skill,
        evidenceRecord: evidenceFor(artifact, skill, item.num),
      });
    });
  }

  if (question.type === 'mcq' || question.type === 'dialog') {
    const option = question.options[question.answer];
    const letter = String.fromCharCode(65 + question.answer);
    const answer = `${letter} · ${option}`;
    return [objectiveItem({
      id: `${skill}-${section.part}-${question.id}-${numbers[0]}`,
      number: numbers[0],
      kind: 'choice',
      prompt: question.text,
      frame: question.stimulus ?? 'Choose the correct answer.',
      options: question.options.map((value, index) => `${String.fromCharCode(65 + index)} · ${value}`),
      answer,
      accepted: [letter, answer, option],
      visual,
      skill,
      evidenceRecord: evidenceFor(artifact, skill, numbers[0]),
    })];
  }

  if (question.type === 'fill') {
    return [objectiveItem({
      id: `${skill}-${section.part}-${question.id}-${numbers[0]}`,
      number: numbers[0],
      kind: 'fill',
      prompt: section.instructions,
      frame: question.text,
      answer: question.answers[0],
      accepted: question.answers,
      skill,
      evidenceRecord: evidenceFor(artifact, skill, numbers[0]),
    })];
  }

  return [];
}

function flattenSection(section: MockSection, skill: 'listening' | 'reading', firstNumber: number, artifact: IeltsGuidedEvidenceArtifact) {
  const items: IeltsGuidedObjectiveItem[] = [];
  let cursor = firstNumber;
  for (const question of section.questions) {
    const next = flattenQuestion(question, section, cursor, skill, artifact);
    items.push(...next);
    cursor = Math.max(cursor + next.length, ...next.map(item => item.number + 1));
  }
  return items.sort((left, right) => left.number - right.number);
}

function practiceSegmentsFor(items: readonly IeltsGuidedObjectiveItem[]): IeltsGuidedPracticeSegment[] {
  const clips = items
    .flatMap(item => item.audioClip ? [{ ...item.audioClip, questionNumber: item.number }] : [])
    .sort((left, right) => left.startSeconds - right.startSeconds || left.endSeconds - right.endSeconds);
  const segments: IeltsGuidedPracticeSegment[] = [];
  for (const clip of clips) {
    const previous = segments.at(-1);
    if (previous && clip.startSeconds <= previous.endSeconds) {
      segments[segments.length - 1] = {
        ...previous,
        endSeconds: Math.max(previous.endSeconds, clip.endSeconds),
        questionNumbers: [...new Set([...previous.questionNumbers, clip.questionNumber])].sort((left, right) => left - right),
      };
      continue;
    }
    segments.push({
      startSeconds: clip.startSeconds,
      endSeconds: clip.endSeconds,
      questionNumbers: [clip.questionNumber],
      basis: 'approved-evidence-slice',
    });
  }
  return segments;
}

/**
 * Listening keys are normally numbered in evidence order, but a few canonical
 * task groups intentionally revisit an earlier/later phrase. Build the two
 * practice blocks from non-overlapping temporal components instead of cutting
 * blindly after question 5. Question numbers and scoring groups stay intact;
 * only their block assignment changes.
 */
function splitListeningItemsChronologically(items: readonly IeltsGuidedObjectiveItem[]) {
  const clusters = new Map<string, IeltsGuidedObjectiveItem[]>();
  for (const item of items) {
    const clusterId = item.scoringGroup?.id ?? item.id;
    clusters.set(clusterId, [...(clusters.get(clusterId) ?? []), item]);
  }
  const ordered = [...clusters.values()].map(clusterItems => ({
    items: clusterItems,
    startSeconds: Math.min(...clusterItems.map(item => item.audioClip?.startSeconds ?? Number.POSITIVE_INFINITY)),
    endSeconds: Math.max(...clusterItems.map(item => item.audioClip?.endSeconds ?? Number.NEGATIVE_INFINITY)),
  })).sort((left, right) => left.startSeconds - right.startSeconds
    || Math.min(...left.items.map(item => item.number)) - Math.min(...right.items.map(item => item.number)));

  const components: { items: IeltsGuidedObjectiveItem[]; startSeconds: number; endSeconds: number }[] = [];
  for (const cluster of ordered) {
    const previous = components.at(-1);
    if (previous && cluster.startSeconds <= previous.endSeconds) {
      previous.items.push(...cluster.items);
      previous.endSeconds = Math.max(previous.endSeconds, cluster.endSeconds);
    } else {
      components.push({ ...cluster, items: [...cluster.items] });
    }
  }
  if (components.length < 2) throw new Error('Listening part cannot be divided into two chronological evidence blocks.');

  const target = items.length / 2;
  let bestBoundary = 1;
  let cumulative = components[0].items.length;
  let bestDistance = Math.abs(cumulative - target);
  for (let index = 2; index < components.length; index += 1) {
    cumulative += components[index - 1].items.length;
    const distance = Math.abs(cumulative - target);
    if (distance < bestDistance) {
      bestDistance = distance;
      bestBoundary = index;
    }
  }
  return [
    components.slice(0, bestBoundary).flatMap(component => component.items).sort((left, right) => left.number - right.number),
    components.slice(bestBoundary).flatMap(component => component.items).sort((left, right) => left.number - right.number),
  ];
}

function splitSection(section: MockSection, skill: 'listening' | 'reading', firstNumber: number, artifact: IeltsGuidedEvidenceArtifact): IeltsGuidedUnit[] {
  const items = flattenSection(section, skill, firstNumber, artifact);
  let halves: readonly IeltsGuidedObjectiveItem[][];
  if (skill === 'listening') {
    halves = splitListeningItemsChronologically(items);
  } else {
    let pivot = Math.ceil(items.length / 2);
    while (
      pivot < items.length
      && items[pivot - 1]?.scoringGroup?.id
      && items[pivot - 1]?.scoringGroup?.id === items[pivot]?.scoringGroup?.id
    ) pivot += 1;
    halves = [items.slice(0, pivot), items.slice(pivot)];
  }
  const sourceText = skill === 'listening' ? section.transcript ?? '' : section.passage ?? '';
  return halves.map((unitItems, index) => {
    const visuals = [...new Map(unitItems.flatMap(item => item.visual ? [[item.visual.url, item.visual] as const] : [])).values()];
    const practiceSegments = skill === 'listening' ? practiceSegmentsFor(unitItems) : undefined;
    return {
      id: `${skill}-${section.part}-${index + 1}`,
      skill,
      part: section.part,
      segment: (index + 1) as 1 | 2,
      title: section.title,
      instructions: section.instructions,
      sourceText,
      audioUrl: skill === 'listening' ? section.audioUrl : undefined,
      practiceSegments,
      visuals,
      items: unitItems,
    };
  });
}

function validateUnits(mockId: string, skill: 'listening' | 'reading', units: readonly IeltsGuidedUnit[], expectedUnits: number) {
  const items = units.flatMap(unit => unit.items);
  const numbers = items.map(item => item.number);
  const failures: string[] = [];
  if (units.length !== expectedUnits) failures.push(`${units.length}/${expectedUnits} bloques`);
  if (items.length !== 40) failures.push(`${items.length}/40 preguntas`);
  if (new Set(numbers).size !== numbers.length) failures.push('números duplicados');
  if (numbers.some(number => number < 1 || number > 40)) failures.push('números fuera de 1–40');
  if (items.some(item => !item.answer || item.accepted.length === 0)) failures.push('claves incompletas');
  if (items.some(item => item.evidence.status === 'approved-excerpt' && !item.evidence.focus)) failures.push('evidencia aprobada vacía');
  if (items.some(item => item.evidence.status === 'pending-independent-review' && (item.evidence.focus || item.audioClip))) failures.push('evidencia pendiente expuesta');
  if (items.some(item => item.visual && !item.visual.alt.trim())) failures.push('visual sin texto alternativo');
  if (units.some(unit => !unit.sourceText.trim())) failures.push('fuente vacía');
  if (skill === 'listening' && units.some(unit => {
    const segments = unit.practiceSegments ?? [];
    return segments.length === 0 || segments.some((segment, index) => (
      segment.endSeconds <= segment.startSeconds
      || segment.endSeconds - segment.startSeconds > 60
      || (index > 0 && segment.startSeconds <= segments[index - 1].endSeconds)
    ));
  })) failures.push('segmentos de práctica no verificados, cronológicos o manejables');
  for (const group of new Map(items.flatMap(item => item.scoringGroup ? [[item.scoringGroup.id, item.scoringGroup] as const] : [])).values()) {
    if (group.itemIds.length !== group.targets.length || group.itemIds.some(itemId => !items.some(item => item.id === itemId))) {
      failures.push(`grupo de puntuación inválido: ${group.id}`);
    }
  }
  if (failures.length) throw new Error(`IELTS ${mockId} ${skill} no cumple el contrato guiado: ${failures.join(', ')}`);
}

/**
 * Adapts the canonical mock without copying its questions, keys, transcript or passage.
 * This function deliberately does not invent audio timecodes or approve derived evidence.
 */
export function buildIeltsGuidedMock(mock: MockExam, artifact: IeltsGuidedEvidenceArtifact, references: IeltsGuidedReferences = {}): IeltsGuidedMockData {
  if (mock.examSlug !== 'ielts' || !IELTS_GUIDED_MOCK_IDS.includes(mock.id)) {
    throw new Error(`Mock no elegible para IELTS guiado: ${mock.examSlug}:${mock.id}`);
  }
  const listeningSections = mock.sections.filter(section => section.skill === 'listening');
  const readingSections = mock.sections.filter(section => section.skill === 'reading');
  if (listeningSections.length !== 4 || readingSections.length !== 3) {
    throw new Error(`IELTS ${mock.id} debe tener 4 secciones de Listening y 3 pasajes de Reading.`);
  }

  if (artifact.set !== Number(mock.id.replace('set-', ''))) {
    throw new Error(`IELTS ${mock.id}: el artefacto de evidencia pertenece al set ${artifact.set}.`);
  }
  const listeningUnits = listeningSections.flatMap((section, index) => splitSection(section, 'listening', index * 10 + 1, artifact));
  let readingCursor = 1;
  const readingUnits = readingSections.flatMap(section => {
    const units = splitSection(section, 'reading', readingCursor, artifact);
    readingCursor += units.reduce((sum, unit) => sum + unit.items.length, 0);
    return units;
  });
  validateUnits(mock.id, 'listening', listeningUnits, 8);
  validateUnits(mock.id, 'reading', readingUnits, 6);

  return {
    mockId: mock.id,
    setNumber: Number(mock.id.replace('set-', '')),
    title: mock.title,
    subtitle: mock.subtitle,
    listeningUnits,
    readingUnits,
    references,
  };
}
