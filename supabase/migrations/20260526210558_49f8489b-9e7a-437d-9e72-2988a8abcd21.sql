UPDATE public.site_content
SET value = replace(value, '\n', '')
WHERE value LIKE '%\n%';