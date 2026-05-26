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
        type: "rich",
        fallback:
          "I have always been drawn to stories, people and places that move you in some way.\n\nAmsterdam became that place for me. I’ve called this city home for more than twenty years now, and over time it became an integral part of who I am.\n\nThis city gave me freedom. It connected me to the world and shaped me into the person I am today. Curious, creative and fascinated by culture, art, architecture, nature, and the rhythm of life.",
      },
      { key: "about.guide.title", label: "Guide — title", type: "short", fallback: "The Guide" },
      { key: "about.guide.kicker", label: "Guide — kicker", type: "short", fallback: "Helping you find your own way\n\n" },
      {
        key: "about.guide.body",
        label: "Guide — paragraph",
        type: "rich",
        fallback:
          "For me, discovering places should feel personal, relaxed and natural. More like spending time with a local friend.\n\nI always listen first. Every person experiences a place differently, which is why I take the time to understand who you are and what inspires you.\n\nI carefully shape each day around you, creating experiences that feel meaningful. More than anything, I’m simply somebody who walks beside you during your trip.",
      },
    ],
  },
  {
    id: "process",
    title: "How I Work",
    description: "The 4-step process intro and the concierge sub-heading.",
    fields: [
      { key: "process.kicker", label: "Kicker", type: "short", fallback: "How I Work" },
      {
        key: "process.title",
        label: "Section title",
        type: "long",
        fallback: "Every journey starts with a conversation.\nEvery experience is shaped around you.\n",
      },
      {
        key: "process.intro",
        label: "Intro paragraph",
        type: "rich",
        fallback: "From the first message to the last goodbye, you’ll always have someone local by your side.",
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
        type: "rich",
        fallback:
          "The best way to start is a short, informal conversation. No obligations, just a chance to see if my approach feels right.",
      },
      { key: "booking.form.title", label: "Form title", type: "short", fallback: "Book a Call" },
      {
        key: "booking.form.intro",
        label: "Form intro",
        type: "rich",
        fallback: "Leave your details and a few words about your trip. I'll reach out personally.",
      },
      { key: "booking.form.cta", label: "Submit button label", type: "short", fallback: "Send Message" },
    ],
  },
  {
    id: "also",
    title: "Also (Podcast & Speaking)",
    description: "The quiet 'Also' strip just before the contact section.",
    fields: [
      { key: "also.podcast.title", label: "Podcast — title", type: "short", fallback: "Two Stories, One City" },
      {
        key: "also.podcast.body",
        label: "Podcast — body",
        type: "long",
        fallback: "My podcast. Two Amsterdammers, one place, one conversation at a time.",
      },
      { key: "also.podcast.url", label: "Podcast — link URL", type: "short", fallback: "#" },
      { key: "also.speaking.title", label: "Speaking — title", type: "short", fallback: "Invite me to speak" },
      {
        key: "also.speaking.body",
        label: "Speaking — body",
        type: "long",
        fallback:
          "I talk to groups, schools and conferences about Amsterdam, storytelling, and the way we travel.",
      },
    ],
  },
];
