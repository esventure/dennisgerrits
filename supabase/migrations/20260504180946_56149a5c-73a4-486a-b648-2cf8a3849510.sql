
-- Fix touch_updated_at search_path
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Restrict EXECUTE on has_role so it's only callable by the server / authenticated session via RLS, not by anon at large.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO service_role;

-- Replace bucket SELECT policy: only admins can LIST objects; public can still read by direct URL.
DROP POLICY IF EXISTS "Story images are publicly readable" ON storage.objects;
CREATE POLICY "Admins can list story images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'story-images' AND public.has_role(auth.uid(), 'admin'));
