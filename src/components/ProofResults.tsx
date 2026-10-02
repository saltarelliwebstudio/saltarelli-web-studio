import { Quote, Sparkles, Star, TrendingUp } from "lucide-react";
import { FadeIn, ScaleIn, StaggerContainer, StaggerItem } from "@/components/motion";

// Daniel's video testimonial slot. When the file lands, drop it in public/proof/
// and set the path here; the card switches from the install photo to the video.
const ALL_YUKON_VIDEO: string | null = null;

// Every claim on this block traces to a source someone outside the studio can check:
// Daniel's own email + ChatGPT screenshot (2026-09-13), and the two Google reviews
// quoted on the wall below. ChatGPT answers vary run to run, so this is shown as what
// Daniel saw, never as a ranking we promise.
const quickWins = [
  {
    icon: Star,
    value: "0 → 11",
    label: "five-star Google reviews in under a month",
    who: "Kyle McNabb, Trades Pro Supply",
  },
  {
    icon: TrendingUp,
    value: "More work in",
    label: "\"definitely made a difference in work intake volume\"",
    who: "Jim Powell, Powell Electrical Contracting",
  },
];

export function ProofResults() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="text-center mb-10">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
            Real Results
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
            Found on Google. <span className="text-primary">Picked by AI.</span>
          </h2>
        </FadeIn>

        <ScaleIn>
          <div className="glass-strong rounded-2xl border border-primary/30 shadow-glow overflow-hidden">
            <div className="grid lg:grid-cols-5">
              {/* Screenshot: the proof itself */}
              <div className="lg:col-span-3 p-5 md:p-8 flex flex-col gap-3 bg-black/20">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles size={14} className="text-primary" />
                  Daniel asked ChatGPT who to call for a heat pump in Whitehorse
                </div>
                <img
                  src="/proof/all-yukon-chatgpt-top-pick.webp"
                  alt="ChatGPT answer naming All Yukon Refrigeration as its first choice for a heat pump install in Whitehorse"
                  width={1010}
                  height={454}
                  loading="lazy"
                  className="w-full rounded-xl border border-white/10"
                />
                <p className="text-xs text-muted-foreground">
                  Daniel's own screenshot, September 2026. AI answers change from search to search.
                </p>
                {ALL_YUKON_VIDEO ? (
                  <video
                    src={ALL_YUKON_VIDEO}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full aspect-video rounded-xl border border-white/10"
                  />
                ) : (
                  <img
                    src="/proof/all-yukon-heat-pump-install.webp"
                    alt="All Yukon Refrigeration technician installing a heat pump in the snow"
                    width={750}
                    height={1000}
                    loading="lazy"
                    className="w-full h-56 md:h-64 object-[50%_70%] object-cover rounded-xl border border-white/10"
                  />
                )}
              </div>

              {/* Quote + client */}
              <div className="lg:col-span-2 p-6 md:p-8 flex flex-col justify-center gap-5 border-t lg:border-t-0 lg:border-l border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 shrink-0 rounded-xl bg-white flex items-center justify-center p-1.5">
                    <img
                      src="/logos/all-yukon-refrigeration.png"
                      alt="All Yukon Refrigeration"
                      loading="lazy"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-heading font-semibold text-foreground">Daniel Sennett</p>
                    <p className="text-xs text-muted-foreground">All Yukon Refrigeration, Whitehorse, YT</p>
                  </div>
                </div>

                <blockquote className="relative text-foreground/90 text-base md:text-lg leading-relaxed">
                  <Quote size={28} className="text-primary/40 mb-2" aria-hidden />
                  "I just checked on ChatGPT; we are number 3 on their list for heat pump installs now. I asked which
                  company it would choose and it named our business as the top pick!"
                </blockquote>

                <div className="flex flex-wrap gap-2">
                  {["New website", "Google review engine", "AI search visibility"].map((t) => (
                    <span key={t} className="text-[11px] font-semibold bg-primary/15 text-primary px-2.5 py-1 rounded-full">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  The new site also loads <span className="text-foreground font-semibold">5.5x lighter</span> than the old
                  Wix one: 1,068 KB vs 5,922 KB.
                </p>
              </div>
            </div>
          </div>
        </ScaleIn>

        <StaggerContainer className="grid md:grid-cols-2 gap-5 mt-5">
          {quickWins.map((w) => (
            <StaggerItem key={w.who}>
              <div className="glass rounded-xl p-6 border border-white/10 h-full flex items-start gap-4">
                <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/15 flex items-center justify-center">
                  <w.icon size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-heading font-bold text-2xl text-primary leading-tight">{w.value}</p>
                  <p className="text-sm text-foreground/90 mt-1">{w.label}</p>
                  <p className="text-xs text-muted-foreground mt-2">{w.who}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
