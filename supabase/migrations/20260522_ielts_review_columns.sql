-- Add IELTS admin-review columns to exam_submissions
-- Run this in the Supabase SQL editor

ALTER TABLE exam_submissions
  ADD COLUMN IF NOT EXISTS writing_task1_answer TEXT,
  ADD COLUMN IF NOT EXISTS writing_task2_answer TEXT,
  ADD COLUMN IF NOT EXISTS speaking_answers JSONB,
  ADD COLUMN IF NOT EXISTS reading_band NUMERIC,
  ADD COLUMN IF NOT EXISTS listening_band NUMERIC,
  ADD COLUMN IF NOT EXISTS writing_band NUMERIC,
  ADD COLUMN IF NOT EXISTS speaking_band NUMERIC,
  ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS reviewed_by TEXT;
