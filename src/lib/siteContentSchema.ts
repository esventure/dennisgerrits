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
      { key: "about.person.title", label: "Person – title", type: "short", fallback: "The Person" },
      { key: "about.person.kicker", label: "Person – kicker", type: "short", fallback: "A True Amsterdammer" },
      {
        key: "about.person.body",
        label: "Person – paragraph",
        type: "rich",
        fallback:
          "I have always been drawn to stories, people and places that move you in some way.\n\nAmsterdam became that place for me. I’ve called this city home for more than twenty years now, and over time it became an integral part of who I am.\n\nThis city gave me freedom. It connected me to the world and shaped me into the person I am today. Curious, creative and fascinated by culture, art, architecture, nature, and the rhythm of life.",
      },
      { key: "about.guide.title", label: "Guide – title", type: "short", fallback: "The Guide" },
      { key: "about.guide.kicker", label: "Guide – kicker", type: "short", fallback: "Helping you find your own way" },
      {
        key: "about.guide.body",
        label: "Guide – paragraph",
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
        fallback: "Every journey starts with a conversation. Every experience is shaped around you.",
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
        fallback: "More than a guide. Personal support, thoughtful guidance and local knowledge throughout your stay.",
      },
      { key: "process.step1.label", label: "Step 1 – label", type: "short", fallback: "Let’s Connect" },
      {
        key: "process.step1.text",
        label: "Step 1 – text",
        type: "long",
        fallback: "You reach out, and we plan a personal video call to get to know each other and your travel plans.",
      },
      { key: "process.step2.label", label: "Step 2 – label", type: "short", fallback: "Getting to Know You" },
      {
        key: "process.step2.text",
        label: "Step 2 – text",
        type: "long",
        fallback: "I take the time to listen. Your interests, travel style and wishes help shape the experience.",
      },
      { key: "process.step3.label", label: "Step 3 – label", type: "short", fallback: "Creating Your Journey" },
      {
        key: "process.step3.text",
        label: "Step 3 – text",
        type: "long",
        fallback: "Together, we shape an experience that feels personal and completely tailored to you.",
      },
      { key: "process.step4.label", label: "Step 4 – label", type: "short", fallback: "I Take Care of the Details" },
      {
        key: "process.step4.text",
        label: "Step 4 – text",
        type: "long",
        fallback: "From reservations and transportation to personal recommendations and museum tickets, everything is thoughtfully taken care of.",
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
          "Send me a message through the contact form or WhatsApp, and I’ll get back to you within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each&nbsp;other.",
      },
      { key: "booking.form.title", label: "Form title", type: "short", fallback: "Let’s Connect" },
      {
        key: "booking.form.intro",
        label: "Form intro",
        type: "rich",
        fallback: "Leave your contact details and tell me a little about yourself and the experience you're hoping for.",
      },
      { key: "booking.form.cta", label: "Submit button label", type: "short", fallback: "Reach out" },
    ],
  },
  {
    id: "also",
    title: "Also (Podcast & Speaking)",
    description: "The quiet 'Also' strip just before the contact section.",
    fields: [
      { key: "also.podcast.title", label: "Podcast – title", type: "short", fallback: "Two Stories, One City" },
      {
        key: "also.podcast.body",
        label: "Podcast – body",
        type: "long",
        fallback: "My podcast. Two Amsterdammers, one place, one conversation at a time.",
      },
      { key: "also.podcast.url", label: "Podcast – link URL", type: "short", fallback: "#" },
      { key: "also.speaking.title", label: "Speaking – title", type: "short", fallback: "Invite me to speak" },
      {
        key: "also.speaking.body",
        label: "Speaking – body",
        type: "long",
        fallback:
          "I talk to groups, schools and conferences about Amsterdam, storytelling, and the way we travel.",
      },
    ],
  },
  {
    id: "trust",
    title: "Trust Signals",
    description: "Tripadvisor rating and review count shown in the reviews section.",
    fields: [
      {
        key: "tripadvisor.rating",
        label: "Tripadvisor rating",
        type: "short",
        fallback: "5.0",
        hint: "Example: 5.0",
      },
      {
        key: "tripadvisor.review_count",
        label: "Tripadvisor review count",
        type: "short",
        fallback: "218",
        hint: "A whole number, e.g. 218",
      },
    ],
  },
];
