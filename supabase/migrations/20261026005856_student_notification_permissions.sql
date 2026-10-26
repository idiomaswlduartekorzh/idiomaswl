-- Supabase's default privileges grant broad table access to API roles.
-- Keep the dispatch marker server-owned; students may edit only their choices.
revoke all on table public.student_notification_preferences from public, anon, authenticated;
grant select, insert on table public.student_notification_preferences to authenticated;
grant update (study_reminders_enabled, study_reminder_frequency, study_reminder_weekday,
  correction_emails_enabled, updated_at)
  on table public.student_notification_preferences to authenticated;
