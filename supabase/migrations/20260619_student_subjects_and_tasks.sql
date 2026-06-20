-- ─────────────────────────────────────────────────────────────────────────────
-- 1. Columna subject en profiles
--    Registra qué materia/idioma está estudiando cada estudiante.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS subject TEXT;

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. Tabla student_tasks
--    David puede enviar tareas a cada estudiante desde el dashboard admin.
-- ─────────────────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_tasks (
  id           uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id   uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_by   uuid        REFERENCES profiles(id),
  title        text        NOT NULL,
  description  text,
  due_date     date,
  completed_at timestamptz,
  created_at   timestamptz DEFAULT now()
);

ALTER TABLE student_tasks ENABLE ROW LEVEL SECURITY;

-- Estudiantes pueden leer sus propias tareas
CREATE POLICY "student_read_own_tasks"
  ON student_tasks FOR SELECT
  USING (auth.uid() = student_id);

-- Estudiantes pueden marcar sus tareas como completadas
CREATE POLICY "student_complete_own_tasks"
  ON student_tasks FOR UPDATE
  USING (auth.uid() = student_id)
  WITH CHECK (auth.uid() = student_id);

-- Service role (admin) bypasses RLS — puede hacer todo
