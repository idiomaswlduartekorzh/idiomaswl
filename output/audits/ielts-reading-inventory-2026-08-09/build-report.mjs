#!/usr/bin/env node

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const inventory = JSON.parse(readFileSync(resolve(HERE, 'inventory.json'), 'utf8'));
const auditPath = resolve(HERE, 'audit-verdicts.json');
const auditVerdicts = existsSync(auditPath)
  ? JSON.parse(readFileSync(auditPath, 'utf8'))
  : {
      schemaVersion: 'ielts-reading-inventory-audit-verdicts.v1',
      status: 'pending',
      rows: [],
    };

const generatedAt = inventory.generatedAt;
const summary = inventory.summary;
const inventorySource = {
  id: 'inventory_manifest',
  label: 'IELTS Reading canonical content inventory v1',
  path: 'output/audits/ielts-reading-inventory-2026-08-09/inventory.json',
};
const extractorSource = {
  id: 'inventory_extractor',
  label: 'Deterministic IELTS Reading inventory extractor',
  path: 'output/audits/ielts-reading-inventory-2026-08-09/extract-inventory.mjs',
};
const officialCopyrightSource = {
  id: 'ielts_copyright_policy',
  label: 'IELTS copyright and trade mark statement',
  url: inventory.policy.officialSources.copyright,
};
const officialFormatSource = {
  id: 'ielts_academic_reading_format',
  label: 'IELTS Academic Reading test format',
  url: inventory.policy.officialSources.format,
};
const officialSamplesSource = {
  id: 'ielts_official_samples',
  label: 'IELTS Academic official sample questions',
  url: inventory.policy.officialSources.samples,
};
const externalMatchSourceA = {
  id: 'external_cambridge_sequence_match',
  label: 'External page identifying the Cambridge 5 Test 2 passage sequence',
  url: inventory.externalSearchMethodology.reviewedUrls[0],
};
const externalMatchSourceB = {
  id: 'external_birth_scientific_english_match',
  label: 'External page identifying The Birth of Scientific English in Cambridge 5 Test 2',
  url: inventory.externalSearchMethodology.reviewedUrls[1],
};
const blindReviewSource = {
  id: 'blind_review_packet',
  label: 'Key-free independent-review packet',
  path: 'output/audits/ielts-reading-inventory-2026-08-09/blind-review.json',
};
const auditVerdictsSource = {
  id: 'audit_verdicts',
  label: 'Independent audit verdicts for F0.1',
  path: 'output/audits/ielts-reading-inventory-2026-08-09/audit-verdicts.json',
};
const sqlSource = ({ id, label, sql, tablesUsed }) => ({
  id,
  label,
  query: {
    engine: 'duckdb',
    language: 'sql',
    sql,
    description: label,
    executed_at: generatedAt,
    tables_used: tablesUsed,
  },
});
const inventoryPath = inventorySource.path;
const verdictsPath = auditVerdictsSource.path;
const summaryQuerySource = sqlSource({
  id: 'inventory_summary_query',
  label: 'Exact summary fields from the canonical inventory manifest',
  tablesUsed: [inventoryPath],
  sql: `SELECT
  summary.assets AS assets,
  summary.questionGroups AS questionGroups,
  summary.decisions AS decisions,
  summary.passagesWithExtractableText AS passageTexts,
  summary.uniquePassageHashes AS uniquePassages,
  summary.inventorySyntheticIds AS syntheticIds,
  summary.assetsWithRightsBasis::DOUBLE / summary.assets AS rightsCoverage,
  summary.quarantined AS quarantined,
  summary.runtimeQuarantineContradictions AS runtimeContradictions,
  summary.visibleOriginalClaimsUnverified AS originalClaimsUnverified
FROM read_json_auto('${inventoryPath}');`,
});
const familyQuerySource = sqlSource({
  id: 'inventory_family_query',
  label: 'Source-family rows from the canonical inventory manifest',
  tablesUsed: [inventoryPath],
  sql: `SELECT family.*
FROM read_json_auto('${inventoryPath}') AS inventory,
UNNEST(inventory.byFamily) AS rows(family);`,
});
const metadataQuerySource = sqlSource({
  id: 'inventory_metadata_query',
  label: 'Editorial metadata coverage derived from the canonical inventory summary',
  tablesUsed: [inventoryPath],
  sql: `WITH inventory AS (
  SELECT summary FROM read_json_auto('${inventoryPath}')
), coverage AS (
  SELECT 'Module declared on asset' AS field, summary.assetsWithModuleDeclared AS present, summary.assets AS assets FROM inventory
  UNION ALL SELECT 'rightsBasis', summary.assetsWithRightsBasis, summary.assets FROM inventory
  UNION ALL SELECT 'Author', summary.assetsWithAuthor, summary.assets FROM inventory
  UNION ALL SELECT 'Reviewer', summary.assetsWithReviewer, summary.assets FROM inventory
  UNION ALL SELECT 'Factual sources', summary.assetsWithFactualSources, summary.assets FROM inventory
)
SELECT field, present, assets - present AS missing, present::DOUBLE / assets AS coverage
FROM coverage;`,
});
const duplicateQuerySource = sqlSource({
  id: 'inventory_duplicate_query',
  label: 'Exact normalized-passage duplicate groups from the canonical inventory',
  tablesUsed: [inventoryPath],
  sql: `SELECT
  duplicate.passageSha256 AS passageSha256,
  ARRAY_LENGTH(duplicate.assetIds) AS occurrences,
  ARRAY_TO_STRING(duplicate.assetIds, ' · ') AS assetIds
FROM read_json_auto('${inventoryPath}') AS inventory,
UNNEST(inventory.exactPassageHashDuplicates) AS rows(duplicate);`,
});
const externalMatchQuerySource = sqlSource({
  id: 'inventory_external_match_query',
  label: 'Directed external-match review rows from the canonical inventory',
  tablesUsed: [inventoryPath],
  sql: `SELECT
  review.assetId AS assetId,
  review.observedTitle AS observedTitle,
  review.matchClass AS matchClass,
  review.matchedCollection AS matchedCollection,
  CASE WHEN review.authorizationEvidenceLocatedInReviewedSources
    THEN 'yes — in reviewed source' ELSE 'not located in reviewed source' END AS authorizationLocated,
  review.reviewScope AS reviewScope,
  review.supportingUrl AS supportingUrl,
  review.action AS action
FROM read_json_auto('${inventoryPath}') AS inventory,
UNNEST(inventory.externalMatchReviews) AS rows(review);`,
});
const assetQuerySource = sqlSource({
  id: 'inventory_asset_query',
  label: 'Safe asset lookup projection from the canonical inventory',
  tablesUsed: [inventoryPath],
  sql: `SELECT
  asset.assetId AS assetId,
  asset.family AS family,
  asset.formatLabel AS format,
  asset.title AS title,
  asset.sourcePath AS sourcePath,
  asset.sourceLocator AS sourceLocator,
  asset.stableIdStatus AS idStatus,
  COALESCE(asset.module, asset.inferredModule, 'unknown/ambiguous') AS module,
  asset.moduleStatus AS moduleStatus,
  asset.canonicalPassageId AS canonicalPassageId,
  asset.canonicalPassageOccurrenceCount AS passageOccurrences,
  asset.passageWordCount AS passageWords,
  asset.decisionCount AS decisions,
  asset.rightsAssessmentStatus AS rightsStatus,
  asset.recommendedDisposition AS disposition,
  asset.sourceObjectSha256 AS objectSha256,
  asset.passageSha256 AS passageSha256
FROM read_json_auto('${inventoryPath}') AS inventory,
UNNEST(inventory.assets) AS rows(asset);`,
});
const auditQuerySource = sqlSource({
  id: 'inventory_audit_query',
  label: 'Independent F0.1 audit verdict rows',
  tablesUsed: [verdictsPath],
  sql: `SELECT verdict.*
FROM read_json_auto('${verdictsPath}') AS audit,
UNNEST(audit.rows) AS rows(verdict);`,
});
const sources = [
  inventorySource,
  extractorSource,
  officialCopyrightSource,
  officialFormatSource,
  officialSamplesSource,
  externalMatchSourceA,
  externalMatchSourceB,
  blindReviewSource,
  auditVerdictsSource,
  summaryQuerySource,
  familyQuerySource,
  metadataQuerySource,
  duplicateQuerySource,
  externalMatchQuerySource,
  assetQuerySource,
  auditQuerySource,
];

