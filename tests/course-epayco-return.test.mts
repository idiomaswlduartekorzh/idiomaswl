import assert from 'node:assert/strict';
import test from 'node:test';
import { GET } from '../src/app/api/epayco/course/response/[orderId]/route.ts';

const orderId = '9b042327-86d9-4ebf-8947-74d3292f8324';

test('ePayco return keeps the order and payment reference separate', async () => {
  const response = await GET(new Request(`https://www.idiomaswl.com/api/epayco/course/response/${orderId}?ref_payco=206381484`), {
    params: Promise.resolve({ orderId }),
  });
  assert.equal(response.status, 303);
  const location = new URL(response.headers.get('location')!);
  assert.equal(location.pathname, '/inscripcion');
  assert.equal(location.searchParams.get('orden'), orderId);
  assert.equal(location.searchParams.get('ref_payco'), '206381484');
  assert.equal(location.searchParams.get('epayco_retorno'), '1');
});

test('ePayco return strips invalid references but retains a caution marker', async () => {
  const response = await GET(new Request(`https://www.idiomaswl.com/api/epayco/course/response/${orderId}?ref_payco=%3Cscript%3E`), {
    params: Promise.resolve({ orderId }),
  });
  assert.equal(response.status, 303);
  const location = new URL(response.headers.get('location')!);
  assert.equal(location.searchParams.has('ref_payco'), false);
  assert.equal(location.searchParams.get('epayco_retorno'), '1');
  const invalid = await GET(new Request('https://www.idiomaswl.com/api/epayco/course/response/nope'), { params: Promise.resolve({ orderId: 'nope' }) });
  assert.equal(invalid.status, 404);
});
