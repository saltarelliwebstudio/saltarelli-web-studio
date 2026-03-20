import React, { useState, useEffect, useRef } from "react";

const SUPABASE_URL = "https://veyhxazlqekiweynjxhf.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZleWh4YXpscWVraXdleW5qeGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2MDU2MDUsImV4cCI6MjA4NjE4MTYwNX0.h5EyoyPZzP2yBVtDir9Ko4A2I_C_v_7qYxkR2MFL9fc";

async function createLead({ firstName, email, phone, score, revenueLeak, hoursLost }) {
  try {
    // notify-audit-lead handles: lead creation in admin_leads + dedup + SMS notification to Adam
    // DB triggers auto-fire drip Step 1 on insert
    await fetch(`${SUPABASE_URL}/functions/v1/notify-audit-lead`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: firstName,
        email,
        phone,
        score,
        revenueLeak,
        hoursLost,
      }),
    });
  } catch (err) {
    console.error("Failed to create lead:", err);
  }
}

const questions = [
  {
    id: "avg_job_value",
    label: "What's your average job or sale worth?",
    options: [
      { label: "Under $500", value: 300 },
      { label: "$500 – $1,500", value: 1000 },
      { label: "$1,500 – $5,000", value: 3000 },
      { label: "$5,000+", value: 7500 },
    ],
  },
  {
    id: "weekly_leads",
    label: "How many new inquiries or leads do you get per week?",
    options: [
      { label: "1–3", value: 2 },
      { label: "4–8", value: 6 },
      { label: "9–15", value: 12 },
      { label: "16+", value: 20 },
    ],
  },
  {
    id: "close_rate",
    label: "Out of those leads, roughly how many turn into paying jobs?",
    options: [
      { label: "A good chunk — maybe 1 in 3", value: 0.33 },
      { label: "Some — about 1 in 5", value: 0.2 },
      { label: "Not many — maybe 1 in 10", value: 0.1 },
      { label: "Not sure", value: 0.15 },
    ],
  },
  {
    id: "missed_calls",
    label: "How many calls or messages do you think you miss per week?",
    options: [
      { label: "0–1", value: 0.5 },
      { label: "2–4", value: 3 },
      { label: "5+", value: 6 },
    ],
  },
  {
    id: "real_lead_pct",
    label: "Of the calls you miss, how many are actual potential customers (not spam or telemarketers)?",
    options: [
      { label: "Most of them — I mostly get real inquiries", value: 0.75 },
      { label: "About half", value: 0.5 },
      { label: "Hard to say — maybe a third", value: 0.33 },
    ],
  },
  {
    id: "after_hours",
    label: "What happens when someone contacts you after hours?",
    options: [
      { label: "They get an auto-reply, AI, or answering service", value: 1 },
      { label: "Voicemail — I check it next morning", value: 2 },
      { label: "Nothing. They just wait.", value: 3 },
    ],
  },
  {
    id: "follow_up_speed",
    label: "How fast do you typically follow up with a new lead?",
    options: [
      { label: "Within an hour", value: 1 },
      { label: "Same day", value: 2 },
      { label: "Next day or later", value: 3 },
    ],
  },
  {
    id: "admin_hours",
    label: "How many hours per week do you spend on admin (scheduling, invoicing, follow-ups)?",
    options: [
      { label: "Under 3 hours", value: 2 },
      { label: "3–7 hours", value: 5 },
      { label: "8+ hours", value: 10 },
    ],
  },
  {
    id: "automation",
    label: "How much of your business runs on autopilot?",
    options: [
      { label: "Most things are automated", value: 1 },
      { label: "A few things, but mostly manual", value: 2 },
      { label: "Almost nothing — it's all on me", value: 3 },
    ],
  },
];