const metadataCoverage = [
  ['Module declared on asset', summary.assetsWithModuleDeclared],
  ['rightsBasis', summary.assetsWithRightsBasis],
  ['Author', summary.assetsWithAuthor],
  ['Reviewer', summary.assetsWithReviewer],
  ['Factual sources', summary.assetsWithFactualSources],
].map(([field, present]) => ({
  field,
  present,
  missing: summary.assets - present,
  coverage: present / summary.assets,
}));

const duplicateRows = inventory.exactPassageHashDuplicates.map(group => ({
  passageSha256: group.passageSha256,
  occurrences: group.assetIds.length,
  assetIds: group.assetIds.join(' · '),
}));

const externalMatchRows = inventory.externalMatchReviews.map(review => ({
  assetId: review.assetId,
  observedTitle: review.observedTitle,
  matchClass: review.matchClass,
  matchedCollection: review.matchedCollection,
  authorizationLocated: review.authorizationEvidenceLocatedInReviewedSources
    ? 'yes — in reviewed source'
    : 'not located in reviewed source',
  reviewScope: review.reviewScope,
  supportingUrl: review.supportingUrl,
  action: review.action,
}));

const assetRows = inventory.assets.map(asset => ({
  assetId: asset.assetId,
  family: asset.family,
  format: asset.formatLabel,
  title: asset.title,
  sourcePath: asset.sourcePath,
  sourceLocator: asset.sourceLocator,
  idStatus: asset.stableIdStatus,
  module: asset.module ?? asset.inferredModule ?? 'unknown/ambiguous',
  moduleStatus: asset.moduleStatus,
  canonicalPassageId: asset.canonicalPassageId,
  passageOccurrences: asset.canonicalPassageOccurrenceCount,
  passageWords: asset.passageWordCount,
  decisions: asset.decisionCount,
  rightsStatus: asset.rightsAssessmentStatus,
  disposition: asset.recommendedDisposition,
  objectSha256: asset.sourceObjectSha256,
  passageSha256: asset.passageSha256,
}));

