import { useState } from "react";
import { Play } from "lucide-react";

type Props = {
  videoId: string;
  title: string;
  posterUrl?: string;
};

export function YouTubeFacade({ videoId, title, posterUrl }: Props) {
  const [loaded, setLoaded] = useState(false);
  const poster =
    posterUrl ?? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10 bg-card/50">
      {loaded ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 w-full h-full cursor-pointer"
        >
          <img
            src={poster}
            alt={title}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/95 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <Play
                size={40}
                className="text-primary-foreground fill-current ml-1.5"
              />
            </div>
          </div>
        </button>
      )}
    </div>
  );
}
