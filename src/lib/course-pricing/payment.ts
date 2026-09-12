import { CATALOG_VERSION, selectionDetails, type Selection } from './catalog.ts';
import { TERMS_VERSION, PRIVACY_VERSION } from './terms.ts';
export { TERMS_VERSION } from './terms.ts';
export type Contact = { studentName: string; studentEmail: string; payerName: string; phone: string; address: string; city: string; purpose: string; signerName: string };
function cleanText(value: unknown, min: number, max: number) {
  if (typeof value !== 'string') return null;
  const clean = value.normalize('NFKC').trim().replace(/\s+/g, ' ');
  return clean.length >= min && clean.length <= max && !/[\x00-\x1f<>]/.test(clean) ? clean : null;
}
function comparableName(value: string) { return value.normalize('NFKC').trim().replace(/\s+/g, ' ').toLocaleLowerCase('es-CO'); }
export function parseOrderInput(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const x = value as Record<string, unknown>;
  if (typeof x.idempotencyKey !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(x.idempotencyKey) || x.acceptedTerms !== TERMS_VERSION || x.acceptedPrivacy !== PRIVACY_VERSION || x.acceptedAdult !== true || x.reviewedTerms !== TERMS_VERSION) return null;
  if (!x.selection || typeof x.selection !== 'object' || !x.contact || typeof x.contact !== 'object') return null;
  const s = x.selection as Selection;
  const c = x.contact as Contact;
  try {
    const details = selectionDetails(s);
    const studentName=cleanText(c.studentName,2,100),payerName=cleanText(c.payerName,2,100),address=cleanText(c.address,5,180),city=cleanText(c.city,2,100),purpose=cleanText(c.purpose,10,500),signerName=cleanText(c.signerName,2,100);
    if (!studentName || !payerName || !address || !city || !purpose || !signerName || comparableName(signerName)!==comparableName(payerName)) return null;
    if (typeof c.studentEmail !== 'string' || c.studentEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.studentEmail.trim())) return null;
    if (typeof c.phone !== 'string' || !/^\+[1-9]\d{7,14}$/.test(c.phone.trim())) return null;
    return { idempotencyKey:x.idempotencyKey, selection:{language:s.language,objective:s.objective,plan:s.plan,level:s.level}, contact:{studentName,studentEmail:c.studentEmail.trim().toLowerCase(),payerName,phone:c.phone.trim(),address,city,purpose,signerName}, offerVersion:CATALOG_VERSION, amountInCents:details.plan.price*100, classes:details.classes, termsVersion:TERMS_VERSION, acceptance:{termsVersion:TERMS_VERSION,privacyVersion:PRIVACY_VERSION,adultConfirmed:true,termsReviewed:true,signedBy:signerName,signatureMethod:'typed-full-name' as const} };
  } catch { return null; }
}
export type ProviderPayment = { id: string; reference: string; amount_in_cents: number; currency:'COP'; status:'PENDING'|'APPROVED'|'DECLINED'|'ERROR'|'VOIDED' };
export function parseProviderPayment(value: unknown): ProviderPayment | null {
  if (!value || typeof value !== 'object') return null;
  const p = value as ProviderPayment;
  if (typeof p.id!=='string' || !/^[A-Za-z0-9_-]{6,120}$/.test(p.id) || typeof p.reference!=='string' || !/^WC-[0-9a-f-]{36}$/.test(p.reference) || p.currency!=='COP' || !Number.isSafeInteger(p.amount_in_cents) || p.amount_in_cents<=0 || !['PENDING','APPROVED','DECLINED','ERROR','VOIDED'].includes(p.status)) return null;
  return {id:p.id,reference:p.reference,amount_in_cents:p.amount_in_cents,currency:p.currency,status:p.status};
}
export function safeCourseReturnPath(value: string | null) {
  if (!value || !value.startsWith('/precios') && !value.startsWith('/inscripcion') && !value.startsWith('/suscripcion/examenes')) return '/dashboard';
  try { const u=new URL(value,'https://www.idiomaswl.com'); return u.origin==='https://www.idiomaswl.com' && ['/precios','/inscripcion','/suscripcion/examenes'].includes(u.pathname) ? u.pathname+u.search : '/dashboard'; } catch { return '/dashboard'; }
}
export function isCourseRequestOrigin(originHeader:string|null,host:string|null,environment?:string) {
  try {
    const origin=new URL(originHeader??'');
    if(!['http:','https:'].includes(origin.protocol) || origin.origin!==originHeader || origin.host!==host) return false;
    return environment!=='production' || origin.origin==='https://www.idiomaswl.com';
  } catch { return false; }
}
