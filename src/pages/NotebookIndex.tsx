import { useEffect } from "react";
import { Head } from "vite-react-ssg";
import { useLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import FadeIn from "@/components/FadeIn";
import { breadcrumbJsonLd } from "@/lib/jsonld";

type Story = {
  id: string;
  slug: string;
  title: string;
  intro: string;
  body: string;
  sort_order: number;
};

const NotebookIndex = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const loaderData = useLoaderData() as { stories?: Story[] } | undefined;
  const initialStories = loaderData?.stories;

  const { data: stories = [], isLoading } = useQuery({
    initialData: initialStories,
    queryKey: ["notebook-stories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stories")
        .select("id, slug, title, intro, body, sort_order")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return (data ?? []) as Story[];
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dennis Gerrits, Notebook",
    description:
      "Short reflections from Amsterdam by Dennis Gerrits. Stories about the city, its people and everyday traditions.",
    url: "https://dennisgerrits.com/notebook",
    blogPost: stories.map((s) => ({
      "@type": "BlogPosting",
      headline: s.title,
      description: s.intro,
      url: `https://dennisgerrits.com/notebook/${s.slug}`,
    })),
  };

  return (
    <main className="relative">
      <Head>
        <title>Notebook | Stories from Amsterdam | Dennis Gerrits</title>
        <meta
          name="description"
          content="Short reflections from Amsterdam by Dennis Gerrits. Asparagus season, bike exams, Nijntje, Van Gogh in bricks, and more."
        />
        <link rel="canonical" href="https://dennisgerrits.com/notebook" />
        <meta property="og:title" content="Notebook | Dennis Gerrits" />
        <meta
          property="og:description"
          content="Short reflections from Amsterdam by Dennis Gerrits."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dennisgerrits.com/notebook" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbJsonLd([{ name: "Notebook", url: "https://dennisgerrits.com/notebook" }]))}
        </script>
        <meta name="twitter:title" content="Notebook | Dennis Gerrits" />
        <meta name="twitter:description" content="Short reflections from Amsterdam by Dennis Gerrits." />
      </Head>

      {/* Header band */}
      <section
        className="relative pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16 overflow-hidden"
        style={{ backgroundColor: "hsl(40 38% 96%)" }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            <FadeIn>
              <p
                className="font-body text-sm tracking-widest uppercase mb-6"
                style={{ color: "hsl(var(--heritage-bordeaux))" }}
              >
                Notes From the City
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-6">
                From my notebook
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                Short reflections about Amsterdam. The kind of things I'd tell you over a coffee.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Chapter list */}
      <section className="py-14 md:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading ? (
            <p className="font-body text-muted-foreground">Loading…</p>
          ) : (
            <ol className="max-w-3xl mx-auto space-y-14 md:space-y-16 list-none">
              {stories.map((story, i) => (
                <li key={story.id}>
                  <FadeIn delay={i * 0.04}>
                    <article>
                      <p
                        className="font-body text-xs tracking-[0.3em] uppercase mb-2"
                        style={{ color: "hsl(var(--heritage-orange))" }}
                      >
                        Chapter {story.sort_order}
                      </p>
                      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-primary leading-[1] mb-4">
                        {story.title}
                      </h2>
                      <p className="font-body text-xl leading-relaxed mb-5 text-foreground/90">
                        {story.intro}
                      </p>
                      {story.body && (
                        <div className="font-body text-lg leading-relaxed text-foreground/80 space-y-5">
                          {story.body.split(/\n\n+/).map((para, i) => (
                            <p key={i}>{para}</p>
                          ))}
                        </div>
                      )}
                    </article>
                  </FadeIn>
                  {i < stories.length - 1 && (
                    <div className="mt-14 md:mt-16 flex justify-center">
                      <svg
                        aria-hidden
                        width="120"
                        height="10"
                        viewBox="0 0 120 10"
                        fill="none"
                        style={{ color: "hsl(var(--heritage-taupe))" }}
                      >
                        <path
                          d="M 2 5 C 20 2, 40 8, 60 5 S 100 2, 118 6"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          )}
        </div>
      </section>
    </main>
  );
};

export default NotebookIndex;
