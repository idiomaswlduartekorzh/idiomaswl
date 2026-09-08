import { COURSE_LEGAL_READY } from './terms.ts';

// The launch is versioned in Git so production and its rollback remain auditable.
export const COURSE_SALES_RELEASED = true;

export function courseSalesEnabled() {
  return COURSE_LEGAL_READY
    && COURSE_SALES_RELEASED
    && process.env.COURSE_SALES_EMERGENCY_DISABLED !== 'true';
}
