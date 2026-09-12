import 'server-only';
import { createAdminClient } from '@/lib/supabase/admin';
import { getWompiServerConfig } from '@/lib/wompi/server';

export const ICFES_TEACHER_CHECKOUT_UNAVAILABLE_MESSAGE =
  'El plan docente ICFES no está disponible para compra en este momento. Puedes continuar con el plan automático.' as const;

export type IcfesTeacherOfferReadiness = Readonly<{
  purchasable: boolean;
  reason:
    | 'ready'
    | 'feature-disabled'
    | 'privacy-contract-unavailable'
    | 'capacity-unavailable'
    | 'capacity-check-unavailable';
  message: string | null;
}>;

function unavailable(
  reason: Exclude<IcfesTeacherOfferReadiness['reason'], 'ready'>,
): IcfesTeacherOfferReadiness {
  return {
    purchasable: false,
    reason,
    message: ICFES_TEACHER_CHECKOUT_UNAVAILABLE_MESSAGE,
  };
}

async function hasExactlyOneCompleteApprovedPrivacyContract(): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from('icfes_privacy_contracts')
    .select('version,status,attempt_retention_days,export_response_days,deletion_response_days,minor_handling,processing_purpose,legal_basis,approved_by,approval_evidence_ref,approved_at')
    .eq('status', 'APPROVED')
    .limit(2)
    .abortSignal(AbortSignal.timeout(8000));
  if (error || !Array.isArray(data) || data.length !== 1) return false;
  const contract = data[0] as Record<string, unknown>;
  return typeof contract.version === 'string'
    && /^icfes-privacy-[0-9]{4}-[0-9]{2}-[a-z0-9-]+$/.test(contract.version)
    && contract.status === 'APPROVED'
    && Number.isSafeInteger(contract.attempt_retention_days)
    && Number(contract.attempt_retention_days) >= 1
    && Number.isSafeInteger(contract.export_response_days)
    && Number(contract.export_response_days) >= 1
    && Number.isSafeInteger(contract.deletion_response_days)
    && Number(contract.deletion_response_days) >= 1
    && ['ADULT_ONLY', 'GUARDIAN_ATTESTATION', 'BLOCK_ALL_MINORS'].includes(String(contract.minor_handling))
    && typeof contract.processing_purpose === 'string'
    && contract.processing_purpose.trim().length >= 20
    && typeof contract.legal_basis === 'string'
    && contract.legal_basis.trim().length >= 5
    && typeof contract.approved_by === 'string'
    && contract.approved_by.trim().length >= 2
    && typeof contract.approval_evidence_ref === 'string'
    && contract.approval_evidence_ref.trim().length >= 8
    && typeof contract.approved_at === 'string'
    && Number.isFinite(Date.parse(contract.approved_at));
}

export async function getIcfesTeacherOfferReadiness(): Promise<IcfesTeacherOfferReadiness> {
  if (process.env.ICFES_PERSISTENCE_ENABLED !== 'true') return unavailable('feature-disabled');

  try {
    if (!(await hasExactlyOneCompleteApprovedPrivacyContract())) {
      return unavailable('privacy-contract-unavailable');
    }
    const config = getWompiServerConfig();
    if (process.env.VERCEL_ENV !== 'production' && config.environment === 'production') {
      return unavailable('feature-disabled');
    }
    const { data, error } = await createAdminClient().rpc('xpress_teacher_capacity_status', {
      p_environment: config.environment,
    }).abortSignal(AbortSignal.timeout(8000));
    if (error) throw error;
    const row = Array.isArray(data) ? data[0] : data;
    const purchasable = Boolean(
      row && typeof row === 'object' && (row as Record<string, unknown>).can_reserve === true,
    );
    return purchasable
      ? { purchasable: true, reason: 'ready', message: null }
      : unavailable('capacity-unavailable');
  } catch {
    return unavailable('capacity-check-unavailable');
  }
}

export async function getIcfesTeacherOrderCheckoutReadiness(
  orderId: string,
): Promise<IcfesTeacherOfferReadiness> {
  if (process.env.ICFES_PERSISTENCE_ENABLED !== 'true') return unavailable('feature-disabled');

  try {
    if (!(await hasExactlyOneCompleteApprovedPrivacyContract())) {
      return unavailable('privacy-contract-unavailable');
    }
    const config = getWompiServerConfig();
    if (process.env.VERCEL_ENV !== 'production' && config.environment === 'production') {
      return unavailable('feature-disabled');
    }
    const { data, error } = await createAdminClient()
      .from('xpress_teacher_capacity_reservations')
      .select('status,expires_at')
      .eq('environment', config.environment)
      .eq('order_id', orderId)
      .abortSignal(AbortSignal.timeout(8000))
      .maybeSingle();
    if (error) throw error;
    const status = data?.status;
    const expiresAt = typeof data?.expires_at === 'string' ? Date.parse(data.expires_at) : Number.NaN;
    if (!['held', 'order_linked'].includes(String(status)) || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      return unavailable('capacity-unavailable');
    }
    return { purchasable: true, reason: 'ready', message: null };
  } catch {
    return unavailable('capacity-check-unavailable');
  }
}

export async function isIcfesTeacherReviewRequestReady(membershipId: string): Promise<boolean> {
  if (process.env.ICFES_PERSISTENCE_ENABLED !== 'true') return false;
  try {
    if (!(await hasExactlyOneCompleteApprovedPrivacyContract())) return false;
    const config = getWompiServerConfig();
    const [reservation, capacity] = await Promise.all([
      createAdminClient().from('xpress_teacher_capacity_reservations').select('id')
        .eq('membership_id', membershipId).eq('environment', config.environment).eq('status', 'consumed').maybeSingle(),
      createAdminClient().rpc('xpress_teacher_capacity_status', { p_environment: config.environment }),
    ]);
    if (reservation.error || capacity.error || !reservation.data) return false;
    const row = Array.isArray(capacity.data) ? capacity.data[0] : capacity.data;
    return Boolean(row && typeof row === 'object'
      && Number((row as Record<string, unknown>).calibrated_reviewers) >= 1);
  } catch { return false; }
}
