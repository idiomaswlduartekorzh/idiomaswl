-- ============================================================
-- WHATSAPP CHATBOT — Estado conversacional e idempotencia
-- Solo el webhook del servidor accede con service_role.
-- ============================================================

create table public.whatsapp_conversations (
  wa_id             text        primary key,
  profile_name      text,
  stage             text        not null default 'awaiting_language',
  status            text        not null default 'active',
  language          text,
  goal              text,
  level             text,
  last_message_at   timestamptz not null default now(),
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now(),

  constraint whatsapp_conversations_wa_id_format
    check (wa_id ~ '^[0-9]{7,32}$'),
  constraint whatsapp_conversations_profile_name_length
    check (profile_name is null or char_length(profile_name) <= 160),
  constraint whatsapp_conversations_stage_values
    check (stage in (
      'awaiting_language',
      'awaiting_goal',
      'awaiting_level',
      'qualified',
      'handoff_requested'
    )),
  constraint whatsapp_conversations_status_values
    check (status in ('active', 'qualified', 'handoff_requested')),
  constraint whatsapp_conversations_field_lengths
    check (
      (language is null or char_length(language) <= 80)
      and (goal is null or char_length(goal) <= 120)
      and (level is null or char_length(level) <= 80)
    )
);

create table public.whatsapp_messages (
  id            text        primary key,
  wa_id         text        not null references public.whatsapp_conversations(wa_id) on delete cascade,
  direction     text        not null,
  message_type  text        not null,
  body          text,
  created_at    timestamptz not null default now(),

  constraint whatsapp_messages_id_length
    check (char_length(id) between 1 and 512),
  constraint whatsapp_messages_direction_values
    check (direction in ('inbound', 'outbound')),
  constraint whatsapp_messages_type_length
    check (char_length(message_type) between 1 and 64),
  constraint whatsapp_messages_body_length
    check (body is null or char_length(body) <= 4096)
);

create index whatsapp_conversations_status_idx
  on public.whatsapp_conversations (status, last_message_at desc);

create index whatsapp_messages_conversation_idx
  on public.whatsapp_messages (wa_id, created_at desc);

alter table public.whatsapp_conversations enable row level security;
alter table public.whatsapp_messages enable row level security;

-- No se crean politicas para anon ni authenticated. El webhook usa la clave
-- service_role, que evita RLS, y los secretos nunca llegan al cliente.
revoke all on public.whatsapp_conversations from anon, authenticated;
revoke all on public.whatsapp_messages from anon, authenticated;
grant select, insert, update, delete on public.whatsapp_conversations to service_role;
grant select, insert, update, delete on public.whatsapp_messages to service_role;

comment on table public.whatsapp_conversations is
  'Estado y calificacion de contactos atendidos por el chatbot oficial de WhatsApp.';
comment on table public.whatsapp_messages is
  'Registro de mensajes del chatbot; el id de Meta hace idempotentes los webhooks.';
