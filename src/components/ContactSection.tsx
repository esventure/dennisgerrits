import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import RichText from "@/components/RichText";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSiteContent } from "@/hooks/useSiteContent";
import { supabase } from "@/integrations/supabase/client";
import { lovableAssetUrl } from "@/lib/utils";
import dennisContactAsset from "@/assets/dennis-contact.jpg.asset.json";
const dennisCanalSmile = lovableAssetUrl(dennisContactAsset.url);

const ContactSection = () => {
  const { toast } = useToast();
  const t = useSiteContent();
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: contactForm.name,
      email: contactForm.email,
      message: contactForm.message,
      source: "homepage",
    });

    if (error) {
      setSending(false);
      toast({
        title: "Something went wrong",
        description: "Your message could not be sent. Please try again or reach me on WhatsApp.",
        variant: "destructive",
      });
      return;
    }

    // Best-effort: notify Dennis and confirm with the visitor. The message is
    // already saved, so email send failures here do not affect the user.
    const submissionId = crypto.randomUUID();
    const sends = [
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-notification",
          idempotencyKey: `contact-notify-${submissionId}`,
          templateData: {
            name: contactForm.name,
            email: contactForm.email,
            message: contactForm.message,
          },
        },
      }),
      supabase.functions.invoke("send-transactional-email", {
        body: {
          templateName: "contact-confirmation",
          recipientEmail: contactForm.email,
          idempotencyKey: `contact-confirm-${submissionId}`,
          templateData: { name: contactForm.name },
        },
      }),
    ];
    Promise.allSettled(sends).then((results) => {
      results.forEach((r, i) => {
        if (r.status === "rejected") {
          console.error("Email send failed", i, r.reason);
        }
      });
    });

    setSending(false);
    toast({ title: "Message sent", description: "Thank you. I'll be in touch soon." });
    setContactForm({ name: "", email: "", message: "" });
  };


  return (
    <section
      id="contact"
      className="relative py-16 md:py-20 lg:py-28 scroll-mt-24"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div
          className="relative overflow-hidden rounded-3xl px-5 py-9 sm:px-8 sm:py-10 md:px-12 md:py-12 lg:px-16 lg:py-14"
          style={{ backgroundColor: "hsl(var(--heritage-green))" }}
        >



          <div className="relative mx-auto max-w-5xl" style={{ zIndex: 10 }}>
            <FadeIn>
              <div className="text-center mb-6 md:mb-8">
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

            <FadeIn>
              <div
                className="max-w-4xl mx-auto text-center mb-8 md:mb-10"
                style={{ color: "hsl(var(--background) / 0.9)" }}
              >
                <RichText
                  className="font-body text-base md:text-lg leading-relaxed [text-wrap:pretty]"
                  html={t("booking.intro", "")}
                  fallback="Send me a message through the contact form or WhatsApp, and I’ll get back to you within 24 hours. If it feels right, we can take the next step with a video call. No pressure, no obligations, just a chance to get to know each&nbsp;other."
                />
              </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 md:gap-10 lg:gap-14 items-stretch">
              <FadeIn className="h-full">
                <div className="relative h-full min-h-[280px] lg:min-h-0 rounded-sm shadow-xl overflow-hidden">
                  <img
                    src={dennisCanalSmile}
                    alt="Dennis smiling on a canal bridge"
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ filter: "saturate(0.92) contrast(0.98)", objectPosition: "center" }}
                  />
                </div>
              </FadeIn>

              <FadeIn delay={0.15} className="h-full">
                <div
                  className="bg-background p-6 sm:p-8 lg:p-10 border-l-4 shadow-2xl rounded-sm h-full"
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
                      disabled={sending}
                      className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300 disabled:opacity-60"
                    >
                      {sending ? "Sending..." : t("booking.form.cta", "Reach out")}
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
