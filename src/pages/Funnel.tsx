import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, ShieldCheck, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Starfield } from "@/components/Starfield";
import logo from "@/assets/sws-logo.png";

// ─── Revenue calculation helpers ───────────────────────────────────────────

const missedCallsMidpoints: Record<string, number> = {
  "1-3": 2,
  "4-7": 5.5,
  "8-12": 10,
  "12+": 15,
};

const jobValueMap: Record<string, number> = {
  "$500": 500,
  "$1,000": 1000,
  "$2,500": 2500,
  "$5,000": 5000,
  "$10,000+": 10000,
};

const closeRateMap: Record<string, number> = {
  "10%": 0.10,
  "20%": 0.20,
  "30%": 0.30,
  "50%": 0.50,
  "70%+": 0.70,
};

function calcAnnualLoss(missedCalls: string, jobValue: string, closeRate: string): number {
  return Math.round(
    (missedCallsMidpoints[missedCalls] ?? 0) *
    (closeRateMap[closeRate] ?? 0.3) *
    (jobValueMap[jobValue] ?? 0) *
    50
  );
}

// ─── Count-up hook ─────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1600) {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;
    startRef.current = null;

    const step = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

// ─── Zod schemas ────────────────────────────────────────────────────────────

const statsSchema = z.object({
  industry: z.enum(["Roofing", "Concrete", "Landscaping", "HVAC", "Plumbing", "General Contractor", "Other"], {
    required_error: "Please select your industry",
  }),
  avg_job_value: z.enum(["$500", "$1,000", "$2,500", "$5,000", "$10,000+"], {
    required_error: "Please select an average job value",
  }),
  missed_calls_per_week: z.enum(["1-3", "4-7", "8-12", "12+"], {
    required_error: "Please select missed calls per week",
  }),
  close_rate: z.enum(["10%", "20%", "30%", "50%", "70%+"], {
    required_error: "Please select your close rate",
  }),
});

const contactSchema = z.object({
  name: z.string().trim().min(1, "Full name is required").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  business_name: z.string().trim().min(1, "Business name is required").max(150),
});

const funnelSchema = statsSchema.merge(contactSchema);
type FunnelFormData = z.infer<typeof funnelSchema>;
type StatsData = z.infer<typeof statsSchema>;
type ContactData = z.infer<typeof contactSchema>;

// ─── Page slide variants ───────────────────────────────────────────────────

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

const transition = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const };

// ─── Component ────────────────────────────────────────────────────────────

export default function Funnel() {
  // step 0 = hook, 1 = stats, 2 = contact, 3 = results
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedStats, setSavedStats] = useState<StatsData | null>(null);
  const [formData, setFormData] = useState<FunnelFormData | null>(null);
  const [showGuideMessage, setShowGuideMessage] = useState(false);

  const annualLoss = formData
    ? calcAnnualLoss(formData.missed_calls_per_week, formData.avg_job_value, formData.close_rate)
    : 0;

  const countUpValue = useCountUp(step === 3 ? annualLoss : 0);

  const statsForm = useForm<StatsData>({ resolver: zodResolver(statsSchema) });
  const contactForm = useForm<ContactData>({ resolver: zodResolver(contactSchema) });

  const goTo = (nextStep: number) => {
    setDirection(nextStep > step ? 1 : -1);
    setStep(nextStep);
  };

  const onStatsSubmit = (data: StatsData) => {
    setSavedStats(data);
    goTo(2);
  };

  const onContactSubmit = async (data: ContactData) => {
    if (!savedStats) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const fullData: FunnelFormData = { ...savedStats, ...data };
    const loss = calcAnnualLoss(fullData.missed_calls_per_week, fullData.avg_job_value, fullData.close_rate);

    try {
      const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
      const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(
        `${SUPABASE_URL}/functions/v1/funnel-submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ ...fullData, calculated_annual_loss: loss }),
        }
      );

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.error ?? "Submission failed");
      }

      setFormData(fullData);
      goTo(3);
    } catch (err: unknown) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Field component helper ──────────────────────────────────────────────

  const Field = ({
    label,
    id,
    error,
    children,
  }: {
    label: string;
    id: string;
    error?: string;
    children: React.ReactNode;
  }) => (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-foreground/90 font-medium">
        {label}
      </Label>
      {children}
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );

  // ─── Step 1 — Hook ────────────────────────────────────────────────────────

  const Step1 = (
    <div className="flex flex-col items-center justify-center text-center px-6 py-12 max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/30">
          <div className="absolute inset-0 blur-xl bg-primary/20 rounded-2xl" />
          <PhoneCall size={28} className="text-primary relative z-10" />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7 }}
        className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-primary font-semibold mb-6"
      >
        <PhoneCall size={14} />
        Free Revenue Calculator for Contractors
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7 }}
        className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold leading-tight mb-6"
      >
        How Much Revenue Is Your Business{" "}
        <span className="text-primary glow-text">Losing From Missed Calls?</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.6 }}
        className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-lg"
      >
        Most contractors lose thousands every month from calls that go unanswered.{" "}
        <strong className="text-foreground">Find out your number in 30 seconds.</strong>
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Button
          variant="hero"
          size="lg"
          className="text-base sm:text-lg px-8 py-6 h-auto font-semibold shadow-glow animate-pulse-glow"
          onClick={() => goTo(1)}
        >
          Calculate My Revenue Loss
          <ArrowRight size={20} />
        </Button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="text-xs text-muted-foreground mt-5"
      >
        No credit card required · Takes 30 seconds
      </motion.p>
    </div>
  );

  // ─── Step 2 — Stats ───────────────────────────────────────────────────────

  const Step2 = (
    <div className="w-full max-w-lg mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <p className="text-sm text-primary font-semibold mb-2">Step 1 of 2</p>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
          About Your Business
        </h2>
        <p className="text-muted-foreground text-sm">
          Answer 4 quick questions to calculate your revenue loss.
        </p>
      </div>

      <form onSubmit={statsForm.handleSubmit(onStatsSubmit)} className="space-y-5">
        <Field label="Industry" id="industry" error={statsForm.formState.errors.industry?.message}>
          <Controller
            control={statsForm.control}
            name="industry"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="industry" className="bg-input border-border h-11">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-[200]">
                  {["Roofing", "Concrete", "Landscaping", "HVAC", "Plumbing", "General Contractor", "Other"].map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Average Job Value" id="avg_job_value" error={statsForm.formState.errors.avg_job_value?.message}>
          <Controller
            control={statsForm.control}
            name="avg_job_value"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="avg_job_value" className="bg-input border-border h-11">
                  <SelectValue placeholder="What's your average job worth?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-[200]">
                  {["$500", "$1,000", "$2,500", "$5,000", "$10,000+"].map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Estimated Missed Calls Per Week" id="missed_calls_per_week" error={statsForm.formState.errors.missed_calls_per_week?.message}>
          <Controller
            control={statsForm.control}
            name="missed_calls_per_week"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="missed_calls_per_week" className="bg-input border-border h-11">
                  <SelectValue placeholder="How many calls go unanswered?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-[200]">
                  {["1-3", "4-7", "8-12", "12+"].map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt} per week</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Field label="Your Close Rate (calls that become jobs)" id="close_rate" error={statsForm.formState.errors.close_rate?.message}>
          <Controller
            control={statsForm.control}
            name="close_rate"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="close_rate" className="bg-input border-border h-11">
                  <SelectValue placeholder="What % of calls turn into jobs?" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border z-[200]">
                  {["10%", "20%", "30%", "50%", "70%+"].map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </Field>

        <Button
          type="submit"
          variant="hero"
          size="lg"
          className="w-full text-base py-6 h-auto font-semibold mt-2"
        >
          Next: Enter Your Details
          <ArrowRight size={18} />
        </Button>
      </form>
    </div>
  );

  // ─── Step 3 — Contact ─────────────────────────────────────────────────────

  const Step3 = (
    <div className="w-full max-w-lg mx-auto px-6 py-10">
      <div className="text-center mb-8">
        <p className="text-sm text-primary font-semibold mb-2">Step 2 of 2</p>
        <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-2">
          Where Should We Send Your Results?
        </h2>
        <p className="text-muted-foreground text-sm">
          We'll calculate your estimated annual revenue loss from missed calls.
        </p>
      </div>

      <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Full Name" id="name" error={contactForm.formState.errors.name?.message}>
            <Input
              id="name"
              placeholder="John Smith"
              {...contactForm.register("name")}
              className="bg-input border-border focus:border-primary h-11"
            />
          </Field>
          <Field label="Email Address" id="email" error={contactForm.formState.errors.email?.message}>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...contactForm.register("email")}
              className="bg-input border-border focus:border-primary h-11"
            />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Phone Number" id="phone" error={contactForm.formState.errors.phone?.message}>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...contactForm.register("phone")}
              className="bg-input border-border focus:border-primary h-11"
            />
          </Field>
          <Field label="Business Name" id="business_name" error={contactForm.formState.errors.business_name?.message}>
            <Input
              id="business_name"
              placeholder="Smith Roofing Co."
              {...contactForm.register("business_name")}
              className="bg-input border-border focus:border-primary h-11"
            />
          </Field>
        </div>

        {submitError && (
          <p className="text-sm text-destructive text-center bg-destructive/10 rounded-lg p-3">
            {submitError}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="sm:w-auto py-6 h-auto"
            onClick={() => goTo(1)}
          >
            ← Back
          </Button>
          <Button
            type="submit"
            variant="hero"
            size="lg"
            disabled={isSubmitting}
            className="flex-1 text-base py-6 h-auto font-semibold"
          >
            {isSubmitting ? "Calculating..." : "Show Me My Results"}
            {!isSubmitting && <ArrowRight size={18} />}
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground">
          🔒 Your information is private and never shared.
        </p>
      </form>
    </div>
  );

  // ─── Step 4 — Results ─────────────────────────────────────────────────────

  const Step4 = (
    <div className="flex flex-col items-center text-center px-6 py-10 max-w-2xl mx-auto">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-sm text-muted-foreground mb-2 uppercase tracking-widest font-semibold"
      >
        Your Estimated Annual Revenue Loss
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-4"
      >
        <span className="text-6xl sm:text-7xl md:text-8xl font-heading font-bold text-primary glow-text tabular-nums">
          ${countUpValue.toLocaleString()}
        </span>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-md leading-relaxed"
      >
        That's how much you could be leaving on the table —{" "}
        <strong className="text-foreground">just from missed calls.</strong>
      </motion.p>

      {/* Pitch block */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="glass rounded-2xl p-6 mb-8 text-left max-w-md w-full"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <PhoneCall size={18} className="text-primary" />
          </div>
          <p className="font-heading font-semibold text-foreground">The Fix: AI Voice Agent</p>
        </div>
        <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
          An AI voice agent picks up every call 24/7, captures the lead info, and books the job — even while you're on a roof or pouring concrete. No more voicemail. No more lost revenue. Every call answered, every opportunity captured.
        </p>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center gap-4 w-full max-w-sm"
      >
        <Button
          variant="hero"
          size="lg"
          asChild
          className="w-full text-base sm:text-lg py-6 h-auto font-semibold shadow-glow"
        >
          <a
            href="https://calendly.com/saltarelliwebstudio/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            Book a Free Strategy Call with Adam
            <ArrowRight size={18} />
          </a>
        </Button>

        {/* Trust badge */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck size={16} className="text-primary flex-shrink-0" />
          30-day money-back guarantee on all services
        </div>

        {/* Secondary link */}
        {!showGuideMessage ? (
          <button
            onClick={() => setShowGuideMessage(true)}
            className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground transition-colors mt-1"
          >
            Not ready to talk? Get the free guide: 3 Ways Contractors Lose Leads Without Knowing
          </button>
        ) : (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-primary font-medium mt-1 glass rounded-xl px-4 py-3"
          >
            ✅ You're all set! Since you've already shared your email, we'll send the guide straight to your inbox.
          </motion.p>
        )}
      </motion.div>
    </div>
  );

  const steps = [Step1, Step2, Step3, Step4];

  return (
    <div className="min-h-screen bg-background text-foreground relative flex flex-col overflow-x-hidden">
      <Starfield />
      <div className="fixed inset-0 bg-mesh pointer-events-none z-0" />

      {/* Minimal brand bar */}
      <header className="relative z-10 flex items-center justify-center py-5 px-6 border-b border-border/30">
        <a href="https://saltarelliwebstudio.ca" aria-label="Saltarelli Web Studio">
          <img src={logo} alt="Saltarelli Web Studio" className="h-10 w-10" />
        </a>
      </header>

      {/* Progress bar */}
      <div className="relative z-10 w-full h-1 bg-border/30">
        <motion.div
          className="h-full bg-primary"
          initial={false}
          animate={{ width: `${((step + 1) / 4) * 100}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>

      {/* Step content */}
      <main className="relative z-10 flex-1 flex items-center justify-center overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="w-full"
          >
            {steps[step]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimal footer */}
      <footer className="relative z-10 text-center py-4 px-6 border-t border-border/30">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Saltarelli Web Studio ·{" "}
          <a href="https://saltarelliwebstudio.ca" className="hover:text-primary transition-colors">
            saltarelliwebstudio.ca
          </a>
        </p>
      </footer>
    </div>
  );
}
