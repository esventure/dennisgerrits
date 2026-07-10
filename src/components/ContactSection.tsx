import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import RichText from "@/components/RichText";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import dennisContactAsset from "@/assets/dennis-contact.jpg.asset.json";
const dennisCanalSmile = dennisContactAsset.url;

const ContactSection = () => {
  const { toast } = useToast();
  const t = useSiteContent();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thank you. I'll be in touch soon." });
    setContactForm({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 lg:py-24 scroll-mt-20"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className="relative overflow-hidden rounded-3xl px-5 py-12 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-16 lg:py-20"
          style={{ backgroundColor: "hsl(var(--heritage-green))" }}
        >
          <p
            className="absolute top-5 right-5 md:top-8 md:right-10 text-2xl md:text-3xl rotate-[-4deg] hidden md:block z-10"
            style={{
              fontFamily: "'Caveat', cursive",
              color: "hsl(var(--heritage-orange))",
            }}
            aria-hidden
          >
            let's talk
          </p>

          <div className="relative mx-auto max-w-5xl" style={{ zIndex: 10 }}>
            <FadeIn>
              <div className="text-center mb-10 md:mb-12 lg:mb-14">
                <p
                  className="font-body text-xs md:text-sm tracking-[0.3em] uppercase mb-4"
                  style={{ color: "hsl(var(--heritage-orange))" }}
                >
                  – {t("booking.kicker", "Get in Touch")} –
                </p>
                <h2
                  className="font-heading text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] leading-[0.95] mx-auto max-w-none md:whitespace-nowrap"
                  style={{ color: "hsl(var(--background))" }}
                >
                  {t("booking.title", "Let's See if We're a Good Match")}
                </h2>
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 lg:gap-14 items-stretch">
              <FadeIn className="h-full">
                <div
                  className="lg:pt-2 h-full flex flex-col"
                  style={{ color: "hsl(var(--background) / 0.9)" }}
                >
                  <RichText
                    className="font-body text-base md:text-lg leading-relaxed"
                    html={t("booking.intro", "")}
                    fallback="Send me a message, and I’ll reply by email within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each other."
                  />
                  <div className="mt-6 md:mt-10 flex-1 min-h-[260px] md:min-h-0 relative max-w-md w-full">
                    <img
                      src={dennisCanalSmile}
                      alt="Dennis smiling by the canal"
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover rounded-sm shadow-xl"
                      style={{ filter: "saturate(0.92) contrast(0.98)", objectPosition: "center 80%" }}
                    />
                  </div>
                </div>
              </FadeIn>

              <FadeIn delay={0.15}>
                <div
                  className="bg-background p-6 sm:p-8 lg:p-10 border-l-4 shadow-2xl rounded-sm"
                  style={{ borderLeftColor: "hsl(var(--heritage-orange))" }}
                >
                  <h3 className="font-heading text-3xl text-primary mb-3">
                    {t("booking.form.title", "Let’s Connect")}
                  </h3>
                  <RichText
                    className="font-body text-muted-foreground leading-relaxed mb-8"
                    html={t("booking.form.intro", "")}
                    fallback="Leave your contact details and tell me a little about yourself and the experience you're hoping for."
                  />
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Your Name</Label>
                      <Input
                        required
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="h-12 text-base font-body"
                        placeholder="e.g. Jane Smith"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Email Address</Label>
                      <Input
                        required
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="h-12 text-base font-body"
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-body text-sm">Tell Me a Little About Your Trip</Label>
                      <Textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="min-h-[140px] text-base font-body"
                        placeholder="When are you visiting? What are you curious about?"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                    >
                      {t("booking.form.cta", "Reach out")}
                    </button>
                  </form>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
