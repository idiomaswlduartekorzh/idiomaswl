import set1 from '../../../config/ielts-harness/evidence/set-1.json' with { type: 'json' };
import set2 from '../../../config/ielts-harness/evidence/set-2.json' with { type: 'json' };
import set3 from '../../../config/ielts-harness/evidence/set-3.json' with { type: 'json' };
import set4 from '../../../config/ielts-harness/evidence/set-4.json' with { type: 'json' };
import set5 from '../../../config/ielts-harness/evidence/set-5.json' with { type: 'json' };
import set6 from '../../../config/ielts-harness/evidence/set-6.json' with { type: 'json' };
import set7 from '../../../config/ielts-harness/evidence/set-7.json' with { type: 'json' };
import set8 from '../../../config/ielts-harness/evidence/set-8.json' with { type: 'json' };
import set9 from '../../../config/ielts-harness/evidence/set-9.json' with { type: 'json' };
import set10 from '../../../config/ielts-harness/evidence/set-10.json' with { type: 'json' };
import set11 from '../../../config/ielts-harness/evidence/set-11.json' with { type: 'json' };
import set12 from '../../../config/ielts-harness/evidence/set-12.json' with { type: 'json' };
import set13 from '../../../config/ielts-harness/evidence/set-13.json' with { type: 'json' };
import set14 from '../../../config/ielts-harness/evidence/set-14.json' with { type: 'json' };
import set15 from '../../../config/ielts-harness/evidence/set-15.json' with { type: 'json' };
import set16 from '../../../config/ielts-harness/evidence/set-16.json' with { type: 'json' };
import set17 from '../../../config/ielts-harness/evidence/set-17.json' with { type: 'json' };
import set18 from '../../../config/ielts-harness/evidence/set-18.json' with { type: 'json' };
import set19 from '../../../config/ielts-harness/evidence/set-19.json' with { type: 'json' };
import set20 from '../../../config/ielts-harness/evidence/set-20.json' with { type: 'json' };

export type IeltsListeningEvidenceRecord = {
  question: number;
  responseKey: string;
  part: number;
  startSeconds: number;
  endSeconds: number;
  audiblePhrase: string;
  rationale: string;
  status: string;
};

export type IeltsReadingEvidenceRecord = {
  question: number;
  responseKey: string;
  responseKind: string;
  passagePart: number;
  paragraph: string;
  sourceExcerpt: string;
  rationale: string;
  status: string;
};

export type IeltsGuidedEvidenceArtifact = {
  set: number;
  listening: { questions: IeltsListeningEvidenceRecord[] };
  reading: { questions: IeltsReadingEvidenceRecord[] };
};

const evidenceBySet: Record<string, IeltsGuidedEvidenceArtifact> = {
  'set-1': set1,
  'set-2': set2,
  'set-3': set3,
  'set-4': set4,
  'set-5': set5,
  'set-6': set6,
  'set-7': set7,
  'set-8': set8,
  'set-9': set9,
  'set-10': set10,
  'set-11': set11,
  'set-12': set12,
  'set-13': set13,
  'set-14': set14,
  'set-15': set15,
  'set-16': set16,
  'set-17': set17,
  'set-18': set18,
  'set-19': set19,
  'set-20': set20,
};

export function getIeltsGuidedEvidence(mockId: string) {
  const artifact = evidenceBySet[mockId];
  if (!artifact) throw new Error(`Falta el artefacto de evidencia guiada para ${mockId}.`);
  for (const skill of ['listening', 'reading'] as const) {
    const rows = artifact[skill].questions;
    const allowedStatuses = skill === 'listening'
      ? new Set(['APPROVED', 'PENDING_INDEPENDENT_REVIEW'])
      : new Set(['APPROVED']);
    if (
      rows.length !== 40
      || new Set(rows.map(row => row.question)).size !== 40
      || rows.some(row => !allowedStatuses.has(row.status))
    ) {
      throw new Error(`IELTS ${mockId}: evidencia ${skill} incompleta o con estado inválido.`);
    }
  }
  return artifact;
}
