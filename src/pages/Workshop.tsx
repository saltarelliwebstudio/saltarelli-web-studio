import React from "react";
import { GraduationCap, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/motion";

const SUPABASE_URL = "https://veyhxazlqekiweynjxhf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleWh4YXpscWVraXdleW5qeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDU2MDUsImV4cCI6MjA4NjE4MTYwNX0.h5EyoyPZzP2yBVtDir9Ko4A2I_C_v_7qYxkR2MFL9fc";

const Workshop = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/submit-workshop-signup`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            workshop_name: "AI Systems for Business Owners",
            workshop_date: "2026-05-07",
            source: "saltarelliwebstudio.ca",
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `request_failed_${res.status}`);
      }
      setSubmitted(true);
    } catch (err) {
      console.error("Workshop signup failed:", err);
      setError(
        "Something went wrong saving your spot. Email saltarelliwebstudio@gmail.com and I'll add you manually."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        canonical="/workshop"
        title="Free Workshop: AI Systems for Business Owners"
        description="Free live workshop for business owners on using AI admin systems to save 10+ hours a week. Date coming soon."
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <section className="relative flex-1 flex items-center justify-center px-4 md:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto max-w-3xl relative z-10">
            <FadeIn>
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <GraduationCap className="text-primary" size={32} />
                </div>
              </div>

              <span className="block text-center text-primary font-bold text-sm tracking-widest uppercase mb-4">
                Free Live Workshop
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-center leading-tight mb-6">
                AI Systems for{" "}
                <span className="text-primary glow-text">Business Owners</span>
              </h1>

              <p className="text-center text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                A live walkthrough of the exact AI admin systems that save
                businesses 10+ hours a week. Real demos, real numbers, no fluff.
              </p>

              <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto">
                <div className="glass rounded-xl p-4 text-center">
                  <Clock className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Length
                  </p>
                  <p className="font-heading font-semibold text-sm">
                    45 min + Q&amp;A
                  </p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <CheckCircle2 className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Cost
                  </p>
                  <p className="font-heading font-semibold text-sm">
                    Free
                  </p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <GraduationCap className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Date
                  </p>
                  <p className="font-heading font-semibold text-sm">
                    Thu, May 7 · 12 PM EDT
                  </p>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 md:p-8 max-w-xl mx-auto">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <CheckCircle2
                      className="text-primary mx-auto mb-3"
                      size={32}
                    />
                    <p className="font-heading font-semibold text-lg mb-1">
                      You're on the list.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I'll email you as soon as the date is locked in.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm font-medium mb-1 text-center">
                      Grab your spot. I'll email you the Zoom link and a short
                      prep note.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="workshop-name" className="sr-only">
                          Your name
                        </label>
                        <input
                          id="workshop-name"
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          autoComplete="name"
                          className="w-full h-11 px-4 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                      <div>
                        <label htmlFor="workshop-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="workshop-email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@business.com"
                          autoComplete="email"
                          className="w-full h-11 px-4 rounded-md bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full h-11"
                      disabled={submitting}
                    >
                      {submitting ? "Saving..." : "Save My Spot"}
                    </Button>
                    {error && (
                      <p className="text-sm text-destructive mt-2 text-center">
                        {error}
                      </p>
                    )}
                  </form>
                )}
              </div>
            </FadeIn>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Workshop;
