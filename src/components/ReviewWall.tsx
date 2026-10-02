import { useState } from "react";
import { Star } from "lucide-react";
import { FadeIn, ScaleIn } from "@/components/motion";
import {
  googleReviews,
  GOOGLE_REVIEW_COUNT,
  GOOGLE_RATING,
  type GoogleReview,
} from "@/data/googleReviews";

// Reviews shown before "Show all". The rest stay one tap away so the wall reads as
// proof, not a scroll trap on mobile.
const INITIAL = 9;

const AVATAR_COLORS = [
  "bg-indigo-600", "bg-emerald-600", "bg-sky-600", "bg-amber-600", "bg-rose-600",
  "bg-violet-600", "bg-teal-600", "bg-orange-700", "bg-blue-700",
];

const formatDate = (ym: string) =>
  new Date(`${ym}-15T12:00:00`).toLocaleDateString("en-CA", { month: "long", year: "numeric" });

// "New" means posted in the last 45 days, computed at render so it never goes stale.
const isNew = (ym: string) => Date.now() - new Date(`${ym}-15T12:00:00`).getTime() < 45 * 864e5;

function Avatar({ review, i }: { review: GoogleReview; i: number }) {
  if (review.logo) {
    return (
      <div className="w-11 h-11 shrink-0 rounded-full bg-white ring-1 ring-white/20 flex items-center justify-center overflow-hidden p-1">
        <img src={review.logo} alt={review.business ?? review.name} loading="lazy" className="max-w-full max-h-full object-contain" />
      </div>
    );
  }
  return (
    <div
      className={`w-11 h-11 shrink-0 rounded-full ${AVATAR_COLORS[i % AVATAR_COLORS.length]} flex items-center justify-center text-white font-bold text-sm`}
    >
      {review.name.charAt(0).toUpperCase()}
    </div>
  );
}

function ReviewCard({ review, i }: { review: GoogleReview; i: number }) {
  const featured = Boolean(review.stat) || i < 2;
  return (
    <div
      className={
        featured
          ? "break-inside-avoid glass-strong rounded-2xl p-6 border border-primary/30 shadow-glow"
          : "break-inside-avoid glass rounded-xl p-5 border border-white/10"
      }
    >
      <div className="flex items-center gap-3 mb-3">
        <Avatar review={review} i={i} />
        <div className="min-w-0">
          <p className="font-heading font-semibold text-foreground">{review.name}</p>
          {review.business && <p className="text-xs text-muted-foreground">{review.business}</p>}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, s) => (
            <Star key={s} size={16} className="fill-primary text-primary" />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">{formatDate(review.date)}</span>
        {isNew(review.date) && (
          <span className="text-[10px] font-bold bg-primary/20 text-primary px-2 py-0.5 rounded-full">NEW</span>
        )}
      </div>
      {review.stat && (
        <div className="flex items-center gap-3 mb-4 rounded-xl bg-primary/10 border border-primary/20 px-4 py-3">
          <span className="font-heading font-bold text-2xl text-primary leading-none whitespace-nowrap">{review.stat.value}</span>
          <span className="text-xs text-foreground/80 leading-snug">{review.stat.label}</span>
        </div>
      )}
      <p className="text-foreground/90 text-sm leading-relaxed">"{review.text}"</p>
    </div>
  );
}

export function ReviewWall() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? googleReviews : googleReviews.slice(0, INITIAL);

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 md:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <FadeIn className="text-center mb-12">
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-3 block">
            Real Clients. Real Results.
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            What Business Owners Are Saying
          </h2>
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, s) => (
                <Star key={s} size={14} className="fill-primary text-primary" />
              ))}
            </span>
            <span>
              <span className="font-semibold text-foreground">{GOOGLE_RATING}</span> from {GOOGLE_REVIEW_COUNT} Google reviews. Every quote word for word.
            </span>
          </div>
        </FadeIn>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {visible.map((review, i) => (
            <ScaleIn key={review.name} delay={i < INITIAL ? Math.min(i, 8) * 0.05 : 0}>
              <ReviewCard review={review} i={i} />
            </ScaleIn>
          ))}
        </div>

        <FadeIn className="text-center mt-10">
          {!showAll && googleReviews.length > INITIAL && (
            <button
              type="button"
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/20"
            >
              Show all {googleReviews.length} written reviews
            </button>
          )}
          <p className="text-sm text-muted-foreground mt-4">All reviews posted on our Google Business Profile.</p>
        </FadeIn>
      </div>
    </section>
  );
}
