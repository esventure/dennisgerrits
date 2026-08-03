import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FadeIn from "@/components/FadeIn";

type Story = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  body: string;
  sort_order: number;
};

const NotebookStory = () => {
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const { data: story, isLoading } = useQuery({
    queryKey: ["notebook-story", slug],
    enabled: !!slug,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("id, slug, title, intro, body, sort_order")
        .eq("slug", slug!)
        .maybeSingle();
      if (error) throw error;
      return data as Story | null;
    },
  });

  const { data: all = [] } = useQuery({
    queryKey: ["notebook-stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("slug, title, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const idx = all.findIndex((s) => s.slug === slug);
  const prev = idx > 0 ? all[idx - 1] : null;
  const next = idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null;

  if (isLoading) {
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="font-body text-muted-foreground">Loading…</p>
      </main>
    );
  }

  if (!story) {
    return (
      <main className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="font-body text-muted-foreground">This chapter doesn't exist.</p>
        <Link to="/notebook" className="font-body text-sm underline text-secondary">
          ← Back to the notebook
        </Link>
      </main>
    );
  }

  const url = `https://dennisgerrits.com/notebook/${story.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: story.title,
    description: story.intro,
    author: { "@type": "Person", name: "Dennis Gerrits" },
    url,
    mainEntityOfPage: url,
  };

  return (
    <main className="relative">
      <Helmet>
        <title>{story.title} – Notebook | Dennis Gerrits</title>
        <meta name="description" content={story.intro.slice(0, 155)} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${story.title} – Notebook`} />
        <meta property="og:description" content={story.intro.slice(0, 155)} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="container mx-auto px-6 lg:px-12 py-16 md:py-24 max-w-3xl">
        <FadeIn>
          <Link
            to="/notebook"
            className="inline-flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-secondary transition-colors mb-8"
          >
            <span aria-hidden>←</span> Back to the notebook
          </Link>
          <p
            className="font-body text-xs tracking-[0.3em] uppercase mb-3"
            style={{ color: "hsl(var(--heritage-orange))" }}
          >
            Chapter {story.sort_order}
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl text-primary leading-[0.95] mb-8">
            {story.title}
          </h1>
          <p className="font-body text-xl leading-relaxed mb-6 text-foreground/90">
            {story.intro}
          </p>
          {story.body && (
            <div className="font-body text-lg leading-relaxed text-foreground/80 space-y-5">
              {story.body.split(/\n\n+/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          )}
        </FadeIn>

        <nav className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row gap-6 sm:gap-4 justify-between">
          {prev ? (
            <Link
              to={`/notebook/${prev.slug}`}
              className="group font-body text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <span className="block text-xs uppercase tracking-widest mb-1">← Previous</span>
              <span className="font-heading text-xl text-primary group-hover:text-secondary transition-colors">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              to={`/notebook/${next.slug}`}
              className="group font-body text-sm text-muted-foreground hover:text-secondary transition-colors text-right"
            >
              <span className="block text-xs uppercase tracking-widest mb-1">Next →</span>
              <span className="font-heading text-xl text-primary group-hover:text-secondary transition-colors">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
    </main>
  );
};

export default NotebookStory;
