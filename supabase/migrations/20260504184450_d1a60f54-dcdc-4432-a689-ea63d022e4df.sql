ALTER TABLE public.site_content
  ADD COLUMN IF NOT EXISTS draft_value text,
  ADD COLUMN IF NOT EXISTS has_draft boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS draft_updated_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS published_at timestamp with time zone DEFAULT now();