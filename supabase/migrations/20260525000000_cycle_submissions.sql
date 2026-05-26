-- Table for Korean learning cycle audio submissions
CREATE TABLE IF NOT EXISTS cycle_submissions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  username    text NOT NULL,
  email       text,
  nivel       text NOT NULL CHECK (nivel IN ('A1','A2','B1')),
  texto_id    text NOT NULL,
  quiz_level  text NOT NULL CHECK (quiz_level IN ('principiante','intermedio','avanzado')),
  audio_url   text NOT NULL,
  audio_path  text NOT NULL,
  respuestas  jsonb,
  created_at  timestamptz DEFAULT now()
);

CREATE INDEX idx_cycle_submissions_created_at ON cycle_submissions (created_at DESC);
CREATE INDEX idx_cycle_submissions_nivel      ON cycle_submissions (nivel);

ALTER TABLE cycle_submissions ENABLE ROW LEVEL SECURITY;

-- Only admins (service role) can read; anyone can insert
CREATE POLICY "Service role reads all"    ON cycle_submissions FOR SELECT USING (false);
CREATE POLICY "Anyone can submit audio"   ON cycle_submissions FOR INSERT WITH CHECK (true);

-- Supabase Storage bucket for audio files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'cycle-audio',
  'cycle-audio',
  true,
  10485760,  -- 10 MB max per file
  ARRAY['audio/webm','audio/mp4','audio/ogg','audio/mpeg','audio/wav','audio/x-m4a']
)
ON CONFLICT (id) DO NOTHING;

-- Anyone can upload audio (no auth required)
CREATE POLICY "Public upload cycle audio"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'cycle-audio');

-- Public read (audio_url is public)
CREATE POLICY "Public read cycle audio"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'cycle-audio');
