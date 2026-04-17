import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/button";

/* ── Tool data ── */
const tools = [
  {
    slug: "wispr",
    category: "Voice Input",
    name: "Wispr Flow",
    outcome:
      "Dictate anything (emails, docs, prompts) at 3x your typing speed. Sounds crazy until you try it for a day.",
    saved: "~2 hrs/week",
  },
  {
    slug: "granola",
    category: "Meeting Notes",
    name: "Granola",
    outcome:
      "AI notepad that runs in the background on every call. You never write a meeting note again. It just handles it.",
    saved: "~3 hrs/week",
  },
  {
    slug: "claudecode",
    category: "Code & Build",
    name: "Claude Code",
    outcome:
      "Build real software by talking to AI. Not toy apps. Production dashboards, automations, client tools. This replaced a dev hire.",
    saved: "~3 hrs/week",
  },
  {
    slug: "manus",
    category: "Autonomous Agent",
    name: "Manus",
    outcome:
      "Give it a task and walk away. Manus browses, researches, writes, and executes multi-step work autonomously, like hiring a virtual operator.",
    saved: "~2 hrs/week",
  },
  {
    slug: "opusclip",
    category: "Content Repurposing",
    name: "Opus Clip",
    outcome:
      "Drop in a long video, get 7-10 short clips ready for Instagram, TikTok, and YouTube. My entire content output runs through this.",
    saved: "~2 hrs/week",
  },
  {
    slug: "elevenlabs",
    category: "Voice Cloning",
    name: "ElevenLabs",
    outcome:
      "Clone your voice or build AI voice agents that sound human. I use it for client automation projects and voiceovers.",
    saved: "~1 hr/week",
  },
  {
    slug: "gamma",
    category: "Presentations",
    name: "Gamma",
    outcome:
      "Decks that actually look good, generated in minutes from a prompt or doc. No more spending 3 hours in PowerPoint.",
    saved: "~1.5 hrs/week",
  },
  {
    slug: "notebooklm",
    category: "Research",
    name: "NotebookLM",
    outcome:
      "Upload any doc, PDF, or video and ask it anything. I use it to research industries before a sales call. Game changer for prep.",
    saved: "~1 hr/week",
  },
];

/* ── Logo with fallback ── */
function ToolLogo({ slug }: { slug: string }) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-11 h-11 rounded-lg bg-muted/60 border border-white/10 flex items-center justify-center text-[9px] text-muted-foreground uppercase tracking-wider">
        {slug.slice(0, 2)}
      </div>
    );
  }
  return (
    <img
      src={`/logos/${slug}.png`}
      alt=""
      className="w-11 h-11 rounded-lg object-contain bg-muted/40 p-1"
      onError={() => setErr(true)}
    />
  );
}

const AiOperatorKit = () => {
  return (
    <>
      <SEO
        title="AI Operator Kit: Free Resource | Saltarelli Web Studio"
        description="The exact 8 tools I use to run a full agency solo and save 10+ hours every week. Free resource by Adam Saltarelli."
      />

      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Header />

        {/* ──────────── HERO ──────────── */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-20 px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-[780px] text-center">
            <FadeIn>
              <span className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 text-[11px] font-bold tracking-widest uppercase text-primary mb-7">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Free Resource &middot; Adam Saltarelli
              </span>
            </FadeIn>

            <FadeIn delay={0.05}>
              <h1 className="font-heading font-bold text-6xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.92] tracking-tight mb-2">
                AI
                <br />
                <span className="text-primary">Operator</span>
                <br />
                Kit
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="text-lg text-muted-foreground font-light mt-5 max-w-md mx-auto">
                The <strong className="text-foreground font-medium">exact 8 tools</strong> I
                use to run a full agency solo and save{" "}
                <strong className="text-foreground font-medium">10+ hours every week</strong>.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex justify-center gap-8 mt-10 flex-wrap">
                {[
                  { num: "8", label: "Tools" },
                  { num: "10+", label: "Hrs Saved / Week" },
                  { num: "$0", label: "Cost to Start" },
                ].map((t) => (
                  <div key={t.label} className="text-center">
                    <div className="font-heading font-bold text-5xl text-primary leading-none">
                      {t.num}
                    </div>
                    <div className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1">
                      {t.label}
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* divider */}
        <div className="mx-auto max-w-[780px] px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ──────────── TOOLS GRID ──────────── */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-[780px]">
            <FadeIn>
              <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
                // The Stack
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-1">
                What's In The Kit
              </h2>
              <p className="text-muted-foreground text-sm font-light mb-8">
                No fluff. No affiliate bias. Just what I actually open every day.
              </p>
            </FadeIn>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tools.map((tool, i) => (
                <FadeIn key={tool.slug} delay={i * 0.04}>
                  <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 h-full hover:border-primary/30 transition-colors group">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <ToolLogo slug={tool.slug} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] tracking-widest uppercase text-primary font-bold mb-0.5">
                          {tool.category}
                        </p>
                        <p className="font-heading font-bold text-lg">{tool.name}</p>
                      </div>
                      <span className="flex-shrink-0 text-[10px] font-bold tracking-wider text-primary bg-primary/10 rounded px-2 py-0.5">
                        {tool.saved}
                      </span>
                    </div>
                    <p className="text-[13px] text-muted-foreground font-light leading-relaxed mt-3">
                      {tool.outcome}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* divider */}
        <div className="mx-auto max-w-[780px] px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        {/* ──────────── BRIDGE CTA ──────────── */}
        <section className="py-16 md:py-20 px-4 md:px-6 relative z-10">
          <div className="mx-auto max-w-[780px]">
            <FadeIn>
              <div className="relative rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm p-5 sm:p-8 md:p-10 overflow-hidden">
                <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
                <div className="relative z-10">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-4 block">
                    // For Business Owners
                  </span>
                  <h2 className="font-heading font-bold text-3xl md:text-4xl leading-tight mb-4">
                    Running A Business?
                    <br />
                    The Leaks Are Different.
                  </h2>
                  <p className="text-muted-foreground text-[15px] font-light leading-relaxed max-w-lg mb-7">
                    Running a team means the leaks are different. It's not about
                    missing tools, it's the hours bleeding out where you can't see them.
                    Take a free 30-second audit and find out exactly where.
                  </p>
                  <Button variant="hero" size="lg" asChild>
                    <a
                      href="https://saltarelliwebstudio.ca/#audit"
                      className="gap-2 inline-flex items-center whitespace-normal text-center"
                    >
                      <ArrowRight size={16} className="flex-shrink-0" />
                      Take the Free Leaky Bucket Audit
                    </a>
                  </Button>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>

      </div>
    </>
  );
};

export default AiOperatorKit;
