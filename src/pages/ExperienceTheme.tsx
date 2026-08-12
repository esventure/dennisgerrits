import { Head } from "vite-react-ssg";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import FadeIn from "@/components/FadeIn";
import ContactSection from "@/components/ContactSection";
import NotFound from "./NotFound";
import { experiences } from "@/data/experiences";

const ExperienceTheme = () => {
  const { slug } = useParams();
  const index = experiences.findIndex((t) => t.slug === slug);
  const theme = index >= 0 ? experiences[index] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!theme) return <NotFound />;

  const prev = experiences[(index - 1 + experiences.length) % experiences.length];
  const next = experiences[(index + 1) % experiences.length];
  const url = `https://dennisgerrits.com/get-inspired/${theme.slug}`;
  const description = theme.caption;

  return (
    <main>
      <Head>
        <title>{`${theme.title} in Amsterdam | Dennis Gerrits`}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${theme.title} in Amsterdam`} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={`${theme.title} in Amsterdam`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": url,
                url,
                name: `${theme.title} in Amsterdam`,
                description,
                isPartOf: { "@id": "https://dennisgerrits.com/get-inspired" },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: "https://dennisgerrits.com/" },
                  { "@type": "ListItem", position: 2, name: "Experiences", item: "https://dennisgerrits.com/get-inspired" },
                  { "@type": "ListItem", position: 3, name: theme.title, item: url },
                ],
              },
            ],
          })}
        </script>
      </Head>

      <section
        className="relative pt-28 md:pt-32 pb-12 md:pb-16"
        style={{ backgroundColor: "hsl(var(--heritage-green))" }}
      >
        <div className="container mx-auto px-6 md:px-10 max-w-4xl">
          <Link
            to="/get-inspired"
            className="text-sm uppercase tracking-[0.2em] text-background/80 hover:text-background transition-colors"
          >
            &larr; All experiences
          </Link>
          <h1 className="font-heading text-4xl md:text-6xl text-background mt-4 leading-none tracking-wide">
            {theme.title}
          </h1>
          <p
            className="text-xl md:text-2xl mt-3"
            style={{ fontFamily: "'Caveat', cursive", color: "hsl(var(--heritage-orange))" }}
          >
            {theme.note}
          </p>
        </div>
      </section>

      <article className="py-14 md:py-20">
        <div className="container mx-auto px-6 md:px-10 max-w-3xl">
          <FadeIn>
            <img
              src={theme.image}
              alt={`${theme.title} in Amsterdam`}
              width={1200}
              height={800}
              loading="eager"
              decoding="async"
              className="w-full aspect-[3/2] object-cover"
            />
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              className="text-2xl md:text-3xl leading-snug mt-8"
              style={{ fontFamily: "'Caveat', cursive", color: "hsl(var(--heritage-bordeaux))" }}
            >
              {theme.caption}
            </p>
          </FadeIn>
          {theme.body.map((paragraph, i) => (
            <FadeIn key={i} delay={0.15 + i * 0.05}>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/85 mt-6">
                {paragraph}
              </p>
            </FadeIn>
          ))}

          <nav className="mt-14 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row gap-4 sm:justify-between">
            <Link to={`/get-inspired/${prev.slug}`} className="text-primary hover:underline underline-offset-4">
              &larr; {prev.title}
            </Link>
            <Link to={`/get-inspired/${next.slug}`} className="text-primary hover:underline underline-offset-4">
              {next.title} &rarr;
            </Link>
          </nav>
        </div>
      </article>

      <ContactSection />
    </main>
  );
};

export default ExperienceTheme;
