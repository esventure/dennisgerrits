import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent", description: "Thank you — I'll be in touch soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                Get in Touch
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                Let's See if We're a Good Match
              </h1>
               <p className="font-body text-lg text-muted-foreground leading-relaxed">
                The best way to start is a short, informal conversation. No obligations, no sales pitch.
                Just a chance to talk about your trip and see if my approach feels right for you.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Video Call Option */}
            <FadeIn>
              <div className="border border-border rounded-sm p-10">
                <div className="w-12 h-0.5 bg-accent mb-8" />
                <h2 className="font-heading text-3xl text-primary mb-4">
                  Schedule a Video Call
                </h2>
                 <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  A 15-minute introductory call where we get to know each other. I'll ask about your
                  interests, you can ask me anything. It's the closest thing to meeting in person
                  before your trip.
                </p>
                {/* Calendly placeholder */}
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center border border-border">
                  <div className="text-center">
                    <p className="font-body text-sm text-muted-foreground">Calendly embed</p>
                    <p className="font-body text-xs text-muted-foreground/60 mt-1">Integration placeholder</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Callback Form */}
            <FadeIn delay={0.15}>
              <div className="border border-border rounded-sm p-10">
                <div className="w-12 h-0.5 bg-secondary mb-8" />
                <h2 className="font-heading text-3xl text-primary mb-4">
                  Request a Callback
                </h2>
                <p className="font-body text-muted-foreground leading-relaxed mb-8">
                  Prefer that I reach out to you? Leave your details and a few words about your trip,
                  and I'll get back to you within 48 hours.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Your Name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 text-base font-body"
                      placeholder="e.g. Jane Smith"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Email Address</Label>
                    <Input
                      required
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-12 text-base font-body"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Tell Me a Little About Your Trip</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="min-h-[140px] text-base font-body"
                      placeholder="When are you visiting? What are you curious about?"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
