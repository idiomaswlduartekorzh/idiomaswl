import type { DiagnosticBankRecord } from '../types.ts';
import type { DiagnosticWritingPromptRecord } from '../../../lib/diagnostic/writing.ts';

/**
 * Reserved objective bank registry. It intentionally remains empty until
 * candidate items pass linguistic review; the start service fails closed when
 * capacity is incomplete.
 */
export const ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK_VERSION = 'en-objective-bank-pending-review-v1';
export const ENGLISH_DIAGNOSTIC_OBJECTIVE_BANK: readonly DiagnosticBankRecord[] = [];

/** Kept empty until the reserved prompt candidates complete linguistic review and approval. */
export const ENGLISH_DIAGNOSTIC_WRITING_BANK_VERSION = 'en-writing-bank-pending-review-v1';
export const ENGLISH_DIAGNOSTIC_WRITING_BANK: readonly DiagnosticWritingPromptRecord[] = [];
