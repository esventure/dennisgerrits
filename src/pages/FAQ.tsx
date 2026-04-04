import FadeIn from "@/components/FadeIn";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What exactly do you offer?",
    a: "Private, one-on-one experiences. We walk through a city together, share stories, and discover the places that matter most to you. It's not a tour in the traditional sense. It's a shared day.",
  },
  {
    q: "How long is a typical day together?",
    a: "Most experiences last between four and six hours, but there's no strict schedule. We go at your pace. If you'd like a full day, that's possible too. We'll just discuss it beforehand.",
  },
  {
    q: "Is this suitable for someone who can't walk long distances?",
    a: "Absolutely. I adapt everything to your comfort level. We can use public transport, take frequent breaks, or focus on a smaller area with more depth. Accessibility is always part of the plan.",
  },
  {
    q: "Do you work with groups?",
    a: "I keep things intimate. Individuals, couples, or very small groups of close friends or family. Never more than four people. That's what keeps it personal.",
  },
  {
    q: "How does pricing work?",
    a: "My pricing is a flat day rate that covers my time, preparation, and local knowledge. No hidden fees, no upsells. I'll share exact pricing during our introductory conversation.",
  },
  {
    q: "Which cities do you cover?",
    a: "I'm based in the Netherlands and work primarily in Dutch cities. But I regularly collaborate with like-minded companions across Europe. Tell me your destination and I may know just the right person.",
  },
  {
    q: "How far in advance should I book?",
    a: "Two to three weeks is ideal, though I'm sometimes available on shorter notice. The earlier we connect, the better I can prepare something meaningful for you.",
  },
  {
    q: "What if we're not a good match?",
    a: "That's perfectly fine. It's exactly why I offer an introductory conversation first. No pressure to commit. If my approach isn't what you're looking for, I'll happily recommend alternatives.",
  },
];

const FAQ = () => (
  <main>
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mb-16">
          <FadeIn>
            <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
              Practicalities
            </p>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
              Questions & Answers
            </h1>
            <p className="font-body text-lg text-muted-foreground leading-relaxed">
              Honest answers to the things you might be wondering about.
            </p>
          </FadeIn>
        </div>

        <FadeIn>
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border-border px-0">
                  <AccordionTrigger className="font-body text-base text-foreground hover:no-underline py-5">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="font-body text-muted-foreground leading-relaxed pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeIn>
      </div>
    </section>
  </main>
);

export default FAQ;
