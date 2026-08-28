export type IeltsEditorialCertification =
  | 'blocked-known-source-match'
  | 'pending-provenance-review'
  | 'pending-golden-audit'
  | 'certified-reference'
  | 'certified-golden-content';

export interface IeltsEditorialStatus {
  set: number;
  certification: IeltsEditorialCertification;
  contentCertified: boolean;
  provenance: 'blocked-known-third-party-match' | 'pending-manual-review' | 'audited-original-welearn';
  evidence: string;
}

export const IELTS_EDITORIAL_STATUS_2026: Readonly<Record<number, IeltsEditorialStatus>> = Object.fromEntries(
  Array.from({ length: 20 }, (_, index) => {
    const set = index + 1;
    if (set === 1) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'All inherited L/R/W/S material was replaced; Golden content audit passed 270 checks on 2026-08-28. Final audio remains deferred.',
    }];
    if (set === 2) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused topic shells were rebuilt to Golden density and accuracy; audit passed 262 checks on 2026-08-28. Final audio remains deferred.',
    }];
    if (set === 3) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused topic shells were rebuilt and fact-checked; Golden content audit passed 267 checks on 2026-08-28. Final audio remains deferred.',
    }];
    if (set === 4) return [set, {
      set,
      certification: 'certified-reference',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Production reference accepted under the Sets 4–20 structural audit and Listening master QA.',
    }];
    if (set === 5) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Golden content audit passed 120 checks on 2026-08-28; final audio remains deferred.',
    }];
    if (set === 6) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 232 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 7) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 235 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 8) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 236 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 9) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 237 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 10) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 235 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 11) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 235 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    if (set === 12) return [set, {
      set,
      certification: 'certified-golden-content',
      contentCertified: true,
      provenance: 'audited-original-welearn',
      evidence: 'Reused shells were rebuilt and fact-checked; Golden content audit passed 235 checks on 2026-08-28. Legacy audio requires replacement.',
    }];
    return [set, {
      set,
      certification: 'pending-golden-audit',
      contentCertified: false,
      provenance: 'pending-manual-review',
      evidence: 'Authored WeLearn content claim exists, but detailed comparison against the frozen Golden model is pending.',
    }];
  }),
) as Record<number, IeltsEditorialStatus>;
