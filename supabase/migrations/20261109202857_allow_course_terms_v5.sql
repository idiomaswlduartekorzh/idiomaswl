-- Keep previously accepted v4 orders valid while allowing the revised
-- signer wording in v5. Preserve the rest of the pricing and fee function.
do $migration$
declare
  definition text;
begin
  select pg_get_functiondef(
    to_regprocedure('public.prepare_course_order_with_fee(uuid,text,text,uuid,text,text,jsonb,jsonb,bigint,integer,text)')
  ) into definition;

  if definition is null then
    raise exception 'prepare_course_order_with_fee_missing';
  end if;
  if position('p_terms not in (''course-20261031-v4'',''course-20261109-v5'')' in definition) > 0 then
    return;
  end if;
  if position('p_terms<>''course-20261031-v4''' in definition) = 0 then
    raise exception 'unexpected_course_terms_guard';
  end if;

  execute replace(
    definition,
    'p_terms<>''course-20261031-v4''',
    'p_terms not in (''course-20261031-v4'',''course-20261109-v5'')'
  );
end $migration$;
