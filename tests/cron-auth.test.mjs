import assert from 'node:assert/strict';
import test from 'node:test';
import {isAuthorizedCronRequest} from '../src/lib/cron-auth.ts';

test('cron recovery requires an exact long bearer secret',()=>{
  const secret='course-recovery-secret-123';
  assert.equal(isAuthorizedCronRequest(`Bearer ${secret}`,secret),true);
  assert.equal(isAuthorizedCronRequest(`Bearer ${secret}x`,secret),false);
  assert.equal(isAuthorizedCronRequest(null,secret),false);
  assert.equal(isAuthorizedCronRequest('Bearer short','short'),false);
});