function computeScore(answers) {
  let score = 10;

  // After hours coverage (-0 to -2)
  const ah = answers.after_hours || 1;
  if (ah === 2) score -= 1;
  if (ah === 3) score -= 2;

  // Missed calls (-0 to -2)
  const mc = answers.missed_calls || 0.5;
  if (mc >= 3) score -= 1;
  if (mc >= 6) score -= 1;

  // Follow-up speed (-0 to -2)
  const fu = answers.follow_up_speed || 1;
  if (fu === 2) score -= 1;
  if (fu === 3) score -= 2;

  // Admin hours (-0 to -1)
  const admin = answers.admin_hours || 2;
  if (admin >= 5) score -= 1;

  // Automation level (-0 to -2)
  const auto = answers.automation || 1;
  if (auto === 2) score -= 1;
  if (auto === 3) score -= 2;

  return Math.max(1, Math.min(10, score));
}

function computeResults(answers) {
  const jobValue = answers.avg_job_value || 1000;
  const weeklyLeads = answers.weekly_leads || 2;
  const closeRate = answers.close_rate || 0.2;
  const weeklyMissedRaw = answers.missed_calls || 0.5;
  const realLeadPct = answers.real_lead_pct || 0.5;
  const followUp = answers.follow_up_speed || 1;
  const adminHours = answers.admin_hours || 2;

  // --- MISSED CALL REVENUE ---
  // Filter missed calls by real-lead % first, then apply close rate
  // missed calls × real lead % × close rate × job value × 52 weeks
  const weeklyRealMissed = weeklyMissedRaw * realLeadPct;
  const missedRevenue = Math.round(weeklyRealMissed * closeRate * jobValue * 52);

  // --- FOLLOW-UP PENALTY ---
  // Slow response loses ~8-18% of closeable deals on the leads they DO answer
  const answeredLeads = Math.max(0, weeklyLeads - weeklyMissedRaw);
  const followUpPenaltyRate = followUp === 1 ? 0 : followUp === 2 ? 0.08 : 0.18;
  const followUpLoss = Math.round(
    answeredLeads * closeRate * followUpPenaltyRate * jobValue * 52
  );

  // --- ADMIN TIME ---
  const automatableHours = Math.round(adminHours * 0.5); // ~50% could be automated
  const yearlyAdminHoursLost = automatableHours * 52;

  // Total revenue leak (only the money parts)
  const totalRevenueLeak = missedRevenue + followUpLoss;

  return {
    missedRevenue,
    followUpLoss,
    yearlyAdminHoursLost,
    totalRevenueLeak,
    weeklyMissedRaw,
    realLeadPct,
    weeklyRealMissed,
    closeRate,
    jobValue,
    answeredLeads,
    followUpPenaltyRate,
    automatableHours,
  };
}

function getTopGaps(answers) {
  const gaps = [];
  if ((answers.missed_calls || 0) >= 3) {
    gaps.push({ emoji: "📞", label: "Missed call recovery", detail: "Every missed call is a job you'll never quote." });
  }
  if ((answers.after_hours || 0) >= 2) {
    gaps.push({ emoji: "🌙", label: "After-hours coverage", detail: "Leads are contacting you when nobody's there to answer." });
  }
  if ((answers.follow_up_speed || 0) >= 2) {
    gaps.push({ emoji: "⚡", label: "Follow-up speed", detail: "The first business to respond wins 78% of the time." });
  }
  if ((answers.admin_hours || 0) >= 5) {
    gaps.push({ emoji: "⏰", label: "Admin overload", detail: "Hours spent on tasks a system should handle." });
  }
  if ((answers.automation || 0) >= 2) {
    gaps.push({ emoji: "🤖", label: "Automation gaps", detail: "Manual processes are eating your time and margins." });
  }
  return gaps.slice(0, 3);
}

function CountUp({ target, duration = 1200 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    };
    ref.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(ref.current);
  }, [target, duration]);

  return <>{value.toLocaleString()}</>;
}

export const AfterHoursAudit = () => {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [answers, setAnswers] = useState({});
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [transitioning, setTransitioning] = useState(false);

  const totalQuestions = questions.length; // 8
  const progress = currentScreen >= 1 && currentScreen <= totalQuestions
    ? (currentScreen / totalQuestions) * 100
    : currentScreen > totalQuestions ? 100 : 0;

  const emailScreen = totalQuestions + 1;
  const resultsScreen = totalQuestions + 2;

  const goTo = (screen) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentScreen(screen);
      setTransitioning(false);
    }, 200);
  };

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    if (currentScreen < totalQuestions) {
      goTo(currentScreen + 1);
    } else {
      goTo(emailScreen);
    }
  };

  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (firstName.trim() && email.trim() && phoneValid) {
      const score = computeScore(answers);
      const results = computeResults(answers);
      createLead({
        firstName: firstName.trim(),
        email: email.trim(),
        phone: phoneDigits,
        score,
        revenueLeak: results.totalRevenueLeak,
        hoursLost: results.yearlyAdminHoursLost,
        answers,
      });
      goTo(resultsScreen);
    }
  };

  const handleRetake = () => {
    setAnswers({});
    setFirstName("");
    setEmail("");
    setPhone("");
    goTo(0);
  };

  const score = computeScore(answers);
  const results = computeResults(answers);
  const topGaps = getTopGaps(answers);

  const scoreBadgeColor =
    score <= 3 ? "border-red-500 text-red-400" :
    score <= 6 ? "border-yellow-500 text-yellow-400" :
    "border-green-500 text-green-400";

  return (
    <div className="w-full max-w-[760px] mx-auto">
      <div
        className="transition-all duration-200 ease-out"
        style={{
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(12px)" : "translateY(0)",
        }}
      >
        {/* Screen 0: Start */}
        {currentScreen === 0 && (
          <div className="glass-strong rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-3">
              How much are you losing after hours?
            </h3>
            <p className="text-muted-foreground mb-6 text-sm max-w-md mx-auto">
              9 quick questions based on your actual numbers. Takes less than a minute.
            </p>
            <button
              onClick={() => goTo(1)}
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-base shadow-glow"
            >
              Start the Audit →
            </button>
          </div>
        )}

        {/* Screens 1–8: Questions */}
        {currentScreen >= 1 && currentScreen <= totalQuestions && (
          <div className="glass-strong rounded-2xl p-8 md:p-12">
            <div className="mb-8">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Question {currentScreen} of {totalQuestions}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <h3 className="text-xl md:text-2xl font-heading font-semibold mb-6">
              {questions[currentScreen - 1].label}
            </h3>

            <div className="space-y-3">
              {questions[currentScreen - 1].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(questions[currentScreen - 1].id, opt.value)}
                  className="w-full text-left p-4 rounded-xl border border-white/10 bg-card/50 hover:border-primary/60 hover:bg-primary/10 transition-all duration-200 group"
                >
                  <span className="text-foreground/90 group-hover:text-foreground transition-colors">
                    {opt.label}
                  </span>
                </button>
              ))}
            </div>

            {currentScreen > 1 && (
              <button
                onClick={() => goTo(currentScreen - 1)}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Back
              </button>
            )}
          </div>
        )}

        {/* Email gate */}
        {currentScreen === emailScreen && (
          <div className="glass-strong rounded-2xl p-8 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold mb-2">
              Almost there!
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your details to see your results.
            </p>
            <form onSubmit={handleEmailSubmit} className="max-w-sm mx-auto space-y-3">
              <input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-card/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors"
              />
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-card/50 border border-white/10 text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:outline-none transition-colors"
              />
              <div>
                <input
                  type="tel"
                  placeholder="Phone number (10 digits)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className={`w-full px-4 py-3 rounded-xl bg-card/50 border text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
                    phone && !phoneValid ? "border-red-500/60 focus:border-red-500/60" : "border-white/10 focus:border-primary/60"
                  }`}
                />
                {phone && !phoneValid && (
                  <p className="text-xs text-red-400 mt-1 ml-1">Enter a valid 10-digit phone number</p>
                )}
              </div>
              <button
                type="submit"
                disabled={!phoneValid || !firstName.trim() || !email.trim()}
                className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-base shadow-glow disabled:opacity-40 disabled:cursor-not-allowed"
              >
                See My Results →
              </button>
            </form>
            <p className="text-xs text-muted-foreground mt-3">We'll text you a copy of your results. No spam.</p>
            <button
              onClick={() => goTo(totalQuestions)}
              className="mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back
            </button>
          </div>
        )}

        {/* Results */}
        {currentScreen === resultsScreen && (
          <div className="glass-strong rounded-2xl p-8 md:p-12 text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {firstName ? `${firstName}, here's` : "Here's"} your After-Hours Readiness Score
            </p>

            {/* Score badge */}
            <div
              className="inline-flex flex-col items-center justify-center mb-6"
              style={{
                animation: "scorePop 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
              }}
            >
              <div className={`w-24 h-24 rounded-full border-4 ${scoreBadgeColor} flex items-center justify-center mb-2`}>
                <span className="text-4xl font-heading font-bold">{score}</span>
              </div>
              <span className="text-sm text-muted-foreground">/10</span>
            </div>

            {/* Two-column: Revenue + Time */}
            <div className="grid sm:grid-cols-2 gap-4 mb-6 max-w-lg mx-auto">
              <div className="p-4 rounded-xl bg-card/30 border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Est. Revenue Leak / Year</p>
                <p className="text-3xl font-heading font-bold text-primary">
                  $<CountUp target={results.totalRevenueLeak} />
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card/30 border border-white/10">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Automatable Time / Year</p>
                <p className="text-3xl font-heading font-bold text-foreground">
                  <CountUp target={results.yearlyAdminHoursLost} /> hrs
                </p>
              </div>
            </div>

            {/* CTA + Retake (moved above breakdown so mobile users see it immediately) */}
            <a
              href="https://calendly.com/saltarelliwebstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-base shadow-glow mb-3"
            >
              Book a Free Strategy Call →
            </a>

            <div className="mb-8">
              <button
                onClick={handleRetake}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Retake the Audit
              </button>
            </div>

            {/* Breakdown */}
            <div className="mb-8 max-w-lg mx-auto text-left">
              <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider text-center">How we got these numbers</p>
              <div className="space-y-2">
                <div className="p-3 rounded-lg bg-card/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">Missed calls → lost jobs</span>
                    <span className="text-sm font-semibold text-primary">${results.missedRevenue.toLocaleString()}/yr</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ~{results.weeklyMissedRaw} missed/week × {Math.round(results.realLeadPct * 100)}% real leads × {Math.round(results.closeRate * 100)}% close rate × ${results.jobValue.toLocaleString()} avg job × 52 weeks
                  </p>
                </div>

                {results.followUpLoss > 0 && (
                  <div className="p-3 rounded-lg bg-card/30">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-foreground">Slow follow-up → fewer closes</span>
                      <span className="text-sm font-semibold text-primary">${results.followUpLoss.toLocaleString()}/yr</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      ~{Math.round(results.answeredLeads)} answered leads/week × {Math.round(results.followUpPenaltyRate * 100)}% lost to slow response × ${results.jobValue.toLocaleString()} × {Math.round(results.closeRate * 100)}% close rate
                    </p>
                  </div>
                )}

                <div className="p-3 rounded-lg bg-card/30">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">Admin time you could automate</span>
                    <span className="text-sm font-semibold text-foreground">{results.yearlyAdminHoursLost} hrs/yr</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    ~{results.automatableHours} automatable hrs/week × 52 weeks
                  </p>
                </div>
              </div>
            </div>

            {/* Top gaps */}
            {topGaps.length > 0 && (
              <div className="mb-8">
                <h4 className="font-heading font-semibold mb-4 text-lg">Your Top Gaps</h4>
                <div className="space-y-3 text-left max-w-md mx-auto">
                  {topGaps.map((gap, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border border-white/10"
                    >
                      <span className="text-2xl flex-shrink-0">{gap.emoji}</span>
                      <div>
                        <p className="font-semibold text-foreground">{gap.label}</p>
                        <p className="text-sm text-muted-foreground">{gap.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes scorePop {
          0% { transform: scale(0.8); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
};
