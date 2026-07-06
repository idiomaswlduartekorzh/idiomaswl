-- SPRINT 2: Vocabulary — track progress by stable word_key, not a DB FK
-- Created: 2026-07-06 (apply AFTER 20260706_icfes_v2_foundation.sql)
--
-- Vocabulary words are static content (src/data/icfes-vocabulary.ts), like the
-- diagnostic questions. So the per-student SRS row references the word by its
-- stable string id ("voc-001") instead of a UUID FK into a catalog table.
-- This removes the seeding step and the FK-insert failure mode.
--
-- Safe to re-run.

-- 1) Switch icfes_vocabulary_progress from vocab_id (UUID FK) to word_key (TEXT).
--    No rows exist yet, so dropping/adding columns is non-destructive.
ALTER TABLE icfes_vocabulary_progress
  DROP CONSTRAINT IF EXISTS icfes_vocabulary_progress_vocab_id_fkey;

ALTER TABLE icfes_vocabulary_progress
  DROP CONSTRAINT IF EXISTS icfes_vocabulary_progress_user_id_vocab_id_key;

ALTER TABLE icfes_vocabulary_progress
  DROP COLUMN IF EXISTS vocab_id;

ALTER TABLE icfes_vocabulary_progress
  ADD COLUMN IF NOT EXISTS word_key TEXT;

-- Backfill guard: only enforce NOT NULL once the column exists and is empty.
UPDATE icfes_vocabulary_progress SET word_key = 'unknown' WHERE word_key IS NULL;
ALTER TABLE icfes_vocabulary_progress ALTER COLUMN word_key SET NOT NULL;

ALTER TABLE icfes_vocabulary_progress
  DROP CONSTRAINT IF EXISTS icfes_vocabulary_progress_user_word_key;
ALTER TABLE icfes_vocabulary_progress
  ADD CONSTRAINT icfes_vocabulary_progress_user_word_key UNIQUE (user_id, word_key);

-- 2) Add the Leitner box the SRS scheduler needs to persist.
ALTER TABLE icfes_vocabulary_progress
  ADD COLUMN IF NOT EXISTS box INTEGER NOT NULL DEFAULT 0 CHECK (box BETWEEN 0 AND 5);

-- 3) Drop the now-unused catalog table (words live in version control).
DROP TABLE IF EXISTS icfes_vocabulary_catalog CASCADE;

-- Index to fetch a student's due cards quickly (already created in foundation
-- migration on user_id/status/next_review; add word_key lookup helper).
CREATE INDEX IF NOT EXISTS idx_icfes_vocab_progress_word_key
  ON icfes_vocabulary_progress(word_key);
