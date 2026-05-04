
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Stories
CREATE TABLE public.stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  intro text NOT NULL DEFAULT '',
  body text NOT NULL DEFAULT '',
  image_path text,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stories are viewable by everyone"
  ON public.stories FOR SELECT
  USING (true);

CREATE POLICY "Admins can insert stories"
  ON public.stories FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update stories"
  ON public.stories FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete stories"
  ON public.stories FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER stories_touch_updated_at
  BEFORE UPDATE ON public.stories
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Seed existing stories
INSERT INTO public.stories (slug, title, intro, body, sort_order) VALUES
('bookshop',
 'The Bookshop That Refused to Close',
 'On a quiet street in the Jordaan, there''s a bookshop that''s been open since 1953. The owner still wraps every purchase in brown paper.',
 'I asked him once why he never retired. He looked at me like I''d said something absurd. ''Why would I stop doing the thing I love?'' He knows every book in the shop by memory. He''ll recommend one based on the look in your eyes, not what''s trending. It''s the kind of place that makes you believe the world still has room for things that are slow, personal, and real.',
 1),
('canal-houses',
 'Why the Canal Houses Lean Forward',
 'It''s not bad engineering. It''s actually on purpose. And the reason says a lot about how the Dutch think about commerce.',
 'In the 17th century, Amsterdam''s merchants stored their goods in the attics of their canal houses. To hoist heavy bales up without smashing the façade, the buildings were designed to lean slightly forward. The hooks you still see at the top? Those are original hoisting beams. It''s a small detail that tells a big story about a city built on trade, pragmatism, and a refusal to waste space.',
 2),
('bench',
 'A Bench With the Best View in Amsterdam',
 'It''s not where you''d expect. No famous landmarks in sight. Just water, sky, and the kind of quiet that makes you want to sit for a while.',
 'I won''t tell you exactly where it is, that would ruin it. But I will say this: it faces west, and on a clear evening the light turns the water gold. There''s usually nobody else there. No tourists, no noise. Just the sound of a boat passing now and then. It''s the kind of place that reminds you why you travel in the first place.',
 3),
('cafe',
 'The Café That Only Serves What''s Left',
 'Every evening, a small café in De Pijp serves whatever the local market couldn''t sell that day. No menu. Just trust.',
 'The chef arrives at the Albert Cuyp market around 5pm, just as the vendors are packing up. Whatever''s left, a box of peppers, some fish, half a wheel of cheese, becomes dinner. You sit down, you eat what''s served, and somehow it''s always exactly right. It''s food without pretension, made from what the city had to offer that day.',
 4);

-- Storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('story-images', 'story-images', true);

CREATE POLICY "Story images are publicly readable"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'story-images');

CREATE POLICY "Admins can upload story images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'story-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update story images"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'story-images' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete story images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'story-images' AND public.has_role(auth.uid(), 'admin'));
