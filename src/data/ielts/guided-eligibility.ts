import eligibility from '../../../config/ielts-guided-eligibility.json' with { type: 'json' };

type GuidedEligibilityManifest = {
  schemaVersion: number;
  policy: {
    failClosed: boolean;
    requiredGates: string[];
    note: string;
  };
  eligibleSets: number[];
  stagedSets: number[];
  stagedStatus: string;
};

const manifest = eligibility as GuidedEligibilityManifest;

function validateSetNumbers(label: string, values: readonly number[]) {
  if (
    values.length === 0
    || new Set(values).size !== values.length
    || values.some(value => !Number.isSafeInteger(value) || value < 1 || value > 40)
  ) {
    throw new Error(`IELTS guided eligibility: ${label} must contain unique set numbers from 1 to 40.`);
  }
}

validateSetNumbers('eligibleSets', manifest.eligibleSets);
validateSetNumbers('stagedSets', manifest.stagedSets);

if (manifest.schemaVersion !== 1 || manifest.policy.failClosed !== true) {
  throw new Error('IELTS guided eligibility manifest must use the fail-closed v1 policy.');
}
if (manifest.policy.requiredGates.length !== 5) {
  throw new Error('IELTS guided eligibility manifest is missing required content gates.');
}
if (manifest.eligibleSets.some(setNumber => manifest.stagedSets.includes(setNumber))) {
  throw new Error('IELTS guided eligibility cannot mark one set as both eligible and staged.');
}

export const IELTS_GUIDED_ELIGIBILITY = Object.freeze({
  schemaVersion: manifest.schemaVersion,
  eligibleSets: Object.freeze([...manifest.eligibleSets]),
  stagedSets: Object.freeze([...manifest.stagedSets]),
  stagedStatus: manifest.stagedStatus,
  requiredGates: Object.freeze([...manifest.policy.requiredGates]),
});

export const IELTS_GUIDED_MOCK_IDS = Object.freeze(
  manifest.eligibleSets.map(setNumber => `set-${setNumber}`),
) as readonly string[];

export function isIeltsGuidedMockEligible(mockId: string) {
  return IELTS_GUIDED_MOCK_IDS.includes(mockId);
}
