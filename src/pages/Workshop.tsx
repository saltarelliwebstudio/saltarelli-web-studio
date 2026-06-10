import React from "react";
import {
  Sparkles,
  Clock,
  Video,
  CalendarPlus,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/motion";
import {
  SESSION_NAME,
  LIVE_SESSION_MEET_URL,
  getNextSession,
  getCountdownParts,
  formatSessionDate,
  getAddToCalendarUrl,
} from "@/lib/liveSession";

const SUPABASE_URL = "https://veyhxazlqekiweynjxhf.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleWh4YXpscWVraXdleW5qeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDU2MDUsImV4cCI6MjA4NjE4MTYwNX0.h5EyoyPZzP2yBVtDir9Ko4A2I_C_v_7qYxkR2MFL9fc";

const CountdownPill = ({ value, unit }: { value: number; unit: string }) => (
  <div className="flex flex-col items-center">
    <span className="glass rounded-xl px-3 py-2 sm:px-4 sm:py-3 font-mono font-bold tabular-nums text-2xl sm:text-4xl text-primary glow-text min-w-[3rem] sm:min-w-[4.5rem] text-center">
      {String(value).padStart(2, "0")}
    </span>
    <span className="mt-1 text-[10px] sm:text-xs uppercase tracking-widest text-muted-foreground">
      {unit}
    </span>
  </div>
);

const Workshop = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Tick every second so the countdown moves.
  const [, setTick] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const now = new Date();
  const session = getNextSession(now);
  const cp = getCountdownParts(session.start.getTime() - now.getTime());

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
            workshop_name: SESSION_NAME,
            workshop_date: session.start.toISOString(),
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
      console.error("Live session signup failed:", err);
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
        title={`${SESSION_NAME} — Free Weekly Live Session`}
        description="Free live AI Q&A and tutorials every Thursday at 12 PM ET. Ask anything, watch real demos, and see how Adam builds the systems he runs his business on."
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <section className="relative flex-1 flex items-center justify-center px-4 md:px-6 pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto max-w-3xl relative z-10">
            <FadeIn>
              <div className="flex justify-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse-glow">
                  <Sparkles className="text-primary" size={32} />
                </div>
              </div>

              <span className="block text-center text-primary font-bold text-sm tracking-widest uppercase mb-4">
                {session.isLive ? "🔴 Live Right Now" : "Live Weekly · Free"}
              </span>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-center leading-tight mb-6">
                Live AI Q&amp;A +{" "}
                <span className="text-primary glow-text">Tutorials</span>
              </h1>

              <p className="text-center text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Every Thursday at noon, bring your AI questions, watch real
                tutorials, and see exactly how I've built the systems I run my
                business on. Ask anything. No pitch, no fluff.
              </p>

              {/* Countdown */}
              <div className="mb-10">
                {session.isLive ? (
                  <p className="text-center font-heading font-bold text-2xl text-primary glow-text">
                    We're live now — jump in below.
                  </p>
                ) : (
                  <>
                    <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-3">
                      Next session starts in
                    </p>
                    <div className="flex justify-center items-start gap-3 sm:gap-4">
                      {cp.days > 0 && <CountdownPill value={cp.days} unit="days" />}
                      <CountdownPill value={cp.hours} unit="hrs" />
                      <CountdownPill value={cp.minutes} unit="min" />
                      <CountdownPill value={cp.seconds} unit="sec" />
                    </div>
                  </>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-10 max-w-xl mx-auto">
                <div className="glass rounded-xl p-4 text-center">
                  <Clock className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Length
                  </p>
                  <p className="font-heading font-semibold text-sm">60 min live</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <CheckCircle2 className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    When
                  </p>
                  <p className="font-heading font-semibold text-sm">
                    {formatSessionDate(session.start)}
                  </p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <Video className="text-primary mx-auto mb-2" size={20} />
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                    Where
                  </p>
                  <p className="font-heading font-semibold text-sm">
                    IG Live + Google Meet
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
                      You're in.
                    </p>
                    <p className="text-sm text-muted-foreground mb-5">
                      Check your email for the Meet link. Here it is too, for{" "}
                      {formatSessionDate(session.start)}. Add it to your
                      calendar so you don't miss it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button asChild variant="hero" size="lg" className="h-11">
                        <a
                          href={LIVE_SESSION_MEET_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Video size={18} className="mr-2" />
                          Join the Google Meet
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="lg" className="h-11">
                        <a
                          href={getAddToCalendarUrl(session)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <CalendarPlus size={18} className="mr-2" />
                          Add to calendar
                        </a>
                      </Button>
                    </div>
                  </motion.div>
                ) : session.isLive ? (
                  <div className="text-center">
                    <p className="font-heading font-semibold text-lg mb-4">
                      The session is happening right now.
                    </p>
                    <Button asChild variant="hero" size="lg" className="h-11">
                      <a
                        href={LIVE_SESSION_MEET_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video size={18} className="mr-2" />
                        Join the Google Meet
                      </a>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <p className="text-sm font-medium mb-1 text-center flex items-center justify-center gap-2">
                      <MessageCircle size={16} className="text-primary" />
                      Save your spot. You'll get the Google Meet link instantly.
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor="signup-name" className="sr-only">
                          Your name
                        </label>
                        <input
                          id="signup-name"
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
                        <label htmlFor="signup-email" className="sr-only">
                          Email address
                        </label>
                        <input
                          id="signup-email"
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
                      {submitting ? "Saving..." : "Grab My Spot"}
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
