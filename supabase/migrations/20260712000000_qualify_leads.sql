-- Leads from the "See If You Qualify" homepage form.
CREATE TABLE IF NOT EXISTS public.qualify_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  website text,
  message text
);

-- Only the qualify-submit edge function (service role) touches this table.
-- RLS on with no public policy => anon/authenticated cannot read or write directly.
ALTER TABLE public.qualify_leads ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_qualify_leads_created_at
  ON public.qualify_leads (created_at DESC);
