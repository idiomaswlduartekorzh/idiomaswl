-- JSONB preserves the scale of numeric values (for example 6.5000000000).
-- Cast bands to double precision when building display data so every UI and
-- downstream report receives canonical labels such as "Band 6.5".
create or replace function public.recompute_ielts_submission_score(p_submission_id uuid)
returns jsonb
language plpgsql
security invoker
set search_path = ''
as $function$
declare
  submission public.exam_submissions%rowtype;
  task1_band numeric;
  task2_band numeric;
  calculated_writing numeric;
  calculated_overall numeric;
  calculated_skills jsonb := '[]'::jsonb;
  calculated_label text;
begin
  select *
    into submission
  from public.exam_submissions
  where id = p_submission_id
    and exam_slug = 'ielts'
    and submission_status = 'submitted'
  for update;

  if not found then
    raise exception 'IELTS submission not found';
  end if;

  if submission.reviewed_at is not null then
    return jsonb_build_object(
      'writingBand', submission.writing_band,
      'speakingBand', submission.speaking_band,
      'overallBand', submission.total_score,
      'final', true
    );
  end if;

  task1_band := coalesce(
    nullif(submission.writing_task1_delegated_assessment ->> 'overallBand', '')::numeric,
    nullif(submission.writing_task1_assessment ->> 'overallBand', '')::numeric
  );
  task2_band := coalesce(
    nullif(submission.writing_task2_delegated_assessment ->> 'overallBand', '')::numeric,
    nullif(submission.writing_task2_assessment ->> 'overallBand', '')::numeric
  );

  calculated_writing := case
    when task1_band is not null and task2_band is not null
      then round(((task1_band + task2_band * 2) / 3) * 2) / 2
    else null
  end;

  if submission.listening_band is not null then
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Listening', 'score', submission.listening_band::double precision, 'max', 9,
      'label', 'Band ' || submission.listening_band::double precision::text
    ));
  end if;
  if submission.reading_band is not null then
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Reading', 'score', submission.reading_band::double precision, 'max', 9,
      'label', 'Band ' || submission.reading_band::double precision::text
    ));
  end if;
  if calculated_writing is not null then
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Writing', 'score', calculated_writing::double precision, 'max', 9,
      'label', 'Band ' || calculated_writing::double precision::text
    ));
  end if;
  if submission.speaking_band is not null then
    calculated_skills := calculated_skills || jsonb_build_array(jsonb_build_object(
      'skill', 'Speaking', 'score', submission.speaking_band::double precision, 'max', 9,
      'label', 'Band ' || submission.speaking_band::double precision::text
    ));
  end if;

  calculated_overall := case
    when submission.listening_band is not null
      and submission.reading_band is not null
      and calculated_writing is not null
      and submission.speaking_band is not null
    then round(((submission.listening_band + submission.reading_band + calculated_writing + submission.speaking_band) / 4) * 2) / 2
    else null
  end;

  select string_agg(
    (skill ->> 'skill') || ' Band ' || (skill ->> 'score'),
    ' · '
  )
  into calculated_label
  from jsonb_array_elements(calculated_skills) as skill;

  update public.exam_submissions
  set writing_band = calculated_writing,
      skills = calculated_skills,
      total_score = calculated_overall,
      total_max = 9,
      total_label = calculated_label
  where id = p_submission_id;

  return jsonb_build_object(
    'writingBand', calculated_writing,
    'speakingBand', submission.speaking_band,
    'overallBand', calculated_overall,
    'final', false
  );
end
$function$;

revoke all on function public.recompute_ielts_submission_score(uuid) from public, anon, authenticated;
grant execute on function public.recompute_ielts_submission_score(uuid) to service_role;
