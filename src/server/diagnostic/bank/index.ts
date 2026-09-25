import type { DiagnosticBankRecord } from '../types.ts';
import type { DiagnosticWritingPromptRecord } from '../../../lib/diagnostic/writing.ts';
import approvals from '../../../../config/diagnostic/english-bank-approvals.json' with { type: 'json' };
import { ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES } from './language-use-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES } from './language-use.en.ts';
import { ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES } from './listening.en.ts';
import { ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES } from './listening-recorded.en.ts';
import { ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES } from './reading-advanced.en.ts';
import { ENGLISH_DIAGNOSTIC_READING_CANDIDATES } from './reading.en.ts';
import {
  releaseApprovedObjectiveBank,
  releaseApprovedWritingBank,
  type DiagnosticApprovalManifest,
} from './release.ts';
import { ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES } from './writing.en.ts';

/** Versioned pilot registry. The approval manifest is empty until independent review is recorded. */
export const ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION = 'en-objective-bank-pilot-v1';
const objectiveCandidates: readonly DiagnosticBankRecord[] = [
  ...ENGLISH_DIAGNOSTIC_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_READING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_RECORDED_LISTENING_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_LANGUAGE_USE_CANDIDATES,
  ...ENGLISH_DIAGNOSTIC_ADVANCED_LANGUAGE_USE_CANDIDATES,
];
export const ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK: readonly DiagnosticBankRecord[] = releaseApprovedObjectiveBank(
  objectiveCandidates,
  approvals as DiagnosticApprovalManifest,
);

/** Writing uses the same fail-closed approval manifest and never promotes draft prompts implicitly. */
export const ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION = 'en-writing-bank-pilot-v1';
export const ENGLISH_DIAGNOSTIC_WRITING_BANK: readonly DiagnosticWritingPromptRecord[] = releaseApprovedWritingBank(
  ENGLISH_DIAGNOSTIC_WRITING_CANDIDATES,
  approvals as DiagnosticApprovalManifest,
);
