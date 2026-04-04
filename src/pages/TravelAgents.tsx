import { useState } from "react";
import FadeIn from "@/components/FadeIn";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const TravelAgents = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Inquiry sent", description: "Thank you — I'll respond within 24 hours." });
    setForm({ name: "", company: "", email: "", message: "" });
  };

  return (
    <main>
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mb-16">
            <FadeIn>
              <p className="font-body text-sm tracking-widest uppercase text-secondary mb-6">
                For Professionals
              </p>
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-[0.95] mb-8">
                Travel Agents & Concierges
              </h1>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                I work closely with travel designers, concierges, and boutique agencies who value
                authentic, personalized experiences for their clients. If that sounds like you,
                I'd love to explore how we can collaborate.
              </p>
            </FadeIn>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div className="space-y-12">
              {[
                {
                  title: "What I Offer Partners",
                  text: "A reliable, premium experience that reflects well on your brand. I handle every detail — from personalized itinerary research to day-of execution — so your clients feel genuinely cared for.",
                },
                {
                  title: "How It Works",
                  text: "Share your client's interests and travel dates. I'll create a tailored proposal within 48 hours. You remain the primary point of contact for your client; I integrate seamlessly into their trip.",
                },
                {
                  title: "Pricing & Terms",
                  text: "Transparent flat-rate pricing with no hidden costs. Commission structures available for ongoing partnerships. I'm happy to discuss terms that work for both of us.",
                },
              ].map((item, i) => (
                <FadeIn key={item.title} delay={i * 0.1}>
                  <div>
                    <div className="w-12 h-0.5 bg-accent mb-6" />
                    <h2 className="font-heading text-2xl text-primary mb-3">{item.title}</h2>
                    <p className="font-body text-muted-foreground leading-relaxed">{item.text}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.15}>
              <div className="border border-border rounded-sm p-10">
                <h2 className="font-heading text-3xl text-primary mb-6">Get in Touch</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Your Name</Label>
                    <Input
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 text-base font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">Company / Agency</Label>
                    <Input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="h-12 text-base font-body"
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-body text-sm">How Can We Collaborate?</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="min-h-[120px] text-base font-body"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full font-body text-sm tracking-widest uppercase px-8 py-4 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
                  >
                    Send Inquiry
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

export default TravelAgents;