const summaryRows = [{
  assets: summary.assets,
  questionGroups: summary.questionGroups,
  decisions: summary.decisions,
  passageTexts: summary.passagesWithExtractableText,
  uniquePassages: summary.uniquePassageHashes,
  syntheticIds: summary.inventorySyntheticIds,
  rightsCoverage: summary.assetsWithRightsBasis / summary.assets,
  quarantined: summary.quarantined,
  runtimeContradictions: summary.runtimeQuarantineContradictions,
  originalClaimsUnverified: summary.visibleOriginalClaimsUnverified,
}];

const auditRows = auditVerdicts.rows.length
  ? auditVerdicts.rows
  : [{
      lane: 'Panel',
      verdict: 'PENDING',
      scope: 'F0.1 census only',
      blockingFindings: 'Independent review has not been attached yet.',
    }];

const artifact = {
  surface: 'report',
  manifest: {
    version: 1,
    surface: 'report',
    title: 'IELTS Academic Reading — canonical content census',
    description:
      'Technical audit of learner-facing Reading content identity, metadata coverage and provisional quarantine state.',
    generatedAt,
    cards: [
      {
        id: 'assets',
        description: 'Learner-facing assets at the declared inventory grain.',
        dataset: 'summary',
        sourceId: 'inventory_summary_query',
        metrics: [{ label: 'Inventoried assets', field: 'assets', format: 'number' }],
      },
      {
        id: 'decisions',
        description: 'Scored or instructional decisions represented by those assets.',
        dataset: 'summary',
        sourceId: 'inventory_summary_query',
        metrics: [{ label: 'Decision points', field: 'decisions', format: 'number' }],
      },
      {
        id: 'rights_coverage',
        description: 'Assets with a structured rightsBasis field.',
        dataset: 'summary',
        sourceId: 'inventory_summary_query',
        metrics: [{ label: 'Structured rights coverage', field: 'rightsCoverage', format: 'percent' }],
      },
      {
        id: 'quarantined',
        description: 'Assets conservatively classified unknown-quarantined.',
        dataset: 'summary',
        sourceId: 'inventory_summary_query',
        metrics: [{ label: 'Provisional quarantine', field: 'quarantined', format: 'number' }],
      },
      {
        id: 'synthetic_ids',
        description: 'Assets that need an inventory-generated ID because the source object has none.',
        dataset: 'summary',
        sourceId: 'inventory_summary_query',
        metrics: [{ label: 'Synthetic inventory IDs', field: 'syntheticIds', format: 'number' }],
      },
    ],
    charts: [
      {
        id: 'assets_by_family',
        title: 'Inventoried asset occurrences by source family',
        subtitle: 'Legacy mock sections account for 60 of 120 occurrences; the exact lookup remains the audit source.',
        type: 'bar',
        dataset: 'family_summary',
        sourceId: 'inventory_family_query',
        valueFormat: 'number',
        encodings: {
          x: { field: 'family', type: 'nominal', label: 'Source family' },
          y: { field: 'assets', type: 'quantitative', label: 'Asset occurrences' },
          tooltip: [
            { field: 'decisions', type: 'quantitative', label: 'Decision points', format: 'number' },
            { field: 'passagesWithText', type: 'quantitative', label: 'Text occurrences', format: 'number' },
          ],
        },
      },
    ],
    tables: [
      {
        id: 'family_summary',
        title: 'Coverage by source family',
        subtitle: 'Exact counts at the declared asset grain; quarantine is a status, not deletion.',
        dataset: 'family_summary',
        sourceId: 'inventory_family_query',
        defaultSort: { field: 'assets', direction: 'desc' },
        columns: [
          { field: 'family', label: 'Family', type: 'text' },
          { field: 'assets', label: 'Assets', format: 'number' },
          { field: 'decisions', label: 'Decisions', format: 'number' },
          { field: 'passagesWithText', label: 'Text available', format: 'number' },
          { field: 'declaredStableIds', label: 'Declared IDs', format: 'number' },
          { field: 'quarantined', label: 'Quarantined', format: 'number' },
          { field: 'runtimeContradictions', label: 'Runtime conflicts', format: 'number' },
        ],
      },
      {
        id: 'metadata_coverage',
        title: 'Editorial metadata coverage',
        subtitle: 'Presence is checked on each asset object; visible route copy is not treated as proof.',
        dataset: 'metadata_coverage',
        sourceId: 'inventory_metadata_query',
        defaultSort: { field: 'missing', direction: 'desc' },
        columns: [
          { field: 'field', label: 'Required field', type: 'text' },
          { field: 'present', label: 'Present', format: 'number' },
          { field: 'missing', label: 'Missing', format: 'number' },
          { field: 'coverage', label: 'Coverage', format: 'percent' },
        ],
      },
      {
        id: 'duplicates',
        title: 'Exact passage reuse',
        subtitle: 'Normalized passage hashes only; no passage text or answer material is exposed.',
        dataset: 'duplicates',
        sourceId: 'inventory_duplicate_query',
        defaultSort: { field: 'occurrences', direction: 'desc' },
        columns: [
          { field: 'passageSha256', label: 'Passage SHA-256', type: 'text' },
          { field: 'occurrences', label: 'Occurrences', format: 'number' },
          { field: 'assetIds', label: 'Assets', type: 'text' },
        ],
      },
      {
        id: 'external_matches',
        title: 'Priority external-match review',
        subtitle: 'High-confidence matching evidence does not itself establish ownership or infringement.',
        dataset: 'external_matches',
        sourceId: 'inventory_external_match_query',
        defaultSort: { field: 'assetId', direction: 'asc' },
        columns: [
          { field: 'assetId', label: 'Asset', type: 'text' },
          { field: 'observedTitle', label: 'Observed title', type: 'text' },
          { field: 'matchedCollection', label: 'Matched collection', type: 'text' },
          { field: 'authorizationLocated', label: 'Authorization located', type: 'text' },
          { field: 'reviewScope', label: 'Review scope', type: 'text' },
          { field: 'supportingUrl', label: 'Supporting page', type: 'text' },
          { field: 'action', label: 'Action', type: 'text' },
        ],
      },
      {
        id: 'asset_lookup',
        title: 'Canonical asset lookup',
        subtitle: '120 rows with source locator, identity status and provisional disposition.',
        dataset: 'assets',
        sourceId: 'inventory_asset_query',
        defaultSort: { field: 'assetId', direction: 'asc' },
        density: 'dense',
        layout: 'full',
        columns: [
          { field: 'assetId', label: 'Asset ID', type: 'text' },
          { field: 'family', label: 'Family', type: 'text' },
          { field: 'format', label: 'Format/bank', type: 'text' },
          { field: 'title', label: 'Title', type: 'text' },
          { field: 'sourcePath', label: 'Source file', type: 'text' },
          { field: 'sourceLocator', label: 'Locator', type: 'text' },
          { field: 'idStatus', label: 'ID status', type: 'text' },
          { field: 'module', label: 'Declared/inferred module', type: 'text' },
          { field: 'moduleStatus', label: 'Module status', type: 'text' },
          { field: 'canonicalPassageId', label: 'Canonical passage', type: 'text' },
          { field: 'passageOccurrences', label: 'Text occurrences', format: 'number' },
          { field: 'passageWords', label: 'Passage words', format: 'number' },
          { field: 'decisions', label: 'Decisions', format: 'number' },
          { field: 'rightsStatus', label: 'Rights status', type: 'text' },
          { field: 'disposition', label: 'Disposition', type: 'text' },
          { field: 'objectSha256', label: 'Object SHA-256', type: 'text' },
          { field: 'passageSha256', label: 'Passage SHA-256', type: 'text' },
        ],
      },
      {
        id: 'audit_verdicts',
        title: 'Independent audit lanes',
        subtitle: 'Verdicts apply only to the F0.1 census, not to content quality or the parent quarantine unit.',
        dataset: 'audit_verdicts',
        sourceId: 'inventory_audit_query',
        defaultSort: { field: 'lane', direction: 'asc' },
        columns: [
          { field: 'lane', label: 'Lane', type: 'text' },
          { field: 'verdict', label: 'Verdict', type: 'text' },
          { field: 'scope', label: 'Scope', type: 'text' },
          { field: 'blockingFindings', label: 'Blocking findings', type: 'text' },
          { field: 'evidence', label: 'Evidence', type: 'text' },
        ],
      },
    ],
    sources,
    blocks: [
      {
        id: 'title',
        type: 'markdown',
        body: '# IELTS Academic Reading — canonical content census',
      },
      {
        id: 'technical_summary',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## The census is complete; the content is not rights-cleared\n\n` +
          `The repository contains **${summary.assets} learner-facing Reading asset occurrences** at four explicit grains, representing **${summary.questionGroups} question groups** and **${summary.decisions} decision points**. The extractor found **0 structured rightsBasis fields**, so **${summary.quarantined}/${summary.assets} assets remain provisionally unknown-quarantined**. This closes identity and coverage for F0.1 only; it does not approve a passage, question, key or route for publication.`,
      },
      { id: 'headline_metrics', type: 'metric-strip', cardIds: ['assets', 'decisions', 'rights_coverage', 'quarantined', 'synthetic_ids'] },
      {
        id: 'coverage_result',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Four source families account for the current learner-facing universe\n\n` +
          `The declared grain avoids pretending that every object is a passage: it counts **42 formative route-bank objects**, **17 learning sets**, **60 mock Reading sections** and **1 embedded legacy-hub exercise**. The full table keeps the source locator and object hash needed to reproduce each row.`,
      },
      { id: 'assets_by_family_block', type: 'chart', chartId: 'assets_by_family', layout: 'full' },
      { id: 'family_summary_block', type: 'table', tableId: 'family_summary', layout: 'full' },
      {
        id: 'metadata_result',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Every asset fails the minimum structured provenance gate\n\n` +
          `Author, reviewer, factual sources, declared module and rights basis are absent on **all ${summary.assets} asset objects**. ${summary.visibleOriginalClaimsUnverified} assets are presented on route surfaces with an originality claim, but that copy is not a reviewable provenance record. The safe disposition remains quarantine until a later child unit adjudicates and records evidence.`,
      },
      { id: 'metadata_coverage_block', type: 'table', tableId: 'metadata_coverage', layout: 'full' },
      {
        id: 'copyright_rule',
        type: 'markdown',
        sourceId: 'ielts_copyright_policy',
        body:
          `## Official sample availability is not a publication licence\n\n` +
          `IELTS permits personal and non-commercial use of its website material and requires written permission for commercial use or republication. The inventory therefore records official links as format controls, never as a rights basis for copying passages or tasks into WeLearn.`,
      },
      {
        id: 'identity_result',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Identity checks found one exact reuse and four sets without extractable passage text\n\n` +
          `There are **${summary.passagesWithExtractableText} text-bearing assets but ${summary.uniquePassageHashes} unique normalized passage hashes**. One passage is reused between a TFNG set and skimming, so later review must not count it as independent transfer evidence. Four learning sets expose task or passage-map structures without a full extractable passage.`,
      },
      { id: 'duplicates_block', type: 'table', tableId: 'duplicates', layout: 'full' },
      {
        id: 'priority_rights_result',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Three sections of mock set 1 need priority rights-holder review\n\n` +
          `The titles, openings and three-passage sequence match Cambridge IELTS 5 Academic Reading Test 2 with high confidence. No authorization evidence was located **in the two pages reviewed**. This directed spot-check covered only those three sections, so it says nothing about the remaining 117 assets and is not a rights-clearance search or legal conclusion.`,
      },
      { id: 'external_matches_block', type: 'table', tableId: 'external_matches', layout: 'full' },
      {
        id: 'lookup_result',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Each asset now has a reproducible locator and identity fingerprint\n\n` +
          `The lookup exposes no question, option, answer, feedback or passage text. It stores stable or synthetic IDs, object and passage hashes, source paths, field-presence facts and provisional disposition so future adjudication can update records without losing identity.`,
      },
      { id: 'asset_lookup_block', type: 'table', tableId: 'asset_lookup', layout: 'full' },
      {
        id: 'scope_definitions',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Scope and definitions\n\n` +
          `**Asset grain.** One formative passage/practice-set object, one learning-set object, one mock Reading section, or the single embedded legacy exercise.\n\n` +
          `**Decision point.** A formative or learning decision, a scored mock point under the current schema, or one legacy TFNG statement.\n\n` +
          `**Quarantine.** A conservative editorial status. It is not deletion and does not prove infringement.\n\n` +
          `**Module status.** “Inferred” means Academic is visible in a route or parent title but absent from the asset object itself. The legacy hub is deliberately “missing-or-ambiguous” because its parent metadata mixes Academic and General Training while its description and JSON-LD say Academic.`,
      },
      {
        id: 'methodology',
        type: 'markdown',
        sourceId: 'inventory_extractor',
        body:
          `## Methodology is deterministic and row-complete\n\n` +
          `The extractor evaluates the current TypeScript data objects without rendering the app, enumerates all 14 formative exports, eight learning exports, 20 IELTS mock files and the legacy hub, then asserts 120 unique asset IDs, 310 question groups and 1,152 decisions. It proves every mock registry key maps to its matching import, source file and mock ID. Stable JSON serialization produces object hashes; normalized text produces canonical-passage hashes. Recursive scans reject answer/option/key fields and common PII fields in both inventory rows and the blind packet. Two consecutive executions must emit identical artifact hashes. No sampling is used for the census.`,
      },
      {
        id: 'limitations',
        type: 'markdown',
        sourceId: 'inventory_manifest',
        body:
          `## Limitations keep this result from becoming a false approval\n\n` +
          `This census does **not** inspect whether a key is correct, whether evidence supports a unique answer, whether a factual claim is accurate, or whether an “original” claim is true. It does not enforce quarantine in runtime routes. Exact-title matching was only performed for the three-set sequence that surfaced during review; the other 117 assets have not received exhaustive external similarity search. Charts were intentionally omitted because row-level lookup and field coverage are the audit questions; aggregation plots would hide the exact source identity needed for adjudication.`,
      },
      {
        id: 'audit_result',
        type: 'markdown',
        body:
          `## Panel verdicts apply only to the census control\n\n` +
          `A PASS means the F0.1 inventory is complete, reproducible and safe to hand to later reviewers. It does not certify rights, IELTS fidelity, pedagogy, bias resistance, UI or a published route.`,
      },
      { id: 'audit_verdicts_block', type: 'table', tableId: 'audit_verdicts', layout: 'full' },
      {
        id: 'next_steps',
        type: 'markdown',
        body:
          `## Next steps\n\n` +
          `1. Adjudicate provenance, rights basis and factual sources per asset; prioritize mock set 1.\n` +
          `2. Replace synthetic mock-section IDs with versioned content IDs in the future data contract.\n` +
          `3. Enforce quarantine separately across formative routes, skill routes, mocks and the legacy hub.\n` +
          `4. Re-run this exact census after each enforcement slice and require stable identity or an explained version change.`,
      },
      {
        id: 'further_questions',
        type: 'markdown',
        body:
          `## Questions that require owner or reviewer evidence\n\n` +
          `- Where are the authoring records or source drafts behind the ${summary.visibleOriginalClaimsUnverified} visible originality claims?\n` +
          `- Does WeLearn hold any written licence covering the three Cambridge-matched sections?\n` +
          `- Which factual sources and verification dates support each science, history or current-affairs passage?\n` +
          `- Should repeated passage text be intentionally shared across Learn paths, or replaced for true transfer measurement?`,
      },
    ],
  },
  snapshot: {
    version: 1,
    generatedAt,
    status: 'ready',
    datasets: {
      summary: summaryRows,
      family_summary: inventory.byFamily,
      metadata_coverage: metadataCoverage,
      duplicates: duplicateRows,
      external_matches: externalMatchRows,
      assets: assetRows,
      audit_verdicts: auditRows,
    },
  },
  sources,
};

writeFileSync(resolve(HERE, 'artifact.json'), `${JSON.stringify(artifact, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({
  title: artifact.manifest.title,
  blocks: artifact.manifest.blocks.length,
  cards: artifact.manifest.cards.length,
  tables: artifact.manifest.tables.length,
  assetRows: artifact.snapshot.datasets.assets.length,
  auditStatus: auditVerdicts.status,
}, null, 2)}\n`);
