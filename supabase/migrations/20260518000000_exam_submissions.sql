CREATE TABLE IF NOT EXISTS exam_submissions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  user_name text,
  exam_slug text NOT NULL,
  exam_name text NOT NULL,
  mock_title text,
  total_score numeric,
  total_max numeric,
  total_label text,
  skills jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE exam_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read all" ON exam_submissions FOR SELECT USING (true);
CREATE POLICY "Users insert own" ON exam_submissions FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
