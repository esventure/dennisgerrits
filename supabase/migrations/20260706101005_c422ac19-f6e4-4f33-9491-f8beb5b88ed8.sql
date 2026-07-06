-- Restrict public/anon access to draft columns on site_content
REVOKE SELECT (draft_value, draft_updated_at, has_draft) ON public.site_content FROM anon;
REVOKE SELECT (draft_value, draft_updated_at, has_draft) ON public.site_content FROM PUBLIC;

-- Restrict has_role SECURITY DEFINER function execution to authenticated only
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated;