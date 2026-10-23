import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Gauge, ArrowLeft, ArrowRight, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { CALENDLY_URL } from "@/components/CalendlyEmbed";
import { withAttribution } from "@/lib/attribution";
import { trackFormLead } from "@/lib/analytics";
import { trackEvent } from "@/components/PageTracker";
import { businessSchema } from "@/lib/schema";
import { supabase } from "@/integrations/supabase/client";
import { QUESTIONS, MAX_SCORE, scoreAnswers, summarizeForLead, type Answers } from "@/lib/getFoundScore";

// Self-check quiz for local trades owners. Built for the Oct 16 NFIH workshop
// (the room takes it in the first five minutes via ?src=nfih) and as a standing
// lead magnet into the Free Online Audit. Contact details go through the same
// qualify-submit pipeline as the homepage form, so a finished quiz shows up as
// a lead with the score and every answer attached.
const inputClass =
  "w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors";

type Step = "intro" | "questions" | "contact" | "result";

const GetFoundScore = () => {
  const [params] = useSearchParams();
  const source = params.get("src");
  const [step, setStep] = useState<Step>("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [form, setForm] = useState({ name: "", business: "", email: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const result = scoreAnswers(answers);
  const question = QUESTIONS[index];

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const start = () => {
    trackEvent("score_start", { source });
    setStep("questions");
  };

  const choose = (optionIndex: number) => {
    setAnswers((a) => ({ ...a, [question.id]: optionIndex }));
    if (index < QUESTIONS.length - 1) setIndex(index + 1);
    else setStep("contact");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setErrorMsg("Please add your name and an email address.");
      return;
    }
    setSubmitting(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("qualify-submit", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: form.business,
          message: summarizeForLead(answers, result, source),
        },
      });
      const payload = data as { error?: string } | null;
      if (error || payload?.error) throw new Error(payload?.error || error?.message);
      trackFormLead("get_found_score");
    } catch (err) {
      // The score is theirs either way. A failed lead write should never hide it.
      console.error("Get Found Score submit failed:", err);
    }
    trackEvent("score_complete", { source, score: result.total });
    setSubmitting(false);
    setStep("result");
  };

  return (
    <>
      <SEO
        canonical="/score"
        title="Get Found Score: How Easy Is Your Business to Find and Hire?"
        description="Ten quick questions for local trades and service businesses. Get a score out of 100 and the three gaps costing you the most calls."
        schema={[businessSchema]}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <main className="relative z-10 flex-1 px-4 md:px-6 pt-32 pb-20">
          <div className="container mx-auto max-w-2xl">
            {step === "intro" && (
              <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10">
                <span className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                  <Gauge className="w-6 h-6 text-primary" />
                </span>
                <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">What's your Get Found Score?</h1>
                <p className="text-muted-foreground leading-relaxed mb-3">
                  Ten quick questions about how customers find you, reach you, and pick you. You get a
                  score out of 100 and the three gaps costing you the most calls.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">Takes about two minutes. Tap an answer to move on.</p>
                <Button size="lg" className="w-full sm:w-auto" onClick={start}>
                  Start the check <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}

            {step === "questions" && (
              <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span>{question.area}</span>
                  <span>
                    {index + 1} of {QUESTIONS.length}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-white/10 mb-8 overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${(index / QUESTIONS.length) * 100}%` }}
                  />
                </div>
                <h2 className="font-heading text-2xl font-bold mb-6">{question.question}</h2>
                <div className="space-y-3">
                  {question.options.map((option, i) => (
                    <button
                      key={option.label}
                      type="button"
                      onClick={() => choose(i)}
                      className={`w-full text-left rounded-xl border px-4 py-4 transition-colors ${
                        answers[question.id] === i
                          ? "border-primary bg-primary/15"
                          : "border-white/15 bg-white/5 hover:border-primary/60"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => setIndex(index - 1)}
                    className="mt-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back
                  </button>
                )}
              </div>
            )}

            {step === "contact" && (
              <form
                onSubmit={handleSubmit}
                className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10 space-y-4"
              >
                <h2 className="font-heading text-2xl font-bold">Your score is ready</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Where should it go? Adam at Saltarelli Web Studio may reach out about your results. No
                  spam, no mailing list.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input type="text" placeholder="Your name *" value={form.name} onChange={update("name")} className={inputClass} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Business name</span>
                    <input type="text" placeholder="Business name" value={form.business} onChange={update("business")} className={inputClass} autoComplete="organization" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input type="email" placeholder="Email *" value={form.email} onChange={update("email")} className={inputClass} autoComplete="email" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Phone</span>
                    <input type="tel" placeholder="Phone" value={form.phone} onChange={update("phone")} className={inputClass} autoComplete="tel" />
                  </label>
                </div>
                {errorMsg && <p className="text-sm text-red-400">{errorMsg}</p>}
                <Button type="submit" size="lg" className="w-full" disabled={submitting}>
                  {submitting ? "Scoring…" : "Show my score"}
                </Button>
                <button
                  type="button"
                  onClick={() => {
                    setIndex(QUESTIONS.length - 1);
                    setStep("questions");
                  }}
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back
                </button>
              </form>
            )}

            {step === "result" && (
              <div className="space-y-6">
                <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10 text-center">
                  <p className="text-sm uppercase tracking-wider text-muted-foreground mb-2">Your Get Found Score</p>
                  <p className="font-heading text-6xl md:text-7xl font-bold text-primary mb-2">
                    {result.total}
                    <span className="text-2xl text-muted-foreground">/{MAX_SCORE}</span>
                  </p>
                  <h1 className="font-heading text-2xl font-bold mb-3">{result.band.label}</h1>
                  <p className="text-muted-foreground leading-relaxed">{result.band.summary}</p>
                  <div className="grid grid-cols-3 gap-3 mt-8">
                    {Object.entries(result.byArea).map(([area, { points, max }]) => (
                      <div key={area} className="rounded-xl bg-white/5 border border-white/15 p-3">
                        <p className="text-xs text-muted-foreground mb-1">{area}</p>
                        <p className="font-heading text-lg font-bold">
                          {points}/{max}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {result.weakest.length > 0 && (
                  <div className="glass-strong rounded-2xl border border-white/15 p-6 md:p-10">
                    <h2 className="font-heading text-xl font-bold mb-5">Your three biggest gaps</h2>
                    <ol className="space-y-5">
                      {result.weakest.map((q, i) => (
                        <li key={q.id} className="flex gap-4">
                          <span className="w-8 h-8 shrink-0 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-bold text-primary">
                            {i + 1}
                          </span>
                          <div>
                            <p className="font-semibold mb-1">{q.topic}</p>
                            <p className="text-muted-foreground leading-relaxed">{q.fix}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-10 text-center">
                  <h2 className="font-heading text-xl font-bold mb-3">Want these fixed?</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Book a free 30-minute strategy call. We'll look at your Google profile, reviews and
                    website together and show you exactly what to fix first.
                  </p>
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <a
                      href={withAttribution(CALENDLY_URL)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackEvent("calendly_click", { from: "score_result", score: result.total })}
                    >
                      <CalendarCheck className="w-4 h-4 mr-2" /> Book my free strategy call
                    </a>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GetFoundScore;
