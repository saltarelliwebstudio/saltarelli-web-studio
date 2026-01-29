-- Create chat_logs table for storing all chatbot conversations
CREATE TABLE public.chat_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  source_url TEXT,
  user_message TEXT NOT NULL,
  assistant_message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

-- Allow edge function to insert logs (using service role)
-- No public read access needed - you'll view via Cloud dashboard
CREATE POLICY "Allow service role full access"
  ON public.chat_logs
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create index for efficient querying by source and time
CREATE INDEX idx_chat_logs_source_url ON public.chat_logs(source_url);
CREATE INDEX idx_chat_logs_created_at ON public.chat_logs(created_at DESC);
CREATE INDEX idx_chat_logs_session_id ON public.chat_logs(session_id);