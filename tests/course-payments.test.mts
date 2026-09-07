import test from 'node:test';
import assert from 'node:assert/strict';
import { parseOrderInput, parseProviderPayment, safeCourseReturnPath, isCourseRequestOrigin } from '../src/lib/course-pricing/payment.ts';
import { TERMS_VERSION,PRIVACY_VERSION,COURSE_LEGAL_READY } from '../src/lib/course-pricing/terms.ts';
const input={idempotencyKey:'12345678-1234-4234-8234-123456789012',selection:{language:'ingles',objective:'general',plan:'constancia',level:'No sé mi nivel'},contact:{studentName:'Estudiante Prueba',studentEmail:'Estudiante@Example.com',payerName:'Pagador Prueba',phone:'+573001234567'},acceptedTerms:TERMS_VERSION,reviewedTerms:TERMS_VERSION,acceptedPrivacy:PRIVACY_VERSION,acceptedAdult:true};
test('server calculates price and requires current explicit legal acceptance',()=>{
 const order=parseOrderInput({...input,amountInCents:1});assert.ok(order);assert.ok(order.amountInCents>1);assert.equal(order.acceptance.privacyVersion,PRIVACY_VERSION);
 assert.equal(order.contact.studentEmail,'estudiante@example.com');
 for(const field of ['acceptedTerms','reviewedTerms','acceptedPrivacy','acceptedAdult'])assert.equal(parseOrderInput({...input,[field]:null}),null);
 assert.equal(parseOrderInput({...input,acceptedTerms:'old'}),null);
 assert.equal(parseOrderInput({...input,contact:{...input.contact,phone:'123'}}),null);
 assert.equal(COURSE_LEGAL_READY,true,'Approved terms can proceed when the operational sales flag is enabled');
});
test('provider must identify transaction, currency and amount',()=>{
 const payment={id:'12345-abc',reference:'WC-12345678-1234-4234-8234-123456789012',currency:'COP',amount_in_cents:32000000,status:'APPROVED'};
 assert.ok(parseProviderPayment(payment));
 for(const patch of [{currency:'USD'},{amount_in_cents:1.5},{reference:'invented'},{status:'PAID'},{id:''}])assert.equal(parseProviderPayment({...payment,...patch}),null);
});
test('login return cannot leave the site or enter other app routes',()=>{
 assert.equal(safeCourseReturnPath('/inscripcion?orden=123'),'/inscripcion?orden=123');
 for(const path of ['//evil.example','/precios/../admin','/inscripcion-evil','https://evil.example','/precios\\@evil.example'])assert.equal(safeCourseReturnPath(path),'/dashboard');
});

test('same-origin validation respects Next proxy host without trusting arbitrary redirects',()=>{
 assert.equal(isCourseRequestOrigin('http://127.0.0.1:3106','127.0.0.1:3106','preview'),true);
 assert.equal(isCourseRequestOrigin('https://www.idiomaswl.com','www.idiomaswl.com','production'),true);
 assert.equal(isCourseRequestOrigin('https://evil.example','www.idiomaswl.com','production'),false);
 assert.equal(isCourseRequestOrigin('https://evil.example','evil.example','production'),false);
 assert.equal(isCourseRequestOrigin(null,'www.idiomaswl.com','production'),false);
 assert.equal(isCourseRequestOrigin('http://www.idiomaswl.com','www.idiomaswl.com','production'),false);
});
