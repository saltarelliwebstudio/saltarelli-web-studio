import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageSquare, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Starfield } from "@/components/Starfield";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { businessSchema } from "@/lib/schema";
import { supabase } from "@/integrations/supabase/client";

// The digital-consent page US carriers check during 10DLC campaign review
// (Quo Trust Center, step 5). All eight required elements are on this page,
// in this order: opt-in statement, purpose, business name, data rates,
// frequency, HELP, STOP, privacy link. Submissions land in the same
// qualify-submit pipeline as the homepage form so Adam sees them as leads.
const inputClass =
  "w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors";

const SmsOptIn = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", business: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || form.phone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please add your name and a phone number we can text.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setErrorMsg("Please tick the box to confirm you'd like text updates.");
      setStatus("error");
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("qualify-submit", {
        body: {
          name: form.name,
          email: form.email,
          phone: form.phone,
          website: form.business,
          message: "SMS OPT-IN: agreed to receive text updates from Saltarelli Web Studio (consent form at /sms).",
        },
      });
      const payload = data as { error?: string } | null;
      if (error || payload?.error) throw new Error(payload?.error || error?.message || "Something went wrong.");
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <SEO
        canonical="/sms"
        title="Text Message Updates | Saltarelli Web Studio"
        description="Opt in to booking confirmations, reminders and follow-ups by text from Saltarelli Web Studio. Message frequency varies. Reply STOP to opt out."
        schema={[businessSchema]}
      />
      <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
        <Starfield />
        <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />
        <Header />

        <main className="relative z-10 flex-1 px-4 md:px-6 pt-32 pb-20">
          <div className="container mx-auto max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </span>
              <h1 className="font-heading text-3xl md:text-4xl font-bold">Get updates by text</h1>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Saltarelli Web Studio sends booking confirmations, appointment reminders, and follow-ups
              about the service you asked about, by text. Fill this in and you're on the list.
            </p>

            {status === "success" ? (
              <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-4" />
                <h2 className="font-heading text-2xl font-bold mb-2">You're in.</h2>
                <p className="text-muted-foreground">
                  Thanks, {form.name.trim().split(" ")[0]}. You'll get a confirmation text from
                  Saltarelli Web Studio shortly. Reply STOP at any time to opt out.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="glass-strong rounded-2xl border border-primary/30 shadow-glow p-6 md:p-8 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="sr-only">Your name</span>
                    <input id="sms-name" type="text" placeholder="Your name *" value={form.name} onChange={update("name")} className={inputClass} autoComplete="name" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Mobile number</span>
                    <input id="sms-phone" type="tel" placeholder="Mobile number *" value={form.phone} onChange={update("phone")} className={inputClass} autoComplete="tel" />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="block">
                    <span className="sr-only">Email</span>
                    <input id="sms-email" type="email" placeholder="Email" value={form.email} onChange={update("email")} className={inputClass} autoComplete="email" />
                  </label>
                  <label className="block">
                    <span className="sr-only">Business name</span>
                    <input id="sms-business" type="text" placeholder="Business name" value={form.business} onChange={update("business")} className={inputClass} autoComplete="organization" />
                  </label>
                </div>

                <label htmlFor="sms-consent" className="flex items-start gap-3 rounded-xl bg-white/5 border border-white/15 p-4 cursor-pointer">
                  <input
                    id="sms-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[hsl(var(--primary))]"
                  />
                  <span className="text-sm leading-relaxed text-foreground">
                    <strong>I would like to receive updates by text.</strong> We'll be sending you booking
                    confirmations, appointment reminders, and follow-ups from{" "}
                    <strong>Saltarelli Web Studio</strong>. Message and data rates may apply. Message frequency
                    varies. At any time you can text <strong>HELP</strong> for help or <strong>STOP</strong> to
                    opt out.{" "}
                    <Link to="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link>
                  </span>
                </label>

                {status === "error" && <p className="text-sm text-red-400">{errorMsg}</p>}

                <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
                  {status === "submitting" ? "Signing you up…" : "Sign me up for text updates"}
                </Button>
              </form>
            )}

            <section className="mt-10 text-sm text-muted-foreground leading-relaxed space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground">Text message terms</h2>
              <p>
                By opting in you agree to receive text messages from Saltarelli Web Studio (Port Colborne,
                Ontario) at the mobile number you provided. Messages may include booking confirmations,
                appointment reminders, replies to your questions, and follow-ups about services you asked about.
              </p>
              <p>Message frequency varies. Message and data rates may apply. Consent is not a condition of purchase.</p>
              <p>
                Reply <strong>STOP</strong> to cancel at any time. Reply <strong>HELP</strong> for help, or contact us
                at saltarelliwebstudio@gmail.com or 289-302-9451. Carriers are not liable for delayed or undelivered
                messages.
              </p>
              <p>
                Your opt-in and consent information is never shared with or sold to third parties. See our{" "}
                <Link to="/privacy" className="text-primary underline underline-offset-4">Privacy Policy</Link>.
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default SmsOptIn;
