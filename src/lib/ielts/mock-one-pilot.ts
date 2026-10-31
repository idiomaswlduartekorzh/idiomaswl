/** Local pilot switch. Production stays closed until budget and privacy review. */
export function isIeltsMockOnePilot(mockId: string): boolean {
  return mockId === 'set-1'
    && process.env.NODE_ENV === 'development'
    && process.env.IELTS_MOCK1_FREE_ENABLED === '1';
}

/** Database-backed limits; the RPC hashes identifiers before storage. */
export const IELTS_MOCK_ONE_DAILY_LIMITS = {
  perTask: 2,
  perEmail: 4,
  perIp: 6,
  global: 30,
  windowSeconds: 86_400,
} as const;
