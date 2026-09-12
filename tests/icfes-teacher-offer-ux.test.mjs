import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { ICFES_TEACHER_ADDENDUM } from '../src/lib/icfes/teacher-ops-v1.ts';
import { parseXpressOrderInput } from '../src/lib/xpress-commerce/payment.ts';
import { XPRESS_PRIVACY_VERSION, XPRESS_TERMS_VERSION } from '../src/lib/xpress-commerce/terms.ts';

const read = (path) => readFileSync(path, 'utf8');
const idempotencyKey = '12345678-1234-4234-8234-123456789012';

test('ICFES teacher checkout requires and records the exact visible addendum', () => {
  const base = {
    idempotencyKey,
    examSlug: 'icfes',
    offerId: 'exam-teacher',
    acceptedTerms: XPRESS_TERMS_VERSION,
    acceptedPrivacy: XPRESS_PRIVACY_VERSION,
  };
  assert.equal(parseXpressOrderInput(base), null);
  assert.deepEqual(parseXpressOrderInput({
    ...base,
    acceptedIcfesTeacherAddendum: ICFES_TEACHER_ADDENDUM.version,
  }), {
    ...base,
    acceptedIcfesTeacherAddendum: ICFES_TEACHER_ADDENDUM.version,
  });
});

test('other exams keep their existing teacher checkout contract', () => {
  const ielts = {
    idempotencyKey,
    examSlug: 'ielts',
    offerId: 'exam-teacher',
    acceptedTerms: XPRESS_TERMS_VERSION,
    acceptedPrivacy: XPRESS_PRIVACY_VERSION,
  };
  assert.deepEqual(parseXpressOrderInput(ielts), ielts);
});

test('ICFES keeps its attempt-bound COP 12,000 pass separate from generic exam credits', () => {
  assert.equal(parseXpressOrderInput({
    idempotencyKey,
    examSlug: 'icfes',
    offerId: 'exam-single',
    acceptedTerms: XPRESS_TERMS_VERSION,
    acceptedPrivacy: XPRESS_PRIVACY_VERSION,
  }), null);
  const client = read('src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx');
  const auth = read('src/app/(auth)/login/AuthForm.tsx');
  assert.match(client, /examSlug === 'icfes'[\s\S]{0,100}offer\.id !== 'exam-single'/);
  assert.match(auth, /exam !== 'icfes' \|\| offer\.id !== 'exam-single'/);
});

test('the ICFES UI states one credit, a capacity-dependent target and explicit acceptance', () => {
  const client = read('src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx');
  assert.match(client, /Incluye un solo crédito de revisión humana durante los 30 días/);
  assert.match(client, /Objetivo de entrega en 12 horas, sujeto a capacidad disponible/);
  assert.match(client, /no una garantía/);
  assert.match(client, /acceptedIcfesTeacherAddendum: icfesTeacherAddendum\.version/);
  assert.match(client, /!isIcfesTeacherSelected \|\| \(acceptedIcfesTeacherAddendum && Boolean\(icfesTeacherAddendum\)\)/);
  assert.match(client, /term\.title !== \(icfesTeacherAddendum\?\.supersedesSection \?\? 'Correcciones'\)/);
  assert.match(client, /isIcfesTeacherOffer[\s\S]{0,300}objetivo de 12 horas|Objetivo de entrega en 12 horas/);
});

test('server-derived readiness fails closed before any ICFES teacher order', () => {
  const readiness = read('src/lib/icfes/teacher-offer-readiness.server.ts');
  const page = read('src/app/(site)/suscripcion/examenes/page.tsx');
  const route = read('src/app/api/xpress-orders/route.ts');
  const checkout = read('src/app/api/xpress-orders/[orderId]/checkout/route.ts');
  assert.match(readiness, /ICFES_PERSISTENCE_ENABLED !== 'true'/);
  assert.match(readiness, /getIcfesMembershipOfferReadiness/);
  assert.match(readiness, /from\('icfes_privacy_contracts'\)/);
  assert.match(readiness, /\.eq\('status', 'APPROVED'\)/);
  assert.match(readiness, /\.limit\(2\)/);
  assert.match(readiness, /data\.length !== 1/);
  for (const field of [
    'attempt_retention_days', 'export_response_days', 'deletion_response_days', 'minor_handling',
    'processing_purpose', 'legal_basis', 'approved_by', 'approval_evidence_ref', 'approved_at',
  ]) assert.ok(readiness.includes(field), `missing approved privacy field: ${field}`);
  assert.equal(
    [...readiness.matchAll(/await hasExactlyOneCompleteApprovedPrivacyContract\(\)/g)].length,
    3,
    'new orders, resumed orders and review requests must fail closed on the privacy contract',
  );
  assert.ok(
    readiness.indexOf('await hasExactlyOneCompleteApprovedPrivacyContract()')
      < readiness.indexOf("rpc('xpress_teacher_capacity_status'"),
    'privacy approval must be checked before capacity',
  );
  assert.match(readiness, /rpc\('xpress_teacher_capacity_status'/);
  assert.match(readiness, /capacity-check-unavailable/);
  assert.match(page, /exam\.id === 'icfes' \? getIcfesTeacherOfferReadiness\(\) : Promise\.resolve\(null\)/);
  assert.match(page, /exam\.id === 'icfes' \? getIcfesMembershipOfferReadiness\(\) : Promise\.resolve\(null\)/);
  assert.match(page, /!icfesTeacherReadiness\?\.purchasable[\s\S]{0,80}\? 'exam-auto'/);
  assert.match(page, /version: ICFES_TEACHER_ADDENDUM\.version/);
  assert.match(route, /getIcfesTeacherOfferReadiness\(\)/);
  assert.match(route, /getIcfesMembershipOfferReadiness\(\)/);
  assert.match(route, /code: 'icfes_membership_unavailable'/);
  assert.match(route, /code: 'icfes_teacher_unavailable'/);
  assert.match(route, /alternativeOfferId: 'exam-auto'/);
  assert.match(route, /icfes_teacher_capacity_reservation_failed/);
  assert.match(readiness, /from\('xpress_teacher_capacity_reservations'\)/);
  assert.match(readiness, /\['held', 'order_linked'\]\.includes/);
  assert.match(checkout, /order\.exam_slug === 'icfes' && order\.offer_id === 'exam-teacher'/);
  assert.match(checkout, /getIcfesTeacherOrderCheckoutReadiness\(orderId\)/);
  assert.match(checkout, /code: 'icfes_teacher_unavailable'/);
});

test('unavailable teacher tier is visibly disabled and accessibility-linked', () => {
  const client = read('src/app/(site)/suscripcion/examenes/XpressMembershipClient.tsx');
  assert.match(client, /disabled=\{active \|\| blockedDowngrade \|\| includedByMembership \|\| membershipUnavailable \|\| teacherUnavailable\}/);
  assert.match(client, /aria-disabled=\{membershipUnavailable \|\| teacherUnavailable \|\| undefined\}/);
  assert.match(client, /icfes-teacher-availability/);
  assert.match(client, /No disponible para compra\. El plan automático sigue disponible\./);
  assert.match(client, /disabled=\{busy \|\| !hasRequiredAcceptances \|\| isIcfesMembershipUnavailable \|\| isIcfesTeacherUnavailable \|\| attemptClaim === 'claiming' \|\| attemptClaim === 'error'\}/);
});
