-- Versioned, PII-minimized evidence for the post-exam ICFES lead gate.
-- Local migration only: do not apply remotely before privacy and Sandbox review.

CREATE TABLE IF NOT EXISTS public.icfes_lead_consents (
  attempt_id uuid PRIMARY KEY REFERENCES public.icfes_attempts(id) ON DELETE CASCADE,
  consent_version text NOT NULL,
  privacy_version text NOT NULL,
  notice_snapshot text NOT NULL,
  notice_sha256 text NOT NULL CHECK (notice_sha256 ~ '^[a-f0-9]{64}$'),
  contact_sha256 text NOT NULL CHECK (contact_sha256 ~ '^[a-f0-9]{64}$'),
  accepted_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT icfes_lead_consents_version_check CHECK (
    consent_version = 'icfes-lead-contact-2026-09-12-v1'
    AND privacy_version = 'icfes-privacy-2026-09-12-v2'
  )
);

ALTER TABLE public.icfes_lead_consents ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.icfes_lead_consents FROM anon, authenticated, service_role;
GRANT SELECT, INSERT, DELETE ON TABLE public.icfes_lead_consents TO service_role;

CREATE OR REPLACE FUNCTION public.reject_icfes_lead_consent_update()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  RAISE EXCEPTION 'icfes_lead_consent_is_immutable';
END;
$$;

DROP TRIGGER IF EXISTS icfes_lead_consents_no_update ON public.icfes_lead_consents;
CREATE TRIGGER icfes_lead_consents_no_update
BEFORE UPDATE ON public.icfes_lead_consents
FOR EACH ROW EXECUTE FUNCTION public.reject_icfes_lead_consent_update();

COMMENT ON TABLE public.icfes_lead_consents IS
  'Immutable versioned consent evidence. Contact data is represented only by a one-way digest.';

-- Forward rollback: disable ICFES persistence, preserve evidence, then ship a
-- reviewed corrective migration. Do not drop consent history as an emergency step.
