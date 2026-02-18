
CREATE TABLE IF NOT EXISTS public.funnel_leads (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  business_name text NOT NULL,
  industry text NOT NULL,
  avg_job_value text NOT NULL,
  missed_calls_per_week text NOT NULL,
  calculated_annual_loss integer NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.funnel_leads ENABLE ROW LEVEL SECURITY;

-- Allow public inserts (no auth required — public lead form)
CREATE POLICY "Allow public inserts on funnel_leads"
  ON public.funnel_leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- No public read, update, or delete — service role only
