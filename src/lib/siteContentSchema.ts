// Defines which content keys exist, grouped by section.
// Adding a new editable field = add an entry here + reference the key in the page.

export type ContentField = {
  key: string;
  label: string;
  type: "short" | "long" | "rich";
  fallback: string;
  hint?: string;
};

export type ContentSection = {
  id: string;
  title: string;
  description: string;
  fields: ContentField[];
};

export const CONTENT_SCHEMA: ContentSection[] = [
  {
    id: "about",
    title: "About",
    description: "The split section: 'The Person' and 'The Guide'.",
    fields: [
      { key: "about.person.title", label: "Person — title", type: "short", fallback: "The Person" },
      { key: "about.person.kicker", label: "Person — kicker", type: "short", fallback: "A True Amsterdammer" },
      {
        key: "about.person.body",
        label: "Person — paragraph",
        type: "long",
        fallback:
          "I'm a free spirit with deep roots here. I grew up cycling these canals and collecting stories along the way. Amsterdam isn't just where I live, it's how I think.",
      },
      { key: "about.guide.title", label: "Guide — title", type: "short", fallback: "The Guide" },
      { key: "about.guide.kicker", label: "Guide — kicker", type: "short", fallback: "A Different Kind of Guide" },
      {
        key: "about.guide.body",
        label: "Guide — paragraph",
        type: "long",
        fallback:
          "No flag, no script. Depth over highlights, connection over information. A friend who knows the city inside out, walking beside you instead of in front of you.",
      },
    ],
  },
  {
    id: "process",
    title: "How It Works",
    description: "The 4-step process intro and the concierge sub-heading.",
    fields: [
      { key: "process.kicker", label: "Kicker", type: "short", fallback: "How It Works" },
      {
        key: "process.title",
        label: "Section title",
        type: "long",
        fallback: "No standard tours. Every trip is built from scratch.",
      },
      {
        key: "process.intro",
        label: "Intro line",
        type: "long",
        fallback: "From the first message to the last goodbye, one person looks after every detail.",
      },
      { key: "concierge.kicker", label: "Concierge kicker", type: "short", fallback: "What I take care of" },
      {
        key: "concierge.title",
        label: "Concierge title",
        type: "long",
        fallback: "More than a guide. A concierge for your whole stay.",
      },
    ],
  },
  {
    id: "booking",
    title: "Booking / Contact",
    description: "The 'Let's See if We're a Good Match' section and the form intro.",
    fields: [
      { key: "booking.kicker", label: "Kicker", type: "short", fallback: "Get in Touch" },
      {
        key: "booking.title",
        label: "Section title",
        type: "long",
        fallback: "Let's See if We're a Good Match",
      },
      {
        key: "booking.intro",
        label: "Intro paragraph",
        type: "long",
        fallback:
          "The best way to start is a short, informal conversation. No obligations, just a chance to see if my approach feels right.",
      },
      { key: "booking.form.title", label: "Form title", type: "short", fallback: "Book a Call" },
      {
        key: "booking.form.intro",
        label: "Form intro",
        type: "long",
        fallback: "Leave your details and a few words about your trip. I'll reach out personally.",
      },
      { key: "booking.form.cta", label: "Submit button label", type: "short", fallback: "Send Message" },
    ],
  },
];
