import assert from 'node:assert/strict';
import test from 'node:test';
import {
  XPRESS_FREE_ENTITLEMENTS,
  XPRESS_OFFERS,
  quoteXpressPurchase,
  xpressAccessEndsAt,
  xpressOfferIncludes,
} from '../src/lib/xpress-commerce/catalog.ts';

const base={requestedOfferId:'single-report',ownsDetailedReportForSubmission:false,now:new Date('2026-09-08T12:00:00Z')};

test('publishes the three approved price points in COP cents',()=>{
  assert.deepEqual(XPRESS_OFFERS.map(({id,amountInCents})=>[id,amountInCents]),[
    ['single-report',1_290_000],['xpress-monthly',4_990_000],['xpress-guided',14_990_000],
  ]);
  assert.deepEqual(XPRESS_FREE_ENTITLEMENTS,['basic-result']);
});

test('does not charge twice for a report already owned or included in membership',()=>{
  assert.equal(quoteXpressPurchase({...base,ownsDetailedReportForSubmission:true}).action,'already-included');
  assert.equal(quoteXpressPurchase({...base,activeMembershipOfferId:'xpress-monthly'}).amountInCents,0);
});

test('credits a recent report toward either membership',()=>{
  const recentReportPaidAt=new Date('2026-09-02T12:00:00Z');
  const monthly=quoteXpressPurchase({...base,requestedOfferId:'xpress-monthly',recentReportPaidAt});
  const guided=quoteXpressPurchase({...base,requestedOfferId:'xpress-guided',recentReportPaidAt});
  assert.equal(monthly.amountInCents,3_700_000);
  assert.equal(guided.amountInCents,13_700_000);
  assert.equal(monthly.reason,'report-credit');
});

test('charges only the difference for an upgrade and schedules downgrades',()=>{
  const upgrade=quoteXpressPurchase({...base,requestedOfferId:'xpress-guided',activeMembershipOfferId:'xpress-monthly'});
  assert.equal(upgrade.amountInCents,10_000_000);
  assert.equal(upgrade.reason,'membership-upgrade');
  const downgrade=quoteXpressPurchase({...base,requestedOfferId:'xpress-monthly',activeMembershipOfferId:'xpress-guided'});
  assert.equal(downgrade.action,'schedule-downgrade');
});

test('a membership lasts exactly 30 days and guided includes one 50-minute session',()=>{
  assert.equal(xpressAccessEndsAt(new Date('2026-09-08T12:00:00Z')).toISOString(),'2026-10-08T12:00:00.000Z');
  assert.equal(xpressOfferIncludes('xpress-guided','tutor-session-50'),true);
  assert.equal(xpressOfferIncludes('xpress-monthly','tutor-session-50'),false);
});
